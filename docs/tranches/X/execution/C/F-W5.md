SERVED MODEL: claude-opus-5[1m]

# F.W5 — execution record (Track C · X·F) — the shared-provenance API contract (ADMISSION KEYSTONE)

Spec: `docs/tranches/X/fourier/waves/F-W5.md` (IMMUTABLE, E-3) · order `docs/tranches/X/EXECUTION-RUNBOOK.md`
§1.3 · seat law §5 · locks §3.4 · owner rulings `docs/tranches/X/COHESION.md` §0i + §0j.
Ledger row: `docs/tranches/X/execution/LEDGER.md` Track C.

---

## Open

**Opened 2026-09-17 (seat 0, OPEN) on the owner's begin-word** (verbatim at COHESION §0j). Base: value.js
`tranche-u`, HEAD at open `6d4221c5`. `../fourier-analysis` is **READ-ONLY** for this wave — F.W5 writes
**zero fourier bytes** (§1b); every fourier-side witness below is a read (`grep`/`sed`/`ls`), which is what
the runbook §5.5 permits and what D-19 MEASURE-AT-OPEN requires.

### Preconditions — verified at the bytes AND in the ledger

The spec's §0 State `Opens after` names three, and the runbook §1.3 adds the edge reason (`F.W0 → F.W5 (NOT
F.W1)` — *"the ADMISSION KEYSTONE is not downstream of the uplift — it runs beside it"*).

| # | condition (spec §0 `:35`) | measured | verdict |
|---|---|---|---|
| 1 | **F.W0** (substrate pre-gates — HARD, §4 X-1) | LEDGER Track C row: **CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))**, close commits `98ed52c8` · `368ae6bb`, both repos pushed; record present — ⟨cmd⟩ `ls -l docs/tranches/X/execution/C/F-W0.md` → `201477` bytes, Sep 17 16:00 | **MET** |
| 2 | the **intake adjudication** (§3 F.W5 + §2 C-3) — an adjudication record, not a carry ledger (R-3) | ⟨cmd⟩ `ls -l docs/tranches/V/megatranche/audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` → `27538` bytes | **MET** |
| 3 | the adjudicated fourier registry **whole (66/66)** | ⟨cmd⟩ `R=docs/tranches/V/megatranche/registry/adjudicated; ls "$R"/fr-*.md \| wc -l` → **66**, double-run (66 · 66) | **MET** |
| 4 | *(census freeze, runbook §5.4/§5.6)* the frozen canonical is the sole census operand | ⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` → **`f443627574581ec2a413…`** — character-match to the spec's pinned `f44362757458`; ⟨cmd⟩ `grep -nE '^### F\.W5(-W8)? — ' CENSUS-CANONICAL.md` → `5078:### F.W5 — **27 rows**` · `5092:### F.W5-W8 — **89 rows**`; **27 + 89 = 116** | **MET** |

**Owner-gated items — RULED, never presumed.** Four gates carry ⊙ (G4, G7, G10, G11) and §2a lists nine
rulings owed. All are ruled at **COHESION §0j.D** under the 2026-09-17 delegation; this seat cites, and
re-opens nothing:

| spec item | §0j.D ruling id | the ruling, as written |
|---|---|---|
| **G4 / §2a R1 / clause E3** (TA-4 diff-clause) | **F-SS4REST R1** | **RE-SCOPE value.js out of the diff clause** — a one-sided §6 verdict, stated explicitly; `atomdiff.ts` stays wholly excised |
| **G7 / §2a R2 / clause E16** (trie) | **F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1)** | **NO TRIE**; whole-snapshot duplication is the recorded shipped behaviour; `atomdiff.py:12-14` is the guardrail |
| **G10 / §2a R4 / clause D2** (the like verb) | **F-SS4REST R4** | **REMOVE the affordance** (no dead affordance under `aria-pressed`) |
| **G11 / §2a R3 / clause D3** (moderation producer-or-retire, THE ADMISSION GATE) | **F-PRODRET (R3 ≡ D3 ≡ G11)** | **PRODUCER**, as a **port** of value.js's shipped verb (`POST /:slug/flag`) under the SS-4 contract, homed at **F.W8**, **with F.W5 writing the clause**; FR-AFP grades re-derive at the populated surface |
| §2a **R5** (off-state `[]`, D12) | F-SS4REST R5 | **STOP MINTING** the off-state `[]`; the contract does not admit it |
| §2a **R6** (hard-delete arm, D6) | F-SS4REST R6 | **KEEP** the arm; copy made truthful about irreversibility |
| §2a **R7** (codegen vs twins, A4) | F-SS4REST R7 | **CODEGEN** — twins derived from one source; inv-16/inv-26 restated |
| §2a **R8** (remix-vs-fork + born visibility, E4) | F-SS4REST R8 | **REMIX + BORN-PRIVATE**, the F.W5 seat **verifying non-contradiction with ruling D9 at the record before authoring** |
| §2a **R9** (dead session subsystem, C3) | F-SS4REST R9 | **DELETE** (zero external call sites) |
| OG-F1 / OG-F2 | §0j.D | OG-F1 FREEZE-WITH-ADOPTION; **OG-F2 CODEX-ERA-SPECIFIC** — the pre-write root-absence-receipt requirement died with M-15's abrogation; the *finding* (the absence, TRUE) stays adopted |

**G11 back-edge honoured**: runbook §1.3's edge row *"F.W5 G11 → F.W1 sizing"* — the ruling **PRECEDES
F.W1's sizing**; it is ruled (F-PRODRET) before this wave opens, so F.W1 is unblocked on that axis the
moment unit c lands D3's clause.

### E13 Step-0 — the four-path mail sweep (runbook §5.3)

Swept read-only at this seat's own clock (**2026-09-17 16:05 EDT**) and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification taken from each row's **status cell**, never from a
bare `grep -i unread` (X.P.W0 CHECK 1 D-1).

1. `docs/tranches/V/` (10 `.md`) + `docs/tranches/V/coordination/` (17 entries) — `INBOX.md` self-excluded
   (SELF-COUNT law). Newest non-self `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 = **ours**
   (O-21's retained outbound copy, rowed at I-26 → CURED); the two July back-fills@12:54 also ours.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**
   ⟨cmd⟩ `ls -1dt ../glass-ui/docs/tranches/*/ | head -4` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/`. 4 files;
   newest `glass-outbound-2026-08-29-valuejs-o20-ack.md`@Aug 29 16:41 = **I-30, rowed**. Nothing newer.
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 files + `vnext/`; newest
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`@14:58 = **ours, outbound** (KF.W1.b's delivery).
   The dir's uniform 2026-09-17 mtimes are OP-1's absorption artefact — **named, not tripped**.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 29 files, newest@Aug 3 15:01
   (`valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours). **4b** atlas `Q/coordination/`
   also swept (the I-27/I-31 minuted path) — newest `ATLAS-TO-VALUE-2026-08-03-RULINGS.md`@Aug 3 15:06 =
   **I-27, rowed**.

**Result: 0 unrowed letters · 0 new `I-n` minted · 0 UNREAD in F.W5's scope.** Status-cell scan over the
ledger's **33** `| I-` rows: **zero** carry `UNREAD` as their status — `I-31` was **FOLDED 2026-09-17** at the
X-W0 close and `I-30` reads **ROWED 2026-08-30**; every other literal `UNREAD` in the file is law text
(`:4`, `:5`, `:23`, `:33`) or a prior sweep line. A dated sweep line is appended at the ledger's end; **no
existing row was rewritten** (append-only, §1a).

---

## Baseline — the 22 gates of §3, run READ-ONLY before any cure (R.2)

Bases as §0 of the spec assigns them: `R=docs/tranches/V/megatranche/registry/adjudicated` ·
`X=docs/tranches/X/fourier` · `V=/Users/mkbabb/Programming/value.js` ·
`F=/Users/mkbabb/Programming/fourier-analysis` (READ-ONLY, always). Engine named where the result is an
engine fact (R4-2/R4-7.1): `/usr/bin/grep` (BSD) unless stated.

| # | gate | BEFORE (this seat, 2026-09-17) | verdict |
|---|---|---|---|
| G1 | identity on the wire | ⟨cmd⟩ `grep -rn "class AuditEntry" $F/api --include='*.py'` → **one hit**, `api/models/admin.py:94` | RED-AS-EXPECTED |
| G2 | version-identity collision (V-β) | `$V/api/src/modules/palette/hash.ts:8` → `computeContentHash(name, colors)` folds **`{name, colors}` only**; `repository/paletteVersion.ts:14` → `findOne({ _id: hash })` — **no slug scope**; `:47` → `if (existing) return version._id;` (the early return) | RED-AS-EXPECTED |
| G3 | chain depth (F-α) | ⟨cmd⟩ `grep -rn "_write_root_version" $F/api` → **3 hits**, `routers/visualizations.py:110` (def) `:220` `:592` — def + create + remix, the ONLY writer | RED-AS-EXPECTED |
| G4 ⊙ | diff-clause participation (TA-4) | ⟨cmd⟩ `grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` → **ONE** hit, `__tests__/palettes-forks.test.ts:9` (the comment naming TA-4 as the excision); ⟨cmd⟩ `ls $V/api/src/lib` → *No such file or directory* | RED-AS-EXPECTED (ruled RE-SCOPE, §0j.D F-SS4REST R1) |
| G5 | born-visibility of the derived variant | `$V/api/src/modules/palette/service/forks.ts:76` → `visibility: "public",` **hard-coded** (line number reproduces exactly); fourier's remix child born `draft` is MEASURE-AT-OPEN at F.W0's re-grounded substrate | RED-AS-EXPECTED |
| G6 | redaction parity (F-γ / R-6) | value collapses: `service/forks.ts:179` `\| { kind: "unavailable"; ordinal: number }` and `:197` `chain.push({ kind: "unavailable", ordinal })`; fourier ⟨cmd⟩ `grep -rn "_readable_or_none" $F/api \| wc -l` → **5** (entry-row only) | RED-AS-EXPECTED |
| G7 ⊙ | trie disposition (R-4) | the spec's spelling ⟨cmd⟩ `grep -rniE "trie\|prefix.?tree\|radix\|patricia\|structural.?sharing\|delta.?compress" $F/api $F/web/src $V/api/src $V/src \| wc -l` → **150 lines, every one a substring artefact** (`entries`, `Tries`, `retries`, `retrieval`); the **token-bounded** re-run ⟨cmd⟩ `grep -rniwE "trie\|prefix.?tree\|radix\|patricia" …` → **0** = the spec's stated *"ZERO true hits on BOTH trees"*. Guardrail live: ⟨cmd⟩ `sed -n '12,14p' $F/api/lib/crud/atomdiff.py` → *"KISS guardrails … the atoms are a flat BAG (not a tree / Merkle / document) … there is no three-way / DAG / merge."* | RED-AS-EXPECTED, with **divergence D-1** (below) |
| G8 | security documentation (R3-7b) | ⟨cmd⟩ `grep -rn "def save_contour" $F/api` → `routers/contours.py:22` `async def save_contour(req: SaveContourRequest):` — **no `Depends`/`Header`/`Request` parameter** | RED-AS-EXPECTED |
| G9 | client-gap closure (R3-7c ⊕ X-3) | `$F/web/src/lib/api.ts` exists; ⟨cmd⟩ `grep -rn "visualizations" $F/web/src/lib/api.ts \| wc -l` → **23**. The 36/9 and 7-of-13 figures are MEASURE-AT-OPEN and are the **register's** work (unit a), under counting-lock **K-1: read against 13/44, never zero; cite 45 = 30+13+1+1** | RED-AS-EXPECTED |
| G10 ⊙ | the like verb | ⟨cmd⟩ `grep -rniE "def .*like\|/like" $F/api/routers/ \| wc -l` → **0** (no like route anywhere); sort key ships: `api/lib/crud/cursors.py:17` `SortKey = Literal["newest","popular","most-forked","views","likes"]`, `:22` `"likes": "likes"`; `$F/web/src/stores/gallery.ts:195` → `const liked = true;` | RED-AS-EXPECTED (ruled REMOVE, §0j.D F-SS4REST R4) |
| G11 ⊙ | moderation producer-or-retire — **THE ADMISSION GATE** | ⟨cmd⟩ `grep -rn "FlagRequest" $F/api $F/web/src` → **exactly one hit, the definition** `api/models/admin.py:57` — **referenced nowhere**; value.js **HAS** the verb: `$V/api/src/modules/palette/routes/flags.ts:4` *"POST /:slug/flag — flag a palette for admin review."*, wired at `routes/index.ts:38` | RED-AS-EXPECTED (ruled PRODUCER-as-port, §0j.D F-PRODRET) |
| G12 | unsafe GET / counter provenance | `$F/api/routers/visualizations.py:269` → `{"slug": slug}, {"$inc": {"views": …}}` on the read path | RED-AS-EXPECTED |
| G13 | cache identity ⊇ consumed fields | ⟨cmd⟩ `grep -rn "extraction_cache_key" $F/api \| wc -l` → **10**; ⟨cmd⟩ `grep -rn "ml_threshold" $F/api \| wc -l` → **3** — the key literal and the thresholds are disjoint surfaces | RED-AS-EXPECTED |
| G14 | contour provenance | `$F/api/routers/contours.py:25` → `store_contour_asset(xs, ys, req.image_slug, source="ed…` — the editor path carries `source="editor"` and **no `extraction_cache_key`** | RED-AS-EXPECTED |
| G15 | image bounds on write | `store_contour_asset` defined `$F/api/services/image_storage.py:285`, called at `routers/contours.py:25` (POST, **no `image_bounds`**) and `routers/images.py:261`; ⟨cmd⟩ `grep -rn "image_bounds" $F/api \| wc -l` → **29** | RED-AS-EXPECTED |
| G16 | canonical-geometry provenance — TRIPWIRE | the artifact is live and tracked: ⟨cmd⟩ `find $F/web -name 'moon.json' -not -path '*/node_modules/*'` → `web/src/assets/fourier-paths/moon.json` (one). **DO-NOT-REGENERATE on `master` stands**; the 3.7% / p90 37.6 / bbox figures are the record's, not re-derived here | RED-AS-EXPECTED |
| G17 | boundary-validation evenness | ⟨cmd⟩ `grep -rn "await res.json()) as" $F/web/src \| wc -l` → **1** — the single unchecked cast the whole 45-operation client surface lands through (FR-CP-16) | RED-AS-EXPECTED |
| G18 | casing + envelope isomorphism | unrunnable-as-parity by construction: value.js has **no diff surface to conform** (G4's ONE comment hit), so the verdict must be one-sided — which §0j.D F-SS4REST R1 now makes explicit | RED-AS-EXPECTED |
| G19 | **census closure** | LHS present and frozen: canonical `f443627574581ec2a413…`, ⟨cmd⟩ `grep -nE '^### F\.W5(-W8)? — ' CENSUS-CANONICAL.md` → **27** ⊕ **89** = **116**. **RHS empty**: ⟨cmd⟩ `ls $V/docs/tranches/X/fourier/contract/` → *No such file or directory* (double-run) | RED-AS-EXPECTED (born-RED **because the RHS is empty**) |
| G20 | co-signature actually relayed | ⟨cmd⟩ `ls $V/docs/tranches/X/coordination/` → **exactly one file**, `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` (double-run, count **1**) — no relay letter, no INBOX row | RED-AS-EXPECTED |
| G21 | the register is a FILE, not prose | ⟨cmd⟩ `ls $V/docs/tranches/X/fourier/contract/` → *No such file or directory* — `operation-register.md` does not exist | RED-AS-EXPECTED |
| G22 | dangling-cite resolution | ⟨cmd⟩ `grep -rn "MF-9" $V/docs/tranches/V/megatranche/registry/adjudicated/` → **exactly ONE hit** (double-run), `fr-GalleryCardModal.md:56` — the dangling citation inside GCM-10's own cure | RED-AS-EXPECTED |

**Tally: 22 gates · 22 RED-AS-EXPECTED · 0 GREEN-BEFORE-CURE · 0 UNRUNNABLE · 1 DIVERGENCE (form, not
substance).**

**D-1 (divergence, minuted, no ruling asked).** G7's witness **as spelled** is an unbounded `-i` ERE and
returns **150 matching lines**, not zero; its *substance* — *"ZERO true hits on BOTH trees"* — reproduces
only under a token-bounded re-run (**0**). This is the exact instrument defect the spec's own §2 detector
law names (*"token-bounded, never bare-substring"*, and *"a probe that returns zero for everything has
proved nothing"*), committed in its own §3 cell. Recorded here as a **reading correction, not a spec edit**
(E-3: the spec is immutable; this is the addendum-beside). The gate's verdict is unchanged, and F-TRIE's
ruling (NO TRIE) rests on the corpus fact the bounded probe measures, plus `atomdiff.py:12-14`.

**Note on born-RED honesty (R.2).** No gate in this wave can be GREEN before its cure: nineteen are RED on
*fourier/value product facts* whose close is a **clause in a document that does not exist**, and the
remaining three (G19 · G20 · G21) are RED on the **non-existence of the four artefacts this wave creates**
(⟨cmd⟩ `ls …/contract/` → No such file or directory; ⟨cmd⟩ `ls …/coordination/` → 1 file). Nothing is
inherited: every figure above was taken at this seat's own clock.

---

## Unit plan — 5 units, **strictly serial**, one writer on clean `tranche-u`

**Agents line (§0 State, binding):** *"5 **serial** — units b/c/d all write `J-diff-shape-v2.md`; §1c forces
sequencing, never parallelism."* **Peak concurrency 1.** No worktree plan (§1c heading: *"no worktree plan —
one writer on clean `tranche-u`"*).

**Order:** `a → b → c → d → e`, **each unit committing before the next opens**; *"a dirty tree at handoff
halts the wave"* (§1c). Groups: `[a] [b] [c] [d] [e]`.

**Model tiering (M-12, runbook §5.1):** a·b·c·d = **Opus** (mechanical/challenge seats — censuses, registers,
clause authoring against measured witnesses). **e = Fable**, because §1c names it *"fresh adjudicator seat"*
and it runs the wave's adjudications (G19 set-difference, G22 strike-or-resolve) and the relay.

**Writable set — the six §1a paths, nothing else.** Any write outside them is an ESCALATION (runbook §5.7).
Product source in both repos, `$F/**`, `lane-crud.md`, `INTAKE-ADJUDICATION-2026-08-03.md`,
`api-gap-remeasure.md`, `registry/adjudicated/fr-*.md`, `COHESION.md` and `scripts/dev/dev.sh` are §1b
**DO NOT TOUCH**. Each unit additionally appends **its own receipt** to this record (execution apparatus,
runbook §1) and no other seat's rows.

**Standing locks binding every unit**

- **Census freeze** — `CENSUS-CANONICAL.md` @ `f44362757458` is the sole census operand; **`162`, `167`,
  `170` are superseded and inadmissible**; no check file, no pass index, no §-arithmetic of the spec's own.
  **No `F-W5-CARRY.md` may be authored** (R-3.2).
- **Record-qualification (R-5/U-12)** — every id carries its record; a bare `M-10`/`K-n`/`C-7`/`R-7` may not
  enter a set-difference at either end; the declared collider roster is §2's (U-12 eight ⊕ `M-10` ⊕ `M-9` ⊕
  `C-7` ⊕ `C-3` ⊕ `R-7` ⊕ `R6-8` ⊕ `i-7` ⊕ `C:C-12` ⊕ `C-6` ⊕ `C-5` ⊕ `L-B2` ⊕ record-local `K-n`).
- **One home, two citations** — F.W5 books or cites; it repairs nothing (§0b), and double-booking an
  F.W4/F.W9/F.W10-held id is a defect (the seven §2c exclusions stay excluded).
- **Third-iteration halt (triumvirate)** — the register disagreeing with the 45/30/13 triple a third time ·
  a `(record, id)` pair of the canonical band failing to home three times · MF-9 failing to resolve (then it
  is **STRUCK** and v2 quotes GCM-10's cure without it).
- **Commits** — pathspec only, one commit per meaning, `dev.sh` never staged; `--no-verify --quiet` with the
  `Claude-Session:` trailer. Other seats are writing this tree concurrently: **stage exact paths, never `-A`.**
- **E-3** — the spec, the registry, the canonical and F.W0's artefacts are immutable; corrections are dated
  addenda in **this** record.

| unit | model | spec sections executed | writes | gates it must turn |
|---|---|---|---|---|
| **a** | opus | §1a `:62-76` (bounds) · §1c `:89` (unit a row) · §3 **G21** `:383`, **G8** `:370`, **G9** `:371` · §2 clause tables §A–§G `:137-244` (the operations they name) | `docs/tranches/X/fourier/contract/operation-register.md` (create) | **G21** (primary) · **G8** (authority class per row) · **G9** (client-edge disposition per row) |
| **b** | opus | §2 **§A** `:137-147` (A1–A6) · **§B** `:148-157` (B1–B5) | `docs/tranches/X/fourier/contract/J-diff-shape-v2.md` (create) | **G1** · **G17** (A3 evenness) · the casing limb of **G18** (A2 envelope) |
| **c** | opus | §2 **§C** `:158-167` (C1–C5) · **§D** `:168-190` (D1–D17) · **§E** `:191-215` (E1–E20) | `J-diff-shape-v2.md` (append §C/§D/§E) | **G8** · **G2** (E1) · **G3** (E2) · **G4/E3** · **G5** (E4) · **G6** (C5) · **G7/E16** · **G9** (D1) · **G10** (D2) · **G11** (D3) · **G12** (E6) · **G13** (E13) · **G14** (E14) · **G15** (E17) · **G18** (§6 one-sided verdict) |
| **d** | opus | §2 **§F** `:216-229` (F1–F9) · **§G** `:230-244` (G1c–G10c) · the value-side obligation list | `J-diff-shape-v2.md` (append §F/§G + obligations) | **G16** (G1c ⊕ G5c) · the F-band envelope clauses (F5) |
| **e** | fable | §2a `:245-258` · §2b `:259-262` · §2c `:263-354` · §3 **G19** `:381`, **G20** `:382`, **G22** `:384` · §4 `:388-409` · §5 `:410-424` · §6 `:425-433` | `contract/OWNER-RULINGS-F.W5.md` (create) · `docs/tranches/X/coordination/value-to-fourier-cosign-J-diff-shape-v2.md` (create) · `docs/tranches/V/coordination/INBOX.md` (**append-only**) | **G19** · **G20** · **G22** |

### Briefs

**a — the operation register.** Create `contract/operation-register.md`: **45 rows = 30 + 13 + 1 + 1**, one
row per operation, each carrying an **authority class** (R3-7b, G8) and a **client-edge disposition**
(R3-7c, G9: clientable / struck / deliberately server-only). Counting lock **K-1: read against 13/44, never
zero; cite 45 = 30+13+1+1** — K-1's prefixed-router blindness is the known trap. Re-measure the client
surface at open (D-19) from `$F/web/src/lib/api.ts` and `$F/api/routers/`; the 36-edges/9-gap and
7-of-13 figures are measured, never inherited. G8/G9/G19 **grep this file** — without it they are prose
(G21). Register disagreeing with the triple a **third** time = triumvirate halt. Commit, then open b.

**b — v2 §A + §B.** Create `contract/J-diff-shape-v2.md` as **the neutral co-signed contract** (v1 in the
fourier tree is IMMUTABLE; v2 supersedes **by reference**, never edits it — E-3). Author **§A** A1–A6 (A1
row identity on the wire → G1, **books nothing, cites**; A2 envelope + cardinality ruled once; A3
boundary-validation **evenness** → G17, *evenness is the clause, not paranoia*, and **no per-field
defensive sweep at F.W4**, L-19; A4 one contract source under **R7 = CODEGEN**, inv-16/inv-26 restated;
A5 no untyped operations; A6 credential transport, both ends) and **§B** B1–B5 (the R6-8 join relation
forward and mirror ‡, wrapper types re-derived FROM the router, the LIVENESS predicate, and B5's negative
controls — **EVIDENCE, never a denominator**). Preserve every clause id verbatim; a sibling's mis-keyed
cite is conformed **at the sibling** (R-1e). Commit before c opens.

**c — v2 §C + §D + §E (the largest unit).** Append §C (C1 authority class per operation → G8; C2 image
remediation as ONE unit; **C3 = R9 DELETE the dead session subsystem**; C4 retry/limiter posture; C5
redaction parity → G6), §D (D1 per-operation disposition keyed to the register → G9; **D2 = R4 REMOVE the
like affordance** → G10, *no third option ships*; **D3 = R3 PRODUCER-as-port of value.js's `POST
/:slug/flag`, homed F.W8** → G11, the ADMISSION GATE, **this clause is F.W5's own act** and it precedes
F.W1's sizing; D4–D17 incl. **D6 = R6 KEEP the hard-delete arm** and **D12 = R5 STOP MINTING the off-state
`[]`**), and §E (E1 compound per-entity version `_id` → G2; E2 deepen-or-retire → G3; **E3 = R1 RE-SCOPE
value.js out of the diff clause, §6 re-authored to an explicit one-sided verdict** → G4 ⊕ G18; **E4 = R8
REMIX + BORN-PRIVATE, verifying non-contradiction with ruling D9 at `docs/tranches/V/DECISIONS.md` §2 row
D9 BEFORE authoring** → G5; E6 → G12 with the **FR-GV-24 lock: repair tests must NOT assert a re-open
increment**; E11 records the RESOLVER/EasingPicker merge with **both ids preserved**; E13 states the cache
superset clause **ONCE, verbatim at record case** → G13; E14 → G14; **E16 = R2 NO TRIE** → G7, dissent
recorded; E17 → G15). Commit before d opens.

**d — v2 §F + §G + the value-side obligation list.** Append §F F1–F9 (partial projection ‡; **one shared
bound constant** — `fr-EquationView K-13` and `fr-ConvergencePlot K-13` are **two different records' kills**
and every `K-n` carries its record; the error envelope actually spoken; F7's missing original-expression
field; F8 the portable-LaTeX seam choice) and §G G1c–G10c (G1c the moon's true source ‡ **TRIPWIRE** and
G5c the diagnosed result type — **both together are G16's close**; **DO-NOT-REGENERATE on `master` stands,
any regeneration revives L-B1 and L-B2/C-2 at BLOCKER**; G3c closure carried never inferred; G9c the guards'
wrong predicate, twice). Then the **value-side obligation list**: every value.js act v2 asks for, each
handed on with **one home and two citations** — F.W5 claims credit for none (FR-GIG-5's bar). Commit.

**e — rulings, relay, closure (fresh adjudicator, Fable).** (1) Create
`contract/OWNER-RULINGS-F.W5.md`: the inline ruling block SS-4 requires — R1…R9 each quoted from **COHESION
§0j.D** with its ruling id (F-SS4REST · F-TRIE · F-PRODRET), plus §2b's **dissent register preserved, not
resolved**. (2) **G22**: resolve or **STRIKE** MF-9 before v2 quotes GCM-10's cure (measured: one hit,
`fr-GalleryCardModal.md:56`, the dangling cite itself), and record the E11 merge in v2's provenance. (3)
**G19**: run the set-difference **both directions**, once per id, over the **canonical band alone** (27 ⊕ 89
= 116, record-qualified) ↔ §2's clause tables ⊕ §4's cited cross-edges ⊕ §5 — the **seven exclusions stay
excluded** (`AA-48` · `P-9` · `AA-44` · `SS-L-07/SS-C-10` · `AA-45`/`AA-46`/`AA-47`); **∅ in both
directions or halt** (third failure → triumvirate). A row in neither side is a **SILENT DROP**. (4)
**G20**: write `coordination/value-to-fourier-cosign-J-diff-shape-v2.md` — the only vehicle by which
fourier receives v2 — declaring **this end** of every §4 cross-edge and **requesting** the reciprocal
(COHESION is §1b-excluded; F.W5 does not write the spine). (5) Append **one** E13 row to
`V/coordination/INBOX.md` (append-only; no existing row rewritten) and re-sweep the four paths at close —
**no wave closes with UNREAD mail**. Then write the close section of this record.

---

## Unit receipts

### a

**SERVED MODEL: claude-opus-5[1m]** · seat opened 2026-09-17, HEAD at open `353fa9d1`, branch `tranche-u`.
Writable set honoured: **one file created**, `docs/tranches/X/fourier/contract/operation-register.md`,
⊕ this receipt. Zero fourier bytes written (`$F` read-only: every fourier command below is
`grep`/`sed`/`awk`/`ls`). `scripts/dev/dev.sh` never staged.

**Serial-head note (§1c).** The tree at open carried four rows from **other tracks** — `X·P`'s
`parse-that/waves/W1-CLOSE.md` (staged by that seat) and three `X·KF` `KF-W4` evidence files, plus the
standing `CARRY-LEDGER.md` and the unowned `dev.sh`. **None is in F.W5's writable set**, so F.W5's own
serial head is clean and the *"dirty tree at handoff halts the wave"* condition is not tripped by another
track's concurrent work. At this unit's close the F.W5 writable set is **clean** (⟨cmd⟩
`git status --porcelain | /usr/bin/grep -c 'operation-register'` → **0** after commit).

#### Acts, in order

**a.1 — MEASURE-AT-OPEN (D-19), before a byte was written.** Every fourier figure re-measured at this
seat's own clock from `$F = /Users/mkbabb/Programming/fourier-analysis`, never inherited. Engine named
(`/usr/bin/grep`, BSD) because the results are engine facts. All double-run, `run1 ≡ run2`:

| figure | ⟨cmd⟩ | reading |
|---|---|---|
| router-level operations | `/usr/bin/grep -rE '^@[a-z_]*router\.(get\|post\|put\|patch\|delete)\(' api/routers/ \| wc -l` | **44** |
| app-level operations | `/usr/bin/grep -cE '^@app\.(get\|post)\(' api/main.py` | **1** |
| **total** | `44 + 1` | **45** |
| arm `public-non-admin` | `/usr/bin/grep -rE '^@router\.(get\|post\|put\|patch\|delete)\(' api/routers/ \| wc -l` | **30** |
| arm `admin` | `/usr/bin/grep -cE '^@admin_router\.' api/routers/admin.py` | **13** |
| arm `gallery` | `/usr/bin/grep -cE '^@gallery_router\.' api/routers/gallery.py` | **1** |
| arm `app` | (as above) | **1** |
| OpenAPI security schemes | `/usr/bin/grep -rE 'HTTPBearer\|APIKeyHeader\|OAuth2\|SecurityScopes\|security=\|openapi_extra\|Security\(' api/ --include='*.py' \| wc -l` | **0** (G8's `0/45`, mechanism enumerated) |
| the 7 unclientted viz ops | `/usr/bin/grep -rniE '/api/visualizations/\$\{[a-z]+\}/(remix\|publish\|unpublish\|forks\|provenance\|diff\|versions)' web/src \| wc -l` | **0** |
| gallery alias consumers | `/usr/bin/grep -rn '/api/gallery' web/src \| wc -l` | **0** |
| health consumers | `/usr/bin/grep -rn '/api/health\|healthz' web/src \| wc -l` | **0** |

**`45 = 30 + 13 + 1 + 1`** closes on the first reading, on all four arms, on both runs — and it closes on
**§D1's own naming** of the arms (*"30 public-non-admin + 13 admin + 1 app + 1 gallery"*, ⟨cmd⟩
`/usr/bin/grep -c -F 'The triple is 45 = 30 public-non-admin + 13 admin + 1 app + 1 gallery' docs/tranches/X/fourier/waves/F-W5.md`
→ **1**), not merely on the arithmetic.

**a.2 — COUNTING LOCK K-1, fired rather than quoted.** The lock reads *"a `@router.` grep is BLIND to
prefixed routers … read against 13/44, never as zero."* At this seat the trap **fires**:
⟨cmd⟩ `/usr/bin/grep -cE '^@router\.' api/routers/admin.py` → **0** (the forbidden zero) against
⟨cmd⟩ `/usr/bin/grep -cE '^@admin_router\.' api/routers/admin.py` → **13** — i.e. **13 of 44**, exactly as
K-1 pins it; `gallery.py` shows the same blindness one row wide (**0** vs **1**). The register is
therefore keyed on `@[a-z_]*router\.` ⊕ `@app\.`, and **"30" appears in it only as the public-non-admin
arm, never as a total** (C-3's standing correction).

⊘ **A collision the lock does not name, disclosed at register §1.3**: *two* arms of this API have thirteen
operations — **admin** (13) and **visualizations** (13) — so `30 + 13 + 1 + 1` has a second arithmetically
valid partition that would put different rows in the second arm. §D1's spelling (*"30 public-non-admin"*
⊕ *"13 admin"*) settles it; the collision is recorded because a size-keyed check matching on `13` alone
would read the wrong arm as agreeing. **No count in the register is verified by its size alone.**

**a.3 — the register authored.** `contract/operation-register.md` created (**38 KB**, line 1 =
`SERVED MODEL: claude-opus-5[1m]`): **45 numbered rows, one per operation**, each carrying
**method · path · handler · authority class (R3-7b) · client function · client-edge disposition (R3-7c)**.
Authority vocabulary is a **closed six-token set, each token a measured mechanism** (`ADMIN-TOKEN` ·
`SESSION-DECLARED` · `SESSION-IN-BODY` · `OWNER-IN-BODY` · `VIEWER-SCOPED` · `ANONYMOUS`); disposition
vocabulary is G9's three gap tokens ⊕ `CLIENTED`.

**a.4 — the 36/9 split and the nine gap dispositions.** `36 CLIENTED / 9 gaps`, and the 9 = the **seven**
unclientted `/api/visualizations` operations ⊕ `GET /api/gallery/cursor` ⊕ `GET /api/health`. Each gap
carries **one** disposition token, its **measured ⊕ ruled basis**, **one home** and **two citations**:

- **remix · publish · unpublish · forks · provenance · diff · versions → `CLIENTABLE`** (7). Ruled where a
  ruling exists (§0j.D **F-SS4REST R8** carries remix/publish/unpublish); measured otherwise. Two are
  **sequenced** in their basis cell, not in a second disposition: *provenance* behind **§C5** (⟨cmd⟩
  `/usr/bin/grep -rn '_readable_or_none' api/ --include='*.py' \| wc -l` → **5**, entry-row only ⇒ the
  breadcrumb emits a private ancestor's fields), *versions* behind **§E2** (⟨cmd⟩ `… '_write_root_version'
  … \| wc -l` → **3** = def ⊕ create ⊕ remix, the ONLY writer ⇒ an always-singleton history; clienting it
  today ships the dead affordance §D2/R4 bars). Home: **F.W1/F.W4** (⊕ §C5 / §E2 / F.W6 for the sequenced
  legs).
- **`GET /api/gallery/cursor` → `STRUCK`.** Measured from the route's **own docstring sunset clause**
  (⟨cmd⟩ `/usr/bin/grep -n -F 'stable frontend-facing path while the consumer migration (B.W4) re-points the' api/routers/gallery.py`
  → `:8`): the alias exists only *until* the client is re-pointed onto `/api/visualizations`. It has been
  — **0** `/api/gallery` references in `web/src`. Home: the **fourier API row** (G9's strike owner).
- **`GET /api/health` → `SERVER-ONLY`.** `{"status":"ok"}`, no authority, **0** web references; the
  absence of a client edge is the design and is stated as such. Home: the **fourier API row** (no act
  owed).

⊘ **One divergence DISCLOSED, not resolved** (row 9): the server's unpublish target is **`unlisted`**
(⟨cmd⟩ `/usr/bin/grep -n 'target = "unlisted"' api/routers/visualizations.py` → `:647`) while **ruling
D9** rules *"The unused `unlisted` state dies."* Per the spec's own D9 rooting the reconciliation is **the
value.js API row's obligation — never a silent contract overwrite, and never a fourier defect**. The
register records it and **rules nothing**.

**a.5 — F-6's client-side blindness lock honoured (§D1's second lock).** *"The register enumerates
template-bound edges explicitly or it is armed against server under-count and unarmed against client
under-count."* Register §5 enumerates them: **three operations reached only through a URL builder**, not a
fetcher — `thumbnailUrl` (3 consuming sites), `overlayUrl` (3), `imageUrl` (**0**) — six consuming sites
in all, none traversing `coreFetch`. ⊘ And the instrument's *other* error is disclosed: ⟨cmd⟩
`/usr/bin/grep -rnE ':src="' web/src --include='*.vue' \| wc -l` → **6**, of which only **4** are API
edges (`PaperArticleWindow.vue:97` and `AppHeader.vue:79` bind bundled `.png` assets) — so a `:src`-
counting probe **over**-counts by two in the direction F-6 warns about under-counting.

**a.6 — three `CLIENTED` rows whose client function has ZERO consumers, CITED NOT BOOKED.**
⟨cmd⟩ (per name) `/usr/bin/grep -rw '<fn>' web/src --include='*.ts' --include='*.vue' \| /usr/bin/grep -cv 'lib/api.ts'`
→ **0 · 0 · 0** for `checkImageHash` (row 21), `imageUrl` (row 23), `getMe` (row 29). The third reproduces
the spec's banked §C3 witness; **the first two are new at this seat**. All three are offered to **§B4's
LIVENESS predicate** as instances — **no id minted, no repair claimed, no roster entered** (§0b,
FR-GIG-5's bar).

**a.7 — WRITE-THEN-MEASURE, and what it caught.** Every published figure was re-run against the **settled
bytes** before commit. **Four receipts did not reproduce as first drafted and were corrected at the true
bytes; three are disclosed in the register itself (§0) rather than silently fixed:**

1. **`grep -r` over `api/` counts `__pycache__`.** Un-scoped, `_readable_or_none` returned **6** and
   `_write_root_version` **4** — one more each than the spec's banked 5 and 3 — because `grep -r` emits a
   `Binary file api/routers/__pycache__/visualizations.cpython-314.pyc matches` line. With
   `--include='*.py'` both reproduce the banked figures exactly (**5** · **3**, double-run). *A `.pyc`
   inflating a source count by one is the phantom-receipt class in miniature: the digit is wrong and the
   command still "works".*
2. **An export grep is not an edge count.** `api.ts` exports **39** functions, **five** bearing no
   operation (`setSessionToken` `:44` · `abortInflight` `:61` · `isAbortError` `:69` · `apiFetch` `:215` ·
   `computeSha256` `:260`). `39 − 5 = 34`, ⊕ **2** in `equation/api.ts` = **36**. The first draft published
   `34` under the raw instrument — **false**. The authoritative 36 is the register's own self-count.
3. **A docstring quotation must be quoted at its line.** Row 45's sunset clause wraps across two source
   lines; the re-flowed rendering returned **0** under `grep -c -F` and was replaced by the single line
   that carries it (`gallery.py:8`), with the continuation named (`:9`).
4. A `sed` line range (`649,651`) missed the `unlisted` target line by two; replaced with a `grep -n`
   that names `:647` — a **drifted anchor cured at the true bytes**, per METHOD.

**No figure published in the register is one that failed to reproduce.**

**a.8 — SELF-COUNT from the settled bytes, double-run.** Row filter
`/usr/bin/grep -E '^\| [0-9]+ \| (public-non-admin|admin|app|gallery) \|' <register>` — **the same 45
lines every count runs over**:

| partition | readings | closes |
|---|---|---|
| arms | `public-non-admin` **30** · `admin` **13** · `app` **1** · `gallery` **1** | **45** |
| **G8** authority | `ADMIN-TOKEN` **13** · `SESSION-DECLARED` **1** · `SESSION-IN-BODY` **2** · `OWNER-IN-BODY` **5** · `VIEWER-SCOPED` **5** · `ANONYMOUS` **19** | **45** |
| **G9** disposition | `CLIENTED` **36** · `CLIENTABLE` **7** · `STRUCK` **1** · `SERVER-ONLY` **1** | **45** |

`run1 ≡ run2` on every cell. **Three partitions of the same 45, all closing at 45, none derived from
another.**

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (baseline, this record) | AFTER (this seat, 2026-09-17) | verdict |
|---|---|---|---|
| **G21** — the register is a FILE, not prose | ⟨cmd⟩ `ls $V/docs/tranches/X/fourier/contract/` → *No such file or directory* (double-run) | ⟨cmd⟩ `/bin/ls /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/contract/` → **`operation-register.md`**, 38255 bytes; **45 rows**, `45 = 30+13+1+1` enumerated per row | **RED → GREEN** |
| **G8** — security documentation (R3-7b) | `save_contour(req)` takes no `Depends`/`Header`/`Request`; router declares no `dependencies=` | **EVERY row carries an authority class** — 45/45, six measured mechanisms, self-counted `13+1+2+5+5+19=45`. The `0/45` OpenAPI witness is reproduced **with its mechanism enumerated** (0 security schemes; `admin_required`/`require_session`/`resolve_session` are plain `Request` readers at `api/dependencies.py:262`/`:254`/`:206`, which emit no `security` block) ⇒ **26 of 45 enforce authority, 45 of 45 document none** | **RED → GREEN** *(register half; the `save_contour` + image-GET **decisions** are §C1's, unit c — the register makes them checkable, not made)* |
| **G9** — client-gap closure (R3-7c ⊕ X-3) | `web/src/lib/api.ts` exists; 23 `visualizations` hits; the 36/9 and 7-of-13 figures owed to unit a under lock K-1 | **36 client edges / 9 gap operations**, re-measured (a fourth independently agreeing count); **SEVEN of 13** `/api/visualizations` ops unclientted (probe → **0**); **every gap operation carries a disposition** — 7 `CLIENTABLE` · 1 `STRUCK` · 1 `SERVER-ONLY`, each with basis, one home, two citations. K-1 held: read against **13/44**, never zero | **RED → GREEN** |

#### Commits

- **`3418db60`** — `docs(x-f/F.W5.a): the 45-operation register — authority class + client-edge disposition on every row` (pathspec: `docs/tranches/X/fourier/contract/operation-register.md`).
- this receipt — pathspec `docs/tranches/X/execution/C/F-W5.md`.

#### Residuals handed on (books nothing, cites everything)

1. **To unit b (§A/§B)** — §4.3's three zero-consumer rows for **§B4's LIVENESS** predicate; §5's
   template-bound edges for **§A3's evenness** posture, which must cover edges that never reach
   `coreFetch` at all.
2. **To unit c (§C/§D/§E)** — §3's class table is **§C1**'s operand and §4's disposition table is
   **§D1**'s (*"keyed to the register"* now has its referent); §3.2 carries the `save_contour` and
   image-GET ground (3 `Cache-Control: public, max-age=86400` header sites at `images.py:145`/`:164`/`:205`
   ⊕ 1 comment at `:138`); §2.2 carries the **producer absence** for **§D3** (rows 41–42 are the flags
   collection's entire live surface and **no row of the 45 writes a flag**) — ruled **F-PRODRET**; row 9
   carries the **D9 divergence** for the value.js API row; row 30's `logout` authority note
   (`X-Session-Token` consumed **by value as a key**, never validated) for **§C3**.
3. **To unit e (§G19)** — a file, not prose. The register **mints no id, books none, and enters no roster
   at either end** of the set-difference; every id it touches is cited to its holder.

#### Escalations

**None.** No write outside the writable set; no ruling re-opened; no spec byte edited (E-3 honoured — the
four instrument corrections are in **this** record and in the register's own §0, never in the spec).
**Triumvirate status: the register agreed with the 45/30/13 triple at the FIRST reading, on all four arms,
on both runs — zero disagreements, the third-iteration halt not approached.**

**Handoff**: F.W5's writable set is clean; **unit b may open.**
