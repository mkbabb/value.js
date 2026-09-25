// SERVED MODEL: claude-opus-5-5 — KF.W13X.x · A2-KE-L2-2 consumer gate BEFORE: document.scrollingElement.scrollHeight == innerHeight
// on every scene route x width x theme, at rest AND with the first enabled dock surface open (the in-flow sheet state
// results-main.json named). READ-ONLY. Usage: BASE=http://localhost:5194 RUN=1 node docsh.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:5194";
const ROUTES = (process.env.ROUTES || "home,cube,amiga,square,easing,spring,sequence").split(",");
const VPS = (process.env.VPS || "360x780,390x844,430x932,844x390,768x1024,1024x768").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const rows = [];
const read = (p) => p.evaluate(() => { const se = document.scrollingElement; window.scrollTo(0, 1e6); const maxY = scrollY; window.scrollTo(0, 0);
  const sheet = [...document.querySelectorAll("[data-slot=sheet-content]")].find((e) => e.getBoundingClientRect().height > 0);
  const sr = sheet?.getBoundingClientRect();
  return { ih: innerHeight, sh: se.scrollHeight, ch: se.clientHeight, maxY, dark: document.documentElement.classList.contains("dark"), sheet: sr ? { pos: getComputedStyle(sheet).position, top: Math.round(sr.top), h: Math.round(sr.height) } : null }; });
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number);
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      await p.goto(`${BASE}/#/${route === "home" ? "" : route}`); await p.evaluate((t) => { try { localStorage.clear(); sessionStorage.clear(); localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme); await p.reload(); await sleep(3000);
      const rest = await read(p);
      let open = null, surf = null;
      if (route !== "home") {
        const btn = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
        if (await btn.count()) { await btn.click({ timeout: 3000 }).catch(() => {}); await sleep(800); }
        const items = await p.locator("[data-dock-tether=top] [data-dock-surface-item]").evaluateAll((els) => els.filter((e) => !(e.disabled || e.getAttribute("aria-disabled") === "true")).map((e) => e.getAttribute("aria-label")));
        surf = items[0];
        if (surf) { const it = p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${surf}"]`).first(); if ((await it.getAttribute("aria-pressed")) !== "true") await it.click({ timeout: 3000, force: true }).catch(() => {}); await sleep(1400); open = await read(p); }
      }
      rows.push({ route, vp: vpS, theme, rest, surf, open, restOK: rest.sh === rest.ih, openOK: open ? open.sh === open.ih : null });
    } catch (e) { rows.push({ route, vp: vpS, theme, error: String(e).slice(0, 200) }); }
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}docsh-run${process.env.RUN || 1}.json`, JSON.stringify(rows, null, 1));
const bad = rows.filter((r) => r.restOK === false || r.openOK === false || r.error);
console.log("states", rows.length, "rest RED", rows.filter((r) => r.restOK === false).length, "open RED", rows.filter((r) => r.openOK === false).length, "errors", rows.filter((r) => r.error).length);
for (const r of bad) console.log(r.route, r.vp, r.theme, r.error || `rest ${r.rest.sh}/${r.rest.ih} open(${r.surf}) ${r.open?.sh}/${r.open?.ih} sheet=${JSON.stringify(r.open?.sheet)}`);
