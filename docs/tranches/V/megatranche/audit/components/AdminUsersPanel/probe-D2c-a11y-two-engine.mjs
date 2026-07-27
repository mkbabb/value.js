import { webkit, chromium } from "@playwright/test";
const NOW="2026-07-05T00:00:00.000Z";
const USERS=[{slug:"mbabb",createdAt:NOW,status:"active",paletteCount:12},
 {slug:"empty-ghost-account-aaaa-33",createdAt:NOW,status:"active",paletteCount:0}];
for (const [name,E] of [["webkit",webkit],["chromium",chromium]]) {
 const b=await E.launch();
 const ctx=await b.newContext({viewport:{width:1440,height:900}});
 await ctx.addInitScript(()=>localStorage.setItem("palette-admin-token","probe"));
 const p=await ctx.newPage();
 await p.route(/transport\/client\.ts/,async r=>{const res=await r.fetch();let t=await res.text();t=t.replace(/"https:\/\/api\.color\.babb\.dev"/g,'"http://localhost:9000"');await r.fulfill({status:200,headers:{"content-type":"application/javascript"},body:t});});
 await p.route(u=>{try{return new URL(u).pathname.startsWith("/admin/")}catch{return false}},r=>{
  const u=new URL(r.request().url());
  if(u.pathname==="/admin/users")return r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:USERS,total:2,limit:50,offset:0})});
  return r.fulfill({status:200,contentType:"application/json",body:"{}"});});
 await p.route(u=>/api\.color\.babb\.dev/.test(u),r=>r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:[],total:0})}));
 await p.goto("http://localhost:9000/#/admin/users",{waitUntil:"load"});
 await p.waitForTimeout(4000);
 const ax = await p.locator('[role="button"][aria-expanded]').first().ariaSnapshot();
 console.log("=== "+name+" ariaSnapshot of the disclosure row ===");
 console.log(ax);
 // tab reachability of the per-row trash
 await p.evaluate(()=>document.querySelector("input")?.focus());
 const order=[];
 for(let i=0;i<26;i++){ await p.keyboard.press("Tab");
   order.push(await p.evaluate(()=>{const a=document.activeElement;return (a.tagName+"|"+(a.getAttribute("aria-label")||a.textContent.trim().slice(0,20))+"|role="+(a.getAttribute("role")||"")).slice(0,60);}));
 }
 console.log("TAB ORDER:", JSON.stringify([...new Set(order)],null,0));
 await b.close();
}
