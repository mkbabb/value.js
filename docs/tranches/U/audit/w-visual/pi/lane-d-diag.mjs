import { chromium } from "@playwright/test";
const PORT=8594; const BASE=`http://127.0.0.1:${PORT}/#`;
const browser=await chromium.launch({headless:true,args:["--use-gl=angle","--use-angle=swiftshader"]});

async function probe(label, setup){
  const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,colorScheme:"dark"});
  const page=await ctx.newPage();
  await setup(page);
  await page.goto(`${BASE}/?space=oklch&color=${encodeURIComponent("oklch(0.6 0.18 30)")}`,{waitUntil:"networkidle"});
  await page.waitForTimeout(1600);
  const s=await page.evaluate(()=>{
    const el=document.documentElement;
    const cs=getComputedStyle(el);
    // resolve light-dark via a real element
    const d=document.createElement("div"); d.style.color="var(--foreground)"; document.body.appendChild(d);
    const fg=getComputedStyle(d).color;
    d.style.color="var(--shadow-color)"; const sc=getComputedStyle(d).color;
    d.remove();
    return { hasDark: el.classList.contains("dark"), colorScheme: el.style.colorScheme,
      classList: el.className.toString().slice(0,60), fgResolved: fg, shadowColorResolved: sc,
      ls: (()=>{try{return localStorage.getItem("vueuse-color-scheme");}catch{return "ERR";}})() };
  });
  console.log(label, JSON.stringify(s));
  await ctx.close();
}

// strategy A: addInitScript localStorage only
await probe("A(ls-only)", async(page)=>{ await page.addInitScript(()=>localStorage.setItem("vueuse-color-scheme","dark")); });
// strategy B: addInitScript + post-load toggle
await probe("B(ls+toggle)", async(page)=>{ await page.addInitScript(()=>localStorage.setItem("vueuse-color-scheme","dark")); });
// strategy C: emulate only (no ls)
await probe("C(emulate-only)", async(page)=>{});

await browser.close();
