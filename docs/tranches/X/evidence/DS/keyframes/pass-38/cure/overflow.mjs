// X-DS keyframes r7 pass 5 (cure seat): what overflows a rail surface (scroll range, max-block-size cap, last boxes). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const [route, surface, w = "1440", h = "900"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: +w, height: +h } })).newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (surface !== "-") await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
  console.log(JSON.stringify(await page.evaluate(() => {
    const s = [...document.querySelectorAll(".controls-surface")].find((e) => e.checkVisibility()); const sb = s.getBoundingClientRect();
    const deep = [...s.querySelectorAll("*")].map((e) => [e, e.getBoundingClientRect()]).filter(([, b]) => b.height > 0).sort((a, b) => b[1].bottom - a[1].bottom).slice(0, 6)
      .map(([e, b]) => `${e.tagName}.${String(e.className?.baseVal ?? e.className).slice(0, 60)} ${Math.round(b.top)}..${Math.round(b.bottom)}`);
    const frame = s.closest(".pane-frame").getBoundingClientRect(); const ribbon = s.nextElementSibling?.getBoundingClientRect();
    return { top: Math.round(sb.top), bottom: Math.round(sb.bottom), cap: s.style.maxBlockSize, scrollH: s.scrollHeight, clientH: s.clientHeight, ribbon: ribbon && [Math.round(ribbon.top), Math.round(ribbon.bottom)], frame: Math.round(frame.bottom), deep };
  }), null, 1));
} finally { await browser.close(); }
