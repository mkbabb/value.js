// X-DS fourier pass 8 cure (critic F8C) AFTER probe, 2026-10-17. Re-shoots the critic's cells and measures:
// C1 the theorem titles' text as served (latex-paper 0.2.1 until the repin), C2 the .paper-cite face and seat,
// C3 /morph's band rule at rest and scrolled, T1 inline KaTeX past the article's edge at 390, T2 the ToC chevron
// against its label at 844x390. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3217";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
const r = (x) => ({ top: Math.round(x.top), bottom: Math.round(x.bottom), left: Math.round(x.left), right: Math.round(x.right) });
try {
for (const theme of ["light", "dark"]) for (const vp of [[1440, 900], [390, 844], [844, 390]]) {
  const [w, h] = vp; const k = `${theme}-${w}x${h}`; const o = (out[k] = {}); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
  try {
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
    const scrollPort = (f) => p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
    try {
      await go("/paper", 4000);
      if (w === 1440) {
        // C1 + C2: the Circulant theorem, centred, and its proof sketch's citation
        o.c1 = await p.evaluate(async () => {
          const sc = document.querySelector(".paper-scroll");
          for (let f = 0; f <= 1; f += 0.02) { sc.scrollTop = (sc.scrollHeight - sc.clientHeight) * f; await new Promise((z) => setTimeout(z, 120)); if ([...document.querySelectorAll(".theorem-block--theorem")].some((e) => /Circulant/.test(e.textContent))) break; }
          const t = [...document.querySelectorAll(".theorem-block--theorem")].find((e) => /Circulant/.test(e.textContent)); if (!t) return null;
          t.scrollIntoView({ block: "start" }); sc.scrollTop -= 80;
          const titles = [...document.querySelectorAll(".theorem-block")].map((e) => e.querySelector(".theorem-label, .theorem-header, header")?.textContent.trim().replace(/\s+/g, " ")).filter((s) => s && /Bernstein|Circulant|Eckart/.test(s));
          return { titles };
        });
        await p.waitForTimeout(1500);
        o.c2 = await p.evaluate(() => { const art = document.querySelector(".paper-article"); const cites = [...art.querySelectorAll(".section-body .paper-cite")].filter((c) => { const x = c.getBoundingClientRect(); return x.top > 0 && x.bottom < innerHeight; }).slice(0, 3);
          const pr = (e) => { const s = getComputedStyle(e); return { fontFamily: s.fontFamily.slice(0, 40), fontSize: s.fontSize, verticalAlign: s.verticalAlign, color: s.color }; };
          return cites.map((c) => ({ text: c.textContent, cite: pr(c), host: pr(c.parentElement) })); });
        await shot(p, `paper-proof-${theme}-1440`);
      }
      if (w === 390) {
        // T1: inline/display KaTeX past the article's content edge, across the whole paper
        o.t1 = await p.evaluate(async () => { const sc = document.querySelector(".paper-scroll"); const hits = {};
          for (let f = 0; f <= 1.0001; f += 0.01) { sc.scrollTop = (sc.scrollHeight - sc.clientHeight) * f; await new Promise((z) => setTimeout(z, 200));
            const art = document.querySelector(".paper-article"); const a = art.getBoundingClientRect(); const edge = a.right - parseFloat(getComputedStyle(art).paddingRight);
            for (const k of art.querySelectorAll(".katex")) { if (k.parentElement.closest(".katex")) continue; const disp = k.closest(".katex-display"); const x = (disp ?? k).getBoundingClientRect(); if (x.width && x.right > edge + 1) hits[k.querySelector("annotation")?.textContent.slice(0, 60)] = { inline: !disp, over: Math.round(x.right - edge) }; } }
          return { overflowing: hits, count: Object.keys(hits).length }; });
        // the example 6.1.1 verification line, framed
        o.t1Example = await p.evaluate(async () => { const sc = document.querySelector(".paper-scroll"); const find = () => [...document.querySelectorAll(".katex annotation")].find((a) => /frac\{1\}\{4\}\\overline\{F_4\}/.test(a.textContent));
          for (let f = 0; f <= 1.0001 && !find(); f += 0.01) { sc.scrollTop = (sc.scrollHeight - sc.clientHeight) * f; await new Promise((z) => setTimeout(z, 200)); }
          const k = find()?.closest(".katex"); if (!k) return null; k.scrollIntoView({ block: "center" }); await new Promise((z) => setTimeout(z, 300));
          const art = document.querySelector(".paper-article"); const a = art.getBoundingClientRect(); const x = k.getBoundingClientRect(); return { formulaRight: Math.round(x.right), articleContentRight: Math.round(a.right - parseFloat(getComputedStyle(art).paddingRight)), lines: k.getClientRects().length }; });
        await p.waitForTimeout(1500); await shot(p, `paper-late-${theme}-390`);
        // C3: /morph band rule at rest and scrolled
        await go("/morph", 4000);
        const band = () => p.evaluate(() => { const m = document.querySelector("main"); const s = document.querySelector(".stage-column"); return { scrollTop: m.scrollTop, scrolled: m.hasAttribute("data-scrolled"), ruleColor: getComputedStyle(s).borderBottomColor, ruleWidth: getComputedStyle(s).borderBottomWidth, rect: s.getBoundingClientRect().bottom | 0 }; });
        o.c3rest = await band(); await shot(p, `morph-${theme}-390`);
        await p.evaluate(() => { const m = document.querySelector("main"); m.scrollTop = 160; m.dispatchEvent(new Event("scroll")); }); await p.waitForTimeout(800);
        o.c3scrolled = await band(); await shot(p, `morph-scrolled-${theme}-390`);
      }
      if (h === 390) {
        await scrollPort(0.35); await p.waitForTimeout(1500);
        o.t2 = await p.evaluate(() => { const btn = document.querySelector(".floating-toc-title-btn"); const lab = btn.querySelector(".floating-toc-crumb"); const ch = btn.querySelector(".floating-toc-chevron"); const ro = document.querySelector(".floating-toc .page-readout"); const bar = document.querySelector(".floating-toc-bar");
          return { bar: r2(bar), btn: r2(btn), label: r2(lab), chevron: r2(ch), readout: r2(ro), labelToChevron: Math.round(ch.getBoundingClientRect().left - lab.getBoundingClientRect().right), text: lab.textContent.trim() };
          function r2(e) { const x = e.getBoundingClientRect(); return [Math.round(x.left), Math.round(x.right)]; } });
        await shot(p, `paper-mid-${theme}-844x390`);
      }
    } catch (e) { o.err = e.message.slice(0, 300); }
  } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f8p-probe.json`, JSON.stringify(out, null, 1));
}
// T2 at 390 (chevron must hold one place as before): measured in the 390 cell too
} finally { await b.close(); }
