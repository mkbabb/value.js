// X-DS keyframes r6 pass 6 cure (critic C6) — AFTER probe + frames. Headless real Chrome only (§0ei).
// KF-C6-01/-02  #/cube, timeline unfolded, Controls and Timeline surfaces, 1440 + 390: no expanded cell, the
//               timeline only on the Timeline surface, inside the pane frame / the controls sheet; one title.
// KF-C6-03      hygiene: the pointer is parked off-stage (top-left corner) before every snap.
// KF-C6-04      #/easing: after picking a tile, the drawer's first row is a family heading (not a cut row).
// KF-C6-05      #/cube easing popover (density=menu): the fold does not cut a heading.
// KF-C6-07      #/cube Timeline surface, empty track: no playhead drawn.
// KF-C6-08      #/square: stage title differs from the pane title.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { timeline: {}, easing: {}, menu: {}, square: {}, frames: [], fails: [] };
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
// KF-C6-03 — the rest state: the pointer leaves the stage before every frame.
const snap = async (page, name) => { await page.mouse.move(0, 0); await page.waitForTimeout(300); await painted(page); await page.screenshot({ path: path.join(OUT, `${name}.png`) }); report.frames.push(name); };
// The drawer's first visible row (content below the start padding): a heading, or a cut row.
const drawerTop = (page, scope) => page.evaluate((scope) => {
  const d = document.querySelector(`${scope} .specimen-drawer`); if (!d) return null;
  const pad = parseFloat(getComputedStyle(d).scrollPaddingBlockStart) || 0;
  const top = d.getBoundingClientRect().top + d.clientTop;
  const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.bottom > top + 1).sort((a, b) => a.r.top - b.r.top);
  const first = rows[0]; if (!first) return null;
  const sel = d.querySelector('.specimen-tile[data-state="on"]')?.getBoundingClientRect();
  const port = d.getBoundingClientRect();
  return {
    scrollTop: Math.round(d.scrollTop), max: d.scrollHeight - d.clientHeight, pad,
    first: first.el.classList.contains("catalogue-family") ? `heading:${first.el.textContent.trim()}` : `tile:${first.el.textContent.trim().split(/\s/)[0]}`,
    firstOffset: Math.round(first.r.top - top), firstCut: first.r.top < top - 0.5,
    selectedWhole: sel ? sel.top >= port.top - 0.5 && sel.bottom <= port.bottom + 0.5 : null,
  };
}, scope);
// The fold: the first row the drawer's block end cuts.
const drawerFold = (page, scope) => page.evaluate((scope) => {
  const d = document.querySelector(`${scope} .specimen-drawer`); if (!d) return null;
  const b = d.getBoundingClientRect().bottom;
  const cut = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.top < b && r.bottom > b);
  return { cut: cut.map(({ el, r }) => `${el.classList.contains("catalogue-family") ? "heading" : "tile"}:${el.textContent.trim().split(/\s/)[0]}:${Math.round(b - r.top)}/${Math.round(r.height)}`) };
}, scope);
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/`, { waitUntil: "load" });
    for (const surface of ["controls", "timeline"]) {
      await setStore(page, "cube", { selectedControl: surface, isTimelineExpanded: true, isControlsPanelOpen: true });
      await visit(page, "cube");
      const cell = `timeline-cube-${surface}-${w}-${scheme}`;
      const m = await page.evaluate(() => {
        const vis = (el) => { if (!el) return false; const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); return b.width > 0 && b.height > 0 && cs.display !== "none" && cs.visibility !== "hidden"; };
        const tracks = [...document.querySelectorAll(".timeline-track")].filter(vis);
        const track = tracks[0];
        const host = track ? (track.closest("[data-slot=sheet-content]") ?? track.closest(".pane-frame")) : null;
        const sheet = document.querySelector("[data-slot=sheet-content]");
        const sb = sheet && vis(sheet) ? sheet.getBoundingClientRect() : null;
        const cube = document.querySelector(".cube, [data-scene-subject], .stage-cell");
        const cubeRect = cube ? cube.getBoundingClientRect() : null;
        const panelHeads = [...document.querySelectorAll("[data-surface-panel] h2, [data-surface-panel] h3, .pane-frame h2, [data-slot=sheet-content] h2")].filter(vis).map((e) => e.textContent.trim());
        const playheads = [...document.querySelectorAll("[data-lane-track-playhead]")].filter(vis).length;
        return {
          expandedCell: document.querySelectorAll(".timeline-expanded-cell").length,
          tracks: tracks.length,
          trackHost: host ? (host.matches("[data-slot=sheet-content]") ? "sheet" : "pane-frame") : (track ? "other" : null),
          trackShown: vis(track),
          floatingCards: [...document.querySelectorAll(".card")].filter((c) => vis(c) && !c.classList.contains("pane-frame") && c.querySelector(".timeline-track")).length,
          sheet: sb ? { top: Math.round(sb.top), bottom: Math.round(sb.bottom) } : null,
          panelHeads,
          playheads,
          stopCount: track ? track.querySelectorAll("[data-stop], .timeline-marker").length : null,
        };
      });
      report.timeline[cell] = m;
      if (m.expandedCell > 0) fail("KF-C6-01", cell, "the expanded cell is still in the DOM");
      if (m.floatingCards > 0) fail("KF-C6-01", cell, `a card holds the timeline (${m.floatingCards})`);
      if (surface === "controls" && m.trackShown) fail("KF-C6-01", cell, "a timeline over the Controls surface");
      if (surface === "timeline") {
        if (!m.trackShown) fail("KF-C6-01", cell, "no timeline on the Timeline surface");
        else if (m.trackHost !== (w === 390 ? "sheet" : "pane-frame")) fail("KF-C6-01", cell, `track in ${m.trackHost}`);
        if (m.playheads > 0 && m.stopCount === 0) fail("KF-C6-07", cell, "a playhead on an empty track");
      }
      await snap(page, cell);
    }
    await setStore(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
    // KF-C6-05 — the Rotations pane's easing popover (1440 light only, the critic's cell).
    if (w === 1440 && scheme === "light") {
      await visit(page, "cube");
      const trig = page.locator('button[aria-labelledby]').filter({ has: page.locator(".curve-glyph") }).first();
      if (await trig.count()) {
        await trig.click(); await page.waitForTimeout(800); await painted(page);
        report.menu = { fold: await drawerFold(page, "[data-easing-catalogue][data-density=menu]"), top: await drawerTop(page, "[data-easing-catalogue][data-density=menu]") };
        if (report.menu.fold?.cut.some((c) => c.startsWith("heading"))) fail("KF-C6-05", "menu", `fold cuts ${report.menu.fold.cut}`);
        await snap(page, "cube-easing-popover-1440-light");
        await page.keyboard.press("Escape");
      } else fail("KF-C6-05", "menu", "no easing trigger found");
    }
    // KF-C6-04 — the easing scene: pick ease-in, then steps (the critic's sequence).
    await visit(page, "easing");
    const cell = `easing-${w}-${scheme}`;
    const pick = async (name) => {
      const t = page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first();
      if (await t.count()) { await t.click(); await page.waitForTimeout(600); await painted(page); return true; } return false;
    };
    report.easing[cell] = { boot: await drawerTop(page, ".easing-target") };
    for (const n of ["ease-in", "steps"]) if (await pick(n)) report.easing[cell][n] = { top: await drawerTop(page, ".easing-target"), fold: await drawerFold(page, ".easing-target") };
    const st = report.easing[cell].steps?.top;
    if (st && (st.firstCut || !st.first.startsWith("heading"))) fail("KF-C6-04", cell, `first row ${st.first} cut=${st.firstCut}`);
    if (st && st.selectedWhole === false) fail("KF-C6-04", cell, "the selected tile is not wholly in view");
    await snap(page, cell);
    // KF-C6-08 — the square scene's two titles.
    if (scheme === "light") {
      await visit(page, "square");
      report.square[`${w}`] = await page.evaluate(() => ({
        stage: document.querySelector("[data-scene-stage-header] h2, .square-telemetry-title")?.textContent.trim() ?? null,
        pane: [...document.querySelectorAll("[data-surface-panel] h2, [data-surface-panel] h3, [data-surface-panel] [class*=title]")].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 3),
      }));
      const s = report.square[`${w}`];
      if (s.stage && s.pane.includes(s.stage)) fail("KF-C6-08", `square-${w}`, `stage "${s.stage}" repeats the pane title`);
      await snap(page, `square-${w}-light`);
    }
    if (w === 1440 && scheme === "light") for (const r of ["spring", "sequence"]) { await visit(page, r); await snap(page, `${r}-${w}-${scheme}`); }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c6-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ frames: report.frames.length, fails: report.fails }, null, 1));
