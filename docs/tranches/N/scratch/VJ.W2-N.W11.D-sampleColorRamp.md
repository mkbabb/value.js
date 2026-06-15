# VJ.W2 → N.W11.D — `sampleColorRamp` (the perceptual color-ramp sampler) — SCRATCH SPEC

**Status**: SCRATCH (the Fold phase consolidates this into N.W11's wave-section; do NOT treat as the
final doc). DOCS ONLY — nothing implemented; dispatch on user ratification of the §3 grammar fold
(`EXECUTION-ORCHESTRATION.md §5`). **Provenance**: authored 2026-06-15 by the value.js
execution-development author against the kf-dispatched grammar ask
(`../keyframes.js/docs/tranches/K/KF-TO-VALUEJS-GRAMMAR-ASKS.md §2`, the §2.2 producer anchors) and
the fold proposal (`EXECUTION-ORCHESTRATION.md §3`, "Fold → N.W11.D").

**One sentence**: `sampleColorRamp(from, to, n, {space, hueMethod})` is an N-stop perceptual ramp
sampler that composes value.js's already-shipped color kernels — `mixColors` (the per-step
perceptual lerp), `gamutMapOKLab` (the per-stop egress), `deltaEOK` (the spacing oracle) — beside
`mixColorsN` in `mix.ts`; it is ~S-effort net-new code (a composition, not new color science) and
slots cleanly as **lane D of N.W11**, the color-SOTA wave already touching that exact substrate.

---

## §0 — The producer signature value.js ships

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
  `colors.length === 0` throw, `mix.ts:34-36`).
- **`opts.space`**: `ColorSpace = "oklab"` (the default `mixColors`/`mixColorsN` already carry —
  `dispatch.ts:396`, `mix.ts:31`); `"oklch"` for the cylindrical hue-path ramps kf's CC-2 wants.
- **`opts.hueMethod`**: `HueInterpolationMethod = "shorter"` (`dispatch.ts:311,397`). This is the
  parameter bare two-stop `@keyframes` CANNOT encode — the thing the ramp EXISTS to bake
  (`../keyframes.js/.../KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.2`, "the hue path … the thing bare two-stop
  `@keyframes` cannot encode").
- **Returns**: `Color[]` of length `n`, each stop in the interpolation `space`, each in-gamut when
  `gamutMap` (default true). The ordering: `stop[0] = from`, `stop[n-1] = to` (inclusive endpoints).

**Export site**: `src/index.ts:158` already exports `mixColorsN` from `./units/color/mix`; add
`sampleColorRamp` to that same re-export line (the sibling N-color mix already lives there).

---

## §1 — How it reuses the shipped kernels (the S-effort composition — MEASURE-FIRST)

The decisive ground truth (the §2.2 ask, re-probed against value.js's tree 2026-06-15): value.js
ALREADY ships every kernel the ramp needs. The producer is a COMPOSITION, not net-new color science.

| Kernel | What it gives the ramp | value.js anchor (file:line, verified) |
|---|---|---|
| `mixColors(c1, c2, p1, p2, space, hueMethod)` | the per-step perceptual lerp at `t = i/(n-1)` (called as `mixColors(from, to, 1-t, t, space, hueMethod)`) — premultiplied alpha, NaN, hue all inherited | `src/units/color/dispatch.ts:391` |
| `color2(color, space)` | lifts `from`/`to` into the interpolation space ONCE before the loop (the same conversion `mixColors:400-401` does per-call — hoist it so the ramp pays it `2×`, not `2n×`) | `src/units/color/dispatch.ts:164` |
| `interpolateHue(h1, h2, t, method)` | the cylindrical short/long/inc/dec hue path for `space="oklch"` (already inside `mixColors`; the ramp gets it FREE by calling `mixColors`, no re-impl) | `src/units/color/dispatch.ts:348` |
| `gamutMapOKLab(L, a, b)` | per-stop egress so no emitted stop silently sRGB-clips — the exact map N.W11.A re-anchors; the ramp consumes whatever cusp/α policy that lane lands | `src/units/color/gamut.ts:247` |
| `deltaEOK(L1,a1,b1, L2,a2,b2)` | the spacing oracle (§2 born-RED) AND the kf-side CC-2 ΔE ship-vs-refuse proof — the SAME kernel both sides consume; ships 0.12.0 | `src/units/color/gamut.ts:53` |

**The reference shape (composition over shipped kernels — illustrative, NOT prescriptive):**

```ts
export function sampleColorRamp(from, to, n, opts = {}) {
    const { space = "oklab", hueMethod = "shorter",
            endpoints = "inclusive", gamutMap = true } = opts;
    if (n < 2) throw new Error("sampleColorRamp requires n ≥ 2");

    // Hoist the space conversion OUT of the loop (mixColors:400-401 pays it per-call;
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

- **The gamut step**: each stop's OKLab `(L,a,b)` runs `gamutMapOKLab` (`gamut.ts:247`) so the
  ramp inherits N.W11.A's re-anchored cusp/α policy automatically — if N.W11.A tunes `GAMUT_ALPHA`
  or moves to a cusp strategy, the ramp's stops improve with zero ramp-side change. (For non-OKLab
  output spaces, route the egress through `gamutMapSRGB` `gamut.ts:305` per the space's family.)
- **Why ~S-effort**: ~40 LoC of loop + endpoint/gamut policy. ZERO new color math — every
  perceptual decision (lerp, hue, premul-alpha, gamut) is a call into a kernel N.W11.A/B/C already
  own and touch. It is the literal sibling of `mixColorsN` (`mix.ts:28`, "extends the 2-color
  `mixColors()` to arbitrary counts") — `mixColorsN` folds N colors → 1; `sampleColorRamp` expands
  2 colors → N. Same substrate, inverse direction.

**MEASURE-FIRST (the value.js-side discipline — `K.md §value.js coordination`, "reusing
`lerpColorValue` + `gamutMapOKLab` (MEASURE-FIRST)"):** the ramp is `n` `mixColors` calls + `n`
gamut maps. Before shipping, BENCH it against the existing `mix.ts` path (the `mixColorsN`
left-fold) to confirm (a) no per-step `color2` reconversion (the hoist above is the win — naive
`mixColors` re-converts both endpoints every call, `dispatch.ts:400-401`; the ramp must NOT pay
`2n×`), and (b) the per-stop `gamutMapOKLab` is the dominant cost (consistent with N.md §1's "flat
direct paths 1.03–1.08×; gamutMap dominates"). No perf CLAIM is made beyond "reuses existing
kernels at parity with `n` independent `mixColors` calls, minus the hoisted conversion" — the bench
is the gate, not a number asserted in advance.

---

## §2 — The born-RED gate (value.js-side — reds because the symbol is ABSENT today)

**Probe (registry/source, run 2026-06-15):**
```
$ grep -rc "sampleColorRamp" src/ dist/   →  ZERO matches (ABSENT — born-RED confirmed)
$ node -e "require('./package.json').version"  →  0.12.0
```
`sampleColorRamp` does not exist in 0.12.0's source OR dist. (Cross-checked against the kf-side
probe: `KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.1`, "`grep -rcE sampleColorRamp …@0.12.0/dist/` → ZERO".)

**The born-RED test (value.js-side, `test/color-ramp.test.ts` — NEW, born RED, GREEN on ship).**
It reds TODAY because the import resolves to `undefined`; greens when N.W11.D lands. The test idiom
mirrors `test/color-mix.test.ts` (`parseCSSColor` → `Color`, `import … from "../src/units/color"`):

1. **Existence / arity** — `import { sampleColorRamp } from "../src/units/color/mix"`; `n=2` returns
   a 2-element `Color[]` equal (within ΔE-OK) to the gamut-mapped `[from, to]`. *(REDS: undefined
   import today.)*
2. **Monotone perceptual spacing (the oracle)** — for a far endpoint pair (e.g. `oklch` red→blue,
   `n=8`), every adjacent `deltaEOK(stop[i], stop[i+1])` is within a tolerance band of the mean step
   ΔE (uniform perceptual spacing — the property a naive sRGB ramp FAILS). Consumes the RIPE
   `deltaEOK` (`gamut.ts:53`). *(REDS today.)*
3. **In-gamut egress** — every emitted stop's `oklabToLinearSRGB` is `isInSRGBGamut` true
   (`gamut.ts:87`) — no silent clip. Inherits N.W11.A's cusp/α policy. *(REDS today.)*
4. **Hue-method fidelity** — `oklch` red→blue with `hueMethod:"longer"` traverses the long arc
   (passes through green/yellow); `"shorter"` does not. The thing two-stop `@keyframes` cannot
   express; the reason kf needs the producer. *(REDS today.)*
5. **Endpoint identity** — `endpoints:"inclusive"` ⇒ `stop[0] ≈ from`, `stop[n-1] ≈ to` (ΔE-OK ≤
   `DELTA_E_OK_JND` = 0.02, `gamut.ts:51`). *(REDS today.)*

**Hard gate (N.W11.D, in the N.W11 wave-section idiom):** the `color-ramp.test.ts` oracle suite
green (the 5 clauses above); the MEASURE-FIRST bench shows no regression vs `n` independent
`mixColors` calls (the hoist confirmed); `sampleColorRamp` exported from `src/index.ts:158`; the
**0.13.0 cut published**; **kf notified at the cut** (the K.W10 consume edge, §3). This rides
N.W11's existing "version cut published; kf notified at the cut" gate (`WAVES-2.md:77`) — the ramp
adds the oracle suite + the MEASURE-FIRST bench to that gate, no new ceremony.

---

## §3 — The kf-K consume edge (K.W10 · CC-2 oklab densify · the compiler's gradient-stop emission)

**The reciprocal seam (exact, `K.W10.md §S2` ↔ `KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.3`):** kf's NEW
`src/animation/compile.ts` (HEAVY — the compile module over the `format.ts` lineage) color leg
CALLS `sampleColorRamp(from, to, n, {space, hueMethod})` to bake **N pre-sampled `oklab()` stops**
into the compiled `@keyframes` — the "CC-2 oklab densify." A perceptual color-interpolating
animation, compiled to native CSS, emits N intermediate `oklab()` keyframe stops (the ramp) so the
browser's linear sRGB tween between keyframes approximates the perceptual path; `n` is chosen so
each segment is sub-JND. The ship-vs-refuse decision is the kf-side **ΔE-ε proof**
(`proof:compile-replay-equal` clause (d)) which consumes the RIPE `deltaEOK` (`gamut.ts:53`, shipped
0.12.0) — densify only if the N-stop ramp's ΔE to the true perceptual path is within ε; else CC-3
REFUSES honestly.

**The acyclic cadence (value.js publishes; kf consumes ONE beat behind — born-RED-gated kf-side):**

1. **kf's source half lands NOW, born-RED** (against the recorded VJ.W2 absence). K.W10's CC-2
   densify consumer — the `compile.ts` color leg that CALLS `sampleColorRamp` — lands against the
   recorded absence; `proof:compile-replay-equal` clause (d) REDS until value.js publishes.
2. **K.W10 is GREEN via the honest REFUSAL until then** (the critical acyclic nuance for VJ.W2):
   CC-3's perceptual-oklab REFUSAL is the FALLBACK — the animation refuses honestly ("perceptual
   oklab interpolation has no faithful @keyframes equivalent") until the densify producer lands. So
   the densify is a **WIDENING that lights on the publish, NOT a blocker that reds the wave**. CC-1
   core + CC-3 refusals are RIPE and green on K.W7's substrate WITHOUT VJ.W2.
3. **The ΔE proof kernel is RIPE even while the producer is OPEN** — CC-2's ΔE-ε ship-vs-refuse
   proof consumes the already-shipped `deltaEOK` (`gamut.ts:53`, 0.12.0). So the moment value.js
   publishes `sampleColorRamp`, kf's densify consumer lights AND its proof is ready.
4. **The consume edge LIGHTS on the publish.** When value.js ships 0.13.0, kf's K.W1-style re-pin
   consumes `sampleColorRamp` one tranche behind; clause (d) greens. **NEVER a `file:` link to
   value.js's WIP tree, NEVER a vendored `sampleColorRamp`** — a PUBLISHED consume across the
   constellation spine (`KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.3`, the acyclic-spine invariant). No
   cycle: value.js → kf (grammar); kf → glass-ui (spring); no back-edge.

**The ownership boundary held (`L-SEED.md §7`):** value.js owns VALUES — the perceptual color
science (the lerp, the hue path, the gamut map, the ΔE oracle). kf owns TIME — the compile decision
(how many stops, where in the keyframe timeline, the ship-vs-refuse gate). VJ.W2 is ONLY the
`sampleColorRamp` COMPOSITION over shipped kernels; it is NOT the color-interpolation kernels
themselves (`lerpColorValue`/`gamutMapOKLab`/`deltaEOK` are SHIPPED 0.12.0; kf consumes them RIPE),
and it is NOT the compile driver (that is kf's `compile.ts`).

---

## §4 — The 0.13.0 cut + why N.W11.D folds cleanly (vs a post-N tranche)

**The cut**: `sampleColorRamp` ships in **0.13.0** as **N.W11.D** — a fourth lane of N.W11 (the
color-SOTA wave already cutting 0.12.x/0.13.0 — `WAVES-2.md:31,63`). 0.13.0 = N.W11 (color-SOTA +
the ramp) + N.W11′ (the VJ.W1 scroll grammar, the sibling library wave) —
`EXECUTION-ORCHESTRATION.md §3`. kf-K consumes 0.13.0 one beat behind (§3).

**Why it folds into N.W11 cleanly (the case, named):**

- **Same substrate, S-effort.** N.W11's lanes A/B/C ALREADY touch `gamut.ts` (the cusp re-anchor,
  `gamut.ts:141,238,247,264-277`), the §13.2 deltaE-OK oracle (`gamut.ts:53` + new tests), and the
  egress clamp. The ramp reuses `gamutMapOKLab` (`gamut.ts:247`) + `deltaEOK` (`gamut.ts:53`) — the
  EXACT symbols those lanes re-anchor. Adding the ramp is ~40 LoC + one oracle test file beside
  work already in flight, NOT a new color-science investment.
- **Library-only — no demo coupling, no BA gate, no contention.** N.W11 is "IMPL unilateral
  (library) … runs beside everything" (`EXECUTION-ORCHESTRATION.md §2 R2`, `WAVES-2.md:31`). The
  ramp inherits that: no demo dependency, no glass-ui BA cut wait, no contention with the design
  body (W12–W17). It runs in R2's library track beside N.W11.A/B/C.
- **The alternative is heavier.** Deferring to a post-N tranche spins up a whole successor tranche
  (open/charter/close ceremony) for ONE ~40-LoC sampler — and it leaves kf-K.W10's CC-2 densify
  edge dark a full tranche longer (green via refusal, but the densify widening unshipped). The fold
  ships value.js and keyframes together in the same beat — exactly as they advanced at 0.12.0.

**The post-N fallback (named, per `EXECUTION-ORCHESTRATION.md §3`):** if N is judged too large to
absorb the grammar, the clean fallback is a tight post-N **Tranche O** (library-only: VJ.W1 +
VJ.W2 + any VJ-ledger residue), dispatched the moment N's library track is free. The kf consume
edge is identical either way — born-RED kf-side, lights on whichever cut publishes
(0.13.0/N.W11.D or Tranche-O). The fold is the better constellation move; the tranche is the
fallback.

---

## §5 — The N.W11.D wave-section stub (for the Fold phase to lift into WAVES-2.md)

```
| Lane | Work | Anchors |
|---|---|---|
| D | `sampleColorRamp(from, to, n, {space, hueMethod})` beside mixColorsN — an N-stop perceptual
|   | ramp: n mixColors lerps (color2 hoisted out of the loop) + per-stop gamutMapOKLab egress.
|   | The hueMethod bakes the hue path two-stop @keyframes can't encode. MEASURE-FIRST vs n
|   | independent mixColors calls. Born-RED oracle: monotone deltaEOK spacing + in-gamut + endpoint
|   | identity. Exports from src/index.ts:158. | src/units/color/mix.ts:28 (sibling mixColorsN),
|   | dispatch.ts:164,348,391 (color2/interpolateHue/mixColors), gamut.ts:53,247 (deltaEOK/gamutMapOKLab),
|   | src/index.ts:158 (export), test/color-ramp.test.ts (new) |
```

**Hard gate (added to N.W11's gate, `WAVES-2.md:76-77`):** `color-ramp.test.ts` oracle suite green
(spacing + in-gamut + hue-fidelity + endpoint-identity); MEASURE-FIRST bench shows parity (no
per-step `color2` reconversion); exported; **0.13.0 published; kf notified at the cut** (K.W10's
`proof:compile-replay-equal` (d) lights on the publish).
