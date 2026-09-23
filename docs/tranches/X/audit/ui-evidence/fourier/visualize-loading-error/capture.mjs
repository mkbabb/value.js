// UIA-F visualize-loading-error — headed Chromium, real GPU. Read-only on the app.
// Network is only DELAYED (page.route + continue) to hold transient states long enough to frame.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "/Users/mkbabb/Programming/fourier-analysis/assets/animals/golden-retriever.webp";
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const log = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 90), font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.slice(0, 24), color: cs.color, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 120) }; };
    const q = (s) => document.querySelector(s);
    const errCard = q(".cartoon-card");
    return {
      url: location.pathname, dark: document.documentElement.classList.contains("dark"),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      spinner: box(q(".animate-spin")), spinnerText: q(".animate-spin")?.nextElementSibling?.textContent?.trim(),
      errCard: box(errCard), errTexts: errCard ? [...errCard.querySelectorAll("p")].map((p) => ({ t: p.textContent.trim(), ...box(p) })) : null,
      errButton: box(errCard?.querySelector("button")),
      dropBtn: box(q(".drop-target-button")), dropBtnBusy: q(".drop-target-button")?.getAttribute("aria-busy"),
      progress: box(q("[role=progressbar]")), progressLabel: q("[role=progressbar]")?.getAttribute("aria-label"),
      sidebar: box(q(".viz-panel-left-wrap")), dock: box(q(".app-dock")),
      tooltip: box(q("[role=tooltip]")), tooltipText: q("[role=tooltip]")?.textContent?.trim(),
      focused: document.activeElement ? (document.activeElement.textContent || "").trim().slice(0, 40) + " | " + getComputedStyle(document.activeElement).outline + " | " + getComputedStyle(document.activeElement).boxShadow.slice(0, 80) : null,
      liveRegions: [...document.querySelectorAll("[role=status],[role=alert],[aria-live]")].map((e) => e.getAttribute("role") + ":" + (e.textContent || "").trim().slice(0, 60)),
      scrollW: document.documentElement.scrollWidth, vw: innerWidth,
    };
  });
}
async function shot(page, name, wait = 0) {
  if (wait) await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
}
async function ctxFor(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  return ctx;
}

let knownSlug = null;
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`;
  // ── A. Upload → redirect → compute timeline (upload + compute requests delayed 2.5s) ──
  let ctx = await ctxFor(vp, theme); let page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") log.push(`${tag} console: ${m.text().slice(0, 160)}`); });
  page.on("pageerror", (e) => log.push(`${tag} pageerror: ${e.message.slice(0, 160)}`));
  await page.route("**/api/**", async (route) => {
    const u = route.request().url(); const m = route.request().method();
    if (m === "POST" || /compute|epicycle|bases|contour/.test(u)) { await sleep(2500); }
    log.push(`${tag} ${m} ${u.replace(BASE, "")}`);
    await route.continue().catch(() => {});
  });
  await page.goto(BASE + "/visualize", { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-A0-empty`, 600);
  await page.locator("[data-testid=image-file-input]").setInputFiles(IMG);
  await shot(page, `${tag}-A1-uploading`, 400);
  await page.waitForURL(/\/w\/[^/]+$/, { timeout: 15000 }).catch(() => log.push(`${tag} no /w redirect`));
  knownSlug = knownSlug || page.url().split("/w/")[1];
  await shot(page, `${tag}-A2-redirected`, 150);
  await shot(page, `${tag}-A3-computing`, 1200);
  await shot(page, `${tag}-A4-settled`, 7000);
  await ctx.close();

  // ── B. Cold load of an existing workspace (GETs delayed 3s) → "Loading workspace..." spinner ──
  if (knownSlug) {
    ctx = await ctxFor(vp, theme); page = await ctx.newPage();
    await page.route("**/api/**", async (route) => { await sleep(3000); await route.continue().catch(() => {}); });
    await page.goto(BASE + "/w/" + knownSlug, { waitUntil: "domcontentloaded" }).catch(() => {});
    await shot(page, `${tag}-B1-coldload-spinner`, 1200);
    await ctx.close();
  }

  // ── C. Error card ──
  ctx = await ctxFor(vp, theme); page = await ctx.newPage();
  await page.goto(BASE + "/w/does-not-exist-slug", { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-C1-error`, 800);
  const btn = page.locator(".cartoon-card button");
  if (vp === "d") { await btn.hover().catch(() => {}); await shot(page, `${tag}-C2-error-hover`, 900); await page.mouse.move(5, 500); }
  await page.evaluate(() => document.activeElement?.blur());
  await btn.focus().catch(() => {});
  await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
  await shot(page, `${tag}-C3-error-focus`, 600);
  await btn.click().catch((e) => log.push(`${tag} click err ${e.message.slice(0, 80)}`));
  await shot(page, `${tag}-C4-after-startfresh`, 1200);
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
writeFileSync(OUT + "log.txt", log.join("\n"));
await browser.close();
console.log("done", Object.keys(metrics).length, "slug", knownSlug);
