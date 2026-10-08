// X-DS fourier pass 4 critic (F6): the stage's View options / More options menus; /equation 390 Canvas tab. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  const vo = p.locator('[aria-label="View options"]').first();
  console.log(theme, "viewopts", await vo.count());
  await vo.click({ force: true }).catch(e => console.log(String(e).slice(0, 120))); await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/v-viewmenu-${theme}-1440.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  await p.mouse.move(500, 840); await p.waitForTimeout(600);
  const mo = p.locator('[aria-label="More options"]').first();
  console.log(theme, "more", await mo.count(), await mo.isVisible().catch(() => false));
  await mo.click({ force: true }).catch(e => console.log(String(e).slice(0, 120))); await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/v-moremenu-${theme}-1440.png` });
  await ctx.close();
}
{ const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(BASE + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(2000);
  await p.screenshot({ path: `${OUT}/eq-canvas-tab-light-390.png` });
  await ctx.close(); }
await b.close();
