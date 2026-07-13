import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "./fixtures/env-noise";
import { openView } from "./fixtures/dock";

/**
 * Smoke (D.W5 Lane A) — the user-view CENSUS (the single user-view mount gate).
 *
 * Walks every user-facing view in sequence, exercising `usePaneRouter`'s
 * component registry under transition load — any leaked watcher, missing
 * dispose, or stale-prop write fires a console error during a swap — and, the
 * T.W0 W0-CI fold, asserts per view that it actually mounted its OWN content
 * (heading + the distinctive control). This is the population census that
 * retired the per-view one-boot-each smoke specs (views/browse, views/extract,
 * views/generate, views/palettes, the mix "renders heading" spot-check, and the
 * view-switch dock spot-check): their assertion sets live here, in ONE boot.
 */
test("walk all user views sequentially with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    // Browse fetches the remote palette list; under e2e the API base is pinned
    // same-origin (playwright.config VITE_API_URL, inv-K-5) so the same-origin
    // `/palettes` GET resolves to the SPA index.html (HTML, not JSON) → the
    // browse store reads a load FAILURE and renders the retry state, not the
    // grid. Pin the list endpoint to a shape-correct empty envelope so the grid
    // (role="list") mounts deterministically. Scope to the REST path only —
    // never the demo's own `/@fs/.../api/palettes.ts` Vite source module.
    // (Folded verbatim from the retired views/browse.spec.ts.)
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [],
                    total: 0,
                    limit: 50,
                    offset: 0,
                }),
            }),
    );

    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // Per-view content assertions folded from the retired per-view specs. The
    // pane mounts in both responsive layout slots (the off-breakpoint copy is
    // display:none); `.last()` / `.filter({ visible: true })` pick the visible
    // one — each block mirrors its retired spec's proven selector exactly.
    const assertContent: Record<string, () => Promise<void>> = {
        Palettes: async () => {
            await expect(
                main.getByRole("heading", { name: "My Palettes" }),
            ).toBeVisible();
            await expect(
                main
                    .getByPlaceholder("Search your palettes...")
                    .filter({ visible: true }),
            ).toBeVisible();
        },
        Browse: async () => {
            await expect(
                main.getByRole("heading", { name: "Browse" }).last(),
            ).toBeVisible();
            // PaletteCardGrid is role="list" — the B.W1 single-root invariant.
            await expect(main.getByRole("list").last()).toBeVisible();
        },
        Extract: async () => {
            await expect(
                main.getByRole("heading", { name: "Extract" }).last(),
            ).toBeVisible();
            // ImageDropZone — role="button" with the W5 a11y upload label.
            await expect(
                main.getByRole("button", { name: /Upload image/i }).last(),
            ).toBeVisible();
        },
        Generate: async () => {
            await expect(
                main.getByRole("heading", { name: "Generate" }).last(),
            ).toBeVisible();
            await expect(
                main
                    .getByRole("combobox", { name: "Generation preset" })
                    .last(),
            ).toBeVisible();
        },
        Mix: async () => {
            await expect(
                main.getByRole("heading", { name: "Mix" }).last(),
            ).toBeVisible();
        },
    };

    // Gradient carries its own rich behavioral spec (views/gradient.spec.ts);
    // the walk asserts only that its pane landmark holds across the swap.
    const views = ["Palettes", "Browse", "Extract", "Generate", "Gradient", "Mix"];
    for (const name of views) {
        await openView(page, name);
        await expect(main).toBeVisible();
        await assertContent[name]?.();
    }
    // Return to the picker (label "Home" per VIEW_MAP).
    await openView(page, "Home");
    await expect(main).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
