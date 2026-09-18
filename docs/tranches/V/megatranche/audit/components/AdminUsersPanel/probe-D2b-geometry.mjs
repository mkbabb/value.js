import { webkit } from "@playwright/test";
const NOW="2026-07-05T00:00:00.000Z";
const USERS=[
 {slug:"mbabb",createdAt:NOW,status:"active",paletteCount:12},
 {slug:"an-extremely-long-anonymous-visitor-slug-from-the-wild-2f9a-33",createdAt:NOW,status:"active",paletteCount:3},
 {slug:"empty-ghost-account-aaaa-33",createdAt:NOW,status:"active",paletteCount:0},
 {slug:"empty-ghost-account-aaaa-77",createdAt:NOW,status:"active",paletteCount:0},
 {slug:"zed",createdAt:NOW,status:"active",paletteCount:1},
 {slug:"empty-three-bbbb-11",createdAt:NOW,status:"active",paletteCount:0}];
const b=await webkit.launch();
async function boot(o={}){
 const ctx=await b.newContext({viewport:{width:o.w||1440,height:o.h||900},colorScheme:o.scheme||"light",deviceScaleFactor:2});
 await ctx.addInitScript(()=>localStorage.setItem("palette-admin-token","probe"));
 const p=await ctx.newPage();
 await p.route(/transport\/client\.ts/,async r=>{const res=await r.fetch();let t=await res.text();t=t.replace(/"https:\/\/api\.color\.babb\.dev"/g,'"http://localhost:9000"');await r.fulfill({status:200,headers:{"content-type":"application/javascript"},body:t});});
 await p.route(u=>{try{return new URL(u).pathname.startsWith("/admin/")}catch{return false}},r=>{
   const u=new URL(r.request().url());
   if(u.pathname==="/admin/users")return r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:USERS,total:6,limit:50,offset:0})});
   return r.fulfill({status:200,contentType:"application/json",body:"{}"});});
 await p.route(u=>/api\.color\.babb\.dev/.test(u),r=>r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:[],total:0})}));
 await p.goto("http://localhost:9000/#/admin/users",{waitUntil:"load"});
 await p.waitForTimeout(4000);
 return {ctx,p};
}
for (const scheme of ["light","dark"]) {
 const {ctx,p}=await boot({scheme});
 const m=await p.evaluate(()=>{
  const wraps=[...document.querySelectorAll("div.rounded-md.border.border-card-edge")];
  const rows=wraps.map(w=>{
   const hdr=w.firstElementChild;
   const pill=hdr.querySelector(".slug-pill");
   const badge=pill.parentElement.children[1];
   const acts=hdr.lastElementChild;
   const R=e=>{const q=e.getBoundingClientRect();return{l:+q.left.toFixed(1),r:+q.right.toFixed(1),w:+q.width.toFixed(1)}};
   return {slug:pill.getAttribute("title"), pillW:R(pill).w, badgeL:R(badge).l, badgeText:badge.textContent.trim(),
           actsL:R(acts).l, actsW:R(acts).w, interactive:hdr.getAttribute("role")==="button",
           hdrH:+hdr.getBoundingClientRect().height.toFixed(1)};
  });
  const cs=(el,p)=>getComputedStyle(el)[p];
  const pill0=document.querySelector(".slug-pill");
  const hdrBadge=document.querySelector('[data-slot="badge"]');
  const toolbarSpan=[...document.querySelectorAll("span")].find(s=>/^\d+ users?$/.test(s.textContent.trim()));
  const trash=document.querySelector('button[aria-label^="Delete user"]');
  const palBtn=[...document.querySelectorAll("button")].find(b=>b.textContent.trim()==="Palettes");
  return {rows,
    badgeXs:[...new Set(rows.map(r=>r.badgeL))],
    actsXs:[...new Set(rows.map(r=>r.actsL))],
    pill:{color:cs(pill0,"color"),border:cs(pill0,"borderColor"),bw:cs(pill0,"borderWidth"),fs:cs(pill0,"fontSize"),fw:cs(pill0,"fontWeight"),ff:cs(pill0,"fontFamily").split(",")[0]},
    headerBadgeText:hdrBadge?.textContent.trim(), headerBadgeFS:hdrBadge?getComputedStyle(hdrBadge).fontSize:null,
    toolbarText:toolbarSpan?.textContent.trim(), toolbarFS:toolbarSpan?getComputedStyle(toolbarSpan).fontSize:null,
    toolbarColor:toolbarSpan?getComputedStyle(toolbarSpan).color:null,
    trashColor:trash?getComputedStyle(trash).color:null,
    palBtnColor:palBtn?getComputedStyle(palBtn).color:null,
    paneH1:(()=>{const h=[...document.querySelectorAll("h1,h2")][0];return h?{tag:h.tagName,text:h.textContent.trim().slice(0,20),fs:getComputedStyle(h).fontSize,ff:getComputedStyle(h).fontFamily.split(",")[0]}:null})(),
  };
 });
 console.log("=== "+scheme+" ===");
 console.log(JSON.stringify(m,null,1));
 await ctx.close();
}
await b.close();
