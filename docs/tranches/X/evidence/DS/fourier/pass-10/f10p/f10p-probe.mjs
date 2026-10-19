// X-DS fourier pass 10 cure (critic F10C) AFTER probe, 2026-10-17. Re-shoots the critic's cells and measures:
// L1 /paper below lg (844x390, 390x844) scrolled: the band's cut rule (::after) against the bar plate and the article;
//    /morph at 390 and 1440 scrolled: the cut rule's span against the cards (and the shell's main rule off).
// T1 /paper 1440: the aside ToC titles' left edge per depth. T2: 'Proof .' as served (carried; latex-paper 0.3.0 owner act).
// Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3221";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
try {
for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844], [844, 390]]) {
  const k = `${theme}-${w}x${h}`; const o = (out[k] = {}); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
  try {
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
    try {
      if (w !== 844) {
        await go("/morph", 4000);
        await p.evaluate(() => { const m = document.querySelector("main"); m.scrollTop = 160; m.dispatchEvent(new Event("scroll")); }); await p.waitForTimeout(800);
        o.morph = await p.evaluate(() => { const m = document.querySelector("main"); const s = document.querySelector(".stage-column"); const pg = document.querySelector(".demo-page");
          const pe = (el, ps) => { const c = getComputedStyle(el, ps); return { display: c.display, left: c.left, width: c.width, bg: c.backgroundColor, top: c.top }; };
          const sr = s.getBoundingClientRect(); const pr = pg.getBoundingClientRect(); const pcs = getComputedStyle(pg);
          const card = document.querySelector(".controls-column > *").getBoundingClientRect();
          const band = pe(s, "::after"); const pageRule = pe(pg, "::before");
          return { scrollTop: m.scrollTop, mainRule: getComputedStyle(m).borderTopColor, band, bandSpan: band.display === "none" ? null : [Math.round(sr.left + parseFloat(band.left)), Math.round(sr.left + parseFloat(band.left) + parseFloat(band.width))], bandFootY: Math.round(sr.bottom),
            pageRule, pageRuleSpan: pageRule.display === "none" || pageRule.width === "auto" ? null : [Math.round(pr.left + parseFloat(pcs.paddingLeft)), Math.round(pr.left + parseFloat(pcs.paddingLeft) + parseFloat(pageRule.width))],
            card: [Math.round(card.left), Math.round(card.right)], title: Math.round(document.querySelector(".demo-title").getBoundingClientRect().left) }; });
        await shot(p, `morph-scrolled-${theme}-${w}`);
      }
      await go("/paper", 4000);
      if (w === 1440) {
        await p.evaluate(() => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * 0.3; }); await p.waitForTimeout(2000);
        o.toc = await p.evaluate(() => { const rows = [...document.querySelectorAll(".paper-sidebar .toc-link")].filter((l) => l.offsetParent);
          const by = {}; for (const l of rows) { const d = l.dataset.depth; const t = l.querySelector(".toc-label > :last-child").getBoundingClientRect(); const n = l.querySelector(".toc-number");
            (by[d] ??= []).push([n?.textContent ?? "", Math.round(t.left * 10) / 10]); }
          const ff = getComputedStyle(document.querySelector(".paper-sidebar .toc-number")).fontFamily;
          return { numberFont: ff, byDepth: by, distinctLeft: Object.fromEntries(Object.entries(by).map(([d, r]) => [d, [...new Set(r.map((x) => x[1]))]])) }; });
        o.proofText = await p.evaluate(() => [...document.querySelectorAll(".paper-article *")].filter((e) => /^Proof( sketch)?\s*\.?$/.test(e.textContent.trim()) && e.children.length < 3).slice(0, 3).map((e) => e.parentElement.textContent.trim().slice(0, 24)));
        await shot(p, `paper-proof-${theme}-1440`);
      } else {
        await p.evaluate(() => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * 0.35; }); await p.waitForTimeout(1500);
        o.paperCut = await p.evaluate(() => { const ft = document.querySelector(".floating-toc"); const r = ft.getBoundingClientRect(); const a = getComputedStyle(ft, "::after");
          const R = (s) => { const x = document.querySelector(s).getBoundingClientRect(); return [Math.round(x.left), Math.round(x.right)]; };
          return { rule: [Math.round(r.left + parseFloat(a.left)), Math.round(r.left + parseFloat(a.left) + parseFloat(a.width))], ruleY: Math.round(r.bottom), ruleBg: a.backgroundColor, band: R(".floating-toc"), bar: R(".floating-toc-bar"), article: R(".paper-article") }; });
        await shot(p, `paper-mid-${theme}-${w}x${h}`);
      }
    } catch (e) { o.err = e.message.slice(0, 300); }
  } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f10p-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
