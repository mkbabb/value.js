// spring-starting-style-entry — headed Chromium, real GPU, served page. Method (1): CSS transitions →
// card.getAnimations() paused synchronously after the state flip, then seeked across one full 500ms run.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const D = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/spring-starting-style-entry";
const N = 48, DUR = 500;
const out = { runs: {} };
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
out.gpu = await page.evaluate(() => 0);
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
out.gpu = await page.evaluate(() => { const c=document.createElement("canvas").getContext("webgl"); const e=c.getExtension("WEBGL_debug_renderer_info"); return c.getParameter(e.UNMASKED_RENDERER_WEBGL); });
out.prm = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
// hook: pause the card's transitions the moment the card is inserted (mount-entry @starting-style run)
await page.evaluate(() => {
  window.__mount = null;
  new MutationObserver(() => {
    const c = document.querySelector(".discrete-card");
    if (c && !window.__mount) {
      getComputedStyle(c).opacity; // force style → transitions created from @starting-style
      const a = c.getAnimations(); a.forEach(x => x.pause());
      window.__mount = a.map(x => ({ n: x.constructor.name, p: x.transitionProperty, ct: x.currentTime, easing: x.effect.getTiming().easing.slice(0, 40), dur: x.effect.getTiming().duration }));
    }
  }).observe(document.body, { childList: true, subtree: true });
});
const sel = page.locator('[aria-label="Select animation"]');
const bb = await sel.boundingBox();
await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(800);
await sel.click(); await page.waitForTimeout(800);
await page.getByRole("option", { name: "Entry" }).click();
await page.waitForTimeout(300);
out.mountAnims = await page.evaluate(() => window.__mount);
out.dockAfterSelect = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Pause animation"],[aria-label="Play animation"]')].map(b => b.getAttribute("aria-label")));
// clip: the stage viewport + margin (shadow + 20px drop)
const clip = await page.evaluate(() => { const r = document.querySelector(".discrete-card").parentElement.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y) - 4, width: Math.round(r.width), height: Math.round(r.height) + 8 }; });
out.clip = clip;
async function sweep(tag) {
  fs.mkdirSync(`${D}/${tag}`, { recursive: true });
  const rows = [];
  for (let i = 0; i < N; i++) {
    const t = (i * DUR) / (N - 1);
    const s = await page.evaluate(async (t) => {
      const c = document.querySelector(".discrete-card");
      const a = window.__held || [];
      a.forEach(x => { x.currentTime = t; });
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const cs = getComputedStyle(c);
      return { t, op: cs.opacity, tf: cs.transform, disp: cs.display, z: cs.zIndex, blend: cs.mixBlendMode, filt: cs.filter, wc: cs.willChange, r: c.getBoundingClientRect().toJSON(), n: a.length, states: a.map(x => x.playState + ":" + x.transitionProperty) };
    }, t);
    await page.screenshot({ path: `${D}/${tag}/f${String(i).padStart(2, "0")}.png`, clip });
    rows.push(s);
  }
  // release: finish the held transitions
  await page.evaluate(() => { (window.__held || []).forEach(x => x.finish()); window.__held = []; });
  await page.waitForTimeout(200);
  out.runs[tag] = rows;
}
// RUN A — mount entry (select → Entry, card mounts .is-open → @starting-style)
await page.evaluate(() => { window.__held = document.querySelector(".discrete-card").getAnimations(); });
await sweep("A-mount-entry");
await page.screenshot({ path: `${D}/A-rest-after.png`, clip });
// ribbon verb: the Reveal/Dismiss NOT inside the stage card (the one in the controls pane)
async function flip(tag) {
  const r = await page.evaluate(async () => {
    const stage = document.querySelector(".discrete-card").closest('[data-slot="card"]');
    const btn = [...document.querySelectorAll("button")].find(b => /Reveal|Dismiss/.test(b.textContent) && !stage.contains(b));
    const label = btn.textContent.trim();
    btn.click();
    await new Promise(r => setTimeout(r, 0)); await Promise.resolve();
    const c = document.querySelector(".discrete-card");
    getComputedStyle(c).opacity;
    const a = c.getAnimations(); a.forEach(x => x.pause()); window.__held = a;
    return { label, cls: c.className, anims: a.map(x => ({ n: x.constructor.name, p: x.transitionProperty, ct: x.currentTime, easing: x.effect.getTiming().easing.slice(0, 30), dur: x.effect.getTiming().duration })) };
  });
  out.runs[tag + "-flip"] = r;
  await sweep(tag);
  await page.screenshot({ path: `${D}/${tag}-rest-after.png`, clip });
}
await flip("B-dismiss-exit");
await flip("C-reveal-entry");
await flip("D-dismiss-exit2");
await flip("E-reveal-entry2");
fs.writeFileSync(`${D}/capture.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ gpu: out.gpu, prm: out.prm, mount: out.mountAnims, dock: out.dockAfterSelect, clip, flips: Object.fromEntries(Object.entries(out.runs).filter(([k]) => k.endsWith("-flip"))) }, null, 1));
await browser.close();
