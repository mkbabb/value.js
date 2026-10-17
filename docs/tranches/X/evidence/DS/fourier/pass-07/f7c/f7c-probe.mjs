// X-DS fourier pass 7 cure (critic F7C): AFTER frames for the critic's cells, headless real Chrome only (§0ei).
//  - C1: /w/<image> Controls tab at 390 (touch, coarse) and the aside at 1440, Image layer in its image-unavailable
//    state (the seat's fresh BLOB_DIR lacks the blob, so the thumbnail errors). Measures the caption, the Replace
//    button and the row: line counts (height / line-height), boxes, and whether the command wrapped under the caption.
// usage: BASE=http://localhost:3139 node f7c-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3139";
const IMG = process.env.IMG ?? "placid-stirring-opal-viper";
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
async function ctxFor(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx;
}
const settle = async (p, ms = 2500) => { await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); };
const read = (p) => p.evaluate(() => {
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const lines = (el) => { const cs = getComputedStyle(el); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2; return Math.round(el.getBoundingClientRect().height / lh); };
  const row = document.querySelector(".image-row"); if (!row) return { row: null };
  const cap = row.querySelector(".image-missing p"); const thumb = row.querySelector(".image-thumb"); const btn = row.querySelector("button");
  const btnText = btn ? [...btn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()) : null;
  let btnLines = null; if (btnText) { const rg = document.createRange(); rg.selectNodeContents(btnText); btnLines = rg.getClientRects().length; }
  return {
    row: r(row), rowWrap: getComputedStyle(row).flexWrap,
    caption: cap ? { text: cap.textContent.trim(), box: r(cap), lines: lines(cap), fontSize: getComputedStyle(cap).fontSize, whiteSpace: getComputedStyle(cap).whiteSpace } : null,
    thumb: thumb ? r(thumb) : null,
    button: btn ? { text: btn.textContent.replace(/\s+/g, " ").trim(), box: r(btn), textLines: btnLines, fontSize: getComputedStyle(btn).fontSize, whiteSpace: getComputedStyle(btn).whiteSpace, flex: getComputedStyle(btn).flex } : null,
    commandUnderCaption: cap && btn ? btn.getBoundingClientRect().top >= cap.closest(".image-missing").getBoundingClientRect().bottom - 0.5 : null,
    overflowX: row.scrollWidth > row.clientWidth + 0.5,
  };
});
try {
  for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) {
      const k = `w-${theme}-${w}`; const ctx = await ctxFor(theme, w); const p = await ctx.newPage();
      const errs = []; p.on("pageerror", (e) => errs.push(e.message.slice(0, 160)));
      try {
        await p.goto(`${BASE}/w/${IMG}`, { waitUntil: "domcontentloaded", timeout: 90000 }); await settle(p, 3500);
        if (w < 500) { await p.getByRole("tab", { name: "Controls" }).click().catch(() => {}); await p.waitForTimeout(900); }
        out[k] = { ...(await read(p)), pageerrors: errs };
        await p.screenshot({ path: `${OUT}/${k}-controls.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); }
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f7c-probe.json`, JSON.stringify(out, null, 1)); }
