// X-DS fourier pass 14 — cells for the F16 cure. Temporary copy at web/e2e/_ds-f16-cure.spec.ts
// (deleted after); project chromium = headless (§0ei); BASE_URL serves the cured checkout.
import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = process.env.DS_OUT ?? "/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-14";
const TAG = process.env.DS_TAG ?? "after";
const res: Record<string, unknown> = {};
test.describe.configure({ mode: "serial" });
test.use({ deviceScaleFactor: 2 });
test.setTimeout(120_000);
test.afterAll(() => writeFileSync(`${OUT}/f16-cure-probe-${TAG}.json`, JSON.stringify(res, null, 1)));

async function themed(page: Page, theme: string) {
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
}
const type = (sel: string) => (root: Element) => [...root.querySelectorAll<HTMLElement>(sel)].filter((e) => e.getClientRects().length).map((e) => {
    const cs = getComputedStyle(e);
    return { text: e.textContent!.trim().slice(0, 32), size: cs.fontSize, weight: cs.fontWeight, family: cs.fontFamily.split(",")[0] };
});
const actions = (root: Element) => [...root.querySelectorAll<HTMLElement>("button")].filter((b) => b.getClientRects().length).map((b) => {
    const r = b.getBoundingClientRect();
    return { label: b.textContent!.trim(), size: b.getAttribute("data-size"), emphasis: b.getAttribute("data-emphasis"), cx: +(r.x + r.width / 2).toFixed(1), y: +r.y.toFixed(1), h: +r.height.toFixed(1) };
});

for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) test.describe(`${theme} ${w}`, () => {
        test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 }); await themed(page, theme); });
        test(`morph ${theme} ${w}`, async ({ page }) => {
            await page.goto("/morph");
            await expect(page.locator(".demo-title")).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(1500);
            res[`morph-${theme}-${w}`] = await page.locator("main").first().evaluate((m, s) => {
                const t = (sel: string) => [...m.querySelectorAll<HTMLElement>(sel)].filter((e) => e.getClientRects().length).map((e) => { const cs = getComputedStyle(e); return { text: e.textContent!.trim(), size: cs.fontSize, weight: cs.fontWeight }; });
                return { title: t(".demo-title"), cards: t("[data-card-title]") };
            }, null);
            await page.screenshot({ path: `${OUT}/morph-${theme}-${w}.png` });
        });
        for (const [name, path] of [["v-error", "/v/no-such-slug"], ["w-error", "/w/no-such-image-slug"], ["w-empty", "/visualize"]]) {
            test(`${name} ${theme} ${w}`, async ({ page }) => {
                await page.goto(path);
                const msg = page.locator(name === "w-empty" ? ".drop-zone" : ".configurator-stage [data-testid=not-found]");
                await expect(msg).toBeVisible({ timeout: 60_000 });
                await page.waitForTimeout(1200);
                res[`${name}-${theme}-${w}`] = await msg.evaluate((m) => {
                    const h = m.querySelector("h1")!; const cs = getComputedStyle(h);
                    const bs = [...m.querySelectorAll<HTMLElement>("button")].filter((b) => b.getClientRects().length).map((b) => {
                        const r = b.getBoundingClientRect();
                        return { label: b.textContent!.trim(), size: b.getAttribute("data-size"), emphasis: b.getAttribute("data-emphasis"), cx: +(r.x + r.width / 2).toFixed(1), y: +r.y.toFixed(1), h: +r.height.toFixed(1) };
                    });
                    return { h1: { text: h.textContent!.trim(), size: cs.fontSize, weight: cs.fontWeight, family: cs.fontFamily.split(",")[0] }, buttons: bs };
                });
                await page.screenshot({ path: `${OUT}/${name}-${theme}-${w}.png` });
            });
        }
        test(`equation ${theme} ${w}`, async ({ page }) => {
            await page.goto("/equation");
            const compute = page.getByRole("button", { name: "Compute" });
            await expect(compute).toBeEnabled({ timeout: 60_000 });
            await compute.click();
            const tog = page.locator(".eq-toggle").first();
            // At 390 the stage sits behind the aside's tab, so the toggle is read attached.
            if (w === 390) await expect(tog).toBeAttached({ timeout: 60_000 });
            else await expect(tog).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(1500);
            res[`equation-${theme}-${w}`] = await tog.evaluate((t) => [...t.querySelectorAll<HTMLElement>(".eq-toggle-icon, .eq-toggle-icon i")].map((e) => {
                const cs = getComputedStyle(e);
                return { text: e.textContent!.trim(), tag: e.tagName, family: cs.fontFamily.split(",")[0], style: cs.fontStyle, size: cs.fontSize, tracking: cs.letterSpacing };
            }));
            await page.screenshot({ path: `${OUT}/equation-${theme}-${w}.png` });
            if (w !== 390) await tog.screenshot({ path: `${OUT}/eq-toggle-${theme}-${w}.png` });
        });
    });
}
