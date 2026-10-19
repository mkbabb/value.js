// X-DS keyframes pass 9, critic C9 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c9-probe.mjs [outDir] [--no-shots]
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
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const shot = (page, name, opts) => (SHOTS ? page.screenshot({ path: path.join(OUT, name), ...opts }) : null);
// The shared machine runs other seats' browsers too, so a navigation is retried.
const go = async (page, route) => {
    for (let attempt = 1; ; attempt++) {
        try {
            await page.goto(`${BASE}#/${route}`, { waitUntil: "domcontentloaded", timeout: 240000 });
            await page.evaluate(() => localStorage.clear());
            await page.reload({ waitUntil: "domcontentloaded", timeout: 240000 });
            break;
        } catch (e) {
            if (attempt >= 3) throw e;
        }
    }
    await page.waitForTimeout(SETTLE);
};
const facet = async (page, label) => {
    await page.locator('[aria-label="Expand dock"]').first().hover().catch(() => {});
    await page.waitForTimeout(800);
    await page.locator(`button[aria-label="${label}"]`).first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await page.mouse.move(1300, 880);
    await page.waitForTimeout(500);
};
const clipOf = async (page, sel, pad = 16) => {
    const b = await page.locator(`${sel} >> visible=true`).first().boundingBox();
    return b && { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad };
};

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();

    // KF-C9-04 — the four stage titles against their plate's edge
    r.stageTitles = {};
    for (const route of ["easing", "spring", "sequence", "square"]) {
        await go(page, route);
        r.stageTitles[route] = await page.evaluate(() => {
            const h = [...document.querySelectorAll("[data-scene-stage-header]")].find((e) => e.getBoundingClientRect().width > 0);
            const t = h.querySelector("h2") ?? h;
            const pb = h.closest("[data-slot=card]").getBoundingClientRect();
            const tb = t.getBoundingClientRect();
            const range = document.createRange();
            range.selectNodeContents(t);
            const ink = range.getBoundingClientRect();
            return { inset: Math.round(ink.left - pb.left), top: Math.round(tb.top - pb.top), plateW: Math.round(pb.width) };
        });
        if (route === "spring") {
            // KF-C9-01 · KF-C9-02 — the preset tiles (Physics facet)
            // the Physics pane is the scene's default facet (a facet click on
            // the open one closes it)
            await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
            await page.waitForTimeout(600);
            r.presets = await page.evaluate(() => [...document.querySelectorAll(".preset-cell")].filter((c) => c.getBoundingClientRect().height > 0).map((c) => {
                const v = c.querySelector(".tabular-nums");
                const cs = getComputedStyle(c), vs = getComputedStyle(v);
                return { name: c.textContent.trim().split(/\s/)[0], on: c.dataset.state === "on", h: Math.round(c.getBoundingClientRect().height), value: v.textContent.trim(), transform: vs.textTransform, spacing: vs.letterSpacing, align: cs.textAlign, valueLines: Math.round(v.getBoundingClientRect().height / parseFloat(vs.lineHeight)), bg: cs.backgroundImage === "none" ? cs.backgroundColor : cs.backgroundImage.slice(0, 40), shadow: cs.boxShadow, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, outline: `${cs.outlineStyle} ${cs.outlineColor}` };
            }));
            await shot(page, `presets-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
            // KF-C9-08 — the Controls facet's layer row
            await facet(page, "Controls");
            r.layerRow = await page.evaluate(() => { const b = [...document.querySelectorAll("button[aria-controls]")].find((e) => e.querySelector("span")?.textContent.trim() === "layer" && e.getBoundingClientRect().width > 0); return b && b.textContent.replace(/\s+/g, " ").trim(); });
            // KF-C9-03 — the Entry view: one Reveal/Dismiss
            // the Physics pane up, then the bottom dock expanded by hover (its
            // channel select is hidden while the dock rests collapsed)
            await facet(page, "Physics");
            await page.mouse.move(740, 792);
            await page.waitForTimeout(1200);
            const combos = page.locator("[role=combobox]");
            const n = await combos.count();
            for (let i = 0; i < n; i++) {
                if (/Sweep/.test((await combos.nth(i).textContent()).trim())) {
                    await combos.nth(i).click();
                    await page.waitForTimeout(600);
                    await page.getByRole("option", { name: /Entry/ }).first().click().catch(() => {});
                    await page.waitForTimeout(2500);
                    await page.mouse.move(1300, 880);
                    await page.waitForTimeout(600);
                    break;
                }
            }
            r.entry = await page.evaluate(() => ({
                verbs: [...document.querySelectorAll("button")].filter((b) => /^(Dismiss|Reveal)$/.test(b.textContent.trim()) && b.getBoundingClientRect().width > 0).map((b) => ({ text: b.textContent.trim(), inPane: !!b.closest(".pane-frame"), w: Math.round(b.getBoundingClientRect().width) })),
                ribbon: [...document.querySelectorAll(".ribbon-bar .btn-playback")].map((b) => b.textContent.trim()),
                accentBars: document.querySelectorAll(".btn-playback-accent").length,
            }));
            await shot(page, `entry-1440-${scheme}.png`);
        }
    }

    // KF-C9-07 — one pane inset (easing: configurator body vs the transport)
    await go(page, "easing");
    r.paneInset = await page.evaluate(() => {
        const frame = document.querySelector(".pane-frame").getBoundingClientRect().left;
        const at = (sel) => { const e = [...document.querySelectorAll(sel)].find((x) => x.getBoundingClientRect().width > 0); return e ? Math.round(e.getBoundingClientRect().left - frame) : null; };
        return { configuratorBody: at(".configurator-layer-body"), configuratorBodyPad: getComputedStyle(document.querySelector(".configurator-layer-body")).paddingLeft, ribbonColumn: at(".ribbon-bar > div + div"), ribbonPad: getComputedStyle(document.querySelector(".ribbon-bar > div + div")).paddingLeft };
    });
    await go(page, "cube");
    r.cubeColumn = await page.evaluate(() => { const c = document.querySelector(".controls-surface .px-\\(--configurator-pad-inline\\)"); return c && getComputedStyle(c).paddingLeft; });
    await facet(page, "Timeline");
    r.timelineTitle = await page.evaluate(() => { const h = [...document.querySelectorAll("h3")].find((e) => e.textContent.trim() === "Timeline" && e.getBoundingClientRect().width > 0); const f = document.querySelector(".pane-frame").getBoundingClientRect().left; return h && { size: getComputedStyle(h).fontSize, weight: getComputedStyle(h).fontWeight, inset: Math.round(h.getBoundingClientRect().left - f) }; });
    await shot(page, `f-timeline-1440-${scheme}.png`, { clip: await clipOf(page, ".pane-frame") });
    await facet(page, "Keyframes");
    r.keyframesTitle = await page.evaluate(() => { const h = document.querySelector(".monaco-editor")?.closest("section, div")?.parentElement?.querySelector("header h3") ?? [...document.querySelectorAll("header h3")].find((e) => e.getBoundingClientRect().width > 0); const f = document.querySelector(".pane-frame").getBoundingClientRect().left; return h && { text: h.textContent.trim(), size: getComputedStyle(h).fontSize, inset: Math.round(h.getBoundingClientRect().left - f) }; });
    await ctx.close();
}

// KF-C9-09 — spring at 390: the caption takes the measure, Re-seat under it
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await go(page, "spring");
    report[scheme].spring390 = await page.evaluate(() => {
        const p = document.getElementById("spring-rail-hint"), b = document.querySelector(".spring-reseat");
        const pb = p.getBoundingClientRect(), bb = b.getBoundingClientRect();
        return { captionW: Math.round(pb.width), lines: Math.round(pb.height / parseFloat(getComputedStyle(p).lineHeight)), reseatBelow: bb.top >= pb.bottom - 1, reseatLeftVsCaption: Math.round(bb.left - pb.left) };
    });
    await shot(page, `spring-caption-390-${scheme}.png`, { clip: await clipOf(page, ".spring-rail-verbs", 24) });
    await ctx.close();
}

// KF-C9-10 — the easing pane at laptop heights
for (const [w, h] of [[1440, 900], [1280, 760], [1280, 800], [1024, 700], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "easing");
    report[`easing${w}x${h}`] = await page.evaluate(() => {
        const s = document.querySelector(".controls-surface");
        const curve = document.querySelector(".easing-sidebar [data-slot='easing-curve']").getBoundingClientRect();
        const pr = document.querySelector(".easing-sidebar .param-row");
        return { plot: Math.round(curve.width), scroll: [s.scrollHeight, s.clientHeight], durationRowBottom: Math.round(pr.getBoundingClientRect().bottom), surfaceBottom: Math.round(s.getBoundingClientRect().bottom) };
    });
    if (w === 1280 && h === 760) await shot(page, "easing-pane-1280x760.png", { clip: { x: 0, y: 0, width: 480, height: 760 } });
    await ctx.close();
}

// KF-C9-05 (cited) — the preset select vs the stage's name, and the seed the consumer passes
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await go(page, "easing");
    report.easingPreset = await page.evaluate(() => {
        const pk = document.querySelector(".easing-sidebar [data-slot='easing-picker']");
        return { stage: document.querySelector(".specimen-name")?.textContent.trim(), select: pk.querySelector("[aria-label='Easing preset']")?.textContent.trim(), fellThroughAttr: pk.getAttribute("preset"), dataPreset: pk.dataset.preset };
    });
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c9-probe.json" : "c9-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
