// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.d — the transport's EXPANDED face after hover (persistent Play + the row): boxes,
// order, spill vs plate, count of Play controls in the accessibility tree.
// Usage: node probe-expanded-transport.mjs [--base URL] [--w 1440 --h 900] [--theme light|dark] [--scene cube] [--frames dir]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://127.0.0.1:5293"), W = +arg("w", 1440), H = +arg("h", 900);
const THEME = arg("theme", "light"), SCENE = arg("scene", "cube"), FRAMES = arg("frames", null);
if (FRAMES) mkdirSync(FRAMES, { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`${BASE}/#/${SCENE}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const t = page.locator("[data-dock-tether=bottom] .glass-dock");
const b = await t.boundingBox();
await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
await page.waitForTimeout(1200);
const r = await page.evaluate(() => {
  const dock = document.querySelector("[data-dock-tether=bottom] .glass-dock");
  const pr = dock.getBoundingClientRect();
  const vis = (e) => { const x = e.getBoundingClientRect(); return x.width > 0 && x.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
  const ctrls = [...dock.querySelectorAll("button")].filter((e) => vis(e) && !e.closest("[inert]")).map((e) => { const x = e.getBoundingClientRect(); return { label: e.getAttribute("aria-label"), x: Math.round(x.x), w: Math.round(x.width), inPlate: x.left >= pr.left - 0.5 && x.right <= pr.right + 0.5 }; });
  return { cls: dock.className, plate: [Math.round(pr.x), Math.round(pr.width), Math.round(pr.height)], ctrls, playNamed: ctrls.filter((c) => /animation$/.test(c.label ?? "") && /^(Play|Pause)/.test(c.label)).length };
});
console.log(JSON.stringify(r));
if (FRAMES) await page.screenshot({ path: `${FRAMES}/${W}-${THEME}-${SCENE}-transport-expanded.png`, clip: { x: Math.max(0, b.x - 200), y: b.y - 40, width: Math.min(W, b.width + 400), height: b.height + 80 } });
await browser.close();
