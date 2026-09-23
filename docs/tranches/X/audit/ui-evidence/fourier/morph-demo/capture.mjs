// UIA-F morph-demo — headed Chromium, real GPU. READ-ONLY: GET navigation to /morph; no API mutation (none on this route);
// every non-GET /api/** aborted as a guard. States: idle sun, mid-morph, moon, easing Select open, Export copied,
// preview level selected, hover/focus, at 1440x900 + 390x844 x light + dark.
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
const metrics = {}; const errors = []; const blocked = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s); const qa = (s) => [...document.querySelectorAll(s)];
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 90), font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 18), color: cs.color, bf: cs.backdropFilter, cls: el.className?.baseVal ?? String(el.className).slice(0, 80) }; };
    return {
      theme: document.documentElement.className, bodyBg: getComputedStyle(document.body).backgroundColor,
      scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, vw: innerWidth, vh: innerHeight,
      title: box(q(".demo-title")), subtitle: box(q(".demo-subtitle")), morphBtn: box(q(".morph-button")),
      morphBtnDisabled: q(".morph-button")?.disabled, busy: q(".morph-button")?.getAttribute("aria-busy"),
      chips: qa(".demo-info:not([style*='none']) > *").filter((e) => e.offsetParent).map((e) => ({ t: e.textContent.trim().replace(/\s+/g, " "), ...box(e) })),
      cards: qa(".config-card").map((c) => ({ t: c.querySelector("h3")?.textContent, ...box(c) })),
      cardTitles: qa(".config-card-title").slice(0, 1).map(box), cardDesc: qa(".config-card-desc").slice(0, 1).map(box), labels: qa(".config-label").slice(0, 2).map(box),
      numFields: qa(".num-field, .level-field").slice(0, 2).map(box), numInputs: qa(".num-field input, .level-field input").slice(0, 2).map(box),
      sliders: qa("[role=slider]").slice(0, 2).map((s) => ({ v: s.getAttribute("aria-valuenow"), ...box(s) })),
      sliderTracks: qa(".duration-slider-track, .level-slider-track").slice(0, 2).map(box),
      selectTriggers: qa("button[role=combobox]").map((b) => ({ t: b.textContent.trim(), dis: b.disabled || b.dataset.disabled !== undefined, ...box(b) })),
      listbox: box(q("[role=listbox]")), options: qa("[role=option]").slice(0, 3).map((o) => ({ t: o.textContent.trim(), ...box(o) })), optCount: qa("[role=option]").length,
      levelsCard: box(q(".levels-card")), gridCells: qa(".grid-cell").slice(0, 3).map((c) => ({ t: c.textContent.trim(), ...box(c) })), gridCount: qa(".grid-cell").length,
      gridScroller: (() => { const g = q(".grid"); return g ? { sw: g.scrollWidth, cw: g.clientWidth } : null; })(),
      activeCells: qa(".grid-cell.active").map((c) => c.textContent.trim()), boundCells: qa(".grid-cell.is-bound").map((c) => c.textContent.trim()),
      exportRow: qa(".export-row button").map((b) => ({ t: b.textContent.trim(), dis: b.disabled, ...box(b) })),
      activeEl: document.activeElement?.outerHTML.slice(0, 140),
      dock: box(q("header [class*=dock], .glass-dock")),
      disabledControls: qa(".controls-section button:disabled, .controls-section [data-disabled], .controls-section input:disabled").length,
    };
  });
}
async function shot(page, name, extra, opt = {}) {
  await page.waitForTimeout(opt.wait ?? 700);
  await page.screenshot({ path: OUT + name + ".png", fullPage: !!opt.full });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  const page = await ctx.newPage();
  const P = `${vp}-${theme}`;
  page.on("pageerror", (e) => errors.push(`${P} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${P} console.${m.type()} ${m.text().slice(0, 220)}`); });
  await page.route("**/api/**", (route) => { const r = route.request(); if (!["GET", "HEAD", "OPTIONS"].includes(r.method())) { blocked.push(r.method() + " " + r.url()); return route.abort(); } return route.fallback(); });
  const t0 = Date.now();
  await page.goto(BASE + "/morph", { waitUntil: "networkidle" }).catch((e) => errors.push(`${P} goto ${e.message}`));
  await shot(page, `${P}-1-idle-sun`, { loadMs: Date.now() - t0 }, { wait: 1500 });
  await shot(page, `${P}-1f-idle-sun-full`, null, { full: true, wait: 200 });
  // hover (desktop) on the stage + a grid cell
  if (vp === "d") {
    await page.locator(".morph-button").hover(); await shot(page, `${P}-1h-stage-hover`, null, { wait: 400 });
    await page.locator(".grid-cell").nth(2).hover(); await shot(page, `${P}-1i-cell-hover`, null, { wait: 400 });
    await page.mouse.move(5, 895);
  }
  // mid-morph: click stage, sample a few frames
  await page.locator(".morph-button").scrollIntoViewIfNeeded();
  await page.locator(".morph-button").click();
  for (const ms of [120, 450]) { await page.waitForTimeout(ms === 120 ? 120 : 330); await page.screenshot({ path: OUT + `${P}-2-mid-morph-${ms}.png` }); metrics[`${P}-2-mid-morph-${ms}`] = await measure(page); }
  if (vp === "d") { await page.screenshot({ path: OUT + `${P}-2f-mid-morph-full.png`, fullPage: true }); }
  // moon
  await page.waitForTimeout(2500);
  await shot(page, `${P}-3-moon`);
  // easing Select open (first card)
  await page.locator("button[role=combobox]").first().scrollIntoViewIfNeeded();
  await page.locator("button[role=combobox]").first().click();
  await shot(page, `${P}-4-easing-select-open`, null, { wait: 700 });
  await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  // keyboard focus on slider
  await page.locator("[role=slider]").first().focus(); await shot(page, `${P}-4f-slider-focus`, null, { wait: 300 });
  // preview level selected (3rd cell)
  await page.locator(".grid-cell").nth(2).scrollIntoViewIfNeeded();
  await page.locator(".grid-cell").nth(2).click();
  await shot(page, `${P}-5-level-selected`);
  // Export copied
  await page.locator(".export-row button").first().scrollIntoViewIfNeeded();
  await page.locator(".export-row button").first().click();
  let clip = null; try { clip = await page.evaluate(() => navigator.clipboard.readText()); } catch (e) { clip = "ERR " + e.message; }
  await shot(page, `${P}-6-export-copied`, { clipboard: (clip || "").slice(0, 400) }, { wait: 300 });
  await page.waitForTimeout(2500); metrics[`${P}-6b-after-copied`] = { exportRow: (await measure(page)).exportRow };
  // mid-morph at the controls (are they disabled?)
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(200);
  await page.locator(".morph-button").click(); await page.waitForTimeout(150);
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(60);
  await page.screenshot({ path: OUT + `${P}-7-mid-morph-controls.png` }); metrics[`${P}-7-mid-morph-controls`] = await measure(page);
  await page.waitForTimeout(2500);
  await ctx.close();
}
await browser.close();
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors, blocked }, null, 1));
console.log("done", Object.keys(metrics).length, "errors", errors.length, "blocked", blocked.length);
