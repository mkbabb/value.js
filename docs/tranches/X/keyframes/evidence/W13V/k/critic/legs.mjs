// SERVED MODEL: claude-opus-5-5
// G-W13V-k3 · the critic's dark legs (the cube re-light, the Amiga grid/shadow) + the mobile Sheet — one
// frame per leg, headed, served dev page. Dark: the app's own theme authority is exercised by its @mbabb
// menu Dark-mode row where present; the page is ALSO emulated prefers-color-scheme: dark so a first paint
// follows the OS. Per leg: the stage luma mean + the html class list (judged with the frames).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL("./legs/", import.meta.url).pathname;
import fs from "node:fs"; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false });
const res = [];
for (const [name, url, vp, scheme] of [
  ["cube-dark", "#/cube", { width: 1440, height: 900 }, "dark"],
  ["amiga-dark", "#/amiga", { width: 1440, height: 900 }, "dark"],
  ["cube-light", "#/cube", { width: 1440, height: 900 }, "light"],
  ["amiga-light", "#/amiga", { width: 1440, height: 900 }, "light"],
]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: scheme });
  const p = await ctx.newPage(); await p.goto("http://localhost:5173/" + url); await p.waitForTimeout(3500);
  const info = await p.evaluate(() => ({ html: document.documentElement.className.slice(0, 80), bg: getComputedStyle(document.body).backgroundColor }));
  await p.screenshot({ path: OUT + name + ".png" });
  res.push({ name, ...info }); await ctx.close();
}
// Mobile Sheet (390x844): open the controls from the dock, frame the open sheet.
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/cube"); await p.waitForTimeout(3500);
  await p.screenshot({ path: OUT + "mobile-closed.png" });
  const opener = await p.evaluate(() => { const e = [...document.querySelectorAll("button[aria-label]")].find((x) => x.offsetParent && /controls/i.test(x.getAttribute("aria-label"))); if (!e) return null; const r = e.getBoundingClientRect(); return { l: e.getAttribute("aria-label"), x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  if (opener) { await p.touchscreen.tap(opener.x, opener.y); await p.waitForTimeout(1200); }
  const sheet = await p.evaluate(() => { const d = [...document.querySelectorAll('[role="dialog"], [data-slot*="sheet"], [class*="sheet"]')].find((x) => x.offsetParent); if (!d) return null; const r = d.getBoundingClientRect(); return { cls: d.className.toString().slice(0, 60), x: r.x, y: +r.y.toFixed(1), w: r.width, h: +r.height.toFixed(1) }; });
  await p.screenshot({ path: OUT + "mobile-sheet-open.png" });
  res.push({ name: "mobile-sheet", opener, sheet }); await ctx.close();
}
for (const r of res) console.log(JSON.stringify(r));
await b.close();
