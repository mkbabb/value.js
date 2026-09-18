import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", e => errs.push(String(e).slice(0,150)));
await p.goto("http://localhost:9000/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2500);

const names = await p.evaluate(() =>
  [...document.querySelectorAll('button,[role="button"],a')]
    .filter(e => { const r = e.getBoundingClientRect(); return r.width>0 && r.height>0; })
    .map(e => ({ tag:e.tagName.toLowerCase(), name:(e.getAttribute("aria-label")||e.textContent||"").trim().slice(0,32), href:e.getAttribute("href")||null }))
);
console.log("=== visible interactive on / ===");
console.log(JSON.stringify(names, null, 0));

const sig = () => p.evaluate(() => ({
  path: location.pathname,
  textLen: (document.body.innerText||"").trim().length,
  first: (document.querySelector("main")?.innerText||"").trim().slice(0,60).replace(/\s+/g," "),
}));
console.log("\nBEFORE:", JSON.stringify(await sig()));

// open the Tools menu
const tools = p.locator('button:has-text("Tools"), [role="button"]:has-text("Tools")').first();
if (await tools.count()) {
  await tools.click(); await p.waitForTimeout(900);
  const items = await p.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"],[role="option"],[role="menuitemradio"]')]
      .map(e => (e.textContent||"").trim().slice(0,30)).filter(Boolean));
  console.log("TOOLS MENU ITEMS:", JSON.stringify(items));
  if (items.length) {
    const target = items.find(t=>/palette|browse|mix|gradient|extract|generate/i.test(t)) || items[0];
    await p.locator(`[role="menuitem"]:has-text("${target}"), [role="option"]:has-text("${target}")`).first().click().catch(e=>console.log("click err",String(e).slice(0,80)));
    await p.waitForTimeout(2500);
    console.log(`AFTER clicking "${target}":`, JSON.stringify(await sig()));
  }
} else { console.log("no Tools trigger found"); }
console.log("pageErrors:", JSON.stringify(errs));
await b.close();
