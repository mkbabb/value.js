// rAF-delta attribution: 3 s of live playback around each real open (t=0 at click) and
// Escape close (t≈1500), pointer resting; 3 fresh-page reps per overlay.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const k = () => `${execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim()} dirty=${execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim()}`;
const b = await chromium.launch({ headless: false });
// KF.W13R.v adaptation (recorded): share-popover + shortcuts-modal are no longer dock triggers at kf d54a6ab8 (OA-33 folded them into the @mbabb menu), so the 10.0.1 read keeps the three dock-trigger overlays.
const T = { "scene-select": '[aria-label="Scene"][role=combobox]', "mbabb-menu": '[aria-label="@mbabb menu"]', "controls-select": '[aria-label="Controls tab"]' };
const res = {};
for (const [name, sel] of Object.entries(T)) {
  res[name] = [];
  for (let rep = 0; rep < 3; rep++) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await p.goto("http://localhost:5173/" + (name === "controls-select" ? "#/cube" : ""), { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.mouse.move(720, 71); await p.waitForTimeout(1300);
    await p.evaluate(() => { window.__d = []; let last = performance.now(); const f = (t) => { window.__d.push([t, t - last]); last = t; if (window.__d.length < 240) requestAnimationFrame(f); }; requestAnimationFrame(f); });
    await p.waitForTimeout(300);
    const tClick = await p.evaluate(() => performance.now());
    await p.locator(sel).click();
    await p.waitForTimeout(1500);
    const tEsc = await p.evaluate(() => performance.now());
    await p.keyboard.press("Escape");
    await p.waitForTimeout(1500);
    const d = await p.evaluate(() => window.__d);
    const drops = d.filter(([, dt]) => dt > 20).map(([t, dt]) => ({ at: +(t - tClick).toFixed(0), dt: +dt.toFixed(1) }));
    res[name].push({ k: k(), n: d.length, escAt: +(tEsc - tClick).toFixed(0), drops });
    await p.close();
  }
}
await b.close();
fs.writeFileSync(new URL("./live-raf.json", import.meta.url).pathname, JSON.stringify(res, null, 1));
for (const [n, r] of Object.entries(res)) console.log(n, JSON.stringify(r.map((x) => [x.k, x.escAt, x.drops])));
