// X-DS keyframes r7 pass 7 — cure-seat diagnosis geometry (KF-C7-02 drill row, KF-C7-05 square 390). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
    for (const [route, surface] of [["square", "controls"], ["spring", null], ["cube", "controls"]]) {
      const page = await ctx.newPage();
      await page.goto(`${BASE}#/`, { waitUntil: "load" });
      if (surface) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
      await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
      out[`${route}-${w}`] = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { t: Math.round(b.top), b: Math.round(b.bottom), l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height) }; };
        const vis = (s) => [...document.querySelectorAll(s)].filter((e) => e.checkVisibility());
        const res = {};
        const btn = vis("button").find((b) => b.textContent.trim().startsWith("layer"));
        if (btn) { const chain = []; let e = btn; for (let i = 0; i < 9 && e; i++) { const cs = getComputedStyle(e); chain.push({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 80), box: R(e), pad: `${cs.paddingTop}/${cs.paddingBottom}`, mar: `${cs.marginTop}/${cs.marginBottom}`, gap: cs.rowGap }); e = e.parentElement; } res.layerChain = chain; }
        res.ribbonBar = vis(".ribbon-bar").map((e) => ({ box: R(e), sep: R(e.querySelector('[role="separator"], [data-orientation]')), mt: getComputedStyle(e).marginTop }));
        const po = vis("span").find((s) => s.textContent.trim() === "Peak overshoot");
        if (po) { const chain = []; let e = po; for (let i = 0; i < 8 && e; i++) { const cs = getComputedStyle(e); chain.push({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 80), box: R(e), pad: `${cs.paddingTop}/${cs.paddingBottom}`, mar: `${cs.marginTop}/${cs.marginBottom}` }); e = e.parentElement; } res.peakChain = chain; }
        res.seps = vis('[role="none"][data-orientation="horizontal"], [data-slot="separator"], .separator').map(R);
        const st = document.querySelector(".square-stage"); if (st) res.square = { stage: R(st), arena: R(document.querySelector(".square-arena")), field: R(document.querySelector(".square-field")), box: R(document.querySelector(".demo-box")), legend: R(document.querySelector(".square-legend")), header: R(document.querySelector(".square-telemetry")), size: getComputedStyle(document.querySelector(".demo-box")).width };
        return res;
      });
      await page.close();
    }
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify(out, null, 1));
