// X-DS keyframes r9 pass 14 (cure seat): DOM probe for KF-C14-01/02/07. Headless (§0ei); one browser, a context per cell, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:5214/";
const KEY = "animation-groups-control-options-store";
const out = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setSurface = (page, scene, patch) => page.evaluate(([k, scene, patch]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, patch]);
const rowInfo = (page, sel) => page.evaluate((sel) => {
  const vis = (e) => e && e.getBoundingClientRect().width > 0;
  const row = sel === "timeline" ? [...(document.querySelector("#timeline-ribbon-target")?.querySelectorAll("button") ?? [])].find(vis)?.parentElement : [...document.querySelectorAll("button")].find((b) => /Apply CSS/.test(b.textContent) && vis(b))?.parentElement;
  if (!row) return null;
  const r = row.getBoundingClientRect();
  return { row: [+r.left.toFixed(1), +r.right.toFixed(1)], btns: [...row.querySelectorAll("button")].filter(vis).map((b) => { const bb = b.getBoundingClientRect(); const cs = getComputedStyle(b); const g = b.querySelector("svg")?.getBoundingClientRect(); return { name: b.getAttribute("aria-label") ?? b.textContent.trim(), text: b.innerText.trim(), clip: b.scrollWidth > b.clientWidth + 0.5, l: +bb.left.toFixed(1), w: +bb.width.toFixed(1), pad: cs.paddingInlineStart, glyph: g ? +g.left.toFixed(1) : null, bg: cs.backgroundColor }; }) };
}, sel);
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/square`, { waitUntil: "load" }); await page.waitForTimeout(3000);
      out[`readouts-${w}`] = await page.evaluate(() => [...document.querySelectorAll(".stage-readout > :first-child")].map((e) => ({ t: e.textContent.trim(), f: getComputedStyle(e).fontFamily.split(",")[0], parent: e.parentElement.className })));
      await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
      for (const [s, patch] of [["keyframes", { selectedControl: "keyframes" }], ["timeline", { selectedControl: "timeline", isTimelineExpanded: true }]]) {
        await setSurface(page, "cube", { ...patch, ...(w === 390 ? { isControlsPanelOpen: true } : {}) });
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
        out[`${s}-${w}`] = await rowInfo(page, s);
        out[`${s}-${w}-title`] = await page.evaluate(() => { const t = [...document.querySelectorAll(".configurator-section-label")].find((e) => e.getBoundingClientRect().width > 0); return t && +t.getBoundingClientRect().left.toFixed(1); });
      }
      await setSurface(page, "cube", { selectedControl: "controls", isControlsPanelOpen: false });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, process.env.OUTF ?? "probe-before.json"), JSON.stringify(out, null, 1)); }
