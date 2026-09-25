// For each route (pushed through the app's router, not a hard load) at a width, read plate corners + run overflow.
// usage: node route-sweep.mjs <width> <scheme>
import { chromium } from "playwright";
const [w = "1440", scheme = "light"] = process.argv.slice(2);
const out = new URL(".", import.meta.url).pathname;
const routes = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob"];
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: +w, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);
for (const r of routes) {
  await page.evaluate((r) => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push(r), r);
  await page.waitForTimeout(1800);
  const d = await page.evaluate(() => { const p = document.querySelector(".dock-plate"), cs = getComputedStyle(p), run = p.closest(".glass-dock").querySelector(".dock-run"), b = p.getBoundingClientRect();
    return { box: [b.x, b.y, b.width, b.height].map(Math.round), ss: cs.borderStartStartRadius, se: cs.borderStartEndRadius, ovf: run.scrollWidth - run.clientWidth, sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, pitch: getComputedStyle(p.closest(".glass-dock")).getPropertyValue("--dock-pitch") }; });
  console.log(w, scheme, r, JSON.stringify(d));
  if (/%/.test(d.ss + d.se)) { const [x, y, bw, bh] = d.box; await page.screenshot({ path: `${out}route-${scheme}-${w}${r.replace(/\//g, "_")}.png`, clip: { x: x - 20, y: Math.max(0, y - 20), width: bw + 40, height: bh + 40 } }); }
}
await browser.close();
