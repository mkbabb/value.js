// X-DS fourier pass 12 cure (critic F12C) AFTER probe, 2026-10-18. DS-F12C-T1: a theorem and the proof that follows it.
// Brings the theorem followed by a proof (Hermite first, else the first such pair) to the upper fifth of the reader and measures
// both blocks' padding, radius, rule and their label left edges. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3241";
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
    const pairSel = () => [...document.querySelectorAll(".paper-article .paper-proof-block")].filter((x) => x.previousElementSibling?.matches(".theorem-block"));
    for (const f of [0.3, 0.2, 0.4, 0.1, 0.5, 0.6, 0.7, 0.8, 0.05]) {
      await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
      await p.waitForTimeout(1500);
      const n = await p.evaluate(`(${pairSel})().filter((x) => /Hermite/i.test(x.previousElementSibling.textContent)).length`);
      if (n) break;
    }
    await p.evaluate(`(() => { const ps = (${pairSel})(); const t = ps.find((x) => /Hermite/i.test(x.previousElementSibling.textContent)) ?? ps[0];
      const th = t.previousElementSibling; const sc = document.querySelector(".paper-scroll"); const r = th.getBoundingClientRect();
      sc.scrollTop += r.top - sc.getBoundingClientRect().top - window.innerHeight * 0.2; t.dataset.probe = "proof"; th.dataset.probe = "theorem"; })()`);
    await p.waitForTimeout(1500);
    Object.assign(o, await p.evaluate(() => {
      const R = (v) => Math.round(v * 10) / 10;
      const m = (e, labSel) => { const c = getComputedStyle(e); const lab = e.querySelector(labSel); const r = e.getBoundingClientRect();
        return { text: e.textContent.trim().slice(0, 48), padding: c.padding, radius: c.borderRadius, borderLeft: `${c.borderLeftWidth} ${c.borderLeftStyle} ${c.borderLeftColor}`,
          background: c.backgroundColor, blockLeft: R(r.left), labelLeft: lab ? R(lab.getBoundingClientRect().left) : null, labelOffset: lab ? R(lab.getBoundingClientRect().left - r.left) : null,
          labelTopOffset: lab ? R(lab.getBoundingClientRect().top - r.top) : null };
      };
      const th = m(document.querySelector("[data-probe=theorem]"), ".theorem-label, .theorem-header, :scope > *");
      const pr = m(document.querySelector("[data-probe=proof]"), ".paper-proof-label");
      return { theorem: th, proof: pr, labelStep: th.labelLeft != null && pr.labelLeft != null ? R(pr.labelLeft - th.labelLeft) : null };
    }));
    await p.screenshot({ path: `${OUT}/paper-env-${theme}-${w}.png` });
  } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f12p-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
