// X-DS fourier pass 12 — cells for the F14 cure. Temporary copy at web/e2e/_ds-f14-cure.spec.ts
// (deleted after); project chromium = headless (§0ei); BASE_URL serves the cured checkout.
import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = process.env.DS_OUT ?? "/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-12";
const TAG = process.env.DS_TAG ?? "after";
const res: Record<string, unknown> = {};
test.describe.configure({ mode: "serial" });
test.use({ deviceScaleFactor: 2 });
test.setTimeout(120_000);
test.afterAll(() => writeFileSync(`${OUT}/f14-cure-probe-${TAG}.json`, JSON.stringify(res, null, 1)));

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
                    const stage = m.closest(".configurator-stage")!.getBoundingClientRect();
                    const h = m.querySelector("h1")!;
                    const btns = [...m.querySelectorAll("button")].map((b) => b.getBoundingClientRect());
                    const nested = m.querySelector("[data-slot=card]");
                    const cs = getComputedStyle(m);
                    return {
                        stageW: +stage.width.toFixed(1), msgW: +m.getBoundingClientRect().width.toFixed(1),
                        nestedCard: !!nested, msgShadow: cs.boxShadow, msgBorder: cs.borderTopWidth,
                        h1Size: getComputedStyle(h).fontSize, h1Lines: Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight)),
                        buttons: btns.map((b) => ({ x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1) })),
                        actionsCentre: btns.length ? +(((Math.min(...btns.map((b) => b.left)) + Math.max(...btns.map((b) => b.right))) / 2) - (stage.left + stage.width / 2)).toFixed(1) : null,
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
            const xs = () => info.evaluate((d) => [...d.children].map((c) => +c.getBoundingClientRect().x.toFixed(1)));
            const before = await xs();
            const shapeBefore = (await info.innerText()).replace(/\s+/g, " ");
            await page.getByRole("button", { name: "Morph between the sun and moon shapes" }).click();
            const seen: number[][] = [];
            for (let i = 0; i < 40; i++) { seen.push(await xs()); await page.waitForTimeout(100); }
            const after = await xs();
            const moved = seen.some((s) => s.some((x, j) => Math.abs(x - before[j]) > 0.5));
            const strip = page.locator(".grid").first();
            const mask = await strip.evaluate((g) => ({ mask: getComputedStyle(g).maskImage, moreEnd: g.hasAttribute("data-more-end") }));
            res[`morph-${theme}-${w}`] = { before, after, moved, shapeBefore, shapeAfter: (await info.innerText()).replace(/\s+/g, " "), mask };
            await page.screenshot({ path: `${OUT}/morph-${theme}-${w}.png` });
            await strip.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
            const sb = (await strip.boundingBox())!;
            await page.screenshot({ path: `${OUT}/strip-end-${theme}-${w}.png`, clip: { x: sb.x + sb.width - 120, y: sb.y, width: 120, height: sb.height } });
        });
    }
}
