import { chromium } from "playwright";
const seed = { version:1, palettes:[{id:"seed-probe-1",name:"Probe Palette",slug:"probe-palette",colors:[{css:"#ff0055",position:0},{css:"#00ccff",position:1},{css:"#ffcc00",position:2}],createdAt:"2026-07-01T00:00:00.000Z",updatedAt:"2026-07-01T00:00:00.000Z",isLocal:true}]};
const out={};
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:1100}})).newPage();
const errs=[]; p.on("pageerror",e=>errs.push("PAGEERROR "+e.message));
await p.goto("http://localhost:9000/", {waitUntil:"domcontentloaded"});
await p.evaluate(s=>localStorage.setItem("color-palettes",JSON.stringify(s)), seed);
await p.goto("http://localhost:9000/#/mix", {waitUntil:"networkidle"}); await p.reload({waitUntil:"networkidle"});
await p.waitForTimeout(2000);
const palTabs = p.getByRole("button",{name:"Palettes",exact:true});
out.palettesButtons = await palTabs.count();
await palTabs.last().click();
await p.waitForTimeout(1000);
out.afterTab = await p.evaluate(()=> (document.body.innerText||"").replace(/\s+/g," ").slice(0,400));
const trig = p.getByRole("button",{name:"Palette menu"});
out.menuTriggers = await trig.count();
if (out.menuTriggers>0){
  out.nesting = await trig.first().evaluate(el=>{
    const self = el.closest("button");
    let n=self, chain=[];
    while(n){ chain.push(n.tagName+(n.getAttribute("aria-label")?`[${n.getAttribute("aria-label")}]`:"")); n=n.parentElement?.closest("button"); }
    return chain;
  });
  await trig.first().click();
  await p.waitForTimeout(700);
  out.menuItems = await p.$$eval('[role="menuitem"]',els=>els.map(e=>({t:(e.textContent||"").replace(/\s+/g," ").trim(), disabled:e.getAttribute("data-disabled")!==null})));
  const del = p.getByRole("menuitem",{name:/^Delete$/});
  out.deleteVisible = await del.count();
  if (out.deleteVisible){ await del.first().click(); await p.waitForTimeout(1000); }
  out.storeAfter = await p.evaluate(()=>{const r=localStorage.getItem("color-palettes");return r?JSON.parse(r).palettes.map(x=>x.slug):null;});
  out.cardStillThere = await p.getByText("Probe Palette").count();
}
out.pageErrors=errs;
await p.screenshot({path:"./evidence/pass2-L-mix-source-menu.png"});
console.log(JSON.stringify(out,null,2));
await b.close();
