import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/wbgse";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", e => errs.push(String(e).slice(0,200)));
p.on("console", m => { if (m.type()==="error") errs.push("console:"+m.text().slice(0,200)); });
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2500);

const geom = await p.evaluate(() => {
  const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
  const r = bar.getBoundingClientRect();
  const cs = getComputedStyle(bar);
  const handles = [...bar.querySelectorAll("[data-stop-id]")].map(h => {
    const hr = h.getBoundingClientRect();
    const hcs = getComputedStyle(h);
    return {
      label: h.getAttribute("aria-label"),
      id: h.getAttribute("data-stop-id"),
      rect: { x: +hr.x.toFixed(2), y:+hr.y.toFixed(2), w: +hr.width.toFixed(2), h: +hr.height.toFixed(2) },
      centerX: +(hr.x + hr.width/2).toFixed(2),
      inlineTransition: h.style.transition,
      computedTransition: hcs.transition,
      transitionDuration: hcs.transitionDuration,
      boxShadow: hcs.boxShadow.slice(0,120),
      background: hcs.backgroundImage.slice(0,140),
      attrs: [...h.attributes].map(a => a.name+"="+a.value.slice(0,60)),
      tabIndex: h.tabIndex,
      role: h.getAttribute("role"),
    };
  });
  const root = document.documentElement;
  const tok = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  return {
    barRect: { x:+r.x.toFixed(2), y:+r.y.toFixed(2), w:+r.width.toFixed(2), h:+r.height.toFixed(2) },
    barBorder: cs.borderLeftWidth + "/" + cs.borderRightWidth,
    barBg: cs.backgroundImage.slice(0,200),
    barBgSize: cs.backgroundSize, barBgOrigin: cs.backgroundOrigin, barBgClip: cs.backgroundClip,
    handles,
    tokens: Object.fromEntries(["--spring-snappy","--spring-snappy-duration","--alpha-checker","--card-edge","--focus-ring-inner","--focus-ring-outer","--touch-target","--radius-pill","--duration-fast","--ease-standard","--shadow-sm"].map(n=>[n, tok(n).slice(0,90)])),
  };
});
console.log(JSON.stringify(geom, null, 1));

// hit-test sweep around handle 0 center
const hit = await p.evaluate(() => {
  const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
  const h = bar.querySelector("[data-stop-id]");
  const r = h.getBoundingClientRect();
  const cx = r.x + r.width/2, cy = r.y + r.height/2;
  const row = [];
  for (let d = -30; d <= 30; d++) {
    const el = document.elementFromPoint(cx + d, cy);
    row.push([d, el ? (el.getAttribute("data-stop-id") ? "HANDLE" : (el.getAttribute("data-testid") || el.tagName)) : "null"]);
  }
  const vert = [];
  for (let d = -30; d <= 30; d++) {
    const el = document.elementFromPoint(cx, cy + d);
    vert.push([d, el ? (el.getAttribute("data-stop-id") ? "HANDLE" : (el.getAttribute("data-testid") || el.className?.toString?.().slice(0,20) || el.tagName)) : "null"]);
  }
  const firstH = row.find(x=>x[1]==="HANDLE"), lastH = [...row].reverse().find(x=>x[1]==="HANDLE");
  const firstV = vert.find(x=>x[1]==="HANDLE"), lastV = [...vert].reverse().find(x=>x[1]==="HANDLE");
  return { hitSpanX: firstH && lastH ? [firstH[0], lastH[0], lastH[0]-firstH[0]+1] : null,
           hitSpanY: firstV && lastV ? [firstV[0], lastV[0], lastV[0]-firstV[0]+1] : null,
           rowSample: row.filter((_,i)=>i%3===0) };
});
console.log("HIT", JSON.stringify(hit));
console.log("ERRS", JSON.stringify(errs));
await p.screenshot({ path: OUT + "/01-rest.png", clip: { x: 280, y: 240, width: 720, height: 140 } });
await ctx.storageState({ path: OUT+"/state.json" }).catch(()=>{});
await b.close();
