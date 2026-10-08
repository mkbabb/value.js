// X-DS keyframes pass 17 (the redeployed workflow's pass 13), critic C17 cure seat
// (adapted from pass-16/c16-probe.mjs): the AFTER frames for the critic's cells and
// the served measurement behind each cure. Headless real Chrome only (COHESION §0ei).
//   node c17-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
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
// KF-C17-01 — the live ball against the sampler and the readouts at rest
const springRest = (page) =>
    page.evaluate(() => {
        const vis = (sel) => [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
        const c = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.left + b.width / 2), Math.round(b.top + b.height / 2)]; };
        const balls = [...document.querySelectorAll(".curve-ball")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => ({ cls: e.getAttribute("class"), c: c(e) }));
        const rail = vis(".spring-rail[role=slider]");
        return { carriages: balls.slice(0, 12), railValueNow: rail?.getAttribute("aria-valuenow"), text: document.body.innerText.match(/position[^\n]{0,20}|settled|SETTLED/gi)?.slice(0, 4) };
    });
// KF-C17-02 — what holds focus on load
const focusAtLoad = (page) =>
    page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a?.tagName, label: a?.getAttribute("aria-label") ?? a?.textContent?.trim().slice(0, 20), focusVisible: a ? a.matches(":focus-visible") : null, inSheet: !!a?.closest(".controls-drawer-content") };
    });
// KF-C17-03 — the Sequence plate's wrapper clip
const seqWrap = (page) =>
    page.evaluate(() => {
        const plate = [...document.querySelectorAll(".seq-target")].find((e) => e.getBoundingClientRect().width > 0);
        const w = plate?.parentElement;
        return { wrapperOverflow: w ? getComputedStyle(w).overflow : null, plateOverflow: plate ? getComputedStyle(plate).overflow : null, plateShadow: plate ? getComputedStyle(plate).boxShadow.slice(0, 80) : null };
    });
// KF-C17-04 — repeat captures at one percent
const toasts = async (page) => {
    await page.hover('[aria-label="Expand dock"]').catch(() => {});
    await page.waitForTimeout(700);
    await page.locator('button[aria-label="Timeline"]').first().click({ timeout: 8000 });
    await page.waitForTimeout(2000);
    await page.mouse.move(1300, 850);
    await page.waitForTimeout(600);
    const snap = page.locator("button:visible", { hasText: /snapshot/i }).first();
    if (!(await snap.count())) return { snapshotButton: false };
    for (let i = 0; i < 3; i++) { await snap.click(); await page.waitForTimeout(700); }
    await page.waitForTimeout(1200);
    return page.evaluate(() => ({ snapshots: 3, capturedToastsShown: [...document.querySelectorAll("li")].filter((e) => /captured at/i.test(e.textContent) && e.getBoundingClientRect().width > 0).length }));
};

for (const scheme of SCHEMES) {
    const r = (report[scheme] = {});
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await go(page, "spring");
        r.spring1440 = await springRest(page);
        r.focus1440 = await focusAtLoad(page);
        await shot(page, `spring-1440-${scheme}.png`);
        await shot(page, `spring-pane-1440-${scheme}.png`);
        // a real chase still parks the ball at the curve's end
        const rail = page.locator(".spring-rail[role=slider]").first();
        const bb = await rail.boundingBox();
        await page.mouse.click(bb.x + bb.width * 0.9, bb.y + bb.height / 2);
        await page.waitForTimeout(4500);
        r.spring1440AfterChase = await springRest(page);
        await shot(page, `spring-chased-1440-${scheme}.png`);
        await go(page, "sequence");
        r.sequence1440 = await seqWrap(page);
        await shot(page, `sequence-1440-${scheme}.png`);
        await go(page, "square");
        r.toasts1440 = await toasts(page);
        await shot(page, `square-timeline-${scheme}.png`);
        await ctx.close();
    }
    for (const [w, h] of [[390, 844], [375, 667]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
        const page = await ctx.newPage();
        await go(page, "sequence");
        r[`sequence${w}x${h}`] = { ...(await seqWrap(page)), focus: await focusAtLoad(page) };
        await shot(page, `sequence-${w}x${h}-${scheme}.png`);
        if (w === 390) {
            await go(page, "cube");
            r.cube390focus = await focusAtLoad(page);
            await go(page, "spring");
            r.spring390 = { ...(await springRest(page)), focus: await focusAtLoad(page) };
            await shot(page, `spring-390-${scheme}.png`);
        }
        await ctx.close();
    }
}
await browser.close();
fs.writeFileSync(path.join(OUT, "c17-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
