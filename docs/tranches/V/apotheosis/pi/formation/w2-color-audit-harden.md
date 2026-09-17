# V·π W2 color audit correction — harden seat

status: `HARDEN_COMPLETE_PROPOSED_NOT_AUTHORITY`

model_served: `gpt-5.6-terra` (inherited Codex child route; no model override
was requested, and the service did not expose a more specific effort label;
this receipt does not claim Opus)

date: 2026-07-21

Target: the focused W2 correction formed from `W2-AUDIT-A.md`,
`W2-AUDIT-B.md`, and `formation/w2-color-audit-research.md`.

This is the harden leg only. It changes no parser, serializer, test, public
type, production source, Phase-B gate, or owner authority. Its dispositions
are the controlling recommendations to the addenda writer, but they become
implementation authority only after the complete focused addendum is twice
challenged, gestalt-adjudicated, and explicitly ratified by the owner.

## 0. Harden verdict

**ACCEPT the focused formation with amendments; keep W2 REJECTED.** The two
audits establish four new Phase-A semantic corrections, two lossless Phase-B
representation rows, one scanner/substitution diagnostic row, and one exact
canonical-serialization row. They also establish four direct repairs already
authorized by the standing sheets.

The research seat is substantially correct, with three required amendments:

1. Its lossless PB0/PB5 disposition for `xyz-d50` missing components is
   correct and overrides Audit A/B's proposed W2 lowering. A frozen
   `space:"xyz"` triple cannot preserve both D50 provenance and missingness.
   W2 must not invent a lossy or colorimetrically false lowering.
2. Audit B's token-insensitive `from` and nested `var()`/`env()` findings are a
   real semantic diagnostic class omitted by research. They become R25, but
   their implementation is PB1/PB4-owned; W2 must not grow another scanner.
3. Audit B is right that the asserted structural round trip is false for
   ordinary high-precision parser outputs. The repair is not an unspecified
   tolerance. R26 replaces it with an exact, one-cycle canonical fixed point
   over the parser-result domain while retaining the inherited 12-decimal
   spelling policy.

The hardened split is:

| class | rows/work | implementation authority |
|---|---|---|
| new Phase-A W2 semantics | R19–R22, R26 | owner ratification, then W2 prototype repair |
| named lossless L4 REDs | R23–R24 | owner ratifies the disposition now; PB0 freezes the carrier and PB5 implements only after its own gates |
| token/substitution diagnostic semantics | R25 | owner ratifies the result now; PB1 supplies tokens and PB4 supplies substitution ownership before it can turn GREEN |
| already-authorized direct repair | D-W2-1–D-W2-4 | no new semantic authority; may land as focused W2 hardening and evidence work |

No row widens the frozen 33-type + 19-runtime surface. No row authorizes
production execution.

## 1. Namespace ruling

Reserve **R19 through R26** atomically for this focused color addendum:

| row | title | terminal owner |
|---|---|---|
| R19 | exact legacy RGB/HSL grammar | W2 |
| R20 | parsed-value alpha and RGB clamping | W2 |
| R21 | hue normalization and negative HSL saturation | W2 |
| R22 | perceptual-space lightness and chroma clamping | W2 |
| R23 | lossless `xyz-d50` missing components | PB0 → PB5 |
| R24 | `display-p3-linear` representation | PB0 → PB5 |
| R25 | token-position relative-color and nested-substitution diagnostics | PB1 → PB4/W2 replay |
| R26 | 12-decimal canonical fixed-point serialization | W2; composed replay in W1/W4 |

R13–R18 are already assigned by the W1 focused addendum. R19 is therefore
the correct next global number. This reservation must be made in the addendum
before any parallel W3 formation receives global `R` labels. W3 should retain
wave-scoped provisional identifiers and begin only at the next root-confirmed
free number after R26. If root cannot serialize the namespaces, the writer
must use `W2-C1…W2-C8` temporarily rather than publish colliding global rows.

## 2. Exact semantic dispositions

### H-R19 — ACCEPT: legacy grammar is delimiter-sensitive and homogeneous

For comma-separated `rgb()`/`rgba()`, all three channels are numbers or all
three are percentages. For comma-separated `hsl()`/`hsla()`, saturation and
lightness are percentages. No legacy component, including alpha, accepts
`none`. Legacy alpha accepts a number or percentage and then uses R20. Function
aliases do not alter grammar.

Modern space-separated syntax remains different: it permits mixed numeric and
percentage channels and permits `none`. R6's number-as-percentage scaling for
modern HSL/HWB does not authorize number-valued legacy HSL saturation or
lightness.

Terminal controls:

| source | required result |
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

The exact reject denominator is the ordered 45-source JSON payload in research
§5. Its compact-JSON SHA-256 is
`7dd4d3d350018c5da4159cef0699493b2df4032d6654080729f98594e0f1aa26`.
All 45 rows reject after repair. This bank includes the eleven modern-only
comma rejections already correct under R9; retaining them prevents R19 from
accidentally widening the nonlegacy families.

KISS ruling: retain the function row table. Add private RGB/HSL legacy leaves
that inspect `numUnit.unit` before scaling. Do not add a public token-kind
union, a second function parser, or a parallel color engine.

### H-R20 — ACCEPT: clamp parsed alpha and RGB, not `color()` coordinates

Apply percentage scaling first. Then:

- clamp concrete alpha to `[0,1]` for every accepted color grammar;
- clamp concrete direct RGB channels to `[0,255]`;
- preserve `none` in modern channels/alpha;
- leave `color()` coordinates unbounded, including RGB-profile and XYZ
  coordinates; only its alpha is clamped.

Exact fixtures:

| source | required Phase-A value |
|---|---|
| `rgb(300 -10 20)` | `rgb [255,0,20] / 1` |
| `rgb(120% -10% 20%)` | `rgb [255,0,51] / 1` |
| `rgba(300,-10,20,200%)` | `rgb [255,0,20] / 1` |
| `rgb(1 2 3 / 2)` | `rgb [1,2,3] / 1` |
| `rgb(1 2 3 / -10%)` | `rgb [1,2,3] / 0` |
| `rgb(none 2 3 / none)` | `rgb ["none",2,3] / "none"` |
| `color(display-p3 2 -1 .5 / 2)` | `display-p3 [2,-1,.5] / 1` |

This is parsed-value normalization. It does not widen direct serializer input:
a hand-built color whose alpha is outside `[0,1]` continues to return
`color_out_of_range`; authored CSS reaches the serializer only after R20 has
clamped it.

### H-R21 — ACCEPT: normalize hue; lower-clamp only HSL saturation

After angle-unit conversion, normalize each concrete hue in HSL, HWB, LCH,
and OkLCh by `((h % 360) + 360) % 360`. Preserve `none`. For HSL saturation,
perform the existing canonical-unit scaling first and clamp only its lower
bound to zero.

Do not add an HSL saturation upper clamp, an HSL lightness clamp, or HWB
white/black clamps: the pinned Color 4 parsed-value rules do not authorize
them.

| source | required Phase-A value |
|---|---|
| `hsl(720 -10 50)` | `hsl [0,0,.5] / 1` |
| `hsl(-540 -10% 50%)` | `hsl [180,0,.5] / 1` |
| `hsl(720,-10%,50%)` | legacy accept, `hsl [0,0,.5] / 1` |
| `hwb(720 10 20)` | `hwb [0,.1,.2] / 1` |
| `lch(50 20 1turn)` | `lch [50,20,0] / 1` |
| `oklch(.5 .1 -540)` | `oklch [.5,.1,180] / 1` |
| `hsl(none none 50% / none)` | retain missing hue/saturation/alpha |

### H-R22 — ACCEPT: exact perceptual lightness/chroma clamps

Scale percentages to the existing Phase-A canonical units, then:

- Lab/LCH lightness: clamp to `[0,100]`;
- Oklab/OkLCh lightness: clamp to `[0,1]`;
- LCH/OkLCh chroma: clamp its lower bound to zero only;
- preserve `none`;
- leave Lab/Oklab a/b and positive chroma unbounded.

| source | required Phase-A value |
|---|---|
| `lab(150% 0 0)` | `lab [100,0,0] / 1` |
| `lab(-5 0 0)` | `lab [0,0,0] / 1` |
| `lch(-5 -2 720)` | `lch [0,0,0] / 1` |
| `lch(150% -10% 1turn)` | `lch [100,0,0] / 1` |
| `oklab(2 0 0)` | `oklab [1,0,0] / 1` |
| `oklab(-1 0 0)` | `oklab [0,0,0] / 1` |
| `oklch(-1 -.1 -540)` | `oklch [0,0,180] / 1` |
| `oklch(none none none / none)` | retain every missing component |

The ordered 22-source payload formed by the seven R20 rows, seven R21 rows,
and eight R22 rows above has compact-JSON SHA-256
`3b9c26919decb811f8f65a3e34d3ab79fa25f27d83cf4e9305b0c2dfd82701fd`.
Before R19–R22 code, it is the retained born-RED semantic-normalization bank.
Every row asserts the complete exact value, not only `ok:true`.

### H-R23 — ACCEPT-DEFER: `xyz-d50` missingness requires a lossless L4 carrier

The auditors are correct that Color 4 accepts missing components in
`color(xyz-d50 …)`. They are not correct that W2 can conformingly lower those
values into the frozen `space:"xyz"` carrier.

The current concrete-only compatibility path converts D50 coordinates to D65.
For a missing component, conversion replaces missingness with zero and each
D65 output is a linear combination of all three D50 inputs. Consequently:

- replacing `none` with zero loses missingness;
- copying `none` to the same D65 slot is not a valid matrix conversion;
- labelling unadapted D50 coordinates as `space:"xyz"` misstates their space.

Phase-A W2 therefore retains concrete numeric D50→D65 adaptation and a named,
executable rejection for D50 missing components. That rejection is a frozen-
carrier compatibility limit, not a claim that the CSS spelling is invalid.

PB0 must freeze a distinct `xyz-d50` carrier or an equally lossless tagged L4
color-expression node. PB5 must then accept and preserve at least:

| source | required L4 value |
|---|---|
| `color(xyz-d50 none 0 0)` | D50; `['none',0,0]`; alpha `1` |
| `color(xyz-d50 0 none 0)` | D50; `[0,'none',0]`; alpha `1` |
| `color(xyz-d50 0 0 none)` | D50; `[0,0,'none']`; alpha `1` |
| `color(xyz-d50 none none none / none)` | D50; all components and alpha missing |

All seven nonempty three-channel missingness permutations plus the all-missing
alpha row are PB5's minimum bank. Neither R23 nor owner ratification authorizes
PB5 code before PB0 and the Phase-B owner gates.

### H-R24 — ACCEPT-DEFER: `display-p3-linear` is PB0/PB5 type growth

`color(display-p3-linear .1 .2 .3)` is valid in the immutable pinned Color 4
and Color 5 sources. The frozen Phase-A color union and factory model contain
`display-p3` and `srgb-linear`, but not `display-p3-linear`; neither existing
space is a valid cast target.

W2 retains an executable named RED/rejection because it cannot produce a
truthful frozen value. PB0 inventories and freezes the lossless L4 carrier;
PB5 adds parser, serializer, and typed-expression coverage. This is not a W2
dispatch fix and does not permit widening the Phase-A 52-export contract.

R23 and R24 amend any provisional PB5 wording that says the legacy concrete
door is simply "unchanged": PB5 consumes the accepted corrected W2 semantics,
while adding these two representationally new L4 arms separately.

### H-R25 — ACCEPT-DEFER: diagnostic guards operate on tokens and grammar position

The current `containsWord(...,"from")` behavior is common-mode wrong. A
relative-color guard applies only when the decoded first significant token of
a recognized color function's argument grammar is the identifier `from` in
the relative-color position. A hyphenated or custom-property-like identifier
containing those letters is not that token.

Likewise, an unresolved nested `var()` or `env()` function token at any
component-value depth requires context and must not be reported as ordinary
malformed concrete color syntax.

Exact terminal projections after PB1/PB4 ownership lands:

| source | required legacy-door result |
|---|---|
| `color(not-from 1 2 3)` | `css_syntax`, `expected:["CSS color space"]` |
| `color(--from 1 2 3)` | `css_syntax`, `expected:["CSS color space"]` |
| `rgb(not-from 1 2)` | `css_syntax`, `expected:[]` |
| `rgb(from red r g b)` | `color_context_required`, `expected:["context-free color"]` |
| `color(from red srgb r g b)` | same context-required result |
| `rgb(var(--x) 0 0)` | same context-required result |
| `color(srgb var(--x) 0 0)` | same context-required result |
| `rgb(env(--x) 0 0)` | same context-required result |

The full result keeps the source-wide `start:0`, `end:source.length`, and
`actual:source` Phase-A diagnostic projection. PB1 later proves decoded escapes,
comments, original/processed spans, and significant-token position. PB4 owns
the typed substitution/provider path; the frozen concrete door continues to
return `color_context_required` when resolution context is absent.

R25 authorizes **no pre-PB1 scanner patch**. A raw substring, regex, or second
balanced walk would merely create another CSS tokenizer. Until PB1, these rows
remain named executable `DEFERRED_PB1_PB4` evidence and prevent W2 from being
called tranche-final.

The ordered twelve-source diagnostic payload (the four direct head fixtures in
§3 plus the eight rows above) has compact-JSON SHA-256
`3397ba83cd860a791acfae961429e2ca2e93c0702afc4de42d2fc2076e9d6b27`.

### H-R26 — ACCEPT: exact canonical fixed point, not lossless float identity

The inherited formatter rounds each emitted numeric token with
`Number(value.toFixed(12)).toString()`. Percent-scaled fields are multiplied
before that formatting. Therefore exact structural identity
`parse(serialize(C)) === C` is false for high-precision parser outputs,
including numeric D50 adaptation. The gate must not hide this fact behind a
vague epsilon and must not silently change the established spelling policy.

Define, for a color `C`:

```text
S(C) = serializeCssColor(C).value
T(C) = parseCssColor(S(C)).value
```

The R26 domain is exact: `C` is a successful `parseCssColor(source)` value and
`serializeCssColor(C)` succeeds. After R19–R22, parser-produced colors are
already semantically normalized; R26 concerns decimal spelling only.

For every value in that domain require:

```text
serializeCssColor(T(C)) === serializeCssColor(C)
T(T(C)) deep-equals T(C)
```

Thus one serialization cycle defines the canonical value and both the string
and AST are exact fixed points thereafter. No tolerance participates in the
pass/fail decision. When `T(C)` already deep-equals `C`, record the stronger
lossless case, but do not require it for values outside the 12-decimal lattice.

The exact 24-source stress bank is the cartesian product, in the listed
space-major order:

```text
spaces = [srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz]
tuples = [.1 .2 .3,
          0.0000000000001 0 0,
          0.12345678901234 .2 .3,
          1.0000000000001 2 3]
source = color(<space> <tuple>)
```

Compact-JSON SHA-256 of the resulting ordered array is
`2ddd02cc41f814b0874520d14f575d1895bd02f1ceb451a661b1ea0b121ec3c2`.
The current old identity assertion fails exactly 18/24 rows: the `.1 .2 .3`
row is lossless in each space and the other three rows canonicalize. The new
gate must retain that 18/24 observation and prove exact fixed-point behavior
for all 24. It must also include `rgb(1.0000000000001 2 3)`,
`color(srgb-linear 0.0000000000001 0 0)`, concrete numeric
`color(xyz-d50 .1 .2 .3)`, a nontrivial 8-digit hex alpha, and at least one
R20–R22 transformed color.

Direct serializer inputs that were not produced by the parser remain covered
by serializer validation/no-throw tests, not by a false semantic round-trip
promise.

## 3. Direct repairs under existing authority

These repairs need maintained tests and fresh audit, but do not change color
semantics and therefore do not need new `R` rows.

### D-W2-1 — unsupported function-head diagnostic envelope

Existing ParseIssue fidelity requires:

| source | exact result |
|---|---|
| `_()` | `css_syntax`, `expected:["color"]`, span `0..3`, actual `_()` |
| `-x()` | `css_syntax`, `expected:["color"]`, span `0..4`, actual `-x()` |
| `--x()` | `css_syntax`, `expected:["color"]`, span `0..5`, actual `--x()` |
| `foo(1 2 3)` | `css_syntax`, `expected:["CSS color"]`, full span/actual |

The first three are outside the Phase-A color-call envelope; the fourth is a
valid envelope with an unsupported function. This is an exact LIVE-contract
diagnostic repair, not E-3 semantics. Add one ASCII-letter check at the existing
head boundary; do not parse the head twice. Escaped/non-ASCII function heads
remain PB1-owned. Do not change W1 generic-call acceptance for `_rgb(...)` or
`-rgb(...)`.

### D-W2-2 — serializer any-input no-throw

`ADDENDA-01` already requires every `/css` entry to return on any runtime
input. Wrap validation plus serialization in one outer exception boundary.
On accessor/proxy/sparse-shape exceptions return exactly:

```text
{ ok:false, error:{ code:"color_invalid_input" } }
```

The maintained hostile bank is identified by this ordered fixture-ID payload:

```json
["throwing-space-getter","throwing-channels-getter","throwing-alpha-getter","throw-on-get-color-proxy","revoked-color-proxy","revoked-channels-proxy","throwing-channel-slot-getter","sparse-three-slot-channels","self-cyclic-extra-property"]
```

Its compact-JSON SHA-256 is
`419b7ffb365b7cec8373ace1004a06da55c3f341a7d67abc678272af1403513d`.
The first eight fixtures must not throw and must return `color_invalid_input`.
The ninth is a well-shaped ordinary color carrying an irrelevant self-cycle;
it must not hang or throw and must serialize normally. Retain primitive,
symbol, non-finite, and out-of-range cases: inert invalid shapes return
`color_invalid_input`, non-finite numeric fields return `color_non_finite`, and
direct alpha outside `[0,1]` returns `color_out_of_range`.

Do not attempt proxy detection, hostile cloning, recursive cycle walking, or
per-property catches.

### D-W2-3 — persistent H-8 corpus

Replace the prose-only 4,158 claim with executable, source-controlled evidence.
The close bank must retain:

1. the thirteen output-space modern/`none`/legacy-applicability matrix;
2. the 45-source reject supplement and digest under R19;
3. the 22-source normalization payload and digest under R20–R22;
4. hex 3/4/6/8, transparent, all current `color()` aliases, and dynamic
   exhaustive named-color coverage with its source-table digest;
5. the R25 diagnostic payload, the R26 precision payload, R1/R3/R6/R9, the
   hostile serializer IDs, and the two named PB5 RED families;
6. deterministic generation code or a checked fixture whose ordered
   compact-JSON bytes are rehashed in the test.

Every row asserts an exact terminal outcome. LIVE comparison remains the
primary differential, but common-mode spec corrections are asserted against
the immutable spec result and named R row; a broad punctuation classifier may
not swallow them.

Before repair, preserve the current projection beside each new expected
projection in the author receipt. That is the born-RED transcript. A mere
post-fix count is insufficient.

### D-W2-4 — complete W1 color replay

For every accepted W2 fixture producing `C`, require exact projections through
all three W1 doors:

```text
parseCssScalar(source) = scalar(color(C))
parseCssValue(source)  = scalar(color(C))
parseCssValues(source) = list(space,[scalar(color(C))])
```

For every R19 rejected color-function spelling, all three W1 doors reject
`css_syntax` / `expected:["scalar"]` over the complete input. For every
R20–R22 row, all three return the exact transformed `C`. R26 applies to each
serializable transformed value. Preserve the generic-call distinction from
D-W2-1.

Run the full W1 suite, not only a color seam subset. W1's independently
owner-gated TODO/deferred rows remain truthful and are not waived by this
replay.

## 4. Parsimony and implementation boundary

The implementation recommendation is deliberately small:

1. retain the single `fnHead` parse and name-keyed function-row table;
2. add RGB/HSL-only private legacy leaves over `numUnit` so unit kind is checked
   before conversion;
3. split legacy versus modern alpha acceptance, then share one numeric clamp;
4. apply tiny concrete-number transforms per existing row: RGB clamp; HSL
   hue/saturation; HWB hue; Lab L; LCH L/C/hue; Oklab L; OkLCh L/C/hue;
5. keep all `color()` coordinates unbounded and concrete D50 adaptation
   unchanged;
6. add the one raw envelope check and one outer serializer catch boundary;
7. keep exact generated banks in tests and reuse the existing W1 wrappers.

No second scanner, tokenizer, color hierarchy, factory family, public token
kind, public color space, speculative AST, or duplicated serializer is
authorized. If a repair requires `lexeme.ts`, `util.ts`, a public type, or the
color-model factory contract, stop and return through E-3/structural replay;
the present KISS design does not require those changes.

## 5. Dependencies and close semantics

- **W1:** replay the full repaired W2 bank through scalar/value/values. W1's
  color seam cannot close from the old four-row sample.
- **W4:** consume only accepted/canonical W2 values; replay R26 through
  `serializeCssValue` and retain the hostile composition boundary. W4 does not
  repeat color normalization.
- **PB1:** solely replaces raw preprocessing/token boundaries and replays the
  complete W2/W1 bank, including comments, escapes, CSS whitespace, decoded
  function/space names, significant-token `from`, and source-faithful spans.
- **PB4:** owns typed substitution/provider behavior. Until it supplies
  context, nested `var()`/`env()` remains `color_context_required` at the
  concrete legacy door.
- **PB5:** consumes accepted R19–R22/R26 semantics and adds lossless R23/R24
  carriers and L4 color expressions after PB0 and its owner gates.

A pre-PB1 W2 repair may be twice-audited and labelled
`PROVISIONAL_PHASE_A_ACCEPTED` only if R25 and all PB1 lexical rows remain
visible executable deferred gates. Tranche perfection cannot call the color
door final while R25, R23, or R24 is still deferred.

The complete required route is:

```text
focused addendum
  -> two independent adversarial challenges
  -> root gestalt adjudication
  -> explicit owner ratification of R19–R26
  -> D-W2-1…4 + W2-authorized R19–R22/R26 prototype repair
  -> mechanical gates + full persistent corpus + W1 replay
  -> two fresh independent E-1 audits
  -> provisional Phase-A verdict
  -> PB0/PB1/PB4/PB5 deferred rows later turn GREEN
  -> final tranche perfection verdict
```

## 6. Exact owner authorization requested

The addendum must ask the owner to authorize exactly:

1. the R19–R26 namespace reservation;
2. R19–R22 as the exact Phase-A W2 semantic correction set;
3. R26's exact one-cycle canonical fixed-point gate in place of lossless
   arbitrary-float identity, without changing the 12-decimal spelling policy;
4. R23/R24 as lossless PB0→PB5 type/surface rows, with no W2 approximation and
   no Phase-B code authority yet;
5. R25's exact token/substitution diagnostic results as
   `DEFERRED_PB1_PB4`, with no W2-local scanner;
6. the direct D-W2-1–4 repairs as already-authorized work, listed for scope
   clarity rather than presented as new semantic discretion;
7. the persistent digested denominators and mandatory W1/W4/PB1/PB5 replays;
8. the unchanged frozen 33-type + 19-runtime surface and prototype-only path.

Anything else—new color functions, widening `CssColorSpace`, relative-color
ASTs, substitution evaluation, a new numeric precision policy, browser-derived
semantics, or production wiring—is excluded and must return through its own
authority path.

## 7. Formation seal

The addenda writer may now draft the focused W2 correction sheet from these
dispositions. W2 remains **REJECTED**; R19–R26 remain **PROPOSED / NOT
RATIFIED**; the direct repairs are not evidence of wave acceptance; and no
semantic implementation is authorized by this harden artifact.

Harden seal: **complete, proposed, non-authoritative; recommendations frozen
for addenda drafting; no code and no production execution.**

---

## Controlling amendment — 2026-07-21 — R26 bounded canonicalization

status: `HARDEN_AMENDED_AFTER_ADDENDA_04_FRESH_A_REJECT`

Trigger: fresh `ADDENDA-04-AUDIT-A.md` challenged sheet SHA-256
`790a30eb42f1814b5ac2ed5027a9bbfaef7ffa2482c9496b669685565066dba8`
and supplied a valid percentage-backed counterexample to H-R26's universal
one-cycle claim.

This amendment is controlling wherever it conflicts with the original harden
text above. It changes only R26's precision denominator and fixed-point bound.
R19–R25, D-W2-1–D-W2-4 ownership, the frozen surface, KISS boundary, PB
deferrals, owner gate, and prototype-only restriction are unchanged. R26
remains proposed and unauthorized.

### A. Independent adjudication of the counterexample

The fresh-A witness reproduces exactly:

```text
source = hsl(10 9986.367914825678 3774.7846683487296 / .5)

C0.channels = [10, 99.86367914825678, 37.747846683487296]
S(C0)        = hsl(10deg 9986.367914825678% 3774.78466834873% / 50%)
C1.channels = [10, 99.86367914825678, 37.7478466834873]
S(C1)        = hsl(10deg 9986.367914825678% 3774.784668348731% / 50%)
C2.channels = [10, 99.86367914825678, 37.74784668348731]
S(C2)        = hsl(10deg 9986.367914825678% 3774.784668348731% / 50%)
C3           = C2
```

The source remains valid after R19–R22: it is modern syntax; hue is already
normalized; saturation is positive; alpha is in range; and neither HSL
saturation's upper bound nor HSL lightness is clamped. Therefore the original
H-R26 predicates `S(C1) === S(C0)` and `C2 deep-equals C1` are false on their
declared universal parser-result domain. Fresh Audit A's rejection is
confirmed.

### B. Complete numeric-branch decomposition

Let `F(x) = Number(x.toFixed(12)).toString()`. Every serializer/parser numeric
path is one of the following compositions after the idempotent R19–R22
semantic transforms:

| output arm | numeric fields | serializer/parser composition | hardened bound |
|---|---|---|---|
| RGB, including named/hex and `color(srgb …)` lowering | three channels | emit `F(x)`; parse the emitted number directly | direct; one cycle |
| HSL | hue | emit `F(x)deg`; parse angle; R21 normalizes | direct plus one idempotent normalization |
| HSL | saturation, lightness | emit `F(100*x)%`; parse the token and divide by 100 | percentage-backed; at most two cycles |
| HWB | hue | direct angle plus R21 normalization | direct plus one idempotent normalization |
| HWB | white, black | emit `F(100*x)%`; parse/divide by 100 | percentage-backed; at most two cycles |
| Lab | lightness | emit `F(x)%`; parse as `token*100/100`; R22 clamps | percent-marked; within two-cycle bound |
| Lab | a, b | emit/parse `F(x)` directly | direct; one cycle |
| LCH | lightness | same Lab lightness path | within two-cycle bound |
| LCH | chroma, hue | direct number/angle plus R21/R22 normalization | direct plus idempotent normalization |
| Oklab | lightness | emit `F(100*x)%`; parse/divide by 100; R22 clamps | percentage-backed; within two cycles |
| Oklab | a, b | direct | one cycle |
| OkLCh | lightness | Oklab lightness path | within two cycles |
| OkLCh | chroma, hue | direct plus R21/R22 normalization | direct plus idempotent normalization |
| `color()` XYZ/profile spaces, including concrete D50→D65 output | coordinates | direct `F(x)` | one cycle |
| every color arm | alpha | emit `F(100*x)%`, parse/divide; omit suffix at canonical alpha `1` | within two cycles, including omission change |

Direct RGB percentage syntax does not create another percentage-backed output
branch: parsing scales it to `[0,255]`, and canonical RGB serialization emits a
plain number. Likewise concrete D50 adaptation can create high-precision XYZ
coordinates, but the resulting `space:"xyz"` serializer uses the direct path.

The only unbounded percentage-backed parser-result fields are HSL
saturation/lightness and HWB white/black. A parser-produced internal value on
those paths comes from a finite source number multiplied by `.01` or divided
by `100`; multiplying it by `100` for serialization remains finite through
the exact maximum-finite source controls in the bank below. Hand-built colors
whose unbounded internal percentage field was never produced by the parser
remain outside R26 and inside the direct serializer validation/no-throw bank.

The twelve-decimal quantizer is already a projection on direct numeric tokens.
Percentage-backed fields add one binary64 scale-down/scale-up correction after
the first quantized token. That correction can change the last emitted decimal
unit once, as fresh A demonstrated. Reapplying the corrected token is stable;
R19–R22 clamps/normalization are themselves idempotent and add no third
semantic pass. Alpha may additionally change `100%` to an omitted suffix once.
The exact implementation gate below therefore measures the full composition,
not only the scalar formatter.

### C. Exact 61-source branch/domain precision bank

Retain the prior 24 direct-space sources unchanged and relabel them the
**R26 direct-space sub-bank**:

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
The old first-cycle AST identity fails 18/24, while the original one-cycle
fixed-point predicates pass 24/24 on this direct-only sub-bank.

Append this exact ordered 37-source branch/scale supplement:

```json
["rgb(1.0000000000001 2.123456789012345 254.9999999999999 / .123456789012345)","rgb(5e-324 1e-13 255 / 0.9999999999999999)","rgb(0 0 0 / 5e-324)","hsl(10 9986.367914825678 3774.7846683487296 / .5)","hsl(10 4038.6763111647383 4038.6763111647383 / .123456789012345)","hsl(10 4038.6763111647383% 4038.6763111647383% / 12.3456789012345%)","hsl(10 5e-324 1e-13 / 5e-324)","hsl(10 1e21 -1e21 / .9999999999999999)","hsl(10 1.7976931348623157e308 -1.7976931348623157e308 / .5)","hwb(10 9986.367914825678 3774.7846683487296 / .5)","hwb(10 4038.6763111647383 -4038.6763111647383 / .123456789012345)","hwb(10 4038.6763111647383% -4038.6763111647383% / 12.3456789012345%)","hwb(10 5e-324 -1e-13 / 5e-324)","hwb(10 1e21 -1e21 / .9999999999999999)","hwb(10 -1.7976931348623157e308 1.7976931348623157e308 / .5)","lab(99.99999999999999% .123456789012345 -.123456789012345 / .123456789012345)","lab(.0000000000001% 1e-13 -1e-13 / 5e-324)","lab(50.123456789012345 1e21 -1e21 / .9999999999999999)","lab(100 1.7976931348623157e308 -1.7976931348623157e308 / .5)","lch(99.99999999999999% .123456789012345 10.123456789012345 / .123456789012345)","lch(.0000000000001% 1e-13 .0000000000001 / 5e-324)","lch(50.123456789012345 1e21 359.9999999999999 / .9999999999999999)","lch(100 1.7976931348623157e308 10 / .5)","oklab(99.99999999999999% .123456789012345 -.123456789012345 / .123456789012345)","oklab(.0000000000001% 1e-13 -1e-13 / 5e-324)","oklab(.50123456789012345 1e21 -1e21 / .9999999999999999)","oklab(1 1.7976931348623157e308 -1.7976931348623157e308 / .5)","oklch(99.99999999999999% .123456789012345 10.123456789012345 / .123456789012345)","oklch(.0000000000001% 1e-13 .0000000000001 / 5e-324)","oklch(.50123456789012345 1e21 359.9999999999999 / .9999999999999999)","oklch(1 1.7976931348623157e308 10 / .5)","color(srgb-linear .123456789012345 1e21 -1e21 / .123456789012345)","color(display-p3 .123456789012345 1e21 -1e21 / .123456789012345)","color(a98-rgb .123456789012345 1e21 -1e21 / .123456789012345)","color(prophoto-rgb .123456789012345 1e21 -1e21 / .123456789012345)","color(rec2020 .123456789012345 1e21 -1e21 / .123456789012345)","color(xyz .123456789012345 1e21 -1e21 / .123456789012345)"]
```

Its ordered compact-JSON SHA-256 is
`4e9708fdf70e0fb60bf064ebf645178d9424168d4730f4004d27c5a616a9c40c`.
The normative combined payload is `direct.concat(supplement)`: **61 unique
sources**, ordered compact-JSON SHA-256
`0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d`.

The supplement covers every table branch, number and percentage source
forms, alpha precision/omission, subnormal underflow, the `1e21` formatting
threshold, R21's `360deg` rounding boundary, and maximum finite source values.
All values are already within the terminal R19–R22 semantic domain: RGB is in
range, HSL saturation is nonnegative, perceptual lightness/chroma is in range,
hues are initially in `[0,360)`, and alpha is in `[0,1]`.

Independent execution against the present formatter/parser, and again with
R19–R22 transforms applied after every parse, produced the same exact result:

```text
all parse/serialize intermediates successful: 61/61
first-cycle structural identity failures:      49/61
old one-cycle fixed-point predicates:           48/61
new bounded two-cycle predicates:               61/61
```

Supporting deterministic scalar stress used the unsigned-32 recurrence
`state = (1664525*state + 1013904223) mod 2^32`, seed `0x9e3779b9`, paired
words as binary64, and 3,000,000 iterations. After excluding the 1,439
non-finite word pairs, the exact 2,998,561 finite samples produced the
following stabilization counts (`0` means already fixed):

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

This sweep is supporting challenge evidence, not a substitute for the
normative 61-source payload or its exact predicates.

### D. Replacement H-R26 contract

Rename R26 **"twelve-decimal bounded two-cycle canonical fixed point."** For
each successful parser-produced, serializable `C0`, define and assert success
before every `.value` access:

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

Also record, without requiring, the stronger classifications:

```text
first-cycle lossless: C1 deep-equals C0
one-cycle fixed:      s1 === s0 && C2 deep-equals C1
```

No epsilon or approximate comparison participates. The canonical value is
`C2`; `s1` is its canonical string. "At most two cycles" means no third
change: the mandatory `C3`/`s2` probes prove the bound rather than assuming
it. The old direct-space bank remains a stronger one-cycle sub-bank; the
fresh-A HSL witness and its HWB analogue are mandatory two-cycle controls.

No local serialization canonicalization is recommended. An internal
percent-field retry would add branching/iteration to every serialization,
could change first-pass LIVE-compatible spelling, and would duplicate a
property-test concern in runtime code. The bounded two-cycle contract is true
for the complete branch/domain gate while leaving the inherited formatter and
precision policy unchanged.

### E. Mandatory ADDENDA-04 writer repair

The writer must amend only the R26-dependent statements while preserving all
ownership:

1. In the evidence table, retain the 24-source direct-space digest, add the
   37-source supplement/digest, and make the combined 61-source digest the
   universal R26 denominator.
2. Rename §4 and every summary/table reference from "one-cycle" to **bounded
   two-cycle**; publish `C0…C3`, `s0…s2`, every success precondition, and the
   exact predicates `s2===s1` and `C3 deep-equals C2`.
3. Preserve the direct 18/24 first-identity-failure observation as a sub-bank
   fact, not universal proof. Add the 61-source result counts and exact fresh-A
   HSL/HWB controls.
4. Update D-W2-3, D-W2-4, the W4 replay, §7 owner-decision item 3, the
   sequence, pre-audit close gate, and amendment receipt so none promises a
   universal one-cycle fixed point.
5. State explicitly that R26 authorizes no formatter change, tolerance, public
   type growth, scanner work, or PB implementation. R23–R25 remain exactly as
   written.
6. Record the amended ADDENDA-04 SHA-256 and restart **both** independent
   challenges. The historical rejection and fresh-A rejection earn no ACCEPT
   credit for the new bytes.

Controlling amendment seal: **fresh-A counterexample confirmed; original
one-cycle H-R26 superseded; bounded two-cycle R26 recommended; formation
remains proposed/not authority; no code and no production execution.**

---

## Controlling erratum — 2026-07-21 — H-R25 evidence identity

status: `HARDEN_ERRATUM_AFTER_ADDENDA_04_FINAL_A_REJECT`

Trigger: fresh final `ADDENDA-04-AUDIT-A.md` challenged sheet SHA-256
`d17f0301d4ec19dfd6a1561cca8ba7266cf29dfe7d396d3e21d65d6aa1b13a67`
and correctly found that the governing H-R25 digest did not identify the
addendum's published diagnostic ordering.

This erratum is controlling wherever the H-R25 evidence identity above is
read. It makes **no semantic or ownership change**. H-R25 remains
`ACCEPT-DEFER`, PB1 still owns decoded tokens/position, PB4 still owns
substitution/provider behavior, W2 still receives only the replay, and no
pre-PB1 scanner is authorized. The controlling bounded-two-cycle R26
amendment is unchanged in every respect.

### Exact D-W2-1 + R25 diagnostic payload

The governing ordered twelve-source array is exactly:

```json
["_()","-x()","--x()","foo(1 2 3)","color(not-from 1 2 3)","color(--from 1 2 3)","rgb(not-from 1 2)","rgb(from red r g b)","color(from red srgb r g b)","rgb(var(--x) 0 0)","color(srgb var(--x) 0 0)","rgb(env(--x) 0 0)"]
```

SHA-256 of its compact `JSON.stringify` bytes is exactly:

```text
f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1
```

The earlier H-R25 value
`3397ba83cd860a791acfae961429e2ca2e93c0702afc4de42d2fc2076e9d6b27`
is **RETRACTED**. It identifies a different source ordering and is not an
alternate, legacy, or acceptable gate. No unpublished reordering may be used
to revive it. The exact array and `f1dac2a8…` identity above govern H-R25,
D-W2-1, D-W2-3 corpus assembly, ADDENDA-04, implementation evidence, and all
later replay/audit receipts.

The terminal results remain exactly those already hardened: the first four
sources are D-W2-1 envelope diagnostics; the next three are token-insensitive
false-context controls; the next two are true relative-color context rows;
and the final three are nested substitution context rows. Correcting their
ordering identity changes none of those results.

### Supporting scalar-stress generator mapping — D-W2-3 receipt duty

The scalar sweep in the controlling R26 amendment remains **supporting
evidence only**. It does not replace, enlarge, shrink, or modify the normative
61-source R26 gate or its
`0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d`
identity.

Before an implementation receipt may cite the published scalar counts,
D-W2-3 requires the source-controlled generator to freeze this exact mapping:

1. Initialize unsigned 32-bit `state = 0x9e3779b9`.
2. `nextWord()` first updates
   `state = (Math.imul(state, 1664525) + 1013904223) >>> 0`, then returns that
   updated word.
3. Build each candidate binary64 from two consecutive words in a shared
   eight-byte `DataView`: the first updated word is written at byte offset `0`
   as the high 32 bits, the second at byte offset `4` as the low 32 bits.
   `setUint32` and `getFloat64` omit the `littleEndian` argument, so both are
   **big-endian**.
4. Run exactly 3,000,000 outer iterations. If the candidate double is not
   finite, skip that iteration immediately and consume no additional words.
   This produces exactly 1,439 skipped and 2,998,561 finite candidates.
5. For each finite `d`, test the percentage re-emission map for both
   parser-produced values `d / 100` and `d * .01`. Then consume one updated
   word for `u = nextWord() / 0xffffffff` and test the same map on `u`; consume
   one further updated word for
   `v = (nextWord() / 0xffffffff) * 100` and test the Lab/LCH percent-marker
   map on `v`. Thus finite iterations consume four updated words total;
   skipped iterations consume two.
6. Define `F(x) = Number(x.toFixed(12)).toString()`, percentage re-emission
   `H(x) = Number(F(x * 100)) / 100`, and Lab/LCH percent-marker re-emission
   `G(x) = Number(F(x)) * 100 / 100`.
7. Count the number of applications required to reach equality, with a limit
   of 20 applications. Equality is `Object.is(previous,next)` with `+0` and
   `-0` additionally treated as equal by `previous === 0 && next === 0`.
8. The receipt records the exact Node/V8 version, generator-source SHA-256,
   command, exit status, and observed count table. A changed engine, word
   order, endian flag, skip/consumption rule, iteration count, or equality
   predicate is a new supporting run and may not inherit the published counts.

This generator mapping is an **implementation-receipt duty**, not new
semantic authority and not a demand to add runtime canonicalization.

### Authority-chain disposition

The old diagnostic digest and every challenge against governing bytes that
still incorporated it are historical only. ADDENDA-04 must cite this erratum
in its precedence clause or transpose the exact array/digest without conflict,
record the resulting sheet SHA-256, and restart **both** independent
challenges. Neither the historical rejects nor the fresh final-A rejection
earns ACCEPT credit for corrected governing bytes.

All holds remain: R19–R26 are proposed/not ratified; W2 remains rejected; the
frozen surface and prototype-only boundary remain intact; R23/R24 stay
PB0→PB5; R25 stays PB1→PB4/W2 replay; R26 stays formatter-free and bounded
two-cycle; and no production, scanner, public-type, PB, or ship authority is
created by this evidence correction.

Controlling erratum seal: **H-R25 exact array and `f1dac2a8…` digest govern;
`3397ba83…` retracted; R26 amendment unchanged; D-W2-3 stress mapping frozen
as a supporting receipt duty; formation remains proposed/not authority.**
