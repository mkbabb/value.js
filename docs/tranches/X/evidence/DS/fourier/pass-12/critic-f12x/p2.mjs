import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light","dark"]) for (const w of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w>500?900:844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w<500?{isMobile:true,hasTouch:true}:{}) });
    await ctx.addInitScript((t)=>{try{localStorage.setItem("vueuse-color-scheme",t);localStorage.setItem("theme",t);}catch{}}, theme);
    const p = await ctx.newPage(); const logs=[];
    p.on("console", m=>{ if(m.type()==="error") logs.push(m.text().slice(0,200)); });
    p.on("response", r=>{ if(r.url().includes("/api/")) logs.push(r.status()+" "+r.url().slice(0,120)); });
    try {
      for (const [n,path] of [["paper","/paper"],["gallery","/gallery"]]) {
        await p.goto("http://localhost:3141"+path,{waitUntil:"domcontentloaded",timeout:90000});
        await p.waitForLoadState("networkidle",{timeout:30000}).catch(()=>{}); await p.waitForTimeout(8000);
        await p.screenshot({path:`${n}-${theme}-${w}.png`});
        if (n==="paper" && w===1440) { await p.mouse.wheel(0,1400); await p.waitForTimeout(1500); await p.screenshot({path:`${n}-${theme}-${w}-scrolled.png`}); }
      }
      if (theme==="light"&&w===1440) console.log(logs.slice(0,20).join("\n"));
    } finally { await ctx.close(); }
  }
} finally { await b.close(); }
