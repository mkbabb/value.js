# V·π occurrence → owner formation v1 — architecture hostile challenge

**Verdict: REJECT.** The exact bytes are deterministic and their byte/line/slice
coordinates are internally reproducible, but they are not a sound provisional
occurrence-to-owner formation. The artifact emits false owner joins and false
`PROVISIONAL_EXACT_SYMBOL_REFERENCE_JOIN` edges without RED flags. Those are
positive semantic assertions, not merely conservative omissions awaiting later
review. This rejection grants **zero denominator, parser, conformance,
compatibility, Gate-2, cost, wave, or production credit**.

This review was independent. I did not read a sibling occurrence-owner
challenge and did not communicate with another challenger. No parser,
prototype, production, ledger, handoff, inbox, or wave file was changed.

## Exact subjects

| subject | independently observed raw SHA-256 | bytes | result |
|---|---|---:|---|
| `denominator/occurrence-owner-formation-v1.json` | `86d021681ed0e46c067b7a103c35f34ec0793d8eca90059e0d50c6a554f46407` | 12,766,323 | identity GREEN; semantics REJECT |
| `denominator/tools/occurrence-owner-formation-v1.mjs` | `74105301b0dcf66f1c4b014c18e52479e2799edcb6bfd626fd5c4ea68c3b4863` | 51,103 | identity GREEN; architecture REJECT |
| `formation/occurrence-owner-fixed-point-v1-2026-07-22.md` | `4794b356d2b89abf3865dc86834c68a46838be3dbbc3000be6d1f7ec7e9da6c3` | 8,955 | identity GREEN; substantive claims REJECT |

The stored compact-payload digest
`b448dd79cc2d55c92e30305145949255cbf8f027c754ee8b36149ae358be5c92`
also reproduces after removing `content_digest_sha256`,
`content_digest_method`, and `replay` and hashing compact UTF-8
`JSON.stringify(payload)`.

## Altitude I — gestalt

The formation has a sound byte-addressing shell around an unsound semantic
core. Reading and authenticating every source byte does not make regex domain
selection, lossy slugs, or spelling-only symbol resolution exact. The artifact
itself says that families and costs derive from “exact carrier joins and exact
symbol-reference joins”; that claim is false for the exact payload.

Three mechanisms combine into the blocking defect:

1. `semanticReferences()` deletes the scope before the first slash from every
   Bikeshed definition reference (`[=scope/name=]` becomes `name`; tool line
   198).
2. Definitions are indexed by a lossy `slug(name)` and ambiguity is measured
   by the number of resulting **owner strings**, not by scoped identity or
   target occurrence count (lines 614–639).
3. The output edge is then labeled
   `PROVISIONAL_EXACT_SYMBOL_REFERENCE_JOIN` (line 646), even though neither
   the original scoped spelling nor any target carrier ID is serialized.

The result is an exact, decisive counterexample in the artifact:

- `owner-edge-0c47d088bea75bd47e55` says
  `stylesheet/remove-an-element-from-the-top-layer-immediately ->
  keyframes/remove` with status `PROVISIONAL_EXACT_SYMBOL_REFERENCE_JOIN`.
- Its evidence carrier `occ-66cfddbe1fe4d4c4c6c86689`, CSS Position 4 lines
  332–349, contains `[=set/Remove=]`.
- The join discards `set/` and resolves `Remove` to two unrelated Web
  Animations definitions: `occ-2c7a030f628aaaea34c9b829` (“remove” event) and
  `occ-978d4c6c3fd56f45a08a7a9d` (“remove an animation effect”). Both happen to
  have the same heuristic owner `keyframes/remove`, so the two-target
  ambiguity is suppressed. The correct in-closure disposition is not that
  edge; the scoped set operation must remain external/unresolved unless its
  actual scoped definition is present and authenticated.

A second exact instance proves this is systemic:

- `owner-edge-0b11747c71aacbe8beac` maps the
  `[=animation effect/end time=]` reference in
  `occ-3468ce84bc4b22bda69c9e60` to `properties/cancel`.
- Its chosen definition is `occ-74770f857210f1f95e44adc2`, a CSS Transitions
  paragraph containing eight names—`cancel`, `end time`, `end value`, start
  time/value, and reversing state. The whole paragraph was assigned to the
  lexicographically first name, `properties/cancel`; scope and per-definition
  identity were both lost.

These are false positives carrying no RED flag. A later human fixed point
cannot turn an already asserted wrong edge into a sound provisional join
without first rejecting and regenerating the formation.

## Altitude II — formation

### What independently replays GREEN

The following checks were rerun independently rather than accepted from the
receipt:

- all 13 formation-input raw hashes and byte sizes match the artifact;
- all 168 unique source paths exist under the pinned source root, total exactly
  14,609,103 bytes, and match every stored SHA-256 and Git blob SHA-1;
- the actual seed/universe set join is exactly 76 entries and the actual
  complement-v3/universe set join is exactly 92 entries, with matching path,
  byte size, SHA-256, and blob OID;
- all 17,079 carrier slices independently reproduce byte length, SHA-256,
  start/end line boundary, start/end offset, and the 96-bit truncated carrier
  ID formula; no actual carrier-ID collision exists;
- all 4,075 reference IDs and all 1,394 owner-edge IDs reproduce their stated
  truncated-hash formulae; no actual ID collision exists;
- the 10 mandatory counterexample rows point to the asserted source/line
  intervals and exact slice hashes;
- the published 16-family lattice, 24,278 weighted units, 5,907,696-byte
  non-union slice sum, and every published RED count recompute exactly;
- the 46 hard-coded module-DAG edges span 16 nodes, are acyclic, and all 16 are
  reachable from `stylesheet`;
- one fresh generator run is byte-identical to the checked-in artifact, and
  two fresh generator runs are byte-identical to each other.

Thus this is not a nondeterminism or stale-artifact rejection. It is a
deterministically reproduced semantic rejection.

### Extraction and owner formation are not exact

The owner classifier is positive regex classification, not an occurrence-owner
proof. In particular, every `function_definition` is forced to
`JOINED_PROVISIONAL`; when several “specific” domains match, the first domain
in a fixed priority list wins (lines 230–234). Exact consequences include:

| carrier | exact source interval | emitted join | blocking evidence |
|---|---|---|---|
| `occ-0029f0fc2902d2b6709d7413` | `css-images-3/Overview.bs:266–270` | `color/gradient-functions`, no RED | candidates are both `color` and `gradients`; the definition is the specification’s “gradient functions” section |
| `occ-2fbe4aab3ffbd724400c0fd9` | `css-values-5/Overview.bs:1255–1259` | `color/by`, no RED | candidates are `color`, `easing`, `transforms`, `keyframes`, and `keywords`; the prose defines the easing `by` keyword |
| `occ-0c2e74150effa84c54685397` | `css-images-5/Overview.bs:74–76` | `color/unnamed`, no RED | names are `<image-src>`, `<image-tags>`, and `image()`; candidates are `tokens`, `color`, and `gradients` |
| `occ-0009da6505899fc6a1bf137a` | `css-break-3/Overview.bs:457–465` | `properties/orphans`, no RED | a two-property definition for `orphans, widows` is collapsed to the first name |

Across the exact artifact, 83 of 311 function definitions are marked joined
while carrying more than one domain candidate; nine match more than one of
`color`, `easing`, `gradients`, `transforms`, or `filters`. None is made RED
merely for that ambiguity.

Name normalization is also identity-destructive. The first normalization of
`&lt;image-src>` produces `<image-src>`; calling `slug()` normalizes again and
treats that grammar name as an HTML tag, yielding `unnamed`. Among joined
definitions, 3,938 distinct raw names become only 3,582 slugs; 126 slug keys
each represent multiple distinct names. The `unnamed` key alone represents 220
distinct names, 21 owner strings, and 434 carrier IDs. There are 614 emitted
carrier rows whose owner ends in `/unnamed`.

Multi-name rows amplify the loss: 494 joined carriers have more than one name,
but `ownerJoin()` names the whole row after only `names[0]`. Of 1,888 evidence
items placed on the 1,394 joined semantic edges, 909 resolve to more than one
definition carrier inside the single accepted owner. Those are not unique
target resolutions.

### Full-byte closure is not full occurrence closure

All 14,609,103 bytes were read and hashed, which is GREEN. The union of all
serialized carrier intervals covers only 4,853,156 bytes (33.22%); 9,755,947
source bytes have no carrier interval. This does not violate the receipt’s
explicit caveat that a missing match proves no exclusion, but it does mean the
artifact cannot be treated as a full occurrence formation. For example,
`css-page-template-1/Overview.src.html` has six carriers covering only 619 of
26,165 bytes (2.37%).

The row identity also distinguishes extraction labels rather than textual
occurrences. There are 744 groups in which the same source interval and slice
SHA appear under multiple carrier kinds, creating 770 extra rows over unique
exact slices. The lattice assigns each row a kind weight, so identical bytes
can contribute two or three times. The artifact labels only the byte sum as
“non-union”; it does not deduplicate the 24,278 weighted “occurrence units”.
This makes the cost grade a weight over heuristic extraction events, not over
unique occurrences or reviewed operations.

### Mandatory counterexamples are present, but their RED state is incomplete

All required rows are present and byte-exact:

| requirement / carrier | slice SHA-256 | emitted owner state |
|---|---|---|
| shadow-part mapping parser — `occ-4326d12b3f6a5812fc4642da` | `fe372e923f6015ec5bd4219908fbc4cf27016da5c7735d2f20871382c72d5b60` | `RED_AMBIGUOUS` |
| mixins function parse/token — `occ-eee5367713d12a620b3d5469` | `324402d9507859397fab5d87c48e4a86882f32ab0f80f3ae27cd51a250e45323` | `RED_AMBIGUOUS` |
| mixins dashed-function tokens — `occ-f6baee420fb14da41fe60c66` | `0b0367a04654afe16caa04bfad8d7750fd2801a74cd80628db08e5707957412f` | `RED_AMBIGUOUS` |
| snapshot forward-compatible parsing — `occ-83ca63f3ac1ebd46497414cb` | `1db81d48923606c362ef0731b36f9cb6ba6027c8d339bab091afffe9197268e6` | `RED_AMBIGUOUS` + completeness RED |
| syntax parse-error/recovery — `occ-fc99fa8897a54f67b9421735` | `db0de31bf2acc4b2c45a2ce5cc8086e6a49611f801f2315675b9400d8397b28a` | `tokens/parse-errors`, no RED |
| syntax preprocessing — `occ-6d2af9aa45040ec589a7f38d` | `254283539f5059837878a99451375e82d012bad55f1c0c9be7533a39ab20824f` | `RED_AMBIGUOUS` |
| syntax tokenize entry — `occ-d16a3984008cac97a20e1a26` | `13a70a61b51488777e6bfbf1b8323846663bb436fe51a5d139e1707b0a590ecd` | `RED_AMBIGUOUS` |
| component-value parse entries — `occ-bc21d7b7dcac3de39494b420` | `f4dcd0b0b0decef151e6f5ab04e23218b3a1523fc54a096762565d37c25467b1` | `tokens/parse-a-comma-separated-list-of-component-values`, no RED |
| block/function consumption — `occ-c7d16bfcd4a9bcb95fd1db18` | `97da4d33f344a6dae2b6a2de6641e30c6407c39e4b192fd162c0c87222a616d4` | `tokens/consume-a-component-value`, no RED |
| round-trip serialization — `occ-0402e4aa6b5d4162ab753861` | `49e457ec74a57b526b64246edf4b0f42adf82e6ef15fcda4f26114aed77637e1` | `RED_AMBIGUOUS` |

Presence is therefore GREEN, but review disposition is not. The component
consumption row contains four separately named algorithms and assigns them all
to the first owner with no RED. More broadly, 82 of 300 algorithm blocks, 12
of 64 algorithm sections, and three of the 10 required counterexamples are
joined with no row RED. The global prose blocker saying algorithms need human
review does not make those positive row states safe for machine consumption.

### Reference “fixed point” loses occurrence identity

The published resolution counts reproduce: 2,386 resolved in the 168-source
set, 1,558 external/unresolved RED, and 131 ambiguous RED. The current status
does keep the unresolved mass RED. Nevertheless:

- the edge key omits `explicit_normative_marker` (lines 594–600), so normative
  and non-normative occurrences collapse and whichever carrier is visited
  first supplies the single stored marker;
- 260 exact source/reference pairs contain both `[[SPEC]]` and `[[!SPEC]]` but
  have only one compact edge marker. For example,
  `ref-2928b5e85f47c989646864e0` for CSS2’s `HTML401` stores `null` although
  both marker forms occur;
- anchors and link-text distinctions are discarded before edge identity;
- resolver aliases are directory spelling heuristics, not Bikeshed’s biblio
  identity graph. Sixteen `CSS3-BREAK` edges remain external/unresolved even
  though `css-break-3` is in the 168-source set. RED is safer than a false
  positive, but it is evidence that this is not a reference fixed point;
- no external target is fetched/authenticated and no new source is added, so
  this is a one-pass queue over 168 roots, not an internal-and-external fixed
  point.

### DAG, unique ownership, compatibility, scope, and RED accounting

The hard-coded 46-edge/16-node module DAG is acyclic and root-reachable. That
check is narrowly GREEN. The generator does not parse `MODULE-DAG.md` into the
graph; it hashes the file and independently validates a second hard-coded
edge list. The exact document and list agree in this snapshot, but the
validator does not prove that agreement.

The occurrence-derived owner graph is not validated as a DAG and must not
inherit the module-DAG result. Its 1,394 edges contain eight nontrivial strongly
connected components, including
`color/valid-color <-> color/invalid-color` and
`stylesheet/in-the-top-layer <->
stylesheet/rendered-in-the-top-layer`. A semantic reference cycle need not be
an import cycle, but it proves the module-DAG check says nothing about the
occurrence graph. Unique semantic ownership is not checked at all; the
multi-target and slug-collapse counts above directly contradict it.

The hard-coded compatibility arrays do have 19 + 33 = 52 unique names and the
hard-coded consumer list has 37 unique names. All names occur backtick-quoted
somewhere in the pinned PI/coverage prose. But the checks at lines 680–683
validate the lengths of the generator’s own constants plus substring presence;
they do not extract an exact census, reject extras/duplicates, check signatures,
or check behavior. Four exact rows—`CssLinearStop`, `CSSAnimationOptions`,
`ScrollerKeyword`, and `ViewInset`—remain `RED_UNJOINED/RED_NO_DAG_NODE`, yet
compatibility RED is absent from `red_gaps.counts`. Zero compatibility credit
remains the only safe reading.

Two of the 14 claimed `ADDENDA-01` scope rows have no input line at all:
`owner-calc-math` and `owner-substitution` each serialize `input_lines: []` but
are marked `PROVISIONAL_OCCURRENCE_JOIN` because their hard-coded search terms
match source carriers. The receipt’s statement that all 14 inputs retain exact
input lines is therefore false. `owner_scope_inputs_without_carrier: 2` counts
only absent carrier matches, not absent input identities.

The published RED counts all recompute exactly:

| published counter | exact value |
|---|---:|
| source rows without detected carriers | 0 |
| carriers with any row RED | 11,408 |
| owner unjoined | 8,207 |
| owner ambiguous | 2,503 |
| external/unresolved reference edges | 1,558 |
| ambiguous reference edges | 131 |
| semantic references unjoined/ambiguous | 5,292 |
| scope inputs without a carrier | 2 |

They are arithmetically correct but semantically incomplete: false-positive
joins are not counted, multi-target/same-owner references are not ambiguous,
mixed normative markers are collapsed, missing scope input lines are not RED,
and the four compatibility RED rows are omitted. There are 5,671
`JOINED_PROVISIONAL` carrier rows with no RED, including the exact false joins
above. The RED ledger therefore cannot bound the unresolved semantic mass.

## Altitude III — field / adversarial fixtures and consumption

The exact generator logic was exercised against in-memory adversarial fixtures;
no fixture or temporary repository file was created.

| fixture | exact observed result | required safe result |
|---|---|---|
| function prose contains both “color” and “gradient” | joined to `color/gradient-functions` with candidates `[color, gradients]` | `RED_AMBIGUOUS` pending owner ruling |
| property row `Name: orphans, widows` | both names assigned `properties/orphans` | split identities or explicit grouped-owner identity |
| `[=set/Remove=]` plus an unscoped `remove` definition | both slug to `remove`; false join is admitted | preserve scope and reject the unscoped target |
| `&lt;image-src>` definition versus `<<image-src>>` reference | definition slug becomes `unnamed`; reference slug is `image-src` | one canonical typed grammar identity |
| same source contains `[[FOO]]` then `[[!FOO]]` | one edge stores the first marker and merges both evidence items | occurrence-preserving marker identity or a lossless marker set |
| unclosed `<div class=algorithm>` | `blockEnd()` silently consumes through EOF | structural-parse RED/failure, not a giant valid carrier |

Every failure mode except the deliberately malformed final fixture also has an
exact counterpart in the pinned artifact.

The 12.7 MB artifact is syntactically consumable: a fresh Node full parse took
about 0.07 seconds and reported 110,542,848 bytes maximum resident set size in
this environment. It is nevertheless not independently consumable as semantic
proof:

- it is one 12,766,322-byte JSON line plus LF, with no supplied JSON Schema,
  indexed/streaming form, or migration fixture;
- carrier serialization explicitly removes `semantic_references` (tool line
  765), and joined owner edges omit target carrier IDs and the original scoped
  reference spelling;
- a consumer cannot audit why a target was chosen from the artifact alone. It
  must trust the result or reopen all 168 sources and reproduce the same lossy
  heuristics;
- the 881-line generator is a single module containing input pinning, text
  parsing, extraction, classification, reference resolution, graph checks,
  compatibility constants, costing, RED accounting, and serialization. It
  exports no independently testable stages;
- the artifact’s `replay.tool` gives only a path, not the generator SHA-256.
  The receipt binds the generator hash, but the artifact is not a standalone
  generator-trust closure.

The replay command also assumes repository-root execution and a private
absolute source-root path. That source root happened to exist for this audit.
The generator authenticates source files against the pinned universe but does
not itself verify that the directory is Git tree
`75bf19c016ed98126381508073de6893c9f756f5`, nor does it recompute stored Git
blob OIDs. Independent recomputation found the exact current files GREEN, so
this is a trust-closure weakness rather than a current byte mismatch.

Similar structural omissions exist at input joins. The generator checks that
complement-v3 has 92 neutral entries but does not compare those entries to the
92 non-seed universe rows; it hashes `MODULE-DAG.md` but does not parse its
edges. Independent checks found both exact sets and the exact DAG text aligned
today. The architecture should enforce those relations rather than rely on a
challenger to rediscover them.

## Binding disposition

The exact artifact may be retained only as an unauthoritative, content-addressed
**heuristic discovery assay**. It must not be accepted as the v1 provisional
occurrence-owner formation, because “provisional” does not license false
non-RED edges labeled exact.

Before a new exact subject can be challenged for acceptance, it must at
minimum:

1. preserve typed, scoped Bikeshed identities and original reference spelling;
2. serialize target carrier IDs and mark multiple target occurrences
   ambiguous even when heuristic owner strings coincide;
3. make every multi-domain function classification RED and split or explicitly
   type multi-name definition rows;
4. make human-boundary review machine-visible on every algorithm/recovery/
   serialization candidate, rather than relying on a global prose caveat;
5. count missing scope-input lines and compatibility joins in RED accounting;
6. deduplicate or explicitly model overlapping carrier roles before producing
   any weighted occurrence lattice;
7. derive and compare complement membership, DAG edges, and 52/37 censuses from
   their pinned structured evidence;
8. publish a schema and modular, fixture-tested extraction/join pipeline whose
   exact generator identity is bound in the artifact.

Any regenerated artifact requires fresh independent challenges and gestalt.
This rejected subject grants no denominator, parser, conformance, compatibility,
cost, wave, or production credit.

## Challenge receipt

- **Date / timezone:** 2026-07-22, America/New_York.
- **Model:** Codex, GPT-5 family.
- **Reasoning posture:** independent, adversarial architecture and
  tool-soundness review; exact counterexamples were preferred over confidence
  or intent claims.
- **Workflow:** read-only inspection first; raw subject hashing; compact-payload
  digest replay; independent source/blob/slice/line/ID/set/lattice/RED audits;
  byte-for-byte generator replay twice; module and semantic graph analysis;
  exact-source counterexample reconstruction; in-memory adversarial fixtures;
  one-file report creation via `apply_patch`.
- **Isolation:** no sibling occurrence-owner challenge read; no challenger
  communication; no web or external authority used.
- **Mutations:** only this challenge report was created; no parser or
  production mutation.
