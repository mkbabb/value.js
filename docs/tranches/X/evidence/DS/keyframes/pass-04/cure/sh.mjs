import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(6000);
console.log(await p.evaluate(() => {
  const e = document.querySelector(".scene-host"), q = e.parentElement;
  const a = getComputedStyle(e), c = getComputedStyle(q); const d = {};
  for (let i = 0; i < a.length; i++) { const k = a[i]; if (a.getPropertyValue(k) !== c.getPropertyValue(k) && !k.startsWith("--")) d[k] = a.getPropertyValue(k).slice(0, 80); }
  return JSON.stringify({ cls: e.className, attrs: [...e.attributes].map(x => x.name + "=" + x.value.slice(0, 60)), d }, null, 1);
}));
await b.close();
