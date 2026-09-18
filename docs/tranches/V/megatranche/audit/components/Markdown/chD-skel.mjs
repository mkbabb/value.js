import { webkit } from "@playwright/test";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.route(/assets\/docs\/.*\.md/, async (r) => { await new Promise(x=>setTimeout(x,25000)); return r.continue(); });
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(6000);
const out = await page.evaluate(() => {
  const sk = [...document.querySelectorAll('.skeleton')];
  return sk.map(e => {
    const c = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    return {
      outerHTML: e.outerHTML.slice(0, 200),
      attrs: [...e.attributes].map(a => a.name + '="' + a.value + '"'),
      w: Math.round(r.width), h: Math.round(r.height),
      bg: c.backgroundColor, animation: c.animationName + " " + c.animationDuration,
      borderRadius: c.borderRadius,
      parentDisplay: getComputedStyle(e.parentElement).display,
      parentW: Math.round(e.parentElement.getBoundingClientRect().width),
    };
  });
});
console.log(JSON.stringify(out, null, 1));
await b.close();
