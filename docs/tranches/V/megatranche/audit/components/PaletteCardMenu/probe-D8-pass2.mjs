// CHALLENGE-D pass 2 · probe 8 — RENDERED-PIXEL contrast of the menu header and of
// the degraded-state annotation at its compounded alpha. Samples real screenshot
// pixels (screenshot -> <img> -> canvas -> getImageData), not token arithmetic.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D8-pass2-results.json", import.meta.url).pathname;

const SAVED = {
    id: "pal-longname-1", name: "Muted Terracotta and Deep Sea Foam Study",
    slug: "muted-terracotta-and-deep-sea-foam-study", isLocal: true, tier: "featured", versionCount: 4,
    colors: [{ css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" }, { css: "#e8dcc0" }, { css: "#7a4a32" }],
};
const TEMP = { id: "__extracted__t1", name: "Temp", slug: "temp", isLocal: true, colors: [{ css: "#123a5f" }, { css: "#9dc0e8" }] };
const seed = (page) =>
    page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [SAVED, TEMP] }));

const R = {};

async function run(browser, scheme) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await seed(page);
    // The demo drives dark via a `dark` class on <html> (same mechanism the
    // mega-tranche capture harness uses — visual/capture.mjs:67-74).
    await page.addInitScript((s) => {
        const apply = () => {
            const de = document.documentElement;
            if (s === "dark") de.classList.add("dark");
            else de.classList.remove("dark");
            de.style.colorScheme = s;
        };
        apply();
        addEventListener("DOMContentLoaded", apply);
        setTimeout(apply, 1200);
        setTimeout(apply, 2500);
    }, scheme);
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.evaluate((s) => {
        const de = document.documentElement;
        if (s === "dark") de.classList.add("dark");
        else de.classList.remove("dark");
    }, scheme);
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.waitForTimeout(700);

    // Force the degraded arm onto the live Publish row exactly as the SFC writes it.
    await page.evaluate(() => {
        const item = [...document.querySelectorAll('[role="menuitem"]')].find((i) => /Publish/.test(i.textContent));
        item.setAttribute("data-disabled", "");
        const span = document.createElement("span");
        span.className = "ml-auto fira-code text-mono-caption opacity-55 tracking-wide pcm-probe-ann";
        span.style.fontVariant = "small-caps";
        span.textContent = "offline";
        item.appendChild(span);
    });
    await page.waitForTimeout(250);

    const menu = page.locator('[role="menu"]').first();
    const buf = await menu.screenshot();
    const b64 = buf.toString("base64");

    const boxes = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]').getBoundingClientRect();
        const rel = (el) => {
            const r = el.getBoundingClientRect();
            return { x: +(r.left - menu.left).toFixed(1), y: +(r.top - menu.top).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
        };
        return {
            menuW: +menu.width.toFixed(1), menuH: +menu.height.toFixed(1),
            label: rel(document.querySelector(".dropdown-menu__label")),
            annotation: rel(document.querySelector(".pcm-probe-ann")),
            rename: rel([...document.querySelectorAll('[role="menuitem"]')].find((i) => /Rename/.test(i.textContent))),
            del: rel([...document.querySelectorAll('[role="menuitem"]')].find((i) => /Delete/.test(i.textContent))),
        };
    });

    const blank = await ctx.newPage();
    const sampled = await blank.evaluate(
        async ([b64, boxes]) => {
            const img = new Image();
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
            const c = document.createElement("canvas");
            c.width = img.width; c.height = img.height;
            const g = c.getContext("2d", { willReadFrequently: true });
            g.drawImage(img, 0, 0);
            const dpr = img.width / boxes.menuW;
            const px = (x, y) => { const d = g.getImageData(Math.round(x * dpr), Math.round(y * dpr), 1, 1).data; return [d[0], d[1], d[2]]; };
            // darkest pixel inside a box = the ink; median-ish light pixel = the surface
            const scan = (b) => {
                const xs = [], ink = [255, 255, 255].slice();
                let darkest = null, dl = Infinity, lightest = null, ll = -Infinity;
                for (let y = b.y + 2; y < b.y + b.h - 2; y += 1)
                    for (let x = b.x + 2; x < b.x + b.w - 2; x += 1) {
                        const p = px(x, y);
                        const l = 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
                        if (l < dl) { dl = l; darkest = p; }
                        if (l > ll) { ll = l; lightest = p; }
                    }
                return { darkest, lightest };
            };
            const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
            const lum = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
            const ratio = (a, b) => { const [h, l] = lum(a) > lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)]; return +((h + 0.05) / (l + 0.05)).toFixed(2); };
            const lbl = scan(boxes.label), ann = scan(boxes.annotation), ren = scan(boxes.rename), del = scan(boxes.del);
            // surface = the lightest pixel found in the label band (no ink there at the far right)
            const surface = lbl.lightest;
            return {
                dpr: +dpr.toFixed(2),
                surface,
                headerInk: lbl.darkest, headerContrast: ratio(lbl.darkest, surface),
                annotationInk: ann.darkest, annotationContrast: ratio(ann.darkest, surface),
                renameInk: ren.darkest, renameContrast: ratio(ren.darkest, surface),
                deleteInk: del.darkest, deleteContrast: ratio(del.darkest, surface),
                deleteVsRenameDeltaE_approx: Math.round(
                    Math.hypot(del.darkest[0] - ren.darkest[0], del.darkest[1] - ren.darkest[1], del.darkest[2] - ren.darkest[2]),
                ),
            };
        },
        [b64, boxes],
    );
    R[scheme] = { boxes, sampled };
    await page.screenshot({ path: new URL(`./evidence/pass2-${scheme}-degraded.png`, import.meta.url).pathname });
    await ctx.close();
}

const browser = await chromium.launch();
for (const s of ["light", "dark"]) { try { await run(browser, s); } catch (e) { R[s + "Error"] = String(e).slice(0, 300); } }
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
