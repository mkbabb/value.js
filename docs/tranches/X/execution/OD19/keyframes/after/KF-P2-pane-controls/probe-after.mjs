// KF-P2-pane-controls AFTER probe (OD19-K3, OD19-K4): 1440/390 x light/dark,
// one browser, a context per cell, closed in finally.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:5173";
const results = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true });
try {
    for (const theme of ["light", "dark"]) {
        for (const width of [1440, 390]) {
            const tag = `${theme}-${width}`;
            const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2 });
            const R = (results[tag] = {});
            try {
                const page = await ctx.newPage();
                await page.goto(BASE + "/#/cube", { waitUntil: "load" });
                await sleep(3000);
                // K3
                const dir = page.getByText("direction", { exact: true }).first();
                await dir.scrollIntoViewIfNeeded().catch(() => {});
                await sleep(300);
                R.K3 = await page.evaluate(() => {
                    const triggers = [...document.querySelectorAll("button[role=combobox]")].filter((b) => /alternate|normal|reverse|forwards|backwards|both|none/.test(b.textContent ?? ""));
                    const l = [...document.querySelectorAll("label")].find((x) => x.textContent.trim() === "easing");
                    const e = l && document.querySelector(`[aria-labelledby^="${l.id} "]`);
                    const box = (s) => { const r = s.getBoundingClientRect(); return { x: +r.x.toFixed(1), right: +r.right.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), rotate: getComputedStyle(s).rotate }; };
                    return {
                        triggers: triggers.map((t) => ({ text: t.textContent.trim(), svgs: t.querySelectorAll("svg").length, glyph: box(t.querySelector("svg.option-glyph")), chevron: box([...t.querySelectorAll("svg")].at(-1)) })),
                        easing: e && { glyph: box(e.querySelector("svg.curve-glyph")), chevron: box(e.querySelector("svg.lucide-chevron-down")) },
                    };
                });
                const bb = await dir.boundingBox();
                if (bb) await page.screenshot({ path: path.join(OUT, `K3-direction-fill-${tag}.png`), clip: { x: Math.max(0, bb.x - 16), y: Math.max(0, bb.y - 16), width: Math.min(width - Math.max(0, bb.x - 16), 520), height: 170 } });
                // K3 open list
                const trig = page.locator("button[role=combobox]").filter({ hasText: /alternate|normal|reverse/ }).first();
                await trig.click();
                await sleep(500);
                R.K3.items = await page.$$eval("[role=option]", (os) => os.map((o) => ({ text: o.textContent.trim(), svgs: o.querySelectorAll("svg.option-glyph").length })));
                const lb = await page.locator("[role=listbox]").first().boundingBox();
                if (lb) await page.screenshot({ path: path.join(OUT, `K3-direction-open-${tag}.png`), clip: { x: Math.max(0, lb.x - 12), y: Math.max(0, lb.y - 60), width: Math.min(width - Math.max(0, lb.x - 12), lb.width + 24), height: lb.height + 72 } });
                await page.keyboard.press("Escape");
                await sleep(300);
                // K4
                const rev = page.getByRole("button", { name: "Reverse", exact: true }).first();
                const eye = page.getByRole("button", { name: "Ball preview", exact: true }).first();
                R.K4 = { reverse: await rev.count(), eye: await eye.count() };
                await rev.scrollIntoViewIfNeeded().catch(() => {});
                await sleep(300);
                const geo = () => page.evaluate(() => {
                    const row = document.querySelector(".visualizer-row");
                    const ribbon = row?.parentElement;
                    const r = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
                    const btns = [...row.querySelectorAll("button")];
                    return { ribbonChildren: [...ribbon.children].map((c) => c.className.split(" ")[0]), row: r(row), discs: btns.map((b) => ({ name: b.getAttribute("aria-label") ?? b.textContent.trim(), pressed: b.getAttribute("aria-pressed"), ...r(b), svgCls: b.querySelector("svg")?.getAttribute("class") })), ball: r(row.querySelector(".progress-ball")), stageState: row.querySelector(".preview-toggle")?.dataset.state };
                });
                R.K4.before = await geo();
                const rb = await rev.boundingBox();
                const shot = async (name) => rb && page.screenshot({ path: path.join(OUT, `${name}-${tag}.png`), clip: { x: Math.max(0, rb.x - 24), y: Math.max(0, rb.y - 90), width: Math.min(width - Math.max(0, rb.x - 24), 560), height: 170 } });
                await shot("K4-track");
                await rev.click();
                await sleep(500);
                R.K4.afterReverse = (await geo()).discs[0];
                await shot("K4-track-reversed");
                await rev.click();
                await sleep(300);
                R.K4.reverseBack = (await geo()).discs[0];
                if (R.K4.eye) {
                    await eye.click();
                    await sleep(700);
                    const g = await geo();
                    R.K4.afterEye = { eye: g.discs[1], stageState: g.stageState, row: g.row };
                    await shot("K4-track-preview-hidden");
                    await eye.click();
                    await sleep(700);
                    const g2 = await geo();
                    R.K4.eyeBack = { eye: g2.discs[1], stageState: g2.stageState, row: g2.row };
                }
            } catch (e) {
                R.error = String(e).slice(0, 300);
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "probe-after.json"), JSON.stringify(results, null, 1));
console.log(JSON.stringify(results));
