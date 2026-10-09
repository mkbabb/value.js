// X-DS fourier pass 11 — cells for the F13 cure. Temporary copy at web/e2e/_ds-f13-cure.spec.ts
// (deleted after); project chromium = headless (§0ei); BASE_URL serves the cured checkout.
import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { ADMIN_TOKEN, ENTRY, stubAdminApi } from "./fixtures/gallery";

const OUT = process.env.DS_OUT ?? "/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-11";
const TAG = process.env.DS_TAG ?? "after";
const SHOT = process.env.DS_SHOT !== "0";
const res: Record<string, unknown> = {};
test.describe.configure({ mode: "serial" });
test.use({ deviceScaleFactor: 2 });
test.afterAll(() => writeFileSync(`${OUT}/f13-cure-probe-${TAG}.json`, JSON.stringify(res, null, 1)));

async function themed(page: Page, theme: string) {
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
}

async function statRow(page: Page) {
    return page.locator("article.gallery-card").first().evaluate((c) => {
        const views = c.querySelector(".card-stats > span .tabular-nums")!;
        const likes = c.querySelector(".like-btn .tabular-nums")!;
        const g = (e: Element) => { const b = e.getBoundingClientRect(); return { top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), lh: getComputedStyle(e).lineHeight }; };
        // the ink: a Range over the text gives the glyph box of the font's line
        const ink = (e: Element) => { const r = document.createRange(); r.selectNodeContents(e); const b = r.getBoundingClientRect(); return +(b.top + b.height / 2).toFixed(2); };
        const v = g(views), l = g(likes);
        return { views: v, likes: l, viewsMid: ink(views), likesMid: ink(likes), dMid: +(ink(likes) - ink(views)).toFixed(2), rowAlign: getComputedStyle(c.querySelector(".card-stats")!).alignItems };
    });
}

for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) {
        test(`gallery admin ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await stubAdminApi(page, [ENTRY, { ...ENTRY, slug: "quiet-heron-lattice-three", image_slug: "img-quiet-heron", title: "Quiet heron lattice", tier: "saved" }]);
            await page.goto(`/gallery?admin=${ADMIN_TOKEN}`);
            await expect(page.getByRole("region", { name: "Admin mode banner" })).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(2000);
            const card = page.locator("article.gallery-card").first();
            const stats = await statRow(page);
            const plate = await card.evaluate((c) => {
                const p = c.querySelector(".overlay-plate--end")!;
                const pb = p.getBoundingClientRect();
                const items = [...p.querySelectorAll("[data-tier]")].map((e) => e.getBoundingClientRect());
                const del = p.querySelector("button[title=Delete]")!;
                const glyph = del.querySelector("svg")!.getBoundingClientRect();
                const firstGlyph = p.querySelector("[data-tier] svg")!.getBoundingClientRect();
                const tg = p.querySelector("[data-slot=tier-control]")!;
                return {
                    plateW: +pb.width.toFixed(1), mediaW: +c.querySelector(".card-media")!.getBoundingClientRect().width.toFixed(1),
                    plateGap: getComputedStyle(p).columnGap, tierGap: getComputedStyle(tg).columnGap,
                    discLeftInset: +(items[0].left - pb.left).toFixed(1),
                    trashRightInset: +(pb.right - glyph.right).toFixed(1),
                    firstGlyphLeftInset: +(firstGlyph.left - pb.left).toFixed(1),
                    lastDiscToDelete: +(del.getBoundingClientRect().left - items[items.length - 1].right).toFixed(1),
                    discToDisc: items.length > 1 ? +(items[1].left - items[0].right).toFixed(1) : null,
                    trashGlyph: +glyph.width.toFixed(1), tierGlyph: +firstGlyph.width.toFixed(1),
                    deleteBoxW: +del.getBoundingClientRect().width.toFixed(1), discW: +items[0].width.toFixed(1),
                };
            });
            res[`${theme}-${w}`] = { stats, plate };
            if (SHOT) {
                await card.screenshot({ path: `${OUT}/gallery-admin-card-${theme}-${w}.png` });
                const sb = (await card.locator(".card-stats").boundingBox())!;
                await page.screenshot({ path: `${OUT}/stats-crop-${theme}-${w}.png`, clip: { x: sb.x - 6, y: sb.y - 6, width: sb.width + 12, height: sb.height + 12 } });
                const pb = (await card.locator(".overlay-plate--end").boundingBox())!;
                await page.screenshot({ path: `${OUT}/crop-plate-${theme}-${w}.png`, clip: { x: pb.x - 8, y: pb.y - 8, width: pb.width + 16, height: pb.height + 16 } });
                if (w === 1440) await page.screenshot({ path: `${OUT}/gallery-admin-${theme}-1440.png` });
            }
        });
        test(`gallery public ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await stubAdminApi(page, [ENTRY]);
            await page.goto(`/gallery`);
            await expect(page.locator("article.gallery-card").first()).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(1500);
            res[`public-${theme}-${w}`] = await statRow(page);
            if (SHOT) await page.screenshot({ path: `${OUT}/gallery-${theme}-${w}.png` });
        });
        test(`morph ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await page.goto("/morph", { waitUntil: "networkidle" });
            const lede = page.locator(".demo-subtitle");
            await expect(lede).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(1500);
            res[`morph-${theme}-${w}`] = await lede.evaluate((e) => {
                const r = document.createRange(); r.selectNodeContents(e);
                const lines = [...r.getClientRects()].reduce<number[]>((a, b) => (a.some((t) => Math.abs(t - b.top) < 2) ? a : [...a, b.top]), []);
                // the last line's words: walk text nodes by word
                const t = e.textContent!.trim(); const words = t.split(/\s+/); const node = e.firstChild!; const full = node.textContent!;
                let lastTop = -1, lastWords: string[] = []; let idx = full.indexOf(words[0]);
                for (const wd of words) { idx = full.indexOf(wd, idx); const rr = document.createRange(); rr.setStart(node, idx); rr.setEnd(node, idx + wd.length); const top = Math.round(rr.getBoundingClientRect().top); if (top !== lastTop) { lastTop = top; lastWords = []; } lastWords.push(wd); idx += wd.length; }
                return { textWrap: getComputedStyle(e).textWrap, lines: lines.length, lastLine: lastWords.join(" ") };
            });
            if (SHOT) {
                const b = (await page.locator(".demo-header").boundingBox())!;
                await page.screenshot({ path: `${OUT}/morph-lede-${theme}-${w}.png`, clip: { x: 0, y: Math.max(b.y - 8, 0), width: w, height: b.height + 16 } });
                await page.screenshot({ path: `${OUT}/morph-${theme}-${w}.png` });
            }
        });
    }
}
