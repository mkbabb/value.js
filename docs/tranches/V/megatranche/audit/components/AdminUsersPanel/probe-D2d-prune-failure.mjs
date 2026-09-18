import { webkit } from "@playwright/test";
const NOW="2026-07-05T00:00:00.000Z";
const USERS=[{slug:"mbabb",createdAt:NOW,status:"active",paletteCount:12},
 {slug:"empty-ghost-account-aaaa-33",createdAt:NOW,status:"active",paletteCount:0},
 {slug:"empty-ghost-account-aaaa-77",createdAt:NOW,status:"active",paletteCount:0}];
const OUT="/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel/frames-D2";
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
await ctx.addInitScript(()=>localStorage.setItem("palette-admin-token","probe"));
const p=await ctx.newPage();
p.on("console",m=>{if(m.type()==="warning")console.log("[warn]",m.text().slice(0,120));});
await p.route(/transport\/client\.ts/,async r=>{const res=await r.fetch();let t=await res.text();t=t.replace(/"https:\/\/api\.color\.babb\.dev"/g,'"http://localhost:9000"');await r.fulfill({status:200,headers:{"content-type":"application/javascript"},body:t});});
await p.route(u=>{try{return new URL(u).pathname.startsWith("/admin/")}catch{return false}},r=>{
 const u=new URL(r.request().url()); const req=r.request();
 if(req.method()==="POST"&&u.pathname.includes("prune"))
   return r.fulfill({status:500,contentType:"application/problem+json",body:JSON.stringify({type:"about:blank",title:"Internal Server Error",status:500,detail:"prune failed"})});
 if(u.pathname==="/admin/users")return r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:USERS,total:3,limit:50,offset:0})});
 return r.fulfill({status:200,contentType:"application/json",body:"{}"});});
await p.route(u=>/api\.color\.babb\.dev/.test(u),r=>r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:[],total:0})}));
await p.goto("http://localhost:9000/#/admin/users",{waitUntil:"load"});
await p.waitForTimeout(4000);
await p.locator("button",{hasText:"Prune empty"}).click();
await p.waitForTimeout(700);
await p.locator('[role="dialog"] button',{hasText:"Prune"}).last().click();
await p.waitForTimeout(1800);
await p.screenshot({path:`${OUT}/G-prune-FAILED-desktop-light.png`});
const r=await p.evaluate(()=>({
  message:[...document.querySelectorAll("span")].map(s=>s.textContent.trim()).find(t=>/^Pruned|^No empty users/.test(t))||null,
  headerBadge:document.querySelector('[data-slot="badge"]')?.textContent.trim(),
  toolbar:[...document.querySelectorAll("span")].map(s=>s.textContent.trim()).filter(t=>/^\d+ users?$/.test(t)||/empty$/.test(t)),
  rowsStillRendered:document.querySelectorAll("div.rounded-md.border.border-card-edge").length,
  anyErrorRole:!!document.querySelector('[role="alert"]'),
}));
console.log("PRUNE-FAILURE:",JSON.stringify(r,null,1));
await b.close();
