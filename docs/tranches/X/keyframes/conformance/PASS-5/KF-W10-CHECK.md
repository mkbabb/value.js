# KF-W10 — PASS-5 FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W10.md` — **209,923 B / 634 L, mtime 2026-08-28 17:38:21** at this seat's read.
**Seat**: FRESH. `PASS-4/KF-W10-CHECK.md`, `PASS-4/RULINGS-4.md` and `PASS-4/CLOSE-CERT.md` were read **only** to learn which repairs were commissioned and which certification was owed — no finding, count, partition or escape list was imported from any of them. The census below is a per-record, id-keyed harvest from the 58 records' own bytes at `docs/tranches/V/megatranche/registry/adjudicated/`, the sole carry `carry/KF-W6-CARRY.md`, the ten sibling specs, and program inheritance — each mechanism swept at the substrate's **current** bytes, not at the round's declared clock.
**Clock**: 2026-08-28, after the round-4 repair bank and after `CLOSE-CERT.md`.
**Refs of record**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` (`git rev-parse origin/master`, this seat) — **every keyframes witness below was re-executed there**. Local `8281638c` appears only as declared historical context. value.js `tranche-u`, current tree bytes.
**First act, per RULINGS-4 §END**: `CLOSE-CERT.md` audited against the bytes. Its verdict holds in substance and **fails on its own §1 table** — see **D-2**.

**VERDICT: DEFECTIVE** — 4 MAJOR · 2 MINOR · 1 INFO.
**Census: routed 33 · booked 32 · escaped 1.**

---

## §0 What reproduced (stated first, because the round-4 repair bank is largely sound)

Re-derived read-only at this seat, at the refs of record. **Every command below was re-run; none is inherited.**

| claim in KF-W10 | re-derivation | result |
|---|---|---|
| registry census **58 / 57 / 1,216** | `ls kf-*.md \| wc -l` · `grep -l` · `grep -o` | **58 · 57 · 1,216** ✓ exact |
| FOLD-FORWARD `## §B` line 30, `## §C` line 48, **15** numbered rows | `git show origin/master:…/FOLD-FORWARD.md` | ✓ exact |
| OD-V3 `:7` **HELD** · OD-V5 `:9` **DEFERRED**, verbatim | `git show origin/master:…/OWNER-DECISIONS.md` | ✓ byte-exact, both still unruled |
| OG-KF1 at `INTAKE-ADJUDICATION-2026-08-03.md:232` | read | ✓ — the row naming `origin/master 81a56990` |
| proof roster **3** at `origin/master` (`:50`/`:51`/`:52`) | `git show origin/master:package.json \| grep '"proof'` | ✓ exact |
| the **ten** G-5 doc anchors | `git show` each at `81a56990` | ✓ **all ten resolve carrying the quoted text** — incl. `:109`, byte-checked: it **does** carry *"the F26-4 demo grapheme-bug is DISCHARGED"* AND *"the old raw-UTF-16 per-char split is gone"* (542 B line, both substrings present) |
| `.tap-floor` → 0 adopters; 2 hits = `:81` comment + `:82` selector | `git grep -n 'tap-floor' origin/master -- demo/styles/design-idioms.css` | ✓ exact |
| **the LAW A prune census, incl. the round-4 D-5 cure** | `git grep -nF 'sync-step.measure.test' origin/master -- test/ bench/ src/ demo/ scripts/` | ✓ **THREE hits**, the third being `test/physics/sync-step.test.ts:24` — **the PASS-4 D-5 miss is genuinely cured and the blanket is corrected**; prune set = **6 paths**, exact |
| VM-4: `package.json#version` **6.0.0**; CHANGELOG head `## 6.0.0` at line 6 | `git show` ×2 | ✓ exact, no Unreleased section |
| `v/w9-staging` = `b920b190`, live and unmerged; both kf ledgers present | `git ls-remote` · `git cat-file -e` ×2 | ✓ |
| INBOX **56,702 B**, five `UNREAD` at `:4`/`:5`/`:19`/`:29`/`:95`; `:96` I-28 **ROWED 08-28** · `:97` I-29 **ROWED 08-28**; `O-21` → **0**, maximum **O-20** | `wc -c` · `grep -n` ×3 | ✓ exact — **G-6's RED leg (v) is correctly stated and W10 is right to mint nothing** |
| §B-2's `COHESION-SC-1` re-key receipt | `grep -n 'SC-1\b'` on `COHESION.md` and `kf-SequenceScene.md` | ✓ `COHESION.md` `:120`/`:129`; `kf-SequenceScene.md` `:28 :57 :58 :106 :149` — **the collision is real and the D-6 re-key is the right cure** |
| **the KF-AV-28 rider's three bank anchors** | read `kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36` | ✓ **all three carry the rider text** (*"KF.W7's S-9 evaluation (KF-AV-28) may supersede any behavioral cure here"* / *"the KF-AV-28 rider"* / *"KF-AV-28's standing rider applies"*) |
| `CD-DISSENT-4` is a **declared positional key**, no id filed | `grep -oE 'DISSENT[ -]*[0-9]+' kf-ChromeDock.md` → 0; `:142` heading, `:147` item 4 | ✓ exact at all sites |
| the sole carry's `→ KF.W10` edge = **five items** | read `KF-W6-CARRY.md:361` (mtime 10:49:45, genuinely frozen) | ✓ exact; `:176` carries `KAD-12` |
| kf-EditorHeader entry (7)'s **REPO-SCOPED, NOT ABSENT** restatement | `git ls-tree -r --name-only origin/master \| grep -i headerribbon` → **one path**; value.js archive letter present, 2,878 B | ✓ both halves true; two different documents in two repos |
| §7 carries **17** rows | enumerated over §7 | ✓ **17** — membership unchanged, as the counting lock requires |

**The six inbound-dependency edges, re-verified at the siblings' TRUE FINAL bytes — the drift class the round was built to kill is DEAD on this surface.** Every one holds:

| edge | receipt as printed | re-run at final bytes this seat | verdict |
|---|---|---|---|
| **1** C-17 mint order ← KF-W0 (16:58:59) | `grep -n 'THE C-17-MINT CONSUMPTION EDGE' KF-W0.md` → 1 hit | **1 hit, `:649`**, inside the `KF.W10 · Fold Discharge & Close` OUTBOUND row | **HOLDS** |
| **2** `KF-HA-19` ← KF-W3 (16:56:52) | *"10 matching lines / 15 occurrences"* | `grep -c` → **10** · `grep -o \| wc -l` → **15** | **HOLDS, exact** |
| **3** SWAP receipt ← KF-W7 (final **17:33:23**) | reconcile: `grep -c 'KF\.W10' KF-W7.md` → 7; §Sequencing `:324`–`:363`; row at `:353` | **7** ✓ · §Sequencing `:324`, §Excluded `:364` ✓ · `:353` is the `KF.W10` row ✓ | **HOLDS** |
| **4** capture packet ← KF-W9 (final **17:32:08**) | `S-8` → `:248` · `S-10` → `:250` · §Bounds capture row → `:74` | **`:248` · `:250` · `:74`**, the last still `SS-13-CAPTURE-RECEIPT.md \| create (.e, serial)` | **HOLDS** |
| **5** R-4's triggers ← KF-W8 (final **17:34:06**) | `grep -n 'TRIGGER, named' KF-W8.md` → `:391` | **`:391`** | **HOLDS** |
| **6** `O-21` ← KF-W1 (final **17:32:20**) | `grep -n 'O-21' KF-W1.md` → `:88 :199 :331 :383 :455` | **`:88 :199 :331 :383 :455`** — all five | **HOLDS** (but see **D-6**) |

**And the two §6.D minting citations, byte-checked at their sources.** `KF-W4.md:256` carries *"**KF.W13 · Chrome, Dock & Transport Repair (2) — MINTED here, declared**"* and — verbatim, this seat — *"The register that records them is a **stage-2 sibling's act and is therefore cited by STABLE ANCHOR ALONE (LAW C(3)): `KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER`**"*, so the mint end and the register end name each other and neither carries the other's line numbers. `KF-W1.md:376` carries edge 9 verbatim: *"**→ KF.W11 (Demo Scene Repair) · KF.W12 (Authoring-Surface Repair) · KF.W13 (Chrome, Dock & Transport Repair) · KF.W6 · KF.W7.** Type: **HOMES NONE — routing declaration.**"* **PASS-4's single escape (D-3) is genuinely, structurally cured**: §6.D carries all three waves with cargo `9 + 6 + 2 = 17`, the six travelling locks, both minting citations, the R4-4 blast-radius receipts, the R4-1 anti-re-book note, and one verb.

**Mechanism F, run as ordered.** `grep -nEo 'KF\.W1[1-9]' waves/*.md` → the field is **exactly `KF.W11` · `KF.W12` · `KF.W13`** across all eleven specs; no `KF.W14`+ exists anywhere. Diffed against the authored spec set ∪ §6.D's register: **zero mints without a home.** The instrument works on its first run.

**Posture axis, itemised.** **W4 head**: named, not merely satisfied — §6.B carries the sequencing-head paragraph by §-anchor with the line number struck, and *"G-KFW4-1 precedes every unit `.a`..`.g`"* is stated ✓. **W3 gated**: carved out by name at §1, cut to *bounds-FINAL + gate-state, never the verb* ✓. **O-21**: named by id at all four sites PASS-4's D-8 named — OP-3, G-6's RED leg (v), §6.C-B, and the new §6.C-0 row 6 — with the source-end declaration (*"PRECEDES (hard) — the hardest downstream dependency this wave has"*) quoted and the mint correctly **not** performed ✓. **W11/W12/W13 per RULINGS-4**: present and coherent — §6.D, R-A's re-cut, G-2/OP-5's re-conditioning, the COHESION line owed, mechanism F ✓ **at every altitude but one (D-4)**. **Greens conditioned on artifacts that exist**: G-2's right hand is now `authored bounds ∪ §6.D cargo`, both of which exist; L-2's vacuity trap no longer fires ✓.

---

## §1 ID-KEYED CENSUS — re-enumerated BY RECORD, then by every surface that routes here

### 1.1 Mechanism A — explicit `KF.W10` routing cells in the 58 records

`grep -nE 'KF\.W10|KF-W10' registry/adjudicated/kf-*.md` at this seat returns **15 hits in 12 records**. **Ten are routing-law preambles** that *declare the taxonomy* and route nothing (kf-AmigaScene `:13` · kf-App `:35` · kf-ChromeDock `:7` · kf-ChannelOptions `:25` · kf-CubeScene `:19` · kf-CubeTarget `:21` · kf-EditorHeader `:7` · kf-EditorShell `:7` · kf-SquareScene `:17`, and kf-AnimatedText's own preamble limb). **Two are verdict roll-ups** restating rows booked elsewhere in the same record — kf-AnimatedText `:137` *"**KF.W10** the two stale doc authorities"* ≡ A-1 + A-2; kf-EditorStartScreen `:151` *"**KF.W10** the two U-lane doc-truth re-opens"* ≡ A-3. **Four are true routing cells:**

| # | id | record : line | disposition in KF-W10 |
|---|---|---|---|
| 1 | **KF-AT-21** | kf-AnimatedText `:61` | **BOOKED** — G-5 addendum 1 |
| 2 | **KF-AT-26** limb **(e)** | kf-AnimatedText `:71` | **BOOKED** — G-5 addendum 4 (ANTI-REBOOK, limb (e) only) |
| 3 | **KF-EST-23** | kf-EditorStartScreen `:90` | **BOOKED** — G-5 addendum 2 (CORRECTION-BOUNDARY LOCK) |
| 4 | **KF-HA-4** manifest arm | kf-HeroAurora `:41` | **BOOKED** — G-5 addendum 3 (SPLIT-LOCK) |

⟨The corpus grew by two records in this window — `kf-MatrixEditor.md` and `kf-SequencePlayhead.md`, both untracked at the tree. **Neither carries a `KF.W10` routing**, and the 58/57/1,216 census is unmoved. Recorded so a later seat does not read the growth as drift.⟩

### 1.2 Mechanism B — filed with NO wave, homed here by M-25 route-by-mechanism

The never-cite class was re-swept across all 58 (`grep -nilE 'never quoted|restated from scratch|unciteable|never citable'` → **kf-App.skeleton · kf-App · kf-ChromeDock**). The first two are already routed and are correctly **not** W10's (`KF-SKEL-22` rides the KF.W6/W9 contrast witnesses; kf-App `K-5`'s unciteable ratios ride the re-token remediation).

| # | coordinate | disposition |
|---|---|---|
| 5 | kf-ChromeDock `## DISSENT` (`:142`) item **4** (`:147`) — **no id filed** | **BOOKED** — never-cite entry **(6)**, keyed `CD-DISSENT-4` as a declared positional key |
| 6 | kf-EditorHeader **killed-claim #8** (`:86`) | **BOOKED** — never-cite entry **(7)**, with the REPO-SCOPED-NOT-ABSENT restatement, both halves verified |

### 1.3 Mechanism C — the sole carry, `KF-W6-CARRY.md:361` (five items; two ≡ A)

| # | id | disposition |
|---|---|---|
| 7 | **CARRY-C-3** | **BOOKED** — record block **on the FINAL roster** (see §2) |
| 8 | **CARRY-C-4** | **BOOKED** — record block, G-W6-4 the measurement of record |
| 9 | **CARRY-C-5** | **BOOKED** — record block, routing split declared |

### 1.4 Mechanism D — sibling X·KF wave specs naming this wave as their terminus

**Swept at the siblings' CURRENT bytes, not at the round's declared clock** — which is what surfaces row 18.

| # | obligation | source anchor | disposition |
|---|---|---|---|
| 10 | **OG-KF1** | KF-W0 §Sequencing OUTBOUND row + §Carry C-18/X-1 | **BOOKED** — G-3 |
| 11 | **the 357/414 block** | same row · KF-W4 §Sequencing · KF-W5 §Carry (`:433` *"C-7's citation law"*) | **BOOKED** — G-4 (4) |
| 12 | **B18-12 / B18-13 / B18-14** | KF-W0 §Sequencing, the carried-unresolved table | **BOOKED** — G-4 (1)(2)(3), UNRESOLVABLE-BY-CONSTRUCTION |
| 13 | **B18-27** | same + KF-W5 `:433` (*"C-8's slot 4-vs-5"*) | **BOOKED** — G-4 (5), settle-or-drop |
| 14 | **KF-W8-R-4-STRUCT-PAIR** | KF-W8 §Sequencing, `R-4` | **BOOKED** — record block |
| 15 | **R-4's THREE RE-OPEN TRIGGERS** | KF-W8 `R-4`, the *"TRIGGER, named"* clause | **BOOKED** — verbatim; verified at W8's **final** bytes |
| 16 | **KF-W6's sixth cross-edge item** | KF-W6 §Sequencing `→ KF.W10` (`:516`) | **BOOKED** — mechanism-D row 7, discharged as G-2's ∅ |
| 17 | **KF-W7's SWAP-verdict receipt** | KF-W7 §Sequencing `→ KF.W10` (`:353`) | **BOOKED** — G-2 alphabet + §6.C-0 edge 3 |
| 18 | **KF-W6's `C-14` — *"terminalization at KF.W10"*, homed at THIS round** | **KF-W6 §Excluded**, the `C-14` row (D-P4-7) ⟨bank `kf-ChannelControls.md:70`⟩ | **ESCAPED — D-3** |
| 19 | **KF-W9/SS-13's capture packet + §Bounds capture-receipt row** | KF-W9 `S-8`/`S-10`/§Bounds | **BOOKED** — OP-4 + edge 4 |
| 20 | **KF-W3's `KF-HA-19` E-14.5 booking** | KF-W3 §Excluded `E-14.5` | **BOOKED** — edge 2, now **MEASURED** two-ended |
| 21 | **KF-W0's C-17 mint-order answer** | KF-W0 §Sequencing OUTBOUND row | **BOOKED** — edge 1, now **MEASURED** |
| 22 | **KF-W1's mail-cure instrument `O-21`** | KF-W1 cross-edge 11 · `C-10` · `G-KF1-7` | **BOOKED BY ID** — edge 6 (PASS-4's D-8, cured) |
| 23 | **KF.W11 · KF.W12 · KF.W13, as waves** | KF-W4 §Sequencing R-15 block · KF-W1 edge 9 | **BOOKED** — §6.D (PASS-4's D-3, cured) |
| 24 | **KF-W6's R4-1 ADOPTION declaration** — `KF-APP-41` + kf-EditorShell `C-22`'s orphan-token limb leaving the NWO set | KF-W6 §Carry/§Excluded, R4-1 | **BOOKED** — received at G-2's acceptance (`ADOPTED-BY-KF.W6`), §6.D's KF.W12 anti-re-book note, §7's HOMING row |
| 25 | **KF-W7's D9 second-end cite** — the KFED-UNIT *"from both ends"* now addressed to the §6.D register row | KF-W7, D9 | **BOOKED** — §6.D KF.W12's locks column, *"cite it, promise nothing"* |
| 26 | **KF-W9's R4-4 blast-radius hand-off** — the corrected `btn-playback`/`.focus-ring` and retired-gate-prose censuses | KF-W9 §Carry, R4-4 | **BOOKED** — §6.D rows 1 and 3, quoted from RULINGS-4 with the W9 anchor left anchor-only |
| 27 | **KF-W4's R4-8 minting-end disposition + stable-anchor back-cite** | KF-W4 `:256` | **BOOKED** — §6.D's minting citations, byte-checked |

### 1.5 Mechanism E — program inheritance

| # | id | disposition |
|---|---|---|
| 28 | **FF-B-DISCHARGE** (15 rows) | **BOOKED** — G-1 |
| 29 | **NWO-TERMINAL-SWEEP** | **BOOKED** — G-2 |
| 30 | **OD-V3** | **BOOKED** — G-3 |
| 31 | **OD-V5** | **BOOKED** — G-3 |
| 32 | **W9-STAGING** | **BOOKED** — G-7 |
| 33 | **COORD-TERMINAL** | **BOOKED** — G-6 |

### 1.6 Mechanism F — the minted-wave roster

Members at this clock = exactly the three of row 23, each with a §6.D row. **No mint without a home.** Nothing escapes here.

> **routed 33 · booked 32 · escaped 1.**

**On the denominator.** This file carries its tally under LAW B by citing `PASS-4/KF-W10-CHECK.md` §1's **routed 28 · booked 27 · escaped 1**, and cures that escape at §6.D. The delta 28 → 33 is not a contradiction: four of the five new rows (24–27) are obligations **minted by sibling cures inside round 4** and correctly booked here, which is the census growing with the program rather than drifting. **The fifth new row is row 18, and it is the escape** — a sibling's round-4 cure that named this wave as a terminus and that no mechanism of this file's census holds.

---

## §2 GATES — born-RED with reachable green

All seven remain born-RED with a re-executed witness, and — for the first time across five passes — **all seven have a green a seat of this wave can reach**:

- **G-1** (15/15, alphabet declared once, all rows worded, the two round-4 evidence-form widenings declared rather than smuggled), **G-3**, **G-5** (ten anchors verified), **G-6** (RED restated at five surviving reasons, leg (v) now naming `O-21` by id), **G-7** (LAND-or-KILL, both arms attainable, the LAW-A census now complete at three hits and re-run-at-execution).
- **G-2 is the round's headline repair and it holds.** Its right hand — *"the union of **AUTHORED** X·KF wave bounds ∪ §6.D's cargo enumeration"* — is computable from artifacts that exist; L-2's vacuous-gate rule no longer fires; the falsifier is extended to convict a right hand computed from authored bounds alone and a §6.D row whose cargo does not sum to `9 · 6 · 2`. PASS-4's D-3 is structurally, not cosmetically, cured.
- **G-4**'s partition instrument is sound and now holds all four conformance-check members. Its *count* does not reproduce (**D-5**) — but the gate is immune by construction, and its RED (the register's non-existence) is untouched.

**Closes in-grant**: `.f`'s acts (both ledgers, `FINAL-KF.md`, the sibling four-verb rows) are all in §4's bounds; `.e` touches only the branch; `.a`/`.c`/`.d` write only append-only addenda. **No self-voiced closure**: the census carriage, the bare-citation claim, the anchor-cleanliness claim and the LAW-A exhaustiveness claim are each carried by citing a dated conformance artifact by path, in LAW-B form, with the *"re-pointed rather than re-asserted"* clause. §3.5's retirement of *"none was missed"* is the model of the form.

---

## §3 DEFECT REGISTER

### D-1 · MAJOR · **COHESION `§0c` — the ownership cure this file names at five sites — LANDED at 17:09, with a different subject; the anchor now collides and the SPECIFIED-withhold condition reads false at the bytes**

**Receipt.** `stat -f '%Sm %z' docs/tranches/X/COHESION.md` → **2026-08-28 17:09:01, 19,854 B** — **twelve minutes before** this file's per-wave write (17:21:25) and **twenty-nine before** its final bytes (17:38:21). `grep -n '^## §0' COHESION.md` → `:138` **§0a** · `:156` **§0b** · **`:170` §0c ADDENDUM 2026-08-28 (later) — X·V REFINEMENT FOLD CONFORMANT; THE VALUE.JS SPEC LAYER IS DEVELOP-COMPLETE**. And `grep -n 'KF\.W10' COHESION.md` → **0 hits** — the string appears nowhere in the register, §0c included.

W10 names `§0c` as *the* vehicle at **five** sites:

- header `:5` — *"The cure shape is a **COHESION §0c addendum mirroring §0b**"*;
- header scope block `:9` — *"**X·KF may not be stamped SPECIFIED until COHESION §0c lands an owner for KF.W10**"*;
- **OP-6** `:68`, the check-at-open column — *"**The COHESION §0c addendum, mirroring §0b, naming SS-2**"*;
- **§6.C-E** `:523` — the same cure shape with its verbatim proposed text; and `:525`–`:529`, the second owed line, *"(§0c or a successor letter)"*;
- **dissent 2** `:613` — *"**§0c is the root session's act**"*.

**§0c has landed and it is not that addendum.** The consequences are three, and none is cosmetic. (i) The scope block's condition is now **false at the bytes**: `§0c` has landed and has not lifted the withhold, so an executing seat that tests OP-6 by resolving `§0c` finds a landed section and a satisfied-looking precondition over an ownership gap that is still wide open. (ii) The cure shape is **unwritable as specified** — a *"§0c addendum mirroring §0b"* cannot be authored into a slot another dated addendum occupies, and E-3 forbids rewriting it; the root session must mint `§0d` or a successor letter, which this file nowhere contemplates for the ownership half (only for the minted-wave line). (iii) It is **the D-6 collision class, at this file's own governing anchor, one round after the file cured it for `SC-1`** — its own §2b.1 ROW-KEY NOTE says *"a program that greps by id cannot afford two meanings for one key"*, and its own §B-2 cure exists because an id resolved *to the wrong subject*. The sweep that produced both was run over registry ids and COHESION register rows and **not over the §-anchor this file's ownership posture hangs on**.

**And it names a hole in LAW C.** LAW C(1) orders the **eleven specs** and LAW C(4) reconciles receipts among them. `COHESION.md` is not a spec; it is a substrate five of this file's load-bearing claims quote, it moved inside the round, and **no stage, no substrate declaration and no reconcile pass covers it**. §2b.1's LAW C substrate table lists eleven rows, all specs. The same exposure exists for `INBOX.md` (quoted at OP-3, G-6 and §6.C-H) and for `FOLD-FORWARD.md`.

**What survives**: the *substance* is untouched and, if anything, sharpened — KF.W10 is genuinely unassigned, `grep 'KF\.W10' COHESION.md` → 0 proves it more starkly than the file's own argument does, and dissent 2's *"the risk if it is never made"* stands. **What fails is the coordinate**, in the one section of this file that decides whether X·KF may be stamped at all.

### D-2 · MAJOR · **`PASS-4/CLOSE-CERT.md`'s §1 mtime table does not reproduce for the wave it certifies — a twelfth spec write landed AFTER the certification**

**Receipt.** `stat -f '%Sm %z'`, this seat: `conformance/PASS-4/CLOSE-CERT.md` → **2026-08-28 17:37:59 / 27,004 B**; `waves/KF-W10.md` → **2026-08-28 17:38:21 / 209,923 B**. CLOSE-CERT §1 row 6 tables `KF-W10.md` at **17:31:54 / 209,902 B** and certifies, at §1's Reading and again at §9(1): *"**Every per-wave write precedes every reconcile write** — the last per-wave write was `KF-W10.md` at 17:21:25, and this seat's first edit was at 17:30:52, a **nine-minute clear margin**."*

**The subject wave moved +21 bytes and +22 seconds after the certification.** RULINGS-4 LAW C(4) makes that table the certification's first exhibit (*"the mtime table of all 11 specs proving it wrote last"*), and §END makes the certification the round's precondition: *"**The round does not close without it**; the pass-5 union seat audits it as its first act."* Audited as ordered: **the exhibit is stale for one of eleven rows, and it is this one.**

**Scoped honestly, because the class matters more than the magnitude.** The reconcile-marker census is unchanged — `grep -c 'RECONCILE SEAT, 2026-08-28' KF-W*.md` returns `W1 1 · W2 5 · W5 1 · W7 1 · W8 3 · W9 1 · W10 4`, summing to **16**, exactly as §3's counting rule asserts — so **no fifth insertion was added and no cell this seat checked is traceable to the late write**; every receipt in §0's tables holds. That is precisely what makes it a defect rather than a catastrophe **and** why it cannot be waved through: an **uncertified, unattributed write to the last-written spec** is the exact mechanism LAW C was built to make impossible, committed against the instrument that exists to prove it did not happen. A certification whose own table cannot be re-run against the tree certifies its method, not the round.

### D-3 · MAJOR · **THE ESCAPE — KF-W6's `C-14`, homed at THIS round to *"terminalization at KF.W10"*, is enumerated nowhere in this file**

**Receipt.** `KF-W6.md` (stage 1, mtime **16:59:25** — **twenty-two minutes before** this file's write), §Excluded, the row added at repair round 4 under **D-P4-7**:

> **HOME: the NO-WAVE-OWNER set, with its cost verdict at SS-13 and its terminalization at KF.W10 if it is still unhomed at close**

banked ⟨`kf-ChannelControls.md:70` — *"**C-14 — MINOR · the global `[data-state="active"][role="tabpanel"]` enter animation (tab-idiom.css:75-79, global via design-idioms.css) re-fires over the force-mounted Monaco subtree** … cost → SS-13. **NO-WAVE-OWNER**"*⟩, and restated at KF-W6's round-4 ledger `:581`: *"`C-14` gets a §Excluded line naming its **home** (NO-WAVE-OWNER, cost → SS-13, **terminalized by KF.W10 if still unhomed**)"*.

`grep -c 'C-14' KF-W10.md` → **0**. Not in §2b, not in §2b.1's mechanism-D roster, not in §3.2, not at §6.C-0, not at §7, not at §8.

**Mechanism D is defined as *"sibling X·KF wave specs that name this wave as their outbound terminus"*.** `C-14` is one, minted this round, by a stage-1 sibling this file was under LAW C obligation to re-consume at final bytes — the same obligation it discharged correctly for W0's roster and for edges 1, 2 and 6. **The re-consumption was run over the receipts the file already held and not over the sibling's new W10 routings.**

**The available defence is exactly the one this file already rejected.** G-2's blanket covers `C-14` by construction — kf-ChannelControls is one of the 58, and *"carried to the next formation boundary's ledger"* is a lawful terminal word. But §2b.1's closing paragraph rejects that reading for KF-W6's sixth cross-edge item on stated grounds: it was promoted from prose into a named census row *"so a reader auditing KF-W6's edge against this file finds six items and six answers **inside the census**, not five in a table and one in a paragraph."* A reader auditing KF-W6's §Excluded against this file today finds a named, id-bearing, sibling-declared terminus and **no answer inside the census** — which §2 calls closure **by omission**, the one failure it declares fatal.

**Third consecutive round, same shape**: PASS-3's escape (R-4's triggers) and PASS-4's escape (the three minted waves) were both mechanism-D members invisible to a census enumerated as of the prior round. Mechanism F was built to stop waves escaping. **Nothing was built to stop a sibling's new row escaping**, and the sweep's enumeration source is still the census's own prior roster rather than the siblings' current bytes.

### D-4 · MAJOR · **R-A's round-4 scope re-cut did not sweep to §3.6 — the unit that PERFORMS the stamp still carries the struck spelling**

**Receipt.** `KF-W10.md:41` carries R4-8 item 2 verbatim: *"X.KF.W10 advances its own four-verb row and **every AUTHORED sibling X·KF wave's** (the eleven specs on disk, W0–W9 + this file) from IMPLEMENTED to VERIFIED in one act at close. **The three minted-unauthored successor formations take no verb from this close.**"* And `:45` strikes the old spelling by name: *"Rounds 1–3 read *"every sibling X·KF wave's"*, unqualified."*

`KF-W10.md:304` — **§3.6, unit `.f`, the unit whose act this is**:

> Then write `docs/tranches/X/keyframes/close/FINAL-KF.md` and **advance every X·KF wave's four-verb row IMPLEMENTED → VERIFIED in one act (R-A)**.

`grep -no 'IMPLEMENTED → VERIFIED' KF-W10.md` → **one hit, `:304`** — the file's only imperative statement of the act, and it carries the **unqualified** spelling PASS-4's D-3 convicted. **The `.f` seat reads §3.6, not §1's block quote.** §4's bounds row (*"every X·KF sibling **wave file**"*) is self-limiting by construction — an unauthored wave has no file — and §10's commit 6 defers to R-A by name; §3.6 does neither: it quantifies over **waves**, which is exactly the quantifier R4-8 ruled on.

This is the file's own law firing at its own altitude, for the fourth documented time. It cites KF-W0's rule at §2b (*"a defect repaired in §3.1 and left standing in §2b is relocated, not repaired"*) and applies it correctly there, at §6.A's header count (D-7 cure), at §3.3's ordinals and at §2b's *"13 rows"* strike — *"struck at every altitude of this file"*. The one sentence that issues the order was not swept.

### D-5 · MINOR · **G-4's field figures do not reproduce at this seat — 89 occurrences / 64 lines against the printed 85 / 63, and this file at 21/13 against 17/12**

**Receipt**, re-run this seat, the gate's own commands:

```
grep -rlE '357/414|86\.23|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/ | wc -l   → 26   (printed 26 ✓)
grep -rhoE '357/414|86\.23|0/5 slots' …                                          | wc -l   → 89   (printed 85)
grep -rcE  '357/414|86\.23|0/5 slots' …                             (summed)               → 64   (printed 63)
per file: KF-W10.md → 21 occurrences / 13 lines                                            (printed "this file alone contributes 17 occurrences / 12 lines")
```

so the live-spec class is **W0 2 · W3 2 · this file 21 = 25**, not the tabled **21**; the conformance class reproduces exactly (**PASS-1 8 · PASS-2 4 · PASS-3 3 · PASS-4 5 = 20** ✓) and the substrate class reproduces at **19 files** ✓. **The membership partition — the thing the gate actually adjudicates — is exact in all three rows.** That is why this is MINOR and not a gate finding: G-4's RED is the register's non-existence, untouched; the count is declared *"a dated observation, never an acceptance criterion"*; and the file states outright that *"this repair write moves the number again, upward, and will do so every round."*

**It is booked because LAW D(3) is unambiguous** — *"every figure printed beside a pasted command is produced by re-running the command at write time"* — and the drift is **inside this file's own bytes**, on the one figure the file re-derives about itself, under a standing instruction it wrote for others (*"any seat that re-prints it re-runs the grep first (R2-5)"*). The reconciliation the cell offers (*"25 + 1 = 26 · 80 + 5 = 85, reconciled by subtraction rather than asserted"*) is arithmetically clean and empirically wrong at the tree by four, which is the numeric arm's exact subject: a figure derived by argument where a command was available.

### D-6 · MINOR · **Five live, load-bearing sibling line numbers ride §6.C-0 row 6 and §6.C-B in a spelling `CLOSE-CERT.md` §7's sweep cannot see**

**Receipt.** `KF-W10.md:505` and `:515` both carry ⟨`grep -n 'O-21' KF-W1.md` → **`:88` `:199` `:331` `:383` `:455`**⟩, stamped to KF-W1's *"post-round-4 stage-1 bytes (mtime **17:00:23**)"*. KF-W1's **true final** bytes are **17:32:20** — the reconcile seat's own insertion, 32 minutes later. Re-run there this seat: **all five still resolve**, and the quoted prose at `:88`/`:331`/`:383` is byte-exact. **Nothing is dead; the receipts are true.**

The defect is the **instrument that certified them**. `CLOSE-CERT.md` §7 states, as one of its six numbered certifications: *"**43 of 43** ride an explicit strike/retirement marker … **Live line-numbered cross-cites: ZERO** … ZERO fresh line-number cross-cites were minted this round."* Its measurement is `grep -ohE 'KF-W[0-9]+\.md:[0-9]+(-[0-9]+)?' *.md` — a pattern that matches the `KF-Wn.md:NNN` spelling **only**, and is structurally blind to the `grep -n <pattern> <sibling>.md → :NNN :NNN` transcript form, which is how the round's newest cross-wave receipt (edge 6, minted this round under D-8) carries its coordinates. The claim is true of the form it measured and **false of the file**: five live, un-struck, load-bearing sibling line numbers, stamped to a substrate the certifying seat itself moved afterwards. §7's own marginal-case paragraph inspects one such cell (W8's DH-2) and passes it — the sweep found the exception it looked for and not the class it did not.

### D-7 · INFO · **The by-record surface is 12 records / 15 hits, not the 14 records `PASS-4/KF-W10-CHECK.md` §1 reports — and that check is this file's cited denominator of record**

**Receipt.** `grep -nE 'KF\.W10|KF-W10' registry/adjudicated/kf-*.md` this seat → **15 hits across 12 records**, enumerated at §1.1 above. `PASS-4/KF-W10-CHECK.md` §1.1 reads *"returns hits in **14** records"* and lists among its ten preambles a `kf-AnimatedText :30`, which is **not a hit at these bytes** (kf-AnimatedText's hits are `:61`, `:71`, `:137`). The **four routing cells and the two roll-ups are identical**, all six are booked, and the census total is unmoved at 58/57/1,216 — so nothing downstream of the figure changes.

Recorded for two reasons: `KF-W10.md` §2b.1 cites that check §1 **by path as its denominator of record under LAW B**, so a wrong figure inside the cited artifact is inherited by reference; and the two new untracked records (`kf-MatrixEditor.md`, `kf-SequencePlayhead.md`) prove the corpus is **live**, which makes a per-record figure a dated observation in exactly the way the G-4 field is — a property no pass has yet stated for the registry side.

---

## §4 M-25 depth — locks, riders, dissents, scope

**Locks: HOLD.** All seven §3.2 sequencing locks reproduce against their banks. **KF-AV-28's three anchors were read this seat and all three carry the rider text**, not merely the id — `kf-AnimationVisualizer.md:35` (*"A standing sequencing rider on every NO-WAVE-OWNER row below: **KF.W7's S-9 evaluation (KF-AV-28) may supersede any behavioral cure here**"*), `kf-PlaybackRibbon.md:36` (*"the KF-AV-28 rider"*, with the C-axis §7 caution riding with it), `kf-SequenceScrubber.md:36` (*"KF-AV-28's standing rider applies"*). The rider is **carried, not cited**, with the R-10 governed-row enumeration, the extra terminal word in G-2's alphabet, and reciprocation measured at KF-W7's final bytes.

**Riders: HOLD.** KF-HA-4's SPLIT-LOCK, KF-AT-26's ANTI-REBOOK (limb (e)), KF-EST-23's CORRECTION-BOUNDARY LOCK, CARRY-C-4's PREMISE-CORRECTION + KF-SST-30 companion, and the DENOMINATOR LOCKS (G-1 stays 15, G-5 stays 4) are each stated wherever they bind. The round-4 alphabet additions — the third `FOLDED-TO` form and the second `STANDING-CARRIED` form — are **declared with their reasons and expressly barred from moving either denominator**, which is the honest shape.

**Route-by-mechanism: HOLD.** The never-cite sweep reproduces at three records; the two id-less coordinates W10 homes are correctly the only two of the class filed with no wave. `CD-DISSENT-4` is spelled as a declared positional key at every site.

**The roster: HOLD, and it is the round's cleanest repair.** `CARRY-C-3` consumes **TEN S-9 + FOUR S-10 + the enumerated strike** — `KAD-12` **IN**, `F1(c)` **absent**, the `/number-field` claim keyed `LP-8 ≡ KF-CO-35`, `KF-ET-27` present with `KF-ES-20` as its second provenance leg — and the verb split is re-derived at `8 S-9 minted + 2 S-9 enumerated + 4 S-10 minted`, with *"11 of 13"* struck **at all three altitudes** (§2b, §3.1, §8). The two `ENUMERATED-NOT-MINTED` receipts are re-anchored on §-heading + whole cell text with the dead `:234`/`:235` dropped. **PASS-4's D-1 and D-7 are cured completely.**

**Dissents: HOLD.** Six, none resolved by fiat; dissent 2 states the ownership risk against itself and dissent 6 states the unminted-id weakness against itself. **Dissent 2 is now understated rather than overstated** — its premise (*"§0c is the root session's act"*) has been overtaken by a §0c that landed for something else (**D-1**), which makes the gap harder to cure than the dissent records.

**Scope discipline: HOLD, and it remains the best thing in this spec.** The file-scope vs sub-tranche-scope SPECIFIED distinction is stated identically at the header, the four-verb table, OP-6, §6.C-E and §9.2. **D-1 is where that discipline's own anchor moved under it, and D-4 is the one place its round-4 re-cut did not reach.**

---

## §5 Verdict

**DEFECTIVE.** The round-4 repairs are the strongest bank of the five passes, and most of them are structural rather than cosmetic: PASS-4's single escape is cured by an instrument (§6.D) rather than a sentence; mechanism **F** enumerates *waves* and runs clean on its first execution; the C-17.R roster is re-consumed at W0's final bytes and matches row-for-row; **all six inbound edges verify at their siblings' true final bytes**; the LAW-A exemplar census is completed at its third hit and its exhaustiveness claim is retired into LAW-B form; `O-21` is named by id at all four sites; and the `SC-1` key collision is cured with the registry ids untouched. **The drift class LAW C was written against is dead on every receipt this seat could re-run.**

It fails on one shape, and the shape has moved up a level. Rounds 3 and 4 were convicted of reading a **sibling spec** at a stale clock. This round the file re-read every sibling spec correctly — **and did not re-read the substrates and the siblings' new rows.**

- The **`§0c` slot it names five times as its ownership cure was occupied twelve minutes before it wrote**, by a different subject, and nothing in LAW C covers a substrate that is not one of the eleven specs (**D-1**).
- **A twelfth write landed on this file after the certification that exists to prove none could** (**D-2**).
- Its escape is again a **mechanism-D member minted by a sibling's cure inside the round** — KF-W6's `C-14`, routed here by name and enumerated nowhere (**D-3**).
- And **R-A's scope re-cut reached §1 and not §3.6**, leaving the sentence that issues the order carrying the spelling PASS-4 convicted (**D-4**).

The lesser two are the same lesson at the instrument layer: a self-referential count re-derived by subtraction instead of by command (**D-5**), and a stable-anchor certification whose regex could not see the round's newest receipt form (**D-6**).

A close wave's product is one terminal word per obligation, and its credibility is its denominators. This file's denominators are now the program's — **except that the anchor on which its own stamp is withheld now points at someone else's addendum.**

*End of PASS-5 register. Read-only throughout; the sole write of this seat is this file.*
