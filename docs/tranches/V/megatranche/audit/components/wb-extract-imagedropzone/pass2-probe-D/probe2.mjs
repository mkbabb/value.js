// CHALLENGE-D probe 2 — drag flicker, tab reachability, out-in hole, forced-colors, silent reject.
import { webkit, chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
mkdirSync(`${HERE}/shots`, { recursive: true });

const CRC = (() => { const t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } return t; })();
const crc32 = (b) => { let c = -1; for (const x of b) c = CRC[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(ty, "ascii"), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); };
function png(w, h, px) { const raw = Buffer.alloc((w * 3 + 1) * h); let o = 0; for (let y = 0; y < h; y++) { raw[o++] = 0; for (let x = 0; x < w; x++) { const [r, g, b] = px(x, y); raw[o++] = r; raw[o++] = g; raw[o++] = b; } } const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2; return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]); }
const TALL = png(300, 1400, (x, y) => [[220, 40, 60], [240, 140, 30], [245, 220, 40], [60, 190, 90], [40, 160, 220], [70, 70, 200], [150, 60, 190], [20, 20, 20]][Math.floor(y / 175) % 8]);
const SQ = png(600, 600, (x, y) => [x % 255, y % 255, 128]);

const SEL = '[role="button"][aria-label*="mage"]';
const out = {};

// ---------------- WebKit: drag flicker + tab order + out-in hole + silent reject
{
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    const consoleMsgs = [];
    page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text()}`));
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);

    // --- 1. drag state, properly awaited across nextTick
    const dragState = () => page.evaluate((s) => {
        const z = document.querySelector(s);
        return { dragging: z.className.includes("scale-[1.01]"), cls: z.className.split(" ").filter((c) => c.startsWith("border-") || c.startsWith("bg-") || c.startsWith("scale")).join(" ") };
    }, SEL);
    const fire = (type, onChild) => page.evaluate(([s, t, c]) => {
        const z = document.querySelector(s);
        const target = c ? z.querySelector("div, img") : z;
        target.dispatchEvent(new DragEvent(t, { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() }));
    }, [SEL, type, onChild]);

    const log = [];
    log.push({ step: "rest", ...(await dragState()) });
    await fire("dragover", false); await page.waitForTimeout(60);
    log.push({ step: "dragover on ZONE", ...(await dragState()) });
    await fire("dragleave", true); await page.waitForTimeout(60);
    log.push({ step: "dragleave bubbling from CHILD (pointer still inside)", ...(await dragState()) });
    await fire("dragover", true); await page.waitForTimeout(60);
    log.push({ step: "dragover from CHILD", ...(await dragState()) });
    out.drag = log;

    // --- 2. silent reject: drop a text/plain file
    out.beforeReject = await page.evaluate(() => document.body.innerText.length);
    await page.evaluate((s) => {
        const z = document.querySelector(s);
        const dt = new DataTransfer();
        dt.items.add(new File(["not an image"], "notes.txt", { type: "text/plain" }));
        z.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: dt }));
    }, SEL);
    await page.waitForTimeout(1200);
    out.afterReject = await page.evaluate((s) => {
        const z = document.querySelector(s);
        return {
            bodyTextLen: document.body.innerText.length,
            hasPreview: !!z.querySelector("img"),
            zoneClass: z.className.split(" ").filter((c) => c.startsWith("border-") || c.startsWith("bg-")).join(" "),
            anyDestructiveText: [...document.querySelectorAll(".text-destructive")].map((e) => e.textContent.trim()),
            ariaLive: [...document.querySelectorAll("[aria-live],[role=alert],[role=status]")].map((e) => e.textContent.trim()).filter(Boolean),
        };
    }, SEL);

    // --- 3. out-in hole: sample the zone height every frame across a preview swap
    await page.setInputFiles('input[type="file"]', { name: "tall.png", mimeType: "image/png", buffer: TALL });
    await page.waitForTimeout(2500);
    out.heights_beforeSwap = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().height, SEL);
    await page.evaluate((s) => {
        window.__samples = [];
        const z = document.querySelector(s);
        const t0 = performance.now();
        const tick = () => {
            window.__samples.push({ t: +(performance.now() - t0).toFixed(1), h: +z.getBoundingClientRect().height.toFixed(1), img: !!z.querySelector("img"), ph: !!z.querySelector("svg") });
            if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, SEL);
    await page.setInputFiles('input[type="file"]', { name: "sq.png", mimeType: "image/png", buffer: SQ });
    await page.waitForTimeout(1800);
    const samples = await page.evaluate(() => window.__samples);
    // compress: only transitions
    const compressed = [];
    let prev = null;
    for (const s of samples) { const k = `${s.h}|${s.img}|${s.ph}`; if (k !== prev) { compressed.push(s); prev = k; } }
    out.swapSamples = compressed;
    out.swapMinHeight = Math.min(...samples.map((s) => s.h));
    out.swapMaxHeight = Math.max(...samples.map((s) => s.h));
    out.framesWithNoContent = samples.filter((s) => !s.img && !s.ph).length;

    // --- 4. tab reachability with a preview present
    out.tabOrder = await page.evaluate(() => document.body.innerHTML.length); // placeholder to keep shape
    await page.evaluate(() => document.body.focus());
    const seen = [];
    for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate((s) => {
            const a = document.activeElement;
            if (!a) return null;
            return { tag: a.tagName.toLowerCase(), label: (a.getAttribute("aria-label") || a.getAttribute("title") || a.textContent || "").trim().slice(0, 34), isZone: a === document.querySelector(s) };
        }, SEL);
        if (!info) break;
        seen.push(info);
        if (info.isZone) break;
    }
    out.tabWalk = { steps: seen.length, reachedZone: seen.some((s) => s.isZone), trail: seen.map((s) => `${s.tag}:${s.label}`) };
    out.consoleMsgs = consoleMsgs.slice(0, 10);
    await ctx.close(); await b.close();
}

// ---------------- Chromium: forced-colors (WebKit cannot emulate it)
{
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const read = () => page.evaluate((s) => { const z = document.querySelector(s); const cs = getComputedStyle(z); return { borderColor: cs.borderColor, borderStyle: cs.borderStyle, background: cs.backgroundColor, forcedColorAdjust: cs.forcedColorAdjust, transform: cs.transform }; }, SEL);
    out.forced_rest = await read();
    // enter the real dragging state via a real dragover event, then re-read
    await page.evaluate((s) => document.querySelector(s).dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() })), SEL);
    await page.waitForTimeout(150);
    out.forced_dragging = await read();
    out.forced_draggingClass = await page.evaluate((s) => document.querySelector(s).className, SEL);
    await page.screenshot({ path: `${HERE}/shots/forced-colors-dragging.png`, clip: { x: 200, y: 250, width: 800, height: 420 } });
    await ctx.close(); await b.close();
}

writeFileSync(`${HERE}/probe2.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
