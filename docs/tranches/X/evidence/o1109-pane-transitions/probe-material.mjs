// Diagnostic: does the flung card frost the riser beneath it? One browser,
// one context per variant, closed in finally. Usage: node diag-material.mjs <root> <outdir>
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
const [root, outdir] = process.argv.slice(2);
mkdirSync(outdir, { recursive: true });
const PORT = 9468, origin = `http://localhost:${PORT}`;
const server = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], { cwd: root, env: { ...process.env, VITE_API_URL: origin, VJS_VITE_CACHE_DIR: `${root}/node_modules/.vite-o1109pt` }, stdio: "ignore", detached: true });
const stop = () => { try { process.kill(-server.pid, "SIGTERM"); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 120 && !(await fetch(origin).then((r) => r.ok, () => false)); i++) await new Promise((r) => setTimeout(r, 500));
console.log("server up");
const VARIANTS = {
    noopacityleg: ".pane-wrapper > .vj-enter-leave-active { transition-property: transform !important; } .pane-wrapper > .vj-enter-leave-to { opacity: 1 !important; }",
};
const browser = await chromium.launch({ headless: true, channel: "chrome", args: ["--use-angle=metal"] });
try {
    for (const [name, css] of Object.entries(VARIANTS)) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        try {
            const page = await ctx.newPage();
            page.setDefaultTimeout(60000);
            console.log("variant", name);
            await page.goto(`${origin}/#/`);
            await page.locator(".pane-wrapper--inspector").first().waitFor({ timeout: 90000 });
            await page.waitForTimeout(2500);
            for (const h of ["#/palettes", "#/"]) { await page.evaluate((x) => (location.hash = x), h); await page.waitForTimeout(1200); }
            if (css) await page.addStyleTag({ content: css });
            await page.evaluate(() => new Promise((res) => {
                const tick = () => {
                    const l = document.querySelector(".pane-wrapper > .vj-enter-leave-active.vj-enter-leave-to");
                    if (!l) return performance.now() - t0 > 5000 ? res("timeout") : requestAnimationFrame(tick);
                    for (const a of document.getAnimations()) { try { a.pause(); a.currentTime = 60; } catch {} }
                    res();
                };
                const t0 = performance.now();
                location.hash = "#/palettes";
                requestAnimationFrame(tick);
            }));
            await page.waitForTimeout(100);
            await page.screenshot({ path: `${outdir}/${name}.png`, clip: { x: 590, y: 90, width: 700, height: 420 } });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); stop(); }
