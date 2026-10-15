// X-DS keyframes r6 pass 8 cure (critic C8) — AFTER probe + frames. Headless real Chrome only (§0ei).
// KF-C8-01  #/spring 1440: one left text gutter (title, readouts, caption, legend title share an x); Re-seat ends on the rail's right end.
// KF-C8-02  #/easing: ease-in-bounce sits in Back, captioned for its shape; the gap caption makes no false bezier claim.
// KF-C8-04  #/square 1440: the field takes the plate's body (size/travel re-measured).
// KF-C8-05  #/easing after 'ease-in' then 'steps': the drawer's top line crosses no row.
// KF-C8-06  #/easing 390: the literal and its Copy hold one line.
// KF-C8-07  #/cube Timeline surface, empty track: no 0 % / 100 % rules; labels kept.
// KF-C8-08  #/spring: both readouts 3 decimals, one value ink.
// KF-C8-10  the 390 Timeline frame opens the sheet; the Spring pane surface is pinned per frame (Physics).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { spring: {}, easing: {}, square: {}, ruler: {}, sheet: {}, frames: [], fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const setStore = (page, scene, patch) => page.evaluate(([k, scene, patch]) => {
  const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s));
}, [KEY, scene, patch]);
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const visit = async (page, route) => {
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(SETTLE); await painted(page);
};
const snap = async (page, name) => {
  const vp = page.viewportSize();
  await page.mouse.move(5, vp.height - 10); await page.waitForTimeout(800); await painted(page);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) }); report.frames.push(name);
};
const drawerTop = (page) => page.evaluate(() => {
  const d = document.querySelector(".easing-target .specimen-drawer"); if (!d) return null;
  const top = d.getBoundingClientRect().top + d.clientTop, bottom = top + d.clientHeight;
  const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((el) => ({ el, r: el.getBoundingClientRect() }));
  const lab = ({ el }) => `${el.classList.contains("catalogue-family") ? "heading" : "tile"}:${el.textContent.trim().split(/\s/)[0]}`;
  const sel = d.querySelector('.specimen-tile[data-state="on"]')?.getBoundingClientRect();
  const first = rows.filter(({ r }) => r.bottom > top + 0.5).sort((a, b) => a.r.top - b.r.top)[0];
  return { scrollTop: Math.round(d.scrollTop), left: Math.round(d.scrollHeight - d.clientHeight - d.scrollTop),
    topCut: rows.filter(({ r }) => r.top < top - 1 && r.bottom > top + 1).map(lab),
    first: first ? `${lab(first)}@${Math.round(first.r.top - top)}` : null,
    selectedWhole: sel ? sel.top >= top - 0.5 && sel.bottom <= bottom + 0.5 : null };
});
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/`, { waitUntil: "load" });
    const cell = (r) => `${r}-${w}-${scheme}`;
    // ── easing: catalogue truth, gap caption, literal line, drawer top after ease-in → steps
    await visit(page, "easing");
    const pick = async (name) => {
      const t = page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first();
      if (await t.count()) { await t.click(); await page.waitForTimeout(1200); await painted(page); return true; } return false;
    };
    const e = {};
    if (await pick("ease-in-bounce")) {
      e.bounce = await page.evaluate(() => {
        const t = document.querySelector('.easing-target .specimen-tile[data-state="on"]');
        const fam = t?.closest(".catalogue-section")?.querySelector(".catalogue-family")?.textContent.trim();
        const cap = document.querySelector("p.gap-caption")?.textContent.replace(/\s+/g, " ").trim() ?? null;
        return { family: fam ?? null, tile: t?.textContent.replace(/\s+/g, " ").trim() ?? null, caption: cap,
          families: [...document.querySelectorAll(".easing-target .catalogue-family")].map((f) => f.textContent.trim()) };
      });
      if (e.bounce.families.includes("Bounce")) fail("KF-C8-02", cell("easing"), "a Bounce family still stands");
      if (/no cubic-bezier reproduces it/.test(e.bounce.caption ?? "")) fail("KF-C8-02", cell("easing"), "false bezier claim in the gap caption");
    }
    for (const n of ["ease", "ease-in", "steps"]) if (await pick(n)) e[n] = await drawerTop(page);
    if (e.steps?.topCut.length) fail("KF-C8-05", cell("easing"), `top line cuts ${e.steps.topCut}`);
    if (e.steps && e.steps.selectedWhole === false) fail("KF-C8-05", cell("easing"), "selected tile not whole");
    // the literal line — pick a quad name (ease-in-back has a two-sign quad) and read the line boxes
    await pick("ease-in-out-back");
    e.literal = await page.evaluate(() => {
      const c = document.querySelector(".literal-text"); if (!c) return null;
      const rects = [...c.getClientRects()]; const lines = new Set(rects.map((r) => Math.round(r.top))).size;
      const copy = c.parentElement.querySelector("button")?.getBoundingClientRect(); const cr = c.getBoundingClientRect();
      const plate = document.querySelector(".easing-target").getBoundingClientRect();
      return { text: c.textContent.trim(), fontSize: getComputedStyle(c).fontSize, lines, copySameLine: copy ? Math.abs((copy.top + copy.bottom) / 2 - (cr.top + cr.bottom) / 2) < 6 : null,
        copyRight: copy ? Math.round(copy.right) : null, plateRight: Math.round(plate.right) };
    });
    if (w === 390) await snap(page, cell("easing-literal"));
    if (e.literal && e.literal.lines > 1) fail("KF-C8-06", cell("easing"), `literal on ${e.literal.lines} lines`);
    if (e.literal && e.literal.copyRight > e.literal.plateRight) fail("KF-C8-06", cell("easing"), "copy past the plate");
    await pick("steps");
    e.framed = await drawerTop(page);
    if (e.framed?.topCut.length) fail("KF-C8-05", cell("easing"), `framed: top line cuts ${e.framed.topCut}`);
    report.easing[cell("easing")] = e;
    await snap(page, cell("easing"));
    // ── spring: Physics pane pinned per frame
    await setStore(page, "spring", { isControlsPanelOpen: w === 1440, selectedControl: "spring" });
    await visit(page, "spring");
    const s = await page.evaluate(() => {
      const L = (sel) => { const el = document.querySelector(sel); return el ? Math.round(el.getBoundingClientRect().left) : null; };
      const Rt = (sel) => { const el = document.querySelector(sel); return el ? Math.round(el.getBoundingClientRect().right) : null; };
      const vals = [...document.querySelectorAll(".spring-target [data-scene-stage-header] .stage-readout > :last-child")].map((x) => ({ text: x.textContent.trim(), color: getComputedStyle(x).color, weight: getComputedStyle(x).fontWeight }));
      const title = document.querySelector(".spring-target [data-scene-stage-header] h2");
      return { title: title ? Math.round(title.getBoundingClientRect().left) : null, readout: L(".spring-target .stage-readout"),
        caption: L("#spring-rail-hint"), legendTitle: L(".spring-target [data-figure-title]"), plot: L(".plot-frame"),
        reseatRight: Rt(".spring-reseat"), trackRight: Rt(".spring-track"), railRight: Rt(".spring-rail"), legendRight: Rt(".spring-target [data-figure-legend]"), vals,
        pane: document.querySelector("[data-slot=configurator-layer] , .configurator-layer")?.textContent.trim().slice(0, 30) ?? null };
    });
    report.spring[cell("spring")] = s;
    for (const k of ["readout", "caption", "legendTitle"]) if (s[k] != null && s.title != null && Math.abs(s[k] - s.title) > 2) fail("KF-C8-01", cell("spring"), `${k} left ${s[k]} vs title ${s.title}`);
    if (w === 1440 && s.reseatRight != null && s.trackRight != null && Math.abs(s.reseatRight - s.trackRight) > 3) fail("KF-C8-01", cell("spring"), `Re-seat right ${s.reseatRight} vs track ${s.trackRight}`);
    if (s.vals.length === 2) {
      if (s.vals.some((v) => !/^-?\d+\.\d{3}$/.test(v.text))) fail("KF-C8-08", cell("spring"), `precision ${s.vals.map((v) => v.text)}`);
      if (s.vals[0].color !== s.vals[1].color) fail("KF-C8-08", cell("spring"), `ink ${s.vals.map((v) => v.color)}`);
    }
    await snap(page, cell("spring"));
    // ── square
    await visit(page, "square");
    const q = await page.evaluate(() => {
      const g = (s) => document.querySelector(s)?.getBoundingClientRect();
      const [c, hd, a, f, k, b] = [g(".square-stage"), g(".square-telemetry"), g(".square-arena"), g(".square-arena .stage-field-x"), g(".square-legend"), g(".square-arena .demo-box")];
      return { plate: c && [Math.round(c.width), Math.round(c.height)], arena: a && [Math.round(a.width), Math.round(a.height)],
        field: f && Math.round(f.width), box: b && Math.round(b.width), aboveField: f && hd ? Math.round(f.top - hd.bottom) : null,
        underCaption: k && c ? Math.round(c.bottom - k.bottom) : null, fieldShare: f && c ? +((f.width * f.height) / (c.width * c.height)).toFixed(3) : null };
    });
    report.square[cell("square")] = q;
    await snap(page, cell("square"));
    // ── cube Timeline surface, empty track; at 390 the sheet is OPENED (KF-C8-10)
    await setStore(page, "cube", { selectedControl: "timeline", isTimelineExpanded: true, isControlsPanelOpen: true });
    await visit(page, "cube");
    if (w === 390) {
      const before = await page.evaluate(() => { const s = document.querySelector("[data-slot=sheet-content]"); return s ? Math.round(s.getBoundingClientRect().height) : null; });
      const handle = page.locator("[data-slot=sheet-detent-handle]").first();
      if (await handle.count()) {
        const now = Number(await handle.getAttribute("aria-valuenow"));
        if (now < 0.3) { await handle.focus(); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(1200); await painted(page); }
      }
      const after = await page.evaluate(() => { const s = document.querySelector("[data-slot=sheet-content]"); const hd = document.querySelector("[data-slot=sheet-detent-handle]"); const r = s?.getBoundingClientRect();
        // KF-C8-10 (finding, glass): glass's own `.glass-floating { position: relative }` (components layer) outranks its
        // `:where([data-slot=sheet-content]) { position: fixed }`, so the sheet sits in flow and grows DOWN past the viewport.
        return { h: r ? Math.round(r.height) : null, top: r ? Math.round(r.top) : null, bottom: r ? Math.round(r.bottom) : null, viewport: innerHeight,
          position: s ? getComputedStyle(s).position : null, cls: s?.className ?? null, detent: hd?.getAttribute("aria-valuenow") ?? null }; });
      report.sheet[cell("cube")] = { before, after };
      if (!(Number(after.detent) >= 0.3)) fail("KF-C8-10", cell("cube"), `sheet not opened (${JSON.stringify(after)})`);
    }
    const r = await page.evaluate(() => {
      const t = [...document.querySelectorAll(".timeline-track")].find((e) => e.getBoundingClientRect().width > 0); if (!t) return null;
      const ticks = [...t.querySelectorAll(".lane-track-tick-label")].map((l) => ({ label: l.textContent.trim(), rule: getComputedStyle(l.parentElement).borderLeftWidth }));
      return { ticks, playheads: t.querySelectorAll("[data-lane-track-playhead]").length };
    });
    report.ruler[cell("cube-timeline")] = r;
    if (r) for (const tk of r.ticks) {
      const end = /^0\s*%?$|^100\s*%?$/.test(tk.label);
      if (end && tk.rule !== "0px") fail("KF-C8-07", cell("cube"), `${tk.label} rule ${tk.rule} on an empty track`);
      if (!end && tk.rule === "0px") fail("KF-C8-07", cell("cube"), `${tk.label} lost its rule`);
    }
    await snap(page, cell("timeline-cube-timeline"));
    await setStore(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c8-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ frames: report.frames.length, fails: report.fails }, null, 1));
