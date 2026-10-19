// X-DS fourier pass 17 cure (critic F17C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// DS-F17C-H1: the /paper §0.1 description list (<dt> text and height).
// DS-F17C-N1: the ToC aside head (label, readout, buttons: boxes and row count) at 1440.
// DS-F17C-N2: /gallery card foot (chip bottom to stats ink top) at 1440 and 390.
// Frames: paper-intro-<theme>-<w>, paper-toc-<theme>-1440, gallery-<theme>-<w>.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const TAG = process.argv[4] ?? "after";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const k = `${theme}-${w}`; const o = (out[k] = {}); const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(BASE + "/gallery", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
      o.gallery = await p.evaluate(() => {
        const c = document.querySelector(".gallery-card"); if (!c) return null;
        const chip = c.querySelector(".basis-tint"); const stats = c.querySelector(".card-stats"); const eye = stats?.querySelector("svg");
        const cs = getComputedStyle(c);
        return { cardWidth: c.getBoundingClientRect().width, cardGap: cs.gap, cardPad: cs.paddingTop, chipBottom: chip?.getBoundingClientRect().bottom, statsTop: stats?.getBoundingClientRect().top, eyeTop: eye?.getBoundingClientRect().top,
          chipToStats: chip && stats ? +(stats.getBoundingClientRect().top - chip.getBoundingClientRect().bottom).toFixed(2) : null,
          chipToEyeInk: chip && eye ? +(eye.getBoundingClientRect().top - chip.getBoundingClientRect().bottom).toFixed(2) : null };
      });
      await p.screenshot({ path: `${OUT}/gallery-${theme}-${w}${TAG === "after" ? "" : "-" + TAG}.png` });
      await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(5000); await p.mouse.move(0, 0).catch(() => {});
      if (w === 1440) {
        o.tocHead = await p.evaluate(() => {
          const h = document.querySelector(".sidebar-header"); if (!h) return null;
          const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
          return { header: box(h), label: box(h.querySelector(".sidebar-label")), readout: box(h.querySelector(".sidebar-page")), readoutText: h.querySelector(".sidebar-page")?.textContent.trim(),
            buttons: [...h.querySelectorAll(".sidebar-header-actions button")].map(box) };
        });
        await p.screenshot({ path: `${OUT}/paper-toc-${theme}-1440${TAG === "after" ? "" : "-" + TAG}.png`, clip: { x: 0, y: 0, width: 720, height: 360 } });
      }
      o.dl = await p.evaluate(() => {
        const dl = document.querySelector(".paper-article dl"); if (!dl) return null;
        dl.scrollIntoView({ block: "center" });
        return [...dl.querySelectorAll("dt")].map((d) => ({ text: d.textContent.trim(), h: d.getBoundingClientRect().height, fontWeight: getComputedStyle(d).fontWeight }));
      });
      await p.waitForTimeout(1500);
      await p.screenshot({ path: `${OUT}/paper-intro-${theme}-${w}${TAG === "after" ? "" : "-" + TAG}.png` });
    } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
    console.log("done", k); writeFileSync(`${OUT}/f17p-probe-${TAG}.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
