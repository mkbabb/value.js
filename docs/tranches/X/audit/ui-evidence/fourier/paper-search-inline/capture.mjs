// UIA-F paper-search-inline capture — headed Chromium, real GPU. Read-only on the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const measure = (page) => page.evaluate(() => {
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, color: cs.color, border: cs.border, pad: cs.padding, font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.slice(0, 28), shadow: cs.boxShadow.slice(0, 80), bdf: cs.backdropFilter, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, trans: cs.translate }; };
  const inp = document.querySelector(".paper-search-input");
  const panel = document.querySelector(".paper-search-results");
  const rows = panel ? [...panel.querySelectorAll(".paper-search-result")] : [];
  return {
    dark: document.documentElement.classList.contains("dark"),
    wrap: box(document.querySelector(".paper-search-input-wrap")),
    input: box(inp), inputCls: inp?.className, inputAttrs: inp && ["role","aria-expanded","aria-activedescendant","aria-controls"].map((a) => a + "=" + inp.getAttribute(a)),
    icon: box(document.querySelector(".paper-search-icon")),
    actions: [...document.querySelectorAll(".paper-search-action-btn")].map((b) => ({ label: b.getAttribute("aria-label"), cls: b.className.slice(0, 120), ...box(b) })),
    panel: box(panel), panelCls: panel?.className,
    rowCount: rows.length,
    rows: rows.slice(0, 4).map((e) => ({ text: e.textContent.trim().replace(/\s+/g, " ").slice(0, 60), cls: e.className.slice(0, 160), sel: e.getAttribute("aria-selected"), ...box(e), badge: box(e.querySelector(".paper-search-badge")), mark: box(e.querySelector("mark")) })),
    active: document.activeElement?.className?.toString().slice(0, 80),
    liveRegion: [...document.querySelectorAll("[aria-live]")].map((e) => e.textContent.trim().slice(0, 60)).filter(Boolean),
    scrollW: document.documentElement.scrollWidth, vw: innerWidth,
  };
});
async function shot(page, name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
  const w = metrics[name].wrap, p = metrics[name].panel;
  if (w) {
    const x = Math.max(0, w.x - 24), y = Math.max(0, w.y - 24);
    const right = Math.max(w.x + w.w, p ? p.x + p.w : 0) + 24;
    const bottom = (p ? p.y + p.h : w.y + w.h) + 24;
    const vp = page.viewportSize();
    await page.screenshot({ path: OUT + name + "-crop.png", clip: { x, y, width: Math.min(vp.width - x, right - x), height: Math.min(vp.height - y, bottom - y) } });
  }
}
const ONLY = process.env.ONLY ? [process.env.ONLY] : Object.keys(VPS);
for (const vp of ONLY) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.log("pageerror", vp, theme, e.message));
  page.on("console", (m) => { if (m.type() === "error") console.log("console.error", vp, theme, m.text().slice(0, 160)); });
  await page.goto(BASE + "/paper", { waitUntil: "networkidle", timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const pre = `${vp}-${theme}`;
  await shot(page, `${pre}-0-resting`);
  if (vp === "m") {
    await page.evaluate(() => { const s = document.querySelector(".paper-scroll") || document.scrollingElement; s.scrollTop = 2500; window.scrollTo(0, 2500); });
    await page.waitForTimeout(900);
    await shot(page, `${pre}-0b-scrolled-bar`);
    const b = page.locator(".floating-toc-search-btn"); await b.tap().catch(() => b.click()); await page.waitForTimeout(400); }
  const inp = page.locator(".paper-search-input").first();
  if (vp === "d") await inp.click(); else await inp.focus();
  await shot(page, `${pre}-1-empty-focused`);
  await inp.pressSequentially("Hilbert", { delay: 40 });
  await page.waitForTimeout(400);
  if (vp === "d") await page.mouse.move(1000, 800);
  await shot(page, `${pre}-2-results`);
  if (vp === "d") {
    const r = page.locator(".paper-search-result").nth(2);
    if (await r.count()) { await r.hover(); await shot(page, `${pre}-3-hover-row`); }
    await page.mouse.move(1000, 800);
    await inp.focus(); await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown");
    await shot(page, `${pre}-4-keyboard-active`);
    // hover the expand button
    const ex = page.locator(".paper-search-action-btn").first(); if (await ex.count()) { await ex.hover(); await shot(page, `${pre}-5-hover-expand`); }
  }
  await inp.fill("");
  await inp.pressSequentially("zzqxjv", { delay: 30 });
  await page.waitForTimeout(400);
  await shot(page, `${pre}-6-no-results`);
  // long query overflow + generic one to see varied badges
  await inp.fill(""); await inp.pressSequentially("theorem", { delay: 30 }); await page.waitForTimeout(400);
  if (vp === "d") await page.mouse.move(1000, 800);
  await shot(page, `${pre}-7-results-theorem`);
  await ctx.close();
}
writeFileSync(OUT + `metrics${process.env.ONLY ? "-" + process.env.ONLY : ""}.json`, JSON.stringify(metrics, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length);
