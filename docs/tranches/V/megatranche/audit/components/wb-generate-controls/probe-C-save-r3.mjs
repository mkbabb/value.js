import { chromium } from "@playwright/test";
const out = (k, v) => console.log(`\n### ${k}\n` + JSON.stringify(v, null, 1));
const b = await chromium.launch({ channel:"chromium", headless:true, args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const ctx = await b.newContext({ viewport:{width:430,height:900} });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/generate", { waitUntil:"load", timeout:60000 });
await p.waitForSelector("[data-generate-plate]", { timeout:30000 });
await p.waitForTimeout(2500);
const input = p.locator("input[aria-label='Palette name']");
await input.fill("ZZ-PROBE-NAME-42");
await p.waitForTimeout(200);
out("1-typed", await input.inputValue());
await p.getByRole("button", { name: "Save palette" }).click();
await p.waitForTimeout(1800);
out("2-storage-after-save", await p.evaluate(() => {
  const hits = [];
  for (let i=0;i<localStorage.length;i++){
    const k = localStorage.key(i); const v = localStorage.getItem(k) ?? "";
    if (/palette/i.test(k) || /Generated Palette|ZZ-PROBE-NAME-42/.test(v))
      hits.push({ key:k, hasProbeName: v.includes("ZZ-PROBE-NAME-42"), hasGenericName: v.includes("Generated Palette"), sample: v.slice(0,200) });
  }
  return hits;
}));
out("3-dom-after-save", await p.evaluate(() => ({
  probeNameInDom: document.body.innerText.includes("ZZ-PROBE-NAME-42"),
  genericNameInDom: (document.body.innerText.match(/Generated Palette/g) || []).length,
})));
await b.close();
