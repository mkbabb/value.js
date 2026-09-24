// SERVED MODEL: claude-opus-5-5
// KF.W13V.s — named frames per scene × viewport × theme (served page).
// Usage: node frames.mjs <baseUrl> <outDir> <tag> [scenes=csv] [vps=1440x900,390x844] [themes=light,dark] [open=0|1]
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", outDir = ".", tag = "x", sc = "home,cube,amiga,square,easing,spring,sequence", vps = "1440x900,390x844", th = "light", open = "0"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ headless: false });
for (const theme of th.split(",")) for (const vp of vps.split(",")) for (const scene of sc.split(",")) {
    const [w, h] = vp.split("x").map(Number);
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const page = await ctx.newPage();
    await page.goto(base.replace(/#.*$/, "") + (scene === "home" ? "#/" : `#/${scene}`), { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    if (open === "1") {
        await page.locator("[data-dock-tether=top]").hover({ force: true }).catch(() => {});
        await page.waitForTimeout(700);
        const btn = page.locator("[data-dock-tether=top] [data-dock-surface-item]:not([disabled])").first();
        if (await btn.count()) await btn.click().catch(() => {});
        await page.mouse.move(w / 2, h - 5);
        await page.waitForTimeout(1500);
    }
    await page.screenshot({ path: `${outDir}/${tag}-${scene}-${vp}-${theme}.png` });
    await ctx.close();
}
await browser.close();
console.log("ok");
