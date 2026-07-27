import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs=[]; p.on("pageerror",e=>errs.push(String(e).slice(0,150)));
await p.goto("http://localhost:9000/", { waitUntil:"networkidle", timeout:60000 });
await p.waitForTimeout(2500);
const sig = () => p.evaluate(() => ({ path: location.pathname, textLen:(document.body.innerText||"").trim().length,
  first:(document.querySelector("main")?.innerText||"").trim().slice(0,70).replace(/\s+/g," ") }));
console.log("BEFORE:", JSON.stringify(await sig()));

await p.locator('button[aria-label="Select view"]').first().click();
await p.waitForTimeout(1000);
const opts = await p.evaluate(() => [...document.querySelectorAll('[role="option"],[role="menuitem"],[role="menuitemradio"],[data-radix-collection-item],[data-reka-collection-item]')]
  .map(e=>({t:(e.textContent||"").trim().slice(0,24), role:e.getAttribute("role")})).filter(o=>o.t));
console.log("VIEW OPTIONS:", JSON.stringify(opts));

if (opts.length) {
  const pick = opts.find(o=>/palette|browse/i.test(o.t)) || opts[1] || opts[0];
  console.log("clicking:", JSON.stringify(pick.t));
  await p.locator(`[role="option"]:has-text("${pick.t}"), [role="menuitem"]:has-text("${pick.t}")`).first().click().catch(e=>console.log("err",String(e).slice(0,90)));
  await p.waitForTimeout(2500);
  console.log("AFTER :", JSON.stringify(await sig()));
  await p.screenshot({ path:"docs/tranches/V/megatranche/audit/visual/shots/probe-after-view-switch.png", fullPage:true });
}
console.log("pageErrors:", JSON.stringify(errs));
await b.close();
