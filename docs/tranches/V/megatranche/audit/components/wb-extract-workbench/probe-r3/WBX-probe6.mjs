import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";
const b = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"],
});
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, permissions: ["camera"] });
await ctx.addInitScript(() => {
    window.__streams = [];
    const gum = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async (c) => { const s = await gum(c); window.__streams.push(s); return s; };
});
const page = await ctx.newPage();
const results = {};

// --- CONTROL: open camera, leave the route normally (stream resolved first) ---
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.locator('main button[title="Open camera"]').click();
await page.waitForTimeout(1500);
results.controlAfterOpen = await page.evaluate(() => window.__streams.map((s) => s.getTracks().map((t) => t.readyState)));
await page.evaluate(() => { location.hash = "#/mix"; });
await page.waitForTimeout(1500);
results.controlAfterRouteChange = await page.evaluate(() => window.__streams.map((s) => s.getTracks().map((t) => t.readyState)));

// --- CASE: open camera, navigate away BEFORE getUserMedia resolves ---
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => {
    window.__streams.length = 0;
    // slow getUserMedia by 1200ms so we can unmount mid-flight
    const gum = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async (c) => {
        await new Promise((r) => setTimeout(r, 1200));
        const s = await gum(c);
        window.__streams.push(s);
        return s;
    };
});
await page.locator('main button[title="Open camera"]').click();
await page.waitForTimeout(120);
await page.evaluate(() => { location.hash = "#/mix"; });   // unmount mid-flight
await page.waitForTimeout(3000);
results.midflightAfterUnmount = await page.evaluate(() => ({
    streams: window.__streams.length,
    states: window.__streams.map((s) => s.getTracks().map((t) => t.readyState)),
    onExtract: location.hash,
    videoEls: document.querySelectorAll("video").length,
}));
await page.waitForTimeout(3000);
results.midflight6sLater = await page.evaluate(() => window.__streams.map((s) => s.getTracks().map((t) => t.readyState)));

writeFileSync(SP + "WBX-out6.json", JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
await b.close();
