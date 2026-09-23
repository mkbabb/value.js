// UIA-F shell-nav-dropdown capture — headed Chromium, real GPU. Read-only on the app.
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
const ROUTES = ["/paper", "/visualize", "/gallery", "/equation", "/morph"];
const metrics = {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

const measure = (page) => page.evaluate(() => {
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, color: cs.color, pad: cs.padding, font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.slice(0, 24), gap: cs.gap, shadow: cs.boxShadow.slice(0, 60), outline: cs.outlineStyle + " " + cs.outlineWidth }; };
  const c = document.querySelector(".nav-dropdown");
  return {
    dark: document.documentElement.classList.contains("dark"),
    trigger: box(document.querySelector(".nav-trigger")),
    triggerLabel: document.querySelector(".nav-trigger")?.getAttribute("aria-label"),
    content: box(c), contentCls: c?.className, contentAttrs: c && [...c.attributes].map((a) => a.name + "=" + a.value.slice(0, 40)),
    items: c ? [...c.querySelectorAll(".nav-dropdown-item")].map((e) => ({ text: e.textContent.trim(), cur: e.getAttribute("aria-current"), hl: e.hasAttribute("data-highlighted"), focus: e === document.activeElement, ...box(e) })) : [],
    scrollW: document.documentElement.scrollWidth, vw: innerWidth,
  };
});
async function shot(page, name, crop) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
  const c = metrics[name].content, t = metrics[name].trigger;
  if (crop && c && t) {
    const x = Math.max(0, Math.min(c.x, t.x) - 24), y = Math.max(0, t.y - 16);
    const w = Math.min(page.viewportSize().width - x, Math.max(c.x + c.w, t.x + t.w) - x + 48);
    const h = c.y + c.h - y + 24;
    await page.screenshot({ path: OUT + name + "-crop.png", clip: { x, y, width: w, height: h } });
  }
}
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.log("pageerror", vp, theme, e.message));
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: "networkidle", timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(1200);
    const slug = r.slice(1);
    const trig = page.locator(".nav-trigger");
    if (r === "/paper") { await page.waitForTimeout(300); await page.screenshot({ path: OUT + `${vp}-${theme}-paper-0-closed.png` }); }
    if (vp === "m") await trig.tap().catch(() => trig.click()); else await trig.click();
    await page.mouse.move(5, 800);
    await shot(page, `${vp}-${theme}-${slug}-1-open`, true);
    if (r === "/paper" && vp === "d") {
      // hover a non-current row
      const it = page.locator(".nav-dropdown-item").nth(2); await it.hover(); await shot(page, `${vp}-${theme}-paper-2-hover-gallery`, true);
      await page.keyboard.press("Escape"); await page.waitForTimeout(300);
      // keyboard open + arrow
      await trig.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(300); await page.keyboard.press("ArrowDown");
      await shot(page, `${vp}-${theme}-paper-3-keyboard`, true);
      await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      await shot(page, `${vp}-${theme}-paper-4-returnfocus`, false);
    }
    if (r === "/visualize") {
      // select Morph through the menu — does navigation work + does the menu close
      await page.locator(".nav-dropdown-item", { hasText: "Morph" }).click();
      await page.waitForTimeout(1200);
      metrics[`${vp}-${theme}-select-morph`] = { url: page.url(), open: await page.locator(".nav-dropdown").count(), label: await trig.getAttribute("aria-label") };
      await page.screenshot({ path: OUT + `${vp}-${theme}-visualize-5-after-select-morph.png` });
    } else { await page.keyboard.press("Escape"); }
  }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length);
