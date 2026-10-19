// SS8 · B10-browse · SearchFilterBar cells. usage: node sfb.mjs <engine> <cell,...>
// engine = chromium | webkit (webkit ONLY via guarded --exclusive webkit, R-1/R-10 only).
import { chromium, webkit } from "playwright";
import path from "node:path";
import { APP, EVID, save, routeStub, sleep } from "./lib.mjs";

const engine = process.argv[2] === "webkit" ? webkit : chromium;
const ename = process.argv[2] === "webkit" ? "webkit" : "chromium";
const want = new Set((process.argv[3] ?? "").split(",").filter(Boolean));
const out = { engine: ename };
const TAGS = Array.from({ length: 10 }, (_, i) => ({ id: `t${i}`, name: ["warm", "cool", "pastel", "earthy", "neon", "monochrome", "vintage", "ocean-inspired palettes", "autumn", "brand"][i], category: "mood" }));

async function openWall(ctx, page, vp) {
    await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll(".palette-card").length >= 12, null, { timeout: 30000 });
    await sleep(1200);
}
async function openFilters(page) {
    await page.click('button[aria-label^="Filters"]');
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    await sleep(700);
}
const popRect = (page) => page.evaluate(() => { const d = [...document.querySelectorAll('[role="dialog"]')].pop(); const r = d.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height, sh: d.scrollHeight, ch: d.clientHeight, oy: getComputedStyle(d).overflowY, maxH: getComputedStyle(d).maxHeight }; });

async function cell(browser, vp, fn, opts = {}) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: opts.dsf ?? 1, ...(opts.ctx ?? {}) });
    try {
        await routeStub(ctx, { first: 12, tags: TAGS });
        const page = await ctx.newPage();
        await openWall(ctx, page, vp);
        return await fn(page);
    } finally { await ctx.close(); }
}

const CELLS = {
    // R-1 — swatch settled focus state after a real keyboard Tab (≥300 ms)
    async r1(browser) {
        out.r1 = await cell(browser, { width: 1280, height: 900 }, async (page) => {
            await page.focus('button[aria-label^="Filters"]');
            await page.keyboard.press("Enter");
            await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
            await sleep(600);
            const sw = 'button[aria-label^="Open color picker"]';
            const baseline = await page.evaluate((s) => { const e = document.querySelector(s); const c = getComputedStyle(e); return { boxShadow: c.boxShadow, outline: c.outlineStyle + " " + c.outlineWidth, transition: c.transitionProperty, classes: e.className }; }, sw);
            let presses = 0, hit = false;
            for (; presses < 25; presses++) {
                hit = await page.evaluate(() => (document.activeElement?.getAttribute("aria-label") ?? "").startsWith("Open color picker"));
                if (hit) break;
                await page.keyboard.press("Tab");
                await sleep(60);
            }
            await sleep(450);
            const settled = await page.evaluate((s) => { const e = document.querySelector(s); const c = getComputedStyle(e); return { focusVisible: e.matches(":focus-visible"), focused: document.activeElement === e, boxShadow: c.boxShadow, outline: c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor }; }, sw);
            const r = await page.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }, sw);
            await page.screenshot({ path: path.join(EVID, `r1-swatch-focus-${ename}.png`), clip: { x: r[0] - 14, y: r[1] - 14, width: r[2] + 28, height: r[3] + 28 } });
            return { tabPresses: presses, reached: hit, baseline, settled };
        });
    },
    // R-2 — popover occlusion of the viewport / visible wall, two viewports
    async r2(browser) {
        out.r2 = {};
        for (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
            out.r2[`${vp.width}x${vp.height}`] = await cell(browser, vp, async (page) => {
                await openFilters(page);
                const p = await popRect(page);
                const wall = await page.evaluate(() => { const g = document.querySelector(".palette-card").parentElement.getBoundingClientRect(); return { l: g.left, t: Math.max(0, g.top), r: g.right, b: Math.min(innerHeight, g.bottom) }; });
                const inter = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
                const vpr = { l: 0, t: 0, r: vp.width, b: vp.height };
                const pv = { l: p.l, t: p.t, r: p.r, b: p.b };
                await page.screenshot({ path: path.join(EVID, `r2-popover-${vp.width}.png`) });
                return { popover: p, viewportOccludedPct: +(100 * inter(pv, vpr) / (vp.width * vp.height)).toFixed(1), visibleWallOccludedPct: +(100 * inter(pv, wall) / Math.max(1, (wall.r - wall.l) * (wall.b - wall.t))).toFixed(1) };
            });
        }
    },
    // R-4 — 200% zoom (1280×800 at 2× = 640×400 CSS px): reachability of the menu's controls
    async r4(browser) {
        out.r4 = await cell(browser, { width: 640, height: 400 }, async (page) => {
            await page.focus('button[aria-label^="Filters"]');
            await page.keyboard.press("Enter");
            await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
            await sleep(700);
            const p = await popRect(page);
            const ctrls = await page.evaluate(() => { const d = [...document.querySelectorAll('[role="dialog"]')].pop(); return [...d.querySelectorAll("button, input, [tabindex]:not([tabindex='-1'])")].filter((e) => !e.disabled).length; });
            const seen = []; let inView = 0;
            for (let i = 0; i < ctrls + 2; i++) {
                const s = await page.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); const d = [...document.querySelectorAll('[role="dialog"]')].pop(); return { lab: (a.getAttribute("aria-label") ?? a.innerText ?? "").trim().slice(0, 24), inDialog: !!d?.contains(a), visible: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && r.height > 0 }; });
                if (s.inDialog && !seen.find((x) => x.lab === s.lab)) { seen.push(s); if (s.visible) inView++; }
                await page.keyboard.press("Tab"); await sleep(80);
            }
            await page.screenshot({ path: path.join(EVID, "r4-zoom200-640x400.png") });
            return { popover: p, popoverVisibleHeightPct: +(100 * (Math.min(400, p.b) - Math.max(0, p.t)) / p.h).toFixed(1), controls: ctrls, reachedByTab: seen.length, visibleWhenFocused: inView, sample: seen.slice(0, 20) };
        });
    },
    // R-5 R-6 R-7 — the menu geometry as served at HEAD (10-tag stub catalogue)
    async geo(browser) {
        out.geo = await cell(browser, { width: 1280, height: 900 }, async (page) => {
            await openFilters(page);
            return page.evaluate(() => {
                const d = [...document.querySelectorAll('[role="dialog"]')].pop();
                const dr = d.getBoundingClientRect();
                const secs = [...d.querySelectorAll("section.filter-section")].map((s) => { const r = s.getBoundingClientRect(); return { label: s.querySelector("label")?.innerText?.trim(), h: +r.height.toFixed(2), areaPct: +(100 * r.width * r.height / (dr.width * dr.height)).toFixed(1) }; });
                const tog = [...d.querySelectorAll('[role="group"] button, [role="radiogroup"] [role="radio"], [data-reka-collection-item]')].map((b) => { const r = b.getBoundingClientRect(); return { t: (b.innerText ?? "").trim(), x: +r.left.toFixed(2), y: +r.top.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) }; });
                const chips = [...d.querySelectorAll('[aria-pressed], [role="checkbox"], [role="option"]')].map((b) => { const r = b.getBoundingClientRect(); return { t: (b.innerText ?? "").trim().slice(0, 24), x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; });
                const scrollers = [...d.querySelectorAll("*")].filter((e) => /(auto|scroll)/.test(getComputedStyle(e).overflowY + getComputedStyle(e).overflowX) && e.scrollHeight > 0).map((e) => ({ cls: String(e.className).slice(0, 60), ch: e.clientHeight, sh: e.scrollHeight, cw: e.clientWidth, sw: e.scrollWidth }));
                const labels = [...d.querySelectorAll("label")].map((l) => { const r = l.getBoundingClientRect(); return { t: l.innerText.trim().slice(0, 20), w: +r.width.toFixed(1) }; });
                return { popover: { w: dr.width, h: dr.height }, sections: secs, toggles: tog, chips, scrollers, radios: d.querySelectorAll('input[type="radio"], [role="radio"]').length, checkboxes: d.querySelectorAll('[role="checkbox"], input[type="checkbox"]').length, labels };
            });
        });
        // screenshot of the menu
    },
    // R-8 — click-outside close: where does focus land? (one cell; PLAUSIBLE carried)
    async r8(browser) {
        out.r8 = await cell(browser, { width: 1280, height: 900 }, async (page) => {
            const ae = () => page.evaluate(() => { const a = document.activeElement; return `${a.tagName}${a.getAttribute("aria-label") ? "[" + a.getAttribute("aria-label") + "]" : ""}`; });
            await page.focus('button[aria-label^="Filters"]');
            await page.keyboard.press("Enter"); await page.waitForSelector('[role="dialog"]'); await sleep(500);
            const inside = await ae();
            await page.mouse.click(20, 880); await sleep(700);
            const afterOutside = await ae();
            const open1 = await page.locator('[role="dialog"]').count();
            await page.focus('button[aria-label^="Filters"]');
            await page.keyboard.press("Enter"); await page.waitForSelector('[role="dialog"]'); await sleep(500);
            await page.keyboard.press("Escape"); await sleep(500);
            return { focusInsideOnOpen: inside, afterClickOutside: afterOutside, dialogsAfterClickOutside: open1, afterEscape: await ae() };
        });
    },
    // R-10 — tab traversal through the open menu (engine comparison)
    async r10(browser) {
        out.r10 = await cell(browser, { width: 1280, height: 900 }, async (page) => {
            await page.focus('button[aria-label^="Filters"]');
            await page.keyboard.press("Enter"); await page.waitForSelector('[role="dialog"]'); await sleep(500);
            const seq = [];
            for (let i = 0; i < 20; i++) {
                seq.push(await page.evaluate(() => { const a = document.activeElement; const d = [...document.querySelectorAll('[role="dialog"]')].pop(); return (d?.contains(a) ? "" : "OUT:") + a.tagName + ":" + (a.getAttribute("aria-label") ?? a.innerText ?? "").trim().slice(0, 18); }));
                await page.keyboard.press("Tab"); await sleep(70);
            }
            return { seq };
        });
    },
};

const browser = await engine.launch();
try {
    for (const [k, fn] of Object.entries(CELLS)) {
        if (want.size && !want.has(k)) continue;
        try { await fn(browser); } catch (e) { out[k + "_error"] = String(e).slice(0, 400); }
    }
} finally { await browser.close(); }
save(`sfb-${ename}-${[...want].join("+") || "all"}.json`, out);
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
