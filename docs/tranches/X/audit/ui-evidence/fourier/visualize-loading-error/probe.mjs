// Probe: undelayed upload on mobile → how long does the Progress persist; mobile tab after upload; speed readout overflow.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
for (const [vp, size] of [["m", { width: 390, height: 844 }], ["d", { width: 1440, height: 900 }]]) {
  const ctx = await b.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m", colorScheme: "light" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100/visualize", { waitUntil: "networkidle" });
  const t0 = Date.now();
  await p.locator("[data-testid=image-file-input]").setInputFiles("/Users/mkbabb/Programming/fourier-analysis/assets/animals/golden-retriever.webp");
  let seen = [];
  for (let i = 0; i < 40; i++) { await p.waitForTimeout(500);
    const s = await p.evaluate(() => ({ prog: !!document.querySelector("[role=progressbar]"), tab: [...document.querySelectorAll("[role=tab][aria-selected=true],[aria-pressed=true]")].map(e=>e.textContent.trim()).join("|"), url: location.pathname }));
    seen.push(`${Date.now() - t0}ms prog=${s.prog} tab=${s.tab}`); if (i > 4 && !s.prog) break; }
  console.log(vp, seen.slice(0, 3).join(" ; "), "...", seen.slice(-2).join(" ; "));
  const spd = await p.evaluate(() => { const els = [...document.querySelectorAll(".controls-overlay *")].filter(e => /^\s*(1|×)\s*$/.test(e.textContent) && e.children.length === 0);
    const dock = document.querySelector(".controls-overlay"); const dr = dock?.firstElementChild?.getBoundingClientRect();
    return { dock: dr && [Math.round(dr.x), Math.round(dr.width)], els: els.map(e => { const r = e.getBoundingClientRect(); return e.tagName + "." + e.className.toString().slice(0, 50) + " '" + e.textContent.trim() + "' x" + Math.round(r.x) + " w" + Math.round(r.width); }) }; });
  console.log(vp, "speed", JSON.stringify(spd));
  if (vp === "d") await p.screenshot({ path: OUT + "d-light-P1-speed-readout.png", clip: { x: 420, y: 780, width: 400, height: 100 } });
  if (vp === "m") { await p.screenshot({ path: OUT + "m-light-P1-after-upload.png" }); }
  await ctx.close();
}
await b.close();
