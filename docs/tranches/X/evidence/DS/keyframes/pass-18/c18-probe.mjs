// X-DS keyframes pass 18 (the redeployed workflow's pass 14), critic C18 cure seat:
// the AFTER frames for KF-C18-02 (the value-axis '0' against the resting balls) and the
// served gap between the tick and the ball. Headless real Chrome only (COHESION §0ei).
//   node c18-probe.mjs [outDir] [--no-shots]   (BASE env, default :5173)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const args = process.argv.slice(2);
const SHOTS = !args.includes("--no-shots");
const OUT = args.find((a) => !a.startsWith("--")) ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 6000);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
for (const scheme of ["light", "dark"]) {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1 });
        const page = await ctx.newPage();
        await page.goto(`${BASE}#/spring`, { waitUntil: "domcontentloaded", timeout: 240000 });
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: "domcontentloaded", timeout: 240000 });
        await page.waitForTimeout(SETTLE);
        const m = await page.evaluate(() => {
            const vis = (els) => [...els].filter((e) => e.getBoundingClientRect().width > 0);
            const zero = vis(document.querySelectorAll(".plot-tick--value")).find((e) => e.textContent.trim() === "0");
            const balls = vis(document.querySelectorAll(".curve-ball")).map((e) => {
                const b = e.getBoundingClientRect();
                return { cls: e.getAttribute("class"), left: +b.left.toFixed(1), right: +b.right.toFixed(1), cy: +(b.top + b.height / 2).toFixed(1), size: +b.width.toFixed(1) };
            });
            const z = zero?.getBoundingClientRect();
            const leftmost = Math.min(...balls.map((b) => b.left));
            return {
                zeroTick: z && { left: +z.left.toFixed(1), right: +z.right.toFixed(1), cy: +(z.top + z.height / 2).toFixed(1) },
                balls,
                gapPx: z ? +(leftmost - z.right).toFixed(1) : null,
                plotBallSize: getComputedStyle(document.querySelector(".plot-frame")).getPropertyValue("--plot-ball-size"),
            };
        });
        report[`spring-${w}-${scheme}`] = m;
        if (SHOTS) {
            await page.screenshot({ path: path.join(OUT, `spring-${w}-${scheme}.png`) });
            const z = m.zeroTick;
            if (z) await page.screenshot({ path: path.join(OUT, `crop-spring-zero-${w}-${scheme}.png`), clip: { x: Math.max(0, z.left - 24), y: z.cy - 30, width: 110, height: 60 } });
        }
        await ctx.close();
    }
}
await browser.close();
fs.writeFileSync(path.join(OUT, "c18-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
