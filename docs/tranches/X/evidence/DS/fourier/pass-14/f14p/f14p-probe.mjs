// X-DS fourier pass 14 cure (critic F14C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// DS-F14C-T1: every visible equation number's right edge against the prose's right edge (in-block vs prose).
// DS-F14C-T2: every visible display's box-left and ink-left (prose / theorem / proof), clientWidth vs scrollWidth.
// DS-F14C-L1: the ToC rail's scrollTop, the head's ::after rule colour (at rest and scrolled), the rows cut under the head.
// Frames: paper-env-<theme>-<w> (Hermite Orthogonality seated in the upper fifth), aside-<theme>-1440 (the rail crop).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3246"; const TAG = process.argv[4] ?? "after";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const measure = () => {
  const R = (v) => Math.round(v * 10) / 10; const vis = (n) => { const r = n.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  const ctxOf = (n) => (n.closest(".theorem-block") ? "theorem" : n.closest(".paper-proof-block") ? "proof" : "prose");
  const nums = [...document.querySelectorAll(".paper-article .math-block__number")].filter(vis).map((n) => ({ t: n.textContent.trim(), ctx: ctxOf(n), right: R(n.getBoundingClientRect().right) }));
  const disp = [...document.querySelectorAll(".paper-article .katex-display")].filter(vis).map((d) => { const k = (d.querySelector(".katex-html") ?? d).getBoundingClientRect(); const r = d.getBoundingClientRect();
    return { ctx: ctxOf(d), boxLeft: R(r.left), boxRight: R(r.right), inkLeft: R(k.left), sw: d.scrollWidth, cw: d.clientWidth, mbPadL: getComputedStyle(d.closest(".math-block")).paddingLeft, mbMarL: getComputedStyle(d.closest(".math-block")).marginLeft }; });
  const sb = document.querySelector(".paper-article .section-body"); const sr = sb.getBoundingClientRect(); const cs = getComputedStyle(sb);
  const measureEdges = { left: R(sr.left + parseFloat(cs.paddingLeft)), right: R(sr.right - parseFloat(cs.paddingRight)) };
  const blocks = [...document.querySelectorAll(".paper-article .theorem-block, .paper-article .paper-proof-block")].filter(vis).map((x) => { const c = getComputedStyle(x); return { ctx: ctxOf(x), padding: c.padding, right: R(x.getBoundingClientRect().right) }; });
  const proseRight = [...document.querySelectorAll(".paper-article .section-body > p")].filter(vis).map((n) => R(n.getBoundingClientRect().right));
  const nav = document.querySelector(".sidebar-nav"); let navInfo = null;
  if (nav && nav.offsetParent) { const h = nav.querySelector(".sidebar-head"); const head = h.getBoundingClientRect(); const a = getComputedStyle(h, "::after");
    navInfo = { scrollTop: nav.scrollTop, dataScrolled: nav.hasAttribute("data-scrolled"), headBottom: R(head.bottom), ruleBg: a.backgroundColor, ruleH: a.height, ruleW: a.width, headShadow: getComputedStyle(h).boxShadow,
      cutRows: [...nav.querySelectorAll("a,button")].filter((x) => { const r = x.getBoundingClientRect(); return r.top < head.bottom && r.bottom > head.bottom; }).map((x) => x.textContent.trim().slice(0, 30)) }; }
  return { measureEdges, nums, disp, blocks, proseRight, navInfo };
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
      if (!touch) o.atRest = await p.evaluate(() => { const n = document.querySelector(".sidebar-nav"); const h = n?.querySelector(".sidebar-head"); return n ? { scrollTop: n.scrollTop, dataScrolled: n.hasAttribute("data-scrolled"), ruleBg: getComputedStyle(h, "::after").backgroundColor } : null; });
      for (const f of [0.1, 0.2, 0.25, 0.3]) { await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f); await p.waitForTimeout(900); }
      for (let i = 0; i < 12; i++) { const ok = await p.evaluate(() => { const t = [...document.querySelectorAll(".paper-article .theorem-block")].find((x) => /Hermite Orthogonality/.test(x.textContent)); if (t) { t.scrollIntoView({ block: "start" }); document.querySelector(".paper-scroll").scrollTop -= 120; return true; } return false; }); if (ok) break; await p.evaluate(() => { document.querySelector(".paper-scroll").scrollTop += 1500; }); await p.waitForTimeout(800); }
      await p.waitForTimeout(2500);
      Object.assign(o, await p.evaluate(measure));
      await p.screenshot({ path: `${OUT}/paper-env-${theme}-${w}${TAG === "after" ? "" : "-" + TAG}.png` });
      // L1 witness: if the follow left the rail at rest, scroll the list under the head as the critic's run did (pg 30/110, row 2 cut), then re-read.
      if (!touch) { o.railDriven = await p.evaluate(async () => { const n = document.querySelector(".sidebar-nav"); const h = n.querySelector(".sidebar-head");
          const row = [...n.querySelectorAll("a,button")].find((x) => /Lens I: Linear Algebra/.test(x.textContent));
          if (n.scrollTop === 0 && row) n.scrollTop = row.getBoundingClientRect().top - h.getBoundingClientRect().bottom + 12;
          await new Promise((r) => setTimeout(r, 600)); const hb = h.getBoundingClientRect().bottom; const a = getComputedStyle(h, "::after");
          return { scrollTop: Math.round(n.scrollTop), dataScrolled: n.hasAttribute("data-scrolled"), ruleBg: a.backgroundColor, border: getComputedStyle(document.documentElement).getPropertyValue("--border").trim(),
            cutRows: [...n.querySelectorAll("a,button")].filter((x) => { const r = x.getBoundingClientRect(); return r.top < hb && r.bottom > hb; }).map((x) => x.textContent.trim().slice(0, 30)) }; }); }
      if (!touch) { const box = await p.evaluate(() => { const r = document.querySelector(".sidebar-nav").getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: Math.min(r.height, 260) }; });
        await p.screenshot({ path: `${OUT}/aside-${theme}-1440${TAG === "after" ? "" : "-" + TAG}.png`, clip: box }); }
    } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
    writeFileSync(`${OUT}/f14p-probe-${TAG}.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
