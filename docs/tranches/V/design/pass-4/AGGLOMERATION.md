# V · PASS-4 AGGLOMERATION — the fold verdict + the pass-5 gap-closers

**Pass 4 · AGGLOMERATE · 2026-07-13 · author: pass-4 agglomerator (design authority — owns the registry
verdicts).** Inputs folded: **3 charter lanes** (δ complexity-reduction · ε long-dirs+styles+demo-wide-manifest ·
ζ D4-hygiene, all RAN + committed with 9 durable instruments) + **BOTH pass-4 fresh non-author adversarial
audits** — the FULL-THESIS convergence adversary (`audit-full.md`, **NOT CLEAN, 80% convergence**, GAP-1..GAP-7)
AND the owner-verbatim / clean-break lens (`audit-owner-verbatim.md`, **CLEAN on clean-break, 78% carriage**,
§4 gaps 1..5). Every number below is a lane's measured number or an agglomerator spot-check at HEAD
(`3fc0948`; the charter lanes RAN in isolated worktrees fast-forwarded to `7b554e4`, nothing merged).

---

## §0 The ruling up front — **pass-4 is NOT the clean pass (gaps survive; the clock stays 0 of 2)**

The protocol's clean bar (§0): *"100% = zero enumerated gaps + a fresh non-author adversarial audit + two
consecutive clean passes."* The task's ruling rule: **CLEAN requires BOTH audits clean AND δ/ε/ζ closed with
zero surviving gaps.** Neither condition holds:

- **The full-thesis audit is NOT clean** (`clean:false`, 80%) — it enumerates seven surviving gaps (GAP-1..7).
- **The owner-verbatim audit is clean on clean-break** (`clean:true`, 78%) **but carries five surviving
  owner-verbatim gaps** (§4) it does not close — clause-9 performance-above-all foremost; "clean on the
  clean-break sweep" ≠ "zero surviving gaps."
- **δ/ε/ζ each closed their OWN pass-3 caps** — but each carries open in-charter residuals (δ: 10-of-13
  carves SPEC-only, 2 registry-coupled; ε: the @src mislabel + the SHELL style deferral + OF-ε-1/2; ζ: OF-6
  undecided + the adopt-blocked delta), and the union of both audits' gaps survives cross-charter.

Therefore **`cleanPass = false`. The two-consecutive-clean-passes clock stays at 0 of 2.** The pass-5 charters
(§3) close the surviving gaps.

### The surviving gaps — the UNION of both audits (de-duplicated, mapped to pass-5 closers)

| # | the surviving gap | the audit(s) that raised it | on-disk fact (agglomerator-verified, this pass, `3fc0948`) | closer |
|---|---|---|---|---|
| **P4-G1** | **EXECUTION-layer reproducibility** — the durable-instrument law was applied to the *censuses*, not the *codemods*. No committed instrument APPLIES a carve/scatter and re-runs the suite; δ's "3 carves green / 2326 pass / init-order bug found", ε's "smoke 154 green", δ's "5→10 amplification" are all worktree-only + reset away | full-thesis **GAP-1**; owner-verbatim **§4.3** | the 9 analysis instruments reproduce (I re-ran `complexity-scan` → G500 **14** / OVER500 **1576** / MAXLOC **754**; born-RED gate FAIL@11 exit 1 / PASS@14 exit 0). **No `--apply` codemod exists** — the `writeFileSync`/`execSync` hits in 3 instruments are census self-writes, not carve mutations. `domain-edges` has `--merge-sim`; **δ has no analogous `--carve-sim`** | **Charter η** |
| **P4-G2** | **δ's carve set is 3-of-13 RUN** — 10 SPEC ("mechanical repeats"); 2 (`dispatch.ts` #12, `gamut.ts` #14) are SPEC-**with-caveat** (must land WITH β's order-independent registry, whose "2 FAIL→0" is itself un-re-runnable — compound debt not back-filled in pass-4). The terminal G500→1 is a projection | full-thesis **GAP-4** | complexity-scan reproduces the 14-file baseline; the carve SPECs are named-sibling repeats but only 3 RAN | **Charter η** |
| **P4-G3** | **`@src` mislabeled DEAD** — the manifest declares `@src` "0 / DEAD / abrogated / corrected to 0" from a demo-scoped measurement, but `@src` is a *deliberately-surviving live alias* at **235 sites**; a scoped number escalated to a global fact (a fresh NG-3 self-violation) + it contradicts ζ's own OF-6 `?source` finding | full-thesis **GAP-2**; owner-verbatim **§4.4** | `vite.config.ts:81` comment: *"the `@src` alias SURVIVES here"*; **203** sites in `test/` + **32** in `assets/docs/*.md` (the `?source` demo build input) = 235 live ✓ | **Charter θ** |
| **P4-G4** | **fork proliferation** — pass-4 adds OF-ε-1/OF-ε-2/NG-6-R1vR2 and widens OF-4 to **7 rows** + OF-6 to **3 poles × 2 plugins**; the owner now holds ~13 reserved decisions vs pass-3's ~6. A convergent plan should CLOSE forks; pass-4 opened net-new ones (NG-5 is WIDER after pass-4). Dominant drag on the earned % | full-thesis **GAP-3**; owner-verbatim **§4.5** | the §4 register below carries the full ~13-decision pile; every fork honestly surfaced, none pre-decided | **Charter θ** |
| **P4-G5** | **clause-9 "performance above all" is un-charted — anywhere in the 4-pass campaign.** No charter improves a single perf number; δ is behavior-preserving by design; the only perf-bearing item (ζ's `deferGlassFonts`) is owner-routed (OF-6), not delivered; Q14/LCP is U.W-PERF's tranche. A whole limb of the owner's "elegance, simplicity, AND performance above all" triad has zero carriage | owner-verbatim **§4.1** (the full-thesis lens under-weighted it) | `grep` δ/ε/ζ for a perf-improving charter = **none**; δ §0 "behavior 2326 pass, perf-neutral" | **Charter ι** |
| **P4-G6** | **clause-12's down-metric is a chosen-narrower reading** — the metric that falls is *ceiling-compliance* (G500/OVER500/MAXLOC), NOT the owner's literal "reduce file size and complexity." δ discloses net LoC **ROSE +158** and total cyclomatic is carve-invariant; the 500-ceiling + DATA-exemption are owner-ratifiable CHOICES. δ asserts "the god-modules do not offer net-LoC reduction" *without a dedup/dead-code scan* | full-thesis **GAP-5**; owner-verbatim **§4.2** | complexity-scan confirms the ceiling metric falls under a carve; net-reduction is un-measured | **Charter η** (add the dedup/dead-code scan) + owner-ratifiable line under θ |
| **P4-G7** | **`docs-linkgraph` doc-vs-instrument drift** — charter ζ §5 narrates "2 stale candidates"; the committed instrument today yields **0**. Net disposition unchanged (0 orphans, 2 litter, 922 records) — cosmetic, but exactly the doc-drifts-from-its-instrument class the durable law exists to catch | full-thesis **GAP-6** | re-ran `docs-linkgraph.mjs` → 0 stale non-record ✓ | **Charter η** (durable-sweep: reconcile the prose) |
| **P4-G8** | **OF-6 `deferGlassFonts` empirical delta is ADOPT-BLOCKED** — the with/without `index.css` render-blocking measurement can't run (`vite build --mode gh-pages` fails before CSS emission on the glass-ui `./goo-blob` adopt-drift); the 98.1 KB cost rests on a payload proxy + the S.W3 baseline, not the render-blocking build diff. Disclosed honestly; reconciles at the adopt-cut | full-thesis **GAP-7** | rides the same substrate-blocked door as U.W-CLOSE §3, orthogonal to the plugins fork | **carried** (rides the adopt-cut; no new charter) |

**Nothing in the gap set refutes an advanced leg.** Both auditors re-ran every *checkable* number — all 9
instruments, the born-RED gate exit codes, the merge-sim graph, the alias/placement/panes/style censuses, the
hygiene axes, the plugin costs, and the composed-thesis on-disk facts (`units/index.ts`=451, bug #11 open,
`test:dist`=10 un-culled) — and **none was wrong**. The gaps are about **execution-layer reproducibility, one
scope-honesty slip, the grown fork pile, the un-charted performance limb, and the net-vs-ceiling reading of
clause 12** — combined, the pass is decisively NOT clean.

---

## §1 What pass-4 EARNED (the real +20 advance — 60% → 78/80%)

This is genuine, verified, and substantial — the pass fanned back out to the owner's WHOLE edict, which pass-3
could not. Reported as facts (each with the lane that measured it + the agglomerator/auditor spot-check).

1. **The un-charted owner HALF is now CHARTED with RAN evidence.** Pass-3's load-bearing finding — "the campaign
   advanced ~half the owner's surface and left the other half un-charted" — is CLOSED. Clause 12 (δ), clauses
   4/3/1 (ε), clause 11 (ζ) each now carry a charter with a metric, a per-row disposition, and a re-runnable
   instrument. The owner-verbatim carriage rises **62% → 78%**; no owner clause is survey-only anymore (the
   sole remaining un-charted clause is **9, performance-above-all** — a gap pass-3 did not name, surfaced here).

2. **The durable-instrument law is DISCHARGED for the analysis surface — 9 of 9 reproduce.** Pass-3 inherited
   **1 re-runnable instrument of 9**; pass-4 committed **9 durable instruments** and BOTH fresh auditors re-ran
   **all nine from the repo root** and every one reproduced its charter's numbers. Agglomerator spot-check:
   `complexity-scan.mjs src` → G500 **14** / OVER500 **1576** / MAXLOC **754** (`color.ts`), born-RED gate
   FAIL@11 (exit 1) / PASS@14 (exit 0) ✓. This is a real, verifiable close of the pass-3 NG-1/NG-2
   reproducibility debt **for the census/metric layer** (the residual — the *codemods* — is P4-G1).

3. **NG-3 (objective-honesty) is honored line by line.** Every instrument header states its objective as a
   RULE and NAMES the alternative; the A/B two-objective placement manifest replaces the pass-3
   min-edge-as-measurement smuggle. (The lone violation is the `@src` label, P4-G3 — flagged precisely
   *because* the rest of the pass sets the honesty bar so high.)

4. **NG-4 is ruled by MEASUREMENT, not assertion.** δ §5 (reproduced from `domain-edges --merge-sim`): β's
   color merge = a `git mv` **relocation** (G500/MAXLOC unchanged; `units/color→parsing` 0→5); the carve is
   the clause-12 win (G500 −3). They compose; the carve AMPLIFIES β's re-coupling 5→10 — a sharp, honest
   finding that argues AGAINST conflating the merge with clause 12.

5. **NG-1 mooted-by-downgrade; NG-6 dispositioned to a fork.** The manifest drops "unique" and states the tier
   as objective-A (min-edge) vs objective-B (literal-colocation), "neither ground truth; the owner rules"; no
   "unique" claim now rests on the gone counterfactual. NG-6's kernel→app-root inversion is measured to ONE
   type-only edge (`keys.ts:4 import type UseColorPipelineReturn`) with R1 (hoist the type) / R2 (ratify) —
   no longer a silent surprise.

6. **Clean-break is genuinely CLEAN across every NEW spec.** The owner-verbatim lane swept δ/ε/ζ + both
   manifests for any surviving alias/shim/dual-path/masking-fallback and found **no NEW undisclosed
   violation**: δ carves = `git mv` + barrel re-export (byte-stable surface, one definition re-exported — not
   a dual path); ε panes = `git mv` + `git rm` the **0-consumer** dead barrel (clean delete); ε styles =
   delete-dead + colocate-single-owner; ζ deletes nothing. The one masking residual is still OF-3's embed-warn
   (unchanged, owner-routed); the two new residuals (OF-ε-1 Pole-A, the SHELL cascade) are disclosed + routed.

7. **The honesty on the hard parts is real (both auditors credit it).** δ discloses net-LoC-rose +158 +
   cyclomatic-invariance; ε discloses 79.5%-of-`style.css`-is-legitimately-global + the SHELL-fragments-a-
   coupled-cascade caveat; ζ discloses the plugins are measurably NOT worthless (contradicting the owner) and
   routes it as a fork with numbers instead of pre-deciding. Retractions/concessions earned by measurement —
   the campaign law, honored.

---

## §2 The registry fold (per-charter + composed-thesis verdict)

**States**: ADVANCED (a live candidate) · BANKED (substrate/support) · MERGED (subsumed) · OPEN (enumerated,
un-charted — the new pass-5 surface) · RETIRED (dead). The composed-thesis % is the **un-inflated FLOOR of the
two fresh audits** — full-thesis convergence **80%** / owner-verbatim carriage **78%** — held at **78%**
because clause-9 performance-above-all (owner-verbatim's distinct drag) is a real un-charted gap the
full-thesis lens under-weighted; never inflated above the stricter lens (the campaign never-inflate law).

| Row | State | pass-3 → pass-4 | One-line disposition (with the surviving cap) |
|---|---|---|---|
| **Charter A · the WHAT-tree (F1 ∘ F3)** | **ADVANCED — LEAD** | 68 → **68** | ε GENERALIZED α's one-bucket method demo-wide (`placement-census` 49K/12A/3F, α-reproduction PASS) — closing A's pass-3 SCOPE cap. Held at 68: the generalization is folded into the composed number; NG-1 downgrade stands; the placement forks WIDENED to 7 (P4-G4) |
| **Charter B · execution vehicle (F6 + F2 substrate)** | **ADVANCED** | 62 → **62** | Unmoved: β's registry "2 FAIL→0" was NOT back-filled durable in pass-4, so the 2 color-SCC carves (`dispatch`/`gamut`) still ride an un-re-runnable primitive (P4-G2 compound debt). The 5→10 merge×carve interaction is reproduced in DIRECTION only |
| **Charter C · D3 dimension + battery (F4 + F5)** | **ADVANCED** | 68 → **68** | Unchanged; `test:dist`=10 (the 10→7 cull is still a PROPOSAL, not landed — ζ §7 correctly cross-cites it as C's ruling); bug #11 `PropertyDescriptor` still exported at `stylesheet-types.ts:33` (OPEN) |
| **⊕ Charter δ · library complexity REDUCTION** | **ADVANCED** (new) | OPEN → **72** | CHARTED the sharpest clause with a metric that goes DOWN (G500 14→11 / OVER500 1576→1075 / MAXLOC 754→658 across 3 RUN carves) + a real born-RED gate + NG-4 ruled by measurement. Capped by P4-G1/G2 (10-of-13 SPEC, execution not re-runnable) + P4-G6 (ceiling-compliance ≠ net reduction; net LoC ROSE +158) |
| **⊕ Charter ε · long-dirs + styles + demo-wide manifest** | **ADVANCED** (new) | OPEN → **72** | CHARTED clauses 4/3/1: panes chassis-carve RAN, `style.css` cohesion-carve RAN (79.5% legitimately global — honest), the demo-wide 377-site abrogation + 64-file placement manifest, NG-6 dispositioned, NG-3 objective stated. Capped by P4-G3 (`@src` mislabeled DEAD) + P4-G4 (OF-ε-1/OF-ε-2 net-new forks) |
| **⊕ Charter ζ · D4 hygiene disposition** | **ADVANCED** (new) | OPEN → **75** | CHARTED clause 11: all 6 survey items → booked dispositions (39 PNGs SWEEP · 16 worktrees PROTECT-defer · 11 benches 6KEEP/4RETIRE/1REWRITE · scripts 7KEEP/1CULL · docs KEEP · gates→C) with 3 durable instruments; the plugins "delete" contradiction → OF-6 with measured poles. Capped by OF-6 undecided + P4-G7 (doc drift) + P4-G8 (adopt-blocked delta) |
| **⇒ THE COMPOSED THESIS (A × B × C × δ × ε × ζ)** | **ADVANCED — THE CANDIDATE** | 60 → **78** | The whole owner edict is now charted; 9/9 analysis instruments durable; NG-1/3/4/6 discharged; NG-2 narrowed to the execution layer. RE-CAPPED at the un-inflated floor **78%** (full-thesis 80 / owner-verbatim 78) by the surviving gaps: EXECUTION non-reproducibility (P4-G1/G2), the `@src` scope slip (P4-G3), the grown fork pile (P4-G4), and the un-charted performance limb (P4-G5). The remaining 22% is ENUMERATED with named η/θ/ι closers |
| **⊕ P4-G1/G2/G6 · EXECUTION reproducibility + net-metric** | **OPEN → pass-5 η** | — | the durable-instrument law applied to CODEMODS (not just censuses): commit `--apply` carve/scatter codemods idempotent from the pinned base; back-fill β's registry primitive; add the dedup/dead-code scan (net-reduction measurement); reconcile the `docs-linkgraph` prose |
| **⊕ P4-G3/G4 · scope-honesty + fork closure** | **OPEN → pass-5 θ** | — | correct the `@src`=DEAD mislabel (fold into OF-ε-1); attach every fork a RECOMMENDED pole + measured cost + the single owner-decision it needs, so the pile STOPS growing and the owner rules a BATCH at the coupled owner event (OF-5) |
| **⊕ P4-G5 · the PERFORMANCE limb (clause 9)** | **OPEN → pass-5 ι** | — | charter "performance above all": either a value.js-scoped perf win with a metric that goes DOWN, or an explicit reconcile-and-route naming U.W-PERF/Q14/LCP as the carrier — so the third limb of the owner's triad is CHARTED not survey-only |

### Why the composed thesis is 78% (a real advance over 60, and the honest cap)
Pass-3 scored it 60% = the full-thesis convergence number with half the edict un-charted. Pass 4 (a) **charted
the whole edict** (the un-charted half is closed — the +advance), and (b) **made the analysis surface durable**
(9/9 reproduce). The full-thesis auditor scored convergence at **80%** (the clause-carriage lens self-reports
~82–85%, docked to 80 for the execution non-reproducibility + the grown forks). The owner-verbatim auditor
scored carriage at **78%** — 2 below, because the owner-verbatim lens sees a clause the full-thesis under-
weighted: **clause 9, performance-above-all, un-charted anywhere in the campaign.** Per the never-inflate law,
**78% is the binding cap** — the un-inflated floor of the two lenses — simultaneously a real +18 advance over 60
(the un-charted half is charted, the instruments reproduce) and the honest ceiling the surviving gaps impose.
The remaining 22% is the four gap-families (η/θ/ι + the carried adopt-blocked delta).

---

## §3 The surviving gaps → the pass-5 charters (named closers, per the ruling protocol)

Pass 5 runs the same convergent loop (RESEARCH → SYNTHESIZE → PROTOTYPE → CRITIQUE → AGGLOMERATE) against these
gap-closers, THEN a FRESH full-thesis adversary over the whole (composed thesis + η/θ/ι). **Only a pass that
runs with zero surviving gaps starts the two-consecutive-clean-passes clock.** Batches ≤3 concurrent;
prototypes RUN in isolated worktrees or marked SPEC-ONLY; docs-and-prototype-scoped; the campaign never edits
execution-tranche surfaces. Each carries the audit finding(s) that opened it.

### Charter η (pass-5) — THE EXECUTION-REPRODUCIBILITY CODEMOD SET — **the lead** (closes P4-G1/G2/G6)
The dominant surviving gap: the durable-instrument law was applied to the *censuses*, not the *codemods*. Every
"RAN green" claim (δ's 3 carves + 2326 pass + the init-order bug; ε's panes+style carve + smoke 154; δ's 5→10
amplification) rests on a worktree that resets away. Pass-5 must:
1. **Commit the CODEMODS as durable instruments** — a `carve-color.mjs --apply`, a `panes-carve.mjs --apply`,
   and a scatter codemod, each **idempotent, re-runnable from the pinned base** (`7b554e4`) against any tree,
   so the carved/scattered tree + its green suite is re-derivable. The `domain-edges --merge-sim` no-mutation
   simulator is the referent; **δ needs the analogous `--carve-sim` / `--apply` pair.**
2. **Back-fill β's order-independent registry primitive** as a re-runnable instrument (the "2 FAIL→0" TDZ cure)
   — the P4-G2 compound debt: `dispatch.ts`/`gamut.ts` (carves #12/#14) must land WITH it, and the owner
   cannot today re-derive it.
3. **Add a dedup / dead-code scan** (closes P4-G6 / owner-verbatim §4.2): measure whether any god-module
   carries dead or duplicated code, so the "no net-LoC reduction available" claim is a MEASUREMENT not an
   assertion — and state plainly that the library's TOTAL size is not reduced, only its worst files'.
4. **Reconcile the `docs-linkgraph` prose** with the instrument (charter ζ §5 says "2 stale", the instrument
   yields 0) — the exact doc-drift the durable law exists to catch (P4-G7 as a P4-G6 sibling).
5. **RUN the remaining 10 SPEC carves** (scroll-timeline, easing, stylesheet, boundary, parsing/utils,
   units/utils, path, dispatch, parsing/math, gamut) via the committed `--apply` codemod, ratcheting the
   born-RED gate 11→…→1 — turning the terminal G500→1 from a projection into a RAN result.

### Charter θ (pass-5) — SCOPE-HONESTY + FORK CLOSURE (closes P4-G3/G4 + NG-5)
1. **Correct the `@src`=DEAD mislabel** (P4-G3): the manifest row becomes *"`@src` = 0 in `demo/@/` (the flatten
   scope); LIVE at 235 sites (203 `test/` + 32 `assets/docs/*.md` `?source`) + a surviving `vite.config.ts:86`
   alias; the @-abrogation is demo-scoped, `@src` survives by intent"* — and fold it into OF-ε-1 alongside
   `@assets`. This is a fresh NG-3 self-violation the pass introduced; it must not surface mid-execution.
2. **Drive the fork pile toward CLOSURE** (P4-G4 / NG-5 wider): the owner holds ~13 reserved decisions
   (OF-1..OF-6 + OF-ε-1 + OF-ε-2 + NG-6-R1vR2 + δ's ceiling-value/DATA-exemption + P4-G6's net-vs-ceiling
   reading). A convergent plan CLOSES forks — θ must attach every fork a **RECOMMENDED pole + measured cost +
   the single crisp owner-decision it needs**, consolidated into ONE batch the owner rules at the coupled
   owner event (OF-5), so the pile **stops growing** and the plan becomes a surprise-free executable. θ opens
   NO new fork.

### Charter ι (pass-5) — THE PERFORMANCE LIMB (closes P4-G5 / clause 9)
The sharpest surviving owner-verbatim gap: "elegance, simplicity, AND **performance above all**" — the third
limb has ZERO carriage across all four passes. ι must CHART it (mirroring how δ/ε/ζ charted the other
un-charted clauses), by EITHER:
- **(a)** a value.js-scoped perf win with a metric that goes DOWN — the parse-that-ZERO `/color` barrel, the
  subpath-budget floor, parse/interp hot paths, or the `color2Into` zero-alloc surface — a benchmark that
  measurably improves, OR
- **(b)** an explicit **reconcile-and-route**: name U.W-PERF / Q14 (LCP 5141 / TBT 5988, the eager-WebGL-blob
  boot blocker) as the carrier tranche, state precisely what value.js-side perf work the campaign OWNS vs
  DEFERS, and book it — so "performance above all" is CHARTED with a disposition, not left survey-only.

ι must not conflate structural simplicity (already advanced) with performance; the owner named them as
distinct above-all goals.

### The pass-5 standing laws (carried, binding)
- **THE DURABLE-INSTRUMENT LAW NOW BINDS CODEMODS** (the pass-4 residual made law): every carve/scatter/merge
  a charter claims "RAN green" ships a committed, idempotent `--apply` instrument re-runnable from the pinned
  base — not only a worktree diff. A claim whose codemod is not committed is DOWNGRADED to "attested, not
  re-derivable" in its own doc.
- **NG-3 objective-honesty** applies to EVERY number, including scoped measurements — a demo-scoped 0 is never
  escalated to a global "DEAD" (the P4-G3 lesson).
- **Fork discipline**: a pass may only NET-CLOSE forks; surfacing a new fork requires closing an equal-or-
  greater number, else the pass is not convergent on the fork axis.

### The pass-5 convergence gate
Beyond η/θ/ι + the standing laws: **a FRESH non-author FULL-THESIS adversarial audit** across the whole
composed thesis + the three new gap-closers. If pass-5 closes η/θ/ι and the fresh audit enumerates **zero**
surviving gaps → pass-5 is the **FIRST** clean pass; a pass-6 confirmation (pure fresh-audit-only, no new build
work — anything new resets the clock) earns the second consecutive clean pass, and the campaign converges to
the tranche plan + wave sets.

---

## §4 The OWNER-FORK register (every presented-not-decided fork, pass-4 fold)

Carried from pass-3 §4; this pass **widens OF-4 (α's 1 → 7 demo-wide rows), widens OF-6 (3 poles × 2 plugins),
folds the NEW OF-ε-1 / OF-ε-2 / NG-6-R1vR2, and books δ's ceiling-value + the P4-G6 net-vs-ceiling reading as
owner-ratifiable.** The pile GREW to ~13 (P4-G4) — **θ's charge is to drive it toward closure, not add to it.**

| # | Fork | Pole A | Pole B (+ C where measured) | State | pass-4 movement |
|---|---|---|---|---|---|
| **OF-1** | The `@`-ban idiom | eslint `no-restricted-imports` (incumbent) | glass-ui's mandated `proof:*` grep ("never ESLint") | **owner-reserved** | untouched — ε's `git mv` abrogation is idiom-agnostic |
| **OF-2** | The api vocabulary | RATIFY `routes/service/repository` (measured-clean) | CONFORM to `api/model/lib` | **owner-reserved** | untouched; δ/ε/ζ do not touch the backend |
| **OF-3** | The `{value,diagnostics}` boundary vs embed-warn | full top-level `{value,diagnostics}` return (breaking: 491 sites, a 2.0.0 major) | embed-warn at the spec-forced `@keyframes` class (1 class / 2 sites) | **owner-reserved — NARROW** | untouched (charter-γ's); still the ONE disclosed owner-routed masking residual |
| **OF-4** | The app-cluster placement DIRECTORY **+ its OBJECTIVE** | re-bucket to `demo/color-picker/composables/color/` (min-edge) | colocate into the consuming feature / literal-colocation | **surfaced — WIDENED to 7 rows** | ε enumerated **7 A≠B demo-wide fork rows** (α surfaced 1): keys/useContrastSafeColor/ink→color-picker, generate-color→generate, aurora-atoms→panes, lib/palette/utils + api/useApiClient→palette-browser. The owner rules the OBJECTIVE (min-edge KERNEL vs literal-colocation FEATURE), not each dir; both tables regenerate from one instrument |
| **OF-5** | The COUPLED OWNER EVENT | — | — | **owner-reserved — the landing gate** | untouched; the whole campaign execution FLOATS on it. δ/ζ book landing costs against it (doc-canon sweep, gate excise/author, C1-regex widen); nothing merged |
| **OF-6** | The plugins disposition | (A) KEEP wired | (B) DELETE-AND-INLINE into `vite.config.ts` (kills the bare `plugins/` dir at ZERO behavior cost — serves the owner's want) · (C) DELETE-ENTIRELY accepting the measured regression | **surfaced — 3 poles × 2 plugins** | the owner said "worthless → delete"; both auditors HONESTLY CONTRADICT (`deferGlassFonts` +98.1 KB gz, `sourceExportPlugin` 10 `?source` consumers + golden). ζ presents 3 measured poles per plugin, decides NONE. The empirical render-blocking delta is ADOPT-BLOCKED (P4-G8) |
| **OF-ε-1** (new) | The `@assets` cross-boundary abrogation **+ the `@src` survival** | (A) keep ONE clean `@assets`/`@src` alias | (B) literal 4-deep relative · (C) relocate the `.md` corpus into `demo/` | **surfaced — owner-reserved** | 11 `AboutPane.vue import('@assets/docs/*.md')` sites cross `demo/` into repo-root `assets/`. **θ folds the mislabeled `@src` survival (235 sites) into this fork** (P4-G3) — the @-abrogation is demo-scoped; `@src`/`@assets` survival is the fork |
| **OF-ε-2** (new) | panes min-move vs per-pane-dir | min-move (`aurora-harmony-stops.ts` flat; earned-dir rule does not fire on one data file) | a per-pane `AuroraPane/` dir | **surfaced — owner-reserved** | ε took min-move; surfaced not decided |
| **NG-6-R1vR2** (new) | the kernel→app-root type inversion | **R1** hoist the pipeline-return type to KERNEL (inversion gone — recommended) | **R2** ratify the single type-only kernel→app inversion | **surfaced — owner-reserved** | measured to ONE type-only edge (`keys.ts:4`); no longer a silent surprise |

**Booked, not forked / owner-ratifiable CHOICES** (θ presents these for a crisp ratify): `#11`
`PropertyDescriptor → CSSPropertyDescriptor` is a value.js **2.0.0 MAJOR** coupled to a named kf re-point
(`KF-VALUEJS-2.0.0.md §KF-7`, 4 kf sites) + a standing BH/BI relay — gated on OF-5 (still exported at
`stylesheet-types.ts:33`, bug #11 OPEN) · β's `proof-subpath-budget.mjs` C1-regex widen (the merge's seam) ·
**δ's 500-line ceiling value + the `style-names` DATA-table exemption** (adopted from glass-ui, stated as
CHOICES) · **the P4-G6 net-vs-ceiling reading of clause 12** (is ceiling-compliance the owner's intended
reading of "reduce complexity," or is net-reduction wanted? — η's dedup scan feeds this).

---

## §5 Agglomerator-verified facts + the two-clean-pass clock

**Spot-checked at HEAD (`3fc0948`), own authority (every number with its command):**
- **14 src files > 500 LoC** ✓ — `complexity-scan.mjs src` → G500 **14** / OVER500 **1576** / MAXLOC **754**
  (`color.ts`); the clause-12 gap is REAL, the metric reproduces to the line.
- **The born-RED complexity gate is GENUINE** ✓ — `--gate 11` → exit **1** (FAIL); `--gate 14` → exit **0**
  (PASS). Not a piped `$?`; node's real exit code.
- **`@src` SURVIVES (P4-G3 confirmed)** ✓ — `vite.config.ts:81` comment *"the `@src` alias SURVIVES here"*;
  **203** sites in `test/` + **32** in `assets/docs/*.md` = **235** live. The manifest's "DEAD / corrected to
  0" is a demo-scoped 0 escalated to a global fact.
- **No `--apply` codemod exists (P4-G1 confirmed)** ✓ — the `writeFileSync`/`execSync` hits in
  `plugin-delta`/`hygiene-census`/`docs-linkgraph` are census self-writes; there is no committed carve/scatter
  mutation. `domain-edges` has `--merge-sim`; δ has no `--carve-sim`.
- **`docs-linkgraph` yields 0 stale non-record (P4-G7 confirmed)** ✓ — the committed instrument reports 0
  stale / 2 litter / 922 records; charter ζ §5's "2 stale candidates" prose has drifted.
- All 6 pass-4 docs (δ/ε/ε-manifest/ζ + both audits) + 9 instruments are committed (HEAD `3fc0948`); the V
  tree is otherwise clean.

**Credits (the campaign's epistemic discipline is genuine — and BOTH auditors confirmed it):** δ disclosed net
LoC ROSE +158 + cyclomatic-invariance rather than hide them; ε disclosed 79.5%-of-`style.css`-is-global; ζ
refused the owner's "worthless → delete" where measurably false and routed OF-6 with numbers; every instrument
header states its objective as a rule and names the alternative (NG-3). BOTH auditors re-ran all 9 instruments
and every number reproduced. These retractions-earned-by-measurement are exactly the campaign law, honored —
and the campaign's honesty is precisely why the execution-reproducibility debt (P4-G1/G2), the `@src` scope
slip (P4-G3), the grown fork pile (P4-G4), and the un-charted performance limb (P4-G5) are enumerated rather
than papered over.

**The two-clean-pass clock.** Pass 1 minted the skeleton; pass 2 ran it as three charters (50%); pass 3 closed
the three legs' caps + discharged the cross-lane tax (60%), ran BOTH required fresh adversaries, and surfaced
the un-charted owner half + the reproducibility debt; **pass 4 CHARTED that whole un-charted half (clauses
12/4/3/11/1) with RAN exemplars + 9 durable reproducing instruments (→ 78%), ran BOTH fresh adversaries
(full-thesis NOT-clean/80% + owner-verbatim CLEAN-on-clean-break/78% carriage), and closed NG-1/3/4/6.**
Because gaps survive — the EXECUTION layer is not re-runnable (no committed codemod), the `@src` label is a
scoped-0-as-global-DEAD slip, the fork pile GREW to ~13, and performance-above-all is un-charted anywhere —
**pass 4 is NOT a clean pass; the clock is at 0 of 2.** Pass 5 = the gap-closer charters (η
execution-reproducibility-codemods · θ scope-honesty + fork-closure · ι the performance limb) + the standing
durable-codemod law + a FRESH full-thesis adversary over the expanded surface; if it enumerates zero surviving
gaps it is the FIRST clean pass, and a pass-6 confirmation earns the second. **The whole owner edict is now
charted and the analysis surface is durable — but convergence cannot be declared until the codemods are
committed re-runnable, the fork pile stops growing, and the performance limb is charted.**
