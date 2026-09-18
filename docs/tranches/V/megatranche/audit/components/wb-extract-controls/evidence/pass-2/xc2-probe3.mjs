import { chromium } from "playwright";
import zlib from "node:zlib";

function crc32(buf) {
    const table = [];
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; }
    let crc = 0xffffffff;
    for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, c]);
}
function makePng(w, h) {
    const raw = Buffer.alloc(h * (1 + w * 3));
    const cols = [[220, 30, 40], [30, 120, 220], [240, 200, 40], [20, 160, 90]];
    for (let y = 0; y < h; y++) {
        const row = y * (1 + w * 3); raw[row] = 0;
        for (let x = 0; x < w; x++) {
            const i = row + 1 + x * 3;
            const q = ((y * 4 / h) | 0) % 2 * 2 + ((x * 4 / w) | 0) % 2;
            raw[i] = cols[q][0]; raw[i + 1] = cols[q][1]; raw[i + 2] = cols[q][2];
        }
    }
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8; ihdr[9] = 2;
    return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0)),
    ]);
}
const TINY = makePng(1, 1);
const BIG = makePng(3000, 2000);
console.log("fixtures: 1x1 =", TINY.length, "bytes; 3000x2000 =", BIG.length, "bytes");

const out = (t, v) => console.log(`\n=== ${t} ===\n` + (typeof v === "string" ? v : JSON.stringify(v, null, 1)));

const b = await chromium.launch({ args: ["--js-flags=--expose-gc"] });
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addInitScript(() => {
    window.__wpm = [];
    const orig = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (...a) {
        try { window.__wpm.push({ t: Math.round(performance.now()), opts: a[0] && a[0].options ? { ...a[0].options } : null, bytes: a[0] && a[0].pixels ? a[0].pixels.byteLength : null }); } catch { }
        return orig.apply(this, a);
    };
    window.__unhandled = [];
    window.addEventListener("unhandledrejection", (e) => window.__unhandled.push(String(e.reason)));
});
const page = await chromium ? null : null;
const p = await ctx.newPage();
const pageErrors = [], consoleErrors = [];
p.on("pageerror", (e) => pageErrors.push(String(e)));
p.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });

await p.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await p.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await p.waitForTimeout(2500);

// ---------- A. 1x1 image: domain boundary (pixels < k) -----------------
await p.evaluate(() => { window.__wpm.length = 0; window.__unhandled.length = 0; });
await p.setInputFiles('input[type="file"]', { name: "one.png", mimeType: "image/png", buffer: TINY });
await p.waitForTimeout(1500);
out("1x1 IMAGE (k=5 clusters, 1 pixel)", await p.evaluate(() => ({
    posts: window.__wpm,
    unhandledRejections: window.__unhandled,
    errorLine: (() => { const e = [...document.querySelectorAll(".text-destructive")].map((n) => n.textContent.trim()); return e; })(),
    railGradient: getComputedStyle(document.querySelector('[data-o18="extract-k-rail"]')).backgroundImage.slice(0, 120),
    swatchCount: document.querySelectorAll('[class*="swatch"]').length,
    ghostVisible: !!document.body.textContent.match(/undeveloped plate/i),
    resetDisabled: [...document.querySelectorAll("button")].filter((x) => x.title === "Reset").map((x) => x.disabled),
})));

// ---------- B. large image: main-thread cost + retained memory ---------
await p.evaluate(() => { window.__wpm.length = 0; window.__unhandled.length = 0; window.__t0 = performance.now(); });
const heapBefore = await p.evaluate(() => performance.memory ? performance.memory.usedJSHeapSize : null);
await p.evaluate(() => { window.__t0 = performance.now(); });
await p.setInputFiles('input[type="file"]', { name: "big.png", mimeType: "image/png", buffer: BIG });
// sample the sliders DURING the long quantize
const during = [];
for (let i = 0; i < 25; i++) {
    during.push(await p.evaluate(() => ({
        dt: Math.round(performance.now() - window.__t0),
        posts: window.__wpm.length,
        skeleton: !!document.querySelector("[class*=skeleton]"),
        sliderAriaDisabled: [...document.querySelectorAll('[data-slot="slider"]')].map((r) => r.getAttribute("aria-disabled")).join(","),
        uploadDisabled: [...document.querySelectorAll("button")].filter((x) => x.title === "Upload image").map((x) => x.disabled).join(","),
    })));
    await p.waitForTimeout(60);
}
await p.waitForTimeout(2000);
const heapAfter = await p.evaluate(() => performance.memory ? performance.memory.usedJSHeapSize : null);
out("BIG IMAGE 3000x2000", await p.evaluate(() => ({
    posts: window.__wpm,
    mainThreadMsFromChangeToWorkerPost: window.__wpm[0] ? Math.round(window.__wpm[0].t - window.__t0) : null,
    dataUrlChars: (() => { const img = document.querySelector('img[alt], img'); return img && img.src ? img.src.length : null; })(),
    imgNatural: (() => { const img = document.querySelector("img"); return img ? [img.naturalWidth, img.naturalHeight] : null; })(),
    unhandled: window.__unhandled,
})));
out("HEAP (bytes)", { before: heapBefore, after: heapAfter, deltaMB: heapBefore && heapAfter ? +(((heapAfter - heapBefore) / 1048576).toFixed(1)) : null });
out("DURING BIG QUANTIZE — controls live?", during.filter((_, i) => i % 2 === 0));

// ---------- C. drive k DURING the long quantize -----------------------
await p.evaluate(() => { window.__wpm.length = 0; });
await p.getByRole("slider", { name: "Number of colors" }).focus();
await p.setInputFiles('input[type="file"]', { name: "big2.png", mimeType: "image/png", buffer: BIG });
await p.waitForTimeout(30);
for (let i = 0; i < 4; i++) { await p.keyboard.press("ArrowRight"); await p.waitForTimeout(20); }
await p.waitForTimeout(4000);
out("k DRIVEN DURING PROCESSING — worker posts", await p.evaluate(() => ({ posts: window.__wpm, unhandled: window.__unhandled })));

await ctx.close();
await b.close();
console.log("\npageErrors:", JSON.stringify(pageErrors));
console.log("consoleErrors:", JSON.stringify(consoleErrors.slice(0, 6)));
