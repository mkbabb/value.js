# D — Findings + audit-to-wave mapping

**Tranche letter**: D (value.js, third tranche).
**Date opened**: 2026-05-19.
**Repo HEAD at open**: the B.W4 close commit (`tranche-b` tip).
**Mode**: planning-only at open.

## §1 — Source

Verbatim user-prompt and precept recap is in `D-PROMPTS.md` — the single prompt ledger. The 8-lane research wave that opens this tranche is in `research/Da..Dh`. This file does not duplicate; it maps every finding to a wave.

## §2 — Audit-to-wave mapping

Every research finding from the 8 audit lanes lands in a wave, retires with recorded rationale, or has a named cross-repo destination. Per invariant D5, nothing is silently deferred.

| # | Finding | Source | Wave | Disposition |
|---|---|---|---|---|
| Da-1 | 30 chronically-deferred items catalogued | `research/Da-hitherto-deferrals.md §3` | various | 5 closed (verified); 8 routed glass-ui; 1 routed keyframes.js; 11 actionable in-repo (folded below); 5 historical doc residuals (`A/findings.md` glass-ui-HEAD, Mode line, etc.) → **D.W6** close ceremony |
| Da-2 | All 13 user mandates closed-or-routed (9 FULL, 3 OPEN-WITH-DESTINATION, 1 closed B.W3) | `research/Da-hitherto-deferrals.md §1` | — | verified at A/B close; no D action |
| Db-1 | `api/routes/palettes.ts` 845 lines (god module, 6 concerns) | `research/Db-backend-legacy.md §1` | **D.W2** | split per-concern into a route + service + repo triple |
| Db-2 | `api/routes/admin.ts` 750 lines (god module, 8 concerns) | `research/Db-backend-legacy.md §1` | **D.W2** | same split pattern |
| Db-3 | 157 direct `db.collection(...)` + 123 inline Mongo ops in route handlers | `research/Db-backend-legacy.md §2` | **D.W2** | introduce repository layer; routes call repositories, never `db` directly |
| Db-4 | 31 `as any` casts | `research/Db-backend-legacy.md §2` | **D.W2** | typed `collections{}` factory; `as any` count → 0 (or each remaining annotated) |
| Db-5 | 6 silent-fallback sites (F1–F3 / W2–W4) | `research/Db-backend-legacy.md §2` | **D.W2** | excise or fail-explicit per the D3 invariant |
| Db-6 | `api/dist/` checked-in build artefacts | `research/Db-backend-legacy.md §6` | **D.W2** | retire; `.gitignore`; rebuild discipline |
| Db-7 | `api/src/migrate-{oklab,slugs}.ts` one-shot migration scripts | `research/Db-backend-legacy.md §6` | **D.W2** | delete (migrations are done) |
| Db-8 | `api/CLAUDE.md` claims 5 collections / 11 indexes; reality is 9 / 24 | `research/Db-backend-legacy.md §4` | **D.W2** | reconcile in the wave's doc-drift step |
| Db-9 | No zod validation; bespoke route orchestration | `research/Db-backend-legacy.md §3` | **D.W2** | adopt zod; pipeline `validate → service → repository → response` |
| Dc-1 | glass-ui ships no `deriveAuroraPalette` (the load-bearing gap) | `research/Dc-aurora.md §2` | **filed** | glass-ui successor tranche; `coordination/Q.md §3` row sharpened with the algorithm sketch |
| Dc-2 | Older aurora `deriveColors` algorithm recovered from glass-ui `637955b` | `research/Dc-aurora.md §3` | **filed** | algorithm sketch lives in `Dc-aurora.md §3`, ready for glass-ui consumption |
| Dc-3 | W0 swap to static `DEFAULT_AURORA_CONFIG`; AuroraPane "under rework" | `research/Dc-aurora.md §4` | **routed** | a value.js demo-abstraction tranche post-glass-ui-ship |
| Dd-1 | bespoke `useMetaballRenderer.ts` 333 lines duplicates glass-ui `useMetaballs` | `research/Dd-blob.md §1` | **filed** | precept-§10 wire-before-retire blocked; glass-ui must ship `positionSource` first |
| Dd-2 | 5 named glass-ui metaballs gaps + 2 newly filed (G6/G7) | `research/Dd-blob.md §3` | **filed** | `coordination/Q.md §3` rows refreshed with the 7-addition surface |
| Dd-3 | `WatercolorDot.vue` + `useWatercolorBlob.ts` — 11 consumers waiting on `BlobDot` | `research/Dd-blob.md §2` | **filed** | glass-ui must ship `BlobDot` first |
| Dd-4 | Extirpation file delta ≈ −865 demo LoC, post-glass-ui-ship | `research/Dd-blob.md §5` | **routed** | value.js demo-abstraction tranche |
| De-1 | `PaletteDialog.vue` 652 lines (1 god module) | `research/De-frontend-god-modules.md §1` | **D.W3** | split into a colocated `PaletteDialog/` dir + migrate to consume `PALETTE_MANAGER_KEY` |
| De-2 | `TabValue` union ≠ rendered trigger count (5 vs 8) | `research/De-frontend-god-modules.md §2` | **D.W3** | reconcile; fix the drift in the split |
| De-3 | 10 component-side `@lib/palette/api` imports — incomplete facade | `research/De-frontend-god-modules.md §8` | **D.W3** | lift into `palette/use*.ts` composables |
| De-4 | 38/40 custom SFCs use `const props = defineProps<>` instead of Vue 3.5 reactive destructure | `research/De-frontend-god-modules.md §6` | **D.W3** | codemod to `const { foo, bar = …} = defineProps<>()` |
| De-5 | 8 SFCs use `ref<HTMLElement>` instead of `useTemplateRef` | `research/De-frontend-god-modules.md §6` | **D.W3** | small migration |
| De-6 | One dead `provide("auroraConfig", …)` at App.vue (no consumers) | `research/De-frontend-god-modules.md §5` | **D.W3** | remove |
| De-7 | KEEP composable-facade + InjectionKey; NO Pinia | `research/De-frontend-god-modules.md §4` | — | architectural verdict, no D action |
| Df-1 | ~43 arbitrary `[var(--…)]` Tailwind reaches that should be first-class utilities | `research/Df-styling.md §1` | **D.W4** | surface as Tailwind utilities (`tailwind.config` or `@utility`) |
| Df-2 | 4 style.css colocation candidates | `research/Df-styling.md §7` | **D.W4** | move `.pane-scroll-fade`, touch-gate cluster, `.palette-tab-content`, `.palette-card-grid` to component-scoped |
| Df-3 | Design-idiom catalog should expand `demo/DESIGN.md` (NOT a new `design-idioms.css`) | `research/Df-styling.md §6` | **D.W4** | expand DESIGN.md to ~150 lines as the catalog |
| Df-4 | Minor design-cohesion drift (3 mono stacks, hero-lab `999px`, redundant fallback) | `research/Df-styling.md §8` | **D.W4** | small reconciliations |
| Df-5 | 1 fragile coupling (`pane-container` max-width ↔ `.app-layout` 1rem padding) | `research/Df-styling.md §2` | **D.W4** | name the coupling explicitly OR break it |
| Df-6 | `:deep(svg)` and `button:has(> .lucide-x)` brittle selectors | `research/Df-styling.md §5` | **D.W4** | replace with role/label or `data-*` |
| Dg-1 | 14 views (9 user + 5 admin); 3 smoke specs currently cover boot + 2 transitions | `research/Dg-playwright-coverage.md §1-2` | **D.W5** | 3 → ~20 specs (per-view + walk + WebGL + mobile probe) |
| Dg-2 | Admin auth mock via `addInitScript` localStorage seeding | `research/Dg-playwright-coverage.md §2` | **D.W5** | `smoke-admin` project + the fixture |
| Dg-3 | Mobile re-introduce one Pixel-7 single-spec probe | `research/Dg-playwright-coverage.md §6` | **D.W5** | `smoke-mobile` project |
| Dh-1 | Contract-v2 spec — drop `development`, `build:watch`, invert proof gate | `research/Dh-contract-v2.md §1` | **D.W1** | 5 lanes, single wave |
| Dh-2 | `package.json` `exports` drop `development` key | `research/Dh-contract-v2.md §2 L1` | **D.W1** | `{types, import, default}` only |
| Dh-3 | Add `"build:watch": "vite build --mode production --watch"` | `research/Dh-contract-v2.md §2 L1` | **D.W1** | |
| Dh-4 | `vite.config.ts` delete `demoConditions` + `demoServerFsAllow` | `research/Dh-contract-v2.md §2 L2` | **D.W1** | |
| Dh-5 | Port `scripts/proof-resolution-contract.mjs` from glass-ui | `research/Dh-contract-v2.md §2 L3` | **D.W1** | + `"proof:resolution"` npm script |
| Dh-6 | `docs/precepts` submodule bump `3c32fae → 68d9b20` | `research/Dh-contract-v2.md §2 L4` | **D.W0** | Lane 0 (the open-wave precept advance) |
| Dh-7 | keyframes.js code-side contract-v2 OK at `0909177`; only precept-pin is off-target | `research/Dh-contract-v2.md §4` | **filed** | `coordination/Q.md §9` refreshed |
| HARDEN-1 | W2/W3 are file-disjoint and gate-disjoint — the linear schedule was illusory | `audit/D-HARDEN-1-waves.md §3` | **D.md §3** | critical path noted as **6 wave-slots** (W2 ∥ W3 allowed); orchestrator may serialize for gate-isolation |
| HARDEN-3a | D.W2 Lane C #2 repository list hallucinated `color_names`+`color_proposals` (don't exist) and omitted `votes` | `audit/D-HARDEN-3-backend.md §1` | **D.W2** | corrected to the real 9 collections (`palettes`, `palette_versions`, `votes`, `sessions`, `proposed_names`, `tags`, `flags`, `admin_audit`, `users`) |
| HARDEN-3b | D.W2 lane order (A∥B → C → D) breaks the dependency: A/B write services that call `db.collection(…)` until C lands the repos | `audit/D-HARDEN-3-backend.md §7` | **D.W2** | re-ordered to **C → (A ∥ B) → D**; Lane C lays the rails first |
| HARDEN-3c | 4 missed Db findings: F6 crypto-import, C3 LRU triplication, C4 SIGTERM, F1 migration-evidence | `audit/D-HARDEN-3-backend.md §1` | **D.W2 Lane D** | folded as item 4 (4 missed findings) |
| HARDEN-3d | Architectural pins unspecified: DI via Hono context middleware; route-as-controller; transactional boundary for cross-collection writes | `audit/D-HARDEN-3-backend.md §2` | **D.W2 Lane C** | pinned (items 5, 9, 10) |
| HARDEN-3e | Fail-explicit dispositions: F1 needs migration smoke-probe; F3 was wrong (NOT 409 — it breaks toggle; use idempotent upsert + gated `$inc`); W3 should log+rationale not fail-request; W4 name library-throw | `audit/D-HARDEN-3-backend.md §3` | **D.W2 Lane D** | revised |
| HARDEN-3f | Db research §6 L2 said `api/dist/` is checked in — FALSE (`.gitignore:11` already excludes) | `audit/D-HARDEN-3-backend.md §3` | **note** | corrected in D.W2 §Scope; action is local-cleanup only |
| HARDEN-4a | `PaletteDialog` split = 12 files (1 shell + 7 components + 3 composables + constants); no `skeletons/` (no Suspense today) | `audit/D-HARDEN-4-frontend.md §2` | **D.W3 Lane A** | concrete tree pinned |
| HARDEN-4b | TabValue is NOT a union drift — `PaletteControlsBar.vue:38-46` renders 3 admin-only triggers with no matching TabsContent (admin views live in AdminPane) | `audit/D-HARDEN-4-frontend.md §2` | **D.W3 Lane A** | reframed: fix the controls bar, not TabValue |
| HARDEN-4c | Facade is 11 consumers (missed `VersionHistoryDrawer.vue:110`), NOT 10; lift into 5 sub-composables exposed as `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` sub-objects (NOT flat methods — pm is already 50+ members) | `audit/D-HARDEN-4-frontend.md §3` | **D.W3 Lane B** | restructured |
| HARDEN-4d | Codemod is 32 SFCs (not 38); 2 hand-conversion sites (`GooBlob.vue:41` toRef explicit, `ImageEyedropper.vue:336` after-split) | `audit/D-HARDEN-4-frontend.md §4` | **D.W3 Lane C** | sequenced |
| HARDEN-4e | `viewSchema.ts` extraction was un-folded in D — strict D5 violation | `audit/D-HARDEN-4-frontend.md §5` | **D.W3 Lane D (new)** | folded as the 4th lane |
| HARDEN-4f | 3 missed De sub-findings + the `cssColorToRgb` per-frame hot-spot + `./configurator` adoption | `audit/D-HARDEN-4-frontend.md §1, §6` | **D.W3 Lane A/B/C** | folded (Lane A: ImageEyedropper split + ConfigSliderPane→./configurator + CURRENT_PALETTE_ID; Lane B: useColorNameQueue + useAdminOperations; Lane C: cssColorToRgb memoise) |
| HARDEN-5a | D.W4 pixel gate was 1% — should be 0% with an enumerated drift list | `audit/D-HARDEN-5-styling-e2e-filings.md §2` | **D.W4 Sub-gate A** | tightened to 0% + 3-row drift table |
| HARDEN-5b | D.W5 had a picker double-spec; WebGL was compacted 2→1 | `audit/D-HARDEN-5-styling-e2e-filings.md §3` | **D.W5 Lane A** | picker dropped; WebGL split into 2 specs |
| HARDEN-5c | Pixel-7 emulation runs Chromium not WebKit — iOS-Safari engine bugs uncaught | `audit/D-HARDEN-5-styling-e2e-filings.md §4` | **D.W6 §close** | filed as `smoke-safari` named-destination follow-up beyond D |
| HARDEN-5d | Aurora filing missing grayscale C=0 handling | `audit/D-HARDEN-5-styling-e2e-filings.md §6` | **coordination/Q.md** | one-line clarification recorded in the aurora row + Dc-aurora.md §3.2 |
| HARDEN-6a | Clause 22 "no effusive dynamicism" had no D-side binding | `audit/D-HARDEN-6-prompts-invariants.md §2` | **D.md §2 (new D6)** | codified as invariant D6 ("explicit pipeline / no effusive dynamicism") |
| HARDEN-6b | Clause 26 "Run linting" — no `lint` script in `package.json` | `audit/D-HARDEN-6-prompts-invariants.md §1` | **D.W1 Lane L7** | `lint` script + eslint config + CI step |
| HARDEN-6c | Fail-explicit (D3) was named for backend only — should bind frontend too | `audit/D-HARDEN-6-prompts-invariants.md §1` | **D.md §2** | D3 expanded to "across the whole codebase, not only the backend" |
| HARDEN-6d | 6 chronically-deferred items un-folded — strict D5 violation | `audit/D-HARDEN-6-prompts-invariants.md §3` | **D.W1/W3/W6** | all 6 folded: items 9, 10, 12, 13 to W1/W3; item 18 to W6; item 19 to W1 |
| LIB-L1 | **Color<T> stores components as `Map<string, T>`** — V8 hidden-class miss per channel-read; per-frame allocations from `keys()`/`values()`/`entries()`; Color.clone() double-init via Map+forEach. The largest-evidence library-perf finding. | Di (research) + CHALLENGE-Di upheld; surviving P1 in `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §1 L1` | **D.W1 Lane L8 (NEW)** | flatten `Color<T>` to own-property storage; the 15 space classes declare their channels directly; ~20 consumer files; preserves the public API (better than Map-keyed access — typed `.L`/`.a`/`.b`). |
| LIB-L3 | **`parseCSSColor` not memoized** despite CLAUDE.md contract parity with the 6 sibling parsers; load-bearing hot consumer is `useSafeAccentFn().safeCss()` non-debounced list-render. | Dj P1 + CHALLENGE-Dj upheld | **D.W3 Lane C** | mirror existing memo wrapper + invalidation hook from `registerColorNames` + JSDoc "MUST NOT mutate"; ≤ 10 lines library-side. |
| LIB-L4 | **`evaluateSimpleCalc` uses `new Function()`** at `src/parsing/color.ts:78` — D6 ("no effusive dynamicism") violation; redundant with the calc() AST evaluator value.js already ships. Two research lanes (Di B1 + Dm FE7) flagged independently. | Di + Dm + both CHALLENGES upheld | **D.W2 Lane D** | replace with `evaluateCalc(parseCSSMath(input))`; deletes the dynamic-eval. |
| LIB-L5 | **`lerpColorValue` discards `hueMethod`** — animations between `oklch(50% 0.2 350°) → oklch(50% 0.2 10°)` go the long way round (340° via 180°) instead of CSS Color 4 §12.4's default `shorter` (20° via 360→0). | Dl P1 + CHALLENGE-Dl UPHELD AS LOAD-BEARING but rejected the "one-branch fix" framing | **D.W3 Lane C** | 3-file change: `InterpolatedVar` type extension, `normalizeColorUnits` carry-through, `lerpColorValue` dispatch. |
| LIB-L6 | **`parseCSSValue("inherit"|"unset"|"initial"|"revert")` loses `CSSWideKeyword`** — the public `ValuesValue` combinator drops the keyword branch present in the internal `Value` (`src/parsing/index.ts:251`). | Dm cross-cutting + CHALLENGE-Dm upheld | **D.W1 Lane L6** | 1-line restoration in the public combinator chain. |
| LIB-L7 | **Color function names case-sensitive** — `RGB(...)` / `OKLCH(...)` / `CALC(...)` rejected despite CSS Color L4 / CSS Values 4 ASCII case-insensitivity mandate; `colorMixSpace` already uses `istring` (internal inconsistency). | Dm cross-cutting + CHALLENGE-Dm upheld | **D.W1 Lane L6** | replace `string(name)` with `istring(name)` in color/math function entries. |
| LIB-L9 | **Targeted `decompose` test coverage gap** — `test/refactor-fixes.test.ts:221-355` covers identity/translation/rotation+translation/slerp; genuine gaps are scale, skew, perspective, full-compose round-trip, and the 4 quaternion-extraction branches. CHALLENGE-Dk reduced the original "no direct coverage" claim. | Dk P1 + CHALLENGE-Dk reduced | **D.W1 Lane L7** | ~40 LoC of targeted cases + `test/colorFilter-spsa.test.ts` for the SPSA optimizer Dk missed. |
| LIB-L10 | **Export `type TimingFunction = (t: number) => number`** — value.js exports no canonical name (no `EasingFunction` either); keyframes.js parallel-defines 3 lines of it. | Dn K7 + CHALLENGE-Dn upheld | **D.W1 Lane L6** | 1-line type alias export from `src/easing.ts`. |
| LIB-C1 | **`AnimationOptions` name collision** between value.js (CSS-shorthand-string type) and keyframes.js (engine-callable type) — silent shadow with two different shapes. | Dn K6 + CHALLENGE-Dn upheld | **D.W1 Lane L6** (value.js-side rename) + **coordination/Q.md §9** (keyframes.js-side import update ask) | value.js renames to `CSSAnimationOptions`. |
| LIB-C2 | **parse-that cross-realm Parser-class hazard** (reframed from "pin desync") — `^0.8.1` vs `^0.8.2` pin difference is cosmetic; the real hazard is nested `node_modules/@mkbabb/value.js/node_modules/@mkbabb/parse-that` doubling from `file:..` linking. | Dn K8 + CHALLENGE-Dn REFRAMED | **coordination/Q.md §9** | ask keyframes.js to declare parse-that as a peer-dep or arrange workspace hoisting. |
| LIB-RX | **12 REJECTED claims** — R1–R12 in `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §5`: `resolveTimingFunction` ship (arithmetic shortcut, net-wash); `flattenValueTree` (single consumer, KISS); 11 memo anti-recommendations (`color2`/`mixColors`/`solveCubicBezierX`/`toFormattedString`/etc — all rejections upheld); several Di V8 framings (bimorphism, TS-index-signature, megamorphic). The challenge protected against premature optimization. | research → CHALLENGE rejected | **no fold-in** | recorded in the synthesis doc with the rejection reasoning. |

## §3 — Items NOT folded into D (named destinations, not silent deferrals)

- **Aurora derive-from-color value.js-side migration** — precept-§10 blocked. Routes to a value.js demo-abstraction tranche post-glass-ui-ship. The algorithm sketch is preserved in `research/Dc-aurora.md §3`, the augmentation surface filed in `coordination/Q.md §3`.
- **Blob value.js-side extirpation** — same precept-§10 block; same routing.
- **The ~126 generated shadcn-vue typecheck cluster** (`ui/auto-form`, `ui/button`, `ui/chart`, `ui/calendar`, …) — vendored/generated; routes to a generator-update / vendoring-policy effort.
- **glass-ui side ships** (the 7 metaballs additions, `BlobDot`, `deriveAuroraPalette`, `<Tabs variant="underline">`, the standing primitive gaps) — glass-ui successor tranche.
- **keyframes.js side ships** — keyframes.js's own maintenance schedule.

## §4 — Mandate coverage (across A + B + D)

| User mandate (A turn-1) | Status |
|---|---|
| 1–7 styling + design audit | FULL — A.W1–W3, B.W1, completed-or-routed |
| 8 root-level restyling (4 glass-ui-side root fixes) | OPEN — glass-ui successor |
| 9 glass-ui for all | PARTIAL — D.W4 design-idiom catalog finishes the styling side; blob/aurora glass-ui-blocked |
| 10 flatten complex components | A.W4 + B.W2 (usePaneRouter) + **D.W3** (PaletteDialog split) |
| 11 skip duplicates | FULL |
| 12 gaps in value.js AND glass-ui | A.W6 + B.W3 + **D files glass-ui-side** ships |
| 13 Playwright user + admin flows; blob/aurora | **D.W5** expands to ~20 specs incl. all admin views; blob/aurora glass-ui-blocked |

After D closes: every mandate FULL, the cross-repo asks named-routed, the backend surgically modernized. The user's D-opening clauses (`D-PROMPTS.md §1`) map 1:1 to D's waves W0–W5 + the filings.
