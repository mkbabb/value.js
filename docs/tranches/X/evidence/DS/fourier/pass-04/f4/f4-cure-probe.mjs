// X-DS fourier pass 4 (critic F4) — the AFTER frames and the cure measurements. Headless real Chrome only (§0ei).
// Usage: node f4-cure-probe.mjs OUT [BASE]
import { createRequire } from "node:module";
import fs from "node:fs";
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
  const k = `${theme}-${w}`;
  for (const [n, r] of Object.entries({ gallery: "/gallery", morph: "/morph", paper: "/paper", "no-such-route": "/no-such-route" })) {
    const p = await page(theme, w);
    await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(4000);
    await p.screenshot({ path: `${OUT}/${n}-${k}.png` });
    if (n === "gallery") {
      res[`gallery-${k}`] = await p.evaluate(() => {
        const g = document.querySelector(".gallery-grid"); const s = document.querySelector(".search-pill");
        const cards = [...g.children].map((c) => c.getBoundingClientRect());
        return { grid: [g.getBoundingClientRect().left, g.getBoundingClientRect().right], cols: getComputedStyle(g).gridTemplateColumns, lastCardRight: Math.round(Math.max(...cards.map((c) => c.right))), searchRight: s && Math.round(s.getBoundingClientRect().right), n: cards.length };
      });
      if (w === 1440) {
        await p.locator(".gallery-card").first().hover().catch(() => {}); await p.waitForTimeout(500);
        await p.screenshot({ path: `${OUT}/gallery-hover-${theme}-1440.png` });
      }
    }
    if (n === "morph") {
      res[`morph-${k}`] = await p.evaluate(() => {
        const g = document.querySelector(".levels-card .grid"); const c = document.querySelector(".levels-card .levels-controls");
        const gr = g.getBoundingClientRect();
        const cut = [...g.children].map((t) => t.getBoundingClientRect()).find((r) => r.left < gr.right && r.right > gr.right);
        return { strip: [gr.left, gr.right], controls: [c.getBoundingClientRect().left, c.getBoundingClientRect().right], cutTileVisiblePx: cut ? Math.round(gr.right - cut.left) : null, mask: getComputedStyle(g).maskImage, snap: getComputedStyle(g).scrollSnapType };
      });
      const card = p.locator(".levels-card");
      await card.screenshot({ path: `${OUT}/morph-levels-${k}.png` }).catch(() => {});
      await p.mouse.wheel(0, 900); await p.waitForTimeout(1500); await p.screenshot({ path: `${OUT}/morph-scroll-${k}.png` });
    }
    if (n === "paper") {
      res[`paper-${k}`] = await p.evaluate(() => [...document.querySelectorAll("dl.paper-description dt")].map((d) => ({ text: d.textContent.trim(), weight: getComputedStyle(d).fontWeight })));
      const dl = p.locator("dl.paper-description").first();
      await dl.scrollIntoViewIfNeeded().catch(() => {}); await p.waitForTimeout(400);
      await dl.screenshot({ path: `${OUT}/paper-description-${k}.png` }).catch(() => {});
    }
    if (n === "no-such-route") {
      res[`notfound-${k}`] = await p.evaluate(() => [...document.querySelectorAll("[data-testid=not-found] button")].map((e) => ({ t: e.textContent.trim(), emph: e.dataset.emphasis, size: e.dataset.size, w: Math.round(e.getBoundingClientRect().width) })));
    }
    await p.context().close();
  }
  if (w === 1440) {
    const p = await page(theme, w);
    await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(5000);
    await p.screenshot({ path: `${OUT}/v-stage-${theme}-1440.png` });
    const c = p.locator("canvas").first(); const bb = await c.boundingBox().catch(() => null);
    if (bb) { await p.mouse.move(bb.x + bb.width * 0.25, bb.y + bb.height * 0.65); await p.waitForTimeout(1200); }
    await p.screenshot({ path: `${OUT}/v-epicycle-hover-${theme}-1440.png` });
    await p.context().close();
  }
}
fs.writeFileSync(`${OUT}/f4-cure-probe-after.json`, JSON.stringify(res, null, 1));
await b.close();
