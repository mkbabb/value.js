// C9b — control: does `location.hash` actually switch the admin sub-view?
import { chromium } from "playwright";
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:900}});
await c.addInitScript(`localStorage.setItem('palette-admin-token','T')`);
await c.route("**/admin/**",r=>{const u=new URL(r.request().url());
 if(!u.pathname.startsWith("/admin/"))return r.continue();
 return r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:[],total:0,limit:50,offset:0})});});
const p=await c.newPage();await p.goto("http://localhost:9077/#/admin/users",{waitUntil:"domcontentloaded"});await p.waitForTimeout(3500);
const before=await p.evaluate(()=>({hash:location.hash,head:(document.querySelector("main")?.innerText||"").slice(0,40)}));
await p.evaluate(()=>{location.hash="#/admin/names"});await p.waitForTimeout(1500);
const after=await p.evaluate(()=>({hash:location.hash,head:(document.querySelector("main")?.innerText||"").slice(0,40),
 usersPanelPresent:(document.querySelector("main")?.innerText||"").includes("Prune empty")}));
console.log(JSON.stringify({before,after},null,1));await b.close();
