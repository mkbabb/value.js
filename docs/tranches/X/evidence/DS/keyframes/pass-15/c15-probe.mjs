// X-DS keyframes pass 15 (the redeployed workflow's pass 11), critic C15 cure
// seat (adapted from pass-14/c14-probe.mjs) — the AFTER frames for the critic's
// cells plus the served measurement behind each cure. Headless real Chrome only
// (COHESION §0ei).   node c15-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
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
// KF-C15-01 — the figure's row, its state, and any blank band in the scroll body
const springPane = (page) =>
    page.evaluate(() => {
        const sEl = [...document.querySelectorAll(".controls-surface")].find((e) => e.getBoundingClientRect().width > 0);
        const s = sEl.getBoundingClientRect();
        const fade = parseFloat(getComputedStyle(sEl).getPropertyValue("--surface-fade-end")) || 0;
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
        const trig = document.querySelector("[data-figure-title]");
        const section = document.querySelector(".spring-heatmap-section");
        const x = document.querySelector(".spring-heatmap-x");
        // the lowest inked descendant of the scroll body (excluding the scroller itself)
        let contentBottom = 0;
        for (const el of sEl.querySelectorAll("*")) { const b = el.getBoundingClientRect(); if (b.height > 0 && b.width > 0 && b.bottom > contentBottom) contentBottom = b.bottom; }
        return {
            fold: Math.round(s.bottom), fadeStart: Math.round(s.bottom - fade),
            scroll: { top: Math.round(sEl.scrollTop), height: sEl.scrollHeight, client: sEl.clientHeight, overflow: sEl.scrollHeight - sEl.clientHeight },
            figureExpanded: trig?.getAttribute("aria-expanded"),
            row: r(trig), rowAboveFade: trig ? trig.getBoundingClientRect().bottom <= s.bottom - fade : null,
            section: r(section), sectionMarginTop: section ? getComputedStyle(section).marginBlockStart : null,
            sectionDisplay: section ? getComputedStyle(section).display : null,
            axis: r(x), axisAboveFade: x ? x.getBoundingClientRect().bottom <= s.bottom - fade : null,
            presets: r(document.querySelector(".preset-grid")),
            contentBottom: Math.round(contentBottom),
            voidBelowContent: Math.max(0, Math.round(Math.min(s.bottom, sEl.getBoundingClientRect().top + sEl.scrollHeight - sEl.scrollTop) - contentBottom)),
        };
    });
// KF-C15-02 — the Sequence plate against its stage cell, and the lanes in it
const seqPlate = (page) =>
    page.evaluate(() => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
        const plate = [...document.querySelectorAll(".seq-target")].find((e) => e.getBoundingClientRect().width > 0);
        const rows = plate?.querySelector(".seq-rows");
        const head = plate?.querySelector(".seq-header");
        const p = plate?.getBoundingClientRect(), rw = rows?.getBoundingClientRect(), h = head?.getBoundingClientRect();
        return {
            plate: r(plate), header: r(head), lanes: r(rows),
            lanesGapAbove: p && rw && h ? Math.round(rw.top - h.bottom) : null,
            lanesGapBelow: p && rw ? Math.round(p.bottom - rw.bottom) : null,
            rowPitch: (() => { const rs = [...(plate?.querySelectorAll(".seq-row") ?? [])].map((e) => e.getBoundingClientRect().top); return rs.length > 1 ? Math.round((rs.at(-1) - rs[0]) / (rs.length - 1) * 10) / 10 : null; })(),
            overflowing: plate ? plate.scrollHeight > plate.clientHeight + 1 : null,
        };
    });

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await go(page, "spring");
        r.spring1440 = await springPane(page);
        await shot(page, `spring-pane-1440-${scheme}.png`);
        await shot(page, `presets-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
        await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
        await page.waitForTimeout(600);
        r.spring1440Scrolled = await springPane(page);
        await shot(page, `crop-spring-figure-scrolled-${scheme}.png`, { clip: { x: 0, y: 40, width: 520, height: 520 } });
        // the reader opens the row: the figure is whole once scrolled to it
        await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = 0; });
        await page.locator("[data-figure-title]").first().click();
        await page.waitForTimeout(800);
        await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
        await page.waitForTimeout(600);
        r.spring1440Opened = await springPane(page);
        await shot(page, `crop-spring-figure-opened-${scheme}.png`, { clip: { x: 0, y: 40, width: 520, height: 820 } });
        if (await toEntry(page, 1440, 900).catch((e) => (console.error("entry:", e.message.split("\n")[0]), false))) {
            await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = 0; });
            await page.waitForTimeout(600);
            r.entry1440 = await springPane(page).catch(() => null);
            await shot(page, `entry-1440-${scheme}.png`);
        } else r.entry1440 = "entry view not reached";
        await go(page, "sequence");
        r.sequence1440 = await seqPlate(page);
        await shot(page, `sequence-1440-${scheme}.png`);
        await ctx.close();
    }
    {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true });
        const page = await ctx.newPage();
        await go(page, "sequence");
        r.sequence390 = await seqPlate(page);
        await shot(page, `sequence-390-${scheme}.png`);
        await go(page, "spring");
        r.spring390 = await springPane(page).catch((e) => e.message.split("\n")[0]);
        await ctx.close();
    }
}
for (const [w, h] of [[1440, 1080], [1280, 1080], [1280, 760], [1024, 700]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "spring");
    report[`spring${w}x${h}`] = await springPane(page);
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c15-probe.json" : "c15-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report));
await browser.close();
