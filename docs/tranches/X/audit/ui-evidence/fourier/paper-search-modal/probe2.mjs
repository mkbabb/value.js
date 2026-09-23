// READ-ONLY probe: where does Enter on "Parseval's Identity" land vs where the theorem is.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
await p.waitForTimeout(2500);
const find = () => p.evaluate(() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const hits = []; let n; while ((n = w.nextNode())) { if (/parseval/i.test(n.textContent)) { const r = document.createRange(); r.selectNodeContents(n); const bb = r.getBoundingClientRect(); hits.push({ y: Math.round(bb.y), t: n.textContent.trim().slice(0, 50), anc: n.parentElement.closest("[id]")?.id }); } } return hits.slice(0, 6);
  /* replaced by text walker */


});
const out = { before: await find() };
await p.mouse.click(1430, 450); await p.keyboard.press("Meta+k"); await p.waitForTimeout(700);
await p.locator('[role="dialog"] input').fill("parseval"); await p.waitForTimeout(600);
await p.keyboard.press("Enter");
for (const t of [800, 2500, 5000]) { await p.waitForTimeout(t === 800 ? 800 : t - (t === 2500 ? 800 : 2500)); out[`at${t}`] = { pg: await p.evaluate(() => document.body.innerText.match(/pg\s+\d+\s*\/\s*\d+/)?.[0]), els: await find() }; }
await p.screenshot({ path: `${OUT}1440-light-P2-enter-landing-5s.png` });
await b.close();
writeFileSync(`${OUT}probe2.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
