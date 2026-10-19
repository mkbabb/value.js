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

    // X.W5.a · gate A5 — exactly ONE visible route heading, speaking the
    // schema's label, script-focusable for the constitution's focus origins.
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
    await expect(h1).toHaveText("Not Found");
    expect(await h1.textContent()).not.toBe(homeHeading);
    expect(await page.title()).not.toBe(homeTitle);

    // The polite region carries the REASON, naming the address that missed.
    const status = page.getByRole("main").getByRole("status");
    await expect(status).toContainText("could not be opened");
    await expect(status).toContainText("does-not-exist");

    expect(consoleErrors).toEqual([]);
});
