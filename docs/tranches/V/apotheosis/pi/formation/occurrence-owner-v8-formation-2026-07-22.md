# V·π occurrence → operation/owner formation v8 — provisional receipt

Date: 2026-07-22

Status: **PROVISIONAL; AWAITING TWO INDEPENDENT CHALLENGES AND ROOT
GESTALT.** This receipt freezes one RED-only denominator-formation subject. It
does not accept a denominator, semantic interpretation, parser feature,
operation or owner review, owner edge, cost lattice, compatibility or
conformance claim, integration, production mutation, or megatranche movement.

## Terminally rejected predecessor

V8 authenticates and retains the terminal V7 rejection. The rejected V7
manifest is 21,945 bytes at
`259d9fce299411222a126245ce22c627b260f4260d7009ecaf94ab9fbb7c0968`.
Its two independent REJECT challenges are exactly:

| docket object | bytes | SHA-256 |
|---|---:|---|
| challenge A | 14,554 | `d63c351119de1732194f9134752adf0d08e85eddbb74f20fd7fa2ec0e78ec528` |
| challenge B | 7,641 | `9308962748155124807f4ea0603d6b89dbc47673f5abd4afb070fbaeb70b185d` |
| root gestalt | 4,828 | `8a7dffde22dbdc68d38d92cb10484cf562386769f95d56dc23c32da92894f2f9` |
| terminal rejection | 2,406 | `2c77e86fabb4232f74d8ad548637206af74435122f6dce7537ee38dd37444190` |

The V7 manifest, both schemas, all nine shards, and all nine V7 tool modules
were checked against the pre-V8 checksum ledger after V8 publication; every
byte remained unchanged. All V7 credits remain zero.

## Exact V8 subject

| object | bytes | SHA-256 |
|---|---:|---|
| manifest | 24,485 | `1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af` |
| manifest schema | 13,705 | `aa7acb7c0cc7fd1a1f419b88b309dec24b17d07a7088ee2b43650a5b8743165f` |
| shard schema | 15,103 | `5453b761d952c3d06d0932389ef8bd8330155a92afc4d40c52d6a39d1bc21122` |

The manifest content digest is
`8ce76c005622361c04ebf6096f35f25524f8604aa07445344eb0bec1c45b7123`.
The exact pre-execution and post-import module-set digest is
`b8b5f48b773eee54cad875e5d5593fdb6a6c69890c6ebc60bad5e24431ed6b11`.

| shard | bytes | SHA-256 |
|---|---:|---|
| `carriers.json` | 2,884,243 | `250c058a55f5ee681955f9b28180f0e6d8910b45336e68538d02f2571bfc1370` |
| `codes.json` | 967 | `58629300d368926b72b4f5fa0195c8794f5d0672a21ea18147b08861b5dad6d9` |
| `compatibility.json` | 3,102 | `882687365568d26319288652c5911e7845d651efc4db0722f131805e02445aa4` |
| `contexts.json` | 990,734 | `b4642b541e7cc9e4bf7ccfcf392276878be534603735da7aacace4fc4dc1b2d3` |
| `lexical-dispositions.json` | 26,387,230 | `628219590676ffe200554e48daad158c4fc992dc102923a512fb09dcfe392ada` |
| `operations.json` | 1,010,201 | `75a0d80293043a6428705759593f5eadb5152f1baba68f791a19e4bb2669233f` |
| `owner-scope.json` | 1,927 | `eef240af292bbc6fe0d4641a00cf3faf5d7ec97bce93bacc41d657a9f7b3cdf2` |
| `references.json` | 8,920,302 | `efac8c952bf7684dd2f38e8035abe7ed3d19707178632cbb248732d9df9913ef` |
| `sources.json` | 24,279 | `ff44e41c3767f3941f9dc5fe01089c8cbcdac1c50cbd0ce0751190b65d3c6373` |
| `strings.json` | 946,909 | `fc3fe53244efafd824af6dc8019e514b15c5b401fba8755a67644ec834b79696` |

## V8 lexical-state formation

One quote-aware, source-ordered Bikeshed lexical classifier now supplies the
parsed tokens and state ranges consumed by all five structural and occurrence
families: headings, containers, carriers, operations, and references. There
is no parallel raw-text structural regex path.

- Tag boundaries are scanned while respecting single- and double-quoted
  attribute values, including a quoted `>`; attributes retain exact name,
  value, and source spans. HTML/Bikeshed headings consume parsed tag tokens.
  ATX and setext headings derive visible text through the same lexical model,
  so inline tags and quoted `>` cannot truncate or corrupt the title.
- Container class/id and `algorithm`, `data-algorithm`, and algorithm-class
  markers are read only from parsed attributes. The word `algorithm` in an
  unrelated quoted attribute is not a structural marker.
- Comments and the contents of `script`, `style`, `xmp`, and explicitly
  highlighted raw `pre` blocks are opaque states. Processed `code` and `samp`
  remain eligible for Bikeshed shorthand. Escaped shorthand is classified,
  but reviewed-excluded rather than emitted.
- Every carrier/reference candidate has one stable `lexv8-*` disposition row:
  `INCLUDED` or one of the closed reviewed-excluded reasons. Every emitted
  carrier and reference joins an included disposition. Verification rejects
  any carrier or operation wholly contained by an opaque/comment state.
- Active parsed `href` values targeting CSSWG drafts or W3C TR specifications
  are eligible references; other href values and non-href tag text are
  reviewed-excluded. This admits the exact CSS Color 5 href witness without
  admitting arbitrary attribute text.

The 29 counterfixtures include active hrefs and tags with quoted `>`, ATX and
setext headings containing such tags, parsed container class/id attributes,
unrelated quoted algorithm prose, comments, escaped shorthand, raw
script/style/xmp/highlighted-pre content, processed code/samp, and the quoted
Compositing `normal blend mode` heading. Their exact digest is
`89bef854a071f9566924a9dc62da511d78c12de1e5589bf7adc3b448c668d870`.

Authenticated regressions are closed as follows: exactly one included CSS
Color 5 active-href witness at byte offset 147,967; zero emitted escaped
`[[PromiseIsHandled]]` references and exactly one reviewed exclusion; zero
emitted raw JavaScript `'running'` references and exactly two reviewed
exclusions; zero CSS Display operation leaks from comments; zero corrupt blend
heading contexts and two `normal blend mode` heading witnesses. The two
challenged CSS Borders 4 code-link witnesses remain positive. The mutation
suite rejects 33/33 cases, including removal/promotion of the new lexical
dispositions and removal of the active href; its digest is
`b2b47cb92a3d536d2325b7bb979df04159eee55cb41283f64945ba545f2882ce`.

## Authenticated censuses

The exact source closure remains 168 sources and 14,609,103 source bytes. V8
reports 34,603 strings, 7,042 contexts, 16,457 carriers, 5,006 operation
candidate rows over 5,004 unique intervals with two alias groups, 311
algorithm openings, ten required RED joins, and 64,530 references. The new
lexical table classifies all 160,605 candidates: 142,485 included and 18,120
reviewed-excluded.

Reference sub-censuses are 330 typed modifiers, 862 dated-TR references, five
bibliography modifiers, six multiline bibliography references, 22 multiline
definition references, 487 Bikeshed-code references, two challenged code-link
positives, and zero terminal-punctuation URLs. The retained controls report
zero excluded-raw-literal leaks, one inherited-scope fixture join, 52
compatibility rows, 37 keyframes consumers, and 14 owner-scope rows.

Reviewed operations, reviewed owners, owner edges, and denominator, semantic,
owner, operation, compatibility, conformance, parser, feature, cost-lattice,
movement, integration, and production credits are all exactly zero.

## Replay, publication, and resource evidence

The replay path binds Node v26.0.0, the exact Node executable hash, exact
`exec_argv` `--max-old-space-size=650`, and a 782,237,696-byte V8 heap limit.
Repository generation, repository `--check`, and a fresh arbitrary-output
generation were GREEN under that attested runtime:

| assay | manifest SHA-256 | maximum RSS |
|---|---|---:|
| repository generation | `1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af` | 912,965,632 |
| repository `--check` | `1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af` | 917,258,240 |
| arbitrary-output generation | `1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af` | 911,605,760 |

All three maxima are below the 943,718,400-byte (900 MiB) limit. The
fixture-only replay used 71,680,000 bytes maximum RSS. The arbitrary manifest
and all ten arbitrary shards were byte-compared to the repository bundle and
matched exactly.

Publication remains truthfully described as a durable, fsynced two-rename
protocol, not bundle-atomic. Module identities are checked before execution
and after import, with the residual path-import TOCTOU explicitly disclosed.

## Frozen tool identities

| module | bytes | SHA-256 |
|---|---:|---|
| `launch.mjs` | 6,270 | `93624f100f16846f5abe39fa9bf722c26ff36002a80858bab284ef33e7d74836` |
| `core.mjs` | 12,128 | `d65ef6d8f273ce1bc5a114cb3e090ccd067b10c264566d03c46754117a159d51` |
| `discover.mjs` | 39,999 | `684ddc0f7b90e018cf7f67d98d9b117df9245e4fc2006263358fb6ef4560b478` |
| `evidence.mjs` | 22,080 | `d4aacb75a81d9af1fe3945e5bafdddd3e4ab705a1c904760923df3c9a49af980` |
| `fixtures.mjs` | 22,402 | `3c5926b4911b0826fe86d4252aa93110083c22744bd2ffb4de5b3dd45d3ebc0a` |
| `lexical.mjs` | 9,862 | `d302c26525920ee244f0fa81d864b7448c85e87094c34b7e947fbe5f4f8335e3` |
| `mutations.mjs` | 12,261 | `91586e518826f429be294d9f3e85e8b5e5e1db9516f384c50f357ff7cfece803` |
| `shared.mjs` | 6,089 | `9c51eb861440f314d3b168ba7aa8a28ca6cbeea2f8736f21e9786ceb17c9ce27` |
| `tables.mjs` | 26,243 | `dfc94801ae0fb155a483305cccddebb215cf5d0086e7df7cb1120b7d0c97d783` |
| `verify.mjs` | 37,119 | `06722073719b6c7226cf34dd2300e008d7639c1ffb0a5267224dcf1c2bc4fc33` |

## Requested adjudication

Two fresh independent skeptical challenges must review the exact manifest,
schemas, ten shards, ten tools, and this receipt. Each should assume the shared
lexical-state boundary, parsed-token structural consumers, complete candidate
dispositions, hostile regressions, semantic regeneration, mutation suite,
arbitrary-output replay, memory ceiling, and RED-only authority are wrong and
attempt to prove it. Root then performs a fresh gestalt. This formation agent
does not self-review or accept V8. Until that external sequence closes, V8 is
provisional and earns no credit.
