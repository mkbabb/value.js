// SERVED MODEL: claude-opus-5-5[1m]
// X.KF.W13T.k3 · ESC-k2-1 — bounded live probe of the two owner-moved writes (kf dev :5173, headless chromium).
// 390x844 #/cube: the mobile sheet is born at PEEK (the mount-reset, now emitted to the owner), the dock's
// "Controls panel" toggle opens it; 1440 #/cube: the rail toggles closed/open. 0 pageerrors expected.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch();
for (const [w,h] of [[390,844],[1440,900]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  const errs = []; p.on("pageerror", e => errs.push(String(e).slice(0,120)));
  await p.goto("http://localhost:5173/#/cube", { waitUntil:"networkidle" }); await p.waitForTimeout(900);
  const read = () => p.evaluate(() => { const l = document.querySelector(".controls-layout"); return l ? [...l.classList].find(c=>c.startsWith("controls-layout--")) : null; });
  const s0 = await read();
  const dock = p.locator('[data-dock-tether="top"] .glass-dock').first();
  await dock.hover(); await p.waitForTimeout(900);
  const btn = dock.getByRole("button", { name: "Controls panel" });
  const pressed0 = await btn.getAttribute("aria-pressed");
  await btn.click(); await p.waitForTimeout(700);
  const s1 = await read(); const pressed1 = await btn.getAttribute("aria-pressed");
  console.log(`${w}x${h} layout0=${s0} pressed0=${pressed0} -> layout1=${s1} pressed1=${pressed1} pageerrors=${errs.length} ${JSON.stringify(errs.slice(0,2))}`);
  await p.close();
}
await b.close();
