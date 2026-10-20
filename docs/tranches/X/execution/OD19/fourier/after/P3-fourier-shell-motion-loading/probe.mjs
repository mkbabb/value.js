// OD19 fourier AFTER probe — P3 (F5, F6, ALL). Headless; ONE browser; context per cell; closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node probe.mjs
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:3100";
const VIZ = process.env.VIZ ?? "/v/hazy-etching-cream-elk";
const R = {};
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const w of [1440, 390]) {
    const cell = `${scheme}-${w}`; const H = w === 390 ? 844 : 900; const C = (R[cell] = {});
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      // F5: the first layer's corner on /v and /equation
      C.F5 = {};
      for (const [route, stack] of [[VIZ, ".viz-panel-left"], ["/equation", ".eq-panel-left-wrap"], ["/morph", null]]) {
        await page.goto(BASE + route, { waitUntil: "load" }); await page.waitForTimeout(1500);
        if (!stack) { C.F5[route] = `configurator-layers=${await page.locator(".configurator-layer").count()}`; continue; }
        if (w < 1024) { const t = page.getByText("Controls", { exact: true }); if (await t.count()) { await t.first().click(); await page.waitForTimeout(500); } }
        const layer = page.locator(`${stack} .configurator-layer`).first();
        C.F5[route] = await layer.evaluate((e) => ({ r: getComputedStyle(e).borderTopLeftRadius, aside: getComputedStyle(e.closest(".configurator-aside")).borderTopLeftRadius }));
        const b = await layer.boundingBox();
        await page.screenshot({ path: `${OUT}${cell}-F5-layer-top${route.replace(/\W/g, "_")}.png`, clip: { x: Math.max(0, b.x - 12), y: Math.max(0, b.y - 12), width: Math.min(220, w - b.x + 12), height: 80 } });
      }
      // F6: toggle ink
      await page.goto(BASE + "/gallery", { waitUntil: "load" }); await page.waitForTimeout(1200);
      C.F6 = await page.locator(".app-dock .sun-moon-toggle svg").evaluate((s) => { const p = s.querySelector("path"); const b = p.getBoundingClientRect(); const box = s.getBoundingClientRect(); const k = box.width / s.viewBox.baseVal.width; const sw = parseFloat(p.getAttribute("stroke-width")) * k; return { viewBox: s.getAttribute("viewBox"), box: [box.width, box.height], ink: [+(b.width + sw).toFixed(1), +(b.height + sw).toFixed(1)], strokePx: +sw.toFixed(2) }; });
      const tb = await page.locator(".app-dock .sun-moon-toggle").boundingBox();
      await page.screenshot({ path: `${OUT}${cell}-F6-toggle.png`, clip: { x: Math.max(0, tb.x - 40), y: Math.max(0, tb.y - 8), width: 120, height: tb.height + 16 } });
      // ALL: route pushes — VT frames (new-root opacity < 1), dock y/h stability, loader-text frames
      C.routeTx = {};
      for (const to of ["/paper", VIZ, "/gallery", "/equation", "/morph"]) {
        const p = page.evaluate((ms) => new Promise((res) => { const t0 = performance.now(); let n = 0, vt = 0, min = 1, loader = 0, moves = 0, d0 = null;
          const f = () => { n++; const a = document.getAnimations().find((x) => x.effect?.pseudoElement === "::view-transition-new(root)" && x.playState === "running");
            const op = a ? (a.effect.getComputedTiming().progress ?? 1) : 1; if (op < 1) vt++; min = Math.min(min, op);
            if (/Loading the|Computing…/.test(document.querySelector("main")?.innerText ?? "")) loader++;
            const d = document.querySelector(".app-dock")?.getBoundingClientRect(); const k = d ? `${Math.round(d.y)},${Math.round(d.height)}` : "-"; if (d0 === null) d0 = k; else if (k !== d0) moves++;
            if (performance.now() - t0 < ms) requestAnimationFrame(f); else res({ frames: n, vtFrames: vt, minOpacity: +min.toFixed(2), loaderFrames: loader, dockMoves: moves }); };
          requestAnimationFrame(f); }), 900);
        await page.evaluate((to) => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push(to), to);
        C.routeTx[to] = await p; await page.waitForTimeout(500);
      }
    } catch (e) { C.error = e.message.slice(0, 300); } finally { await ctx.close(); }
  }
  // ALL: skeletons (delayed API) + /equation intent latency + cold loads, light 1440
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  try {
    const page = await ctx.newPage();
    await page.route("**/api/equations/compute", async (r) => { await new Promise((x) => setTimeout(x, 1500)); await r.fallback(); });
    await page.goto(BASE + "/equation"); await page.waitForSelector(".eq-panel-right[aria-busy=true] .skeleton", { timeout: 15000 });
    await page.screenshot({ path: `${OUT}light-1440-equation-skeleton.png` }); await page.unroute("**/api/equations/compute");
    await page.route(`**/api/visualizations/${VIZ.split("/").pop()}`, async (r) => { await new Promise((x) => setTimeout(x, 1500)); await r.fallback(); });
    await page.goto(BASE + VIZ); await page.waitForSelector(".configurator-stage [aria-busy=true] .skeleton", { timeout: 15000 });
    await page.screenshot({ path: `${OUT}light-1440-viz-skeleton.png` });
  } finally { await ctx.close(); }
  R.equationIntent = [];
  for (let i = 0; i < 3; i++) {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const page = await c.newPage(); await page.goto(BASE + "/paper"); await page.waitForTimeout(1500);
      await page.locator(".app-dock").getByRole("button", { name: /^Navigate/ }).click();
      const item = page.getByRole("menuitem", { name: "Equation" }); await item.hover(); const dwell = [0, 1000, 3000][i]; await page.waitForTimeout(dwell);
      const t0 = Date.now(); await item.click(); await page.locator(".eq-card").first().waitFor({ timeout: 20000 });
      R.equationIntent.push({ dwellMs: dwell, readyMs: Date.now() - t0 });
    } finally { await c.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}probe.json`, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1).slice(0, 5000));
