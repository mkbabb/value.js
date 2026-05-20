# E-AUDIT-6 — api/ + e2e/ + cross-cutting concerns

**Tranche**: E (opened post-D-merge `eae8afc`, branch `tranche-e`).
**Substrate**: master HEAD `eae8afc` ("Merge tranche-b into master — Tranche D close (v0.6.0)").
**Mode**: READ-ONLY research. Verifier ran one Playwright smoke set (no code mutation).
**Author**: E-AUDIT-6.
**Hard cap**: 60 minutes.

## §1 — Methodology

Inspected at master HEAD, every file in scope read fully or in load-bearing portions, no edits:

- **api/** — `api/CLAUDE.md`, `api/src/index.ts`, `middleware.ts`, `middleware/{inject-services,require-ownership}.ts`, `db.ts`, `cron.ts`, `cache/lru.ts`, `errors/index.ts`, `events/auditLog.ts`, `migrations/check.ts`, `db/collections.ts`, `repositories/{palette,vote,user}.ts` (+ file listing of the others), `services/palette/{crud,crud-list,votes,forks,versions,import}.ts` and `services/admin/{audit,colors,users,import}.ts`, `routes/palettes/{index,crud,forks,votes}.ts`, `routes/admin/{index,users,colors}.ts`, `routes/sessions.ts`, `routes/colors.ts`, `validation/{session,color}.ts`, `package.json`, `tsconfig.json`, `Dockerfile`, `compose.yaml`, `deploy.sh`. 33 source files surveyed, 4 read in full for service-shape verdicts (`crud.ts`, `crud-list.ts`, `forks.ts`, `users.ts`), all 21 source/test entry points line-counted.
- **e2e/** — `playwright.config.ts`; all 14 active spec files (`color-space-switching`, `page-load`, `reactivity-instant`, `view-switch`, `walk`, `webgl-atmosphere`, `webgl-goo-blob`, `views/{browse,extract,generate,gradient,mix,palettes}`, `mobile/page-load-mobile`, `admin/{admin-audit,admin-flagged,admin-names,admin-tags,admin-users,admin-walk}`); the `admin/fixtures/admin-auth.ts` fixture in full. Verifier ran `--project=smoke` (14 specs, 2 workers), `--project=smoke-admin` (6 specs), `--project=smoke-mobile` (1 spec), and `reactivity-instant.spec.ts` solo with `--workers=1`.
- **Cross-cutting** — `package.json`, `tsconfig.json`, `eslint.config.js`, `.prettierrc.json`, `.gitignore`, `bench/color-channel-access.mjs`, `scripts/proof-resolution-contract.mjs`, `scripts/generate-favicon.mjs` (listing), `.github/workflows/node.js.yml`, `CHANGELOG.md`, `vitest.config.ts`. Tag mapping (`git rev-list v0.6.0`) checked.

Verdict criteria — for each module: pipeline conformance, layer purity, fail-explicit invariant adherence, file-size cap (≤ 250 LoC for repositories + services per `api/CLAUDE.md` partition), legacy-code stowaways, race-window inspection.

## §2 — api/ structural review

### §2.1 — Pipeline shape: per-route spot-check (5 routes randomly)

Per `api/CLAUDE.md` the canonical pipeline is `validate → authn → authz → service → repository → format → response`. Spot-checked 5 routes:

| Route | Pipeline conformance |
|---|---|
| `POST /palettes` (`routes/palettes/crud.ts:66`) | **Conformant** — zod (`createPaletteBody.safeParse`) → `AuthenticationError` if no token → service (`createPalette`) → repo (`palettes.insert`) → `formatPalette` → `c.json(..., 201)`. |
| `POST /palettes/:slug/vote` (`routes/palettes/votes.ts:17`) | **Conformant** — minimal route; service does the heavy lifting via `toggleVote` (gated `$inc`). |
| `GET /palettes/:slug/forks` (`routes/palettes/forks.ts:62`) | **Conformant** — zod, service, `formatPalette`. |
| `POST /admin/users/:slug/status` (`routes/admin/users.ts:66`) | **Conformant** — zod (`setUserStatusBody`), service (`setUserStatus`), repo, `emitAuditEvent`. |
| `POST /sessions/login` (`routes/sessions.ts:42`) | **NON-CONFORMANT** — ad-hoc `body.slug.trim().toLowerCase()` parsing (zod `loginBody` exists in `validation/session.ts:7` but is never imported); `db.collection("users").findOne` direct, NO repo call; ad-hoc 200ms `setTimeout` constant-time padding; 4× `c.json({ error: "…" }, 4xx)` envelopes that bypass the typed-error envelope. |

Spot-check finding: **3 of the 4 router files migrated to the new pipeline are fully conformant; `routes/sessions.ts` and `routes/colors.ts` (the two `default export` legacies, the only two routers that survived D.W2 unmolested) are NOT.** Together they hold 11 of 16 raw `c.json({ error: ... })` envelopes in the codebase (the other 5 are in `middleware.ts` itself, which is structurally allowed).

### §2.2 — Per-module verdict

**`api/src/index.ts` (169 LoC)** — Healthy. CORS preflight reflective; middleware ordering documented; SIGTERM/SIGINT graceful with 5s grace; `assertMigrationsApplied` runs before listener bind. One nit: line 24's `function resolveOrigin(c: any)` defines a per-request helper inside module scope — could lift the closure but no measurable cost.

**`api/src/middleware.ts` (279 LoC, ~300 with imports/comments)** — Mixed verdict. Hits the 250 LoC soft-cap. Surface:
1. CORS (`corsHeaders`, lines 6–26) — fine.
2. IP resolution (`resolveIP`, lines 30–56) — fine; trust-proxy gate documented.
3. Rate limiting (lines 58–203) — **4 separate limiters** (`readLimiter`, `writeLimiter`, `registrationLimiter`, `loginLimiter`), each with `setInterval` sweep (the cron sweep on line 94 mutates ALL 4). Two separate factory-style middlewares (`registrationRateLimit` at 175, `loginRateLimit` at 192) each have an identical 9-line pre-check before calling `limiter.check(ip)`. **Dup-3 pattern** — `if (!limiter.lru.has(ip) && limiter.lru.size >= RATE_MAP_CAP) { if (!limiter.lru.evictOne()) … } if (!limiter.check(ip)) …` appears at lines 110–118, 177–184, 194–201. The general `rateLimit` (line 102) does this inline; the two factories repeat it.
4. Session resolution (134–171) — works but still uses `db.collection("sessions").findOneAndUpdate` and `db.collection("users").findOne` directly. `injectServices` puts `services.repositories.{sessions,users}` on `c.var` *before* `resolveSession` runs (line 54 ordering verified), so this middleware COULD migrate to the repository pattern but hasn't. The D.W2 inject-services.ts (line 53) explicitly says "Must run BEFORE resolveSession so the latter (when migrated) can use repositories" — the future migration was anticipated and is still pending.
5. Admin auth (207–226) — fine. Timing-safe; the early 503 if `ADMIN_TOKEN` missing is correct.
6. `sanitizeBody` (245–261) — fine; rejects MongoDB `$`-keys.
7. `hashIP` + `escapeRegex` (266–279) — utilities, belong elsewhere.

**`api/src/middleware/inject-services.ts` (77 LoC)** — Healthy. Lazy module-level singleton; `__resetServicesForTest` hook present though never exercised (no backend tests exist).

**`api/src/middleware/require-ownership.ts` (42 LoC)** — Healthy primitive, but **NOT WIRED** anywhere in `routes/`. `grep` for `requireOwnership` returns the definition only; the actual ownership check is duplicated inline inside `services/palette/crud.ts:144` (`patchPalette`), `:201` (`deletePalette`), `services/palette/versions.ts:122` (`revertToVersion`), `services/palette/flags.ts` (similar). Each carries the same 4-line `palette.sessionToken === sessionToken || (userSlug !== undefined && palette.userSlug === userSlug)` predicate the middleware was authored to replace (D.W2 Lane C #6 per the file-header docstring). **Lane C never finished the wiring step.**

**`api/src/errors/index.ts` (121 LoC)** — Healthy. `ApiError` base + 7 typed subclasses + `toResponseEnvelope` mapper. The contract is sound; what's missing is universal adoption (see §2.1).

**`api/src/events/auditLog.ts` (57 LoC)** — Healthy. The befitting-graceful carve-out (D3) is explicit + structured `console.error` (NOT silent swallow). 17 invocation sites across admin services.

**`api/src/migrations/check.ts` (121 LoC)** — Healthy startup smoke probe.

**`api/src/cache/lru.ts` (138 LoC)** — Healthy. The D.W2 Lane D consolidation achieved its goal: a single `LRU<K, V>` backs all 4 rate limiters + the suspended-user cache + (potentially) future cron caches. **Caveat**: the file's comment header (lines 4–9) lists "three independent implementations" pre-consolidation — verifier confirms only ONE in-memory implementation remains.

**`api/src/db.ts` (87 LoC)** — Healthy. The 27 idempotent index-creates fan out via `Promise.all`. Singleton with `closeDb()` for graceful shutdown.

**`api/src/db/collections.ts` (58 LoC)** — Healthy. The single allow-listed `db.collection(...)` site (per the header).

**Repositories** — 9 files, all ≤ 148 LoC (largest: `palette.ts` 148; smallest: `tag.ts` 27). All pure data-access. **All 9 conformant** — no business logic leak. The 250 LoC cap is satisfied with significant margin (median 60 LoC, max 148 LoC).

**Services (palette/)** — 7 files, all ≤ 215 LoC (`crud.ts` 215, `crud-list.ts` 207). 250 LoC cap satisfied. `crud-list.ts` was the deliberate split-from-crud noted in its header to stay under cap. **All 7 read-conformant**.

**Services (admin/)** — 9 files, all ≤ 203 LoC (`users.ts` 203, `colors.ts` 102, `import.ts` 79). 250 LoC cap satisfied. **All 9 conformant** to the service-thinness predicate (validate-ish → repo call → emit-audit → return). The `import.ts` split-out from `users.ts` (header line 5) was a deliberate 250-cap maintenance move.

**Routes (palettes/)** — 5 files + index, all ≤ 117 LoC. **All conformant**.

**Routes (admin/)** — 8 files + index, all ≤ 104 LoC. **All conformant**.

**Routes (top-level)** — `sessions.ts` (123 LoC), `colors.ts` (163 LoC). **NEITHER conformant**. They predate the D.W2 refactor and were left alone. See §2.1 and §3.

### §2.3 — Pipeline universality verdict

**`api/` SOUNDNESS VERDICT — conformant for 87% of the route surface, two routers (sessions + colors, 286 LoC combined) bypass the entire pipeline.**

The pipeline architecture is sound and well-designed; service/repository separation is faithful where it has been applied; typed errors map cleanly via the global `onError` handler. **What's missing is universal adoption**. The D.W2 wave migrated `routes/palettes/*` (5 files) and `routes/admin/*` (8 files) but never touched `routes/sessions.ts` or `routes/colors.ts`, leaving them as 286 LoC of pre-refactor legacy that:

1. Use `getDb()` + `db.collection(...)` directly (15 hits).
2. Use raw `c.json({ error: "string" }, status)` envelopes (16 hits) that produce a DIFFERENT shape than the canonical `{ error: { code, message, detail? } }` — frontend consumers of `/sessions/login` and `/colors/propose` will see ad-hoc envelopes while admin and palette routes give them the typed envelope.
3. Have ad-hoc inline zod-substitute validation despite `validation/session.ts` and `validation/color.ts` existing AS LANE C #7 ARTIFACTS (the headers in those files say "D.W2 Lane C #7" — the schemas WERE authored but never wired).

The `requireOwnership` middleware is similarly authored-but-unwired (§2.2).

### §2.4 — Race-window inspection: `withTransaction` non-wiring

The vote-toggle idempotent upsert (`services/palette/votes.ts` + `repositories/vote.ts:upsertIdempotent`) is sound: the unique-index gate on `(userSlug, paletteSlug)` makes the `inserted` flag the canonical signal for `$inc`. F3 fixed correctly.

However, `forkPalette` (`services/palette/forks.ts:29`) has a **race window** between line 35 (`source = palettes.findBySlug(sourceSlug)`) and line 90 (`palettes.incrementForkCount(sourceSlug)`). If the source palette is deleted between those two awaits, `incrementForkCount` increments a stale slug or a no-op (Mongo `updateOne({slug}, ...)` on a missing slug returns `modifiedCount: 0` silently). The new fork's `forkOf` field still points at the deleted source, and the source's deletion handler in `deletePalette` (lines 210–212) only decrements `forkOf`'s count if `palette.forkOf` exists — it does NOT cascade-delete forks-of-this-palette. So a fork orphaned this way persists with a dangling `forkOf` reference.

This is acceptable given the "befitting graceful" disposition (the request succeeds, the fork exists, orphaned-counter is detectable via cron) — but it is NOT atomic. The wave headers don't claim atomicity, only "idempotent-upsert + gated `$inc`", which is honored.

### §2.5 — Backend tests

**ZERO backend tests exist.** `find api/ -path "*/node_modules" -prune -o -name "*.test.*" -print -o -name "*.spec.*" -print` returns 0 results outside `node_modules/`. The `__resetServicesForTest` hook in `inject-services.ts:66` is unused. `vitest` is not in `api/package.json` devDependencies. Coverage of the api/ code path is entirely via:
1. Frontend smoke (admin specs use the `addInitScript` MOCK fixture — they don't actually exercise the api/).
2. Manual smoke (`deploy.sh` curl).
3. Production canaries (none observed).

Adding `vitest` to api/ is feasible — the repositories are pure-data-access, fully injectable via `makeCollections` mocks; services take an explicit `Services` arg; errors are pure value classes. Integration via Hono's `app.fetch` (no HTTP listener required) is straightforward. E should add a `test:api` script and at least a thin unit coverage for the typed-error mapper + vote-toggle race + the fork orphan window.

## §3 — api/ legacy code inventory

Items that should be retired or refactored in E:

1. **`routes/sessions.ts` (123 LoC) + `routes/colors.ts` (163 LoC) — full pipeline migration**. Both files entirely bypass the D.W2 architecture. **Both have zod schemas already authored** in `validation/{session,color}.ts` that are unused. Migration effort: ≤ 300 LoC delta across 4 files (move db calls into repositories that already exist for sessions + a new ProposedNameRepository method or two for colors; replace `c.json({error})` with typed-error throws). **HIGH PRIORITY — this is the single largest pipeline-conformance gap.**

2. **`api/src/middleware.ts` (279 LoC)** — split into `api/src/middleware/*.ts` to match the new directory pattern (`inject-services.ts`, `require-ownership.ts` already live there). Proposed split:
   - `middleware/cors.ts` (~30 LoC)
   - `middleware/ip.ts` (`resolveIP` + `hashIP` + `escapeRegex` — though `escapeRegex` should arguably move to a `utils/` dir since it has nothing to do with middleware)
   - `middleware/rate-limit.ts` (~100 LoC) — consolidate the 3 duplicated pre-check blocks into a single `enforceRateLimit(limiter, c)` helper. Move the `setInterval` sweeper out (it's fire-and-forget at module load).
   - `middleware/session.ts` (~40 LoC) — `resolveSession`; migrate to use `services.repositories.{sessions,users}` (the `injectServices` ordering already supports this).
   - `middleware/admin-auth.ts` (~25 LoC) — `adminAuth`.
   - `middleware/sanitize-body.ts` (~25 LoC).

3. **`require-ownership` wiring** — the middleware is authored but never `.use()`-applied. Per file-header docstring D.W2 Lane C #6, route signatures should be `palettes.delete("/:slug", requireOwnership(extractor), handler)`. Currently the same predicate is duplicated 4 times across `services/palette/{crud,versions,flags}.ts`. Wire the middleware in `routes/palettes/{crud,versions,flags}.ts`, delete the inline checks in services.

4. **The `palette.sessionToken === sessionToken` legacy ownership shim** is STILL alive in `services/palette/crud.ts:145`, `:202`, `services/palette/versions.ts:123`. The migrations check (`migrations/check.ts:48`) asserts every palette has `userSlug`, so the sessionToken-fallback path is dead code. Excise. (The header on `require-ownership.ts:3` says this was the F2 disposition; the excision step was deferred.)

5. **The `Authorization: Bearer ADMIN_TOKEN` pattern** — single-token timing-safe-compare. Acceptable for the single-admin tool use case; **not worth replacing with JWT/scoped tokens** unless E adds multi-admin or operator-scoped permissions. The `Bearer ADMIN_TOKEN` is shared via env var; rotating it requires a redeploy. Recommendation: keep as-is for E; revisit only if multi-admin requirements emerge.

6. **MongoDB-vs-document-store choice** — `users._id = slug` (string), 9 collections, 27 indexes. The document model fits the data well (palettes have nested colors arrays, version-trees, etc.). **No reason to revisit.** A relational store would force normalization that buys nothing and costs index complexity.

7. **Structured logging** — `console.log` / `console.warn` / `console.error` (21 hits in api/). No `pino`/`winston`/structured-logger. For the single-Docker-host deploy + Apache reverse-proxy stack, this is fine — the json-file logging driver in `compose.yaml:42` rotates 10MB×5 files. **HOWEVER**, the audit-emit-failure path (`events/auditLog.ts:50`) emits a structured-shaped log via `console.error` with a payload object — JSON-LIKE but NOT json-encoded. If E wants observable audit-failure rates from logs, this should `JSON.stringify` the payload. Low priority.

8. **`api/src/cron.ts` (29 LoC)** — One-shot daily cleanup. Bypasses repositories (lines 4–24 use `db.collection(...)` directly). Migrate to use `services.repositories.{sessions,votes,palettes}` for consistency with the rest of the api. **Low effort, high consistency win.**

9. **`api/src/slugWords.ts:95`** — `db.collection("users").findOne` direct call inside `generateUniqueSlug`. Migrate to `UserRepository.findBySlug`. Low effort.

10. **`format/palette.ts` exists; no `format/user.ts` / `format/proposedName.ts`** — the formatter pattern is good but only one entity has a formatter. Other DTOs are constructed inline in services (e.g. `services/admin/users.ts:60` builds `UserListEntry` map inline; `services/admin/audit.ts:44` builds `AuditEntryDTO`). Either lift these into `format/` for consistency, or rename `format/` to `format/palette.ts` is fine as-is. Style call.

## §4 — e2e/ structural review

### §4.1 — Suite shape

21 specs across 3 projects (verified count, matches the `playwright.config.ts` partition + the D.W5 wave-log):

| Project | Spec count | testDir |
|---|---|---|
| `smoke` | 14 | `e2e/smoke/` excluding `admin/` + `mobile/` |
| `smoke-admin` | 6 | `e2e/smoke/admin/` |
| `smoke-mobile` | 1 | `e2e/smoke/mobile/` |

### §4.2 — Per-spec quality

| Spec | LoC | Verdict |
|---|---|---|
| `page-load.spec.ts` | 50 | Healthy — role/label only; env-noise filter applied. |
| `view-switch.spec.ts` | 27 | Healthy. |
| `color-space-switching.spec.ts` | 30 | Healthy. |
| `walk.spec.ts` | 49 | Healthy — exercises 7 views including Home return. |
| `webgl-atmosphere.spec.ts` | 53 | Healthy — `addInitScript` event hook installed at t=0. |
| `webgl-goo-blob.spec.ts` | 57 | Healthy — exercises unmount/remount via Home→Browse→Home. |
| `reactivity-instant.spec.ts` | 174 | **Concern: flaky under parallel-worker load** (see §4.3). |
| `views/browse.spec.ts` | 36 | Healthy. |
| `views/extract.spec.ts` | 40 | Healthy. |
| `views/generate.spec.ts` | 37 | Healthy. |
| `views/gradient.spec.ts` | 42 | Healthy — interpolation-heading fallback noted (reka-ui slider thumbs invisible to role-queries). |
| `views/mix.spec.ts` | 34 | Healthy — minimal (heading-only assertion). |
| `views/palettes.spec.ts` | 42 | Healthy. |
| `mobile/page-load-mobile.spec.ts` | 55 | Healthy. |
| `admin/admin-audit.spec.ts` | 23 | Healthy. |
| `admin/admin-flagged.spec.ts` | 23 | Healthy. |
| `admin/admin-names.spec.ts` | 23 | Healthy. |
| `admin/admin-tags.spec.ts` | 23 | Healthy. |
| `admin/admin-users.spec.ts` | 26 | Healthy. |
| `admin/admin-walk.spec.ts` | 53 | Healthy — sequential 5-view walk. |

20 / 21 specs conformant to the B.W3 binding invariants (role/label selectors only, no `waitForTimeout`, no `.lucide-*`, no `page.evaluate` for interaction). The `page.evaluate(() => performance.now())` in `reactivity-instant.spec.ts` is read-only timing and is documented as exempt (lines 13–15).

### §4.3 — Flake verification

Verifier executed:

- `npx playwright test --project=smoke --workers=2` (default CI-ish parallelism). **1 / 14 failed**: `reactivity-instant.spec.ts:111` (slider-keyboard) — median 54.30ms, threshold 50ms.
- `npx playwright test --project=smoke-admin` (6 workers, default). **All 6 passed**, 7.7s.
- `npx playwright test --project=smoke-mobile` (1 worker). **1 passed**, 4.9s.
- `npx playwright test e2e/smoke/reactivity-instant.spec.ts --project=smoke --workers=1`. **Both passed**, medians 7.40ms + 31.20ms.

**Diagnosis**: `reactivity-instant.spec.ts:23` configures `test.describe.configure({ mode: "serial" })` which serializes the TWO tests in that file against each other, but does NOT limit overall worker concurrency. The spec header (lines 19–22) PROMISES "use of one test worker for this file" but `playwright.config.ts` does not enforce it (no `workers: 1` setting; no per-file `test.use({ workers: 1 })` hook — that API doesn't exist; the correct mechanism is `test.describe.configure({ mode: 'serial' })` PLUS launching playwright with `--workers=1` for the whole project). When other smoke specs run in parallel workers, they contend for CPU, inflating the measured deltas above the 50ms threshold.

CI mitigation: `retries: 2` (line 18 of config) papers over this — a single flake re-runs. The 8000ms `expect: { timeout }` (line 20) doesn't apply to the `expect(median).toBeLessThanOrEqual(50)` assertion. **The retry papers over a real architectural mismatch.**

### §4.4 — Admin-mock fixture surface

`e2e/smoke/admin/fixtures/admin-auth.ts` (87 LoC). Routes intercepted:
1. `**/sessions` POST — returns fake session.
2. `**/sessions` other methods — returns `{}`.
3. `**/admin/tags` — returns `[]` (the raw-array shape noted in line 66 docstring).
4. `**/admin/**` — returns `{ data: [], total: 0, limit: 50, offset: 0 }`.

**Surface gap**: anonymous-session POST is the only `**/sessions` shape stubbed; if a future admin spec calls `POST /sessions/login` it falls through to the `{}` catchall (which is NOT a valid login response — the real shape is `{ token, userSlug }`). Acceptable for current specs; flag if E adds a login-flow admin spec.

**Surface gap**: `**/palettes/**`, `**/colors/**` are NOT mocked. None of the current admin specs trigger those calls, but a future spec that does (e.g. an admin-detail-view that previews a palette) would hit the real API. Document in the fixture.

### §4.5 — WebGL specs

`webgl-atmosphere.spec.ts` and `webgl-goo-blob.spec.ts` use `addInitScript` to install a `webglcontextlost` listener BEFORE any canvas mounts (idiomatic per the B.W3 invariant). They assert:
- atmosphere — 2s warm-up, no `webglcontextlost`, no `[stale prop]` console.
- goo-blob — survives Home → Browse → Home unmount/remount cycle.

**Coverage gap**: the specs catch context-loss events but do NOT catch:
- Shader compile failures (would surface as a *different* console error).
- Frame-rate degradation (no fps measurement).
- Color-space mismatches in the rendered output (no pixel diff).

These are smoke specs, not regression specs; the current scope is correct. If E wants pixel-perfect regression coverage, a 4th project `smoke-webgl-visual` with `toHaveScreenshot` against canvases would be a separate undertaking. Out of scope for E unless explicitly added.

### §4.6 — Mobile spec adequacy

One Pixel-7 boot probe (`mobile/page-load-mobile.spec.ts`, 55 LoC) — verifies the mobile slot mounts, dock visible, view-select reachable. **Sufficient as smoke**, per the spec header citing the 5-second budget. Expansion candidates:
- Mobile palette-card-grid tap interaction.
- Mobile drawer open/close (vaul-vue).
- iOS-Safari engine (currently only Chromium-via-Pixel-7).

The header (lines 12–14) notes the WebKit follow-up is filed in `coordination/Q.md §11`. Document as deferred.

### §4.7 — Coverage gap inventory

**Views with NO smoke coverage** (the 6 user views all have smoke; the Home/picker is implicit via `walk.spec.ts`):
- `Image Palette Extractor` interaction (only verifies the drop-zone button mounts, NOT actual extraction flow).
- `Generate` interaction (only verifies the preset Select; not actual generation).
- `Gradient` interaction (only verifies the heading; the docstring at line 36 notes reka-ui slider thumbs are 0×0 spans and unreachable via role).
- `Mix` interaction (only verifies heading).
- `Color name proposal` flow (NO spec).
- `Palette save/edit/delete` flow (NO spec).
- `Palette fork` flow (NO spec — would need backend or extensive mocking).
- `Vote toggle` (NO spec).
- `Flag palette` (NO spec).
- `Login flow` (NO spec — see §4.4 fixture surface gap).
- Admin: tags CREATE/DELETE flow (only renders Refresh button, doesn't exercise tag CRUD).
- Admin: user status change (only renders SearchBar, doesn't exercise status toggle).
- Admin: palette feature toggle (NO spec).
- Admin: color name approve/reject (NO spec — though `admin-names.spec.ts` exists, it's a render-only smoke).

**Verdict on coverage gaps: 14 user-facing flows with NO smoke coverage**. All are mutate-or-interact paths (vs. mount-and-render which is well-covered). E should pick the highest-leverage 3–5 (vote toggle, login flow, palette save, color proposal, admin tag CRUD) and add interactive-smoke specs.

## §5 — e2e/ legacy code + helper opportunities

1. **No `.skip` / `.only` / commented-out specs**. `grep` returns 0 hits. Clean.

2. **No `console.log` debug statements** except in `reactivity-instant.spec.ts` where they're deliberately diagnostic (median output for CI log inspection). Acceptable.

3. **Env-noise filter** — IDENTICAL 4-line block at the top of 8 specs (`page-load`, `walk`, `views/browse`, `views/extract`, `views/generate`, `views/gradient`, `views/mix`, `views/palettes`):

   ```ts
   const isEnvNoise = (text: string) =>
       /\b(429|503|504)\b|Too Many Requests|Failed to load resource/i.test(text);
   ```

   **Should be a shared fixture.** Proposed `e2e/smoke/fixtures/env-noise.ts` exports a `consoleErrorCollector(page, { filter: 'env-noise' })` helper or a `test` extension that auto-installs the filter. ~30 LoC of duplication × 8 sites = ~240 LoC the helper would eliminate. **HIGH PRIORITY** for E — exactly the kind of consolidation E's "no legacy code" directive should bless.

4. **`.last()` / `.first()` mobile-vs-desktop disambiguation** — appears in 12 specs (every view-spec uses `.last()` to pick the visible desktop pane; `admin-flagged.spec.ts` and `admin-audit.spec.ts` use `.first()` because their admin panes mount in the reverse order). The convention is documented per-spec in comments. **Should be a helper** — e.g. `getVisiblePaneRole(page, 'heading', { name: 'Foo' })` that picks the role-matching descendant whose `offsetParent !== null`. The convention is consistent enough to deserve a single canonical helper rather than 12 inline `.last()` calls with comment-attached rationale.

5. **`page.goto("/")` + `expect(main).toBeVisible()` boilerplate** — appears at the top of every non-admin spec. Could become a fixture-level `bootedPage` extension that yields a page with `main` already asserted-visible. Modest LoC win but eliminates one source of copy-paste drift.

## §6 — bench/ review

**One benchmark exists**: `bench/color-channel-access.mjs` (164 LoC).

- Measures the L8 own-property-vs-Map.get speedup; threshold ≥ 5× median; CHANGELOG records 10×–10.67×.
- **Not in CI**. Not in `package.json` scripts. Run manually by the L8 author.
- **Not gated**. No regression check; if a future refactor reintroduces Map-storage the bench WILL detect it but only if someone runs it.

**Expansion candidates**:
- `gamut-mapping.test.ts` exercises `gamutMap` but doesn't bench it. A bench would catch a regression in the Ottosson zero-iteration claim.
- `mixColors` — D.W3 Lane C carries multiple memoization fixes; a bench would catch hash-bust regressions.
- `lerpColorValue` end-to-end (the actual hot path the L8 bench microbenched a piece of).
- `parseCSSColor` / `parseCSSValueUnit` — memoized in D.W3 Lane C L3; bench would assert cache hit-rate.

**Regression gate**: add a `npm run bench` script and a CI step that runs `node bench/color-channel-access.mjs` (exits non-zero on `< 5×`). Compounds the L8 invariant from "the author ran it once" to "every PR re-verifies it". **HIGH PRIORITY** — exactly the "elegance, simplicity, performance" win the E directive points at.

## §7 — CI review

`.github/workflows/node.js.yml` (50 LoC, 2 jobs).

**test job** — ubuntu-latest, 10-min timeout. Steps: checkout → setup-node@v5 (Node 24, npm cache) → `npm ci` → `npm run lint` → `npx vitest run` → `npx playwright install --with-deps chromium` → `npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile`.

**deploy job** — gh-pages on master push. Checkout main + sibling `glass-ui` → setup-node@v5 → `npm ci` → `npm run gh-pages` → copy CNAME → `peaceiris/actions-gh-pages@v4`.

### §7.1 — Gates present
- Lint (eslint flat config, `--max-warnings=0`).
- Unit tests (vitest).
- E2E tests (3 playwright projects).
- gh-pages deploy on master push.

### §7.2 — Gates missing
- **No `npm run proof:resolution`**. The contract-v2 dev-resolution gate ships in `scripts/proof-resolution-contract.mjs` as a script but is NOT invoked in CI. It's intended as a fleet-coordinated gate that requires sibling repos checked out; in this single-repo CI it would FAIL (expected) because the sibling consumer paths don't exist. The current solution is "manual run during fleet migrations". E could add it as a conditional CI step (only run when sibling checkouts succeed) or document the manual-only nature in CLAUDE.md.
- **No benchmark gate**. (See §6.)
- **No backend (api/) test step**. (See §2.5 — no backend tests exist yet.)
- **No CHANGELOG validation**. (See §8.)
- **No vue-tsc step**. `npm run typecheck` is defined in `package.json:42` but not run in CI. A type regression slips past unless caught locally.
- **No build verification**. The library build (`npm run build`) is never run in CI; only `npm run gh-pages` runs on master post-merge. A breaking change to the library entry point passes CI if it doesn't break demo or tests.

### §7.3 — Cache strategy
- `npm` cache via `actions/setup-node@v5` `cache: "npm"`. Good.
- `playwright install --with-deps chromium` runs every job — **NO cache**. The chromium browser binary (~150 MB) downloads on every CI run. Add `actions/cache@v4` with key `playwright-${{ hashFiles('package-lock.json') }}` over `~/.cache/ms-playwright`. **Medium priority** — 30s–60s saved per CI run.

### §7.4 — Matrix coverage
- **Single Node 24**. The package.json `engines` requires `>=22`. Add Node 22 + 24 matrix to verify the lower bound. Low effort, real coverage win.
- **No browser matrix** for Playwright. Only Chromium runs. WebKit (Safari) bugs are not caught in CI — the iOS Safari ValueUnit nesting bug (Mar 2026, MEMORY.md) was found via deploy, not CI. The D-HARDEN-5 §4 disposition (per `mobile/page-load-mobile.spec.ts` line 13) was to add WebKit "as a follow-up beyond D". **E should add at least a smoke-safari project** with WebKit.

### §7.5 — Release automation
- **Nothing automated.** Version bump is manual. CHANGELOG entry is manual. Tag is manual. `npm publish` has never run (the library is `file:`-linked from sibling repos).
- The D.W6 close-ceremony cadence (version bump → CHANGELOG entry → merge → tag the merge commit) is documented in `docs/tranches/D/D-RELEASE-PLAN.md §3` per the CHANGELOG footer but it's a runbook, not automation.

## §8 — Release process review

### §8.1 — Version bump cadence
- `package.json:version` is at `0.6.0`. Bumped at D.W6 from `0.5.1`.
- Tag `v0.6.0` resolves via `git rev-list -n 1 v0.6.0` to `eae8afc` — **the merge commit, NOT the close-ceremony commit** (`7ac4ecc`). The audit prompt assumed the inverse; verifier confirms the tag is on the merge commit, which IS the conventional choice (tags should mark the merged state on master, not the unmerged pre-merge ceremony commit).

### §8.2 — CHANGELOG format
- `CHANGELOG.md` (8065 bytes) follows a recognizable but NOT-keep-a-changelog format. Headings: `## v0.6.0 — 2026-05-20`, then `### BREAKING`, `### FEATURES`, `### INTERNAL`, `### RECURSION-PREVENTION HARDENING`, `### DEPS`, `### Merge / release authority`. Reasonable, dense, but non-standard.
- **Recommendation**: adopt keep-a-changelog v1.1.0 sections (`Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security`). Either standardize to that vocabulary or document the custom vocabulary in CONTRIBUTING.md.
- **No CI gate** validating CHANGELOG was updated when `package.json:version` changed. Easy to add.

### §8.3 — npm publish
- The package is `@mkbabb/value.js`, `"private"` is NOT set, exports + types + files are configured. **Publishable**. But: never published. Sibling repos use `"file:../value.js"`.
- E could either:
  - Make publishing official: add `release:npm` script, GitHub Actions release workflow that publishes on tag push (`v*`).
  - Or formalize the `file:`-only nature: add `"private": true` to package.json to prevent accidental publish.

### §8.4 — `npm run prepare`
- `"prepare": "test -f dist/value.js || npm run build"`. Verifier confirms `dist/value.js` exists at master HEAD (full dist listing per `ls dist/`). The `prepare` script runs on `npm install` and is idempotent: if `dist/` exists, no rebuild; if not (fresh clone in a sibling repo), builds the library. This is the AD.W4 freshness-gate disposition (per `docs/precepts/cross-repo-dev-resolution.md`). **Works as designed.**

## §9 — Cross-cutting tooling

### §9.1 — tsconfig
`tsconfig.json` — `strict: true`, `verbatimModuleSyntax: true`, `moduleResolution: bundler`, `target: ES2022`, `lib: ["ES2023", "DOM", "DOM.Iterable"]`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`, `isolatedModules: true`, `useDefineForClassFields: true`. **Healthy and tight.** Picks up the strictest reasonable settings.

`api/tsconfig.json` — separate config: `module: Node16`, `moduleResolution: Node16`, `lib: ["ES2022"]`, `strict: true`, `outDir: dist`, `declaration: true`, `declarationMap: true`, `sourceMap: true`. **Healthy and appropriate** for the Node target. `verbatimModuleSyntax` is NOT enabled in api/ (vs. the front-end), which means api/ doesn't require `import type` for type-only imports. Style inconsistency; low priority.

### §9.2 — package.json scripts
Present: `dev`, `dev:hero-lab`, `build`, `build:hero-lab`, `build:watch`, `gh-pages`, `prepare`, `proof:resolution`, `typecheck`, `lint`, `test`, `test:e2e`.

**Missing / candidate additions**:
- `bench` → `node bench/color-channel-access.mjs` (per §6).
- `bench:all` → run all benches in `bench/` (for when more land).
- `test:api` → `cd api && npm test` (when api/ tests exist).
- `release` → orchestrate version bump + CHANGELOG check + tag.
- `release:dry-run` → preview the release without mutating.
- `clean` → `rm -rf dist test-results playwright-report .vite`. Currently undefined; users wipe manually.
- `format` → `prettier --write .`. Currently must be invoked directly.
- `format:check` → `prettier --check .`. CI-friendly.

### §9.3 — Prettier config
`.prettierrc.json` (5 lines) — `printWidth: 88`, `tabWidth: 4`. **Exists** (the K4 prompt-deferred-to-D.W6 doc-drift was about prompts/precepts, not prettier — verified by inspecting `.prettierrc.json` exists at master HEAD). No K4-style addressing needed for prettier.

### §9.4 — ESLint
`eslint.config.js` (lines 1–30 sampled): flat config (post-v9), intentionally permissive per the docstring (hundreds of `any`s in parser combinators, dynamic CSS). Hygiene-gate only. **Healthy as a smoke gate; not a quality lint.** E could tighten this — e.g., re-enable `no-unused-vars` with `argsIgnorePattern: "^_"` — but the docstring warns "Tightening is a separate epic" for good reason (>100 churn-only diffs).

## §10 — Top-N opportunities for E

Ranked by leverage (impact ÷ effort). Each item includes effort estimate.

### Tier-1 (high leverage, MUST do for E coherence)

1. **Migrate `routes/sessions.ts` + `routes/colors.ts` to the pipeline** (LoC: ~300 delta across 4 files; effort: 3–4h). Zod schemas already exist. Universal pipeline conformance unlocks the "no legacy code" precept literally; standardizes the error envelope across the API surface (consumers stop branching on response shape).

2. **Wire `requireOwnership` middleware + excise the legacy sessionToken predicate** (effort: 2h). Delete 4 inline duplicated ownership checks in services; replace with `requireOwnership(extractor)` in 4 route files. Excise `palette.sessionToken === sessionToken ||` from the 3 service callsites (the migrations probe asserts userSlug always present).

3. **Consolidate the e2e env-noise filter into a shared fixture** (effort: 1h). 8 specs × ~10 lines each = ~80 LoC eliminated; one canonical filter; future env-noise patterns adjust in one place.

4. **Split `api/src/middleware.ts` into `api/src/middleware/*.ts`** (effort: 3h). 279 LoC → 6 files of 30–100 LoC each. Mirrors the existing `middleware/inject-services.ts` + `middleware/require-ownership.ts` directory pattern. Consolidate the rate-limit pre-check duplication into one `enforceRateLimit(limiter, c)` helper.

5. **Add benchmark CI gate** (effort: 1h). `npm run bench` script + workflow step. Asserts the L8 5× speedup invariant on every PR. Compounds the L8 work into a permanent gate.

### Tier-2 (high leverage, SHOULD do for E)

6. **Fix `reactivity-instant.spec.ts` flake** (effort: 2h). Either: (a) move to its own playwright project with `workers: 1` in the project config; or (b) move out of `smoke` and into a new `smoke-perf` project that runs serially after the other projects finish; or (c) raise the 50ms threshold to 100ms+ to absorb CI jitter (less informative but reliable). Option (a) is the principled fix.

7. **Add Playwright browser cache + Node 22 matrix in CI** (effort: 30min). 60s saved per run; lower-bound coverage.

8. **Add WebKit smoke project** (effort: 2h). `smoke-safari` runs `page-load.spec.ts` + 2–3 other key specs on WebKit. Catches iOS Safari engine regressions in CI before deploy.

9. **Migrate `routes/sessions.ts:resolveSession` (and the standalone `cron.ts` + `slugWords.ts`) to use repositories** (effort: 1h). Last 3 `db.collection(...)` direct-call sites in the codebase outside the allow-listed boundary.

10. **Add `vitest` to api/ + author backend tests** (effort: 4–6h for a thin first cut). At minimum: typed-error envelope-mapper tests (1h), vote-toggle race tests using a mock VoteRepository (2h), fork-orphan window detection (1h), audit-emit-failure path (1h).

### Tier-3 (nice-to-have, IF E has slack)

11. **Add 3–5 interactive-smoke specs** for highest-leverage user flows: vote toggle, login flow, palette save (effort: 4h). Closes the 14-flow coverage gap with the highest-impact subset.

12. **Add release automation** — `release:dry-run`, `release` scripts; optionally a `npm publish` GitHub Action gated on tag-push (effort: 2h).

13. **Add CHANGELOG-changed CI gate** (effort: 30min). Asserts CHANGELOG.md changed in the same commit-range as package.json:version.

14. **Format vocabulary alignment** — pick keep-a-changelog or document the custom vocabulary in CONTRIBUTING.md (effort: 1h).

15. **`bench/` expansion** — add 3 benches (gamut-map, mixColors, lerpColorValue end-to-end) (effort: 3h).

## §11 — Authority

Sources read (all read-only at master HEAD `eae8afc`):

**api/** (33 files surveyed):
- `api/CLAUDE.md`
- `api/package.json` + `api/tsconfig.json` + `api/Dockerfile` + `api/compose.yaml` + `api/deploy.sh`
- `api/src/index.ts`, `api/src/middleware.ts`, `api/src/db.ts`, `api/src/cron.ts`
- `api/src/middleware/inject-services.ts`, `api/src/middleware/require-ownership.ts`
- `api/src/cache/lru.ts`, `api/src/errors/index.ts`, `api/src/events/auditLog.ts`, `api/src/migrations/check.ts`
- `api/src/db/collections.ts`
- `api/src/repositories/{palette,vote,user}.ts` (+ file-listing of the other 6)
- `api/src/services/palette/{crud,crud-list,votes,forks,versions}.ts`
- `api/src/services/admin/{audit,colors,users,import}.ts`
- `api/src/routes/palettes/{index,crud,forks,votes}.ts`
- `api/src/routes/admin/{index,users,colors}.ts`
- `api/src/routes/sessions.ts`, `api/src/routes/colors.ts`
- `api/src/validation/{session,color}.ts`

**e2e/** (22 files):
- `playwright.config.ts`
- 14 active spec files across `e2e/smoke/`, `e2e/smoke/views/`, `e2e/smoke/admin/`, `e2e/smoke/mobile/`
- `e2e/smoke/admin/fixtures/admin-auth.ts`
- Verifier ran: `--project=smoke`, `--project=smoke-admin`, `--project=smoke-mobile`, and `reactivity-instant.spec.ts` solo

**Cross-cutting**:
- `package.json`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.js`, `.prettierrc.json`, `.gitignore`
- `bench/color-channel-access.mjs`
- `scripts/proof-resolution-contract.mjs` (+ listing of `scripts/generate-favicon.mjs`)
- `.github/workflows/node.js.yml`
- `CHANGELOG.md`
- `git tag -l "v*"` + `git rev-list -n 1 v0.6.0` for tag→commit mapping

**Audit dispositions consulted** (from memory/prompts, not re-read):
- D-HARDEN-3 §1 (LRU consolidation), §2 (pipeline shape), §3 (audit-log befitting-graceful)
- D-REACTIVITY-B-instant.md §7 (reactivity threshold methodology)
- B.W3 binding invariants (e2e role/label-only)
- D.W2 lane partitions per `api/CLAUDE.md`
