# N — GRAMMAR-FOLD: the two kf-dispatched grammar wave specs, developed to executable depth

**Provenance:** the kf-K frontier fold dispatched two net-new value.js grammars on **2026-06-15**
(the mirror of `../keyframes.js/docs/tranches/K/KF-TO-VALUEJS-GRAMMAR-ASKS.md` + `K/L-SEED.md §7`).
This document develops `EXECUTION-ORCHESTRATION.md §3` (THE GRAMMAR FOLD — the recommendation to fold
VJ.W1/VJ.W2 into N's library track rather than defer them to a post-N successor) **to executable
depth**: the producer signatures value.js ships, the born-RED gates (value.js-side — RED because the
symbol is ABSENT at 0.12.0, GREEN on ship), the kf-K K.W9/K.W10 consume edges + the acyclic cadence,
the MEASURE-FIRST note where perf is claimed, and the slot into N (N.W11.D / N.W11′, the 0.13.0 cut).

**This is a PROPOSAL awaiting the user's ratification.** It does NOT re-author the canonical board
(`N.md` the charter, `WAVES-2.md` the second block, `PROGRESS.md`). It develops §3 to the depth a
wave-section author can lift verbatim. The dispatch gate (§3 below) ratifies the fold OR elects the
named fallback — a tight library-only **post-N Tranche O** (VJ.W1 + VJ.W2 + any VJ-ledger residue).
DOCS ONLY — nothing implemented; this is tranche development, not implementation.

**Spec idiom:** matches `N.md §4` (§-structured, hard-gate-per-wave, file:line-grounded) and
`WAVES-2.md` (the per-lane table + the hard gate). Every claim cites a value.js `src/` file:line, the
`EXECUTION-ORCHESTRATION` §, or the kf-K consume seam.

**The two grammars, at a glance:**

| | VJ.W2 → **N.W11.D** | VJ.W1 → **N.W11′** |
|---|---|---|
| **Producer** | `sampleColorRamp(from,to,n,{space,hueMethod})` | the `CSSTimelineOptions` scroll-grammar extractor + inverse serializer |
| **Nature** | a COMPOSITION over shipped color kernels (~S-effort, ~40 LoC, zero new color science) | the ONE genuine net-new GRAMMAR (a parser + inverse serializer; net-new VALUE parse) |
| **Substrate** | `units/color/` — `mix.ts`, `dispatch.ts`, `gamut.ts` | `parsing/` — a NEW `scroll-timeline.ts` beside `extract.ts`/`animation-shorthand.ts` |
| **Slot** | a 4th LANE of the color-SOTA wave N.W11 | a SIBLING library wave beside N.W11 |
| **MEASURE-FIRST** | YES (reuses kernels — bench vs `n` independent `mixColors` calls) | N/A (correctness grammar, not a perf claim) |
| **Cut** | 0.13.0 | 0.13.0 |
| **kf-K consume** | K.W10 `compile.ts` color leg — CC-2 oklab densify | K.W9 `scroll.ts` — scroll-as-CSS parse round-trip |
| **Born-RED probe** | `grep -rc sampleColorRamp src/ dist/` → ZERO @0.12.0 ✓ | `grep -rscE "CSSTimelineOptions\|parseAnimationTimeline" src/` → ZERO @0.12.0 ✓ |

Both born-RED probes were RE-VERIFIED against the working tree 2026-06-15 (version `0.12.0`): both
return zero across every `src/` and `dist/` file. The symbols are absent today; the tests red on
the undefined import and green on ship.

---

# PART I — VJ.W2 / N.W11.D — `sampleColorRamp` (the perceptual color-ramp sampler)

**One sentence:** `sampleColorRamp(from, to, n, {space, hueMethod})` is an N-stop perceptual ramp
sampler that COMPOSES value.js's already-shipped color kernels — `mixColors` (the per-step perceptual
lerp, `dispatch.ts:391`), `gamutMapOKLab` (the per-stop egress, `gamut.ts:247`), `deltaEOK` (the
spacing oracle, `gamut.ts:53`) — beside `mixColorsN` (`mix.ts:28`); it is ~S-effort net-new code (a
composition, not new color science) and slots cleanly as **lane D of N.W11**, the color-SOTA wave
already touching that exact substrate.

## §I.0 — The producer signature value.js ships

```ts
// src/units/color/mix.ts — beside mixColorsN (mix.ts:28)
export interface SampleRampOptions {
    space?: ColorSpace;                  // interpolation space; default "oklab"
    hueMethod?: HueInterpolationMethod;  // cylindrical hue path; default "shorter"
    endpoints?: "inclusive" | "exclusive"; // default "inclusive" — n stops INCLUDING from & to
    gamutMap?: boolean;                  // default true — each emitted stop mapped in-gamut
}

export function sampleColorRamp(
    from: Color,
    to: Color,
    n: number,
    opts?: SampleRampOptions,
): Color[];
```

- **`from`, `to`**: `Color` instances (the same shape `mixColorsN`/`mixColors` already accept —
  `mix.ts:28`, `dispatch.ts:391`). All CSS-Color-4 normalization (premultiplied alpha, NaN
  propagation, hue handling) is inherited from `mixColors` — NOT re-implemented.
- **`n`**: stop count, `n ≥ 2` (n=2 returns `[from', to']` — the gamut-mapped endpoints; the
  identity case for kf's two-stop `@keyframes` baseline). `n < 2` throws (mirrors `mixColorsN`'s
  empty-input throw, `mix.ts`).
- **`opts.space`**: `ColorSpace = "oklab"` (the default `mixColors`/`mixColorsN` already carry);
  `"oklch"` for the cylindrical hue-path ramps kf's CC-2 wants.
- **`opts.hueMethod`**: `HueInterpolationMethod = "shorter"`. This is the parameter bare two-stop
  `@keyframes` CANNOT encode — the thing the ramp EXISTS to bake
  (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.2`, "the hue path … the thing bare two-stop `@keyframes` cannot
  encode").
- **Returns**: `Color[]` of length `n`, each stop in the interpolation `space`, each in-gamut when
  `gamutMap` (default true); `stop[0] = from`, `stop[n-1] = to` (inclusive endpoints).

**Export site:** `src/index.ts:158` already exports `mixColorsN` from `./units/color/mix`
(`export { mixColorsN } from "./units/color/mix";`, verified) — add `sampleColorRamp` to that same
re-export line (the sibling N-color mix already lives there).

## §I.1 — How it reuses the shipped kernels (the S-effort composition — MEASURE-FIRST)

value.js ALREADY ships every kernel the ramp needs. The producer is a COMPOSITION, not net-new color
science (each anchor verified 2026-06-15):

| Kernel | What it gives the ramp | value.js anchor (verified) |
|---|---|---|
| `mixColors(c1, c2, p1, p2, space, hueMethod)` | the per-step perceptual lerp at `t = i/(n-1)`, called `mixColors(from, to, 1-t, t, space, hueMethod)` — premul-alpha, NaN, hue all inherited | `src/units/color/dispatch.ts:391` |
| `color2(color, space)` | lifts `from`/`to` into the interpolation space ONCE before the loop — hoist it so the ramp pays the conversion `2×`, not `2n×` | `src/units/color/dispatch.ts:164` |
| `interpolateHue(h1, h2, t, method)` | the cylindrical short/long/inc/dec hue path for `space="oklch"` (already inside `mixColors`; the ramp gets it FREE) | `src/units/color/dispatch.ts:348` |
| `gamutMapOKLab(L, a, b)` | per-stop egress so no emitted stop silently sRGB-clips — the exact map N.W11.A re-anchors; the ramp consumes whatever cusp/α policy that lane lands | `src/units/color/gamut.ts:247` |
| `deltaEOK(L1,a1,b1, L2,a2,b2)` | the spacing oracle (§I.2 born-RED) AND the kf-side CC-2 ΔE ship-vs-refuse proof — the SAME kernel both sides consume; ships 0.12.0 | `src/units/color/gamut.ts:53` |

**The reference shape (composition over shipped kernels — illustrative, NOT prescriptive):**

```ts
export function sampleColorRamp(from, to, n, opts = {}) {
    const { space = "oklab", hueMethod = "shorter",
            endpoints = "inclusive", gamutMap = true } = opts;
    if (n < 2) throw new Error("sampleColorRamp requires n ≥ 2");

    // Hoist the space conversion OUT of the loop (mixColors pays it per-call;
    // the ramp pays it twice, then lerps n times in-space).
    const a = color2(from, space);   // dispatch.ts:164
    const b = color2(to,   space);

    const out: Color[] = new Array(n);
    for (let i = 0; i < n; i++) {
        const t = endpoints === "inclusive" ? i / (n - 1) : (i + 0.5) / n;
        // mixColors inherits premul-alpha / NaN / hue-method (dispatch.ts:391)
        let stop = mixColors(a, b, 1 - t, t, space, hueMethod);
        if (gamutMap) stop = mapStopInGamut(stop); // gamutMapOKLab:247 on the OKLab tuple
        out[i] = stop;
    }
    return out;
}
```

- **The gamut step**: each stop's OKLab `(L,a,b)` runs `gamutMapOKLab` (`gamut.ts:247`) so the ramp
  inherits N.W11.A's re-anchored cusp/α policy automatically — if N.W11.A tunes the gamut policy or
  moves to a cusp strategy, the ramp's stops improve with zero ramp-side change. (For non-OKLab
  output spaces, route the egress through the space's gamut family.)
- **Why ~S-effort**: ~40 LoC of loop + endpoint/gamut policy. ZERO new color math — every perceptual
  decision (lerp, hue, premul-alpha, gamut) is a call into a kernel N.W11.A/B/C already own and
  touch. It is the literal INVERSE SIBLING of `mixColorsN` (`mix.ts:28`): `mixColorsN` folds N
  colors → 1; `sampleColorRamp` expands 2 colors → N. Same substrate, inverse direction.

**MEASURE-FIRST (the value.js-side discipline — the K-coordination "reusing `lerpColorValue` +
`gamutMapOKLab` (MEASURE-FIRST)" note):** the ramp is `n` `mixColors` calls + `n` gamut maps. Before
shipping, BENCH it against the existing `mix.ts` path (the `mixColorsN` left-fold) to confirm (a) no
per-step `color2` reconversion (the hoist above is the win — naive `mixColors` re-converts both
endpoints every call; the ramp must NOT pay `2n×`), and (b) the per-stop `gamutMapOKLab` is the
dominant cost. No perf CLAIM is made beyond "reuses existing kernels at parity with `n` independent
`mixColors` calls, minus the hoisted conversion" — **the bench is the gate, not a number asserted in
advance.**

## §I.2 — The born-RED gate (value.js-side — REDs because the symbol is ABSENT today)

**Probe (re-verified 2026-06-15):**
```
$ grep -rc "sampleColorRamp" src/ dist/        →  ZERO across every file (born-RED confirmed)
$ node -e "console.log(require('./package.json').version)"  →  0.12.0
```
`sampleColorRamp` does not exist in 0.12.0's source OR dist (cross-checked against the kf-side probe,
`KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.1`).

**The born-RED test (`test/color-ramp.test.ts` — NEW; reds TODAY on the undefined import, greens
when N.W11.D lands):**

1. **Existence / arity** — `import { sampleColorRamp } from "../src/units/color/mix"`; `n=2` returns
   a 2-element `Color[]` equal (within ΔE-OK) to the gamut-mapped `[from, to]`. *(REDS: undefined
   import today.)*
2. **Monotone perceptual spacing (the oracle)** — for a far endpoint pair (e.g. `oklch` red→blue,
   `n=8`), every adjacent `deltaEOK(stop[i], stop[i+1])` is within a tolerance band of the mean step
   ΔE (uniform perceptual spacing — the property a naive sRGB ramp FAILS). Consumes the RIPE
   `deltaEOK` (`gamut.ts:53`). *(REDS today.)*
3. **In-gamut egress** — every emitted stop is in-sRGB-gamut — no silent clip; inherits N.W11.A's
   cusp/α policy. *(REDS today.)*
4. **Hue-method fidelity** — `oklch` red→blue with `hueMethod:"longer"` traverses the long arc
   (passes through green/yellow); `"shorter"` does not — the thing two-stop `@keyframes` cannot
   express; the reason kf needs the producer. *(REDS today.)*
5. **Endpoint identity** — `endpoints:"inclusive"` ⇒ `stop[0] ≈ from`, `stop[n-1] ≈ to` (ΔE-OK below
   the JND tolerance). *(REDS today.)*

**Hard gate (N.W11.D, in the N.W11 wave-section idiom):** the `color-ramp.test.ts` oracle suite green
(the 5 clauses); the MEASURE-FIRST bench shows no regression vs `n` independent `mixColors` calls (the
hoist confirmed); `sampleColorRamp` exported from `src/index.ts:158`; the **0.13.0 cut published**;
**kf notified at the cut** (the K.W10 consume edge, §I.3). This rides N.W11's existing "version cut
published; kf notified at the cut" gate — the ramp adds the oracle suite + the MEASURE-FIRST bench,
no new ceremony.

## §I.3 — The kf-K consume edge (K.W10 · CC-2 oklab densify)

**The reciprocal seam (exact, `K.W10.md §S2` ↔ `KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.3`):** kf's NEW
`src/animation/compile.ts` (HEAVY — the compile module over the `format.ts` lineage) color leg CALLS
`sampleColorRamp(from, to, n, {space, hueMethod})` to bake **N pre-sampled `oklab()` stops** into the
compiled `@keyframes` — the "CC-2 oklab densify." A perceptual color-interpolating animation,
compiled to native CSS, emits N intermediate `oklab()` keyframe stops (the ramp) so the browser's
linear-sRGB tween between keyframes approximates the perceptual path; `n` is chosen so each segment
is sub-JND. The ship-vs-refuse decision is the kf-side **ΔE-ε proof**
(`proof:compile-replay-equal` clause **(d)**) which consumes the RIPE `deltaEOK` (`gamut.ts:53`,
shipped 0.12.0) — densify only if the N-stop ramp's ΔE to the true perceptual path is within ε; else
CC-3 REFUSES honestly.

**The acyclic cadence (value.js publishes; kf consumes ONE beat behind — born-RED-gated kf-side):**

1. **kf's source half lands NOW, born-RED** (against the recorded VJ.W2 absence). K.W10's CC-2
   densify consumer — the `compile.ts` color leg that CALLS `sampleColorRamp` — lands against the
   recorded absence; `proof:compile-replay-equal` clause (d) REDS until value.js publishes.
2. **K.W10 is GREEN via the honest REFUSAL until then** (the critical acyclic nuance for VJ.W2):
   CC-3's perceptual-oklab REFUSAL is the FALLBACK — the animation refuses honestly ("perceptual
   oklab interpolation has no faithful @keyframes equivalent") until the densify producer lands. So
   the densify is a **WIDENING that lights on the publish, NOT a blocker that reds the wave.** CC-1
   core + CC-3 refusals are RIPE and green on K.W7's substrate WITHOUT VJ.W2.
3. **The ΔE proof kernel is RIPE even while the producer is OPEN** — CC-2's ΔE-ε ship-vs-refuse proof
   consumes the already-shipped `deltaEOK` (`gamut.ts:53`, 0.12.0). The moment value.js publishes
   `sampleColorRamp`, kf's densify consumer lights AND its proof is ready.
4. **The consume edge LIGHTS on the publish.** When value.js ships 0.13.0, kf's K.W1-style re-pin
   consumes `sampleColorRamp` one tranche behind; clause (d) greens. **NEVER a `file:` link to
   value.js's WIP tree, NEVER a vendored `sampleColorRamp`** — a PUBLISHED consume across the
   constellation spine (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.3`, the acyclic-spine invariant). No cycle:
   value.js → kf (grammar); kf → glass-ui (spring); no back-edge.

**The ownership boundary held (`K/L-SEED.md §7`):** value.js owns VALUES — the perceptual color
science (lerp, hue path, gamut map, ΔE oracle). kf owns TIME — the compile decision (how many stops,
where in the keyframe timeline, the ship-vs-refuse gate). VJ.W2 is ONLY the `sampleColorRamp`
COMPOSITION over shipped kernels; it is NOT the color-interpolation kernels themselves (shipped
0.12.0; kf consumes them RIPE), and it is NOT the compile driver (that is kf's `compile.ts`).

## §I.4 — Why N.W11.D folds cleanly (vs a post-N tranche)

- **Same substrate, S-effort.** N.W11's lanes A/B/C ALREADY touch `gamut.ts` (the cusp re-anchor),
  the §13.2 deltaE-OK oracle (`gamut.ts:53`), and the egress clamp. The ramp reuses `gamutMapOKLab`
  (`gamut.ts:247`) + `deltaEOK` (`gamut.ts:53`) — the EXACT symbols those lanes re-anchor. Adding the
  ramp is ~40 LoC + one oracle test file beside work already in flight, NOT a new color-science
  investment.
- **Library-only — no demo coupling, no BA gate, no contention.** N.W11 is "IMPL unilateral
  (library) … runs beside everything" (`EXECUTION-ORCHESTRATION.md §2 R2`). The ramp inherits that:
  no demo dependency, no glass-ui BA cut wait, no contention with the design body (W12–W17). It runs
  in R2's library track beside N.W11.A/B/C.
- **The alternative is heavier.** Deferring to a post-N tranche spins up a whole successor tranche
  (open/charter/close ceremony) for ONE ~40-LoC sampler — and it leaves kf-K.W10's CC-2 densify edge
  dark a full tranche longer (green via refusal, but the densify widening unshipped). The fold ships
  value.js and keyframes together in the same beat — exactly as they advanced at 0.12.0.

**The post-N fallback (named):** if N is judged too large to absorb the grammar, the clean fallback
is a tight post-N **Tranche O** (library-only: VJ.W1 + VJ.W2 + any VJ-ledger residue), dispatched the
moment N's library track is free. The kf consume edge is identical either way — born-RED kf-side,
lights on whichever cut publishes (0.13.0/N.W11.D or Tranche-O). The fold is the better constellation
move; the tranche is the fallback.

## §I.5 — The N.W11.D wave-section stub (for the wave-doc author to lift)

```
| Lane | Work | Anchors |
|---|---|---|
| D | sampleColorRamp(from, to, n, {space, hueMethod}) beside mixColorsN — an N-stop perceptual
|   | ramp: n mixColors lerps (color2 hoisted out of the loop) + per-stop gamutMapOKLab egress.
|   | The hueMethod bakes the hue path two-stop @keyframes can't encode. MEASURE-FIRST vs n
|   | independent mixColors calls. Born-RED oracle: monotone deltaEOK spacing + in-gamut + endpoint
|   | identity. Exports from src/index.ts:158. | src/units/color/mix.ts:28 (sibling mixColorsN),
|   | dispatch.ts:164,348,391 (color2/interpolateHue/mixColors), gamut.ts:53,247 (deltaEOK/gamutMapOKLab),
|   | src/index.ts:158 (export), test/color-ramp.test.ts (new) |
```

**Hard gate (added to N.W11's gate):** `color-ramp.test.ts` oracle suite green (spacing + in-gamut +
hue-fidelity + endpoint-identity); MEASURE-FIRST bench shows parity (no per-step `color2`
reconversion); exported; **0.13.0 published; kf notified at the cut** (K.W10's
`proof:compile-replay-equal` (d) lights on the publish).

---

# PART II — VJ.W1 / N.W11′ — the `CSSTimelineOptions` scroll-grammar extractor + inverse serializer

## §II.0 — Thesis + the precise gap

> **N.W11′ ships the typed `CSSTimelineOptions` scroll-VALUE grammar — a net-new parser + inverse
> serializer over the `animation-timeline`/`-range`/`timeline-scope`/`animation-trigger` property
> values, authored in the exact parser-combinator idiom `parsing/easing.ts` already uses, beside the
> `parsing/extract.ts` stylesheet animation extractor — un-blocking kf-K.W9's scroll-as-CSS PARSE
> round-trip in the 0.13.0 cut.**

**The gap is precise (registry-probed + source-probed, re-verified 2026-06-15):**

- **PRESENT — the property NAMES.** `STYLE_NAMES` (`src/units/constants.ts:167`) already lists the
  scroll-timeline property identifiers: `animationRange`, `animationRangeEnd`, `animationRangeStart`,
  `animationTimeline` (`:188`); `scrollTimeline`/`-Axis`/`-Name`; `timelineScope`; `viewTimeline`/
  `-Axis`/`-Inset`/`-Name`. value.js KNOWS these are CSS properties.
- **ABSENT — the typed VALUE grammar.** `grep -rscE "CSSTimelineOptions|parseAnimationTimeline|
  rangePhase|serializeAnimationTimeline" src/` → **ZERO across every file** (re-verified 2026-06-15).
  `parsing/extract.ts` `applyLonghand` (`:108`) parses `animation`/`-name`/`-duration`/`-delay`/
  `-iteration-count`/`-direction`/`-fill-mode`/`-timing-function`/`-composition` and stops there. It
  does NOT parse `animation-timeline`'s `scroll()`/`view()`, `animation-range`'s `<timeline-range-name>
  <length-percentage>` pairs, or `timeline-scope`, and carries NO inverse serializer.
- **ABSENT even from the name registry — the 2026 trigger layer.** `grep -nE "animationTrigger|
  timelineTrigger" src/units/constants.ts` → ZERO (re-verified): `animation-trigger`/`timeline-trigger`
  (Chrome 145, the discrete-trigger layer) are not even in `STYLE_NAMES`. VJ.W1 partitions them as a
  forward-looking SUB-ITEM (§II.3.E).

So the ask is the typed VALUE extractor + inverse serializer over property names value.js mostly
already knows. This is a CORRECTNESS grammar — **MEASURE-FIRST is NOT applicable**
(`KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2`: "none for the parse itself").

## §II.1 — The parser-combinator idiom this rides (the value.js ground truth)

VJ.W1 is authored in the EXACT idiom `parsing/easing.ts` proves for `linear()`/`steps()`:

- `any(...)` ordered alternation, longest-first; `all(...)` sequence; `.sepBy(comma, 1)` comma-list
  (`easing.ts:56-58`, `<linear-stop-list>`); `.wrap(lparen, rparen)` parenthesized body
  (`easing.ts:62`); `.trim(whitespace)` / `whitespace.next(...)` inter-token space; `.opt()`;
  `.map(...)` shape-the-AST (`easing.ts:60-62` `linearFunction`).
- Primitives from `parsing/utils.ts`: `istring(str)` case-insensitive keyword (`:5`), `identifier`
  (`:37`, `/-?[a-zA-Z][a-zA-Z0-9-]*/` — the `<dashed-ident>` shape), `number`, `integer`, `none`,
  `succeed`/`fail`.
- The entry shape: `tryParse(parser, input, onParseError?)` (`utils.ts:123`) fail-loud with the
  structured `ParseDiagnostic`/`OnParseError` sink value.js shipped in N.W7; and the non-throwing
  `parseResult`. VJ.W1's public entries take the optional `onParseError`, matching
  `parseLinearStops`/`parseSteps`.

**The DIVISION-OF-LABOUR law VJ.W1 must hold** (`easing.ts:6-15`, verified verbatim charter: "the
parser emits the raw structured stops/args verbatim from the CSS source, and the evaluator resolves
gaps, defaults, and the step staircase. Keep it that way — a parser that pre-resolves gaps would
double the spec semantics across two modules."). **For VJ.W1: the parser emits the typed options
VERBATIM (the named-timeline reference as a `<dashed-ident>` string, `auto`/`none` as themselves, the
range-phase keyword as-written); it does NOT resolve `scroll()` defaults against a live DOM, does NOT
compute the offset from a scroller — that is the kf-K `ScrollScene` driver's job (TIME, not VALUE).**
The boundary (`K/L-SEED.md §7`): "value.js owns VALUES … keyframes.js owns TIME."

## §II.2 — The producer SIGNATURE value.js ships (the type surface)

A NEW module `src/parsing/scroll-timeline.ts`, beside `parsing/extract.ts`/`animation-shorthand.ts`,
re-exported through `src/index.ts` (beside `:238` `parseLinearStops`/`parseSteps` and `:271`
`CSSAnimationOptions` — both verified).

### §II.2.1 The typed `CSSTimelineOptions` type surface

```ts
// src/parsing/scroll-timeline.ts
export type ScrollerKeyword = "nearest" | "root" | "self";
export type TimelineAxis = "block" | "inline" | "x" | "y";

// animation-timeline value: scroller/axis/inset emitted VERBATIM (omitted = undefined,
// NOT defaulted — the §II.1 division-of-labour law; the consumer/driver applies CSS defaults).
export type AnimationTimelineValue =
    | { kind: "auto" }
    | { kind: "none" }
    | { kind: "name"; name: string }                          // a <dashed-ident> named-tl ref
    | { kind: "scroll"; scroller?: ScrollerKeyword; axis?: TimelineAxis }
    | { kind: "view"; axis?: TimelineAxis; inset?: ViewInset };

export type ViewInset = { start: string; end?: string };      // 0/1/2 <length-percentage>|auto, as-written
export type RangePhase =
    | "normal" | "cover" | "contain"
    | "entry" | "exit" | "entry-crossing" | "exit-crossing";
export type RangeBoundary = { phase?: RangePhase; offset?: string }; // offset omitted ⇒ driver fills
export type AnimationRangeValue = { start: RangeBoundary; end?: RangeBoundary };
export type TimelineScopeValue =
    | { kind: "none" } | { kind: "all" } | { kind: "names"; names: string[] };

// The aggregate — mirror of CSSAnimationOptions (extract.ts:16-25). Renderer/driver
// concerns (which DOM scroller, the resolved px offset) are NOT here — kf owns TIME.
export interface CSSTimelineOptions {
    timeline?: AnimationTimelineValue;     // animation-timeline
    range?: AnimationRangeValue;           // animation-range (+ -start/-end longhands)
    timelineScope?: TimelineScopeValue;    // timeline-scope
    trigger?: AnimationTriggerValue;       // animation-trigger (§II.3.E — forward-looking sub-item)
}
```

### §II.2.2 The extractor signatures (parse: CSS → typed)

```ts
export function parseAnimationTimeline(input: string, onParseError?: OnParseError): AnimationTimelineValue;
export function parseAnimationRange(input: string, onParseError?: OnParseError): AnimationRangeValue;
export function parseAnimationRangeBoundary(input: string): RangeBoundary;
export function parseTimelineScope(input: string): TimelineScopeValue;
// The aggregate — MIRROR of extractAnimationOptions (extract.ts:189): walk a Stylesheet, merge
// every recognised scroll-grammar longhand into one CSSTimelineOptions (CSS cascade order).
export function extractTimelineOptions(s: Stylesheet): CSSTimelineOptions;
```

### §II.2.3 The inverse serializer signatures (typed → CSS)

```ts
export function serializeAnimationTimeline(v: AnimationTimelineValue): string;  // no default padding
export function serializeAnimationRange(v: AnimationRangeValue): string;
export function serializeTimelineScope(v: TimelineScopeValue): string;
// The aggregate inverse — mirror of reverseAnimationShorthand (animation-shorthand.ts:262).
export function serializeTimelineOptions(opts: CSSTimelineOptions): {
    "animation-timeline"?: string; "animation-range"?: string;
    "timeline-scope"?: string; "animation-trigger"?: string;
};
```

**Round-trip law (the gate's core):** for every valid `s`,
`serializeAnimationTimeline(parseAnimationTimeline(s))` is CSS-equivalent to `s` (canonical-form
equal — whitespace-normalized, default-omitted), exactly as `reverseAnimationShorthand`
(`animation-shorthand.ts:262`) round-trips `parseAnimationShorthand`. This is what kf-K.W9's
`proof:scroll-roundtrip` clause **(b)** asserts on the published producer.

## §II.3 — The grammar (the four MDN sub-grammars, in the easing.ts idiom)

All keyword sets use `istring` (`utils.ts:5`); `<dashed-ident>` uses `identifier` (`utils.ts:37`)
guarded to a `--`-prefix.

### §II.3.A `animation-timeline`

```
<single-animation-timeline> = auto | none | <dashed-ident> | scroll([<axis>||<scroller>]) | view([<axis>||<inset>])
<axis>     = block | inline | x | y
<scroller> = root | nearest | self
```
Skeleton mirrors `linearFunction` (`easing.ts:60-62`):
`istring("scroll").next(all(axis.opt(), scroller.opt()).trim(ws).wrap(lparen, rparen)).map(...)`;
the named-ref fall-through is LAST (the `isAnimationName` final-fall-through idiom in
`animation-shorthand.ts`). The `||` (order-free, each-optional) form is the ONE combinator
`easing.ts` does NOT show — implement as a tried-both-orders `any` or a small local `permutationOpt`
helper (the open question for the wave-doc author, §II.9).

### §II.3.B `animation-range` / `-start` / `-end`

```
<animation-range>           = <animation-range-start> <animation-range-end>?
<animation-range-start/end> = normal | <length-percentage> | <timeline-range-name> <length-percentage>?
<timeline-range-name>       = cover | contain | entry | exit | entry-crossing | exit-crossing
```
The `<range-name> <length-percentage>?` pair is structurally the `<linear-stop>` shape
(`easing.ts:36-53`: keyword head + optional position). `<length-percentage>` emitted VERBATIM as a
string (the parser does NOT resolve `25%`→px — the driver does). `normal`/a bare
`<length-percentage>` is the no-phase boundary; the 2-endpoint shorthand splits on the phase
boundary the way `parseSingleAnimation` walks tokens.

### §II.3.C `timeline-scope`

```
<timeline-scope> = none | all | <dashed-ident>#
```
A `.sepBy(comma, 1)` of `<dashed-ident>` (the `<linear-stop-list>` idiom, `easing.ts:56-58`), with
`none`/`all` as `any` alternatives ahead of the list.

### §II.3.D the `splitTopLevelCommas` reuse

`animation-timeline`/`-range`/`timeline-scope` are all `#`-lists at the property level. The
paren/string-aware top-level comma split is ALREADY written — `splitTopLevelCommas`
(`animation-shorthand.ts:210`, verified). VJ.W1 reuses it (or promotes it to a shared
`parsing/utils.ts` helper) rather than re-authoring comma-splitting (KISS — `N.md §6`).

### §II.3.E `animation-trigger` / `timeline-trigger` (the forward-looking sub-item)

```
<single-animation-trigger>      = <single-animation-trigger-type> || [<timeline> [<animation-range>]?]
<single-animation-trigger-type> = once | repeat | alternate | state
```
The Chrome-145 discrete layer. ABSENT even from `STYLE_NAMES` today (§II.0). VJ.W1 **partitions this
as a sub-item it lands AFTER the scroll-timeline core** (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.2`). The
core (A/B/C) is what kf-K.W9's clause (b) gates on; the trigger layer is a widening on a later patch.
**If the trigger layer slips past 0.13.0, it falls to the post-N Tranche O (§II.8) — it does NOT
block the core cut.**

## §II.4 — The born-RED gate (value.js-side — REDs because the symbol is ABSENT today)

**Born-RED probe (the absence, re-verified 2026-06-15):**
```sh
grep -rscE "CSSTimelineOptions|parseAnimationTimeline|serializeAnimationTimeline|rangePhase" src/
# → 0 across every file. The symbol does not exist at 0.12.0.
```

**The GREEN-when-shipped gate roster (the new `test/scroll-timeline.test.ts`):**

1. **Parse correctness** — `parseAnimationTimeline("scroll(root block)")` →
   `{kind:"scroll", scroller:"root", axis:"block"}`; `view(inline auto)` → the view value; `--my-tl`
   → `{kind:"name", name:"--my-tl"}`; `auto`/`none` → their kinds. The order-free
   `scroll(block root)` ≡ `scroll(root block)`.
2. **Range correctness** — `parseAnimationRange("entry 0% cover 40%")` → start `{phase:"entry",
   offset:"0%"}`, end `{phase:"cover", offset:"40%"}`; a bare `"50%"` → `{offset:"50%"}`; `"normal"`
   → `{phase:"normal"}` (or no-phase). The 6 `<timeline-range-name>` keywords each parse.
3. **Scope correctness** — `parseTimelineScope("--a, --b")` → `{kind:"names", names:["--a","--b"]}`;
   `none`/`all` → their kinds.
4. **Inverse round-trip (the kf-mirror gate)** — for a corpus of valid declarations,
   `serialize(parse(s))` is canonical-form-equal to `s` (the `reverseAnimationShorthand` round-trip
   law, `animation-shorthand.ts:262`). The EXACT clause kf-K.W9 `proof:scroll-roundtrip` (b)
   reciprocates.
5. **Aggregate extract** — `extractTimelineOptions(parseStylesheet(css))` merges longhands across a
   rule (the `extractAnimationOptions` cascade idiom, `extract.ts:189`).
6. **Totality / fail-loud** — a malformed `scroll(` emits a `ParseDiagnostic` to the supplied
   `onParseError` sink AND throws (`tryParse`, `utils.ts:123`).

**Acceptance:** all six green; the grep-absence probe inverts; `src/index.ts` re-exports the public
surface; the 0.13.0 cut publishes; **kf-K notified at the cut.**

## §II.5 — The kf-K consume edge (K.W9, file-level) + the acyclic cadence

**The consume seam (exact, reciprocal with `K.W9.md §S1` / `KF-TO-VALUEJS-GRAMMAR-ASKS.md §1.3`):**

- **The kf consumer:** a NEW `src/animation/scroll.ts` (HEAVY — it needs the parser; reached via
  `loadAnimationEngine()`, the static/dynamic boundary HOLDS). It is the `ScrollScene` /
  `createScrollScene(spec|css)` driver that CALLS `parseAnimationTimeline` / the `CSSTimelineOptions`
  extractor on its parse leg. `K.W9.md §S1` confirms `src/animation/scroll.ts` + `createScrollScene`
  do NOT exist today (born-RED root 1).
- **The inverse-serialize leg:** threads value.js's `serializeAnimationTimeline` through kf's
  `format.ts` serialize-from-template authority (the J.W1 declared-template projection; the scroll
  serializer rides the same "project from the declared template, never a DOM-resolved sample" law).
- **The gate it lights:** kf `proof:scroll-roundtrip` clause **(b)** — the PARSE round-trip. Clauses
  (a)/(c)/(d) (the `ScrollScene` driver, the dispatch matrix to native `ScrollTimeline`, the
  `position:sticky` pin synthesis) are value.js-INDEPENDENT — they compose SHIPPED kf primitives
  (`SmoothProgress`/`decay`/`SpringProgress`/`ScrollTimeline`) and GREEN on K.W7's substrate WITHOUT
  VJ.W1.

**The acyclic cadence (one beat behind — `EXECUTION-ORCHESTRATION.md §4`):**
```
value.js N.W11′ lands the parser/serializer born-RED (its own test reds: symbol absent)
   → value.js publishes 0.13.0 (= N.W11 color-SOTA + N.W11′ scroll grammar)
      → kf K.W9's src/animation/scroll.ts consumer re-pins one tranche behind; clause (b) GREENS
```
**kf's impl never blocks:** the kf source half (the `ScrollScene` driver) lands NOW, born-RED against
the recorded VJ.W1 absence; clause (b) REDs until value.js publishes; the consume edge LIGHTS on the
publish. **NEVER a `file:` link to value.js's WIP tree, NEVER a vendored copy of the grammar** (the
acyclic-spine invariant). No cycle: value.js → kf (grammar); kf → glass-ui (spring); no back-edge.

## §II.6 — Why a SIBLING library wave N.W11′ (not a leg of N.W11, not a post-N tranche)

**Why NOT fold into N.W11 (the way VJ.W2 folds into N.W11.D):** N.W11's scope is the color-SOTA
library wave — gamut-map re-anchor + the §13.2 oracle + wide-gamut egress, all touching
`units/color/`. VJ.W2 (`sampleColorRamp`) is ~S-effort beside that color work — it REUSES the
color kernels, so it folds as **N.W11.D** (a leg). VJ.W1 is a DIFFERENT substrate entirely — a
`parsing/`-path parser + inverse serializer, touching ZERO color code. It does not fit N.W11's color
scope; bolting a scroll-grammar parser onto a color wave would violate the file-disjoint-lane
discipline the rounds depend on.

**Why a SIBLING wave, not a post-N tranche:** VJ.W1 is bigger than N.W11's color scope (a full parser
+ inverse serializer + the aggregate extractor) BUT it is pure library/parsing work, value.js-
internal, with ZERO demo dependency and ZERO BA gate — so it rides BESIDE the library track in **R2**
(`EXECUTION-ORCHESTRATION.md §2`), contending with neither the design body (W12–W17) nor the BA-cut
consume (W18). It is exactly the profile of a sibling library wave: too big to be a leg of a color
wave, too purely-library to need its own tranche.

**The net:** value.js ships **0.13.0 = N.W11 (color-SOTA + the ramp N.W11.D) + N.W11′ (scroll
grammar)**, un-blocking kf-K.W9 (scroll, clause b) and K.W10-CC2 (densify) **within the constellation
beat**, not a tranche later — exactly as value.js + keyframes advanced together at 0.12.0.

## §II.7 — The slot into N + the round it runs

| Slot | Value |
|---|---|
| **Wave** | **N.W11′** — the scroll-grammar library wave (sibling to N.W11) |
| **Round** | **R2** (library ∥ keystone — `EXECUTION-ORCHESTRATION.md §2`), beside N.W11 + N.W12; library-only, no demo dep, no BA gate |
| **Cut** | **0.13.0** (N.W11 + N.W11′ together) |
| **Locus** | NEW `src/parsing/scroll-timeline.ts`; re-exported via `src/index.ts` (beside `:238`/`:271`); new `test/scroll-timeline.test.ts` |
| **Idiom** | the `parsing/easing.ts` parser-combinator idiom (§II.1); the mirror of `extract.ts` `CSSAnimationOptions`/`extractAnimationOptions` (§II.2) + `animation-shorthand.ts` `reverseAnimationShorthand` (§II.2.3) |
| **Born-RED** | the grep-absence probe (§II.4); REDs on 0.12.0, GREEN on the N.W11′ publish |
| **kf consume** | K.W9 `src/animation/scroll.ts` (HEAVY) → `proof:scroll-roundtrip` clause (b); lights on the 0.13.0 publish |
| **MEASURE-FIRST** | N/A — correctness grammar, not a perf claim (§II.0) |

**Hard gate:** the six §II.4 tests green; the absence-probe inverts; `parseAnimationTimeline`/
`parseAnimationRange`/`parseTimelineScope` + `serializeAnimationTimeline`/`serializeAnimationRange`/
`serializeTimelineScope` + `extractTimelineOptions` exported from `src/index.ts`; the round-trip law
holds on the corpus; 0.13.0 published; kf-K notified at the cut (the `proof:scroll-roundtrip` (b)
consume edge lights).

## §II.8 — The post-N Tranche O fallback (if the fold is declined)

If N is judged too large to absorb N.W11′, the clean fallback is the named tight **post-N Tranche O**
(library-only: VJ.W1 + VJ.W2 + any VJ-ledger residue), dispatched the moment N's library track is
free (`EXECUTION-ORCHESTRATION.md §3` final ¶). The kf consume edge is IDENTICAL either way —
`K.W9.md §S1`'s born-RED clause (b) lights on whichever cut publishes the `CSSTimelineOptions`
extractor (0.13.0's N.W11′ OR a Tranche-O follow-on), the same acyclic, published-consume-edge form.
**The fold is the better constellation move** (value.js + keyframes advance together); the post-N
tranche is the heavier path and only the fallback. The `animation-trigger` sub-item (§II.3.E) is the
natural Tranche-O candidate even UNDER the fold, since the WG is still shipping it — landing the
scroll-timeline core in 0.13.0 and the trigger layer in O is the cleanest partition if the core cut
is time-boxed.

## §II.9 — Open questions for the wave-doc author (carried, not resolved here)

1. **The `||` order-free combinator** — implement as a tried-both-orders `any` (§II.3.A) or mint a
   small `permutationOpt` helper in `parsing/utils.ts`? `easing.ts` has no `||` precedent — the one
   net-new combinator pattern.
2. **`splitTopLevelCommas` export** — promote the `animation-shorthand.ts:210` local to an exported
   `parsing/utils.ts` helper (so scroll-timeline reuses it without duplication), or keep it local? KISS
   argues promote-and-share.
3. **The aggregate `CSSTimelineOptions` vs the per-property entries** — does kf-K.W9 consume the
   aggregate `extractTimelineOptions` OR the per-property `parseAnimationTimeline`? `K.W9.md §S1`
   names both; ship both (the per-property parsers are the primitives, the aggregate composes them —
   the `extract.ts` two-tier shape).

---

# §slot-into-N — the fold table + the kf-K consume cadence

| Grammar | Wave | Round | Cut | Substrate / Locus | kf-K consume edge | Born-RED (value.js-side) |
|---|---|---|---|---|---|---|
| **VJ.W2** `sampleColorRamp` | **N.W11.D** (a 4th LANE of the color-SOTA wave N.W11) | R2 (library ∥ keystone) | **0.13.0** (the color cut) | `units/color/mix.ts:28` + `dispatch.ts:164,348,391` + `gamut.ts:53,247`; export `index.ts:158` | **K.W10** `compile.ts` color leg → CC-2 oklab densify; `proof:compile-replay-equal` (d) | `grep -rc sampleColorRamp src/ dist/` → 0 ✓; `test/color-ramp.test.ts` |
| **VJ.W1** `CSSTimelineOptions` | **N.W11′** (a SIBLING library wave beside N.W11) | R2 (library ∥ keystone) | **0.13.0** (the grammar sibling) | NEW `parsing/scroll-timeline.ts` beside `extract.ts`/`animation-shorthand.ts`; export `index.ts` (~:238/:271) | **K.W9** `scroll.ts` `createScrollScene` → `proof:scroll-roundtrip` (b) | `grep -rscE "CSSTimelineOptions\|parseAnimationTimeline" src/` → 0 ✓; `test/scroll-timeline.test.ts` |

**The 0.13.0 cut:** `0.13.0 = N.W11 (color-SOTA + the ramp N.W11.D) + N.W11′ (scroll grammar)`. Both
land in R2's library track — library-only, no demo coupling, no glass-ui BA gate, no contention with
the design body (W12–W17). They run beside N.W11.A-C and N.W12.

**The kf-K consume cadence (acyclic, one beat behind — `EXECUTION-ORCHESTRATION.md §4`):**
```
   value.js N (this fold) ──────────────────────▶ keyframes.js K (Band II frontier)
     N.W11.D + N.W11′ land born-RED (own tests red: symbols absent at 0.12.0)
     publish 0.13.0 ─────────────────────────────▶ K.W9  scroll.ts  → proof:scroll-roundtrip (b) GREENS
                    └────────────────────────────▶ K.W10 compile.ts → proof:compile-replay-equal (d) GREENS
```
Each arrow is a PUBLISHED consume — born-RED-gated downstream, NEVER a `file:` link or vendored copy.
kf's impl never blocks: the kf source halves (`scroll.ts`, `compile.ts`) land NOW against the recorded
absences; K.W10 stays green via CC-3's honest refusal; both clauses light on the 0.13.0 publish. No
cycle: value.js → kf (grammar); kf → glass-ui (spring); no back-edge.

---

# §dispatch-gate — what awaits the user (the only blocker for this fold)

| Gate | What it unblocks | Owner |
|---|---|---|
| **Ratify the grammar fold (THIS doc / `EXECUTION-ORCHESTRATION.md §3`)** | N.W11.D (`sampleColorRamp`) + N.W11′ (scroll grammar) → 0.13.0 → un-blocks kf-K.W9 (scroll, clause b) + K.W10 (densify, clause d) | **user** |
| **OR elect the post-N Tranche O fallback** | the SAME two grammars, library-only, dispatched the moment N's library track is free; the kf consume edge is identical (lights on whichever cut publishes) | **user** |

**The decision is binary:** ratify the fold (the better constellation move — value.js + keyframes
advance together in the same beat, as they did at 0.12.0) OR elect the named **post-N Tranche O**
(the heavier path; the fallback). Either way, the kf-K born-RED consume edges (K.W9 clause b, K.W10
clause d) are written against the recorded absence TODAY and light on whichever cut publishes the
producer. Nothing here is implemented; this is the executable spec, awaiting the one ratification
above. The `animation-trigger` sub-item (§II.3.E) is the clean Tranche-O candidate EVEN under the
fold, if the scroll-timeline core cut is time-boxed to 0.13.0.

---

# §provenance + the one-paragraph reading

kf-K's frontier fold dispatched two net-new value.js grammars on 2026-06-15: VJ.W2
(`sampleColorRamp` — a ~40-LoC COMPOSITION over shipped color kernels) and VJ.W1 (the
`CSSTimelineOptions` scroll grammar — the ONE genuine net-new parser + inverse serializer). This
document develops `EXECUTION-ORCHESTRATION.md §3` to executable depth: each carries its producer
signature, its born-RED gate (both absences re-verified ZERO at 0.12.0), its kf-K consume edge
(K.W10's CC-2 densify, K.W9's scroll round-trip) and the acyclic one-beat-behind cadence, the
MEASURE-FIRST note for VJ.W2 (it reuses kernels — bench, don't assert), and the slot into N
(N.W11.D the color-cut lane, N.W11′ the grammar sibling, both → 0.13.0). The fold is the recommended
move — value.js and keyframes advance together in the same beat — with a tight library-only post-N
Tranche O as the named fallback if N is judged too large to absorb them; the kf consume edge is
identical either way. This is a PROPOSAL: the dispatch gate ratifies the fold OR elects Tranche O.
DOCS ONLY — nothing is implemented; the work dispatches on the user's ratification.
