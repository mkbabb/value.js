// X-DS fourier pass 6 cure (critic F6C): AFTER frames for the critic's cells, headless real Chrome only (§0ei).
//  - C1: /w/<image> on a fresh load with every background compute answered 429 (page.route): the stage carries the
//    same one `.compute-status` line (message + Retry) the Basis layer does, centred in its message slot.
//    390: the Canvas tab (the stage) and the Controls tab (G1, glass-owned, recorded unchanged). Then Retry from
//    the STAGE's line, and the computes land.
// usage: BASE=http://localhost:3138 node f6c-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3138";
const IMG = process.env.IMG ?? "placid-stirring-opal-viper";
const RX = /\/api\/(images\/[^/]+\/extract-contour|contours\/[^/]+\/compute\/)/;
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
const read = (p) => p.evaluate(() => {
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const stage = document.querySelector(".canvas-stage");
  return {
    toasts: [...document.querySelectorAll("[data-sonner-toast], [data-slot='toast'], li[role='status'][data-type]")].map((t) => t.textContent.trim().slice(0, 80)),
    stage: stage ? r(stage) : null,
    lines: [...document.querySelectorAll(".compute-status")].filter((e) => e.offsetParent).map((e) => {
      const btn = e.querySelector("button");
      return { where: e.closest(".canvas-stage") ? "stage" : "aside", text: e.textContent.replace(/\s+/g, " ").trim(), box: r(e),
        role: e.getAttribute("role"), color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor,
        fontSize: getComputedStyle(e).fontSize, retryFontSize: btn ? getComputedStyle(btn).fontSize : null, retryBox: btn ? r(btn) : null };
    }),
  };
});
try {
  for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) {
      const k = `w-429-${theme}-${w}`; const ctx = await ctxFor(theme, w); const p = await ctx.newPage();
      try {
        await p.route(RX, problem429);
        await p.goto(`${BASE}/w/${IMG}`, { waitUntil: "domcontentloaded", timeout: 90000 }); await settle(p, 3500);
        if (w < 500) { await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(800); }
        out[k] = await read(p);
        await p.screenshot({ path: `${OUT}/${k}-${w < 500 ? "canvas" : "controls"}.png` });
        if (w < 500) {
          await p.getByRole("tab", { name: "Controls" }).click().catch(() => {}); await p.waitForTimeout(800);
          out[k + "-controls"] = await read(p);
          await p.screenshot({ path: `${OUT}/${k}-controls.png` });
          await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(800);
        }
        await p.unroute(RX);
        await p.locator(".canvas-stage .compute-status").getByRole("button", { name: "Retry" }).click({ timeout: 5000 });
        await settle(p, 6000);
        out[k + "-after-retry"] = await read(p);
        await p.screenshot({ path: `${OUT}/${k}-after-retry.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); }
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f6c-probe.json`, JSON.stringify(out, null, 1)); }
