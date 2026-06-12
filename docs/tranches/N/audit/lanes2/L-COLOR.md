# Lane L-COLOR — U10: "default pink in LAB → RGB is nothing close"

**Severity**: the highest-severity claim in the user audit (LEDGER U10, owner = **library**).
**Verdict**: **REPRODUCED — confirmed real**, but the defect is **not a conversion error**. The
matrices, the transfer functions, and the round-trip math are all CSS-Color-4-correct. The defect
is a **gamut-mapping policy** decision: the library's Ottosson analytical sRGB clip (α=0.05,
hold-L-and-H) **annihilates ~83% of the chroma** of the very-light, far-out-of-gamut default pink,
producing a washed-out swatch that bears no visible resemblance to what every browser renders the
same `lab()` as. This is a known, documented failure mode of constant-lightness gamut mapping for
light saturated colors. The fix is a **gamut-mapping-strategy change** (library wave), not a matrix
or a demo-quantization fix.

---

## 1 — REPRODUCTION (both live + pure library)

### The exact color
The demo's default color is hardcoded at `demo/@/components/custom/color-picker/index.ts:36`:

```
const DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)";
```

Confirmed live: the app boots to URL `…?space=lab&color=lab(92%25+88.80+20+/+82.70%25)` and the
picker hero reads `Lab 92%, 88.8, 20` (snapshot uid=4_4/4_8/4_11;
shot `shots/L-COLOR-01-default-lab.png`).

### Live app — switch Lab → RGB
Driven through the real space-selector UI (combobox uid=4_3 → option "RGB" uid=5_1). The picker
re-renders to:

```
RGB  255, 213.8, 218.8        (shot shots/L-COLOR-02-rgb-from-lab.png)
```
(channel inputs `r=255 g=213.8 b=218.8`, sliders `R=1 G=0.8386 B=0.8581`.)

### Pure library — `dist/value.js` (read-only, node v26)
The exact demo pipeline `parseCSSColor → normalizeColorUnit → colorUnit2(_, "rgb", …)`:

```
lab(92% 88.8 20 / 82.70%)
  parseCSSColor      → lab  l=92    a=88.8  b=20    alpha=82.7
  normalizeColorUnit → lab  l=0.92  a=0.8552 b=0.58 alpha=0.827   ([0,1] domain)
  colorUnit2→rgb     → rgb(255  213.85097861  218.82030325 / 82.7%)
```

**The live app and the pure library agree to the digit** (`255, 213.85, 218.82`). This rules out
any demo-side re-quantization, `stableHue`, or slider-rounding artifact: **the value the user sees
is exactly what the library computes.** It is a library result, full stop.

---

## 2 — DIFF AGAINST REFERENCES

`lab(92% 88.8 20)` is **massively out of the sRGB gamut**: its unclamped linear-sRGB red channel is
**2.58** (in-gamut max = 1.0). Every renderer must therefore *choose* a gamut-mapping strategy;
the divergence between them is the entire story.

| Path | sRGB result (0–255) | OKLab L | OKLab C | OKLab H° | dE_OK→orig | failure mode |
|---|---|---|---|---|---|---|
| **Original (out-of-gamut)** | — | 0.9583 | **0.2724** | 9.83 | 0 | (cannot be shown on sRGB) |
| **Library — Ottosson α=0.05** (live demo) | `255, 214, 219` | 0.9118 | **0.0464** | 9.83 | 0.231 | **chroma annihilated (-83%)** → washed out |
| **CSS Color 4 §13.2 chroma-reduction** (colorjs.io `"css"` default) | `255, 230, 235` | 0.9465 | 0.0281 | 3.98 | 0.245 | even paler; small hue drift |
| **Naive per-channel clip = browser canvas / `getComputedStyle`** | `255, 143, 200` | 0.7862 | 0.1495 | 349.25 | 0.223 | **L crushed (-18%), hue rotated +339°** (pink→magenta) |

References computed three independent ways and cross-checked:
- **Browser-native (Chrome, CSS-Color-4-compliant)**: a `<canvas>` `fillStyle='lab(92% 88.8 20)'`
  read back via `getImageData` returns **`[255, 143, 200]`** (= naive clip; Chrome clips for
  canvas/`getComputedStyle`). Evidence in-page (evaluate_script).
- **CSS Color 4 §13 sample code** (spec matrices, Bradford D50→D65, hand-coded): unclamped
  `rgb(385, 143, 200)` → naive-clamp `255, 143, 200`; §13.2 binary-search chroma-reduction with
  deltaE-OK JND = 0.02 → **`255, 230, 235`**.
- **culori/colorjs.io not installed**; their algorithm is the §13.2 path above
  (`colorjs.io` `toGamut({method:'css'})` is the §13.2 binary search — reproduced by hand and
  cross-checked against the spec sample code).

**Visual proof** (`shots/L-COLOR-03-candidate-swatches.png`): the four swatches rendered
side-by-side. The browser's `lab(92% 88.8 20)` (a vivid medium pink) and the naive-clip
`255,143,200` are **the same swatch**; the library's `255,214,219` is a near-white dusty pink —
manifestly "nothing close" to the vivid one. The user's intuition is correct *relative to the
browser-rendered baseline they implicitly compare against.*

---

## 3 — ROOT CAUSE

### Not the matrices, not the round-trip math
The Lab↔XYZ matrices, Bradford adaptation, and sRGB transfer all reproduce the CSS Color 4 sample
code to ~6 decimal places (the unclamped `385.30, 143.38, 199.64` linear-path matches the spec
exactly). **No conversion bug exists.**

### Not a demo re-quantization
`colorUnit2` (the demo's path, `src/units/color/normalize.ts:73`) calls `color2(…)` directly and
**never** invokes a separate gamut map; the clamp happens *inside* the converter:
`color2` for `*→rgb` routes lab through the XYZ hub to `xyz2rgb`
(`src/units/color/conversions/xyz-extended.ts:61`), whose default `correctGamut=true` calls
`gamutMap(new RGBColor(…))` at **`xyz-extended.ts:74`**. The OKLab/OKLCh/HSL direct paths gamut-map
identically (`directOklabToRgb` at `conversions/direct.ts:79`). So **every** path to sRGB applies
the same gamut map — there is no inconsistency, and the demo adds nothing.

### The actual defect: the Ottosson α=0.05 adaptive-L0 policy over-desaturates light colors
`gamutMap` (`dispatch.ts:269`) → `gamutMapSRGB` (`src/units/color/gamut.ts:305`) →
`gamutMapOKLab` (`gamut.ts:247`). The strategy (documented at the file head): **adaptive anchor
L0, α=0.05, hold hue exactly, project toward the achromatic axis** along a ray from `(L0, 0)`.

For a near-white source (L=0.958), the adaptive L0 (`gamut.ts:264-267`) sits very close to L, so the
ray to `(L, C)` is almost horizontal and the gamut boundary is hit at a **tiny chroma**: chroma
collapses 0.2724 → 0.0464 (a **83% reduction**, dE_OK = 0.231 = **11.5× the JND**). Lightness and
hue are held faithfully — which is *exactly per the algorithm's contract* — but at the perceptual
cost of nearly all colorfulness. This is the textbook criticism of constant-L, constant-H gamut
mapping for **light, saturated** colors: they wash toward white. The CSS §13.2 reference is no
better here (it lands even paler: C=0.0281) — both are "hold-L-and-H" families.

**So the policy is internally correct and even agrees with the CSS normative reference — but the
*default color itself* is pathological**: `lab(92% 88.8 20)` is a deliberately extreme,
far-out-of-gamut pink whose only faithful-chroma sRGB representation requires *lowering lightness*
(which the browser's naive clip does, at the cost of a +339° hue rotation that turns the pink
magenta). There is no sRGB color that is simultaneously L≈0.96, H≈10°, and chroma≈0.27 — the gamut
simply does not extend there.

### Secondary library defects surfaced while reproducing (book these too)
1. **Wide-gamut egress is NOT gamut-mapped via `colorUnit2`.** `lab→display-p3` yields
   `display-p3(1.402 0.628 0.791)` — **r > 1, out of P3's own gamut** — and `lab→rec2020` yields
   `rec2020(1.309 …)`. `gamutMap`'s wide-gamut branch (`dispatch.ts:301-306`,
   `gamutMapToRgbSpace`) exists but `xyz2displayP3`/`xyz2rec2020` (unlike `xyz2rgb`) have **no
   `correctGamut` clamp**, so the demo's `colorUnit2` path emits raw out-of-[0,1] P3/rec2020. The
   B4 work wired `convertColorSpaceDenorm`/`toAnimationString` (`index.ts:135-182`) but **not** the
   `colorUnit2` consumer the demo actually uses. Inconsistent egress policy.
2. **OKLCh chroma display overflow.** `lab→oklch` gives raw C=0.2724, which `normalizeColorUnit`
   scales against the oklch `c` range `[0, 0.5]` (`constants.ts:72`) to **0.5449 — past 1.0**. The
   default pink's chroma overflows the OKLCh slider's own declared maximum (the demo stores in
   OKLCh; the slider would peg). The lab `a/b` range `[-125,125]` and oklch `c` max `0.5` are not
   wide enough to hold this color without overflow.
3. **`inputColor` corruption on space-switch** (observed live, side-effect of an evaluate that
   wrote `localStorage`): the stored model serialized `inputColor` as
   `lab(0.370… 0.706… 0.616…)` — **normalized [0,1] values stamped into a raw `lab()` string**.
   This is a demo-side serialization bug (out of this lane's library scope, but it corrupts the
   URL/restore path and compounds the U10 perception). Flag to the demo lane.

---

## 4 — SOTA RESEARCH: what the correct behavior IS

**The framing of the problem (CSS Color 4 §13).** When a color is out of the destination gamut a UA
MUST gamut-map. §13.2 gives the **non-normative reference algorithm**: work in **OKLCh**, hold **L
and H**, **binary-search the largest chroma** whose clipped projection is within **1 JND (deltaE-OK
≈ 0.02)** of the reduced color. This is the family the library already implements (Ottosson is the
*analytical* form of the same hold-L-and-H idea). colorjs.io's **default & recommended** method is
this `"css"` path; `"clip"` is explicitly **"not recommended."**

**The crux for U10.** Both §13.2 and the library's Ottosson map are *correct* and *agree* that the
faithful-L answer is pale. The user's grievance is that **pale is the wrong tradeoff for a color
picker's headline swatch** — they expect the vivid pink the browser shows. The SOTA does not
mandate one tradeoff; it offers a **family of anchors**:

1. **Ottosson's own two strategies** (his `ok_color.h`, the library's cited source): besides the
   adaptive-L0 (α) clip the library uses, Ottosson documents **`gamut_clip_preserve_chroma`** and a
   **projection-toward-cusp** variant. Projecting toward the **cusp** (the max-chroma point of the
   hue leaf) rather than toward mid-grey **retains far more chroma** for light colors — it trades a
   little lightness for a lot of colorfulness, landing much nearer the browser's result without the
   hue rotation. `findCusp` is **already implemented** (`gamut.ts:141`); only the anchor choice
   changes.
2. **The α knob is the dial.** `GAMUT_ALPHA = 0.05` (`gamut.ts:238`) sets how hard the map pulls
   toward grey. A larger α (or an L-adaptive α that relaxes for L→1) preserves chroma for light
   colors. This is a one-constant, fully-analytical, zero-iteration change.
3. **Cusp-anchored / "chroma-preserving" clip** is the modern SOTA preference for UI color
   (Ottosson, Evil Martians, the Oklch tooling ecosystem) precisely because hold-L washout is
   visually disliked for exactly this light-saturated case.

**What the correct behavior IS for U10's pink**: a gamut map that **holds hue (10°, mandatory — the
naive clip's +339° magenta rotation is the one truly-wrong answer and is forbidden)**, and trades a
modest lightness reduction for substantially preserved chroma — landing visually between the
library's `255,214,219` (too pale) and the browser's `255,143,200` (hue-broken). Cusp-anchored
Ottosson with a tuned α delivers exactly this, analytically and deterministically.

---

## 5 — DEFECT STATEMENT + SOTA-BACKED FIX DESIGN (library wave material)

### Defect statement
> The library converts the demo's default `lab(92% 88.8 20)` to `rgb(255, 213.85, 218.82)` — a
> near-white pink — because its sRGB gamut map (Ottosson adaptive-L0, α=0.05, hold-L-and-H,
> `src/units/color/gamut.ts`) annihilates 83% of the color's chroma (0.2724→0.0464, dE-OK = 11.5×
> JND) to hold lightness exactly for a far-out-of-gamut light color. The conversion math is
> CSS-Color-4-correct; the **gamut-mapping policy** is the defect. The map is the only path to sRGB
> (`xyz2rgb` `correctGamut=true`, `xyz-extended.ts:74`; all direct paths likewise), so the demo
> faithfully shows the library's pale result.

### Fix design (library wave; NO code edited in this lane)
1. **Re-anchor the Ottosson clip toward the cusp** for high-lightness colors (or expose the anchor
   as a strategy enum), using the already-present `findCusp` (`gamut.ts:141`). Preserve hue
   exactly; trade a bounded lightness reduction for chroma. Target: the default pink lands with
   OKLab C ≥ ~0.12 (vs 0.046 today) — visibly pink, not white.
2. **Promote `GAMUT_ALPHA` (`gamut.ts:238`) to a tuned / L-adaptive value** so light colors relax
   toward chroma preservation. One-constant analytical change; zero new iteration.
3. **Add the §13.2 binary-search OKLCh map as the *reference oracle*** in tests (deltaE-OK ≤ 0.02
   acceptance) so any anchor change is measured against the spec, and pin a regression corpus of
   far-OOG light pinks/yellows/cyans (the historically-washed hues).
4. **Close the wide-gamut egress hole**: give `xyz2displayP3`/`xyz2rec2020`/`xyz2adobeRgb`/… a
   `correctGamut` clamp parity with `xyz2rgb`, routed through `gamutMap(color, <space>)`
   (`dispatch.ts:301-306` already implements the per-space numeric reduction) so `colorUnit2`'s
   wide-gamut output is in-gamut for the egress space, not raw r>1.
5. **Reconcile the OKLCh chroma display range** (`constants.ts:72`, `c` max `0.5`) — the default
   pink overflows it (normalized 0.545). Either widen the display max or document that the picker
   shows OOG chroma clamped; the demo's OKLCh slider must not peg silently.
6. **(Demo follow-up, flag out of lane)** the `inputColor` normalized-value-stamped-as-raw-`lab()`
   corruption on space-switch; and consider seeding the demo with a **default color that is in or
   near the sRGB gamut** so the headline swatch is not a pathological OOG pink (the cheapest
   user-visible win, independent of the gamut-map work).

### Recommended wave placement
- The gamut-map re-anchor + the §13.2 test oracle + the wide-gamut egress clamp are **library
  asks** — fold into **N.W7** (the library wave; 0.12.0 already cut, so this is a 0.12.x/0.13.0
  follow-slice) or a dedicated **"gamut-map SOTA" sub-wave**. They are unilateral, analytical, and
  carry a clean before/after π (the swatch chroma).
- The default-color reseed + `inputColor` serialization fix are **demo asks** (N.W6 design /
  bug-fix lane).

---

## Evidence index
- `shots/L-COLOR-01-default-lab.png` — live default, Lab tab, `92%, 88.8, 20`.
- `shots/L-COLOR-02-rgb-from-lab.png` — after Lab→RGB switch: `255, 213.8, 218.8` (= library).
- `shots/L-COLOR-03-candidate-swatches.png` — 4-way swatch comparison (browser-vivid vs
  library-pale vs §13.2 vs naive-clip), with the live picker showing `255, 213.8, 218.8` below.
- Reproduction scripts (throwaway, `/tmp`, no repo edits): `u10-repro2.mjs` (demo pipeline),
  `css-ref.mjs` (CSS §13 sample code), `css-13-2.mjs` (§13.2 chroma-reduction),
  `deltae-compare.mjs` / `jnd-check.mjs` (perceptual diffs), `roundtrip.mjs` (lossy round-trip +
  per-space table).
- Source sites: `index.ts:36` (default), `normalize.ts:73-110` (`colorUnit2`, no separate map),
  `xyz-extended.ts:61-79` (`xyz2rgb` `correctGamut`), `dispatch.ts:269-307` (`gamutMap`),
  `gamut.ts:238/247/264-277/305` (Ottosson α=0.05 adaptive-L0), `constants.ts:52-75` (lab/oklch
  ranges).

Sources (SOTA): [Color.js gamut mapping](https://colorjs.io/docs/gamut-mapping) ·
[CSS Color 4 §13 gamut mapping (W3C)](https://www.w3.org/TR/css-color-4/#gamut-mapping) ·
[Ottosson — gamut clipping](https://bottosson.github.io/posts/gamutclipping/) ·
[color-js/apps gamut-mapping methods.js](https://github.com/color-js/apps/blob/2c7346dd00855f7b82eb4c7527355a09b84beeb3/gamut-mapping/methods.js) ·
[OKLCH in CSS — Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl).
