import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" });
const p = await ctx.newPage();
const cons=[],errs=[],failed=[];
p.on("console",m=>{if(m.type()==="error")cons.push(m.text().slice(0,180))});
p.on("pageerror",e=>errs.push(String(e).slice(0,180)));
p.on("requestfailed",r=>failed.push(r.url().slice(0,90)+" :: "+(r.failure()?.errorText||"")));
const resp = await p.goto("https://color.babb.dev/", { waitUntil:"networkidle", timeout:60000 }).catch(e=>{errs.push("nav:"+String(e).slice(0,100));return null});
await p.waitForTimeout(5000);
const s = await p.evaluate(() => ({
  status: "loaded", textLen:(document.body.innerText||"").trim().length,
  appLen:(document.querySelector("#app")?.innerHTML||"").length,
  main:document.querySelectorAll("main").length, h1:document.querySelectorAll("h1").length,
  title:document.title, href:location.href,
  firstText:(document.body.innerText||"").trim().slice(0,120).replace(/\s+/g," "),
})).catch(e=>({err:String(e).slice(0,120)}));
console.log("HTTP:", resp && resp.status());
console.log(JSON.stringify(s,null,1));
console.log("consoleErrors:", JSON.stringify(cons.slice(0,4)));
console.log("pageErrors:", JSON.stringify(errs.slice(0,4)));
console.log("failed:", JSON.stringify(failed.slice(0,4)));
await p.screenshot({path:"docs/tranches/V/megatranche/audit/visual/shots/LIVE-color.babb.dev.png", fullPage:true}).catch(()=>{});
await b.close();
