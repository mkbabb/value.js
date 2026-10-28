// X-DS fourier pass 3 (redeploy) — CRITIC frames. Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const only = process.argv[3];
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const notes = {};
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
const go = async (p, path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); };
const sty = (sel, props) => `(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return null; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); const o = { cls: el.className?.toString?.().slice(0,160), box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }; for (const k of ${JSON.stringify(props)}) o[k] = cs.getPropertyValue(k).slice(0, 300); return o; })()`;
const P = ["box-shadow", "background-image", "background-color", "backdrop-filter", "filter", "animation-name", "border", "border-radius", "color", "font-size"];
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`;
  if (only && !k.includes(only)) continue;
  try {
  let p = await page(theme, w);
  // gallery
  await go(p, "/gallery"); await shot(p, `gallery-${k}`);
  if (w === 1440) {
    const card = p.locator(".gallery-card").first();
    if (await card.count()) { await card.hover(); await p.waitForTimeout(700); await shot(p, `gallery-hover-${k}`); }
    notes[`gallery-${k}`] = { card: await p.evaluate(sty(".gallery-card", P)), badge: await p.evaluate(sty(".badge-atom", P)) };
    await p.mouse.move(0, 0);
    await p.locator(".app-dock button", { hasText: "Gallery" }).first().click().catch(() => {}); await p.waitForTimeout(800); await shot(p, `dock-menu-${k}`); await p.keyboard.press("Escape");
  }
  // morph
  await go(p, "/morph"); await shot(p, `morph-${k}`);
  await p.evaluate(() => { for (const el of document.querySelectorAll("*")) if (el.scrollHeight > el.clientHeight + 40 && /auto|scroll/.test(getComputedStyle(el).overflowY)) el.scrollTop = el.scrollHeight; window.scrollTo(0, 1e6); });
  await p.waitForTimeout(700); await shot(p, `morph-bottom-${k}`);
  notes[`morph-${k}`] = { btn: await p.evaluate(sty(".morph-button", P)) };
  // paper
  await go(p, "/paper", 3500); await shot(p, `paper-${k}`);
  await p.evaluate(() => { const port = document.querySelector(".paper-scroll"); if (port) port.scrollTop = 2600; else window.scrollTo(0, 2600); });
  await p.waitForTimeout(1500); await shot(p, `paper-scrolled-${k}`);
  // not found
  await go(p, "/no-such-route", 1200); await shot(p, `not-found-${k}`);
  // equation canvas tab at 390, aside scrolled at 1440
  await go(p, "/equation", 3500);
  notes[`eq-${k}`] = { compute: await p.evaluate(sty(".configurator-aside button[class*=primary], .configurator-aside .button--primary", P)), play: await p.evaluate(sty(".timeline-row button", P)), aside: await p.evaluate(sty(".configurator-aside", P)), stage: await p.evaluate(sty(".configurator-stage", P)), rail: await p.evaluate(sty(".timeline-row .slider-track", P)) };
  if (w === 390) { await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(1500); await shot(p, `equation-canvas-${k}`); }
  else { await p.evaluate(() => { const a = document.querySelector(".configurator-aside"); a.scrollTop = a.scrollHeight; }); await p.waitForTimeout(600); await shot(p, `equation-aside-bottom-${k}`);
    await p.locator(".configurator-stage button").filter({ has: p.locator("svg") }).nth(0).hover().catch(() => {}); }
  // /v loaded
  await go(p, `/v/${SLUG}`, 1000);
  await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v still computing", k));
  await p.waitForTimeout(4000);
  if (w === 390) { await shot(p, `v-controls-${k}`); await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(2500); await shot(p, `v-canvas-${k}`); }
  else {
    await shot(p, `v-loaded-${k}`);
    const c = await p.locator(".configurator-stage canvas").first().boundingBox().catch(() => null);
    if (c) { await p.mouse.move(c.x + c.width * 0.5, c.y + c.height * 0.5); await p.waitForTimeout(900); await shot(p, `v-hover-${k}`); }
    notes[`v-${k}`] = { more: await p.evaluate(sty(".configurator-stage .glass-dock", P)), docks: await p.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((d) => { const r = d.getBoundingClientRect(); const cs = getComputedStyle(d); return { cls: d.className.slice(0, 120), box: [r.x, r.y, r.width, r.height].map(Math.round), shadow: cs.boxShadow.slice(0, 200), radius: cs.borderRadius }; })), replace: await p.evaluate(sty(".configurator-aside button", P)), layers: await p.evaluate(() => [...document.querySelectorAll(".configurator-layer-header")].map((h) => h.textContent.replace(/\s+/g, " ").trim())) };
    for (const name of ["Contour", "Coefficients"]) { await p.locator(".configurator-layer-header", { hasText: name }).first().click().catch(() => {}); await p.waitForTimeout(700); }
    await p.mouse.move(0, 0); await p.evaluate(() => { const a = document.querySelector(".configurator-aside"); a.scrollTop = a.scrollHeight; }); await p.waitForTimeout(800); await shot(p, `v-layers-open-${k}`);
    await p.evaluate(() => { const a = document.querySelector(".configurator-aside"); a.scrollTop = a.scrollHeight / 2.2; }); await p.waitForTimeout(500); await shot(p, `v-layers-mid-${k}`);
    await p.locator(".configurator-stage button[aria-label*=ore], .configurator-stage .glass-dock button").first().click().catch(() => {}); await p.waitForTimeout(900); await shot(p, `v-more-${k}`);
  }
  await p.context().close();
  } catch (e) { console.log("FAIL", k, e.message.slice(0, 300)); }
  writeFileSync(`${OUT}/f3r-critic-notes.json`, JSON.stringify(notes, null, 1));
}
await b.close();
