// UIA-F paper-desktop — headed Chromium, real GPU. READ-ONLY on the app (navigation + clicks only).
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

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 90), font: cs.fontSize, color: cs.color }; };
    const sc = q(".paper-scroll");
    return {
      theme: document.documentElement.className,
      scrollTop: sc?.scrollTop, scrollH: sc?.scrollHeight,
      sidebarNav: box(q(".sidebar-nav")), article: box(q(".paper-article")),
      searchField: box(q(".paper-search input")), contentsToggle: box(q(".sidebar-contents-toggle")),
      firstLink: box(q(".sidebar-link")), activeLinks: [...document.querySelectorAll(".sidebar-link[aria-current]")].map((e) => ({ t: e.textContent.trim().slice(0, 40), ...box(e) })),
      disclosure: box(q(".sidebar-disclosure")),
      openDisclosures: document.querySelectorAll(".sidebar-disclosure[data-state=open]").length,
      progress: q(".paper-progress-bar") && getComputedStyle(q(".paper-progress-bar")).transform,
      pageInd: box(q(".overlay-page")), pageText: q(".overlay-page")?.textContent.trim(),
      back: box(q(".overlay-back")),
      h1: box(q(".paper-article h1")),
      mobileToc: box(q(".floating-toc-bar")) ?? box(q(".floating-toc")),
      mobileChapterLinks: [...document.querySelectorAll(".mobile-toc-link")].slice(0, 2).map(box),
      callout: box(q(".interactive-callout")),
      scrollW: document.documentElement.scrollWidth, vw: innerWidth,
    };
  });
}
async function shot(page, name, extra) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
const errors = [];
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${vp}-${theme} console ${m.text().slice(0, 200)}`); });
  const t0 = Date.now();
  await page.goto(BASE + "/paper", { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await shot(page, `${vp}-${theme}-1-top`, { loadMs: Date.now() - t0 });
  if (vp === "d") {
    // hover a TOC row + focus ring on first link
    await page.locator(".sidebar-link").nth(2).hover(); await shot(page, `${vp}-${theme}-1b-hover-row`);
    await page.locator(".paper-search input").first().focus(); await shot(page, `${vp}-${theme}-1c-search-focus`);
    await page.locator(".paper-search input").first().fill("fourier transform"); await shot(page, `${vp}-${theme}-1d-search-dropdown`);
    await page.locator(".paper-search input").first().fill("zzqqxx"); await shot(page, `${vp}-${theme}-1e-search-empty`);
    await page.locator(".paper-search input").first().fill(""); await page.keyboard.press("Escape");
    // open a subsection disclosure (4th section with children)
    const disc = page.locator(".sidebar-disclosure");
    const n = await disc.count();
    await disc.nth(Math.min(3, n - 1)).click(); await shot(page, `${vp}-${theme}-2-disclosure-open`, { disclosureCount: n });
    // navigate deep via a subsection link → scrolled mid-document
    const subs = page.locator(".sidebar-sublink");
    await subs.nth(Math.min(2, (await subs.count()) - 1)).click(); await page.waitForTimeout(1500);
    await shot(page, `${vp}-${theme}-3-mid-doc`);
    // scroll by wheel further to test active chain follow
    await page.mouse.move(900, 500); for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 700); await page.waitForTimeout(80); }
    await page.waitForTimeout(1200); await shot(page, `${vp}-${theme}-4-mid-doc-wheel`);
    // cross-ref click → back button
    const ref = page.locator(".paper-ref:visible").first();
    if (await ref.count()) { await ref.scrollIntoViewIfNeeded(); await ref.click(); await page.waitForTimeout(1500); await shot(page, `${vp}-${theme}-5-after-ref`); }
    // scroll restoration: go to another route then back
    const before = await page.evaluate(() => ({ st: document.querySelector(".paper-scroll").scrollTop, active: document.querySelector(".sidebar-link[aria-current]")?.textContent.trim() }));
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(800);
    await page.goBack({ waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(2000);
    const after = await page.evaluate(() => ({ st: document.querySelector(".paper-scroll")?.scrollTop, active: document.querySelector(".sidebar-link[aria-current]")?.textContent.trim() }));
    await shot(page, `${vp}-${theme}-6-back-nav-restore`, { before, after });
    // collapse CONTENTS
    await page.locator(".sidebar-contents-toggle").click(); await shot(page, `${vp}-${theme}-7-contents-collapsed`);
  } else {
    // mobile: scroll past inline chapters → floating TOC bar
    await page.locator(".mobile-toc-link").nth(4).click(); await page.waitForTimeout(1500);
    await shot(page, `${vp}-${theme}-3-mid-doc`);
    const trig = page.locator(".floating-toc button").first();
    if (await trig.count()) { await trig.click(); await shot(page, `${vp}-${theme}-4-floating-toc-open`); await page.keyboard.press("Escape"); }
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(800);
    await page.goBack({ waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(2000);
    await shot(page, `${vp}-${theme}-6-back-nav-restore`);
  }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length);
