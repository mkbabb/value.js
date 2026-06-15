# N.W11′ — THE SCROLL-GRAMMAR LIBRARY WAVE (VJ.W1 · the `CSSTimelineOptions` typed extractor + inverse serializer → 0.13.0)

- **Phase:** DEV — spec RATIFIED (the WAVES-2 second block + the `GRAMMAR-FOLD.md` fold both
  ratified 2026-06-15); awaits IMPL+auth. · **Class:** FRONTIER-library wave — the ONE genuine
  net-new GRAMMAR of Tranche N (a parser + inverse serializer over a net-new VALUE family). The
  capability is ABSENT at `0.12.0` (born-RED in the capability-absent sense, §State-verified); the
  symbol resolves and the round-trip law holds on the N.W11′ publish.
- **Cut:** **0.13.0** — shipped jointly with N.W11 (the color-SOTA wave) and its 4th lane N.W11.D
  (`sampleColorRamp`). `0.13.0 = N.W11 (color-SOTA + the ramp N.W11.D) + N.W11′ (scroll grammar)`
  (`EXECUTION-ORCHESTRATION.md §3` "Net"; `GRAMMAR-FOLD.md §slot-into-N`).
- **Round:** **R2** (library ∥ keystone — `EXECUTION-ORCHESTRATION.md §2`), beside N.W11 + N.W12.
  Library-only, value.js-internal: ZERO demo dependency, ZERO glass-ui BA gate, ZERO contention with
  the design body (W12–W17). It rides BESIDE the library track exactly as N.W11 does.
- **Locus:** a NEW module `src/parsing/scroll-timeline.ts`, beside `parsing/extract.ts` /
  `parsing/animation-shorthand.ts` (where the `animation-*` VALUE parsing already lives), re-exported
  through `src/index.ts` (beside `:238` `parseLinearStops`/`parseSteps` and `:271`
  `CSSAnimationOptions`); a NEW `test/scroll-timeline.test.ts`.
- **DAG-deps:** depends on NOTHING (the parser-combinator substrate `parsing/easing.ts` +
  `parsing/utils.ts` + the N.W7 `OnParseError` diagnostics sink are all SHIPPED at 0.12.0). It is
  CONSUMED one beat behind by **keyframes.js K.W9** (`src/animation/scroll.ts` `createScrollScene`,
  `proof:scroll-roundtrip` clause **(b)**) — born-RED-gated downstream, lighting on the 0.13.0
  publish. No cycle: value.js → kf (grammar); kf → glass-ui (spring); no back-edge.
- **MEASURE-FIRST:** **N/A** — a CORRECTNESS grammar, not a perf claim
  (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2`: "none for the parse itself"). Contrast N.W11.D
  (`sampleColorRamp`), whose composition over kernels DOES carry a MEASURE-FIRST bench.

---

## §Thesis (one sentence)

> **N.W11′ ships the typed `CSSTimelineOptions` scroll-VALUE grammar — a net-new parser + inverse
> serializer over the `animation-timeline` / `-range` / `timeline-scope` / `animation-trigger`
> property values, authored in the EXACT parser-combinator idiom `parsing/easing.ts` already proves
> for `linear()` / `steps()`, beside the `parsing/extract.ts` stylesheet animation extractor —
> un-blocking keyframes.js-K.W9's scroll-as-CSS PARSE round-trip in the 0.13.0 cut.**

---

## §Provenance (the audit lanes + the file:line roots this wave consumes)

The wave is divined from four binding inputs; each row cites its document and the load-bearing roots.

- **`EXECUTION-ORCHESTRATION.md §3` (THE GRAMMAR FOLD) — the ratifying authority.** Names VJ.W1 "the
  ONE genuine net-new GRAMMAR … a sibling library wave **N.W11′** … shipping in the same **0.13.0**
  cut" and partitions it from VJ.W2 (which folds INTO N.W11 as a leg, N.W11.D). §2 R2 places it in
  the library track: "W11 is library-only (no demo dep — runs beside everything)." The fold (vs a
  post-N tranche) is the recommended constellation move; the named fallback is a tight post-N
  **Tranche O** (§Hand-off).
- **`GRAMMAR-FOLD.md` PART II (§II.0–§II.9) — the executable-depth spec this wave lifts.** Carries
  the producer signatures (§II.2), the grammar in the easing.ts idiom (§II.3), the born-RED gate
  (§II.4), the kf-K consume edge + acyclic cadence (§II.5), the sibling-wave rationale (§II.6), the
  slot table (§II.7), the post-N fallback (§II.8), the three open questions (§II.9). Every signature
  there cites a value.js `src/` file:line; this doc re-verifies each (§State-verified) and resolves
  the open questions (§Design-decisions).
- **`KF-TO-VALUEJS-GRAMMAR-ASKS.md §1` (keyframes.js, the inbound cross-repo ask) — the consumer's
  precise need.** kf-K dispatched VJ.W1 on 2026-06-15. §1.2 records "none for the parse itself
  (correctness, not perf)" (the MEASURE-FIRST-N/A finding) and "value.js partitions [the trigger
  layer] as a sub-item it may land after the scroll-timeline core" (the §II.3.E partition). §1.3 is
  the reciprocal consume seam (kf's `src/animation/scroll.ts` + `proof:scroll-roundtrip` (b)).
- **The value.js ground-truth source lanes (the idiom this wave rides + the registry it extends):**
  - `parsing/easing.ts:1-132` — the parser-combinator idiom (`any`/`all`/`.sepBy`/`.wrap`/`.trim`/
    `.opt`/`.map`), `linearFunction` (`:60-62`), `stepPosition` (`:94-101`, the longest-first `any`
    dispatch), the division-of-labour charter (`:6-15`).
  - `parsing/utils.ts` — `istring` (`:5`), `identifier` (`:37`), `number` (`:43`), `integer` (`:41`),
    `none` (`:39`), `succeed`/`fail` (`:46-57`), the `ParseDiagnostic`/`OnParseError` sink (`:65-80`,
    N.W7), `tryParse` (`:123`).
  - `parsing/extract.ts` — `CSSAnimationOptions` (`:16`), `applyLonghand` (`:108`, the longhand
    dispatch that STOPS at the static animation properties), `extractAnimationOptions` (`:189`, the
    cascade-merge the aggregate extractor mirrors).
  - `parsing/animation-shorthand.ts` — `reverseAnimationShorthand` (`:262`, the inverse-serializer
    twin the round-trip law mirrors), `splitTopLevelCommas` (`:210`, the `#`-list splitter to reuse),
    `parseSingleAnimation` (`:113`, the token-walk shape), `isAnimationName` (`:94`/`:177`, the
    final-fall-through idiom).
  - `units/constants.ts` — `STYLE_NAMES` already lists the scroll-timeline property NAMES
    (`animationRange` `:185`, `animationRangeEnd` `:186`, `animationRangeStart` `:187`,
    `animationTimeline` `:188`; `scrollTimeline*` `:552-554`; `timelineScope` `:608`; `viewTimeline*`
    `:628-631`) — value.js KNOWS these are CSS properties; the typed VALUE grammar over them is the gap.
  - `src/index.ts` — the export surface: `:158` `mixColorsN`, `:238` `parseLinearStops`/`parseSteps`,
    `:271` `CSSAnimationOptions` (all verified `:State-verified`).

---

## §State-verified (the capability-ABSENCE proven TODAY by command + output)

Every claim re-verified against the working tree on **2026-06-15** at version **`0.12.0`**.

**The grammar symbols are ABSENT (the born-RED probe — the capability does not exist):**

```sh
$ node -e "console.log(require('./package.json').version)"
0.12.0
$ grep -rscE "CSSTimelineOptions|parseAnimationTimeline|serializeAnimationTimeline|rangePhase" src/
# → 0 across every file   (total matches in src/: 0; total in dist/: 0)
```

`parseAnimationTimeline`, `serializeAnimationTimeline`, the `CSSTimelineOptions` type, and the
`rangePhase` concept resolve NOWHERE in 0.12.0's `src/` OR `dist/`. The wave's `test/scroll-timeline.test.ts`
reds on the undefined import TODAY and greens on ship. This is the born-RED in the capability-absent
sense (the frontier/library posture per the prompt).

**The property NAMES are PRESENT (so the ask is the VALUE grammar, not name registration):**

```sh
$ grep -nE "animationTimeline|animationRange|scrollTimeline|timelineScope|viewTimeline" src/units/constants.ts
185:    "animationRange",     186:    "animationRangeEnd",    187:    "animationRangeStart",
188:    "animationTimeline",  552:    "scrollTimeline",       553:    "scrollTimelineAxis",
554:    "scrollTimelineName", 608:    "timelineScope",        628:    "viewTimeline",
629:    "viewTimelineAxis",   630:    "viewTimelineInset",    631:    "viewTimelineName",
```

**The 2026 trigger layer is absent even from the name registry (so §II.3.E is forward-looking):**

```sh
$ grep -nE "animationTrigger|timelineTrigger" src/units/constants.ts
# → 0 (animation-trigger / timeline-trigger, Chrome 145, not in STYLE_NAMES)
```

**The extractor STOPS at the static animation properties (the precise gap in `applyLonghand`):**
`parsing/extract.ts:108` `applyLonghand` dispatches `animation` / `-name` / `-duration` / `-delay` /
`-iteration-count` / `-direction` / `-fill-mode` / `-timing-function` / `-composition` and stops —
it does NOT parse `animation-timeline`'s `scroll()`/`view()`, `animation-range`'s
`<timeline-range-name> <length-percentage>` pairs, or `timeline-scope`, and carries NO inverse
serializer for any of them.

**The idiom + the export sites this wave rides are all present at the cited lines (verified):**

```sh
$ grep -nE "parseLinearStops|linearFunction|\.sepBy|\.wrap" src/parsing/easing.ts
57:    .sepBy(comma, 1)          60:const linearFunction: Parser<LinearStop[]> = utils
62:    .next(linearStopList.trim(whitespace).wrap(lparen, rparen));   78:export function parseLinearStops(...)
$ grep -nE "istring|identifier|tryParse|OnParseError" src/parsing/utils.ts
5: istring   37: identifier   80: OnParseError   123: tryParse
$ grep -nE "reverseAnimationShorthand|splitTopLevelCommas|isAnimationName" src/parsing/animation-shorthand.ts
94: isAnimationName   210: splitTopLevelCommas   262: reverseAnimationShorthand
$ grep -nE "mixColorsN|parseLinearStops|CSSAnimationOptions" src/index.ts
158:export { mixColorsN } ...   238:export { parseLinearStops, parseSteps } ...   271:export type { CSSAnimationOptions } ...
```

**The parse-that combinator surface (the `||` open-question evidence):**

```sh
$ node -e "const p=require('@mkbabb/parse-that'); console.log(Object.keys(p))"
# → exports: whitespace, Parser, all, any, regex, string   (NO native permutation combinator)
```

There is no built-in order-free `||` combinator; §Design-decisions resolves it.

**The two N.W10 born-RED roots this wave's substrate depends on (PROVEN on the LIVE BUILT demo today):**

- **The unlayered-glass-ui-CSS cascade kill (N.W10.D — U11's true root).** The demo imports glass-ui
  styles UNLAYERED at `demo/@/styles/style.css:52-53` (`@import "@mkbabb/glass-ui/styles";` +
  `…/styles.css` — no `layer(glass-ui)` wrap). The shipped artifact proves the kill:
  ```sh
  $ CSS=dist/gh-pages/assets/index-OigTVKLL.css
  $ grep -c "\.hidden{display:none}" $CSS                 # → 2
  $ python3 …classify-by-@layer-enclosure…                # → layered .hidden: 1   unlayered .hidden: 1
  ```
  Two `.hidden{display:none}` rules ship: one INSIDE `@layer utilities` (the demo's responsive
  Tailwind), one UNLAYERED (glass-ui's flat `dist/styles/components.css`). Per CSS Cascade Level 5,
  an UNLAYERED declaration beats EVERY layered one regardless of specificity — so glass-ui's flat
  `.hidden` / `.flex` / `.block` defeat the demo's layered `lg:*` reveal, the responsive `lg:block`
  is dead, and **the desktop dual-pane never renders.** This is born-RED on the live built demo at
  0.12.0; N.W10.D is the gate-opener that fixes it (the demo-side `layer(glass-ui)` one-liner + the
  filed glass-ui producer ask) BEFORE the design waves' in-viewport gates can be honest.
- **The save-data-loss P0 (N.W10.C — D7 §3.4).** `demo/@/composables/palette/usePaletteActions.ts:59-63`,
  `onCurrentPaletteSaved`, does `await ensureUser()` (line 60) BEFORE `deps.createPalette(...)` (line
  61). When the backend is down `ensureUser()` rejects, the `await` throws, and `createPalette` NEVER
  executes — the user's local save is silently destroyed (no local-first persistence). The degraded
  backend is the live default: `demo/@/lib/palette/api/client.ts:28-29` hard-points
  `BASE_URL = import.meta.env.VITE_API_URL ?? "https://api.color.babb.dev"`, so an offline/CORS-blocked
  build hits the throw path. Born-RED at 0.12.0; N.W10.C fixes it (createPalette unconditional,
  ensureUser deferred to publish). These two roots are the substrate N.W11′ rides beside in R2 — the
  reason N.W10 LEADS (`EXECUTION-ORCHESTRATION.md §1`); N.W11′ itself touches neither (it is
  `parsing/`-only).

---

## §Goal

Ship the typed `CSSTimelineOptions` scroll-grammar — the parser (CSS → typed), the inverse serializer
(typed → CSS), and the aggregate stylesheet extractor — as a value.js-internal `parsing/` module, in
the `parsing/easing.ts` combinator idiom, holding the division-of-labour law (parse VERBATIM; resolve
NOTHING). Publish it in the 0.13.0 cut so keyframes.js-K.W9's scroll-as-CSS round-trip
(`proof:scroll-roundtrip` clause **b**) lights one beat behind — value.js and keyframes advancing
together in the same beat, exactly as they did at 0.12.0.

---

## §Scope (the lanes, each at the gestalt seam)

A NEW `src/parsing/scroll-timeline.ts` re-exported via `src/index.ts`; a NEW `test/scroll-timeline.test.ts`.
The lanes are the four MDN sub-grammars + the type surface + the aggregate + the inverse, file-disjoint
from N.W11's `units/color/` color work and from the demo entirely.

| Lane | Work | Anchors (the idiom mirrored) |
|---|---|---|
| **A — the type surface** | Declare `CSSTimelineOptions` + its member value types (`AnimationTimelineValue`, `AnimationRangeValue`, `ViewInset`, `RangePhase`, `RangeBoundary`, `TimelineScopeValue`, `ScrollerKeyword`, `TimelineAxis`) — the MIRROR of `CSSAnimationOptions`. Each field carries the parsed VALUE of one property; absent fields mean the declaration did not appear. Sub-tokens (`scroller`/`axis`/`inset`/`offset`) are `undefined` when omitted — NOT defaulted (the §Design-decisions division-of-labour law). | `parsing/extract.ts:16` (`CSSAnimationOptions` shape) |
| **B — `animation-timeline` parse** | `parseAnimationTimeline(input, onParseError?)`: `auto` / `none` / `<dashed-ident>` (named ref, fall-through LAST) / `scroll([<axis> \|\| <scroller>])` / `view([<axis> \|\| <inset>])`. Keyword sets via `istring`; the named-ref fall-through via the `isAnimationName` idiom. The `<axis> \|\| <scroller>` order-free pair is the ONE net-new combinator (§Design-decisions D1). | `parsing/easing.ts:60-62` (`linearFunction`), `parsing/utils.ts:5,37`, `animation-shorthand.ts:94,177` |
| **C — `animation-range` parse** | `parseAnimationRange(input, onParseError?)` (the 2-endpoint shorthand) + `parseAnimationRangeBoundary(input)` (one endpoint). `normal` \| `<length-percentage>` \| `<timeline-range-name> <length-percentage>?`. The `<range-name> <lp>?` pair is structurally the `<linear-stop>` shape; the 2-endpoint split walks tokens the way `parseSingleAnimation` does. `<length-percentage>` emitted VERBATIM as a string. | `parsing/easing.ts:36-53` (`<linear-stop>`), `animation-shorthand.ts:113` |
| **D — `timeline-scope` parse** | `parseTimelineScope(input)`: `none` \| `all` \| `<dashed-ident>#` — a `.sepBy(comma, 1)` of dashed-idents with `none`/`all` as `any` alternatives ahead of the list (the `<linear-stop-list>` idiom). | `parsing/easing.ts:56-58` (`linearStopList`) |
| **E — the inverse serializer** | `serializeAnimationTimeline` / `serializeAnimationRange` / `serializeTimelineScope` (typed → CSS) + the aggregate `serializeTimelineOptions(opts)` → `{ "animation-timeline"?, "animation-range"?, "timeline-scope"?, "animation-trigger"? }`. NO default padding — reproduce only present sub-tokens (the `reverseAnimationShorthand` idiom). The round-trip law is the gate core (§Hard gate). | `animation-shorthand.ts:262` (`reverseAnimationShorthand`) |
| **F — the aggregate extractor** | `extractTimelineOptions(s: Stylesheet): CSSTimelineOptions` — walk a parsed stylesheet, merge every recognised scroll-grammar longhand into one `CSSTimelineOptions` in CSS cascade order (the `extractAnimationOptions` two-tier shape). Reuses `splitTopLevelCommas` for the property-level `#`-lists (§Design-decisions D2). | `parsing/extract.ts:189` (`extractAnimationOptions`), `animation-shorthand.ts:210` (`splitTopLevelCommas`) |
| **G — the public surface** | Re-export the parsers + serializers + `extractTimelineOptions` + the public types from `src/index.ts`, beside `:238` (`parseLinearStops`/`parseSteps`) and `:271` (`CSSAnimationOptions`). | `src/index.ts:238,271` |

The `animation-trigger` / `timeline-trigger` layer (§II.3.E grammar below) is partitioned as a
forward-looking SUB-ITEM, NOT in the core lanes (§Hand-off).

**The grammar (the four MDN sub-grammars, in the easing.ts idiom — verbatim for the implementer):**

```
# Lane B — animation-timeline
<single-animation-timeline> = auto | none | <dashed-ident>
                            | scroll([<axis> || <scroller>]) | view([<axis> || <inset>])
<axis>     = block | inline | x | y
<scroller> = root | nearest | self

# Lane C — animation-range / -start / -end
<animation-range>           = <animation-range-start> <animation-range-end>?
<animation-range-start/end> = normal | <length-percentage> | <timeline-range-name> <length-percentage>?
<timeline-range-name>       = cover | contain | entry | exit | entry-crossing | exit-crossing

# Lane D — timeline-scope
<timeline-scope> = none | all | <dashed-ident>#

# §II.3.E (forward-looking SUB-ITEM, NOT core) — animation-trigger
<single-animation-trigger>      = <single-animation-trigger-type> || [<timeline> [<animation-range>]?]
<single-animation-trigger-type> = once | repeat | alternate | state
```

**The producer signatures value.js ships (the type surface + the entries):**

```ts
// src/parsing/scroll-timeline.ts
export type ScrollerKeyword = "nearest" | "root" | "self";
export type TimelineAxis = "block" | "inline" | "x" | "y";
export type AnimationTimelineValue =
    | { kind: "auto" } | { kind: "none" }
    | { kind: "name"; name: string }                          // a <dashed-ident> named-tl ref
    | { kind: "scroll"; scroller?: ScrollerKeyword; axis?: TimelineAxis }
    | { kind: "view"; axis?: TimelineAxis; inset?: ViewInset };
export type ViewInset = { start: string; end?: string };      // 0/1/2 <length-percentage>|auto, as-written
export type RangePhase =
    | "normal" | "cover" | "contain" | "entry" | "exit" | "entry-crossing" | "exit-crossing";
export type RangeBoundary = { phase?: RangePhase; offset?: string }; // offset omitted ⇒ driver fills
export type AnimationRangeValue = { start: RangeBoundary; end?: RangeBoundary };
export type TimelineScopeValue =
    | { kind: "none" } | { kind: "all" } | { kind: "names"; names: string[] };
export interface CSSTimelineOptions {           // the mirror of CSSAnimationOptions (extract.ts:16)
    timeline?: AnimationTimelineValue;
    range?: AnimationRangeValue;
    timelineScope?: TimelineScopeValue;
    trigger?: AnimationTriggerValue;            // §II.3.E forward-looking sub-item
}

// parse: CSS → typed
export function parseAnimationTimeline(input: string, onParseError?: OnParseError): AnimationTimelineValue;
export function parseAnimationRange(input: string, onParseError?: OnParseError): AnimationRangeValue;
export function parseAnimationRangeBoundary(input: string): RangeBoundary;
export function parseTimelineScope(input: string): TimelineScopeValue;
export function extractTimelineOptions(s: Stylesheet): CSSTimelineOptions;   // mirror of extractAnimationOptions

// inverse: typed → CSS
export function serializeAnimationTimeline(v: AnimationTimelineValue): string;
export function serializeAnimationRange(v: AnimationRangeValue): string;
export function serializeTimelineScope(v: TimelineScopeValue): string;
export function serializeTimelineOptions(opts: CSSTimelineOptions): {
    "animation-timeline"?: string; "animation-range"?: string;
    "timeline-scope"?: string; "animation-trigger"?: string;
};
```

---

## §Hard gate (FALSIFIABLE · born-RED-witnessable on a named defect tree TODAY · P6 posture per clause)

The wave closes against `test/scroll-timeline.test.ts` (NEW) + the absence-probe inversion + the
export surface + the publish. Every clause is born-RED in the capability-absent sense — it reds on
the undefined import at 0.12.0 (§State-verified) and greens on ship; the named defect tree is the
grep-ZERO probe re-verified 2026-06-15.

1. **Absence-probe inversion (the born-RED witness).** `grep -rscE "CSSTimelineOptions|parseAnimationTimeline|serializeAnimationTimeline" src/` returns ZERO TODAY (proven, §State-verified); after the wave it returns nonzero AND the new module resolves. *(P6: the probe is the falsifiable born-RED — if it is nonzero today the wave's premise is void.)*
2. **Parse correctness (Lane B).** `parseAnimationTimeline("scroll(root block)")` → `{kind:"scroll", scroller:"root", axis:"block"}`; `view(inline auto)` → the view value; `--my-tl` → `{kind:"name", name:"--my-tl"}`; `auto`/`none` → their kinds; the order-free `scroll(block root)` ≡ `scroll(root block)`. *(Reds: undefined import today.)*
3. **Range correctness (Lane C).** `parseAnimationRange("entry 0% cover 40%")` → start `{phase:"entry", offset:"0%"}`, end `{phase:"cover", offset:"40%"}`; a bare `"50%"` → `{offset:"50%"}`; `"normal"` → the no-phase boundary; each of the 6 `<timeline-range-name>` keywords parses. *(Reds today.)*
4. **Scope correctness (Lane D).** `parseTimelineScope("--a, --b")` → `{kind:"names", names:["--a","--b"]}`; `none`/`all` → their kinds. *(Reds today.)*
5. **Inverse round-trip (the kf-mirror gate — the gate CORE, Lane E).** For a corpus of valid declarations, `serializeAnimationTimeline(parseAnimationTimeline(s))` is canonical-form-equal to `s` (whitespace-normalized, default-omitted), exactly as `reverseAnimationShorthand` (`animation-shorthand.ts:262`) round-trips `parseAnimationShorthand`. This is the EXACT clause kf-K.W9 `proof:scroll-roundtrip` (b) reciprocates. *(Reds today.)*
6. **Aggregate extract (Lane F).** `extractTimelineOptions(parseStylesheet(css))` merges the scroll-grammar longhands across a rule in cascade order (the `extractAnimationOptions` idiom). *(Reds today.)*
7. **Totality / fail-loud (the N.W7 diagnostics contract).** A malformed `scroll(` emits a `ParseDiagnostic` to the supplied `onParseError` sink AND throws (`tryParse`, `utils.ts:123`). *(Reds today.)*
8. **Export surface (Lane G).** `parseAnimationTimeline` / `parseAnimationRange` / `parseAnimationRangeBoundary` / `parseTimelineScope` + `serializeAnimationTimeline` / `serializeAnimationRange` / `serializeTimelineScope` + `extractTimelineOptions` + the public types are re-exported from `src/index.ts`. *(P6: a build/grep artifact, not a narrative claim.)*
9. **The cut + the notify.** The **0.13.0 cut published** (jointly with N.W11 + N.W11.D); **kf-K notified at the cut** — K.W9's `proof:scroll-roundtrip` (b) consume edge lights on the publish. *(P6: the published-consume edge is the cross-repo artifact, not "API exists.")*

**The headline gate (one line):** the six §State-verified test clauses green + the absence-probe
inverts + the round-trip law holds on the corpus + the public surface exports + **0.13.0 published &
kf notified** → kf-K.W9's `proof:scroll-roundtrip` clause (b) lights one beat behind.

---

## §No-workaround (the named forbidden shortcuts for THIS wave)

- **NO pre-resolution in the parser.** The parser MUST emit the typed options VERBATIM — the named-tl
  reference as a `<dashed-ident>` string, `auto`/`none` as themselves, the range-phase keyword and the
  `<length-percentage>` offset AS-WRITTEN. It MUST NOT resolve `scroll()` defaults against a live DOM,
  MUST NOT compute the px offset from a scroller, MUST NOT fill a phase's implied `0%`/`100%`. That is
  the kf `ScrollScene` driver's job (TIME, not VALUE; `K/L-SEED.md §7`). Pre-resolving gaps would
  "double the spec semantics across two modules" — the exact anti-pattern `easing.ts:6-15` forbids.
- **NO `file:` link to keyframes.js, NO vendored copy of the consumer.** value.js ships the grammar;
  keyframes.js consumes the PUBLISHED 0.13.0 one tranche behind, born-RED-gated. NEVER a `file:` link
  to kf's WIP tree, never a vendored scroll grammar in either direction (the acyclic-spine invariant,
  `cross-repo-dev-resolution.md`). No back-edge: value.js → kf (grammar); kf → glass-ui (spring).
- **NO new property-name registration as a substitute for the VALUE grammar.** The names are already
  in `STYLE_NAMES` (`constants.ts:185-188,552-554,608,628-631`, verified). The wave does NOT re-list
  names; it adds the typed VALUE parse/serialize over names value.js already knows. (The one exception:
  the `animation-trigger` name is absent and lands WITH the §II.3.E sub-item, not in the core.)
- **NO re-authoring of `splitTopLevelCommas`.** The paren/string-aware top-level comma splitter is
  already written (`animation-shorthand.ts:210`). The wave reuses it (promote-and-share per
  §Design-decisions D2), never a second copy (KISS — `N.md §6`).
- **NO bespoke diagnostics path.** Fail-loud rides the SHIPPED `tryParse` + `OnParseError`/
  `ParseDiagnostic` sink (`utils.ts:80,123`, N.W7). No new error vocabulary, no silent
  `console.warn` + return (the forbidden hard-gate form).
- **NO blocking the core cut on the trigger layer.** The `animation-trigger` sub-item (§II.3.E) is a
  widening on a later patch / the post-N Tranche O; if it slips it does NOT block the 0.13.0
  scroll-timeline core that kf-K.W9 clause (b) gates on (§Hand-off).
- **NO MEASURE-FIRST theatre.** This is a correctness grammar; there is no perf claim to bench. A bench
  here would be unconsumed scaffolding (the substrate-with-consumer edict, inverted). MEASURE-FIRST
  rides N.W11.D (`sampleColorRamp`) — NOT this wave.

---

## §Folds (the rows this wave discharges, each citing its lane + finding-id)

| Fold row | What it discharges | Lane / finding-id |
|---|---|---|
| **F1 — VJ.W1 scroll-timeline grammar SCHEDULED** | The "recorded for the post-N successor" item is folded into N's library track (N.W11′) and shipped in 0.13.0, NOT deferred. | `WAVES-2.md §1` N.W18 row C ("record for the post-N successor: VJ.W1 scroll-timeline grammar"); `WAVES-2.md §3` ("Recorded for the post-N successor: VJ.W1 …"); `EXECUTION-ORCHESTRATION.md §3` (the fold recommendation) |
| **F2 — the `applyLonghand` extractor gap closed** | `extract.ts:108` stops at the static animation properties; the aggregate `extractTimelineOptions` extends the cascade-merge to the scroll-grammar longhands. | `GRAMMAR-FOLD.md §II.0` (the precise gap); `extract.ts:108,189` |
| **F3 — the inverse-serializer family completed** | value.js has `reverseAnimationShorthand` for the static animation shorthand but NO inverse for the scroll grammar; Lane E completes the family and the round-trip law. | `GRAMMAR-FOLD.md §II.2.3`; `animation-shorthand.ts:262` |
| **F4 — kf-K.W9 clause (b) un-blocked** | The keyframes.js scroll-as-CSS PARSE round-trip (`proof:scroll-roundtrip` b) is born-RED against the recorded VJ.W1 absence; the 0.13.0 publish lights it. | `KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.3`; `GRAMMAR-FOLD.md §II.5` |
| **F5 — the MEASURE-FIRST-N/A finding recorded** | The inbound ask records "none for the parse itself (correctness, not perf)"; this wave honors it (no bench, §No-workaround). | `KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2`; `GRAMMAR-FOLD.md §II.0` |
| **F6 — the trigger-layer partition recorded** | `animation-trigger`/`timeline-trigger` (absent from `STYLE_NAMES`, §State-verified) is partitioned as a forward-looking sub-item / Tranche-O candidate, NOT a core blocker. | `KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2` item 4; `GRAMMAR-FOLD.md §II.3.E` |

This wave does NOT discharge any U-row from the user audit (U1–U33) — those are demo/glass-ui/color
findings owned by N.W10–N.W17. N.W11′ is the library/parsing frontier, disjoint from the U-axis; its
only audit-derived obligation is the cross-repo grammar ask (`WAVES-2.md §1` N.W18 row C → folded
here per `EXECUTION-ORCHESTRATION.md §3`).

---

## §Hand-off (the BINDING cross-wave + cross-repo boundaries)

**Cross-wave (within value.js N):**

- **N.W11 (color-SOTA) — the cut partner, file-disjoint.** N.W11′ ships in the SAME 0.13.0 cut as
  N.W11 + its lane N.W11.D (`sampleColorRamp`). They touch DISJOINT substrates (N.W11 → `units/color/`;
  N.W11′ → `parsing/`), so they parallelize cleanly in R2. The version-cut ceremony ("version cut
  published; kf notified at the cut") is SHARED — N.W11′ adds the scroll-grammar test suite + the
  scroll-grammar export surface, no new release ceremony.
- **N.W18 (BA-cut consume) — record-only, no edge.** N.W18 row C originally "recorded VJ.W1 for the
  post-N successor"; this wave consumes that record by SCHEDULING it. N.W18 owes N.W11′ nothing once
  the fold is ratified (it is library-only, no BA gate).
- **N.W9′ (v1.0.0 close) — the grammar rides into 1.0.** The scroll grammar shipped at 0.13.0 is part
  of the value.js surface that closes at v1.0.0; no further N.W11′ work is owed at close.

**Cross-repo (the acyclic constellation spine):**

- **keyframes.js K.W9 — the binding consume edge.** kf's NEW `src/animation/scroll.ts` (HEAVY —
  reached via `loadAnimationEngine()`, the static/dynamic boundary HOLDS), `createScrollScene(spec|css)`,
  CALLS `parseAnimationTimeline` / `extractTimelineOptions` on its parse leg, and threads
  `serializeAnimationTimeline` through kf's `format.ts` serialize-from-template authority. The gate it
  lights is `proof:scroll-roundtrip` clause **(b)** — the PARSE round-trip. **The cadence (one beat
  behind):** value.js N.W11′ lands the parser/serializer born-RED (its own test reds: symbol absent at
  0.12.0) → value.js publishes 0.13.0 → kf K.W9 re-pins one tranche behind; clause (b) GREENS. kf's
  impl never blocks: its source half (`scroll.ts`) lands NOW against the recorded VJ.W1 absence; clauses
  (a)/(c)/(d) (the `ScrollScene` driver, the native-`ScrollTimeline` dispatch, the `position:sticky` pin)
  are value.js-INDEPENDENT and green on K.W7's substrate WITHOUT VJ.W1. **NEVER a `file:` link, NEVER a
  vendored grammar.** No cycle: value.js → kf (grammar); kf → glass-ui (spring); no back-edge.
- **keyframes.js K.W10 — adjacent but NOT this wave's edge.** K.W10's CC-2 oklab densify consumes
  N.W11.D (`sampleColorRamp`), NOT N.W11′. Both light on the same 0.13.0 publish, but the scroll
  grammar is K.W9's; the ramp is K.W10's. (Recorded so the implementer does not conflate the two
  consume edges that share the cut.)
- **The post-N Tranche O fallback.** If N is judged too large to absorb N.W11′, the named fallback is a
  tight library-only **post-N Tranche O** (VJ.W1 + VJ.W2 + any VJ-ledger residue), dispatched the
  moment N's library track is free (`EXECUTION-ORCHESTRATION.md §3` final ¶). The kf consume edge is
  IDENTICAL either way — clause (b) lights on whichever cut publishes the `CSSTimelineOptions` extractor.
  The fold is the better constellation move (value.js + keyframes advance together); the tranche is the
  heavier path. The `animation-trigger` sub-item (§II.3.E) is the natural Tranche-O candidate EVEN under
  the fold if the scroll-timeline core cut is time-boxed to 0.13.0.

---

## §Design-decisions (the trade-offs RESOLVED — the three carried open questions, closed)

- **D1 — the `||` order-free combinator (resolved: a small local `permutationOpt` helper, tried-both-orders
  `any`).** `easing.ts` has no `||` precedent (its grammars are all ordered `any` longest-first +
  sequential `all`), and the parse-that surface ships no native permutation combinator (verified:
  `Object.keys` → `whitespace, Parser, all, any, regex, string` only). The CSS `<axis> || <scroller>`
  (and `<axis> || <inset>`) is order-free, each-optional. **Resolution:** mint a small
  `permutationOpt(a, b)` helper that is `any(all(a.opt(), ws.next(b).opt()), all(b.opt(), ws.next(a).opt()))`
  — tried-both-orders. Keep it LOCAL to `scroll-timeline.ts` first (it is the only consumer); promote
  to `parsing/utils.ts` ONLY if a second consumer appears (substrate-with-consumer — do not pre-generalize).
  This is the one net-new combinator pattern; everything else reuses the easing.ts vocabulary verbatim.
- **D2 — `splitTopLevelCommas` reuse (resolved: promote-and-share to `parsing/utils.ts`).**
  `animation-timeline`/`-range`/`timeline-scope` are all `#`-lists at the property level; the
  paren/string-aware splitter already exists at `animation-shorthand.ts:210`. KISS argues
  promote-and-share over a second copy. **Resolution:** promote the local to an exported
  `parsing/utils.ts` helper so both `animation-shorthand.ts` and `scroll-timeline.ts` consume the one
  splitter; the promotion is a pure move (no behavior change), gated by the existing
  `animation-shorthand` tests staying green plus the new scroll-timeline list tests.
- **D3 — aggregate vs per-property entries (resolved: SHIP BOTH, the two-tier shape).** `K.W9.md §S1`
  names both `parseAnimationTimeline` (per-property) and the `CSSTimelineOptions` aggregate. The
  `extract.ts` precedent is two-tier (the per-longhand `applyLonghand` primitives + the `extractAnimationOptions`
  composer). **Resolution:** the per-property parsers are the primitives; `extractTimelineOptions`
  composes them over a `Stylesheet`. kf-K.W9 may consume either — the primitive when it has a single
  declaration string, the aggregate when it has a stylesheet. Shipping both is the idiomatic mirror, not
  surface bloat.
- **D4 — sibling wave N.W11′ vs a leg of N.W11 vs a post-N tranche (resolved: SIBLING wave).** VJ.W2
  (`sampleColorRamp`) folds INTO N.W11 as lane D because it REUSES the color kernels (same `units/color/`
  substrate, ~S-effort). VJ.W1 touches ZERO color code — it is a `parsing/`-path parser + inverse
  serializer. Bolting it onto a color wave would violate the file-disjoint-lane discipline the rounds
  depend on. But it is pure library/parsing work (no demo dep, no BA gate), so it does NOT warrant its
  own tranche either. **Resolution:** a SIBLING library wave beside N.W11 in R2 — too big to be a leg
  of a color wave, too purely-library to need a tranche. (`EXECUTION-ORCHESTRATION.md §3`; `GRAMMAR-FOLD.md §II.6`.)
- **D5 — the division-of-labour boundary (resolved: VERBATIM parse, driver resolves).** The parser holds
  `easing.ts:6-15`'s law exactly: emit the typed options as-written; resolve nothing. The named-tl ref is
  a string, the offset is a string, the phase is a keyword. The kf `ScrollScene` driver (TIME) resolves
  `scroll()` defaults against the DOM and computes px offsets. This is the §No-workaround keystone and the
  reason the round-trip law (gate clause 5) is clean (serialize re-emits exactly what parse captured).
