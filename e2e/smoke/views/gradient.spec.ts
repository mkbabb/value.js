import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView, paneSettled } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A) + the S.W5 §6.1 gradient interaction spec (Lane C),
 * EXTENDED at T.W6-2 (the §6.1 extension the O-21 gate names): stop add /
 * drag / remove, the atomic round-trip with its explicit failure surface
 * (W5-11), the easing row's live ramp (W5-9), the hue-swept envelope plate
 * (T.W6-2, ex the W5-8 slice), the rail-normalization/render-tile job split
 * (T-21b), and the at-rest no-compositing-transform audit (W5-10).
 */

async function openGradient(page: Page): Promise<Locator> {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Gradient" }).last(),
    ).toBeVisible();
    // The swap spring must be at rest before interactions — the cold-load
    // stall-then-resume enter transition defeats Playwright's bounding-box
    // stability check (see paneSettled).
    await paneSettled(page);
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
    // T.W6-2 (ex W5-8): the envelope plate is the hero — present, sized,
    // and stating its FULL condition: space, swept hues (a single hue when
    // pinned/degenerate, a range for a hue-varying ramp), and the
    // cusp-adaptive axis.
    const plate = main
        .getByRole("img", { name: /Perceived-space plate/ })
        .last();
    await expect(plate).toBeVisible();
    await expect(plate).toContainText(/H \d+(–\d+)?°/);
    await expect(plate).toContainText(/C ≤ 0\.\d+/);

    expect(consoleErrors).toEqual([]);
});

test("the rail is a normalized 90° projection; the render tile carries type + direction (T-21b)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    const railImage = () =>
        bar(main).evaluate((el) => getComputedStyle(el).backgroundImage);
    const tileImage = () =>
        main
            .getByTestId("gradient-render-tile")
            .last()
            .evaluate((el) => getComputedStyle(el).backgroundImage);

    // Angled linear: the rail NEVER rotates (the ramp completes the full
    // strip — "too short" is dead); the tile carries the angle.
    await typeIntoEditor(main, page, "linear-gradient(30deg, red, blue)");
    await expect
        .poll(tileImage, { timeout: 3000 })
        .toMatch(/^linear-gradient\(30deg/);
    expect(await railImage()).toMatch(/^linear-gradient\(90deg/);

    // Reversed direction: the rail axis NEVER flips against the handles.
    await typeIntoEditor(main, page, "linear-gradient(270deg, red, blue)");
    await expect
        .poll(tileImage, { timeout: 3000 })
        .toMatch(/^linear-gradient\(270deg/);
    expect(await railImage()).toMatch(/^linear-gradient\(90deg/);

    // Conic: an angular sweep can NOT live in the editing strip — the tile
    // renders it; the rail stays the normalized projection.
    await typeIntoEditor(main, page, "conic-gradient(from 45deg, red, blue)");
    await expect
        .poll(tileImage, { timeout: 3000 })
        .toMatch(/^conic-gradient\(from 45deg/);
    expect(await railImage()).toMatch(/^linear-gradient\(90deg/);

    expect(consoleErrors).toEqual([]);
});

test("selecting a stop pins the envelope plate to that stop's single-hue slice", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const plate = main
        .getByRole("img", { name: /Perceived-space plate/ })
        .last();

    // Default hue-varying seed: the label states a RANGE.
    await expect(plate).toContainText(/H \d+–\d+°/);

    // Pin: select the first stop — the label collapses to that hue alone
    // (the degenerate slice, the stated special case).
    await handles(main).first().click();
    await expect(plate).toContainText(/H \d+°/);
    await expect(plate).not.toContainText(/H \d+–\d+°/);

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

    // Flip the interval to steps. T.W6-3 (the interval specimen bench)
    // retired the SegmentedTabs mode pill — selection now lives on the
    // specimen strip's aria-pressed tiles; `exact` dodges the
    // step-start/step-end siblings. The authored literal follows into the
    // row's ONE readout rail (the one-literal law), byte-exact to the
    // catalogue's mint (`stepsLiteral(4, "end")`).
    const strip = main
        .getByRole("group", { name: "Easing curve specimens" })
        .first();
    await strip.getByRole("button", { name: "steps", exact: true }).click();
    await expect(main.locator(".readout-rail code").first()).toContainText(
        "steps(4, end)",
        { timeout: 3000 },
    );
    // The closed-row identity law: the row head speaks the steps family.
    await expect(main.locator(".interval-head").first()).toContainText(
        "steps",
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
