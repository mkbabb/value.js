// X-DS fourier pass 13 — cells for the F15 cure. Temporary copy at web/e2e/_ds-f15-cure.spec.ts
// (deleted after); project chromium = headless (§0ei); BASE_URL serves the cured checkout.
import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = process.env.DS_OUT ?? "/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-13";
const TAG = process.env.DS_TAG ?? "after";
const res: Record<string, unknown> = {};
test.describe.configure({ mode: "serial" });
test.use({ deviceScaleFactor: 2 });
test.setTimeout(120_000);
test.afterAll(() => writeFileSync(`${OUT}/f15-cure-probe-${TAG}.json`, JSON.stringify(res, null, 1)));

async function themed(page: Page, theme: string) {
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
}

for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) {
        for (const [name, path] of [["v-error", "/v/no-such-slug"], ["w-error", "/w/no-such-image-slug"]]) {
            test(`${name} ${theme} ${w}`, async ({ page }) => {
                await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
                await themed(page, theme);
                await page.goto(path);
                const msg = page.locator(".configurator-stage").getByTestId("not-found");
                await expect(msg).toBeVisible({ timeout: 60_000 });
                await page.waitForTimeout(1200);
                res[`${name}-${theme}-${w}`] = await msg.evaluate((m) => {
                    const ledes = [...m.querySelectorAll("p")];
                    const lede = ledes[0];
                    const slug = lede.querySelector("span");
                    const lh = parseFloat(getComputedStyle(lede).lineHeight);
                    const btns = [...m.querySelectorAll("button")];
                    return {
                        paragraphs: ledes.map((p) => ({ text: p.textContent!.trim(), font: getComputedStyle(p).fontFamily.split(",")[0] })),
                        ledeLines: Math.round(lede.getBoundingClientRect().height / lh),
                        slugRects: slug ? slug.getClientRects().length : null,
                        buttons: btns.map((b) => {
                            const r = b.getBoundingClientRect(); const cs = getComputedStyle(b);
                            return { label: b.textContent!.trim(), emphasis: b.getAttribute("data-emphasis"), x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), shadowLayers: cs.boxShadow === "none" ? 0 : cs.boxShadow.split(/,(?![^(]*\))/).length, bg: cs.backgroundColor };
                        }),
                    };
                });
                await page.screenshot({ path: `${OUT}/${name}-${theme}-${w}.png` });
            });
        }
        test(`morph ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await page.goto("/morph");
            const info = page.locator(".demo-info");
            await expect(info).toBeVisible({ timeout: 60_000 });
            await page.waitForTimeout(1500);
            const read = () => info.evaluate((d) => [...d.querySelectorAll(".metric")].map((m) => {
                const v = m.querySelector(".metric__value") as HTMLElement;
                return { label: m.querySelector(".metric__label")?.textContent?.trim(), value: v.textContent!.trim(), empty: m.hasAttribute("data-empty"), color: getComputedStyle(v).color, x: +m.getBoundingClientRect().x.toFixed(1) };
            }));
            const before = await read();
            await page.getByRole("button", { name: "Morph between the sun and moon shapes" }).click();
            const xs: number[][] = [];
            for (let i = 0; i < 40; i++) { xs.push((await read()).map((r) => r.x)); await page.waitForTimeout(100); }
            const moved = xs.some((s) => s.some((x, j) => Math.abs(x - before[j].x) > 0.5));
            res[`morph-${theme}-${w}`] = { before, after: await read(), moved };
            await page.screenshot({ path: `${OUT}/morph-${theme}-${w}.png` });
        });
        test(`dock-handle ${theme} ${w}`, async ({ page }) => {
            await page.setViewportSize({ width: w, height: w === 390 ? 844 : 900 });
            await themed(page, theme);
            await page.goto("/morph");
            await page.waitForTimeout(1500);
            res[`dock-handle-${theme}-${w}`] = await page.evaluate(() => {
                const p = [...document.querySelectorAll("p")].find((e) => e.textContent?.trim() === "@mbabb");
                return p ? { font: getComputedStyle(p).fontFamily.split(",")[0], inDom: true } : { inDom: false };
            });
        });
    }
}
