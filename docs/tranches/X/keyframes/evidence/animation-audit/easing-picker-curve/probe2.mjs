import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const g = await p.evaluate(() => {
  const r = (e) => { if(!e) return null; const b=e.getBoundingClientRect(); return [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)]; };
  const pk = document.querySelector("[data-testid=easing-picker]");
  const svg = pk.querySelector("svg");
  const cs = getComputedStyle(pk);
  const hs = [...svg.querySelectorAll("circle[role=slider]")];
  return { picker: r(pk), cols: cs.gridTemplateColumns, svg: r(svg), svgParent: r(svg.parentElement), viewBox: svg.getAttribute("viewBox"), handles: hs.map(r), card: r(pk.closest("[class*=card]")||pk.parentElement.parentElement), host: r(pk.parentElement), hostCT: getComputedStyle(pk.parentElement).containerType, mm: matchMedia("(min-width:1024px)").matches, dot: !!pk.querySelector("[data-testid=easing-travel-dot]"), pb: !!pk.querySelector("[data-testid=easing-playback]"), state: pk.dataset.playbackState, anims: document.getAnimations().length };
});
console.log(JSON.stringify(g));
await p.locator("[data-testid=easing-picker]").screenshot({ path: "probe-01-picker.png" });
await b.close();
