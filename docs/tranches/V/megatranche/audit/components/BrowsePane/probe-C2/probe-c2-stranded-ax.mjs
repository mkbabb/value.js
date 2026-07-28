import { chromium } from "playwright";
const SP="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/repro";
const CORS={"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"};
const mk=(n,off,cursor,hasMore)=>({data:Array.from({length:n},(_,i)=>({
 name:`Wall Palette ${off+i+1}`,slug:`wall-palette-${off+i+1}`,
 colors:[{css:"#ff00aa",position:0},{css:"#00aaff",position:1}],oklabColors:[{L:0.7,a:0.1,b:0.0}],
 tags:[],voteCount:0,userSlug:"someone",visibility:"public",tier:"standard",deletedAt:null,
 createdAt:"2026-01-01T00:00:00.000Z",updatedAt:"2026-01-01T00:00:00.000Z",currentHash:"h"+(off+i),
 forkOf:null,forkOfHash:null,forkCount:0,versionCount:1,published:true,atomSetHash:"a"+(off+i),isLocal:false})),
 nextCursor:cursor,hasMore});
const b=await chromium.launch({channel:"chromium",args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
const page=await ctx.newPage();
await page.route(u=>/^http:\/\/localhost:9100\/palettes(\?|$)/.test(u.toString()), async route=>{
  const isCont=route.request().url().includes("cursor=");
  if(isCont) await new Promise(r=>setTimeout(r,2500));
  await route.fulfill({status:200,contentType:"application/json",headers:CORS,body:JSON.stringify(isCont?mk(2,6,null,false):mk(6,0,"c1",true))});
});
await page.route(u=>/^http:\/\/localhost:9100\/(colors\/)?tags/.test(u.toString()),r=>r.fulfill({status:200,contentType:"application/json",headers:CORS,body:"[]"}));
await page.route(u=>/^http:\/\/localhost:9100\/sessions/.test(u.toString()),r=>r.fulfill({status:200,contentType:"application/json",headers:CORS,body:JSON.stringify({slug:"tester"})}));
const out={};
await page.goto("http://localhost:9100/#/browse",{waitUntil:"domcontentloaded"});
await page.waitForTimeout(3500);
const main=page.getByRole("main");
const more=main.getByRole("button",{name:"More from the commons"}).filter({visible:true});
await more.first().click();
await page.waitForTimeout(400);
// stuck state: fire the fresh load mid-continuation
await main.getByPlaceholder("Search the commons...").filter({visible:true}).first().fill("Wall");
await page.waitForTimeout(6000);
out.state = await page.evaluate(()=>{const m=document.querySelector("main");const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
 const q=s=>[...m.querySelectorAll(s)].filter(vis);
 return {skeletons:q('[data-slot="palette-card-skeleton"]').length, roleStatus:q('[role="status"]').length,
   ariaLive:q("[aria-live]").length,
   labelledDivs:q("div[aria-label]").map(d=>({label:d.getAttribute("aria-label"),role:d.getAttribute("role")||"(NO ROLE)"})).filter(d=>d.label.startsWith("Loading")),
   moreBtn:q("button").filter(x=>(x.textContent||"").includes("More from the commons")).length};});
const cdp=await ctx.newCDPSession(page); await cdp.send("Accessibility.enable");
const {nodes}=await cdp.send("Accessibility.getFullAXTree");
out.ax = nodes.filter(n=>(n.name?.value||"").toLowerCase().startsWith("loading")).map(n=>({role:n.role?.value,name:n.name?.value,ignored:n.ignored}));
out.axHasPluralLoadingPalettes = out.ax.some(n=>n.name==="Loading more palettes");
// keyboard reachability of the stuck region
await page.screenshot({path:SP+"/browse-stuck-live.png"});
console.log(JSON.stringify(out,null,1));
await b.close();
