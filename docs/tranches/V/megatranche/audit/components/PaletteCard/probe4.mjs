import { webkit } from "playwright";
const now="2026-07-24T00:00:00.000Z";
const mk=(n,s,c,e={})=>({id:s,name:n,slug:s,colors:c.map((css,i)=>({css,position:i})),createdAt:now,updatedAt:now,isLocal:true,...e});
const STORE={version:1,palettes:[mk("Featured One","featured-one",["#001219","#005f73","#0a9396"],{tier:"featured",tags:["warm","earthy","autumn","fourth"],forkCount:3,versionCount:4,forkOf:"x"})]};
const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},colorScheme:"light"});const p=await ctx.newPage();
await p.addInitScript(s=>localStorage.setItem("color-palettes",JSON.stringify(s)),STORE);
await p.goto("http://localhost:9000/#/palettes",{waitUntil:"load"});await p.waitForTimeout(3500);
console.log(JSON.stringify(await p.evaluate(()=>{
  const card=document.querySelector('[role="article"]');
  const chip=card.querySelector('[class*="text-micro"]');
  const cc=chip?getComputedStyle(chip):null;
  const strip=card.querySelector('[class*="rounded-t-card"]');
  const scs=strip?getComputedStyle(strip):null;
  const doc=getComputedStyle(document.documentElement);
  const tag=[...card.querySelectorAll('[class*="bg-muted"]')][0];
  const tcs=tag?getComputedStyle(tag):null;
  return {
    textMicroSize: cc?cs=>0:null,
    microFontSize: cc?cs0=>0:null,
    micro: cc?{size:cc.fontSize, family:cc.fontFamily.split(",")[0], color:cc.color}:null,
    typeRungs:{ micro:doc.getPropertyValue("--type-micro").trim(), small:doc.getPropertyValue("--type-small").trim(), subheading:doc.getPropertyValue("--type-subheading").trim(), monoSmall:doc.getPropertyValue("--type-mono-small").trim(), caption:doc.getPropertyValue("--type-caption").trim() },
    tagChip: tcs?{size:tcs.fontSize,color:tcs.color,bg:tcs.backgroundColor}:null,
    stripAria:{ ariaHidden: strip?strip.getAttribute("aria-hidden"):null, role: strip?strip.getAttribute("role"):null, label: strip?strip.getAttribute("aria-label"):null, tag: strip?strip.tagName:null, kids: strip?strip.children.length:0, kidTitles: strip?[...strip.children].map(k=>k.getAttribute("title")||k.getAttribute("aria-label")):[] },
    articleAccName: card.getAttribute("aria-label"),
    cardTextContent: card.innerText.replace(/\n/g," | ").slice(0,160),
  };
}),null,1));
await b.close();
