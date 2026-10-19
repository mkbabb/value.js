// X-DS keyframes pass 3, critic C3 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c3-probe.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 5000);
const KEY = "animation-groups-control-options-store";
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const R = (b) => b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];
const shot = async (page, name, clipSel, pad = 16) => {
    const file = path.join(OUT, `${name}.png`);
    if (clipSel) {
        const b = await page.locator(clipSel).first().boundingBox();
        if (b) { await page.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); return; }
    }
    await page.screenshot({ path: file });
};
const setSurface = (page, scene, control, expanded) => page.evaluate(([k, scene, control, expanded]) => {
    const s = JSON.parse(localStorage.getItem(k) ?? "{}");
    s[scene] = { ...(s[scene] ?? {}), selectedControl: control, isTimelineExpanded: expanded };
    localStorage.setItem(k, JSON.stringify(s));
}, [KEY, scene, control, expanded]);

try {
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        const logs = [];
        page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") logs.push(m.text().slice(0, 200)); });
        // KF-C3-15 — a fresh visit (empty storage) warns nothing.
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`fresh-visit-warnings-${scheme}`] = logs.filter((l) => l.includes("isControlsPanelOpen")).length;

        // KF-C3-07 — the layer sub-pane (glass-owned; re-captured unchanged).
        await page.locator(".pane-frame button", { hasText: /^layer$/ }).first().click();
        await page.waitForTimeout(1200);
        await shot(page, `cube-layer-1440-${scheme}`, ".pane-frame");

        // KF-C3-08 / -12 — the Timeline docked, empty.
        await setSurface(page, "cube", "timeline", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`timeline-empty-${scheme}`] = await page.evaluate(() => {
            const c = document.querySelector('[aria-label="Clear all keyframes"]');
            const cap = [...document.querySelectorAll(".pane-frame p")].find((p) => p.textContent.includes("No keyframes"));
            return { clearDisabled: c?.disabled ?? null, clearInk: c && getComputedStyle(c).color, captionAlign: cap && getComputedStyle(cap).textAlign, captionWrap: cap && getComputedStyle(cap).textWrapStyle };
        });
        await shot(page, `timeline-docked-1440-${scheme}`);

        // KF-C3-01 — two Snapshots build.
        const snap = async () => { await page.locator(".pane-frame button", { hasText: "Snapshot" }).first().click(); await page.waitForTimeout(1800); };
        await snap();
        await snap();
        report[`timeline-2kf-${scheme}`] = await page.evaluate(() => ({
            buildError: !!document.querySelector(".pane-frame [role=alert], .pane-frame .alert"),
            text: document.querySelector(".pane-frame").innerText.includes("could not be built"),
        }));
        report[`timeline-2kf-errors-${scheme}`] = logs.filter((l) => l.includes("Invalid CSS value")).length;
        await shot(page, `timeline-2kf-docked-1440-${scheme}`);

        // KF-C3-09 — Unfold (was "Expand").
        await page.locator('button[aria-label="Unfold timeline"]').first().click();
        await page.waitForTimeout(1500);
        report[`timeline-unfolded-${scheme}`] = R(await page.locator("#timeline-expanded-target .cartoon-surface").first().boundingBox());
        await shot(page, `timeline-expanded-1440-${scheme}`);
        await page.locator('button[aria-label="Fold timeline into the pane"]').first().click();
        await page.waitForTimeout(800);
        await setSurface(page, "cube", "controls", false);

        // KF-C3-13 — the top dock's cube tile.
        await shot(page, `cube-mini-1440-${scheme}`, ".glass-dock", 8);

        // KF-C3-04 / -05 / -06 / -11 — spring.
        await page.goto(`${BASE}#/spring`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`spring-${scheme}`] = await page.evaluate(() => {
            const r = (e) => { const b = e?.getBoundingClientRect(); return b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
            const ro = getComputedStyle(document.querySelector(".spring-readout-primary"));
            const tl = getComputedStyle(document.querySelector(".spring-target-line"));
            return { readout: [ro.fontFamily, ro.fontSize, ro.fontWeight], track: r(document.querySelector(".spring-track")), plot: r(document.querySelector(".plot-frame")), scaleTick: `${tl.borderRightStyle} ${tl.borderRightWidth}`, legend: r(document.querySelector(".spring-heatmap-section [data-figure-legend]")), yTitle: r(document.querySelector(".spring-heatmap-y-title")) };
        });
        await shot(page, `spring-pane-1440-${scheme}`, ".pane-frame");
        await shot(page, `spring-rail-1440-${scheme}`, ".spring-figure");
        await shot(page, `spring-heatmap-1440-${scheme}`, ".spring-heatmap-section", 8);

        // KF-C3-03 — the specimen tiles.
        await page.goto(`${BASE}#/easing`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`easing-tile-stage-${scheme}`] = await page.evaluate(() => { const b = document.querySelector(".tile-stage").getBoundingClientRect(); return [Math.round(b.width), Math.round(b.height)]; });
        await shot(page, `easing-tiles-1440-${scheme}`, ".specimen-drawer", 4);

        // KF-C3-02 — every plate against the transport.
        const plates = {};
        for (const r of ["square", "easing", "spring", "sequence"]) {
            await page.goto(`${BASE}#/${r}`, { waitUntil: "load" });
            await page.waitForTimeout(3000);
            plates[r] = await page.evaluate(() => {
                const plate = document.querySelector(".square-stage, .easing-target, .spring-target, .seq-target")?.getBoundingClientRect();
                const docks = [...document.querySelectorAll(".glass-dock")].map((d) => d.getBoundingClientRect());
                const band = document.querySelector('[data-dock-tether="bottom"]')?.getBoundingClientRect();
                return { plateBottom: Math.round(plate.bottom), transportBandTop: band && Math.round(band.top), pillTop: Math.round(docks[docks.length - 1].top) };
            });
        }
        report[`plates-1440-${scheme}`] = plates;
        await ctx.close();
    }
    // KF-C3-10 / -16 at 390.
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const plates = {};
    for (const r of ["square", "easing", "spring"]) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        plates[r] = await page.evaluate(() => {
            const plate = document.querySelector(".square-stage, .easing-target, .spring-target")?.getBoundingClientRect();
            const sheet = document.querySelector("[data-slot=sheet-content]")?.getBoundingClientRect();
            return { plateBottom: Math.round(plate.bottom), sheetTop: sheet && Math.round(sheet.top) };
        });
        if (r === "easing") {
            plates.literalLines = await page.evaluate(() => { const rg = document.createRange(); rg.selectNodeContents(document.querySelector(".literal-text")); return [...rg.getClientRects()].map((x) => Math.round(x.width)); });
            await shot(page, "easing-literal-390-light", ".specimen-literal", 8);
        }
    }
    report["plates-390-light"] = plates;
    await ctx.close();
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "c3-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
