# N.W11 — The library color-SOTA wave: gamut-map re-anchor + the §13.2 oracle + wide-gamut egress + the ramp fold → 0.13.0

**Status: RATIFIED** (the WAVES-2 second block ratified 2026-06-15; the grammar fold §3 of
`EXECUTION-ORCHESTRATION.md` ratified into N's library track — `sampleColorRamp` folds here as
lane D). No longer PLANNED.

**Round:** R2 (library ∥ keystone — `EXECUTION-ORCHESTRATION.md §2`). Runs beside N.W12 (the design
keystone) and N.W11′ (the scroll-grammar sibling). **Library-only — no demo coupling, no glass-ui
BA-cut gate, no contention with the design body W12–W17.**

**Cut:** **0.13.0** (`= N.W11 color-SOTA + lane-D ramp + N.W11′ scroll grammar`).

**Idiom:** matches `N.md §4` and `WAVES-2.md` — §-structured, hard-gate-per-lane, file:line-grounded;
every claim cites a `src/` file:line, an audit-lane §, or a command+output (inv ε).

---

## §0 — One-paragraph reading

The library converts the demo's default `lab(92% 88.8 20)` to a near-white dusty pink because the
sRGB gamut map (Ottosson adaptive-L0, α=0.05, hold-L-and-H, `src/units/color/gamut.ts:247`)
annihilates **82.9%** of the color's chroma to hold lightness exactly for a far-out-of-gamut light
color. The conversion math is CSS-Color-4-correct — the **gamut-mapping POLICY** is the defect (lane
L-COLOR, the highest-severity user-audit claim, U10). N.W11 re-anchors the clip toward the cusp for
high-L colors (lane A), pins the CSS §13.2 binary-search OKLCh map as the spec oracle (lane B),
closes the wide-gamut egress hole where `xyz2displayP3`/`xyz2rec2020`/`xyz2adobeRgb` emit raw r>1
(lane C), reconciles the OKLCh display-range overflow (lane D-range), and folds the RATIFIED VJ.W2
`sampleColorRamp` perceptual ramp sampler over the exact kernels lanes A/B touch (lane D). The wave
is unilateral, analytical, with a clean before/after π (the swatch chroma), and it cuts 0.13.0 — the
publish that un-blocks kf-K.W10's CC-2 oklab densify one beat behind on the acyclic spine.

---

## §Provenance — the audit lanes + file:line roots

| Source | What it provides | Locus |
|---|---|---|
| User audit U10 | "Color conversion 'quantization' awful: default pink in LAB → RGB is 'nothing close' — needs SOTA refinement and research"; owner = **library**; the **highest-severity claim** in the 2026-06-12 audit | `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md:86` |
| Lane **L-COLOR** | the REPRODUCED root cause + the SOTA research + the 5-point fix design; the 4-way reference swatch table; the secondary egress/oklch/inputColor defects | `docs/tranches/N/audit/lanes2/L-COLOR.md` (full lane) |
| Lane **S1** (synthesis) | the framing: "L-COLOR proved the math CSS-Color-4-exact; the wave is a POLICY re-anchor" — cusp re-anchor + §13.2 oracle + egress | `docs/tranches/N/audit/lanes2/S1.md:26,63` |
| Lane **S2** (critic) | the wave-board placement: "N.W11 Library color-SOTA (U10): gamut-policy re-anchor + §13.2 oracle + egress; BA? no" | `docs/tranches/N/audit/lanes2/S2.md:113` |
| Lane **X-GU** | the producer-overlap verdict: U10 is **value.js's OWN library** — the one U-row no glass-ui cut can touch; "the pure sink … no producer can fix it for us" | `docs/tranches/N/audit/lanes2/X-GU.md:93,124,221` |
| WAVES-2 §N.W11 | the ratified lane table A/B/C/D-range + the hard gate | `docs/tranches/N/WAVES-2.md:63-77` |
| **GRAMMAR-FOLD** PART I | the VJ.W2 → N.W11.D `sampleColorRamp` producer signature, the kernel-reuse map, the born-RED gate, the K.W10 consume edge | `docs/tranches/N/GRAMMAR-FOLD.md:40-256` |
| EXECUTION-ORCHESTRATION §3 | the fold recommendation (VJ.W2 IN N.W11; the 0.13.0 cut; the acyclic cadence) + §5 dispatch gate | `docs/tranches/N/EXECUTION-ORCHESTRATION.md:92-123,153-164` |
| kf-K consume seams | `KF-TO-VALUEJS-GRAMMAR-ASKS.md §2.3` (the K.W10 densify reciprocal); `K/L-SEED.md §7` (the VALUE/TIME ownership boundary) | `../keyframes.js/docs/tranches/K/` (cross-repo mirror) |

**Source-tree roots (the live defect + the live substrate, all verified 2026-06-15):**

| File:line | What lives there |
|---|---|
| `src/units/color/gamut.ts:238` | `GAMUT_ALPHA = 0.05` — the dial that pulls toward grey (lane A) |
| `src/units/color/gamut.ts:247` | `gamutMapOKLab` — the Ottosson adaptive-L0 map (lanes A, D consume) |
| `src/units/color/gamut.ts:264-276` | the adaptive-L0 anchor block (`Ld`/`e1`/`L0`/`t`/`L_mapped`/`C_mapped`) — the near-horizontal ray that collapses chroma for light L (lane A) |
| `src/units/color/gamut.ts:141` | `findCusp(a_, b_)` — ALREADY implemented; the cusp anchor lane A re-anchors toward |
| `src/units/color/gamut.ts:53` | `deltaEOK` — the §13.2 spacing oracle (lane B) AND the lane-D / kf-CC-2 ship-vs-refuse kernel |
| `src/units/color/gamut.ts:305` | `gamutMapSRGB` — the sRGB entry the demo path routes through |
| `src/units/color/conversions/xyz-extended.ts:61-78` | `xyz2rgb` — HAS the `correctGamut=true` clamp (`gamutMap(...)` at `:74`) |
| `src/units/color/conversions/xyz-extended.ts:149-161` | `xyz2rgbFamily<R>` — the shared wide-gamut helper with **NO `correctGamut` clamp** (the lane-C hole) |
| `src/units/color/conversions/xyz-extended.ts:178,187,217` | `xyz2displayP3` / `xyz2adobeRgb` / `xyz2rec2020` — all route through the clampless `xyz2rgbFamily` (lane C; the WAVES-2 anchor `:61-79` predates the E.W1 family-helper extraction — the NEW line is `:149-221`) |
| `src/units/color/dispatch.ts:223,301-306` | `gamutMapToRgbSpace` + the `gamutMap` wide-gamut branch — the per-space numeric reduction lane C routes egress THROUGH |
| `src/units/color/dispatch.ts:164` | `color2(color, to)` — the space lift lane D hoists out of its loop |
| `src/units/color/dispatch.ts:348` | `interpolateHue` — the cylindrical hue path lane D inherits FREE via `mixColors` |
| `src/units/color/dispatch.ts:391` | `mixColors` — the per-step perceptual lerp lane D calls |
| `src/units/color/mix.ts:28` | `mixColorsN` — the N→1 fold; lane D's `sampleColorRamp` is its 2→N inverse sibling |
| `src/units/color/constants.ts:72` | `oklch.c: { number: { min: 0, max: 0.5 } }` — the display max the pink's C=0.545 overflows (lane D-range) |
| `src/index.ts:158` | `export { mixColorsN } from "./units/color/mix"` — the re-export line lane D adds `sampleColorRamp` to |
| `src/index.ts:170-178` | `deltaEOK` / `findCusp` / `gamutMapOKLab` exported — the RIPE kernels lane D + the oracle consume |
| `demo/@/components/custom/color-picker/index.ts:36` | `DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)"` — the pathological OOG default (the demo-follow-up, out of W11's library scope — see §Hand-off) |

---

## §State-verified — the defect/absence proven TODAY (2026-06-15)

Every claim below is a command run against the working tree / built `dist/value.js` / installed
`node_modules/@mkbabb/glass-ui` at version 0.12.0, glass-ui 3.13.0.

### SV-1 — The gamut-map chroma annihilation (lane A, the U10 root) — LIVE

The default pink's OKLab is `L=0.9583, C=0.2724, H=9.83°` (L-COLOR §2). Running the SHIPPED
`gamutMapOKLab` against it (`/tmp/u10-gamut.mjs`, read-only, no repo edits):

```
$ node -e "import('/Users/mkbabb/Programming/value.js/dist/value.js').then(({gamutMapOKLab,deltaEOK})=>{
    const L=0.9583,C=0.2724,H=9.83*Math.PI/180,a=C*Math.cos(H),b=C*Math.sin(H);
    const [Lm,am,bm]=gamutMapOKLab(L,a,b),Cm=Math.hypot(am,bm);
    console.log('mapped C=',Cm.toFixed(4),' kept',(100*Cm/C).toFixed(1)+'%',' dE-OK=',deltaEOK(L,a,b,Lm,am,bm).toFixed(4));})"
ORIGINAL OKLab : L=0.9583 C=0.2724
MAPPED   OKLab : L=0.9118 C=0.0465  (chroma kept 17.1%)
chroma annihilated: 82.9%
dE-OK orig→mapped : 0.2307  (JND=0.02, so 11.5x JND)
```

**Confirmed: 82.9% chroma annihilated, dE-OK = 0.2307 = 11.5× JND** — matching L-COLOR §2 to the
digit. The demo's `colorUnit2 → rgb` path lands `rgb(255, 213.85, 218.82)` (a near-white pink) by
the same map; the live app and the pure library agree to the digit (L-COLOR §1.3), so the value the
user sees is exactly what the library computes.

The 4-way reference table (L-COLOR §2, cross-checked three independent ways — browser canvas
`getImageData`, the CSS §13 spec sample code, hand-coded §13.2) is the falsifiable backbone of
HG-A's π — lane A must land the library row's chroma UP toward the original, hue HELD:

| Path | sRGB (0–255) | OKLab C | OKLab H° | dE-OK→orig | failure mode |
|---|---|---|---|---|---|
| Original (OOG) | — | **0.2724** | 9.83 | 0 | (not representable on sRGB) |
| **Library — Ottosson α=0.05 (TODAY, SV-1)** | `255, 214, 219` | **0.0465** | 9.83 | 0.231 | **chroma annihilated −83% → washed out** |
| CSS §13.2 chroma-reduction (the lane-B oracle) | `255, 230, 235` | 0.0281 | 3.98 | 0.245 | even paler (NOT the policy answer; the bound) |
| Naive per-channel clip (browser canvas) | `255, 143, 200` | 0.1495 | 349.25 | 0.223 | **hue rotated +339° — FORBIDDEN** |

**Born-RED in the policy-defect sense:** the default pink IS visibly washed out today (library row
C=0.0465), the lane A cusp re-anchor IS absent, and the chroma figure is the measured before-half of
lane A's π. HG-A's target (C ≥ ~0.12) lands the library row visually between the too-pale `255,214,219`
and the hue-broken `255,143,200`, holding hue at ~10° (L-COLOR §4).

### SV-2 — The wide-gamut egress hole (lane C) — LIVE

`xyz2rgbFamily` (the shared helper at `xyz-extended.ts:149`) emits raw transfer-encoded channels
with **no `correctGamut` clamp** — unlike `xyz2rgb` (`:61-78`, which clamps via `gamutMap` at `:74`).
A color OOG for P3/rec2020 themselves egresses raw out-of-[0,1]:

```
$ node /tmp/egress.mjs   # parseCSSColor → normalizeColorUnit → colorUnit2(_, "display-p3"/"rec2020")
oklch(0.9 0.37 145)
   → p3      : display-p3(1.8540690 -0.8560108 0.7622723)
   → rec2020 : rec2020(1.7071258 -0.6800054 0.7166112)
lab(92% 88.8 20)
   → rgb     : rgb(... in-gamut, clamped ...)        # xyz2rgb DOES clamp
```

**Confirmed: r > 1 AND negative channels on the P3/rec2020 egress; the sRGB path clamps but the
wide-gamut family does not** — the inconsistent egress policy L-COLOR §3 secondary-defect 1 names.
Born-RED: `colorUnit2` to any wide-gamut space silently emits raw out-of-gamut channels today.

### SV-3 — The OKLCh chroma display overflow (lane D-range) — LIVE

```
$ grep -n "c: { number: { min: 0, max: 0.5" src/units/color/constants.ts
72:        c: { number: { min: 0, max: 0.5 }, "%": ALPHA_RANGE["%"] },
```

`lab→oklch` gives the default pink raw C ≈ 0.2724, which `normalizeColorUnit` scales against the
oklch `c` max `0.5` to **0.545 — past 1.0** (L-COLOR §3 secondary-defect 2). The OKLCh slider's
declared maximum cannot hold the default color; the picker would peg silently. Born-RED: the range
constant is `0.5` today and the normalized value overflows it.

### SV-4 — The lane-D producer `sampleColorRamp` is ABSENT (born-RED, capability-ABSENT sense)

```
$ node -e "console.log(require('./package.json').version)"            →  0.12.0
$ grep -rc "sampleColorRamp" src/ dist/                              →  ZERO across every file
$ node -e "import('.../dist/value.js').then(m=>console.log('sampleColorRamp' in m))"   →  false
```

`sampleColorRamp` does not exist in 0.12.0's source OR dist (GRAMMAR-FOLD §I.2, re-verified). The
`test/color-ramp.test.ts` oracle reds TODAY on the undefined import and greens when lane D lands.

### SV-5 — The RIPE substrate lane D composes over IS present (the S-effort proof)

```
$ node -e "import('.../dist/value.js').then(m=>console.log(
    ['gamutMapOKLab','deltaEOK','findCusp','mixColorsN'].map(k=>k+':'+(k in m)).join('  ')))"
gamutMapOKLab:true  deltaEOK:true  findCusp:true  mixColorsN:true
```

Every kernel lane D reuses — `mixColors` (the per-step lerp), `gamutMapOKLab` (the per-stop egress,
the EXACT map lane A re-anchors), `deltaEOK` (the spacing oracle), `mixColorsN` (the sibling fold) —
is shipped and exported at 0.12.0. Lane D is a ~40-LoC COMPOSITION, not new color science.

### SV-6 — The cross-wave gate-opener born-RED roots (W10.C / W10.D), proven on the live demo

W11's π gate (the swatch before/after) is structurally blind until N.W10 lands — the cascade-kill
means the desktop never renders, so any in-viewport / console-clean evidence is meaningless. The two
W10 roots W11 is gated behind are born-RED TODAY:

**The cascade kill (W10.D, U11's true root) — LIVE on glass-ui 3.13.0:**
```
$ CSS=node_modules/@mkbabb/glass-ui/dist/styles/components.css
$ grep -c "@layer" $CSS                          →  0
$ grep -oE '\.(flex|block|hidden)\{[^}]*\}' $CSS  →  .block{display:block}  .flex{display:flex}  .hidden{display:none}
$ grep -n '@import "@mkbabb/glass-ui/styles"' demo/@/styles/style.css  →  52:@import "@mkbabb/glass-ui/styles";  (NO layer() wrapper)
```
glass-ui ships these utilities **unlayered**; per css-cascade-5 an unlayered rule beats ALL layered
rules, so the demo's layered `lg:*` responsive utilities are dead → the desktop dual-pane never
renders (D8-1 / U-DOCK §2). Born-RED on the live built demo.

**The save-data-loss P0 (W10.C) — LIVE in source:**
```
$ grep -n "ensureUser\|createPalette" demo/@/composables/palette/usePaletteActions.ts
60:        await ensureUser();
61:        const palette = deps.createPalette(name, colors);
```
`onCurrentPaletteSaved` awaits `ensureUser()` BEFORE `createPalette` — so a down/failing backend
aborts the local write and the palette is silently destroyed (D7 §3.4; the local-first contract is
inverted, auth gates the local save). Born-RED: the await-order is the data-loss path today.

---

## §Goal

**Goal criterion.** value.js's color egress is SOTA-faithful and self-consistent: the default
pathological OOG pink (and the historically-washed light pinks/yellows/cyans) gamut-maps to a
**visibly colorful** sRGB result — hue held exactly (the browser's +339° magenta rotation stays
forbidden), a bounded lightness trade for substantially preserved chroma — measured against the CSS
§13.2 spec reference as a test oracle; every wide-gamut egress is in its own gamut (no raw r>1); the
OKLCh display range holds the default color without silent pegging; and value.js ships the RATIFIED
perceptual ramp sampler `sampleColorRamp` over those same kernels, cutting 0.13.0 — the publish that
un-blocks kf-K.W10's CC-2 oklab densify one acyclic beat behind.

**Completion criterion.** All §Hard-gate clauses verify against artefacts: the 4-way swatch π
(L-COLOR §2 re-rendered, before/after) shows the default pink landing OKLab C ≥ ~0.12; the §13.2
oracle suite is green (deltaE-OK ≤ 0.02 acceptance) over the regression corpus; every wide-gamut
egress space is in-gamut per a per-space probe (the SV-2 raw-r>1 inverts); the OKLCh display range
no longer overflows (SV-3 inverts); the `color-ramp.test.ts` oracle suite is green (SV-4 inverts) and
the MEASURE-FIRST bench shows parity vs `n` independent `mixColors` calls; `sampleColorRamp` is
exported from `src/index.ts:158`; **0.13.0 is published and kf is notified at the cut.**

---

## §Scope — the lanes, each at the gestalt seam

The wave touches exactly the `units/color/` substrate (gamut + conversions + mix) plus the color
test tree. No demo source, no CI rewrite, no source outside `units/color/` and `test/` and the
`src/index.ts` re-export line. (DEVELOPMENT doc — these are the SPEC bounds, not an implementation.)

| Lane | Work | Anchors | Seam |
|---|---|---|---|
| **A — Gamut re-anchor** | Re-anchor the Ottosson clip toward the **cusp** for high-L colors (or expose the anchor as a strategy enum); `findCusp` already exists, only the anchor choice changes. Promote `GAMUT_ALPHA` to a tuned / L-adaptive value so light colors relax toward chroma preservation. **Target: the default pink lands OKLab C ≥ ~0.12** (vs 0.0465 today, SV-1) — visibly pink; **hue held exactly** (the +339° naive-clip magenta rotation is the one truly-wrong answer and is forbidden) | `gamut.ts:141` (`findCusp`), `gamut.ts:238` (`GAMUT_ALPHA`), `gamut.ts:247,264-276` (the adaptive-L0 block) | the gamut POLICY seam — one anchor choice + one constant, fully analytical, zero new iteration |
| **B — The §13.2 oracle** | Add the CSS §13.2 binary-search OKLCh map (hold L+H, binary-search the largest chroma within 1 JND = deltaE-OK 0.02) as the **reference test oracle** so any lane-A anchor change is measured against the spec; pin a regression corpus of far-OOG light pinks/yellows/cyans (the historically-washed hues) | `test/` (NEW `gamut-oracle.test.ts`); consumes `deltaEOK` (`gamut.ts:53`) | the spec-conformance seam — the oracle bounds the policy without dictating one tradeoff |
| **C — Wide-gamut egress parity** | Give `xyz2displayP3`/`xyz2rec2020`/`xyz2adobeRgb`/`xyz2proPhoto` a `correctGamut` clamp parity with `xyz2rgb`, routed through `gamutMap(color, <space>)` (the `gamutMapToRgbSpace` per-space numeric reduction already exists). `colorUnit2`'s wide-gamut output must be in-gamut for the egress space, **never raw r>1** (SV-2) | `xyz-extended.ts:149-221` (`xyz2rgbFamily` + the three egress fns), `dispatch.ts:223,301-306` (`gamutMapToRgbSpace`, the `gamutMap` wide-gamut branch) | the egress-consistency seam — close the sRGB-clamps-but-P3-doesn't asymmetry; thread the EXISTING numeric reduction, do not author a second map |
| **D-range — OKLCh display reconcile** | The default pink's normalized C = 0.545 overflows the declared `oklch.c` max `[0, 0.5]` — widen the display max OR document-and-clamp so the picker slider does not peg silently | `constants.ts:72` | the range-honesty seam — the slider's declared maximum must hold the colors the library produces |
| **D — `sampleColorRamp` fold (RATIFIED VJ.W2)** | Ship `sampleColorRamp(from, to, n, {space, hueMethod, endpoints?, gamutMap?})` beside `mixColorsN` — an N-stop perceptual ramp: `n` `mixColors` lerps with `color2` HOISTED out of the loop + per-stop `gamutMapOKLab` egress (so the ramp inherits lane A's re-anchored policy automatically). The `hueMethod` bakes the hue path bare two-stop `@keyframes` cannot encode. **MEASURE-FIRST** vs `n` independent `mixColors` calls. Export from `src/index.ts:158` | `mix.ts:28` (sibling `mixColorsN`), `dispatch.ts:164,348,391` (`color2`/`interpolateHue`/`mixColors`), `gamut.ts:53,247` (`deltaEOK`/`gamutMapOKLab`), `src/index.ts:158` (export), `test/color-ramp.test.ts` (NEW) | the composition seam — the 2→N inverse sibling of `mixColorsN`'s N→1 fold; ZERO new color science |

**Note on lane D vs N.W11′.** Only VJ.W2 (`sampleColorRamp`) folds INTO N.W11 as lane D — it reuses
the exact color kernels lanes A/B/C touch (~S-effort, same substrate). VJ.W1 (the `CSSTimelineOptions`
scroll grammar) is a DIFFERENT substrate (`parsing/`, zero color code) and rides as the SIBLING wave
**N.W11′**, not a lane here (GRAMMAR-FOLD §II.6). Both cut 0.13.0; this doc owns only N.W11.

---

## §Hard gate — FALSIFIABLE, born-RED-witnessable on a named defect tree TODAY

The wave closes when ALL clauses verify against artefacts. Each is falsifiable and born-RED today
(per the SV-N probes above); for the lane-D producer the born-RED is the **capability-ABSENT** sense
(the symbol does not exist — SV-4). P6 posture (the π / measured-evidence discipline) is named per
clause.

| # | Clause | Falsifiable test | Born-RED today | P6 posture |
|---|---|---|---|---|
| **HG-A** | The default `lab(92% 88.8 20)` gamut-maps to OKLab **C ≥ ~0.12** (vs 0.0465, SV-1); hue held within tolerance (no +339° rotation) | a focused test asserting the mapped chroma + hue-hold; the 4-way swatch π (L-COLOR §2 re-rendered, before/after) | YES — SV-1 measured C=0.0465 (17.1% kept) | **π before/after swatch** — the chroma figure is the measured before-half |
| **HG-B** | The §13.2 binary-search oracle suite is green (deltaE-OK ≤ 0.02 acceptance) over the far-OOG light corpus; the lane-A result sits within tolerance of the spec reference | `gamut-oracle.test.ts` green | YES — no §13.2 oracle exists in `test/` today | **focused test output** — the spec is the measured reference, not an asserted number |
| **HG-C** | Every wide-gamut egress (`display-p3`/`rec2020`/`a98-rgb`/`prophoto-rgb`) is in its own gamut — `colorUnit2` emits no channel outside [0,1] | a per-space probe re-running SV-2's `oklch(0.9 0.37 145)` → assert all channels ∈ [0,1] | YES — SV-2 emitted `display-p3(1.854 -0.856 …)` | **runtime probe** — the raw-r>1 emission inverts |
| **HG-Drange** | The OKLCh display range holds the default pink without overflow (normalized C ≤ 1.0) OR documents-and-clamps with no silent peg | assert the normalized oklch.c of the default pink ≤ 1.0 (or the documented clamp behaviour) | YES — SV-3 normalized C = 0.545 > 1.0 against max 0.5 | **runtime assertion** |
| **HG-D1** | `color-ramp.test.ts` oracle suite green: existence/arity (n=2 ⇒ gamut-mapped `[from,to]`); monotone perceptual spacing (adjacent `deltaEOK` within band of mean step ΔE); in-gamut egress; hue-method fidelity (`longer` vs `shorter` arc); endpoint identity | the 5-clause oracle suite green | YES — SV-4: `sampleColorRamp` undefined (capability-ABSENT) | **focused test output** — the spacing oracle is the measured property a naive sRGB ramp FAILS |
| **HG-D2** | MEASURE-FIRST bench: the ramp shows NO regression vs `n` independent `mixColors` calls (the `color2` hoist confirmed — no per-step reconversion, no `2n×` conversion cost) | a vitest bench comparing the hoisted ramp vs the naive `n×mixColors` path | N/A (no producer to bench today — lands with lane D) | **benchmark output — the bench is the gate, not a number asserted in advance** |
| **HG-D3** | `sampleColorRamp` exported from `src/index.ts:158`; the SV-4 grep-absence inverts | `grep -rc sampleColorRamp src/` > 0; import resolves | YES — SV-4 grep returns ZERO | **deletion/presence proof** (the absence inverts) |
| **HG-cut** | **0.13.0 published; kf notified at the cut** — K.W10's `proof:compile-replay-equal` clause (d) consume edge lights on the publish | the npm publish + the kf notification artefact | YES — current version 0.12.0 (SV-4) | **document reconciliation + publish artefact** |

**This rides N.W11's WAVES-2 gate verbatim** ("swatch π before/after of the 4-way comparison;
oracle suite green; egress in-gamut per space; version cut published; kf notified at the cut",
`WAVES-2.md:76-77`) — lane D adds the `color-ramp.test.ts` oracle + the MEASURE-FIRST bench, no new
ceremony.

**The gate-opener precondition (cross-wave, BINDING):** HG-A's π evidence is only meaningful AFTER
N.W10.D lands the cascade kill (SV-6) — until the desktop renders, in-viewport swatch evidence is
structurally blind (the same blindspot class kf-K's cold-axis invariant names). N.W11's LIBRARY lanes
(A/B/C/D-range/D) are demo-INDEPENDENT and provable by focused test + node probe WITHOUT the demo; only
the **π swatch re-render** sits behind W10.D. The library gates do not wait on W10; the visual π does.

---

## §No-workaround — the named forbidden shortcuts for THIS wave

- **NO matrix / round-trip "fix".** The conversion math is CSS-Color-4-exact (L-COLOR §3 reproduced
  the spec sample code to ~6 decimals). The defect is the **POLICY**, not the math — touching the
  Lab↔XYZ matrices, Bradford adaptation, or transfer functions is forbidden; it would chase a bug
  that does not exist.
- **NO naive per-channel clip.** The browser's `255,143,200` clip rotates hue +339° (pink→magenta);
  that is the **one truly-wrong answer** (L-COLOR §4). The re-anchor holds hue exactly — clipping to
  recover chroma at the cost of hue is forbidden.
- **NO second gamut map for the egress.** Lane C threads the EXISTING `gamutMapToRgbSpace`
  (`dispatch.ts:301-306`) numeric reduction; authoring a parallel wide-gamut map beside `gamutMap`
  is forbidden (no legacy beside its replacement; KISS).
- **NO demo-side re-quantization or `stableHue` patch.** L-COLOR §1.3 proved the live app and the
  pure library agree to the digit — there is no demo-side artifact to patch. The fix is in
  `units/color/`, not in the picker.
- **NO new color science in lane D.** `sampleColorRamp` is a COMPOSITION over shipped kernels
  (`mixColors`/`gamutMapOKLab`/`deltaEOK`). Re-implementing premultiplied-alpha, NaN propagation,
  the hue path, or the gamut map inside the ramp is forbidden — every perceptual decision is a call
  into a kernel lanes A/B already own (GRAMMAR-FOLD §I.1).
- **NO per-step `color2` reconversion in lane D.** The space lift is hoisted ONCE before the loop;
  paying `2n×` conversion (the naive `mixColors`-per-call path) is the MEASURE-FIRST anti-pattern
  HG-D2 forbids (GRAMMAR-FOLD §I.1).
- **NO asserted perf number.** Lane D's perf posture is "parity with `n` independent `mixColors`
  calls minus the hoisted conversion" — proven by BENCH, never asserted in advance (MEASURE-FIRST).
- **NO `file:` link / vendored copy across the spine.** kf-K consumes `sampleColorRamp` as a
  PUBLISHED 0.13.0 dependency one tranche behind — NEVER a `file:` link to value.js's WIP tree,
  NEVER a vendored `sampleColorRamp` in kf's source (the acyclic-spine invariant; contract-v2;
  `cross-repo-dev-resolution.md §2.4`).
- **NO default-color reseed inside this wave.** Reseeding the demo's pathological OOG `lab(92% 88.8
  20)` default is a DEMO ask (the cheapest user-visible win) but is OUT of W11's library scope — it
  lands in the demo lane (N.W16.A's D1-7 reseed decision, see §Hand-off). W11 fixes the LIBRARY so
  ANY color maps faithfully; it does not paper over the one pathological default.

---

## §Folds — the rows this wave discharges (each citing its audit lane + finding-id)

| Row | Finding / lane | Lane here | Discharge |
|---|---|---|---|
| **U10** — "color conversion quantization awful: default pink LAB→RGB nothing close" (the **highest-severity** user-audit claim, owner = library) | `LEDGER.md:86`; lane L-COLOR (full) | **A** + **B** | the gamut POLICY re-anchor toward the cusp + the §13.2 spec oracle — the default pink lands visibly pink (C ≥ ~0.12), measured against the spec reference |
| **L-COLOR §3 secondary-defect 1** — wide-gamut egress NOT gamut-mapped via `colorUnit2`; `lab→display-p3` yields raw r>1 | `L-COLOR.md:121-128`; SV-2 | **C** | `xyz2rgbFamily` gains `correctGamut` parity routed through `gamutMapToRgbSpace`; egress in-gamut per space |
| **L-COLOR §3 secondary-defect 2** — OKLCh chroma display overflow (normalized 0.545 past 1.0 against max 0.5) | `L-COLOR.md:129-133`; SV-3 | **D-range** | widen-or-document the `oklch.c` display max; the slider does not peg silently |
| **VJ.W2 / N.W11.D** — `sampleColorRamp` (the RATIFIED grammar fold; born-RED `sampleColorRamp` undefined @0.12.0) | GRAMMAR-FOLD §I (PART I); `EXECUTION-ORCHESTRATION.md §3`; SV-4 | **D** | the N-stop perceptual ramp sampler over shipped kernels; the oracle suite + MEASURE-FIRST bench green; un-blocks kf-K.W10 CC-2 densify |
| **L-COLOR §5.3 / §13.2 oracle ask** — pin the spec map as the reference oracle + a regression corpus of far-OOG light hues | `L-COLOR.md:196-198` | **B** | `gamut-oracle.test.ts` + the corpus |

**NOT folded here (explicitly routed elsewhere — zero drops, P-Inv 28):**
- **L-COLOR §3 secondary-defect 3 / W10.E** — the `inputColor` normalized-values-stamped-as-raw-`lab()`
  corruption on space-switch is a DEMO serialization bug → **N.W10.E** (data hygiene), not a library
  lane (`L-COLOR.md:134-138`; `WAVES-2.md:60`).
- **The default-color reseed** — the pathological OOG `lab(92% 88.8 20)` reseed is a DEMO ask →
  **N.W16.A** (the picker pane; D1-7), not W11 (`L-COLOR.md:206-209`; §No-workaround above).

---

## §Hand-off — the BINDING cross-wave + cross-repo boundaries

### Cross-wave (within N)

| Boundary | Direction | Binding contract |
|---|---|---|
| **N.W10.D → N.W11 (π)** | W10 lands FIRST | The cascade kill (SV-6) MUST close before W11's π swatch re-render is meaningful — until the desktop renders, in-viewport evidence is structurally blind. W11's LIBRARY gates (A/B/C/D-range/D) are demo-independent and provable WITHOUT W10; only the π swatch waits. inv-N-11 (cascade-truth) is the W10.D gate. |
| **N.W11 (lane A) → all color consumers** | W11 publishes the policy | Lane D's `sampleColorRamp` consumes `gamutMapOKLab` per-stop, so it AUTOMATICALLY inherits lane A's re-anchored cusp/α policy with zero ramp-side change — A and D land in the SAME cut, A's policy is the policy D's stops egress through. |
| **N.W11 → N.W11′** | siblings, same cut | VJ.W1 (scroll grammar) is the SIBLING wave, NOT a lane here (different substrate — `parsing/`). Both cut 0.13.0; N.W11 owns the color lanes + the ramp, N.W11′ owns the parser. No file overlap (color/ vs parsing/). |
| **N.W11 → N.W10.E / N.W16.A** | W11 declines, names successors | The `inputColor` serialization corruption (→ W10.E) and the default-color reseed (→ W16.A) are routed OUT of W11's library scope (see §Folds NOT-folded). |

### Cross-repo (the acyclic spine — kf-K, one tranche behind, PUBLISHED-consume)

| Boundary | Direction | Binding contract |
|---|---|---|
| **N.W11 lane D (0.13.0) → kf-K.W10** | value.js publishes; kf consumes one beat behind | kf's NEW `src/animation/compile.ts` (HEAVY) color leg CALLS `sampleColorRamp(from, to, n, {space, hueMethod})` to bake N pre-sampled `oklab()` stops into compiled `@keyframes` (the **CC-2 oklab densify**). kf's source half lands NOW born-RED against the recorded VJ.W2 absence; `proof:compile-replay-equal` clause (d) REDs until value.js publishes 0.13.0, then GREENS. **K.W10 stays green via CC-3's honest perceptual-oklab REFUSAL until the densify producer lands** — the densify is a WIDENING that lights on the publish, NOT a blocker that reds the wave (GRAMMAR-FOLD §I.3). |
| **The ΔE kernel (already RIPE) → kf CC-2 proof** | shipped 0.12.0 | kf's CC-2 ΔE-ε ship-vs-refuse proof consumes the already-shipped `deltaEOK` (`gamut.ts:53`, 0.12.0). The proof kernel is RIPE even while the ramp producer is OPEN; the moment 0.13.0 publishes, kf's densify consumer lights AND its proof is ready. |
| **The ownership boundary** | VALUE / TIME | value.js owns VALUES (the perceptual color science — lerp, hue path, gamut map, ΔE oracle, the `sampleColorRamp` composition). kf owns TIME (the compile decision — how many stops, where in the keyframe timeline, the ship-vs-refuse gate). Lane D is ONLY the `sampleColorRamp` composition; NOT the color kernels (shipped 0.12.0, kf consumes RIPE) and NOT the compile driver (kf's `compile.ts`) (`K/L-SEED.md §7`). |
| **No `file:` / no vendored copy** | ALWAYS | The consume edge LIGHTS on the publish — NEVER a `file:` link to value.js's WIP tree, NEVER a vendored `sampleColorRamp` in kf. No cycle: value.js → kf (grammar); kf → glass-ui (spring); no back-edge (`cross-repo-dev-resolution.md`; GRAMMAR-FOLD §slot-into-N). |

### The post-N fallback (named, per P-Inv 28)

If N is judged too large to absorb lane D, the clean fallback is a tight library-only **post-N
Tranche O** (VJ.W1 + VJ.W2 + any VJ-ledger residue), dispatched the moment N's library track is free.
The kf consume edge is IDENTICAL either way — born-RED kf-side, lights on whichever cut publishes
(0.13.0/N.W11.D OR Tranche-O). The fold is the better constellation move (value.js + keyframes
advance together in the same beat, as they did at 0.12.0); the tranche is the fallback
(`EXECUTION-ORCHESTRATION.md §3` final ¶; GRAMMAR-FOLD §I.4).

---

## §Design-decisions — trade-offs RESOLVED

1. **Cusp re-anchor vs the §13.2 binary search vs the naive clip.** RESOLVED: cusp-anchored Ottosson
   with a tuned/L-adaptive α (lane A). The §13.2 binary search lands EVEN PALER (C=0.0281 vs the
   library's 0.0465 — both hold-L-and-H families) so it is NOT the policy answer; it is the test
   ORACLE (lane B) that bounds any anchor change against the spec. The naive clip is forbidden (it
   rotates hue +339°). The cusp anchor trades a bounded lightness reduction for substantially
   preserved chroma — the modern SOTA preference for UI color (Ottosson, Evil Martians, the Oklch
   tooling ecosystem) precisely because hold-L washout is visually disliked for the light-saturated
   case (L-COLOR §4). `findCusp` already exists (`gamut.ts:141`); only the anchor choice changes.

2. **One-constant α tune vs a strategy enum.** RESOLVED as an OPEN implementation choice the lane-A
   author makes — either suffices for the gate (the hard gate is the C ≥ ~0.12 outcome, not the
   mechanism). The α knob (`gamut.ts:238`) is a one-constant, fully-analytical, zero-iteration change;
   a strategy enum is cleaner if multiple anchors are wanted long-term. KISS argues the tuned/
   L-adaptive α unless a second consumer needs the enum (substrate-with-consumer).

3. **Egress: clamp parity vs a per-space policy.** RESOLVED: route every wide-gamut egress through
   the EXISTING `gamutMapToRgbSpace` (`dispatch.ts:301-306`) so the policy is uniform — `xyz2rgb`
   clamps, so must `xyz2displayP3`/etc. The asymmetry (sRGB clamps, P3 does not — SV-2) is the defect;
   the fix is parity, not a new per-space map (no legacy beside its replacement).

4. **OKLCh range: widen vs document-and-clamp.** RESOLVED as a SMALL choice (lane D-range) — either
   satisfies HG-Drange (no silent peg). Widening the display max is the honest move if the picker
   should SHOW the full chroma the library produces; document-and-clamp is acceptable if the slider's
   `[0,0.5]` is a deliberate UI convention. The binding constraint is "no silent peg," not which.

5. **Lane D folds INTO N.W11 (not a sibling, not post-N).** RESOLVED: `sampleColorRamp` reuses the
   EXACT kernels lanes A/B/C re-anchor (`gamutMapOKLab`, `deltaEOK`) — ~S-effort beside work already
   in flight, NOT a new color-science investment. Deferring it spins up a whole post-N tranche for one
   ~40-LoC sampler AND leaves kf-K.W10's densify edge dark a full tranche longer. The fold ships
   value.js + keyframes together in the same beat (GRAMMAR-FOLD §I.4). VJ.W1 (scroll grammar) does
   NOT fold here — different substrate (`parsing/`), so it is the sibling N.W11′.

6. **MEASURE-FIRST for lane D, not for lanes A/B/C.** RESOLVED: lane D makes a perf-shaped claim
   (the ramp reuses kernels at parity) so it carries a bench (HG-D2) — the bench IS the gate, no
   number asserted in advance. Lanes A/B/C/D-range are CORRECTNESS claims (the chroma outcome, the
   spec oracle, the egress gamut, the range) — they carry π / focused-test / probe evidence, not a
   bench (GRAMMAR-FOLD §I.1, §II.0).

7. **The library wave runs BEFORE its π is visible.** RESOLVED: W11's library lanes are
   demo-independent and provable by node probe + focused test (SV-1 through SV-5 are all pure-library
   commands TODAY). The π swatch re-render is the ONLY artefact gated behind N.W10.D's cascade kill —
   so W11 runs in R2's library track beside everything, and its π evidence captures once the desktop
   renders. The library correctness does not wait on the demo; only the visual confirmation does.
