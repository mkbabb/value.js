// CHALLENGE-C pass-4 probe 7 — the honest number.
// The parked ExtractControls is NOT idle-hot (probe 6: 0 writes at idle). It is
// SIGNAL-hot: it re-renders whenever the live-colour signal moves, even though
// it is detached from the document. Measure the cost in the DEVELOPED k=16
// state, where its style object carries a 634-char gradient that never changes.
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

// develop at k=16
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
    window.__payload = rail.getAttribute("style").length;
    new MutationObserver((rs) => { for (const r of rs) window.__m.push({ connected: r.target.isConnected, len: r.target.getAttribute("style").length, style: r.target.getAttribute("style") }); })
        .observe(rail, { attributes: true, attributeFilter: ["style"] });
});
out("developed payload (chars in the rail's style attribute)", await page.evaluate(() => window.__payload));

// park it
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(2500);
out("park state", await page.evaluate(() => ({ inDocument: document.contains(window.__rail), isConnected: window.__rail.isConnected })));

// find a REAL live-colour control on the picker route
const sliders = await page.evaluate(() => [...document.querySelectorAll('[role="slider"]')].map((e, i) => ({ i, label: e.getAttribute("aria-label"), now: e.getAttribute("aria-valuenow") })));
out("sliders available on /#/", sliders);

await page.evaluate(() => { window.__m.length = 0; window.__t0 = performance.now(); });

// drive every picker slider in turn — this is the live pick moving
for (const s of sliders.slice(0, 3)) {
    await page.evaluate((i) => document.querySelectorAll('[role="slider"]')[i]?.focus(), s.i);
    for (let n = 0; n < 25; n++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(18); }
}
await page.waitForTimeout(800);

out("PARKED + DETACHED cost while the user drives the colour on ANOTHER route", await page.evaluate(() => {
    const m = window.__m, dur = performance.now() - window.__t0;
    const grad = (s) => (s.match(/background-image:\s*([^;]*)/) || [, ""])[1];
    const bgc = (s) => (s.match(/background-color:\s*([^;]*)/) || [, ""])[1];
    return {
        windowMs: Math.round(dur),
        styleAttrMutations: m.length,
        ALL_while_detached: m.length > 0 && m.every((x) => !x.connected),
        anyWhileConnected: m.filter((x) => x.connected).length,
        distinctStyleValues: new Set(m.map((x) => x.style)).size,
        rendersImplied: Math.round(m.length / 3),
        writesPerSecond: +(m.length / (dur / 1000)).toFixed(1),
        charsRewrittenPerSecond: Math.round(m.reduce((s, x) => s + x.len, 0) / (dur / 1000)),
        distinctGradientValues: new Set(m.map((x) => grad(x.style))).size,
        distinctBackgroundColorValues: new Set(m.map((x) => bgc(x.style))).size,
        VERDICT_gradient: new Set(m.map((x) => grad(x.style))).size <= 1
            ? "the 634-char gradient NEVER changed across every write — re-serialised for free on every tick"
            : "gradient changed during the window",
    };
}));

out("pageErrors", pageErrors);
await b.close();
