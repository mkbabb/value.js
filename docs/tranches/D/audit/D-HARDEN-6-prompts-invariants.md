# D-HARDEN-6 — Prompts/invariants/deferrals/Dh-depth audit

**Tranche**: D (value.js, planning). **Lane**: D-HARDEN-6 (read-only audit).
**Date**: 2026-05-19. **Posture**: declarative, evidence-led, read-only.
**Inputs**: `docs/tranches/D/D-PROMPTS.md`, `D.md`, `findings.md`, `coordination/Q.md`, `dispatch/AGENT.md`, `waves/D.W0..D.W6.md`, `research/Da..Dh`, `PROGRESS.md`; `docs/precepts/instructions/README.md` + `LESSONS-LEARNED.md` + `tranche/SPEC.md` at pin `3c32fae`; `package.json` scripts block.

## §1 — Verbatim directive atomic-clause cross-walk

Decomposed from `D-PROMPTS.md:9-55` (the user's D-opening directive). 30 atomic clauses identified. Each row cites the verbatim phrase, the addressed-by destination in the D substrate, and a verdict.

| # | Clause (verbatim or compressed) | Source line | Addressed-by | Verdict |
|---|---|---|---|---|
| 1 | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein" | `D-PROMPTS.md:9` | 8 research lanes Da–Dh (`PROGRESS.md:11-24`); harden lanes (this file is HARDEN-6) | ADDRESSED — 8 lanes exceeds the 6-agent ask; harden lanes augment |
| 2 | "Devise a path forward: audit the hitherto made changes and the remaining plan" | `D-PROMPTS.md:11` | `Da-hitherto-deferrals.md §2` (A+B close spot-checks) + `findings.md §2` (8-lane → wave mapping) | ADDRESSED |
| 3 | "recapitulate our original prompts, plans, and precepts" | `D-PROMPTS.md:11` | `D-PROMPTS.md §2-§3` recaps; `Da §1` ledger of every prior prompt | ADDRESSED |
| 4 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | `D-PROMPTS.md:11` | Precept-`README.md §Edicts` "Architectural transposition wins" + "No quick fixes"; cited as D's binding posture in `Da §4.3` | ADDRESSED via precept-inheritance — but **NOT named as a D invariant**; the directive's "gestalt" framing is implicit in D2 (abrogate-before-patch). Recommendation: name in §6 R3 below. |
| 5 | "This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable" | `D-PROMPTS.md:11` | Same precept (`README.md:13-16`) | ADDRESSED via inheritance |
| 6 | "NO legacy code" | `D-PROMPTS.md:13` | Precept `README.md:23-24`; D2 invariant (`D.md:29`) names "Abrogate before patch"; D.W2 Lane D excises `api/dist/`, `migrate-*.ts` | ADDRESSED |
| 7 | "Delineate any chronically deferred items and fold them into this new tranche" (×2 — clause repeated) | `D-PROMPTS.md:15, 17` | `Da §3` catalogues 30 items; `findings.md §2` row Da-1; §3 of this audit verifies dispositions | ADDRESSED |
| 8 | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed" | `D-PROMPTS.md:19` | `D-PROMPTS.md §2`; `Da §1`; this audit §1 (the cross-walk you are reading) | ADDRESSED |
| 9 | "This is NOT an implementation phase. Tranche development only." | `D-PROMPTS.md:21` | `D.md:7` ("Mode: planning-only at open"); `dispatch/AGENT.md` worktree guidance; `PROGRESS.md:3` | ADDRESSED |
| 10 | "We need a full playwright audit of every view, and every admin view, too" | `D-PROMPTS.md:23` | D.W5 (`D.W5.md` Lanes A/B); 7 user-view specs + 5 admin specs + walks; `Dg §1-2` (14-view inventory) | ADDRESSED |
| 11 | "full, proper, aurora implementation that can be derived from a singular color/set of colors — not the cloud default" | `D-PROMPTS.md:23` | `Dc-aurora.md §3` derivation algorithm; `coordination/Q.md §3` aurora row sharpened; **value.js-side migration routed** to a successor tranche (precept-§10 wire-before-retire blocked on glass-ui ship) | FILED-WITH-DESTINATION — explicit per D.md §4 "D IS NOT" carve-out; passes invariant D5 via named destination |
| 12 | "Full validation and extirpation of the blob faciilities" | `D-PROMPTS.md:25` | `Dd-blob.md §5` extirpation plan; `coordination/Q.md §3` 7-metaball-additions filing | FILED-WITH-DESTINATION — same precept-§10 block |
| 13 | "align, update, and augment the glass-ui glob facilities to be what we require, and then remove the hard-coded bespoke versions herein to leverage that" | `D-PROMPTS.md:25` | `coordination/Q.md §3` filings (glass-ui successor tranche) | FILED — value.js cannot write glass-ui |
| 14 | "Perfect and refine our extant and basal implementations to be better encapsulated, generalized, beautiful — same for aurora. Two research agents in parallel" | `D-PROMPTS.md:25` | Dc + Dd (two parallel research lanes) | ADDRESSED at research; implementation routed-to-successor |
| 15 | "Analyze the extant backend codebase for any legacy code, deprecated code, temporary workarounds, fallback or fall-through behavior" | `D-PROMPTS.md:27` | `Db-backend-legacy.md §1-§2` (god modules + L1–L3 + W1–W5 + F1–F8 + C1–C4); D.W2 | ADDRESSED |
| 16 | "in all instances, either excise the code entirely, or fail explicitly therein: no silent or graceful handling unless befitting" | `D-PROMPTS.md:27` | Invariant D3 (`D.md:30`); D.W2 Lane D (6 silent-fallback sites F1–F3/W2–W4); `dispatch/AGENT.md §"Fail-explicit (invariant D3 — new in D)"` | ADDRESSED for backend. **FRONTEND coverage is implicit only** — D3 binds "for the backend wave (D.W2) especially" per `dispatch/AGENT.md:32`; D.W3 frontend wave does not enumerate fail-explicit sites. See §6 R1. |
| 17 | "This should be a fastidious and surgical refactor: thoroughly identify all areas herein with legacy behavior and get everything explicitly migrated to whatever new API — or facility — present" | `D-PROMPTS.md:29` | `Db §2/§6`; D.W2 Lane D | ADDRESSED for backend |
| 18 | "Divine an approach to achieve better encapsulation, consistency in service boundaries, dependency injection patterns, and pipeline orchestration" | `D-PROMPTS.md:31` | `Db §3` (service-layer verdict "flat tangle" → introduce service+repo); D.W2 Lane C (zod pipeline `validate → service → repository → response`) | ADDRESSED |
| 19 | "NO god modules: break large files (>500 lines especially) into smaller, cohesive sub-modules" | `D-PROMPTS.md:33` | D.W2 (palettes 845 + admin 750), D.W3 (PaletteDialog 652); precept `README.md:76-79` "No god modules" | ADDRESSED |
| 20 | "leverage better and modern patterns" | `D-PROMPTS.md:33` | D.W3 Lane C (Vue 3.5 reactive-props + `useTemplateRef`); D.W2 Lane C (zod + repository) | ADDRESSED |
| 21 | "NO workarounds, NO fallbacks, NO special cases" | `D-PROMPTS.md:35` | D3 invariant; precept `README.md:11-13`; D.W2 Lane D | ADDRESSED for backend; same caveat as clause 16 for frontend |
| 22 | "No effusive dynamicsim" | `D-PROMPTS.md:35` | **NOT EXPLICITLY ADDRESSED** as a D invariant. Closest: precept `README.md:20-22` "One path" (orthogonal codepath rejection). No frontend audit checks for `defineAsyncComponent`, dynamic component switching, or eval-shaped indirection. | **GAP** — see §6 R2 |
| 23 | "NO nested imports" | `D-PROMPTS.md:35` | `De §7.1` "zero matches" verified at audit time. `dispatch/AGENT.md` does not name it. No enforcement gate. | ADDRESSED at audit (zero hits); **no ongoing gate**. See §6 R5 |
| 24 | "NO test files in src files" | `D-PROMPTS.md:35` | `De §7.2` "zero matches"; precept `README.md:97-101` "Test files live outside src/" | ADDRESSED-AT-AUDIT; **no D-side gate** (the precept is binding but no D wave records the verification). See §6 R5 |
| 25 | "NO duplicated effort: DRY. KISS." | `D-PROMPTS.md:37` | Precept `README.md:8-9`; implicit across waves | ADDRESSED via precept-inheritance |
| 26 | "Run linting and type checking to validate your changes at every interval" | `D-PROMPTS.md:39` | `dispatch/AGENT.md:28` cites "`vue-tsc --noEmit` + `npm test` + `npm run test:e2e`". `npm run lint` does NOT exist (`package.json` has no `lint` or `eslint` script); only `prettier` is in devDependencies. Precept `ORCHESTRATION.md:254` says "Run the wave's lint/format cadence." | **GAP — no `lint` script in `package.json`.** "Type checking" is fully covered (`vue-tsc`); "linting" is unaddressed beyond Prettier-as-formatter. See §6 R4 |
| 27 | "Assay the frontend components herein to look for areas of better encapsulation, consistency in composables, useX's, state management and store management" | `D-PROMPTS.md:41` | `De §3-§5` (composables encapsulation + state management + DI); D.W3 Lanes A/B/C | ADDRESSED |
| 28 | "We should break large components (>500 lines especially) into smaller sub-components when befitting; leverage better and modern Vue patterns. Components and composeables should be colocated together when befitting in functionality. Complex components should be structured into sub-component dirs with components, composeables, constants, skeletons, thereof, if needed" | `D-PROMPTS.md:43` | D.W3 Lane A (PaletteDialog/ dir with `components/`, `composables/`, `constants.ts`) | ADDRESSED |
| 29 | "Logical grouping of files, modules, components, into directories without contrivance or over-engineering. KISS." | `D-PROMPTS.md:45` | Precept `README.md:8`; D.W2 directory-mode splits (`README.md:81-84` "Splits use directory modules"); D.W3 PaletteDialog/ dir | ADDRESSED |
| 30 | "Audit for deeply nested or brittle selector usage insofar as CSS or reactivity" | `D-PROMPTS.md:47` | `Df §5` (`:deep(svg)` + `button:has(> .lucide-x)` — 2 sites); `Df §6` (reactivity-selector flags); D.W4 Lane A item 6 (brittle selectors) | ADDRESSED |
| 31 | "Analyze for non-idiomatic tailwind or tenuous, brittle, bespoke styling … (1) non-idiomatic Tailwind usage (2) monolithic/global stylesheet patterns that should be colocated or component-scoped (3) deprecated/archaic CSS (4) fragile rules (magic numbers, brittle `calc()/min()/max()` chains, viewport-unit traps, z-index coupling, browser-specific breakage)" | `D-PROMPTS.md:49` | `Df §1-§4` (Tailwind, global residuals, deprecated CSS, fragile rules); D.W4 Lane A | ADDRESSED |
| 32 | "Ensure that any style changes are perfectly isomorphic thereto, unless HIGHLY befitting otherwise" | `D-PROMPTS.md:49` | `D.W4.md:7` "perfectly isomorphic" binding constraint; pixel-diff gate (`D.W4.md:20, 52`) | ADDRESSED |
| 33 | "Ensure that we're using idiomatic tailwind applies for style, animations, colors: we should have a localized area that defines all of our design idioms — but still leverages proper colocation. Ensure design cohesion within our chosen aesthetic." | `D-PROMPTS.md:51` | D.W4 Lane B (DESIGN.md catalog ~150 lines, 10 sections); `Df §6` settled "expand DESIGN.md, NOT new file" | ADDRESSED |
| 34 | "In plan mode, deploy 8 agents in parallel. Fastidious assay with conservative and judicious changes. No legacy or deprecated codepaths: this is a development product." | `D-PROMPTS.md:53` | 8 research lanes Da–Dh (`PROGRESS.md §"Audit round — 8 parallel research lanes"`) | ADDRESSED — 8 agents exactly |
| 35 | "Once the above is completed. Tranche development only, no implementation." | `D-PROMPTS.md:55` | Same as clause 9; D is planning-only | ADDRESSED |

**Totals**: 35 atomic clauses identified (some clauses bundle related sub-asks). **30 ADDRESSED / 3 FILED-WITH-DESTINATION (aurora/blob, passes D5) / 2 GAP (clauses 22 "no effusive dynamicism", 26 "linting") / 1 PARTIAL (clauses 16/21 — fail-explicit named binding for backend only).** Total addressed-or-filed = 33 of 35 ≈ **94%**. Two genuine gaps + one partial; the rest is precept-inheritance complete.

## §2 — Invariant model audit — D1–D5 vs precept invariants 30–33

### §2.1 — D1–D5 statements (re-quoted from `D.md §2`)

- **D1**: Close B before opening new structural work (carries-forward bind; B is closed; binds future tranches).
- **D2**: Abrogate before patch.
- **D3**: Fail-explicit over silent.
- **D4**: Runtime evidence.
- **D5**: Zero deferral at close.

### §2.2 — Precept invariants 30–33 (re-quoted from `precepts@3c32fae:LESSONS-LEARNED.md:584-587`)

- **30**: Cross-repo dev-resolution contract (redefined-in-place at `68d9b20` to contract-v2 per `Dh §3`).
- **31**: Component props fail-explicit (extends invariant 24 from composables to component-prop surface).
- **32**: Phantom-class corpus-grep gate (when a CSS class is RETIRED).
- **33**: Dead-code-removal corpus-grep gate (generalises 32 to all "remove unused" / "cleanup" commits).

### §2.3 — Subsumption / overlap / gap analysis

| D invariant | Precept relation | Subsumed? | Verdict |
|---|---|---|---|
| **D1 (close-B-first)** | No precept covers this verbatim; closest is `tranche/SPEC.md §169` (tranche close requires every planned item landed/retired/named). D1 is a sequencing rule, not an item-state rule. | NOT subsumed | Distinct; D1 binds future tranches, not D itself. Retain. |
| **D2 (abrogate before patch)** | **DIRECTLY mirrors** precept edict `README.md:17-19` "Abrogate before patch." | SUBSUMED but **does not cite**. | D.md §2 does not name the precept it inherits. Recommendation: add citation (`README.md §Edicts` line 17). |
| **D3 (fail-explicit)** | **OVERLAPS** with precept edict `README.md:54-64` "Fail-explicit on library-internal contract violations" AND invariant 31 (component props fail-explicit). | OVERLAPS but is **distinct in scope**: D3 binds backend route handlers (HTTP-level fallthrough), while the precept binds library-internal subsystems and component props. D3 is the route-handler extension. | Distinct extension; recommendation: name the relationship in `D.md §2.3` ("D3 extends the precept-edict + invariant 31 to backend route handlers"). |
| **D4 (runtime evidence)** | Precept `SPEC.md §75` "Hard Gates" requires close on artefacts; `SPEC.md §178-179` close-honesty / ε visual-runtime lane. | OVERLAPS; D4 is the per-wave-not-just-close formalisation. | Distinct extension. |
| **D5 (zero deferral)** | **DIRECTLY mirrors** precept `README.md:25-27` "No silent deferrals" + `SPEC.md §172-178` "P invariant 28 (Zero deferral at tranche close)". | SUBSUMED — D5 is a restatement. | Recommendation: add precept citation. |

**Precept invariants 30–33 — D-wave naming check**:

| Invariant | Named in D wave? | Where | Evidence |
|---|---|---|---|
| 30 (contract-v2, redefined) | **YES** — D.W0 Lane 0 (precept bump), D.W1 (compliance), D.W6 (close pin) | `D.W0.md:13-20`, `D.W1.md` whole-wave, `D.W6.md:25` | The D.W1 wave is the materialised gate. |
| 31 (component props fail-explicit) | **NOT named** in any D wave. | n/a | Card props fail-explicit was an A.W1 close consumed at Q.W2 (`Da §1.2` row 8). No D-side action — A consumed it. Reasonable. But D's reactive-props codemod (D.W3 Lane C) doesn't cite invariant 31. |
| 32 (phantom-class) | **NOT named** in any D wave. | n/a | Reasonable — D's frontend wave (D.W3) introduces no CSS-class retirals; D.W4 styling wave moves tokens (not retires classes) and adds utilities. No retire-with-grep event in D. |
| 33 (dead-code corpus-grep) | Named in `D.md:34` ("Invariant-33 gates the backend dead-code excisions") | `D.W2.md:54-56` (delete `api/dist/`, `migrate-*.ts`) | Gate cited; verification would be `proof-phantom-classes.mjs --pre-deletion` per the precept's `LESSONS-LEARNED.md:605`. **The wave spec does not name the gate script.** See §6 R7. |

**Should there be a D6 invariant?** Two candidates:

- **D6 candidate — "no effusive dynamicism / explicit pipeline"** (covers clause 22 + clause 18's explicit pipeline ask). Recommended: **YES**. The precept's "One path" edict and `LESSONS-LEARNED §584` 'invariant 30 was half-applied' pattern both gesture at this; codifying "explicit pipeline, no dynamic indirection" as a D-side bind would catch backend dynamism in services (e.g. `(req as any)[handlerName]`-style dispatch) and frontend dynamic component switching (`<component :is="dynamicName">` without a typed registry). See §6 R2.
- **D7 candidate — "linting cadence"** (covers clause 26). The precept already binds in `ORCHESTRATION.md:254-255`; what's missing is a value.js-side `lint` script and a per-wave gate citation. Recommended: **NO new invariant**; just add the script (R4).

## §3 — Chronically-deferred sweep — Da §3 30 items × disposition

Re-read each row in `Da §3`. Each item's disposition is verified against `findings.md §2` + the wave specs.

| # | Item (compressed) | Da-§3 routing | D's disposition | Verified |
|---|---|---|---|---|
| 1 | metaballs `positionSource` + 4 more (5 → 7 additions) | glass-ui successor | `coordination/Q.md §3` row 1 (7 additions, sharpened) | ROUTED-FILED ✓ |
| 2 | `deriveAuroraPalette` | glass-ui successor | `Q.md §3` row 2 + `Dc §3` algorithm sketch | ROUTED-FILED ✓ |
| 3 | `BlobDot` organic-dot | glass-ui successor | `Q.md §3` row 3 + `Dd §6` (16-instance count) | ROUTED-FILED ✓ |
| 4 | `SelectTrigger size` prop | glass-ui successor | `Q.md §3` row 4 | ROUTED-FILED ✓ |
| 5 | `DockSelectTrigger clampLabel` | glass-ui successor | `Q.md §3` row 5 | ROUTED-FILED ✓ |
| 6 | `TooltipContent variant="mono"` | glass-ui successor | `Q.md §3` row 6 | ROUTED-FILED ✓ |
| 7 | `Button size="icon-sm"` | glass-ui successor | `Q.md §3` row 7 | ROUTED-FILED ✓ |
| 8 | `<Tabs variant="underline">` provider | glass-ui successor | `Q.md §3` row 8 | ROUTED-FILED ✓ |
| 9 | Demo-side blob/aurora abstraction (incl. `./configurator` adoption — the unblocked half) | value.js demo-abstraction tranche | `D.md §4` "D IS NOT"; the `./configurator` adoption is **NOT picked up by any D wave** even though `Da §4.2 Tier-3` flagged it as not glass-ui-blocked | **GAP** — `./configurator` unblocked, NOT folded into D, NOT explicitly named-routed beyond the broad "demo-abstraction tranche". See §6 R6. |
| 10 | 11 value.js `src/` G1–G11 (P1 G1 = `registerColorNames`/`clearCustomColorNames` not in barrel; G3 = 14 deep `@src/...` imports; G4–G11 P2/P3) | candidate | **NOT folded** into any D wave; not named-routed | **GAP** — G1 is a 2-line edit (`Da §4.2 Tier-1`); G11/K5 `solveCubicBezierX` export is 1-line. See §6 R8 |
| 11 | Invariant-30 contract-v2 staleness | strong candidate | D.W1 whole-wave (5 lanes) + D.W0 Lane 0 precept bump | FOLDED ✓ |
| 12 | `viewSchema.ts` extraction (`useViewManager.ts`, `usePaneRouter.ts`, `router/index.ts` — 4-copy `ViewId`) | candidate | **NOT folded** into any D wave. `De §3.3` recorded a related drift (`TabValue` ≠ 8 triggers) which IS in D.W3 Lane A; the broader 4-copy `ViewId` extraction is not addressed. | **GAP** — partially addressed (the `TabValue` reconcile in D.W3 Lane A); the `viewSchema.ts` extract is not. See §6 R8 |
| 13 | `cssColorToRgb` per-frame hot-spot (`useMetaballRenderer.ts:174`) | candidate | **NOT folded** — `useMetaballRenderer.ts` is precept-§10 blocked on glass-ui ship. Memoisation is a 5-line fix independent of the lifecycle question; `Da §4.2 Tier-3` flagged it as not-blocked. | **GAP** — independent of glass-ui ship; could be a one-liner in D.W3 or D.W4. See §6 R8 |
| 14 | `--menu-min-w` exception sites (3 documented overrides) | NO, design choice | Implicit — `D.W4` does not retire the markers | RETIRED-WITH-RATIONALE ✓ (documented design choice) |
| 15 | 14+9 W7+B.W4 doc-drift items; 4 A-vintage residuals (Δ1–Δ4) | OPTIONAL | `findings.md:18` row Da-1 routes "5 historical doc residuals → D.W6" close ceremony | FOLDED ✓ |
| 16 | keyframes.js-side 6 gaps + precept-pin desync | NO, keyframes.js repo | `Q.md §9` refreshed (precept-pin convergence ask only; 6 gaps route to keyframes.js's own maintenance) | ROUTED-FILED ✓ |
| 17 | 126 generated shadcn-vue typecheck cluster | candidate | `findings.md §3` named-destination ("generator-update / vendoring-policy effort") | ROUTED-NAMED-DESTINATION ✓ |
| 18 | K4 — keyframes.js Prettier doc gap | candidate | **NOT mentioned** in D substrate. `Da §3` flagged "possibly missed in B's close." | **GAP** — unresolved; either confirm-as-keyframes.js-repo or fold. See §6 R8 |
| 19 | Substrate-without-consumer — 5 B.W3 library modules (parsing/animation-shorthand, extract, serialize, stylesheet; units/interpolate) lack tests | strong candidate | **NOT folded** into any D wave. `Da §4.2 Tier-1` flagged "small, library-only, mechanical: add vitest specs for the 5 modules." | **GAP** — substrate-with-consumer precept edict (`README.md:28-29`) binds; D doesn't close. See §6 R8 |
| 20 | Generator-update / vendoring-policy decision | candidate | Same as #17 — `findings.md §3` "generator-update / vendoring-policy effort" | ROUTED-NAMED-DESTINATION ✓ |
| 21 | A.W6 fallback path — `useMetaballRenderer.ts` 333 lines, `WatercolorDot` demo-local, `AuroraPane` "under rework", static `AuroraConfig` | derivative of 1–3 | Inherited via `Q.md §3`; pure derivative | DERIVATIVE ✓ |
| 22 | A↔Q contested boundary | MOOT | `Q.md §4` MOOT | CLOSED ✓ |
| 23 | `Ab-16` PointerDebugOverlay hardcoded colors | RETIRED-WITH-RATIONALE | (no D action; recorded in `A.md §8`) | CLOSED ✓ |
| 24 | `Ad-20` SelectContent per-instance literals | RETIRED-WITH-RATIONALE | same | CLOSED ✓ |
| 25 | `Ae-12` Aurora cursor wired separately | RETIRED-WITH-RATIONALE | same | CLOSED ✓ |
| 26 | `findings.md` (A) glass-ui HEAD `d244dd5` | OPTIONAL doc residual | `findings.md` row Da-1 → D.W6 close | FOLDED ✓ |
| 27 | `findings.md` (A) stale "planning-only" Mode line | OPTIONAL | same | FOLDED ✓ |
| 28 | `A/coordination/Q.md` phantom SPEC cite | OPTIONAL | same | FOLDED ✓ |
| 29 | `A/dispatch/AGENT.md` phantom STYLE.md cite | OPTIONAL | same | FOLDED ✓ |
| 30 | `A/waves/W7.md` phantom "dual ceiling" + stale header | OPTIONAL | same | FOLDED ✓ |

**Sweep totals**: 30 items. **CLOSED/RETIRED-WITH-RATIONALE/DERIVATIVE/MOOT**: 7 (items 14, 21, 22, 23, 24, 25, + Da-2 separate). **ROUTED-FILED to named external (glass-ui / keyframes.js)**: 9 (1, 2, 3, 4, 5, 6, 7, 8, 16). **ROUTED-NAMED-DESTINATION (in-band)**: 2 (17, 20 — generator-update). **FOLDED into D**: 7 (11, 15, 26, 27, 28, 29, 30). **GAP — not folded and not explicitly named-routed**: **5** (items 9 partial — `./configurator` adoption; 10 — 11 src/ library gaps G1–G11; 12 — `viewSchema.ts` extraction; 13 — `cssColorToRgb` memoise; 18 — K4 Prettier-doc disposition; 19 — 5-module test-coverage substrate-without-consumer). Net **6 gap-class items** vs invariant D5's "zero deferral at close." See §6 R8.

Also flagged in `Da §3.1`: **Δ5** B.W2 wave-spec drift (B.W4 added a re-scope note — partially fixed; D may verify) and **Δ6** `gh-pages` `dist/` housekeeping (stale `postcss-BrHISTov.js` etc. in `dist/`). Neither is in D's scope; both are residual-housekeeping flavours.

## §4 — Dh contract-v2 depth audit

### §4.1 — SHA `68d9b20` consistency spot-check

`68d9b20` is cited across the D substrate. The grep result (per §1 cross-walk research) hit:

- `D.md:5, 9, 34, 40, 85` — five citations, all consistent (D opens at `3c32fae`, advances to `68d9b20`, runs under invariants 30–33).
- `D-PROMPTS.md:65, 67` — two citations.
- `findings.md:57` — Dh-6 row.
- `coordination/Q.md:8, 55, 63, 86, 94, 100` — six citations, all naming `68d9b20` as fleet HEAD / Lane-0 target.
- `dispatch/AGENT.md:71` — D.W0 advance citation.
- `waves/D.W0.md:9, 13, 15-18, 20, 32, 41, 64` — Lane 0 spec; `git -C docs/precepts cat-file -t 68d9b20` is a pre-bump check.
- `waves/D.W1.md:9, 40` — wave spec + L4 verification.
- `waves/D.W6.md:19, 25` — close ceremony pin.
- `research/Dh-contract-v2.md` — 18 citations, the canonical source.
- `audit/D-HARDEN-1-waves.md:14, 202, 218` — three citations.
- `PROGRESS.md:24, 37, 59` — three citations.

**Verdict**: **CONSISTENT.** No drift detected — every citation names `68d9b20` as either the fleet HEAD (post-contract-v2) or the bump target. No `68d9b20` typo (e.g. `68d9b2`, `68db9b20`) found. The pre-bump verification (`D.W0.md:15` `git -C docs/precepts cat-file -t 68d9b20`) is the responsible gate before the SHA is committed; this is `coordination/Q.md §10` ("Open question") explicitly raised. No drift, no stale snapshot.

### §4.2 — `proof-resolution-contract.mjs` port — script-spec completeness for D.W1 Lane L3

`Dh-contract-v2.md §2.2.d` (lines 283-329) describes the port. Key facts the agent who lands L3 needs:

| Need | Available? | Where |
|---|---|---|
| Source path in glass-ui | ✓ | `Dh §1.6, §2.2.d`: `glass-ui/scripts/proof-resolution-contract.mjs` at commit `ce5aad8` |
| Target path in value.js | ✓ | `Dh §2.2.d`: `value.js/scripts/proof-resolution-contract.mjs` |
| Path resolution behaviour | ✓ | `Dh §2.2.d`: "the `ROOT`/`PARENT` paths resolve identically from any sibling's `scripts/` dir" |
| Verbatim vs. adapt? | ✓ | Recommendation: "Port verbatim" with a one-line top-of-file comment naming the upstream source SHA |
| `npm` script entry | ✓ | `Dh §5.1 L3`: `"proof:resolution": "node scripts/proof-resolution-contract.mjs"` |
| What the gate checks | ✓ | `Dh §2.2.d` sketches three checks: (1) Publisher exports shape ×3 repos; (2) Watch-build presence ×3 repos; (3) Consumer `dist/`-alias scan ×7 repos. Plus `Dh §1.6` recap: `REQUIRED_EXPORT_KEYS = ["types","import","default"]`, `FORBIDDEN_EXPORT_KEY = "development"`, `REQUIRED_PUBLISHER_SCRIPT = "build:watch"`. |
| 7-consumer constellation list | ✓ | `Dh §1.6`: "three publishers (`glass-ui`, `keyframes.js`, `value.js`) and seven consumers (those three plus `fourier-analysis/web`, `bbnf-buddy`, `words/frontend`, `speedtest`)" |
| Expected exit codes | ✓ | `Dh §2.2.d` end: "exits 0 clean, exits 1 with violation list" |
| Maintenance-drift risk acknowledgement | ✓ | `Dh §2.2.d`: "drift hazard. If glass-ui updates the gate (e.g. to add a new publisher), the value.js copy goes stale." Mitigation: top-of-file comment naming upstream source + SHA |
| Line count of the upstream script | ✓ | `Dh §2.2.d`: "364-line ESM script" |
| Expected transient RED for keyframes.js | ✓ | `D.W1.md L3` line 36 sub-bullet: "expected RED for keyframes.js until its precept-pin convergence (gate is constellation-wide; transient RED is acceptable and named in the v2 precept)" — wait, this is the **wave-spec lookup, not the research**. Cross-checking `Dh §5.1 L3`: same line says "expected RED for keyframes.js until its precept-pin convergence." Both docs consistent. |

**Verdict on L3 spec completeness**: The agent landing L3 has enough to (a) `cp glass-ui/scripts/proof-resolution-contract.mjs scripts/`, (b) add the top-of-file `// SOURCE: glass-ui:ce5aad8` comment, (c) add the `proof:resolution` npm script, (d) run it and verify the publisher-exports + watch-build checks pass for value.js's own rows. **No additional research needed.**

One minor uncovered detail: the exact text of glass-ui's `ce5aad8:scripts/proof-resolution-contract.mjs` is not quoted verbatim in `Dh` — only its three-check structure is sketched. The L3 agent has to `cat /Users/mkbabb/Programming/glass-ui/scripts/proof-resolution-contract.mjs` at execution time. This is consistent with `dispatch/AGENT.md`'s read-only cross-repo discipline (glass-ui read-only at `ce5aad8`) and the lane has the path. **Acceptable.**

### §4.3 — keyframes.js refresh — `Dh §9` framing

`Dh-contract-v2.md §4` re-verifies keyframes.js's state at HEAD `0909177`: code-side contract-v2 OK (3-key exports + `build:watch` + `vite.config.ts` `devConditions` without `development` + `fs.allow` widening retired); precept submodule at `458c2d1` (off-target vs `68d9b20`). The refreshed filing in `coordination/Q.md §9` (lines 90-96) says "code-side OK; the only remaining drift is the `docs/precepts` submodule pin." This is consistent and unambiguous.

`Dh §4.2` (lines 449-460) writes the precise convergence ask: "Please advance the keyframes.js precept pin to `68d9b20` at your convenience. Nothing in keyframes.js source needs to change; this is a one-line submodule bump." `Q.md §9` mirrors this.

**Verdict**: The keyframes.js refresh is unambiguously framed. The B-vintage `coordination/Q.md §9` "6 keyframes.js gaps" is correctly retired-and-re-stated (`Q.md §9` lines 93-95: "The B-vintage filing's '6 keyframes.js gaps' framing… was a maintainability inventory; those items route to keyframes.js's own maintenance schedule"). No ambiguity remains.

### §4.4 — Overall Dh depth verdict

**ADEQUATE for D.W1 Lane L3 to execute without further research.** SHA-consistent across the substrate; script-spec lays out source, target, three checks, constellation list, and the `proof:resolution` script line; keyframes.js refresh is unambiguous. The two documented-but-not-pre-fetched items (the exact upstream script text, the `cross-repo-dev-resolution.md` v2 text content under `68d9b20`) are both expected to be re-read at L3 execution per the read-only-cross-repo discipline. Neither is a blocker.

## §5 — Research-letter convention check

D.md §10 line 100: "Greek-sequence convention `Dα = Da, Dβ = Db, Dγ = Dc, Dδ = Dd, Dε = De, Dζ = Df, Dη = Dg, Dθ = Dh` — Latin sequence already contiguous (no rename needed)."

Filesystem evidence (`ls research/`): `Da-hitherto-deferrals.md`, `Db-backend-legacy.md`, `Dc-aurora.md`, `Dd-blob.md`, `De-frontend-god-modules.md`, `Df-styling.md`, `Dg-playwright-coverage.md`, `Dh-contract-v2.md`. **8 files, Latin a..h, contiguous.** ✓

No skipped letters; no Greek-sequence aliasing required (the doc names use Latin, which is already contiguous through `h`). The Greek-mapping in D.md §10 is a documentation-side affordance for cross-tranche reference style only.

**Verdict**: ✓ contiguous. Compare to A's tranche which needed an `Ag→Ac` rename per `B/audit/B.W4-doc-drift §1`; D's planning got the letter discipline right from the open.

## §6 — Prioritized hardening recommendations

### R1 — Frontend fail-explicit extension (clauses 16, 21; partial coverage)

**Gap**: invariant D3 binds backend (D.W2) but `dispatch/AGENT.md:32` line scopes it "for the backend wave (D.W2) especially." The frontend has its own silent-graceful sites (e.g. `?? null` defaults in composables, `try {} catch {}` blocks in `usePaletteManager.ts`-class facade code). D.W3 (frontend) does not enumerate fail-explicit sites.

**Recommendation**: in D.W3 or D.W4, add a Lane D (a small fail-explicit sweep) — `grep -rn '?? null\|console\.warn\b\|catch\s*({}\|catch\s*(e)\s*{}' demo/@/` and triage each match: excise, fail-explicit, or rationale-comment. Per the precept's `README.md:54-64`, the same distinction applies frontend-side (library-internal contract violations throw; browser-API degradation paths befit silent fallbacks). A lane-D doesn't have to be heavy — 30 minutes, declarative, mostly verification.

### R2 — Codify "no effusive dynamicism" (clause 22; GAP)

**Gap**: clause 22 ("No effusive dynamicsim") is not explicitly addressed. The directive's "no effusive dynamicism" suggests an aversion to runtime indirection / dynamic dispatch / eval-shaped code.

**Recommendation**: codify as **invariant D6 — explicit pipeline, no runtime indirection** in `D.md §2`:

> D6 — Explicit pipeline. No runtime string-keyed dispatch, no `defineAsyncComponent` without a typed registry, no `<component :is="dynamicName">` without `ViewId`-class enumeration, no `(req as any)[handlerName]`-style dispatch in route handlers. The pipeline is static + typed + visible at audit-walk time.

Tie-in: D.W2 Lane C's repository layer (`api/src/db/collections.ts` typed factory) is already this shape (`typed collections{}`); naming D6 codifies the discipline. D.W3 Lane A's `TabValue`/`ViewId` reconcile is also this shape. Adding D6 names the existing discipline rather than introducing new work.

### R3 — Name the precept-citations on D1, D2, D5 (subsumption-hygiene)

**Gap**: D2 mirrors `README.md:17-19`; D5 mirrors `README.md:25-27` + `SPEC.md §172` "P invariant 28." `D.md §2` does not cite either.

**Recommendation**: add a one-line precept citation to D2 and D5 in `D.md §2`. Examples:

> 2. **D2 — Abrogate before patch** (per precept `README.md §Edicts` "Abrogate before patch", invariant 28 lineage).
> 5. **D5 — Zero deferral at close** (per precept `README.md §Edicts` "No silent deferrals" + `SPEC.md §Close` "P invariant 28 Zero deferral at tranche close").

This is a 4-line edit; closes the subsumption-without-citation hygiene gap.

### R4 — Add `lint` npm script (clause 26; GAP)

**Gap**: `package.json` has `prettier` (devDependency, formatter) but no `lint` script. `dispatch/AGENT.md:28` cites "`vue-tsc --noEmit` + `npm test` + `npm run test:e2e -- --project=smoke`" — no lint step. Clause 26 of the directive ("Run linting and type checking … at every interval") is not satisfiable today.

**Recommendation**: D.W0 Lane A's state-at-open recording should call this out; D.W1 or D.W3 should add either:
- `"lint": "prettier --check '{src,demo,api,e2e,test}/**/*.{ts,vue,css}'"` (Prettier-only, low-effort), OR
- `"lint": "vue-tsc --noEmit && prettier --check …"` (composite), OR
- Install ESLint with vue + typescript-eslint plugins (medium effort, more substantive).

The simplest defensible disposition is option (1) and update `dispatch/AGENT.md:28` to `vue-tsc --noEmit + npm run lint + npm test + npm run test:e2e`. The directive does NOT require ESLint specifically — "linting" is satisfied by Prettier-as-formatter-check in many JS shops. **Recommend option (1) at D.W0 or D.W1.**

### R5 — Add nested-import + test-in-src ongoing gates (clauses 23, 24)

**Gap**: `De §7.1, §7.2` verify zero hits at audit time; neither has an ongoing gate. The audit-time verification can drift if a future wave introduces a deep relative import.

**Recommendation**: add a one-line check to the D.W0 state-at-open script and the D.W6 integrity sweep — `grep -rn 'from\s*"\(\.\./\)\{2,\}' demo/@/ src/` returns zero; `grep -rln 'describe(\|it(\|from "vitest"' src/` returns zero. Both are 5-second checks; record the zero-hit count in `audit/D.W0-state-at-open.md` and re-verify at D.W6.

### R6 — Fold the `./configurator` adoption (item 9; GAP)

**Gap**: `Da §3` item 9 names the demo-side blob/aurora abstraction as glass-ui-blocked-except-for-`./configurator`. The `./configurator` surface ships in glass-ui (per `Da §3` row 9: "the `./configurator` surface ships"); migrating `ConfigSliderPane.vue` onto it is unblocked. Currently the broader "demo-abstraction tranche" routing absorbs this — but the routing is ambiguous because the broader work is glass-ui-ship-gated and `./configurator` is not.

**Recommendation**: either (a) name `ConfigSliderPane.vue → ./configurator` as a small follow-up lane in D.W3 or D.W4 (it touches frontend, modest scope), or (b) split the routing in `findings.md §3` to two named destinations: "blob/aurora value.js-side migration (glass-ui-ship-gated)" AND "`./configurator` adoption (unblocked; demo-only)." Option (a) is more invariant-D5-clean; option (b) keeps D's scope tight.

### R7 — Name invariant-33 gate script in D.W2 Lane D (gate-naming hygiene)

**Gap**: `D.md:34` "Invariant-33 gates the backend dead-code excisions"; `D.W2.md:54-56` lists the excisions but does not name the gate script `proof-phantom-classes.mjs --pre-deletion`. Precept binds (`LESSONS-LEARNED.md:605`).

**Recommendation**: in `D.W2.md` Lane D sub-gate D, add: "Invariant-33 evidence: run `proof-phantom-classes.mjs --pre-deletion` (or the value.js equivalent) over the corpus before `api/dist/` + `migrate-*.ts` delete commits; record zero-match for the deleted symbols' identifiers in the commit body." If value.js doesn't have a `proof-phantom-classes.mjs` script, the wave should either port from glass-ui (alongside L3's `proof-resolution-contract.mjs` port) or document a substitute (e.g. `grep -rn 'migrate-oklab\|migrate-slugs' api/src/` = 0).

### R8 — Address or explicitly route the 6 GAP items (item 9 partial, 10, 12, 13, 18, 19)

**Gap**: per §3 sweep, 6 items from `Da §3` are not folded into D and not explicitly named-routed. This violates invariant D5 ("zero deferral at close — every research finding lands in D, retires with recorded rationale, or names a cross-repo destination"). The aggregate verdict is **NOT yet D5-clean**.

**Recommendations per item**:
- Item 9 (`./configurator` adoption): see R6.
- Item 10 (G1–G11 library gaps): G1 (2-line barrel add for `registerColorNames`/`clearCustomColorNames`) + G11/K5 (1-line `solveCubicBezierX` export) = 3 lines total. **Fold into D.W1** (alongside contract-v2 — they're both library-`src/` edits).
- Item 12 (`viewSchema.ts` extraction): the partial coverage via `TabValue` reconcile in D.W3 Lane A is good. **Either expand D.W3 Lane A to do the full extract** (route through `ViewId`, `LeftPane`, `RightPane`, `PaneConfig`, `VIEW_MAP`) **or explicitly retire-with-rationale** (the 4-copy `ViewId` enumeration is documented; leaving it is defensible if there's a reason).
- Item 13 (`cssColorToRgb` memoise): 5-line edit at `useMetaballRenderer.ts:174`; independent of the lifecycle-extirpation question. **Fold into D.W4** (cosmetic perf; low-risk) **or D.W3 Lane C** (Vue 3.5 codemod also touches composables).
- Item 18 (K4 Prettier-doc): **either confirm-as-keyframes.js-repo** and add to `Q.md §9` (one-line), **or retire-with-rationale** in `findings.md §3`. The unknown disposition is the violation.
- Item 19 (5-module test-coverage): substrate-with-consumer precept directly binds. **Fold into D.W1** (alongside library hygiene) **or open a small D.W3.5 lane** — add vitest specs for the 5 modules (`parsing/animation-shorthand`, `extract`, `serialize`, `stylesheet`; `units/interpolate`). ~25-line spec each = ~125 lines total.

Each of R8's six sub-items is a small mechanical edit. Folding them tightens D5 from "approximate" to "actual" zero-deferral.

### Priority ordering of R1–R8

| Priority | Recommendation | Effort | D wave |
|---|---|---|---|
| **P1 (load-bearing)** | R8 (close the 6 gap items — folds + namings) | small-medium total | D.W1 / D.W3 / D.W4 (per item) |
| **P1** | R2 (codify D6 — no effusive dynamicism) | 4-line edit | `D.md` + `dispatch/AGENT.md` |
| **P2** | R4 (add `lint` script) | 5-line edit | D.W0 or D.W1 |
| **P2** | R1 (frontend fail-explicit sweep) | 30 min lane | D.W3 or D.W4 |
| **P3** | R7 (name invariant-33 gate script) | 2-line edit | D.W2 Lane D spec |
| **P3** | R3 (precept-citation on D2/D5) | 4-line edit | `D.md §2` |
| **P3** | R5 (ongoing nested-import + test-in-src gates) | 2-line additions | D.W0 + D.W6 specs |
| **P3** | R6 (split or fold `./configurator`) | scope-decision | `findings.md §3` or D.W3 |

P1 items materially change D's scope or invariant set; P2 items improve D's evidence; P3 items are gate-naming and citation hygiene.

---

**End of D-HARDEN-6.** Verdict: clause-cross-walk 33/35 addressed-or-filed (94%); invariant model D1–D5 mostly distinct with two subsumption-without-citation hygiene gaps (D2/D5) and one missing invariant candidate (D6 "no effusive dynamicism"); chronically-deferred sweep finds 6 items not folded and not explicitly named-routed (violates D5 strictly); Dh contract-v2 SHA-consistent and L3-implementable; research-letter convention contiguous Latin a..h.
