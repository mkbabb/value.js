import { chromium } from "playwright";
const b = await chromium.launch();
for (const origin of ["http://localhost:8091", "http://127.0.0.1:8091"]) {
  for (const url of [origin + "/", origin + "/#/"]) {
    const ctx = await b.newContext({ viewport:{width:1440,height:900} });
    const p = await ctx.newPage();
    const cons=[], errs=[], failed=[];
    p.on("console", m => { if (m.type()==="error") cons.push(m.text().slice(0,200)); });
    p.on("pageerror", e => errs.push(String(e).slice(0,200)));
    p.on("requestfailed", r => failed.push(r.url().slice(0,110)+" :: "+(r.failure()?.errorText||"")));
    const reqs=[];
    p.on("request", r => reqs.push(r.url().replace(origin,"")));
    await p.goto(url, { waitUntil:"networkidle", timeout:45000 }).catch(e=>errs.push("nav:"+String(e).slice(0,80)));
    await p.waitForTimeout(4000);
    const s = await p.evaluate(() => ({
      textLen: (document.body.innerText||"").trim().length,
      appHtmlLen: (document.querySelector("#app")?.innerHTML||"").length,
      mainCount: document.querySelectorAll("main").length,
      scripts: [...document.querySelectorAll("script")].map(s=>s.src.split("/").pop()||"inline").slice(0,6),
      html: document.documentElement.className,
    }));
    console.log(`\n=== ${url} ===`);
    console.log("  text:", s.textLen, "| #app innerHTML:", s.appHtmlLen, "| main:", s.mainCount, "| htmlClass:", JSON.stringify(s.html));
    console.log("  scripts:", JSON.stringify(s.scripts));
    console.log("  requests:", reqs.length, JSON.stringify(reqs.slice(0,8)));
    console.log("  consoleErrors:", JSON.stringify(cons.slice(0,3)));
    console.log("  pageErrors:", JSON.stringify(errs.slice(0,3)));
    console.log("  failedRequests:", JSON.stringify(failed.slice(0,5)));
    await ctx.close();
  }
}
await b.close();
