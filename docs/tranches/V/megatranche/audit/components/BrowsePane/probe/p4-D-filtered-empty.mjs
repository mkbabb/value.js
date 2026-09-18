import { webkit } from "playwright";
const OUT="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/shots";
const LAN="http://192.168.1.166:9000";
function pal(i,n,s,c){return{_id:`id${i}`,slug:s,name:n,colors:c.map((x,j)=>({css:x,name:`c${j}`,position:j})),userSlug:`user-${i}`,visibility:"public",tier:"free",voteCount:i,voted:false,forkCount:0,tags:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};}
const DATA={data:[pal(1,"Sunset Commons","sunset-commons",["#e5989b","#ffb4a2","#b5838d"]),pal(2,"Mine","mine",["#003049","#d62828"])],nextCursor:null,hasMore:false};
const EMPTY={data:[],nextCursor:null,hasMore:false};
let mode="full";
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
const page=await ctx.newPage();
await page.route("**://api.color.babb.dev/**",async r=>{const u=r.request().url();let bo=mode==="full"?DATA:EMPTY;
  if(u.includes("/tags"))bo=[{name:"warm",count:1}];else if(u.includes("/session"))bo={token:"t",userSlug:"mbabb"};
  await r.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify(bo)});});
await page.goto(`${LAN}/#/browse`,{waitUntil:"load"});await page.waitForTimeout(5000);
// Type a query that returns nothing
mode="empty";
await page.locator(".search-seated input").first().fill("zzzznotathing");
await page.waitForTimeout(2500);
const filteredEmpty = await page.evaluate(()=>{
  const g=document.querySelector(".palette-card-grid");
  return { text:g?.innerText.replace(/\n/g," | "), role:g?.querySelector('[role="status"],[role="alert"]')?.getAttribute("role"),
           inputVal:document.querySelector(".search-seated input").value };
});
await page.screenshot({path:`${OUT}/filtered-empty.png`});
// sortLoading dim: check opacity while a sort request is in flight
const dim = await page.evaluate(()=>{const g=document.querySelector(".palette-card-grid");
  return {cls:g?.className, op:getComputedStyle(g).opacity};});
// swatch hover path on expanded card
mode="full";
await page.locator(".search-seated input").first().fill("");
await page.waitForTimeout(2200);
await page.locator('[role="article"]').first().click();
await page.waitForTimeout(700);
const dots = await page.evaluate(()=>{
  const art=document.querySelector('[role="article"]');
  const sw=[...art.querySelectorAll('[data-slot],button,[role]')].map(e=>({t:e.tagName.toLowerCase(),ds:e.getAttribute("data-slot"),r:e.getAttribute("role"),ti:e.tabIndex,al:e.getAttribute("aria-label")}));
  return sw.slice(0,24);
});
console.log(JSON.stringify({filteredEmpty,dim,dots},null,1));
await b.close();
