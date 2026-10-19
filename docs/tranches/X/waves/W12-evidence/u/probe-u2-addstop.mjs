// SERVED MODEL: claude-opus-5-5 — X.W12.u2: a rail click mints a stop AND selects it (UIA-V-373).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(`${BASE}/?color=%23abcdef#/gradient`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const insp = p.getByTestId("gradient-stop-inspector");
  await insp.waitFor({ timeout: 60000 }); await p.waitForTimeout(500);
  const r = { vp: w, before: (await insp.innerText()).split("\n")[0] };
  const bar = p.getByTestId("gradient-stop-bar").last();
  const box = await bar.boundingBox();
  await p.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2); await p.waitForTimeout(400);
  r.stops = await p.locator("[data-stop-id]").count();
  r.after = (await insp.innerText()).split("\n")[0];
  r.pos = await p.getByTestId("gradient-stop-position").inputValue();
  res.push(r);
}
await b.close();
writeFileSync(`${OUT}probe-u2-addstop${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
