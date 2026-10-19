# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/admin/admin-walk.spec.ts >> walk all 5 admin views sequentially with zero console errors
- Location: e2e/smoke/admin/admin-walk.spec.ts:52:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByPlaceholder(/Search color names/i).filter({ visible: true })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for getByPlaceholder(/Search color names/i).filter({ visible: true })

```

```yaml
- navigation "Application navigation":
  - toolbar:
    - combobox "Select view":
      - img
      - text: Names
    - separator
    - button "Toggle action bar":
      - img
      - text: Tools
      - img
    - separator
    - button "admin"
    - separator
    - button "@mbabb"
  - status
- main "Names":
  - heading "Names" [level=1]
  - status: Names view
  - region "Names":
    - heading "Users" [level=2]
    - paragraph: Manage accounts and permissions.
    - searchbox "Search users"
    - button "Sort users"
    - text: 0 users
    - button "Prune empty" [disabled]:
      - img
      - text: Prune empty
    - button "Refresh":
      - img
      - text: Refresh
    - status:
      - paragraph: No users found.
- region "Notifications (F8)":
  - list
```

# Test source

```ts
  1  | import { adminTest as test, expect } from "./fixtures/admin-auth";
  2  | import { mainPane } from "../fixtures/dock";
  3  | 
  4  | /**
  5  |  * D.W5 Lane B — the admin-view CENSUS (the single admin mount gate).
  6  |  *
  7  |  * Walks all 5 admin views in sequence, exercising `usePaneRouter`'s
  8  |  * component-registry under transition load between admin sub-views, and — the
  9  |  * T.W0 W0-CI fold — asserting per view BOTH the PaneHeader heading AND the
  10 |  * view's distinctive control. This is the population census that retired the
  11 |  * five one-view-each cold-boot specs (admin-audit/flagged/names/tags/users):
  12 |  * their whole assertion set (heading + Refresh button / SearchBar + zero
  13 |  * console errors) lives here, in ONE boot instead of six.
  14 |  *
  15 |  * Selectors: role + accessible-name / placeholder only. No class selectors, no
  16 |  * xpath, no `waitForTimeout`. The search inputs render in both responsive
  17 |  * layout slots (one hidden), so they are picked by `.filter({ visible: true })`
  18 |  * (DOM order across the wrappers is not stable — the retired admin-users/names
  19 |  * specs' own convention); the Refresh buttons resolve with `.first()` (the
  20 |  * retired audit/flagged/tags specs' convention).
  21 |  */
  22 | type Control = { kind: "search"; name: RegExp } | { kind: "button"; name: string };
  23 | 
  24 | const WALK: { path: string; heading: string; control: Control }[] = [
  25 |     {
  26 |         path: "/#/admin/users",
  27 |         heading: "Users",
  28 |         control: { kind: "search", name: /Search users/i },
  29 |     },
  30 |     {
  31 |         path: "/#/admin/names",
  32 |         heading: "Names",
  33 |         control: { kind: "search", name: /Search color names/i },
  34 |     },
  35 |     {
  36 |         path: "/#/admin/audit",
  37 |         heading: "Audit log",
  38 |         control: { kind: "button", name: "Refresh audit log" },
  39 |     },
  40 |     {
  41 |         path: "/#/admin/flagged",
  42 |         heading: "Flagged",
  43 |         control: { kind: "button", name: "Refresh flagged palettes" },
  44 |     },
  45 |     {
  46 |         path: "/#/admin/tags",
  47 |         heading: "Tags",
  48 |         control: { kind: "button", name: "Refresh tags" },
  49 |     },
  50 | ];
  51 | 
  52 | test("walk all 5 admin views sequentially with zero console errors", async ({
  53 |     page,
  54 | }) => {
  55 |     const consoleErrors: string[] = [];
  56 |     page.on("console", (msg) => {
  57 |         if (msg.type() === "error") consoleErrors.push(msg.text());
  58 |     });
  59 |     page.on("pageerror", (err) => consoleErrors.push(err.message));
  60 | 
  61 |     const main = mainPane(page);
  62 | 
  63 |     // X-W1 · G-1 — `WALK[i]` is `| undefined` under the repo's
  64 |     // `noUncheckedIndexedAccess`; `.entries()` carries the element type.
  65 |     for (const [i, { path, heading, control }] of WALK.entries()) {
  66 |         // Boot / hash-navigate — vue-router re-resolves the ViewId in
  67 |         // useViewManager; usePaneRouter's KeepAlive wraps the admin sub-views,
  68 |         // so each step exercises mount/unmount races between sibling panels.
  69 |         // The seeded token (the fixture's addInitScript) makes useAdminAuth read
  70 |         // authenticated before any pane mounts.
  71 |         await page.goto(path);
  72 |         await expect(main).toBeVisible();
  73 |         // PaneHeader renders twice (mobile + desktop slots); `.first()` picks the
  74 |         // visible one — the retired per-view specs' proven convention.
  75 |         await expect(
  76 |             page.getByRole("heading", { name: heading }).first(),
  77 |         ).toBeVisible();
  78 |         if (control.kind === "search") {
  79 |             await expect(
  80 |                 page.getByPlaceholder(control.name).filter({ visible: true }),
> 81 |             ).toBeVisible();
     |               ^ Error: expect(locator).toBeVisible() failed
  82 |         } else {
  83 |             await expect(
  84 |                 page.getByRole("button", { name: control.name }).first(),
  85 |             ).toBeVisible();
  86 |         }
  87 |     }
  88 | 
  89 |     expect(consoleErrors).toEqual([]);
  90 | });
  91 | 
```