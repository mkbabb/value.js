import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "./fixtures/env-noise";

/**
 * Smoke: the app shell mounts cleanly.
 * Asserts the main a11y landmark renders, no uncaught console errors fire,
 * and the navigation landmark + a color-space select control are present.
 *
 * Note: the <nav> landmark wraps a position:fixed dock, so its own box
 * collapses to zero height — it is asserted attached (present in the
 * accessibility tree), and its rendered content is proven separately via
 * the visible "Select view" combobox it contains.
 */
test("page loads with shell landmarks and zero console errors", async ({ page }) => {
    // Env-noise filter (D.W5 Lane A; consolidated at E.W3 Lane C):
    // discards HTTP 4xx/5xx from the shared production palette API
    // surface under parallel-worker load.
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    // Primary landmark — proves the pane shell mounted. X.W5.a: the landmark
    // is named BY the route heading (`aria-labelledby`), never by a static
    // string, so a landmark that names a scene which is no longer mounted is
    // unrepresentable. The name is therefore the view's own label.
    const main = page.getByRole("main", { name: "Home" });
    await expect(main).toBeVisible();

    // X.W5.a · gate A5 — exactly ONE route heading, speaking the schema's
    // label, script-focusable for the constitution's focus origins. On Home it
    // is visually hidden (COHESION §0gf.2(a), OD19-V4); its 1px box still
    // renders, so it reads as visible to the accessibility tree and here.
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText("Home");
    await expect(h1).toHaveAttribute("tabindex", "-1");

    // X.W5.a · gate A7 — the shell's polite route-settlement region exists and
    // speaks. (It is a ROUTE-SETTLEMENT node: it may never be read as a
    // load-completion or `aria-busy` announcement — that contract is the
    // boundary's, and this assertion does not claim it.)
    const status = main.getByRole("status");
    await expect(status).toHaveCount(1);
    await expect(status).toHaveText("Home view");

    // Navigation landmark — present in the a11y tree (wraps the fixed dock).
    await expect(
        page.getByRole("navigation", { name: "Application navigation" }),
    ).toBeAttached();

    // The dock view-select inside the nav renders visibly.
    await expect(
        page.getByRole("combobox", { name: "Select view" }),
    ).toBeVisible();

    // A color-space select control is present in the pane content.
    await expect(
        main.getByRole("combobox", { name: "Select color space" }).first(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});

/**
 * X.W5.a · gate A7 — an address that names no route is ANNOUNCED, not
 * silently substituted.
 *
 * Before this unit `/#/does-not-exist` rendered byte-identically to `/#/`,
 * under the same document title, with nothing announced anywhere: the shell
 * answered a question the user did not ask and said so to no one.
 */
test("an unknown address announces its destination and is distinct from home", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");
    const homeTitle = await page.title();
    const homeHeading = await page
        .getByRole("heading", { level: 1 })
        .textContent();

    await page.goto("/#/does-not-exist");

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText("Not found");
    expect(await h1.textContent()).not.toBe(homeHeading);
    expect(await page.title()).not.toBe(homeTitle);

    // The polite region carries the REASON, naming the address that missed.
    const status = page.getByRole("main").getByRole("status");
    await expect(status).toContainText("could not be opened");
    await expect(status).toContainText("does-not-exist");

    expect(consoleErrors).toEqual([]);
});

/**
 * COHESION §0gf (owner docket OD19, packet P1) — three falsifiers.
 *
 * V4: Home's route H1 is visually hidden (§0gf.2(a)), so a titled route → Home
 * swap must not move the pane row. BEFORE: the visible caption mounted in flow
 * and pushed the row +25 px at 1440 and +23 px at 390.
 */
for (const width of [1440, 390]) {
    test(`OD19-V4: titled route → Home holds the pane row at ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/#/gradient");
        await expect(page.getByRole("main", { name: "Gradient" })).toBeVisible();
        const row = page.locator(".pane-container").first();
        const rowY = () => row.evaluate((e) => Math.round(e.getBoundingClientRect().y));
        const before = await rowY();

        await page.evaluate(() => {
            location.hash = "#/";
        });
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Home");
        await expect(page.getByRole("main", { name: "Home" })).toBeVisible();
        expect(await rowY()).toBe(before);
    });
}

/**
 * V6: the pane-loading plate shows NO text. Its busy status and name are on
 * the plate's root (glass Card drops a consumer `role`); the eye reads glass's
 * Skeleton bars. BEFORE: "Loading the scene…" was
 * a visible paragraph under the bars. The gradient pane's chunk is HELD from
 * before boot until the assertions are done, so neither the idle warm nor the
 * swap's own preload can resolve it, and the plate stays up past
 * `PANE_LOAD_DELAY_MS` on the Home → Gradient swap.
 */
test("OD19-V6: the pane-loading plate is wordless and named on its status", async ({ page }) => {
    let release!: () => void;
    const held = new Promise<void>((r) => (release = r));
    await page.route(/\/workbenches\/gradient\/GradientPane\.vue/, async (r) => {
        await held;
        await r.continue().catch(() => {});
    });
    await page.goto("/#/");
    await expect(page.getByRole("main", { name: "Home" })).toBeVisible();
    await page.evaluate(() => {
        location.hash = "#/gradient";
    });
    const status = page.locator(".pane-plate[role='status']").first();
    try {
        await expect(status).toBeVisible();
        await expect(status).toHaveAttribute("aria-busy", "true");
        await expect(status).toHaveAttribute("aria-label", "Loading the scene");
        expect((await status.innerText()).trim()).toBe("");
    } finally {
        release();
        await page.unrouteAll({ behavior: "ignoreErrors" });
    }
});

/**
 * V8: the L/a/b/α channel rail is enclosed by ONE ink hairline
 * (`--card-edge`). BEFORE: border 0px, no ring (X-DS pass 1 V1-21, reversed by
 * the owner's word).
 */
test("OD19-V8: the channel rail carries one hairline", async ({ page }) => {
    await page.goto("/#/");
    const rail = page.locator(".channel-rail").first();
    await expect(rail).toBeVisible();
    const edge = await rail.evaluate((e) => {
        const cs = getComputedStyle(e);
        return { top: cs.borderTopWidth, style: cs.borderTopStyle, left: cs.borderLeftWidth };
    });
    expect(edge).toEqual({ top: "1px", style: "solid", left: "1px" });
});
