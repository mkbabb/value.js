import { webkit, devices } from "playwright";
const SEL = '[role="textbox"][aria-label="Gradient CSS"]';
const V = '[data-testid="gradient-parse-verdict"]';
const OUT = process.argv[2];
async function go(id, ctxOpts, scheme) {
  const b = await webkit.launch();
  const ctx = await b.newContext({ ...ctxOpts, colorScheme: scheme });
  await ctx.addInitScript(`try{localStorage.setItem('vueuse-color-scheme',${JSON.stringify(scheme)});const d=document.documentElement;${JSON.stringify(scheme)}==='dark'?d.classList.add('dark'):d.classList.remove('dark');}catch(e){}`);
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
  await p.waitForTimeout(3200);
  await p.locator(SEL).scrollIntoViewIfNeeded();
  await p.evaluate((sel)=>{const el=document.querySelector(sel);el.focus();const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);},SEL);
  await p.keyboard.press("Backspace");
  await p.keyboard.type("linear-gradient(90deg, notacolor, blue)", { delay: 4 });
  await p.waitForTimeout(1200);
  await p.evaluate((sel)=>{document.querySelector(sel).blur();},SEL);
  await p.waitForTimeout(400);
  const info = await p.evaluate(({sel,v})=>{
    const el=document.querySelector(sel), vp=document.querySelector(v);
    const er=el.getBoundingClientRect();
    const vr=vp?vp.getBoundingClientRect():null;
    const wrap=el.parentElement.getBoundingClientRect();
    // is the verdict inside the visible viewport?
    const inVP = vr ? (vr.top>=0 && vr.bottom<=innerHeight) : null;
    // nearest scroll container clip
    let sc=el.parentElement, clipped=null;
    while(sc && sc!==document.body){ const cs=getComputedStyle(sc);
      if(/auto|scroll|hidden/.test(cs.overflowY)) { const r=sc.getBoundingClientRect();
        clipped = vr ? (vr.bottom > r.bottom + 0.5) : null;
        return {editorRect:{y:+er.y.toFixed(1),h:+er.height.toFixed(1)},verdictRect:vr?{y:+vr.y.toFixed(1),h:+vr.height.toFixed(1),w:+vr.width.toFixed(1)}:null,
          gapPx: vr? +(vr.top-er.bottom).toFixed(1):null, inViewport:inVP, scrollHost:sc.className.slice(0,60), verdictClippedByHost:clipped, innerH:innerHeight,
          verdictText: vp?vp.textContent.trim():null, wrapH:+wrap.height.toFixed(1)};
      }
      sc=sc.parentElement;
    }
    return {editorRect:{y:+er.y.toFixed(1),h:+er.height.toFixed(1)},verdictRect:vr?{y:+vr.y.toFixed(1),h:+vr.height.toFixed(1),w:+vr.width.toFixed(1)}:null,
      gapPx: vr? +(vr.top-er.bottom).toFixed(1):null, inViewport:inVP, scrollHost:"(none)", verdictClippedByHost:null, innerH:innerHeight,
      verdictText: vp?vp.textContent.trim():null, wrapH:+wrap.height.toFixed(1)};
  },{sel:SEL,v:V});
  console.log(id, JSON.stringify(info));
  // scroll so BOTH are visible then crop
  await p.locator(V).scrollIntoViewIfNeeded().catch(()=>{});
  await p.waitForTimeout(300);
  const bb = await p.locator(SEL).boundingBox();
  const vb = await p.locator(V).boundingBox().catch(()=>null);
  const d = ctxOpts.deviceScaleFactor ?? 3;
  await p.screenshot({ path: `${OUT}/verdict-${id}.png` });
  console.log(id, "RECT", JSON.stringify({bb,vb,d}));
  await b.close();
}
await go("desk-light", { viewport:{width:1440,height:900}, deviceScaleFactor:2 }, "light");
await go("desk-dark", { viewport:{width:1440,height:900}, deviceScaleFactor:2 }, "dark");
await go("mob-light", { ...devices["iPhone 14"] }, "light");
