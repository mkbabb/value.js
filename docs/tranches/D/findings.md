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
