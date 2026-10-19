// X-DS keyframes pass 16 (the redeployed workflow's pass 12), critic C16 cure seat
// (adapted from pass-15/c15-probe.mjs): the AFTER frames for the critic's cells and
// the served measurement behind each cure. Headless real Chrome only (COHESION §0ei).
//   node c16-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const args = process.argv.slice(2);
const SHOTS = !args.includes("--no-shots");
const OUT = args.find((a) => !a.startsWith("--")) ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 6000);
const SCHEMES = (process.env.SCHEMES ?? "light,dark").split(",");
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
const vis = (sel) => `[...document.querySelectorAll(${JSON.stringify(sel)})].find((e) => e.getBoundingClientRect().width > 0)`;
// KF-C16-01 — the Sequence plate and the lanes in it
const seqPlate = (page) =>
    page.evaluate(() => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
        const plate = [...document.querySelectorAll(".seq-target")].find((e) => e.getBoundingClientRect().width > 0);
        const rows = plate?.querySelector(".seq-rows");
        const head = plate?.querySelector(".seq-header");
        const p = plate?.getBoundingClientRect(), rw = rows?.getBoundingClientRect(), h = head?.getBoundingClientRect();
        const sheet = [...document.querySelectorAll("[data-sheet], .bottom-sheet, [role=dialog]")].map((e) => e.getBoundingClientRect()).filter((b) => b.width > 0).map((b) => Math.round(b.top));
        return {
            plate: r(plate), header: r(head), lanes: r(rows),
            lanesGapAbove: p && rw && h ? Math.round(rw.top - h.bottom) : null,
            lanesGapBelow: p && rw ? Math.round(p.bottom - rw.bottom) : null,
            rowPitch: (() => { const rs = [...(plate?.querySelectorAll(".seq-row") ?? [])].map((e) => e.getBoundingClientRect().top); return rs.length > 1 ? Math.round((rs.at(-1) - rs[0]) / (rs.length - 1) * 10) / 10 : null; })(),
            ball: plate ? Math.round(plate.querySelector(".seq-ball")?.getBoundingClientRect().width ?? 0) : null,
            overflowing: plate ? plate.scrollHeight > plate.clientHeight + 1 : null,
            sheetTops: sheet,
        };
    });
// KF-C16-02 — the square plate
const squarePlate = (page) =>
    page.evaluate(() => {
        const plate = [...document.querySelectorAll(".square-stage")].find((e) => e.getBoundingClientRect().width > 0);
        const b = plate?.getBoundingClientRect();
        const box = document.querySelector(".square-box, [role=group]")?.getBoundingClientRect();
        const travel = plate ? getComputedStyle(plate.querySelector(".square-arena") ?? plate).getPropertyValue("--square-travel") : null;
        return { plate: b ? [Math.round(b.top), Math.round(b.bottom), Math.round(b.width)] : null, boxCentreY: box ? Math.round(box.top + box.height / 2) : null, plateCentreY: b ? Math.round(b.top + b.height / 2) : null, travel };
    });
// KF-C16-03 — the specimen title against the family headings
const easingType = (page) =>
    page.evaluate(() => {
        const fs = (el) => (el ? { px: parseFloat(getComputedStyle(el).fontSize), w: getComputedStyle(el).fontWeight, text: el.textContent.trim().slice(0, 20) } : null);
        const name = [...document.querySelectorAll(".specimen-name")].find((e) => e.getBoundingClientRect().width > 0);
        const fam = [...document.querySelectorAll(".catalogue-family")].find((e) => e.getBoundingClientRect().width > 0);
        const a = fs(name), b = fs(fam);
        return { specimen: a, family: b, ratio: a && b ? Math.round((a.px / b.px) * 100) / 100 : null };
    });
// KF-C16-04 / -07 — the figure row's swatch, and the Physics header pair
const springRow = (page) =>
    page.evaluate(() => {
        const trig = document.querySelector("[data-figure-title]");
        const sw = document.querySelector(".spring-heatmap-swatch");
        const legend = document.querySelector("[data-figure-legend]");
        const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "To keyframes" && b.getBoundingClientRect().width > 0);
        const sep = btn?.parentElement?.querySelector('[role=separator], [data-orientation=vertical]');
        const sb = sep?.getBoundingClientRect(), bb = btn?.getBoundingClientRect();
        return { expanded: trig?.getAttribute("aria-expanded"), swatch: !!sw, legend: legend?.textContent.replace(/\s+/g, " ").trim(),
            separator: sb ? { x: Math.round(sb.left), w: Math.round(sb.width), h: Math.round(sb.height), gapFromAction: Math.round(sb.left - bb.right) } : null };
    });
// KF-C16-05 / -06 — the Stagger ruler and the pane's block-end seat
const stagger = (page) =>
    page.evaluate(() => {
        const track = [...document.querySelectorAll(".lane-track")].find((e) => e.getBoundingClientRect().width > 0);
        const labels = [...(track?.querySelectorAll(".lane-track-tick-label") ?? [])].map((e) => { const b = e.getBoundingClientRect(); return { t: e.textContent.trim(), l: Math.round(b.left), r: Math.round(b.right) }; });
        const gaps = labels.slice(1).map((x, i) => x.l - labels[i].r);
        const pane = track?.closest(".controls-surface") ?? track?.closest("[data-pane]");
        const card = track?.closest(".configurator-layer, section") ;
        const surf = [...document.querySelectorAll(".controls-surface")].find((e) => e.getBoundingClientRect().width > 0 && e.contains(track));
        const tb = track?.getBoundingClientRect(), sb = surf?.getBoundingClientRect();
        let frame = surf; while (frame && frame.parentElement && getComputedStyle(frame).borderTopWidth === "0px") frame = frame.parentElement;
        const fb = frame?.getBoundingClientRect();
        return { labels, minGap: gaps.length ? Math.min(...gaps) : null, trackBottom: tb ? Math.round(tb.bottom) : null,
            surfaceBottom: sb ? Math.round(sb.bottom) : null, frameBottom: fb ? Math.round(fb.bottom) : null,
            trackLeftInset: tb && fb ? Math.round(tb.left - fb.left) : null, blockEndInset: tb && fb ? Math.round(fb.bottom - tb.bottom) : null };
    });

for (const scheme of SCHEMES) {
    const r = (report[scheme] = {});
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await go(page, "spring");
        r.spring1440 = await springRow(page);
        await shot(page, `spring-pane-1440-${scheme}.png`);
        await shot(page, `crop-physics-header-1440-${scheme}.png`, { clip: { x: 0, y: 40, width: 520, height: 200 } });
        await go(page, "sequence");
        r.sequence1440 = await seqPlate(page);
        r.stagger1440 = await stagger(page);
        await shot(page, `sequence-1440-${scheme}.png`);
        await shot(page, `crop-stagger-pane-1440-${scheme}.png`, { clip: { x: 0, y: 40, width: 520, height: 860 } });
        await ctx.close();
    }
    for (const [w, h] of [[390, 844], [375, 667]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
        const page = await ctx.newPage();
        await go(page, "sequence");
        r[`sequence${w}x${h}`] = await seqPlate(page);
        await shot(page, `sequence-${w}x${h}-${scheme}.png`);
        if (w === 390) {
            await go(page, "square");
            r.square390 = await squarePlate(page);
            await shot(page, `square-390-${scheme}.png`);
            await go(page, "easing");
            r.easing390 = await easingType(page);
            await shot(page, `easing-390-${scheme}.png`);
            await go(page, "spring");
            r.spring390 = await squarePlate(page).catch(() => null);
            await shot(page, `spring-390-${scheme}.png`);
        }
        await ctx.close();
    }
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await go(page, "easing");
        r.easing1440 = await easingType(page);
        await ctx.close();
    }
}
await browser.close();
fs.writeFileSync(path.join(OUT, "c16-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
