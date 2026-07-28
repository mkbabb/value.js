import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCardMenu";
const now = "2026-07-27T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug, colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const SEED = { version: 1, palettes: [
    mk("Muted Terracotta and Deep Sea Foam Study", "pal-saved-1",
       ["#c96f4a", "#7fb7a3", "#2e4a52", "#e8d5b7", "#8a5a44"], { versionCount: 4, tier: "featured" }),
] };

const instrument = async (page) => {
    await page.evaluate(() => {
        window.__ev = [];
        const t = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
        for (const type of ["pointerdown", "pointerup", "pointermove", "click", "touchstart", "touchend", "mousedown", "mouseup"]) {
            t.addEventListener(type, (e) => {
                window.__ev.push({ phase: "capture", type, pointerType: e.pointerType, cancelable: e.cancelable, defaultPrevented: e.defaultPrevented });
            }, true);
            t.addEventListener(type, (e) => {
                window.__ev.push({ phase: "bubble-end", type, pointerType: e.pointerType, cancelable: e.cancelable, defaultPrevented: e.defaultPrevented });
            }, false);
        }
        // last-registered bubble listener runs after the consumer's + reka's
        setTimeout(() => {
            t.addEventListener("click", (e) => {
                window.__ev.push({ phase: "AFTER-ALL", type: "click", defaultPrevented: e.defaultPrevented });
            });
        }, 0);
    });
};

const run = async () => {
    const browser = await chromium.launch();
    const out = {};

    for (const [tag, ctxOpts, useTap] of [
        ["desktop-mouse-click", { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 }, false],
        ["touch-tap", { ...devices["iPhone 14"], hasTouch: true, isMobile: true, deviceScaleFactor: 2 }, true],
    ]) {
        const ctx = await browser.newContext(ctxOpts);
        const page = await ctx.newPage();
        await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        const trg = page.locator('button[aria-label="Palette menu"]').first();
        if (useTap) await trg.tap(); else await trg.click();
        await page.waitForSelector('[data-slot="dropdown-menu-content"]');
        await page.waitForTimeout(400);
        await instrument(page);
        const sub = page.locator('[data-slot="dropdown-menu-sub-trigger"]').first();
        if (useTap) await sub.tap();
        else {
            const box = await sub.boundingBox();
            await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        }
        await page.waitForTimeout(900);
        out[tag] = await page.evaluate(() => ({
            events: window.__ev,
            open: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
            ariaExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
        }));
        await ctx.close();
    }

    await browser.close();
    fs.writeFileSync(OUT + "/probe-D5-results.json", JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
};
run().catch((e) => { console.error(e); process.exit(1); });
