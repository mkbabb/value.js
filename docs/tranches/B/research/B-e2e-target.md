# B-e2e — Target shape: abrogate and replace

**Tranche B assay lane "e2e-target".** Read-only, 2026-05-18. The forward design.

## §1 — Genuine browser-verification need

The vitest suite (1409 tests) covers the library's parse/unit/color math exhaustively and owns nothing component-level. The genuine browser-verification need:

| Need | Unit coverage | Browser-only |
|---|---|---|
| App boots without JS exception / console error | no | yes |
| Color-space switch updates the URL hash | `useColorUrl` untested | yes |
| Dock view-select switches the pane | no | yes |
| Dark mode class applied on cold load from localStorage | no | yes |
| Palette tray → save → pane re-render | no | yes |
| 3-viewport layout integrity | no | yes (human-reviewed screenshot) |

## §2 — Per-wave live probe vs committed spec

Tranche A ran an **orchestrator-driven Playwright probe** at every wave close (navigate → 3 viewports → console-error assertion → network-2xx check → screenshots to `audit/W*-playwright/`). It is not a committed spec — the orchestrator drives it live. It covers boot health + viewport integrity + console cleanliness per wave.

What only a committed spec adds: a **CI/deploy gate** (CI today runs `vitest` only — no Playwright step), re-runnable local developer feedback, and machine-verifiable flow documentation.

The two are not substitutes — the live probe is a per-wave regression gate; a committed spec is a CI contract.

## §3 — Recommendation: B — abrogate all 16, replace with a 3-spec smoke suite

The 16 existing specs total ≈3,510 lines. Brittleness inventory (from `B-e2e-brittleness.md`): ~42 `.lucide-*` selectors, ~132 `waitForTimeout`, ~34 `page.evaluate()` interaction-workarounds, ~8 `force:true`, ~29 `test.skip`, 2 dead live-API specs. The suite was written against successive DOM shapes; every restyle wave required mechanical rework; W5-C hung trying to make all 16 green against the post-W4 DOM.

It is not salvageable by selector migration — that *was* the W5-C task, and it is what hung. Per the precept "abrogate before patch": delete all 16, write 3 clean specs fresh.

- **Against keeping a subset of the 16**: even the ESSENTIAL-flow specs (`palette-features`, `palette-slug-management`) are entangled in `.glass-dock` selectors and `page.evaluate()` reka-ui workarounds; a kept subset carries the brittleness forward.
- **Against option A (no committed specs at all)**: CI would have zero browser gate; a boot-breaking Vue regression could ship to `color.babb.dev`.
- **Against option C (the B.W4-as-drafted 4–5 specs incl. admin-login)**: the admin-login flow requires session-API mocking + dock slug-edit-layer navigation — the most fragile flow, and the W5-C hang's root. It is not smoke-critical (the app boots and functions without admin). Admin login does not belong in the wave-gate smoke suite.

## §4 — What survives / what is deleted

**Deleted: all 16 specs (≈3,510 lines).** `e2e/*.spec.ts` → 0 files.

**Survives: 3 new specs in `e2e/smoke/`** — `getByRole`/`getByLabel`/`aria-label` selectors ONLY; no class selectors, no `.lucide-*`, no xpath, no `page.evaluate()` for interaction, no `waitForTimeout`:

1. `smoke/page-load.spec.ts` — navigate `/`, wait `main[aria-label="Color tool panes"]`, assert zero console errors, assert `<nav aria-label="Application navigation">` + `button[aria-label="Select color space"]` present. The committed counterpart of the orchestrator's live boot probe.
2. `smoke/color-space-switching.spec.ts` — click `button[aria-label="Select color space"]`, pick "OKLab" via `getByRole("option", …)`, assert the trigger text + the URL hash space parameter. The most library-critical interactive path.
3. `smoke/view-switch.spec.ts` — click `button[aria-label="Select view"]`, pick "Palettes", assert `getByText("My Palettes")` visible; mobile viewport assertion of the single-pane layout.

**Replaced by nothing**: the 2 live-API specs (`admin-login-live`, `palette-api-live`) — a live API belongs in a separate staging-integration harness, not the committed repo suite. `color-visual-validation` is replaced by the existing vitest suite. The 13 palette/admin/browse/docs/layout specs are replaced by the per-wave orchestrator live probe; if a palette/admin flow is actively modified in a future wave, a targeted spec is written then under a `full` project.

## §5 — CI consequence

CI (`.github/workflows/node.js.yml`) currently runs `npx vitest run` only — e2e is not in CI at all. After abrogate-and-replace, the `test` job gains:

```yaml
- run: npx playwright install --with-deps chromium
- run: npx playwright test --project=smoke
```

`playwright.config.ts` gains a `smoke` project (desktop Chromium, `testDir: "./e2e/smoke"`). The `mobile` project is removed — a 3-spec suite does not warrant a second browser download in CI; mobile viewport is covered by the orchestrator live probe (375×667) and a viewport assertion inside `view-switch.spec.ts`.

This is the **first automated CI gate on browser behaviour** the project will have.

## §6 — Revision to B.W4 Lane D

The B.W4 draft proposed 4–5 smoke specs and "the existing 16-spec full suite stays under `e2e/`." Revised:

1. **Delete all 16** `e2e/*.spec.ts` files.
2. Create `e2e/smoke/` with exactly **3** specs (above).
3. `playwright.config.ts` — add `smoke` project; **remove** the `mobile` project.
4. `.github/workflows/node.js.yml` — add the Playwright smoke step to the `test` job.
5. Do NOT write a `smoke/admin-login.spec.ts` — record the exclusion and its rationale in `audit/B.W4-smoke.md`.

Revised sub-gate D: `e2e/*.spec.ts` (root) has 0 files; `e2e/smoke/` has exactly 3; `playwright.config.ts` has `smoke`, no `mobile`; `npx playwright test --project=smoke` green; the CI step is present; all 3 specs use role/label selectors exclusively (grep proof: zero `.lucide`, zero `page.evaluate(`-for-click, zero `waitForTimeout` in `e2e/smoke/`).

This reduces B.W4 Lane D's risk: the gate is "3 clean specs green + CI step" instead of "4–5 specs incl. admin-mock green" — Lane D closes in one pass without the admin-mock complexity that hung W5-C.

## Recommendation summary

**Recommendation B.** 0 of 16 specs survive. Replace with 3 role/label smoke specs + a CI step. The per-wave orchestrator live probe remains the primary wave-gate. Net: −3,510 lines of brittle nonsense, +≈120 lines of clean smoke coverage, +the project's first browser CI gate.
