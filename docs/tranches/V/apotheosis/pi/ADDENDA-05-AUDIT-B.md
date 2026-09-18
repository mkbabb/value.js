# V·π ADDENDA-05 adversarial challenge B — W3 easing/timeline corrections

Date: 2026-07-21  
Mode: independent, assume-faulty, no contact with or reading of Audit A  
Scope: `ADDENDA-05.md` only; no implementation or production authority  
Verdict: **ACCEPT**

## 0. Verdict

**ACCEPT the exact challenged revision without repair.** I found no incorrect
normative disposition, hash mismatch, ownership collapse, hidden public-surface
growth, or premature implementation authority. The packet separates the
immediate literal Phase-A repair from CSS tokenization, typed math, and the
lossless plural/current-range carrier; it keeps W3 rejected until the owner
gate and fresh implementation audits; and it preserves the Phase-B gates.

The exact file challenged was 27,925 bytes with SHA-256:

```text
1bf4170857c1def8a2992b1275d6fe43d1a4d6b91e9f509f9046915e400ba525
```

Any change to `ADDENDA-05.md`, including a semantic, payload, diagnostic,
ownership, gate, or replay change, invalidates this verdict.

## 1. Independent evidence reproduction

### 1.1 Pinned sources and manifest

I fetched the five official source files independently from
`w3c/csswg-drafts` at exact commit
`c7573530343759ace8e46438a1fa2c44515b5554`. The returned bytes and SHA-256
values reproduced the sheet exactly:

| source | bytes | independently reproduced SHA-256 |
|---|---:|---|
| `css-easing-1/Overview.bs` | 19,774 | `92043cb3319f450dfdbbef32035324ddf66969f9fe0330514f2c2db7ca74f185` |
| `css-easing-2/Overview.bs` | 36,116 | `650cdccf65fe523627ce7917c8d1bef1361dac6bf62a82f8f75c89524a521554` |
| `scroll-animations-1/Overview.bs` | 65,357 | `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1` |
| `css-syntax-3/Overview.bs` | 144,427 | `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390` |
| `css-values-4/Overview.bs` | 230,907 | `7051146f8adf0b8c0e9243dd75dab39f18efe3e0905d86afb8abd43fe58d45bc` |

I also independently applied the manifest's declared canonicalization:
remove top-level `manifest_content_digest`, recursively sort object keys by
JavaScript code-unit order, preserve arrays, compact `JSON.stringify`, then
SHA-256 the UTF-8 bytes. The result was exactly:

```text
cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c
```

### 1.2 Eight banks and the 81-source aggregate

I reconstructed every ordered payload from the challenged sheet and hashed
the compact `JSON.stringify` bytes. All counts and hashes match:

| bank | count | independently reproduced SHA-256 |
|---|---:|---|
| `B8W3` | 9 | `d9b4d7ebcfbb6b9c484222b02778f9a9af131645b44336aac232b1efee5f5b2b` |
| `B27` | 7 | `b5a0ce1c7a034c6a1028b9ea2b094a99103ff7500634634718d1db9b4ca8a199` |
| `B28` | 7 | `5154b60fc0c303d0736ab14f9344aef045dffa12c17bc145d25fbaab859e3dae` |
| `B29` | 12 | `12aabfe06550793b7fdf3851b4503abd82fc49bc0c585ec38cc0382af60f8267` |
| `B30` | 23 | `97108fc335e6c55c9e7e9658ce043985178f2af3bf7d59f0e54d41606464efcf` |
| `B31` | 7 | `dffae92026a261532f538cdb0fe88f16ff30b3cbeb1f7dc8b3d5c89f8ccc47e7` |
| `B32` | 11 | `ac7e01373e98cfa8eaefd122f04b37722b16ace7304a7aba06958d25b159ae45` |
| `B33` | 5 | `d40c3096267ddd630d75ebc5a974bac93a47bdf184884bebdb3fb02bd24c8dc5` |

For `B31`, I did not hash the prose placeholders. I reconstructed these exact
source strings/code points in order:

1. `scroll(root` + U+000A + `x)`;
2. `scroll(root` + U+000D U+000A + `x)`;
3. `scroll(root` + U+000C + `x)`;
4. `scroll(root/**/x)`;
5. `scroll(root` + U+00A0 + `x)`;
6. U+002D U+002D U+00E9 (`--é`); and
7. U+002D U+002D U+005C U+0036 U+0031 (literal `--\61`).

The compact object with insertion order
`B8W3,B27,B28,B29,B30,B31,B32,B33` contains exactly 81 sources and hashes to:

```text
f288380235f1a9f5a925b4bb786e1f05ca499c0b2b1da4f65a4cefd9e626effa
```

### 1.3 Independent browser witness

The recorded Chromium 148 receipt is historical evidence in the formation
packet. As an independent current third witness, I queried locally installed
Chrome 150.0.7871.129 through both `CSS.supports(property, value)` and style
declaration serialization. It confirms the material polarities: percentage-
first multirow `linear()` accepts while one-row `linear()` still rejects;
literal `steps(+01)`/`steps(0002,start)` accept while decimal, exponent, and
extra-argument forms reject; `normal 0` accepts and serializes to `normal 0px`;
comma-separated animation ranges are property lists; correct length units,
unitless zero, and typed length math accept in `view()` while time, angle,
flex, unknown units, nonzero unitless values, and `calc(0)` reject. This
witness agrees with the packet and does not displace the pinned specifications.

## 2. Total-tranche / gestalt challenge

The correction is optimally bounded for the frozen Phase-A carrier:

- R8-W3 extends the already-ratified empty-list rule instead of spending a
  duplicate row or changing the global splitter.
- R27–R30 close only semantics representable by the existing numeric and raw-
  string structures.
- R31 refuses a local approximation of CSS preprocessing/token boundaries.
- R32 refuses a local math parser and keeps nested-comma correctness with the
  typed numeric owner.
- R33 refuses to collapse one scalar shorthand arm and the property's outer
  coordinating list, or to omit the current `scroll` range silently.

The dependency placement is coherent with the proposed Phase-B skeleton:
PB1 is the sole token foundation, PB3 is the typed numeric/math owner, PB0
freezes the eventual carrier, and PB6 owns the current easing/timeline overlay.
W5 owns declaration-list splitting and its animation-coded empty-item
diagnostics; W4 must not manufacture a singular range from plural input. This
is the required separation for a modular grammar rather than a W3 god module.

The addendum does not overclaim close. Ratification permits only the immediate
prototype repair and evidence work; R31–R33 remain executable RED, W3 can earn
at most provisional Phase-A acceptance, and W4 remains close-held until W2 and
W3 independently accept. The owner gate remains orthogonal to both Phase-B
gates and the W1/W2 correction decisions.

## 3. Wave challenge

### 3.1 Namespace, authority, and diagnostics

R27–R33 are the next uncontested atomic block after ADDENDA-03's R13–R18 and
ADDENDA-04's R19–R26. R8-W3 is correctly expressed as an ownership extension.
The sheet distinguishes semantic authority, direct evidence repairs, and
deferred dispositions, and it requests one explicit owner decision without
silently authorizing PB work.

The diagnostic contracts preserve the door boundary:

- recognized easing failures use full-input `css_syntax` with `expected:[]`;
- scalar view/range failures use `timeline_option_invalid` and their exact
  door-specific expected arrays; and
- property-list empty members remain W5's `animation_option_invalid` concern.

This avoids both diagnostic laundering through a generic tokenizer and the
incorrect reuse of declaration-level codes in the scalar W3 door.

### 3.2 R8-W3 and R27

CSS list multiplier semantics reject leading, repeated, and trailing empty
members. Applying the existing top-level emptiness helper once before splitting
is sufficient for the literal W3 slice and leaves nested commas to the token-
aware owner.

The pinned `steps(<integer>, <step-position>?)` grammar requires one or two
arguments. CSS Values 4 defines a literal integer as an optional sign plus
decimal digits, so `1.0` and `1e0` are not integer tokens even though their
JavaScript values are integral. Positive-count and `jump-none >= 2` bounds,
the six aliases, and default `jump-end` are all correct. A tiny raw-token ASCII
classifier followed by existing conversion is the KISS implementation.

### 3.3 R28

The exact pinned production is
`linear([ <number> && <percentage>{0,2} ]#)`. The sheet correctly derives one
or more nonempty rows, exactly one number per row, and one contiguous zero-to-
two percentage group on either side of the number. `linear(25% 0 75%,1)`
cannot satisfy that grouped production. The one-row results are not an
editorial inference: the same source explicitly defines single-item output.

The frozen `CssLinearStop` retains supplied percentage positions and therefore
represents this raw Phase-A grammar without used-value interpolation. The
packet correctly records one-row browser/LIVE disagreement as an expected
spec-arbitrated divergence rather than weakening the grammar.

### 3.4 R29

The pinned shorthand is
`[ <'animation-range-start'> <'animation-range-end'>? ]#`; its longhand arms
are `normal | <length-percentage> | <timeline-range-name>
<length-percentage>?`. Thus `normal` cannot absorb an offset. In a single arm,
`normal 0` is start `normal` plus end `0`, while `normal 0 100%` is invalid.

The outer `#` is a coordinating property list, not a start/end separator.
Rejecting every top-level comma at the scalar parser is therefore lossless;
W5 must split the property value and delegate each nonempty arm. The exact
`normal 0` and `normal 100%` structural round-trip properties are honest for
the frozen raw AST and require no new serializer spelling.

### 3.5 R30

The pinned value domains are correct: view inset accepts
`auto | <length-percentage>`, while range boundaries accept only
`<length-percentage>`. CSS Values 4 explicitly permits omission of the unit
identifier for zero lengths. Its literal number grammar also permits exponent
notation, so finite `0e0` is a valid unitless zero length and `1e0` is not.

The current private `syntax.ts` length registry covers the pinned absolute,
font/root-relative, viewport/dynamic/small/large, and container-query units,
including `q` and `svh`; time, angle, flex, and unknown dimensions are not
lengths. Extracting this one registry into an internal shared numeric-domain
module is narrower than duplicating it and does not require a public export or
W0 replay. The explicit stop condition if ownership moves into W0 is sound.

### 3.6 R31

CSS Syntax 3 preprocessing/tokenization confirms LF, CRLF, and FF CSS
whitespace behavior, comment consumption, NBSP's exclusion from CSS
whitespace, non-ASCII identifier code points, and hex-escape decoding. The
exact `--\61` source decodes to `--a`; its final `1` is the second hex digit,
not a trailing character. These are shared token semantics and cannot be
fixed honestly with JavaScript `\s`, an ASCII identifier fallback, or a local
escape decoder. PB1 ownership and mandatory W3/PB6 replay are correct.

### 3.7 R32

CSS Values typed math may produce length-percentage results from `calc()` and
`min()`, while unitless `calc(0)` remains a number in this context. The comma
inside `min(1px,2px)` is nested function syntax, not R10's top-level comma.
The raw string Phase-A carrier and literal `numUnit` leaf cannot provide typed
dimensional truth, so PB3 ownership plus PB6 consumption is the smallest
non-contrived boundary. The sheet properly time-limits the current substring
guard to the literal slice and requires its replacement/replay at that owner.

### 3.8 R33

The pinned Scroll Animations source defines `scroll` as a current named range
and the animation-range shorthand as a coordinating list. Frozen `RangePhase`
lacks `scroll`; frozen `AnimationRangeValue` carries only one arm. Deferring
the carrier decision to PB0 and its implementation to PB6 is the only lossless
result under the frozen surface. The W3/W5/W4 interim duties are explicit and
do not mutate the legacy types.

## 4. Evidence, serializer, KISS, and replay challenge

D-W3-1–D-W3-3 close the actual proof gaps rather than adding ceremony:

- the corpus has exact content addresses and requires actual AST or first-
  diagnostic comparisons, not prose counts;
- deferred evidence remains visible and executable rather than disappearing
  into skipped tests;
- serializer claims are restricted to properties that can truly round-trip,
  with output-only fixtures identified honestly;
- differential disagreements must be either a ratified row or a mirror defect;
- browser evidence is recorded but cannot override the pinned source; and
- W7 must replay correctness and both benchmark bars without a performance
  waiver.

The implementation boundary reuses the existing parse-that envelopes,
lexemes, complete runner, and top-level scanner. It permits only local literal
classification and one shared unit registry. It explicitly forbids the likely
sources of contrivance: a second tokenizer/scanner/unit registry, a generic
easing hierarchy, public token growth, local unit algebra, a plural field
smuggled into the frozen carrier, and parser-level bare recognition regexes or
mapping combinators.

Replay routing is complete and proportional. W0 is conditional on shared
foundation movement; W1/W2 are regressions; W4 covers the shared registry,
singular projections, and plural non-collapse; W5 owns property-list evidence;
W7 owns both bench scenarios; and PB1/PB3/PB6 close the deferred semantics.
The pre-audit gate also preserves exact parse-that versioning, barrel parity,
no-throw hostiles, zero production vulnerabilities, and the prohibition on
production edits.

## 5. Required repairs

**None.** No textual or semantic amendment is required for this exact
revision. The next step is root gestalt adjudication; only after that may the
owner decide the atomic authorization in §8. This ACCEPT is not ratification,
implementation authority, a W3 acceptance verdict, a Phase-B gate, or ship
authority.

---

Audit receipt: independent ADDENDA-05 challenge B; `model_served`: inherited
Codex GPT-5 family route; exact backend revision and Opus/Fable labels were not
exposed, so none is claimed; no Audit-A contact/read; 2026-07-21.
