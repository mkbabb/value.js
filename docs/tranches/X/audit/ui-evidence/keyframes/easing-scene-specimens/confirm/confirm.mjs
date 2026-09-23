// FRESH CONFIRM probe — READ-ONLY; headed Chromium, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${KF} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const log = { sha, dirty, at: new Date().toISOString() };
const browser = await chromium.launch({ headless: false });
async function open(w, h, scheme) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
  return page;
}
const geo = () => {
  const g = document.querySelector(".specimen-grid"); const cs = getComputedStyle(g);
  const tiles = [...document.querySelectorAll(".specimen-tile")].map(t => { const st = t.querySelector(".tile-stage"); const b = t.querySelector(".tile-ball"); return { n: t.textContent.trim(), w: Math.round(t.getBoundingClientRect().width), stage: st.clientWidth, ballTx: b.style.transform, radius: getComputedStyle(t).borderRadius, ws: getComputedStyle(t).whiteSpace }; });
  return { attrs: [...g.attributes].map(a => a.name), display: cs.display, wrap: cs.flexWrap, radius: cs.borderRadius, bg: cs.backgroundColor, scrollW: g.scrollWidth, clientW: g.clientWidth, parentScrollW: g.parentElement.scrollWidth, parentClientW: g.parentElement.clientWidth, tiles };
};
const p = await open(1440, 900, "light");
log.load = await p.evaluate(geo);
for (const f of ["Bounce", "Steps"]) {
  await p.getByRole("radio", { name: f }).or(p.locator(".family-row button", { hasText: f })).first().click(); await p.waitForTimeout(700);
  log["filter-" + f] = await p.evaluate(geo);
}
await p.screenshot({ path: OUT + "c01-filter-steps-1440-light.png" });
await p.close();
const m = await open(390, 844, "light");
const hs = await m.evaluate(() => { const h = document.querySelector(".glass-drawer-handle"); const b = h?.getBoundingClientRect(); return b ? [b.x, b.y, b.width, b.height] : null; });
if (hs) { await m.mouse.move(hs[0] + hs[2] / 2, hs[1] + hs[3] / 2); await m.mouse.down(); for (let k = 1; k <= 12; k++) { await m.mouse.move(hs[0] + hs[2] / 2, hs[1] - k * 45); await m.waitForTimeout(16); } await m.mouse.up(); await m.waitForTimeout(900); }
log.m390 = await m.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find(b => /ball preview/i.test(b.getAttribute("aria-label") || ""));
  const chain = []; let e = btn; while (e && e !== document.body) { const cs = getComputedStyle(e); if (/(auto|scroll)/.test(cs.overflowY) || e.scrollHeight > e.clientHeight + 2) chain.push({ cls: String(e.className).slice(0, 50), oy: cs.overflowY, sh: e.scrollHeight, ch: e.clientHeight, top: Math.round(e.getBoundingClientRect().top) }); e = e.parentElement; }
  const r = btn?.getBoundingClientRect();
  return { btn: r ? [r.x, r.y, r.width, r.height].map(Math.round) : null, label: btn?.getAttribute("aria-label"), chain, innerH: innerHeight };
});
await m.screenshot({ path: OUT + "c02-390-drawer-expanded-light.png" });
// try wheel-scrolling inside the drawer
await m.mouse.move(195, 600); await m.mouse.wheel(0, 800); await m.waitForTimeout(600);
log.m390.afterWheel = await m.evaluate(() => { const btn = [...document.querySelectorAll("button")].find(b => /ball preview/i.test(b.getAttribute("aria-label") || "")); const r = btn?.getBoundingClientRect(); return r ? Math.round(r.y) : null; });
await m.screenshot({ path: OUT + "c03-390-drawer-after-wheel-light.png" });
await browser.close();
writeFileSync(OUT + "confirm-log.json", JSON.stringify(log, null, 1));
console.log(JSON.stringify(log, null, 1).slice(0, 6000));
