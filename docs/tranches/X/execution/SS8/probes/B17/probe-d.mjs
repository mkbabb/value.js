// Probe D — engine cells. `node probe-d.mjs chromium` : secondary-line contrast re-sampled at the
// text's own run end (Range rect), 4 cells. `node probe-d.mjs webkit` : the same contrast cells +
// forced-colors + 200%-text in Playwright WebKit (run under guarded --exclusive webkit).
import { chromium, webkit } from "playwright";
import { cell, save, BASE, EVID } from "./lib.mjs";
import { pixels, rgba, over, cr } from "./px.mjs";

const engine = process.argv[2] ?? "chromium";
const GOTO = { waitUntil: "domcontentloaded", timeout: 120000 };
async function settle(page) {
    await page.goto(`${BASE}/#/admin/names`, GOTO);
    await page.waitForSelector('[role="tablist"].segmented-tabs', { timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    await page.mouse.move(2, 2);
}
const lines = () => [...document.querySelectorAll("#admin-names-pending .flex.items-center.gap-3.rounded-md")].slice(0, 3).map((r) => {
    const [p, s] = r.children[1].children;
    const run = (e) => { const g = document.createRange(); g.selectNodeContents(e); const b = g.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; };
    const cs = (e) => { const c = getComputedStyle(e); return { color: c.color, fs: c.fontSize, fw: c.fontWeight, cls: e.className }; };
    return { primary: { run: run(p), ...cs(p) }, secondary: { run: run(s), ...cs(s) }, actionsX: r.children[2].getBoundingClientRect().x };
});
const browser = await (engine === "webkit" ? webkit : chromium).launch({ headless: true });
const out = { engine, version: browser.version() };
try {
    for (const [w, h] of [[1440, 900], [390, 844]]) for (const dark of [false, true]) {
        const key = `contrast-${w}-${dark ? "dark" : "light"}`;
        out[key] = await cell(browser, { dark, viewport: { width: w, height: h } }, async (page) => {
            await settle(page);
            const L = await page.evaluate(lines);
            const shot = await page.screenshot({ path: `${EVID}/d-${engine}-${key}.png` });
            const res = [];
            for (const l of L) {
                const s = l.secondary, p = l.primary;
                const gx = Math.round(Math.min(s.run[0] + s.run[2] + 16, l.actionsX - 8));
                const pts = [[gx, Math.round(s.run[1] + s.run[3] / 2)], [Math.round(Math.min(p.run[0] + p.run[2] + 16, l.actionsX - 8)), Math.round(p.run[1] + p.run[3] / 2)]];
                const [g1, g2] = await pixels(page, shot, pts);
                const [si, pi] = await rgba(page, [s.color, p.color]);
                res.push({ secondary: { ...s, groundAt: pts[0], ground: g1, cr: cr(over(si, g1), g1) }, primary: { fs: p.fs, ground: g2, cr: cr(over(pi, g2), g2) } });
            }
            return { rows: res, minSecondaryCR: Math.min(...res.map((r) => r.secondary.cr)) };
        });
    }
    if (engine === "webkit") {
        for (const dark of [false, true]) out[`forced-${dark ? "dark" : "light"}`] = await cell(browser, { dark, forcedColors: "active" }, async (page) => {
            await settle(page);
            const r = await page.evaluate(() => ({ fc: matchMedia("(forced-colors: active)").matches, row: getComputedStyle(document.querySelector("#admin-names-pending .rounded-md")).borderTopColor, body: getComputedStyle(document.body).backgroundColor }));
            await page.screenshot({ path: `${EVID}/d-webkit-forced-${dark ? "dark" : "light"}.png` });
            return r;
        });
        out.text200 = await cell(browser, {}, async (page) => {
            await settle(page);
            await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
            await page.waitForTimeout(1200);
            const r = await page.evaluate(() => ({ rootFs: getComputedStyle(document.documentElement).fontSize, docScrollW: document.documentElement.scrollWidth, vw: innerWidth,
                rows: [...document.querySelectorAll("#admin-names-pending .flex.items-center.gap-3.rounded-md")].slice(0, 6).map((r) => { const b = r.getBoundingClientRect(), a = r.children[2].getBoundingClientRect(); const sp = [...r.children[1].children]; return { h: Math.round(b.height), actionsRight: Math.round(a.right), rowRight: Math.round(b.right), truncated: sp.map((e) => e.scrollWidth > e.clientWidth), titles: sp.map((e) => e.getAttribute("title")) }; }) }));
            await page.screenshot({ path: `${EVID}/d-webkit-text200.png` });
            return r;
        });
    }
} finally {
    await browser.close();
}
save(`probe-d-${engine}.json`, out);
for (const [k, m] of Object.entries(out)) console.log(k, typeof m === "string" ? m : JSON.stringify(m.rows ? { min: m.minSecondaryCR, s0: m.rows[0].secondary, p0: m.rows[0].primary, err: m.pageErrors } : m).slice(0, 700));
