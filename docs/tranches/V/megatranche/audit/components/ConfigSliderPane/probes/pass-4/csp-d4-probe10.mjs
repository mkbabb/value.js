import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/blob", { waitUntil:"domcontentloaded", timeout:120000 });
await p.waitForTimeout(12000);
const o = await p.evaluate(() => {
  const btns = [...document.querySelectorAll(".config-action-bar button")];
  return btns.map(b => ({
    outerHTML: b.outerHTML.slice(0, 320),
    attrs: [...b.attributes].map(a => `${a.name}="${a.value}"`),
    emphasisAttr: b.getAttribute("data-emphasis"),
    dataset: {...b.dataset},
  }));
});
console.log(JSON.stringify(o,null,1));
await b.close();
