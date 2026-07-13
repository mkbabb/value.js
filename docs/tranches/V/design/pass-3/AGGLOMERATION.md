# V · PASS-3 AGGLOMERATION — the fold verdict + the pass-4 gap-closers

**Pass 3 · AGGLOMERATE · 2026-07-13 · author: pass-3 agglomerator (design authority — owns the registry
verdicts).** Inputs folded: **3 charter lanes** (α/β/γ, all RAN + committed) + **BOTH pass-3 fresh non-author
adversarial audits** — the owner-verbatim / clean-break lens (`audit-owner-verbatim.md`, **CLEAN on
clean-break, 62% carriage**) AND the FULL-THESIS convergence adversary (`audit-full.md`, **NOT CLEAN, 60%
convergence**, Group-B gaps NG-1..NG-7). Every number below is a lane's measured number or an agglomerator
spot-check at HEAD (`d2bf5e1`; the charter lanes RAN in isolated worktrees fast-forwarded to `07bf61d`,
nothing merged).

**This fold SUPERSEDES the prior single-audit ruling** (`2d7b299`, which had only the owner-verbatim lane and
mis-filed the full-thesis adversary as "a pass-4 obligation"). The full-thesis adversary — the pass-2
convergence gate's *explicit* requirement ("a fresh non-author full adversarial audit across the composed
thesis") — **RAN here in pass-3** (`d2bf5e1`), as NG-7 of that audit records. The pass ruling is **unchanged**
(NOT clean; gaps survive; clock 0 of 2) but the composed-thesis convergence number is re-set to the
full-thesis adversary's un-inflated **60%**, and the Group-B gaps are folded below.

---

## §0 The ruling up front — **pass-3 is NOT the clean pass (gaps survive, on TWO axes)**

The protocol's clean bar (§0): *"100% = zero enumerated gaps + a fresh non-author adversarial audit + two
consecutive clean passes."* The task's ruling rule: **BOTH audits clean AND α/β/γ closed with zero surviving
gaps → CLEAN.** Neither condition holds:

- **The full-thesis audit is NOT clean** (`clean:false`, 60%) — it enumerates surviving gaps on two axes.
- **The owner-verbatim audit is clean on clean-break** (`clean:true`, 62%) **but carries four survey-only
  owner clauses** it scores at ~30–35%; "clean on the clean-break sweep" ≠ "zero surviving gaps."
- **α/β/γ closed their OWN pass-2 caps** with zero surviving *in-charter* gaps — but the surviving gaps are
  cross-charter (the un-charted owner half) and cross-cutting (Group B).

Therefore `cleanPass = false`. **The two-consecutive-clean-passes clock stays at 0 of 2.** The pass-4 charters
(§3) close the surviving gaps.

### The surviving gaps — Group A (owner-clause, both audits) + Group B (full-thesis adds)

**Group A — the un-charted owner HALF** (owner-verbatim §1/§3; full-thesis §3 re-verified each on disk):

| the surviving gap (owner clause) | on-disk fact (agglomerator-verified, this pass, at `d2bf5e1`) | carried by any charter? |
|---|---|---|
| **clause 12 — library complexity REDUCTION** (the sharpest; the owner's own paragraph) | **14 src files > 500 LoC** un-carved: `parsing/color/color.ts` **754**, `scroll-timeline.ts` **658**, `parsing/index.ts` **644**, `stylesheet.ts` **643**, `easing.ts` **643**, `style-names.ts` **641**, `boundary.ts` 604, `decompose.ts` 603, `parsing/utils.ts` 603, `units/utils.ts` 601, `path.ts` 562, `dispatch.ts` 558, `parsing/math.ts` 536, `gamut.ts` 526 (`find src -name '*.ts' \| xargs wc -l \| awk '$1>500'`) | **NO** — every RAN library move is behavior-PRESERVING re-structure |
| **clause 4 — long-running dirs broken + encapsulated** | `panes/` 16–17 flat files / ~2009 LoC · `style.css` 55 KB · the 14 god-modules. Only `units/index.ts` (**451**, below the 500 ceiling) was carved | **NO** |
| **clause 3 — "same for styles"** | `style.css` cohesion-carve + single-owner colocation (`grep style.css` across pass-2/3 charters = **0 hits**) | **NO** |
| **clause 11 — D4 hygiene minus the gate-cull** | **39** root PNGs · **14** worktrees · **11** benches · scripts-prune · stale docs · **2 live plugins** (`sourceExportPlugin` @ `vite.config.ts:178`, `deferGlassFonts` @ `:302/:314` — the survey HONESTLY CONTRADICTS the owner's "worthless → delete") | **NO** (only the gate-cull carried) |
| **clause 1 — demo-wide flatten / full @-abrogation** | method validated on **ONE** bucket (`composables/color/`, 18 files); the per-dir manifest across all 6 `demo/@/` sub-dirs + the ~351-site abrogation deferred; `@src` (212 sites) / `@assets` (11) un-ruled | **PARTIAL** — method carried, full manifest deferred |

**Group B — what the FULL-THESIS pass adds** (not visible to the clause-carriage lens; full-thesis §3):

| # | Group-B gap | on-disk / evidentiary fact | closer |
|---|---|---|---|
| **NG-1** | The manifest's central **"UNIQUE by counterfactual"** claim is NOT reproducible | `counterfactual.mjs` (scoring ratified 0 / a 1 / b 7) lived in git-ignored `_proto/` and was reset-away; only `census-postmove.mjs` is embedded, and its H3 (0 edges) is **near-tautological** (the fixpoint classifier is built to emit 0). Owner can re-derive the 0-edge *property* but NOT that it is *uniquely* 0 | reproducibility back-fill (embed `counterfactual.mjs`) OR downgrade "unique" → "zero-edge under the stated objective" — **caps α's headline** |
| **NG-2** | **Systematic non-reproducibility** of the pass-3 evidence base | **8 of 9** load-bearing instruments un-committed + gone (counterfactual, codemod-ratified, census(β), trace-color, carve-scc, capsule-scc, merge-codemod, measure); only `census-postmove.mjs` survives. β's "2 FAIL→0 registry", β's "34/0/0 both-homes trace", α's "Δ0 / smoke 182/1 scatter", γ's round-trip table cannot be re-run. **1 re-runnable instrument of 9** | the durable-harness discipline (`charter-alpha-harness.md`) applied ONCE must be applied to the β/γ instruments — pass-4 obligation |
| **NG-3** | **min-edge is a chosen PROXY presented as measurement** | the census tie-break (keep a pipeline-dep file with its stages = APP-CLUSTER) minimizes *manufactured runtime edges* — a defensible objective, but NOT the owner's stated "colocate recursively." The `useColorPipeline` reversal (a/b) is *decided by this tie-break*, and the manifest calls it "RATIFIED" | **WIDENS OF-4**: the real fork is *min-edge-vs-literal-colocation objective*, not just the directory — state the objective, route it under OF-4 |
| **NG-4** | **β does not serve clause 12 — and adds coupling** | the color merge turns 13 cross-dir edges intramural **but gains 5 NEW `units/color → parsing` edges** (a capsule→kernel dependency) and does NOT reduce the god-module count (`color.ts` stays 754). The D3 execution leg is a lateral re-coupling that reads as complexity progress but is not | **δ must reconcile** β's re-coupling against "reduce complexity" |
| **NG-5** | the **ADVANCED half is not itself a closed plan** | even the 68/62/68 legs carry OF-4 (directory — Pole B "internally contested") + OF-3 (1 class / 2 sites) + OF-6 (plugins) + **3 booked-not-executed landing costs** (15 test-repoints + `canon-sync` CLAUDE.md sweep + C1-regex widen) the merge cannot land without | reflected in the 60% cap; the landing costs ride OF-5 |
| **NG-6** | the **kernel→app-root INVERSION the move introduces** | the ratified scatter leaves KERNEL `keys.ts` importing a type FROM app-cluster `useColorPipeline` (a kernel depending *upward*). Runtime-erased (type-only), disclosed as friction, but a structural smell the move *creates* | **ε** (demo-flatten) must resolve or the owner ratifies the inversion |
| **NG-7** | process: the fold was ruled WITHOUT this adversary | the prior AGGLOMERATION (`2d7b299`) set 62% + named δ/ε/ζ on the owner-verbatim lane alone, mis-filing the full-thesis audit as "a pass-4 obligation" | **THIS fold folds it** — the adversary ran in pass-3; ruling unchanged; framing superseded |

**Nothing in Group B refutes an advanced leg** — the full-thesis auditor re-ran every *checkable* number
(18/0 + H1/H2/H3, the 13/15 edge count, the 10-gate battery, no-barrel-cycle, both drop-sites, both `.eof()`
sites, 39/14/2/11 hygiene, aurora-atoms=2) and **none was wrong**. Group B is about *reproducibility,
objective-honesty, and the advanced half not being a closed plan* — combined with Group A (half the edict
un-charted), the pass is decisively NOT clean.

> **What the pass DID earn** (and it is real): the composed thesis's three pass-2 caps — the un-ratified
> placement table, the un-re-run merge, the soft lossy leg — are CLOSED with first-hand HEAD measurement.
> The cross-lane 28%-destination-divergence TAX that pass-2 subtracted is DISCHARGED (α proved the ratified
> table the zero-manufactured-edge assignment by running counterfactual — *though not committed, NG-1*). The
> composed thesis rises **50% → 60%** — the full-thesis adversary's un-inflated convergence number (docked 2
> from the owner-verbatim 62% carriage ceiling for the reproducibility + design-proxy overstatements the
> clause-count lens could not see), and now the ceiling the un-charted half sets.

---

## §1 The pass-3 convergence spine (cross-lane FACTS — reported as facts, not verdicts)

Each carries the lane that measured it, the agglomerator spot-check, and the full-thesis auditor's independent
re-run where one exists.

1. **The placement table is RATIFIED, and RUN green on the scattered tree (α) — 0-edge property reproduced,
   uniqueness not (NG-1).** The 5-of-18 cross-lane destination divergence (pass-2 spine fact 6, the central
   pass-3 obligation) is reconciled into ONE 18-row table (`charter-alpha-manifest.md`): **6 KERNEL / 12
   APP-CLUSTER / 0 FEATURE = 18/0 PROMOTE**. The full-thesis auditor extracted + re-ran the embedded harness:
   `KERNEL=6 APPCLUSTER=12 FEATURE=0 ORPHAN=0 · VALIDATION(A) manufactured=0 (type-only=1) · VALIDATION(B)
   coupling=6 · H1/H2/H3 PASS · EXIT=0` — **reproduces the 18/0 manifest EXACTLY**, including the 1 type-only
   `keys→useColorPipeline` edge (NG-6) and the 6 OF-4 couplings. The two reversals decided ON the table:
   `generate-color` feature→KERNEL (charter-a's "17/1" flagship manufactured the exact CC-5 edge it forbids →
   RETIRED for the honest **18/0**); `ink-walk` app-cluster→KERNEL. **CAP (NG-1/NG-3):** the "UNIQUE" is the
   lane's word on the committed record (the counterfactual is gone), and the tier of the tie-broken files is a
   *min-edge choice presented as ground truth*. Agglomerator spot-check: `composables/color/` = **18** `.ts`
   files ✓.

2. **The src color merge is re-run on HEAD (β) — reproduced, but it re-couples (NG-4).** `git mv parsing/color
   → units/color/parse` lands: typecheck 0 · `subpath-budget` **11/11** · `/color` esbuild trace **34 mod / 0
   parsing / 0 parse-home**. The **15-vs-11 edge instability is DISSOLVED**: file-level = **13 @ HEAD**; the
   full-thesis auditor independently enumerated `parsing/color → units/color` file-edges and got **13
   file-edges (15 statement-edges)** — reproduces β exactly. Honest correction: true blast = **4 renames + 6
   src + 15 test files + `canon-sync` doc gate**. **CAP (NG-4):** the merge gains **5 NEW `units/color →
   parsing` edges** (a capsule→kernel dependency) and leaves `color.ts` at 754 — a coupling re-shape, NOT the
   complexity reduction the owner asked; it must not read as progress on clause 12.

3. **Acyclicity RIDES the registry — demonstrated on HEAD, not inferred (β).** The merge is **cycle-neutral**
   (the 14-file barrel SCC + 25-file megacycle persist identically pre/post). The registry is the LOAD-BEARING
   severance: eager+carve → **2 FAIL** (the `xyz2rgb` TDZ hazard) → lazy memo+carve → **0 FAIL** (2326 PASS),
   barrel SCC **14→5**. RESIDUAL (honest): a 5-file leaf SCC (`dispatch ↔ conversions/{cylindrical,direct,
   kelvin,xyz-extended}`) = genuine conversion-leaf interdependence — "acyclic capsule" is NOT globally
   delivered; leaf-decoupling is a separate (F2) primitive. **CAP (NG-2):** the 2-FAIL→0 demonstration is not
   re-runnable from the repo (carve-scc/capsule-scc gone).

4. **The D3 lossy leg is closed — one friction RETRACTED by measurement (γ); the sweep CLOSED by the
   adversary.** All three critique-charter-c gaps closed: (G1) the `.eof()`+`CSSParseError` idiom is
   **twice-ratified in-tree** (U-F29 `329932b` `parsing/index.ts:518/528/542` + S.W1 F-9 `stylesheet.ts:633`)
   — charter-c re-scoped from "introduce" to "**extend** the ratified idiom"; agglomerator spot-check:
   `329932b` IS an ancestor of HEAD ✓. (G2) **friction #1 RETRACTED** — the permissive-string class is
   **NON-lossy** by measurement; the genuine lossy class is the **partial-recovery tail** (`)(`→`""`,
   `rgb(`→`rgb`), which item-1's `.eof()` extension closes. (G3) the "single spec-mandated site" is FALSIFIED
   — the keyframe parser silently drops at **2** sites (`stylesheet.ts:233` `!important` D1 + `:239-244`
   invalid `animation-composition` D2). **The full-thesis auditor CLOSED γ's §7 handoff**: it swept the
   color/units/math parsers and found **no third silent-drop site** (`math.ts` `return null` is symbolic-calc
   deferral; every `tryParse` fails LOUD) — the `{D1, D2}` set is complete. **OF-3 widens "1 site" → "1 class /
   2 sites"; its CHARACTER is unchanged.**

5. **Clean-break is genuinely CLEAN — one disclosed, owner-routed masking residual (both audits concur).** The
   atomic `git mv` cut has **no** transitional-`@` window; the strangler dual-path pole was KILLED for being a
   dual path; the ONE residual is OF-3's embed-warn at the spec-forced `@keyframes` ignored-declaration class,
   which charter-γ ITSELF labels "a masking fallback by §0's own definition" — disclosed, scoped to 2 sites,
   owner-routed. **No undisclosed violation in any spec** (both auditors swept independently). Two un-ruled
   scoping residuals: `@src`/`@assets` survival, and a possible new `@app-composables` alias for the
   app-cluster tier — flagged, not taken.

6. **THE LOAD-BEARING FINDING (both audits): the campaign advanced ~half the owner's surface and left the
   other half un-charted.** The convergent loop narrowed onto `composables/color/` + the color-merge /
   diagnostics / battery and did NOT fan back out to: **library complexity REDUCTION (clause 12), long-dir
   breaking (clause 4), styles (clause 3), the bulk of D4 hygiene (clause 11), the demo-wide manifest (clause
   1).** These are pass-4 δ/ε/ζ. The full-thesis auditor names it *vacuous-convergence + deferred-hard-part at
   the EDICT level*: the owner's most emphatic ask — REDUCE library complexity — has no charter, no prototype,
   no metric-that-goes-DOWN. This is the gating truth for convergence.

---

## §2 The registry fold (per-charter + composed-thesis verdict)

**States**: ADVANCED (a live candidate) · BANKED (substrate/support) · MERGED (subsumed) · OPEN (enumerated,
un-charted — the new pass-4 surface) · RETIRED (dead). The composed-thesis % is the **full-thesis adversary's
earned convergence carriage (60%)**, never inflated — below the owner-verbatim 62% carriage ceiling by design
(the 2-point dock for reproducibility + design-proxy the clause-lens could not see).

| Row | State | pass-2 → pass-3 | One-line disposition (with the Group-B cap) |
|---|---|---|---|
| **Charter A · the WHAT-tree (F1 ∘ F3)** | **ADVANCED — LEAD** | 58 → **68** | α closed the dominant cap: the placement is a RATIFIED 18/0 manifest, CC-5 ground-truth-validated (3/3, reproduced by the adversary), RUN green. **Capped by SCOPE (one bucket → ε) AND by NG-1** (the "unique" is not reproducible from committed artifacts — the counterfactual is gone) AND **NG-3** (min-edge is a chosen objective, not ground truth) |
| **Charter B · execution vehicle (F6 + F2 substrate)** | **ADVANCED** | 45 → **62** | β re-ran the merge on HEAD, dissolved 15-vs-11 to a deterministic **13** (adversary reproduced), demonstrated acyclicity-rides-registry (2 FAIL→0). **Capped by the honest correction** (15 test + canon doc; 5-file leaf-SCC residual) **AND by NG-4** (5 NEW capsule→kernel edges; serves "better structure" not "reduce complexity") **AND NG-2** (the 2-FAIL→0 demo is not re-runnable) |
| **Charter C · D3 dimension + battery (F4 + F5)** | **ADVANCED** | 54 → **68** | γ closed all three soft-leg gaps: U-F29 credited, friction #1 RETRACTED, sweep found the 2nd spec-forced site — and the adversary CLOSED γ's §7 handoff (no 3rd drop-site). The D3 leg is load-bearing. **Cap: NG-2** (γ's round-trip table not re-runnable) |
| **⇒ THE COMPOSED THESIS (A × B × C)** | **ADVANCED — THE CANDIDATE** | 50 → **60** | three legs hardened + the cross-lane TAX discharged; RE-CAPPED at the full-thesis adversary's **60%** convergence (un-inflated) by Group A (four un-charted clauses) + Group B (NG-1/2 reproducibility, NG-3 objective-as-measurement, NG-5 advanced-half-not-a-closed-plan). The remaining 40% is ENUMERATED with named closers |
| **⊕ clause 12 — library complexity REDUCTION** | **OPEN → pass-4 δ** | — | the sharpest un-charted clause: 14 god-modules > 500 LoC, un-carved; the owner's own paragraph has no charter. δ must also reconcile NG-4 |
| **⊕ clause 4/3/1 — long-dirs + styles + demo-wide manifest** | **OPEN → pass-4 ε** | — | `panes/` (2009 LoC), `style.css` (55 KB), the demo-wide per-dir flatten across all 6 `demo/@/`; ε also resolves NG-6 (the kernel→app-root inversion) + states NG-3's objective |
| **⊕ clause 11 — D4 hygiene (minus the gate-cull)** | **OPEN → pass-4 ζ** | — | 39 PNGs · 14 worktrees · 11 benches · scripts-prune · stale docs · the plugins disposition (OF-6) |
| **⊕ Group-B: reproducibility + objective-honesty (NG-1/2/3)** | **OPEN → pass-4 convergence-gate obligation** | — | the durable-harness discipline (α's `charter-alpha-harness.md`) applied to the β/γ instruments; embed `counterfactual.mjs` (or downgrade "unique"); state the census objective + route min-edge-vs-literal-colocation under OF-4 |

### Why the composed thesis is 60% (and why that is still an ADVANCE, not a demotion)
Pass-2 scored it 50% = "leg-mean minus the cross-lane convergence tax." Pass 3 (a) **discharged that tax** —
α's (uncommitted, NG-1) counterfactual proves the ratified table the zero-manufactured-edge assignment; and
(b) **hardened all three legs** (A 58→68, B 45→62, C 54→68, leg-mean ~66). Left there the composition would
read ~66. **The owner-verbatim auditor scored owner-carriage at 62%** (the four un-charted clauses drag the
six advanced ones). **The full-thesis auditor scored convergence at 60%** — 2 below the carriage ceiling
because the full-thesis lens sees what the clause-count could not: NG-1/NG-2 (the uniqueness proof + most of
the β/γ evidence are not reproducible), NG-3 (min-edge is a chosen objective dressed as measurement), NG-5
(the advanced legs are advanced-*with-open-forks*, not a closed plan). Per the campaign law ("the composed
thesis's earned % from the audits, never inflated"), **60% is the ceiling** — simultaneously a real advance
over 50 (the tax is gone, the caps closed) and the honest cap the un-charted half + the reproducibility debt
impose. The remaining 40% is the four enumerated clauses (δ/ε/ζ) + the Group-B reproducibility obligation.

---

## §3 The surviving gaps → the pass-4 charters (named closers, per the ruling protocol)

Pass 4 runs the same convergent loop (RESEARCH → SYNTHESIZE → PROTOTYPE → CRITIQUE → AGGLOMERATE) against
these gap-closers, THEN a FRESH full-thesis adversary over the whole (composed thesis + the three new
charters). **Only a pass that runs with zero surviving gaps starts the two-consecutive-clean-passes clock.**
Batches ≤3 concurrent; prototypes RUN in isolated worktrees or marked SPEC-ONLY; docs-and-prototype-scoped;
the campaign never edits execution-tranche surfaces. Each carries the audit finding(s) that opened it.

### Charter δ (pass-4) — LIBRARY COMPLEXITY REDUCTION — **the lead** (closes GA-1 / clause 12 + NG-4)
The sharpest un-carried clause. Every RAN pass-1/2/3 library move is behavior-PRESERVING (the color merge is
"cycle-neutral, relocates nodes without rewiring edges", 2326=2326). Pass-4 must:
1. **Enumerate the god-module carve set** — the 14 src files > 500 LoC (`color.ts` 754, `scroll-timeline.ts`
   658, `parsing/index.ts` 644, `stylesheet.ts` 643, `easing.ts` 643, `style-names.ts` 641, …) — with a
   per-file **before/after LoC target** and the cohesion axis each splits along (parse-cluster subdirs like
   the landed `parsing/color|timeline|stylesheet`; the `conversions/` leaf-split pattern).
2. **Name the complexity metric that goes DOWN** — not net LoC (a barrel split preserves it): max-file-LoC,
   the count of files > 500, the `dispatch.ts` fan-in hub (558 LoC), or a cyclomatic measure. A carve that
   reduces the metric, distinguished from a relocation that does not.
3. **Reconcile NG-4** — β's color merge GAINS 5 `units/color→parsing` edges and leaves `color.ts` at 754; it
   serves "better structure," NOT "reduce complexity." δ must state that explicitly so the merge does not read
   as clause-12 progress, and must show which carves actually move `color.ts` off the top.
4. **Reconcile with clause 4** — the god-module carve IS the D3 half of "long-running dirs broken"; the
   `barrel-pure` / 500-line-ceiling law (F1) is the enforcement, not the plan.

### Charter ε (pass-4) — LONG-DIRS + STYLES + DEMO-WIDE MANIFEST (closes GA-2/3/5, clauses 4/3/1 + NG-6 + NG-3)
1. **`panes/`** (16–17 flat files, ~2009 LoC) → a `panes/chassis/` carve + colocation (the D1 half of clause 4).
2. **`style.css`** (55 KB god-sheet) → cohesion-carve + single-owner colocation ("same for styles", clause 3
   — 0 charters to date).
3. **The demo-wide flatten manifest** — extend α's VALIDATED one-bucket method to a per-dir ratified table
   across all 6 `demo/@/` sub-dirs (`@components` **162** · `@lib` **87** · `@composables` **95** · `@utils`
   **7** — re-measured HIGHER than the pass-0 survey) + the ~351-site @-abrogation, and **rule the
   `@src`/`@assets` scoping** (212/11 sites — do they survive a literal "abrogation of @"?).
4. **Resolve NG-6** — the ratified scatter introduces a KERNEL→app-root inversion (`keys.ts` imports a type
   FROM `useColorPipeline`). ε either follows-through the refactor that removes it or the owner ratifies the
   inversion; it must not be a silent post-scatter surprise.
5. **State NG-3's objective** — the census's min-manufactured-edge tie-break is a CHOSEN objective; ε must
   state it explicitly and surface min-edge-vs-literal-colocation as the real fork (routed under OF-4).

### Charter ζ (pass-4) — D4 HYGIENE DISPOSITION (closes GA-4, clause 11 + OF-6)
The six survey-only hygiene items, each to a booked disposition (delete / relocate / keep-with-reason):
39 root PNGs · 14 stale worktrees · 11 out-of-spec benches · stale docs · scripts-prune (dev + deploy.sh
survive on merit) · **the plugins fork** (the survey measured them LIVE + wired — `sourceExportPlugin`
`vite.config.ts:178`, `deferGlassFonts` `:302/:314` — contradicting the owner's "worthless → delete entirely"
— OF-6, delete-after-relocate vs keep-wired).

### The pass-4 convergence-gate obligation — REPRODUCIBILITY (closes NG-1 / NG-2)
Beyond the three design charters, pass-4 inherits **1 re-runnable instrument out of 9**. A clean pass-4
requires the durable-harness discipline `charter-alpha-harness.md` applied ONCE be applied to the β/γ
instruments too: embed `counterfactual.mjs` alongside the census harness (or the manifest downgrades "unique"
→ "zero-edge under the stated objective"), and re-embed the merge/registry/trace instruments so β's "2 FAIL→0"
and "34/0/0 both-homes trace" and γ's round-trip table are re-runnable from the repo. **Every pass-4
instrument embeds its durable harness at authoring time** (a standing pass-4 law, not a back-fill next pass).

### The pass-4 convergence gate
Beyond δ/ε/ζ + the reproducibility obligation: **a FRESH non-author FULL-THESIS adversarial audit** across the
whole composed thesis + the three new gap-closers. (The pass-3 full-thesis adversary — `audit-full.md` — has
ALREADY run and is folded here; pass-4 needs a *new* one over the expanded surface.) If pass-4 closes δ/ε/ζ +
the reproducibility obligation and the fresh full-thesis audit enumerates **zero** surviving gaps → pass-4 is
the **FIRST** clean pass; a pass-5 confirmation (pure fresh-audit-only) earns the second consecutive clean
pass, and the campaign converges to the tranche plan.

---

## §4 The OWNER-FORK register (every presented-not-decided fork, pass-3 fold)

Carried forward from pass-2 §4; this pass **widens OF-3 (γ), widens OF-4 (α CONCRETIZED + NG-3 OBJECTIVE),
and folds the NEW OF-6.** No brand-new fork beyond OF-6.

| # | Fork | Pole A | Pole B | State | pass-3 movement |
|---|---|---|---|---|---|
| **OF-1** | The `@`-ban idiom | eslint `no-restricted-imports` (incumbent) | glass-ui's mandated `proof:*` grep ("never ESLint") | **owner-reserved** | untouched — the atomic `git mv` cut α RAN is idiom-agnostic (its own audit gate proves the cut, needs neither) |
| **OF-2** | The api vocabulary | RATIFY `routes/service/repository` (measured-clean) | CONFORM to `api/model/lib` | **owner-reserved** | untouched |
| **OF-3** | The `{value,diagnostics}` boundary vs embed-warn | full top-level `{value,diagnostics}` return (breaking: 491 sites, a 2.0.0 major) | embed-warn at the spec-forced `@keyframes` class | **owner-reserved — NARROW** | **WIDENED by γ + confirmed by both auditors: "1 site" → "1 class / 2 sites"** (D1 `!important` + D2 invalid `animation-composition`); CHARACTER unchanged (spec-forced drops where fail-closed is spec-invalid) |
| **OF-4** | The app-cluster placement DIRECTORY **+ its OBJECTIVE (NG-3)** | re-bucket to `demo/color-picker/composables/color/` (RATIFIED default, min-edge) | colocate into `custom/color-picker/composables/` **/ literal-colocation (push toward the consuming feature even at an UP edge)** | **surfaced — green gates cannot adjudicate** | **CONCRETIZED by α** (6-file pipeline→FEATURE coupling evidence) **AND WIDENED by NG-3**: the census's min-manufactured-edge tie-break is a CHOSEN objective, not ground truth — the `useColorPipeline` tier is decided by it. The real fork is *min-edge-vs-literal-colocation*, not just the directory; the owner rules both |
| **OF-5** | The COUPLED OWNER EVENT | — | — | **owner-reserved — the landing gate** | untouched; the whole pass-3 execution FLOATS on it. Nothing merged. β books the merge's landing costs against it (test-repoint 15 · CLAUDE.md canon sweep · C1-regex widen — NG-5) |
| **OF-6** | **The plugins disposition** (audit §5, both auditors confirm) | DELETE entirely (owner-verbatim: "worthless") | KEEP wired (the survey measured them LIVE: `sourceExportPlugin` @ `vite.config.ts:178`, `deferGlassFonts` @ `:302/:314`) | **surfaced — owner-verbatim divergence** | the owner said "delete entirely"; both auditors HONESTLY CONTRADICT with measurement. Must become an explicit disposition (delete-after-relocate vs keep-wired) — routed to ζ, decided by the owner |

**Booked, not forked** (unchanged): `#11` `PropertyDescriptor → CSSPropertyDescriptor` is a value.js **2.0.0
MAJOR** coupled to a named kf re-point (`KF-VALUEJS-2.0.0.md §KF-7`, 4 kf sites) + a standing BH/BI relay —
gated on OF-5; the adversary confirmed `PropertyDescriptor` still exported at `stylesheet-types.ts:33` (bug
#11 OPEN). β's second booked-not-forked landing cost: the merge's `proof-subpath-budget.mjs` C1-regex widen
(`/src/parsing/` → also `units/color/parse/`), else the gate silently stops guarding the seam the merge
creates.

---

## §5 Agglomerator-verified facts + the two-clean-pass clock

**Spot-checked at HEAD (`d2bf5e1`), own authority (every number with its command):**
- `composables/color/` = **18** `.ts` files ✓ (`ls demo/@/composables/color/*.ts | wc -l`).
- **14 src files > 500 LoC** ✓ (the clause-12 gap is REAL and un-carved: `color.ts` **754** is the repo's
  largest; the full list matches both audits to the line).
- `units/index.ts` = **451** ✓ (γ's "451-not-452" correction confirmed; charter-b §0/§3's "452" is wrong).
- U-F29 `329932b` **IS an ancestor** of HEAD ✓ (`git merge-base --is-ancestor`).
- Hygiene ✓: **39** root PNGs · **14** worktrees · **2** live plugins (`sourceExportPlugin` @ `vite.config.ts:178`,
  `deferGlassFonts` @ `:302/:314`, both wired — contradicting the owner, OF-6) · **11** benches.
- Both audits + α/β/γ are all committed (HEAD `d2bf5e1`); the V tree is otherwise clean. (Working-tree
  `D CLAUDE.md` / `D src/parsing/CLAUDE.md` are OUTSIDE the campaign pathspec and untouched by this fold.)

**Credits (the campaign's epistemic discipline is genuine — it earns saying so, and BOTH auditors confirmed
it):** γ RETRACTED its own friction #1 (permissive-string is NON-lossy, measured verbatim) and the brief's
"aurora-atoms 3-not-2" (both auditors verified aurora=2); β RETIRED "small blast" for the true 15-test +
canon-doc radius; α RETIRED charter-a's flagship "17/1" for the honest 18/0; the "451-not-452" correction is
on disk. The full-thesis auditor re-ran every checkable number and **none was wrong**, and CLOSED γ's §7
handoff (no third silent-drop site). These retractions-earned-by-measurement are exactly the campaign law,
honored — and the campaign's honesty is precisely why the un-charted half (Group A) and the reproducibility
debt (Group B) are enumerated rather than papered over.

**The two-clean-pass clock.** Pass 1 minted the skeleton; pass 2 ran it as three charters and earned the
composed candidate (50%); **pass 3 closed the three legs' pass-2 caps + discharged the cross-lane tax (→60%),
ran BOTH required fresh non-author adversaries (owner-verbatim CLEAN-on-clean-break / 62% carriage +
full-thesis NOT-clean / 60% convergence), and surfaced the un-charted half of the owner's edict (Group A) plus
the reproducibility + objective-honesty debt (Group B).** Because gaps survive, **pass 3 is NOT a clean pass —
the clock is at 0 of 2.** Pass 4 = the gap-closer charters (δ complexity-reduction · ε long-dirs+styles+manifest
· ζ hygiene) + the reproducibility obligation (NG-1/NG-2) + a FRESH full-thesis adversary over the expanded
surface; if it enumerates zero surviving gaps it is the FIRST clean pass, and a pass-5 confirmation earns the
second. **The direction is settled and the whole remaining surface is now enumerated with named closers — but
the owner's most emphatic ask (clause 12, complexity reduction) is un-charted, most of the pass-3 evidence base
is not re-runnable, and convergence cannot be declared until a charter carries clause 12 and the instruments
are made durable.**
