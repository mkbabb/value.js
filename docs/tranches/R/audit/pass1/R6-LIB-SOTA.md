# Lane R6-LIB-SOTA — post-Q SOTA gap list for the value.js library (color + parsing)

**Date**: 2026-07-02 · **Branch**: `tranche-q` (v1.2.0 published) · **Scope**: READ-ONLY tranche development.
**Charge**: establish the post-Q state-of-the-art gap list for the library core (`src/units/color/` + `src/parsing/`), settle whether O/P/Q discharged the U10 GAMUT POLICY defect, and rank candidate items for Tranche R vs later letters.

---

## 0 — Headline

**The single highest-severity, still-LIVE library defect is U10 — and O/P/Q did NOT discharge it.** They fixed
only the *allocation profile* of the gamut path (`color2Into` zero-alloc, P.1.1.0). The **gamut POLICY**
that L-COLOR proved annihilates ~83 % of the chroma of light out-of-gamut colors (the "default pink → nothing
close" grievance) is **byte-for-byte unchanged** since it was first authored (`c89b41d`). The N.W11 wave that
was *designed* to re-anchor the policy was ratified but its policy lane was **never implemented** — only the
`sampleColorRamp` grammar fold (N.W11.D) and the scroll-timeline grammar (N.W11′) shipped to 0.13.0.

Everything else is genuine but lower-severity SOTA catch-up (new perceptual spaces, HDR spaces, raytrace gamut
map, CSS Values-5 functions). U10 is the one item that is both **owned solely by value.js** (the pure sink — no
sibling repo can fix it) and **already reproduced + measured** by a prior audit. It belongs at the head of R.

---

## 1 — U10 verdict: LIVE. What O/P/Q actually did (and did not do).

**The grievance** (`docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md:86`, row U10, owner = **library**,
"highest-severity claim in the audit"): *"Color conversion 'quantization' awful: default pink in LAB → RGB is
'nothing close' — needs SOTA refinement and research."*

**Prior diagnosis** (`docs/tranches/N/audit/lanes2/L-COLOR.md:1-9`, corroborated `N/waves/N.W11.md:78-106`):
REPRODUCED, confirmed real, **not a conversion error** — the matrices/transfer-functions/round-trip are all
CSS-Color-4-correct. It is a **gamut-mapping policy** decision: the Ottosson analytical sRGB clip (α = 0.05,
hold-L-and-H) **annihilates ~82.9 % of the chroma** of the very-light far-OOG default pink, ΔE-OK = 0.2307 =
**11.5× the JND** — a washed-out `255,214,219` swatch that bears no visible resemblance to the vivid pink every
browser renders the same `lab()` as (`255,143,200`). The naive clip's alternative (+339° magenta hue rotation)
is the one truly-wrong answer and is forbidden.

**What the tree shows TODAY** (verified this pass):

- `src/units/color/gamut.ts:242` — `const GAMUT_ALPHA = 0.05;` — **the exact α L-COLOR flagged, unchanged.**
- `gamutMapOKLab` (`gamut.ts:251-281`) — still the adaptive-L0 hold-hue strategy verbatim.
- `git log -- src/units/color/gamut.ts` shows only **two** commits: `c89b41d` (original Ottosson add) and
  `23d1a91` (Tranche P — *"color2Into gamut zero-alloc"*). **P touched allocations, not policy.**
- O.W6.md:270 explicitly scopes the O.W3 perf lane: *"No change to the gamut policy, the sRGB analytical path,
  or the wide-gamut clamp."* — O deliberately left the policy alone.
- `grep U10 docs/tranches/{O,P,Q}` → **zero hits.** U10 was never carried into an O/P/Q wave.
- N.W11's remedy shipped only its `.D`/`′` sub-lanes: `9fce504` = *"0.13.0 — the kf-K-dispatched grammar fold
  (N.W11.D sampleColorRamp + N.W11′ the scroll-timeline grammar)"*. The **A/B policy re-anchor lanes**
  (`N.W11.md:310` — "gamut POLICY re-anchor toward the cusp + the §13.2 spec oracle") **never landed.**

**Conclusion**: **U10 GAMUT POLICY defect is fully LIVE.** The allocation work of P is orthogonal to it. This is
the load-bearing R candidate.

---

## 2 — The gamut-mapping SOTA (what "correct" is, 2026)

Three families are current; value.js implements a *fourth* variant that sits outside all three:

| Method | What it does | Who ships it | vs value.js |
|---|---|---|---|
| **CSS Color 4 MINDE** (ratified) | OKLCh chroma reduction by **binary search**, hold L+H, break when ΔE-OK to the clipped form ≤ JND (`w3.org/TR/css-color-4` §13.2) | colorjs `"css"` (default), culori `toGamut()` | value.js sRGB path does NOT use this; wide-gamut path (`dispatch.ts:371 gamutMapToRgbSpace`) DOES bisect |
| **Ottosson analytical** (adaptive-L0, α) | closed-form + one Halley step, trades L for chroma toward an anchor; zero-iteration (`bottosson.github.io/posts/gamutclipping`) | value.js `gamut.ts` (α=0.05) | **this is value.js's sRGB path** — the U10 culprit at α=0.05 |
| **Raytrace to gamut boundary** (NEW, 2026) | traces a ray to the RGB-cube boundary instead of binary-searching — general to any gamut, faster than MINDE, preserves more chroma | **colorjs 0.7.0-alpha.1** (`"raytrace"`) | value.js has no general N-gamut raytrace; its wide-gamut path bisects |
| **Gamut-relative spaces** (NEW, 2026) | reparameterize so **c = 1 = the most-colorful in-gamut color** at a given L,H — OOG becomes structurally impossible | **colorjs 0.7.0-alpha.2** (`oklch-srgb`, `oklch-p3`, `lch-srgb`, …) | value.js has none |

**The U10-correct behavior** (from L-COLOR §4, `N/waves/N.W11.md:170-174`): hold hue exactly (10°, mandatory),
trade a **modest** lightness reduction for **substantially preserved chroma** — land between the too-pale
`255,214,219` and the hue-broken `255,143,200`. Cusp-anchored Ottosson with a **tuned α** delivers this
analytically and deterministically; equivalently, the colorjs `raytrace` method or a switch of the sRGB path to
the MINDE bisection that the wide-gamut path already uses. The remedy is a **policy tune + an oracle test**, not
a rewrite — L-COLOR already located the α knob and the browser reference values.

CSS WG status: the MINDE algorithm remains the ratified spec; open issues (`w3c/csswg-drafts#7135` banding,
`#7653` clarifications) are refinements, not a replacement. **No 2026 CSS WG resolution supersedes MINDE** — the
raytrace/gamut-relative work is library-side (colorjs), not normative. So value.js is free to pick the tradeoff.

---

## 3 — Competitive frontier: what colorjs.io / culori parse & convert that value.js cannot

value.js today: **15 color spaces** (`index.ts`, 15 `extends Color`), XYZ-D65 hub, Bradford CAT, CSS Color 4/5
parsing incl. `color-mix()`, relative color syntax (rgb/hsl/hwb/lab/lch/oklab/oklch/xyz), `contrast-color()`
(VJ-Q1), `light-dark()`, `currentColor`. Grammars in `parsing/grammars/`.

**colorjs.io** (latest stable **0.6.1**, 2026-01-15; 0.7.0-alpha in flight — editors of the CSS Color specs):

- **Spaces value.js lacks**: Jzazbz / JzCzHz, ICtCp, CAM16 (JMh), **HCT** (Material Design 3), Luv / LCHuv,
  HSLuv / HPLuv, **OKHSL / OKHSV** (0.6.0), OkLrab / OkLrCh, Linear Rec2100, **rec2100-pq / rec2100-hlg** (HDR),
  and the new **gamut-relative** oklch-srgb/-p3/-rec2020 family (0.7.0-alpha.2).
- **DeltaE**: 76, CMC, 2000, **Jz**, **ITP**, OK, OK2 — value.js has only Euclidean ΔE-OK (`gamut.ts:57`).
- **CAT**: von Kries, Bradford, CAT02, CAT16 — value.js has Bradford only.
- **Gamut**: MINDE `"css"`, `"clip"`, custom-coordinate, `"raytrace"` (0.7.0-alpha.1).
- **Parsing**: `Color.try()` graceful-fail + reserialize in original format.

**culori** (latest **4.0.2**; used by Tailwind v4 + Radix): ΔE-ITP `differenceItp()`, `inGamut`/`clampGamut`/
`toGamut()`, tree-shakeable, broad CSS Color 4 space coverage. Fewer exotic spaces than colorjs but the
industry default for design-system palette generation.

**Where value.js LEADS** (do not regress): zero-iteration analytical gamut map (unique — everyone else
bisects/raytraces), `color2Into` zero-alloc egress (P), the `ValueUnit`/`FunctionValue` CSS-value AST (neither
colorjs nor culori model the full CSS value grammar — they are color-only), SPSA CSS-`filter` solver
(`colorFilter.ts`), OKLab-native image quantization (`quantize/`), `contrast-color()` eager eval matching the
Baseline-April-2026 spec + WPT tie-break (`contrast.ts:89`).

---

## 4 — CSS spec frontier (mid-2026) relevant to the parser

| Feature | Spec | Status mid-2026 | value.js gap |
|---|---|---|---|
| `contrast-color()` | Color 5 (L7) | **Baseline newly-available Apr 2026** (Chrome 147/FF 146/Safari 26) | **SHIPPED** (VJ-Q1) ✓ |
| `light-dark()` | Color 5 | Baseline | **SHIPPED** ✓ |
| Relative color syntax | Color 5 | Baseline | **SHIPPED** ✓ (8 spaces) |
| `color-mix()` | Color 5 | Baseline | **SHIPPED** ✓ |
| **HDR** `color(rec2100-pq / -hlg)` | **Color-HDR L1** (`w3.org/TR/css-color-hdr-1`) | Draft; `dynamic-range-limit` prop landing | **GAP** — no PQ/HLG transfer or spaces |
| **`if()`** | Values 5 | NOT Baseline; ~mid/late-2026 | GAP — parser has no `if()` node |
| **`random()`** | Values 5 | NOT Baseline; experimental | GAP — no `random()` node |
| **`sibling-index()` / `sibling-count()`** | Values 5 | NOT Baseline | GAP — tree-counting (DOM-dependent; low library value) |
| device-cmyk / ICC `color()` profiles | Color 5 | niche | GAP (low priority) |

`src/parsing/` already carries `calc()`/`min`/`max`/`clamp`/trig/`round`/`mod`/`rem` (`parsing/math.ts`),
`var()`, gradients, transforms, `scroll-timeline.ts`, `syntax.ts`. The Values-5 `if()`/`random()` are the
natural next parser frontier once they approach Baseline.

---

## 5 — Candidate items, ranked

| # | Item | Evidence | Effort | Placement |
|---|---|---|---|---|
| **R-1** | **U10 gamut-policy re-anchor** — tune α toward cusp-anchored (or adopt raytrace / switch sRGB path to the MINDE bisection the wide-gamut path already runs) so light OOG colors keep visible chroma; hold hue exactly; add a §13.2 spec-oracle test vs browser reference values | `gamut.ts:242` (α=0.05 unchanged); L-COLOR.md §2/§4; N.W11.md:170-174,310; LEDGER U10 | **M** (policy knob + oracle suite; L-COLOR already found the α + reference values) | **Tranche R — head. The one library defect that is LIVE, sole-owned, reproduced, and highest-severity.** |
| **R-2** | **OKHSL / OKHSV spaces** — perceptual HSL/HSV that fixes the documented "HSV hue drift at low chroma" (MEMORY: `oklch→HSV roundtrip loses hue`); Ottosson-native, aligns with existing OKLab infra | colorjs 0.6.0; MEMORY HSV-drift note; `bottosson.github.io/posts/colorpicker` | **M** (2 spaces, closed-form, reuse `computeMaxSaturation`) | **Tranche R** — cheap, high demo value (color picker), leverages gamut.ts cusp math already present |
| **R-3** | **ΔE-2000 + ΔE-ITP** — value.js has only Euclidean ΔE-OK; SOTA quantization/dedup and gamut-JND checks want ΔE-2000 (perceptual) and ΔE-ITP (HDR-ready) | colorjs (76/CMC/2000/Jz/ITP); culori `differenceItp` | **M** (pure functions, no space plumbing) | **Tranche R** — small, unblocks better quantize dedup |
| **R-4** | **Raytrace-to-boundary gamut method** — general N-gamut map (P3/Rec2020), faster than bisection, more chroma than MINDE; would replace the wide-gamut bisection in `gamutMapToRgbSpace` | colorjs 0.7.0-alpha.1 `"raytrace"` | **L** (new algorithm; 3D cube-ray intersection) | **Later letter** (S+) — depends on R-1 settling the sRGB policy first |
| **R-5** | **HDR spaces `rec2100-pq` / `rec2100-hlg`** + PQ/HLG transfer functions | `w3.org/TR/css-color-hdr-1`; colorjs Linear Rec2100 | **L** (transfer functions + 2 spaces; niche until display support) | **Later letter** — spec still Draft, low current demand |
| **R-6** | **Jzazbz / JzCzHz + ICtCp** — HDR-aware perceptual spaces used by pro tooling | colorjs 0.6.1; culori | **M-L** | **Later letter** — after ΔE-ITP (R-3) which shares the ICtCp math |
| **R-7** | **HCT (Material 3) / CAM16** — dynamic-theming space | colorjs 0.5.0 | **L** (CAM16 appearance model is heavy) | **Later letter** — large surface, unclear demo need |
| **R-8** | **Gamut-relative spaces** (`oklch-srgb`, c=1 = most-colorful-in-gamut) — makes OOG structurally impossible; elegant answer to the whole U10 class | colorjs 0.7.0-alpha.2 | **M-L** | **Later letter** — evaluate as the *gestalt* alternative to R-1's α-tune; may subsume it |
| **R-9** | **`Color.try()` graceful parse + original-format reserialize** — non-throwing parse variant | colorjs 0.6.0 | **S** | **Tranche R** (small) — but check demand; parser currently throws |
| **R-10** | **CSS Values-5 `if()` / `random()` parser nodes** | Values 5; MDN; not-yet-Baseline | **M** | **Later letter** — gate on Baseline approach (~late 2026); DOM-dependent, weak library fit |

**Do-NOT (out of scope / low value)**: `sibling-index()`/`sibling-count()` (DOM-layout, not a color/value-math
concern), device-cmyk (niche, no perceptual model), ICC profile `color()` (heavy, no demand).

---

## 6 — Recommended Tranche-R library slate

Head R with **R-1 (U10 gamut policy)** — it is the only item that is simultaneously LIVE, highest-severity,
sole-owned by value.js, and pre-reproduced with the fix location (α knob) and browser oracle already found by
L-COLOR. Pair it with **R-2 (OKHSL/OKHSV)** and **R-3 (ΔE-2000/ΔE-ITP)** as the cheap, high-leverage
perceptual-space + metric catch-up that reuses the OKLab/cusp infrastructure already in `gamut.ts`. Defer the
heavier space families (raytrace, HDR, Jzazbz, HCT, gamut-relative) to S+, with **R-8 gamut-relative** flagged
as the possible *gestalt* replacement for R-1's tune worth a design spike before committing to α-tuning.

---

## Sources

- [CSS Color 5 — W3C](https://www.w3.org/TR/css-color-5/) · [contrast-color() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color) · [Smashing: self-correcting color systems (2026-05)](https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/)
- [CSS Color 4 — W3C §13](https://www.w3.org/TR/css-color-4/) · [colorjs gamut mapping](https://colorjs.io/docs/gamut-mapping) · [csswg-drafts#7135](https://github.com/w3c/csswg-drafts/issues/7135) · [#7653](https://github.com/w3c/csswg-drafts/issues/7653)
- [colorjs releases](https://github.com/color-js/color.js/releases) · [colorjs spaces](https://colorjs.io/docs/spaces) · [culori](https://github.com/evercoder/culori) · [culori vs chroma-js 2026](https://www.pkgpulse.com/blog/culori-vs-chroma-js-vs-tinycolor2-color-manipulation-javascript-2026)
- [CSS Values 5 — W3C](https://www.w3.org/TR/css-values-5/) · [if() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if) · [random() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random) · [sibling-index() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index)
- [CSS Color HDR L1 — W3C](https://www.w3.org/TR/css-color-hdr-1/) · [Ottosson gamut clipping](https://bottosson.github.io/posts/gamutclipping/)
- Tree/tranche evidence: `src/units/color/gamut.ts:242`, `dispatch.ts:371`, `contrast.ts:89`; `docs/tranches/N/audit/lanes2/L-COLOR.md`; `docs/tranches/N/waves/N.W11.md:78-174,310`; `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md:86`; `docs/tranches/O/waves/O.W6.md:270`; `docs/tranches/O/PROGRESS.md:8`; commit `23d1a91` (P), `9fce504` (N.W11.D).
