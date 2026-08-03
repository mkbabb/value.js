/**
 * CHALLENGE-C pass-5 probe #17 — the current-palette swatch menu on TOUCH.
 *
 * SwatchHoverMenu.vue:12-24 (the `!canHover` arm) wraps the swatch in a reka-ui
 * `<PopoverTrigger as-child>` whose child is a `<WatercolorDot>`. glass-ui 7's
 * WatercolorDot declares `inheritAttrs: false` and forwards only class + style
 * (dist/watercolor-dot.js:80,95-115), so the trigger's own props — id,
 * aria-haspopup, aria-expanded, the pointerdown handler — are discarded.
 *
 * Measured on an iPhone-class context (hover: none, coarse pointer).
 */
import { chromium, devices } from "playwright";

const KEY = "color-palettes";
const browser = await chromium.launch();

async function run(label, ctxOpts) {
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    await page.addInitScript((k) => {
        localStorage.setItem(k, JSON.stringify({ version: 1, palettes: [] }));
        localStorage.setItem(
            "color-picker",
            JSON.stringify({
                inputColor: "#3b82f6",
                savedColors: ["rgb(225, 29, 72)", "rgb(34, 197, 94)"],
            }),
        );
    }, KEY);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);

    const r = await page.evaluate(() => {
        const row = document.querySelector(".swatch-row");
        if (!row) return { noRow: true };
        const dots = [...row.querySelectorAll(".watercolor-swatch")];
        return {
            hoverNone: matchMedia("(hover: none)").matches,
            coarse: matchMedia("(pointer: coarse)").matches,
            swatchCount: dots.length,
            swatches: dots.map((d) => ({
                tag: d.tagName,
                ariaHidden: d.getAttribute("aria-hidden"),
                ariaLabel: d.getAttribute("aria-label"),
                ariaHasPopup: d.getAttribute("aria-haspopup"),
                ariaExpanded: d.getAttribute("aria-expanded"),
                idFromTrigger: d.id || null,
                tabIndex: d.tabIndex,
                pointerEvents: getComputedStyle(d).pointerEvents,
            })),
            focusablesInRow: [
                ...row.querySelectorAll(
                    'button,a[href],[tabindex]:not([tabindex="-1"]),[role="button"]',
                ),
            ].length,
        };
    });
    console.log(`\n===== ${label} =====`);
    console.log(JSON.stringify(r, null, 2));

    // Tap the first swatch and see whether the actions popover opens.
    const box = await page.evaluate(() => {
        const d = document.querySelector(".swatch-row .watercolor-swatch");
        if (!d) return null;
        const b = d.getBoundingClientRect();
        return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    });
    if (box) {
        if (ctxOpts.hasTouch) await page.touchscreen.tap(box.x, box.y);
        else await page.mouse.click(box.x, box.y);
        await page.waitForTimeout(900);
    }
    const after = await page.evaluate(() => ({
        popoverOpen: !!document.querySelector('[data-slot="popover-content"], .floating-panel'),
        editButtons: document.querySelectorAll('[aria-label^="Edit color"]').length,
        removeButtons: document.querySelectorAll('[aria-label^="Remove color"]').length,
    }));
    console.log("after tap/click:", JSON.stringify(after));
    await ctx.close();
}

await run("TOUCH  (iPhone 15, hasTouch, hover:none)", {
    ...devices["iPhone 15"],
});
await run("DESKTOP (mouse, hover:hover)", { viewport: { width: 1440, height: 1000 } });

await browser.close();
