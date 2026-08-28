# KF-W10 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W10.md` (56,093 B)
**Corpus authority**: the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (+ `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` for W6 only)
**Secondary routing authorities the spec answers to**: kf `origin/master:docs/tranches/V/FOLD-FORWARD.md` §A/§B · `formation/keyframes/CENSUS-2026-08-03.md:326` · `audit/codex-provenance/intakes/lane-keyframes-b10-b21.md:247` · kf `origin/master:docs/tranches/V/OWNER-DECISIONS.md`
**Method**: read-only. Zero writes outside this file. Every receipt below is a re-executed command or a byte read at the named substrate.

**Substrate constants re-measured this seat (all reproduce EXACTLY as the spec states them):**

| datum | spec | measured |
|---|---|---|
| keyframes.js `HEAD` | `8281638c` | `8281638c` ✓ |
| keyframes.js `origin/master` | `81a56990` | `81a56990` ✓ |
| `git rev-list --left-right --count HEAD...origin/master` | 1 ahead / 41 behind | `1  41` ✓ |
| `git status --porcelain \| wc -l` | 252 | `252` ✓ |
| `git ls-remote --heads origin \| grep w9` | `b920b190 refs/heads/v/w9-staging` | `b920b1902b4854c1bc7c5778d1674436dd51dce6  refs/heads/v/w9-staging` ✓ |
| FOLD-FORWARD §B header / §C header | line 30 / line 48 | `30:## §B …` / `48:## §C …` ✓ |
| §B numbered rows | 15 | 15 ✓ |
| `OWNER-DECISIONS.md` OD-V3 / OD-V5 | `:7` / `:9`, verbatim | `:7` "**THE TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW.**" / `:9` "**THE AT-REST REOPEN QUESTION IS DEFERRED PENDING GLASS'S DOCK MARK.**" ✓ |
| kf registry records | 58 | 58 ✓ |
| records carrying `NO-WAVE-OWNER` | 57 | 57 (sole exception: `kf-AnimatedText.md`) ✓ |
| `NO-WAVE-OWNER` occurrences | 1,216 | 1,216 ✓ |
| value `INBOX.md` | 52,543 B; 4 `UNREAD` hits at `:4`/`:5`/`:17`/`:27`, all law-preamble | 52,543 B; hits at `:4`,`:5`,`:17`,`:27`, all preamble prose ✓ |
| kf `package.json#version` / CHANGELOG head | 6.0.0 / `## 6.0.0` at line 6, no Unreleased | `"version": "6.0.0"` / `6:## 6.0.0` ✓ |
| kf `INBOUND-LEDGER.md` + `DISPOSITIONS.md` at origin/master | present | `git cat-file -e` OK on both ✓ |

---

## §1 — ID-KEYED CENSUS (the X·P terminal method)

### 1.A Tier 1 — the 58 adjudicated records (the named corpus authority)

**Sweep**: `grep -n -E 'W10|W-10|W\.10' kf-*.md` over all 58 → 36 records hit, 47 hit-lines. Every hit-line was opened and adjudicated routing-vs-preamble. **Four** are row-level terminal dispositions naming KF.W10.

| # | banked id | record:line | terminal disposition (verbatim from the bank) | spec carriage | state |
|---|---|---|---|---|---|
| 1 | **KF-AT-21** | `kf-AnimatedText.md:61` | `**KF.W10** (doc-truth re-open; dated evidence never rewritten — an addendum row)` | §2b row 11 (sev MINOR, bank's grade held) → **G-5 addendum 1**, unit `.d`; §3.4.1; §4 bounds row `kf docs/tranches/G/audit/r-animation-sota.md` append-only; §10 commit 4 | **BOOKED** |
| 2 | **KF-AT-26 limb (e)** | `kf-AnimatedText.md:71` | `(a)(b) KF.W6 · (c) **KF.W8** (colocation settle) · (d) KF.W6 · (e) **KF.W10**` | §2b row 13 keyed **`KF-AT-26(e)`** with an explicit **ANTI-REBOOK** clause → **G-5 addendum 4**; §3.4.4; §4 bounds `kf docs/frontend-design/demo/home.md`; §7 excludes limbs (a)(b)(d)→KF.W6 and (c)→KF.W8 **with reason** | **BOOKED** |
| 3 | **KF-EST-23** | `kf-EditorStartScreen.md:90` | `**KF.W10** (doc-truth re-open beside KF-AT-21's r-animation-sota row — same class, second and third documents; dated evidence never rewritten, addenda only)` | §2b row 10 (sev INFO, held) → **G-5 addendum 2**, with the **CORRECTION-BOUNDARY LOCK** carried (§3.4.2: F3's transposition verdict SURVIVES on corrected premises; the `main.ts` elision charge is RETIRED; "corrects exactly two claims and reinstates neither") | **BOOKED** |
| 4 | **KF-HA-4** (manifest arm) | `kf-HeroAurora.md:41` | `**KF.W4** (gate law …). The in-file prose cites → KF.W6 file-touch; ``docs/tranches/T/stage-manifests/home.json:9`` → **KF.W10** (doc-truth addendum; dated evidence never rewritten). MAJOR` | §2b row 12, severity **MAJOR held at the bank**, booked once at the banked id → **G-5 addendum 3**; §3.4.3 with the **SPLIT-LOCK** and the by-reference clause; §7 excludes the oracle-REBUILD limb→KF.W4 and the in-file prose cites→KF.W6 **with reason** | **BOOKED** |

**Tier-1 escapes: 0.**

**Adjudicated NOT-routings (43 hit-lines, named so the sweep is falsifiable):**
- 30 records: routing-law / taxonomy preamble of the form `KF.W0..W10` / `KF.W0–W10` / `KF.W0–KF.W10` (`kf-AmigaScene:13,:33` · `kf-AnimationVisualizer:35` · `kf-App.skeleton:30` · `kf-CopyButton:36` · `kf-CubeScene:19,:39` · `kf-EasingScene:33` · `kf-EasingSidebar:32` · `kf-EasingTarget:33` · `kf-KeyframeCard:36` · `kf-KeyframesEditor:36` · `kf-MatrixEditor:19,:42` · `kf-MbabbMenu:17,:41` · `kf-OrbitalDrag:17,:38` · `kf-RibbonBar:8,:35` · `kf-SpringScene:36` · `kf-StartingStyleTarget:15,:35` · `kf-TimingFunctionPanel:34` · `kf-TransportDock:13,:39` · et al.).
- 4 lane-taxonomy lines naming W10 as a lane, not routing a row: `kf-App.md:35`, `kf-ChromeDock.md:7`, `kf-EditorHeader.md:7`, `kf-EditorShell.md:7`.
- `kf-OrbitalDrag.md:82` — **`F.W10.S1`** is a *fourier*-tranche ledger register quoted inside OD-34's prose; OD-34's own disposition is `**NO-WAVE-OWNER** — prune to load-bearing rationale (census S-2 class)`. Not a KF.W10 routing. **Correctly not carried.**
- 6 instrument/shape-prose lines: `kf-AnimatedText:9,:30,:137` · `kf-EditorStartScreen:9,:32,:151` · `kf-HeroAurora:9,:32`.

**Negative controls run to catch a routing spelled without the string `W10`:**
- `grep -n -i 'fold discharge' kf-*.md` minus preamble → 1 hit, `kf-TimelineHoverPreview.md:142` = "…13 folds + 1 killed-identity **fold discharged by reference**…", a fold verb, not a wave. Not a routing.
- `grep -n 'doc-truth' kf-*.md` → exactly the four rows above (+ the EditorStartScreen shape line). No fifth.
- `grep -n 'never rewritten|addenda only|addendum row'` → the same four rows + 4 unrelated prose lines (`kf-ChannelOptions:177`, `kf-CopyButton:82`, `kf-LayerConfigPanel:24,:90`, `kf-SquareInstrument:45`), none a W10 routing.
- `grep -n 'FOLD-FORWARD' kf-*.md` → **0 hits.** No record routes by naming the ledger.

### 1.B Tier 2 — the Codex-provenance carried table (CENSUS `:326`, intake lane `:247`)

Both authorities name the identical KF.W10 set. Verified verbatim.

| # | banked id | source | spec carriage | state |
|---|---|---|---|---|
| 5 | **B18-12** | `CENSUS:326` / `lane-keyframes-b10-b21.md:247` / `INTAKE-ADJUDICATION:82,:163-166` | §2b row 6 (INFO, terminal-unresolvable) → **G-4** `.c`, ONE disposition **UNRESOLVABLE-BY-CONSTRUCTION**, re-booking forbidden; §8 row; G-4 falsifier "Re-booking any of B18-12/13/14 as evidence fails" | **BOOKED** |
| 6 | **B18-13** | ditto | ditto | **BOOKED** |
| 7 | **B18-14** | ditto | ditto | **BOOKED** |
| 8 | **B18-23** | `INTAKE-ADJUDICATION:115` conflict C-7 (verified at `:115`) + `:163-166`; `CENSUS:314` | §2b row 5 (MINOR) → **G-4**, ONE disposition three ids: *"RESOLVED — superseded within Codex's own corpus. Citable ONLY as `345/12/57 @ 8281638c`"* | **BOOKED** |
| 9 | **B19-14** | `intakes/lane-keyframes-b10-b21.md:175` | ditto (same row) | **BOOKED** |
| 10 | **B20-14** | `intakes/lane-keyframes-b10-b21.md:198` | ditto (same row) | **BOOKED** |
| 11 | **B18-27** | `INTAKE-ADJUDICATION:116` conflict C-8 + `:166`; `CENSUS:326` | §2b row 7 (INFO) → **G-4**, *"CONFLICT UNRESOLVED → CARRIED"*, **settle-or-drop is ONE act; a third number is not an option**; §6.C-F cross-reads it into OG-V1's enumeration | **BOOKED** |
| 12 | **OG-KF1** (from **B21-18**) | `INTAKE-ADJUDICATION-2026-08-03.md:232`; `CENSUS:336-338` ("One owner ruling joins KF.W10's owner block (OG-KF1, from B21-18)… value.js cannot answer it") | §2b row 3 → **G-3** `.c`, owner block; **GATES** the three Codex-provenance rows; §6.C-F requires ONE owner sitting with OG-V1/OG-V2 | **BOOKED** |

**Tier-2 escapes: 0.** The census's own sentence — *"**KF.W10** adds the three terminal dispositions"* + the OG-KF1 rider — is discharged item-for-item.

### 1.C Tier 3 — FOLD-FORWARD §B rows 1–15 (kf `origin/master:docs/tranches/V/FOLD-FORWARD.md`)

Read whole at `81a56990`. Each row's subject matter compared against §3.1's carried disposition.

| # | §B row (source subject) | §3.1 disposition carried | state |
|---|---|---|---|
| 13 | 1 · Glass §7 V-A95 aurora reverse-drag black slab, born-RED BJ wave GF-AURORA | glass-owned; rides **SS-6** with kf-HeroAurora's relay packet; surface verify **KF.W9** | **BOOKED** |
| 14 | 2 · Chip/Badge orphaned dist CSS | **FOLDED-TO** COHESION §4a **SC-1** | **BOOKED** |
| 15 | 3 · Glass §4 dock contract, subsumes CH2-02 ×4 (BG-5, GU-1, GU-2, subject-legible) | **KF.W6 + KF.W9** | **BOOKED** |
| 16 | 4 · G-1..G-4 batch marks | **SS-6** ledger; OD-V5 keys off the same boundary | **BOOKED** |
| 17 | 5 · OD-V3 / OD-V5 — "Never proxied." | **RULED** — the §3.3 owner block; G-3's verbatim quotes or two `complete_with_misses` | **BOOKED** |
| 18 | 6 · IN-ATLAS-5 TimingFunction fence, THREE kf chase sites | **STANDING-CARRIED**, no action; §8 row | **BOOKED** |
| 19 | 7 · nested `<TooltipProvider>` at `AnimationControlsGroup.vue:2` | **FOLDED-TO KF-APP-21** — verified this seat at `kf-App.md:71`: *"**KF.W6** (one provider policy; the root provider is load-bearing at the frontier — cure is config unification, not deletion)"* ✓ exact | **BOOKED** |
| 20 | 8 · the W6×transaction collision LESSON | **FOLDED-TO KF.W4** gate law, verbatim; §7 excludes authoring the rule | **BOOKED** |
| 21 | 9 · MR2 runner-parity watch | verified **AT** the W9-staging landing | **BOOKED** |
| 22 | 10 · CH-02 watch row | **STANDING-CARRIED verbatim**, decide-not-reword lock; §8 row | **BOOKED** |
| 23 | 11 · VM-4, 6.0.0 tarball byte authority 184,430 B | doc-drift check; re-measured `package.json#version` 6.0.0 + CHANGELOG `## 6.0.0` line 6 ✓ | **BOOKED** |
| 24 | 12 · owner-checkout reconciliation | **FOLDED-TO KF.W0**; **W10 ASSERTS, never performs**; §7 exclusion | **BOOKED** |
| 25 | 13 · standing invariants (44-key mirror, `TimingFunction` at `constants/types.ts:45`, `scenes/` fence, read-only precepts, exact pins, batches-of-3) | **STANDING-CARRIED verbatim** + the §9.1 collision flag against the max-4 cap | **BOOKED** |
| 26 | 14 · OD-V2's owner-ordered TOTAL demo audit | **DISCHARGED BY CONSTRUCTION with a receipt** (58/58 at `35fc8ebf`, SS-10b CLOSED); §8 row | **BOOKED** |
| 27 | 15 · external watches, value SCI-1, "no kf action" | **PLAW-BIND** via CC-084; terminal verb only; §7 excludes scheduling the cut | **BOOKED** |

**Tier-3 escapes: 0.** 15/15, subject-for-subject, no §B row silent.

### 1.D Tier 4 — rows homed by mechanism (M-25), filed with NO wave at the bank

| # | id | bank coordinate | verified content | spec carriage | state |
|---|---|---|---|---|---|
| 28 | **kf-ChromeDock DISSENT §4** | `kf-ChromeDock.md:147` (DISSENT section opens `:142`) | *"challenge-C-consumption.md's header tally (25 defects / 6 superlatives) still counts eight defects and two superlatives that were never written (its own Round-3 note concedes it) … must be restated from scratch by any downstream consumer — never quoted."* ✓ exact | §2b NEVER-CITE-REGISTER; **G-4** entry; §7 excludes re-deriving the arithmetic; §9 dissent 3 declares the homing as this seat's act, re-homable, not droppable | **BOOKED** (declared, not inherited) |
| 29 | **kf-EditorHeader killed-claim #8** | `kf-EditorHeader.md:86` (register opens `:77`) | *"C §0's citation — KILLED (the substance is EH-1 and survives). The cited `coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` does not exist (my `ls`/`find`)…"* ✓ exact | §2b + **§3.3 RE-ANCHOR CORRECTION** (restated, not transcribed); **G-4** entry; §6.C-A rider back to KF.W0 | **BOOKED** (declared, not inherited) |

### 1.E Tier 5 — §A-sourced ledger/branch obligations

| # | id | source | spec carriage | state |
|---|---|---|---|---|
| 30 | **W9-STAGING** | FOLD-FORWARD §A row W9 · branch `v/w9-staging` @ `b920b190` (verified live, unmerged) | §2b row 14 (MAJOR) → **G-7** `.e` LAND-OR-KILL; §3.5 names all 8 dying units for the tombstone arm; §6.B downstream-assumption lock | **BOOKED** |
| 31 | **COORD-TERMINAL** | FOLD-FORWARD §A W12 ("ledger terminalization at V-close", folded forward unexecuted) · CENSUS §4 · lane-docs 12/14/16 · value `INBOX.md` (E13) | §2b row 15 (MAJOR) → **G-6** `.f`; both ledgers; D-GAP-6 = "not adopted", O-8 = pre-empted by CC-084, neither dressed as adoption | **BOOKED** |

*(NWO-TERMINAL-SWEEP is an aggregate assertion over the 1,216 NO-WAVE-OWNER occurrences, not an id; it is booked as **G-2** and counted once as the gate, not as a census row.)*

### 1.F Census totals

| | |
|---|---|
| **routedTotal** | **31** (4 registry-routed · 8 Codex-lane · 15 FOLD-FORWARD §B · 2 mechanism-homed · 2 §A ledger/branch) |
| **bookedCount** | **31** |
| **escapedCount** | **0** |
| escapes by bytes | *none* |

---

## §2 — NO INVENTION (every carried row traces to a banked id; M-25 transcription-only is a defect)

**Trace: PASS with two evidence-integrity defects (D-2, D-6 below).** Every one of §2b's 15 CARRY rows resolves to a real coordinate:

- FF-B-DISCHARGE → §B present at `81a56990`, header line 30, 15 rows ✓
- NWO-TERMINAL-SWEEP → 58/57/1,216 ✓ exact
- OD-V3 / OD-V5 → `OWNER-DECISIONS.md:7`/`:9` ✓ verbatim
- OG-KF1 → `INTAKE-ADJUDICATION-2026-08-03.md:232` ✓
- B18-23+B19-14+B20-14 · B18-12/13/14 · B18-27 → `INTAKE-ADJUDICATION:115,:116,:82,:163-166` + `CENSUS:314,:326` + `lane-keyframes-b10-b21.md:148,:175,:198,:247` ✓
- NEVER-CITE-REGISTER → `kf-ChromeDock.md:147` + `kf-EditorHeader.md:86` ✓
- KF-AT-21 · KF-EST-23 · KF-HA-4 · KF-AT-26(e) → the four registry rows ✓
- W9-STAGING → `b920b190` ✓ · COORD-TERMINAL → §A W12 + INBOX 52,543 B ✓

**Cure-shapes / sequencing riders / dissents are CARRIED, not merely cited — audit:**

| obligation | carried? |
|---|---|
| KF-EST-23's **CORRECTION-BOUNDARY LOCK** (F3 survives on corrected premises; `main.ts` elision charge RETIRED; corrects exactly two claims) | **CARRIED verbatim** §3.4.2 + G-5 acceptance |
| KF-HA-4's **cure-shape correction** (`HERO_AURORA_OPACITY_CEILING` is a `<script setup>` compile-local const with nothing to import; the assertable surface is the rendered `--aurora-opacity-ceiling` on `.aurora-root`) | **CARRIED verbatim** §3.4.3 |
| KF-HA-4 **SPLIT-LOCK** (W10 owns the manifest line only; the rebuild is KF.W4's; state the fate BY REFERENCE) | **CARRIED** §2b, §3.4.3, §7, §6.C-C |
| KF-AT-26 **ANTI-REBOOK** (cluster banks once; W10 owns (e) only) | **CARRIED** §2b, §7 |
| §3.2 packet locks — LP-1 (KF-CO-1/-8 no write→render edge) · MbabbMenu MUST-CARRY rider on ChromeDock M-4 · TD-1/TD-2 bundling · KF-APP-1/-17 same-motion + the `headerLeft` **'fill' TRAP** (DELETE is the only self-contained cure until KF-APP-5's producer relay lands) · comment-stated invariants are test obligations (kf-SquareScene MISS-3, docblock 46 lines above `setTimeout(step, 520)`) · glass-producer rows → SS-6 never demo-side hacks | **6 of 7 CARRIED** — see **D-4**: the KF-AV-28 standing supersession rider is dropped |
| §9 dissents recorded not resolved (batches-of-3 vs max-4 · ownership gap · register homing · KF-HA-4 severity split risk) | **CARRIED**, four dissents, each with its risk stated |
| Severity discipline ("Severity is the bank's and is never re-graded downward at a fold") | **HELD** — KF-HA-4 MAJOR, KF-AT-21 MINOR, KF-EST-23 INFO, KF-AT-26(e) INFO all match the bank |
| Squares with `KF-W6-CARRY.md` (posture axis 5) | **YES** — the CARRY's row `KF-AT-1 · -2 · -3 · -5 · … · -26(a)(b)(d)` (`:171`) is exactly the complement of W10's `(e)`; KF-APP-21→KF.W6 (`kf-App.md:71`) matches W10's §7 exclusion. *(Note: W6's own header states its bank as **201 rows / 54 records**, not 424 — recorded for the W6 seat, not chargeable to W10, which never cites the CARRY file.)* |

**No invented rows found.** Every §2b row, every §3.1 disposition, every §7 exclusion resolves to a coordinate that exists.

---

## §3 — GATES: born-RED with a REAL witness (L-19: proof-scripts presumed contrivance)

| gate | born-RED asserted | witness | verdict |
|---|---|---|---|
| **G-1** §B 15/15 discharge | 0 of 15 carry a terminal verb | `git show origin/master:docs/tranches/V/FOLD-FORWARD.md` §B 1–15 | **REAL** — re-run; file present, §B at :30, 15 rows, no discharge table exists anywhere in X·KF. RED confirmed |
| **G-2** NO-WAVE-OWNER ∅ both ways | register absent; denominator uncomputable | `grep -c 'NO-WAVE-OWNER' registry/adjudicated/kf-*.md` + per-record routing summaries vs `waves/*.md` bounds | **REAL but its stated RED is stale** — see **D-3**. 58/57/1,216 reproduce exactly; the "six sibling specs / KF-W1·W5·W6·W9 absent" leg is FALSE at the tree. Gate survives RED only on the KF.W11/KF.W13 leg |
| **G-3** three rulings, never proxied | 0 of 3 ruled | `git show origin/master:docs/tranches/V/OWNER-DECISIONS.md` `:7`/`:9` + `INTAKE-ADJUDICATION:232` | **REAL** — both quotes byte-exact at origin/master; still HELD / DEFERRED. RED confirmed |
| **G-4** never-cite register, 7 entries | register does not exist | `grep -rnE '357/414\|86\.23\|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/` | **REAL command, MISSTATED RESULT** — see **D-1**. 46 hits / 22 files, not the ~6 sites enumerated. Register genuinely absent, so RED holds; the witness prose does not reproduce |
| **G-5** four doc-truth addenda | all four documents assert the falsified claim; zero addenda | four file:line coordinates at kf `origin/master` | **REAL** — all four verified present this seat: `r-animation-sota.md` (:107 heading / :109 claim / :253 ledger row), `lane-22-perf-demo-runtime.md:110-112`, `U.D.md:194`, `home.json:9` + `:2`/`:13`/`:16`, `home.md:67`/`:187-191`/`:367` (8 `liftDown` doc hits total, 0 in code). RED confirmed. Anchor defects **D-6**, **D-7** |
| **G-6** both ledgers terminal | §A W12 unexecuted; two converged rows without closing lines | value `INBOX.md` + kf `INBOUND-LEDGER.md` + `DISPOSITIONS.md` | **REAL** — INBOX 52,543 B, 4 UNREAD hits all law-preamble (`:4`,`:5`,`:17`,`:27`) exactly as stated; both kf ledgers `git cat-file -e` OK. RED confirmed, and honestly characterised ("the RED is the missing terminal verbs, not an unread backlog") |
| **G-7** `v/w9-staging` land-or-kill | branch live, pushed, unmerged | `git ls-remote --heads origin \| grep w9` | **REAL** — `b920b190` exact. RED confirmed |

**L-19 sweep: CLEAN.** No gate is witnessed by an authored proof-script. All seven witnesses are `git show` / `git ls-remote` / `grep` / `git cat-file -e` / byte reads against artefacts that exist today. §10's artefact list is explicitly *"commits and pasted commands only; cites no document this close authored — L-6"*. G-7's falsifier pre-kills the exit-code ceremony (*"a 'landing' recorded from an `exit 0` with no run ID fails"*). No contrivance found.

---

## §4 — E-3 + STATUS

| check | verdict | receipt |
|---|---|---|
| zero VERIFIED stamps | **PASS** | 5 `VERIFIED` occurrences, all non-stamping: `:28` four-verb row **NO**; `:30` R-A stating where it *will* be stamped; `:148` "both **verified present**" (a read); `:367` commit-message text; `:371` L-18 rider. No wave is stamped VERIFIED by this file |
| status planned everywhere | **PASS** | `:19` `**Status**: **planned**`. Sole status field |
| no execution verbs in current voice | **PASS** | Scan for `^(We\|I) `, `has been landed/written/appended`, `was appended`, `is now landed/appended` → **0 hits**. The 14 `this seat` clauses are all read-only measurements (`measured`, `re-measured`, `verified at 81a56990`, `re-read`), which born-RED witnesses require |
| opens no product source | **PASS (with an INFO)** | §4 bounds: *"**EXPLICITLY NOT IN BOUNDS**: any product source in either repo (execution gate)"*; §2 *"This wave consumes; it does not home and it does not cure"*; §3 *"No unit opens product source in either repo."* The 4 `.vue`/`demo/` mentions (`:40`, `:77`, `:99`, `:136`, `:172`) are all **citations** of banked coordinates, never bounds entries. §3.1 row 11 does read kf `package.json` + `CHANGELOG.md` for VM-4 — repo manifests, not `src/`; a read, not an open-for-write. Recorded as **D-9-adjacent INFO**, not charged |
| E-3 addenda-not-patch | **PASS** | §3.4 header *"beside — never inside"*; §4 marks all five kf doc paths **append-only**; G-5 acceptance requires `git diff` empty on all four originals; G-5 falsifier *"one changed byte in an original fails the gate"*; §4 adds the JSON-sidecar rule for `home.json` |
| self-stamps | **INFO (D-9)** | `SPECIFIED \| **YES — by this file, 2026-08-28**` while §6.C-E declares the §1 amendment owed *"before X·KF may stamp SPECIFIED"* |

---

## §5 — POSTURE AXES

| axis | binds? | verdict |
|---|---|---|
| **KF.W4 is the DECLARED SEQUENCING HEAD** (`KF-W4.md:193`: *"This wave is the declared sequencing head of X·KF. No repair packet and no UNIT may open before **G-KFW4-1** lands"*) | yes, transitively | **SATISFIED, weakly** — §1 "Opens after … **KF.W2..W9 IMPLEMENTED**" subsumes W4, so no W10 unit can precede the head. But §6.B's carried-locks list and §6.C-C (the declared bidirectional W4 edge) never name the sequencing-head law or `G-KFW4-1`. **D-10 (INFO)** |
| **KF.W3 is GATED via PLAW-BIND (never scheduled)** | yes | **SATISFIED, exemplary** — §6.C-G: *"**W10 RECORDS, never schedules** … W10 stamps the watch's terminal verb only; it does not schedule the cut. **Direct parse-that→fourier remains FORBIDDEN.**"* §7 excludes *"Scheduling the 4.1 cut (SCI-1 / CC-084 / KF.W3 repin)"* with reason. §3.1 row 15 stamps §B-15's verb only. `KF-W3.md` carries PLAW-BIND ×3 — consistent |
| **KF.W7 carries the KF-AV-28 supersession rider** | yes | **DEFECTIVE — D-4.** `KF-W7.md` carries KF-AV-28 ×7 ✓, but W10's §3.2 — the clause that claims to carry, verbatim, the sequencing locks that must survive its own set-difference sweep — omits the rider that governs the very NO-WAVE-OWNER rows G-2 sweeps |
| **KF.W6 must square with its CARRY file** | yes, at the seam | **SQUARES** — `KF-W6-CARRY.md:171` books `KF-AT-26(a)(b)(d)`, the exact complement of W10's `(e)`; `KF-W6-CARRY` also books `KF-AT-3`/`KF-AT-4`, which §3.4.1 names as the tree-fact cure ("KF-AT-3/KF-AT-4 in KF.W6/KF.W4") ✓; `kf-App.md:71` KF-APP-21→KF.W6 matches §7 verbatim ✓. W10 never re-keys a W6 id |
| **KF.W6's 424-row CARRY** | not W10's | `KF-W6.md:7` declares its bank as **201 rows / 54 records**; the file has 77 table lines. Discrepancy noted for the W6 seat; W10 cites the CARRY file 0 times and inherits nothing from it |

---

## §6 — DEFECTS (worst first)

### D-1 · **MAJOR** — G-4's own witness command does not reproduce its stated result

**Claim.** `:226`: *"re-measured this seat: the hits are `CENSUS:314` + `INTAKE-ADJUDICATION:115` …, `KF-W0.md:111`/`:274` and `KF-W3.md:124`/`:228` …, this file, and the dated 2026-07-31 resurrection-handoff records"* — a closed list of 5 files.

**Receipt.** Re-running the gate's verbatim witness:
```
grep -rnE '357/414|86\.23|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/ | wc -l   →  46
grep -rlE '357/414|86\.23|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/ | wc -l   →  22
```
Unenumerated files include 11 `docs/tranches/V/megatranche/coordination/*` letters dated **2026-08-02/08-03** (`CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md:534`,`:881` · `CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json:730`,`:1364` · `KEYFRAMES-V8-ROUTE-MOUNT-CURRENT-SOURCE-AUDIT-2026-08-02.md:13`,`:29` · `KEYFRAMES-EIGHT-HOUR-CURRENT-SOURCE-DELTA-2026-08-03.md:54` · `KEYFRAMES-B18/B19/B20/B21-TERMINAL-*` · `CONSTELLATION-OWNER-SLOT-ADMISSION-{HOSTILE-A,OVERLAY}-2026-08-02.md`), plus `audit/codex-provenance/intakes/lane-keyframes-b10-b21.md:148`,`:175`,`:198`, `registry/harvest/wf_b1903beb-e2b.json:121`, `formation/codex-worktree-7e28/coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md:52`,`:65`, `INTAKE-ADJUDICATION:166`,`:235`, `CENSUS:326`. None is a 2026-07-31 resurrection-handoff record; several are 08-02/08-03, i.e. *after* the supersession the register is supposed to attach.

**Why it bites.** G-4's acceptance is *"grep returns zero bare citations across X·KF"* and its falsifier is *"a spec that cites `357/414` without `345/12/57 @ 8281638c` beside it fails, naming the file and line."* An adjudicator handed this enumeration would believe the field is 5 files wide. It is 22. The gate cannot be closed against a witness whose measured output the spec misstates by ~16 files.

---

### D-2 · **MAJOR** — KF-HA-4's row is stamped *"verified at `81a56990`"* while carrying the stale-HEAD figure

**Claim.** `:76`: *"**verified at `81a56990`** … that oracle was dissolved at `70b32501` (**roster is exactly `proof:publish` + `proof:owner-golden`**; 0 hits across `scripts/`, `test/`, `src/`)"*.

**Receipt.**
```
git show origin/master:package.json | grep -n '"proof'
  50:  "proof:structure":    "node scripts/gates/structure/index.mjs"
  51:  "proof:publish":      "node scripts/gates/surface/index.mjs"
  52:  "proof:owner-golden": "node scripts/gates/visual/index.mjs"      →  THREE

git show 8281638c:package.json | grep -n '"proof'
  49:  "proof:publish"   50:  "proof:owner-golden"                      →  TWO
```
Two is the count at **HEAD `8281638c`** — and it is verbatim the bank's own phrase, `kf-HeroAurora.md`: *"proof-script census (**exactly 2**, neither named)"*. The spec transcribed the bank's stale-checkout number and re-stamped it with the origin/master substrate.

**Why it bites.** This is precisely the failure the file legislates against three times — §3.3's *"**KF-AT-28 re-anchor law** firing: re-resolve every cite at the landing substrate before writing"*, §3.4's *"Anchors re-resolved at the landing substrate before writing"*, and G-5's falsifier *"An addendum written against a line number that no longer resolves fails the re-anchor law."* It is also the M-25 defect shape by definition: transcription-only, presented as carriage. `70b32501` resolves as a commit ✓ and the substantive conclusion **survives** — `proof:cursor-light-subtle`, `proof:hero-two-focal` and `proof:appearance-suffusion` all return **0 files** under `scripts test src` at origin/master, independently confirmed this seat — so the defect is evidence integrity, not the finding.

---

### D-3 · **MAJOR** — OP-5 and G-2's "RED today" sibling-spec measurement is false at the tree

**Claim.** `:52` (OP-5) and `:204` (G-2 RED): *"**six** sibling spec files exist (`KF-W0.md`, `KF-W2.md`, `KF-W3.md`, `KF-W4.md`, `KF-W7.md`, `KF-W8.md`); `KF-W1`/`KF-W5`/`KF-W6`/`KF-W9` are **absent** … so the right-hand union is **not yet computable**."*

**Receipt.** `ls docs/tranches/X/keyframes/waves/` → **11** files. The four "absent" specs exist and are substantial: `KF-W1.md` 48,834 B · `KF-W5.md` 99,277 B · `KF-W6.md` 95,645 B · `KF-W9.md` 70,875 B. All four carry a bounds heading — `KF-W1.md:73 "## 4. Bounds"`, `KF-W5.md:66 "## §Bounds"`, `KF-W6.md:14 "## §Bounds"`, `KF-W9.md:45 "## Bounds"`. All 11 wave specs carry one. `git status --porcelain -- docs/tranches/X/keyframes/` → clean.

**Why it bites.** OP-5's acceptance is *"Every sibling spec present with a `## File bounds` block"* and its hard consequence is *"An unfinal denominator makes G-2 vacuous, and a vacuous gate is **deleted, not counted** (L-2)."* The stated basis for that vacuity no longer holds. G-2's RED survives on the KF.W11/KF.W13 leg — those two waves genuinely have no spec (`KF-W2.md:270` routes cube→**KF.W11** and dock-menu→**KF.W13**, verified) — but the gate's own RED paragraph is now two-thirds false, and an executor reading it would compute against a roster that has moved.

---

### D-4 · **MAJOR** — §3.2's verbatim sequencing-lock carry drops the KF-AV-28 standing supersession rider

**Claim.** `:113`: *"**Sequencing locks that MUST survive the sweep intact, carried verbatim from the records:**"* followed by six bullets (LP-1 · MbabbMenu MUST-CARRY · TD-1/TD-2 bundling · KF-APP-1/-17 same-motion + `headerLeft` 'fill' TRAP · comment-stated-invariants · glass-producer→SS-6). No hedge, no "inter alia", and no §7 exclusion line for any seventh lock.

**Receipt.** `kf-AnimationVisualizer.md:35`: *"**A standing sequencing rider on every NO-WAVE-OWNER row below: KF.W7's S-9 evaluation (KF-AV-28) may supersede any behavioral cure here** — if the evaluate verdict is 'swap', the bespoke rows discharge with the component."* Restated at `kf-SequenceScrubber.md:36` (*"KF-AV-28's standing rider applies"*) and ridden at `:104`, `:128`, `:134`.

**Why it bites.** G-2's acceptance requires *"every row LANDED / KILLED-with-rationale / carried to the next formation boundary's ledger; **every §3.2 sequencing lock reproduced intact**."* A rider that can make a whole class of NO-WAVE-OWNER rows discharge-with-the-component changes which terminal word those rows may take — it is a sweep input, not a KF.W7-internal detail. `KF-W7.md` carries KF-AV-28 seven times; the sweep that asserts ∅ over the same rows carries it zero times.

---

### D-5 · **MINOR** — the never-cite register is indexed three incompatible ways, and the ordinal is a gate criterion

**Receipt.** `:73` (§2b): ChromeDock + EditorHeader are *"the register's **fifth and sixth** entries."* `:125` (§3.3.2) enumerates in order — B18-12/13/14 (1–3), the 357/414 block (4), B18-27 (5), ChromeDock's tally (6), EditorHeader's §0 cite (7) — making them **sixth and seventh**. `:230` (G-4 acceptance) then requires *"**the sixth entry** carries §3.3's **REPO-SCOPED, NOT ABSENT** restatement"* — but under §3.3's own ordering the sixth entry is ChromeDock's header tally, and the REPO-SCOPED restatement belongs to EditorHeader's. Seven is right (`:228` re-derives 3+1+1+1+1); the ordinals are not.

---

### D-6 · **MINOR** — KF-AT-21's addendum anchor drifts off the bank with no declared re-anchor

**Receipt.** Bank: `kf-AnimatedText.md:61` routes at **`r-animation-sota.md:109`**. Verified at `81a56990`: `:109` is the `- **Where (verified):**` bullet carrying *"**The F26-4 demo grapheme-bug is DISCHARGED** … the old raw-UTF-16 per-char split is gone"*; **`:107` is the `### G26-3` section heading.** §3.4.1, §4 bounds and G-5's witness all name **`:107`**, with no declared re-anchor — from the same seat that spends a paragraph declaring the `home.json` `:11`→`:2`/`:13`/`:16` correction. The second anchor is correct: `:253` is exactly the `F26-4 SplitText / demo grapheme … demo-fix DISCHARGED (F.W16 word-split)` ledger row ✓.

---

### D-7 · **MINOR** — the KF-EST-23 anchors are stated three ways inside one file

**Receipt.** `:75` (§2b): `lane-22-perf-demo-runtime.md:106-115` and `U.D.md:193-195`. `:134`/`:169`/`:170`/`:238` (§3.4.2, §4 bounds, G-5 witness): `:108-114` and `:194`. Bank (`kf-EditorStartScreen.md:90`): `lane-22:110-112`, `U.D.md:194`. Measured at `81a56990`: the *"zero engine dependency"* claim spans **`:110-112`**; `U.D.md:194` carries *"has ZERO engine dependency"* ✓. Three ranges for one anchor in a file whose own gate fails an addendum *"written against a line number that no longer resolves."*

---

### D-8 · **MINOR** — §6.C-A's rider names a path that does not exist in the repo its consumer works in

**Receipt.** `:294` instructs KF.W0 to re-read XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` against *"`archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md`"*, unqualified. Measured: that file exists **only in value.js** (`docs/tranches/V/archive/…`, 2,878 B). In keyframes.js, `git ls-tree -r --name-only origin/master | grep -i headerribbon` returns exactly **one** path — `docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md`. KF.W0's substrate is keyframes.js. §3.3 qualifies both repos correctly; the rider drops the qualification at the point of delivery.

---

### D-9 · **INFO** — the file self-stamps SPECIFIED while declaring that stamp's precondition unmet

`:26` stamps `SPECIFIED | **YES — by this file, 2026-08-28**`. `:5` and `:302` declare *"§1 of COHESION requires an amendment naming an owner for KF.W3 and KF.W10 **before X-whole may stamp SPECIFIED**"* / *"before **X·KF** may stamp SPECIFIED."* File-scope vs sub-tranche-scope is a defensible distinction, but the file never draws it.

---

### D-10 · **INFO** — §6.B omits KF.W4's declared sequencing-head law on a declared bidirectional edge

`KF-W4.md:193`: *"**This wave is the declared sequencing head of X·KF.** No repair packet and no UNIT may open before **G-KFW4-1** lands."* W10's §6.C-C declares a bidirectional W4 edge and carries §B-8's lesson *to* W4 and KF-HA-4's rebuild *from* W4 — but never names the head or `G-KFW4-1`. Satisfied transitively by §1's "KF.W2..W9 IMPLEMENTED"; unstated.

---

## §7 — SUPERLATIVES (L-18 runs both ways; provenance attached)

1. **The `home.json` re-anchor is real and correct.** §2b/§3.3/§3.4.3 correct the corpus's `:11` to `:2`/`:13`/`:16`. Verified at `81a56990`: `proof:hero-two-focal` clause-(c) appears at exactly `:2`, `:13`, `:16`, and **`:11` is the bare `  "forbidden": [` opener** — byte-for-byte as claimed. `proof:cursor-light-subtle` sits at `:9` ✓.
2. **The REPO-SCOPED, NOT ABSENT restatement is correct and is the harder finding.** kf-EditorHeader killed-claim #8 declares the cited letter nonexistent. Measured: `docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` **exists at keyframes.js `origin/master`**, and `docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md` **exists at value.js** — two different documents in two different repos, exactly as §3.3 states. The spec restated the bank rather than transcribing it, and got it right.
3. **Every substrate constant reproduces exactly** (the table at the head of this file): 58/57/1,216 · 1-ahead/41-behind/252-dirty · `b920b190` · §B at :30 / §C at :48 / 15 rows · OD-V3 `:7` / OD-V5 `:9` verbatim · INBOX 52,543 B with all four UNREAD hits correctly diagnosed as law-preamble rather than a backlog · `package.json` 6.0.0 / CHANGELOG `## 6.0.0` at line 6 · `home.md` 8 `liftDown` doc hits, 0 in code.
4. **The honesty of G-6's RED characterisation** — *"the RED is the missing terminal verbs, not an unread backlog"* — declines an easy false RED that the raw grep would have supported.
5. **Structural discipline.** Zero registry escapes across 31 routed obligations; §7 states 14 non-carries each with a wave and a reason; §9 records four dissents unresolved rather than papered; the ownership gap (OP-6 / §6.C-E) is declared upward as a blocking defect rather than assumed; §3.5 pre-names all eight units the tombstone arm must cover; unit disjointness is stated path-by-path.

---

## §8 — LOCAL VERDICT

**DEFECTIVE** — 4 MAJOR · 4 MINOR · 2 INFO.

The census is **clean**: 31 routed obligations, 31 booked, **0 escapes**, no invention, no re-keying, severities held at the bank, cure-shape locks and dissents carried rather than cited. The gate architecture is real and L-19-clean — seven born-RED gates, seven witnesses that are commands or artefacts, no authored proof-script anywhere.

The defects are **evidence-integrity**, and they cluster on exactly one failure mode: **three of the spec's own re-measurements do not reproduce** (D-1 the G-4 grep field, D-2 the proof-script roster carried from stale HEAD under an origin/master stamp, D-3 the sibling-spec roster), and **one declared-verbatim carry is incomplete** (D-4, the KF-AV-28 rider). For a wave whose entire product is a ledger of terminal words backed by evidence coordinates, and whose own law is *"re-resolve every cite at the landing substrate before writing,"* a witness that misstates its own output is the defect class that matters most. All four are repairable by re-measurement without touching the spec's structure.

**Repairs required before PASS-2:** re-run and re-state G-4's grep field (D-1); re-measure the proof-script roster at `81a56990` and declare the `2 → 3` re-anchor (D-2); re-state OP-5/G-2's RED against the 11-spec tree, keeping the KF.W11/KF.W13 leg as the live RED (D-3); add the KF-AV-28 standing supersession rider to §3.2 (D-4); fix the register ordinals (D-5); declare the `:109 → :107` anchor move or restore `:109` (D-6); collapse the three lane-22/`U.D.md` anchor statements to one (D-7); repo-qualify §6.C-A's archive path (D-8).
