# V·π W2 color audit correction — research seat

status: `RESEARCH_COMPLETE_PROPOSED_NOT_AUTHORITY`

model_served: `gpt-5.6-terra` (inherited Codex subagent route; the service did
not expose a more specific effort label to this seat)

date: 2026-07-21

This is the research leg of a focused E-3 formation pass prompted by
`W2-AUDIT-A.md`. It makes no code change, grants no authority, does not accept
W2, and does not ratify either Phase-B gate. I read the W2 brief, author
receipt, Audit A, the frozen Phase-A types and current implementation/tests. I
did not read the independently running W2 Audit B and did not contact its seat.

## 0. Research verdict

Audit A found real defects, but its `xyz-d50 none` remedy overstates what the
frozen Phase-A AST can represent. The findings divide into three disjoint
classes:

| class | findings | required route |
|---|---|---|
| existing-authority repair | unsupported-head diagnostic envelope; `serializeCssColor` hostile accessor/proxy no-throw; complete/reproducible H-8 rejection evidence; full W1 color-seam replay | direct W2/hardening repair, then fresh twice-audit; no new semantic R row |
| new W2 semantics | exact legacy RGB/HSL grammar; parsed-value clamping/normalization for alpha, RGB, hue, negative HSL saturation, Lab/LCH, and Oklab/OkLCh | focused E-3 rows, twice-challenge, gestalt, owner ratification before code |
| Phase-B type/surface decision | `color(xyz-d50 none…)` without losing missingness; `color(display-p3-linear …)` | PB0 freezes a representable L4 color node/type; PB5 implements it. The frozen legacy `parseCssColor` door remains unchanged unless the owner separately amends that contract |

The smallest honest implementation is not a second color engine. W2 needs
dedicated legacy leaves over the existing `numUnit`, a few parsed-value
transforms before calling the existing factories, and one outer serializer
catch boundary. The two unrepresentable Color 4 cases must not be approximated
inside the 13-space Phase-A union.

## 1. Exact pinned authority

All semantic conclusions below use the CSSWG object lock already present in
`formation/l4-root-seed-manifest.json`:

| object | immutable identity | relevant carriers |
|---|---|---|
| CSSWG commit | commit `c7573530343759ace8e46438a1fa2c44515b5554`; tree `75bf19c016ed98126381508073de6893c9f756f5` | repository-wide source identity |
| `css-color-4/Overview.bs` | Git blob `238300b75970ab68bf6a0b9339f8e3a01c749b59`; SHA-256 `f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a`; 430,720 bytes | `#color-syntax-modern`, `#color-syntax-legacy`, `#alpha-syntax`, `#hue-syntax`, `#missing`, `#rgb-functions`, `#the-hsl-notation`, `#the-hwb-notation`, `#specifying-lab-lch`, `#specifying-oklab-oklch`, `#color-function`, `#predefined-display-p3-linear`, `#color-conversion`, and the resolving sections |
| `css-color-5/Overview.bs` | Git blob `26f508fc194d45cb0c228a32ba93ad118f9fc327`; SHA-256 `e419968b08ee2768fab0c4b667a73541e35cb8cd0b444fb2b6e2d46b1c8ddc15`; 182,733 bytes | the extended `color()`/`<predefined-rgb>` grammar, relative-color consumers, and the same `display-p3-linear` spelling |
| root manifest v2 | 76 roots; canonical manifest digest `cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c` | source selection evidence only; PB0 occurrence closure remains unexecuted |

I independently fetched both raw source objects from the immutable commit and
recomputed both SHA-256 values and byte counts. Live rendered drafts and branch
HEADs were not used.

The decisive Color 4 rules are:

1. Modern syntax permits freely mixed numbers/percentages and `none`.
2. Legacy syntax permits no `none`; legacy RGB is either three numbers or
   three percentages; legacy HSL requires percentage S and L.
3. Out-of-range alpha and RGB channels remain syntactically valid and clamp at
   parsed-value time.
4. Hue normalizes to `[0,360)`; negative HSL saturation clamps to zero.
5. Lab/LCH L clamps to `[0,100]`; Oklab/OkLCh L clamps to `[0,1]`; LCH/OkLCh
   negative chroma clamps to zero; a/b and positive chroma remain unbounded.
6. `color()` RGB/XYZ coordinates remain unbounded; display gamut mapping is an
   actual-value concern, not a parser clamp.
7. `xyz-d50` is a distinct specified/computed color space. `xyz` alone is an
   alias for `xyz-d65`.
8. During an actual cross-space conversion, missing components are first
   replaced by zero. Thus conversion cannot both apply the D50→D65 matrix and
   preserve the original `none` markers in a D65 triple.

## 2. Frozen Phase-A representation and the two non-representable cases

The public `CssColorSpace` union and copied color model contain exactly the
thirteen Phase-A spaces. They contain `xyz` but no `xyz-d50`, and contain
`display-p3` but no `display-p3-linear`. `SpaceId`, `ChannelsBySpace`, the
factory set, and `CSS_COLOR_SPACES` have the same omissions.

### 2.1 `color(xyz-d50 none 0 0)`

Color 4 accepts `none` in every modern component. A conforming typed value can
preserve the source as:

```text
{ space: "xyz-d50", channels: ["none", 0, 0], alpha: 1 }
```

The frozen Phase-A union cannot express that value. Its current numeric-only
compatibility lowering converts D50 coordinates to a D65 `space:"xyz"` value.
For a missing component, Color 4's conversion algorithm replaces `none` with
zero before matrix multiplication. Because every D65 output coordinate is a
linear combination of all three D50 inputs, there is no coordinate-wise rule
such as "adapt concrete channels and leave the missing slot as `none`" that is
both mathematically valid and missingness-preserving.

Therefore these three tempting repairs are all wrong:

- substituting zero and returning three D65 numbers loses `none`;
- adapting only the concrete slots and copying `none` to the same index invents
  a non-colorimetric transform;
- returning `{space:"xyz", channels:["none",0,0]}` mislabels D50 coordinates as
  D65.

Research disposition: preserve the current Phase-A concrete D50→D65 lowering
and its legacy rejection of D50 missing components; record that rejection as a
named Phase-B RED, not as spec validity. PB0 must freeze a distinct `xyz-d50`
carrier (or an equally lossless tagged color-expression node), and PB5's
`parseCssColorExpression` must accept and preserve `none`. This agrees with
`ADDENDA-02`'s rule that PB5 owns the L4 expression surface while the legacy
concrete door remains unchanged.

Exact PB5 fixtures after its type decision:

| source | required L4 semantic value |
|---|---|
| `color(xyz-d50 none 0 0)` | D50 space; channels `["none",0,0]`; alpha `1` |
| `color(xyz-d50 0 none 0)` | D50 space; channels `[0,"none",0]`; alpha `1` |
| `color(xyz-d50 0 0 none)` | D50 space; channels `[0,0,"none"]`; alpha `1` |
| `color(xyz-d50 none none none / none)` | D50 space; all channels and alpha missing |

Conversion of those values to another space may replace missing components by
zero per `#color-conversion`; parsing/serialization must not do so merely to fit
the Phase-A type.

### 2.2 `color(display-p3-linear .1 .2 .3)`

Both pinned Color 4 and Color 5 include `display-p3-linear` in
`<predefined-rgb>`. Color 4 also gives it a normative predefined-space section
and six named WPT references. The exact valid source form is
`color(display-p3-linear .1 .2 .3)`, not a direct
`display-p3-linear(...)` function.

Current LIVE and mirror both reject that valid source with
`css_syntax / expected:["CSS color space"]` because neither color model can
construct the missing space. This is an exact source/type incompatibility, not
an ordinary dispatch omission. PB0 must decide whether the L4 node extends the
shared `SpaceId`/factory model or uses a separate tagged color-expression
carrier; PB5 then parses and canonically serializes the spelling. No W2-only
cast to `display-p3`, `srgb-linear`, or an untyped string is valid.

## 3. Recommended correction rows (research labels only)

These labels are recommendations for the harden/addenda seats. They are not
authority.

### R19 — exact legacy RGB/HSL syntax

For comma-separated `rgb()`/`rgba()`, the three channels must be homogeneous:
all numbers or all percentages. For comma-separated `hsl()`/`hsla()`, S and L
must each be percentages. No legacy channel or alpha may be `none`. Alpha may
be a number or percentage and is parsed-value clamped under R20.

Aliases do not change grammar: both `rgb` and `rgba` accept the same legacy and
modern RGB syntax; both `hsl` and `hsla` accept the same legacy and modern HSL
syntax.

Delimiter-sensitive controls are mandatory:

| sources | terminal result |
|---|---|
| `rgb(1,2,3)`, `rgba(1%,2%,3%,50%)` | accept |
| `rgb(1,2%,3)`, `rgba(1%,2,3%)` | reject `css_syntax` |
| `rgb(none,2,3)`, `rgba(1,2,3,none)` | reject `css_syntax` |
| `hsl(120,50%,50%)`, `hsla(.5turn,25%,75%,.5)` | accept |
| `hsl(120,50,50)`, `hsla(120,50%,50)` | reject `css_syntax` |
| `hsl(none,50%,50%)`, `hsla(120,50%,50%,none)` | reject `css_syntax` |
| `rgb(1 2% 3)`, `hsl(120 50 50)`, `hsl(none 50% 50% / none)` | accept modern syntax; mixed types/`none` are legal without commas |

Current evidence: LIVE and mirror share the mixed-RGB, legacy component-`none`,
and legacy HSL-number defects. For legacy alpha `none`, LIVE already rejects
while mirror accepts, so those are zero-whitelist mirror defects inside the
same row.

### R20 — parsed-value alpha and RGB clamping

Scale percentages first, clamp numeric alpha to `[0,1]`, and clamp numeric RGB
channels to `[0,255]`. `none` remains `none`. Do not clamp `color()` coordinates.

| exact source | required Phase-A value |
|---|---|
| `rgb(300 -10 20)` | `rgb [255,0,20] / 1` |
| `rgb(120% -10% 20%)` | `rgb [255,0,51] / 1` |
| `rgba(300,-10,20,200%)` | `rgb [255,0,20] / 1` |
| `rgb(1 2 3 / 2)` | `rgb [1,2,3] / 1` |
| `rgb(1 2 3 / -10%)` | `rgb [1,2,3] / 0` |
| `rgb(none 2 3 / none)` | `rgb ["none",2,3] / "none"` |
| `color(display-p3 2 -1 .5 / 2)` | `display-p3 [2,-1,.5] / 1`; coordinates retained, alpha clamped |

LIVE and mirror currently retain out-of-range RGB values and reject
out-of-range alpha through the factory. Those are common-mode spec defects.

### R21 — hue normalization and negative HSL saturation

After unit conversion, normalize every concrete HSL/HWB/LCH/OkLCh hue with
`((h % 360) + 360) % 360`. Preserve `none`. For HSL only, apply R6's `/100`
number scaling and then clamp negative saturation to zero. Do not invent an
upper saturation clamp, an HSL-lightness clamp, or HWB white/black clamps; the
pinned source does not authorize them.

| exact source | required Phase-A value |
|---|---|
| `hsl(720 -10 50)` | `hsl [0,0,.5] / 1` |
| `hsl(-540 -10% 50%)` | `hsl [180,0,.5] / 1` |
| `hsl(720,-10%,50%)` | legacy accept, `hsl [0,0,.5] / 1` |
| `hwb(720 10 20)` | `hwb [0,.1,.2] / 1` |
| `lch(50 20 1turn)` | `lch [50,20,0] / 1` |
| `oklch(.5 .1 -540)` | `oklch [.5,.1,180] / 1` |
| `hsl(none none 50% / none)` | missing hue/saturation/alpha remain `none` |

### R22 — perceptual-space lightness and chroma clamps

Clamp concrete Lab/LCH lightness to `[0,100]`; clamp concrete Oklab/OkLCh
lightness to `[0,1]`; clamp only the lower bound of LCH/OkLCh chroma to zero.
Scale percentages to the existing Phase-A canonical units before clamping.
Preserve `none`; leave Lab/Oklab a/b and positive chroma unbounded.

| exact source | required Phase-A value |
|---|---|
| `lab(150% 0 0)` | `lab [100,0,0] / 1` |
| `lab(-5 0 0)` | `lab [0,0,0] / 1` |
| `lch(-5 -2 720)` | `lch [0,0,0] / 1` |
| `lch(150% -10% 1turn)` | `lch [100,0,0] / 1` |
| `oklab(2 0 0)` | `oklab [1,0,0] / 1` |
| `oklab(-1 0 0)` | `oklab [0,0,0] / 1` |
| `oklch(-1 -.1 -540)` | `oklch [0,0,180] / 1` |
| `oklch(none none none / none)` | every missing component remains `none` |

### R23/R24 — named Phase-B REDs, not W2 implementation rows

- **R23:** D50 missing components require a representable `xyz-d50` L4 node;
  PB0 type decision, PB5 implementation, no lossy Phase-A approximation.
- **R24:** `display-p3-linear` is present in the exact pinned Color 4/5 grammar
  but absent from the frozen color model; PB0 type decision, PB5 implementation.

If the harden seat chooses different identifiers, it must preserve these two
terminal dispositions and must not imply that W2 can solve them without a type
decision.

## 4. Existing-authority repairs (no new semantic rows)

### D-W2-1 — exact unsupported-head diagnostic envelope

`fnHead` accepts leading `_` and `-`, while LIVE's Phase-A color-call envelope
begins with an ASCII letter. Current exact projections are:

| source | LIVE `parseCssColor` | mirror `parseCssColor` | required mirror |
|---|---|---|---|
| `_()` | reject `css_syntax`, `expected:["color"]`, span `0..3`, actual `_()` | rejects with `expected:["CSS color"]` | exact LIVE projection |
| `-x()` | reject `css_syntax`, `expected:["color"]`, span `0..4` | rejects with `expected:["CSS color"]` | exact LIVE projection |
| `--x()` | reject `css_syntax`, `expected:["color"]`, span `0..5` | rejects with `expected:["CSS color"]` | exact LIVE projection |
| `foo(1 2 3)` | reject `css_syntax`, `expected:["CSS color"]` | same | retain |

This is spec-neutral ParseIssue fidelity under existing W2 authority. The KISS
repair is one ASCII-letter code-point check on the already-trimmed raw input
before unsupported-head routing; it must not add a second function parser.
Escaped and non-ASCII function names remain PB1 replay material.

The W1 distinction is intentional: `_rgb(1 2 3)` and `-rgb(1 2 3)` are not
colors, but `parseCssValue`/`parseCssValues` currently accept them as generic
calls. The diagnostic repair must not blacklist those generic calls.

### D-W2-2 — serializer no-throw hardening

No color semantic decision is involved. `ADDENDA-01` already requires every
public `/css` entry to return on any input. Current `serializeCssColor` throws
from getters, proxies, and revoked proxies while inspecting `space`,
`channels`, or `alpha`.

Required hostile fixtures are a throwing getter for each property, a
throw-on-get proxy, and a revoked proxy. Each must return exactly:

```text
{ ok:false, error:{ code:"color_invalid_input" } }
```

The parsimonious implementation is one outer `try`/`catch` around validation
and serialization, returning that existing error on an exception. Do not add
proxy detection, clone hostile objects, or change ordinary invalid/non-finite/
out-of-range error results.

### D-W2-3 — reproducible H-8 evidence

The prose-only 4,158-case sweep is not close evidence. Retain an executable
generated bank in the tests (or a checked fixture) with count and content
digest. Exact terminal outcomes, not a broad textual R6/R9 classifier, are the
gate.

### D-W2-4 — W1 color-seam replay

W2 changes values consumed by W1. Every W2 accept/reject correction must be
projected through `parseCssScalar`, `parseCssValue`, and `parseCssValues`; the
four current seam examples are insufficient. This is a dependency replay, not
a new W1 feature.

## 5. Complete H-8 matrix and rejection supplement

Define `C(space,channels,alpha)` as the exact `CssColor` object and `S(C)` as a
color scalar. The retained 13-space matrix is:

| output | modern accept | `none` accept | legacy arm |
|---|---|---|---|
| rgb | `rgb(12 34 56 / 50%)` | `rgb(none none none / none)` | accept `rgb(12,34,56)` |
| hsl | `hsl(120deg 25% 75% / 50%)` | `hsl(none none none / none)` | accept `hsl(120deg,25%,75%)` |
| hwb | `hwb(120deg 10% 20% / 50%)` | `hwb(none none none / none)` | reject `hwb(0,0%,0%)` |
| lab | `lab(50% 10% -10% / 50%)` | `lab(none none none / none)` | reject `lab(0%,0,0)` |
| lch | `lch(50% 20% 30deg / 50%)` | `lch(none none none / none)` | reject `lch(0%,0,0deg)` |
| oklab | `oklab(50% 10% -10% / 50%)` | `oklab(none none none / none)` | reject `oklab(0,0,0)` |
| oklch | `oklch(50% 10% 30deg / 50%)` | `oklch(none none none / none)` | reject `oklch(0,0,0deg)` |
| xyz | `color(xyz .1 .2 .3 / 50%)` | `color(xyz none none none / none)` | reject `color(xyz,0,0,0)` |
| srgb-linear | `color(srgb-linear .1 .2 .3 / 50%)` | `color(srgb-linear none none none / none)` | reject `color(srgb-linear,0,0,0)` |
| display-p3 | `color(display-p3 .1 .2 .3 / 50%)` | `color(display-p3 none none none / none)` | reject `color(display-p3,0,0,0)` |
| a98-rgb | `color(a98-rgb .1 .2 .3 / 50%)` | `color(a98-rgb none none none / none)` | reject `color(a98-rgb,0,0,0)` |
| prophoto-rgb | `color(prophoto-rgb .1 .2 .3 / 50%)` | `color(prophoto-rgb none none none / none)` | reject `color(prophoto-rgb,0,0,0)` |
| rec2020 | `color(rec2020 .1 .2 .3 / 50%)` | `color(rec2020 none none none / none)` | reject `color(rec2020,0,0,0)` |

Also retain the Phase-A color-space spelling aliases:

- `color(srgb 1 0 0)` → `C("rgb",[255,0,0],1)`;
- `color(xyz-d65 .1 .2 .3)` and `color(xyz .1 .2 .3)` → the same D65
  `C("xyz",[.1,.2,.3],1)`;
- concrete `color(xyz-d50 .1 .2 .3)` → the existing compatibility value
  `C("xyz",[0.10990542411922578,0.20547454104044965,0.39623964949930557],1)`;
- missing `xyz-d50` and `display-p3-linear` are named PB5 REDs from §2, not
  false W2 accepts.

### Canonical 45-source reject supplement

The following ordered JSON array is the exact source payload. SHA-256 of its
compact `JSON.stringify` bytes is
`7dd4d3d350018c5da4159cef0699493b2df4032d6654080729f98594e0f1aa26`.

```json
["hwb(0,0%,0%)","lab(0%,0,0)","lch(0%,0,0deg)","oklab(0,0,0)","oklch(0,0,0deg)","color(xyz,0,0,0)","color(srgb-linear,0,0,0)","color(display-p3,0,0,0)","color(a98-rgb,0,0,0)","color(prophoto-rgb,0,0,0)","color(rec2020,0,0,0)","rgb(1,2%,3%)","rgb(1%,2,3%)","rgb(1%,2%,3)","rgb(1,2,3%)","rgb(1,2%,3)","rgb(1%,2,3)","rgba(1,2%,3%)","rgba(1%,2,3%)","rgba(1%,2%,3)","rgba(1,2,3%)","rgba(1,2%,3)","rgba(1%,2,3)","rgb(none,2,3)","rgb(1,none,3)","rgb(1,2,none)","rgba(none,2,3)","rgba(1,none,3)","rgba(1,2,none)","rgb(1,2,3,none)","rgba(1,2,3,none)","hsl(none,50%,50%)","hsl(120,none,50%)","hsl(120,50%,none)","hsla(none,50%,50%)","hsla(120,none,50%)","hsla(120,50%,none)","hsl(120,50%,50%,none)","hsla(120,50%,50%,none)","hsl(120,50,50)","hsl(120,50,50%)","hsl(120,50%,50)","hsla(120,50,50)","hsla(120,50,50%)","hsla(120,50%,50)"]
```

All 45 terminal outcomes are spec rejection. Current measured projections:

| subgroup | count | LIVE accepts | mirror accepts | route |
|---|---:|---:|---:|---|
| modern-only comma forms | 11 | 11 | 0 | existing R9; mirror already correct |
| mixed legacy RGB, both aliases | 12 | 12 | 12 | new R19 common-mode defect |
| legacy `none`, all slots/aliases | 16 | 12 | 16 | 12 common-mode defects; 4 mirror-only alpha defects |
| legacy HSL number S/L patterns | 6 | 6 | 6 | new R19 common-mode defect |
| **total** | **45** | **41** | **34** | all must reject after repair |

This supplement, the 13-row accept/none matrix, hex 3/4/6/8, exhaustive named
colors, guards, R1/R3/R6/R9, R20–R22, and serializer round-trips form the close
bank. A count without these exact branches is insufficient.

## 6. W1 seam replay contract

For every accepted color fixture yielding `C`, require:

```text
parseCssScalar(source) = S(C)
parseCssValue(source)  = S(C)
parseCssValues(source) = {kind:"list",separator:"space",items:[S(C)]}
```

For every rejected color-function fixture in the 45-source bank, require all
three W1 doors to reject with `css_syntax / expected:["scalar"]` over the full
input. For every R20–R22 clamp fixture, require the exact transformed `C` at all
three doors, not merely `ok:true`. Then require:

```text
parseCssColor(serializeCssColor(C).value) = C
```

for each serializable transformed value. The normalization must therefore occur
before the `CssColor` reaches W1 or the serializer; neither consumer should
repeat color semantics.

The generic-call boundary also needs explicit replay:

- `_rgb(1 2 3)` and `-rgb(1 2 3)` remain non-colors;
- `parseCssScalar` rejects them as scalars;
- `parseCssValue` accepts each as an ordinary `CssCall`;
- `parseCssValues` wraps that call in the singleton space list.

## 7. KISS implementation direction

1. Preserve the single `fnHead` dispatch and current function-row table.
2. Add private legacy parsing for RGB and HSL only. Inspect `numUnit.unit`
   before scaling so RGB can require all `""` or all `"%"`; use a percentage-
   only leaf for legacy HSL S/L. Do not widen `Channel` or the public AST merely
   to remember token kind.
3. Split alpha by grammar mode: legacy accepts numeric/percentage only;
   modern additionally accepts `none`. Apply one shared numeric clamp.
4. Add tiny per-row parsed-value transforms: RGB clamp; HSL hue+saturation;
   HWB hue; Lab lightness; LCH lightness+chroma+hue; Oklab lightness; OkLCh
   lightness+chroma+hue. Transform concrete numbers only.
5. Keep `color()` coordinates unbounded. Keep concrete D50 compatibility
   adaptation exactly as-is. Do not touch D50 missing or P3-linear until the
   PB0/PB5 type route.
6. Add the one raw-head diagnostic check and one serializer catch boundary.
7. Retain the generated bank and W1 projections in tests. Avoid a new scanner,
   color class hierarchy, token-kind public union, or duplicate factory set.

This direction should be materially smaller than retrofitting every channel
parser with a speculative generic schema, while preserving the row structure
PB5 can later reuse.

## 8. Dependencies and mandatory replays

- W2 remains rejected until the semantic addendum is twice-challenged,
  gestalt-adjudicated, owner-ratified, implemented, and twice-audited afresh.
- W1's color seam and W4's close remain downstream of that accepted W2 result.
- No W0 replay is required if repair stays in `grammar/color.ts`,
  `serialize.ts`, and W2/W1 tests. Any change to `lexeme.ts`, shared splitters,
  result shape, color factories, or public types reopens the appropriate
  structural/type checks.
- PB1 must replay the entire W2 close bank and W1 projections after its sole
  preprocessing/token foundation lands, including comments, escaped function
  names, escaped color-space identifiers, significant-token boundaries, and
  original-source diagnostics. W2 must not implement those seams locally.
- PB5 depends on accepted W2 and must inherit R1/R3/R6/R9 plus the ratified
  R19–R22 semantics. PB0/PB5 own R23/R24 and must not claim them from a lossy
  Phase-A lowering.
- The serializer hostile bank is cross-cutting hardening evidence and should be
  retained when W4's `serializeCssValue` composes the color serializer.

## 9. Browser/CSSOM witness

I attempted the requested browser witness through the designated in-app
browser-control path. Browser discovery returned no available browser backend,
so `CSS.supports`, specified/computed-style serialization, and Typed OM could
not be measured in this seat. I did not substitute standalone Playwright or an
unrelated UI driver.

When a browser is available, the post-repair witness should record at least:

- `CSS.supports("color", source)` for every R19 accept/reject boundary and both
  PB5 REDs;
- specified-style and `getComputedStyle(...).color` for each R20–R22 clamp;
- serialization of `color(xyz-d50 none 0 0)` and
  `color(display-p3-linear .1 .2 .3)` without treating computed text as a
  substitute for the pinned grammar;
- engine identity/version, because browser support does not arbitrate against
  the immutable spec.

## 10. Formation handoff

The harden seat should challenge, at minimum:

1. whether R19's alias and delimiter cross-product is complete;
2. whether R20–R22 apply transformations in canonical-unit order and avoid
   unauthorized upper clamps;
3. whether R23's PB0/PB5 disposition is required by the frozen type rather than
   a deferral convenience;
4. whether the 45-source digest plus exact accept/normalization matrix is a
   sufficient reproducible H-8 denominator;
5. whether direct repairs D-W2-1–4 truly require no new semantics;
6. whether PB1, W1, W4, and PB5 replay edges are all explicit.

Research seal: **complete, proposed, non-authoritative; no implementation and
no production execution.**
