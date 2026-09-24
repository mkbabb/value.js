// SERVED MODEL: claude-opus-5-5
// KFA-17 (cube leg) / C6-3 / R-x-1 — on the served cube: autoplay → Pause → Reset → read the ribbon playhead
// (aria-valuenow) → Play → read it every 100 ms for 1.5 s. Signature of the defect: a readout frozen at the
// paused value after Reset, then a NEGATIVE / restarting playhead after Play with the nodes unpainted.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto(process.argv[2] || "http://localhost:5173/#/cube"); await p.waitForTimeout(4000);
const slider = () => p.evaluate(() => { const s = document.querySelector('[role="slider"]'); return s ? +(+s.getAttribute("aria-valuenow")).toFixed(1) : null; });
const press = async (label) => { const r = await p.evaluate((l) => { const e = [...document.querySelectorAll(`button[aria-label="${l}"]`)].find((x) => { const b = x.getBoundingClientRect(); return b.width && x.contains(document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)); }); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; }, label); if (!r) return false; await p.mouse.move(r.x, r.y); await p.waitForTimeout(250); await p.mouse.click(r.x, r.y); return true; };
const out = { t0: await slider() };
out.paused = await press("Pause animation"); await p.waitForTimeout(400); out.atPause = await slider();
const resetLabels = await p.evaluate(() => [...document.querySelectorAll("button[aria-label]")].map((e) => e.getAttribute("aria-label")).filter((l) => /reset/i.test(l)));
out.resetLabels = resetLabels;
out.reset = resetLabels.length ? await press(resetLabels[0]) : false; await p.waitForTimeout(400); out.afterReset = await slider();
out.played = await press("Play animation"); const trace = [];
for (let k = 0; k < 15; k++) { await p.waitForTimeout(100); trace.push(await slider()); }
out.trace = trace;
console.log(JSON.stringify(out));
await b.close();
