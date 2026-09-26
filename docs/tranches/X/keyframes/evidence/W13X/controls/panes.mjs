// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.controls · the pane-switch predicates (READ-ONLY falsifier)
// Rows: KFA-117 (first Keyframes switch: long frame + blank pane) · KFA-118 (auto-show scroll offset) · KFA-119 (first Timeline switch: blank frames).
// Usage: BASE=http://localhost:5236 RUN=before-r1 node panes.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5236";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = []; const b = await chromium.launch({ headless: false });
const REC = () => { window.__rec = (ms) => new Promise((res) => { const out = []; const t0 = performance.now(); let last = t0;
  const f = (t) => { // the painted content of the visible controls host's scroller: its visible, non-inactive children (tabpanels and the timeline's in-place slot)
    const host = [...document.querySelectorAll(".controls-surface")].find((h) => h.getBoundingClientRect().width > 0 && getComputedStyle(h).visibility !== "hidden");
    const sc = host && [...host.querySelectorAll("div")].find((d) => getComputedStyle(d).overflowY === "auto");
    const kids = sc ? [...sc.children].filter((k) => !k.classList.contains("inactive")) : [];
    const content = kids.reduce((a, k) => a + k.getBoundingClientRect().height, 0);
    const pane = document.querySelector(".controls-pane"); out.push({ t: t - t0, dt: t - last, content, scrollLeft: pane ? pane.scrollLeft : 0 }); last = t;
    if (t - t0 < ms) requestAnimationFrame(f); else res(out); }; requestAnimationFrame(f); }); };
for (const theme of ["light"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme }); const p = await ctx.newPage();
  // Probe note: the top dock rests collapsed at 1440 — a surface click lands only after "Expand dock"
  // (a first draft clicked the collapsed dock and never switched; those runs were discarded).
  const fresh = async () => { await p.goto(`${BASE}/#/cube`); await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await sleep(3500); await p.evaluate(REC);
    const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click(); await sleep(900); } };
  const item = (l) => p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${l}"]`).first();
  const row = { theme };
  try {
    // KFA-117 — the first Keyframes switch, before the idle warm has run (1.2 s after load)
    await fresh(); let rec = p.evaluate(() => window.__rec(1200)); await item("Keyframes").click(); let fr = await rec;
    row.k117_switched = (await item("Keyframes").getAttribute("aria-pressed")) === "true";
    row.k117_maxGapMs = Math.round(Math.max(...fr.map((f) => f.dt))); row.k117_blankFrames = fr.filter((f) => f.content < 40).length;
    // KFA-119 — the first Timeline switch
    await fresh(); rec = p.evaluate(() => window.__rec(1200)); await item("Timeline").click(); fr = await rec;
    row.k119_switched = (await item("Timeline").getAttribute("aria-pressed")) === "true";
    row.k119_blankFrames = fr.filter((f) => f.content < 40).length; row.k119_maxGapMs = Math.round(Math.max(...fr.map((f) => f.dt)));
    // KFA-118 — rail closed, then '2' auto-shows it on Keyframes
    await fresh(); await item("Controls").click(); await sleep(900); row.k118_railClosed = (await item("Controls").getAttribute("aria-pressed")) !== "true";
    rec = p.evaluate(() => window.__rec(900)); await p.keyboard.press("2"); fr = await rec;
    row.k118_maxScrollLeft = Math.round(Math.max(...fr.map((f) => f.scrollLeft)));
  } catch (e) { row.error = String(e.message || e).slice(0, 200); }
  rows.push(row); console.log(JSON.stringify(row)); await ctx.close();
}
await b.close(); fs.writeFileSync(`${OUT}panes-${RUN}.json`, JSON.stringify(rows, null, 1));
