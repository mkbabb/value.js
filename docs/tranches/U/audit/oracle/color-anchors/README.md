# U.W-ORACLE · COLOR-ANCHORS lane — external-vector anchors + Sharma completion

**Lane**: U-F72 (`test-ground-truth-circularity`) + U-F73 (`test-ground-truth-incomplete`)
**Gates**: G-ORACLE-6 (rgb2xyz / xyz2lab / xyz2oklab external anchors) + G-ORACLE-7 (Sharma
table completed).
**Disposition**: both **build (born-GREEN coverage)** — landed, PASS ON WRITE.
**Owned files**:
- `test/units/color/conversions/color-external-anchors.test.ts` (NEW — U-F72)
- `test/units/color/color-difference.test.ts` (SHARMA table 14 → 34 — U-F73)

---

## The BORN-GREEN attestation (the spine of this lane — recorded ON THE RECORD)

Both gates are authored **born-GREEN**, and they are born-GREEN **because no defect exists to
flip**. The numeric color core is proven SOUND (registry §19 U-F60: sRGB→XYZ matches the CSS
Color 4 matrix to ≤ 1.11e-16; sRGB→OKLab to ≤ 1e-6; the impl already passes the omitted Sharma
pairs). These land as ADDED COVERAGE against the class the round-trip suite is blind to — an
error present in BOTH the forward and inverse transform cancels in a round-trip and passes; an
external-vector, forward-only anchor catches it.

Authoring a born-RED over this sound code would be a **FABRICATED red** — the mirror-image of
the O-14 proxy-green-over-a-wreck sin this wave exists to outlaw (a gate lying about a defect
that isn't there). Per the born-RED honesty law: a gate is born-RED **iff** it guards a LIVE
defect AND is headless-verifiable; G-ORACLE-6/7 do not qualify (the code is sound), so they are
born-GREEN. **All anchors PASSED on the first run.** No anchor failed on write; no tolerance was
tuned; no subset was chosen to pass. Had any anchor failed on write, the mandate was to STOP and
report a discovered defect — that did not occur.

Verification command (all PASS):
```
npx vitest run test/units/color/color-difference.test.ts \
  test/units/color/conversions/color-external-anchors.test.ts \
  test/units/color/conversions/color-conversions.test.ts
→ Test Files 3 passed (3) · Tests 129 passed (129)
```

---

## U-F72 — external-vector anchors (G-ORACLE-6)

**Before**: rgb2xyz had only a weak external anchor (white Y≈1 + black=0, 2 coarse points,
`color-conversions.test.ts:364`); xyz2lab and xyz2oklab had **ZERO** external-vector anchor —
their only test uses were the round-trip describes (`color-conversions.test.ts:382`/`:447`).
**After**: 3 published-reference, non-round-trip anchor describes (9 `it` cases) — one per
transform, each against an INDEPENDENT implementation's published goldens.

### rgb2xyz — sRGB → CIE XYZ (D65), vs culori `xyz65` goldens

Source: culori (github.com/Evercoder/culori) `test/xyz65.test.js`. culori uses the CSS Color 4
sRGB→XYZ-D65 matrix.

| sRGB in | published XYZ-D65 (culori golden) | measured max abs err |
|---|---|---|
| white (1,1,1) | `0.9504559270516715, 0.9999999999999999, 1.0890577507598784` | 2.2e-16 |
| red (1,0,0) | `0.4123907992659593, 0.2126390058715102, 0.0193308187155918` | 8.3e-17 |
| **(0, 0.8, 0)** `#00cc00` | `0.21591920006651102, 0.43183840013302205, 0.071973066688837` | 1.4e-17 |

The `(0, 0.8, 0)` case (0xcc/255 = 0.8 exactly) **exercises the sRGB transfer function** — 0.8 is
neither 0 nor 1, so this is not a matrix-column check; it certifies the gamma-decode leg too.
Tolerance: `toBeCloseTo(_, 10)` (bit-exact agreement with an independent implementation).

### xyz2lab — CIE XYZ (D65) → CIE Lab (D50 white), vs culori `lab` goldens

Source: culori `test/lab.test.js`. culori's `lab` is D50 (CSS Color 4); the impl adapts the D65
input to D50 via Bradford, matching. INPUT XYZ vectors are culori's own `xyz65` goldens for the
same colors (input + expected output share one external authority; non-circular — culori is an
independent implementation). The impl output is denormalized from the library's internal [0,1]
convention to physical Lab before comparison (`L*=l·100`, `a*=a·250−125`, `b*=b·250−125`).

| XYZ-D65 in | published Lab-D50 (culori golden) | measured max abs err |
|---|---|---|
| white `0.95045…, 0.99999…, 1.08905…` | `L*=100.00000139649632, a*=0, b*=0` | 1.4e-6 |
| red `0.41239…, 0.21263…, 0.01933…` | `L*=54.29054294696968, a*=80.80492033462417, b*=69.89098825896278` | 2.3e-5 |

Tolerance: `toBeCloseTo(_, 3)` (5e-4 threshold; measured cross-impl divergence ≤ 2.3e-5).

### xyz2oklab — CIE XYZ (D65) → OKLab, vs Ottosson reference triples

Source: Björn Ottosson's own published OKLab test vectors (bottosson.github.io/posts/oklab/,
"computed by transforming the XYZ coordinates to Oklab and rounding to three decimals"). THE
canonical external OKLab reference. Denormalized: `L=l` (native [0,1]), `a=a·0.8−0.4`,
`b=b·0.8−0.4`.

| XYZ in | published OKLab (Ottosson) | measured max abs err |
|---|---|---|
| (0.95, 1.0, 1.089) | `1.000, 0.000, 0.000` | 2.4e-4 |
| (1.0, 0.0, 0.0) | `0.450, 1.236, -0.019` | 2.4e-4 |
| (0.0, 1.0, 0.0) | `0.922, -0.671, 0.263` | 4.0e-4 |
| (0.0, 0.0, 1.0) | `0.153, -1.415, -0.449` | 4.0e-4 |

Tolerance: explicit `|actual − expected| ≤ 1e-3`. Ottosson's values are published to 3 decimals
(±5e-4 inherent rounding uncertainty); 1e-3 gives one ULP of headroom over the reference's own
rounding while staying ~10× tighter than any real matrix/coefficient error would produce.

**G-ORACLE-6 DELTA**: rgb2xyz/xyz2lab/xyz2oklab external-vector anchors — **before: 0 real
(weak white+black only) → after: 3 published-reference anchors (9 cases)**. Born-GREEN.

---

## U-F73 — Sharma CIEDE2000 table completed (G-ORACLE-7)

Source: Sharma, Wu & Dalal, "The CIEDE2000 color-difference formula: implementation notes,
supplementary test data, and mathematical observations" (Color Research & Application 30(1),
2005) — the 34-pair supplementary certification dataset. Transcribed EXACTLY (the authors'
published data, mirrored verbatim in the widely-used `gfiumara/CIEDE2000` reference suite whose
README shows all 34 passing; the Rochester primary host `www2.ece.rochester.edu` is HTTP-only and
was unreachable, so the byte-identical mirror was used).

**Before**: 14 of 34 pairs — the subset {1,2,3,4,7,9,11,25,26,28,29,30,31,34}.
**After**: all **34** pairs (Sharma's canonical ordering), same `toBeCloseTo(_, 3)` (1e-3)
tolerance.

The 20 added pairs and the classes they certify (the classes a round-trip / a 14-subset cannot
see):
- **large-ΔE regime** #17–20 (ΔE 27.15 / 22.90 / 31.90 / 19.45) — drive the rotation term at
  extremes / cross-quadrant hue.
- **achromatic-transition / near-neutral sign flips** #5,6,8,10,12,13,14,15,16,21,22,23,24 — the
  CIEDE2000 discontinuities (the a*/b* micro-sign pairs at ΔE≈1, the 0.0009/0.0010/0.0011/0.0012
  edge-of-discontinuity quartets, the hue-wraparound near neutral).
- **completeness fill** #27,32,33 — mid-lightness chromatic + near-white/near-black pairs.

Measured max error across all 34: **≈ 4.95e-5** (worst pair #23), well under the 5e-4 threshold.

**G-ORACLE-7 DELTA**: SHARMA pairs — **before: 14/34 → after: 34/34** (includes the
registry-named large-ΔE #17–20 + the achromatic-transition set). Born-GREEN — the impl already
passes them.

---

## Sources

- culori (independent implementation) — `test/xyz65.test.js`, `test/lab.test.js`:
  github.com/Evercoder/culori
- Björn Ottosson, "A perceptual color space for image processing" (OKLab):
  https://bottosson.github.io/posts/oklab/
- Sharma, Wu & Dalal (2005), CIEDE2000 supplementary test data (34 pairs):
  https://www.ece.rochester.edu/~gsharma/ciede2000/ (mirror: github.com/gfiumara/CIEDE2000)
