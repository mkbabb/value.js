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

---

### b

**SERVED MODEL: claude-opus-5[1m]** · seat opened 2026-09-17, HEAD at open `d7650002`, branch
`tranche-u`. Writable set honoured: **one file created**,
`docs/tranches/X/fourier/contract/J-diff-shape-v2.md`, ⊕ this receipt. **Zero fourier bytes written** —
every `$F` command below is `grep`/`sed`/`ls`/`wc`, and `git status --porcelain
docs/tranches/J/design/J-diff-shape.md` in the fourier tree → **0 lines** at this unit's close: **v1 is
byte-unchanged, superseded BY REFERENCE only** (E-3). `scripts/dev/dev.sh` never staged.

**Serial-head note (§1c).** At open the tree carried four rows from **other tracks** —
`V/reformation/CARRY-LEDGER.md`, `X/execution/A/X-W0.md`, `X/execution/LEDGER.md` (another seat's
concurrent edit) and the unowned `dev.sh`, plus the untracked `KF-W4/k3-decision.md`. **None is in
F.W5's writable set**, so the serial head is clean and the *"dirty tree at handoff"* halt is not
tripped. **`LEDGER.md` was not touched by this seat** — it is not in unit b's writable set.

**E13.** The wave's Step-0 sweep (this record, §E13) read **0 UNREAD in F.W5's scope**; no letter
arrived in this unit's window and none is owed by it. The close sweep is unit e's.

#### Acts, in order

**b.1 — MEASURE-AT-OPEN (D-19), before a clause was written.** Every witness in §A/§B was re-measured at
this seat's own clock from `$F = /Users/mkbabb/Programming/fourier-analysis` (READ-ONLY) and
`$V = /Users/mkbabb/Programming/value.js`, engine `/usr/bin/grep` (BSD), **every published figure
double-run** (`run1 ≡ run2`). Nothing was inherited from the spec's prose: the spec is the **operand**,
the bytes are the **witness**.

**b.2 — FOUR witness spellings did not reproduce; each got INTENT at the true bytes, recorded.** Per
METHOD (*drifted anchors get INTENT at the true bytes, recorded*) and E-3 (*the spec is immutable —
addenda, not patches*), the corrections live in **v2's own §0.5**, never in the spec:

| # | spec spelling | measured at this seat | intent, at the true bytes |
|---|---|---|---|
| 1 | §A4: *"no `response_model` anywhere"* | ⟨cmd⟩ `/usr/bin/grep -rn "response_model" api --include='*.py' \| wc -l` → **8** | **sharper than the absolute**: `visualizations.py` **0/13** · `admin.py` **1/13** (the `/stats` row) · the three flagged models bound to **no route at all**. Per-router, double-run: admin 1/13 · contours 2/4 · equations 2/2 · gallery 0/1 · images 3/7 · sessions 0/4 · visualizations 0/13 |
| 2 | §A2: *"`Link: rel=next`"* | ⟨cmd⟩ `/usr/bin/grep -rn "Link\|rel=" api/lib/crud/cursors.py \| wc -l` → **0** | fourier's opaque cursor is **body-borne**: `routers/visualizations.py:324` `has_more`, `:328-329` `next_cursor`, `:334-335` both in the body. The divergence A2 settles is unchanged; **a contract that mis-states where a field travels cannot be mechanically checked** |
| 3 | §A1: *"pydantic extra-ignore"* | ⟨cmd⟩ `/usr/bin/grep -c "model_config\|ConfigDict" api/models/admin.py` → **0** | the `_id` drop is pydantic v2's **inherited default**, not a declared `ConfigDict`. Mechanism identical; the distinction is load-bearing because `models/visualization.py` declares `extra="forbid"` at seven models and `models/assets.py:58` `extra="ignore"` at one — **the admin band's silence is a gap in an otherwise-explicit house style** |
| 4 | §B5: the `as any` seam at *MorphShapePreview* | the cast is at `web/src/components/morph/FourierMorphDemo.vue:99-100` (`prepareFourierShape(sunData as any)` / `(moonData as any)`); `MorphShapePreview.vue`'s only import is a decorative SVG | **location, not substance** — likewise §A5's silent fallback, which lives at `src/fourier_analysis/symbolic/latex_rendering.py:280`, the library package, not `api/` |

**None of the four changes a clause's meaning; all four change what a probe can find**, which is the
whole subject of §B3.

**b.3 — the contract authored.** `contract/J-diff-shape-v2.md` created (**52241 bytes**, **715 lines**,
line 1 = `SERVED MODEL: claude-opus-5[1m]`): **§0** (scope change · the v1 supersession table · bases ·
the four corrections · **§0.6 how a probe reads this document**) · **§A** A1–A6 · **§B** B1–B5.
**Eleven clauses, each carrying RULE · WITNESS · DISPOSITION · LOCK** — *a clause that names no witness
is not a clause* (§0a). **v1 is superseded BY REFERENCE**: §0.2 dispositions all seven v1 sections and
**withdraws none of them**; §§2.1–2.5, §3 and §5 stand unamended and in force.

**b.4 — the inv-26 amendment stated in the open (A4), not slid past.** §0j.D **F-SS4REST R7 = CODEGEN**
is applied as the spec's own bar requires — *"v2 RESTATES or AMENDS, never silently reverses"*. A4
splits the standing law into three limbs and disposes each by name: **inv-16 RESTATED UNCHANGED**
(shared-by-contract, no shared package) · **inv-26 first limb RESTATED UNCHANGED** (one contract source)
· **inv-26 second limb — *hand-typed twins, no codegen* — AMENDED to generated twins, openly, cited to
its ruling id.** The amendment is named as an amendment in the clause body, so no later reader can
mistake it for drift. Both ids are rooted (inv-16 → `lane-crud.md` §0 headline block; inv-26 → its
in-repo evidence home `docs/tranches/R/audit/pass1/R4-FOURIER.md` §6, the fourier ledger anchor left
**MEASURE-AT-OPEN** and unopened).

**b.5 — the one-home law honoured at every citing clause.** A1 **BOOKS NOTHING**: `AA-45` and `AA-48`
are cited to `F-W10.md` §2.5's drain and to §5 respectively, under the standing tie-breaker (*a banked
NO-WAVE-OWNER row's one home is the drain; a clause needing its mechanism cites it and never books it*,
R3-6.5). A2 cites **`AA-46` as EVIDENCE with its kill noted** and stands whole on `FR-AFP-18` ⊕ §D10.
A3 cites **`AA-47`** and rests its denominator on **`FR-CP-16`**'s measured surface. A6 cites
**`FR-USB-37`** (canonical NWO (packet), disposed at F-W10's drain) and **`fr-GalleryView FR-GV-7`**
(held at F-W3 §X.1-v5). B5 cites **`P-9`** (home F.W4) and **`HLG-23 (C:C-12)`** as a LEG held at F-W4.
**`R6-8` is booked ONCE, as four record-qualified canonical rows** — `fr-AnimationControls` ·
`fr-CanvasControlsDock` · `fr-ConvergencePlot` (all `F.W5`) ⊕ `fr-EasingCurvePreview` (`F.W5-W8`) — and
**`C-28` is written as the BODY of that booking, not a second row** (R4-10's identity minute).

**b.6 — every verbatim span survives a `grep -qF` of itself.** Eleven registry spans re-run from the
`$R` base at this seat, **double-run, all HIT**: `fr-CoefficientsSpectrum.md:65` (A5's
*"unjoinable in principle"* cell, arrow inside the bold and the terminal period present) ·
`fr-AnimationControls.md:123` (C-30's leg **and** its disposition cell) · `fr-EquationView.md:71`
(M-CK's *"fix the key FIRST or the B-1 repair ships broken."*) · `fr-AdminUserList.md:51` ×2 (FR-AUL-13
**with no terminal period — the cell closes on the table pipe** — and the *"written against a contract
document rather than the router"* indictment) · `fr-CanvasControlsDock.md:150` (the C-28 fold) ·
`fr-MorphShapePreview.md:110` · `fr-AdminAuditLog.md` ×3 (the AA-45/AA-46/AA-47 terminal cells). The
negative control is published with them: ⟨cmd⟩ `grep -rn -iF 'join to get wrong' fr-*.md` → **0 across
the 66**, which is why B5's compression **carries no quotation marks** — and why §B4's LIVENESS
predicate is set in **plain text** as F.W5's own coinage, the triple-star marker struck per R4-1 item 6.

**b.7 — WRITE-THEN-MEASURE, and what it caught.** Every published figure was re-run against the
**settled bytes** before commit. **Two instruments did not reproduce as first drafted; both are
corrected in the document itself rather than silently fixed:**

1. **A count of element instances that silently counted a comment.** The first draft published ⟨cmd⟩
   `/usr/bin/grep -c "<MetricBadge" …/GalleryAdminBanner.vue` → **6**. Re-run against the settled bytes
   it returns **7**: `:96` is a CSS comment naming the component. The element-anchored spelling ⟨cmd⟩
   `/usr/bin/grep -cE '^[[:space:]]+<MetricBadge$' …` → **6** (double-run), and the six are `:45 :52
   :60 :68 :75 :82`. **The over-count is disclosed inside A2's witness**, because *the digit is wrong
   and the command still "works"* — unit a's phantom-receipt class, met again at this seat.
2. **A `wc -l` that would read as call sites.** `/usr/bin/grep -rnw "softDelete" web/src …` → **2**, and
   a bare `2` reads as two callers. The receipt now publishes the split — `gallery.ts:165` (definition)
   ⊕ `gallery.ts:286` (export) — so **zero callers** is legible from the digit.

⊘ **And the gate probes themselves failed once, for the reason the document now warns about.** The first
gate run grepped two normative sentences line-wise and returned **0** on both — *not absence, wrap*.
Re-run under whitespace normalization ⟨cmd⟩ `/usr/bin/tr '\n' ' ' < J-diff-shape-v2.md | /usr/bin/tr -s
' ' | /usr/bin/grep -c -F '<sentence>'` → **1** each, double-run. **The instrument is now published in
the document at §0.6**, because §A2.4 demands a mechanical check and §B3 convicts a contract document
that ships without a probe: *a conformance probe that reads this file line-wise is measuring the wrap,
not the contract.*

**No figure published in v2 is one that failed to reproduce.**

**b.8 — SELF-COUNT from the settled bytes, double-run.** ⟨cmd⟩
`/usr/bin/grep -cE '^### (A[1-6]|B[1-5]) — ' J-diff-shape-v2.md` → **11**, ids in order
`A1 A2 A3 A4 A5 A6 B1 B2 B3 B4 B5`; `^\*\*RULE` → **11** · `^\*\*WITNESS` → **11** ·
`^\*\*DISPOSITION` → **11** · `^▲ ` → **18** locks · `⟨cmd⟩` → **31** receipts. **Four partitions of the
same eleven clauses, each closing at eleven, none derived from another.** `^### D9` → **0**: **no clause
is numbered D9**, the reservation held (§2 compatibility note). Clause ids are preserved **verbatim** for
sibling cross-refs; a sibling's mis-keyed cite is conformed **at the sibling** (R-1e) and none was
renamed here.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (baseline, this record) | AFTER (this seat, 2026-09-17) | verdict |
|---|---|---|---|
| **G1** — identity on the wire | ⟨cmd⟩ `grep -rn "class AuditEntry" $F/api --include='*.py'` → one hit, `api/models/admin.py:94`; four fields, no identity; the `:key` positional | **§A1 states the rule**: *"Every **list-bearing response class** in this contract carries a **stable per-row identity** that is emitted on the wire."* — greppable at §0.6's instrument → **1** (double-run). The rule is **normative, not descriptive**: a class that cannot name its row identity is **not admissible**; one that deliberately has none **states that, and why**, under §A3. Witness re-measured whole (`sed -n '94,99p'` → the four fields; `AdminAuditLog.vue:127` → ``:key="`${entry.timestamp}-${i}`"``, the loop-index limb doing the work) | **RED → GREEN** *(the clause; the `:key` deletion stays **F.W4's act** and is not credited here)* |
| **G17** — boundary-validation evenness | the whole 45-operation client surface lands as ONE unchecked `(await res.json()) as T`; AA-47's uneven pair; `save_contour` zero cardinality validation; six admin tiles em-dash on drift | **§A3 states one posture per response class — *validated* or *explicitly-not-validated-and-why* — over THREE surfaces** (HTTP · persisted-then-rehydrated · build-time), with *"**Evenness is the clause, not paranoia.**"* carried verbatim → **1**. Denominator measured, not asserted: ⟨cmd⟩ `grep -rn "await res.json()) as" web/src` → **1** (`api.ts:192`), one `as T` for 45 operations. `save_contour`'s bare `.get(…, [])` pair quoted at `contours.py:21-26`. **The L-19 lock lands verbatim** — *"**Do NOT author a per-field defensive sweep at F.W4.**"* → **1** — and the clause is extended, per unit a's residual, to the **six template-bound consuming sites that never traverse `coreFetch`**: a posture declared only at the fetcher **is not even** | **RED → GREEN** |
| **G18** — casing + envelope isomorphism — **CASING LIMB ONLY** | v1 §4 names TS-camel ↔ Python-snake as the ONLY allowed envelope difference and §6 binds each probe to the doc; value.js has **no diff surface to conform**, so the parity verdict is unrunnable | **§A2.4 restates the casing rule as a mechanical check on each side**: *"the casing rule is a mechanical check on each side, never prose a reader applies"* → **1**; *"**TS lowerCamelCase ↔ Python snake_case is the ONLY allowed difference in the wire envelope**"* → **1**; *"against the document, never against the sibling"* → **1** (all double-run, §0.6 instrument). **The limb is deliberately made independent of the second surface's existence** — where one side has no surface, its half of the verdict is explicitly one-sided and says so | **CASING LIMB RED → GREEN**; **G18 overall stays RED** — its §6 re-authoring and the explicit one-sided verdict are **unit c's** (§E3, ruling R1 RE-SCOPE), and this seat does not pre-empt them |

**Gates turned by this unit: G1 · G17 · G18's casing limb. G18 itself remains RED pending unit c.** No
other gate was touched, and none was read as GREEN that this seat did not turn.

#### Commits

- **`bf3707ec`** — `docs(x-f/F.W5.b): J-diff-shape-v2 SS-A+SS-B — the neutral co-signed contract's wire shape and the R6-8 join relation` (pathspec: `docs/tranches/X/fourier/contract/J-diff-shape-v2.md`).
- this receipt — pathspec `docs/tranches/X/execution/C/F-W5.md`.

**One commit per meaning; the family did not split** — §A and §B are one authoring act on one file and
landed in one commit, as §1c's *"each unit commits before the next opens"* requires.

#### Residuals handed on (books nothing, cites everything)

1. **To unit c (§C/§D/§E)** — (a) **§A5 PRECEDES §B's enforceability and §C's**: if any clause admits an
   untyped operation, the join, authority and disposition rules are unenforceable *at that operation*;
   the exception set must be **named or closed**. (b) **§A6 states the transport; §C3 owns the session
   predicate** — and the two **must not cite each other** (PASS-5 P5-14's closed loop); A6 names §C3 as
   the holder and §C3 should name its own, not point back. (c) **G18's §6 re-authoring and the explicit
   one-sided verdict are unit c's** under R1 RE-SCOPE; A2.4 was written to survive that verdict either
   way and does not constrain it. (d) **§B1 routes ImageUpload's security half to §C2 and its transport
   half to §E15**, and books neither. (e) **The `GCM-10` cure is quoted in A3 only after G22 resolves or
   STRIKES MF-9** (unit e) — if struck, quote the cure without it and record the strike.
2. **To unit d (§F/§G + obligations)** — (a) **§F re-states the diff envelope against v1 §3**, which
   §0.2 leaves **in force and unamended**; the supersession table is the authority for what v1 still
   governs. (b) **`FR-EQR-32` is enforceable only if §F8 chooses the wire field** — §B1 records that
   conditional, and **a decline must be RECORDED as a decline with its reason**, never as silence.
   (c) The **value-side obligation list** inherits two rows already measured here: the D9 three-state
   reconciliation (unit a, register row 9) and **G18's value-side probe**, whose casing check §A2.4 now
   specifies mechanically.
3. **To unit e (G19/G20/G22)** — this unit **mints no id and books nothing outside the four
   record-qualified `R6-8` rows and the clause-table ids §2 §A/§B already assign**; every other id it
   touches is **cited to its holder by name** (A1 → F-W10 §2.5 · A6 → F-W10's drain and F-W3 §X.1-v5 ·
   B5 → F.W4). The **seven §2c exclusions stay excluded** at both ends of the set-difference.
4. **To F.W9/W10 (via §4's edge)** — **§B3 is v2's own indictment**: this document is *"written against
   a contract document rather than the router"* unless the conformance probe ships. **§0.6 publishes the
   instrument that probe must use** (whitespace-normalized matching on stable clause ids, never line
   numbers into a live file).

#### Escalations

**None.** No write outside the writable set (`J-diff-shape-v2.md` created; this receipt appended;
`LEDGER.md` untouched — not unit b's). **Zero fourier bytes written**; **v1 byte-unchanged and
superseded BY REFERENCE only** (E-3 honoured — the four witness corrections are in **v2's §0.5** and in
**this** record, never in the spec, never in v1, never in the registry). No ruling re-opened; §0j.D's R7
applied as ruled and named as an amendment rather than a silent reversal. **Triumvirate status: no halt
condition approached** — no register/triple disagreement (not this unit's operand), no `(record, id)`
homing failure, and MF-9 is unit e's to resolve or strike (A3 carries the sequencing lock so the
`GCM-10` cure is not quoted ahead of it).

**Handoff**: F.W5's writable set is clean after this unit's two commits; **unit c may open.**

---

### c

**SERVED MODEL: claude-opus-5[1m]** · seat opened 2026-09-17, branch `tranche-u`. Writable set honoured:
**one file appended**, `docs/tranches/X/fourier/contract/J-diff-shape-v2.md`, ⊕ this receipt. **Zero
fourier bytes written** — every `$F` command below is `grep`/`sed`/`wc`, and at this unit's close
⟨cmd⟩ (fourier tree) `git status --porcelain | wc -l` → **0** and
`git status --porcelain docs/tranches/J/design/J-diff-shape.md` → **0 lines**: **v1 is byte-unchanged,
superseded BY REFERENCE only** (E-3). `scripts/dev/dev.sh` never staged. `LEDGER.md` untouched — not
unit c's.

**Serial-head note (§1c).** The serial predecessor is **unit b's contract commit `bf3707ec`** ⊕ its
record commit `1cbde268`; this unit opened on b's committed tree and its own commit's parent is
⟨cmd⟩ `git rev-parse --short 73e35e74^` → **`d354d144`**, an **X·KF** row landed concurrently by another
track. **No row of another track is in F.W5's writable set**, so the *"dirty tree at handoff halts the
wave"* condition is not tripped; F.W5's own serial head was clean at open and is clean at close (⟨cmd⟩
`git status --porcelain` after commit → the two standing rows only: `CARRY-LEDGER.md` (another seat's)
and the unowned `dev.sh`).

**E13 — and an ADDENDUM-BESIDE, because this unit's window was NOT empty.** The wave's Step-0 sweep
(this record) read **0 UNREAD in F.W5's scope** and recorded of path 2 (`../glass-ui/docs/tranches/BK/coordination/`): *"4 files; newest
`glass-outbound-2026-08-29-valuejs-o20-ack.md`@Aug 29 16:41 = **I-30, rowed**. Nothing newer."* **That is
no longer true at this unit's close**, and the honest act is to say so rather than to inherit a sweep.
Re-swept read-only at this seat's own clock: ⟨cmd⟩
`/usr/bin/find ../glass-ui/docs/tranches/BK/coordination -maxdepth 1 -name '*.md' -newermt '2026-09-17 16:05'` → **4** (double-run) — ⊘ **and the digit is 4, not the 3 this line first published, because
`glass-outbound-2026-08-29-valuejs-o20-ack.md` is in the return with a REFRESHED mtime**. That file is
**`I-30`, already ROWED 2026-08-30**; its *name* is dated Aug 29 and its *mtime* is not, so an
mtime-keyed sweep counts it and a name-keyed reader would not. **Three of the four are genuinely new**,
all dated 2026-09-17 in their own headers, classified from each letter's own header block (never from a
bare `grep -i unread`):

| letter | addressed to | disposition at this seat |
|---|---|---|
| `glass-outbound-2026-09-17-valuejs-o20-disposition.md` | **`**To**: value.js (X formation mail seat)`** — *"O-20 DISPOSITION — every item of your 2026-08-28 batch, re-read against published 9.0.0"* | **OURS, INBOUND, UNROWED** — handed to unit **e** |
| `glass-outbound-2026-09-17-constellation-o20-relay.md` | the constellation (*"The O-20 batch was value.js's letter, but its re-read measured every sibling"*) | **value.js-relevant, UNROWED** — handed to unit **e** |
| `glass-outbound-2026-09-17-bbnf-lang-9.0.0-addendum.md` | **bbnf-lang** (BK row #76) | **NOT value.js's** — named so the count is complete, not rowed here |

⊘ **The material fact these letters carry, stated because it moves a pinned programme datum and a later
reader must not miss it**: both value-facing letters take as their **datum** *"published 9.0.0
(`gitHead`/`d4f7b24f`, provenance run 33273556530, `latest` on the registry)"* — i.e. **glass-ui 9.0.0 is
PUBLISHED**, where the standing programme state (I-30, verified 2026-09-17) records the registry at
**8.0.0** with the 9.0.0 PUT walled behind an owner npm act. The relay also states *"Installed pins at the
census are stated per repo; **nobody is on 9.0.0**"* and *"**no edits were made in any of these
trees**; every action is yours, in your tranche, at your adopt."* **This unit rules nothing on it and
rows nothing**: `docs/tranches/V/coordination/INBOX.md` is **unit e's** writable path, not this unit's,
and writing it here would be an ESCALATION. **Handed to unit e, whose close sweep owns the rowing** — and
the sibling track saw the same three (X·KF W4 unit `.d`, commit `d354d144`, *"three glass-ui BK letters
arrived mid-wave … unrowed and handed up"*), so the two independent detections agree. **No letter is
suppressed and none is claimed as rowed.**

#### Acts, in order

**c.1 — MEASURE-AT-OPEN (D-19), before a clause was written.** Every witness in §C/§D/§E was re-measured
at this seat's own clock from `$F = /Users/mkbabb/Programming/fourier-analysis` (READ-ONLY) and
`$V = /Users/mkbabb/Programming/value.js`, engine `/usr/bin/grep` (BSD) where the result is an engine
fact, **every published figure double-run** (`run1 ≡ run2`). Nothing was inherited: the spec is the
**operand**, the bytes are the **witness**, and the register (unit a) is the **operand for §C1/§D1's
enumeration**, cited and never re-derived.

**c.2 — the four RULED clauses, each citing §0j.D and never presuming it.** Four of this unit's clauses
are owner-gated and all four were ruled at COHESION **§0j.D** before the wave opened; the clause bodies
carry the ruling id and the ruling's own words:

| clause | ruling id | what the clause writes |
|---|---|---|
| **§D2** (the like verb, G10) | **F-SS4REST R4** | **REMOVE the affordance** — counter, compound index, sort key and UI arm retire **together**; *"no third option ships"* quoted at `fr-GalleryFeaturedCarousel.md:34`; **dissent (C axis, BLOCKER at two sites) preserved, not resolved** |
| **§D3** (moderation, G11 — **THE ADMISSION GATE**) | **F-PRODRET** | **PRODUCER, as a PORT** of value.js's `POST /:slug/flag`, **homed at F.W8**, with the rationale carried from the ruling; **F.W5 writes the clause and nothing else about it** |
| **§D12** (off-state `[]`, G-side of R5) | **F-SS4REST R5** | **STOP MINTING** `[]`; **no silent rewrite**; `fr-BasisSelector M-9`'s sentence quoted at record case |
| **§E3** (TA-4 diff clause, G4 ⊕ G18) | **F-SS4REST R1** | **RE-SCOPE value.js out** — and **v1 §6 RE-AUTHORED IN FULL**, block-quoted inside the clause, with the verdict rendering fixed: **`N/A — RE-SCOPED (F-SS4REST R1)`**, never *missing*/*pending*/*RED* |
| **§E4** (born visibility, G5) | **F-SS4REST R8** | **REMIX + BORN-PRIVATE**, after the D9 non-contradiction check below |
| **§E16** (trie, G7) | **F-TRIE** | **NO TRIE**; F.W7 unit `b` never opens, `design/R4-variant-storage.md` never created, **G-F7-5 closes vacuously**; **dissent recorded** at `F-W10.md` §2.3's `SS-4-PREREQ` row and **quoted nowhere here** (it is quoted ONCE in the programme, at F-W5 §4's `F.W5 → F.W7` edge row) |
| **§D6** (hard-delete arm) | **F-SS4REST R6** | **KEEP the arm**; copy made truthful — and the clause states *why* keeping beats deleting: **the copy is false in the direction that SUPPRESSES a safe action** |
| **§C3** (dead session subsystem) | **F-SS4REST R9** | **DELETE**, with the scope of the deletion bounded in the clause: **the client capability goes; the server's four `/api/sessions` operations do not** |

**c.3 — D9 NON-CONTRADICTION, VERIFIED AT THE RECORD BEFORE §E4 WAS AUTHORED**, as R8's own text
requires (*"the F.W5 seat verifying non-contradiction with ruling D9 at the record before authoring"*).
⟨cmd⟩ `/usr/bin/grep -n 'D9' docs/tranches/V/DECISIONS.md` → **one hit, `:36`** (double-run), whose bytes
are: *"| D9 | Palette visibility is `private | public`; owner lifecycle is `active | trashed`; admin
moderation is separately clocked `clear | withdrawn`. The unused `unlisted` state dies. Non-owner reads
require active/public/moderation-clear and a visible immutable release. |"*. **Three tests, all
recorded in the clause so a later reader re-runs rather than trusts**: (i) **domain membership** —
born-private names `private`, a **member** of D9's two-state domain, introducing no new state;
(ii) **no revival** — `unlisted` appears nowhere in R8 or in the clause; (iii) **no clock collision** —
D9 clocks lifecycle and moderation **separately** from visibility, and R8 speaks only to
visibility-at-birth. **Verdict: R8 is a NARROWING INSIDE D9's domain; no contradiction.** ⊘ The one live
divergence is **disclosed, not resolved**: value.js persists **three** visibility states (⟨cmd⟩
`/usr/bin/sed -n '61p' api/src/modules/palette/model.ts` → the 3-state comment) and fourier's unpublish
target is `unlisted` (register row 9) — **that is the value.js API row's D9 reconciliation**, *never a
silent contract overwrite, and never a fourier defect*.

**c.4 — the three bands authored.** §C (C1–C5) · §D (D1–D8, **D10**–D17) · §E (E1–E20) appended to
`J-diff-shape-v2.md`. **SELF-COUNT from the settled bytes, double-run** — ⟨cmd⟩ (per band)
`/usr/bin/grep -c '^### C[0-9]' J-diff-shape-v2.md` etc.:

| band | clauses | reading |
|---|---|---|
| §C | **5** | C1 · C2 · C3 · C4 · C5 |
| §D | **16** | D1–D8 ⊕ D10–D17 — ⟨cmd⟩ `/usr/bin/grep -c '^### D9' J-diff-shape-v2.md` → **0** (the reserved number is not used) |
| §E | **20** | E1–E20 |
| **this unit** | **41** | |
| file total | **52** | ⊕ unit b's §A **6** ⊕ §B **5** |

**Every clause carries all four parts §0.4 requires.** ⟨cmd⟩ over the §C-onward slice:
`\*\*RULE` → **41** · `\*\*WITNESS` → **41** · `\*\*DISPOSITION` → **41**; and a per-clause LOCK scan
⟨cmd⟩ `/usr/bin/awk '/^### [CDE][0-9]/ {…} /LOCK/ {lock=1}'` → **no output** (zero clauses without a
LOCK), double-run. ⊘ **That scan is in this receipt because it CAUGHT FOUR**: **D16 · E9 · E10 · E19**
landed without a LOCK part on the first write — D16's S-8 method bar was present but unlabelled, and
three clauses genuinely had none. All four were cured **before commit**; the count is published because
*a clause missing a part its own §0.4 declares mandatory is defective by the document's own definition*,
and a receipt that showed only the final 41/41/41/41 could not be told from one where nothing was ever
wrong.

**c.5 — the register consumed, never re-derived.** §C1 and §D1 are the two clauses keyed to unit a's
`operation-register.md`, and they **cite its figures and re-derive none**: the six-token authority
vocabulary and `13+1+2+5+5+19 = 45`; the disposition split `CLIENTED 36 · CLIENTABLE 7 · STRUCK 1 ·
SERVER-ONLY 1 = 45`; the arms `30 + 13 + 1 + 1`. **What this unit adds is the two DECISIONS G8's close
names and the register deliberately does not make** (§3.2: *"The register makes neither decision. It
makes both checkable."*): **`save_contour` ruled `SESSION-DECLARED` with the `Idempotency-Key` channel
taken**, and **the image GETs' `ANONYMOUS` RETAINED for published assets and WITHDRAWN for the
pre-publication surface, with the cache directive bound into the same act**. §D1 additionally carries
both blindness locks (**K-1** server-side, **F-6** client-side) forward as standing contract terms.

**c.6 — WRITE-THEN-MEASURE, and what it caught.** Every published figure and every line anchor was
re-run against the **settled bytes** before commit, double-run. **Five did not reproduce as first
written; all five are corrected at the true bytes and the correction is IN THE CLAUSE, not hidden:**

1. **The unbounded trie probe returns 160 at this seat, not the baseline's 150 — and it reconciles
   without remainder.** ⟨cmd⟩ the gate's own ERE over both trees → **160**, decomposing as
   **150 source lines ⊕ 10 `Binary file …__pycache__….pyc matches` lines** (⟨cmd⟩ same probe
   `| /usr/bin/grep -c '^Binary file'` → **10**; `-vc` → **150**). The baseline's 150 is **the source-line
   arm of this same reading**. §E16 publishes both digits and the decomposition, plus the token census
   ⟨cmd⟩ `-o … | sort | uniq -c` → `147 trie · 10 TRIE · 2 Trie`, **all substring artefacts**
   (`entries`, `Tries`, `retries`, `retrieval`). The **bounded** probe is **0** on both trees, double-run.
2. **`grep -rn '401' web/src` returns 7, and all seven are coordinate digits in `moon.json`.** The
   spec's stated **ZERO** is true of the source tree and false of the naive probe: ⟨cmd⟩
   `… --include='*.ts' --include='*.vue' | wc -l` → **0**. §C3 publishes both, because *the digit is
   wrong and the command still "works"* — the same class as unit a's `__pycache__` find.
3. **The janitor sentinel's comment anchor drifted.** The clause first cited `:52`; ⟨cmd⟩
   `/usr/bin/grep -n 'self-documenting' api/services/janitor.py` → **`:54`**, and **the sentence wraps**
   — so §E18 names **both** lines (`:54` ⟶ `:55`) and the block (`:50-55`) rather than re-flowing a span
   its own command cannot return.
4. **E11's inherited arithmetic does not reproduce.** The banked cell says *"three siblings guard"*;
   ⟨cmd⟩ `/usr/bin/grep -rn 'ANIMATION_EASINGS\[' web/src --include='*.ts' --include='*.vue'` →
   **exactly two sites** — `stores/animation.ts:28` guarded twice over (optional chain **and** fallback)
   and `lib/easings.ts:105` guarded not at all. **The intent holds and the count does not**, so §E11
   prints the measurement: *one of two is unguarded, and it is the one behind a template expression*.
5. **E20's "two lines earlier" is one.** ⟨cmd⟩ `/usr/bin/sed -n '224p;225p;226p' ContourEditorCanvas.vue`
   → `getPoints,` · `points,` · `magnetRadius,` — the accessor is **one** line before the ref it
   accesses. §E20 states the measured adjacency and names the distance as *not the finding* — **the
   co-exposure is**.

⊘ **A sixth was caught by read-back rather than by a probe, and it is disclosed for that reason**: the
first assembly of the append produced a **doubled `---`** at the §B5/§C seam (an off-by-one in the
head/append split). ⟨cmd⟩ `/usr/bin/awk 'p=="---" && $0=="---" {print "DOUBLE at "NR} {p=$0}'` → **no
output** after the cure, and ⟨cmd⟩ `diff <(head -706 old) <(head -706 new)` returned **empty** at
assembly, so **unit b's 706 lines are byte-identical in the committed file**. *A structural defect that
no clause-level probe would ever have reported is the argument for reading back what you wrote.*

**c.7 — every verbatim span survives a `grep -F` of itself, and the RULE sentences survive §0.6's
instrument.** Thirteen registry/charter spans re-run from the `$R` base and from the repo root at this
seat, **double-run, all HIT (1)**: `fr-ContourSettings.md` (the E13 superset sentence ⊕ the B-1
client-derivable-bounds rider ⊕ *"two triggers, ONE cure"*) · `fr-GalleryFeaturedCarousel.md`
(*"no third option ships"*) · `fr-BasisSelector.md` (*"admit `[]` … or stop minting it"*) ·
`fr-EditorControlsDock.md` (*"The asymmetry, not an exploit, is the defect…"*) · `fr-AdminFlaggedPanel.md`
(C's scope discipline ⊕ *"grade the populated surface"*) · `fr-EquationPanel.md` (the hoisted-signal
sentence) · `fr-GallerySearchBar.md` (the WAVE-LOCK) · `fr-AdminAuditLog.md` (*"indexed equality into a"*)
· `fr-ContourPreview.md` (*"a TWO-member change"*) · `lane-crud.md` (*"flat BAG …"*, its **wrap
disclosed**: `:240` ends mid-sentence at *"the diff is a"* and `:241` completes it) · `COHESION.md`
(*"is a named prerequisite or the contract is"*, the charter's own line breaks marked `/`). And **21
normative sentences return 1** under §0.6's published instrument — **a CENSUS, not a sample, and its
arithmetic is printed**: **all 41 RULE sentences, one per clause** (§C **5** ⊕ §D **16** ⊕ §E **20**,
run as **19 + 22** in two passes and reconciling to the clause count exactly) ⊕ the two
**rendering-critical strings** a probe reads literally: the **`FR-GV-24`** repair-test lock and §E3's
**`N/A — RE-SCOPED (F-SS4REST R1)`** verdict spelling. ⊘ *The first draft of this line claimed "every
RULE" over a **19**-sentence reading — the phantom-count class in miniature, caught by this receipt's
own self-count before commit. The remaining 22 were then actually run rather than the claim narrowed*
⟨cmd⟩ `/usr/bin/tr '\n' ' ' < J-diff-shape-v2.md | /usr/bin/tr -s ' ' | /usr/bin/grep -c -F '<sentence>'`,
double-run. **A lock that cannot survive a `grep -F` of its own sentence is not carrying its source**, and
none here is in that position.

**c.8 — the one-home law, at every citing clause.** This unit **books** where the spec's rows-folded cell
books and **cites by holder name** everywhere else. Legs cited, never booked: `F-6` (NWO→SS-3) ·
`fr-AppHeader FR-AH-6` (F-W4) · `fr-GalleryView FR-GV-7` (F-W3 §X.1-v5) · `fr-ContourSettings B-1 / L-B1 /
C-2` (F.W3) · `fr-ContourSettings M-10 / L-M6 / C-19 / D-m9` (F.W3) · `fr-GalleryInfiniteGrid C-4 / D-13`
(F-W3) · `FR-GSB-1` (F-W4) · `GAB-17` (F-W4) · `VV-R2-B` (F-W4) · `fr-GalleryDraftsSection B-2` (F-W3) ·
`fr-CanvasControlsDock D-4 / L-1 / C-3` (F-W4) · `VV-R2-A` (F-W4) · `AA-10` (F-W4) · `FR-AFP-32` (F-W3) ·
`fr-ContourSettings B-4`'s `m-18` limb (F-W3). Cited-not-booked with their census cells named:
**`fr-AdminAuditLog AA-24`** (routes **F.W4 only**; held at F-W4 §2.A) · **`AA-31`** (booked §B1) ·
**`C-28`** (booked §B1) · **`GCM-1`** (booked §E4, cited §D5) · **`fr-NotationPills FR-NP-30`** (booked
§A5) · **`FR-EMT-20`** (cited at §F1, unit d's) · **`fr-BasisSelector M-10`** (the `basisFilter`
normaliser). **Booked explicitly where the host is held here**: **`fr-AdminAuditLog AA-23`** at §D15, on
the `45 = 30+13+1+1` join its own routing names — *a leg is never a new identity* — with **F.W6 keeping
only the killed-cure citation, marked as a citation**; and **`fr-GalleryInfiniteGrid R-7`** at §D10 by its
**full (record, id) pair**, the pass-4 escape named in the clause. **Record-qualification is carried at
every declared collider this unit touches**: three `C-2`s (§D10 alias · §E17 `fr-ContourEditorCanvas` ·
§G2c `fr-FourierShapeExtractor`), three `R-7`s (`lane-crud §R-7` §E18 · `GCM-3 R-7` §E6 ·
`fr-GalleryInfiniteGrid R-7` §D10), two `M-13`s (§E14 `fr-ContourSettings` vs §A5
`fr-CoefficientsSpectrum`, the homonym disarmed in the clause), three `L-B1`s, and `i-7` · `C:C-12` ·
`C-7` · `M-9` · `M-10` at their sites. **F.W5 repairs nothing (§0b) and claims credit for none of it
(FR-GIG-5's bar).**

**c.9 — the E13 superset sentence lives ONCE.** R2-1-LAW.1's requirement, measured over the settled
bytes: ⟨cmd⟩ §0.6's normalized instrument, `-c -F` of the sentence → **1** (double-run). **G13 cites
clause `E13` and quotes nothing**; no other clause, no gate cell and no sibling restates it.

#### Gate readings — BEFORE → AFTER

BEFORE is this record's own baseline table (22/22 RED-AS-EXPECTED); AFTER is measured at this seat after
the landing. **The unit turns the CLAUSE side of each gate — which is exactly what each gate's "F.W5
close" column names.** Where a gate's full green additionally requires an act or a test owned elsewhere,
the residual is stated rather than absorbed.

| gate | BEFORE (baseline) | AFTER (this seat, 2026-09-17) | verdict |
|---|---|---|---|
| **G8** — security documentation | `save_contour(req)` takes no `Depends`; router declares no `dependencies=`; register half GREEN at unit a | **§C1** lands the rule (*every operation carries exactly one explicit authority class*), the six-token vocabulary, **and the two DECISIONS the close names** — `save_contour` → `SESSION-DECLARED` ⊕ `Idempotency-Key`; image GETs → `ANONYMOUS` retained-for-published / withdrawn-for-pre-publication, **cache directive bound into the same act**. `0/45` reproduced with its mechanism (deps at `:206`/`:254`/`:262` emit no `security` block) | **RED → GREEN** *(clause ⊕ register both landed; the handler edits are the fourier API row's)* |
| **G9** — client-gap closure | 36/9 and 7-of-13 owed to unit a under lock K-1 | **§D1** keys disposition to the register **by name**, carries **K-1** and **F-6** forward as contract terms, and locks *the seven unclientted operations ARE the provenance surface* — **all seven `CLIENTABLE`, none `STRUCK`**, two sequenced (behind §C5 / §E2) with **one token per disposition cell** | **RED → GREEN** |
| **G2** — version-identity collision (V-β) | `computeContentHash(name, colors)` folds `{name, colors}` only; `findOne({_id: hash})` no slug scope; early return at `:47` | **§E1** mandates the **compound per-entity version `_id`** (fourier's `f"{viz_slug}:{set_hash}"` form), with all three value-side anchors re-measured and reproducing exactly | **RED → GREEN** *(residual, stated in the clause: the green owner's **test** — two same-content palettes keep separate histories — **does not exist today**)* |
| **G3** — chain depth (F-α) | `_write_root_version` 3 hits, the ONLY writer, `depth=0` | **§E2** states **deepen-or-retire** for the depth/parent/root quadruple; **F.W5 owns the CLAUSE, F.W6 the burn-down — no double-booking**; register row 13 sequenced behind it | **RED → GREEN** |
| **G4 ⊙** — diff-clause participation | ONE `atomdiff` comment hit; `ls api/src/lib` → No such file | **§E3** re-scopes value.js out **explicitly** under **F-SS4REST R1**, quoting the charter bullet that offered exactly two exits and naming which the owner took | **RED → GREEN** |
| **G18** — casing + envelope isomorphism | unrunnable-as-parity: value.js has no diff surface to conform | **§E3 RE-AUTHORS v1 §6 IN FULL**, block-quoted: **one probe, fourier-side**; value.js *"runs no diff probe and is not measured by one"*; a report is **COMPLETE** with the fourier probe alone and the correct rendering is **`N/A — RE-SCOPED (F-SS4REST R1)`**. The casing limb (§A2.4, unit b) is **explicitly unaffected — each side still runs its own check** | **RED → GREEN** *(both limbs: casing at §A2.4, the one-sided verdict here)* |
| **G5** — born-visibility | `forks.ts:76` `visibility: "public"` hard-coded vs fourier's `draft` | **§E4** lands **REMIX + BORN-PRIVATE** under **R8**, **with the D9 non-contradiction check written into the clause as three re-runnable tests** and the 3-state value-side divergence disclosed as the value.js API row's reconciliation | **RED → GREEN** *(residual: **a create-visibility test each side** — the green owner's)* |
| **G6** — redaction parity | value collapses to `{kind:"unavailable", ordinal}`; fourier `_readable_or_none` = 5, entry-row only | **§C5** mandates the discriminated-union placeholder **for every hop**, with the 5-site enumeration by role (def · remix · provenance · diff · versions) and the unscoped-probe artefact (6 vs 5) disclosed | **RED → GREEN** |
| **G7 ⊙** — trie disposition | 150-line unbounded artefact / 0 bounded; `atomdiff.py:12-14` guardrail | **§E16** lands **NO TRIE** under **F-TRIE**, with the 160 = 150 ⊕ 10 reconciliation, the guardrail quoted with its **wrap disclosed**, the **bilaterality correction** (one live guardrail ⊕ a deleted twin) narrowing the premise without voiding the ruling, and **dissent recorded, not resolved** | **RED → GREEN** *(and the baseline's divergence **D-1** is now reconciled at the digit rather than merely minuted)* |
| **G10 ⊙** — the like verb | no like route; sort key + compound index + `const liked = true` all ship | **§D2** lands **REMOVE the affordance** under **R4** — four witnesses, ONE identity, `fr-GalleryInfiniteGrid C-3` spelled with its record; **no third option ships**; dissent preserved | **RED → GREEN** |
| **G11 ⊙** — moderation producer-or-retire (**ADMISSION GATE**) | `FlagRequest` referenced nowhere; every `db.flags` write a fixture or migration; value.js HAS the verb | **§D3** lands **PRODUCER-as-PORT** under **F-PRODRET**, homed **F.W8**, with the producer absence proved by **enumeration** (§D16's S-8 bar applied to this wave's own proof) and the sequencing lock quoted with its elision marked | **RED → GREEN** — ▲ **and the runbook §1.3 back-edge is discharged: the ruling PRECEDED F.W1's sizing and this clause lands it, so F.W1 is unblocked on that axis at this unit's commit** |
| **G12** — unsafe GET / counter provenance | `find_one` → `$inc` → `_public_doc(doc)` on the read path | **§E6** requires an explicit verb **or** a stated mutating-GET policy against **RFC 9110 §9.2.1**, with the pre-increment serialisation shown at `:268-270`/`:272` | **RED → GREEN** — ▲ **FR-GV-24 LOCK CARRIED VERBATIM IN THE CLAUSE: repair tests MUST NOT assert a re-open increment** (the defect is SCOPE, not absence), ⊕ the *accident-vs-intent* separation so v2 does not codify the publish-path self-count |
| **G13** — cache identity ⊇ consumed fields | `extraction_cache_key` 10 · `ml_threshold` 3 — disjoint surfaces | **§E13** states the superset clause **verbatim at record case, ONCE in the document** (normalized `-c -F` → **1**), with the full key literal enumerated and the two omitted fields located at `shared.py:19-20`/`:59-60` and the short-circuit at `images.py:219-220` | **RED → GREEN** |
| **G14** — contour provenance | `store_contour_asset(..., source="editor")` with no `extraction_cache_key` | **§E14** makes an editor-saved contour a **first-class compute input**; one-hit proof at `contours.py:25` against the callee's available parameter at `image_storage.py:291`; *"two triggers, ONE cure"* at record case; **mechanism SOURCE-CERTAIN**, M-14's end-to-end arm → SS-13 | **RED → GREEN** |
| **G15** — image bounds on write | POST path carries no `image_bounds`; 29 read sites | **§E17** requires **derive-on-POST or backfill-on-write**, with the signature default shown at `image_storage.py:290` and the content-addressing inversion stated (*the overlay dies exactly when the points CHANGED*) | **RED → GREEN** |

**Tally for this unit: 15 gates · 15 RED → GREEN · 0 left RED · 0 UNRUNNABLE.** Two residuals are
**named in their clauses rather than absorbed into a green**: G2's missing separate-histories test and
G5's two create-visibility tests — both are the gates' own **green-owner** cells, not F.W5 acts.

#### Commits

- **`73e35e74`** — `docs(x-f/F.W5.c): J-diff-shape-v2 §C+§D+§E — authority, denominator and provenance,
  41 clauses each RULE/WITNESS/DISPOSITION/LOCK` (pathspec:
  `docs/tranches/X/fourier/contract/J-diff-shape-v2.md`). **One commit, one meaning**: the three bands
  plus the two consequential header cells they make true — §0's **Status** line and §0.2's **§6 row**,
  which now points at clause `E3` where the re-authored §6 is quoted in full. Splitting the header from
  the clause it addresses would have published a table cell that was false of its own file.
- this receipt — pathspec `docs/tranches/X/execution/C/F-W5.md`.

#### Residuals handed on (books nothing, cites everything)

1. **To unit d (§F/§G ⊕ the obligation list)** — **§E3's re-authored §6 is the binding frame for §F**:
   the diff envelope binds **fourier alone**, so §F restates v1 §§3.1–3.3 as a **one-sided** conformance
   surface and must not re-introduce a value.js probe. **`FR-EMT-20` is cited at §E10 and is F1's to
   book.** The **value-side obligation list** inherits three items this unit measured and deliberately
   did **not** rule: the **D9 reconciliation** (3-state `model.ts:61` vs D9's two), **V-γ's** version-row
   hole under `userSlug: string | null` (§E18), and **V-β's** compound-`_id` execution ⊕ its missing test
   (§E1). Each is the **value.js API row's**, *never a silent contract overwrite and never a fourier
   defect*.
2. **To unit e (G19/G20/G22)** — this unit **books only the ids the spec's §C/§D/§E rows-folded cells
   book**; every other id is **cited to its holder by name** (the §c.8 enumeration is the list). **No id
   is minted**, no roster entered at either end, and the **seven §2c exclusions stay excluded**. For
   **G22**: the **E11 merge is recorded in the clause as its own provenance** — `RESOLVER` ⊕ `L/M-3`,
   **both ids preserved**, with `L/M-3`'s **kill of `C/i-1`** carried (`animation_settings` on all four
   models, seat-verified at `visualization.py:129`/`:189`/`:244`/`:283`) — so unit e's G22 second item is
   discharged at the contract and unit e need only resolve-or-strike **MF-9**.
3. **To F.W8** — **§D3's port is written against §D4's flag-identity settlement**, and §D3's own lock
   says so: *a producer that lands with a different flag identity re-opens §D4 at the moment it ships*.
   **F.W8's §3 J4 consumes §D7's bound and does not author it** (that end already says so).
4. **To F.W1** — the **G11 back-edge is discharged** (c.2/§D3): the ruling preceded sizing and the clause
   is landed. **§D7's `FR-AFP-33` counterweight is now live rather than latent** — `if not flagged`
   short-circuits production's only case, so the cost was LATENT *while the queue had no producer*; the
   producer ruling changes that row's **weight**, and F.W1 re-derives FR-AFP grades **at the populated
   surface**, as F-PRODRET directs.
5. **To F.W9/W10** — **§0.6's instrument is what a conformance probe must use** on this document
   (whitespace-normalized matching on stable clause ids, never line numbers into a live file); **21 of
   this unit's normative sentences were verified under it at authoring**. §E3's rendering rule is part of
   the probe's contract: a report that marks the value.js diff probe *missing*/*pending*/*RED* is
   **mis-reading the scope**.

#### Escalations

**None.** No write outside the writable set (`J-diff-shape-v2.md` appended; this receipt appended;
`LEDGER.md` untouched — not unit c's; `COHESION.md`, the registry, the canonical, `lane-crud.md` and the
spec **unedited**). **Zero fourier bytes written**; **v1 byte-unchanged**. No ruling re-opened and none
presumed — all eight §0j.D rulings this unit consumes are cited by **ruling id** with the ruling's own
words. **E-3 honoured**: the six instrument/anchor corrections live in **the clauses themselves** and in
**this** record, never in the spec, never in v1, never in the registry. **Triumvirate status: no halt
condition approached** — no register/triple disagreement (the register agreed at first reading and this
unit only consumes it), no `(record, id)` homing failure at any of this unit's 41 clauses, and MF-9 is
unit e's.

**Handoff**: F.W5's writable set is clean after this unit's two commits; **unit d may open.**

### d

**SERVED MODEL: claude-opus-5[1m]** · seat opened 2026-09-17 17:38 EDT, branch `tranche-u`. Writable set
honoured: **one file appended**, `docs/tranches/X/fourier/contract/J-diff-shape-v2.md`, ⊕ this receipt.
**Zero fourier bytes written** — every `$F` command below is `grep`/`sed`/`ls`/`git show`/`git ls-files`
or a read-only `python3` over tracked JSON, and at this unit's close ⟨cmd⟩ (fourier tree)
`git status --porcelain | wc -l` → **0**, `git status --porcelain docs/tranches/J/design/J-diff-shape.md`
→ **0 lines**: **v1 is byte-unchanged, superseded BY REFERENCE only** (E-3). `scripts/dev/dev.sh` never
staged. `LEDGER.md` untouched — **not in unit d's writable set**.

**Serial-head note (§1c).** The serial predecessor is **unit c's contract commit `73e35e74`** ⊕ its
record commits `483cc8e9` · `145790a3` · `223f951b`; this unit opened on c's committed tree (⟨cmd⟩
`git log --oneline -1` at open → `223f951b`) and wrote only after reading it. The tree at open carried
the two standing rows (`CARRY-LEDGER.md`, another seat's; the unowned `dev.sh`) plus three **untracked**
X·KF evidence paths landed by the concurrent track — **none in F.W5's writable set**, so the *"dirty tree
at handoff halts the wave"* condition is not tripped.

**E13 — re-swept at this seat's own clock, and the window is unchanged.** ⟨cmd⟩ (double-run, 17:43 EDT)
`/usr/bin/find docs/tranches/V/coordination ../glass-ui/docs/tranches/BK/coordination
../keyframes.js/docs/tranches/V/coordination ../sci-report/atlas/docs/tranches/P/coordination
../sci-report/atlas/docs/tranches/Q/coordination -maxdepth 1 -name '*.md' -newermt '2026-09-17 17:27'`
→ **3**, and they are **the same three** unit c rowed in its addendum-beside and handed to unit e
(`…-valuejs-o20-disposition.md` · `…-constellation-o20-relay.md` · `…-bbnf-lang-9.0.0-addendum.md`).
**Nothing new arrived during unit d · 0 new `I-n` minted · 0 UNREAD in F.W5's scope.** The INBOX row is
**unit e's writable path**, not this unit's; rowing them here would be an ESCALATION, so the handoff
stands exactly as c left it.

#### Acts, in order

**d.1 — MEASURE-AT-OPEN (D-19), before a clause was written.** Every witness in §F, §G and §H was
re-measured at this seat's own clock from `$F = /Users/mkbabb/Programming/fourier-analysis`
(READ-ONLY), `$V = /Users/mkbabb/Programming/value.js` and
`$R = docs/tranches/V/megatranche/registry/adjudicated`; engine `/usr/bin/grep` (BSD) where the result
is an engine fact; **every published figure double-run** (`run1 ≡ run2`). Nothing was inherited — and
where a spec spelling did not reproduce, the **true bytes** are printed in the clause and the divergence
is named there (d.5 below).

**d.2 — §F authored, F1…F9, each RULE / WITNESS / DISPOSITION / LOCK.** Nine clauses, plus a **§F.0**
head that (i) declares the bases in the block that consumes them, (ii) **discharges §0.2's cell** —
*"§3.1–§3.3 … §F re-states the diff envelope against them (unit d)"* — by restating v1 §3's canonical
shapes as **IN FORCE, unamended**, binding the **fourier** end under §E3's R1 one-sided verdict, and
naming what v1 never spoke (the **error** envelope, §F5's subject), and (iii) records the two witness
corrections. **Zero rows double-booked**: `fr-EquationView B-2`, `fr-FunctionInput L-B1/C-1`,
`fr-FunctionInput L-M3` and the ConvergencePlot `L-M7 + C-8` pair travel as **LEGS held at F-W4**, cited
and not re-booked; **§F5 books NEITHER of its two witnesses** (`fr-EquationView C·D-02` is F.W4's,
`fr-ContourSettings M-15 / DU-missed-4 / D-m2 / D-m3` is a leg held at F.W3 per R4-6) and owns only the
server-side envelope clause; **§F7 books nothing at all** — `fr-ConvergencePlot K-13` is **TERMINAL**
per canonical errata **E6-3**, so the clause keeps the fact and loses the booking voice.

**d.3 — §G authored, G1c…G10c**, same four-part shape, all ten record-qualified at their sites.

**d.4 — §H, the value-side obligation list.** **Eight acts (`VO-1`…`VO-8`) ⊕ one explicit
NON-obligation (`VO-0`, TA-4)**, each with **ONE HOME and TWO CITATIONS**, the home spelled once (*the
X·V API row — the holder `F-W5.md` §4's `F.W5 → value.js API row` edge names*). **F.W5 claims credit for
none of them** (FR-GIG-5's bar, §0b). `VO-1`…`VO-5`, `VO-7`, `VO-8` and `VO-0` are the §4 edge's own
enumeration, one row each; **`VO-6` is a seat-measured addition, recorded as such** — the value twin
`demo/platform/transport/api-problem.ts` carries §F5's two discards verbatim (`:40` `statusText`
fallback, `:42` non-string `detail` → `undefined`), so a clause that binds both ends acquires a value
half. It renames nothing and re-books nothing. The band's **silences are measured, not assumed**: ⟨cmd⟩
base `$V`, `/usr/bin/grep -rl 'fourier-paths\|extractContours\|SimplifyRequest' api/src src demo
--include='*.ts' --include='*.vue' | wc -l` → **0** (double-run) — §G asks value.js for nothing and §F
asks for exactly `VO-6`.

**d.5 — THE TWO DECISIONS THIS UNIT WAS OWED, made in F.W5's own voice, each with its reasons and its
lock.**

| clause | the choice the spec hands the forming wave | **RULED HERE** | the lock that follows |
|---|---|---|---|
| **§F8** — THE SEAM CHOICE | *"→ F.W4 (a `plainLatex()` strip …) **or F.W5** (the hooks as a separate wire field — … the forming spec chooses the seam)"* (⟨cmd⟩ base `$R`, `grep -n -F 'the forming spec chooses the seam' fr-EquationResult.md` → `:39`) | **THE WIRE FIELD.** Every LaTeX field carries **portable** LaTeX; presentation hooks travel in their own field named for what they are. Reasons, each a measured fact: the hooks are emitted in the **library** (`latex_rendering.py:175` `:176` `:216` `:248`, all inside the three `*_sigma` renderers, the three expanded renderers clean), so a client strip leaves every other consumer to re-derive it; **a strip is a masking fallback**; and the split makes **FR-EQR-32's sink-class clause enforceable** | **F.W5 RECORDS NO DECLINE**, so **F.W4 does not land `plainLatex()` as the portability cure** and must not report a defensive strip as closing FR-EQR-4. Composes with §F1: when `latex_sigma` joins `SimplifyResponse`, it joins **portable** |
| **§G1c** — the provenance union | *"decide the moon's TRUE SOURCE or RE-AUTHOR it"*, with the record's first branch left empty — *"What moon.json WAS generated from → SS-13/undetermined"* (`fr-FourierShapeExtractor.md:51`) | **RE-AUTHOR, at F.W6, not before** — because this seat's own measurement closes the first branch the rest of the way: **no parameterisation of the present source reproduces the shipped artifact** (the crescent-alone bbox strictly *contains* the shipped one, so no subset-of-contours choice yields it either) | **DO-NOT-REGENERATE on `master` STANDS until F.W6 lands the pipeline**; a regeneration attempt **revives `L-B1` and `L-B2/C-2` at BLOCKER**. Interim posture **FROZEN with a golden-file baseline** — the instrument the owner already ruled for the frozen-asset class at **§0j.D G-15(c)** (FM-19), **adopted, not re-opened** |

**Non-contradiction checks run before those two were written**: (i) **§0j.D G-15(c)** rules FM-19
*frozen-forever with a golden-file diff* — §G1c **adopts that instrument** for the interim and rules
only on the sun/moon band, which is the band the tracked producer never covered (d.6); (ii) **no clause
in this band is ⊙ owner-gated** — ⟨cmd⟩ base `$V`, `/usr/bin/awk 'NR>=216 && NR<=244'
docs/tranches/X/fourier/waves/F-W5.md | /usr/bin/grep -c '⊙'` → **0** (the spec's four ⊙ gates — G4, G7,
G10, G11 — are all unit c's), so **no ruling is presumed here**; (iii) **ruling D9**
is untouched — `VO-7` carries §E4's 3-state disclosure forward **without amending it**, and no clause
in this band is numbered D9.

**d.6 — corrections and drifts, recorded here and in the clauses, never in the spec (E-3).**

| # | spec spelling | at the true bytes, this seat | where it landed |
|---|---|---|---|
| 1 | §F3's *"seven-keyword denylist"* placed at the API | **Seven exactly**, but in the **library**: `src/fourier_analysis/symbolic/parsing.py:80`, inside `parse_expression` | §F.0 item 1 — load-bearing: a term written against `api/` alone would not reach it |
| 2 | §F7's *"`latex`/`latex_sigma` arrive unconsumed"* | True of **ConvergencePlot** (⟨cmd⟩ `grep -c 'latex_sigma\|result.latex' ConvergencePlot.vue` → **0**); false of the view (`EquationView.vue:114-115` consumes both) | §F.0 item 2 — the clause is written against the component that renders the tooltip |
| 3 | §F9's anchor `latex_rendering.py:281` | **EXACT** — `:275` declares `budget`, `:281` is the call that drops it. **No drift**; recorded because a verified anchor is evidence too | §F9 witness |
| 4 | §G7c's *"no test runner in `web/` at all"* | No **unit** runner: ⟨cmd⟩ `grep -c 'vitest' web/package.json` → **0**. Playwright e2e exists (`:10-11`) and reads nothing of this seam (⟨cmd⟩ `grep -rlw '__fourierShapeData' web/e2e \| wc -l` → **0**) | §G7c + §G6c, stated in the precise form |
| 5 | §G2c's *"450 KB of product"* | **440 KB** re-measured — `sun.json` + `moon.json`, **220 KB each**; the untracked input `raw-contours.json` is 23 KB | §G2c witness, with the record's figure named |
| 6 | §G2c's M-2 frame (*"a tracked path exists for 5 of 7"*) | **True, and inverted**: those 5 assets have **ZERO importers**; the 2 the app renders (`sun`/`moon`) are exactly the untracked-detour pair | §G2c ▲ — it **strengthens** the prescribed direction |
| 7 | §G1c's record figures | **Reproduced first-hand, double-run**: 19/512 = **3.71 %** within 1.0 · p90 **37.55** · spacing **1.23** · Δ x-max **12.97** · Δ y-min **6.55**; sun control **32.62 %**, p90 **13.84** | §G1c witness — corroboration, not drift |
| 8 | §F2's *"61→51"* and *"exactly 50"* | **Reproduced by simulating the recurrence at `EquationView.vue:151-158`**, double-run: first over-ceiling value `v = 61 → budget = 51`; single track-click from defaults → **exactly 50**; drag end → **90**, 40 above `le=50` | §F2 witness |

**d.7 — commit.** `34b5f2be` — **one commit, one meaning**: §F, §G and §H are **one authoring act on one
file** (the obligation list is the disposition half of the same clauses and cannot be read apart from
them), so the family did not split. Pathspec only:
`git add docs/tranches/X/fourier/contract/J-diff-shape-v2.md`. The header **Status** line was updated in
the same commit because it is a statement *about* this act.

#### Gate readings — BEFORE → AFTER, at this seat, double-run

| gate | BEFORE (unit d open, 17:39) | AFTER (post-`34b5f2be`) | verdict |
|---|---|---|---|
| **G16** — canonical-geometry provenance, **TRIPWIRE** | ⟨cmd⟩ `grep -c '^### G[0-9]*c ' J-diff-shape-v2.md` → **0** · `grep -c '^### G5c' …` → **0** · `grep -c 'DO-NOT-REGENERATE' …` → **0**: **no decision existed in any document**, which is exactly why the gate was born-RED | **10** §G clauses · **G5c present** · **DO-NOT-REGENERATE ×5** · the pairing sentence greppable under §0.6's normalizer — ⟨cmd⟩ `tr '\n' ' ' < … \| tr -s ' ' \| grep -c -F '**§G1c ⊕ §G5c are gate G16'\''s close**'` → **1** | **RED → GREEN at the contract half** (the pipeline decision **WITH** the diagnosed-result-type row, paired and locked). **The product-side close is F.W6's / the build lane's**, and the tripwire stands until it lands |
| **F-band envelope clause (F5)** — the unit plan's second item; not a numbered gate | ⟨cmd⟩ `grep -c '^### F[0-9] ' J-diff-shape-v2.md` → **0** | **9** §F clauses; §F5 states the RFC 7807 term for **framework-raised** responses, adopts the 429 narrowing, and hands the client half to F.W3/F.W4 ⊕ `VO-6` | **LANDED** |
| §0.6 probe law (self-check) | — | **21 of 22** sampled RULE/LOCK sentences returned exactly **1** under the whitespace-normalized instrument; the one `0` was the probe string's own typo and returns **1** when spelled from the bytes (re-run, double-run) | **GREEN** |

#### Residuals

- **`SS-13` probes stated, not spent** (this unit adds no probe): the **HTTP/2 transport arm** at §F5
  ▲ *(the static arm needs no probe: `"" ?? x === ""` is a language fact)*, and **`L-M2`'s magnitude**
  at §G8c. Both are named at their clauses.
- **`fr-ConvergencePlot K-13` is TERMINAL** (E6-3) and §F7 books nothing; the **fact** it carried is
  preserved in the clause so a later reader does not mistake the re-homing for a withdrawal of the
  finding.
- **Dissents preserved, unresolved by this wave** (§2b): reader-1's BLOCKER filings on `L-B1` and
  `L-B2/C-2` travel **with their revival condition** inside §G1c/§G2c.
- **`VO-6` is new to the §4 enumeration.** It is recorded as a seat-measured addition at both ends (the
  clause and this receipt) so unit e's G19 set-difference reads it as *added-with-provenance*, never as
  a silent insertion.

#### Escalations

**None.** No write outside the writable set (`J-diff-shape-v2.md` appended; this receipt appended;
`LEDGER.md` untouched — not unit d's; `COHESION.md`, the registry, the canonical, `lane-crud.md`, the
spec and **every fourier byte** unedited). **v1 byte-unchanged.** No ruling re-opened and none presumed.
**Triumvirate status: no halt condition approached** — no register/triple disagreement (this unit
consumes the register and disputes nothing), **no `(record, id)` homing failure** across this unit's 19
clauses and 9 obligation rows, and MF-9 is unit e's.

**Handoff**: F.W5's writable set is clean after this unit's two commits; **unit e may open** — with the
three unrowed BK letters still standing for the INBOX row, `G19`'s set-difference now running against a
**complete** §2 clause surface (§A–§H), and `G22`/`G20` untouched by this unit.

---

### e

**SERVED MODEL: claude-fable-5-1** · the **fresh adjudicator seat** (§1c) — authored none of units
a/b/c/d's bytes · seat opened 2026-09-17 **~18:00 EDT**, branch `tranche-u`, HEAD at open **`4cd00ad0`**
(unit d's record commit `c75030ef` ⊕ one X·P row landed after it). Writable set honoured — **two files
created**, `docs/tranches/X/fourier/contract/OWNER-RULINGS-F.W5.md` and
`docs/tranches/X/coordination/value-to-fourier-cosign-J-diff-shape-v2.md`; **one file appended**,
`docs/tranches/V/coordination/INBOX.md` (⟨cmd⟩ `git diff --numstat` before commit → **`3 0`**: three
lines added, **zero** removed — no row rewritten); ⊕ this receipt. **Zero fourier bytes written** —
every `$F` command below is `grep`/`ls`/`git status`, and ⟨cmd⟩ (fourier tree) `git status --porcelain
| wc -l` → **0** at open and at close. `scripts/dev/dev.sh` in **0** of this unit's commits.
**`LEDGER.md` untouched — not in unit e's writable set** (§1a lists six paths; the ledger row is the
orchestrator's close act). **COHESION.md untouched** (§1b — the reciprocal is *requested*, never
written). **v2, the register, the spec, the canonical and the registry: unedited by this seat.**

**Serial-head note (§1c).** Predecessor = unit d's `34b5f2be` ⊕ `c75030ef`; the tree at open carried
the two standing rows (`CARRY-LEDGER.md`, another seat's; the unowned `dev.sh`) and four untracked
paths from other tracks (`KF-W4/` evidence ×2, `e2e/smoke/perf/`, `scripts/perf/`; later `e2e/visual/`
and a modified `execution/D/X-P-W2.md`) — **none in F.W5's writable set**; the *"dirty tree at
handoff"* halt is not tripped.

#### Acts, in order

**e.1 — READ WHOLE, then measured before any byte.** The spec (434 L) read whole; the record's
§Open/§Baseline/§Plan and units a–d's receipts read whole; COHESION §0j.D read at the bytes
(`:620-666`) and §0k (the fourier mail-ledger surface, `:777-830`). Every anchor the brief names was
verified at true bytes before use: §2a `:245-258` ✓ · §2b `:259-262` ✓ · §2c `:263-354` ✓ · G19 `:381`
✓ · G20 `:382` ✓ · G22 `:384` ✓ · §4 `:388-409` ✓ · §5 `:410-424` ✓ · §6 `:425-433` ✓ — **no drift**.
The canonical re-pinned: ⟨cmd⟩ `shasum -a 256 CENSUS-CANONICAL.md` → `f443627574588…` (character-match
to the frozen `f44362757458`); ⟨cmd⟩ `grep -nE '^### F\.W5(-W8)? — '` → `5078` (27) · `5092` (89);
**27 + 89 = 116**, and the roster parser's per-record `(n)` counts all reconcile to their id lists
(assertion-checked, 38 record lines).

**e.2 — G22: `MF-9` STRUCK, the E11 merge verified.** Measurements (all double-run, engine
`/usr/bin/grep`): registry-wide token-bounded `MF-9` → **1** hit, `fr-GalleryCardModal.md:56`, the
dangling cite inside GCM-10's own cure cell (**reproduces the baseline exactly**); value.js
`docs/tranches/**` → **18 files, every one a spec/check/record line ABOUT the cite** (F-W5 G22 ·
F-W6 row 45 / §2.5 · F-W8 J5/§5b · PASS-1…5 checks · this record · v2 §A3's LOCK), none a row it
names; fourier `docs/` → **0**; the `MF-` family registry-wide → **twelve heads in ONE record**,
`fr-PaperView.md`'s DU/LC missed-finding rows (`★MF-1`…`★MF-13`), whose numbering **skips 9**
(⟨cmd⟩ `grep -ow 'MF-[0-9]*' fr-PaperView.md | sort -u` → 1 2 3 4 5 6 7 8 10 11 12 13). ⊘ *A first
attempt at the fourier-side probe as `grep -r … $F/api $F/web/src` ran past 120 s — `api/__pycache__`
and the web tree are not bounded operands for a docs id; the receipt above is the bounded re-run
(`$F/docs` only, `timeout 60`), and the digit it returns is a property of the bounded probe, stated
as such.* **Adjudication**: resolving would mean choosing between a never-banked PaperView row and a
mis-key at GCM-55 — **inventing a row** (R4-10's fabrication clause); the spec's §1c forecloses it
(*"MF-9 failing to resolve (then it is struck …)"*) and F-W6 §2.5 reached the same verdict. **STRUCK
as a cite, never as a row**; GCM-10 keeps its spelling, cure and family. **Effect verified at v2**:
⟨cmd⟩ `grep -n 'MF-9' J-diff-shape-v2.md` → exactly `:299-300`, §A3's **G22 sequencing LOCK**, and
**no occurrence in any DISPOSITION or cure sentence** — the cure is quoted **without** it, which is
the LOCK's own condition. The strike's provenance record is `OWNER-RULINGS-F.W5.md` **§4** (v2's
bytes are outside unit e's set; E-3 addendum-beside, cited from the relay). **The E11 merge**: ⟨cmd⟩
`sed -n '1933,1934p'` → *"DISPOSITION — the merge, recorded here as the clause's own provenance
(G22's second item). RESOLVER … ⊕ L/M-3 … are ONE identity, MERGED — and BOTH IDS ARE PRESERVED"* —
**verified, not re-authored**; one census reading added at §4.3 (E11 books no canonical F.W5 row:
`L/M-3` is F.W4-held with an `F.W5-W8` leg, `RESOLVER` is not a canonical head).

**e.3 — the ruling block authored.** `contract/OWNER-RULINGS-F.W5.md` (**18,398 B**, line 1 the
served model): **§1** R1…R9, each row = the spec's §2a framing · the ruling id (**F-SS4REST
R1/R4/R5/R6/R7/R8/R9 · F-TRIE · F-PRODRET**) · the ruling **quoted verbatim** from COHESION §0j.D ·
whether the spec's honest default was taken (R2 · R6 · R9 yes; R7 **amended**, openly; the rest had no
default) · the v2 clause that lands it; the four ⊙ gates mapped once (G4→R1 · G7→R2 · G10→R4 ·
G11→R3); OG-F1 and G-15(c) cited as consumed. **Every one of the nine quotations returns 1** under v2
§0.6's normalised instrument over `COHESION.md` (⟨cmd⟩ `tr '\n' ' ' | tr -s ' ' | grep -c -F`),
double-run, **nine of nine**. **§2** the three decisions the spec handed the forming wave (F8 seam ·
G1c re-author · C1's two authority decisions) — listed so they are not mistaken for owner acts.
**§3** the **dissent register**: §2b quoted at its own bytes (`sed -n '261p'`), all nine dissents
indexed to where v2 carries each, **preserved, not resolved** — ⊘ *write-then-measure caught one
mis-index before commit: the first draft put FR-USB-15's dissent at v2 §C3; ⟨cmd⟩ `awk '/^### /{h=$0}
/[Dd]issent/{print h}'` over v2 → B1 · D2 · D5 · D11 · E7 · E16 · G1c · G2c — **no C3**; the row now
says so and names this register as the carrier.* **§4** the G22 minute (e.2). Self-count: ⟨cmd⟩
`grep -c '^| \*\*R[1-9]\*\* |'` → **9**.

**e.4 — G19, run both directions, once per id, over the canonical band ALONE.** Instruments (three,
each published in this seat's scratch and re-runnable from the receipt): **(i)** LHS parsed from the
canonical's own `- **fr-X** (n): ids` lines under `### F.W5 — ` and `### F.W5-W8 — ` (116, per-record
counts assertion-checked); **(ii)** for each `(record, id)`, token-bounded hits (`(?<![A-Za-z0-9_-])id(?![A-Za-z0-9_-])`)
over the RHS = **v2 ⊕ register ⊕ ruling block**, record-qualification judged **at clause scope**
(record name inside the `###` section that lands it) and collider width measured **from the canonical
itself** (records across ALL bands carrying the same token); **(iii)** reverse: every id-like
backticked token in each v2 clause's **DISPOSITION** paragraph (the booking voice), classified LHS /
excluded / other, the "other" set reviewed **by hand at the bytes** against the canonical's home row.
The seven exclusions (`AA-48` · `P-9` · `AA-44` · `SS-L-07/SS-C-10` · `AA-45` · `AA-46` · `AA-47`)
stayed excluded: v2 cites each to its holder (A1 · A2 · A3 · B5 · §5's homes) and books none — checked
in the reverse pass (they appear only as `EXCL`, never in a *Booked:* list). **Double-run, identical
readings.**

| direction | reading (run 1 ≡ run 2) |
|---|---|
| **LHS → RHS** | **114 of 116 land record-qualified** — 77 with the record named inside the landing clause, 37 record-unique across the whole canonical (the prefix is the record: `FR-AUL-*`, `GCM-*`, `GAB-*`, `FR-AFP-*`, …). **Not ∅: 2** — **`fr-ContourPreview L:L-5`** (NO hit: §E20 lands the row by its verbatim ADJUDICATED cell, `fr-ContourPreview.md:46`, and *"row 13"*, but the token `L:L-5` is nowhere in v2; the id is a 2-record collider, so it cannot be implied) · **`fr-BasisSelector m-7`** (hit at §D7 as *"Booked: `m-7` (=C-6-as-rescoped)"*, **bare**; `m-7` is a **seven-record** collider and §D7 names three other records, not BasisSelector) |
| **RHS → LHS** | 88 LHS-token mentions in booking voice, all members; the 71 non-LHS tokens reviewed one by one: 60 are legs/cites/folds **with the voice and holder stated** (`LEG — held at F-W3/F-W4`, *cited not booked*, *FOLDS*, *rides*, *do NOT re-book*), lane-crud ids (`R-4 R-5 R-6 R-7 R-1 F-γ V-γ TA-4`), body aliases of a booked head (`C-1`, `D-20`, `MIN-*`, `L-12/C-25`, `D-L12/C-22`, `L·M-1/C·C-32`), or the E11 merge pair. **Not ∅: 3 ids in a *Booked:* list whose canonical home is another wave** — **`GCM-10`** (§A3; canonical **F.W3** file-criterion §5.e, leg `F.W5-W8`) · **`GCM-1`** (§E4; canonical **F.W4**, leg `F.W5-W8` — the clause splits the share in prose but keeps the booking verb) · **`FR-EQR-4`** (§F8; canonical **F.W4**, leg `F.W5`). ⊘ Two further **folds without the holder named** are disclosed as MINOR, not escapes: `FR-GV-1` (§E5 *"FOLDS at banked severity"*; canonical F.W3) and `fr-GalleryCard L·M-4 / …` (§D17 *"folds here"*; canonical F.W3 — its quoted routing *"→ F.W3; serializer → F.W5–W8"* does name the holder) |

**Verdict: G19 is NOT ∅ — RED, by five one-token spellings, every one a v2 byte, none a substance
defect, none inside unit e's writable set.** All 116 rows have a real landing; the five are the
R4-6 mirror-hazard class (*"twenty ids sitting on two waves' operand lists at once"*) caught at the
adjudicator seat rather than inherited — and the spec's own §2c index of twenty LEG marks did not list
these three, which is exactly why a fresh seat runs the difference against the **canonical**, not
against the spec's answer sheet. **Cures, one token each, owed by a v2-writing seat as a dated
addendum (E-3)**: §E20 spell `fr-ContourPreview L:L-5` · §D7 qualify `fr-BasisSelector m-7` · §A3
`GCM-10` → `⟨LEG — held at F-W3⟩` · §E4 `GCM-1` → `⟨LEG — held at F-W4⟩` · §F8 `FR-EQR-4` → `⟨LEG —
held at F-W4⟩`. **Triumvirate status**: this is the FIRST failure of the set-difference (round 1 of
the *"∅ or halt (third failure → triumvirate)"* clause); no `(record, id)` pair has failed to home
three times; **no `F-W5-CARRY.md` authored, no check file consulted, no wave arithmetic used** — the
canonical at `f44362757458` was the sole operand. **The substitute was NOT taken**: the ruling block
is not a booking register and was not used to smuggle the five spellings into the RHS.

**e.5 — G20: the relay letter written, this end of every §4 edge declared, the reciprocal
requested.** `coordination/value-to-fourier-cosign-J-diff-shape-v2.md` (**20,202 B**, line 1 the
served model): §1 the three contract files with `shasum -a 256` digests at HEAD `4cd00ad0` (v2
`c912d76d4cf747a3…` · register `f4af6ba716d751c4…`; the ruling block by commit) and the
supersession-by-reference statement (v1 byte-unchanged, `git status --porcelain` → 0 at b/c/d's
close); **§2 all THIRTEEN §4 edges** (⟨cmd⟩ `grep -cE '^\| \*\*(X-1|F\.W5 →|FORBIDDEN)'` → **13** —
X-1 · F.W1 · F.W2 · F.W3/W4 · F.W6 · F.W7 · F.W8 · F.W9/W10 · SS-4 · SS-6 · SS-13 · value.js API row ·
FORBIDDEN), each row = F.W5's declaration ⊕ the reciprocal requested **by clause/gate id and
§-anchor, never by line** (R2-2.1), under the law quoted at its bytes (⟨cmd⟩ `grep -n -F 'Cross-repo
edges are declared FROM BOTH ENDS' COHESION.md` → `:77`); §3 the contract's condition at relay —
**G19's five spellings named, so fourier co-signs informed** and is asked to say *now* or *held for
the addendum*; §3.3 the G22 strike; §4 the four precise asks (row it · reciprocal letter in their
`F/coordination/` grammar · spine rows requested of the root seat · nothing else moves). **Delivery**:
by existence at the spec-named vehicle (F-W5 §1a; G20's close: *"the relay letter exists at
`$V/docs/tranches/X/coordination/`, is ledgered in `INBOX.md` (E13), and this spec declares this end
of every cross-edge (§4)"*) — the fourier tree is READ-ONLY to this wave, so the far-end row in
`fourier-analysis/docs/tranches/F/coordination/INBOX.md` (live since X.F.W0 unit b, COHESION §0k.1)
is the reciprocal's first act. ⊘ *Write-then-measure caught two figures before commit: the letter's
first draft said "72 clauses" (the instrument had counted §F.0's head as a clause) — the heading
count is **71** under ⟨cmd⟩ `grep -cE '^### [A-G][0-9]+c? (⊙ )?— '` (the three ⊙ headings D3 · E3 ·
E16 carry the mark before the dash; a `[A-G][0-9]+c? — ` spelling reads **68** and is wrong), and the
"21 + 21 sentences" gloss was replaced by units b/c/d's actual receipts.*

**e.6 — E13: the INBOX row appended, the four paths re-swept.** **O-22** inserted after the last
ledger row (I-34), status **SENT 2026-09-17 — AWAITING RECIPROCAL**; the **F.W5 CLOSE sweep**
paragraph appended at the file's end. Re-sweep at **18:02 EDT** (⟨cmd⟩ `find <path> -maxdepth 1
-name '*.md' -newermt '2026-09-17 17:43'` per path): V/coordination → `INBOX.md` alone; BK → the
**same three letters** unit c handed up and Track D's X.P.W2 seat rowed at 17:13–17:15 as **I-32 · I-33
· I-34 (UNREAD)** — now at mtime 17:43 with sizes 13,687 / 11,021 / 3,965 B (deltas +120 / −35 / +116
against the rowed sizes: a producer-side re-save, named, not tripped; the row is the durable mark,
D37); kf sacred ⊕ exec clone → nothing; atlas P ⊕ Q → nothing. **Result: 0 unrowed · 0 new `I-n` ·
1 `O-n` minted (O-22) · 0 UNREAD in F.W5's scope.** **Scope reading**: this seat **read I-33 §1** (the
fourier section, routed by its own cell to *"X·F's mail-ledger surface"*) row by row — every item is
an F.W0/F.W3/F.W4 render- or consumer-side row (Slider docblock PD-1 · FR-MSP-12 · the border-channel
note · cursor · `style.css` override · `useClipboard` shape · `text-admin-label` · L-10 · the Dialog
class) and **not one touches a v2 clause**; F.W5 folds nothing and rules nothing on them; the relay
into the fourier ledger is the **X formation mail seat's act per I-33's Routing cell**. I-32 and
I-34 name no F.W5 surface. **The three UNREAD status cells are Track D's and were not rewritten**
(append-only). Two standing items carried unchanged, neither F.W5's: **K-R1** and the **9.0.0
re-trigger** (both the orchestrator's, per the X-W1 OPEN sweep).

#### Gate readings — BEFORE → AFTER, at this seat, double-run

| gate | BEFORE (baseline, this record) | AFTER (this seat, 2026-09-17 18:18 EDT) | verdict |
|---|---|---|---|
| **G22** — dangling-cite resolution | `grep -rn "MF-9" $R/` → ONE hit, `fr-GalleryCardModal.md:56`, the dangling cite | **`MF-9` STRUCK as a cite** (minute: `OWNER-RULINGS-F.W5.md` §4, with the 1 / 18-about-it / 0 / skips-9 measurements); v2 quotes GCM-10's cure **without it** (`grep -n 'MF-9' v2` → the §A3 LOCK's two lines only); **the E11 merge recorded in v2's provenance** (`:1933-1934`, both ids preserved) | **RED → GREEN** |
| **G20** — co-signature actually relayed | `ls $V/docs/tranches/X/coordination/` → exactly ONE file (the atlas rulings relay); no letter, no INBOX row | ⟨cmd⟩ `/bin/ls /Users/mkbabb/Programming/value.js/docs/tranches/X/coordination/` → **2 files**, the second `value-to-fourier-cosign-J-diff-shape-v2.md`; `grep -c '^| O-22 |' INBOX.md` → **1**; **13 of 13 §4 edges declared from this end**, reciprocal requested by id | **RED → GREEN at this end** (the fourier reciprocal is, by construction, theirs — *"F.W5 itself (unit e) + the fourier side's reciprocal"*) |
| **G19** — census closure | RHS empty (`ls …/contract/` → No such file or directory) | RHS = **3 files** (`J-diff-shape-v2.md` · `operation-register.md` · `OWNER-RULINGS-F.W5.md`); LHS 116 at `f44362757458`; **LHS \ RHS = {`fr-ContourPreview L:L-5`, `fr-BasisSelector m-7`(bare)}** · **RHS \ LHS = {`GCM-10`, `GCM-1`, `FR-EQR-4`}** (booking voice, canonically held at F.W3/F.W4/F.W4); the seven exclusions excluded; 114/116 land record-qualified | **RED — NOT ∅, by five one-token v2 spellings; ESCALATED** (cures named in e.4; every one outside unit e's writable set) |

**Gates turned by this unit: G22 · G20. G19 measured honestly RED and escalated — not turned, not
masked.** No other gate touched; none read as GREEN that this seat did not turn.

#### Commits (pathspec only; `--no-verify --quiet`; session trailer on each)

- **`e8277c8e`** — `docs(x-f/F.W5.e): OWNER-RULINGS-F.W5 — the SS-4 inline ruling block (R1..R9 quoted from COHESION §0j.D by ruling id), the §2b dissent register preserved unresolved, and the G22 minute: MF-9 STRUCK as a cite` (pathspec: `docs/tranches/X/fourier/contract/OWNER-RULINGS-F.W5.md`).
- **`37e2feec`** — `docs(x-f/F.W5.e): the co-signature relay to fourier — this end of every §4 cross-edge declared, the reciprocal requested, the contract's condition at relay stated (G19 residual named); INBOX O-22 + the F.W5 close sweep (G20, E13)` (pathspec: `docs/tranches/X/coordination/value-to-fourier-cosign-J-diff-shape-v2.md` ⊕ `docs/tranches/V/coordination/INBOX.md` — **one meaning, one commit**: a relay and its ledger row cannot be read apart; `147 insertions, 0 deletions`).
- this receipt ⊕ §Close — pathspec `docs/tranches/X/execution/C/F-W5.md`.

#### Residuals handed on

1. **ESCALATION E-1 (G19) → the orchestrator / a v2-writing seat**: five one-token cures to
   `contract/J-diff-shape-v2.md` as a **dated addendum** (E-3): §E20 spell `fr-ContourPreview L:L-5` ·
   §D7 qualify `fr-BasisSelector m-7` · §A3 `GCM-10` ⟨LEG — held at F-W3⟩ · §E4 `GCM-1` ⟨LEG — held at
   F-W4⟩ · §F8 `FR-EQR-4` ⟨LEG — held at F-W4⟩. Then **re-run e.4's three instruments** (the fresh
   seat's second run of the same difference, never a re-cut roster); ∅ both ways closes G19. Two
   MINORs may ride the same addendum (name the holder at §E5 `FR-GV-1` → F.W3 and §D17's fold).
2. **To fourier (via O-22)**: the reciprocal — row the letter, co-sign by clause id, declare their end
   of the thirteen edges, say *now* or *held for the addendum*. **To the root seat**: the COHESION §2
   reciprocal edge rows (F.W5 does not write the spine).
3. **To the orchestrator**: `LEDGER.md` Track C's F.W5 row — not unit e's path; the close verb belongs
   there with this record's §Close as its source. The X formation mail seat's items **K-R1**, the
   **9.0.0 re-trigger**, and the I-33 §1 relay into the fourier ledger are unchanged and theirs.
4. **To F.W6 / F.W8**: the `MF-9` strike is recorded once (ruling block §4) — quote GCM-10's cure
   without it and cite the minute; never re-litigate the cite.

#### Escalations

**ONE — E-1 above (G19).** Its trigger is the METHOD's own: the specified cure (∅ both ways) is
**not reachable by any byte inside unit e's writable set**, and the substitute (booking through the
ruling block, or declaring ∅ over five known spellings) was refused. **No other**: no write outside the
set; no ruling re-opened; no spec, COHESION, registry, canonical, v2 or register byte edited; zero
fourier bytes; no `git stash`, no reset, no force; `dev.sh` in 0 of 2 commits.

---

## Close

**F.W5 — the shared-provenance API contract — CLOSES at the contract half: 21 of 22 gates GREEN
(G1–G18 · G21 · G22, and G20 GREEN at this end — the reciprocal is, by construction, fourier's) · G19
RED by five one-token spellings, ESCALATED with the cures named.** The five units landed **serially, peak concurrency 1**,
each committing before the next opened; the F.W5 writable set is clean at close (⟨cmd⟩ `git status
--porcelain | grep -E 'contract/|coordination/value-to-fourier|INBOX'` → no output after `37e2feec`).

| artefact (§1a) | state at close | commit(s) |
|---|---|---|
| `contract/operation-register.md` | 45 rows = 30+13+1+1, authority class ⊕ disposition on every row | `3418db60` (a) |
| `contract/J-diff-shape-v2.md` | §A–§G 71 clauses ⊕ §H (VO-0…VO-8); v1 superseded by reference, byte-unchanged | `bf3707ec` (b) · `73e35e74` (c) · `34b5f2be` (d) |
| `contract/OWNER-RULINGS-F.W5.md` | R1…R9 by ruling id, dissent register preserved, G22 minute | `e8277c8e` (e) |
| `coordination/value-to-fourier-cosign-J-diff-shape-v2.md` | 13/13 edges declared from this end; reciprocal requested | `37e2feec` (e) |
| `V/coordination/INBOX.md` | O-22 appended; F.W5 close sweep appended; 0 rows rewritten | `37e2feec` (e) |

**Gate tally at close**: G1 · G2 · G3 · G4⊙ · G5 · G6 · G7⊙ · G8 · G9 · G10⊙ · G11⊙ · G12 · G13 · G14 ·
G15 · G16 · G17 · G18 · G20 · G21 · G22 = **21 GREEN at the contract half** (G20 at this end) · **G19
RED** (e.4). Residuals named in their clauses rather than absorbed: G2's separate-histories test and
G5's two create-visibility tests (green-owner cells) · G16's product-side close (F.W6 / build lane;
DO-NOT-REGENERATE stands) · G9's clienting (F.W1/F.W4).

**Law, held**: E-3 (spec · canonical · registry · COHESION · v1 unedited by every unit) · E-1 · census
freeze (`f44362757458` the sole operand; 162/167/170 never quoted; no check file, no pass index, no
wave arithmetic; **no `F-W5-CARRY.md`**) · one home two citations · record-qualification at every
collider this wave wrote — and where v2 fell short of it, the five sites are **named, not
normalised** · pathspec commits, `dev.sh` never staged, no stash/reset/force · **E13: 0 UNREAD in
scope at open and at close**; the three UNREAD cells in the ledger are another track's rows and are
theirs to move. **VERIFIED is unmoved** — X·F's sub-tranche release close stamps it, not this wave.

**Status: CLOSED-PARTIAL (G19 escalated; reciprocal pending).** Seat: unit *e*, `claude-fable-5-1`,
2026-09-17 18:20 EDT.

---

## Close — VERIFY SEAT (independent re-run, 2026-09-17 18:25 EDT)

**SERVED MODEL: claude-opus-5[1m]** · the wave-close seat, **VERIFY-ONLY** — authored none of units
a–e's bytes and **cured nothing**. Unit e's `## Close` above is prior evidence and is **unedited**; this
section is the **addendum-beside** E-3 prescribes, not a replacement. Writable set at this seat: **this
record** ⊕ `docs/tranches/X/execution/LEDGER.md` (this wave's row only, by minimal in-place replacement).
`scripts/dev/dev.sh` never staged. **Zero fourier bytes**: ⟨cmd⟩ (fourier tree) `git status --porcelain
| wc -l` → **0**, and `git status --porcelain docs/tranches/J/design/J-diff-shape.md` → **0 lines** — **v1
byte-unchanged, superseded BY REFERENCE only**.

⊘ **The spec has no `§Verification Artefacts` section** — ⟨cmd⟩ `/usr/bin/grep -n -i 'verification
artefact\|verification artifact' docs/tranches/X/fourier/waves/F-W5.md` → **no output**. The wave's
verification surface is **§3's 22 gates** ⊕ **§6's five-item close checklist** ⊕ **§1a's artefact set**,
and those are what this seat ran. Naming the absence rather than silently substituting is the point:
*a seat that runs an artefact the spec does not contain has verified something else.*

### 1 — Commit roster: every commit exists, and every one touched only its unit's writable set

⟨cmd⟩ `git show --stat --oneline <sha>` on all thirteen; ⟨cmd⟩ `git show --name-only --format= <sha> |
grep -c 'dev\.sh'` → **0 on all thirteen**; ⟨cmd⟩ `git log -1 --format='%b' <sha> | grep -c
'Claude-Session:'` → **1 on all thirteen**.

| unit | commits | paths touched | inside §1a? |
|---|---|---|---|
| **a** | `3418db60` · `d7650002` | `contract/operation-register.md` (+452) · this record (+173/−1) | **YES** — the one deletion is the `*(appended by each unit as it lands; nothing here yet)*` placeholder, as unit a disclosed |
| **b** | `bf3707ec` · `1cbde268` | `contract/J-diff-shape-v2.md` (+715) · this record (+174/−0) | **YES** |
| **c** | `73e35e74` · `483cc8e9` · `145790a3` · `223f951b` | `contract/J-diff-shape-v2.md` (+1535/−10) · this record (+262, +26/−2, +6/−2) | **YES** — the 10 v2 deletions are **b's own pending-marker lines** (*"§C–§E land at unit c"*, the §6 placeholder row); the record deletions are **c's own** E13 paragraph, replaced by its addendum-beside |
| **d** | `34b5f2be` · `c75030ef` | `contract/J-diff-shape-v2.md` (+843/−7) · this record (+134) | **YES** — the 7 deletions are **c's pending markers** (*"§F–§G … at unit d"*) |
| **e** | `e8277c8e` · `37e2feec` · `856cef38` | `contract/OWNER-RULINGS-F.W5.md` (+182) · `coordination/value-to-fourier-cosign-J-diff-shape-v2.md` (+144) ⊕ `V/coordination/INBOX.md` (**+3/−0**) · this record (+226) | **YES** — INBOX append-only proved by the numstat: **zero deletions, no row rewritten** |

**LANDED-WRONG (bounds): NONE.** No commit reaches outside the six §1a paths ⊕ this record; no seat
edited another seat's rows; **`LEDGER.md` was touched by no unit** (each declined it by name as outside
its set), which is why this seat lands that row. Pathspec discipline held; no `-A`; no stash, reset or
force anywhere. ▲ **One LANDED-WRONG of the RECEIPT class is found and is disclosed at §2's foot** — unit
e's ruling-block byte figure does not reproduce (18,398 published vs **18,702** at the only commit that
ever touched the file). It is a **MINOR gloss, load-bearing for nothing**, and it is named here so
*"landed-wrong: none"* is never read wider than the bounds question it answers.

### 2 — The 22 gates, re-run at this seat. BEFORE = this record's own baseline; AFTER = my own bytes

Engine `/usr/bin/grep` (BSD) where the result is an engine fact. **Every reading below double-run** —
⟨cmd⟩ the whole battery written to a script and run twice, ⟨cmd⟩ `diff run1 run2` → **no output**.

| gate | BEFORE (baseline) | AFTER — **measured at THIS seat**, not read from a receipt | verdict |
|---|---|---|---|
| **G1** | `class AuditEntry` one hit | `admin.py:94` reproduces; v2 `### A1 — Row identity on the wire` → **1** | **GREEN** |
| **G2** | `computeContentHash(name, colors)`; `findOne({_id: hash})`; early return `:47` | all three reproduce verbatim; `### E1 — Compound per-entity version identity` → **1** | **GREEN** *(residual: the separate-histories test — green-owner's)* |
| **G3** | `_write_root_version` 3 hits | **3** (`--include='*.py'`); `### E2 — Chain depth: deepen or retire` → **1** | **GREEN** |
| **G4 ⊙** | ONE `atomdiff` comment hit; `ls api/src/lib` → No such file | **1** hit; dir still absent; `N/A — RE-SCOPED (F-SS4REST R1)` → **2** | **GREEN** |
| **G5** | `forks.ts:76` `visibility: "public",` | reproduces at the line; `### E4 … RULED: REMIX + BORN-PRIVATE` → **1** | **GREEN** *(residual: two create-visibility tests)* |
| **G6** | collapse to `{kind:"unavailable"}`; `_readable_or_none` 5 | `:179`/`:197` reproduce; **5** scoped; `### C5 — Redaction parity` → **1** | **GREEN** |
| **G7 ⊙** | bounded **0**, unbounded 150 | bounded **0**; unbounded **160 = 150 source ⊕ 10 `Binary file` lines** (⟨cmd⟩ `\| grep -c '^Binary file'` → **10**, `-vc` → **150**) — **unit c's reconciliation reproduces exactly and D-1 is closed at the digit, not merely minuted**; guardrail live at `atomdiff.py:12-14`; `### E16 ⊙ — … RULED: NO TRIE` → **1** | **GREEN** |
| **G8** | 0 security schemes; `save_contour(req)` bare | **0** schemes; handler unchanged; **register: 45 of 45 rows carry an authority class**, self-counted at this seat from the settled bytes — `ADMIN-TOKEN` 13 · `ANONYMOUS` 19 · `OWNER-IN-BODY` 5 · `VIEWER-SCOPED` 5 · `SESSION-IN-BODY` 2 · `SESSION-DECLARED` 1 = **45**; `### C1 — Authority class per operation` → **1** | **GREEN** |
| **G9** | 36/9 owed to unit a | **register: 45 of 45 rows carry a disposition** — `CLIENTED` **36** · `CLIENTABLE` **7** · `STRUCK` **1** · `SERVER-ONLY` **1** = **45**, my own count; `### D1 — Per-operation disposition, keyed to the register` → **1** | **GREEN** |
| **G10 ⊙** | no like route | **0** like routes; `### D2 — The like verb ‡ — RULED: REMOVE THE AFFORDANCE` → **1** | **GREEN** |
| **G11 ⊙** | `FlagRequest` one hit, the definition | **1**; `### D3 ⊙ — … RULED: PRODUCER, AS A PORT` → **1** | **GREEN** |
| **G12** | `$inc {views:1}` on the read path | `visualizations.py:269` reproduces; `RFC 9110` → **1** | **GREEN** |
| **G13** | cache-key 10 · `ml_threshold` 3, disjoint | **10** · **3**; `### E13 — Cache identity ⊇ consumed fields ‡` → **1** | **GREEN** |
| **G14** | `source="editor"`, no cache key | `contours.py:25` reproduces; `### E14 — … FIRST CLASS ‡` → **1** | **GREEN** |
| **G15** | `image_bounds` 29 read sites, none on POST | **29**; `### E17 — Image bounds on write ‡` → **1** | **GREEN** |
| **G16** | tracked `moon.json`, one | **1**; `### G1c` → **1** ⊕ `### G5c` → **1** ⊕ `DO-NOT-REGENERATE` → **5** | **GREEN at the contract half** (product side F.W6/build lane; tripwire stands) |
| **G17** | ONE unchecked `(await res.json()) as T` | **1**; `### A3 — Boundary-validation **evenness**` → **1** | **GREEN** |
| **G18** | unrunnable-as-parity | casing limb `### A2` → **1** ⊕ one-sided verdict `### E3 ⊙ — … RE-SCOPE, and v1 §6 RE-AUTHORED ONE-SIDED` → **1** | **GREEN** |
| **G19** | RHS empty | **RED — NOT ∅. Reproduced independently at this seat, not accepted from unit e.** See §3 below | **RED** |
| **G20** | `coordination/` 1 file | **2** files; **13** §4 edges declared; `^\| O-22 \|` in INBOX → **1** | **GREEN at this end** |
| **G21** | no register | `operation-register.md`, 38,255 B, 452 L; **45 rows = 30 public-non-admin + 13 admin + 1 app + 1 gallery**, self-counted twice at this seat | **GREEN** |
| **G22** | `MF-9` one registry hit | **1** registry hit; in v2 `MF-9` occurs at **`:299-300` ONLY** — §A3's G22 sequencing LOCK — so **GCM-10's cure is quoted without it**, the LOCK's own condition; E11 merge provenance present at `:1933-1934`, **both ids preserved** | **GREEN** |

**Tally at this seat: 21 GREEN · 1 RED (G19) · 0 UNRUNNABLE · 0 gate read GREEN that its own close
definition does not support.** The tally **agrees with unit e's** — arrived at independently, from the
bytes, not from the receipt.

⊘ **Structural self-counts, mine, double-run** — because a gate table that trusts the authoring seat's
arithmetic has verified nothing: v2 `J-diff-shape-v2.md` **236,694 B / 3,076 L**, **71 clause headings**
partitioned **A 6 · B 5 · C 5 · D 16 · E 20 · F 9 · G 10 = 71**, with `**RULE` **71** · `**WITNESS` **71**
· `**DISPOSITION` **71** (three partitions of the same 71, none derived from another) and `^### D9` →
**0**, the reservation held. Ruling block **18,702 B**, `^| **R[1-9]** |` → **9**. Relay letter
**20,202 B**, 13 edges. **The FOUR created artefacts carry `SERVED MODEL:` at line 1** (register · v2 ·
ruling block · relay letter), as does this record; **`INBOX.md` does not, and must not** — it is §1a's
**append-only** ledger, not a document this wave authored, and its line 1 is the ledger's own masthead.
⊘ *A first draft of this line said "every one of the **five** artefacts", which is **false of INBOX.md**
— caught by this seat's own write-then-measure (⟨cmd⟩ `head -1` across all six paths) and corrected at
the true bytes rather than left standing. Naming five and checking four is the quantifier defect §1a
itself was repaired for at repair round 5.*

⊘ **ONE published figure of units a–e does NOT reproduce, and it is disclosed rather than carried.**
Unit e's **e.3** publishes the ruling block at **18,398 B**; the settled bytes are **18,702 B** — ⟨cmd⟩
`git show e8277c8e:…/OWNER-RULINGS-F.W5.md | wc -c` → **18702**, `git show HEAD:…` → **18702**, working
tree → **18702**, and ⟨cmd⟩ `git log --oneline -- …` → **1** commit ever touched the file, so it never
held the published size. **Severity MINOR — a byte-size gloss in a receipt; no gate, no count and no
clause rests on it**, and unit e's *structural* self-count for the same file (`^| **R[1-9]** |` → **9**)
reproduces exactly. Every other published artefact figure across all five units reproduces **to the
byte** at the commit that landed it: register **38,255 B / 452 L** (`3418db60`) · v2 **52,241 B / 715 L**
at b's commit (`bf3707ec`) · relay **20,202 B** (`37e2feec`) · v2's **71** clause headings at HEAD.
**Recorded, not cured — this seat cures nothing** (E-3: the correction is a dated addendum in this
record, never an edit to unit e's rows).

### 3 — G19, re-run at this seat over the canonical alone. The escalation is REAL

**Operand verified first**: ⟨cmd⟩ `shasum -a 256 CENSUS-CANONICAL.md` → **`f443627574581ec2…`**,
character-match to the frozen pin; ⟨cmd⟩ `grep -nE '^### F\.W5(-W8)? — '` → `5078` (**27**) · `5092`
(**89**). ▲ **And the 116 is closed at the ID level, not at the declared count** — ⟨cmd⟩ summing each
roster line's `(n)` → **27 ⊕ 89 = 116**, and ⟨cmd⟩ counting the backticked ids on the same lines →
**27 ⊕ 89 = 116**. *Two independent partitions agreeing is what makes the denominator admissible; the
declared count alone would only have re-proved the canonical's own header.* ⊘ *Write-then-measure caught
one of mine: a first pass took the `F.W5-W8` roster's end as `NR<5140` and summed **101** — it had run
into **F.W9**'s roster (`### F.W9` at `:5126`). The boundary was re-cut from `grep -nE '^### '` and both
readings then closed at 116. A denominator taken from a guessed window is the phantom class, mine.*

**The five spellings, each re-measured at this seat across ALL THREE RHS files:**

| id | canonical home | at the RHS | verdict |
|---|---|---|---|
| **`fr-ContourPreview L:L-5`** | canonical **F.W5** roster (⟨cmd⟩ the band line: `- **fr-ContourPreview** (1): \`L:L-5\``) | ⟨cmd⟩ `grep -ow -F 'L:L-5'` → **v2 0 · register 0 · ruling block 0** | **REAL LHS\RHS miss** — the row lands by its verbatim ADJUDICATED cell, but the token is nowhere; a 2-record collider cannot be implied |
| **`fr-BasisSelector m-7`** | canonical **F.W5-W8** roster (`- **fr-BasisSelector** (3): \`M-9\` · \`M-14\` · \`m-7\``) | present **3×**, and the booking one is `:1231` **`DISPOSITION.** Booked: **`m-7`** (=C-6-as-rescoped)** — **bare** | **REAL** — a seven-record collider entering a Booked list unqualified |
| **`GCM-10`** | canonical `:2897` → **F.W3** <sub>legs: F.W5-W8</sub> | `:285`, inside §A3's `**DISPOSITION.** Booked:` sentence | **REAL RHS\LHS** — booking voice on an F.W3-held id |
| **`GCM-1`** | canonical `:2888` → **F.W4** <sub>legs: F.W5-W8</sub> | `:1716` `Booked: … ⊕ **\`GCM-1\`** ⊕ …` (the clause splits the share in prose at `:1717` but keeps the verb) | **REAL** |
| **`FR-EQR-4`** | canonical `:2140` → **F.W4** <sub>legs: F.W5</sub> | `:2617` `**DISPOSITION.** Booked: **\`FR-EQR-4\`**` | **REAL** |

**The seven exclusions stayed excluded**, checked at my own bytes: `AA-48` 1 · `AA-45` 1 · `AA-46` 1 ·
`AA-47` 3 · `P-9` 2 occurrences in v2 — **every one in citation voice with its holder named** (`AA-45`
*"whose one home is `F-W10.md` §2.5"* · `AA-46` *"cited as EVIDENCE with its kill noted, never as an
operand"* · `AA-47` *"is cited, not booked"* · `P-9` *"is CITED; its home is F.W4"*) — and `AA-44` **0** ·
`SS-L-07` **0** · `SS-C-10` **0**. **None booked. No exclusion folded into either side.**

**Verdict: G19 is RED, and the RED is honest.** All 116 canonical rows have a real landing; the defect is
**five one-token spellings in `J-diff-shape-v2.md`**, every one outside unit e's writable set, none a
substance defect, **none masked and none normalised away**. ▲ **This seat cures nothing** (VERIFY-ONLY),
and it did **not** re-cut the roster to make the difference close — the canonical at `f44362757458` was
the sole operand at both ends, no check file, no pass index, no wave arithmetic, **no `F-W5-CARRY.md`**.
**Triumvirate: round 1 of three. No `(record, id)` pair has failed to home three times.**

### 4 — §6's close checklist, item by item

| § 6 item | reading at this seat | verdict |
|---|---|---|
| **1. G19 both directions over the canonical band alone** | run; **NOT ∅**; operand pinned at `f44362757458`; the seven exclusions excluded | **RUN — RED, escalated** |
| **2. G22: resolve or STRIKE MF-9; record the E11 merge** | STRUCK as a cite (minute at ruling block §4); `MF-9` in v2 only at the §A3 LOCK; E11 merge at v2 `:1933-1934`, both ids preserved | **DONE** |
| **3. G20: relay letter, E13 INBOX row, reciprocal requested** | letter exists (20,202 B), **13/13** edges declared, `O-22` rowed **SENT — AWAITING RECIPROCAL** | **DONE at this end** |
| **4. Commit discipline** | 13/13 pathspec, 13/13 session trailer, `dev.sh` in **0**, each unit committed before the next opened | **HELD** |
| **5. No wave closes with UNREAD mail** | §5 below | **HELD** |

### 5 — E13: the four paths re-swept at this seat's own clock (18:25 EDT)

⟨cmd⟩ `find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 17:43'`, per path: `V/coordination` →
**1** (`INBOX.md`, ours) · BK → **3** (the same three letters) · keyframes `V/coordination` → **0** ·
atlas `P/coordination` → **0** · atlas `Q/coordination` → **0**. **Nothing arrived after unit e's close
sweep.**

**Status-cell scan, never a bare `grep -i unread`** (X.P.W0 CHECK 1 D-1): six ledger rows contain the
literal, **three carry it in their STATUS cell** — `I-32` · `I-33` · `I-34`, all **rowed 2026-09-17 by
Track D's X.P.W2 seat**, all routed by their own **Routing** cells to *the X formation mail seat / X-W0.j*
— **not to F.W5**. The other three (`O-20` · `I-30` · `I-31`) carry it inside sweep prose, not as status.
▲ **And the scope claim is verified rather than asserted**: ⟨cmd⟩ over all three letters for
`J-diff` → **0 · 0 · 0**, `F\.W5` → **0 · 0 · 0**, `operation-register|co-sign` → **0 · 0 · 0**. **No
letter in the window names a v2 clause, the register, or the co-signature.**

**Result: 0 unrowed · 0 new `I-n` · 0 UNREAD in F.W5's scope.** The three UNREAD status cells are another
track's rows and **were not rewritten** by this seat (append-only; they are theirs to move).

### 6 — Residuals, each with a named owner

| # | residual | owner |
|---|---|---|
| **R-1** | **G19's five one-token cures** to `contract/J-diff-shape-v2.md`, as a **dated addendum-beside** (E-3): §E20 spell `fr-ContourPreview L:L-5` · §D7 qualify `fr-BasisSelector m-7` · §A3 `GCM-10` ⟨LEG — held at F-W3⟩ · §E4 `GCM-1` ⟨LEG — held at F-W4⟩ · §F8 `FR-EQR-4` ⟨LEG — held at F-W4⟩; then re-run unit e's three instruments. Two MINORs may ride it (§E5 `FR-GV-1` → F.W3; §D17's fold) | **the orchestrator → a v2-writing seat** (no F.W5 seat's writable set reaches it) |
| **R-2** | the **fourier reciprocal**: row O-22, co-sign by clause id, declare their end of the thirteen edges, answer *now* or *held for the addendum* | **fourier-analysis** (via `F/coordination/INBOX.md`, COHESION §0k.1) |
| **R-3** | the **COHESION §2 reciprocal edge rows** — F.W5 does not write the spine (§1b) | **the root seat** |
| **R-4** | **G2's** separate-histories test · **G5's** two create-visibility tests — named in their clauses, absorbed into no green | **the value.js API row** (green-owner cells) |
| **R-5** | **G16's product-side close**; **DO-NOT-REGENERATE on `master` stands**, and a regeneration revives `L-B1` and `L-B2/C-2` at **BLOCKER** | **F.W6 / the build lane** |
| **R-6** | **G9's clienting** of the seven `CLIENTABLE` operations | **F.W1 / F.W4** |
| **R-7** | **G11's port** of `POST /:slug/flag` under F-PRODRET | **F.W8** |
| **R-8** | the **D9 reconciliation** (value.js persists 3-state visibility; D9 rules two) · **V-β** compound `_id` · **V-γ** attribution — never a silent contract overwrite, never a fourier defect | **the value.js API row** (§H `VO-1`…`VO-8`) |
| **R-9** | **`I-32`/`I-33`/`I-34`**, the three glass-ui BK letters, and the standing **K-R1** ⊕ **9.0.0 re-trigger** items | **the X formation mail seat / X-W0.j** — read, out of F.W5's scope, not F.W5's to move |

### 7 — Escalations

**ONE, inherited and CONFIRMED: E-1 (G19).** Re-measured independently at this seat and **upheld** — the
specified cure (∅ both directions) is not reachable by any byte inside any F.W5 seat's writable set, and
the substitutes (booking through the ruling block; declaring ∅ over five known spellings) were refused at
unit e and are refused again here. **No new escalation.** No write outside this seat's set; no gate
cured; no spec, COHESION, registry, canonical, v2, register, ruling-block or relay byte edited by this
seat; **zero fourier bytes**; no stash, no reset, no force.

### 8 — The four verbs

| verb | value | moved by | evidence |
|---|---|---|---|
| AUDITED | **YES** | unchanged | the 66-record adjudicated band ⊕ the frozen canonical ⊕ lane-crud ⊕ the intake adjudication |
| SPECIFIED | **YES** | unchanged | the fresh-Fable fold, 2026-08-28 |
| **IMPLEMENTED** | **NO → YES** | **this wave, this close** | the five §1a artefacts exist and carry their content: register 45/45 · v2 71 clauses ⊕ §H · ruling block R1–R9 · relay 13/13 edges · INBOX `O-22`. Thirteen commits, all inside bounds |
| VERIFIED | **NO** | **unmoved — and deliberately** | **§0's own evidence cell**: *"stamped only at X·F's sub-tranche release close"*. This wave's seat does not hold that stamp, and G19 is RED besides. **A close seat that stamps VERIFIED here would be stamping a verb the spec assigns elsewhere** |

**VERDICT: PARTIAL.** F.W5's contract half is **landed and verified at 21 of 22 gates**, every artefact
in bounds, every law held (E-3 · census freeze · one-home-two-citations · record-qualification ·
pathspec · E13). **What remains is G19's ∅-closure** — five one-token spellings in v2, owner named at
**R-1**, cures written out and re-runnable. Nothing is masked, nothing is inherited, and **no gate in
this table was read GREEN that this seat did not measure itself**.

**Seat**: wave-close (VERIFY-ONLY), `claude-opus-5[1m]`, 2026-09-17 18:25 EDT.

---

## Check 1

**SERVED MODEL: claude-opus-5[1m]** · FRESH ADVERSARIAL CHECK (L-20, pass 1), 2026-09-17, VERIFY-ONLY —
authored none of units a–e's bytes and none of the close seat's. **Cures nothing.** The wave's `## Close`
and `## Close — VERIFY SEAT` above are prior evidence and are **unedited**; this section is the
addendum-beside E-3 prescribes. Writable set at this seat: **this record** ⊕ `execution/LEDGER.md`
(append only). `scripts/dev/dev.sh` never staged. Every reading below **double-run** — the 22-gate battery
was written to a script and run twice, ⟨cmd⟩ `diff run1 run2` → **no output**.

### C1.1 — What reproduced

| axis | reading at THIS seat | verdict |
|---|---|---|
| **(1) claimed GREENs** | **21 of 21 reproduce.** G1 `admin.py:94` · G2 `hash.ts:8`/`paletteVersion.ts:14`/`:47` · G3 **3** · G4 **1** hit ⊕ `api/src/lib` absent ⊕ `N/A — RE-SCOPED (F-SS4REST R1)` **2** · G5 `forks.ts:76` · G6 **5** ⊕ `:179`/`:197` · G7 bounded **0**, unbounded **160 = 150 ⊕ 10 Binary** (unit c's reconciliation reproduces exactly) · G8 **0** schemes ⊕ register **45/45** authority (`13+19+5+1+2+5`) · G9 register **45/45** disposition (`36+7+1+1`) · G10 **0** like routes · G11 `FlagRequest` **1** (scoped) · G12 `visualizations.py:269` · G13 **10**/**3** · G14 `contours.py:25` · G15 **29** · G16 `moon.json` **1** ⊕ `### G1c`/`### G5c` ⊕ `DO-NOT-REGENERATE` **5** · G17 **1** · G18 `### A2` ⊕ `### E3` · G20 **2** files ⊕ **13** edges ⊕ `O-22` **1** · G21 **45** rows = **30+13+1+1** · G22 registry **1**, in v2 only at `:299-300` (the §A3 LOCK) | **0 claimed GREEN failed** |
| **(2) bounds** | ⟨cmd⟩ `git show --name-only` over **all 15** wave commits → the union is exactly **7 paths**: the five §1a artefacts ⊕ this record ⊕ `LEDGER.md`. `dev.sh` in **0 of 15**; `Claude-Session:` trailer in **15 of 15**; no `-A`, no stash/reset/force | **CLEAN** |
| **(3) masking** | ⟨cmd⟩ over the whole wave diff for `test.skip\|test.fixme\|xit(\|allowlist\|node_modules/\|@ts-ignore\|eslint-disable\|try {\|catch (` → **one hit, and it is a `-not -path '*/node_modules/*'` exclusion inside a `find` probe**. No try/catch round a defect, no skip, no allowlist, no copied producer selector, no patched `node_modules`, no narrowed assertion | **NONE** |
| **(4) commit families** | a `[3418db60]` · b `[bf3707ec]` · c `[73e35e74]` · d `[34b5f2be]` · e `[e8277c8e]` ⊕ `[37e2feec]` (relay ⊕ its INBOX row, **one meaning, kept together**); each unit committed before the next opened (log order verified). Runbook §3.4 declares **no** F.W5 same-commit lock | **HELD** |
| **(5) E-3** | ⟨cmd⟩ `git diff --stat 6d4221c5..HEAD -- registry/adjudicated fourier/waves fourier/conformance fourier/carry` → **no output**. `COHESION.md` moved only at `f67cf619`, **another track's commit**, absent from F.W5's union. fourier tree ⟨cmd⟩ `git status --porcelain \| wc -l` → **0**; v1 `J-diff-shape.md` → **0 lines** | **HELD** |
| **(6) mail** | three `UNREAD` status cells (`I-32`·`I-33`·`I-34`) verified **out of scope at their own bytes**: ⟨cmd⟩ per letter for `J-diff` / `F\.W5` / `operation-register\|co-sign` → **0 · 0 · 0** on all three; each Routing cell names **X-W0.j / the X formation mail seat**, not F.W5. `O-22` appended `+3/−0` | **0 UNREAD in scope** |
| **(7) four verbs** | IMPLEMENTED **NO→YES** (the five artefacts exist and carry their content — re-counted here). VERIFIED **unmoved**, per §0's own evidence cell (*"stamped only at X·F's sub-tranche release close"*). The spec's own §0 table is byte-untouched | **LAWFUL** |
| **(9) published figures** | v2 **236,694 B / 3,076 L**, **71** clause headings partitioned **A6·B5·C5·D16·E20·F9·G10 = 71**, `^**RULE`/`^**WITNESS`/`^**DISPOSITION` **71/71/71**, `^### D9` → **0** · register **38,255 B / 452 L** at `3418db60` · v2 **52,241 B / 715 L** at `bf3707ec` · relay **20,202 B** · ruling block **18,702 B**. Canonical ⟨cmd⟩ `shasum -a 256` → `f443627574581ec2…`; rosters **27 ⊕ 89 = 116**, closed independently at the declared `(n)` sum **and** at the backticked-id count | **REPRODUCE** |

**(8) goal criterion, at the bytes.** §0a's clause test is met structurally: **71 of 71 clauses carry
RULE · WITNESS · DISPOSITION and a lock** — ⟨cmd⟩ an `awk` walk keyed on `/LOCK/` ⊕ `/▲/` (v2 §0.4's own
legend: *"`▲` = a lock that binds the repair"*) returns **no bare clause**; §H carries `VO-1`…`VO-8` ⊕
`VO-0`. *A clause that names no witness is not a clause* holds at 71/71. The co-signature half of §0a is
**relayed, not received** — which is what §3's G20 close column itself defines, the reciprocal being
fourier's act.

### C1.2 — Successor conjuncts

| successor | its F.W5 conjunct, at that spec's bytes | state |
|---|---|---|
| **F.W6** | `:558` *"DEPENDS — HARD; F.W5 STATES, F.W6 BURNS"* — the clause set, not a gate | **GREEN** (71 clauses landed). F.W6's ledger cell names `FW6-G19`, **its own** gate id, not F.W5's G19 |
| **F.W7** | `:83` — F.W0 · **F.W5 §2 `E16` ⊕ §3 `G7` (same identity); §2 `E1`, §2 `E3` ⊕ §3 `G4`, §2 `E10`** · the G-F7-1 ruling | **ALL GREEN** — `### E16` · `### E1` · `### E3` · `### E10` all present (⟨cmd⟩ → 1 each), G7/G4 GREEN, G-F7-1 ruled (F-TRIE ≡ G-F7-1). **Lawfully unblocked on its F.W5 axis** |
| **F.W8** | `:63` — *"F.W5 (the ADMISSION KEYSTONE — its three artifacts are inputs, not prose)"* | **GREEN** (three artifacts exist). F.W8 stays blocked on **F.W1.close** and **F.W2**, neither of which this wave touches |

**G19 is a conjunct of no successor.** No successor is blocked by the RED.

### C1.3 — Register: severity · claim · receipt · cure

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** | **G19 was left RED and escalated although its cure is inside the WAVE's own §1a writable set, at iteration 1 of the spec's own three-iteration allowance — and the escalation's stated ground does not reproduce against §1a.** The close's §7 reads *"the specified cure (∅ both directions) is not reachable by any byte inside **any F.W5 seat's** writable set"*. §1a `:63` grants this wave `$V/docs/tranches/X/fourier/contract/J-diff-shape-v2.md` — **`create`** — and §1c `:90-92` assigns **units b, c and d** as its writers; the five cures land in §A3 (b), §D7/§E4/§E20 (c) and §F8 (d). The unit-level partition that put v2 outside *unit e's* set is the wave's own serial plan, not a spec bound. Runbook **§5.7** names the loop: *"any **third** diagnose→edit→re-measure iteration on one gate"* is the triumvirate trigger — iterations 1 and 2 are the prescribed path, and §1c spells the same allowance (*"a `(record, id)` pair … failing to home **three times**"*). §6 item 1 says **"∅ or halt"**; the wave reached neither, and the record's own §4 marks that item **"RUN — RED, escalated"**, not DONE. **Axis-10 adjudication: NOT relieved.** G19's §3 green-owner cell is **"F.W5 itself (unit e, closing)"** — not producer-owned, not routed to a successor, and named as no honest-RED; ⟨cmd⟩ `grep -niE 'escalat' F-W5.md` → **one hit, `:181`, unrelated prose**: the spec offers this gate no escalation exit | ⟨cmd⟩ `sed -n '63p;90,92p' docs/tranches/X/fourier/waves/F-W5.md` → the `create` grant and the three writer rows · ⟨cmd⟩ `sed -n '637,641p' docs/tranches/X/EXECUTION-RUNBOOK.md` → §5.7's *third*-iteration trigger · record `:1414-1415` (the falsified ground) · record `:1373` (item 1 not DONE). **The five spellings themselves reproduce exactly at this seat**: `L:L-5` → **0** across all three RHS files · `m-7` booked **bare** at v2 `:1231` · `GCM-10` `:285` (canonical `:2897` → **F.W3**) · `GCM-1` `:1716` (canonical `:2888` → **F.W4**) · `FR-EQR-4` `:2617` (canonical `:2140` → **F.W4**) — all in `**DISPOSITION.** Booked:` voice | Open a v2-writing seat under the wave's own §1a grant, land the five one-token edits as a **dated addendum-beside inside v2** (E-3, exactly as the record's **R-1** already prescribes), re-run unit e's three instruments, and close G19 at ∅ both ways — **iteration 2 of three, the loop §5.7 names.** Only if that second run is also non-∅ does the escalation become the spec's prescribed act |
| **D-2** | MINOR | The **baseline's G11 cell** publishes ⟨cmd⟩ `grep -rn "FlagRequest" $F/api $F/web/src` → *"**exactly one hit**, the definition"*. As spelled it returns **two** lines — the second is `Binary file api/models/__pycache__/admin.cpython-314.pyc matches`. The **substance reproduces** (one source hit, referenced nowhere); the digit does not. This is the identical phantom class the wave itself convicted at **a.7 item 1** (*"a `.pyc` inflating a source count by one … the digit is wrong and the command still works"*) — caught for `_readable_or_none` and `_write_root_version`, missed one cell over | ⟨cmd⟩ (fourier tree) `/usr/bin/grep -rn "FlagRequest" api web/src \| wc -l` → **2**; with `--include='*.py'` → **1** (record `:98`) | Dated addendum-beside in this record scoping the G11 witness `--include='*.py'`. No gate verdict moves |
| **D-3** | MINOR | The VERIFY seat's structural self-count publishes *"`**RULE` **71** · `**WITNESS` **71** · `**DISPOSITION` **71**"* **without its line anchor**. Run as spelled the three return **75 · 72 · 72** (the extras are §0.4's own legend bullet, §0.6's prose, and the two `**RULED HERE**` headings F8/G1c). Under the anchored spelling units b and c actually used — `^\*\*RULE` — all three return **71** and the three-partition claim stands | ⟨cmd⟩ `grep -cE '^\*\*RULE' J-diff-shape-v2.md` → **71**; ⟨cmd⟩ `grep -c '\*\*RULE'` → **75** (record `:1311`) | Publish the anchor in the receipt. The claim is true; only its command under-specified |
| **D-4** | INFO | Unit e's ruling-block byte figure (**18,398** vs **18,702** settled) — **already found, disclosed and dated by the VERIFY seat** at `:1322-1332`; re-confirmed here (⟨cmd⟩ `git show e8277c8e:… \| wc -c` → **18702**, one commit ever touched the file) | record `:1322-1332` | None owed — the mitigation is already in the record |

### C1.4 — Honest-RED set

**EMPTY.** G19 is the wave's only RED and it is **not** relieved under axis 10: its own §3 green-owner
cell assigns it to **F.W5 itself**, the spec routes it to no successor, names it as no honest-RED by id,
and gives it no escalation exit. Its cure sits inside the wave's own §1a writable set. **It is owner-named
(R-1) but unrelieved, and an unrelieved RED is not laundered as honest.**

Weighed the other way, and stated so the finding is not read wider than it is: **nothing is masked.** All
**116** canonical rows have a real landing — verified here, not accepted. There is **no silent drop**, the
defect class G19 exists to kill. The wave measured the miss twice independently, refused both available
substitutes (booking through the ruling block; declaring ∅ over five known spellings), named the cures
token by token, assigned an owner, labelled the close **PARTIAL** and left **VERIFIED unmoved**. The
finding is that the wave stopped one lawful iteration short of its own gate — **not** that it shipped a
falsehood.

### C1.5 — Verdict

**NOT-CONFORMANT** — **1 HIGH · 2 MINOR · 1 INFO · 0 BLOCKER/CRITICAL**. **21 of 21 claimed GREENs
reproduce at this seat's own clock, double-run; `gatesFailed` = {G19}.** Bounds, masking, commit families,
E-3, mail and the four verbs are all clean. **The single blocking finding is D-1**: G19's ∅-closure is
owed *inside this wave*, by the grant §1a already carries, before F.W5's row reads CLOSED. The LEDGER
status cell is therefore left at **PARTIAL** by this seat, and an event line is appended beside it.

**Seat**: fresh adversarial check (L-20 pass 1, VERIFY-ONLY), `claude-opus-5[1m]`, 2026-09-17.

---

## Repair 1

**SERVED MODEL: claude-opus-5[1m]** · the **REPAIR seat, round 1** (F.W5 Track C), 2026-09-17 — opened
against `## Check 1`'s register (1 HIGH · 2 MINOR · 1 INFO). **E-3 held throughout**: `## Close`,
`## Close — VERIFY SEAT` and `## Check 1` above are prior evidence and are **byte-unedited**; this
section is the addendum-beside, and the cures inside `J-diff-shape-v2.md` are additive dated marks, never
patches. Writable set at this seat: `contract/J-diff-shape-v2.md` (§1a `:63`, `create`) ⊕
`coordination/value-to-fourier-cosign-J-diff-shape-v2.md` (§1a `:66`) ⊕ `V/coordination/INBOX.md` (§1a
`:67`, **append-only**) ⊕ this record ⊕ `execution/LEDGER.md` (this wave's row cells ⊕ one appended event
line). `scripts/dev/dev.sh` in **0** of this seat's commits. **Zero fourier bytes** — ⟨cmd⟩ (fourier tree)
`git status --porcelain | wc -l` → **0** at open and at close. The spec, `CENSUS-CANONICAL.md`, the
adjudicated registry, `COHESION.md`, **v1**, `operation-register.md` and `OWNER-RULINGS-F.W5.md` are
byte-unchanged (register sha `f4af6ba716d751c4…` — character-match to the relay's §1 digest; ruling block
`23e47b6cc8038f97…`).

### R1.1 — The bound, settled first, because the escalation turned on it

⟨cmd⟩ `sed -n '63p;90,92p' docs/tranches/X/fourier/waves/F-W5.md`, re-read at this seat: `:63` grants
this wave `$V/docs/tranches/X/fourier/contract/J-diff-shape-v2.md` with **`create`** access, and
`:90-92` names **units b, c and d** as its writers. The escalation's stated ground — *"not reachable by
any byte inside **any F.W5 seat's** writable set"* (`:1414-1415`) — is therefore **falsified by §1a**;
what was true is the narrower fact that v2 lay outside **unit e's** set, and that partition is the wave's
own serial plan (§1c), not a spec bound. Runbook **§5.7** (⟨cmd⟩ `sed -n '637,641p'
docs/tranches/X/EXECUTION-RUNBOOK.md`) makes *"any **third** diagnose→edit→re-measure iteration on one
gate"* the triumvirate trigger, and §1c allows a `(record, id)` pair to fail to home **three times**.
**This is iteration 2 of three — the prescribed path, not an escalation exit.** §6 item 1 says *"∅ or
halt"*; the wave had reached neither.

### R1.2 — Register: defect → cure → commit

| # | sev | cure landed | commit |
|---|---|---|---|
| **D-1** | HIGH | The **five one-token cures** landed inside `contract/J-diff-shape-v2.md`, each as a dated `⟨**ADDENDUM 2026-09-17 (repair round 1, G19 ∅-closure; §Z)**…⟩` mark **standing beside** the sentence it corrects — **§A3** `fr-GalleryCardModal GCM-10` → **LEG — held at F-W3** (`GCM-55`, the canonical `F.W5-W8` row, stays booked) · **§D7** the bare `m-7` **record-qualified** to `fr-BasisSelector m-7` · **§E4** `fr-GalleryCardModal GCM-1` → **LEG — held at F-W4** · **§E20** `fr-ContourPreview` **`L:L-5`** spelled beside the verbatim ADJUDICATED quotation that lands the row · **§F8** `fr-EquationResult FR-EQR-4` → **LEG — held at F-W4**. The two MINOR folds residual **R-1** offered a ride took it: **§E5** names `fr-GalleryView FR-GV-1`'s holder (**F.W3**) and **§D17** names `fr-GalleryCard L·M-4`'s (**F.W3**) in the clause's own voice. New **§Z** records the round. Every holder is read **off the canonical**, never decided here | **`a94d7428`** |
| **D-2** | MINOR | **Dated addendum-beside, here**: the baseline's G11 witness is **scoped `--include='*.py'`**. As published it reads ⟨cmd⟩ `grep -rn "FlagRequest" $F/api $F/web/src` → *"exactly one hit"*; re-run at this seat it returns **2** lines, the second `Binary file api/models/__pycache__/admin.cpython-314.pyc matches` (⟨cmd⟩ `\| grep -c '^Binary file'` → **1**). **Scoped it returns 1** — `api/models/admin.py:57:class FlagRequest(BaseModel):`, the definition, referenced nowhere. **The substance is unmoved and G11 stays GREEN**; the published digit was the `.pyc` phantom the wave itself convicted at **a.7 item 1** for `_readable_or_none` and `_write_root_version`, missed one cell over. The baseline's own cell is **not edited** (E-3) | this section |
| **D-3** | MINOR | **Dated addendum-beside, here**: the VERIFY seat's structural self-count (`:1311`) is published **with its `^` anchor**. At this seat, double-run: ⟨cmd⟩ `grep -cE '^\*\*RULE'` → **71** · `^\*\*WITNESS` → **71** · `^\*\*DISPOSITION` → **71**; unanchored the same three read **75 · 72 · 73**. *The three-partition claim was and is TRUE — only its command was under-specified.* ⊘ **And the unanchored `DISPOSITION` figure moved 72 → 73 by this seat's own hand**: §Z quotes the string `**DISPOSITION.** Booked:` in prose. Disclosed rather than left for a later reader to trip over; **the anchored partition, which is the load-bearing one, is unmoved at 71/71/71** | this section |
| **D-4** | INFO | **None owed** — the 18,398 vs **18,702** ruling-block gloss was already found, disclosed and dated by the VERIFY seat at `:1322-1332`. Re-confirmed here: the file is **byte-unchanged** by this seat (sha `23e47b6cc8038f97…`) | — |

### R1.3 — G19 re-run, iteration 2: ∅ in BOTH directions

**Operand, pinned first**: ⟨cmd⟩ `shasum -a 256 CENSUS-CANONICAL.md` → **`f443627574581ec2…`**,
character-match to the frozen `f44362757458`; ⟨cmd⟩ `grep -nE '^### F\.W5(-W8)? — '` → `5078` (**27**) ·
`5092` (**89**); **27 + 89 = 116**, closed independently at the declared `(n)` sum **and** at the
backticked-id count (the roster parser asserts per record and halts on a mismatch). No check file, no
pass index, no wave arithmetic, **no `F-W5-CARRY.md`**.

▲ **The instruments were rebuilt at this seat and shown DISCRIMINATING BEFORE a byte was written** —
because an instrument that returns ∅ after a cure has proved nothing unless it returned non-∅ before it.
Run against the **pre-addendum** bytes they returned **exactly the five** unit e, the VERIFY seat and
CHECK 1 each found — `fr-ContourPreview L:L-5` (no hit anywhere) · `fr-BasisSelector m-7` (hit, not
record-qualified at clause scope) · `GCM-10` §A3 · `GCM-1` §E4 · `FR-EQR-4` §F8 — **and nothing else.**
That agreement, reached from the canonical alone by a fourth independent seat, is the positive control.

⊘ *Write-then-measure caught two of mine before they could stand. (i) The reverse instrument's first
spelling flagged **14** rows, nine of them false: it keyed **bare** tokens against a flat id→home map —
the very *"a bare `M-10` is not an identity"* breach §2 rules against — and it read a booking list past
its own terminator. Re-spelled record-qualified (`home` keyed `(record, id)`, alias column parsed, the
`Booked:` span terminated at `;` / `▲` / sentence end) it returns the five and only the five. (ii) The
first §A3 cure put the LEG mark at the end of the family sentence, where it fell in `GCM-55`'s
`⊕`-delimited item rather than `GCM-10`'s — **the re-run still flagged §A3**, and the mark was moved to
the token it qualifies. A cure that does not turn its own gate is not a cure.*

| direction | reading (run 1 ≡ run 2, ⟨cmd⟩ `diff run1 run2` → no output) |
|---|---|
| **LHS → RHS** | **116 of 116 land record-qualified.** `fr-ContourPreview L:L-5` now hits at §E20 with its record named in the clause; `fr-BasisSelector m-7` is record-qualified at §D7's booking. **∅** |
| **RHS → LHS** | every id in a v2 `**DISPOSITION.** Booked:` list resolves to a canonical row whose home is `F.W5`/`F.W5-W8`, is one of the seven exclusions, is a **body alias of a head booked in the same list** (`fr-EquationPanel D-10`'s `D-L12`/`C-22`; `GCM-2`'s `C-1`), or **states its holder in the item** (`GCM-10` F-W3 · `GCM-1` F-W4 · `FR-EQR-4` F-W4 · `VV-R2-B` F-W4 · `BLK-1` *"does not re-book its members"* · `fr-EquationView B-2` · `R-5` lane-crud). **∅** |

**The seven exclusions stayed excluded** — none was folded into either side, and this seat introduced no
occurrence of `AA-48` · `P-9` · `AA-44` · `SS-L-07` · `SS-C-10` · `AA-45` · `AA-46` · `AA-47` anywhere.
**Triumvirate: iteration 2 of three closed at ∅; no `(record, id)` pair has failed to home three times.**

### R1.4 — Gate re-readings: every gate a cure could move, at this seat, double-run

| gate | probe | reading | verdict |
|---|---|---|---|
| **G19** | the set-difference, both directions, canonical alone | **LHS \ RHS = ∅ · RHS \ LHS = ∅** | **RED → GREEN** |
| **G22** | `MF-9` in v2 | **2** occurrences, `:304-305` **only** — §A3's G22 sequencing LOCK (was `:299-300`; the lines moved by this addendum, the condition did not). GCM-10's cure is quoted **without** it; the E11 merge stands at `### E11 — … MERGED, BOTH IDS PRESERVED` ⊕ its DISPOSITION | **GREEN, unmoved** |
| **G21** | the register | sha `f4af6ba716d751c4…` — **byte-unchanged**; 45 rows unmoved | **GREEN, unmoved** |
| **G20** | `ls …/X/coordination/` ⊕ edges ⊕ `O-22` | **2** files · **13** edges · `^\| O-22 \|` → **1**; the relay gained a dated **§5** addendum (the new digest, G19 ∅, the ask re-stated) and **§§1–4 are byte-unedited** | **GREEN at this end, unmoved** |
| **G1 · G2 · G3 · G4⊙ · G5 · G6 · G7⊙ · G8 · G9 · G10⊙ · G12 · G13 · G14 · G15 · G16 · G17 · G18** | each gate's v2 clause probe | `### A1` · `### E1` · `### E2` · `N/A — RE-SCOPED (F-SS4REST R1)` → **2** · `### E4` · `### C5` · `### E16` · `### C1` · `### D1` · `### D2` · `RFC 9110` → **1** · `### E13` · `### E14` · `### E17` · `### G1c`/`### G5c` ⊕ `DO-NOT-REGENERATE` → **5** · `### A3` · `### A2`/`### E3` — **every one returns exactly what the VERIFY seat measured** | **GREEN, unmoved** |
| **G11 ⊙** | `FlagRequest`, **scoped** (D-2) | `--include='*.py'` → **1**, `api/models/admin.py:57`, the definition; `### D3 ⊙ — … RULED: PRODUCER, AS A PORT` → **1** | **GREEN** |

**Tally: 22 of 22 GREEN** (G16 at the contract half and G20 at this end, exactly as their own close
columns define). **§6 item 1 — *"∅ or halt"* — is now DONE, not RUN-RED.**

### R1.5 — Published figures, re-measured from the settled bytes (write-then-measure, double-run)

`J-diff-shape-v2.md` **244,274 B · 3,154 L**, sha256 **`2155481a45f2853b…`** (was 236,694 B · 3,076 L ·
`c912d76d4cf7f…`, true of the bytes the VERIFY seat and CHECK 1 read — **their figures are not edited;
these are this seat's, at this seat's clock**). **Structure unmoved**: **71** clause headings partitioned
**A 6 · B 5 · C 5 · D 16 · E 20 · F 9 · G 10 = 71** · `^**RULE`/`^**WITNESS`/`^**DISPOSITION` →
**71 / 71 / 71** · `^### D9` → **0** · line 1 still `SERVED MODEL:`.

▲ **The addendum is proved ADDITIVE at the bytes, not merely called so.** ⟨cmd⟩ strip every
`⟨**ADDENDUM 2026-09-17 …⟩` span and §Z from the settled file, normalise whitespace and emphasis, and
`diff` the word stream against `HEAD~2`'s v2 → **the single difference is the `---` rule introduced above
§Z**. Not one word of units b/c/d's clauses was deleted or rewritten; the `85 insertions / 7 deletions`
in `a94d7428` are seven wrapped lines **split** by an insertion, each word re-appearing intact.

### R1.6 — E13, the four paths swept at this seat's own clock (18:53 EDT)

⟨cmd⟩ `find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 18:25'`, per path — `V/coordination` ·
glass-ui `BK/coordination` · keyframes `V/coordination` · atlas `P/coordination` · atlas `Q/coordination`
→ **nothing, on all five**. **0 unrowed · 0 new `I-n` · 0 new `O-n` · 0 UNREAD in F.W5's scope.** One
dated sweep line appended to `INBOX.md` (⟨cmd⟩ `git diff --numstat` → **`2 0`**, zero deletions, **no row
rewritten**, `O-22`'s cells untouched). The three `UNREAD` status cells (`I-32`·`I-33`·`I-34`) remain
**Track D's**, routed by their own cells to the X formation mail seat — read, out of scope, not moved.

### R1.7 — Commits (pathspec only; `--no-verify --quiet`; session trailer on each; `dev.sh` in 0 of 3)

- **`a94d7428`** — the five G19 cures ⊕ the two MINOR riders ⊕ §Z, inside `J-diff-shape-v2.md`
  (pathspec: that one file; `85/−7`).
- **`67064eed`** — the relay's **§5** addendum ⊕ the `INBOX.md` sweep line (pathspec: those two paths;
  `40/0` and `2/0` — **one meaning, one commit**: a relay and its ledger row cannot be read apart, the
  same family unit e kept together at `37e2feec`).
- this section ⊕ the `LEDGER.md` row cells and event line — pathspec
  `docs/tranches/X/execution/C/F-W5.md` and `docs/tranches/X/execution/LEDGER.md`.

### R1.8 — Escalations

**NONE.** Every cure landed inside the wave's own §1a writable set, with the spec's own idiom, at
iteration 2 of the three §5.7/§1c allow. **E-1 (G19) is DISCHARGED**, not re-escalated. No masking
fallback of any kind: no `try`/`catch` round a defect, no skip, no allowlist, no narrowed assertion, no
instrument tuned until it returned ∅ — the instrument's discrimination was established against the
uncured bytes first, and the one cure that failed to turn its gate was re-landed rather than reported as
closed. No write outside the set; no prior seat's rows edited; no ruling re-opened; no `git stash`, no
`reset`, no force.

**Residuals unchanged and still owned elsewhere**: **R-2** the fourier reciprocal (now asked for without
the *"spellings later"* fork) · **R-3** the COHESION §2 edge rows (the root seat) · **R-4…R-8** the
green-owner tests, G16's product side, G9's clienting, G11's port, the D9 reconciliation · **R-9** the
three BK letters ⊕ K-R1 ⊕ the 9.0.0 re-trigger (the X formation mail seat). **VERIFIED stays unmoved** —
X·F's sub-tranche release close stamps it, not this wave, and not a seat that repaired its own gate.

**Seat**: REPAIR round 1, `claude-opus-5[1m]`, 2026-09-17 18:55 EDT.
