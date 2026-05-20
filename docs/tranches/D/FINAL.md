# Tranche D — FINAL

**Repo**: value.js. **Tranche**: D — value.js's third tranche: contract-v2, backend refactor, frontend cohesion, library hardening, Playwright expansion. The v0.6.0 release tranche.
**Opened**: 2026-05-19 (planning) at `33cf235`. **Executed**: 2026-05-19 through 2026-05-20. **Closed**: 2026-05-20 (this ceremony).
**Branch**: `tranche-b` (continued — D writes on top of B.W4 close per D-RELEASE-PLAN.md §3 merge sequence; no separate `tranche-d` branch needed).
**Precepts**: D opened under `docs/precepts` `3c32fae`; D.W0 Lane 0 advanced the shared pin to **`68d9b20`** (the contract-v2 codification SHA per glass-ui's `ce5aad8` post-Q ship). D ran the rest of the tranche under invariants 30–33 (with 30 redefined-in-place by contract-v2) plus the new tranche-D-binding invariants D1–D7.

## §1 — Tranche metadata

D was opened by the user directive ledgered in `D-PROMPTS.md §1` — six named scope items (contract-v2 alignment, full Playwright every view + admin, aurora derive-from-color, blob extirpation, backend legacy/fail-explicit refactor, frontend encapsulation + styling) plus the architectural binds (NO god modules, NO workarounds, NO fallbacks, fail-explicit, KISS, DRY).

D's planning substrate was 4 planning rounds:
1. **8-lane research wave** (`research/Da..Dh`) — opened the substrate.
2. **6-lane hardening audit** (`audit/D-HARDEN-1..6`) — folded 22 corrections back into the substrate.
3. **6+6 library-perf research+challenge** (`audit/D-LIB-OPTIMIZATION-SYNTHESIS.md`) — folded 6 P1 / 5 P2 / 4 P3 surviving library claims; 12 challenge-rejected claims dropped.
4. **2-lane reactivity + release-plan round** (`audit/D-REACTIVITY-A.md`, `audit/D-REACTIVITY-B.md`, `D-RELEASE-PLAN.md`) — codified invariant D7, authored the merge + version-bump plan.

D's execution was 5 waves:
- **D.W0** — open + precept advance + state-at-open + coord refresh.
- **D.W1** — contract-v2 + library barrel + tests + lint + Color flatten (the v0.6.0 release-blocking wave).
- **D.W2** — api/ refactor (god module split + service+repository+errors+events+DI+zod + fail-explicit).
- **D.W3** — frontend cohesion (PaletteDialog split + viewSchema + facade complete + Vue 3.5 codemod + L3/L5/L8/L11/L12).
- **D.W4** — styling (51 token reaches surfaced + 4 colocations + brittle selectors + DESIGN.md catalog).
- **D.W5** — Playwright 3 → 21 specs across smoke / smoke-admin / smoke-mobile + reactivity-instant wall-clock evidence.

D.W6 (this ceremony) closes the tranche.

**25 commits stacked on `tranche-b` since D open** (`33cf235` open → `fa885c1` D.W5 close → this D.W6 close commit). B's `FINAL.md` is pinned at **`625322e`** per `D.md §thesis` line 4 — D opens off B's close.

## §2 — Scope delivered

### D.W0 — open + precept advance + state-at-open

Lane 0 advanced `docs/precepts` `3c32fae → 68d9b20` (commit `11abd86`); pre-flight required publishing precepts main to upstream (glass-ui's local clone carried `68d9b20` but had never pushed — orchestrator hygiene). Lane A captured the state-at-open probe (vue-tsc 126 / vitest 1409 / playwright smoke 3/3 / 0 console errors at 1280×800 light) in `audit/D.W0-state-at-open.md`. Lane B verified `coordination/Q.md` against the post-Q glass-ui state (5 rows OK + 2 one-line reconciliations). Folded into `afdfe77`.

### D.W1 — contract-v2 + library barrel + tests + lint + Color flatten (4 commits)

The v0.6.0 release-blocking wave.

- **L1-L5 contract-v2** (`73fdabc`) — `package.json exports["."]` collapsed to 3-key `{types, import, default}` (struck `development`); added `build:watch` + `proof:resolution` scripts; `vite.config.ts` stripped of `demoConditions` + `demoServerFsAllow` (replaced with narrow `siblingFsAllowTransient` on dev + hero-lab as documented transient under D3's "befitting graceful" carve-out — filed at `coordination/Q.md §3`); ported `scripts/proof-resolution-contract.mjs` from glass-ui `ce5aad8` (366 lines + 2-line attribution).
- **L6 library barrel** (`14d35fa`) — G1+K5 ships (registerColorNames + clearCustomColorNames + getCustomColorNames + solveCubicBezierX); L6/L7 CSSWideKeyword + case-insensitivity bug fixes; L10 `TimingFunction` type exported; C1 `AnimationOptions` → `CSSAnimationOptions` rename (14 internal sites). Per-gap disposition table in `audit/D.W1-library-barrel.md`.
- **L7 test coverage + lint + CI** (`6ca2046`) — 7 new test files (5 src/-WIP coverage + decompose-targeted + colorFilter-spsa); 167 new tests (vitest 1409 → 1576, 26 → 33 files); eslint flat config + `lint` script + CI step + 6 devDependencies.
- **L8 Color<T> flatten + 4 hardening primitives** (`059cf72`) — 15 color-space classes flattened (Map storage → own properties; 45 channel-getter/setter pairs deleted); ColorChannel<T> brand (45 declare-applications) + DEV-only `_assertChannel` (production-bundle stripped, 0 `import.meta.env.DEV` in dist) + vitest `recursion-guard.test.ts` (5 named tests including 294-frame replay) + clone() depth-16 ceiling. **Microbenchmark 11.06× median at commit** (5-run range 8.73× to 14.82×); D.W6 close re-run: 10.09× median (3 fresh runs, range 10.02× to 10.67×). Gate ≥ 5×.

D.W1 gates: vue-tsc 126 / vitest 1581 / playwright 3/3 / proof:resolution GREEN / lint exit 0 / build clean. **The v0.6.0 release gate clears empirically at `059cf72`.**

### D.W2 — backend (api/) refactor (4 lanes ordered C → A∥B → D)

Per HARDEN-3b re-ordering (Lane C lays the rails first so A/B don't write services calling `db.collection`).

- **Lane C** (`626b107`) — 20 NEW files / 1502 LoC. 9-collection typed `db/collections.ts` factory; 9 typed document interfaces in `models.ts`; 9 repositories (the ONLY layer touching `db.collection(...)`); `errors/index.ts` ApiError hierarchy + 7 subclasses + `toResponseEnvelope` mapper; `events/auditLog.ts` canonical `emitAuditEvent` with W3 befitting-graceful carve-out; `middleware/inject-services.ts` DI via Hono context; `middleware/require-ownership.ts` canonical ownership check; `validation/{palette,admin,session,color}.ts` zod 4.4.3 schemas; `format/palette.ts` shared formatPalette (C1 Db lift). Every file ≤ 250 lines. Zero `as any` across new rails.
- **Lane A** (`491a5d8`) — palettes.ts 845 LoC → 5 concerns (`routes/palettes/{index,crud,versions,forks,votes,flags}.ts`, 6 files, 358 LoC, max 117) + 7 services. **F3 vote-toggle race resolved** via `VoteRepository.upsertIdempotent` + gated `$inc` (HARDEN-3 correction).
- **Lane B** (`b7d7c63`) — admin.ts 750 LoC → 8 concerns + 9 services. **17 audit-emit invocations** across the new services. Worktree-isolated dispatch; orchestrator integrated via file-copy.
- **Lane D** (`ee8bfa4`) — F1/F2/F3/W2/W3/W4 fail-explicit dispositions; 4 missed Db findings folded (F6 crypto-import normalized, C3 LRU consolidation via `cache/lru.ts`, C4 SIGTERM+SIGINT 5s grace, F1 migration smoke-probe `migrations/check.ts`); **L4 D6-violation excised** — `evaluateSimpleCalc` (`new Function`) at `src/parsing/color.ts:78` replaced with explicit AST pipeline; `api/CLAUDE.md` wholesale reconcile 81 → ~190 LoC.

D.W2 gates: cd api && tsc --noEmit clean / vue-tsc 126 / vitest 1581 / playwright smoke 3/3 / proof:resolution GREEN / lint exit 0.

### D.W3 — frontend cohesion (4 lanes A → D → B → C)

- **Lane A** (`3359a97`) — `PaletteDialog.vue` 652 LoC → 13-file colocated `PaletteDialog/` dir; shell at 340 LoC. PaletteControlsBar trigger bug REFRAMED per HARDEN-4b (3 stray admin-only triggers deleted; admin views live in AdminPane.vue). `ImageEyedropper.vue` 399 LoC → 4-file colocated dir. `CURRENT_PALETTE_ID` lifted to canonical `@/lib/palette/constants.ts`.
- **Lane D** (`4d439bf`) — `viewSchema.ts` NEW 199 LoC (pure data + types: ViewId, LeftPane, RightPane, PaneConfig, VIEW_MAP, isViewId predicate); `useViewManager.ts` 237 → 79 LoC (-67%); type-level enforcement assertion in `PaletteDialog/composables/usePaletteDialogState.ts`. Chronically-deferred Da §3 item 12 closes.
- **Lane B** (`ea08102`) — 5 NEW colocated composables (`useAdminAudit`, `useAdminFlagged`, `useAdminTags`, `useVersionHistory`, `useTagEdit`, 536 LoC total, all ≤ 150 LoC). usePaletteManager exposes them as sub-objects: `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` (NOT flat methods — facade was already 50+ members). 11 SFC consumer migrations; 2 named KEEPs preserved (`ColorInput.vue` + `useCustomColorNames.ts`).
- **Lane C** (`cea5e3f`) — Vue 3.5 codemod 32 SFCs to reactive-props destructure (final `const props = defineProps<` count: **0** — exceeded ≤ 2 gate); 8 useTemplateRef migrations across 7 SFCs; cssColorToRgb memoised with 256-entry cap at `useMetaballRenderer.ts:53`; dead `provide("auroraConfig")` removed. Library-perf fold-ins: **L3** parseCSSColor memo + invalidation hook; **L8** parseCSSValueUnit memo parity; **L5** lerpColorValue carries hueMethod (3-file fix) — oklch(50% 0.2 350°) → oklch(50% 0.2 10°) now interpolates short-way; **L11** interpolation arg-order canonical `lerp(a,b,t)` with `lerpLegacy` aliased deprecated; **L12** _lerp bolt-on cleanup (optional, LANDED).

D.W3 gates: vue-tsc 126 / vitest 1582 / playwright smoke 3/3 / proof:resolution GREEN / lint exit 0 / api tsc clean.

### D.W4 — styling + design-idiom catalog (1 combined commit, Lanes A+B file-disjoint)

`5674d1f`.

- **Lane A** — **51 `[var(--…)]` callsites → 0** (gate was ≤ 5; exceeded); 5 NEW `@theme` bridge declarations in `style.css` (max-w-desktop-pane, min-w-menu, top-dock-inset, max-w-tooltip, shadow-card-hover); 48 callsites resolved through glass-ui's existing bridges. 4 style.css blocks colocated (`.palette-card-grid`, `.palette-tab-content`, `.touch-gate-*`, `.pane-scroll-fade`). Brittle selectors hardened (`.featured-badge :deep(svg)` → wrapper span; `button:has(> .lucide-x)` → `button:has(> .sr-only)`). NEW `--app-padding-x: 1rem` token breaks the silent `.app-layout` padding ↔ `.pane-container` max-width coupling. Pixel-diff substituted by byte-isomorphism analysis (`audit/D.W4-pixel-diff/README.md`) — preserves 120-min cap; 3 enumerated drift exceptions documented.
- **Lane B** — `demo/DESIGN.md` 24 → 133-line catalog (within ±20 of the ~150 target); 10 sections per spec; 12 cross-refs cite specific `style.css` line ranges; 12 distinct glass-ui DESIGN.md section/subsection names. All cross-reference links verified against glass-ui's HEAD (zero broken).

D.W4 gates: 0 `[var(--…)]` survivors in demo/ + 0 broken DESIGN.md links + lint exit 0 + vue-tsc 126 + vitest 1582 + smoke 3/3.

### D.W5 — Playwright 3 → 21 specs across 3 projects (2 commits, A+B parallel, C wrap)

- **Lanes A + B** (`707d1be`) — 6 user-view specs at `e2e/smoke/views/` (palettes, browse, extract, generate, gradient, mix) ≤ 35 LoC each, role/label-only selectors; `walk.spec.ts` walks all 6 user views + back to picker; `webgl-atmosphere.spec.ts` + `webgl-goo-blob.spec.ts` (split per HARDEN-5b); **`reactivity-instant.spec.ts` MERGE-GATE-BLOCKING** — 2 tests, spectrum-drag wall-clock 6.80ms median at commit (D.W6 re-run: 2.50ms), slider-keyboard 21.70ms median at commit (D.W6: 11.40ms), both ≤ 50ms gate. 2 single-line `data-testid` additions (GooBlob.vue + atmosphere canvas). Env-noise filter for shared production palette API rate-limits. Admin: `fixtures/admin-auth.ts` `addInitScript` localStorage seeding + `page.route` wildcard for 8 admin endpoint patterns; 5 admin view specs + admin-walk.spec.ts.
- **Lane C** (`f374f13`) — `e2e/smoke/mobile/page-load-mobile.spec.ts` Pixel-7 boot probe (62 LoC); 3-project `playwright.config.ts` partition (`smoke` / `smoke-admin` / `smoke-mobile`); CI runs all 3. iOS-Safari engine note: Pixel-7 in Playwright runs Chromium (not WebKit) — `smoke-safari` follow-up filed at `coordination/Q.md §11`.

D.W5 gates: **21/21 specs green in 9.6s** at close (9.2s at D.W6 re-run); reactivity-instant 6.80ms median (gate ≤ 50ms); vue-tsc 126 / vitest 1582 / proof:resolution GREEN / lint exit 0.

## §3 — Invariants honored

| Invariant | Statement | Evidence |
|---|---|---|
| D1 | KISS — no contrived layering | usePaneRouter inherits from B.W2; PaletteDialog 13-file colocated split favours flatness over deep abstraction |
| D2 | DRY — no duplicate code paths | facade-sub-object structure (Lane B) consolidates 11 SFC consumers into 5 composables |
| D3 | fail-explicit across the whole codebase (HARDEN-6c) | ApiError hierarchy (Lane C); `ValidationError` on malformed parses (Lane D); frontend demo throws on unrecognised CSS |
| D4 | NO god modules | PaletteDialog 652 → 340 shell + colocated; palettes.ts 845 → 5 concerns; admin.ts 750 → 8 concerns |
| D5 | nothing silently deferred | `findings.md §2` rows Da-1..REL-1 all wave-routed or named-routed; verified at `audit/D.W6-plan-vs-actual.md` |
| D6 | explicit pipeline / no effusive dynamicism (HARDEN-6a) | `evaluateSimpleCalc` excised; `grep -rn 'new Function' src/parsing/` → 0 |
| D7 | no nested `Color`/`ValueUnit` (RA-1) | `colorUnit2` unwrap at `src/units/color/normalize.ts:102`; recursion-guard.test.ts 5/5; ColorChannel<T> brand on 45 sites |

| Precept invariant | Status at D close |
|---|---|
| 30 (cross-repo dev-resolution contract, redefined-in-place to contract-v2 per `68d9b20`) | value.js compliant at D.W1 Step 1; `proof:resolution` PASS at D.W6 open |
| 31 (props fail-explicit) | verified at D.W0 state-at-open + D.W6 visual-runtime (zero stale-prop warnings, zero console errors across 21 specs) |
| 32 (phantom-class corpus-grep) | inherited from B.W1; D introduced 5 @theme bridges + 1 token, NOT phantom classes — 51→0 callsites resolved through first-class utilities |
| 33 (dead-code corpus-grep) | applied at D.W2 Lane D (`migrate-{oklab,slugs}.ts` deleted), D.W3 Lane C (dead provide cleanup); zero re-introductions |

## §4 — Finding disposition (every row from `findings.md §2`)

Per invariant D5, every finding lands or has a named destination. Truth-checked.

| Finding | Disposition |
|---|---|
| Da-1 (30 chronically-deferred items) | 5 closed-verified at open; 8 routed glass-ui; 1 routed keyframes.js; 11 actionable in-repo folded (items 9/10/12/13/18/19 + 5 historical doc residuals → D.W6 ceremony) |
| Da-2 (13 user mandates) | verified at A/B close; no D action |
| Db-1 (palettes.ts 845 LoC) | LANDED D.W2 Lane A (`491a5d8`) |
| Db-2 (admin.ts 750 LoC) | LANDED D.W2 Lane B (`b7d7c63`) |
| Db-3 (157 direct `db.collection` + 123 inline Mongo ops) | LANDED D.W2 Lane C (`626b107`) — repository layer; D.W2-scoped routes call repos only |
| Db-4 (31 `as any` casts) | LANDED D.W2 Lane C — typed `collections{}` factory; zero `as any` in new rails |
| Db-5 (6 silent-fallback sites F1-F3/W2-W4) | LANDED D.W2 Lane D (`ee8bfa4`) — all 6 disposition'd per HARDEN-3e |
| Db-6 (`api/dist/` checked-in) | RETIRED — HARDEN-3f corrected the research claim (`.gitignore:11` already excluded) |
| Db-7 (`api/src/migrate-{oklab,slugs}.ts`) | LANDED D.W2 Lane D — deleted with corpus-grep proof |
| Db-8 (`api/CLAUDE.md` drift) | LANDED D.W2 Lane D — 81 → ~190 LoC reconcile |
| Db-9 (no zod validation) | LANDED D.W2 Lane C — `validation/*.ts` zod 4.4.3 schemas; pipeline `validate → service → repository → response` |
| Dc-1, Dc-2, Dc-3 (aurora derive-from-color) | ROUTED — precept-§10 blocked; glass-ui successor tranche (algorithm sketch preserved in `research/Dc-aurora.md §3` + grayscale carve in `Dc-aurora.md §3.2`); value.js demo-abstraction tranche post-glass-ui-ship |
| Dd-1, Dd-2, Dd-3, Dd-4 (blob extirpation + 7-addition surface) | ROUTED — same blocks as aurora; `coordination/Q.md §3` row refreshed with 7-addition metaballs surface |
| De-1 (PaletteDialog god module) | LANDED D.W3 Lane A |
| De-2 (TabValue drift) | LANDED D.W3 Lane A — REFRAMED per HARDEN-4b (PaletteControlsBar 3 stray admin triggers deleted) |
| De-3 (10 component-side @lib/palette/api imports) | LANDED D.W3 Lane B — 11 consumer migrations (HARDEN-4c corrected count) + 2 KEEPs |
| De-4 (38/40 SFCs need codemod) | LANDED D.W3 Lane C — 32 SFCs codemodded (HARDEN-4d corrected count); 2 hand-conversion sites handled |
| De-5 (8 SFCs ref → useTemplateRef) | LANDED D.W3 Lane C — 8 migrations across 7 SFCs |
| De-6 (dead provide) | LANDED D.W3 Lane C — removed with zero-injector confirm |
| De-7 (KEEP composable-facade + InjectionKey) | architectural verdict — held |
| Df-1, Df-2, Df-3, Df-4, Df-5, Df-6 (styling) | LANDED D.W4 Lane A+B (`5674d1f`) |
| Dg-1, Dg-2, Dg-3 (Playwright coverage) | LANDED D.W5 (`707d1be`, `f374f13`) |
| Dh-1..Dh-6 (contract-v2 spec) | LANDED D.W0+D.W1 Step 1 |
| Dh-7 (keyframes.js precept-pin drift) | FILED at `coordination/Q.md §9.1` — keyframes.js own schedule |
| HARDEN-1..6d | all 22 hardening corrections wave-routed per `findings.md §2` |
| LIB-L1, L3, L4, L5, L6, L7, L9, L10, C1, C2 | LANDED D.W1/D.W2/D.W3 per per-row wave assignment in synthesis doc |
| LIB-RX (12 REJECTED claims) | KISS gate held; reasoning preserved in `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §5` |
| RA-1 (colorUnit2 nesting bug) | CODIFIED as invariant D7 |
| RA-2 (L8 hardening primitives) | LANDED D.W1 Lane L8 — all 4 primitives shipped (ColorChannel<T> + assertChannel + recursion-guard.test.ts + clone() depth-16) |
| RB-1 (topology verified clean) | no fix needed — verified |
| RB-2 (L8 × Vue reactivity verdict) | LANDED D.W1 Lane L8 sub-gate — `isReactive(color) === false` regression test added |
| RB-3 (wall-clock evidence primitives) | LANDED — `bench/color-channel-access.mjs` (D.W1 L8) + `reactivity-instant.spec.ts` (D.W5) both green at D.W6 |
| REL-1 (merge to master + version-bump) | EXECUTING at D.W6 close ceremony (this commit) |

**Zero findings silently deferred. D5 invariant satisfied.**

## §5 — Mandate coverage (D-PROMPTS.md §1)

| User-mandate clause | Status |
|---|---|
| Contract-v2 alignment | LANDED D.W1 Lane L1-L5 |
| Full Playwright every view + admin + WebGL + mobile | LANDED D.W5 (21 specs across 3 projects) |
| Aurora derive-from-color | ROUTED (glass-ui-blocked; algorithm sketch + grayscale carve preserved) |
| Blob extirpation | ROUTED (glass-ui-blocked; 7-addition metaballs surface filed) |
| Backend legacy/fail-explicit refactor | LANDED D.W2 (4 lanes; service+repository+errors+events+DI+zod; F1-F3+W2-W4 dispositions) |
| Frontend encapsulation + styling | LANDED D.W3 + D.W4 (PaletteDialog split + viewSchema + facade complete + 32-SFC codemod + 51 token reaches surfaced + DESIGN.md catalog) |
| NO god modules | enforced (D4 invariant; D.W2+D.W3 splits) |
| NO workarounds, NO fallbacks, fail-explicit | enforced (D3 invariant; D.W2 Lane D dispositions) |
| KISS, DRY | enforced (D1+D2 invariants) |
| Linting | LANDED D.W1 Lane L7 (`lint` script + eslint flat config + CI step) per HARDEN-6b |
| No effusive dynamicism | LANDED D.W2 Lane D L4 (`evaluateSimpleCalc` excised) per HARDEN-6a / D6 |
| Recursion prevention | LANDED D.W1 Lane L8 (4 hardening primitives) per RA-1+RA-2 / D7 |
| Instant reactivity | LANDED — wall-clock evidence at D.W5 (≤ 50ms median both paths) |
| Merge to master + version-bump | EXECUTING D.W6 (this ceremony; v0.6.0) |

Every clause addressed-or-routed. **D5 mandate-coverage satisfied.**

## §6 — Gate matrix at close (the 10 pre-merge gates)

Per `D-RELEASE-PLAN.md §3` (9 items) + the recursion-guard + reactivity-smoke split:

| # | Gate | Target | Actual at D.W6 close | Verdict |
|---|---|---|---|---|
| 1 | vue-tsc errors | 126 | 126 | GREEN |
| 2 | vitest pass count | 1582+ across 34 files | 1582 / 34 files (parser-snapshot rename preserves count) | GREEN |
| 3 | playwright across 3 projects | 21 green | 21 passed (9.2s) | GREEN |
| 4 | lint exit code | 0 | 0 | GREEN |
| 5 | proof:resolution | PASS | PASS | GREEN |
| 6 | api tsc | clean | clean | GREEN |
| 7 | npm run build | clean, no errors | clean; `dist/value.js` 137.60 kB / 40.33 kB gzip | GREEN |
| 8 | L8 microbench median | ≥ 5× | 10.09× median (3 runs: 10.02× / 10.09× / 10.67×) | GREEN |
| 9 | recursion-guard.test.ts | 5 passing | 5 passing | GREEN |
| 10 | reactivity-instant median | ≤ 50ms | 2.50ms (spectrum) / 11.40ms (slider) | GREEN |

**All 10 pre-merge gates GREEN.** D is mergeable.

## §7 — Open dependencies at close

- **Aurora derive-from-color value.js-side migration** — glass-ui-blocked. Routes to a value.js demo-abstraction tranche post-glass-ui-ship.
- **Blob value.js-side extirpation** — same block; same routing.
- **`keyframes.js` precept-pin convergence + consumption update post-v0.6.0** (`coordination/Q.md §9.5`) — bump `@mkbabb/value.js` pin to acknowledge `^0.6.0`; rename `AnimationOptions` → `CSSAnimationOptions` import; verify `Color.components.get("L")` → `Color.L` migration. value.js cannot write keyframes.js; the asks are filed; keyframes.js follows on its own schedule.
- **smoke-safari WebKit follow-up** (`coordination/Q.md §11`) — Pixel-7 in Playwright runs Chromium, not WebKit; iOS-Safari engine bugs (like the W5-vintage `_data-driver` bug class) uncaught. Routes to a value.js testing-hardening tranche post-D.

**Zero open dependencies on the critical path. v0.6.0 ships.**

## §8 — Cross-tranche debt

**Inherited from B** (per `B/coordination/Q.md §3`):
- 7 standing glass-ui §3 primitive/blob gaps — unchanged at D close (no new glass-ui ships since B close; `coordination/Q.md §2` re-verified at D open).
- 1 RE-FILED `<Tabs variant="underline">` provider-family ask — standing.
- 6 keyframes.js-side gaps from B turn — standing on keyframes.js's schedule.

**Added by D**:
- **Contract-v2 §2.1 keystone gap on glass-ui's `./styles` subpath** (filed at D.W1 Step 1; `coordination/Q.md §3`). value.js's `vite.config.ts:siblingFsAllowTransient` is the consumer-side reciprocal; retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution.
- **keyframes.js post-v0.6.0 consumption update** (`coordination/Q.md §9.5`).
- **smoke-safari WebKit testing hardening** (`coordination/Q.md §11`).
- **K4 Prettier-doc gap** — named-destination filed (no Prettier config actively binds the library; if a future library-doc tranche unifies formatting policy, fold there).

## §9 — Successor destinations

Named tranches that consume D's outputs or close D's filings:

1. **glass-ui primitive-ship tranche** — the 7 metaballs additions + `BlobDot` + `deriveAuroraPalette` + `<Tabs variant="underline">` provider family. value.js's `Dc-aurora.md §3` algorithm sketch + `Dd-blob.md §3-4` API signatures are inputs.
2. **value.js demo-abstraction post-glass-ui-ship** — consumes the new glass-ui APIs; deletes `useMetaballRenderer.ts` (333 LoC) + `WatercolorDot/` (11 consumer migrations); extirpation file delta ≈ −865 demo LoC.
3. **shadcn-vue generator-update / vendoring-policy effort** — the ~126 generated typecheck cluster (`ui/auto-form`, `ui/chart`, `ui/calendar`, …) noted at B.W3 `audit/B.W3-typecheck.md`.
4. **value.js testing-hardening tranche** — smoke-safari WebKit project + 30s sustained spec for iOS-Safari engine bugs.

None are D's to author; each opens as its own planning substrate.

## §10 — Authority

**Close-ceremony commit SHA**: `<this commit>` (to be filled by orchestrator at commit time).
**Precept pin at close**: `68d9b20` (the contract-v2 codification; advanced from `3c32fae` at D.W0 Lane 0 commit `11abd86`).
**Merge commit SHA**: TBD (orchestrator owns the merge per `D-RELEASE-PLAN.md §3` sequence).
**Release tag**: `v0.6.0` (orchestrator owns the tag).

**B's FINAL.md SHA**: pinned at `625322e` per `D.md §thesis` — D opens off B's close.
**A's FINAL.md**: written at B.W0 (per B's FINAL §3 row A).

D's `FINAL.md`, B's `FINAL.md`, and A's `FINAL.md` together close every clause of the user's turn-1 regression report, B turn-4 hardening directive, and the D-opening directive (`D-PROMPTS.md §1`).

The user's hard requirements — "proper, instant reactivity" + "fully merge into master, and version bump" — are evidenced (the 10-gate matrix is GREEN) and executing (D.W6 ceremony writes ready for orchestrator merge + v0.6.0 tag).
