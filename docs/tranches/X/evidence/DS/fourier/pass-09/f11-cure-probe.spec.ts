// X-DS fourier pass 9 — AFTER cells for the F11 cure. Run from a temporary copy at
// web/e2e/_ds-f11-cure.spec.ts (deleted after), project chromium = headless (§0ei),
// BASE_URL=http://localhost:3100 (serves the cured checkout).
// OUT = the value.js evidence dir pass-09/.
import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { ADMIN_TOKEN, ENTRY, stubAdminApi } from "./fixtures/gallery";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-09";
const res: Record<string, unknown> = {};
test.describe.configure({ mode: "serial" });
test.afterAll(() => writeFileSync(`${OUT}/f11-cure-probe.json`, JSON.stringify(res, null, 1)));

async function themed(page: Page, theme: string) {
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
}
const btnInfo = (page: Page) => page.evaluate(() => [...document.querySelectorAll("button.button")]
    .filter((b) => (b as HTMLElement).offsetParent)
    .map((b) => { const cs = getComputedStyle(b); return { lab: (b.getAttribute("aria-label") || b.textContent!.trim()).slice(0, 40), emphasis: (b as HTMLElement).dataset.emphasis, tone: (b as HTMLElement).dataset.tone, bg: cs.backgroundColor, shadow: cs.boxShadow.slice(0, 120), ink: cs.color }; })
    .filter((x) => /About this|Copy LaTeX|convergence sweep|Compute/.test(x.lab)));

for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) {
        test(`equation ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await page.goto("/equation", { waitUntil: "networkidle" });
            await page.waitForTimeout(5000);
            await page.screenshot({ path: `${OUT}/equation-${theme}-${w}.png` });
            if (w === 1440) {
                await page.screenshot({ path: `${OUT}/eq-top-${theme}-1440.png`, clip: { x: 860, y: 90, width: 130, height: 60 } });
                res[`eq-${theme}`] = await btnInfo(page);
                res[`mono-${theme}`] = await page.evaluate(() => [...document.querySelectorAll("*")]
                    .filter((e) => /Fira Code/.test(getComputedStyle(e).fontFamily) && e.children.length === 0 && (e as HTMLElement).offsetParent)
                    .slice(0, 6).map((e) => ({ cls: (e as HTMLElement).className.toString().slice(0, 40), ff: getComputedStyle(e).fontFamily.slice(0, 40) })));
                const play = page.getByRole("button", { name: /convergence sweep/ });
                const bb = await play.boundingBox();
                if (bb) await page.screenshot({ path: `${OUT}/eq-play-${theme}-1440.png`, clip: { x: Math.max(0, bb.x - 20), y: Math.max(0, bb.y - 20), width: 360, height: bb.height + 40 } });
            }
        });
    }
    test(`morph plate hover ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await themed(page, theme);
        await page.goto("/morph", { waitUntil: "networkidle" });
        await page.waitForTimeout(2000);
        const m = page.locator(".morph-button").first();
        const bb = (await m.boundingBox())!;
        const rest = await m.evaluate((e) => ({ t: getComputedStyle(e).transform, w: e.getBoundingClientRect().width, bc: getComputedStyle(e).borderColor }));
        await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
        await page.waitForTimeout(600);
        const hov = await m.evaluate((e) => ({ t: getComputedStyle(e).transform, w: e.getBoundingClientRect().width, bc: getComputedStyle(e).borderColor }));
        await page.screenshot({ path: `${OUT}/morph-platehover-${theme}-1440.png`, clip: { x: 140, y: 170, width: 460, height: 470 } });
        res[`morph-${theme}`] = { rest, hov };
        expect(hov.w).toBeCloseTo(rest.w, 0);
    });
    test(`gallery admin card ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await themed(page, theme);
        await stubAdminApi(page, [ENTRY, { ...ENTRY, slug: "quiet-heron-lattice-three", image_slug: "img-quiet-heron", title: "Quiet heron lattice", tier: "saved" }]);
        await page.goto(`/gallery?admin=${ADMIN_TOKEN}`);
        await expect(page.getByRole("region", { name: "Admin mode banner" })).toBeVisible({ timeout: 60_000 });
        await page.waitForTimeout(2000);
        const card = page.locator("article.gallery-card").first();
        await card.screenshot({ path: `${OUT}/gallery-admin-card-${theme}-1440.png` });
        await page.screenshot({ path: `${OUT}/gallery-admin-${theme}-1440.png` });
        res[`gallery-delete-${theme}`] = await card.getByRole("button", { name: /^Delete/ }).first().evaluate((b) => {
            const cs = getComputedStyle(b); return { emphasis: (b as HTMLElement).dataset.emphasis, tone: (b as HTMLElement).dataset.tone, cls: b.className.slice(0, 120), bg: cs.backgroundColor, ink: cs.color, shadow: cs.boxShadow.slice(0, 120) };
        });
    });
}
