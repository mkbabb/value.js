// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — KFA-11 / KFA-37 / KFA-188 at 10.0.1: EasingPicker anatomy ([data-slot=easing-picker]; the 7.0.0 data-testid is gone), plot size,
// handle radius, overflow at x=0/1, and the viewBox across a real handle drag above y=1 (per rAF). Headed; writes anatomy-<label>.json + frames.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const base = process.argv[2] ?? "http://localhost:5173"; const label = process.argv[3] ?? "dev"; const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false }); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto(`${base}/#/easing`, { waitUntil: "load" }); await p.waitForTimeout(4500);
const read = () => p.evaluate(() => { const pk = document.querySelector('[data-slot="easing-picker"]'); if (!pk) return null; const pr = pk.getBoundingClientRect();
  const svgs = [...pk.querySelectorAll("svg")].map((s) => { const r = s.getBoundingClientRect(); const cs = getComputedStyle(s); return { slot: s.getAttribute("data-slot") || s.parentElement?.getAttribute("data-slot"), vb: s.getAttribute("viewBox"), rect: [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)), overflow: cs.overflow }; });
  const hs = [...pk.querySelectorAll('[data-slot="easing-handles"] circle, circle[role=slider]')].map((c) => { const r = c.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)), role: c.getAttribute("role") }; });
  return { picker: [pr.x, pr.y, pr.width, pr.height].map((v) => +v.toFixed(1)), gridCols: getComputedStyle(pk).gridTemplateColumns, svgs, handles: hs }; });
const rest = await read(); const out = { label, rest };
if (rest) { const pr = rest.picker; fs.writeFileSync(`${OUT}anatomy-${label}-rest.png`, await p.screenshot({ clip: { x: pr[0] - 8, y: pr[1] - 8, width: pr[2] + 16, height: pr[3] + 16 } }));
  const h = rest.handles.filter((x) => x.role === "slider").at(-1) ?? rest.handles.at(-1);
  if (h) { const cx = h.rect[0] + h.rect[2] / 2, cy = h.rect[1] + h.rect[3] / 2; const plot = rest.svgs[0].rect;
    await p.evaluate(() => { window.__vb = []; const f = () => { const pk = document.querySelector('[data-slot="easing-picker"]'); window.__vb.push([...pk.querySelectorAll("svg")].map((s) => s.getAttribute("viewBox")).join("|")); if (window.__vb.length < 400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
    await p.mouse.move(cx, cy); await p.mouse.down(); for (let i = 1; i <= 24; i++) { await p.mouse.move(cx, cy - i * (plot[3] * 0.5 / 24)); await p.waitForTimeout(16); }
    fs.writeFileSync(`${OUT}anatomy-${label}-drag-above.png`, await p.screenshot({ clip: { x: rest.picker[0] - 8, y: rest.picker[1] - 60, width: rest.picker[2] + 16, height: rest.picker[3] + 76 } }));
    out.duringDrag = await read(); await p.mouse.up(); await p.waitForTimeout(400); out.afterDrag = await read();
    const vbs = await p.evaluate(() => window.__vb); out.distinctViewBoxesDuringDrag = [...new Set(vbs)].slice(0, 12); out.nDistinctViewBoxes = new Set(vbs).size; } }
fs.writeFileSync(`${OUT}anatomy-${label}.json`, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out).slice(0, 2500)); await b.close();
