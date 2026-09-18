import { webkit, devices } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/shots";
const LAN = "http://192.168.1.166:9000";
function pal(i, name, slug, colors) {
  return { _id:`id${i}`, slug, name,
    colors: colors.map((c,j)=>({css:c,name:`c${j}`,position:j})),
    userSlug: i%3===0?"mbabb":`user-${i}`, visibility:"public", tier:"free",
    voteCount:(i*7)%23, voted:false, forkCount:i%4, tags:i%2?["warm","sunset"]:[],
    createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
    oklabColors: colors.map(()=>({L:.6,a:.05,b:.1})) };
}
const DATA = { data:[
  pal(1,"Sunset Commons","sunset-commons",["#e5989b","#ffb4a2","#b5838d","#6d6875","#ffcdb2"]),
  pal(2,"A Very Long Palette Name That Should Truncate","long-name",["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"]),
  pal(3,"Mine","mine-one",["#003049","#d62828","#f77f00","#fcbf49"]),
], nextCursor:"c2", hasMore:true };
async function stub(page){ await page.route("**://api.color.babb.dev/**", async r=>{
  const u=r.request().url(); let b=DATA;
  if(u.includes("/tags")) b=[{name:"warm",count:4}]; else if(u.includes("/session")) b={token:"t",userSlug:"mbabb"};
  await r.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify(b)});});}

const b = await webkit.launch();
const out = {};

// iPhone 14 exact matrix profile
{
  const ctx = await b.newContext({ ...devices["iPhone 14"] });
  const page = await ctx.newPage(); await stub(page);
  await page.goto(`${LAN}/#/browse`, {waitUntil:"load"}); await page.waitForTimeout(5500);
  out.iphone14 = await page.evaluate(()=>{
    const inp = document.querySelector(".search-seated input");
    const cs = inp?getComputedStyle(inp):null;
    const names = [...document.querySelectorAll('[role="article"]')].map(a=>{
      const n = a.querySelector("h3,h4,.palette-name,[data-slot='palette-name']") ||
                [...a.querySelectorAll("*")].find(e=>e.children.length===0 && e.textContent.trim().length>2 && /[A-Za-z]/.test(e.textContent));
      const r = n?.getBoundingClientRect();
      return n?{txt:n.textContent.trim().slice(0,40), cls:String(n.className).slice(0,40), w:Math.round(r.width), sw:n.scrollWidth, cw:n.clientWidth, clipped:n.scrollWidth>n.clientWidth+1, lines:Math.round(r.height/parseFloat(getComputedStyle(n).lineHeight||"1"))}:null;
    });
    // measure the whole card + strip proportions
    const art = document.querySelector('[role="article"]');
    const strip = art?.querySelector('[role="presentation"]');
    return {
      searchFs: cs?.fontSize, searchCw: inp?.clientWidth, searchSw: inp?.scrollWidth,
      phMeasured: (()=>{ if(!inp) return null; const s=document.createElement("span");
        s.style.cssText=`position:absolute;visibility:hidden;white-space:pre;font:${cs.font}`;
        s.textContent=inp.placeholder; document.body.appendChild(s); const w=s.offsetWidth; s.remove(); return Math.round(w); })(),
      names,
      cardH: art?Math.round(art.getBoundingClientRect().height):null,
      stripH: strip?Math.round(strip.getBoundingClientRect().height):null,
      inputName: (()=>{ const i=document.querySelector(".search-seated input");
        return i? {al:i.getAttribute("aria-label"), albl:i.getAttribute("aria-labelledby"), id:i.id, lab:!!(i.id&&document.querySelector(`label[for="${i.id}"]`)), title:i.getAttribute("title")}:null;})(),
      slugShown: document.body.innerText.includes("sunset-commons"),
      artRoles: [...document.querySelectorAll('.palette-card-grid > *')].map(e=>e.getAttribute("role")),
    };
  });
  await page.screenshot({path:`${OUT}/iphone14-browse.png`, fullPage:true});
  // expanded state: click the first card
  await page.locator('[role="article"]').first().click();
  await page.waitForTimeout(900);
  out.expanded = await page.evaluate(()=>{
    const art=document.querySelector('[role="article"]');
    return { h: Math.round(art.getBoundingClientRect().height),
             expandedAttr: art.getAttribute("aria-expanded"),
             pressed: art.getAttribute("aria-pressed"),
             buttons: art.querySelectorAll("button").length,
             text: art.innerText.replace(/\n/g," | ").slice(0,220) };
  });
  await page.screenshot({path:`${OUT}/iphone14-expanded.png`, fullPage:true});
  await ctx.close();
}
// desktop contrast + focus ring on the wall
{
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
  const page = await ctx.newPage(); await stub(page);
  await page.goto(`${LAN}/#/browse`,{waitUntil:"load"}); await page.waitForTimeout(5000);
  await page.locator('[role="article"]').first().click();
  await page.waitForTimeout(800);
  out.deskExpanded = await page.evaluate(()=>{
    const art=document.querySelector('[role="article"]');
    return {h:Math.round(art.getBoundingClientRect().height), buttons:art.querySelectorAll("button").length,
            expandedAttr: art.getAttribute("aria-expanded"), text: art.innerText.replace(/\n/g," | ").slice(0,300)};
  });
  await page.screenshot({path:`${OUT}/desk-expanded.png`});
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out,null,1));
