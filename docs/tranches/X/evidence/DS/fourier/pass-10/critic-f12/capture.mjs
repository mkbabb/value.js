// X-DS fourier critic F12 (pass 10) — headless real Chrome only (§0ei). READ-ONLY critic.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { mkdirSync, writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` });
const routes = { home: "/", paper: "/paper", v: `/v/${SLUG}`, w: "/w", gallery: "/gallery", morph: "/morph" };
const only = process.argv[3];
const probe = {};
const PROBE = () => {
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    if (!el.getClientRects().length) continue;
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight) continue;
    const anim = el.getAnimations().filter(a => a.effect?.getComputedTiming?.().iterations === Infinity).map(a => a.animationName || a.constructor.name);
    const f = cs.filter !== "none" ? cs.filter : ""; const ts = cs.textShadow !== "none" ? cs.textShadow : "";
    const bg = cs.backgroundImage.includes("gradient") ? cs.backgroundImage.slice(0, 120) : "";
    const bs = cs.boxShadow !== "none" ? cs.boxShadow : "";
    if (anim.length || f || ts || bg || bs) out.push({ sel: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".") : ""), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), anim, f, ts, bg, bs: bs.slice(0, 220), bf: cs.backdropFilter !== "none" ? cs.backdropFilter : "" });
  }
  return out;
};
if (!only || only === "routes") for (const theme of ["light", "dark"]) for (const w of [1440, 390]) for (const [n, r] of Object.entries(routes)) {
  const p = await page(theme, w);
  await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(n === "v" ? 5000 : 2500);
  await shot(p, `${n}-${theme}-${w}`);
  if (w === 1440) probe[`${n}-${theme}`] = await p.evaluate(PROBE);
  await p.context().close();
}
if (!only || only === "scenes") for (const theme of ["light", "dark"]) {
  { const p = await page(theme, 1440);
    await p.goto(BASE + routes.v, { waitUntil: "networkidle" }); await p.waitForTimeout(5000);
    const c = await p.locator("canvas").first().boundingBox();
    if (c) { await p.mouse.move(c.x + c.width * 0.5, c.y + c.height * 0.5); await p.waitForTimeout(800); }
    await shot(p, `v-hover-${theme}-1440`);
    probe[`v-hover-${theme}`] = await p.evaluate(PROBE);
    await p.mouse.move(5, 5);
    const more = p.getByRole("button", { name: /more options/i }).first();
    if (await more.count()) { await more.click().catch(() => {}); await p.waitForTimeout(700); await shot(p, `v-more-${theme}-1440`); probe[`v-more-${theme}`] = await p.evaluate(PROBE); await p.keyboard.press("Escape"); }
    await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(4000);
    probe[`equation-${theme}`] = await p.evaluate(PROBE);
    const nav = p.locator("button", { hasText: "Equation" }).first();
    if (await nav.count()) { await nav.click().catch(() => {}); await p.waitForTimeout(700); await shot(p, `eq-navmenu-${theme}-1440`); probe[`eq-navmenu-${theme}`] = await p.evaluate(PROBE); await p.keyboard.press("Escape"); await p.waitForTimeout(300); }
    const login = p.locator("button", { hasText: "Log in" }).first();
    if (await login.count()) { await login.click().catch(() => {}); await p.waitForTimeout(700); await shot(p, `eq-login-${theme}-1440`); probe[`eq-login-${theme}`] = await p.evaluate(PROBE); await p.keyboard.press("Escape"); }
    await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    const card = p.locator(".gallery-card").first(); if (await card.count()) { await card.hover(); await p.waitForTimeout(600); }
    await shot(p, `gallery-hover-${theme}-1440`); await p.context().close(); }
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.evaluate(() => { const s = document.querySelector(".paper-scroll") ?? document.scrollingElement; s.scrollTop = 5200; });
    await p.waitForTimeout(1500); await shot(p, `paper-mid-${theme}-1440`); probe[`paper-mid-${theme}`] = await p.evaluate(PROBE); await p.context().close(); }
}
writeFileSync(`${OUT}/probe-${only ?? "all"}.json`, JSON.stringify(probe, null, 1));
await b.close();
