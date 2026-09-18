# V·π occurrence → operation/owner formation v3 — hostile challenge A

**Overall verdict: `REJECT`.** The exact v3 artifact is byte-deterministic and
its emitted rows remain fail-closed, but it is not a complete or truthful
occurrence/operation review substrate. Exact authenticated source syntax is
silently absent, the nine fixtures do not exercise the syntax that exposes the
omissions, the bound schema accepts direct contradictions of the RED contract,
and the formation receipt states a false aggregate generator byte count. This
artifact earns zero denominator, audit, parser, owner-graph, cost,
compatibility, conformance, wave, or production credit.

No other challenge output was inspected. No governed subject, schema,
generator, receipt, handoff, feature ledger, module DAG, parser, grammar,
production source, or inbox was mutated.

## Altitude 1 — byte identity, authentication, and replay

**Judgment: artifact replay `ACCEPT`; evidence-bundle statement `REJECT`.**

The frozen identities authenticate as follows:

| object | bytes | SHA-256 |
|---|---:|---|
| `denominator/occurrence-owner-formation-v3.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` |
| `denominator/occurrence-owner-formation-v3.schema.json` | 6,775 | `80f081145d3ac554f79fd68becd468748e567391ebe08ae2e4229893d5cbd72d` |
| `formation/occurrence-owner-v3-formation-2026-07-22.md` | 5,810 | `7b6ae52d8abba34df2ea741d8f586323a22c9e7af4b09d6c5e01e2e39aaf793f` |
| `denominator/occurrence-owner-formation-v2-rejection.json` | 3,314 | `ce693fa32d2b8f08100db7267f136636f788d994de0d7f5453a70fbc4c4d5ba9` |
| withdrawn `denominator/occurrence-owner-formation-v2.json` | 69,589,449 | `005a79b0e6d407e50baa15c3b6081499326f237705b4f4c711bcf0dfc10e12d5` |

Independent reconstruction of the compact payload, after removing
`content_digest_sha256`, `content_digest_method`, and `replay`, produces
`a630fff1643f5731af4a48a56ee9c8e8b9a4acea19ffc09881f761f8029f8ca2`.
The file ends in the promised single LF.

All ten serialized generator file identities match their live bytes. The
specified byte-sorted `path NUL sha256 NUL decimal-bytes LF` manifest produces
`f1aaca1e52051cce39b140c8db53817ec4c7315006963d669a2088763bd1ed1f`.
Their actual byte sum is **81,708**, not the receipt's **81,647**. The receipt is
therefore false by 61 bytes even though its aggregate digest is correct.

Two fresh, differently named arbitrary outputs are byte-identical to the
checked-in v3 subject:

| output | bytes | SHA-256 | result |
|---|---:|---|---|
| `/private/tmp/value-pi-owner-v3-challenge-a.wPA5Mh/a.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` | `cmp` identical |
| `/private/tmp/value-pi-owner-v3-challenge-b.8w5xH8/a-completely-different-output-name.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` | `cmp` identical |

The v2 withdrawal is also truthful. A fresh arbitrary-path v2 replay at
`/private/tmp/value-pi-owner-v2-challenge.GCNsPZ/replay.json` retained payload
digest `5e00b2c182db7e695392e8ed185e1453ec7de6ccca88d17f3298fc6dda7e2720`
but produced 69,589,443 bytes and SHA-256
`2d7a3ef8b255c1232b6f04bac41f0e19575ade9b1814018d48e2c0d6caebee9b`,
not the checked-in v2 bytes/hash. Its serialized command contains the live
output path. V3 repairs that exact deterministic replay defect.

Independent replay of every serialized evidence slice found 168/168 source
rows authenticated over 14,609,103 bytes, 17,079/17,079 carrier slices exact,
46,460/46,460 emitted reference spellings exact, and 4,836/4,836 emitted
operation slices exact. IDs are unique within all three row sets. This proves
the integrity of what was emitted; it does not prove that all occurrences were
emitted.

## Altitude 2 — discovery semantics, schema, and fixtures

**Judgment: `REJECT`.**

### Blocker A — exact authenticated reference occurrences are silently omitted

`REFERENCE_PATTERNS` recognizes bibliographic references, two CSSWG/W3C URL
families, `<<production>>`, `[=definition=]`, `{{IDL-or-property}}`, and only
double-single-quoted `''css-term''`. It has no pattern for Bikeshed's
single-quoted CSS shorthand or element shorthand.

Exact counterexamples in the authenticated closure:

* `animation-triggers-1/Overview.bs:112-113` contains `'animation'` and
  `'animation-trigger'`; line 120 contains `'timeline-trigger'`. The artifact
  emits the nearby `[=...=]` references but no row for any of those three CSS
  references.
* `css-anchor-position-1/Overview.bs:353` and `:355` contain `<{li}>`. The
  artifact emits no reference row on lines 352-355.

A full-tree lexical census found 13,940 token-shaped single-quoted instances
(some require semantic filtering) and 474 exact `<{...}>` element shorthands,
all outside the implemented reference regex family. The decisive fact is not
the gross candidate count: the concrete normative references above are absent.
Thus `discovery_scope: FULL_AUTHENTICATED_SOURCE_BYTES`,
`every_occurrence_preserves_raw_spelling_type_scope_marker_and_anchor: true`,
and the formation receipt's phrase "full-source typed/scoped reference
occurrences" are not truthful completeness statements.

The generator's own API supplies the minimal counterfixture:

```text
referenceFixture("The 'animation' property applies to <{li}>.\n") => []
```

### Blocker B — the actual Bikeshed algorithm attribute is not recognized

`discoverOperationCandidates()` recognizes an algorithm block only when its
opening has a `class` containing `algorithm` or a `data-algorithm` attribute.
The authenticated specifications commonly use the boolean/string Bikeshed
attribute `<div algorithm>` or `<div algorithm="...">`.

Across the exact 168 files there are 293 `<div algorithm...>` openings. Only
75 happen to lie inside any emitted operation candidate; **218 lie outside
every candidate**. This is an exact interval-coverage test against the frozen
4,836 candidate rows.

Concrete counterexample: `css-color-4/Overview.bs:4729-4739` is a complete
`<div algorithm>` named "prepare a color" with an ordered list, and
`:4741` begins the adjacent "convert a color" algorithm. No frozen operation
candidate intersects lines 4732-4748. A minimal counterfixture likewise emits
no candidates:

```text
# Conversion

<div algorithm>
<ol>
<li>Return the converted value.</li>
</ol>
</div>
```

This preserves the v1 rejection's full-source/operation-incompleteness defect;
ATX support alone did not close it.

### Blocker C — 9/9 fixtures pass only because they miss the production syntax

The fixture runner does pass 9/9 exactly as serialized. Its unclosed-block case
uses `<div class=algorithm>`, which the regex handles, rather than the prevalent
authenticated `<div algorithm>` form. There is no single-quoted CSS-property
fixture and no `<{element}>` fixture. The two minimal counterfixtures above both
return empty arrays. Therefore `fixture_suite_green` is locally true but is not
evidence for discovery completeness.

### Blocker D — the bound schema admits contradictions of the RED contract

The exact artifact validates under Ajv 2020-12. However, nested objects and row
items are materially unconstrained. Independent in-memory mutations, with no
file writes, also validate:

| mutation | schema result |
|---|---|
| set `authority.audit_credit`, `compatibility_credit`, and `conformance_credit` to `1` | valid |
| set `candidate_count` to `0`, and an operation row to `review_status: GREEN`, `red_flags: []` | valid |
| set reference `count` to `0`, and a reference row to `owner_edge_emitted: true`, `red_flags: []` while retaining `every_reference_red: true` | valid |
| replace `content_digest_sha256` by 64 zeroes | valid (the schema checks syntax, not digest relation) |

The first three are direct semantic contract failures, not limitations of
cryptographic validation. The top-level `additionalProperties: false` does not
repair absent nested `additionalProperties`, item schemas, aggregate/length
relations, or constants. Calling this a bound contract overstates what it
enforces.

## Altitude 3 — fail-closed governance and human-review fitness

**Judgment: `REJECT`.**

The frozen artifact does correctly avoid positive semantic and owner claims for
the rows it emits:

* all 17,079 retained v1 carriers are `RED_UNREVIEWED`, ineligible for owner
  edges and cost;
* all 4,836 emitted operation candidates and all 46,460 emitted references have
  RED dispositions;
* all 14 owner-scope rows and 52 compatibility rows are RED;
* `ParseIssue` and `ParseResult` remain blocked at the non-token
  result/diagnostics boundary;
* semantic owner edges are empty and no cost lattice is emitted;
* multi-domain, multi-name, duplicate-interval, scope, context, and ambiguous
  target cases cannot acquire production or denominator credit in this payload;
* the withdrawn v2 payload contributes zero semantic/owner/denominator credit.

That is necessary but insufficient. A missing occurrence has no RED row, no
content-addressed boundary, no ambiguity marker, and no review route. Human
review cannot adjudicate 218 algorithm blocks or the concrete missing typed
references from this artifact because they are not present. Uniform RED over a
strict subset is not a sound denominator or a sound boundary-review queue.

### Exact acceptance blockers

1. Discover and serialize every authenticated Bikeshed reference family in
   scope, at minimum single-quoted CSS shorthands and `<{...}>` element
   shorthands; bind exact source offsets and keep all newly discovered rows RED.
2. Recognize `<div algorithm>` and `<div algorithm="...">`, recut exact
   operation intervals, and prove every authenticated algorithm opening is
   covered or explicitly serialized as a RED exclusion/counterexample.
3. Add adversarial fixtures for those exact production syntaxes and demonstrate
   the current counterfixtures no longer return empty arrays.
4. Strengthen the JSON Schema so nonzero credits, GREEN/unreviewed rows, emitted
   owner edges, contradictory counts, and unconstrained nested additions fail
   validation. Independently validate the recut payload against it.
5. Correct the formation receipt's aggregate generator byte count and recut the
   receipt identity. Then require two fresh hostile challenges and a fresh root
   gestalt over the newly frozen subject/schema/generator/receipt identities.

Until all five blockers are closed, later human boundary review must not use v3
as its occurrence denominator or work queue.

## Commands and observed evidence

Exact identities:

```sh
shasum -a 256 \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json \
  docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-formation-2026-07-22.md \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2-rejection.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2.json
wc -c \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json \
  docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-formation-2026-07-22.md \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2-rejection.json \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2.json
```

Arbitrary-path v3 replay:

```sh
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --output /private/tmp/value-pi-owner-v3-challenge-a.wPA5Mh/a.json
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs \
  --source-root /private/tmp/value-pi-csswg-complement.TpPSHC \
  --output /private/tmp/value-pi-owner-v3-challenge-b.8w5xH8/a-completely-different-output-name.json
shasum -a 256 \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  /private/tmp/value-pi-owner-v3-challenge-a.wPA5Mh/a.json \
  /private/tmp/value-pi-owner-v3-challenge-b.8w5xH8/a-completely-different-output-name.json
cmp -s docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  /private/tmp/value-pi-owner-v3-challenge-a.wPA5Mh/a.json
cmp -s docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json \
  /private/tmp/value-pi-owner-v3-challenge-b.8w5xH8/a-completely-different-output-name.json
```

Fixture and schema validation used the repository's exact generator API and
installed Ajv 8.20.0:

```sh
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs --fixture-only
node -e 'console.log(require("./node_modules/ajv-formats/node_modules/ajv/package.json").version)'
```

The completeness census read only paths from
`denominator/source-universe.json`, read their authenticated bytes from
`/private/tmp/value-pi-csswg-complement.TpPSHC`, and compared every matched line
against the frozen `operation_boundary_formation.candidates` intervals and
`typed_scoped_reference_discovery.rows`. The decisive source/artifact spot
checks were:

```sh
nl -ba /private/tmp/value-pi-csswg-complement.TpPSHC/css-color-4/Overview.bs | sed -n '4726,4752p'
jq '[.operation_boundary_formation.candidates[] |
  select(.source_path=="css-color-4/Overview.bs" and .start_line<=4748 and .end_line>=4732)]' \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json
nl -ba /private/tmp/value-pi-csswg-complement.TpPSHC/animation-triggers-1/Overview.bs | sed -n '108,123p'
jq '[.typed_scoped_reference_discovery.rows[] |
  select(.source_path=="animation-triggers-1/Overview.bs" and .start_line>=108 and .start_line<=123) |
  {start_line,raw_spelling,reference_type}]' \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json
nl -ba /private/tmp/value-pi-csswg-complement.TpPSHC/css-anchor-position-1/Overview.bs | sed -n '349,359p'
jq '[.typed_scoped_reference_discovery.rows[] |
  select(.source_path=="css-anchor-position-1/Overview.bs" and .start_line>=349 and .start_line<=359)]' \
  docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json
```
