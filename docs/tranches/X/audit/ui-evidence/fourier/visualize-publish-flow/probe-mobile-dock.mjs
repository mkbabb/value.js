// Probe: which controls of the top canvas dock are reachable at 390x844 when expanded (read-only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const st = JSON.parse(readFileSync(OUT + "state.json", "utf8"));
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const res = {};
for (const [vp, size] of [["m", { width: 390, height: 844 }], ["d", { width: 1440, height: 900 }]]) {
  const ctx = await b.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100/w/" + st.ws, { waitUntil: "networkidle" }); await p.waitForTimeout(6000);
  if (vp === "m") { await p.getByRole("tab", { name: /canvas/i }).first().tap(); await p.waitForTimeout(600); await p.locator(".controls-dock-anchor [aria-label='Expand dock']").first().tap(); }
  else await p.locator(".controls-dock-anchor .glass-dock").first().hover();
  await p.waitForTimeout(1500);
  res[vp] = await p.evaluate(() => { const d = document.querySelector(".controls-dock-anchor .glass-dock"); const dr = d.getBoundingClientRect();
    return { dock: [dr.x, dr.width].map(Math.round), cs: getComputedStyle(d).overflow, ctrls: [...d.querySelectorAll("button,[role=separator]")].map((e) => { const r = e.getBoundingClientRect(); let a = e, clip = null; while (a && a !== d.parentElement) { const o = getComputedStyle(a).overflow; if (o !== "visible") { const ar = a.getBoundingClientRect(); if (r.right > ar.right + 1 || r.x < ar.x - 1) clip = a.className.toString().slice(0, 50); } a = a.parentElement; }
      return { l: e.getAttribute("aria-label") || e.getAttribute("role"), x: Math.round(r.x), w: Math.round(r.width), vis: getComputedStyle(e).visibility, clippedBy: clip }; }) }; });
  await p.screenshot({ path: OUT + `probe-${vp}-dock-expanded.png`, clip: { x: 0, y: 0, width: size.width, height: 260 } });
  await ctx.close();
}
writeFileSync(OUT + "probe-mobile-dock.json", JSON.stringify(res, null, 1)); await b.close(); console.log(JSON.stringify(res));
