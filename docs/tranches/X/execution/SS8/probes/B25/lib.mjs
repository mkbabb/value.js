// SERVED MODEL: claude-opus-5-5 · SS-8 B25-extract-inputs — shared probe harness.
// One browser per run (caller), one context per cell, every context + browser closed in finally.
// Instrumentation is page-side only; nothing is written to the served tree or the API.
import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B25-extract-inputs");
mkdirSync(EVID, { recursive: true });
export const BASE = process.env.B25_BASE ?? "http://localhost:9000";
export const REPO = resolve(HERE, "../../../../../../..");
export const save = (name, obj) => writeFileSync(resolve(EVID, name), typeof obj === "string" ? obj : JSON.stringify(obj, null, 1));
export const launch = (engine = "chromium") => (engine === "webkit" ? webkit : chromium).launch({ headless: true });

/** Open a cell: fresh context, seeded theme + current colour, navigated to #/extract. */
export async function open(b, opts = {}) {
    const { theme = "light", color = null, route = "#/extract", viewport = { width: 1440, height: 900 }, ...ctxOpts } = opts;
    const ctx = await b.newContext({ viewport, colorScheme: theme, ...ctxOpts });
    await ctx.addInitScript(([t, c]) => {
        try {
            localStorage.setItem("vueuse-color-scheme", t);
            if (c) localStorage.setItem("color-picker", JSON.stringify({ inputColor: c, savedColors: [c] }));
        } catch { /* private window */ }
        window.__rej = [];
        window.addEventListener("unhandledrejection", (e) => window.__rej.push(String(e.reason?.type ?? e.reason?.message ?? e.reason).slice(0, 160)));
    }, [theme, color]);
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push("PAGEERROR " + e.message.slice(0, 200)));
    p.on("console", (m) => m.type() === "error" && errors.push("CONSOLE " + m.text().slice(0, 200)));
    await p.goto(`${BASE}/${route}`, { timeout: 240000, waitUntil: "domcontentloaded" });
    await p.waitForSelector('[aria-label="Upload image"], [aria-label="Sample colors from the image"]', { timeout: 240000 });
    await p.waitForTimeout(1200);
    return { ctx, p, errors };
}

/** Synthesize a PNG in the page (a deterministic "photo": smooth hue field + bands). */
export async function makePng(p, w, h, kind = "photo") {
    const b64 = await p.evaluate(([w, h, kind]) => {
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        const g = c.getContext("2d");
        if (kind === "stripes") {
            const cols = ["#ff00ff", "#00ff00", "#0000ff", "#ffff00"];
            for (let i = 0; i < 8; i++) { g.fillStyle = cols[i % 4]; g.fillRect((i * w) / 8, 0, w / 8 + 1, h); }
        } else {
            const lg = g.createLinearGradient(0, 0, w, h);
            lg.addColorStop(0, "#1d3557"); lg.addColorStop(0.35, "#e76f51"); lg.addColorStop(0.65, "#f4d35e"); lg.addColorStop(1, "#2a9d8f");
            g.fillStyle = lg; g.fillRect(0, 0, w, h);
            g.fillStyle = "rgba(255,255,255,0.35)"; g.beginPath(); g.arc(w * 0.3, h * 0.4, Math.min(w, h) * 0.2, 0, 7); g.fill();
            g.fillStyle = "rgba(0,0,0,0.4)"; g.fillRect(w * 0.6, h * 0.55, w * 0.25, h * 0.3);
        }
        return c.toDataURL("image/png").split(",")[1];
    }, [w, h, kind]);
    return Buffer.from(b64, "base64");
}

/** Feed a file through the zone (click → filechooser → setFiles). */
export async function feed(p, buffer, name = "img.png", mimeType = "image/png", via = "zone") {
    const sel = via === "zone" ? '[aria-label="Upload image"]' : 'button:has-text("Replace image")';
    const [fc] = await Promise.all([p.waitForEvent("filechooser", { timeout: 30000 }), p.click(sel)]);
    await fc.setFiles({ name, mimeType, buffer });
}

export async function waitRail(p, t = 60000) {
    await p.waitForSelector('[data-o18="extract-k-rail"]', { timeout: t });
    await p.waitForTimeout(800);
}

/** WCAG 2.x helpers (run in node). */
export const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(3); };

/** Resolve any CSS colour to sRGB bytes in-page (canvas 1×1). */
export const RESOLVE = `(css) => { const c = document.createElement('canvas'); c.width = c.height = 1; const g = c.getContext('2d'); g.fillStyle = '#000'; g.fillStyle = css; g.fillRect(0,0,1,1); return Array.from(g.getImageData(0,0,1,1).data); }`;

/** Sample pixels from a PNG screenshot buffer (decoded in-page). */
export async function pixels(p, png, pts) {
    return p.evaluate(async ([b64, pts]) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        return pts.map(([x, y]) => Array.from(g.getImageData(Math.round(x), Math.round(y), 1, 1).data));
    }, [png.toString("base64"), pts]);
}
