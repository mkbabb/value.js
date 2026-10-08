// X-DS keyframes pass 8, critic C8 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c8-probe.mjs [outDir] [--no-shots]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const args = process.argv.slice(2);
const SHOTS = !args.includes("--no-shots");
const OUT = args.find((a) => !a.startsWith("--")) ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4500);
const SCHEMES = (process.env.SCHEMES ?? "light,dark").split(",");
fs.mkdirSync(OUT, { recursive: true });
const browser0 = await chromium.launch({ channel: "chrome", headless: true });
// `R` (a box's inline extent) is used inside page.evaluate, so every context gets it.
const browser = {
    newContext: async (o) => { const c = await browser0.newContext(o); await c.addInitScript(() => { window.R = (b) => [Math.round(b.left), Math.round(b.right)]; }); return c; },
    close: () => browser0.close(),
};
const report = {};
const shot = (page, name, opts) => (SHOTS ? page.screenshot({ path: path.join(OUT, name), ...opts }) : null);
const go = async (page, route) => {
    await page.goto(`${BASE}#/${route}`, { waitUntil: "load" });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(SETTLE);
};
const R = (b) => [Math.round(b.left), Math.round(b.right)];

// KF-C8-01 — the easing pane: plot-only cap, the control row's measure, the readout
const easingFit = (page) => page.evaluate(() => {
    const s = document.querySelector(".controls-surface");
    const pk = document.querySelector(".easing-sidebar [data-slot='easing-picker']");
    const curve = pk.querySelector("[data-slot='easing-curve']").getBoundingClientRect();
    const ctl = pk.querySelector("[data-slot='easing-controls']");
    const kids = [...ctl.children].filter((e) => e.getBoundingClientRect().height > 0);
    const chip = ctl.querySelector("button:has(> code)");
    const pr = document.querySelector(".easing-sidebar .param-row");
    const pkb = pk.getBoundingClientRect();
    return {
        picker: [Math.round(pkb.left), Math.round(pkb.right)],
        plot: { x: [Math.round(curve.left), Math.round(curve.right)], size: Math.round(curve.width), slackL: Math.round(curve.left - pkb.left), slackR: Math.round(pkb.right - curve.right) },
        controls: { x: R(ctl.getBoundingClientRect()), h: Math.round(ctl.getBoundingClientRect().height), rows: new Set(kids.map((e) => Math.round(e.getBoundingClientRect().top))).size },
        chip: chip ? { display: getComputedStyle(chip).display, text: chip.textContent.trim() } : null,
        scroll: [s.scrollHeight, s.clientHeight],
        durationRowBottom: Math.round(pr.getBoundingClientRect().bottom),
        surfaceBottom: Math.round(s.getBoundingClientRect().bottom),
        headerLiteral: document.querySelector(".specimen-literal")?.textContent.replace(/\s+/g, " ").trim(),
    };
});

for (const scheme of SCHEMES) {
    const r = (report[scheme] = {});
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();

    // KF-C8-02 — cube's controls pane: the label column against the rail and the ball track
    await go(page, "cube");
    r.cubeColumn = await page.evaluate(() => {
        const pane = document.querySelector(".pane-frame");
        const label = [...pane.querySelectorAll(".labeled-field-label, label")].find((e) => e.getBoundingClientRect().width > 0);
        const rail = pane.querySelector(".scrub-rail [data-slot='slider']") ?? pane.querySelector(".scrub-rail");
        const track = pane.querySelector(".visualizer-stage");
        const railTrack = rail?.querySelector(".slider-track, [data-slot='slider-track']") ?? rail;
        const vrail = pane.querySelector(".visualizer-stage .progress-rail");
        const fields = [...pane.querySelectorAll("input, [role='combobox'], [role='spinbutton']")].filter((e) => e.getBoundingClientRect().width > 0);
        return {
            labelLeft: label && Math.round(label.getBoundingClientRect().left),
            fieldsRight: Math.max(...fields.map((e) => Math.round(e.getBoundingClientRect().right))),
            rail: R(rail.getBoundingClientRect()),
            railTrack: R(railTrack.getBoundingClientRect()),
            ballTrack: track && R(track.getBoundingClientRect()),
            ballRail: vrail && R(vrail.getBoundingClientRect()),
        };
    });
    await shot(page, `controls-pane-1440-${scheme}.png`, { clip: await (async () => { const b = await page.locator(".pane-frame").first().boundingBox(); return { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 16), width: b.width + 32, height: b.height + 32 }; })() });

    // KF-C8-01 — the easing route at 1440×900
    await go(page, "easing");
    r.easing = await easingFit(page);
    await shot(page, `easing-pane-900-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });

    // KF-C8-04 — spring's stage caption against square's
    await go(page, "spring");
    r.spring = await page.evaluate(() => {
        const p = document.getElementById("spring-rail-hint");
        const cs = getComputedStyle(p);
        const rail = document.querySelector(".spring-rail").getBoundingClientRect();
        const pb = p.getBoundingClientRect();
        const b = document.querySelector(".spring-reseat").getBoundingClientRect();
        return { font: cs.fontSize, align: cs.textAlign, ink: cs.color, rail: R(rail), caption: R(pb), lines: Math.round(pb.height / parseFloat(cs.lineHeight)), reseat: R(b), reseatTopVsCaption: Math.round(b.top - pb.top) };
    });
    await shot(page, `spring-stage-1440-${scheme}.png`, { clip: await (async () => { const b = await page.locator(".spring-rail").first().boundingBox(); return { x: b.x - 24, y: b.y - 60, width: b.width + 48, height: 200 }; })() });
    await go(page, "square");
    r.square = await page.evaluate(() => { const c = document.querySelector(".square-legend .text-caption"); const cs = getComputedStyle(c); return { font: cs.fontSize, align: getComputedStyle(c.parentElement).alignItems, ink: cs.color }; });
    await ctx.close();
}

// KF-C8-01 — the tall cell and the short cell
for (const [w, h] of [[1440, 1080], [1280, 760]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "easing");
    report[`easing${w}x${h}`] = await easingFit(page);
    await ctx.close();
}
// below lg: the chip stays (no header literal beside the sheet)
{
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await go(page, "easing");
    report.easing390 = await page.evaluate(() => { const c = document.querySelector("[data-slot='easing-controls'] button:has(> code)"); return c ? getComputedStyle(c).display : "absent"; });
    await ctx.close();
}

// KF-C8-03 · KF-C8-06 — the Keyframes facet code well and its footer row
for (const scheme of SCHEMES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await go(page, "cube");
    await page.locator('[aria-label="Expand dock"]').first().hover().catch(() => {});
    await page.waitForTimeout(900);
    await page.locator('button[aria-label="Keyframes"]').first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.mouse.move(1300, 850);
    await page.waitForTimeout(600);
    report[scheme].keyframesWell = await page.evaluate(() => {
        const ed = document.querySelector(".monaco-editor");
        if (!ed) return null;
        const eb = ed.getBoundingClientRect();
        const margin = ed.querySelector(".margin")?.getBoundingClientRect();
        const lines = ed.querySelector(".lines-content")?.getBoundingClientRect();
        const scroll = ed.querySelector(".monaco-scrollable-element.editor-scrollable");
        const vw = scroll.clientWidth;
        const clipped = [...ed.querySelectorAll(".view-line")].map((l, i) => ({ i, t: l.textContent.trim(), w: Math.round(l.firstElementChild?.getBoundingClientRect().width ?? 0) })).filter((l) => l.w > vw).map((l) => l.t);
        return { well: R(eb), gutterW: margin && Math.round(margin.width), codeLeft: lines && Math.round(lines.left), viewW: vw, clipped };
    });
    report[scheme].footer = await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button[aria-label="Copy keyframes"], button[aria-label="Format"], button[aria-label="Copy compiled CSS"]')];
        const row = btns[0]?.parentElement;
        return row && { rowW: Math.round(row.getBoundingClientRect().width), rowH: Math.round(row.getBoundingClientRect().height), labels: btns.map((b) => { const sp = [...b.querySelectorAll("span")].pop(); const word = sp ?? null; return { name: b.getAttribute("aria-label"), word: (word ? getComputedStyle(word).position !== "absolute" : true) ? b.textContent.trim() : "(glyph)" }; }), overflow: row.scrollWidth > row.clientWidth };
    });
    await shot(page, `f-keyframes-1440-${scheme}.png`);
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c8-probe.json" : "c8-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
