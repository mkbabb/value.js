import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] || "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  const key = `${theme}-${w}`;
  await p.mouse.move(w / 2, 400);
  res[key] = { primary: await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--primary")), subs: [] };
  for (const label of ["Fourier's Problem", "Sturm-Liouville Theory"]) {
    const h = p.locator(".section-header--sub", { hasText: label }).first();
    for (let i = 0; i < 60 && !(await h.count()); i++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(250); }
    if (!(await h.count())) { res[key].subs.push({ label, missing: true }); continue; }
    await h.evaluate(e => { const s = document.querySelector(".paper-scroll") || document.scrollingElement; e.scrollIntoView({ block: "center" }); });
    await p.waitForTimeout(800);
    res[key].subs.push(await h.evaluate((h) => {
      const r = (e) => e.getBoundingClientRect(); const hr = r(h);
      const all = [...document.querySelectorAll(".paper-article p, .paper-article .math-block, .paper-article .theorem-block, .paper-article figure, .paper-article ul, .paper-article ol")].filter(e => !h.contains(e) && r(e).height > 0);
      let prevBottom = -1e9, nextTop = 1e9;
      for (const e of all) { const q = r(e); if (q.bottom <= hr.top + 1) prevBottom = Math.max(prevBottom, q.bottom); if (q.top >= hr.bottom - 1) nextTop = Math.min(nextTop, q.top); }
      return { text: h.textContent.trim().slice(0, 30), mt: getComputedStyle(h).marginTop, above: Math.round(hr.top - prevBottom), below: Math.round(nextTop - hr.bottom) };
    }));
    // unstick check: position sticky may move it; screenshot
    const safe = label.startsWith("F") ? "11" : "121";
    await p.screenshot({ path: `${OUT}/sub-${safe}-${theme}-${w}.png` });
  }
  await ctx.close();
}
writeFileSync(`${OUT}/c4-probe.json`, JSON.stringify(res, null, 1));
await b.close();
