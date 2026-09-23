import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const D = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs = [];
p.on("console", (m) => logs.push(m.type() + ": " + m.text()));
await p.goto("http://localhost:5173/#/amiga");
await p.waitForTimeout(4000);
await p.screenshot({ path: D + "reach-full.png" });
const info = await p.evaluate(() => {
  const c = document.querySelector("canvas.amiga-canvas");
  const r = c?.getBoundingClientRect();
  const gl = c?.getContext("webgl2") || c?.getContext("webgl");
  const dbg = gl?.getExtension("WEBGL_debug_renderer_info");
  const gb = document.querySelector(".grid-background");
  const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); return { bg: s.backgroundColor, bgi: s.backgroundImage.slice(0, 200), z: s.zIndex, pos: s.position, op: s.opacity, blend: s.mixBlendMode, filter: s.filter, transform: s.transform }; };
  // ancestors of canvas with non-transparent backgrounds
  const anc = []; let e = c;
  while (e) { const s = getComputedStyle(e); if (s.backgroundColor !== "rgba(0, 0, 0, 0)" || s.backgroundImage !== "none" || s.backdropFilter !== "none" || s.filter !== "none") anc.push({ tag: e.tagName, cls: String(e.className).slice(0, 80), bg: s.backgroundColor, bgi: s.backgroundImage.slice(0, 80), bdf: s.backdropFilter, f: s.filter, z: s.zIndex, op: s.opacity }); e = e.parentElement; }
  return { hash: location.hash, rect: r && { x: r.x, y: r.y, w: r.width, h: r.height }, cw: c?.width, ch: c?.height, renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "n/a", canvas: cs(c), grid: cs(gb), gridRect: gb?.getBoundingClientRect(), anc, probe: window.__kfAmigaProbe?.pose(), anims: document.getAnimations().length,
   buttons: [...document.querySelectorAll("button")].map(b => (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 40)).filter(Boolean).slice(0, 60) };
});
console.log(JSON.stringify(info, null, 1));
const poses = [];
for (let i = 0; i < 10; i++) { poses.push(await p.evaluate(() => window.__kfAmigaProbe?.pose())); await p.waitForTimeout(200); }
console.log(JSON.stringify(poses.map(q => q && [q.px.toFixed(2), q.py.toFixed(2), q.playing])));
console.log(logs.filter(l => !l.startsWith("debug")).slice(0, 20).join("\n"));
await b.close();
