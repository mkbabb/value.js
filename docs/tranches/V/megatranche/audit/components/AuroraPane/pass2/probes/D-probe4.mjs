import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await p.click("[aria-label='Palette harmony']");
await p.waitForTimeout(600);
console.log(await p.evaluate(() => {
  const its = Array.from(document.querySelectorAll("[role='option']"));
  return its.slice(0,2).map(i => ({ sel: i.getAttribute("aria-selected"), html: i.outerHTML.replace(/\s+/g," ").slice(0, 700) }));
}));
await b.close();
