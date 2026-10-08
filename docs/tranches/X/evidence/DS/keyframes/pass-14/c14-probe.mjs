// X-DS keyframes pass 14 (the redeployed workflow's pass 10), critic C14 cure
// seat (adapted from pass-13/c13-probe.mjs) — the AFTER frames for the critic's cells (the route cells come from
// scripts/ds-census.mjs --frames) plus the served measurement behind each
// cure. Headless real Chrome only (COHESION §0ei).
//   node c14-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const { PNG } = createRequire("/Users/mkbabb/Programming/keyframes.js/package.json")("pngjs");

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const args = process.argv.slice(2);
const SHOTS = !args.includes("--no-shots");
const OUT = args.find((a) => !a.startsWith("--")) ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 6000);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const shot = (page, name, opts) => (SHOTS ? page.screenshot({ path: path.join(OUT, name), ...opts }) : null);
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
const toEntry = async (page, w, h) => {
    await go(page, "spring");
    const x = w >= 1024 ? (w + 480) / 2 : w / 2;
    await page.mouse.move(x, h - 40);
    await page.waitForTimeout(600);
    await page.mouse.move(x, h - 90);
    await page.waitForTimeout(1500);
    await page.getByRole("combobox", { name: "Select animation" }).click({ timeout: 8000 });
    await page.waitForTimeout(800);
    await page.getByRole("option", { name: /Entry/ }).first().click({ timeout: 8000 });
    await page.waitForTimeout(2500);
    await page.mouse.move(w - 20, 120);
    await page.waitForTimeout(800);
    return true;
};
// KF-C12-01 — the response axis's ink against fold − mask-fade
const springAxis = (page) =>
    page.evaluate(() => {
        const sEl = [...document.querySelectorAll(".controls-surface")].find((e) => e.getBoundingClientRect().width > 0);
        const s = sEl.getBoundingClientRect();
        const fade = parseFloat(getComputedStyle(sEl).getPropertyValue("--surface-fade-end")) || 0;
        const field = document.querySelector(".spring-heatmap").getBoundingClientRect();
        const x = document.querySelector(".spring-heatmap-x").getBoundingClientRect();
        return {
            field: Math.round(field.height),
            xAxisBottom: Math.round(x.bottom),
            fold: Math.round(s.bottom),
            fadeEnd: fade,
            fadeStart: Math.round(s.bottom - fade),
            axisAboveFade: x.bottom <= s.bottom - fade,
            section: (() => { const e = document.querySelector(".spring-heatmap-section").getBoundingClientRect(); return [Math.round(e.top), Math.round(e.bottom)]; })(),
            sectionWholeOrBelowFold: (() => { const e = document.querySelector(".spring-heatmap-section").getBoundingClientRect(); return e.bottom <= s.bottom - fade || e.top >= s.bottom - 1; })(),
            presets: (() => { const g = document.querySelector(".preset-grid").getBoundingClientRect(); return [Math.round(g.top), Math.round(g.bottom)]; })(),
            presetsAboveFade: document.querySelector(".preset-grid").getBoundingClientRect().bottom <= s.bottom - fade,
            pips: [...document.querySelectorAll(".spring-heatmap-pip")].map((p) => {
                const l = p.querySelector("span"), r = p.getBoundingClientRect(), lr = l.getBoundingClientRect();
                const shown = getComputedStyle(l).display !== "none";
                return { name: l.textContent.trim(), current: p.classList.contains("is-current"), dot: [Math.round(r.left), Math.round(r.top)], label: shown ? [Math.round(lr.left), Math.round(lr.top), Math.round(lr.right), Math.round(lr.bottom)] : null };
            }),
        };
    });

// KF-C14-02 — each lane rail and its dashed tail against the card, sampled
// from the served pixels (WCAG contrast of the hairline vs the card beside it)
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return Math.round(((h + 0.05) / (l + 0.05)) * 100) / 100; };
const laneContrast = async (page) => {
    const lanes = await page.evaluate(() => [...document.querySelectorAll(".seq-track")].filter((t) => t.getBoundingClientRect().width > 0).map((t) => {
        const rail = t.querySelector(".progress-rail").getBoundingClientRect();
        const tr = t.getBoundingClientRect();
        const balls = [...t.querySelectorAll(".progress-ball")].map((b) => b.getBoundingClientRect());
        // a rail x clear of the traveller, and a tail x in the overshoot room
        let x = rail.left + rail.width * 0.5;
        for (const f of [0.5, 0.3, 0.7, 0.15, 0.85]) { const c = rail.left + rail.width * f; if (!balls.some((b) => c > b.left - 6 && c < b.right + 6)) { x = c; break; } }
        return { y: Math.round(rail.top + rail.height / 2 - 0.5), x: Math.round(x), tailX: Math.round((rail.right + tr.right) / 2), tailY: Math.round(tr.top + tr.height / 2 - 0.5) };
    }));
    const png = PNG.sync.read(await page.screenshot());
    const px = (x, y) => { const i = (png.width * y + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
    const best = (x, y) => { let m = null; for (let dy = -2; dy <= 2; dy++) { const p = px(x, y + dy); const r = ratio(p, px(x, y - 8)); if (!m || r > m.r) m = { p, r }; } return m; };
    // the dashed tail: the strongest of a few x samples (a dash or a gap)
    const tail = (x, y) => { let m = null; for (let dx = -6; dx <= 6; dx++) { const b = best(x + dx, y); if (!m || b.r > m.r) m = b; } return m; };
    return lanes.map((l) => { const r = best(l.x, l.y), t = tail(l.tailX, l.tailY); return { rail: r.p, card: px(l.x, l.y - 8), railRatio: r.r, tail: t.p, tailRatio: t.r }; });
};

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await go(page, "spring");
        r.spring1440 = await springAxis(page);
        await shot(page, `spring-pane-1440-${scheme}.png`);
        await shot(page, `crop-spring-axis-${scheme}.png`, { clip: { x: 0, y: 300, width: 520, height: 260 } });
        await shot(page, `presets-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
        await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
        await page.waitForTimeout(600);
        r.spring1440Scrolled = await springAxis(page);
        await shot(page, `crop-spring-figure-scrolled-${scheme}.png`, { clip: { x: 0, y: 40, width: 520, height: 520 } });
        if (await toEntry(page, 1440, 900).catch((e) => (console.error("entry:", e.message.split("\n")[0]), false))) {
            await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = 0; });
            await page.waitForTimeout(600);
            r.entrySpring1440 = await springAxis(page).catch(() => null);
            await shot(page, `entry-1440-${scheme}.png`);
        } else r.entry1440 = "entry view not reached";
        await go(page, "sequence");
        r.sequence1440 = await laneContrast(page);
        await shot(page, `sequence-1440-${scheme}.png`);
        await ctx.close();
    }
    {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true });
        const page = await ctx.newPage();
        await go(page, "sequence");
        r.sequence390 = await laneContrast(page).catch((e) => e.message.split("\n")[0]);
        await shot(page, `sequence-390-${scheme}.png`);
        await ctx.close();
    }
}
for (const [w, h] of [[1440, 900], [1280, 760], [1280, 800], [1024, 700], [1440, 1080], [1280, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "spring");
    report[`spring${w}x${h}`] = await springAxis(page);
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c14-probe.json" : "c14-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report));
await browser.close();
