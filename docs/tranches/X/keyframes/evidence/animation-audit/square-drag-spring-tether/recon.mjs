import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/square");
await p.waitForSelector(".demo-box", { timeout: 20000 });
await p.waitForTimeout(2500);
const info = await p.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl2") || c.getContext("webgl");
  const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
  const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
  return {
    gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null,
    hash: location.hash,
    box: r(".demo-box"), stage: r(".square-stage"), tether: r(".square-tether"),
    aria: document.querySelector(".demo-box")?.getAttribute("aria-label"),
    btns: [...document.querySelectorAll("button[aria-label]")].map(b => b.getAttribute("aria-label")).filter(l => /play|pause|scrub|timeline|restart|stop/i.test(l)),
    sliders: [...document.querySelectorAll("[role=slider]")].map(s => s.getAttribute("aria-label")),
    anims: document.getAnimations().length,
  };
});
console.log(JSON.stringify(info, null, 1));
await p.screenshot({ path: OUT + "recon-rest.png" });
await b.close();
