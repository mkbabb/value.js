// SERVED MODEL: claude-opus-5-5
// Runtime read of the compiled channel easings + the transport select (headed, served page).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await page.goto("http://localhost:5173/#/amiga"); await page.waitForSelector("canvas.amiga-canvas"); await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  let inst = document.querySelector("canvas.amiga-canvas").__vueParentComponent;
  while (inst && !(inst.exposed && inst.exposed.facility)) inst = inst.parent;
  const g = inst.exposed.facility.group; const out = {};
  for (const [n, o] of Object.entries(g.animations)) {
    const a = o.animation;
    const tf = (x) => x && x.fn ? [0.1, 0.25, 0.5, 0.75].map((u) => +x.fn(u).toFixed(4)) : String(x);
    out[n] = { ctor: a.constructor.name, optTF: tf(a.options.timingFunction), optTFsrc: String(a.options.timingFunction?.fn).slice(0, 120),
      templates: (a.templateFrames ?? []).map((f) => tf(f.timingFunction)),
      frames: (a.frames ?? []).map((f) => ({ tf: tf(f.timingFunction), src: String(f.timingFunction?.fn).slice(0, 80), start: f.start, stop: f.stop, time: f.time })) ,
      useWAAPI: a.options.useWAAPI, keys: Object.keys(a).filter((k) => /tim|eas|fn/i.test(k)) };
  }
  return out;
});
writeFileSync(OUT + "easing-probe.json", JSON.stringify(r, null, 1));
// the select
const sels = await page.locator('[aria-label="Select animation"]').count();
const sel = page.locator('[aria-label="Select animation"]').first();
const info = { sels, visible: await sel.isVisible() };
try { await sel.click({ timeout: 3000 }); await page.waitForTimeout(500);
  info.options = await page.locator('[role="option"]').allInnerTexts();
  await page.screenshot({ path: OUT + "shots/04-select-open.png" });
  for (const name of ["Bouncing X", "Bouncing Y", "Spin"]) {
    const o = page.locator('[role="option"]', { hasText: name }).first();
    if (!(await o.count())) { await sel.click(); await page.waitForTimeout(400); }
    await page.locator('[role="option"]', { hasText: name }).first().click(); await page.waitForTimeout(500);
    info["shown_" + name] = await sel.innerText();
    await page.screenshot({ path: OUT + `shots/05-select-${name.replace(/ /g, "")}.png` });
  }
} catch (e) { info.err = e.message.slice(0, 300); }
writeFileSync(OUT + "select-probe.json", JSON.stringify(info, null, 1));
await browser.close();
