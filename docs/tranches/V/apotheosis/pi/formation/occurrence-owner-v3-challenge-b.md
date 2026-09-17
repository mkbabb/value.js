# V·π occurrence → operation/owner formation v3 — hostile architecture challenge B

**Decision: `REJECT`.** The exact v3 JSON replays byte-identically in the
available environment and its zero-credit fields are intact, but that is not
enough to accept the formation. The formation receipt contains a false exact
byte claim; the schema is not a binding contract and is not invoked by the
generator; generator identity is not execution identity; and the purported
full-source typed/scoped reference formation has concrete omissions and scope
loss. No denominator, parser, owner, compatibility, cost, audit, conformance,
wave, or production credit follows from this review.

## Altitude 1 — frozen bytes, closure, replay, and withdrawal

The frozen identities I independently observed are:

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v3.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` |
| `denominator/occurrence-owner-formation-v3.schema.json` | 6,775 | `80f081145d3ac554f79fd68becd468748e567391ebe08ae2e4229893d5cbd72d` |
| `formation/occurrence-owner-v3-formation-2026-07-22.md` | 5,810 | `7b6ae52d8abba34df2ea741d8f586323a22c9e7af4b09d6c5e01e2e39aaf793f` |
| `denominator/occurrence-owner-formation-v2-rejection.json` | 3,314 | `ce693fa32d2b8f08100db7267f136636f788d994de0d7f5453a70fbc4c4d5ba9` |
| withdrawn v2 subject | 69,589,449 | `005a79b0e6d407e50baa15c3b6081499326f237705b4f4c711bcf0dfc10e12d5` |
| retained arbitrary-path v2 replay | 69,589,440 | `43b094b76ebb92a25aae2b1084b80a43ded413682e5541b5e1514fcbec06edf4` |

The v2 withdrawal is authentic: the checked-in v2 and the retained replay have
the exact unequal identities stated in the rejection receipt. I did not grant
any retained v2 semantic disposition.

I recomputed the v3 payload digest after deleting, in insertion order,
`content_digest_sha256`, `content_digest_method`, and `replay`. It is
`a630fff1643f5731af4a48a56ee9c8e8b9a4acea19ffc09881f761f8029f8ca2`,
and the file has the claimed single trailing LF.

I independently verified all 13 pinned repository inputs named by
`authenticated_evidence.pinned_input_identities`. Against
`/private/tmp/value-pi-csswg-complement.TpPSHC`, the authenticated closure is
168 distinct paths, 14,609,103 bytes, with every SHA-256 and Git blob OID
matching. The split is 76 seed plus 92 set-difference complement; no resolved
source path escaped the real source root; the sorted path digest is
`5282efdfe9db215382a223e8393944227be8b5940bb3047129125daa61e19a15`.
The source directory itself is not a Git worktree, so `verified_commit` and
`verified_commit_tree` are transitive manifest assertions, not properties the
v3 replay checks on that directory.

The 17,079 nested v1 discovery rows are byte-for-byte equal to the exact v1
rows, have 17,079 unique IDs, and every source slice, line boundary, byte count,
and slice digest replays. All ten required slices also replay. This authenticates
the retained slices; it does not authenticate the new operation algorithm, as
Altitude 3 shows.

The generator manifest contains ten files and recomputes to
`f1aaca1e52051cce39b140c8db53817ec4c7315006963d669a2088763bd1ed1f`.
Their actual summed size is **81,708 bytes**, not the **81,647 bytes** asserted
by the formation receipt. The per-file bytes serialized in the subject itself
sum to 81,708. This 61-byte error is exact blocker **B1**: an exact formation
receipt cannot be accepted while misstating the size of the generator it
claims to bind.

On Node `v26.0.0`, `--check` returned `REPLAY_IDENTICAL`. Two fresh arbitrary
outputs, one named `arbitrary-a.json` and one named
`completely-different-name.json`, were both 69,590,643 bytes, had subject hash
`3eaa1f...c5ef9`, and compared equal to each other and to the checked-in
subject. Thus the narrow v2 output-path serialization defect is repaired.

Commands used for these byte and replay results:

```sh
shasum -a 256 \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json \
  docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-formation-2026-07-22.md \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2-rejection.json
stat -f '%z %N' \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json \
  docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-formation-2026-07-22.md \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2-rejection.json

node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --output docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  --check

review_tmp=$(mktemp -d /private/tmp/value-pi-owner-v3-challenge-b.XXXXXX)
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --output "$review_tmp/arbitrary-a.json"
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --output "$review_tmp/completely-different-name.json"
shasum -a 256 "$review_tmp/arbitrary-a.json" \
  "$review_tmp/completely-different-name.json" \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json
cmp "$review_tmp/arbitrary-a.json" "$review_tmp/completely-different-name.json"
cmp "$review_tmp/arbitrary-a.json" \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json

node -e 'const fs=require("fs"),c=require("crypto");const a=JSON.parse(fs.readFileSync("docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json"));const rows=a.generator_and_schema_identity.generator_files.slice().sort((x,y)=>Buffer.from(x.repo_relative_path).compare(Buffer.from(y.repo_relative_path)));let n=0,s="";for(const r of rows){const b=fs.readFileSync(r.repo_relative_path),h=c.createHash("sha256").update(b).digest("hex");if(h!==r.sha256||b.length!==r.bytes)throw Error(r.repo_relative_path);n+=b.length;s+=r.repo_relative_path+"\0"+h+"\0"+b.length+"\n"}console.log(rows.length,n,c.createHash("sha256").update(Buffer.from(s)).digest("hex"))'
```

## Altitude 2 — contract binding, execution identity, DAG joins, and parsimony

**B2 — the schema validates shape fragments, not the claimed evidence.** The
exact subject validates under JSON Schema 2020-12, but the following in-memory
counterexample also validates under the exact frozen schema:

- `authority.audit_credit = 7` and `authority.compatibility_credit = 9`;
- a false all-zero `content_digest_sha256`;
- unbound replay and generator/schema identities;
- 168 empty source rows;
- 17,079 fabricated minimally RED carrier rows;
- `candidate_count = 999999` with zero operation candidates;
- `count = 999999` with zero reference rows;
- ten empty required-counterexample objects and 52 empty compatibility rows;
- false validation claims and nonsensical red-mass values.

Ajv 2020 returned `{actual_valid:true,mutant_valid:true,errors:null}`. This is
not merely a theoretical weakness: `generate.mjs` never compiles or invokes
the frozen schema. Its local `validateArtifactShape` checks a small hand-picked
subset. The subject hashes the schema, but neither the schema nor that hash
computationally binds the payload digest, generator manifest, row identities,
count/array equality, validation booleans, or most nested row semantics. Exact
blocker B2 requires a closed nested schema plus executable validation, and
independent recomputation of every digest/count relation that JSON Schema
cannot express.

The schema counterexample was run without writing a mutant file:

```sh
node -e 'const fs=require("fs");const Ajv=require("./node_modules/ajv-formats/node_modules/ajv/dist/2020").default;const s=JSON.parse(fs.readFileSync("docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json"));const a=JSON.parse(fs.readFileSync("docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json"));const v=new Ajv({strict:false,validateFormats:false}).compile(s);const actual=v(a);a.authority.audit_credit=7;a.authority.compatibility_credit=9;a.content_digest_sha256="0".repeat(64);a.replay.generator_identity_sha256="unbound";a.replay.schema_sha256="unbound";a.generator_and_schema_identity.generator_identity_sha256="unbound";a.generator_and_schema_identity.schema={};a.authenticated_source_closure.rows=Array.from({length:168},()=>({}));a.discovery_carrier_substrate.rows=Array.from({length:17079},(_,i)=>({id:`fabricated-${i}`,v1_discovery_row:{},semantic_disposition:"RED_UNREVIEWED",owner_disposition:"RED_UNREVIEWED",eligible_for_owner_edge:false,eligible_for_cost_lattice:false,red_flags:["RED"]}));a.operation_boundary_formation.candidate_count=999999;a.operation_boundary_formation.candidates=[];a.typed_scoped_reference_discovery.count=999999;a.typed_scoped_reference_discovery.rows=[];a.required_algorithmic_counterexamples.rows=Array.from({length:10},()=>({}));a.compatibility_obligations.rows=Array.from({length:52},()=>({}));a.validation={all_claims:false};a.red_mass={semantic_owner_edges:999};const mutant=v(a);console.log({actual_valid:actual,mutant_valid:mutant,errors:v.errors})'
```

**B3 — the generator manifest is not execution identity.** Static ESM imports
load the v3/v2 modules before main execution. Only later, after fixtures and
evidence authentication begin, `toolIdentity(repoRoot)` rereads hard-coded
repository paths. A file replacement between module load and hashing can bind
post-load disk bytes while Node executes pre-change cached code. Conversely,
executing a copied or loader-transformed `generate.mjs` can still hash the
hard-coded canonical repository paths. There is no `import.meta.url` equality
check, pre-execution verified launcher, or hash of the bytes Node actually
compiled. Schema identity is read but the schema is never executed. The
serialized environment also omits Node/runtime identity; this review proves
one Node v26 replay, not runtime-independent determinism. B3 requires a
verify-before-execute launcher or equivalent executed-byte attestation, an
atomic output protocol, and a pinned runtime envelope.

**B4 — identity uniqueness is only partly controlled.** Current hash IDs are
unique: 17,079/17,079 carriers, 4,836/4,836 operation candidates, and
46,460/46,460 references; the current reference set has no duplicate exact
interval. The carrier substrate nevertheless contains 744 exact-interval
collision groups covering 1,514 rows, which the artifact correctly RED-flags.
The operation formation has two unreported exact-slice aliases: each single
source slice receives two IDs because `kind` participates in the ID:

- `css-transforms-2/Overview.bs:148-158`, digest
  `05cd90707d3c3546325f92b7bfd3d8fa145efea7b99385da840bcb150d66af28`,
  IDs `opv2-5f5bb44e4c50a40eae673a6d` and
  `opv2-cfa1daed1b838a7040d88f13`;
- `css-transforms-1/Overview.bs:408-412`, digest
  `98f44c2084222571b582b9d9d8d487ab5a00fa79259fce19c846049876807747`,
  IDs `opv2-63c1e6bfb4f5e5c83c1a6985` and
  `opv2-c16dbec5a5bc0c137d639ab3`.

Both pairs are the same bytes and interval, classified once as a markup
algorithm and once as an HTML operation list. Thus 4,836 is a candidate-row
count, not a unique operation-boundary denominator. B4 requires an explicit
alias/equivalence table and separate row, interval, and reviewed-operation
counts before any denominator use.

**B5 — MODULE-DAG and 52/37 evidence are authenticated transcriptions, not
primary joins.** The exact `MODULE-DAG.md` does parse to 16 nodes, 46 edges,
acyclic, with all nodes reachable from `stylesheet`. The coverage prose does
yield 19 runtime plus 33 type names and 37 keyframes-consumer names, and the
current `src/css/index.ts` visibly agrees with 52. But v3 authenticates neither
`src/css/index.ts`/`types.ts` nor the keyframes import tree as inputs to those
censuses; it reparses `coverage.md`. The 52-to-family routing is a hand-written
constant in `mappings.mjs`; `buildCompatibilityRows` receives no DAG and never
asserts that a candidate family is a node or that the PI line proves that
family. Its so-called mapping digest merely hashes the constant candidate
together with every PI line containing the symbol. This is acceptable only as
explicitly RED review routing, not as an evidence-derived owner join. B5
requires primary-source manifests for both censuses and a computational
symbol→DAG-family justification or removal of the family field.

**B6 — the 69 MB monolith is not parsimonious audit evidence.** Compact sizes
by top-level field are 31,384,212 bytes for
`discovery_carrier_substrate` and 32,321,695 bytes for
`typed_scoped_reference_discovery`: 63,705,907 bytes, or 91.544% of the entire
artifact. The artifact is 4.764 times the authenticated raw source byte count;
gzip-9 is 9,464,822 bytes, only 13.6% of the raw JSON. It repeatedly embeds v1
rows, contexts, target IDs, and RED strings instead of using canonical tables
and content-addressed joins. There is no shard manifest or random-access
index. This materially obstructs independent review and multiplies accidental
counting surfaces. B6 requires a canonical compact/sharded representation
whose aggregate digest binds independently reviewable tables; RED reason codes
and source/context identities should be interned, not repeated millions of
bytes.

## Altitude 3 — algorithmic completeness and forbidden credit

**B7 — the `FULL_AUTHENTICATED_SOURCE_BYTES` typed/scoped reference claim is
false.** The CSS-term regex is
`/''@?[A-Za-z0-9_-]+(?:\(\))?''/g`; it cannot match Bikeshed's scoped CSS
shorthand `''property/value''` or `''@rule/value''`. Across the exact 168-source
closure I counted 3,263 slash-scoped double-quote shorthands, while the artifact
serializes zero scoped `css_term` rows. Exact first counterexamples include:

- `animation-triggers-1/Overview.bs:255`:
  `''animation-timeline-range/cover''`;
- `animation-triggers-1/Overview.bs:289`:
  `''timeline-trigger-name/none''`;
- `css-conditional-5/Overview.bs:229`: `''overflow/clip''`.

The IDL/property regex does match slash-scoped shorthands, but `parseReference`
does not split their scope. All 1,118 serialized slash-bearing
`idl_or_property` rows have `typed_identity.scope: null`. For example,
`animation-triggers-1/Overview.bs:439` `{{Event/target}}` becomes name
`Event/target`, canonical name `event/target`, scope `null`, and unresolved.
Therefore the subject's boolean
`every_occurrence_preserves_raw_spelling_type_scope_marker_and_anchor: true`
and the receipt's description of 46,460 "full-source typed/scoped reference
occurrences" cannot stand. All rows being RED does not make an omitted row or
erased scope harmless: this is denominator incompleteness.

The scoped-reference counterexample was measured with:

```sh
rg -n "''[^'[:space:]]+/[^'[:space:]]+''|\{\{[^}\n]+/[^}\n]+\}\}" \
  /private/tmp/value-pi-csswg-complement.TpPSHC \
  --glob 'Overview.bs' --glob 'Overview.src.html'

jq -c '.typed_scoped_reference_discovery.rows[] |
  select(.source_path=="animation-triggers-1/Overview.bs" and
         .raw_spelling=="{{Event/target}}") |
  {id,source_path,start_line,raw_spelling,reference_type,typed_identity,
   target_occurrence_count,resolution_status}' \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json
```

**B8 — the ten retained slices are not formed into reviewable operation
identities.** All ten required slices replay as v1 carrier slices, but none has
an exact matching operation candidate. Three do not even have an enclosing
operation candidate:

- `css-mixins-function-parse-token-rules`, carrier
  `occ-eee5367713d12a620b3d5469`;
- `css-mixins-dashed-function-token-rules`, carrier
  `occ-f6baee420fb14da41fe60c66`;
- `snapshot-forward-compatible-parsing`, carrier
  `occ-83ca63f3ac1ebd46497414cb`.

`requiredCounterexamples()` unconditionally appends
`operation_review_status: RED_UNREVIEWED_OPERATION_BOUNDARY` without requiring
or serializing any operation-candidate ID. Consequently "preserved slice" is
true, but "operation formation" for those required counterexamples is not.
B8 requires a content-addressed exact or explicitly containing operation join
for every required slice, with a RED explanation when the proposed boundary
differs; the three zero-enclosure cases require new candidates.

**B9 — zero formal credit is preserved, but false completeness metadata is
already a hidden denominator affordance.** In the exact subject I found
`denominator_credit = parser_credit = owner_graph_credit = cost_lattice_credit
= compatibility_credit = conformance_credit = audit_credit = 0`, no semantic
owner edges, and no cost lattice. I therefore do not accuse this exact payload
of directly emitting an owner edge or numeric cost. The prohibited indirect
grant is the set of unconditional `true` validation/completeness booleans and
headline counts that downstream work can consume as settled denominator
facts despite B4, B7, and B8. The hand-written compatibility family is likewise
only RED routing; it must not be promoted as a DAG-derived owner disposition.

Acceptance requires all of B1–B9 to be closed on a newly exact receipt/subject
pair: correct generator bytes; executable closed schema and digest relations;
executed-byte/runtime attestation; interval aliases separated from unique
operations; primary 52/37/DAG joins; compact sharded evidence; complete scoped
reference parsing; explicit operation joins for all ten required slices; and
continued zero credit until subsequent human boundary and owner review. The
present exact hash is **REJECTED** and must not satisfy either-challenge or
gestalt prerequisites.
