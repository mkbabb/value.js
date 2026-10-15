// X-DS keyframes r6 pass 5 — read the 390 sheets' material (which glass tier the transport/controls sheet wears). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/", { waitUntil: "load" });
  await page.evaluate((k) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube ?? {}), selectedControl: "timeline", isTimelineExpanded: true }; localStorage.setItem(k, JSON.stringify(s)); }, KEY);
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000);
  const r = await page.evaluate(() => {
    const read = (el) => { if (!el) return null; const cs = getComputedStyle(el); return { cls: el.className?.toString().slice(0, 200), ds: { ...el.dataset }, bg: cs.backgroundColor, bf: cs.backdropFilter, sh: cs.boxShadow.slice(0, 160) }; };
    return { sheet: read(document.querySelector("[data-slot=sheet-content]")), cell: read(document.querySelector(".timeline-expanded-cell")), card: read(document.querySelector(".timeline-expanded-cell .card")), dock: read(document.querySelector("[data-slot=dock], .transport-dock, nav")) };
  });
  console.log(JSON.stringify(r, null, 1));
} finally { await browser.close(); }
