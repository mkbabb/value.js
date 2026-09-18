# V·π occurrence → operation/owner formation v5 — provisional freeze

Date: 2026-07-22

Status: **PROVISIONAL / RED-ONLY / AWAITING TWO FRESH INDEPENDENT CHALLENGES
AND ROOT GESTALT.** This receipt freezes a candidate occurrence and provenance
bundle for hostile review. It does not accept the denominator, assign a feature
owner, promote an operation, grant compatibility or conformance credit,
authorize parser candidates, or authorize production execution.

## Exact frozen subject

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v5.json` | 18,048 | `9f64d59ac8effffdfe476805b5d2086bba8281f55609e3f575b714f7fdf51b10` |
| `denominator/occurrence-owner-formation-v5.schema.json` | 10,510 | `e406bf06bcb06535a1e015b209d1c9c85c14485c3dd7f88be5cbec936c1a6a8e` |
| `denominator/occurrence-owner-formation-v5-shard.schema.json` | 13,590 | `9e688ecd62e939679898ffb2201c4fb64443d74cb7e5f212670e705c7da0a5b2` |

The nine frozen shards total 13,821,858 bytes:

| shard | rows | bytes | SHA-256 |
|---|---:|---:|---|
| `codes.json` | 21 | 888 | `221e5e90240dff865c01347a56cb77746c5ba5e6311ed500842569f462f2ebfc` |
| `strings.json` | 32,852 | 851,678 | `42deeeba4a14f61af3f6cd2fc2938671a436709184e1d1afe5e9848071b33034` |
| `sources.json` | 168 | 24,279 | `1b707a5b794c7c9b669040e28a8a10d4dd30ed874c4dc62957eb4629b1c5aa5c` |
| `contexts.json` | 7,283 | 1,081,375 | `d2d92d87632a29c1355285b160a71386326f317a09c2bf07018c220a842bf613` |
| `carriers.json` | 17,079 | 2,994,733 | `97d9de22934f7e10e8a8056baf99662e7c48bf665caa42c54dea74acb9946732` |
| `operations.json` | 5,153 candidates | 1,040,333 | `604ebed815245cf1c25d1bda5b2cfd5ec1c130e21f590b4f0161cfe423bb8156` |
| `references.json` | 63,459 | 7,823,543 | `62a542e1dbbe95940d9a516e443f505c48d16662925ed1b34883a5cd2550cacc` |
| `compatibility.json` | 52 | 3,102 | `d0cd4c568ef4a1b573c4cfcac9428948458336e3568fb43c5d0c9101d03baa2e` |
| `owner-scope.json` | 14 | 1,927 | `b605df043aaec941870a05e9dad8f4c7c8947b60558b5fbaa18f137741a41f2c` |

Manifest content digest:
`f5aa53b02d09b117f07116a3176a6d3a62312b7598a5b64ea943e39ef502b800`.

## V4 disposition bound into V5

V5 authenticates the exact rejected V4 manifest, schemas, receipt, challenge
A (`REJECT`), challenge B (`ACCEPT` of the narrower RED-only reproducibility
claim), root gestalt, and terminal rejection object. The terminal V4 rejection
object is
`bc2ff4f783834d8aa64270102c1c2077eb38b790c77a2d285b226920c6d6bd9e`
(2,655 bytes); its root gestalt is
`2a875f5ee3ba1f7b780e0364bf6870f2ae8de9f80e2c3fce2a840d3905823e8b`
(4,174 bytes). V5 does not inherit acceptance from either V4 review.

## Repaired formation boundaries

### Algorithm-bearing source elements

The discovery pass inventories any authenticated Bikeshed/HTML opening element
carrying a boolean or valued `algorithm` attribute, an `algorithm` class, or a
`data-algorithm` attribute. Each opening records exact source, line, byte
offset, raw opening bytes, and enclosing candidate rows. The current
authenticated census is 311 openings: 293 `div`, seven `ol`, one `h2`, nine
`h3`, and one `dfn`. The literal-`div` census remains separately asserted at
293; the 311 total is not mislabeled as a `div` count.

### Context-aware Bikeshed references

The reference pass walks source text in lexical context and skips HTML opening
and closing tag intervals and comments, so attribute values are not emitted as
CSS references. It recognizes bibliography (including slash paths, fragments,
and display text), specification URLs, productions, definitions, IDL/property,
markup `[^...^]`, element, compound double-single-quoted CSS, and conservative
single-quoted CSS shorthands. Target, scope, anchor, and display text are
separate fields. Exact challenged examples now form as:

- `[^input/type/submit^]` → markup, scope `input/type`, name `submit`;
- `''trigger-scope: all''` → one compound CSS target;
- `[=main axis|main=]` → target `main axis`, display `main`;
- `{{CSS/supports(conditionText)|CSS.supports()}}` → scope `CSS`, target
  `supports(conditionText)`, display `CSS.supports()`;
- `[[css2/visuren#visual-model-intro|Visual formatting model]]` → bibliography
  target `css2/visuren`, fragment `visual-model-intro`, separate display text;
- the `id='parse-selector'` attribute in an opening tag emits no reference.

### Owner-source provenance

The 14 owner-scope rows no longer copy V1 line associations or carrier joins.
They are re-extracted from the authenticated current `ADDENDA-01.md` bytes by
unique directive signatures. Their exact input lines are the consecutive
directives 25 through 38: calc/math is 28, at-rule recovery is 34, unit algebra
is only 37, and substitution is 38. Every row stores the exact line text and
line hash. Discovery-carrier lists are deliberately empty and all owner rows
remain RED; no owner normalization or edge is inferred.

## Mechanical verification

Generation and check both passed against the exact 168-source closure
(76 seed + 92 complement; 14,609,103 source bytes), the acknowledged acyclic
16-node reset DAG, and the primary 52-export/37-consumer inputs. The verifier
independently rediscovers and reassembles the complete operations, references,
and owner-scope tables from authenticated inputs and requires canonical byte
equality. Therefore algorithm opening tuples, parsed reference semantic fields
and targets, and owner line/text/hash provenance are replayed rather than
trusted from shard bytes.

Validation results frozen in the manifest:

- manifest schema: PASS;
- all nine discriminator-bound shard schemas: PASS;
- cross-shard and authenticated semantic/provenance relations: PASS;
- 11 exact counterfixtures: PASS;
- 20/20 schema/relation mutations rejected, including offset/line changes,
  deletion of a non-`div` algorithm opening, deletion of a markup reference,
  reference semantic/target corruption, and owner line/hash corruption;
- arbitrary-output generation and byte-identical repository check: PASS;
- verify-before-execute module/schema/runtime/Ajv attestation: PASS.

Replay command:

```sh
PINNED_CSSWG_ROOT=/private/tmp/value-pi-csswg-complement.TpPSHC \
KEYFRAMES_PRIMARY_ROOT=/Users/mkbabb/Programming/keyframes-v-exec \
OCCURRENCE_OWNER_V5_OUTPUT=docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v5.json \
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v5/launch.mjs \
  --source-root "$PINNED_CSSWG_ROOT" \
  --keyframes-root "$KEYFRAMES_PRIMARY_ROOT" \
  --output "$OCCURRENCE_OWNER_V5_OUTPUT" \
  --check
```

## Exact RED boundary and requested challenge

Counts are 5,153 candidate rows over 5,151 unique operation intervals, two
explicit alias groups, 311 algorithm openings, ten required RED operation
joins, 63,459 reference occurrences, 14 owner-source rows, 52 compatibility
rows, and 37 consumer symbols. Reviewed operation count, reviewed owner count,
owner edges, and every semantic/owner/operation/compatibility credit remain
zero. The primary 52/37 inputs remain `RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG`.

Two fresh independent challenges should assume the bundle is incomplete and
wrong. They should audit authenticated algorithm-marker closure, Bikeshed
lexical contexts and shorthand semantics, exact target joining, owner-source
provenance, executed-byte/replay integrity, schema closure, mutation strength,
compactness, and the truth of every receipt claim. Only two ACCEPT challenges
plus a separate root gestalt may promote the exact subject. This receipt does
not do so.
