# KF-W10 — PASS-3 FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W10.md` (113,042 B at this seat's read).
**Seat**: FRESH. Nothing inherited from `PASS-1/KF-W10-CHECK.md`, `PASS-2/KF-W10-CHECK.md`,
`PASS-1/RULINGS.md` or `PASS-2/RULINGS-2.md` — those were read only to confirm that ids the
spec cites **exist**, never to import a finding, a count, or an escape list.
**Clock**: 2026-08-28, after the round-2 repair bank.
**Refs of record**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1`
(`git rev-parse origin/master`, this seat); local `8281638c` **DISQUALIFIED** — every witness
below was re-executed at the frontier, and no receipt in this register rides `8281638c` except
where drift is the subject. value.js `tranche-u`, current tree bytes.

**VERDICT: DEFECTIVE** — 6 MAJOR · 3 MINOR · 1 INFO.
**Census: routed 22 · booked 21 · escaped 1.**

---

## §0 What reproduced (stated first, because most of this file is sound)

The spec's arithmetic and its frontier witnesses are, with the exceptions in §3, honest.
Re-derived read-only at this seat:

| claim in KF-W10 | re-derivation | result |
|---|---|---|
| 58 kf records · 57 carrying `NO-WAVE-OWNER` · 1,216 occurrences | `ls kf-*.md \| wc -l` · `grep -l` · `grep -o` | **58 · 57 · 1,216** ✓ |
| FOLD-FORWARD `## §B` at line 30, `## §C` at 48, 15 numbered rows | `git show origin/master:docs/tranches/V/FOLD-FORWARD.md` | ✓ exact; all 15 subjects map 1:1 to §3.1's table |
| OD-V3 `:7` HELD · OD-V5 `:9` DEFERRED, verbatim | `git show origin/master:…/OWNER-DECISIONS.md` | ✓ byte-exact |
| OG-KF1 at `INTAKE-ADJUDICATION-2026-08-03.md:232`, naming KF.W10's owner block | read | ✓ |
| proof roster **3** at `origin/master` (`:50`/`:51`/`:52`) vs **2** at `8281638c` | `git show <ref>:package.json \| grep '"proof'` | ✓ exact — the KF-HA-4 roster re-anchor is correct and concordant with R-17 |
| `proof:cursor-light-subtle` / `:hero-two-focal` / `:appearance-suffusion` → 0 files under `scripts test src` | `git grep -l <name> origin/master -- scripts test src` | ✓ **0 · 0 · 0** — the substantive KF-HA-4 finding survives |
| the `home.json` rider re-anchor `:11` → `:2`/`:13`/`:16` | `git grep -n 'hero-two-focal'` | ✓ exactly three sites; `:11` is the bare `"forbidden": [` opener |
| the ten G-5 doc anchors (`r-animation-sota` `:107` heading / `:109` claim bullet / `:253` ledger row; `lane-22` `:110-112`; `U.D.md:194`; `home.json:9`; `home.md` `:67`/`:187-191`/`:367`) | `git show` each | ✓ **all ten resolve, each carrying exactly the text quoted** |
| `.tap-floor` → 0 adopters; 2 hits = `:81` comment + `:82` selector | `git grep -n 'tap-floor' origin/master -- demo/styles/design-idioms.css` | ✓ exact; reproduces G-W6-4 |
| VM-4: `version` 6.0.0 · CHANGELOG `## 6.0.0` at line 6 · no Unreleased | `git show` both | ✓ |
| G-4 field **56 hits / 24 files**; live-spec class KF-W0 **2** · KF-W3 **2** · KF-W10 **11**; checks PASS-1 **5** · PASS-2 **2** | the pasted grep, re-run | ✓ **every figure exact**, including the self-referential 11 |
| §7 carries **17** rows (against R2-2's parenthetical "13") | row count over §7 | ✓ **17** — W10's dated correction of the ruling's figure is right, and the R2-5 posture that produced it is right |
| `v/w9-staging` = `b920b190…`, live and unmerged | `git ls-remote --heads origin` | ✓ |
| `HEAD` 1 ahead / 41 behind `origin/master` | `git rev-list --left-right --count` | ✓ |
| both kf ledgers present at `origin/master` | `git cat-file -e` ×2 | ✓ |
| INBOX **56,702 B**, five `UNREAD` at `:4`/`:5`/`:19`/`:29`/`:95`, zero UNREAD *status rows* | `wc -c` · `grep -n` | ✓ exact (but see **D-5**) |
| KF-W0 §Carry **C-17.R** = 13 claimants (9 S-9 · 4 S-10), enumerated | read `:221`–`:239` | ✓ **the enumeration in §3.1 matches the roster row-for-row** (but see **D-8**) |
| the canonical **17-packet roster**, KF.W11 ×9 · KF.W12 ×6 · KF.W13 ×2 | `RULINGS.md` R-15 `:264`–`:272` | ✓ identical, in order |
| KF-W4's sequencing-head paragraph and the `KF.W11 · Demo Scene Repair (9)` roster bullet, cited by **stable anchor with the line number struck** | `KF-W4.md:234` / `:244` | ✓ both present; the nine-packet quotation is byte-exact — the round-2 phantom-quotation correction was the right call |
| KF.W11/W12/W13 unauthored — no spec file | `ls waves/` → 11 files (W0..W10) | ✓ the live G-2 RED leg is real |
| KF-AV-28 banked at `kf-AnimationVisualizer.md:35` · `kf-PlaybackRibbon.md:36` · `kf-SequenceScrubber.md:36` | grep each | ✓ all three anchors carry it |
| kf-EditorHeader killed-claim **#8** at `:86`, and the REPO-SCOPED restatement | read + `git ls-tree -r origin/master \| grep -i headerribbon` | ✓ **exactly one kf path**; the value.js archive letter present at 2,878 B — two different documents, as W10 says |
| COHESION §0a (58/58 at `35fc8ebf`, SS-10b CLOSED) · §0b (KF.W3→SS-1) · **§0c ABSENT** · §1 leaves KF.W10 unassigned · §4a SC-1 | read | ✓ all — the ownership dissent is honestly stated |
| lane-docs rows 12 / 14 / 16 verbatim | read `:376` / `:378` / `:380` | ✓ |

**Posture axis, itemised.** W4's sequencing head is **named, not merely satisfied** (§6.B, §6.C-C) ✓.
W4's `npm run check` re-cut at G-KFW4-1 is `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p
tsconfig.test.json && npm run proof:structure`; the live script at `origin/master` is `tsc --noEmit
&& tsc --noEmit -p tsconfig.test.json && npm run proof:structure` and `proof:structure` exists at
`:50` — the re-cut **composes** ✓ (W10 makes no `check` claim, so it neither helps nor harms here).
KF.W3 is carved out **by name** as gated-never-scheduled, with the unopenable-by-construction
argument written out (§1) ✓. KF-AV-28 is present where governed — §3.2 bullet 7, the R-10
governed-row enumeration, and G-2's acceptance alphabet ✓. **O-21 vs O-20**: the INBOX max is
**O-20** (`:95`, SENT 2026-08-28), so a W1 mint is `max+1 = O-21`; W10 names **no mint id at all**
(cross-edge 11 hands it *the row*, not the literal) and correctly identifies `:95` as O-20's
disposition cell ✓. **Carriage-not-omission is the axis this file fails** — see D-4.

---

## §1 ID-KEYED CENSUS — full re-enumeration by bytes

The spec's own census (§2b.1) declares **three** routing mechanisms and lands **routed 9 / booked
9 / escaped 0**. Within its stated scope that arithmetic is **correct and reproduces**. But the
scope is not the routing surface. Re-enumerated from the bytes, KF.W10 is routed obligations by
**five** surfaces:

| mech | surface | ids |
|---|---|---|
| **A** | explicit routing cells in the 58 records | KF-AT-21 ⟨kf-AnimatedText:61⟩ · KF-AT-26 limb **(e)** ⟨:71⟩ · KF-EST-23 ⟨kf-EditorStartScreen:90⟩ · KF-HA-4 manifest arm ⟨kf-HeroAurora:41⟩ |
| **B** | no-wave rows homed by M-25 | kf-ChromeDock `## DISSENT` item **4** ⟨:147⟩ · kf-EditorHeader killed-claim **#8** ⟨:86⟩ |
| **C** | `carry/KF-W6-CARRY.md:361`, the five-item W10 edge | KF-AT-21 ≡A · KF-HA-4 ≡A · CARRY-C-3 · CARRY-C-4 · CARRY-C-5 |
| **D** | **sibling wave specs — UNENUMERATED BY §2b.1** | OG-KF1 ⟨KF-W0:85,:148,:399,:445,:472⟩ · the 357/414 block ⟨KF-W0:148,:445 · KF-W4:260 · KF-W5:294⟩ · B18-12/13/14 ⟨KF-W0:445,:470⟩ · B18-27 ⟨KF-W0:148,:470 · KF-W5:294⟩ · KF-W8-R-4-STRUCT-PAIR ⟨KF-W8:297 · KF-W5:235,:262,:291⟩ · **KF-W8 R-4's THREE RE-OPEN TRIGGERS** ⟨KF-W8:298⟩ · KF-W6 §Cross-edges sixth item ⟨KF-W6:407,:419,:443⟩ |
| **E** | program inheritance (FOLD-FORWARD §B · census · lane-docs) | FF-B-DISCHARGE (15 rows) · NWO-TERMINAL-SWEEP · OD-V3 · OD-V5 · W9-STAGING · COORD-TERMINAL |

**Deduped distinct routed obligations: 22.**

1 FF-B-DISCHARGE — booked G-1 · 2 NWO-TERMINAL-SWEEP — booked G-2 · 3 OD-V3 — G-3 ·
4 OD-V5 — G-3 · 5 OG-KF1 — G-3 · 6 the 357/414 block — G-4 (4) · 7 B18-12/13/14 — G-4 (1)(2)(3) ·
8 B18-27 — G-4 (5) · 9 ChromeDock DISSENT item 4 — G-4 (6) · 10 EditorHeader killed-claim #8 —
G-4 (7) · 11 KF-AT-21 — G-5 add.1 · 12 KF-EST-23 — G-5 add.2 · 13 KF-HA-4 manifest arm — G-5
add.3 · 14 KF-AT-26(e) — G-5 add.4 · 15 W9-STAGING — G-7 · 16 COORD-TERMINAL — G-6 ·
17 CARRY-C-3 — record · 18 CARRY-C-4 — record · 19 CARRY-C-5 — record ·
20 KF-W8-R-4-STRUCT-PAIR — record · 21 KF-W6's sixth edge item — booked in §2b.1's closing
paragraph, discharged by construction as G-2's ∅ ·
22 **KF-W8 R-4's three re-open triggers — ESCAPED (D-4).**

> **routed 22 · booked 21 · escaped 1.**

The escape is not incidental to the mechanism gap — it is **caused** by it. The three triggers are
routed to W10 by mechanism **D** alone, and D is the one surface §2b.1 does not enumerate. A census
that asserts `escaped: 0` over a partition that omits the surface where the escape lives has
produced a true sentence about the wrong set (**D-9**).

---

## §2 GATES — born-RED discipline at the frontier

All seven gates carry a genuine RED and a witness re-executed at the frontier. The per-gate
re-derivation ledger that replaced round 1's blanket stamp is the right instrument and its figures
reproduce (§0). Three gate-level findings follow (D-1, D-2, D-3 against G-1; D-5 against G-6;
D-6 against the SS-6 edge G-1's rows 1/2/4 depend on). G-2, G-3, G-4, G-5 and G-7 are **CLEAN** at
this seat: G-4's partition-not-count construction is genuinely well made — it survives its own
monotonic field, and the class-membership falsifier that caught PASS-2's check is the correct shape.

---

## §3 DEFECT REGISTER

### D-1 · MAJOR · §B-8's `FOLDED-TO KF.W4` resolves nowhere

§3.1 row 8 books §B-8 as *"**FOLDED-TO KF.W4** gate-authoring law, verbatim: "a src-scoped
dead-sweep must also grep the LANDING consumer tree when a consume transaction is in flight""*,
and states the evidence the verb requires as **"KF.W4's rule list containing the sentence"**.
§6.C-C repeats it: *"**W10 → W4**: §B-8's lesson lands there **verbatim**."*

**Receipt**: `grep -rn 'LANDING consumer tree' docs/tranches/X/keyframes/waves/` → hits **only in
`KF-W10.md`** (`:132` and `:384`). `KF-W4.md` contains the sentence nowhere; `grep -nE
'dead-sweep|consume transaction' KF-W4.md` → 0; and KF-W4 declares **no inbound edge from KF.W10**
at all (`grep -nE 'KF\.W10' KF-W4.md` returns five hits, none of them an inbound-edge row — cf.
KF-W8's explicit *"Inbound edges received (RULINGS R-19c) — each booked or declined, by id; none
left neither"*). KF-W4 row 28 carries **B10-27 + B18-19 + B21-17** only — three of the nine ids
W10's row names, distilled to different content.

G-1's own falsifier: *"A `FOLDED-TO` whose banked id does not resolve in the registry fails on the
id, not the prose."* This is that failure, at W10's own altitude. Compare the rows that do resolve:
§B-2→§4a SC-1 ✓, §B-7→`kf-App.md:71` KF-APP-21 ✓, §B-12→KF.W0 ✓, §B-14→COHESION §0a ✓.

### D-2 · MAJOR · §B-3's evidence coordinate does not resolve in either named wave

§3.1 row 3 books the Glass §4 dock-contract re-verify (*"subsumes CH2-02 ×4: BG-5, GU-1, GU-2,
subject-legible"*) to **"KF.W6 + KF.W9"**, evidence **"both waves' bounds blocks"**.

**Receipt**: `grep -coE 'CH2-02|BG-5|GU-1|GU-2|subject-legible' KF-W6.md KF-W9.md` → **0 and 0**;
`grep -cE 'dock contract|Glass §4' KF-W6.md KF-W9.md` → **0 and 0**. Neither named wave carries the
subject, the four subsumed ids, or a bounds row that could serve as the receipt. The row directs a
close-wave verb at two specs that have never heard of it.

### D-3 · MAJOR · G-1's closed vocabulary does not cover G-1's own table

§3.1 opens: *"ONE table, 15 rows, **exactly one terminal verb each**, from the closed vocabulary
`LANDED` / `KILLED` / `RULED` / `FOLDED-TO` / `STANDING-CARRIED`"*; G-1's acceptance is *"15/15
verbs"*; its falsifier convicts *"a row whose 'verb' is a status word"*. §2 forbids the executing
seat from supplying them: *"the pre-adjudicated dispositions are **carried, not re-derived**."*

**Receipt** (vocabulary audit over §3.1's 15 rows, this seat):

| row | carried disposition | verb |
|---|---|---|
| 1 | "glass-owned (born-RED BJ wave **GF-AURORA**); rides **SS-6** …" | **none** |
| 3 | "**KF.W6 + KF.W9**" | **none** |
| 4 | "**SS-6** ledger; OD-V5 keys off the same boundary" | **none** |
| 9 | "verified **AT** the W9-staging landing, not before" | **none** |
| 11 | "close-audit doc-drift check against the … 184,430 B" | **none** |
| 14 | "**DISCHARGED BY CONSTRUCTION with a receipt**" | **outside the declared alphabet** |
| 15 | "value **SCI-1** … rides … **CC-084** via **PLAW-BIND**" | **none** |

Rows 2, 5, 6, 7, 8, 10, 12, 13 carry lawful verbs. **Seven of fifteen do not**, and row 14 mints an
eighth verb the alphabet never declared. A close wave whose entire product is one terminal word per
obligation leaves 7/15 of them unwordable, with re-derivation forbidden.

### D-4 · MAJOR · carriage-by-omission — KF-W8 R-4's three re-open triggers are absent

`KF-W8.md:298` (added at repair round 2 to cure its own G13 defect) rules the triggers **and names
their carrier**: *"This decline re-opens on any ONE of three conditions, and on no other: (1) X·KF
closes …; (2) the anchor tax that grounds the decline disappears …; or (3) `engine/animation.ts`
stops being a live cure surface … Each trigger is a condition a later seat can evaluate without
re-litigating this wave; **the FOLD-FORWARD record at KF.W10 carries all three with the ruling.**"*

**Receipt**: `grep -in 'trigger' KF-W10.md` → **0 hits**. W10 books
`KF-W8-R-4-STRUCT-PAIR` in three places (§2b `:92`, §3.1 `:148`, §8 `:438`, 8 occurrences of the
key) and carries **none** of the three conditions. §3.1's record instead writes the opposite
posture — *"it does not perform the flatten, does not re-open the ruling, and does not schedule a
successor act — a successor formation that wants the flatten re-opens it against KF.W8 R-4, not
against this row"* — which is precisely why the triggers had to travel: they are the successor's
evaluation instrument, and the record is the only place R-4 puts them.

This is the failure §2 declares fatal (*"It fails if any obligation closes **by omission**"*),
committed against the one record the file otherwise treats as its exemplary record/act discipline.

### D-5 · MAJOR · G-6 books an already-discharged obligation as the gate's live blocker

§2b's COORD-TERMINAL row and G-6's *"ONE LIVE ROW THIS RE-MEASUREMENT SURFACES, booked rather than
swallowed"* both assert: `:95`'s prose *"two UNREAD glass 08-09 letters found this boundary —
rowing owed to the main session"* is an outstanding E13 act, and **"G-6 may not read terminal while
it is outstanding."**

**Receipt**: in the same 56,702-B file W10 measured, the two rows immediately below `:95` are the
discharge. `INBOX.md:96` = **I-28** — *"2026-08-09 (+§5 addendum 08-25; **ROWED 08-28**) … glass
8.0.0 addendum"*, status cell **"ROWED 2026-08-28** (found by the SS-6 sweep; 19 days unrowed — the
stale BI sweep path was the defect, cured in the preamble this row)"*. `INBOX.md:97` = **I-29** —
*"2026-08-09 (**ROWED 08-28**) … constellation remainder"*, status **"ROWED 2026-08-28, NO ACTION"*.
Those are the two glass 08-09 letters. The rowing is **done**, and the file says so twice.

The gate reads the sweep-note prose in one cell and does not read the rows that answer it — the
same class of defect as round 1's stale-bytes reading that this very section publishes a correction
for, one level up. G-6 stays born-RED for its real reason (no terminal verbs; D-GAP-6 and O-8
unclosed), so the gate is not vacated — but a close wave that manufactures an outstanding
obligation has mis-stated its own arithmetic in the direction that most flatters it.

### D-6 · MAJOR · §6.C-H routes five §B/owner rows onto a vehicle that has already departed without them

§6.C-H: *"Four §B rows and one owner row resolve **producer-side only** … kf-HeroAurora's relay
packet (**KF-HA-1** · **-2** · **-9** · **-12** · **-13**) rides the **same ONE batched letter**."*
§7 excludes every glass-producer cure to *"**SS-6's ONE batched BJ letter**"*. §3.1 row 1's stated
evidence is *"SS-6 letter row"*; row 4's is *"SS-6's dated sent-row"*.

**Receipt**: COHESION §4a `:129` — *"**DISPATCHED 2026-08-28**: SC-1..SC-8 + the X·KF/X·F
authoring-block accretions assembled into **O-20** … 26 entries … the table resumes accretion"*;
INBOX `:95` — O-20 **SENT** 2026-08-28. The letter exists at
`../glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md`
(11,466 B), and `grep -conE 'KF-HA|aurora|AURORA|V-A95|GF-AURORA'` over it → **0**.

So the *one* batched letter went out at this boundary carrying none of the aurora cargo, and §4a
declares the register re-opened for the **next** batch. W10 cites §4a by name (for SC-1, `:120`)
and does not read the dispatch row nine lines below it. §B-1's evidence coordinate cannot be
produced by the vehicle W10 names; §B-1/§B-4/OD-V5 and the five KF-HA rows need the successor
batch, and the spec should say which.

*(Note the shared mechanism with D-5: both are "cite the row, miss the row underneath it." That is
a method finding, not two coincidences.)*

### D-7 · MINOR · §6.A miscounts its own load-bearing orderings

`KF-W10.md:359`: *"`.a` → `.b` → … → `.g`. **Two orderings are load-bearing:**"* — followed by
**three** numbered items (`:361`, `:362`, `:363`), the third added at repair round 2 for the C-17
mint order. The header count was not swept.

This is the exact class the file itself prosecutes twice — §1's struck *"each maps to exactly one
gate"* against §3.3's two-gate title, and §2b's struck *"fifth and sixth"* against §3.3.2's
ordinals, with the standing rule *"an ordinal that is a gate criterion may have exactly one value."*
KF-W0's altitude-sweep law (*"a defect repaired in §Carry and left standing in §Scope … is not
repaired — it is relocated"*) is the governing precept, and it was not run over §6.A's header.

### D-8 · MINOR · CARRY-C-3's verb shape is unsatisfiable for 2 of its own 13 claimants

§3.1's CARRY-C-3 record and §8's row both require *"**one terminal verb PER CLAIMANT** … recorded
against the id **C-17 mints** for it"*, with the fallback *"`STANDING-CARRIED — pending the KF.W0
C-17 mint`"*.

**Receipt**: KF-W0 §Carry C-17.R states its own two-valued law — *"A dead or refused claimant is
**enumerated, not minted**"* — and dispositions two of the thirteen that way: `:234`
kf-SpringTrace **K-6** = *"**ENUMERATED AS A**"* [killed-as-stated], `:235` kf-SharePopover
**C·C-2** = *"**ENUMERATED AS REFUSED**"*. C-17 will never mint an id for either, so neither the
primary verb form nor the "pending the mint" fallback can ever apply to them. The record needs a
third lawful shape (an *enumerated-not-minted* terminal word) or an explicit 11-of-13 denominator.

### D-9 · MINOR · the carry-consumption census's mechanism partition is under-inclusive, and that is where the escape hides

§2b.1: *"**Every** id routed to KF.W10 by any of the three mechanisms, counted at the bytes this
seat. The mechanisms are named **so the count is checkable**."* → `routed 9 · booked 9 · escaped 0`.

**Receipt**: five of §2b's own nineteen carry rows — OG-KF1, the 357/414 block, B18-12/13/14,
B18-27, KF-W8-R-4-STRUCT-PAIR — arrive by **none** of A, B or C; they arrive from sibling wave
specs (`KF-W0.md:445`, `:470`; `KF-W4.md:260`; `KF-W5.md:294`; `KF-W8.md:297`) and from
FOLD-FORWARD/lane-docs. §2b.1 itself half-concedes the gap in its closing paragraph, which reaches
into `KF-W6.md`'s cross-edge for a sixth item — i.e. it *uses* mechanism D once without declaring
it. The consequence is not cosmetic: **D-4's escape is routed by mechanism D alone**, so the
partition that certifies `escaped: 0` is structurally blind to the only escape in the wave.

### D-10 · INFO · `DISSENT-4` is a coined positional key in a file that forbids coining

**Receipt**: `grep -oE 'DISSENT[ -]*[0-9]+' kf-ChromeDock.md` → **0 hits**. The content resolves as
the **4th** item (`:147`) under `## DISSENT — preserved, not ruled away` (`:142`), and its text is
quoted accurately by W10 (header tally 25/6, *"eight defects and two superlatives that were never
written"*, *"never quoted"*) — so the receipt is findable in one hop. But §9.3 says ChromeDock
*"files its coordinate as **DISSENT-4**"* when it files no id at all (which is precisely why M-25
route-by-mechanism applies), and §2b.1's row-key note asserts *"**No banked id anywhere in this
file is coined, renamed or renumbered**."* The honest spelling is the one §2b.1 already uses for
CARRY-C-*: a declared positional key, not a quoted id.

---

## §4 M-25 depth — locks, riders, dissents

**Locks: HOLD.** §3.2's seven sequencing locks reproduce against their banks — LP-1's write→render
edge, the MbabbMenu MUST-CARRY rider, TD-1/TD-2 bundling, KF-APP-1/-17 same-motion with the
`headerLeft` 'fill' TRAP, the comment-stated-invariants law, glass-producer→SS-6, and **KF-AV-28**.
The seventh is the one round 1 dropped, and its restoration is done properly: not cited but
**carried**, with the R-10 governed-row enumeration, the extra terminal word (`DISCHARGED by KF.W7
SWAP verdict <surface>, <date>`) added to G-2's alphabet, and the reason its omission was invisible
stated out loud. The three banked anchors resolve.

**Riders: HOLD.** The KF-HA-4 SPLIT-LOCK (manifest lines only), the KF-AT-26 ANTI-REBOOK (limb (e)
only — reciprocated at `KF-W8.md:152`/`:344`), the CORRECTION-BOUNDARY LOCK on KF-EST-23, the
PREMISE-CORRECTION and KF-SST-30 companions on CARRY-C-4, and the DENOMINATOR LOCKS (G-1 stays 15,
G-5 stays 4) are each stated in every place they bind, with the ordinals reconciled.

**Dissents: HOLD, with D-8's exception.** Six dissents, none resolved by fiat: the batches-of-3 vs
max-4 collision is flagged not adopted; the ownership gap is narrowed, ruled and still owed with
the §0c cure shape named and COHESION §0c verified **absent**; the never-cite homing is declared as
this seat's M-25 act; KF-HA-4's split severity is recorded as a risk; CARRY-C-5's three-sources-say-W6
tension is booked rather than dissolved; and dissent 6 states the unminted-id weakness against
itself. Dissent 6 is the right instinct and D-8 is what it missed.

**Scope discipline: HOLD.** The file-scope vs sub-tranche-scope SPECIFIED distinction is the single
best thing in this spec: it lets the file close its own L-20 loop without certifying a sub-tranche
no seat owns, and it is stated identically in the header, the four-verb table, OP-6, §6.C-E and §9.2.

---

## §5 Verdict

**DEFECTIVE.** The spec is materially sound — its frontier witnesses reproduce to the byte, its
gate constructions (especially G-4's partition-not-count and G-2's unfinal-denominator RED) are
well made, its re-anchor corrections are published rather than patched, and its scope discipline is
exemplary. It fails on **carriage and closure**, in one repeated shape: obligations and evidence
are pointed at coordinates that were not read to the end.

- Three §B rows cannot be discharged as written — one folds to a sentence its target does not
  contain (**D-1**), one to bounds blocks that do not mention it (**D-2**), and seven of fifteen
  carry no lawful verb at all (**D-3**).
- One routed obligation escaped entirely (**D-4**), through the one routing surface the census does
  not enumerate (**D-9**).
- Two live-state claims are falsified by the very files they cite, both by missing the row beneath
  the row (**D-5**, **D-6**).

Nothing here impugns the round-2 repairs, which held: the carry cure (C-3/C-4/C-5), the OP-5
re-measure posture, the G-6 byte correction, the R2-7 anchor strikes and the KF-AV-28 restoration
all reproduce and are correct. The remaining defects are older than round 2 and were not what
rounds 1 and 2 were looking for.

*End of PASS-3 register. Read-only throughout; the sole write of this seat is this file.*
