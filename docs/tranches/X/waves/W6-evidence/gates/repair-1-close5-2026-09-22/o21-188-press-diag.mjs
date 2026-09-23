import { chromium } from "@playwright/test";
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
const O = "http://localhost:8973";
async function openView(name){
  const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await page.waitForTimeout(800); }
  await page.getByRole("combobox",{name:"Select view"}).click();
  await page.getByRole("option",{name, exact:true}).click();
}
async function settled(){ for(let i=0;i<150;i++){ const m=await page.evaluate(()=>[".pane-container",".pane-wrapper",".pane-wrapper > *"].flatMap(s=>[...document.querySelectorAll(s)]).some(e=>getComputedStyle(e).transform!=="none")); if(!m) return i; await page.waitForTimeout(100);} return -1; }
await page.goto(O+"/"); await openView("Gradient"); console.log("settle0", await settled());
for (const t of [0,100]) {
  await page.reload({waitUntil:"networkidle"}); console.log("url", page.url());
  await openView("Gradient"); console.log("settle", await settled());
  const live = page.getByRole("main",{name:"Gradient"}).getByTestId("gradient-stop-bar").last();
  const n = await live.locator("[data-stop-id]").count();
  const h = live.locator(`[data-stop-id][aria-valuenow="${t}"]`).first();
  const hb = await h.boundingBox(), rb = await live.boundingBox();
  const x = hb.x+hb.width/2, y = rb.y+4;
  const st = await page.evaluate(()=>({lb:document.querySelectorAll("[role=listbox]").length, bpe:getComputedStyle(document.body).pointerEvents}));
  console.log("state", JSON.stringify(st));
  for(let k=0;k<30;k++){ const q=await page.evaluate(()=>({lb:document.querySelectorAll("[role=listbox]").length, bpe:getComputedStyle(document.body).pointerEvents})); if(!q.lb && q.bpe!=="none"){console.log("clear after",k*100,"ms");break;} await page.waitForTimeout(100);}
  const hit = await page.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y); return e? e.tagName+"."+e.className.toString().slice(0,80)+" testid="+e.getAttribute("data-testid"):null; },[x,y]);
  console.log(JSON.stringify({t,n,hb,rb,x,y,vh:page.viewportSize(),scrollY:await page.evaluate(()=>scrollY),hit}));
  await page.mouse.click(x,y); await page.waitForTimeout(1000);
  console.log("after", await live.locator("[data-stop-id]").count());
}
await b.close();
