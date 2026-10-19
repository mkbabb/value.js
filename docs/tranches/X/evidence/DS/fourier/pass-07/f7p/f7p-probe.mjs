// X-DS fourier pass 7 cure (critic P7) AFTER probe, 2026-10-17. The critic's cells re-shot, plus the measurements
// for DS-F7C-C1 (the scrolled rule at the cut and at the article's measure), DS-F7C-T1 (the bar's chevron holds one
// place while the page readout grows) and DS-F7C-C2 (the proof label's text as served). Glass rows G1 (/morph 390
// readouts) and G2 (dark primary buttons) are re-witnessed only. Headless real Chrome only (§0ei); one browser, one
// context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3213";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
const measure = (p) => p.evaluate(() => {
  const r = (e) => { if (!e) return null; const x = e.getBoundingClientRect(); return { top: Math.round(x.top), bottom: Math.round(x.bottom), left: Math.round(x.left), right: Math.round(x.right) }; };
  const sc = document.querySelector(".paper-scroll"); const cols = document.querySelector(".paper-columns"); const art = document.querySelector(".paper-article");
  const band = document.querySelector(".floating-toc"); const chev = document.querySelector(".floating-toc-chevron"); const ro = document.querySelector(".floating-toc .page-readout");
  const before = cols ? getComputedStyle(cols, "::before") : null;
  const proofs = [...document.querySelectorAll(".paper-proof-label")].slice(0, 3).map((e) => JSON.stringify(e.textContent));
  return {
    port: sc ? { scrollTop: Math.round(sc.scrollTop), scrolled: sc.hasAttribute("data-scrolled"), rect: r(sc), borderTop: getComputedStyle(sc).borderTopWidth } : null,
    article: r(art),
    rule1440: before && before.content !== "none" ? { content: before.content, position: before.position, height: before.blockSize, bg: before.backgroundColor, gridColumn: before.gridColumnStart } : null,
    band: band ? { rect: r(band), rule: getComputedStyle(band, "::after").backgroundColor, ruleBottomOffset: getComputedStyle(band, "::after").bottom, bar: r(band.querySelector(".floating-toc-bar")) } : null,
    chevronX: chev ? Math.round(chev.getBoundingClientRect().left * 10) / 10 : null,
    readout: ro ? { text: ro.textContent.trim(), w: Math.round(ro.getBoundingClientRect().width * 10) / 10 } : null,
    border: getComputedStyle(document.documentElement).getPropertyValue("--border").trim(),
    proofs,
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
    const scrollPort = (f) => p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
    try {
      await go("/paper", 4000); o.paperTop = await measure(p); await shot(p, `paper-${k}`);
      await scrollPort(0.35); await p.waitForTimeout(1500); o.paperMid = await measure(p); await shot(p, `paper-mid-${k}`);
      await scrollPort(0.7); await p.waitForTimeout(1500); o.paperLate = await measure(p); await shot(p, `paper-late-${k}`);
      if (w === 390) {
        o.chevron = [];
        for (const f of [0.02, 0.1, 0.3, 0.6, 0.95]) { await scrollPort(f); await p.waitForTimeout(900); const m = await measure(p); o.chevron.push({ f, x: m.chevronX, readout: m.readout }); }
      }
      // the first proof label, scrolled to and shot (C2 as served)
      o.proofScroll = await p.evaluate(() => { const e = document.querySelector(".paper-proof-label"); if (!e) return null; e.scrollIntoView({ block: "center" }); return e.textContent; });
      await p.waitForTimeout(1200); if (w === 1440) await shot(p, `paper-proof-${k}`);
      if (w === 390) { await go("/morph", 4000); await shot(p, `morph-${k}`);
        await p.setViewportSize({ width: 844, height: 390 }); await go("/paper", 4000); await scrollPort(0.35); await p.waitForTimeout(1500); o.landscape = await measure(p); await shot(p, `paper-mid-${theme}-844x390`); await p.setViewportSize({ width: 390, height: 844 }); }
      if (theme === "dark") {
        await go("/equation", 5000); await p.evaluate(() => { for (const e of document.querySelectorAll("*")) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 40) e.scrollTop = e.scrollHeight; } }); await p.waitForTimeout(1200); await shot(p, `equation-foot-${k}`);
        if (w === 390) { await go("/visualize", 3000); await shot(p, `visualize-${k}`); }
        if (w === 1440) { await go("/nope-404", 2500); await shot(p, `404-${k}`); }
      }
    } catch (e) { o.err = e.message.slice(0, 300); }
  } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f7p-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
