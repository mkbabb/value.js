import { chromium } from "playwright";
const out = {};
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3800);
const F = `(() => { let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) return c; c = c.parent; } return null; })()`;

// palettes-mode-ish: give the plate a 4-colour palette result via a real mix cycle
await page.evaluate(`(() => { const c = ${F};
  c.setupState.selectedColors = [{css:"oklab(0.7 0.1 0.05)",source:"p"},{css:"oklab(0.4 -0.08 0.12)",source:"p"}]; })()`);
await page.waitForTimeout(250);

// observe every vj-* class that lands on any element inside the plate
await page.evaluate(() => {
  window.__seen = new Set();
  window.__obs = new MutationObserver(recs => { for (const r of recs) {
    const el = r.target; if (!el.classList) continue;
    const inPlate = el.closest && el.closest(".mix-plate");
    for (const c of el.classList) if (c.startsWith("vj-")) window.__seen.add((inPlate ? "PLATE " : "elsewhere ") + c);
  }});
  window.__obs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
});

// mix #1 (colors)
await page.evaluate(`(() => { ${F}.setupState.startMix(); })()`);
await page.waitForTimeout(120);
out.ghostRect = await page.evaluate(() => { const p = document.querySelector(".mix-plate"); const r = p.getBoundingClientRect(); return { h: Math.round(r.height), w: Math.round(r.width) }; });
await page.waitForTimeout(2200);
out.settledRect = await page.evaluate(() => { const p = document.querySelector(".mix-plate"); const r = p.getBoundingClientRect(); return { h: Math.round(r.height), w: Math.round(r.width) }; });
await page.screenshot({ path: `${OUT}/challengeC-plate-color.png`, clip: await page.evaluate(() => { const r = document.querySelector(".mix-plate").getBoundingClientRect(); return { x: r.x-8, y: r.y-8, width: r.width+16, height: r.height+16 }; }) });

// now switch to a PALETTE result through a real phase cycle (mixing -> done)
await page.evaluate(`(() => { const c = ${F};
  c.setupState.mixResult = { type: "palette", colors: [{css:"oklab(0.8 0.05 0.1)",position:0},{css:"oklab(0.6 0 0.08)",position:1},{css:"oklab(0.45 -0.05 0.05)",position:2},{css:"oklab(0.3 -0.02 -0.05)",position:3}] };
  c.setupState.animationPhase = "mixing"; })()`);
await page.waitForTimeout(80);
await page.evaluate(`(() => { ${F}.setupState.animationPhase = "done"; })()`);
await page.waitForTimeout(1600);
out.paletteSettled = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  const r = p.getBoundingClientRect();
  return { h: Math.round(r.height), text: p.innerText.trim(), dots: p.querySelectorAll(".watercolor-swatch").length,
           axDump: (() => { const walk = []; p.querySelectorAll("*").forEach(e => { if (e.getAttribute("aria-hidden") === "true") walk.push(e.tagName + ".hidden"); }); return walk.length; })() };
});
await page.screenshot({ path: `${OUT}/challengeC-plate-palette.png`, clip: await page.evaluate(() => { const r = document.querySelector(".mix-plate").getBoundingClientRect(); return { x: r.x-8, y: r.y-8, width: r.width+16, height: r.height+16 }; }) });
out.vjSeen = await page.evaluate(() => { const s = [...window.__seen]; window.__obs.disconnect(); return s; });
console.log(JSON.stringify(out, null, 1));
await b.close();
