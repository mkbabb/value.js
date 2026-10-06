// SERVED MODEL: claude-opus-5-5
// X.W12U.b — after ONE spectrum click (the old specs' idle anchor), how long
// is the main thread busy before idle frames resume? Logs, per 500 ms bucket
// after the click, the displayed frames (rAF ticks) and the hero's draws.
// Usage: [GPU=1] node probe-click-stall.mjs [origin] (default :9000).
import { chromium } from "@playwright/test";

const ORIGIN = process.argv[2] ?? "http://localhost:9000";
const GPU = process.env.GPU === "1";
const browser = await chromium.launch(
    GPU
        ? { headless: true, args: ["--window-position=2600,200"] }
        : { channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
    const proto = WebGL2RenderingContext.prototype;
    for (const m of ["drawArrays", "drawElements"]) {
        const o = proto[m];
        proto[m] = function (...a) {
            if (this.canvas instanceof HTMLCanvasElement) this.canvas.__n = (this.canvas.__n ?? 0) + 1;
            return o.apply(this, a);
        };
    }
    window.__t = [];
    const tick = (t) => { window.__t.push(t); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
});
await page.goto(`${ORIGIN}/`);
await page.getByTestId("goo-blob-canvas").last().waitFor({ state: "visible", timeout: 60000 });
await page.waitForTimeout(8000);
const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
const box = await spectrum.boundingBox();
const tClick = await page.evaluate(() => performance.now());
await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
await page.waitForTimeout(8000);
const ts = await page.evaluate((t0) => window.__t.filter((t) => t >= t0).map((t) => t - t0), tClick);
const buckets = Array.from({ length: 16 }, () => 0);
for (const t of ts) if (t < 8000) buckets[Math.floor(t / 500)]++;
const gaps = ts.slice(1).map((t, i) => t - ts[i]).sort((a, b) => b - a).slice(0, 5).map((g) => g.toFixed(0));
console.log(`${GPU ? "HEADED GPU" : "SwiftShader"} frames per 500ms after click: ${buckets.join(" ")} · top gaps ms ${gaps.join(" ")}`);
await browser.close();
