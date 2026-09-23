// transport-dock — probe: fresh load of #/cube, identify the bottom TransportDock, its layers and state.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() };
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(720, 400);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(5000);
prov.renderer = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); });
const info = await page.evaluate(() => {
  const host = document.querySelector('[data-dock-tether="bottom"]');
  if (!host) return { none: true, tethers: [...document.querySelectorAll("[data-dock-tether]")].map(e => e.dataset.dockTether) };
  const dock = host.querySelector(".glass-dock");
  const r = dock.getBoundingClientRect();
  const layers = [...dock.querySelectorAll(".dock-layer")].map(l => ({ cls: l.className, op: getComputedStyle(l).opacity, vis: getComputedStyle(l).visibility, inert: l.inert, html: l.innerText.slice(0, 80), btns: [...l.querySelectorAll("button,[role=combobox]")].map(b => b.getAttribute("aria-label")) }));
  return { hash: location.hash, dockCls: dock.className, rect: [r.x, r.y, r.width, r.height].map(Math.round), style: dock.getAttribute("style"), layers,
    anims: document.getAnimations().length, dockAnims: document.getAnimations().filter(a => a.effect?.target && host.contains(a.effect.target)).map(a => a.constructor.name + ":" + (a.animationName || a.transitionProperty) + ":" + a.playState) };
});
await page.screenshot({ path: OUT + "probe-rest.png" });
console.log(JSON.stringify({ prov, info }, null, 1));
await browser.close();
