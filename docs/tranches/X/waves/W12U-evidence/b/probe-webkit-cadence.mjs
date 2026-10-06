// SERVED MODEL: claude-opus-5-5
// X.W12U.b — headless WebKit's idle rAF cadence (the oracles-safari project),
// hero live vs hero parked (PRM) vs a blank page: is a 16.7 ms p50 the hero's
// cost or the engine's 60 Hz frame clock?
// Usage: node probe-webkit-cadence.mjs [origin] (default :9000).
import { webkit } from "@playwright/test";

const ORIGIN = process.argv[2] ?? "http://localhost:9000";
const browser = await webkit.launch({ headless: true });
const init = () => {
    window.__f = [];
    let last = performance.now();
    const tick = (t) => { window.__f.push(t - last); last = t; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
};
const read = async (page) => {
    const rows = [];
    for (let w = 0; w < 3; w++) {
        await page.evaluate(() => (window.__f = []));
        await page.waitForTimeout(3000);
        const f = await page.evaluate(() => window.__f.slice());
        const s = [...f].sort((a, b) => a - b);
        rows.push(`frames ${f.length} p50 ${s[s.length >> 1]?.toFixed(1)} p95 ${s[Math.floor(s.length * 0.95)]?.toFixed(1)}`);
    }
    return rows.join(" | ");
};
for (const [label, url, prm] of [["blank", "about:blank", false], ["live", `${ORIGIN}/`, false], ["PRM ", `${ORIGIN}/`, true]]) {
    const c = await browser.newContext({ viewport: { width: 1280, height: 720 }, reducedMotion: prm ? "reduce" : "no-preference" });
    const page = await c.newPage();
    await page.addInitScript(init);
    await page.goto(url);
    if (url !== "about:blank") await page.getByTestId("goo-blob-canvas").last().waitFor({ state: "attached", timeout: 60000 });
    await page.waitForTimeout(4000);
    console.log(`webkit ${label} :: ${await read(page)}`);
    await c.close();
}
await browser.close();
