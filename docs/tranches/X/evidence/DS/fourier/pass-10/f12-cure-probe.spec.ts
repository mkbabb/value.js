// X-DS fourier pass 10 — AFTER cells for the F12 cure. Run from a temporary copy at
// web/e2e/_ds-f12-cure.spec.ts (deleted after), project chromium = headless (§0ei),
// BASE_URL=http://localhost:3100 (serves the cured checkout).
// OUT = the value.js evidence dir pass-10/.
import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { ADMIN_TOKEN, ENTRY, stubAdminApi } from "./fixtures/gallery";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-10";
const res: Record<string, unknown> = {};
test.describe.configure({ mode: "serial" });
test.use({ deviceScaleFactor: 2 });
test.afterAll(() => writeFileSync(`${OUT}/f12-cure-probe.json`, JSON.stringify(res, null, 1)));

async function themed(page: Page, theme: string) {
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
}

for (const theme of ["light", "dark"]) {
    test(`gallery admin ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await themed(page, theme);
        await stubAdminApi(page, [ENTRY, { ...ENTRY, slug: "quiet-heron-lattice-three", image_slug: "img-quiet-heron", title: "Quiet heron lattice", tier: "saved" }]);
        await page.goto(`/gallery?admin=${ADMIN_TOKEN}`);
        const banner = page.getByRole("region", { name: "Admin mode banner" });
        await expect(banner).toBeVisible({ timeout: 60_000 });
        await page.waitForTimeout(2000);
        const card = page.locator("article.gallery-card").first();
        await card.screenshot({ path: `${OUT}/gallery-admin-card-${theme}-1440.png` });
        await page.screenshot({ path: `${OUT}/gallery-admin-${theme}-1440.png` });
        const geo = await card.evaluate((c) => {
            const r = (e: Element | null) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), r: +b.right.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
            const media = c.querySelector(".card-media"), start = c.querySelector(".overlay-plate--start"), end = c.querySelector(".overlay-plate--end");
            const del = end?.querySelector("button[title=Delete]");
            const cs = end ? getComputedStyle(end) : null;
            return { media: r(media), start: r(start), end: r(end), endBg: cs?.backgroundColor, endRadius: cs?.borderTopLeftRadius, deleteOnPlate: !!del, deleteShadow: del ? getComputedStyle(del).boxShadow : null };
        });
        res[`overlay-${theme}`] = geo;
        // both plates wholly on the thumbnail, the same inset from its corner on both axes
        const m = geo.media!, s = geo.start!, e = geo.end!;
        expect(s.x - m.x).toBeGreaterThan(0); expect(s.y - m.y).toBeGreaterThan(0);
        expect(Math.abs((s.x - m.x) - (s.y - m.y))).toBeLessThan(1);
        expect(Math.abs((m.r - e.r) - (e.y - m.y))).toBeLessThan(1);
        expect(geo.deleteOnPlate).toBe(true);
        const x = Math.max(m.x - 10, 0), y = Math.max(m.y - 10, 0);
        await page.screenshot({ path: `${OUT}/crop-admin-overlay-${theme}.png`, clip: { x, y, width: m.w + 20, height: 70 } });
        res[`banner-${theme}`] = await banner.evaluate((el) => ({ border: getComputedStyle(el).borderTopWidth, color: getComputedStyle(el).borderTopColor }));
        await banner.screenshot({ path: `${OUT}/banner-${theme}-1440.png` });
    });
    for (const w of [1440, 390]) {
        test(`w empty ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await page.goto("/w", { waitUntil: "networkidle" });
            await expect(page.locator(".drop-zone")).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(1500);
            await page.screenshot({ path: `${OUT}/w-${theme}-${w}.png` });
            const g = await page.evaluate(() => {
                const r = (s: string) => { const b = document.querySelector(s)!.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
                return { stage: r(".canvas-stage"), zone: r(".drop-zone"), title: r(".drop-target-title"), zoneRadius: getComputedStyle(document.querySelector(".drop-zone")!).borderTopLeftRadius };
            });
            res[`w-${theme}-${w}`] = g;
            // the zone fills the stage (inset by the pad only)
            expect(g.zone[2] / g.stage[2]).toBeGreaterThan(0.9);
            expect(g.zone[3] / g.stage[3]).toBeGreaterThan(0.9);
        });
    }
}
