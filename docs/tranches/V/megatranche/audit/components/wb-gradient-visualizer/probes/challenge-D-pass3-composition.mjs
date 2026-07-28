// CHALLENGE-D pass 3 — composition / rhythm / contrast probe for GradientVisualizer.
// READ-ONLY against the live dev server. No source is mutated.
//
//   node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/challenge-D-pass3-composition.mjs
//
// Emits JSON blocks to stdout; screenshots into ../evidence/.

import { chromium } from "playwright";
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";

const URL_ = "http://localhost:9000/#/gradient";
const OUT = path.resolve(
    new URL("../evidence", import.meta.url).pathname,
);

// ── minimal PNG decoder (8-bit, non-interlaced, colour type 2 or 6) ──
function decodePNG(buf) {
    let p = 8; // skip signature
    let w = 0, h = 0, ct = 0, bd = 0;
    const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p);
        const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") {
            w = data.readUInt32BE(0);
            h = data.readUInt32BE(4);
            bd = data[8];
            ct = data[9];
        } else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        p += 12 + len;
    }
    if (bd !== 8 || (ct !== 2 && ct !== 6)) throw new Error(`unsupported PNG ${bd}/${ct}`);
    const chan = ct === 6 ? 4 : 3;
    const raw = zlib.inflateSync(Buffer.concat(idat));
    const stride = w * chan;
    const out = Buffer.alloc(h * stride);
    let rp = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[rp++];
        const row = raw.subarray(rp, rp + stride); rp += stride;
        const cur = out.subarray(y * stride, (y + 1) * stride);
        const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const a = x >= chan ? cur[x - chan] : 0;
            const b = prev[x];
            const c = x >= chan ? prev[x - chan] : 0;
            let v = row[x];
            if (f === 1) v += a;
            else if (f === 2) v += b;
            else if (f === 3) v += (a + b) >> 1;
            else if (f === 4) {
                const pp = a + b - c;
                const pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
                v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
            }
            cur[x] = v & 0xff;
        }
    }
    return { w, h, chan, data: out };
}

const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => {
    const l1 = relLum(a), l2 = relLum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

// darkest (ink) and modal-lightest (ground) pixel inside a clip
function inkAndGround(png) {
    const { w, h, chan, data } = png;
    let ink = null, inkL = 2;
    const hist = new Map();
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * chan;
            const px = [data[i], data[i + 1], data[i + 2]];
            const L = relLum(px);
            if (L < inkL) { inkL = L; ink = px; }
            const key = `${px[0] >> 3},${px[1] >> 3},${px[2] >> 3}`;
            const e = hist.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
            e.n++; e.r += px[0]; e.g += px[1]; e.b += px[2];
            hist.set(key, e);
        }
    }
    let best = null;
    for (const e of hist.values()) if (!best || e.n > best.n) best = e;
    const ground = [Math.round(best.r / best.n), Math.round(best.g / best.n), Math.round(best.b / best.n)];
    return { ink, ground, ratio: +contrast(ink, ground).toFixed(2) };
}

async function clipContrast(page, sel, label, tag) {
    const box = await page.locator(sel).first().boundingBox();
    if (!box) return { label, err: "no box" };
    const clip = {
        x: Math.round(box.x), y: Math.round(box.y),
        width: Math.max(2, Math.round(box.width)), height: Math.max(2, Math.round(box.height)),
    };
    const buf = await page.screenshot({ clip });
    fs.writeFileSync(path.join(OUT, `challenge-D-p3-${tag}.png`), buf);
    const r = inkAndGround(decodePNG(buf));
    return { label, rect: clip, ...r };
}

const log = (t, o) => console.log(`\n### ${t}\n` + JSON.stringify(o, null, 2));

const run = async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const browser = await chromium.launch();

    // ── A. desktop 1440 composition ──
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL_, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    log("A · route composition (1440)", await page.evaluate(() => {
        const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
        const main = document.querySelector("main");
        const tile = document.querySelector('[data-testid="gradient-render-tile"]');
        // the gradient body root = the tile's ancestor with class flex-col gap-5
        let body = tile; while (body && !(body.classList.contains("flex-col") && body.classList.contains("gap-5"))) body = body.parentElement;
        const panes = [...document.querySelectorAll("main [class*='pane-scroll-fade']")].map(r);
        const h3s = [...document.querySelectorAll("main h3")].map((e) => ({ t: e.textContent.trim().slice(0, 24), ...r(e) }));
        return {
            viewport: { w: innerWidth, h: innerHeight },
            main: r(main),
            panes,
            paneShareOfMain: panes.map((p) => +(p.w / r(main).w * 100).toFixed(1)),
            bodyRect: body ? r(body) : null,
            bodyChildren: body ? [...body.children].map((c) => ({ tag: c.tagName, cls: c.className.slice(0, 60), ...r(c) })) : [],
            h3s,
        };
    }));

    log("B · ragged right edge inside the gradient body (1440)", await page.evaluate(() => {
        const R = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { left: +b.left.toFixed(1), right: +b.right.toFixed(1), w: +b.width.toFixed(1) }; };
        const rail = document.querySelector('[data-testid="gradient-rail"], [class*="rail"]');
        const railR = rail ? (() => { const b = rail.getBoundingClientRect(); return { left: +b.left.toFixed(1), right: +b.right.toFixed(1), w: +b.width.toFixed(1), cls: rail.className.slice(0, 60) }; })() : null;
        const hrs = [...document.querySelectorAll("main hr")].map((e) => { const b = e.getBoundingClientRect(); return { left: +b.left.toFixed(1), right: +b.right.toFixed(1), y: +b.top.toFixed(1) }; });
        const triggers = [...document.querySelectorAll("main [role='combobox'],main button[aria-haspopup='listbox']")].map((e) => { const b = e.getBoundingClientRect(); return { name: e.getAttribute("aria-label"), left: +b.left.toFixed(1), right: +b.right.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; });
        const slider = document.querySelector("main [role='slider']");
        const sliderTrack = slider ? slider.closest("[class*='relative']") : null;
        return {
            rail: railR,
            hrs,
            triggers,
            sliderThumb: slider ? (() => { const b = slider.getBoundingClientRect(); return { left: +b.left.toFixed(1), right: +b.right.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; })() : null,
            sliderTrack: sliderTrack ? (() => { const b = sliderTrack.getBoundingClientRect(); return { left: +b.left.toFixed(1), right: +b.right.toFixed(1) }; })() : null,
            tile: R('[data-testid="gradient-render-tile"]'),
            codeEditor: R('[role="textbox"][aria-label="Gradient CSS"]'),
        };
    }));

    log("C · vertical rhythm — gaps between body children (1440)", await page.evaluate(() => {
        const tile = document.querySelector('[data-testid="gradient-render-tile"]');
        let body = tile; while (body && !(body.classList.contains("flex-col") && body.classList.contains("gap-5"))) body = body.parentElement;
        const kids = [...body.children];
        const out = [];
        for (let i = 0; i < kids.length; i++) {
            const b = kids[i].getBoundingClientRect();
            const label = kids[i].tagName === "HR" ? "HR" : (kids[i].textContent || "").trim().slice(0, 22) || kids[i].tagName;
            const gapAbove = i === 0 ? null : +(b.top - kids[i - 1].getBoundingClientRect().bottom).toFixed(1);
            out.push({ i, label, top: +b.top.toFixed(1), h: +b.height.toFixed(1), gapAbove });
        }
        return { gapToken: getComputedStyle(body).rowGap, kids: out };
    }));

    log("D · tile geometry + optical alignment (1440)", await page.evaluate(() => {
        const t = document.querySelector('[data-testid="gradient-render-tile"]').getBoundingClientRect();
        const labels = [...document.querySelectorAll("main .section-label")].map((e) => ({ t: e.textContent.trim(), top: +e.getBoundingClientRect().top.toFixed(1) }));
        const slider = document.querySelector("main [role='slider']").getBoundingClientRect();
        const trig = document.querySelector("main [role='combobox']").getBoundingClientRect();
        return {
            tile: { w: +t.width.toFixed(1), h: +t.height.toFixed(1), aspect: +(t.width / t.height).toFixed(3), top: +t.top.toFixed(1), bottom: +t.bottom.toFixed(1) },
            firstLabelTop: labels[0]?.top, labels,
            firstTriggerTop: +trig.top.toFixed(1),
            sliderThumbBottom: +slider.bottom.toFixed(1),
            tileOvershootBelowSlider: +(t.bottom - slider.bottom).toFixed(1),
            tileOvershootAboveLabel: +(labels[0].top - t.top).toFixed(1),
        };
    }));

    // ── E. Select dropdown open — is the #description slot rendered? ──
    await page.locator('[aria-label="Gradient type"]').click();
    await page.waitForTimeout(400);
    log("E · Select popover, open state (1440)", await page.evaluate(() => {
        const items = [...document.querySelectorAll("[role='option']")].map((e) => {
            const cs = getComputedStyle(e);
            return {
                text: e.textContent.trim(),
                rect: (() => { const b = e.getBoundingClientRect(); return { w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; })(),
                selected: e.getAttribute("aria-selected"),
                fontFamily: cs.fontFamily.split(",")[0],
                fontSize: cs.fontSize,
            };
        });
        const desc = [...document.querySelectorAll("[role='option'] .text-micro")].map((e) => ({ text: e.textContent.trim(), size: getComputedStyle(e).fontSize, family: getComputedStyle(e).fontFamily.split(",")[0] }));
        const content = document.querySelector("[role='listbox']");
        const b = content?.getBoundingClientRect();
        return { itemCount: items.length, items, descriptionSlotRendered: desc.length, desc, listbox: b ? { w: +b.width.toFixed(1), h: +b.height.toFixed(1), left: +b.left.toFixed(1), right: +b.right.toFixed(1) } : null };
    }));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);

    // ── F. contrast, light ──
    const lightContrast = [];
    for (const [sel, label, tag] of [
        ["main h3:has-text('Interpolation')", "h3 Interpolation", "light-h3"],
        ["main .section-label >> nth=0", "label TYPE", "light-label"],
        ["[data-testid='gradient-render-tile']", "render tile", "light-tile"],
    ]) {
        lightContrast.push(await clipContrast(page, sel, label, tag));
    }
    log("F · rendered contrast (light, 1440)", lightContrast);

    // ── G. focus register ──
    log("G · focus register", await page.evaluate(async () => {
        const read = (el) => { const cs = getComputedStyle(el); return { outline: cs.outline, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow.slice(0, 80) }; };
        const out = {};
        const trig = document.querySelector('[aria-label="Gradient type"]');
        trig.focus(); out.selectTrigger = read(trig);
        const slider = document.querySelector("main [role='slider']");
        slider.focus(); out.sliderThumb = read(slider);
        out.sliderAria = { valuenow: slider.getAttribute("aria-valuenow"), valuetext: slider.getAttribute("aria-valuetext"), label: slider.getAttribute("aria-label"), min: slider.getAttribute("aria-min") ?? slider.getAttribute("aria-valuemin"), max: slider.getAttribute("aria-valuemax") };
        const editor = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
        editor.focus(); out.codeEditor = { ...read(editor), ariaMultiline: editor.getAttribute("aria-multiline"), ariaDescribedby: editor.getAttribute("aria-describedby") };
        return out;
    }));

    // ── H. tap targets in the visualizer subtree ──
    log("H · tap targets (1440, WCAG 2.2 AA floor 24px / AAA 44px)", await page.evaluate(() => {
        const tile = document.querySelector('[data-testid="gradient-render-tile"]');
        let body = tile; while (body && !(body.classList.contains("flex-col") && body.classList.contains("gap-5"))) body = body.parentElement;
        return [...body.querySelectorAll("button,[role='button'],[role='combobox'],[role='slider'],[contenteditable]")].map((e) => {
            const b = e.getBoundingClientRect();
            return {
                tag: e.tagName, role: e.getAttribute("role"),
                name: (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 18) || e.getAttribute("title") || "").slice(0, 28),
                title: e.getAttribute("title"),
                w: +b.width.toFixed(1), h: +b.height.toFixed(1),
                under24: Math.min(b.width, b.height) < 24, under44: Math.min(b.width, b.height) < 44,
            };
        }).filter((r) => r.w > 0);
    }));

    // ── I. state: remove a stop → Easing section disappears ──
    log("I · state — stop removal / section collapse", await page.evaluate(async () => {
        const tile = document.querySelector('[data-testid="gradient-render-tile"]');
        let body = tile; while (body && !(body.classList.contains("flex-col") && body.classList.contains("gap-5"))) body = body.parentElement;
        const before = { bodyH: +body.getBoundingClientRect().height.toFixed(1), h3: [...document.querySelectorAll("main h3")].map((e) => e.textContent.trim()), hr: document.querySelectorAll("main hr").length };
        return { before };
    }));

    await page.screenshot({ path: path.join(OUT, "challenge-D-p3-desktop-1440-light.png"), fullPage: false });

    // ── J. dark scheme contrast ──
    const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    const dpage = await dctx.newPage();
    await dpage.goto(URL_, { waitUntil: "networkidle" });
    await dpage.waitForTimeout(900);
    const darkContrast = [];
    for (const [sel, label, tag] of [
        ["main h3:has-text('Interpolation')", "h3 Interpolation", "dark-h3"],
        ["main .section-label >> nth=0", "label TYPE", "dark-label"],
    ]) darkContrast.push(await clipContrast(dpage, sel, label, tag));
    log("J · rendered contrast (dark, 1440)", { hasDarkClass: await dpage.evaluate(() => document.documentElement.classList.contains("dark")), rows: darkContrast });
    await dctx.close();

    // ── K. 320 narrow arm ──
    const nctx = await browser.newContext({ viewport: { width: 320, height: 780 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    const npage = await nctx.newPage();
    await npage.goto(URL_, { waitUntil: "networkidle" });
    await npage.waitForTimeout(900);
    log("K · 320 narrow arm", await npage.evaluate(() => {
        const R = (e) => { const b = e.getBoundingClientRect(); return { left: +b.left.toFixed(1), right: +b.right.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
        const trig = [...document.querySelectorAll("main [role='combobox']")].map((e) => {
            const v = e.querySelector("span") ?? e;
            return { name: e.getAttribute("aria-label"), trigger: R(e), valueBox: R(v), text: v.textContent.trim(), scrollW: v.scrollWidth, clientW: v.clientWidth, clipped: v.scrollWidth - v.clientWidth };
        });
        const tile = document.querySelector('[data-testid="gradient-render-tile"]');
        const slider = document.querySelector("main [role='slider']");
        return {
            docScrollW: document.documentElement.scrollWidth, innerW: innerWidth,
            triggers: trig,
            tile: R(tile), tileAspect: +(tile.getBoundingClientRect().width / tile.getBoundingClientRect().height).toFixed(3),
            sliderThumb: R(slider),
            paneCount: document.querySelectorAll("main [class*='pane-scroll-fade']").length,
        };
    }));
    await npage.screenshot({ path: path.join(OUT, "challenge-D-p3-320-light.png"), fullPage: false });
    await nctx.close();

    await browser.close();
};

run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
