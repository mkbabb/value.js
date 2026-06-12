import { userTest as test, expect } from "../fixtures/user-auth";
import { openView } from "../fixtures/dock";

/**
 * E.W3 Lane A flow #3 — palette-save (local save of current swatches).
 *
 * The CurrentPaletteEditor in PalettesPane carries the "save current
 * palette" affordance — typing a name and pressing Enter commits to
 * `usePaletteStore` (localStorage key `color-palettes`, the PaletteStore
 * shape with a `palettes` array). No backend call is involved; the spec
 * asserts the localStorage write.
 *
 * Reach the Palettes pane via the dock view-select (`openView`) — the real
 * user path. A direct `page.goto("/#/palettes")` cold-boot leaves the desktop
 * Palettes pane mounted only in the off-breakpoint (`display:none`) slot (the
 * pane-router does not hydrate the visible desktop slot on a cold direct-hash
 * boot for this view — see W1D-closure.md §Residual app defect), so the
 * CurrentPaletteEditor never renders visibly; the dock switch populates it.
 */
test("save current palette persists to localStorage 'color-palettes'", async ({
    page,
}) => {
    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    await openView(page, "Palettes");

    // Add the active color into the current-palette buffer (creates a
    // non-empty palette ready to save). The button is icon-only with
    // accessible label "Add current color … to palette". The editor mounts in
    // both layout slots (the off-breakpoint copy is `display:none`), so target
    // the visible copy rather than a positional `.last()`.
    await main
        .getByRole("button", { name: /Add current color .* to palette/ })
        .filter({ visible: true })
        .click();

    // Save by typing a name + pressing Enter on the Input (the icon-only
    // Save button next to the Input lacks an aria-label; Enter-on-Input
    // commits via the @keydown.enter handler on the same field).
    const nameInput = main.getByPlaceholder(/Palette \d+/).filter({ visible: true });
    await nameInput.fill("E.W3 test palette");
    await nameInput.press("Enter");

    // Verify the localStorage `color-palettes` store has at least one
    // entry in its `palettes` array (poll for the @vueuse/core
    // useStorage write to settle after the @keydown.enter commit).
    await expect
        .poll(async () => {
            const stored = await page.evaluate(() =>
                JSON.parse(localStorage.getItem("color-palettes") ?? "{}"),
            );
            return stored.palettes?.length ?? 0;
        })
        .toBeGreaterThanOrEqual(1);
});
