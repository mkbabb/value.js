// SERVED MODEL: claude-opus-5-5 — X.W12.u3: the chunk-error plate's detail line wraps inside the card at 390 (UIA-V-53). Mix chunk aborted in-browser only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, scheme] of [[390, 844, "light"], [390, 844, "dark"], [1440, 900, "dark"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.route(/\/MixPane\.vue(\?|$)/, (r) => r.abort("failed"));
  await p.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await p.waitForTimeout(2500);
  await p.evaluate(() => { location.hash = "#/mix"; });
  await p.waitForSelector(".pane-plate button", { timeout: 60000 }); await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const plate = document.querySelector(".pane-plate"); const alert = plate.querySelector('[role="alert"]');
    const det = alert?.querySelectorAll("p")[1]; const card = plate.closest(".pane-scroll-fade, [data-slot=card], .card") ?? plate;
    const B = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.x), Math.round(q.width)]; };
    return { plate: B(plate), card: B(card), detail: det ? B(det) : null, detailText: det?.innerText.slice(0, 60), texts: alert ? [...alert.querySelectorAll("p")].map((x) => x.innerText) : null, alertDocOverflow: document.documentElement.scrollWidth > innerWidth, detailSW: det?.scrollWidth, detailCW: det?.clientWidth, docSW: document.documentElement.scrollWidth };
  });
  r.vp = w; r.scheme = scheme; r.inside = r.detail ? (r.detail[0] >= r.plate[0] && r.detail[0] + r.detail[1] <= r.plate[0] + r.plate[1]) : null;
  await p.locator(".pane-plate").scrollIntoViewIfNeeded();
  await p.screenshot({ path: `${OUT}u3-plate-${w}-${scheme}${process.env.RUN ?? ""}.png` });
  res.push(r); await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u3-plate${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
