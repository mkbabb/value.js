// SERVED MODEL: claude-opus-5-5 — SS-8 Z1 cure seat: why the dock's live sample reads `sample-unavailable`.
// One browser, one context, closed in finally. ORIGIN = a seat-private dev server.
import { chromium } from "@playwright/test";
import { save } from "./lib.mjs";
const ORIGIN = process.env.ORIGIN ?? "http://localhost:8213";
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(`${ORIGIN}/#/`, { timeout: 120000 });
    await p.waitForTimeout(8000);
    const out = await p.evaluate(async () => {
        const c = document.querySelector("canvas[data-glass-field-canvas]");
        const read = () => { const k = document.createElement("canvas"); k.width = 32; k.height = 32; const g = k.getContext("2d"); g.drawImage(c, 0, 0, c.width, Math.min(c.height, 80), 0, 0, 32, 32); const d = g.getImageData(0, 0, 32, 32).data; let a = 0; for (let i = 3; i < d.length; i += 4) a += d[i]; return +(a / 1024 / 255).toFixed(3); };
        const idle = read();
        const inRaf = await new Promise((r) => requestAnimationFrame(() => r(read())));
        const dock = document.querySelector(".glass-dock");
        return { w: c.width, h: c.height, bgImage: getComputedStyle(c).backgroundImage.slice(0, 60), arrived: c.className, gpu: "gpu" in navigator,
            meanAlphaIdle: idle, meanAlphaInRaf: inRaf,
            state: dock?.getAttribute("data-backdrop-sample-state"), reason: dock?.getAttribute("data-backdrop-sample-reason") };
    });
    save("cures/diag13.json", out);
    console.log(JSON.stringify(out));
} finally { await browser.close(); }
