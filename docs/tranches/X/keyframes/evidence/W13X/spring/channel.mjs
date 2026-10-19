// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.spring · KFA-43: does the Sweep CHANNEL (springEditAnim) paint anything while the Sweep plays? (the ribbon's preview ball vs the stage sampler)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
await p.locator("button", { hasText: /^Play/ }).filter({ visible: true }).first().click({ force: true }); await p.waitForTimeout(300);
const r = await p.evaluate(async () => {
  const pane = [...document.querySelectorAll(".progress-ball, [class*=visualizer] [class*=ball]")].filter((e) => !e.closest(".spring-target"));
  const seen = new Map(pane.map((e, i) => [i, new Set()])); const sampler = new Set();
  const t0 = performance.now();
  while (performance.now() - t0 < 800) {
    pane.forEach((e, i) => seen.get(i).add(getComputedStyle(e).transform + "|" + e.getBoundingClientRect().left.toFixed(1)));
    sampler.add(document.querySelector(".sampler-carriage")?.style.transform);
    await new Promise((q) => requestAnimationFrame(q));
  }
  return { paneBalls: pane.map((e, i) => ({ cls: String(e.className).slice(0, 40), distinct: seen.get(i).size })), samplerDistinct: sampler.size, anims: document.getAnimations().length };
});
console.log(`${process.env.TAG} ${JSON.stringify(r)}`);
await b.close(); process.exit(0);
