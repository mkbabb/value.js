# V·π governed occurrence → operation/owner formation v3

**Status: `PROVISIONAL_AWAITING_TWO_CHALLENGES_AND_GESTALT`. Zero denominator,
parser, audit, owner-graph, cost, compatibility, conformance, wave, or
production credit.** V3 supersedes the withdrawn pre-challenge v2 subject. It
preserves the fail-closed evidence and repairs the exact deterministic replay
defect without promoting any semantic or owner disposition.

## V2 withdrawal

The exact withdrawal receipt is
`denominator/occurrence-owner-formation-v2-rejection.json`, 3,314 bytes,
SHA-256 `ce693fa32d2b8f08100db7267f136636f788d994de0d7f5453a70fbc4c4d5ba9`.

V2 itself remains unmodified at 69,589,449 bytes, SHA-256
`005a79b0e6d407e50baa15c3b6081499326f237705b4f4c711bcf0dfc10e12d5`.
Its arbitrary-path replay at
`/private/tmp/value-pi-owner-v2-replay.SnNraC/replay.json` produced 69,589,440
bytes, SHA-256
`43b094b76ebb92a25aae2b1084b80a43ded413682e5541b5e1514fcbec06edf4`.
Both retained payload digest
`5e00b2c182db7e695392e8ed185e1453ec7de6ccca88d17f3298fc6dda7e2720`.
The difference is the live `--output` value serialized into v2
`replay.command`; the earlier v2 formation receipt's byte-replay claim is
therefore withdrawn.

## Exact v3 subjects

| subject | SHA-256 | bytes | disposition |
|---|---:|---:|---|
| `denominator/occurrence-owner-formation-v3.json` | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` | 69,590,643 | provisional v3 challenge subject |
| `denominator/occurrence-owner-formation-v3.schema.json` | `80f081145d3ac554f79fd68becd468748e567391ebe08ae2e4229893d5cbd72d` | 6,775 | bound JSON Schema 2020-12 contract |
| compact payload before digest/replay fields | `a630fff1643f5731af4a48a56ee9c8e8b9a4acea19ffc09881f761f8029f8ca2` | n/a | independently reproducible |
| modular generator identity | `f1aaca1e52051cce39b140c8db53817ec4c7315006963d669a2088763bd1ed1f` | 81,647 across 10 files | exact path/hash/byte manifest bound in artifact |

The v3 generator consists of two v3 cut/serialization modules plus eight
unchanged fail-closed stage modules from the v2 tool directory. Its identity is
SHA-256 over byte-sorted UTF-8 records `path NUL sha256 NUL decimal-bytes LF`.
Every component identity is serialized in the artifact.

## Output-path-independent replay proof

The serialized command is constant and does not interpolate live arguments:

```sh
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v3/generate.mjs --source-root "$PINNED_CSSWG_ROOT" --output "$OCCURRENCE_OWNER_V3_OUTPUT"
```

With `PINNED_CSSWG_ROOT=/private/tmp/value-pi-csswg-complement.TpPSHC`, the
checked-in target and two fresh arbitrary targets produced identical bytes:

| output | bytes | SHA-256 | `cmp` |
|---|---:|---:|---|
| `denominator/occurrence-owner-formation-v3.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` | baseline |
| `/private/tmp/value-pi-owner-v3-final-a.eoskng/arbitrary-a.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` | identical |
| `/private/tmp/value-pi-owner-v3-final-b.lduFfN/completely-different-output-name.json` | 69,590,643 | `3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9` | identical |

The live output path appears only in generator stdout; it is not serialized in
the artifact. `replay.working_directory` is the stable label `repository root`,
not a live absolute checkout path.

## Preserved fail-closed evidence

| measure | exact v3 result |
|---|---:|
| authenticated source closure | 168 files / 14,609,103 bytes |
| independently derived membership | 168 = 76 seed + 92 complement |
| exact rejected v1 discovery carriers retained and replayed | 17,079 |
| required source slices retained and replayed | 10 |
| exact parsed MODULE-DAG subject | 16 nodes / 46 edges / acyclic / root-reachable |
| compatibility identities derived from pinned evidence | 19 runtime + 33 type = 52; keyframes seam 37 |
| operation-boundary candidates | 4,836 RED |
| full-source typed/scoped reference occurrences | 46,460 RED |
| owner-scope inputs / compatibility mappings | 14 RED / 52 RED |
| reviewed boundaries / reviewed owners / semantic owner edges | 0 / 0 / 0 |
| owner/cost lattice | not emitted |

The operation candidates remain 129 algorithm sections, 64 serialization
sections, 9 recovery sections, 86 Markdown list regions, 106 legacy HTML
ordered-list regions, 7 explicit algorithm blocks, 4,225 dt+dd term/body
regions, and 210 boundary-incomplete terms. Reference dispositions remain
26,175 external/unresolved, 12,521 multiple-target ambiguous, and 7,764
single-target-but-unreviewed RED.

All 9/9 adversarial fixtures pass: scoped `set/Remove`, multi-domain
gradient/color, typed `&lt;image-src>`, mixed normativity markers, ATX
serialization, dt/dd, history context, multi-name definitions, and unclosed
blocks.

Compatibility remains explicit and content-addressed. Timing functions route
only to the `easing` review candidate; `ParseIssue` and `ParseResult` remain RED
pending a ratified non-token result/diagnostics boundary. No name-regex owner,
semantic edge, or cost is emitted.

## Remaining blockers

1. Two independent hostile challenges and a fresh root gestalt must accept the
   exact v3 artifact hash.
2. Mechanical operation candidates need content-addressed human boundary
   review.
3. Typed/scoped references need reviewed targets and owners; external and
   ambiguous targets remain RED.
4. Compatibility mappings and the non-token result/diagnostics boundary need
   ratification.
5. Until unique reviewed operations exist, semantic owner edges and all cost
   lattices remain forbidden.

No v1 or v2 subject, parser, production source, active grammar, feature ledger,
handoff, module DAG, or inbox was changed by the v3 cut.
