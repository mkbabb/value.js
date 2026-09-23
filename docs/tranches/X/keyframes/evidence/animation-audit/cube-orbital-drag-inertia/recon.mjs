import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const info = await p.evaluate(() => {
  const gl = document.createElement("canvas").getContext("webgl");
  const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
  const orb = document.querySelector(".idle-hover")?.parentElement;
  const cs = orb && getComputedStyle(orb); const bb = orb?.getBoundingClientRect();
  const cb = document.querySelector(".cube")?.getBoundingClientRect();
  const btns = [...document.querySelectorAll("button[aria-label]")].map(e => e.getAttribute("aria-label")).slice(0, 60);
  return { gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "?", hash: location.hash,
    orb: orb && { cls: orb.className, inl: orb.getAttribute("style"), tf: cs.transform, bb: [bb.x|0,bb.y|0,bb.width|0,bb.height|0], cursor: cs.cursor },
    cube: cb && [cb.x|0, cb.y|0, cb.width|0, cb.height|0],
    anims: document.getAnimations().map(a => ({ n: a.animationName || a.id, t: a.effect?.target?.className?.toString().slice(0,30), ps: a.playState })),
    btns, reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    hit: (() => { const e = document.elementFromPoint(cb.x + cb.width/2, cb.y + cb.height/2); return e && e.className.toString().slice(0,60); })() };
});
console.log(JSON.stringify(info, null, 1));
await p.screenshot({ path: "recon-rest.png" });
await b.close();
