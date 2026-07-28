import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

// Build a large (4000x3000) photo-ish PNG in-page, hand it back as base64.
const bigB64 = await page.evaluate(() => {
    const W = 4000, H = 3000;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#c0392b"); grad.addColorStop(0.5, "#2980b9"); grad.addColorStop(1, "#27ae60");
    g.fillStyle = grad; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 4000; i++) {
        g.fillStyle = `hsl(${(i * 37) % 360} 70% ${30 + (i % 50)}%)`;
        g.fillRect((i * 977) % W, (i * 613) % H, 60, 60);
    }
    return c.toDataURL("image/png").split(",")[1];
});
const big = Buffer.from(bigB64, "base64");
console.log("big png bytes:", big.length);

// Long-task observer + skeleton/isProcessing sampling
await page.evaluate(() => {
    window.__long = [];
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__long.push(Math.round(e.duration)); })
        .observe({ entryTypes: ["longtask"] });
    window.__samples = [];
    window.__t0 = performance.now();
    window.__iv = setInterval(() => {
        window.__samples.push({
            t: Math.round(performance.now() - window.__t0),
            skel: document.querySelectorAll('main [data-slot="palette-card-skeleton"]').length,
            ghost: document.body.innerText.includes("undeveloped plate"),
            plate: !!document.querySelector("main code"),
        });
    }, 60);
});

const t0 = Date.now();
await page.setInputFiles('main input[type="file"]', { name: "big.png", mimeType: "image/png", buffer: big });
await page.waitForFunction(() => !!document.querySelector("main code"), null, { timeout: 60000 }).catch(() => {});
const wall = Date.now() - t0;
await page.waitForTimeout(500);

const out = await page.evaluate(() => {
    clearInterval(window.__iv);
    return {
        longTasks: window.__long,
        maxLongTask: Math.max(0, ...window.__long),
        totalLongMs: window.__long.reduce((a, x) => a + x, 0),
        anySkeleton: window.__samples.some((s) => s.skel > 0),
        firstPlateAt: window.__samples.find((s) => s.plate)?.t ?? null,
        samples: window.__samples.slice(0, 60),
        mem: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1e6) : null,
    };
});
writeFileSync(SP + "WBX-out5.json", JSON.stringify({ wall, bigBytes: big.length, ...out }, null, 1));
console.log("wall ms (upload -> readout):", wall);
console.log("longTasks:", JSON.stringify(out.longTasks));
console.log("maxLongTask:", out.maxLongTask, " totalLongMs:", out.totalLongMs);
console.log("anySkeleton (isProcessing ever rendered):", out.anySkeleton);
console.log("firstPlateAt:", out.firstPlateAt);
console.log("samples:", JSON.stringify(out.samples));
await b.close();
