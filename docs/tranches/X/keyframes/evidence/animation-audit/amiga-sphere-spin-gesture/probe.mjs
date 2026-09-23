import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/amiga");
await page.waitForTimeout(4000);
const info = await page.evaluate(() => {
  const c = document.querySelector("canvas.amiga-canvas");
  const r = c?.getBoundingClientRect();
  const gl = c?.getContext("webgl2") || c?.getContext("webgl");
  const dbg = gl?.getExtension("WEBGL_debug_renderer_info");
  return { hash: location.hash, rect: r && { x: r.x, y: r.y, w: r.width, h: r.height }, cw: c?.width, ch: c?.height,
    renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
    probe: window.__kfAmigaProbe ? window.__kfAmigaProbe.pose() : null, omega: window.__kfAmigaProbe?.omega(),
    aria: c?.getAttribute("aria-label"), cursor: c && getComputedStyle(c).cursor, anims: document.getAnimations().length };
});
console.log(JSON.stringify(info));
await page.screenshot({ path: OUT + "00-reach.png" });
await browser.close();
