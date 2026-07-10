# h-exec-recovery — EXECUTION-RESILIENCE: the per-wave §Recovery rider the T corpus does not carry

**Lane**: `h-exec-recovery` (T HARDENING; ZERO product-code / ZERO corpus edits — I REPORT + DRAFT,
the amend pass folds). **Substrate**: `tranche-t` @ HEAD `b54c284` (docs-only above
`tranche-s-close`; `git diff tranche-s-close..HEAD -- src/ demo/ api/` empty). **Charge**: the
owner's interruption worry, codified — *"I am not confident in the partial completions and many
interruptions we've had hitherto"* (SIX session-limit walls this session). Design the standing
per-wave **§Recovery rider** the wave docs SHOULD carry: the completion-brief pattern (audit
partials → patch brief → resume-from-journal → never blind-commit) as STANDING WAVE LAW, with
per-wave-type specifics (worktree vs mainline; the partial-state signature per lane type; the
seam-audit step at each wave close). Draft the exact rider text per wave type.

**Adversarial posture**: this is not a "propose a nicety" lane. The corpus's ENTIRE codification of
the owner's central worry is **two one-line precepts** — PP-14 (`T.md:453` "Lane-death recovery —
finish from the journal") and PP-15 (`T.md:454` "Harness waits must hard-fail") — and **neither is
operationalized anywhere in the ten wave docs**. Meanwhile T's OWN authoring proves the discipline
necessary at least four times over, and two of those partial-completion defects **are still live in
the tree at HEAD** (below). A one-line precept the corpus has already violated is a precept in name
only. The §Recovery rider is the missing operational body.

---

## §0 — Verdict + headline

**The wave-doc grammar has NO §Recovery section, and no wave references PP-14/PP-15.** Verified
mechanically:

- `grep -rn '^##.*[Rr]ecover\|[Rr]esil\|[Rr]esume\|[Pp]artial\|[Ss]eam' docs/tranches/T/waves/` →
  **zero** section headers. The section list is identical across all ten docs (§Goal · §Completion ·
  §Scope · §Triumvirate dispatch · §File bounds/worktrees · §Hard gate · §No-workaround prohibitions
  · §Format+lint cadence · §Verification artefacts · §Commit plan · §Dependencies · §BOOKS · §Evidence
  packets · §Hand-off) — **no §Recovery anywhere**.
- `grep -rn 'PP-14\|PP-15' docs/tranches/T/waves/` → **zero**. The two precepts that exist to govern
  interruption are cited by no wave gate, no cadence line, no artefact list.
- `grep -rn 'resumeFromRunId\|completion-brief\|patch brief\|blind-commit\|journal' docs/tranches/T/waves/`
  → **zero** on the first four; `journal` appears in `T.md`/`t-precepts-recap`/two hardening lanes,
  never in a wave doc. The completion-brief pattern the charge names is **absent from the corpus.**

**This is the single largest process gap in the T corpus relative to the owner's stated charge.** The
prevention half of the worry is codified (E-6 "batches of three agents… rate-limit walls",
`MANDATE:68` / `T.md:421`); the **cure half — what to do when a wall falls anyway — is not.** And a
wall WILL fall anyway: the batches-of-three law reduces wall probability, it does not eliminate it,
and the execution waves (W1 codemod / W4 forced-order / W7 specifier-walk) are exactly where a
mid-flight wall corrupts a tree rather than merely pausing it.

**The proof this is not hypothetical** — T's own authoring, four recovery events, two still-live
defects:

| Event | Artefact | Evidence | State |
|---|---|---|---|
| Charter completed from an untracked partial | `T.md` | `PROGRESS.md:108` "PP-14 exercised… a prior corpus lane died on a session limit leaving an untracked `T.md` partial" | recovered; `h-seam-charter` F1 found a residual phantom cross-ref the self-audit missed |
| plan-audit-2 completed from a partial | `t-plan-audit-2.md` | pass-1 died UNCOMMITTED; `h-seam-plan-audit-2` header | recovered; **SF-1: froze a stale substrate claim** (companion lane declared "NOT present" when it was landed) |
| Self-audit over-claimed its own rigor | `PROGRESS.md:108` | `h-seam-charter` F2: "verbatim-diffed, found faithful" asserted a byte-diff that was **not fully run** | inflated recovery claim; caught one commit later |
| Committed tool-call XML — the partial-completion smoking gun | `t-deferred-census.md`, `t-precepts-recap.md` | `grep -nE '</?(content\|invoke)'` → `t-deferred-census.md:257-258`, `t-precepts-recap.md:468-469` — **LIVE AT HEAD `b54c284`** | **STILL BROKEN.** `h-seam-fleet-resume` filed F1/F2 MUSTFIX; the standing cadence (`git diff --check`) does not catch XML tags |

The last row is decisive: **the corpus SHIPPED two partial-completion defects into its own body, they
survived the entire hardening pass so far, and the standing format cadence cannot see them.** That is
precisely the class the §Recovery rider's seam-audit step exists to gate.

**`mustFix = 3 · shouldFix = 3 · note = 3`.** The three MUSTFIX are the rider itself (F1 the section,
F2 the pattern body, F3 the per-type partial-state specs); the drafted rider text is §2–§3 below, ready
for the amend pass to lift verbatim into the wave-doc grammar + register in `T.md §8`.

---

## §1 — Findings

### F1 · MUSTFIX — the wave-doc grammar carries no §Recovery section; PP-14 is a one-liner never operationalized

- **Evidence**: the ten wave docs share one section grammar (verified via `grep -n '^## '` across
  `docs/tranches/T/waves/T.W*.md`); **none contains a §Recovery / §Resilience / §Resume section.**
  PP-14 ("Lane-death recovery — finish from the journal") lives only in `T.md:453` (compact ledger),
  `T.md:472` (§9 lesson-6 condensation), and `t-precepts-recap.md:158-166` (the full precept). The
  precept's own binding clause (`t-precepts-recap.md:164-166`) says "the mandate's own 'batches of
  three agents… to avoid rate-limit walls' is this precept as process; row-scoped path-scoped commits
  make partial recovery clean" — it **names the commit hygiene but never specifies the recovery
  protocol per wave.** The owner's charge is explicit and the corpus answers it with a slogan.
- **Corpus location**: the standing wave-doc grammar (all of `docs/tranches/T/waves/T.W0.md` …
  `T.W9.md`); the registration home is `T.md §8` "Per-wave standing gates" bullet (`T.md:427-432`).
- **Proposed amendment**: (a) add a **§Recovery** section to the standing wave-doc grammar, inserted
  **after §Commit plan and before §Dependencies** (the recovery-clean commit unit is §Commit plan's
  row/path-scoped commits; recovery reads §Verification artefacts' saved hashes — so §Recovery docks
  between the "how work commits" cluster and the "what depends on this" cluster). The generic body is
  §2 below. (b) Register it in `T.md §8`: append to the "Per-wave standing gates" bullet — *"· the
  §Recovery rider (the PP-14/PP-15 completion-brief protocol, per wave-type) carried by every wave
  doc; the wave-close seam-audit is a gate step."* This makes the section MANDATORY, not optional
  prose, and future tranches inherit it.

### F2 · MUSTFIX — the completion-brief pattern (audit → brief → resume-from-journal → never blind-commit) is absent; drafted as the §Recovery body

- **Evidence**: `grep -rn 'resumeFromRunId\|completion-brief\|patch brief\|patch-brief\|blind-commit'
  docs/tranches/T/` → the first four are **zero hits corpus-wide**; "blind-commit" appears once, inside
  PP-14's own one-line gloss (`t-precepts-recap.md:160`). The charge names a four-step pattern (audit
  partials → patch briefs → resumeFromRunId → never blind-commit); the corpus encodes **none of the
  mechanics** — no "what to read on resume", no patch-brief artefact, no "discard the incoherent
  half-step" rule, no seam-audit close step. PP-14 says "read the journal, finish it" but the corpus
  never says WHERE a lane journals (see F7), what a patch brief contains, or how resume differs from a
  fresh re-interpretation of the scope.
- **Corpus location**: the (to-be-added) §Recovery section of every wave doc; the pattern digest belongs
  in `T.md §8` beside E-6 (the prevention half) so prevention + cure sit together.
- **Proposed amendment**: adopt the generic §Recovery body drafted in **§2**. Its load-bearing clauses:
  (1) **audit before commit** — on resume read `git status`/`git diff` (the partial), `git log` since
  the wave head (the recovery-clean committed rows), the lane journal, and the §Scope table (last-done
  vs next); NEVER `git commit` the dying tree sight-unseen. (2) **the patch brief** — a named artefact
  (`docs/tranches/T/audit/recovery/T.W<n>-<lane>-brief-<date>.md`) recording LANDED / IN-FLIGHT / the
  dying agent's last observation / the resumed work-order. (3) **resume the work-order, not from
  scratch** — same lane, same §Lane-order/§Forced-order sequence; a half-step that cannot finish
  coherently is DISCARDED and re-driven (E-3: no half-migrated surface), never committed as-is. (4)
  **seam-audit at close** — a gate step that hunts the partial-completion signatures (§3's per-type
  list + the mechanical greps of F4).

### F3 · MUSTFIX — no wave doc names its partial-state signature or its resume protocol; the execution waves (W1/W4/W7) carry the highest partial-corruption risk with zero rider

- **Evidence**: a session wall does different damage per wave TYPE, and the corpus writes down none of
  it. The three execution waves are structurally the most dangerous:
  - **W1** (`T.W1.md:82-83`) runs the color-domain **atomic codemod over ~24 sites LAST**; a wall
    mid-codemod leaves half the callsites on the new specifier and half on the old — **a broken tree,
    not a resumable partial.** The MOVE-MAP (`T.W1.md:93-99`) is every downstream wave's re-anchoring
    table; a wall that lands moves but not the MOVE-MAP commit orphans PP-11 for the whole tranche.
  - **W4** (`T.W4.md:43-49`, §Forced order) contends for **ONE band geometry** (C1); the §No-workaround
    law (`T.W4.md:136`) forbids "provisional reservations to unblock a later item early" — but a
    session wall mid-forced-order LEAVES exactly such a provisional reservation in the tree, and a
    resumed agent that inherits it re-litigates precisely what the forced order exists to prevent. The
    PI-4 same-commit law (`T.W4.md:118-122`) means a wall between the seat formula and its re-derived
    mobile gate produces a **structurally broken commit.**
  - **W7** (`T.W7.md:52-72`, §Scope) walks import specifiers `^4→^5` and DELETES each interim in its
    swap commit ("NO interim survives its consume", `T.W7.md:125-126`); a wall mid-walk leaves a
    non-building mixed-version tree, and a wall between a swap and its interim-deletion leaves a
    **half-fire** the "interims deleted in the same commit" law cannot self-detect. G-CUR-1
    (`T.W7.md:48-50`) requires a rebuilt+stamped dist — a resumed walk that trusts the pre-wall build
    certifies stale.
- **Corpus location**: each wave doc's §Recovery section (per-type body); the highest-risk trio W1/W4/W7.
- **Proposed amendment**: adopt the **per-wave-type §Recovery deltas drafted in §3** — each names the
  concrete partial-state signature(s) for that lane type and the resume specifics (discard-and-re-drive
  for atomic codemods; re-derive-from-last-committed-step for the contended band; rebuild-dist-first for
  the adopt walk). The seam-audit greps that already live in these waves' §Hard gates (the shim/`export
  *` grep at `T.W1.md:140,154`; the interim-survival grep implied by `T.W7.md:116`) are re-purposed as
  the partial-detectors — the amendment makes that dual role explicit.

### F4 · SHOULDFIX — the wave-close seam-audit step is missing, and the standing cadence cannot see the partial-completion signature it most needs to catch

- **Evidence**: two committed tool-call-XML artefacts are **LIVE at HEAD** — `t-deferred-census.md:257-258`
  and `t-precepts-recap.md:468-469` (`</content>`/`</invoke>` tails of the authoring Write call). The
  standing §Format+lint cadence uses `git diff --check` (`T.W0.md:137`, `T.W9.md:153`) which checks
  whitespace/conflict-markers, **not** stray XML — so this exact class shipped and survived. The
  wave-close gates run PP-8/lint/typecheck/test but **no step hunts partial-completion residue** (leaked
  tool wrappers, half-migrated barrels, orphaned worktrees, frozen substrate claims).
- **Corpus location**: every wave's §Hard gate + §Format+lint cadence; the exemplar cadence lines
  `T.W0.md:133-137`, `T.W1.md:172-177`, `T.W9.md:150-153`.
- **Proposed amendment**: add to every wave's §Format+lint cadence a **tool-artefact grep** —
  `grep -rnE '</?(content|invoke|parameter|antml)' <the wave's touched docs>` MUST be empty before any
  docs commit (it catches the F1/F2-of-`h-seam-fleet-resume` class `git diff --check` misses) — and make
  the **wave-close seam-audit a named §Hard-gate row** (step 4 of the §2 protocol): tool-artefact grep
  clean · substrate/sibling claims re-verified against the current tree · `git worktree list` = the
  wave's expected lanes only. This is the CURE (a standing grep in every cadence) to `h-seam-fleet-resume`'s
  finding (strip these two files) — it stops the next one landing.

### F5 · SHOULDFIX — recovery self-audits must NAME the command that ran the verify; the corpus already over-claimed once

- **Evidence**: `h-seam-charter` F2 found the PP-14 completion self-audit (`PROGRESS.md:108`) claimed the
  R-ledger was "verbatim-diffed… found faithful, completed" while a strict byte-diff would have flagged a
  silent §2.7→D9 / §2.1→D1 substitution — i.e. **the "verbatim-diffed" claim over-stated the rigor
  actually applied** (the byte-diff "either was not run or was run loosely"). A recovery that asserts a
  check it did not fully perform is a worse failure than no check, because it manufactures false
  confidence at exactly the seam the owner distrusts.
- **Corpus location**: the §Recovery protocol's audit + seam-audit steps (§2 steps 1 and 4); the standing
  lesson home `T.md §9` (the PP-11/PP-12 discipline).
- **Proposed amendment**: the §Recovery rider requires every resume/seam-audit assertion of the form
  "diffed / verified / found faithful" to **cite the exact command and its output** (a scratch script
  path or the inline `diff`/`grep` + result), never a bare adjective — the PP-11/PP-12 discipline applied
  to recovery. A patch brief or close record that says "audited, found faithful" without the command is
  itself a seam-audit failure.

### F6 · SHOULDFIX — the resume audit must re-verify substrate/sibling-lane state against the CURRENT tree, never inherit the dying agent's snapshot

- **Evidence**: `h-seam-plan-audit-2` SF-1 — the completed-from-partial `t-plan-audit-2.md` declares its
  companion `t-plan-audit-1.md` "NOT present / do not cite as extant" (`:31-32`, `:670-671`) when the
  companion **was already landed at `385c2d2`, the parent of plan-audit-2's own completion commit.** The
  recovery **froze a pre-wall substrate moment** and shipped a claim false at commit time. This is the
  frozen-substrate hazard: a resumed agent naturally trusts the dying agent's world-picture, but the tree
  moved (sibling lanes landed, the producer HEAD advanced — `h-seam-fleet-resume` F12 shows five distinct
  substrate stamps across the fleet as the docs-HEAD accreted).
- **Corpus location**: the §Recovery protocol's audit step (§2 step 1) + seam-audit (step 4); this couples
  to PP-11 ("resolve against the live tree").
- **Proposed amendment**: the §Recovery rider's audit step requires **re-reading every substrate anchor,
  sibling-lane presence claim, and producer HEAD-stamp against the CURRENT tree on resume** (`git rev-parse`,
  `ls` the sibling artefacts, re-stamp the producer) — the dying agent's cited state is a starting hint,
  never inherited as fact. A resume that carries forward a "NOT present" / substrate-hash claim without
  re-verification is a seam-audit failure.

### F7 · NOTE — PP-14 says "the journal" but the corpus never names where a lane journals; the rider must name it

- **Evidence**: PP-14 ("recover the work-order from the journal") presupposes a journal, but no corpus
  document says WHERE a lane journals. `h-refine-hardening-wave` already hit this for W8 specifically —
  RF-4 (`:178-179`) warns "six session-limit walls… an unnamed load-bearing artefact is exactly the class
  of thing that lands in a commit message and vanishes from the next recovery's inventory", and its
  playbook mints canonical per-pass homes (`w8-certification/passes/<surface>.p<i>.md`, `:239-241`). That
  W8-only precedent generalizes: **a recovery can only "read the journal" if the journal has a canonical
  address.**
- **Proposed amendment**: the §Recovery rider names the journal as the union of three addresses the corpus
  already produces: (i) the lane's **scratchpad** dir (the working notes the dying agent left); (ii) the
  **row-scoped/path-scoped commits** since the wave head (the recovery-clean landed ground — §Commit plan
  is the journal-of-record); (iii) the **`PROGRESS.md` event log** (the tranche-level narrative). The
  patch brief (F2) is the fourth, minted on resume. Generalize `h-refine-hardening-wave`'s per-pass home
  convention to `docs/tranches/T/audit/recovery/` for the patch briefs.

### F8 · NOTE — resumeFromRunId is a harness affordance; keep the rider tool-agnostic with the run-id as the named hook

- **Evidence**: the charge names `resumeFromRunId` (a harness run-handle that continues a specific run so
  the journal is unbroken); the corpus contains zero references to it. If the rider hard-codes a harness
  primitive, the law dies the day the harness changes (the CLAUDE.md `proof:*` over-fit lesson — a
  mechanism codified too specifically goes stale).
- **Proposed amendment**: the §Recovery rider states the LAW tool-agnostically ("finish from the journal
  / patch brief") and names `resumeFromRunId` as **the preferred operational hook WHEN the harness exposes
  it** (resume the same run so the journal is continuous), with the patch brief as the fallback continuity
  when it does not. The invariant is continuity-of-work-order, not the specific primitive.

### F9 · NOTE — E-6 batches-of-three is the PREVENTION half already in the corpus; the rider is the CURE half — pair them, don't conflate

- **Evidence**: E-6 (`MANDATE:68`, `T.md:421`) mandates "batches of three agents in parallel (rate-limit
  walls)" — this REDUCES wall frequency but is silent on what to do when a wall falls mid-batch (one of
  three lanes dies, two are green). `t-precepts-recap.md:164-166` correctly reads batches-of-three as
  "PP-14 as process" but the two are different halves: prevention (fewer walls) vs cure (clean recovery
  when one hits). A reader could mistake the prevention law for a complete answer.
- **Proposed amendment**: the §Recovery rider opens by naming the pairing — E-6 batches-of-three is
  prevention; §Recovery is the cure; a mid-batch wall recovers the DEAD lane via the protocol while the
  live siblings continue (this is why W1/W5/W6's disjoint single-writer worktrees make recovery clean —
  a dead lane cannot have corrupted a sibling's tree). Cross-reference E-6 ↔ §Recovery in `T.md §8`.

---

## §2 — DRAFT: the generic §Recovery rider (lift verbatim into every wave-doc grammar)

> ## §Recovery (STANDING — the PP-14/PP-15 completion-brief rider; binds every dispatch AND every resume of this wave)
>
> A session-limit / rate-limit wall may fall at ANY point in this wave. E-6's batches-of-three make walls
> rarer; this rider is the cure when one falls anyway. The wave is then RESUMED — never re-started blind,
> never abandoned. The four-step completion-brief protocol governs (PP-14 operationalized; PP-15 for the
> harness-wait class):
>
> 1. **AUDIT THE PARTIAL — before any new work, before any commit.** On resume the incoming agent reads,
>    in order: (a) `git status --porcelain` + `git diff` of the dying lane's tree/worktree — the
>    uncommitted delta IS the partial; (b) `git log` since the wave head — the row-scoped/path-scoped
>    COMMITTED rows are the recovery-clean ground (§Commit plan is the journal-of-record); (c) the lane
>    **journal** = its scratchpad notes + the dying agent's last recorded observation (a dying lane's last
>    observation can be the tranche's most valuable finding); (d) this wave's §Scope table — last-completed
>    item vs next un-started. **RE-VERIFY every substrate anchor, sibling-lane presence claim, and producer
>    HEAD-stamp against the CURRENT tree** (`git rev-parse`, `ls`, re-stamp) — the dying agent's cited state
>    is a hint, never inherited (PP-11). **NEVER `git commit` the dying tree sight-unseen** (the blind-commit
>    prohibition).
> 2. **WRITE THE PATCH BRIEF** — `docs/tranches/T/audit/recovery/T.W<n>-<lane>-brief-<date>.md`: **LANDED**
>    (committed rows, by hash) · **IN-FLIGHT** (uncommitted/staged, and a verdict: coherent-and-finishable
>    OR a half-step to DISCARD) · the dying agent's last observation · the **NEXT work-order** (the resumed
>    scope, not a fresh re-interpretation). The brief is the resume's work-order and the artefact the next
>    recovery reads if this resume also walls.
> 3. **RESUME FROM THE WORK-ORDER, not from scratch.** Finish the SAME lane's items in the SAME order — the
>    §Lane-orders / §Forced-order laws bind the resume identically. Where the harness exposes a run handle
>    (`resumeFromRunId`), resume THAT run so the journal is continuous; otherwise the patch brief is the
>    continuity. A half-step that cannot be finished coherently is **DISCARDED and re-driven**, never
>    committed as-is (E-3: no half-migrated surface ever lands).
> 4. **SEAM-AUDIT AT WAVE CLOSE — the partial-completion hunt is a §Hard-gate row.** Before the gate
>    certifies: (a) **tool-artefact grep** `grep -rnE '</?(content|invoke|parameter|antml)' <the wave's
>    touched docs>` = empty (the committed-tool-XML class `git diff --check` cannot see); (b) every
>    substrate/sibling claim re-verified against the current tree (step 1(d) re-run at close); (c) any
>    recovery/verify assertion NAMES the command that ran it + its output — never a bare "audited, found
>    faithful" (PP-11/PP-12); (d) `git worktree list` = this wave's expected lanes only (no orphaned worktree
>    from a dead lane); (e) the wave's own structural invariant re-checked as a partial-detector (per §Recovery
>    deltas below).
>
> A wave that recovers a partial it cannot fully finish **NAMES the residual** (PP-16); it is never silently
> reconciled to green.

---

## §3 — DRAFT: the per-wave-type §Recovery deltas (each wave doc appends its type block to §2)

Each block states the wave's **partial-state signature(s)** (what a wall leaves in the tree) and the
**resume specifics** that override or sharpen §2 for that lane type.

### W0 — single serial, MAINLINE (no worktrees): doc / CI / test-tree edits + the one irreversible dispatch

> **Partial signatures**: a packet DISPATCHED but its re-stamp + inbox cite not recorded (W0-1 —
> `T.W0.md:40`); an oracle minted GREEN where its defect is live (a proxy, not a partial — re-mint born-RED,
> `T.W0.md:44`); a legacy grep-zero claimed but the deletion uncommitted; `test:dist` wired but CI not green.
> **Resume specifics**: the partial IS the working tree (single-writer mainline — no worktree to audit); never
> assume a prior W0 item "landed" without its commit + its grep/dispatch capture in §Verification artefacts.
> **The dispatch (W0-1) is the ONE irreversible act** — if a packet was already sent, recover its re-stamp +
> inbox cite from the letter's dispatch record; do NOT re-send (double-dispatch is a producer-inbox defect,
> not a clean retry).

### W1 — three worktree lanes (demo ∥ api ∥ src): the codemod wave, HIGHEST structural risk

> **Partial signatures**: an **atomic codemod stopped mid-24-sites** (the color-domain keys codemod,
> `T.W1.md:82-83` — half on the new specifier, half on the old = a broken tree, the canonical W1 hazard); the
> **MOVE-MAP uncommitted while moves landed** (`T.W1.md:93-99` — downstream PP-11 re-anchoring orphaned); a
> **barrel half-migrated** (a stray `export *` or a re-export shim left at an old path); an orphaned sibling
> worktree.
> **Resume specifics**: an uncommitted **atomic codemod is ALL-OR-NOTHING — DISCARD the half-application and
> re-drive from the MOVE-MAP row** (§2 step 3's discard case), never commit it half-applied. On resume the
> **MOVE-MAP commits FIRST** so downstream re-anchoring survives a second wall. Seam-audit: the shim/`export *`
> grep (already §Hard gate #5/#9, `T.W1.md:140,154`) doubles as the partial-detector; the dts additive-only
> diff (#8) catches a half-migrated barrel; `git worktree list` = demo ∥ api ∥ src only. Because the three
> trees are writer-disjoint (`T.W1.md:125`), a dead lane cannot have corrupted a sibling — audit each
> independently.

### W2 ∥ W3 — parallel π lanes (worktrees): disjoint boot-chain vs materials

> **Partial signatures**: a **boot beat half-authored out of order** (the B0–B4 chain is ordered, C4 puts W2-5
> after W2-1 — a tree with B2 landed but not B1's plate-land is an ORDER VIOLATION, not a benign partial);
> **uncommitted π before/after frames** (the visual evidence the gate certifies on); a **π-harness wait that
> SWALLOWED on the dying run** (PP-15 — a swallowed wait hides the very defect the shot exists to record).
> **Resume specifics**: **re-drive the π capture** — frames are cheap to re-shoot and a pre-wall frame whose
> harness may have swallowed its wait is untrusted (PP-15 makes the wait a hard gate, not a courtesy). The
> boot-beat order (C4) binds the resume identically. W2 and W3 are disjoint surfaces — a W2 wall cannot touch
> W3's lane; the seam-audit confirms neither committed a half-beat and that `git worktree list` = the two live
> lanes only.

### W4 — single serial, FORCED ORDER: the contended-band hazard (unique to W4)

> **Partial signature (W4-specific)**: a wall mid-forced-order leaves a **PROVISIONAL RESERVATION in the ONE
> contended band** — the readout tuple / seat / console all contend for the same geometry (C1,
> `T.W4.md:43-49`). A resumed agent that INHERITS a half-derived reservation re-litigates exactly what the
> forced order exists to prevent. A wall inside the PI-4 same-commit step leaves the seat formula committed
> without its re-derived mobile gate = a **structurally broken commit** (`T.W4.md:118-122`).
> **Resume specifics**: **re-derive the band from the LAST COMPLETED forced-order STEP's COMMITTED state,
> never from an uncommitted half-step.** If the wall fell mid-step (e.g. mid-W4-5 seat), that step is
> re-driven WHOLE against the prior step's committed band — the §No-workaround "no provisional reservations
> to unblock a later item early" law (`T.W4.md:136`) binds the resume literally. Seam-audit: verify the PI-4
> same-commit invariant (formula + gate in ONE commit) held; a split across two commits is a partial-fire
> to re-drive.

### W5 ∥ W6 — parallel worktree lanes: disjoint feature surfaces

> **Partial signatures**: one disjoint feature lane (gradient / easing / dock+nav / generate — the W6
> single-writer map, `T.W6.md:41-48`) died while siblings are green; the hazard is committing a **half-lane a
> sibling's gate then reads as done**. A resume that "helpfully" re-touches the KEEP set (F6, canon — do not
> re-litigate) is itself a defect.
> **Resume specifics**: audit each lane's partial INDEPENDENTLY — the single-writer map is total + disjoint,
> so a dead gradient lane cannot have corrupted the easing lane's tree; recover only the dead lane. Do NOT
> re-touch the F6 KEEP set. Seam-audit: `git worktree list` = the wave's live lanes only; each lane's committed
> rows reconciled against its §Scope items (a lane with fewer commits than scope rows is a partial to resume,
> not a lane to close).

### W7 — trigger-gated float, single serial: the specifier-walk + in-commit-interim-deletion hazard

> **Partial signatures**: a wall **mid-specifier-walk** leaves a non-building mixed-version tree (some
> `@mkbabb/glass-ui` imports on `^5`, some on `^4`); a wall between a swap and its interim-deletion leaves a
> **half-fire** the "NO interim survives its consume" law (`T.W7.md:125-126`) cannot self-detect; a **STALE
> dist certified** (G-CUR-1, `T.W7.md:48-50`).
> **Resume specifics**: **rebuild + HEAD-stamp the dist FIRST on every resume** (the G-CUR-1 precondition
> re-runs per resume, not once per wave — never trust the pre-wall build); re-derive the walk against the
> current MOVE-MAP. Because W7 FLOATS, a resume may find MORE T waves closed than the dying run saw —
> **re-derive the swap set against the CURRENT wave state** (`T.W7.md:157-160`: a pre-W3 firing walks fewer
> swaps; a resumed post-W3 firing walks more). Seam-audit: grep for surviving interims per swap commit (the
> interim-deletion invariant as partial-detector); `boot-smoke --force` cold catches the mixed-version tree.

### W8 — batches-of-3 Fable + non-authoring assembler: the taste-loop wave

> **Partial signatures**: a filed remediation row un-landed; the certification package half-assembled (frames
> captured, bracket table / owner-line index missing); a **critique↔remediation loop mid-iteration** — DISTINCT
> from a session wall: the loop bound-at-3 is `h-refine-hardening-wave`'s RF-2/RF-8 machinery, and a session
> wall mid-iteration **resumes the SAME iteration, it does NOT reset the count.**
> **Resume specifics**: the per-pass canonical homes `h-refine-hardening-wave` already mandates
> (`w8-certification/passes/<surface>.p<i>.md`, its §P) ARE the journal — a resumed W8 reads them, never
> re-critiques fresh. The **non-authoring-assembler law binds the resume**: a recovery agent that authored a
> remediation row cannot assemble the package. A wall BEFORE the owner's verdict leaves the wave OPEN — which
> is already the correct honest state (`T.W8.md:110-112`); never a proxy sign-off to "finish" the recovery.

### W9 — close, 1–2 serial: the mid-merge hazard (highest stakes in the tranche)

> **Partial signatures**: a **mid-ledger-walk** (some finding→item rows reconciled, some not — a zero-drop
> claim on a partial walk is FALSE); a **mid-merge partial** (the `--no-ff` merge started, conflicts
> half-resolved — the single most dangerous partial in T); FINAL.md half-authored.
> **Resume specifics**: the merge is the ONE irreversible-adjacent act — a resumed close **audits the merge
> state first** (`git status`; `git merge --abort` + re-drive if the merge is incoherent) before ANY new
> commit. `git worktree list` = main tree only is BOTH a §Hard-gate row (`T.W9.md:134`) AND the seam-audit's
> orphan-worktree check. The ledger walk **re-runs WHOLE** — a partial reconciliation is re-driven, never
> trusted (a "zero-drop" claim must cover every row in one continuous pass, per F5's command-naming rule).
> PP-16 binds: a close recovering a partial it cannot fully finish names the residual `complete_with_misses`.

---

## §4 — Scope + what this lane did NOT touch (disclosure)

**Verified**: the absence of any §Recovery section + PP-14/PP-15 reference across all ten wave docs
(mechanical grep); the four T recovery events + the two STILL-LIVE committed-XML seams (re-run at HEAD
`b54c284`); the exact wave-doc grammar + insertion anchors; the W1/W4/W7 structural hazards read against
their own §Scope/§No-workaround/§Hard-gate lines; the E-6 prevention half (`MANDATE:68`/`T.md:421`);
PP-14/PP-15 full text (`t-precepts-recap.md:158-174`); `h-refine-hardening-wave`'s W8-only recovery
precedent (RF-4 + §P canonical homes) — GENERALIZED here, not duplicated.

**Out of lane (owned by siblings, cited not re-filed)**: the strip-the-XML fix for
`t-deferred-census.md:257-258` / `t-precepts-recap.md:468-469` (`h-seam-fleet-resume` F1/F2 owns the strip;
this lane owns the standing grep that prevents the NEXT one); the phantom §2.7/§2.1 cross-ref
(`h-seam-charter` F1 / `h-seam-s-state` F-1); the stale companion-note (`h-seam-plan-audit-2` SF-1 — cited
as F6's evidence); the W8 critique↔remediation loop scheduling (`h-refine-hardening-wave` RF-1/RF-2/RF-8 —
a DIFFERENT loop from session-death recovery; my W8 delta defers to it). Everything checked returned the
gap this lane exists to close: the corpus prevents walls and never says what to do when one falls.

*Provenance: greps scripted this pass against `tranche-t` @ `b54c284`; wave-doc line anchors against the
`9b221f9`/`9d0d6b1`-era content (unchanged at HEAD). Zero product-code, zero corpus edits by this lane —
the drafted §2/§3 rider text is FOR the amend pass to lift, not landed here.*
