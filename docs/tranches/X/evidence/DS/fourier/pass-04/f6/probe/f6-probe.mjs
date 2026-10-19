// X-DS fourier pass 4 critic (F6): scenes the f5 capture missed + DOM measures. Headless real Chrome only (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const res = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` });
for (const theme of ["light", "dark"]) {
  { const p = await page(theme, 1440);
    await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }); await p.waitForTimeout(4000);
    res[`transport-${theme}`] = await p.evaluate(() => {
      const pause = [...document.querySelectorAll("button")].find(b => /pause|play/i.test(b.getAttribute("aria-label") || ""));
      let host = pause; for (let i = 0; i < 4 && host; i++) host = host.parentElement;
      const r = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.x), Math.round(q.y), Math.round(q.width), Math.round(q.height)]; };
      const out = { host: host && host.className, hostRect: host && r(host), kids: [] };
      if (host) for (const e of host.querySelectorAll("*")) { if (!e.children.length && e.textContent.trim()) out.kids.push([e.tagName, e.className.baseVal ?? e.className, e.textContent.trim(), r(e), getComputedStyle(e).fontSize]); }
      return out;
    });
    for (const name of ["Contour", "Coefficients"]) { await p.getByRole("button", { name: new RegExp("^" + name) }).first().click().catch(() => {}); await p.waitForTimeout(700); }
    await p.getByRole("button", { name: /^Image/ }).first().click().catch(() => {});
    await p.getByRole("button", { name: /^Basis/ }).first().click().catch(() => {}); await p.waitForTimeout(900);
    await shot(p, `v-sections-open-${theme}-1440`);
    await p.getByRole("button", { name: /Advanced/ }).first().click().catch(() => {}); await p.waitForTimeout(700);
    await shot(p, `v-advanced-${theme}-1440`);
    await p.getByRole("button", { name: "View options" }).first().click().catch(() => {}); await p.waitForTimeout(900);
    await shot(p, `v-viewoptions-open-${theme}-1440`);
    await p.keyboard.press("Escape"); await p.waitForTimeout(300);
    await p.getByRole("button", { name: "More options" }).first().click().catch(() => {}); await p.waitForTimeout(900);
    await shot(p, `v-moreoptions-${theme}-1440`);
    await p.keyboard.press("Escape"); await p.waitForTimeout(300);
    await p.getByRole("button", { name: /About Fourier/ }).first().click().catch(() => {}); await p.waitForTimeout(1000);
    await shot(p, `about-${theme}-1440`);
    await p.context().close(); }
  { const p = await page(theme, 390);
    await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(3000);
    await shot(p, `v-canvas-tab-${theme}-390`);
    await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    await p.getByRole("button", { name: /info|about|explain/i }).first().click().catch(() => {}); await p.waitForTimeout(900);
    await shot(p, `eq-info-${theme}-1440`);
    await p.keyboard.press("Escape"); await p.waitForTimeout(300);
    await p.getByText("a + b", { exact: false }).first().click().catch(() => {}); await p.waitForTimeout(1500);
    await shot(p, `eq-ab-${theme}-1440`);
    await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.getByRole("button", { name: /filter|sort|options/i }).first().click().catch(() => {}); await p.waitForTimeout(900);
    await shot(p, `gallery-filter-${theme}-1440`);
    await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    res[`morph-${theme}`] = await p.evaluate(() => {
      const thumbs = [...document.querySelectorAll("[role=slider], .slider-thumb")].map(e => [e.className, getComputedStyle(e).backgroundColor, getComputedStyle(e).borderColor]);
      const grid = document.querySelector(".harmonic-level-grid, [class*=level-grid]");
      const g = grid && grid.getBoundingClientRect(); const card = grid && grid.closest(".config-card")?.getBoundingClientRect();
      return { thumbs, grid: grid && [grid.className, Math.round(g.x), Math.round(g.right), getComputedStyle(grid).backgroundColor, getComputedStyle(grid).maskImage || getComputedStyle(grid).webkitMaskImage, grid.scrollWidth, grid.clientWidth], card: card && [Math.round(card.x), Math.round(card.right)] };
    });
    await p.getByRole("button", { name: /play|preview|morph/i }).first().click().catch(() => {}); await p.waitForTimeout(250);
    await shot(p, `morph-playing-${theme}-1440`);
    await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/no-such-route", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
    await shot(p, `notfound-${theme}-1440`); await p.context().close(); }
}
writeFileSync(`${OUT}/f6-probe.json`, JSON.stringify(res, null, 1));
await b.close();
