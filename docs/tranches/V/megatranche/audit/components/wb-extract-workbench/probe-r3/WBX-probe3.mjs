import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";
const b = await chromium.launch({
    args: [
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream",
        "--autoplay-policy=no-user-gesture-required",
    ],
});
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, permissions: ["camera"] });
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text().slice(0, 160)}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${String(e).slice(0, 160)}`));

await ctx.addInitScript(() => {
    window.__streams = [];
    window.__posts = [];
    const gum = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async (c) => {
        const s = await gum(c);
        window.__streams.push(s);
        return s;
    };
    const OP = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (...a) {
        window.__posts.push({ t: performance.now(), k: a[0]?.options?.k, cw: a[0]?.options?.chromaWeight });
        return OP.apply(this, a);
    };
});

await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

// ---------- (A) camera double-start leak ----------
const camBtn = page.locator('main button[title="Open camera"]');
await camBtn.click();
await page.waitForTimeout(1200);
const afterFirst = await page.evaluate(() => ({
    streams: window.__streams.length,
    live: window.__streams.map((s) => s.getTracks().map((t) => t.readyState)),
    videos: document.querySelectorAll("main video").length,
}));
await camBtn.click();
await page.waitForTimeout(1500);
const afterSecond = await page.evaluate(() => ({
    streams: window.__streams.length,
    live: window.__streams.map((s) => s.getTracks().map((t) => t.readyState)),
    videos: document.querySelectorAll("main video").length,
}));
await page.screenshot({ path: SP + "WBX-camera2.png" });

// capture a frame -> onFile -> stopCamera(); does it stop BOTH streams?
const capture = page.locator('main button[title="Capture frame"]');
const capCount = await capture.count();
if (capCount) await capture.first().click();
await page.waitForTimeout(2500);
const afterCapture = await page.evaluate(() => ({
    streams: window.__streams.length,
    live: window.__streams.map((s) => s.getTracks().map((t) => t.readyState)),
    videos: document.querySelectorAll("main video").length,
    posts: window.__posts.length,
}));
await page.screenshot({ path: SP + "WBX-after-capture.png" });

// ---------- (B) k-slider debounce / worker traffic ----------
await page.evaluate(() => { window.__posts.length = 0; });
const kThumb = page.locator('main [role="slider"][aria-label="Number of colors"]').first();
const tc = await kThumb.count();
let kInfo = { thumbFound: tc };
if (tc) {
    await kThumb.focus();
    for (let i = 0; i < 8; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(35); }
    await page.waitForTimeout(150);
    kInfo.postsImmediatelyAfter8Presses = await page.evaluate(() => window.__posts.length);
    await page.waitForTimeout(1800);
    kInfo.postsAfterSettle = await page.evaluate(() => window.__posts.map((p) => p.k));
}

// ---------- (C) dominant readout precision ----------
const readout = await page.evaluate(() => {
    const codes = [...document.querySelectorAll("main code")];
    const c = codes.find((x) => /oklch|rgb|#|lab|color\(/i.test(x.textContent));
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return {
        title: c.getAttribute("title"),
        visible: c.textContent,
        clipped: c.scrollWidth > c.clientWidth,
        w: Math.round(r.width),
    };
});

// ---------- (D) result plate below the fold? ----------
const fold = await page.evaluate(() => {
    const el = [...document.querySelectorAll("main *")].find((x) =>
        x.children.length === 0 && x.textContent.trim() === "% of the image");
    const host = el?.closest("div");
    const sc = [...document.querySelectorAll("main *")].find(
        (x) => x.scrollHeight > x.clientHeight + 4 && getComputedStyle(x).overflowY === "auto");
    if (!host) return { found: false };
    const r = host.getBoundingClientRect();
    return {
        found: true,
        rowTop: Math.round(r.top),
        viewportH: window.innerHeight,
        belowFold: r.top > window.innerHeight,
        scroller: sc ? { scrollTop: sc.scrollTop, scrollHeight: sc.scrollHeight, clientHeight: sc.clientHeight } : null,
        liveRegions: [...document.querySelectorAll('main [aria-live], main [role="status"], main [role="alert"]')]
            .map((x) => ({ role: x.getAttribute("role"), live: x.getAttribute("aria-live"), label: (x.getAttribute("aria-label") || x.textContent).trim().slice(0, 40) })),
    };
});

writeFileSync(SP + "WBX-out3.json", JSON.stringify({ afterFirst, afterSecond, capCount, afterCapture, kInfo, readout, fold, logs }, null, 1));
console.log("CAM after 1st click:", JSON.stringify(afterFirst));
console.log("CAM after 2nd click:", JSON.stringify(afterSecond));
console.log("capture btn count:", capCount);
console.log("CAM after capture :", JSON.stringify(afterCapture));
console.log("K slider          :", JSON.stringify(kInfo));
console.log("READOUT           :", JSON.stringify(readout));
console.log("FOLD              :", JSON.stringify(fold, null, 1));
console.log("LOGS:\n" + logs.join("\n"));
await b.close();
