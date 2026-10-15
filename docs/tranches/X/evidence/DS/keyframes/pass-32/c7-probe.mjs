// X-DS keyframes r6 pass 7 cure (critic C7) — AFTER probe + frames. Headless real Chrome only (§0ei).
// KF-C7-01  #/spring 1440: the stage plate blurs the graph paper (frames; grid contrast read by c7-grid.py).
// KF-C7-02  #/easing 390: after picking 'steps', no cut last row with scroll left (the drawer's bottom lands).
// KF-C7-03  #/easing 1440: the plate's bottom = the sibling stages' bottom.
// KF-C7-05  #/spring 1440: Re-seat, the legend and the plot share one right edge.
// KF-C7-06  #/cube Timeline surface, empty track: every ruler label centred on its line; the well at rest height.
// KF-C7-07  #/spring Physics pane: the preset grid carries no dead reset utilities.
// KF-C7-08  #/square 390: the plate takes its content height.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { stageBottoms: {}, easing: {}, spring: {}, ruler: {}, square: {}, frames: [], fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const setStore = (page, scene, patch) => page.evaluate(([k, scene, patch]) => {
  const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s));
}, [KEY, scene, patch]);
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const visit = async (page, route) => {
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(SETTLE); await painted(page);
};
// The rest state: the pointer parked at the viewport's bottom-left corner WITHOUT crossing the stage
// (KF-C7-01: a hover over the plate repainted its backdrop and hid the stale-blur defect).
const snap = async (page, name) => {
  const vp = page.viewportSize();
  await page.mouse.move(5, vp.height - 10); await page.waitForTimeout(800); await painted(page);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) }); report.frames.push(name);
};
const plate = (page) => page.evaluate(() => {
  const c = document.querySelector(".stage-cell .card, .scene-host .card"); if (!c) return null;
  const r = c.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), cls: [...c.classList].slice(0, 3).join(".") };
});
const drawer = (page) => page.evaluate(() => {
  const d = document.querySelector(".easing-target .specimen-drawer"); if (!d) return null;
  const b = d.getBoundingClientRect().bottom;
  const cut = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.top < b - 0.5 && r.bottom > b + 0.5)
    .map(({ el, r }) => `${el.classList.contains("catalogue-family") ? "heading" : "tile"}:${el.textContent.trim().split(/\s/)[0]}:${Math.round(b - r.top)}/${Math.round(r.height)}`);
  const sel = d.querySelector('.specimen-tile[data-state="on"]')?.getBoundingClientRect(); const port = d.getBoundingClientRect();
  return { scrollTop: Math.round(d.scrollTop), left: Math.round(d.scrollHeight - d.clientHeight - d.scrollTop), port: Math.round(d.clientHeight), cut,
    selectedWhole: sel ? sel.top >= port.top - 0.5 && sel.bottom <= port.bottom + 0.5 : null };
});
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/`, { waitUntil: "load" });
    const cellOf = (r) => `${r}-${w}-${scheme}`;
    // KF-C7-03 — the stage plates' bottoms at 1440 (light only; geometry is scheme-free).
    if (w === 1440 && scheme === "light") {
      for (const r of ["square", "spring", "sequence", "easing"]) { await visit(page, r); report.stageBottoms[r] = await plate(page); }
      const b = report.stageBottoms; const ref = b.square?.bottom;
      for (const r of ["spring", "sequence", "easing"]) if (Math.abs((b[r]?.bottom ?? 0) - ref) > 2) fail("KF-C7-03", r, `plate bottom ${b[r]?.bottom} vs square ${ref}`);
    }
    // KF-C7-02 — easing, pick ease-in then steps.
    await visit(page, "easing");
    const pick = async (name) => {
      const t = page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first();
      if (await t.count()) { await t.click(); await page.waitForTimeout(900); await painted(page); return true; } return false;
    };
    report.easing[cellOf("easing")] = { boot: await drawer(page), plate: await plate(page) };
    for (const n of ["ease-in", "steps"]) if (await pick(n)) report.easing[cellOf("easing")][n] = await drawer(page);
    const st = report.easing[cellOf("easing")].steps;
    if (st && st.cut.length > 0 && st.left > 0 && st.left < 110) fail("KF-C7-02", cellOf("easing"), `cut ${st.cut} with ${st.left}px of scroll left`);
    if (st && st.selectedWhole === false) fail("KF-C7-02", cellOf("easing"), "the selected tile is not whole");
    await snap(page, cellOf("easing"));
    // KF-C7-01 / -05 / -07 — spring (1440 both schemes; 390 light).
    if (w === 1440 || scheme === "light") {
      await setStore(page, "spring", { isControlsPanelOpen: true });
      await visit(page, "spring");
      const m = await page.evaluate(() => {
        const R = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return Math.round(r.right); };
        const reseat = R(".spring-reseat"), legend = R("[data-figure-legend]"), plot = R(".plot-frame"), track = R(".spring-track");
        const grid = document.querySelector(".preset-grid");
        return { reseat, legend, plot, track, presetGridClass: grid?.className ?? null };
      });
      report.spring[cellOf("spring")] = m;
      if (w === 1440) for (const k of ["reseat", "legend"]) if (m[k] != null && m.plot != null && Math.abs(m[k] - m.plot) > 2) fail("KF-C7-05", cellOf("spring"), `${k} right ${m[k]} vs plot ${m.plot}`);
      if (m.presetGridClass && /shadow-none|backdrop-filter-none/.test(m.presetGridClass)) fail("KF-C7-07", cellOf("spring"), "dead reset utilities");
      await snap(page, cellOf("spring"));
    }
    // KF-C7-06 — cube, Timeline surface, empty track.
    if (scheme === "light" || w === 1440) {
      await setStore(page, "cube", { selectedControl: "timeline", isTimelineExpanded: true, isControlsPanelOpen: true });
      await visit(page, "cube");
      const m = await page.evaluate(() => {
        const t = [...document.querySelectorAll(".timeline-track")].find((e) => e.getBoundingClientRect().width > 0); if (!t) return null;
        const ticks = [...t.querySelectorAll(".lane-track-tick-label")].map((l) => {
          const line = l.parentElement.getBoundingClientRect(); const r = l.getBoundingClientRect();
          return { label: l.textContent.trim(), line: Math.round(line.left), centre: Math.round((r.left + r.right) / 2), left: Math.round(r.left), right: Math.round(r.right) };
        });
        const tr = t.getBoundingClientRect();
        return { trackHeight: Math.round(tr.height), trackLeft: Math.round(tr.left), trackRight: Math.round(tr.right), ticks };
      });
      report.ruler[cellOf("cube-timeline")] = m;
      if (m) {
        for (const tk of m.ticks) if (Math.abs(tk.centre - tk.line) > 2 && tk.left >= m.trackLeft && tk.right <= m.trackRight) fail("KF-C7-06", cellOf("cube"), `${tk.label} centre ${tk.centre} vs line ${tk.line}`);
        if (m.trackHeight > 60) fail("KF-C7-06", cellOf("cube"), `empty well ${m.trackHeight}px`);
      }
      await snap(page, cellOf("timeline-cube-timeline"));
      await setStore(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
    }
    // KF-C7-08 — square.
    if (scheme === "light" || w === 390) {
      await visit(page, "square");
      const m = await page.evaluate(() => {
        const c = document.querySelector(".square-stage"); const a = document.querySelector(".square-arena");
        const field = document.querySelector(".square-arena .square-field, .square-arena [class*=field]");
        const cap = document.querySelector(".square-legend"); const hdr = document.querySelector(".square-telemetry");
        const g = (e) => e ? e.getBoundingClientRect() : null; const [cr, ar, fr, kr, hr] = [g(c), g(a), g(field), g(cap), g(hdr)];
        return { plate: cr && Math.round(cr.height), arena: ar && Math.round(ar.height),
          headerToField: hr && fr ? Math.round(fr.top - hr.bottom) : null, captionToFoot: kr && cr ? Math.round(cr.bottom - kr.bottom) : null };
      });
      report.square[cellOf("square")] = m;
      if (w === 390 && m.plate > 560) fail("KF-C7-08", cellOf("square"), `plate ${m.plate}px`);
      await snap(page, cellOf("square"));
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c7-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ frames: report.frames.length, fails: report.fails }, null, 1));
