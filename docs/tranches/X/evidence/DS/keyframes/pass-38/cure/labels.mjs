// X-DS keyframes r7 pass 5 (cure seat): the Controls pane's label column, served type. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const route = process.argv[2] ?? "cube";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  await page.evaluate(([k, r]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: "controls", isTimelineExpanded: false }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
  console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll(".pane-frame label, .pane-frame .label, .pane-frame [data-slot=label]")].filter((e) => e.checkVisibility()).map((e) => {
    const cs = getComputedStyle(e), b = e.getBoundingClientRect();
    return { t: e.textContent.trim().slice(0, 20), tag: e.tagName, cls: String(e.className).slice(0, 100), font: cs.fontFamily.slice(0, 30), size: cs.fontSize, lh: cs.lineHeight, w: cs.fontWeight, y: Math.round(b.top), h: Math.round(b.height), anc: e.parentElement.className.slice(0, 60) };
  })), null, 0).replace(/},{/g, "},\n{"));
} finally { await browser.close(); }
