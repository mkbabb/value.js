import { webkit } from "playwright";
const b = await webkit.launch();

// (1) RTL: what is the pageError, and does dir=rtl actually apply?
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900} });
  const p = await ctx.newPage();
  const errs=[]; p.on("pageerror", e=>errs.push(String(e).slice(0,200)));
  await p.addInitScript(() => { try { document.documentElement.setAttribute("dir","rtl"); } catch(e){ (window.__initErr ||= []).push(String(e)); } });
  await p.goto("http://localhost:9000/#/", { waitUntil:"networkidle", timeout:45000 });
  await p.waitForTimeout(2000);
  console.log("RTL via initScript -> dir =", await p.evaluate(()=>document.documentElement.getAttribute("dir")));
  console.log("RTL pageErrors:", JSON.stringify(errs.slice(0,2)));
  console.log("initScript errors:", await p.evaluate(()=>window.__initErr||null));
  // now set it AFTER load, the honest way
  await p.evaluate(()=>document.documentElement.setAttribute("dir","rtl"));
  await p.waitForTimeout(1200);
  const rtl = await p.evaluate(()=>{
    const de=document.documentElement;
    return { dir: de.getAttribute("dir"), overflowX: de.scrollWidth-de.clientWidth,
      offLeft: [...document.querySelectorAll("body *")].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.left< -1;}).length };
  });
  console.log("RTL applied post-load:", JSON.stringify(rtl));
  await p.screenshot({path:"docs/tranches/V/megatranche/audit/visual/shots/rtl-desktop/picker-postload.png", fullPage:true}).catch(()=>{});
  await ctx.close();
}

// (2) reduced-motion on #/blob: is 83 real and does PRM suppress anything?
for (const rm of ["reduce","no-preference"]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion: rm });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/blob", { waitUntil:"networkidle", timeout:45000 });
  await p.waitForTimeout(5000);
  const r = await p.evaluate(()=>{
    const a = document.getAnimations ? document.getAnimations() : [];
    const running = a.filter(x=>x.playState==="running");
    const names = running.map(x=>{ try { return (x.animationName)||(x.effect&&x.effect.target&&x.effect.target.tagName)||"?"; } catch(e){ return "?"; } });
    const counts = {}; for(const n of names) counts[n]=(counts[n]||0)+1;
    return { total: a.length, running: running.length, byName: counts,
      prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
      rafCanvases: document.querySelectorAll("canvas").length };
  });
  console.log(`blob reducedMotion=${rm}:`, JSON.stringify(r));
  await ctx.close();
}

// (3) keyboard: how many tabs to leave body on #/gradient?
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900} });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil:"networkidle", timeout:45000 });
  await p.waitForTimeout(2500);
  const seq=[];
  for (let i=0;i<25;i++){ await p.keyboard.press("Tab"); await p.waitForTimeout(70);
    seq.push(await p.evaluate(()=>{const a=document.activeElement;return a?a.tagName.toLowerCase()+"["+((a.getAttribute("aria-label")||a.textContent||"").trim().slice(0,18))+"]":"null";})); }
  console.log("gradient tab sequence:", JSON.stringify(seq));
}
await b.close();
