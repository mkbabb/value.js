// UIA-F visualize-loaded-image-mode — headed Chromium, real GPU. READ-ONLY on the app TREES.
// One upload (assets/animals/golden-retriever.webp) through the app's own file input creates the
// workspace; every other context re-opens that workspace at /w/<slug> (GET only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "/Users/mkbabb/Programming/fourier-analysis/assets/animals/golden-retriever.webp";
const sh = (c) => execSync(c).toString().trim();
const tree = () => `fourier ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")} · glass ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}`;
writeFileSync(OUT + "tree-state.txt", `start ${process.argv[2] || 'all'} ${tree()} ${new Date().toISOString()}\n`, { flag: "a" });
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const ONLY = process.argv[2]; // optional "d-light" etc.
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor.slice(0, 60), border: cs.borderTopWidth + " " + cs.borderTopColor, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 24) }; };
    const all = (s, n = 6) => [...document.querySelectorAll(s)].slice(0, n).map(box);
    return {
      theme: document.documentElement.className, url: location.pathname, vw: innerWidth, vh: innerHeight,
      scrollW: document.documentElement.scrollWidth,
      configurator: box(q(".viz-configurator")), cols: q(".viz-configurator") && getComputedStyle(q(".viz-configurator")).gridTemplateColumns,
      stage: box(q(".canvas-stage")), canvas: box(q(".canvas-container canvas")),
      aside: box(q(".viz-panel-left")), asideScrollH: q(".viz-panel-left")?.scrollHeight,
      docks: all(".glass-dock", 4), dockExpanded: [...document.querySelectorAll(".glass-dock")].map((d) => d.className),
      layers: [...document.querySelectorAll(".configurator-layer")].map((l) => ({ ...box(l), label: l.querySelector(".configurator-section-label")?.textContent.trim(), open: l.getAttribute("data-state") || l.querySelector("[aria-expanded]")?.getAttribute("aria-expanded") })),
      layerHeaders: all(".configurator-layer > button, .configurator-layer [aria-expanded]", 5),
      basisToggles: all(".basis-toggle", 3), replaceBtn: box([...document.querySelectorAll("button")].find((b) => /Replace image/.test(b.textContent))),
      preview: box(q(".viz-panel-left img")), numberFields: all(".inline-number", 8), sliders: all("[role=slider]", 8),
      selectTrigger: box(q("[aria-label='Contour extraction strategy']")), advancedTrigger: box(q(".advanced-trigger")),
      resetBtns: all("[aria-label='Reset to defaults']", 3), playCtl: box(q(".play-control")),
      tabs: box(q("[role=tablist]")), tabsText: q("[role=tablist]")?.textContent.trim(),
      popover: box(q("[role=dialog], [data-radix-popper-content-wrapper] > *, [data-reka-popper-content-wrapper] > *")), menu: box(q("[role=menu]")),
      menuItems: all("[role=menuitemradio], [role=menuitem]", 10),
      rowLabels: [...document.querySelectorAll(".configurator-row, .slider-control")].slice(0, 10).map((r) => ({ cls: r.className.slice(0, 40), ...box(r) })),
      headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 30)),
      activeEl: document.activeElement?.outerHTML.slice(0, 140),
    };
  });
}
async function shot(page, name, extra) {
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + name + ".png" });
  try { metrics[name] = { ...(await measure(page)), ...(extra || {}) }; } catch (e) { errors.push(name + " measure " + e.message); }
}
const safe = async (P, label, fn) => { try { await fn(); } catch (e) { errors.push(`${P} ${label} ${e.message.split("\n")[0]}`); } };
const playState = (page) => page.evaluate(() => { const b = document.querySelector(".play-control"); return b && { pressed: b.getAttribute("aria-pressed"), label: b.getAttribute("aria-label") }; });
let slug = existsSync(OUT + "slug.txt") ? readFileSync(OUT + "slug.txt", "utf8").trim() : null;

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  if (ONLY && ONLY !== `${vp}-${theme}`) continue;
  const P = `${vp}-${theme}`;
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${P} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${P} console.${m.type()} ${m.text().slice(0, 200)}`); });
  const t0 = Date.now();
  if (!slug) {
    await page.goto(BASE + "/visualize", { waitUntil: "networkidle" });
    await page.locator("[data-testid=image-file-input]").setInputFiles(IMG);
    await page.waitForURL(/\/w\//, { timeout: 30000 }).catch((e) => errors.push("waitURL " + e.message));
    slug = new URL(page.url()).pathname.split("/").pop(); writeFileSync(OUT + "slug.txt", slug);
    // the computing pass: capture the first loading frame
    await page.waitForTimeout(300); await page.screenshot({ path: OUT + `${P}-0-computing.png` });
  } else {
    await page.goto(BASE + "/w/" + slug, { waitUntil: "networkidle" });
  }
  await page.locator(".play-control").waitFor({ timeout: 45000 }).catch((e) => errors.push(P + " no play-control " + e.message));
  await page.mouse.move(VPS[vp].width / 2, 5);
  await page.waitForTimeout(2500);
  await shot(page, `${P}-1-loaded-playing-collapsed`, { loadMs: Date.now() - t0 });
  if (vp === "m") {
    const tabs = page.getByRole("tab");
    if (await tabs.count() >= 2) {
      await tabs.nth(1).click(); await page.waitForTimeout(1500); metrics.tabs = await tabs.allTextContents(); await shot(page, `${P}-1b-canvas-tab`);
      await tabs.nth(0).click(); await shot(page, `${P}-1c-controls-tab`);
      await tabs.nth(1).click(); await page.waitForTimeout(1200);
    } else errors.push(P + " no tabs");
  }
  // paused
  const before = await playState(page);
  // pointer click on the collapsed dock's play control is swallowed by the hover-expand (probe-play.json); pause via keyboard
  await safe(P, "pause", async () => { await page.locator(".play-control").focus(); await page.keyboard.press("Space"); await page.locator(".play-control").blur(); });
  await page.mouse.move(VPS[vp].width / 2, 5);
  await page.waitForTimeout(2600); await shot(page, `${P}-2-paused`, { before, after: await playState(page) });
  const top = page.locator(".controls-dock-anchor .glass-dock"); const bot = page.locator(".controls-overlay .glass-dock");
  // top dock expanded (hover on desktop, tap the summary on mobile)
  await safe(P, "top-expand", async () => { if (vp === "d") await top.hover(); else await top.getByRole("button", { name: "Expand dock" }).tap(); });
  await shot(page, `${P}-3-top-expanded`);
  if (vp === "d") { await safe(P, "view-options", () => page.getByRole("button", { name: "View options" }).hover({ timeout: 4000 })); await shot(page, `${P}-3b-view-options`); }
  await page.mouse.move(VPS[vp].width / 2, 5); await page.waitForTimeout(2500);
  await safe(P, "bot-expand", async () => { if (vp === "d") await bot.hover(); else await bot.getByRole("button", { name: "Expand dock" }).tap(); });
  await shot(page, `${P}-4-bottom-expanded`);
  // both: click each stage dock's own disclosure summary
  await safe(P, "both-top", () => top.getByRole("button", { name: "Expand dock" }).click({ timeout: 3000 }));
  await safe(P, "both-bot", () => bot.getByRole("button", { name: "Expand dock" }).click({ timeout: 3000 }));
  await shot(page, `${P}-5-both-expanded`, { play: await playState(page) });
  await safe(P, "more", async () => { await page.getByRole("button", { name: "More options" }).click({ timeout: 4000 }); });
  await shot(page, `${P}-6-more-menu`); await page.keyboard.press("Escape");
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height / 2);
  // sidebar states — mobile: controls tab
  if (vp === "m") { await page.getByRole("tab").nth(0).click(); await page.waitForTimeout(600); }
  // keyboard focus on the first basis toggle
  await safe(P, "focus", () => page.locator(".basis-toggle").first().focus()); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
  await shot(page, `${P}-7-focus-basis`);
  // open Contour layer + Advanced
  const contour = page.locator(".configurator-layer").filter({ hasText: "Contour" }).locator("button[aria-expanded]").first();
  await safe(P, "contour", () => contour.click({ timeout: 4000 }));
  await page.waitForTimeout(500);
  await safe(P, "advanced", () => page.locator(".advanced-trigger").click({ timeout: 4000 }));
  await page.waitForTimeout(500);
  await page.locator(".advanced-trigger").scrollIntoViewIfNeeded().catch(() => {});
  await shot(page, `${P}-8-contour-advanced-open`);
  // strategy select open
  await safe(P, "strategy", () => page.locator("[aria-label='Contour extraction strategy']").click({ timeout: 4000 }));
  await shot(page, `${P}-8b-strategy-select`); await page.keyboard.press("Escape");
  // coefficients layer open
  const coef = page.locator(".configurator-layer").filter({ hasText: "Coefficients" }).locator("button[aria-expanded]").first();
  await safe(P, "coef", () => coef.click({ timeout: 4000 }));
  await page.waitForTimeout(700);
  await coef.scrollIntoViewIfNeeded().catch(() => {});
  await shot(page, `${P}-9-coefficients-open`);
  await page.evaluate(() => { const a = document.querySelector(".viz-panel-left"); let s = a; while (s && s.scrollHeight <= s.clientHeight) s = s.parentElement; if (s) s.scrollTop = s.scrollHeight; });
  await shot(page, `${P}-9b-sidebar-bottom`);
  writeFileSync(OUT + "tree-state.txt", `${P} ${tree()} ${new Date().toISOString()}\n`, { flag: "a" });
  await ctx.close();
}
writeFileSync(OUT + (ONLY ? `metrics-${ONLY}.json` : "metrics.json"), JSON.stringify({ slug, metrics, errors }, null, 1));
await browser.close();
console.log("done slug", slug, errors.length, "errors");
