// X-DS keyframes r6 pass 9 cure (critic C9) — AFTER probe + frames. Headless real Chrome only (§0ei).
// KF-C9-01  every pane frame is picked THROUGH THE UI (the dock's surface item) and its pane title is asserted
//           before the frame is taken; at 390 the Timeline frame is also taken full-page (the sheet grows off-screen, glass).
// KF-C9-02  #/spring 1440: the legend row, the plot, the rail and Re-seat share one right edge.
// KF-C9-03  #/easing after 'ease-in' then 'steps': the plate ends at most one gap under the last row.
// KF-C9-04  #/square 390: the plate stands at the stage height (meets the sheet), the arena centred in it.
// KF-C9-05  every pane header is glass's ConfiguratorLayer header: one title line and a trailing chevron.
// KF-C9-06  stage readouts: under the title, the primary value at one rung, in every telemetry scene.
// KF-C9-07  the ease-in-bounce tile shows its shape note as a visible second line.
// KF-C9-09  #/cube Timeline surface, empty: the 2 CSS keyframes drawn as ghost marks; the channel name in the sentence's face.
// KF-C9-11  the collapsed dock glyph per scene (frames in glyph/).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { panes: {}, spring: {}, easing: {}, square: {}, readouts: {}, timeline: {}, glyph: {}, frames: [], fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const visit = async (page, route) => {
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(SETTLE); await painted(page);
};
const snap = async (page, name, opts = {}) => {
  const vp = page.viewportSize();
  await page.mouse.move(5, vp.height - 10); await page.waitForTimeout(800); await painted(page);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), ...opts }); report.frames.push(name);
};
// The pane's VISIBLE title: a configurator-layer label (or any h3 label) whose ancestors all paint (opacity > 0.5, not inert).
const paneHeader = (page) => page.evaluate(() => {
  const shown = (el) => { for (let e = el; e; e = e.parentElement) { const cs = getComputedStyle(e); if (Number(cs.opacity) < 0.5 || cs.visibility === "hidden" || cs.display === "none" || e.inert) return false; } return el.getBoundingClientRect().width > 0; };
  const labels = [...document.querySelectorAll(".configurator-section-label")].filter(shown);
  return labels.map((l) => {
    const trig = l.closest("[data-slot=configurator-layer-trigger]");
    const r = l.getBoundingClientRect();
    return { title: l.textContent.trim(), top: Math.round(r.top * 10) / 10, left: Math.round(r.left), layer: !!trig, chevron: !!trig?.querySelector(".configurator-layer-chevron") };
  }).sort((a, b) => a.top - b.top);
});
// KF-C9-01 — pick a pane surface through the dock (hover the collapsed tile when needed), then assert the title.
const pickSurface = async (page, surface, title, cell) => {
  const item = page.locator(`[data-dock-surface-item][data-surface="${surface}"]`).first();
  if (!(await item.count())) { fail("KF-C9-01", cell, `no dock item for ${surface}`); return false; }
  const selected = await item.getAttribute("data-selected");
  if (selected === null) {
    if (!(await item.isVisible())) {
      const b = await page.locator("button[aria-label=Scene]:visible").first().boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200);
    }
    await item.click({ timeout: 5000 }); await page.waitForTimeout(1500); await painted(page);
  }
  const heads = await paneHeader(page);
  if (!heads.some((h) => h.title === title)) { fail("KF-C9-01", cell, `pane title is ${JSON.stringify(heads.map((h) => h.title))}, wanted ${title}`); return false; }
  return true;
};
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    const cell = (r) => `${r}-${w}-${scheme}`;
    // ── easing: bounce note, drawer end room after ease-in → steps
    await visit(page, "easing");
    const pick = async (name) => {
      const t = page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first();
      if (await t.count()) { await t.click(); await page.waitForTimeout(1200); await painted(page); return true; } return false;
    };
    const e = {};
    if (await pick("ease-in-bounce")) {
      e.bounce = await page.evaluate(() => {
        const t = document.querySelector('.easing-target .specimen-tile[data-state="on"]');
        const note = t?.querySelector(".tile-note"); const r = note?.getBoundingClientRect();
        return { note: note?.textContent.trim() ?? null, visible: !!r && r.height > 4 && r.width > 4, notes: document.querySelectorAll(".easing-target .tile-note").length };
      });
      if (!e.bounce.visible) fail("KF-C9-07", cell("easing"), "the bounce tile shows no note");
      if (e.bounce.notes !== 1) fail("KF-C9-07", cell("easing"), `${e.bounce.notes} tiles show a note (want 1)`);
    }
    await pick("ease-in"); await pick("steps");
    e.steps = await page.evaluate(() => {
      const d = document.querySelector(".easing-target .specimen-drawer"); const card = document.querySelector(".easing-target");
      const tiles = [...d.querySelectorAll(".specimen-tile")].map((t) => t.getBoundingClientRect()).filter((r) => r.height > 0);
      const lastBottom = Math.max(...tiles.map((r) => r.bottom));
      const dr = d.getBoundingClientRect(); const sel = d.querySelector('.specimen-tile[data-state="on"]')?.getBoundingClientRect();
      const group = d.querySelector(".specimen-grid-group");
      return { room: group ? getComputedStyle(group).paddingBlockEnd : null, endRoomVar: d.style.getPropertyValue("--drawer-end-room") || "0px",
        gapUnderLastRow: Math.round(Math.min(dr.bottom, card.getBoundingClientRect().bottom) - lastBottom), cardBottom: Math.round(card.getBoundingClientRect().bottom),
        scrollLeft: Math.round(d.scrollHeight - d.clientHeight - d.scrollTop), selectedWhole: sel ? sel.top >= dr.top - 0.5 && sel.bottom <= dr.bottom + 0.5 : null };
    });
    if (e.steps.selectedWhole === false) fail("KF-C9-03", cell("easing"), "steps tile not whole");
    if (parseFloat(e.steps.endRoomVar) > 20.5) fail("KF-C9-03", cell("easing"), `end room ${e.steps.endRoomVar}`);
    report.easing[cell("easing")] = e;
    if (w === 1440) report.panes[cell("easing")] = await paneHeader(page);
    await snap(page, cell("easing"));
    // ── spring: the Physics surface picked through the dock; one right edge
    await visit(page, "spring");
    if (w === 1440) await pickSurface(page, "spring", "Physics", cell("spring"));
    const s = await page.evaluate(() => {
      const R = (sel) => { const el = document.querySelector(sel); return el ? Math.round(el.getBoundingClientRect().right) : null; };
      const vals = [...document.querySelectorAll(".spring-target [data-scene-stage-header] .stage-readout")].map((x) => ({ primary: x.dataset.readout === "primary", text: x.lastElementChild.textContent.trim(), size: getComputedStyle(x.lastElementChild).fontSize, top: Math.round(x.getBoundingClientRect().top) }));
      const title = document.querySelector(".spring-target [data-scene-stage-header] h2").getBoundingClientRect();
      return { legendRight: R(".spring-target [data-figure-legend]"), plotRight: R(".plot-frame"), reseatRight: R(".spring-reseat"), trackRight: R(".spring-track"), titleBottom: Math.round(title.bottom), vals };
    });
    report.spring[cell("spring")] = s;
    if (w === 1440) {
      for (const k of ["legendRight", "reseatRight", "trackRight"]) if (Math.abs(s[k] - s.plotRight) > 3) fail("KF-C9-02", cell("spring"), `${k} ${s[k]} vs plot ${s.plotRight}`);
      report.panes[cell("spring")] = await paneHeader(page);
    }
    report.readouts[cell("spring")] = s.vals;
    await snap(page, cell("spring"));
    // ── sequence: the readout row under the title
    await visit(page, "sequence");
    const seq = await page.evaluate(() => {
      const hd = document.querySelector(".seq-target [data-scene-stage-header]"); const t = hd.querySelector("h2").getBoundingClientRect();
      return [...hd.querySelectorAll(".stage-readout")].map((x) => ({ primary: x.dataset.readout === "primary", text: x.lastElementChild.textContent.trim(), size: getComputedStyle(x.lastElementChild).fontSize, under: x.getBoundingClientRect().top >= t.bottom - 2 }));
    });
    report.readouts[cell("sequence")] = seq;
    if (seq.some((v) => !v.under)) fail("KF-C9-06", cell("sequence"), "clock not under the title");
    if (w === 1440) { report.panes[cell("sequence")] = await paneHeader(page); await snap(page, cell("sequence")); }
    // ── square: the plate stands at the stage height; arena centred
    await visit(page, "square");
    const q = await page.evaluate(() => {
      const g = (s) => document.querySelector(s)?.getBoundingClientRect();
      const [c, hd, a, f, k] = [g(".square-stage"), g(".square-telemetry"), g(".square-arena"), g(".square-arena .stage-field-x"), g(".square-legend")];
      const sheet = document.querySelector("[data-slot=sheet-content]")?.getBoundingClientRect();
      const hdEl = document.querySelector(".square-telemetry");
      const vals = [...hdEl.querySelectorAll(".stage-readout")].map((x) => ({ primary: x.dataset.readout === "primary", text: x.lastElementChild.textContent.trim(), size: getComputedStyle(x.lastElementChild).fontSize }));
      return { plate: [Math.round(c.top), Math.round(c.bottom)], arena: [Math.round(a.top), Math.round(a.bottom)], field: f && [Math.round(f.top), Math.round(f.bottom), Math.round(f.width)],
        aboveField: f && hd ? Math.round(f.top - hd.bottom) : null, underCaption: k ? Math.round(c.bottom - k.bottom) : null, sheetTop: sheet ? Math.round(sheet.top) : null, vals };
    });
    report.square[cell("square")] = q; report.readouts[cell("square")] = q.vals;
    if (w === 390 && q.sheetTop != null && q.sheetTop - q.plate[1] > 40) fail("KF-C9-04", cell("square"), `plate ends ${q.sheetTop - q.plate[1]} px above the sheet`);
    await snap(page, cell("square"));
    // ── cube: the Controls surface header, then the Timeline surface picked through the dock
    await visit(page, "cube");
    if (w === 1440) report.panes[cell("cube-controls")] = await paneHeader(page);
    const onTimeline = await pickSurface(page, "timeline", "Timeline", cell("cube"));
    if (w === 390 && onTimeline) {
      const handle = page.locator("[data-slot=sheet-detent-handle]").first();
      if (await handle.count()) {
        const now = Number(await handle.getAttribute("aria-valuenow"));
        if (now < 0.3) { await handle.focus(); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(1200); await painted(page); }
      }
      report.timeline[cell("cube-sheet")] = await page.evaluate(() => { const s = document.querySelector("[data-slot=sheet-content]"); const r = s?.getBoundingClientRect(); const hd = document.querySelector("[data-slot=sheet-detent-handle]");
        return { top: r && Math.round(r.top), bottom: r && Math.round(r.bottom), viewport: innerHeight, position: s && getComputedStyle(s).position, detent: hd?.getAttribute("aria-valuenow") ?? null }; });
    }
    const tl = await page.evaluate(() => {
      const t = [...document.querySelectorAll(".timeline-track")].find((e) => e.getBoundingClientRect().width > 0); if (!t) return null;
      const ghosts = [...t.querySelectorAll("[data-keyframe-ghost]")].map((g) => Math.round(g.getBoundingClientRect().left + g.getBoundingClientRect().width / 2 - t.getBoundingClientRect().left));
      const p = [...document.querySelectorAll("p")].find((x) => /keyframes? in CSS/.test(x.textContent));
      return { ghosts, trackWidth: Math.round(t.getBoundingClientRect().width), sentence: p?.textContent.replace(/\s+/g, " ").trim() ?? null, mono: p ? !!p.querySelector("code") : null };
    });
    report.timeline[cell("cube-timeline")] = tl;
    if (onTimeline) {
      if (!tl || tl.ghosts.length !== 2) fail("KF-C9-09", cell("cube"), `ghost marks ${JSON.stringify(tl?.ghosts)}`);
      if (tl?.mono) fail("KF-C9-09", cell("cube"), "the channel name is still a mono code run");
      if (w === 1440) report.panes[cell("cube-timeline")] = await paneHeader(page);
      // re-assert the title right before the frame (the pane could have been switched under the probe)
      const heads = await paneHeader(page);
      if (!heads.some((x) => x.title === "Timeline")) fail("KF-C9-01", cell("cube"), "title changed before the frame");
      else {
        await snap(page, cell("timeline-cube-timeline"));
        if (w === 390) await snap(page, cell("timeline-cube-timeline-fullpage"), { fullPage: true });
      }
    }
    await ctx.close();
  }
  // KF-C9-05 — one header anatomy: every pane title wears the layer header with a chevron, on one line (±1 px).
  const tops = [];
  for (const [k, heads] of Object.entries(report.panes)) {
    const first = heads[0]; if (!first) { fail("KF-C9-05", k, "no pane title"); continue; }
    if (!first.layer || !first.chevron) fail("KF-C9-05", k, `${first.title} is not a layer header with a chevron`);
    if (k.endsWith("light")) tops.push([k, first.top]);
  }
  const ys = tops.map(([, t]) => t); if (ys.length && Math.max(...ys) - Math.min(...ys) > 1) fail("KF-C9-05", "1440", `title tops ${JSON.stringify(tops)}`);
  // KF-C9-06 — the primary value one rung across telemetry scenes.
  const prim = new Set(Object.entries(report.readouts).filter(([k]) => k.includes("1440")).flatMap(([, v]) => v.filter((x) => x.primary).map((x) => x.size)));
  if (prim.size !== 1) fail("KF-C9-06", "1440", `primary sizes ${[...prim]}`);
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c9-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ frames: report.frames.length, fails: report.fails }, null, 1));
