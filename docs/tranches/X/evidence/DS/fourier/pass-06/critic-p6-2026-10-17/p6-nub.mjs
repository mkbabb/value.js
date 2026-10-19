// X-DS fourier pass 6 critic: what draws the nub above the /v aside's top hairline once the aside is scrolled; the /paper figure's dark paint. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const BASE = "http://localhost:3100"; const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "dark"); localStorage.setItem("theme", "dark"); } catch {} });
  const p = await ctx.newPage();
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "domcontentloaded" });
  await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => {});
  await p.waitForTimeout(2000);
  for (const n of ["Contour", "Coefficients"]) await p.getByRole("button", { name: new RegExp("^" + n) }).first().click({ timeout: 5000 }).catch(() => {});
  await p.waitForTimeout(1500);
  out.nub = await p.evaluate(() => { for (const e of document.querySelectorAll("*")) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 4) e.scrollTop = 1e6; }
    const r = []; for (let y = 95; y <= 106; y += 1) { const el = document.elementFromPoint(1080, y); r.push([y, el?.tagName, (el?.className?.baseVal ?? el?.className ?? "") + "", el?.getAttribute?.("aria-label") ?? ""]); } return r; });
  await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded" }); await p.waitForTimeout(3000);
  out.fig = await p.evaluate(() => { const i = document.querySelector("img.paper-figure"); if (!i) return null; const s = getComputedStyle(i); return { src: i.currentSrc, filter: s.filter, mix: s.mixBlendMode, bg: s.backgroundColor, cls: i.className }; });
  await ctx.close();
} finally { await b.close(); }
console.log(JSON.stringify(out, null, 1));
