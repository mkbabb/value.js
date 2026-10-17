// X-DS fourier pass 6 cure (critic P6) AFTER probe, 2026-10-17. The critic's cells (p6-probe.mjs) re-shot, plus the
// measurements for DS-F6P-C1 (the rail head held), C2 (the port's scrolled hairline) and C3 (the figure blend).
// DS-F6P-C4: every scrolled cell scrolls the real scrollers (scrollAll: each overflow-y auto|scroll element), and
// /paper has top, mid and late cells at both widths in both themes. Headless real Chrome only (§0ei); one browser,
// one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3212"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
const measure = (p) => p.evaluate(() => {
  const r = (e) => { if (!e) return null; const x = e.getBoundingClientRect(); return { top: Math.round(x.top), bottom: Math.round(x.bottom), left: Math.round(x.left) }; };
  const nav = document.querySelector(".sidebar-nav"); const head = document.querySelector(".sidebar-head"); const label = document.querySelector(".sidebar-label");
  const sc = document.querySelector(".paper-scroll"); const fig = document.querySelector("img.paper-figure"); const por = document.querySelector("img.paper-portrait");
  const cs = (e) => (e ? getComputedStyle(e) : null);
  return {
    rail: nav ? { navScrollTop: Math.round(nav.scrollTop), nav: r(nav), head: r(head), label: r(label), headFill: cs(head)?.backgroundColor, headHeldAtTop: head ? Math.abs(head.getBoundingClientRect().top - nav.getBoundingClientRect().top) <= 1 : null, labelInView: label && nav ? label.getBoundingClientRect().top >= nav.getBoundingClientRect().top - 1 : null } : null,
    port: sc ? { scrollTop: Math.round(sc.scrollTop), scrolled: sc.hasAttribute("data-scrolled"), top: r(sc), borderTop: cs(sc).borderTopWidth + " " + cs(sc).borderTopColor, border: getComputedStyle(document.documentElement).getPropertyValue("--border").trim() } : null,
    figure: fig ? { blend: cs(fig).mixBlendMode, filter: cs(fig).filter } : null,
    portrait: por ? { blend: cs(por).mixBlendMode } : null,
  };
});
try {
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  try {
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
    const scrollAll = (frac) => p.evaluate((f) => { const n = []; for (const e of document.querySelectorAll("*")) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 40) { e.scrollTop = (e.scrollHeight - e.clientHeight) * f; n.push((e.className?.baseVal ?? e.className) + ""); } } window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f); return n; }, frac);
    try {
      await go("/paper", 4000); o.paperTop = await measure(p); await shot(p, `paper-${k}`);
      o.paperScrollers = await scrollAll(0.35); await p.waitForTimeout(1500); o.paperMid = await measure(p); await shot(p, `paper-mid-${k}`);
      await scrollAll(0.7); await p.waitForTimeout(1500); o.paperLate = await measure(p); await shot(p, `paper-late-${k}`);
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
  } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f6p-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
