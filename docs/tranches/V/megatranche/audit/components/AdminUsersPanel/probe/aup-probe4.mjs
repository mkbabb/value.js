import { chromium, webkit } from "playwright";
const E=process.argv[2]??"chromium", ONLY=process.argv[3]??"all";
const CORS={"access-control-allow-origin":"*","access-control-allow-headers":"authorization,content-type","access-control-allow-methods":"GET,POST,PUT,PATCH,DELETE,OPTIONS"};
const NOW="2026-07-05T00:00:00.000Z";
const USERS=[{slug:"azure-fox-01",createdAt:NOW,paletteCount:4},{slug:"crimson-owl-77",createdAt:NOW,paletteCount:1},{slug:"verdant-mole-33",createdAt:NOW,paletteCount:0}];
const sleep=ms=>new Promise(r=>setTimeout(r,ms)), log=console.log;
async function boot(browser,opts={}){
  const ctx=await browser.newContext({viewport:{width:1440,height:900}});
  await ctx.addInitScript(()=>localStorage.setItem("palette-admin-token","tok"));
  const page=await ctx.newPage();
  await page.route("**/sessions",r=>r.fulfill({status:200,contentType:"application/json",headers:CORS,body:'{"token":"t","userSlug":"u"}'}));
  await page.route("**/admin/**",async route=>{const u=new URL(route.request().url()),m=route.request().method();
    if(!u.pathname.startsWith("/admin/"))return route.continue();
    if(m==="OPTIONS")return route.fulfill({status:204,headers:CORS,body:""});
    opts.onCall?.(m,u.pathname);
    const json=(b,s=200)=>route.fulfill({status:s,contentType:"application/json",headers:CORS,body:b});
    if(m==="POST"&&u.pathname.includes("prune-empty")){ if(opts.hangPrune){await sleep(45000);} return json('{"pruned":1}'); }
    if(m==="DELETE")return json('{"deleted":true}');
    if(/^\/admin\/users\/[^/]+\/palettes$/.test(u.pathname))return json("[]");
    if(u.pathname==="/admin/users")return json(JSON.stringify({data:USERS,total:3,limit:50,offset:0}));
    return json('{"data":[],"total":0,"limit":50,"offset":0}');});
  await page.goto("http://localhost:9124/#/admin/users",{waitUntil:"domcontentloaded"});
  await page.waitForSelector("main"); await sleep(2500); return {ctx,page};
}
const openPrune=async page=>{await page.getByRole("button",{name:/Prune empty/}).first().click({force:true}); await sleep(400);};
// H1 · a hung POST leaves the button spinning forever (no timeout/abort anywhere)
async function H1(browser){
  const {ctx,page}=await boot(browser,{hangPrune:true});
  await openPrune(page);
  await page.getByRole("button",{name:"Prune",exact:true}).last().click({force:true});
  for(const t of [1000,5000,10000]){ await sleep(t===1000?1000:t-1000);
    const st=await page.evaluate(()=>{const b=[...document.querySelectorAll("main button")].find(b=>/Prune empty/.test(b.innerText));
      return {disabled:b?.disabled, spinner:!!b?.querySelector(".animate-spin")};});
    log(`  H1 t+${t}ms prune button:`, JSON.stringify(st)); }
  log("  H1 no AbortController/timeout exists in demo/platform/transport — the spinner is terminal");
  await ctx.close();
}
// H2 · the confirm footer has no re-entrancy guard: double-click fires twice
async function H2(browser){
  const calls=[]; const {ctx,page}=await boot(browser,{onCall:(m,p)=>calls.push(m+" "+p)});
  await openPrune(page);
  const btn=page.getByRole("button",{name:"Prune",exact:true}).last();
  await btn.dblclick({force:true});
  await sleep(1200);
  log("  H2 prune POSTs after ONE dblclick:", JSON.stringify(calls.filter(c=>c.includes("prune"))));
  await ctx.close();
}
const P={H1,H2};
const b=await (E==="webkit"?webkit:chromium).launch();
for(const [k,fn] of Object.entries(P)){ if(ONLY!=="all"&&ONLY!==k)continue; log(`\n== ${E} ${k} ==`); try{await fn(b);}catch(e){log("  !!",e.message.split("\n")[0]);} }
await b.close();
