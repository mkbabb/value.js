// X-DS keyframes pass 11 (the redeployed workflow's pass 7), critic C11 cure
// seat — the AFTER frames for the critic's cells (the route cells come from
// scripts/ds-census.mjs --frames) plus the served measurement behind each
// cure. Headless real Chrome only (COHESION §0ei).
//   node c11-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
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
const facet = async (page, f) => {
    await page.hover('[aria-label="Expand dock"]').catch(() => {});
    await page.waitForTimeout(700);
    await page.locator(`button[aria-label="${f}"]`).first().click({ timeout: 8000 });
    await page.waitForTimeout(2000);
    await page.mouse.move(1300, 850);
    await page.waitForTimeout(600);
};
const paneTitle = (page, text) =>
    page.evaluate((text) => {
        const t = [...document.querySelectorAll(".controls-surface [class*=section-label]")].find((e) => e.getBoundingClientRect().width > 0 && (!text || e.textContent.trim() === text));
        const r = t.getBoundingClientRect();
        return { title: t.textContent.trim(), x: Math.round(r.left), y: Math.round(r.top) };
    }, text);
const toEntry = async (page, w, h) => {
    await go(page, "spring");
    // the bottom dock's band starts at the open rail's edge on desktop
    // (kf f2c1ec07's sibling fc07aff7, ESC-dock-2), so hover the stage column
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
// KF-C11-07 — the card and its verb; the two footer rows' start edges
const entryGroup = (page) =>
    page.evaluate(() => {
        const card = [...document.querySelectorAll(".discrete-card")].find((e) => e.getBoundingClientRect().width > 0);
        const btn = [...document.querySelectorAll(".entry-stage > button")].find((e) => e.getBoundingClientRect().width > 0);
        const trig = [...document.querySelectorAll(".artifact-trigger")].find((e) => e.getBoundingClientRect().width > 0);
        const cap = [...document.querySelectorAll(".entry-caption")].find((e) => e.getBoundingClientRect().width > 0);
        const capInk = cap.firstElementChild.getBoundingClientRect();
        const plate = card.closest("[data-slot=card]").getBoundingClientRect();
        const c = card.getBoundingClientRect(), b = btn.getBoundingClientRect();
        return {
            cardBottom: Math.round(c.bottom), dismissTop: Math.round(b.top), gap: Math.round(b.top - c.bottom),
            dismissToFooter: Math.round(trig.getBoundingClientRect().top - b.bottom),
            artifactRowLeft: Math.round(trig.getBoundingClientRect().left - plate.left),
            artifactInkLeft: Math.round(trig.querySelector("svg").getBoundingClientRect().left - plate.left),
            captionInkLeft: Math.round(capInk.left - plate.left),
        };
    });

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    // 1440 cells
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        // KF-C11-01 — the code well's numerals on the pane's column
        await go(page, "cube");
        await facet(page, "Keyframes");
        r.keyframesFacet = await page.evaluate(() => {
            const f = document.querySelector(".controls-surface").getBoundingClientRect().left;
            const ink = (e) => { const g = document.createRange(); g.selectNodeContents(e); return g.getBoundingClientRect().left; };
            const nums = [...document.querySelectorAll(".code-well .line-numbers")].filter((e) => /^(1|10)$/.test(e.textContent.trim()));
            const title = document.querySelector(".code-well header h3");
            return {
                frameLeft: Math.round(f),
                titleInset: Math.round(ink(title) - f),
                numerals: nums.map((n) => ({ n: n.textContent.trim(), inset: Math.round(ink(n) - f) })),
                gutterWidth: Math.round(document.querySelector(".code-well .margin")?.getBoundingClientRect().width ?? -1),
            };
        });
        r.keyframesFacet.title = await paneTitle(page);
        await shot(page, `facet-keyframes-${scheme}.png`);
        await shot(page, `crop-kf-gutter-${scheme}.png`, { clip: { x: 40, y: 40, width: 260, height: 520 } });
        // KF-C11-03 / -04 — the timeline facet
        await go(page, "cube");
        await facet(page, "Timeline");
        r.timelineFacet = { title: await paneTitle(page, "Timeline") };
        r.timelineFacet.track = await page.evaluate(() => {
            const t = document.querySelector(".timeline-track");
            const cs = getComputedStyle(t);
            return { border: `${cs.borderTopWidth} ${cs.borderTopColor}` };
        });
        await shot(page, `cube-timeline-${scheme}.png`);
        // sibling titles (KF-C11-04's rung)
        await go(page, "easing");
        r.easingTitle = await paneTitle(page, "Easing");
        // KF-C11-06 at 1440
        r.literal1440 = await page.evaluate(() => {
            const c = document.querySelector(".literal-text");
            if (!c) return null;
            const a = c.querySelector(".literal-args");
            const last = [...a.getClientRects()].at(-1);
            const copy = c.nextElementSibling.getBoundingClientRect();
            return { copyGapFromArgs: Math.round(copy.left - last.right), copyCentreVsLastLine: Math.round(copy.top + copy.height / 2 - (last.top + last.height / 2)) };
        });
        await shot(page, `easing-pane-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
        // KF-C11-02 / -05 — the spring Physics pane
        await go(page, "spring");
        r.springTitle = await paneTitle(page, "Physics");
        r.spring = await page.evaluate(() => {
            const s = document.querySelector(".controls-surface").getBoundingClientRect();
            const field = document.querySelector(".spring-heatmap").getBoundingClientRect();
            const x = document.querySelector(".spring-heatmap-x").getBoundingClientRect();
            const ticks = [...document.querySelectorAll(".spring-heatmap-zeta > span")].map((e) => { const b = e.getBoundingClientRect(); return { t: e.textContent.trim(), whole: b.bottom <= s.bottom }; });
            const cell = document.querySelector(".preset-cell");
            const [name, value] = cell.children;
            const w = (e) => `${getComputedStyle(e).fontFamily.split(",")[0]} ${getComputedStyle(e).fontSize} ${getComputedStyle(e).fontWeight}`;
            return {
                surfaceBottom: Math.round(s.bottom), fieldBlock: Math.round(field.height), xAxisBottom: Math.round(x.bottom),
                xAxisAboveFold: x.bottom <= s.bottom, zetaTicksWhole: ticks.every((t) => t.whole),
                presetName: w(name), presetValue: w(value),
            };
        });
        await shot(page, `spring-pane-1440-${scheme}.png`);
        await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
        await page.waitForTimeout(600);
        await shot(page, `presets-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
        // KF-C11-07 — the Entry view
        if (await toEntry(page, 1440, 900).catch((e) => (console.error("entry:", e.message.split("\n")[0]), false))) {
            r.entry1440 = await entryGroup(page);
            await shot(page, `entry-1440-${scheme}.png`);
        } else r.entry1440 = "entry view not reached";
        await ctx.close();
    }
    // 390 cells
    {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true });
        const page = await ctx.newPage();
        await go(page, "easing");
        r.literal390 = await page.evaluate(() => {
            const c = document.querySelector(".literal-text");
            if (!c) return null;
            const a = c.querySelector(".literal-args");
            const last = [...a.getClientRects()].at(-1);
            const copy = c.nextElementSibling.getBoundingClientRect();
            const lh = parseFloat(getComputedStyle(c).lineHeight);
            return { lines: Math.round(c.getBoundingClientRect().height / lh), copyGapFromArgs: Math.round(copy.left - last.right), copyCentreVsLastLine: Math.round(copy.top + copy.height / 2 - (last.top + last.height / 2)) };
        });
        await shot(page, `easing-header-390-${scheme}.png`, { clip: { x: 0, y: 0, width: 390, height: 260 } });
        await ctx.close();
    }
    // the 390 Entry cell runs in a fine-pointer context (O-88; pass 10's note)
    {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme });
        const page = await ctx.newPage();
        if (await toEntry(page, 390, 844).catch((e) => (console.error("entry 390:", e.message.split("\n")[0]), false))) {
            r.entry390 = await entryGroup(page);
            await shot(page, `entry-390-${scheme}.png`);
        } else r.entry390 = "entry view not reached";
        await ctx.close();
    }
}
// KF-C11-05 — the figure at the laptop heights KF-C9-10 calibrated
for (const [w, h] of [[1440, 900], [1280, 760], [1280, 800], [1024, 700], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "spring");
    report[`spring${w}x${h}`] = await page.evaluate(() => {
        const s = document.querySelector(".controls-surface").getBoundingClientRect();
        const f = document.querySelector(".spring-heatmap").getBoundingClientRect();
        const x = document.querySelector(".spring-heatmap-x").getBoundingClientRect();
        return { field: Math.round(f.height), xAxisBottom: Math.round(x.bottom), surfaceBottom: Math.round(s.bottom), xAxisAboveFold: x.bottom <= s.bottom };
    });
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c11-probe.json" : "c11-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
