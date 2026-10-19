// X-DS keyframes pass 6, critic C6 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c6-probe.mjs [outDir]
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
const R = (b) => b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();

    // KF-C6-01 · KF-C6-09 · KF-C6-04 — cube
    await go(page, "cube");
    r.cube = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const vis = (e) => e.getBoundingClientRect().width > 0;
        const rev = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Reverse" && vis(b));
        const prev = [...document.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === "Ball preview" && vis(b));
        const labels = [...document.querySelectorAll(".labeled-field-grid label")].filter(vis);
        const fill = labels.find((l) => l.textContent.trim() === "fill mode");
        const left = document.querySelector(".cube-side.left .face-fill");
        const num = left?.querySelector(".face-numeral");
        return {
            labelX: labels.map((l) => Math.round(l.getBoundingClientRect().x)),
            reverseBox: R(rev), reverseWord: R(rev?.querySelector("span")),
            previewBox: R(prev), previewWord: R(prev?.querySelector("span")),
            fillMode: fill && { ligatures: getComputedStyle(fill).fontVariantLigatures, box: R(fill) },
            face4: left && { fill: getComputedStyle(left).backgroundColor, ink: getComputedStyle(num).color },
        };
    });
    await page.screenshot({ path: path.join(OUT, `controls-pane-1440-${scheme}.png`), clip: await (async () => { const b = await page.locator(".pane-frame").first().boundingBox(); return { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 16), width: b.width + 32, height: b.height + 32 }; })() });
    // the left face (4) turned toward the viewer: the cube's own face crop
    const cubeBox = await page.locator(".cube-side.left").first().boundingBox();
    r.cube.face4Box = R(cubeBox);

    // KF-C6-03 — the bezier sub-pane
    await page.locator('[aria-label="Edit easing curve"]:visible').first().click();
    await page.waitForTimeout(1500);
    r.bezier = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const surf = document.querySelector(".controls-surface");
        const body = [...document.querySelectorAll("[data-subpane-body]")].find((e) => e.getBoundingClientRect().height > 0);
        const tabs = body.querySelector(".segmented-tabs");
        const svg = body.querySelector("svg");
        const fade = getComputedStyle(surf).getPropertyValue("--surface-fade-end");
        return { surface: R(surf), scrollRange: surf.scrollHeight - surf.clientHeight, fadeEnd: fade, body: R(body), bodyScrollRange: body.scrollHeight - body.clientHeight, host: R(body.firstElementChild), plot: R(svg), modeRow: R(tabs) };
    });
    await page.screenshot({ path: path.join(OUT, `cube-bezier-1440-${scheme}.png`) });

    // KF-C6-02 — sequence
    await go(page, "sequence");
    r.sequence = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const plate = document.querySelector(".seq-target");
        const rows = [...document.querySelectorAll(".seq-row")];
        const head = document.querySelector(".seq-header");
        const ball = document.querySelector(".seq-ball");
        return { plate: R(plate), header: R(head), firstLane: R(rows[0]), lastLane: R(rows.at(-1)), rowGap: getComputedStyle(document.querySelector(".seq-rows")).rowGap, ball: R(ball) };
    });

    // KF-C6-05 · KF-C6-06 — square
    await go(page, "square");
    r.square = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const h = document.querySelector(".square-telemetry");
        return { title: R(h.querySelector("h2")), badge: R(h.querySelector(".status-badge")), field: R(document.querySelector(".square-field")), legend: R(document.querySelector(".square-legend")) };
    });

    // KF-C6-05 · KF-C6-07 — spring
    await go(page, "spring");
    r.spring = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const h = document.querySelector(".spring-header");
        const frame = document.querySelector(".plot-frame");
        const ticks = [...frame.querySelectorAll(".plot-tick--value")].map((t) => [t.textContent.trim(), Math.round(t.getBoundingClientRect().y + t.getBoundingClientRect().height / 2)]);
        return { title: R(h.querySelector("h2")), badge: R(h.querySelector(".status-badge")), legend: R(document.querySelector("[data-figure-legend]")), frame: R(frame), headroomLine: R(frame.querySelector(".plot-headroom-line")), ticks };
    });
    await ctx.close();

    // 390 cells for the square caption and the header badge
    const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const p2 = await ctx2.newPage();
    await go(p2, "square");
    r.square390 = await p2.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const h = document.querySelector(".square-telemetry");
        return { title: R(h.querySelector("h2")), badge: R(h.querySelector(".status-badge")), field: R(document.querySelector(".square-field")), legend: R(document.querySelector(".square-legend")) };
    });
    await ctx2.close();
}
fs.writeFileSync(path.join(OUT, "c6-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report));
await browser.close();
