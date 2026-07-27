import { webkit } from "playwright";
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
const state = (p) => p.evaluate(() => {
  const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
  const hs = [...bar.querySelectorAll("[data-stop-id]")];
  const code = document.querySelector("textarea, [data-testid*=code], pre");
  return {
    n: hs.length,
    labels: hs.map(h=>h.getAttribute("aria-label")),
    centers: hs.map(h=>{const r=h.getBoundingClientRect();return +(r.x+r.width/2).toFixed(1);}),
    css: (code && (code.value ?? code.textContent) || "").slice(0,320),
  };
});

// ── T1: click in the left dead band (bar.x+3) ──
{
  const { p, errs } = await mk();
  const bar = await p.evaluate(()=>{const r=document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});
  console.log("BAR", JSON.stringify(bar));
  console.log("T1 before", JSON.stringify(await state(p)));
  await p.mouse.click(bar.x + 3, bar.y + bar.h/2);
  await p.waitForTimeout(400);
  console.log("T1 after click at bar.x+3", JSON.stringify(await state(p)));
  console.log("T1 errs", JSON.stringify(errs));
  await p.close();
}

// ── T2: add a mid stop, select it, measure the remove chip vs the section rule ──
{
  const { p, errs } = await mk();
  const bar = await p.evaluate(()=>{const r=document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});
  await p.mouse.click(bar.x + bar.w*0.5, bar.y + bar.h/2);
  await p.waitForTimeout(350);
  const s = await state(p);
  console.log("T2 after mid add", JSON.stringify(s));
  // select the middle handle
  await p.mouse.click(s.centers[1], bar.y + bar.h/2);
  await p.waitForTimeout(450);
  const chip = await p.evaluate(() => {
    const chip = document.querySelector('[aria-label="Remove selected stop"]');
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    const root = bar.parentElement;
    const hr = root.parentElement.querySelector("hr");
    const h3 = root.parentElement.querySelector("h3");
    const rr = (e)=> e ? (({x,y,width,height,bottom,top})=>({x:+x.toFixed(1),y:+y.toFixed(1),w:+width.toFixed(1),h:+height.toFixed(1),top:+top.toFixed(1),bottom:+bottom.toFixed(1)}))(e.getBoundingClientRect()) : null;
    return { chip: rr(chip), chipZ: chip && getComputedStyle(chip).zIndex, editorRoot: rr(root), bar: rr(bar), hr: rr(hr), h3: rr(h3),
      chipHit: (()=>{ if(!chip) return null; const r=chip.getBoundingClientRect(); const cx=r.x+r.width/2, cy=r.y+r.height/2; let f=null,l=null;
        for(let d=-30;d<=30;d++){const el=document.elementFromPoint(cx,cy+d); if(el && el.closest('[aria-label="Remove selected stop"]')){ if(f===null)f=d; l=d; }}
        return [f,l,l-f+1]; })(),
      hrIsUnder: (()=>{ const r=chip.getBoundingClientRect(); const el=document.elementFromPoint(r.x+r.width/2, r.bottom-2); return el ? el.tagName+"."+String(el.className).slice(0,24) : null; })(),
    };
  });
  console.log("T2 chip", JSON.stringify(chip, null, 1));
  await p.screenshot({ path: OUT+"/02-chip.png", clip: { x: bar.x-20, y: bar.y-16, width: bar.w+40, height: 150 } });
  console.log("T2 errs", JSON.stringify(errs));
  await p.close();
}

// ── T3: drag the middle stop PAST the last one (ordering invariant) ──
{
  const { p, errs } = await mk();
  const bar = await p.evaluate(()=>{const r=document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});
  await p.mouse.click(bar.x + bar.w*0.35, bar.y + bar.h/2);   // add ~33%
  await p.waitForTimeout(350);
  let s = await state(p); console.log("T3 3 stops", JSON.stringify(s));
  const y = bar.y + bar.h/2;
  await p.mouse.move(s.centers[1], y); await p.mouse.down();
  for (let i=1;i<=12;i++) { await p.mouse.move(s.centers[1] + (bar.w*0.62)*i/12, y); await p.waitForTimeout(25); }
  await p.mouse.up(); await p.waitForTimeout(500);
  s = await state(p); console.log("T3 after cross-drag", JSON.stringify(s));
  const ease = await p.evaluate(()=> [...document.querySelectorAll("*")].filter(e=>/^\s*\d+\s*→\s*\d+/.test(e.textContent||"") && e.children.length<4).slice(0,4).map(e=>e.textContent.trim().slice(0,40)));
  console.log("T3 easing interval labels", JSON.stringify(ease));
  await p.screenshot({ path: OUT+"/03-crossed.png", clip: { x: bar.x-20, y: bar.y-16, width: bar.w+40, height: 150 } });
  console.log("T3 errs", JSON.stringify(errs));
  await p.close();
}

// ── T4: keyboard grammar ──
{
  const { p, errs } = await mk();
  await p.evaluate(()=>document.querySelector("[data-stop-id]").focus());
  const seq = [];
  for (const k of ["Home","End","ArrowUp","ArrowDown","ArrowRight","Shift+ArrowRight","PageUp","Space","Escape","Delete"]) {
    await p.keyboard.press(k); await p.waitForTimeout(140);
    seq.push([k, await p.evaluate(()=>{const hs=[...document.querySelectorAll("[data-stop-id]")];
      return hs.map(h=>h.getAttribute("aria-label")).join("|") + " focus=" + (document.activeElement?.getAttribute("aria-label")||document.activeElement?.tagName) ;})]);
  }
  console.log("T4", JSON.stringify(seq, null, 1));
  const fs = await p.evaluate(()=>{const h=document.querySelector("[data-stop-id]"); h.focus(); const cs=getComputedStyle(h); return {outline:cs.outlineStyle+" "+cs.outlineWidth, boxShadow: cs.boxShadow.slice(0,160)};});
  console.log("T4 focus style (programmatic focus, not :focus-visible)", JSON.stringify(fs));
  console.log("T4 errs", JSON.stringify(errs));
  await p.close();
}
await b.close();
