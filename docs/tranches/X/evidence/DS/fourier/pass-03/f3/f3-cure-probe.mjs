// X-DS fourier pass 3 (critic F3) — AFTER cells for the cure. Headless real Chrome only (§0ei).
// usage: node f3-cure-probe.mjs OUT BASE
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { mkdirSync, writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3128";
const SLUG = "plush-evening-olive-squid";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const measure = () => {
  const vis = (e) => e.getClientRects().length > 0;
  const out = {};
  // C2: every layer heading — label and caption, and whether either is cut
  out.layers = [...document.querySelectorAll(".configurator-layer-heading")].filter(vis).map((h) => {
    const [label, sub] = h.children;
    const cut = (e) => (e ? e.scrollWidth > e.clientWidth + 0.5 : null);
    return { label: label?.textContent.trim(), labelCut: cut(label), sub: sub?.textContent.trim() ?? null, subCut: cut(sub) };
  });
  // C4: the load-error / not-found primary carries the Upload glyph
  out.primaries = [...document.querySelectorAll("button[data-emphasis=primary]")].filter(vis).map((e) => ({ t: e.textContent.trim(), glyph: !!e.querySelector("svg") }));
  const cb = document.querySelector(".compute-btn");
  if (cb) { const cs = getComputedStyle(cb); out.compute = { color: cs.color, bg: cs.backgroundColor, border: cs.borderColor }; }
  return out;
};
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  // /equation after Compute, the pointer parked off the controls (C3)
  let p = await page(theme, w);
  await p.goto(BASE + "/equation", { waitUntil: "networkidle" }).catch(() => {});
  const compute = p.getByRole("button", { name: "Compute" });
  await compute.waitFor({ timeout: 60000 }).catch(() => {});
  for (let i = 0; i < 120 && !(await compute.isEnabled().catch(() => false)); i++) await p.waitForTimeout(500);
  await compute.click().catch(() => {});
  await p.mouse.move(0, 0);
  await p.waitForTimeout(6000);
  res[`equation-${theme}-${w}`] = await p.evaluate(measure);
  await p.screenshot({ path: `${OUT}/equation-${theme}-${w}.png` });
  if (w === 1440) {
    // C3: the hovered Compute is glass's primary hover (no consumer re-tone)
    await compute.hover().catch(() => {});
    await p.waitForTimeout(400);
    res[`equation-${theme}-${w}`].computeHover = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector(".compute-btn")); return { color: cs.color, bg: cs.backgroundColor, border: cs.borderColor }; });
    await p.locator(".compute-btn").screenshot({ path: `${OUT}/compute-hover-${theme}-1440.png` }).catch(() => {});
    await p.mouse.move(0, 0);
  }
  await p.context().close();
  for (const [n, r] of Object.entries({ w: "/w", v: `/v/${SLUG}`, "v-error": "/v/no-such-slug-zz", "no-such-route": "/no-such-route-zz" })) {
    p = await page(theme, w);
    await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(n === "v" ? 6000 : 3000);
    res[`${n}-${theme}-${w}`] = await p.evaluate(measure);
    await p.screenshot({ path: `${OUT}/${n}-${theme}-${w}.png` });
    if (n === "v") {
      // C1: the stage canvas alone, so the chain's tip reads at full scale
      const st = p.locator(".configurator-stage").first();
      if (await st.isVisible().catch(() => false)) await st.screenshot({ path: `${OUT}/v-stage-${theme}-${w}.png` });
      if (w === 390) {
        const coef = p.locator(".configurator-layer").filter({ hasText: "Coefficients" }).first();
        if (await coef.count()) { await coef.scrollIntoViewIfNeeded().catch(() => {}); await coef.screenshot({ path: `${OUT}/coeff-header-${theme}-390.png` }).catch(() => {}); }
      }
    }
    await p.context().close();
  }
}
writeFileSync(`${OUT}/f3-cure-probe-after.json`, JSON.stringify(res, null, 1));
await b.close();
