import { webkit, devices } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/wbgse";
const b = await webkit.launch();
const mk = async (opts={}) => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...opts });
  const p = await ctx.newPage();
  const errs = []; p.on("pageerror", e => errs.push(String(e).slice(0,200)));
  p.on("console", m => { if (m.type()==="error") errs.push("con:"+m.text().slice(0,160)); });
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(2200);
  return { ctx, p, errs };
};
const st = (p) => p.evaluate(() => {
  const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
  const hs = [...bar.querySelectorAll("[data-stop-id]")];
  return { n: hs.length, pos: hs.map(h=>h.getAttribute("aria-label").replace(/\D+/g,"")),
           centers: hs.map(h=>{const r=h.getBoundingClientRect();return +(r.x+r.width/2).toFixed(1);}) };
});
const barOf = (p) => p.evaluate(()=>{const r=document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});

// ── T5: cross-drag — drag a middle stop LEFT past its left neighbour ──
{
  const { p, errs } = await mk();
  const bar = await barOf(p); const y = bar.y + bar.h/2;
  await p.mouse.click(bar.x + bar.w*0.30, y); await p.waitForTimeout(320);
  await p.mouse.click(bar.x + bar.w*0.62, y); await p.waitForTimeout(320);
  let s = await st(p); console.log("T5 4 stops", JSON.stringify(s));
  // grab the 3rd handle (≈60%) and drag it left to ≈10%
  await p.mouse.move(s.centers[2], y); await p.mouse.down();
  for (let i=1;i<=14;i++){ await p.mouse.move(s.centers[2] - (s.centers[2]-(bar.x+bar.w*0.10))*i/14, y); await p.waitForTimeout(22); }
  await p.mouse.up(); await p.waitForTimeout(500);
  s = await st(p); console.log("T5 after cross-drag LEFT", JSON.stringify(s));
  const out = await p.evaluate(() => {
    const ta = document.querySelector("textarea");
    const pre = [...document.querySelectorAll("pre,code")].map(e=>e.textContent).find(t=>t&&t.includes("gradient("));
    const tile = document.querySelector('[data-testid="gradient-render-tile"]');
    return { textarea: ta ? ta.value.slice(0,400) : null, pre: (pre||"").slice(0,400),
             rail: getComputedStyle(document.querySelector('[data-testid="gradient-stop-bar"]')).backgroundImage.slice(0,260) };
  });
  console.log("T5 serialized", JSON.stringify(out, null, 1));
  await p.screenshot({ path: OUT+"/05-crossed.png", clip: { x: bar.x-20, y: bar.y-16, width: bar.w+40, height: 130 } });
  console.log("T5 errs", JSON.stringify(errs));
  await p.close();
}

// ── T6: density / overflow — 9 stops ──
{
  const { p, errs } = await mk();
  const bar = await barOf(p); const y = bar.y + bar.h/2;
  for (const f of [0.12,0.2,0.28,0.36,0.44,0.52,0.6,0.72,0.8,0.88]) { await p.mouse.click(bar.x + bar.w*f, y); await p.waitForTimeout(160); }
  const s = await st(p); console.log("T6 dense", JSON.stringify(s));
  const gaps = s.centers.slice(1).map((c,i)=>+(c-s.centers[i]).toFixed(1));
  console.log("T6 neighbour gaps px", JSON.stringify(gaps), "min", Math.min(...gaps));
  // how much of the rail can still mint a stop (fine pointer)?
  const addable = await p.evaluate(() => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const r = bar.getBoundingClientRect(); let free = 0, tot = 0;
    for (let x = r.x + 0.5; x < r.right; x += 1) { tot++;
      const el = document.elementFromPoint(x, r.y + r.height/2);
      if (el && !el.closest("[data-stop-id]")) free++; }
    return { totalPx: tot, addablePx: free, pct: +(100*free/tot).toFixed(1) };
  });
  console.log("T6 addable rail", JSON.stringify(addable));
  await p.mouse.click(s.centers[5], y); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT+"/06-dense.png", clip: { x: bar.x-20, y: bar.y-16, width: bar.w+40, height: 130 } });
  console.log("T6 errs", JSON.stringify(errs));
  await p.close();
}

// ── T7: COARSE pointer (mobile) — chip vs handle target overlap ──
{
  const ctx = await b.newContext({ ...devices["iPhone 14"] });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(2500);
  const bar = await barOf(p); const y = bar.y + bar.h/2;
  await p.evaluate(()=>window.scrollTo(0,0));
  await p.mouse.click(bar.x + bar.w*0.5, y); await p.waitForTimeout(350);   // add mid stop
  const s = await st(p); console.log("T7 stops", JSON.stringify(s));
  await p.mouse.click(s.centers[1], y); await p.waitForTimeout(450);        // select it
  const probe = await p.evaluate(() => {
    const h = [...document.querySelectorAll("[data-stop-id]")][1];
    const chip = document.querySelector('[aria-label="Remove selected stop"]');
    const hb = h.getBoundingClientRect(), cb = chip ? chip.getBoundingClientRect() : null;
    const cx = hb.x + hb.width/2, cy = hb.y + hb.height/2;
    const col = [];
    for (let d = -26; d <= 40; d++) {
      const el = document.elementFromPoint(cx, cy + d);
      col.push([d, el ? (el.closest("[data-stop-id]") ? "HANDLE" : (el.closest('[aria-label="Remove selected stop"]') ? "REMOVE-CHIP" : (el.getAttribute("data-testid")||el.tagName))) : "null"]);
    }
    const expander = getComputedStyle(h, "::before");
    return { handleRect: {x:+hb.x.toFixed(1),y:+hb.y.toFixed(1),w:hb.width,h:hb.height},
             chipRect: cb ? {x:+cb.x.toFixed(1),y:+cb.y.toFixed(1),w:cb.width,h:cb.height} : null,
             expanderSize: expander.width + "x" + expander.height,
             column: col };
  });
  console.log("T7", JSON.stringify(probe.handleRect), JSON.stringify(probe.chipRect), "expander", probe.expanderSize);
  const c = probe.column;
  const hSpan = c.filter(x=>x[1]==="HANDLE").map(x=>x[0]);
  const cSpan = c.filter(x=>x[1]==="REMOVE-CHIP").map(x=>x[0]);
  console.log("T7 handle-hit offsets", hSpan[0], "→", hSpan[hSpan.length-1], "| chip-hit offsets", cSpan[0], "→", cSpan[cSpan.length-1]);
  console.log("T7 column", JSON.stringify(c.filter(x=>x[0]>=8&&x[0]<=30)));
  await p.close(); await ctx.close();
}

// ── T8: reduced-motion + invalid-colour declaration drop ──
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(2200);
  const rm = await p.evaluate(()=>{const h=document.querySelector("[data-stop-id]");const cs=getComputedStyle(h);return {transitionDuration: cs.transitionDuration, transitionProperty: cs.transitionProperty};});
  console.log("T8 reduced-motion handle transition", JSON.stringify(rm));
  const drop = await p.evaluate(() => {
    const h = document.querySelector("[data-stop-id]");
    const probe = document.createElement("div"); document.body.appendChild(probe);
    const set = (v) => { probe.style.cssText = ""; probe.style.background = v; return getComputedStyle(probe).backgroundImage.slice(0,80); };
    const r = {
      valid: set("linear-gradient(red, red), var(--alpha-checker)"),
      emptyOklch: set("linear-gradient(oklch(), oklch()), var(--alpha-checker)"),
      emptyRgb: set("linear-gradient(rgb(), rgb()), var(--alpha-checker)"),
      empty: set("linear-gradient(, ), var(--alpha-checker)"),
    };
    probe.remove(); return r;
  });
  console.log("T8 invalid-colour background result", JSON.stringify(drop, null, 1));
  await p.close(); await ctx.close();
}

// ── T9: pointermove double-dispatch (bar handler + captured handle handler) ──
{
  const { p } = await mk();
  const dbl = await p.evaluate(() => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const h = bar.querySelector("[data-stop-id]");
    let barHits = 0, handleHits = 0;
    const fb = () => barHits++, fh = () => handleHits++;
    bar.addEventListener("pointermove", fb); h.addEventListener("pointermove", fh);
    const r = h.getBoundingClientRect();
    h.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: r.x+10, clientY: r.y+10, pointerId: 1 }));
    bar.removeEventListener("pointermove", fb); h.removeEventListener("pointermove", fh);
    return { barHandlerCalls: barHits, handleHandlerCalls: handleHits };
  });
  console.log("T9 one pointermove on a handle reaches:", JSON.stringify(dbl));
  await p.close();
}
await b.close();
