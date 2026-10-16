// X-DS keyframes r7 pass 7 — the pane frame's block budget at the drill row (KF-C7-02). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const cells = (process.env.CELLS ?? "square:controls,spring:,cube:controls,amiga:controls").split(",").map((c) => c.split(":"));
try {
  for (const [w, h] of [[1440, 900], [1280, 800]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
    for (const [route, surface] of cells) {
      const page = await ctx.newPage();
      await page.goto(`${BASE}#/`, { waitUntil: "load" });
      if (surface) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
      await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(Number(process.env.SETTLE ?? 3500));
      out[`${route}${surface ? "." + surface : ""}-${w}`] = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
        const frame = [...document.querySelectorAll(".pane-frame")].find((e) => e.checkVisibility());
        if (!frame) return null;
        const kids = [...frame.children].map((c) => ({ cls: c.className.toString().slice(0, 60), box: R(c), mt: getComputedStyle(c).marginTop }));
        const s = [...frame.querySelectorAll(".controls-surface")].find((e) => e.checkVisibility());
        const sc = s ? { box: R(s), maxBS: s.style.maxBlockSize, sh: s.scrollHeight, ch: s.clientHeight } : null;
        const vis = (q) => [...frame.querySelectorAll(q)].filter((e) => e.checkVisibility());
        const layer = vis("button").find((b) => b.textContent.trim().startsWith("layer"));
        const peak = vis("button").find((b) => b.textContent.includes("Peak overshoot"));
        const row = layer ?? peak;
        const seps = vis('[data-slot=separator],[role=separator],hr').map(R).filter((r) => r[1] - r[0] <= 2);
        const rb = R(row);
        const above = rb ? Math.max(...seps.filter((r) => r[1] <= rb[0]).map((r) => r[1])) : null;
        const below = rb ? Math.min(...seps.filter((r) => r[0] >= rb[1]).map((r) => r[0])) : null;
        const body = row?.closest(".configurator-layer-body");
        return { frame: R(frame), kids, scroller: sc, row: rb, gapAbove: rb ? rb[0] - above : null, gapBelow: rb ? below - rb[1] : null, body: R(body) };
      });
      await page.close();
    }
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify(out));
