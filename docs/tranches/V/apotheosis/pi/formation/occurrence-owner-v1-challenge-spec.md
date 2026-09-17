# V·π occurrence → owner formation v1 — specification/completeness challenge

**Verdict: REJECT.** The exact artifact is byte-authentic, deterministic, and
useful as a raw regex-discovery dump, but it is not a sound PROVISIONAL
occurrence/owner-formation input. Exact rows that are informative, historical,
semantically truncated, or multiply owned are emitted as
`PROVISIONAL_NORMATIVE_CANDIDATE` / `JOINED_PROVISIONAL` with empty
`red_flags`. Two owner-scope joins are not anchored to any exact ADDENDA-01
input line. These are missing proofs represented as successful formation, not
honestly RED remainder.

This rejection grants **zero final denominator, parser, feature, compatibility,
conformance, wave, cost, or production credit**. The authenticated source
closure, reproducible serialization, and exact required slices may be reused in
a repaired formation; no absence or exclusion may be inferred from this assay.

## Exact challenged subjects

| subject | independently reproduced raw SHA-256 | bytes |
|---|---:|---:|
| `denominator/occurrence-owner-formation-v1.json` | `86d021681ed0e46c067b7a103c35f34ec0793d8eca90059e0d50c6a554f46407` | 12,766,323 |
| `denominator/tools/occurrence-owner-formation-v1.mjs` | `74105301b0dcf66f1c4b014c18e52479e2799edcb6bfd626fd5c4ea68c3b4863` | 51,103 |
| `formation/occurrence-owner-fixed-point-v1-2026-07-22.md` | `4794b356d2b89abf3865dc86834c68a46838be3dbbc3000be6d1f7ec7e9da6c3` | 8,955 |

The artifact's actual top-level schema was inspected directly. Removing the
appended `content_digest_sha256`, `content_digest_method`, and `replay` fields,
then hashing compact UTF-8 `JSON.stringify(payload)`, independently reproduces
`b448dd79cc2d55c92e30305145949255cbf8f027c754ee8b36149ae358be5c92`.
The generator was run to a private temporary output against
`/private/tmp/value-pi-csswg-complement.TpPSHC`; its 12,766,323 bytes were
byte-identical to the challenged JSON and had the challenged artifact hash.

## Altitude I — gestalt

The operation has a sound authentication shell and an unsound semantic center.
It proves that all 168 pinned files were read with the expected hashes and that
the generator deterministically emits the challenged bytes. It does not prove
that the emitted slices are semantic occurrence boundaries, inherit the right
normative context, exhaust operation/recovery/serialization carriers, or have
unambiguous owners.

The central failure is not ordinary incompleteness. Ordinary incompleteness
would be acceptable here if it stayed RED. Instead, the generator uses
slice-local word tests to issue successful normativity and owner statuses. It
then builds 1,394 semantic owner edges and an owner/cost lattice from those
statuses. Exact counterexamples below show that successful statuses include an
explicitly non-normative section, change-history bullets, term-only `<dt>`
slices that omit their defining `<dd>`, a five-candidate owner choice silently
forced to `color`, and one semantic heading split among three owner families.

Accordingly, the artifact cannot yet serve as the inclusive owner-formation
input claimed by its name. It can serve only as unaudited discovery evidence.
The receipt's disclaimer that the result is not a denominator is correct and
binding, but it does not cure false successful row statuses.

## Altitude II — formation

### Reproduced census

| measure | exact result |
|---|---:|
| authenticated sources | 168 = 76 seed + 92 complement |
| authenticated source bytes | 14,609,103 |
| source formats | 153 Bikeshed; 10 legacy source HTML; 5 generated/legacy HTML |
| carriers | 17,079 |
| carrier bytes, non-union sum | 5,907,696 |
| union of carrier intervals | 4,853,156 bytes = 33.22% of source bytes |
| owner status | 6,369 joined provisional; 8,207 RED unjoined; 2,503 RED ambiguous |
| rows with any RED flag | 11,408 |
| rows with no RED flag | 5,671 |
| compact reference edges | 4,075 = 2,386 resolved + 1,558 external/unresolved RED + 131 ambiguous RED |
| semantic owner edges | 1,394 |
| semantic references unjoined/ambiguous | 5,292 |
| compatibility census | 19 runtime + 33 type = 52; keyframes seam 37 |
| owner-extension roots | 11 |

Carrier kinds also reproduce exactly: 441 grammar productions, 730 property
definitions, 129 descriptor definitions, 49 at-rule definitions, 311 function
definitions, 129 selector definitions, 6,581 semantic definitions, 300
algorithm blocks, 64 algorithm sections, 1,911 invalidity/recovery rules, 59
serialization sections, 896 serialization rules, 5,469 rows named
`normative_reference`, and 10 required counterexample rows.

The 33.22% interval union is not itself a rejection: a carrier assay need not
cover prose byte-for-byte. It does make the boundary explicit. Authentication
of every source byte is not occurrence coverage, and the fact that every source
has at least one carrier cannot support any denominator or absence claim.

### What the schema and generator actually decide

1. `normativity(raw)` looks only inside the selected slice for
   `non-normative`, `informative`, or `example`. It does not inherit a section,
   container, status, appendix, changes, or history context. Anything else is
   `PROVISIONAL_NORMATIVE_CANDIDATE`.
2. `headings()` recognizes HTML `<h1>`–`<h6>` headings and setext underlines.
   It does not recognize Bikeshed ATX headings such as
   `### Heading ### {#anchor}`. The pinned Bikeshed tree contains 617 ATX
   heading lines.
3. `enclosingParagraph()` treats `dt` and `dd` as boundaries. A `<dt><dfn>`
   becomes a term-only carrier while the defining `<dd>` is excluded.
4. General semantic rows become owner-ambiguous when more than one domain
   regex matches, but `function_definition` is special-cased: it chooses the
   first preferred `color` / `easing` / `gradients` / `transforms` / `filters`
   candidate, or defaults to `func-body`, even when several candidates remain.
5. `ALGORITHM_COMPLETENESS_RED` tests only whether an algorithm slice contains
   a numbered step, `<li>`, `<ol>`, `return`, `consume`, or the exact word
   `parse`. Presence of one token is not a boundary/completeness proof.
6. Reference discovery recognizes Bikeshed `[[...]]` and only selected CSSWG /
   W3C TR URLs. Resolution is a one-pass directory-name heuristic over the
   initial 168 sources; it does not iterate an external queue to a fixed point.
7. Owner-scope input status is based only on whether hard-coded search terms
   occur in already-detected carrier raw text. It does not require an exact
   owner-input line to have been found.

Positive control: all 300 explicit supported algorithm markup openings were
covered by an `algorithm_block`. That does not cover algorithms expressed as
Markdown lists, definition lists, ordinary prose, or ignored ATX sections.

### Machine-visible ambiguities that are not RED

There are 83 `function_definition` rows with more than one recorded owner
candidate; 75 have empty `red_flags`. Independently grouping joined rows by the
generator's own slugged symbol key finds 469 symbol keys assigned to more than
one owner, covering 2,027 joined rows; 1,899 of those rows have empty
`red_flags`. Neither population is included in the artifact's 2,503
`RED_AMBIGUOUS` count.

This is decisive: the owner lattice and occurrence-derived owner edges consume
rows that the payload itself contains enough information to mark ambiguous,
but does not.

### Reference queue is not a fixed point

The 4,075-edge arithmetic is exact, but the semantic label is too strong. In
particular, 419 `spec_url` edges have a four-digit year such as `2011` as their
`reference_value`, because the URL extractor takes the first path component of
a dated URL like `https://www.w3.org/TR/2011/REC-CSS2-20110607/...`. Another 73
edges spell the target `CSS21` and remain external/unresolved while the closure
contains `css2`; the artifact has no version/alias adjudication establishing
whether those historical references map to the pinned CSS2 source. These edges
are conservatively RED, which is preferable to a false resolution, but they
show that the structure is a syntactic discovery queue, not a reference fixed
point.

### Owner experiment anchoring

The `owner-easing-spring` and `owner-typed-declarations` rows correctly remain
`RED_NO_EXACT_CARRIER` with zero carrier matches. Two other rows do not retain
the exact input join claimed by the receipt:

| row | ADDENDA-01 source wording | serialized `input_lines` | carrier matches | serialized status |
|---|---|---:|---:|---|
| `owner-calc-math` | line 28: `calc/math (operators, min/max/clamp, stepped/trig/exp)` | empty | 74 | `PROVISIONAL_OCCURRENCE_JOIN` |
| `owner-substitution` | line 38: `substitution var/env/attr typed` | empty | 97 | `PROVISIONAL_OCCURRENCE_JOIN` |

The hard-coded terms require `calc()`, `min()`, `max()`, `clamp()` and `var()`,
`env()`, `attr()`, so neither owner-input line matches. A source-side hit cannot
manufacture the missing input-side occurrence. These two statuses must be RED
or must serialize a separately justified normalization from the exact input
line to the search terms.

## Altitude III — field

### Exact context and carrier counterexamples

All listed slices independently replayed their line interval, byte count, and
SHA-256 against the pinned source tree.

1. **Explicitly informative Bikeshed context becomes unflagged normative.**
   `occ-e5b97ac99b2bac6d1cf920b0`, `css-shadow-1/Overview.bs` lines 203–205,
   202 bytes, slice SHA-256
   `0a682052d4caed62ced4477b4b3f1d73d9bc3ed64448eb0a5a6ff4cb61723823`.
   The immediately enclosing heading at lines 195–196 is “Informative
   Explanation of Shadow DOM”; lines 198–201 say the following is a
   non-normative explanation. The carrier excludes that context, labels itself
   `PROVISIONAL_NORMATIVE_CANDIDATE`, joins
   `selectors/informative-explanation-of-shadow-dom`, and has `red_flags: []`.
2. **Bikeshed change history becomes unflagged normative/owned.**
   `occ-0355d6fb3fea11cd571abba8`, `css-transforms-1/Overview.bs` line 1455,
   163 bytes, SHA-256
   `827d9c0176eb7fecc8fb781922e4838fe2a0ac2502a757040e8b55f0b34e2bc1`.
   It is under the `Changes` heading and the “Since the 14 February 2019
   Candidate Recommendation” subheading, yet is an unflagged normative
   candidate joined to
   `transforms/since-the-14-february-2019-candidate-recommendation`.
   A conservative name probe finds at least 327 no-RED rows whose headings
   advertise changes/history/status/references/security-like context.
3. **Legacy HTML change history becomes a recovery rule.**
   `occ-049569ee9a45214b23edc2e7`, `css-fonts-3/Overview.html` lines 5243–5244,
   110 bytes, SHA-256
   `5fcdb6e86cf48836db5c33f12a079d4fd24280dd710dafeaa822ed188cca6a14`.
   A change-log bullet says negative values were made invalid. The word test
   emits `invalidity_recovery_rule`, joins
   `value-unit/changes-from-the-october-2013-css3-fonts-candidate-recommendation`,
   calls it a normative candidate, and emits no RED flag.
4. **Bikeshed definition body is missing from an unflagged semantic carrier.**
   `occ-00147853f30d944a1bc49e66`, `css-syntax-3/Overview.bs` line 816, 56
   bytes, SHA-256
   `4b768c66cc009f4d1d9df26fc77cc210481c05267fbd1fc3f454f0d8c035326b`.
   The slice contains only
   `<dt><dfn>reconsume the current input code point</dfn>`; its defining body
   is at lines 817–820 and is excluded. The row is nevertheless an unflagged
   normative candidate joined to `tokens/reconsume-the-current-input-code-point`.
5. **Generated legacy HTML has the same boundary defect.**
   `occ-ee8ab0daf6e37808936063a0`, `css-color-3/Overview.html` line 2818, 51
   bytes, SHA-256
   `35e54e1db8516683c85a0894391f40497e7bb488c6b927e2671d7ff8940b5d57`.
   The slice contains only `<dt><dfn id=currentColor-def>currentColor</dfn>`.
   The defining used-value and `color: inherit` semantics start at line 2820
   and are excluded, while the row is unflagged and joined to
   `color/currentcolor`.

Across the full tree, 225 unflagged Bikeshed `DFN_PARAGRAPH` rows and one
unflagged generated/legacy HTML row have this exact term-only `<dt>` /
following-`<dd>` shape. A content-addressed term occurrence is valid discovery
evidence; it is not a content-addressed semantic definition or operation
boundary.

### Serialization and algorithm-boundary counterexample

`cssom-1/Overview.bs` lines 3063–3260 contain the ATX section
`### Serializing CSS Values ### {#serializing-css-values}` and its normative
rules. The generator creates **zero** `algorithm_block`, **zero**
`algorithm_section`, and **zero** `serialization_section` rows intersecting
that range. It emits 25 fragmented `serialization_rule` rows instead. Of 159
nonblank lines in the range, only 68 are covered by an algorithm,
serialization, or semantic-definition carrier; 91 are not.

The missed material includes the explicit `<ol>` counter serialization
algorithm at lines 3150–3162 and its steps at lines 3151–3157 and 3160–3162,
and the shape serialization algorithm at lines 3210–3218. This is not cured by
exact hashes on the fragments that were found. It is an exact operation-boundary
false negative caused by the unsupported ATX heading and paragraph trigger
model.

The pinned tree also contains `## Serialization of Filter Functions ##
{#serialization-of-filter-functions}` at `filter-effects-1/Overview.bs` line
494. The heading parser misses it; the line becomes a one-line
`serialization_rule` with `ANCHOR_RED` and `NAME_RED`, and no serialization
section is emitted. That row is honestly RED, but it confirms the systematic
heading gap.

### Exact owner counterexamples

* `occ-2fbe4aab3ffbd724400c0fd9`, `css-values-5/Overview.bs` lines 1255–1259,
  493 bytes, SHA-256
  `91b2d25a480a2dc10e8739f5a1450dbb5ed4a187eac036c2a50d29ea3357ee92`,
  defines the `by` keyword for interpolation easing. The row records candidate
  families `color`, `easing`, `transforms`, `keyframes`, and `keywords`, then
  silently chooses `color/by`; `red_flags` is empty.
* `occ-0029f0fc2902d2b6709d7413`, `css-images-3/Overview.bs` lines 266–270,
  432 bytes, SHA-256
  `3eb76892c0a8bd5aa89ca9aa625bf62114cb0f0faff8455d780b47628e3f858f`,
  is named `gradient functions`, records candidates `color` and `gradients`,
  chooses `color/gradient-functions`, and has no RED flag.
* Within the single `Serialization of Basic Shapes` section of
  `css-shapes-1/Overview.bs`, four no-RED rows carrying the same fallback name
  are assigned three owners:
  `occ-07213bc7578768195b61a481` and
  `occ-567790a88fceb0782ed6bde0` →
  `stylesheet/serialization-of-basic-shapes`;
  `occ-88776586dcf1048e06c7e988` →
  `func-body/serialization-of-basic-shapes`; and
  `occ-abc13a4ce87633a5a484be49` →
  `properties/serialization-of-basic-shapes`.

These are not disagreements requiring outside semantic taste. The rows
themselves record multiple candidates or an identical symbol key with
incompatible owners. A sound formation must serialize that ambiguity as RED
before computing edges or cost.

### Required counterexample replay

All ten mandated rows exist and independently replay exactly:

| requirement / carrier | source lines | slice SHA-256 | replay |
|---|---:|---:|---|
| shadow part mapping / `occ-4326d12b3f6a5812fc4642da` | `css-shadow-1` 1475–1531 | `fe372e923f6015ec5bd4219908fbc4cf27016da5c7735d2f20871382c72d5b60` | GREEN |
| mixins function parse/token / `occ-eee5367713d12a620b3d5469` | `css-mixins-1` 198–318 | `324402d9507859397fab5d87c48e4a86882f32ab0f80f3ae27cd51a250e45323` | GREEN |
| mixins dashed-function/token / `occ-f6baee420fb14da41fe60c66` | `css-mixins-1` 406–478 | `0b0367a04654afe16caa04bfad8d7750fd2801a74cd80628db08e5707957412f` | GREEN |
| forward-compatible parsing / `occ-83ca63f3ac1ebd46497414cb` | `css-2026` 736–756 | `1db81d48923606c362ef0731b36f9cb6ba6027c8d339bab091afffe9197268e6` | GREEN |
| parse-error/recovery / `occ-fc99fa8897a54f67b9421735` | `css-syntax-3` 276–297 | `db0de31bf2acc4b2c45a2ce5cc8086e6a49611f801f2315675b9400d8397b28a` | GREEN |
| preprocessing / `occ-6d2af9aa45040ec589a7f38d` | `css-syntax-3` 437–460 | `254283539f5059837878a99451375e82d012bad55f1c0c9be7533a39ab20824f` | GREEN |
| tokenize entry / `occ-d16a3984008cac97a20e1a26` | `css-syntax-3` 463–490 | `13a70a61b51488777e6bfbf1b8323846663bb436fe51a5d139e1707b0a590ecd` | GREEN |
| component-value parse entries / `occ-bc21d7b7dcac3de39494b420` | `css-syntax-3` 2454–2519 | `f4dcd0b0b0decef151e6f5ab04e23218b3a1523fc54a096762565d37c25467b1` | GREEN |
| component/block/function consumption / `occ-c7d16bfcd4a9bcb95fd1db18` | `css-syntax-3` 3069–3179 | `97da4d33f344a6dae2b6a2de6641e30c6407c39e4b192fd162c0c87222a616d4` | GREEN |
| round-trip serialization / `occ-0402e4aa6b5d4162ab753861` | `css-syntax-3` 3698–3749 | `49e457ec74a57b526b64246edf4b0f42adf82e6ef15fcda4f26114aed77637e1` | GREEN |

Presence and slice integrity are all that this proves. Three required rows
(`occ-fc99fa8897a54f67b9421735`, `occ-bc21d7b7dcac3de39494b420`, and
`occ-c7d16bfcd4a9bcb95fd1db18`) have empty `red_flags`, because the superficial
completeness-token test passes. The mandatory set does not establish full
token, recovery, component-value, serialization, or algorithm-boundary
coverage, as the exact CSS Syntax definition-body and CSSOM serialization
counterexamples demonstrate.

## Repair bar

An exact successor may return for challenge only after it:

1. inherits Bikeshed/HTML section and container context, including ATX
   headings, examples, informative/non-normative regions, appendices, change
   logs, and historical snapshots;
2. content-addresses the defining body of definition-list terms, or marks
   term-only rows as boundary-incomplete RED;
3. emits reviewed algorithm/recovery/serialization boundaries for Markdown
   lists and legacy structures, with negative coverage probes rather than a
   keyword-presence completeness test;
4. marks every multi-candidate function and every conflicting same-symbol owner
   assignment RED, and excludes those rows from owner edges/lattice cost until
   adjudicated;
5. either renames the reference structure as a syntactic discovery queue or
   implements dated-TR parsing, alias/version adjudication, and an actual
   fixed-point process while retaining external uncertainty RED;
6. requires an exact owner-input line or serializes a reviewed normalization
   before granting `PROVISIONAL_OCCURRENCE_JOIN`; and
7. preserves the present authentication, slice replay, deterministic
   serialization, mandatory counterexample set, and zero-credit boundary.

No repair may convert the 168-source structural scan into a final denominator,
terminal exclusion, parser proof, conformance claim, or production
authorization without a later independent semantic adjudication.

## Challenge receipt

| field | value |
|---|---|
| challenger | independent specification/completeness challenger |
| model | OpenAI GPT-5 Codex agent |
| reasoning | adversarial three-altitude gestalt → formation → field audit; exact schema inspected rather than trusting the receipt |
| source workflow | read-only hash/size verification; direct generator inspection; private deterministic replay; independent payload digest; programmatic census; exact source-slice replay; Bikeshed and legacy boundary/context probes |
| independence | no sibling occurrence-owner challenge read; no communication with another challenger; no delegated subagent |
| mutation boundary | only this challenge file created; no parser, test, production, ledger, handoff, inbox, generator, artifact, or source mutation |
| challenged tree | CSSWG commit `c7573530343759ace8e46438a1fa2c44515b5554`, tree `75bf19c016ed98126381508073de6893c9f756f5` |
| final authority | REJECT; zero denominator/parser/conformance credit |
