// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.home · the shell around the scene-loading fallback, served (READ-ONLY measurement)
// Rows: UIA-KF-067 (hard-load silhouette) · UIA-KF-068 (in-app switch keeps the shared pane) · UIA-KF-233 (transport live during the fallback)
// Usage: BASE=http://localhost:5271 RUN=before-r1 node shell.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5271"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = (id, bad, msg) => console.log(`${bad ? "RED  " : "GREEN"} ${id} ${msg}`);
const b = await chromium.launch({ headless: false });
const read = (p) => p.evaluate(() => { const box = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return r.width ? [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)) : null; };
  const play = document.querySelector('[data-dock-tether=bottom] [aria-label="Play animation"], [data-dock-tether=bottom] [aria-label="Pause animation"]');
  return { skeleton: box(document.querySelector(".scene-skeleton__plate") || document.querySelector(".scene-skeleton")), pane: box(document.querySelector(".controls-pane-wrapper")),
    stage: box(document.querySelector(".scene-host")), chan: document.querySelector('[aria-label="Select animation"]')?.textContent?.trim() ?? null,
    playEnabled: !!play && !play.disabled && play.getAttribute("aria-disabled") !== "true" }; });
const iou = (a, c) => { if (!a || !c) return 0; const x = Math.max(a[0], c[0]), y = Math.max(a[1], c[1]), r = Math.min(a[0] + a[2], c[0] + c[2]), bt = Math.min(a[1] + a[3], c[1] + c[3]);
  const i = Math.max(0, r - x) * Math.max(0, bt - y); return i / (a[2] * a[3] + c[2] * c[3] - i); };
for (const [w, h, theme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const cfg = `${w}x${h}-${theme}`; const touch = w < 1024;
  // hard load #/amiga with the chunk held (067 · 233)
  let ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: touch, hasTouch: touch });
  let p = await ctx.newPage(); await p.goto(`${BASE}/#/`); await sleep(2500);
  await p.route(/\/scenes\/amiga\//, async (r) => { await sleep(5000); await r.continue().catch(() => {}); });
  await p.goto(`${BASE}/#/amiga`); await p.reload(); await sleep(1500);
  const fb = await read(p); await p.screenshot({ path: `${FR}shell-hardload-fallback-${cfg}.png` });
  for (let k = 0; k < 50 && (await p.locator(".scene-skeleton").count()); k++) await sleep(500); await sleep(1500); const rs = await read(p); await p.screenshot({ path: `${FR}shell-hardload-resolved-${cfg}.png` });
  const amiga = await p.evaluate(() => { const c = document.querySelector(".amiga-canvas") || document.querySelector(".scene-host > *"); const r = c?.getBoundingClientRect(); return r ? [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)) : null; });
  R("UIA-KF-067", iou(fb.skeleton, amiga) < 0.8 || (!fb.pane && !!rs.pane), `${cfg} fallback box ${JSON.stringify(fb.skeleton)} vs resolved stage ${JSON.stringify(amiga)} IoU ${iou(fb.skeleton, amiga).toFixed(2)} · pane during fallback ${!!fb.pane} -> resolved ${!!rs.pane}`);
  R("UIA-KF-233", fb.skeleton && fb.playEnabled, `${cfg} transport Play enabled during the fallback: ${fb.playEnabled} (skeleton shown ${!!fb.skeleton})`);
  await ctx.close();
  // in-app switch cube -> amiga with the chunk cold (068)
  ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: touch, hasTouch: touch });
  p = await ctx.newPage(); await p.goto(`${BASE}/#/cube`); await sleep(3500);
  const before = await read(p);
  await p.route(/\/scenes\/amiga\//, async (r) => { await sleep(5000); await r.continue().catch(() => {}); });
  await p.evaluate(() => { location.hash = "#/amiga"; }); await sleep(1500);
  const mid = await read(p); await p.screenshot({ path: `${FR}shell-switch-fallback-${cfg}.png` });
  R("UIA-KF-068", (!!before.pane && !mid.pane) || (before.chan && !mid.chan), `${cfg} cube pane ${!!before.pane} -> during the amiga fallback ${!!mid.pane} · channel label '${before.chan}' -> '${mid.chan}' · skeleton ${!!mid.skeleton}`);
  await ctx.close();
}
await b.close();
