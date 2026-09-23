import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const D = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/sequence-reel-egg";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs=[]; p.on("console", m => logs.push(m.type()+": "+m.text())); p.on("pageerror", e=>logs.push("pageerror: "+e.message));
await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await p.screenshot({ path: D + "/00-page.png" });
const info = await p.evaluate(() => {
  const btn = document.querySelector('[aria-label^="Play the reel"]');
  const balls = [...document.querySelectorAll(".seq-ball")].map(e => ({ style: e.getAttribute("style"), r: e.getBoundingClientRect().toJSON() }));
  const stage = document.querySelector(".seq-stage")?.getBoundingClientRect().toJSON();
  const gpu = (() => { const c=document.createElement("canvas").getContext("webgl"); const x=c&&c.getExtension("WEBGL_debug_renderer_info"); return x? c.getParameter(x.UNMASKED_RENDERER_WEBGL):null })();
  return { btn: btn && { r: btn.getBoundingClientRect().toJSON(), dis: btn.disabled, html: btn.outerHTML.slice(0,300) }, balls, stage, gpu,
    transport: [...document.querySelectorAll("button[aria-label]")].map(b=>b.getAttribute("aria-label")).slice(0,40) };
});
console.log(JSON.stringify(info, null, 1)); console.log(logs.slice(0,20).join("\n"));
await b.close();
