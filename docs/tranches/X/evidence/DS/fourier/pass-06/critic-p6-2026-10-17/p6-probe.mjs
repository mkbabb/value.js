// X-DS fourier pass 6 critic (2026-10-17): the cells the f5p set lacks: /paper (top + scrolled), the /equation
// aside scrolled to its foot, /v with Contour + Coefficients open, the dock menu open, the 404. Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
try {
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  // scroll the deepest scrollable ancestor chain to its end
  const scrollAll = (frac) => p.evaluate((f) => { const n = []; for (const e of document.querySelectorAll("*")) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 40) { e.scrollTop = (e.scrollHeight - e.clientHeight) * f; n.push((e.className?.baseVal ?? e.className) + ""); } } window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f); return n; }, frac);
  try {
    await go("/paper", 4000); await shot(p, `paper-${k}`);
    o.paperScrollers = await scrollAll(0.35); await p.waitForTimeout(1500); await shot(p, `paper-mid-${k}`);
    await scrollAll(0.7); await p.waitForTimeout(1500); await shot(p, `paper-late-${k}`);
    await go("/equation", 5000); o.eqScrollers = await scrollAll(1); await p.waitForTimeout(1500); await shot(p, `equation-foot-${k}`);
    if (w === 1440) {
      await go(`/v/${SLUG}`, 1000);
      await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v computing", k));
      for (const name of ["Contour", "Coefficients"]) await p.getByRole("button", { name: new RegExp("^" + name) }).first().click({ timeout: 5000 }).catch((e) => console.log("open", name, e.message.slice(0, 80)));
      await p.waitForTimeout(2000); await p.mouse.move(0, 0); await shot(p, `v-open-${k}`);
      await scrollAll(1); await p.waitForTimeout(1200); await shot(p, `v-open-foot-${k}`);
      await go("/gallery", 3000);
      await p.locator(".app-dock button").nth(1).click({ timeout: 5000 }).catch((e) => console.log("dock menu", e.message.slice(0, 80)));
      await p.waitForTimeout(1200); await shot(p, `dock-menu-${k}`);
      await go("/nope-404", 2500); await shot(p, `404-${k}`);
    }
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/p6-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
