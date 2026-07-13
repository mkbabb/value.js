# V — THE STRUCTURE DESIGN CAMPAIGN (formation-by-convergent-loop)

**Status**: ROUND ZERO (portfolio minting) · opened 2026-07-13, mid-U.W-CLOSE (the owner:
"this should be done alongside our above"). **This document is the campaign state of record**;
the registry (§3) and pass log (§4) update at every pass agglomeration.

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
axis "what structure is DERIVED FROM"; F5/F6 split the execution axis (strangler vs big-bang).

| Family | Design idea (the shared mechanism) | State | Convergence % | Open gaps (pass-1 must establish) |
|---|---|---|---|---|
| **1 · CONSTELLATION-CONFORM** | adopt glass-ui's CODIFIED `STRUCTURE-SPEC` (round-6) + G1–G10 gate battery + RESTRUCTURE prompts as value.js's own standard | OPEN | 0% | which glass-ui gates are library-applicable vs UI-only; is `api/model/lib` better than value.js's `routes/service/repository`; does the SPEC name a "library" profile; lead-or-follow glass-ui's DEFERRED src-execution (leverage vs the atomic-vs-publish hazard it deferred for) |
| **2 · GRAPH-PROJECTION** | the static import DAG computes placement (single-consumer colocates, shared→LCA, cycles banned, 0-reach=dead) | OPEN | 0% | madge/dep-cruiser reliability across the `@`-alias+subpath graph; the true dead-code census (A1 flagged 0-consumer composables); the cycle inventory (src/+demo/); fan-in ranking for god-module carve lines; does graph-count contradict the T3 "≥2 UNRELATED families" rule |
| **3 · FEATURE-CAPSULE** | product-feature vertical capsules with one barrel each + a small named kernel; api is the landed template | OPEN | 0% | the true demo kernel size (composables serving ≥3 UNRELATED features); do the 7 subpaths already partition src cleanly or overlap (color vs parsing); the cross-capsule import-leak census (parsing/color → units/color) |
| **4 · TYPE-ONTOLOGY** | tree mirrors the core type lattice (ValueUnit/Color<T>/combinator); parsing validation = a typed `{ast,diagnostics}` boundary | OPEN | 0% | cost of a `{ast,diagnostics}` public parse API (breaking? 8-key exports churn?); is threading `onParseError` enough or must the return type change; verify which of the 11 kf VJ-classes are ACTUALLY still open; does the lattice imply a materially different `units/` layout |
| **5 · STRANGLER-BY-GATE** | born-RED structural gates (@-ban, barrel-pure, depth, colocation, god-ceiling, grammar-fuzz) drive incremental convergence | OPEN | 0% | can `@`-ban be pure eslint no-restricted-imports (vs glass-ui's "never ESLint" idiom); which gates born-RED today; is strangler reconcilable with "clean break, no dual paths"; the MINIMAL gate set that covers the law without re-growing the overfit thicket |
| **6 · BIG-BANG CODEMOD** | a spec-complete target tree reached per-surface atomically via ts-morph/jscodeshift; clean break, one commit/surface | OPEN | 0% | ts-morph reliability across `@`-alias+subpath+`.vue`+CSS-`@import` specifiers; the exact blast/conflict surface vs concurrent U.W-CLOSE (fence check); is a per-surface atomic commit reviewable or must it be per-feature; can glass-ui's `CODEMOD-SPEC.md` be reused |

## §4 Pass log

| Pass | Workflow run | Outcome |
|---|---|---|
| 0 (portfolio) | round-zero minter (survey + 6 families) | DONE — `design/portfolio.md` authored: Act-1 ground survey (demo/api/src/hygiene) + glass-ui BH/BI CODIFIED-but-partially-executed distillation (corrected) + kf `VJ-*` bug corpus (11 classes); Act-2 six orthogonal families registered §3 all OPEN@0%. Next: pass-1 RESEARCH (≤8 probes, batched 3) against each family's gaps column. |
