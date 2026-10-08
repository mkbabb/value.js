import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
for (const theme of ["light", "dark"]) {
  const p = await page(theme, 1440);
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  res[`theorem-${theme}`] = await p.evaluate(() => {
    const els = [...document.querySelectorAll(".theorem-block")];
    const kinds = {};
    for (const e of els) { const k = [...e.classList].find(c => c.startsWith("theorem-block--")); kinds[k] = (kinds[k]||0)+1; }
    const e = els.find(x => x.classList.contains("theorem-block--theorem")) || els[0];
    if (!e) return { n: 0 };
    e.scrollIntoView({ block: "center" });
    const cs = getComputedStyle(e), bf = getComputedStyle(e, "::before");
    return { n: els.length, kinds, shadow: cs.boxShadow, radius: cs.borderRadius, bl: cs.borderLeft, bg: cs.backgroundColor, transition: cs.transition, before: { content: bf.content, w: bf.width, bt: bf.borderTop, br: bf.borderRight, op: bf.opacity } };
  });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/theorem-${theme}-1440.png` });
  const tb = await p.$(".theorem-block--theorem") || await p.$(".theorem-block");
  if (tb) { await tb.hover(); await p.waitForTimeout(600); await p.screenshot({ path: `${OUT}/theorem-hover-${theme}-1440.png` });
    res[`theorem-hover-${theme}`] = await tb.evaluate(e => ({ shadow: getComputedStyle(e).boxShadow, tf: getComputedStyle(e).transform })); }
  // heading spacing
  res[`headings-${theme}`] = await p.evaluate(() => {
    const out = [];
    for (const h of [...document.querySelectorAll(".paper-article h2, .paper-article h3, .paper-article h4")].slice(0, 6)) {
      const r = h.getBoundingClientRect(); const prev = h.previousElementSibling, next = h.nextElementSibling;
      out.push({ tag: h.tagName, text: h.textContent.trim().slice(0, 40), mt: getComputedStyle(h).marginTop, mb: getComputedStyle(h).marginBottom,
        gapAbove: prev ? Math.round(r.top - prev.getBoundingClientRect().bottom) : null, gapBelow: next ? Math.round(next.getBoundingClientRect().top - r.bottom) : null, cls: h.className });
    }
    return out;
  });
  await p.close();
  // equation a+b overflow
  const q = await page(theme, 1440);
  await q.goto(BASE + "/equation", { waitUntil: "networkidle" }); await q.waitForTimeout(3000);
  await q.getByRole("radio", { name: /a \+ b/ }).first().click().catch(async () => { await q.getByText("a + b").first().click().catch(() => {}); });
  await q.waitForTimeout(1500);
  res[`eqab-${theme}`] = await q.evaluate(() => {
    const k = [...document.querySelectorAll(".katex-display, .katex")].map(e => e.closest("div")).filter(Boolean)[0];
    const out = [];
    for (const e of document.querySelectorAll(".katex-display")) { let h = e; const chain = []; for (let i = 0; i < 4 && h; i++) { const cs = getComputedStyle(h); chain.push([h.className.toString().slice(0, 50), h.scrollWidth, h.clientWidth, cs.overflowX, cs.maskImage?.slice(0, 40)]); h = h.parentElement; } out.push(chain); }
    return out;
  });
  await q.screenshot({ path: `${OUT}/eq-ab-${theme}-1440.png` });
  await q.close();
}
// notfound + morph 390 sticky + v 390 canvas caption
for (const theme of ["light", "dark"]) {
  const p = await page(theme, 1440);
  await p.goto(BASE + "/no-such-page", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
  res[`nf-${theme}`] = await p.evaluate(() => { const h = [...document.querySelectorAll("h1,h2")].find(x => /not found/i.test(x.textContent)); let c = h; for (let i=0;i<4&&c;i++){ if (getComputedStyle(c).borderTopWidth !== "0px") break; c = c.parentElement; }
    const r = (e) => { const q = e.getBoundingClientRect(); return [q.x, q.y, q.width, q.height].map(Math.round); };
    return c && { cls: c.className, pad: getComputedStyle(c).padding, rect: r(c), h: r(h), btns: [...c.querySelectorAll("a,button")].map(r) }; });
  await p.close();
  const m = await page(theme, 390);
  await m.goto(BASE + "/morph", { waitUntil: "networkidle" }); await m.waitForTimeout(2500);
  await m.mouse.wheel(0, 900); await m.evaluate(() => window.scrollBy(0, 700)); await m.waitForTimeout(1200);
  res[`morph390-${theme}`] = await m.evaluate(() => { const out = []; for (const e of document.querySelectorAll("*")) { const cs = getComputedStyle(e); if (cs.position === "sticky") { const q = e.getBoundingClientRect(); out.push({ cls: e.className.toString().slice(0, 80), top: cs.top, rect: [q.x, q.y, q.width, q.height].map(Math.round), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 60), bb: cs.borderBottom, z: cs.zIndex }); } } return out; });
  await m.screenshot({ path: `${OUT}/morph-scrolled-${theme}-390.png` });
  await m.close();
}
writeFileSync(`${OUT}/probe.json`, JSON.stringify(res, null, 1));
await b.close();
