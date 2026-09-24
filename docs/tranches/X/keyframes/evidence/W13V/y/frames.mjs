// SERVED MODEL: claude-opus-5-5
// KF.W13V.y — per-scene frames: stage (pane closed) + the scene's facet pane (Curve/Physics; else Controls).
// Usage: node frames.mjs <baseUrl> <outDir> <tag> [scenes] [vps] [themes] [modes=stage,pane]
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", outDir = ".", tag = "x", sc = "cube,amiga,square,easing,spring,sequence", vps = "1440x900,390x844", th = "light,dark", modes = "stage,pane"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ headless: false });
for (const theme of th.split(",")) for (const vp of vps.split(",")) for (const scene of sc.split(",")) for (const mode of modes.split(",")) {
    const [w, h] = vp.split("x").map(Number);
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const page = await ctx.newPage();
    await page.goto(base.replace(/#.*$/, "") + `#/${scene}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    let opened = "stage";
    if (mode === "pane") {
        const dock = page.locator("[data-dock-tether=top]");
        await dock.hover({ force: true }).catch(() => {});
        await page.waitForTimeout(1300);
        let item = dock.locator('[data-dock-surface-item][data-surface="easing"]:not([aria-disabled=true]), [data-dock-surface-item][data-surface="spring"]:not([aria-disabled=true])');
        if (!(await item.count())) item = dock.locator('[data-dock-surface-item][data-surface="controls"]:not([aria-disabled=true])');
        if (await item.count()) { opened = await item.first().getAttribute("data-surface"); if ((await item.first().getAttribute("aria-pressed")) !== "true") await item.first().click().catch(() => {}); }
        else { opened = "none"; }
        await page.mouse.move(w / 2, h - 5);
        await page.waitForTimeout(1600);
    }
    await page.screenshot({ path: `${outDir}/${tag}-${scene}-${mode}-${vp}-${theme}.png` });
    console.log(`${scene} ${vp} ${theme} ${mode} -> ${opened}`);
    await ctx.close();
}
await browser.close();
console.log("ok");
