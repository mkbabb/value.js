# X·F CONFORMANCE PASS 1 — UNION ADJUDICATION

**Seat**: union adjudication (cross-wave axes the per-wave seats cannot see), 2026-08-28.
**Inputs**: the 11 per-wave check files in this directory (all read) · the 66 `fr-*.md` records at
`docs/tranches/V/megatranche/registry/adjudicated/` · `waves/F-W0..F-W10.md` ·
`carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` (the ONLY carries in tree) · `COHESION.md` §0/§0a/§0b.
Every union-level claim below was re-measured read-only this session; per-wave receipts are cited by
seat, not re-litigated.

**VERDICT: DEFECTIVE — 11/11 waves locally DEFECTIVE, and the program fails three of the four
cross-wave axes outright.** 60 routed obligations are held by NO wave and NO carry; 68 rows/acts are
double-homed without a declared reciprocal cross-edge; the F.W1 atomic transaction is split by
F.W0's own gate; the authority layer under 9 of 11 specs is phantom.

---

## §1 AXIS 1 — PARTITION (whole-registry routing map, rebuilt)

### §1a Method

Union of the 11 seat censuses, then a boundary-aware grep of every candidate escape id across ALL
of `waves/*.md` + `carry/*.md` (pattern `(^|[^A-Za-z0-9-])ID([^0-9A-Za-z-]|$)`). A row counts as
program-held if ANY wave spec or in-tree carry carries it as a row, named fold, or
exclusion-with-reason. Seat-local escapes that re-resolve to another wave were *removed* from the
program set (e.g. `FR-EQC-8` escaped F-W6/F-W8 but is booked at `F-W5.md:88` clause A5 — held;
`FR-COB-3`/`FR-COB-15`/`PP-DEAD` escaped F-W0 but are booked in F-W3 — limb-level only;
`SS-L-07/SS-C-10` is held at `F-W4-CARRY.md:234`).

### §1b PROGRAM-LEVEL PARTITION ESCAPES — **60** (routed rows held by NO wave, NO carry)

**Tier 1 — 52 zero-byte registry ids** (0 occurrences across all 11 specs + both carries; each
routed with a terminal F-wave disposition in its record):

| cluster | ids | routed | source seat |
|---|---|---|---|
| GalleryCardModal | GCM-24 · GCM-44 · GCM-45 · GCM-46 · GCM-49 | F.W3/W4 | F-W3 check |
| PaperArticleWindow | PAW-9 · PAW-13 · PAW-14 · PAW-19 · PAW-21 · PAW-23 · PAW-24 · PAW-55 · PAW-57 | F.W3/W4 | F-W3 check |
| CanvasOverlayButton | FR-COB-5 · FR-COB-22 | F.W3/W4 | F-W3 check |
| GlassTimeline | **LF-1** (sole-F.W3 route; also dropped from the SS-6 letter) · RB-1 | F.W3 / F.W1 charter note | F-W3, F-W1 checks |
| FourierMorphSvg band | **FM-4 FM-5 FM-6 FM-7 FM-8 FM-9 FM-10 FM-11 FM-15** (9 of the 13-MINOR adjudicated band; FM-13/FM-14 appear only as prose mentions inside other rows — see §1c) | F.W4 | F-W4 check |
| EquationResult | FR-EQR-18 · FR-EQR-20 · FR-EQR-22 · FR-EQR-23 · FR-EQR-28 | F.W4 | F-W4 check |
| **EquationView cluster (9)** | M-TL · D·D-M3 · M-ZM · I-3 · I-4 · M-CK · M-SB · M-DV · (B-1/B-2 are homonym-masked, see §1c) | F.W1 benefit / F.W4 / F.W5–W8 | F-W1, F-W4, F-W6, F-W8 checks |
| PaperView | ★MF-4 · ★MF-5 · ★MF-6 | F.W4 | F-W4 check |
| singles | INFO-3 (EditorControlsDock) · FR-IC-17 (InfoCard, DISCHARGED-BY-UPLIFT) · CP-33 (ContourPreview) · MPC-29 (MorphPhaseConfig, bears on ESC-4 acceptance) · C-S3 (SvgFilters) · M-δ · EasingPicker L30 · C-30 · F-6 (=C-C-9=L-15, GalleryDraftsSection — F.W5 provenance-contract input) | various | F-W1..F-W6 checks |

**Tier 1 count: 52.**

**Tier 2 — the 8-item `F-W1-CARRY.md:246` visual-regression checkpoint set**, routed by an
authorized in-tree carry EXCLUSIVELY to F.W9/F.W10 and verified 0-hit in BOTH twins (F-W9 seat,
re-confirmed): `--shadow-cartoon` sign flip · `cartoon-surface` hover loss (21 sites) ·
`.disclosure-content` body register · tooltip re-proportion · GCM-22 `p-0` insets · Badge rim ·
FR-CP-13 fused-card gap · `text-admin-label` reversion. **Tier 2 count: 8.**

**partitionEscapes = 60.** Under COHESION §3.1/§3.2 ("every CARRY row lands in exactly one
sub-tranche wave… no silent drops") each is a **program defect**, not a per-wave one.

### §1c Limb-level / echo-only annex (named, NOT counted in the 60)

- **PAW-7 · PAW-11 · PAW-15**: present ONLY inside F-W10:157's PAW-39 dissent cluster
  (PAW-11 also at F-W10:173/:278) — dissent preserved, but the F.W3/W4 **repair waves hold zero
  bytes** of them.
- **FM-13 · FM-14**: prose mentions inside other rows' text in F-W4-CARRY; unbooked per the F-W4 seat.
- **U-3 (SvgFilters D§3)**: the only "U-3" hit in any spec is a *different record's* axis id at
  F-W3.md:154 — homonym collision, the twice-rejected-feTurbulence lock itself is unhomed.
- **FR-USB-18**: F.W1 half in F-W1 + carry; **F.W4 half unhomed**. Similarly FR-AFP-33 (client
  collapse limb), fr-PaperSearch D-14/D-15/D-17 (F.W1 re-ink limbs), FR-COB-3/-15 + PP-DEAD
  (F.W0 rm/rider limbs — held in F-W3 only), AnimationControls C-18 (homonym-masked).
- **W10's NO-WAVE-OWNER drain shortfall** (≥36 strict rows, see §3/§5-U-6) is adjudicated as its
  own defect class, not inflated into the 60 — those rows' *deadline home* fails rather than every
  wave; several (e.g. FR-NP-32, FR-COB-28) live elsewhere as gates.

### §1d DOUBLE-HOMED — **68** rows/acts carried by 2+ waves with NO declared reciprocal cross-edge

| # | surface | count | receipt |
|---|---|---|---|
| 1 | **F-W5 ↔ F-W8: 64 overlapping booked ids** under W8's "F.W5 states / F.W8 asserts" split that **F-W5 never reciprocates** — `grep -c 'F\.W8' F-W5.md` → 0; W8's own G15 ("homed at exactly ONE of F.W5/W6/W7/W8") is undischargeable | 64 | F-W8 check INFO |
| 2 | **FR-EQC-7 vaul-vue manifest gate** — landed by F-W0 G-6 as an F.W0 transaction limb AND chartered by F-W1:294 "INSIDE the F.W1 transaction, not before" — a contradictory double-home | 1 | F-W0 check HIGH |
| 3 | **fr-EasingPicker L/B-1 ⊕ C/B-1** — carried by F-W1:161 AND re-booked by F-W2 under CENSUS/lane-frontend/W.L5-ACT1 identities with no citation (undeclared credit collision under the program's own FR-GIG-5 bar) | 1 | F-W2 check BLOCKER |
| 4 | **unit-runner seat** — F-W0 G-9's GREEN clause is byte-equivalent to G-F9-1's falsifier; no disjointness sentence either end | 1 | F-W9 check MEDIUM |
| 5 | **the G-11 anchor-re-resolution act** — published-ONCE by F.W0, independently re-performed/re-minted by F-W1 G1, F-W2 §2b, F-W3 g17, F-W4 §0, F-W9 §2.8 C-4 (counted once as an act) | 1 | F-W1/W2/W3/W4/W9 checks |

**doubleHomed = 68.** The one *correctly* declared multi-home is the F-W9/F-W10 twin (§2.2 shared
bytes proven byte-identical by both seats) — the model the rest of the program ignores. The 48
F.W3/W4 dual-routed rows are chartered dual routes; their defect is F-W3's silent handoff
(no §X row per id), booked at §5 M-5, not here.

---

## §2 AXIS 2 — ATOMICITY + SEQUENCE

### §2a F.W1's transaction is NOT indivisible across the program — **FAIL**

`F-W1.md:276` charters **eleven** limbs in ONE change; `:294` pins FR-EQC-7's vaul-vue gate INSIDE it.
- **F-W0 G-6 splits it**: lands FR-EQC-7 at F.W0 as an F.W0 manifest transaction, in the exact
  shape F-W0's own row 9 declares forbidden — unconditioned on G-1's ABANDON branch (F-W0 check HIGH).
- **Seven sibling specs restate it as three limbs** (producer bump + 162-site rewrite +
  copied→status): F-W4 (×2), F-W5:252, F-W6:169, F-W7 §7c, F-W8:200, F-W9 §4a-3, F-W10 §4a.3.
  `vaul-vue` / `RE-PIN` / `CSS-class census` = **0 hits in all seven**. No sibling authorizes a
  split, but a seat sequencing off any one of them reads the wrong transaction.
- **F-W1 itself leaks**: §4 commit 3 (the --viz-* palette cure) lands product bytes BEFORE the
  atomic commit 4, with no abort semantics (F-W1 check LOW); G5's P0 census cure has no landing
  cell inside the transaction (F-W1 check MEDIUM).

### §2b F.W0's pre-gates are NOT honored downstream — **FAIL**

- **G-11** ("ONE corrected anchor table published; every later wave quotes it") — quoted by
  **zero** of ten later waves; five re-own the act (§1d row 5).
- **G-12** (corrected denominators, superseded figures forbidden) — F-W9 re-derives G-12's own
  denominators (8 specs · 15/6 · 17 · 2 Teleports · 28 dirty) with no citation; F-W0's own §2a
  publishes an arithmetically wrong "22 remaining ` M` SFCs".
- **P-4 / G-13** (producer COMMIT HASH, never version string) — violated by F-W3 g6
  (`v7.0.0` witness ×20 in a wave whose substrate law is 8.0.0-superseded) and by F-W0's own G-13
  ('8.0.0' + a 5-hash chain already stale; live producer `207bf174` is a sixth undeclared drift).
- **Substrate presumption**: F-W4 asserts glass-ui 8.0.0 behaviour as settled cure substrate 8×
  while never naming the G1/ESC-1 gate F-W1 makes a precondition (F-W4 check HIGH).

### §2c FR-NP-32 (corrupt-dist) does NOT precede every dist-dependent witness — **FAIL**

The BLOCKER sequencing gate survives by id in F-W0 (row 1) / F-W1 / F-W2, then erodes:
**F-W3 → 0 hits** while §7 mandates `npx vite build` per batch (RED by construction at the ^4.0.0
pin, never disclosed); **F-W5 drops it from the X-1 edge**; **F-W10 → 0 hits at the drain
deadline**; F-W4 and F-W9 carry the mechanism only under the anti-rename "fr-PaperSidebar M1".

### §2d No wave writes the fourier tree — **HOLDS, with two write-adjacent breaches**

Every gate witness in all 11 checks is a read (L-19 clean across seats). Two spec-side breaches:
F-W0 G-15(a) prescribes `git stash` on the 28-dirty-row tree whose two dirty lines are the only
copies of the correct repairs (the sole witness that WRITES the tree, unsequenced against G-1);
F-W3 §5b creates `.worktrees/f3{a..e}` INSIDE the fourier root it gates on being clean, no ignore
row. F-W5/F-W8 (and F-W6 R3) contradict their own "opens nothing" absolutes with disclosed
read-only reads — self-convicting sentences, real facts.

---

## §3 AXIS 3 — OWNER RULINGS (SS-4 inline flags, F.W5..W8) — **FAIL at 3 of 4 span waves + the deadline wave**

- **F-W5** — the home register: R1–R9 booked inline. CLEAN on this axis.
- **F-W6** — FW6-G18's roster carries seven of nine: **R5 (off-state `[]` admission) and R9
  (delete-or-wire dead session subsystem) silently dropped**; born-visibility mislabeled "G5"
  (is R8/E4), hard-delete arm mislabeled "E7" (is R6/D6); FR-USB-23's ⊙ owner-gate stripped in §5.
- **F-W7** — the owner gate G-F7-1 is founded on a **fabricated verbatim prohibition** ("No trie
  design absent G7's ruling", attributed to a nonexistent F-W5 §3 Prohibitions) and a **fabricated
  dissent** cited at blank-line F-W10:106. The trie-vs-KISS flag exists, but its authority is invented.
- **F-W8** — no owner-ruling defect found by its seat.
- **F-W4** (outside the span but presuming a ruling): 8.0.0-as-settled ×8 with ESC-1/G1 unnamed.
- **F-W9/F-W10** — exemplary: every SS-4 ruling flagged inline, none presumed; the L-4 escalation
  carries "CANNOT STAMP TERMINAL DISPOSITION WHILE UNANSWERED".
- **The drain**: F-W10 declares itself COHESION §3.3's deadline and homes 23 NO-WAVE-OWNER rows
  while ≥36 strict-dispositioned rows (94 row-level / 167 occurrences / 56 records, re-measured)
  are neither carried, folded, nor excluded — including **FR-NP-32 itself (BLOCKER)**, absent by id
  from the deadline wave whose producer-inbox packet (O-20) names it.

---

## §4 AXIS 4 — ARITHMETIC (routedTotals vs the measured taxonomy)

Measured this session over the 66 records (`grep -lE` / `grep -oE`, records/occurrences):

| digraph | records | occurrences | note |
|---|---|---|---|
| F.W0 | **44** | 155 | the given taxonomy count "41" measures **44** today — a −3 census-snapshot drift to name at the fold |
| F.W1 | 66 | 845 | matches 66 |
| F.W2 | 25 | 68 | matches 25 |
| F.W3 | 66 | 1256 | matches 66 (F.W3/W4 dual digraph inflates occurrences) |
| F.W4 | 56 | 1128 | matches 56 |
| F.W5–W8 (hyphen ∪ en-dash) | **49** | **192** | F-W6's spec saw 120/26 — hyphen-blind (its BLOCKER) |
| F.W9/W10 | 25 | 54 | exact; no bare F.W10 routing exists |
| NO-WAVE-OWNER | 56 | 167 | 94 row-level / 50 strict (F-W10 seat) |

Per-wave routedTotal deltas, named and explained:

| wave | routedTotal | vs taxonomy | explanation |
|---|---|---|---|
| W0 | 82 | 44 recs/155 occ | occurrences deduped to row-level obligations; boilerplate routing-law lines + prose mint no rows |
| W1 | 338 | 66/845 | uplift touches every record; 845 occurrences → 338 minted identities |
| W2 | 54 | 25/68 | 14 non-minting occurrences |
| W3 | 317 | 66/1256 | dual-digraph inflation; 71 escapes measured against the 317 |
| W4 | **963** | 56/1128 | the largest census: union of the 421-row F-W4-CARRY with the registry (repair mega-wave) |
| W5 | 162 | span 49/192 | phantom "128-row CARRY" + registry + clauses; mixes carry ids (P-9) with registry ids under one denominator (its MINOR) |
| W6 | 122 | span 49/192 | identity-level dedup of the TRUE union; the SPEC's own census reads 120/26 — wrong denominator |
| W7 | **0** | — | nothing routes to F.W7 by digraph; the wave exists only as SS-4's owner-gated trie design; its 1 escape (ContourEditorCanvas L-5) is the qualifying row neither carried nor excluded |
| W8 | 123 | span 49/192 | span identities per its (phantom) CARRY + registry |
| W9 | 39 | 25/54 | 26 digraph + 5 by-mechanism + 8 carry-checkpoint items |
| W10 | 121 | 25/54 + NWO 94 | 26 + 5 + 94 NO-WAVE-OWNER, deduped by anchor; the twins differ because only W10 admits set C |

Σ routedTotals = **2321** ≫ registry rows — by design: W5..W8 each census the one ~120-identity
span population (quadruple counting), W9/W10 twin-census the same 26, W3/W4 dual-route 48+ rows.
The multi-counting is legitimate ONLY where the cross-edge is declared — which is exactly where
§1d shows it is not (W5↔W8).

Spec-side arithmetic defects folded at §5 M-1: W0 §2a "22 remaining SFCs" (true 24 ` M` SFCs → 21/19
after its own carve-outs) · W7 "11 of 11" over a 14-row table + "60+" probe lines (true 147) ·
W10 D3 "11 id-rows" (true 17, 11 OPEN) · W2's phantom `F-W5.md:234` anchor ×2 · W9's `e2e` job at
`:101` (true `e2e-tests:` at `:100`) · W9 G-F9-8 "all four" fixmes (command returns 5).

---

## §5 AXIS 5 — THE UNION DEFECT REGISTER (ranked, deduped)

137 seat defects folded (13+17+19+11+9+9+20+16+7+9+7, INFO credits excluded) → **20 union defects:
6 BLOCKER · 6 HIGH · 6 MEDIUM · 2 LOW.**

### BLOCKERS

| id | claim | provenance |
|---|---|---|
| **U-1** | **PARTITION FAILURE — 60 routed obligations held by NO wave and NO carry** (§1b: 52 zero-byte ids incl. the 9-row fr-EquationView cluster, the FM-4..FM-15 band, 9 PAW ids, the FR-EQR quintet; + the 8-item F-W1-CARRY:246 checkpoint set dropped by both twins). COHESION §3.1/§3.2 violated by bytes. | union grep + F-W1/W2/W3/W4/W5/W6/W8/W9 seats |
| **U-2** | **PHANTOM CARRY AUTHORITIES — 9 of 11 specs certify against per-wave carry ledgers that do not exist in tree** (only F-W1-CARRY + F-W4-CARRY exist). Every carry-closure gate in W0/W2/W3/W5/W6/W7/W8/W9/W10 (G19, FW6-G17, G15, "the CARRY" ×8-12 per spec) is unauditable or born-VOID; W3 additionally sources its authority to out-of-tree session drafts. | all seats except F-W1/F-W4 |
| **U-3** | **FABRICATED / MIS-KEYED AUTHORITY QUOTES**: F-W7's invented F-W5 prohibition ("No trie design absent G7's ruling") + invented dissent at blank F-W10:106; F-W5's invented "P-8 disposition verbatim" (id exists nowhere in the corpus); F-W2's seat-minted G15 stating 8/22 easing drift against the banked 14/22 with inverted member lists; F-W6+F-W7's systematic re-keying of F-W5 clause ids (E7→E8, E13→E12, E17→E11, D5→D12, D6→E7, invented D9) — in 4 cases masking exactly the rows that escaped. | F-W7 (3 CRITICAL), F-W5, F-W2, F-W6 seats |
| **U-4** | **F.W1 ATOMICITY BROKEN**: F-W0 G-6 lands the FR-EQC-7 vaul-vue limb inside F.W0's transaction against F-W1:294's INSIDE-F.W1 law (contradictory double-home, unconditioned on ABANDON), while seven sibling specs restate the 11-limb transaction as 3 (vaul-vue/RE-PIN/CSS-census 0 hits in all seven) and F-W1 itself lands a product commit before the atomic one. | §2a; F-W0 HIGH + 7 seats |
| **U-5** | **F-W6 EN-DASH CENSUS BLINDNESS**: the widest span wave's own census instrument cannot reach 23 of 49 routing records (claims 120/26; true 192/49) — the K-6 failure its own S-8 prescribes against — and 56 of 122 span identities escape it. | F-W6 seat, re-measured (§4) |
| **U-6** | **THE NO-WAVE-OWNER DRAIN FAILS AT ITS DECLARED DEADLINE**: F-W10 homes 23 rows and stamps "zero left open" while ≥36 strict-dispositioned rows are neither carried, folded, nor excluded — including FR-NP-32 (BLOCKER), whose id the producer-inbox packet O-20 carries and the consumer's close-gate does not. COHESION §3.3 cannot close on this wave as written. | F-W10 D5/D6 |

### HIGH

| id | claim | provenance |
|---|---|---|
| **U-7** | **F.W0's published-once laws disobeyed program-wide**: G-11/G-12 quoted by zero later waves, the act re-owned five times; P-4 violated by F-W3's v7.0.0 gate witness and by F-W0's own G-13 (version string + stale 5-hash chain; live `207bf174` undeclared); G-13 unsatisfiable by F.W0 as written. | §2b |
| **U-8** | **FR-NP-32 sequencing gate eroded** (§2c): dropped by id from F-W3 (whose per-batch `vite build` cadence is RED-by-construction at the pin, undisclosed), from F-W5's X-1 edge, and from F-W10; anti-renamed to "fr-PaperSidebar M1" in F-W4/F-W9. | F-W3/W4/W5/W10 seats |
| **U-9** | **PHANTOM PATHS IN WRITE-AUTHORIZATION BOUNDS**: F-W1 §1 names 8 phantom product paths (3 directories that never existed; 4 paths simultaneously gate witnesses) under a halt condition keyed to those bounds; F-W3 §1 carries 20 phantom paths + a nonexistent root `index.html` cited three mutually contradictory ways; F-W6/F-W7 cite `J-diff-shape.md` at a value.js path that does not exist; F-W7 lists `contract/**` and `OWNER-RULINGS-F.W5.md` as existing immutable witnesses (both uncreated). | F-W1 HIGH, F-W3 MAJOR ×2, F-W6/W7 |
| **U-10** | **OWNER-RULING AXIS DEFECTS** (§3): F-W6 drops R5+R9 and mislabels two more, strips FR-USB-23's ⊙; F-W4 presumes glass-ui 8.0.0 settled ×8 with ESC-1/G1 unnamed; F-W7's owner gate rests on the U-3 fabrication. | F-W6/W4/W7 seats |
| **U-11** | **W5↔W8 64-id UNDECLARED DOUBLE-HOME** (§1d): no reciprocal edge from F-W5 (`F.W8` → 0 hits); W8's G15 one-home law undischargeable; plus the F-W2 easing credit collision and the W0/W9 runner-seat collision. | F-W8 INFO, F-W2 BLOCKER, F-W9 MEDIUM |
| **U-12** | **HOMONYM-ID COLLISIONS UNGUARDED across the span**: M-13/L-B1/L-M3/C-17/C-18/B-1/B-2/C-2 each resolve to two different banked rows in two records, with no record qualifier in the span specs — id-keyed set-difference closure cannot separate booked from escaped as written (this masked the EquationView B-1/B-2 escapes). | F-W6/F-W8 seats |

### MEDIUM

| id | claim | provenance |
|---|---|---|
| M-1 | Arithmetic miscount cluster: W0 "22 SFCs" · W7 "11 of 11" over 14 rows + "60+" (true 147) · W10 "11 id-rows" (true 17) · W2's phantom `:234` anchor ×2 · W9's `ci.yml` job name/line · W9's 4-vs-5 fixmes. | §4 |
| M-2 | W9/W10 twin perimeter: G-F9-14's phantom coordinate (`PaperArticleWindow:52` for a literal living in `figureDimensions.ts:52` — spec-added filename); W10's receipt sweep reads the superseded BJ inbox while the 11th packet (O-20, BK) already satisfies the arm asserted RED (D1/D2). | F-W9/W10 seats |
| M-3 | Gates unrunnable or green-without-measurement: F-W2's five gate commands use a relative `fourier-analysis/` path that does not resolve from the declared cwd; F-W3 g12/g17 OR-escape GREENs satisfiable with zero measurement; F-W0 G-15(d) witness cell empty of measurement; F-W1 G15/G20 not born-RED. | F-W2/W3/W0/W1 seats |
| M-4 | Write-adjacent posture breaches (§2d): W0 G-15(a) stash on the dirty tree holding the only correct repairs; W3 `.worktrees/` inside the gated-clean root; W5/W8/W6 self-contradicted read absolutes (facts verified true; sentences self-convicting). | F-W0/W3/W5/W8/W6 seats |
| M-5 | F-W3's 48 dual-routed F.W3/W4 rows handed to W4 with no per-id §X line, against its own "named at its row with its trigger"; F-W3 quotes none of F.W0's discipline while ordering the aria-pressed lift into F.W0's commit at raw anchors. | F-W3 MODERATE/MAJOR |
| M-6 | Cross-edge reciprocity + citation hygiene: no F.W7 edge from F-W5/F-W10 either end; F-W7 claims F-W0/F-W6 "do not exist" (both exist; F-W6 already declares the edge); F-W8/F-W7 cite phantom F-W5 §6b/§6c/§3 sections; F-W4/F-W6 unrooted `formation/`/`audit/` paths resolving only under `docs/tranches/V/megatranche/`. | F-W7/W8/W4/W6 seats |

### LOW

| id | claim | provenance |
|---|---|---|
| L-1 | Execution-voice/status leaks: F-W0 row 37's current-voice "executed"; F-W6 line-3's "consumed whole… zero silent drops" provenance header over a nonexistent artefact (status blocks themselves honest in both). | F-W0/W6 seats |
| L-2 | Bounds-hygiene residue: F-W0's unprefixed non-resolving J-diff-shape row; F-W6's stale 7-file `waves/` reconciliation (true 11); F-W9's G-F9-8 partial rendering of its own command. | F-W0/W6/W9 seats |

---

## §6 CENSUS SUMMARY + VERDICT

| | |
|---|---|
| waves locally DEFECTIVE | **11 / 11** |
| seat defects folded | 137 |
| **union defects (deduped)** | **20** (6 BLOCKER · 6 HIGH · 6 MEDIUM · 2 LOW) |
| **partitionEscapes** (program-level, §1b) | **60** (52 zero-byte ids + 8 checkpoint items) |
| **doubleHomed** (undeclared, §1d) | **68** (64 W5↔W8 + 4 singleton rows/acts) |
| atomicity axis | FAIL (U-4) |
| F.W0-pre-gate axis | FAIL (U-7) |
| FR-NP-32 precedence axis | FAIL (U-8) |
| fourier-tree read-only axis | HOLDS with 2 write-adjacent breaches (M-4) |
| owner-rulings axis | FAIL at W4/W6/W7 + the W10 drain (U-6, U-10) |
| arithmetic axis | reconciled at §4; measured taxonomy 44/66/25/66/56 recs; span 49/192; W9-W10 25/54 |

**VERDICT: DEFECTIVE.** The strongest work in the pass is real — F-W9/F-W10's byte-identical twin
tables, W10's 26/26 digraph census, W6's read-only witness discipline, four seats' verbatim dissent
carriage — but the program cannot proceed to PASS 2 stamping while: (1) 60 routed obligations have
no home anywhere in the wave corpus; (2) nine waves rest their closure gates on carry ledgers that
do not exist; (3) the one land-or-lose transaction is split by F.W0's own gate and mis-stated by
every sibling that restates it; and (4) the deadline wave's drain leaves the corpus's BLOCKER-grade
NO-WAVE-OWNER row un-homed by id. The repair shape is mechanical: land the 9 missing per-wave
CARRY ledgers in tree (or re-key the gates to the two that exist), home the 60 by id, publish the
F-W5↔F-W8 reciprocal split, quote G-11/G-12 in all ten later waves, restore FR-EQC-7 to F.W1
exclusively, and re-run the en-dash census at F-W6.
