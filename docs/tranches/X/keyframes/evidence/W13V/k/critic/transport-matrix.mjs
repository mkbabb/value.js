// SERVED MODEL: claude-opus-5-5
// G-W13V-k3 · the critic's 6-scene × {Play, Pause, Reset, Reverse, scrub} transport matrix — one frame per
// cell (headed, 1440x900, the served dev page). Reads the ribbon playhead ([role=slider] aria-valuenow)
// (the playhead = the transport's scrub slider: [role=slider][aria-label*=crub]) before/after each verb and the Pause/Play face, and judges each cell against the verb's contract:
//   Play → the playhead advances over 400 ms; Pause → it holds over 400 ms; Reset → it reads ≤ 1 % of the
//   pre-reset value (the rewind) BEFORE any Play; Reverse → aria-pressed flips and, playing, the playhead
//   moves backward; scrub → ArrowRight on the focused slider changes the value while paused.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL("./matrix/", import.meta.url).pathname;
const SCENES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const b = await chromium.launch({ headless: false });
const rows = [];
for (const scene of SCENES) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto(`http://localhost:5173/#/${scene}`); await p.waitForTimeout(3500);
  const val = () => p.evaluate(() => { const s = [...document.querySelectorAll('[role="slider"][aria-label*="crub"]')].find((e) => e.offsetParent); return s ? +(+s.getAttribute("aria-valuenow")).toFixed(1) : null; });
  const hit = (sel) => p.evaluate((sel) => { const e = [...document.querySelectorAll(sel)].find((x) => { const r = x.getBoundingClientRect(); return r.width && x.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); }); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, sel);
  const press = async (sel) => { const r = await hit(sel); if (!r) return false; await p.mouse.move(r.x, r.y); await p.waitForTimeout(200); await p.mouse.click(r.x, r.y); return true; };
  const shot = (verb) => p.screenshot({ path: `${OUT}${scene}-${verb}.png` });
  const cell = {};
  // Ensure paused first (autoplaying scenes).
  if (await hit('button[aria-label="Pause animation"]')) { await press('button[aria-label="Pause animation"]'); await p.waitForTimeout(300); }
  // Play
  let a = await val(); cell.Play = { pressed: await press('button[aria-label="Play animation"]') };
  await p.waitForTimeout(400); let v1 = await val(); await p.waitForTimeout(400); let v2 = await val();
  Object.assign(cell.Play, { from: a, to: [v1, v2], pass: v1 !== null && v2 !== null && v2 !== v1 }); await shot("play");
  // Reverse (while playing)
  const revSel = 'button[aria-pressed]:has(span)';
  const revHit = await p.evaluate(() => { const e = [...document.querySelectorAll("button[aria-pressed]")].find((x) => /reverse/i.test(x.textContent) && x.offsetParent); return !!e; });
  if (revHit) { const r0 = await val(); await p.evaluate(() => [...document.querySelectorAll("button[aria-pressed]")].find((x) => /reverse/i.test(x.textContent) && x.offsetParent).click()); await p.waitForTimeout(300); const r1 = await val(); await p.waitForTimeout(300); const r2 = await val(); const pressed = await p.evaluate(() => [...document.querySelectorAll("button[aria-pressed]")].find((x) => /reverse/i.test(x.textContent) && x.offsetParent).getAttribute("aria-pressed")); cell.Reverse = { pressed, trace: [r0, r1, r2], pass: pressed === "true" && r2 < r1 }; await p.evaluate(() => [...document.querySelectorAll("button[aria-pressed]")].find((x) => /reverse/i.test(x.textContent) && x.offsetParent).click()); }
  else cell.Reverse = { pass: null, note: "no Reverse control on the surface in view (controls pane closed)" };
  await shot("reverse");
  // Pause
  cell.Pause = { pressed: await press('button[aria-label="Pause animation"]') }; await p.waitForTimeout(200);
  v1 = await val(); await p.waitForTimeout(400); v2 = await val(); Object.assign(cell.Pause, { hold: [v1, v2], pass: v1 !== null && v1 === v2 }); await shot("pause");
  // scrub (paused)
  const sl = await hit('[role="slider"][aria-label*="crub"]');
  if (sl) { const s0 = await val(); await p.evaluate(() => [...document.querySelectorAll('[role="slider"][aria-label*="crub"]')].find((e) => e.offsetParent).focus()); for (let k = 0; k < 5; k++) await p.keyboard.press("ArrowRight"); await p.waitForTimeout(300); const s1 = await val(); cell.scrub = { from: s0, to: s1, pass: s1 !== s0 }; }
  else cell.scrub = { pass: null, note: "no slider hit-testable" };
  await shot("scrub");
  // Reset (paused)
  const pre = await val(); cell.Reset = { pressed: await press('button[aria-label="Reset animation"]') }; await p.waitForTimeout(500); const post = await val();
  Object.assign(cell.Reset, { from: pre, to: post, pass: post !== null && pre !== null && Math.abs(post) <= Math.max(1, Math.abs(pre) * 0.01) }); await shot("reset");
  rows.push({ scene, ...cell }); await p.close();
}
for (const r of rows) console.log(JSON.stringify(r));
await b.close();
