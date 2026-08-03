# Constellation megatranche DAG

**Date:** 2026-07-29  
**Mode:** tranche development only  
**State:** schema-v2 amendment active; Value and Keyframes formation admitted,
parse-that and Fourier open, and root close blocked  
**Machine-readable companion:** `CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json`
**Adjudication:** `../audit/cross-repo/CONSTELLATION-DAG-SOL-ADJUDICATION-2026-07-29.md`

## Graph law

Repository waves keep their own writers. Cross-repository dependencies attach
to immutable milestones and receipts; they do not create an omnibus
implementation wave. Candidate packages, published packages, source commits,
tags and dirty workspace versions are distinct node types.

An edge means the target cannot claim its named close without the source
receipt. It does not authorize the source repository to edit the target.

Schema v2 distinguishes `planned`, `red`, `blocked`, `satisfied`,
`superseded` and `rejected`. A satisfied node has a verified evidence hash;
superseded or rejected evidence cannot satisfy an edge. Every node records its
phase, disposition, evidence, predecessor hash and family-coverage hash.
Value Clean B and admission additionally bind the root-owned immutable
`VALUE-FORMATION-ADMISSION-BINDING-2026-07-29.json`: it names the eighteen-family
denominator, exact covered nodes, ordered evidence tuples, predecessors,
required inputs, and typed credit. The external denominator owns the family
set; the root binding manifest owns its node membership.

## Repository wave groups

| Repository | Canonical formation authority | Waves / milestones | Formation state |
|---|---|---|---|
| Value | post-CA01 packet `VALUE-FORMATION-PACKET-2026-07-29.md`, SHA `359262b6…`; old `aa684060…` historical | `V.F0`; `V.L1`–`V.L6`; `V.A1`–`V.A3`; `V.U1`–`V.U4`; `V.H1`; `V.G1`; `V.Q1`; `V.Q2` | FORMATION ADMITTED at `4aac4457…`; replacement Clean A `2a3d42f9…` and genuinely later Clean B `3fceb394…` CLEAN; zero execution, visual, product, or release credit |
| parse-that | current formation authority `b1f99b4`; future-execution acknowledgment `302c623` | formation pass/prototype/audit chain plus separate serial `B.W0` execution chain | S6 terminal/sequence and S7 generic recovery locally ≥10×; complete formation proof RED; `NO RELEASE` |
| Keyframes | `docs/tranches/W/` admitted formation | `K.W1`–`K.W13` | FORMATION ADMITTED at `1f5db4c8…`; Clean A `bb32386e…` and later Clean B `c7865664…` PASS; W1 born-RED pending; zero execution credit |
| Fourier | `docs/tranches/N/` reformation | `F.W0`–`F.W13`, with transport milestone `F.T = F.W12.U1–U2` | A1 fresh Sol REJECT; A2 Luna sealed and fresh Sol active; R2a-reseal fresh Sol REJECT; same-Luna reseal-B active |

## Formation chains

Every repository has the same fail-closed spine:

```text
R.form.P1 -> R.form.P2 -> R.form.P3
          -> R.form.cleanA -> R.form.cleanB -> R.form.admission
```

Each pass binds its predecessor evidence SHA and the complete family manifest.
Later passes may reuse immutable evidence and work only changed/open families,
but every family receives `KEEP`, `FOLD`, `MOVE`, `SPLIT`, or `PRUNE`.
Clean B must be later than Clean A and read Clean A's post-absorption corpus.

The four repository admissions then feed a distinct constellation-wide pair:

```text
{P,V,K,F}.form.admission
  -> X.constellation.cleanA
  -> X.constellation.cleanB
  -> X.constellation.rehash
  -> X.formation-close
```

The rehash binds the final graph, validator, repository packets, two root
audits and handoff bytes. A synthetic root receipt or direct repository
admission edge cannot bypass this chain.

Parser adds the RED isolated every-scale/result-plane ≥10× prototype proof
between P3 and formation Clean A. The parser release chain below is future
execution and cannot satisfy parser formation.

## Intra-repository spines

### Value

```text
V.F0
  ├─> V.L1 ─> V.L2 ─> V.L3
  │              └────> V.L5 ─> V.L4
  │                         └────┘
  │                    V.L1–V.L5 ─> V.L6
  ├─> V.A1 ─> V.A2 ─> V.A3 ─> V.U4
  └─> V.U1 ─> V.U2 ─> V.U3
                   └──> V.U4
V.L6 + V.U3 + V.U4 ─> V.H1 ─> V.G1 ─> V.Q1 ─> V.Q2
```

`V.L4` depends on typed path ownership in `V.L5`; it may not create a
temporary string path. `V.L6` closes only on Keyframes W2 deletion/adoption
and W3 immutable tier proof; the root consumer edge stays open through
Keyframes W10 Atlas.

### parse-that future execution

```text
P.exec.PB1-order-ack
  -> P.exec.private-freeze
  -> P.exec.candidate-pack
  -> {P.exec.value-css-receipt, P.exec.json-receipt}
  -> P.exec.consumer-proof
  -> P.exec.cleanA
  -> P.exec.cleanB
  -> P.exec.release
  -> P.exec.value-rebind
  -> P.exec.bbnf-receipt
```

The split is a milestone DAG inside one serial integration wave. P-B1 receipt
`0609951a…` acknowledges this order only; it supplies no formation,
candidate-consumption, proof, execution or release credit. Bounded disjoint
research, prototype, baseline, candidate-consumer and hostile-critic
worktrees may return immutable receipts.

### Keyframes

```text
K.W1 -> K.W2 -> K.W3 -> K.W4 -> {K.W5, K.W6}
K.W5 -> K.W7
{K.W6, K.W7} -> {K.W8, K.W9}
{K.W8, K.W9} -> K.W10.integrated-pack
K.W10.integrated-pack -> {demo, Glass, Atlas, Slides crater results}
all crater results -> K.W10.close -> K.W11 -> K.W12 -> K.W13
```

W2 owns Value adoption plus local parser/scanner/serializer deletion. W3 owns
root/`/easing`/engine evaluation tiers and its immutable tier pack. W7 owns
built Glass and the recoverable demo shell. W10 creates a distinct integrated
post-W4–W9 pack, re-proves the W3 tier contract, and runs separate
Glass/Atlas/Slides/demo craters. W13 is post-execution close evidence,
distinct from formation Clean A/B.

### Fourier

```text
F.W0 -> {F.W1, F.W2, F.W3}
F.W2.U4 -> F.W1.U5 -> F.W1.close
F.W3 -> F.W4 -> F.W11
F.W1.close -> {F.W5, F.W6, F.W8, F.W9, F.W11, F.T}
F.W2 -> {F.W5, F.W6, F.W7, F.W8, F.W9}
F.W5 -> {F.W6, F.W9, F.W10}
F.W11.U2 -> {F.W6, F.T}
F.W11 -> {F.W12, F.W13}
F.W6 -> {F.W7, F.W10, F.W12}
F.T -> {F.W7, F.W12}
F.W7 -> F.W10
F.W8 -> {F.W10, F.W12}
F.W9 -> F.W10
F.W12 -> {F.W10, F.W13}
F.W10 -> F.W13
```

`F.T` is `F.W12.U1–U2`, the production transport milestone. The exact
live-derived route, operation, lifetime, persistence, producer and
workflow-owner graph remains blocked. F-L3's 618-node/1,688-edge result is
rejected as authority and retained only as evidence. Its owner-Sol failure
and the independent external Sol packet produced a bounded same-task Luna A1
prototype with sole pointer SHA `61d8266d…`, tree `526f3542…`, manifest
`51422d74…`, three deterministic runs and 45/45 named rejecting mutants.
Fresh Sol `019fb031-9bfd-7cc3-b845-c6f749df5423` nevertheless REJECTS A1:
20 of 32 independent hostile controls survive, one more fails for the wrong
reason, the deep hash is lossy, and seeded registries mask live truth. The same
Luna task therefore sealed A2 at pointer `581c2c6e…`, tree `250e7b56…`,
manifest `3af8f235…` and 16/16 own-reason mutants. Fresh Sol
`019fb066-8d7a-79a2-bdd7-a6fa44c795e3` now adjudicates it; the sealed A2
remains prototype-only meanwhile. N.P3's separate record agglomeration is
sealed at `2f8f5fd…` with 14 waves, 72 units and 158 unique terminal rows; it
is a satisfied record input only, explicitly `REJECT-AS-EXECUTION/ADMISSION`,
and cannot satisfy `F.form.P3` without the R2a-reseal fresh-Sol close and a
live-derived A2 fresh-Sol close.

## Cross-repository edges

| Source milestone | Target wave / milestone | Type | Exact release condition |
|---|---|---|---|
| `P.exec.candidate-pack` | `V.L1`, `V.L5` candidate consumption | candidate package | exact tarball SHA; source-direct UTF-16 Result/span/recovery surface; no source alias |
| Value L1/L5 and named `jsonParser` exact-SHA receipts | `P.exec.consumer-proof` | consumer receipts | same generic primitives, equivalent products, net deletion and formal every-scale/result-plane ≥10× CI-low |
| `P.exec.release` | `V.L1`, `V.L5` released rebind | published package | released tarball/tag/commit matches the admitted candidate |
| `P.exec.value-rebind` + `V.L6.css-path-abi-freeze` | `P.exec.bbnf-receipt` | ABI receipt | one generic-surface receipt; no competing CSS parser |
| `V.L1`–`V.L5` candidate surface | `K.W2` | candidate consumer | exact owner operations/refusals; Keyframes deletes local grammar/scanner/serializer in the same adoption wave |
| `K.W2` + `K.W3.tier-pack` | `V.L6` | consumer closure | exact deletion/adoption receipt plus immutable tiered Keyframes pack |
| `K.W10.integrated-pack` | demo/Glass/Atlas/Slides craters | packed consumer proof | distinct post-W4–W9 pack; every crater returns exact result |
| conditional Keyframes Atlas delta | sci/Atlas receiver | consumer receipt | affected edge passes or receives one bounded conflict packet; absent edge returns graph-backed `NO_CONFLICT` |
| published complete Glass 8 | `V.G1` | producer artifact | immutable JS/d.ts/component-CSS/standalone-style/font closure |
| complete built/published Glass artifact | `K.W7` | producer artifact | exact immutable closure; no raw source, copied CSS or local fallback |
| immutable Value 4 + Glass 7 + Keyframes 6 tuple | `F.W1` | existing-major consumer migration | exact pack/tag/commit SHAs, peers and packed exports; no dirty workspace identity |
| Fourier `R2a-reseal-B` + fresh Sol close | `F.W4`, `V.A2` | measured storage evidence | preserve 144/96 + 24 companion measurements, but repair per-attempt rollback journaling, 13-field envelope/live-schema oracle, hybrid selection isolation, companion budgets/credit and node-kind/path tree sealing; P39–P42 remain future W4 product gates |
| `F.W11` mounted operation registry | `F.T`, `F.W7` | generated API contract | client methods resolve to full mounted operations; real client/FastAPI/deployed transport tests |
| Value formation admission | constellation Clean A | repository formation | full-subject P1/P2/P3 plus post-CA01 packet `359262b6…`, replacement Clean A and genuinely later Clean B; old packet `aa684060…` is historical evidence only |
| parse-that formation admission | constellation Clean A | repository formation | full-subject P1/P2/P3, isolated ≥10× proof and fresh formation Clean A/B; release remains future execution |
| Keyframes formation admission | constellation Clean A | repository formation | pass evidence plus non-vacuous sequential Clean A/B and formation validator; K.W1–W13 remain future execution |
| Fourier formation admission | constellation Clean A | repository formation | three complete formation passes plus N.A1/N.A2; F.W0–W13 remain future execution |
| constellation Clean A → Clean B → final rehash | constellation formation close | root formation | two fresh post-repository audits and byte-verified final graph/packet/handoff hashes |

## Open critical path

1. Value formation is admitted without execution credit at receipt
   `4aac4457…`: final P3 remains `00fd0b79…`; V.L6 and the Keyframes surface
   cover 53 references/51 files, including both bench HTML import-map keys;
   replacement Clean A and genuinely later Clean B are both satisfied;
2. parse-that completes its full-subject formation chain and replaces or
   simplifies the private kernel until every frozen semantic plane meets the
   formal ≥10× CI-low; publication remains future execution;
3. Keyframes formation is admitted at normalized corpus `1f5db4c8…`; W1 is
   the next born-RED execution boundary and has zero credit in this formation
   drive;
4. Fourier completes the genuinely fresh Sol close over the sealed same-Luna
   F-L3 A2 reformation, plus same-Luna R2a-reseal-B and another fresh Sol. The rejected
   reseal destructively rolled back pre-existing events, used a circular schema
   oracle, leaked hybrid rows into selection and incompletely sealed node
   kinds/directories. P39–P42 remain future W4 product gates; A remains the
   default and B/C/D unselected;
5. Fourier completes P1/P2/P3 agglomeration and two fresh formation audits;
6. root executes all twenty-nine schema-v2 wrong-answer mutants, runs two fresh
   constellation-wide clean audits, revalidates final packet hashes, and
   writes the durable resume handoff.

No peer product source is changed by this graph.
