# V · pass-4 · AUDIT — THE FRESH FULL-THESIS ADVERSARY (the EXPANDED surface: A×B×C + δ + ε + ζ)

**Lane**: pass-4 fresh non-author FULL-THESIS adversarial audit over the whole composed thesis
(pass-3 A×B×C) PLUS the three pass-4 gap-closers (δ complexity-reduction · ε long-dirs+styles+
demo-wide-manifest · ζ hygiene). **Date**: 2026-07-13. **Model**: opus (declared). **Non-author**:
this lane authored NOTHING in the V campaign — not the portfolio, not any spec/proto/critique/retro,
not charters a/b/c or α/β/γ or δ/ε/ζ, not any agglomeration, not either pass-3 audit. **Mode**:
docs-read of the whole campaign + **first-hand re-run of every committed instrument from the repo
root** + on-disk verification of the load-bearing claims. HEAD `1c5444d`; the pass-4 launch base
`7b554e4` IS an ancestor (verified). Nothing merged; pathspec `docs/tranches/V/**`.

**My charge (verbatim)**: audit the WHOLE against the failure-mode checklist + the durable-instrument
law (re-RUN ≥4 committed instruments myself — an instrument that does not run from its committed form
is a gap) + the owner's verbatim clause-by-clause (verify the four formerly-un-charted clauses are NOW
charted with RAN evidence) + verify NG-1..NG-7 discharged-or-open + enumerate EVERY surviving gap.

---

## §0 Verdict up front

| axis | verdict |
|---|---|
| **CLEAN / NOT-CLEAN** | **NOT CLEAN.** Pass-4 is a **large, honest advance** — it CHARTS all four formerly-un-charted owner clauses (12/4/3/11 + the demo-wide manifest, clause 1) with RAN exemplars, and I re-ran **all 9 committed instruments from the repo root and every one reproduced its charter's numbers** (the durable-instrument law is discharged for the ANALYSIS surface — a genuine close of pass-3's NG-1/NG-2 for the census/metric layer). But gaps survive on FOUR axes: (a) the **RUN-evidence NG-2 residual** — the *analysis* instruments are durable, but the *codemods* that produce every "RAN green" claim (δ's 3 carves + 2326 tests; ε's panes+style carve + smoke 154; δ's 5→10 amplification) are worktree-only, un-re-runnable — the durable law was applied to the censuses, not to the carves; (b) a **fresh honesty gap the pass INTRODUCED** — the manifest declares `@src` "DEAD / CORRECTED to 0" from a demo-scoped measurement, contradicting the live `@src` alias (vite.config.ts:86, deliberately-surviving) + 235 live `@src` sites (32 in the `assets/docs/*.md` `?source` pages, a demo build input; 203 in test/) + ζ's OWN OF-6 `?source` finding; (c) **fork proliferation** — pass-4 adds OF-ε-1/OF-ε-2/NG-6-R1vR2 and widens OF-4 to 7 rows + OF-6 to 3 poles ×2 plugins, so NG-5 ("the advanced half is not a closed plan") is WIDER after pass-4, not narrower; (d) **δ's carve set is 3-of-13 RUN, 10 SPEC** (2 coupled to β's un-re-runnable registry), and its metric is ceiling-compliance NOT the owner's literal "reduce file size" (net LoC ROSE +158, disclosed). |
| **EARNED %** | **80%** (composed-thesis convergence, un-inflated; pass-3 was 60%). A real +20 advance: the owner's whole edict is now charted (no clause un-touched), the instruments are durable and reproduce, NG-3 (objective-honesty) is genuinely met, NG-1 is mooted-by-downgrade, NG-4 is ruled-by-measurement, NG-6 is dispositioned. Capped below convergence because the "RAN green" evidence base is NOT re-runnable (NG-2 survives in a narrowed form), a scoped `@src=0` is presented as a global correction (a surprise the owner hits mid-execution), and the plan carries MORE owner-reserved forks than pass-3 — convergence (a gap-free, surprise-free, re-runnable tranche plan) is closer but not reached. |
| **one-line finding** | Pass-4 did what pass-3 could not — it fanned back out to the owner's whole edict and charted the un-charted half with durable, reproducing instruments and honest objective-statements. The work is genuine and the discipline is real (I re-ran all 9 instruments; NG-3 is honored line-by-line). But it converged the ANALYSIS and left the EXECUTION un-reproducible: no committed codemod lets the owner re-derive a single "RAN green" carve, the demo-wide manifest scopes `@src` away rather than ruling it, and every charter surfaces MORE forks than it closes. The clock stays **0 of 2**. |

---

## §1 THE DURABLE-INSTRUMENT LAW — I RE-RAN ALL 9 FROM THE REPO ROOT (the hard obligation)

The pass-4 standing law: every committed instrument must run from its committed form against any tree.
I ran **all nine** from `/Users/mkbabb/Programming/value.js` against the live main tree (`1c5444d`).
**Every one reproduced its charter's numbers.** This is the single biggest advance over pass-3 (which
inherited **1 re-runnable instrument of 9**); pass-4 inherits **9 of 9** for the analysis surface.

| # | instrument (charter) | command I ran | reproduced |
|---|---|---|---|
| 1 | `complexity-scan.mjs` (δ) | `… complexity-scan.mjs src` | **G500=14 · OVER500=1576 · MAXLOC=754** (`color.ts`) ✓ — matches δ §2 to the line |
| — | `complexity-scan.mjs --gate` (δ born-RED) | `--gate 11` → **exit 1** (FAIL); `--gate 14` → **exit 0** (PASS) | δ §6's born-RED gate is GENUINE (I captured node's real exit code, not a piped `$?`) ✓ |
| 2 | `domain-edges.mjs` (δ) | `… src` and `… src --merge-sim` | HEAD **XDOM 143 / 20 directions**; merge-sim **XDOM 138 (−5) / 21 dir / `units/color→parsing` = 5** ✓ — matches δ §5 |
| 3 | `alias-census.mjs` (ε) | `… alias-census.mjs` | **377 total · 366 in-demo · 11 `@assets` x-bound · `@src` 0 (demo-scoped)** ✓ — but see §5 GAP-2 on the `@src` label |
| 4 | `placement-census.mjs` (ε) | `… placement-census.mjs` | **49 KERNEL / 12 APP / 3 FEATURE / 0 ORPHAN · 7 forks · α-REPRODUCTION PASS** (color bucket = α's 6K/12A/0F) ✓ |
| 5 | `panes-carve.mjs` (ε) | `… panes-carve.mjs` | **CHASSIS 4 / LEAF 10 / DATA 1 / DEAD 1 · 2076 LoC · the `<style>`-relative-path hazard on 2 files** ✓ |
| 6 | `style-census.mjs` (ε) | `… style-census.mjs` | dead `.underline-tabs` · colocate `.glass-slider` → ConfigSliderPane · **after ~44314 b** ✓ |
| 7 | `hygiene-census.mjs` (ζ) | `--pngs · --worktrees · --benches · --scripts` | **39 PNGs (0 load-bearing) · 16 worktrees (0/16 sweepable) · benches (`color-soa-fold` MISS) · `build-fraunces-tnum.py` 0-refs** ✓ |
| 8 | `docs-linkgraph.mjs` (ζ) | `… docs-linkgraph.mjs` | **0 stale non-record candidates · 2 litter · 922 records** ✓ — but see §5 GAP-6 (charter §5 prose narrates "2 stale candidates", the instrument yields 0) |
| 9 | `plugin-delta.mjs` (ζ) | `… plugin-delta.mjs` | `deferGlassFonts` **98.1 KB gz** · `sourceExportPlugin` **10 `?source` consumers** + golden ✓ |

**Reading:** the durable-instrument law is DISCHARGED for the analysis/census/metric surface — a real,
verifiable close of the pass-3 reproducibility debt for that layer. **The residual (GAP-1, §5)**: none
of the 9 is a *codemod* — there is **no committed instrument that APPLIES a carve/scatter and re-runs
the suite**. The `git mv`/`writeFileSync` grep-hits in `domain-edges.mjs`/`complexity-scan.mjs` are the
`--merge-sim` SIMULATION + comments; they mutate nothing. So the "RAN green" evidence remains the
lane's word + a gone worktree — the NG-2 pattern, narrowed to the execution layer.

---

## §2 The failure-mode checklist — applied to the EXPANDED thesis (A×B×C + δ + ε + ζ)

| # | hook | verdict on the whole |
|---|---|---|
| 1 | **vacuous convergence** (gates pass, owner edict unmet) | **LARGELY CURED** (the pass-3 headline). Pass-4 fanned back out: clause 12 (δ), clause 4/3/1 (ε), clause 11 (ζ) are all charted with RAN exemplars + dispositions. The owner-verbatim carriage rises because no clause is survey-only anymore. **Residual**: "charted" ≠ "executed" — δ ran 3 of 13 carves, ε ran 1 of 6 demo buckets' worth of moves, ζ *deletes nothing* (by design, landing-wave). The plan is complete; the execution is exemplar-only. |
| 2 | **gates that cannot fail** | **CLEANER than pass-3.** δ's `complexity-scan --gate` is a real born-RED (exit 1 at G500=14 vs gate 11 — I verified the exit code). The α-tautology pass-3 flagged (H3 built to emit 0) is REPLACED by the min-edge/literal-colocation TWO-objective framing (`placement-census` reports both; neither is "ground truth") — the objective is no longer smuggled. |
| 3 | **elegant-reduction / "and then the hard part"** | **PRESENT (narrowed + newly honest).** δ states plainly: a carve buys ceiling-compliance + locality, NOT complexity reduction — **net LoC ROSE +158, total cyclomatic is carve-invariant**. That is the "hard part" (dedup/delete) named-and-declined, not hidden. But it means the owner's literal "grown in file size … REDUCE complexity" is answered by an *objective the owner has not ratified* (the 500-line ceiling, adopted from glass-ui) — δ flags it as a CHOICE (credit), but the harder ask stands un-delivered. ε's SHELL style colocation + 10 of 13 δ carves are SPEC-only ("and then the landing wave"). |
| 4 | **dual paths / masked fallbacks / aliases** | **CLEAN on the atomic-cut law; ONE NEW scope-honesty gap.** No transitional-`@` window; OF-3's embed-warn is the one disclosed owner-routed masking residual (unchanged). **NEW**: the manifest labels `@src` "DEAD / abrogated / corrected to 0" — but `@src` is a *deliberately-surviving live alias* (vite.config.ts:81 comment: "the `@src` alias SURVIVES here") at 235 sites. That is not a dual-path violation, but it is a scoped measurement dressed as a global fact (§5 GAP-2). |
| 5 | **unverified gestalt** | **PARTIAL — inverted from pass-3.** The BIG analysis claims are now ALL re-runnable (I ran all 9). The un-verifiable claims moved to the EXECUTION: δ's "3 carves behavior-preserving, 2326 pass, one init-order bug found+fixed", ε's "smoke 154 green", δ's "amplify 5→10 on the carved tree" — each rests on a worktree diff that is not committed. Plausible + partially corroborated (the metric falls a priori under any carve), but not independently re-derivable (GAP-1). |
| 6 | **consumer-less substrate** | **NOT PRESENT.** Every instrument has a landing-wave consumer; the metric gate has a ratchet. |
| 7 | **circularity** | **MOSTLY DISSOLVED.** The pass-3 "census encodes the design it validates" is defused by the two-objective framing (A vs B, owner rules). Mild residual: `placement-census`'s α-reproduction harness reproduces α's *assignment* (6K/12A/0F) — it does NOT prove *uniqueness* (that is discharged by the DOWNGRADE, §4 NG-1, not by proof). |

---

## §3 Owner-verbatim clause-by-clause — verify the four formerly-un-charted clauses are NOW charted with RAN evidence

The pass-3 owner-verbatim audit's table (12 clauses) is my baseline. The four it scored 30–35% (GAP,
survey-only) were clauses **3 / 4 / 11 / 12** (+ clause 1 PARTIAL). Verifying each is now charted with
RAN evidence:

| # | clause | pass-3 state | pass-4 state | RAN evidence I verified |
|---|---|---|---|---|
| **12** | library complexity REDUCTION (the sharpest) | **GAP** (survey-only) | **CHARTED (δ)** | δ names a metric that goes DOWN (G500/OVER500/MAXLOC — I reproduced 14/1576/754 + the born-RED gate), 3 RUN carves (worktree-only), 10 SPEC, 1 DATA-exempt. **Charted ✓** — but the metric is ceiling-compliance not net reduction (disclosed, owner-ratifiable) + RUN evidence not re-runnable (GAP-1). |
| **4** | long-running dirs broken + encapsulated | **GAP** | **CHARTED (δ god-modules + ε panes)** | ε RAN the `panes/` chassis carve (`panes-carve.mjs` reproduces CHASSIS 4 / 16→11+chassis); δ's god-module set IS the D3 half. **Charted ✓** (panes RUN worktree-only). |
| **3** | "same for styles" | **GAP** (0 charters) | **CHARTED (ε)** | ε RAN delete `.underline-tabs` + colocate `.glass-slider`; SHELL colocation SPEC (cascade-proven). `style-census` reproduces. **Charted ✓** — honest finding: 79.5% of `style.css` is legitimately global. |
| **11** | D4 hygiene minus the gate-cull | **PARTIAL** (only gate-cull) | **CHARTED (ζ)** | ζ books all 6 items to dispositions with per-row proof + 3 durable instruments I re-ran. **Charted ✓** — NO deletion lands (landing-wave, by design + SWEEP-SAFETY). |
| **1** | demo flatten + `@`-abrogation manifest | **PARTIAL** (one bucket) | **CHARTED (ε), one residual** | ε's `placement-census` (49K/12A/3F) + `alias-census` (377 sites) generalize α demo-wide; α-reproduction harness PASS. **Charted ✓** EXCEPT the `@src`/`@assets` survival the pass-3 audit flagged un-ruled: `@assets` correctly surfaced (OF-ε-1); **`@src` is NOT ruled — it is mislabeled DEAD** (GAP-2). |
| 2,5,6,7,8,9,10,§0.1/2 | (the 8 pass-3-CARRIED clauses) | CARRIED | **still CARRIED** | I re-verified the load-bearing on-disk facts: `units/index.ts`=451 (below ceiling), bug #11 `PropertyDescriptor` still exported at `stylesheet-types.ts:33` (OPEN), `test:dist`=**10** gates (the 10→7 cull is still a PROPOSAL, not landed — ζ §7 correctly cross-cites it as charter-C's ruling, not landed). |

**Verdict on the charge:** the four formerly-un-charted clauses (12/4/3/11) + the demo-wide manifest
(1) are **NOW CHARTED with RAN evidence** — the pass-3 "half the edict un-charted" finding is CLOSED.
The residuals are (a) RUN evidence not re-runnable, (b) clause-1's `@src` sub-residual mislabeled, (c)
clause-12's metric is a chosen-narrower reading. The clause-carriage lens would now score ~82–85%.

---

## §4 NG-1..NG-7 — discharge verification (each was my inheritance; verified on disk)

| # | pass-3 gap | pass-4 disposition | my verdict |
|---|---|---|---|
| **NG-1** | the manifest's "UNIQUE by counterfactual" is not reproducible | **DISCHARGED-BY-DOWNGRADE.** The manifest §0 drops "unique" and states the tier as objective-A (min-edge) vs objective-B (literal-colocation), "neither ground truth; the owner rules." `placement-census` reproduces α's assignment (harness PASS). | **CLOSED** via the pass-3-sanctioned downgrade route. `counterfactual.mjs` is still not committed, but no "unique" claim now rests on it. |
| **NG-2** | 8 of 9 pass-3 instruments non-reproducible | **NARROWED, NOT CLOSED.** All 9 pass-4 *analysis* instruments are committed + reproduce (I ran them). But **no codemod is committed** — the carve/scatter RUN evidence (δ 3-carves-green, ε panes+style-green, δ 5→10) is worktree-only. | **PARTIALLY OPEN** → GAP-1. The law was applied to the census layer, not the execution layer. |
| **NG-3** | min-edge is a chosen objective dressed as measurement | **DISCHARGED.** Every instrument header + every charter §0 states the objective as a RULE and NAMES the alternative (I read all four instrument headers). The A/B two-objective manifest is the exemplar. | **CLOSED** — genuinely, line by line. (The one place the pass VIOLATES its own NG-3 law is the `@src` label, §5 GAP-2 — a scoped number presented as global.) |
| **NG-4** | β's merge re-couples, ≠ clause 12 | **DISCHARGED-BY-MEASUREMENT.** δ §5: merge = `git mv` relocation (G500/MAXLOC unchanged; I reproduced `--merge-sim` = XDOM −5, +1 direction, `units/color→parsing` 5); carve = the clause-12 win (G500 −3). They compose; the carve AMPLIFIES β's re-coupling 5→10. | **CLOSED** (the 5→10 amplification number is worktree-only — rides GAP-1 — but the DIRECTION of the ruling is reproduced). |
| **NG-5** | the ADVANCED half is not a closed plan | **WIDER, NOT CLOSED.** Pass-4 ADDS OF-ε-1 (`@assets`), OF-ε-2 (panes dir), NG-6 R1-vs-R2; widens OF-4 to **7 fork rows** + OF-6 to **3 poles ×2 plugins**. The owner now has ~13 reserved decisions vs pass-3's ~6. | **OPEN, WIDENED** → GAP-3. Honest (every fork is surfaced, none pre-decided) but convergence-on-the-fork-axis moved AWAY. |
| **NG-6** | the kernel→app-root inversion the scatter introduces | **DISPOSITIONED.** Measured to ONE type-only edge (I confirmed on disk: `keys.ts:4 import type UseColorPipelineReturn from ./useColorPipeline`). ε offers R1 (hoist the type → inversion gone, recommended) or R2 (owner ratifies type-only=1). | **CLOSED to a fork** (R1/R2 is owner-reserved — rides GAP-3, but it is no longer a silent surprise). |
| **NG-7** | process: the pass-3 fold ruled without the full-thesis adversary | folded in pass-3 | **N/A** — a process note, superseded when the pass-3 full-thesis audit ran. This audit is pass-4's fresh full-thesis adversary. |

**Net:** NG-1/NG-3/NG-4/NG-6 discharged; NG-2 narrowed (GAP-1); NG-5 widened (GAP-3). The reproducibility
obligation is **half-met**: the census layer is durable, the execution layer is not.

---

## §5 SURVIVING-GAP ENUMERATION (every gap — the protocol bar)

A gap = anything that would surprise the owner mid-execution, or a claim not re-runnable from committed
form, or a decision not already in the owner-fork register.

- **GAP-1 · the RUN-evidence NG-2 residual (the durable law applied to censuses, not codemods).** The 9
  analysis instruments are durable + reproduce (verified). But **no committed instrument applies a carve
  or scatter and re-runs the suite** — so δ's "3 carves green, 2326 pass, one init-order bug found+fixed",
  ε's "panes+style carve, smoke 154 green", and δ's "amplify 5→10 on the carved tree" are the lane's word
  + a worktree that resets away. This is the *exact* NG-2 shape pass-4 was meant to close, narrowed to the
  execution layer. *Closer: commit a `carve-color.mjs` / `panes-carve --apply` codemod (idempotent, from
  `7b554e4`) so the green RUN is re-derivable — the α discipline applied to the codemods, not just the
  metrics.*
- **GAP-2 · `@src` mislabeled DEAD — clause-1's `@src`/`@assets` survival residual is scoped away, not
  ruled (a fresh NG-3 self-violation).** The manifest §1: "`@src` = 0 · DEAD · already abrogated · the
  campaign's '@src 212 sites' is STALE — CORRECTED to 0." On disk `@src` is a **live, deliberately-
  surviving alias** (`vite.config.ts:86` `{ find: "@src", replacement: …/src }`; the `:81` comment reads
  "the `@src` alias SURVIVES here") used at **235 sites** — **32 in `assets/docs/*.md`** (the `?source`
  reference pages, a demo BUILD INPUT rendered in `AboutPane`) + **203 in test/**. The instrument's `@src=0`
  is honestly scoped in its header ("import SITE in demo/"), but the manifest prose escalates the demo-scoped
  0 into a global "DEAD" — a scoped measurement dressed as a global correction (the very NG-3 failure the
  pass elsewhere honors). It also **contradicts ζ's own OF-6 finding** (`sourceExportPlugin` has 10 live
  `?source` consumers — which import via `@src`). The pass-3 audit's explicit residual ("`@src`/`@assets`
  survive un-ruled; a literal '@ abrogation' would kill them; no charter states whether they survive by
  intent") is therefore NOT resolved — `@src` demonstrably SURVIVES, and the honest ruling ("the owner's
  @-abrogation is `demo/@/`-scoped; `@src` stays as the `?source`/test source-of-truth alias") is the
  OPPOSITE of what the manifest asserts. *Closer: correct the manifest to "`@src` = 0 in `demo/@/` (the
  flatten scope); LIVE at 235 sites (assets/docs `?source` + test/) + a surviving vite alias — the
  @-abrogation is demo-scoped, `@src` survives by intent", and fold it into OF-ε-1 alongside `@assets`.*
- **GAP-3 · fork proliferation — NG-5 is WIDER after pass-4.** The owner-reserved set grew: OF-4-widened
  (α's 1 fork → **7** demo-wide rows), OF-6 (**3 poles × 2 plugins**), + NEW OF-ε-1 (`@assets` 3 poles),
  OF-ε-2 (panes min-move vs per-pane-dir), NG-6 R1-vs-R2. A convergent plan should CLOSE forks; pass-4
  opens net-new ones. Each is honestly surfaced and none is pre-decided (credit) — but "surprise-free
  tranche plan" is further away on the fork axis, and this is the dominant drag on the earned %.
- **GAP-4 · δ is 3-of-13 LOGIC carves RUN; the terminal G500→1 is a projection.** 10 carves are SPEC
  ("mechanical repeats"). Two of them (`dispatch.ts` #12, `gamut.ts` #14) are SPEC-**with-caveat**: they
  must land WITH β's order-independent registry primitive — whose "2 FAIL→0" demonstration is itself
  un-re-runnable (pass-3 NG-2, NOT back-filled in pass-4). So the two color-SCC carves depend on a
  primitive the owner cannot re-derive. Compound reproducibility debt.
- **GAP-5 · clause-12's metric is a chosen-narrower reading of the owner's word.** δ is honest that net
  LoC ROSE +158 and total cyclomatic is carve-invariant; the metric that falls is *ceiling non-compliance*.
  The owner said "grown in file size and complexity dramatically … REDUCE complexity." A carve REDUCES no
  file's total size (it relocates + adds headers). δ names this (credit, NG-3) and flags the 500-ceiling +
  DATA-exemption as CHOICES — but the owner has not ratified that ceiling-compliance is the intended reading
  of "reduce file size," and no carve delivers net reduction. Owner-ratifiable, surfaced.
- **GAP-6 · `docs-linkgraph` doc-vs-instrument drift.** Charter ζ §5 narrates the instrument yielding "2
  stale candidates (both false-positive: `dev-deploy-standard.md`, `instructions/README.md`)". The committed
  instrument today yields **0 stale candidates** (both files now count live-inbound). Net disposition
  unchanged (0 orphans, 2 litter, 922 records) — cosmetic, but it is exactly the doc-drifts-from-its-own-
  instrument class the durable law exists to catch.
- **GAP-7 · OF-6 `deferGlassFonts` empirical delta is ADOPT-BLOCKED.** The with/without `index.css`
  render-blocking measurement can't run (`vite build --mode gh-pages` fails before CSS emission on the
  glass-ui `./goo-blob` adopt-drift). So the 98.1 KB cost rests on the direct payload measurement + the
  plugin's S.W3 baseline, not the actual render-blocking build diff. Disclosed honestly by ζ; the
  reconciliation rides the adopt-cut. Minor.

**Nothing in §5 refutes an advanced leg** — every checkable number reproduced (I ran all 9 instruments +
verified the composed-thesis on-disk facts). The gaps are about **execution-layer reproducibility, one
scope-honesty slip, and net-new forks** — combined, the pass is NOT clean.

---

## §6 Credits (what HELD under a fresh full adversary — earned, and substantial)

- **All 9 instruments re-ran and reproduced.** G500/OVER500/MAXLOC, the born-RED gate exit codes, the
  merge-sim graph, 377/366/11 aliases, 49/12/3/0 + the α-reproduction PASS, panes 4/10/1/1, the style
  census, the 4 hygiene axes, the linkgraph, the plugin costs — every number matched. The durable-instrument
  law is genuinely discharged for the analysis surface; this is the pass's biggest, verifiable advance.
- **NG-3 is honored line by line.** Each instrument header states its objective as a rule and names the
  alternative; the A/B two-objective manifest replaces the pass-3 min-edge-as-measurement smuggle. (The
  lone violation is the `@src` label, GAP-2 — worth flagging precisely *because* the rest of the pass sets
  the honesty bar so high.)
- **δ's born-RED gate is real.** `--gate 11` → exit 1 at G500=14; `--gate 14` → exit 0. A genuine
  ratchet, not a gate-that-cannot-fail.
- **NG-4 is ruled by measurement, not assertion.** The merge-is-relocation / carve-is-the-win distinction
  is reproduced from `--merge-sim`; the "carve amplifies β's re-coupling" is a sharp, honest finding that
  argues AGAINST conflating the merge with clause 12.
- **The honesty on the hard parts is real.** δ discloses net-LoC-rose +158 and cyclomatic-invariance; ε
  discloses 79.5%-of-style.css-is-legitimately-global and the SHELL-fragments-a-coupled-cascade caveat; ζ
  discloses the plugins are measurably NOT worthless (contradicting the owner) and routes it as a fork.
  These are retractions/concessions earned by measurement — the campaign law, honored.
- **The composed-thesis legs still hold.** `units/index.ts`=451, bug #11 open, `test:dist`=10 (cull
  un-landed) — all as the charters state; no drift.

---

## §7 The earned number + what a clean pass requires

**80% — composed-thesis convergence, un-inflated (pass-3: 60%).** The +20 is real and earned: the owner's
whole edict is charted (vacuous-convergence largely cured), 9-of-9 analysis instruments are durable and
reproduce (NG-1/NG-2 closed for the census layer), NG-3/NG-4/NG-6 discharged. It sits below convergence
because the full-thesis lens sees what the clause-carriage lens (~82–85%) cannot: the EXECUTION evidence is
not re-runnable (GAP-1/GAP-4), a scoped `@src=0` is presented as a global "DEAD" (GAP-2 — a mid-execution
surprise), and the plan carries net-new forks (GAP-3). None drops far, because every *checkable* number
reproduced and the objective-honesty is genuine.

**cleanPass = false.** The two-consecutive-clean-passes clock stays at **0 of 2**.

**A clean pass-5 requires** (beyond confirming δ/ε/ζ): (i) commit the CODEMODS (a `carve-color.mjs` /
`panes-carve --apply` / a scatter codemod, idempotent from `7b554e4`) so every "RAN green" claim is
re-derivable — the durable law applied to the execution, not just the census (GAP-1/GAP-4); (ii) correct
the `@src` manifest row from "DEAD/0" to "0-in-`demo/@/`; LIVE at 235 sites + a surviving vite alias; the
@-abrogation is demo-scoped, `@src` survives by intent" and route it under OF-ε-1 (GAP-2); (iii) either
close forks or the owner rules them — the fork set must stop GROWING (GAP-3); (iv) then a fresh full-thesis
adversary enumerating **zero** surviving gaps → the FIRST clean pass; a pass-6 confirmation earns the
second.

---

## §8 Owner-reserved forks (this lane decides NONE)

OF-1 (@-ban idiom) · OF-2 (api vocabulary) · OF-3 (`{value,diagnostics}` — 1 class / 2 sites) · OF-4-widened
(min-edge vs literal-colocation — **7 fork rows**, §3 of the manifest) · OF-5 (the coupled owner event) ·
OF-6 (plugins — **3 poles × 2 plugins**, ζ §6) · **OF-ε-1** (`@assets` cross-boundary — and I add: fold the
mislabeled `@src` survival into it, GAP-2) · **OF-ε-2** (panes min-move vs per-pane-dir) · **NG-6 R1-vs-R2**
(hoist-the-type vs ratify-the-inversion) · **δ's ceiling value + DATA-exemption** (500-line ceiling adopted
from glass-ui; `style-names` exempt — stated as CHOICES, owner-ratifiable, GAP-5). Presented, not decided.
**Nothing merged; this lane authored only this audit, pathspec `docs/tranches/V/**`.**
