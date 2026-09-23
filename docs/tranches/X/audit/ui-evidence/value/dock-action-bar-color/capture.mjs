// dock-action-bar-color capture — READ-ONLY UI audit seat (X §0bl). Headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const VIEWPORTS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const ONLY = process.env.ONLY?.split(",");
const log = { sha, dirty, base: BASE, at: new Date().toISOString(), frames: [], metrics: {} };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function expand(page) {
  const c = page.locator(".glass-dock.collapsed");
  if (await c.count()) { await c.first().click().catch(() => {}); await wait(900); }
}
async function shot(page, name, dockOnly = false) {
  const path = `${OUT}${name}.png`;
  if (dockOnly) {
    const d = page.locator(".glass-dock").first();
    const bb = await d.boundingBox().catch(() => null);
    if (bb) {
      const pad = 24;
      await page.screenshot({ path, clip: { x: Math.max(0, bb.x - pad), y: Math.max(0, bb.y - pad - 110), width: Math.min(bb.width + 2 * pad, page.viewportSize().width - Math.max(0, bb.x - pad)), height: bb.height + 2 * pad + 110 } });
    } else await page.screenshot({ path });
  } else await page.screenshot({ path });
  log.frames.push({ name, sha, dirty, url: page.url() });
}
async function measure(page, key) {
  log.metrics[key] = await page.evaluate(() => {
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); const s = getComputedStyle(el);
      return { w: +b.width.toFixed(1), h: +b.height.toFixed(1), x: +b.x.toFixed(1), y: +b.y.toFixed(1), radius: s.borderRadius, bg: s.backgroundColor, cls: el.className?.baseVal ?? el.className }; };
    const dock = document.querySelector(".glass-dock");
    const layer = document.querySelector('[data-testid="scene-action-row"]');
    return {
      dock: r(dock),
      toolsBtn: r(document.querySelector('[aria-label="Toggle action bar"]')),
      back: r(document.querySelector('[aria-label="Back"]')),
      armToggle: r(document.querySelector('[aria-label="Open color input"],[aria-label="Close input"],[aria-label="Propose color name"],[aria-label="Close propose"]')),
      row: r(layer),
      seats: [...document.querySelectorAll("[data-scene-action]")].map((s) => ({ token: s.dataset.sceneAction, state: s.dataset.actionState, active: s.dataset.actionActive, btn: r(s.querySelector("button")), icon: r(s.querySelector("svg")), aria: s.querySelector("button")?.getAttribute("aria-label") })),
      separators: [...(dock?.querySelectorAll('[role="separator"], .dock-separator') ?? [])].length,
      activeLayer: [...document.querySelectorAll("[data-layer-id],[data-dock-layer]")].map((e) => e.outerHTML.slice(0, 120)).slice(0, 6),
      theme: document.documentElement.className,
      toolsVisible: !!document.querySelector(".action-bar-toggle-slot.is-visible"),
    };
  });
}
async function openBar(page) {
  await expand(page);
  const t = page.locator('[aria-label="Toggle action bar"]');
  if (!(await t.count())) return false;
  await t.first().click({ force: true }).catch(() => {});
  await wait(900);
  return true;
}

const browser = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
for (const scheme of ["light", "dark"]) for (const [vk, vp] of Object.entries(VIEWPORTS)) {
  const tag = `${scheme}-${vk}`;
  if (ONLY && !ONLY.includes(tag)) continue;
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: vk === "m" ? 2 : 1, hasTouch: vk === "m", isMobile: false });
  await ctx.addInitScript((sch) => { try { localStorage.setItem("vueuse-color-scheme", sch); } catch {} }, scheme);
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE }).catch(() => {});
  const page = await ctx.newPage();
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });

  // ── color scene (picker) — the full state walk ──
  await page.goto(`${BASE}/#/`, { waitUntil: "load" }); await wait(3500);
  await expand(page); await shot(page, `${tag}-picker-00-main-layer`);
  await measure(page, `${tag}-picker-main`);
  if (await openBar(page)) {
    await shot(page, `${tag}-picker-01-actions`); await shot(page, `${tag}-picker-01-actions-dock`, true);
    // PROBE: does a hover card open unrequested after the Tools click (pointer left in place)?
    log.metrics[`${tag}-unrequested-card`] = await page.evaluate(() => [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map((e) => e.textContent.trim().slice(0, 40)));
    // PROBE: does clicking a seat flash its hover card? sample popper presence after a hover+immediate click.
    if (vk === "d") {
      await page.mouse.move(5, 5); await wait(500);
      const b = await page.locator('[data-scene-action="color.copy"] button').boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await page.mouse.up();
      const samples = [];
      for (const t of [60, 200, 350, 500, 800, 1200]) { await wait(t - (samples.at(-1)?.t ?? 0)); samples.push({ t, cards: await page.evaluate(() => [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map((e) => ({ txt: e.textContent.trim().slice(0, 20), op: getComputedStyle(e.firstElementChild ?? e).opacity }))) }); }
      log.metrics[`${tag}-click-card-samples`] = samples;
      await shot(page, `${tag}-picker-01b-after-click-copy`, true);
      await page.mouse.move(5, 5); await wait(500);
    }
    await measure(page, `${tag}-picker-actions`);
    // hover card
    const seat = page.locator('[data-scene-action="color.copy"] button');
    if (vk === "d") { await seat.hover(); await wait(900); await shot(page, `${tag}-picker-02-hover-copy`, true); await page.mouse.move(5, 5); await wait(400); }
    // keyboard focus
    await page.locator('[data-scene-action="color.reset"] button').focus(); await page.keyboard.press("Tab"); await wait(300);
    await shot(page, `${tag}-picker-03-focus`, true);
    log.metrics[`${tag}-focus`] = await page.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a); return { aria: a?.getAttribute("aria-label"), boxShadow: s.boxShadow, outline: s.outline, radius: s.borderRadius }; });
    // pulse (random) and spin (reset)
    await page.locator('[data-scene-action="color.random"] button').click(); await wait(90);
    await shot(page, `${tag}-picker-04-pulse-random`, true); await wait(700);
    await page.locator('[data-scene-action="color.reset"] button').click(); await wait(150);
    await shot(page, `${tag}-picker-05-spin-reset`, true); await wait(700);
    // input arm
    const arm = page.locator('[aria-label="Open color input"]');
    if (await arm.count()) {
      await arm.click(); await wait(800);
      await shot(page, `${tag}-picker-06-input-arm`); await shot(page, `${tag}-picker-06-input-arm-dock`, true);
      await measure(page, `${tag}-picker-input`);
      const next = page.locator('[aria-label="Propose color name"],[aria-label="Close input"]');
      const nl = await next.first().getAttribute("aria-label").catch(() => null);
      log.metrics[`${tag}-arm-next`] = nl;
      if (nl) { await next.first().click(); await wait(800); await shot(page, `${tag}-picker-07-arm-next`, true); await measure(page, `${tag}-picker-arm2`); }
      const close = page.locator('[aria-label="Close propose"],[aria-label="Close input"]');
      if (await close.count()) { await close.first().click(); await wait(700); }
    }
    // palettes seat → navigates; capture active indicator
    await page.locator('[data-scene-action="color.palettes"] button').click().catch(() => {}); await wait(1800);
    await expand(page); await shot(page, `${tag}-picker-08-after-palettes-seat`);
    await measure(page, `${tag}-after-palettes-seat`);
    // Back
    const back = page.locator('[aria-label="Back"]');
    if (await back.count() && await back.first().isVisible()) { await back.first().click(); await wait(800); await shot(page, `${tag}-picker-09-after-back`, true); }
  }
  // ── other color routes + workbench scenes ──
  for (const r of ["palettes", "blob", "generate", "gradient", "mix"]) {
    await page.goto(`${BASE}/#/${r}`, { waitUntil: "load" }); await wait(3000);
    await expand(page); await shot(page, `${tag}-${r}-00-main-layer`, true);
    if (await openBar(page)) {
      await shot(page, `${tag}-${r}-01-actions`); await shot(page, `${tag}-${r}-01-actions-dock`, true);
      await measure(page, `${tag}-${r}-actions`);
      if (vk === "d") { const first = page.locator("[data-scene-action] button").first(); await first.hover().catch(() => {}); await wait(900); await shot(page, `${tag}-${r}-02-hover-first`, true); await page.mouse.move(5, 5); await wait(300); }
    } else log.metrics[`${tag}-${r}-actions`] = "NO TOOLS TOGGLE";
  }
  // ── routes that must carry NO action bar ──
  for (const r of ["browse", "extract", "atmosphere", "admin/users", "nope-404"]) {
    await page.goto(`${BASE}/#/${r}`, { waitUntil: "load" }); await wait(2800);
    await expand(page); const n = r.replace(/\W/g, "-");
    await shot(page, `${tag}-nobar-${n}`);
    log.metrics[`${tag}-nobar-${n}`] = await page.evaluate(() => ({ url: location.hash, toolsSlotVisible: !!document.querySelector(".action-bar-toggle-slot.is-visible"), toolsBtnCount: document.querySelectorAll('[aria-label="Toggle action bar"]').length, toolsTabIndex: document.querySelector('[aria-label="Toggle action bar"]')?.getAttribute("tabindex") }));
  }
  log.metrics[`${tag}-errors`] = errs.slice(0, 20);
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}capture-log.json`, JSON.stringify(log, null, 2));
console.log("frames", log.frames.length);
