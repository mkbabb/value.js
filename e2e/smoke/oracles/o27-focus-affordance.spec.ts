import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView, paneSettled } from "../fixtures/dock";

/**
 * U.W-A11Y · O-27 — THE A11Y-CONTROLS ORACLE (born-RED; U-F25 focus + U-F27
 * target-size + aria-valuetext). The a11y properties this wave cures are
 * DETERMINISTIC + HEADLESS-verifiable — a computed box-shadow/outline, DOM
 * pseudo geometry, a DOM attribute — so these are REAL born-RED assertions, no
 * GPU annex (the crisp contrast with the aurora/blob oracles).
 *
 * BR-1 (U-F25) — keyboard-focus a gradient stop → a focus affordance PAINTS:
 *   a ring layer present in `box-shadow` (distinct from the material
 *   `--shadow-sm`) with a non-empty resolved ring colour; under
 *   `forced-colors:active` a computed `outline` ≥ 2px. RED today: the inline
 *   `boxShadow` on the handle clobbers the `focus-visible:ring-2` layer AND the
 *   `--ring` token resolves empty (the twin of the 4e6c178 dead-hover miss).
 *
 * BR-3 (U-F27) — every keyboard/pointer-operable gradient control's EFFECTIVE
 *   target ≥ 24px CSS on fine pointers (WCAG 2.5.8) / ≥ 44px on coarse, via
 *   always-on hit-inflation — with the VISUAL dot (the mount box) HELD. RED
 *   today: the 20×20 dot carries only a coarse-gated `::before`, so fine
 *   pointers see a 20px target.
 *
 * BR-4 (U-F27) — every channel slider exposes a HUMAN-READABLE, unit-aware
 *   `aria-valuetext` — NOT a raw ≥10-digit `aria-valuenow`. RED today: the
 *   reka thumb emits `aria-valuenow="0.5833333333333334"` with no valuetext.
 */

test.use({ deviceScaleFactor: 2 });

async function openGradient(page: Page): Promise<Locator> {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Gradient" }).last(),
    ).toBeVisible();
    await paneSettled(page);
    return main;
}

const bar = (main: Locator) => main.getByTestId("gradient-stop-bar").last();

// The focus ring rides an inline `box-shadow` transition; snap it to its
// settled value so measurement is deterministic (a test-only aid — the product
// keeps its transition). `!important` beats the inline transition.
async function freezeRingTransition(page: Page): Promise<void> {
    await page.addStyleTag({
        content:
            ".rail-handle, .rail-remove-chip { transition: none !important; }",
    });
}

// Tab through the honest focus order until a gradient stop handle takes
// keyboard focus (the o15 idiom — Tab gives true `:focus-visible` modality,
// which a programmatic `.focus()` does NOT). Returns the focused handle.
async function tabToHandle(page: Page, main: Locator): Promise<Locator> {
    const handle = bar(main).locator("[data-stop-id]").first();
    await handle.scrollIntoViewIfNeeded();
    for (let i = 0; i < 80; i++) {
        await page.keyboard.press("Tab");
        const onHandle = await page.evaluate(
            () =>
                document.activeElement?.hasAttribute("data-stop-id") ?? false,
        );
        if (onHandle) break;
    }
    const focused = page.locator("[data-stop-id]:focus");
    await expect(focused).toHaveCount(1);
    return focused;
}

test("BR-1 · focus affordance PAINTS a ring layer over the stop fill", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const handle = bar(main).locator("[data-stop-id]").first();

    // Baseline (unfocused): the material lift alone — NO ring layer.
    const rest = await handle.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(rest).not.toMatch(/0px 0px 0px (1|3)px/);

    await freezeRingTransition(page);
    const focused = await tabToHandle(page, main);
    expect(await focused.evaluate((el) => el.matches(":focus-visible"))).toBe(
        true,
    );
    const box = await focused.evaluate((el) => getComputedStyle(el).boxShadow);

    // A dual-contrast ring layer is present (0-blur, ≥1px spread — the ring
    // signature, distinct from `--shadow-sm`'s 8px-blur/0-spread material lift),
    // it is a NON-empty colour (not a transparent no-op), and the focused
    // shadow differs from the resting one.
    expect(box).toMatch(/0px 0px 0px 3px/); // the outer light ring
    expect(box).toMatch(/0px 0px 0px 1px/); // the inner dark hairline
    // the outer ring resolved a real, non-empty LIGHT colour (not the empty
    // `--ring` no-op the defect reached)…
    expect(box).toMatch(/255,\s*255,\s*255/);
    // …and no ring layer is a transparent no-op.
    expect(box).not.toMatch(/rgba?\(0,\s*0,\s*0,\s*0\)\s+0px 0px 0px 3px/);
    expect(box).not.toBe(rest);

    expect(consoleErrors).toEqual([]);
});

test("BR-3 · fine pointer: effective target ≥ 24px, the 20px visual dot HELD", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const handle = bar(main).locator("[data-stop-id]").first();

    const geom = await handle.evaluate((el) => {
        const before = getComputedStyle(el, "::before");
        // getBoundingClientRect is CSS (layout) px, dpr-independent.
        const rect = el.getBoundingClientRect();
        return {
            hitW: parseFloat(before.width),
            hitH: parseFloat(before.height),
            visualW: rect.width,
            visualH: rect.height,
        };
    });

    // Effective (pointer-events) target clears the WCAG 2.5.8 24px floor…
    expect(geom.hitW).toBeGreaterThanOrEqual(24);
    expect(geom.hitH).toBeGreaterThanOrEqual(24);
    // …while the VISUAL dot stays 20×20 (the mount box HELD — no reflow).
    expect(geom.visualW).toBeGreaterThan(18);
    expect(geom.visualW).toBeLessThan(22);
    expect(geom.visualH).toBeGreaterThan(18);
    expect(geom.visualH).toBeLessThan(22);

    expect(consoleErrors).toEqual([]);
});

test("BR-4 · every channel slider exposes a human-readable aria-valuetext", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    const thumbs = page
        .getByRole("main", { name: "Color tool panes" })
        .getByRole("slider");
    await expect(thumbs.first()).toBeVisible();
    // The demo sets `aria-valuetext` on the rendered thumb after mount (a
    // post-flush nextTick); poll until it lands before asserting the grammar.
    await expect
        .poll(() => thumbs.first().getAttribute("aria-valuetext"), {
            timeout: 8000,
        })
        .toBeTruthy();
    const count = await thumbs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const t = thumbs.nth(i);
        const vt = await t.getAttribute("aria-valuetext");
        // present + human-readable (starts with a channel NAME, carries a
        // value) …
        expect(vt, `slider ${i} aria-valuetext`).toBeTruthy();
        expect(vt!).toMatch(/^[A-Za-z][A-Za-z ]*\s.+/);
        // …and NOT the raw ≥10-digit float the reka `aria-valuenow` emits.
        expect(vt!).not.toMatch(/\d\.\d{10,}/);
    }

    expect(consoleErrors).toEqual([]);
});

test.describe("BR-3 coarse pointer", () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 412, height: 915 } });

    test("effective target ≥ 44px on coarse pointers (producer referent)", async ({
        page,
    }) => {
        const consoleErrors = setupEnvNoise(page);
        const main = await openGradient(page);
        const handle = bar(main).locator("[data-stop-id]").first();

        const coarse = await page.evaluate(
            () => matchMedia("(pointer: coarse)").matches,
        );
        expect(coarse, "emulated coarse pointer").toBe(true);

        const hit = await handle.evaluate((el) => {
            const before = getComputedStyle(el, "::before");
            return {
                w: parseFloat(before.width),
                h: parseFloat(before.height),
            };
        });
        expect(hit.w).toBeGreaterThanOrEqual(44);
        expect(hit.h).toBeGreaterThanOrEqual(44);

        expect(consoleErrors).toEqual([]);
    });
});

test("BR-1 forced-colors · focus affordance survives WHCM via a computed outline ≥ 2px", async ({
    page,
}) => {
    // Runtime media emulation (deterministic — `test.use({ forcedColors })`
    // did not propagate through a bare project `use`); box-shadow is stripped
    // in WHCM, so the affordance must ride a real `outline`.
    await page.emulateMedia({ forcedColors: "active" });
    const main = await openGradient(page);
    expect(
        await page.evaluate(
            () => matchMedia("(forced-colors: active)").matches,
        ),
        "forced-colors emulation active",
    ).toBe(true);
    const focused = await tabToHandle(page, main);

    const outline = await focused.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { width: parseFloat(cs.outlineWidth), style: cs.outlineStyle };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);
});
