import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A) + the S.W5 §6.1 gradient interaction spec (Lane C):
 * stop add / drag / remove, the atomic round-trip with its explicit failure
 * surface (W5-11), the easing row's live ramp (W5-9), the perceived-space
 * plate (W5-8), and the at-rest no-compositing-transform audit (W5-10).
 */

async function openGradient(page: Page): Promise<Locator> {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Gradient" }).last(),
    ).toBeVisible();
    return main;
}

const bar = (main: Locator) => main.getByTestId("gradient-stop-bar").last();
const handles = (main: Locator) => bar(main).locator("[data-stop-id]");

async function typeIntoEditor(main: Locator, page: Page, css: string) {
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await editor.scrollIntoViewIfNeeded();
    await editor.click();
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.type(css, { delay: 3 });
}

test("gradient view renders direction slider with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    const main = await openGradient(page);
    // The visualizer's "Interpolation" section heading proves the visualizer
    // shell mounted (reka-ui slider thumbs are 0×0 spans so role="slider"
    // checks miss; the heading is a stable visible anchor).
    await expect(
        main.getByRole("heading", { name: "Interpolation" }).last(),
    ).toBeVisible();
    // W5-8: the perceived-space plate is the hero — present, sized, and
    // stating its condition (the running-hue chip).
    const plate = main
        .getByRole("img", { name: /Perceived-space plate/ })
        .last();
    await expect(plate).toBeVisible();
    await expect(plate).toContainText(/H \d+°/);

    expect(consoleErrors).toEqual([]);
});

test("stop add (bar click mints the ramp color), drag, and touch-true remove", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await expect(handles(main)).toHaveCount(2);

    // ── add: a single bar click at ~50% (the warp-on-pointerdown is dead).
    //    locator.click = actionability-checked (auto-scroll; an intercepting
    //    overlay fails loudly instead of silently swallowing the click). ──
    await bar(main).scrollIntoViewIfNeeded();
    const box = await bar(main).boundingBox();
    if (!box) throw new Error("stop bar not visible");
    await bar(main).click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(handles(main)).toHaveCount(3);

    // ── drag: the middle handle moves; its accessible position follows ──
    const mid = handles(main).nth(1);
    await mid.hover();
    const midBox = await mid.boundingBox();
    if (!midBox) throw new Error("middle handle not visible");
    await page.mouse.down();
    await page.mouse.move(
        box.x + box.width * 0.75,
        midBox.y + midBox.height / 2,
        { steps: 8 },
    );
    await page.mouse.up();
    const label = await mid.getAttribute("aria-label");
    const pct = Number(label?.match(/(\d+)%/)?.[1] ?? "0");
    expect(pct).toBeGreaterThan(60);

    // ── remove: selecting the handle reveals the remove chip (W5-11 — the
    //    right-click-only gesture is dead; remove is a visible control).
    //    The chip is a SIBLING of the bar (its glass-wash contain:paint
    //    clips children outside the box), so locate from the pane. ──
    const chip = main.getByRole("button", {
        name: "Remove selected stop",
    });
    await expect(chip).toBeVisible();
    await chip.click();
    await expect(handles(main)).toHaveCount(2);

    expect(consoleErrors).toEqual([]);
});

test("round-trip: authored CSS applies atomically with literals preserved", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await typeIntoEditor(
        main,
        page,
        "linear-gradient(45deg, red, rebeccapurple 80%)",
    );

    // The debounced parse applies the WHOLE model: a stop lands at 80%.
    await expect(
        bar(main).locator('[data-stop-id][aria-label="Gradient stop at 80%"]'),
    ).toBeVisible({ timeout: 3000 });
    await expect(handles(main)).toHaveCount(2);
    // No verdict — the failure surface is silent on success.
    await expect(main.getByTestId("gradient-parse-verdict")).toHaveCount(0);
    // The truce: the user's literals were NOT rewritten under the caret.
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await expect(editor).toContainText("rebeccapurple");

    // On blur the clean text settles to the canonical serialization —
    // authored literals survive (P2-15).
    await main.getByRole("heading", { name: "Gradient" }).last().click();
    await expect(editor).toContainText("red 0%, rebeccapurple 80%");

    expect(consoleErrors).toEqual([]);
});

test("garbage input fails LOUD and leaves the model untouched", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await typeIntoEditor(main, page, "linear-gradient(90deg, notacolor, ???)");

    // The explicit failure surface (W5-11): a one-line verdict naming the
    // offending token + the destructive border on a real border.
    const verdict = main.getByTestId("gradient-parse-verdict").last();
    await expect(verdict).toBeVisible({ timeout: 3000 });
    await expect(verdict).toContainText("notacolor");
    const editor = main.getByRole("textbox", { name: "Gradient CSS" }).last();
    await expect(editor).toHaveClass(/border-destructive/);
    // The WIP text is never destroyed.
    await expect(editor).toContainText("notacolor");

    // The model is UNTOUCHED — no partial apply, and the Easing section
    // (P0-1's vanishing witness) is still standing.
    await expect(handles(main)).toHaveCount(2);
    await expect(
        main.getByRole("heading", { name: "Easing" }).last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});

test("radial geometry is model-or-reject, never a silent drop", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    await typeIntoEditor(
        main,
        page,
        "radial-gradient(circle at 30% 30%, red, blue)",
    );

    const verdict = main.getByTestId("gradient-parse-verdict").last();
    await expect(verdict).toBeVisible({ timeout: 3000 });
    await expect(verdict).toContainText(/radial geometry/);
    await expect(handles(main)).toHaveCount(2);

    expect(consoleErrors).toEqual([]);
});

test("easing row carries its live ramp; steps mode lands in the literal", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    // The first row is open on arrival and carries the interval's own ramp
    // strip (W5-9 — the row's "ball").
    await expect(
        main.getByRole("img", { name: /Eased ramp for interval/ }).last(),
    ).toBeVisible();

    // Flip the interval to Steps (SegmentedTabs pill = role=group +
    // aria-pressed buttons): the authored literal follows.
    await main.getByRole("button", { name: "Steps", exact: true }).last().click();
    await expect(main.locator(".interval-head code").first()).toContainText(
        /steps\(/i,
        { timeout: 3000 },
    );

    expect(consoleErrors).toEqual([]);
});

test("no pane subtree rests on a permanent compositing transform (W5-10)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    await openGradient(page);
    // Let the view-switch spring fully settle.
    await page.waitForTimeout(1200);

    const transforms = await page.evaluate(() => {
        const out: { sel: string; transform: string }[] = [];
        for (const sel of [
            ".pane-container",
            ".pane-wrapper",
            ".pane-wrapper > *",
        ]) {
            for (const el of document.querySelectorAll(sel)) {
                const t = getComputedStyle(el).transform;
                if (t && t !== "none") out.push({ sel, transform: t });
            }
        }
        return out;
    });
    expect(transforms).toEqual([]);

    expect(consoleErrors).toEqual([]);
});
