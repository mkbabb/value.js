// X.W7L.i — the certified-ink instrument probe (served :9000, headed, 1440).
// Usage: node i-ink-probe.mjs <scheme light|dark> <out.json> [url] [shot.png]
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [scheme = "light", out = "/dev/stdout", url = "http://localhost:9000/", shot] = process.argv.slice(2);
const browser = await chromium.launch({ headless: !!process.env.PROBE_HEADLESS ? true : false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 300)));
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`[${m.type()}] ${m.text().slice(0, 300)}`); });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const glass = await page.evaluate(() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const c = cv.getContext("2d", { willReadFrequently: true });
    const rgba = (css) => {
        const d = (g) => { c.fillStyle = g; c.fillRect(0, 0, 1, 1); c.fillStyle = "#000"; c.fillStyle = css; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data]; };
        const b = d("#000"), w = d("#fff"); const a = 1 - (w[0] - b[0]) / 255;
        return a <= 0.001 ? { a: 0 } : { r: +(b[0] / a).toFixed(1), g: +(b[1] / a).toFixed(1), b: +(b[2] / a).toFixed(1), a: +a.toFixed(3) };
    };
    const root = getComputedStyle(document.documentElement);
    const sel = [".dock-plate", ".glass-dock", '[data-surface="veil"]', '[data-surface="resting"]', ".glass-resting", ".glass-floating", ".glass-quiet", ".glass-plate", "[data-slot=card]"];
    const els = [];
    for (const s of sel) for (const el of [...document.querySelectorAll(s)].slice(0, 4)) {
        const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) continue;
        const cs = getComputedStyle(el);
        els.push({ sel: s, cls: String(el.className).slice(0, 80), box: [r.x, r.y, r.width, r.height].map(Math.round), bg: cs.backgroundColor, bgRgba: rgba(cs.backgroundColor), backdrop: cs.backdropFilter });
    }
    const tok = (n) => { const p = document.createElement("div"); p.style.backgroundColor = `var(${n})`; document.body.appendChild(p); const v = getComputedStyle(p).backgroundColor; p.remove(); return { css: v, rgba: rgba(v) }; };
    return {
        dark: document.documentElement.classList.contains("dark"),
        ambientL: root.getPropertyValue("--ink-ambient-l").trim(),
        inkMuted: root.getPropertyValue("--ink-muted").trim(),
        accentLive: root.getPropertyValue("--accent-live").trim(),
        tokens: Object.fromEntries(["--glass-plate-resting", "--glass-plate-floating", "--glass-plate-quiet", "--glass-plate-chassis", "--card", "--background", "--well-bg"].map((n) => [n, tok(n)])),
        glassLevel: root.getPropertyValue("--glass-level").trim(),
        veilInk: root.getPropertyValue("--glass-veil-ink").trim(),
        els,
    };
});
let pixels = [];
if (shot) {
    const buf = await page.screenshot({ path: shot });
    // sample painted composite at element centres (the real composite the eye sees)
    pixels = await page.evaluate(async ({ b64, boxes }) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
        const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        // a 9x9 grid inside the box (inset 8%): the painted composite's luminance spread
        return boxes.map(([x, y, w, h]) => { const ys = [];
            for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
                const px = Math.min(img.width - 1, Math.round(x + w * (0.08 + 0.84 * i / 8))), py = Math.min(img.height - 1, Math.round(y + h * (0.08 + 0.84 * j / 8)));
                const [r, g, b] = c.getImageData(px, py, 1, 1).data; ys.push(0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)); }
            ys.sort((a, b) => a - b); const q = (f) => +ys[Math.floor(f * (ys.length - 1))].toFixed(4);
            return { Ymin: q(0), Yp10: q(0.1), Ymed: q(0.5), Yp90: q(0.9), Ymax: q(1) }; });
    }, { b64: buf.toString("base64"), boxes: glass.els.map((e) => e.box) });
}
writeFileSync(out, JSON.stringify({ scheme, url, at: new Date().toISOString(), errors, glass, pixels }, null, 1));
await browser.close();
