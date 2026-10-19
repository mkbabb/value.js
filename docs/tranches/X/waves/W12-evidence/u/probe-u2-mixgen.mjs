// SERVED MODEL: claude-opus-5-5 — X.W12.u2: Generate swatch copy (UIA-V-41), Generate save name (UIA-V-42), Mix add-slot + from-palettes swatches + [data-mix-target] (UIA-V-40/43).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, permissions: ["clipboard-read", "clipboard-write"] });
  const p = await ctx.newPage();
  const r = { vp: w };
  await p.goto(`${BASE}/?color=%23abcdef#/generate`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const sw = p.locator(".generate-swatch").first();
  await sw.waitFor({ timeout: 60000 });
  r.swatch = await sw.evaluate((el) => ({ tag: el.tagName, aria: el.getAttribute("aria-label"), hidden: el.getAttribute("aria-hidden"), pe: getComputedStyle(el).pointerEvents }));
  await p.evaluate(() => navigator.clipboard.writeText("SENTINEL"));
  await sw.click({ timeout: 5000 }); await p.waitForTimeout(300);
  r.clip = await p.evaluate(() => navigator.clipboard.readText());
  r.swatchAfter = await sw.getAttribute("aria-label");
  await p.screenshot({ path: `${OUT}u2-generate-copied-${w}.png` });
  const name = p.getByLabel("Palette name");
  await name.fill(`U2 Probe ${w}`);
  await p.getByRole("button", { name: "Save palette" }).first().click(); await p.waitForTimeout(500);
  r.saved = await p.evaluate(() => { try { return Object.values(JSON.parse(localStorage.getItem("color-palettes")).palettes ?? {}).map((x) => x.name); } catch (e) { return String(localStorage.getItem("color-palettes")).slice(0, 200); } });
  await p.goto(`${BASE}/?color=%23abcdef#/mix`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const add = p.getByRole("button", { name: "Add current color to the mix" });
  await add.waitFor({ timeout: 60000 });
  r.add = await add.evaluate((el) => ({ tag: el.tagName, aria: el.getAttribute("aria-label"), hidden: el.getAttribute("aria-hidden"), plus: !!el.querySelector("svg") }));
  const chips = () => p.locator("[data-mix-source]").count();
  r.chips0 = await chips();
  await add.click(); await p.waitForTimeout(400);
  r.chips1 = await chips();
  const trig = p.getByText("From palettes").first();
  if (await trig.count()) { await trig.click(); await p.waitForTimeout(500);
    const ps = p.locator(".palette-swatch-add").first();
    r.paletteSwatch = await ps.evaluate((el) => ({ tag: el.tagName, aria: el.getAttribute("aria-label") }));
    await ps.click(); await p.waitForTimeout(400); r.chips2 = await chips(); }
  r.mixEnabled = await p.getByRole("button", { name: /^Mix/ }).first().isEnabled().catch(() => null);
  const mixBtn = p.getByRole("button", { name: /^Mix/ }).first(); if (r.mixEnabled) { await mixBtn.click(); await p.waitForTimeout(250); r.target = await p.locator("[data-mix-target]").evaluate((el) => { const q = el.getBoundingClientRect(); return { tag: el.tagName, w: Math.round(q.width), h: Math.round(q.height) }; }).catch((e) => "absent"); await p.waitForTimeout(2500); }
  await p.screenshot({ path: `${OUT}u2-mix-colors-${w}.png` });
  res.push(r); await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u2-mixgen${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
