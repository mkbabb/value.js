import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const info = await p.evaluate(() => {
  const gl = document.createElement("canvas").getContext("webgl");
  const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
  const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { b: [b.x|0,b.y|0,b.width|0,b.height|0], tf: cs.transform, inl: e.style.transform, cls: e.className, wc: cs.willChange, ts: cs.transformStyle }; };
  return { gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "?", hash: location.hash,
    idle: r(".idle-hover"), bob: r(".cube-bob"), pose: r(".cube-pose"), cube: r(".cube"), graph: r(".graph"),
    anims: document.getAnimations().map(a => ({ n: a.animationName || a.id, t: a.effect?.target?.className?.toString().slice(0,40), ps: a.playState })),
    faces: [...document.querySelectorAll(".cube > *")].map(e => e.className.toString().slice(0,50)).slice(0,10),
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches };
});
console.log(JSON.stringify(info, null, 1));
await p.screenshot({ path: "recon-rest.png" });
await b.close();
