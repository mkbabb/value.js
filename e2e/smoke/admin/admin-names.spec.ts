import { adminTest as test, expect } from "./fixtures/admin-auth";

/**
 * D.W5 Lane B — admin-names smoke spec.
 */
test("admin-names view renders SearchBar + zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/#/admin/names");

    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    // The pane mounts in both layout slots; the off-breakpoint copy is
    // `display:none` inside `.pane-wrapper.hidden`. DOM order across the
    // responsive wrappers is not stable, so target the actually-visible copy
    // by its rendered visibility rather than a positional `.last()`.
    await expect(
        page.getByRole("heading", { name: "Names" }).filter({ visible: true }),
    ).toBeVisible();
    await expect(
        page.getByPlaceholder(/Search color names/i).filter({ visible: true }),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
