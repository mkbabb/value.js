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
    await expect(main.getByRole("heading", { name: "Gradient" }).last()).toBeVisible();
    await paneSettled(page);
    return main;
}

const bar = (main: Locator) => main.getByTestId("gradient-stop-bar").last();

// The focus ring rides an inline `box-shadow` transition; snap it to its
// settled value so measurement is deterministic (a test-only aid — the product
// keeps its transition). `!important` beats the inline transition.
async function freezeRingTransition(page: Page): Promise<void> {
    await page.addStyleTag({
        content: ".rail-handle, .rail-remove-chip { transition: none !important; }",
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
            () => document.activeElement?.hasAttribute("data-stop-id") ?? false,
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
    expect(await focused.evaluate((el) => el.matches(":focus-visible"))).toBe(true);
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
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

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
        await page.evaluate(() => matchMedia("(forced-colors: active)").matches),
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

/**
 * X-W1 · R26 (picker-colorcomponentdisplay M-2 ≡ consolerail D2-02 + MISS-3) —
 * THE FORCED-COLORS ARM, EXTENDED PAST ONE RAIL HANDLE.
 *
 * The BR-1 arm above reaches exactly one control: the gradient rail handle. The
 * corpus measured why that matters — the shared WHCM register in
 * `foundation.css:698-720` binds its `outline: 2px solid Highlight` through
 * `:where(...)`, which pins its specificity at **0**, so any control's OWN
 * `.foo:focus-visible { outline: none }` (specificity 0,2,0) wins in the forced
 * -colors register too. Five controls do exactly that, removing the one property
 * WHCM preserves and keeping the one it strips — against the repo's own written
 * law at `focus-ring.css:31`. `GradientStopEditor` is the sole conformant
 * control because it re-declares the outline INSIDE its own
 * `@media (forced-colors: active)` block at matching specificity.
 *
 * The cure is at the five sites (or a specificity raise on the shared block),
 * and it is **X-W4's** — MISS-3's CURE-SHAPE LOCK says so in as many words, and
 * adds: *never another line in the register*. W1 owns only this arm's reach.
 *
 * The roster is asserted TWICE over: every member must be MOUNTED somewhere in
 * the sweep (an absent class is a named failure, not a silent pass), and every
 * mounted member must paint a real outline. `.rail-handle` rides along as the
 * control-of-record: if the conformant one ever stops painting, the instrument
 * itself is suspect.
 */
interface WhcmRosterRow {
    /** The control's own class, as its scoped CSS declares it. */
    selector: string;
    /** Which view mounts it. */
    view: "Picker" | "Gradient";
    /** The source site whose `outline: none` this row measures. */
    site: string;
}

const WHCM_ROSTER: WhcmRosterRow[] = [
    {
        selector: ".channel-rail-item",
        view: "Picker",
        site: "ConsoleRail.vue:273",
    },
    {
        selector: ".readout-fig",
        view: "Picker",
        site: "ColorComponentDisplay.vue:180",
    },
    {
        selector: ".space-trigger",
        view: "Picker",
        site: "ColorSpaceSelector.vue:277",
    },
    {
        selector: ".interval-head",
        view: "Gradient",
        site: "GradientEasingEditor.vue:229",
    },
    { selector: ".rail-btn", view: "Gradient", site: "GradientEasingEditor.vue:286" },
    {
        selector: ".rail-handle",
        view: "Gradient",
        site: "GradientStopEditor.vue:353 — the CONFORMANT control, the instrument's own check",
    },
];

/**
 * Give `selector`'s first instance true keyboard `:focus-visible` modality.
 *
 * One real `Tab` establishes the keyboard modality Chromium's `:focus-visible`
 * heuristic keys on; the programmatic focus that follows then inherits it. The
 * returned flag says whether it actually did — a measurement taken in the
 * WRONG register is worse than no measurement, so the caller asserts on it
 * rather than reading a computed style regardless.
 */
async function focusVisibly(
    page: Page,
    selector: string,
): Promise<{
    present: boolean;
    focusVisible: boolean;
    outline: string;
    width: number;
}> {
    const present = (await page.locator(selector).count()) > 0;
    if (!present) {
        return { present, focusVisible: false, outline: "", width: 0 };
    }
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    await page.keyboard.press("Tab");
    return page.evaluate((sel) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) {
            return { present: false, focusVisible: false, outline: "", width: 0 };
        }
        el.focus();
        const cs = getComputedStyle(el);
        return {
            present: true,
            focusVisible: el.matches(":focus-visible"),
            outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
            width: parseFloat(cs.outlineWidth) || 0,
        };
    }, selector);
}

test("BR-1 forced-colors · EVERY operable control class paints an outline, not only the rail handle", async ({
    page,
}) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ forcedColors: "active" });

    await page.goto("/");
    expect(
        await page.evaluate(() => matchMedia("(forced-colors: active)").matches),
        "forced-colors emulation active",
    ).toBe(true);

    const measured: Array<WhcmRosterRow & { width: number; outline: string }> = [];
    const missing: WhcmRosterRow[] = [];
    const wrongRegister: WhcmRosterRow[] = [];

    for (const view of ["Picker", "Gradient"] as const) {
        await openView(page, view);
        await paneSettled(page);
        for (const row of WHCM_ROSTER.filter((r) => r.view === view)) {
            const probe = await focusVisibly(page, row.selector);
            if (!probe.present) {
                missing.push(row);
                continue;
            }
            if (!probe.focusVisible) {
                wrongRegister.push(row);
                continue;
            }
            measured.push({ ...row, width: probe.width, outline: probe.outline });
        }
    }

    console.log(
        `[o27 WHCM roster] ${measured
            .map((m) => `${m.selector} → ${m.outline}`)
            .join(" | ")}`,
    );

    // The roster's own integrity, before any verdict about the product.
    expect(
        missing.map((m) => `${m.selector} (${m.view})`),
        "a roster control class mounts nowhere in the sweep — the arm's reach is a claim, and this is the claim failing",
    ).toEqual([]);
    expect(
        wrongRegister.map((m) => m.selector),
        "focus landed WITHOUT :focus-visible, so the outline read would be from the wrong register",
    ).toEqual([]);

    // The product law: WHCM strips box-shadow, so the affordance must ride a
    // real outline on EVERY operable control — `focus-ring.css:31`.
    const unpainted = measured
        .filter((m) => m.width < 2)
        .map((m) => `${m.selector} → "${m.outline}" (${m.site})`);
    expect(
        unpainted,
        "these controls remove the one property WHCM preserves and keep the one it strips; the cure is at the five sites or a specificity raise on the shared `:where(...)` register — X-W4's, never another line in the register",
    ).toEqual([]);
});
