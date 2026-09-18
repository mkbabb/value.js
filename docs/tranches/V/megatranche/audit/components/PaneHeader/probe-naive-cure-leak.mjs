// leak at the veil REST floor (0.52) == the state the naive MT-F023 cure leaves
// a prefers-reduced-motion user in, vs. the terminal 1.0 measured already.
import { webkit, chromium } from "playwright";
const URL="http://localhost:9000/#/gradient";
for (const [n,eng] of [["webkit",webkit],["chromium",chromium]]){
 const b=await eng.launch();
 const ctx=await b.newContext({viewport:{width:1440,height:900},colorScheme:"light",reducedMotion:"reduce"});
 const page=await ctx.newPage();
 await page.goto(URL,{waitUntil:"domcontentloaded",timeout:45000});
 await page.waitForTimeout(2600);
 await page.addStyleTag({content:`.pane-header::before,.pane-header-title,.pane-header-desc-wrap > p{animation:none!important;animation-timeline:auto!important}`});
 await page.evaluate(()=>{const el=document.querySelector(".pane-scroll-fade");const s=document.createElement("div");s.style.height="1200px";el.appendChild(s);el.scrollTop=400;});
 await page.waitForTimeout(800);
 const clip=await page.evaluate(()=>{const r=document.querySelector(".pane-header").getBoundingClientRect();return{x:Math.round(r.left),y:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height+14)}});
 const A=await page.screenshot({clip});
 const veil=await page.evaluate(()=>getComputedStyle(document.querySelector(".pane-header"),"::before").opacity);
 await page.evaluate(()=>{const h=document.querySelector(".pane-scroll-fade");for(const el of h.children) if(!el.classList.contains("pane-header")) el.style.visibility="hidden";});
 await page.waitForTimeout(300);
 const B=await page.screenshot({clip});
 const d=await page.evaluate(async([a,b])=>{const L=(x)=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+x});const[ia,ib]=await Promise.all([L(a),L(b)]);const g=(im)=>{const c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext("2d").drawImage(im,0,0);return c.getContext("2d").getImageData(0,0,c.width,c.height).data};const P=g(ia),Q=g(ib);let mx=0,s=0,o8=0,o24=0,k=0;for(let i=0;i<P.length;i+=4){const q=Math.max(Math.abs(P[i]-Q[i]),Math.abs(P[i+1]-Q[i+1]),Math.abs(P[i+2]-Q[i+2]));mx=Math.max(mx,q);s+=q;if(q>8)o8++;if(q>24)o24++;k++}return{px:k,maxChannelDelta:mx,meanChannelDelta:+(s/k).toFixed(3),pctOver8:+(100*o8/k).toFixed(2),pctOver24:+(100*o24/k).toFixed(2)}},[A.toString("base64"),B.toString("base64")]);
 console.log(`NAIVE-CURE-LEAK ${n} veil=${veil}`,JSON.stringify(d));
 await ctx.close();await b.close();
}
