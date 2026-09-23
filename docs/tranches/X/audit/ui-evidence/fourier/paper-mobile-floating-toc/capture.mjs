// UIA-F paper-mobile-floating-toc capture — headed Chromium, real GPU. Read-only on the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const VPS = { m: { width: 390, height: 844 }, d: { width: 1440, height: 900 } };
const metrics = {};
const log = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const measure = (page) => page.evaluate(() => {
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, color: cs.color, border: cs.borderBottom, pad: cs.padding, font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.slice(0, 24), shadow: cs.boxShadow.slice(0, 90), bdf: cs.backdropFilter, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, cls: (el.className?.toString?.() || "").slice(0, 110) }; };
  const q = (s) => document.querySelector(s);
  const dd = q(".floating-toc-dropdown");
  const items = dd ? [...dd.querySelectorAll(".floating-toc-item")] : [];
  const sc = q(".paper-scroll");
  return {
    dark: document.documentElement.classList.contains("dark"),
    floatingToc: box(q(".floating-toc")),
    bar: box(q(".floating-toc-bar")),
    titleBtn: box(q(".floating-toc-title-btn")), titleText: q(".floating-toc-section")?.innerHTML.slice(0, 200),
    searchBtn: box(q(".floating-toc-search-btn")),
    closeBtn: box(q(".floating-toc-search-close")),
    input: box(q(".paper-search-input")), inputWrap: box(q(".paper-search-input-wrap")),
    results: [...document.querySelectorAll(".paper-search-results")].map(box), resultRows: document.querySelectorAll(".paper-search-result").length, empty: [...document.querySelectorAll(".paper-search-results, [class*=paper-search-empty]")].map(e=>e.textContent.trim().slice(0,80)),
    dropdown: box(dd), ddScroll: dd ? [dd.scrollTop, dd.scrollHeight, dd.clientHeight] : null,
    itemCount: items.length,
    items: items.slice(0, 8).map((e) => ({ text: e.textContent.trim().replace(/\s+/g, " ").slice(0, 60), cur: e.getAttribute("aria-current"), exp: e.getAttribute("aria-expanded"), ...box(e) })),
    rawTex: items.filter((e) => /[\\$]/.test(e.textContent)).map((e) => e.textContent.trim().slice(0, 60)),
    scrollOverflow: sc ? getComputedStyle(sc).overflow + " / inline:" + sc.style.overflow : null,
    scrollTop: sc?.scrollTop,
    active: (document.activeElement?.className?.toString() || document.activeElement?.tagName).slice(0, 80),
    activeOutline: (() => { const a = document.activeElement; if (!a) return null; const cs = getComputedStyle(a); return cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor + " | " + cs.boxShadow.slice(0, 80); })(),
    scrollW: document.documentElement.scrollWidth, vw: innerWidth,
  };
});
async function shot(page, name, wait = 700) {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
}
const tap = async (page, loc, vp) => { if (vp === "m") await loc.tap().catch(() => loc.click()); else await loc.click(); };
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => log.push(`pageerror ${vp} ${theme} ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") log.push(`console.${m.type()} ${vp} ${theme} ${m.text().slice(0, 200)}`); });
  await page.goto(BASE + "/paper", { waitUntil: "networkidle", timeout: 25000 }).catch((e) => log.push("goto " + e.message));
  await page.waitForTimeout(1500);
  const pre = `${vp}-${theme}`;
  await shot(page, `${pre}-0-top-inline-chapters`);
  // scroll the paper scroller past the in-article chapter list
  await page.evaluate(() => { const s = document.querySelector(".paper-scroll"); s.scrollTo({ top: 1400, behavior: "instant" }); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const s = document.querySelector(".paper-scroll"); s.scrollBy({ top: 200, behavior: "instant" }); });
  await shot(page, `${pre}-1-bar-collapsed`, 1000);
  if (vp === "d") { await ctx.close(); continue; }
  // mid-transition frame for the slide-down entry
  await page.evaluate(() => { const s = document.querySelector(".paper-scroll"); s.scrollTo({ top: 0, behavior: "instant" }); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const s = document.querySelector(".paper-scroll"); s.scrollTo({ top: 1600, behavior: "instant" }); });
  await page.waitForTimeout(90);
  await page.screenshot({ path: OUT + `${pre}-1b-slide-in-midframe.png` });
  await page.waitForTimeout(800);
  // open the TOC
  await tap(page, page.locator(".floating-toc-title-btn"), vp);
  await shot(page, `${pre}-2-toc-open`);
  // expand a root that has subsections (first root whose chevron is present), preferring a non-active one
  const roots = page.locator(".floating-toc-root");
  const n = await roots.count();
  let expandedIdx = -1;
  for (let i = 0; i < n; i++) {
    const r = roots.nth(i);
    if (await r.locator(".floating-toc-collapse-icon").count() && (await r.getAttribute("aria-current")) == null) { expandedIdx = i; await r.scrollIntoViewIfNeeded(); await tap(page, r, vp); break; }
  }
  log.push(`${pre} roots=${n} expandedIdx=${expandedIdx}`);
  await shot(page, `${pre}-3-toc-section-expanded`);
  // scroll inside the dropdown to the end to see the tail
  await page.evaluate(() => { const d = document.querySelector(".floating-toc-dropdown"); if (d) d.scrollTop = d.scrollHeight; });
  await shot(page, `${pre}-3b-toc-scrolled-end`, 400);
  // tap a root WITHOUT subsections (does it navigate?)
  const leafIdx = await page.evaluate(() => [...document.querySelectorAll(".floating-toc-root")].findIndex((e) => !e.querySelector(".floating-toc-collapse-icon")));
  log.push(`${pre} leafRootIdx=${leafIdx}`);
  if (leafIdx >= 0) {
    const before = await page.evaluate(() => document.querySelector(".paper-scroll").scrollTop);
    const r = roots.nth(leafIdx); await r.scrollIntoViewIfNeeded(); await tap(page, r, vp);
    await page.waitForTimeout(900);
    const after = await page.evaluate(() => ({ st: document.querySelector(".paper-scroll").scrollTop, open: !!document.querySelector(".floating-toc-dropdown") }));
    log.push(`${pre} leaf-root tap: scrollTop ${before} -> ${after.st}, dropdownOpen=${after.open}`);
    await shot(page, `${pre}-3c-after-leaf-root-tap`, 200);
  }
  // Esc dismiss -> focus returns to trigger
  if (await page.locator(".floating-toc-dropdown").count()) { await page.keyboard.press("Escape"); }
  await shot(page, `${pre}-3d-esc-dismiss-focus`, 500);
  // select a subsection: reopen, expand, tap sub
  await tap(page, page.locator(".floating-toc-title-btn"), vp);
  await page.waitForTimeout(400);
  if (expandedIdx >= 0 && !(await page.locator(".floating-toc-sub").count())) { await tap(page, roots.nth(expandedIdx), vp); await page.waitForTimeout(300); }
  const sub = page.locator(".floating-toc-sub").nth(1);
  if (await sub.count()) { const t = (await sub.textContent()).trim(); await sub.scrollIntoViewIfNeeded(); await tap(page, sub, vp); log.push(`${pre} tapped sub "${t}"`); }
  await shot(page, `${pre}-3e-after-sub-select`, 1200);
  // search
  await tap(page, page.locator(".floating-toc-search-btn"), vp);
  await shot(page, `${pre}-4-search-empty-focused`, 500);
  const inp = page.locator(".paper-search-input").first();
  await inp.pressSequentially("Fourier series", { delay: 40 });
  await shot(page, `${pre}-5-search-results`, 700);
  await inp.fill(""); await inp.pressSequentially("zzqxjv", { delay: 30 });
  await shot(page, `${pre}-6-search-no-results`, 600);
  await inp.fill(""); await inp.pressSequentially("Hilbert", { delay: 30 });
  await page.waitForTimeout(600);
  const row = page.locator(".paper-search-result:visible").first();
  log.push(`${pre} result panels=${await page.locator(".paper-search-results").count()} visiblePanels=${await page.locator(".paper-search-results:visible").count()} rows=${await page.locator(".paper-search-result").count()} visibleRows=${await page.locator(".paper-search-result:visible").count()} inputs=${await page.locator(".paper-search-input").count()}`);
  if (await row.count()) { await tap(page, row, vp); }
  await shot(page, `${pre}-7-after-result-select`, 1200);
  // close search via X
  await tap(page, page.locator(".floating-toc-search-btn"), vp);
  await page.waitForTimeout(300);
  await inp.pressSequentially("wave", { delay: 30 });
  await page.waitForTimeout(300);
  const close = page.locator(".floating-toc-search-close");
  if (await close.count()) await tap(page, close, vp);
  await shot(page, `${pre}-8-after-close-search`, 600);
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, log }, null, 1));
await browser.close();
console.log(log.join("\n"));
console.log("done", Object.keys(metrics).length);
