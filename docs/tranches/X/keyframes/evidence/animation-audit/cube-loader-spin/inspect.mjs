// Inspect CubeTarget's live showLoader prop + CubeScene's hideLoader + store on cold #/cube.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForSelector(".cube", { timeout: 30000 }); await page.waitForTimeout(2500);
console.log(JSON.stringify(await page.evaluate(() => {
  let c = document.querySelector(".cube").__vueParentComponent; const out = [];
  while (c) { const nm = c.type.__name || c.type.name; if (/CubeTarget|CubeScene/.test(nm || "")) out.push({ nm, props: Object.fromEntries(Object.entries(c.props).filter(([k]) => /Loader|isPlaying|isStarted/.test(k))) }); c = c.parent; }
  const s = JSON.parse(localStorage.getItem("animation-groups-control-options-store"));
  let sc = document.querySelector(".cube").__vueParentComponent; while (sc && sc.type.__name !== "CubeScene") sc = sc.parent; const mem = sc.setupState.storedControls; return { out, mem: { sel: mem.selectedAnimation, isRaw: mem === undefined }, lsSel: s.cube.selectedAnimation, dock: [...document.querySelectorAll(".dock-label")].map(e => e.textContent.trim()).slice(0,4) };
}), null, 0));
await browser.close();
