import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"dark" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil:"networkidle" });
await p.waitForTimeout(3400);
const geom = await p.evaluate(()=>{
  const port=document.querySelector(".specimen-strip").getBoundingClientRect();
  const ts=[...document.querySelectorAll(".specimen-tile")].map(t=>t.getBoundingClientRect());
  const a=ts[1],bb=ts[2];
  return { trough:{x:a.right-port.x+0.5,y:a.top-port.y+8,w:Math.max(2,bb.left-a.right-1),h:20},
           above:{x:a.left-port.x,y:1,w:40,h:6},
           shadow:getComputedStyle(document.querySelector(".specimen-tile")).boxShadow };
});
const on = await p.locator(".specimen-strip").first().screenshot();
await p.addStyleTag({content:".glass-capsule,.glass-chip{box-shadow:none !important;}"});
await p.waitForTimeout(400);
const off = await p.locator(".specimen-strip").first().screenshot();
await b.close();
const b2=await chromium.launch(); const p2=await (await b2.newContext()).newPage(); await p2.goto("about:blank");
console.log(JSON.stringify(await p2.evaluate(async ({on,off,geom,dpr})=>{
  const load=async(u)=>{const i=new Image();await new Promise(r=>{i.onload=r;i.src=u;});const cv=document.createElement("canvas");cv.width=i.width;cv.height=i.height;cv.getContext("2d").drawImage(i,0,0);return cv.getContext("2d");};
  const mean=(ctx,r)=>{const d=ctx.getImageData(Math.round(r.x*dpr),Math.round(r.y*dpr),Math.max(1,Math.round(r.w*dpr)),Math.max(1,Math.round(r.h*dpr))).data;let s=[0,0,0];const n=d.length/4;for(let i=0;i<d.length;i+=4){s[0]+=d[i];s[1]+=d[i+1];s[2]+=d[i+2];}return s.map(v=>+(v/n).toFixed(1));};
  const lum=([r,g,bl])=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};return +(0.2126*f(r)+0.7152*f(g)+0.0722*f(bl)).toFixed(4);};
  const A=await load(on),B=await load(off);
  const tOn=mean(A,geom.trough),tOff=mean(B,geom.trough);
  return { shadow:geom.shadow.slice(0,180), troughOn:tOn, troughOff:tOff, lumOn:lum(tOn), lumOff:lum(tOff), deltaL:+(lum(tOff)-lum(tOn)).toFixed(4) };
},{on:"data:image/png;base64,"+on.toString("base64"),off:"data:image/png;base64,"+off.toString("base64"),geom,dpr:2}),null,1));
await b2.close();
