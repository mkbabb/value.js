// X-DS keyframes pass 12 (the redeployed workflow's pass 8), critic C12 cure
// seat — the AFTER frames for the critic's cells (the route cells come from
// scripts/ds-census.mjs --frames) plus the served measurement behind each
// cure. Headless real Chrome only (COHESION §0ei).
//   node c12-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
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
        };
    });
// KF-C12-02 / -04 — the Entry footer: the preset name and the copy pair's ink gap
const entryFooter = (page) =>
    page.evaluate(() => {
        const vis = (sel) => [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
        const trig = vis(".artifact-trigger");
        const label = trig.querySelector("span");
        const g = document.createRange();
        g.selectNodeContents(label);
        const labelInk = g.getBoundingClientRect();
        const copy = trig.closest("div").lastElementChild;
        const copyInk = [...copy.querySelectorAll("svg")].find((e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).opacity !== "0").getBoundingClientRect();
        const name = vis(".entry-preset");
        const cs = name ? getComputedStyle(name) : null;
        return {
            copyInkGap: Math.round(copyInk.left - labelInk.right),
            copyCentreVsLabel: Math.round(copyInk.top + copyInk.height / 2 - (labelInk.top + labelInk.height / 2)),
            preset: name ? { text: name.textContent.trim(), weight: cs.fontWeight, color: cs.color, background: cs.backgroundColor, shadow: cs.boxShadow } : null,
            chipLeft: !!document.querySelector(".entry-caption [data-slot=chip], .entry-caption .glass-chip"),
        };
    });
// the sibling pair (KF-C11-06): the literal's last ink to Copy's glyph
const literalPair = (page) =>
    page.evaluate(() => {
        const c = document.querySelector(".literal-text");
        if (!c) return null;
        const a = c.querySelector(".literal-args");
        const g = document.createRange();
        g.selectNodeContents(a);
        const last = [...g.getClientRects()].at(-1);
        const copy = c.nextElementSibling;
        const ink = [...copy.querySelectorAll("svg")].find((e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).opacity !== "0").getBoundingClientRect();
        return { copyInkGap: Math.round(ink.left - last.right) };
    });

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await go(page, "easing");
        r.literal1440 = await literalPair(page);
        await go(page, "spring");
        r.spring1440 = await springAxis(page);
        await shot(page, `spring-pane-1440-${scheme}.png`);
        await shot(page, `crop-spring-axis-${scheme}.png`, { clip: { x: 0, y: 300, width: 520, height: 260 } });
        await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
        await page.waitForTimeout(600);
        await shot(page, `presets-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
        if (await toEntry(page, 1440, 900).catch((e) => (console.error("entry:", e.message.split("\n")[0]), false))) {
            r.entry1440 = await entryFooter(page);
            await shot(page, `entry-1440-${scheme}.png`);
            await shot(page, `crop-entry-footer-1440-${scheme}.png`, { clip: { x: 480, y: 640, width: 960, height: 260 } });
        } else r.entry1440 = "entry view not reached";
        await ctx.close();
    }
    {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true });
        const page = await ctx.newPage();
        await go(page, "easing");
        r.literal390 = await literalPair(page);
        await ctx.close();
    }
    {
        // the 390 Entry cell runs in a fine-pointer context (O-88; pass 10's note)
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme });
        const page = await ctx.newPage();
        if (await toEntry(page, 390, 844).catch((e) => (console.error("entry 390:", e.message.split("\n")[0]), false))) {
            r.entry390 = await entryFooter(page);
            await shot(page, `entry-390-${scheme}.png`);
        } else r.entry390 = "entry view not reached";
        await ctx.close();
    }
}
for (const [w, h] of [[1440, 900], [1280, 760], [1280, 800], [1024, 700], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "spring");
    report[`spring${w}x${h}`] = await springAxis(page);
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c12-probe.json" : "c12-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
