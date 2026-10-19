// X-DS fourier pass 11 cure (critic F11C) AFTER probe, 2026-10-17. DS-F11C-L1: the /paper proof block.
// Brings the proof sketch nearest "Hermite" (else the first proof) to the upper third of the reader and measures:
// the block's computed border-left, radius and background; proof label and body left against the preceding paragraph's left.
// Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3231";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
try {
for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const k = `${theme}-${w}`; const o = (out[k] = {}); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
  try {
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
    await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    // The reader mounts sections near the viewport: step down until a proof is mounted.
    for (const f of [0.3, 0.2, 0.4, 0.1, 0.5, 0.6, 0.7, 0.8, 0.05]) {
      const n = await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; return document.querySelectorAll(".paper-article .paper-proof-block").length; }, f);
      await p.waitForTimeout(1500);
      if (n || (await p.locator(".paper-article .paper-proof-block").count())) break;
    }
    await p.evaluate(() => {
      const blocks = [...document.querySelectorAll(".paper-article .paper-proof-block")];
      const t = blocks.find((x) => /Hermite/i.test(x.textContent)) ?? blocks[0];
      const sc = document.querySelector(".paper-scroll"); const r = t.getBoundingClientRect();
      sc.scrollTop += r.top - sc.getBoundingClientRect().top - window.innerHeight * 0.3; t.dataset.probe = "1";
    });
    await p.waitForTimeout(1500);
    Object.assign(o, await p.evaluate(() => {
      const t = document.querySelector("[data-probe]"); const c = getComputedStyle(t);
      const lab = t.querySelector(".paper-proof-label"); const body = t.querySelector(".paper-proof-body");
      let prev = t.previousElementSibling; while (prev && !prev.matches("p, .paper-paragraph, .section-body > *")) prev = prev.previousElementSibling;
      const para = [...document.querySelectorAll(".paper-article p")].find((x) => !t.contains(x) && x.getBoundingClientRect().width > 200);
      const L = (e) => e ? Math.round(e.getBoundingClientRect().left * 10) / 10 : null;
      return { count: document.querySelectorAll(".paper-article .paper-proof-block").length, text: t.textContent.trim().slice(0, 40),
        borderLeft: `${c.borderLeftWidth} ${c.borderLeftStyle} ${c.borderLeftColor}`, radius: c.borderRadius, background: c.backgroundColor, bgImage: c.backgroundImage, padding: c.padding,
        blockLeft: L(t), labelLeft: L(lab), bodyLeft: L(body), paragraphLeft: L(prev ?? para),
        labelMinusParagraph: lab && (prev ?? para) ? Math.round((lab.getBoundingClientRect().left - (prev ?? para).getBoundingClientRect().left) * 10) / 10 : null };
    }));
    await p.screenshot({ path: `${OUT}/paper-proof-${theme}-${w}.png` });
  } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f11p-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
