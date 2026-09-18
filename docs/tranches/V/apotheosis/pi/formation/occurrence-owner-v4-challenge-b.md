# V·π occurrence → operation/owner formation v4 — challenge B

- Date: 2026-07-22
- Lane: independent software-quality and data-integrity challenge B
- Decision: **ACCEPT**

This review applies only to the exact 16,484-byte manifest with SHA-256
`75d251f549a958d811cf6b445ddd364b99d6c98b188bf958d01d0a2a0b37acef`.
It accepts that object as a reproducible, reviewable, RED-only formation
bundle. It does not promote any semantic, operation, owner, compatibility,
edge, cost, denominator, audit, conformance, wave, or production claim. I did
not inspect another review of this v4 subject.

## Altitude 1 — verdict and authority boundary

**ACCEPT. No reproducible defect was found.**

The supplied identities are exact:

| object | bytes | SHA-256 |
|---|---:|---|
| manifest | 16,484 | `75d251f549a958d811cf6b445ddd364b99d6c98b188bf958d01d0a2a0b37acef` |
| manifest schema | 10,509 | `a91edf2b2deff5412cfd2937b55118bb6685207c27a0ba4838423982ce6727d6` |
| shard schema | 13,589 | `386213aaee2086a74246a4307b65f7898c0ee77e080f5d78ecff8a293f4a9998` |
| formation receipt | 5,926 | `0b0bb1a13124f72cf81a88426c4d6c7c2b7c723a4a9bea6725c0f37da1fe1223` |

The authority fields are internally consistent: `formation_only=true`,
`may_promote=false`, and `red_only=true`. The only top-level credit object is
exactly `{semantic:0, owner:0, operation:0, compatibility:0, owner_edges:[],
costed_owner_formation:false}`. The counts also retain zero reviewed
operations, zero reviewed owners, and zero owner edges. There is no hidden
positive disposition in a shard: all 21 code-table values begin with `RED_`,
and every persisted row-level status cell resolves through that table to a RED
value.

The provisional status is therefore truthful. Acceptance of this challenge is
only one required review input; the manifest itself continues to say
`PROVISIONAL_AWAITING_TWO_CHALLENGES_AND_GESTALT`.

## Altitude 2 — bundle, executable, schema, and publication integrity

I replayed from the designated authenticated source root and primary consumer
root into a newly created arbitrary temporary directory:

```sh
review_tmp="$(mktemp -d /private/tmp/value-v4-challenge-b.XXXXXX)"
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/launch.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --keyframes-root /Users/mkbabb/Programming/keyframes-v-exec \
  --output "$review_tmp/replay.json"
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/launch.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --keyframes-root /Users/mkbabb/Programming/keyframes-v-exec \
  --output "$review_tmp/replay.json" \
  --check
```

Both invocations succeeded. The first reported the expected 16,484-byte
manifest, 13,954,137 shard bytes, nine shards, five counterfixtures, and 14
rejected mutations. `cmp` found the replay manifest and each replay shard
byte-identical to the checked-in subject:

| shard | rows | bytes | SHA-256 |
|---|---:|---:|---|
| `codes.json` | 21 | 888 | `75b6a48556ddc5668dd4efd83d1cf611e4d04e23584619524341ffc537479a82` |
| `strings.json` | 31,253 | 853,862 | `5358e5236ca3a93bea559e79c339a9702b79c38b8c95450b2b80c4a4c170dcfe` |
| `sources.json` | 168 | 24,279 | `c064051a460265c61a7af74ecd1f5885584c501f91faa8e7ad3cc78d388d492f` |
| `contexts.json` | 7,281 | 1,075,567 | `9e1d7009801bf70a6900112fb20016b4f40882038a1cee6d4f6a9106012cea86` |
| `carriers.json` | 17,079 | 2,987,343 | `7d8d912500aebfa21bee51df3b7cbf08325611a5b58819885d14397376653fe6` |
| `operations.json` | 5,142 candidates | 1,037,412 | `1da23b177c549c061838a45cb84940ad97f7e4634e27e9699a18b7bf6befd16f` |
| `references.json` | 64,461 | 7,939,974 | `190ea68490a7ecd999ccab615e1bf6af5f4b3210dc611c730fa62cbebf3d52c7` |
| `compatibility.json` | 52 | 3,092 | `421ec9a3b16da0170c3139823be40199f0de2a3d797b0fc9ba90ede49d846a26` |
| `owner-scope.json` | 14 | 31,720 | `6f7366bd643c2232965555f92af7df19c372d1eae19ded2639eaff5c2d59e436` |

I separately compiled the Draft 2020-12 manifest and discriminator-based shard
schemas. The manifest and all nine shard objects validated. I also recomputed
each shard's canonical `JSON.stringify` plus LF bytes, manifest identity/count
binding, and the manifest content digest after deleting only
`content_digest_sha256`; all matched.

The executed-byte chain is coherent. The canonical-path launcher hashes all
eight modules and both schemas before importing the core, and the core
re-hashes the module/schema set after import. Independent filesystem hashing
matched the manifest's launcher and eight module identities, the
`75097ede22c429cb1e6f6cda5128c666afc3a160efd507d423314534523bce41`
pre/post module-set digest, the exact Node `v26.0.0` executable identity, and
the 466-file Ajv 8.20.0 package-tree identity. The module import graph contains
no unlisted non-built-in executable dependency beyond the attested Ajv load.

The writer's publication order is sound for a fresh immutable bundle. It
creates a same-parent private temporary directory, uses exclusive file
creation, fsyncs every file and relevant directory, renames the complete shard
directory first, and commits the manifest last. It refuses to replace either
an existing manifest or an existing sibling shard directory. The successful
replay left no `.occurrence-owner-v4.tmp-*` remnant.

Reviewability is materially improved over a monolith: a 16 KiB manifest binds
nine purpose-specific shards, while the 13.95 MB payload is compacted through
stable table indexes and one canonical string dictionary. The largest slice is
isolated as the 7.94 MB reference table. Reviewers can validate or decode a
single table without loading an unrelated table, and all persisted source
slices remain content-addressed.

## Altitude 3 — row, relation, interning, primary-evidence, and RED audit

Independent checks over the persisted tables produced no relation error:

- Source closure re-hashed to 168 sources and 14,609,103 bytes, with the exact
  76 seed plus 92 complement membership. All source hashes, byte counts, line
  counts, and all 17,079 carrier slices replayed. Decoding the carrier table and
  comparing it field-for-field with the pinned v1 occurrence rows found no
  dropped, fabricated, or altered discovery carrier.
- All 7,281 context IDs recomputed from their decoded content. Every string and
  code index was in range; dictionary and code values were unique and in
  canonical byte order. Stable IDs for every operation interval, operation
  candidate, and reference recomputed exactly. Every reference byte interval
  and every algorithm-opening offset/line/raw-opening tuple replayed against
  the authenticated source bytes.
- Operations contain 5,142 candidates over 5,140 distinct intervals. Regrouping
  candidates by interval produced exactly two alias groups, each with two
  candidates: `css-transforms-1/Overview.bs:408-412` and
  `css-transforms-2/Overview.bs:148-158`, in both cases the same interval seen
  as `legacy_html_operation_list_candidate` and
  `markup_algorithm_candidate`. Thus `5,142 - 5,140 = 2` is fully explained;
  the aliases are represented, not collapsed or double-credited.
- A fresh raw-source census found exactly 293 `<div>` openings with boolean or
  valued `algorithm` attributes. Its sorted `(source, byte offset, raw
  opening)` tuples equal the 293 opening rows, and every row has one or more
  enclosing RED candidates. All ten pinned required algorithmic slices retain
  their exact requirement name, carrier, source/line boundary, and enclosing
  interval relation.
- The 64,461 references retain all eight declared families. Their target
  cardinalities and statuses agree exactly: 32,598 zero-target
  `RED_EXTERNAL_OR_UNRESOLVED`, 10,694 single-target
  `RED_TARGET_AND_OWNER_UNREVIEWED`, and 21,169 multi-target
  `RED_AMBIGUOUS_TARGET_OCCURRENCES`. Slash scopes are separate indexed fields,
  and all target arrays contain valid, unique carrier indexes. These are RED
  candidate resolutions, never owner edges.
- A TypeScript-AST census, independent of the generator's regular expressions,
  found the same 19 runtime plus 33 type exports, with the same symbol,
  surface, and source-line evidence in all 52 compatibility rows. The keyframes
  root has the same 27 hashed import-bearing files, 28 named import
  declarations, and 37 distinct imported symbols. Its one direct type
  re-export contains five symbols already present in that import census, so it
  creates no omitted consumer. Every compatibility row has a null DAG-family
  index and exact status `RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG`.
- All 14 owner-scope rows reproduce their pinned input line number, exact line
  text and hash, ordered search terms, and sorted occurrence-carrier indexes.
  Their 5,565 candidate links remain RED, every reviewed normalization is
  null, and no link is represented as an owner edge.
- Across the 92,359 persisted row-level status cells, every status resolves to
  a RED code. Every flag cell also resolves only to the same RED registry. No
  GREEN, accepted, reviewed, owner, cost, or compatibility credit is encoded
  through an alternate table field.

One non-blocking dictionary observation is worth making explicit. Three valid
string entries are not addressed by this exact bundle:
`ENCLOSING` (index 7,779), `UNJOINED` (index 10,719), and `src/css/index.ts`
(index 28,267). The finite RED registry likewise contains the unused
`RED_STRUCTURAL_BLOCK_UNCLOSED` code (index 13), because this corpus has no
unclosed discovered block. These are inert pre-interned vocabulary values, not
dangling references; they add only a few bytes, violate no stated minimality
contract, cannot affect a join, and cannot grant credit. I therefore do not
treat them as defects.

### Exact defects

None.

The exact subject is fit to proceed to the remaining independent challenge and
fresh gestalt while retaining its current RED-only, zero-credit authority.
