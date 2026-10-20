// SERVED MODEL: claude-opus-5-5 · SS-8 B23-mix-canvas-result — shared probe harness.
// One browser per run (caller), one context per cell, every context + browser closed in finally.
// Instrumentation is page-side only (addInitScript); nothing is written to the served tree or the API.
import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B23-mix-canvas-result");
mkdirSync(EVID, { recursive: true });
export const BASE = process.env.B23_BASE ?? "http://localhost:9000";
const NOW = "2026-10-19T00:00:00.000Z";

export const save = (name, obj) => writeFileSync(resolve(EVID, name), typeof obj === "string" ? obj : JSON.stringify(obj, null, 1));
export const launch = (engine = "chromium") => (engine === "webkit" ? webkit : chromium).launch({ headless: true });

export const pal = (slug, name, colors) => ({ id: slug, slug, name, colors: colors.map((css, position) => ({ css, position })),
    createdAt: NOW, updatedAt: NOW, isLocal: true, published: false, visibility: "private", tags: [] });
export const hues = (n, l = 0.68, c = 0.16, t = 0) => Array.from({ length: n }, (_, i) => `oklch(${l} ${c} ${Math.round(((i * 360) / n + t) * 10) / 10})`);

/** Page-side instrumentation of the mix canvas (identified by its own classes). */
function instrument() {
    const isMix = (cv) => cv && cv.classList && cv.classList.contains("z-controls") && cv.getAttribute("aria-hidden") === "true";
    const L = (window.__mix = { grads: [], gctx: [], clears: [], samples: [], sampleAt: null, armT: null, dead: false });
    const P = CanvasRenderingContext2D.prototype;
    const cg = P.createRadialGradient;
    P.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        if (isMix(this.canvas)) L.grads.push({ t: performance.now(), x: x1, y: y1, r: r1, attached: this.canvas.isConnected && this.canvas.clientWidth > 0, cw: this.canvas.clientWidth });
        return cg.apply(this, arguments);
    };
    const cr = P.clearRect;
    P.clearRect = function (x, y, w, h) {
        if (isMix(this.canvas)) {
            const rec = { t: performance.now(), w, h, bw: this.canvas.width, bh: this.canvas.height };
            if (L.sampleAt && this.canvas.width > 0) {
                const d = Math.min(window.devicePixelRatio || 1, 2);
                const pts = L.sampleAt;
                rec.px = pts.map(([sx, sy]) => Array.from(this.getImageData(Math.round(sx * d), Math.round(sy * d), 1, 1).data));
            }
            L.clears.push(rec);
        }
        return cr.apply(this, arguments);
    };
    const gc = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, opts) {
        const ctx = gc.apply(this, arguments);
        if (kind === "2d" && isMix(this)) {
            L.gctx.push({ t: performance.now(), isNull: ctx === null, w: this.width, h: this.height, styleH: this.style.height, cw: this.clientWidth, ch: this.clientHeight,
                pw: this.parentElement?.clientWidth, ph: this.parentElement?.clientHeight, psh: this.parentElement?.scrollHeight });
            L.armT = performance.now();
            // Auto-aim the per-frame pixel sampler at the well (canvas-local CSS px), when present.
            const tgt = document.querySelector("[data-mix-target]");
            const cr0 = this.getBoundingClientRect();
            if (tgt) {
                const r = tgt.getBoundingClientRect();
                const cx = r.left + r.width / 2 - cr0.left, cy = r.top + r.height / 2 - cr0.top, rr = Math.min(r.width, r.height) / 2;
                L.wellAtArm = { cx, cy, r: rr };
                L.sampleAt = [[cx, cy], [cx + rr * 0.9, cy]];
            } else { L.wellAtArm = null; }
            if (window.__forceNull) return null;
        }
        return ctx;
    };
}

export async function seed(ctx, { theme = "light", saved = null, current = null, extra = null } = {}) {
    await ctx.addInitScript(([t, s, c, x]) => {
        try {
            localStorage.setItem("vueuse-color-scheme", t);
            if (s) localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s }));
            if (c) localStorage.setItem("color-picker", JSON.stringify({ inputColor: c[c.length - 1], savedColors: c }));
            if (x) for (const [k, v] of Object.entries(x)) localStorage.setItem(k, v);
        } catch { /* private window */ }
    }, [theme, saved, current, extra]);
}

/** Open a cell. opts: { theme, saved, current, extra, route, viewport, instrument, ...ctxOpts } */
export async function open(b, opts = {}) {
    const { theme = "light", saved = null, current = null, extra = null, route = "#/mix", viewport = { width: 1440, height: 900 }, inst = true, ...ctxOpts } = opts;
    const ctx = await b.newContext({ viewport, colorScheme: theme, ...ctxOpts });
    await seed(ctx, { theme, saved, current, extra });
    if (inst) await ctx.addInitScript(instrument);
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
    p.on("console", (m) => m.type() === "error" && errors.push("CONSOLE " + m.text().slice(0, 200)));
    await p.goto(`${BASE}/${route}`, { timeout: 150000, waitUntil: "domcontentloaded" });
    return { ctx, p, errors };
}

export const pane = (p) => p.locator("section, div").filter({ has: p.locator("canvas.z-controls") }).last();

export async function readyMix(p) {
    await p.locator("canvas.z-controls").first().waitFor({ state: "attached", timeout: 120000 });
    await p.locator(".add-slot-ghost").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
}

export async function addCurrent(p, n) {
    for (let i = 0; i < n; i++) { await p.locator(".add-slot-ghost").first().click(); await p.waitForTimeout(120); }
}

export const mixButton = (p) => p.getByRole("button", { name: "Mix", exact: true }).last();

/** Click Mix and wait for the phase to reach done (plate un-ghosted) + the canvas to release. */
export async function mixAndSettle(p, extraWait = 700) {
    await mixButton(p).click();
    await p.waitForFunction(() => document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"), null, { timeout: 8000 });
    await p.waitForTimeout(extraWait);
}

export async function selectPalettes(p, names) {
    await p.getByRole("tab", { name: "Palettes" }).first().click().catch(() => {});
    for (const n of names) { await p.getByRole("button", { name: `Select palette ${n}`, exact: true }).click(); await p.waitForTimeout(150); }
}

/** Decode a PNG and read pixels at {name:{x,y}} (CSS px; dpr 1). */
export async function samplePng(b, buf, points) {
    const ctx = await b.newContext();
    try {
        const p = await ctx.newPage();
        return await p.evaluate(async ([url, pts]) => {
            const img = new Image(); img.src = url; await img.decode();
            const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
            const g = c.getContext("2d"); g.drawImage(img, 0, 0);
            const out = {};
            for (const [k, { x, y }] of Object.entries(pts)) { const px = g.getImageData(Math.round(x), Math.round(y), 1, 1).data; out[k] = [px[0], px[1], px[2]]; }
            return out;
        }, ["data:image/png;base64," + buf.toString("base64"), points]);
    } finally { await ctx.close(); }
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const lum = ([r, g, bl]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bl);
export const contrast = (a, b2) => { const [x, y] = [lum(a), lum(b2)].sort((m, n) => n - m); return Math.round(((x + 0.05) / (y + 0.05)) * 1000) / 1000; };
