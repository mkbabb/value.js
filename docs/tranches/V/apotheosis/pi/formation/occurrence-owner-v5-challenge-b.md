# V·π occurrence → operation/owner v5 challenge B — data/software integrity

Date: 2026-07-22

Model: `gpt-5.6-sol`  
Reasoning: `ultra`  
Posture: independent, adversarial, assume-faulty  
Verdict: **REJECT**

This pass inspected no other V5 challenge. It challenged the exact frozen
subject and wrote no generator, schema, shard, source, or production bytes.
Disposable arbitrary-output artifacts were removed after the assay.

## Exact subject

The four identities supplied to this seat reproduce exactly:

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v5.json` | 18,048 | `9f64d59ac8effffdfe476805b5d2086bba8281f55609e3f575b714f7fdf51b10` |
| manifest schema | 10,510 | `e406bf06bcb06535a1e015b209d1c9c85c14485c3dd7f88be5cbec936c1a6a8e` |
| shard schema | 13,590 | `9e688ecd62e939679898ffb2201c4fb64443d74cb7e5f212670e705c7da0a5b2` |
| formation receipt | 7,540 | `a0000722fd3b774329c13fe6fddea3268e608770360e3ba74868bbcd5371b143` |

The nine shard hashes, byte sizes, and counts also agree with the manifest and
receipt. The manifest content digest is
`f5aa53b02d09b117f07116a3176a6d3a62312b7598a5b64ea943e39ef502b800`.

## 1. Total-tranche / gestalt analysis

V5 is a real improvement over the rejected monoliths. It is deterministic,
compact enough to inspect by table, faithfully keeps all authority and credit
RED, binds the 168 authenticated sources, and has a much better operation and
reference occurrence model. It must nevertheless remain rejected as the
denominator foundation.

Two faults are load-bearing for the greater tranche:

1. The evidence-backed verifier does **not** authenticate the complete semantic
   dependency closure of the tables it certifies. Corrupting a context's stable
   ID and section title and a carrier's ID and semantic name survives schemas,
   canonical bytes, source evidence, content-digest rebinding, and execution-
   attestation checks. Operation context links and reference target links can
   therefore point at semantically altered rows while
   `cross_shard_relations: PASS` remains true.
2. The source reference pass has a common-mode URL semantic error. Every dated
   W3C TR URL is named by its year rather than its specification identifier;
   the current corpus contains 297 such rows. Forty-four URL rows also include
   terminal punctuation in the purported exact occurrence. Re-executing the
   same parser only reproduces the defect.

Those are not downstream owner-adjudication questions. They compromise the
integrity of the occurrence/provenance material that PB0 and later feature
boundaries would consume. No operation, owner, compatibility, conformance, or
parser-candidate credit follows from V5.

The formation should be repaired narrowly, not abandoned. Its sharded shape,
source closure, RED posture, and owner-line provenance are useful.

## 2. Wave / formation analysis

### What passed

- Both JSON Schemas compile under the attested Ajv and close every actual
  object arm with `additionalProperties: false`. Array rows are fixed-width and
  discriminator-bound.
- Fresh arbitrary-output generation completed in 6.7 seconds and reproduced
  the manifest and every shard byte-for-byte. Fresh `--check` also passed.
- Canonical JSON-with-LF, all manifest/shard identity relations, the 168-source
  `76 + 92` closure, all 14,609,103 source bytes, and the 52/37 primary input
  identities reproduce.
- Direct source slicing is enforced for sources, carriers, operation intervals,
  and reference raw occurrences when authenticated evidence is supplied.
  Operations, references, and owner-scope tables are regenerated and compared
  canonically.
- Independent owner-line checking confirms 14 consecutive source lines
  25–38, exact stored text, exact SHA-256, empty carrier joins, null reviewed
  normalizations, and RED status.
- All codes are RED; all four credit counters and owner edges are zero;
  reviewed operation/owner counts are zero; compatibility remains explicitly
  unjoined. This is honest.
- The frozen 20/20 mutation suite and 11 counterfixtures execute and report the
  manifest-bound digests.

### Blocking failure F1 — cross-table verification is not closed over contexts
and carriers

`verify.mjs:82-99` regenerates only `operations`, `references`, and
`owner_scope`. It does not compare regenerated `contexts` or `carriers`.
`verify.mjs:164-175` checks only the structural well-formedness of context rows;
it never recomputes `ctxv5-*` from the context body or compares the context body
to source discovery. `verify.mjs:187-192` replays the carrier source interval,
but never authenticates the carrier ID, kind, extraction, names, anchor, or
context selection against the pinned V1/source derivation.

That omission is cross-table, not cosmetic. Operation rows retain only
`context_i`; reference targets retain only carrier indexes. Altering the
referenced context/carrier semantic rows leaves the regenerated operation and
reference rows byte-identical.

The following in-memory mutation passed the full `verifyBundle` with
authenticated source evidence and an execution attestation reconstructed from
the frozen manifest:

```js
// Load the exact manifest, schemas, and all nine shard objects/bytes.
const evidence = authenticateEvidence(
  process.cwd(),
  "/private/tmp/value-pi-csswg-complement.TpPSHC",
  "/Users/mkbabb/Programming/keyframes-v-exec",
);

shardObjects.contexts.rows[0][0] = "ctxv5-000000000000000000000000";
shardObjects.contexts.rows[0][1][0][2] = 0; // change section-title string
rebind("contexts");

const carrier = shardObjects.carriers.rows.find((row) => row[10].length > 0);
carrier[0] = "tampered-legacy-carrier-id";
carrier[10][0] = 0; // change a definition/production name
rebind("carriers");

manifest.content_digest_sha256 = manifestContentDigest(manifest);
verifyBundle({
  manifest, shardObjects, rawShardBytesByName,
  manifestSchema, shardSchema, evidence, executionAttestation,
});
```

`rebind` used the production `canonicalBytes` and `sha256`, updated only the
corresponding manifest shard identity/count, and then recomputed the manifest
content digest. Exact output:

```text
PASS: context ID/title and carrier ID/name corruption survived schemas + exact bytes + evidence + execution-attestation verification
```

This disproves the claimed complete cross-shard semantic/provenance check and
the stable-ID assurance. It also demonstrates why uniqueness alone is not a
collision/derivation proof: `assertUnique` accepts any different schema-shaped
context ID, and carrier IDs have only `minLength: 1`.

### Blocking failure F2 — specification URL semantics and exact boundaries are
wrong

`discover.mjs:273-275` takes the first path segment after `/TR/` as the spec
name. For dated TR URLs that segment is the publication year. Corpus evidence:

```text
css-images-4/Overview.bs:21
  https://www.w3.org/TR/2023/WD-css-images-4-20230217/ => name "2023"
css-syntax-3/Overview.bs:11
  https://www.w3.org/TR/2014/CR-css-syntax-3-20140220/ => name "2014"
selectors-4/Overview.bs:14
  https://www.w3.org/TR/2018/WD-selectors-4-20180202/ => name "2018"
```

Mechanical census over the frozen reference shard:

```text
spec_url rows: 782
dated www.w3.org/TR/<year>/ rows: 297
rows whose raw URL ends in ',', ';', '.', or ':': 44
```

For example the frozen occurrence is
`https://drafts.csswg.org/css-transitions-2/;`: its raw interval swallows the
semicolon. The scanner at `discover.mjs:321-323` deliberately accepts all
non-whitespace other than a small delimiter set, so the error is systematic.

The fixtures contain no dated-TR URL and no terminal-punctuation URL. The
mutation suite changes a reference row, which regenerated-table equality
rejects, but it cannot expose a parser and verifier sharing the same wrong URL
semantics.

### F3 — `atomic_bundle_write: true` overstates the implementation

`shared.mjs:130-133` publishes the shard directory and manifest with two
separate sibling renames. A crash or failure between them exposes a shard
directory without its manifest. Each individual rename is atomic and the
implementation is carefully fsynced, but the *bundle* is not atomically
published. Either publish a single containing directory by one rename or call
this `durable_staged_write` rather than asserting `atomic_bundle_write: true`.

### F4 — execution-byte closure has a residual path-import race

The launcher hashes modules at `launch.mjs:74`, then dynamically imports the
core by path at line 84. Core performs the post-import disk re-hash only after
the imported dependency graph has executed (`core.mjs:129`). Thus the ledger
authenticates pre/post disk state, not literally the bytes the loader consumed
between those observations. The frozen artifact and normal replay are strongly
identified, and this was not needed to reproduce F1/F2, but the receipt should
scope this as a TOCTOU-resistant normal-worktree check rather than absolute
executed-byte capture unless modules are loaded from the captured bytes.

### F5 — compact on disk, expensive in verification memory

An independent fresh `--check` measured:

```text
6.81 s real
1,201,160,192 bytes maximum resident set size
1,214,380,296 bytes peak memory footprint
```

The nine shards are only 13,821,858 bytes. Re-discovering/assembling a second
complete table set and repeatedly cloning the whole bundle for 20 mutations
creates roughly a 1.2 GB verification process. That is not a correctness
blocker by itself, but it is a KISS/reviewability failure worth fixing by
comparing regenerated shards one at a time and running mutations against the
smallest affected table closure.

## 3. Feature-level analyses

### Source and operation inventory

The authenticated source identity and byte closure are strong. The generalized
algorithm-bearing opening inventory reaches 311 rows and correctly preserves
the 293 literal `div` subset. Exact operation intervals and required joins are
source-replayed and RED. I found no evidence in sampled opening rows that V5
again mislabeled the 311 total as a `div` count.

This feature remains unaccepted only because its context foreign keys can be
made semantically false without verifier failure. The operation table cannot
be consumed as a closed relational bundle until F1 is repaired.

### Reference occurrences and targets

The lexical-context exclusion of HTML openings/comments fixes the challenged
attribute-value false positives, and the supplied Bikeshed shorthand examples
parse as claimed. Exact raw-source replay is also present. However, F2 proves
that source replay is not semantic reparse: it confirms the bytes selected by
the same defective recognizer. Reference-to-carrier target indexes can further
survive carrier-name corruption under F1. This feature is therefore rejected.

### Owner-source provenance

The narrow V5 claim passes. The 14 rows reproduce the exact ADDENDA-01 lines,
texts, and hashes and deliberately emit no owner/carrier edge. This is useful
input evidence, not owner acceptance. No defect was found in this narrow
portion.

### Primary compatibility

The 52 exports, 37 consumer symbols, 27 consumer files, and their authenticated
source identities replay. Every DAG family remains null and explicitly RED.
This is truthful and earns no compatibility credit, as intended.

### Stable IDs, schema, and mutation resistance

Operation interval/candidate and reference IDs are indirectly restored by
regenerated-table equality and are unique in this corpus. Context stable IDs
are only pattern/uniqueness checked; carrier IDs are only non-empty/unique.
The mutation suite lacks context-body/ID, carrier-name/ID, stale-reference-
target, URL-date, and URL-delimiter cases. Its 20/20 result is true but
insufficient for the claimed closure.

## Required repair before a fresh challenge

1. Regenerate and canonical-compare **every semantic shard dependency** needed
   by operations/references, especially contexts and carriers. Recompute every
   derived stable ID from its defining fields and require the canonical row
   order, rather than checking only shape and uniqueness.
2. Add passing-corruption mutations for context ID/body and carrier ID/name
   with stale operation/reference foreign keys; require them to reject.
3. Correct W3C dated-TR target parsing and trim URI-external punctuation from
   occurrence intervals. Add exact fixtures for dated and undated TR URLs,
   anchors, punctuation, and CSSWG draft URLs, plus full-corpus assertions that
   prevent year-only spec names.
4. Either publish manifest+shards by one directory rename or rename the
   `atomic_bundle_write` claim to describe the actual staged, fsynced two-rename
   protocol.
5. State the loader TOCTOU boundary precisely. Prefer captured-byte execution
   if absolute executed-byte identity is required.
6. Reduce peak verifier memory or explicitly budget and justify the measured
   ~1.2 GB cost; shardwise expected comparison is the KISS route.

After repair, regenerate a new content-addressed subject and run two fresh
independent challenges plus root gestalt. Do not promote V5 or inherit any
acceptance from the portions above.

## Final disposition

**REJECT.** V5 is reproducible and honestly RED, but reproducibility of a
common-mode semantic error is not correctness. The context/carrier corruption
that passes the evidence-backed verifier and the 297-row dated-URL error are
each independently sufficient to withhold denominator acceptance.
