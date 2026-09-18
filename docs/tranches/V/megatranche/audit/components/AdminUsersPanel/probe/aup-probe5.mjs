import { chromium, webkit } from "playwright";
const E=process.argv[2]??"chromium";
const CORS={"access-control-allow-origin":"*","access-control-allow-headers":"authorization,content-type","access-control-allow-methods":"GET,POST,PUT,PATCH,DELETE,OPTIONS"};
const NOW="2026-07-05T00:00:00.000Z";
const USERS=[{slug:"azure-fox-01",createdAt:NOW,paletteCount:4},{slug:"verdant-mole-33",createdAt:NOW,paletteCount:0}];
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),log=console.log;
const b=await (E==="webkit"?webkit:chromium).launch();
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.addInitScript(()=>localStorage.setItem("palette-admin-token","tok"));
const page=await ctx.newPage();
await page.route("**/sessions",r=>r.fulfill({status:200,contentType:"application/json",headers:CORS,body:'{"token":"t","userSlug":"u"}'}));
await page.route("**/admin/**",async route=>{const u=new URL(route.request().url()),m=route.request().method();
 if(!u.pathname.startsWith("/admin/"))return route.continue();
 if(m==="OPTIONS")return route.fulfill({status:204,headers:CORS,body:""});
 const json=(x,s=200)=>route.fulfill({status:s,contentType:"application/json",headers:CORS,body:x});
 if(m==="POST"&&u.pathname.includes("prune-empty"))return json('{"e":1}',500);
 if(u.pathname==="/admin/users"){await sleep(1200);return json(JSON.stringify({data:USERS,total:2,limit:50,offset:0}));}
 return json('{"data":[],"total":0,"limit":50,"offset":0}');});
await page.goto("http://localhost:9124/#/admin/users",{waitUntil:"domcontentloaded"});
await page.waitForSelector("main");
await sleep(700);
log("  LOADING-state live regions in main:", JSON.stringify(await page.evaluate(()=>
  [...document.querySelectorAll("main [aria-live],main [role=status],main [role=alert]")].map(e=>({role:e.getAttribute("role"),label:e.getAttribute("aria-label"),txt:e.innerText.slice(0,20)})))));
await sleep(2500);
await page.getByRole("button",{name:/Prune empty/}).first().click({force:true}); await sleep(400);
await page.getByRole("button",{name:"Prune",exact:true}).last().click({force:true}); await sleep(1200);
log("  AFTER prune failure:", JSON.stringify(await page.evaluate(()=>{
  const span=[...document.querySelectorAll("main span")].find(s=>/prune/i.test(s.textContent??""));
  return { bannerText: span?.textContent?.trim(),
           bannerInLiveRegion: !!span?.closest("[aria-live],[role=status],[role=alert],[role=log]"),
           liveRegionsNow: document.querySelectorAll("main [aria-live],main [role=status],main [role=alert]").length };})));
await b.close();
