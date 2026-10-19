// close-5 read-only repro: first navigation of a fresh browser to #/gradient; is the pane stuck in vj-enter-enter-from?
import { chromium } from "playwright";
for (let i = 0; i < 5; i++) {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`http://localhost:8891/#/gradient`, { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(6000);
  console.log(i, JSON.stringify(await p.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]')?.getBoundingClientRect(); return { barX: r && Math.round(r.x), enterFrom: document.querySelectorAll('[class*="vj-enter-enter-from"]').length, enterActive: document.querySelectorAll('[class*="vj-enter-enter-active"]').length }; })));
  await b.close();
}
