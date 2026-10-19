// X-DS keyframes pass 4, critic C4 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c4-probe.mjs [outDir]
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
// The paper's line contrast inside a clip: the spread of per-column mean luma.
const lineContrast = (page, clip) => page.evaluate(async (clip) => clip, clip);
const R = `(e) => { const b = e?.getBoundingClientRect(); return b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; }`;

try {
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        const logs = [];
        page.on("console", (m) => { if (m.type() === "error") logs.push(m.text().slice(0, 200)); });
        await page.goto(`${BASE}#/square`, { waitUntil: "load" });
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);

        // KF-C4-03 — the plate now samples the fixed paper (the scene host is
        // no backdrop root at rest).
        report[`square-${scheme}`] = await page.evaluate(() => ({
            sceneHostVTName: getComputedStyle(document.querySelector(".scene-host")).viewTransitionName,
            dockGroupVTNames: [...document.querySelectorAll(".dock-vt-group")].map((e) => getComputedStyle(e).viewTransitionName),
            plate: [getComputedStyle(document.querySelector(".square-stage")).backgroundColor, getComputedStyle(document.querySelector(".square-stage")).backdropFilter],
        }));
        const sq = await page.locator(".square-stage").boundingBox();
        await page.screenshot({ path: path.join(OUT, `square-plate-crop-1440-${scheme}.png`), clip: { x: sq.x + 20, y: sq.y + sq.height - 120, width: 200, height: 100 } });
        // KF-C4-07 / -15 / -18 — the controls pane.
        report[`pane-${scheme}`] = await page.evaluate((Rs) => {
            const R = eval(Rs);
            const f = document.querySelector(".pane-frame");
            const pencil = f.querySelector('[aria-label="Edit easing curve"]');
            const trig = pencil.parentElement.querySelector("button[aria-labelledby]");
            const name = [...trig.querySelectorAll("span")].find((s) => s.children.length === 0 && s.textContent.trim());
            const layer = [...f.querySelectorAll("button")].find((b) => b.textContent.trim() === "layer");
            const hairs = [...f.querySelectorAll(".separator")].map((e) => Math.round(e.getBoundingClientRect().y));
            return {
                easingValueFont: getComputedStyle(name).fontFamily.split(",")[0],
                fieldValueFont: getComputedStyle(f.querySelector("input")).fontFamily.split(",")[0],
                pencilInsideField: (() => { const a = pencil.getBoundingClientRect(), t = trig.getBoundingClientRect(); return a.left >= t.left && a.right <= t.right && a.top >= t.top - 1 && a.bottom <= t.bottom + 1; })(),
                easingLabelChildren: [...document.getElementById(trig.getAttribute("aria-labelledby").split(" ")[0]).parentElement.children].length,
                layerRow: R(layer), hairlines: hairs,
            };
        }, R);
        await shot(page, `controls-pane-1440-${scheme}`, ".pane-frame");

        // KF-C4-01 / -12 — the Keyframes tab.
        await setSurface(page, "square", "keyframes", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE + 2000);
        report[`keyframes-${scheme}`] = await page.evaluate(() => {
            const bg = (s) => { const e = document.querySelector(s); return e && getComputedStyle(e).backgroundColor; };
            const res = (v) => { const d = document.createElement("div"); d.style.color = v; document.body.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; };
            const ap = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Apply CSS");
            return {
                muted: res("var(--muted)"),
                editorGround: bg(".monaco-editor .monaco-editor-background"),
                gutter: bg(".monaco-editor .margin"),
                wellGutter: bg(".code-well__body"),
                ribbon: [...ap.parentElement.querySelectorAll("button")].map((b) => [b.textContent.trim(), b.getAttribute("data-emphasis"), Math.round(b.getBoundingClientRect().y)]),
            };
        });
        await shot(page, `keyframes-pane-1440-${scheme}`, ".pane-frame");

        // KF-C4-12 / -13 / -14 — the Timeline.
        await setSurface(page, "square", "timeline", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        const snap = async () => { await page.locator(".pane-frame button", { hasText: "Snapshot" }).first().click(); await page.waitForTimeout(1800); };
        await snap();
        await snap();
        const paneTop = await page.evaluate(() => Math.round(document.querySelector(".pane-frame").getBoundingClientRect().top));
        report[`timeline-${scheme}`] = await page.evaluate(() => {
            const c = document.querySelector('[aria-label="Clear all keyframes"]');
            const u = document.querySelector('[aria-label="Undo"]');
            const s = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Snapshot");
            return {
                clear: { disabled: c.disabled, ink: getComputedStyle(c).color, undoInk: getComputedStyle(u).color },
                verbs: [...s.parentElement.querySelectorAll("button")].map((b) => [b.textContent.trim(), b.getAttribute("data-emphasis"), Math.round(b.getBoundingClientRect().y)]),
            };
        });
        await page.locator('[aria-label="Clear all keyframes"]').first().hover();
        await page.waitForTimeout(500);
        report[`timeline-${scheme}`].clear.hoverInk = await page.evaluate(() => getComputedStyle(document.querySelector('[aria-label="Clear all keyframes"]')).color);
        await page.mouse.move(1200, 120);
        await page.waitForTimeout(400);
        await shot(page, `timeline-2kf-docked-1440-${scheme}`);
        await page.locator('button[aria-label="Unfold timeline"]').first().click();
        await page.waitForTimeout(1500);
        report[`timeline-unfolded-${scheme}`] = await page.evaluate((paneTop) => {
            const c = document.querySelector("#timeline-expanded-target .cartoon-surface").getBoundingClientRect();
            const st = document.querySelector(".stage-cell").getBoundingClientRect();
            return { dockedPaneTop: paneTop, unfoldedCard: [Math.round(c.x), Math.round(c.y), Math.round(c.width), Math.round(c.height)], stageCell: [Math.round(st.y), Math.round(st.height)] };
        }, paneTop);
        await shot(page, `timeline-expanded-1440-${scheme}`);
        await page.locator('button[aria-label="Fold timeline into the pane"]').first().click();
        await page.waitForTimeout(800);
        await setSurface(page, "square", "controls", false);

        // KF-C4-08 / -09 / -10 / -11 — spring.
        await page.goto(`${BASE}#/spring`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`spring-${scheme}`] = await page.evaluate((Rs) => {
            const R = eval(Rs);
            const f = (e) => { const s = getComputedStyle(e); return [s.fontFamily.split(",")[0], s.fontSize, s.color]; };
            const ticks = [...document.querySelectorAll(".plot-tick--value")].map((t) => [t.textContent, R(t)]);
            const plot = R(document.querySelector(".plot-frame"));
            const tag = document.querySelector(".spring-heatmap-tag").getBoundingClientRect();
            const line = document.querySelector(".spring-heatmap-critical").getBoundingClientRect();
            const pips = [...document.querySelectorAll(".spring-heatmap-pip")].map((p) => { const l = p.querySelector("span").getBoundingClientRect(); return [p.textContent.trim(), Math.round(l.top), Math.round(l.bottom), p.classList.contains("is-under")]; });
            const track = getComputedStyle(document.querySelector(".spring-track"));
            return {
                position: [f(document.querySelector(".spring-readout-primary"))],
                velocity: [...document.querySelectorAll(".spring-header [class*=aside] *, .spring-header > * *")].filter((e) => e.children.length === 0 && /velocity|^-?\d+\.\d\d$/.test(e.textContent.trim())).map((e) => [e.textContent.trim(), ...f(e)]),
                valueTicks: ticks, plot,
                criticalLineY: Math.round(line.top), tagBottom: Math.round(tag.bottom), pipLabels: pips,
                trackGrid: track.backgroundImage.slice(0, 160), groove: getComputedStyle(document.querySelector(".spring-track .progress-rail")).backgroundColor, tick: (() => { const d = document.createElement("div"); d.style.color = "var(--border)"; document.body.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; })(),
            };
        }, R);
        await shot(page, `spring-header-1440-${scheme}`, ".spring-header", 8);
        await shot(page, `spring-rail-1440-${scheme}`, ".spring-figure");
        await shot(page, `spring-heatmap-1440-${scheme}`, ".spring-heatmap-section", 8);

        // KF-C4-04 — the reel.
        await page.goto(`${BASE}#/sequence`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`sequence-${scheme}`] = await page.evaluate(() => {
            const r = document.querySelector('[aria-label^="Reel"]');
            const s = getComputedStyle(r);
            return { text: r.textContent.trim(), emphasis: r.getAttribute("data-emphasis"), bg: s.backgroundColor, shadow: s.boxShadow };
        });
        await shot(page, `sequence-header-1440-${scheme}`, '[aria-label^="Reel"]', 120);

        // KF-C4-06 — the easing tiles.
        await page.goto(`${BASE}#/easing`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        await shot(page, `easing-tiles-1440-${scheme}`, ".specimen-drawer", 4);

        // KF-C4-05 / -17 (glass-owned) — the shortcuts dialog, re-captured.
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        await page.keyboard.press("Shift+Slash");
        await page.waitForTimeout(1500);
        await shot(page, `shortcuts-1440-${scheme}`);
        await page.keyboard.press("Escape");
        report[`errors-${scheme}`] = logs;
        await ctx.close();
    }
    // KF-C4-06 at 390.
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.goto(`${BASE}#/easing`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`easing-390-${scheme}`] = await page.evaluate(() => {
            const g = document.querySelector(".easing-target .specimen-grid, .specimen-grid");
            const tiles = [...g.querySelectorAll(".specimen-tile")].slice(0, 4).map((t) => { const b = t.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; });
            const st = document.querySelector(".tile-stage").getBoundingClientRect();
            return { columns: getComputedStyle(g).gridTemplateColumns, tiles, stage: [Math.round(st.width), Math.round(st.height)] };
        });
        await shot(page, `easing-390-${scheme}`);
        await ctx.close();
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "c4-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
