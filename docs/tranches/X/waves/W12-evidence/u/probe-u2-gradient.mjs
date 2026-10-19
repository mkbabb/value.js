// SERVED MODEL: claude-opus-5-5 — X.W12.u2: gradient band overlap (UIA-V-44), stop-position field (UIA-V-45), direction on radial (UIA-V-147).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme })).newPage();
  const r = { vp: w, scheme };
  await p.goto(`${BASE}/?color=%23abcdef#/gradient`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const tile = p.getByTestId("gradient-render-tile");
  await tile.waitFor({ timeout: 60000 }); await p.waitForTimeout(800);
  const boxes = await p.evaluate(() => {
    const tile = document.querySelector('[data-testid="gradient-render-tile"]').getBoundingClientRect();
    const trig = [...document.querySelectorAll('[role="combobox"]')].filter((e) => ["Type","Space","Hue"].includes(document.getElementById(e.getAttribute("aria-labelledby") ?? "")?.textContent?.trim()));
    const tb = trig.map((e) => { const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.right), Math.round(q.bottom)]; });
    const ov = (a, b2) => a[0] < b2[2] && b2[0] < a[2] && a[1] < b2[3] && b2[1] < a[3];
    const t = [tile.left, tile.top, tile.right, tile.bottom].map(Math.round);
    let overlaps = 0; for (let i = 0; i < tb.length; i++) { if (ov(tb[i], t)) overlaps++; for (let j = i + 1; j < tb.length; j++) if (ov(tb[i], tb[j])) overlaps++; }
    return { triggers: tb, tile: t, overlaps, docW: document.documentElement.scrollWidth };
  });
  Object.assign(r, boxes);
  await tile.scrollIntoViewIfNeeded(); await p.screenshot({ path: `${OUT}u2-gradient-band-${w}-${scheme}.png` });
  // stop position field
  const pos = p.getByLabel(/position/i).first();
  const readPos = () => pos.evaluate((el) => ({ tag: el.tagName, type: el.getAttribute("type"), val: el.value, w: Math.round(el.getBoundingClientRect().width), sw: el.scrollWidth, cw: el.clientWidth, radius: getComputedStyle(el.closest("[data-slot=number-field]") ?? el).borderRadius }));
  if (await pos.count()) { r.posEmpty = await readPos();
    const rail = p.locator("[data-stop-id]").last(); await rail.click(); await p.waitForTimeout(300);
    r.posSelected = await readPos();
    await pos.fill("74.7"); await pos.press("Enter"); await p.waitForTimeout(300);
    r.posTyped = await readPos(); r.stopNow = await p.locator("[data-stop-id]").evaluateAll((els) => els.map((e) => e.getAttribute("aria-valuenow")));
    await pos.scrollIntoViewIfNeeded(); await p.screenshot({ path: `${OUT}u2-gradient-position-${w}-${scheme}.png` }); }
  // radial → direction
  const typeTrig = p.getByRole("combobox").filter({ hasText: /Linear|Radial|Conic/ }).first();
  await typeTrig.click(); await p.getByRole("option", { name: /Radial/ }).first().click(); await p.waitForTimeout(400);
  r.dirOnRadial = await p.getByLabel("Gradient direction").count();
  await typeTrig.click(); await p.getByRole("option", { name: /Conic/ }).first().click(); await p.waitForTimeout(400);
  r.dirOnConic = await p.getByLabel("Conic start angle").count();
  r.dirLabelConic = await p.locator("span.section-label").filter({ hasText: /Direction|From/ }).first().textContent().catch(() => null);
  res.push(r);
}
await b.close();
writeFileSync(`${OUT}probe-u2-gradient${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
