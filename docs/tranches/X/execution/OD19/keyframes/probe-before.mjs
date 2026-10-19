// OD19 keyframes BEFORE probe — headless chromium, one browser, one context per cell.
// Usage: node probe-before.mjs <outDir> [base]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:5173";
fs.mkdirSync(OUT, { recursive: true });
const results = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const rect = (page, sel) =>
    page.evaluate((s) => {
        const e = document.querySelector(s);
        if (!e) return null;
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return {
            x: +r.x.toFixed(1), w: +r.width.toFixed(1), y: +r.y.toFixed(1), h: +r.height.toFixed(1),
            cx: +(r.x + r.width / 2).toFixed(1),
            radius: cs.borderRadius, overflowX: cs.overflowX,
            scrollW: e.scrollWidth, clientW: e.clientWidth,
        };
    }, sel);

async function cell(browser, theme, width, fn) {
    const height = width === 390 ? 844 : 900;
    const ctx = await browser.newContext({
        viewport: { width, height }, colorScheme: theme, deviceScaleFactor: 2,
        hasTouch: false,
    });
    const page = await ctx.newPage();
    page.__h = height;
    const key = `${theme}-${width}`;
    results[key] = {};
    try {
        await fn(page, results[key], `${theme}-${width}`);
    } catch (e) {
        results[key].error = String(e).slice(0, 300);
    } finally {
        await ctx.close();
    }
}

const browser = await chromium.launch({ headless: true });
try {
    for (const theme of ["light", "dark"]) {
        for (const width of [1440, 390]) {
            await cell(browser, theme, width, async (page, R, tag) => {
                // ── OD19-ALL: cold load timing per route (fresh context per route would be
                // cleaner; one context, cache cleared via reload-with-new-page is close enough).
                R.load = {};
                for (const route of ["/", "/cube", "/spring", "/easing", "/sequence", "/amiga", "/square"]) {
                    const c2 = await browser.newContext({ viewport: { width, height: page.__h }, colorScheme: theme });
                    const p2 = await c2.newPage();
                    try {
                        const t0 = Date.now();
                        await p2.goto(BASE + "/#" + route, { waitUntil: "load" });
                        const tLoad = Date.now() - t0;
                        await p2.waitForSelector('[data-dock-tether="top"] .glass-dock', { timeout: 30000 });
                        const ready = await p2.waitForFunction(() => !document.querySelector(".scene-skeleton"), null, { timeout: 30000 }).then(() => Date.now() - t0).catch(() => -1);
                        const nav = await p2.evaluate(() => {
                            const n = performance.getEntriesByType("navigation")[0];
                            const fcp = performance.getEntriesByName("first-contentful-paint")[0];
                            const res = performance.getEntriesByType("resource");
                            return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), fcp: fcp ? Math.round(fcp.startTime) : null, nRes: res.length, xferKB: Math.round(res.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024) };
                        });
                        R.load[route] = { wallLoad: tLoad, sceneReadyWall: ready, ...nav };
                    } finally { await c2.close(); }
                }
                // ── K1: hero pause control
                await page.goto(BASE + "/", { waitUntil: "load" });
                await sleep(1500);
                R.K1 = await page.evaluate(() => {
                    const b = document.querySelector('button[aria-label="Pause the title animation"]');
                    if (!b) return { present: false };
                    const r = b.getBoundingClientRect();
                    return { present: true, x: r.x, y: r.y, w: r.width, h: r.height };
                });
                if (R.K1.present) {
                    const h1 = page.locator("h1.hero-display").first();
                    await page.screenshot({ path: path.join(OUT, `K1-hero-${tag}.png`), clip: await clipAround(page, ".hero-band", 0) });
                }

                // ── K2 / K8 / K6: docks on a scene route with pane open
                await page.goto(BASE + "/#/cube", { waitUntil: "load" });
                await sleep(2500);
                R.viewportCx = width / 2;
                R.K2 = {
                    topBand: await rect(page, '[data-dock-tether="top"]'),
                    topDock: await rect(page, '[data-dock-tether="top"] .glass-dock'),
                    bottomBand: await rect(page, '[data-dock-tether="bottom"]'),
                    bottomDock: await rect(page, '[data-dock-tether="bottom"] .glass-dock'),
                    insetToken: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--dock-band-inset-start")),
                    pane: await rect(page, ".controls-layout [class*=pane], .controls-pane, [data-controls-pane]"),
                };
                await page.screenshot({ path: path.join(OUT, `K2-cube-full-${tag}.png`) });

                // expand top dock by hover → K6/K8
                await page.hover('[data-dock-tether="top"] .glass-dock');
                await sleep(1200);
                R.K8 = {
                    plate: await rect(page, '[data-dock-tether="top"] .glass-dock'),
                    plateChildren: await page.evaluate(() => {
                        const d = document.querySelector('[data-dock-tether="top"] .glass-dock');
                        const walk = [];
                        d?.querySelectorAll("*").forEach((e) => {
                            const cs = getComputedStyle(e);
                            const r = e.getBoundingClientRect();
                            if ((cs.overflowX === "auto" || cs.overflowX === "scroll" || cs.overflowX === "hidden" || cs.overflowX === "clip") && r.width > 40)
                                walk.push({ cls: (e.className?.baseVal ?? e.className).toString().slice(0, 80), ox: cs.overflowX, radius: cs.borderRadius, x: Math.round(r.x), w: Math.round(r.width), sw: e.scrollWidth, cw: e.clientWidth, sl: e.scrollLeft, mask: cs.maskImage.slice(0, 80) });
                        });
                        return walk;
                    }),
                    surfaceItems: await page.$$eval("[data-dock-surface-item]", (els) => els.map((e) => ({ label: e.getAttribute("aria-label"), surface: e.dataset.surface, disabled: e.hasAttribute("disabled") }))),
                };
                await page.screenshot({ path: path.join(OUT, `K6-K8-topdock-expanded-${tag}.png`), clip: await clipAround(page, '[data-dock-tether="top"] .glass-dock', 24) });
                await page.mouse.move(5, page.__h - 5);
                await sleep(300);

                // open the controls surface
                const ctl = page.locator('[data-dock-surface-item][data-surface="controls"]').first();
                await page.hover('[data-dock-tether="top"] .glass-dock');
                await sleep(800);
                if (await ctl.count()) await ctl.click({ timeout: 3000 }).catch(() => {});
                await page.mouse.move(width - 5, page.__h / 2);
                await sleep(1500);
                R.paneOpen = await page.evaluate(() => !!document.querySelector(".controls-layout--open"));
                R.K2.afterPane = {
                    topDock: await rect(page, '[data-dock-tether="top"] .glass-dock'),
                    bottomDock: await rect(page, '[data-dock-tether="bottom"] .glass-dock'),
                    insetToken: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--dock-band-inset-start")),
                };
                await page.screenshot({ path: path.join(OUT, `K2-cube-paneopen-${tag}.png`) });

                // K3 direction / fill mode
                const dir = page.getByText("direction", { exact: true }).first();
                if (await dir.count()) {
                    await dir.scrollIntoViewIfNeeded().catch(() => {});
                    const bb = await dir.boundingBox();
                    if (bb) await page.screenshot({ path: path.join(OUT, `K3-direction-fill-${tag}.png`), clip: { x: Math.max(0, bb.x - 16), y: Math.max(0, bb.y - 16), width: Math.min(width - Math.max(0, bb.x - 16), 520), height: 120 } });
                    R.K3 = await page.evaluate(() => {
                        const triggers = [...document.querySelectorAll("button[role=combobox]")].filter((b) => /alternate|normal|reverse|forwards|backwards|both|none/.test(b.textContent ?? ""));
                        return triggers.map((t) => ({ text: t.textContent.trim(), svgs: t.querySelectorAll("svg").length }));
                    });
                }
                // K4 Reverse / Preview
                const rev = page.getByRole("button", { name: "Reverse" }).first();
                if (await rev.count()) {
                    await rev.scrollIntoViewIfNeeded().catch(() => {});
                    const bb = await rev.boundingBox();
                    R.K4 = await page.evaluate(() => {
                        const r = [...document.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Reverse");
                        const row = r?.parentElement;
                        const rr = row?.getBoundingClientRect();
                        const track = document.querySelector(".preview-toggle, [class*=visualizer], [class*=ball-track]");
                        const tr = track?.getBoundingClientRect();
                        return { rowH: rr && Math.round(rr.height), rowY: rr && Math.round(rr.y), trackH: tr && Math.round(tr.height), trackY: tr && Math.round(tr.y) };
                    });
                    if (bb) await page.screenshot({ path: path.join(OUT, `K4-reverse-preview-balls-${tag}.png`), clip: { x: Math.max(0, bb.x - 16), y: Math.max(0, bb.y - 90), width: Math.min(width - Math.max(0, bb.x - 16), 560), height: 230 } });
                }
                // K5 card title hover
                const head = await page.evaluate(() => {
                    const h = [...document.querySelectorAll("button, [role=button]")].find((b) => b.getAttribute("aria-expanded") !== null && /Rotations|Spin|Cube/i.test(b.textContent ?? ""));
                    if (!h) return null;
                    h.setAttribute("data-od19-k5", "");
                    const r = h.getBoundingClientRect();
                    return { x: r.x, y: r.y, w: r.width, h: r.height };
                });
                if (head) {
                    await page.hover("[data-od19-k5]");
                    await sleep(500);
                    R.K5 = await page.evaluate(() => {
                        const h = document.querySelector("[data-od19-k5]");
                        const chain = [];
                        for (let e = h, i = 0; e && i < 6; e = e.parentElement, i++) {
                            const cs = getComputedStyle(e);
                            chain.push({ tag: e.tagName, cls: String(e.className).slice(0, 90), bg: cs.backgroundColor, radius: cs.borderRadius, overflow: cs.overflow });
                        }
                        return chain;
                    });
                    await page.screenshot({ path: path.join(OUT, `K5-title-hover-${tag}.png`), clip: { x: Math.max(0, head.x - 24), y: Math.max(0, head.y - 24), width: Math.min(width - Math.max(0, head.x - 24), head.w + 48), height: head.h + 48 } });
                }

                // K7 code editor: open keyframes surface
                await page.mouse.move(width / 2, 30);
                await sleep(900);
                const kf = page.locator('[data-dock-surface-item][data-surface="keyframes"]').first();
                if (await kf.count()) await kf.click({ timeout: 3000 }).catch(() => {});
                await page.mouse.move(width - 5, page.__h / 2);
                await page.waitForSelector(".monaco-editor .view-line", { timeout: 15000 }).catch(() => {});
                await sleep(1200);
                R.K7 = await page.evaluate(() => {
                    const colors = new Map();
                    document.querySelectorAll(".monaco-editor .view-line span span").forEach((s) => {
                        const c = getComputedStyle(s).color;
                        colors.set(c, (colors.get(c) ?? 0) + 1);
                    });
                    const st = document.querySelector('[role=status]');
                    const dot = st?.querySelector("*");
                    const dr = dot?.getBoundingClientRect();
                    return { distinctInks: [...colors.entries()], status: st?.textContent?.trim(), dotPx: dr && [Math.round(dr.width), Math.round(dr.height)] };
                });
                const ed = await page.$(".monaco-editor");
                if (ed) {
                    const bb = await ed.boundingBox();
                    await page.screenshot({ path: path.join(OUT, `K7-editor-${tag}.png`), clip: { x: Math.max(0, bb.x - 24), y: Math.max(0, bb.y - 90), width: Math.min(width - Math.max(0, bb.x - 24), bb.width + 48), height: Math.min(560, bb.height + 100) } });
                }
                // ── OD19-ALL route transition: /cube -> /spring via the dock scene list, rAF trace
                await page.goto(BASE + "/#/cube", { waitUntil: "load" });
                await sleep(2500);
                await page.hover('[data-dock-tether="top"] .glass-dock');
                await sleep(900);
                await page.locator('[data-dock-tether="top"] [aria-label="Scene"]').first().click({ timeout: 4000 }).catch(() => {});
                await sleep(500);
                await page.evaluate(() => {
                    window.__trace = [];
                    const t0 = performance.now();
                    const tick = () => {
                        const now = performance.now();
                        const d = document.querySelector('[data-dock-tether="top"] .glass-dock')?.getBoundingClientRect();
                        const b = document.querySelector('[data-dock-tether="bottom"] .glass-dock')?.getBoundingClientRect();
                        const sk = !!document.querySelector(".scene-skeleton");
                        window.__trace.push([Math.round(now - t0), d && Math.round(d.x), d && Math.round(d.width), b && Math.round(b.x), b && Math.round(b.width), sk ? 1 : 0, location.hash]);
                        if (now - t0 < 2500) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    performance.mark("od19-nav-start");
                });
                await page.getByRole("option", { name: /Spring/ }).first().click({ timeout: 4000 }).catch(() => {});
                await sleep(2700);
                R.routeTrace = await page.evaluate(() => {
                    const t = window.__trace;
                    const dts = t.slice(1).map((r, i) => r[0] - t[i][0]);
                    const long = dts.filter((d) => d > 34).length;
                    const firstSpring = t.find((r) => r[6] === "#/spring");
                    return { frames: t.length, maxDt: Math.max(...dts), framesOver34ms: long, pathChangeAt: firstSpring?.[0], skeletonFrames: t.filter((r) => r[5]).length, topDockXW: [...new Set(t.map((r) => r[1] + ":" + r[2]))].slice(0, 30), sample: t.filter((_, i) => i % 6 === 0).slice(0, 40) };
                });
                await page.screenshot({ path: path.join(OUT, `ALL-after-nav-spring-${tag}.png`) });
            });
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "probe-before.json"), JSON.stringify(results, null, 1));
console.log(JSON.stringify(results).length, "bytes written");

async function clipAround(page, sel, pad) {
    const r = await page.evaluate((s) => {
        const e = document.querySelector(s);
        const b = e.getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height };
    }, sel);
    const vw = page.viewportSize().width;
    const x = Math.max(0, r.x - pad);
    return { x, y: Math.max(0, r.y - pad), width: Math.min(vw - x, r.w + 2 * pad), height: r.h + 2 * pad };
}
