/**
 * T.W8 pass-8 (easing) — FOCUSED CONFIRM re-drive against the BUILT bundle
 * (:8671, tree-true dist/gh-pages). Independent O-3 confirmation of the prior
 * headless probe PLUS corrected COMPOSITED-PIXEL contrast (the prior probe's
 * parseRgb mis-parsed oklch() strings for glyph/tile-label strokes — those
 * numbers are unreliable; this samples the real rendered pixels).
 */
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const BASE = "http://127.0.0.1:8671";
const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const URL = `${BASE}/#/gradient?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;
const OUT = "docs/tranches/T/audit/pi/w8/easing";

const report = [];
const log = (s) => { console.log(s); report.push(s); };

const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const r2 = (n) => Math.round(n * 100) / 100;

/**
 * TRUE rendered contrast over a bbox: ground = modal pixel (most frequent,
 * quantized), ink = the pixel with max luma-distance from ground. Direction-
 * agnostic; captures AA + real composited ground; no color-space parsing.
 */
async function bboxContrast(page, buf, box, pad = 0) {
    return page.evaluate(async ({ b64, box, pad }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const g = c.getContext("2d", { willReadFrequently: true });
        g.drawImage(img, 0, 0);
        const x0 = Math.round((box.x - pad) * 2), y0 = Math.round((box.y - pad) * 2);
        const w = Math.round((box.w + 2 * pad) * 2), h = Math.round((box.h + 2 * pad) * 2);
        const d = g.getImageData(x0, y0, w, h).data;
        const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = ([r, gg, b]) => 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
        const counts = new Map();
        const px = [];
        for (let i = 0; i < d.length; i += 4) {
            const p = [d[i], d[i + 1], d[i + 2]];
            px.push(p);
            const key = `${p[0] >> 3}:${p[1] >> 3}:${p[2] >> 3}`;
            counts.set(key, (counts.get(key) ?? 0) + 1);
        }
        let modeKey = null, modeN = -1;
        for (const [k, n] of counts) if (n > modeN) { modeN = n; modeKey = k; }
        // ground = mean of pixels in the modal bucket
        const gr = [0, 0, 0]; let gn = 0;
        for (const p of px) if (`${p[0] >> 3}:${p[1] >> 3}:${p[2] >> 3}` === modeKey) { gr[0] += p[0]; gr[1] += p[1]; gr[2] += p[2]; gn++; }
        const ground = gr.map((v) => Math.round(v / gn));
        const gL = L(ground);
        // ink = pixel with max |luma - groundLuma|
        let ink = ground, best = 0;
        for (const p of px) { const dd = Math.abs(L(p) - gL); if (dd > best) { best = dd; ink = p; } }
        return { ink, ground, coverage: modeN / px.length };
    }, { b64: buf.toString("base64"), box, pad });
}

const browser = await chromium.launch({ headless: true });

async function openCell(w, h, scheme) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: scheme });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(URL);
    const head = page.locator("button[aria-controls^='easing-interval-']").first();
    await head.waitFor({ state: "visible", timeout: 25000 });
    await page.waitForTimeout(3400);
    return { ctx, page, errors };
}

async function disclose(page) {
    const head = page.locator("button[aria-controls='easing-interval-0']");
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    const row = page.locator("#easing-interval-0");
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    if ((await tune.getAttribute("aria-expanded")) !== "true") await tune.click();
    const svg = row.locator("#easing-authoring-0 svg[role='img']");
    await svg.waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(700);
    await head.evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(250);
    return { head, row, svg };
}

const boxes = (page) => page.evaluate(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: r2(r.x), y: r2(r.y), w: r2(r.width), h: r2(r.height) }; };
    const row = document.querySelector("#easing-interval-0");
    const svg = row.querySelector("#easing-authoring-0 svg[role='img']");
    const plate = row.querySelector("#easing-authoring-0 .glass-card");
    const code = row.querySelector(".readout-rail code");
    const eyebrow = row.querySelector(".family-eyebrow");
    // a RESTING tile glyph (not the selected first tile): pick the 3rd tile's glyph
    const tiles = [...row.querySelectorAll(".specimen-tile")];
    const restingTile = tiles.find((t) => t.getAttribute("data-state") !== "on") ?? tiles[2];
    const restGlyph = restingTile?.querySelector(".tile-glyph");
    const vb = svg.viewBox.baseVal;
    const ctm = svg.getScreenCTM();
    const sr = svg.getBoundingClientRect();
    const pt = (x, y) => { const p = new DOMPoint(x, y).matrixTransform(ctm); return { x: p.x, y: p.y }; };
    const tl = pt(vb.x, vb.y), br = pt(vb.x + vb.width, vb.y + vb.height);
    let stamps = 0;
    for (const n of row.querySelectorAll("*")) if (/8px 8px 0(px)?/.test(getComputedStyle(n).boxShadow)) stamps++;
    let lits = 0;
    for (const n of row.querySelectorAll("*")) if (n.childElementCount === 0 && /(cubic-bezier|steps)\s*\(/.test(n.textContent ?? "")) lits++;
    return {
        svg: box(svg), plate: box(plate), code: box(code),
        eyebrow: eyebrow ? box(eyebrow) : null,
        restGlyph: restGlyph ? box(restGlyph) : null,
        restingLabel: restingTile?.querySelector(".tile-label")?.textContent,
        canvasInline: getComputedStyle(svg).inlineSize,
        gutterRight: r2(box(plate).x + box(plate).w - (box(svg).x + box(svg).w)),
        gutterLeft: r2(box(svg).x - box(plate).x),
        letterbox: { dL: r2(Math.abs(tl.x - sr.left)), dT: r2(Math.abs(tl.y - sr.top)), dR: r2(Math.abs(br.x - sr.right)), dB: r2(Math.abs(br.y - sr.bottom)) },
        stamps, lits,
        travelDots: row.querySelectorAll("svg circle[r='0.03']").length,
        plateShadow: getComputedStyle(plate).boxShadow === "none",
    };
});

for (const [w, h, scheme] of [[1440, 900, "light"], [1440, 900, "dark"], [768, 1024, "light"], [390, 844, "light"], [390, 844, "dark"]]) {
    const cell = `${w}-${scheme}`;
    const { ctx, page, errors } = await openCell(w, h, scheme);
    await disclose(page);
    const b = await boxes(page);
    const buf = await page.screenshot();
    const codeC = await bboxContrast(page, buf, b.code);
    const eyeC = b.eyebrow ? await bboxContrast(page, buf, b.eyebrow) : null;
    const restC = b.restGlyph ? await bboxContrast(page, buf, b.restGlyph, 1) : null;
    log(`\n=== ${cell} ===`);
    log(`canvas ${b.svg.w}x${b.svg.h} inline=${b.canvasInline} | plate ${b.plate.w} | gutterL=${b.gutterLeft} gutterR=${b.gutterRight}`);
    log(`letterbox ${JSON.stringify(b.letterbox)} | stamps=${b.stamps} plateFlat=${b.plateShadow} lits=${b.lits} travelDots=${b.travelDots}`);
    log(`readout literal contrast=${r2(contrast(codeC.ink, codeC.ground))} ink=${codeC.ink} ground=${codeC.ground}`);
    if (eyeC) log(`family eyebrow contrast=${r2(contrast(eyeC.ink, eyeC.ground))} ink=${eyeC.ink} ground=${eyeC.ground}`);
    if (restC) log(`resting tile glyph [${b.restingLabel}] contrast=${r2(contrast(restC.ink, restC.ground))} ink=${restC.ink} ground=${restC.ground} coverage=${r2(restC.coverage)}`);
    log(`console: ${errors.length} error(s)${errors.length ? " :: " + errors.slice(0, 3).join(" | ") : ""}`);
    await ctx.close();
}

// ---- Custom-persistence / aliveness seam (1440-light) ----
{
    const { ctx, page, errors } = await openCell(1440, 900, "light");
    const { head, row, svg } = await disclose(page);
    log(`\n=== ALIVENESS / CUSTOM PERSISTENCE (1440-light) ===`);
    const readCode = () => row.locator(".readout-rail code").first().textContent();
    const canvasQuad = () => svg.evaluate((el) => {
        // the two draggable control-point handles' cx/cy (r=0.04)
        const hs = [...el.querySelectorAll("circle[r='0.04']")].map((c) => `${(+c.getAttribute("cx")).toFixed(3)},${(+c.getAttribute("cy")).toFixed(3)}`);
        return hs.join(" ");
    });
    // author custom via drag
    const handle = svg.locator("circle[r='0.04']").first();
    const hb = await handle.boundingBox();
    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
    await page.mouse.down();
    await page.mouse.move(hb.x + hb.width / 2 + 55, hb.y + hb.height / 2 - 70, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(400);
    const customLit = await readCode();
    const customQuad = await canvasQuad();
    log(`authored custom: literal=${customLit} handles=[${customQuad}]`);
    // close the accordion row, reopen — does the ALIVE picker keep the custom curve?
    await head.click(); await page.waitForTimeout(300);
    await head.click(); await page.waitForTimeout(500);
    // re-disclose authoring (tuneOpen may have reset)
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    if ((await tune.getAttribute("aria-expanded")) !== "true") { await tune.click(); await page.waitForTimeout(400); }
    const afterReopenLit = await readCode();
    const afterReopenQuad = await canvasQuad();
    log(`after close+reopen: literal=${afterReopenLit} handles=[${afterReopenQuad}] (canvas persisted=${afterReopenQuad === customQuad})`);
    log(`console: ${errors.length} error(s)`);
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/w8-easing-confirm-log.txt`, report.join("\n") + "\n");
log("\nDONE");
