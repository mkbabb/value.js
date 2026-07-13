# V — THE STRUCTURE DESIGN CAMPAIGN (formation-by-convergent-loop)

**Status**: PASS 3 AGGLOMERATED — RE-FOLDED over BOTH audits (2026-07-13) · mid-U.W-CLOSE (the owner: "this
should be done alongside our above"). Pass-3 fold (`design/pass-3/AGGLOMERATION.md`, `d2bf5e1`): the three
charters CLOSED their pass-2 caps with first-hand HEAD measurement — **α** ratified the placement to an 18/0
manifest (CC-5 harness 3/3 reproduced by the adversary, scatter RUN green 182/1) · **β** re-ran the src color
merge on HEAD (15-vs-11 dissolved to a deterministic 13, acyclicity-rides-registry demonstrated not inferred)
· **γ** closed the lossy accounting (U-F29 credited, friction #1 RETRACTED as non-lossy, the sweep found a 2nd
spec-forced site; the adversary CLOSED γ's §7 handoff — no 3rd drop-site). The cross-lane convergence TAX is
discharged. **BOTH required fresh non-author adversaries RAN in pass-3**: the owner-verbatim / clean-break lens
(**CLEAN on clean-break, 62% carriage**) AND the FULL-THESIS convergence adversary (**NOT clean, 60%
convergence**, Group-B NG-1..NG-7). The composed thesis rises **50% → 60%** (the full-thesis adversary's
un-inflated number; 62% was the owner-verbatim carriage ceiling, docked 2 for reproducibility + design-proxy
overstatements the clause-lens could not see). **Gaps survive on TWO axes** — Group A (the un-charted owner
half: clause 12 library-complexity-REDUCTION [14 god-modules > 500 LoC, the sharpest], clause 4 long-dirs,
clause 3 styles, clause 11 D4-hygiene, clause 1 demo-wide manifest) + Group B (NG-1/NG-2 the uniqueness proof
+ 8-of-9 pass-3 instruments are NOT reproducible; NG-3 min-edge is a chosen objective dressed as measurement;
NG-4 β's merge re-couples and does not serve clause 12; NG-5 the advanced half is not a closed plan; NG-6 the
scatter introduces a kernel→app-root inversion). **→ pass-3 is NOT the clean pass** (the two-clean-pass clock
is 0 of 2). Next: pass-4 gap-closers — **δ** complexity-reduction (+ reconcile NG-4) · **ε** long-dirs+styles+
demo-wide-manifest (+ NG-6 inversion + NG-3 objective) · **ζ** hygiene — + the **reproducibility obligation**
(embed the β/γ instruments, NG-1/NG-2) + a FRESH full-thesis adversary over the expanded surface. **This
document is the campaign state of record**; the registry (§3) and pass log (§4) update at every pass
agglomeration.

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
axis "what structure is DERIVED FROM"; F5/F6 split the execution axis (strangler vs big-bang). **Pass-3
fold (`design/pass-3/AGGLOMERATION.md`, re-folded over BOTH audits)**: the three charters CLOSED their pass-2
caps (α 58→**68** · β 45→**62** · γ 54→**68**) — the placement is a RATIFIED 18/0 manifest, the merge is
re-run on HEAD, the lossy leg is load-bearing — and the cross-lane convergence TAX is discharged. **BOTH
required fresh non-author adversaries RAN in pass-3**: owner-verbatim (CLEAN on clean-break, 62% carriage) +
full-thesis (NOT clean, **60% convergence**, Group-B NG-1..NG-7). → **the COMPOSED THESIS rises 50→60%** (the
full-thesis adversary's un-inflated convergence number, never inflated above it; the owner-verbatim 62% is the
carriage ceiling, docked 2 for the reproducibility + design-proxy overstatements the clause-lens could not
see). The thesis is RE-CAPPED at 60% by Group A (the four un-charted owner clauses 12/4/3/11 + the deferred
demo-wide manifest, clause 1) + Group B (NG-1/NG-2 uniqueness + 8-of-9 instruments non-reproducible; NG-3
min-edge-as-measurement; NG-4 β re-couples ≠ clause 12; NG-5 advanced-half-not-a-closed-plan; NG-6
kernel-inversion) — now FOUR OPEN rows with named pass-4 closers (δ/ε/ζ + the reproducibility obligation).
**Pass-2 rows retained** for the families: F3 48→40, F4 44→36 (retro overrides); the F4 lattice-mirror
SHAPE-half RETIRED. Convergence % are the critics'/auditor's earned numbers throughout; States/% are never
inflated. **States**: ADVANCED (live candidate) · BANKED (substrate/support) · MERGED (subsumed) · OPEN
(enumerated, un-charted — the pass-4 surface) · RETIRED (dead) · BLOCKED (none fire).

| Row | Design idea / composition | State | Conv % | Pass-2 disposition + pass-3 questions |
|---|---|---|---|---|
| **1 · CONSTELLATION-CONFORM** | glass-ui's CODIFIED `STRUCTURE-SPEC` (round-6) + G1–G10 battery as value.js's law | **MERGED** → Charter A | **45%** | The mandated (§0.2) LAW half, fused into the WHAT-tree; referent-instability recovered + mitigated (barrel-pure is a runtime property). No new adversary — 45 stands |
| **2 · GRAPH-PROJECTION** | the static import DAG computes placement (single-consumer colocates, shared→LCA, cycles banned) | **BANKED** → Charter B | **40%** | Thesis still self-refuted; INSTRUMENT now WIRED + VALIDATED (scanner disarmed its own `ComponentSliders` false-positive; order-independent registry BUILT + RUN, color-SCC 2 FAIL→0). Preconditions discharged |
| **3 · FEATURE-CAPSULE** | product-feature vertical capsules with one barrel each + a small named kernel; api is the landed template | **MERGED** → Charter A | **40%** | retro-f3 override: D1 premium did NOT survive (one RAN move = helper-colocation of a KERNEL; general map refuted by the consumer set). Survives: api ratify + src leak-kill. The WHAT-tree PLACEMENT half |
| **4 · TYPE-ONTOLOGY** | tree mirrors the type lattice; parsing validation = a typed `{value,diagnostics}` boundary | **MERGED** → Charter C | **36%** | retro-f4 override: lattice-mirror SHAPE thesis RETIRED (self-refuted to F1's one carve, 0 executed by F4). Survives as the owner-mandated D3 DIMENSION (corpus + `grammar-fuzz` + `#11` at true MAJOR cost + diagnostics) |
| **5 · STRANGLER-BY-GATE** | born-RED structural gates drive incremental convergence | **BANKED** → Charter C | **42%** | Execution pole → F6; enforcement battery authored+corrected (10→7, Q13 floor + `barrel-pure` derived + `grammar-fuzz`; META-gate dropped). A supporting LAYER, not a family |
| **6 · BIG-BANG CODEMOD** | a spec-complete target tree reached per-surface atomically; clean break, one commit/surface | **MERGED** → Charter B | **37%** | The atomic VEHICLE, now proven on the per-file SCATTER (not just the rename) + a src carve (three/four green gates). Fused into the execution half |
| **⟐ Charter A — the WHAT-tree (F1 ∘ F3)** | glass-ui's LAW operated by F3's placement predicate | **ADVANCED — LEAD** | **68%** | pass-3 α CLOSED the dominant cap: RATIFIED **18/0** manifest (`generate-color`/`ink-walk` reversals decided; charter-a's "17/1" RETIRED), CC-5 harness 3/3 (reproduced by the adversary), scatter RUN green (typecheck Δ0 · build 0 · smoke 182/1). Capped by SCOPE (one bucket → pass-4 ε) + NG-1 (the "unique" is NOT reproducible — counterfactual gone) + NG-3 (min-edge is a chosen objective) |
| **⟐ Charter B — execution vehicle (F6 + F2 substrate)** | the atomic codemod + the wired/validated measurement substrate | **ADVANCED** | **62%** | pass-3 β re-ran the merge on HEAD: 15-vs-11 dissolved to a deterministic **13** (adversary reproduced); acyclicity-rides-registry DEMONSTRATED not inferred (2 FAIL→0, barrel SCC 14→5). Capped by the honest correction (15 test + canon doc; 5-file leaf-SCC residual) + NG-4 (5 NEW capsule→kernel edges; serves "better structure" not "reduce complexity") + NG-2 (not re-runnable) |
| **⟐ Charter C — D3 dimension + battery (F4 + F5)** | the typed diagnostics + the corrected enforcement battery | **ADVANCED** | **68%** | pass-3 γ closed all three soft-leg gaps: U-F29 credited (idiom twice-ratified in-tree), friction #1 RETRACTED (permissive-string NON-lossy), sweep found the 2nd spec-forced drop site — and the adversary CLOSED γ's §7 handoff (no 3rd drop-site). OF-3 widens 1 site → 1 class / 2 sites. The D3 leg is load-bearing |
| **⇒ THE COMPOSED THESIS (A × B × C)** | F1-law ∘ F3-placement × F6-vehicle+F2-substrate × F4-dimension+F5-battery | **ADVANCED — THE CANDIDATE** | **60%** | pass-3: three legs hardened + the cross-lane TAX discharged. BOTH adversaries ran; RE-CAPPED at the full-thesis adversary's un-inflated **60%** convergence (owner-verbatim carriage was 62%) by Group A (four un-charted clauses) + Group B (NG-1/2 reproducibility, NG-3 objective-as-measurement, NG-5 not-a-closed-plan). The remaining 40% is ENUMERATED with named δ/ε/ζ + reproducibility closers. Clock 0 of 2 |
| **⊕ clause 12 — LIBRARY COMPLEXITY REDUCTION** | god-module carve set + a metric that goes DOWN | **OPEN → pass-4 δ** | — | the owner's sharpest, most-emphatic ask, un-charted: 14 src files > 500 LoC (`color.ts` 754, `scroll-timeline.ts` 658, `parsing/index.ts` 644, `stylesheet.ts` 643, …). Every RAN library move is behavior-preserving re-structure. δ must also reconcile NG-4 (β re-couples, ≠ reduction) |
| **⊕ clause 4/3/1 — long-dirs + styles + demo-wide manifest** | `panes/` carve · `style.css` cohesion · per-dir flatten across all 6 `demo/@/` | **OPEN → pass-4 ε** | — | `panes/` 2009 LoC · `style.css` 55 KB · the ~351-site @-abrogation (`@components` 162 · `@lib` 87 · `@composables` 95 · `@utils` 7) beyond the one validated bucket; `@src` (212)/`@assets` (11) un-ruled. ε also resolves NG-6 (kernel→app-root inversion) + states NG-3's objective |
| **⊕ clause 11 — D4 hygiene (minus the gate-cull)** | PNGs · worktrees · benches · scripts · docs · plugins | **OPEN → pass-4 ζ** | — | 39 root PNGs · 14 worktrees · 11 benches · scripts-prune · stale docs · the plugins disposition (OF-6 — owner said "delete", both auditors measured them LIVE + wired @ `vite.config.ts:178/302/314`) |
| **⊕ Group-B — reproducibility + objective-honesty (NG-1/2/3)** | embed the β/γ instruments · state the census objective | **OPEN → pass-4 gate obligation** | — | 1 re-runnable instrument of 9: apply α's durable-harness discipline to the β/γ instruments (embed `counterfactual.mjs`, or downgrade "unique" → "zero-edge under the stated objective"); every pass-4 instrument embeds its harness at authoring time |

## §4 Pass log

| Pass | Workflow run | Outcome |
|---|---|---|
| 0 (portfolio) | round-zero minter (survey + 6 families) | DONE — `design/portfolio.md` authored: Act-1 ground survey (demo/api/src/hygiene) + glass-ui BH/BI CODIFIED-but-partially-executed distillation (corrected) + kf `VJ-*` bug corpus (11 classes); Act-2 six orthogonal families registered §3 all OPEN@0%. Next: pass-1 RESEARCH (≤8 probes, batched 3) against each family's gaps column. |
| 1 (RESEARCH→SYNTH→PROTO→CRITIQUE→AGGLOMERATE) | pass-1 fleet (6 specs · 6 protos · 4 critiques · 8 research) → agglomerator | DONE — `design/pass-1/AGGLOMERATION.md`. **6 families → 4 ADVANCED (F1 45 · F3 48 · F4 44 · F6 37) + 2 BANKED (F2 40 → F3+F5-battery · F5 42 → F6+D3-gates)**; 0 retired/blocked/merged. Convergent skeleton: **F1(law)∘F3(placement) × F6 execution × banked-F5 battery(corrected 10→7)+F4's 2 D3 gates × banked-F2 substrate × F4 diagnostics dimension**. Spine facts: the `units/index.ts` barrel-carve (4 derivations), api=verify-but-OWNER-FORK, the color mass (one carve, runtime-init unbuilt), CC-5 closed by F3's consumer-census, D1 executed by F3 ALONE, 2/11 VJ bugs open. Agglomerator-verified: `test:dist`=10 gates (Q13 floor 5 → corrected arithmetic 10→7); barrel-purity is a runtime property, RED set `{parsing,units,quantize}` not the spec's stale `{src/index.ts,parsing,units}`. Owner-forks routed OUT (@-ban idiom · api vocab). **Coverage debt: F3/F4 un-critiqued → pass-2 opens with an adversarial pass on both.** Next: pass-2 against Charters A/B/C. |
| 2 (2 RETROS + 3 CHARTERS + 3 CRITIQUES → AGGLOMERATE) | pass-2 fleet (retro-f3 · retro-f4 · charter-a/b/c · critique-a/b/c) → agglomerator | DONE — `design/pass-2/AGGLOMERATION.md`. **The un-adversaried discount was measured: F3 48→40 (D1 premium did not survive — one RAN move = kernel-helper colocation, general map refuted by the consumer set) · F4 44→36 (lattice-mirror SHAPE thesis RETIRED; `#11` "0 callers" FALSE on disk = a kf-coupled 2.0.0 MAJOR).** The skeleton RAN as 3 charters, each ABOVE its parts: **A 58 (F1∘F3, general colocation RAN GREEN — the RED-baseline blocker DISSOLVED via goo-blob→blob) · B 45 (F6 scatter + `units/index.ts` carve + the order-independent registry, color-SCC 2 FAIL→0) · C 54 (diagnostics split Axis-A/B owner-law-clean + battery 10→7 + `#11` re-cost)**. Fold: **1 COMPOSED THESIS (ADVANCED, 50%, THE candidate) · 4 MERGED (F1/F3/F6 + F4-dimension) · 2 BANKED (F2 substrate-now-validated / F5 battery) · F4 shape-half RETIRED**. Load-bearing DISAGREEMENT: the two lanes place 5/18 destinations differently (2 reversals) — direction settled, exact table un-ratified. Owner-fork register (§4 of AGGLOMERATION): 5 forks + 1 booked-not-forked (`#11` MAJOR). **Next: pass-3 (minimum-third pass) — α placement-manifest · β merge-re-run · γ lossy-accounting + a FRESH FULL ADVERSARY → two consecutive clean passes for convergence.** |
| 3 (3 CHARTERS + 2 FRESH AUDITS → AGGLOMERATE, RE-FOLDED) | pass-3 fleet (charter-α/β/γ · owner-verbatim/clean-break audit · full-thesis convergence adversary) → agglomerator | DONE — `design/pass-3/AGGLOMERATION.md` (`d2bf5e1`, re-folded over BOTH audits, superseding the single-audit fold `2d7b299`). **The three charters CLOSED their pass-2 caps with first-hand HEAD (`07bf61d`) measurement: α (58→68) reconciled the 5-file divergence into a RATIFIED 18/0 manifest (ratified=0 / charter-a=1 / charter-b=7 manufactured runtime edges), CC-5 harness 3/3 (reproduced by the full-thesis adversary), scatter RUN green (typecheck Δ0 · build 0 · smoke 182/1 — the 1 an env ENOENT); β (45→62) re-ran the src color merge (15-vs-11 dissolved to a deterministic 13 file-edges, adversary reproduced; acyclicity-rides-registry DEMONSTRATED — eager+carve 2 FAIL→ lazy+carve 0 FAIL, barrel SCC 14→5); γ (54→68) closed the lossy accounting (U-F29 `329932b` credited, friction #1 RETRACTED as NON-lossy, the sweep FALSIFIED "single site" → 2 spec-forced drops; the adversary CLOSED γ's §7 handoff — no 3rd drop-site).** The cross-lane TAX discharged. **BOTH required fresh non-author adversaries RAN in pass-3**: owner-verbatim (CLEAN on clean-break, **62% carriage**) + FULL-THESIS convergence (NOT clean, **60% convergence**, Group-B NG-1..NG-7) — the full-thesis adversary is the pass-2 convergence gate's explicit requirement; the prior fold mis-filed it as "a pass-4 obligation" (NG-7), superseded here. Composed thesis **50→60%** (the full-thesis un-inflated number; 62% was the carriage ceiling, docked 2). **Gaps survive on TWO axes**: Group A (the un-charted owner half — clause 12 complexity-REDUCTION [14 god-modules > 500 LoC, the sharpest], 4 long-dirs, 3 styles, 11 D4-hygiene, 1 demo-wide manifest) + Group B (NG-1/2 uniqueness + 8-of-9 instruments non-reproducible · NG-3 min-edge-as-measurement · NG-4 β re-couples ≠ clause 12 · NG-5 not-a-closed-plan · NG-6 kernel→app-root inversion). **→ pass-3 is NOT the clean pass (clock 0 of 2).** OWNER-FORK fold: OF-3 WIDENED (1 site → 1 class / 2 sites, both auditors confirm) · **OF-4 WIDENED** (α CONCRETIZED the 6-file coupling + NG-3 raised min-edge-vs-literal-colocation as the real fork, not just the directory) · **OF-6** (the plugins delete-vs-keep divergence, both auditors confirm wired @ `vite.config.ts:178/302/314`). **Next: pass-4 gap-closers — δ complexity-reduction (+ reconcile NG-4) · ε long-dirs+styles+demo-wide-manifest (+ NG-6 + NG-3) · ζ hygiene — + the reproducibility obligation (embed the β/γ instruments, NG-1/2) + a FRESH full-thesis adversary over the expanded surface. Only a zero-gap pass starts the two-clean-pass clock.** |
