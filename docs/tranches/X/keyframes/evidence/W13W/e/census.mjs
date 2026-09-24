// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.e (OA-61, KF-W13.md :485-490) — served census of the ball-preview hide/show
// controls per scene: ball previews (AnimationVisualizer .visualizer-stage), eye/eye-off
// buttons (lucide-eye / lucide-eye-off svgs), their labels and boxes.
// Usage: node census.mjs [--base URL] [--w 1440 --h 900] [--theme light|dark] [--frames dir]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://localhost:5173"), W = +arg("w", 1440), H = +arg("h", 900);
const THEME = arg("theme", "light"), FRAMES = arg("frames", null);
if (FRAMES) mkdirSync(FRAMES, { recursive: true });
const SCENES = ["cube", "square", "amiga", "easing", "spring", "sequence"];
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME });
const page = await ctx.newPage();
const out = { viewport: `${W}x${H}`, theme: THEME, scenes: {} };
for (const s of SCENES) {
  await page.goto(`${BASE}/#/${s}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
  out.scenes[s] = await page.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
    const box = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
    const previews = [...document.querySelectorAll(".visualizer-stage")].filter(vis).map(box);
    const eyes = [...document.querySelectorAll("svg.lucide-eye, svg.lucide-eye-off")].map((svg) => {
      const b = svg.closest("button"); return { icon: svg.getAttribute("class").match(/lucide-eye(-off)?/)[0], label: b?.getAttribute("aria-label") ?? b?.textContent.trim(), pressed: b?.getAttribute("aria-pressed"), pos: b ? getComputedStyle(b).position : null, box: b ? box(b) : null, visible: b ? vis(b) : false };
    });
    return { previews, eyes };
  });
  if (FRAMES) await page.screenshot({ path: `${FRAMES}/${W}-${THEME}-${s}.png` });
}
console.log(JSON.stringify(out));
await browser.close();
