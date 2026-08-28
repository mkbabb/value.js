# KF-W10 · L-20/L-18 CONFORMANCE CHECK — PASS 2 (fresh seat, re-derived)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W10.md` (79,565 B at check; mtime 2026-08-28 12:43).
**Seat**: fresh Opus adjudicator. **Nothing inherited** from PASS-1 — the PASS-1 register
(`conformance/PASS-1/KF-W10-CHECK.md`) and `conformance/PASS-1/RULINGS.md` were read only to
spot-check whether the rulings *addressed to KF-W10* were applied; every census row, anchor and
gate witness below was re-measured from the bytes this seat.

**Corpus authority**: the **58** `kf-*.md` records at
`docs/tranches/V/megatranche/registry/adjudicated/` **plus the sole in-tree carry**
`docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`. PASS-1 scoped the carry file to W6 only
(`PASS-1/KF-W10-CHECK.md:148` — *"W10 … never cites the CARRY file"*); this seat does **not**, and
that is where the escapes are.

**Instruments** (all read-only): `grep`/`sed`/`wc` over both trees; `git show`, `git status
--porcelain`, `git ls-remote`, `git rev-list --left-right --count`, `git log` in value.js
(`tranche-u`) and keyframes.js (sacred checkout, `8281638c` / `origin/master 81a56990`). Zero
writes outside this file. Zero product source opened.

**LOCAL VERDICT: DEFECTIVE** — 1 BLOCKER, 4 MAJOR, 3 MINOR. Routed 9 · booked 6 · **escaped 3**.

---

## §1 — ID-KEYED CENSUS (every row routed to KF.W10, by bytes)

### §1.1 Tier A — explicit routings in the 58 adjudicated records

Denominator derived, not assumed: `grep -n 'W10' kf-*.md` over all 58 records → 36 records match;
all but four matches are the header/routing-law boilerplate that names the census sketch range
`KF.W0–W10`. Filtering to routing-column cells (`grep -n '^|.*W10'`) yields **four** rows.

| # | id | routed at (bytes) | routing cell | KF-W10 disposition | state |
|---|---|---|---|---|---|
| A-1 | **KF-AT-21** | `kf-AnimatedText.md:61` | `**KF.W10** (doc-truth re-open; dated evidence never rewritten — an addendum row)` | §2b row 8 (MINOR, bank's grade held) → **G-5 addendum 1**, `.d`; anchors `r-animation-sota.md:109` + `:253`, re-anchor from the draft's `:107` **DECLARED** at §3.4.1 | **BOOKED** |
| A-2 | **KF-AT-26 limb (e)** | `kf-AnimatedText.md:71` | `(a)(b) KF.W6 · (c) **KF.W8** (colocation settle) · (d) KF.W6 · (e) **KF.W10**` | §2b row 9 keyed `KF-AT-26(e)` with an explicit **ANTI-REBOOK** ("the cluster banks once; W10 owns (e) only") → **G-5 addendum 4**; §7 excludes (a)(b)(d)→KF.W6 and (c)→KF.W8 | **BOOKED** |
| A-3 | **KF-EST-23** | `kf-EditorStartScreen.md:90` | `**KF.W10** (doc-truth re-open beside KF-AT-21's r-animation-sota row — same class, second and third documents…)` | §2b row 7 (INFO) → **G-5 addendum 2** with the **ANCHOR LOCK** (`lane-22-perf-demo-runtime.md:110-112` + `U.D.md:194`, the `:106-115`/`:108-114`/`:193-195` variants struck) and the **CORRECTION-BOUNDARY LOCK** | **BOOKED** |
| A-4 | **KF-HA-4** (manifest arm only) | `kf-HeroAurora.md:41` | `… ``docs/tranches/T/stage-manifests/home.json:9`` → **KF.W10** (doc-truth addendum; dated evidence never rewritten). MAJOR` | §2b row 10, severity **MAJOR held** (not re-graded) → **G-5 addendum 3** under an explicit **SPLIT-LOCK** (rebuild limb → KF.W4, in-file prose → KF.W6, both in §7); §9 item 4 records the split-a-MAJOR risk | **BOOKED** |

**Tier A escapes: 0.**

### §1.2 Tier B — filed with NO wave, homed into W10 by M-25 mechanism

| # | id | filed at (bytes) | KF-W10 disposition | state |
|---|---|---|---|---|
| B-1 | kf-ChromeDock **DISSENT #4** (C-axis arithmetic) | `kf-ChromeDock.md:147`, inside the `## DISSENT — preserved, not ruled away` block opened at `:142`; *"counts eight defects and two superlatives that were never written … must be restated from scratch by any downstream consumer — never quoted"* | §2b `NEVER-CITE-REGISTER` → **G-4**, register entry **(6)**; §9 item 3 records the homing as this seat's M-25 act, re-homable but not droppable | **BOOKED** |
| B-2 | kf-EditorHeader **killed-claim #8** (C-axis §0 citation) | `kf-EditorHeader.md:86`; *"the cited `coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` does not exist (my `ls`/`find`)"* | **G-4** register entry **(7)**, and §3.3 **RESTATES rather than transcribes** it: *"REPO-SCOPED, NOT ABSENT"*. Re-verified this seat — see §2.3 | **BOOKED** |

**Tier B escapes: 0.** Ordinals (6)/(7) are stated identically in §2b, §3.3.2 and G-4's ordinal
lock; the PASS-1-era "fifth and sixth" spelling is struck in-file. Consistent.

### §1.3 Tier C — the sole in-tree carry, `KF-W6-CARRY.md:361`

`KF-W6-CARRY.md` (199,055 B, mtime 10:49 — **predates** the 12:43 repair) carries a declared
cross-edge block. Its W10 edge reads, whole:

> **→ KF.W10 · Fold Discharge.** KF-AT-21's doc-truth re-open (`r-animation-sota.md:109`/`:253`);
> KF-HA-4's `stage-manifests/home.json:9`; the census S-9/S-10 extensions terminalized; the
> `.tap-floor` adopt-or-delete ruling recorded; the `/command` decision record filed so the census
> stops re-raising it.

Five items. Two are the duplicates of A-1/A-4. **Three are neither carried nor excluded.**

| # | item routed to KF.W10 | source row (bytes) | present in KF-W10.md? | state |
|---|---|---|---|---|
| C-1 | KF-AT-21 doc-truth re-open | `KF-W6-CARRY.md:361` | yes — ≡ A-1 | **BOOKED (dup)** |
| C-2 | KF-HA-4 `stage-manifests/home.json:9` | `KF-W6-CARRY.md:361` | yes — ≡ A-4 | **BOOKED (dup)** |
| C-3 | **"the census S-9/S-10 extensions terminalized"** | `KF-W6-CARRY.md:361`; the S-9 quartet at `:174` (CPD R-5 Textarea swap), `:175` (LP-8 ≡ KF-CO-35 + ME-18 `/number-field` evaluation), `:176` (KAD-12 registry adoption), `:177` (DGC toast swap, *"CENSUS-OWNED"*); S-10 at `:179` | **NO.** The only `S-9`/`S-10` substrings in KF-W10.md are `SS-10b` at `:29`, `:111`, `:132`, `:380`; `grep -c 'census S-' KF-W10.md` = 0 | **ESCAPED** |
| C-4 | **"the `.tap-floor` adopt-or-delete ruling recorded"** | `KF-W6-CARRY.md:361`; the roster at `:83` (*"`.tap-floor` — the DEAD 44px UTILITY"*, ⟨KF-CB-25 pinned count · kf-CubeScene MISS-3 · KF-KE-45 · KC-23 · KF-KC-33 · SP-11⟩) and the measurement at `:268` (G-W6-4: *"`.tap-floor` → 0 adopters"*) | **NO.** `grep -c 'tap-floor' KF-W10.md` = **0** | **ESCAPED** |
| C-5 | **"the `/command` decision record filed so the census stops re-raising it"** | `KF-W6-CARRY.md:361`; the row at `:179` (*"S-10 · KSM C-9 — A DECISION RECORD, NOT A SWAP … cure = RECORD THE DECISION so the census stops re-raising it. A wave product, not a code change."*) | **NO.** `grep -c '/command' KF-W10.md` = **0** | **ESCAPED** |

`§7 §Excluded` (13 rows) names none of C-3/C-4/C-5, so they do not close by exclusion-with-reason
either. C-5 is the sharpest of the three: its source row calls it *"a wave product, not a code
change"* — i.e. exactly a fold-discharge artefact, and it names W10's own §2 failure mode ("the
census stops re-raising it") as its purpose.

### §1.4 Tally

| | |
|---|--:|
| routed to KF.W10 (distinct, Tier A + B + C, dedup A-1≡C-1 and A-4≡C-2) | **9** |
| carried, or excluded with a reason | **6** |
| **escaped** | **3** |

---

## §2 — NO INVENTION / M-25 DEPTH (locks, riders, dissents)

### §2.1 Locks and riders — carried

- **KF-AV-28 standing supersession rider** — RULINGS **R-10** requires the clause **VERBATIM**.
  Byte-compared this seat: the 746-character blockquote at `RULINGS.md:200` is present character-
  for-character as §3.2's **seventh** carried lock, plus W10's own governed-row enumeration
  (`AnimationVisualizer` / `PlaybackRibbon` / `SequenceScrubber` + the drag-seam and
  transport/ribbon packets), plus the G-2 consequence (`DISCHARGED by KF.W7 SWAP verdict <surface>,
  <date>` admitted as a lawful terminal word; LANDED/KILLED forbidden while a surface verdict is
  outstanding). Banked anchors re-verified: `KF-AV-28` present at `kf-AnimationVisualizer.md:35`,
  `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36`. **FAITHFUL.**
- The other six §3.2 locks (LP-1 write→render edge · MbabbMenu MUST-CARRY rider · TD-1/TD-2
  bundling · KF-APP-1/-17 same-motion + the `headerLeft` 'fill' TRAP · comment-stated invariants as
  test obligations · glass-producer→SS-6) are present and counted as seven in §6.B. **FAITHFUL.**
- **KF-W8 R-4 / KF-W5 D-6 do-not-split pair** (RULINGS **R-14**) — present three times and
  identically: §2b as **RECORD-ONLY**, §3.1 as the **CARRY-FORWARD RECORD block** explicitly
  *beside* the §B table and contributing nothing to G-1's 15, §8 as the disposition row. Terminal
  verb `DECLINED-FOR-X·KF, carried forward` in all three. G-1's denominator stays 15. **FAITHFUL.**

### §2.2 Dissents — carried, not resolved

§9 books four: the §B-13 batches-of-3 vs max-4-workflows collision (also flagged at §6.B and
§3.1 row 13); the ownership gap; the never-cite register's homing; KF-HA-4's split MAJOR. None is
resolved by the seat that recorded it. **FAITHFUL.**

### §2.3 The one re-verification this seat performed independently

§3.3's *"REPO-SCOPED, NOT ABSENT"* restatement is **correct**:
`git ls-tree -r --name-only origin/master | grep -i headerribbon` in keyframes.js returns exactly
**one** path — `docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md`;
and value.js holds a *different* letter at
`docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md` (**2,878 B**,
present). Two documents, two repos, exactly as §3.3 and §6.C-A(a)/(b) state. **CONFIRMED.**

---

## §3 — GATES: born-RED with a REAL witness (a phantom convicts)

Every cited command was executed read-only. Results:

| gate | witness | reproduces? |
|---|---|---|
| **G-1** | `git show origin/master:docs/tranches/V/FOLD-FORWARD.md` | **YES, exactly.** `## §B` at line **30**, `## §C` at line **48**, **15** numbered rows, contents matching §3.1's fifteen carried dispositions one-for-one (row 7 = the `AnimationControlsGroup.vue:2` `<TooltipProvider>`; row 11 = VM-4's 184,430 B; row 15 = value SCI-1) |
| **G-2** | `grep -c 'NO-WAVE-OWNER' registry/adjudicated/kf-*.md` | **YES, exactly.** 58 records · **57** carrying the token · **1,216** occurrences. Right-hand leg also confirmed: `ls waves/` = 11 files (W0..W10); **KF-W11/W12/W13 have no spec file**, so the right-hand union is genuinely not computable — the RED is real and narrow |
| **G-3** | `git show origin/master:docs/tranches/V/OWNER-DECISIONS.md` `:7`,`:9`; `INTAKE-ADJUDICATION-2026-08-03.md:232` | **YES, verbatim.** `:7` = *"**THE TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW.**"*; `:9` = *"**THE AT-REST REOPEN QUESTION IS DEFERRED PENDING GLASS'S DOCK MARK.**"*; `:232` = the OG-KF1 row, *"(Joins OD-V3/OD-V5 in KF.W10's owner block.)"* |
| **G-4** | `grep -rnE '357/414\|86\.23\|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/` | **runs; output misreported.** Actual **53 hits / 23 files**, spec says 51/23. Partition is right (3 live-spec · 1 conformance · 19 substrate) and the substrate class reproduces **exactly** (19 files / 34 hits); the live-spec class is 14 not 12 because this file now contributes **10**, not the stated 8. See D-6 |
| **G-5** | `r-animation-sota.md:107/:109/:253` · `lane-22-perf-demo-runtime.md:110-112` · `U.D.md:194` · `home.json:9`,`:2`,`:13`,`:16` · `home.md:67`,`:187-191`,`:367` | **YES — every one, at `origin/master`.** `:107` is the `### G26-3` heading, `:109` the `- **Where (verified):**` bullet carrying the falsified DISCHARGED claim, `:253` the ledger row. `home.json:9` = the `proof:cursor-light-subtle` sanctioned entry; `proof:hero-two-focal` occurs at exactly `:2`, `:13`, `:16`; `:11` is the bare `"forbidden": [` opener, so the declared `:11`→`:2/:13/:16` re-anchor is **correct**. The three-way zero-hit finding survives: `git grep -l` under `scripts test src` returns **0** for each of `proof:cursor-light-subtle`, `proof:hero-two-focal`, `proof:appearance-suffusion` |
| **G-6** | value `INBOX.md` + kf `INBOUND-LEDGER.md` / `DISPOSITIONS.md` | **paths YES** (`git cat-file -e` resolves both kf ledgers). **Measurement NO** — the cited bytes and line anchors are the 2026-08-04 file. See D-5 |
| **G-7** | `git ls-remote --heads origin \| grep w9` | **YES, exactly.** `b920b1902b4854c1bc7c5778d1674436dd51dce6  refs/heads/v/w9-staging` — live, pushed, unmerged |

Substrate facts re-measured and **all exact**: kf `HEAD` = `8281638c`, `origin/master` =
`81a56990`, `git rev-list --left-right --count HEAD...origin/master` = **1 / 41**,
`git status --porcelain | wc -l` = **252**. Proof roster: `origin/master` **THREE**
(`proof:structure`/`publish`/`owner-golden` at `:50`/`:51`/`:52`), `8281638c` **TWO**
(`:49`/`:50`) — the §2b KF-HA-4 correction is right, and the bank's *"exactly 2"* was indeed the
stale-checkout count. VM-4: `package.json#version` = `6.0.0`; CHANGELOG head `## 6.0.0` at line
**6**, no Unreleased. **No phantom script or path was found in any gate.**

---

## §4 — E-3 + STATUS

| check | result |
|---|---|
| `**Status**: planned` | **PASS** (`:23`) |
| VERIFIED count | **PASS — zero.** Four-verb table `:32` = `VERIFIED \| **NO**`; R-A (`:34`) makes W10 the sole stamping site and stamps nothing now |
| IMPLEMENTED | **PASS — NO** (`:31`) |
| SPECIFIED | **PASS with the R-18 scope sentence** — file-scope YES, **X·KF sub-tranche-scope withheld pending COHESION §0c**, stated identically in the header block, OP-6 and §6.C-E. Verified: `grep -c '§0c' docs/tranches/X/COHESION.md` = **0** — the precondition is genuinely unmet and the file says so |
| product source in bounds | **PASS** — §4's 15 bounds rows are all `docs/` paths, one branch, and the sibling four-verb rows; §4's EXPLICITLY-NOT-IN-BOUNDS block names product source, `scripts/dev/dev.sh` and any glass-ui tree |
| E-3 addenda-not-patch | **PASS** — §3.4 ("beside — never inside"), §4 (`append-only` on all six kf doc paths, `home.json` addendum in a **sidecar** because JSON takes no inline comment), G-5 acceptance (`git diff` empty on the four originals), G-5 falsifier (one changed byte fails) |
| dated sections rewritten | **PASS** — COHESION is `modify-carve` on §1/§3/§4/§5 only, "dated sections never rewritten" |

---

## §5 — POSTURE

| axis | result |
|---|---|
| **KF.W4 sequencing head honored** | **substantively YES, by a phantom anchor.** §6.B and §6.C-C both name the head law and bind `G-KFW4-1` before every unit `.a`..`.g`. But both cite `KF-W4.md:193`; the law is at **`:223`**. See D-3 |
| **KF.W3 gated-unscheduled** | **honored in three places, contradicted in one.** §6.C-G (*"W10 RECORDS, never schedules"*), §7 (*"Gate-keyed PLAW-BIND, never scheduled"*) and §7's KF-HA-19 row all hold. §1's "Opens after … **KF.W2..W9 IMPLEMENTED**" sweeps in `KF-W3.md:1` — *"Parser Consumption (GATED, never scheduled)"* — without carve-out. See D-7 |
| **KF-AV-28 rider present wherever governed rows are cured** | **PASS.** W10 spends no cure; the rider is carried verbatim in its other capacity (G-2 sweep input) per R-10's KF-W10 line |
| **PASS-1 rulings addressed to KF-W10 applied** (R-10 · R-14 · R-15 · R-18) | **all four applied, spot-checked against RULINGS' own text.** R-10 → byte-identical clause, §3.2 bullet 7 + G-2 acceptance ✓. R-14 → record-only, §2b + §3.1 CARRY-FORWARD block + §8, G-1 denominator held at 15, "terminal RECORD, not a receiving surface" carried ✓. R-15 → the 17-packet roster (KF.W11 ×9 · KF.W12 ×6 · KF.W13 ×2) replaces the over-stated escape list; amiga retired as an escape; the AT cluster retired per R-1e, whose seven-item enumeration W10 reproduces **exactly** (`RULINGS.md:61-70`) ✓. R-18 → OP-6/§6.C-E/§9.2 re-anchored on §0c, recommended owner SS-2 with grounds, cure shape quoted, PASS-1 D-9's self-stamp tension dissolved by the file-scope/sub-tranche-scope split ✓ |
| **COHESION §0b consumed correctly** | **PASS.** `COHESION.md:156` = *"§0b ADDENDUM 2026-08-28 — KF.W3 OWNERSHIP CURED"*; §1's SS-1/SS-2 rows at `:33`/`:34` match the file's quotation; KF.W10 is absent from both |
| **provenance citations into the megatranche substrate** | **PASS, every one checked.** `INTAKE-ADJUDICATION:82` (three unlocatable externals), `:115` (C-7, 357/414), `:116` (C-8, 0/5-vs-0/4), `:163-166` (the `### KF.W10 · Fold Discharge & Close` block), `:232` (OG-KF1); `CENSUS:154-156`, `:314`, `:326` (the KF.W10 row naming exactly B18-12/13/14 + the 357/414 block + B18-27), `:336-338`; kf `lane-docs.md:141` (15 numbered rows), `:154-157` (OD-V3/OD-V5 unruled), rows 12/14/16 at `:376`/`:378`/`:380`. No drift |

Note, not a defect: §3.1 row 6 and §8 say **IN-ATLAS-5** while §3.6 says **IN-ATLAS-3** for the
TimingFunction fence. Both are faithful to their own sources — FOLD-FORWARD `§B-6` says
*"IN-ATLAS-5 census"*, lane-docs row 14 says *"IN-ATLAS-3 fence"*. Two records, one fence.

---

## §6 — DEFECTS (worst first)

### D-1 · **BLOCKER** — three items routed to KF.W10 by the sole in-tree carry escape whole

`KF-W6-CARRY.md:361` routes **five** items to KF.W10. Two are carried. Three —
*"the census S-9/S-10 extensions terminalized"*, *"the `.tap-floor` adopt-or-delete ruling
recorded"*, *"the `/command` decision record filed so the census stops re-raising it"* — appear
nowhere in the spec and are not excluded with a reason.

**Receipt**: `grep -c 'tap-floor' KF-W10.md` = **0**; `grep -c '/command' KF-W10.md` = **0**; the
only `S-9`/`S-10` matches in KF-W10.md are the substring `SS-10b` at `:29`, `:111`, `:132`, `:380`.
Source rows: `KF-W6-CARRY.md:83` (`.tap-floor` dead 44px utility, KF-CB-25 pinned count),
`:174`–`:177` (the S-9 quartet), `:179` (S-10 · KSM C-9, *"cure = RECORD THE DECISION so the census
stops re-raising it. A wave product, not a code change."*), `:268` (G-W6-4 measures `.tap-floor` →
**0 adopters**). `§7 §Excluded` has 13 rows and names none of them. The carry file's mtime is
**10:49**, the spec's **12:43** — no drift excuse.

This is the failure §2 declares the wave exists to prevent: *"It fails if any obligation closes by
omission."* Three do.

### D-2 · **MAJOR** — a quotation attributed to `KF-W4.md:198` exists nowhere but inside this file

§2b `:70` asserts, in quotation marks and with *"verified this seat"*, that `KF-W4.md:198` homes the
amiga packet — *"the cube, sequence, spring, square and amiga scene packets"*. **Receipt**:
`sed -n '198p' KF-W4.md` = `|---|---|---|---|---|` (a bare table separator). The homing is at
**`:233`**, and its wording is a bulleted roster — *"**KF.W11 · Demo Scene Repair (9)** — cube ·
sequence · spring · **spring-plot** · **spring-physics-facet** · **spring-artifact-truth** · square
· amiga · **drag-seam**"*. `grep -rn 'cube, sequence, spring, square and amiga' docs/tranches/X/`
returns **one** hit: `KF-W10.md:70` itself. The claim is retired (amiga *is* claimed) but the quote
is a paraphrase presented as a quotation — the exact defect this file books as never-cite entry (7)
against kf-EditorHeader. `:198` is cited a second time at `:224`.

### D-3 · **MAJOR** — the sequencing-head law is cited to a line that holds a different gate

§6.B `:324` and §6.C-C `:334` both quote `KF-W4.md:193` for *"This wave is the declared sequencing
head of X·KF. No repair packet and no UNIT may open before **G-KFW4-1** lands."* **Receipt**:
`sed -n '193p' KF-W4.md` = the **G-KFW4-12 manifest-hygiene gate row**
(`node scripts/gates/census.mjs --clause manifest` … `monaco-themes` deleted). The law lives at
**`:223`**. The substance is honored; the anchor is not, and §6.B's own framing — *"transitive
satisfaction of a law the spec never names is indistinguishable from ignorance of it"* — makes the
anchor load-bearing.

### D-4 · **MAJOR** — OP-5 declares the denominator tree clean; it is not, and its byte figures are the committed state

OP-5 (`:56`, a **hard** precondition) states *"the tree is clean under `git status --porcelain --
docs/tranches/X/keyframes/`"* and sizes four siblings at KF-W1 **48,834 B** · KF-W5 **99,277 B** ·
KF-W6 **95,645 B** · KF-W9 **70,875 B**. **Receipt**: `git status --porcelain --
docs/tranches/X/keyframes/` returns **11 modified** wave specs (all of W0..W10). Worktree bytes are
**65,138 / 116,903 / 120,949 / 107,502**. The four quoted figures are exactly the sizes at commit
`acff6265` (11:53) — i.e. `git show` state, not tree state. KF-W1's mtime is **12:41**, two minutes
before the spec's own 12:43 repair, so the tree was already dirty when "clean" was written. OP-5
exists precisely to fix G-2's denominator; its falsifier is *"A table computed against a sibling
bounds block that changed after the sweep fails on OP-5."*

### D-5 · **MAJOR** — G-6's witness is the 2026-08-04 INBOX, stamped "measured read-only 2026-08-28"

§2b `:83` and G-6's Witness `:285` state INBOX.md *"measured 52,543 B — the four `UNREAD` hits at
`:4`/`:5`/`:17`/`:27` are law-preamble text, not status rows"*. **Receipt**: `wc -c` = **56,702**;
`grep -n UNREAD` = **five** hits at `:4`, `:5`, `:19`, `:29`, `:95`. `git show
03e4bfef:…/INBOX.md | wc -c` = **52,543** with UNREAD at exactly `:4`/`:5`/`:17`/`:27` — commit
`03e4bfef` is dated **2026-08-04**. Two later commits (`48003630`, `7a7dc6ef`, both 2026-08-28
12:32/12:33 — before the 12:43 repair) moved the file. §5's blanket *"All seven born-RED with the
failing probe measured read-only 2026-08-28"* is false for G-6. The **substance survives**: the
fifth hit at `:95` is prose inside O-20's disposition cell (*"two UNREAD glass 08-09 letters found
this boundary — rowing owed to the main session"*), already discharged by `7a7dc6ef`, so "zero
UNREAD status rows" still holds. Four cited coordinates do not resolve.

### D-6 · **MINOR** — G-4 misreports its own witness output by two hits

`:251` — *"The command returns **51 hits across 23 files**"*; `:259` — *"this file alone contributes
8"*. **Receipt**: the grep returns **53 hits / 23 files**, and `grep -c` on KF-W10.md returns
**10**. The class table's live-spec row therefore reads `3 | 12` where the tree says `3 | 14`. The
substrate class (19 / 34) reproduces exactly, and the partition — which the gate declares to be its
actual subject — is correct, which contains the damage. But the file's own indictment of the
authoring text was *"a gate whose acceptance is 'grep returns zero bare citations' cannot be closed
against a witness whose own output the spec misreports"*; the repair reduced the error from
seventeen files to two hits rather than eliminating it.

### D-7 · **MINOR** — §1's open condition requires a GATED-never-scheduled wave to be IMPLEMENTED

§1 `:20`: *"Opens after … **X.KF.W2..W9 IMPLEMENTED**"*. `KF-W3.md:1` is titled *"KF.W3 — Parser
Consumption (**GATED, never scheduled**)"*, and W10 itself books the gate at §6.C-G / §7 as
gate-keyed PLAW-BIND that *"W10 stamps … and stops"*. No carve-out is written, so read literally
W10 cannot open until a wave the program has declared unschedulable is IMPLEMENTED. Partially
inoculated by the following sentence (*"The dependency is on the artefacts, not the labels — §2a
checks each"*) and by OP-5, which restates the same precondition as the weaker *"KF.W2..W9 **bounds**
are FINAL"* — two spellings of one precondition, in a file that legislates one spelling per anchor.

### D-8 · **MINOR** — the agent/gate mapping in §1 contradicts §3

§1 `:21`: *"6 Opus units, serial (`.a` → `.f`; **each maps to exactly one gate**)"*. §3.3 is titled
*"`.c` — the owner block and the never-cite register (**G-3, G-4**)"*, and §4's Disjointness
paragraph assigns `.c` both `OWNER-DECISIONS.md` and the register. Seven gates, six lettered units:
`.c` carries two.

---

## §7 — SUPERLATIVES (recorded; L-18 runs both ways)

1. **Every gate witness that could be a phantom, is not.** Seven gates, ~30 distinct commands and
   coordinates across two repos re-run this seat; the FOLD-FORWARD §B geometry (line 30 / line 48 /
   15 rows), the 58-57-1,216 census, both OWNER-DECISIONS quotations, all ten G-5 doc anchors, the
   two proof-roster counts (3 at `origin/master`, 2 at `8281638c`), VM-4's 6.0.0 pair, and the
   `b920b190` branch head reproduce **exactly**. That is a very high hit-rate for a file this size.
2. **The `:11` → `:2`/`:13`/`:16` re-anchor is right, declared, and states its own reason.** So is
   the `:107` → `:109` restoration. A spec that publishes its own corrections as corrections, with
   the superseded spellings struck by name, is doing what the re-anchor law was written for.
3. **R-14's record/act distinction is held in all three places it appears**, including the hardest
   part — keeping the carry-forward record *out* of G-1's denominator so a 15-row gate stays a
   15-row gate.
4. **The KF-HA-4 roster correction is a bank-contradicting self-correction with receipts**, and it
   explicitly says the substantive finding survives the corrected premise rather than quietly
   re-grading it.
5. **The never-cite register's seventh entry is restated, not transcribed.** Discovering that a
   killed claim was killed on a repo-scoped `ls` — and re-verifying the coordinate live in the
   *other* repo — is the difference between carrying a bank and auditing it.

---

## §8 — LOCAL VERDICT

**DEFECTIVE.**

| | |
|---|--:|
| routedTotal | **9** |
| booked | **6** |
| escaped | **3** |
| BLOCKER | 1 |
| MAJOR | 4 |
| MINOR | 3 |

The spec's substrate work is strong and its gates are genuinely born-RED against witnesses that
reproduce. It fails this pass on two independent grounds: (i) **D-1**, three obligations routed to
this wave by the in-tree carry close by omission — the precise failure §2 names as fatal; and
(ii) the anchor/measurement class **D-2..D-5**, in which a file that legislates the re-anchor law
four times quotes a sentence that does not exist at the line it names, cites a gate row as a
sequencing law, calls a dirty tree clean inside a hard precondition, and dates an 08-04 measurement
08-28. Each is repairable without re-architecting the wave.
