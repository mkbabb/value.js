// SERVED MODEL: claude-opus-5-5 — X.W12.u3: the GitHub row in both identity menus is one line and opens by keyboard and pointer (UIA-V-18/22/71/265/511/516).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, touch, trig] of [[390, 844, true, 'button[aria-label="Menu"]'], [1440, 900, false, "text=@mbabb"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?color=%23abcdef`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const t = p.locator(trig).first(); await t.waitFor({ timeout: 60000 }); await p.waitForTimeout(800);
  const r = { vp: w };
  await t.click(); await p.waitForTimeout(500);
  const row = p.getByRole("menuitem", { name: "GitHub" });
  r.row = await row.evaluate((e) => { const q = e.getBoundingClientRect(); const svg = e.querySelector("svg").getBoundingClientRect(); return { tag: e.tagName, h: Math.round(q.height), iconBesideLabel: Math.abs((svg.y + svg.height / 2) - (q.y + q.height / 2)) < 4, nestedA: !!e.querySelector("a") }; });
  await p.screenshot({ path: `${OUT}u3-github-${w}${process.env.RUN ?? ""}.png` });
  // keyboard: focus the row and press Enter → a popup opens
  const pop1 = ctx.waitForEvent("page", { timeout: 8000 }).then((pg) => pg.url()).catch(() => null);
  await row.focus(); await p.keyboard.press("Enter");
  r.enterOpened = await pop1;
  // pointer: reopen and click the row's pad (left edge, not the label text)
  await t.click(); await p.waitForTimeout(500);
  const pop2 = ctx.waitForEvent("page", { timeout: 8000 }).then((pg) => pg.url()).catch(() => null);
  const bb = await p.getByRole("menuitem", { name: "GitHub" }).boundingBox();
  await p.mouse.click(bb.x + bb.width - 6, bb.y + bb.height / 2);
  r.padClickOpened = await pop2;
  res.push(r); await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u3-github${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
