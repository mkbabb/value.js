// X-DS pass 6 cure probe (DS-F8-C2/C4/C5): headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] || "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
for (const theme of ["light", "dark"]) {
  const mk = async (w, h, phone = false) => { const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, ...(phone ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme); return [ctx, await ctx.newPage()]; };
  // C2: the dialog ladder
  let [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.locator(".card-open").first().click(); await p.waitForTimeout(1500);
  res[`modal-${theme}`] = await p.evaluate(() => { const d = document.querySelector("[role=dialog]"); const f = (e) => e && [e.textContent.trim().replace(/\s+/g, " ").slice(0, 30), getComputedStyle(e).fontSize, getComputedStyle(e).fontWeight];
    const harm = [...d.querySelectorAll(".modal-section span")].find((e) => e.textContent.trim() === "Harmonics");
    return { title: f(d.querySelector("h2")), desc: f(d.querySelector("[data-slot=dialog-description]")), views: f(d.querySelector(".modal-stat")), like: f(d.querySelector(".like-btn")), h3: f(d.querySelector("h3")), harm: f(harm) }; });
  await p.screenshot({ path: `${OUT}/modal-${theme}-1440.png` });
  await ctx.close();
  // C4: the phone ToC crumb with a sub-section active; C5: eq (1.19) at 390
  [ctx, p] = await mk(390, 844, true);
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  await p.mouse.move(195, 400);
  const num = p.locator(".paper-article .math-block__number", { hasText: "(1.19)" }).first();
  for (let i = 0; i < 80 && !(await num.count()); i++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(250); }
  const target = (await num.count()) > 0;
  if (target) { await num.evaluate((e) => e.closest(".math-block").scrollIntoView({ block: "center" })); }
  await p.waitForTimeout(1500);
  res[`crumb-${theme}`] = await p.evaluate(() => [...document.querySelectorAll(".floating-toc-bar .floating-toc-crumb")].map((c) => c.textContent.trim().replace(/\s+/g, " ")));
  res[`eq119-${theme}`] = target && await num.evaluate((n) => { const mb = n.closest(".math-block"); const kd = mb.querySelector(".katex-display"); const r = (e) => { const x = e.getBoundingClientRect(); return [Math.round(x.left), Math.round(x.top), Math.round(x.right), Math.round(x.bottom)]; };
    return { cols: getComputedStyle(mb).gridTemplateColumns, number: r(n), display: r(kd), scrollW: kd.scrollWidth, clientW: kd.clientWidth, numberStyle: getComputedStyle(n).fontStyle }; });
  await p.screenshot({ path: `${OUT}/paper-119-${theme}-390.png` });
  await ctx.close();
  // C5: /equation a+b fade width
  [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  res[`eq-fade-${theme}`] = await p.evaluate(() => [...document.querySelectorAll(".eq-scroll-region")].map((e) => { const cs = getComputedStyle(e); return { fadeW: cs.getPropertyValue("--fade-scroll-width"), fadeEnd: cs.getPropertyValue("--fade-end"), sw: e.scrollWidth, cw: e.clientWidth }; }));
  await ctx.close();
}
writeFileSync(`${OUT}/f8-cure-probe.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res, null, 1));
await b.close();
