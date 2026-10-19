SERVED MODEL: claude-opus-5[1m]

# `G-F4-CONV-STUDY` — `BasisCanvas` ↔ `FourierField`, measured

**Wave / unit**: X.F.W4, unit `.f` · **Date**: 2026-09-18 · **Tree**: `fourier-analysis @ m/w1-bump-migration`, producer **glass-ui 8.0.0** (the adopted pin, COHESION §0i.3).
**Charter**: `F-W4.md` §2.L *CONV-STUDY* — *"a measured comparison memo stating which renderer owns which regime; adoption decisions route to SS-3/SS-4, not this wave."*
**Gate**: `G-F4-CONV-STUDY` — *"the study exists as a measured memo, taken AFTER `fr-ConvergencePlot L-B3`'s memoisation, stating which renderer owns which regime."*
**Census provenance**: `lane-frontend.md:427-432` (the shadow table) and `:642` (*"[P2] `fourier-field` convergence study … Highest-value, highest-risk."*).

---

## §0 The lock, discharged before the first measurement

⊘ *"Runs ONLY AFTER `FR-CP-LB3`'s memoisation is landed AND MEASURED by `.b` — else Canvas2D takes
the blame for recomputation cost."*

**Discharged.** Unit `.b` landed the memoisation at fourier `b3b9a35` and published the measurement
in `F-W4-ADDENDA-b-2026-09-18.md` §4:

| N | per-frame (run 1 / run 2) | trig calls | allocations |
|---|---|---|---|
| 20 | 0.289 / 0.284 ms | 40,000 | ~10,520 |
| 60 | 0.848 / 0.869 ms | 120,000 | ~30,560 |
| **100** | **1.377 / 1.417 ms** | **200,000** | **~50,600** |

and closed with *"The memo is landed; `.f` may open `G-F4-CONV-STUDY`."* Every figure below is taken
after that commit, so no recomputation cost is charged to a renderer.

⊘ *"Its cost baseline also carries EV's gBCR items (MEASURE-BEFORE)."* — §5.

---

## §1 What is actually on each side, at the adopted pin

Both surfaces read at the bytes, this seat, 2026-09-18.

**fourier-analysis** — ⟨cmd⟩ `wc -l` over the subject files:

| file | lines |
|---|---|
| `components/visualization/BasisCanvas.vue` | 551 |
| `components/visualization/lib/canvas-drawing/*.ts` (9 files) | 770 |
| `lib/bases.ts` | 46 |
| `lib/evaluators.ts` | 91 |
| **total** | **1,458** |

⊘ The census's *"547 + 764 = 1 311"* is superseded by execution, not contradicted: `.c`'s
`CP-ROW-40` rehome moved `contourEditing.ts` and the drawing directory grew. The figure of record
for this study is **1,458**, measured today.

**glass-ui 8.0.0** — ⟨cmd⟩ `node -e '…Object.keys(p.exports)…'` → `./fourier-field` and
`./fourier-math` are **both still exported at the adopted pin** (70 subpaths total), so the census's
4.0.0/7.0.0 availability claim survives the uplift. ⟨cmd⟩ `wc -c dist/fourier-field.js
dist/fourier-math.js` → 44,407 B and 2,626 B of built output, plus `components/fourier-field/`
carrying `shaders/`, `composables/` and `constants`.

`fourier-math`'s exported surface, read from `math.d.ts`: `comp` · `positionsAt` · `partialSumAt` ·
**`dftFromPoints`** · `makeEllipticSpectrum` · `makeHarmonicFigure` · `FOURIER_FIGURES` ·
`FOURIER_FIGURE_KEYS` · `BasisComponent`.

`FourierField`'s own words (`FourierField.vue.d.ts`): *"WebGPU-FIRST: the compute pass writes the
partial-sum curve + the epicycle chain tips, the fullscreen-fragment render pass composites the SDF
field; a WebGL2 GLSL twin is the fallback."* Its exposed handle is `backend()` · `pause()` ·
`resume()` · `wake()` · `renderAt(timeSec)` · `setHeadT(t)` · `rendererStatus`.

---

## §2 The substrate question, answered by measurement rather than by reading

The census called the coefficient math *"duplicated substrate"*. That is a claim about behaviour, so
it is measured: the same spectrum, through both implementations, in one node process, sampled at
1,001 values of `t` across the period. Double-run, identical.

⟨cmd⟩ `node /tmp/conv-study.mjs` ×2 →

```
### EQUIVALENCE — the same spectrum through both substrates
  N=10  (21 phasors): max|Δ| chain = 0   max|Δ| curve point = 0
  N=50  (101 phasors): max|Δ| chain = 0   max|Δ| curve point = 0
  N=100 (201 phasors): max|Δ| chain = 0   max|Δ| curve point = 0
```

**Zero. Not "within float tolerance" — exactly zero, at every sample, at every N.**
`lib/bases.ts`'s `fourierPositionsAt` and `fourier-math`'s `positionsAt` compute the same
accumulation in the same order with the same trig calls, and `lib/evaluators.ts`'s `evaluateFourier`
and `partialSumAt` agree the same way. The `BasisComponent` interface is declared in both trees with
the same four fields and the same `[re, im]` tuple.

Throughput, same process, 10,000 evaluations each:

```
  N= 20  fourier-analysis  fourierPositionsAt   6.04 / 6.06 ms      glass-ui  positionsAt   6.01 / 6.00 ms
  N= 60  fourier-analysis  fourierPositionsAt  18.63 / 18.70 ms     glass-ui  positionsAt  18.99 / 19.00 ms
  N=100  fourier-analysis  fourierPositionsAt  31.28 / 31.08 ms     glass-ui  positionsAt  31.10 / 30.90 ms
```

**Within 1.9% at every N, in both directions.** The duplication buys nothing and costs nothing on
the CPU. It is a maintenance liability and only that — which is a smaller finding than the census
implied, and a cleaner one.

**One capability is NOT duplicated, and it runs the other way.** The producer ships a client-side
FORWARD transform; this app has none and round-trips to Python
(`POST /api/contours/{hash}/compute/epicycles`):

```
  dftFromPoints(256 samples) -> 256 phasors in 2.22 / 2.19 ms; round-trip max error 2.816e-14
```

A 2.2 ms client-side DFT against a network round trip is not a performance nuance; it is a different
interaction model for the contour → spectrum step.

---

## §3 The cost that is actually on the table

The census's frame — *"fourier-analysis renders 1 311 LOC of Canvas2D … glass-ui's version is
GPU-backed"* — invites the reading that the CPU Fourier math is the cost a GPU move would offload.
Measured, it is not.

`BasisCanvas.vue` calls `fourierPositionsAt(components, anim.t, components.length)` **once per
frame** (`:144`, and `:326` on the fullscreen path — one per mounted canvas, never both for one
paint). The trail is accumulated incrementally, not recomputed. At the app's own default
`n_harmonics: 200`, from §2's throughput:

> **≈3.1 µs per frame of coefficient math — 0.019 % of a 16.67 ms frame budget.**

⊘ **So the Fourier math is not the cost, and a study that moved it to the GPU would be optimising
nineteen microseconds.** What `FourierField` would actually take over is the RASTERISATION — ~200
stroked circles, the trail, the ghost path, the grid and the labels, per frame, through Canvas2D —
and that is the half no headless instrument can weigh. It is flagged SS-13, not guessed at here.

⊘ The one cost figure already in hand points the same way: `.b`'s `L-B3` measurement charges
**1.377–1.417 ms/frame at N=100 to the `/equation` plot's own recomputation**, i.e. to work that was
being redone rather than to the renderer doing it. That row was cured by memoisation on the CPU, in
place, with no substrate change at all.

---

## §4 Which renderer owns which regime — the finding

Capabilities read from the two surfaces, not inferred.

| | `BasisCanvas` (Canvas2D, local) | `FourierField` (WebGPU→WebGL2, producer) |
|---|---|---|
| bases | fourier · chebyshev · legendre (`evaluateBasis` dispatch) | **fourier only** |
| spectrum source | server DFT over a user's traced contour | `spectrum` prop, or a **seeded** elliptic/figure generator |
| hit testing | label hit-regions → `useCanvasHover` | none; pointer **scrubs** the reconstruction |
| overlays | ghost path · image overlay · trail · grid · labels | comet head + fading trail, SDF-composited |
| palette | `VIZ_COLORS` through the cascade (`lib/colors.ts`) | `getPalette()` OKLCh, or a `color` token + `colorResolver` |
| reduced motion | the store's clock (this wave, `.f`) | **live PRM freeze**, in the primitive |
| off-screen | `IntersectionObserver` → `setCanvasVisible` | **offscreen-pause**, in the primitive |
| deterministic still | none | **`freeze` prop** — one static best-frame |
| forward DFT | none (server) | **`dftFromPoints`** |

**The verdict.**

1. **`BasisCanvas` owns the INSTRUMENT regime and is not replaceable by `FourierField`.** Three
   bases, hit-tested labels, an image overlay, a user's own contour, and a ghost path against which
   the reconstruction is read: the producer's primitive has none of these and its own README calls
   itself a *decorative* seeded field. The census's *"not drop-in"* nuance is confirmed at the 8.0.0
   bytes and should not soften with time.
2. **`FourierField` owns the AMBIENT/DECORATIVE regime, and this app currently has no consumer in
   it** — ⟨cmd⟩ `grep -rn 'fourier-field\|fourier-math' src/` → **∅**, unchanged since the census.
   Where this app wants a background field, a hero, or a frozen capture frame, the producer's
   primitive is strictly better provisioned than anything local: it already carries PRM freeze,
   offscreen pause and a deterministic `freeze` still.
3. **The coefficient math is one function under two names, and the duplication is the only real
   convergence row here.** Measured Δ = 0 and Δcost < 2 %. Adopting `fourier-math` would delete
   ~137 lines (`lib/bases.ts` + `lib/evaluators.ts`, minus the Chebyshev/Legendre arms the producer
   does not carry) and change no pixel. It is a maintenance decision, not a performance one, and the
   honest reason to take it is that a second copy of a transform drifts.
4. **The forward-DFT asymmetry is the highest-value row this study found, and the census did not
   name it.** `dftFromPoints` at 2.2 ms/256 samples is a capability this app currently buys with a
   network round trip.

⊘ **Adoption decisions route to SS-3/SS-4, not to this wave** (§2.L's own terms). Nothing here is
scheduled, nothing is landed, and no producer byte was touched — glass-ui is READ-ONLY.

---

## §5 The cost baseline, carrying EV's gBCR items (MEASURE-BEFORE)

`F-W4.md` §2.L binds this study's baseline to the `EV` `getBoundingClientRect` rows so that the
before-state is on the record before anything claims an improvement. `fr-EquationView D·D-m7/m8/m9`
books *"two `getBoundingClientRect` per qualifying mousemove, unthrottled, over a KaTeX subtree
(cost rides the banked fr-CP F.W4 MEASURE-BEFORE)"*, and `R2-K9` corrects the magnitude cell to
*"per QUALIFYING move"* — the `closest()` early return precedes both gBCRs.

**The baseline, measured at the bytes** — ⟨cmd⟩ `grep -rn "getBoundingClientRect" src/ | wc -l` →
**17** repo-wide, of which the `/equation` surface holds:

| file | gBCR call sites |
|---|---|
| `components/equation/ConvergencePlot.vue` | 4 |
| `components/equation/FrequencyGraph.vue` | 2 |
| `components/equation/composables/useCoeffHover.ts` | **2** ⟵ `D·D-m9`'s pair |

⊘ **Recorded, not optimised.** The two `useCoeffHover` calls are the row's own pair and they are
gated behind a `closest()` early return, so the per-event cost is paid only on a qualifying move;
the MAGNITUDE — what one gBCR over a KaTeX subtree actually costs on a real engine — is a layout
read that no headless process can weigh honestly, and it is **SS-13**, flagged and not resolved
inline. What this baseline establishes is the COUNT, before any later wave claims to have reduced
it.

---

## §6 Method, and what would falsify this

- Equivalence and throughput: one node process, both implementations loaded by path, the same
  generated spectrum in the frequency ordering both sides document (`0, +1, -1, +2, -2, …`), 1,001
  samples of `t`, double-run with identical output. Reproduce:
  `node /tmp/conv-study.mjs` (the script is quoted whole in this unit's receipt).
- Surfaces: read from the producer's own `.d.ts` at the installed 8.0.0, never from the census's
  4.0.0/7.0.0 description.
- **Falsifiers, named**: (a) if `FourierField` gains a multi-basis or hit-testing surface, finding 1
  weakens; (b) if the producer's `positionsAt` ever changes accumulation order, the Δ = 0 result
  must be re-run before any adoption; (c) the rasterisation comparison is UNMEASURED here, so any
  claim that the GPU substrate is faster for this app's instrument is unsupported by this memo in
  either direction.
