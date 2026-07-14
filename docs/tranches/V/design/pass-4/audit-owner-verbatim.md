# V · pass-4 · AUDIT — THE OWNER-VERBATIM / CLEAN-BREAK LENS (fresh re-run over δ/ε/ζ)

**Lane**: pass-4 fresh non-author adversarial audit, owner-verbatim / clean-break register. **Date**:
2026-07-13. **Model**: opus (declared). **Non-author**: this lane authored none of the specs / protos /
charters / instruments it audits (not δ/ε/ζ, not the manifests, not any prior pass). **Mode**: docs-read of
the WHOLE campaign surface (portfolio → pass-1/2/3 → **pass-4 δ/ε/ζ + the two manifests + the 9 committed
instruments**) + **first-hand on-disk RE-RUN** at tranche-u HEAD `1c5444d`. Every number below carries the
command I ran THIS lane — inherited from nothing. Nothing merged; pathspec `docs/tranches/V/**`.

**The task (verbatim):** re-walk the charter §0 verbatim clause-by-clause against the full campaign surface
including this pass's δ/ε/ζ. Special attention: **clause 12** (is complexity MEASURABLY reduced by the
charted plan — does the metric go DOWN, and is the metric HONEST?); **the clean-break law across every NEW
spec** (the `style.css` carve, the `panes/` encapsulation, the plugins poles — any shim / dual-path / masking
hiding?); **OF-1..OF-6 all still presented-not-decided.**

**What changed since the pass-3 owner-verbatim lane (62% carriage, CLEAN-on-clean-break).** Pass-3 left FOUR
owner clauses SURVEY-ONLY (12 / 4 / 3 / 11) + the demo-wide manifest deferred (1). Pass-4 charted all of
them: **δ** (complexity, clause 12), **ε** (long-dirs + styles + demo-wide manifest, clauses 4/3/1), **ζ**
(D4 hygiene, clause 11). This lane's job is to check whether they CARRY the owner's words honestly, or
merely re-file the survey.

---

## §0 Verdict up front

| axis | verdict |
|---|---|
| **CLEAN / NOT-CLEAN (clean-break law)** | **CLEAN — one owner-routed masking residual, no NEW undisclosed violation.** I swept every pass-4 spec for a surviving alias / shim / dual-path / masking-fallback. The pass-4 carves are all clean-break SHAPES: δ = `git mv` region → named sibling + barrel re-export (byte-stable surface, not a dual path); ε panes = `git mv` chassis + `git rm` the **0-consumer** dead barrel (clean delete, no legacy); ε styles = DELETE the dead `.underline-tabs` + colocate a single-owner block; ζ = a disposition manifest that deletes nothing. The ONE masking residual is still **OF-3**'s embed-warn at the spec-forced `@keyframes` class (charter-γ's, unchanged). The pass-4-introduced residuals — **OF-ε-1 Pole-A** ("keep ONE clean `@assets` alias") and the `style.css` SHELL cascade coupling — are DISCLOSED + owner-routed, not hidden. The `deferGlassFonts` `*-Fallback` faces are a CSS font-loading strategy (owner-routed OF-6), not a code-path masking fallback. No hidden violation in any new spec. |
| **EARNED %** | **78%** (owner-verbatim CARRIAGE across all 12 clauses + §0.1/§0.2 — up from pass-3's **62%**). The jump is REAL and earned: the four survey-only clauses (12/4/3/11) + the demo-wide manifest (1) are now CHARTED with RAN proof-of-method + **9 committed durable instruments I re-ran and reproduced**. Held below 100 by three surviving owner-verbatim gaps the pass-4 charters do not close — **clause 9 "performance above all" has NO charter anywhere in the campaign**; **clause 12's metric-that-goes-DOWN is ceiling-COMPLIANCE, not total complexity** (δ's own honest headline: net LoC ROSE +158); and the **carve/move RUN-results are attested, not reproducible** (the measurement instruments are durable; the mutated trees reset away). |
| **the one-line finding** | Pass-4 is a genuine, honest CLOSE of the pass-3 "un-charted owner half": every clause the loop had left in the Pass-0 survey now has a charter with a metric, a per-row disposition, and a re-runnable instrument — the sharpest ask (clause 12) most of all, with a metric that provably goes DOWN and an objective-honesty headline that refuses to overstate it. What survives is narrower and sharper than pass-3's: **performance-above-all** (un-advanced), the **net-vs-per-file complexity reading** of clause 12, and the **reproducibility of the mutations** (the campaign's never-merge law makes the carve RESULTS attested-not-checkable, even though the measurement is durable). |

---

## §1 The clause-by-clause table (owner §0 verbatim → CARRIED-where / GAP, re-walked over δ/ε/ζ)

State is scored against the FULL surface incl. pass-4. "Δ vs pass-3" tracks the movement this pass earned.
Every on-disk check was re-run THIS lane at HEAD `1c5444d`.

| # | Owner clause (condensed) | pass-3 | **pass-4 state** | CARRIED where (incl. δ/ε/ζ) / the surviving GAP | on-disk check (re-run this lane) |
|---|---|---|---|---|---|
| **1** | "flattening … abrogation of `@` … simplification of the … structure of our **demo**" | PARTIAL | **CARRIED** | ε delivers the demo-wide RATIFIABLE manifest (was "landing-wave's job"): the **377-site** `@`-abrogation surface enumerated (`alias-census.mjs`), the **64-file** placement census across all 6 `demo/@/` buckets (`placement-census.mjs`, α-harness PASS), `panes/` carve RAN. **Residual (minor):** ε rules `@src`=**0 in the demo** and calls the pass-3 "212" STALE — but that 212 was repo-wide; **208 `@src` tsconfig-alias sites survive in `test/`**, outside the `demo/@/` scope, un-ruled. ε's "corrected to 0" reframes rather than rules the `test/` surface. | `alias-census.mjs` → 377 sites (`@components` 172·`@composables` 95·`@lib` 87·`@utils` 7·`@styles` 5·`@assets` 11·`@src` **0** in-demo) ✓; `grep -rn "@src/" test/ \| wc -l` = **203** (still live) |
| **2** | "components **COLOCATED** with … sub-components, composables, skeletons, constants … **recursively** … a grand edict for **ALL file directories**" | PARTIAL | **CARRIED (mostly)** | The one-bucket method is now a demo-wide per-dir table (`placement-census.mjs`: 49 KERNEL / 12 APP / 3 FEATURE / 0 ORPHAN) + panes colocation RAN. **Residual:** the DEEP per-component recursive colocation across all of `components/custom/` (each nested component's sub-components/skeletons beside it) is manifested for shared composables + panes, not every component tree — a landing-wave detail, not a charter. | `placement-census.mjs` TALLY 49/12/3/0 = 64 ✓; α-reproduction (color bucket 6K/12A/0F) PASS ✓ |
| **3** | "… **same for styles**, etc" | **GAP** | **CARRIED** | ε's cohesion carve RAN (`style-census.mjs`): DELETED dead `.underline-tabs`, COLOCATED the single-owner spectrum block → ConfigSliderPane (55687→54544 b). **The load-bearing honest finding:** `style.css` is **~79.5% legitimately GLOBAL** (tokens 43% + a11y modality layer + imports + cross-family registers) — NOT a god-sheet of mislaid single-owner blocks; the residual carve is MODEST, not wholesale. SHELL carve presented spec-only (cascade-proven, deferred as beyond the safe-RUN envelope). | `style-census.mjs`: SINGLE-OWNER=1 · SHELL=12 · CROSS-FAMILY(stay)=2 ✓ |
| **4** | "**Long running dirs** must and always be **broken into common modules and encapsulated**" | **GAP** | **CARRIED** | Both long-dir classes charted: δ carves the **14 god-modules** (3 RUN + 10 SPEC) under a born-RED ceiling gate; ε carves `panes/` (16 → 11 leaves + `chassis/` + delete dead barrel). The enforcement is a gate (`complexity-scan.mjs --gate N`), not a plan. | `complexity-scan.mjs src` G500=**14** ✓; `panes-carve.mjs` CHASSIS 4/LEAF 10/DATA 1/DEAD 1 ✓ |
| **5** | "… applied to all **backend files** … befitting for those languages" | CARRIED | **CARRIED** | Unchanged: value.js api passes glass-ui's own `proof-backend-structure` GREEN (charter-a §4); OF-2 (vocab) owner-routed. δ/ε/ζ do not touch the backend. | (carried from pass-3; api boundary GREEN by measurement) |
| **6** | "**Read … glass-ui tranches BH, BI** … planned module/directory codification" | CARRIED | **CARRIED** | Unchanged; δ adopts glass-ui's codified 500-line ceiling as its metric objective (stated as a CHOICE, §1). | referent READ-ONLY on disk (charter-a §5) |
| **7** | "Deploy a **fastidious, convergent and iterative** design triumvariate … research, harden, wave update and author" | CARRIED | **CARRIED** | The loop is now **4 passes**; the wave-author remains deliberately deferred to convergence (still not reached — gaps survive). | `pass-1/ pass-2/ pass-3/ pass-4/` on disk ✓ |
| **8** | "… **backend library** … **parsing validations** … keyframes.js … **parseCSSValue buggies and goblins**" | CARRIED | **CARRIED** | Unchanged (charter-γ): diagnostics fork resolved, `#11` re-costed MAJOR, `grammar-fuzz` born-RED, U-F29 credited, `{D1,D2}` drop-set complete. | (carried from pass-3) |
| **9** | "NO quick solutions … **idiomatic, gestalt** … elegance, **simplicity, and performance above all**" | PARTIAL | **PARTIAL — the surviving drag** | Idiomatic/gestalt + **simplicity** now materially advanced (δ's per-module ≤500-line comprehensibility, the carve-not-workaround). **BUT "performance above all" has NO charter — anywhere in the campaign.** δ is behavior-PRESERVING (perf-neutral by design); the only perf-bearing item (ζ's `deferGlassFonts`) is an OWNER-ROUTED fork (OF-6), not a delivered improvement; the Q14/LCP work is U.W-PERF, a different tranche. The owner's "performance above all" is un-carried. | no perf-improving charter (grep δ/ε/ζ = none); δ §0 "behavior 2326 pass, perf-neutral" |
| **10** | "NO legacy code. **Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks**" | CARRIED (1 residual) | **CARRIED (1 residual)** | The pass-4 sweep (§2) finds **no NEW undisclosed violation**. δ carves = `git mv` + barrel re-export; ε panes = `git mv` + `git rm` the 0-consumer barrel; ε styles = delete + colocate; ζ deletes nothing. OF-3 remains the one disclosed owner-routed masking residual. New residuals (OF-ε-1 Pole-A, SHELL cascade) DISCLOSED + routed. | §2 (full sweep, re-run this lane) |
| **11** | "base repo is a mess: **screenshots · worktrees · docs · benches · plugins → deleted · scripts … · gates overfit**" | PARTIAL (6/7 GAP) | **CARRIED** | ζ books EVERY item: 39 PNGs SWEEP (0 load-bearing cites) · 16 worktrees PROTECT-defer (0/16 pass the 4-clause law) · 11 benches 6 KEEP/4 RETIRE/1 REWRITE · scripts 7 KEEP + 1 CULL (fraunces, 0-invoker) · docs 2 litter/0 orphan/922 records KEEP · gates cross-cite C (10→7) · **the plugins "delete entirely" contradiction is now OF-6** with MEASURED poles (the honest resolution of the survey's contradiction). | `plugin-delta.mjs`, `hygiene-census.mjs`, `docs-linkgraph.mjs` all re-ran ✓ (§below) |
| **12** | "library grown in **file size and complexity dramatically** — **REDUCE complexity**, better structure directories, modules, files" | **GAP (sharpest)** | **CARRIED — with an honest scope caveat** | δ charters the sharpest ask with a **metric that goes DOWN**: G500 (files>500) **14→11**, OVER500 **1576→1075**, MAXLOC **754→658** across 3 RUN carves; plan reaches G500_logic→0. Enforced by a born-RED gate (I verified FAIL@11/PASS@14). NG-4 reconciled (β's merge ≠ complexity progress, measured via `--merge-sim`). **The honesty is exemplary AND the caveat is real:** the metric that falls is **ceiling-COMPLIANCE + per-file size + locality**, NOT total complexity — δ's own headline states **net LoC ROSE +158**, cyclomatic is carve-invariant. The owner's whole-library "grown in file size dramatically → REDUCE" is served per-file, not net. And δ asserts "the god-modules do not OFFER net-LoC reduction" without scanning for dedup/dead-code — an out-of-scope claim by assertion, not measurement. | `complexity-scan.mjs src` → G500 **14** · OVER500 **1576** · MAXLOC **754** ✓ (matches the 14 to the line); `--gate 11` → **FAIL exit 1** (born-RED) ✓; `--gate 14` → **PASS exit 0** ✓ |
| **§0.1/§0.2** | glass-ui codified the template (`@` abrogated, flattened, colocated); CODIFIED but partially executed; align to SPEC, name both poles | CARRIED | **CARRIED** | Unchanged; δ names its 500-line ceiling as adopted-from-glass-ui (a CHOICE, not a measurement — §1). | (carried from pass-3) |

---

## §2 The clean-break sweep over the NEW specs (δ/ε/ζ + the two manifests) — re-run this lane

The task's hard obligation: hunt any surviving alias / shim / dual-path / masking-fallback in EVERY NEW spec.
Command: `grep -rniE "fallback|shim|dual.?path|alias|legacy|migrat|backward|compat" pass-4/*.md` + a read of
every carve mechanism. **Result: no NEW undisclosed violation; the pass-3 OF-3 residual persists; two new
residuals are disclosed + owner-routed.**

| candidate (pass-4) | where | verdict (first-hand) |
|---|---|---|
| **δ god-module carve = a dual path?** | charter-δ §3/§4 | **CLEAN.** Each carve moves a cohesive region into a named sibling; the residual module (or cluster barrel) RE-EXPORTS the same symbols → the FROZEN subpath surface is byte-stable (`proof:barrel-parity` GREEN in the RUN). A barrel re-export is not a dual path — there is exactly ONE definition, re-exported. The `createColorMix(colorValueParser)` factory + `Parser.lazy` wrapper are init-order DI (the same primitive as β's registry), not a masking fallback. |
| **ε panes carve leaves a transitional import?** | charter-ε §1 | **CLEAN.** `git mv` the 4 chassis + `git rm index.ts` (the barrel had **0 consumers** — verified by `panes-carve.mjs`); imports rewired in the same pass. The dead barrel is DELETED (no-legacy), not kept as a compat shim. The `@reference "…style.css"` +1-level fix is a relative-path correction, not an alias. |
| **ε `style.css` SHELL deferral = a dual path?** | charter-ε §2 | **CLEAN (spec-only, disclosed).** The 12 SHELL blocks STAY central in this RUN (only the dead block + 1 single-owner block moved); the SHELL colocation is a spec-only landing-wave plan with a static cascade-ORDER argument. A deferral is not a dual path — nothing resolves twice. The honest caveat (colocating fragments a cascade currently read as one adjacent unit) is stated, not hidden. |
| **OF-ε-1 Pole A — "keep ONE clean `@assets` alias"** | charter-ε §6 / manifest §3 | **RESIDUAL — disclosed + owner-routed.** Pole A would keep an `@assets` alias, which TENSIONS with a literal "abrogation of `@`". But ε PRESENTS it as a 3-pole fork (A keep-alias / B literal-relative 4-deep brittle / C relocate corpus into `demo/`), decides NONE, and names the tension. An owner-reserved fork with the tension surfaced is not a hidden shim. |
| **ζ `deferGlassFonts` `*-Fallback` faces** | charter-ζ §6 | **CLEAN — not the clean-break class.** These are metric-compatible fallback FONT FACES (a FOUT/layout-shift mitigation in the glass-ui producer's font strategy), not a value.js code-path fallback that masks a failure. The plugin's disposition is owner-routed (OF-6, 3 measured poles). |
| **ζ plugin Pole B — DELETE-AND-INLINE into `vite.config.ts`** | charter-ζ §6 | **CLEAN — a relocation, not a shim.** Moving the plugin logic inline kills the bare `plugins/` dir at **zero behavior change**; it is the owner's underlying want served without regression. Presented as a pole, decided by the owner. |
| **the min-edge objective dressed as measurement (NG-3)** | manifest §0/§3 | **CLEAN — objective STATED, alternative NAMED, routed.** ε states BOTH objectives (A min-edge / B literal-colocation) as rules, reports both tables side-by-side, and routes min-edge-vs-literal-colocation as OF-4-widened. This is exactly the objective-honesty NG-3 demanded — a choice named as a choice, not a fact. |

**No transitional-`@` window, no half-migrated strangler, no silent compat path anywhere in δ/ε/ζ.** The
clean-break law is carried and demonstrated across the new surface, same as pass-3.

---

## §3 Reproducibility of the pass-4 evidence (the durable-instrument law — checked, first-hand)

Pass-3's NG-2 docked the campaign to **1 re-runnable instrument of 9**. Pass-4's binding law: EVERY instrument
committed durable, re-runnable from the repo root against any tree. **I re-ran all NINE this lane; every one
reproduced its charter's headline** — a genuine closure of the measurement half of NG-1/NG-2:

| instrument | I re-ran → reproduced |
|---|---|
| `complexity-scan.mjs` | G500 **14** · OVER500 **1576** · MAXLOC **754** (matches δ baseline to the line) + gate born-RED (FAIL@11 / PASS@14) ✓ |
| `domain-edges.mjs` | baseline has **0** `units/color→parsing` edges; `--merge-sim` introduces **5** (the NG-4 discriminator) ✓ |
| `alias-census.mjs` | **377** sites, `@src`=0 in-demo, `@assets`=11 x-bound fork ✓ |
| `placement-census.mjs` | 49K/12A/3F/0O=64, 7 A≠B forks, **α-reproduction PASS** (color bucket 6K/12A/0F) ✓ |
| `panes-carve.mjs` | 16 files, 4/10/1/1, the `<style>`-relative hazard detected ✓ |
| `style-census.mjs` | single-owner=1 / shell=12 / cross-family=2 ✓ |
| `hygiene-census.mjs` | 11 benches (`color-soa-fold` MISS/broken), scripts consumer-cite (fraunces 0-ref) ✓ |
| `plugin-delta.mjs` | `deferGlassFonts` +98.1 KB gz · `sourceExportPlugin` 10 `?source` consumers ✓ |
| `docs-linkgraph.mjs` | 0 stale orphans · 2 litter · 922 records ✓ |

**THE reproducibility residual that survives (honest):** the MEASUREMENT is durable — but the **carve/move
RESULTS are not.** There is **no committed codemod** that reproduces the carved tree (the two "git mv"
strings in the instruments are COMMENTS, verified). So δ's headline **"3 carves → G500 11"**, its
**smoke-green / typecheck-Δ0 on the carved tree**, and ε's **smoke 154-pass on the scattered tree** are
worktree-only assertions the campaign's never-merge law resets away. What IS reproducible: the BASELINE
(G500=14), the gate MECHANISM (born-RED), the α-harness, and β's `--merge-sim`. The DIRECTION ("a carve
reduces G500") is checkable by carving any one file; the SPECIFIC "3 carves → 11" is attested, not
independently re-derivable. This is inherent to a docs+prototype-scoped pass (the prototype never merges) —
not a violation — but it means the pass-4 RUN numbers are one notch weaker than the instrument numbers I
reproduced above. `domain-edges --merge-sim` shows the honest fix (a no-mutation simulator); δ has no
analogous `--carve-sim`.

---

## §4 Surviving gaps — the owner said it; pass-4 does not fully carry it

Enumerated so the tranche plan owns them. These are the load-bearing residuals for the FRESH full-thesis
adversary (the separate pass-4 lane) and for convergence.

1. **Clause 9 — "performance above all" is un-charted.** The owner named "elegance, simplicity, AND
   performance above all" as "both necessary and desirable." The campaign advances elegance + simplicity
   (structure) across all four passes; **no charter improves a single perf number.** δ is behavior-preserving
   by design; the one perf-bearing item (`deferGlassFonts`, ζ) is owner-routed, not delivered; Q14/LCP is
   U.W-PERF's tranche. This is the sharpest surviving owner-verbatim gap — a whole limb of the owner's
   above-all triad with zero carriage.
2. **Clause 12 — the down-metric is ceiling-COMPLIANCE, not total complexity.** δ is scrupulously honest that
   **net LoC ROSE +158** and cyclomatic is carve-invariant. The owner's "grown in file size … dramatically →
   REDUCE" (whole-library) is served in the per-file/locality reading, NOT the net reading; and δ's assertion
   that "the god-modules do not OFFER net-LoC reduction" is unmeasured (no dedup/dead-code scan). A fuller
   clause-12 close would (a) measure whether any god-module carries dead/duplicated code, and (b) state
   plainly that the library's TOTAL size is not reduced — only its worst files' sizes.
3. **The carve/move RUN-results are attested, not reproducible (§3).** Pass-4 closed the MEASUREMENT half of
   NG-2 (9/9 instruments durable, all reproduced) but the MUTATIONS reset away; the specific "3 carves → 11"
   and both smoke-green claims cannot be re-derived from committed artifacts. A `--carve-sim` (δ) mirroring
   `--merge-sim` (β) would close it.
4. **Clause 1 residual — `test/`'s 208 `@src` sites un-ruled.** ε rules `@src`=0 in the demo and calls "212"
   stale, but that count was repo-wide; the `test/` tsconfig-alias sites survive. Defensibly out of the
   `demo/@/` abrogation scope — but a literal "abrogation of `@`" would reach them, and ε's "corrected to 0"
   reframes rather than rules the `test/` surface.
5. **The owner-reserved fork pile GREW.** Pass-4 surfaced OF-ε-1 (`@assets`), OF-ε-2 (panes per-dir),
   NG-6 R1/R2 (the kernel→app-root type inversion) atop OF-1..OF-6. This is HONEST fork-surfacing — but it
   means the plan carries MORE pending owner decisions than pass-3, not fewer; the advanced surface is
   advanced-with-open-forks, not a closed executable (the NG-5 shape, now demo-wide).

**Credits (earned — the campaign's honesty is genuine and pass-4 raised the bar).** δ's objective-honesty is
exemplary: it names the metric as ceiling-compliance, states net LoC ROSE, names the alternative (min-net-LoC)
it does NOT pursue, and rules NG-4 by measurement (β's merge = structure not complexity; `--merge-sim`
reproduces `units/color→parsing` 0→5, which I confirmed). ε states BOTH placement objectives side-by-side and
routes the choice (NG-3 discharged). ζ refuses the owner's "worthless → delete" where it is measurably false
and routes OF-6 with numbers instead of pre-deciding. The nine instruments are committed + I reproduced every
one. This is the discipline the campaign law demands, applied — the surviving gaps are named, not papered.

---

## §5 The earned number — 78%

Owner-verbatim CARRIAGE, clause-weighted (my independent weighting, shown so it is earned not inherited):

- **Strong CARRIED (~82–88%)** — 5 backend · 6 BH/BI · 7 process · 8 library-validations · 10 clean-break ·
  §0.1/§0.2 referent (unchanged from pass-3, still strong).
- **Newly CARRIED via pass-4 (~72–82%)** — 1 demo-manifest (ε) · 3 styles (ε) · 4 long-dirs (δ+ε) · 11
  hygiene (ζ) · 12 complexity (δ, docked to ~72 for the ceiling-vs-total-complexity reading + the
  attested-not-reproducible RUN). These five clauses were 30–35% at pass-3; they are the source of the jump.
- **CARRIED-mostly (~75%)** — 2 recursive colocation (demo-wide table + panes; deep per-component recursion
  is landing-wave).
- **PARTIAL (~60%)** — 9 idiomatic/simplicity/**performance** (simplicity advanced; performance-above-all
  un-charted — the drag).

**78%** is the honest carriage mean (up from 62%). The pass earned every point of the +16: the owner's
un-charted half is now charted with RAN proof-of-method + durable instruments, and the sharpest ask (clause
12) has a real metric that provably goes DOWN. It is NOT 100% because three owner-verbatim gaps survive —
**performance-above-all has no charter, clause-12's reduction is per-file not net, and the mutations are
attested not reproducible** — plus the minor `test/`-`@src` and grown-fork-pile residuals. An
owner-emphasis weighting (clause 12 "grown dramatically", clause 9 "above all", clause 4 "must and always")
would hold roughly here, since 12 and 4 are now strongly carried and only 9 drags; I hold **78%** as the
un-weighted carriage mean.

**Clean-break law: CLEAN** (one disclosed owner-routed residual OF-3; two new disclosed+routed residuals; no
new undisclosed violation). **As a convergence gate this pass is NOT gap-free** — the surviving owner-verbatim
gaps above mean the fresh full-thesis adversary (the separate pass-4 lane) will not enumerate zero; the
two-consecutive-clean-passes clock does not start on this lane's evidence.

---

## §6 Owner-reserved forks — ALL still presented-not-decided (checked over δ/ε/ζ)

The task's special attention: OF-1..OF-6 all still presented-not-decided. **Confirmed — none is decided by
any pass-4 charter, and pass-4 ADDS forks (never pre-rules them):**

- **OF-1** (@-ban idiom) — untouched by δ/ε/ζ; ε's `git mv` abrogation is idiom-agnostic. Presented.
- **OF-2** (api vocabulary) — untouched. Presented.
- **OF-3** (the `{value,diagnostics}` boundary vs embed-warn) — untouched (charter-γ's); still the ONE
  disclosed masking residual (1 class / 2 sites). Presented.
- **OF-4** (app-cluster directory **+ its OBJECTIVE**) — **WIDENED by ε**, decided by NEITHER: ε states both
  objectives + enumerates **7** A≠B fork rows (α surfaced 1), routes the objective to the owner. Presented.
- **OF-5** (the coupled owner event) — untouched; δ/ζ book landing costs against it (doc-canon sweep, gate
  excise/author), nothing merges. Presented.
- **OF-6** (plugins delete-vs-keep) — **ζ presents 3 poles per plugin with MEASURED cost** (`deferGlassFonts`
  +98.1 KB gz / worse LCP; `sourceExportPlugin` 10 pages + golden), decides NONE. Presented.
- **NEW (pass-4, all presented-not-decided):** **OF-ε-1** (`@assets` — keep-alias / literal-relative /
  relocate-corpus), **OF-ε-2** (panes min-move vs per-pane-dir), **NG-6 R1/R2** (hoist the pipeline-return
  type to KERNEL vs ratify the single type-only kernel→app inversion).

**Nothing merged; this lane authored only this audit doc, pathspec `docs/tranches/V/**`. The composed thesis
+ its pass-4 gap-closers are CLEAN on clean-break, CARRIED on all four previously-uncharted clauses (the real
pass-4 advance), and GAPPED on performance-above-all + the net-complexity reading of clause 12 + the
reproducibility of the mutations. Earned 78% carriage (up from 62%).**
