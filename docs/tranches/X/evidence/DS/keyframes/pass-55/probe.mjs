// X-DS keyframes r8 pass 10 cure seat: geometry probe (headless real Chrome, one browser, closed in finally).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5193/";
const which = process.argv[2] ?? "all";
const out = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const springGeo = (page) => page.evaluate(async () => {
  const frame = () => new Promise((r) => requestAnimationFrame(r));
  const s = document.querySelector('[data-fold-key="spring-physics"]'); if (!s) return null;
  let last = -1, still = 0; const t0 = performance.now();
  while (performance.now() - t0 < 6000) { await frame(); const top = s.scrollTop; if (Math.abs(top - last) < 0.5) { if (++still >= 10) break; } else still = 0; last = top; }
  const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top*10)/10, Math.round(r.bottom*10)/10]; };
  const surf = s.closest(".controls-surface"); const wrap = s.closest(".controls-content") ?? s.closest(".controls-pane-wrapper");
  const txt = (t) => [...s.querySelectorAll("*")].find((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim() === t));
  const chain = []; for (let e = s; e && e !== document.body; e = e.parentElement) { const r = e.getBoundingClientRect(); chain.push(`${e.tagName.toLowerCase()}.${[...e.classList].slice(0,3).join(".")} ${Math.round(r.top)}-${Math.round(r.bottom)} mbs=${e.style.maxBlockSize||""}`); if (chain.length > 14) break; }
  return { scrollTop: s.scrollTop, scrollHeight: s.scrollHeight, client: s.clientHeight, maxBlock: s.style.maxBlockSize, headed: s.hasAttribute("data-fold-headed"),
    port: R(s), surface: R(surf), surfaceMbs: surf?.style.maxBlockSize, wrap: R(wrap), response: R(txt("response")), damping: R(txt("damping")), bouncy: R(txt("Bouncy")),
    ribbon: R(document.querySelector(".transport-ribbon, [data-transport-ribbon], .controls-ribbon")), chain };
});
const easingGeo = (page) => page.evaluate(() => {
  const d = document.querySelector(".specimen-drawer"); if (!d) return null;
  const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; };
  const dr = d.getBoundingClientRect();
  const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => ({ k: e.classList.contains("catalogue-family") ? "H:" + e.textContent.trim() : "t", r: R(e) })).filter((x) => x.r[1] > dr.top && x.r[0] < dr.bottom + 200);
  const plate = d.closest(".stage-plate, [data-stage-plate]") ?? d.parentElement;
  return { drawer: R(d), maxBlock: d.style.maxBlockSize, scrollTop: d.scrollTop, plate: R(plate), parent: R(d.parentElement), rows: rows.slice(-14) };
});
try {
  if (which === "all" || which === "spring") for (const [w, h] of [[1440, 900], [1280, 800], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" }); const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      out[`spring-rest-${w}x${h}`] = await springGeo(page);
      const trigger = page.locator(".spring-heatmap-section [data-figure-title]").first();
      if ((await trigger.getAttribute("aria-expanded")) !== "true") await trigger.click();
      await page.waitForTimeout(900);
      out[`spring-open-${w}x${h}`] = await springGeo(page);
    } finally { await ctx.close(); }
  }
  if (which === "all" || which === "easing") for (const [w, h] of [[1440, 900], [390, 844], [1280, 800]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light", deviceScaleFactor: w === 390 ? 2 : 1 }); const page = await ctx.newPage();
    try { await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500); out[`easing-${w}x${h}`] = await easingGeo(page); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); console.log(JSON.stringify(out, null, 1)); }
