// KF-C8-10 debug: open the 390 sheet on the cube's Timeline surface. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  await page.goto("http://localhost:5173/#/", { waitUntil: "load" });
  await page.evaluate(() => { const k = "animation-groups-control-options-store"; const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube ?? {}), selectedControl: "timeline", isTimelineExpanded: true, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(s)); });
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000);
  const rd = () => page.evaluate(() => { const s = document.querySelector("[data-slot=sheet-content]"); const R = s && s.getBoundingClientRect(); window.__r = R && [Math.round(R.top), Math.round(R.bottom)]; window.__t = s && [getComputedStyle(s).top, getComputedStyle(s).bottom, getComputedStyle(s).position, s.getAttribute("style"), getComputedStyle(s).translate]; window.__n = document.querySelectorAll("[data-slot=sheet-content]").length; const hd = document.querySelector("[data-slot=sheet-detent-handle]"); const st = JSON.parse(localStorage.getItem("animation-groups-control-options-store")).cube; return { r: window.__r, t: window.__t, n: window.__n, h: s && Math.round(s.getBoundingClientRect().height), d: hd?.getAttribute("aria-valuenow"), open: st.isControlsPanelOpen, sel: st.selectedControl }; });
  console.log("boot", JSON.stringify(await rd()));
  const handle = page.locator("[data-slot=sheet-detent-handle]").first();
  await handle.focus(); await page.keyboard.press("ArrowUp");
  for (const t of [300, 1200, 3000]) { await page.waitForTimeout(t); console.log(t, JSON.stringify(await rd())); }
  await page.mouse.move(5, 834); await page.waitForTimeout(800); console.log("parked", JSON.stringify(await rd())); await page.screenshot({ path: "cure/sheet-debug.png" });
} finally { await browser.close(); }
