# V — THE STRUCTURE DESIGN CAMPAIGN (formation-by-convergent-loop)

**Status**: PASS 1 AGGLOMERATED (2026-07-13) · mid-U.W-CLOSE (the owner: "this should be done alongside
our above"). Fold: 6 families → 4 ADVANCED + 2 BANKED; convergent skeleton named (§3 / §4 / `design/pass-1/
AGGLOMERATION.md`). Next: pass-2 against Charters A/B/C (opening with an adversarial pass on the
un-critiqued F3/F4). **This document is the campaign state of record**; the registry (§3) and pass log (§4)
update at every pass agglomeration.

## §0 The owner's verbatim (2026-07-13 — WINS over every encoding below)

> Ecoute-moi and mark me: what of our grand component restructuring, and flattening, alongside
> abrogation of "@" and a simplification of the module and directory structure of our demo,
> that's been exhorted for the last 5+ tranches?
>
> Further, our frontend structure--and this is a grand edict for ALL file directories--needs to
> be wildly re-structured: components should be COLOCATED with their sub-components, composables,
> skeletons, constants, etc (and this should be done recursively for nested components).
>
> Composables that are truly module-level or global-level—and other dirs of that nature—can be
> found within a composables/ dir therein, but otherwise they're to be COLOCATED--same for
> styles, etc.
>
> Long running dirs must and always be broken into common modules and encapsulated thereof.
>
> Similar treatment and enforcement should be applied to all backend files, too—though
> abstracted and made befitting for those languages and implementations.
>
> Read over the glass-ui tranches BH, BI, and that planned module/directory structure and
> codification thereof for frontend and backend modules/components, etc.
>
> Deploy a fastidious, convergent and iterative, design triumvariate of research, harden,
> tranche wave update and author.
>
> These edicts must apply to our backend library, too, alongside parsing validations and the
> like--note and analyze the most recent keyframes.js tranches, too, which found marked
> parseCSSValue buggies and goblins.
>
> - NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development
>   product; architectural transpositions in the sake of elegance, simplicity, and performance
>   above all are both necessary and desirable.
> - NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths, no masking
>   fallbacks.
>
> Further, our base repo is a mess, with a littering of top-level screenshots, many stale
> working trees, docs, most of our benches are out of date and spec, our plugins are worthless
> and to be deleted entirely. Most of our scripts are pointless, bar dev and deploy.sh--the
> vast majority of our "gates" are overfit nonsense.
>
> Our library has grown in file size and complexity dramatically--what are calls, ways,
> facilities, to REDUCE complexity, better structure directories, modules, files.

(+ the full convergent-multiagent-design-loop protocol: round-zero portfolio → passes of
RESEARCH[≤8, batched 3] → SYNTHESIZE → PROTOTYPE → CRITIQUE → AGGLOMERATE → registry fold;
≥3 full passes before convergence; 100% = zero enumerated gaps + fresh non-author adversarial
audit + two consecutive clean passes; then the tranche plan + wave sets with born-RED gates,
π obligations, and a disposition per banked route. Fable mints/orchestrates; opus/sonnet
implement; every spawn declares its model.)

**§0.1 Owner clarification (2026-07-13, same sitting)**: glass-ui codified a template/
best-practice set for structuring frontend components — `@` abrogated, components flattened
with improved colocation. **§0.2 Survey correction (same day, verified on disk)**: the
convention is CODIFIED + AUTHORITATIVE but PARTIALLY EXECUTED upstream — their demo/
restructure LANDED at 5.0.0 (shell/chassis/stories shape); their src/ flatten + export
de-indirection (kill subpaths/, api/, the 7 flat barrels → 91 flat component peers) ride
their BI as 5.1.0, NOT yet landed; `@glass` was a transitional ALIAS (719-rewrite codemod),
superseded by pure-relative + the `proof:no-glass-in-dist` dist-lock — never a physical dir.
Spec of record: `../glass-ui/docs/tranches/BH/spec-structure/STRUCTURE-TRANCHE-PLAN.md` +
`STRUCTURE-SPEC.md` (round-6 flatten override) + the T4 earned-dir rule + colocate-iff-
single-owner styles + generated fail-CLOSED exports + born-RED structural gates G1–G10
(never ESLint) + the 500-raw-line ceiling. **The portfolio's constellation-alignment family
adopts the CONVENTION now** (adoptable without waiting on upstream execution), naming both
poles of the partially-unexecuted-referent risk; every other family states its divergence
against this real referent.

## §1 The design problem (the four surfaces + the cross-cut)

- **D1 — demo/ frontend restructure**: flatten; ABROGATE `@` (the `demo/@/` tree + its
  aliases); recursive component colocation (sub-components, composables, skeletons, constants,
  styles WITH their component); truly module-/global-level composables in a `composables/` dir
  at that level; long dirs broken into encapsulated common modules.
- **D2 — api/ backend**: the same edict abstracted befitting Hono/Mongo/TypeScript service
  structure.
- **D3 — src/ library**: complexity REDUCTION (calls/ways/facilities), directory/module/file
  structure, parsing validations; input: the recent keyframes.js tranches' parseCSSValue
  bug findings.
- **D4 — repo hygiene**: top-level screenshot litter · stale worktrees · stale docs · benches
  out of date/spec · plugins DELETED entirely · scripts pruned (dev + deploy.sh survive on
  their own merit) · the overfit gate set culled.
- **Cross-cut**: the glass-ui BH/BI planned module/directory codification (read, align,
  constellation-level convention); clean breaks everywhere (no aliases/shims/dual paths).

## §2 Fences

- U.W-CLOSE runs concurrently; the campaign NEVER edits execution-tranche surfaces mid-close.
  Campaign passes are docs- and prototype-scoped (prototypes in scratch worktrees, spec-only
  where not run).
- Sibling trees READ-ONLY. Batches ≤3 concurrent agents. Pathspec commits + the session
  trailer. Owner-reserved decisions stay owner-reserved.
- Prototypes: either RUNS (with measured numbers) or marked spec-only. No status-report
  returns; concrete artifacts only.

## §3 The approach-family registry (updated per pass)

Full survey + reasoning: `design/portfolio.md`. Six orthogonal families minted at Round Zero — primary
axis "what structure is DERIVED FROM"; F5/F6 split the execution axis (strangler vs big-bang). **Pass-1
fold (`design/pass-1/AGGLOMERATION.md`)**: 6 families → **4 ADVANCED + 2 BANKED**; convergent skeleton =
**F1(law)∘F3(placement) shape × F6 execution × banked-F5 battery + F4's D3 gates × banked-F2 substrate ×
F4 diagnostics dimension**. Convergence % are the critics' earned numbers (F1 45 · F2 40 · F5 42 · F6 37);
F3/F4 carried NO critic — scored by the agglomerator from RAN evidence with an un-adversaried discount,
flagged for a pass-2 adversarial pass. States/% are never inflated.

| Family | Design idea (the shared mechanism) | State | Convergence % | Pass-1 disposition + pass-2 questions |
|---|---|---|---|---|
| **1 · CONSTELLATION-CONFORM** | adopt glass-ui's CODIFIED `STRUCTURE-SPEC` (round-6) + G1–G10 gate battery + RESTRUCTURE prompts as value.js's own standard | **ADVANCED** | **45%** | The mandated (§0.2) WHAT-tree LAW half — fuses with F3 (Charter A). D3 barrel-carve PROVEN, D2 GREEN, D4 decidable; D1 un-prototyped (CC-5 now closed by F3). Pass-2: RUN general demo colocation; ASSERT the atomic clean-break cut (no transitional `@`-window); surface the api vocab as an OWNER-FORK not a ratify; recover the 2 undocumented glass-ui divergences + referent-stability |
| **2 · GRAPH-PROJECTION** | the static import DAG computes placement (single-consumer colocates, shared→LCA, cycles banned, 0-reach=dead) | **BANKED** | **40%** | Central thesis (computed placement, not human decree) SELF-REFUTED → not a shape. Its instrument (deterministic runtime-vs-type-edge scanner, union-entry dead-code, runtime-edge `barrel-cycle`, fan-in ranking) folds into F3 (placement) + the F5 battery (Charter B). 3 preconditions ride forward: validate the `@`-alias demo scanner (a live control was flagged dead); co-design the order-independent registry for the color-SCC runtime failure; RUN the colocation engine on demo |
| **3 · FEATURE-CAPSULE** | product-feature vertical capsules with one barrel each + a small named kernel; api is the landed template | **ADVANCED** | **48%** | The WHAT-tree PLACEMENT/execution half + the ONLY family to RUN D1 (palette capsule, 0 regression) + the src color merge (subpath-budget GREEN 11/11) + supplies the CC-5 consumer-census predicate F1/F2/F5 need. Capped: demo win is best-case (pre-sealed); doesn't own cycle severance; src atom is DOMAIN not feature; un-adversaried. Pass-2: general `composables/color/` colocation + the src domain-capsule set (Charter A) |
| **4 · TYPE-ONTOLOGY** | tree mirrors the core type lattice (ValueUnit/Color<T>/combinator); parsing validation = a typed `{ast,diagnostics}` boundary | **ADVANCED** | **44%** | The owner-mandated D3 typed-diagnostics/validation DIMENSION (composes onto the shape, not a layout mechanism). All 5 obligations RAN; proto REFUTED its own spec (sink is a DEAD channel; memoize forces embedded-return). Exactly 2/11 VJ bugs OPEN (#9/#11). Capped: single-surface; diagnostics fork has no free option; lossy-success closed on 1 path; un-adversaried. Pass-2: resolve the fork, close remaining lossy classes, land the 2 D3 gates (Charter C) |
| **5 · STRANGLER-BY-GATE** | born-RED structural gates (@-ban, barrel-pure, depth, colocation, god-ceiling, grammar-fuzz) drive incremental convergence | **BANKED** | **42%** | Execution pole → F6 (reconciled to clean-break, strangler IS F6). Enforcement battery → the shape charter + F4's D3 gates (Charter C), CORRECTED: REPLACE arithmetic is 10→**7** (cull to the Q13 floor of 5 + `barrel-pure` + `grammar-fuzz`), not "flat at 10"; DROP the META-gate; `barrel-pure` is a runtime-purity property gate-derived per run, not a hardcoded set. The `@`-ban eslint-vs-`proof:*` fork → OWNER (breaks F1's never-ESLint law) |
| **6 · BIG-BANG CODEMOD** | a spec-complete target tree reached per-surface atomically via ts-morph/jscodeshift; clean break, one commit/surface | **ADVANCED** | **37%** | The atomic execution VEHICLE (absorbs F5's execution pole). Two-gate discipline PROVEN (`audit SAFE:true ∧ oracle delta==0`); `ts-morph`-wrong-tool verified (67% of `@`-blast in `.vue`). Critic's BLOCK LIFTED — F3 supplies the target tree. Capped: demonstrated a RENAME (buckets preserved) not the per-file SCATTER; RAN 1 of 4 surfaces. Pass-2: RUN the per-file scatter + a src carve + a pre-ratified destination manifest (Charter B) |

## §4 Pass log

| Pass | Workflow run | Outcome |
|---|---|---|
| 0 (portfolio) | round-zero minter (survey + 6 families) | DONE — `design/portfolio.md` authored: Act-1 ground survey (demo/api/src/hygiene) + glass-ui BH/BI CODIFIED-but-partially-executed distillation (corrected) + kf `VJ-*` bug corpus (11 classes); Act-2 six orthogonal families registered §3 all OPEN@0%. Next: pass-1 RESEARCH (≤8 probes, batched 3) against each family's gaps column. |
| 1 (RESEARCH→SYNTH→PROTO→CRITIQUE→AGGLOMERATE) | pass-1 fleet (6 specs · 6 protos · 4 critiques · 8 research) → agglomerator | DONE — `design/pass-1/AGGLOMERATION.md`. **6 families → 4 ADVANCED (F1 45 · F3 48 · F4 44 · F6 37) + 2 BANKED (F2 40 → F3+F5-battery · F5 42 → F6+D3-gates)**; 0 retired/blocked/merged. Convergent skeleton: **F1(law)∘F3(placement) × F6 execution × banked-F5 battery(corrected 10→7)+F4's 2 D3 gates × banked-F2 substrate × F4 diagnostics dimension**. Spine facts: the `units/index.ts` barrel-carve (4 derivations), api=verify-but-OWNER-FORK, the color mass (one carve, runtime-init unbuilt), CC-5 closed by F3's consumer-census, D1 executed by F3 ALONE, 2/11 VJ bugs open. Agglomerator-verified: `test:dist`=10 gates (Q13 floor 5 → corrected arithmetic 10→7); barrel-purity is a runtime property, RED set `{parsing,units,quantize}` not the spec's stale `{src/index.ts,parsing,units}`. Owner-forks routed OUT (@-ban idiom · api vocab). **Coverage debt: F3/F4 un-critiqued → pass-2 opens with an adversarial pass on both.** Next: pass-2 against Charters A/B/C. |
