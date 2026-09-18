// CHALLENGE-D pass 3 — probe D11
//  A. POLARITY-AGNOSTIC rendered-pixel contrast (pass 2's probe-D8 hard-codes
//     ink = darkest pixel, which inverts in dark; its dark arm is invalid).
//     surface := modal (most frequent) pixel in the box; ink := the pixel
//     furthest from it in luminance. Works in both schemes and forced colors.
//  B. the accessibility media arms nobody ran with this menu open:
//     prefers-reduced-transparency: reduce, prefers-contrast: more, forced-colors.
//  C. document scroll lock on a scrollable viewport.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D11-pass3-results.json", import.meta.url).pathname;
const EV = new URL("./evidence/", import.meta.url).pathname;

const SAVED = {
    id: "pal-1", name: "Muted Terracotta and Deep Sea Foam Study",
    slug: "muted-terracotta-and-deep-sea-foam-study", isLocal: true, tier: "featured", versionCount: 4,
    colors: [{ css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" }, { css: "#e8dcc0" }, { css: "#7a4a32" }],
};
const many = Array.from({ length: 8 }, (_, i) => ({
    id: `pal-x${i}`, name: `Palette Number ${i} With A Fairly Long Name`, slug: `pal-x${i}`,
    isLocal: true, versionCount: 1, colors: [{ css: "#334455" }, { css: "#aabbcc" }, { css: "#ddeeff" }],
}));

const R = {};

const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };

async function openMenu(page) {
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.waitForTimeout(700);
}

function forceDegraded(page) {
    // the degraded arm exactly as PaletteCardMenu.vue:35-39 writes it
    return page.evaluate(() => {
        const item = [...document.querySelectorAll('[role="menuitem"]')].find((i) => /Publish/.test(i.textContent));
        if (!item) return false;
        item.setAttribute("data-disabled", "");
        const span = document.createElement("span");
        span.className = "ml-auto fira-code text-mono-caption opacity-55 tracking-wide pcm-probe-ann";
        span.style.fontVariant = "small-caps";
        span.textContent = "offline";
        item.appendChild(span);
        return true;
    });
}

async function sample(browser, page, ctx, tag) {
    const buf = await page.locator('[role="menu"]').first().screenshot();
    const b64 = buf.toString("base64");
    const boxes = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        const menu = m.getBoundingClientRect();
        const cs = getComputedStyle(m);
        const rel = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: +(r.left - menu.left).toFixed(1), y: +(r.top - menu.top).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
        };
        const item = (re) => [...document.querySelectorAll('[role="menuitem"]')].find((i) => re.test(i.textContent));
        return {
            menuW: +menu.width.toFixed(1), menuH: +menu.height.toFixed(1),
            surfaceStyles: {
                background: cs.backgroundColor, backdropFilter: cs.backdropFilter,
                opacity: cs.opacity, boxShadow: cs.boxShadow.slice(0, 60), borderColor: cs.borderColor,
            },
            annotationStyles: (() => {
                const a = document.querySelector(".pcm-probe-ann");
                if (!a) return null;
                const s = getComputedStyle(a);
                const p = getComputedStyle(a.parentElement);
                return { opacity: s.opacity, parentOpacity: p.opacity, color: s.color, effectiveAlpha: +(parseFloat(s.opacity) * parseFloat(p.opacity)).toFixed(4) };
            })(),
            label: rel(document.querySelector(".dropdown-menu__label")),
            annotation: rel(document.querySelector(".pcm-probe-ann")),
            rename: rel(item(/Rename/)),
            del: rel(item(/Delete/)),
        };
    });

    const blank = await ctx.newPage();
    const sampled = await blank.evaluate(async ([b64, boxes]) => {
        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const g = c.getContext("2d", { willReadFrequently: true });
        g.drawImage(img, 0, 0);
        const dpr = img.width / boxes.menuW;
        const data = g.getImageData(0, 0, c.width, c.height).data;
        const at = (x, y) => { const i = (Math.round(y * dpr) * c.width + Math.round(x * dpr)) * 4; return [data[i], data[i + 1], data[i + 2]]; };
        const L = (p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
        // polarity-agnostic: surface = modal pixel; ink = pixel furthest in luminance
        const scan = (b) => {
            if (!b) return null;
            const hist = new Map(); const pts = [];
            for (let y = b.y + 2; y < b.y + b.h - 2; y++)
                for (let x = b.x + 2; x < b.x + b.w - 2; x++) {
                    const p = at(x, y); const k = p.join(",");
                    hist.set(k, (hist.get(k) || 0) + 1); pts.push(p);
                }
            let mk = null, mc = -1;
            for (const [k, v] of hist) if (v > mc) { mc = v; mk = k; }
            const surface = mk.split(",").map(Number);
            let ink = surface, d = -1;
            for (const p of pts) { const dd = Math.abs(L(p) - L(surface)); if (dd > d) { d = dd; ink = p; } }
            return { surface, ink, surfaceShare: +(mc / pts.length).toFixed(3) };
        };
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        const lum = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
        const ratio = (a, b) => { const x = lum(a), y = lum(b); const [h, l] = x > y ? [x, y] : [y, x]; return +((h + 0.05) / (l + 0.05)).toFixed(2); };
        const out = {};
        for (const k of ["label", "annotation", "rename", "del"]) {
            const s = scan(boxes[k]);
            out[k] = s ? { ink: s.ink, surface: s.surface, surfaceShare: s.surfaceShare, contrast: ratio(s.ink, s.surface) } : null;
        }
        out.dpr = +dpr.toFixed(2);
        out.deleteVsRenameDelta = out.del && out.rename
            ? Math.round(Math.hypot(out.del.ink[0] - out.rename.ink[0], out.del.ink[1] - out.rename.ink[1], out.del.ink[2] - out.rename.ink[2]))
            : null;
        return out;
    }, [b64, boxes]);
    await blank.close();
    fs.writeFileSync(EV + `pass3-${tag}.png`, buf);
    return { boxes, sampled };
}

const browser = await chromium.launch();

// ── A/B: scheme + media arms ────────────────────────────────────────────────
const ARMS = [
    { tag: "light", scheme: "light", media: {} },
    { tag: "dark", scheme: "dark", media: {} },
    { tag: "contrast-more", scheme: "light", media: { contrast: "more" } },
    { tag: "reduced-transparency", scheme: "light", media: { cdp: [{ name: "prefers-reduced-transparency", value: "reduce" }] } },
    { tag: "forced-colors", scheme: "light", media: { forcedColors: "active" } },
];

for (const arm of ARMS) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        colorScheme: arm.scheme,
        ...(arm.media.forcedColors ? { forcedColors: arm.media.forcedColors } : {}),
        ...(arm.media.contrast ? { contrast: arm.media.contrast } : {}),
    });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [SAVED] }));
    await page.addInitScript((s) => {
        const apply = () => {
            const de = document.documentElement;
            de.classList.toggle("dark", s === "dark");
            de.style.colorScheme = s;
        };
        apply(); addEventListener("DOMContentLoaded", apply);
        setTimeout(apply, 1200); setTimeout(apply, 2600);
    }, arm.scheme);

    if (arm.media.cdp) {
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Emulation.setEmulatedMedia", { features: arm.media.cdp });
    }

    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.evaluate((s) => document.documentElement.classList.toggle("dark", s === "dark"), arm.scheme);
    await page.waitForTimeout(400);

    const mediaCheck = await page.evaluate(() => ({
        darkClass: document.documentElement.classList.contains("dark"),
        prefersReducedTransparency: matchMedia("(prefers-reduced-transparency: reduce)").matches,
        prefersContrastMore: matchMedia("(prefers-contrast: more)").matches,
        forcedColors: matchMedia("(forced-colors: active)").matches,
        prefersColorScheme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    }));

    await openMenu(page);
    await forceDegraded(page);
    await page.waitForTimeout(250);
    const s = await sample(browser, page, ctx, arm.tag);
    R[arm.tag] = { mediaCheck, ...s };
    await ctx.close();
}

// ── C: document scroll lock on a scrollable viewport ────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 390, height: 700 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [SAVED, ...many] }));
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3000);

    const probeScroll = async () => page.evaluate(async () => {
        const de = document.documentElement;
        const scrollers = [...document.querySelectorAll("*")].filter((e) => {
            const cs = getComputedStyle(e);
            return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 4;
        }).slice(0, 4).map((e) => ({ cls: (e.className || "").toString().slice(0, 44), sh: e.scrollHeight, ch: e.clientHeight, top: e.scrollTop }));
        const y0 = window.scrollY;
        window.scrollBy(0, 400);
        await new Promise((r) => setTimeout(r, 250));
        const y1 = window.scrollY;
        return {
            bodyOverflow: getComputedStyle(document.body).overflow,
            bodyPointerEvents: getComputedStyle(document.body).pointerEvents,
            docScrollHeight: de.scrollHeight, docClientHeight: de.clientHeight,
            docScrollable: de.scrollHeight > de.clientHeight + 1,
            windowScrollMoved: y1 - y0, innerScrollers: scrollers,
        };
    });

    const before = await probeScroll();
    await page.evaluate(() => window.scrollTo(0, 0));
    await openMenu(page);
    const after = await probeScroll();

    // wheel over the palette list with the menu open
    const wheel = await page.evaluate(async () => {
        const list = [...document.querySelectorAll("*")].find((e) => {
            const cs = getComputedStyle(e);
            return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 4;
        });
        const y0 = window.scrollY, t0 = list ? list.scrollTop : null;
        window.scrollBy(0, 500);
        if (list) list.scrollTop += 300;
        await new Promise((r) => setTimeout(r, 250));
        return { windowDelta: window.scrollY - y0, listDelta: list ? list.scrollTop - t0 : null, listFound: !!list };
    });

    R.scrollLock = { before, after, wheel };
    await page.screenshot({ path: EV + "pass3-390-scrolllock.png" });
    await ctx.close();
}

await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
