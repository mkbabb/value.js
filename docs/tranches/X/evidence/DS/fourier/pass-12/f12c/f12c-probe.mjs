// X-DS fourier pass 12 · F12C cure probe (DS-F12C-C1: one compute-failure line per visible surface on /v). Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3201"; const VIZ = process.argv[4] ?? "hazy-etching-cream-elk";
const fail = (r) => r.fulfill({ status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503, detail: "The compute service is unavailable" }) });
const out = {};
const measure = (p) => p.evaluate(() => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const lines = [...document.querySelectorAll(".compute-status")].map((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    const visible = r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && !el.closest(".panel-inactive");
    return { where: el.closest(".stage-state") ? "v-stage" : "aside", role: el.getAttribute("role"), visible, box: { y: r1(r.y), w: r1(r.width), h: r1(r.height) }, msg: el.querySelector(".compute-status-msg")?.textContent?.trim() };
  });
  const groups = [...document.querySelectorAll(".basis-group-label")].map((e) => ({ t: e.textContent.trim(), y: r1(e.getBoundingClientRect().y) }));
  return { form: document.querySelector(".viz-workspace")?.getAttribute("data-form"), visibleCount: lines.filter((l) => l.visible).length,
    statusRoles: lines.filter((l) => l.role === "status").length, lines, basisGroups: groups, scrollW: document.documentElement.scrollWidth };
});
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [theme, w] of [["light",1440],["dark",1440],["light",1024],["light",390],["dark",390]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? (w === 1024 ? 768 : 900) : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    await ctx.route(/\/api\/contours\/[^/]+\/compute\//, fail);
    const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
    try {
      await p.goto(`${BASE}/v/${VIZ}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.waitForSelector(".compute-status", { timeout: 30000 }).catch(() => {});
      await p.waitForTimeout(2500);
      const k = `v-${theme}-${w}`;
      if (w < 500) {
        await p.screenshot({ path: `${OUT}/${k}-controls.png` }); out[`${k}-controls`] = await measure(p);
        await p.getByRole("tab", { name: /canvas/i }).first().click().catch(() => {}); await p.waitForTimeout(1200);
        await p.screenshot({ path: `${OUT}/${k}-canvas.png` }); out[`${k}-canvas`] = await measure(p);
      } else { await p.screenshot({ path: `${OUT}/${k}.png` }); out[k] = await measure(p); }
      out[k + "-pageErrors"] = errs;
    } catch (e) { out[`v-${theme}-${w}-err`] = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
  // DS-F12C-T1 cells (no code change; frames for proportion): /equation at 1440, live API.
  for (const theme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try { await p.goto(`${BASE}/equation`, { waitUntil: "domcontentloaded", timeout: 60000 }); await p.waitForTimeout(5000); await p.screenshot({ path: `${OUT}/equation-${theme}-1440.png` }); }
    finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f12c-probe.json`, JSON.stringify(out, null, 1)); }
