import { webkit } from "playwright";
import zlib from "node:zlib";

// ---- build a real 64x64 PNG (4 colour quadrants) -------------------------
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
            const q = (y < h / 2 ? 0 : 2) + (x < w / 2 ? 0 : 1);
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
const PNGBUF = makePng(64, 64);

const out = (t, v) => console.log(`\n=== ${t} ===\n` + (typeof v === "string" ? v : JSON.stringify(v, null, 1)));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addInitScript(() => {
    window.__wpm = [];
    const orig = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (...a) {
        try { window.__wpm.push({ t: Math.round(performance.now()), opts: a[0] && a[0].options ? { ...a[0].options } : null }); } catch { }
        return orig.apply(this, a);
    };
});
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
await page.waitForTimeout(2500);

const kThumb = page.getByRole("slider", { name: "Number of colors" });
const kcThumb = page.getByRole("slider", { name: "Chroma weight" });

// ---------- A. kC keyboard steps: raw float announcement ----------------
await kcThumb.focus();
const steps = [];
for (let i = 0; i < 11; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(30);
    steps.push(await page.evaluate(() => {
        const t = document.querySelector('[role="slider"][aria-label="Chroma weight"]');
        const r = [...document.querySelectorAll("span.tabular-nums")].find((s) => /^\d\.\d$/.test(s.textContent.trim()));
        return { now: t.getAttribute("aria-valuenow"), vt: t.getAttribute("aria-valuetext"), shown: r ? r.textContent.trim() : null };
    }));
}
out("kC KEYBOARD STEPS", steps);
out("kC READOUT BOX at max", await page.evaluate(() => {
    const s = [...document.querySelectorAll("span.tabular-nums")].find((n) => /^\d\.\d$/.test(n.textContent.trim()));
    return s ? { text: s.textContent.trim(), clientW: s.clientWidth, scrollW: s.scrollWidth, clipped: s.scrollWidth > s.clientWidth, cls: s.className } : null;
}));

// ---------- B. ARIA-prohibited attrs on the roleless slider root --------
out("SLIDER ROOT vs THUMB (aria on roleless generic)", await page.evaluate(() =>
    [...document.querySelectorAll('[data-slot="slider"]')].map((el) => ({
        tag: el.tagName, role: el.getAttribute("role"), implicitRole: "generic",
        ariaLabel: el.getAttribute("aria-label"),
        ariaDisabled: el.getAttribute("aria-disabled"),
        ariaOrientation: el.getAttribute("aria-orientation"),
        cls: el.className,
        thumbLabels: [...el.querySelectorAll('[role="slider"]')].map((t) => t.getAttribute("aria-label")),
    }))));

// reset kC back to 0.5 for the race stage
for (let i = 0; i < 11; i++) { await page.keyboard.press("ArrowLeft"); }
await page.waitForTimeout(600);

// ---------- C. upload a real PNG ---------------------------------------
await page.evaluate(() => { window.__wpm.length = 0; });
await page.setInputFiles('input[type="file"]', { name: "quad.png", mimeType: "image/png", buffer: PNGBUF });
await page.waitForTimeout(1500);
out("AFTER UPLOAD — worker posts", await page.evaluate(() => ({
    posts: window.__wpm,
    swatches: document.querySelectorAll('[data-o18="extract-k-rail"]') ? getComputedStyle(document.querySelector('[data-o18="extract-k-rail"]')).backgroundImage.slice(0, 90) : null,
    resetDisabled: [...document.querySelectorAll("button")].filter((x) => x.title === "Reset").map((x) => x.disabled),
})));

// ---------- D. THE RACE: arm the k debounce, then hit Reset -------------
await page.evaluate(() => { window.__wpm.length = 0; });
await kThumb.focus();
await page.keyboard.press("ArrowRight");          // k 5 -> 6, arms the 300ms debounce
await page.waitForTimeout(50);
await page.locator('button[title="Reset"]').click(); // onReset: k->5 + IMMEDIATE runQuantize
const raceTrace = [];
for (let i = 0; i < 12; i++) {
    await page.waitForTimeout(60);
    raceTrace.push(await page.evaluate(() => ({
        t: Math.round(performance.now()),
        posts: window.__wpm.length,
        k: document.querySelector('[role="slider"][aria-label="Number of colors"]').getAttribute("aria-valuenow"),
        processing: !!document.querySelector(".skeleton-ink-register, [class*=skeleton]"),
    })));
}
out("RACE — Reset while the k debounce is armed", {
    posts: await page.evaluate(() => window.__wpm),
    trace: raceTrace,
});

// ---------- E. THE RACE 2: arm the k debounce, then upload -------------
await page.evaluate(() => { window.__wpm.length = 0; });
await kThumb.focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(40);
await page.setInputFiles('input[type="file"]', { name: "quad2.png", mimeType: "image/png", buffer: PNGBUF });
await page.waitForTimeout(1200);
out("RACE 2 — upload while the k debounce is armed", await page.evaluate(() => window.__wpm));

// ---------- F. negative control: rapid arrows coalesce -----------------
await page.evaluate(() => { window.__wpm.length = 0; });
await kThumb.focus();
for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(1200);
out("CONTROL — 8 rapid ArrowRight (debounce should coalesce to 1)", await page.evaluate(() => window.__wpm));

// ---------- G. disabled propagation during processing ------------------
await page.evaluate(() => { window.__wpm.length = 0; });
const during = [];
await page.setInputFiles('input[type="file"]', { name: "quad3.png", mimeType: "image/png", buffer: PNGBUF });
for (let i = 0; i < 6; i++) {
    during.push(await page.evaluate(() => {
        const roots = [...document.querySelectorAll('[data-slot="slider"]')];
        const btns = [...document.querySelectorAll("button")].filter((x) => ["Upload image", "Open camera", "Reset"].includes(x.title));
        return {
            processing: !!document.querySelector("[class*=skeleton]"),
            sliderAriaDisabled: roots.map((r) => r.getAttribute("aria-disabled")),
            sliderDataDisabled: roots.map((r) => r.hasAttribute("data-disabled")),
            btns: btns.map((x) => [x.title, x.disabled]),
        };
    }));
    await page.waitForTimeout(25);
}
out("DURING PROCESSING — disabled propagation", during);

await ctx.close();
await b.close();
console.log("\npageErrors:", JSON.stringify(pageErrors));
