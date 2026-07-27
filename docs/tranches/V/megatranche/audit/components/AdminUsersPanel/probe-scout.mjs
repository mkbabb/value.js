import { chromium } from "playwright";
const USERS=[{slug:"alpha-keeper-0001",paletteCount:4},{slug:"beta-drifter-0002",paletteCount:2},{slug:"gamma-empty-0003",paletteCount:0},{slug:"delta-empty-0004",paletteCount:0},{slug:"epsilon-empty-0005",paletteCount:0}];
const CORS={"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"};
const ORIGIN=process.argv[2]||"http://127.0.0.2:9000";
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:900}});
await c.addInitScript(`localStorage.setItem('palette-admin-token','X');localStorage.setItem('vueuse-color-scheme','light')`);
await c.route("**/api.color.babb.dev/**",r=>{
  if(r.request().method()==="OPTIONS") return r.fulfill({status:204,headers:CORS});
  const u=r.request().url();
  if(/\/admin\/users\?/.test(u)) return r.fulfill({status:200,headers:CORS,contentType:"application/json",body:JSON.stringify({data:USERS,total:5,limit:50,offset:0})});
  return r.fulfill({status:200,headers:CORS,contentType:"application/json",body:"[]"});
});
const p=await c.newPage();
p.on("console",m=>{if(m.type()==="error")console.log("CONSOLE-ERR:",m.text().slice(0,140))});
await p.goto(ORIGIN+"/#/admin/users",{waitUntil:"domcontentloaded"});await p.waitForTimeout(4000);
console.log(JSON.stringify(await p.evaluate(()=>{
 const qa=s=>[...document.querySelectorAll(s)];
 return {mainText:(document.querySelector("main")?.innerText||"").replace(/\s+/g," ").slice(0,260),
 rows:qa('[role="button"][aria-expanded]').length,
 shells:qa("main .rounded-md.border.border-card-edge.overflow-hidden").length,
 btns:qa("main button").map(x=>(x.getAttribute("aria-label")||x.textContent||"").trim().slice(0,32))};
}),null,1));
await b.close();
