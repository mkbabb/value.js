// X-DS fourier pass 11 cure (F11X): frames + computed reads for DS-F11X-C1/C2/T1/T2. Headless real Chrome (§0ei).
// usage: BASE=http://localhost:3131 node f11x-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3131";
const out = {};

// C1: the dock's form and width on every phone route.
const dock = (p) => p.evaluate(() => {
  const trig = document.querySelector(".nav-trigger"); const label = trig?.querySelector(".nav-trigger-label");
  let run = trig?.parentElement; while (run && !["auto", "scroll"].includes(getComputedStyle(run).overflowX)) run = run.parentElement;
  const plate = document.querySelector(".app-dock")?.getBoundingClientRect();
  const rb = run?.getBoundingClientRect();
  const end = rb ? rb.left + run.clientLeft + run.clientWidth - parseFloat(getComputedStyle(run).paddingInlineEnd) : null;
  const right = run ? Math.max(...[...run.children].map((c) => c.getBoundingClientRect().right)) : null;
  return { labelShown: !!label && getComputedStyle(label).display !== "none", labelText: label?.textContent, name: trig?.getAttribute("aria-label"), dockW: plate && +plate.width.toFixed(1), runClient: run?.clientWidth, runScroll: run?.scrollWidth, childrenEndMinusRunEnd: run && +(right - end).toFixed(2) };
});
// C2: the tile states' marks.
const tiles = (p) => p.evaluate(() => [...document.querySelectorAll(".levels-card .grid-cell")].filter((t) => t.matches(".active, .is-bound")).map((t) => {
  const cs = getComputedStyle(t); const l = getComputedStyle(t.querySelector(".grid-label"));
  return { label: t.textContent.trim(), active: t.classList.contains("active"), bound: t.classList.contains("is-bound"), edge: cs.borderTopColor, ring: cs.boxShadow, caption: l.color, captionWeight: l.fontWeight };
}));
// T2: the readout rows.
const readout = (p) => p.evaluate(() => {
  const r = document.querySelector(".demo-info"); const kids = [...r.children].map((k) => k.getBoundingClientRect());
  const tops = kids.map((k) => Math.round(k.top));
  return { width: Math.round(r.getBoundingClientRect().width), rows: [...new Set(tops)].length, tops, display: getComputedStyle(r).display };
});
// T1: the error stage's lines.
const stageErr = (p) => p.evaluate(() => {
  const s = document.querySelector("[data-testid=not-found]");
  return s && { lines: [...s.querySelectorAll("h1, p")].map((e) => e.textContent.trim().replace(/\s+/g, " ")) };
});

const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light", "dark"]) {
    const ctxOf = (w) => b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    const go = async (p, path) => {
      await p.mouse.move(0, 0).catch(() => {});
      await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(3000);
    };
    const init = (ctx) => ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);

    // C1 — 390, every route
    { const ctx = await ctxOf(390); await init(ctx); const p = await ctx.newPage();
      try {
        for (const route of ["/", "/paper", "/gallery", "/visualize", "/equation", "/morph"]) {
          const k = `dock-${theme}-390${route === "/" ? "-home" : route.replace("/", "-")}`;
          try { await go(p, route); out[k] = await dock(p); await p.screenshot({ path: `${OUT}/${k}.png`, clip: { x: 0, y: 0, width: 390, height: 90 } }); }
          catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
        }
      } finally { await ctx.close(); } }

    // C2 + T2 — /morph at 1440, 1024, 390
    for (const w of [1440, 1024, 390]) {
      const k = `morph-${theme}-${w}`; const ctx = await ctxOf(w); await init(ctx); const p = await ctx.newPage();
      try {
        await go(p, "/morph");
        out[k] = { readout: await readout(p) };
        await p.locator(".demo-info").scrollIntoViewIfNeeded();
        await p.screenshot({ path: `${OUT}/${k}-readout.png` });
        await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
        out[k].tiles = await tiles(p);
        await p.screenshot({ path: `${OUT}/${k}-levels.png` });
        await p.locator(".levels-card").screenshot({ path: `${OUT}/${k}-levels-card.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
      finally { await ctx.close(); }
    }

    // T1 — /v/:slug error stage at 1440: a bare failure (no detail), and one with a real detail.
    for (const [arm, fulfil] of [
      ["bare", { status: 502, contentType: "text/plain", body: "" }],
      ["detail", { status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503, detail: "The visualization store is unreachable." }) }],
    ]) {
      const k = `v-error-${arm}-${theme}-1440`; const ctx = await ctxOf(1440); await init(ctx); const p = await ctx.newPage();
      try {
        await p.route("**/api/visualizations/f11x-missing", (r) => r.fulfill(fulfil));
        await go(p, "/v/f11x-missing");
        out[k] = await stageErr(p);
        await p.screenshot({ path: `${OUT}/${k}.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
      finally { await ctx.close(); }
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f11x-probe.json`, JSON.stringify(out, null, 1)); }
