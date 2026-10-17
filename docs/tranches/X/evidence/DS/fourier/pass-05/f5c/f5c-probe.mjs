// X-DS fourier pass 5 cure (critic F5C): AFTER frames for the critic's cells, headless real Chrome only (§0ei).
//  - C1: /w/<image> on a fresh load with every background compute answered 429 (page.route), so the failure state is
//    witnessed on demand: no toast, the Basis layer mounted with its one muted status line + Retry.
//  - /v at 390 (canvas + Controls tab), the dock nav menu at 1440 (G2, glass-owned, recorded unchanged),
//    /gallery toolbar (T1: the search's block-end against the tabs' underline).
// usage: BASE=http://localhost:3137 node f5c-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3137";
const VIZ = process.env.VIZ ?? "hazy-etching-cream-elk"; const IMG = process.env.IMG ?? "placid-stirring-opal-viper";
const out = {};
const problem429 = (route) => route.fulfill({ status: 429, contentType: "application/problem+json", headers: { "Retry-After": "30" },
  body: JSON.stringify({ type: "urn:contract:rate-limited", title: "Rate limit exceeded", status: 429 }) });
const b = await chromium.launch({ channel: "chrome", headless: true });
async function ctxFor(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx;
}
const settle = async (p, ms = 2500) => { await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); };
const readC1 = (p) => p.evaluate(() => {
  const st = [...document.querySelectorAll(".compute-status")].filter((e) => e.offsetParent);
  return {
    toasts: [...document.querySelectorAll("[data-sonner-toast], [data-slot='toast'], li[role='status'][data-type]")].map((t) => t.textContent.trim().slice(0, 80)),
    layers: [...document.querySelectorAll(".viz-panel-left [data-configurator-layer], .viz-panel-left section, .viz-panel-left [data-slot='configurator-layer']")].map((l) => l.getAttribute("aria-label") ?? l.querySelector("button, h3, [data-slot*='label']")?.textContent.trim().slice(0, 30)),
    status: st.map((e) => ({ text: e.textContent.replace(/\s+/g, " ").trim(), color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor, border: getComputedStyle(e).borderTopWidth })),
  };
});
try {
  for (const theme of ["light", "dark"]) {
    // C1 — forced 429 on every background compute
    for (const w of [1440, 390]) {
      const k = `w-429-${theme}-${w}`; const ctx = await ctxFor(theme, w); const p = await ctx.newPage();
      try {
        await p.route(/\/api\/(images\/[^/]+\/extract-contour|contours\/[^/]+\/compute\/)/, problem429);
        await p.goto(`${BASE}/w/${IMG}`, { waitUntil: "domcontentloaded", timeout: 90000 }); await settle(p, 3500);
        if (w < 500) { await p.getByRole("tab", { name: "Controls" }).click().catch(() => {}); await p.waitForTimeout(800); }
        out[k] = await readC1(p);
        await p.screenshot({ path: `${OUT}/${k}-controls.png` });
        // Retry stays quiet: unroute and press it, the computes then land
        await p.unroute(/\/api\/(images\/[^/]+\/extract-contour|contours\/[^/]+\/compute\/)/);
        await p.locator(".compute-status:visible").getByRole("button", { name: "Retry" }).first().click({ timeout: 5000 });
        await settle(p, 5000);
        out[k + "-after-retry"] = await readC1(p);
        await p.screenshot({ path: `${OUT}/${k}-after-retry.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); }
    }
    // /v at 390 (canvas, then the Controls tab)
    { const k = `v-${theme}-390`; const ctx = await ctxFor(theme, 390); const p = await ctx.newPage();
      try {
        await p.goto(`${BASE}/v/${VIZ}`, { waitUntil: "domcontentloaded", timeout: 90000 }); await settle(p, 3500);
        out[k] = await readC1(p);
        await p.screenshot({ path: `${OUT}/${k}.png` });
        await p.getByRole("tab", { name: "Controls" }).click().catch(() => {}); await p.waitForTimeout(800);
        await p.screenshot({ path: `${OUT}/v-controls-${theme}-390.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); } }
    // dock nav menu at 1440 (G2, glass-owned: recorded as is)
    { const k = `v-menu-${theme}-1440`; const ctx = await ctxFor(theme, 1440); const p = await ctx.newPage();
      try {
        await p.goto(`${BASE}/v/${VIZ}`, { waitUntil: "domcontentloaded", timeout: 90000 }); await settle(p);
        await p.locator(".nav-trigger").first().click(); await p.waitForTimeout(700);
        out[k] = await p.evaluate(() => [...document.querySelectorAll("[role='menuitem']")].map((m) => ({ t: m.textContent.trim(), cur: m.getAttribute("aria-current"), bg: getComputedStyle(m).backgroundColor })));
        await p.screenshot({ path: `${OUT}/${k}.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); } }
    // gallery toolbar
    for (const w of [1440, 390]) {
      const k = `gallery-${theme}-${w}`; const ctx = await ctxFor(theme, w); const p = await ctx.newPage();
      try {
        await p.goto(`${BASE}/gallery`, { waitUntil: "domcontentloaded", timeout: 90000 }); await settle(p);
        out[k] = await p.evaluate(() => {
          const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), top: +b.top.toFixed(1), bottom: +b.bottom.toFixed(1), w: +b.width.toFixed(1) }; };
          const list = document.querySelector("[role='tablist']"); const search = document.querySelector("input[type='search'], input[placeholder^='Search']");
          const field = search?.closest("form, [class*='search']") ?? search;
          return { tablist: r(list), searchInput: r(search), searchField: r(field) };
        });
        await p.screenshot({ path: `${OUT}/${k}.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); }
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f5c-probe.json`, JSON.stringify(out, null, 1)); }
