// X-DS keyframes r7 pass 5 (cure seat): dump the block chain from a figure up to the pane scroller. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/";
const KEY = "animation-groups-control-options-store";
const [route, surface, sel, w = "1440", h = "900"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: +w, height: +h } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (surface !== "-") await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
  const out = await page.evaluate((sel) => {
    let e = document.querySelector(sel); const rows = [];
    while (e && e !== document.body) { const b = e.getBoundingClientRect(), cs = getComputedStyle(e);
      rows.push(`${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).trim().split(/\s+/).slice(0, 6).join(".")} [${Math.round(b.top)}..${Math.round(b.bottom)}] h${Math.round(b.height)} d=${cs.display} fd=${cs.flexDirection} fg=${cs.flexGrow} ov=${cs.overflowY}`);
      if (e.classList?.contains("controls-pane-wrapper")) break; e = e.parentElement; }
    return rows.join("\n");
  }, sel);
  console.log(out);
} finally { await browser.close(); }
