// R2 paint test — rigorous. The r1 "cure test" mutated the page; a digest diff
// is confounded by the live aurora rAF. This test is mutation-free and
// animation-robust: it asks whether ANY pixel inside the statement's own rect is
// within a tight distance of the statement's own computed ink colour.
// Dark ink (28,25,23) on a hot-pink field is unmistakable if it paints.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence-r2";
const DOC_RE = /\/assets\/docs\/[a-z-]+\.md/;

async function inkCensus(page, clip, ink) {
    const buf = await page.screenshot({ clip });
    return page.evaluate(async ({ b64, ink }) => {
        const img = new Image();
        await new Promise((r, j) => { img.onload = r; img.onerror = j; img.src = "data:image/png;base64," + b64; });
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        let near = 0, n = 0, minLum = 1e9;
        for (let i = 0; i < d.length; i += 4) {
            const dr = d[i] - ink[0], dg = d[i + 1] - ink[1], db = d[i + 2] - ink[2];
            const dist = Math.sqrt(dr * dr + dg * dg + db * db);
            if (dist < 60) near++;
            const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            if (lum < minLum) minLum = lum;
            n++;
        }
        return { pixels: n, nearInkPixels: near, nearInkPct: +(100 * near / n).toFixed(3), minLuma: +minLum.toFixed(1) };
    }, { b64: buf.toString("base64"), ink });
}

const out = {};
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.route(DOC_RE, (r) => r.abort("failed"));
await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(9000);

const meta = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    const [svg, msg, detail, btn] = [...eb.children];
    const g = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; };
    const toRgb = (c) => { const cv = document.createElement("canvas"); cv.width = cv.height = 1; const x = cv.getContext("2d"); x.fillStyle = c; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const cs = (el) => { const s = getComputedStyle(el); return { position: s.position, zIndex: s.zIndex, opacity: s.opacity, visibility: s.visibility, isolation: s.isolation, mixBlendMode: s.mixBlendMode, transform: s.transform, filter: s.filter, contain: s.contain }; };
    const canvas = document.querySelector(".atmosphere-canvas");
    const layoutOrder = [...document.querySelectorAll("body *")].indexOf(canvas);
    return {
        rects: { svg: g(svg), msg: g(msg), detail: detail ? g(detail) : null, btn: g(btn) },
        ink: { msg: toRgb(getComputedStyle(msg).color), svg: toRgb(getComputedStyle(svg).color), detail: detail ? toRgb(getComputedStyle(detail).color) : null },
        style: { boundary: cs(eb), msg: cs(msg), svg: cs(svg), btn: cs(btn), canvas: cs(canvas), main: cs(document.querySelector("main")) },
        canvasRect: canvas.getBoundingClientRect().toJSON(),
        canvasDomIndex: layoutOrder,
        boundaryText: eb.textContent.replace(/\s+/g, " ").trim(),
        // proportion: ink hull vs the band it occupies
        boundaryRect: eb.getBoundingClientRect().toJSON(),
        fonts: { msg: getComputedStyle(msg).fontFamily.split(",")[0] + " " + getComputedStyle(msg).fontSize + "/" + getComputedStyle(msg).lineHeight + " w" + getComputedStyle(msg).fontWeight, btn: getComputedStyle(btn).fontFamily.split(",")[0] + " " + getComputedStyle(btn).fontSize + " w" + getComputedStyle(btn).fontWeight, detail: detail ? getComputedStyle(detail).fontFamily.split(",")[0] + " " + getComputedStyle(detail).fontSize : null },
    };
});
out.meta = meta;

// SHIPPED state, zero mutation
out.shipped = {
    msgRectInkCensus: await inkCensus(page, meta.rects.msg, meta.ink.msg),
    iconRectInkCensus: await inkCensus(page, meta.rects.svg, meta.ink.svg),
    btnRectInkCensus: await inkCensus(page, meta.rects.btn, meta.ink.msg),
};
await page.screenshot({ path: `${OUT}/R2-shipped-desktop-1440-light.png` });

// CONTROL: the identical DOM, one property changed (paint order only)
await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = "relative"; });
await page.waitForTimeout(400);
out.lifted = {
    msgRectInkCensus: await inkCensus(page, meta.rects.msg, meta.ink.msg),
    iconRectInkCensus: await inkCensus(page, meta.rects.svg, meta.ink.svg),
    btnRectInkCensus: await inkCensus(page, meta.rects.btn, meta.ink.msg),
};
await page.screenshot({ path: `${OUT}/R2-lifted-desktop-1440-light.png` });

// AND the same test with the canvas removed instead — proves the canvas is the occluder
await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = ""; document.querySelector(".atmosphere-canvas").style.display = "none"; });
await page.waitForTimeout(400);
out.canvasHidden = {
    msgRectInkCensus: await inkCensus(page, meta.rects.msg, meta.ink.msg),
    iconRectInkCensus: await inkCensus(page, meta.rects.svg, meta.ink.svg),
};

fs.writeFileSync(`${OUT}/R2-paint.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await b.close();
