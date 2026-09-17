# G14 skeptic 1 — specification and corpus

**Task receipt:** `/root/g14_skeptic_1`  
**Served model:** OpenAI Codex, GPT-5  
**Role:** hostile skeptic 1, specification/corpus axis  
**Reviewed root:**
`/Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g14`  
**Authority:** prototype review only; no integration, production, package, or
release authority  
**Verdict:** **ACCEPT exact H
`ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8`
on the specification/corpus axis.** Ranking: **H > D > S > B**. This is not
G14 apotheosis acceptance: the normative-document pin is not byte-reproducible
from the stated URL, original holdout-ciphertext custody was lost, and the
performance result is an inadmissible third capture on which all four
candidates fail the declared deposed-peer gate.

## Exact reviewed subject

I hashed the bytes before reviewing them. Every requested binding matched:

| artifact | required and observed SHA-256 |
|---|---|
| `feature.json` | `266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29` |
| `candidate-set.json` | `e2f786bb2e190da3c45e9f6396ffb98bad652772de12c6c047519d48c4fda5e6` |
| H | `ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8` |
| B | `42e6e6a3662c5bb30858b845fe04ced565ff6f755e7edd54d703804285f4e913` |
| S | `2edb390a542ebb98221c624934b14c009bc07c6b306cf7d4be1ccfcfd74202c8` |
| D | `a1e4fc2016362f4d1e4b49089c9580b85f6caa19d2adf91f60dd2dac412f8cd8` |
| public evaluator | `bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7` |
| holdout evaluator | `887799d06f170c6ae799cfb5ce5d5d825b555e50c394b21f78c5b156890e05c0` |
| holdout evidence | `fdc135c2cb9480a181321824cb67e823c7d9c3af07eaaa56dd8adba4d29c43d9` |
| benchmark manifest | `652f3f5056ff5d4fbcec69bba1b009a4a9612516d31da0a33ee4665b9a7e0807` |
| benchmark harness | `90ee2014b7e8705208c0d45c6ebf245f53ec7be3a573512fec32fb3890193540` |
| persisted third capture | `722f5edcd8b25337a0d08d724406f7038cdfa93df632687423c397dee172644a` |

The four candidates and the bound authority/evidence files were mode `0444`.
I also inspected the exact installed parse-that implementation: `regex` makes
the supplied expression sticky at `state.offset`; `dispatch` reads one ASCII
code unit; and `save`/`restore` preserves offset and predecessor value. Those
runtime facts are material to the UTF-16 and failure conclusions below.

## Altitude 1 — tranche fit

The boundary is correctly placed. CSS Syntax §4.3.13 is a prefix-consuming
primitive shared by percentages, dimensions, integer constraints, math, and
later value grammars. Keeping the retired `starts-with-number` predicate as
branch evidence inside this consumer avoids a zero-width lexical seam. The
ordinary `{ sign, type, value }` leaf belongs to `value-unit`; it creates no
token stream, generic CST, manual scanner, or second parsing architecture.

This cell cannot close the tranche. The active feature ledger still says the
full 168-source normative denominator has no accepted occurrence closure, and
ADDENDA-07 forbids broad pilot acceptance before that freeze. G14 also proves
neither CSS input preprocessing nor typed numeric-token construction, public
compatibility, final diagnostics, percentage/dimension serialization, or
integrated consumer behavior. Source spelling is recoverable here only from
the unchanged source and start/end UTF-16 offsets. That is suitable for this
leaf, but parents must preserve those observations.

There is a specification-pin defect. The stated normative source is the
[CSS Syntax editor's draft §4.3.13](https://drafts.csswg.org/css-syntax/#consume-number),
dated 10 June 2026. A fresh retrieval during this review showed that date and
the reviewed algorithm, but the response bytes hashed to
`0375dc2d4dda6d38fb97d60cbc35915bd2ad2c9ea0fe563d4d91c1d0ab3c2e46`,
not feature.json's unaccompanied
`755d81a47638112e13b6aa3e5c0599bc4b4aa308f4c1fd6f19cb984d838e019d`.
The substantive algorithm is independently inspectable and agrees with the
cell, but the exact document-hash claim is not reproducible without retained
bytes or a declared canonicalization.

## Altitude 2 — feature/cell

### Normative result

The 10 June 2026 algorithm consumes, in order: an optional ASCII sign; as many
ASCII digits as possible; a fraction only if the next two code points are `.`
and a digit; and an exponent only if `e|E`, optional sign, and at least one
digit form a complete lookahead. It sets type to `number` only after consuming
a fraction or exponent, returns the optional sign separately, and otherwise
leaves the suffix untouched.

The frozen ECMAScript adaptation is faithful at this boundary:

- CSS digits are ASCII only. Every candidate enforces that rule; JavaScript
  `\d` in H is also ASCII in the flags used here.
- A missing CSS sign is adapted to `null`. A present sign is returned even
  when the numeric value rounds or underflows to zero.
- `Number(consumedRepresentation)` gives the frozen binary64 adaptation,
  including `Object.is(value, -0)`, subnormal rounding, and infinities.
- A decimal point or exponent in an unconsumed suffix cannot change `type`.
- Each result is an extensible `Object.prototype` object with exactly the own
  keys `sign,type,value`, in that order, and ordinary writable, enumerable,
  configurable data descriptors.
- Offsets are ECMAScript UTF-16 code-unit offsets. Because every recognized
  syntax character is ASCII, sticky parsing at the supplied offset is a sound
  adapter from the spec's code-point stream after preprocessing. It does not
  itself perform that preprocessing.

Invalid starts are outside §4.3.13's starts-with-number precondition. The
cell's additional transaction contract is coherent: all candidates restore
the starting offset and exact predecessor identity, retain the source, set
`isError`, and preserve diagnostics already furthest ahead. Ordinary local
expected labels remain deliberately unnormalized, so no public ParseIssue
fidelity may be inferred.

### Independent corpus attack

The public evaluator independently replayed for each exact candidate and
reported 88 successes, 336 failure transactions, 10 parent cases, and 10
hostile cases, all PASS. `benchmark.mts --validate` also reproduced exact
24/24 leaf/end/binary64 validation for all seven lanes without running timing.

I then used a separately written procedural implementation of the seven
normative steps—no candidate regex and no corpus regex—to enumerate every
string of length zero through six over `{+, -, ., e, E, 0, 1, 9, x}`. Every
string was placed after an astral prefix and parsed from UTF-16 offset 2. The
assay covered 597,871 strings and 2,391,484 candidate executions. It checked
maximal end, source identity, failure transaction, sign, type, `Object.is`
value, prototype, exact key order, descriptors, mutability, and extensibility.
**H, B, S, and D had zero discrepancies.**

No candidate counterexample was found beyond the public and hidden cases. The
following exact additional probes were useful because they attack distinct
unsealed boundaries; all four produced the listed result:

| source / start | consumed representation / end | sign, type, value |
|---|---|---|
| `💥1e2e+3` / 2 | `1e2` / 5 | `null`, `number`, `100` |
| `💥01.2E+-3` / 2 | `01.2` / 6 | `null`, `number`, `1.2` |
| `💥+.25e2.5` / 2 | `+.25e2` / 8 | `+`, `number`, `25` |
| `💥12١3` / 2 | `12` / 4 | `null`, `integer`, `12` |
| `💥9007199254740993x` / 2 | `9007199254740993` / 18 | `null`, `integer`, `9007199254740992` |
| `💥-.0e-99999e2` / 2 | `-.0e-99999` / 12 | `-`, `number`, negative zero |
| `💥7.0e1\uD8002` / 2 | `7.0e1` / 7 | `null`, `number`, `70` |

Starting at the low surrogate in `😀1` (offset 1), at a lone high surrogate in
`"\uD8001"`, and at the Arabic-Indic digit in `١2` all failed transactionally
for every candidate. Separate conversion probes included the minimum normal,
a value just below half the minimum subnormal, and the 2^53 rounding boundary;
all values matched `Number` exactly.

### Holdout and recovery continuity

The public base continues exact G13 bytes at
`5056de266d0379ec3ae63b8a56d1a9c07f0607ff264aa22d6c7a7a177e7edd48`,
and the G14 repair corpus at
`d9e94359c3cac96ba44f151debed534042aabbca85e82d9e59c6022267bc18f2`
publishes the former `.0.0` common-mode failure before authoring.

I independently authenticated and decrypted the replacement `VPG14R01` frame
in memory using the revealed key, tag, and AAD. Its 13,840 plaintext bytes hash
to the preauthor receipt's exact commitment
`f53e24b703596990e9e53cf0160e2e32bf3a524022d41d982d251207ea5d5867`.
The 61 unique cases and eight family counts join the receipt, reveal, and
holdout evidence. The exact evidence reports 61/61 for every candidate and
checks maximal prefix, UTF-16 offsets, signed zero/extremes, mutable results,
failure identity, ahead diagnostics, parents, and bounded hostile strings.
This is strong hash-commitment continuity and satisfies the semantic purpose
of a precommitted hidden corpus.

It is not original-ciphertext continuity. The reveal expressly records
`original_key_continuity: false` and `original_ciphertext_continuity: false`
because the first custodian key expired. Consequently, authentication proves
the replacement frame and candidate-freeze AAD, while SHA-256 equality proves
identity with the plaintext commitment; nobody can now authenticate-decrypt
the original `VPG14H01` frame. The evidence must not describe the replacement
as cryptographic recovery of the original ciphertext. At review time the
whole G14 subtree was also untracked, so repository history supplies no
independent chronology beyond the content-addressed local receipts. These are
custody/provenance qualifications, not a reproduced candidate-semantic defect.

## Altitude 3 — per-candidate disposition

### H — ACCEPT on this axis

H is the clearest exact transcription: one sticky whole-prefix terminal and
one result map. Its fraction and exponent are independently complete, suffixes
cannot contaminate classification, and leaf failure naturally preserves the
predecessor. It passed every public, committed holdout, exhaustive, conversion,
and UTF-16 probe reviewed here. At 477 bytes it has the smallest grammar-drift
surface. **Axis verdict: ACCEPT exact SHA-256
`ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8`.**

### D — semantic PASS, ranked second

D's first-character dispatch and three sticky branches are exact, including
signed leading-dot forms and incomplete exponent rollback. It was the fastest
prototype in the persisted capture. It ranks behind H on this axis because it
duplicates mantissa/exponent spelling across three branches, increasing future
spec-drift risk without changing the recognized language. No semantic blocker
is asserted against exact D.

### S — semantic PASS, ranked third

S correctly repairs G13's repeated-fraction defect: `digits.opt().chain(...)`
chooses either a leading fraction or digits followed by at most one optional
fraction; it cannot consume `.0.0` whole. The staged exponent and transaction
wrapper are correct. Its larger stateful composition and reliance on an outer
restore offer no specification advantage over H/D, and ordinary failure-label
quality is unscored. No semantic blocker is asserted against exact S.

### B — semantic PASS, ranked fourth

B's factorized sign/mantissa/fraction/exponent construction is also exact, and
its wrapper is necessary to restore predecessor value after aggregate failure
in this parse-that runtime. It is the largest candidate, reconstructs several
intermediate strings, and has the most internal branch/allocation surface. No
semantic blocker is asserted against exact B, but it is the weakest selection
on KISS and drift exposure.

## External performance blocker and final disposition

The performance gate independently prevents G14 selection. The persisted file
is explicitly the **third** run after two successful but unpersisted runs; no
retry was predeclared, so its own disclosure assigns zero qualification credit.
The capture also reports no throughput unit. More decisively, every candidate
fails the predeclared strict comparison against `deposed`: one-sided 95% upper
ratios are H `1.8086`, B `4.9035`, S `3.8432`, and D `1.3809`, all above 1.
All four therefore have
`FAIL_NOT_STRICTLY_FASTER_THAN_ALL_THREE_PEERS`. A semantic ACCEPT for H cannot
override that gate or the capture defect.

**Final disposition:**
`ACCEPT_EXACT_H_ON_SPECIFICATION_AND_CORPUS_AXIS__HOLD_G14_APOTHEOSIS`.
Preserve H's exact bytes as this skeptic's nominee. Do not integrate or grant
feature/performance/production credit on this review. Repairing the normative
pin, custody story, benchmark capture, comparator outcome, or any candidate
bytes requires the generation treatment prescribed by ADDENDA-07.

**Credit:** parser `0`; feature `0`; benchmark `0`; integration `0`;
production `0`.
