// X-DS fourier pass 6 critic (F6X): frames for routes missing from f5x + computed lighting reads. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const read = (p) => p.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const res = [];
  for (const e of document.querySelectorAll("body *")) {
    if (!vis(e) || e.closest("svg") || e.tagName === "CANVAS") continue;
    const s = getComputedStyle(e);
    const bs = s.boxShadow !== "none" ? s.boxShadow : null;
    const ts = s.textShadow !== "none" ? s.textShadow : null;
    const f = s.filter !== "none" ? s.filter : null;
    const bf = s.backdropFilter !== "none" ? s.backdropFilter : null;
    const bg = s.backgroundImage.includes("gradient") ? s.backgroundImage.slice(0, 160) : null;
    const an = s.animationName !== "none" && s.animationIterationCount === "infinite" ? s.animationName : null;
    if (bs || ts || f || bf || bg || an) res.push({ el: e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 4).join("."), txt: (e.innerText || "").trim().slice(0, 24), bs, ts, f, bf, bg, an });
  }
  return res;
});
const cells = [["visualize", 1440], ["visualize", 390], ["equation", 1440], ["morph", 1440], ["morph", 390], ["gallery", 1440], ["gallery", 390]];
try {
  for (const theme of ["light", "dark"]) for (const [route, w] of cells) {
    const k = `${route}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try {
      await p.mouse.move(0, 0);
      await p.goto(BASE + "/" + route, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(4000);
      await p.screenshot({ path: `${OUT}/${k}.png` });
      if (w === 1440) out[k] = await read(p);
      if (route === "visualize" && w === 1440) {
        await p.mouse.move(1000, 450); await p.waitForTimeout(1200);
        await p.screenshot({ path: `${OUT}/${k}-hover.png` });
      }
    } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
    await ctx.close();
  }
} finally { await b.close(); writeFileSync(`${OUT}/probe.json`, JSON.stringify(out, null, 1)); }
