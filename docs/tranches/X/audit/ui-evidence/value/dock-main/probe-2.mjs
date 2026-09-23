// dock-main probe 2: 390 action-bar overflow; admin-authenticated picker dock (expanded); lamp a11y name at 390.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const res = {};
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" }); await p.waitForTimeout(5000);
  await p.getByRole("button", { name: "Toggle action bar" }).click(); await p.waitForTimeout(1000);
  res.overflow390 = await p.evaluate(() => [...document.querySelectorAll(".glass-dock, .glass-dock *")].filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX !== "visible").map((e) => ({ cls: String(e.className).slice(0, 60), sw: e.scrollWidth, cw: e.clientWidth, ox: getComputedStyle(e).overflowX })));
  res.lastCtl390 = await p.evaluate(() => { const d = document.querySelector(".glass-dock").getBoundingClientRect(); const t = document.querySelector('[aria-label="Open color input"]').getBoundingClientRect(); return { dockRight: Math.round(d.right), ctlRight: Math.round(t.right) }; });
  await p.screenshot({ path: `${OUT}m-light-16-actionbar-full-band.png`, clip: { x: 0, y: 0, width: 390, height: 100 } });
  await c.close();
}
{
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  await c.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "audit-ui-only-token"); } catch {} });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" }); await p.waitForTimeout(5000);
  const d = await p.evaluate(() => { const r = document.querySelector(".glass-dock").getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
  await p.screenshot({ path: `${OUT}d-light-24-admin-auth-picker-dock.png`, clip: { x: d[0] - 24, y: 0, width: d[2] + 48, height: d[3] + 40 } });
  // is there any logout path for admin-without-slug on desktop?
  res.adminPill = await p.evaluate(() => { const s = document.querySelector(".glass-dock .slug-pill"); return s ? { tag: s.tagName, role: s.getAttribute("role"), tabindex: s.getAttribute("tabindex"), text: s.textContent.trim() } : null; });
  await c.close();
}
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.route("**/*", (r) => (new URL(r.request().url()).host === "localhost:3000" ? r.abort() : r.continue()));
  await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" }); await p.waitForTimeout(5000);
  const snap = await p.locator(".dock-status-lamp").ariaSnapshot().catch((e) => "ERR " + e.message.slice(0, 80));
  res.lamp390Aria = snap;
  await c.close();
}
writeFileSync(`${OUT}probe-2.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res, null, 1));
await b.close();
