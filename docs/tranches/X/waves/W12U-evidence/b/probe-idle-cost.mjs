// SERVED MODEL: claude-opus-5-5
// X.W12U.b — the live hero's idle cost: blob WebGL draws vs displayed frames
// (rAF ticks) over an idle window, with and without prefers-reduced-motion.
// Usage: [GPU=1] node probe-idle-cost.mjs [origin] (default :9000).
import { chromium, devices } from "@playwright/test";

const ORIGIN = process.argv[2] ?? "http://localhost:9000";
// GPU=1: the real Google Chrome in new-headless on the Metal GPU (COHESION
// §0ei, 2026-10-06: never a visible browser; supersedes §0be's headed rule);
// default: headless SwiftShader.
const GPU = process.env.GPU === "1";
const browser = await chromium.launch(
    GPU
        ? { channel: "chrome", headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] }
        : { channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
);
console.log(`mode ${GPU ? "Chrome new-headless Metal GPU" : "headless SwiftShader"} · ${ORIGIN}`);
const init = () => {
    const proto = WebGL2RenderingContext.prototype;
    for (const m of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
        const o = proto[m];
        proto[m] = function (...a) {
            if (this.canvas instanceof HTMLCanvasElement) this.canvas.__n = (this.canvas.__n ?? 0) + 1;
            return o.apply(this, a);
        };
    }
    window.__f = [];
    let last = performance.now();
    const tick = (t) => { window.__f.push(t - last); last = t; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
};
const draws = (p) => p.evaluate(() => [...document.querySelectorAll('[data-testid="goo-blob-canvas"]')].pop()?.__n ?? -1);
for (const [label, ctx] of [
    ["1440", { viewport: { width: 1440, height: 900 } }],
    ["390", { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } }],
]) {
    for (const prm of [false, true]) {
        const c = await browser.newContext({ ...ctx, reducedMotion: prm ? "reduce" : "no-preference" });
        const page = await c.newPage();
        await page.addInitScript(init);
        const t0 = Date.now();
        await page.goto(`${ORIGIN}/`);
        // Headed on the real GPU the producer's canvas carries no main-thread
        // WebGL2 context (getContext("webgl2") and ("webgl") both read null at
        // 10.1.0 — the render is off the main thread), so the draw oracle reads
        // -1/0 there and the arrival is the canvas's own box instead.
        if (GPU) await page.getByTestId("goo-blob-canvas").last().waitFor({ state: "visible", timeout: 60000 });
        else await page.waitForFunction(() => ([...document.querySelectorAll('[data-testid="goo-blob-canvas"]')].pop()?.__n ?? 0) > 0, null, { timeout: 60000 });
        const firstDraw = Date.now() - t0;
        const renderer = await page.evaluate(() => {
            const gl = document.createElement("canvas").getContext("webgl2");
            const ext = gl?.getExtension("WEBGL_debug_renderer_info");
            return ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "no-webgl";
        });
        if (GPU && /swiftshader|software|no-webgl/i.test(renderer)) throw new Error(`GPU=1 but renderer ${renderer}`);
        if (label === "1440" && !prm) console.log(`renderer ${renderer}`);
        await page.waitForTimeout(3000);
        const rows = [];
        for (let w = 0; w < 3; w++) {
            const d0 = await draws(page);
            await page.evaluate(() => (window.__f = []));
            await page.waitForTimeout(3000);
            const d1 = await draws(page);
            const f = await page.evaluate(() => window.__f.slice());
            const s = [...f].sort((a, b) => a - b);
            rows.push(`draws ${d1 - d0} frames ${f.length} p50 ${s[s.length >> 1]?.toFixed(1)} p95 ${s[Math.floor(s.length * 0.95)]?.toFixed(1)}`);
        }
        console.log(`${label} ${prm ? "PRM " : "live"} firstDraw ${firstDraw}ms :: ${rows.join(" | ")}`);
        await c.close();
    }
}
await browser.close();
