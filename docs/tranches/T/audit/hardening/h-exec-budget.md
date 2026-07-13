# h-exec-budget — EXECUTION BUDGET SANITY across the T wave DAG

**Lane**: `h-exec-budget` (T HARDENING; ZERO product-code / corpus edits — I REPORT, the amend
pass folds). **Substrate**: `tranche-t` @ `b54c284` (docs-only above `2db417e`; every `file:line`
below reads the S-close tree — `git diff tranche-s-close..HEAD -- src/ demo/ api/` is empty).
**Charge**: per-wave scale sanity — lane-count × expected depth vs the **S actuals** (S waves ran
**6-9 agents, 0.5-2M tokens each**), where the DAG risks session-limit walls, whether the
`E-6` "batches of three" bound is actually respected in each wave's own arithmetic, and whether
any wave's scope should be split. Advisory precision throughout: **orders of magnitude, not false
exactness** (PP-10).

**Method**: read all 10 `waves/T.W*.md` `**Agents**:` lines + `§Scope` item tables + `§Commit
plan` checkpoint granularity; cross-read S's own 10 `waves/S.W*.md` `**Agents**:` lines as the
calibration baseline; cross-read `t-coloc-{components,composables-lib,backend,src}.md` for
file-count ground truth under the E-1 restructure; cross-read the sibling
`h-refine-hardening-wave.md` (already-computed W8 pass-slot arithmetic) to avoid re-deriving what
a sibling lane already proved, and to carry its number into the cross-wave comparison this lane
is chartered to make. **Adversarial framing**: this SAME 18-lane audit fleet already hit **six
session-limit walls** doing pure-analysis work (`h-seam-fleet-resume.md` §headline) — a much
lighter load than any design/implementation wave below. If reading+writing docs walled six times,
the corpus's silence on expected wall-count for actual code waves is itself a finding.

**Headline**: batch-COUNT hygiene (the E-6 "≤3 parallel" rule) is respected almost everywhere at
the *stated-cap* level — but batch-count is the wrong instrument for the real risk. The corpus
never estimates batch-**depth** (files touched × sequential items per single-writer lane), and on
that axis three waves are badly out of proportion to the S baseline: **W8 (the hardening wave) is
the single fattest wave in the entire DAG — fatter than W1 or W4 by a full order of magnitude —
yet is the one place the task brief's own priors (W1/W4) didn't point**; **W1's three lanes
compress ~200 files of mechanical restructuring into single continuous writers with NO named
execution-unit breakdown** (unlike W4 and W8, which both enumerate their internal steps by name);
and **W4's forced-order knot, while well-checkpointed, has no stated expectation of how many
session recoveries it should need**, despite being denser than any single S.W4-class wave.

---

## §1 — The per-wave scale table (nominal cap · named items · file-scope · S-precedent match)

| Wave | Nominal `Agents:` | Named work-units | File-scope evidence | Closest S precedent (nominal) | Verdict |
|---|---|---|---|---|---|
| T.W0 | 1 serial | 6 items (W0-1..W0-6) | small, enumerated file list (`T.W0.md:83-90`) | S.W0 — 1 serial, 9 items (`S.W0.md:7`) | **fine** — T.W0 has FEWER items than its precedent |
| **T.W1** | 3 (1/lane: demo/api/src) | UNNAMED batch count — "Per-lane move-batch commits… each batch names its MOVE-MAP rows" (`T.W1.md:189`) | demo: **146 components + 29 composables + 24 lib ≈ 199 files** (`t-coloc-components.md:15`, `t-coloc-composables-lib.md:24,77,123`); src: 15 flat `parsing/` files + 28 `color/` files + the ~58-callsite L1 brand (`t-coloc-src.md:84,110`; `T.md:380`) | S.W2 (≤4) + S.W4 (≤6) + S.W5 (≤6) COMBINED — the closest 3-wave S analog to what W1 does in ONE wave | **undersized structure** — see F1 |
| T.W2 | 1 single-writer serial | 5 items (W2-1..W2-5) | ~4-5 files (`App.vue`, `index.html`, boot composables) | S.W0 (1 serial) / S.W6 (≤4) | fine, modest |
| T.W3 | **stated ≤3 parallel** | 4 named lanes: core(W3-1+W3-4) + W3-2 + W3-3 + W3-5, "run beside" the core (`T.W3.md:15-18`) | tier tokens + `PaneHeader.vue` + 3 consumer surfaces | S.W6/S.W7 (≤4) | **arithmetic mismatch** — see F3 |
| **T.W4** | 1 serial (+1 disjoint) | 7 forced-order items, each independently S.W4-class | `ColorPicker.vue`/`ColorComponentDisplay/`/`ComponentSliders/`/`readoutReservation.ts`/`PaneHeader.vue`/`HeroBlob/` (`T.W4.md:88-91`) | S.W4 (≤6, ONE surface-class: title+header+thumbs+rail+docs) | **densest well-checkpointed wave** — see F2 |
| T.W5 | ≤3 (1 motion lane + 1 census agent) | 11 retune rows, mostly small per-site CSS/curve edits | ~10 named files (`T.W5.md:100-105`) | S.W3 (≤4, CSS-diet) | fine, comparable |
| T.W6 | ≤6 (4 lanes, batched by 3) | 8 items across 4 lanes (G/E/D/N) | moderate, per-lane files named | S.W4/S.W5 (≤6) | fine — correct precedent match |
| **T.W7** | 1 serial | Segment 1 (S.W8's 18-item walk, itself 1 serial) + Segment 2 (9 payload rows) + Segment 3 (~8 ledger rows) ≈ **35 sequential items** | cross-cutting `demo/@/**` specifier walk | S.W8 (1 serial, 18 items) | **~2× S.W8's own scope**, same nominal "1 serial" — see F4 (trigger-gated, lower urgency) |
| **T.W8** | "batches of three" (no cap stated) | **12 census surfaces × ≤3 critique/remediation rounds** (`h-refine-hardening-wave.md`'s own arithmetic: ≤36 pass-slots + remediation batches + package assembly) | probes the WHOLE app, 12 surfaces, every remediation row is its own single-writer lane | no S precedent of this shape exists — S's taste review was non-authoring + single-pass | **fattest wave in the DAG** — see F1 (lead finding) |
| T.W9 | 1-2 serial | FINAL.md zero-drop ledger (T-1..T-29 + fleet finds) + ~30 book rows + repo sweeps + **3 full CLAUDE.md rewrites** (new vs S.W9) | tranche-wide reconciliation | S.W9 (1-2 serial, no full doc rewrites) | mild scale-up, in-line — NOTE only |

---

## §2 — Findings

### F1 — MUSTFIX — T.W8 is the fattest wave in the entire DAG by an order of magnitude, and it is nowhere flagged as such for a dispatcher sizing session/token budget

**Evidence.** `T.W8.md:16`: *"critique passes + remediation lanes dispatched in **batches of
three**"* — no overall cap is stated (contrast every other wave's `**Agents**:` line, which all
name a number). The scope (`:52-55`) is **11 default surfaces** (picker · About ·
palettes/browse+dialog · extract · mix · generate · gradient · easing · dock+nav+menus ·
boot/atmosphere/blob · admin), which the sibling `h-refine-hardening-wave.md` independently
extends to **12 census rows over all 14 `ViewId`s** and computes the wave's own worst-case
arithmetic: *"12 census rows → 4 pass-batches per iteration round; ≤3 rounds → **≤36 pass-slots**
+ the remediation batches"* (`h-refine-hardening-wave.md` §P.3 item 4). That number is CRITIQUE
PASSES ALONE. Layer on: (a) remediation lanes for whatever rows the passes file (RF-1's own
fix requires re-batching at the FILE-shared-anchor granularity, which can only ADD batches, never
collapse them); (b) the up-to-3-round re-critique loop (`h-refine-hardening-wave.md` §P.3 items
2-3) which is Per-surface, not per-batch — a surface with unresolved rows re-enters at
pass_{i+1}; (c) ONE package-assembly agent (non-authoring, `T.W8.md:61,`117`). Conservatively:
**≤36 pass-slots + a comparable-or-larger remediation-batch count** puts total W8 agent-dispatch
count in the **30-70+ range** for a single wave — against the S baseline of **6-9 agents per
wave**. No S wave, including the two ≤6-agent design waves (S.W4/S.W5), approaches this shape:
S's taste review was explicitly **single-pass, non-authoring** (S §13 lesson 12's own precedent,
carried into T's lesson 12) — T.W8 is a NEW wave *shape* (iterative critique↔remediation with a
3-round bound) that has no S analog to calibrate against, and the corpus's own arithmetic
(computed by a sibling lane, not by `T.W8.md` itself) is the only place this scale is visible.

**Why it matters operationally**: the task's own framing names W1 and W4 as "the fat waves" — a
reasonable prior given they are the ones with `**Agents**: 1` on a whole-tree/whole-knot scope.
But by pure agent-dispatch-count, **W8 dwarfs both**: W1 nominally runs 3 total agents, W4 runs
1-2; W8 runs on the order of ten times that. If a dispatcher sizes session/wall-clock expectations
off the visible `**Agents**:` lines (the only place every OTHER wave states a number), W8 reads as
comparably scoped to W6 ("batches of three" sounds like W6's "dispatched in batches of three,
≤6") when it is actually the single largest execution commitment in the tranche.

**Where**: `T.W8.md:16` (`**Agents**:` line, no cap); `T.W8.md:52-55` (§Scope item 1, the 11/12-
surface census); `h-refine-hardening-wave.md` §P.3 item 4 (the ≤36 pass-slot arithmetic, the only
place in the corpus this number is computed).

**Proposed amendment**: state an explicit worst-case agent-dispatch estimate on `T.W8.md`'s own
`**Agents**:` line (not only in a sibling hardening lane's playbook) — e.g. *"≤6 per batch;
worst-case ≤36 critique pass-slots + a comparable remediation-batch count across up to 3
iteration rounds — the single largest wave in the DAG by agent-dispatch count, budget
accordingly (expect multi-day wall-clock, not a single session)"*. This is a one-line addition
with no content risk; it just makes the already-correct sibling-lane arithmetic visible where a
cold dispatcher will actually look.

---

### F2 — SHOULDFIX — T.W4's forced-order knot is denser than any single S wave and carries no stated expectation of how many session recoveries it should cost, despite being the DAG's most heavily-contended single-writer chain

**Evidence.** `T.W4.md:16-20`: *"**Agents**: 1 serial writer over the C1 knot in the FORCED
order… W4-6 is the one file-disjoint sweep… may run as a second lane"* — so 1-2 total agents.
The forced order (`T.W4.md:45-49`) chains **7 items** — titles ×φ (D2) → readout tuple/tnum →
channel strip → console (D5, letter-rail + WatercolorDot + touch targets) → THE SEAT (D8, seat
formula + occlusion + closed-form ink solve) → veil re-derive (D6/O-11) — each of which is,
independently, roughly the scope of ONE S.W4-class design wave (S.W4 itself ran **≤6 agents** for
comparable single-surface work: *"title+register / header / thumbs+rail / docs pipeline /
code-plate"*, `S.W4.md:7`). T.W4 compresses ~5-6 S.W4-scale efforts into ONE continuous serial
writer, justified by a real correctness constraint (C1: all 7 items contend for the same band
geometry, so parallel writers would re-litigate each other's reservations — `T.W4.md:16-18`,
sound reasoning). The wave DOES have named per-step commit checkpoints (`T.W4.md:171-176`: W4-1 /
W4-2 / W4-5 / W4-4+W4-3 / W4-7 / W4-6, six named commit points) — better resumption granularity
than W1 (F3 below) — but nowhere does the wave doc, or `T.md §3`, state that a forced-order chain
this long, run by one continuous agent thread, should be EXPECTED to need multiple session
recoveries; PP-14 is invoked only generically, tranche-wide.

**Where**: `T.W4.md:16-20` (Agents line); `:45-49` (the forced order); `:171-176` (commit plan,
the actual checkpoint granularity — good, but unadvertised as a *resumption* unit).

**Proposed amendment**: add one sentence to `T.W4.md`'s Agents/Dependencies section naming the
6 forced-order commit points as the FORMAL PP-14 resumption unit (not just a commit-hygiene
list), and flag the wave, alongside W1 and W8, as one where the dispatcher should expect ≥2-3
session-limit recoveries rather than treating "1 serial writer" as "1 session."

---

### F3 — SHOULDFIX — T.W3's stated "≤3 parallel" cap arithmetically undercounts its own named 4-lane structure (core + 3 consumers), a live tension with the E-6 rate-limit-wall rule the cap exists to enforce

**Evidence.** `T.W3.md:15-18`: *"**Agents**: ≤3 parallel (E-6 batch bound). The token/material
core (W3-1 + W3-4) is the **SINGLE WRITER** of the tier tokens + `PaneHeader.vue`; W3-2
(ShadowPalette), W3-3 (search seat), and W3-5 (ink contract) **run beside it**, CONSUMING —
never minting — rung tokens through the core writer's queue."* That names **4** distinct
concurrent writers (1 core + 3 consumers) run "beside" one another — not ≤3. E-6's "batches of
three" rule is stated as a hard constraint to avoid rate-limit walls (`T.md §8`: *"batches of
three agents in parallel (rate-limit walls)"*), i.e. it is an external ceiling, not a style
preference. Two readings reconcile the doc with its own cap: (a) the core lane runs to some
settled-token milestone FIRST, then the 3 consumers dispatch as the actual "≤3 parallel" batch
(sequential-then-parallel) — plausible but never stated; or (b) all 4 genuinely run concurrently
and the cap line under-counts by one. As written, a cold dispatcher cannot tell which is meant,
and a literal 4-way concurrent dispatch (the "beside it" reading) would breach the very rule the
line cites.

**Where**: `T.W3.md:15-18` (`**Agents**:` line vs its own lane enumeration).

**Proposed amendment**: either correct the cap to **≤4** (if genuine concurrency is intended,
since the core lane is a token-queue owner, not full parallel write contention on the SAME files
as the consumers — arguably a softer collision class than 4 independent writers) or add one
clause making the sequencing explicit: *"the core lane lands its token queue before the 3
consumer lanes dispatch"* (making it a true ≤3-at-a-time structure). Either fix is one sentence;
leaving the ambiguity is the actual risk, not either resolution.

---

### F4 — NOTE — T.W7's payload (if it fires) is ~2× S.W8's own scope under the same "1 serial" nominal Agents line — lower urgency only because the wave is trigger-gated and may not fire this tranche

**Evidence.** `T.W7.md:18`: *"**Agents**: 1 serial (a mechanical, verified walk…)"* — identical
framing to `S.W8.md:7` (also 1 serial). But T.W7's scope is **Segment 1** (S.W8's own 18-item
walk, run INTACT, `T.W7.md:52-58`) **+ Segment 2** (9 T-minted payload rows, `:60-73`) **+
Segment 3** (the verify-at-cut ledger, ~8 items, `:74-77`) ≈ **35 sequential items** for the same
nominal "1 serial" framing that covered 18 items in S. Mechanical/verification work is typically
cheaper per-item than design work (lower token depth per item), which is why this is a NOTE and
not a SHOULDFIX — but the doubling is real and, per `T.W7.md:184-188`, an unfired trigger at T
close simply hands the (now even larger) book to the successor tranche, so the actual execution-
budget exposure may never land inside T at all. Flagged for completeness per the brief's request
to size ALL waves, not because it currently threatens a wall inside this tranche.

**Where**: `T.W7.md:18` (Agents line); `:52-77` (the 3-segment scope, ~35 items total) vs
`S.W8.md:7` + its own 18-item scope.

---

## §3 — CLEAN (verified proportionate, no split/rebudget needed)

- **T.W0** — 1 serial, 6 items; S.W0's own precedent (1 serial, 9 items) is BIGGER, not smaller —
  T.W0 is if anything under-loaded relative to its analog.
- **T.W2** — 1 single-writer serial over a small, explicitly-bounded file set (`App.vue`,
  `index.html`, 3-4 boot composables); the T-26 calibration loop is bounded at 3 iterations by
  design (`T.W2.md:80`); comparable to S's lighter single-writer waves.
- **T.W5** — ≤3 (1 motion lane + 1 census agent), 11 mostly-small per-site retune rows; direct
  scale match to S.W3's ≤4-agent CSS-diet wave.
- **T.W6** — ≤6 across 4 named lanes (G/E/D/N) dispatched in batches of three; this is the
  correct structural precedent match to S.W4/S.W5 (both ≤6) — the one wave in the T DAG whose
  nominal cap and named-lane count actually agree with each other AND with an S analog of
  matching shape.
- **T.W9** — 1-2 serial, mildly scaled up from S.W9 (a larger finding-ledger + 3 full CLAUDE.md
  rewrites this time) but still a reconciliation-shaped task, not a design/build wave; no split
  indicated.

---

## §4 — Cross-cutting observations (context for the amend pass, not separately-numbered findings)

- **The batch-COUNT rule (E-6, "≤3 parallel") is satisfied at face value almost everywhere** —
  the corpus is disciplined about naming per-wave agent caps at all (every wave doc states one),
  which is itself better practice than leaving it implicit. The gap this lane found is
  consistently on the **depth** axis (files/items per single-writer lane), which the corpus has
  no naming convention for at all — no wave doc states an expected file count, item count, or
  token-order-of-magnitude per lane the way it states an agent-count cap. Recommend the amend
  pass add a `**Scale**:` line beside every `**Agents**:` line (file-count + item-count, both
  already computable from each wave's own §Scope table) so the depth axis is as visible as the
  count axis.
- **Checkpoint/resumption granularity is uneven across the three fat waves**: W8 (post the
  sibling lane's playbook fold) gets per-surface pass records + a booked-row ledger; W4 gets
  6 named forced-order commit points; **W1 gets the least** — its own commit plan says only
  "each batch names its MOVE-MAP rows" with no batch boundaries pre-named (contrast W4's 7 named
  steps or W8's 12 named surfaces). Given W1-demo alone spans ~199 files (§1 table), undefined
  batch granularity is the single most concrete, fixable gap this lane found — see F1's sibling
  concern in the §1 table row for T.W1 (folded into F1's framing rather than double-counted as
  its own numbered MUSTFIX, since the fix is the same one-line-per-wave `**Scale**:`
  recommendation above, applied to W1 specifically: name the churn-minimizing phases as an
  enumerated, checkpoint-bearing list the way W4 names its 7 forced-order items).
- **The S-actual/S-nominal ratio is itself informative**: S's wave docs state nominal caps of
  ≤4-≤6 per wave (`S.W1.md:7` through `S.W7.md:7`), yet the brief states S's actual execution ran
  **6-9 agents per wave** — roughly 1.5-2× the nominal cap, presumably absorbing triumvirate
  escalations, PP-14 recoveries, and non-authoring review agents beyond the base lane count. If
  the same multiplier applies to T, every number in §1's "nominal cap" column should be read as a
  FLOOR, not a ceiling — which sharpens F1 further (a ~50-slot W8 worst-case could easily become
  75-100 actual agent-dispatches) and makes F2/F3's asks (name checkpoints, fix the arithmetic)
  cheaper insurance than they might otherwise appear.

## VERDICT DISSENT (recorded at the amend pass — VERDICT §5-D1)

F3's option (a) — raising W3's cap to "≤4" — is **REJECTED**: E-6 ("batches of three") is
owner-verbatim law a hardening lane cannot re-cut. Option (b) is ADOPTED: the sequencing clause
("the core lane lands its token queue before the 3 consumer lanes dispatch") is folded into
`waves/T.W3.md`. F1/F2 folded as filed (M-32; W4 §Recovery delta).
