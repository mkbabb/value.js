import { chromium } from "playwright";
const NOW = new Date().toISOString();
const mk=(c,i)=>({css:c,position:i});
const F={version:1,palettes:[{id:"a",slug:"a",name:"Sunset Ridge",createdAt:NOW,updatedAt:NOW,isLocal:true,colors:["#f4a261","#e76f51","#2a9d8f"].map(mk)}]};
const b=await chromium.launch(); const p=await (await b.newContext({viewport:{width:1440,height:1000}})).newPage();
await p.goto("http://localhost:9000/#/palettes",{waitUntil:"networkidle"});
await p.evaluate(f=>localStorage.setItem("color-palettes",JSON.stringify(f)),F);
await p.reload({waitUntil:"networkidle"}); await p.waitForTimeout(2400);
await p.click('[role="article"]'); await p.waitForTimeout(900);
console.log(JSON.stringify(await p.evaluate(()=>{
  const c=document.querySelector('[role="article"]');
  const rows=[...c.querySelectorAll("div")].filter(d=>d.className&&String(d.getAttribute("class")).includes("flex-wrap"));
  const row=rows[rows.length-1];
  const kids=row?[...row.children]:[];
  return {
    rowClass: row?row.getAttribute("class"):null,
    kidCount: kids.length,
    firstKid: kids[0]?kids[0].outerHTML.slice(0,700):null,
    tagsInRow: kids.map(k=>k.tagName+"/"+(k.firstElementChild?k.firstElementChild.tagName:"-")),
    focusables: [...c.querySelectorAll('a,button,input,select,textarea,[tabindex]')].map(e=>e.tagName+":"+(e.getAttribute("aria-label")||e.getAttribute("tabindex")||"")),
  };
})));
await b.close();
