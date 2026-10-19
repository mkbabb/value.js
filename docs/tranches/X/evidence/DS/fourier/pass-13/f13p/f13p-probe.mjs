// X-DS fourier pass 13 cure (critic F13C) probe, 2026-10-18. DS-F13C-T1: display math inside an environment block.
// For Theorem 2.6.3.1 (Hermite Orthogonality), the first Definition holding a display, and the proof holding (2.74), measures
// the block height, the label-to-ink gap (label bottom to the first display's ink top), the ink-to-foot gap (last display's ink
// bottom to the block's border-box bottom) and each display's computed margin/padding; also one prose display's text-to-ink gaps.
// Captures the Hermite theorem in the upper fifth (paper-env-<theme>-<w>). Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3242"; const TAG = process.argv[4] ?? "after";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const measure = () => {
  const R = (v) => Math.round(v * 10) / 10;
  const ink = (d) => { const k = d.querySelector(".katex-html") ?? d; return k.getBoundingClientRect(); };
  const env = (blk, labSel) => {
    if (!blk) return null;
    const r = blk.getBoundingClientRect(); const lab = blk.querySelector(labSel); const ds = [...blk.querySelectorAll(".katex-display")];
    if (!ds.length) return { text: blk.textContent.trim().slice(0, 50), displays: 0 };
    const first = ink(ds[0]), last = ink(ds[ds.length - 1]); const lr = lab?.getBoundingClientRect();
    // the gap above the first display is measured from whatever precedes it in flow: the label when the display is the body's first child, else the prose line
    const prev = ds[0].closest(".math-block")?.previousElementSibling; const pr = prev ? prev.getBoundingClientRect() : lr;
    const c = getComputedStyle(ds[0]); const mb = getComputedStyle(ds[0].closest(".math-block") ?? ds[0]);
    return { text: blk.textContent.trim().slice(0, 50), displays: ds.length, height: R(r.height), inkHeight: R(last.bottom - first.top),
      aboveFrom: prev ? "prose" : "label", headGap: R(first.top - (pr?.bottom ?? r.top)), footGap: R(r.bottom - last.bottom),
      // the row's last ink: the equation number when it stacks under the display (below 40rem), else the display
      rowFootGap: (() => { const mbk = ds[ds.length - 1].closest(".math-block"); const n = mbk?.querySelector(".math-block__number"); const nr = n?.getBoundingClientRect();
        const lastInk = nr && nr.top >= last.bottom - 1 ? nr.bottom : last.bottom; return R((mbk?.nextElementSibling ? mbk.nextElementSibling.getBoundingClientRect().top : r.bottom) - lastInk); })(),
      numberBelowInk: (() => { const n = ds[ds.length - 1].closest(".math-block")?.querySelector(".math-block__number"); const nr = n?.getBoundingClientRect(); return nr && nr.top >= last.bottom - 1 ? R(nr.top - last.bottom) : null; })(),
      airShare: R(1 - (last.bottom - first.top) / r.height),
      display: { margin: c.margin, padding: c.padding, clipMargin: c.overflowClipMargin, overflowY: c.overflowY },
      mathBlock: { margin: mb.margin, padding: mb.padding, overflowY: mb.overflowY } };
  };
  const ths = [...document.querySelectorAll(".paper-article .theorem-block")];
  const herm = ths.find((x) => /Hermite Orthogonality/i.test(x.textContent));
  const def = ths.find((x) => /Definition 2\.6\.3\.1/.test(x.textContent) && x.querySelector(".katex-display")) ?? ths.find((x) => /^\s*Definition/.test(x.textContent) && x.querySelector(".katex-display"));
  const proof = [...document.querySelectorAll(".paper-article .paper-proof-block")].find((x) => /\(2\.74\)/.test(x.textContent));
  const prose = [...document.querySelectorAll(".paper-article .section-body > .math-block")].find((m) => m.previousElementSibling?.tagName === "P" && m.nextElementSibling?.tagName === "P");
  let proseM = null;
  if (prose) { const k = prose.querySelector(".katex-html").getBoundingClientRect();
    proseM = { textToInk: R(k.top - prose.previousElementSibling.getBoundingClientRect().bottom), inkToText: R(prose.nextElementSibling.getBoundingClientRect().top - k.bottom) }; }
  const labSel = ".theorem-label, .theorem-header";
  return { theorem: env(herm, labSel), definition: env(def, labSel), proof: env(proof, ".paper-proof-label"), proseDisplay: proseM };
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
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    // the reader mounts sections near the viewport: sweep so the targets exist, then return to the theorem
    for (const f of [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) {
      await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
      await p.waitForTimeout(900);
    }
    for (const sel of ["Hermite Orthogonality"]) {
      for (const f of [0.3, 0.2, 0.4, 0.1, 0.5, 0.6, 0.7, 0.8, 0.05]) {
        const n = await p.evaluate((s) => [...document.querySelectorAll(".paper-article .theorem-block")].some((x) => x.textContent.includes(s)), sel);
        if (n) break;
        await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
        await p.waitForTimeout(1500);
      }
    }
    await p.evaluate(() => { const th = [...document.querySelectorAll(".paper-article .theorem-block")].find((x) => /Hermite Orthogonality/i.test(x.textContent));
      const sc = document.querySelector(".paper-scroll"); const r = th.getBoundingClientRect(); sc.scrollTop += r.top - sc.getBoundingClientRect().top - window.innerHeight * 0.2; });
    await p.waitForTimeout(1500);
    Object.assign(o, await p.evaluate(measure));
    // re-seat the Hermite theorem in the upper fifth just before the frame (the reader may re-anchor after the sweep)
    const seat = () => p.evaluate(() => { const th = [...document.querySelectorAll(".paper-article .theorem-block")].find((x) => /Hermite Orthogonality/i.test(x.textContent));
      th.scrollIntoView({ block: "start" }); const r = th.getBoundingClientRect(); window.scrollBy(0, r.top - window.innerHeight * 0.2);
      for (let a = th.parentElement; a; a = a.parentElement) if (a.scrollHeight > a.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(a).overflowY)) { a.scrollTop += th.getBoundingClientRect().top - window.innerHeight * 0.2; }
      return Math.round(th.getBoundingClientRect().top); });
    await seat(); await p.waitForTimeout(1200); o.frameTop = await seat(); await p.waitForTimeout(800);
    await p.screenshot({ path: `${OUT}/paper-env-${theme}-${w}${TAG === "after" ? "" : "-" + TAG}.png` });
  } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
  writeFileSync(`${OUT}/f13p-probe-${TAG}.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
