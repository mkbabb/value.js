import { webkit } from "playwright";
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
function makePng(w, h, mode) {
    const raw = Buffer.alloc(h * (1 + w * 3));
    const cols = [[220, 30, 40], [30, 120, 220], [240, 200, 40], [20, 160, 90]];
    for (let y = 0; y < h; y++) {
        const row = y * (1 + w * 3); raw[row] = 0;
        for (let x = 0; x < w; x++) {
            const i = row + 1 + x * 3;
            const c = mode === "solid" ? [40, 90, 200] : cols[(y < h / 2 ? 0 : 2) + (x < w / 2 ? 0 : 1)];
            raw[i] = c[0]; raw[i + 1] = c[1]; raw[i + 2] = c[2];
        }
    }
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
    return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}
const QUAD = makePng(200, 200, "quad");
const SOLID = makePng(200, 200, "solid");

const out = (t, v) => console.log(`\n=== ${t} ===\n` + (typeof v === "string" ? v : JSON.stringify(v, null, 1)));
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
const pageErrors = [];
p.on("pageerror", (e) => pageErrors.push(String(e)));

await p.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await p.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await p.waitForTimeout(2500);

// ---- 0. WebKit's own verdict on a one-stop linear-gradient -------------
out("WEBKIT CSS VALIDITY — one-stop linear-gradient", await p.evaluate(() => {
    const d = document.createElement("div");
    d.style.backgroundImage = "linear-gradient(to right, red 50%)";
    const one = d.style.backgroundImage;
    d.style.backgroundImage = "linear-gradient(to right, red 0%, blue 100%)";
    const two = d.style.backgroundImage;
    const e = document.createElement("div");
    e.style.background = "linear-gradient(to right, red 50%)";
    return { oneStopAccepted: one, twoStopAccepted: two, viaShorthand: e.style.background, cssSupports: CSS.supports("background-image", "linear-gradient(to right, red 50%)") };
}));

const railState = () => p.evaluate(() => {
    const r = document.querySelector('[data-o18="extract-k-rail"]');
    const cs = getComputedStyle(r);
    return {
        inlineStyleAttr: r.getAttribute("style"),
        computedBgImage: cs.backgroundImage,
        computedBgColor: cs.backgroundColor,
        k: document.querySelector('[role="slider"][aria-label="Number of colors"]').getAttribute("aria-valuenow"),
        swatchCount: document.querySelectorAll('[class*="swatch"]').length,
    };
});

// ---- 1. normal image, k=5 --------------------------------------------
await p.setInputFiles('input[type="file"]', { name: "quad.png", mimeType: "image/png", buffer: QUAD });
await p.waitForTimeout(1500);
out("RAIL @ k=5 (4-colour image)", await railState());

// ---- 2. drive k to its declared MINIMUM (:min=1) ----------------------
await p.getByRole("slider", { name: "Number of colors" }).focus();
for (let i = 0; i < 4; i++) { await p.keyboard.press("ArrowLeft"); await p.waitForTimeout(30); }
await p.waitForTimeout(1500);
out("RAIL @ k=1 (the slider's own declared minimum)", await railState());
await p.locator('[data-o18="extract-k-rail"]').screenshot({ path: SP + "xc2-rail-k1.png" });
await p.locator("div.flex.flex-col.gap-3").first().screenshot({ path: SP + "xc2-controls-k1.png" }).catch(() => { });

// ---- 3. solid-colour image at k=5 (dedupe → 1 cluster) ----------------
await p.setInputFiles('input[type="file"]', { name: "solid.png", mimeType: "image/png", buffer: SOLID });
await p.waitForTimeout(1500);
out("RAIL @ solid-colour image", await railState());

// ---- 4. is the paint actually the palette, or the fallback ink? -------
out("RAIL PIXEL SAMPLE (left vs right third)", await p.evaluate(async () => {
    const r = document.querySelector('[data-o18="extract-k-rail"]');
    const b = r.getBoundingClientRect();
    return { box: { x: +b.x.toFixed(0), y: +b.y.toFixed(0), w: +b.width.toFixed(0), h: +b.height.toFixed(0) } };
}));

await ctx.close();
await b.close();
console.log("\npageErrors:", JSON.stringify(pageErrors));
