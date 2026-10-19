import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3113";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const notes = {};
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "networkidle" }); await p.waitForTimeout(4000);
  // pause so the chain stays put
  await p.getByRole("button", { name: "Pause animation" }).click().catch(()=>{});
  await p.waitForTimeout(500);
  const c = await p.locator("canvas").first().boundingBox();
  await p.screenshot({ path: `${OUT}/v-paused-${theme}-1440.png`, clip: { x: c.x, y: c.y + c.height*0.55, width: c.width*0.35, height: c.height*0.45 } });
  // find chain: sweep pointer over bottom-left region and screenshot each
  for (const [fx, fy] of [[0.1, 0.72], [0.13, 0.75]]) {
    await p.mouse.move(c.x + c.width*fx, c.y + c.height*fy); await p.waitForTimeout(600);
    await p.screenshot({ path: `${OUT}/v-chain-hover-${fx}-${theme}-1440.png`, clip: { x: c.x, y: c.y + c.height*0.55, width: c.width*0.35, height: c.height*0.45 } });
  }
  await p.mouse.move(c.x + c.width*0.5, c.y + c.height*0.2); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/v-curve-hover-${theme}-1440.png` });
  await p.mouse.move(2,2);
  await p.getByRole("button", { name: /^Navigate/ }).click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/dock-navmenu-${theme}-1440.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  await p.getByRole("button", { name: "View options" }).click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/v-viewoptions-${theme}-1440.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  await p.getByRole("button", { name: "Log in" }).click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/login-popover-${theme}-1440.png` });
  await ctx.close();
}
await b.close();
