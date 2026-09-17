import { chromium } from "playwright";
const b=await chromium.launch({headless:true});
const ctx=await b.newContext({viewport:{width:1440,height:900},colorScheme:"light",deviceScaleFactor:2});
await ctx.addInitScript(()=>{try{localStorage.setItem("vueuse-color-scheme","light")}catch(_){}});
const p=await ctx.newPage();
await p.goto("http://localhost:9000/#/",{waitUntil:"load"});
await p.waitForTimeout(3000);
const sampleIFD=async(ms)=>p.evaluate((ms)=>new Promise(res=>{
  const d=[];let last=performance.now();const t0=last;
  const loop=()=>{const n=performance.now();d.push(n-last);last=n;if(n-t0<ms)requestAnimationFrame(loop);else{
    const s=[...d].sort((a,b)=>a-b);res({frames:d.length,max:Math.round(Math.max(...d)),median:Math.round(s[Math.floor(s.length/2)]),over32:d.filter(x=>x>32).length});
  }};requestAnimationFrame(loop);
}),ms);
// STEADY state (no navigation), 1.2s
const steady=await sampleIFD(1200);
console.log("STEADY (no swap): "+JSON.stringify(steady));
// during a swap: start sampling then navigate
const swapPromise=sampleIFD(1200);
await p.waitForTimeout(120);
await p.goto("http://localhost:9000/#/gradient",{waitUntil:"commit"});
const swap=await swapPromise;
console.log("DURING swap→gradient: "+JSON.stringify(swap));
// second steady after
await p.waitForTimeout(1200);
const steady2=await sampleIFD(1200);
console.log("STEADY2 (gradient rest): "+JSON.stringify(steady2));
await ctx.close();await b.close();
