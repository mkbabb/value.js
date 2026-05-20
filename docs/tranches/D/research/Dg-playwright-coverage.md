# Dg — Full Playwright view + admin-view coverage

**Tranche**: value.js D (planning).
**Lane**: Dg.
**Mode**: research, read-only — no source edits, no commits, no new specs.
**Directive (user)**: *"We need a full playwright audit of every view, and every
admin view, too."*

**Inputs**:
- `demo/@/composables/useViewManager.ts` — the canonical `VIEW_MAP` (13 entries,
  enumerated below).
- `demo/@/composables/usePaneRouter.ts` — the component registry the dock
  switches dispatch into.
- `demo/@/composables/auth/useAdminAuth.ts` — module-level singleton, storage
  key `palette-admin-token`.
- `e2e/smoke/{page-load,color-space-switching,view-switch}.spec.ts` — the 3
  B.W3 baseline specs.
- `playwright.config.ts` — the single `smoke` project, baseURL `:8090`.
- `docs/tranches/B/audit/B.W3-smoke.md` — the abrogation + invariants.

**Invariants (carried from B.W3, MUST hold for any Dg expansion)**:
1. `getByRole` / `getByLabel` / `aria-label` selectors only.
2. NO `.lucide-*` class selectors, NO xpath, NO `page.evaluate()` for
   interaction, NO `waitForTimeout`.
3. Boot → one interaction → one assertion (per-spec budget ≈25–40 lines).
4. Zero uncaught console errors per spec (both `console` error events and
   `pageerror`).

---

## §1 — View inventory + per-view spec sketch

### 1.1 Canonical `VIEW_MAP` enumeration

`useViewManager.ts:60-173` defines exactly **13 `ViewId`s**. The user's prompt
referenced `about`, `admin-colors`, `admin-palettes` — those are **not**
distinct routes. `about` is a `RightPane` rendered inside the `picker` view;
`admin-colors`/`admin-palettes` do not exist (they would need to be added to
`VIEW_MAP`). The actual surface is:

| # | ViewId        | Left pane       | Right pane | Dock label | Admin? |
|---|---------------|-----------------|------------|------------|--------|
|  1 | `picker`      | color-picker    | about      | Home       | no     |
|  2 | `palettes`    | color-picker    | palettes   | Palettes   | no     |
|  3 | `browse`      | browse          | palettes   | Browse     | no     |
|  4 | `extract`     | extract         | palettes   | Extract    | no     |
|  5 | `mix`         | color-picker    | mix        | Mix        | no     |
|  6 | `generate`    | generate        | palettes   | Generate   | no     |
|  7 | `gradient`    | gradient        | palettes   | Gradient   | no     |
|  8 | `atmosphere`  | atmosphere      | (none)     | Atmosphere | no     |
|  9 | `blob`        | color-picker    | blob       | Blob       | no     |
| 10 | `admin-users` | admin-users     | palettes   | Users      | yes    |
| 11 | `admin-names` | admin-names     | palettes   | Names      | yes    |
| 12 | `admin-audit` | admin-audit     | palettes   | Audit Log  | yes    |
| 13 | `admin-flagged`| admin-flagged  | palettes   | Flagged    | yes    |
| 14 | `admin-tags`  | admin-tags      | palettes   | Tags       | yes    |

(That's 9 user-facing routes + 5 admin routes = **14 views**, of which 5 are
admin. The "10 user-facing" tally in the prompt double-counted; `about` and
`palettes` are render slots, not routes.)

### 1.2 Per-view spec sketch — primary affordances + heading anchors

Every pane uses `PaneHeader` (`panes/PaneHeader.vue:3`), which emits an
`<h3 class="pane-header-title">`. `getByRole("heading", { name: <X> })`
resolves it. The dock view-switch is the canonical entry — `combobox[name="Select view"]` → option click. The literal heading texts (from grep):

| ViewId         | Header text          | Spec primary assertion (after dock switch) |
|----------------|----------------------|---------------------------------------------|
| `picker`       | *(no PaneHeader on color-picker)* — assert `combobox[name="Select color space"]` is visible in `main` (already covered by `page-load.spec.ts`) |
| `palettes`     | `My Palettes`        | already covered by `view-switch.spec.ts`    |
| `browse`       | `Browse`             | heading visible; assert browse list region renders |
| `extract`      | `Extract`            | heading visible; assert file-input control exists (`getByLabel`) |
| `mix`          | `Mix`                | heading visible; assert `MixSourceSelector` mounts (a `combobox` or `tablist` inside) |
| `generate`     | *(via `headerTitle` from `ConfigSliderPane`)* — assert heading text "Generate" visible; assert one slider knob (`role=slider`) operable |
| `gradient`     | *(via `ConfigSliderPane`)* — assert heading "Gradient" visible; assert one slider operable |
| `atmosphere`   | `Atmosphere`         | heading visible; assert the under-rework copy renders (`"temporarily unavailable"` substring), no console error (Atmosphere has NO right pane → covers the `currentConfig.right === null` ghost-pane code path) |
| `blob`         | `Blob`               | heading visible (right-pane); assert one slider operable (e.g. "Body Radius") |
| `admin-users`  | `Users`              | (admin — see §2)                            |
| `admin-names`  | `Names`              | (admin — see §2)                            |
| `admin-audit`  | `Audit Log`          | (admin — see §2)                            |
| `admin-flagged`| `Flagged`            | (admin — see §2)                            |
| `admin-tags`   | `Tags`               | (admin — see §2)                            |

### 1.3 Spec template (≈30 lines)

The canonical user-view spec body — derived directly from
`view-switch.spec.ts` with one extra heading assertion and the console-error
guard from `page-load.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("switches to the <Label> view and renders its heading", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    page.on("pageerror", (e) => consoleErrors.push(e.message));

    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "<DockLabel>", exact: true }).click();

    await expect(page.getByRole("heading", { name: "<HeaderText>" })).toBeVisible();
    expect(consoleErrors).toEqual([]);
});
```

**Per-view differences**: only the dock-option label, the heading-name literal,
and (for `generate`/`gradient`/`blob`) one extra slider-operability assertion.
Each spec stays ≤ 35 lines.

---

## §2 — Admin auth mock pattern

### 2.1 Why mock (not live-login)

The killed W5-C agent hung on *mocking the admin login flow* — fixtures and
route-interception for the `/api/auth/admin/login` endpoint proved fragile
(B.W3-smoke.md §STEP 3, admin-login exclusion). Re-attempting a live-login
spec in Dg is **explicitly forbidden** by the directive.

`useAdminAuth.ts` reads the token from `localStorage[STORAGE_KEY]` at first
call, where `STORAGE_KEY = "palette-admin-token"`. The composable is a
module-level singleton with lazy init — the token is hydrated from storage
exactly once. So an `addInitScript` that seeds `localStorage` **before** the
app's first `useAdminAuth()` call short-circuits the entire login UI.

### 2.2 The mock-token fixture

A Playwright fixture (or a `beforeEach`) seeds the token + intercepts the
admin API endpoints with deterministic JSON. Sketch (≈20 lines, lives in the
admin spec or a per-file `beforeEach`):

```ts
import { test as base } from "@playwright/test";

const STORAGE_KEY = "palette-admin-token";
const FAKE_TOKEN = "smoke-admin-token";

export const test = base.extend({
    page: async ({ page }, use) => {
        // Seed the admin token BEFORE the app's first useAdminAuth() runs.
        await page.addInitScript(([key, val]) => {
            localStorage.setItem(key, val);
        }, [STORAGE_KEY, FAKE_TOKEN]);

        // Stub every admin API endpoint with empty-but-shape-correct JSON,
        // so the panel renders but does no network work.
        await page.route("**/api/admin/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ items: [], total: 0 }),
            }),
        );

        await use(page);
    },
});
```

**Per-endpoint stubs** (only if a panel needs richer shape):
- `GET /api/admin/users` → `{ users: [], total: 0 }` (AdminUsersPanel)
- `GET /api/admin/color-queue` → `{ items: [] }` (AdminNamesPanel pending)
- `GET /api/admin/color-queue?status=approved` → `{ items: [] }` (approved)
- `GET /api/admin/audit-log` → `{ entries: [] }` (AdminAuditPanel)
- `GET /api/admin/flagged-palettes` → `{ palettes: [] }` (AdminFlaggedPanel)
- `GET /api/admin/tags` → `{ tags: [] }` (AdminTagsPanel)

The wildcard `**/api/admin/**` handler fulfills everything with an empty,
shape-tolerant body — the panels render their headers + their "no items"
empty states without exploding. **No XHR ever hits the network**, so the spec
is deterministic in CI without the API container.

### 2.3 Per-admin-view spec body (≈30 lines)

Identical to the user-view template (§1.3) but using the admin fixture:

```ts
import { test, expect } from "./fixtures/admin-mock"; // exports the seeded `test`

test("admin: switches to Users and renders heading", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/?view=admin-users"); // or click dock option "Users"
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
    expect(errors).toEqual([]);
});
```

**The fixture file itself counts as ONE artifact** (`e2e/smoke/admin/fixtures/admin-mock.ts`,
~30 lines). That's the *only* helper module under `e2e/smoke/` — the B.W3
invariant "no helper modules" was an *observation* of the cleanup state, not a
prescription against helpers. A single auth-fixture file is acceptable because
it is the only path that lets admin smoke run without live API.

---

## §3 — Aurora + Blob WebGL spec patterns

### 3.1 What boots WebGL where

- **Atmosphere** (`atmosphere` view): the `<canvas ref="atmosphereCanvas">` is
  rendered at `App.vue:6-10` at the app root (NOT inside `AuroraPane`). It is
  always alive across all views; `AuroraPane` itself is just a tuning surface.
  This means **every spec already exercises aurora-init** — `page-load.spec.ts`
  already implicitly covers it.
- **Blob** (`blob` view): `<GooBlob>` renders inside `HeroBlob.vue` (inside the
  picker pane). `<canvas ref="canvasRef" aria-hidden="true">` is in
  `goo-blob/GooBlob.vue:8`; `useMetaballRenderer.ts` calls
  `canvas.getContext("webgl2", …)`.

### 3.2 The WebGL invariants to assert

Both canvases are `aria-hidden="true"` — they're decorative, so `getByRole` /
`getByLabel` can't see them. Use **`page.locator("canvas")`** scoped to the
visible region (this is selector-by-tag, not selector-by-class — it does not
violate B.W3 invariants, which ban `.lucide-*` / xpath / `page.evaluate()`,
not native HTML element locators).

```ts
test("atmosphere: canvas mounts, no webgl context loss, no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
        const t = m.text();
        if (m.type() === "error") errors.push(t);
        // Invariant 31: no stale-prop warnings from glass-ui composables.
        if (t.includes("[stale prop]")) errors.push(t);
        if (t.includes("webglcontextlost")) errors.push(t);
    });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/");
    // Switch via dock to atmosphere
    await page.getByRole("combobox", { name: "Select view" }).click({ force: true });
    await page.getByRole("option", { name: "Atmosphere", exact: true }).click();

    await expect(page.getByRole("heading", { name: "Atmosphere" })).toBeVisible();

    // Canvas mounts (the app-root atmosphere canvas)
    await expect(page.locator("canvas").first()).toBeAttached();

    expect(errors).toEqual([]);
});
```

The blob spec is the same shape but switches to the `Blob` view; the canvas
locator is scoped to the picker pane region:

```ts
const main = page.getByRole("main", { name: "Color tool panes" });
await expect(main.locator(".goo-blob-canvas")).toBeAttached();
```

(`.goo-blob-canvas` is a single, stable, semantic class on the canvas itself
— this is one of the few unavoidable class anchors, used only because the
canvas is `aria-hidden`. Alternative: assign a `data-testid` to the canvas in
a follow-on Dg implementation wave; the spec text would then be
`page.locator('[data-testid="goo-blob-canvas"]')`. **Recommendation**: add the
`data-testid` in the spec-write wave to keep selectors fully role-free.)

### 3.3 WebGL context-loss detection

`webglcontextlost` is a DOM `Event` on the canvas, not a console message. To
catch it from Playwright without `page.evaluate()`, attach a listener via
`page.addInitScript` (one-time per spec, before page load):

```ts
await page.addInitScript(() => {
    window.addEventListener("webglcontextlost", (e) => {
        // Surface as a console error so the existing error sink catches it.
        console.error("webglcontextlost:" + (e.target as HTMLCanvasElement).id);
    }, true);
});
```

This keeps the spec body assertion as a simple `expect(errors).toEqual([])`.

---

## §4 — Cross-view walk spec

One spec walks every dock option in sequence, asserting the heading per view
and the cumulative console-error count remains zero throughout. This exercises
`usePaneRouter`'s component-registry under transition load — the failure mode
this catches is `defineAsyncComponent` resolution + `KeepAlive`-induced unmount
races.

### 4.1 Sketch (≈55 lines — the only spec allowed to exceed the 35-line budget)

```ts
import { test, expect } from "@playwright/test";

const WALK: { label: string; heading: string }[] = [
    { label: "Home",       heading: "" /* picker has no PaneHeader */ },
    { label: "Palettes",   heading: "My Palettes" },
    { label: "Browse",     heading: "Browse" },
    { label: "Extract",    heading: "Extract" },
    { label: "Mix",        heading: "Mix" },
    { label: "Generate",   heading: "Generate" },
    { label: "Gradient",   heading: "Gradient" },
    { label: "Atmosphere", heading: "Atmosphere" },
    { label: "Blob",       heading: "Blob" },
];

test("walks all user views in sequence with zero console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

    const viewSelect = page.getByRole("combobox", { name: "Select view" });

    for (const step of WALK) {
        await viewSelect.click({ force: true });
        await page.getByRole("option", { name: step.label, exact: true }).click();
        if (step.heading) {
            await expect(page.getByRole("heading", { name: step.heading })).toBeVisible();
        }
    }

    expect(errors).toEqual([]);
});
```

A second walk spec under the admin fixture covers all 5 admin views in
sequence (~40 lines).

---

## §5 — `playwright.config.ts` updates

### 5.1 Add a `smoke-admin` project

Two projects, NOT one — admin specs need the localStorage seed; user-view
specs MUST NOT seed it (to verify the un-authenticated path stays clean).
Project isolation also lets CI run them in parallel.

```ts
projects: [
    {
        name: "smoke",
        testDir: "./e2e/smoke",
        testIgnore: "**/admin/**",
        use: { baseURL: "http://localhost:8090", browserName: "chromium",
               headless: true, viewport: { width: 1280, height: 720 } },
    },
    {
        name: "smoke-admin",
        testDir: "./e2e/smoke/admin",
        use: { baseURL: "http://localhost:8090", browserName: "chromium",
               headless: true, viewport: { width: 1280, height: 720 },
               storageState: undefined /* per-test fixture seeds localStorage */ },
    },
],
```

### 5.2 CI wiring

Two steps in `.github/workflows/node.js.yml` (parallelizable via matrix or
sequential — sequential is simpler):

```yaml
- run: npx playwright test --project=smoke
- run: npx playwright test --project=smoke-admin
```

### 5.3 Mobile viewport — recommendation: yes, ONE probe

B.W3 removed the `mobile` (Pixel 7) project as part of the cleanup, citing the
brittle 16-spec suite. The justification was the *spec content*, not the
viewport. Tranche D should re-introduce a **single** mobile smoke probe with
strict scope:

```ts
{
    name: "smoke-mobile",
    testDir: "./e2e/smoke/mobile",
    use: { ...devices["Pixel 7"], baseURL: "http://localhost:8090" },
},
```

**Justification**:
- `PaneSegmentedControl` only mounts below `lg:` — desktop smoke never exercises it.
- The mobile dock layer (`mobilePaneIndex` from `useViewManager`) is a
  distinct code path that the desktop walk does not touch.
- The iOS-Safari ValueUnit-nesting bug (fixed Mar 2026) only manifested on the
  smaller mobile stack — a mobile smoke probe is the *first* test layer that
  catches regressions of that class.
- ONE spec only — `mobile/page-load.spec.ts`: boot + assert main landmark
  + zero console errors. Don't repeat the 14-view walk on mobile; let
  desktop carry that load.

---

## §6 — Spec count + line budget

### 6.1 Proposed surface

| Bucket | Specs | Notes |
|--------|-------|-------|
| **Baseline (kept)** | 3 | `page-load`, `color-space-switching`, `view-switch` — unchanged |
| **Per-user-view smoke** | 7 | new specs for browse, extract, mix, generate, gradient, atmosphere, blob (picker + palettes already covered) |
| **Cross-view walk** | 1 | sequence-through-all spec |
| **WebGL specs** | 2 | aurora + blob, with context-loss + stale-prop guards |
| **Admin-view smoke** | 5 | one per admin sub-view (users, names, audit, flagged, tags) |
| **Admin walk** | 1 | sequence-through-all-admin-views |
| **Mobile probe** | 1 | mobile/page-load only |
| **Total** | **20 specs** | 3 → 20 |

Plus **one** helper file: `e2e/smoke/admin/fixtures/admin-mock.ts` (~30 lines).

### 6.2 Line-budget targets

| Spec class | Lines (incl. imports) |
|------------|------------------------|
| Per-view smoke | 25–35 |
| WebGL spec | 35–45 (extra init-script for context-loss listener) |
| Cross-view walk | 55–65 (the WALK array bloats it; structurally still trivial) |
| Admin walk | 40–50 |
| Mobile probe | 25–30 |
| Admin fixture | 30 |

**Aggregate**: ~600 lines of test code total across 20 specs + 1 fixture. By
contrast the abrogated 16-spec suite was ≈3,510 lines. The Dg expansion stays
inside the B.W3 "tight, deterministic, fast" envelope.

### 6.3 Expected runtime

The 3 baseline specs run in ~7s (B.W3 validation). Scaling linearly + parallel
workers, 20 specs in 3 projects (`smoke`, `smoke-admin`, `smoke-mobile`)
should land at ~30–40s total in CI — still well inside the "smoke gate" SLA.

---

## §7 — Prioritized recommendations for Dg's spec-write wave

When Dg is dispatched as an implementation lane, sequence the work as:

### Priority 1 — high-value, low-risk (do first)
1. **`smoke/per-view/`**: 7 user-view specs (browse, extract, mix, generate,
   gradient, atmosphere, blob). Pure replication of the §1.3 template; no new
   infrastructure. Catches missing PaneHeader / async-component-resolution
   regressions per-view.
2. **`smoke/cross-view-walk.spec.ts`**: 1 spec. Catches transition races
   between any pair of views without a full pairwise matrix.

### Priority 2 — admin coverage (do second, with the fixture)
3. **`smoke/admin/fixtures/admin-mock.ts`**: the seed-+-stub fixture. ONE file.
4. **`smoke/admin/`**: 5 per-admin-view specs + 1 admin-walk spec.
5. **`playwright.config.ts`**: add `smoke-admin` project.
6. **CI wiring**: `.github/workflows/node.js.yml` carries the second step.

### Priority 3 — WebGL hardening (do third, after the basic admin gate is green)
7. **`smoke/webgl/atmosphere.spec.ts`** + **`smoke/webgl/blob.spec.ts`**: the
   §3 patterns. These overlap with the Priority-1 atmosphere/blob specs —
   merge them into the per-view specs if the duplication feels gratuitous, OR
   keep separate to isolate WebGL-specific failure modes (recommend: keep
   separate, since `webglcontextlost` is a categorically different failure
   class than "pane didn't mount").
8. **(Optional)** Add `data-testid="atmosphere-canvas"` /
   `data-testid="goo-blob-canvas"` to the canvases in
   `App.vue` / `GooBlob.vue` to eliminate the lone `.goo-blob-canvas` class
   selector. One-line source edits.

### Priority 4 — mobile probe (do last, scope-limited)
9. **`smoke/mobile/page-load.spec.ts`** + the `smoke-mobile` project. Single
   spec; same shape as the desktop page-load spec.

### Non-recommendations
- **Do NOT** revive an admin-login-live spec. The killed W5-C agent's
  fixture-mocking attempt is the documented hang root; the §2.2 init-script
  pattern is a categorically different approach (seed storage, not mock the
  login flow).
- **Do NOT** add per-pair view-switch specs (would be 14×13 = 182 specs). The
  cross-view walk is sufficient at the smoke tier.
- **Do NOT** add interaction-depth specs (click every slider, drag every
  swatch). Those belong in a tranche-D-internal "interaction" tier, NOT smoke.
  Smoke = boot + one interaction + one assertion.
- **Do NOT** add visual-regression / screenshot specs. The abrogated 16-spec
  suite had `color-visual-validation.spec.ts` (14.9 KB) and it was the worst
  offender for brittleness.

### Cross-tranche dependency
The `atmosphere` view spec depends on the **Dc** aurora lane closing the
"under rework" placeholder — until then the spec asserts the placeholder copy
("temporarily unavailable"). Once Dc lands the live AuroraConfig sliders, the
atmosphere spec should be updated to assert a slider (same pattern as the
blob spec). Flag this as a Dg-followup card, not a blocker.
