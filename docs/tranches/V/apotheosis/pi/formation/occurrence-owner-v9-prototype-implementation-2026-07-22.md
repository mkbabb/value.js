# V·π occurrence → operation/owner V9 — RED research prototype implementation

Date: 2026-07-22

Disposition: **PROVISIONAL RED RESEARCH PROTOTYPE; AWAITING INDEPENDENT
CHALLENGE; ZERO DENOMINATOR CREDIT**

The V9 pre-author blueprint now has an executable research implementation of
its hostile boundary. This is not the full V9 denominator: the prototype has
not traversed the 168 pinned sources, has no complete normative-operation
ledger, emits no formation shards, and owns no parser or production authority.

## Exact implementation subject

| object | bytes | SHA-256 |
|---|---:|---|
| RED prototype evidence | 6,053 | `1fcbcfc2c637d2add7dbedf3c6de1e8c7f150f69c8bd804dbaa19a308b845722` |
| one-stream analyzer | 27,806 | `8d31d5189599f03be502aab450b5f17a9615d499c29dabc9a657eda4e69323da` |
| independent oracle | 14,073 | `19c9dd905990129d48a37eeb7d8667482cf61f8fec9b95e2574ddacdbd659ec2` |
| research test driver | 19,213 | `7378e6514359252e9fcd6ce726f9c76053a1d913b73e7d9e0c8f4430aeaa56ab` |
| raw local resource sample | 777 | `9eebe53f5e4fd99e0da9ec6cb7b36152d622020824ae9cef0cf0e1c117284cb1` |

The evidence path is
`docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v9-prototype-evidence.json`.
The tools live only under
`docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v9/`.

The implementation consumes the frozen blueprint
`fbaaadb4e3de6fc5fcef756e6bd4a1824514faac5360afa2d4c8450caf170bb3`
and fixture closure
`a6f61c71e47c9ed323fba148b3765ba8dd6e1cb11829884e57e90824d316f44a`.

## Architecture actually prototyped

`analyzer.mjs` makes one forward source-order classification pass and emits a
gapless UTF-8 byte partition. All later reference, heading, container,
definition, operation, and ownership work consumes that shared range/tag
stream. There is no inherited V8 carrier table and no second raw-attribute
regex path.

The 13 exercised states are:

`VISIBLE_TEXT`, `ESCAPE`, `HTML_COMMENT`, `FENCED_BLOCK`, `DATABLOCK`,
`RAW_SCRIPT`, `RAW_STYLE`, `RAW_XMP`, `RAW_PRE`, `PROCESSED_CODE`, `TAG`,
`TAG_ATTRIBUTE`, and `MALFORMED_TAG_RECOVERY`.

Reference delimiters are paired within one eligible range only. Parsed href
values receive their own byte interval and resolve with the pinned source URL.
Definitions obtain scope and alternate names only from parsed attributes and
carry the exact attribute provenance. Heading and explicit-operation ancestry
uses byte order, including multiple headings and operations on one physical
line. Markdown headings are admitted only from visible-text ranges; processed
code may contain references but not structure.

Operation rows require supplied ledger identities. Heading text and `dt`
markup alone cannot admit an operation. The prototype ledger remains four
fixture-only identities, not a normative corpus ledger.

`oracle.mjs` imports no analyzer, generator, discovery, or table code. Its only
import is `node:crypto`. It independently checks source identity; exact state
partition; byte replay; candidate-interval uniqueness and state containment;
candidate/disposition bijection; parsed-attribute provenance; platform URL
resolution; carrier target foreign keys and scope provenance; heading state;
nearest-byte heading ancestry; ledgered-operation bijection; stable-ID
uniqueness; transition bounds; and zero-credit law. A separate synthetic
evidence-envelope check covers the three launcher/dependency/publication
mutation families without claiming a real publication implementation.

## Exact tests run

```sh
node --check docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v9/analyzer.mjs
node --check docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v9/oracle.mjs
node --check docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v9/test.mjs
node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v9/test.mjs
```

The complete driver was run three times. All three 4,208-byte outputs were
byte-identical at
`86514d8b2a9a1d5978c102cf8cad77974ff002f45a382f2952e7755cded2e04e`.

Observed GREEN research evidence:

- 18/18 frozen V9 hostile cases;
- the exact inherited 29-case V8 fixture module replayed at
  `3c5926b4911b0826fe86d4252aa93110083c22744bd2ffb4de5b3dd45d3ebc0a`
  with case digest
  `89bef854a071f9566924a9dc62da511d78c12de1e5589bf7adc3b448c668d870`;
- 13/13 declared source states exercised in one exact 255-byte closure;
- 512 deterministic hostile no-throw inputs, totaling 82,055 UTF-8 bytes;
- maximum observed classifier transitions per source byte: 1;
- malformed quoted-tag families from 52 through 3,076 bytes, with transitions
  equal to input bytes and below every `8*N+64` limit; and
- 15/15 named invariant mutations rejected with the intended oracle code.

The mutation names remain exactly:

1. `opaque_state_delimiter_cross_pair`
2. `duplicate_disposition_same_interval`
3. `missing_disposition`
4. `relative_href_left_unresolved`
5. `draft_root_path_underflow`
6. `raw_attribute_prose_scope_fabrication`
7. `same_line_heading_owner_swap`
8. `processed_code_heading_promotion`
9. `unledgered_operation_admission`
10. `reviewed_operation_omission`
11. `stable_id_collision`
12. `work_counter_suppression`
13. `launcher_substitution`
14. `dependency_restore_race`
15. `publication_failure_each_rename_and_fsync`

One local prototype resource sample ran as:

```sh
/usr/bin/time -l node docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v9/test.mjs
```

The exact raw output is frozen at the identity above. It reports 0.08 seconds
elapsed and 73,023,488 bytes maximum RSS. This is a single local fixture run,
not a full-source resource gate or benchmark.

## Honest limitations

1. The implementation has not run over the pinned 168-source corpus and
   generates no denominator shards.
2. The full independently reviewed normative-operation ledger does not exist;
   four fixture-only operation identities carry zero normative credit.
3. The inherited 29 V8 cases replay their exact frozen V8 fixture module.
   That module does not export its raw input corpus into the V9 analyzer
   closure, so it is retained regression evidence rather than 29 additional
   V9 analyzer cases.
4. This is a hostile-boundary research analyzer, not a complete Bikeshed or
   HTML parser. Its raw-element and heading rules still require full-corpus
   hostile challenge.
5. The current transition count records consumed source positions. Helper
   comparisons, URL implementation work, and post-pass relation costs are not
   yet part of a machine-operation proof.
6. The evidence-envelope mutations use synthetic identities and publication
   transcripts. There is no frozen launcher, transitive dependency manifest,
   arbitrary-output publisher, or real crash-injection harness.
7. No two independent exact-byte challenges or root gestalt have adjudicated
   this implementation.

## Required next

The exact prototype evidence must receive two independent hostile challenges.
Confirmed defects require correction and a new exact subject. Only after that
may formation materialize the independently reviewed full operation ledger,
freeze launcher/import identities, and attempt the 168-source V9 corpus under
arbitrary-output, resource, and publication-fault rails.

## Credits

All denominator, semantic, owner, operation, compatibility, conformance,
parser, feature, cost-lattice, movement, integration, megatranche, and
production credits remain **zero**.
