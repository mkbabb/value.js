// X-DS fourier pass 4 · critic F4C — CURE AFTER frames + measures for the consumer
// rows C1 (Basis group step) and C2 (the f(t) legend key). Headless real Chrome
// only (§0ei). The glass rows G1..G4 are re-shot as witnesses, not cured.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
try {
  const shot = (p, n, full = false) => p.screenshot({ path: `${OUT}/${n}.png`, fullPage: full }).catch((e) => console.log("shot fail", n, e.message));
  for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
    const k = `${theme}-${w}`; const o = (out[k] = {});
    const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
    const step = async (name, fn) => { try { await fn(); } catch (e) { o[name + "Err"] = e.message.slice(0, 300); } };
    await step("c1", async () => {
      await go(`/v/${SLUG}`, 1000);
      await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => {});
      await p.waitForTimeout(4000);
      const lab = p.locator(".basis-group-label").nth(1);
      await lab.scrollIntoViewIfNeeded().catch(() => {}); await p.waitForTimeout(500); await p.mouse.move(0, 0).catch(() => {});
      await shot(p, `v-basis-${k}`);
      o.c1 = await p.evaluate(() => {
        const g = document.querySelector(".basis-groups"); if (!g) return null;
        const kids = [...g.children]; const labels = kids.filter((e) => e.classList.contains("basis-group-label"));
        const L = labels[1]; const i = kids.indexOf(L); const prev = kids[i - 1], next = kids[i + 1];
        const r = (e) => e.getBoundingClientRect(); const cs = getComputedStyle(L);
        const chipH = Math.round(r(next.querySelector("button") ?? next).height);
        return { label: L.textContent.trim(), marginTop: cs.marginTop, gapAbove: +(r(L).top - r(prev).bottom).toFixed(1), gapBelow: +(r(next).top - r(L).bottom).toFixed(1), chipH };
      });
    });
    await step("c2", async () => {
      await go("/equation", 1000);
      await p.waitForSelector(".eq-result-root", { state: "attached", timeout: 90000 });
      await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
      await shot(p, `equation-${k}`);
      if (w === 390) { await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(1500); await p.mouse.move(0, 0).catch(() => {}); await shot(p, `equation-canvas-${k}`); }
      o.c2 = await p.evaluate(() => {
        const d = document.querySelector(".legend-dot--dashed"); if (!d) return null;
        const g = document.querySelector(".legend-dot--golden"); const r = (e) => e.getBoundingClientRect(); const c = getComputedStyle(d);
        const lab = (e) => r(e.parentElement.querySelector(".legend-label"));
        const rd = r(d), rg = r(g);
        return { box: [rd.width, rd.height].map((n) => +n.toFixed(1)), borderTop: `${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor}`, radius: c.borderRadius, borderLeft: c.borderLeftStyle,
          axisOffset: +((rd.top + rd.height / 2) - (lab(d).top + lab(d).height / 2)).toFixed(1), dotAxisOffset: +((rg.top + rg.height / 2) - (lab(g).top + lab(g).height / 2)).toFixed(1),
          labelLeftDelta: +(lab(d).left - lab(g).left).toFixed(1), centreDelta: +((rd.left + rd.width / 2) - (rg.left + rg.width / 2)).toFixed(1) };
      });
      const leg = p.getByRole("region", { name: "Curve legend" });
      if (await leg.isVisible().catch(() => false)) await leg.screenshot({ path: `${OUT}/legend-${k}.png` }).catch(() => {});
    });
    await step("morph", async () => { await go("/morph", 2500); await shot(p, `morph-${k}`); });
    await ctx.close();
  }
} finally {
  writeFileSync(`${OUT}/f4c-cure-probe-after.json`, JSON.stringify(out, null, 1));
  await b.close();
}
