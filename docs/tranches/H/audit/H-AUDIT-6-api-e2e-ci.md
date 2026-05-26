# H-AUDIT-6 — api/ + e2e/ + CI hygiene at H open

**Mode**: READ-ONLY. Authored at H open.
**Date**: 2026-05-23.
**Branch / HEAD**: `tranche-h` @ `e166d37` (post-G merge, v0.9.0).
**Scope (per H-opening directive)**: re-audit `api/`, `e2e/`, `.github/workflows/`, `scripts/`. Inherit the G-AUDIT-6 angle; identify what G actually shipped and what remains. Hawk for INERT gates, defects, structural drift, and chronic items. The user's "elegance, simplicity, performance" directive maps to invariant-tightening and defect-repair, not new surface.
**Author**: H-AUDIT-6.
**Inheritance**: `docs/tranches/G/audit/G-AUDIT-6-api-e2e-ci.md`. G shipped 8 of 8 enumerated targets (CI-1, DOCS-1, SCRIPTS-1/2/3, API-1, API-2, CI-2, E2E-1). All G-closed lanes verified at HEAD.

---

## §1 — api/ pipeline state

### §1.1 — Source structure vs `api/CLAUDE.md` (post-G.W4 doc-drift)

`api/src/` carries **71 .ts files** unchanged in shape from G close. Top LoC sites:

| File | LoC | Notes |
|---|---|---|
| `services/palette/crud.ts` | 223 | create + patch + delete + get (4-method module) |
| `services/admin/users.ts` | 218 | admin user CRUD + cascade |
| `services/palette/crud-list.ts` | 207 | list + mine pagination |
| `models.ts` | 193 | typed Mongo document shapes for 9 collections |
| `services/palette/versions.ts` | 186 | version record primitive + revert |
| `repositories/palette.ts` | 186 | DB access for palettes collection |
| `services/palette/forks.ts` | 184 | forking |
| `index.ts` | 172 | app bootstrap |

**No file exceeds 400 LoC.** The CLAUDE.md "focused modules ≤ 350 LoC" precept is fully honored. `crud.ts` (223) is the closest approach; it's already 4-concern (get/create/patch/delete) and a per-concern split would be premature.

**api/CLAUDE.md** (196 lines) — re-read against the actual tree:

| Field | CLAUDE.md says | Reality | Drift? |
|---|---|---|---|
| `services/` subdirs | `palette/`, `admin/`, `color/`, `session/` | matches | NO (G.W4 fixed) |
| `withTransaction` site count | 7 (deleteUser, forkPalette, toggleVote, deletePalette, revertToVersion, batchPalettes(delete), batchUsers(suspend)) | grep confirms 7 invocation lines across 7 sites | NO |
| 9 collections / 27 indexes | listed in table | matches `src/db.ts` | NO |
| middleware stack | 7-step order | matches `src/index.ts` | NO |
| package.json engines | `>=22` declared | matches | NO (G.W3 Lane F added) |
| endpoints table | 24+ rows | matches actual route mounts | NO |

**Verdict**: api/CLAUDE.md is bit-accurate at HEAD. No drift.

### §1.2 — api/ tsconfig strictness vs root

| Flag | root `tsconfig.json` | `api/tsconfig.json` | Delta |
|---|---|---|---|
| `strict` | ✅ | ✅ | parity |
| `noUncheckedIndexedAccess` | ✅ | ❌ | **WEAKER in api/** |
| `exactOptionalPropertyTypes` | ✅ | ❌ | **WEAKER in api/** |
| `verbatimModuleSyntax` | ✅ | ❌ | **WEAKER in api/** |
| `isolatedModules` | ✅ | ❌ | **WEAKER in api/** |
| `target` | ES2022 | ES2022 | parity |
| `module` | ESNext / bundler | Node16 / Node16 | intentional (api uses tsc emit, not bundler) |

**INERT-strictness CANDIDATE (H-OPP-API-1)**: `api/tsconfig.json` is meaningfully weaker than root on 4 strictness flags. The api/ codebase is well-typed by inspection (no `any`, every `as` is well-bounded — verified by `as unknown as` grep: 1 hit in `api/src/index.ts:150` for SIGTERM `.close()` shape coercion, which is justifiable). Lifting api/ to match root's 4 extra flags is a hygiene action that codifies what the code already maintains by discipline. ~4 LoC config + likely small fix-cluster surface.

### §1.3 — api/ dep versions

Same shape as G open:
- zod **^4.4.3** in api/ vs **^3.23.8** at root — intentional cross-major split (separate packages, separate boundaries). Acceptable.
- TypeScript **^5.7.0** in api/ vs **^6.0.3** at root — intentional (W12-β lift was value.js-only).
- `engines.node`: **`>=22`** declared at G.W3 Lane F. Matches root + Dockerfile Node 22-alpine.
- All other deps current. `hono ^4.7.0`, `mongodb ^6.12.0`, `@hono/node-server ^1.19.9`, `mongodb-memory-server ^10.1.4`, `tsx ^4.19.0`. Nothing unpinned, nothing dangerously old.

### §1.4 — `withTransaction` coverage — re-audit

G.W3 Lane E expanded coverage from 3 → 7 sites. Verified at HEAD:

| Site | File:line | Status |
|---|---|---|
| `deleteUser` | `services/admin/users.ts:161` | ✅ inherited |
| `forkPalette` | `services/palette/forks.ts:80` | ✅ inherited |
| `toggleVote` | `services/palette/votes.ts:45` | ✅ inherited |
| `deletePalette` | `services/palette/crud.ts:209` | ✅ G.W3 Lane E |
| `revertToVersion` | `services/palette/versions.ts:151` | ✅ G.W3 Lane E |
| `batchPalettes(delete)` | `services/admin/batch.ts:38` | ✅ G.W3 Lane E |
| `batchUsers(suspend)` | `services/admin/batch.ts:87` | ✅ G.W3 Lane E |

**DEFECT FOUND (H-OPP-API-2 — HIGHEST RATIO)**: `createPalette` and `patchPalette` (when `body.colors` or `body.name` mutates and `userSlug` is present) write to BOTH the `palettes` collection AND the `palette_versions` collection without wrapping in `withTransaction`. The G.W3 Lane E audit explicitly ratified `deletePalette` / `revertToVersion` / `batchPalettes(delete)` / `batchUsers(suspend)` — but **createPalette + patchPalette were never enumerated**, despite carrying the same orphan-write exposure class.

```
api/src/services/palette/crud.ts:102   await services.repositories.palettes.insert(doc);
api/src/services/palette/crud.ts:111   await createVersionRecord(services, { paletteSlug: body.slug, ... });
                                              └─ writes palette_versions collection

api/src/services/palette/crud.ts:169   await createVersionRecord(services, { ... });
api/src/services/palette/crud.ts:180   await services.repositories.palettes.update(slug, { $set });
                                              └─ partial failure between these = orphan version row
                                                  OR a palette whose `currentHash` doesn't match
                                                  any actual version record.
```

`createVersionRecord` already accepts `session?: ClientSession` (per G.W3 Lane E sig), so threading a session through is mechanical. The version-record write IS NOT in the D3 "befitting graceful" carve-out (that's `emitAuditEvent` specifically); the version record is referenced by `palette.currentHash` and a divergence is a correctness bug, not an audit-log hiccup. **H candidate**: extend `withTransaction` to `createPalette` + `patchPalette`. ~20 LoC; mirrors G.W3 Lane E exactly.

**Other cross-collection writes verified clean**:
- `impersonate` (`services/admin/impersonate.ts:41`) — `sessions.insert` + `emitAuditEvent`. Audit emit is D3 "befitting graceful" by design (`events/auditLog.ts`); no transaction needed.
- `flagPalette` (`services/palette/flags.ts:39`) — single-collection (`flags.insert`); not cross-collection.
- `proposeColorName` (`services/color/proposals.ts`) — single-collection. Clean.
- `batchUsers(delete)` — per `batch.ts:74` comment, per-row `deleteUser` is ALREADY transactional; the batch loop deliberately stays OUTSIDE a wrapping txn so one bad row doesn't roll back the batch. Documented + correct.

### §1.5 — api/ test state

```
21 test files, 106 tests, 11.62s wall-clock
PASS (mongodb-memory-server)
```

Test count rose +1 file / +2 tests from G open (20/104) — the addition is `test/services/withTransaction-rollback.test.ts` from G.W3 Lane E.

**Coverage gap (H-OPP-API-3 — supporting)**: the rollback test covers `deletePalette` + `batchUsers(suspend)`. If H expands withTransaction to `createPalette` + `patchPalette`, the rollback test should grow to cover the new transactional surface (or at minimum a sub-test asserting palette+version atomicity on a forced insert failure). ~30 LoC.

### §1.6 — Verdict

api/ is mostly intact at G close shape. ONE concrete defect (createPalette/patchPalette gap in withTransaction coverage), ONE strictness-tightening candidate (lift api/ tsconfig to root flags).

---

## §2 — e2e/ Playwright suite analysis

### §2.1 — File + block census

`find e2e -name '*.spec.ts' | wc -l` → **36 files** (matches G.W3 Lane G addition: `e2e/smoke/mobile/walk.spec.ts`).

| Project | Dir | Files | Notes |
|---|---|---|---|
| smoke | `e2e/smoke/` (excludes admin/mobile/safari/reactivity) | 20 | desktop Chromium + WebGL |
| smoke-admin | `e2e/smoke/admin/` (5 view + admin-walk + 6 flows) | 12 | api-mock fixture |
| smoke-mobile | `e2e/smoke/mobile/` | 2 | Pixel-7 — boot + walk (G.W3 Lane G) |
| smoke-reactivity | `e2e/smoke/reactivity-instant.spec.ts` | 1 (2 tests) | workers:1 enforced |
| smoke-safari | `e2e/smoke/safari/sustained-30s.spec.ts` | 1 | iPhone-14 WebKit |
| **Total** | | **36** | |

### §2.2 — View-coverage analysis

`ViewId` (canonical at `demo/@/composables/viewSchema.ts`) enumerates 9 user-visible views: picker, palettes, browse, extract, atmosphere, blob, mix, generate, gradient. Coverage:

| View | Spec | Status |
|---|---|---|
| picker | `page-load.spec.ts` + `walk.spec.ts` + `views/extract.spec.ts` etc. | ✅ |
| palettes | `views/palettes.spec.ts` | ✅ |
| browse | `views/browse.spec.ts` | ✅ |
| extract | `views/extract.spec.ts` | ✅ |
| atmosphere | `webgl-atmosphere.spec.ts` | ✅ |
| blob | `webgl-goo-blob.spec.ts` | ✅ |
| mix | `views/mix.spec.ts` | ✅ |
| generate | `views/generate.spec.ts` | ✅ |
| gradient | `views/gradient.spec.ts` | ✅ |

**All 9 views have at least one spec.** No gap.

### §2.3 — Reactivity flake — the RM-1 environmental class

G.W4 close lane 5 noted reactivity-instant slider-keyboard subtest occasionally exceeded 100ms median under host-CPU contention (RM-1 environmental flake). The current spec (`e2e/smoke/reactivity-instant.spec.ts:198`) uses `page.waitForFunction(..., { timeout: 200, polling: "raf" })` — an INNER timeout that fails the test if the readout doesn't update within 200ms.

The chronic friction:
- Project-level `workers: 1` already enforced.
- 100ms gate is the RAIL perceptual-instant threshold; lowering it is not desirable.
- The 200ms waitForFunction timeout is the WALL on the measurement — if a keystroke happens to land during a GC pause or a sibling-spec's webServer warm-up, the readout never crosses baseline before the inner timeout, and the test fails the assertion path.

**H mitigation CANDIDATE (H-OPP-E2E-1)**: re-frame the wait as a `waitFor` with a LARGER budget (say 2000ms) — the 200ms is currently doing double-duty as both "fail if not instant" AND "fail if hung". Split: outer `waitForFunction({ timeout: 2000 })` guarantees the readout MUST eventually change (or hard-fail); the 100ms `expect(median).toBeLessThanOrEqual(100)` already provides the perceptual gate. The spec asserts MEDIAN of 3 samples, so a single outlier under 2000ms still passes the median gate if the other two are sub-100ms. This separates "instant?" (gate) from "alive?" (timeout) — both invariants stay GREEN but the environmental-flake class retires.

Not a fix proposal — a mitigation candidate. ~5 LoC change to the spec.

### §2.4 — smoke-safari WebKit install

CI installs WebKit (`.github/workflows/node.js.yml:233` — `npx playwright install --with-deps chromium webkit`). Local development requires manual `npx playwright install webkit` BEFORE running the safari project. **CONTRIBUTING.md currently has no mention of safari / webkit** — verified via grep.

A 1-line addition to CONTRIBUTING.md under the dev quickstart (e.g. "Run `npx playwright install` once to fetch all browser binaries; CI installs `chromium webkit` only for the smoke suite") closes a soft onboarding miss. **H candidate (H-OPP-E2E-2, supporting)**: documentation-only, no script change. ~3 LoC.

### §2.5 — Verdict

e2e/ is well-shaped at HEAD. 36 specs is the documented G close count. All 9 views covered. Two soft items: the reactivity-flake mitigation re-framing, and a CONTRIBUTING.md safari onboarding line.

---

## §3 — CI workflow analysis (`.github/workflows/node.js.yml`)

### §3.1 — Gate inventory (post-G.W3)

The workflow is one job (`build-and-test`) on a 2-leg matrix (Node 22, 24) followed by a `deploy` job (gh-pages, master push only). The build-and-test job has these gate steps in order:

| # | Step | Gate? | Notes |
|---|---|---|---|
| 1 | `actions/checkout@v4` `fetch-depth: 0` | — | required for CHANGELOG-diff |
| 2 | `actions/setup-node@v5` | — | current |
| 3 | `npm ci` | hard | |
| 4 | `npm run lint` (`--max-warnings=0`) | hard | |
| 5 | `vue-tsc --noEmit` (strict-zero) | hard | post-F.W1 Lane C |
| 6 | `npm run build` | hard | |
| 7 | `ls -la dist/` | informational | "Log dist sizes" — visibility only |
| 8 | `npm run proof:dts-layout` | hard | F.W3 Lane D |
| 9 | `stat dist/value.js ≤ 148480` | hard | F.W3 Lane E |
| 10 | `npx vitest run` | hard | |
| 11 | `cd api && npm install && npm test` | hard | mongodb-memory-server |
| 12 | `npm run proof:resolution` | hard | contract-v2 + types-key (G.W3 Lane A) |
| 13 | `npm run proof:no-deprecated` | hard | G.W3 Lane B |
| 14 | `npm run proof:no-ts-ignore` | hard | G.W3 Lane C |
| 15 | `npm run proof:as-any-budget` | hard | G.W3 Lane D |
| 16 | `npm run proof:no-deep` | hard | G.W3 Lane J |
| 17 | `npm run proof:no-bare-builtins` | hard | G.W3 Lane K |
| 18 | `npm pack --dry-run --legacy-peer-deps` | hard | G.W3 Lane H |
| 19 | `npm run proof:codemod-publication` | hard | G.W3 Lane I |
| 20 | `npm run bench \| tee bench-output.txt` | informational-by-itself | the bench scripts self-assert |
| 21 | Assert bench gates (L8 ≥ 5x, HSL→RGB ≥ 2x, nameParser ≥ 5x) | hard | inline shell |
| 22 | Cache Playwright browsers | — | actions/cache@v4 |
| 23 | Install Chromium + WebKit | — | conditional on cache miss |
| 24 | `npx playwright test` (5 projects) | hard | |
| 25 | Upload Playwright report | — | actions/upload-artifact@v4 |
| 26 | CHANGELOG-changed gate | hard, PR-only | G.W1 Lane A fix (origin/master → origin/${{ github.base_ref }}) |

**All 8 proof scripts (steps 8, 12, 13, 14, 15, 16, 17, 19) are wired**. No proof script orphaned. Post-G merge verified.

### §3.2 — INERT-gate scan

Re-reading every step:

- **Step 7 (`ls -la dist/`)** — `| head -20`, pure visibility. Cannot fail unless `dist/` is missing, in which case step 6 (build) already failed. Not inert; not a gate.
- **Step 20 (bench)** — the bench scripts ALL emit a self-assert non-zero on regression (verified by reading `bench/color-channel-access.mjs` etc.). Step 21 is the explicit assertion that parses the textual output. **Both paths are gates** — belt-and-suspenders; if the bench scripts' exit-code path bit-rotted, step 21 catches the textual regression. Not inert.
- **Step 26 (CHANGELOG)** — `origin/${{ github.base_ref }}...HEAD`. G.W1 Lane A fixed the broken `origin/main` reference. `github.base_ref` is defined under the `if: github.event_name == 'pull_request'` guard. Verified GREEN per G.W4 close audit.

**No INERT gates surfaced.** Every step is either hard-gated or explicit-visibility.

### §3.3 — Silent-failure paths

- **`api/ npm install` (step 11)** does not honor the root's `package-lock.json` (api/ has its own lockfile). If `api/package.json` `engines.node` were not honored, `npm install` would WARN, not fail. Verified: `engines.node: ">=22"` is declared (G.W3 Lane F); Node 22 + 24 matrix both satisfy.
- **`npm pack --dry-run` (step 18)** with `--legacy-peer-deps` — necessary because the constellation pins Vite 8 while some peer deps declare Vite ^7. Documented in CONTRIBUTING.md. Not a silent failure.
- **`peaceiris/actions-gh-pages@v4` (deploy line 298)** — silent on failure of glass-ui checkout (line 284); if `mkbabb/glass-ui` is missing or private, `actions/checkout@v4` fails the step. Not silent.

### §3.4 — Release / publish workflow

**No release workflow exists.** `.github/workflows/node.js.yml` has:
- `deploy` job for gh-pages on master push.
- No `npm publish` step, no `release.yml`, no `workflow_dispatch`, no tag-triggered job.

Publishing is **manual** — by inference from `package.json` `version: "0.9.0"` + the CHANGELOG header `## [0.9.0] — 2026-05-22 (G close)`. CONTRIBUTING.md says nothing about the publish process.

**H CANDIDATE (H-OPP-CI-1)**: either (a) document the manual publish process in CONTRIBUTING.md (e.g. "after a tranche close: `npm publish --legacy-peer-deps`; a tag is pushed manually"), OR (b) add a tag-triggered `release.yml` that runs `npm publish` on `v*` tags. Option (a) is lower-risk and keeps publish as a deliberate human action; option (b) automates a class of error. Recommend (a) at H — the manual cadence aligns with the tranche-close ceremony and an automated release on every tag is more surface than the project needs at v0.9.0.

### §3.5 — Cache-restore steps current

- `actions/cache@v4` (step 22) — current major.
- `actions/checkout@v4` — current major.
- `actions/setup-node@v5` — current major.
- `actions/upload-artifact@v4` — current major.
- `peaceiris/actions-gh-pages@v4` — current major.

All actions on latest majors as of 2026-05-23. No drift.

### §3.6 — Verdict

CI is well-instrumented and current. All 8 proof scripts wired. No INERT gates. No silent failures. The only gap is the missing release-process documentation. The bench-gate inline shell (60+ lines in YAML) is a candidate for extraction to `scripts/proof-bench.mjs` (G-OPP-SCRIPTS-4 deferred from G open), but the borderline tradeoff has not sharpened — declining for H unless the inline shell needs to grow.

---

## §4 — scripts/ tooling

### §4.1 — Inventory

```
scripts/generate-favicon.mjs               # one-off (not wired)
scripts/migrate-keyframes-js-lerp.mjs      # codemod published via npm pack
scripts/proof-as-any-budget.mjs            # G.W3 Lane D
scripts/proof-codemod-publication.mjs      # G.W3 Lane I
scripts/proof-dts-layout.mjs               # F.W3 Lane D
scripts/proof-no-bare-builtins.mjs         # G.W3 Lane K
scripts/proof-no-deep.mjs                  # G.W3 Lane J
scripts/proof-no-deprecated.mjs            # G.W3 Lane B
scripts/proof-no-ts-ignore.mjs             # G.W3 Lane C
scripts/proof-resolution-contract.mjs      # ported from glass-ui
```

10 files total. **All 8 proof scripts wired into `package.json` `scripts.proof:*` AND `.github/workflows/node.js.yml`**.

### §4.2 — Orphan-script analysis

- **`generate-favicon.mjs`** — one-off, intentionally not wired (file header documents this). It's a manual tool the maintainer invokes during demo asset refreshes. No action.
- **`migrate-keyframes-js-lerp.mjs`** — wired as `npm run codemod:keyframes-lerp` AND included in `package.json files:` AND covered by `proof:codemod-publication`. Idempotency verified by inspection: the codemod's `hasCanonical` branch prints `[already-migrated] ${site.relPath} — canonical (a, b, t) order present; skipping` and increments `alreadyMigratedCount`. Re-running against a migrated sibling is a no-op. ✅

### §4.3 — Honest-gate adherence — re-audit each proof script

G.W3 Lane J's "comment-aware port lesson" was that the speedtest port of `:deep()` checking required block-comment stripping to avoid false-positives on narrative citations. Re-reading each proof script for similar exposures:

| Script | False-positive class? | False-negative class? | Verdict |
|---|---|---|---|
| `proof-no-deprecated.mjs` | grep "@deprecated" in src/. Could false-positive on a `// @deprecated` inside a comment? **YES — but src/ has 0 hits at HEAD and the F2 invariant is "no deprecated SURFACE", so a comment mentioning it would itself violate F2.** | None. | Honest. |
| `proof-no-ts-ignore.mjs` | grep "@ts-ignore" in src/. Same comment-class risk; src/ has 0 hits. Scope is src/-only (correct — demo has 2 @ts-ignore for `*.css?inline` highlight.js theme imports, intentionally not yet retired). | Demo @ts-ignore not surfaced. Intentional per G.W3 Lane C. | Honest, **but** demo-scope expansion (H candidate). |
| `proof-as-any-budget.mjs` | grep "as any" in src/. Could match a string literal `"as any"`. Current count 0. Budget 5 leaves headroom for genuinely unavoidable third-party shape coercions. | None. | Honest. |
| `proof-codemod-publication.mjs` | `npm pack --dry-run --json` shape parse. Matches `^scripts/migrate-[^/]+\.mjs$`. | If `migrate-keyframes-js-lerp.mjs` is renamed to use `_` separator, the regex misses. **Low-risk: the wildcard `migrate-*` is the documented convention.** | Honest. |
| `proof-no-deep.mjs` | Block-comment strip already in place (G.W3 Lane J's comment-aware port lesson). DEEP_RE = `/::v-deep\|:deep\s*\(/`. | None. | Honest. |
| `proof-no-bare-builtins.mjs` | Regex against `from "<builtin>"` etc. Skips dynamic `import.meta.resolve("path")` (irrelevant pattern). | None. | Honest. |
| `proof-dts-layout.mjs` | Asserts `dist/index.d.ts` PRESENT + `dist/src/` ABSENT. Trivial existence check. | None. | Honest. |
| `proof-resolution-contract.mjs` | Multi-check; types-key existence probe (Check 4) added at G.W3 Lane A. Each check named and scoped. | None evident. | Honest. |

**No proof script has a false-positive or false-negative class that escapes its documented scope.** The G.W3 codification is sound.

### §4.4 — `as unknown as` codification candidate

The user's note: "the G2 invariant codified `as any`; `as unknown as` was left as the wave gate. H question: codify it."

Current state at HEAD:

```
src/units/normalize.ts:110:    style as unknown as Record<string, string>;
src/units/normalize.ts:319:    return value as unknown as Parameters<typeof normalizeColorUnits>[0];
src/units/color/dispatch.ts:143:    const fromXYZFn = toEntry.from as unknown as (
src/parsing/color.ts:59:    const plain = color.clone() as unknown as Color<number>;
```

**4 `as unknown as` sites in src/.** Each is at a genuine bridging point: parser-output-to-typed-record, color-clone bridge, DIRECT_PATHS dispatch-table lookup. None are cast-laundering.

Additionally: `api/src/index.ts:150` (SIGTERM `.close()` coercion — 1 site, well-justified). `demo/` has 4 sites (`useViewManager.ts`, `GradientStopEditor.vue`, `quantize-worker.ts` x2 — Worker self-cast which is structurally correct).

**H CANDIDATE (H-OPP-SCRIPTS-1 — HIGH RATIO)**: codify the corpus as `scripts/proof-as-unknown-as-budget.mjs` with BUDGET = 6 (current src/ count 4 + headroom; OR a tighter 5 to match the as-any cap). Same shape as `proof-as-any-budget.mjs` (sub-60 LoC), wired into the existing proof:* CI block. The motivation is parallel to G2: `as unknown as` is the next-most-corrosive escape hatch (it discards the source type at a callsite, just not the target type). Capping the budget at the current count + 1 prevents silent drift while leaving a single-site headroom. This is the natural G2→H3 extension.

### §4.5 — Verdict

scripts/ is healthy. All 8 proofs wired and honest-gated. ONE codification candidate (proof:as-unknown-as-budget). Codemod idempotency verified.

---

## §5 — Cross-cutting findings

### §5.1 — Doc trio re-check

- **root CLAUDE.md** — lists all 8 proof commands. Matches `package.json` scripts. No drift.
- **demo/CLAUDE.md** — `viewSchema.ts` enumerates 9 views; demo CLAUDE.md describes the same 9 (verified via `viewSchema.ts` and demo CLAUDE.md sections). No drift.
- **api/CLAUDE.md** — services subtree enumeration matches (G.W4 fixed); `withTransaction` site count (7) matches; endpoints table matches. **One soft drift**: the api/CLAUDE.md "Cross-collection transactions" section enumerates the 7 sites but doesn't note the createPalette/patchPalette gap that H-OPP-API-2 identifies. If H accepts that candidate, api/CLAUDE.md's site count should bump 7 → 9.

### §5.2 — CONTRIBUTING.md completeness

CONTRIBUTING.md (73 lines) covers:
- Constellation + sibling checkout layout ✅
- File: devDependencies rationale ✅
- Codemod execution pattern ✅
- Dev quickstart ✅
- The 8 proof scripts ✅

Missing:
- No mention of `npx playwright install` (or that smoke-safari needs WebKit). **H-OPP-E2E-2**.
- No mention of the manual publish process. **H-OPP-CI-1**.

### §5.3 — Chronic-list (G inherits + carry-forward at H)

| Item | Origin | G disposition | H disposition (recommendation) |
|---|---|---|---|
| `bench-gate inline shell → scripts/proof-bench.mjs` extraction | G-OPP-SCRIPTS-4 | DEFER (borderline) | DEFER (same; not yet sharpened) |
| Chromium sustained-30s spec | G-OPP-E2E-2 | DEFER-WITH-TRIGGER (fold if Chromium-only regression escapes) | DEFER-WITH-TRIGGER (no escapes during G; same trigger) |
| `proof:vendor-consumers.mjs` | G-OPP-VENDOR-1 | DEFER-WITH-TRIGGER (fold when a glass-ui peer-authored primitive lands) | DEFER-WITH-TRIGGER (no glass-ui ship in G; same trigger) |
| Demo `@ts-ignore` 2 hits in `useMarkdownHighlighting.ts` | G-OPP-SCRIPTS-3 partial | scope limited to src/ (G.W3 Lane C); demo hits remain | FOLD-INTO-H: add `declare module "*.css?inline"` to `demo/color-picker/vite.d.ts`; extend proof:no-ts-ignore scope to demo/ |

### §5.4 — Cross-domain verdict

The G-AUDIT-6 list of 8 G-targets all landed. Re-auditing surfaces 6 new items, ranked by ratio (invariant-tightening + correctness-gain) ÷ (LoC + risk):

---

## §6 — H candidate ranking (consolidated)

| # | ID | Domain | Description | Disposition | Approx LoC | Target H wave |
|---|---|---|---|---|---|---|
| **1** | **H-OPP-API-2** | api/ | **DEFECT** — extend `withTransaction` to `createPalette` (`crud.ts:101–119`) + `patchPalette` (`crud.ts:139–184`). Mirrors G.W3 Lane E exactly; `createVersionRecord` already accepts `session?`. Plus 1 rollback-test sub-case. | **FOLD-INTO-H** | ~25 LoC src + ~30 LoC test | H.W1 / H.W2 (correctness) |
| **2** | **H-OPP-SCRIPTS-1** | scripts/ | **Codify `as unknown as` budget** as `scripts/proof-as-unknown-as-budget.mjs`. Current src/ count 4; budget 5 or 6. Wire into CI proof:* block. Parallels G2 (`as any`). | **FOLD-INTO-H** | ~55 LoC + 1 yml step | H.W2 (invariant) |
| **3** | **H-OPP-API-1** | api/ | **Strictness lift** — add `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules` to `api/tsconfig.json`. Fix-cluster will surface; api/ code is well-typed by inspection. | **FOLD-INTO-H** (assess fix cluster pre-merge) | ~4 LoC config + N fix surface | H.W1 (probe pre-cluster) |
| **4** | **chronic** | scripts/ | Extend `proof:no-ts-ignore` scope to demo/ after adding `declare module "*.css?inline"` to `demo/color-picker/vite.d.ts`. Retires the 2 remaining @ts-ignore hits. | **FOLD-INTO-H** | ~3 LoC decl + ~2 LoC script | H.W2 |
| **5** | **H-OPP-E2E-1** | e2e/ | Reactivity-flake mitigation — split the 200ms double-duty waitForFunction into a 2000ms outer "alive?" timeout + the existing 100ms median "instant?" gate. Removes RM-1 environmental-flake class without lowering the perceptual-instant invariant. | **FOLD-INTO-H** | ~5 LoC | H.W3 |
| **6** | **H-OPP-CI-1** | CI/docs | Document the manual publish process in CONTRIBUTING.md (post-tranche-close ceremony: `npm publish --legacy-peer-deps`, tag-push). | **FOLD-INTO-H** | ~10 LoC | H.W3 |
| **7** | **H-OPP-E2E-2** | docs | CONTRIBUTING.md: add `npx playwright install` quickstart line. | **FOLD-INTO-H** (combine with #6) | ~3 LoC | H.W3 |
| **8** | **H-OPP-API-3** | api/ | rollback-test growth for the new H-OPP-API-2 transactional surface (palette+version atomicity sub-case). | Co-shipped with #1 | ~30 LoC | H.W1 |

**Deferred (no change from G)**:
- G-OPP-SCRIPTS-4 (bench-gate YAML extraction) — DEFER (borderline).
- G-OPP-E2E-2 (Chromium sustained-30s) — DEFER-WITH-TRIGGER.
- G-OPP-VENDOR-1 (proof:vendor-consumers) — DEFER-WITH-TRIGGER.

---

## §7 — Sub-gate verdict

api/ + e2e/ + CI mesh is **healthy at H open**. G shipped 8/8 G-targets. Findings split:

| Layer | Verdict | Top H candidate |
|---|---|---|
| api/ | INTACT except createPalette/patchPalette gap; 21 tests / 11.62s | **extend withTransaction to createPalette + patchPalette** (defect) |
| e2e/ | 36 specs across 5 projects; all 9 views covered | reactivity-flake mitigation (waitFor split) |
| CI | 18+ gate steps; all 8 proofs wired; no INERT gates; no release workflow | document manual publish in CONTRIBUTING |
| scripts/ | 8 proofs honest-gated; codemod idempotent | **codify `as unknown as` budget** (G2 parallel) |
| Docs | trio bit-accurate post-G.W4 | CONTRIBUTING.md: playwright + publish lines |

**6 net H candidates surfaced**: 1 defect (createPalette/patchPalette), 1 invariant-codification (`as unknown as`), 1 strictness-lift (api/ tsconfig), 1 chronic-close (demo @ts-ignore), 1 flake-mitigation (reactivity-instant), 1 docs-gap (CONTRIBUTING.md). The user's "elegance, simplicity, performance" directive maps to: defect-repair (API-2), invariant-codification (SCRIPTS-1, API-1), chronic-retirement (the demo @ts-ignore chronic). No new surface area; no new modules; no new abstractions. Sweep + tighten posture maintained.
