import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3800);
const F = `(() => { let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) return c; c = c.parent; } return null; })()`;
await page.evaluate(`(() => { const c = ${F}; c.setupState.selectedColors = [{css:"oklab(0.7 0.1 0.05)",source:"p"},{css:"oklab(0.4 -0.08 0.12)",source:"p"}]; })()`);
await page.waitForTimeout(250);
// mix #1, settle
await page.evaluate(`(() => { ${F}.setupState.startMix(); })()`);
await page.waitForTimeout(2600);
// RE-MIX: sample every rAF for the ghost well's arrival
const trace = await page.evaluate(`(async () => {
  const c = ${F};
  const samples = [];
  const t0 = performance.now();
  c.setupState.startMix();
  await new Promise(res => {
    const tick = () => {
      const plate = document.querySelector(".mix-plate");
      const inner = plate ? plate.children[1] : null;
      samples.push({
        t: Math.round(performance.now() - t0),
        ghostClass: plate ? /--ghost/.test(plate.className) : null,
        innerCls: inner ? inner.className : null,
        wellPresent: !!document.querySelector('.mix-plate [data-variant="ghost"]'),
      });
      if (performance.now() - t0 > 700) return res();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  // compress: only transitions
  const out = [];
  for (let i = 0; i < samples.length; i++) {
    if (i === 0 || samples[i].wellPresent !== samples[i-1].wellPresent || samples[i].innerCls !== samples[i-1].innerCls) out.push(samples[i]);
  }
  return { first: samples[0], transitions: out, total: samples.length };
})()`);
console.log(JSON.stringify(trace, null, 1));
await b.close();
