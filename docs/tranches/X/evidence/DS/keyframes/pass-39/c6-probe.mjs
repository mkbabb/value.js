// X-DS keyframes r7 pass 6 — the cure seat's served falsifier for KF-C6-01, -02, -03, -04 (b, c) + AFTER frames. Headless real Chrome only (§0ei).
// KF-C6-01  the ghost diamond is an SVG polygon whose dash period divides its perimeter (pathLength 16, dash 1 1).
// KF-C6-02  SquareMini's field is a hairline (stroke-width 6 user units).
// KF-C6-03  SpringMini at the common weight: rail 2 px full ink, ball 5.5 u, ring 8.5 u.
// KF-C6-04  (b) the Square caption is centred on the field; (c) Re-seat's label ends on the rail's right end (1440).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const rep = { cells: {}, fails: [] };
const fail = (id, cell, why) => rep.fails.push(`${id} ${cell}: ${why}`);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const painted = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
// The dock trigger's face: a 120 x 80 clip centred on the visible scene miniature.
const dockClip = (page) => page.evaluate(() => { const e = [...document.querySelectorAll(".scene-mini")].find((x) => x.checkVisibility()); const b = e.getBoundingClientRect();
  return { x: Math.max(0, b.left + b.width / 2 - 60), y: Math.max(0, b.top + b.height / 2 - 40), width: 120, height: 80 }; });
const open = async (ctx, route, surface) => {
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (surface) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE); await painted(page);
  return page;
};
const MINI = () => {
  const r = (e) => { const b = e.getBoundingClientRect(); return { l: +b.left.toFixed(1), t: +b.top.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const sq = document.querySelector('.scene-mini [data-layer="field"] path');
  const rail = document.querySelector(".scene-mini .rail"); const ball = document.querySelector(".scene-mini .ball"); const ring = document.querySelector(".scene-mini .target");
  return { squareStroke: sq?.getAttribute("stroke-width") ?? null,
    spring: rail ? { rail: { ...r(rail), opacity: getComputedStyle(rail).opacity }, ball: r(ball), ring: { ...r(ring), border: getComputedStyle(ring).borderTopWidth } } : null };
};
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    const cell = (n) => `${n}-${w}-${scheme}`;
    // KF-C6-01 · the ghost diamond on the empty cube Timeline
    let page = await open(ctx, "cube", "timeline");
    let m = await page.evaluate(() => {
      const g = [...document.querySelectorAll("[data-keyframe-ghost]")].filter((e) => e.checkVisibility());
      return g.map((e) => { const b = e.getBoundingClientRect(); const poly = e.querySelector("polygon");
        return { tag: e.tagName.toLowerCase(), w: +b.width.toFixed(1), h: +b.height.toFixed(1), cx: Math.round(b.left + b.width / 2), cy: Math.round(b.top + b.height / 2),
          pathLength: poly?.getAttribute("pathLength"), dash: poly ? getComputedStyle(poly).strokeDasharray : null, stroke: poly ? getComputedStyle(poly).stroke : null }; });
    });
    rep.cells[cell("ghost")] = m;
    if (!m.length) fail("KF-C6-01", cell("ghost"), "no visible ghost");
    for (const g of m) if (g.tag !== "svg" || g.pathLength !== "16") fail("KF-C6-01", cell("ghost"), JSON.stringify(g));
    await page.screenshot({ path: path.join(OUT, `${cell("cube-timeline")}.png`) });
    const gz = m.find((g) => g.cy > 24 && g.cy < h - 24 && g.cx > 0 && g.cx < w); if (gz) { const g = gz; await page.screenshot({ path: path.join(OUT, `${cell("ghost-zoom")}.png`), clip: { x: Math.max(0, g.cx - 40), y: g.cy - 24, width: Math.min(w - Math.max(0, g.cx - 40), 260), height: 48 } }); }
    await page.close();
    // KF-C6-02 · KF-C6-04 b · square
    page = await open(ctx, "square");
    m = await page.evaluate((MINI) => {
      const f = document.querySelector(".square-field").getBoundingClientRect();
      const cap = document.querySelector(".square-legend .text-caption"); const rg = document.createRange(); rg.selectNodeContents(cap); const t = rg.getBoundingClientRect();
      return { field: { l: Math.round(f.left), r: Math.round(f.right) }, caption: { l: Math.round(t.left), r: Math.round(t.right), lines: rg.getClientRects().length }, mini: eval(`(${MINI})`)() };
    }, MINI.toString());
    m.centreDelta = Math.round((m.caption.l + m.caption.r) / 2 - (m.field.l + m.field.r) / 2);
    rep.cells[cell("square")] = m;
    if (Math.abs(m.centreDelta) > 2) fail("KF-C6-04b", cell("square"), `caption centre off field centre by ${m.centreDelta}`);
    if (m.mini.squareStroke !== "6") fail("KF-C6-02", cell("square"), `stroke ${m.mini.squareStroke}`);
    await page.screenshot({ path: path.join(OUT, `${cell("square")}.png`) });
    await page.screenshot({ path: path.join(OUT, `${cell("square-dock")}.png`), clip: await dockClip(page) });
    await page.close();
    // KF-C6-03 · KF-C6-04 c · spring
    page = await open(ctx, "spring");
    m = await page.evaluate((MINI) => {
      const rail = document.querySelector(".spring-rail").getBoundingClientRect();
      const lab = document.querySelector(".spring-reseat span"); const svg = document.querySelector(".spring-reseat svg");
      const rg = document.createRange(); rg.selectNodeContents(lab); const t = rg.getBoundingClientRect(); const s = svg.getBoundingClientRect();
      const row = document.querySelector(".spring-figure .trace-title-row")?.getBoundingClientRect();
      const plot = [...document.querySelectorAll(".spring-figure canvas, .spring-figure svg")].filter((e) => e.getBoundingClientRect().width > 200).map((e) => Math.round(e.getBoundingClientRect().right));
      return { rowR: row ? Math.round(row.right) : null, plotRights: plot, railR: Math.round(rail.right), railL: Math.round(rail.left), labelR: Math.round(t.right), glyphL: Math.round(s.left), btnR: Math.round(document.querySelector(".spring-reseat").getBoundingClientRect().right), mini: eval(`(${MINI})`)() };
    }, MINI.toString());
    rep.cells[cell("spring")] = m;
    if (w === 1440 && Math.abs(m.labelR - m.rowR) > 2) fail("KF-C6-04c", cell("spring"), `label ends ${m.labelR}, the figure's band end ${m.rowR}`);
    const sp = m.mini.spring; if (!sp || sp.rail.opacity !== "1" || sp.rail.h !== 2 || Math.abs(sp.ball.w - 5.5) > 0.2 || Math.abs(sp.ring.w - 8.5) > 0.2) fail("KF-C6-03", cell("spring"), JSON.stringify(sp));
    await page.screenshot({ path: path.join(OUT, `${cell("spring")}.png`) });
    await page.screenshot({ path: path.join(OUT, `${cell("spring-dock")}.png`), clip: await dockClip(page) });
    await page.close();
    if (w === 390) {
      // KF-C6-04 a (named, not cured) · amiga geometry; d (optional, not cured) · easing at rest
      page = await open(ctx, "amiga");
      rep.cells[cell("amiga")] = await page.evaluate(() => { const c = document.querySelector(".amiga-canvas").getBoundingClientRect(); const d = document.querySelector(".dock-band").getBoundingClientRect();
        return { canvas: [Math.round(c.top), Math.round(c.bottom)], canvasCentre: Math.round((c.top + c.bottom) / 2), dockBottom: Math.round(d.bottom) }; });
      await page.screenshot({ path: path.join(OUT, `${cell("amiga")}.png`) }); await page.close();
      page = await open(ctx, "easing");
      await page.screenshot({ path: path.join(OUT, `${cell("easing")}.png`) }); await page.close();
    }
    await ctx.close();
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "c6-probe.json"), JSON.stringify(rep, null, 1)); }
console.log(JSON.stringify(rep.fails), Object.keys(rep.cells).length, "cells");
