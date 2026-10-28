// OD19 keyframes BEFORE probe 2 — K5 header hover geometry, K7 status dot, K8 scene-swap
// frame strip + dock rAF geometry trace, dock expand trace. One headless browser,
// one context per cell, closed in finally.
// Usage: node probe-before-2.mjs <outDir> [base]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:5173";
fs.mkdirSync(OUT, { recursive: true });
const results = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const startTrace = (page, ms) =>
    page.evaluate((ms) => {
        window.__trace = [];
        const t0 = performance.now();
        const tick = () => {
            const now = performance.now();
            const d = document.querySelector('[data-dock-tether="top"] .glass-dock');
            const r = d?.getBoundingClientRect();
            window.__trace.push([Math.round(now - t0), r && +r.x.toFixed(1), r && +r.width.toFixed(1), r && +r.height.toFixed(1), document.documentElement.matches(":active-view-transition") ? 1 : 0]);
            if (now - t0 < ms) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, ms);
const readTrace = (page) =>
    page.evaluate(() => {
        const t = window.__trace;
        const dts = t.slice(1).map((r, i) => r[0] - t[i][0]);
        return { frames: t.length, maxDt: Math.max(...dts), over34: dts.filter((d) => d > 34).length, vtFrames: t.filter((r) => r[4]).length, rows: t.filter((_, i) => i % 3 === 0).slice(0, 60) };
    });

async function cell(browser, theme, width, fn) {
    const height = width === 390 ? 844 : 900;
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: theme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const tag = `${theme}-${width}`;
    results[tag] = {};
    try {
        await fn(page, results[tag], tag, height);
    } catch (e) {
        results[tag].error = String(e).slice(0, 300);
    } finally {
        await ctx.close();
    }
}

const browser = await chromium.launch({ headless: true });
try {
    for (const theme of ["dark", "light"]) {
        for (const width of [1440, 1512, 390]) {
            await cell(browser, theme, width, async (page, R, tag, height) => {
                await page.goto(BASE + "/#/cube", { waitUntil: "load" });
                await sleep(2500);

                // ── K5: the pane card's title trigger, hovered
                const trig = page.locator("[data-slot=configurator-layer-trigger]").first();
                if (await trig.count()) {
                    await trig.hover();
                    await sleep(400);
                    R.K5 = await page.evaluate(() => {
                        const t = document.querySelector("[data-slot=configurator-layer-trigger]");
                        const out = [];
                        for (let e = t, i = 0; e && i < 7; e = e.parentElement, i++) {
                            const cs = getComputedStyle(e);
                            const r = e.getBoundingClientRect();
                            out.push({ tag: e.tagName, cls: String(e.className).slice(0, 70), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), bg: cs.backgroundColor, radius: cs.borderRadius, overflow: cs.overflow });
                        }
                        return out;
                    });
                    const bb = await trig.boundingBox();
                    await page.screenshot({ path: path.join(OUT, `K5-title-hover-${tag}.png`), clip: { x: Math.max(0, bb.x - 20), y: Math.max(0, bb.y - 20), width: Math.min(width - Math.max(0, bb.x - 20), bb.width + 40), height: bb.height + 40 } });
                }

                // ── dock expand trace (OD19-ALL motion; V2/F2 glass family)
                await page.mouse.move(width - 4, height / 2);
                await sleep(4200); // let the dock idle-collapse
                await startTrace(page, 1200);
                await page.hover('[data-dock-tether="top"] .glass-dock');
                await sleep(1300);
                R.expandTrace = await readTrace(page);

                // ── K8: scene swap cube -> spring, frame strip + trace
                await page.locator('[data-dock-tether="top"] [aria-label="Scene"]').first().click({ timeout: 4000 }).catch(() => {});
                await sleep(500);
                await startTrace(page, 1600);
                await page.getByRole("option", { name: /Spring/ }).first().click({ timeout: 4000 }).catch(() => {});
                const strip = [];
                const t0 = Date.now();
                for (let i = 0; i < 8; i++) {
                    const p = path.join(OUT, `K8-swap-strip-${tag}-${String(i).padStart(2, "0")}.png`);
                    await page.screenshot({ path: p, clip: { x: 0, y: 0, width, height: 130 } });
                    strip.push(Date.now() - t0);
                }
                await sleep(1200);
                R.swapTrace = await readTrace(page);
                R.stripMs = strip;
                await page.hover('[data-dock-tether="top"] .glass-dock').catch(() => {});
                await sleep(1000);
                await page.screenshot({ path: path.join(OUT, `K8-spring-settled-${tag}.png`), clip: { x: 0, y: 0, width, height: 130 } });

                // ── K7: status dot geometry on the keyframes surface
                const kf = page.locator('[data-dock-surface-item][data-surface="keyframes"]').first();
                if (await kf.count()) await kf.click({ timeout: 3000 }).catch(() => {});
                await page.mouse.move(width - 4, height / 2);
                await page.waitForSelector(".monaco-editor .view-line", { timeout: 15000 }).catch(() => {});
                await sleep(800);
                R.K7 = await page.evaluate(() => {
                    const st = [...document.querySelectorAll("[role=status]")].find((s) => /Parsed|Applied|Parse error/.test(s.textContent ?? ""));
                    if (!st) return null;
                    const dot = st.firstElementChild;
                    const r = dot?.getBoundingClientRect();
                    return { text: st.textContent.trim(), dot: r && [Math.round(r.width), Math.round(r.height)], dotCls: String(dot?.className).slice(0, 80) };
                });
            });
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "probe-before-2.json"), JSON.stringify(results, null, 1));
console.log("ok");
