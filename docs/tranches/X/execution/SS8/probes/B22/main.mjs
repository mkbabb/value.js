// SS-8 · B22-gradient-specimen — the live witness for wb-gradient-easingspecimenstrip U-1..U-14.
// One browser per run; one context per cell (lib.cell closes it in finally); browser closed in finally.
// CELLS=comma list selects cells; default = all. Output: evidence/B22-gradient-specimen/main.<cell>.out.json
import { launch, cell, BASE, EVID, typeCSS, save } from "./lib.mjs";

const ALL = ["light", "dark", "inkL", "inkD", "hues", "auth", "u7b", "u7c", "arms", "feather", "keep", "radius"];
const CELLS = (process.env.CELLS || ALL.join(",")).split(",");

async function goOpen(page, rowIdx = 0, bust = "") {
    await page.goto(`${BASE}/${bust}#/gradient`, { waitUntil: "commit", timeout: 240000 });
    await page.waitForSelector(".easing-panel", { timeout: 240000 });
    await page.waitForTimeout(2000);
    const head = page.locator(".interval-head").nth(rowIdx);
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    await page.waitForTimeout(1200);
}

// In-page helpers installed per page.
const HELPERS = () => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    window.__rgb = (css) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3]]; };
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    window.__L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    window.__cr = (a, b) => { const x = __L(a), y = __L(b); return +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(3); };
    window.__oklch = ([r, g, b]) => {
        const [R, G, B] = [lin(r), lin(g), lin(b)];
        const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
        const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
        const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
        const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
        const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
        const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
        const C = Math.hypot(A, Bb); let h = (Math.atan2(Bb, A) * 180) / Math.PI; if (h < 0) h += 360;
        return [+L.toFixed(4), +C.toFixed(4), +h.toFixed(1)];
    };
};

// Decode a PNG (base64) in-page; returns a sampler over device pixels.
async function decode(page, buf, dsf) {
    await page.evaluate(async ({ b64 }) => {
        const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0);
        window.__shot = x.getImageData(0, 0, c.width, c.height);
    }, { b64: buf.toString("base64") });
    return (rects) => page.evaluate(({ rects, dsf }) => {
        const { data, width } = window.__shot;
        return rects.map(([x0, y0, x1, y1]) => {
            let n = 0, s = [0, 0, 0], Ls = 0;
            for (let y = Math.round(y0 * dsf); y < Math.round(y1 * dsf); y++)
                for (let x = Math.round(x0 * dsf); x < Math.round(x1 * dsf); x++) {
                    const i = (y * width + x) * 4; const p = [data[i], data[i + 1], data[i + 2]];
                    s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; Ls += __L(p); n++;
                }
            return n ? { rgb: s.map((v) => +(v / n).toFixed(1)), L: +(Ls / n).toFixed(4), n } : null;
        });
    }, { rects, dsf });
}

async function schemeCell(page, dark) {
    const dsf = 2;
    await goOpen(page);
    await page.evaluate(HELPERS);
    const strip = page.locator(".specimen-strip:visible").first();
    const base = await page.evaluate(() => {
        const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
        const pr = s.getBoundingClientRect();
        const tiles = [...s.querySelectorAll(".specimen-tile")];
        const geo = tiles.map((t) => {
            const r = t.getBoundingClientRect(); const cs = getComputedStyle(t);
            const lab = t.parentElement.querySelector(".tile-label").getBoundingClientRect();
            return { id: t.dataset.specimen, w: +r.width.toFixed(2), h: +r.height.toFixed(2), radius: cs.borderRadius, labelW: +lab.width.toFixed(2), labelOverTile: +(lab.width - r.width).toFixed(2), labelTopGap: +(lab.top - r.bottom).toFixed(2) };
        });
        const hist = {}; geo.forEach((g) => { const k = `${g.w}x${g.h}`; hist[k] = (hist[k] || 0) + 1; });
        const t0 = tiles[0]; const cs0 = getComputedStyle(t0);
        const sel = s.querySelector('.specimen-tile[data-state="on"]');
        const selLab = sel?.parentElement.querySelector(".tile-label");
        const unsel = tiles.find((t) => t !== sel).parentElement.querySelector(".tile-label");
        const row = s.closest(".easing-row"); const panel = s.closest(".easing-panel");
        const chain = []; let e = s; for (let i = 0; i < 6 && e; i++, e = e.parentElement) chain.push({ el: e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 3).join("."), boxShadow: getComputedStyle(e).boxShadow, bg: getComputedStyle(e).backgroundColor });
        const fs = (sel2) => { const n = document.querySelector(sel2); return n && n.getClientRects().length ? getComputedStyle(n).fontSize : null; };
        const visRow = row;
        const readout = visRow.querySelector(".readout-rail code");
        const headName = visRow.querySelector(".interval-head .truncate");
        const allEls = document.querySelectorAll("*").length;
        const stripEls = [...document.querySelectorAll(".specimen-strip")].reduce((n, x) => n + x.querySelectorAll("*").length + 1, 0);
        const root = getComputedStyle(document.documentElement);
        const railBtn = visRow.querySelector(".rail-btn");
        return {
            port: { w: pr.width, h: pr.height, scrollW: s.scrollWidth, clientW: s.clientWidth, rowDisplay: getComputedStyle(s.querySelector(".strip-row")).display },
            tiles: tiles.length, tileHist: hist, geo,
            labelsWiderThanTile: geo.filter((g) => g.labelOverTile > 0).length,
            tile0: { cls: t0.className, boxShadow: cs0.boxShadow, bg: cs0.backgroundColor, backdrop: cs0.backdropFilter, radius: cs0.borderRadius },
            selectedId: sel?.dataset.specimen ?? null,
            motionAccent: getComputedStyle(row).getPropertyValue("--motion-accent").trim(),
            selLabelColor: selLab ? getComputedStyle(selLab).color : null,
            selLabelWeight: selLab ? getComputedStyle(selLab).fontWeight : null,
            unselLabelColor: getComputedStyle(unsel).color,
            eyebrowColor: getComputedStyle(s.querySelector(".family-eyebrow")).color,
            selGlyphStroke: sel ? getComputedStyle(sel.querySelector(".tile-glyph path")).stroke : null,
            restGlyphStroke: getComputedStyle(tiles.find((t) => t !== sel).querySelector(".tile-glyph path")).stroke,
            type: { tileLabel: getComputedStyle(s.querySelector(".tile-label")).fontSize, eyebrow: getComputedStyle(s.querySelector(".family-eyebrow")).fontSize, readout: readout ? getComputedStyle(readout).fontSize : null, headName: headName ? getComputedStyle(headName).fontSize : null, readoutFamily: readout ? getComputedStyle(readout).fontFamily.slice(0, 40) : null },
            chain, rowShadow: getComputedStyle(row).boxShadow, panelShadow: getComputedStyle(panel).boxShadow,
            dom: { all: allEls, strips: document.querySelectorAll(".specimen-strip").length, stripEls, share: +(100 * stripEls / allEls).toFixed(1), perStrip: s.querySelectorAll("*").length + 1 },
            radius: { root: root.getPropertyValue("--radius").trim(), input: root.getPropertyValue("--radius-input").trim(), railBtn: railBtn ? getComputedStyle(railBtn).borderRadius : null, railBtnResolved: railBtn ? getComputedStyle(railBtn).borderTopLeftRadius : null },
        };
    });
    // Geometry for pixel sampling (CSS px, relative to the strip screenshot).
    const g = await page.evaluate(() => {
        const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
        const pr = s.getBoundingClientRect();
        const rel = (r) => [r.left - pr.left, r.top - pr.top, r.right - pr.left, r.bottom - pr.top];
        const tiles = [...s.querySelectorAll(".specimen-tile")];
        const t1 = tiles[0].getBoundingClientRect(), t2 = tiles[1].getBoundingClientRect();
        const sel = s.querySelector('.specimen-tile[data-state="on"]') || tiles[0];
        const sr = sel.getBoundingClientRect();
        const selLab = sel.parentElement.querySelector(".tile-label").getBoundingClientRect();
        const eb = s.querySelector(".family-eyebrow").getBoundingClientRect();
        const cy = (t1.top + t1.bottom) / 2;
        return {
            trough: rel({ left: t1.right + 0.5, right: t2.left - 0.5, top: cy - 6, bottom: cy + 6 }),
            below: rel({ left: t1.left + 10, right: t1.right - 10, top: t1.bottom + 1, bottom: t1.bottom + 3 }),
            control: rel({ left: eb.right + 4, right: eb.right + 30, top: eb.top, bottom: eb.bottom }),
            tileFill: rel({ left: t1.left + 6, right: t1.left + 10, top: cy - 2, bottom: cy + 2 }),
            selFill: rel({ left: sr.left + 6, right: sr.left + 10, top: (sr.top + sr.bottom) / 2 - 2, bottom: (sr.top + sr.bottom) / 2 + 2 }),
            selLabBg: rel({ left: selLab.right + 1, right: selLab.right + 4, top: selLab.top + 2, bottom: selLab.bottom - 2 }),
            whole: [0, 0, pr.width, pr.height],
        };
    });
    const shotOn = await strip.screenshot({ path: `${EVID}/strip-${dark ? "dark" : "light"}-shadow-on.png` });
    const sampleOn = await decode(page, shotOn, dsf);
    const on = await sampleOn([g.trough, g.below, g.control, g.tileFill, g.selFill, g.selLabBg, g.whole]);
    await page.addStyleTag({ content: ".specimen-tile{box-shadow:none!important}" });
    await page.waitForTimeout(400);
    const shotOff = await strip.screenshot({ path: `${EVID}/strip-${dark ? "dark" : "light"}-shadow-off.png` });
    const sampleOff = await decode(page, shotOff, dsf);
    const off = await sampleOff([g.trough, g.below, g.control, g.tileFill, g.selFill, g.selLabBg, g.whole]);
    // per-pixel diff count over the strip
    const diff = await page.evaluate(async ({ a, b }) => {
        const load = async (b64) => { const i = new Image(); i.src = `data:image/png;base64,${b64}`; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return x.getImageData(0, 0, c.width, c.height); };
        const A = await load(a), B = await load(b); let n = 0, maxd = 0;
        for (let i = 0; i < A.data.length; i += 4) { const d = Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]); if (d > 6) n++; if (d > maxd) maxd = d; }
        return { changedPx: n, totalPx: A.data.length / 4, pct: +(100 * n / (A.data.length / 4)).toFixed(2), maxSumDelta: maxd };
    }, { a: shotOn.toString("base64"), b: shotOff.toString("base64") });
    const names = ["trough", "below", "control", "tileFill", "selFill", "selLabBg", "whole"];
    const px = Object.fromEntries(names.map((n, i) => [n, { on: on[i], off: off[i], dL: on[i] && off[i] ? +(off[i].L - on[i].L).toFixed(4) : null }]));
    // Contrast figures (computed inks vs measured composited backgrounds).
    const contrast = await page.evaluate(({ base, px }) => {
        const c = (css) => __rgb(css).slice(0, 3);
        const out = {};
        if (base.selLabelColor) {
            out.selVsUnselLabel = __cr(c(base.selLabelColor), c(base.unselLabelColor));
            out.selLabelOnPlate = __cr(c(base.selLabelColor), px.selLabBg.on.rgb);
            out.selGlyphOnCapsule = __cr(c(base.selGlyphStroke), px.selFill.on.rgb);
        }
        out.unselLabelOnPlate = __cr(c(base.unselLabelColor), px.selLabBg.on.rgb);
        out.eyebrowOnPlate = __cr(c(base.eyebrowColor), px.control.on.rgb);
        out.inkOklch = base.motionAccent ? __oklch(c(base.motionAccent)) : null;
        return out;
    }, { base, px });
    return { base, px, diff, contrast };
}

// U-11 / U-13: ink vs capsule fill and vs --well-bg across representative midpoints.
const GRADS = [
    null, // the seeded default
    "linear-gradient(90deg, #ff0000, #0000ff)",
    "linear-gradient(90deg, #ffff00, #ffffff)",
    "linear-gradient(90deg, #001a33, #000000)",
    "linear-gradient(90deg, #00ffff, #00c0c0)",
];
async function inkSweep(page) {
    const rows = [];
    for (const gcss of GRADS) {
        if (gcss) { await typeCSS(page, gcss, { blur: true, wait: 1200 }); }
        const head = page.locator(".interval-head").first();
        if ((await head.getAttribute("aria-expanded")) !== "true") { await head.click(); await page.waitForTimeout(900); }
        const strip = page.locator(".specimen-strip:visible").first();
        const rail = page.locator(".easing-row").first().locator(".readout-rail");
        const geom = await page.evaluate(() => {
            const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
            const row = s.closest(".easing-row");
            const sel = s.querySelector('.specimen-tile[data-state="on"]') || s.querySelector(".specimen-tile");
            const sr = sel.getBoundingClientRect(), pr = s.getBoundingClientRect();
            const rr = row.querySelector(".readout-rail").getBoundingClientRect();
            const code = row.querySelector(".readout-rail code")?.getBoundingClientRect();
            return {
                ink: getComputedStyle(row).getPropertyValue("--motion-accent").trim(),
                css: row.querySelector(".readout-rail code")?.textContent,
                fill: [sr.left - pr.left + 6, (sr.top + sr.bottom) / 2 - pr.top - 2, sr.left - pr.left + 10, (sr.top + sr.bottom) / 2 - pr.top + 2],
                well: code ? [code.right - rr.left + 1, 4, code.right - rr.left + 3, rr.height - 4] : [2, 2, 6, rr.height - 2],
            };
        });
        const s1 = await decode(page, await strip.screenshot(), 2); const [fill] = await s1([geom.fill]);
        const s2 = await decode(page, await rail.screenshot(), 2); const [well] = await s2([geom.well]);
        const r = await page.evaluate(({ ink, fill, well }) => { const c = __rgb(ink).slice(0, 3); return { inkRgb: c, inkOklch: __oklch(c), onCapsule: __cr(c, fill.rgb), onWell: __cr(c, well.rgb), capsule: fill.rgb, wellPx: well.rgb }; }, { ink: geom.ink, fill, well });
        rows.push({ gradient: gcss ?? "default", ...geom, ...r });
    }
    return rows;
}

// U-13: scheme-wide hue census around the selected ink (dark).
async function hueCensus(page) {
    return page.evaluate(() => {
        const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
        const row = s.closest(".easing-row");
        const ink = __oklch(__rgb(getComputedStyle(row).getPropertyValue("--motion-accent").trim()).slice(0, 3));
        const hits = []; let n = 0;
        for (const el of document.querySelectorAll("body *")) {
            if (!el.getClientRects().length) continue;
            if (row.contains(el)) continue; // outside the ink's own row
            const cs = getComputedStyle(el);
            for (const prop of ["color", "backgroundColor", "borderTopColor", "fill", "stroke"]) {
                const v = cs[prop]; if (!v || v === "none" || v.includes("url(")) continue;
                const rgba = __rgb(v); if (rgba[3] < 40) continue;
                if (prop === "color" && !el.childNodes.length) continue;
                n++;
                const o = __oklch(rgba.slice(0, 3));
                if (o[1] < 0.06) continue;
                const dh = Math.min(Math.abs(o[2] - ink[2]), 360 - Math.abs(o[2] - ink[2]));
                if (dh <= 20) hits.push({ el: el.tagName.toLowerCase() + "." + [...el.classList].slice(0, 2).join("."), prop, v: v.slice(0, 60), oklch: o });
            }
        }
        return { ink, sampled: n, sameHueChromatic: hits.length, hits: hits.slice(0, 25) };
    });
}

const results = {};
const b = await launch();
try {
    for (const name of CELLS) {
        const t0 = Date.now();
        let r;
        if (name === "light" || name === "dark") {
            r = await cell(b, { w: 1440, h: 900, dark: name === "dark", deviceScaleFactor: 2 }, async (page) => schemeCell(page, name === "dark"));
        } else if (name === "inkL" || name === "inkD") {
            r = await cell(b, { w: 1440, h: 900, dark: name === "inkD", deviceScaleFactor: 2 }, async (page) => {
                await goOpen(page); await page.evaluate(HELPERS);
                return { ink: await inkSweep(page) };
            });
        } else if (name === "hues") {
            r = await cell(b, { w: 1440, h: 900, dark: true }, async (page) => {
                await goOpen(page); await page.evaluate(HELPERS);
                return hueCensus(page);
            });
        } else if (name === "auth") {
            r = await cell(b, { w: 1440, h: 900 }, async (page) => {
                await goOpen(page);
                await page.locator('.easing-row').first().getByRole("button", { name: "Author a custom curve" }).click();
                await page.waitForTimeout(1500);
                await page.locator(".easing-row").first().screenshot({ path: `${EVID}/auth-row-1440-light.png` });
                return page.evaluate(() => {
                    const row = document.querySelector(".easing-row");
                    const stage = row.querySelector(".easing-authoring") || row.querySelector("[data-testid='easing-picker']")?.parentElement;
                    const svg = row.querySelector("[data-testid='easing-picker'] svg") || row.querySelector(".easing-authoring svg");
                    const well = svg?.closest(".glass-card") || stage;
                    const plot = svg?.querySelector("rect.stroke-border") || svg?.querySelector("rect");
                    const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
                    const sv = R(svg), pl = R(plot), wl = R(well);
                    const cs = svg ? getComputedStyle(svg) : null;
                    return {
                        stage: R(stage), well: wl, wellCls: well?.className?.toString().slice(0, 80), svg: sv, svgRole: svg?.getAttribute("role"), viewBox: svg?.getAttribute("viewBox"), svgBlockSize: cs?.blockSize, svgInline: svg?.getAttribute("style"),
                        plot: pl, plotRem: pl ? +(pl.w / 16).toFixed(2) : null,
                        letterboxPct: sv && pl ? +(100 * (sv.w - pl.w) / sv.w).toFixed(1) : null,
                        emptyWellPct: wl && pl ? +(100 * (1 - (pl.w * pl.h) / (wl.w * wl.h))).toFixed(1) : null,
                        vbRatio: stage ? getComputedStyle(stage).getPropertyValue("--vb-ratio").trim() : null,
                        containerType: well ? getComputedStyle(well).containerType : null,
                    };
                });
            });
        } else if (name === "u7b" || name === "u7c") {
            r = await cell(b, { w: 1440, h: 900 }, async (page) => {
                await goOpen(page);
                await page.locator('.easing-row').first().getByRole("button", { name: "Author a custom curve" }).click();
                await page.waitForTimeout(1500);
                const alive = () => page.evaluate(() => ({ panes: document.querySelectorAll(".easing-panel").length, boundary: /unexpected error/i.test(document.body.innerText), readout: document.querySelector(".easing-row .readout-rail code")?.textContent ?? null, head: document.querySelector(".easing-row .interval-head .truncate")?.textContent ?? null }));
                const log = [];
                if (name === "u7b") {
                    const combo = page.locator(".easing-row").first().getByRole("combobox").first();
                    log.push({ comboName: await combo.getAttribute("aria-label").catch(() => null) });
                    await combo.click(); await page.waitForTimeout(600);
                    const opt = page.getByRole("option", { name: /in-out-back/i }).first();
                    log.push({ optionCount: await page.getByRole("option").count() });
                    await opt.click(); await page.waitForTimeout(1500);
                    log.push({ after: await alive() });
                    await page.locator(".easing-row").first().screenshot({ path: `${EVID}/u7b-after-preset.png` }).catch(() => {});
                } else {
                    const pts = await page.evaluate(() => [...document.querySelectorAll(".easing-row [data-testid='easing-picker'] [tabindex], .easing-row [role='slider']")].map((e, i) => ({ i, tag: e.tagName, role: e.getAttribute("role"), label: e.getAttribute("aria-label") })));
                    log.push({ focusables: pts });
                    const handles = page.locator(".easing-row").first().locator("[role='slider']");
                    const n = await handles.count();
                    const h2 = n >= 2 ? handles.nth(1) : null;
                    if (h2) {
                        await h2.focus();
                        for (let k = 1; k <= 4; k++) { await page.keyboard.press("Shift+ArrowUp"); await page.waitForTimeout(700); log.push({ press: k, ...(await alive()) }); }
                    }
                    await page.locator(".easing-row").first().screenshot({ path: `${EVID}/u7c-after-keys.png` }).catch(() => {});
                }
                return { log, final: await alive() };
            });
        } else if (name === "arms") {
            const ARMS = [
                { name: "desk-1440", w: 1440, h: 900 }, { name: "zoom-200", w: 720, h: 450 }, { name: "zoom-400", w: 360, h: 225 },
                { name: "mobile-390", w: 390, h: 844 }, { name: "mobile-320", w: 320, h: 568 },
            ];
            r = [];
            for (const a of ARMS) {
                r.push({ arm: a.name, ...(await cell(b, { w: a.w, h: a.h }, async (page) => {
                    await goOpen(page);
                    const m = await page.evaluate(() => {
                        const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
                        if (!s) return { present: false };
                        const pr = s.getBoundingClientRect(); const tiles = [...s.querySelectorAll(".specimen-tile")].map((t) => t.getBoundingClientRect());
                        return { portW: +pr.width.toFixed(1), portH: +pr.height.toFixed(1), scrollW: s.scrollWidth, clientW: s.clientWidth, rowDisplay: getComputedStyle(s.querySelector(".strip-row")).display, fullyVisible: tiles.filter((r) => r.left >= pr.left - 0.5 && r.right <= pr.right + 0.5 && r.top >= pr.top - 0.5 && r.bottom <= pr.bottom + 0.5).length, tiles: tiles.length, tileW: +tiles[0].width.toFixed(2), labelPx: getComputedStyle(s.querySelector(".tile-label")).fontSize, docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
                    });
                    await page.locator(".specimen-strip:visible").first().screenshot({ path: `${EVID}/arm-${a.name}.png` }).catch(() => {});
                    return m;
                })) });
            }
        } else if (name === "feather") {
            r = await cell(b, { w: 390, h: 844 }, async (page) => {
                await goOpen(page);
                const n = await page.evaluate(() => [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length).querySelectorAll(".specimen-tile").length);
                const rows = [];
                for (let i = 0; i < n; i++) {
                    await page.evaluate((i) => { const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length); s.querySelectorAll(".specimen-tile")[i].click(); }, i);
                    await page.waitForTimeout(900);
                    rows.push(await page.evaluate((i) => {
                        const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
                        if (!s) return { i, alive: false };
                        const t = s.querySelectorAll(".specimen-tile")[i]; const tr = t.getBoundingClientRect(); const pr = s.getBoundingClientRect();
                        const cs = getComputedStyle(s);
                        const fs = parseFloat(cs.getPropertyValue("--fade-start")) || 0, fe = parseFloat(cs.getPropertyValue("--fade-end")) || 0;
                        const overL = Math.max(0, Math.min(tr.right, pr.left + fs) - Math.max(tr.left, pr.left));
                        const overR = Math.max(0, Math.min(tr.right, pr.right) - Math.max(tr.left, pr.right - fe));
                        return { i, id: t.dataset.specimen, pressed: t.dataset.state === "on", scrollLeft: Math.round(s.scrollLeft), max: s.scrollWidth - s.clientWidth, fadeStart: fs, fadeEnd: fe, tileW: +tr.width.toFixed(1), tileL: +(tr.left - pr.left).toFixed(1), tileR: +(pr.right - tr.right).toFixed(1), underFeatherPx: +(overL + overR).toFixed(1), fraction: +((overL + overR) / tr.width).toFixed(3), mask: (cs.maskImage || cs.webkitMaskImage || "").slice(0, 160) };
                    }, i));
                }
                await page.locator(".specimen-strip:visible").first().screenshot({ path: `${EVID}/feather-390-last.png` }).catch(() => {});
                const affected = rows.filter((x) => x.fraction > 0);
                return { rows, affected: affected.length, maxFraction: Math.max(...rows.map((x) => x.fraction || 0)), meanAffected: affected.length ? +(affected.reduce((a, x) => a + x.fraction, 0) / affected.length).toFixed(3) : 0 };
            });
        } else if (name === "radius") {
            r = await cell(b, { w: 1440, h: 900 }, async (page) => {
                await goOpen(page);
                return page.evaluate(() => {
                    const rs = getComputedStyle(document.documentElement), bs = getComputedStyle(document.body);
                    const tok = ["--radius", "--radius-input", "--radius-media", "--radius-strip", "--radius-md", "--radius-sm", "--radius-lg"];
                    const decl = [];
                    const walk = (rules, sheet, layer) => { for (const r of rules) {
                        if (r.cssRules && !r.style) walk(r.cssRules, sheet, (r.name ?? layer) || layer);
                        if (r.style) for (const t of ["--radius", "--radius-input"]) { const v = r.style.getPropertyValue(t); if (v) decl.push({ t, v: v.trim(), sel: r.selectorText?.slice(0, 60), layer: layer ?? null, sheet: (sheet.href || "inline").split("/").slice(-2).join("/").slice(0, 80) }); }
                    } };
                    for (const sh of document.styleSheets) { try { walk(sh.cssRules, sh, null); } catch (e) {} }
                    const btn = document.querySelector(".easing-row .rail-btn");
                    return { root: Object.fromEntries(tok.map((t) => [t, rs.getPropertyValue(t).trim()])), body: Object.fromEntries(tok.map((t) => [t, bs.getPropertyValue(t).trim()])), declarations: decl.slice(0, 30), nDecl: decl.length, railBtnRadius: btn ? getComputedStyle(btn).borderTopLeftRadius : null };
                });
            });
        } else if (name === "keep") {
            r = await cell(b, { w: 390, h: 844 }, async (page) => {
                const trials = [];
                for (let k = 0; k < 10; k++) {
                    await goOpen(page, 0, `?k=${k}`);
                    trials.push(await page.evaluate(async () => {
                        const s = [...document.querySelectorAll(".specimen-strip")].find((e) => e.getClientRects().length);
                        const tiles = s.querySelectorAll(".specimen-tile"); const last = tiles[tiles.length - 1];
                        const before = s.scrollLeft, y0 = scrollY; last.click();
                        await new Promise((r) => setTimeout(r, 1000));
                        const pr = s.getBoundingClientRect(), tr = last.getBoundingClientRect();
                        return { before, after: Math.round(s.scrollLeft), max: s.scrollWidth - s.clientWidth, visible: tr.left >= pr.left - 0.5 && tr.right <= pr.right + 0.5, pressed: last.dataset.state === "on", id: last.dataset.specimen, scrollYDelta: scrollY - y0 };
                    }));
                }
                return { trials, green: trials.filter((t) => t.visible && t.pressed).length };
            });
        }
        results[name] = r;
        save(`main.${name}.out.json`, { cell: name, ms: Date.now() - t0, result: r });
        console.log(`[cell ${name}] ${Date.now() - t0}ms ${JSON.stringify(r).slice(0, 300)}`);
    }
} finally {
    await b.close();
}
