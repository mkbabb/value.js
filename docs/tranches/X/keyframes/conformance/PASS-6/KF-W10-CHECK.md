# KF-W10 — PASS-6 FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W10.md` — **250,859 B / 667 L, mtime 2026-08-29 15:18:25**, sha256 `1c107329458e0ba1ff6762923a5a684391ac32824dc7d7fac42d8e33f4851c50` at this seat's read.
**Seat**: FRESH. `PASS-5/KF-W10-CHECK.md`, `PASS-5/RULINGS-5.md` and `PASS-5/CLOSE-CERT-2.md` were read **only** to learn which repairs were commissioned and which certification was owed. No finding, count, partition, roster or escape list was imported from any of them: the census below is an id-keyed harvest re-enumerated at the substrate's **current** bytes — the 58 records at `docs/tranches/V/megatranche/registry/adjudicated/`, the sole carry `carry/KF-W6-CARRY.md`, the ten sibling specs at their **round-5 FINAL** bytes, and program inheritance.
**Clock**: 2026-08-29, after the round-5 repair bank (`fffb9685`, 15:07:05), after the RECONCILE seat's uncommitted receipt writes (15:17:38–15:18:37), and after `CLOSE-CERT-2.md` (15:24:27).
**Refs of record**: keyframes.js **`origin/master = 81a56990736ced5b5edde0b84c527680ac7689b1`** — every keyframes witness below was re-executed there by `git show` / `git grep`, never at the checkout (R3-2). value.js `tranche-u`, current tree bytes (the eleven specs are dirty against `HEAD`; the worktree IS the round's final state).
**First act, per RULINGS-5 LAW E(2)**: all eleven specs re-hashed. **GATE GREEN — see §0.1.**

**VERDICT: DEFECTIVE** — 3 MAJOR · 3 MINOR · 1 INFO.
**Census: routed 38 · booked 37 · escaped 1.**

---

## §0.1 LAW E(2) — THE HASH GATE, RUN FIRST

`shasum -a 256 docs/tranches/X/keyframes/waves/KF-W*.md`, this seat, against `PASS-5/CLOSE-CERT-2.md` §9's closing column:

| spec | closing sha256 (cert §9) | re-hash (this seat) | verdict |
|---|---|---|:--:|
| KF-W0.md | `fd226ecb…d09a` | `fd226ecb26ea68e3…ec06d09a` | ✓ |
| KF-W1.md | `f6986de7…12f0` | `f6986de7b90c2f00…6f6112f0` | ✓ |
| KF-W2.md | `5f3656e3…11a4` | `5f3656e32363e49d…0aa2bd11a4` | ✓ |
| KF-W3.md | `4b68baf3…86f7` | `4b68baf35a63357d…cde786f7` | ✓ |
| KF-W4.md | `4028327c…fe68` | `4028327cb221b6b6…d5aafe68` | ✓ |
| KF-W5.md | `8baba077…404d` | `8baba077d0e6612f…bdd4a404d` | ✓ |
| KF-W6.md | `b41e5576…daaa` | `b41e55769f9cea83…bd993daaa` | ✓ |
| KF-W7.md | `ed5f0851…6f21` | `ed5f0851378cde71…d9986f21` | ✓ |
| KF-W8.md | `c7c11445…a1c9` | `c7c1144599f8c8cf…c056fba1c9` | ✓ |
| KF-W9.md | `bea2d9a6…c744` | `bea2d9a6c519bf97…2143cc744` | ✓ |
| KF-W10.md | `1c107329…1c50` | `1c107329458e0ba1…d4f851c50` | ✓ |

**ELEVEN OF ELEVEN MATCH. No spec moved after the certificate.** LAW E(1)'s write-last-by-construction discipline **held** — the mechanism that falsified round 4 (and, per the cert's own §4/R5-R2, falsified a predecessor round-5 reconcile pass at 19:28–19:30) did **not** fire this round. This is the round's single most important structural improvement and it is real. ⟨The cert's **opening** column mis-transcribes its frozen source at two rows — **D-6**; the closing column, which is what the gate turns on, is exact.⟩

## §0 What reproduced

Re-derived read-only at this seat, at the refs of record. **Every command below was re-run; nothing is inherited.**

| claim in KF-W10 | re-derivation | result |
|---|---|---|
| registry census **58 / 57 / 1,216** | `ls kf-*.md \| wc -l` · `grep -l` · `grep -o` | **58 · 57 · 1,216** ✓ exact |
| the by-record surface **15 hits / 12 records** (D-7's dated correction) | `grep -nE 'KF\.W10\|KF-W10' registry/adjudicated/kf-*.md` | **15 / 12** ✓, and the per-record distribution matches cell-for-cell (kf-AnimatedText **3** · kf-EditorStartScreen **2** · the other ten **1** each) |
| **G-4 field, the round-5 re-run**: files **27** · occurrences **98** · lines **69**; live-spec **3/27 (18)** · conformance **5/27 (17)** · substrate **19/44 (34)** | the gate's own three commands + per-class splits | **27 · 98 · 69** ✓ **exact**, and all three per-class triples reproduce (`27+27+44 = 98`, `3+5+19 = 27`, `18+17+34 = 69`). **PASS-5's D-5 is cured by measurement, not by argument** |
| §7 carries **17** rows | `awk` over §7, header + separator excluded | **17** ✓ — membership unchanged, as the counting lock requires |
| §6.D cargo **9 + 6 + 2 = 17**, three register rows | read §6.D | ✓ exact |
| mechanism **F**: members = exactly KF.W11 · KF.W12 · KF.W13 | `grep -ohE 'KF\.W1[1-9]' waves/*.md \| sort \| uniq -c` | **KF.W11 85 · KF.W12 65 · KF.W13 89; no `KF.W14`+ anywhere** ✓ — no mint without a home |
| proof roster **3** at `origin/master` (`:50`/`:51`/`:52`) | `git show 81a56990:package.json \| grep '"proof'` | ✓ byte-exact, all three |
| `.tap-floor` → 2 hits = `:81` comment + `:82` selector | `git grep -n 'tap-floor' 81a56990 -- demo/styles/design-idioms.css` | ✓ exact |
| the **LAW-A prune census**, three `sync-step.measure.test` hits incl. `test/physics/sync-step.test.ts:24` | `git grep -nF 'sync-step.measure.test' 81a56990 -- test/ bench/ src/ demo/ scripts/` | ✓ **THREE**, the third exactly as declared |
| prune set = **6 paths**, **zero live import specifiers** | `git grep -c 'from.*<tail>\|import.*<tail>' 81a56990 -- src/ demo/ test/ scripts/` ×6 | ✓ **0 for all six**. The LAND arm's LAW-A census is complete and reproduces |
| FOLD-FORWARD **§B :30 / §C :48, 15 numbered rows** (G-1's denominator) | `git show 81a56990:…/FOLD-FORWARD.md` | ✓ **15**, exact — G-1 stays 15 |
| **R5-1's frontier anchors** (the EH restoration's true anchors) | `git show 81a56990:…/EditorShell.vue \| sed -n '32,47p'` · `…/MbabbMenu.vue` | ✓ **exact**: shortcuts `Button` `aspect-square w-8 scale-on-hover` at **`:36`**; `DarkModeToggle` at **`:44-47`** with `title="Toggle dark mode"` at **`:45`** and `aspect-square w-8` at **`:46`**; `MbabbMenu.vue:19-21` with `title` at **`:20`**, `w-5` at **`:21`**. **R5-1's premise-strike is founded on bytes** |
| the six restored/routed EH rows are **NO-WAVE-OWNER at their bank** | `sed -n '41p;42p;51p;52p;53p;54p' kf-EditorHeader.md \| grep -c 'NO-WAVE-OWNER'` | **6 of 6** ✓ ⟨this is what makes **D-1** an enumeration failure and not an arithmetic one⟩ |
| **COHESION's §0 anchors** — §0a `:138` · §0b `:156` · §0c `:170` · §0d `:185` | `grep -n '^## §0' COHESION.md` | ✓ **byte-exact at all four**; `grep -c 'KF\.W10' COHESION.md` → **0**, so the ownership gap is real and correctly declared open |
| INBOX **56,702 B**, five `UNREAD` at `:4`/`:5`/`:19`/`:29`/`:95`; `O-21` → **0**, maximum **O-20** | `wc -c` · `grep -n` ×3 | ✓ **exact** — G-6's RED leg (v) is correctly stated and W10 is right to mint nothing |
| `C-14`'s bank at `kf-ChannelControls.md:70` | `sed -n '70p'` | ✓ **byte-exact**, severity MINOR, *cost → SS-13*, `NO-WAVE-OWNER` — quoted without re-grading |
| **the W6↔W10 seam re-run** (R5-9 row 12), second reading | `grep -coE 'CH2-02\|BG-5\|GU-1\|GU-2\|subject-legible' KF-W6.md KF-W9.md` · `grep -cE 'dock contract\|Glass §4' …` | **W6 16 · W9 28** and **W6 2 · W9 4** — **the second reading is EXACTLY the round's final state**. The seam is two-ended and agreeing, as restated |
| the four subsumed names are not banked ids | `grep -ln 'CH2-02\|BG-5\|GU-1\|subject-legible' registry/adjudicated/kf-*.md` | **0 files** ✓ |
| **R5-12(1)** — §3.6 `.f` carries the AUTHORED quantifier | `grep -c 'IMPLEMENTED → VERIFIED'` → **1 line**; `grep -no` → **2** | ✓ **cured, and the receipt discloses its own self-reference** (*"the second being this pasted command itself"*) rather than printing a figure the reader cannot reproduce. **PASS-5's D-4 is closed exactly.** |
| **R5-12(2)** — the ownership vehicle re-cut off `§0c` | read all nine `§0c` sites + the `§0e` sites | ✓ **no site still names `§0c` as the ownership vehicle**; the shape is now *"a dated COHESION addendum mirroring §0b — `§0e` or a successor letter, because §0c and §0d are occupied"*, stated at the header, the scope block, OP-6, §6.C-E and dissent 2. **PASS-5's D-1 coordinate half is cured** ⟨its receipt's arithmetic is not — **D-5**⟩ |
| **R5-12** — §6.C-E cites COHESION **§0d** as the landed boundary line | read §6.C-E | ✓ — the upward declaration is recorded as **DISCHARGED historical fact**, not re-issued as a request |
| **R5-10(1)/(2)** — `C-14` booked INSIDE the census | `grep -c 'C-14' KF-W10.md` → **6** | ✓ mechanism-D **row 9**, with its SHADOW line (LAW F(1)), its §8 disposition row, its per-row bank re-read, and the G-2-blanket defence explicitly re-rejected. **PASS-5's escape (D-3) is cured structurally.** |
| **R5-2 / D-2** — the closure condition re-points to CLOSE-CERT-5 | `grep -c 'PASS-5/CLOSE-CERT-2.md'` → **6**; `grep -c 'PASS-5/CLOSE-CERT.md'` → **0** | ✓ — the void round-4 seal is named as void, the twelfth-write attribution carried, `PASS-4/CLOSE-CERT.md` unedited (E-3) |
| four-verb status: SPECIFIED **file-scope YES**, IMPLEMENTED **NO**, VERIFIED **NO** | read §1 | ✓ — **nothing is stamped**; the scope lock is stated identically at five sites |

**The posture axis, itemised.** **W4 head**: named, not merely satisfied — §6.B carries *"KF.W4's SEQUENCING-HEAD LAW, named rather than merely satisfied"* by §-anchor with the numeric convenience struck ✓. **W3 gated**: carved out **by name** at §1 (*"KF.W3 IS CARVED OUT BY NAME … the carve-out is written, not left to inference"*), cut to bounds-FINAL + gate-state, never the verb ✓. **O-21**: named **by id** at all four W10-side sites — OP-3, G-6's RED leg (v), §6.C-B and §6.C-0 edge 6 — with the mint correctly **not** performed and `grep -c 'O-21' INBOX.md` → 0 re-measured ✓. **§6.D successor register**: present, three rows, cargo `9+6+2=17`, travelling locks, both minting citations, blast-radius receipts, one verb each ✓. **COHESION §0d cited** ✓. **The EH-4/5/8 restoration with true anchors**: verified at `81a56990` — the anchors are real, the premise-strike is founded, and **W6's** notification is received at G-2 (`:411`) anchor-only without being converted into an obligation ✓ — **but W0's is not: D-1.**

---

## §1 ID-KEYED CENSUS — re-enumerated BY RECORD, then by every surface that routes here

*Counting rule, stated at the enumeration (R5-11): one row = one routed obligation as filed at its source; `B18-12/13/14` travel as ONE row (their source table files them as one); a duplicate between mechanisms is counted once, at its first mechanism, and noted. The enumeration source for mechanism D is **the siblings' current bytes**, never a prior roster.*

### 1.1 Mechanism A — explicit `KF.W10` routing cells in the 58 records

`grep -nE 'KF\.W10|KF-W10' registry/adjudicated/kf-*.md` → **15 hits in 12 records**. Ten are routing-law preambles that declare the taxonomy and route nothing; two are verdict roll-ups restating rows booked elsewhere in the same record (kf-AnimatedText `:137` ≡ A-1+A-2; kf-EditorStartScreen `:151` ≡ A-3). **Four are true routing cells:**

| # | id | record | disposition |
|---|---|---|---|
| 1 | **KF-AT-21** | kf-AnimatedText | **BOOKED** — G-5 addendum 1 |
| 2 | **KF-AT-26** limb **(e)** | kf-AnimatedText | **BOOKED** — G-5 addendum 4 (ANTI-REBOOK, limb (e) only) |
| 3 | **KF-EST-23** | kf-EditorStartScreen | **BOOKED** — G-5 addendum 2 (CORRECTION-BOUNDARY LOCK) |
| 4 | **KF-HA-4** manifest arm | kf-HeroAurora | **BOOKED** — G-5 addendum 3 (SPLIT-LOCK) |

⟨The corpus is **live**: it grew by four untracked records in the current window (`kf-MatrixEditor.md`, `kf-SequencePlayhead.md`, and the two `wb-*` rows outside this corpus). **None carries a `KF.W10` routing**, and 58/57/1,216 is unmoved. W10 states this class as a dated observation at D-7; the statement holds.⟩

### 1.2 Mechanism B — filed with NO wave, homed here by M-25 route-by-mechanism

| # | coordinate | disposition |
|---|---|---|
| 5 | kf-ChromeDock `## DISSENT` item **4** — no id filed | **BOOKED** — never-cite entry **(6)**, keyed `CD-DISSENT-4`, a declared positional key at every site |
| 6 | kf-EditorHeader **killed-claim #8** | **BOOKED** — never-cite entry **(7)**, with the REPO-SCOPED-NOT-ABSENT restatement |

### 1.3 Mechanism C — the sole carry, `KF-W6-CARRY.md` → KF.W10 (five items; two ≡ A)

| # | id | disposition |
|---|---|---|
| 7 | **CARRY-C-3** | **BOOKED** — record block on the FINAL roster |
| 8 | **CARRY-C-4** | **BOOKED** — record block, G-W6-4 the measurement of record |
| 9 | **CARRY-C-5** | **BOOKED** — record block, routing split declared |

### 1.4 Mechanism D — sibling X·KF specs naming this wave as their terminus

**Swept at the siblings' round-5 FINAL bytes**, which is what surfaces rows 28–32.

| # | obligation | source | disposition |
|---|---|---|---|
| 10 | **OG-KF1** | KF-W0 §Sequencing OUTBOUND row + §Carry C-18/X-1 | **BOOKED** — G-3 |
| 11 | **the 357/414 block** | same row · KF-W4 §Sequencing · KF-W5 §Carry | **BOOKED** — G-4 |
| 12 | **B18-12 / B18-13 / B18-14** | KF-W0 §Sequencing, carried-unresolved table | **BOOKED** — G-4, UNRESOLVABLE-BY-CONSTRUCTION |
| 13 | **B18-27** | same + KF-W5 §Carry | **BOOKED** — G-4, settle-or-drop |
| 14 | **KF-W8-R-4-STRUCT-PAIR** | KF-W8 §Sequencing, `R-4` | **BOOKED** — §3.1 record block |
| 15 | **R-4's THREE RE-OPEN TRIGGERS** | KF-W8 `R-4`, the *"TRIGGER, named"* clause | **BOOKED** — verbatim |
| 16 | **KF-W6's sixth cross-edge item** | KF-W6 §Sequencing `→ KF.W10` | **BOOKED** — mechanism-D row 7, discharged as G-2's ∅ |
| 17 | **KF-W7's SWAP-verdict receipt** | KF-W7 §Sequencing `→ KF.W10` | **BOOKED** — G-2 alphabet + §6.C-0 edge 3 |
| 18 | **KF-W9/SS-13's capture packet + §Bounds capture-receipt row** | KF-W9 `S-8`/`S-10`/§Bounds | **BOOKED** — OP-4 + edge 4 |
| 19 | **KF-W3's `KF-HA-19` E-14.5 booking** | KF-W3 §Excluded `E-14.5` | **BOOKED** — edge 2 |
| 20 | **KF-W0's C-17 mint-order answer** | KF-W0 §Sequencing OUTBOUND row | **BOOKED** — edge 1 |
| 21 | **KF-W1's mail-cure instrument `O-21`** | KF-W1 cross-edge 11 · `C-10` · `G-KF1-7` | **BOOKED BY ID** — edge 6 ⟨its transcript does not reproduce — **D-3**⟩ |
| 22 | **KF.W11 · KF.W12 · KF.W13, as waves** | KF-W4 §Sequencing R-15 · KF-W1 edge 9 | **BOOKED** — §6.D |
| 23 | **KF-W6's R4-1 ADOPTION declaration** | KF-W6 §Carry/§Excluded, R4-1 | **BOOKED** — G-2's acceptance (`ADOPTED-BY-KF.W6`) + §6.D anti-re-book note |
| 24 | **KF-W7's D9 second-end cite** | KF-W7, D9 | **BOOKED** — §6.D KF.W12's locks column |
| 25 | **KF-W9's R4-4 blast-radius hand-off** | KF-W9 §Carry, R4-4 | **BOOKED** — §6.D rows 1 and 3 |
| 26 | **KF-W4's R4-8 minting-end + stable-anchor back-cite** | KF-W4 §Sequencing | **BOOKED** — §6.D's minting citations |
| 27 | **`C-14` — "terminalization at KF.W10"** | KF-W6 §Excluded (D-P4-7) ⟨`kf-ChannelControls.md:70`⟩ | **BOOKED at round 5** — mechanism-D row 9 + SHADOW + §8 row. **PASS-5's escape, cured** |
| 28 | **KF-W6's round-5 SHADOW notification** — EH-4/5/8 RESTORED-LIVE; *"KF.W10 (§5 `G-2`, told that its left hand is unchanged; §6.D unchanged)"* | KF-W6 round-5 shadow ledger | **BOOKED** — G-2's SECOND INBOUND DECLARATION, received anchor-only, no obligation minted |
| 29 | **KF-W8's round-5 SHADOW notification** — *"KF.W10 ⟨§6.D … unchanged; … no cargo moves⟩"* | KF-W8 round-5 shadow ledger | **BOOKED** — §2b.1's arm run, recorded as a notification |
| 30 | **KF-W9's round-5 SHADOW notification** — *"KF.W10 (the six anchors' host — anchor-only, no motion asked of it)"* | KF-W9 `SHADOW (LAW F(1))` | **BOOKED** — §2b.1's arm run |
| 31 | **KF-W7's round-5 SHADOW notification** — *"KF.W10 (§6.D rows 1 and 3 gain two new citing ends)"* | KF-W7 `SHADOW LINE` | **BOOKED** — §2b.1's arm run |
| 32 | **KF-W0's round-5 SHADOW notification** — *"citing / terminus waves notified = { … **KF.W10 (§E · `NWO-TERMINAL-SWEEP` · G-2, the terminus for the six NO-WAVE-OWNER ids)**}"*, discharging §Excluded's `EH-2 · EH-3 · EH-12 · EH-13 · EH-14 · EH-15 → NO-WAVE-OWNER under G-2's terminal sweep — **6 ids** | **KF-W0 §Excluded + its round-5 SHADOW ledger** (R5-1(7)) | **ESCAPED — D-1** |

*Non-members, checked and dismissed by reading:* KF-W1's shadow notifies `{KF-W7, KF-W9, RECONCILE}` — no W10 leg; KF-W3's states *"Notified: none required"*; KF-W2 and KF-W4 file no round-5 shadow naming this wave; KF-W5's SHADOW names KF.W10 only inside the **already-booked** Census-S-2 routing (*"doc-authority addenda = KF.W10"*, struck set = ∅ rows, no notification list) and mints nothing new.

### 1.5 Mechanism E — program inheritance

| # | id | disposition |
|---|---|---|
| 33 | **FF-B-DISCHARGE** (15 rows, re-counted at the source) | **BOOKED** — G-1 |
| 34 | **NWO-TERMINAL-SWEEP** | **BOOKED** — G-2 |
| 35 | **OD-V3** | **BOOKED** — G-3 |
| 36 | **OD-V5** | **BOOKED** — G-3 |
| 37 | **W9-STAGING** | **BOOKED** — G-7 |
| 38 | **COORD-TERMINAL** | **BOOKED** — G-6 |

### 1.6 Mechanism F — the minted-wave roster

Members at this clock = exactly the three of row 22, each with a §6.D row. `grep -ohE 'KF\.W1[1-9]' waves/*.md` → **KF.W11 · KF.W12 · KF.W13 only**. **No mint without a home.** Nothing escapes here.

> **routed 38 · booked 37 · escaped 1.**

**On the denominator.** `PASS-5/KF-W10-CHECK.md` §1 — this file's cited denominator of record — found **routed 33 · booked 32 · escaped 1**. The delta 33 → 38 is **exactly the five round-5 SHADOW notifications** (rows 28–32), a class that did not exist before LAW F minted it. Four of the five are booked; **the fifth is the escape.** This is the fourth consecutive round in which the escape is a sibling's new mechanism-D routing invisible to a census enumerated at the prior round's clock — and the first in which the instrument built to catch it (the close-clock arm) **returned the escape in its own output** and the seat read past it.

---

## §2 GATES — born-RED with reachable green

All seven remain born-RED with a re-executed witness, and all seven retain a green a seat of this wave can reach.

- **G-1** (15/15 — the §B denominator re-counted at `81a56990`: exactly 15 numbered rows between `:30` and `:48`), **G-3** (OD-V3 `:7` HELD / OD-V5 `:9` DEFERRED, both re-read; OG-KF1 at `INTAKE-ADJUDICATION-2026-08-03.md:232`), **G-5** (four documents, denominator locked; the frontier symbol census re-run), **G-6** (RED restated, leg (v) naming `O-21` by id, `O-21` → 0 in INBOX re-measured), **G-7** (LAND-or-KILL, both arms attainable; the LAW-A census is **complete and reproduces**: 6 modules, 0 live specifiers, 3 `sync-step.measure.test` hits).
- **G-2** holds its round-4 repair: the right hand is *"AUTHORED X·KF wave bounds ∪ §6.D's cargo enumeration"*, both computable from artifacts that exist; L-2's vacuity trap does not fire; the falsifier convicts a right hand computed from authored bounds alone and a §6.D row whose cargo does not sum to `9 · 6 · 2` (it does: **17**). Its **left hand is genuinely unchanged at 58/57/1,216** — which is precisely why **D-1** is an enumeration failure and not an arithmetic one, and why it is not fatal to the gate.
- **G-4**'s partition instrument is sound and — for the first time in three passes — **its numbers reproduce exactly** (27 files / 98 occurrences / 69 lines, all three per-class triples). The *"reconciled by subtraction"* sentence is **STRUCK by name**, with *"no figure in this cell is ever again produced by subtraction"* stated in its place. **PASS-5's D-5 is cured by the command, not by argument.**

**Corpus-derived operands**: G-2's left hand, G-4's field, G-5's anchors, G-7's prune set and the C-14 bank are each computed from the corpus or the frontier and each re-derived here. **Lawful landing surfaces**: every act of `.a`/`.c`/`.d` writes append-only addenda inside §4's bounds; `.e` touches only the branch; `.f`'s acts (both ledgers, `FINAL-KF.md`, the sibling four-verb rows) are all in-grant, and §3.6's imperative now carries the **AUTHORED** quantifier so the three unauthored formations take no verb. **No act lacks a bounds row.** **No self-voiced closure**: the census carriage, the anchor-cleanliness claim and the LAW-A exhaustiveness claim are each carried by citing a dated conformance artifact by path in LAW-B form.

---

## §3 DEFECT REGISTER

### D-1 · MAJOR · **THE ESCAPE — KF-W0's round-5 act routes SIX NO-WAVE-OWNER ids to this file's G-2 terminal sweep and names KF.W10 as their terminus; the close-clock arm returned the routing in its own output and the file books nothing**

**Receipt.** `KF-W0.md:738`, added this round under its D-5 / RULINGS-5 **R5-1(7)**:

> **`EH-2` · `EH-3` · `EH-12` · `EH-13` · `EH-14` · `EH-15` → NO-WAVE-OWNER** under G-2's terminal sweep — the **second** of the three rows above. **6 ids.**

and `KF-W0.md:743`, its LAW-F SHADOW line:

> **citing / terminus waves notified = {KF.W6 …, KF.W9 …, KF.W10 (§E · `NWO-TERMINAL-SWEEP` · G-2, the terminus for the six NO-WAVE-OWNER ids)}**

The six are real, banked, and NO-WAVE-OWNER: `KF-W0.md:712` anchors them at `kf-EditorHeader.md:41 · :42 · :51 · :52 · :53 · :54`, and `sed -n '41p;42p;51p;52p;53p;54p' kf-EditorHeader.md | grep -c 'NO-WAVE-OWNER'` → **6 of 6**, this seat.

**`grep -oE 'EH-[0-9]+' KF-W10.md | sort | uniq -c` → `EH-1 ×2 · EH-4 ×3 · EH-5 ×3 · EH-8 ×3`. Not one of the six appears anywhere in this file** — not at §2b.1's mechanism-D roster, not at G-2's acceptance table, not at §6.C-0, not at §7, not at §8, not in the round-5 shadow ledger.

**And the instrument caught it.** §2b.1's **MECHANISM-D CLOSE-CLOCK ARM** (R5-10(3), adopted program-wide this round) pastes its own command and asserts its result:

> ⟨command⟩ `grep -nE 'KF\.W10' KF-W*.md | grep -iE 'terminaliz|terminal|MOOT|unhomed|carried to|at close'`, **every hit resolves to a roster member** … **FOUR inbound NOTIFICATIONS are received and recorded** … **KF.W6** · **KF.W8** · **KF.W9** · **KF.W7** … **No unbooked terminus survives this run.**

Re-run verbatim at this seat, at the round's final bytes: the command returns **`KF-W0.md:743`** — the SHADOW line above — among its three W0 hits. **The arm's own output contains the escape, the arm's stated verdict denies it, and the notification roster is FOUR where the bytes carry FIVE.** W0 wrote at **15:17:38** and this file at **15:18:25**: the line was on disk 47 seconds before the last write, and W0 is a stage-1 sibling this file is under standing LAW-C obligation to re-consume at final bytes.

**The available defence is the one this file already rejected, twice.** G-2's blanket covers the six by construction — kf-EditorHeader is one of the 58, and *"carried to the next formation boundary's ledger"* is a lawful terminal word. But §2b.1's own discipline is that a reader auditing a sibling's edge against this file must find **the item and its answer inside the census** — *"not five in a table and one in a paragraph"* — which is why KF.W6's sixth cross-edge item was promoted to row 7 at round 3 and why `C-14` was promoted to row 9 at round 5, **on this exact reasoning, in this round, three sections above the failure**. A reader auditing KF-W0's §Excluded against this file today finds six named, id-bearing, sibling-declared termini and **no answer inside the census** — which §2 calls closure by omission, the one failure it declares fatal.

**Fourth consecutive round, same shape, with the character changed once more**: PASS-3's escape (R-4's triggers), PASS-4's (the three minted waves) and PASS-5's (`C-14`) were sibling rows invisible to a census enumerated at the prior round's clock. **This one was visible.** The enumeration source was corrected; the reading was not. What R5-10(3) built was a command; what it did not build is the discipline that the command's output is diffed **row-by-row** against the roster rather than summarised into a sentence.

### D-2 · MAJOR · **`PASS-5/CLOSE-CERT-2.md` §7.6 certifies a LAW F(2) terminus re-sweep it did not perform — the same W0→W10 leg, asserted clean**

**Receipt.** §7.6, *"The R5-1 BLOCKER chain, verified end-to-end (LAW F(2): every terminus re-swept)"*, closes:

> `KF-W10.md` — the inbound SHADOW notification received anchor-only and **not** converted into an obligation. **Every named terminus and every citing sibling re-swept; nothing of the restoration is stranded.**

**Singular.** The one leg verified is KF.W6 → KF.W10 (G-2 `:411`). The section's own preceding sentence records that *"`KF-W0.md` §Excluded — the reciprocal landed, with the family's routing enumerable and its arithmetic stated (`3 + 2 + 6 + 4 = 16 ✔`)"* — **it read the W0 reciprocal, arithmetic and all, and did not follow the `6` to its named terminus.** `grep -on 'EH-[0-9]*' CLOSE-CERT-2.md` returns EH-4/EH-5/EH-8 only, at one line: the cert never handled the other thirteen members of the family it certifies as unstranded.

LAW F(2) is explicit — *"the RECONCILE seat re-sweeps **every named terminus and every citing sibling** for every listed id before close (this is how … `C-14` would have been caught when W6 minted its terminus)"*. The law was written from the `C-14` miss and reproduced the `C-14` miss on its first execution, one sibling over. **Scoped honestly**: nothing else in the cert fails — the hash gate is green (§0.1), §7.1–§7.5 each re-run and hold at this seat, and the round-4 seal's re-certification is sound. What fails is the one certification that claims exhaustiveness over the class this round's headline law exists to close.

### D-3 · MAJOR · **The D-6 transcript, ordered "printed whole", is 12 of 13 — and the coordinate it drops was minted by the certifying seat itself, in an edit it made before re-writing this very cell**

**Receipt.** `KF-W10.md:533`, §6.C-0 edge 6, whose entire subject is a coordinate list that was not its command's output:

> **Printed whole, re-run at this write** ⟨command⟩ `grep -n 'O-21' KF-W1.md | awk -F: '{printf ":%s ", $1}'` → **`:37 :58 :88 :102 :199 :331 :334 :383 :424 :455 :592 :626`** — **12 lines / 17 occurrences**

Re-run verbatim, this seat, at KF-W1's final bytes:

```
$ grep -n 'O-21' KF-W1.md | awk -F: '{printf ":%s ", $1}'
:37 :58 :60 :88 :102 :199 :331 :334 :383 :424 :455 :592 :626
$ grep -c 'O-21' KF-W1.md   → 13        $ grep -o 'O-21' KF-W1.md | wc -l  → 18
```

**`:60` is missing; both figures are understated by one.** The cell exists to convict round 4 for printing *"five coordinates beside a command whose output was NINE"*, is ordered by RULINGS-5 §END KF-W10 **D-6** to print the transcript **whole**, argues that *"three true transcripts at three clocks (5-printed-of-9 · 9 · 12) is the reason this cell is now anchor-first"* — and is itself **12-printed-of-13**.

**The attribution is on the record and it is worse than drift.** `KF-W1.md:60`'s `O-21` token was minted by the **RECONCILE seat's own W1 edit** (`git diff -U0` hunk `@@ -60 +60 @@`, the ⟨RECONCILE SEAT⟩ insertion quoting *"`O-21` — KF.W1's outbound row"*), written at **15:17:38**. That same seat then edited **`KF-W10.md:533`** at **15:18:25** — hunk `@@ -533 +533 @@`, whose sole change, word-diffed, is `PASS-5/CLOSE-CERT.md` → `PASS-5/CLOSE-CERT-2.md`. **It re-wrote the cell whose transcript it had falsified 47 seconds earlier, re-pointed a path inside it, and did not re-run the command printed two clauses away.**

This is CLOSE-CERT-4 §8's residual class 2 — *"a figure or coordinate list printed beside a pasted command that is not that command's output"* — firing for the second consecutive round in **the same cell**, under **LAW E(5)'s regex widened to exactly this spelling** (`grep -n '<pat>' <sib>.md → :NNN`), inside the round that widened it. **What survives**: the substance is untouched and, if anything, strengthened — all thirteen coordinates resolve, the five round-4 coordinates are all live and true, and the cell's anchor-first posture means no line number is load-bearing. **What fails is the receipt**, in the one cell of this file whose subject is receipts that fail.

### D-4 · MINOR · **The close-clock arm's stated output names two files its own pasted command does not return**

**Receipt.** §2b.1 `:122` enumerates the terminus-filtered hits and their roster homes, including *"**W9's capture packet (row 19 / edge 4)**"* and *"**W2's/W4's/W5's packet-routing restatements (row 23 / §6.D)**"*. Re-run verbatim at final bytes, per-file:

```
$ grep -nE 'KF\.W10' KF-W*.md | grep -iE 'terminaliz|terminal|MOOT|unhomed|carried to|at close' | cut -d: -f1 | sort | uniq -c
   3 KF-W0.md   4 KF-W1.md   18 KF-W10.md   1 KF-W2.md   3 KF-W3.md
   1 KF-W5.md   10 KF-W6.md   5 KF-W7.md    3 KF-W8.md
$ grep -nE 'KF\.W10' KF-W9.md KF-W4.md | grep -iE '…' | wc -l   → 0
```

**KF-W9.md and KF-W4.md return ZERO hits under this filter** (W9's `SHADOW … terminus waves notified = KF.W10` reads *"terminus"*, which the filter's `terminal` alternative does not match). The two are genuinely booked — at rows 18/30 and 26 above — by **other** mechanisms; the defect is that the receipt attributes them to an output that does not contain them. R5-11 is unambiguous: *"a receipt whose own arithmetic does not reproduce is a defect REGARDLESS of the scope's truth"*, and *"the pass-6 checks test receipt arithmetic before testing scope"*. Booked as MINOR because both obligations hold under a different, verified mechanism and no denominator moves — but the same paragraph carries **D-1**, and a receipt that lists members its command never returned is precisely the reading discipline whose absence let the W0 row through.

### D-5 · MINOR · **The ownership-vehicle sweep's pasted command names a moving revision, and its two figures no longer reproduce**

**Receipt.** §2b.1 `:166`, the ROUND-5 SCOPE RECEIPT:

> ⟨command⟩ `git show HEAD:docs/tranches/X/keyframes/waves/KF-W10.md | grep -c '§0c'` → **10 lines** (`| grep -o` → **13 occurrences**)

Re-run this seat: **9 lines**, **23 occurrences**. `HEAD` is now `fffb9685` (2026-08-29 15:07:05, *"r5/r3 repair halves banked through the wall"*) — **the commit that banks this very round's repair** — so the pasted command no longer reads the pre-cut state it was written to enumerate, and prints a post-cut file whose §0c token count has more than *risen*: the re-cut, which strikes §0c as the vehicle, necessarily *names* §0c more often than the text it replaced.

This is LAW E(4)'s disease in git form. The law retired per-seat **mtime** stamps on the stated ground that *"a seat stamps clocks it cannot keep"*; `HEAD` is a clock of exactly that kind, and it moved inside the round. **The scope claim itself is sound and was verified independently**: no site in this file still names `§0c` as the ownership vehicle; all nine surviving `§0c` mentions are the strike, its rationale, or the COHESION anchor enumeration; the re-cut form (*"§0e or a successor letter, because §0c and §0d are occupied"*) is present at the header, the scope block, OP-6, §6.C-E and dissent 2; and COHESION's anchors reproduce byte-exact at `:138`/`:156`/`:170`/`:185` with `grep -c 'KF\.W10' COHESION.md` → **0**. **The cure landed; its receipt did not.**

### D-6 · MINOR · **CLOSE-CERT-2 §9's opening-hash column misquotes its own immutable frozen source at two of eleven rows**

**Receipt.** §9 states *"The opening column is quoted from `RULINGS-5` LAW E(3)'s hash-bracketed table (an immutable frozen source, not a per-seat stamp)."* Against that table:

| row | RULINGS-5 LAW E(3), opening sha256 | last four | §9 prints | verdict |
|---|---|---|---|:--:|
| KF-W6.md | `83509bf9…c2636d7af0a11e` | **`a11e`** | `83509bf9…**0a11**` | ✗ |
| KF-W8.md | `126426de…be090429273e2` | **`73e2`** | `126426de…**3b62**` | ✗ |

The other nine opening abbreviations and **all eleven closing hashes** are exact. **Nothing downstream moves** — the *"all eleven moved"* verdict is true under either transcription, and the gate LAW E(2) hands the pass-6 seat turns on the closing column, which reproduces to the byte (§0.1). It is booked because LAW D(1)/D(3) govern a *quoted* value from a *frozen* source, and because the exhibit is the one instrument this round minted to be unfalsifiable: a hash table that misquotes two of its own eleven rows certifies its method rather than its write-set, which is the exact sentence this file uses against the round-4 cert.

### D-7 · INFO · **The frontier of record is not the checkout, and the divergence is now 41 commits — recorded so a later seat does not read the tree**

**Receipt**, this seat, in `/Users/mkbabb/Programming/keyframes.js`:

```
$ git rev-parse origin/master        → 81a56990736ced5b5edde0b84c527680ac7689b1   (2026-07-18)
$ git rev-parse HEAD                 → 8281638c0ac4ac8c54a67a018ca5bf6a9117174f   (2026-07-28, local master)
$ git merge-base --is-ancestor 81a56990 HEAD   → FALSE
$ git rev-list --left-right --count master...origin/master   → 1  41
$ git status --porcelain | wc -l     → 252
```

The two are **divergent**, not merely offset, and the checkout carries 252 dirty paths. R3-2's disqualification of the worktree and R5-2/§END's *"Frontier of record for every keyframes-side re-measurement: `origin/master 81a56990…`"* are therefore load-bearing, not ceremonial: a seat that reads the checkout reads a different tree with a different `package.json` proof roster (**2**, not 3) and a different `MbabbMenu.vue` path. **Every keyframes witness in this check was executed via `git show`/`git grep` at `81a56990`, and all five reproduce exactly.** Recorded because this file's §2b.1 substrate declaration covers the eleven specs and — since LAW E(5)(iv) — four value-side substrates, but names no keyframes-side revision discipline of its own; it inherits one from the rulings, and an inherited discipline is one repair-round away from being an unwritten one.

---

## §4 M-25 depth · mechanism S · scope

**Locks: HOLD.** All seven §3.2 sequencing locks reproduce against their banks. The **KF-AV-28** rider is carried (not merely cited) at its three anchors, with the R-10 governed-row enumeration and the extra terminal word in G-2's alphabet, and its governed rows may take LANDED/KILLED only once KF.W7's surface verdict exists.

**Riders: HOLD.** KF-HA-4's SPLIT-LOCK, KF-AT-26's ANTI-REBOOK (limb (e)), KF-EST-23's CORRECTION-BOUNDARY LOCK, CARRY-C-4's PREMISE-CORRECTION, and the DENOMINATOR LOCKS (G-1 stays **15** — re-counted at the source; G-5 stays **4**) are each stated wherever they bind and neither is inflated by the round-5 additions.

**Mechanism S (LAW F) — the file's own acts: HOLD.** This file's single round-5 act that mints a routing (`C-14`, mechanism-D row 9) carries a complete SHADOW line: minted set with its **own** banked anchor re-read per LAW F(3) — *"per-row, never per-carrier"* — struck set ∅, disposition per id, and a notified list naming KF.W6 §Excluded, KF.W9/SS-13 (anchor-only, no obligation minted) and this file's G-2 and §8. The §8 disposition row and the round-5 shadow ledger at `:639` enumerate it a second and third time. **Every moved/dropped row in this file carries its shadow.**

**Mechanism S — the shadows addressed TO this file: FIVE arrive, FOUR are received.** The reception discipline for the four is correct and generous — W6's is recorded at G-2's acceptance block *because it touches the sweep's left hand*, and the file states outright that *"a sweep that silently absorbs a sibling's restoration is the same closure-by-omission the mechanism-D close-clock arm exists to convict."* **That sentence is true, was written this round, and is the conviction of D-1**: the fifth shadow — W0's, routing six ids to this gate — is absorbed silently, by a file that named the failure mode in the paragraph that missed it.

**Route-by-mechanism: HOLD.** The never-cite sweep reproduces at three records; the two id-less coordinates W10 homes are the only two of the class filed with no wave; `CD-DISSENT-4` is spelled as a declared positional key at every site, with the coining audit cited rather than self-certified.

**Dissents: HOLD.** Six, none resolved by fiat. Dissent 2 is now **correctly premised** for the first time — its `§0c` vehicle is re-cut to *"§0e or a successor letter"*, the assignment is left as the root session's act, and the register is stated to record rather than assign. PASS-5's D-1 is cured at the coordinate.

**Scope discipline: HOLD, and it remains the best thing in this spec.** The file-scope vs sub-tranche-scope SPECIFIED distinction is stated identically at five sites, nothing is stamped, no product byte is opened, and §3.6's imperative now carries the ruled **AUTHORED** quantifier so the three unauthored formations take no verb from this close.

---

## §5 Verdict

**DEFECTIVE — 3 MAJOR · 3 MINOR · 1 INFO. Census: routed 38 · booked 37 · escaped 1.**

**The round-5 bank is the strongest of the six passes, and most of it is structural.** The hash gate — the round's headline law — **is GREEN at eleven of eleven**, which is the first time in this program's history that a certification's own falsifiability test has passed. PASS-5's four MAJORs are all genuinely cured: `C-14` is inside the census with a shadow line and a close-clock arm (D-3, cured by instrument); §3.6's quantifier carries the ruled spelling with a receipt that discloses its own self-reference (D-4, cured exactly); the `§0c` vehicle is re-cut at all its sites onto an unoccupied letter with COHESION's anchors re-measured (D-1, coordinate cured); the void round-4 seal is attributed, named void, and re-pointed without editing an immutable artifact (D-2, cured under E-3). G-4's field reproduces **exactly** for the first time in three passes, and the *"reconciled by subtraction"* sentence is struck by name. Every one of the twenty-odd receipts in §0 re-runs true, including all five frontier witnesses at `81a56990` and the seam's second reading, which is precisely the round's final state.

**It fails on one shape, and the shape has stopped moving up levels — it has started repeating inside the cures.**

- The escape is again a **sibling's new mechanism-D routing** — six NO-WAVE-OWNER ids sent to this file's G-2 by KF-W0's round-5 act — but for the first time **the instrument returned it**. The close-clock arm's own pasted command prints `KF-W0.md:743`; the arm's verdict says no unbooked terminus survives; the notification roster says FOUR where the bytes say FIVE (**D-1**).
- The certificate's LAW F(2) terminus re-sweep — the law written *from* the `C-14` miss — **reproduced the `C-14` miss on its first execution**, reading W0's reciprocal and its arithmetic and not following the `6` to its named terminus (**D-2**).
- And the cell whose whole subject is *"a coordinate list printed beside a pasted command that is not that command's output"*, ordered to print its transcript **whole**, prints **12 of 13** — dropping a coordinate the certifying seat minted itself, 47 seconds before re-writing that cell to fix a path in it (**D-3**).

The lesser three are the same lesson at the receipt layer: an output enumeration naming two files the command does not return (**D-4**), a scope receipt pinned to `HEAD` — a clock the seat cannot keep, one law short of the mtimes LAW E(4) retired (**D-5**), and a hash table that misquotes two of its own eleven frozen rows (**D-6**).

**The pattern worth naming for round 6.** Rounds 3–5 were convicted of *enumerating from the wrong source*. This round the sources are right: the arm reads the bytes, the sweep roster has four classes, the regex is widened, the cert is hash-proven. What failed is **reading** — every one of D-1, D-2, D-3 and D-4 is a correct command whose output was summarised instead of diffed. The next instrument this program needs is not another census; it is the rule that **a pasted command's output is compared row-by-row against the roster it is claimed to satisfy, and the comparison is printed.**

A close wave's product is one terminal word per obligation, and its credibility is its denominators. This file's denominators are the program's, its shadow discipline is real, and its own acts are clean. **What is not yet clean is what it does with what it correctly went and looked at.**

*End of PASS-6 register. Read-only throughout; the sole write of this seat is this file.*
