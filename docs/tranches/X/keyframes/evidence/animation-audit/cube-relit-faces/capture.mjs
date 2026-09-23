// cube-relit-faces — headed Chromium, real GPU, served page. Frame-by-frame by INPUT STEP
// (the surface is driven by the orbit model, not a clock): each frame = one drag step,
// then a 260ms settle (> the 0.2s --lit transition), screenshot + probe.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { probe } from "./lib.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kfHead = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kfDirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const CLIP = { x: 660, y: 150, width: 600, height: 600 };
const log = { kfHead, kfDirty, when: new Date().toISOString(), phases: {} };
const b = await chromium.launch({ headless: false });
async function fresh() {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  return p;
}
const shot = async (p, dir, i) => { fs.mkdirSync(dir, { recursive: true }); await p.screenshot({ path: `${dir}/f${String(i).padStart(3, "0")}.png`, clip: CLIP }); };
const samplePts = (p) => p.evaluate((clip) => [...document.querySelectorAll(".cube .cube-side")].map((f, i) => {
  const r = f.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
  const hit = document.elementFromPoint(cx, cy)?.closest(".cube-side");
  return hit === f ? [i, Math.round(cx - clip.x), Math.round(cy - clip.y)] : null;
}).filter(Boolean), CLIP);

// PHASE A — fresh load, live playback (transport playing), no input: 24 frames @125ms
{
  const p = await fresh(); const rows = [];
  for (let i = 0; i < 24; i++) { await shot(p, "A-playback", i); rows.push({ i, ...(await p.evaluate(probe)), pts: await samplePts(p) }); await p.waitForTimeout(125); }
  log.phases.A = rows;
  // rAF deltas over 3s of live playback
  log.rafPlayback = await p.evaluate(() => new Promise(r => { const d = []; let t0 = performance.now(), s = t0; const f = t => { d.push(t - t0); t0 = t; if (t - s < 3000) requestAnimationFrame(f); else r({ n: d.length, over20: d.filter(x => x > 20).length, max: Math.max(...d).toFixed(1) }); }; requestAnimationFrame(f); }));
  // TRANSPORT — pause, then scrub; does --lit move with the die?
  await p.getByRole("button", { name: "Pause", exact: true }).first().click(); await p.waitForTimeout(400);
  const T = [];
  T.push({ step: "paused", ...(await p.evaluate(probe)) }); await shot(p, "T-transport", 0);
  const sl = p.getByRole("slider", { name: /Scrub animation timeline/ }).first();
  const sb = await sl.boundingBox().catch(() => null);
  const track = sb ? sb : null;
  log.scrubBB = track;
  if (track) {
    // the scrub control's track is the parent row; drive it with keyboard for determinism
    await sl.focus();
    for (let k = 1; k <= 6; k++) { for (let j = 0; j < 8; j++) await p.keyboard.press("ArrowLeft"); await p.waitForTimeout(350); T.push({ step: `scrub-left-${k}`, aria: await sl.getAttribute("aria-valuenow"), ...(await p.evaluate(probe)) }); await shot(p, "T-transport", k); }
  }
  log.phases.T = T;
  await p.close();
}
// PHASE D — fresh load, howToReach: slow drag-orbit of the die, 48 steps
async function drag(tag, pauseFirst) {
  const p = await fresh();
  if (pauseFirst) { await p.getByRole("button", { name: "Pause", exact: true }).first().click(); await p.waitForTimeout(400); }
  const bb = await p.locator(".cube").boundingBox();
  let x = bb.x + bb.width / 2, y = bb.y + bb.height / 2;
  await p.mouse.move(x, y); await p.mouse.down(); const rows = [];
  for (let i = 0; i < 48; i++) {
    const dx = i < 24 ? 7 : 0, dy = i < 24 ? 0 : 6;
    for (let s = 0; s < 3; s++) { x += dx / 3; y += dy / 3; await p.mouse.move(x, y); await p.waitForTimeout(16); }
    await p.waitForTimeout(260);
    await shot(p, tag, i); rows.push({ i, ...(await p.evaluate(probe)), pts: await samplePts(p) });
  }
  await p.mouse.up();
  log.phases[tag] = rows;
  // live continuous drag: rAF deltas + lit update cadence
  const bb2 = await p.locator(".cube").boundingBox(); x = bb2.x + bb2.width / 2; y = bb2.y + bb2.height / 2;
  await p.evaluate(() => { window.__d = []; window.__lits = []; let t0 = performance.now(), s = t0; const f = t => { window.__d.push(t - t0); t0 = t; window.__lits.push(document.querySelector(".cube .cube-side").style.getPropertyValue("--lit")); if (t - s < 3000) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.mouse.move(x, y); await p.mouse.down();
  for (let i = 0; i < 170; i++) { x += 2; await p.mouse.move(x, y); await p.waitForTimeout(16); }
  await p.mouse.up(); await p.waitForTimeout(400);
  log[`raf_${tag}`] = await p.evaluate(() => ({ n: __d.length, over20: __d.filter(x => x > 20).length, max: Math.max(...__d).toFixed(1), litDistinct: new Set(__lits).size }));
  await p.close();
}
await drag("D-drag-playing", false);
await drag("P-drag-paused", true);
await b.close();
fs.writeFileSync("capture-log.json", JSON.stringify(log));
console.log("done", kfHead, kfDirty);
