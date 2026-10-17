// X-DS keyframes r9 pass 12: measure the Timeline verb row (KF-C12-01) and the preview well's clip (KF-C12-02). Headless real Chrome (§0ei); one browser, one context, closed in finally.
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5199/";
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  try {
    await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
    await page.evaluate(([k]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube ?? {}), selectedControl: "timeline", isTimelineExpanded: true }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY]);
    await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
    await page.locator("p:has-text('to edit here') ~ button").first().click(); await page.waitForTimeout(1500); await page.mouse.move(0, 0);
    out.row = await page.evaluate(() => {
      const snap = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Snapshot" && b.getBoundingClientRect().width > 0);
      const row = snap.parentElement; const rr = row.getBoundingClientRect();
      const btns = [...row.children].filter((e) => e.tagName === "BUTTON");
      const cs = getComputedStyle(row);
      // natural one-row width: each button's max-content width (labels shown) plus gaps
      const natural = btns.reduce((a, b) => { const c = b.cloneNode(true); c.style.cssText = "position:absolute;visibility:hidden;width:max-content;flex:none"; c.querySelectorAll("span").forEach((s) => s.className = ""); document.body.append(c); const w = c.getBoundingClientRect().width; c.remove(); return a + w; }, 0) + parseFloat(cs.columnGap) * (btns.length - 1);
      const lead = (() => { const r = snap.getBoundingClientRect(); const s = getComputedStyle(snap); const kids = [...snap.childNodes]; const range = document.createRange(); range.selectNodeContents(snap); const c = range.getBoundingClientRect(); return { box: [r.left, r.right], padL: s.paddingLeft, padR: s.paddingRight, content: [c.left, c.right], glyphToEdge: c.left - r.left, wordToEdge: r.right - c.right, contentBox: r.width - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight), contentWidth: c.width }; })();
      return { rowWidth: rr.width, rem: parseFloat(getComputedStyle(document.documentElement).fontSize), naturalOneRow: natural, labelsShown: btns.map((b) => [b.getAttribute("aria-label") ?? b.textContent.trim(), [...b.querySelectorAll("span")].map((s) => getComputedStyle(s).position !== "absolute")]), lead };
    });
    out.well = await page.evaluate(async () => {
      const stage = document.querySelector(".timeline-preview-stage"); const sr = stage.getBoundingClientRect();
      const subj = stage.querySelector("[data-timeline-preview-subject]");
      const frame = subj.parentElement;
      let minT = 1e9, maxB = -1e9, minL = 1e9, maxR = -1e9; const samples = [];
      const t0 = performance.now();
      while (performance.now() - t0 < 6000) {
        await new Promise((r) => requestAnimationFrame(r));
        let t = 1e9, b = -1e9, l = 1e9, rr = -1e9;
        for (const e of subj.querySelectorAll("*")) { const r = e.getBoundingClientRect(); if (!r.width) continue; t = Math.min(t, r.top); b = Math.max(b, r.bottom); l = Math.min(l, r.left); rr = Math.max(rr, r.right); }
        minT = Math.min(minT, t); maxB = Math.max(maxB, b); minL = Math.min(minL, l); maxR = Math.max(maxR, rr);
      }
      const cs = getComputedStyle(subj);
      return { stage: { top: sr.top, bottom: sr.bottom, left: sr.left, right: sr.right, h: stage.clientHeight, w: stage.clientWidth }, frame: { w: frame.style.width, h: frame.style.height, transform: frame.style.transform }, subj: { cls: subj.className, transformStyle: cs.transformStyle, perspective: cs.perspective, sideSize: cs.getPropertyValue("--side-size"), sideOffset: cs.getPropertyValue("--side-offset"), transform: cs.transform }, painted: { minT, maxB, minL, maxR }, overflowTop: sr.top - minT, overflowBottom: maxB - sr.bottom };
    });
  } finally { await ctx.close(); }
} finally { await browser.close(); console.log(JSON.stringify(out, null, 1)); }
