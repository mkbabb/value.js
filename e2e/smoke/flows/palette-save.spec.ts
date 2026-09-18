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
    // non-empty palette ready to save). The editor mounts in both layout slots
    // (the off-breakpoint copy is `display:none`), so target the visible copy
    // rather than a positional `.last()`.
    //
    // ── X-W1 · R2 (PP-2 = A-3 = SH-8) ───────────────────────────────────────
    // This bound `/Add current color .* to palette/` by ROLE, which can never
    // match. MEASURED at the running app, 2026-09-18: the slot renders
    // `<span aria-hidden="true">` with no `aria-label`, no `role`,
    // `pointer-events: none`, and a forced click adds nothing. ROOT: glass-ui
    // 7.0.0's `WatercolorDot` declares `inheritAttrs: false` and renders that
    // span, so `tag="button"`, `aria-label` and `@click` are dropped at the
    // seam (`CurrentPaletteEditor.vue:96-105`). The affordance is DEAD in the
    // shipped product. The cure is routed (glass-ui is READ-ONLY; `demo/` is
    // this wave's Triumvirate trigger); the oracle is made honest.
    const addSlot = main.locator(".add-slot-ghost").filter({ visible: true }).first();
    await expect(addSlot).toBeVisible();
    await expect(
        addSlot,
        "the add-slot must be an OPERABLE control, not an aria-hidden decoration — glass-ui 7.0.0 WatercolorDot drops tag/aria-label/@click (inheritAttrs:false)",
    ).toHaveAttribute("aria-label", /Add current color/, { timeout: 2000 });
    await addSlot.click();

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
