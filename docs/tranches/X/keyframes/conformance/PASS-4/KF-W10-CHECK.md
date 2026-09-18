# KF-W10 — PASS-4 FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W10.md` (155,227 B / 533 L at this seat's read; mtime 2026-08-28 15:51:10).
**Seat**: FRESH. `PASS-1/`, `PASS-2/`, `PASS-3/KF-W10-CHECK.md` and `PASS-3/RULINGS-3.md` were read **only** to learn which repairs were commissioned — no finding, count, escape list or partition was imported from any of them. **The inherited nine-block partition is RETIRED** (RULINGS-3 §END, program-wide order for pass 4); the census below is a per-record, id-keyed harvest from the 58 records' own bytes, with the sole carry `KF-W6-CARRY.md` and the surfaces the records do not hold enumerated separately and named.
**Clock**: 2026-08-28, after the round-3 repair bank.
**Refs of record**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` (`git rev-parse origin/master`, this seat) — **every keyframes witness below was re-executed there**. Local `8281638c` appears only as declared historical context, never as a witness. value.js `tranche-u`, current tree bytes.

**VERDICT: DEFECTIVE** — 6 MAJOR · 3 MINOR · 1 INFO.
**Census: routed 28 · booked 27 · escaped 1.**

---

## §0 What reproduced (stated first, because the substrate work in this file is sound)

Re-derived read-only at this seat, at the refs of record:

| claim in KF-W10 | re-derivation | result |
|---|---|---|
| 58 kf records · 57 carrying `NO-WAVE-OWNER` · 1,216 occurrences | `ls kf-*.md \| wc -l` · `grep -l` · `grep -o` | **58 · 57 · 1,216** ✓ |
| FOLD-FORWARD `## §B` at line 30, `## §C` at 48, 15 numbered rows | `git show origin/master:…/FOLD-FORWARD.md` | ✓ exact — and **all 15 subjects match §3.1's table row-for-row**, including §B-3's *"subsumes the folded CH2-02 ×4 (BG-5, GU-1, GU-2, subject-legible)"* quoted byte-exact and labelled a quotation |
| OD-V3 `:7` **HELD** · OD-V5 `:9` **DEFERRED**, verbatim | `git show origin/master:…/OWNER-DECISIONS.md` | ✓ byte-exact, both still unruled |
| OG-KF1 at `INTAKE-ADJUDICATION-2026-08-03.md:232`, naming KF.W10's owner block | read | ✓ — *"(Joins OD-V3/OD-V5 in KF.W10's owner block.)"* |
| proof roster **3** at `origin/master` (`:50`/`:51`/`:52`) | `git show origin/master:package.json \| grep '"proof'` | ✓ exact |
| the ten G-5 doc anchors | `git show` each at `81a56990` | ✓ **all ten resolve carrying the quoted text** — `r-animation-sota` `:107` the `### G26-3` heading / `:109` the *"Where (verified)"* bullet **which does carry** *"The F26-4 demo grapheme-bug is DISCHARGED … the old raw-UTF-16 per-char split is gone"* / `:253` the ledger row; `lane-22` `:110-112`; `U.D.md:194`; `home.json` `:2`/`:9`/`:13`/`:16`; `home.md:67` |
| `.tap-floor` → 0 adopters; 2 hits = `:81` comment + `:82` selector | `git grep -n 'tap-floor' origin/master -- demo/styles/design-idioms.css` | ✓ exact |
| both kf ledgers present; `v/w9-staging` = `b920b190`, live and unmerged | `git cat-file -e` ×2 · `git ls-remote --heads origin` | ✓ |
| INBOX **56,702 B**, five `UNREAD` at `:4`/`:5`/`:19`/`:29`/`:95`, zero UNREAD status rows; **`:96` I-28 ROWED 2026-08-28** · **`:97` I-29 ROWED 2026-08-28, NO ACTION** | `wc -c` · `grep -n` · read | ✓ exact — **the PASS-3 D-5 correction is correctly landed and G-6's RED is restated at reasons that survive** |
| O-20 letter exists at 11,466 B and carries **zero** aurora cargo | `wc -c` · `grep -conE 'KF-HA\|aurora\|AURORA\|V-A95\|GF-AURORA'` | ✓ **11,466 · 0** — the D-6 vehicle correction is right, and COHESION `§4a:129`'s *"the table resumes accreting"* is the successor register it names |
| COHESION **§0c ABSENT** (only §0a, §0b exist) | `grep -n '^## '` | ✓ — the ownership dissent is honestly stated and not papered |
| **KF-W8 R-4's three re-open triggers, quoted verbatim** | `KF-W8.md:339`, the *"TRIGGER, named"* clause | ✓ **BYTE-EXACT, all three conditions** — **PASS-3's one hard escape (D-4) is genuinely CURED**, and the *"carrying is not scheduling"* clause is placed beside the existing posture as ordered |
| `KF-W6-CARRY.md:361`'s **five-item** `→ KF.W10 · Fold Discharge` edge | read at the carry's bytes | ✓ exact — five items, matching mechanism **C** |
| KF-W7 §Sequencing now carries a `→ KF.W10` cross-edge and adopts the receipt alphabet verbatim | `KF-W7.md:100`, `:347` | ✓ — edge 3 is genuinely cured at its source |
| KF-W9 §Bounds' capture-receipt row carries the CH2-02 ×4 dock ids | `grep -coE 'CH2-02\|BG-5\|GU-1\|GU-2\|subject-legible' KF-W9.md` → **11** | ✓ — edge 4 is genuinely cured at its source; §B-3's correction (ii) reproduces at the W9 end |
| `kf-App.md:71` KF-APP-21 → **KF.W6** (config unification, not deletion) · `kf-KeyboardShortcutsModal.md:68` → *"**→ KF.W6** decision record"* | read | ✓ both, and dissent 5's three-say-W6/one-says-W10 tension is stated honestly rather than dissolved |
| `RULINGS-3.md` **LAW A** text as quoted in §B-8 | `RULINGS-3.md:12` | ✓ byte-exact |
| kf-ChromeDock files **no id** — `## DISSENT` at `:142`, item 4 at `:147`, `grep -oE 'DISSENT[ -]*[0-9]+'` → 0 | read + grep | ✓ — the **PASS-3 D-10** cure (`CD-DISSENT-4` as a declared positional key) is landed at all three sites |
| §7 carries **17** rows | `awk` over §7 | ✓ **17** — membership unchanged, as the counting lock requires |
| the LAW A prune set = **6** deleted paths; `vitest.config.ts` `benchmark.include = ["bench/*.bench.ts"]`; `package.json:47 "bench"`; `tsconfig.test.json:17 include ["test/","bench/","demo/env.d.ts"]`; alias roots (`@src`, the self-alias, `@styles/@state/@components/@composables/@utils/@kf-engine/@assets/@app`) all resolve into `src/`, `demo/` or `assets/` | `git diff --diff-filter=D` · `git show` ×4 | ✓ **every one exact** — the alias-root enumeration is correct and none can reach `bench/` or `scripts/` |

**Posture axis, itemised.** **W4 head**: named, not merely satisfied — §6.B and §6.C-C carry the sequencing-head paragraph by stable §-anchor with the line number struck, and *"G-KFW4-1 precedes every unit `.a`..`.g`"* is stated ✓. **W3 gated**: carved out by name at §1 with the unopenable-by-construction argument written out, and re-cut to *bounds-FINAL + gate-state, never the verb* ✓. **KF-AV-28**: carried (not cited) as §3.2's seventh lock, with the R-10 governed-row enumeration, the extra terminal word in G-2's alphabet, and reciprocation now measured at `KF-W7.md:100`/`:347` ✓. **The five-edge seam table** exists at §6.C-0 and edges 3, 4, 5 are fulfilled — **edges 1 and 2 are fulfilled at their sources and this file says they are not** (**D-2**). **O-21**: the INBOX maximum is still **O-20** (`:95`), so W10 correctly mints nothing — but KF.W1 has now minted **O-21** as the instrument W10's OP-3/G-6 turn on, and W10 names it nowhere (**D-8**).

---

## §1 ID-KEYED CENSUS — re-enumerated BY RECORD, then by the surfaces the records do not hold

### 1.1 The record-derived core (mechanisms A · B · C — the 58 records + the sole carry)

`grep -nE 'KF\.W10|KF-W10' registry/adjudicated/kf-*.md` returns hits in **14** records. **Ten of them are routing-law preambles or verdict summaries** (kf-AmigaScene `:13` · kf-App `:35` · kf-ChromeDock `:7` · kf-CubeTarget `:21` · kf-CubeScene `:19` · kf-ChannelOptions `:25` · kf-EditorHeader `:7` · kf-EditorShell `:7` · kf-SquareScene `:17`, plus kf-AnimatedText `:30`) — they *declare the taxonomy* (*"KF.W10 fold discharge"*) and route nothing. **Two are verdict roll-ups that restate rows booked elsewhere in the same record** (kf-AnimatedText `:137` *"KF.W10 the two stale doc authorities"* ≡ A-1 + A-2; kf-EditorStartScreen `:151` *"KF.W10 the two U-lane doc-truth re-opens"* ≡ A-3). **Four are true routing cells:**

| # | id | record : line | disposition in KF-W10 |
|---|---|---|---|
| 1 | **KF-AT-21** | kf-AnimatedText `:61` | **BOOKED** — G-5 addendum 1 |
| 2 | **KF-AT-26** limb **(e)** | kf-AnimatedText `:71` | **BOOKED** — G-5 addendum 4 (ANTI-REBOOK, limb (e) only) |
| 3 | **KF-EST-23** | kf-EditorStartScreen `:90` | **BOOKED** — G-5 addendum 2 (CORRECTION-BOUNDARY LOCK) |
| 4 | **KF-HA-4** manifest arm | kf-HeroAurora `:41` | **BOOKED** — G-5 addendum 3 (SPLIT-LOCK) |

**Mechanism B — filed with NO wave, homed here by M-25 route-by-mechanism.** The never-cite class was re-swept across all 58 records (`grep -niE 'never quoted\|restated from scratch\|unciteable\|never citable'`): four records carry it. **Two are already routed and are correctly NOT W10's** — kf-App.skeleton `KF-SKEL-22` (*"contrast figures are re-derived at use, never quoted"*, routed *"rides every KF.W6/W9 witness that touches contrast"*) and kf-App `K-5`'s unciteable flat ratios (routed into the re-token remediation). **Two are id-less and unrouted, and both are booked here:**

| # | coordinate | disposition |
|---|---|---|
| 5 | kf-ChromeDock `## DISSENT` (`:142`) item **4** (`:147`) — **no id filed** | **BOOKED** — never-cite register entry **(6)**, keyed `CD-DISSENT-4` as a declared positional key |
| 6 | kf-EditorHeader **killed-claim #8** | **BOOKED** — never-cite entry **(7)**, with the REPO-SCOPED-NOT-ABSENT restatement (verified: the letter exists at kf `origin/master`, one path, and is a different document from the value.js archive letter) |

**Mechanism C — the sole carry, `carry/KF-W6-CARRY.md:361`.** Read verbatim: five items. Two are ≡ A-1 and A-4; three are distinct:

| # | id | disposition |
|---|---|---|
| 7 | **CARRY-C-3** — census S-9/S-10 extensions terminalized | **BOOKED** (record block) — **but on a superseded roster, D-1** |
| 8 | **CARRY-C-4** — `.tap-floor` adopt-or-delete recorded | **BOOKED** (record block) |
| 9 | **CARRY-C-5** — the `/command` decision record filed | **BOOKED** (record block) |

**The record-derived core is 9 obligations, and all 9 are booked.** That is the set the retired nine-block partition could see. It is not the routing surface.

### 1.2 Mechanism D — sibling X·KF wave specs naming this wave as their terminus

| # | id / obligation | source anchor (re-read this seat) | disposition |
|---|---|---|---|
| 10 | **OG-KF1** | KF-W0 `:220`, `:540`, `:613`; §Sequencing `:586` | **BOOKED** — G-3 |
| 11 | **the 357/414 block** (B18-23 + B19-14 + B20-14) | KF-W0 §Sequencing OUTBOUND row + KF-W5 §Carry | **BOOKED** — G-4 (4) |
| 12 | **B18-12 / B18-13 / B18-14** | KF-W0 `:611` | **BOOKED** — G-4 (1)(2)(3), UNRESOLVABLE-BY-CONSTRUCTION |
| 13 | **B18-27** | KF-W0 `:611` + KF-W5 §Carry | **BOOKED** — G-4 (5), settle-or-drop |
| 14 | **KF-W8-R-4-STRUCT-PAIR** | KF-W8 §Sequencing, `R-4` | **BOOKED** — record block |
| 15 | **R-4's THREE RE-OPEN TRIGGERS** | KF-W8 `:339`, the *"TRIGGER, named"* clause | **BOOKED at round 3, verbatim** ✓ (PASS-3's escape, cured) |
| 16 | **KF-W6's sixth cross-edge item** (any unhomed packet terminalized) | KF-W6 §Sequencing, `→ KF.W10` | **BOOKED** — discharged by construction as G-2's ∅, now a census row |
| 17 | **KF-W7's SWAP-verdict receipt output** | KF-W7 `:100`, `:347` | **BOOKED** — G-2 alphabet + §6.C-0 edge 3 |
| 18 | **KF-W9/SS-13's capture packet + §Bounds capture-receipt row** | KF-W9 `S-8`/`S-10`/§Bounds | **BOOKED** — OP-4 + §6.C-0 edge 4 + §B-3 correction (ii) |
| 19 | **KF-W3's KF-HA-19 preserved-dissent booking** | KF-W3 `:302` (**E-14.5**) | **BOOKED, on a falsified condition cell — D-2** |
| 20 | **KF-W0's C-17 mint-order answer** | KF-W0 `:586` | **BOOKED, on a falsified condition cell — D-2** |
| 21 | **KF-W1's mail-cure instrument, minted `O-21`** | KF-W1 `:86`, `:100`, `:168`, `:263`; cross-edge 11 `:315` — *"PRECEDES (hard) — the hardest downstream dependency this wave has"* | **BOOKED BY PHRASE ONLY, never by id — D-8** |
| 22 | **KF.W11 · KF.W12 · KF.W13 — three X·KF waves, as waves** | KF-W4 `:247`–`:249` (KF.W13 *"MINTED here, declared"*); KF-W1 `:308`–`:311` | **ESCAPED — D-3** |

### 1.3 Mechanism E — program inheritance

| # | id | disposition |
|---|---|---|
| 23 | **FF-B-DISCHARGE** (15 rows) | **BOOKED** — G-1 |
| 24 | **NWO-TERMINAL-SWEEP** | **BOOKED** — G-2 |
| 25 | **OD-V3** | **BOOKED** — G-3 |
| 26 | **OD-V5** | **BOOKED** — G-3 |
| 27 | **W9-STAGING** | **BOOKED** — G-7 |
| 28 | **COORD-TERMINAL** | **BOOKED** — G-6 |

> **routed 28 · booked 27 · escaped 1.**

**On the denominator.** This file's own §2b.1 declares five mechanisms and, per LAW B, carries its tally by citing `PASS-3/KF-W10-CHECK.md`'s **routed 22 / booked 21 / escaped 1**. The declaration of mechanisms **D** and **E** is the right repair and it is what makes a finer enumeration possible at all. The delta from 22 to 28 is not a contradiction of that check: it is what a per-record harvest plus a per-source-anchor walk of mechanism D resolves that a coarse D could not — the four seam edges (17–20) and the two obligations at 21–22 are each a distinct thing this wave must consume, and three of them (19, 20, 21) are the ones this round's own repair was supposed to close. **The escape is at 22, and it is not a sibling-spec fine point: it is three waves of the sub-tranche this file exists to close.**

---

## §2 GATES — born-RED with reachable green

Six of seven gates are born-RED with a genuine, re-executed witness and a green a seat can reach: **G-1** (the alphabet widening lands and all 15 rows are worded, though three evidence cells drift — **D-9** — and row 2's fold target collides — **D-6**), **G-3**, **G-5**, **G-6** (correctly restated at reasons that survive D-5) and **G-7** (LAND-or-KILL, both arms attainable, but the LAW A census it rests on has a hole — **D-5**). **G-4**'s partition-not-count construction is the right instrument and remains so, but its own class-membership falsifier now fires against its round-3 table (**D-4**).

**G-2 is the gate whose green is not reachable from inside this file's declared preconditions.** OP-5's GREEN requires *"a spec for every wave any sibling or the R-15 roster names as a packet home — **KF.W11, KF.W12 and KF.W13** are the live outstanding leg"*, and §3.2/G-2 compute the right-hand union over *"the union of X·KF wave bounds."* Those three waves are **X·KF waves** (KF-W4 `:249` mints KF.W13 explicitly; KF-W1 `:308`–`:311` lists all three), and **nothing in this wave's §1 precondition set, §3 scope, §4 bounds or §6 sequencing names them, authors them, or gives them a terminal disposition** — while R-A commits this close to advancing *"every sibling X·KF wave's"* row to VERIFIED. That is **D-3**, and it is the escape.

---

## §3 DEFECT REGISTER

### D-1 · MAJOR · `CARRY-C-3`'s claimant roster is KF-W0's **superseded** roster — it re-prints an id W0 retired this round, omits the id W0 adopted, counts a row W0 struck, and lands on the exact denominator W0's own falsifier convicts

§3.1's record table and §2b's row state the roster as *"**KF-W0 §Carry C-17.R**, re-counted at **13** this seat — **9 S-9 claim-inputs** (kf-SpringHeatmap C-M-1 · kf-EditorHeader **F1(c)** · … · kf-SpringTrace K-6 · kf-SharePopover C·C-2) and **4 S-10 claim-inputs** (kf-KeyboardShortcutsModal C-9 · kf-KeyframesEditor KF-KE-21 · kf-SquareInstrument C-12 · **the fifth record's original request**)"*, and builds the round-3 D-8 cure on it: *"**11 of 13** take a minted-id verb …; **2 of 13** take `ENUMERATED-NOT-MINTED`."*

**Receipt** — KF-W0 was re-cut at repair round 3 and landed at **15:43:24**; this file landed at **15:51:10**, seven minutes forty-six seconds later. At KF-W0's current bytes:

- `:215` — *"in ONE motion over the claimant roster at §Carry C-17.R — **TEN S-9 claimants and THREE S-10 claimants** — thirteen LIVE rows, plus one row retained as an enumerated strike"*. W10 says **9 and 4**.
- `:374` — `**KAD-12**` ⟨kf-KeyframesAddDialog:56; the claimant row in W0's **sole carry**, `KF-W6-CARRY.md:176`⟩ — *"**ADOPTED at repair round 3 (D-2/E-7)**"*. `grep -c 'KAD-12' KF-W10.md` → **0**.
- `:367` / `:282` / `:66` — the coined **`F1(c)` RETIRED** at repair round 3 (D-2/E-9). W10 prints `F1(c)` as a live claimant.
- `:368` — the `/number-field` claim **re-keyed** to the carry's head id **`LP-8 ≡ KF-CO-35`**. W10 carries the old spelling.
- `:379` — `~~the fifth record's original request~~` — *"**NAMED AND STRUCK AS A DUPLICATE (D-2 row 13, repair round 3)**"*. W10 counts it as one of its four S-10 claim-inputs.

And KF-W0's **second falsifier**, `:495`: *"a mint run over four-plus-one rather than the enumerated thirteen of C-17.R re-collides on its first motion — **and a mint run over the round-2 thirteen collides too, because that roster was missing `KAD-12`**."* **W10's record consumes the round-2 thirteen.** The total still reads 13 only because one wrong inclusion offsets one omission — which is precisely why the file's insistence that *"the verb denominator is stated explicitly so it can be checked"* matters, and why checking it convicts.

### D-2 · MAJOR · §6.C-0 records two of its five seam edges as UNCURED that were cured at their sources **before this file was written**

The inbound-dependency table is this round's headline instrument (*"OP-4 and the terminal table are thereby fulfillable by construction rather than by hope"*), and it declares *"states its measured condition at THIS seat's clock (2026-08-28), so no row commissions a certification its own receipt does not reproduce."*

**Receipt, edge 1** — the cell reads *"**PARTLY MEASURED** … The **mint-order answer in the edge row** is **not there at this clock** — **directive-backed** (`RULINGS-3.md` R3-10.1)."* `KF-W0.md:586` (mtime **15:43:24**): *"**KF.W10 · Fold Discharge & Close** | OUTBOUND **+ INBOUND-DEPENDENCY ANSWERED THIS ROUND (R3-10.1, cures D-4)** | **THE C-17-MINT CONSUMPTION EDGE, answered from this end: `KF.W0`'s C-17 MINT PRECEDES `KF.W10`'s CARRY-FORWARD RECORD block**…"* — the answer is there, by bytes, in the edge row itself.

**Receipt, edge 2** — the cell reads *"`grep -n 'KF-HA-19' KF-W3.md` → **0 hits** at this clock … The booking is **directive-backed** …, not yet measured — stated plainly rather than assumed."* Re-run: **4 hits**. `KF-W3.md:302` (mtime **15:43:45**): *"**E-14.5 · `KF-HA-19` — THE ADVERSE MEMBER OF W10's R1-FRAMING TRIPLE, CARRIED BY BYTES (added at repair round 3: RULINGS-3 R3-10.2; KF-W3-CHECK D-2)**"*, with the bank anchor and the superlative — exactly the booking R3-10.2 ordered.

Both sources landed **eight minutes before** this file's write, and this file re-ran the probe for edges 3 and 4 in the same table and recorded their supersession in the cell (*"the PASS-3 reading of 0 is superseded by the sibling's own write"*). **The sweep was half-run.** That is the *"cite the row, miss the row underneath it"* mechanism this file names as a method finding at §3.1 correction (iii) and §G-6 — committed inside the very table built to end it, and in the direction that understates how much of the seam is closed while leaving OP-4's fulfillability resting on a directive rather than on bytes.

### D-3 · MAJOR · THE ESCAPE — three X·KF waves the program has minted (KF.W11 · KF.W12 · KF.W13) have no precondition, no bounds row, no terminal disposition, and no place in the VERIFIED stamp this close performs

**Receipt.** `KF-W4.md:249`: *"**KF.W13 · Chrome, Dock & Transport Repair (2) — MINTED here, declared** (a wave beyond the census sketch is minted explicitly, per KF-W1 cross-edge 9's cohesion flag)"*; `:247`/`:248` home KF.W11 (9 packets) and KF.W12 (6). `KF-W1.md:308`–`:311` lists all three as waves of this sub-tranche. They are **X·KF waves**, not successor-formation waves.

`KF-W10.md:20` — *"**Opens after**: X.KF.W0 …, X.KF.W1 …, X.KF.W9/SS-13 …, and X.KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 IMPLEMENTED"* — **none of W11/W12/W13.** `KF-W10.md:39` (R-A) — *"X.KF.W10 advances its own four-verb row and **every sibling X·KF wave's** from IMPLEMENTED to VERIFIED **in one act at close**."* `grep -n 'KF\.W11\|KF\.W12\|KF\.W13' KF-W10.md` → **five hits, all of them at `:61`, `:75`, `:315`, `:318`, `:481`** — every one treating them as *unauthored packet homes* inside G-2's RED or §7's HOMING exclusion. **Not one row anywhere in this file gives any of the three a disposition as a wave.**

The consequence is a fork with no lawful arm. If the three are in X·KF, this close stamps **VERIFIED** on three waves it never required to be IMPLEMENTED and never named — §2's *"It fails if any obligation closes **by omission**"*, at the widest altitude the file has. If they are out, then G-2's right-hand union (*"the union of X·KF wave bounds"*) and OP-5's GREEN (*"a spec for every wave … KF.W11, KF.W12 and KF.W13 are the live outstanding leg"*) are conditioned on artifacts outside the sub-tranche the gate closes, and **no unit of this wave, no precondition and no sibling authors them** — the green is not reachable from anything this file can name, which its own **L-2** rule then turns into *"a vacuous gate is deleted, not counted"*, vacating the close. The file has diagnosed the leg (*"KF.W11, KF.W12 and KF.W13 are UNAUTHORED — no spec file, therefore no bounds block"*) and has never asked who authors them or what verb they take.

### D-4 · MAJOR · G-4's class-membership falsifier fires against G-4's own round-3 table — PASS-3's check is missing from the conformance class, exactly one generation after PASS-2's was

**Receipt.** `KF-W10.md:347` fixes the conformance class at **two** members — `PASS-1/KF-W10-CHECK.md` (**5**) · `PASS-2/KF-W10-CHECK.md` (**2**) — under a note that is itself the diagnosis: *"**PASS-2's check joined the field after round 1's partition was written** — the plainest demonstration that this class is open-ended: **every future conformance pass adds a member**, and the gate must be immune to that by construction."* And `:350`'s falsifier: *"**a class row whose membership no longer reproduces at the executing seat's grep fails the partition, naming the file that moved** — that is how PASS-2's check was caught missing from round 1's roster."*

Re-run this seat: `PASS-3/KF-W10-CHECK.md` **is in the field** (it quotes `357/414` and the `86.23%` seal in its §0 re-derivation ledger) and is **not in the table**. The whole field is now **25 files / 80 occurrences**, against the table's **24 / 56**. This file cites `PASS-3/KF-W10-CHECK.md` by path at §2b.1, §G-4, §G-5 and §3.1 — it read the artifact repeatedly and left it out of the one table whose entire subject is who is in the class. The gate is not vacated (its RED is the register's non-existence, which is untouched), but the partition that is *"what the register adjudicates"* fails its own stated test, naming the file that moved.

### D-5 · MAJOR · The LAW A import-graph census claims exhaustiveness — *"none was missed"* — and misses a reference inside its own declared scope, in the census this file offers as LAW A's exemplar

**Receipt.** `KF-W10.md:230` books **one** reference for `bench/sync-step.measure.test.ts`: *"`bench/sync-step.bench.ts:129` mentions *"`test/sync-step.measure.test.ts`"*. That is **a different path** … **the sibling-basename trap** … Recorded, not counted."* `:235` then concludes: *"The consumer set = (1) ∪ the (2)-resolved hits = **∅ for all six modules** … **no consumer was invented and none was missed**, because the one plausible consumer (`proof-bench-taxonomy.mjs`) and the **one plausible reference** (`sync-step.bench.ts:129`) were each resolved and each disqualified by measurement."*

Re-run at `origin/master 81a56990`, over the census's own stated symbol-leg surface (`demo/ test/ src/ scripts/` plus `bench/`):

```
git grep -nF 'sync-step.measure.test' origin/master -- test/ bench/ src/ demo/ scripts/
  bench/sync-step.bench.ts:129        (named)
  bench/sync-step.measure.test.ts:2   (the module's own header)
  test/physics/sync-step.test.ts:24   " *    land — 1.998→0 turns/frame, `test/sync-step.measure.test.ts`)."   ← NOT ENUMERATED
```

The third hit disqualifies the same way — it names the same non-existent `test/`-rooted path — but it was **not found and not recorded**, and it sits in `test/`, not in `docs/`, which also falsifies leg (1)'s blanket *"Every hit resolves to **prose in dated `docs/` records**."* The verdict (∅ consumers) survives; the **claim of exhaustiveness does not**, and exhaustiveness is the entire epistemic content of an import-graph census. This is the census that rides §B-8's `RULED` verb, in the file that enacts LAW A as program law binding *"every seat that writes, carries, or leaves standing"* such an act — the exemplar convicted by its own law.

### D-6 · MAJOR · §B-2's `FOLDED-TO … SC-1` collides with a banked registry id of the same spelling and a different subject — the collision this file's own ROW-KEY NOTE exists to forbid

**Receipt.** `KF-W10.md:145` books §B row 2: *"**FOLDED-TO** COHESION §4a **SC-1** — glass-ui 7.0.0 ships `glass-chip.css` and imports it nowhere"*, evidence *"the SC-1 register row"*. `COHESION.md:120`–`:127` carries **SC-1 … SC-8**. And `registry/adjudicated/kf-SequenceScene.md` carries a **second, unrelated SC-1 … SC-8 roster** — `:28` (*"8 net-new rows admitted from the readers' 8 filed misses (**SC-1..SC-8**)"*), `:58` (*"**SC-1** *(NET-NEW — reader-B M-1)* — the GETTER on line 30 mints and persists a whole control-options bucket on the READ … **NO-WAVE-OWNER (delete both lines)**"*), `:57`, `:106`. **Two eight-member SC-1..SC-8 rosters, two meanings for one key, one of them a live NO-WAVE-OWNER row inside the very 58-record corpus G-2 sweeps.**

G-1's falsifier reads *"A `FOLDED-TO` fails **on its target**: a claimed banked id that does not resolve in the 58-record registry, or a claimed sibling-wave §-anchor that does not resolve."* Here the id **does** resolve in the registry — to the wrong subject, which is the worse failure the falsifier does not anticipate: a reader greppng `SC-1` across the corpus lands on a scene-repair row, not on the Chip cure. And §3.1's alphabet admits exactly two `FOLDED-TO` evidence forms — a registry-banked id, or a resolvable sibling-wave §-anchor — of which a COHESION §4a register row is **neither**, so row 2 also takes an undeclared third form.

The governing law is this file's own, at §2b.1's ROW-KEY NOTE: the `CARRY-C-*` rows are prefixed *"**because KF-W0's §Carry already occupies `C-3`, `C-4` and `C-5` with different subjects** and a program that greps by id cannot afford two meanings for one key."* The sweep that produced that sentence was not run over §B-2 — which is the altitude-sweep failure KF-W0's law names (*"a defect repaired in §Carry and left standing in §Scope … is not repaired — it is relocated"*), one section away from where it was written.

### D-7 · MINOR · `CARRY-C-3`'s two `ENUMERATED-NOT-MINTED` receipts ride dead line numbers into a sibling rewritten before this file's write

**Receipt.** §3.1's record table cites *"**`:234` kf-SpringTrace K-6 = "ENUMERATED AS A"** [killed-as-stated] and **`:235` kf-SharePopover C·C-2 = "ENUMERATED AS REFUSED"**"*. At KF-W0's current bytes, `:234` and `:235` are the two header lines of its **§Bounds** table (`| File | Access |` and `|---|---|`). The dispositions live at **`:373`** — *"**ENUMERATED AS A DEAD OCCUPANT, NOT MINTED**"* — and **`:375`** — *"**ENUMERATED AS REFUSED, NOT MINTED**"*. The substance is right and the third lawful shape is the correct cure; the coordinates are dead, and the quoted fragments are truncations of the real cell text. This file strikes three sibling line-number receipts elsewhere under **U-2/R2-7** with the explicit rule *"a line number is not a receipt"*, and mints two new ones here, into the one sibling it knew had been re-cut this round.

### D-8 · MINOR · The KF.W1 mail-cure instrument is named by **id** at its source and by **phrase** here, at all three sites this wave depends on it — and it is absent from the inbound-dependency table

**Receipt.** `grep -c 'O-21' KF-W10.md` → **0**. KF-W1 mints it by id at `:86` (*"mint outbound row **O-21** — the measured ledger maximum **O-20** (at `:95`) **+ 1**"*), `:100` (§Bounds), `:168` (C-10's MINT LAW), `:263` (*"**G-KF1-7 · LEDGER VERBS — I-26 CURED + O-21 minted**"*), and declares `:315` cross-edge 11: *"**→ KF.W10** … Type: **PRECEDES (hard) — the hardest downstream dependency this wave has**."* KF-W4 already consumes it by id (*"The instrument is named by id (D-12, round 3): KF.W1's outbound row `O-21`"*). W10's OP-3, G-6's RED and §6.C-B all say only *"the O-8/O-11 amendment-addendum."*

The ledger maximum is still **O-20** (`INBOX.md:95`), so W10 is right to mint nothing — the defect is not a missing mint, it is a **missing index**. §6.C-0's table exists so *"OP-4 and the terminal table are fulfillable by construction"*; it has five rows and none is the edge OP-3 and G-6 actually turn on, though KF.W1 declares it *hard* and *hardest*. And §6.C-H's own correction states the lesson three sections earlier: *"the five KF-HA rows are named individually in the successor register's ask rather than folded into a phrase, since **the O-20 census shows exactly how a packet named only by phrase gets left behind**."*

### D-9 · MINOR · §B rows 1, 4 and 9 carry evidence forms the round-3 alphabet does not declare for `STANDING-CARRIED`

**Receipt.** §3.1's alphabet table fixes `STANDING-CARRIED`'s evidence as *"`<the carried text — charter, watch row, or the standing surface that carries it forward>`"*, and G-1's Statement requires *"each with **the evidence form that verb requires**, per §3.1's alphabet table."* Row 1's evidence cell is *"the successor batch's dated sent-row + KF.W9's capture-receipt §Bounds row"*; row 4's is *"the successor batch's dated sent-row"*; row 9's is *"G-7's landing CI witness (or, on KILL, the tombstone's MR2 unit)"*. None of the three is carried text, a charter, a watch row or a standing surface — rows 1 and 4 point at a row inside a letter not yet assembled, and row 9 points at another gate's receipt. The named vehicle (COHESION §4a's re-opened accretion register) *would* satisfy the form; the cells name the letter instead of the register. Round 3 worded all fifteen rows against the alphabet and did not sweep their evidence cells against the same table.

### D-10 · INFO · G-4's live-spec self-count moved 11 → 17 inside this file, and the artifact it defers to under LAW B is the one that measured 11

**Receipt.** Re-run this seat, `grep -coE '357/414|86\.23|0/5 slots'`: `KF-W10.md` **17** (KF-W0 **2** and KF-W3 **2** unchanged); whole field **25 files / 80 occurrences** against the cited **24 / 56**. The file is explicit that this is *"a **dated observation**, never an acceptance criterion"* and carries the closure claim by citing PASS-3 per LAW B, which is the correct posture and is why this is INFO rather than a gate finding. It is recorded because §G-4's own standing instruction — *"any seat that re-prints it **re-runs the grep first** (R2-5)"* — was not run at the round-3 write, and because the drift is now large enough that a reader taking `11` from this file's own text would mis-partition the class on sight.

---

## §4 M-25 depth — locks, riders, dissents, scope

**Locks: HOLD.** All seven §3.2 sequencing locks reproduce against their banks — LP-1's write→render edge, the MbabbMenu MUST-CARRY rider, TD-1/TD-2 bundling, KF-APP-1/-17 same-motion with the `headerLeft` 'fill' TRAP, the comment-stated-invariants law, glass-producer→SS-6, and **KF-AV-28**, whose three anchors (`kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36`) resolve and whose reciprocation at KF-W7 is now measured, not asserted. The seventh is carried rather than cited, with the R-10 governed-row enumeration and the added terminal word intact.

**Riders: HOLD.** KF-HA-4's SPLIT-LOCK (manifest lines only), KF-AT-26's ANTI-REBOOK (limb (e), reciprocated at KF-W8), KF-EST-23's CORRECTION-BOUNDARY LOCK, CARRY-C-4's PREMISE-CORRECTION + KF-SST-30 companion, and the DENOMINATOR LOCKS (G-1 stays 15, G-5 stays 4) are each stated wherever they bind, with the ordinals reconciled and the round-3 alphabet additions explicitly barred from moving either denominator.

**Route-by-mechanism: HOLD, and deepened.** The never-cite class was re-swept across all 58 records at this seat; the two id-less coordinates W10 homes are the only two of that class filed with no wave (the other two — `KF-SKEL-22`, kf-App `K-5` — carry routings and are correctly not here). `CD-DISSENT-4` as a **declared positional key** is the right spelling and is used identically at §2b, §2b.1, §3.3 and §9.3. The homing is declared as this seat's act, re-homeable and undroppable.

**Dissents: HOLD, with D-1's exception.** Six dissents, none resolved by fiat; the ownership gap is narrowed, ruled and still owed with §0c verified absent; CARRY-C-5's three-sources-say-W6 tension is booked rather than dissolved; dissent 6 states the unminted-id weakness against itself. **Dissent 6 is again the right instinct and again does not reach the case that matters** — it worries that the ids do not exist yet; the defect is that the roster of claimants those ids will be minted for is a generation stale (D-1).

**Scope discipline: HOLD, and it remains the best thing in this spec.** The file-scope vs sub-tranche-scope SPECIFIED distinction is stated identically in the header, the four-verb table, OP-6, §6.C-E and §9.2, and it is what lets the file close its own L-20 loop without certifying a sub-tranche no seat owns. **D-3 is the one place that discipline did not reach**: a wave count is exactly the kind of thing the sub-tranche stamp is supposed to be honest about, and three minted waves went unnamed.

---

## §5 Verdict

**DEFECTIVE.** The round-3 repairs held and several were excellent: the three re-open triggers are carried byte-exact (PASS-3's one escape, genuinely cured); mechanisms **D** and **E** are declared and the three-mechanism partition is struck by name; the SS-6 vehicle correction is measured, not argued; the G-6 blocker is withdrawn at the right rows; the alphabet is widened by declaration rather than by silence; `CD-DISSENT-4` is spelled as the positional key it is; and every substrate witness in this file reproduces at `81a56990` to the byte.

It fails on a single repeated shape, one altitude higher than the shape PASS-3 named. PASS-3 convicted *"cite the row, miss the row underneath it."* This round the file learned to read the row underneath — **and did not re-read the sibling that moved while it was writing.**

- Its consumed roster is KF-W0's **round-2** roster, seven minutes after KF-W0 published the round-3 re-cut that retires an id W10 prints, adopts an id W10 omits, and strikes a row W10 counts (**D-1**).
- Its own five-edge seam table declares two edges uncured that their sources cured eight minutes before its write, while recording the supersession for the other two in the same table (**D-2**).
- Its exhaustive import-graph census misses a hit in `test/` (**D-5**); its class-membership table misses the conformance file it cites eleven times (**D-4**); its `FOLDED-TO` target collides with a live registry id under the file's own anti-collision law (**D-6**).
- And the escape is not a fine point of routing: **three X·KF waves the program minted have no precondition, no disposition and no place in the VERIFIED stamp this close performs** (**D-3**).

A close wave's product is one terminal word per obligation, and its denominator is its whole credibility. Two of this file's denominators — the C-17.R claimant roster and the X·KF wave set — are not the program's.

*End of PASS-4 register. Read-only throughout; the sole write of this seat is this file.*
