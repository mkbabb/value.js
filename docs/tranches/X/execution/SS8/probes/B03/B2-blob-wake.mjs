// B03 · B2 — #/blob follow-ups: (1) wake shape with GL draw counting, idle arm + PRM-parked arm;
// (2) focus-ring change-contrast across the whole track, light + dark; (3) which pane the route opens on
// per CSS-viewport width (incl. the 200%-zoom cell 720x450). One chromium browser; one context per cell.
import { chromium } from "playwright";
import { BASE, EV, sha, save, decoder, meanAbsDelta, contrast } from "./lib.mjs";

const out = {};
const browser = await chromium.launch();
const INIT = () => {
    window.__draws = 0;
    for (const P of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype]) {
        if (!P) continue;
        for (const fn of ["drawArrays", "drawElements"]) { const o = P[fn]; P[fn] = function (...a) { window.__draws++; return o.apply(this, a); }; }
    }
};
const draws = (page) => page.evaluate(() => window.__draws);
const thumb = (page, name) => page.locator(`[data-slot=configurator-row] [role=slider][aria-label="${name}"]`).first();

async function wakeCell(prm) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: prm ? "reduce" : "no-preference" });
    try {
        await ctx.addInitScript(INIT);
        const page = await ctx.newPage();
        await page.goto(BASE + "#/blob", { waitUntil: "load", timeout: 90000 });
        await page.waitForTimeout(6000);
        await page.mouse.move(1430, 890);
        const dec = await decoder(ctx);
        const cb = await page.locator(".goo-blob-canvas").boundingBox();
        const clip = { x: cb.x, y: cb.y, width: cb.width, height: cb.height };
        const idle = [];
        for (let i = 0; i < 3; i++) { const d0 = await draws(page); await page.waitForTimeout(1000); idle.push((await draws(page)) - d0); }
        const r = { prm: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), idleDrawsPerS: idle, leaves: [] };
        for (const [name, key, label] of [["Smoothness", "End", "membrane.smoothK"], ["Warp", "End", "membrane.warpAmp"], ["Noise amplitude", "End", "membrane.noiseAmp"], ["Hue range", "End", "color.hueRange"], ["Satellites", "Home", "geometry.satelliteCount 3→0"], ["Body radius", "End", "geometry.bodyRadius"]]) {
            const t = thumb(page, name);
            if (!(await t.count())) { r.leaves.push({ leaf: label, missing: true }); continue; }
            const qd0 = await draws(page); await page.waitForTimeout(800); const quietDraws = (await draws(page)) - qd0;
            const before = await page.screenshot({ clip });
            const vb = await t.getAttribute("aria-valuenow");
            const d0 = await draws(page);
            await t.focus(); await page.keyboard.press(key); await t.blur(); await page.mouse.move(1430, 890);
            await page.waitForTimeout(1500);
            const after = await page.screenshot({ clip });
            r.leaves.push({ leaf: label, valBefore: vb, valAfter: await t.getAttribute("aria-valuenow"), drawsQuiet800ms: quietDraws, drawsIn1500msAfterWrite: (await draws(page)) - d0, frameDelta: meanAbsDelta(await dec(before), await dec(after)), identical: sha(before) === sha(after) });
        }
        return r;
    } finally { await ctx.close(); }
}

async function focusCell(scheme) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/blob", { waitUntil: "load", timeout: 90000 });
        await page.waitForTimeout(2500);
        const dec = await decoder(ctx);
        const t = thumb(page, "Body radius");
        await t.scrollIntoViewIfNeeded();
        const tr = await page.locator("[data-slot=configurator-row]").first().locator(".slider-track").boundingBox();
        const clip = { x: tr.x - 8, y: tr.y - 8, width: tr.width + 16, height: tr.height + 16 };
        await page.mouse.move(1430, 890);
        const unf = await dec(await page.screenshot({ clip }));
        await page.keyboard.press("Shift");
        await t.focus();
        await page.waitForTimeout(600);
        const buf = await page.screenshot({ clip });
        const foc = await dec(buf);
        const style = await page.locator("[data-slot=configurator-row]").first().locator(".slider-track").evaluate((e) => ({ boxShadow: getComputedStyle(e).boxShadow, thumbFV: !!e.closest(".glass-slider")?.querySelector(":focus-visible"), ring: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-shadow").trim().slice(0, 160) }));
        const ratios = [];
        for (let i = 0; i < foc.d.length; i += 4) { const a = [foc.d[i], foc.d[i + 1], foc.d[i + 2]], b = [unf.d[i], unf.d[i + 1], unf.d[i + 2]]; if (Math.max(...a.map((v, k) => Math.abs(v - b[k]))) > 12) ratios.push(contrast(a, b)); }
        ratios.sort((a, b) => a - b);
        await page.screenshot({ path: EV + `B2-focus-track-${scheme}.png`, clip: { x: clip.x, y: clip.y - 20, width: clip.width, height: clip.height + 40 } });
        return { scheme, style, changedPx: ratios.length, min: ratios[0] ?? null, median: ratios[Math.floor(ratios.length / 2)] ?? null, p90: ratios[Math.floor(ratios.length * 0.9)] ?? null, max: ratios[ratios.length - 1] ?? null, ge3: ratios.filter((x) => x >= 3).length };
    } finally { await ctx.close(); }
}

async function routeCell(w, h) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/blob", { waitUntil: "load", timeout: 90000 });
        await page.waitForTimeout(2500);
        return { vp: `${w}x${h}`, ...(await page.evaluate(() => {
            const panes = [...document.querySelectorAll(".pane-shell")].filter((p) => !p.parentElement.closest(".pane-shell"));
            const name = (p) => (p.querySelector("h1,h2")?.textContent ?? "").trim().slice(0, 16) || (p.querySelector(".goo-blob-canvas") ? "Picker" : "?");
            const at = document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest(".pane-shell");
            let top = at; while (top?.parentElement?.closest(".pane-shell")) top = top.parentElement.closest(".pane-shell");
            return { panes: panes.map((p) => { const b = p.getBoundingClientRect(); return { name: name(p), x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), inView: b.right > 0 && b.left < innerWidth && b.bottom > 0 && b.top < innerHeight && p.checkVisibility() }; }), atCentre: top ? name(top) : null };
        })) };
    } finally { await ctx.close(); }
}

try {
    out.wakeIdle = await wakeCell(false);
    out.wakePRM = await wakeCell(true);
    out.focusLight = await focusCell("light");
    out.focusDark = await focusCell("dark");
    out.routes = [];
    for (const [w, h] of [[1440, 900], [1280, 800], [1024, 768], [1023, 768], [960, 900], [800, 900], [720, 450], [390, 844]]) out.routes.push(await routeCell(w, h));
} finally { await browser.close(); }
save("B2-blob-wake.json", out);
console.log(JSON.stringify(out).slice(0, 8000));
