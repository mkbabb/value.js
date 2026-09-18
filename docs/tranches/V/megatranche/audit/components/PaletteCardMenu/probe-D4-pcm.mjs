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

const run = async () => {
    const browser = await chromium.launch();
    const out = {};

    // --- A. TOUCH: tap the sub-trigger (no hover possible) ---
    {
        const ctx = await browser.newContext({
            ...devices["iPhone 14"], hasTouch: true, isMobile: true, deviceScaleFactor: 2,
        });
        const page = await ctx.newPage();
        await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.locator('button[aria-label="Palette menu"]').first().tap();
        await page.waitForSelector('[data-slot="dropdown-menu-content"]', { timeout: 5000 });
        await page.waitForTimeout(400);
        const trigger = page.locator('[data-slot="dropdown-menu-sub-trigger"]').first();
        const before = await page.evaluate(() => ({
            subContentPresent: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
            ariaExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
        }));
        await trigger.tap();
        await page.waitForTimeout(900);
        const after1 = await page.evaluate(() => ({
            subContentPresent: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
            ariaExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
            dataState: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("data-state"),
        }));
        await trigger.tap();
        await page.waitForTimeout(900);
        const after2 = await page.evaluate(() => ({
            subContentPresent: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
            ariaExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
        }));
        await page.screenshot({ path: `${OUT}/evidence/touch-tap-export-subtrigger.png` });
        out.touchTap = { before, afterTap1: after1, afterTap2: after2, hasTouch: true, device: "iPhone 14" };
        await ctx.close();
    }

    // --- B. control: same tap flow with .prevent neutralised in the DOM ---
    {
        const ctx = await browser.newContext({
            ...devices["iPhone 14"], hasTouch: true, isMobile: true, deviceScaleFactor: 2,
        });
        const page = await ctx.newPage();
        await page.addInitScript((s) => { localStorage.setItem("color-palettes", JSON.stringify(s)); localStorage.setItem("value-onboarding-seen", "1"); }, SEED);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.locator('button[aria-label="Palette menu"]').first().tap();
        await page.waitForSelector('[data-slot="dropdown-menu-content"]');
        await page.waitForTimeout(400);
        // capture-phase listener that re-enables default, proving the mechanism
        await page.evaluate(() => {
            const t = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
            const clone = t.cloneNode(true);
            // instead of cloning (loses reka), just synthesise a click whose
            // defaultPrevented cannot be observed: dispatch a non-cancelable click
            t.__probe = true;
        });
        const res = await page.evaluate(() => {
            const t = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
            // A NON-CANCELABLE click: preventDefault() is a no-op, so
            // event.defaultPrevented stays false and reka's handler proceeds.
            t.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: false }));
            return new Promise((r) => setTimeout(() => r({
                subContentPresent: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
                ariaExpanded: t.getAttribute("aria-expanded"),
            }), 700));
        });
        // and a CANCELABLE click for contrast
        const res2 = await page.evaluate(() => {
            const t = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
            const sc = document.querySelector('[data-slot="dropdown-menu-sub-content"]');
            if (sc) { document.body.click(); }
            return new Promise((r) => setTimeout(() => {
                const t2 = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
                if (!t2) return r({ note: "menu closed by body click" });
                t2.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
                setTimeout(() => r({
                    subContentPresent: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
                    ariaExpanded: t2.getAttribute("aria-expanded"),
                }), 700);
            }, 400));
        });
        out.cancelableControl = { nonCancelableClick: res, cancelableClick: res2 };
        await ctx.close();
    }

    await browser.close();
    fs.writeFileSync(OUT + "/probe-D4-results.json", JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
};
run().catch((e) => { console.error(e); process.exit(1); });
