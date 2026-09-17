# V·π ADDENDA-04 — W2 color correction + bounded-canonicalization ledger (2026-07-21)

> **PROPOSED · NOT RATIFIED · NO NEW SEMANTIC CODE AUTHORIZED.** This is
> the addenda-writing seat of the W2 audit-finding E-3 triumvirate. It
> transposes `formation/w2-color-audit-research.md` only as amended and
> controlled by `formation/w2-color-audit-harden.md`. It governs prototype
> refinement under `pi/mirror/` only; it never authorizes production execution.
>
> Nothing in this sheet authorizes R19–R26 implementation, PB0, PB1, PB4,
> PB5, a public type change, or an acceptance verdict. This exact addendum must
> first receive **two independent adversarial ACCEPT challenges**, root must
> complete the E-3 gestalt adjudication, and the owner must explicitly ratify
> the decision in §7. Any semantic repair to this sheet after a challenge
> invalidates both prior challenge verdicts.
>
> Ratification would authorize only R19–R22 and R26 in the W2 Phase-A
> prototype. It would ratify the exact terminal dispositions of R23–R25, but
> would not authorize their implementation before their separately gated
> PB0/PB1/PB4/PB5 owners. Direct repairs D-W2-1–D-W2-4 are recorded for
> completeness under existing authority; they do not make W2 accepted.

Authority chain: `HANDOFF.md` E-1–E-5 → ratified Phase-A `PI.md` and
`waves/W-2.md` → owner scope order `ADDENDA-01.md` → proposed Phase-B
`ADDENDA-02.md` → `W2-AUDIT-A.md` + `W2-AUDIT-B.md` →
`formation/w2-color-audit-research.md` →
`formation/w2-color-audit-harden.md`. On every conflict, the harden rulings
H-R19–H-R26, D-W2-1–D-W2-4, and its dependency/close semantics govern, with
the harden file's appended **controlling R26 bounded-canonicalization
amendment** superseding its original one-cycle H-R26 text.

## 0. Formation verdict and exact boundary

Both independent W2 implementation audits **REJECTED** the authored wave.
They confirmed common-mode LIVE/spec defects in legacy grammar and parsed
color values, lossless representation gaps, token-insensitive diagnostics, a
false arbitrary-float round-trip claim, an any-input throw class, incomplete
diagnostic fidelity, and an irreproducible H-8 denominator.

The hardened correction has four disjoint authority classes:

| class | rows/work | terminal owner after ratification |
|---|---|---|
| new Phase-A W2 semantics/evidence | R19–R22 plus R26 bounded two-cycle gate | W2 prototype repair/evidence, then two fresh E-1 audits |
| lossless CSS Color representation growth | R23 and R24 | PB0 freezes carrier; PB5 implements after its owner gates |
| token-position/substitution diagnostics | R25 | PB1 tokens → PB4 substitution ownership → W2 replay |
| existing-authority hardening | D-W2-1–D-W2-4 | focused W2 repair/evidence, then fresh audit |

Reserve **global R19 through R26 atomically** for this sheet. R13–R18 are
already assigned by `ADDENDA-03`; no parallel formation may reuse these
numbers. W3 and later correction formations must retain wave-local provisional
labels until root assigns the next free global range after R26.

This addendum changes no public surface. The mirror remains exactly **33 type
+ 19 runtime exports**, the 37-symbol keyframes seam remains unchanged, and
the Phase-A `CssColorSpace`/`CssColor` union remains frozen. No row authorizes
edits to `src/`, `vnext/`, parse-that, BBNF, keyframes,
`scripts/dev/dev.sh`, or any `INBOX.md`.

W2 remains **REJECTED**. A successful post-ratification repair can earn only a
`PROVISIONAL_PHASE_A_ACCEPTED` verdict while R23–R25 and the PB1 lexical replay
remain RED. It cannot be called tranche-final before those rows turn GREEN.

## 1. Pinned primary evidence and corpus identities

The semantic arbiter is the immutable CSSWG source tree at commit
`c7573530343759ace8e46438a1fa2c44515b5554`, tree
`75bf19c016ed98126381508073de6893c9f756f5`:

| source | immutable identity | use |
|---|---|---|
| `css-color-4/Overview.bs` | blob `238300b75970ab68bf6a0b9339f8e3a01c749b59`; SHA-256 `f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a`; 430,720 bytes | modern/legacy syntax, parsed values, missing components, color spaces, conversion |
| `css-color-5/Overview.bs` | blob `26f508fc194d45cb0c228a32ba93ad118f9fc327`; SHA-256 `e419968b08ee2768fab0c4b667a73541e35cb8cd0b444fb2b6e2d46b1c8ddc15`; 182,733 bytes | extended `color()` grammar and `display-p3-linear` continuity |
| root manifest v2 | 76 roots; canonical SHA-256 `cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c` | source-selection evidence; PB0 occurrence closure remains unexecuted |

LIVE remains the primary differential oracle; these immutable specification
bytes arbitrate common-mode defects. A browser CSSOM witness remains mandatory
when a browser backend is available, with engine/version recorded; browser
support does not override the pinned grammar. The formation audits found no
available browser backend and made no fabricated CSSOM claim.

The following compact-JSON SHA-256 identities are normative gates:

| payload | ordered denominator | SHA-256 |
|---|---:|---|
| R19 reject supplement | 45 sources | `7dd4d3d350018c5da4159cef0699493b2df4032d6654080729f98594e0f1aa26` |
| R20–R22 exact values | 22 sources | `3b9c26919decb811f8f65a3e34d3ab79fa25f27d83cf4e9305b0c2dfd82701fd` |
| D-W2-1 + R25 diagnostics | 12 sources | `f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1` |
| R26 direct-space sub-bank | 24 sources | `2ddd02cc41f814b0874520d14f575d1895bd02f1ceb451a661b1ea0b121ec3c2` |
| R26 branch/scale supplement | 37 sources | `4e9708fdf70e0fb60bf064ebf645178d9424168d4730f4004d27c5a616a9c40c` |
| R26 universal `direct.concat(supplement)` bank | 61 unique sources | `0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d` |
| D-W2-2 hostile fixture IDs | 9 IDs | `419b7ffb365b7cec8373ace1004a06da55c3f341a7d67abc678272af1403513d` |

Tests must generate or retain the exact ordered payloads and recompute their
digests over compact `JSON.stringify` bytes. A prose count or an agreement-only
LIVE sweep cannot discharge these gates.

The exact D-W2-1 + R25 diagnostic source payload, in direct-head-first order,
is:

```json
["_()","-x()","--x()","foo(1 2 3)","color(not-from 1 2 3)","color(--from 1 2 3)","rgb(not-from 1 2)","rgb(from red r g b)","color(from red srgb r g b)","rgb(var(--x) 0 0)","color(srgb var(--x) 0 0)","rgb(env(--x) 0 0)"]
```

Its compact-JSON SHA-256 is the `f1dac2…` value above. No other ordering or
unpublished payload may be used to justify that digest.

## 2. Phase-A semantic correction ledger R19–R22

### R19 — exact legacy RGB/HSL grammar

Comma-separated `rgb()`/`rgba()` requires three homogeneous channels: all
numbers or all percentages. Comma-separated `hsl()`/`hsla()` requires
percentage saturation and lightness. No legacy component, including alpha,
accepts `none`. Legacy alpha accepts number or percentage and then follows
R20. Function aliases do not change the grammar.

Modern space-separated syntax remains distinct: it permits mixed number and
percentage channels and permits `none`. R6 number-as-percentage scaling for
modern HSL/HWB does not authorize number-valued legacy HSL saturation or
lightness.

| source | exact required result |
|---|---|
| `rgb(1,2,3)` | accept `rgb [1,2,3] / 1` |
| `rgba(1%,2%,3%,50%)` | accept `rgb [2.55,5.1,7.65] / .5` |
| `rgb(1,2%,3)`, `rgba(1%,2,3%)` | reject `css_syntax` |
| `rgb(none,2,3)`, `rgba(1,2,3,none)` | reject `css_syntax` |
| `hsl(120,50%,50%)` | accept `hsl [120,.5,.5] / 1` |
| `hsla(.5turn,25%,75%,.5)` | accept `hsl [180,.25,.75] / .5` |
| `hsl(120,50,50)`, `hsla(120,50%,50)` | reject `css_syntax` |
| `hsl(none,50%,50%)`, `hsla(120,50%,50%,none)` | reject `css_syntax` |
| `rgb(1 2% 3)` | accept modern `rgb [1,5.1,3] / 1` |
| `hsl(120 50 50)` | accept modern `hsl [120,.5,.5] / 1` |
| `hsl(none 50% 50% / none)` | accept modern missing hue/alpha |

The exact ordered reject payload is:

```json
["hwb(0,0%,0%)","lab(0%,0,0)","lch(0%,0,0deg)","oklab(0,0,0)","oklch(0,0,0deg)","color(xyz,0,0,0)","color(srgb-linear,0,0,0)","color(display-p3,0,0,0)","color(a98-rgb,0,0,0)","color(prophoto-rgb,0,0,0)","color(rec2020,0,0,0)","rgb(1,2%,3%)","rgb(1%,2,3%)","rgb(1%,2%,3)","rgb(1,2,3%)","rgb(1,2%,3)","rgb(1%,2,3)","rgba(1,2%,3%)","rgba(1%,2,3%)","rgba(1%,2%,3)","rgba(1,2,3%)","rgba(1,2%,3)","rgba(1%,2,3)","rgb(none,2,3)","rgb(1,none,3)","rgb(1,2,none)","rgba(none,2,3)","rgba(1,none,3)","rgba(1,2,none)","rgb(1,2,3,none)","rgba(1,2,3,none)","hsl(none,50%,50%)","hsl(120,none,50%)","hsl(120,50%,none)","hsla(none,50%,50%)","hsla(120,none,50%)","hsla(120,50%,none)","hsl(120,50%,50%,none)","hsla(120,50%,50%,none)","hsl(120,50,50)","hsl(120,50,50%)","hsl(120,50%,50)","hsla(120,50,50)","hsla(120,50,50%)","hsla(120,50%,50)"]
```

All 45 rows reject after repair. The first eleven retain R9 modern-only comma
rejections; the remaining 34 expose the legacy defects. Parsimony: retain the
existing function-row table and add only private RGB/HSL legacy leaves that
inspect `numUnit.unit` before scaling. No public token-kind union, second
function parser, or parallel color engine is authorized.

### R20 — parsed-value alpha and direct-RGB clamping

Apply percentage scaling first, then clamp every concrete alpha to `[0,1]`
and every concrete direct-RGB channel to `[0,255]`. Preserve `none` in modern
channels and alpha. Leave all `color()` coordinates unbounded; only its alpha
is clamped.

| source | exact required Phase-A value |
|---|---|
| `rgb(300 -10 20)` | `rgb [255,0,20] / 1` |
| `rgb(120% -10% 20%)` | `rgb [255,0,51] / 1` |
| `rgba(300,-10,20,200%)` | `rgb [255,0,20] / 1` |
| `rgb(1 2 3 / 2)` | `rgb [1,2,3] / 1` |
| `rgb(1 2 3 / -10%)` | `rgb [1,2,3] / 0` |
| `rgb(none 2 3 / none)` | `rgb ["none",2,3] / "none"` |
| `color(display-p3 2 -1 .5 / 2)` | `display-p3 [2,-1,.5] / 1` |

This is parser-produced value normalization, not a widening of direct
serializer input. A hand-built color with alpha outside `[0,1]` continues to
return `color_out_of_range`.

### R21 — hue normalization and negative HSL saturation

After angle conversion, normalize concrete HSL, HWB, LCH, and OkLCh hues by
`((h % 360) + 360) % 360`. Preserve `none`. For HSL saturation, perform the
existing canonical-unit scaling first, then clamp only the lower bound to
zero. Do not add upper saturation, HSL lightness, or HWB white/black clamps.

| source | exact required Phase-A value |
|---|---|
| `hsl(720 -10 50)` | `hsl [0,0,.5] / 1` |
| `hsl(-540 -10% 50%)` | `hsl [180,0,.5] / 1` |
| `hsl(720,-10%,50%)` | legacy accept, `hsl [0,0,.5] / 1` |
| `hwb(720 10 20)` | `hwb [0,.1,.2] / 1` |
| `lch(50 20 1turn)` | `lch [50,20,0] / 1` |
| `oklch(.5 .1 -540)` | `oklch [.5,.1,180] / 1` |
| `hsl(none none 50% / none)` | retain missing hue/saturation/alpha |

### R22 — perceptual-space lightness and chroma clamping

Scale percentages into the existing Phase-A canonical units, then clamp
Lab/LCH lightness to `[0,100]`, Oklab/OkLCh lightness to `[0,1]`, and only the
lower bound of LCH/OkLCh chroma to zero. Preserve `none`; Lab/Oklab a/b and
positive chroma remain unbounded.

| source | exact required Phase-A value |
|---|---|
| `lab(150% 0 0)` | `lab [100,0,0] / 1` |
| `lab(-5 0 0)` | `lab [0,0,0] / 1` |
| `lch(-5 -2 720)` | `lch [0,0,0] / 1` |
| `lch(150% -10% 1turn)` | `lch [100,0,0] / 1` |
| `oklab(2 0 0)` | `oklab [1,0,0] / 1` |
| `oklab(-1 0 0)` | `oklab [0,0,0] / 1` |
| `oklch(-1 -.1 -540)` | `oklch [0,0,180] / 1` |
| `oklch(none none none / none)` | retain every missing component |

The ordered R20 seven rows, R21 seven rows, then R22 eight rows are the exact
22-source born-RED normalization payload identified in §1. Each row asserts
the complete exact value, not only `ok:true`.

## 3. Deferred semantic rows R23–R25

Ratification fixes the following required outcomes and owners. It does **not**
authorize their code before the named Phase-B gates.

### R23 — `DEFERRED_PB0_PB5`: lossless `xyz-d50` missing components

Color 4 accepts missing components in `color(xyz-d50 …)`, but the frozen
Phase-A `{space:"xyz"}` carrier cannot preserve both D50 provenance and
missingness. Replacing `none` with zero loses missingness; copying `none` into
the same D65 slot is not a valid matrix conversion; labelling unadapted D50
coordinates as `xyz` misstates their space.

W2 therefore retains concrete numeric D50→D65 adaptation and an executable,
named compatibility rejection for D50 missing components. That is a frozen-
carrier limit, not a claim that the CSS spelling is invalid. PB0 must freeze a
distinct `xyz-d50` carrier or an equally lossless tagged L4 color-expression
node. PB5 must then preserve at least:

| source | exact L4 semantic requirement |
|---|---|
| `color(xyz-d50 none 0 0)` | D50; `["none",0,0]`; alpha `1` |
| `color(xyz-d50 0 none 0)` | D50; `[0,"none",0]`; alpha `1` |
| `color(xyz-d50 0 0 none)` | D50; `[0,0,"none"]`; alpha `1` |
| `color(xyz-d50 none none none / none)` | D50; all components and alpha missing |

PB5's minimum bank is all seven nonempty three-channel missingness
permutations plus the all-missing/alpha-missing row. No W2 approximation and
no PB5 code are authorized by this sheet.

The exact ordered Phase-A compatibility RED bank is generated by the seven
nonempty missing-channel masks in the order `100`, `010`, `001`, `110`,
`101`, `011`, `111`, followed by the all-missing/alpha-missing case:

```json
["color(xyz-d50 none 0 0)","color(xyz-d50 0 none 0)","color(xyz-d50 0 0 none)","color(xyz-d50 none none 0)","color(xyz-d50 none 0 none)","color(xyz-d50 0 none none)","color(xyz-d50 none none none)","color(xyz-d50 none none none / none)"]
```

For **each** exact source, Phase-A returns `css_syntax`,
`expected:["concrete xyz-d50"]`, `start:0`, `end:source.length`, and
`actual:source`. PB5 later replaces these exact frozen-carrier compatibility
failures with lossless values; a different failure cannot discharge R23.

### R24 — `DEFERRED_PB0_PB5`: `display-p3-linear` representation

`color(display-p3-linear .1 .2 .3)` is valid in the pinned Color 4 and Color 5
sources, but the frozen union/factory set has `display-p3` and `srgb-linear`,
not `display-p3-linear`. Neither is a truthful cast target.

W2 retains a named executable RED/rejection. PB0 inventories and freezes the
lossless L4 carrier; PB5 adds parser, serializer, and typed-expression
coverage after its gates. The Phase-A 52-export contract remains unchanged.
R23/R24 amend any provisional PB5 wording that the legacy concrete door is
simply "unchanged": PB5 consumes the corrected W2 semantics and separately
adds these representational L4 arms.

The exact Phase-A compatibility projection for
`color(display-p3-linear .1 .2 .3)` is `css_syntax`,
`expected:["CSS color space"]`, `start:0`, `end:source.length`, and
`actual:source`. PB5 later replaces this exact frozen-carrier failure with the
lossless typed success. Any other rejection is a diagnostic regression, not
an R24 pass.

### R25 — `DEFERRED_PB1_PB4`: token-position and substitution diagnostics

A relative-color guard applies only when the decoded first significant token
at the recognized function's relative-color grammar position is the
identifier `from`. A hyphenated or custom-property-like identifier containing
those letters is not that token. An unresolved nested `var()` or `env()` at
any component-value depth requires context and must not be reported as
ordinary malformed concrete color syntax.

| source | exact required legacy-door result after PB1/PB4 |
|---|---|
| `color(not-from 1 2 3)` | `css_syntax`, `expected:["CSS color space"]` |
| `color(--from 1 2 3)` | `css_syntax`, `expected:["CSS color space"]` |
| `rgb(not-from 1 2)` | `css_syntax`, `expected:[]` |
| `rgb(from red r g b)` | `color_context_required`, `expected:["context-free color"]` |
| `color(from red srgb r g b)` | same context-required result |
| `rgb(var(--x) 0 0)` | same context-required result |
| `color(srgb var(--x) 0 0)` | same context-required result |
| `rgb(env(--x) 0 0)` | same context-required result |

Every projection retains `start:0`, `end:source.length`, and `actual:source`.
Together with the four D-W2-1 head fixtures, these eight sources form the exact
ordered twelve-source diagnostic payload identified in §1.

R25 authorizes **no pre-PB1 scanner patch**. Raw substring checks, regex
guards, or a second balanced walk would create another CSS tokenizer. PB1
supplies decoded tokens, comments, spans, and significant position; PB4 owns
typed substitution/provider behavior. Until then these rows remain executable
`DEFERRED_PB1_PB4` evidence and prevent a final color verdict.

## 4. R26 — twelve-decimal bounded two-cycle canonical fixed point

The inherited formatter spells each numeric token with
`Number(value.toFixed(12)).toString()`. Exact first-cycle structural identity
is false for high-precision parser outputs. A universal one-cycle fixed point
is also false for percentage-backed fields because serialization multiplies
an internal value by 100 and parsing divides it again; the final binary64
adjustment can change the last emitted decimal unit once more. R26 introduces
neither an epsilon nor a formatter change. It measures the complete existing
parser/serializer composition and proves its exact bounded stabilization.

### R26.1 — exact success chain and universal predicates

For every successful parser-produced, serializable `C0`, assert each operation
succeeds **before** reading its `.value`, then construct exactly:

```text
s0 = serializeCssColor(C0).value
C1 = parseCssColor(s0).value
s1 = serializeCssColor(C1).value
C2 = parseCssColor(s1).value
s2 = serializeCssColor(C2).value
C3 = parseCssColor(s2).value
```

The exact universal predicates are:

```text
s2 === s1
C3 deep-equals C2
```

The canonical value is `C2`; its canonical string is `s1`. "At most two
cycles" means there is no third change: the mandatory `s2`/`C3` probes prove
the bound rather than assuming it. Also record, but never require, the
stronger classifications:

```text
first-cycle lossless: C1 deep-equals C0
one-cycle fixed:      s1 === s0 && C2 deep-equals C1
```

No epsilon, tolerance, or approximate comparison participates. R26 authorizes
no formatter retry/canonicalization, precision-policy change, public type
growth, scanner work, PB implementation, or production wiring. Adding runtime
iteration would branch every serialization, could change first-pass
LIVE-compatible spelling, and would move a property-test concern into the
serializer.

### R26.2 — complete branch bound

After idempotent R19–R22 transforms, the formatter/parser paths are bounded as
follows:

| output fields | existing composition | required bound |
|---|---|---|
| RGB channels; Lab/Oklab a/b; LCH/OkLCh chroma; `color()` coordinates, including concrete D50→D65 output | emit `F(x)` and parse directly, where `F(x)=Number(x.toFixed(12)).toString()` | one cycle, plus idempotent clamp/normalization where applicable |
| HSL/HWB/LCH/OkLCh hue | direct angle token plus R21 normalization | one cycle after idempotent normalization |
| HSL saturation/lightness; HWB white/black; Oklab/OkLCh lightness | emit `F(100*x)%`, then parse/divide by 100 | at most two cycles |
| Lab/LCH lightness | emit `F(x)%`, parse percent into the same `[0,100]` canonical unit, then R22 clamp | within two cycles |
| every alpha | emit `F(100*x)%`, parse/divide by 100; canonical `1` may omit the suffix | within two cycles, including one omission change |

Direct RGB percentage source syntax does not add a percentage-backed output
branch: parsing first scales it to `[0,255]`, then canonical RGB emits plain
numbers. Concrete D50 adaptation produces high-precision XYZ coordinates but
serializes through the direct `space:"xyz"` path. Hand-built colors whose
unbounded percentage fields were not produced by the parser remain outside
R26 and inside direct serializer validation/no-throw coverage.

### R26.3 — exact 61-source universal denominator

Retain the original 24 sources as the **direct-space sub-bank**, generated in
space-major order:

```text
spaces = [srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz]
tuples = [.1 .2 .3,
          0.0000000000001 0 0,
          0.12345678901234 .2 .3,
          1.0000000000001 2 3]
direct = spaces.flatMap(space => tuples.map(tuple =>
  `color(${space} ${tuple})`))
```

Its ordered compact-JSON SHA-256 remains
`2ddd02cc41f814b0874520d14f575d1895bd02f1ceb451a661b1ea0b121ec3c2`.
The old first-cycle AST identity fails **18/24**, while the stronger one-cycle
fixed-point predicates pass **24/24**. That is retained sub-bank evidence, not
universal proof.

Append this exact ordered 37-source branch/scale supplement:

```json
["rgb(1.0000000000001 2.123456789012345 254.9999999999999 / .123456789012345)","rgb(5e-324 1e-13 255 / 0.9999999999999999)","rgb(0 0 0 / 5e-324)","hsl(10 9986.367914825678 3774.7846683487296 / .5)","hsl(10 4038.6763111647383 4038.6763111647383 / .123456789012345)","hsl(10 4038.6763111647383% 4038.6763111647383% / 12.3456789012345%)","hsl(10 5e-324 1e-13 / 5e-324)","hsl(10 1e21 -1e21 / .9999999999999999)","hsl(10 1.7976931348623157e308 -1.7976931348623157e308 / .5)","hwb(10 9986.367914825678 3774.7846683487296 / .5)","hwb(10 4038.6763111647383 -4038.6763111647383 / .123456789012345)","hwb(10 4038.6763111647383% -4038.6763111647383% / 12.3456789012345%)","hwb(10 5e-324 -1e-13 / 5e-324)","hwb(10 1e21 -1e21 / .9999999999999999)","hwb(10 -1.7976931348623157e308 1.7976931348623157e308 / .5)","lab(99.99999999999999% .123456789012345 -.123456789012345 / .123456789012345)","lab(.0000000000001% 1e-13 -1e-13 / 5e-324)","lab(50.123456789012345 1e21 -1e21 / .9999999999999999)","lab(100 1.7976931348623157e308 -1.7976931348623157e308 / .5)","lch(99.99999999999999% .123456789012345 10.123456789012345 / .123456789012345)","lch(.0000000000001% 1e-13 .0000000000001 / 5e-324)","lch(50.123456789012345 1e21 359.9999999999999 / .9999999999999999)","lch(100 1.7976931348623157e308 10 / .5)","oklab(99.99999999999999% .123456789012345 -.123456789012345 / .123456789012345)","oklab(.0000000000001% 1e-13 -1e-13 / 5e-324)","oklab(.50123456789012345 1e21 -1e21 / .9999999999999999)","oklab(1 1.7976931348623157e308 -1.7976931348623157e308 / .5)","oklch(99.99999999999999% .123456789012345 10.123456789012345 / .123456789012345)","oklch(.0000000000001% 1e-13 .0000000000001 / 5e-324)","oklch(.50123456789012345 1e21 359.9999999999999 / .9999999999999999)","oklch(1 1.7976931348623157e308 10 / .5)","color(srgb-linear .123456789012345 1e21 -1e21 / .123456789012345)","color(display-p3 .123456789012345 1e21 -1e21 / .123456789012345)","color(a98-rgb .123456789012345 1e21 -1e21 / .123456789012345)","color(prophoto-rgb .123456789012345 1e21 -1e21 / .123456789012345)","color(rec2020 .123456789012345 1e21 -1e21 / .123456789012345)","color(xyz .123456789012345 1e21 -1e21 / .123456789012345)"]
```

Its ordered compact-JSON SHA-256 is
`4e9708fdf70e0fb60bf064ebf645178d9424168d4730f4004d27c5a616a9c40c`.
The normative universal payload is `direct.concat(supplement)`: **61 unique
sources**, ordered compact-JSON SHA-256
`0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d`.

The supplement covers every numeric branch, number/percentage source forms,
alpha precision/omission, subnormal underflow, the `1e21` formatting boundary,
R21's `360deg` rounding boundary, and maximum finite source values. The exact
required result over the current composition and with R19–R22 transforms
reapplied after every parse is:

```text
all parse/serialize intermediates successful: 61/61
first-cycle structural identity failures:      49/61
old one-cycle fixed-point predicates:           48/61
bounded two-cycle predicates:                   61/61
```

Supporting deterministic scalar stress uses the unsigned-32 recurrence
`state=(1664525*state+1013904223) mod 2^32`, seed `0x9e3779b9`, paired words
as binary64, and 3,000,000 iterations. After excluding 1,439 non-finite pairs,
the exact 2,998,561 finite samples retain these challenge counts:

```text
source d; internal d/100; percent re-emission:
  0 cycles 1,483,070 · 1 cycle 1,515,453 · 2 cycles 38 · >2 cycles 0
source d; internal d*.01; percent re-emission:
  0 cycles 1,355,616 · 1 cycle 1,642,888 · 2 cycles 57 · >2 cycles 0
arbitrary internal [0,1] (alpha/Ok lightness):
  0 cycles 22,322 · 1 cycle 2,976,239 · >1 cycles 0
Lab/LCH lightness [0,100] percent marker:
  0 cycles 24,332 · 1 cycle 2,974,229 · >1 cycles 0
```

This sweep is supporting evidence, not a substitute for the normative
61-source payload and exact predicates.

The exact HSL source
`hsl(10 9986.367914825678 3774.7846683487296 / .5)` and its HWB analogue
`hwb(10 9986.367914825678 3774.7846683487296 / .5)` are mandatory two-cycle
controls. The HSL chain must retain the observed final-unit change from
`3774.78466834873%` to `3774.784668348731%` before stabilizing. The universal
gate is the 61-source bounded chain, never the direct 24-source one-cycle
result alone.

Direct serializer inputs not produced by `parseCssColor` remain governed by
validation/no-throw tests, not by a semantic round-trip promise.

## 5. Existing-authority direct repairs D-W2-1–D-W2-4

These repairs require maintained tests and fresh audit. They add no new color
semantics and receive no acceptance credit merely by landing.

### D-W2-1 — unsupported function-head diagnostic envelope

| source | exact result |
|---|---|
| `_()` | `css_syntax`, `expected:["color"]`, span `0..3`, actual `_()` |
| `-x()` | `css_syntax`, `expected:["color"]`, span `0..4`, actual `-x()` |
| `--x()` | `css_syntax`, `expected:["color"]`, span `0..5`, actual `--x()` |
| `foo(1 2 3)` | `css_syntax`, `expected:["CSS color"]`, complete span/actual |

The first three are outside the Phase-A color-call envelope; the fourth is a
valid envelope with an unsupported function. Add one ASCII-letter check at
the existing head boundary; do not parse the head twice. Escaped/non-ASCII
heads remain PB1-owned. Do not change W1 generic-call acceptance for
`_rgb(...)` or `-rgb(...)`.

### D-W2-2 — serializer any-input no-throw

One outer exception boundary encloses validation and serialization. Accessor,
proxy, revoked-proxy, and sparse-shape exceptions return exactly:

```text
{ ok:false, error:{ code:"color_invalid_input" } }
```

The exact ordered fixture-ID payload is:

```json
["throwing-space-getter","throwing-channels-getter","throwing-alpha-getter","throw-on-get-color-proxy","revoked-color-proxy","revoked-channels-proxy","throwing-channel-slot-getter","sparse-three-slot-channels","self-cyclic-extra-property"]
```

The first eight return `color_invalid_input` without throwing. The ninth is a
well-shaped ordinary color with an irrelevant self-cycle; it must not hang or
throw and must serialize normally. Retain primitive, symbol, non-finite, and
out-of-range tests: inert invalid shapes return `color_invalid_input`,
non-finite fields return `color_non_finite`, and direct alpha outside `[0,1]`
returns `color_out_of_range`. Do not add proxy detection, hostile cloning,
recursive cycle walking, or per-property catches.

### D-W2-3 — persistent H-8 corpus

Replace the prose-only 4,158 claim with executable source-controlled evidence.
The close bank retains:

1. the thirteen-output-space modern/`none`/legacy-applicability matrix;
2. the exact R19 45-source reject payload and digest;
3. the exact R20–R22 22-source value payload and digest;
4. hex 3/4/6/8, `transparent`, all current `color()` aliases, and exactly 148
   ordered named-color source entries with exact mirror/source equality and
   canonical ordered-entry SHA-256
   `2949c59aab6154988afb83744b954bd58146a06ada4d53831e6720ee01f64d0c`;
5. R1/R3/R6/R9, R25 diagnostics, the R26 24-source direct sub-bank,
   37-source branch/scale supplement, combined 61-source universal bounded-
   two-cycle bank, all three digests and exact result counts, plus hostile
   serializer IDs;
6. the exact R23 eight-source Phase-A compatibility bank and R24 Phase-A
   compatibility projection, followed later by their named PB5 success
   families;
7. deterministic generation or a checked fixture whose ordered compact-JSON
   bytes are rehashed in the test.

Every row asserts an exact terminal result. Retain the current projection
beside the required projection before repair as the born-RED transcript. LIVE
comparison remains primary, but common-mode corrections are asserted against
the immutable spec result and named R row; punctuation-classification cannot
swallow them.

### D-W2-4 — complete W1 color replay

For every accepted W2 fixture producing `C`, require:

```text
parseCssScalar(source) = scalar(color(C))
parseCssValue(source)  = scalar(color(C))
parseCssValues(source) = list(space,[scalar(color(C))])
```

For every R19 rejection, all three W1 doors reject `css_syntax` /
`expected:["scalar"]` over the complete input. For every R20–R22 row, all
three return the exact transformed `C0`. Every serializable transformed color
then runs R26's complete successful `C0/s0/C1/s1/C2/s2/C3` chain and requires
`s2 === s1` plus `C3` deep-equal to `C2`; no one-cycle universal shortcut or
epsilon is permitted. Run the full W1 suite, not only the color seam. Preserve
the generic-call distinction from D-W2-1 and every independently owner-gated
W1 deferred/TODO row.

## 6. Parsimony, implementation boundary, and replay graph

The authorized implementation shape after ratification is deliberately small:

1. retain the single `fnHead` parse and name-keyed function-row table;
2. add only private RGB/HSL legacy leaves over `numUnit`;
3. split legacy and modern alpha acceptance, then share one numeric clamp;
4. apply small concrete-number transforms per existing row: RGB clamp; HSL
   hue/saturation; HWB hue; Lab L; LCH L/C/hue; Oklab L; OkLCh L/C/hue;
5. keep every `color()` coordinate unbounded and numeric D50 adaptation
   unchanged;
6. add one raw envelope check and one outer serializer exception boundary;
7. keep exact generated banks in tests and reuse the W1 wrappers.

No second scanner, tokenizer, color hierarchy, factory family, public token
kind, public color space, speculative AST, duplicated serializer, or precision
policy is authorized. If implementation requires `lexeme.ts`, `util.ts`, a
public type, or the color-model factory contract, stop and return through E-3
and the required structural replay; this KISS design does not require them.

Mandatory downstream edges:

- **W1:** replay the full repaired W2 bank through scalar/value/values. The
  four-row seam is insufficient, and W1's independent authority holds remain.
- **W4:** consume only accepted/canonical W2 values; replay the exact R26
  61-source `C0…C3`/`s0…s2` bounded two-cycle chain through
  `serializeCssValue`, require the same `s2 === s1` and `C3 deep-equals C2`
  results, and retain the hostile composition boundary. W4 neither repeats
  color normalization nor changes the formatter, and remains close-held on
  W2/W3.
- **PB1:** replace raw preprocessing/token boundaries once, then replay the
  complete W2/W1 bank with comments, escapes, CSS whitespace, decoded names,
  significant-token `from`, and source-faithful spans.
- **PB4:** own typed substitution/provider behavior. Without context, nested
  `var()`/`env()` returns `color_context_required` at the concrete door.
- **PB5:** consume accepted R19–R22/R26 semantics and add lossless R23/R24
  carriers/L4 expressions only after PB0 and owner gates.

No W0 replay is required if repairs remain in W2 grammar/serializer/tests and
W1 replay tests. A change to any shared lexeme, splitter, result, public type,
or factory contract reopens the matching structural/type gate.

## 7. Exact owner authorization requested

After this exact revision receives two independent ACCEPT challenges and root
gestalt adjudication, the owner is asked to ratify or reject all of the
following as one explicit decision:

1. the atomic global R19–R26 namespace reservation;
2. R19–R22 as the exact Phase-A W2 semantic correction set;
3. R26's exact bounded two-cycle `C0…C3`/`s0…s2` success chain and universal
   predicates `s2 === s1` and `C3 deep-equals C2`, with the 24/37/61-source
   denominators and the twelve-decimal spelling policy unchanged;
4. R23/R24 as lossless PB0→PB5 type/surface rows, with no W2 approximation
   and no Phase-B implementation authority yet;
5. R25's exact diagnostic outcomes as `DEFERRED_PB1_PB4`, with no W2-local
   scanner;
6. D-W2-1–D-W2-4 as existing-authority direct repairs, listed for exact scope
   rather than presented as new semantic discretion;
7. all persistent digested denominators and mandatory W1/W4/PB1/PB4/PB5
   replays;
8. the unchanged 33-type + 19-runtime surface, prototype-only path, and
   provisional pre-PB1/pre-PB5 status.

Ratification authorizes no new color function, `CssColorSpace` widening,
relative-color AST, substitution evaluation, numeric precision change,
browser-derived semantics, PB0/PB1/PB4/PB5 code, production wiring, or ship.
It is orthogonal to both Phase-B owner gates in `ADDENDA-02` and to the W1
owner decision in `ADDENDA-03`.

## 8. Sequence, audits, holds, and close semantics

```text
ADDENDA-04 exact revision
  -> two independent assume-faulty challenges
  -> root E-3 gestalt adjudication
  -> explicit owner ratification of §7
  -> D-W2-1…4 + R19–R22 prototype repair + R26 evidence gate
  -> mechanical gates + persistent digested corpus
     + R26 61-source bounded two-cycle proof + full W1 replay
  -> two fresh independent W2 E-1 audits
  -> root adjudication
  -> at most PROVISIONAL_PHASE_A_ACCEPTED

ADDENDA-02 Gate 1 -> PB0 reviews -> owner Gate 2
  -> PB1/PB4/PB5 under their occurrence-derived owners
  -> R23/R24/R25 and lexical replay turn GREEN
  -> final tranche perfection eligibility
```

Before the fresh W2 audits start, require:

- this addendum twice-challenged, gestalt-adjudicated, and owner-ratified;
- no author mutating W2/W1 replay files;
- all R19–R22 and D-W2-1–4 exact banks sealed GREEN;
- R26's exact 24-source direct sub-bank, 37-source branch/scale supplement,
  and combined 61-source universal denominator rehash to their published
  digests; every intermediate succeeds, all exact result counts are retained,
  and `s2 === s1` plus `C3 deep-equals C2` pass 61/61 without epsilon or a
  formatter change;
- R23–R25 visibly executable as named deferred RED gates, not skipped/TODO;
- `npm test`, `npm run check`, and `npm run dts-parity` GREEN;
- exact `@mkbabb/parse-that@1.0.0`, zero production dependency
  vulnerabilities, and 33-type + 19-runtime barrel parity;
- every public W2 door no-throw on branch-diverse runtime hostiles;
- LIVE differential plus spec-arbitrated common-mode rows and, when
  available, recorded browser CSSOM witness;
- review finds no second scanner/tokenizer, public type widening, bare
  recognition regex, parser `.map()`/`mapState()`, freeze, or production edit;
- the full W1 replay is GREEN and W4 remains close-held until W2 and W3 are
  independently accepted.

Any confirmed defect repairs the prototype and restarts both E-1 passes. Any
semantic expansion returns through E-3. Any shared-foundation edit reopens its
structural replay. G-2 is never relaxed to chase performance.

## 9. Cost and close of proposal

This correction adds no feature wave or public door. Its immediate increment
is one focused W2 semantic/hardening slice plus persistent corpus work, full W1
replay, two addendum challenges and root gestalt before ratification, then two
fresh W2 E-1 passes and root adjudication after implementation. R23–R25 code
and their shared-token/type work remain in separately gated Phase-B budgets.

This sheet is complete only as the third E-3 formation artifact. It is not an
implementation receipt, challenge, owner decision, W2 verdict, Phase-B gate,
or production authorization. The next authorized actions are two independent
assume-faulty challenges of this exact revision and root gestalt adjudication.
Until those complete and the owner ratifies §7, W2 remains **REJECTED** and no
new semantic code from R19–R26 may land.

### Amendment receipt after the first challenge

The prior artifact digest
`f629b82e79f198bb7c272a9f76e5763e73109d7e15dc2f4ae7fb9ce201f4941f`
was **REJECTED** by `ADDENDA-04-AUDIT-A.md`. This revision closes all five
required repairs without changing semantic ownership:

1. it publishes the exact twelve-source diagnostic array and replaces the
   orphan `3397ba83…` claim with its verified `f1dac2a8…` digest;
2. it stated the then-exact, now-superseded R26 `S(T(C)) === S(C)` predicate
   and all intermediate success preconditions;
3. it seals the generated eight-source D50 missingness compatibility bank and
   every exact Phase-A R23 diagnostic;
4. it seals the exact R24 Phase-A diagnostic; and
5. it freezes the 148-entry named-color equality evidence and canonical
   ordered-entry digest.

These are normative gate-byte/text amendments. The prior REJECT remains
historical, and **every challenge against the prior digest is invalid for
acceptance**. Two fresh independent challenges must attack this exact amended
revision before root gestalt or owner ratification.

### Controlling R26 amendment after the fresh challenge

The immediately preceding amended artifact digest
`790a30eb42f1814b5ac2ed5027a9bbfaef7ffa2482c9496b669685565066dba8`
was **FRESH_REJECTED** by the current `ADDENDA-04-AUDIT-A.md`. Its exact valid
HSL counterexample proved that percentage-backed fields do not universally
stabilize after one cycle. The controlling amendment appended to
`formation/w2-color-audit-harden.md` confirms that rejection and supersedes
only the old R26 bound.

This revision therefore:

1. renames R26 to the twelve-decimal bounded two-cycle canonical fixed point;
2. freezes the successful `C0/s0/C1/s1/C2/s2/C3` chain and exact universal
   predicates `s2 === s1` and `C3 deep-equals C2`;
3. retains the 24-source direct-space digest and its stronger 24/24 one-cycle
   result solely as sub-bank evidence;
4. publishes the exact 37-source branch/scale supplement and digest, plus the
   exact combined 61-source universal digest and result counts;
5. updates D-W2-3, D-W2-4, W4, the owner request, route, and pre-audit close
   gate without changing the formatter, semantic ownership, or KISS boundary.

Every challenge of the `790a30eb…` bytes—including the fresh-A rejection and
any contemporaneous challenge—is invalid for acceptance of this revision.
The historical `f629b82e…` rejection and the `790a30eb…` fresh rejection earn
no ACCEPT credit. **Two new independent challenges must start from the new
bytes**, followed by root gestalt and explicit owner ratification.

---

Formation receipt: W2 color audit-correction addenda-writing seat;
`model_served`: inherited root Codex route; the service-side backend alias and
effort label were not exposed to this seat, so this receipt does not claim
Opus; 2026-07-21.
