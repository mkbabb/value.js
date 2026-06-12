import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A): the Browse view renders the PaletteCardGrid (role="list").
 * Single-root invariant from B.W1 — guard against regression.
 */
test("browse view renders PaletteCardGrid + heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    // The Browse view fetches the remote palette list. Under e2e the demo's
    // API base is pinned same-origin (`playwright.config.ts`
    // `VITE_API_URL=http://localhost:8090`, inv-K-5) so the production
    // `api.color.babb.dev` is never hit; that same-origin `/palettes` GET
    // resolves to the SPA `index.html` (HTML, not JSON), which the browse
    // store reads as a load FAILURE and renders the "Failed to load palettes"
    // retry state instead of the grid. Mock the list endpoint with a
    // shape-correct (empty) envelope so the grid (`role="list"`) mounts
    // deterministically. Scope the route to the REST path component only —
    // never the demo's own `/@fs/.../api/palettes.ts` Vite source module.
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }),
            }),
    );

    await page.goto("/");

    await openView(page, "Browse");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Browse" }).last(),
    ).toBeVisible();
    // PaletteCardGrid is role="list" — proves the single-root + grid mounted.
    await expect(main.getByRole("list").last()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
