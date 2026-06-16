import { memoize } from "../utils";
import type { CSSAnimationOptions } from "./extract";
import { parseCSSTime } from "./index";
import { splitTopLevelCommas } from "./utils";

/**
 * Tokenise the value of an `animation` shorthand declaration into
 * top-level whitespace-separated tokens, respecting nested parens
 * (so `cubic-bezier(0.1, 0.7, 1, 0.1)` stays one token) and string
 * literals.
 */
const tokeniseShorthand = (input: string): string[] => {
    const tokens: string[] = [];
    let buf = "";
    let depth = 0;
    let inString: string | null = null;

    const flush = () => {
        const t = buf.trim();
        if (t.length > 0) tokens.push(t);
        buf = "";
    };

    for (let i = 0; i < input.length; i++) {
        const ch = input[i]!;
        if (inString) {
            if (ch === "\\" && i + 1 < input.length) {
                buf += ch + input[++i]!;
                continue;
            }
            if (ch === inString) inString = null;
            buf += ch;
            continue;
        }
        if (ch === '"' || ch === "'") {
            inString = ch;
            buf += ch;
            continue;
        }
        if (ch === "(") {
            depth++;
            buf += ch;
            continue;
        }
        if (ch === ")") {
            depth--;
            buf += ch;
            continue;
        }
        if (depth === 0 && /\s/.test(ch)) {
            flush();
            continue;
        }
        buf += ch;
    }
    flush();
    return tokens;
};

const TIME_RE = /^-?(?:\d+\.?\d*|\.\d+)(?:s|ms)$/i;
const NUMBER_RE = /^\d+\.?\d*$/;

const NAMED_TIMING = new Set([
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "step-start",
    "step-end",
]);
const TIMING_FUNCTIONS = new Set([
    "cubic-bezier",
    "steps",
    "linear",
]);

const DIRECTIONS = new Set([
    "normal",
    "reverse",
    "alternate",
    "alternate-reverse",
]);
const FILL_MODES = new Set(["none", "forwards", "backwards", "both"]);
const COMPOSITIONS = new Set(["replace", "add", "accumulate"]);
const PLAY_STATES = new Set(["running", "paused"]);

const isTimingToken = (token: string): boolean => {
    const lower = token.toLowerCase();
    if (NAMED_TIMING.has(lower)) return true;
    const fnName = lower.split("(", 1)[0]!;
    return TIMING_FUNCTIONS.has(fnName);
};

const isAnimationName = (token: string): boolean => {
    // CSS ident — may also be `none`, but we treat `none` as a name
    // when it appears in animation-name slot.
    return /^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(token);
};

/**
 * Parse a single `<single-animation>` value (one comma-segment of an
 * `animation` shorthand). Tokens may appear in any order; order is
 * disambiguated as follows:
 * - First time → duration. Second time → delay.
 * - Number / `infinite` → iterationCount.
 * - Recognised keyword sets → direction / fillMode / composition / play-state.
 * - First easing function or named timing → timingFunction.
 * - First non-keyword identifier left over → name.
 *
 * Unknown tokens are ignored. Caller decides whether to throw on
 * conflicts.
 */
const parseSingleAnimation = (input: string): CSSAnimationOptions => {
    const out: CSSAnimationOptions = {};
    const tokens = tokeniseShorthand(input);

    let timesSeen = 0;
    let nameAssigned = false;

    for (const token of tokens) {
        const lower = token.toLowerCase();

        if (TIME_RE.test(token)) {
            const ms = parseCSSTime(token);
            if (timesSeen === 0) out.duration = ms;
            else if (timesSeen === 1) out.delay = ms;
            timesSeen++;
            continue;
        }

        if (lower === "infinite") {
            out.iterationCount = Infinity;
            continue;
        }

        if (NUMBER_RE.test(token)) {
            const n = Number(token);
            if (Number.isFinite(n) && n >= 0) {
                out.iterationCount = n;
                continue;
            }
        }

        if (DIRECTIONS.has(lower)) {
            out.direction = lower as NonNullable<CSSAnimationOptions["direction"]>;
            continue;
        }

        if (FILL_MODES.has(lower) && nameAssigned) {
            // `none` is ambiguous between fill-mode and animation-name.
            // Once we've assigned a name, treat `none` as fill-mode.
            out.fillMode = lower as NonNullable<CSSAnimationOptions["fillMode"]>;
            continue;
        }
        if (FILL_MODES.has(lower) && lower !== "none") {
            out.fillMode = lower as NonNullable<CSSAnimationOptions["fillMode"]>;
            continue;
        }

        if (COMPOSITIONS.has(lower)) {
            out.composition = lower as NonNullable<
                CSSAnimationOptions["composition"]
            >;
            continue;
        }

        if (PLAY_STATES.has(lower)) {
            // play-state has no CSSAnimationOptions field; ignored.
            continue;
        }

        if (isTimingToken(token) && out.timingFunction == null) {
            out.timingFunction = token;
            continue;
        }

        if (!nameAssigned && isAnimationName(token)) {
            // Final fall-through: treat as animation-name.
            out.name = token;
            nameAssigned = true;
            continue;
        }

        // Unknown token — ignored.
    }

    // If `none` was the only fill-mode-ish token and no name was
    // assigned, it was an animation-name `none`.
    return out;
};

/**
 * Parse the value of an `animation` shorthand declaration into one
 * options object per comma-segment.
 *
 * Per CSS Animations spec, `animation: 1s ease-in, 500ms linear`
 * declares two animations. This function returns both; callers that
 * only support a single animation should take `[0]`.
 */
export const parseAnimationShorthand = memoize(
    (input: string): CSSAnimationOptions[] => {
        const segments = splitTopLevelCommas(input);
        return segments.map((seg) => parseSingleAnimation(seg));
    },
    // keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see
    // comment in src/parsing/index.ts.
    { keyFn: (input: string) => input },
);

/**
 * Reverse: emit a single `animation` shorthand string from an options
 * object. Always emits in canonical order:
 * `<duration> <timing-function> <delay> <iteration-count>
 *  <direction> <fill-mode> <composition> <name>`.
 *
 * Fields that are unset are omitted entirely (no `0s` placeholders).
 */
export const reverseAnimationShorthand = (opts: CSSAnimationOptions): string => {
    const parts: string[] = [];
    if (opts.duration != null) parts.push(formatTime(opts.duration));
    if (opts.timingFunction != null) parts.push(opts.timingFunction);
    if (opts.delay != null) parts.push(formatTime(opts.delay));
    if (opts.iterationCount != null) {
        parts.push(
            opts.iterationCount === Infinity
                ? "infinite"
                : String(opts.iterationCount),
        );
    }
    if (opts.direction != null) parts.push(opts.direction);
    if (opts.fillMode != null) parts.push(opts.fillMode);
    if (opts.composition != null) parts.push(opts.composition);
    if (opts.name != null) parts.push(opts.name);
    return parts.join(" ");
};

const formatTime = (ms: number): string => {
    if (ms >= 5000 && ms % 1000 === 0) return `${ms / 1000}s`;
    if (ms >= 1000 && ms % 1 === 0 && ms < 5000) {
        // 1000ms → 1s, 1500ms → 1.5s; tighter than the legacy
        // ≥5000 threshold so authors get readable seconds.
        return `${ms / 1000}s`;
    }
    return `${ms}ms`;
};
