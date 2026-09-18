import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const sig = () => p.evaluate(() => ({ href: location.href.replace(/^https?:\/\/[^/]+/,""), textLen:(document.body.innerText||"").trim().length,
  first:(document.querySelector("main")?.innerText||"").trim().slice(0,50).replace(/\s+/g," ") }));

// 1. in-app switch: does the HASH update?
await p.goto("http://localhost:9000/", { waitUntil:"networkidle", timeout:60000 });
await p.waitForTimeout(2500);
console.log("initial      :", JSON.stringify(await sig()));
await p.locator('button[aria-label="Select view"]').first().click(); await p.waitForTimeout(800);
await p.locator('[role="option"]:has-text("Browse")').first().click(); await p.waitForTimeout(2000);
console.log("after Browse :", JSON.stringify(await sig()));

// 2. deep link via HASH
for (const r of ["#/palettes","#/browse","#/gradient","#/blob","#/admin/users"]) {
  const q = await ctx.newPage();
  await q.goto("http://localhost:9000/"+r, { waitUntil:"networkidle", timeout:45000 }).catch(()=>{});
  await q.waitForTimeout(2200);
  const s = await q.evaluate(() => ({ href: location.href.replace(/^https?:\/\/[^/]+/,""), textLen:(document.body.innerText||"").trim().length,
    first:(document.querySelector("main")?.innerText||"").trim().slice(0,50).replace(/\s+/g," "), title:document.title }));
  console.log("deeplink", r.padEnd(15), JSON.stringify(s));
  await q.close();
}
await b.close();
