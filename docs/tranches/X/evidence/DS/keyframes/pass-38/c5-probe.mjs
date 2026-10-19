// X-DS keyframes r7 pass 5 — the cure seat's served falsifier for KF-C5-01, -02, -04 (+ frames). Headless real Chrome only (§0ei).
// KF-C5-01  the figure takes the pane's free block: Stagger lanes, empty Timeline notice, Monaco well, easing Curve plot; no new scroll.
// KF-C5-02  #/spring Physics: the figure is whole at the fold or a closed row (never an open row with its field under the fold).
// KF-C5-04  #/ home: the deck names the dock above and Play below; no inline glyph.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const SETTLE = Number(process.env.SETTLE ?? 4500);
const rep = { cells: {}, fails: [] };
const fail = (id, cell, why) => rep.fails.push(`${id} ${cell}: ${why}`);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const open = async (ctx, route, surface) => {
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (surface) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE);
  return page;
};
// The pane's geometry: the visible surface scroller, its scroll range, and the ribbon's top (the frame's next row).
const PANE = () => {
  const s = [...document.querySelectorAll(".controls-surface")].find((e) => e.checkVisibility());
  if (!s) return null;
  const sb = s.getBoundingClientRect(); const frame = s.closest(".pane-frame").getBoundingClientRect();
  const inner = [s, ...s.querySelectorAll(".overflow-y-auto")].map((e) => e.scrollHeight - e.clientHeight);
  return { portTop: Math.round(sb.top), portBottom: Math.round(sb.bottom), frameBottom: Math.round(frame.bottom), scrollRange: Math.max(...inner) };
};
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    // KF-C5-01 · Stagger
    let page = await open(ctx, "sequence");
    let m = await page.evaluate((PANE) => { const pane = eval(`(${PANE})`)(); const lt = document.querySelector(".lane-track").getBoundingClientRect();
      const rows = [...document.querySelectorAll(".lane-track-row")].map((r) => { const b = r.getBoundingClientRect(); return Math.round(b.top + b.height / 2); });
      return { ...pane, lanesBottom: Math.round(lt.bottom), rowCentres: rows }; }, PANE.toString());
    rep.cells[`sequence-1440-${scheme}`] = m;
    if (m.portBottom - m.lanesBottom > 28) fail("KF-C5-01", `sequence-1440-${scheme}`, `lanes end ${m.lanesBottom}, port ${m.portBottom}`);
    if (m.scrollRange > 1) fail("KF-C5-01", `sequence-1440-${scheme}`, `scroll ${m.scrollRange}`);
    await page.screenshot({ path: path.join(OUT, `sequence-1440-${scheme}.png`) }); await page.close();
    // KF-C5-01 · empty Timeline
    page = await open(ctx, "cube", "timeline");
    m = await page.evaluate((PANE) => { const pane = eval(`(${PANE})`)(); const p = [...document.querySelectorAll(".pane-frame p")].find((e) => /keyframes? in|No keyframes yet/.test(e.textContent));
      const track = document.querySelector(".pane-frame .lane-track").getBoundingClientRect();
      const r = document.createRange(); r.selectNodeContents(p); const t = r.getBoundingClientRect(); const box = p.getBoundingClientRect();
      return { ...pane, trackBottom: Math.round(track.bottom), textTop: Math.round(t.top), textBottom: Math.round(t.bottom), noticeTop: Math.round(box.top), noticeBottom: Math.round(box.bottom) }; }, PANE.toString());
    m.above = m.textTop - m.trackBottom; m.below = m.portBottom - m.textBottom;
    rep.cells[`cube-timeline-1440-${scheme}`] = m;
    if (Math.abs(m.above - m.below) > 40) fail("KF-C5-01", `cube-timeline-1440-${scheme}`, `notice not centred: ${m.above} above, ${m.below} below`);
    if (m.scrollRange > 1) fail("KF-C5-01", `cube-timeline-1440-${scheme}`, `scroll ${m.scrollRange}`);
    await page.screenshot({ path: path.join(OUT, `cube-timeline-1440-${scheme}.png`) }); await page.close();
    // KF-C5-01 · Monaco well
    page = await open(ctx, "cube", "keyframes");
    m = await page.evaluate((PANE) => { const pane = eval(`(${PANE})`)(); const w = document.querySelector(".monaco-pane:not(.inactive) .code-well").getBoundingClientRect();
      const ed = document.querySelector(".monaco-pane:not(.inactive) .monaco-editor").getBoundingClientRect();
      return { ...pane, wellBottom: Math.round(w.bottom), editorBottom: Math.round(ed.bottom) }; }, PANE.toString());
    rep.cells[`cube-keyframes-1440-${scheme}`] = m;
    if (m.portBottom - m.wellBottom > 2) fail("KF-C5-01", `cube-keyframes-1440-${scheme}`, `well ends ${m.wellBottom}, port ${m.portBottom}`);
    if (Math.abs(m.editorBottom - m.wellBottom) > 2) fail("KF-C5-01", `cube-keyframes-1440-${scheme}`, `editor ${m.editorBottom} != well ${m.wellBottom}`);
    await page.screenshot({ path: path.join(OUT, `cube-keyframes-1440-${scheme}.png`) }); await page.close();
    // KF-C5-01 · easing Curve
    page = await open(ctx, "easing");
    m = await page.evaluate((PANE) => { const pane = eval(`(${PANE})`)(); const row = document.querySelector(".easing-sidebar .param-row").getBoundingClientRect();
      const plot = document.querySelector(".easing-sidebar [data-slot=easing-curve]")?.getBoundingClientRect();
      return { ...pane, durationBottom: Math.round(row.bottom), plot: plot ? Math.round(plot.height) : null }; }, PANE.toString());
    m.gap = m.portBottom - m.durationBottom;
    rep.cells[`easing-1440-${scheme}`] = m;
    if (m.gap > 24) fail("KF-C5-01", `easing-1440-${scheme}`, `gap ${m.gap}`);
    if (m.scrollRange > 1) fail("KF-C5-01", `easing-1440-${scheme}`, `scroll ${m.scrollRange}`);
    await page.screenshot({ path: path.join(OUT, `easing-1440-${scheme}.png`) }); await page.close();
    // KF-C5-02 · spring Physics
    page = await open(ctx, "spring");
    m = await page.evaluate((PANE) => { const pane = eval(`(${PANE})`)(); const sec = document.querySelector(".spring-heatmap-section");
      const plot = sec.querySelector(".spring-heatmap-plot"); const pb = plot?.checkVisibility() ? plot.getBoundingClientRect() : null;
      const title = sec.querySelector("[data-figure-title]").getBoundingClientRect();
      return { ...pane, state: sec.getAttribute("data-state"), legend: !!sec.querySelector("[data-figure-legend]"), titleBottom: Math.round(title.bottom), plotTop: pb ? Math.round(pb.top) : null, plotBottom: pb ? Math.round(pb.bottom) : null }; }, PANE.toString());
    rep.cells[`spring-1440-${scheme}`] = m;
    const whole = m.state === "open" && m.plotBottom !== null && m.plotBottom <= m.portBottom + 1;
    const closedRow = m.state === "closed" && m.titleBottom <= m.portBottom && !m.legend;
    if (!whole && !closedRow) fail("KF-C5-02", `spring-1440-${scheme}`, JSON.stringify(m));
    await page.screenshot({ path: path.join(OUT, `spring-1440-${scheme}.png`) }); await page.close();
    // KF-C5-04 · home
    { const hc = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme }); page = await open(hc, "");
    await page.waitForSelector(".hero-deck", { timeout: 15000 }).catch(() => {});
    m = await page.evaluate(() => { const d = document.querySelector(".hero-deck"); if (!d) return { text: null, glyphs: -1, url: location.href }; return { text: d.textContent.replace(/\s+/g, " ").trim(), glyphs: d.querySelectorAll("svg").length }; });
    rep.cells[`home-1440-${scheme}`] = m;
    if (m.glyphs !== 0 || !/dock above/.test(m.text) || /list/.test(m.text)) fail("KF-C5-04", `home-1440-${scheme}`, JSON.stringify(m));
    await page.screenshot({ path: path.join(OUT, `home-1440-${scheme}.png`) }); await hc.close(); }
    await ctx.close();
    // 390: the sheet keeps its content-sized surfaces (the fill rule is lg only); square + home frames.
    const c3 = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    { const hc = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 }); page = await open(hc, ""); await page.waitForSelector(".hero-deck", { timeout: 15000 }).catch(() => {});
      const t = await page.evaluate(() => { const d = document.querySelector(".hero-deck"); if (!d) return { text: null, glyphs: -1 }; return { text: d.textContent.replace(/\s+/g, " ").trim(), glyphs: d.querySelectorAll("svg").length }; });
      rep.cells[`home-390-${scheme}`] = t; if (t.glyphs !== 0) fail("KF-C5-04", `home-390-${scheme}`, JSON.stringify(t));
      await page.screenshot({ path: path.join(OUT, `home-390-${scheme}.png`) }); await hc.close(); }
    for (const [route, surface, name] of [["square", null, "square-390"], ["cube", "timeline", "cube-timeline-390"], ["sequence", null, "sequence-390"]]) {
      page = await open(c3, route, surface);
      await page.screenshot({ path: path.join(OUT, `${name}-${scheme}.png`) }); await page.close();
    }
    await c3.close();
  }
  // The easing budget at the laptop heights (no scroll), and the Monaco well follows a shorter pane (light only).
  for (const [w, h] of [[1280, 800], [1280, 760], [1024, 768], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await open(ctx, "easing");
    const m = await page.evaluate((PANE) => { const pane = eval(`(${PANE})`)(); const row = document.querySelector(".easing-sidebar .param-row").getBoundingClientRect(); return { ...pane, durationBottom: Math.round(row.bottom), plot: Math.round(document.querySelector(".easing-sidebar [data-slot=easing-curve]")?.getBoundingClientRect().height ?? 0) }; }, PANE.toString());
    rep.cells[`easing-${w}x${h}`] = m;
    if (m.scrollRange > 1) fail("KF-C5-01", `easing-${w}x${h}`, `scroll ${m.scrollRange}`);
    await ctx.close();
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
    const page = await open(ctx, "cube", "keyframes");
    const read = () => page.evaluate(() => { const w = document.querySelector(".monaco-pane:not(.inactive) .code-well").getBoundingClientRect(); const s = [...document.querySelectorAll(".controls-surface")].find((e) => e.checkVisibility()).getBoundingClientRect(); return { well: Math.round(w.bottom), port: Math.round(s.bottom), wellH: Math.round(w.height) }; });
    const tall = await read(); await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(1500); const short = await read();
    rep.cells["monaco-shrink-1080-to-900"] = { tall, short };
    if (short.well > short.port + 2 && short.wellH > 520) fail("KF-C5-01", "monaco-shrink", JSON.stringify({ tall, short }));
    await ctx.close();
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "c5-probe.json"), JSON.stringify(rep, null, 1)); }
console.log(rep.fails.length ? rep.fails.join("\n") : "0 fails");
