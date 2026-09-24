// SERVED MODEL: claude-opus-5-5 — X.W12.u3: the not-found dead end on the EmptyState register (UIA-V-183/446/447/449/656).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/#/foo/bar%20baz`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const btn = p.getByRole("button", { name: "Back to the picker" }); await btn.waitFor({ timeout: 60000 }); await p.waitForTimeout(1200);
  const r = { vp: w, scheme };
  r.h1 = await p.getByRole("heading", { level: 1 }).allInnerTexts();
  r.plate = await p.evaluate(() => { const a = document.querySelector('main [role="alert"]'); const ps = a ? [...a.querySelectorAll("p")] : []; return { texts: ps.map((x) => x.innerText), detailFont: ps[1] && getComputedStyle(ps[1]).fontFamily.slice(0, 20), detailColor: ps[1] && getComputedStyle(ps[1]).color }; });
  r.emphasis = await btn.getAttribute("data-emphasis");
  r.bgRest = await btn.evaluate((e) => getComputedStyle(e).backgroundColor);
  await btn.hover(); await p.waitForTimeout(400);
  r.bgHover = await btn.evaluate((e) => getComputedStyle(e).backgroundColor);
  await p.mouse.move(2, 2); await p.waitForTimeout(200);
  await p.screenshot({ path: `${OUT}u3-notfound-${w}-${scheme}${process.env.RUN ?? ""}.png` });
  await btn.click(); await p.waitForTimeout(1500); r.afterHome = new URL(p.url()).hash;
  res.push(r); await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u3-notfound${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
