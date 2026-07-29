// IDZ probe 1 — re-entrant/bubbled click from the hidden file input.
import { chromium } from "playwright";
import zlib from "node:zlib";

function crc32(buf) {
    let c, crc = 0xffffffff;
    for (let n = 0; n < buf.length; n++) {
        c = (crc ^ buf[n]) & 0xff;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        crc = c ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, crc]);
}
export function makePng(w, h, rgb) {
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
    const raw = Buffer.alloc(h * (1 + w * 3));
    for (let y = 0; y < h; y++) {
        const off = y * (1 + w * 3);
        raw[off] = 0;
        for (let x = 0; x < w; x++) {
            raw[off + 1 + x * 3] = rgb[0];
            raw[off + 2 + x * 3] = rgb[1];
            raw[off + 3 + x * 3] = rgb[2];
        }
    }
    return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk("IHDR", ihdr),
        chunk("IDAT", zlib.deflateSync(raw)),
        chunk("IEND", Buffer.alloc(0)),
    ]);
}

const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));
page.on("filechooser", async (fc) => {
    (out.fileChoosers ??= []).push(Date.now());
    // leave it open-then-cancel: setFiles([]) cancels
    try { await fc.setFiles([]); } catch {}
});

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForTimeout(2500);

// Instrument: log every click that reaches the drop-zone root, and every click
// dispatched on the hidden file input.
await page.evaluate(() => {
    const zone = document.querySelector('[role="button"][aria-label*="image" i]');
    window.__log = [];
    const input = zone.querySelector('input[type=file]');
    input.addEventListener("click", (e) => window.__log.push({ on: "input", trusted: e.isTrusted, phase: "target" }), true);
    zone.addEventListener("click", (e) => window.__log.push({ on: "zone", target: e.target.tagName, trusted: e.isTrusted }), false);
    window.__zone = zone;
});

out.zoneBefore = await page.evaluate(() => {
    const z = window.__zone;
    return { tabIndex: z.tabIndex, role: z.getAttribute("role"), label: z.getAttribute("aria-label") };
});

// ── Load a real image through the component's own path ────────────────────
await page.setInputFiles('input[type=file]', {
    name: "red.png", mimeType: "image/png", buffer: makePng(64, 64, [220, 40, 40]),
});
await page.waitForTimeout(2500);

out.afterLoad = await page.evaluate(() => ({
    hasPreview: !!document.querySelector('img[alt="Uploaded image"]'),
    tabIndex: window.__zone.tabIndex,
    label: window.__zone.getAttribute("aria-label"),
    eyedropperOpen: !!document.querySelector('[title="Close eyedropper"]'),
    log: window.__log.splice(0),
}));

// ── THE PROBE: press the "Upload image" control in ExtractControls ────────
out.fileChoosers = [];
await page.click('[title="Upload image"]');
await page.waitForTimeout(1200);

out.afterUploadButton = await page.evaluate(() => ({
    eyedropperOpen: !!document.querySelector('[title="Close eyedropper"]'),
    log: window.__log.splice(0),
}));
out.fileChooserCount = (out.fileChoosers ?? []).length;

await page.screenshot({ path: process.argv[2] ?? "/tmp/idz-upload-click.png" });

// ── Control: same probe with NO image (disableClick false) ────────────────
await page.evaluate(() => {
    const btn = document.querySelector('[title="Close eyedropper"]');
    if (btn) btn.click();
});
await page.waitForTimeout(400);

// count how many times openFilePicker recurses on a plain zone click w/o preview
await page.reload({ waitUntil: "load" });
await page.waitForTimeout(2500);
await page.evaluate(() => {
    const zone = document.querySelector('[role="button"][aria-label*="image" i]');
    window.__log = [];
    window.__zone = zone;
    zone.addEventListener("click", (e) => window.__log.push({ target: e.target.tagName, trusted: e.isTrusted }), false);
});
out.fileChoosers = [];
await page.click('[role="button"][aria-label*="image" i]', { position: { x: 20, y: 20 } });
await page.waitForTimeout(800);
out.emptyZoneClick = {
    log: await page.evaluate(() => window.__log.splice(0)),
    fileChoosers: (out.fileChoosers ?? []).length,
};

console.log(JSON.stringify(out, null, 2));
await browser.close();
