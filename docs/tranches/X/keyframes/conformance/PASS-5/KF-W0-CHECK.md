# KF-W0 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 5)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W0.md` — 694 lines, 224,173 B, mtime **2026-08-28 16:58:59**, **four times repaired** (rounds 1–4 vs `PASS-1/RULINGS.md` … `PASS-4/RULINGS-4.md`).

**Seat**: FRESH. Nothing below is inherited from `PASS-1`…`PASS-4` registers, from any RULINGS file, from `PASS-4/CLOSE-CERT.md`, or from the spec's own prose. The census is derived **by record** from the 58 `kf-*.md` bytes; every receipt is re-executed at its own anchor; every figure printed beside a command is that command's output at this seat's clock.

**Substrate of record (TREE LAW)**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` (`git rev-parse origin/master`, run this seat, read-only). Local HEAD `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` is **DISQUALIFIED**, read only where a gate's own subject *is* the schism. `git merge-base HEAD origin/master` → `a59d3a22…`; neither ref an ancestor of the other.

**Corpus**: the 58 `kf-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58) + the sole carry `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.

**Date**: 2026-08-28.

---

## §0 — Census unit and method (BY RECORD)

**Unit** = one ⟨record : banked obligation explicitly routed to KF.W0⟩ pair. **BOOKED** = the spec resolves the pair by bytes to a named disposition **and the banked id resolves to that pair**. A pair whose content is carried but whose **banked id is absent, or resolves only to a different limb**, is an **ESCAPE** — the spec's own C-1.G rule, applied to the spec.

**Derivation re-executed this seat at the current bytes:**

```
$ cd docs/tranches/V/megatranche/registry/adjudicated
$ ls kf-*.md | wc -l                                              → 58
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | wc -l                       → 237   (pre-discard lines)
$ grep -l -E 'KF\.W0|KF-W0' kf-*.md | wc -l                       →  50   (pre-discard records)
$ BP='ADJUDICATED, not VERIFIED|agglomeration input|wave sketch|census lane taxonomy|census taxonomy|Status verbs per M-25'
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | grep -cE "$BP"              →  64   (discarded)
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | grep -vE "$BP" | wc -l      → 173   (post-discard lines)
$ per-record survivor count > 0                                   →  44   (post-discard RECORDS)
$ records the discard drops whole                                 →   6
    kf-AnimationVisualizer · kf-CSSCodeEditor · kf-KeyframeCardList
    kf-KeyframeTimeline · kf-TimelineHoverPreview · kf-TransportDock
```

**The round-3/round-4 sweep reproduces byte-exactly** — 237/50 · 64 · 173/44 · and the six dropped-whole records are the six the spec names. Added to the 173: the pairs the discard drops but that still route (`kf-KeyframeCardList:120`, booked at C-1.F F-12 — the declared instrument limit (i)), the sole carry's `:174`–`:179` claimant block plus `:354`/`:361`, and the obligations declared from a sibling's end (`KF-W10.md` §6.A ordering 3 · §6.B lock 1 · the OUTBOUND row; `KF-W4.md` §Sequencing; `KF-W1.md` §Repair Round 4 D4-3).

**Result: routed 100 · booked 97 · escaped 3.**

**The §Carry denominator reproduces exactly**, re-counted this seat by table-row scan over the bytes: C-1..C-22 **22** · C-1.F **13** · C-1.G **22** · C-1.R **6** · C-17.R **15** = **78**, matching the spec's stated 78 and its stated +2 delta against round 3's 76. C-17.R's split is **10 `| S-9 |` rows + 5 `| S-10 |` rows** = 14 live + 1 enumerated strike, exactly as §Scope 6, G-0.6's second falsifier and the §Sequencing KF.W10 row all state it. **55 of the 58 records are named in the file**; the three that are not (`kf-ChannelControls`, `kf-SpringPhysicsFacet`, `kf-TimelineTrack`) now reach the wave through C-1.R row 6, which is the round-4 cure working.

---

## §1 — THE THREE ESCAPES (named by bytes)

| # | Escaped pair | Banked routing words / anchor | Byte receipt against `KF-W0.md` |
|---|---|---|---|
| **E-1** | **kf-KeyframesStringControls `L-M-9` — a MAJOR F-1 fold that reaches NEITHER fold table, and whose one id-hit resolves to the limb this wave declares RETIRED** | ⟨`kf-KeyframesStringControls.md:86`⟩ *"**L-M-9 — MAJOR · FOLD → census F-1 ≡ SCH-1 → KF.W0. NOT re-booked.**"* — with two riders: *"the two transitive critical-path edges verified by this seat (`CSSCodeEditor.vue:38` … `useApplyCSS.ts:4` — the Apply-CSS driver)"* | `grep -c 'L-M-9' KF-W0.md` → **1**, and that hit is C-1's *"**Probes RETIRED here** … the clean-`npm ci`-fails probe ⟨L-M-9⟩"* — the row's retired sub-clause, not its MAJOR fold. The **riders are carried verbatim at C-1** (*"kf-KeyframesStringControls' two transitive critical-path edges (`CSSCodeEditor.vue:38`; `useHighlightCSS.ts:2` via `useApplyCSS.ts:4`)"*), so the content is whole; the **handle** is not. Thirty-four records fold F-1 to KF.W0 under a banked id and thirty-three carry a **C-1.F** row (13) or a **C-1.G** row (22) — enumerated this seat: C-1.F = kf-DemoGlobalChrome · kf-EasingTarget · kf-EasingSidebar · kf-EasingScene · kf-KeyframesEditor · kf-TimingFunctionPanel · kf-AnimatedText · kf-ChannelOptions · kf-ChromeDock · kf-CSSPasteDialog · kf-KeyframesAddDialog · kf-KeyframeCardList · kf-App.skeleton; C-1.G = kf-MatrixEditor · kf-OrbitalDrag · kf-PlaybackRibbon · kf-KeyframeCard · kf-SequenceScrubber · kf-SequenceTarget · kf-SpringHeatmap · kf-SpringScene · kf-SpringTarget · kf-StartingStyleTarget · kf-SquareScene · kf-LayerConfigPanel · kf-RibbonBar · kf-SequencePlayhead ×2 · kf-CopyButton · kf-EditorHeader · kf-EditorShell · kf-MbabbMenu · kf-SpringTrace · kf-SquareInstrument · kf-SequenceScene. **`kf-KeyframesStringControls` is the single omission**, and it is the record that also supplies **C-2's tree-motion law** (DISSENT 3) and **F-R7/N-2's** `backward` divergence datum — so it is not a marginal record. |
| **E-2** | **`AGG-P1` — the census agglomerator probe that DECIDED SCH-1, absent from the wave that re-runs SCH-1** | ⟨kf-AmigaScene:6⟩ *"`origin/master` package.json:77 carries `"@mkbabb/glass-ui": "7.0.0"` as an EXACT devDep (**census SCH-1, AGG-P1**) … **KF.W0's re-anchor law applies before any cure executes**"* · ⟨:98⟩ *"(this seat's `git show`; **census SCH-1/AGG-P1**). … **Cure = KF.W0 §B-12**, never a dependency wave."* | `grep -c 'AGG-P1' KF-W0.md` → **0**. The id is a real formation id, not a coinage — verified this seat at `docs/tranches/V/megatranche/formation/keyframes/CENSUS-2026-08-03.md`: `:9` *"**Agglomerator probes** (read-only, marked AGG-P*)"* · `:32` SCH-1's evidence cell · `:62` *"**DOCS+AGG-P1 override FE (SCH-1)**"*. C-1's identity chain is *"F-1 ≡ SCH-1 ≡ **kf-AmigaScene C-1** ≡ KF-CE-32 ≡ kf-App ruling 1"* — five spellings of one identity, and the sixth, cited **by the very record the chain names as its head**, reaches no cell. §Bounds grants CENSUS *"modify-append (**SCH re-run** · …)"* and G-0.6's GREEN demands *"every SCH row … carries a dated, re-derived figure with its command pasted"* — so this wave's re-run supersedes an **AGG-P1-dated override it never names**, and a seat re-running SCH-1 has no handle on the probe whose finding it is replacing. |
| **E-3** | **kf-EditorHeader's SIX live escapes are routed to three homes with W0 named FIRST, and W0 books one of six** | ⟨`kf-EditorHeader.md:117`⟩ *"the corpus's **six live escapes (EH-1..EH-5, EH-9's SharePopover batch)** and the state-seam family (EH-2/12/13/14/15) are the real cures, **routed KF.W0 / KF.W6 / NO-WAVE-OWNER** with all SS-13 residue at KF.W9"* | `grep -c` in `KF-W0.md`: `EH-1` → **6** · `EH-2` → **0** · `EH-3` → **0** · `EH-4` → **0** · `EH-5` → **0** · `EH-9` → **0**. EH-1 is booked (the two repo-qualified letters, C-14 + G-0.10 + the §Sequencing FYI row) and is booked well. The bundle's **partition is stated nowhere in this file**, so a seat reading W0 — the first-named home — cannot decide whether any of the other five is W0's. `RULINGS-4` R4-1 disposes `EH-4/-5/-8/-9/-10` as **MOOT-ON-DELETE at KF.W6**; that disposition lives in a sibling and is **not declared here**, which is the §Excluded law's own form (*"Silent drops are the defect class this program exists to kill; these are loud"*) left unapplied to the one family the record routes to W0 first. |

---

## §2 — DEFECTS

### D-1 · MAJOR — the round closes on a certification the tree refutes: `KF-W10.md` wrote AFTER `CLOSE-CERT.md`

`RULINGS-4` §END: *"The round does not close without it; the pass-5 union seat audits it as its first act."* `KF-W0.md` §Repair Round 4 binds **itself** to the artifact, verbatim: *"the **RECONCILE seat** re-verifies every cross-wave receipt written this round after the last per-wave write and certifies at `PASS-4/CLOSE-CERT.md`; **without that certification the round did not close**, and no sentence in this file is written on its behalf."*

**Measured this seat** (`stat -f '%N %z %Sm' -t '%H:%M:%S'`, value.js tree, current bytes):

```
waves/KF-W10.md                    209923   17:38:21
conformance/PASS-4/CLOSE-CERT.md    27004   17:37:59
waves/KF-W0.md                     224173   16:58:59
```

`CLOSE-CERT.md` §1 row 6 records `KF-W10.md` at **17:31:54 / 209,902 B**. §1's *Reading* asserts *"**Every per-wave write precedes every reconcile write** — the last per-wave write was `KF-W10.md` at 17:21:25, and this seat's first edit was at 17:30:52, a **nine-minute clear margin**."* §9 clause 1 certifies *"It ran **AFTER the last per-wave write** … ✅"*.

**All three are false at the bytes** — by **22 seconds** and **+21 bytes**. And the falsification is isolated and therefore checkable: of the eleven specs, **ten byte counts in §1 match the tree exactly** (KF-W3 168,078 · KF-W0 224,173 · KF-W6 240,976 · KF-W4 209,984 · KF-W2 286,177 · KF-W9 221,965 · KF-W1 200,681 · KF-W5 252,821 · KF-W7 210,113 · KF-W8 195,418) and **KF-W10 alone does not** (209,902 certified vs 209,923 on disk).

**Why it bites rather than being bookkeeping.** U4-A was convicted at pass 4 because the round-3 re-anchor seat *certified nothing*. LAW C(4) was written to cure it and made the certification the round's closing condition. What the tree now shows is U4-A′: the seat certified a **write order a later write falsified** — the same class, at the instrument built to kill it, with the certification's own §8 self-diagnosis (*"This seat is not exempt: its own §3 table first printed a total of 14 against a column summing to 16"*) sitting one section above the sentence the bytes refute.

**What is NOT damaged, verified rather than assumed.** Every W0→W10 forward reference resolves at W10's **current** bytes: `grep -n 'C-17 MINT PRECEDES' KF-W10.md` → `:488` (§6.B's carried lock) and `:500` (§6.C-0 row 1, naming *"**KF-W0 §Sequencing**, the `KF.W10 · Fold Discharge & Close` **OUTBOUND** row"*) ✔ · `grep -c 'MINTED-UNAUTHORED'` → **10** ✔ · `grep -c 'O-21'` → **6** ✔ · `grep -c 'KF-ET-27'` → **4** ✔ · `grep -c 'ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)'` → **1** (the G-2 acceptance alphabet W7 adopts) ✔ · §6.D SUCCESSOR-FORMATION REGISTER present with the KF.W11 ×9 / KF.W12 ×6 / KF.W13 ×2 partition ✔. **The carriage is intact; the certification is not** — which is exactly why it looks bankable and must not be banked.

**Cure**: the RECONCILE seat re-runs `stat` after the true last write, re-issues §1's table and §9 clause 1 at the settled bytes, states what changed in `KF-W10.md` between 17:31:54 and 17:38:21 (+21 B) and re-verifies the receipts that quote it — or the round is re-declared OPEN. LAW C(4)(i) is a *proof*, not a formality: a mtime table that a `stat` refutes is the short-transcript class one altitude above the transcripts it convicts.

---

### D-2 · MAJOR — the R4-10(1) LAW-A **scope receipt**'s own verb tally does not sum to its own row count

`KF-W0.md` §*Scope receipts, round 4*, written to satisfy RULINGS-4 R4-10(1)'s *"the sweep's enumeration source is the SCOPE, never the example list"*:

> *"**LAW A · access column**: `§Bounds` = **19 rows**, access verbs enumerated at the column itself — `create` ×7 · `modify-append` ×7 · `modify-carve` ×1 · `OWNER'S HAND` ×4 · `regenerate-only` ×1 — and **zero rows carry `delete` / `repoint` / `shim` / `move`** … **19 rows enumerated, 2 censuses present, 0 owed.**"*

**7 + 7 + 1 + 4 + 1 = 20.** The receipt's partition over-counts its own denominator by one.

**Counted at the bytes this seat**, §Bounds table `:288`–`:306`, one row per `|`-row, access cell classified verbatim:

```
19 rows total
  create          ×7   :288 :289 :290 :291 :292 :293 :294
  modify-append   ×6   :295 :296 :297 :299 :300 :301      ← the receipt says 7
  modify-carve    ×1   :298
  OWNER'S HAND    ×4   :302 :303 :304 :305
  regenerate-only ×1   :306
  delete/repoint/shim/move  ×0                             ← the negative HOLDS
```

**The LAW-A conclusion survives** — the negative half re-verifies, so the wave's whole LAW-A surface really is the two carried module-motion acts, and both censuses are present and (checked below) reproduce. What fails is the **receipt**, and it fails in the exact arm the round named: **LAW D(3)** — *"a count asserted over an enumeration is stated **AT** the enumeration with its counting rule, and dependent cells point at the enumeration rather than re-issuing the numeral."* Here the count *is* at the enumeration and still does not close, which is worse than a stale dependent cell: the enumeration and its tally are one sentence apart.

This is `CLOSE-CERT.md` §8's **"short transcript"** class — *"a figure or coordinate list printed beside a pasted command that is not that command's output"* — fired a **fourth** time, in the round that named it, at the one paragraph commissioned to prove the sweep ran by SCOPE. The pass-4 register's closing line applies unchanged: *"this wave measures better than any file in the program and enumerates worse."*

**Cure**: restate the tally as `create ×7 · modify-append ×6 · modify-carve ×1 · OWNER'S HAND ×4 · regenerate-only ×1 = 19`, with the counting rule (*one row per `|`-row of the §Bounds table; the verb is the first access token of the Access cell*) written beside it, and the row coordinates pasted so it reproduces.

---

### D-3 · MINOR-rising-to-MAJOR — `L-M-9`, the one F-1 fold with no row in either fold table

E-1, stated as a defect. C-1.G's charter is explicit: *"the fold ids whose **CONTENT C-1 already carried** and whose **id was absent by bytes** … **Nothing is re-booked** — indexing is not curing; **it is what makes the fold's closure checkable.**"* Thirty-three of thirty-four F-1-folding records got a row. `kf-KeyframesStringControls` did not, and its single occurrence in this file (`grep -c 'L-M-9'` → 1) sits inside C-1's **RETIRED-probes** clause — so an `.e` seat greping the banked id of a **MAJOR** fold finds a *retired* disposition and a spent budget.

It is worth noting *why* the miss is structural rather than random: `kf-KeyframesStringControls`'s KF.W0 tokens sit at `:6` (the N-2 `backward` divergence), `:9` (a method-preamble instrument list), `:86` (the fold), `:161` (the retired probe) and `:167` (DISSENT 3's tree-motion law). Rounds 2–4 harvested `:6`, `:161` and `:167` into F-R7/N-2, C-1's retired-probe list and C-2's law respectively — **three of five**, all of them non-fold limbs. The fold itself is the limb the harvest walked past, which is the C-1.G mechanism (*a receipt that proves the thing next door*) reproduced on a record the wave otherwise mines heavily.

**Cure**: a **C-1.G row 23** — `L-M-9 ⟨kf-KeyframesStringControls:86⟩ | "L-M-9 — MAJOR · FOLD → census F-1 ≡ SCH-1 → KF.W0. NOT re-booked." | limb not covered by the fold: the two transitive critical-path edges are already at C-1; the clean-npm-ci probe is RETIRED there and is a different limb of the same row` — with the retired-probe attribution at C-1 disambiguated so the two limbs are separable by grep.

---

### D-4 · MINOR — `AGG-P1`, the probe that decided SCH-1, is absent from the wave that re-runs SCH-1

E-2, stated as a defect. The identity chain at C-1 is the wave's anti-rename instrument, and its completeness is what lets a seat grep any banked spelling and land on one cell. Five spellings are carried; the sixth — cited by **kf-AmigaScene**, the record the chain names as its own head, at both `:6` and `:98` — is not. Because §Bounds grants the CENSUS row *"modify-append (**SCH re-run** …)"* and G-0.6's GREEN requires every SCH row to carry a re-derived figure with its command, the executing seat will **overwrite an AGG-P1-dated cell** (`CENSUS-2026-08-03.md:32`/`:62`) whose id this spec never names.

Weight is honestly stated: **AGG-P1 is a probe id, not an obligation id**, and every consequence it carries is discharged at C-1/G-0.2/G-0.6. This is a provenance-handle gap, not a lost cure — which is why it is MINOR and not MAJOR.

**Cure**: one clause in C-1's identity chain — `≡ AGG-P1 (the census agglomerator probe that produced the SCH-1 override, CENSUS-2026-08-03.md:32/:62; the probe id, not a separate obligation)`.

---

### D-5 · MINOR — the EH family is routed to three homes, W0 first, and W0 books one of six

E-3, stated as a defect. The record hands W0 the **first** slot of a three-way routing over a six-member set and W0 books `EH-1` alone. The other five have zero hits. RULINGS-4 R4-1 disposes five of them at KF.W6 as **MOOT-ON-DELETE** — a real and correct ruling that lives entirely in a sibling. W0's §Excluded is the file's own mechanism for exactly this (*"Not carried by this wave, each with its reason. Silent drops are the defect class this program exists to kill; these are loud"*) and it already carries the neighbouring case — *"The header-ribbon migration decision … NO-WAVE-OWNER, SS-1/SS-2's"*. The family one row over gets no line.

**Cure**: a §Excluded row — `kf-EditorHeader EH-2 / EH-3 / EH-4 / EH-5 / EH-9 — the five non-W0 members of the six-live-escape bundle ⟨kf-EditorHeader.md:117⟩: MOOT-ON-DELETE at KF.W6 (RULINGS-4 R4-1) / NO-WAVE-OWNER per their own rows; W0 carries EH-1 alone (the two repo-qualified letters, C-14 + G-0.10)`.

---

### D-6 · MINOR — the §LAW-A "declared negative" asserts closure in the file's own voice, and its derivation points only one way

`:154`: *"**Declared negative, per LAW A's own reach**: **no other row in §Bounds deletes, repoints or shims a module.**"*

A universal over an enumerable set, in this file's own voice — **LAW B's exact ban** (*"No sentence in this file asserts, in its own voice, completeness / closure / zero-escape over an enumerable set"*). Round 4 derived it: `:232` reads *"The declared negative at the end of §LAW-A CENSUSES stands and is **now derived from the column** rather than from a reading."* But the pointer runs **`:232 → :154` only**. `:154` carries neither the enumeration, nor its counting rule, nor a back-reference, so the sentence a later seat reads *first* — inside the block that promulgates LAW A — is still the bare universal. Compare G-0.7, which the same file gets right: its command block rides **beside** the sentence, which the spec itself names as the lawful form.

Sharper: the enumeration `:154` silently leans on is the one **D-2** convicts. A universal whose only support is a tally that does not sum is not derived, it is asserted twice.

**Cure**: `:154` carries the access-column enumeration inline (corrected per D-2) or cites `§Scope receipts, round 4 · LAW A · access column` by §-heading, plus the LAW-B citation form for the carriage half.

---

## §3 — AXIS VERDICTS

| Axis | Verdict | Ground |
|---|---|---|
| **(1) ID-KEYED CENSUS (by record)** | **DEFECTIVE (marginally) — the best census state the wave has reached** | routed **100** · booked **97** · **escaped 3**. Every structural figure reproduces at the bytes: the discard sweep byte-exactly (237/50 · 64 · 173/44 · the six dropped-whole), the §Carry denominator by table-row scan (**22/13/22/6/15 = 78**, with round 3's 76 correctly named as round 3's), C-17.R's split (**10 S-9 + 5 S-10 rows = 14 live + 1 enumerated strike**) at four altitudes without a numeral drifting. **Round 4's three headline cures all landed and all reproduce**: `D-19` at C-1.R row 6 (42 records / 94 lines bare; **34 / 39** by the stated re-anchor predicate — both re-run here, both exact, and the 35-vs-34 delta against pass 4 is *declared* as a predicate-spelling difference, not absorbed); the S-10 re-derivation (**37/15 raw · 19/9 post-discard**, the substring rule `KF-ES-10` ×11 / `MISS-10` ×4 / `KF-SS-10` ×3 stated, and the 19 enumerated one line per `grep -n` hit — **3+3+4+1+1+3+1+1+2 = 19**, verified hit-for-hit); `KF-ET-27` + `KF-ES-20` adopted with both banked lines quoted byte-exact. What escapes is **membership at the margin**, and for the first time in five passes **no escape is a routing id that 35+ records ride** — the three are one fold-index omission (E-1), one probe-id alias (E-2) and one unpartitioned bundle (E-3). |
| **(2) ANCHOR + SUBJECT-IDENTITY · RECEIPT REALITY** | **DEFECTIVE at the CERTIFICATION; HOLDS at every receipt in the file** | **Every receipt this seat re-executed resolves at its anchor and its target mentions its subject.** G-0.1: 41/1/252/325/124, `merge-base a59d3a22`, neither an ancestor, **and the D-2 cure re-measures exactly** — `comm -13` → **225**, `comm -23` → **152**, `comm -12` → **100**, with the identities **252 = 152+100** and **325 = 225+100** closing and the 152 = 124 untracked + 28 tracked split holding ✔ · G-0.5: glass-ui `HEAD src/components/header-ribbon/` **empty**, `4bf53962^` **five files**, `EditorShell.vue:116` intact, `dist/header-ribbon.js` present ✔ · G-0.7: **every figure** — three entry points `:50/:51/:52`, `check` `:37` with no `vue-tsc`, `lint` `:44`, **9** gate files, **54 distinct names + 1 bare token**, **116 hits / 51 files**, per-directory **8/7/21/14/8**, `proof:demo-no-oversize` **16 lines / 13 files** demo-scoped against **121 / 70** repo-wide with **57** docs files, `proof:brittleness` ×3 non-docs sites + **68** docs files, KF-EST-1's **eight sites / six distinct names** enumerated exactly as pasted, D-13's **8 names / 16 citations** summing ✔ · G-0.9: `D-19` **42/94** and **34/39** ✔, C-19's `sort -u` → **32**, minus the two named anti-firings = **30**, partition **16+8+4+2 = 30** ✔ · G-0.10: the **two repo-qualified letters both exist** — value.js archive **2,878 B** and `origin/master:docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` ✔ — and `dist/gh-pages/assets/index-CL_QYCiO.css` mtime **Jul 16 09:11:10** ✔ · **LAW A Census 1 fully reproduces incl. round 4's D-5 cure**: the emit tree is `backward/{backward,color,index,walk}.ts` + **7 flat** + `format/` ×3 (the corrected split), the specifier arm returns **one** import outside `P` (`test/compile/value4-color-emit.test.ts:9`) plus the **two in-source docblock hits inside `P`** the cure added, and both previously-unresolved symbol hits land at their stated coordinates — `test/compile/compile-roundtrip.test.ts:42-44` → `"../../src/animation/compile"` and `src/animation/load-engine.ts:47` riding an import block that closes `} from "./public";` at **`:57`**, exactly as written ✔ · the **SUBJECT-IDENTITY sweep re-executes leaf for leaf**: `provide(TABS_EXTERNALLY_MANAGED_KEY, true)` at `demo/app/App.vue:176` with `git show origin/master:demo/App.vue` → *fatal: path does not exist* (the path-qualification is real) · `useKeyframesParsing.ts:97` = `() => animation.templateFrames.length,` · `KeyframeCardList.vue:11` = `:frame-start="startScalar(frames[i].start)"` · `CopyButton.vue:42` = `timingFunction: "easeInBounce",` · `EditorShell.vue:116` ✔ · **D-4's anchor cure landed**: the four `:447` cells (`:69` `:206` `:314` `:396`) now read *"§Sequencing, the NO-WAVE-OWNER packets row"* with `:651` parenthetical and declared non-load-bearing, and **`:651` IS that row** ✔. **Against all of that: `PASS-4/CLOSE-CERT.md` §1 and §9(1) are falsified at the tree** (D-1) — `KF-W10.md` 209,923 B / 17:38:21 against a certified 209,902 B / 17:31:54 and a certified nine-minute last-write margin. The drift class is dead **inside** the specs and alive **in the artifact that certifies it dead**. |
| **(3) M-25 DEPTH + LAW-A CENSUSES REPRODUCE** | **HOLDS** | Both LAW-A censuses re-executed at `81a56990` and both reproduce (above); the **declared negative's substance holds** — zero §Bounds rows carry `delete`/`repoint`/`shim`/`move`, verified by classifying all 19 access cells — though its *tally* fails (D-2) and its *voice* is unlawful (D-6). Carriage depth is genuine: C-1.F's thirteen riders are quoted verbatim against their banks; the five `KF.W1-DEP` component riders landed at F-1 (`useControlsKeyboardShortcuts.ts:1` · `ChannelControls.vue:219` · `ControlsPaneWrapper.vue:166` · the four toast utility classes · the one-class/eight-custom-property inventory) with the sending end cited **anchor-only** per LAW C(3) and `KF-W1.md` naming `C-1.F row F-1` back at `:214`/`:218` — a two-ended booking that resolves from both directions at current bytes ✔; the `KF-AV-28` supersession rider travels for both governed packets; `kf-SpringTrace D-15`'s no-re-book guard is record-qualified against kf-EditorHeader's `D-15/D-17`; the dissent surface (β-miss-1 at §Excluded, B18-26 split adoption, B18-27 unresolved-by-design, reader-B's vacated caveats preserved as dated record, C-20 as the named test case with **both** contradicting cells quoted) is intact. **The one M-25 gap this seat found is E-1** — a MAJOR fold's id indexed nowhere — and it is one, not the thirty-five of last round. |
| **(4) GATES BORN-RED with REACHABLE GREEN · LAW A · LAW B · in-grant closes** | **MIXED — no unpassable oracle, no self-voiced closure at a gate, one unlawful universal in a law block** | **Born-RED**: all ten baselines re-execute byte-exactly at `81a56990`; no gate is green-by-authoring; no witness inherited; the disqualified ref is read only where the schism is the gate's own subject and is declared at each use ✔. **Reachable GREEN**: G-0.7's roster-not-strike re-cut is satisfiable by writing `docs/**` only, and its falsifier (c) makes striking a demo byte **wave-fatal**, so the gate cannot be cheated in the direction that would open product source ✔; G-0.1's GREEN now **requires both enumerations** with `comm -13`/`comm -23` pasted and the non-nesting stated — the D-2-of-round-4 cure, correct at the bytes and correct in arithmetic ✔; G-0.6's *"one motion"* is reachable and its second falsifier's predicate is widened to *"the corpus OR the carry"*, which is the right widening (a falsifier scoped to one source stays green over the other) ✔; G-0.9's clause (vii) is keyed to C-1.R row 6, so the `.e` stamp finally has a key ✔. **No gate closes out of grant**: every GREEN is a `docs/**` write, an owner-hand act declared as the owner's, or the single in-bounds `npm run gh-pages`; `OG-KF1` is **NAMED here, RULED at KF.W10** and §Excluded says a seat that rules it here fails the wave ✔. **LAW A**: censuses reproduce; the inventory is honest (*"exactly two acts, both carried rather than performed"*). **LAW B**: the round-3/4 conversions hold and are non-trivial — §Carry's preamble cites `PASS-4/KF-W0-CHECK.md` **with its seven escapes named one by one**, C-17.R's heading and row 13 both cite the artifact *and say what it found*, and the struck *"There is no fourth or fifth S-10 claimant"* survives **only as a named strike inside the row that strikes it** ✔. **The one live violation is D-6** — `:154`'s bare universal — and it sits, as last round's did, inside the block that promulgates the law it breaks. |
| **(5) POSTURE** | **MIXED — five legs hold, the sixth is the certification** | **W4 head** ✔ — §Sequencing declares KF.W4 *"OUTBOUND — **may not open before this re-anchor**"*, G-0.7's falsifier states *"this gate must precede KF.W4 — a gate wave cannot be authored against an inventory that includes gates which do not exist"*, and the demo-typechecking arm is excluded to KF.W4 by name against the single banked no-SFC-typecheck identity. **W3 gated** ✔ — §Sequencing's V·π row names the three value.js-side carries (`C-L-2` residual · `R1`'s identity, *"banked, KF.W3-gated"* · the parser posture) so no KF wave books them. **O-21** ✔ — `grep -oE '\bO-[0-9]+\b' KF-W0.md` returns **only `O-8` and `O-11`**, the two obligation packets; the wave names no mint site and spends no `O-` id, and `KF-W10.md` carries `O-21` ×6 where R4-11 put it. **W11/W12/W13 per RULINGS-4 R4-8** ✔ **and coherent from both ends** — W0's R-15 row and §Sequencing packet row carry the canonical **17** with the `W11 ×9 · W12 ×6 · W13 ×2` partition and the *"homing is SS-1/SS-2's act; this wave supplies their ground"* boundary; W10 carries §6.D with `MINTED-UNAUTHORED` ×10 and the same 9+6+2 cargo; the two do not disagree. **W10's greens conditioned on artifacts that exist** ✔ — the roster W10 consumes is *stated at its final shape from W0's end* (*"**TEN S-9** … **and FOUR S-10** … plus row 13 retained as an enumerated strike: **fourteen LIVE rows in a fifteen-row table**"*) and that is exactly what C-17.R contains at the bytes (10 + 5 rows = 14 live + 1 strike); §6.D exists, the G-2 acceptance alphabet W7 emits into exists, and OP-5's re-condition rests on the register rather than on unauthored specs. **What fails is not a wave edge but the round's closing artifact** — `CLOSE-CERT.md`, the thing RULINGS-4 §END makes the pass-5 seat audit first, and the thing `KF-W0.md` cites as the condition of its own round having closed (D-1). |

---

## §4 — WHAT REPAIR ROUND 4 ACTUALLY FIXED (re-executed, not taken on the spec's word)

All seven §END directives were re-run at this seat. **Seven of seven landed; six landed cleanly.**

- **D-1 (`D-19` indexed)** — **the strongest repair of the round.** C-1.R row 6 exists, quotes three exemplars **by command** (`kf-RibbonBar:35` · `kf-EditorHeader:29` · `kf-TimelineTrack:155`), pastes both readings with its predicate (**42/94** bare · **34/39** re-anchor-sense — both re-run here, both exact), names the **eight** records carrying `D-19` in no re-anchor sense (re-derived here: `kf-ChannelOptions` · `kf-CubeScene` · `kf-KeyframesStringControls` · `kf-OrbitalDrag` · `kf-SquareInstrument` · `kf-SquareScene` · `kf-StartingStyleTarget` · `kf-TimelineCaret` — 42 − 34 = 8 ✔), declares the overload with three worked instances, keys **G-0.9's stamp** to the row, and **reaches the two records this file otherwise never names**. The 35-vs-34 delta against pass 4 is declared as a predicate-spelling difference, in the same honest form the file already uses for 167-vs-173. **Closed.**
- **D-2 (the 225 falsifier)** — closed and **arithmetically sound**, which is the part that matters: 225/152/100 pasted with `comm -13`/`comm -23`/`comm -12`, both identities closing, the 124-untracked + 28-tracked split stated, the struck `325 − 252 = 73` surviving only where named as struck, and the GREEN re-cut to require **both** enumerations at G-0.1's GREEN, N-1's cell and the L-18 rider. **Closed.**
- **D-3 (S-10 / `KF-ET-27`)** — closed at every altitude: the 37/15 and 19/9 readings pasted with the substring-discard rule, the 19 enumerated hit-for-hit and summing, `KF-ET-27` minted as the fourth S-10 claimant with `KF-ES-20` as its second leg (both banked lines quoted byte-exact and verified here at `kf-EasingTarget.md:69` / `kf-EasingSidebar.md:61`), the disposition *"the design-idioms census arm is KF.W5's"* travelling with the slot, the *"no fourth or fifth"* sentence struck for the LAW-B form, and the roster's new shape swept to **six** altitudes (§Scope 6 · C-17 · C-17.R heading/preamble/row/closing note · §Carry denominator · G-0.6's second falsifier · the §Sequencing KF.W5 **and** KF.W10 rows). **Closed.**
- **D-4 (`:447` → §-heading)** — closed; four cells re-anchored, `:651` verified to be the NO-WAVE-OWNER packets row, line numbers parenthetical and declared non-load-bearing. **Closed.**
- **D-5 (LAW-A symbol arm)** — closed and verified at the frontier: both hits resolved to their specifiers at their exact coordinates (`:42-44` → `"../../src/animation/compile"`; `:47` → the block closing `} from "./public";` at `:57`), *"10 flat siblings"* → **7 flat + `format/` ×3** (correct at the tree), and the docs-prose clause qualified for the two in-source docblock hits inside `P`. **Closed.**
- **D-6 (`KF-EST-1`)** — closed; the third R-8 residue family is named at C-12 and G-0.7 with all **eight** sites re-measured and their **six** distinct names listed, `TypingDots.vue:45/:51/:59` entered by name. Verified against the frontier hit-for-hit. **Closed.**
- **F-1 rider landing** — closed and **two-ended**: the five component riders ride C-1.F row F-1 verbatim, the sending end is cited anchor-only per LAW C(3), and `KF-W1.md` names `C-1.F row F-1` back. **Closed.**

**The file is again materially stronger than its prior state, and this time the improvement is in the axis that has failed four rounds running: membership.** Escapes fell 10 → 7 → **3**, and none of the three is a corpus-wide routing id. The two MAJOR defects this pass are of a different shape from every previous pass's: they are not carriage failures inside the spec but **arithmetic in a receipt** (D-2) and **a falsified proof in the artifact that certifies the round** (D-1).

---

## §5 — VERDICT

**DEFECTIVE.**

Two MAJOR defects and four MINOR, over three census escapes.

The pattern has changed, and the change is worth naming. For four rounds this wave's disease was **enumeration**: an id 60 % of the corpus rides reaching no table, a mint roster short by a claimant its own receipt denied existed, a fold index blind to the record it was built for. That disease is now nearly cured — 100 routed, 97 booked, three escapes, none of them structural, and every one of the ten gates' RED baselines re-executing byte-exactly at `81a56990` with not one anchor resolving to the wrong subject.

What survives is **arithmetic in the places built to prevent arithmetic**. `7+7+1+4+1 = 20` sits inside the paragraph RULINGS-4 commissioned to prove the LAW-A sweep ran over the scope rather than the example list (**D-2**). And `CLOSE-CERT.md` — LAW C(4)'s answer to U4-A, the artifact whose absence RULINGS-4 §END says means *the round did not close*, and which `KF-W0.md` cites in its own voice as the condition of its round having closed — certifies a last-write margin that a `stat` refutes by twenty-two seconds (**D-1**). Ten of eleven byte counts in its table are exact; the eleventh is `KF-W10.md`, and `KF-W10.md` is the file the certification exists to have written after.

**D-1 is the one that must not survive another round**, and it is not this wave's to cure alone: the RECONCILE seat re-runs `stat`, re-issues §1 and §9(1) at the settled bytes, accounts for the +21 B that landed in `KF-W10.md` after the certification, and re-verifies the receipts that quote it — or the round is declared OPEN and no repair in it is bankable. Everything W0 forward-references into W10 still resolves, so the cure is cheap; what is expensive is banking a round on a proof the tree contradicts.

**Ordered for repair**: **D-1** (RECONCILE re-runs and re-certifies at the settled bytes; the `KF-W10.md` delta accounted) · **D-2** (`modify-append ×6`; the tally sums to 19 with its counting rule and row coordinates beside it) · **D-3** (`L-M-9` → C-1.G row 23, with C-1's retired-probe attribution disambiguated) · **D-4** (`AGG-P1` into C-1's identity chain as the probe id it is) · **D-5** (a §Excluded row for the five non-W0 EH members, citing R4-1's MOOT-ON-DELETE) · **D-6** (`:154` carries its enumeration or cites it by §-heading, in LAW-B form).

*Register written 2026-08-28. Substrate `81a56990`, read-only. Census derived by record from the 58 adjudicated bytes plus the sole carry. Every command above was re-run at this seat. Nothing inherited.*
