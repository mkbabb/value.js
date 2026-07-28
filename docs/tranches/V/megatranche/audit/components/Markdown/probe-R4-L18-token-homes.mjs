import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);

// 1. the four homes of "resting-plate certified accent"
const homes = await p.evaluate(() => {
  const root = getComputedStyle(document.documentElement);
  const wrap = document.querySelector(".markdown-wrapper");
  const cs = wrap ? getComputedStyle(wrap) : null;
  const cv = document.createElement("canvas"); cv.width=cv.height=1;
  const ctx = cv.getContext("2d",{willReadFrequently:true});
  const px = css => { ctx.fillStyle="#000"; ctx.fillRect(0,0,1,1); ctx.fillStyle=css; ctx.fillRect(0,0,1,1); const d=ctx.getImageData(0,0,1,1).data; return `rgb(${d[0]},${d[1]},${d[2]})`; };
  const grab = n => root.getPropertyValue(n).trim();
  const out = {};
  for (const n of ["--accent-live","--ink-muted","--safe-accent","--accent"]) { const v = grab(n); if (v) out[n] = { raw: v, srgb: px(v) }; }
  const md = cs ? cs.getPropertyValue("--md-color-h2").trim() : null;
  out["--md-color-h2 (wrapper inline)"] = md ? { raw: md, srgb: px(md) } : null;
  // element count in the invalidation blast radius
  const nodes = wrap ? wrap.querySelectorAll("*").length : -1;
  return { out, markdownSubtreeElements: nodes, wrapperHasInlineStyle: !!wrap?.getAttribute("style") };
});

// 2. count mdColorVars recomputes during a real drag (each recompute rewrites the inline style attr)
await p.evaluate(() => {
  window.__mdMut = 0;
  const wrap = document.querySelector(".markdown-wrapper");
  if (!wrap) return;
  new MutationObserver(muts => { for (const m of muts) if (m.attributeName === "style") window.__mdMut++; })
    .observe(wrap, { attributes: true, attributeFilter: ["style"] });
});
// drag the first slider thumb in the picker
const thumb = await p.$('[role="slider"]');
if (thumb) {
  const bb = await thumb.boundingBox();
  await p.mouse.move(bb.x + bb.width/2, bb.y + bb.height/2);
  await p.mouse.down();
  for (let i = 0; i < 40; i++) { await p.mouse.move(bb.x + bb.width/2 - i*6, bb.y + bb.height/2); await p.waitForTimeout(16); }
  await p.mouse.up();
  await p.waitForTimeout(400);
}
const drag = await p.evaluate(() => ({ styleRewrites: window.__mdMut }));

// 3. in-page cost of the pipeline useMarkdownColors runs per rewrite
const bench = await p.evaluate(async () => {
  const css = await import("/@fs/Users/mkbabb/Programming/value.js/dist/subpaths/css.js");
  const col = await import("/@fs/Users/mkbabb/Programming/value.js/dist/subpaths/color.js");
  const s = "rgb(200 70 215)";
  for (let i=0;i<200;i++){ const r=css.parseCssColor(s); col.convertColor(r.value,"oklch"); }
  const t0 = performance.now();
  const N = 5000;
  for (let i=0;i<N;i++){ const r=css.parseCssColor(s); col.convertColor(r.value,"oklch"); }
  const t1 = performance.now();
  return { parseConvertUsPerCall: +(((t1-t0)*1000)/N).toFixed(2), N };
});

// 4. forced style-recalc cost: custom prop on the markdown wrapper vs on :root
const recalc = await p.evaluate(() => {
  const wrap = document.querySelector(".markdown-wrapper");
  const meas = (el, prop) => {
    const t0 = performance.now();
    for (let i=0;i<50;i++){ el.style.setProperty(prop, `oklch(0.5 0.1 ${i}deg)`); void document.body.offsetHeight; }
    return +((performance.now()-t0)/50).toFixed(3);
  };
  const onWrapper = meas(wrap, "--md-color-h2");
  const onRoot = meas(document.documentElement, "--probe-unused-xyz");
  return { msPerRecalc_wrapperCustomProp: onWrapper, msPerRecalc_rootUnusedProp: onRoot };
});

console.log(JSON.stringify({ homes, drag, bench, recalc }, null, 2));
await b.close();
