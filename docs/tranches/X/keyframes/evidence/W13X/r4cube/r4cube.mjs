// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4cube · served predicates for the R-4 cube row.
//   KFA-131 — the playing class (and so the compositor promotion `.idle-hover.playing .cube { will-change: transform }`)
//             tracks the machine's playback: present while playing (home landing + /cube), absent once paused.
//   MATRIX-PAUSED-EDIT-UNPAINTED — with the transport paused and the Matrix channel selected, a cell edit and a
//             Reset must move the die (`.cube-pose` transform, >1 distinct pose over the tween), and must not resume.
// Usage: BASE=http://localhost:5493 RUN=before-r1 THEME=light node r4cube.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import os from "node:os";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run"; const THEME = process.env.THEME || "light";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5493";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loadStart = os.loadavg()[0].toFixed(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: THEME });
await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__m")) { localStorage.clear(); sessionStorage.setItem("__m", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, THEME);
const p = await ctx.newPage();
const errors = []; p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
const promo = () => p.evaluate(() => {
  const roll = [...document.querySelectorAll(".idle-hover")].find((e) => e.getBoundingClientRect().width > 0);
  const cube = roll?.querySelector(".cube");
  return { playingClass: !!roll?.classList.contains("playing"), willChange: cube ? getComputedStyle(cube).willChange : null };
});
const transport = () => p.evaluate(() => [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0 && /^(Pause|Play)/i.test((e.getAttribute("aria-label") || e.textContent).trim())).map((e) => (e.getAttribute("aria-label") || e.textContent).trim()));
// The transport dock idle-collapses (its controls are present but not Playwright-visible until engaged): drive by keyboard,
// the path the dock's focusin expansion serves.
const press = async (sel, band = "bottom") => {
  await p.hover(`[data-dock-tether="${band}"] .glass-dock`); await sleep(1200);
  await p.locator(sel).first().click({ timeout: 20000 });
};
const rec = { run: RUN, theme: THEME, loadStart };
// --- KFA-131 · home landing (autoplay)
await p.goto(`${BASE}/#/`, { timeout: 120000 }); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await sleep(3000);
rec.homePlaying = { ...(await promo()), transport: await transport() };
// r4cube resumed seat (2026-10-13): Home never PLAYs the group (useSceneMachineShellBinding `!isHome`), so the die rests there.
// The row's law is "the class tracks playback": at Home the die is still AND the class is absent (no resident layer, G5).
rec.homePoses = await p.evaluate(() => new Promise((res) => { const s = new Set(); const t0 = performance.now(); const q = (c) => getComputedStyle(document.querySelector(c)).transform;
  const f = () => { s.add([q(".cube"), q(".cube-bob"), q(".cube-pose")].join("|")); if (performance.now() - t0 < 1000) requestAnimationFrame(f); else res(s.size); }; requestAnimationFrame(f); }));
await p.screenshot({ path: `${FR}home-1440-${THEME}.png` });
// --- /cube autoplay, then pause, then play
await p.goto(`${BASE}/#/cube`, { timeout: 120000 }); await p.reload({ timeout: 120000 }); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await sleep(3000);
rec.cubePlaying = { ...(await promo()), transport: await transport() };
await p.screenshot({ path: `${FR}cube-playing-1440-${THEME}.png` });
// --- select the Matrix channel and open its controls
await press('[role=combobox][aria-label="Channel to edit"]'); await sleep(900);
await p.getByRole("option", { name: /^Matrix/ }).first().click(); await sleep(1200);
await press('[data-dock-surface-item][data-surface="matrix-controls"]', "top"); await sleep(1800);
await press("button[aria-label='Pause animation']"); await sleep(900);
rec.cubePaused = { ...(await promo()), transport: await transport() };
const trace = (ms) => p.evaluate((ms) => new Promise((res) => {
  const out = []; const t0 = performance.now();
  const f = () => { out.push(getComputedStyle(document.querySelector(".cube-pose")).transform); if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(out); };
  requestAnimationFrame(f); }), ms);
const editCell = (v) => p.evaluate((v) => { const i = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0).children[0].querySelector("input"); i.focus(); i.value = v; i.dispatchEvent(new Event("input", { bubbles: true })); i.blur(); }, v);
// resumed seat: the Reset is the section header's icon button (X.KF.W13X.sections) — named by aria-label, no text. The old text finder clicked nothing.
const reset = () => p.evaluate(() => { const b = [...document.querySelectorAll("button[aria-label='Reset matrix']")].find((e) => e.getBoundingClientRect().width > 0); b?.click(); return !!b; });
const leg = async (name, act) => {
  const tp = trace(1200); await sleep(60); const acted = await act(); const tr = await tp;
  return { acted, leg: name, samples: tr.length, distinctPoses: new Set(tr).size, first: tr[0], last: tr[tr.length - 1], transport: await transport() };
};
await p.screenshot({ path: `${FR}cube-paused-before-edit-1440-${THEME}.png` });
rec.cellPaused = await leg("cell-paused", () => editCell("1.5"));
await p.screenshot({ path: `${FR}cube-paused-after-edit-1440-${THEME}.png` });
rec.resetPaused = await leg("reset-paused", reset);
await p.screenshot({ path: `${FR}cube-paused-after-reset-1440-${THEME}.png` });
// resumed seat: resume by KEYBOARD on the live (non-inert) Play mirror. A pointer click after the dock's 3600 ms idle-collapse can land
// on a face that swaps under the pointer (TD-21: not a click on either) — a transport matter read by resume-diag.mjs, not this row's.
await p.hover('[data-dock-tether="bottom"] .glass-dock'); await sleep(1200);
{ const h = await p.evaluateHandle(() => [...document.querySelectorAll("button[aria-label='Play animation']")].find((e) => !e.closest("[inert]") && e.getBoundingClientRect().width > 0)); await h.asElement().focus(); await p.keyboard.press("Enter"); }
await sleep(2500);
rec.cubeResumed = { ...(await promo()), transport: await transport() };
rec.errors = errors; rec.loadEnd = os.loadavg()[0].toFixed(2);
await b.close();
const pred = {
  "KFA-131 home at rest: die still, no class, no resident layer": rec.homePoses === 1 && !rec.homePlaying.playingClass && rec.homePlaying.willChange === "auto",
  "KFA-131 /cube playing class + will-change": rec.cubePlaying.playingClass && rec.cubePlaying.willChange === "transform",
  "KFA-131 paused drops the class": !rec.cubePaused.playingClass,
  "KFA-131 resumed restores the class": rec.cubeResumed.playingClass && rec.cubeResumed.willChange === "transform",
  "MPEU cell edit paints while paused": rec.cellPaused.distinctPoses > 1 && rec.cellPaused.first !== rec.cellPaused.last,
  "MPEU reset paints while paused": rec.resetPaused.acted === true && rec.resetPaused.distinctPoses > 1,
  "MPEU edit does not resume": rec.cellPaused.transport.includes("Play animation") && rec.resetPaused.transport.includes("Play animation"),
  "no page errors": errors.length === 0,
};
rec.predicates = pred;
fs.writeFileSync(`${OUT}${RUN}-${THEME}.json`, JSON.stringify(rec, null, 1));
for (const [k, v] of Object.entries(pred)) console.log(`${v ? "GREEN" : "RED  "} ${k}`);
console.log(JSON.stringify({ home: rec.homePlaying, cube: rec.cubePlaying, paused: rec.cubePaused, cell: { d: rec.cellPaused.distinctPoses, t: rec.cellPaused.transport }, reset: { d: rec.resetPaused.distinctPoses }, resumed: rec.cubeResumed, errors, loadStart, loadEnd: rec.loadEnd }));
