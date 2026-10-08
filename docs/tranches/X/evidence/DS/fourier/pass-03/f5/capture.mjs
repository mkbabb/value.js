// X-DS fourier pass 3 (critic F5) AFTER frames — the critic's capture.mjs, re-aimed at the cure tree. Headless real Chrome only (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { mkdirSync, writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` });
const routes = { home: "/", paper: "/paper", v: `/v/${SLUG}`, w: "/w", gallery: "/gallery", equation: "/equation", morph: "/morph" };
const only = process.argv[4];
const notes = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) for (const [n, r] of Object.entries(routes)) {
  if (only && only !== "routes") break;
  const p = await page(theme, w);
  await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(n === "v" || n === "equation" ? 5000 : 2500);
  await shot(p, `${n}-${theme}-${w}`);
  await p.context().close();
}
if (!only || only === "scenes") for (const theme of ["light", "dark"]) {
  // /v canvas hover on the epicycles + dock menu
  { const p = await page(theme, 1440);
    await p.goto(BASE + routes.v, { waitUntil: "networkidle" }); await p.waitForTimeout(5000);
    const c = await p.locator("canvas").first().boundingBox();
    if (c) { await p.mouse.move(c.x + c.width * 0.5, c.y + c.height * 0.5); await p.waitForTimeout(700); }
    await shot(p, `v-hover-center-${theme}-1440`);
    if (c) { await p.mouse.move(c.x + c.width * 0.3, c.y + c.height * 0.4); await p.waitForTimeout(700); }
    await shot(p, `v-hover-left-${theme}-1440`);
    await p.mouse.move(5, 5);
    const menu = p.getByRole("button", { name: /menu|navigation|more/i }).first();
    if (await menu.count()) { await menu.click().catch(() => {}); await p.waitForTimeout(800); await shot(p, `v-menu-${theme}-1440`); await p.keyboard.press("Escape"); }
    notes[`v-${theme}`] = await p.evaluate(() => [...document.querySelectorAll("button")].filter(b=>b.offsetParent).map(b => (b.getAttribute("aria-label") || b.textContent.trim()).slice(0,30)));
    await p.context().close(); }
  // /equation scrolled + hover plot
  { const p = await page(theme, 1440);
    await p.goto(BASE + routes.equation, { waitUntil: "networkidle" }); await p.waitForTimeout(6000);
    const c = await p.locator("canvas").first().boundingBox();
    if (c) { await p.mouse.move(c.x + c.width * 0.4, c.y + c.height * 0.5); await p.waitForTimeout(700); }
    await shot(p, `eq-hover-${theme}-1440`);
    await p.context().close(); }
  // /paper deep scroll
  for (const w of [1440, 390]) { const p = await page(theme, w);
    await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.evaluate(() => { const s = document.querySelector(".paper-scroll") ?? document.scrollingElement; s.scrollTop = 5200; });
    await p.waitForTimeout(1500); await shot(p, `paper-mid-${theme}-${w}`);
    await p.context().close(); }
  // /morph bottom 390, /gallery hover
  { const p = await page(theme, 390);
    await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.evaluate(() => { for (const m of [document.querySelector("main"), document.scrollingElement]) if (m) m.scrollTop = 600; });
    await p.waitForTimeout(800); await shot(p, `morph-scrolled-${theme}-390`); await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    const card = p.locator(".gallery-card").first(); if (await card.count()) { await card.hover(); await p.waitForTimeout(600); }
    await shot(p, `gallery-hover-${theme}-1440`); await p.context().close(); }
}
writeFileSync(`${OUT}/notes.json`, JSON.stringify(notes, null, 1));
await b.close();
