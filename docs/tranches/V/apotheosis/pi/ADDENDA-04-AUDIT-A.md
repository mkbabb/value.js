# V·π ADDENDA-04 — fresh independent authority-chain challenge A

status: `FRESH_ACCEPT`

challenged sheet SHA-256:
`d17f0301d4ec19dfd6a1561cca8ba7266cf29dfe7d396d3e21d65d6aa1b13a67`

governing harden SHA-256:
`1cd096e054f8219bdb2ca83f1b76343cbe37608f37e975cf2803abd2582028b4`

model_served: inherited Codex subagent route; the service-side backend alias
and effort label were not exposed to this seat, so this receipt does not claim
Opus

date: 2026-07-21

This is a fresh assume-faulty challenge of the unchanged `ADDENDA-04.md`
bytes under the newly corrected governing harden artifact. I gave no prior
challenge acceptance credit and did not read or contact challenge B. I
independently re-fetched the immutable specification objects, recomputed the
published evidence identities, executed the complete R26 composition, and
checked the authority, ownership, KISS, replay, and hold boundaries. I changed
no parser, serializer, test, production source, Phase-B artifact, or
coordination file. This report is my only write.

## Current verdict

**ACCEPT.** The controlling H-R25 erratum removes the sole authority conflict
that caused the immediately preceding A rejection. The harden artifact now
retracts `3397ba83…`, freezes the same exact twelve-source array and
`f1dac2a8…` identity published by the addendum, and explicitly makes that
identity govern H-R25, D-W2-1, D-W2-3, implementation evidence, and every
replay. The addendum both incorporates that exact array/digest without
conflict and declares the current harden rulings controlling. Its precedence
chain is therefore single-valued.

The bounded-two-cycle R26 amendment, R19–R25 semantics, direct-repair scope,
evidence denominators, ownership split, provisional close semantics, and KISS
boundary also survive challenge. This ACCEPT is challenge credit for the
focused E-3 proposal only. It does not ratify the sheet, authorize semantic
code, accept W2, open a Phase-B gate, or authorize production execution.

## 1. Authority-chain and history challenge

The unchanged sheet digest is not by itself evidence that the old conflict
persists: the challenged authority pair changed. The governing harden file now
ends with a controlling H-R25 erratum whose exact effect is:

- the original H-R25 `3397ba83…` identity is **RETRACTED**, not retained as a
  legacy or alternate gate;
- the ordered array is exactly
  `[_(), -x(), --x(), foo(…), three false-context controls, two true-relative
  controls, three nested-substitution controls]` in the addendum's published
  source order;
- its compact-JSON SHA-256 is exactly `f1dac2a8…`; and
- no semantic, owner, scanner, PB, formatter, surface, or execution authority
  changes with the evidence correction.

The addendum's precedence clause makes H-R19–H-R26 and the appended harden
amendments controlling; §1 transposes the corrected exact array and digest.
This satisfies the erratum's `cite or transpose without conflict` requirement.
The current sheet SHA and current governing harden SHA are recorded above.
There is no remaining choice between two H-R25 gates.

Prior challenges remain historical and earn no current ACCEPT credit:

| challenged sheet | governing condition | historical result | current disposition |
|---|---|---|---|
| `f629b82e…` | original draft | REJECT | diagnostics, compatibility REDs, named-color lock, and then-R26 text were amended |
| `790a30eb…` | universal one-cycle R26 | FRESH_REJECT | controlling harden amendment and sheet replacement establish bounded two-cycle R26 |
| `d17f0301…` | harden before H-R25 erratum | FRESH_REJECT | valid conflict finding; the governing harden bytes are now corrected |
| `d17f0301…` | harden `1cd096e0…` | **FRESH_ACCEPT (this pass)** | current independent A credit only |

The complete immediately preceding A rejection is retained verbatim below as
historical evidence of the defect that triggered the governing erratum.

## 2. Immutable source and identity verification

I fetched the official CSSWG files by exact commit
`c7573530343759ace8e46438a1fa2c44515b5554`, not from a moving branch:

| object | bytes | Git blob | SHA-256 | result |
|---|---:|---|---|---|
| `css-color-4/Overview.bs` | 430,720 | `238300b75970ab68bf6a0b9339f8e3a01c749b59` | `f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a` | exact |
| `css-color-5/Overview.bs` | 182,733 | `26f508fc194d45cb0c228a32ba93ad118f9fc327` | `e419968b08ee2768fab0c4b667a73541e35cb8cd0b444fb2b6e2d46b1c8ddc15` | exact |

The pinned Color 4 bytes support the legacy channel-kind restrictions,
parsed-value normalization, missing components, and `display-p3-linear` used
by the sheet; Color 5 independently retains the linear Display-P3 arm. The
frozen Phase-A carrier still cannot losslessly represent D50 provenance plus
missingness or the `display-p3-linear` space, confirming the R23/R24 deferral.

Removing `manifest_content_digest`, recursively sorting object keys while
preserving array order, and hashing compact JSON reproduces the 76-root
manifest identity `cd505eecd…` exactly.

Every normative or lock identity recomputed from the addendum/current mirror:

| payload | rows | recomputed SHA-256 |
|---|---:|---|
| R19 reject supplement | 45 | `7dd4d3d350018c5da4159cef0699493b2df4032d6654080729f98594e0f1aa26` |
| R20–R22 exact-value sources | 22 | `3b9c26919decb811f8f65a3e34d3ab79fa25f27d83cf4e9305b0c2dfd82701fd` |
| D-W2-1 + R25 diagnostics | 12 | `f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1` |
| R23 compatibility sources | 8 | `227c81c523533898683a038fd84e5fa76862c1d143f38b7648e5f4daa2dd0579` |
| R26 direct-space sub-bank | 24 | `2ddd02cc41f814b0874520d14f575d1895bd02f1ceb451a661b1ea0b121ec3c2` |
| R26 branch/scale supplement | 37 | `4e9708fdf70e0fb60bf064ebf645178d9424168d4730f4004d27c5a616a9c40c` |
| R26 `direct.concat(supplement)` | 61 unique | `0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d` |
| D-W2-2 hostile fixture IDs | 9 | `419b7ffb365b7cec8373ace1004a06da55c3f341a7d67abc678272af1403513d` |

The mirror and LIVE source named-color tables each contain 148 ordered entries;
their compact `JSON.stringify(Object.entries(…))` bytes are equal and hash to
`2949c59aab6154988afb83744b954bd58146a06ada4d53831e6720ee01f64d0c`.

## 3. Semantic and ownership challenge

R19–R22 remain exact and narrowly implementable. R19 separates legacy syntax
without widening modern syntax. R20 scales before clamping and distinguishes
parser-produced normalization from direct serializer validation. R21 applies
idempotent hue normalization and only the required lower saturation clamp.
R22 preserves the distinct Lab/LCH and Oklab/OkLCh canonical ranges and does
not clamp unrelated coordinates. The 22 ordered rows remain seven R20, seven
R21, and eight R22 sources, each requiring the complete terminal value.

R23 and R24 are executable frozen-carrier compatibility REDs, not claims that
the CSS spellings are invalid. PB0 owns carrier inventory/freezing and PB5
owns the later lossless implementation. R25 correctly waits for PB1 decoded
tokens/position and PB4 substitution/provider ownership; it forbids a raw
substring, regex, or second balanced scanner in W2. Its eight semantic rows
plus the four D-W2-1 envelope rows now have one exact governing payload.

The atomic R19–R26 reservation prevents collision with W3. Ratification would
authorize only R19–R22/R26 W2 prototype semantics while fixing, but not
implementing, R23–R25 dispositions. The frozen 33-type + 19-runtime surface,
37-symbol keyframes seam, prototype-only path, and no-production boundary are
preserved.

## 4. R26 amendment challenge

I generated the 24 direct rows from the published space-major product, parsed
the exact 37-row JSON supplement, concatenated without reordering, and checked
that all 61 sources are unique. For every row I asserted success before every
`.value` access and ran exactly:

```text
C0 -> s0 -> C1 -> s1 -> C2 -> s2 -> C3
```

The current parser/serializer reproduces every published count:

```text
all intermediates successful:              61/61
first-cycle structural identity failures:  49/61
one-cycle fixed predicates passing:         48/61
bounded-two-cycle predicates passing:       61/61
```

The direct sub-bank separately retains 18/24 first-cycle structural failures,
24/24 stronger one-cycle fixed points, and 24/24 bounded-two-cycle passes. The
mandatory HSL control reproduces the exact last-unit transition
`3774.78466834873% -> 3774.784668348731% -> stable`; its final `C3` equals
`C2` exactly.

The branch decomposition covers direct fields, normalized hues,
percentage-backed HSL/HWB/Ok fields, percent-marked Lab/LCH lightness, alpha
omission/precision, and concrete D50 output. R19–R22 transforms are idempotent.
The exact universal predicates `s2 === s1` and `C3 deep-equals C2` contain no
tolerance. Keeping this as evidence instead of adding formatter retries is
the parsimonious choice and preserves first-pass spelling.

The corrected harden artifact also freezes update timing, word order,
endianness, finite-skip consumption, equality, and runtime receipts for the
supporting scalar generator. That sweep remains supporting only; it cannot
replace the normative 61-source gate. R26 still authorizes no formatter,
scanner, public-type, PB, or production change.

## 5. Direct repairs, KISS, replay, and mechanical baseline

D-W2-1 uses the existing function-head envelope once. D-W2-2 requires one
outer exception boundary and explicitly rejects proxy detection, hostile
cloning, recursive walking, and per-property catches. D-W2-3 persists exact
digested evidence rather than a prose agreement count. D-W2-4 reuses all
three W1 wrappers and retains independently gated W1 TODO rows.

The proposed implementation remains localized: private legacy leaves, shared
numeric transforms, one envelope check, one serializer catch, and generated
test banks. It forbids a second scanner/tokenizer, color hierarchy, public
token/type growth, duplicated serializer, or precision-policy change. Shared
foundation edits explicitly reopen their matching replay.

The downstream graph is complete: full W1 color replay; exact R26 chain and
hostile boundary through W4; PB1 lexical replay; PB4 substitution ownership;
and PB5 lossless R23/R24 growth after PB0 and owner gates. W4 remains
close-held on accepted W2 and W3.

Mechanical baseline at this challenge was GREEN but earns no semantic credit:

- 11 test files, 59 passed, 4 explicitly retained W1 TODO;
- TypeScript check and d.ts parity GREEN at 33 type + 19 runtime exports;
- exact `@mkbabb/parse-that@1.0.0`; and
- zero production dependency vulnerabilities.

## 6. Holds and next authority step

This fresh A ACCEPT is only one of the two required independent challenges.
Until independent B also ACCEPTs, root completes the E-3 gestalt, and the
owner explicitly ratifies ADDENDA-04 §7:

- R19–R26 semantic implementation remains unauthorized;
- W2 remains **REJECTED**;
- R23–R25 remain executable deferred RED gates;
- W4 remains close-held;
- PB0/PB1/PB4/PB5 receive no implementation authority from this sheet; and
- production paths, parse-that/BBNF/keyframes source, `scripts/dev/dev.sh`,
  and every `INBOX.md` remain untouched.

Fresh authority-chain challenge A seal: **ACCEPT the corrected governing
authority pair; no defects found in ADDENDA-04's semantics, evidence,
ownership, bounded R26 contract, KISS boundary, or replay/hold topology.**

---

# Historical report — fresh independent final challenge A (pre-erratum)

status: `FRESH_REJECT`

challenged sheet SHA-256:
`d17f0301d4ec19dfd6a1561cca8ba7266cf29dfe7d396d3e21d65d6aa1b13a67`

model_served: inherited Codex subagent route; the service-side backend alias
and effort label were not exposed to this seat, so this receipt does not claim
Opus

date: 2026-07-21

This is a fresh assume-faulty challenge of the current amended
`ADDENDA-04.md`. I started from its current bytes, recomputed its evidence,
exercised the complete R26 chain against the present parser/serializer and a
separate R19–R22 transform simulation, and did not read or contact challenge
B. I changed no parser, serializer, test, production source, Phase-B artifact,
or coordination file. This report is my only write.

## Verdict

**REJECT.** The bounded-two-cycle R26 amendment is mechanically sound on its
published normative domain: all three R26 payload digests, all declared result
counts, and both exact `s2 === s1` / `C3 deep-equals C2` predicates reproduce
under the current and simulated post-R19–R22 compositions. R19–R24, the R25
terminal outcomes, the named-color lock, ownership split, replay graph, and
KISS implementation boundary also survive challenge.

One governing-authority contradiction nevertheless prevents an ACCEPT. The
sheet says that, on **every conflict**, the harden rulings H-R19–H-R26 govern.
H-R25 still publishes `3397ba83…` for the twelve-source diagnostic payload.
The current addendum publishes the exact twelve strings and correctly hashes
them to `f1dac2a8…`. Those requirements cannot both be satisfied. The
addendum's amendment receipt calls `3397ba83…` orphaned, but neither the
authority clause nor an appended harden erratum gives that correction
precedence; the only explicit harden supersession is scoped to R26.

This is not a cosmetic provenance note. It leaves the owner and later W2
evidence implementation with two mutually exclusive governing R25 gates.
Until the precedence is repaired and the resulting authority chain receives
two fresh challenges, `ADDENDA-04` is not challenge-ACCEPTED, R19–R26 remain
unauthorized, and W2 remains **REJECTED**.

## 1. Historical verdicts remain history

The prior A reports against these sheet digests retain their historical
force and earn no acceptance credit for the current bytes:

| challenged digest | historical result | disposition in current sheet |
|---|---|---|
| `f629b82e79f198bb7c272a9f76e5763e73109d7e15dc2f4ae7fb9ce201f4941f` | REJECT | exact diagnostics, R23/R24 REDs, named-color lock, and then-R26 predicate were amended |
| `790a30eb42f1814b5ac2ed5027a9bbfaef7ffa2482c9496b669685565066dba8` | FRESH_REJECT | universal one-cycle R26 was replaced by the bounded-two-cycle chain |

This challenge gives no credit merely because those defects were repaired. It
recomputed the current artifact and found the independent precedence defect in
§6.

## 2. Independent source and identity verification

I fetched both official source objects from the exact immutable CSSWG commit
instead of a moving branch:

| object | bytes | Git blob | SHA-256 | result |
|---|---:|---|---|---|
| `css-color-4/Overview.bs` | 430,720 | `238300b75970ab68bf6a0b9339f8e3a01c749b59` | `f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a` | exact |
| `css-color-5/Overview.bs` | 182,733 | `26f508fc194d45cb0c228a32ba93ad118f9fc327` | `e419968b08ee2768fab0c4b667a73541e35cb8cd0b444fb2b6e2d46b1c8ddc15` | exact |

The pinned Color 4 bytes directly support homogeneous legacy RGB kinds,
percentage-valued legacy HSL saturation/lightness, parsed-value clamps,
missing components, and `display-p3-linear`. Color 5 independently retains
the same linear Display-P3 arm. The frozen Phase-A carrier has neither a
distinct `xyz-d50` missing-component representation nor a
`display-p3-linear` arm, so R23/R24 cannot be truthfully lowered in W2.

Removing `manifest_content_digest`, recursively sorting object keys while
preserving array order, and hashing compact JSON reproduces the 76-root
manifest digest
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.

All current compact-JSON evidence identities recompute exactly:

| payload | rows | recomputed SHA-256 |
|---|---:|---|
| R19 reject supplement | 45 | `7dd4d3d350018c5da4159cef0699493b2df4032d6654080729f98594e0f1aa26` |
| R20–R22 exact-value sources | 22 | `3b9c26919decb811f8f65a3e34d3ab79fa25f27d83cf4e9305b0c2dfd82701fd` |
| D-W2-1 + R25 diagnostics | 12 | `f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1` |
| R23 compatibility sources | 8 | `227c81c523533898683a038fd84e5fa76862c1d143f38b7648e5f4daa2dd0579` |
| R26 direct-space sub-bank | 24 | `2ddd02cc41f814b0874520d14f575d1895bd02f1ceb451a661b1ea0b121ec3c2` |
| R26 branch/scale supplement | 37 | `4e9708fdf70e0fb60bf064ebf645178d9424168d4730f4004d27c5a616a9c40c` |
| R26 `direct.concat(supplement)` | 61 unique | `0ae4458538481368a79e71e4efc6c7e15505146c35d40129f96114ba73ba8b6d` |
| D-W2-2 hostile fixture IDs | 9 | `419b7ffb365b7cec8373ace1004a06da55c3f341a7d67abc678272af1403513d` |

`JSON.stringify(Object.entries(NAMED_COLORS))` contains 148 ordered entries
in both the mirror and source table. The arrays are byte-equal and hash to
`2949c59aab6154988afb83744b954bd58146a06ada4d53831e6720ee01f64d0c`.

## 3. R19–R22 semantic challenge

### R19

The current mirror rejects exactly the first 11 modern-only comma rows and
wrongly accepts the remaining 34 legacy-defect rows in the 45-source bank.
That is the expected born-RED partition. The proposed repair is exact:

- legacy RGB channels are homogeneous numbers or homogeneous percentages;
- legacy HSL saturation/lightness are percentages;
- no legacy component or alpha accepts `none`;
- modern space syntax retains mixed kinds and `none`; and
- one pair of private legacy leaves over the existing `numUnit` parser is
  sufficient; no second color parser or token system is needed.

The exact accept examples in the sheet agree with the pinned grammar and the
existing canonical units. No R19 row widens another modern color family.

### R20–R22

The 22-source denominator is ordered as seven R20, seven R21, and eight R22
rows. Eighteen currently parse; applying the specified scale-then-clamp,
hue-normalization, and missing-component-preservation transforms produces the
sheet's exact complete values for all 18. The remaining four are the current
factory-level out-of-range-alpha failures; moving alpha clamping to the
parser-produced value boundary yields exactly the four specified terminal
values without widening direct serializer input.

The branch rules match the pinned parsed-value semantics:

- direct RGB and concrete alpha clamp to their declared ranges;
- `color()` coordinates remain unbounded;
- HSL/HWB/LCH/OkLCh hues normalize to `[0,360)`;
- only negative HSL saturation is clamped;
- Lab/LCH and Oklab/OkLCh lightness use their distinct canonical ranges; and
- only negative LCH/OkLCh chroma is clamped.

The transforms are idempotent and fit the existing row/factory architecture.
R19–R22 are substantively ACCEPTABLE **subject to the sheet-level verdict**.

## 4. R23–R25 deferral and executable evidence

All eight ordered R23 sources currently return the exact full-source
`css_syntax`, `expected:["concrete xyz-d50"]`, and `actual:source`
compatibility projection. R24 currently returns the exact full-source
`css_syntax`, `expected:["CSS color space"]` projection for
`color(display-p3-linear .1 .2 .3)`. The sheet labels both as frozen-carrier
limits rather than invalid CSS and routes their lossless implementations
through PB0 then PB5. That is the smallest honest disposition.

The twelve-source diagnostic bank exposes the intended current failures:

- `_()`, `-x()`, and `--x()` have the wrong expected set;
- `foo(1 2 3)` already has the retained `expected:["CSS color"]` result;
- `not-from`/`--from`/the RGB `not-from` row are wrongly swallowed by the raw
  word search;
- the two true relative-color rows already return context-required; and
- the three nested `var()`/`env()` rows wrongly return ordinary syntax errors.

The terminal results and owner split are correct. D-W2-1 needs only the
existing function-head envelope. R25 correctly forbids a raw substring,
regex, or second balanced scanner and waits for PB1 tokens plus PB4
substitution ownership. The defect is not R25's semantics; it is the
conflicting governing digest described in §6.

## 5. R26 bounded-canonicalization challenge

I generated the direct bank from the published space-major cartesian product,
parsed the exact 37-source JSON supplement, and concatenated them without
reordering. Every source is unique. For every row I asserted every operation
succeeded before reading `.value` and executed the exact chain:

```text
C0 -> s0 -> C1 -> s1 -> C2 -> s2 -> C3
```

Against the current parser/serializer, the result is exactly:

```text
all intermediates successful:                61/61
first-cycle structural identity failures:    49/61
one-cycle fixed predicates passing:           48/61
bounded-two-cycle predicates passing:          61/61
```

I repeated the chain with R20–R22 normalization reapplied after every parse
(R19 does not alter these modern R26 sources). The counts are identical. The
direct 24-source sub-bank independently retains 18/24 first-cycle structural
failures, 24/24 one-cycle fixed points, and 24/24 bounded-two-cycle passes.

The mandatory HSL witness reproduces its required last-unit transition:

```text
s0 = hsl(10deg 9986.367914825678% 3774.78466834873% / 50%)
s1 = hsl(10deg 9986.367914825678% 3774.784668348731% / 50%)
s2 = hsl(10deg 9986.367914825678% 3774.784668348731% / 50%)
C3 deep-equals C2
```

The branch decomposition covers direct numeric fields, normalized hues,
percentage-backed HSL/HWB/Ok lightness fields, percent-marked Lab/LCH
lightness, alpha precision/omission, and concrete D50 output. R19–R22 are
idempotent before the decimal composition. A separate ten-million finite-word
stress challenge of both `d/100` and `d*.01` parser-produced percentage paths
found no value beyond the stated two-cycle bound.

The universal statement remains an implementation property, not a claim that
61 examples enumerate every binary64 value. The sheet's branch decomposition,
exact boundary controls, and executable universal predicate are sufficient
for this prototype gate. Keeping canonicalization in evidence rather than
adding a retry loop to runtime serialization is the KISS choice: a loop would
alter first-pass spelling and add runtime work without changing CSS semantics.

The published 3,000,000-sample scalar counts are supporting rather than
normative. Their terse phrase "paired words as binary64" does not completely
freeze update timing, word order, or byte order, so D-W2-3 should retain the
generator as source-controlled code before claiming those exact counts at
close. This does **not** invalidate the exact 61-source normative gate, whose
bytes and results are fully reproducible.

R26 is substantively ACCEPTABLE **subject to the sheet-level verdict**.

## 6. Blocking authority defect

The sheet's authority chain says:

```text
On every conflict, the harden rulings H-R19–H-R26 ... govern,
with the harden file's appended controlling R26 amendment
superseding its original one-cycle H-R26 text.
```

The governing H-R25 text still states:

```text
ordered twelve-source diagnostic payload SHA-256 = 3397ba83...
```

The current addendum's exact array necessarily hashes to:

```text
f1dac2a858a17ea2179f504efc7966779eb942eb2dfc589b0c567246fbf539a1
```

There is no alternate ordering in the current sheet that produces the harden
value, and the sheet expressly forbids an unpublished payload from justifying
its digest. Because harden is declared controlling, an implementer cannot
know whether the exact array/`f1dac…` gate or the superseding `3397…` claim is
the owner-ratified requirement. The R26 conflict has a specific controlling
harden amendment; R25 has no equivalent erratum or precedence exception.

The amendment receipt's description of `3397…` as "orphan" is not enough to
repair an explicit `harden governs` rule. This contradiction must be removed
before owner ratification.

## 7. Exact repair required

Make one authority-preserving correction, without changing R25 semantics:

1. append a controlling harden erratum that replaces the H-R25 `3397ba83…`
   value with the exact published twelve-source array and `f1dac2a8…` digest;
   **or** amend the addendum's precedence clause to say explicitly that its
   later exact diagnostic payload/digest supersedes the stale H-R25 identity;
2. retain the current R19–R26 semantics, 24/37/61 R26 banks, bounded-two-cycle
   predicates, PB ownership, frozen surface, KISS prohibitions, and replay
   topology unchanged;
3. identify the scalar stress generator's exact word/update/endianness mapping
   when it becomes source-controlled D-W2-3 evidence; do not substitute that
   supporting sweep for the normative 61-source gate; and
4. record the resulting authority-chain identities and run two fresh
   independent challenges. Neither historical rejection nor this rejection
   earns ACCEPT credit for changed governing bytes.

No semantic re-formation is required. R23/R24 remain PB0→PB5, R25 remains
PB1→PB4/W2 replay, no W2-local scanner or public type growth is permitted,
and R26 retains its current formatter-free bounded-two-cycle contract.

## 8. Holds

Until the correction above is twice challenged, gestalt-adjudicated, and
explicitly owner-ratified:

- R19–R26 semantic implementation remains unauthorized;
- D-W2-1–D-W2-4 may receive no acceptance credit merely by landing;
- W2 remains **REJECTED**;
- W4 remains close-held on independently accepted W2 and W3;
- PB0/PB1/PB4/PB5 receive no authority from this sheet; and
- production paths, parse-that/BBNF/keyframes source, `scripts/dev/dev.sh`,
  and every `INBOX.md` remain untouched.

Fresh final challenge A seal: **REJECT the current authority chain; R19–R26
substance, including amended R26, otherwise passes this challenge.**
