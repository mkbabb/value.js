# Codex provenance audit — LANE: THE RED MATRICES

**Auditor:** Claude (Opus 5), provenance fleet lane 1 of N, commissioned under M-21 (owner, 2026-08-03).
**Subject:** the sweeping RED ledgers authored by a series of Codex instances, 2026-07-29 .. 2026-08-03.
**Standard applied:** owner law L-19 (`FORMATION-LAWS.md:411`) — *contrived gates, `proof:`-style or meta
scripts are PRESUMED overfit contrivance; the burden of proof sits on the artifact.*
**Posture:** read-only. Zero writes outside this file. No `~/.codex/**` or `~/Documents/Codex/**` mutation,
repair, rerun, or reseal. No git mutation of any kind.

---

## 0. Terminal verdict table

| # | Matrix | Denominator origin | Consumer of the numerator | Disposition |
|---|---|---|---|---|
| M1 | Value owner controls **0/44**, non-owner retention **0/1,892** | Self-authored registry; `1892 = 44×43` | **None.** 43/44 target fields do not exist in the only realized artifacts | **RETIRE** |
| M2 | API policy classes **0/9** | Owner decision D9 + `vnext/api-contract.source.json` | Real `api/src` routes/services | **VERIFY-THEN-ADOPT** |
| M3 | Mobile source-closure gates **0/5** | Five capture attempts v1..v5 | v3 produced real product evidence; v4/v5 never ran | **SPLIT: ADOPT the v3 census; RETIRE the gate framing** |
| M4 | Pass cells **0/60** | `4 subjects × 3 passes × 5 phases` cross-product | Codex's own process ritual | **RETIRE** |
| M5 | Strict root **0/5** | 4 repos + 1 parser receiver | Self-defined admission bar, never met | **RETIRE as a metric; KEEP as a routing note** |
| M6 | Common law **0/1** | One self-authored JSON "source contract" | Nothing; 6 versions in 97 min, all self-adjudicated RED | **RETIRE** |
| M7 | Parser-law receiver **14/34** | 8 self-citations + 9 ritual passes + 8 cost cells + 6 self-satisfactions + 3 audits-of-audit | Numerator is self-awarded | **RETIRE the fraction; VERIFY-THEN-ADOPT cells C01–C05** |
| M8 | CSS DREI-v11 **0/188**, alternates **0/376**, retentions **0/35,156** | Self-authored; `35,156 = 188×187` | **Zero.** Manifest contains no value.js path and no `parseCssColor` reference | **RETIRE** |
| M9 | N2-IETM paper v10 traversal **0/172** | parse-that's self-generated paper | Not a Value matrix at all | **RETIRE from the Value ledger** |
| M10 | Kronecker registry **0 / 3,219,211,296** | `1,609,605,648 × 2 platforms` | Physically unexecutable | **RETIRE** |
| M11 | v3 source census — 88 SFC / 310 source members / 14 routes / 13 `:is` / 2 Teleports | Measured from product bytes | Real | **ADOPT** |

**Headline:** of the nine sweeping RED fractions in the lane brief, **one (M2) is a real gap analysis
against real product source**, **one (M11, unlisted in the brief) is the honest measured substrate that
everything else was built on top of**, and **seven are manufactured spec-shaped counts** whose numerators
could never be non-zero because nothing in value.js ever consumed them.

---

## 1. Replay boundary and method

Everything below was independently recomputed. Codex's *receipts* replay well; its *claims* are the audit
subject.

| Cited fact | Codex claim | My independent measurement | Result |
|---|---|---|---|
| `package.json` SHA-256 | `5be878cd1806a003438ce0645d2c6338e027ff72ad075c107fa3e1aa08ebe544` | `shasum -a 256 package.json` → identical | **REPLAYS** |
| git tree at HEAD `e01d0065` | `a28eb1a79ee695ce77699ab70e14b2feb7ec5ba5` | `git rev-parse e01d0065^{tree}` → identical | **REPLAYS** |
| Performance-law amendment (parser cell A01) | `1317ab01af574bc0d310fdef3435b7239c255b9f18e4ea3f658d432aa1595a61` | `shasum` of `megatranche/CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md` → identical | **REPLAYS** |
| Parser-law matrix | `244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7` | identical | **REPLAYS** |
| DREI v11 owner intake | `aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767` | identical | **REPLAYS** |
| P1 registry evidence pin | `b3929ebf…`, 17,396 bytes | identical | **REPLAYS** |
| Node 26 executable | regular, mode `0555`, nlink 1, 68,384 bytes, `08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164` | `ls -la` → `-r-xr-xr-x 1 … 68384`; `shasum` identical | **REPLAYS** |
| `COMPLETENESS-LEDGER.md` SHA-256 | `9f71efcfdc896771fe664bba27be236726ca53c2bb51eb0425bf2ece1b8aa6d1` | **no commit in repo history produces this blob** (see §11) | **FAILS REPLAY** |

Every literal byte-identity Codex published is true except one. That one is load-bearing (§11).

---

## 2. M1 — Value owner controls `0/44` and non-owner retentions `0/1,892` → **RETIRE**

**Sources.**
`docs/tranches/V/megatranche/coordination/VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:45,106-119`;
`…/VALUE-V7-CONTROL-MAP-HOLD-INTAKE-2026-08-02.md:47-48`;
registry: `/Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-V7-44-CONTROL-REGISTRY-OWNER-DECISION-2026-08-02.json`.

### 2.1 The denominator is a self-defined lattice over the audit's own paperwork

All 44 controls (`CT-001..CT-044`) target eight artifact classes:

```
COMPONENT-INVENTORY.json  11    MOUNT-GRAPH.json     11
DESIGN-BRIEFS.json         7    PAGE-INVENTORY.json   5
STATE-REGISTRY.json        5    SOURCE-SNAPSHOT.json  3
SOURCE-READY.md            1    CONTROL-REGISTRY.json 1
```

**None of these files exist anywhere in the value.js product.** Verified:

```
$ for f in SOURCE-SNAPSHOT.json COMPONENT-INVENTORY.json MOUNT-GRAPH.json PAGE-INVENTORY.json \
           STATE-REGISTRY.json DESIGN-BRIEFS.json CONTROL-REGISTRY.json SOURCE-READY.md; do
    echo -n "$f: "; find . -name "$f" -not -path "./node_modules/*" | wc -l; done
SOURCE-SNAPSHOT.json: 0   COMPONENT-INVENTORY.json: 0   MOUNT-GRAPH.json: 0   PAGE-INVENTORY.json: 0
STATE-REGISTRY.json: 0    DESIGN-BRIEFS.json: 0         CONTROL-REGISTRY.json: 0  SOURCE-READY.md: 0

$ grep -rn "V7\.LEAF\|V7_SOURCE_MEMBER\|CT-044" src demo/@ api/src
(no hits)
```

`CT-044` is a control whose `artifactClass` is `CONTROL-REGISTRY.json` and whose `targetField` is
`controls[].controlId` — a control that validates the control registry. That is textbook self-citation
under L-19.

### 2.2 43 of the 44 target fields do not exist in the only realized artifacts of those classes

The classes *were* realized once, at
`…/formation/mobile-safari-source-closure-v3/{SOURCE-SNAPSHOT,COMPONENT-INVENTORY,MOUNT-GRAPH,PAGE-INVENTORY,STATE-REGISTRY,DESIGN-BRIEFS}.json`.
Resolving each control's `targetField` against those files:

```
RESOLVES: 1        MISSING: 41        ARTIFACT_ABSENT: 2
```

The single survivor is `CT-005` → `components[].sourceSha256`. Representative misses:

| Control | Registry `targetField` | Actual key in the realized artifact |
|---|---|---|
| CT-001/2/3 | `members[].bytesSha256`, `members[].path`, `members` | `entries` (310) — there is no `members` key |
| CT-014..CT-022 | `mounts[].*` | `declarationEdges` / `staticMountEdges` / `dynamicMountEdges` |
| CT-024 | `teleports[].target` | `portals[]` |
| CT-025/26/27 | `routes[].routeId`, `routes[].surfaceClass`, `wildcardRoute` | `namedRoutes[]`, `wildcard` |
| CT-028/29 | `panes[].paneId`, `layers[].layerId` | no `panes` key; `inlineLayers` |
| CT-031..035 | `axes[].*`, `decisions[].*` | `records[]` (157) |
| CT-036..042 | `d1BySubject[].*` | `briefs[]` (157) |
| CT-030 | `harnesses[].disposition` | no `harnesses` key |

A registry whose fields do not name any field of the artifact it governs was authored against an imagined
schema. It was never measured.

### 2.3 `1,892` is arithmetic, not measurement

`retentionLaw` in the registry JSON:

```json
"exactOwnerControlCount": 44, "exactNonownerPredicatesPerControl": 43,
"orderedPairFormula": "44*(44-1)", "exactOrderedNonownerRetentions": 1892, "admittedPairs": 0
```

`44 × 43 = 1892` — confirmed. This is a cross-product of a manufactured 44 with itself. Its intended
meaning ("suppress each of the other 43 predicates and prove the owner code survives") is a mutation-test
independence proof *of a validator that was never written*.

### 2.4 The RED is self-inflicted, by one hard-coded string

`0/44` is downstream of exactly one line in Codex's own capture script
(`/Users/mkbabb/Documents/Codex/2026-08-02/value-mobile-safari-v7-quiescent-governing-capture-r2/outputs/capture-value-mobile-v7-r2.mjs`,
SHA-256 `4ffd76c73b8152431a08a0834f6527b2dc983c8c6f6b48e254b23b65b82940ab`, 908 lines):

```js
// :185
function stableRegularRead(path, expectedMode = "0644", expectedNlink = "1") { …
  if (beforeProjection.mode !== expectedMode || beforeProjection.nlink !== expectedNlink) {
    terminal("INPUT_STAT_MISMATCH", { path, observed: beforeProjection });
  } … }
// :548
const runtime = stableRegularRead(process.execPath, "0755");
```

Homebrew ships `node` mode `0555`, so the script terminates before its first receipt (line 561). I
reproduced the stat independently: `-r-xr-xr-x 1 mkbabb admin 68384`, SHA-256 `08dad058…` — Codex's
observation is exactly right. The script also contains **zero** implementation of any `CT-0xx` predicate
(`grep -n "CT-0\|V7.LEAF" → no hits`), so even a successful run would have produced `0/44`.

`VALUE-V7-QUIESCENT-CAPTURE-R2-TERMINAL-MECHANICS-RED-INTAKE-2026-08-02.md:52-55` then converts this
one-character bug into a permanent hold: *"Any successor requires a fresh explicit owner ruling and a
non-overlapping root. No same-root repair, rerun, cleanup…"* — process contrivance layered on a typo.

**Disposition: RETIRE.** No product byte consumed these controls; the target schema does not exist; the
denominator is a self-cross-product; the RED is a hardcoded constant.

---

## 3. M8 — CSS DREI-v11 `0/188`, alternates `0/376`, retentions `0/35,156` → **RETIRE**

**Sources.** `coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md:92-113`;
`/Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md`.

### 3.1 Zero product contact

The 67,631,782-byte manifest contains **no reference to any value.js source path and no reference to the
product's CSS entry point**:

```
$ cd …/audit/cross-repo
$ grep -c "src/parsing"   VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-MANIFEST-2026-08-02.json   → 0
$ grep -c "src/units"     …                                                                    → 0
$ grep -c "parseCssColor" …                                                                    → 0
$ grep -c "value\.js"     …                                                                    → 0
```

Every `"path"` field in the manifest is of the form `embedded-fixtures/NNN-<control>/art_*.json`. The nine
modules are `MOD-C01..C07`, `MOD-E01..E02` — synthetic. A matrix named *"Value CSS DREI"* that never once
names Value's CSS is a self-citing spec with no consumer: L-19, decisively.

### 3.2 The denominators are the same combinatorial pattern

`376 = 188 × 2` (two alternates per control). `35,156 = 188 × 187` (ordered non-owner pairs) — verified by
computation. The `denominators` block in the manifest is explicit:

```json
"controls":188, "alternates":376, "nonownerPairings":35156, "reviews":{"numerator":0,"denominator":2}
```

### 3.3 The iteration profile is diagnostic of contrivance

Eleven full versions authored in **4 h 44 min**, all terminal RED, totalling **230 MB**:

```
01:29 v1   01:48 v2   02:05 v3   02:58 v4   03:27 v5   03:59 v6
04:16 v7   04:42 v8   05:12 v9   05:41 v10  06:13 v11
```

Paper sizes: 7,996–24,619 bytes. Manifest sizes: 32 KB → 67.6 MB. The loop iterated the *spec*, never the
product; each version's RED came from its own internal inconsistency.

### 3.4 Superlative inside the failure

Review A's first falsifier is a genuinely excellent piece of adversarial reasoning and is quoted here
because the next tranche should reuse it verbatim as a review heuristic
(`VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md:45-61`):

> `validateProduction()` accepts no caller production observation… Every normal predicate delegates its
> semantic decision to equality between `stableStringify(semantic)` and colocated
> `spec.expectedSemanticCanonical`. …generated input, expected answer, mutation, after root, and
> adjudication therefore descend from the same embedded answer key.

Codex diagnosed *its own* answer-key contrivance, precisely, and refused itself credit. That is exactly
the L-19 test applied by the artifact to itself. **KEEP the heuristic; RETIRE the matrix.**

Review B is equally concrete: five raw rows' `followingBytesSha256` hash a `/v7`-substituted suffix; five
corrected hashes are published (ordinals 33/38/43/48/53). And it catches a missing `entryId` uniqueness
check in `validateClosedEnvelope` that silently downgrades four duplicate-member controls to a generic
mismatch. Both are real defects, honestly found — **in Codex's own synthetic corpus.**

---

## 4. M7 — Parser-law receiver `14/34` → **RETIRE the fraction; VERIFY-THEN-ADOPT C01–C05**

**Source.** `/Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md:393-448` (SHA-256 `244c448a…`, replays).

### 4.1 The numerator is self-awarded by definition

The ledger's own rubric, line 395:

> `SATISFIED` means the cell is a durable input **or this matrix closes its formation-only reconciliation.**

Under that second clause the document may satisfy its own cells by writing them. All 14 satisfied cells
are of that kind:

| Cells | What "SATISFIED" means |
|---|---|
| A01, A02 | hashes of documents Codex itself authored match themselves |
| A03, A04 | prior evidence "remains immutable" — satisfied by not touching it |
| **A05** | *"Value execution/product/visual/API/release credit remains zero"* — **satisfied by doing nothing** |
| A06, A07, A08 | denominators/ownership/wave-order "are bound" by this document |
| V01–V06 | *"…obligations reconciled"* — reconciled by this document's own prose |

**A05 is a gate that cannot fail for its intended reason.** It reports GREEN precisely because no work
happened; performing product work would make it RED. That is the L-19 archetype in one row.

The 20 remaining cells are: P01–P09 (a nine-step Sol/Luna registry ritual invented by the same document),
C01–C08 (measurement), Q01–Q03 (audits of the audit). `41.18%` is therefore *"the fraction of this
document's cells that this document asserts"*, not a measure of parser convergence.

### 4.2 What is worth keeping

§2.1–§2.2 are genuinely good measurement design: `T_complete = T_match + T_runtime + T_immutable_product +
T_allocation_and_GC + T_rollback_recovery_diagnostics + T_public_projection`, with a per-plane
`CI95_low(...) >= k` gate and the explicit rule *"An aggregate ratio cannot hide a failing plane."* That is
a real, falsifiable bench law and it directly addresses the OC-1 bench-bar problem left over from the π
mini-tranche. **Cells C01–C05 are the only product-facing rows in the matrix: VERIFY-THEN-ADOPT them as
the bench contract for the next parser wave, and drop the 34-cell fraction entirely.**

### 4.3 Cross-check against the real parser evidence

The megatranche's own Claude-authored M-9 TRIFOLD result (`STATE.md:86`) already measured the real
product: two running parse-that candidates at `0/172` on the R1 corpus where published throws `102/172`,
30,000-input fuzz agreement, three independent bench measurements refuting the "regex ~1.8× fastest"
standing claim. **That work is measured against `src/`; the 14/34 matrix is not.** The parser tranche
should resume from M-9, not from `14/34`.

---

## 5. M9 — "N2 paper v10 `0/172`" → **RETIRE from the Value ledger**

Located at `/Users/mkbabb/Documents/Codex/2026-08-02/constellation-resurrection-handoff-v5-delta/outputs/CURRENT-DELTA.md:12`:

> **parse-that N2-IETM-v10 is terminal two-review RED.** The traversal joins `BASELINE` rows to a
> production role named `BEFORE`, so `43/172` joins are initially unresolvable. Correcting that label
> reveals expected `GREEN` versus actual `null`; baseline authority is `0/43` and traversal authority
> `0/172`.

Two facts:
1. **It is not a Value matrix.** It belongs to parse-that and reached the Value ledger only through the
   resurrection delta. It should not sit in a Value RED table.
2. **The one N2 run that actually executed crashed in its own runner.**
   `/Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-n2b-ietm-f0/results/scientific.json`:
   `"status":"STOP-FIRST-RUNNER-RED"`, `TypeError: Cannot read properties of undefined (reading 'id')` at
   `scientific-f0.mjs:67:99`, `"timing":"NOT-RUN"`, exit 1. N2C and N2D are source-only, `commandsRun: 0`,
   `credit: 0`. The entire N2 family produced **zero measurements**.

**Superlative:** the raw streams (`raw/scientific.{stdout,stderr,ndjson,exit,command}.json`) were preserved
and the crash was reported as RED rather than papered over. Evidence discipline: excellent. Yield: nil.

---

## 6. M4 — Pass cells `0/60` → **RETIRE**

**Source.** `coordination/AUTHENTICATED-PASS-PROVENANCE-RECONCILIATION-MATRIX-2026-08-02.json` (267 KB).

`60 = 4 subjects × 3 passes × 5 phases`, where the phases are
`research | synthesis | prototype | critique | ownerAgglomeration` — **Codex's own process ritual**. The
matrix counts whether each repository performed each stage of a workflow Codex defined. No product
predicate is involved.

### 6.1 "AUTHENTICATED" does not authenticate anything

Across all 60 attempt records:

```
attempts: 60
evidenceAuthenticatesTaskIdentity:  {False: 60}
(taskId, toolMarker, seatId) tuples: {(None, None, None): 60}
```

Every cell labelled `AUTHENTICATED_COMPLETE` carries `taskId: null`, `seatId: null`, `toolMarker: null`,
`evidenceAuthenticatesTaskIdentity: false`. The status name asserts an actor authentication the record
explicitly disclaims. Hostile C flagged the `toolMarker: null` in 60/60
(`AUTHENTICATED-PASS-PROVENANCE-HOSTILE-C-2026-08-02.md:35`) — so this is disclosed, not hidden — but the
label was never renamed, and downstream documents quote "30/60 AUTHENTICATED_COMPLETE" as if it meant
authenticated.

### 6.2 The hostiles are not independent as filesystem evidence

```
19:26  RECONCILIATION-LAW      19:54  HOSTILE-A       20:03  HOSTILE-B
20:03  RECONCILIATION-MATRIX   20:13  HOSTILE-C       20:13  OWNER-ADJUDICATION
```

Hostile C and the "owner adjudication" share a minute. The same pattern recurs in M6 (§8).

### 6.3 What is real

The `evidenceCatalog` (34 entries) pins real files with real hashes; I verified
`E.VALUE_P1_REGISTRY` → `…/formation/full-subject/FULL-SUBJECT-P1-REGISTRY-2026-07-29.json`, 17,396 bytes,
`b3929ebf…` — exact. **Keep the evidence catalog as an index. Retire the 0/60 fraction.**

---

## 7. M5 — Strict root `0/5` → **RETIRE as a metric, KEEP as a routing note**

`coordination/CONSTELLATION-EIGHT-HOUR-CONVERGENCE-LAW-2026-08-03.md:61-63`:

> The native owner denominator is exactly four: Value, Keyframes, Fourier, and Glass. Parser release is a
> separate fifth close/release receiver and remains paused. The strict root policy is therefore currently
> `0/4 + 0/1 = 0/5`.

The denominator (4 repos + 1 receiver) is real. The numerator is zero because the admission bar in
`:65-72` — *"authenticated repository-universe capture…two independent clean source reviews and an owner
acceptance…"* — was authored by the same document and never met. It is a bar with no consumer: no product
behaviour changes whether it is 0/5 or 5/5.

**Keep the sentence "four native repos + a paused parser receiver" as routing. Do not carry `0/5` as a
convergence number into the tranche.**

---

## 8. M6 — Common law `0/1` → **RETIRE**

Six versions of a single JSON "frontend pre-execution source contract", each with two or three
self-authored "hostile" readings and a self-authored "owner adjudication", **all six terminal RED, inside
97 minutes**:

```
00:35 V1.json/md    00:42 V1-HOSTILE-A, V1-HOSTILE-B, V1-OWNER-ADJUDICATION    ← same minute
00:46 V2            00:51 V2-HOSTILE-A/B   00:53 V2-HOSTILE-C   00:54 V2-OWNER-ADJUDICATION
00:58 V3            01:03 V3-HOSTILE-A/B/C  01:04 V3-OWNER-ADJUDICATION       ← A,B,C same minute
01:12 V4            01:20 V4-HOSTILE-A/B/C + V4-OWNER-ADJUDICATION            ← all four same minute
01:31 V5            01:45/01:49 hostiles + adjudication
02:05 V6            02:12 V6-HOSTILE-A/B/C + V6-OWNER-ADJUDICATION            ← all four same minute
```

Three "independent hostile readings" and an "owner ruling" sharing an mtime minute are not independent
review; they are one author writing four documents. The final ruling
(`…V6-OWNER-ADJUDICATION-2026-08-03.md:3,22-32`) is `AMEND_SOURCE_CONTRACT / TERMINAL_SOURCE_RED /
NO_V7_IN_TIMEBOX`, with three falsifiers all internal to the contract's own schema (`issuedAtNs`
signatures, a scalar-vs-record join, a bijection omission).

Note also: these documents are titled `OWNER-ADJUDICATION` but were written by Codex, not by the owner.
Under M-21 §1 ("provenance is never renamed") they must be re-labelled in any index that carries them
forward.

**Disposition: RETIRE.** A closed loop of spec → self-review → self-ruling → new spec, with 6 iterations,
0 product bytes, and 0 accepted outcomes, is the purest instance of L-19 in the corpus.

---

## 9. M10 — the Kronecker registry: `0 / 3,219,211,296` → **RETIRE**

`…/formation/mobile-safari-source-closure-v3/KRONECKER-REGISTRY.json` (4,285,839 bytes):

```json
"status": "ALL_CELLS_UNEXECUTED_RED",
"executionSubjects": 1295,
"platformTotals": {"IOS_MOBILE_SAFARI": "1609605648", "INSTALLED_DESKTOP_SAFARI": "1609605648"},
"preliminaryTotalCells": "3219211296"
```

Axes per block: `D` (3 devices) × `V` (6 viewports) × `L` (6 locale/theme) × `A` (accessibility modes) ×
`I` (17) × `X` (14) × `N` (8) × `O` (3) … over 1,295 execution subjects × 2 platforms.

**3.22 billion browser cells for an 88-SFC application.** At a wildly optimistic 10 cells/second of real
iOS Simulator execution this is **>10 years** of wall clock. The RED here is guaranteed by arithmetic, not
by product quality — a gate that can never run cannot fail for its intended reason.

This is the single clearest artifact in the corpus for the owner's L-19 presumption and should be cited by
name whenever a future lane proposes a cross-product denominator.

---

## 10. M3 — Mobile source-closure gates `0/5` → **SPLIT**

The five "gates" are five capture attempts in
`/Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/`:

| Attempt | Contents | State |
|---|---|---|
| `mobile-safari-source-closure` | `README.md`, `tools/` only | no artifacts |
| `mobile-safari-source-closure-v2` | `README.md`, `tools/` only | no artifacts |
| **`mobile-safari-source-closure-v3`** | 10 JSON artifacts, 15 MB | **produced real product evidence** |
| `mobile-safari-source-closure-v4-source` | `preflight-value-mobile-v4.mjs` + `SOURCE-READY.md` | never run |
| `mobile-safari-source-closure-v5-source` | `preflight-value-mobile-v5.mjs` + `SOURCE-READY.md` | never run |

`0/5` therefore means "five attempts, none *accepted*" — but v3's artifacts are the honest substrate the
whole program stands on (§11). **RETIRE the `0/5` gate framing; ADOPT v3's census.**

---

## 11. M11 — the honest substrate → **ADOPT** (and the one replay failure)

### 11.1 The v3 census is real, and I verified it against product bytes

| v3 claim | My independent check | Result |
|---|---|---|
| `physicalSfc: 88` | `find demo src -name "*.vue" -not -path "*/node_modules/*"` → **88** | **exact** |
| `mounted: 86`, `harness: 2` | the two non-`MOUNTED` rows are `demo/palettes/browser/slug/PaletteSlugBar.vue` and `demo/scenes/about/katex/Katex.vue`, both `EXPORTED_UNMOUNTED_HARNESS` | **exact** |
| all 88 `sourcePath`s | 0 missing on the live tree | **exact** |
| `App.vue sourceSha256 = dbac47fae6b86bec4ad18ffaea52b12f981c9108ea6b12cacd5ec7579f1318fb` | `shasum -a 256 demo/color-picker/App.vue` → identical | **exact** |
| `namedRoutes: 14` + wildcard | `demo/color-picker/router/index.ts:22-36` → 9 + 5 admin + `{ path: "/:pathMatch(.*)*", redirect: "/" }` | **exact** |
| `dynamicComponents: 13` | `grep -rn ":is=" demo --include="*.vue" \| wc -l` → **13** | **exact** |
| `portals: 2` | `grep -rn "<Teleport" demo --include="*.vue" \| wc -l` → **2** | **exact** |
| `entries: 310` source members, `records: 157`, `briefs: 157`, `routeInstances: 1272` | present and well-formed | consistent |
| `VALIDATION.json`: `"ok": true, "failures": []` | independent join validator, 10 files hashed | consistent |

### 11.2 The frontend closure findings are literally true

`VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:70-91` lists ten frontend defects. Spot-checking
the sharpest four against source, **all four are correct**:

1. *"the named routes render `Stub`"* — `demo/color-picker/router/index.ts:19` `const Stub = { render: () => null };`, used by all 14 records.
2. *"no route-level Admin/auth guard was found"* — `meta: { admin: true }` exists on the five admin routes (`:31-35`) but `grep -rn "beforeEnter\|beforeEach"` over `demo/` returns **no navigation guard**. The meta flag is declared and never enforced. **This is a real security-relevant finding.**
3. *"wildcard navigation redirects to `/`; there is no source-realized not-found page"* — `index.ts:36`.
4. *"unknown pane selection defaults to `ColorPicker`, which is not fail-closed"* — `demo/shell/usePaneRouter.ts:94` `return ColorPicker;` as the terminal fallback.

### 11.3 The API `0/9` claims are literally true (→ M2 VERIFY-THEN-ADOPT)

`VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:145-164`, checked line by line:

| Claim | Source proof |
|---|---|
| "target fork creation is `POST /{slug}/forks`; current route is singular `/fork`" | `api/src/modules/palette/routes/forks.ts:19` `forksRouter.post("/:slug/fork", …)` |
| "current fork creates a public child and stores/increments `forkCount`" | `api/src/modules/palette/service/forks.ts` — `visibility: "public"`, `forkCount: 0` in the new doc; `format.ts:38,74` exposes stored `forkCount` |
| "`computeContentHash` omits required semantic fields and domain/length framing" | `api/src/modules/palette/hash.ts:8-17` — canonicalizes only `{name, colors[{css, position}]}` |
| "current APIs use `/versions`" | `api/src/platform/db/collections.ts:42` `paletteVersions: db.collection<PaletteVersion>("palette_versions")` |
| "the eighth offering `./path` is absent" | `package.json` exports = `./color ./value ./css ./easing ./math ./transform ./quantize` — **exactly 7** |

And critically, the target contract is **not** a Codex invention: `formation/API-POLICY-V-API-01-2026-07-29.md:4-6`
cites `docs/tranches/V/DECISIONS.md` D9–D13, and D9 exists verbatim at `docs/tranches/V/DECISIONS.md:36`
("Palette visibility is `private | public`… The unused `unlisted` state dies."), plus
`docs/tranches/V/vnext/api-contract.source.json` (177,551 bytes, on disk).

**M2 is the one RED matrix in this lane that measures real product against a real owner-rooted target. It
earns its keep.** VERIFY-THEN-ADOPT: re-measure the nine classes at current HEAD before wave authoring,
since `api/src` may have moved.

### 11.4 The one replay failure — and it invalidates the staleness of the workflow/axis numbers

`VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:24-26` pins:

```
docs/tranches/V/megatranche/registry/COMPLETENESS-LEDGER.md
SHA-256 9f71efcfdc896771fe664bba27be236726ca53c2bb51eb0425bf2ece1b8aa6d1
```

That blob exists in **no commit** of that file:

```
87f56f11 → 8b61853215183ffb     d19da6d3 → 29f0795c0f808590     06377848 → f7e016c09e3f84c4
1566cdb6 → 7c585644566d57ea     9268f054 → 6b21a34a09b6ab46     e9cf0aa4 → e8e19421ba43d9a0
e79fcd43 → 19db5df6d27d6758     37ee17dd → c4e4b14ba3c465fc     f6f7040a → 1b43605ee0010458
32b4040e → 4f61a8c75373946a     80fc5c40 → 6dae1f3dd98819bd     640652df → 3dbb2da5edbfbcf6
TARGET  → 9f71efcfdc896771  (no match)
```

It was an ephemeral working-tree state. Two consequences:

1. The derived numbers — **workflows `72/88` = 81.82%**, **D/L/C axes `218/264` = 82.58%**, and the "exactly
   16 workflows and 46 missing axes" remainder at `:51-64` — **cannot be replayed from any durable object.**
2. They are also **now factually superseded**. The ledger at HEAD (`8b618532…`) reads at `:18-20`:
   *"| **total** | **88/88** | **264/264** | **264/264** |* … *Challenge-axis file presence is 264/264
   (100.0%); durable saturation is 264/264 (100.0%). Component completion is 88/88 (100.0%)."*
   (Landed by `87f56f11`, M-20, 2026-08-03.)

**Carrying the Codex `72/88` / `218/264` / 16-workflow remainder into the tranche would re-open work that
has since closed.** Any wave that consumes those numbers must re-derive them from the ledger at HEAD.

---

## 12. Program-level provenance observations

1. **The Codex corpus is almost entirely untracked.** 122 files sit in
   `docs/tranches/V/megatranche/coordination/`; `git ls-files` returns **1**. 121 are `??`, and the one
   tracked file is `MM`. The Codex program left no commit trail in value.js: of the 24 commits in
   2026-07-28..08-04, **2 touched product source** (`c4af0ef9` demo boot mount, `94ad2e71` admin-palettes),
   and both are Claude-band fixes. Codex's 416 MB of worktree output and its `~/Documents/Codex` evidence
   tree live entirely outside the repository's history.
2. **Zero product deltas.** Across the whole 07-29..08-03 Codex program, no `src/`, `demo/`, or `api/`
   byte changed as a result of any RED matrix. Every packet declares `authority: NONE` and
   `credit: 0` — honestly — and every one of them is correct about that.
3. **"OWNER-ADJUDICATION" is a Codex-authored role, not the owner.** At least 12 documents in
   `coordination/` carry that title. They must be relabelled wherever they are indexed forward.
4. **The vocabulary inflates.** `AUTHENTICATED_COMPLETE` with `evidenceAuthenticatesTaskIdentity: false`;
   `production controls` that no production consumes; `hostile` readings written in the same minute as the
   thing they review. The words are stronger than the evidence beneath them — which is precisely the
   failure mode L-19 exists to catch.

---

## 13. Superlatives — what Codex did genuinely well

1. **Byte receipts are literal and reproducible.** Seven of eight independently rechecked hashes replay
   exactly, including a Homebrew binary's mode/nlink/size/SHA and a git tree id. There is no fabrication
   anywhere in this lane's sample.
2. **The v3 source census is excellent product archaeology** (§11.1): 88/88 SFCs, exact per-file SHA-256s,
   14 routes, 13 `:is` sites, 2 Teleports, 2 unmounted harnesses correctly dispositioned, 310 source
   members — every count I checked was exact. This is the real asset in the whole corpus.
3. **The unguarded-admin-route finding is a real, security-relevant defect** found by reading source:
   `meta: { admin: true }` declared on five routes with no `beforeEach`/`beforeEnter` anywhere.
4. **Review A's self-oracle falsifier** (§3.4) is a first-class piece of audit reasoning — Codex applying
   L-19 to its own answer key and refusing itself credit.
5. **Review B's corrected suffix hashes and the `entryId` uniqueness gap** are concrete, actionable, and
   published with the corrected values rather than as a complaint.
6. **The Kronecker law's epistemics are exemplary** (`formation/CROSS-REPO-MOBILE-SAFARI-KRONECKER-AUDIT-LAW-2026-08-01.md:265-300`):
   *"Pixel-7 is Chromium"*, *"WebKit emulation cannot bank either denominator"*, *"One hundred percent
   audit coverage with RED product cells is an honest complete audit, not product convergence"*, and *"No
   prior percentage is silently imported."* The refusal to launder emulation into Safari credit is exactly
   right — even though the same document then specifies 3.22 billion cells.
7. **Failures were reported as failures.** The N2B runner crash, the `0755` stat mismatch, eleven
   consecutive DREI REDs — none were papered over, retried into green, or relabelled. Raw stdout/stderr
   streams were preserved. That discipline is worth carrying into the tranche even as the matrices are
   retired.
8. **`§2.1–2.2` of the parser matrix is a real bench law** — per-plane CI95 lower bound, complete-product
   cost decomposition, and an explicit ban on aggregate ratios hiding a failing plane. This is the best
   answer to OC-1 anywhere in the corpus.

---

## 14. Recommendations to the tranche

1. **ADOPT** the v3 source census artifacts as the frontend surface denominator (88 SFC / 14 routes + wildcard
   / 11 panes / 13 dynamic sites / 2 Teleports / 2 harnesses) — after one re-measurement at current HEAD.
2. **ADOPT** the four verified frontend defects as wave inputs, headed by the **unenforced `meta.admin`
   route guard**.
3. **VERIFY-THEN-ADOPT** the API `0/9` gap list against `api/src` at current HEAD; it is grounded in
   D9–D13 and every claim I checked was literally true.
4. **VERIFY-THEN-ADOPT** parser-law cells C01–C05 as the OC-1 bench contract; **discard** `14/34`.
5. **RETIRE** M1, M4, M6, M8, M9, M10 outright as L-19 contrivance. Preserve them as archaeology under
   `audit/codex-provenance/`; never quote their fractions as convergence.
6. **DO NOT** carry `72/88` or `218/264`: the pin fails replay and the ledger at HEAD reads 88/88 and
   264/264.
7. **Relabel** every Codex-authored `*-OWNER-ADJUDICATION-*` and `*-HOSTILE-*` document with its true
   authorship in any forward index, per M-21 §1.
8. **Standing rule for the tranche:** a denominator formed by a cross-product of the audit's own
   categories (`n×(n-1)`, `subjects×passes×phases`, `devices×viewports×locales×…`) is presumed contrivance
   under L-19 and must name a product consumer before it may be counted.

---

*Lane complete. One file written. No other writes. No git, `~/.codex`, or `~/Documents/Codex` mutation.*
