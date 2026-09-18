# G15 consume-number skeptic 4

## Verdict: REJECT

The selected H2 bytes are a strong semantic implementation, but this exact
subject does not authenticate the lifecycle claim on which its hidden-corpus
credit depends. The local artifacts are internally consistent and replayable;
they do not prove that the corpus/key were unavailable to candidate authors or
that the claimed preauthor and first-attempt chronology occurred in the stated
order. Under the subject's hostile review law, that unresolved custody failure
blocks promotion.

## Frozen subject and scope

- Subject:
  `docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g15/skeptic-subject.json`
- Required subject SHA-256:
  `4df4f41e519ef162110a8e13cdc87c4dc2f7a9d8cec454c110ef91c755f6c449`
- Recomputed subject SHA-256:
  `4df4f41e519ef162110a8e13cdc87c4dc2f7a9d8cec454c110ef91c755f6c449`
- Selected H2 SHA-256 recomputed exactly:
  `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
  (560 bytes, 17 lines, mode `0444`).
- I treated every claim as false until replayed. I did not inspect any other
  G15 skeptic review, did not delegate this review, and did not mutate a
  candidate, evidence artifact, grammar file, benchmark artifact, or shared
  source.

## Altitude 1: normative algorithm and semantic leaf

No semantic defect was found.

- The local pinned CSS Syntax source recomputes to
  `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`.
  Lines 1610-1678 recompute to
  `3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`.
  The excerpt specifies the guarded decimal and exponent steps, maximal
  prefix, integer/number classification, value, and optional sign that H2
  implements.
- H2 is one direct `@mkbabb/parse-that/core` `regex` terminal and one `map`,
  both constructed at module initialization. Its source has no cursor loop,
  slice scanner, token/CST runtime, dynamic candidate or corpus read, process
  access, or mutable module state.
- The exact inherited public evaluator at SHA-256
  `bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7`
  returned `PASS`: 77 inherited successes, 5 complete cases, 6 repeated-
  fraction prefix cases, 336 failure runs, 10 parent cases, and 10 hostile
  runs.
- An independent exhaustive assay enumerated every string of length 0-5 over
  `+ - . 0 1 9 e E x` at four offsets/prefix shapes, including astral UTF-16
  prefixes. All 265,720 calls agreed with an independently sticky normative
  oracle: 120,276 successes and 145,444 transactional failures. It also
  checked returned-state identity, exact UTF-16 end offset, signed zero/value,
  sign/type, `Object.prototype`, own-key order, and writable/enumerable/
  configurable data descriptors.
- The same assay passed 100,000 repeated calls with fresh result identities,
  stable parser ID/context/keys/printing, no per-call Parser-ID allocation,
  eight independent percentage/dimension/integer/delimited parent probes, and
  no throw on hostile strings as large as 1,000,001 UTF-16 code units.

At this altitude H2 is parsimonious and correct. Its mutable
`{ sign, type, value }` result is the contracted semantic leaf. Spelling can be
recovered from the unchanged source and start/end offsets, so omitting `raw`
is appropriate at this boundary.

## Altitude 2: parser lifecycle, composition, runtime, and measured evidence

The executable behavior and numerical benchmark summary also survived replay.

- Every subject binding that was recomputed matched, including feature
  `a88dc7df...`, interface `04b4decb...`, original candidate set
  `6b3b2057...`, synthesis set `bb140549...`, evaluator `81e91458...`,
  original holdout evidence `b06c6345...`, H2 supplement `5a702de8...`, v1
  failure `cbcfe27c...`, v2 result `9269e6ec...`, v3 result `f717891c...`, v3
  raw `97f32458...`, and the BBNF engine receipt `6968e378...`.
- Running the exact frozen holdout evaluator reproduced
  `holdout-evidence.json` exactly after removing only the run timestamp. Each
  original candidate again passed 180/180 and all nine construction checks.
- The frozen evaluator is hard-coded to the original `h,b,s,d` candidate set;
  it cannot directly load H2. I therefore performed a non-persisting stdin
  substitution of only its source-binding row and ran the otherwise exact
  evaluator/corpus logic. After projecting the evaluator-only `id` and
  `source_sha256` fields, the result exactly equaled the supplement's `result`:
  H2 passed 180/180, transaction 14/14, parent composition 24/24,
  introspection 8/8, Parser-ID growth 8/8, and construction stability 9/9.
  This establishes current semantic reproducibility, but the need for an
  unrecorded evaluator adaptation is itself a provenance weakness discussed
  below.
- Strict compilation of H2 passed. The pinned package exposes the requested
  `core` subpath and the required `Parser`, `ParserState`, `regex`, and `string`
  exports. Benchmark TypeScript compilation, structural self-test, package-
  tree/file binding checks, and candidate validation all passed. Candidate
  validation again produced common-domain 16/16 and corrected-only 10/10 for
  every candidate.
- The v3 raw file recomputes to
  `97f32458d6f031f0ad7de0446ad62b28c232facad629738dd6797cced62ea6ae`.
  Independent parsing found the declared 37 events, one attempt ID, 30
  contiguous sample blocks, exact seeded balanced/reversed orders, 24,000
  operations per lane per block, and equal retained checksums in every block.
  Recomputing medians, MADs, paired log ratios, and the one-sided bound exactly
  reproduced H2's geometric mean ratio `0.9441053576257097` and upper ratio
  `0.9864729838277626`; `upper < 1` is true. The v1 failed raw attempt and the
  distinct v2/v3 raw/result files and hashes are present and mutually
  consistent.
- The benchmark's common-domain lanes perform the same observable leaf
  operation: one ParserState, one parser invocation, one mutable leaf, and one
  end observation. Corrected-only inputs are properly excluded from the
  historical peer comparison. I found no statistical or operation-equivalence
  reason to reverse the reported v3 numerical result.

H2 therefore fits as an internal consume-number semantic leaf. It is not a
drop-in replacement for the currently broader value-unit surface, whose
`NumericValue` also contains `unit` and `raw`; the numeric parents must consume
this leaf and construct that parent shape. The hidden parent probes make that
design credible, but the subject itself correctly grants zero integration and
production credit. A semantic leaf can be selected before that integration,
but only after its lifecycle evidence is admissible.

## Altitude 3: authenticated chronology, custody, and tranche consequence

### Blocking finding P0: no authenticated preauthor/no-leakage chain

The cryptography authenticates the ciphertext/plaintext relationship, not the
claimed order of human/agent access.

1. The receipt, ciphertext, original candidates, H2, supplement, benchmark
   evidence, and skeptic subject are all untracked in the present Git
   worktree. `git log --all -- <g15>` supplies no prior content-addressed
   history for them, and `git ls-files --error-unmatch` fails for the subject,
   receipt, and H2. The sequential JSON timestamps and filesystem mtimes are
   coherent, but both are mutable self-reports, not an external or immutable
   preauthor anchor.
2. The AES key remains at the receipt's `/tmp` path, owned by UID 504 with mode
   `0600`. The candidate tasks and holdout task use the shared agent filesystem
   and OS-user trust domain, so that mode does not isolate a custodian from an
   author running as the same user. AES-GCM proves that today's key decrypts
   today's committed ciphertext; it cannot prove that an author never read
   that key or plaintext.
3. `candidate-set.json` records author task names and generic model-family
   strings, but contains no per-author delivered-input closure, no attestation
   about hidden-corpus/key access, and no independently authenticated author
   receipt. Most decisively, the H2 supplement itself says H2's hidden-case
   access was only “reported false by root” and “not independently audited
   here.” Under the required hostile assumption, that is the claim needing
   proof, not proof of the claim.
4. The H2 supplement binds the frozen evaluator hash, but that exact evaluator
   only resolves the original frozen candidate set. There is no frozen
   H2-specific evaluator, invocation manifest, or content-addressed transform
   that generates the supplement. My in-memory substitution shows the result
   is reproducible now; it does not reconstruct or authenticate how the
   persisted supplement was produced.
5. The benchmark raw paths use exclusive create and are mode `0444`, but on
   this writable, untracked filesystem those controls do not prove that a path
   was never removed/recreated or that v1/v2/v3 were chronologically first.
   Thus the v3 numbers are valid measurements of the bound raw bytes, while
   the stronger first-attempt custody claim remains unauthenticated for the
   same reason.

This is not repairable by adding another retrospective statement. A promotable
run needs a fresh lifecycle with a preauthor content anchor outside the author
trust domain, genuinely segregated key/corpus access, authenticated per-author
input/no-access receipts, and an H2-specific frozen evaluator/command whose
output can be reproduced without modifying its source binding. Timing
first-attempt custody likewise needs an immutable or independently witnessed
creation record. The resulting subject must be re-reviewed.

## Promotion decision

**REJECT.** H2 is semantically suitable and mechanically well hardened, but it
cannot yet be safely promoted as the owned value-unit semantic leaf because the
exact subject does not prove holdout independence or lifecycle chronology.
Five ACCEPT reviews must not be claimed from this evidence set, and synthesis,
integration, and production credit remain zero.

## Truthful reviewer receipt

- Reviewer task: `/root/g15_skeptic_4`
- Agent/runtime surface: Codex desktop agent
- Model family available to the reviewer: OpenAI GPT-5
- Exact provider checkpoint: not exposed to the reviewer
- Reasoning-effort label: not exposed to the reviewer
- Subagents used: none
- Other G15 skeptic review contents inspected: false
- Candidate/evidence/grammar/shared-file mutations: none
- Review artifact written: this file only
