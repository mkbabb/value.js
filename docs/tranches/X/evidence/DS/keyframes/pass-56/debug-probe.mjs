// X-DS keyframes pass 11 cure seat: why a script focus on 'Preview' did not promote the peek (diagnosis). Headless real Chrome.
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5193/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("console", (m) => console.log("console:", m.text()));
  await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(3500);
  const sample = () => page.evaluate(async () => { const sh = document.querySelector(".controls-drawer-content"); const out = [];
    for (let i = 0; i < 12; i++) { await new Promise((r) => setTimeout(r, 150)); const cs = getComputedStyle(sh); out.push([Math.round(sh.getBoundingClientRect().top), cs.getPropertyValue("--detent-t").trim(), cs.blockSize, sh.getAttribute("style")?.slice(0, 160)]); }
    return out; });
  const focusLast = () => page.evaluate(() => { const p = document.querySelector(".controls-drawer-content .controls-pane"); [...p.querySelectorAll("button, [tabindex='0']")].at(-1).focus(); });
  const geo = () => page.evaluate(() => { const sh = document.querySelector(".controls-drawer-content"); const r = sh.getBoundingClientRect(); return { pos: getComputedStyle(sh).position, top: Math.round(r.top), bottom: Math.round(r.bottom), root: document.scrollingElement.scrollTop, body: document.body.scrollHeight, t: getComputedStyle(sh).getPropertyValue("--detent-t").trim() }; });
  console.log("rest", JSON.stringify(await geo()));
  const grip = page.locator("[data-slot=sheet-detent-handle]"); await grip.focus(); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(1500);
  console.log("grip-open", JSON.stringify(await geo()));
  await page.screenshot({ path: new URL("./after/cube-grip-open-390-light.png", import.meta.url).pathname });
  await page.keyboard.press("ArrowDown"); await page.waitForTimeout(1500); await page.evaluate(() => document.activeElement.blur());
  console.log("grip-park", JSON.stringify(await geo()));
  await focusLast(); await page.waitForTimeout(1500);
  console.log("focus-open", JSON.stringify(await geo()));
} finally { await browser.close(); }
