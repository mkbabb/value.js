# V·π occurrence → operation/owner formation v4 challenge A

Date: 2026-07-22

Verdict: **REJECT**.

The frozen bundle is deterministic and its retained byte intervals replay, but
it is not a truthful occurrence denominator. Independently authenticated
source forms are omitted, display-text shorthands are parsed into false target
names, HTML attribute values are emitted as CSS references, and the verifier
accepts semantic/provenance corruption after identities are rebound. The
explicit zero-credit boundary remains intact; this rejection grants no
semantic, owner, operation, compatibility, edge, cost, denominator, audit,
conformance, wave, or production credit.

## Altitude 1 — formation boundary and disposition

The exact submitted identities match:

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v4.json` | 16,484 | `75d251f549a958d811cf6b445ddd364b99d6c98b188bf958d01d0a2a0b37acef` |
| `denominator/occurrence-owner-formation-v4.schema.json` | 10,509 | `a91edf2b2deff5412cfd2937b55118bb6685207c27a0ba4838423982ce6727d6` |
| `denominator/occurrence-owner-formation-v4-shard.schema.json` | 13,589 | `386213aaee2086a74246a4307b65f7898c0ee77e080f5d78ecff8a293f4a9998` |
| `formation/occurrence-owner-v4-formation-2026-07-22.md` | 5,926 | `0b0bb1a13124f72cf81a88426c4d6c7c2b7c723a4a9bea6725c0f37da1fe1223` |

The supplied launcher check passes against
`/private/tmp/value-pi-csswg-complement.TpPSHC` and
`/Users/mkbabb/Programming/keyframes-v-exec`, reproducing the manifest and all
nine shard identities. An independent byte walker also finds zero replay
failures across 168 sources, 17,079 carrier slices, 5,140 operation intervals,
64,461 reference intervals, and 293 stored algorithm openings.

Those facts are necessary but not sufficient. The generator and verifier
faithfully reproduce their own incomplete and context-free discovery rules.
The blockers below are source-authenticated failures of the represented
denominator, not hash drift.

Required disposition before a successor can be accepted:

1. Inventory algorithm-bearing Bikeshed elements independently of tag name,
   while preserving a distinct literal-`div` census.
2. Replace the global reference regex pass with a Bikeshed-aware lexer that
   recognizes the authenticated shorthand families, parses scope/target/display
   text separately, and excludes HTML attribute values.
3. Repair and authenticate every owner-scope input association rather than
   copying the rejected v1 associations.
4. Recompute reference semantics, algorithm opening offsets, and owner-scope
   line/hash provenance in verification, and add rejecting mutations for each.

## Altitude 2 — what survives hostile replay

The following claims withstand independent recomputation.

- Source closure is exactly 168 = 76 + 92 and 14,609,103 bytes. Every stored
  source identity matches the authenticated source root.
- All 17,079 carrier intervals, all 5,140 unique operation intervals, and all
  64,461 stored reference raw intervals replay at their recorded byte offsets.
  Reference `start_line` values and algorithm-opening line/offset values also
  agree with source bytes.
- A whole-source tag scan finds exactly 293 literal `div` openings bearing an
  `algorithm` attribute. None is multiline. Every stored opening has its own
  `bikeshed_div_algorithm_candidate`, and an independent nested-`div` scan finds
  the same closing line for all 293. Thus the narrow 293-`div` claim passes.
- Operation cardinality is exactly 5,142 candidate rows over 5,140 unique
  intervals. The two alias groups are real: an `ol.algorithm` interval in
  `css-transforms-1/Overview.bs:408-412` and one in
  `css-transforms-2/Overview.bs:148-158` are each discovered both as
  `markup_algorithm_candidate` and as
  `legacy_html_operation_list_candidate`.
- All ten required joins are `EXACT`, including both line and byte boundaries
  and the carrier slice hash. This is a mechanical inclusion result, not an
  independent completeness result: `operationRecords()` explicitly adds each
  `required_algorithmic_counterexamples` slice before the join is computed.
  The manifest correctly leaves all ten RED and grants zero operation credit.
- Compatibility contains exactly 19 runtime plus 33 type exports, 52 unique
  rows, 37 directly imported keyframes consumer symbols with 75 evidence
  tuples, zero DAG-family joins, and
  `RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG` on every row. The primary 52/37 RED
  boundary passes.
- All codes are RED; reviewed operation/owner counts, all four credit counts,
  owner edges, and costed-owner formation remain zero. The zero-credit claim
  passes.

The shipped five counterfixtures and fourteen rejecting mutations also run as
reported. Their coverage does not reach the failures below: there is no
fixture for an algorithm-bearing heading/definition, `[^...^]`, compound
double-single-quoted CSS, display text on non-bibliographic shorthand, or an
HTML attribute false positive; and there is no relation mutation for opening
offset truth, parsed reference semantics/targets, or owner-scope line/hash
truth.

## Altitude 3 — reproducible blockers

### B1. Algorithm occurrence completeness is tag-name dependent

Across the authenticated 168-source closure, there are 311 opening tags with
an `algorithm` attribute/class marker: 293 `div`, seven `ol`, one `h2`, nine
`h3`, and one `dfn`. V4 directly recognizes only `div` and `ol`. Three of the
ten algorithm-bearing headings happen to become section candidates because
their title/anchor contains a word matched by `OPERATION_WORDS`; eight of the
eleven non-`div`/non-`ol` openings have no candidate beginning at their line,
and none is represented in `algorithm_opening_rows`.

Authenticated counterexamples:

| source | line | byte interval | exact opening | slice SHA-256 |
|---|---:|---:|---|---|
| `css-color-4/Overview.bs` (`f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a`, 430,720 bytes) | 4716 | `[241089,241146)` | `<h2 id="color-conversion" algorithm="to convert a color">` | `bd634e725ebe430eb445f2879dd395018159d8fed10a519cce23f74ff63d5f84` |
| `mediaqueries-5/Overview.bs` (`6b97ebfe27f23b103549051003ee125e4b039d91fd87cf1f6ec95bb91d912979`, 166,203 bytes) | 3599 | `[142498,142536)` | `<dfn algorithm for="PreferenceObject">` | `9cd58ffb4b85c8087e349f91d71b4c6728fa0b99b7c5a2a8cc44ca0b4349c880` |
| `selectors-4/Overview.bs` (`ac800347a26eb67cff99d38c08cae2d47622dbbb64d730a531b84646cacfe84c`, 212,484 bytes) | 4748 | `[174989,175030)` | `<h3 id='match-against-element' algorithm>` | `68420c76e9a3d6dac561a60365cf50a08bde875f7339df7204587cc336db5625` |

A minimal fixture containing the first `h2` produces zero algorithm openings
and zero operation candidates. The receipt's narrow statement about 293
`<div algorithm...>` forms is true; it does not establish algorithm-occurrence
completeness.

### B2. Reference formation is simultaneously incomplete and false-positive

The reference scanner is a set of global regular expressions over all source
text. It does not implement Bikeshed lexical context or display-text grammar.
Four independently reproducible failures result.

- The authenticated markup-reference family `[^...^]` is absent from
  `REFERENCE_PATTERNS`. Six such occurrences exist and zero reference rows are
  emitted. For example, `css-navigation-1/Overview.bs` (source SHA-256
  `65d9e94c6f716e78b7ea6fb1c0e0a1adcb65dfcc1ba864b78b3252da43943325`,
  28,926 bytes), line 431, bytes `[15668,15689)`, contains
  `[^input/type/submit^]` (21 bytes, SHA-256
  `59f7de558e91eef6f799a7b5a3a177cfa6cca33114bbff188cef85cf69faf44b`).
- The `css_term_double` pattern only accepts a single restricted token,
  optional empty `()`, and at most one similarly restricted slash component.
  The closure contains 15,265 same-line `''...''` occurrences, while only
  10,693 are stored as that family; 4,572 fall outside the regex. A direct
  authenticated example is `animation-triggers-1/Overview.bs` (source SHA-256
  `6d88146248aed4e3e873820b35c7ac2af0c0f0e2b2ace150d55a1ada8a40196a`,
  27,020 bytes), line 200, bytes `[8412,8434)`,
  `''trigger-scope: all''` (22 bytes, SHA-256
  `24b0c065487138b69db47b5276bff15ce0e26612e9fc95c8c6ab27464636763d`).
- Non-bibliographic display text is never split from the target. All 1,017
  stored definition rows, 68 IDL/property rows, and five element rows whose raw
  shorthand contains `|` retain the display text in `name`; all 1,090 have an
  empty target list. For example, `css-align-3/Overview.bs` line 148, bytes
  `[6215,6233)`, `[=main axis|main=]` (SHA-256
  `13db37aab6b575307a388538f219c18391c69a712fe34d9ca699f5d9b41ede79`)
  is stored as name/canonical `main axis|main`, `link_text: null`, not target
  `main axis` plus display text `main`. Likewise
  `{{CSS/supports(conditionText)|CSS.supports()}}` is stored with name
  `supports(conditionText)|CSS.supports()`.
- The single-quoted CSS regex runs inside HTML tags. A conservative HTML-tag
  interval scan finds 2,137 of the 14,604 `css_shorthand_single` rows inside
  markup tags. At `selectors-4/Overview.bs:4698`, bytes `[173696,173712)`, the
  `id` value `'parse-selector'` (16 bytes, SHA-256
  `6f78289397faeb0699d2339a6e8c44324cda4e5c390a9b14da5e5de3fe3f6f08`)
  is emitted as a CSS reference even though it is the attribute value in
  `<h3 id='parse-selector' algorithm>`.

The bibliography pattern is also narrower than authenticated shorthand. For
example, `compositing-2/Overview.bs` (source SHA-256
`c01a614c0fcdd5d6f0239b6182337c6e78c101d5f9fbcedd33e1abcbdba9445e`,
60,575 bytes), line 51, bytes `[2600,2659)`, contains
`[[css2/visuren#visual-model-intro|Visual formatting model]]` (59 bytes,
SHA-256 `4731fec1baa4e58732b1855410cd47469e8940939e52dfc076070f8a14826a41`),
which produces no bibliographic row.

### B3. Owner-scope provenance is copied incorrectly

The 14-row owner-scope table copies `v1.owner_scope_inputs` rather than
re-extracting scope from the authenticated owner input. The result conflicts
with `ADDENDA-01.md` itself:

- `owner-calc-math` has no `exact_input_lines`, although its directive is line
  28.
- `owner-substitution` has no `exact_input_lines`, although its directive is
  line 38.
- `owner-unit-algebra` binds both correct line 37 and unrelated prose line 40
  (`These are largely **independent grammar modules** over W1's
  `numUnit`/generic`).

All 5,565 copied carrier-index entries resolve, but index resolution does not
make these input associations true. The rows remain RED and
`reviewed_normalization_s` remains null, so they confer no owner credit; they
still cannot serve as a correct scope-evidence denominator.

### B4. New semantic/provenance mutations pass verification

After canonical shard rebinding and manifest content-digest recomputation, the
exported `verifyBundle()` accepts all of the following in memory while supplied
with authenticated evidence:

- change the first algorithm-opening offset from `40342` to `0`;
- change owner-unit-algebra's source line from 37 to 999999 and its recorded
  line hash to 64 zeroes;
- change `[=main axis|main=]`'s parsed name/canonical and attach arbitrary
  carrier index 0 without changing its raw source slice.

This passes because verification replays operation intervals and reference raw
bytes, but does not bind an algorithm opening's raw text to its offset, reparse
reference semantic fields/targets, or compare owner-scope line/hash tuples to
the authenticated owner input. The shipped mutation suite therefore does not
support a claim of semantic or provenance integrity for those tables.

Reproduction commands, run from `/Users/mkbabb/Programming/value.js`:

```sh
shasum -a 256 \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.schema.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4-shard.schema.json \
  docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v4-formation-2026-07-22.md

wc -c \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.schema.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4-shard.schema.json \
  docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v4-formation-2026-07-22.md

node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/launch.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --keyframes-root /Users/mkbabb/Programming/keyframes-v-exec \
  --output docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v4.json \
  --check
```

Minimal discovery counterfixtures:

```sh
node --input-type=module - <<'NODE'
import { discoverFixture } from './docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/discover.mjs';
const cases = [
  ['markup-ref', 'Use [^input/type/submit^].\n'],
  ['compound-css', "Use ''trigger-scope: all''.\n"],
  ['display-text', 'Use [=main axis|main=] and {{CSS/supports(conditionText)|CSS.supports()}}.\n'],
  ['attribute-false-positive', "<h3 id='parse-selector'>Title</h3>\n"],
  ['heading-algorithm', '<h2 id="color-conversion" algorithm="to convert a color">Color conversion</h2>\n<ol><li>Convert.</li></ol>\n'],
];
for (const [name, text] of cases) {
  const x = discoverFixture(text);
  console.log(JSON.stringify({
    name,
    references: x.references.map((r) => ({ raw: r.raw, type: r.type, name: r.name, scope: r.scope, link_text: r.link_text })),
    algorithm_openings: x.operations.algorithmOpenings.length,
    operation_candidates: x.operations.candidates.map((r) => r.kind),
  }));
}
NODE
```

Expected decisive output: zero references for `markup-ref` and `compound-css`;
display text embedded in both parsed names; `'parse-selector'` emitted as a CSS
reference; and zero openings/candidates for `heading-algorithm`.

Verifier mutation escape (no files are written):

```sh
node --input-type=module - <<'NODE'
import { readFileSync } from 'node:fs';
import { authenticateEvidence } from './docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/evidence.mjs';
import { canonicalBytes, sha256 } from './docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/shared.mjs';
import { manifestContentDigest, verifyBundle } from './docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v4/verify.mjs';
const b = 'docs/tranches/V/apotheosis/pi/denominator';
const d = `${b}/occurrence-owner-formation-v4.shards`;
const names = ['codes.json', 'strings.json', 'sources.json', 'contexts.json', 'carriers.json', 'operations.json', 'references.json', 'compatibility.json', 'owner-scope.json'];
const manifest = JSON.parse(readFileSync(`${b}/occurrence-owner-formation-v4.json`));
const manifestSchema = JSON.parse(readFileSync(`${b}/occurrence-owner-formation-v4.schema.json`));
const shardSchema = JSON.parse(readFileSync(`${b}/occurrence-owner-formation-v4-shard.schema.json`));
const rawShardBytesByName = new Map(names.map((n) => [n, readFileSync(`${d}/${n}`)]));
const shardObjects = Object.fromEntries(names.map((n) => { const o = JSON.parse(rawShardBytesByName.get(n)); return [o.table, o]; }));
const evidence = authenticateEvidence(process.cwd(), '/private/tmp/value-pi-csswg-complement.TpPSHC', '/Users/mkbabb/Programming/keyframes-v-exec');
const strings = shardObjects.strings.rows.map((r) => r[0]);
shardObjects.operations.algorithm_opening_rows[0][2] = 0;
const scope = shardObjects.owner_scope.rows.find((r) => strings[r[0]] === 'owner-unit-algebra');
scope[1][0][0] = 999999;
scope[1][0][2] = '0'.repeat(64);
const ref = shardObjects.references.rows.find((r) => strings[r[5]] === '[=main axis|main=]');
ref[7] = strings.indexOf('main axis');
ref[8] = strings.indexOf('main axis');
ref[13] = [0];
for (const [table, name] of [['operations', 'operations.json'], ['owner_scope', 'owner-scope.json'], ['references', 'references.json']]) {
  const bytes = canonicalBytes(shardObjects[table]);
  rawShardBytesByName.set(name, bytes);
  const id = manifest.shards.find((x) => x.table === table);
  id.bytes = bytes.length;
  id.sha256 = sha256(bytes);
  id.count = table === 'operations' ? shardObjects[table].candidate_count : shardObjects[table].count;
}
manifest.content_digest_sha256 = manifestContentDigest(manifest);
verifyBundle({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence });
console.log('PASS: semantic/provenance corruptions accepted');
NODE
```

Expected output: `PASS: semantic/provenance corruptions accepted`.
