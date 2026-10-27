// SS-8.r (COHESION §0gk.3) — recon for the ruled consumer rows: B02 0039 (range caption ink),
// B13 L-3 (attribution ink), B15 0440 (well elevation sign), B03 0085 (hero at 390).
// Headless Chromium, ONE browser, a NEW context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/SS8r/recon.mjs <tag> [cells,...]
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EV = resolve(HERE, "../../evidence/SS8r");
mkdirSync(EV, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:9147/";
const TAG = process.argv[2] ?? "recon";
const ONLY = process.argv[3]?.split(",");

const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(3); };
const okL = ([r, g, bl]) => {
    const [R, G, B] = [lin(r), lin(g), lin(bl)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return +(0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s).toFixed(4);
};

/** All pixels of a clip (CSS px, dpr 1) as [r,g,b][]. */
async function region(page, clip) {
    const png = await page.screenshot({ clip });
    return page.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data; const out = [];
        for (let i = 0; i < d.length; i += 4) out.push([d[i], d[i + 1], d[i + 2]]);
        return out;
    }, png.toString("base64"));
}

/** Resolve CSS colours (any syntax) to sRGB bytes on the element's own cascade. */
async function inks(page, sel, exprs) {
    return page.$eval(sel, (el, exprs) => {
        const cv = document.createElement("canvas").getContext("2d");
        const out = {};
        for (const [k, e] of Object.entries(exprs)) {
            const s = document.createElement("span"); s.style.color = e; el.append(s);
            const css = getComputedStyle(s).color; s.remove();
            cv.clearRect(0, 0, 1, 1); cv.fillStyle = "#000"; cv.fillStyle = css; cv.fillRect(0, 0, 1, 1);
            out[k] = { css, rgb: [...cv.getImageData(0, 0, 1, 1).data.slice(0, 3)] };
        }
        return out;
    }, exprs);
}

/** Referent law (§0gk.2): min contrast of each ink against every ground pixel under the text box (ink hidden). */
async function referent(page, sel, inkMap) {
    const rect = await page.$eval(sel, (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
    const clip = { x: Math.floor(rect.x), y: Math.floor(rect.y), width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
    await page.$eval(sel, (e) => e.style.setProperty("color", "transparent", "important"));
    await page.waitForTimeout(120);
    const px = await region(page, clip);
    if (process.env.SHOT) await page.screenshot({ path: resolve(EV, `ref-${TAG}-${process.env.SHOT}-${Date.now()}.png`), clip: { x: clip.x - 40, y: clip.y - 40, width: clip.width + 80, height: clip.height + 80 } });
    await page.$eval(sel, (e) => e.style.removeProperty("color"));
    const out = {};
    for (const [k, v] of Object.entries(inkMap)) {
        let min = 99, at = null;
        for (const p of px) { const c = cr(v.rgb, p); if (c < min) { min = c; at = p; } }
        out[k] = { min, at };
    }
    const L = px.map(lum).sort((a, b) => a - b);
    out.groundLum = { min: +L[0].toFixed(4), p10: +L[Math.floor(L.length * 0.1)].toFixed(4), med: +L[Math.floor(L.length / 2)].toFixed(4), max: +L[L.length - 1].toFixed(4) };
    out.white = { min: cr([255, 255, 255], px.reduce((a, p) => (lum(p) > lum(a) ? p : a))) };
    out.black = { min: cr([0, 0, 0], px.reduce((a, p) => (lum(p) < lum(a) ? p : a))) };
    return { clip, n: px.length, out };
}

const seedInit = (scheme, color) => ([s, c]) => {
    try {
        localStorage.setItem("vueuse-color-scheme", s);
        if (c) localStorage.setItem("color-picker", JSON.stringify({ inputColor: c, savedColors: [] }));
    } catch {}
};

async function ctxFor(b, scheme, color, extra = {}) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, ...extra });
    await ctx.addInitScript(seedInit(scheme, color), [scheme, color]);
    return ctx;
}

const STEPS = {
    bare: "var(--muted-foreground)",
    strong: "var(--muted-foreground-strong)",
    golden: "color-mix(in oklab, var(--ink-muted), var(--ink-primary) 61.8%)",
    primary: "var(--foreground)",
};

const cells = {
    async caption(b) {
        const res = {};
        for (const scheme of ["light", "dark"]) for (const color of ["rgb(200 80 40)", "oklch(0.62 0.16 330)", "oklch(0.62 0.16 120)", "oklch(0.62 0.16 240)"]) {
            const ctx = await ctxFor(b, scheme, color);
            try {
                const page = await ctx.newPage();
                await page.goto(BASE + "#/?space=rgb", { waitUntil: "load", timeout: 180000 });
                await page.waitForSelector(".sliders-console .channel-rail-item", { timeout: 90000 });
                await page.waitForTimeout(1500);
                await page.locator(".channel-rail-item").first().hover();
                await page.waitForTimeout(1200);
                const sel = "[role=tooltip] p.text-mono-small, [data-reka-popper-content-wrapper] p.text-mono-small";
                const meta = await page.$eval(sel, (p) => {
                    const chain = []; for (let e = p; e && chain.length < 6; e = e.parentElement) chain.push(e.tagName + "." + [...e.classList].slice(0, 6).join("."));
                    return { text: p.textContent, chain, floating: !!p.closest(".glass-floating") };
                }).catch((e) => ({ error: String(e).slice(0, 200) }));
                if (meta.error) { res[`${scheme}|${color}`] = meta; continue; }
                const ik = await inks(page, sel, { ...STEPS, floatPrimary: "var(--ink-floating-primary, var(--ink-primary))" });
                const ref = await referent(page, sel, ik);
                res[`${scheme}|${color}`] = { meta, inks: Object.fromEntries(Object.entries(ik).map(([k, v]) => [k, v.css])), ref: ref.out };
            } finally { await ctx.close(); }
        }
        return res;
    },
    async attribution(b) {
        const NOW = "2026-10-19T00:00:00.000Z";
        const HUES = ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"];
        const wall = [{ name: "Probe Five", slug: "probe-five", userSlug: "gallery", colors: HUES.map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 1, visibility: "public", tier: "standard", published: true }];
        const res = {};
        for (const scheme of ["light", "dark"]) for (const color of [null, "oklch(0.62 0.16 0)", "oklch(0.65 0.14 340)", "oklch(0.62 0.16 120)", "oklch(0.62 0.16 240)"]) {
            const ctx = await ctxFor(b, scheme, color);
            try {
                const page = await ctx.newPage();
                await page.route((u) => !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname) && /(^|\/)palettes(\/|$)/.test(u.pathname),
                    (r) => r.request().method() !== "GET" ? r.continue() : r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: wall, nextCursor: null, hasMore: false }) }));
                await page.goto(BASE + "#/browse", { waitUntil: "domcontentloaded", timeout: 180000 });
                const card = '[role="article"][aria-label="Palette: Probe Five"]';
                await page.waitForSelector(card, { timeout: 90000 });
                await page.waitForTimeout(1000);
                await page.click(card, { position: { x: 30, y: 20 } });
                await page.waitForTimeout(1400);
                const sel = `${card} [data-palette-swatches] span.text-small`;
                const ik = await inks(page, sel, STEPS);
                const ref = await referent(page, sel, ik);
                res[`${scheme}|${color}`] = { inks: Object.fromEntries(Object.entries(ik).map(([k, v]) => [k, v.css])), ref: ref.out };
            } finally { await ctx.close(); }
        }
        return res;
    },
    async well(b) {
        const NOW = "2026-10-19T00:00:00.000Z";
        const hue = (n) => Array.from({ length: n }, (_, i) => `oklch(0.72 0.16 ${Math.round((i * 360) / n)})`);
        const saved = Array.from({ length: 6 }, (_, i) => ({ id: `p${i}`, name: `Saved ${i}`, slug: `p${i}`, colors: hue(5).map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: true, published: false, visibility: "private", tags: [] }));
        const res = {};
        for (const scheme of ["light", "dark"]) for (const color of [null, "oklch(0.62 0.16 0)", "oklch(0.62 0.16 240)"]) {
            const ctx = await ctxFor(b, scheme, color);
            await ctx.addInitScript((s) => { try { localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s })); } catch {} }, saved);
            try {
                const page = await ctx.newPage();
                await page.goto(BASE + "#/palettes", { waitUntil: "domcontentloaded", timeout: 180000 });
                await page.locator("[role=article]").first().waitFor({ timeout: 90000 });
                await page.waitForTimeout(1500);
                const g = await page.evaluate(() => {
                    const [a, bb] = [...document.querySelectorAll("[role=article]")].map((c) => c.getBoundingClientRect());
                    return { x: Math.round(a.x + a.width * 0.75), slipY: Math.round(a.bottom - 6), gapY: Math.round(a.bottom + (bb.y - a.bottom) / 2), wellBg: getComputedStyle(document.documentElement).getPropertyValue("--well-bg").trim() };
                });
                const slip = (await region(page, { x: g.x, y: g.slipY, width: 1, height: 1 }))[0];
                const host = (await region(page, { x: g.x, y: g.gapY, width: 1, height: 1 }))[0];
                res[`${scheme}|${color}`] = { wellBg: g.wellBg, slip, host, dL: +(okL(slip) - okL(host)).toFixed(4) };
            } finally { await ctx.close(); }
        }
        return res;
    },
    async hero(b) {
        const res = {};
        for (const route of ["#/", "#/blob"]) {
            const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
            try {
                const page = await ctx.newPage();
                await page.goto(BASE + route, { waitUntil: "load", timeout: 180000 });
                await page.waitForSelector(".hero-blob-anchor canvas", { timeout: 90000 });
                await page.waitForTimeout(2500);
                res[route] = await page.evaluate(() => {
                    const r = (e) => { const x = e.getBoundingClientRect(); return [+x.left.toFixed(1), +x.top.toFixed(1), +x.right.toFixed(1), +x.bottom.toFixed(1)]; };
                    const a = document.querySelector(".hero-blob-anchor");
                    const chain = []; for (let e = a.querySelector("canvas"); e && chain.length < 14; e = e.parentElement) { const cs = getComputedStyle(e); chain.push({ el: e.tagName + "." + [...e.classList].slice(0, 4).join("."), rect: r(e), ox: cs.overflowX, cp: cs.clipPath, contain: cs.contain }); }
                    return { vw: innerWidth, docSW: document.documentElement.scrollWidth, chain };
                });
            } finally { await ctx.close(); }
        }
        return res;
    },
};

const b = await chromium.launch({ headless: true, args: process.env.SWIFT ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : [] });
const out = { base: BASE, tag: TAG, at: new Date().toISOString(), cells: {} };
try {
    for (const [k, fn] of Object.entries(cells)) {
        if (ONLY && !ONLY.includes(k)) continue;
        try { out.cells[k] = await fn(b); } catch (e) { out.cells[k] = { error: String(e).slice(0, 400) }; }
    }
} finally { await b.close(); }
const p = resolve(EV, `recon-${TAG}.json`);
writeFileSync(p, JSON.stringify(out, null, 1));
console.log(p);
