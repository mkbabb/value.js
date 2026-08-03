// CHALLENGE-C pass-4 probe 1 — does the KeepAlive-PARKED ExtractControls keep
// re-rendering (and re-certifying `trackInk`) while detached from the document?
// Read-only: navigates, observes, never edits source.
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

// Pin the rail node + install a style-attribute MutationObserver that survives
// detachment (MutationObserver observes detached nodes just fine).
await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    window.__rail = rail;
    window.__railMuts = [];
    window.__obs = new MutationObserver((recs) => {
        for (const r of recs)
            window.__railMuts.push({
                t: Math.round(performance.now()),
                connected: r.target.isConnected,
                style: r.target.getAttribute("style"),
            });
    });
    window.__obs.observe(rail, { attributes: true, attributeFilter: ["style"] });
});

out("ON /#/extract — rail state", await page.evaluate(() => ({
    connected: window.__rail.isConnected,
    style: window.__rail.getAttribute("style"),
})));

// ---- Navigate AWAY. KeepAlive should park the pane. --------------------
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(2500);

out("AFTER route change to /#/ — is the rail still in the document?", await page.evaluate(() => ({
    railStillInDocument: document.contains(window.__rail),
    isConnected: window.__rail.isConnected,
    parentTag: window.__rail.parentElement?.tagName ?? null,
    inMain: !!window.__rail.closest("main"),
    railInDomQuery: !!document.querySelector('[data-o18="extract-k-rail"]'),
})));

// Baseline: clear the mutation log, then drive the LIVE COLOUR on the home
// route and see whether the PARKED rail's inline style keeps being patched.
await page.evaluate(() => { window.__railMuts.length = 0; });

// Drive the colour via the app's own URL contract (?color=) — no source edits.
const colors = ["oklch(0.7 0.2 30)", "oklch(0.5 0.15 220)", "oklch(0.8 0.1 140)", "oklch(0.4 0.22 300)"];
for (const c of colors) {
    await page.evaluate((c) => {
        // the picker's own hue slider is the live signal; drive it by keyboard
        const s = document.querySelector('[role="slider"]');
        if (s) { s.focus(); }
        window.__lastDriven = c;
    }, c);
    for (let i = 0; i < 12; i++) {
        await page.keyboard.press("ArrowRight");
        await page.waitForTimeout(20);
    }
    await page.waitForTimeout(300);
}
await page.waitForTimeout(1000);

const muts = await page.evaluate(() => window.__railMuts);
out("PARKED-RAIL style mutations while OFF the extract route", {
    totalMutations: muts.length,
    anyWhileDetached: muts.filter((m) => !m.connected).length,
    firstFive: muts.slice(0, 5),
    lastTwo: muts.slice(-2),
    distinctStyles: [...new Set(muts.map((m) => m.style))].length,
});

// ---- Cost: time one full re-render of the parked subtree ---------------
// Measure how long the app spends in style/recalc attributable to the parked
// rail by counting mutations per second over a fixed window.
await page.evaluate(() => { window.__railMuts.length = 0; });
const t0 = Date.now();
for (let i = 0; i < 60; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(16); }
await page.waitForTimeout(500);
const elapsed = Date.now() - t0;
const muts2 = await page.evaluate(() => window.__railMuts.length);
out("PARKED-RAIL mutation RATE", {
    windowMs: elapsed,
    mutations: muts2,
    mutationsPerSecond: +(muts2 / (elapsed / 1000)).toFixed(1),
});

out("pageErrors", pageErrors);
await b.close();
