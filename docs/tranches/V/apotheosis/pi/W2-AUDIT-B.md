# π.W2 COLOR — independent E-1 adversarial audit B

**Verdict: REJECT.** W2 is mechanically green against its authored bank, but
it is not spec-complete and does not satisfy the tranche's no-throw or
round-trip gates. The failures below are implementation and gate failures, not
mere Phase-B growth requests.

`model_served`: inherited root Codex route; no model or reasoning override was
passed to this seat. The service-side backend alias and effort label are not
exposed, so this receipt does not claim Opus.

This pass was independent. I did not consult or contact the other W2 audit
seat. I read the handoff, sheet, W2 brief, formation research/hardening, author
receipt, current implementation/tests, LIVE implementation, and the immutable
official Color 4 source. I edited no code and wrote only this report.

## Evidence basis

The specification arbiter was fetched directly from the official CSSWG
repository at the packet's verified commit:

- commit: `c7573530343759ace8e46438a1fa2c44515b5554`;
- path: `css-color-4/Overview.bs`;
- byte count: `430720`;
- Git blob: `238300b75970ab68bf6a0b9339f8e3a01c749b59`;
- SHA-256: `f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a`.

Those values independently match `formation/l4-root-seed-manifest.json`.
Relevant pinned source ranges are modern/legacy syntax `1020–1111`, hue
normalization `1114–1145`, RGB `1365–1440`, HSL `2235–2318`, HWB
`2787–2879`, Lab/LCH `3421–3564`, Oklab/OkLCh `3592–3725`, and `color()`
`3845–3907`.

The browser-control runtime was also attempted for the E-4 third witness. It
reported no available browser backend (`[]`), so no CSSOM claim is fabricated
in this audit. The hash-pinned primary specification is the arbiter for the
common-mode LIVE/mirror defects below.

Mechanical results at audit time:

- W2 + W1 seam subset: 2 files, 18 passed, 4 W1 E-3 TODO;
- full package: 11 files, 59 passed, 4 TODO;
- `npm run check`: GREEN;
- `npm run dts-parity`: GREEN, 33 type + 19 runtime exports;
- `npm audit --omit=dev`: 0 vulnerabilities;
- `npm ls @mkbabb/parse-that --depth=0`: exact `1.0.0`.

## 1. Total-tranche / gestalt analysis

The W2 boundary is partly sound. Keeping relative colors, `color-mix()`,
`light-dark()`, `contrast-color()`, substitution, and math expressions out of
the frozen Phase-A door avoids pulling PB1/PB3/PB4/PB5 forward. The keyed
function dispatch and reuse of W0 leaves are also appropriate.

The wave was nevertheless under-specified as a Color 4 proof. R1/R3/R6/R9
cover four known LIVE errors, but they omit the parsed-value semantics that
turn syntactically valid color tokens into the public `CssColor` value. Worse,
R6 was applied to legacy HSL spellings where Color 4 forbids numbers entirely,
and R9 treats "all commas" as the complete legacy rule even though legacy RGB
also forbids `none` and mixed number/percentage channels. LIVE agreement made
these common-mode errors invisible to the author's 4,158-case differential.

Because the correction ledger is closed, the repairs belong in an E-3 W2
addendum, not an ad-hoc patch. That addendum needs exact rows for:

1. legacy channel-kind and `none` restrictions;
2. hue normalization and every parsed-value clamp owned by Color 4;
3. modern-alpha clamping rather than factory rejection;
4. missing-component behavior through `xyz-d50` adaptation;
5. context-guard token position and nested substitution diagnostics;
6. the serializer's hostile-input and round-trip contract.

Downstream routing must remain explicit:

- PB1 owns CSS preprocessing, comments, escapes, CSS-only whitespace, decoded
  identifiers/function names, and the mandatory W2 replay. Inputs such as
  escaped named colors and non-CSS JS whitespace should remain executable RED
  rows, not be "fixed" by another W2 scanner.
- PB3/PB4 own math and substitution trees. W2 only needs an exact refusal /
  `color_context_required` boundary until those owners land.
- The pinned Color 4 source now includes `display-p3-linear`; the frozen
  13-space `CssColorSpace` cannot represent it. PB0 must inventory it and the
  PB0-derived color owner (provisionally PB5) must add its type/factory/parser/
  serializer row. This is a Phase-B growth requirement, not permission to
  mutate the Phase-A 52-export type contract in W2.
- `ADDENDA-03` still makes any pre-PB1 W2 close provisional, requires PB1 to
  replay W2, and does not let the W1 overlay close before the owner-ratified W1
  bank is complete. Four W1 semantic rows are still TODO at this audit.

The provisional PB5 phrase "legacy concrete door unchanged" is therefore too
strong: PB5 should consume an accepted, corrected W2 door, while PB0 records
the newly pinned color-space row. It must not fossilize the current common-mode
defects.

## 2. Wave analysis

### Blocking findings

| id | severity | finding | effect |
|---|---|---|---|
| **B-01** | blocker | Legacy RGB/HSL grammar accepts forbidden channel mixtures and `none`; R6 leaks into legacy HSL. | The Color 4 grammar and W1 typed-color seam are wrong. |
| **B-02** | blocker | Required hue normalization and parsed-value clamping are absent; out-of-range alpha is rejected. | Syntactically valid colors return wrong values or `ok:false`. |
| **B-03** | blocker | `color(xyz-d50 ...)` rejects missing channels although `<xyz-params>` permits `none`. | The claimed none-channel matrix is incomplete. |
| **B-04** | blocker | `serializeCssColor` throws on getters, revoked proxies, proxy arrays, and sparse arrays. | The cross-cutting no-throw gate is false. |
| **B-05** | blocker | The declared structural parse→serialize→parse property fails on ordinary accepted colors. | The property lane and author receipt's round-trip claim are false. |
| **B-06** | major | The `from` guard is substring/boundary based and nested `var()`/`env()` is not classified as context-dependent. | Diagnostics are common-mode wrong or inconsistent. |
| **B-07** | major | The maintained corpus reaches the numeric minimum but omits the failing semantic axes; the 4,158 sweep is not a rerunnable artifact. | K-6 is not discharged and the gate cannot detect common-mode failures. |

### Born-RED / ledger discharge

| row | result |
|---|---|
| Frozen 13 output spaces, ordinary modern forms | GREEN against LIVE for the authored examples. |
| Applicable ordinary legacy forms | PARTIAL; separators work, semantic legacy restrictions do not. |
| Modern `none` channels | PARTIAL; direct functions and D65-like `color()` rows work, `xyz-d50` does not. |
| Hex 3/4/6/8, transparent, named colors | GREEN; the source-table key order/count is dynamic and all current names round-trip. |
| `color()` listed Phase-A spaces and D50 numeric adaptation | GREEN for concrete numeric fixtures. |
| Context/native guards | PARTIAL; basic top-level fixtures agree, B-06 remains. |
| R1 | GREEN: empty functional colors return a clean failure. |
| R3 | GREEN: dangling alpha slash rejects with `expected:["alpha"]`. |
| R6 | PARTIAL: modern HSL/HWB numbers normalize by `/100`; invalid legacy HSL numbers are incorrectly accepted. |
| R9 | PARTIAL: mixed separators reject, but the rest of legacy syntax is not enforced. |
| Serializer canonical arms | GREEN against LIVE for ordinary guarded inputs. |
| Serializer round-trip property | RED (B-05). |
| Hostile no-throw | RED (B-04). |
| W1 color overlay | Basic valid rows GREEN, but inherits B-01/B-02 and remains authority/replay held. |
| K-6 explicit matrix and broad deterministic bank | RED (B-03/B-07). |
| K-8 / KISS | Acceptable size for an L door, with reservations below. |

The implementation obeys the narrow mechanical constraints: no freeze, bare
`regex()`, parser `.map()`, or `mapState()` appears in the W2 grammar; it uses
the exact parse-that dependency, one function-head parse, a name-keyed record,
and shared leaves. `grammar/color.ts` is 313 LOC and remains localized.

The `completeBody()` parsers do consume the complete remainder and delegate
most structure to imperative `splitTopLevel()` calls. That is a weaker
parse-that grammar than the wave brief describes, but a rewrite is not itself
warranted: fix the semantics with the smallest row metadata/postprocessing
changes, and let PB1 replace the shared scanner boundary once. Do not create a
second color tokenizer.

## 3. Feature analyses

### 3.1 `parseCssColor`

#### B-01 — legacy syntax is materially too permissive

Pinned Color 4 requires legacy RGB channels to be either all numbers or all
percentages, forbids `none` in every legacy component, and requires legacy HSL
saturation/lightness to be percentages. `parseRow()` only checks commas and
then runs the same permissive channel parsers used for modern syntax
(`grammar/color.ts:149–161`).

A deterministic 27-combination legacy RGB bank over `{10, 10%, none}` found
25 spec-invalid combinations; the mirror accepted all 25. A 9-combination
legacy HSL bank over S/L `{50%, 50, none}` found 8 spec-invalid combinations;
the mirror accepted all 8. It also accepts legacy `none` alpha.

Concrete witnesses:

| source | Color 4 | current mirror | LIVE |
|---|---|---|---|
| `rgb(10%, 20, 30%)` | reject | accepts `[25.5,20,76.5]` | same |
| `rgb(none, 0, 0)` | reject | accepts `none,0,0` | same |
| `rgba(0, 0, 0, none)` | reject | accepts alpha `none` | rejects |
| `hsl(120, 50, 50)` | reject | accepts `[120,.5,.5]` | accepts `[120,50,50]` |
| `hsl(120, none, 50%)` | reject | accepts missing saturation | same |

The last two rows show why R6 cannot whitelist every numeric HSL difference:
modern `hsl(120 50 50)` is valid and needs `/100`; legacy
`hsl(120, 50, 50)` is invalid. The W1 scalar/value/value-list seams accept all
of these mirror successes as typed colors, so the error propagates beyond the
color door.

#### B-02 — parsed-value semantics are absent

`channel()` converts units but returns raw values (`grammar/color.ts:60–75`),
and the color factories only validate finiteness and alpha range. Pinned Color
4 requires:

- all hue numbers/angles normalized to `[0,360)`;
- RGB components clamped to their reference range at parsed-value time;
- alpha outside `[0,1]` accepted and clamped;
- negative HSL saturation clamped to zero;
- Lab/LCH lightness clamped to `[0,100]`;
- Oklab/OkLCh lightness clamped to `[0,1]`;
- negative LCH/OkLCh chroma clamped to zero.

LIVE shares every one of these defects. Representative current outcomes are:

| source | required value | current mirror/LIVE |
|---|---|---|
| `rgb(-1 300 0)` | `[0,255,0]` | `[-1,300,0]` |
| `rgb(0 0 0 / -1)` | success, alpha `0` | failure, `expected:["color_out_of_range"]` |
| `rgb(0 0 0 / 200%)` | success, alpha `1` | same failure |
| `hsl(-540 50% 50%)` | hue `180` | hue `-540` |
| `hsl(120 -50% 50%)` | saturation `0` | saturation `-0.5` |
| `lab(-20 0 0)` / `lab(200 0 0)` | L `0` / `100` | L `-20` / `200` |
| `lch(-20 -2 30)` | `[0,0,30]` | `[-20,-2,30]` |
| `oklab(-1 0 0)` / `oklab(2 0 0)` | L `0` / `1` | L `-1` / `2` |
| `oklch(-1 -0.1 30)` | `[0,0,30]` | `[-1,-0.1,30]` |

The audit additionally exercised twelve hue witnesses across HSL, HWB, LCH,
and OkLCh at `-540`, `360`, and `720`; all twelve retained the unnormalized
angle. This is an AST/value defect, not merely a CSSOM display concern.

#### B-03 — `xyz-d50` drops the missing-component contract

Pinned `<xyz-params>` permits `none` in each of its three channels. The mirror
instead rejects any `none` before D50→D65 adaptation with
`expected:["concrete xyz-d50"]` (`grammar/color.ts:184–188`).

`color(xyz-d50 none 0.2 0.3)` is therefore a common-mode false rejection.
All seven nonempty `none` permutations need explicit fixtures and a decided
legacy-AST lowering that preserves missingness through adaptation. The current
matrix only checks `color(xyz ... none ...)`, so its "none-channel" claim does
not cover the D50 input arm.

#### B-06 — context diagnostics are token-insensitive

`containsWord(body, "from")` (`grammar/color.ts:231–254`) treats a hyphen as a
word boundary rather than checking the relative-color grammar position.
Consequently all of these common-mode invalid inputs report
`color_context_required` instead of a CSS syntax/color-space failure:

- `color(not-from 1 2 3)`;
- `color(--from 1 2 3)`;
- `rgb(not-from 1 2)`.

Conversely, nested substitutions such as `rgb(var(--x) 0 0)` and
`color(srgb var(--x) 0 0)` report ordinary `css_syntax`, while the door's
top-level `var()`/`env()` spellings report `color_context_required`. PB1/PB4
will eventually own tokenization and substitution, but W2's provisional
refusal boundary still needs exact executable outcomes rather than a substring
heuristic.

#### Correctly bounded parser behavior

R1 and R3 are implemented cleanly. All four hex lengths, transparent, the
current source named-color table, ordinary direct functions, the frozen
concrete `color()` spaces, and numeric D50 adaptation agree structurally with
LIVE. Non-string parser inputs, including a revoked proxy, return clean
failures because the parser checks `typeof` before property access.

Comments, CSS escapes/preprocessing, and CSS-only whitespace remain known PB1
work. For example, JS `trim()` currently accepts NBSP around a named color and
`/\s/` accepts non-CSS separators; escaped named colors are not decoded. These
must be visible PB1 replay rows and must not trigger a W2-local scanner patch.

### 3.2 `serializeCssColor`

#### B-04 — hostile runtime values throw

The serializer calls `isAnyColor()` without a no-throw boundary
(`serialize.ts:24–46`; `deps/color-model.ts:123–130`). The authored hostile set
contains only inert primitives/plain containers. The following independently
executed inputs all threw:

| hostile shape | observed throw |
|---|---|
| revoked color proxy | revoked-proxy property `get` |
| throwing `space` getter | getter exception |
| throwing `channels` getter | getter exception |
| throwing `alpha` getter | getter exception |
| revoked proxy used as `channels` | `Array.isArray` / `IsArray` exception |
| throwing array-slot getter | getter exception during `.every()` |
| sparse three-slot channel array | `undefined.toFixed` during formatting |

A plain object with an extra self-cycle did not throw and serialized normally;
cycles are not intrinsically recursive here. The required hostile bank should
retain that success/no-hang witness while adding throwing and revoked
boundaries. Every public `/css` entry is required to return a result rather
than expose user accessors or proxy exceptions.

#### B-05 — exact round trip is not green

The serializer rounds every finite number to twelve decimal places before
stringification (`serialize.ts:16–22`). That matches LIVE's current spelling,
but the tranche gate chose structural `parse ∘ serialize == parse`. Ordinary
accepted colors violate it:

| source | serialized | reparsed difference |
|---|---|---|
| `color(srgb-linear 0.0000000000001 0 0)` | `color(srgb-linear 0 0 0)` | `1e-13` becomes `0` |
| `rgb(1.0000000000001 2 3)` | `rgb(1 2 3)` | first channel becomes `1` |
| `color(xyz-d50 0.1 0.2 0.3)` | 12-digit `color(xyz ...)` | all adapted channels change |

An additional deterministic 24-color property bank across the six Phase-A
`color()` output families and four precision classes produced **18 structural
round-trip failures**. Either the numeric serialization policy must preserve
the chosen value equality, or an E-3 addendum must define a spec-justified
canonical fixed-point/tolerance property. The current exact gate cannot be
declared GREEN by testing only decimal-friendly values.

For ordinary well-shaped finite colors, all 13 Phase-A serializer arms match
LIVE, `none` is preserved in modern forms, alpha omission/suffix spelling is
consistent, and invalid/non-finite/out-of-range guards return the intended
`ColorIssue` values.

### 3.3 H-8 matrix, generated sweep, and W1 seam

The maintained accept bank has exactly 50 entries. It enumerates 13 output
spaces and gives every row a modern/none witness, with legacy witnesses for RGB
and HSL. The reject bank exceeds 20, and exhaustive named-color coverage is
genuinely source-driven. Those are good structural foundations.

They are not a sufficient Color 4 matrix. No maintained test covers legacy
homogeneous channel kinds, legacy `none`, parsed-value clamping, hue
normalization, D50 missing components, throwing objects/proxies/sparse arrays,
or non-decimal-friendly round trips. The author receipt's 4,158 direct-function
sweep compares only LIVE and mirror and is not persisted as a script, corpus,
or digest-bearing result, so it is neither independently rerunnable nor able
to catch the common-mode failures demonstrated here.

The W1 seam proves four ordinary valid colors through scalar/value/value-list
doors. It does not prove invalid Color 4 spellings remain non-color values, and
it inherits every false success from B-01/B-02. The complete W1 run also still
contains four owner-gated TODO rows. The seam cannot discharge W2 close until
the W2 semantic defects are fixed, the W1 authority gate is satisfied, and the
required PB1 replay later lands.

## Required route to re-audit

1. Form, twice-challenge, gestalt-adjudicate, and obtain owner authority for a
   narrow W2 correction addendum covering B-01–B-06. Do not enlarge W2 into
   PB1/PB3/PB4/PB5.
2. Repair the parser and serializer with the smallest shared row metadata and
   postprocessing; preserve the keyed dispatch and single future scanner.
3. Persist the spec-arbitrated generated bank and add every witness class above
   to `w2-color.test.ts`, including exact failure codes/`expected[]` where the
   public result is a failure.
4. Re-run the full W2 + W1 seam gate, package gates, hostile bank, structural
   property lane, and both independent E-1 audits.
5. Record `display-p3-linear` in PB0/PB5 and retain PB1 replay rows explicitly.

Until those steps close, **W2 is REJECTED** and must not be marked ACCEPTED or
used to close the W1 color overlay.
