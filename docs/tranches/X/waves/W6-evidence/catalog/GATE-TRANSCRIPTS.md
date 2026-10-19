SERVED MODEL: claude-opus-5[1m]

# X.W6.f — X:CSS-1 gate transcripts (f1–f10)

Every command below is the one `W6.md` §5 names for its gate, run at this seat on
**2026-09-19** against branch `tranche-u`, installed `@mkbabb/glass-ui@7.0.0`, and the
smoke cell (chromium, 1280x720). BEFORE readings are this seat's own re-measurement
at open (D-19), not figures carried from the adjudication.

## f1 — catalog totality

```
$ node docs/tranches/X/gates/gate-catalog-totality.mjs
GATE f1 (catalog totality) — GREEN
  offered=18  catalogued=18  info=18  docs=11 authored + 7 decided-none = 18 decided
  failing input "display-p3": created=2015 (RGB's is 1931)
exit 0
```

## f5 — one grammar per row; CSS rows round-trip the shipped parser

```
$ node docs/tranches/X/gates/gate-specimen-grammar.mjs
GATE f5 (specimen grammar) — GREEN
  65610 specimens over 18 spaces; css=14 channels=4
  longest 50/52 chars — prophoto-rgb: color(prophoto-rgb -0.1672 0.1012 -0.1676 / 12.7%)
  rgb           css       32ch  rgb(-87.76 48.65 -7.339 / 12.7%)
  hsl           css       37ch  hsl(92.96deg -205.8% -11.09% / 12.7%)
  hsv           channels  29ch  hsv · 280.8 · 0.8893 · 0.3014
  hwb           css       38ch  hwb(0.1443deg -13.21% -17.52% / 12.7%)
  lab           css       32ch  lab(12.5% -93.75 -93.75 / 12.7%)
  lch           css       33ch  lch(12.5% 156.3 216.9deg / 12.7%)
  oklab         css       37ch  oklab(-10.44% -0.4849 0.0401 / 12.7%)
  oklch         css       38ch  oklch(-10.44% 0.4865 175.3deg / 12.7%)
  xyz           css       42ch  color(xyz -0.0327 -0.0002 -0.0665 / 12.7%)
  kelvin        channels  14ch  kelvin · 40000
  srgb-linear   css       49ch  color(srgb-linear -0.0889 0.0297 -0.0255 / 12.7%)
  display-p3    css       48ch  color(display-p3 -0.3024 0.1759 -0.0193 / 12.7%)
  a98-rgb       css       45ch  color(a98-rgb -0.2677 0.2022 -0.1807 / 12.7%)
  prophoto-rgb  css       50ch  color(prophoto-rgb -0.1672 0.1012 -0.1676 / 12.7%)
  rec2020       css       45ch  color(rec2020 -0.2894 0.2005 -0.0543 / 12.7%)
  ictcp         channels  34ch  ictcp · 0.0953 · -0.0454 · -0.8545
  jzazbz        channels  35ch  jzazbz · 0.0208 · -0.2585 · -0.1754
  hex           css        9ch  #003abe00
exit 0
```

## f2 — no masking fallback survives (HONEST-RED, one hit out of bounds)

```
$ test "$(grep -rn 'colorSpaceInfo\.rgb|(colorSpaceInfo as any)' demo | wc -l | tr -d ' ')" = 0
BEFORE  2   demo/scenes/about/ColorNutritionLabel.vue:214  : colorSpaceInfo.rgb
            demo/picker/controls/ComponentSliders/ConsoleRail.vue:174  (colorSpaceInfo as any)[space]
AFTER   1   demo/picker/controls/ComponentSliders/ConsoleRail.vue:174:    const info = (colorSpaceInfo as any)[space];
```

The About limb is CURED. The surviving hit is `ConsoleRail.vue`, which is **not in**
`W6.md` §4 and is booked to **X-W9.h** by `W9.md:104` / `:142-147` / `:302-311`
(`componentDescription()` at `:172-180`, re-keyed by the library channel ids there).
Curing it here is the §3a file-bound expansion that invalidates the wave. Escalated.

## f7 — the boundary is the domain type (lint INADMISSIBLE)

```
$ test "$(grep -rn 'colorSpace: any' demo | wc -l | tr -d ' ')" = 0
BEFORE  3   AboutPane.vue:25 · ColorPicker.vue:49 · ColorSpaceSelector.vue:11
AFTER   0

$ test "$(grep -c 'as DisplayColorSpace' demo/color-session/ColorSpaceSelector.vue)" = 0
BEFORE  1   (:91, the Object.entries render-boundary cast)
AFTER   0

$ npx vue-tsc --noEmit -p tsconfig.demo.json
AFTER   exit 0, no diagnostics

$ npx vue-tsc --noEmit -p docs/tranches/X/waves/W6-evidence/catalog/tsconfig.f7-witness.json
AFTER   exit 0 — the @ts-expect-error over modelValue="not-a-space" is USED

# the witness MECHANISM, proven by its own negative control:
$ tsc --noEmit --strict --ignoreConfig control.ts   # type BoundSpace = string
control.ts(4,1): error TS2578: Unused '@ts-expect-error' directive.
exit 2  — i.e. the wide contract is exactly the RED the gate describes
```

## f8 — eighteen dots, eighteen silhouettes; zero dead props

```
$ test "$(grep -c 'tag=' demo/color-session/ColorSpaceSelector.vue)" = 0
BEFORE  1   (:82 tag="div" — WatercolorDot declares no such prop)
AFTER   0
```

## f9 — one command, one home

```
$ test "$(grep -c 'updateToColorSpace' demo/color-session/ColorSpaceSelector.vue)" -ge 1
BEFORE  0   AFTER 2
$ test "$(grep -A3 -n 'watch(' demo/picker/ColorPicker.vue | grep -c 'selectedColorSpace')" = 0
BEFORE  1   (the peer watcher at :359-365)   AFTER 0
```

## f10 — color-session draws no edge into the banned layer

```
$ test "$(grep -rn 'from "\.\./ui/' demo/color-session/ | wc -l | tr -d ' ')" = 0
BEFORE  1   ColorSpaceSelector.vue:109  from "../ui/select"
AFTER   0   (repointed to @mkbabb/glass-ui/select)
```

## f3 · f4 · f6 · f8 — the four browser oracles (smoke, chromium 1280x720)

```
$ npx playwright test e2e/smoke/oracles/o21-space-catalog-truth.spec.ts \
      e2e/smoke/oracles/o22-specimen-legibility.spec.ts \
      e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts \
      e2e/smoke/oracles/o24-specimen-dot-identity.spec.ts \
      e2e/smoke/color-space-switching.spec.ts --project=smoke


Running 5 tests using 1 worker

[1A[2K[1/5] [smoke] › e2e/smoke/color-space-switching.spec.ts:8:1 › color-space select switches the active space
[1A[2K[2/5] [smoke] › e2e/smoke/oracles/o21-space-catalog-truth.spec.ts:109:1 › every offered space states its own facts, and the guide is never a bare heading
[1A[2K[smoke] › e2e/smoke/oracles/o21-space-catalog-truth.spec.ts:109:1 › every offered space states its own facts, and the guide is never a bare heading
X.W6.f f3 CENSUS — 18 spaces walked on the live About route
  rgb           created=1931                 guide=authored       A color space based on the additive mixture of red, green, and b…
  hsl           created=1978                 guide=authored       A cylindrical representation of the RGB color space, with a focu…
  hsv           created=1978                 guide=authored       A cylindrical representation of the RGB color space, with a focu…
  hwb           created=1978                 guide=authored       A cylindrical representation of the RGB color space, using White…
  lab           created=1976                 guide=authored       The L*a*b* color space is a three-dimensional color model design…
  lch           created=1976                 guide=authored       A cylindrical representation of the Lab color space.…
  oklab         created=2019                 guide=authored       A perceptually uniform color space designed to be more intuitive…
  oklch         created=2019                 guide=authored       A cylindrical representation of the OKLab color space.…
  xyz           created=1931                 guide=authored       The CIE 1931 XYZ color space is a device-independent color space…
  kelvin        created=Beginning of time    guide=authored       The Kelvin color space represents the color of an ideal black-bo…
  srgb-linear   created=1996                 guide=none-authored  The sRGB primaries and white point with the transfer function re…
  display-p3    created=2015                 guide=none-authored  A display-referred wide-gamut space: the DCI-P3 primaries carrie…
  a98-rgb       created=1998                 guide=none-authored  Adobe's 1998 wide-gamut RGB working space, defined to encompass …
  prophoto-rgb  created=2000                 guide=none-authored  Kodak's very wide RGB working space, whose primaries lie partly …
  rec2020       created=2012                 guide=none-authored  The ultra-high-definition broadcast space whose red, green and b…
  ictcp         created=2016                 guide=none-authored  An HDR-ready perceptual space (ITU-R BT.2100) derived from LMS c…
  jzazbz        created=2017                 guide=none-authored  A perceptually-uniform space (Safdar, Kim, Luo, Cui & Melgosa, 2…
  hex           created=1996                 guide=authored       A compact hexadecimal notation for sRGB colors, widely used in w…
X.W6.f — spaces that did NOT survive the model→URL→model round-trip: ictcp→oklch, jzazbz→oklch  [PRE-EXISTING, escalated: see the note at the foot of this file]

[1A[2K[3/5] [smoke] › e2e/smoke/oracles/o22-specimen-legibility.spec.ts:76:1 › every specimen caption fits its box
[1A[2K[smoke] › e2e/smoke/oracles/o22-specimen-legibility.spec.ts:76:1 › every specimen caption fits its box
X.W6.f f4 CENSUS — 0/18 captions overflow
  box (narrowest clientWidth): 78px
  worst scrollWidth: 397px (46 chars, "color(prophoto-rgb 1.27 0.6889 0.7346 / 82.7%)")
  per-character advance: 8.630px
  caption type: font-size 14.048px letter-spacing normal
  fits  259/259 px  30ch  rgb(385.3 143.4 199.6 / 82.7%)
  fits  285/285 px  33ch  hsl(346deg -1295% 103.7% / 82.7%)
  fits  225/225 px  26ch  hsv · 346 · 0.6279 · 1.511
  fits  285/285 px  33ch  hwb(346deg 56.23% -51.1% / 82.7%)
  fits  207/207 px  24ch  lab(92% 88.8 20 / 82.7%)
  fits  268/268 px  31ch  lch(92% 91.02 12.69deg / 82.7%)
  fits  302/302 px  35ch  oklab(95.83% 0.2684 0.0465 / 82.7%)
  fits  320/320 px  37ch  oklch(95.83% 0.2725 9.834deg / 82.7%)
  fits  328/328 px  38ch  color(xyz 1.267 0.7878 0.6296 / 82.7%)
  fits  112/112 px  13ch  kelvin · 5309
  fits  389/389 px  45ch  color(srgb-linear 2.58 0.2763 0.5753 / 82.7%)
  fits  389/389 px  45ch  color(display-p3 1.402 0.6284 0.7905 / 82.7%)
  fits  363/363 px  42ch  color(a98-rgb 1.347 0.5571 0.7701 / 82.7%)
  fits  397/397 px  46ch  color(prophoto-rgb 1.27 0.6889 0.7346 / 82.7%)
  fits  354/354 px  41ch  color(rec2020 1.258 0.7095 0.798 / 82.7%)
  fits  276/276 px  32ch  ictcp · 0.5591 · 0.0437 · 0.1739
  fits  285/285 px  33ch  jzazbz · 0.2215 · 0.1177 · 0.0428
  fits   78/78 px   9ch  #ff8fc8d3

[1A[2K[4/5] [smoke] › e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts:213:1 › out-of-gamut rows are marked, and no printed coordinate was projected
[1A[2K[smoke] › e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts:213:1 › out-of-gamut rows are marked, and no printed coordinate was projected
X.W6.f f6 CENSUS — seed lab(92% 88.8 20 / 82.70%)
  rgb           css       MARKED    rgb(385.3 143.4 199.6 / 82.7%)
  hsl           css       MARKED    hsl(346deg -1295% 103.7% / 82.7%)
  hsv           channels  MARKED    hsv · 346 · 0.6279 · 1.511
  hwb           css       MARKED    hwb(346deg 56.23% -51.1% / 82.7%)
  lab           css       in-gamut  lab(92% 88.8 20 / 82.7%)
  lch           css       in-gamut  lch(92% 91.02 12.69deg / 82.7%)
  oklab         css       in-gamut  oklab(95.83% 0.2684 0.0465 / 82.7%)
  oklch         css       in-gamut  oklch(95.83% 0.2725 9.834deg / 82.7%)
  xyz           css       in-gamut  color(xyz 1.267 0.7878 0.6296 / 82.7%)
  kelvin        channels  in-gamut  kelvin · 5309
  srgb-linear   css       MARKED    color(srgb-linear 2.58 0.2763 0.5753 / 82.7%)
  display-p3    css       MARKED    color(display-p3 1.402 0.6284 0.7905 / 82.7%)
  a98-rgb       css       MARKED    color(a98-rgb 1.347 0.5571 0.7701 / 82.7%)
  prophoto-rgb  css       MARKED    color(prophoto-rgb 1.27 0.6889 0.7346 / 82.7%)
  rec2020       css       MARKED    color(rec2020 1.258 0.7095 0.798 / 82.7%)
  ictcp         channels  in-gamut  ictcp · 0.5591 · 0.0437 · 0.1739
  jzazbz        channels  in-gamut  jzazbz · 0.2215 · 0.1177 · 0.0428
  hex           css       MARKED    #ff8fc8d3

[1A[2KX.W6.f f6(ii) — worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1

[1A[2K[5/5] [smoke] › e2e/smoke/oracles/o24-specimen-dot-identity.spec.ts:73:1 › every catalog row mounts its own silhouette, keyed off the seed and not the filter url
[1A[2K[smoke] › e2e/smoke/oracles/o24-specimen-dot-identity.spec.ts:73:1 › every catalog row mounts its own silhouette, keyed off the seed and not the filter url
X.W6.f f8 CENSUS — distinctVisualSignatures = 18 of 18
  (url-keyed would report 18 — the recorded false-GREEN trap, excluded)
  rgb           seed=139 bg=lab(92 88.8 20 / 0.827) radius=23.4211% 70.4608% 75.3555% 45.2175% / 43.6606% 24.8166% 51.9599% 50.8219%
  hsl           seed=151 bg=lab(92 88.8 20 / 0.827) radius=38.62% 42.1289% 41.8862% 78.9748% / 76.6361% 26.1014% 23.3427% 61.5578%
  hsv           seed=161 bg=lab(92 88.8 20 / 0.827) radius=63.356% 24.9525% 74.3151% 61.3301% / 24.3797% 75.4923% 49.3263% 58.6792%
  hwb           seed= 17 bg=lab(92 88.8 20 / 0.827) radius=35.3019% 71.9359% 60.0809% 47.318% / 50.8487% 28.0749% 61.6113% 71.0058%
  lab           seed= 63 bg=lab(92 88.8 20 / 0.827) radius=58.1404% 72.6354% 69.7% 61.9799% / 23.0273% 35.3412% 37.9846% 76.2753%
  lch           seed=135 bg=lab(92 88.8 20 / 0.827) radius=75.9955% 55.4428% 56.1283% 40.4491% / 47.7428% 23.8725% 31.0119% 39.9504%
  oklab         seed=185 bg=lab(92 88.8 20 / 0.827) radius=34.5921% 25.4806% 29.5453% 53.2048% / 65.5605% 39.9849% 58.6353% 24.6319%
  oklch         seed=  1 bg=lab(92 88.8 20 / 0.827) radius=64.9889% 30.2963% 66.2162% 63.1166% / 34.8126% 63.9556% 67.884% 75.654%
  xyz           seed=123 bg=lab(92 88.8 20 / 0.827) radius=77.9535% 32.3528% 62.8153% 24.5566% / 76.1964% 22.2908% 31.2272% 46.3252%
  kelvin        seed=249 bg=lab(92 88.8 20 / 0.827) radius=32.7486% 68.2008% 73.2236% 42.5248% / 53.2509% 74.7796% 31.0369% 68.0678%
  srgb-linear   seed=102 bg=lab(92 88.8 20 / 0.827) radius=24.4176% 49.9775% 34.8167% 61.1069% / 63.0184% 25.6046% 69.8946% 53.9848%
  display-p3    seed=118 bg=lab(92 88.8 20 / 0.827) radius=52.2055% 67.0283% 49.9445% 55.1341% / 72.2384% 25.2067% 42.9991% 37.827%
  a98-rgb       seed=202 bg=lab(92 88.8 20 / 0.827) radius=58.0477% 29.6316% 57.1131% 59.5696% / 72.4616% 33.2626% 38.2899% 44.2414%
  prophoto-rgb  seed=179 bg=lab(92 88.8 20 / 0.827) radius=30.7185% 62.8157% 22.9077% 68.3142% / 42.2426% 21.2406% 69.0458% 35.6567%
  rec2020       seed= 14 bg=lab(92 88.8 20 / 0.827) radius=66.624% 30.9382% 43.441% 60.978% / 58.1172% 57.2564% 67.4878% 28.8015%
  ictcp         seed=  3 bg=lab(92 88.8 20 / 0.827) radius=33.267% 72.0988% 57.0025% 62.8495% / 26.7332% 57.697% 63.8372% 65.6862%
  jzazbz        seed=235 bg=lab(92 88.8 20 / 0.827) radius=42.5542% 59.1851% 37.6087% 28.2555% / 70.6899% 20.5531% 61.1712% 51.1076%
  hex           seed=213 bg=lab(92 88.8 20 / 0.827) radius=33.6998% 50.5583% 70.2832% 45.9203% / 65.4062% 70.224% 66.447% 44.4037%

[1A[2K  5 passed (1.3m)
```

DOUBLE-RUN (WRITE-THEN-MEASURE): the same five specs re-run end to end —
**5 passed** both times (run 1 1.3m, run 2 1.4m).
