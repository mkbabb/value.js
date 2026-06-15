# VJ.W1 / N.W11′ — the CSSTimelineOptions scroll-grammar extractor + inverse serializer (SCRATCH SPEC)

**Status:** SCRATCH — develop-to-executable-depth report for the EXECUTION-ORCHESTRATION §3 fold.
NOT the final N.W11′ wave doc. Authored 2026-06-15 by the value.js execution-development author
(DOCS ONLY). Every claim cites a value.js `src/` file:line, the EXECUTION-ORCHESTRATION §, or the
kf-K consume seam (`docs/tranches/K/waves/K.W9.md`, `KF-TO-VALUEJS-GRAMMAR-ASKS.md §1`).

**Binding context:** `docs/tranches/N/EXECUTION-ORCHESTRATION.md §3` (VJ.W1 = "the ONE genuine
net-new GRAMMAR … a sibling library wave **N.W11′**, born-RED against the kf-K consume edge,
shipping in the same **0.13.0** cut"); `N.md §4` (the spec idiom: §-structured, hard-gate-per-wave,
file:line-grounded); `WAVES-2.md` (the second-block wave-section idiom — the per-lane table + the
hard gate). The mirror inbound ask: `../keyframes.js/docs/tranches/K/KF-TO-VALUEJS-GRAMMAR-ASKS.md §1`.

---

## §0 — Thesis (one sentence) + the precise gap

> **N.W11′ ships the typed `CSSTimelineOptions` scroll-VALUE grammar — a net-new parser + inverse
> serializer over the `animation-timeline`/`-range`/`timeline-scope`/`animation-trigger` property
> values, authored in the exact parser-combinator idiom `parsing/easing.ts` already uses, beside
> the `parsing/extract.ts` stylesheet animation extractor — un-blocking kf-K.W9's scroll-as-CSS
> PARSE round-trip in the 0.13.0 cut.**

**The gap is precise (registry-probed + source-probed 2026-06-15):**

- **PRESENT — the property NAMES.** `STYLE_NAMES` (`src/units/constants.ts:167`) already lists the
  scroll-timeline property identifiers: `animationRange` `:185`, `animationRangeEnd` `:186`,
  `animationRangeStart` `:187`, `animationTimeline` `:188`; `scrollTimeline` `:552`,
  `scrollTimelineAxis` `:553`, `scrollTimelineName` `:554`; `timelineScope` `:608`; `viewTimeline`
  `:628`, `viewTimelineAxis` `:629`, `viewTimelineInset` `:630`, `viewTimelineName` `:631`.
  value.js KNOWS these are CSS properties — it can NAME them in a flatten/extract.
- **ABSENT — the typed VALUE grammar.** `grep -rscE "CSSTimelineOptions|parseAnimationTimeline|
  rangePhase|serializeAnimationTimeline" src/` → **ZERO across every file** (probed 2026-06-15).
  `parsing/extract.ts:108-173` (`applyLonghand`) parses `animation` / `animation-name` / `-duration`
  / `-delay` / `-iteration-count` / `-direction` / `-fill-mode` / `-timing-function` / `-composition`
  — and stops there. It does NOT parse `animation-timeline`'s `scroll()`/`view()` functions, does NOT
  parse `animation-range`'s `<timeline-range-name> <length-percentage>` pairs, does NOT parse
  `timeline-scope`, and carries NO inverse serializer for any of them.
- **ABSENT even from the name registry — the 2026 trigger layer.** `grep -n "animationTrigger|
  timelineTrigger" src/units/constants.ts` → ZERO: `animation-trigger`/`timeline-trigger`
  (Chrome 145, the discrete-trigger layer the CSS WG is absorbing from ScrollTrigger) are not even
  in `STYLE_NAMES` yet. VJ.W1 partitions them as a forward-looking SUB-ITEM (§4.E) it may land after
  the scroll-timeline core.

**So the ask is the typed VALUE extractor + inverse serializer over property names value.js mostly
already knows** — net-new VALUE parse/serialize, not net-new property registration. This is a
CORRECTNESS grammar, not a perf claim — **MEASURE-FIRST is NOT applicable** (per
`KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2`: "none for the parse itself (correctness, not perf)").

---

## §1 — The parser-combinator idiom this rides (the value.js ground truth)

VJ.W1 is authored in the EXACT idiom `parsing/easing.ts` proves for `linear()`/`steps()`. The
combinator vocabulary (`@mkbabb/parse-that` via `parsing/utils.ts`):

- `any(...)` — ordered alternation, longest-first (`easing.ts:94-101`, the `<step-position>`
  dispatch); `all(...)` — sequence (`easing.ts:36-40`, `<linear-stop>`); `.sepBy(comma, 1)` —
  comma-list (`easing.ts:56-58`, `<linear-stop-list>`); `.wrap(lparen, rparen)` — parenthesized
  body (`easing.ts:62`); `.trim(whitespace)` / `whitespace.next(...)` — inter-token space
  (`easing.ts:62,40`); `.opt()` — optional term (`easing.ts:37,108`); `.map(...)` — shape the AST
  (`easing.ts:40-53`).
- Primitives from `parsing/utils.ts`: `istring(str)` case-insensitive keyword (`:5-8`),
  `identifier` (`:37`, `/-?[a-zA-Z][a-zA-Z0-9-]*/` — the dashed-ident shape `<dashed-ident>` needs),
  `number` (`:43`), `integer` (`:41`), `none` (`:39`), `succeed`/`fail` (`:46-57`).
- The entry shape: `tryParse(parser, input, onParseError?)` (`utils.ts:123-135`) — fail-loud, with
  the structured `ParseDiagnostic`/`OnParseError` sink (`utils.ts:65-80`) value.js shipped in N.W7;
  and the non-throwing `parseResult` (`utils.ts:145-155`). VJ.W1's public entries use BOTH (the
  totality entry takes the optional `onParseError`, matching `parseLinearStops`/`parseSteps`).

**The DIVISION-OF-LABOUR law VJ.W1 must hold** (`easing.ts:6-15`, verbatim charter): "the parser
emits the raw structured stops/args verbatim from the CSS source, and the evaluator resolves gaps,
defaults, and the step staircase. Keep it that way — a parser that pre-resolves gaps would double
the spec semantics across two modules." **For VJ.W1 this means: the parser emits the typed options
VERBATIM (the named-timeline reference as a `<dashed-ident>` string, `auto`/`none` as themselves,
the range-phase keyword as-written); it does NOT resolve `scroll()` defaults against a live DOM, does
NOT compute the offset from a scroller — that is the kf-K `ScrollScene` driver's job (time, not
value).** The boundary principle (`L-SEED.md §7`): "value.js owns VALUES … keyframes.js owns TIME."

---

## §2 — The producer SIGNATURE value.js ships (the type surface)

A NEW module `src/parsing/scroll-timeline.ts`, beside `parsing/extract.ts`/`animation-shorthand.ts`
(where the `animation-*` VALUE parsing already lives), re-exported through `src/index.ts` (the
0.13.0 surface — beside the `:238` `parseLinearStops`/`parseSteps` and `:271`
`CSSAnimationOptions` rows).

### §2.1 The typed `CSSTimelineOptions` type surface

```ts
// src/parsing/scroll-timeline.ts

/** A `<scroller>` keyword for `scroll(<scroller> <axis>)`. */
export type ScrollerKeyword = "nearest" | "root" | "self";
/** A scroll/view `<axis>`. */
export type TimelineAxis = "block" | "inline" | "x" | "y";

/**
 * A parsed `animation-timeline` VALUE. One of:
 *  - `{ kind: "auto" }` / `{ kind: "none" }`
 *  - `{ kind: "name", name: "--my-tl" }`        // a `<dashed-ident>` named-timeline ref
 *  - `{ kind: "scroll", scroller, axis }`        // anonymous scroll() timeline
 *  - `{ kind: "view", axis, inset }`             // anonymous view() timeline
 * scroller/axis/inset are emitted VERBATIM (omitted = `undefined`, NOT defaulted —
 * the §1 division-of-labour law; the consumer/driver applies CSS defaults).
 */
export type AnimationTimelineValue =
    | { kind: "auto" }
    | { kind: "none" }
    | { kind: "name"; name: string }
    | { kind: "scroll"; scroller?: ScrollerKeyword; axis?: TimelineAxis }
    | { kind: "view"; axis?: TimelineAxis; inset?: ViewInset };

/** `view()` inset: 0, 1, or 2 `<length-percentage>` (or `auto`) tokens, as-written. */
export type ViewInset = { start: string; end?: string };

/** The `<timeline-range-name>` keyword set for `animation-range`. */
export type RangePhase =
    | "normal" | "cover" | "contain"
    | "entry" | "exit" | "entry-crossing" | "exit-crossing";

/**
 * One endpoint of an `animation-range[-start|-end]`. `phase` omitted ⇒ a bare
 * `<length-percentage>` (or `normal`). `offset` omitted ⇒ the phase's implied
 * default (`0%`/`100%`) — NOT filled here (the driver resolves it).
 */
export type RangeBoundary = { phase?: RangePhase; offset?: string };

/** A parsed `animation-range` (start + optional end), each a RangeBoundary. */
export type AnimationRangeValue = { start: RangeBoundary; end?: RangeBoundary };

/** `timeline-scope`: `none` | `all` | a list of `<dashed-ident>`. */
export type TimelineScopeValue =
    | { kind: "none" }
    | { kind: "all" }
    | { kind: "names"; names: string[] };

/**
 * The aggregate typed scroll grammar — the mirror of `CSSAnimationOptions`
 * (extract.ts:16-25). Each field is the parsed VALUE of one property; absent
 * fields mean the declaration did not appear. Renderer/driver concerns
 * (which DOM scroller, the resolved px offset) are NOT here — kf owns TIME.
 */
export interface CSSTimelineOptions {
    timeline?: AnimationTimelineValue;     // animation-timeline
    range?: AnimationRangeValue;           // animation-range (+ -start/-end longhands)
    timelineScope?: TimelineScopeValue;    // timeline-scope
    trigger?: AnimationTriggerValue;       // animation-trigger (§4.E — forward-looking sub-item)
}
```

### §2.2 The extractor signatures (parse: CSS → typed)

```ts
/** Parse one `animation-timeline` value. Throws (fail-loud) on malformed input;
 *  emits a ParseDiagnostic to `onParseError` first when supplied (utils.ts:123). */
export function parseAnimationTimeline(
    input: string, onParseError?: OnParseError,
): AnimationTimelineValue;

/** Parse an `animation-range` (the 2-endpoint shorthand) or a single
 *  `animation-range-start`/`-end` value into a RangeBoundary. */
export function parseAnimationRange(
    input: string, onParseError?: OnParseError,
): AnimationRangeValue;
export function parseAnimationRangeBoundary(input: string): RangeBoundary;

/** Parse `timeline-scope`. */
export function parseTimelineScope(input: string): TimelineScopeValue;

/**
 * The aggregate stylesheet extractor — the MIRROR of `extractAnimationOptions`
 * (extract.ts:189-200). Walk a parsed `Stylesheet`, merge every recognised
 * scroll-grammar longhand (animation-timeline / -range / -range-start / -range-end /
 * timeline-scope / animation-trigger) into one CSSTimelineOptions (CSS cascade order).
 */
export function extractTimelineOptions(s: Stylesheet): CSSTimelineOptions;
```

### §2.3 The inverse serializer signatures (typed → CSS)

```ts
/** Emit an `animation-timeline` value string from the typed value.
 *  scroll()/view() reproduce only the present sub-tokens (no default padding —
 *  the reverseAnimationShorthand idiom, animation-shorthand.ts:262-279). */
export function serializeAnimationTimeline(v: AnimationTimelineValue): string;
export function serializeAnimationRange(v: AnimationRangeValue): string;
export function serializeTimelineScope(v: TimelineScopeValue): string;

/** The aggregate inverse — emit the `animation-timeline`/`-range`/`timeline-scope`
 *  declarations from a CSSTimelineOptions, the mirror of reverseAnimationShorthand. */
export function serializeTimelineOptions(opts: CSSTimelineOptions): {
    "animation-timeline"?: string;
    "animation-range"?: string;
    "timeline-scope"?: string;
    "animation-trigger"?: string;
};
```

**Round-trip law (the gate's core):** for every valid input `s`,
`serializeAnimationTimeline(parseAnimationTimeline(s))` is CSS-equivalent to `s` (canonical-form
equal — whitespace-normalized, default-omitted), exactly as `reverseAnimationShorthand` round-trips
`parseAnimationShorthand` (`animation-shorthand.ts:200-279`). This is what kf-K.W9's
`proof:scroll-roundtrip` clause (b) asserts on the published producer.

---

## §3 — The grammar (the four MDN sub-grammars, in the easing.ts idiom)

Each sub-grammar names the combinator skeleton (the `easing.ts` analogue) so the wave doc can land
it verbatim. All keyword sets use `istring` (case-insensitive, `utils.ts:5`); `<dashed-ident>` uses
`identifier` (`utils.ts:37`) guarded to a `--`-prefix.

### §3.A `animation-timeline` (MDN `animation-timeline` value grammar)

```
<single-animation-timeline> = auto | none | <dashed-ident>
                            | scroll([<axis> || <scroller>]) | view([<axis> || <inset>])
<axis>     = block | inline | x | y
<scroller> = root | nearest | self
```

Combinator skeleton (mirrors `linearFunction`, `easing.ts:60-62`):
```ts
const axis = any(istring("block"), istring("inline"), istring("x"), istring("y"));
const scroller = any(istring("nearest"), istring("root"), istring("self"));
const scrollFn = istring("scroll").next(
    // `<axis> || <scroller>` — order-free pair, each optional; the `||` combinator
    // is two `.opt()` terms tried in both orders (the any() longest-first idiom).
    all(axis.trim(ws).opt(), scroller.trim(ws).opt()).trim(ws).wrap(lparen, rparen)
).map(([a, sc]) => ({ kind: "scroll", ...(a && {axis:a}), ...(sc && {scroller:sc}) }));
const animationTimeline = any(
    istring("auto").map(() => ({ kind: "auto" })),
    none.map(() => ({ kind: "none" })),
    scrollFn, viewFn,
    dashedIdent.map((name) => ({ kind: "name", name })),  // fall-through: named ref
);
```
The `||` (order-free, each-optional) form is the one combinator easing.ts does not already show;
it is two `.opt()` terms whose presence is order-independent — implement as
`any(all(axis.opt(), ws.next(scroller).opt()), all(scroller.opt(), ws.next(axis).opt()))` or a
small `permutationOpt` helper local to the module. **Named-ref fall-through is LAST** (the
`isAnimationName` final-fall-through idiom, `animation-shorthand.ts:177-182`).

### §3.B `animation-range` / `-start` / `-end`

```
<animation-range>          = <animation-range-start> <animation-range-end>?
<animation-range-start/end> = normal | <length-percentage> | <timeline-range-name> <length-percentage>?
<timeline-range-name>       = cover | contain | entry | exit | entry-crossing | exit-crossing
```
The `<timeline-range-name> <length-percentage>?` pair is structurally the `<linear-stop>` shape
(`easing.ts:36-53`: a keyword head + an optional position). `<length-percentage>` is emitted
VERBATIM as a string (the parser does NOT resolve `25%` → px — the driver does). `normal` and a
bare `<length-percentage>` are the no-phase boundary. The 2-endpoint shorthand splits on the phase
boundary the way `parseSingleAnimation` walks tokens (`animation-shorthand.ts:113-189`).

### §3.C `timeline-scope`

```
<timeline-scope> = none | all | <dashed-ident>#
```
A `.sepBy(comma, 1)` of `<dashed-ident>` (the `<linear-stop-list>` idiom, `easing.ts:56-58`), with
`none`/`all` as `any` alternatives ahead of the list.

### §3.D the splitTopLevelCommas reuse

`animation-timeline`/`-range`/`timeline-scope` are all `#`-lists at the property level (one entry
per `animation:` segment). The top-level comma split is ALREADY written —
`splitTopLevelCommas` (`animation-shorthand.ts:210-252`, paren/string-aware). VJ.W1 reuses it (or
its exported twin) rather than re-authoring comma-splitting (KISS — `N.md §6` invariant idiom).

### §3.E `animation-trigger` / `timeline-trigger` (the forward-looking sub-item)

```
<single-animation-trigger> = <single-animation-trigger-type> || [<timeline> [<animation-range>]?]
<single-animation-trigger-type> = once | repeat | alternate | state
```
The Chrome-145 discrete layer. ABSENT even from `STYLE_NAMES` today (§0). VJ.W1 **partitions this as
a sub-item it lands AFTER the scroll-timeline core** (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2` item 4:
"value.js partitions it as a sub-item it may land after the scroll-timeline core"). The core
(A/B/C) is what kf-K.W9's clause (b) gates on; the trigger layer is a widening on a later patch.
**If the trigger layer slips past 0.13.0, it falls to the post-N Tranche O (§8) — it does NOT block
the core cut.**

---

## §4 — The born-RED gate (value.js-side — REDs because the symbol is ABSENT today)

A value.js test/probe that REDs against 0.12.0 (the symbol is absent), GREEN when N.W11′ ships.
The wave doc's hard gate, in the `N.md §4`/`WAVES-2.md` per-wave-gate idiom:

**Born-RED probe (the absence, verifiable TODAY):**
```sh
grep -rscE "CSSTimelineOptions|parseAnimationTimeline|serializeAnimationTimeline|rangePhase" src/
# → 0 across every file (probed 2026-06-15). The symbol does not exist.
```

**The GREEN-when-shipped gate roster (the new `test/scroll-timeline.test.ts`):**
1. **Parse correctness** — `parseAnimationTimeline("scroll(root block)")` →
   `{kind:"scroll", scroller:"root", axis:"block"}`; `view(inline auto)` → the view value;
   `--my-tl` → `{kind:"name", name:"--my-tl"}`; `auto`/`none` → their kinds. The order-free
   `scroll(block root)` ≡ `scroll(root block)`.
2. **Range correctness** — `parseAnimationRange("entry 0% cover 40%")` → start `{phase:"entry",
   offset:"0%"}`, end `{phase:"cover", offset:"40%"}`; a bare `"50%"` → `{offset:"50%"}`;
   `"normal"` → `{phase:"normal"}` (or no-phase). The 6 `<timeline-range-name>` keywords each parse.
3. **Scope correctness** — `parseTimelineScope("--a, --b")` → `{kind:"names", names:["--a","--b"]}`;
   `none`/`all` → their kinds.
4. **Inverse round-trip (the kf-mirror gate)** — for a corpus of valid declarations,
   `serialize(parse(s))` is canonical-form-equal to `s` (the `reverseAnimationShorthand` round-trip
   law, `animation-shorthand.ts:262-279`). This is the EXACT clause kf-K.W9 `proof:scroll-roundtrip`
   (b) reciprocates.
5. **Aggregate extract** — `extractTimelineOptions(parseStylesheet(css))` merges longhands across a
   rule (the `extractAnimationOptions` cascade idiom, `extract.ts:189-200`).
6. **Totality / fail-loud** — a malformed `scroll(` emits a `ParseDiagnostic` to the supplied
   `onParseError` sink AND throws (`tryParse`, `utils.ts:123-135`) — the partial-input contract
   the diagnostics producer already enforces.

**Acceptance:** all six green; the grep-absence probe inverts (the symbols now resolve);
`src/index.ts` re-exports the public surface; the 0.13.0 cut publishes; **kf-K notified at the cut.**

---

## §5 — The kf-K consume edge (K.W9, file-level) + the acyclic cadence

**The consume seam (exact, reciprocal with `K.W9.md §S1` / `KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.3`):**

- **The kf consumer:** a NEW `src/animation/scroll.ts` (HEAVY — it needs the parser; reached via
  `loadAnimationEngine()`, the static/dynamic boundary HOLDS). It is the `ScrollScene` /
  `createScrollScene(spec|css)` driver that CALLS `parseAnimationTimeline` / the
  `CSSTimelineOptions` extractor on its parse leg. `K.W9.md §S1` confirms `src/animation/scroll.ts`
  and `createScrollScene` do NOT exist today (born-RED root 1).
- **The inverse-serialize leg:** threads value.js's `serializeAnimationTimeline` through kf's
  `format.ts:53-85` serialize-from-template authority (the J.W1 S1 ENG-1 declared-template
  projection — `format.ts:31 serializeEasing` is the existing twin; the scroll serializer rides the
  same "project from the declared template, never a DOM-resolved sample" law).
- **The gate it lights:** kf `proof:scroll-roundtrip` clause **(b)** — the PARSE round-trip. Clauses
  (a)/(c)/(d) (the `ScrollScene` driver, the dispatch matrix to native `ScrollTimeline` /
  `attachNativeScrollTimeline` via `timeline.ts`, the `position:sticky` pin synthesis) are
  value.js-INDEPENDENT — they compose SHIPPED kf primitives (`SmoothProgress`/`decay`/
  `SpringProgress`/`ScrollTimeline`) and GREEN on K.W7's substrate WITHOUT VJ.W1.

**The acyclic cadence (one beat behind — `EXECUTION-ORCHESTRATION §4`):**
```
value.js N.W11′ lands the parser/serializer born-RED (its own test reds: symbol absent)
   → value.js publishes 0.13.0 (= N.W11 color-SOTA + N.W11′ scroll grammar)
      → kf K.W9's src/animation/scroll.ts consumer re-pins one tranche behind; clause (b) GREENS
```
**kf's impl never blocks:** the kf source half (the `ScrollScene` driver) lands NOW, born-RED
against the recorded VJ.W1 absence; clause (b) REDs until value.js publishes; the consume edge
LIGHTS on the publish. **NEVER a `file:` link to value.js's WIP tree, NEVER a vendored copy of the
grammar** (the acyclic-spine invariant — `K.md §invariant set`). No cycle: value.js → kf (grammar);
kf → glass-ui (spring); no back-edge (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §header`).

---

## §6 — Why a SIBLING library wave N.W11′ (not a leg of N.W11, not a post-N tranche)

**Why NOT fold into N.W11 (the way VJ.W2 folds into N.W11.D):** N.W11's scope is the color-SOTA
library wave — gamut-map re-anchor + the §13.2 oracle + wide-gamut egress (`WAVES-2.md §N.W11`),
all touching `units/color/gamut.ts`/`mix.ts`/`conversions/`. VJ.W2 (`sampleColorRamp`) is ~S-effort
beside that color work — it REUSES `lerpColorValue` (`units/interpolate.ts:104`) + `gamutMapOKLab`
(`gamut.ts:247`) + `mixColorsN` (`mix.ts:28`), so it folds as **N.W11.D** (a leg). VJ.W1 is a
DIFFERENT substrate entirely — a `parsing/`-path parser + inverse serializer, touching ZERO color
code. It does not fit N.W11's color scope; bolting a scroll-grammar parser onto a color wave would
violate the file-disjoint-lane discipline the rounds depend on (`EXECUTION-ORCHESTRATION §2` R2:
"library-only … runs beside everything").

**Why a SIBLING wave, not a post-N tranche:** VJ.W1 is **bigger than N.W11's color scope** (a full
parser + inverse serializer + the aggregate extractor — §2/§3) BUT it is **pure library/parsing
work, value.js-internal, with ZERO demo dependency and ZERO BA gate** — so it rides BESIDE the
library track in **R2** (`EXECUTION-ORCHESTRATION §2`), contending with neither the design body
(W12–W17) nor the BA-cut consume (W18). It is exactly the profile of a sibling library wave: too
big to be a leg of a color wave, too purely-library to need its own tranche. Per
`EXECUTION-ORCHESTRATION §3`: "it IS pure library work (parsing), value.js-internal, no demo
dependency — so it rides beside the library track as a sibling wave **N.W11′** (the scroll-grammar
library wave), born-RED against the kf-K consume edge, shipping in the same **0.13.0** cut."

**The net:** value.js ships **0.13.0 = N.W11 (color-SOTA + the ramp N.W11.D) + N.W11′ (scroll
grammar)**, un-blocking kf-K.W9 (scroll, clause b) and K.W10-CC2 (densify) **within the
constellation beat**, not a tranche later — exactly as value.js + keyframes advanced together at
0.12.0 (`EXECUTION-ORCHESTRATION §3` "Net").

---

## §7 — The slot into N + the round it runs

| Slot | Value |
|---|---|
| **Wave** | **N.W11′** — the scroll-grammar library wave (sibling to N.W11) |
| **Round** | **R2** (library ∥ keystone — `EXECUTION-ORCHESTRATION §2`), beside N.W11 + N.W12; library-only, no demo dep, no BA gate |
| **Cut** | **0.13.0** (N.W11 + N.W11′ together) |
| **Locus** | NEW `src/parsing/scroll-timeline.ts`; re-exported via `src/index.ts` (beside `:238`/`:271`/`:275`); new `test/scroll-timeline.test.ts` |
| **Idiom** | the `parsing/easing.ts` parser-combinator idiom (§1); the mirror of `extract.ts` `CSSAnimationOptions`/`extractAnimationOptions` (§2) + `animation-shorthand.ts` `reverseAnimationShorthand` (§2.3) |
| **Born-RED** | the grep-absence probe (§4); REDs on 0.12.0, GREEN on the N.W11′ publish |
| **kf consume** | K.W9 `src/animation/scroll.ts` (HEAVY) → `proof:scroll-roundtrip` clause (b); lights on the 0.13.0 publish |
| **MEASURE-FIRST** | N/A — correctness grammar, not a perf claim (§0) |

**Hard gate (the `WAVES-2.md` per-wave-gate idiom):** the six §4 tests green; the absence-probe
inverts; `parseAnimationTimeline`/`parseAnimationRange`/`parseTimelineScope` +
`serializeAnimationTimeline`/`serializeAnimationRange`/`serializeTimelineScope` +
`extractTimelineOptions` exported from `src/index.ts`; the round-trip law holds on the corpus;
0.13.0 published; kf-K notified at the cut (the `proof:scroll-roundtrip` (b) consume edge lights).

---

## §8 — The post-N Tranche O fallback (if the fold is declined)

If N is judged too large to absorb N.W11′, the clean fallback is the named tight **post-N Tranche O**
(library-only: VJ.W1 + VJ.W2 + any VJ-ledger residue), dispatched the moment N's library track is
free (`EXECUTION-ORCHESTRATION §3` final ¶; `KF-TO-VALUEJS-GRAMMAR-ASKS.md §4`). The kf consume edge
is IDENTICAL either way — `K.W9.md §S1`'s born-RED clause (b) lights on whichever cut publishes the
`CSSTimelineOptions` extractor (0.13.0's N.W11′ OR a Tranche-O follow-on), the same acyclic,
published-consume-edge form. **The fold is the better constellation move** (value.js + keyframes
advance together); the post-N tranche is the heavier path and only the fallback. The
`animation-trigger` sub-item (§3.E) is the natural Tranche-O candidate even under the fold, since
the WG is still shipping it — landing the scroll-timeline core in 0.13.0 and the trigger layer in O
is the cleanest partition if the core cut is time-boxed.

---

## §9 — Open questions for the wave-doc author (carried, not resolved here)

1. **The `||` order-free combinator** — implement as a tried-both-orders `any` (§3.A) or mint a
   small `permutationOpt` helper in `parsing/utils.ts`? The wave doc decides; `easing.ts` has no
   `||` precedent, so this is the one net-new combinator pattern.
2. **`splitTopLevelCommas` export** — promote the `animation-shorthand.ts:210` local to an exported
   `parsing/utils.ts` helper (so scroll-timeline reuses it without duplication), or keep it local +
   re-author? KISS argues promote-and-share.
3. **The aggregate `CSSTimelineOptions` vs the per-property entries** — does kf-K.W9 consume the
   aggregate `extractTimelineOptions` OR the per-property `parseAnimationTimeline`? `K.W9.md §S1`
   names `parseAnimationTimeline` + `CSSTimelineOptions` both; ship both (the per-property parsers
   are the primitives, the aggregate extractor composes them — the `extract.ts` two-tier shape).
