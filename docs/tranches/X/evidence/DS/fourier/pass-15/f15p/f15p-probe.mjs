// X-DS fourier pass 15 cure (critic F15C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// DS-F15C-N1: the gap between every pair of consecutive environment blocks (theorem-block / paper-proof-block) in /paper,
// classed theorem->theorem, theorem->proof, proof->theorem; computed margins of each.
// Frames: paper-env-<theme>-<w> (Definition 2.6.3.1 + Theorem 2.6.3.1 seated in the upper fifth).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3251"; const TAG = process.argv[4] ?? "after";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const measure = () => {
  const R = (v) => Math.round(v * 10) / 10;
  const kind = (n) => (n.classList.contains("paper-proof-block") ? "proof" : "theorem");
  const label = (n) => (n.querySelector(".theorem-label, .paper-proof-label, .proof-label")?.textContent ?? n.textContent).trim().slice(0, 40);
  const blocks = [...document.querySelectorAll(".paper-article .theorem-block, .paper-article .paper-proof-block")];
  const pairs = [];
  for (let i = 0; i < blocks.length; i++) {
    const a = blocks[i]; const n = a.nextElementSibling;
    if (!n || !(n.classList.contains("theorem-block") || n.classList.contains("paper-proof-block"))) continue;
    pairs.push({ cls: `${kind(a)}->${kind(n)}`, a: label(a), b: label(n), gap: R(n.getBoundingClientRect().top - a.getBoundingClientRect().bottom),
      aMb: getComputedStyle(a).marginBottom, bMt: getComputedStyle(n).marginTop });
  }
  const byCls = {}; for (const p of pairs) (byCls[p.cls] ??= new Set()).add(p.gap);
  const target = pairs.find((p) => /Definition\s*2\.6\.3\.1/.test(p.a));
  return { count: pairs.length, gapsByClass: Object.fromEntries(Object.entries(byCls).map(([k, v]) => [k, [...v]])), target, sample: pairs.slice(0, 12) };
};
try {
  for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const k = `${theme}-${w}`; const o = (out[k] = {}); const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(5000); await p.mouse.move(0, 0).catch(() => {});
      // sections mount as they near the viewport: step down until Definition 2.6.3.1 is mounted, then seat it
      const find = () => p.evaluate(() => { const t = [...document.querySelectorAll(".paper-article .theorem-block")].find((x) => /Definition\s*2\.6\.3\.1/.test(x.querySelector(".theorem-label")?.textContent ?? "")); if (t) { t.scrollIntoView({ block: "start" }); document.querySelector(".paper-scroll").scrollTop -= 160; return true; } return false; });
      for (let i = 0; i < 160; i++) { if (await find()) break; await p.evaluate(() => { document.querySelector(".paper-scroll").scrollTop += 600; }); await p.waitForTimeout(350); }
      await p.waitForTimeout(1500); await find();
      await p.waitForTimeout(2500);
      Object.assign(o, await p.evaluate(measure));
      await p.screenshot({ path: `${OUT}/paper-env-${theme}-${w}${TAG === "after" ? "" : "-" + TAG}.png` });
    } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
    writeFileSync(`${OUT}/f15p-probe-${TAG}.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
