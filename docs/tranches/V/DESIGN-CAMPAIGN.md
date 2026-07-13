# V — THE STRUCTURE DESIGN CAMPAIGN (formation-by-convergent-loop)

**Status**: PASS 2 AGGLOMERATED (2026-07-13) · mid-U.W-CLOSE (the owner: "this should be done alongside
our above"). Pass-2 fold (`design/pass-2/AGGLOMERATION.md`): the un-critiqued F3/F4 drew adversaries and
DROPPED (F3 48→40 · F4 44→36); the skeleton RAN as three charters that each scored ABOVE their parts
(A 58 · B 45 · C 54) → **one COMPOSED THESIS emerges as THE candidate (ADVANCED, 50%)**, four families
MERGED into it, two BANKED as substrate/battery, the F4 lattice-mirror shape-half RETIRED. Material advance:
the RED-baseline blocker that capped every pass-1 D1 claim is DISSOLVED (goo-blob→blob swap) — the general
colocation now RUNS green. Next: pass-3 (the protocol's minimum-third pass — α placement-manifest · β
merge-re-run · γ lossy-accounting + a fresh full adversary). **This document is the campaign state of
record**; the registry (§3) and pass log (§4) update at every pass agglomeration.

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
axis "what structure is DERIVED FROM"; F5/F6 split the execution axis (strangler vs big-bang). **Pass-2
fold (`design/pass-2/AGGLOMERATION.md`)**: the un-critiqued F3/F4 drew adversaries and DROPPED (retro
override: F3 48→**40**, F4 44→**36**); the pass-1 skeleton RAN as three CHARTERS that each scored ABOVE
their constituent families (A 58 · B 45 · C 54) → **one COMPOSED THESIS is now THE candidate** (ADVANCED,
50%). Four families MERGED into the charters (F1/F3/F6 + F4's D3 dimension); two BANKED as substrate/battery
(F2/F5); the F4 lattice-mirror SHAPE-half RETIRED (self-refuted). Convergence % are the critics' earned
numbers throughout; the retro F3/F4 numbers OVERRIDE the pass-1 un-adversaried scores. States/% are never
inflated. **States**: ADVANCED (live candidate) · BANKED (folds in as substrate/support) · MERGED
(subsumed into a composition) · RETIRED (dead) · BLOCKED (none fire).

| Row | Design idea / composition | State | Conv % | Pass-2 disposition + pass-3 questions |
|---|---|---|---|---|
| **1 · CONSTELLATION-CONFORM** | glass-ui's CODIFIED `STRUCTURE-SPEC` (round-6) + G1–G10 battery as value.js's law | **MERGED** → Charter A | **45%** | The mandated (§0.2) LAW half, fused into the WHAT-tree; referent-instability recovered + mitigated (barrel-pure is a runtime property). No new adversary — 45 stands |
| **2 · GRAPH-PROJECTION** | the static import DAG computes placement (single-consumer colocates, shared→LCA, cycles banned) | **BANKED** → Charter B | **40%** | Thesis still self-refuted; INSTRUMENT now WIRED + VALIDATED (scanner disarmed its own `ComponentSliders` false-positive; order-independent registry BUILT + RUN, color-SCC 2 FAIL→0). Preconditions discharged |
| **3 · FEATURE-CAPSULE** | product-feature vertical capsules with one barrel each + a small named kernel; api is the landed template | **MERGED** → Charter A | **40%** | retro-f3 override: D1 premium did NOT survive (one RAN move = helper-colocation of a KERNEL; general map refuted by the consumer set). Survives: api ratify + src leak-kill. The WHAT-tree PLACEMENT half |
| **4 · TYPE-ONTOLOGY** | tree mirrors the type lattice; parsing validation = a typed `{value,diagnostics}` boundary | **MERGED** → Charter C | **36%** | retro-f4 override: lattice-mirror SHAPE thesis RETIRED (self-refuted to F1's one carve, 0 executed by F4). Survives as the owner-mandated D3 DIMENSION (corpus + `grammar-fuzz` + `#11` at true MAJOR cost + diagnostics) |
| **5 · STRANGLER-BY-GATE** | born-RED structural gates drive incremental convergence | **BANKED** → Charter C | **42%** | Execution pole → F6; enforcement battery authored+corrected (10→7, Q13 floor + `barrel-pure` derived + `grammar-fuzz`; META-gate dropped). A supporting LAYER, not a family |
| **6 · BIG-BANG CODEMOD** | a spec-complete target tree reached per-surface atomically; clean break, one commit/surface | **MERGED** → Charter B | **37%** | The atomic VEHICLE, now proven on the per-file SCATTER (not just the rename) + a src carve (three/four green gates). Fused into the execution half |
| **⟐ Charter A — the WHAT-tree (F1 ∘ F3)** | glass-ui's LAW operated by F3's placement predicate | **ADVANCED — LEAD** | **58%** | The pass's MATERIAL ADVANCE (general colocation RAN green; retro-f3 G4 dissolved). Capped: placement DESIGN proven to RESOLVE not to be CORRECT — flagship "17/1" flawed, §1.3 false-on-disk, CC-5 un-validated, merge un-re-run. Pass-3 Charter α |
| **⟐ Charter B — execution vehicle (F6 + F2 substrate)** | the atomic codemod + the wired/validated measurement substrate | **ADVANCED** | **45%** | Best-RUN of the batch (5/5, NO claim falsified on disk). Capped: convergence HEADLINE overstated — "18/0" a flat-predicate artifact, 5-file cross-lane destination divergence. Pass-3 Charter α/β |
| **⟐ Charter C — D3 dimension + battery (F4 + F5)** | the typed diagnostics + the corrected enforcement battery | **ADVANCED** | **54%** | Closes retro-f4's two dominant drags (`#11` re-cost EXACT, memoize split Axis-A/B). Capped: item-2 lossy leg soft — U-F29 uncredited, permissive-string un-measured, "one spec-forced site" unproven. Pass-3 Charter γ |
| **⇒ THE COMPOSED THESIS (A × B × C)** | F1-law ∘ F3-placement × F6-vehicle+F2-substrate × F4-dimension+F5-battery | **ADVANCED — THE CANDIDATE** | **50%** | All three legs RUN green; no competing shape. Capped by the un-ratified placement table (28% cross-lane destination divergence), the un-re-run merge, the un-validated CC-5. A demonstrable pass-3 from convergence |

## §4 Pass log

| Pass | Workflow run | Outcome |
|---|---|---|
| 0 (portfolio) | round-zero minter (survey + 6 families) | DONE — `design/portfolio.md` authored: Act-1 ground survey (demo/api/src/hygiene) + glass-ui BH/BI CODIFIED-but-partially-executed distillation (corrected) + kf `VJ-*` bug corpus (11 classes); Act-2 six orthogonal families registered §3 all OPEN@0%. Next: pass-1 RESEARCH (≤8 probes, batched 3) against each family's gaps column. |
| 1 (RESEARCH→SYNTH→PROTO→CRITIQUE→AGGLOMERATE) | pass-1 fleet (6 specs · 6 protos · 4 critiques · 8 research) → agglomerator | DONE — `design/pass-1/AGGLOMERATION.md`. **6 families → 4 ADVANCED (F1 45 · F3 48 · F4 44 · F6 37) + 2 BANKED (F2 40 → F3+F5-battery · F5 42 → F6+D3-gates)**; 0 retired/blocked/merged. Convergent skeleton: **F1(law)∘F3(placement) × F6 execution × banked-F5 battery(corrected 10→7)+F4's 2 D3 gates × banked-F2 substrate × F4 diagnostics dimension**. Spine facts: the `units/index.ts` barrel-carve (4 derivations), api=verify-but-OWNER-FORK, the color mass (one carve, runtime-init unbuilt), CC-5 closed by F3's consumer-census, D1 executed by F3 ALONE, 2/11 VJ bugs open. Agglomerator-verified: `test:dist`=10 gates (Q13 floor 5 → corrected arithmetic 10→7); barrel-purity is a runtime property, RED set `{parsing,units,quantize}` not the spec's stale `{src/index.ts,parsing,units}`. Owner-forks routed OUT (@-ban idiom · api vocab). **Coverage debt: F3/F4 un-critiqued → pass-2 opens with an adversarial pass on both.** Next: pass-2 against Charters A/B/C. |
| 2 (2 RETROS + 3 CHARTERS + 3 CRITIQUES → AGGLOMERATE) | pass-2 fleet (retro-f3 · retro-f4 · charter-a/b/c · critique-a/b/c) → agglomerator | DONE — `design/pass-2/AGGLOMERATION.md`. **The un-adversaried discount was measured: F3 48→40 (D1 premium did not survive — one RAN move = kernel-helper colocation, general map refuted by the consumer set) · F4 44→36 (lattice-mirror SHAPE thesis RETIRED; `#11` "0 callers" FALSE on disk = a kf-coupled 2.0.0 MAJOR).** The skeleton RAN as 3 charters, each ABOVE its parts: **A 58 (F1∘F3, general colocation RAN GREEN — the RED-baseline blocker DISSOLVED via goo-blob→blob) · B 45 (F6 scatter + `units/index.ts` carve + the order-independent registry, color-SCC 2 FAIL→0) · C 54 (diagnostics split Axis-A/B owner-law-clean + battery 10→7 + `#11` re-cost)**. Fold: **1 COMPOSED THESIS (ADVANCED, 50%, THE candidate) · 4 MERGED (F1/F3/F6 + F4-dimension) · 2 BANKED (F2 substrate-now-validated / F5 battery) · F4 shape-half RETIRED**. Load-bearing DISAGREEMENT: the two lanes place 5/18 destinations differently (2 reversals) — direction settled, exact table un-ratified. Owner-fork register (§4 of AGGLOMERATION): 5 forks + 1 booked-not-forked (`#11` MAJOR). **Next: pass-3 (minimum-third pass) — α placement-manifest · β merge-re-run · γ lossy-accounting + a FRESH FULL ADVERSARY → two consecutive clean passes for convergence.** |
