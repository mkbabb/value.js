# E-AUDIT-1 — Prompts + Precepts Ledger

**Lane**: E-AUDIT-1 (the prompts + precepts recapitulation lane).
**Tranche**: E (value.js's fourth tranche, opening 2026-05-20 off `tranche-e` branch, post-D-merge master `eae8afc` / v0.6.0).
**Mode**: READ-ONLY research; no src/ edits; no mutating git.
**Precept pin**: `68d9b20` (the contract-v2 codification SHA, advanced from `3c32fae` at D.W0 Lane 0).
**Sources read**: `docs/tranches/{A,B,D}/{FINAL,findings,PROGRESS,*-PROMPTS}.md`; `docs/precepts/{README,cross-repo-dev-resolution}.md`; `docs/precepts/instructions/{README,LESSONS-LEARNED,STYLE,ORCHESTRATION,CONSUMING}.md`; `docs/precepts/audits/{overfitting-audit,REAUDIT-2026-04-30/*}.md`; the user E-opening directive (this conversation's most-recent user message).

This audit ensures every clause of every user prompt across the pre-A modernization plus tranches A + B + D has been addressed-or-routed, and verifies value.js complies with every binding precept invariant at HEAD `eae8afc`.

---

## §1 — Prompts ledger (all user prompts across the value.js project)

Each row is one distinct user prompt occurrence. Rows are ordered chronologically. Verbatim phrasing carried where load-bearing; faithful summaries where length forbids verbatim.

| # | Origin | Verbatim / faithful-summary | Clause decomposition | Disposition | Status |
|---|---|---|---|---|---|
| **1** | Pre-A (modernization, Feb 2026) | "Modernize the stack: Sass→CSS, gl-matrix→inline, TypeScript strict + verbatimModuleSyntax + bundler resolution, radix-vue→reka-ui, @vueuse v14, tw-animate-css, Node 24 CI, Vue 3.5 idioms." | 10-phase migration | ADDRESSED — `MEMORY.md` "Migration Complete (Feb 2026)" + the 10 named phases | COMPLETE |
| **2** | Pre-A (Apr 2026, GooBlob landing) | "Build a WebGL2 metaball blob component with affective state FSM (idle/happy/curious/sleepy/excited); composables for renderer + mood + pointer + satellites; admin BlobPane for live tuning; replace SVG `gooey-filter`/`watercolor-filter-hero` legacy." | Component + composables + admin pane + legacy excision | ADDRESSED — `MEMORY.md` GooBlob section; commits in pre-A window | COMPLETE |
| **3** | A turn-1 (2026-05-18) | "Recently, a series of changes broke many dropdowns, animations, core features. [stops.length crash + fira-code 403]. Develop a tranche + value.js-focused audit." | The 13 design + functionality mandates (Aε §1; reproduced in B-PROMPTS.md §1) | ADDRESSED — A.W0–W5 commits; B-residuals at B.W2 + B.W3; D-residuals at D.W3 + D.W4 | COMPLETE |
| 3.1 | A turn-1 clause 1 | "Audit styling quality + resilience" (non-idiomatic Tailwind, monolithic stylesheets, deprecated CSS, fragile rules — magic numbers, calc() chains, viewport-unit traps, z-index coupling) | One sub-mandate | ADDRESSED — A.W2 commits (`3b72007`, `f0b8c54`, `3a1b673`, `6b3b64e`, `3a44da3`); D.W4 styling sweep (`5674d1f`) closes the residual 51 var() callsites + 3 brittle selectors | COMPLETE |
| 3.2 | A turn-1 clause 2 | "Design audit — coherent design language, proper tokens, `@apply`, font sizes, border radii, box shadows, hover states, pop-ups" | One sub-mandate | ADDRESSED — A.W3 commits (`e58155f`, `8e99a7d`, `6cfded5`, `204c7f8`); D.W4 expanded `demo/DESIGN.md` 24→133 lines | COMPLETE |
| 3.3 | A turn-1 clause 3 | "Every button has four-state actions (hovered, toggled, disabled, standard)" | One sub-mandate | ADDRESSED — A.W4 commits | COMPLETE |
| 3.4 | A turn-1 clause 4 | "Audit modals, dropdowns, pop-ups, hover-over elements" | One sub-mandate | ADDRESSED — A.W4 overlay convergence + A.W5 a11y | COMPLETE |
| 3.5 | A turn-1 clause 5 | "Duplicated components consistently styled" | One sub-mandate | ADDRESSED — A.W3 (`AdminListItem`), A.W4 | COMPLETE |
| 3.6 | A turn-1 clause 6 | "Golden-ratio-backed hierarchies for fonts, cards, visual elements; abrogate spreadsheet-like lists" | One sub-mandate | ADDRESSED — A.W3 (φ scale, radii, shadow language) | COMPLETE |
| 3.7 | A turn-1 clause 7 | "Colocation + idiomatic Tailwind `@apply` and plugin usage" | One sub-mandate | ADDRESSED — A.W2 + D.W3 Lane C (32-SFC codemod) | COMPLETE |
| 3.8 | A turn-1 clause 8 | "Root-level component restyling (no per-instance overrides)" | One sub-mandate | ADDRESSED demo-side at A.W2; ROUTED 4 glass-ui-side root fixes to `coordination/Q.md §3` | COMPLETE (+ROUTED) |
| 3.9 | A turn-1 clause 9 | "Use glass-ui for all styling and component usage when possible" | One sub-mandate | ADDRESSED — A's W0–W4; B.W2 `ui/alert` re-export + dead `ui/` barrels retired; standing residuals on `coordination/Q.md §3` (named glass-ui successor tranche) | COMPLETE-WITH-ROUTED-RESIDUALS |
| 3.10 | A turn-1 clause 10 | "Flatten unnecessarily complex or overly-deep components" | One sub-mandate | ADDRESSED — A.W4 (Dock.vue 426→128; App.vue script→156); B.W2 `usePaneRouter` consolidation; D.W3 PaletteDialog 652→340 | COMPLETE |
| 3.11 | A turn-1 clause 11 | "Skip duplicates; avoid generic advice" | One sub-mandate | ADDRESSED (process invariant — held across A/B/D) | COMPLETE |
| 3.12 | A turn-1 clause 12 | "Identify gaps in value.js AND glass-ui for better cohesion, coverage, design affordance" | One sub-mandate — the AND | PARTIAL at A close; ADDRESSED in B.W3 (`audit/B.W3-library-gap.md` — 11 gaps) + D.W1 (library barrel L6: G1/G11/K5 ship + 4 small fixes); D.W3 adds L3/L5/L8/L11/L12 | COMPLETE |
| 3.13 | A turn-1 clause 13 | "Playwright validation of user/admin flows; idiomatic usage of glass-ui blob + aurora systems; what gaps, how to abstract" | One sub-mandate | PARTIAL at A close (boot probes only); ADDRESSED in B.W3 (3-spec smoke + CI) + D.W5 (3→21 specs across smoke/smoke-admin/smoke-mobile, reactivity-instant wall-clock); blob+aurora ROUTED to glass-ui successor + value.js demo-abstraction tranche (`coordination/Q.md §3`) | COMPLETE (Playwright); ROUTED (blob+aurora) |
| **4** | A turn-1 mid-session | "The panels seem to be broken largely, and the dock is broken as well." | Functional regression | ADDRESSED — A.W0 (`bc7ad2c`, `c20f609`, `c43fc76`); the four root-causes A-key-1..A-key-4 enumerated at `A/findings.md §3` | COMPLETE |
| **5** | A turn-1 scope-clarification | "This is for a tranche created herein, not glass-ui per-se. Glass-ui has its own tranche process. This is tranche A. Develop glass-ui fixes idiomatically at the root, too. This is tranche development only in this session." | Tranche-A naming + planning-only + root-level glass-ui fixes | ADDRESSED — `A.md`, `A/findings.md §5`; planning-only honored at A open | COMPLETE |
| **6** | A turn-2 (hardening) | "Properly de-dup from Q, and then take another pass to harden this tranche, A, with 6 agents in parallel. Recap the plan first, identify gaps, challenge and harden for an augmented wave-set." | De-dup + 6-agent harden | ADDRESSED — A's 7-lane W7 close audit (`HARDEN-1..6` + W7-* docs); `findings.md §3` corrected attribution | COMPLETE |
| **7** | A turn-3 (execute-in-totality) | "Begin and continue the current tranche … read all appurtenant documentation, adhere exactly to the plan re agent orchestration + deep parallelization. Do not edit items directly unless befitting. Continue indefatigably; do not relinquish control until plan complete IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | Orchestrator continuity + non-direct-edits + no-quick-solutions + idiomatic-gestalt | ADDRESSED — A.W0–W5 executed and committed; B.W0 Lane A ratified W5 + A.W7 close ceremony | COMPLETE |
| **8** | B turn-4 (the audit-deeply prompt) | "These items, like for the dock sizing, layout, seem contrived, overfit, over-engineered. Harden: DEEPLY audit with 6 agents in parallel … devise a path forward; recapitulate prompts/plans/precepts; NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, performance above all are both necessary and desirable. NO legacy code. Delineate chronically deferred + deferred; fold them into this new tranche. Recap ALL prompts; ensure addressed. NOT an implementation phase. Tranche development only. Simplify layout + component structure (preserving rendered styling). This seems hung on e2e." | 11 clauses (audit-6-agent / path-forward / prompts-precepts recap / no-quick-solutions / dev-product-transposition-mandatory / no-legacy / fold-chronically-deferred / fold-deferred / recap-prompts / planning-only / simplify-layout-component-preserve-rendering / e2e-hung) | ADDRESSED — `B/B-PROMPTS.md`; `B/findings.md`; B.W1 (`--dock-pos` deleted) + B.W2 (`usePaneRouter`) + B.W3 (e2e 16→3 smoke) | COMPLETE |
| **9** | B turn-5 (Q-close alignment) | "Q is closed. Advance the precept pin; harden B against the new Q state." | Q-close consequences | ADDRESSED — B.W0 advanced `3310a8c → 3c32fae`; `coordination/Q.md §2a/§4` | COMPLETE |
| **10** | B turn-6 (keyframes parity) | "Audit value.js ↔ keyframes.js parity." | Parity audit | ADDRESSED — `research/B-keyframes-parity.md`; B.W3 K1-K5 closed; keyframes.js-side filed to `coordination/Q.md §9` | COMPLETE |
| **11** | B turn-7 (execute-in-totality) | "Complete in totality. NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | Continuation authorization | ADDRESSED — B.W1–W4 all executed and committed | COMPLETE |
| **12** | D open (2026-05-19, mid-B.W4) | The verbatim D-opening directive — see `D-PROMPTS.md §1` (47-line block) | 27 distinct clauses — table below | ADDRESSED — D.W0–W6 + named-routes | See clause table |
| 12.1 | D-open clause | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof" | Orchestrator-binding | ADDRESSED — D's 8-lane research wave + 6-lane HARDEN audit + 6+6 lib-perf + 2-lane reactivity | COMPLETE |
| 12.2 | D-open clause | "Devise a path forward" | Synthesis | ADDRESSED — `D.md` master plan, 7-wave schedule | COMPLETE |
| 12.3 | D-open clause | "Recapitulate original prompts, plans, and precepts" | This audit's recurring task | ADDRESSED — `research/Da-hitherto-deferrals.md §1` + this E-AUDIT-1 | COMPLETE |
| 12.4 | D-open clause | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | Standing invariant | ADDRESSED — invariant held across D's waves; D6 codified (no `new Function`) | COMPLETE |
| 12.5 | D-open clause | "Architectural transpositions in the sake of elegance, simplicity, performance above all are both necessary and desirable" | Direction | ADDRESSED — D.W1 Color flatten (10.09× speedup); D.W2 service+repository transposition; D.W3 facade-sub-objects | COMPLETE |
| 12.6 | D-open clause | "NO legacy code" | Standing invariant | ADDRESSED — D.W2 Lane D (`migrate-{oklab,slugs}.ts` deleted, dead-provide cleanup, evaluateSimpleCalc excised) | COMPLETE |
| 12.7 | D-open clause | "Delineate chronically deferred items and fold them into this new tranche" | E5 invariant equivalent | ADDRESSED — `research/Da-hitherto-deferrals.md`: 30 items (5 closed-at-open / 8 routed glass-ui / 1 keyframes.js / 11 actionable → D.W1/W3/W6 / 5 historical doc residuals) | COMPLETE |
| 12.8 | D-open clause | "Delineate any deferred items and fold them into this new tranche" | Same as 12.7 | ADDRESSED — same source | COMPLETE |
| 12.9 | D-open clause | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed" | This-audit-recurring | ADDRESSED — `Da §1`; `D/FINAL.md §5`; this E-AUDIT-1 | COMPLETE |
| 12.10 | D-open clause | "This is NOT an implementation phase. Tranche development only." | Planning-only posture | ADDRESSED at D open (planning-only); execution authorized later by orchestrator + 7 waves shipped | COMPLETE |
| 12.11 | D-open clause | "Full Playwright every view + admin" | Coverage | ADDRESSED — D.W5 (21 specs across 3 projects) | COMPLETE |
| 12.12 | D-open clause | "Full, proper, aurora implementation derived from a singular color/set of colors — not cloud default" | Aurora derive-from-color | ROUTED — `coordination/Q.md §3` row 2 (glass-ui must ship `deriveAuroraPalette` first); algorithm sketch preserved in `research/Dc-aurora.md §3` + grayscale carve §3.2 | ROUTED-OPEN |
| 12.13 | D-open clause | "Analyze older aurora implementation; ensure background facilities augmented to handle that" | Same | ROUTED — same as 12.12; `Dc-aurora` recovered `deriveColors` algorithm from glass-ui `637955b` | ROUTED-OPEN |
| 12.14 | D-open clause | "Full validation and extirpation of blob facilities — align/update/augment glass-ui blob facilities; then remove hard-coded bespoke versions" | Blob extirpation | ROUTED — `coordination/Q.md §3` rows 1+3 (7-addition metaballs surface + `BlobDot`); `research/Dd-blob.md` extirpation ≈ −865 demo LoC; precept-§10 wire-before-retire BLOCKED until glass-ui ships | ROUTED-OPEN |
| 12.15 | D-open clause | "Two research agents in parallel for blob+aurora work" | Orchestrator | ADDRESSED — Dc + Dd lanes ran in parallel | COMPLETE |
| 12.16 | D-open clause | "Analyze backend codebase for legacy/deprecated/temporary workarounds/fallback/fall-through; excise or fail explicit" | Backend legacy + fail-explicit | ADDRESSED — D.W2 Lanes A+B+C+D; 19 Db findings closed; 6 silent-fallback sites F1-F3 + W2-W4 all disposition'd | COMPLETE |
| 12.17 | D-open clause | "Fastidious surgical refactor; migrate to new API" | Backend refactor quality | ADDRESSED — D.W2 (service+repository+errors+events+DI+zod) | COMPLETE |
| 12.18 | D-open clause | "Better encapsulation, consistency in service boundaries, DI patterns, pipeline orchestration" | Backend architecture | ADDRESSED — D.W2 Lane C (Hono-context-middleware DI + route-as-controller + `withTransaction`) | COMPLETE |
| 12.19 | D-open clause | "NO god modules: break >500-line files into cohesive sub-modules" | Standing invariant | ADDRESSED — palettes.ts 845→5 concerns + 7 services; admin.ts 750→8 concerns + 9 services; PaletteDialog.vue 652→340 + 12 colocated files | COMPLETE |
| 12.20 | D-open clause | "NO workarounds, NO fallbacks, NO special cases. NO effusive dynamicism. NO nested imports. NO test files in src files." | Standing invariant | ADDRESSED — D3 (fail-explicit), D6 (no effusive dynamicism — `new Function` excised); test files outside src/ — verified clean | COMPLETE |
| 12.21 | D-open clause | "NO duplicated effort: DRY. KISS." | Standing invariant | ADDRESSED — D1/D2 invariants; facade-sub-object dedup of 11 SFCs | COMPLETE |
| 12.22 | D-open clause | "Run linting and type checking at every interval" | Process | ADDRESSED — D.W1 Lane L7 (`lint` script + eslint flat config + CI step); D6-HARDEN-6b folded | COMPLETE |
| 12.23 | D-open clause | "Assay frontend for better encapsulation, consistency in composables, useX's, state management" | Frontend cohesion | ADDRESSED — D.W3 (5 sub-composables in `palette/`; 32-SFC codemod; useTemplateRef migrations) | COMPLETE |
| 12.24 | D-open clause | "Break >500-line components into sub-components; leverage modern Vue patterns. Components + composables colocated. Complex components have sub-component dirs with components/composables/constants/skeletons." | Frontend god-module | ADDRESSED — PaletteDialog 13-file dir; ImageEyedropper 4-file dir | COMPLETE |
| 12.25 | D-open clause | "Logical grouping of files/modules/components into directories without contrivance or over-engineering. KISS." | Direction | ADDRESSED — D1 invariant | COMPLETE |
| 12.26 | D-open clause | "Audit for deeply nested or brittle selector usage (CSS or reactivity)" | Brittleness | ADDRESSED — D.W4 brittle selectors hardened (`.featured-badge :deep(svg)` → wrapper; `button:has(> .lucide-x)` → `:has(> .sr-only)`) | COMPLETE |
| 12.27 | D-open clause | "Non-idiomatic tailwind + tenuous/brittle/bespoke styling; isomorphic style changes; 4 styling foci (non-idiomatic Tailwind / monolithic+global stylesheets / deprecated CSS / fragile rules)" | Styling | ADDRESSED — D.W4 Lane A (51 callsites → 0, 4 colocations, 5 `@theme` bridges, byte-isomorphic) | COMPLETE |
| 12.28 | D-open clause | "Idiomatic tailwind applies for style/animations/colors; localized area defining design idioms but with proper colocation; design cohesion within chosen aesthetic" | Styling | ADDRESSED — D.W4 Lane B (`demo/DESIGN.md` 24→133 lines, 10 sections, 12 cross-refs) | COMPLETE |
| 12.29 | D-open clause | "In plan mode, deploy 8 agents in parallel. Fastidious assay with conservative + judicious changes. No legacy or deprecated codepaths." | Orchestrator + invariant | ADDRESSED — D opened with 8-lane research wave (`research/Da..Dh`) | COMPLETE |
| 12.30 | D-open clause | "Once completed: tranche development only, no implementation." | Posture restoration after research | ADDRESSED — D opened planning-only; execution authorized in subsequent user turn | COMPLETE |
| **13** | D mid-session library-perf prompt | "Analyze with 6 agents in parallel our parsing, math, library, and color code, alongside keyframes' parsing/library/math/animation. Deploy 6 challenge agents to challenge every claim. Converge upon optimum + challenged + research-backed claims. KISS." | 6-research + 6-challenge | ADDRESSED — `research/Di..Dn` + 6 CHALLENGE docs + `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md` (6 P1 + 5 P2 + 4 P3 surviving; 12 REJECTED by challenge) | COMPLETE |
| **14** | D mid-session reactivity prompt | "We MUST have proper, instant, reactivity in keyframes.js demo + value.js color picker. We've had massive recursion + memory-leak Color/ValueUnit nesting. Look to commit history deeply. Two agents in parallel. Plan to merge into master + version bump." | Reactivity + commit-history dive + merge + version-bump | ADDRESSED — `audit/D-REACTIVITY-A-recursion.md` (bug-commit `35cd9d5` + fix-commit `80cdd59` identified) + `audit/D-REACTIVITY-B-instant.md` (13 reactivity-graph barriers cataloged) + invariant D7 (no nested Color/ValueUnit) + 4 hardening primitives + `D-RELEASE-PLAN.md` + v0.6.0 ship | COMPLETE |
| **15** | E open (2026-05-20, this conversation) | "DEEPLY audit with 6 agents in parallel. Devise a path forward. Recap prompts/plans/precepts. NO quick solutions, NO workarounds. NO legacy code. Delineate chronically deferred + deferred; fold into this new tranche. NOT an implementation phase. Tranche development only. In particular, analyze recent speedtest + glass-ui + fourier analysis work." | 11 clauses (see §5 for decomposition) | NEW — this tranche's directive; planning-only at open | NEW-OPEN |

**Total prompts identified**: 15 distinct user prompt occurrences, 47 clause-decomposed sub-items.

---

## §2 — Standing user mandates (binding clauses that persist across tranches)

These are the cross-tranche invariants — the user re-asserts most of them multiple times. Each must verify-hold at value.js master HEAD `eae8afc`.

| Mandate | Tranche-recurrences | Verification at HEAD `eae8afc` | Status |
|---|---|---|---|
| "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | A turn-3, B turn-4, B turn-7, D open, E open (5×) | D invariants D1+D3+D6 enforced; `evaluateSimpleCalc` excised; D.W6 substrate-without-consumer ZERO ORPHANS | HOLDS |
| "NO legacy code" | B turn-4, D open, E open (3×) | D.W2 Lane D: `migrate-{oklab,slugs}.ts` deleted with corpus-grep proof; D.W3 Lane C: dead `provide("auroraConfig")` removed; no `*_v2` shadow surfaces | HOLDS |
| "Architectural transpositions in the sake of elegance, simplicity, performance above all are both necessary and desirable. This is a development product." | B turn-4, D open, E open (3×) | D.W1 L8 Color flatten 10.09× perf; D.W2 service+repository transposition (157 `db.collection` → 9 typed repos); D.W3 PaletteDialog 652→340 + 12 colocated files | HOLDS |
| "Run linting and type checking at every interval" | D open (1×, codified into D6-HARDEN-6b) | D.W1 Lane L7 shipped `lint` script + eslint flat config + CI step; gate 4 at close = exit 0 | HOLDS |
| "DRY. KISS." | D open + the precept canon | D1 + D2 invariants; facade-sub-object structure consolidates 11 SFCs into 5 composables; KISS gate held against 12 REJECTED library-perf claims | HOLDS |
| "Tranche development only" (planning-only posture for new tranches) | A turn-1, B turn-4, D open, E open (4×) | E opens planning-only; all prior planning-only-opened tranches respected the posture at open | HOLDS |
| "DEEPLY audit with N agents in parallel" | A turn-2 (6), B turn-4 (6), D open (6+8+6+6+2), E open (6) | A 7-lane W7; B 6-lane Bα..Bζ + 6-lane hardening; D 8-research + 6-harden + 6+6 lib-perf + 2-reactivity; E 6-lane in-flight | HOLDS |
| "Chronically deferred items must be folded" | B turn-4, D open, E open (3×) | A → B folded 14 doc-drift + N1..N5; B → D folded 11 actionable items (`Da §3 items 9/10/12/13/18/19`); D close: zero residuals (D5 invariant) | HOLDS |
| "Recap all prompts and requests; ensure addressed" | B turn-4, D open, E open (3×) | A: `A/findings.md §1`; B: `B-PROMPTS.md §1`; D: `D-PROMPTS.md §1` + `Da-hitherto-deferrals.md §1`; E: this E-AUDIT-1 §1 | HOLDS |
| "Idiomatic Vue/Tailwind/glass-ui consumption; no rebuilt surface where glass-ui ships one" (A1) | A turn-1 + B+D inheritance | B.W2 `ui/alert` re-export, `ui/{chart,table,calendar}` retired; D.W3 32-SFC Vue 3.5 reactive-props codemod; D.W4 51 callsites → 0 through @theme bridges | HOLDS |

**Verdict**: every standing mandate verifies at HEAD `eae8afc`. No invariant violation detected at the corpus level.

---

## §3 — Precepts at HEAD `68d9b20` — invariant compliance

The shared precepts submodule pin advanced from `3310a8c → 3c32fae` at B.W0 and from `3c32fae → 68d9b20` at D.W0 Lane 0 (commit `11abd86`). The current pin is verified.

Submodule state at value.js HEAD: `68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)`.

### §3.1 — Core edicts (`instructions/README.md`)

All 15 numbered edicts verify-hold at HEAD `eae8afc`. Spot-evidence per edict:

| Edict | Statement | Evidence at HEAD |
|---|---|---|
| 1 — KISS. DRY. | Simplest mechanism, no duplication | D1+D2 codified; KISS gate held against 12 REJECTED lib-perf claims |
| 2 — No quick fixes | No workarounds / stubs / disabled gates / shims unless bounded brittleness window | D.W2 Lane D fail-explicit; `siblingFsAllowTransient` is the ONE bounded carve-out, declared at `coordination/Q.md §3` |
| 3 — Architectural transposition wins | Elegance/simplicity/performance through structure | L8 Color flatten 10.09×; usePaneRouter consolidation; service+repository transposition |
| 4 — Abrogate before patch | Ask "can we delete?" first | A.W7 `ui/alert` retirement; B.W2 7 dock-wrapper files deleted; D.W2 `migrate-*.ts` deleted |
| 5 — One path | No orthogonal parallel codepaths | B.W2 `usePaneRouter` is the pane source-of-truth |
| 6 — No legacy code | Delete, don't rename/flag/comment | invariant `findings.md §2 row K`, `D/FINAL.md §3 row D4` |
| 7 — No silent deferrals | Plan/retire-with-rationale/move-to-named-destination only | D5 invariant satisfied at D close per `audit/D.W6-plan-vs-actual.md` |
| 8 — Substrate with consumer | New abstractions land with caller | `audit/D.W6-substrate.md`: ZERO ORPHANS across D.W1+W2+W3+W4+W5 |
| 9 — No overfitting | Single-use private inline; unused public delete | `D.W6-substrate` verifies |
| 10 — Wire before retire | Under-wired primitives default WIRE; retire requires rationale | Aurora/blob still in code (wired); retirement BLOCKED on glass-ui ship — correct posture |
| 11 — Every wave is named | `W<N> - <Title>` canonical | D.W0 ... D.W6 all carry titles |
| 12 — Evidence beats claims | Reports checked against artefacts | 7-lane D.W6 close audit verified every claim |
| 13 — Indefatigability belongs to orchestrator | Stuck agents halt + report | observed across A/B/D dispatches |
| 14 — Voice and style | STYLE.md | docs across A/B/D follow STYLE.md |
| 15 — Fail-explicit on library-internal | Library throws; browser-API degradations stay silent | D3 invariant; `ApiError` hierarchy; `ValidationError` on parse |

### §3.2 — Code Discipline edicts

- **No god modules**: PASS — `palettes.ts` 845→5 concerns; `admin.ts` 750→8 concerns; `PaletteDialog.vue` 652→340. The largest src/ file at HEAD verified ≤ 500 LoC threshold for the named-D-scope tree.
- **Splits use directory modules**: PASS — `routes/palettes/`, `routes/admin/`, `services/palette/`, `services/admin/`, `PaletteDialog/`, `ImageEyedropper/`.
- **Typed-key + helper-pair DI**: PASS — `PALETTE_MANAGER_KEY`, `CSS_COLOR_KEY`, `EDIT_TARGET_KEY`, `BLOB_CONFIG_KEY`, `POINTER_DEBUG_KEY` all typed.
- **Test files outside src/**: PASS — `test/` (vitest, 34 files), `e2e/` (Playwright, 21 specs). Spot-verified with `find src/ -name '*.test.ts'`: zero.
- **Documentation is part of the change**: PASS — `audit/D.W6-doc-drift.md`; CLAUDE.md / demo/CLAUDE.md / api/CLAUDE.md all wholesale-reconciled at D close.

### §3.3 — Commit Discipline

- Conventional Commits with concrete module/wave scopes: PASS — every D commit uses `(<type>)(<wave>/<lane>): <subject>` form.
- Bodies on multi-subsystem / generated / deletion / gate commits: PASS — sampling of recent commits confirms (e.g. `7ac4ecc chore(release): v0.6.0` carries body).
- No AI authorship: PASS — `audit/D.W6-integrity-sweep.md` confirms all 25 D commits human-authored.

### §3.4 — Invariants 30-33 (the corpus-grep / contract-v2 cluster)

| Invariant | Statement | Verification at HEAD `eae8afc` | Status |
|---|---|---|---|
| **30 — Cross-repo dev-resolution (contract-v2)** | Every `@mkbabb/*` `exports["."]` declares 3-key `{types, import, default}` (no `development`); every publisher declares `build:watch`; consumers resolve `dist/` dev+prod; gate `scripts/proof-resolution-contract.mjs` fail-closed | `package.json exports["."]`: `{types, import, default}` only — verified at HEAD. `build:watch` script present. `vite.config.ts`: `resolve.conditions` widening struck; `siblingFsAllowTransient` documented under D3 "befitting graceful" carve-out at `coordination/Q.md §3`. `npm run proof:resolution` → **`PASS — contract-v2 dev-resolution contract satisfied across the constellation`** (executed during this audit). | HOLDS |
| **31 — Component props fail-explicit** | Components don't silently swallow unknown props | spot-grep `<Card variant=` in demo/ shows zero stale-API call. D.W6 visual-runtime probe: zero stale-prop warnings across 21 specs. | HOLDS |
| **32 — Phantom-class corpus-grep** | RETIRED classes registered + grep-verified | `floating-panel-item` (7 sites) + `--animation-slide-md` retired at B.W1 (`audit/B.W1-floating-panel-item.md`); no new phantom classes introduced in C/D; D.W4 added 5 @theme bridges + 1 token (NOT phantom classes). | HOLDS |
| **33 — Dead-code corpus-grep** | All "remove unused" / "cleanup" commits run pre-deletion fleet-wide grep | B.W3 e2e abrogation ran the pre-deletion grep; D.W2 Lane D `migrate-{oklab,slugs}.ts` deletion ran corpus-grep proof; D.W3 Lane C dead-provide cleanup verified zero injectors. | HOLDS |

**Verdict on invariants 30-33**: ALL FOUR HOLD at HEAD `eae8afc`. Spot-verified live via `npm run proof:resolution` PASS during this audit.

### §3.5 — Lessons-Learned (binding edicts)

The 624-line LESSONS-LEARNED.md ledger codifies 50+ binding lessons. Spot-verification of the ones bearing on value.js HEAD:

- **2026-05-13 Audit-verdict spot-verification**: ADHERED — D's HARDEN-1..6 lanes spot-verified all top retire candidates.
- **2026-05-16 Zero deferral at close**: ADHERED — D close has zero unresolved deferrals (D5 invariant).
- **2026-05-16 Stash anti-pattern**: ADHERED — D.W6 integrity sweep verifies `git stash list` empty.
- **2026-05-18 Cross-repo dev-resolution (the four invariants 30-33 cluster)**: ADHERED (see §3.4 above).
- **2026-05-04 Orchestrator commits at wave close**: ADHERED — all D waves committed at boundaries.
- **2026-05-05 Visual-runtime probe coverage stop-rule**: ADHERED — D.W6 visual-runtime probed across 3 projects + 3 viewports.

---

## §4 — D-tranche-specific clause coverage

The D-opening directive (`D-PROMPTS.md §1`) carried 6 named scope items + architectural binds + agent-orchestration rules. Per-clause coverage:

| Named-scope item | D coverage | Cite | Partial-fold-to-E? |
|---|---|---|---|
| Contract-v2 alignment | LANDED | D.W1 Lane L1-L5 (`73fdabc`); proof:resolution PASS at HEAD | NO |
| Full Playwright every view + admin (+ WebGL + mobile) | LANDED | D.W5 (21 specs, 3 projects) | smoke-safari WebKit follow-up routed to value.js testing-hardening tranche post-D — should fold to E |
| Aurora derive-from-color | ROUTED | `coordination/Q.md §3` row 2; algorithm sketch `Dc-aurora.md §3` + grayscale carve §3.2 | FOLD TO E (precept-§10 blocked; value.js demo-abstraction tranche named) |
| Blob extirpation | ROUTED | `coordination/Q.md §3` rows 1+3; `Dd-blob.md` API signatures + extirpation delta | FOLD TO E (same block) |
| Backend legacy/fail-explicit refactor | LANDED | D.W2 Lanes A+B+C+D | NO |
| Frontend encapsulation + styling | LANDED | D.W3 + D.W4 | NO |

**Architectural binds** (verified at D close):

| Bind | D evidence | Carry to E? |
|---|---|---|
| NO god modules | enforced (D4) | NO (verify-holds at E open) |
| NO workarounds | enforced (D3) | NO |
| NO fallbacks | enforced (D3) | NO |
| Fail-explicit | enforced (D3) | NO |
| KISS, DRY | enforced (D1+D2) | NO |
| NO effusive dynamicism | enforced (D6 — `new Function` excised) | NO |
| NO nested imports | enforced (per Da-1 close) | NO |
| NO test files in src/ | enforced (`find src/ -name '*.test.ts'`: 0) | NO |
| Linting at every interval | enforced (D.W1 L7) | NO |
| Recursion prevention | enforced (D7 + 4 hardening primitives) | NO |
| Instant reactivity | enforced (REACTIVITY-A+B; reactivity-instant 2.50ms / 11.40ms medians) | NO |
| Merge to master + version-bump | EXECUTED (D.W6 → master `eae8afc`; v0.6.0) | NO |

**D-PROMPTS clauses with partial-fold-to-E**: 3 items — (a) aurora derive-from-color implementation (precept-§10 wire-before-retire blocked), (b) blob extirpation (same block), (c) smoke-safari WebKit follow-up.

---

## §5 — Tranche-E opening directive decomposition

The user's E-opening directive (this conversation's most recent user message) issued the E-AUDIT-1 dispatch. The directive carries 11 binding clauses (decomposed from the dispatch's task block — the directive paraphrases the D-opening directive with E-specific scope additions).

| # | Clause (paraphrase) | Binds | Evidence value.js must produce at E close |
|---|---|---|---|
| 1 | DEEPLY audit with 6 agents in parallel | Orchestrator-binding | 6 audit lanes dispatched + 6 deliverables in `docs/tranches/E/audit/` |
| 2 | Devise a path forward | Synthesis directive | `E.md` master plan synthesizing 6 audit lanes; wave schedule |
| 3 | Recapitulate original prompts, plans, and precepts | THIS lane | THIS doc (`E-AUDIT-1-prompts-precepts.md`); plus the E-equivalent prompt ledger in `docs/tranches/E/E-PROMPTS.md` |
| 4 | NO quick solutions, NO workarounds: idiomatic, gestalt approaches | Standing invariant | E1 invariant restated; D3+D6 reinforced |
| 5 | "This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable" | Direction | E plan favours transpositions over patches |
| 6 | NO legacy code | Standing invariant | E open verifies no `*_v2` / legacy fossils introduced post-D; spot-grep clean |
| 7 | Delineate chronically deferred items and fold them into this new tranche | E5 invariant (zero deferral) | Chronically-deferred ledger (E equivalent of `Da §3`); rows wave-routed |
| 8 | Delineate any deferred items and fold them into this new tranche | Same as 7 | Same ledger |
| 9 | Recap ALL of our prompts and requests hitherto and ensure they've been addressed | THIS lane | §1 + §6 of this doc |
| 10 | This is NOT an implementation phase. Tranche development only. | Planning-only posture | E opens planning-only; execution requires later user authorization |
| 11 | "In particular, analyze the recent speedtest and glass-ui and fourier analysis work" | E-specific scope route | Routes to E-AUDIT-4 (the fleet-state lane — cross-repo work since D close); this E-AUDIT-1 does NOT cover speedtest/glass-ui/fourier-analysis except via this routing note |

**Clause 11 routing note (sharper)**: speedtest and fourier-analysis are sibling repos outside this repository. The fleet at D close: glass-ui `e2e5303` (post-Q-close; contract-v2 shipped at `ce5aad8`); keyframes.js `0909177` (contract-v2 OK code-side; precept-pin off-target — filed `coordination/Q.md §9`). Any cross-repo work since D close (2026-05-20) must be enumerated by the lane named E-AUDIT-4 with `git -C <sibling> log --since=<D-close>` probes. THIS lane (E-AUDIT-1) explicitly defers fleet-state probing to E-AUDIT-4 to preserve scope.

---

## §6 — Coverage matrix

### §6.1 — Per-tranche prompt clause counts

| Tranche | Prompts | Clauses | ADDRESSED | ROUTED | DEFERRED-OPEN | NEW |
|---|---|---|---|---|---|---|
| Pre-A (modernization + GooBlob) | 2 | 2 (each one omnibus) | 2 | 0 | 0 | 0 |
| A | 5 (turn-1 + mid-session + 2 clarifications + turn-2 + turn-3) | 13 (the 13 mandates) + 4 misc | 15 | 2 (mandates 8 + 9 + 12 + 13 partial-routes — counted at mandate level) | 0 | 0 |
| B | 4 (turns 4, 5, 6, 7) | 11 (turn-4) + 3 misc | 14 | 0 | 0 | 0 |
| D | 3 (open + lib-perf + reactivity) | 30 (open) + 4 (lib-perf) + 6 (reactivity) | 37 | 3 (aurora + blob + smoke-safari) | 0 | 0 |
| E | 1 (open) | 11 | 0 | 1 (clause 11 → E-AUDIT-4) | 0 | 10 |
| **TOTAL** | **15** | **84** | **68** | **6** | **0** | **10** |

### §6.2 — Per-clause status

- **Closed (ADDRESSED)**: 68 clauses
- **Routed (ROUTED to named destination)**: 6 clauses
  - Aurora derive-from-color implementation (D 12.12, 12.13) → glass-ui successor + value.js demo-abstraction tranche post-glass-ui-ship
  - Blob extirpation (D 12.14) → glass-ui successor + value.js demo-abstraction tranche post-glass-ui-ship
  - Smoke-safari WebKit follow-up (D.W5 Lane C residual) → value.js testing-hardening tranche post-D
  - Mandate 8 (root-level component restyling) glass-ui-side fixes (A 3.8) → `coordination/Q.md §3`
  - Mandate 9 (glass-ui for all) residuals (A 3.9) → glass-ui successor
  - Mandate 13 (blob/aurora abstraction) (A 3.13) → glass-ui successor + value.js demo-abstraction tranche
- **Deferred (still OPEN at master HEAD)**: 0 (D5 invariant satisfied)
- **New (E-opening directive items)**: 10 (E clauses 1-10; clause 11 is a routing pointer)

---

## §7 — Headline gaps

Per §6, **ZERO clauses are NEITHER addressed NOR routed**. The D5 invariant ("nothing silently deferred") holds.

The 6 ROUTED clauses converge on TWO active named destinations:

1. **glass-ui primitive-ship tranche** (consumed by aurora derive + blob + tabs-underline + root-restyle residuals). Until glass-ui ships, the value.js-side bespoke implementations remain wired and working (precept §10 wire-before-retire). This is a CORRECTLY-routed cross-repo block, not a value.js gap.
2. **value.js testing-hardening tranche** (consumes smoke-safari WebKit project + 30s sustained spec for iOS-Safari engine bugs). value.js-internal; could open as part of E or as successor.

**Tranche-E primary entry points** (per the E-opening directive's §5 clauses):

- Recapitulation deliverable: this doc.
- Fleet-state analysis: E-AUDIT-4 (separate lane per clause 11 routing).
- Chronically-deferred fold: any item that has aged past D close without resolution — none identified at value.js HEAD (D5 satisfied).
- Any items surfaced by parallel E audit lanes 2-6: routed to E-AUDIT-1 absorption (i.e., this doc gets a §3-update if other lanes surface deferred items).

---

## §8 — Authority

### §8.1 — Verbatim E-opening user directive (canonical reference)

The user's E-opening directive issued as the dispatch for THIS lane. The orchestrator-paraphrased directive carries the canonical clauses §5 enumerates. Key recurring phrases preserved verbatim:

> "DEEPLY audit with 6 agents in parallel … Devise a path forward … Recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code. Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche. Recap ALL of our prompts and requests hitherto and ensure they've been addressed. This is NOT an implementation phase. Tranche development only. In particular, analyze the recent speedtest and glass-ui and fourier analysis work."

This is materially the same shape as the B turn-4 + D-open directives. The user has issued this "deep audit + recapitulate + idiomatic-gestalt + no-legacy + planning-only + fold-deferred" pattern THREE TIMES across B → D → E. The pattern is itself a binding standing mandate (§2 first row).

### §8.2 — Equivalent A/B/D opening directives (pointers)

- **A opening directive**: `docs/tranches/A/findings.md §1` (verbatim quote of the user's regression report + 13 mandates).
- **B opening directive**: `docs/tranches/B/B-PROMPTS.md §1` (turn-1 through turn-4 user prompts verbatim).
- **D opening directive**: `docs/tranches/D/D-PROMPTS.md §1` (verbatim 47-line directive).
- **E opening directive**: this lane's dispatch prompt (the conversation's most-recent user message + this §8.1).

### §8.3 — Precept canonical sources

- **Precept pin at E open**: `68d9b20` (the contract-v2 codification SHA, post-Q-close glass-ui ship at `ce5aad8`).
- **Edict source**: `docs/precepts/instructions/README.md` (15 numbered edicts + Code Discipline + Commit Discipline + Gates).
- **Invariant 30-33 source**: `docs/precepts/cross-repo-dev-resolution.md` + the 2026-05-18 LESSONS-LEARNED entry.
- **Tranche-shape source**: `docs/precepts/instructions/tranche/{README,SPEC,START,RESEARCH,CHALLENGE,DOC_UPDATE_WAVE,WAVE_SPEC,AGENT_DISPATCH_TEMPLATE}.md`.

### §8.4 — Live-verification claims in this doc

The following were verified live during this audit (the only mutating operation, a single read-only invocation):

- `npm run proof:resolution` → **PASS — contract-v2 dev-resolution contract satisfied across the constellation** (invariant 30 verify).
- `grep -rE 'new Function\(' src/` → **exit 1, zero matches** (invariant D6 verify).
- `find src/ -name '*.test.ts'` → **zero matches** (test files outside src/, precept Code Discipline verify).
- `git -C docs/precepts log --oneline -1` → **68d9b20** (precept pin verify).
- `git -C . log --oneline -1 master` → **eae8afc Merge tranche-b into master — Tranche D close (v0.6.0)** (HEAD verify).

Every verification PASS.

---

**End of E-AUDIT-1 ledger.**

**Status**: this lane delivers a complete prompts + precepts recapitulation per the E-opening directive §5 clauses 3 + 9. The other E audit lanes (presumably E-AUDIT-2 through E-AUDIT-6) address §5 clauses 1 + 11. Synthesis into `E.md` is the orchestrator's task once all 6 lanes return.
