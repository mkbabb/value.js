// X-DS fourier pass 4 critic F4 — the routes f3 did not re-capture. Headless real Chrome only (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  for (const [n, r] of Object.entries({ gallery: "/gallery", morph: "/morph", paper: "/paper" })) {
    const p = await page(theme, w);
    await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(4000);
    await p.screenshot({ path: `${OUT}/${n}-${theme}-${w}.png` });
    if (n === "gallery" && w === 1440) {
      const card = p.locator(".gallery-card").first();
      await card.hover().catch(() => {}); await p.waitForTimeout(500);
      await p.screenshot({ path: `${OUT}/gallery-hover-${theme}-1440.png` });
    }
    if (n === "morph") { await p.mouse.wheel(0, 900); await p.waitForTimeout(1500); await p.screenshot({ path: `${OUT}/morph-scroll-${theme}-${w}.png` }); }
    await p.context().close();
  }
  if (w === 1440) {
    const p = await page(theme, w);
    await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(5000);
    const c = p.locator("canvas").first(); const bb = await c.boundingBox().catch(() => null);
    if (bb) { await p.mouse.move(bb.x + bb.width * 0.25, bb.y + bb.height * 0.65); await p.waitForTimeout(1200); }
    await p.screenshot({ path: `${OUT}/v-epicycle-hover-${theme}-1440.png` });
    res[`shadows-${theme}`] = await p.evaluate(() => [...document.querySelectorAll("button")].filter(e=>e.getClientRects().length).slice(0,40).map(e => ({ t: e.textContent.trim().slice(0,24), emph: e.dataset.emphasis, bg: getComputedStyle(e).backgroundColor, bs: getComputedStyle(e).boxShadow.slice(0,160) })));
    await p.context().close();
  }
}
const fs = await import("node:fs"); fs.writeFileSync(`${OUT}/f4-probe.json`, JSON.stringify(res, null, 1));
await b.close();
