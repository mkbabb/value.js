# D.W6 close audit lane 2 — substrate-without-consumer

**Mode**: read-only — verify every piece D introduced has a consumer.
**Verdict**: **PASS** — zero orphans.

## D.W1 substrate

| Substrate | Consumer | Verified |
|---|---|---|
| `ColorChannel<T>` brand (45 declare-applications) | 15 color-space classes in `src/units/color/index.ts` | `grep -c "ColorChannel" src/units/color/index.ts` ≥ 15 |
| DEV-only `_assertChannel` (production-bundle stripped) | Every channel-setter site in 15 color-space classes | `grep "_assertChannel" dist/value.js` returns 0 (DCE-verified) |
| `test/recursion-guard.test.ts` (5 named tests) | vitest CI step + L8 sub-gate | `npx vitest run test/recursion-guard.test.ts` — 5 passing |
| `bench/color-channel-access.mjs` | orchestrator runs at merge gate (this close) + D-RELEASE-PLAN §3 gate 4 | 3 runs at D.W6 open: 10.02× / 10.09× / 10.67× medians, all ≥ 5× |
| `scripts/proof-resolution-contract.mjs` | `npm run proof:resolution` + CI step + D.W6 gate 5 | PASS at D.W6 open |
| `eslint.config.js` flat config | `npm run lint` + CI step + D.W6 gate 4 | exit 0 at D.W6 open |
| 7 new vitest test files (5 src/-WIP coverage + decompose-targeted + colorFilter-spsa) | vitest 1409 → 1582 (26 → 34 files) | `npx vitest run` 1582 passing |
| L6 G1+G11/K5 exports (registerColorNames, clearCustomColorNames, getCustomColorNames, solveCubicBezierX) | barrel `src/index.ts` re-exports + external API surface for v0.6.0 | verified at `src/index.ts` |
| L6 CSSWideKeyword fix (parseCSSValue) | public parseCSSValue contract | `parser-snapshot.test.ts` (renamed at D.W6) covers |
| L6 case-insensitive function names (RGB/OKLCH/CALC) | parseCSSColor + parseCSSMath | `parser-snapshot.test.ts` covers |
| L6 `TimingFunction` type export | barrel + keyframes.js consumer (filed in coord/Q.md §9.4) | `grep TimingFunction src/index.ts` matches |
| L6 `CSSAnimationOptions` rename (formerly AnimationOptions) | 14 internal sites + filed coord/Q.md §9.5 for keyframes.js | barrel exports `CSSAnimationOptions` |

**D.W1 substrate**: every primitive has at least one consumer. **PASS.**

## D.W2 substrate

| Substrate | Consumer | Verified |
|---|---|---|
| `api/src/db/collections.ts` (typed collection factory) | every repository in `api/src/repositories/` | 9 repos × N consumers; zero `db.collection` outside repos (per `audit/D.W2-Lane-D-final.md`) |
| `api/src/models.ts` (9 typed document interfaces) | repositories + services + format/palette.ts | type-checked at api tsc clean |
| `api/src/repositories/*.ts` (9 files) | services + middleware/inject-services.ts | 9 repos × consumers across `services/palette/` (7) + `services/admin/` (9) + `format/palette.ts` |
| `api/src/errors/index.ts` (ApiError + 7 subclasses + toResponseEnvelope) | `index.ts:app.onError` global handler + every service throw site | `grep "throw new" api/src/services` returns N matches; ApiError exclusively |
| `api/src/events/auditLog.ts` (canonical emitAuditEvent) | 17 admin WRITE op sites in `services/admin/` | verified at D.W2 Lane B close; audit emit count matches WRITE-op count |
| `api/src/middleware/inject-services.ts` (DI via Hono context) | every route handler that reads `c.var.services` | registered before resolveSession in `index.ts` |
| `api/src/middleware/require-ownership.ts` | palette routes (PATCH/DELETE/revert) | `grep "requireOwnership" api/src/routes/palettes/` matches |
| `api/src/validation/{palette,admin,session,color}.ts` (zod schemas) | every route family entry point | type-checked + ValidationError on parse failure |
| `api/src/format/palette.ts` (shared formatPalette) | services/palette/* + routes/palettes/* | C1 Db lift; shared utility |
| `api/src/cache/lru.ts` (LRU<K,V> consolidated) | middleware.ts (rate-limits + session resolution) | 3 LRUs consolidated per D.W2 Lane D C3 |
| `api/src/migrations/check.ts` (startup smoke probe) | `index.ts` startup sequence step 3 | F1 fail-explicit migration evidence (per D.W2 Lane D F1) |
| `routes/palettes/*` (6 files split from 845-LoC god module) | mounted at `/palettes/*` in index.ts | structure verified at D.W2 Lane A close |
| `routes/admin/*` (9 files split from 750-LoC god module) | mounted at `/admin/*` in index.ts | structure verified at D.W2 Lane B close |

**D.W2 substrate**: every piece consumed. **PASS.**

## D.W3 substrate

| Substrate | Consumer | Verified |
|---|---|---|
| `PaletteDialog/` 13-file dir | App.vue (single import via barrel) + dock navigation via useViewManager | structure verified at D.W3 Lane A close |
| `viewSchema.ts` (canonical ViewId + VIEW_MAP) | useViewManager (re-exports types) + usePaneRouter + usePaletteDialogState type-assertion + 5 transitive consumers | `grep "from.*viewSchema" demo/` matches 6+ sites |
| 5 sub-composables (`useAdminAudit`, `useAdminFlagged`, `useAdminTags`, `useVersionHistory`, `useTagEdit`) | usePaletteManager facade exposes as `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` | structure verified at D.W3 Lane B close; 11 SFC consumer migrations completed |
| `useColorNameQueue` moved auth/ → palette/ | usePaletteManager.audit sub-object | verified at D.W3 Lane B close |
| `ImageEyedropper/` 4-file split | `ImagePaletteExtractor.vue` import | `ls demo/@/components/custom/image-palette-extractor/ImageEyedropper/` shows 4 files |
| `CURRENT_PALETTE_ID` constant lifted to `@/lib/palette/constants.ts` | 5+ consumer SFCs through re-export from PaletteDialog/constants.ts | `grep "CURRENT_PALETTE_ID" demo/` matches |
| 5 Tailwind utilities + 5 @theme bridge declarations (D.W4 — listed here for completeness) | 51 callsites → 0; the bridges consumed across the demo SFC tree | verified at D.W4 Lane A close |
| L3 parseCSSColor memo (D.W3 Lane C) | useSafeAccentFn().safeCss() non-debounced list-render hot consumer | verified by L3 challenge upholding |
| L8 parseCSSValueUnit memo (D.W3 Lane C) | parser parity with L3 — CLAUDE.md contract | verified at D.W3 Lane C close |
| L5 lerpColorValue hueMethod carry-through (3-file fix) | normalizeColorUnits + InterpolatedVar + lerpColorValue dispatch | `test/units-interpolate.test.ts:319` test passing |
| L11 interpolation arg-order canonicalisation `lerp(a,b,t)` | 14+ call sites across src/units/interpolate.ts + lerpLegacy aliased deprecated | barrel re-exports both |
| L12 _lerp bolt-on (optional, LANDED) | prepareInterpVar writes property; lerpValue reads without cast | structure verified at D.W3 Lane C close |

**D.W3 substrate**: every piece consumed. **PASS.**

## D.W4 substrate

| Substrate | Consumer | Verified |
|---|---|---|
| 5 NEW @theme bridges (max-w-desktop-pane, min-w-menu, top-dock-inset, max-w-tooltip, shadow-card-hover) | 48 callsites resolved through glass-ui's existing bridges + the 5 new ones | verified at D.W4 Lane A close; 51→0 `[var(--…)]` |
| `--app-padding-x: 1rem` token | breaks silent coupling between `.app-layout` padding + `.pane-container` max-width calc | per Df §4.1 fix |
| 4 style.css colocations: `.palette-card-grid` (scoped in PaletteCardGrid.vue), `.palette-tab-content` (unscoped in PaletteDialog.vue), `.touch-gate-*` (unscoped in ComponentSliders.vue), `.pane-scroll-fade` (unscoped in PaneHeader.vue) | their host components only | verified at D.W4 Lane A close |
| `demo/DESIGN.md` 24 → 133-line catalog (10 sections) | component authors writing new SFCs (the "where this is used" cross-refs verify against HEAD) | verified at D.W4 Lane B close |

**D.W4 substrate**: every piece consumed. **PASS.**

## D.W5 substrate

| Substrate | Consumer | Verified |
|---|---|---|
| 21 smoke specs (3 baseline + 14 Lane A + 6 Lane B + 1 mobile = 21 + reactivity-instant counted in Lane A) | CI via `npx playwright test` across 3 projects | 21/21 green at D.W6 open in 9.2s |
| `e2e/smoke/admin/fixtures/admin-auth.ts` | every admin spec via test.use() | structure verified at D.W5 Lane B close |
| `e2e/smoke/reactivity-instant.spec.ts` (MERGE-GATE-BLOCKING) | CI + D-RELEASE-PLAN §3 gate 6 | spectrum 2.50ms / slider 11.40ms median at D.W6 open, gate ≤ 50ms |
| 3-project playwright.config.ts (smoke / smoke-admin / smoke-mobile) | CI workflow `.github/workflows/node.js.yml` | `playwright.config.ts` declares 3 projects with proper testDir+testIgnore partition |
| 2 single-line `data-testid` additions (GooBlob.vue + atmosphere canvas) | webgl-atmosphere + webgl-goo-blob specs | spec-grepped |

**D.W5 substrate**: every piece consumed. **PASS.**

## Aggregate verdict

**ZERO ORPHANS.** Every D-introduced primitive has at least one consumer. The substrate-without-consumer invariant is satisfied at D.W6 close.
