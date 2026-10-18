// X-DS fourier pass 9 cure (critic F9C) AFTER probe, 2026-10-17. Re-shoots the critic's cells and measures:
// L1 /morph at 390 scrolled: the shell's main top rule vs the band's foot rule (one rule only); /morph at 1440 keeps the shell rule.
// L2 /paper at 844x390: the ToC band and bar heights against the title row. T1 /paper at 1440 scrolled: aside top vs article cut.
// T2 /equation and /visualize 1440x900 aside foot (left, framed). Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3219"; const ONLY = process.argv[4];
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => (ONLY ? null : p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message)));
try {
for (const theme of ["light", "dark"]) for (const vp of [[1440, 900], [390, 844], [844, 390]]) {
  const [w, h] = vp; const k = `${theme}-${w}x${h}`; const o = (out[k] = {}); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
  try {
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
    const rules = () => p.evaluate(() => { const m = document.querySelector("main"); const s = document.querySelector(".stage-column"); const ms = getComputedStyle(m); const ss = s && getComputedStyle(s);
      return { scrollTop: m.scrollTop, scrolled: m.hasAttribute("data-scrolled"), ownsCut: m.hasAttribute("data-owns-cut"), mainRule: ms.borderTopColor, mainRuleY: Math.round(m.getBoundingClientRect().top),
        bandRule: ss?.borderBottomColor, bandRuleWidth: ss?.borderBottomWidth, bandFootY: s ? Math.round(s.getBoundingClientRect().bottom) : null }; });
    try {
      if (w !== 844) {
        await go("/morph", 4000);
        o.l1rest = await rules(); if (w === 390) await shot(p, `morph-${theme}-390`);
        await p.evaluate(() => { const m = document.querySelector("main"); m.scrollTop = 160; m.dispatchEvent(new Event("scroll")); }); await p.waitForTimeout(800);
        o.l1scrolled = await rules(); await shot(p, `morph-scrolled-${theme}-${w}`);
        // the shell rule still stands on a route without its own band
        await go("/gallery", 3000);
        await p.evaluate(() => { const m = document.querySelector("main"); m.scrollTop = 200; m.dispatchEvent(new Event("scroll")); }); await p.waitForTimeout(600);
        o.l1gallery = await rules();
      }
      await go("/paper", 4000);
      if (w === 1440) {
        const tops = () => p.evaluate(() => { const a = document.querySelector(".paper-sidebar"); const art = document.querySelector(".paper-article"); const cut = getComputedStyle(document.querySelector(".paper-columns"), "::before"); const port = document.querySelector(".paper-scroll");
          return { portTop: Math.round(port.getBoundingClientRect().top), asideTop: Math.round(a.getBoundingClientRect().top), articleTop: Math.round(art.getBoundingClientRect().top), cutTop: cut.top, cutColor: cut.backgroundColor, asideStickyTop: getComputedStyle(a).top }; });
        o.t1rest = await tops();
        await p.evaluate(() => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * 0.3; }); await p.waitForTimeout(2000);
        o.t1scrolled = await tops(); await shot(p, `paper-proof-${theme}-1440`);
      }
      if (h === 390) {
        await p.evaluate(() => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * 0.35; }); await p.waitForTimeout(1500);
        o.l2 = await p.evaluate(() => { const R = (s) => { const e = document.querySelector(s); if (!e) return null; const x = e.getBoundingClientRect(); return [Math.round(x.top), Math.round(x.bottom), Math.round(x.height)]; };
          const bar = document.querySelector(".floating-toc-bar"); const cs = getComputedStyle(bar);
          return { band: R(".floating-toc"), bar: R(".floating-toc-bar"), title: R(".floating-toc-title-btn"), search: R(".floating-toc-search-btn"), readout: R(".floating-toc .page-readout"), dock: R("header, [data-slot=dock], .glass-dock"), barPad: cs.paddingBlock, barBorder: cs.borderTopWidth,
            children: [...bar.children].map((c) => [c.className.toString().slice(0, 40), Math.round(c.getBoundingClientRect().height)]) }; });
        await shot(p, `paper-mid-${theme}-844x390`);
      }
      if (w === 1440) {
        for (const r of ["/equation", "/visualize"]) { await go(r, 4000); await shot(p, `${r.slice(1)}-${theme}-1440`); }
      }
    } catch (e) { o.err = e.message.slice(0, 300); }
  } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f9p-probe${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
