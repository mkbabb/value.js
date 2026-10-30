// SERVED MODEL: claude-opus-5-5 · X.W11.hyg (COHESION §0gw.5) — the GPU lhci cell's paint-state discriminator.
// One full Chrome for Testing (the cell's named GPU witness binary) per flag set, launched the way
// Lighthouse's chrome-launcher does (raw spawn, CDP over --remote-debugging-pipe is not needed: Playwright
// launches with the same flags), one page, closed in `finally`. Reads, per flag set: requestAnimationFrame
// ticks in 1 s, the first-contentful-paint entry, and the WebGL renderer string.
// Usage: node paint-state-probe.mjs '<flags json array>' ...
import { chromium } from "playwright";

const sets = process.argv.slice(2).map((a) => JSON.parse(a));
const out = [];
for (const flags of sets) {
    const browser = await chromium.launch({ channel: "chromium", headless: true, args: flags });
    try {
        const page = await browser.newPage();
        await page.setContent(`<!doctype html><p style="font:40px sans-serif">paint</p><canvas id=c></canvas>`);
        const r = await page.evaluate(async () => {
            let ticks = 0;
            const t0 = performance.now();
            await new Promise((done) => {
                const step = () => (performance.now() - t0 < 1000 ? (ticks++, requestAnimationFrame(step)) : done());
                requestAnimationFrame(step);
                setTimeout(done, 1500);
            });
            const gl = document.getElementById("c").getContext("webgl2");
            const ext = gl?.getExtension("WEBGL_debug_renderer_info");
            return {
                rafTicks1s: ticks,
                fcp: performance.getEntriesByName("first-contentful-paint").length,
                renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null,
            };
        });
        out.push({ flags, ...r });
    } finally {
        await browser.close();
    }
}
console.log(JSON.stringify(out, null, 1));
