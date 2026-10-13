// X-DS keyframes r5 pass 4 cure (critic C4) — AFTER probe. Headless real Chrome only (§0ei).
// KF-C4-01: the #/easing family strip is ONE row at the --type-small rung, or it is glass's Select
//           (measured fit); the ink underline and the strip's hairline share a line.
// KF-C4-02: #/spring Physics at 1440x900 has no hidden scroll; "Peak overshoot" is above the fold.
// KF-C4-03: no rail cell's fold cuts a line of text, and the end fade lies on none: a footed cell has
//           the fade off, a cue cell has no own-text element across (fold - fade, fold].
// KF-C4-04: the spring stage's text edges (title, readout, caption, the trace's title) share one x,
//           and the rail's track and the plot share the other.
// KF-C4-05: the CSS editor's horizontal slider is 4 px in a translucent hairline tone.
// KF-C4-06: the sub-pane's Back arrow sits on the pane's content gutter.
// KF-C4-07: the ribbon's Reverse and Preview wear the label rung.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const SCENES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { fold: {}, easing: {}, spring: {}, pane: {}, fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const shot = async (page, name, sel, pad = 8) => {
  const file = path.join(OUT, `${name}.png`);
  if (sel) { const b = await page.locator(sel).first().boundingBox().catch(() => null);
    if (b) { await page.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); return; } }
  await page.screenshot({ path: file });
};
const fold = () => {
  const frame = document.querySelector(".pane-frame"); if (!frame) return { err: "no pane" };
  const sc = [...frame.querySelectorAll(".controls-surface")].find((s) => s.offsetParent);
  if (!sc) return { err: "no scroller" };
  const sr = sc.getBoundingClientRect();
  const raw = getComputedStyle(sc).getPropertyValue("--fade-scroll-width").trim(); const n = parseFloat(raw);
  const FADE = !Number.isFinite(n) ? 16 : raw.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : n;
  const bottom = sr.top + sc.clientTop + sc.clientHeight;
  const overflow = sc.scrollHeight - sc.clientHeight;
  const fadeOn = sc.hasAttribute("data-fade-end") || parseFloat(getComputedStyle(sc).getPropertyValue("--fade-end")) > 0;
  const texts = [...sc.querySelectorAll("*")].filter((el) => !(el instanceof SVGElement) && !["INPUT", "TEXTAREA", "SELECT", "CANVAS", "IMG"].includes(el.tagName)
    && el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true }) && !el.closest(".sr-only")
    && [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim()))
    .map((el) => { const r = el.getBoundingClientRect(); return { t: el.textContent.trim().slice(0, 24), top: r.top, bottom: r.bottom }; }).filter((s) => s.bottom - s.top > 1);
  const cutByFold = texts.filter((s) => s.top < bottom - 0.5 && s.bottom > bottom + 0.5).map((s) => `${s.t}@${Math.round(s.top)}-${Math.round(s.bottom)}`);
  const underFade = !fadeOn ? [] : texts.filter((s) => s.top < bottom - 0.5 && s.bottom > bottom - FADE + 0.5).map((s) => `${s.t}@${Math.round(s.top)}-${Math.round(s.bottom)}`);
  const state = overflow <= 1 ? "fits" : fadeOn ? "cue" : "foot";
  return { state, fold: Math.round(bottom), clientHeight: sc.clientHeight, scrollHeight: sc.scrollHeight, cap: sc.style.maxBlockSize || null, fade: FADE, fadeOn, cutByFold, underFade,
    frameBottom: Math.round(frame.getBoundingClientRect().bottom), pass: overflow <= 1 || (cutByFold.length === 0 && underFade.length === 0) };
};
try {
  for (const [w, h] of [[1440, 900], [1280, 800], [1024, 768]]) {
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
      const page = await ctx.newPage();
      for (const scene of SCENES) {
        await page.goto(`${BASE}#/${scene}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        const cell = `${scene}-${w}x${h}-${scheme}`;
        const m = await page.evaluate(fold).catch((e) => ({ err: e.message }));
        report.fold[cell] = m;
        if (!m.pass) fail("KF-C4-03", cell, JSON.stringify({ cutByFold: m.cutByFold, underFade: m.underFade, err: m.err }));
        if (scheme === "light" || w === 1440) await shot(page, `pane-${scene}-${w}x${h}-${scheme}`, ".pane-frame");
        if (scene === "spring") {
          if (w === 1440) {
            if (m.state !== "fits") fail("KF-C4-02", cell, `state ${m.state}, ${m.scrollHeight - m.clientHeight}px hidden`);
            const peak = await page.evaluate(() => { const b = [...document.querySelectorAll(".pane-frame button")].find((e) => /Peak overshoot/.test(e.textContent)); const sc = [...document.querySelectorAll(".pane-frame .controls-surface")].find((s) => s.offsetParent); return b ? { bottom: Math.round(b.getBoundingClientRect().bottom), fold: Math.round(sc.getBoundingClientRect().bottom) } : null; });
            report.spring[`peak-${scheme}`] = peak;
            if (!peak || peak.bottom > peak.fold) fail("KF-C4-02", cell, `Peak overshoot ${JSON.stringify(peak)}`);
            const e = await page.evaluate(() => { const x = (s, root = document) => { const el = root.querySelector(s); return el ? +el.getBoundingClientRect().left.toFixed(1) : null; }; const card = document.querySelector(".spring-target"); const r = (s) => +card.querySelector(s).getBoundingClientRect().right.toFixed(1);
              return { title: x(".spring-header h2", card), readout: x(".stage-readout", card), caption: x("#spring-rail-hint", card), traceTitle: x("[data-figure-title]", card), track: x(".spring-track", card), plot: x(".plot-frame", card), legendRight: r("[data-figure-legend]"), headerRight: r(".spring-header") }; });
            report.spring[`edges-${scheme}`] = e;
            const text = [e.title, e.readout, e.caption, e.traceTitle], axis = [e.track, e.plot];
            if (Math.max(...text) - Math.min(...text) > 0.6) fail("KF-C4-04", cell, `text edges ${text}`);
            if (Math.max(...axis) - Math.min(...axis) > 0.6) fail("KF-C4-04", cell, `axis edges ${axis}`);
            if (Math.abs(e.legendRight - e.headerRight) > 0.6) fail("KF-C4-04", cell, `right edges ${e.legendRight} ${e.headerRight}`);
            await shot(page, `spring-${w}x${h}-${scheme}`);
            await shot(page, `spring-stage-${w}x${h}-${scheme}`, ".spring-target");
          }
        }
        if (scene === "easing") {
          const s = await page.evaluate(() => { const root = document.querySelector(".scene-host [data-easing-catalogue], [data-easing-catalogue][data-density=stage]"); const f = root.querySelector(".segmented-tabs"); if (!f) return { strip: false, host: root.clientWidth, select: !!root.querySelector("[role=combobox]"), sep: root.querySelectorAll("[data-slot=separator]").length };
            const tabs = [...f.querySelectorAll(".segmented-tab")]; const ind = f.querySelector(".segmented-indicator").getBoundingClientRect(); const fr = f.getBoundingClientRect();
            return { strip: true, host: root.clientWidth, need: f.scrollWidth, tabs: tabs.length, rows: [...new Set(tabs.map((t) => Math.round(t.getBoundingClientRect().top)))], fontSize: getComputedStyle(tabs[0]).fontSize, lastRight: +tabs.at(-1).getBoundingClientRect().right.toFixed(1), hostRight: +root.getBoundingClientRect().right.toFixed(1), stripBottom: +fr.bottom.toFixed(1), indicatorBottom: +ind.bottom.toFixed(1) }; });
          report.easing[cell] = s;
          if (s.strip) { if (s.rows.length !== 1) fail("KF-C4-01", cell, `rows ${s.rows}`); if (s.lastRight > s.hostRight + 0.5) fail("KF-C4-01", cell, `overflows ${s.lastRight} > ${s.hostRight}`); if (Math.abs(s.stripBottom - s.indicatorBottom) > 2) fail("KF-C4-01", cell, `underline ${s.indicatorBottom} vs hairline ${s.stripBottom}`); }
          else if (!s.select || s.sep !== 1) fail("KF-C4-01", cell, `no strip and ${JSON.stringify(s)}`);
          if (scheme === "light" || w === 1440) { await shot(page, `easing-${w}x${h}-${scheme}`); }
        }
      }
      await ctx.close();
    }
  }
  // The pane's own cells: the ribbon rung, the easing sub-pane, the Keyframes editor.
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
    const rib = await page.evaluate(() => { const f = document.querySelector(".pane-frame"); const fs = (el) => el && +parseFloat(getComputedStyle(el).fontSize).toFixed(2); const btn = (t) => [...f.querySelectorAll(".ribbon-bar button")].find((b) => b.textContent.trim() === t);
      const label = [...f.querySelectorAll(".ribbon-bar *")].find((el) => el.childElementCount === 0 && el.textContent.trim() === "time");
      return { reverse: fs(btn("Reverse")), preview: fs(btn("Preview")), label: fs(label), reverseWordX: +btn("Reverse").querySelector("span").getBoundingClientRect().left.toFixed(1), labelX: +label.getBoundingClientRect().left.toFixed(1) }; });
    report.pane[`ribbon-${scheme}`] = rib;
    if (Math.abs(rib.reverse - rib.label) > 0.5 || Math.abs(rib.preview - rib.label) > 0.5) fail("KF-C4-07", `cube-${scheme}`, JSON.stringify(rib));
    if (Math.abs(rib.reverseWordX - rib.labelX) > 1) fail("KF-C4-07", `cube-${scheme}`, `Reverse off the label column ${JSON.stringify(rib)}`);
    await shot(page, `pane-cube-controls-1440-${scheme}`, ".pane-frame");
    await page.locator('button[aria-label="Edit easing curve"]').first().click(); await page.waitForTimeout(1800);
    const sub = await page.evaluate(() => { const f = document.querySelector(".pane-frame"); const h = f.querySelector(".panel-row--detail [data-subpane-header]"); const arrow = h.querySelector("svg").getBoundingClientRect(); const body = f.querySelector(".panel-row--detail [data-subpane-body]").getBoundingClientRect(); const code = f.querySelector(".panel-row--detail [data-subpane-body] code");
      return { arrowX: +arrow.left.toFixed(1), gutterX: +body.left.toFixed(1), frameX: +f.getBoundingClientRect().left.toFixed(1), literalFont: code && getComputedStyle(code).fontSize, literalX: code && +code.getBoundingClientRect().left.toFixed(1) }; });
    report.pane[`subpane-${scheme}`] = sub;
    if (Math.abs(sub.arrowX - sub.gutterX) > 1) fail("KF-C4-06", `cube-${scheme}`, JSON.stringify(sub));
    await shot(page, `pane-cube-easing-edit-1440-${scheme}`, ".pane-frame");
    await ctx.close();
    const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const p2 = await ctx2.newPage();
    await p2.goto(`${BASE}#/cube`, { waitUntil: "load" }); await p2.waitForTimeout(SETTLE);
    await p2.hover(".glass-dock >> nth=0"); await p2.waitForTimeout(900);
    await p2.locator('button[aria-label="Keyframes"]').first().click({ force: true }); await p2.waitForTimeout(3500);
    await p2.mouse.move(1200, 600); await p2.waitForTimeout(600);
    const ed = await p2.evaluate(() => { const s = document.querySelector(".pane-frame .monaco-scrollable-element > .scrollbar.horizontal .slider"); if (!s) return null; const r = s.getBoundingClientRect(); return { background: getComputedStyle(s).backgroundColor, height: r.height, width: Math.round(r.width) }; });
    report.pane[`editor-${scheme}`] = ed;
    if (!ed || ed.height > 4.5 || !/rgba\(.*,\s*0?\.\d+\)|\/\s*0?\.\d+\)/.test(ed.background)) fail("KF-C4-05", `cube-${scheme}`, JSON.stringify(ed));
    await shot(p2, `pane-cube-keyframes-1440-${scheme}`, ".pane-frame");
    await ctx2.close();
  }
  // KF-C4-07 (a), kept: the Square stage at 390, as it stands.
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    for (const scene of ["square", "spring", "easing"]) { await page.goto(`${BASE}#/${scene}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE); await shot(page, `${scene}-390-${scheme}`); }
    await ctx.close();
  }
} finally {
  await browser.close();
  report.failures = report.fails.length;
  fs.writeFileSync(path.join(HERE, process.env.JSON ?? "c4-probe.json"), JSON.stringify(report, null, 1));
  console.log("failures:", report.fails.length); for (const f of report.fails) console.log("  " + f);
  for (const [k, m] of Object.entries(report.fold)) if (k.endsWith("light")) console.log(k, m.state, "fold", m.fold, "cap", m.cap, `${m.clientHeight}/${m.scrollHeight}`, m.err ?? "");
  console.log(JSON.stringify(report.easing)); console.log(JSON.stringify(report.spring)); console.log(JSON.stringify(report.pane));
}
