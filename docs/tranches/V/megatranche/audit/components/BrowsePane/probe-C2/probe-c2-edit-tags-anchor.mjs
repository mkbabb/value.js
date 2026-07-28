import { chromium } from "playwright";
const SP="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/repro";
const CORS={"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*","access-control-expose-headers":"*"};
const ME="tester";
const mk=(n,off,cursor,hasMore)=>({data:Array.from({length:n},(_,i)=>({
 name:`Wall Palette ${off+i+1}`,slug:`wall-palette-${off+i+1}`,
 colors:[{css:"#ff00aa",position:0},{css:"#00aaff",position:1}],oklabColors:[{L:0.7,a:0.1,b:0.0}],
 tags:["warm"],voteCount:0,userSlug:ME,visibility:"public",tier:"standard",deletedAt:null,
 createdAt:"2026-01-01T00:00:00.000Z",updatedAt:"2026-01-01T00:00:00.000Z",currentHash:"h"+(off+i),
 forkOf:null,forkOfHash:null,forkCount:0,versionCount:1,published:true,atomSetHash:"a"+(off+i),isLocal:false})),
 nextCursor:cursor,hasMore});
const b=await chromium.launch({channel:"chromium",args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.addInitScript(()=>{ try{localStorage.setItem("palette-user-slug","tester");}catch{} });
const page=await ctx.newPage();
const J=b2=>({status:200,contentType:"application/json",headers:CORS,body:JSON.stringify(b2)});
await page.route("https://api.color.babb.dev/**", async route=>{
  const u=new URL(route.request().url());
  if (route.request().method()==="OPTIONS") return route.fulfill({status:204,headers:CORS});
  if (/^\/palettes$/.test(u.pathname)) return route.fulfill(J(mk(6,0,null,false)));
  if (/tags/.test(u.pathname)) return route.fulfill(J([{id:"t1",name:"warm",category:"mood"},{id:"t2",name:"cool",category:"mood"}]));
  if (/sessions/.test(u.pathname)) return route.fulfill(J({userSlug:ME,token:"tok"}));
  return route.fulfill(J({}));
});
await page.goto("http://192.168.1.166:9000/#/browse",{waitUntil:"domcontentloaded"});
await page.waitForSelector("main",{timeout:30000});
await page.waitForTimeout(3500);
const out={};
// the ON-SCREEN card
const idx = await page.evaluate(()=>{ const a=[...document.querySelectorAll('[role="article"]')];
  return a.findIndex(e=>{const r=e.getBoundingClientRect(); return r.x>=0 && r.width>0 && r.y>=0;}); });
out.onScreenIndex = idx;
const card = page.locator('[role="article"]').nth(idx);
out.cardBox = await card.boundingBox();
await card.getByRole("button",{name:"Palette menu"}).click();
await page.waitForTimeout(400);
out.menuItems = await page.getByRole("menuitem").allInnerTexts();
// KEYBOARD activation (rules out a pointerdown/outside-click race)
for (let i=0;i<5;i++){ await page.keyboard.press("ArrowDown"); await page.waitForTimeout(60); }
out.focusedItem = await page.evaluate(()=> (document.activeElement?.textContent||"").trim().slice(0,20));
await page.keyboard.press("Enter");
await page.waitForTimeout(3000);
out.afterClick = await page.evaluate(()=>{
  const all=[...document.querySelectorAll("body *")];
  const hits=all.filter(e=>{const t=(e.textContent||"");return /\bcool\b/.test(t) && e.children.length<6;})
    .slice(0,4).map(e=>({tag:e.tagName, cls:(e.className&&typeof e.className==="string"?e.className.slice(0,50):""), r:e.getBoundingClientRect().toJSON()}));
  return { tagPickerCandidates: hits,
    popperWrappers: [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].length,
    anyPopoverContent: [...document.querySelectorAll('[data-slot="popover-content"]')].map(e=>({txt:(e.innerText||"").replace(/\s+/g," ").slice(0,50), r:e.getBoundingClientRect().toJSON()})),
    bodyChildCount: document.body.children.length };
});
out.popperDetail = await page.evaluate(()=>{
  const w=[...document.querySelectorAll('[data-reka-popper-content-wrapper]')];
  return { wrappers: w.map(e=>({style:(e.getAttribute("style")||"").slice(0,220), r:e.getBoundingClientRect().toJSON(), text:(e.innerText||"").replace(/\s+/g," ").slice(0,50)})),
           triggers: [...document.querySelectorAll('[data-slot="popover-trigger"], button[aria-haspopup="dialog"]')].map(e=>({tag:e.tagName, r:e.getBoundingClientRect().toJSON()})) };
});
out.paneState = await page.evaluate(`(() => {
  const app = document.querySelector("#app")?.__vue_app__;
  const found=[];
  const walk=(inst,d)=>{ if(!inst||d>60) return; const ss=inst.setupState;
    if(ss && Object.prototype.hasOwnProperty.call(ss,"tagEditOpen") && Object.prototype.hasOwnProperty.call(ss,"cardRefs")){
      found.push({tagEditOpen: ss.tagEditOpen, tagEditPaletteSlug: ss.tagEditPalette && ss.tagEditPalette.slug, versionDrawerOpen: ss.versionDrawerOpen, flagDialogOpen: ss.flagDialogOpen});}
    const visit=v=>{ if(!v) return; if(v.component) walk(v.component,d+1); if(Array.isArray(v.children)) v.children.forEach(visit); };
    visit(inst.subTree); };
  walk(app?._instance,0); return found; })()`);
await page.screenshot({path:SP+"/live8-tagpopover.png"});
console.log(JSON.stringify(out,null,1));
await b.close();
