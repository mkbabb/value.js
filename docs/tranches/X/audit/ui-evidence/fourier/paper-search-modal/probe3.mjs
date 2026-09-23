// READ-ONLY probe: palette Enter landing vs the result's number, several queries, fresh page each.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const res = [];
for (const q of ["parseval", "fourier", "gibbs", "residue theorem", "wronskian"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(2000);
  await p.mouse.click(1430, 450); await p.keyboard.press("Meta+k"); await p.waitForTimeout(600);
  await p.locator('[role="dialog"] input').fill(q); await p.waitForTimeout(600);
  const row = await p.evaluate(() => document.querySelector('[role="option"]')?.textContent.trim().replace(/\s+/g, " ").slice(0, 70));
  await p.keyboard.press("Enter"); await p.waitForTimeout(3000);
  const land = await p.evaluate((q) => {
    const act = document.querySelector('.paper-sidebar [aria-current], [aria-current="location"], [aria-current="true"]');
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n, hit = null;
    const word = q.split(" ")[0];
    while ((n = w.nextNode())) { if (new RegExp(word, "i").test(n.textContent) && !n.parentElement.closest('[role="dialog"], .paper-sidebar, input')) { const r = document.createRange(); r.selectNodeContents(n); const y = Math.round(r.getBoundingClientRect().y); if (!hit || Math.abs(y - 200) < Math.abs(hit.y - 200)) hit = { y, t: n.textContent.trim().slice(0, 40) }; } }
    return { active: act?.textContent.trim().replace(/\s+/g, " ").slice(0, 60), pg: document.body.innerText.match(/pg\s+\d+\s*\/\s*\d+/)?.[0], nearestHit: hit };
  }, q);
  res.push({ q, row, ...land });
  await p.screenshot({ path: `${OUT}1440-light-P3-land-${q.replace(/\s/g, "_")}.png` });
  await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe3.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
