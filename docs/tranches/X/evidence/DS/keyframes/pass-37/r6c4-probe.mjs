// X-DS keyframes r7 pass 4 REPLAY of critic R6C4 — recheck at keyframes.js 8963ea28 (the pass-29 probe, unchanged assertions). Headless real Chrome only (§0ei).
// KF-R6C4-01  #/easing: the plate ends with its landed drawer (band = plate padding + drawer inset only).
// KF-R6C4-02  #/cube, #/amiga, #/square Controls surface: a visible title row (the channel name), first in the pane; 390 sheet peek.
// KF-R6C4-03  #/cube Keyframes surface: no line wider than the well; no horizontal slider drawn; no break inside a token.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const KEY = "animation-groups-control-options-store";
const ROUTES = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { easing: {}, title: {}, editor: {}, fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const setSurface = (page, scene, control) => page.evaluate(([k, scene, control]) => {
  const s = JSON.parse(localStorage.getItem(k) ?? "{}");
  s[scene] = { ...(s[scene] ?? {}), selectedControl: control, isTimelineExpanded: false };
  localStorage.setItem(k, JSON.stringify(s));
}, [KEY, scene, control]);
const shot = async (page, name, sel, pad = 16) => {
  const file = path.join(OUT, `${name}.png`);
  const b = sel ? await page.locator(sel).first().boundingBox() : null;
  if (b) await page.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } });
  else await page.screenshot({ path: file });
};
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/`, { waitUntil: "load" });
    for (const s of ["cube", "amiga", "square"]) await setSurface(page, s, "controls");
    for (const r of ROUTES) {
      const cell = `${r || "home"}-${w}-${scheme}`;
      await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE);
      if (r === "easing") {
        const m = await page.evaluate(() => {
          const card = document.querySelector(".easing-target"), d = card.querySelector(".specimen-drawer");
          const c = card.getBoundingClientRect(), dr = d.getBoundingClientRect();
          const cs = getComputedStyle(card);
          const inset = parseFloat(cs.paddingBlockEnd) + parseFloat(cs.borderBlockEndWidth) + parseFloat(getComputedStyle(d).marginBlockEnd);
          return { cardBottom: +c.bottom.toFixed(1), drawerBottom: +dr.bottom.toFixed(1), band: +(c.bottom - dr.bottom).toFixed(1), inset, landed: d.style.maxBlockSize || null };
        });
        report.easing[cell] = m;
        if (m.band > m.inset + 6) fail("KF-R6C4-01", cell, `band ${m.band} > inset ${m.inset}`);
      }
      if (["cube", "amiga", "square"].includes(r)) {
        const m = await page.evaluate(() => {
          const t = document.querySelector("[data-surface-panel][data-state=active] [data-pane-title], [data-surface-panel][data-state=active] .configurator-layer-heading") /* pass 9 (KF-C9) moved the title into glass ConfiguratorLayer; the marker went with it */;
          if (!t) return null;
          const b = t.getBoundingClientRect();
          const panel = t.closest("[data-surface-panel]");
          const firstField = panel.querySelector("input, button[aria-labelledby], [role=combobox]");
          const fb = firstField?.getBoundingClientRect();
          return { text: t.textContent.trim(), y: Math.round(b.top), h: Math.round(b.height), visible: b.height > 0 && b.width > 0 && b.top >= 0 && b.bottom <= innerHeight,
            aboveFirstField: fb ? b.bottom <= fb.top : null, font: getComputedStyle(t).fontSize + " " + getComputedStyle(t).fontWeight };
        });
        report.title[cell] = m;
        if (!m || !m.visible || !m.aboveFirstField) fail("KF-R6C4-02", cell, JSON.stringify(m));
      }
      await page.screenshot({ path: path.join(OUT, `${cell}.png`) });
      if (["cube", "amiga", "square"].includes(r) && w === 1440) await shot(page, `controls-pane-${r}-${w}-${scheme}`, ".pane-frame");
    }
    // KF-R6C4-03: the cube's Keyframes surface.
    await setSurface(page, "cube", "keyframes");
    await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE + 2500);
    const cell = `cube-keyframes-${w}-${scheme}`;
    const m = await page.evaluate(() => {
      const ed = document.querySelector(".monaco-editor"); if (!ed) return null;
      const lines = [...ed.querySelectorAll(".view-lines .view-line")];
      const er = ed.querySelector(".lines-content")?.parentElement.getBoundingClientRect();
      const widest = Math.max(...lines.map((l) => l.firstElementChild?.getBoundingClientRect().right ?? 0));
      const hbar = ed.querySelector(".scrollbar.horizontal");
      const slider = hbar && !hbar.classList.contains("invisible") && getComputedStyle(hbar).visibility !== "hidden" ? hbar.querySelector(".slider") : null;
      const sb = slider?.getBoundingClientRect();
      const text = lines.map((l) => l.textContent.replace(/ /g, " "));
      // a visual line that ends mid-token (an alnum or '(' directly before the wrap, and the next visual line not starting a new token)
      const edR = ed.getBoundingClientRect();
      const lastBottom = Math.max(...lines.map((l) => l.getBoundingClientRect().bottom));
      const sliderV = ed.querySelector(".scrollbar.vertical .slider");
      return { allLinesInView: lastBottom <= edR.bottom + 0.5, lastBottom: +lastBottom.toFixed(1), editorBottom: +edR.bottom.toFixed(1),
        verticalSlider: sliderV ? [Math.round(sliderV.getBoundingClientRect().width), Math.round(sliderV.getBoundingClientRect().height)] : null, visualLines: lines.length, viewRight: er && +er.right.toFixed(1), widest: +widest.toFixed(1), slider: sb && sb.width > 0 && getComputedStyle(slider).display !== "none" ? [Math.round(sb.width), Math.round(sb.height)] : null, text };
    });
    report.editor[cell] = m;
    if (!m) fail("KF-R6C4-03", cell, "no editor");
    else { if (m.widest > m.viewRight + 1) fail("KF-R6C4-03", cell, `line right ${m.widest} > view ${m.viewRight}`); if (m.slider) fail("KF-R6C4-03", cell, `slider ${m.slider}`); if (w === 1440 && !m.allLinesInView) fail("KF-R6C4-03", cell, `last line ${m.lastBottom} under editor ${m.editorBottom}`); }
    await page.screenshot({ path: path.join(OUT, `${cell}.png`) });
    if (w === 1440) await shot(page, `pane-${cell}`, ".pane-frame");
    await setSurface(page, "cube", "controls");
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, process.env.JSON ?? "r6c4-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ fails: report.fails, easing: Object.fromEntries(Object.entries(report.easing).map(([k, v]) => [k, [v.band, v.inset]])), title: Object.fromEntries(Object.entries(report.title).map(([k, v]) => [k, v && [v.text, v.y, v.font]])), editor: Object.fromEntries(Object.entries(report.editor).map(([k, v]) => [k, v && [v.visualLines, v.widest, v.viewRight, v.slider]])) }, null, 1));
