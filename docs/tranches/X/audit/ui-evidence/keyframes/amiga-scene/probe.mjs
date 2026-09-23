// amiga-scene exploratory probe — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage(); const errs = [];
p.on("pageerror", e => errs.push(String(e))); p.on("console", m => m.type() === "error" && errs.push(m.text()));
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
await p.screenshot({ path: OUT + "probe-1440-light.png" });
console.log(JSON.stringify(await p.evaluate(() => ({
  ctrls: [...document.querySelectorAll("button,[role=combobox],[role=tab],[role=slider],input")].filter(e => e.getBoundingClientRect().width > 0).map(e => { const r = e.getBoundingClientRect(); return `${e.tagName}[${e.getAttribute("role") || ""}] "${(e.getAttribute("aria-label") || e.textContent).trim().slice(0, 40)}" ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} r=${getComputedStyle(e).borderTopLeftRadius}`; }),
  canvas: (() => { const c = document.querySelector(".amiga-canvas"); const r = c?.getBoundingClientRect(); return c && [r.x, r.y, r.width, r.height, getComputedStyle(c).borderRadius]; })(),
  probe: window.__kfAmigaProbe?.pose(),
  html: document.documentElement.className,
})), null, 1));
console.log(errs);
await b.close();
