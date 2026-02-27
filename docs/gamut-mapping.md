# Gamut Mapping: Ottosson's Analytical sRGB Algorithm

## Overview

value.js uses Bjorn Ottosson's analytical sRGB gamut mapping algorithm from
[ok_color.h](https://bottosson.github.io/posts/gamutclipping/) (MIT license).
This replaces the previous iterative XYZ chromaticity reduction approach.

**Key properties:**
- Deterministic: zero iteration—polynomial initial guess + one Halley's method step
- Perceptually correct: operates in OKLab, preserves hue exactly
- Fast: ~60-125x faster than CSS Color 4's binary search

## Why sRGB Boundary is Cubic in OKLab

The sRGB gamut boundary in OKLab is defined by the constraint that all three
linear sRGB channels lie in [0, 1]. The path from OKLab to linear sRGB is:

```
OKLab (L, a, b) → LMS_cubic (l', m', s') → LMS_linear (l'³, m'³, s'³) → linear sRGB
```

Each linear sRGB channel is a linear combination of the cubed LMS values:

```
r = w_l · l'³ + w_m · m'³ + w_s · s'³
```

where `l' = L + k_l·C`, `m' = L + k_m·C`, `s' = L + k_s·C` for a fixed hue
direction. The gamut boundary (where `r = 0` or `r = 1`) is therefore a **cubic
polynomial** in the saturation parameter S = C/L.

## Halley's Method

To find the exact zero of the cubic `f(S) = 0` (where one sRGB channel hits its
boundary), the algorithm uses one step of Halley's method:

```
S_{n+1} = S_n - f(S_n) · f'(S_n) / (f'(S_n)² - 0.5 · f(S_n) · f''(S_n))
```

Halley's method has **cubic convergence** (vs quadratic for Newton's), meaning
the initial polynomial approximation (which is already very close) converges to
machine precision in a single step.

## The Three Hue Sectors

The sRGB gamut boundary is piecewise—at any hue angle, exactly one of the
three sRGB channels (R, G, or B) is the "limiting" channel that hits 0 or 1
first. The algorithm determines which sector the hue falls in:

| Sector | Condition | Limiting channel |
|--------|-----------|-----------------|
| Red    | `-1.88170328·a - 0.80936493·b > 1` | Red |
| Green  | `1.81444104·a - 1.19445276·b > 1`  | Green |
| Blue   | (otherwise)                         | Blue |

Each sector has pre-computed polynomial coefficients (k0–k4) for the initial
saturation guess, and LMS→sRGB channel weights (wl, wm, ws) for the Halley step.

## The Triangle Approximation

For a fixed hue direction (a_, b_), the gamut boundary in the (L, C) plane is
approximately triangular:

```
        (L_cusp, C_cusp)
       /\
      /  \
     /    \
    /      \
(0,0)------(1,0)
```

The **cusp** is the point of maximum chroma. Below the cusp, the boundary is
roughly linear from (0, 0) to the cusp. Above, it's roughly linear from the
cusp to (1, 0).

`findGamutIntersection` uses this triangle for the lower half (closed-form)
and refines the upper half with one Halley step for precision.

## The Adaptive L0 Formula

The mapping projects out-of-gamut points toward an anchor `L0` on the lightness
axis (C = 0). The adaptive formula (Strategy 4) blends between:
- Pure chroma reduction (L0 = L, preserve lightness)
- Mid-gray anchor (L0 = 0.5, preserve saturation appearance)

```
L_d = L - 0.5
e1 = 0.5 + |L_d| + alpha · C
L0 = 0.5 + sign(L_d) · (e1 - sqrt(e1² - 2·|L_d|))
```

With `alpha = 0.05`, this provides a smooth blend. For low-chroma colors, L0 ≈ L
(mostly chroma reduction). For high-chroma colors, L0 shifts toward 0.5.

The final mapping along the ray from (L0, 0) to (L, C):

```
L_mapped = L0 · (1 - t) + t · L
C_mapped = t · C
```

where `t = findGamutIntersection(...)` is the intersection parameter.

## deltaE OK

The perceptual distance metric used is simple Euclidean distance in OKLab:

```
deltaE_OK = sqrt((L1-L2)² + (a1-a2)² + (b1-b2)²)
```

The just-noticeable difference (JND) threshold is approximately **0.02**.
This metric is used for quality verification, not in the mapping algorithm itself.

## References

- Ottosson, B. (2021). [Gamut clipping in an idealized setting](https://bottosson.github.io/posts/gamutclipping/)
- Ottosson, B. (2020). [A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/)
- CSS Color Level 4, Section 12. [Gamut Mapping](https://www.w3.org/TR/css-color-4/#gamut-mapping)
