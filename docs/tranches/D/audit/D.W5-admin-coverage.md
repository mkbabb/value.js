# D.W5 — Lane B: admin Playwright coverage audit

**Wave**: D.W5, Lane B (5 admin smoke specs + admin-walk + `addInitScript`
admin-auth fixture).

**Mode**: implementation. Lane file-disjoint from Lane A (`views/`, `walk.spec`,
`webgl-*.spec`, `reactivity-instant.spec`) and Lane C (`mobile/`,
`playwright.config.ts`, CI).

## §1 — `useAdminAuth` probe

Source: `demo/@/composables/auth/useAdminAuth.ts`.

| Property | Value |
|----------|-------|
| `STORAGE_KEY` | `"palette-admin-token"` |
| Lazy-init site | `getAdminToken()` — first call to `useAdminAuth()` reads `safeGetItem(localStorage, STORAGE_KEY)` |
| Module-level singleton | `_adminToken: Ref<string \| null> \| null` |
| `isAuthenticated` | `computed(() => !!adminToken.value)` |
| Startup network call to verify the token? | **None.** The composable trusts the localStorage value; the token is only sent on admin API calls (via `adminRequest()` in `demo/@/lib/palette/api.ts`). |

Consequence for fixture design:
- An `addInitScript` that calls `localStorage.setItem("palette-admin-token", "test-admin-token")` BEFORE the first `useAdminAuth()` invocation seeds the singleton transparently.
- No startup XHR to mock for auth itself — only the admin endpoints that the panels call on `onMounted`.

Dock gate (`demo/@/components/custom/dock/composables/useDockAdminMode.ts`):
- `viewEntries` returns `userViews` (Home/Palettes/Browse/Extract/Mix/Generate/Gradient) UNLESS `isAdminMode && isAdminAuthenticated`. So the admin views (Users/Names/Audit Log/Flagged/Tags) are NOT in the dock until the user enters admin mode via the "Admin" entry that appears at the bottom of the view-select (only when `isAdminAuthenticated`).
- The admin-mode toggle entry has `value="__admin_toggle__"`; `onViewChange("__admin_toggle__")` calls `toggleAdminMode()` which switches to `admin-users` automatically.

Implication: specs seed the token, navigate to `/`, then trigger admin mode either via the dock toggle OR via a direct URL navigation. Direct URL is the more robust approach (does not depend on the dock toggle UI rendering an extra row), so the specs use `await page.goto("/admin/<view>")` where `<view>` matches the router path.

Router (`demo/@/router/index.ts`) confirms direct routes:
- `/admin/users` → `admin-users`
- `/admin/names` → `admin-names`
- `/admin/audit` → `admin-audit`
- `/admin/flagged` → `admin-flagged`
- `/admin/tags` → `admin-tags`

The `meta: { admin: true }` gate is enforced by the router guard, which redirects to `/` if `!isAdminAuthenticated`. Seeding the token via `addInitScript` flips the gate green.

## §2 — Admin endpoints to mock

Per `api/src/routes/admin/index.ts` + the frontend `demo/@/lib/palette/api.ts` usage:

| Endpoint | Used by | Stubbed shape |
|----------|---------|---------------|
| `GET /admin/users?...` | `AdminUsersPanel` (via `pm.loadAdminUsers`) | `{ items: [], total: 0 }` |
| `GET /admin/queue?...` | `AdminNamesPanel` (pending) | `{ items: [] }` |
| `GET /admin/colors/approved?...` | `AdminNamesPanel` (approved) | `{ items: [] }` |
| `GET /admin/audit?...` | `AdminAuditPanel` (`pm.audit.loadAuditLog`) | `{ entries: [], total: 0, page: 0, pageCount: 0, hasNext: false, hasPrev: false }` |
| `GET /admin/flagged?...` | `AdminFlaggedPanel` (`flagged.loadFlagged`) | `{ items: [], total: 0 }` |
| `GET /admin/tags` | `AdminTagsPanel` (`tagsApi.loadTags`) | `{ items: [] }` |
| Catch-all `**/admin/**` | any further admin endpoint | `{}` |

Base URL: `https://mbabb.fi.ncsu.edu/colors` (frontend default) — wildcard pattern `**/admin/**` matches both this and any local proxy.

The fixture additionally mocks `**/sessions*` and `**/colors/sessions*` to avoid an unrelated anonymous-session network call from `useSession()` at boot. Shape: `{ token: "test-session-token", userSlug: "test-user" }`.

## §3 — Spec list (Lane B)

| # | File | Spec title | Primary assertion |
|---|------|------------|-------------------|
| 1 | `e2e/smoke/admin/admin-users.spec.ts` | "admin-users view renders SearchBar + zero console errors" | `getByPlaceholder(/Search users/i)` visible |
| 2 | `e2e/smoke/admin/admin-names.spec.ts` | "admin-names view renders SearchBar + zero console errors" | `getByPlaceholder(/Search color names/i)` visible |
| 3 | `e2e/smoke/admin/admin-audit.spec.ts` | "admin-audit view renders Refresh button + zero console errors" | `getByRole("button", { name: "Refresh audit log" })` visible |
| 4 | `e2e/smoke/admin/admin-flagged.spec.ts` | "admin-flagged view renders Refresh button + zero console errors" | `getByRole("button", { name: "Refresh flagged palettes" })` visible |
| 5 | `e2e/smoke/admin/admin-tags.spec.ts` | "admin-tags view renders Refresh button + zero console errors" | `getByRole("button", { name: "Refresh tags" })` visible |
| 6 | `e2e/smoke/admin-walk.spec.ts` | "walk all 5 admin views sequentially with zero console errors" | each view's `Color tool panes` main landmark stays visible |

## §4 — Sub-gate B preliminary verdict

All Lane B file artefacts created; all 6 specs picked up by the existing
`smoke` project at `playwright.config.ts:14-23` (testDir `./e2e/smoke` is
recursive by default). NO `playwright.config.ts` touch required from
Lane B — Lane C's `smoke-admin` project addition is an organizational
improvement, not a correctness gate, since the specs already run green
under `--project=smoke`.

## §5 — Per-spec line counts

| File | Lines | Budget |
|------|-------|--------|
| `e2e/smoke/admin/admin-users.spec.ts` | 26 | ≤ 35 |
| `e2e/smoke/admin/admin-names.spec.ts` | 23 | ≤ 35 |
| `e2e/smoke/admin/admin-audit.spec.ts` | 23 | ≤ 35 |
| `e2e/smoke/admin/admin-flagged.spec.ts` | 23 | ≤ 35 |
| `e2e/smoke/admin/admin-tags.spec.ts` | 23 | ≤ 35 |
| `e2e/smoke/admin-walk.spec.ts` | 53 | ~ 55 |
| `e2e/smoke/admin/fixtures/admin-auth.ts` | 87 | n/a (fixture) |
| **Total** | **258** | — |

## §6 — Fixture mock surface

`e2e/smoke/admin/fixtures/admin-auth.ts`:

| Route pattern | Handler | Body |
|---------------|---------|------|
| `**/admin/users**` | fulfill 200 | `{ items: [], total: 0 }` |
| `**/admin/queue**` | fulfill 200 | `{ items: [] }` |
| `**/admin/colors/approved**` | fulfill 200 | `{ items: [] }` |
| `**/admin/audit**` | fulfill 200 | `{ entries: [], total: 0, page: 0, pageCount: 0, hasNext: false, hasPrev: false }` |
| `**/admin/flagged**` | fulfill 200 | `{ items: [], total: 0 }` |
| `**/admin/tags**` | fulfill 200 | `{ items: [] }` |
| `**/admin/**` (catch-all) | fulfill 200 | `{}` |
| `**/sessions**` | fulfill 200 | `{ token: "test-session-token", userSlug: "test-user" }` |

Init script: `localStorage.setItem("palette-admin-token", "test-admin-token")` (BEFORE any page script runs).

## §7 — Validation matrix

| Check | Command | Expected | Actual |
|-------|---------|----------|--------|
| Lane B specs green | `npx playwright test e2e/smoke/admin e2e/smoke/admin-walk.spec.ts --project=smoke` | 6 passed | **6 passed** (8.3s) |
| Baseline 3 specs green | `npx playwright test e2e/smoke/page-load.spec.ts e2e/smoke/view-switch.spec.ts e2e/smoke/color-space-switching.spec.ts --project=smoke` | 3 passed | **3 passed** (4.0s) |
| vue-tsc errors | `npx vue-tsc --noEmit 2>&1 \| grep -cE "error TS"` | 126 | **126** |
| vitest pass | `npx vitest run` | 1582 passed | **1582 passed / 34 files** |
| Lint exit | `npm run lint` | 0 | **0** |
| Banned patterns | `rg --no-line-number "page\.evaluate\(.*click\|page\.waitForTimeout\|\.lucide-" e2e/smoke/admin/ e2e/smoke/admin-walk.spec.ts` | 0 | **0** (the lone `waitForTimeout` mention in a JSDoc comment is documentation, not code) |
| Spec count under admin/ | `ls e2e/smoke/admin/*.spec.ts \| wc -l` | ≥ 5 | **5** |
| Fixture exists | `test -f e2e/smoke/admin/fixtures/admin-auth.ts` | yes | **yes** |
| admin-walk exists | `test -f e2e/smoke/admin-walk.spec.ts` | yes | **yes** |

### Per-spec result table

| # | Spec | Result | Duration |
|---|------|--------|----------|
| 1 | `admin-users.spec.ts` | PASS | 2.3 s |
| 2 | `admin-names.spec.ts` | PASS | 2.4 s |
| 3 | `admin-audit.spec.ts` | PASS | 6.4 s |
| 4 | `admin-flagged.spec.ts` | PASS | 2.3 s |
| 5 | `admin-tags.spec.ts` | PASS | 2.3 s |
| 6 | `admin-walk.spec.ts` | PASS | 3.8 s |

### Fixture mock-surface count

8 route patterns — 1 sessions stub + 7 admin path branches (users/queue/colors-approved/audit/flagged/tags/catch-all) reduced to **2 actual `page.route()` registrations** (one for `**/sessions`, one for `**/admin/**` with internal URL branching). The admin-tags branch returns `Tag[]` (raw array, no envelope) per `getAdminTags`'s return type in `api.ts:421`; everything else returns the `PaginatedResponse<T>` shape `{ data: [], total: 0, limit: 50, offset: 0 }`.

### Deviation note (selector pattern)

Each admin pane renders TWICE in the DOM — once in the `lg:hidden` mobile slot, once in the `lg:flex hidden` desktop-left slot (per `demo/color-picker/App.vue:34-55`). At the smoke project's 1280×720 viewport, only the desktop slot is visible, but the mobile slot's elements still match role/label selectors (CSS `display:none` does NOT remove them from the accessibility tree at the locator level when matched by placeholder/role). Mobile slot renders FIRST in DOM, so `.last()` resolves to the visible desktop instance. This is documented in each spec inline. The convention is internally consistent and does not violate any B.W3 invariant.

## §8 — Sub-gate B verdict (final)

**PASS.**

- `ls e2e/smoke/admin/*.spec.ts \| wc -l` = **5** (≥ 5).
- `e2e/smoke/admin/fixtures/admin-auth.ts` carries the `addInitScript` token-seed and the wildcard admin-API mock — the categorical opposite of the killed W5-C login-flow approach.
- `e2e/smoke/admin-walk.spec.ts` exists and walks all 5 admin views with zero console errors.
- All 6 admin specs (5 per-view + 1 walk) green under `--project=smoke` (no `smoke-admin` project required for Lane B's validation — Lane C lands that as organizational).
- Existing 3 baseline specs unchanged + still green.
- vue-tsc 126, vitest 1582 — no library/demo regression.
- Zero banned-pattern code hits.
- All specs under per-spec line budget (≤ 35 per-view, ~ 55 walk).

### Hand-off to Lane C

Lane C's responsibilities (separate orchestration):
1. Add `smoke-admin` project to `playwright.config.ts` (testDir `./e2e/smoke/admin` + the existing baseURL). Optional polish since the specs already run green under `--project=smoke`.
2. Add `smoke-mobile` Pixel-7 project + the single `mobile/page-load.spec.ts` probe.
3. Update `.github/workflows/node.js.yml` to run all three projects.

NO Lane B-side concerns to surface to Lane C beyond the fact that Lane B did not touch `playwright.config.ts` (per the wave-spec lane-disjointness directive).
