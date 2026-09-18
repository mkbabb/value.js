import { webkit } from "@playwright/test";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const aborted = [];
await page.route(/assets\/docs\/.*\.md/, (r) => { aborted.push(r.request().url()); return r.abort("failed"); });
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(9000);
const t = await page.evaluate(() => ({
  alertRole: document.querySelector('.vj-error-boundary')?.textContent?.trim().slice(0,200) ?? null,
  boundaryCount: document.querySelectorAll('.vj-error-boundary').length,
  pickerPresent: !!document.querySelector('.picker-shell'),
  aboutPresent: !!document.querySelector('.about-card'),
  bodyText: document.body.innerText.replace(/\s+/g,' ').slice(0,300),
}));
console.log(JSON.stringify({ abortedUrls: aborted, ...t }, null, 1));
await b.close();
