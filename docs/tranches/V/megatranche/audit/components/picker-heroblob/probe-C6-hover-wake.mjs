// CHALLENGE-C probe C6 — does the PARKED bead answer a pointer at all?
// O-12·3 (e2e/smoke/oracles/o12-blob-seat.spec.ts:139) asserts "the parked
// bead visibly answers a hover within 400ms". HeroBlob omits `pressLabel`,
// so the producer renders NO hit layer (blob.js: `f.value ? button : ...`)
// and the ornament root is `pointer-events-none` (HeroBlob.vue:10). Count GL
// draw calls DURING a sustained sweep over the bead. Read-only.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/";
const PARK_SETTLE_MS = 2000 + 3300 + 800;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(() => {
    window.__draws = 0;
    const patch = (p) => {
        if (!p) return;
        for (const m of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
            const o = p[m];
            if (!o) continue;
            p[m] = function (...a) { window.__draws++; return o.apply(this, a); };
        }
    };
    patch(window.WebGL2RenderingContext && WebGL2RenderingContext.prototype);
    patch(window.WebGLRenderingContext && WebGLRenderingContext.prototype);
});
await page.goto(URL, { waitUntil: "load" });
await page.waitForSelector('[data-testid="goo-blob-canvas"]', { timeout: 20000 });
await page.waitForTimeout(PARK_SETTLE_MS);

const out = {};
out.parkedBaseline = await (async () => {
    const a = await page.evaluate(() => window.__draws);
    await page.waitForTimeout(2000);
    return (await page.evaluate(() => window.__draws)) - a;
})();

const box = await page.locator('[data-testid="goo-blob-canvas"]').boundingBox();
out.blobBox = { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) };
const cx = box.x + box.width / 2, cy = box.y + box.height / 2, r = box.width * 0.18;

// 2s sustained circular sweep OVER the bead — count draws during the sweep
const before = await page.evaluate(() => window.__draws);
for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 4;
    await page.mouse.move(cx + r * Math.cos(a), cy + r * Math.sin(a), { steps: 2 });
    await page.waitForTimeout(33);
}
out.drawsDuringSweep = (await page.evaluate(() => window.__draws)) - before;

// what does elementFromPoint resolve at the bead centre?
out.hitTest = await page.evaluate(([x, y]) => {
    const el = document.elementFromPoint(x, y);
    return { tag: el?.tagName, cls: String(el?.className).slice(0, 80), testid: el?.getAttribute?.("data-testid") ?? null };
}, [cx, cy]);
out.rootPointerEvents = await page.evaluate(() => {
    const a = document.querySelector(".hero-blob-anchor");
    const w = document.querySelector(".goo-blob-wrapper");
    const c = document.querySelector('[data-testid="goo-blob-canvas"]');
    const pe = (e) => (e ? getComputedStyle(e).pointerEvents : null);
    return { anchor: pe(a), wrapper: pe(w), canvas: pe(c), hitLayer: !!document.querySelector('[data-testid="goo-blob-hit"]') };
});

// and a COLOUR change (the demo's own activity path) for contrast
const b2 = await page.evaluate(() => window.__draws);
await page.evaluate(() => { location.hash = "#/?space=oklch&color=oklch(0.6 0.2 250)"; });
await page.waitForTimeout(2000);
out.drawsAfterColourChange = (await page.evaluate(() => window.__draws)) - b2;

await browser.close();
console.log(JSON.stringify(out, null, 2));
