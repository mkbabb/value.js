SERVED MODEL: claude-opus-5[1m]

# SITTING DOSSIER — 2026-09-17 (tranche X begin-word)

**Seat**: SITTING-DOSSIER (gathering seat). **This file RULES NOTHING.** Every block below is
an owner-gated decision that one of the four root waves — X-W0 (X·V) · KF.W0 (X·KF) · F.W0 (X·F) ·
X.P.W0 (X·P) — or its immediate successor needs *before or at opening*, enumerated from the spec
bytes, with a read-only measurement taken **this seat, 2026-09-17** beside each.

**Substrate of every measurement in this file**: value.js `tranche-u` @ `85e86a73`;
keyframes.js `8281638c` (origin/master `81a56990`); fourier-analysis `cd26c65`;
parse-that `ef10d5b`. Sibling trees read-only: no write, no stash, no reset, no install.

**ALREADY RULED — cite, never re-open** (these are NOT items below):

| id | ruling | authority |
|---|---|---|
| **G-9** (X·P adoption-gap disposition) | **C** — close `BLOCKED-ON <condition> + <re-trigger>`, re-trigger `RC-P` → payload A | `COHESION.md` §0i.1, commit `014d62c8` |
| **X-W0.j** glass election | **8.0.0**, registry-pinned `v8.0.0@17a11bc5` (9.0.0 removes `./search`, consumed at 4 live sites) | `COHESION.md` §0i.2 |
| **ESC-1 / F.W1 G1** | **8.0.0 @ `17a11bc5`** — same hash as X-W0.j | `COHESION.md` §0i.3 |
| §0i.2 receipt (3) | overstated; corrected at §0i.5 erratum `5c5589c0` | `COHESION.md` §0i.5 |

**Escalation slate that governs this sitting** ⟨cmd⟩ `sed -n '59,69p' docs/tranches/X/waves/W0.md`:
the fourth bullet is the sitting's own tripwire — *"**Owner-sitting non-occurrence.** If the X-W0.g
sitting does not happen on its scheduled date, the wave does not silently re-name the rows (the
FM-21 failure); it triumvirates on scheduling."* The fifth: *"**Repin-census PASS, or any cut
attempted under it.** … performing any part of the atomic cut here … invalidates the wave."*

Item count: **28** (27 owner-gated decisions + BRANCH-TOPOLOGY).

---

## PART A — X·V root (X-W0.g the owner sitting packet) — the seven owner rows, CC-014 / DR-29

The packet's own framing ⟨cmd⟩ `sed -n '188p' docs/tranches/X/waves/W0.md`:

> *"one scheduled session, dated at wave-open, with a rendered artifact per row. Rows: DR-16
> (taste certification), DR-19 (the vnext `proof:` sites, re-measured, before any adoption), DR-20
> (the PARK set), DR-24 (`scripts/dev/dev.sh` commit-or-restore), DR-31 (the NCSU 301), DR-14's
> retirement trigger, and the U-F12 Pole A/B pick. Each returns LANDED-AS-RULED or RETIRED."*

Born-RED at HG-13 ⟨cmd⟩ `sed -n '302p' docs/tranches/X/waves/W0.md`: *"**BORN-RED**: 0/7 ruled;
DR-29 records these attested zero times while their gating events fired twice (glass v5.0.0
2026-07-15, v7.0.0 2026-07-17)."*

---

### XV-DR19 — the vnext `proof:` sites, and the structural ban in canon

- **Owning spec:line** — `docs/tranches/X/waves/W0.md:188` · `:293` (HG-12 probe row) ·
  `docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md:76` (CC-019)
- **Question, the spec's words** ⟨cmd⟩ `sed -n '76p' docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md`:
  > *"**RETIRE** — owner ruling on the vnext 81 BEFORE any adoption (X-W0 sitting) + structural
  > grep-checkable ban in canon: no `scripts/**/proof-*.mjs`; invariants live in
  > types/tsc/eslint/tests."*
- **Options as enumerated**: (a) RETIRE the vnext `proof:` band wholesale + land the grep-checkable
  structural ban in canon; (b) LANDED-AS-RULED — adopt some/all of the vnext sites, which must
  precede any adoption act. No third option is spelled.
- **Spec's own default/recommendation** — the ledger row's verb is **RETIRE**; W0.md:188 adds
  *"The DR-19 ruling lands with a grep-checkable structural ban in canon (no `scripts/**/proof-*.mjs`)."*
- **Downstream cost** — RETIRE: X-W0.f writes the CC-019 tombstone, canon gains one ban line, no
  wave moves. ADOPT: every vnext `proof:` site becomes X-W9/X-W11 gate cargo and the library band's
  structural cleanliness (0 `proof-*.mjs`) is reversed — a direct contradiction of the owner's
  2026-06-02 deletion of the idiom (memory: *"overfit junk"*).
- **Needed to rule / MEASURED 2026-09-17** —
  `grep -rn 'proof:' docs/tranches/V/vnext/ | wc -l` → **69** (the ledger's carried figure was 81;
  FM-22 re-measure confirmed at 69, matching W0.md:293's own re-measure).
  `ls scripts/gates/proof-*.mjs scripts/ci/proof-*.mjs` → **0 files** — the library band is
  structurally clean in both directions.

---

### XV-DR20 — the PARK set (`Color.try()` · usePaletteStore migration · S.H3 Pratt)

- **Owning spec:line** — `W0.md:188` · `:294` · `CARRY-CUT-LEDGER.md:77` (CC-020)
- **Question** ⟨cmd⟩ `sed -n '77p' …/CARRY-CUT-LEDGER.md`:
  > *"thresholdless triggers moving both directions across four closes | **RETIRE** — owner ruling
  > in the X-W0 sitting; `Color.try` largely superseded by the Result-returning v4 surface (except
  > exactly where DR-12 throws)."*
- **Options**: (a) RETIRE the PARK set (the trigger metric is zero in both directions);
  (b) LANDED-AS-RULED — re-park with a *stated threshold*, since "thresholdless" is the named defect.
- **Spec's default** — **RETIRE**; the ledger states the supersession reason inline.
- **Downstream cost** — RETIRE: one tombstone at X-W0.f; nothing else moves. RE-PARK: a threshold
  must be authored, and X-W9's library-band gates (33 conditions) gain a row they were not sized for.
- **Needed to rule / MEASURED** — `grep -rn 'Color\.try' src/ demo/ test/ | wc -l` → **0**.
  The trigger metric is zero; the ruling is cheap and is owed only as a word.

---

### XV-DR24 — `scripts/dev/dev.sh`, commit-or-restore

- **Owning spec:line** — `W0.md:295` · `W0.md:101` · `CARRY-CUT-LEDGER.md:78` (CC-021) ·
  `W11.md:102` (NEVER-touch stands until ruled)
- **Question** ⟨cmd⟩ `sed -n '78p' …/CARRY-CUT-LEDGER.md`:
  > *"last unowned dirty working-tree row | **RETIRE by assignment** — X-W0 owns it; owner rules
  > commit-or-restore at the sitting; the NEVER-touch posture stands until ruled."*
- **Options exactly as enumerated**: (a) **commit**; (b) **restore** (`git restore`). Two, no third.
- **Spec's default** — none stated; the posture until the ruling is explicit: *"NEVER-touch stands."*
- **Downstream cost** — Either ruling frees X-W1 (`package.json` scripts-block carve),
  X-W9 and X-W11 from the standing "never stage `scripts/dev/dev.sh`" law. Leaving it unruled keeps
  one dirty row in every `git status` receipt every wave pastes for the whole tranche, and X-W11's
  close correspondence has to explain it.
- **Needed to rule / MEASURED** — `git status --porcelain -- scripts` → ` M scripts/dev/dev.sh`
  (one row, unchanged since 2026-08-03). No other `scripts/` path is dirty.

---

### XV-DR31 — the NCSU alias 301

- **Owning spec:line** — `W0.md:296` · `CARRY-CUT-LEDGER.md:80` (CC-023)
- **Question** ⟨cmd⟩ `sed -n '80p' …/CARRY-CUT-LEDGER.md`:
  > *"'no ncsu alias' order closed by a permanent 301 | **RETIRE** — owner ruling in the sitting:
  > accept the 301 in canon, or remove on the next host session with a date; no 'banked until VPN'
  > fourth ledger."*
- **Options exactly as enumerated**: (a) **accept the permanent 301 in canon**; (b) **remove the
  alias on a dated host session**. The spec forbids a third — *"no 'banked until VPN' fourth ledger."*
- **Spec's default** — W0.md:12 states the disposition is executable without the probe:
  *"whose disposition (accept the 301 in canon) is executable without it."*
- **Downstream cost** — ACCEPT: one canon line + tombstone, zero host work. REMOVE: a dated host
  session outside every wave's bounds, and X-W11's production re-probe (G6) must be re-pointed.
- **Needed to rule / MEASURED (the spec marked this `MEASURE-AT-OPEN`, VPN-gated — it is reachable
  today and is measured here rather than fabricated)** —
  `curl -s -o /dev/null -w "%{http_code} %{redirect_url}" https://mbabb.fi.ncsu.edu/colors/`
  → **`301 https://color.babb.dev/`**. The 301 is live and permanent; the alias resolves.

---

### XV-DR14 — the `siblingFsAllowTransient` retirement trigger

- **Owning spec:line** — `W0.md:188` · `CARRY-CUT-LEDGER.md:73` (CC-016)
- **Question** ⟨cmd⟩ `sed -n '73p' …/CARRY-CUT-LEDGER.md`:
  > *"'transient' carve-out unre-evaluated across 14+ closes | **RETIRE** — evaluate the trigger
  > ONCE at X-W0 against installed glass 7.0.0: delete, or rename with owner-recorded rationale; a
  > variable named 'transient' may not survive X."*
- **Options exactly as enumerated**: (a) **delete**; (b) **rename with owner-recorded rationale**.
  The constraint is absolute: *"a variable named 'transient' may not survive X."*
- **Spec's default** — none between the two; the *survival* of the name is ruled out either way.
- **Downstream cost** — DELETE touches `vite.config.ts`, which is `.github`/config-adjacent and
  sits outside X-W0's bounds (W0.md:101 forbids `vite.config.ts`) — so the act routes to **X-W1**
  (the only wave holding a config carve). RENAME is the same routing at lower blast radius.
- **Needed to rule / MEASURED** — installed glass:
  `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → **7.0.0**.
  `grep -rn 'siblingFsAllowTransient' --exclude-dir=node_modules --exclude-dir=docs .` → **2 sites,
  one file: `vite.config.ts`**. (155 hits repo-wide; 153 of them are `docs/`.) The blast radius is
  two lines in one config file.

---

### XV-DR16 — HG6 taste certification

- **Owning spec:line** — `W0.md:188` · `CARRY-CUT-LEDGER.md:75` (CC-018)
- **Question** ⟨cmd⟩ `sed -n '75p' …/CARRY-CUT-LEDGER.md`:
  > *"verdict file byte-identical empty across three closes; 19/20 brackets silently dropped, now
  > stale | **RETIRE** — tombstone at X-W0; if taste certification is still wanted, X-W10 derives a
  > fresh SMALL bracket set with a dated owner sitting."*
- **Options exactly as enumerated**: (a) **RETIRE** with a tombstone at X-W0; (b) RETIRE *and*
  commission **a fresh SMALL bracket set at X-W10 with a second dated owner sitting**.
- **Spec's default** — **RETIRE**; (b) is conditional on the owner still wanting the certification.
- **Downstream cost** — (a): X-W0.f writes one tombstone; X-W10 is untouched. (b): X-W10 gains an
  unsized authoring band *and* a second sitting must be scheduled, which is the same FM-21
  scheduling-failure shape HG-13 exists to prevent.
- **Needed to rule / MEASURED** — the ledger's own witness is the defect (*"byte-identical empty
  across three closes"*). No further measurement changes the two options; what the sitting needs is
  the want/don't-want word.

---

### XV-UF12 — the Pole A/B pick (dark-scheme derived-tint muddiness)

- **Owning spec:line** — `W0.md:188` · `W0.md:301` · `docs/tranches/U/FINAL.md:50`
- **Question** ⟨cmd⟩ `sed -n '50p' docs/tranches/U/FINAL.md`:
  > *"**ANNEX-OWNER-ATTEST · owner-ruling bracket Pole A/B UN-PICKED** `be807ce` — Pole B
  > (C3-compliant) met as-built (C 0.0216); Pole A at its RED pole (needs a C3-ledger amendment);
  > pole + clean/muddy read owner (OA-4). Coupled to U-F26 dock-icon 2.26:1."*
- **Options exactly as enumerated**: (a) **Pole A** — requires a C3-ledger amendment (Pole A sits
  at its RED pole today); (b) **Pole B** — C3-compliant, **met as-built** (C 0.0216).
- **Spec's default** — none declared; but Pole B is the only pole already satisfied by the built
  tree, and U.W-VISUAL closed with the bracket un-picked.
- **Downstream cost** — POLE B: zero build work, the U-F26 dock-icon 2.26:1 residual discharges
  against it, and X-W4's styling band inherits nothing. POLE A: a C3-ledger amendment is authored
  (a canon edit outside X-W0's bounds) and the dark-accent work re-opens inside X-W4, with
  `FORMATION-VERDICT.md:286`'s BR-7 POLE-CONDITIONAL leg re-firing.
- **Needed to rule / MEASURED** — `docs/tranches/U/FINAL.md:50` re-read this seat; the bracket is
  still **UN-PICKED**, and U-F26's `6667eb05` cure (1.19→4.31:1 dark) left the **dock-icon 2.26:1**
  residual explicitly riding this pick ⟨cmd⟩ `sed -n '64p' docs/tranches/U/FINAL.md`.

---

## PART B — the FORMATION-BOUNDARY packets and the G-F residuals (RUNBOOK §4.3 / §4.4)

### XV-FB — the four FORMATION-BOUNDARY packets, sitting-elected

- **Owning spec:line** — `docs/tranches/X/EXECUTION-RUNBOOK.md:517-529`
- **Question** ⟨cmd⟩ `sed -n '519,521p' docs/tranches/X/EXECUTION-RUNBOOK.md`:
  > *"Fold §1: **19 packets terminal = 15 HOMED + 4 FORMATION-BOUNDARY** (W-HYGIENE counted HOMED,
  > one limb at the boundary). Every FORMATION-BOUNDARY booking names the G-F register as its
  > landing and **the X-W0 sitting as its elector** — sitting agenda, not wave cargo."*
- **Options as the table enumerates them** (the election is *per packet*, five rows):
  1. **PRE-X MT-REGISTER** (2026-07-27 cohort) — *"the per-record MT-*→X mapping; the same cohort
     as §4.1's zero-residue gap"*.
  2. **BOUNDARY-SCOPE** (AboutPane AB-4/AB-5) — *"X-W6's fold books them; disposition is the
     boundary's"*.
  3. **AUTH-SESSION SUBSTRATE** — *"X-W3-FOLD F-4 banks AF-50 NO-WAVE-OWNER"*.
  4. **MIGRATE-DIALOG IDENTITY-FLOW** — *"behind the OWNER-DECISION gate"*.
  5. **W-HYGIENE**, one limb — *"the 8 records that route it in; **silence is not adoption**"*.
  Each packet takes exactly one of: **elect into an X wave** · **book to the G-F register as
  terminal** · **decline with reason**. The runbook forbids the fourth outcome by name for row 5.
- **Spec's default** — none per packet; the *global* default is stated as a prohibition:
  *"silence is not adoption."*
- **Downstream cost** — ELECT: the receiving wave (X-W3 for AF-50, X-W6 for AB-4/AB-5) gains
  unsized cargo after its bounds were sealed at `31dcf279` (UNION-CLEAN), which re-opens the union.
  BOOK-TERMINAL: the G-F register carries them as records; no wave moves; X-W11's 117-row terminal
  walk reads the register rows instead of wave rows. DECLINE: identical to book-terminal but the
  rationale must be written or the row is a silent drop (the failure §2 declares fatal).
- **Needed to rule / MEASURED** — `ls docs/tranches/X/refinement/` → **12 `X-W*-FOLD.md` files**
  (W0..W11), so the fold layer named as the landing exists whole.
  `grep -c 'AF-50' docs/tranches/X/refinement/X-W3-FOLD.md` → **6** — the AUTH-SESSION SUBSTRATE
  banking (F-4 / AF-50 NO-WAVE-OWNER) is real and present; only the *election* is missing.
  **The one packet with no measurable side is #4, MIGRATE-DIALOG IDENTITY-FLOW — it sits behind the
  OWNER-DECISION gate and no probe can resolve it.**

---

### GF-R1 — the ApiOfflineChip transport cluster (MAJOR-bearing, claimant unelected)

- **Owning spec:line** — `EXECUTION-RUNBOOK.md:533-540` ⟨`union/G-F-ADJUDICATION.md` §5⟩
- **Question** ⟨cmd⟩ `sed -n '533,537p' docs/tranches/X/EXECUTION-RUNBOOK.md`:
  > *"**R-1 · the ApiOfflineChip transport cluster — MAJOR-bearing.** Seven rows (AP-12 · AP-17 ·
  > AP-24 · AP-29 · AP-30 · AP-31 · AP-33) absent from the entire X·V fold layer; **AP-17 CONFIRMED
  > MAJOR** (the cooldown gate admits an unbounded burst against docs promising 'ONE probe' twice);
  > `demo/platform/transport/**` has no X-wave claimant."*
- **Options as enumerated**: ▶ *"Book as **G-F slate entry 15** at `X-W0-FOLD.md`'s §8 idiom, all
  seven ⟨record · id⟩ id-for-id; correct COHESION §4's `×5`→`×7` **in the addendum, never in §4's
  bytes**."* The open half is the **claimant question** — which X wave owns
  `demo/platform/transport/**` — *"beside W0.22's `ErrorBoundary.vue` contention."*
- **Spec's default** — the booking (slate entry 15 + the ×5→×7 addendum correction) is
  **recommended outright**; only the claimant election is left to the sitting.
- **Downstream cost** — Naming X-W4 or X-W6 as claimant hands a CONFIRMED MAJOR (unbounded probe
  burst) to a wave whose gates are already sealed. Leaving it unclaimed means the MAJOR ships
  through X-W11's VERIFIED stamp with no gate that sees it. Correcting `×5`→`×7` inside §4's bytes
  instead of the addendum is an E-3 violation and invalidates the correction.
- **Needed to rule / MEASURED** —
  `ls demo/platform/transport/` → **4 files**: `api-problem.ts` · `availability.ts` · `client.ts` ·
  `useApiClient.ts`. The surface is small and single-owner-shaped.
  `grep -rc 'AP-17' docs/tranches/X/refinement/*.md` → `X-W0-FOLD.md:4` · `X-W4-FOLD.md:1` ·
  `X-W7-FOLD.md:1` · `X-W10-FOLD.md:2` — **AP-17 is now present in the fold layer at four files**
  (the adjudication's *"absent from the entire X·V fold layer"* reflects the pre-booking state;
  the booking half has since landed and only the claimant remains open). ⟨E-3: this is a dated
  observation of drift, not a rewrite of §5's bytes.⟩

---

### GF-R3 — the register's file home (carrying R-2's two `≡`-pointers)

- **Owning spec:line** — `EXECUTION-RUNBOOK.md:545-547`
- **Question** ⟨cmd⟩ `sed -n '547p' docs/tranches/X/EXECUTION-RUNBOOK.md`:
  > *"**R-3 · the register's file home is unelected** — CLERICAL; §1 rules it moot (the fold and
  > canonical layers ARE the register of record, identity-grain). The sitting elects candidate A or
  > ratifies §1; the adjudicator recommends the latter."*
- **Options exactly as enumerated**: (a) **elect candidate A** (a dedicated register file);
  (b) **ratify §1** — the fold + canonical layers *are* the register of record.
- **Spec's own recommendation, quoted** — *"the adjudicator recommends the latter"* (= ratify §1).
- **Downstream cost** — RATIFY §1: zero file motion; X-W11's 117-row walk reads the fold layer it
  already reads. ELECT A: a new register file is authored and every G-F booking (including R-1's
  slate entry 15) is re-pointed, after the union was sealed UNION-CLEAN.
- **R-2, riding here (clerical, no election)** ⟨cmd⟩ `sed -n '545p' docs/tranches/X/EXECUTION-RUNBOOK.md`:
  *"**R-2 · two missing `≡`-pointers** — ⟨AdminFlaggedPanel · AF-12⟩ (= the AdminListItem D-5
  identity, which is carried) and ⟨ColorNutritionLabel · R6⟩. No identity orphaned; two lines."*
  Two lines to write wherever R-3 lands; no owner choice beyond R-3's.
- **Needed to rule / MEASURED** — `ls docs/tranches/X/union/G-F-ADJUDICATION.md` → present;
  `ls docs/tranches/X/refinement/` → the fold layer exists with per-wave `X-W*-FOLD.md` files, so
  option (b) is satisfiable today with zero new paths. Option (a) has no candidate path on disk.

---

## PART C — X·KF root (KF.W0 Substrate Settle) and successors

### KF-OP1 — the §B-12 reset: the owner's hand, and the begin-word for it

- **Owning spec:line** — `docs/tranches/X/keyframes/waves/KF-W0.md:3` (preamble) · `:287` ·
  `:305` · `:345-348` (bounds) · `:669` (agent unit) · `:687` (cross-edge)
- **Question / the 'owner's hand' clauses, verbatim** ⟨cmd⟩ `sed -n '3p' docs/tranches/X/keyframes/waves/KF-W0.md`:
  > *"Every act below — above all the `git fetch && git reset --hard origin/master` in
  > `/Users/mkbabb/Programming/keyframes.js` — **awaits the owner's begin-word**, and the reset
  > itself is the **owner's hand**: `lane-docs.md:380` (verified verbatim at fold), *'Blocked from
  > our side by lane law and by their sacred-checkout rule — value.js must NOT perform it.'*"*

  ⟨cmd⟩ `sed -n '669p' docs/tranches/X/keyframes/waves/KF-W0.md`:
  > *"**OP-1 — the reset (OWNER'S HAND, not a seat).** `git fetch && git reset --hard
  > origin/master`, untracked V docs unharmed ⟨lane-docs.md:380, row 16⟩. Runs alone and first."*

  ⟨cmd⟩ `sed -n '687p' docs/tranches/X/keyframes/waves/KF-W0.md`:
  > *"The reset is the owner's hand; value.js must NOT perform it ⟨lane-docs.md:380⟩. Every row here
  > is downstream of it. A wave that performs the reset itself, or opens without the begin-word,
  > re-runs the schism it exists to close."*

- **The exact commands the spec PRESCRIBES**:
  `git fetch && git reset --hard origin/master` — run **alone and first**, in
  `/Users/mkbabb/Programming/keyframes.js`, by the owner, with untracked V docs unharmed.
- **The exact commands the spec FORBIDS**:
  - a partial `git checkout origin/master -- src/` ⟨cmd⟩ `sed -n '132p' …/KF-W0.md`: *"a partial
    `git checkout origin/master -- src/` leaves three flat files with **zero importers** — dead
    duplicates that no build error surfaces, which is precisely why only the full `reset --hard`
    discharges the act."* (the flat triad `src/animation/compile/emit/{backward,backward-walk,backward-color}.ts`)
  - the reset performed by **any value.js seat** (*"value.js must NOT perform it"*).
  - opening the wave without the begin-word.
  - the direction `master←disk` ⟨cmd⟩ `sed -n '364p' …/KF-W0.md`: *"**Direction lock: disk←master,
    never master←disk.**"*
  - Four bounds rows are marked **OWNER'S HAND, post-begin-word only** ⟨cmd⟩
    `sed -n '345,348p' …/KF-W0.md`: `keyframes.js/package.json` (the 7.0.0 exact devDep + the
    kf 6.0.0 / value.js 4.0.0 pairing) · `keyframes.js/package-lock.json` (three glass-ui entries
    incl. lock `:612` integrity + `dev:true`) · `…/useTimingFunctionEditor.ts` (EE-02 site 1) ·
    `…/TimingFunctionPanel.vue` (EE-02 site 2, `:144`/`:148`).
- **Options**: (a) **give the begin-word and perform the reset** (the only path that opens X·KF);
  (b) **withhold it** — KF.W0 does not open, and every KF wave downstream (OP-2/OP-4 in KF-W2/W3/W4/W5/W9/W10)
  stays blocked on it. There is no third: the spec forbids a value.js-side substitute.
- **Spec's default** — none; the wave is explicitly *"SPECIFIES; it does not execute."*
- **Downstream cost** — Without it: KF.W0 · KF.W1 · KF.W2 · KF.W4 · KF.W5 · KF.W9 · KF.W10 all hold
  their OP-2/OP-4 precondition RED, and every kf anchor in eleven specs stays bound to a stale ref,
  so **Track B of the 39-wave runbook cannot start**. With it: the 1-ahead local commit and 252
  status rows + 325 frontier-diff files must each be dispositioned kept/committed/discarded in the
  G-0.1 record, and the flat `backward` triad's removal stated by path.
- **Needed to rule / MEASURED (read-only in the sibling; no write, no stash, no reset)** —
  `git rev-parse --short HEAD` → **`8281638c`**; `git rev-parse --short origin/master` → **`81a56990`**;
  `git rev-list --left-right --count HEAD...origin/master` → **`1  41`** (1 ahead / 41 behind);
  `git status --porcelain | wc -l` → **252**; `git ls-files --others --exclude-standard | wc -l` → **124**.
  **Every KF-W0 baseline reproduces exactly at today's bytes** — the spec's denominators are live,
  not stale, so the reconciliation record can be written against these figures unchanged.

---

### KF-WRITE — write authority for keyframes.js (OP-2 / OP-1 / OP-3, six waves, one question)

- **Owning spec:line** — `KF-W3.md:40` (**OP-2**) · `KF-W4.md:34` (OP-1) · `KF-W5.md:63` (OP-1) ·
  `KF-W2.md:58` (OP-1) · `KF-W9.md:49` (OP-2) · `KF-W10.md:65` (OP-1) · `KF-W1.md:76` (OP-3)
- **Question, the census's words** ⟨cmd⟩ `sed -n '40p' docs/tranches/X/keyframes/waves/KF-W3.md`:
  > *"**Write authority named** (census §(c) gap 5, verbatim: *'keyframes.js is sibling-read-only
  > under value.js law and the sacred-checkout rule … The specs must name WHERE kf waves execute
  > (the exec clone / a new kf tranche letter) and under whose hand.'*) | **UNRESOLVED.** This wave
  > names the question; it does not answer it."*
- **Options exactly as the census enumerates them**: (a) **the exec clone**
  (`keyframes-v-exec`, whose HEAD is already the frontier `81a56990` — KF-W1.md:75); (b) **a new kf
  tranche letter** (a kf-side formation that owns these waves). Plus the second half in both cases:
  **under whose hand** the writes happen.
- **Spec's default** — none. Every one of the six waves records it **UNRESOLVED** and declines to
  answer: *"This wave names the question; it does not answer it."* KF-W5 adds that it is
  *"**harder here** — this wave writes library bytes, not config."*
- **Downstream cost** — Naming the **exec clone**: KF.W2/W4/W5 can write immediately; KF.W9's
  capture and KF.W10's close inherit a substrate already at the frontier. Naming **a new kf tranche
  letter**: a whole formation must be opened before any kf byte moves — Track B's 10 waves become
  gated on a formation that does not exist. Leaving it unresolved: KF.W0 can still run (its writes
  are `docs/**` plus the owner's four OWNER'S HAND rows), but **KF.W2, W4, W5 and W10 cannot write
  at all** and Track B degrades to a docs-only lane.
- **Needed to rule / MEASURED** — `ls -d /Users/mkbabb/Programming/keyframes-v-exec` and its HEAD:
  KF-W1.md:75 records *"`keyframes-v-exec` HEAD = **`81a56990`** = kf `origin/master`, re-verified
  2026-08-28."* This seat re-measured kf `origin/master` → **`81a56990`** (unchanged), so the exec
  clone's identity claim still holds at today's bytes. Option (a) is satisfiable today; option (b)
  has no artifact on disk.

---

### KF-OGKF1 — does the Codex "Keyframes v8" B-lineage continue at all?

- **Owning spec:line** — `KF-W0.md:378` (C-18, where it is NAMED) · `KF-W10.md:286` /
  `:423` / `:429` (where it is RULED) · `KF-W0.md:725`
- **Question, verbatim** ⟨cmd⟩ `sed -n '378p' docs/tranches/X/keyframes/waves/KF-W0.md` (the OG-KF1 clause):
  > *"**Owner row OG-KF1** (B21-18: *'Does the Codex Keyframes B-lineage continue at all — and must
  > any continuation re-anchor to `origin/master` `81a56990` before its denominators may be cited?'*)
  > is **NAMED here, RULED at KF.W10** beside OD-V3/OD-V5, **never proxied**."*
- **Options as enumerated**: (a) **re-anchor** the v8 contract to `origin/master 81a56990`;
  (b) **declare it stale-by-substrate, never citable for a live count**; and, riding either,
  (c) whether the lineage **continues at all**. KF-W0.md:378's own words: *"the §B-12 reconciliation
  (KF.W0) must also disposition the v8 contract — re-anchor it **or** declare it stale-by-substrate,
  never citable for a live count."*
- **Spec's default** — the seal's citable form is pre-stated: *"cite only as `345 exact / 12 partial
  / 57 unresolved @ 8281638c`, never 357/414, never as HEAD coverage."*
- **Downstream cost** — RE-ANCHOR: five conditional TCC re-reads open (**B10-9 · B19-10 pin half ·
  B19-11 · B20-6 · B21-7**) — *"owed only if the v8 contract is ever cited"* — and every denominator
  (414 contracts, 152 surfaces, 73 568 Safari cells, 184 demo members) must be re-derived at the
  frontier. STALE-BY-SUBSTRATE: those five re-reads **never open**, and KF.W0's re-count adopts
  185-at-HEAD (X-2). Unruled: KF.W10 cannot close except `complete_with_misses` citing the sitting.
- **Needed to rule / MEASURED** — the lineage's pin `8281638c` is exactly **kf HEAD** measured this
  seat, and kf `origin/master` is `81a56990`, 41 commits ahead. So the v8 denominators are measured
  on the tree §0 already ruled non-authoritative, and **184's exact Codex/census agreement is the
  proof both censused the same stale worktree** (KF-W0.md:378). The factual predicate for
  "stale-by-substrate" is measured and true today.

---

### KF-SS3 — the `smooth-step-3` behaviour ruling (KF.W4 OP-6)

- **Owning spec:line** — `docs/tranches/X/keyframes/waves/KF-W4.md:39`
- **Question, verbatim** ⟨cmd⟩ `sed -n '39p' docs/tranches/X/keyframes/waves/KF-W4.md`:
  > *"**Owner ruling on `smooth-step-3`** (G-KFW4-14). Repointing at `bezierPresets` flips its class
  > — its literal becomes a bezier. *'A behaviour decision, not a rename'* (KF-ET-6/C-5). |
  > **UNRULED.** Unit `.e`'s G-14 arm does not dispatch without it; the rest of `.e` does."*
- **Options**: (a) **repoint at `bezierPresets`** — accept that the literal becomes a bezier
  (a behaviour change, not a rename); (b) **leave it un-repointed** — the easing keeps its class.
- **Spec's default** — none; the spec's whole point is the classification: *"A behaviour decision,
  not a rename"*, i.e. it may not be absorbed as hygiene by a seat.
- **Downstream cost** — Unit `.e`'s **G-14 arm does not dispatch** without the ruling; the rest of
  `.e` runs either way. So the cost of silence is bounded to one arm — KF.W4 can close
  `complete_with_misses` on G-14 alone. Ruling (a) changes emitted easing output for every consumer
  of `smooth-step-3`; ruling (b) leaves the easing-name trap (KF-CB-18/24/29 + K1) partly armed.
- **Needed to rule / MEASURED** — this is a taste/behaviour call with no measurable side: the
  bytes are identical under either ruling until the repoint lands. The only measurement that
  informs it is the consumer count, which KF.W4 owns and which cannot be taken without the
  write-authority ruling (KF-WRITE) first.

---

### KF-W5R4 — the four library rulings that must precede their fixes

- **Owning spec:line** — `docs/tranches/X/keyframes/waves/KF-W5.md:67`
- **Question, verbatim** ⟨cmd⟩ `sed -n '67p' docs/tranches/X/keyframes/waves/KF-W5.md`:
  > *"**The four RULINGS precede their fixes** — `fromString` replace-or-document · `delay`
  > per-play-or-per-iteration · the PRM default inversion · `singleTarget` supported opt-out. |
  > **UNRULED.** | Arm B's ruling commits land before arm B's fix commits and before arm D opens.
  > A fix authored ahead of its ruling is void."*
- **Options, per ruling, exactly as spelled**: (1) `fromString` → **replace** OR **document**;
  (2) `delay` → **per-play** OR **per-iteration**; (3) the **PRM default inversion** — invert or
  keep; (4) `singleTarget` → **supported opt-out** or not.
- **Spec's default** — none for any of the four; the spec supplies only the ordering law.
- **Downstream cost** — Each ruling is a *precondition of its own fix commit*: **arm B's ruling
  commits land before arm B's fix commits and before arm D opens**, and *"a fix authored ahead of
  its ruling is void"* — so an unruled quartet stalls arm B and arm D of KF.W5 entirely, while arms
  A/C proceed. The PRM default inversion additionally interacts with KF.W5 OP-3 (the TypingDots
  substrate inversion), whose gate `G-PRM-FLIP` is *"unwritable until"* KF.W0 states which substrate
  is cured.
- **Needed to rule / MEASURED** — KF.W5 OP-3's predicate is measurable and is measured here:
  kf HEAD `8281638c` is **1 ahead / 41 behind** `81a56990`, so the "dirty worktree is the frontier
  for the stagger surface" inversion is still live and the PRM prediction still flips with the
  substrate choice. The quartet itself needs the owner's four words, not a probe.

---

### KF-ODV3 — the transport-home ruling (held for capture review since 2026-07-17)

- **Owning spec:line** — `KF-W10.md:84` · `KF-W10.md:286` / `:423` / `:429` / `:519` / `:537` ·
  kf `origin/master:docs/tranches/V/OWNER-DECISIONS.md:7`
- **Question, verbatim at the producer's own bytes** ⟨cmd⟩
  `git -C /Users/mkbabb/Programming/keyframes.js show origin/master:docs/tranches/V/OWNER-DECISIONS.md | sed -n '7p'`:
  > *"**THE TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW.** W11's design-fix unit builds the
  > options packet FIRST (fresh captures of both transport homes — in-panel card and floating pill —
  > on all four duplicating scenes at 390 AND 1280, real Glass 7, both options mocked or annotated)
  > and presents it; implementation of the winning home follows the ruling."*
- **Options exactly as enumerated**: (a) **in-panel card**; (b) **floating pill**. Two homes; the
  ruling picks one and *"implementation of the winning home follows the ruling."*
- **Spec's default, quoted** — *"If the ruling outlasts the band window, W11 closes
  `complete_with_misses` on that row per its own spec — never proxied, never defaulted."*
  KF-W10.md:429 restates the escape: *"three verbatim rulings, **or** three `complete_with_misses`
  closures each citing its **exact** pending precondition (OD-V3's capture packet …)."*
- **Downstream cost** — **PACKET-FIRST is binding** (KF-W10.md:519): KF.W9/SS-13 must produce the
  390+1280 captures against **real Glass 7** on all four duplicating scenes **before** the ask is
  assembled. So the owner cannot rule today even if willing — OP-4 is **UNRUN**. Ruling early
  without the packet violates PACKET-FIRST; ruling late costs KF.W10 a `complete_with_misses`.
- **Needed to rule / MEASURED** — kf `origin/master:…/OWNER-DECISIONS.md:7` read this seat:
  **still HELD**, unruled since **2026-07-17** (today 2026-09-17 = **62 days**). The capture packet
  (KF.W9 `.e`, `SS-13-CAPTURE-RECEIPT.md`) does not exist on disk. **What the sitting needs is not
  the ruling but a decision on whether KF.W9's capture band is authorized to run at all** — that is
  the gate on the gate.

---

### KF-ODV5 — the at-rest reopen question (deferred pending glass's dock mark)

- **Owning spec:line** — `KF-W10.md:85` · `:216` · `:516` · `:620` ·
  kf `origin/master:docs/tranches/V/OWNER-DECISIONS.md:9`
- **Question, verbatim** ⟨cmd⟩ same `sed -n '9p'` on the producer file:
  > *"**THE AT-REST REOPEN QUESTION IS DEFERRED PENDING GLASS'S DOCK MARK.** The glass-root dock
  > repair (our batch rows G-1/G-2 in their BI inbox) may itself cure the hidden Open-controls
  > toggle; the demo-side peek-sufficiency question is re-examined WHEN their mark returns."*
- **Options exactly as enumerated**: (a) **keep deferred** until the glass dock mark returns;
  (b) **re-examine now** on the demo-side peek-sufficiency question. A third is *forbidden by
  standing owner edict* ⟨cmd⟩ `sed -n '516p' docs/tranches/X/keyframes/waves/KF-W10.md`:
  *"**Glass rows (§B-1/-2/-3/-4) and OD-V5 route to SS-6 and NEVER become demo-side hacks**
  (standing owner edict)."*
- **Spec's default** — *"W11 verifies the 390 at-rest state in its π matrix either way and records
  the observation; if the glass mark is still absent at W11 close, the row closes
  `complete_with_misses` citing the pending external mark."*
- **Downstream cost** — DEFER: KF.W10 closes `complete_with_misses` on this row; the SS-6 successor
  batch carries G-1..G-4 onward (the vehicle correction at PASS-3 D-6 — O-20 has already departed
  without them). RE-EXAMINE NOW: the demo-side answer would have to be produced without the
  producer's mark, which is exactly the demo-side-hack the standing edict forbids.
- **Needed to rule / MEASURED** — producer file read this seat: **still DEFERRED**, unruled since
  **2026-07-17** (62 days). The predicate is a *producer* act (glass's dock mark) that no value.js
  or keyframes seat can produce; memory records glass 9.0.0's PUT is walled by an npm token = OWNER
  ACT. **This row's true owner-gate is the glass side, not this sitting** — the sitting's only
  lawful act is to authorize the `complete_with_misses` shape in advance, or not.

---

### KF-AT — the AT-cell scope question (KF.W9 OP-7 ≡ S-12)

- **Owning spec:line** — `docs/tranches/X/keyframes/waves/KF-W9.md:54`
- **Question, verbatim** ⟨cmd⟩ `sed -n '54p' docs/tranches/X/keyframes/waves/KF-W9.md`:
  > *"**The AT-cell scope question is OWNER-UNRULED** (≡ §Sequencing S-12). `.d`'s AT arm runs only
  > under the proposed resolution; if the owner routes AT to its own lane, `.d` sheds that arm and
  > affected rows report UNREACHABLE-IN-CELL with the routing named. | UNRULED — recorded as a
  > dissent, not a decision. | The owner's ruling."*
- **Options exactly as enumerated**: (a) **the proposed resolution** — AT runs inside `.d`'s arm;
  (b) **route AT to its own lane** — `.d` sheds the arm and affected rows report
  **UNREACHABLE-IN-CELL with the routing named**.
- **Spec's default** — none; explicitly *"recorded as a dissent, not a decision."*
- **Downstream cost** — (a): KF.W9's `.d` unit carries an assistive-technology arm inside the
  Safari visual-audit cell, widening a cell whose reachability precondition (OP-3, `safaridriver
  --enable` + Allow Remote Automation) is itself **UNVERIFIED**. (b): `.d` narrows, but a new lane
  must be named and the UNREACHABLE-IN-CELL rows must cite it — an unnamed routing is a silent drop.
- **Needed to rule / MEASURED** — KF-W9 OP-3 is the harder precondition and is measurable:
  the only real-Safari corpus on disk is dated **2026-07-27** (Safari 26.4 / macOS 26.4.1,
  `localhost:9000`, API-less) and is **value.js-routed, not keyframes-routed**, so no kf AT evidence
  exists in either branch of this ruling today.

---

## PART D — X·F root (F.W0 §5 owner rulings, FLAGGED INLINE) and successors

### F-OGF1 — re-root fourier source auditing, or freeze the R-coordinates

- **Owning spec:line** — `docs/tranches/X/fourier/waves/F-W0.md:407-411`
- **Question, verbatim** ⟨cmd⟩ `sed -n '407p' docs/tranches/X/fourier/waves/F-W0.md`:
  > *"**OG-F1** (row 29). *'Re-root fourier source auditing at F.W0, or leave the R-coordinates
  > frozen and build from live-tree measurement alone?'*"*
- **Options exactly as enumerated**: (a) **re-root** at F.W0; (b) **freeze-with-adoption** — leave
  the R-coordinates frozen and build from live-tree measurement alone. A composed third choice is
  spelled out: **freeze-with-adoption AND worktree-as-baseline**.
- **Spec's own recommendation, quoted** ⟨cmd⟩ `sed -n '408p' …/F-W0.md`:
  *"Lane evidence, verbatim: **'favors freeze-with-adoption — the measurements are already
  live-reproduced; R6 itself declared `NO_SUCCESSOR`, making the ruling cheap.'**"*
- **Downstream cost, the spec's own words** ⟨cmd⟩ `sed -n '409p' …/F-W0.md`:
  *"**freeze-with-adoption** → G-11's scope shrinks to drift-correction and G-14's R-coordinate rows
  become records, not work. **Re-root** → every R-coordinate is re-derived at the settled tree
  before G-11 can publish, and F.W1 sizing waits on it."*
  Plus the composed branch ⟨cmd⟩ `sed -n '410p' …/F-W0.md`: *"if F.W0 formally adopts the worktree
  as baseline, GAB-13 discharges to a disclosure line and DU's INFO grading was right all along …
  G-1's minute becomes a disclosure + the LAND set, and G-11 narrows to drift-correction only."*
- **Needed to rule / MEASURED (read-only in the sibling)** —
  `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l` → **28**
  (exactly the "28 dirty entries" the spec names — GAB-13's dirty worktree is live and unchanged).
  `git ls-files | grep -c 'FOURIER-R'` in value.js → **10** R-coordinate files on the value side
  (the spec's §2.8 E-6 figure is 9; one has been added since — dated drift, recorded not rewritten).
  `wc -c web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` → **13 949 bytes** present.
  The "measurements are already live-reproduced" premise holds at today's bytes, so
  freeze-with-adoption is satisfiable now.

---

### F-CODEXBIND — OG-F2 and OG-V2: do Codex-era rules bind the Claude-owned formation?

- **Owning spec:line** — `docs/tranches/V/megatranche/audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md:234`
  (OG-F2's definition) · `F-W0.md:411` (OG-V2, declared not decided) · `F-W10.md:443` / `:467`
  (both flagged unanswered) · `EXECUTION-RUNBOOK.md:300`
- **Question, verbatim** ⟨cmd⟩ `sed -n '234p' docs/tranches/V/megatranche/audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`:
  > *"| **OG-F2** | R6-3 | Does the pre-write root-absence-receipt requirement bind successor fourier
  > coordinates, or was it Codex-era-specific? (The absence itself is confirmed TRUE and adopted.)"*

  and ⟨cmd⟩ `sed -n '411p' docs/tranches/X/fourier/waves/F-W0.md`:
  > *"Also open, declared not decided: **OG-V2** — 'Do Codex-authored prohibitions bind the
  > Claude-owned formation after M-15?'"*
- **Options exactly as enumerated (each, twice)**: (a) **binds successors** — the pre-write
  root-absence receipt / the Codex prohibitions carry forward; (b) **Codex-era-specific** — they
  died with M-15's abrogation. The *finding* under OG-F2 is separable and already settled:
  *"The absence itself is confirmed TRUE and adopted."*
- **Spec's default** — none stated for either; both are carried as *"FLAGGED INLINE, never presumed"*
  ⟨cmd⟩ `sed -n '300p' docs/tranches/X/EXECUTION-RUNBOOK.md`.
- **Downstream cost** — BINDS: every successor fourier coordinate owes a pre-write root-absence
  receipt, and F.W0's substrate pre-gates grow a per-coordinate obligation; F.W10's G-F10-8 cannot
  stamp terminal until each is produced. CODEX-ERA-SPECIFIC: G-F10-8 closes on the charter line
  alone and the 9-10 `FOURIER-R*` value-side files become records. Unruled: **F.W10 cannot close** —
  G-F10-8's RED witness names *"OG-F1/OG-F2 unanswered"* as a conjunct ⟨cmd⟩ `sed -n '443p' docs/tranches/X/fourier/waves/F-W10.md`.
- **Needed to rule / MEASURED** — `git ls-files | grep -c 'FOURIER-R'` → **10** on the value side;
  the same probe against fourier's tree yields **0** (the spec's *"none in fourier's tree"* holds).
  M-15's abrogation is on record in project memory (2026-07-27, vnext Claude-owned), so the factual
  predicate of OG-V2 is settled and only the *legal* consequence is owed.

---

### F-G10 — F8-REACH-01 and F8-REACH-02, ruled IN ONE BREATH

- **Owning spec:line** — `docs/tranches/X/fourier/waves/F-W0.md:359-362`
- **Question, verbatim** ⟨cmd⟩ `sed -n '359p' docs/tranches/X/fourier/waves/F-W0.md`:
  > *"### G-10 — F8-REACH-01 and F8-REACH-02 ruled IN ONE BREATH, with the lift in the same commit
  > as any rm"*

  ⟨cmd⟩ `sed -n '361p' …/F-W0.md`: *"**GREEN**: both files carry an exact **KEEP_WITH_MOUNT /
  ISOLATED_HARNESS / DELETE** ruling (R-6: one breath, both rows)."*
- **Options exactly as enumerated** — three, per file, ruled in one breath:
  **KEEP_WITH_MOUNT** · **ISOLATED_HARNESS** · **DELETE**.
- **Spec's default** — none; but a hard consequence is pre-attached to one branch:
  *"**if DELETE**, FR-COB-17's 8-site `:aria-pressed` lift lands in the **SAME commit** — sites:
  CanvasControlsDock ×5 (:54/:59/:71/:77/:87) · EditorControlsDock ×2 (:143/:148) ·
  ConvergenceTimeline ×1 (:61) … A bare `git rm` is a gate FAILURE."*
- **Downstream cost** — DELETE: an 8-site `aria-pressed` lift must land atomically with the removal,
  using **L's list, NOT C's (K-11)** — C's version adds `FullscreenViewer.vue:110` (a one-shot close
  ACTION) and miscounts its own list as "six" for seven; line numbers must be re-resolved via G-11
  first. KEEP_WITH_MOUNT / ISOLATED_HARNESS: no lift, but the five never-executed DELETE orders and
  the un-minuted skip at `partial-prior-run.json:207-211` must be minuted either way.
- **Needed to rule / MEASURED (read-only in the sibling)** —
  `git -C …/fourier-analysis status --porcelain -- web/src/components/equation/InfoCard.vue`
  → **` M web/src/components/equation/InfoCard.vue`** — still dirty, exactly as the fold porcelain
  recorded. `find web/src -name CanvasOverlayButton.vue` →
  **`web/src/components/visualization/CanvasOverlayButton.vue`** — present, not deleted.
  Both HOLD rows are live and both files still exist; neither DELETE order was executed.

---

### F-G15 — the four contradictions F.W0 must RULE

- **Owning spec:line** — `docs/tranches/X/fourier/waves/F-W0.md:391-403`
- **Question, verbatim** ⟨cmd⟩ `sed -n '391,392p' docs/tranches/X/fourier/waves/F-W0.md`:
  > *"### G-15 — The four contradictions F.W0 must RULE are ruled in writing, each with its
  > falsifier / F.W0 does not inherit contradictory bookings. Four rulings, each written into
  > `SUBSTRATE-LEDGER.md`."*
- **The four, and their options exactly as enumerated**:
  - **(a) the vue-tsc RED** (row 37) — banked M-15 + fr-PaperView route it to F.W0; fr-PathPreview
    K7 kills all three routings. Options: **LAND** (the settled tree is the committed substrate) or
    **ABANDON**. The spec pre-rules the *green form*: *"Green = the ledger records: committed
    substrate GREEN, the RED is the uplift's, cure owned by F.W1/W2."* It also forbids a shape:
    *"An F.W0 exit criterion of 'vue-tsc green' would be unsatisfiable-by-construction on the
    ABANDON branch and gated on a later wave on the LAND branch — that shape is forbidden."*
  - **(b) the root-size fork** (row 33) — *"does `html{font-size:1.125rem}` under 768px stay?"*
    Options: **stays** or **goes**. Spec's routing: *"F.W0 POSES and RULES the fork; the token-parity
    re-tune is F.W1's; per-component execution is F.W4's."*
  - **(c) FM-19** — options exactly two: **a regeneration path**, or **explicit frozen-forever with
    a golden-file diff**. *"Green = the ruling + the golden-file baseline exists."*
  - **(d) the emission contradiction** — fr-PaperSearch K1 (*guard dies ON EMISSION*) vs
    fr-PaperSearchModal PSM-24/R-3 (*LATENT-on-next-build*). **Not decidable today**: the green was
    re-cut at repair round 4 to *"the WRITTEN RULING that the two cells are mutually exclusive and
    undecidable on today's evidence"* + the falsifier, **not the build**.
- **Spec's default** — (d) has one: honest-RED relief *"extended to G-15(d) BY NAME"*. (a)/(b)/(c)
  have none.
- **Downstream cost** — (a) ABANDON: *"the governance limb falls to MAJOR; the deadness does not"*
  (L-1's conditional, F-W0.md:413). (b) STAYS: the 12.5% inflation keeps compounding with
  `--ui-scale: 1.5` → **67.5px vs the token author's 60px**, and F.W1's token-parity re-tune must
  absorb it. (c) REGENERATION PATH: a pipeline must be built that does not exist (5 orphan JSONs,
  `lerpPoints` truncating at `Math.min(a.length,b.length)`); FROZEN-FOREVER: a golden-file baseline
  must exist before close. (d) Ruling it as decidable manufactures a build F.W0 is forbidden to make.
- **Needed to rule / MEASURED (read-only)** —
  (b): `grep -n 'font-size' web/src/style.css` → **`:41 font-size: 1.125rem;`** and
  **`:47 font-size: 1rem;`** — the fork is live at the stated coordinates.
  (a): the committed-substrate half needs **no working-tree mutation** — `git show HEAD:web/package-lock.json`
  resolves typescript **5.9.3** / vue-tsc **2.2.12**, so `noUncheckedSideEffectImports` defaults
  **false** on the committed substrate; the spec's replacement falsifier is read-only and available
  at any time, and the previous `git stash`-based falsifier is **struck** (it would have stashed the
  tree's only copies of rows 24/25's repairs).
  (d): undecidable today by construction — G-4 is producer-owned and RED, `web/dist` is a 3.1.0-era
  build dated **Jun 12 18:13** and inadmissible under row 27's stale-dist law.

---

### F-TRIE — trie vs KISS (F.W5 R2 ≡ E16 ≡ G7 ≡ F.W7 G-F7-1: one identity, four ids)

- **Owning spec:line** — `F-W5.md:250` (R2) · `F-W5.md:210` (E16) · `F-W5.md:369` (G7) ·
  `F-W7.md:237` / `:83` / `:85` / `:92` / `:113` (G-F7-1)
- **Question, verbatim** ⟨cmd⟩ `sed -n '250p' docs/tranches/X/fourier/waves/F-W5.md`:
  > *"| **R2** | **trie vs KISS** (G7/E16) | **no trie**; whole-snapshot duplication is the recorded
  > shipped behaviour | a trie contradicts `atomdiff.py:12-14`, the incumbent guardrail in BOTH
  > trees. **Dissent recorded** |"*
- **Options exactly as enumerated**: (a) **no trie** — whole-snapshot duplication;
  (b) **trie / structural sharing** — which *"contradicts `atomdiff.py:12-14`, the incumbent
  guardrail"*. F.W7's design file `design/R4-variant-storage.md` is declared **CONDITIONAL**:
  *"If the ruling goes against, **this path is never created**."*
- **Spec's own default, quoted verbatim** ⟨cmd⟩ `grep -o 'The honest default[^*]*' docs/tranches/X/fourier/waves/F-W5.md`:
  > *"The honest default v2 MUST carry absent a ruling: no trie; whole-snapshot duplication is the
  > recorded shipped behaviour."*
- **Downstream cost** — **FOR**: F.W7 unit `b` opens, `design/R4-variant-storage.md` is created,
  and G-F7-3/4/5/6 all close on the FOR branch. **AGAINST**: F.W7 writes the terminal-kill record
  *in situ*, the design path is never created, and **G-F7-5 closes VACUOUSLY** (REST-39 — no key
  spec, so no consumed-field set and no superset relation is owed). **UNRULED**: ⟨cmd⟩
  `sed -n '92p' docs/tranches/X/fourier/waves/F-W7.md` — *"no design byte lands before G-F7-1
  rules"*; ⟨cmd⟩ `sed -n '255p' …/F-W7.md` — *"**Unit b cannot open until the owner speaks.**"*
  F.W7's unit `a` (the enumeration census) is authorable regardless — *"it is measurement, not design."*
- **Needed to rule / MEASURED** — the spec's own probe, re-run this seat with word boundaries:
  `grep -rniE "\btrie\b|prefix.?tree|\bradix\b|patricia|structural.?sharing|delta.?compress"
  fourier-analysis/api fourier-analysis/web/src value.js/api/src value.js/src | wc -l` → **0 true
  hits on BOTH trees**. The "requirement with no material on either side" premise is confirmed live.
  **Corrected premise the ruling must be stated against** (G-F7-10): the guardrail is **not
  bilateral** — `atomdiff.py` line 7 names the excised `lib/crud/atomdiff.ts` as its adopter, and
  the value side's only related token asserts the opposite word (`api/src/modules/palette/hash.ts:6`
  *"(Merkle property)"*). **One tree carries the guardrail; the other's copy went out with TA-4.**

---

### F-PRODRET — moderation producer-or-retire (F.W5 R3 ≡ D3 ≡ G11) — THE ADMISSION GATE

- **Owning spec:line** — `F-W5.md:251` (R3) · `F-W5.md:176` (D3) · `F-W5.md:373` (G11)
- **Question, verbatim** ⟨cmd⟩ `sed -n '251p' docs/tranches/X/fourier/waves/F-W5.md`:
  > *"| **R3** | **flags producer-or-retire** (G11/D3) | none — this is **the admission gate** |
  > **PRECEDES F.W1's sizing** wherever FR-AFP grades are load-bearing (ruling 5) |"*
- **Options exactly as enumerated**: (a) **producer** — build the missing producer for the
  moderation queue; (b) **retire** — remove the affordance. The D3 row calls it
  *"**THE ADMISSION GATE**"*.
- **Spec's default** — **explicitly none**: *"none — this is the admission gate"*, i.e. the spec
  refuses to supply a default because the wave may not be admitted either way without the word.
- **Downstream cost** — The ruling **PRECEDES F.W1's sizing** wherever FR-AFP grades are
  load-bearing, so an unruled R3 blocks F.W1's budget arithmetic, not just F.W5's authoring.
  PRODUCER: an API surface must be built (value.js already *has* the verb — `POST /:slug/flag`).
  RETIRE: *"~110 of 285 panel lines dead by reachability"* are removed and every FR-AFP grade
  re-derives at the smaller denominator.
- **Needed to rule / MEASURED** — the G11 witness reproduces on today's bytes: every `db.flags`
  write repo-wide in fourier is a test fixture or a `$rename` migration; `FlagRequest` is declared
  and referenced nowhere; no client posts a flag. **The asymmetry the sitting needs to see**:
  value.js **has** the verb while fourier has no producer — so "producer" is a *port*, not a
  greenfield build, which materially changes the cost of branch (a).

---

### F-SS4REST — the remaining seven SS-4 rulings owed (R1 · R4 · R5 · R6 · R7 · R8 · R9)

- **Owning spec:line** — `docs/tranches/X/fourier/waves/F-W5.md:245-259` (§2a *"Owner rulings owed —
  flagged INLINE (SS-4)"*); roster completed to **nine** at `F-W6.md:527` / `:565` / `:582`
- **Question, the table's own header** ⟨cmd⟩ `sed -n '245,248p' docs/tranches/X/fourier/waves/F-W5.md`:
  > *"### 2a. Owner rulings owed — flagged INLINE (SS-4) / | # | ruling | honest default absent a
  > ruling | cost of the other branch |"*
- **Options and defaults, exactly as the table gives them** (R2/R3 are items above):
  | id | options | the spec's own honest default |
  |---|---|---|
  | **R1** TA-4 (E3/G4) | restore `atomdiff.ts` + `atomDiff` · re-scope value.js out of the diff clause | *"**none may be assumed** — the wave may not author §6 either way"* |
  | **R4** the like verb (D2/G10) | add the operation · remove the affordance | *"none — add the operation or remove the affordance; **no third option ships**"* |
  | **R5** off-state `[]` (M-9/D12) | admit it in the contract · stop minting it | *"none — the silent rewrite must not survive either branch"* |
  | **R6** hard-delete arm (FR-AFP-9/D6) | keep · remove | **"copy stays truthful about restorability"** |
  | **R7** codegen vs hand-typed twins (FR-AFP-71/A4) | codegen · hand-typed | **"inv-16/inv-26 RESTATED"** — *"amendment is permitted; **silent reversal is not**"* |
  | **R8** remix-vs-fork + born visibility (E4) | remix · fork; born-public · born-private | *"none — **both defaults ship, opposite**"*; must not contradict ruling D9 |
  | **R9** dead session subsystem (FR-USB-23/C3) | delete · wire | **"delete (zero external call sites)"** |
- **Downstream cost** — R1 is the hardest: *"restore = value-side work; re-scope = a one-sided §6
  verdict, stated explicitly"*, and **F.W5 may not author §6 at all** until it is ruled — which is
  the contract co-signature SS-4 exists to produce. R4: *"the affordance lies under `aria-pressed`
  either way until ruled"* (and it shares the 8-site lift with F-G10). R9: wiring
  *"re-attaches an anonymous identity on reload"*. R8: both defaults ship opposite today, so
  silence is a live product contradiction, not a deferral.
- **Needed to rule / MEASURED** — R1's predicate is measurable on the value side and is measured
  here: `git ls-files | grep -c 'atomdiff'` in value.js → **0**. The `api/src/lib/crud/atomdiff.ts`
  path that fourier's `atomdiff.py:7` names as its adopter is **wholly excised** (it went out with
  TA-4) — the same fact that convicts G-F7-10's bilaterality premise. **So R1's "restore" branch is
  a real value-side authoring job, not a revert**, and that materially sizes branch (a).

---

## PART E — X·P root (X.P.W0) and X.P.W4

### P-OP1 — the separate owner RELEASE word (distinct from the X·P begin-word)

- **Owning spec:line** — `docs/tranches/X/parse-that/waves/W4.md:68` · `:83` · `:604` ·
  `docs/tranches/X/parse-that/waves/W0.md:542` · `W0.md:59`
- **Question, verbatim** ⟨cmd⟩ `sed -n '68p' docs/tranches/X/parse-that/waves/W4.md`:
  > *"| **OP-1** | **Owner begin-word for X·P**, and specifically for the release limb — handoff
  > §8.8 requires 'a separate owner release' beyond the resume ruling. | STANDING PAUSE. Two
  > distinct owner acts are required; the begin-word for X·P is not itself a release
  > authorization. | Two dated owner words, cited by commit body. |"*

  ⟨cmd⟩ `sed -n '542p' docs/tranches/X/parse-that/waves/W0.md`:
  > *"| 8, release limb — 'materialize only after a separate owner release' | **OWNER-GATED: X.P.W4
  > OP-1** — a second dated owner word, distinct from the X·P begin-word; **no wave seat may grant
  > it** |"*
- **Options**: (a) **give both words** (begin-word + release word), each dated and cited by commit
  body; (b) **give only the begin-word** — X·P opens, W4's release limb stays gated;
  (c) **give neither** — Track D does not open at all. The spec forbids conflation: *"the begin-word
  for X·P is not itself a release authorization"*, and *"no wave seat may grant it."*
- **Spec's default** — **STANDING PAUSE** (the state until both words exist).
- **Downstream cost** — Track D is *strictly serial* (RUNBOOK §1.4), so (c) costs the whole lane.
  (b) opens W0..W3 and lets W4 run everything except the release limb, closing on it. Giving the
  release word without the packet is unsafe: `RELEASE-PACKET.md` does not exist and the handoff §9
  STOP conditions are live (*"a stale owner receipt means STOP and request a new ruling"*).
- **Needed to rule / MEASURED** —
  `ls docs/tranches/X/parse-that/RELEASE-PACKET.md` → **No such file** ·
  `ls docs/tranches/X/parse-that/RELEASE-CONDITION.md` → **No such file** ·
  `npm view @mkbabb/value.js version` → **4.0.0** · `node -p "require('./package.json').version"`
  → **4.0.0** · `find . -name '*.wasm' -not -path './node_modules/*'` in parse-that → **0**.
  **Every RC-P conjunct measured 2026-08-03 is still FALSE at 2026-09-17** — nothing has moved, so
  the release word would authorize a limb whose preconditions are all RED.

---

### P-OC1 — the bench bar (unruled since 2026-07-20)

- **Owning spec:line** — `docs/tranches/X/parse-that/waves/W4.md:70` · `:84` · `:339` · `:622` ·
  `docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md:88-95`
- **Question, verbatim** ⟨cmd⟩ `sed -n '70p' docs/tranches/X/parse-that/waves/W4.md`:
  > *"| **OP-3** | **OC-1 discharged in either direction** (see G-5 conjunct 5). Either the owner
  > ratifies a bench bar in writing, or he rules that admission is decided on correctness with the
  > bench table recorded-not-gating. | **UNRULED** since 2026-07-20. The `≥10x` floor is retired as
  > law; strict-3x / strict-2x / break-even are **UNRATIFIED (0/5 each)**."*
- **Options exactly as enumerated** — at W4 §G-5 conjunct 5 ⟨cmd⟩ `sed -n '339p' …/W4.md`:
  > *"the owner has ruled **either** a ratified bench bar (and `V`'s three-leg table meets it)
  > **or** that admission is decided on correctness with the bench table recorded-not-gating.
  > A **disjunction by design**: an unruled bar must not become a permanent veto, and it must never
  > become an invented standard."*
  And at the source, the two concrete bar shapes ⟨cmd⟩ `sed -n '88,95p' docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md`:
  **(i) re-anchor RELATIVE** — *"the mirror ≥ the deposed baseline per scenario on the same
  rig+build (today that means C14 must close a −21% sheet deficit), with the LIVE regex numbers held
  as the recorded ceiling, not a floor"*; **(ii)** *"owner re-ratifies absolute floors measured on a
  named reference rig."* Plus the third from W4: **recorded-not-gating**.
- **Spec's own recommendation, quoted** — GATE-VERDICT.md:88-93 labels (i) as **"Proposal"** and
  (ii) as **"Alternative"**. The historical absolute floors (VALUE ≥ 0.0500 / SHEET ≥ 0.1000 vs
  jsonParser peak) *"don't transfer to this rig — the calibration subject itself fails them."*
- **Downstream cost** — RATIFY A BAR: RC-P conjunct 5 becomes a real gate that `V`'s three-leg
  table must meet, and C14 must close a **−21% sheet deficit**. RECORDED-NOT-GATING: admission is
  decided on correctness, the bench table is evidence, and RC-P conjunct 5 goes green on the word
  alone. UNRULED: the wave may still run — *"the wave may report"* — but conjunct 5 stays FALSE
  forever, which the spec itself names as the forbidden outcome (*"an unruled bar must not become a
  permanent veto"*). Note memory records **OC-2** (staged gate reading) as the co-blocker:
  *"Silence holds execution fully blocked."*
- **Needed to rule / MEASURED** — `npm view @mkbabb/value.js version` → **4.0.0**;
  `find . -name '*.wasm' -not -path './node_modules/*'` in parse-that → **0**; parse-that HEAD
  `ef10d5b`. The bench subject the bar would be applied to (`V`'s three-leg table) **does not exist
  yet** — X.P.W3's `bench-three-leg.md` is UNRUN. So the ruling can be given today only in the
  abstract; measuring it against a real table requires W3 first.

---

## PART F — BRANCH-TOPOLOGY

### BRANCH-TOPOLOGY — value.js `tranche-u` vs `origin/master`, and who owns the reconciliation

**The divergence, measured read-only 2026-09-17:**

```
⟨cmd⟩ git rev-parse HEAD                              → 85e86a735ec81e1a90b313d85af895b1a8d1f790 (tranche-u)
⟨cmd⟩ git merge-base HEAD origin/master               → 86a9a178cd7a6f2b573216966964c33513494f05
⟨cmd⟩ git rev-list --count origin/master..HEAD        → 257   (tranche-u ahead)
⟨cmd⟩ git log --oneline HEAD..origin/master           → 3     (master ahead)
     44ddaff7 ci(release): hash the sole pack-destination archive
     e2652f1c ci(release): keep npm pack candidate output machine-readable
     7334c793 feat(package-v4): cut the exact-seven immutable capability surface
⟨cmd⟩ git rev-parse master                            → 6abef8005fe94e06c33843c067bfe9e74f870161  (LOCAL master)
⟨cmd⟩ git rev-list --left-right --count master...origin/master → 0  140
```

**⚠ Local `master` is 140 commits behind `origin/master`.** W11.md:266's RED witness cites
`git rev-parse master` → `6abef800` and reads it as "T-era" — that reading is correct for the
*local* ref and **understates the real gap**: the release/CI layer that X-W11 must fire against
lives on `origin/master`, 140 commits further on.

**`git diff --stat HEAD origin/master`, grouped by top-level dir** ⟨cmd⟩
`git diff --numstat HEAD origin/master | awk -F'\t' '{split($3,p,"/"); …}'`:

| dir | files | + | − | binary |
|---|---|---|---|---|
| `docs` | 3855 | 13 726 | 1 813 774 | 27 |
| `demo` | 291 | 6 081 | 4 801 | 0 |
| `api` | 50 | 889 | 747 | 0 |
| `test` | 23 | 848 | 1 182 | 0 |
| `src` | 24 | 340 | 263 | 0 |
| `assets` | 11 | 203 | 43 | 0 |
| `scripts` | 3 | 518 | 0 | 0 |
| `.github` | 2 | 28 | 34 | 0 |
| single files | `vite.config.ts` · `vitest.config.ts` · `tsconfig.lib.json` · `tsconfig.demo.json` · `package.json` · `package-lock.json` · `CLAUDE.md` · `.gitignore` | | | |
| **total** | **4268 files, +22 882 / −1 821 066** | | | |

The −1.8M under `docs/` is tranche-u's own corpus, which master has never seen. It is **not** a
reconciliation question — it lands when tranche-u lands.

**What master has that tranche-u LACKS — at the release/CI layer, precisely:**

1. **`.github/workflows/release.yml`** — the two `ci(release)` hardening commits. tranche-u's copy
   packs with `npm pack --json --ignore-scripts > /tmp/value-pack.json`. master's copy instead uses
   a `RUNNER_TEMP` **`--pack-destination`** dir, asserts **exactly one** `.tgz` candidate, and adds
   **three packed-manifest equality checks** by `tar -xOf … package/package.json`: `name`,
   `version`, **`gitHead` vs `GITHUB_SHA`**. tranche-u has only the four *post-publish registry*
   checks (version · integrity · shasum · gitHead). **Master's is strictly stronger and catches a
   bad pack BEFORE `npm publish`.**
2. **`.github/workflows/ci.yml`** — master's is 35 lines lighter (the 7334c793 reduction).
3. **`src/` layout** — master carries `src/v4/**` + `src/math.ts`; tranche-u carries the flat
   `src/{color,css,foundation,easing.ts,quantize.ts,value.ts}`. ⟨cmd⟩ `git ls-tree --name-only origin/master src/`
   → `src/math.ts · src/subpaths · src/transform · src/v4 · src/vite-env.d.ts`.
4. **`package.json`** — master has `"boot-smoke"` and `"css-emission-probe"` script entries;
   tranche-u has neither. Conversely tranche-u **adds back** a `dependencies` block
   (`@mkbabb/glass-ui: ^7.0.0`, `@mkbabb/keyframes.js: ^6.0.0`) that master deleted at 7334c793.

**What tranche-u has that master LACKS at the same layer:** the 257-commit tranche corpus, the
restored runtime `dependencies` block, and the deletion of four probe scripts/eight tests that
existed at the merge-base. ⟨cmd⟩ `git ls-tree -r --name-only HEAD scripts/ci` → **only**
`scripts/ci/verify-packed-surface.mjs`. ⟨cmd⟩ same on `origin/master` → **four**:
`boot-smoke.mjs` · `css-emission-probe.mjs` · `oracle-slate-teeth.mjs` · `verify-packed-surface.mjs`.
**Provenance checked**: all three extra scripts existed at merge-base `86a9a178` and are **absent at
HEAD** — tranche-u deleted them; master's 3 commits never touched them ⟨cmd⟩
`git diff --name-only 86a9a178 origin/master -- scripts/ci/` → only `abrogation-sweep.mjs` +
`verify-packed-surface.mjs`.

**At `test/`** ⟨cmd⟩ `git diff --name-status HEAD origin/master -- test`: 8 files master has and
tranche-u lacks (`demo-state-cluster` · `dist/gitignore-auth` · `dist/ground-single-source` ·
`dist/shot-policy` · `frontend-headers` · `no-build-in-unit-suite` · `oracle-feasibility-leg` ·
`session-single-source`) — **all eight existed at merge-base and were deleted on tranche-u** — and
10 files tranche-u has that master lacks (`gradient-parse` · `ink` · `view-accents` ·
`value-domain-clamp` · `preview-chips` · `mix-v4` · `gradient-v4-consume` · `image-sampler-v4` ·
`picker-blob-config` · `demo/palettes/api/admin-palettes`).

**Which wave owns the reconciliation — read from the spec bytes:**

- **`.github/workflows/**` belongs to X-W1** ⟨cmd⟩ `sed -n '147,148p' docs/tranches/X/waves/W1.md`:
  `ci.yml | modify` · `deploy-pages.yml | modify`. And X-W1 **explicitly excludes release.yml**
  ⟨cmd⟩ `sed -n '168,170p' docs/tranches/X/waves/W1.md`: *"**Do NOT touch**: … `lighthouserc.json`
  …, `.github/workflows/release.yml`."*
- **X-W11 excludes the whole workflows tree** ⟨cmd⟩ `sed -n '99,100p' docs/tranches/X/waves/W11.md`:
  *"**Do NOT touch**: `src/**` · `demo/**` · `api/src/**` · `test/**` · `e2e/**` (X-W1 authors) ·
  `.github/workflows/**` (X-W1)."*
- **X-W11 nonetheless is the wave whose acts run on master** ⟨cmd⟩ `sed -n '46p' docs/tranches/X/waves/W11.md`:
  *"5. Fire the deploy of record on master; re-probe production for the released commit."* and
  ⟨cmd⟩ `sed -n '146,148p' docs/tranches/X/waves/W11.md`: *"push `v<cut>`; let `release.yml` run its
  own four equality checks; download both workflow artifacts. **Merge to master**; fire
  `deploy-pages.yml`; assert one non-skipped run; re-probe."*

**▶ THE FINDING: no X wave owns `.github/workflows/release.yml`.** X-W1 forbids itself; X-W11
forbids itself and then *executes against it*. The two `ci(release)` hardening commits on
`origin/master` are therefore **unowned by the tranche**, and X-W11's G4 would push a tag whose
`release.yml` is tranche-u's weaker pre-hardening copy. **X-W11 is the wave whose acts touch the
release/CI layer and therefore owns the reconciliation** — but its own bounds forbid it from doing
the reconciliation, so this needs an owner ruling, not an executor decision.

**Merge cost, measured read-only (no working tree, no refs, no stash touched):**

```
⟨cmd⟩ git merge-tree 86a9a178 HEAD origin/master | grep -c 'changed in both'   → 12
⟨cmd⟩ git merge-tree 86a9a178 HEAD origin/master | grep -c '^+<<<<<<<'          → 21
```
The 12 both-changed paths: `.github/workflows/ci.yml` · `.github/workflows/release.yml` ·
`docs/RELEASE.md` · `package-lock.json` · `package.json` · `src/subpaths/{color,easing,math,quantize}.ts` ·
`test/math.test.ts` · `tsconfig.lib.json` · `vite.config.ts`.
Per-file three-way (`git merge-file --diff3`, operating on scratchpad copies only):
`release.yml` → **1 conflict hunk** · `package.json` → **2** · `ci.yml` → **2**.

**Options, with costs and the risk each carries for the 4.0.0 immutable publish:**

| # | option | cost | risk to the immutable 4.0.0 |
|---|---|---|---|
| **A** | **merge `origin/master` into `tranche-u` before X-W9** | 12 conflicted paths / 21 hunks, hand-resolved; the `src/` → `src/v4/` relocation collides head-on with X-W9's public-surface law (derived subpath barrels, the `stylesheet.ts` split) | **LOW for 4.0.0 itself** (already published, immutable) — but the merge lands the 3 master commits' `src/v4` layout into a tree X-W9 is about to re-shape, so the *4.1* cut is sized against a layout nobody specced. `package.json`'s 2 hunks include the `dependencies` block master deleted — resolving it wrong ships 4.1 with no runtime deps declared. |
| **B** | **cherry-pick the three (`7334c793` · `e2652f1c` · `44ddaff7`)** | `7334c793` alone touches **205 files**; cherry-picking it re-imposes the `src/v4` relocation. Cherry-picking **only the two `ci(release)` commits** is far cheaper: they touch `release.yml` and nothing else (1 + 22 lines). | **LOWEST** for the two `ci(release)` commits: they *strengthen* the pack-time identity checks that guard the tag. `7334c793` carries the real risk — it deletes `dependencies` and relocates `src/`, either of which silently changes what `npm pack` emits at the 4.1 tag. |
| **C** | **declare `tranche-u` the tree of record; re-derive the CI layer in X-W11** | X-W11's bounds must be **amended** to admit `.github/workflows/release.yml` (today it is X-W1's exclusion and X-W11's forbidden path) — an E-3 addendum, not an in-place edit | **MEDIUM**: X-W11 would author release-pipeline bytes at the same wave that pushes the tag, with no prior CI run against them. A release workflow that has never run green before the tag is exactly the shape G4's falsifier exists to catch. |
| **D** | **rebase `tranche-u` onto `origin/master`** | 257 commits replayed over a tree whose `src/` layout differs; every one of the 12 both-changed paths conflicts at some commit; **every published X-tranche commit SHA changes**, including `31dcf279`, `014d62c8`, `5c5589c0`, `85e86a73` | **HIGHEST**: the tranche's own authorities are **tag-pinned by SHA** across COHESION §0h/§0i, the runbook and the ledger. A rebase invalidates every one of those citations at once — the epoch rule's worst case. **Not recommended.** |

**What the sitting actually needs to decide** (three separable words, not one):
1. **Do the two `ci(release)` hardening commits ride into `tranche-u` before X-W9's cut?**
   (Option B-narrow: 1 file, 23 lines, strictly-stronger pack-time checks.)
2. **Does `7334c793`'s `src/v4` relocation bind X-W9**, or does X-W9's public-surface law supersede
   it? The two specify *different* public surfaces for the same package.
3. **Which wave gets `.github/workflows/release.yml` added to its bounds** — X-W1 (by E-3 addendum
   to its Do-NOT-touch list) or X-W11 (by E-3 addendum to its bounds)? Today the answer is *neither*,
   and the tranche cannot publish 4.1 through a workflow it is forbidden to read or write.

Additional measured collision worth the owner's eye: **X-W1's §B5 baseline reads `ls scripts/ci/`
→ `verify-packed-surface.mjs` — `boot-smoke.mjs` absent**, and X-W1's bounds say
`scripts/ci/boot-smoke.mjs | create`. But `origin/master` already carries `boot-smoke.mjs`,
`css-emission-probe.mjs` and `oracle-slate-teeth.mjs`. X-W1 will **create a file master already
has**, which becomes an add/add collision at X-W11's merge-to-master. Under option A or B the
collision surfaces early and cheaply; under option C it surfaces at the release merge.

---

## Gathering receipts

Every figure above was read this seat, 2026-09-17, read-only. Sibling trees
(`../keyframes.js`, `../fourier-analysis`, `../parse-that`, `../glass-ui`) were read with
`git show` / `git status --porcelain` / `git rev-list` only — no write, no stash, no reset, no
`npm install|ci|build`. No product source (`src/` `demo/` `api/` `test/` `e2e/`) was opened for
edit. `scripts/dev/dev.sh` was neither staged nor touched.

**Self-count law**: this file is excluded from every count it publishes. Measured on the settled
bytes, self-excluded — `grep -l 'SITTING-DOSSIER' docs/tranches/X/execution/*.md | grep -v
'SITTING-DOSSIER-2026-09-17.md' | wc -l` → **1**, and the one hit is the EXECUTION LEDGER's own
pre-act row that commissioned this file ⟨cmd⟩ `grep -n 'SITTING-DOSSIER' docs/tranches/X/execution/LEDGER.md`
→ `:22 | P-3 | The opening sitting — owner-gated items ruled under the 2026-09-17 delegation →
COHESION §0j | OPEN 2026-09-17 | … dossier at 'execution/SITTING-DOSSIER-2026-09-17.md'`.
**Settled-byte measure of this file itself, double-run** (WRITE-THEN-MEASURE): `wc -l -c` → **958
lines / 71 106 bytes** at the first read, before the three dated corrections above; **964 lines /
71 715 bytes** at the second read, on the settled bytes this commit carries. `grep -c '^### '` →
**28** item blocks (27 owner-gated decisions + BRANCH-TOPOLOGY).
