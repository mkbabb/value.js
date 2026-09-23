import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const scrolled = () => page.evaluate(() => [...document.querySelectorAll("*")].concat([document.scrollingElement]).filter(e => e && (e.scrollTop > 0)).map(e => e.tagName + "." + [...(e.classList||[])].slice(0,3).join(".") + " st=" + e.scrollTop + " ch=" + e.clientHeight + " sh=" + e.scrollHeight + " ov=" + getComputedStyle(e).overflowY));
// user wheel over the panel
await page.mouse.move(270, 500); await page.mouse.wheel(0, 600); await page.waitForTimeout(800);
console.log("after wheel on panel:", await scrolled());
await page.screenshot({ path: OUT + "probe3-wheel-panel.png" });
const info = await page.evaluate(() => {
  const r = e => { const b = e.getBoundingClientRect(); return [b.x,b.y,b.width,b.height].map(Math.round); };
  const kfe = document.querySelector(".keyframes-editor-scroll");
  const pop = [...document.querySelectorAll("*")].find(e => e.children.length < 6 && /Keyframe offsets/.test(e.textContent) && e.textContent.length < 120);
  const chain = []; let e = pop; while (e && chain.length < 8) { const s = getComputedStyle(e); chain.push(e.tagName + "." + [...e.classList].slice(0,4).join(".") + " pos=" + s.position + " z=" + s.zIndex + " " + r(e)); e = e.parentElement; }
  const chip = [...document.querySelectorAll(".keyframes-editor-scroll input, .keyframes-editor-scroll [contenteditable], .keyframes-editor-scroll button")].slice(0,6).map(x => x.tagName + " " + (x.getAttribute("aria-label")||"") + " v=" + (x.value ?? x.textContent).slice(0,12) + " " + r(x) + " r=" + getComputedStyle(x).borderRadius);
  const tags = [...document.querySelectorAll(".derby-lane-tag")].length;
  const panelCards = [...document.querySelectorAll(".controls-pane .card, .controls-pane [class*=card]")].slice(0,6).map(x => x.className.toString().slice(0,60) + " " + r(x));
  const sliders = [...document.querySelectorAll(".labeled-field-grid [role=slider]")].map(x => r(x) + " " + getComputedStyle(x).backgroundColor);
  const rng = [...document.querySelectorAll(".labeled-field-grid [class*=range], .labeled-field-grid [class*=Range]")].slice(0,2).map(x => x.className.toString().slice(0,60) + " bg=" + getComputedStyle(x).backgroundColor);
  return { chain, chip, panelCards, sliders, rng };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
