import { webkit, chromium } from "playwright";
// Keys focus by a UNIQUE DOM PATH, not by label: 35 identically-labelled sliders
// collapse to one key under label-based identity and truncate the walk (probe defect
// caught 2026-07-24 — see L-9). Engine is a parameter because macOS WebKit ships
// Full Keyboard Access OFF, so WebKit tab counts measure the platform, not the app.
const ROUTES=["#/","#/gradient","#/browse","#/admin/users","#/blob"];
const pathOf = () => { const a=document.activeElement; if(!a||a===document.body) return "BODY";
  const seg=[]; let e=a; while(e&&e!==document.documentElement){ const p=e.parentElement; if(!p)break;
    seg.unshift(e.tagName.toLowerCase()+":"+[...p.children].indexOf(e)); e=p; } return seg.join("/"); };
for (const [name,engine] of [["webkit",webkit],["chromium",chromium]]){
  const b=await engine.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900}});
  for (const route of ROUTES){
    const p=await ctx.newPage();
    await p.goto("http://localhost:9000/"+route,{waitUntil:"networkidle",timeout:45000});
    await p.waitForTimeout(2500);
    const operable=await p.evaluate(()=>{
      const sel='a[href],button,input,select,textarea,[tabindex],[role="button"],[role="tab"],[role="slider"],[role="combobox"],[role="switch"],[role="checkbox"]';
      return [...document.querySelectorAll(sel)].filter(el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);
        return r.width>0&&r.height>0&&s.visibility!=="hidden"&&el.getAttribute("tabindex")!=="-1"&&!el.hasAttribute("disabled");}).length;
    });
    const seen=new Set(); let ring=0, bodyHits=0;
    for(let i=0;i<160;i++){
      await p.keyboard.press("Tab"); await p.waitForTimeout(25);
      const k=await p.evaluate(pathOf);
      if(k==="BODY"){ if(++bodyHits>1) break; continue; }
      if(seen.has(k)){ ring=seen.size; break; }
      seen.add(k);
    }
    console.log(`${name.padEnd(9)} ${route.padEnd(14)} operable=${String(operable).padStart(3)} reachable=${String(seen.size).padStart(3)} ring=${ring||seen.size} gap=${operable-seen.size}`);
    await p.close();
  }
  await b.close();
}
