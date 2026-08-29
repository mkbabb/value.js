# X·KF REPAIR ROUND 5 — CROSS-WAVE RULINGS

**Seat**: cross-wave rulings, repair round 5 · 2026-08-28
**Authority**: `PASS-5/UNION.md` (read whole, incl. the §6 register tail) · the 11 PASS-5 per-wave check files · `PASS-4/RULINGS-4.md` + the standing laws of rounds 1–4 (binding except where amended here) · `PASS-4/CLOSE-CERT.md` (audited whole — the falsified instrument this round re-seals) · the 11 wave specs at `docs/tranches/X/keyframes/waves/` · the 58-record corpus at `docs/tranches/V/megatranche/registry/adjudicated/` (`kf-EditorHeader.md` read whole at this seat) · READ-ONLY probes of keyframes.js at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (re-verified this seat: `git rev-parse origin/master` exact) · **the agent transcripts at `~/.claude/projects/…/subagents/workflows/wf_3b95205b-351/` (journal.jsonl + agent files, read-only — the U5-A forensics of record, executed this seat)** · `docs/tranches/X/COHESION.md` at `c863328e` (§0d verified landed this seat).
**Pass-5 verdict being repaired**: DEFECTIVE 11/11 · 105 defects · **1 BLOCKER · 0 CRITICAL · 7 HIGH** — head FLAT at 8, monotonicity LOST; the BLOCKER manufactured by R4-1's own cure; the round closed on a certification falsified by a twelfth spec write (+21 B / +22 s after CLOSE-CERT); 2 fresh hard escapes (S-1's sixth firing, both repair-shadows); 0 double-homings (first ever); 3 rulings partially unapplied (R4-10(1) · R4-10(2)+LAW C(4) · R4-8 clauses 2+4).
**Law** (unchanged, restated): every cross-wave defect gets exactly ONE owning cure a single wave can apply; per-wave repair seats execute these rulings verbatim; E-3 everywhere (specs are `planned`, repaired in place; registry corrections land as dated addenda under original ids, never edits; prior-pass conformance artifacts — `PASS-4/CLOSE-CERT.md` included — are NEVER edited); nothing here authorizes execution or opens product source. LAW A, LAW B, LAW C and LAW D remain in force except where LAW E amends LAW C's receipt mechanics for this and subsequent rounds. **Every frontier fact and every forensic fact cited below was re-derived by this seat before it was written**; receipts are pasted where the cures land.

**16 rulings** (2 laws + 13 cases + the per-wave residue ruling). Ruling → per-wave directive map at §END.

---

## LAW E · THE HASH-PROVEN CERT LAW — the certification is the last write BY CONSTRUCTION, and the proof is a hash, not an mtime

**Why now**: U5-A. Round 4's CLOSE-CERT asserted write-last and was falsified by its own author 22 seconds later (R5-2 states the attribution). An mtime table is a claim about the past; a hash table is a challenge to the future. The drift tail (~16 rows at 9 waves, R5-9) additionally proves LAW C(2)'s per-seat substrate stamps are themselves the modal drift surface: seats stamp clocks they cannot keep.

**Law, binding on repair round 5 and every subsequent round**:

1. **Write-last by construction.** The round-5 RECONCILE seat's write of **`PASS-5/CLOSE-CERT.md`** is its ABSOLUTELY LAST act: after the cert, it makes **no edit to any spec**. If a post-cert edit is found necessary, the cert is re-run WHOLE (hash table re-derived) before the seat ends — an out-of-date cert is never left standing.
2. **Hash-proven.** CLOSE-CERT-5's final section prints **`shasum -a 256` of all 11 spec files**, derived after the seat's last spec edit. **The pass-6 union seat re-hashes all 11 as its FIRST act; any mismatch is the round's own conviction** — the moved file is named, the round did not close, no repair banks.
3. **Hash-bracketed round.** This ruling pins the OPENING baseline (the table below, derived this seat at write time). CLOSE-CERT-5 reprints it beside the closing hashes so the round's entire write-set is provable: opening (this file) → closing (CLOSE-CERT-5) → pass-6 re-hash.

   | spec | opening mtime | bytes | sha256 (opening) |
   |---|---|--:|---|
   | KF-W0.md | 16:58:59 | 224,173 | `5f31c60909da91eab6ff2096e215576402d9015f51e7252f66708b0cb9588de1` |
   | KF-W1.md | 17:32:20 | 200,681 | `bc247de41a2817775f0b2a17f4c55d5cfcbb7b83ce9ceebfafe84952425bbe83` |
   | KF-W2.md | 17:30:52 | 286,177 | `43a8fc8d4a536571c915a04773331e76304c87a10ef4a50c069313477eafef73` |
   | KF-W3.md | 16:56:52 | 168,078 | `fb9841a0c78d587fe4116ea0138c35ee44548b3ecd998e9aff1a885061637b0e` |
   | KF-W4.md | 16:59:44 | 209,984 | `c699db8822d866ae3775246cb65c376cc5cf3c994512d9fdaf92aa764ec259e8` |
   | KF-W5.md | 17:32:57 | 252,821 | `112a5ee4786462737c863d9d6facd33545887dd505b367f884c776a2229916aa` |
   | KF-W6.md | 16:59:25 | 240,976 | `83509bf9ae171e68ef2e9132fa97c2a14d0f8a1aa733943e5dc2636d7af0a11e` |
   | KF-W7.md | 17:33:23 | 210,113 | `f638ae4ad69695aa2268aa50763f2710072b30726177b60f54846b89894865ca` |
   | KF-W8.md | 17:34:06 | 195,418 | `126426de8b4bdfa5b7b7d96219814ab3683b60b1b16e2a6b8ddbe090429273e2` |
   | KF-W9.md | 17:32:08 | 221,965 | `2d6a87356c231a797e2c40f03c629df506a658bc580d47d25c535f0a32328749` |
   | KF-W10.md | **17:38:21** | **209,923** | `086ea228f3db2715874f8fd7cebaa1e771efb8d5eee4d10c98d7253e5afe0c96` |

   (The KF-W10 row IS the U5-A state — the twelfth write's product, pinned as this round's honest starting point.)
4. **Anchor-only everywhere (amends LAW C(2) for per-wave seats).** Every same-round cross-wave receipt written by a per-wave seat is **anchor-only** — §-heading + row/gate id, no quoted sibling prose, no line numbers, no per-seat mtime stamps. **The RECONCILE seat alone** verifies every receipt at final bytes and appends the dated quote-by-command receipts. Per-seat substrate stamping — the mechanism behind 9 of the drift tail's 16 rows — is retired; a seat that needs a sibling's words asks the cert for them.
5. **Sweep roster widened, four classes + one regex.** The Reconcile sweep enumerates: (i) stage-1→stage-2; (ii) **stage-2→stage-2** — the class CLOSE-CERT-4 structurally missed (W9→W10; the pass-5 W9 seat verified all six anchors resolve — **that verification is carried as this round's baseline**, R5-8); (iii) stage-1↔stage-1; (iv) **SUBSTRATE receipts** — every quoted non-spec artifact (`COHESION.md` · `INBOX.md` · `FOLD-FORWARD.md` · `carry/KF-W6-CARRY.md`) gets a substrate-table row with mtime at close (the U5-C hole D-1/W10 named). The stable-anchor regex is widened to the **transcript spelling** (`grep -n '<pat>' <sib>.md → :NNN`) and to **non-`KF-Wn.md` filenames** (the CARRY class) — the two forms §7's sweep was blind to (U5-B).

---

## LAW F · THE SHADOW LAW (mechanism S) — every act that moves, strikes, drops, or mints a routing books its shadow in the same edit

**Why now**: U5-D, S-1's sixth firing with changed character — both pass-5 hard escapes are shadows of round-4 acts (R4-1's strike; D-P4-7's mint). Escapes no longer live in unseen corpus seams; they live downstream of the repair machinery.

**Law, binding program-wide**:

1. **The SHADOW line.** Every repair act whose verb strikes, moves, drops, re-keys, narrows, re-points or mints a row/routing (`MOOT-ON-*` · `terminalization at *` · `ADOPTED-BY-*` · `STRUCK` · `FOLDED-TO` · `access NARROWED` · `re-pointed`) carries, **in the same edit**, a mandatory **SHADOW line**: *"SHADOW: struck/minted set = {ids, each with its own banked anchor}; disposition per id; citing/terminus waves notified = {list}."* An act without its SHADOW line is an incomplete act — the pass-6 checks test for the line's presence at every such verb.
2. **The round ledger enumerates the set.** Each seat's repair-round section lists the round's struck/minted ids; the RECONCILE seat re-sweeps **every named terminus and every citing sibling** for every listed id before close (this is how W5:277/W7:77 would have been caught when W8's grant was struck, and how C-14 would have been caught when W6 minted its terminus).
3. **Per-row anchors, never per-carrier** (the W6 check's transferable finding, adopted as law): a disposition is only as sound as the anchor of the row it disposes — enumeration by co-id twin, host file, or fold-carrier is FORBIDDEN as the basis for a strike; each struck row's own banked anchor is re-read first.
4. **Retroactive first entries**: the EH-4/EH-5/EH-8 family (R5-1) and kf-ChannelControls `C-14` (R5-10) are the law's first two shadow bookings.

---

## R5-1 · BLOCKER (KF-W6, D-P5-1 + hard escape 1) — the R4-1 MOOT-ON-DELETE premise is STRUCK; EH-4 / EH-5 / EH-8 are RESTORED as LIVE rows at their banked anchors

**The premise re-verified false at the frontier BY THIS SEAT** (not inherited from the check). At `81a56990`:

```
$ git show 81a56990:demo/components/instrument/shell/EditorShell.vue | sed -n '44,47p'
44  <DarkModeToggle
45      title="Toggle dark mode"
46      class="aspect-square w-8 scale-on-hover"
47  />
$ git show 81a56990:demo/app/dock/MbabbMenu.vue | sed -n '19,21p'
19  <DarkModeToggle
20      title="Toggle dark mode"
21      class="aspect-square w-5"
22  />        (path at the frontier: demo/app/dock/MbabbMenu.vue — NOT demo/components/)
```

`EditorShell.vue:45` and `:46` carry the exact bytes the two MAJOR rows convict; the shortcuts `Button`'s `aspect-square w-8` sits at `EditorShell.vue:36` (EH-8's cluster mate); the third DarkModeToggle instance is `MbabbMenu.vue:20-21`. The bank was never ambiguous: `kf-EditorHeader.md:43` — *"live at EditorShell.vue:45"*; `:44` — *"live at EditorShell.vue:46"*; `:47` — *"the **live ribbon's** three-control cluster"*; and the record's verdict `:117` — *"the corpus's six live escapes (EH-1..EH-5, EH-9's SharePopover batch)… **are the real cures**."* R4-1's clause 2 rested on *"all three limbs are hosted in EditorHeader.vue"* — built from co-id twins, never from the rows' banked anchors, and it inverted the record's central finding: **the fork is dead precisely because its defects are live at the shell.** The ruling was defective; its execution was faithful. The defect is booked against THIS seat's lineage, not against the round-4 repair seat.

**Cure (exact), owner KF-W6**:

1. **Strike the premise** at `:417` (*"every EH-\* limb HOSTED IN EditorHeader.vue is MOOT-ON-DELETE"*) and at the `:420` struck row's rationale. The delete itself stays sound — the R4-1 census (A-11) was never the problem and is not re-opened.
2. **Restore the three rows LIVE, one row per anchor** (LAW F(3) — per-row, never per-co-id), spendable under the wave's existing grants (`EditorShell.vue` = §Bounds modify row `:66`; `MbabbMenu.vue` = `:74`):
   - **EH-4 · MAJOR** — banked `kf-EditorHeader.md:43`; anchor `EditorShell.vue:45` (`title="Toggle dark mode"` colliding with the producer's state-aware accessible name; cure = drop the `title`); **third instance `MbabbMenu.vue:20`**, booked on the same row as a second spend site.
   - **EH-5 · MAJOR** — banked `:44`; anchor `EditorShell.vue:46` (`aspect-square w-8`, inert aspect, 32×36 box); MbabbMenu's `w-5` variant (`:21`) recorded beside it; rendered box → KF.W9 SS-13 per the bank.
   - **EH-8 · MINOR** — banked `:47`; anchor = the live shell ribbon cluster (SharePopover trigger + shortcuts `Button` `EditorShell.vue:32-40`, its sizing utility at `:36` + DarkModeToggle `:44-47`); one sizing decision WITH EH-5 per the bank; rendered ladder → KF.W9.
3. **Re-scope MOOT-ON-DELETE to the limbs the delete actually moots**: (a) the **fork-hosted duplicates** of these bytes (`EditorHeader.vue:24-27` — the fork's own DarkModeToggle copy at `:25`/`:26`); (b) the record's own MOOT-ON-DELETE residue register (`kf-EditorHeader.md:106` item 5): *"L-M1's stranded-pointer dead-end · D-11's expand-spill severity · D-6/D-14's over-scene backdrop ratio · D-22's occupied-`#left` hover chain · D-9's dead-zone trace"* — fork-only, correctly moot. (c) **EH-9 and EH-10** leave the struck row too: each is restated as **DISCHARGED-BY-TWIN, verified at its carrier** — EH-9 via the SharePopover twins `SP-8`/`SP-10` (the pass-5 union verified they survive); EH-10 via the token-alignment family (F4 / kf-ChromeDock D-5). The repair seat runs `grep -n 'SP-8\|SP-10\|scale-hover' KF-W6.md` at repair time; **if either carrier is absent, that row is restored LIVE as well** — no id rests on an unverified twin.
4. **The SHADOW line** (LAW F(4), first entry): the re-cut strike carries *"SHADOW: struck set = {EH-4 ⟨EditorShell.vue:45⟩ · EH-5 ⟨:46⟩ · EH-8 ⟨shell cluster⟩ · EH-9 ⟨SP twins⟩ · EH-10 ⟨token family⟩}; EH-4/5/8 RESTORED-LIVE this round (RULINGS-5 R5-1); termini notified = KF.W0 §Excluded, KF.W9 (the guard row), KF.W10 G-2."*
5. **The W9 guard vindicated, recorded at both ends**: `KF-W9:192` carried *"the SIX live escapes … survive it — do not shoot the fork"* — W9 carried the guard; W6 shot the fork. W6's restored rows cite the guard; W9's guard row gains one dated line noting the restoration (its directive at §END).
6. **The R4-1 gate hardened**: its falsifier gains *"fails if the delete is read as mooting any row whose banked anchor lies outside `EditorHeader.vue`."*
7. **Reciprocal, owner KF-W0** (its D-5): §Excluded gains the EH-family lines naming the three homes (EH-4/5/8 → KF.W6 live; EH-2/3/12/13/14/15 → NO-WAVE-OWNER under G-2's terminal sweep; EH-1 → KF.W0's own row), so the family's routing is enumerable from the roster wave.

This closes the BLOCKER and hard escape 1 with the union's predicted three edits, plus the shadow discipline that prevents the third recurrence.

---

## R5-2 · HIGH (union U5-A) — THE CERT FORENSICS: the twelfth write is ATTRIBUTED, and the round-4 close is re-sealed under LAW E

**The attribution, established this seat from the transcripts** (read-only, `wf_3b95205b-351/`):

- `journal.jsonl` maps the workflow's 25 agents: 1 rulings seat → 11 round-4 repair seats (all transcripts end by 17:22) → **`agent-ad2b226022255fdfe` = the RECONCILE seat** (spawned 17:22, transcript ends 17:39, result = `CLOSE-CERT.md`) → 11 pass-5 check seats (spawned 17:39) → the pass-5 union seat (spawned 18:07).
- The RECONCILE transcript shows: four `Edit KF-W10.md` calls 21:31:21–21:31:54 Z (the four "fixed" its §3 table books) · `Write CLOSE-CERT.md` 21:36:35 Z · ten `Edit CLOSE-CERT.md` calls ending **21:37:59.297 Z** (= the cert's 17:37:59 mtime) · then **ONE more `Edit KF-W10.md` at 21:38:21.804 Z** — a rewording of its own §R-8-mirror receipt cell (the KF-W9 capture-receipt row): *"still \`…SS-13-CAPTURE-RECEIPT.md | create (.e, serial)\`"* → *"still naming \`…SS-13-CAPTURE-RECEIPT.md\` with access **create (\`.e\`, serial)**"* — **length delta exactly +21 bytes**, matching 209,902 → 209,923 B and 17:31:54 → 17:38:21 to the second.

**RULED: the unattributed twelfth write was the RECONCILE seat's own** — no intruder, no per-wave seat, no reconcile-marker added (it reworded an existing dated insertion, which is why the marker census stayed 16). The seat certified *"proof this seat wrote last"* and then kept editing: the write-last discipline was asserted, not constructed — precisely LAW E's justification. The edit itself was receipt-level, lawful in scope, benign in content; **the falsification is real anyway**, because a certification's exhibits do not get to be approximately true.

**Cure (exact)**:

1. **`PASS-4/CLOSE-CERT.md` is NOT edited** (E-3: prior-pass artifacts are immutable). This ruling is the attribution of record.
2. **The round-5 RECONCILE seat's CLOSE-CERT-5** carries a dated section **"THE ROUND-4 SEAL, RE-CERTIFIED"**: the round-4 write order restated with the twelfth write attributed (citing this ruling), the +21-byte edit quoted, and the round-4 close status ruled: **round 4's repairs BANK** (15 of 16 verified; the pass-5 checks re-verified the rest) **but its close certificate is VOID as proof-of-order; the lawful close of rounds 4 AND 5 is CLOSE-CERT-5**, hash-proven under LAW E.
3. The five specs that condition their own closure on CLOSE-CERT-4 (W0 D-1 · W1 D5-3 · W3 D-2 · W5 D-8 · W9 D5-1, and W8 D-10 / W10 D-2) **re-point their citation to CLOSE-CERT-5 + this ruling** — one-line edits, enumerated per wave at §END.

---

## R5-3 · HIGH (KF-W8 D-1) — G3's seven repoints: the bounds are GRANTED; the nine narrowed READ-ONLY reconciled with the two repoints inside them

The act is real and binding (G3: *"a 'one body' landing that leaves any of the seven on a deleted module is a broken tree"*); five of seven repoints had no lawful landing surface. **RULED: grant the rows — the act is right, the bounds were incomplete** (re-routing the repoints would orphan the gate's own falsifier).

**Cure (exact), owner KF-W8, one §Bounds block**:

1. **Three new modify-carve rows** (one-line repoint each, G3/A-9 the subject): `demo/components/instrument/timeline/composables/useTimelineBuild.ts` (`:8`) · `…/useTimelineOps.ts` (`:7`) · `…/utils/snapshotCapture.ts` (`:3`).
2. **The nine-tracked READ-ONLY row re-cut with two DECLARED EXCEPTIONS**: *"READ-ONLY (the nine) — access NARROWED at repair round 4 — EXCEPT the one-line keyframeSelector repoints at `timeline-undo.test.ts:6` and `value4-editor-boundary.test.ts:6` (G3's rows 6–7, RULINGS-5 R5-3); `resize-tracks.test.ts` remains the one cure site."* The narrowing and the repoints now state each other.
3. **Two carve re-anchors**: `useKeyframeOps.ts` row gains `:9` (the keyframeSelector import — `:1` is the css-text import, a different subject); `timelineEngine.ts` row re-cut `:1`/`:16`/`:17` (the import at `:16` was outside its own carve).
4. **The SHADOW line lands retroactively on the D-8 narrowing act** (LAW F): *"SHADOW: the round-4 narrowing struck modify-carve over nine files; two G3 repoints (`timeline-undo` · `value4-editor-boundary`) rode the struck grant — restored as declared exceptions, RULINGS-5 R5-3."*

---

## R5-4 · HIGH (KF-W8 D-2 + D-13) — G14's SOURCE is bounded: the KF-AV-24 projector gets its carve row

Round 4 granted the destination (`useDragScrub.ts`) and never the source. Re-derived at `81a56990`: the projector `progressFromPointerX` is `AnimationVisualizer.vue:101-106`; its call sites `:210`/`:215`; the rect reads `:104` and `:199`. None lies inside the four existing AV rows (`:45` · `:70-78` · `:79` · `:122-191`). **RULED: bound the source** — re-cutting the act to measure-and-declare is rejected; the destination grant already exists and the consolidation is the gate's whole point.

**Cure (exact), owner KF-W8**:

1. §Bounds gains a **fourth AV carve row**: `demo/components/playback/AnimationVisualizer.vue :101-106 + :199 + :210/:215 | modify-carve | KF-AV-24's projector + the ball rect read + both call sites — G14's SOURCE (the consolidation into the `useDragScrub.ts` seam)`, riding the KF-AV-28 swap rider like its three siblings.
2. **D-13's false bounding sentence re-cut** to the true relation: *"the two measured lines (`:104`/`:199`) lie inside the SOURCE row added at R5-4, not inside the three R4-5(a) rows."*
3. G14's falsifier is untouched — it was correct all along; only its reachability was.

---

## R5-5 · HIGH (KF-W8 D-3 + D-14) — R-1's four MUST-CARRY edits get their bounds; the KeyframeCard move/carve split is stated

**Cure (exact), owner KF-W8**: §Bounds gains **five rows** (one-line carves, R-1/S-2/G6 the subjects): `instrument/keyframes/KeyframeCard.vue :59` (the CopyButton repoint — a **separate row from the existing move row**, with the two-commit discipline stated per R-1's own *"the two acts never share a commit"*; cures D-14) · `KeyframesEditor.vue :116` · `scenes/easing/EasingTarget.vue :143` · `scenes/spring/StartingStyleTarget.vue :87` · `composables/useToolbarKeyboard.ts :25-28` (the S-2 docblock, verified live at the frontier this round). G6's falsifier now binds a landing every part of which is in-grant. **The scope law gains the third enumeration class this defect exposes** (R5-11): acts booked at §Sequencing/§Rows are swept against §Bounds coverage — the access column and the symbol column never see this class.

---

## R5-6 · HIGH (KF-W8 D-4) — G7's ordering half: KF.W6 becomes a declared predecessor, three ways, like G10

**Cure (exact)**: (1) owner KF-W8 — §State `Opens after` gains **KF.W6** (scoped: *"for G7's measurement only — the R4-1 atomic commit precedes this wave's G7 reading"*); (2) owner KF-W8 — the `→ KF.W6` cross-edge (`:410`) gains the execution-ordering sentence (*"W6's atomic commit lands first; G7 measures after"*); (3) owner KF-W6 — its `:514` G7-facts row gains the reciprocal execution-ordering word (it currently orders only the repair round's writes). The G10 template is now applied whole: declared at §State, at §Sequencing, and at the sibling.

---

## R5-7 · HIGH (KF-W8 D-5, + D-6 / D-8 / D-9) — the W8 arithmetic block: the AUDITED cell stops being a numeral and becomes a pointer

**D-5 (third consecutive falsification)**: the AUDITED figures are cured **by conversion, not by re-running once more**. The cell is re-cut to the S-10.1 pattern's terminal form: *"named-by-path and union figures live at the CURRENT pass's check artifact (`PASS-5/KF-W8-CHECK.md §1`: 15 named-by-path · union 26 · named-not-routed 8, the two D-15-introduced names `kf-ChannelOptions.md` / `kf-SequencePlayhead.md` enumerated); this cell CITES and never re-issues."* A cell that has been false at close three times under three re-cuts does not get a fourth numeral. **D-6**: the *"FIVE off-record occurrences"* → the artifact's true enumeration (*"13 records / ≥34 lines, per `PASS-5/KF-W8-CHECK.md §1.3`; all thirty-four resolve as non-escapes"*) — cite, don't count. **D-8**: the ACCESS-COLUMN receipt re-cut with its counting rule stated (the deep-import row = 1 row / 4 paths, declared) and **`useDragScrub.ts` added** to the changed-access enumeration (+ the R5-3/R5-4/R5-5 rows added at execution). **D-9**: the SUBJECT-IDENTITY receipt either enumerates the five deep-import symbols (`reverseCSSTime` · `serializeTimingFunction` · `camelCaseToHyphen` · `serializeCssValue` · `bumpLayoutEpoch`) or restates its scope as *"14 of the enumerated subset; the deep-import row's five symbols verified at `PASS-5/KF-W8-CHECK.md §2"*.

---

## R5-8 · HIGH (KF-W9 D5-1 + D5-2 + D5-3) — the W9→W10 forward receipts: the delegation becomes a verification, and the class enters the sweep roster

**RULED**: (1) The **stage-2→stage-2 class is ADDED to the Reconcile sweep roster** (LAW E(5)(ii)) — CLOSE-CERT-4's §7 scope sentence (*"all stage-1 → stage-2"*) is the structural hole; the class the round could not see is now a named class. (2) **The pass-5 W9 seat's verification is carried as the baseline**: all six anchors resolve (§State Opens-after · OP-4 · PACKET-FIRST · §D cross-edge · §B-1 · §B-3) — CLOSE-CERT-5 re-verifies from that baseline rather than from zero.

**Cure (exact), owner KF-W9**: (a) both delegation cells (`:74` · `:250`) replaced by **this pass's verification by command** (the six coordinates from `PASS-5/KF-W9-CHECK.md §2`, each with its `grep -n`), plus one line: *"CLOSE-CERT-4 covered this wave's BACKWARD receipts only; the forward six were verified by `PASS-5/KF-W9-CHECK.md` and are re-verified by CLOSE-CERT-5 under LAW E(5)(ii)."* (b) **D5-3**: the anchors enumerated ONCE, at S-10 — **six** (PACKET-FIRST in; §B-1/§B-3 counted separately; counting rule stated) — and the §Bounds cell points at the enumeration, never re-issues a numeral. (c) **D5-1**: the closure-conditioning sentence re-pointed to CLOSE-CERT-5 + R5-2.

---

## R5-9 · THE DRIFT TAIL — 16 rows at 9 seats, each with a citation-level cure; the class is retired by LAW E(4), and these are its terminal members

Counting rule: one row = one convicted stale receipt/stamp cluster as filed; the union's "~12" counted fold-groups. Under LAW E(4) per-seat stamps retire, so most cures REDUCE receipts to anchors rather than refreshing clocks a seat cannot keep.

| # | member | owner | citation-level cure |
|---|---|---|---|
| 1 | W1 D5-2 — freshest-artifact citation split PASS-4/PASS-3 at five sites | KF-W1 | one artifact of record (`PASS-5/KF-W1-CHECK.md`), all five sites re-pointed in one sweep; the class made greppable (`grep -n 'PASS-[0-9]/KF-W1-CHECK'`) and added to the wave's scope receipt |
| 2 | W1 D5-4 — three stale KF-W10 figures, one bullet unstamped | KF-W1 | reduce to anchors (LAW E(4)); where a figure must ride, it rides the CLOSE-CERT-5 receipt, never a per-seat stamp |
| 3 | W1 D5-5 — three truncated stage-2 quotations under an anchors-only posture | KF-W1 | reduce to anchors per the file's own declaration; any retained prose marked paraphrase with ellipses (LAW D(1)) |
| 4 | W1 D5-6 — §13 substrate table stamps pre-round-4 bytes ×10 | KF-W1 | the table is re-cut to name **CLOSE-CERT-5's substrate table** as the stamp authority; local clocks struck |
| 5 | W1 D5-7 — the dated KF-AV-28 reading stale on seven of ten | KF-W1 | re-run at final bytes or drop-keep-citation (the R4-11 D4-6 idiom), one edit |
| 6 | W3 D-3 — two artifacts of record for one carriage claim | KF-W3 | one artifact (the freshest), both sites |
| 7 | W4 D-2 — `KF-W0.md:588` dead AND off-target | KF-W4 | re-anchor §-heading + row id at W0's final bytes; coordinate retired, not re-issued |
| 8 | W4 D-6 — KF-W6 manifest receipt at `:226`, cited `:145-146` | KF-W4 | coordinate retired; anchor on the manifest's §-heading |
| 9 | W5 D-1 — §Disjointness states W8's access as the grant W8 STRUCK | KF-W5 | the cell reduced to **anchor-only** (W8 §Bounds, the nine-tracked row) — a stage-1 seat cannot quote a stage-2 sibling's final prose (LAW C(3)/LAW E(4)); the "one genuine WRITE overlap" derivation re-keyed to the anchor |
| 10 | W5 D-2 — `KAD-1 12/16` vs final `12/20`; fifteen cells handed to a seat that re-measured one | KF-W5 | the fifteen-cell block re-keyed to **counts-at-CLOSE-CERT-5** (the reconcile re-measures all fifteen under LAW E(5)); the stale 16 struck |
| 11 | W5 D-11 — three stale substrate stamps (the D-1/D-2 mechanism) | KF-W5 | stamps struck; anchors remain (LAW E(4)) |
| 12 | W6 D-P5-4 — the W6↔W10 seam contradictory at final bytes | **KF-W10** (cure) + KF-W6 (reciprocal) | W10 re-runs its `:202` receipt at W6/W9's final bytes (**10 and 22 · 1 and 1**, measured by the union seat) and restates the cell's verdict: the far end NOW car­ries the subject — the seam is two-ended and agreeing; W6's end keeps the reciprocal as an anchor it does not paraphrase |
| 13 | W7 D1 (+D12) — the struck-grant citation ×3; the LAW-C disclosure mislabels the vehicle as an anchor | KF-W7 | the three cites reduced to anchor-only (W8 §Bounds row); the §LAW-C block's classification corrected (a forward QUOTATION, not an anchor) |
| 14 | W7 D2 — the reconcile insertion inside W7 names a non-final W10 substrate | RECONCILE | CLOSE-CERT-5 re-stamps its predecessor's insertion (its own product class; LAW E(1) note) |
| 15 | W8 D-7 — three stale stamps in the receipt LEDGER, two labelled "final", in the reconcile seat's last-written file | KF-W8 + RECONCILE | the ledger's stamp column re-keyed to CLOSE-CERT-5 (*"stamps live at the cert"*); the three rows corrected there |
| 16 | W9 D5-6 — §F's class verdict homed at PASS-3 while four sibling cells moved to PASS-4 | KF-W9 | `:161` re-pointed to the freshest census artifact (`PASS-5/KF-W9-CHECK.md §1`, 181/181/0); the freshness class made greppable and added to the scope receipt |

(W10 D-1 — the substrate-layer member — is cured at R5-12; U5-A/U5-B — the reconcile-product members — at R5-2/LAW E(5).)

---

## R5-10 · THE TWO FRESH ESCAPES — both booked; mechanism D gains its CLOSE-CLOCK arm

1. **The EH-4/EH-5/EH-8 family** → booked at **R5-1** (owner KF-W6; shadow line landed; W0 reciprocal; W9 guard vindicated).
2. **kf-ChannelControls `C-14`** → **owner KF-W10**: §2b.1's mechanism-D roster gains the row — *"`C-14` ⟨kf-ChannelControls.md:70 — the global `[data-state="active"][role="tabpanel"]` enter animation re-firing over the force-mounted Monaco subtree; MINOR; cost → SS-13⟩ · routed here by `KF-W6.md` §Excluded (D-P4-7, round 4): NO-WAVE-OWNER, **terminalized at this close if still unhomed** — terminal verb per G-2's alphabet (carried to the next formation boundary's ledger), RULINGS-5 R5-10"* — six items and six answers **inside the census**, per the file's own §2b.1 discipline; the G-2 blanket defence stays rejected exactly as the file itself rejected it.
3. **Mechanism D's CLOSE-CLOCK arm, adopted program-wide**: mechanism D's census is re-run **at close over the SIBLINGS' CURRENT BYTES** — `grep -nE 'KF\.W10' waves/KF-W*.md` diffed against §2b's mechanism-D roster; **any sibling terminus verb not in the roster is a hard escape on sight**. Three consecutive rounds the escape was a sibling's new mechanism-D row invisible to a census enumerated at the prior round's clock; the enumeration source is now the bytes, not the roster. (LAW F(2)'s terminus re-sweep is the same instrument from the acting side; this arm is the terminus side.)

---

## R5-11 · THE SCOPE LAW, SIXTH ISSUE (R4-10(1) lineage) — RECEIPT-ARITHMETIC-FIRST: a scope receipt carries its enumeration AND its counting rule AT the receipt, and every check tests the receipt's arithmetic before its scope

**The U5-E instrument, adopted as binding mechanism** (the law's fifth consecutive partial round failed INSIDE its own receipts at eight seats):

1. Every scope receipt states, at the receipt: the enumeration (or a pointer to the one enumeration), the counting rule, and the command. A receipt whose own arithmetic does not reproduce is a defect REGARDLESS of the scope's truth.
2. The pass-6 checks test receipt arithmetic before testing scope (the checks' first act per receipt).
3. **Known members, cured this round at their seats** (each lands at §END): W0 D-2 (the verb tally restated at the enumeration — 19 rows, rule stated) · W1 D5-2's remaining 3-of-6 LAW-B conversions · W4 D-1 (the 17-site enumeration's count corrected to 17) + D-7 (row 29's summary re-summed) · W5 D-5 (the "34 pairs" enumerated or the claim re-scoped to the enumerable; the nine symbol×file zeros DECLARED as negative witnesses like `withReducedMotion`'s) + D-13 (the negative universal → LAW-B cited form) · W6 D-P5-2 (the four omitted gates — `G-W6-6/7/11/12`, exactly the four inherited witnesses — enumerated, or the receipt restated `11 of 15` with the four named as the outstanding class) · W7 D3 (the census figure re-derived from the stated rule at the artifact) + D6 (the falsified universal → LAW-B form) · W8 D-8/D-9 (per R5-7) · W9 D5-4 (the `KF.W3` figures restated `3 file-wide · 1 body · 2 ledger` at all three cells, the third cell pointing at the first).

---

## R5-12 · R4-8 CLAUSES 2 + 4, CLOSED — §3.6 re-cut; the COHESION boundary line is LANDED (§0d, `c863328e`) and the §0c collision is re-pointed

**Verified this seat**: `git log c863328e` → *"docs(X): COHESION §0d — KF.W11/12/13 minted-unauthored boundary line landed (the W10 seat's upward declaration); mechanism F program-wide"*; `COHESION.md:185` = **§0d ADDENDUM 2026-08-28** carrying the KF.W11/W12/W13 boundary line at `:188`. **R4-8 clause 4 is DISCHARGED.**

**Cure (exact), owner KF-W10**:

1. **Clause 2 (W10 D-4)**: `:304` §3.6 unit `.f` re-cut — *"advance **every AUTHORED X·KF wave's** four-verb row (the eleven specs on disk, W0–W9 + this file) IMPLEMENTED → VERIFIED in one act (R-A)"* — the one imperative that performs the stamp now carries the ruled quantifier.
2. **Clause 4 (W10 D-1, the five-site §0c re-cut)**: §6.C-E **cites COHESION §0d as the landed boundary line** (a stage-2 directive — the upward declaration is DISCHARGED, the citation is now historical fact, not a request). The **ownership half remains open and is re-pointed**: the five sites naming *"§0c"* as the ownership vehicle (header `:5` · scope block `:9` · OP-6 `:68` · §6.C-E `:523-529` · dissent 2 `:613`) are re-cut to *"**a dated COHESION addendum mirroring §0b (§0e or a successor letter — §0c and §0d are occupied)**"*; the SPECIFIED-withhold condition restated over that form so a resolving seat can no longer find a landed-but-unrelated section and read the precondition satisfied. Ownership assignment stays the root session's act — the register records, it does not assign (dissent 2 preserved, now correctly premised).
3. **The substrate hole named by D-1 is closed by LAW E(5)(iv)** — COHESION/INBOX/FOLD-FORWARD/CARRY enter the reconcile substrate table.

---

## R5-13 · THE EMPHASIS IDIOM — ruled once, program-wide (W3 D-5, INFO)

Markdown emphasis (`**…**`, `*…*`) added inside a quotation labelled *verbatim* is an ALTERATION under LAW D(1). **RULED**: a verbatim quotation may carry added emphasis ONLY with the disclosure **"(emphasis added)"** at the quote; undisclosed added emphasis reclassifies the quote as a paraphrase, with LAW D's paraphrase duties. Existing instances: disclosed at the citing seat's next touch (W3's member at §END); no program-wide retro-sweep is commissioned — the rule governs from this round forward.

---

## R5-14 · THE REMAINDER — per-wave residue directives (executed verbatim from each check's register)

**KF-W0** — D-2 (the LAW-A scope receipt's verb tally restated AT the 19-row enumeration with its counting rule — R5-11) · D-3 (`L-M-9` given its fold-table row at C-1.R: both riders already carried verbatim at C-1; the row makes the id resolve to the carriage, not to the spent-probe disposition) · D-4 (`AGG-P1` named at the SCH-1 cell it decided — one line, *"the census-probe id, 0 program-wide, cited by the record chain's head"*) · D-5 (the EH §Excluded lines — R5-1(7)) · D-6 (the §LAW-A derived negative converted to LAW-B cited form) · D-1 (citation → CLOSE-CERT-5 + R5-2). **Writes FIRST (LAW C stage 1).**

**KF-W1** — D5-1 (the bare-`KF.W1` zero corrected: `KF-W7.md:343` carries 1, NEW this round — restate as a count with the named non-edge, the D4-5 idiom) · drift rows 1–5 (R5-9) · D5-3 (→ CLOSE-CERT-5) · D5-9/D5-10 (two INFO figures marked as dated observations, one line each).

**KF-W2** — D-1 (`KF-ES-13`/`L-i2`: the false read reason struck — the record HAS a failure posture; the exclusion re-stated on the true ground with the obligation mass already measured at the BH-relay row cited by id) · D-2 (G-W2-5's minted superlative retired against `K-11` ⟨kf-KeyframesAddDialog:107⟩; K-11 booked as the refuting datum) · D-3 (the D-16 span re-cut CORRECTLY: the span endpoints named BY CONTENT — the dead body's first line and `return s;`'s line — such that the surviving export signature is excluded and `:146` included; a seat executing the row must not be able to delete the survivor) · D-4 (`KF-CO-10`'s §Excluded clause written, or the phantom per-cell-rule citation dropped) · D-5 (A-1's provenance claim corrected against the bank) · D-6 (E3 `KF-ET-32`: the read reason written, naming the W3 (C-3 fold) and W5 (B-12 + G-CSSIDENT third leg) landings) · D-7 (the two RE-VERIFIED stamps → anchors; stamps live at CLOSE-CERT-5) · tail D-8..D-16 (A-1's line-number convention unified · E6-E9 entered in the census-of-record as verified negatives with read reasons · O-21 named by id beside the register vehicle · G-W2-1's certificate sentence → LAW-B form · the five missing read reasons written · Y2's trimmed bank clause completed).

**KF-W3** — D-1 (the (R-i) five-position receipt re-run and corrected in all five — R5-11's class) · D-2 (→ CLOSE-CERT-5) · D-3 (drift row 6) · D-4 (the round-1 correction applied at §Provenance's second site) · D-5 (the emphasis disclosure — R5-13).

**KF-W4** — D-1 (the easing-serialize census: **17** stated at the enumeration) · D-2 + D-6 (drift rows 7–8) · D-3 (the → KF.W8 cross-edge restated against W8's actual gate text, anchor-only) · D-4 (`KF-ES-16`'s row-1 booking removed per the cure's own predicate; rows 2–3 stand) · D-5 (G-KFW4-11's pasted command replaced by the falsifier's oracle: the `@src/` specifier set diffed for EQUALITY against the pinned seven — `git grep -n '@src/' -- demo/ | <normalize> | diff - pinned-seven.txt`, exits 0 iff equal; GREEN now reachable in-bounds) · D-7 + D-8 (row 29's summary re-summed; the dropped `.map()` restored to the transcription) · D-9 (the quote coordinate removed from the grep output — printed as the quote's own cite, the R-4 class) · D-10 (the `KF-CO-33` split declared at the residue table, not only inside the gate).

**KF-W5** — drift rows 9–11 (R5-9) · D-3 (the view-transition command's output printed whole — 6 lines — with the two barrel lines resolved by content (`./view-transition`); the figure 5 kept by resolution, the command now producing it) · D-4 (G-CSSIDENT's promised re-cut LANDED at `:394`: `debounce`/`convertPixelsToCh` struck from RED per Act 4/B-11's own law; the C-8 four re-scoped to declared relocations) · D-5 (R5-11: the 34 pairs enumerated or re-scoped; the nine zeros declared) · D-6 + D-7 (the in-file ⟨RECONCILE⟩ block re-scoped to the four receipts it actually swept, superseded by CLOSE-CERT-5; the minted closure sentence struck → LAW-B form) · D-8 (→ CLOSE-CERT-5) · tail D-9/D-10/D-12/D-13 (the six CARRY cites declared as dated-frozen receipts under LAW E(5)'s widened regex; the two short transcripts completed; `10`→`11` beside the paste; the negative universal → LAW-B form).

**KF-W6** — R5-1 (the BLOCKER) · D-P5-2 (R5-11: the four gates enumerated or `11 of 15` stated) · D-P5-3 (`demo/scenes/sequence/SequenceTarget.vue` added to the sequence carve row — rows D-16/L-13/C-6 already route here — OR the one site declared out-of-bounds and G-W6-4's green re-cut `7 of 8 + one declared residue`) · D-P5-4 (the reciprocal held as anchor-without-paraphrase; cure at W10, R5-9 row 12) · D-P5-5 (the ID-ALIASES trail rebuilt BY COMMAND over the 58 records — the eight missing co-ids (`D-M5` · `D-28` · `L-B-2` · `C:C-8` · `C-M6` · `D-26` · `D-30` · `C-m1`) entered at their host rows; `D:D-9`/`L:D-11` record-qualified against the KfPillTabs collision) · D-P5-6 (the two declared quotations stated as LAW C(3) exceptions with frozen sources named (RULINGS-4 §R4-3; W10 §3.1 .a), or reduced to anchors) · D-P5-7/8 (the gate-table order note; the figure diff recorded — no act).

**KF-W7** — D1 + D12 (drift row 13) · D2 (drift row 14 — RECONCILE's) · D3 (the census figure re-derived from the stated rule, at the artifact — R5-11) · D4 (the 4-line transcript printed whole) · D5 (the truncated fifth dissent restored with its ellipsis and the elided sentence's dissent preserved) · D6 (the universal → LAW-B form) · D7 (the fold-dedupe enumeration's missing line added — 17, not 16, per its own §1c) · D8 (the routing-summary-tail discriminator stated) · D9 (the 2-line transcript completed) · D10 (the two remaining edges re-cut to cite the §6.D register rows, not unauthored specs) · D11 (the `sed` fragments marked as fragments).

**KF-W8** — R5-3 · R5-4 · R5-5 · R5-6 · R5-7 (D-5/D-6/D-8/D-9) · D-7 (drift row 15) · D-10 (→ CLOSE-CERT-5 + R5-2) · D-11 (the G11 carve re-cut `:57-67`, matching the falsifier's extent) · D-12 (the DH-3 four-party declaration's W8 line restated in the narrowed access word: *"READ-ONLY (the nine) + `resize-tracks.test.ts` the one cure site + the two G3 exceptions (R5-3) + 4 creates"*) · D-14 (per R5-5) · D-15 (the L-18 blanket restated over the suite as it now is: the command count re-derived after R5-3..R5-6 land, at the enumeration).

**KF-W9** — R5-8 (D5-1/D5-2/D5-3) · D5-4 (R5-11: `3 · 1 · 2` at all three cells, one enumeration) · D5-5 (the four-docblock sentence restated per the check's cure: three name the pre-carve path as the CARVE'S ORIGIN — correct as written — and one names the live `./play-lifecycle` specifier; no stale prose exists; the carve left no prose debt) · D5-6 (drift row 16) · D5-7 (the NOT-re-derived row re-scoped: the five re-executed witnesses named (+ this pass's six); gates `-2/-3/-4/-5/-7/-12`'s witnesses stated documentary, re-verify at wave-open) · D5-8 (both aliases spelled at their carrying rows: `§G ⟨kf-ChromeDock D-6 / m-6⟩` record-qualified; `§E KF-ET-14 / D-M-6`) · plus the R5-1(5) guard-vindication line at `:192`.

**KF-W10** — R5-10 (the C-14 register row + the mechanism-D close-clock arm adopted at §2b.1) · R5-12 (the §0c five-site re-cut + the §6.C-E §0d citation + §3.6's re-cut) · D-2 (the cert row re-pointed: CLOSE-CERT-5 + the R5-2 attribution cited as the discharge of its own D-2) · D-5 (G-4's field figures re-run at write time per the gate's own standing instruction — the class row restated at the measured 89/64 · 21/13 · live-spec 25 — and the *"reconciled by subtraction"* sentence struck: a figure derived by argument where a command was available) · D-6 (the five transcript-form W1 coordinates re-verified at W1's FINAL bytes by CLOSE-CERT-5 under the widened regex — they resolve (union-verified); the cell states the widened-class coverage; **the 5-of-9 short transcript (W1 D5-8) printed whole**) · D-P5-4's seam cell re-run (R5-9 row 12: `10 and 22 · 1 and 1`, verdict restated) · D-7 (INFO: the 12-records/15-hits figure recorded as the dated correction of its cited denominator). **Writes LAST of the per-wave seats (LAW C stage 2).**

---

## §END · PER-WAVE DIRECTIVE MAP (what each round-5 repair seat executes, verbatim, from the rulings above)

| seat | n | directives |
|---|--:|---|
| **KF-W0** | 6 | D-2 (verb tally at enumeration) · D-3 (L-M-9 row) · D-4 (AGG-P1 named) · D-5 (EH §Excluded reciprocal, R5-1(7)) · D-6 (LAW-B form) · D-1 (→ CLOSE-CERT-5). **Writes FIRST.** |
| **KF-W1** | 7 | D5-1 (the falsified zero) · D5-2 (five-site re-point + class) · D5-4 (anchors, not stamps) · D5-5 (anchors/paraphrase) · D5-6 (substrate table → cert) · D5-7 (re-run-or-drop) · D5-3 + D5-9/D5-10 (cert cite + two dated notes) |
| **KF-W2** | 8 | D-1 (false read reason) · D-2 (superlative retired vs K-11) · D-3 (span re-cut by content) · D-4 (KF-CO-10 clause) · D-5 (A-1 provenance) · D-6 (E3 read reason) · D-7 (stamps → cert) · D-8..D-16 tail |
| **KF-W3** | 5 | D-1 (five positions re-run) · D-2 (→ CLOSE-CERT-5) · D-3 (one artifact) · D-4 (§Provenance second site) · D-5 (emphasis disclosure, R5-13) |
| **KF-W4** | 8 | D-1 (17 at enumeration) · D-2 (W0 anchor) · D-3 (W8 edge anchor-only) · D-4 (row-1 booking cut) · D-5 (G-KFW4-11 equality oracle) · D-6 (W6 anchor) · D-7+D-8 (sums + `.map()`) · D-9+D-10 (quote coordinate; KF-CO-33 split) |
| **KF-W5** | 8 | D-1 (anchor-only Disjointness) · D-2 (fifteen cells → cert) · D-11 (stamps struck) · D-3 (6-line transcript) · D-4 (G-CSSIDENT re-cut lands) · D-5 (34 pairs + nine zeros) · D-6+D-7 (reconcile block re-scope; closure sentence) · D-8..D-13 tail |
| **KF-W6** | 7 | **R5-1 (BLOCKER: premise struck · EH-4/5/8 restored per-anchor · MOOT re-scoped · SHADOW line · gate hardened)** · D-P5-2 (four gates) · D-P5-3 (SequenceTarget.vue) · D-P5-4 (reciprocal end) · D-P5-5 (trail by command, ×8 + 2 qualified) · D-P5-6 (declared exceptions or anchors) · D-P5-7/8 (notes) |
| **KF-W7** | 7 | D1+D12 (anchor-only + vehicle relabel) · D3 (figure from rule) · D4+D9 (transcripts whole) · D5 (fifth dissent restored) · D6 (LAW-B form) · D7+D8+D11 (one-liners) · D10 (edges → §6.D register) |
| **KF-W8** | 8 | R5-3 (G3 bounds: 3 rows + 2 exceptions + 2 re-anchors + SHADOW) · R5-4 (G14 source row + D-13) · R5-5 (R-1 five rows + D-14) · R5-6 (G7 ordering, three ways) · R5-7 (AUDITED→pointer + D-6/D-8/D-9) · D-7 (ledger → cert) · D-11+D-12+D-15 (carve extent; access word; blanket) · D-10 (→ CLOSE-CERT-5) |
| **KF-W9** | 8 | R5-8(a) (delegation → verification, six anchors by command) · R5-8(b) (one enumeration of six, D5-3) · R5-8(c)+D5-1 (→ CLOSE-CERT-5) · D5-4 (3·1·2 ×3 cells) · D5-5 (docblock sentence) · D5-6 (§F re-point) · D5-7 (witness warrant re-scoped) · D5-8 + the R5-1(5) guard line |
| **KF-W10** | 9 | R5-10 (C-14 row) · R5-10(3) (mechanism-D close-clock arm) · R5-12(2) (§0c five-site re-cut) · R5-12 (§6.C-E cites §0d — DISCHARGED) · R5-12(1) (§3.6 AUTHORED quantifier) · D-2 (cert row + attribution) · D-5 (G-4 re-run; subtraction sentence struck) · D-6 (five cites verified + the 9-hit transcript whole) · D-P5-4 seam cell re-run (10/22 · 1/1). **Writes LAST of the per-wave seats.** |
| **RECONCILE** | 1 | **LAW E entire**: run AFTER the last per-wave write; verify EVERY receipt in the four classes (incl. stage-2→stage-2 from the R5-8 baseline, the substrate table, the widened regex); re-stamp its predecessor's insertions (drift rows 14–15); WRITE `PASS-5/CLOSE-CERT.md` with the ROUND-4 SEAL section (R5-2) and the **sha256 closing table beside this ruling's opening table — its ABSOLUTELY LAST act, no spec edit after; the pass-6 union seat re-hashes all 11 as its first act, and any mismatch is the round's own conviction.** |

**Frontier of record for every keyframes-side re-measurement: `origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (re-verified this seat; local worktree remains DISQUALIFIED per R3-2). Value-side re-measurements bind to current tree bytes under LAW C's stage order as amended by LAW E.

*Cross-wave rulings seat, repair round 5. Sole write = this file. Nothing here stamps any wave; E-3 holds — `PASS-4/CLOSE-CERT.md` and all prior-pass artifacts are immutable (the attribution of its falsifier lives HERE, not in an edit to it); registry corrections land as dated addenda under original ids; the kf-EditorHeader record needed and receives NO addendum — it was right all along, and round 5's central act is making the spec say what the record said. The EditorShell/MbabbMenu anchors (R5-1), the twelfth-write attribution (R5-2), the G3/G14/R-1 coordinates (R5-3..R5-5), the COHESION §0d landing (R5-12), and the opening hash table (LAW E) were each re-derived by this seat — from the frontier, the transcripts at `wf_3b95205b-351/`, and the tree — before the rulings were written.*
