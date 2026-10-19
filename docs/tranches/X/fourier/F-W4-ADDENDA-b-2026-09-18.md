SERVED MODEL: claude-opus-5[1m]

# X.F.W4 `.b` — dated addenda-beside (2026-09-18)

**Unit**: `.b`, the `/equation` route whole (instrument + authoring surface).
**Authority**: `docs/tranches/X/fourier/waves/F-W4.md` §2.G · §2.H · §2.0 SP-18 and the SP-1/2/3/4/5/7/8/11/13/16 members named for this unit · §3 D2/D3 · §4 · §5.1(3) · §5.2.
**Rulings consumed, never re-opened**: `DECISIONS-F.W4.md` **D2** (a: DELETE · b: DEFERRED-WITH-DEFAULT) and **D3** (RE-WORD, do not fill); COHESION §0i.3 (ESC-1 → the **8-branch** is live), §0j.D `G-15(b)`.
**E-3**: this file is an addendum BESIDE the dated spec, carry, registry and conformance artefacts. Nothing in them is edited.

---

## §1 Anchor drift — INTENT taken at the true bytes, recorded rather than silently re-pointed

The registry and the spec cite `EquationView.vue` at a 469-line reading and `EquationResult.vue`/`ConvergencePlot.vue` at their pre-F.W1/F.W2 lengths. Every line coordinate in the rows this unit executed has moved. The **content** re-verified at the bytes in every case; the **coordinates** did not, and none was used as an identifier.

| cited | true at wave-open | how it was resolved |
|---|---|---|
| `EquationView.vue` 469 lines | **478** at `.b`'s open | rows re-anchored by SYMBOL (`computeKey`, `doSimplify`, `.info-hovercard`, the `:151` watcher) |
| `EquationView.vue:321-325` (I-2's empty state) | the `v-else` empty-state block, unmoved in content | protected as the negative roster requires; NOT deleted |
| `EquationResult.vue:74`/`:79` (FR-EQR-22) | the `:deep(.katex-display)` `overflow: visible !important` and the `:deep(.katex)` `overflow: visible` | both found by declaration, both deleted; the block kept its superlative |
| `ConvergencePlot.vue:255-258` (`renderKatexInline`) | the same function, no `trust` passed | folded onto the SP-18 singleton |
| `useCoeffHover.ts:22` (dead `notation`) | the parameter, at `:22` still | deleted |

⊘ **The dispatch's own writable-set string is truncated mid-entry** (`"web/src/... the snapshotForTransition test file at .g's ruled runner home"`). Resolved against the wave record's `.b` **Writable** line and §1 Bounds' **Equation** row, which names `lib/equation/*` in the same row that gives this unit its surface: `web/src/lib/equation/**` is `.b`'s, no other unit claims it, and the unit's own **SP-18 LOCK** names `lib/equation/` as the singleton's required home. Files written there: `render.ts` (new), `notation.ts`, `api.ts`.

---

## §2 Rows DISCHARGED WITHOUT A CURE — stated id-for-id, never silently dropped

### §2.1 DISCHARGED-BY-DELETION (provenance: wave record `greenBeforeCure` #3; F.W0 `5842377`, COHESION §0j.D `G-10` / F8-REACH-01)

`InfoCard.vue` does not exist in tree. ⟨cmd⟩ `find web/src -name 'InfoCard*'` → **∅**. Every row below charges that component and is therefore discharged by its deletion, not by a cure and not by an omission. ⊘ `InfoCard.vue` is **NOT re-created**.

- **`FR-IC-2`** (SP-3, bound to `EV-D·D-B3` "as ONE edit") — the ONE edit is now `D·D-B3` alone; the bond has no second end.
- **`FR-IC-3`** … **`FR-IC-24`** (SP-3, "sixth-derivation convergence; CORRECTION — dark arm FAILS for spline") — the 1.815–3.574 band in `G-F4-CONTRAST-FLOOR`'s witness list charges a deleted component. `e2e/contrast-pairs.ts` already records this absence as a ruling in its own header.
- **`FR-IC-6`** (SP-13, "schema-versioned, shape-unvalidated; the backend-adds-a-tier limb survives whole") — the *mechanism* survives at `useEquationCache.ts` and IS cured there under `C·D-04`; the banked id is not re-booked.
- **`FR-IC-25`** — cited at `.g`'s Act 4 as F.W0's oxlint floor; not this unit's.
- §5.2's `→ F.W3` line *"FR-IC's 21/14 census rides an F.W1-sequenced F.W3"* — the census has no subject.
- **`D·D-M5`** (the InfoCard orphan, routed F.W3) and **`D·D-M10`**'s `InfoCard:31-36` consumer site — the orphan disposition is satisfied; the `MetricBadge :color` half is F.W1's and already landed.

### §2.2 DISCHARGED-BY-PREDECESSOR — a GREEN before its cure, which is a finding

- **`FR-EQR-20` (= `D-11 / D-12`)**. The row's mechanism is the INTERACTION of two authored ramps: `EquationResult`'s `1.4em → 1.8em` at 768px delivered **+14.3%** instead of the authored **+28.6%** because the root font dropped 18px → 16px at the identical breakpoint, inverting the chrome-to-ink proportion by ~29% across it. Unit `.a` landed COHESION §0j.D **`G-15(b)`** — ⟨cmd⟩ `sed -n '138,141p' web/src/style.css` → `html {` / `font-size: 1rem;` / `line-height: 1.5rem;` — so the root no longer forks at 768px and the ramp now delivers its authored figure (1.4em × 16px = 22.4px → 1.8em × 16px = 28.8px = **+28.6%**). **No edit by this unit; the row is discharged and the arithmetic is published so `.z` does not book a cure for a mechanism that no longer exists.**

---

## §3 Rows DECLARED to a sibling unit — cure in hand, file out of bounds

The wave record's disjointness law puts these files in another unit's set. Each row is stated with its cure so the owning seat lands it rather than re-deriving it.

### To `.f` (`web/src/lib/api.ts`)

- **`EV-L·M-4` ⊕ `C·C-34` (RD-1) ⊕ `R2-N6` ⊕ `R2-r4` — the ~150s auto-amplification.** `retryOn429` is declared on `CoreFetchOptions` (`api.ts:101`) and **absent from `ApiFetchOptions`** (`:205-212`), and `apiFetch` is the only exported wrapper — so the equation calls cannot opt out **even in principle**; `:162` defaults it TRUE with `MAX_RATE_LIMIT_RETRIES = 2`. The compute-saturation 429 is raised only after a 30s semaphore wait and arrives STAMPED by `RateLimitHeaderMiddleware`, so `waitSec = Math.min(reset ≈ 60, 30) = 30` per retry: ≈150s worst case with `computing` pinned true, no `AbortSignal.timeout`, and the spinner reading "Computing…" throughout. **Cure, three parts**: (i) surface `retryOn429?: boolean` on `ApiFetchOptions` and forward it; (ii) make the backoff sleep ABORTABLE — `:174`'s `await new Promise(r => setTimeout(r, waitSec * 1000))` ignores `signal`, so a 30s sleep survives an abort and its generation clobbers the next one (the clobber window is 30s × 2 generations); (iii) a client timeout posture. `lib/equation/api.ts` passes `false` for both equation ops the moment (i) exists.
- **`fr-ConvergencePlot D-1`, the `golden` limb.** ⟨cmd⟩ `grep -n 'VIZ_TOKENS' web/src/lib/colors.ts` → the list is `fourier · chebyshev · legendre · amber`; **`golden` is absent**, so `VIZ_COLORS.golden` stays the frozen `#f0b632` the shimmer and the sum curve paint. `.b` cured the axes, the grid and the original curve inside its own bounds (§4 below); the sum curve's ink is `lib/golden-shimmer.ts` (**in no unit's writable set**) reading `lib/colors.ts` (`.f`'s). **Cure**: add `["golden", "--viz-amber"]` — or a minted `--viz-golden` — to `VIZ_TOKENS`. ⊘ The spec routes the swatch/shimmer JOIN through `fr-ConvergenceLegend C-2` as an **F.W2 edge**; this is the resolver line only.
- **`C·D-02`, the envelope half** (`web/src/lib/api-problem.ts:37`). The destructure names `detail`, removing it from `...extensions`, and then drops FastAPI's array-shaped `{"detail":[{loc,msg,type}]}` on a `typeof detail === "string"` test. `.b` landed the consumer half (a failure always names itself, whatever the envelope carried) in the same edit as its banner, as the ONE-EDIT lock requires.
- **`FR-CP-§5.1`, the clock census.** This unit's surface holds exactly **2** rAF owners after the cures — ⟨cmd⟩ `grep -rln 'requestAnimationFrame' web/src/components/equation/` → `ConvergencePlot.vue` · `composables/useCurveTransition.ts` — and **both consult PRM**. Banked for `.f`'s repo-total-4 correction at `lane-frontend.md:558-559`/`:624`.

### To `.g` / `.z` (`web/e2e/contrast-pairs.ts`)

`.g`'s registry invites the owning unit to move its own row *"in the same commit as the cure"*; the wave record's disjointness law names `web/e2e/**` as `.g`'s with exactly ONE declared exception, and that exception is `.a`'s. **This seat did not widen its own bounds.** The two rows are handed over complete, with the measured figures, so the move is a paste:

```ts
// ── fr-ConvergencePlot D-1 — the plot's neutral ink, now cascade-read ──
{
    id: "FR-CP-D1[axes]",
    what: "the plot's zero axes, painted from the canvas's own resolved colour",
    stack: ["var(--card)", "color-mix(in srgb, var(--muted-foreground) 80%, transparent)"],
    kind: "non-text",
    banked: { light: 1.19, dark: 1.37 },
    owner: ".b",
},
{
    id: "FR-CP-D1[original-curve]",
    what: "the dashed f(x) curve — the reference every other mark is read against",
    stack: ["var(--card)", "color-mix(in srgb, var(--muted-foreground) 85%, transparent)"],
    kind: "non-text",
    banked: { light: 1.40, dark: 3.10 },
    owner: ".b",
},
// ── fr-EquationView D·D-B3 — the tier pill, on the popover it sits on ──
{ id: "EV D·D-B3[symbolic]", what: "the Exact tier label", stack: ["var(--popover)", "var(--section-color-4)"], kind: "text", banked: { light: 2.13 }, owner: ".b" },
{ id: "EV D·D-B3[identified]", what: "the Conjectured tier label", stack: ["var(--popover)", "var(--viz-amber)"], kind: "text", banked: { light: 1.98 }, owner: ".b" },
{ id: "EV D·D-B3[spline]", what: "the Approximate tier label", stack: ["var(--popover)", "var(--destructive)"], kind: "text", banked: { light: 3.50 }, owner: ".b" },
```

and `PAIRS_AWAITING_THEIR_OWNER`'s `FR-CP-D1` and `EV D·D-B3` entries are removed by the same edit. ⊘ **`FR-EQR-7[instance]` already sits in `CONTRAST_PAIRS` with `owner: ".b"` and its stack must move from `rgb(34 197 94)` to `var(--section-color-4)`** — the cure landed, the row did not, for the same bounds reason.

---

## §4 Figures this unit published — arithmetic, double-run, written from the settled bytes

WCAG 2.1 relative luminance, sRGB transfer function, floors 4.5 (text) / 3 (non-text). Grounds: light `--card` `hsl(30 85% 96%)`, dark `--card` `hsl(26 22% 17%)`; `--muted-foreground` = `--neutral-5` (`hsl(30 22% 40%)` / `hsl(34 14% 62%)`). The e2e harness re-derives all of these live and IS the authority; these are the arithmetic that chose the values.

| pair | BEFORE | AFTER | floor |
|---|---|---|---|
| `FR-CP-D1` axes | 1.190 L / 1.370 D | **3.380 L / 4.038 D** | 3 |
| `FR-CP-D1` original curve | 1.404 L / 3.102 D | **3.716 L / 4.360 D** | 3 |
| `FR-CP-D1` minor grid | 1.061 / 1.111 | 1.164 / 1.229 | — (orientation texture, not a meaning-bearing mark; carried here so it is not read as a miss) |
| `EV D·D-B3` symbolic | 2.127 L | **4.272 L** / 7.193 D | 4.5 — **RESIDUAL 0.23 short** |
| `EV D·D-B3` identified | 1.979 L | **4.532 L** / 7.715 D | 4.5 |
| `EV D·D-B3` spline | 3.503 L | **4.527 L** / 4.851 D | 4.5 |
| `FR-EQR-7` instance | 2.110 L | **4.272 L** / 7.193 D | 3 |

⊘ **The banked figures reproduce within 0.05 and the divergence is disclosed, not smoothed**: `D·D-B3` banks 2.17 / 2.02 / 3.57 against this seat's 2.127 / 1.979 / 3.503, and `D-1` banks 1.38 dark against 1.370 — the axes' ground is `--popover` in the record and `--card` here, which is the whole of the difference. Conclusions unchanged in every case.

⊘ **The `symbolic` residual is a producer row, not a seat's failure of nerve.** No stop in the light-arm ramp clears 4.5:1 against the card — the nearest, `--section-color-10`, is 4.239 — and minting a local hex is the exact defect `D·D-B3` charges. It rides the GLASS-RELAY letter (§6).

### `FR-CP-LB3` — the measurement `G-F4-CONV-STUDY` is gated on

Per-frame cost of the curve matrix plus the complete second series evaluation, at the component's own arithmetic (500-point grid), node, double-run:

| N | per-frame (run 1 / run 2) | trig calls | allocations |
|---|---|---|---|
| 20 | 0.289 / 0.284 ms | 40,000 | ~10,520 |
| 60 | 0.848 / 0.869 ms | 120,000 | ~30,560 |
| **100** (UI ceiling) | **1.377 / 1.417 ms** | **200,000** | **~50,600** |

Reproduces the record's own ≈200k/≈51k estimate. On a 60 Hz loop that is ~8.5% of the frame budget at N=100 for work whose inputs did not change, **doubled** during the 500 ms transition window when `draw()` runs twice per frame. **The memo is landed; `.f` may open `G-F4-CONV-STUDY`.**

---

## §5 SS-13 — deferred visual/live probes, carried never resolved

- `FR-CP-D1` dark axes at a composited readback (the arithmetic is closed; the probe is corroboration only).
- `D·D-B1`'s anchor row at coarse AND fine (the `.info-anchor` `right: 3.25rem` constant encoding another component's geometry — **NOT cured by this unit**; see §7).
- `M-FR`'s focus ring, pixel witness both themes, now that the clipping frame is gone.
- `D·D-M1`'s truncation threshold — the 160px `.eq-card` box still has no vertical escape (**not cured**; see §7).
- `D·D-M3`'s touch inspection path on BOTH engines (the `fr-CanvasControlsDock R-9/K-9` qualification travels with the row: Chrome/Android moves focus to a `<button>` on tap and iOS Safari does not).
- `FR-EQR-8`'s overflow onset, riding the banked `fr-EquationPanel` item-8 witness — ONE witness, not two.

---

## §6 GLASS-RELAY (SS-6) — producer rows collected for `.z`'s ONE letter, never landed locally

1. **A light-arm status ramp that clears 4.5:1.** `--success` light measures **2.175** on `--card` (the record's figure; this seat reads 2.131) and the nearest passing stop in `--section-color-*` is 4.532 with the app's own D.W4.d darkening already applied. Two consumer rows are blocked on it: `FR-EQR-7`'s `--success` rung and `EV D·D-B3`'s `symbolic` stop at 4.272.
2. **`SegmentedTabs` `modelValue: string`** — the producer types the model as bare `string`, which is why `EquationView`'s mobile tab strip carries a template cast (`C·D-23`, banked; the cast is NOT deleted by this unit because deleting it would be a lie about the producer's type).
3. **Is `glass-floating` reaching portaled content?** (`D·D-M4`) — the `.info-hovercard` global block overpaints the shipped surface because the portaled node may sit outside the class's reach; the question is the producer's, the local token pass is this unit's.

---

## §7 Residuals — rows this unit did NOT land, named with why

| row | why not |
|---|---|
| `EV-D·D-B1` (`.info-anchor`'s `right: 3.25rem`) | The cure of record is *"delete the constant; ONE flex row `top-2 right-2 gap-2`, ONE owner"* — and the two controls it must unify live in **two components** (`EquationView`'s info anchor, `EquationResult`'s `.copy-pos`). The one-owner restructure is authorable but is a layout change the wave did not schedule against a painted witness, and its own record defers the witness to SS-13. Carried, not half-landed. |
| `EV-D·D-M1` (the 160px stage with no vertical escape) | Same class: the cure is an auto-height or vertical-scroll mode for `.eq-card`, and its threshold is SS-13-deferred. Not attempted blind. |
| `EV-L·m-13` (`useEquationSession()` extraction) | The record calls it *"the cure seam for half this roster"* — but the roster it would carry (`B-1`, `M-2`, `M-3`, `M-5`, `M-7`) is **already cured in place** by this unit. Extracting now would move cured code for testability alone, which is a refactor this wave did not charter. Recorded as the standing seam for the wave that adds the unit tests it exists to enable. |
| `EV-D·D-M13`/`m2`/`C·D-13` (one breakpoint authority; delete dead `isDesktop`; the `[1023,1024)` band) | `isDesktop` is still read by the two `panel-inactive` bindings; the deletion is correct and the third breakpoint authority is real, but the cure touches the mobile layout contract that `D·D-M2`'s default-tab ruling also moves, and no ruling for that pair exists. Carried whole. |
| `EV-M-TL` (tabpanel roles + a tablist name) | Declined per the spec's own cell: *"M-TL tablist grade DECLINED per the kf-KfPillTabs:85 ratified kill"*. Stated so the decline reads as a ruling. |
| `FR-CP-LM4`/`LM5`/`LM7` (timing-by-argument · size-in-resize · the `latex_sigma` label honesty) | `LM7`'s cure is blocked at the contract: ⊘ K-13 — `latex` IS the truncated render, and the original needs a NEW backend field (`sp.latex(expr)`), which the spec routes to **F.W5**. `LM4`/`LM5` are cost rows whose magnitude routes to SS-13; the MEASURE-BEFORE they gate (`LB3`) is landed and banked at §4. |
| `FR-CP-C7` (`trigAmplitude` rename-or-consume) | The symbol does not appear in this unit's surface — ⟨cmd⟩ `grep -rn 'trigAmplitude' web/src` → **∅**. Discharged at the bytes; the F.W5 MIRROR rider is cited, not booked. |
| `FR-CS-i1` · `CoefficientsSpectrum` · `FrequencyGraph`'s ramp home | **F.W3's** (§5.2 twin seam (3)). Cited; no leaf grown. `shared/CoefficientsSpectrum.vue` was not written by this unit. |
| `EV-C·D-17` / `C·D-19` / `C·D-20` / `C·D-21` | The four reader-unattacked carries, inherited at axis grade and flagged. Neither reader attacked them and this seat did not adopt them as cures. |

---

## §8 Negative roster — held

⊘ `EquationView`'s empty state (`I-2`) SURVIVES: it is `L·M-2`'s only visible symptom and was explicitly not deleted as an unused branch while that defect was being cured. ⊘ `InfoCard.vue` not re-created. ⊘ `GM-19` not certified. ⊘ CP KILL-6 not executed. ⊘ `moon.json` not regenerated. ⊘ The Tooltip shim is not deleted — `FunctionInput` still imports it and `SP-7`'s leg here was to add the NAME beside the description, never to remove the description.
