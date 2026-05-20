# D.W6 close audit lane 4 — idiomatic-gestalt

**Mode**: read-only spot-checks across value.js + api/ + demo/.
**Verdict**: **PASS** — invariants D1-D7 and precepts 30-33 hold.

## value.js contract-v2 compliance

| Check | Expected | Actual | Pass? |
|---|---|---|---|
| `package.json exports["."]` shape | `{types, import, default}` (3-key) | `{types: "./dist/index.d.ts", import: "./dist/value.js", default: "./dist/value.js"}` (3-key, NO `development`) | ✓ |
| `build:watch` script present | `vite build --mode production --watch` | matches | ✓ |
| `proof:resolution` script present | `node scripts/proof-resolution-contract.mjs` | matches | ✓ |
| `lint` script present (D.W1 L7 + HARDEN-6b) | `eslint . --max-warnings=0` | matches | ✓ |
| `proof:resolution` GREEN | PASS across constellation | PASS at D.W6 open | ✓ |
| precept submodule pin | `68d9b20` | `68d9b20` (verified at `cd docs/precepts && git rev-parse HEAD`) | ✓ |

## Backend service/repository discipline

| Check | Expected | Actual | Pass? |
|---|---|---|---|
| Zero `db.collection` outside repositories in D.W2-scoped code | 0 in `routes/palettes/`, `routes/admin/`, `services/` | grep returns 0 | ✓ |
| `db.collection` in pre-D.W2-scoped files (`routes/colors.ts`, `routes/sessions.ts`, `middleware.ts`, `slugWords.ts`, `migrations/check.ts`) | acceptable — these were not in D.W2 scope (D.W2 split the 2 god modules `palettes.ts` + `admin.ts`; the remaining route families are <250 LoC and unaffected) | matches | ✓ (scoped) |
| Cross-collection writes use idempotent-upsert OR `withTransaction` | F3 vote-toggle race fix via `VoteRepository.upsertIdempotent + gated $inc` | landed at `491a5d8` (D.W2 Lane A) | ✓ |
| 17 audit-emit invocations in `services/admin/` | every WRITE op emits exactly once | verified at D.W2 Lane B close | ✓ |
| ApiError hierarchy used canonically (no raw throws) | `services/` throws ApiError subclasses | verified | ✓ |
| `app.onError` maps to `toResponseEnvelope` | global handler | declared in `api/src/index.ts` | ✓ |
| `services/palette/` file count | 7 | 7 (verified by `git ls-files api/src/services/palette`) | ✓ |
| `services/admin/` file count | 9 | 9 | ✓ |
| `repositories/` file count | 9 | 9 (verified) | ✓ |
| `routes/admin/` file count | 9 | 9 | ✓ |
| `routes/palettes/` file count | 6 | 6 | ✓ |

## Demo facade completion

| Check | Expected | Actual | Pass? |
|---|---|---|---|
| Zero `@lib/palette/api` direct imports in SFCs outside the 2 KEEPs | 2 KEEPs: `ColorInput.vue` (proposeColorName) + `useCustomColorNames.ts` (getApprovedColorNames) | exactly 2 matches in `demo/@/components/custom/` | ✓ |
| Vue 3.5 reactive-props destructure adoption | 0 `const props = defineProps<` in custom SFCs (gate ≤ 2) | 0 (verified at D.W3 Lane C close; exceeded gate) | ✓ |
| Facade exposes `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` sub-objects (not flat methods) | NOT flat — 5 colocated composables | verified at D.W3 Lane B close | ✓ |
| `viewSchema.ts` canonical source for `ViewId` | re-exported by useViewManager + consumed by usePaneRouter + usePaletteDialogState | structure verified at D.W3 Lane D close | ✓ |

## Invariants D1-D7

| Invariant | Statement | Evidence |
|---|---|---|
| D1 | KISS — no contrived layering, no anticipatory abstraction | usePaneRouter (B.W2) + PaletteDialog 13-file colocated split (D.W3 Lane A) — both colocate, not over-abstract |
| D2 | DRY — no duplicate code paths | facade-sub-object structure (D.W3 Lane B) consolidates 11 SFC consumers into 5 composables |
| D3 | fail-explicit across the whole codebase (HARDEN-6c expanded from backend-only) | ApiError hierarchy (D.W2 Lane C); `ValidationError` on malformed parses (D.W2 Lane D W2); frontend demo throws on unrecognised CSS (verified — no silent fallbacks in `parseAndSetColorDebounced` path) |
| D4 | NO god modules | `PaletteDialog.vue` 652 → 340 shell + 13 colocated files (D.W3 Lane A); `palettes.ts` 845 → 5 concerns (D.W2 Lane A); `admin.ts` 750 → 8 concerns (D.W2 Lane B); the only remaining files ≥ 250 LoC are aspirational shells per HARDEN-4a |
| D5 | nothing silently deferred — every finding lands, retires with rationale, or has a named destination | `findings.md §2` truth-checked at D.W6 plan-vs-actual lane 1 |
| D6 | explicit pipeline / no effusive dynamicism (HARDEN-6a) | `evaluateSimpleCalc` (`new Function`) excised at D.W2 Lane D L4 — replaced with calc AST evaluator; `grep -rn 'new Function' src/parsing/` returns 0 |
| D7 | no nested `Color`/`ValueUnit` (RA-1) | `colorUnit2` unwrap loop intact at `src/units/color/normalize.ts:102`; recursion-guard.test.ts 5/5 passing; ColorChannel<T> brand on 45 channel sites |

**All 7 invariants HOLD at D.W6 close.**

## Precept invariants 30-33

| Invariant | Statement | Status at D close |
|---|---|---|
| 30 | cross-repo dev-resolution contract (redefined in-place to contract-v2 per `68d9b20`) | value.js compliant at D.W1 Step 1 — `package.json exports` 3-key; `build:watch` + `proof:resolution` scripts; vite.config.ts stripped of `demoConditions`/`demoServerFsAllow`. Constellation-wide `proof:resolution` PASS at D.W6 open. |
| 31 | props fail-explicit | verified at D.W0 Lane A state-at-open probe — zero stale-prop warnings; re-verified at D.W6 visual-runtime lane via 21-spec Playwright suite (zero console errors throughout) |
| 32 | phantom-class corpus-grep gate | inherited from B.W1 (`floating-panel-item` retired); no new phantom classes introduced in D — verified by `audit/D.W4-pixel-diff/` byte-isomorphism analysis (51→0 `[var(--…)]` reaches surface as first-class utilities, no phantom intermediates) |
| 33 | dead-code corpus-grep gate | applied at D.W2 Lane D (`api/src/migrate-{oklab,slugs}.ts` deleted with corpus-grep proof); D.W3 Lane C (dead `provide("auroraConfig")` removed with zero-injector confirm); D.W6 close-audit verifies no new dead code |

**All 4 precept invariants HOLD at D.W6 close.**

## Aggregate verdict

**PASS.** value.js is contract-v2 compliant; the api/ has clean service+repository discipline within D.W2 scope; the demo facade is complete (2 named KEEPs); invariants D1-D7 + precepts 30-33 all hold.
