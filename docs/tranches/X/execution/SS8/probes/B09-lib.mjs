// SS-8 · B09-about — headless Chromium witness (one browser per run, one context per cell).
// Shared helpers for the B09 cell scripts (no browser launched here).
// Writes JSON + a few PNGs under docs/tranches/X/execution/SS8/evidence/B09-about/.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ORIGIN = process.env.B09_ORIGIN || "http://localhost:9000/";
const EV = resolve(import.meta.dirname, "../evidence/B09-about");
mkdirSync(EV, { recursive: true });
const TAG = process.env.B09_TAG || "";
const save = (name, obj) => writeFileSync(resolve(EV, name + TAG + ".json"), JSON.stringify(obj, null, 1));

const DOCS = ["rgb", "hsl", "hsv", "hwb", "lab", "lch", "oklab", "oklch", "xyz", "kelvin", "hex"];

async function open(browser, hash, opts = {}) {
    const ctx = await browser.newContext({
        viewport: opts.viewport || { width: 1440, height: 900 },
        colorScheme: opts.scheme || "light",
        deviceScaleFactor: opts.dsf || 1,
        hasTouch: !!opts.touch,
        isMobile: !!opts.mobile,
        forcedColors: opts.forced ? "active" : "none",
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message || e).slice(0, 240)));
    page.on("console", (m) => m.type() === "error" && errors.push("console: " + m.text().slice(0, 240)));
    if (opts.init) await page.addInitScript(opts.init);
    try { await page.goto(ORIGIN + hash, { waitUntil: "load", timeout: 45000 }); }
    catch (e) { errors.push("GOTO-TIMEOUT: " + String(e.message || e).split("\n")[0].slice(0, 160)); }
    if (!opts.noWait) {
        await page.waitForSelector(".about-card", { timeout: 20000 }).catch(() => {});
        await page.waitForSelector(".about-card .markdown-body .katex, .about-card [data-guide-empty-state]", { timeout: 20000 }).catch(() => {});
        await page.waitForTimeout(opts.settle ?? 1500);
    }
    return { ctx, page, errors };
}

// ---- shared in-page helpers ------------------------------------------------
const STATE = () => {
    const card = document.querySelector(".about-card");
    return {
        href: location.href,
        aboutCard: !!card,
        facts: card?.querySelector("[data-space-facts]")?.getAttribute("data-space-facts") ?? null,
        guide: card?.querySelector("[data-guide-section]")?.getAttribute("data-guide-state") ?? null,
        title: card?.querySelector(".pane-header-title")?.textContent.replace(/\s+/g, " ").trim() ?? null,
        boundary: [...document.querySelectorAll(".vj-error-boundary,[role=alert]")].map((e) => e.textContent.replace(/\s+/g, " ").trim().slice(0, 200)),
        appChildren: document.querySelector("#app")?.children.length ?? -1,
        bodyTextLen: document.body.innerText.trim().length,
        storageKeys: (() => { try { return Object.keys(localStorage); } catch { return "ERR"; } })(),
    };
};

// sRGB relative luminance + WCAG ratio
const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(3); };

// decode a PNG buffer in-page (no node deps): returns {w,h,data:number[]}
async function pixels(page, buf) {
    return page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const x = c.getContext("2d");
        x.drawImage(img, 0, 0);
        return { w: c.width, h: c.height, data: Array.from(x.getImageData(0, 0, c.width, c.height).data) };
    }, buf.toString("base64"));
}
// bg = modal pixel; ink = pixel with max luminance distance from bg
function inkAndBg(px) {
    const counts = new Map();
    const all = [];
    for (let i = 0; i < px.data.length; i += 4) {
        const p = [px.data[i], px.data[i + 1], px.data[i + 2]];
        all.push(p);
        const k = p.join(",");
        counts.set(k, (counts.get(k) || 0) + 1);
    }
    const bgK = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const bg = bgK.split(",").map(Number);
    const lb = lum(bg);
    let ink = bg, best = -1;
    for (const p of all) { const d = Math.abs(lum(p) - lb); if (d > best) { best = d; ink = p; } }
    return { bg, ink, ratio: ratio(ink, bg) };
}

export { open, STATE, save, ratio, lum, pixels, inkAndBg, DOCS, EV, ORIGIN };
