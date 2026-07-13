# V · pass-3 · AUDIT — THE FRESH FULL-THESIS ADVERSARY (the composed thesis A × B × C)

**Lane**: pass-3 fresh non-author FULL adversarial audit of the composed thesis. **Date**: 2026-07-13.
**Model**: opus (declared). **Non-author**: this lane authored NOTHING in the V campaign — not the portfolio,
not any spec/proto/critique/retro, not charters a/b/c or α/β/γ, not either agglomeration, not the
owner-verbatim audit. **Mode**: docs-read of the whole campaign + **first-hand on-disk RE-RUN** of the
thesis's load-bearing claims (every number below carries the command I ran at HEAD `2d7b299`). Nothing merged;
this doc is pathspec `docs/tranches/V/**`.

**This is the audit the pass-3 owner-verbatim lane explicitly deferred** ("*This is NOT the full-thesis
convergence auditor — that is the other pass-3 fresh audit*", `audit-owner-verbatim.md §Scope`) and that the
pass-3 AGGLOMERATION mis-filed as "a pass-4 obligation" (§3). It ran in pass-3, as the pass-2 convergence gate
required ("a fresh non-author full adversarial audit across the composed thesis", pass-2 AGGLOMERATION §3). It
therefore **completes pass-3's required adversary** — and confirms the fold's ruling (NOT clean; gaps survive)
while adding gaps the clause-carriage lens could not see.

---

## §0 Verdict up front

| axis | verdict |
|---|---|
| **CLEAN / NOT-CLEAN** | **NOT CLEAN.** Gaps survive — on TWO axes. (a) The four un-charted owner clauses the owner-verbatim lane already enumerated (12 / 4 / 3 / 11 + the deferred demo-wide manifest) are real and un-advanced — I re-verified each on disk. (b) This full-thesis pass adds gaps the clause lens did not reach: the manifest's *uniqueness* proof and most of β/γ's measured claims **are not reproducible from committed artifacts** (8 of 9 instruments were git-ignored and `git reset`-away; only `census-postmove.mjs` survives); the "unique zero-edge" framing rests on a **min-manufactured-edge objective the campaign chose as a proxy for the owner's stated "colocate recursively"**, presented as measurement; and the ADVANCED half still carries three live owner-forks + three booked-not-executed landing costs. Clean-break itself is CLEAN (I confirm the one disclosed owner-routed OF-3 residual). |
| **EARNED %** | **60%** (composed-thesis convergence, un-inflated). Confirms the fold's 62% *carriage* ceiling as roughly right, docked 2 points for the instrument-non-reproducibility and design-proxy overstatements the owner-verbatim clause-count could not see. The advanced legs are genuinely hardened and every *checkable* number reproduced — but convergence (a gap-free, surprise-free tranche plan the owner can execute) is dragged by the un-charted half having **zero prototype for the owner's own paragraph (clause 12)** and by the evidence base being mostly un-re-runnable. |
| **one-line finding** | The campaign did deep, honest, **reproducible-where-I-could-check** work on the sub-problem it chose (the `composables/color/` placement + the color merge + the diagnostics leg + backend ratify + clean-break), and the epistemic discipline is real (retractions earned by measurement, which I confirmed). But it is converging on **its** problem, not the owner's whole edict: the owner's most emphatic ask — *REDUCE library complexity* — has no charter, no prototype, and no named metric-that-goes-DOWN, while every RAN library move is behavior-preserving reshuffle. That is vacuous-convergence + deferred-hard-part at the EDICT level, and it is the gate on 100%. |

---

## §1 What I spot-RAN myself (the reproductions — most-load-bearing first)

The task's hard obligation: RUN at least 3 of the thesis's load-bearing claims first-hand. I ran **five**, plus
closed one open handoff. Ancestry first: `git merge-base --is-ancestor 07bf61d HEAD` ✓ and `329932b` (U-F29)
✓ — the lanes' base and the credited prior art are both in HEAD's history.

1. **CC-5 census harness — the LEAD leg's ground truth (Charter α).** Extracted the embedded instrument
   (`sed … charter-alpha-harness.md > census-postmove.mjs`; 301 lines) and ran it against the live tree:
   ```
   TALLY: KERNEL=6  APPCLUSTER=12  FEATURE=0  ORPHAN=0  (sum 18)  => 18 PROMOTE / 0 COLOCATE
   VALIDATION(A) runtime-manufactured edges: 0   (type-only: 1 — keys→useColorPipeline)
   VALIDATION(B) bucket→feature runtime coupling: 6  (OF-4 evidence)
   H1 PASS · H2 PASS · H3 PASS   HARNESS PASS (3/3)   EXIT=0
   ```
   **Reproduces the ratified 18/0 manifest EXACTLY**, including the 1 type-only `keys→useColorPipeline` edge
   and the 6 pre-existing OF-4 couplings. The load-bearing placement is real and re-runnable. *(Caveat: what
   the harness proves is examined in §3 NG-1/NG-2.)*
2. **The clause-12 gap (the sharpest, un-charted).** `find src -name '*.ts' | xargs wc -l | awk '$1>500'` →
   **14 files** > 500 LoC; `parsing/color/color.ts` = **754** (repo's largest); the full list matches the
   agglomeration's §0 table to the line. The owner's "grown in file size" is on disk and un-carved.
3. **The gate battery.** `test:dist` chains **10** proof gates on disk (dts-surface, css-parity,
   round-trip-idempotent, perf-target, serialize-fidelity, subpath-budget, lib-correctness, **barrel-parity**,
   pack-manifest, **close-ledger**) — the "10→7 cull" is a **proposal**, not landed (β/γ correctly frame it
   so). `grep barrel-cycle package.json` → **none**; only `proof:size-graph` (CI-only) — γ's re-frame of
   charter-c's "like the incumbent barrel-cycle" is correct. `units/index.ts` = **451** on disk (γ's
   451-not-452 correction confirmed; charter-b's "452" is wrong).
4. **Charter β's deterministic edge count.** Independently enumerated `parsing/color → units/color` distinct
   `(srcfile,dstfile)` file-edges: `color-unit.ts`{index,normalize}=2 + `relative-color.ts`{index,constants,
   dispatch,normalize}=4 + `color.ts`{index,color-names,constants,dispatch,normalize,mix,conversions/kelvin}=7
   → **13 file-edges** (and 15 statement-edges: color.ts double-imports color-names + mix). **Reproduces β's
   "13 @ HEAD" file-level and "15" statement-level exactly** — the 15-vs-11 reconciliation is sound.
5. **The kf-bug + drop-site facts.** `PropertyDescriptor` still exported at `stylesheet-types.ts:33` — bug #11
   **OPEN** ✓. Both keyframe silent drops present: `stylesheet.ts:229` (`if (d.important) … continue`, D1) and
   the `KEYFRAME_COMPOSITION_PROPERTY` guard (invalid keyword → neither pushed nor lifted → vanishes, D2) ✓.
   Both `.eof()` idiom sites present: `parsing/index.ts:528` (U-F29) + `stylesheet.ts:633` (S.W1 F-9) ✓.
   Hygiene: **39** root PNGs · **14** worktrees · **2** plugins both wired in `vite.config.ts` (`:178`,
   `:302/:314`) · **11** benches ✓. `aurora-atoms` = **2** real import edges ✓ (α's retraction of G6's "3"
   holds).

**The handoff I CLOSED (charter-γ §7 → "the fresh full adversarial audit").** γ swept only
`src/parsing` declaration/rule/keyframe parsers and asked whether a THIRD silent drop hides in the un-swept
color/units/math parsers. I swept them (`grep -rnE 'continue|filter|catch|\?\? …|return null'
src/parsing/color/ src/parsing/units.ts src/parsing/math.ts`): **no third silent-drop site.** The `math.ts`
`return null` cluster is symbolic-calc deferral ("can't resolve at parse time" — keeps the node symbolic, not
a drop); every `tryParse` fails **LOUD** (`units.ts:125` comment: it "*raises*" an untyped Parse error).
**The silent-drop set stands at exactly γ's `{D1 !important, D2 invalid animation-composition}`** — a genuine
close of a hanging thread, and a credit to γ's inventory.

**Reading:** every number in the composed thesis I could check first-hand REPRODUCED. The campaign's
"every number with its command" discipline is genuine where the command survives. The gaps below are not
"the numbers are wrong" — they are "the owner's edict is half-addressed" and "most of the commands are gone."

---

## §2 The failure-mode checklist — applied to the COMPOSED THESIS

| # | hook | verdict on A × B × C |
|---|---|---|
| 1 | **vacuous convergence** (gates pass, owner edict unmet) | **PRESENT — the headline.** The green gates (typecheck/build/smoke/`subpath-budget` 11/11) pass, but the owner's whole edict is ~half-met: D1 placement method is proven on **1 of 6** demo buckets; D3 delivers a merge + diagnostics + battery but **not the complexity REDUCTION the owner gave its own paragraph**; D4 delivers only the gate-cull (1 of 7 hygiene items). The thesis converges on a chosen sub-problem, not the owner's problem. Already conceded by the fold (62% carriage) — I confirm it on disk. |
| 2 | **gates that cannot fail** | **PRESENT (disclosed) + one UN-disclosed instance.** Disclosed: green gates prove RESOLUTION, blind to DESIGN (charter-a G5, OF-4). Un-named by the pass-3 audits: **`census-postmove.mjs`'s H3 ("0 manufactured edges") is near-tautological** — the fixpoint classifier is *built* to emit 0 (line 178 keeps pipeline-dep files in APP-CLUSTER precisely to avoid splitting), then H3 checks it emitted 0. H3's discriminating power lives entirely in `counterfactual.mjs` (scoring a=1, b=7) — **which is not committed** (§3 NG-1). And β's `subpath-budget` C1 "moves out from under itself" post-merge (regex `/src/parsing/` stops matching `units/color/parse/`) — disclosed + booked, but it means the 11/11 GREEN is *vacuous on the very seam the merge creates* until C1 widens. |
| 3 | **elegant-reduction / "and then the hard part"** | **PRESENT.** (a) β's "acyclicity" leaves a 5-file leaf-SCC (`dispatch↔conversions`) — honestly disclosed as out-of-scope F2 work; the merge is *cycle-neutral* and only the registry+carve severs the BARREL cycle. (b) The whole of **clause-12 complexity REDUCTION is the deferred hard part** — named as pass-4 δ with the *requirement to invent a metric that goes down*, i.e. the design does not yet exist. The thesis did the tractable reshuffles and deferred the owner's central ask. |
| 4 | **dual paths / masked fallbacks / aliases** | **CLEAN (one disclosed owner-routed residual).** I re-swept: the atomic `git mv` cut has no transitional-`@` window; the strangler dual-path pole was KILLED for being a dual path; the ONE masking residual is OF-3 embed-warn at the spec-forced `@keyframes` class (I confirmed D1+D2 exist on disk) — disclosed, scoped to 1 class / 2 sites, owner-routed. `@src`/`@assets` survive un-ruled (minor, disclosed). No hidden violation. |
| 5 | **unverified gestalt** | **PARTIAL.** The BIG gestalt claims that ARE checkable reproduced (18/0, 13-edge, drop-sites, hygiene — §1). But three load-bearing claims rest on **un-committed instruments + the lane's word**: the manifest's "**unique** by counterfactual" (counterfactual.mjs gone), β's "**2 FAIL→0** registry demonstration" (carve-scc/capsule-scc gone), β's "34/0/0 grammar-free at both homes" (trace-color gone). Plausible, partially corroborated by the numbers that DID reproduce — but not independently re-derivable (§3 NG-2). |
| 6 | **consumer-less substrate** | **NOT PRESENT** (inverted, as pass-2 noted): CC-5 has a consumer (the landing wave / F6 unblock). But the substrate's *durability* is thin — see NG-2. |
| 7 | **circularity** | **PRESENT (mild).** The "ground-truth" census encodes the design it validates: its app-cluster tie-break (min-manufactured-edge) is a **chosen objective**, and the counterfactual then "proves" the table this objective produces is the min-edge table. That is optimization-restated-as-measurement, not owner-neutral ground truth (§3 NG-3). |

---

## §3 Surviving-gap enumeration (EVERY gap — the protocol bar)

A gap = anything that would surprise the owner mid-execution, or needs a decision not in the owner-fork
register (OF-1..OF-6 + booked #11 / C1-widen / test-repoint / canon-sweep). **Group A** = the owner-clause
gaps the pass-3 owner-verbatim lane already enumerated — I re-verified each on disk (they are real, and they
alone make the pass NOT clean). **Group B** = gaps THIS full-thesis pass adds.

### Group A — the un-charted owner half (confirmed on disk; owned by pass-4 δ/ε/ζ)

- **GA-1 · clause 12 — library complexity REDUCTION (the sharpest).** 14 src files > 500 LoC un-carved
  (`color.ts` 754 verified). Every RAN library move is behavior-preserving. **No charter, no prototype, no
  metric-that-goes-down.** The owner's own paragraph is the least-carried clause. → pass-4 δ.
- **GA-2 · clause 4 — long-running dirs.** `panes/` (2009 LoC), `style.css` (55 KB), the 14 god-modules.
  Only `units/index.ts` (451, *below* the ceiling) was carved. → pass-4 ε.
- **GA-3 · clause 3 — "same for styles".** `style.css` cohesion-carve — 0 charters. → pass-4 ε.
- **GA-4 · clause 11 — D4 hygiene minus the gate-cull.** 39 PNGs · 14 worktrees · 11 benches · scripts-prune
  · stale docs · the **plugins** contradiction (both wired — I confirmed; owner said "delete entirely" → OF-6).
  → pass-4 ζ.
- **GA-5 · clause 1 — demo-wide flatten manifest.** Method ratified on **1 of 6** `demo/@/` buckets; the
  ~321-site @-abrogation + the per-dir tables + `@src`/`@assets` scoping deferred to the landing wave. → ε.

### Group B — gaps the full-thesis pass adds (NOT in the pass-3 enumeration)

- **NG-1 · the uniqueness proof is NOT reproducible.** The manifest's central justification — "18/0 is the
  **unique** zero-runtime-manufactured-edge assignment (ratified 0 / charter-a 1 / charter-b 7)" — depends on
  `counterfactual.mjs`, which lived in the git-ignored `_proto/` and was `git reset`-away. Only
  `census-postmove.mjs` is embedded/committed, and it only ever runs the fixpoint classifier (which yields 0
  by construction — §2 hook 2). **A landing-wave owner can re-derive the ratified table's 0-edge property but
  NOT that it is uniquely 0.** The "UNIQUE" in the LEAD leg's headline is, on the committed record, the lane's
  word. *Closer: embed `counterfactual.mjs` alongside the harness, or the manifest downgrades "unique" to
  "zero-edge under the stated objective."*
- **NG-2 · systematic non-reproducibility of the pass-3 evidence base.** Eight of the nine load-bearing
  instruments are un-committed and gone: `counterfactual`, `codemod-ratified`, `census` (β's), `trace-color`,
  `carve-scc`, `capsule-scc`, `merge-codemod`, `measure`. The reproducible claims (I re-derived the 13-edge
  count and the CC-5 harness — both matched) raise confidence in the rest, but β's "2 FAIL→0 registry
  demonstration", β's "34/0/0 both-homes trace", α's "typecheck Δ0 / smoke 182/1 scatter", and γ's round-trip
  table cannot be re-run from the repo. The campaign's "every number with a command" discipline is real; the
  **commands are mostly deleted.** For an audit whose evidentiary standard is reproducibility, pass-4 / the
  landing wave inherits **1 re-runnable instrument out of 9.** *Closer: the durable-harness discipline
  `charter-alpha-harness.md` applied ONCE must be applied to the β/γ instruments too.*
- **NG-3 · min-edge is a chosen PROXY presented as measurement.** The census's tie-break (keep a
  pipeline-dep file with its stages = APP-CLUSTER, else KERNEL) minimizes *manufactured runtime edges*. That
  is a defensible objective — but it is **not the owner's stated objective** ("components should be COLOCATED
  … recursively"), which arguably favors pushing files toward their consuming feature/app-root even at the
  cost of an UP edge. The reversal between charter-a and charter-b on `useColorPipeline` (app-cluster vs
  kernel) is *decided by this tie-break*, and the manifest calls the result "RATIFIED." The tier assignment
  for the three tie-broken files (`useColorPipeline`/`useCustomColorNames`/`view-accent`) is therefore a
  **design choice dressed as ground truth**; only OF-4 (the *directory*, not the tier) is surfaced to the
  owner. *Closer: state the objective explicitly and route "min-edge vs literal-colocation" as the real fork
  under OF-4, not just the directory.*
- **NG-4 · β does not serve clause 12 — and adds coupling.** β's signature move (the color merge) turns 13
  cross-directory edges intramural **but gains 5 NEW `units/color → parsing` edges** (a capsule→kernel
  dependency that did not exist) and does **not** reduce the god-module count (`color.ts` stays 754). So the
  D3 *execution* leg is a lateral re-coupling, not a complexity reduction — reinforcing GA-1 from *inside* the
  advanced half. Whether "grammar-utils belong under parsing" is "better structure" is asserted, never
  ratified against "reduce complexity." *Not refuting β (it is behavior-preserving and cycle-honest) — but
  its benefit is a coupling re-shape, and the thesis lets it read as progress on the owner's reduce-complexity
  ask, which it is not.*
- **NG-5 · the ADVANCED half is not itself a closed plan.** Even the 68/62/68 legs carry unresolved owner
  decisions the owner WILL hit mid-execution: OF-4 (app-cluster directory — and even Pole B is "internally
  contested", the `useColorPipeline` head injected app-wide via `keys`); OF-3 (1 class / 2 sites); OF-6
  (plugins); plus three **booked-not-executed** landing costs (15 test-repoints + the `canon-sync` CLAUDE.md
  sweep + the C1-regex widen) that the merge cannot land without. The 62% reads as "62% of the way to a
  landable plan" but the advanced legs are *advanced-with-open-forks*, not ratified-and-executable.
- **NG-6 · the kernel→app-root inversion the move INTRODUCES.** The ratified scatter leaves a KERNEL file
  (`keys.ts`) importing a type FROM an app-cluster file (`useColorPipeline`) — a kernel depending *upward* on
  app-root. Runtime-erased (type-only, validated), disclosed as friction #1/#4, deferred as "follow-refactor
  out of scope." But a "ratified" kernel that imports upward from the tier below it is a structural smell the
  move *creates*, and the owner should not be surprised to find it post-scatter. *Minor; disclosed, not
  resolved.*
- **NG-7 · process: the fold was ruled WITHOUT this adversary.** The pass-3 AGGLOMERATION set 62% and named
  pass-4 δ/ε/ζ using the owner-verbatim lane alone, and mis-filed the full-thesis audit (this doc — the
  pass-2 convergence gate's explicit requirement) as "a pass-4 obligation." Running it now confirms the ruling
  (gaps survive; 0 of 2 clean) but the fold should record that its required adversary landed in pass-3 and
  added Group-B gaps. *The pass ruling is unchanged; the AGGLOMERATION's "pass-4 obligation" framing for the
  full-thesis audit is superseded — it ran here.*

**Nothing in Group B refutes an advanced leg** — every checkable number held. Group B is about *reproducibility,
objective-honesty, and the advanced half not being a closed plan*. Combined with Group A (half the edict
un-charted), the pass is decisively NOT clean.

---

## §4 Credits (what HELD under a fresh full adversary — earned)

- **The reproductions all matched.** CC-5 18/0 + H1/H2/H3, the 13/15 edge counts, the 10-gate battery,
  no-barrel-cycle, PropertyDescriptor-open, both drop-sites, both `.eof()` sites, 39/14/2/11 hygiene,
  aurora-atoms=2 — I re-ran or re-counted every one; none was wrong. The discipline is genuine.
- **The retractions are real and correct on disk.** γ's friction-#1 retraction (permissive-string non-lossy),
  α's aurora-atoms "3→2" self-refutation, β's "small blast → 15-test + canon-doc", α's "17/1 → 18/0", the
  "451-not-452" — I verified aurora=2, units/index=451, and the drop-site classes. Retractions-earned-by-
  measurement, honored.
- **Clean-break is genuinely clean.** One disclosed, owner-routed masking residual; no hidden alias/shim/dual
  path anywhere in the specs.
- **γ's §7 handoff is CLOSED by my sweep** — no third silent-drop site; the color/units/math parsers fail
  loud (`tryParse`) or defer symbolically (`math.ts` null), not silently. The `{D1, D2}` set is complete.
- **NG-3's asymmetry test PASSED for the campaign.** I probed whether `generate-color`→KERNEL vs
  `useCustomColorNames`→APP-CLUSTER is an inconsistent kernel definition; it is not — the manifest's 3-clause
  KERNEL ("… OR shared feature+app-root, edge-free home") captures it, and min-edge distinguishes them
  correctly. An adversarial hypothesis I retract on the evidence.

---

## §5 The earned number + what a clean pass requires

**60% — composed-thesis convergence, un-inflated.** The fold's **62% carriage** is roughly the right ceiling
for *how much of the owner's edict is touched*; convergence (a gap-free, surprise-free, re-runnable tranche
plan) sits **2 points below** it because the full-thesis lens sees what the clause-count could not: the
uniqueness proof and most of β/γ's evidence are not reproducible (NG-1/NG-2), the "ratified/unique" framing
encodes a chosen objective as measurement (NG-3), and the advanced legs are advanced-with-open-forks, not a
closed plan (NG-5). None of that drops far, because every *checkable* number reproduced — the work is honest
and deep on the half it chose.

**cleanPass = false.** The two-consecutive-clean-passes clock stays at **0 of 2**.

**A clean pass-4 requires** (beyond δ/ε/ζ closing Group A): (i) embed the β/γ instruments the way α embedded
its harness, so the uniqueness, the "2 FAIL→0", and the both-homes trace are re-runnable (NG-1/NG-2); (ii)
state the census's min-edge objective explicitly and route min-edge-vs-literal-colocation under OF-4 (NG-3);
(iii) a δ charter that names the complexity metric that goes DOWN and enumerates the god-module carve set
(GA-1) — and reconciles that β's merge does not serve it (NG-4); (iv) then a fresh full-thesis adversary
enumerating **zero** surviving gaps → the FIRST clean pass; a pass-5 confirmation earns the second.

---

## §6 Owner-reserved forks (this lane decides NONE)

OF-1 (@-ban idiom) · OF-2 (api vocabulary) · OF-3 (the `{value,diagnostics}` boundary, 1 class / 2 sites — I
confirmed both drop-sites on disk) · OF-4 (app-cluster directory — and I raise that its **objective**, not
just its directory, is the real fork, NG-3) · OF-5 (the coupled owner event) · OF-6 (plugins delete-vs-keep —
I confirmed both are wired). Presented, not decided. **Nothing merged; this lane authored only this audit,
pathspec `docs/tranches/V/**`.**
