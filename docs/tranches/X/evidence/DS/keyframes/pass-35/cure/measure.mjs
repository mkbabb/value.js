// X-DS keyframes pass 10 (critic C10) — BEFORE/AFTER geometry for the consumer rows. Headless real Chrome only (§0ei).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const TAG = process.env.TAG ?? "before";
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 3500);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const visit = async (page, route) => { await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE); await painted(page); };
const R = (r) => r && { x: Math.round(r.left), y: Math.round(r.top), r: Math.round(r.right), b: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height) };
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage(); const k = (s) => `${s}-${w}`;
    // easing: the Back row
    await visit(page, "easing");
    out[k("easing-back")] = await page.evaluate(() => {
      const tile = document.querySelector('.easing-target .specimen-tile[aria-describedby$="-desc-ease-in-bounce"]');
      const grid = tile?.closest(".specimen-grid"); if (!grid) return null;
      const top = tile.getBoundingClientRect().top;
      return [...grid.querySelectorAll(".specimen-tile")].filter((t) => Math.abs(t.getBoundingClientRect().top - top) < 4).map((t) => ({ name: t.querySelector(".tile-name").textContent.trim(), ball: Math.round(t.querySelector(".tile-ball").getBoundingClientRect().top), name_y: Math.round(t.querySelector(".tile-name").getBoundingClientRect().top), tile: Math.round(t.getBoundingClientRect().top) }));
    });
    const pick = async (name) => { const t = page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first(); if (await t.count()) { await t.click(); await page.waitForTimeout(1200); await painted(page); } };
    await pick("ease-in"); await pick("steps");
    out[k("easing-steps-top")] = await page.evaluate(() => {
      const d = document.querySelector(".easing-target .specimen-drawer"); const dr = d.getBoundingClientRect();
      const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => ({ k: e.classList.contains("catalogue-family") ? "h:" + e.textContent.trim() : "t:" + e.querySelector(".tile-name")?.textContent.trim(), t: Math.round(e.getBoundingClientRect().top - dr.top), b: Math.round(e.getBoundingClientRect().bottom - dr.top) })).filter((r) => r.b > 0 && r.t < dr.height);
      return { drawerTop: Math.round(dr.top), scrollTop: Math.round(d.scrollTop), padStart: getComputedStyle(d).scrollPaddingBlockStart, first: rows.slice(0, 4) };
    });
    // sequence
    await visit(page, "sequence");
    out[k("sequence")] = await page.evaluate(() => [...document.querySelectorAll(".seq-track")].map((t) => { const rail = t.querySelector(".progress-rail").getBoundingClientRect(); const ball = t.parentElement.querySelector(".seq-ball, .progress-ball")?.getBoundingClientRect(); return { railX: Math.round(rail.left), railR: Math.round(rail.right), ballC: ball && Math.round(ball.left + ball.width / 2) }; }));
    // spring
    await visit(page, "spring");
    out[k("spring")] = await page.evaluate(() => { const g = (s) => document.querySelector(s)?.getBoundingClientRect(); const ring = g(".spring-target-marker"); const rail = g(".spring-track .progress-rail"); const track = g(".spring-track");
      return { ring: R(ring), ringC: ring && Math.round(ring.left + ring.width / 2), rail: R(rail), track: R(track), dock: document.querySelector(".dock-glyph")?.getAttribute("data-live") ?? "absent" };
      function R(r) { return r && { x: Math.round(r.left), r: Math.round(r.right), y: Math.round(r.top), w: Math.round(r.width) }; } });
    // home
    await visit(page, "");
    out[k("home")] = await page.evaluate(() => { const g = (s) => document.querySelector(s)?.getBoundingClientRect(); const R = (r) => r && [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]; return { h1: R(g("h1.hero-display")), cube: R(g(".cube")) }; });
    // cube timeline (empty)
    await visit(page, "cube");
    const item = page.locator('[data-dock-surface-item][data-surface="timeline"]').first();
    if (await item.count()) {
      if (!(await item.isVisible())) { const b = await page.locator("button[aria-label=Scene]:visible").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200); } }
      try { await item.click({ timeout: 5000 }); await page.waitForTimeout(1500); } catch {}
    }
    out[k("timeline")] = await page.evaluate(() => { const t = [...document.querySelectorAll(".timeline-track")].find((e) => e.getBoundingClientRect().width > 0); if (!t) return null; const p = [...document.querySelectorAll("p")].find((x) => /keyframes? in CSS/.test(x.textContent));
      const tr = t.getBoundingClientRect(); const pr = p?.getBoundingClientRect(); const cs = getComputedStyle(t);
      return { trackBottom: Math.round(tr.bottom), mb: cs.marginBottom, sentenceTop: pr && Math.round(pr.top), gap: pr && Math.round(pr.top - tr.bottom), parentGap: getComputedStyle(p.parentElement).rowGap, ruler: [...t.querySelectorAll("*")].filter((e) => /^\d+%$/.test(e.textContent.trim()) && e.children.length === 0).map((e) => Math.round(e.getBoundingClientRect().top)).slice(0, 5) }; });
    // select chevrons (glass, cited)
    out[k("chevrons")] = await page.evaluate(() => [...document.querySelectorAll("[data-slot=select-trigger]")].filter((t) => t.getBoundingClientRect().width > 0).map((t) => { const svg = t.querySelector("svg:last-of-type"); return { state: t.getAttribute("data-state"), rotate: svg && getComputedStyle(svg).rotate, transform: svg && getComputedStyle(svg).transform }; }));
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, `measure-${TAG}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
