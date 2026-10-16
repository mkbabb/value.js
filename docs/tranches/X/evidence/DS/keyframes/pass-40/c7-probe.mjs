// X-DS keyframes r7 pass 7 — the cure seat's served falsifier for KF-C7-01, -02, -04, -05 (+ the Keyframes well's fold) and the AFTER frames. Headless real Chrome only (§0ei).
// KF-C7-01  SquareMini at rest: the box is drawn at 0.8 x the corner (72 of a 200 frame), so the path's segments run out from under it.
// KF-C7-02  the drill row sits evenly between its rules: |gap above - gap below| <= 2 (layer on square/cube/amiga Controls); Peak overshoot below <= above.
// KF-C7-04  an off easing tile's curve is drawn at the label ink (--muted-foreground), at full strength.
// KF-C7-05  Square at 390: the inline term binds (3 x size = arena inline - 2 x pad), the field is >= 190 px (182 before).
// fold      the Keyframes surface's code well is not landed away (the scroller holds >= 400 px at 1440).
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
const dockClip = (page) => page.evaluate(() => { const e = [...document.querySelectorAll(".scene-mini")].find((x) => x.checkVisibility()); const b = e.getBoundingClientRect();
  return { x: Math.max(0, b.left + b.width / 2 - 60), y: Math.max(0, b.top + b.height / 2 - 40), width: 120, height: 80 }; });
const open = async (ctx, route, surface) => {
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (surface) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE); await painted(page);
  return page;
};
const DRILL = (label) => {
  const frame = [...document.querySelectorAll(".pane-frame")].find((e) => e.checkVisibility()); if (!frame) return null;
  const R = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
  const vis = (q) => [...frame.querySelectorAll(q)].filter((e) => e.checkVisibility());
  const row = vis("button").find((b) => b.textContent.trim().startsWith(label)); if (!row) return null;
  const seps = vis("[data-slot=separator],[role=separator],hr").map(R).filter((r) => r[1] - r[0] <= 2);
  const rb = R(row); const above = Math.max(...seps.filter((r) => r[1] <= rb[0]).map((r) => r[1])); const below = Math.min(...seps.filter((r) => r[0] >= rb[1]).map((r) => r[0]));
  const s = vis(".controls-surface")[0];
  return { row: rb, gapAbove: rb[0] - above, gapBelow: below - rb[1], scroller: R(s), cap: s.style.maxBlockSize };
};
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    const cell = (n) => `${n}-${w}-${scheme}`;
    // KF-C7-01 · KF-C7-05 · square (+ KF-C7-02 on its Controls at 1440)
    let page = await open(ctx, "square", "controls");
    let m = await page.evaluate(() => {
      const r = (e) => { const b = e.getBoundingClientRect(); return { l: +b.left.toFixed(1), t: +b.top.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
      const mini = [...document.querySelectorAll(".scene-mini")].find((x) => x.checkVisibility());
      const box = mini?.querySelector('[data-layer="box"]'); const pth = mini?.querySelector('[data-layer="field"] path');
      const arena = document.querySelector(".square-arena"); const f = document.querySelector(".square-field"); const st = document.querySelector(".square-stage");
      const pad = parseFloat(getComputedStyle(st).getPropertyValue("--stage-plate-pad-inline")) || null;
      return { mini: mini && { box: r(box), path: r(pth), stroke: pth.getAttribute("stroke-width"), opacity: pth.getAttribute("stroke-opacity") },
        arena: r(arena), field: r(f), size: parseFloat(getComputedStyle(document.querySelector(".demo-box")).width), padToken: getComputedStyle(st).getPropertyValue("--stage-plate-pad-inline").trim() };
    });
    if (w === 1440) m.drill = await page.evaluate(DRILL, "layer");
    rep.cells[cell("square")] = m;
    const mm = m.mini; if (!mm || mm.box.w / mm.path.w > 0.45 || mm.opacity !== "0.35") fail("KF-C7-01", cell("square"), JSON.stringify(mm));
    if (w === 390 && m.field.w < 190) fail("KF-C7-05", cell("square"), `field ${m.field.w} px in arena ${m.arena.w}`);
    if (m.drill && Math.abs(m.drill.gapAbove - m.drill.gapBelow) > 2) fail("KF-C7-02", cell("square"), JSON.stringify(m.drill));
    await page.screenshot({ path: path.join(OUT, `${cell("square")}.png`) });
    await page.screenshot({ path: path.join(OUT, `${cell("square-dock")}.png`), clip: await dockClip(page) });
    await page.close();
    // KF-C7-02 · cube Controls and amiga Spin (1440)
    if (w === 1440) for (const route of ["cube", "amiga"]) {
      page = await open(ctx, route, "controls");
      m = await page.evaluate(DRILL, "layer"); rep.cells[cell(`${route}-controls`)] = m;
      if (!m || Math.abs(m.gapAbove - m.gapBelow) > 2) fail("KF-C7-02", cell(`${route}-controls`), JSON.stringify(m));
      await page.screenshot({ path: path.join(OUT, `${cell(`${route}-controls`)}.png`) }); await page.close();
    }
    // the Keyframes well's fold (1440)
    if (w === 1440) {
      page = await open(ctx, "square", "keyframes");
      m = await page.evaluate(() => { const s = [...document.querySelectorAll(".controls-surface")].find((e) => e.checkVisibility()); const b = s.getBoundingClientRect(); return { scroller: [Math.round(b.top), Math.round(b.bottom)], cap: s.style.maxBlockSize }; });
      rep.cells[cell("square-keyframes")] = m;
      if (m.scroller[1] - m.scroller[0] < 400) fail("fold", cell("square-keyframes"), JSON.stringify(m));
      await page.screenshot({ path: path.join(OUT, `${cell("square-keyframes")}.png`) }); await page.close();
    }
    // KF-C7-02 Peak overshoot · KF-C7-03 (refused, frames) · spring
    page = await open(ctx, "spring");
    if (w === 1440) { m = await page.evaluate(DRILL, "Peak overshoot"); rep.cells[cell("spring")] = m; if (!m || m.gapBelow > m.gapAbove) fail("KF-C7-02", cell("spring"), JSON.stringify(m)); }
    await page.screenshot({ path: path.join(OUT, `${cell("spring")}.png`) });
    await page.close();
    // KF-C7-04 · easing gallery
    page = await open(ctx, "easing");
    m = await page.evaluate(() => {
      const tiles = [...document.querySelectorAll(".specimen-tile")].filter((t) => t.checkVisibility());
      // The label ink in the tile's own scope (the easing stage re-tones --muted-foreground).
      const muted = getComputedStyle(tiles.find((t) => t.dataset.state !== "on").querySelector(".tile-name")).color;
      const off = tiles.filter((t) => t.dataset.state !== "on").slice(0, 3).map((t) => getComputedStyle(t.querySelector(".tile-sparkline path")).stroke);
      const on = tiles.filter((t) => t.dataset.state === "on").map((t) => getComputedStyle(t.querySelector(".tile-sparkline path")).stroke);
      return { muted, off, on };
    });
    rep.cells[cell("easing")] = m;
    if (!m.off.length || m.off.some((s) => s !== m.muted)) fail("KF-C7-04", cell("easing"), JSON.stringify(m));
    await page.screenshot({ path: path.join(OUT, `${cell("easing")}.png`) });
    await page.close();
    await ctx.close();
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "c7-probe.json"), JSON.stringify(rep, null, 1)); }
console.log(JSON.stringify(rep.fails), Object.keys(rep.cells).length, "cells");
