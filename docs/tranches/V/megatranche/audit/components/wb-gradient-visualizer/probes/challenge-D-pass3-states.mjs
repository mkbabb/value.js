// CHALLENGE-D pass 3 — STATE probe for GradientVisualizer (read-only).
//   node docs/.../probes/challenge-D-pass3-states.mjs
//
// Covers: the Direction thumb geometry/hit-test, dark-scheme rendered contrast
// (fixed ink detection), Dock Reset (D-5 re-verification), stop removal /
// section collapse, 12-stop crowding, and the parse-rejection state.

import { chromium } from "playwright";
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";

const URL_ = "http://localhost:9000/#/gradient";
const OUT = path.resolve(new URL("../evidence", import.meta.url).pathname);
const log = (t, o) => console.log(`\n### ${t}\n` + JSON.stringify(o, null, 2));

function decodePNG(buf) {
    let p = 8, w = 0, h = 0, ct = 0, bd = 0; const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p);
        const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
        else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        p += 12 + len;
    }
    const chan = ct === 6 ? 4 : 3;
    const raw = zlib.inflateSync(Buffer.concat(idat));
    const stride = w * chan, out = Buffer.alloc(h * stride);
    let rp = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[rp++]; const row = raw.subarray(rp, rp + stride); rp += stride;
        const cur = out.subarray(y * stride, (y + 1) * stride);
        const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const a = x >= chan ? cur[x - chan] : 0, b = prev[x], c = x >= chan ? prev[x - chan] : 0;
            let v = row[x];
            if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
            else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
            cur[x] = v & 0xff;
        }
    }
    return { w, h, chan, data: out };
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const l1 = relLum(a), l2 = relLum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };

// ground = modal colour; ink = the pixel whose luminance is furthest from ground
function inkAndGround(png) {
    const { w, h, chan, data } = png;
    const hist = new Map();
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * chan;
        const px = [data[i], data[i + 1], data[i + 2]];
        const key = `${px[0] >> 3},${px[1] >> 3},${px[2] >> 3}`;
        const e = hist.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
        e.n++; e.r += px[0]; e.g += px[1]; e.b += px[2]; hist.set(key, e);
    }
    let best = null; for (const e of hist.values()) if (!best || e.n > best.n) best = e;
    const ground = [Math.round(best.r / best.n), Math.round(best.g / best.n), Math.round(best.b / best.n)];
    const gL = relLum(ground);
    let ink = ground, d = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * chan;
        const px = [data[i], data[i + 1], data[i + 2]];
        const dd = Math.abs(relLum(px) - gL);
        if (dd > d) { d = dd; ink = px; }
    }
    return { ink, ground, ratio: +contrast(ink, ground).toFixed(2) };
}
async function clipContrast(page, sel, label, tag) {
    const box = await page.locator(sel).first().boundingBox();
    if (!box) return { label, err: "no box" };
    const clip = { x: Math.round(box.x), y: Math.round(box.y), width: Math.max(2, Math.round(box.width)), height: Math.max(2, Math.round(box.height)) };
    const buf = await page.screenshot({ clip });
    fs.writeFileSync(path.join(OUT, `challenge-D-p3-${tag}.png`), buf);
    return { label, rect: clip, ...inkAndGround(decodePNG(buf)) };
}

const state = () => ({
    h3: [...document.querySelectorAll("main h3")].map((e) => e.textContent.trim()),
    hr: document.querySelectorAll("main hr").length,
    stops: document.querySelectorAll('button[aria-label^="Gradient stop"]').length,
    intervalRows: document.querySelectorAll('[data-testid*="interval"], main [class*="interval"]').length,
    editorText: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.textContent.trim(),
    tileBg: getComputedStyle(document.querySelector('[data-testid="gradient-render-tile"]')).backgroundImage.slice(0, 110),
    easingLiterals: [...document.querySelectorAll("main *")].map((e) => e.childNodes.length === 1 && e.textContent.trim()).filter((t) => typeof t === "string" && t.startsWith("cubic-bezier")).slice(0, 3),
    bodyH: (() => { const t = document.querySelector('[data-testid="gradient-render-tile"]'); let b = t; while (b && !(b.classList.contains("flex-col") && b.classList.contains("gap-5"))) b = b.parentElement; return b ? +b.getBoundingClientRect().height.toFixed(1) : null; })(),
    verdict: document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent.trim() ?? null,
});

const run = async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL_, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    // ── 1. Direction thumb geometry + hit test ──
    log("1 · Direction slider thumb", await page.evaluate(() => {
        const th = document.querySelector("main [role='slider']");
        const b = th.getBoundingClientRect();
        const cs = getComputedStyle(th);
        const root = th.closest("[class*='slider'],[data-orientation]");
        const rb = root?.getBoundingClientRect();
        const cx = b.left, cy = b.top + b.height / 2;
        const hit = document.elementFromPoint(cx, cy);
        // the painted fill/range
        const range = root?.querySelector("[class*='range'],[data-part='range']");
        const rr = range?.getBoundingClientRect();
        return {
            thumb: { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: +b.left.toFixed(1), display: cs.display, width: cs.width, minWidth: cs.minWidth, borderRadius: cs.borderRadius, background: cs.backgroundColor, opacity: cs.opacity, boxShadow: cs.boxShadow.slice(0, 60) },
            root: root ? { cls: root.className.slice(0, 60), w: +rb.width.toFixed(1), h: +rb.height.toFixed(1) } : null,
            range: range ? { cls: range.className.slice(0, 40), w: +rr.width.toFixed(1), h: +rr.height.toFixed(1), bg: getComputedStyle(range).background.slice(0, 90) } : null,
            elementAtThumbCentre: hit ? `${hit.tagName}.${String(hit.className).slice(0, 40)}` : null,
            thumbIsTopmostAtItsOwnCentre: hit === th,
        };
    }));
    // focused-slider evidence frame
    await page.evaluate(() => document.querySelector("main [role='slider']").focus());
    await page.waitForTimeout(150);
    {
        const b = await page.locator("main [role='slider']").first().boundingBox();
        await page.screenshot({ path: path.join(OUT, "challenge-D-p3-slider-focus.png"), clip: { x: Math.max(0, b.x - 130), y: b.y - 34, width: 400, height: 70 } });
    }

    // ── 2. Dock Reset — D-5 re-verification ──
    const dock = await page.evaluate(() =>
        [...document.querySelectorAll("nav button,[role='navigation'] button, header button, body > div button")]
            .map((e) => (e.getAttribute("aria-label") || e.textContent.trim() || e.getAttribute("title") || "").slice(0, 30))
            .filter(Boolean).slice(0, 40));
    log("2a · dock control names", dock);

    // choose a non-linear easing first
    const easeBtn = page.locator("button[aria-label='ease-in-out']").first();
    if (await easeBtn.count()) { await easeBtn.click(); await page.waitForTimeout(400); }
    const afterEase = await page.evaluate(state);

    let resetResult = { reached: false };
    try {
        await page.getByRole("button", { name: /tools/i }).first().click({ timeout: 3000 });
        await page.waitForTimeout(500);
        const reset = page.getByRole("button", { name: /^reset/i }).first();
        if (await reset.count()) { await reset.click({ timeout: 3000 }); await page.waitForTimeout(600); resetResult.reached = true; }
        else resetResult.menu = await page.evaluate(() => [...document.querySelectorAll("[role='menuitem'],[role='dialog'] button, [data-state='open'] button")].map((e) => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 28)).slice(0, 20));
    } catch (e) { resetResult.err = String(e).slice(0, 120); }
    const afterReset = await page.evaluate(state);
    log("2b · Dock Reset (D-5)", { afterEase: { easing: afterEase.easingLiterals, tileBg: afterEase.tileBg, editorText: afterEase.editorText }, resetResult, afterReset: { easing: afterReset.easingLiterals, tileBg: afterReset.tileBg, editorText: afterReset.editorText } });
    await page.keyboard.press("Escape");

    // ── 3. stop removal → section collapse ──
    await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(800);
    const before = await page.evaluate(state);
    // pick a non-linear curve so we can see whether easing survives the collapse
    if (await easeBtn.count()) { await easeBtn.click(); await page.waitForTimeout(300); }
    const eased = await page.evaluate(state);
    // remove one stop: select then press Delete/Backspace on the seat
    const removed = await page.evaluate(async () => {
        const seat = document.querySelector('button[aria-label^="Gradient stop"]');
        seat.focus(); seat.click();
        await new Promise((r) => setTimeout(r, 150));
        for (const key of ["Delete", "Backspace"]) {
            seat.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
            await new Promise((r) => setTimeout(r, 200));
        }
        return document.querySelectorAll('button[aria-label^="Gradient stop"]').length;
    });
    await page.waitForTimeout(300);
    log("3 · stop removal / section collapse", { before: { h3: before.h3, hr: before.hr, stops: before.stops, bodyH: before.bodyH }, easedLiterals: eased.easingLiterals, stopsAfterDeleteAttempt: removed, after: await page.evaluate(state) });

    // ── 4. crowding: add stops by clicking along the rail ──
    await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(800);
    const railBox = await page.evaluate(() => {
        const seat = document.querySelector('button[aria-label^="Gradient stop"]');
        const rail = seat.parentElement.parentElement;
        const b = rail.getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height, cls: rail.className.slice(0, 60) };
    });
    for (let i = 1; i <= 10; i++) {
        await page.mouse.click(railBox.x + (railBox.w * i) / 11, railBox.y + railBox.h / 2);
        await page.waitForTimeout(120);
    }
    await page.waitForTimeout(500);
    log("4 · crowded state (12 stops)", await page.evaluate(() => {
        const seats = [...document.querySelectorAll('button[aria-label^="Gradient stop"]')].map((e) => { const b = e.getBoundingClientRect(); return { label: e.getAttribute("aria-label"), x: +b.x.toFixed(1), w: +b.width.toFixed(1) }; });
        const overlaps = seats.filter((s, i) => i > 0 && s.x < seats[i - 1].x + seats[i - 1].w).length;
        const t = document.querySelector('[data-testid="gradient-render-tile"]');
        let body = t; while (body && !(body.classList.contains("flex-col") && body.classList.contains("gap-5"))) body = body.parentElement;
        const editor = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
        return {
            stopCount: seats.length, overlappingSeats: overlaps, seats: seats.slice(0, 14),
            bodyH: +body.getBoundingClientRect().height.toFixed(1),
            editorTextLen: editor.textContent.length,
            editorScrollH: editor.scrollHeight, editorClientH: editor.clientHeight,
            easingSectionH: (() => { const kids = [...body.children]; const i = kids.findIndex((k) => k.textContent.trim().startsWith("Easing")); return i >= 0 ? +kids[i + 1].getBoundingClientRect().height.toFixed(1) : null; })(),
        };
    }));
    await page.screenshot({ path: path.join(OUT, "challenge-D-p3-12-stops.png") });

    // ── 5. parse rejection state ──
    await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(800);
    await page.locator('[role="textbox"][aria-label="Gradient CSS"]').click();
    await page.keyboard.press("Control+A");
    await page.keyboard.type("linear-gradient(90deg, nonsense, )");
    await page.waitForTimeout(1200);
    log("5 · parse rejection", await page.evaluate(() => {
        const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
        const ed = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
        const t = document.querySelector('[data-testid="gradient-render-tile"]');
        return {
            verdict: v?.textContent.trim() ?? null,
            verdictRole: v?.getAttribute("role") ?? null,
            verdictColor: v ? getComputedStyle(v).color : null,
            verdictFontSize: v ? getComputedStyle(v).fontSize : null,
            editorAriaInvalid: ed.getAttribute("aria-invalid"),
            editorBorder: getComputedStyle(ed).borderColor,
            editorDescribedBy: ed.getAttribute("aria-describedby"),
            tileStillPaints: getComputedStyle(t).backgroundImage.slice(0, 70),
            railStillPaints: !!document.querySelector('button[aria-label^="Gradient stop"]'),
        };
    }));
    await page.screenshot({ path: path.join(OUT, "challenge-D-p3-parse-reject.png"), clip: { x: 200, y: 700, width: 520, height: 200 } });

    await ctx.close();

    // ── 6. dark contrast, fixed detector ──
    const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    const dpage = await dctx.newPage();
    await dpage.goto(URL_, { waitUntil: "networkidle" });
    await dpage.waitForTimeout(900);
    const rows = [];
    for (const [sel, label, tag] of [
        ["main h3:has-text('Interpolation')", "h3 Interpolation (dark)", "dark-h3b"],
        ["main .section-label >> nth=0", "label TYPE (dark)", "dark-labelb"],
        ["main .section-label >> nth=3", "label DIRECTION (dark)", "dark-dirlabel"],
    ]) rows.push(await clipContrast(dpage, sel, label, tag));
    log("6 · rendered contrast (dark)", { computed: await dpage.evaluate(() => ({ h3: getComputedStyle(document.querySelectorAll("main h3")[1]).color, label: getComputedStyle(document.querySelector("main .section-label")).color, h3Size: getComputedStyle(document.querySelectorAll("main h3")[1]).fontSize, h3Weight: getComputedStyle(document.querySelectorAll("main h3")[1]).fontWeight, labelSize: getComputedStyle(document.querySelector("main .section-label")).fontSize })), rows });
    await dctx.close();
    await browser.close();
};
run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
