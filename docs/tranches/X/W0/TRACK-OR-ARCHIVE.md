SERVED MODEL: claude-opus-5[1m]

# X-W0.a — TRACK-OR-ARCHIVE: the disposition of every untracked tree under `docs/`

**Unit**: X-W0.a (Track A · X·V) · **Wave**: X-W0 · **Date**: 2026-09-17 · **Branch**: `tranche-u`
**Row discharged**: CC-012 (origin DR-23), verb BUILD.
**Spec**: `docs/tranches/X/waves/W0.md` §Agent Units "X-W0.a" `:144–149` · §Scope 1 `:24` · HG-1 `:221–225` · HG-2 `:226–229` · §Commit Plan row 1 `:371`.
**Fold layer**: `docs/tranches/X/refinement/X-W0-FOLD.md` **G-G** `:533–544` · §3 BoundsDelta **4** `:564` · **5** `:565`.
**Gates turned here**: **HG-1** · **HG-2** · **G-G**.
**HEAD at this unit's census freeze**: `fa9597cd` ⟨`git log --oneline -1`⟩ → `fa9597cd docs(x-p-w0/record): X.P.W0.b record-commit note — receipts absorbed by a10e33ad, verified intact`.

---

## §0 What this file is, and what it is not

The wave's goal criterion is that **no claim this tranche will rely on rests on a byte the owner cannot see**. This unit is the one act that changes a path's tracked/untracked state, and it runs alone and first because every other X-W0 unit reads paths it moves.

This file is the **disposition ledger**: one `TRACK | ARCHIVE | DELETE` row per tree in the open-time census (§2, HG-2's subject), plus the two sections **G-G** adds — **(b)** the dangling-receipt register for instruments tracked canon cites but the tree does not hold (§3), and **(c)** the closure rule for trees created after this commit (§4).

It is **not** an inventory of the trees' contents, and it settles **no** question about what those contents are worth. Two such questions are live and are **returned by name, not answered** (§6).

---

## §1 The open-time census — HG-2's subject

⟨`git ls-files --others --exclude-standard docs/ | wc -l`⟩ → **1825** (double-run: **1825**)

⟨`git ls-files --others --exclude-standard docs/ | cut -d/ -f1-4 | sort -u`⟩ →

```
docs/tranches/T/audit
docs/tranches/V/apotheosis
docs/tranches/W/audit
```

→ **3** trees (double-run: **3**). Frozen **2026-09-17 13:05:17 EDT**. This reproduces the wave-open measurement at `execution/A/X-W0.md` §Baseline HG-1 exactly (1825 files · 3 trees).

Per-tree measures, taken from the frozen listing:

| tree | files | bytes |
|---|---:|---:|
| `docs/tranches/T/audit` | 11 | 44,669 |
| `docs/tranches/V/apotheosis` | 1,798 | 305,427,148 |
| `docs/tranches/W/audit` | 16 | 696,656 |
| **total** | **1,825** | **306,168,473** |

**The census moves under the hand that takes it.** This unit's *first* pass, minutes earlier, returned **1,828** files in **5** trees — the extra two being `docs/tranches/X/keyframes` (1 file) and `docs/tranches/X/parse-that` (2 files), written by the concurrent X·KF and X·P seats. Both were **tracked by their own seats** before the freeze: ⟨`git log --oneline -1 -- docs/tranches/X/keyframes/artefacts/W0/substrate-open.txt`⟩ → `e898b65e docs(kf-w0/op-1): substrate settled …`; ⟨`git log --oneline -1 -- docs/tranches/X/parse-that/evidence/W0/`⟩ → `b69611a8 docs(x-p-w0/census): the eighteen preserved roots …`. All three files verify tracked ⟨`git ls-files --error-unmatch <path>`⟩ → exit 0 ×3. **No act of this unit touched them**, and they are therefore not rows in §2 — they are the measured precedent for §4's rule **CR-2**, and §2.3 records them so nothing is silently dropped.

---

## §2 (a) Disposition — one row per censused tree

| # | tree | files | bytes | **disposition** | reason (one line) |
|---|---|---:|---:|---|---|
| **D-1** | `docs/tranches/T/audit` | 11 | 44,669 | **TRACK** (in place) | The U-gestalt probe scripts and their four probe logs, plus the U/BH communiqué draft, are cited from tracked canon at `docs/tranches/T/audit/pi/w9/q14-close-escalation.md`, `docs/tranches/U/FINAL.md`, `docs/tranches/U/audit/w-visual/lane-a.md` and seven more tracked files — cited evidence that only exists untracked is exactly the byte the owner cannot see. |
| **D-2** | `docs/tranches/V/apotheosis` | 1,798 | 305,427,148 | **TRACK** (in place) | It is the authority layer, not a scratch tree: it holds `OWNER-RULINGS-2026-07-20.md`, `OWNER-RULING-D23-2026-07-20.md`, `parser-proof/` and the 181-prompt corpus **HG-3 pins by path** (`pi/formation/session-audit/raw-prompts/`, 4 files) and **X-W0.b re-authors from**; ARCHIVE is barred because a move breaks those pinned paths, and DELETE is barred by E-3 and by the live X-6 dispute (§6, R-2). |
| **D-3** | `docs/tranches/W/audit` | 16 | 696,656 | **TRACK** (in place) | The A→W tranche-history audit (`history/A-D.md` … `V-vnext.md`, `HISTORY-SYNTHESIS.md`, `DISEASE-REGISTRY.md`, four `CROSS-*.md`) is cited from tracked canon at `megatranche/AUDIT-PLAN.md`, `megatranche/STATE.md`, `excavation/TRUTH-TABLE.md` and seven more — the same class as D-1. |

**Row-set = census set**: 3 rows, 3 trees, exact. **Counts: TRACK 3 · ARCHIVE 0 · DELETE 0.**

### §2.1 Why nothing is ARCHIVEd and nothing is DELETEd

**ARCHIVE — 0.** ARCHIVE is defined at `W0.md:147` as *"move under `docs/tranches/<L>/archive/` and track"*: it relocates bytes, it does not shed them. Every path in this census is **cited from tracked canon at its present path** (D-1/D-2/D-3's reason columns), and one of them — `docs/tranches/V/apotheosis/pi/formation/session-audit/raw-prompts/` — is pinned **by literal path** in a hard gate of this very wave (HG-3 `:232`) and in the mechanism of X-W0.b (`W0.md:153`). A move would turn every one of those citations into a dangling reference: the disease §3 exists to register, manufactured by the cure. Fold BoundsDelta **4**/**5** forbid ARCHIVE for the X sub-session trees for the same structural reason (a live author's paths may not be moved under it); the reasoning generalises, and nothing in this census is stale enough to be an exception.

**DELETE — 0.** E-3 is binding on this seat: *dated specs, the adjudicated registry, conformance artifacts and prior evidence are IMMUTABLE*. Every tree here is prior evidence. The one place tracked canon itself proposes a deletion (P3.1, §6 R-2) is explicitly **gated on an unruled owner question**, and the auditor who proposed it wrote the disposition this seat also reaches: *"the append-only law is the owner's to relax, not mine."*

### §2.2 The interior of D-2, measured (detail — **not** disposition rows)

D-2 carries 99.8% of the census mass, so its interior is stated rather than left as one number. Measured from the frozen listing:

| subtree (under `docs/tranches/V/apotheosis/`) | files | bytes |
|---|---:|---:|
| `pi/` | 1,146 | 278,129,847 |
| `probe/` | 198 | 4,700,869 |
| `snapshot-vnext/` | 187 | 3,751,513 |
| `snapshot-vnext-2/` | 165 | 1,750,375 |
| `armB/` | 52 | 8,732,434 |
| `armA/` | 13 | 378,362 |
| `fable-era/` | 10 | 7,427,131 |
| `parser-proof/` | 8 | 262,968 |
| `post-convergence/` | 4 | 80,431 |
| `armC/` | 4 | 133,224 |
| loose files at the tree root (incl. `OWNER-RULINGS-2026-07-20.md`, `OWNER-RULING-D23-2026-07-20.md`, `RUN-STATE.md`, `CONVERSATION-ADDENDA.md`, the five `madge-*`) | 11 | 79,994 |
| **total** | **1,798** | **305,427,148** |

and inside `pi/`:

| subtree (under `…/apotheosis/pi/`) | files | bytes |
|---|---:|---:|
| `denominator/` | **157** | **255,457,954** |
| `formation/` | 115 | 14,365,941 |
| `mirror/` | 804 | 6,654,239 |
| `cells/` | 14 | 35,384 |
| `waves/` | 8 | 39,106 |
| `evidence/` | 1 | 776 |
| loose `.md` at `pi/` root (`CHARTER.md`, `HANDOFF.md`, `PI.md`, the 22 `ADDENDA-*`, the 7 `FIRST-VERTICAL-AUDIT-*`, the W0–W4 receipts …) | 47 | 1,576,447 |
| **total** | **1,146** | **278,129,847** |

`denominator/` alone is **255,457,954 B over 157 files = 83.4% of the whole census**. That figure is not this seat's invention: it reproduces, **to the byte and to the file**, the figure tracked canon already carries at `docs/tranches/V/megatranche/registry/harvest/v-pi-receiving-audit.json:2644` — *"denominator 255,457,954 B (157 files)"*. Two independent aggregations agreeing to the byte is the strongest evidence this ledger has, and it is what makes §6's R-2 escalation precise rather than rhetorical.

### §2.3 Trees seen in this unit's first pass and closed by their own seat before the freeze

Recorded so nothing is dropped between passes. **These are not disposition rows** — this unit performed no act on them, and they are absent from §1's frozen census set.

| tree | files at first pass | closed by | closing commit |
|---|---:|---|---|
| `docs/tranches/X/keyframes` | 1 | the X·KF seat (Track B) | `e898b65e` |
| `docs/tranches/X/parse-that` | 2 | the X·P seat (Track D) | `b69611a8` |

Fold BoundsDelta **4** (`X/refinement/**`) records the same shape one step earlier: authored during this tranche, **TRACK — never ARCHIVE**, and already tracked at HEAD by its own authoring commit ⟨`git ls-files docs/tranches/X/refinement/ | wc -l`⟩ → non-zero, absent from §1's census. BoundsDelta **5** binds `X/keyframes/**` identically. **All three are closed by CR-2, not by X-W0.a.**

---

## §3 (b) DANGLING RECEIPTS — instruments tracked canon cites that the tree does not hold

**G-G's falsifier, restated**: HG-1's zero *"passes vacuously over evidence that never entered `docs/`"*. A probe whose *output* is quoted in a verdict but whose *script* was never banked is unfalsifiable at exactly the moment someone tries to re-run it. One row per such instrument, each dispositioned **RE-SCRIPT** (→ the named X-W1 seat) or **STRIKE-THE-CITE**.

Absence probe, run once for the first three rows:
⟨`find docs -type f -name 'probe-state.mjs' -o -type f -name 'probe-deadlock.mjs' -o -type f -name 'probe-isolate.mjs' | wc -l`⟩ → **0**

| # | instrument | cited in tracked canon at | on-disk state | **disposition** |
|---|---|---|---|---|
| **DR-1** | `probe-state.mjs` | `megatranche/audit/components/EmptyState/challenge-C-implementation.md:34,65,390` · `registry/DEFECT-LEDGER.md:346,349` · `registry/harvest/area-core.json:3321,3323` · `registry/harvest/area-workbenches.json:9471` | **ABSENT** (probe above → 0) | **RE-SCRIPT → X-W1** |
| **DR-2** | `probe-deadlock.mjs` | `EmptyState/challenge-C-implementation.md:53,390` · `DEFECT-LEDGER.md:346` · `registry/adjudicated/EmptyState.md:21,117` · `registry/harvest/wf_407d36af-fe7.json:2545` | **ABSENT** | **RE-SCRIPT → X-W1** |
| **DR-3** | `probe-isolate.mjs` | `EmptyState/challenge-C-implementation.md:76,158,393` · `DEFECT-LEDGER.md:346,16705,16708` · `harvest/area-core.json` (3 hits) · `harvest/wf_407d36af-fe7.json` (1 hit) | **ABSENT** | **RE-SCRIPT → X-W1** |
| **DR-4** | the **EY-r3 probe scripts** (the `probe9` receipts behind EY-12's remount transcript and EY-20's stale-pin transcript) | `registry/adjudicated/wb-extract-imageeyedropper.md:150` — verbatim: *"the numbers are r3's, whose probe scripts live in a session scratchpad, not the tree"* | **ABSENT**: ⟨`ls …/wb-extract-imageeyedropper/probe/*.mjs`⟩ → `pixels.mjs probe.mjs probe2.mjs probe3.mjs probe4.mjs probe5.mjs probe6.mjs` — **no `probe9`** | **RE-SCRIPT → X-W1** |
| **DR-5** | the **GEN R-5** instrument — the script behind C-7's live *"deterministically failing ×2"* run | `registry/adjudicated/wb-generate-pane.md:53,131` · the axis itself at `audit/components/wb-generate-pane/challenge-C-implementation.md:34,372` | **ABSENT** — the run is dated evidence with no banked script | **RE-SCRIPT → X-W1 (CI half only)**; see the split below |

### §3.1 Why every row reads RE-SCRIPT and none reads STRIKE-THE-CITE

STRIKE-THE-CITE is the right disposition when a citation carries no live weight. **None of these five is in that class**, and each carries its own in-record instruction to re-run:

- **DR-1/2/3** underwrite `registry/adjudicated/EmptyState.md:21`, where **C-1 is OVERRULED → CONFIRMED (BLOCKER)** on those probes' measurements. The same record's residue **U-3** (`:117`) already names the disposition: *"`probe-state.mjs`/`probe-deadlock.mjs` are not banked in `probes/` (only PNGs are). **Re-script and re-run at the next live session**; also the SPA-nav non-recovery claim."* Striking the cite would demote a CONFIRMED BLOCKER on a bookkeeping technicality — the adjudicator explicitly refused that trade at `:21`: *"the un-banked probe script is a re-run residue (U-3), not a verdict downgrade."* ⟨`ls …/audit/components/EmptyState/probes/ | grep -cv '\.png$'`⟩ → **0** of **29** confirms U-3's parenthesis at today's bytes: the directory holds **PNGs only**.
- **DR-4**'s own record names its durable replacement: *"the XP-7/EY-46 flow spec is designed to mint durable replacements"*, and `X/refinement/X-W1-FOLD.md:379` **R18** folds `XP-7 ≡ XW-18 ≡ EY-46` into **one extract flow spec** carried by X-W1. The re-script is already scheduled; this row names the instrument it owes.
- **DR-5** is split at its source and the split is transcribed, not invented — `registry/adjudicated/wb-generate-pane.md:53`: *"→ CI: **X-W1** (CC-031); oracle repair + any unit coverage: **GEN-CLUSTER, NO-WAVE-OWNER**"*, with `:131` adding *"re-run rides the oracle repair (GEN-9)"*. **CI half → X-W1** (CC-031, whose own `scripts/ci/oracle-slate.mjs` is created there — `W1.md:159,218`). **Oracle-repair half → GEN-CLUSTER, NO-WAVE-OWNER**, which is the G-F register's subject and not this unit's to home.

**Receiving seat, named once.** X-W1's oracle slate is `scripts/ci/oracle-slate.mjs`, created at **X.W1.a** (`W1.md:159`, `:178`, `:218`) under **CC-031**, gated by **G-5** (`W1.md:305`). DR-1..DR-5 are handed to X-W1 as *instruments owed*, not as new defects: every claim they underwrite is already adjudicated, and re-scripting restores falsifiability, nothing more.

---

## §4 (c) The closure rule for trees created after this commit

**Why a rule and not a re-run.** Four tracks author concurrently under the 2026-09-17 begin-word. This unit measured the census move **1,828 → 1,825** files and **5 → 3** trees inside a single session (§1, §2.3), in the direction of *closure* — sibling seats tracking their own trees. It will move in the other direction too, every time a seat writes an artefact. G-G states the consequence plainly: *"a zero asserted at close is unreachable while X·KF/X·F author, so the rule must be written, not discovered."*

**CR-1 — this unit's disposition set is frozen.** §2's three rows are the whole of X-W0.a's act, frozen at the 2026-09-17 13:05:17 EDT census over HEAD `fa9597cd`. A tree created under `docs/` after this commit is **not** X-W0.a's to dispose and does **not** re-open it. X-W0.a is not re-dispatched to chase the delta; CR-2 absorbs it.

**CR-2 — the authoring seat closes its own tree, in place, in its own commit.** Any seat, any track, any wave that writes new bytes under `docs/` **git-tracks them at their authored path**, in the same pathspec commit as the receipt that cites them. A seat does not leave evidence untracked for a later census to find. Measured precedent, in this session: `e898b65e` (X·KF closed `X/keyframes/artefacts/**`) and `b69611a8` (X·P closed `X/parse-that/evidence/**`) — both trees appeared in this unit's first pass and were closed by their own seats, with no act by X-W0.a.

**CR-3 — never ARCHIVE a live sub-session tree; TRACK in place is the only disposition while its author is open.** Binding on `docs/tranches/X/keyframes/**`, `docs/tranches/X/parse-that/**`, `docs/tranches/X/refinement/**`, `docs/tranches/X/fourier/**`, `docs/tranches/X/execution/**` and any `docs/tranches/X/**` authored while its sub-tranche is open (fold BoundsDelta **4**/**5**). ARCHIVE moves bytes; a move under a live author breaks the paths that author's own records cite, in the same way §2.1 rules out for D-2.

**CR-4 — HG-1's zero is read as a set-difference against CR-2, never as an absolute.** At any X wave close the reading is:

```
git ls-files --others --exclude-standard docs/          # the live untracked set
  minus every tree whose authoring seat is still open and owns it under CR-2
  =  ∅
```

An absolute zero over a repository with four concurrent authoring tracks is not achievable and asserting one is a false green — the exact shape R.2's law calls out. **The falsifier survives intact**: an untracked tree **with no seat that owns it** is in the difference, fails CR-4, and names itself in the output. That is the whole content of HG-1, preserved.

**CR-5 — where the rule is enforced.** X-W11's close re-runs the census; every tree it finds must resolve to a commit that tracked it, named in its own seat's execution record. A tree with no such commit is a CR-2 breach booked against the seat that wrote it, not against X-W0.a.

**CR-6 — the `.gitignore` shadow is out of this unit's bounds and is stated, not touched.** HG-1's probe carries `--exclude-standard`, so it is blind to ignored bytes under `docs/`. Measured: ⟨`git ls-files --others --ignored --exclude-standard docs/ | wc -l`⟩ → **8,800** — of which **6,384** are `.png` (the repo-root rule `.gitignore:34 *.png`, with `:35 !demo/**/*.png` as the sole exception), **2,385** are under `node_modules/` or `.dts/` (the two nested ignore files `…/apotheosis/pi/mirror/.gitignore` and `…/mirror/prototypes/foundation-g2/candidates/s/.gitignore`, which correctly exclude a vendored dependency tree), and **31** are `*.log`, `.DS_Store` and vendored `dist/` artefacts. The PNG class matters: `registry/adjudicated/EmptyState.md:117` cites `probes/` as holding *"only PNGs"* — those PNGs are visual evidence for adjudicated verdicts and **git cannot see a single one of them**. `.gitignore` sits at the repository root, **outside this unit's writable set and outside `docs/`**; this seat therefore measures and reports it and changes nothing. Routed as **R-1** in §6.

---

## §5 Gate readings — BEFORE → AFTER

| gate | probe | BEFORE (2026-09-17 13:05 EDT, HEAD `fa9597cd`) | AFTER (this commit) |
|---|---|---|---|
| **HG-1** | `git ls-files --others --exclude-standard docs/ \| wc -l` | **1825** | **0 over the frozen census set** (§5.1), read per **CR-4**; the live absolute is non-zero and moving under an open seat's hand — §5.2 |
| **HG-2** | one `TRACK\|ARCHIVE\|DELETE` row per censused tree, each with a reason | **file ABSENT** (`docs/tranches/X/W0/` did not exist) | **3 rows / 3 trees, set-equal**, reasons at §2 |
| **G-G** | (a) tree rows + (b) dangling-receipt rows + (c) post-commit closure rule | **all three ABSENT** | (a) §2 · (b) §3, 5 rows · (c) §4, CR-1..CR-6 |

### §5.1 The AFTER reading — HG-1 as CR-4 reads it

Measured against the settled index this commit records (a staged file is in the index, so `--others` already excludes it), **2026-09-17 13:12:05 EDT**:

⟨`comm -12 <(sort <live untracked listing>) <(sort <frozen §1 census listing>) | wc -l`⟩ → **0**

**Every one of the 1,825 files in §1's frozen census is tracked.** Zero remain. That is HG-1's zero, and it is the falsifiable one: drop any tree from §2 and this set-difference is non-empty and prints the paths.

### §5.2 The live absolute is non-zero, by design, and names its owner

⟨`git ls-files --others --exclude-standard docs/`⟩ at 13:12:05 → **1** path; re-run seconds later → **2**:

```
docs/tranches/X/keyframes/artefacts/W0/manifest-four-coordinates.txt   (9,990 B, mtime 13:11:30)
docs/tranches/X/keyframes/artefacts/W0/headerribbon-tripwire.txt       (7,677 B, mtime 13:12:07)
```

Both are **X·KF (Track B) artefacts written after this unit's census freeze**, by a seat that is open right now and that has already demonstrated it closes its own trees (`e898b65e`, §2.3). They are **CR-2's**, not X-W0.a's: CR-1 freezes this unit's set and CR-4 reads the gate as the set-difference above. A count of the live absolute is a number that is false the instant it is written down — it changed between two consecutive runs of the same command while this file was being written — so the durable statement is the one given here: **the frozen census is closed to zero; the residual is one named tree with a named open owner.**

This is not a caveat bolted onto a green gate. It is the finding **G-G** anticipated in terms — *"a zero asserted at close is unreachable while X·KF/X·F author, so the rule must be written, not discovered"* — measured live, in this unit, within seven minutes of its own census.

---

## §6 Residuals and escalations, stated by name

**R-1 — the `.gitignore` shadow (RESIDUAL, out of bounds, not an escalation of this unit's act).** 8,800 bytes under `docs/` are invisible to HG-1 by construction (CR-6). The load-bearing sub-class is the **6,384 PNGs**, which are the visual evidence behind adjudicated design verdicts and which `registry/adjudicated/EmptyState.md:117` cites by name. Curing it means editing the repo-root `.gitignore` — outside `docs/`, outside this unit's writable set, and a product-config byte this formation wave writes none of (fold §3 *"Not added, stated once"*). **Routed**: the wave's L-18 gestalt passes, or X-W11's close, whichever reaches it first. No act taken.

**R-2 — X-6, the 255 MB rejected denominator: an UNRULED owner question that this unit's TRACK does not settle (ESCALATION RETURNED).**

Tracked canon at `registry/harvest/v-pi-receiving-audit.json:2371–2374` carries the dispute in full, verbatim:

> **topic**: *"X-6 — retain or delete the 255 MB rejected denominator"*
> **positionA**: *"FINDINGS G05's append-only law: retain. A failed attempt may never be erased."*
> **positionB**: *"O5 open question 5 and O2-23: retain the eight `*-rejection.json` receipts and the tools (~30 KB) and DELETE the payloads and shards — ~255,457,954 bytes recovered with zero loss of dispositioned truth, since all eight generations carry ZERO_CREDIT and v2/v3 are byte-equal across the 69.5 MB payload for a 1,194-byte header delta."*
> **whatWouldSettleIt**: *"An owner or ADDENDA-09 ruling. My scheduling position (P3.1) follows B, because the dispositioned truth is entirely in the rejection receipts and both payloads already carry them — **but the append-only law is the owner's to relax, not mine.**"*

The scheduling row it produced, `:2395`: *"**P3.1** — Delete the eight rejected `denominator/occurrence-owner-formation-v1..v8` payloads and shards; RETAIN the 11 rejection receipts and the tools (~30 KB). Recovers 255,457,954 bytes with zero loss of dispositioned truth. **[Gated on X-6.]**" — and the credit finding it rests on, `:2147`: *"Rejection upheld: eight `occurrence-owner-formation-v*-rejection.json` files, all `*_ZERO_CREDIT`."*

**Measured here, independently**: `pi/denominator/` = **157 files / 255,457,954 B** (§2.2) — agreeing with `:2644` to the byte and to the file; the two largest members are `occurrence-owner-formation-v3.json` **69,590,643 B** and `-v2.json` **69,589,449 B**, the byte-near-identical twins `:2642` names.

**Why this seat rules TRACK and not DELETE**, stated so the choice is reviewable and not merely defaulted:
1. **X-6 is unruled.** ⟨`git grep -c '255,457,954\|255457954' -- docs/`⟩ → the figure occurs in **one** file, `v-pi-receiving-audit.json`; **COHESION `§0j` does not touch it**, and the wave record's standing law is explicit — *"Anything owner-gated that §0j does not cover is an escalation returned, not a seat decision."*
2. **E-3 binds this seat**: prior evidence is IMMUTABLE. PositionA *is* E-3 wearing the pi-audit's name.
3. **The proposing auditor declined the same act for the same reason**, in the record's own words quoted above.
4. **DELETE is irreversible; TRACK is not.** Tracking makes the bytes visible, which is the wave's goal criterion, and leaves both branches of X-6 open.

**What this TRACK costs the DELETE branch, measured rather than assumed.** The intuition is that tracking 292 MB adds 292 MB to git forever. **It does not, here — the bytes are already in the object store.** ⟨`git count-objects -vH`⟩ before staging → `count: 9103 · size: 202.32 MiB · in-pack: 25736 · size-pack: 190.90 MiB`; after staging all 1,825 census files plus this ledger → `count: 9111 · size: 202.36 MiB · in-pack: 25736 · size-pack: 190.90 MiB`. **+8 loose objects, +0.04 MiB, zero pack growth.** Spot-check of the mechanism: the 69,590,643-byte `occurrence-owner-formation-v3.json` stages as blob `d69892c8…`, which `git cat-file -t` resolves while `.git/objects/d6/9892c8…` does not exist — i.e. **already packed**; likewise `-v2.json`, `OWNER-RULINGS-2026-07-20.md` and `T/audit/pi/u-gestalt/probe.mjs`. ⟨`git log --all --oneline -1 -- …/OWNER-RULINGS-2026-07-20.md`⟩ → *empty*: the content sits in the pack without ever having been reachable from a ref.

**So the honest statement of the cost is narrower than the intuition**: this commit does not *add* the bytes, it makes bytes the repository already carries **permanently reachable**, which forecloses their eventual collection by `git gc --prune`. A later positionB ruling would still recover the working tree in one pathspec, and would forgo only that collection. The gzip figure stands as the order of magnitude for what reachability pins: ⟨`gzip -c …/occurrence-owner-formation-v3.json | wc -c`⟩ → **9,707,382** (7.2:1), with the v2/v3 twins delta-compressing against each other.

**The escalation, in one executable sentence**: *X-6 wants a word — retain (positionA, the branch landed here) or delete-the-payloads-keep-the-receipts (positionB/P3.1).* On a positionB ruling the act is one pathspec:

```
git rm -r --cached docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v*.json \
                   docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v*.shards
# then remove from the working tree; RETAIN every *-rejection.json receipt and the tools (~30 KB)
```

**Returned to**: X-W0.g's sitting packet as a docketed row (it is not one of §0j.A's seven and must not be presumed into them), or the owner directly. **No act taken here.**

---

## §7 Provenance

Every figure in this file was read from settled bytes and double-run where it is a count. The census listing was frozen to a scratchpad file before any staging occurred; §5.1's AFTER figures are read from the **settled index this single commit records** — a staged path is in the index, so `--others` already excludes it — never predicted, and re-verified against the committed tree in this unit's receipts at `docs/tranches/X/execution/A/X-W0.md` §X-W0.a. The unit's **ONE-commit** lock is why the AFTER reading is taken at the index rather than appended afterwards. The three trees are tracked **in place**: no file was moved, renamed, or deleted by this unit, and `git diff --name-only` over this unit's commit intersects `docs/tranches/V/megatranche/registry/adjudicated/` **nowhere** (fold **G-H**).
