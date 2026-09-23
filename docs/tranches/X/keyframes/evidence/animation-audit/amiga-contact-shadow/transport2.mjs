// Transport wiring check #2: select each channel in the dock, pause, scrub; does the ball/shadow move?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
console.log("stamp", kf("rev-parse --short HEAD"), kf("status --porcelain | wc -l"));
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/amiga");
await p.waitForFunction(() => !!window.__kfAmigaProbe, null, { timeout: 20000 });
await p.waitForTimeout(2500);
await p.locator("button[aria-label='Select animation']").first().click();
await p.waitForTimeout(500);
const opts = await p.locator("[role=option],[role=menuitem],[role=menuitemradio]").allTextContents();
console.log("options", JSON.stringify(opts));
const res = [];
const pick = opts.find((o) => /Bouncing X/i.test(o));
if (pick) { await p.getByText(pick.trim(), { exact: false }).last().click(); await p.waitForTimeout(500); }
else await p.keyboard.press("Escape");
await p.screenshot({ path: OUT + "transport/x-after-select.png" });
console.log(await p.evaluate(() => [...document.querySelectorAll("button")].filter(e=>e.getBoundingClientRect().width>0).map(e => (e.getAttribute("aria-label")||"")+"|"+(e.textContent||"").trim().slice(0,20)).join(" ; ")));
const sel = await p.locator("button[aria-label='Select animation']").first().textContent();
// NB: choosing a channel in the dock's select STARTS playback (observed: button flips to Pause).
await p.waitForTimeout(1200);
await p.locator("button[aria-label*='ause']").first().click();
await p.waitForTimeout(400);
const scrubEl = p.locator("[aria-label='Scrub animation timeline']").first();
const tr = await scrubEl.evaluate((e) => { let n = e; for (let k=0;k<5;k++){ n = n.parentElement; const r=n.getBoundingClientRect(); if (r.width>200) return [r.x,r.y,r.width,r.height]; } return null; });
for (const frac of [0.1, 0.3, 0.5, 0.7, 0.9]) {
  await p.mouse.click(tr[0] + tr[2] * frac, tr[1] + tr[3] / 2);
  await p.waitForTimeout(400);
  const q = await p.evaluate(() => window.__kfAmigaProbe.pose());
  const now = await scrubEl.getAttribute("aria-valuenow");
  await p.screenshot({ path: OUT + `transport/x-scrub-${frac}.png` });
  res.push({ frac, now, px: +q.px.toFixed(3), py: +q.py.toFixed(3), spin: +q.spin.toFixed(3), playing: q.playing });
}
console.log("selected", sel, JSON.stringify(res));
fs.writeFileSync(OUT + "transport/x-scrub.json", JSON.stringify({ selected: sel, options: opts, res }, null, 1));
await b.close();
