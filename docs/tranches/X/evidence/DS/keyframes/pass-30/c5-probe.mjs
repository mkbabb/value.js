// X-DS keyframes r6 pass 5 cure (critic C5) — AFTER probe + frames. Headless real Chrome only (§0ei).
// KF-C5-01  #/cube timeline unfolded at 1440: one surface in the rail (no card over the pane; no cartoon stamp).
// KF-C5-02  #/cube timeline unfolded at 390: the sheet card has no cartoon stamp; the track's ground is opaque.
// KF-C5-03  #/easing: the picker is seeded through glass 10's `initial` (no fall-through mode/steps/term/preset attrs); preset label recorded.
// KF-C5-07  #/easing 390: the Copy glyph trails the literal (one inline group), not the title row's far corner.
// KF-C5-09  every frame waits two rAF ticks after settle, and spring/square are recaptured.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { timeline: {}, easing: {}, frames: [], fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const setStore = (page, scene, patch) => page.evaluate(([k, scene, patch]) => {
  const s = JSON.parse(localStorage.getItem(k) ?? "{}");
  s[scene] = { ...(s[scene] ?? {}), ...patch };
  localStorage.setItem(k, JSON.stringify(s));
}, [KEY, scene, patch]);
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const visit = async (page, route) => {
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(SETTLE); await painted(page);
};
const snap = async (page, name) => { await painted(page); await page.screenshot({ path: path.join(OUT, `${name}.png`) }); report.frames.push(name); };
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/`, { waitUntil: "load" });
    // KF-C5-01 / -02: the timeline unfolded, on the Controls surface (the critic's cell) and on the Timeline surface.
    for (const surface of ["controls", "timeline"]) {
      await setStore(page, "cube", { selectedControl: surface, isTimelineExpanded: true, isControlsPanelOpen: true });
      await visit(page, "cube");
      const cell = `timeline-cube-${surface}-${w}-${scheme}`;
      const m = await page.evaluate(() => {
        const vis = (el) => { if (!el) return false; const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); return b.width > 0 && b.height > 0 && cs.display !== "none" && cs.visibility !== "hidden"; };
        const cellEl = document.querySelector(".timeline-expanded-cell");
        const track = document.querySelector(".timeline-track");
        const tl = track?.closest(".pane-frame, .timeline-expanded-cell, [data-slot=sheet-content]");
        const frame = document.querySelector(".pane-frame");
        const cellCard = cellEl?.querySelector(".card");
        const fb = frame && vis(frame) ? frame.getBoundingClientRect() : null;
        const cb = cellCard && vis(cellCard) ? cellCard.getBoundingClientRect() : null;
        const overlap = fb && cb ? Math.max(0, Math.min(fb.bottom, cb.bottom) - Math.max(fb.top, cb.top)) * (Math.min(fb.right, cb.right) > Math.max(fb.left, cb.left) ? 1 : 0) : 0;
        return {
          cellShown: vis(cellEl) && (cellEl?.getBoundingClientRect().height ?? 0) > 0,
          cellCard: cb ? { top: Math.round(cb.top), bottom: Math.round(cb.bottom), cls: cellCard.className } : null,
          frame: fb ? { top: Math.round(fb.top), bottom: Math.round(fb.bottom) } : null,
          overlapPx: Math.round(overlap),
          trackHost: tl ? (tl.classList.contains("pane-frame") ? "pane-frame" : tl.classList.contains("timeline-expanded-cell") ? "expanded-cell" : "sheet") : (track ? "other" : null),
          trackShown: vis(track),
          trackBg: track ? getComputedStyle(track).backgroundColor : null,
          cartoon: document.querySelectorAll(".cartoon-surface").length,
          panes: document.querySelectorAll(".pane-frame").length,
        };
      });
      report.timeline[cell] = m;
      if (m.cartoon > 0) fail("KF-C5-01", cell, `cartoon-surface x${m.cartoon}`);
      if (w === 1440) {
        if (m.cellShown) fail("KF-C5-01", cell, "the expanded cell is drawn on the desktop rail");
        if (m.overlapPx > 0) fail("KF-C5-01", cell, `card over the pane by ${m.overlapPx}px`);
        if (surface === "timeline" && m.trackHost !== "pane-frame") fail("KF-C5-01", cell, `track in ${m.trackHost}`);
        if (surface === "controls" && m.trackShown) fail("KF-C5-01", cell, "a timeline over the Controls surface");
      } else if (surface === "timeline") {
        if (m.trackHost !== "expanded-cell") fail("KF-C5-02", cell, `track in ${m.trackHost}`);
        const a = /\/\s*([\d.]+)\)$|rgba\([^)]*,\s*([\d.]+)\)$/.exec(m.trackBg ?? "");
        const alpha = a ? Number(a[1] ?? a[2]) : 1;
        m.trackAlpha = alpha;
        if (alpha < 0.999) fail("KF-C5-02", cell, `track ground alpha ${alpha}`);
      }
      await snap(page, cell);
    }
    await setStore(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
    // KF-C5-03 / -07: the easing scene.
    await visit(page, "easing");
    const cell = `easing-${w}-${scheme}`;
    const pick = async (name) => {
      const t = page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first();
      if (await t.count()) { await t.click(); await page.waitForTimeout(600); await painted(page); return true; } return false;
    };
    const readEasing = () => page.evaluate(() => {
      const hdr = document.querySelector(".easing-target [data-scene-stage-header]");
      const lit = hdr?.querySelector(".literal-text"); const copy = hdr?.querySelector(".specimen-literal button");
      const rects = lit ? [...lit.getClientRects()] : []; const last = rects.at(-1); const cb = copy?.getBoundingClientRect();
      const title = hdr?.querySelector("h2")?.getBoundingClientRect();
      const picker = document.querySelector("[data-preset]");
      const sel = document.querySelector('[aria-label="Easing preset"]');
      return {
        name: hdr?.querySelector("h2")?.textContent.trim(), literal: lit?.textContent.trim() ?? null,
        copy: cb ? { x: Math.round(cb.left), y: Math.round(cb.top + cb.height / 2) } : null,
        literalLastLine: last ? { right: Math.round(last.right), top: Math.round(last.top), bottom: Math.round(last.bottom) } : null,
        titleRow: title ? { top: Math.round(title.top), bottom: Math.round(title.bottom) } : null,
        presetLabel: sel?.textContent.trim() ?? null, dataPreset: picker?.getAttribute("data-preset") ?? null,
        fallThrough: ["mode", "steps", "term", "preset"].filter((a) => document.querySelector(`.easing-sidebar [${a}], [data-preset][${a}], [data-preset] [${a}]`) || picker?.closest(`[${a}]`)),
        pickerText: (picker?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 160),
      };
    });
    report.easing[cell] = { boot: await readEasing() };
    for (const n of ["ease-in", "steps"]) if (await pick(n)) report.easing[cell][n] = await readEasing();
    const e = report.easing[cell]["ease-in"] ?? report.easing[cell].boot;
    if (e.fallThrough?.length) fail("KF-C5-03", cell, `attrs fell through: ${e.fallThrough}`);
    if (e.literal && e.copy && e.literalLastLine) {
      const gap = e.copy.x - e.literalLastLine.right;
      const onLine = e.copy.y >= e.literalLastLine.top - 12 && e.copy.y <= e.literalLastLine.bottom + 12;
      e.copyGap = gap; e.copyOnLiteralLine = onLine;
      if (!onLine || gap < 0 || gap > 24) fail("KF-C5-07", cell, `copy at ${JSON.stringify(e.copy)} vs literal ${JSON.stringify(e.literalLastLine)}`);
    }
    await snap(page, cell);
    // KF-C5-09: the resting-plate scenes, after two rAF ticks.
    if (w === 1440 && scheme === "light") for (const r of ["spring", "square", "sequence"]) { await visit(page, r); await snap(page, `${r}-${w}-${scheme}`); }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c5-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ frames: report.frames.length, fails: report.fails }, null, 1));
