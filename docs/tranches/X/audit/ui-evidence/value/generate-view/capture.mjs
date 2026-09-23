// UI-AUDIT seat `generate-view` (COHESION §0bl) — READ-ONLY capture. Headed Chromium, real GPU.
// Served dev page :9000; never starts/stops a server. Palettes seeded to localStorage (local-first store; no API writes).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const tree = () => `${execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim()} dirty=${execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim()}`;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const ONLY = process.env.ONLY?.split(",");
const log = { tree: tree(), at: new Date().toISOString(), frames: [], metrics: {}, errs: {}, net: {} };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const now = "2026-09-20T12:00:00.000Z";
const PALS = [{ id: "p-1", name: "Sunset Coast", slug: "sunset-coast", colors: ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"].map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tags: [] }];
const seed = (theme) => `(() => { try { if (sessionStorage.getItem('__audit_seeded')) return; sessionStorage.setItem('__audit_seeded','1'); localStorage.clear(); localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)}); localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify({ version: 1, palettes: PALS }))}); } catch (e) {} })();`;

async function measure(page) {
  return page.evaluate(() => {
    const r = (el) => { const b = el.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
    const m = (sel, n = 4) => [...document.querySelectorAll(sel)].slice(0, n).map((el) => { const s = getComputedStyle(el); return { sel, box: r(el), rad: s.borderRadius, font: `${s.fontSize}/${s.fontWeight} ${s.fontFamily.slice(0, 30)}`, bg: s.backgroundColor, shadow: s.boxShadow.slice(0, 90), border: s.border, cls: String(el.className?.baseVal ?? el.className).slice(0, 140) }; });
    return {
      hash: location.hash, html: document.documentElement.className, bodyBg: getComputedStyle(document.body).backgroundColor,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      card: m("[data-generate-plate]", 1),
      paneCard: (() => { const pl = document.querySelector("[data-generate-plate]"); let c = pl; while (c && !(c.className && String(c.className).includes("pane-scroll-fade"))) c = c.parentElement; if (!c) return null; const s = getComputedStyle(c); return { box: r(c), rad: s.borderRadius, bg: s.backgroundColor, cls: String(c.className).slice(0, 160) }; })(),
      header: m("[data-generate-plate] ~ *, h1, h2, [class*=pane-header]", 6),
      strip: m("[data-generate-plate] > :first-child", 1),
      nameInput: m("[data-generate-plate] input", 1),
      badge: m("[data-generate-plate] [data-slot=badge], [data-generate-plate] .badge", 1),
      buttons: [...document.querySelectorAll("[data-generate-plate] button:not(.generate-swatch)")].map((e) => { const s = getComputedStyle(e); return { label: e.getAttribute("aria-label") || e.textContent.trim(), box: r(e), rad: s.borderRadius, bg: s.backgroundColor, font: s.fontSize, shadow: s.boxShadow.slice(0, 80) }; }),
      swatches: m(".generate-swatch", 2),
      triggers: m("[data-slot=select-trigger], button[role=combobox]", 3),
      labels: m("[data-generate-plate] ~ div label, label", 4),
      slider: m("[role=slider]", 1).concat(m("[data-slot=slider]", 1)),
      sliderTrackBg: (() => { const s = document.querySelector("[aria-label='Color count']") ?? document.querySelector("[role=slider]"); const w = s?.closest(".relative.flex-1"); const g = w?.firstElementChild; return g ? { rad: getComputedStyle(g).borderRadius, box: r(g) } : null; })(),
      selectContent: m("[role=listbox]", 1).concat(m("[data-slot=select-content]", 1)),
      options: m("[role=option]", 2),
      previewChips: m(".preview-strip", 2),
      seed: [...document.querySelectorAll("[data-generate-plate] p")].map((p) => p.textContent.trim()),
      paletteCards: [...document.querySelectorAll("[role=article], .palette-card")].map((e) => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 60)),
      toasts: [...document.querySelectorAll("[role=status], [role=alert], [data-sonner-toast], .feedback-chip")].map((e) => e.textContent.trim().slice(0, 80)).filter(Boolean),
      panes: [...document.querySelectorAll(".pane-shell, [data-pane]")].map((e) => ({ box: r(e), cls: String(e.className).slice(0, 80), pane: e.getAttribute("data-pane") })),
    };
  });
}

const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) for (const [vk, vp] of Object.entries(VPS)) {
  const tag = `${vk === "d" ? 1440 : 390}-${theme}`;
  if (ONLY && !ONLY.includes(tag)) continue;
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, colorScheme: theme, hasTouch: vk === "m", isMobile: false });
  await ctx.addInitScript(seed(theme));
  const page = await ctx.newPage();
  const errs = (log.errs[tag] = []);
  const net = (log.net[tag] = []);
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 220)));
  page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 220)));
  page.on("request", (q) => { if (q.method() !== "GET") net.push(`${q.method()} ${q.url().slice(0, 120)}`); });
  const shot = async (name, opts = {}) => { const f = `${tag}-${name}.png`; await page.screenshot({ path: OUT + f, ...opts }); log.frames.push({ frame: f, tree: tree(), hash: await page.evaluate(() => location.hash) }); };
  const plateShot = async (name) => { const pl = page.locator("[data-generate-plate]").first(); const c = pl.locator("xpath=ancestor::*[contains(@class,'pane-scroll-fade')][1]"); const f = `${tag}-${name}.png`; await (await c.count() ? c : pl).screenshot({ path: OUT + f }).catch(() => {}); log.frames.push({ frame: f, tree: tree() }); };
  await page.goto(`${BASE}/#/generate`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator("[data-generate-plate]").first().waitFor({ timeout: 45000 }).catch(() => errs.push("NO PLATE in 45s"));
  await wait(3500);
  await shot("01-default");
  await plateShot("01b-card");
  if (vk === "m") await shot("01c-fullpage", { fullPage: true });
  log.metrics[`${tag}-default`] = await measure(page);
  // hover Regenerate + keyboard focus on first swatch
  if (vk === "d") {
    await page.locator("[data-generate-plate] button", { hasText: "Regenerate" }).hover().catch(() => {}); await wait(500); await plateShot("02-hover-regen");
    await page.locator(".generate-swatch").first().focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await wait(400); await plateShot("02b-swatch-focus");
    log.metrics[`${tag}-swatchFocus`] = await page.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a); return { aria: a?.getAttribute("aria-label"), outline: s.outline, boxShadow: s.boxShadow, filter: s.filter }; });
    await page.locator("[data-generate-plate] input").first().hover().catch(() => {}); await wait(300); await plateShot("02c-name-hover");
    await page.mouse.move(3, 3);
  }
  // select open (Preset)
  const trig = page.locator("[data-slot=select-trigger], button[role=combobox]").first();
  await trig.click().catch((e) => errs.push("trigger click " + e.message.slice(0, 80))); await wait(800);
  await shot("03-select-open");
  log.metrics[`${tag}-selectOpen`] = await measure(page);
  await page.keyboard.press("ArrowDown"); await wait(250); await shot("03b-select-kbd");
  await page.keyboard.press("Escape"); await wait(500);
  if (vk === "d") { await page.locator("[data-slot=select-trigger], button[role=combobox]").nth(1).click().catch(() => {}); await wait(800); await shot("03c-harmony-open"); await page.keyboard.press("Escape"); await wait(500); }
  // Tools → Regenerate
  const seedBefore = await page.locator("[data-generate-plate] p").first().textContent().catch(() => null);
  const col = page.locator(".glass-dock.collapsed"); if (await col.count()) { await col.first().click().catch(() => {}); await wait(900); }
  const tools = page.locator('[aria-label="Toggle action bar"]');
  await tools.first().click().catch((e) => errs.push("tools click " + e.message.slice(0, 80))); await wait(1200);
  await shot("04-tools-open");
  log.metrics[`${tag}-tools`] = await page.evaluate(() => [...document.querySelectorAll("[data-scene-action]")].map((s) => ({ token: s.dataset.sceneAction, state: s.dataset.actionState, rad: getComputedStyle(s.querySelector("button")).borderRadius })));
  await page.locator('[data-scene-action="generate.regenerate"] button').click().catch((e) => errs.push("regen click " + e.message.slice(0, 80))); await wait(150);
  await shot("05a-regen-150ms");
  await wait(900);
  await shot("05-after-regenerate");
  const seedAfter = await page.locator("[data-generate-plate] p").first().textContent().catch(() => null);
  log.metrics[`${tag}-regen`] = { seedBefore, seedAfter, changed: seedBefore !== seedAfter };
  // Save palette via Tools seat
  const cardsBefore = (await measure(page)).paletteCards;
  await page.locator('[data-scene-action="generate.save"] button').click().catch((e) => errs.push("save click " + e.message.slice(0, 80))); await wait(300);
  await shot("06a-save-300ms");
  await wait(1500);
  await shot("06-after-save");
  const afterSave = await measure(page);
  log.metrics[`${tag}-save`] = { cardsBefore, cardsAfter: afterSave.paletteCards, toasts: afterSave.toasts, panes: afterSave.panes, hash: afterSave.hash, stored: await page.evaluate(() => { try { return JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name); } catch { return null; } }) };
  if (vk === "m") await shot("06b-after-save-full", { fullPage: true });
  await ctx.close();
}
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
await b.close();
console.log("done", log.frames.length);
