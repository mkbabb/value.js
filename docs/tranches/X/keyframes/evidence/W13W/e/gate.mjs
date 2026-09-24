// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.e (OA-61) — served gate: per scene carrying the ball preview, the ONE eye
// toggle (a) is absolutely positioned at the preview's top-right, (b) toggling
// hide -> show moves every OTHER visible element's box by 0 px (rect diff over all
// visible elements outside the preview body + the eye; the LAYOUT box — offsetLeft/
// Top/Width/Height + offsetParent — so the living dock icons' own transform loops,
// which move at idle, are not read as flow), (c) animates: per-frame samples of the
// body's opacity/scale over the fade hold intermediate values (0 < o < 1, s != 1)
// unless PRM, where the first frame already reads the end state (instant).
// Usage: node gate.mjs [--base URL] [--w 1440 --h 900] [--theme light|dark] [--prm] [--frames dir]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://localhost:5173"), W = +arg("w", 1440), H = +arg("h", 900);
const THEME = arg("theme", "light"), FRAMES = arg("frames", null), PRM = process.argv.includes("--prm");
if (FRAMES) mkdirSync(FRAMES, { recursive: true });
const SCENES = ["cube", "square", "amiga", "easing", "spring", "sequence"];
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME, reducedMotion: PRM ? "reduce" : "no-preference" });
const page = await ctx.newPage();
const RECTS = () => {
  const skip = [...document.querySelectorAll(".preview-toggle__body, .preview-toggle__eye")];
  const out = {};
  const all = [...document.querySelectorAll("body *")];
  all.forEach((e, i) => {
    if (!(e instanceof HTMLElement) || skip.some((s) => s.contains(e))) return;
    if (e.offsetWidth === 0 && e.offsetHeight === 0) return;
    out[i] = [e.offsetLeft, e.offsetTop, e.offsetWidth, e.offsetHeight, all.indexOf(e.offsetParent)];
  });
  return out;
};
let DRIFT = [];
const diff = (a0, b0) => { const a = { ...a0 }, b = { ...b0 }; for (const k of DRIFT) { delete a[k]; delete b[k]; } let moved = 0, max = 0; for (const k of Object.keys(a)) { if (!b[k]) { moved++; continue; } for (let j = 0; j < 4; j++) { const d = Math.abs(a[k][j] - b[k][j]); if (d > 0) { max = Math.max(max, d); } } if (a[k].some((v, j) => v !== b[k][j])) moved++; } for (const k of Object.keys(b)) if (!a[k]) moved++; return { moved, maxPx: Math.round(max * 100) / 100 }; };
const out = { viewport: `${W}x${H}`, theme: THEME, prm: PRM, scenes: {} };
for (const s of SCENES) {
  await page.goto(`${BASE}/#/${s}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
  const eye = page.locator('button[aria-label="Hide ball preview"]').first();
  const n = await page.locator('button[aria-label="Hide ball preview"]').count();
  const previews = await page.locator(".visualizer-stage").count();
  if (!n) { out.scenes[s] = { eyes: 0, previews }; continue; }
  if (!(await eye.isVisible())) { out.scenes[s] = { eyes: n, previews, eyeVisible: false }; continue; }
  const place = await page.evaluate(() => {
    const b = document.querySelector(".preview-toggle__eye"), root = b.closest(".preview-toggle");
    const rb = b.getBoundingClientRect(), rr = root.getBoundingClientRect();
    return { position: getComputedStyle(b).position, dTop: Math.round((rb.top - rr.top) * 100) / 100, dRight: Math.round((rr.right - rb.right) * 100) / 100 };
  });
  // Idle drift: elements whose layout box moves with NO toggle (the playing
  // scene's scrub-rail range + thumb) are named and excluded from the diff.
  const idle0 = await page.evaluate(RECTS); await page.waitForTimeout(1000);
  const before = await page.evaluate(RECTS);
  const drift = Object.keys(idle0).filter((k) => !before[k] || idle0[k].join() !== before[k].join());
  const driftNames = await page.evaluate((ks) => { const all = [...document.querySelectorAll("body *")]; return ks.map((k) => (all[+k].className?.toString() ?? all[+k].tagName).split(" ")[0]); }, drift);
  DRIFT = drift;
  if (FRAMES) await page.screenshot({ path: `${FRAMES}/${W}-${THEME}${PRM ? "-prm" : ""}-${s}-shown.png` });
  await eye.hover(); await page.waitForTimeout(400);
  const hovered = await page.evaluate(RECTS);
  const hoverMove = diff(before, hovered);
  const SAMPLE = () => new Promise((res) => { const b = document.querySelector(".preview-toggle__body"); const xs = []; const t0 = performance.now(); document.querySelector(".preview-toggle__eye").click(); const tick = () => { const cs = getComputedStyle(b); const m = cs.transform === "none" ? 1 : new DOMMatrix(cs.transform).a; xs.push([Math.round((performance.now() - t0)), +(+cs.opacity).toFixed(3), +m.toFixed(3)]); if (performance.now() - t0 < 600) requestAnimationFrame(tick); else res(xs); }; requestAnimationFrame(tick); });
  const frames = await page.evaluate(`(${SAMPLE})()`);
  const inter = frames.filter(([, o, sc]) => (o > 0 && o < 1) || (sc !== 1 && sc !== 0.9)).length;
  const mid = { frames: frames.length, intermediate: inter, first: frames[0], last: frames.at(-1) };
  await page.waitForTimeout(400);
  const hidden = await page.evaluate(RECTS);
  const hiddenBody = await page.evaluate(() => { const b = document.querySelector(".preview-toggle__body"); const cs = getComputedStyle(b); return { opacity: +cs.opacity, visibility: cs.visibility, pressed: document.querySelector(".preview-toggle__eye").getAttribute("aria-pressed") }; });
  if (FRAMES) await page.screenshot({ path: `${FRAMES}/${W}-${THEME}${PRM ? "-prm" : ""}-${s}-hidden.png` });
  const showFrames = await page.evaluate(`(${SAMPLE})()`);
  mid.showIntermediate = showFrames.filter(([, o, sc]) => (o > 0 && o < 1) || (sc !== 1 && sc !== 0.9)).length;
  await page.waitForTimeout(400);
  const after = await page.evaluate(RECTS);
  out.scenes[s] = { eyes: n, previews, place, idleDrift: driftNames, hoverMove, mid, hiddenBody, hide: diff(before, hidden), show: diff(hidden, after), roundTrip: diff(before, after), elements: Object.keys(before).length };
}
console.log(JSON.stringify(out));
await browser.close();
