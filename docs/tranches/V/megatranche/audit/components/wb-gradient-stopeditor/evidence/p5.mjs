import { webkit, devices } from "playwright";
const OUT="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/wbgse";
const b = await webkit.launch();
const ctx = await b.newContext({ ...devices["iPhone 14"] });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil:"networkidle", timeout:45000 });
await p.waitForTimeout(2500);
const m = await p.evaluate(() => {
  const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
  const br = bar.getBoundingClientRect();
  const hs = [...bar.querySelectorAll("[data-stop-id]")];
  const root = getComputedStyle(document.documentElement);
  const anc = (() => { let e = bar, out=[]; while (e && e !== document.documentElement) { const cs = getComputedStyle(e);
      if (cs.zoom !== "1" && cs.zoom !== "normal") out.push([e.tagName+"."+String(e.className).slice(0,18), "zoom="+cs.zoom]);
      if (cs.transform !== "none") out.push([e.tagName+"."+String(e.className).slice(0,18), "transform="+cs.transform.slice(0,40)]);
      e = e.parentElement; } return out; })();
  return {
    rootFontSize: root.fontSize, devicePixelRatio: window.devicePixelRatio, innerWidth: window.innerWidth,
    bar: { x:+br.x.toFixed(2), w:+br.width.toFixed(2), h:+br.height.toFixed(2) },
    barCssWidth: getComputedStyle(bar).width, barCssHeight: getComputedStyle(bar).height,
    handles: hs.map(h => { const r = h.getBoundingClientRect(); const cs = getComputedStyle(h);
      return { label:h.getAttribute("aria-label"), cssW: cs.width, rectW:+r.width.toFixed(2),
               left: h.style.left, rectX:+r.x.toFixed(2), centerX:+(r.x+r.width/2).toFixed(2),
               leftEdgeVsBar:+(r.x - br.x).toFixed(2), rightEdgeVsBar:+((r.x+r.width)-(br.x+br.width)).toFixed(2) }; }),
    zoomAncestors: anc,
    touchTarget: root.getPropertyValue("--touch-target"),
  };
});
console.log(JSON.stringify(m, null, 1));
await p.screenshot({ path: OUT+"/07-mobile-rail.png", clip: { x: m.bar.x-14, y: 0, width: m.bar.w+28, height: 220 } });
await p.close(); await ctx.close(); await b.close();
