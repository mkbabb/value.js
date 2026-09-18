// CHALLENGE-C pass-4 probe 6 — the quantitative core.
// DEVELOPED at k=16 the rail's style object carries a ~634-char gradient that
// never changes, in the same object as `trackInk` which changes every tick.
// Vue's patchStyle writes EVERY key on EVERY patch (runtime-dom.cjs.js:445).
// Measure the write rate (a) while VISIBLE and (b) while KeepAlive-PARKED and
// detached from the document. No interaction — the ambient signal alone.
import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(3000);

// develop the plate
await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 220;
    const g = c.getContext("2d");
    for (let i = 0; i < 22; i++) { g.fillStyle = `hsl(${(i * 360) / 22} 85% ${35 + (i % 5) * 9}%)`; g.fillRect((i % 5) * 44, Math.floor(i / 5) * 44, 44, 44); }
    window.__d = c.toDataURL("image/png");
});
const buf = Buffer.from((await page.evaluate(() => window.__d)).split(",")[1], "base64");
await page.locator('input[type="file"]').first().setInputFiles({ name: "p.png", mimeType: "image/png", buffer: buf });
await page.waitForTimeout(2500);
await page.evaluate(() => document.querySelector('[role="slider"][aria-label="Number of colors"]')?.focus());
await page.keyboard.press("End");
await page.waitForTimeout(2500);

await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    window.__rail = rail; window.__m = [];
    new MutationObserver((rs) => { for (const r of rs) window.__m.push({ t: performance.now(), connected: r.target.isConnected, len: r.target.getAttribute("style").length, style: r.target.getAttribute("style") }); })
        .observe(rail, { attributes: true, attributeFilter: ["style"] });
});

const sizes = await page.evaluate(() => {
    const cs = getComputedStyle(window.__rail);
    return {
        k: document.querySelector('[role="slider"][aria-label="Number of colors"]')?.getAttribute("aria-valuenow"),
        gradientLen: cs.backgroundImage.length,
        inlineAttrLen: window.__rail.getAttribute("style").length,
    };
});
out("developed rail — payload size", sizes);

// ---- (a) VISIBLE, idle, 6 s ------------------------------------------
await page.evaluate(() => { window.__m.length = 0; window.__t0 = performance.now(); });
await page.waitForTimeout(6000);
const visible = await page.evaluate(() => {
    const m = window.__m, dur = performance.now() - window.__t0;
    const distinct = new Set(m.map((x) => x.style));
    return { windowMs: Math.round(dur), mutations: m.length, distinctStyleValues: distinct.size,
        writesPerSecond: +(m.length / (dur / 1000)).toFixed(1),
        charsRewrittenPerSecond: Math.round(m.reduce((s, x) => s + x.len, 0) / (dur / 1000)),
        allConnected: m.every((x) => x.connected) };
});
out("(a) VISIBLE on /#/extract, idle, no interaction", visible);

// ---- (b) PARKED (route away), idle, 6 s ------------------------------
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(2000);
const parkState = await page.evaluate(() => ({ inDocument: document.contains(window.__rail), isConnected: window.__rail.isConnected }));
out("park state after route change", parkState);

await page.evaluate(() => { window.__m.length = 0; window.__t0 = performance.now(); });
await page.waitForTimeout(6000);
const parked = await page.evaluate(() => {
    const m = window.__m, dur = performance.now() - window.__t0;
    return { windowMs: Math.round(dur), mutations: m.length, distinctStyleValues: new Set(m.map((x) => x.style)).size,
        writesPerSecond: +(m.length / (dur / 1000)).toFixed(1),
        charsRewrittenPerSecond: Math.round(m.reduce((s, x) => s + x.len, 0) / (dur / 1000)),
        anyConnected: m.some((x) => x.connected),
        allDetached: m.length > 0 && m.every((x) => !x.connected) };
});
out("(b) PARKED + DETACHED, idle, no interaction — off-route work", parked);

// does the gradient portion of the style attr actually change between writes?
out("does the INVARIANT gradient get re-written?", await page.evaluate(() => {
    const m = window.__m;
    const grad = (s) => (s.match(/background-image:\s*([^;]*)/) || [, ""])[1];
    const bg = (s) => (s.match(/background-color:\s*([^;]*)/) || [, ""])[1];
    const gs = new Set(m.map((x) => grad(x.style))), bs = new Set(m.map((x) => bg(x.style)));
    return { writes: m.length, distinctGradientValues: gs.size, distinctBackgroundColorValues: bs.size,
        conclusion: gs.size <= 1 && m.length > 1
            ? "the gradient NEVER changed across all writes — it is re-serialised for free every tick"
            : "gradient changed" };
}));

out("pageErrors", pageErrors);
await b.close();
