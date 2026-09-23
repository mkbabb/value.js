// UIA-F shell-app-dock capture — headed Chromium, real GPU. Read-only on the app:
// logged-in state is SEEDED into localStorage (no register call); admin via /gallery?admin=dev.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const THEMES = ["light", "dark"];
const metrics = {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopColor, font: cs.fontSize + "/" + cs.fontFamily.slice(0, 30), color: cs.color }; };
    const dock = q(".app-dock");
    const all = dock ? [...dock.querySelectorAll("button, [role=group], .admin-badge, .dock-separator, [class*=separator]")] : [];
    return {
      theme: document.documentElement.className,
      dock: box(dock),
      header: box(q(".app-header")),
      logo: box(q(".logo-trigger")), nav: box(q(".nav-trigger")), navLabelDisplay: q(".nav-trigger-label") && getComputedStyle(q(".nav-trigger-label")).display,
      toggle: box(q(".sun-moon-toggle")), admin: box(q(".admin-badge")),
      controls: all.map((e) => ({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className).toString().slice(0, 80), label: e.getAttribute("aria-label"), ...box(e) })),
      scrollW: document.documentElement.scrollWidth, vw: innerWidth,
    };
  });
}

async function shot(page, name) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + name + ".png" });
  await page.screenshot({ path: OUT + name + "-dock.png", clip: { x: 0, y: 0, width: page.viewportSize().width, height: 110 } });
  metrics[name] = await measure(page);
}

async function ctxFor(vp, theme, seed) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  if (seed) await ctx.addInitScript(() => { localStorage.setItem("fourier-user-slug", "jasper-newt-of-rampant"); localStorage.setItem("fourier-user-token", "audit-seeded-token"); });
  return ctx;
}

for (const vp of Object.keys(VPS)) for (const theme of THEMES) {
  // logged-out
  let ctx = await ctxFor(vp, theme, false); let page = await ctx.newPage();
  await page.goto(BASE + "/paper", { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${vp}-${theme}-loggedout`);
  if (theme === "light" || vp === "d") {
    await page.getByRole("button", { name: "Log in", exact: true }).click().catch((e) => console.log("login click", e.message));
    await shot(page, `${vp}-${theme}-loginform`);
    await page.keyboard.press("Escape");
    // nav dropdown open
    await page.locator(".nav-trigger").click(); await shot(page, `${vp}-${theme}-navopen`); await page.keyboard.press("Escape");
    // about popover
    await page.locator(".logo-trigger").click(); await shot(page, `${vp}-${theme}-aboutopen`); await page.keyboard.press("Escape");
    // keyboard focus ring on nav trigger
    await page.locator(".logo-trigger").focus(); await page.keyboard.press("Tab"); await shot(page, `${vp}-${theme}-focus-nav`);
    if (vp === "d") { await page.mouse.move(0, 500); await page.locator(".nav-trigger").hover(); await shot(page, `${vp}-${theme}-hover-nav`); }
  }
  await ctx.close();
  // logged-in
  ctx = await ctxFor(vp, theme, true); page = await ctx.newPage();
  await page.goto(BASE + "/paper", { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${vp}-${theme}-loggedin`);
  // admin
  await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(1500);
  await shot(page, `${vp}-${theme}-admin`);
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length);
