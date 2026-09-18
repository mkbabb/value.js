import { chromium } from "playwright";
const CORS={"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"};
let gen=0;
const mk=(n,off)=>({data:Array.from({length:n},(_,i)=>({
 name:`Wall Palette ${off+i+1}`,slug:`wall-palette-${off+i+1}`,
 colors:[{css:"#ff00aa",position:0},{css:"#00aaff",position:1}],oklabColors:[{L:0.7,a:0.1,b:0.0}],
 tags:[],voteCount:0,userSlug:"someone",visibility:"public",tier:"standard",deletedAt:null,
 createdAt:"2026-01-01T00:00:00.000Z",updatedAt:"2026-01-01T00:00:00.000Z",currentHash:"h"+(off+i),
 forkOf:null,forkOfHash:null,forkCount:0,versionCount:1,published:true,atomSetHash:"a"+(off+i),isLocal:false})),
 nextCursor:null,hasMore:false});
const b=await chromium.launch({channel:"chromium",args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
const page=await ctx.newPage();
await page.route(u=>/^http:\/\/localhost:9100\/palettes(\?|$)/.test(u.toString()), async route=>{
  const off = gen*6; gen++;
  await route.fulfill({status:200,contentType:"application/json",headers:CORS,body:JSON.stringify(mk(6,off))});
});
await page.route(u=>/^http:\/\/localhost:9100\/(colors\/)?tags/.test(u.toString()),r=>r.fulfill({status:200,contentType:"application/json",headers:CORS,body:"[]"}));
await page.route(u=>/^http:\/\/localhost:9100\/sessions/.test(u.toString()),r=>r.fulfill({status:200,contentType:"application/json",headers:CORS,body:JSON.stringify({slug:"tester"})}));

const probe = `(() => {
  const app = document.querySelector("#app")?.__vue_app__;
  const found = [];
  const walk = (inst, d) => {
    if (!inst || d > 60) return;
    const ss = inst.setupState;
    if (ss && Object.prototype.hasOwnProperty.call(ss, "cardRefs") && Object.prototype.hasOwnProperty.call(ss, "displayedBrowse")) {
      const keys = Object.keys(ss.cardRefs);
      let detached = 0, nodes = 0;
      const shapes = [];
      for (const k of keys) { const c = ss.cardRefs[k]; const el = c && c.$el; shapes.push({k, hasEl: !!el, nodeType: el && el.nodeType, connected: el && el.isConnected, ownKeys: c ? Object.keys(c).slice(0,8) : null});
        if (el && el.nodeType === 1 && !el.isConnected) { detached++; nodes += el.querySelectorAll("*").length + 1; } }
      found.push({sample: shapes.slice(0,2)});
      found[found.length-1].keys = keys; found[found.length-1].detachedInstances = detached; found[found.length-1].detachedDomNodes = nodes;
    }
    const subTree = inst.subTree;
    const visit = (v) => { if (!v) return; if (v.component) walk(v.component, d+1); if (Array.isArray(v.children)) v.children.forEach(visit); };
    visit(subTree);
  };
  walk(app?._instance, 0);
  return found;
})()`;

await page.goto("http://localhost:9100/#/browse",{waitUntil:"domcontentloaded"});
await page.waitForTimeout(3500);
const main=page.getByRole("main");
const search = main.getByPlaceholder("Search the commons...").filter({visible:true}).first();
const snap = async (tag) => {
  const r = await page.evaluate(probe) || [];
  const cards = await main.getByRole("article").filter({visible:true}).count();
  console.log(tag, "| visible cards =", cards, "| cardRefs entries =", JSON.stringify(r.map(x=>x.keys.length)), "| DETACHED instances =", JSON.stringify(r.map(x=>x.detachedInstances)), "| detached DOM nodes pinned =", JSON.stringify(r.map(x=>x.detachedDomNodes)), "\n   sample=", JSON.stringify(r[0]?.sample));
};
await snap("after initial load  ");
const qs=["wall","wal","wa","wall ","wall p","wall pa","wall pal","wall pale"];
for (let i=0;i<4;i++){ await search.fill(qs[i]); await page.waitForTimeout(1400); }
await snap("after 4 reloads     ");
for (let i=4;i<8;i++){ await search.fill(qs[i]); await page.waitForTimeout(1400); }
await snap("after 8 reloads     ");
await b.close();
