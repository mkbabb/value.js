// X-DS keyframes pass 7, critic C7 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c7-probe.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4500);
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const go = async (page, route) => {
    await page.goto(`${BASE}#/${route}`, { waitUntil: "load" });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(SETTLE);
};
const ranges = (page) => page.evaluate(() => [...document.querySelectorAll(".slider-range")]
    .filter((e) => e.getBoundingClientRect().height > 0)
    .map((e) => ({ tint: getComputedStyle(e).getPropertyValue("--liquid-fill-tint").trim(), bg: getComputedStyle(e).backgroundColor })));
const easingFit = (page) => page.evaluate(() => {
    const s = document.querySelector(".controls-surface");
    const svg = document.querySelector(".configurator-layer-body svg");
    const pr = document.querySelector(".controls-surface .param-row");
    const sb = s.getBoundingClientRect();
    return { scroll: [s.scrollHeight, s.clientHeight], plot: Math.round(svg.getBoundingClientRect().width), durationRowBottom: Math.round(pr.getBoundingClientRect().bottom), surfaceBottom: Math.round(sb.bottom) };
});

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();

    // KF-C7-01 · KF-C7-06 — cube: the scrub fill and the layer row
    await go(page, "cube");
    r.cube = { ranges: await ranges(page) };
    r.cube.layerRow = await page.evaluate(() => {
        const b = [...document.querySelectorAll("button")].find((x) => x.getAttribute("aria-controls")?.length && x.textContent.trim().startsWith("layer"));
        return b && { text: b.textContent.replace(/\s+/g, " ").trim(), ink: getComputedStyle(b).color, value: b.children[1] && getComputedStyle(b.children[1]).color };
    });
    await page.screenshot({ path: path.join(OUT, `controls-pane-1440-${scheme}.png`), clip: await (async () => { const b = await page.locator(".pane-frame").first().boundingBox(); return { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 16), width: b.width + 32, height: b.height + 32 }; })() });

    // KF-C7-02 · KF-C7-03 · KF-C7-09 — easing route at 1440×900
    await go(page, "easing");
    r.easing = { fit: await easingFit(page), ranges: await ranges(page) };
    r.easing.selectChevrons = await page.evaluate(() => [...document.querySelectorAll('[role="combobox"]')].map((c) => ({ state: c.dataset.state, rotate: [...c.querySelectorAll("svg")].map((s) => getComputedStyle(s).rotate) })));
    r.easing.filter = await page.evaluate(() => { const f = document.querySelector(".catalogue-filter-row"); const b = f.getBoundingClientRect(); const tabs = [...f.querySelectorAll(".segmented-tab")]; return { row: [Math.round(b.x), Math.round(b.width)], scroller: [f.parentElement.scrollWidth, f.parentElement.clientWidth], tabWidths: tabs.map((t) => Math.round(t.getBoundingClientRect().width)), offRight: tabs.filter((t) => t.getBoundingClientRect().right > f.parentElement.getBoundingClientRect().right).map((t) => t.textContent.trim()) }; });
    await page.screenshot({ path: path.join(OUT, `easing-pane-900-${scheme}.png`), clip: { x: 0, y: 0, width: 520, height: 900 } });

    // KF-C7-01 · KF-C7-07 — spring
    await go(page, "spring");
    r.spring = { ranges: await ranges(page) };
    // KF-C7-07 · KF-C7-08 — headers and lane 1
    for (const route of ["spring", "square", "sequence"]) {
        if (route !== "spring") await go(page, route);
        r[route] = Object.assign(r[route] ?? {}, await page.evaluate(() => {
            const h = document.querySelector("[data-scene-stage-header]");
            const rd = [...h.querySelectorAll(".stage-readout")].map((e) => ({ text: e.textContent.replace(/\s+/g, " ").trim(), labelFont: getComputedStyle(e.children[0]).fontFamily.split(",")[0], labelTransform: getComputedStyle(e.children[0]).textTransform, valueColor: getComputedStyle(e.children[1]).color, valueFont: getComputedStyle(e.children[1]).fontFamily.split(",")[0] }));
            return { readouts: rd, headerBorderBottom: getComputedStyle(h).borderBottomWidth + " " + getComputedStyle(h).borderBottomStyle };
        }));
    }
    r.sequence.lane1 = await page.evaluate(() => {
        const row = document.querySelector(".seq-row");
        const name = row.querySelector(".seq-row-name").getBoundingClientRect();
        const ball = row.querySelector(".seq-ball").getBoundingClientRect();
        return { ordinalRight: Math.round(name.right), ballLeft: Math.round(ball.left), gap: Math.round(ball.left - name.right) };
    });
    const hb = await page.locator("[data-scene-stage-header]").first().boundingBox();
    await page.screenshot({ path: path.join(OUT, `seqhdr-${scheme}.png`), clip: { x: hb.x - 8, y: hb.y - 8, width: hb.width + 16, height: 260 } });
    await ctx.close();
}

// KF-C7-02 — the short cell (the KF-C3-06 floor)
{
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 760 } });
    const page = await ctx.newPage();
    await go(page, "easing");
    report.easing1280x760 = await easingFit(page);
    await ctx.close();
}

// KF-C7-12 — the Keyframes facet code well
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await go(page, "cube");
    await page.locator('[aria-label="Expand dock"]').first().hover().catch(() => {});
    await page.waitForTimeout(900);
    await page.locator('button[aria-label="Keyframes"]').first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.mouse.move(1300, 850);
    await page.waitForTimeout(600);
    report[scheme].keyframesWell = await page.evaluate(() => [...document.querySelectorAll(".monaco-scrollable-element > .scrollbar.horizontal")].map((e) => ({ cls: e.className, h: e.getBoundingClientRect().height, slider: e.querySelector(".slider")?.getBoundingClientRect().width ?? 0 })));
    await page.screenshot({ path: path.join(OUT, `f-keyframes-1440-${scheme}.png`) });
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, "c7-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
