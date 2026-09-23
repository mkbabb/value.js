// timeline-panel — probe: fresh load #/cube, enumerate controls-pane / tab affordances.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() };
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(5000);
prov.renderer = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); });
const info = await page.evaluate(() => {
  const els = [...document.querySelectorAll("button,[role=combobox],[role=tab],select,[role=option]")].filter(b => b.getBoundingClientRect().width > 0);
  return { els: els.map(b => { const r = b.getBoundingClientRect(); return `${b.tagName}|${b.getAttribute("role")||""}|${b.getAttribute("aria-label")||""}|${(b.innerText||"").trim().slice(0,30)}|${[r.x,r.y,r.width,r.height].map(Math.round)}`; }),
    target: !!document.querySelector("#timeline-expanded-target"), tl: !!document.querySelector(".timeline-track") };
});
await page.screenshot({ path: OUT + "probe-rest.png" });
console.log(JSON.stringify({ prov, info }, null, 1));
await browser.close();
