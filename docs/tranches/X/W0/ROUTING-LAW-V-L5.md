SERVED MODEL: claude-opus-5[1m]

# TOMBSTONE — the routing law keyed to a wave that was never defined (CC-011 / C-13)

**Row**: `CC-011` · original-ID `V·L5 / "V.L5"` · src `mt`
**Verb**: **RETIRE (executed)** — `registry/CARRY-CUT-LEDGER.md` §1.A
**Executed by**: X-W0.i, wave X-W0, tranche X · **2026-09-17** · branch `tranche-u`
**Spec**: `docs/tranches/X/waves/W0.md` §Agent Units "X-W0.i" `:201–206` · §Scope 9 `:32` ·
**HG-17** `:320–323` · §File Bounds `:87–94` · §Format And Lint Cadence `:343` · §Commit Plan row 8 `:378`
**Emitted for**: X-W11 G1's 117-row walk, which reads CC-011's tombstone path from this wave and
authors none of it (`W11.md:372`).

> **Reading note.** This file is the **sanctioned home** for the retired identifier. Per HG-17 `:321`
> residual token hits are legal only in the read-only classes — the frozen 7e28 copies, the two
> `codex-provenance` proofs, the dated 07-29 restatement/evidence records, X-tranche records, **the
> tombstone**, and the ledger's §0 alias line. Every law-bearing site was carved to **zero** hits, so
> the minted text survives **here**, quoted verbatim, and nowhere that could be mistaken for law.

---

## §1 The mandate, quoted verbatim

**The ledger row that ordered this act**, `registry/CARRY-CUT-LEDGER.md` §1.A, as it stood at open
⟨`git show HEAD:docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md | grep '^| CC-011'`⟩:

> | CC-011 | V·L5 / "V.L5" | mt | parser routing label used in 5 docs, defined in none; silent `·`→`.` glyph drift | **RETIRE** — C-13: rewrite the routing law against V·L1..V·L4 + an explicitly defined new cut; normalize to middot with a period-form search alias | PROV C-13:211, §0.3#4 |

**The wave's own charge**, `waves/W0.md:32` (§Scope 9):

> Execute the C-13 RETIRE act: rewrite every live routing law keyed to the nonexistent `V·L5`
> against `V·L1..V·L4` plus an explicitly defined new cut, normalize the glyph and register the
> period-form search alias, and tombstone the row (CC-011).

---

## §2 The minted law, quoted verbatim — all six law-bearing sites as they read at open

All six are quoted from the committed blobs at open HEAD **`a0d392dc`**
⟨`git show a0d392dc:<path>`⟩, not from working-tree bytes.

### §2.1 `megatranche/PARSER-RESURRECTION-HANDOFF-2026-07-31.md:64` — statement 1

```text
## Routing law

The parser may affect Value only through:

`parser law or no-runtime ruling → Value PLAW-BIND → V.L1/V.L5 → Value release/rebind`
```

### §2.2 `megatranche/CONSTELLATION-COMMISSION-2026-08-03.md:76` — statement 2

```text
- **Admission**: the RE-AUTHORED canonical parser addendum + differential proof + bench
  receipts under the ratified law; routing law absolute: parser → Value PLAW-BIND →
  V.L1/V.L5 → packed Value release → Fourier F.W0; keyframes consumes as a TYPED consumer
  after value.js; direct parse-that→Fourier credit forbidden.
```

### §2.3 `megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md:35` — statement 3

```text
The only lawful receiver path remains:

parser law or durable no-runtime ruling
  -> Value PLAW-BIND
  -> V.L1 / V.L5
  -> Value release and rebind
  -> packed Value
  -> Fourier F.W0 atomic tuple
  -> F.W1
```

### §2.4 `megatranche/coordination/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md:78,80,87,174,176,178` — statement 4

The intra-repository Value spine and the prose beneath it:

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

> `V.L4` depends on typed path ownership in `V.L5`; it may not create a
> temporary string path.

and the three cross-repository edge rows:

> | `P.exec.candidate-pack` | `V.L1`, `V.L5` candidate consumption | candidate package | … |
> | `P.exec.release` | `V.L1`, `V.L5` released rebind | published package | … |
> | `V.L1`–`V.L5` candidate surface | `K.W2` | candidate consumer | … |

### §2.5 `…/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json` — the DAG's JSON twin (10 hits)

Two node declarations and eight edges:

```json
{"id":"V.L5.candidate","repo":"value","phase":"execution","type":"candidate-consumer-milestone","state":"blocked", … }
{"id":"V.L5","repo":"value","phase":"execution","type":"wave","state":"planned", … }
{"from":"P.exec.candidate-pack","to":"V.L5.candidate","type":"candidate-availability"}
{"from":"V.L2.candidate","to":"V.L5.candidate","type":"candidate-capability"}
{"from":"V.L5.candidate","to":"V.L4.candidate","type":"candidate-capability"}
{"from":"V.L5.candidate","to":"P.exec.value-css-receipt","type":"consumer-receipt-input"}
{"from":"P.exec.release","to":"V.L5","type":"released-rebind"}
{"from":"V.L2","to":"V.L5","type":"depends"}
{"from":"V.L5","to":"V.L4","type":"depends"}
{"from":"V.L5.candidate","to":"K.W2","type":"owner-surface"}
```

plus the two wrong-answer mutant descriptions that spell the same spine in prose:

```json
{"id":"M06","mustReject":"any corrected Value edge L2-to-L5, A3-to-U4, U3-to-H1, L3-to-K.W2, or L4-to-K.W2 is absent"}
{"id":"M16","mustReject":"Value candidate or execution L1-to-L2-to-L5-to-L4 spine is incomplete, or a direct L5-to-L6 bypass is restored"}
```

### §2.6 `megatranche/workflows/validate-constellation-dag.mjs` — the executable encoding (8 node identifiers)

```js
// requiredEdges
  ["V.L2.candidate", "V.L5.candidate"],   // :129
  ["V.L5.candidate", "V.L4.candidate"],   // :130
  ["V.L2", "V.L5"],                       // :134
  ["V.L5", "V.L4"],                       // :135
  ["V.L5.candidate", "K.W2"],             // :144
// forbiddenEdges
  ["V.L5", "V.L6"],                       // :168
// self-test mutation M16
  removeEdge(g, "V.L5.candidate", "V.L4.candidate");                 // :667
  g.edges.push({ from: "V.L5", to: "V.L6", type: "depends" });       // :668
```

**8 identifiers, exactly as HG-17 `:322` counted them.** Measured at open
⟨`grep -c 'V·L5\|V\.L5' …/validate-constellation-dag.mjs`⟩ → **8**.

---

## §3 The no-definition probe, pasted with its output

The label routed release for four repositories. It was defined by nobody.

**P-1 — the gate's own probe** ⟨`grep -c 'V·L5\|V\.L5' docs/tranches/V/megatranche/registry/adjudicated/layout-gestalt.md`⟩:

```
0
```

**P-2 — widened to the whole adjudicated registry, because one file is a weak denominator**
⟨`ls …/registry/adjudicated/*.md | wc -l`⟩ → **231** records;
⟨`grep -l 'V·L5\|V\.L5' …/registry/adjudicated/*.md | wc -l`⟩:

```
0
```

**Zero of 231 adjudicated records defines it.** The fold recorded the same reading independently on
2026-08-28 (`X-W0-FOLD.md:464`: *"`grep -l 'V·L5\|V\.L5' registry/adjudicated/*.md` → **0 files**"*).

**P-3 — what IS defined, in the same authority the label pretended to belong to.**
⟨`awk 'NR==97' …/STATE.md`⟩, verbatim excerpt:

```
four born-RED waves **V·L1..V·L4** (ordered AFTER MT-APP-1). Apotheosis: `registry/adjudicated/layout-gestalt.md`
```

⟨`awk 'NR>=402&&NR<=403' …/registry/adjudicated/layout-gestalt.md`⟩:

```
**Sequencing rider (A-6): the band executes after MT-APP-1.** Preferred order V·L1 → V·L2 → V·L3 →
V·L4; each COMPLETABLE row states what it delivers alone. All behavioural gates key to
```

**Four waves, ordered linearly, and no fifth.** HG-17's born-RED cited `STATE.md:88` for this line;
at execution it resolves at **`:97`** (a dated anchor drift inside a generated table, recorded here so
no later seat cites `:88`). The same sentence also appears at `STATE.md:102`.

**P-4 — the two waves the cure names, which DO exist** ⟨`head -1`⟩:

```
docs/tranches/X/waves/W9.md   → # X.W9 - Parser and library apotheosis (the 4.1 cut)
docs/tranches/X/waves/W11.md  → # X.W11 - Release and Verified Close
```

**The disease, named once.** The minted spine conflated two different things that share a letter: the
**layout** band `V·L1..V·L4` (the block law · one mount · the inline law · the proving pair — real,
adjudicated, four waves) and a **library/parser** chain `V.L1..V.L6` invented to carry a release
routing. The period glyph let the conflation pass every grep written against the middot. The row's own
gist says it: *"used in 5 docs, defined in none; silent `·`→`.` glyph drift."*

---

## §4 The cure as executed

### §4.1 The law, rewritten

Every law-bearing site now reads:

> **`V·L1..V·L4 → X-W9 → X-W11`**

with the new cut **explicitly defined, not implied**:

| term | what it is | defined at |
|---|---|---|
| `V·L1..V·L4` | the four born-RED layout waves, ordered `V·L1 → V·L2 → V·L3 → V·L4` | `registry/adjudicated/layout-gestalt.md:402,411,448,491,533`; `STATE.md:97` |
| **X-W9** | *"Parser and library apotheosis (the 4.1 cut)"* — 9 units, 33 numbered conditions, 31 born RED | `docs/tranches/X/waves/W9.md` |
| **X-W11** | *"Release and Verified Close"* — 5 serial units, twelve conditions, terminal ledger state | `docs/tranches/X/waves/W11.md` |

The ledger already homed this work under these two waves before this act: **CC-008** (`V·MT7`,
*"parser + library apotheosis; small, total, consumer-proven 4.1 surface"*) → **FOLD → X-W9**, and
**CC-010** (`V·MT9 · V·C6`, *"release + verified close"*) → **FOLD → X-W11**. The cut is therefore
**named from the ledger's own dispositions**, not invented at this seat.

### §4.2 Per site

| # | site | act | tokens before → after |
|---|---|---|---|
| 1 | `megatranche/PARSER-RESURRECTION-HANDOFF-2026-07-31.md` `:64` | law rewritten + dated carve note | 1 → **0** |
| 2 | `megatranche/CONSTELLATION-COMMISSION-2026-08-03.md` `:76` | law rewritten + dated carve note | 1 → **0** |
| 3 | `megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` `:35` | receiver path rewritten (the bare *"Value release and rebind"* step gains its wave) + dated carve note | 1 → **0** |
| 4 | `…/coordination/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md` | spine + prose + 3 cross-repo edge rows + dated carve note | 6 → **0** |
| 5 | `…/coordination/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json` | 2 nodes retired → 3 minted; 8 edges re-pointed, 1 added; 2 mutant descriptions restated | 10 → **0** |
| 6 | `megatranche/workflows/validate-constellation-dag.mjs` | 5 required edges, 1 forbidden edge, the M16 mutation, + a carve comment | **8** → **0** |

### §4.3 The graph, exactly

The spine `V.L1 → V.L2 → V.L3` with `V.L2 → V.L5 → V.L4` hanging beneath it becomes the linear band
the adjudicated authority already ordered, with the new cut appended:

```text
V.L1 ─> V.L2 ─> V.L3 ─> V.L4 ─> V.X.W9 ─> V.X.W11
```

Node moves: `V.L5.candidate` → `V.X.W9.candidate`; `V.L5` → `V.X.W9`; **`V.X.W11` minted** (the
release/rebind terminal the law names, and the target `P.exec.release` had been pointing at a
nonexistent wave). Nodes **130 → 131**, edges **177 → 178**.

Edge moves, one row each:

| before | after | why |
|---|---|---|
| `V.L2.candidate → V.L5.candidate` | `V.L3.candidate → V.L4.candidate` | the band's own linear order (`layout-gestalt.md:402`) |
| `V.L5.candidate → V.L4.candidate` | `V.L4.candidate → V.X.W9.candidate` | the cut follows the four |
| `V.L2 → V.L5` | `V.L3 → V.L4` | as above, execution twin |
| `V.L5 → V.L4` | `V.L4 → V.X.W9` | as above, execution twin |
| — | `V.X.W9 → V.X.W11` **(new)** | the law's own arrow, now machine-checked |
| `P.exec.candidate-pack → V.L5.candidate` | `→ V.X.W9.candidate` | the parser candidate lands at the parser wave |
| `V.L5.candidate → P.exec.value-css-receipt` | `V.X.W9.candidate → …` | same |
| `P.exec.release → V.L5` | `P.exec.release → V.X.W11` | *released rebind* is X-W11's definition |
| `V.L5.candidate → K.W2` | `V.X.W9.candidate → K.W2` | keyframes' candidate consumer surface |
| **forbidden** `V.L5 → V.L6` | **forbidden** `V.X.W9 → V.L6` | the guard is preserved, not dropped: `V.L6` still closes only through `V.L3` + `V.L4` |

**`V.L1`, `V.L2`, `V.L3`, `V.L4`, `V.L6` and `V.L6.css-path-abi-freeze` keep their ids.** Nothing was
renamed (L-5).

### §4.4 The glyph, and the alias

Canonical prose form is the **middot**: `V·L1..V·L4`. The **period** form is registered as that
identifier's **search alias** at `registry/CARRY-CUT-LEDGER.md` **§0 clause 7** (added by this unit):
the two spellings name one identifier, any sweep must match both, and *an alias is a search key, never
a rename*. Machine identifiers inside the constellation graph keep the graph's own repo-prefixed
period grammar — `V.L1`, `V.X.W9`, `V.X.W11` — and resolve to the middot canon through that clause.

**Why `V.X.W9` and not `X.W9`.** In this graph the first segment is the repository (`P.` parse-that,
`V.` value, `K.` keyframes, `F.` fourier) and **`X.` is already the constellation-root namespace**
(`X.constellation.cleanA`, `X.constellation.cleanB`, `X.constellation.rehash`, `X.formation-close`).
A bare `X.W9` would read as a root node and re-introduce, in a new place, the exact ambiguity this
tombstone exists to end. `V.X.W9` says repository `value`, tranche `X`, wave `9`, and greps uniquely.

---

## §5 The live set, enumerated before and after

The probe is the unit's own ⟨`git ls-files docs/ | xargs grep -ln 'V·L5\|V\.L5'`⟩, run NUL-safe
⟨`git ls-files -z docs/ | xargs -0 grep -lI 'V·L5\|V\.L5'`⟩ because **3** tracked paths under `docs/`
contain spaces and the naive form emits `grep: … No such file or directory` for each fragment (both
forms returned the same count at open, **61** — the errors are noise on stderr, not a miscount).

| class | rule | open (2026-09-17) | close | disposition |
|---|---|---:|---:|---|
| **law-bearing sites** | the write set — rewrite | **6** | **0** | **CARVED** |
| frozen 7e28 copies | read-only: an edit inside one breaks HG-9's digest re-hash (`W0.md:101`) | 20 | **20** | untouched by rule |
| `codex-provenance` proofs | read-only: they quote the defect **as its own proof** | 2 | **2** | untouched by rule |
| dated 07-29/08-02/08-03 restatement + evidence records, harvest/reconciliation JSON | read-only (epoch rule): they **restate** a law they do not mint | 10 | **10** | take the alias, not an edit |
| X-tranche records | read-only: this tranche's own spec, fold, union, conformance and execution records | 22 | **22** | untouched by rule |
| `CARRY-CUT-LEDGER.md` | CC-011's **original-ID cell** — L-5 forbids renaming a row's id | 1 | **1** | **kept deliberately** |
| **subtotal, tracked before this commit** | | **61** | **55** | −6, exactly the law-bearing set |
| **this tombstone** | the sanctioned home; tracked by this same commit | 0 | **+1** | **MINTED** |
| **total at the landed commit** | | **61** | **56** | −6 law-bearing, +1 tombstone |

⟨`grep -c 'V·L5\|V\.L5' docs/tranches/X/W0/ROUTING-LAW-V-L5.md`⟩ → **51**, every one of them a
quotation, a probe or a table cell in this file. It is the only file this act **added** to the census,
and HG-17 `:321` names the tombstone as a legal class by construction.

⟨`comm -23 open close`⟩ → **exactly the six law-bearing sites**; ⟨`comm -13 open close`⟩ → **empty**.
No file acquired the token; no read-only file lost it.

**The delta the spec did not predict, stated and not chased.** HG-17's born-RED (2026-08-03) measured
**35** files: 19 frozen copies · 2 provenance proofs · 2 X-tranche records · 12 live V-tranche sites.
At execution: **61** — frozen **20** (+1), provenance **2**, X-tranche **22** (+20), live V-tranche
**17** (+5). **The +20 is this tranche's own authoring traffic** — wave specs, the fold, the union
seams, the four conformance passes, two execution records — every one of them a **read-only class by
rule**, and none of them a law. The +5 live sites are likewise restatement class: two formation lane
records that **blockquote** the commission's law (`formation/fourier/lane-docs.md:333` opens with
`> *"routing law absolute: …"`; `formation/keyframes/CENSUS-2026-08-03.md:189` cites it in
parentheses) and four `registry/harvest/wf_*.json` workflow payloads. **The write set never moved: it
is the same six sites HG-17 named, and it is now empty.**

The **ten** restatement/evidence records that keep the token, named so a later sweep does not
re-discover them as defects: `audit/cross-repo/CONSTELLATION-GRAPH-SOL-AUDIT-2026-07-29.md:33` ·
`audit/cross-repo/VALUE-P2-SOL-AGGLOMERATION-2026-07-29.md:124` ·
`coordination/CROSS-REPO-DECISION-LEDGER-2026-07-29.md:46,48,112` ·
`coordination/AUTHENTICATED-PASS-PROVENANCE-RECONCILIATION-MATRIX-2026-08-02.json` ·
`formation/fourier/lane-docs.md:333` · `formation/keyframes/CENSUS-2026-08-03.md:189` ·
`registry/harvest/wf_19673577-a99.json` · `wf_3c34d986-c04.json` · `wf_5ea8a490-613.json` ·
`wf_83265e1d-a99.json`.

---

## §6 The gate, BEFORE → AFTER

**HG-17** (`W0.md:320–323`) — *"No law-bearing site survives: each reads `V·L1..V·L4 → X-W9 → X-W11`,
and `node …/validate-constellation-dag.mjs` runs with **zero** `V.L5` node identifiers."*

| limb | BEFORE (HEAD `a0d392dc`) | AFTER | verdict |
|---|---|---|---|
| law-bearing sites carrying the token | **6** (1·1·1·6·10·8 hits) | **0** | **GREEN** |
| each reads `V·L1..V·L4 → X-W9 → X-W11` | 0 of 6 | **6 of 6** | **GREEN** |
| `validate-constellation-dag.mjs` `V.L5` node identifiers | **8** | **0** | **GREEN** |
| the validator **runs** (§Format And Lint Cadence `:343`) | runs · exit 1 · one base error | runs · exit 1 · **the same one base error, byte-identical output** | **GREEN — unchanged by the carve** |
| residual token hits confined to the read-only classes | **6 of 61 outside them** — the law-bearing set (§5) | **0 outside them**; all **56** sit in a class HG-17 `:321` names | **GREEN** |

**The one base error is pre-existing and is not this unit's.** Verbatim, identical before and after:

```
{
  "ok": false,
  "baseErrors": [
    "V.form.packet-post-CA01 evidence bytes do not match /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/VALUE-FORMATION-PACKET-2026-07-29.md"
  ]
}
```

It is the **K-13 standing exception** measured from the other end: X-W0.d re-verified that packet at
`d07b6ddc…` / 63,572 bytes, *"adopted AS-FOUND, sole extant version"*, while the graph records
`359262b6…` for the same path. The graph's recorded digest and the as-found bytes have disagreed since
07-29; `~/.codex/**` is read/hash-only (M-21 §2) and the DAG's evidence block is not in this unit's
carve. **Recorded, not touched** — R-1 below.

**Because that error short-circuits at `:585` before the 29 mutants run**, the gate's structural half
was proved separately and **read-only**: HEAD's blobs and the carved bytes were each copied to the
session scratchpad, the one drifted evidence digest was corrected **in the copies only**, and the
validator was run against both.

| | nodes | edges | mutants | all rejected | `ok` | exit |
|---|---:|---:|---:|---|---|---|
| BEFORE (HEAD blobs) | 130 | 177 | 29 | **true** | `true` | 0 |
| AFTER (carved bytes) | **131** | **178** | **29** | **true** | `true` | 0 |

Double-run identical on both sides ⟨`cmp -s`⟩. `git status --porcelain -- docs/tranches/V/megatranche/`
confirms the repository was untouched by the harness.

**The falsifier still fires, on the new spine.** M16's first error moves with the cure rather than
disappearing:

```
BEFORE  M16 -> missing V.L5.candidate -> V.L4.candidate
AFTER   M16 -> missing V.L4.candidate -> V.X.W9.candidate
```

and M06's is unchanged (`missing V.L4.candidate -> K.W2`). The graph can still prove it fails — which
is the whole reason the encoding is executable.

**HG-17's own falsifier**, `:323` — *"re-glyph one `V·Ln` to the period form without registering the
alias and the alias probe names the file"* — is discharged by §0 clause 7: the alias is registered, the
canonical probe is written into the ledger, and both spellings are declared one identifier.
The second half — *"Curing a citation inside a 7e28 copy instead fails HG-9's digest re-hash"* — is
discharged by measurement: **20** frozen copies carry the token and **0** were written
⟨`git status --porcelain -- docs/tranches/V/megatranche/formation/codex-worktree-7e28/`⟩ → empty.

---

## §7 Terminal disposition

**CC-011 is RETIRED, EXECUTED, and closed at X-W0.i on 2026-09-17.**

1. **The label is dead as law.** No live routing law is keyed to it. Six law-bearing sites carved to
   zero; each carries a dated carve note naming X-W0.i, CC-011 and C-13, and pointing here.
2. **The work it pretended to route is homed in waves that exist**: **X-W9** (parser and library
   apotheosis) and **X-W11** (release and verified close), by the ledger's own CC-008 and CC-010
   dispositions.
3. **The glyph escape route is closed**: §0 clause 7 registers the period form as a search alias, with
   the canonical two-spelling probe written down, and renames nothing.
4. **The identifier survives only where it must** — in this tombstone, in the frozen and provenance
   corpora that are evidence, in dated records that restate rather than mint, in this tranche's own
   records, and in CC-011's original-ID cell, which L-5 forbids rewriting.
5. **It cannot re-enter under a new name.** A future `V·Ln` beyond `V·L4`, or an `X.W*` node in the
   constellation-root namespace, is now a **greppable defect** against §0 clause 7 and against this
   file's §4.3 table.

**This row does not re-open.** Anything that looks like it — a new undefined wave label in a routing
law — is a new row, measured and adjudicated on its own bytes.

---

## §8 Residuals — stated, not cured

- **R-1 · the DAG's `V.form.packet-post-CA01` evidence digest is stale, and it gates the whole
  validator.** `359262b6…` recorded vs `d07b6ddc…` as-found. Pre-existing (identical before and after
  this carve), outside this unit's carve, and touching `~/.codex/**` is forbidden (M-21 §2). Its
  consequence is real: **the validator can never reach its 29 mutants at HEAD**, so the executable
  encoding certifies nothing until it is cured. Proved runnable-and-sound here only through a
  read-only scratchpad harness. **Routed to X-W11's 117-row walk or the L-18 passes; no act taken.**
- **R-2 · `V.L6` and `V.L6.css-path-abi-freeze` carry the same shape as the retired label.** ⟨`grep -l
  'V·L6\|V\.L6' registry/adjudicated/*.md | wc -l`⟩ → **0** of 231: `V.L6` is likewise defined in no
  adjudicated record, and `STATE.md:97` names **four** waves, not six. It is **not** in HG-17's write
  set and was **not** touched — CC-011's row is about `V·L5` alone, and widening it here would be the
  seat inventing scope. **Named so the next census finds it as a row, not as a surprise.**
- **R-3 · `V.L1` still carries a parser-consumer role in the graph** (`V.L1.candidate` is typed
  `candidate-consumer-milestone`; `P.exec.release → V.L1` is a `released-rebind`), although `V·L1` is
  the **block-law layout wave**. This is the same conflation, at the node the carve did not reach.
  Outside the write set; **recorded, untouched**.
- **R-4 · `docs/tranches/X/artefacts/W0/` was not written.** `waves/W0.md:360` banks
  `vl5-sites-open.txt` / `vl5-sites-close.txt` there, but that path appears in **no** unit's writable
  set (§File Bounds `:73–99` does not list it, and §Agent Units `:205` names only this file, the six
  sites and the ledger). Rather than write out of bounds, **both enumerations are carried in §5 of
  this file**, with the probe, the classification and the set-difference. The bounds gap itself is a
  spec finding, returned with the receipts.
- **R-5 · one dated anchor drift, recorded.** HG-17 cites `STATE.md:88`; the line resolves at
  **`:97`** (and repeats at `:102`). The record is generated and grows; the quoted sentence is
  byte-identical.

---

**Written by X-W0.i · Opus (`claude-opus-5[1m]`) · 2026-09-17 · branch `tranche-u`.**
Commit: `docs(x-w0/routing-law)` — the rewritten laws, the DAG node identifiers, the §0 alias and this
tombstone land as **one** commit, as §Commit Plan row 8 locks.

---

## §9 ADDENDUM 2026-09-17 — the post-commit re-measure (WRITE-THEN-MEASURE; §5 is not rewritten)

**E-3 posture.** §5's bytes stand as landed. This section corrects **one published figure** by reading
it back from the settled tree, and states the cause.

§5 projected **56** tracked files at the landed commit (55 measured before the carve's commit, + this
tombstone). Re-measured from the settled bytes at commit **`2012dbfa`**
⟨`git ls-files -z docs/ | xargs -0 grep -lI 'V·L5\|V\.L5' | wc -l`⟩ → **57**, double-run **57**.

| class | open | **post-commit** | Δ |
|---|---:|---:|---|
| law-bearing sites | 6 | **0** | −6 — this unit's act |
| frozen 7e28 copies | 20 | 20 | — |
| `codex-provenance` proofs | 2 | 2 | — |
| live V-tranche restatement/evidence + the ledger | 11 | 11 | — |
| X-tranche records | 22 | **24** | +2 |
| **total** | **61** | **57** | **−4** |

**The +2 is one file of mine and one that is not.** ⟨`comm -13 open post`⟩ names them exactly:

```
docs/tranches/X/W0/ROUTING-LAW-V-L5.md          <- this tombstone (mine, the sanctioned class)
docs/tranches/X/parse-that/waves/W0-CLOSE.md    <- written and tracked by the concurrent X·P (Track D) seat
```

⟨`git log --oneline -1 -- docs/tranches/X/parse-that/waves/W0-CLOSE.md`⟩ confirms it is not in
`2012dbfa`. **This unit added exactly one file to the census**, as §5 states; the denominator moved by
two because a sibling track was authoring during the same minutes — the same live-census effect
X-W0.a recorded as CR-2/CR-4 and X-W0.e re-measured at its own close. The projection was arithmetic
over a frozen set; **57 is the measurement**, and it is the figure a later sweep will reproduce.

⟨`comm -23 open post`⟩ is unchanged: **exactly the six law-bearing sites**, nothing else removed.
The validator re-run at the settled bytes is double-run identical and carries **0** `V.L5` node
identifiers ⟨`grep -c 'V·L5\|V\.L5' …/validate-constellation-dag.mjs`⟩ → **0**.
