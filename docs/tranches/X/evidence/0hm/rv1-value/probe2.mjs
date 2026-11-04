import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = "https://color.babb.dev";
const OUT = process.env.HOME + "/.dev-logs/x-0hm/rv1/r2";
fs.mkdirSync(OUT, { recursive: true });
const res = {};
const browser = await chromium.launch();
const cell = async (name, opts, fn) => { const ctx = await browser.newContext(opts); try { const p = await ctx.newPage(); res[name] = await fn(p); } catch (e) { res[name] = { error: String(e).slice(0, 200) }; } finally { await ctx.close(); } };
try {
  const mob = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark" };
  const desk = { viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 2, colorScheme: "dark" };
  for (const [nm, o] of [["desk", desk], ["mob", mob]]) await cell("search-" + nm, o, async (p) => {
    await p.goto(BASE + "/#/browse", { waitUntil: "load" }); await p.waitForTimeout(3500);
    return p.evaluate(() => {
      const inp = document.querySelector('input[placeholder^="Search palettes"]');
      const small = [...document.querySelectorAll("button,a,[role=button],[role=tab]")].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.width < 24 || b.height < 24); }).slice(0, 4).map((e) => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 30) + " " + Math.round(e.getBoundingClientRect().width) + "x" + Math.round(e.getBoundingClientRect().height));
      const sub = document.querySelector(".pane-shell p");
      const card = [...document.querySelectorAll("h3,[class*=name]")].find((e) => /Daraksha Grad/.test(e.textContent));
      const cr = card?.getBoundingClientRect();
      return { inputFont: inp && getComputedStyle(inp).fontSize, inputH: inp && Math.round(inp.closest("div").getBoundingClientRect().height), subFont: sub && getComputedStyle(sub).fontSize, small, cardName: card && [card.tagName, Math.round(cr.width), card.scrollWidth, getComputedStyle(card).fontSize] };
    });
  });
  await cell("home-mob", mob, async (p) => {
    await p.goto(BASE + "/", { waitUntil: "load" }); await p.waitForTimeout(3500);
    const m = await p.evaluate(() => { const ps = [...document.querySelectorAll(".pane-shell")]; const insp = ps[1]; return { inspH: Math.round(insp.getBoundingClientRect().height), sections: [...insp.querySelectorAll("h2,h3")].map((h) => h.textContent.trim().slice(0, 20)).slice(0, 30).length, docH: document.documentElement.scrollHeight }; });
    // dock expand sequence
    const t = p.getByRole("button", { name: "Toggle action bar" });
    const frames = [];
    await t.tap(); const t0 = Date.now();
    for (const ms of [60, 140, 240, 420, 900]) { await p.waitForTimeout(Math.max(0, ms - (Date.now() - t0))); const f = `${OUT}/mob-dock-expand-${ms}.png`; await p.screenshot({ path: f, clip: { x: 0, y: 0, width: 390, height: 100 }, scale: "css" }); frames.push(f); }
    const d = await p.evaluate(() => { const b = document.querySelector(".glass-dock").getBoundingClientRect(); return [Math.round(b.x), Math.round(b.width), Math.round(b.height)]; });
    return { ...m, dockAfter: d };
  });
  await cell("life-desk", desk, async (p) => {
    await p.goto(BASE + "/", { waitUntil: "load" }); await p.waitForTimeout(4000);
    await p.screenshot({ path: `${OUT}/aur-a.png`, clip: { x: 0, y: 780, width: 1800, height: 220 }, scale: "css" });
    const raf = await p.evaluate(() => new Promise((r) => { const d = []; let last = performance.now(); const end = last + 4000; const f = (t) => { d.push(t - last); last = t; if (t < end) requestAnimationFrame(f); else { d.sort((a, b) => a - b); r({ n: d.length, p50: +d[d.length >> 1].toFixed(1), p95: +d[Math.floor(d.length * 0.95)].toFixed(1), max: +d[d.length - 1].toFixed(1), over50: d.filter((x) => x > 50).length }); } }; requestAnimationFrame(f); }));
    await p.screenshot({ path: `${OUT}/aur-b.png`, clip: { x: 0, y: 780, width: 1800, height: 220 }, scale: "css" });
    const lt = await p.evaluate(() => performance.getEntriesByType("longtask")?.length ?? null);
    return { raf, lt };
  });
} finally { await browser.close(); fs.writeFileSync(OUT + "/res.json", JSON.stringify(res, null, 1)); }
