import { all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import type { Parser } from "@mkbabb/parse-that";
import type {
    Declaration,
    ScrollTimelineDescriptor,
    Stylesheet,
    StylesheetItem,
    ViewTimelineDescriptor,
} from "./stylesheet-types";
import * as utils from "./utils";
import { splitTopLevelCommas } from "./utils";
import type { OnParseError } from "./utils";

/**
 * CSS Scroll-driven-animation VALUE grammar (N.W11′ — the `CSSTimelineOptions`
 * scroll-grammar extractor + inverse serializer).
 *
 * The typed parse/serialize over the `animation-timeline` / `animation-range` /
 * `timeline-scope` (+ the forward-looking `animation-trigger`) property VALUES,
 * authored in the EXACT parser-combinator idiom `parsing/easing.ts` proves for
 * `linear()` / `steps()`, beside the `parsing/extract.ts` stylesheet animation
 * extractor.
 *
 * The DIVISION-OF-LABOUR law is held verbatim (`easing.ts:6-15`): the parser
 * emits the typed options VERBATIM — the named-timeline reference as a
 * `<dashed-ident>` string, `auto`/`none` as themselves, the range-phase keyword
 * and the `<length-percentage>` offset AS-WRITTEN. It does NOT resolve `scroll()`
 * defaults against a live DOM, does NOT compute the px offset from a scroller,
 * does NOT fill a phase's implied `0%`/`100%` — that is the keyframes.js
 * `ScrollScene` driver's job (it owns TIME; value.js owns VALUES).
 */

// ── Type surface (Lane A — the mirror of CSSAnimationOptions, extract.ts:16) ──

export type ScrollerKeyword = "nearest" | "root" | "self";
export type TimelineAxis = "block" | "inline" | "x" | "y";

/**
 * An `animation-timeline` value. Scroller / axis / inset are emitted VERBATIM —
 * an omitted sub-token is `undefined`, NOT defaulted (the division-of-labour
 * law; the consumer/driver applies CSS defaults).
 */
export type AnimationTimelineValue =
    | { kind: "auto" }
    | { kind: "none" }
    | { kind: "name"; name: string } // a <dashed-ident> named-tl ref
    | { kind: "scroll"; scroller?: ScrollerKeyword; axis?: TimelineAxis }
    | { kind: "view"; axis?: TimelineAxis; inset?: ViewInset };

/** A `view()` inset — 0/1/2 `<length-percentage>|auto` tokens, as-written. */
export type ViewInset = { start: string; end?: string };

export type RangePhase =
    | "normal"
    | "cover"
    | "contain"
    | "entry"
    | "exit"
    | "entry-crossing"
    | "exit-crossing";

/** One `animation-range` endpoint. `offset` omitted ⇒ the driver fills it. */
export type RangeBoundary = { phase?: RangePhase; offset?: string };

export type AnimationRangeValue = { start: RangeBoundary; end?: RangeBoundary };

export type TimelineScopeValue =
    | { kind: "none" }
    | { kind: "all" }
    | { kind: "names"; names: string[] };

// ── §II.3.E — the forward-looking `animation-trigger` sub-item ────────────────

export type TriggerType = "once" | "repeat" | "alternate" | "state";

/**
 * A `<single-animation-trigger>` value. The Chrome-145 discrete layer
 * (`<trigger-type> || [<timeline> [<animation-range>]?]`). Partitioned as a
 * forward-looking sub-item — landed alongside the scroll-timeline core, NOT
 * blocking it.
 */
export type AnimationTriggerValue = {
    type?: TriggerType;
    timeline?: AnimationTimelineValue;
    range?: AnimationRangeValue;
};

/**
 * The aggregate — the mirror of `CSSAnimationOptions` (`extract.ts:16`).
 * Renderer/driver concerns (which DOM scroller, the resolved px offset) are NOT
 * here — keyframes.js owns TIME. An absent field means the declaration did not
 * appear.
 */
export interface CSSTimelineOptions {
    timeline?: AnimationTimelineValue; // animation-timeline (single)
    timelines?: AnimationTimelineValue[]; // animation-timeline #-list (O.W4b S2)
    range?: AnimationRangeValue; // animation-range (+ -start/-end longhands)
    timelineScope?: TimelineScopeValue; // timeline-scope
    trigger?: AnimationTriggerValue; // animation-trigger (forward-looking)
}

/**
 * Registry of the named timelines declared by `@scroll-timeline` /
 * `@view-timeline` at-rules (O.W4b S3). The kf `scroll-scene.ts` consumer
 * resolves a named `animation-timeline: --my-tl` reference against this.
 */
export interface NamedTimelineRegistry {
    scroll: Map<string, ScrollTimelineDescriptor>;
    view: Map<string, ViewTimelineDescriptor>;
}

// ── Combinator primitives (the easing.ts vocabulary, reused verbatim) ─────────

const lparen = string("(");
const rparen = string(")");
const comma = string(",").trim(whitespace);
const ws = whitespace;

// An intra-function-body token separator: whitespace OR a comma (with optional
// surrounding whitespace). value.js's stylesheet parser serializes a
// `scroll(root block)` declaration value as `scroll(root, block)` (it
// comma-joins function args), so the aggregate `extractTimelineOptions` path
// must tolerate the comma form; author CSS uses bare spaces. Both forms parse.
const sep: Parser<string> = regex(/\s*,\s*|\s+/);

const SCROLLER_KEYWORDS: readonly ScrollerKeyword[] = [
    "nearest",
    "root",
    "self",
];
const AXIS_KEYWORDS: readonly TimelineAxis[] = ["block", "inline", "x", "y"];
const RANGE_PHASES: readonly RangePhase[] = [
    // Longest-first so `entry-crossing` is not shadowed by a bare `entry`
    // (the longest-first `any` dispatch, easing.ts:94-101).
    "entry-crossing",
    "exit-crossing",
    "normal",
    "cover",
    "contain",
    "entry",
    "exit",
];
const TRIGGER_TYPES: readonly TriggerType[] = [
    "once",
    "repeat",
    "alternate",
    "state",
];

const isScroller = (t: string): t is ScrollerKeyword =>
    (SCROLLER_KEYWORDS as readonly string[]).includes(t.toLowerCase());
const isAxis = (t: string): t is TimelineAxis =>
    (AXIS_KEYWORDS as readonly string[]).includes(t.toLowerCase());

// `<dashed-ident>` — a `--`-prefixed custom-property-style timeline name
// (`--my-tl`). The named-timeline reference in `animation-timeline` /
// `timeline-scope` is a `<dashed-ident>`; this keeps the keyword alternatives
// (`auto`/`none`/`all`/`scroll`/`view`) from being swallowed as names.
const dashedIdent: Parser<string> = regex(/--[a-zA-Z_][a-zA-Z0-9_-]*/);

// `<length-percentage>` — emitted VERBATIM as the source string (the parser does
// NOT resolve `25%`→px; the driver does). A signed number with an optional `%`
// or unit suffix (`25%`, `100px`, `10cqh`, `-3.5rem`, a bare `50`), or the
// `auto` keyword (for view() insets). Captured whole so serialize re-emits the
// source byte-for-byte.
const lengthPercentage: Parser<string> = any(
    utils.istring("auto"),
    regex(/-?(?:\d+\.?\d*|\.\d+)(?:%|[a-zA-Z]+)?/),
);

// ── Lane B — animation-timeline ───────────────────────────────────────────────
//
// <single-animation-timeline> = auto | none | <dashed-ident>
//                             | scroll([<axis> || <scroller>]) | view([<axis> || <inset>])

/**
 * Parse the order-free `[<axis> || <scroller>]` body of `scroll()` — a
 * space-separated run of up-to-2 tokens, each classified (D1: the `||` order-free
 * pair). `easing.ts` has no `||` precedent and parse-that ships no permutation
 * combinator, so we parse the token run then classify — robust to the order-free
 * shape AND to `all()` compacting `.opt()` misses.
 */
const scrollBody = all(
    utils.identifier.opt(),
    sep.next(utils.identifier).opt(),
)
    .trim(ws)
    .wrap(lparen, rparen)
    .map(
        (toks: (string | undefined)[]): {
            scroller?: ScrollerKeyword;
            axis?: TimelineAxis;
        } => {
            const out: { scroller?: ScrollerKeyword; axis?: TimelineAxis } = {};
            for (const tok of toks) {
                if (tok == null) continue;
                if (isAxis(tok)) out.axis = tok.toLowerCase() as TimelineAxis;
                else if (isScroller(tok))
                    out.scroller = tok.toLowerCase() as ScrollerKeyword;
                else throw new Error(`Unknown scroll() token: "${tok}"`);
            }
            return out;
        },
    );

/**
 * Parse the `[<axis> || <inset>]` body of `view()` — the axis keyword plus
 * 0/1/2 `<length-percentage>|auto` inset tokens, order-free for the axis.
 */
const viewBody = all(
    lengthPercentage.or(utils.identifier).opt(),
    sep.next(lengthPercentage.or(utils.identifier)).opt(),
    sep.next(lengthPercentage.or(utils.identifier)).opt(),
)
    .trim(ws)
    .wrap(lparen, rparen)
    .map(
        (
            toks: (string | undefined)[],
        ): { axis?: TimelineAxis; inset?: ViewInset } => {
            const out: { axis?: TimelineAxis; inset?: ViewInset } = {};
            const insetParts: string[] = [];
            for (const tok of toks) {
                if (tok == null) continue;
                if (isAxis(tok)) out.axis = tok.toLowerCase() as TimelineAxis;
                else insetParts.push(tok);
            }
            if (insetParts.length > 0) {
                out.inset =
                    insetParts.length > 1
                        ? { start: insetParts[0]!, end: insetParts[1]! }
                        : { start: insetParts[0]! };
            }
            return out;
        },
    );

const scrollTimeline: Parser<AnimationTimelineValue> = utils
    .istring("scroll")
    .next(scrollBody)
    .map(
        (b: { scroller?: ScrollerKeyword; axis?: TimelineAxis }) =>
            ({ kind: "scroll", ...b }) as AnimationTimelineValue,
    );

const viewTimeline: Parser<AnimationTimelineValue> = utils
    .istring("view")
    .next(viewBody)
    .map(
        (b: { axis?: TimelineAxis; inset?: ViewInset }) =>
            ({ kind: "view", ...b }) as AnimationTimelineValue,
    );

const animationTimeline: Parser<AnimationTimelineValue> = any(
    utils.istring("auto").map(() => ({ kind: "auto" }) as AnimationTimelineValue),
    utils.istring("none").map(() => ({ kind: "none" }) as AnimationTimelineValue),
    scrollTimeline,
    viewTimeline,
    // Named-ref fall-through is LAST (the isAnimationName final-fall-through).
    dashedIdent.map(
        (name: string) => ({ kind: "name", name }) as AnimationTimelineValue,
    ),
);

/**
 * Parse a single `<single-animation-timeline>` value (CSS → typed). Emits the
 * value VERBATIM; resolves no defaults.
 *
 * @example
 * parseAnimationTimeline("scroll(root block)")
 * // → { kind: "scroll", scroller: "root", axis: "block" }
 */
export function parseAnimationTimeline(
    input: string,
    onParseError?: OnParseError,
): AnimationTimelineValue {
    return utils.tryParse(animationTimeline.trim(ws), input, onParseError);
}

/**
 * Parse an `animation-timeline` property value as a `#`-list — comma-separated
 * `<single-animation-timeline>` values, one per sub-animation (O.W4b S2).
 *
 * @example
 * parseAnimationTimelineList("scroll(root), --main-tl, none")
 * // → [{ kind: "scroll", scroller: "root" }, { kind: "name", name: "--main-tl" }, { kind: "none" }]
 */
export function parseAnimationTimelineList(
    input: string,
    onParseError?: OnParseError,
): AnimationTimelineValue[] {
    const segments = splitTopLevelCommas(input.trim());
    return segments.map((s) => parseAnimationTimeline(s.trim(), onParseError));
}

// ── Lane C — animation-range / -start / -end ──────────────────────────────────
//
// <animation-range>           = <animation-range-start> <animation-range-end>?
// <animation-range-start/end> = normal | <length-percentage>
//                             | <timeline-range-name> <length-percentage>?

const rangePhase: Parser<RangePhase> = any(
    ...RANGE_PHASES.map((p) => utils.istring(p)),
).map((p: string) => p.toLowerCase() as RangePhase);

// A single boundary: `normal` | `<length-percentage>` | `<phase> <lp>?`.
// Structurally the `<linear-stop>` shape (keyword head + optional position).
const rangeBoundary: Parser<RangeBoundary> = any(
    all(rangePhase, ws.next(lengthPercentage).opt()).map(
        ([phase, offset]: [RangePhase, string | undefined]): RangeBoundary =>
            offset != null ? { phase, offset } : { phase },
    ),
    lengthPercentage.map((offset: string): RangeBoundary => ({ offset })),
);

/**
 * Parse one `animation-range` endpoint (`animation-range-start` /
 * `animation-range-end`).
 *
 * @example
 * parseAnimationRangeBoundary("cover 40%")  // → { phase: "cover", offset: "40%" }
 */
export function parseAnimationRangeBoundary(
    input: string,
    onParseError?: OnParseError,
): RangeBoundary {
    return utils.tryParse(rangeBoundary.trim(ws), input, onParseError);
}

const animationRange: Parser<AnimationRangeValue> = all(
    rangeBoundary,
    ws.next(rangeBoundary).opt(),
).map(
    ([start, end]: [RangeBoundary, RangeBoundary | undefined]): AnimationRangeValue =>
        end != null ? { start, end } : { start },
);

/**
 * Parse the `animation-range` shorthand (start + optional end) — CSS → typed.
 *
 * @example
 * parseAnimationRange("entry 0% cover 40%")
 * // → { start: { phase: "entry", offset: "0%" }, end: { phase: "cover", offset: "40%" } }
 */
export function parseAnimationRange(
    input: string,
    onParseError?: OnParseError,
): AnimationRangeValue {
    return utils.tryParse(animationRange.trim(ws), input, onParseError);
}

// ── Lane D — timeline-scope ───────────────────────────────────────────────────
//
// <timeline-scope> = none | all | <dashed-ident>#

const timelineScope: Parser<TimelineScopeValue> = any(
    utils.istring("none").map(() => ({ kind: "none" }) as TimelineScopeValue),
    utils.istring("all").map(() => ({ kind: "all" }) as TimelineScopeValue),
    dashedIdent
        .sepBy(comma, 1)
        .map(
            (names: string[]) =>
                ({ kind: "names", names }) as TimelineScopeValue,
        ),
);

/**
 * Parse a `timeline-scope` value (CSS → typed).
 *
 * @example
 * parseTimelineScope("--a, --b")  // → { kind: "names", names: ["--a", "--b"] }
 */
export function parseTimelineScope(
    input: string,
    onParseError?: OnParseError,
): TimelineScopeValue {
    return utils.tryParse(timelineScope.trim(ws), input, onParseError);
}

// ── §II.3.E — animation-trigger (forward-looking sub-item) ────────────────────
//
// <single-animation-trigger> = <trigger-type> || [<timeline> [<animation-range>]?]

/**
 * Parse a `<single-animation-trigger>` value (CSS → typed). The discrete-trigger
 * layer (Chrome 145), partitioned as a forward-looking sub-item: the type keyword
 * (`once`/`repeat`/`alternate`/`state`) plus an optional timeline + range.
 */
export function parseAnimationTrigger(
    input: string,
    onParseError?: OnParseError,
): AnimationTriggerValue {
    const segments = splitTopLevelTriggerTokens(input.trim());
    const out: AnimationTriggerValue = {};
    let rangeBuf: string[] = [];
    const flushRange = () => {
        if (rangeBuf.length > 0) {
            out.range = parseAnimationRange(rangeBuf.join(" "), onParseError);
            rangeBuf = [];
        }
    };
    for (const tok of segments) {
        const lower = tok.toLowerCase();
        if (
            out.type == null &&
            (TRIGGER_TYPES as readonly string[]).includes(lower)
        ) {
            out.type = lower as TriggerType;
            continue;
        }
        if (
            out.timeline == null &&
            /^(auto|none|--|scroll\(|view\()/i.test(tok)
        ) {
            out.timeline = parseAnimationTimeline(tok, onParseError);
            continue;
        }
        rangeBuf.push(tok);
    }
    flushRange();
    if (out.type == null && out.timeline == null && out.range == null) {
        // Nothing recognised — fail-loud via the timeline parser's diagnostics.
        parseAnimationTimeline(input, onParseError);
    }
    return out;
}

/**
 * Split a trigger value into top-level tokens, keeping `scroll(...)`/`view(...)`
 * whole (the trigger layer mixes a keyword + a parenthesised timeline + a range
 * on one line). W1-8 (lib-parsing F-5): the shared `splitTopLevel` scanner, split
 * on whitespace, tracking parens only. This tokeniser is deliberately NOT
 * string-aware (the trigger grammar carries no string literals) and does NOT trim
 * — `strings: false, trim: false` reproduce the original byte-for-byte.
 */
const splitTopLevelTriggerTokens = (input: string): string[] =>
    utils.splitTopLevel(input, (ch) => /\s/.test(ch), {
        brackets: utils.BRACKETS_ROUND,
        strings: false,
        trim: false,
    });

// ── Lane E — the inverse serializers (typed → CSS) ────────────────────────────
//
// NO default padding — reproduce only present sub-tokens (the
// reverseAnimationShorthand idiom). The round-trip law is the gate core.

/** Serialize an `animation-timeline` value to its canonical CSS string. */
export function serializeAnimationTimeline(v: AnimationTimelineValue): string {
    switch (v.kind) {
        case "auto":
            return "auto";
        case "none":
            return "none";
        case "name":
            return v.name;
        case "scroll": {
            const parts: string[] = [];
            // Canonical order: <scroller> then <axis> (matches the MDN listing).
            if (v.scroller != null) parts.push(v.scroller);
            if (v.axis != null) parts.push(v.axis);
            return `scroll(${parts.join(" ")})`;
        }
        case "view": {
            const parts: string[] = [];
            if (v.axis != null) parts.push(v.axis);
            if (v.inset != null) {
                parts.push(v.inset.start);
                if (v.inset.end != null) parts.push(v.inset.end);
            }
            return `view(${parts.join(" ")})`;
        }
    }
}

const serializeBoundary = (b: RangeBoundary): string => {
    const parts: string[] = [];
    if (b.phase != null) parts.push(b.phase);
    if (b.offset != null) parts.push(b.offset);
    return parts.join(" ");
};

/** Serialize an `animation-range` value to its canonical CSS string. */
export function serializeAnimationRange(v: AnimationRangeValue): string {
    const parts = [serializeBoundary(v.start)];
    if (v.end != null) parts.push(serializeBoundary(v.end));
    return parts.join(" ");
}

/** Serialize a `timeline-scope` value to its canonical CSS string. */
export function serializeTimelineScope(v: TimelineScopeValue): string {
    switch (v.kind) {
        case "none":
            return "none";
        case "all":
            return "all";
        case "names":
            return v.names.join(", ");
    }
}

/** Serialize an `animation-trigger` value to its canonical CSS string. */
export function serializeAnimationTrigger(v: AnimationTriggerValue): string {
    const parts: string[] = [];
    if (v.type != null) parts.push(v.type);
    if (v.timeline != null) parts.push(serializeAnimationTimeline(v.timeline));
    if (v.range != null) parts.push(serializeAnimationRange(v.range));
    return parts.join(" ");
}

/**
 * The aggregate inverse — the mirror of `reverseAnimationShorthand`
 * (`animation-shorthand.ts:262`). Emits only present fields (no default
 * padding); the property keys mirror the CSS longhand names.
 */
export function serializeTimelineOptions(opts: CSSTimelineOptions): {
    "animation-timeline"?: string;
    "animation-range"?: string;
    "timeline-scope"?: string;
    "animation-trigger"?: string;
} {
    const out: {
        "animation-timeline"?: string;
        "animation-range"?: string;
        "timeline-scope"?: string;
        "animation-trigger"?: string;
    } = {};
    if (opts.timeline != null)
        out["animation-timeline"] = serializeAnimationTimeline(opts.timeline);
    if (opts.range != null)
        out["animation-range"] = serializeAnimationRange(opts.range);
    if (opts.timelineScope != null)
        out["timeline-scope"] = serializeTimelineScope(opts.timelineScope);
    if (opts.trigger != null)
        out["animation-trigger"] = serializeAnimationTrigger(opts.trigger);
    return out;
}

// ── Lane F — the aggregate stylesheet extractor ───────────────────────────────
//
// Mirror of extractAnimationOptions (extract.ts:189): walk a parsed Stylesheet,
// merge every recognised scroll-grammar longhand into one CSSTimelineOptions in
// CSS cascade order (later declarations override earlier).

const applyTimelineLonghand = (
    out: CSSTimelineOptions,
    name: string,
    valueText: string,
): void => {
    const v = valueText.trim();
    switch (name) {
        case "animation-timeline": {
            // The `#`-list form (multiple timelines) — store the list AND the
            // first as the single-timeline shorthand (BC) (O.W4b S2).
            if (splitTopLevelCommas(v).length > 1) {
                const list = parseAnimationTimelineList(v);
                out.timelines = list;
                if (list[0] != null) out.timeline = list[0];
            } else {
                out.timeline = parseAnimationTimeline(v);
            }
            return;
        }
        case "animation-range":
            out.range = parseAnimationRange(v);
            return;
        case "animation-range-start": {
            const start = parseAnimationRangeBoundary(v);
            out.range = { start, ...(out.range?.end ? { end: out.range.end } : {}) };
            return;
        }
        case "animation-range-end": {
            const end = parseAnimationRangeBoundary(v);
            const start = out.range?.start ?? { phase: "normal" };
            out.range = { start, end };
            return;
        }
        case "timeline-scope":
            out.timelineScope = parseTimelineScope(v);
            return;
        case "animation-trigger":
            out.trigger = parseAnimationTrigger(v);
            return;
    }
};

/**
 * Walk a parsed stylesheet's top-level style rules and merge every recognised
 * scroll-grammar longhand into a single `CSSTimelineOptions`. The mirror of
 * `extractAnimationOptions` (`extract.ts:189`); later declarations override
 * earlier (CSS cascade).
 */
// Recursive walk: style-rule declarations merge in cascade order, and the
// walker descends into `children` of nested style rules and the container
// at-rules (`@layer`/`@media`/`@supports` → kind:"unknown", `@scope`,
// `@starting-style`) so a `timeline-scope`/`animation-timeline` declaration
// nested inside one is found (O.W4b S4 — depends on O.W4 S8's `children`).
const walkTimelineOptions = (
    items: Stylesheet,
    out: CSSTimelineOptions,
): void => {
    for (const item of items) {
        if (item.kind === "style") {
            for (const decl of item.declarations as Declaration[]) {
                applyTimelineLonghand(out, decl.name, decl.value.toString());
            }
            if (item.children) walkTimelineOptions(item.children, out);
            continue;
        }
        if (
            (item.kind === "unknown" ||
                item.kind === "scope" ||
                item.kind === "starting-style") &&
            "children" in item &&
            item.children
        ) {
            walkTimelineOptions(item.children, out);
        }
    }
};

export function extractTimelineOptions(s: Stylesheet): CSSTimelineOptions {
    const out: CSSTimelineOptions = {};
    walkTimelineOptions(s, out);
    return out;
}

/**
 * Build the named-timeline registry from `@scroll-timeline` / `@view-timeline`
 * at-rules in the stylesheet (O.W4b S3). Walks top-level items (timeline
 * registrations are top-level at-rules).
 */
export function extractNamedTimelines(s: Stylesheet): NamedTimelineRegistry {
    const out: NamedTimelineRegistry = {
        scroll: new Map(),
        view: new Map(),
    };
    const visit = (items: StylesheetItem[]): void => {
        for (const item of items) {
            if (item.kind === "scroll-timeline") {
                out.scroll.set(item.name, item.descriptor);
            } else if (item.kind === "view-timeline") {
                out.view.set(item.name, item.descriptor);
            } else if (
                (item.kind === "unknown" ||
                    item.kind === "scope" ||
                    item.kind === "starting-style" ||
                    item.kind === "style") &&
                "children" in item &&
                item.children
            ) {
                visit(item.children);
            }
        }
    };
    visit(s);
    return out;
}
