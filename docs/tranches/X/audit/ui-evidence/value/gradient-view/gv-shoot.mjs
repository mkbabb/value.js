// UI-AUDIT seat `gradient-view` (COHESION §0bl) — READ-ONLY capture. Headed Chromium, real GPU.
// Served dev page :9000; never starts/stops a server. Palettes seeded to localStorage only (local-first; no API writes).
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
    const m = (sel, n = 4) => [...document.querySelectorAll(sel)].slice(0, n).map((el) => { const s = getComputedStyle(el); return { sel, box: r(el), rad: s.borderRadius, font: `${s.fontSize}/${s.fontWeight} ${s.fontFamily.slice(0, 24)}`, color: s.color, bg: s.backgroundColor, border: s.border, shadow: s.boxShadow.slice(0, 80), cls: String(el.className?.baseVal ?? el.className).slice(0, 120) }; });
    const bar = document.querySelector("[data-testid=gradient-stop-bar]");
    let card = bar; while (card && !String(card.className).includes("pane-scroll-fade")) card = card.parentElement;
    return {
      hash: location.hash, html: document.documentElement.className, bodyBg: getComputedStyle(document.body).backgroundColor,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      card: card ? { box: r(card), rad: getComputedStyle(card).borderRadius, scrollH: card.scrollHeight, clientH: card.clientHeight, bg: getComputedStyle(card).backgroundColor } : null,
      paneHeader: m("[data-slot=pane-header], .pane-header, header h2, h2", 3),
      h3: m("h3", 6).map((x) => ({ ...x, text: undefined })),
      h3text: [...document.querySelectorAll("h3")].map((h) => h.textContent.trim()),
      sectionLabels: m(".section-label, [data-slot=labeled-field] label, label", 8),
      bar: m("[data-testid=gradient-stop-bar]", 1),
      handles: [...document.querySelectorAll(".rail-handle")].map((h) => ({ box: r(h), sel: h.dataset.selected !== undefined, pos: h.getAttribute("aria-valuenow") })),
      inspector: m("[data-testid=gradient-stop-inspector]", 1),
      inspectorInput: m(".stop-inspector-input", 1),
      inspectorRemove: m(".stop-inspector-remove", 1),
      triggers: card ? [...card.querySelectorAll("button[role=combobox]")].map((el) => { const s = getComputedStyle(el); return { box: r(el), rad: s.borderRadius, font: s.fontSize, bg: s.backgroundColor, shadow: s.boxShadow.slice(0, 80), cls: String(el.className).slice(0, 140) }; }) : [],
      slider: m("[role=slider][aria-label='Gradient direction'], [data-slot=slider-thumb]", 2),
      sliderTrack: m("[data-slot=slider-track]", 1),
      tile: m("[data-testid=gradient-render-tile]", 1),
      easingRows: m(".easing-row", 3),
      copyBtn: [...document.querySelectorAll("button")].filter((b) => (b.title || b.getAttribute("aria-label") || "").includes("Copy CSS")).map((e) => { const s = getComputedStyle(e); return { box: r(e), rad: s.borderRadius, bg: s.backgroundColor, cls: String(e.className).slice(0, 120) }; }),
      codeEditor: m("[aria-label='Gradient CSS']", 1),
      codeText: document.querySelector("[aria-label='Gradient CSS']")?.textContent?.slice(0, 300),
      verdict: document.querySelector("[data-testid=gradient-parse-verdict]")?.textContent?.trim() ?? null,
      listbox: m("[role=listbox], [data-slot=select-content]", 1),
      options: m("[role=option]", 2),
      toasts: [...document.querySelectorAll("[role=status], [role=alert]")].map((e) => e.textContent.trim().slice(0, 80)).filter(Boolean),
      panes: [...document.querySelectorAll(".pane-shell, [data-pane]")].map((e) => ({ box: r(e), pane: e.getAttribute("data-pane"), cls: String(e.className).slice(0, 60) })),
    };
  });
}

const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) for (const [vk, vp] of Object.entries(VPS)) {
  const tag = `${vk === "d" ? 1440 : 390}-${theme}`;
  if (ONLY && !ONLY.includes(tag)) continue;
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, colorScheme: theme, hasTouch: vk === "m", isMobile: false });
  await ctx.addInitScript(seed(theme));
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE }).catch(() => {});
  const page = await ctx.newPage();
  page.setDefaultTimeout(45000);
  const errs = (log.errs[tag] = []);
  const net = (log.net[tag] = []);
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 220)));
  page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 220)));
  page.on("request", (q) => { if (q.method() !== "GET") net.push(`${q.method()} ${q.url().slice(0, 120)}`); });
  const shot = async (name, opts = {}) => { const f = `${tag}-${name}.png`; await page.screenshot({ path: OUT + f, ...opts }).catch((e) => errs.push("shot " + name + " " + e.message.slice(0, 80))); log.frames.push({ frame: f, tree: tree(), hash: await page.evaluate(() => location.hash) }); };
  const cardLoc = () => page.locator("[data-testid=gradient-stop-bar]").locator("xpath=ancestor::*[contains(@class,'pane-scroll-fade')][1]");
  const cardShot = async (name) => { const f = `${tag}-${name}.png`; await cardLoc().screenshot({ path: OUT + f }).catch((e) => errs.push("card " + name + " " + e.message.slice(0, 80))); log.frames.push({ frame: f, tree: tree() }); };
  const scrollCard = (y) => cardLoc().evaluate((el, y) => { el.scrollTop = y === "end" ? el.scrollHeight : y; }, y).catch(() => {});
  const into = (sel) => page.locator(sel).first().scrollIntoViewIfNeeded().catch(() => {});

  await page.goto(`${BASE}/#/gradient`, { waitUntil: "domcontentloaded", timeout: 600000 });
  await page.locator("[data-testid=gradient-stop-bar]").first().waitFor({ timeout: 600000 }).catch(() => errs.push("NO RAIL in 600s"));
  await wait(3500);
  await shot("01-default");
  await cardShot("01b-card-top");
  await scrollCard("end"); await wait(500); await cardShot("01c-card-bottom"); await scrollCard(0); await wait(300);
  if (vk === "m") await shot("01d-fullpage", { fullPage: true });
  log.metrics[`${tag}-default`] = await measure(page);

  // select open (Type) + Space
  const trig = cardLoc().locator("button[role=combobox]");
  await into("[data-testid=gradient-stop-bar]");
  await trig.first().click().catch((e) => errs.push("type trigger " + e.message.slice(0, 80))); await wait(800);
  await shot("02-select-type-open");
  log.metrics[`${tag}-selectOpen`] = await measure(page);
  await page.keyboard.press("ArrowDown"); await wait(250); await shot("02b-select-kbd");
  await page.keyboard.press("Escape"); await wait(500);
  await trig.nth(1).click().catch(() => {}); await wait(800); await shot("02c-select-space-open"); await page.keyboard.press("Escape"); await wait(500);
  // choose Radial type to exercise tile
  await trig.first().click().catch(() => {}); await wait(600);
  await page.locator("[role=option]").nth(1).click().catch((e) => errs.push("radial " + e.message.slice(0, 80))); await wait(700);
  await into("[data-testid=gradient-render-tile]"); await shot("02d-type-radial");
  log.metrics[`${tag}-radial`] = { railCount: await page.locator("[data-testid=gradient-stop-bar]").count(), selected: await trig.first().textContent().catch(() => null), tile: await page.locator("[data-testid=gradient-render-tile]").evaluate((e) => e.style.cssText.slice(0, 200)).catch(() => null) };
  if (!log.metrics[`${tag}-radial`].railCount) { errs.push("RAIL GONE after radial"); await page.reload({ waitUntil: "domcontentloaded", timeout: 600000 }); await page.locator("[data-testid=gradient-stop-bar]").first().waitFor({ timeout: 600000 }).catch(() => errs.push("NO RAIL after reload")); await wait(3000); }

  // rail: hover ghost, add stop, drag stop, select stop
  const bar = page.locator("[data-testid=gradient-stop-bar]").first();
  await bar.scrollIntoViewIfNeeded().catch(() => {});
  const bb = await bar.boundingBox().catch(() => null);
  if (bb) {
    const y = bb.y + bb.height / 2;
    if (vk === "d") { await page.mouse.move(bb.x + bb.width * 0.3, y); await wait(400); await shot("03a-rail-hover-ghost"); }
    const before = (await measure(page)).handles.length;
    if (vk === "m") await page.touchscreen.tap(bb.x + bb.width * 0.3, y).catch(() => {}); else await page.mouse.click(bb.x + bb.width * 0.3, y);
    await wait(600);
    const afterAdd = await measure(page);
    log.metrics[`${tag}-add`] = { before, after: afterAdd.handles.length, handles: afterAdd.handles, inspector: afterAdd.inspector, code: afterAdd.codeText };
    await shot("03b-stop-added");
    // drag the last handle leftwards
    const h = page.locator(".rail-handle").last(); const hb = await h.boundingBox().catch(() => null);
    if (hb) {
      await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down(); await wait(100);
      for (let i = 1; i <= 8; i++) { await page.mouse.move(hb.x + hb.width / 2 - i * (bb.width * 0.03), hb.y + hb.height / 2); await wait(30); }
      await shot("03c-stop-dragging");
      await page.mouse.up(); await wait(500);
      await shot("03d-stop-dragged");
      log.metrics[`${tag}-drag`] = await measure(page).then((m) => ({ handles: m.handles, code: m.codeText }));
    }
    // keyboard focus on a handle
    await page.locator(".rail-handle").first().focus().catch(() => {}); await page.keyboard.press("ArrowRight"); await wait(400);
    await shot("03e-handle-focus");
    log.metrics[`${tag}-focus`] = await page.evaluate(() => { const a = document.activeElement; const f = a.querySelector(".rail-handle-face"); return { aria: a?.getAttribute("aria-label"), shadow: f ? getComputedStyle(f).boxShadow : null, outline: getComputedStyle(a).outline }; });
  }

  // easing row open
  const erow = page.locator(".interval-head").first();
  if (await erow.count()) {
    await erow.scrollIntoViewIfNeeded().catch(() => {}); await erow.click().catch(() => {}); await wait(900);
    await shot("04a-easing-row-open");
    const tune = page.locator("[aria-label='Author a custom curve']").first();
    await tune.click().catch(() => {}); await wait(900); await tune.scrollIntoViewIfNeeded().catch(() => {}); await wait(300);
    await shot("04b-easing-author-open");
    log.metrics[`${tag}-easing`] = await measure(page).then((m) => m.easingRows);
    await tune.click().catch(() => {}); await erow.click().catch(() => {}); await wait(500);
  }

  // code editor: invalid then valid
  const ed = page.locator("[aria-label='Gradient CSS']").first();
  await ed.scrollIntoViewIfNeeded().catch(() => {});
  await ed.click().catch(() => {}); await page.keyboard.press("Meta+A"); await page.keyboard.type("linear-gradient(90deg, nope, #00f)"); await wait(900);
  await shot("05a-code-invalid");
  log.metrics[`${tag}-invalid`] = await measure(page).then((m) => ({ verdict: m.verdict, editor: m.codeEditor, handles: m.handles.length }));
  await page.keyboard.press("Meta+A"); await page.keyboard.type("linear-gradient(45deg, #ff0080, #7928ca 50%, #2afadf)"); await wait(900);
  await shot("05b-code-valid-focused");
  await page.locator("h3").first().click().catch(() => {}); await wait(600);
  await shot("05c-code-valid-blurred");
  log.metrics[`${tag}-valid`] = await measure(page).then((m) => ({ verdict: m.verdict, handles: m.handles, code: m.codeText, tile: m.tile }));

  // Tools: open action bar, Seed from palette, Reset
  const col = page.locator(".glass-dock.collapsed"); if (await col.count()) { await col.first().click().catch(() => {}); await wait(900); }
  await page.locator('[aria-label="Toggle action bar"]').first().click().catch((e) => errs.push("tools click " + e.message.slice(0, 80))); await wait(1200);
  await shot("06a-tools-open");
  log.metrics[`${tag}-tools`] = await page.evaluate(() => [...document.querySelectorAll("[data-scene-action]")].map((s) => ({ token: s.dataset.sceneAction, state: s.dataset.actionState, label: s.textContent.trim().slice(0, 30), rad: getComputedStyle(s.querySelector("button") ?? s).borderRadius })));
  await page.locator('[data-scene-action="gradient.seedFromPalette"] button').first().click().catch((e) => errs.push("seed click " + e.message.slice(0, 80))); await wait(900);
  await shot("06b-after-seed");
  log.metrics[`${tag}-seed`] = await measure(page).then((m) => ({ handles: m.handles, code: m.codeText, verdict: m.verdict, toasts: m.toasts }));
  await page.locator('[data-scene-action="gradient.copyCSS"] button').first().click().catch((e) => errs.push("copy click " + e.message.slice(0, 80))); await wait(700);
  await shot("06c-after-copy");
  log.metrics[`${tag}-copy`] = { clip: await page.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e)), toasts: (await measure(page)).toasts };
  await page.locator('[data-scene-action="gradient.reset"] button').first().click().catch((e) => errs.push("reset click " + e.message.slice(0, 80))); await wait(900);
  await shot("06d-after-reset");
  log.metrics[`${tag}-reset`] = await measure(page).then((m) => ({ handles: m.handles, code: m.codeText, triggers: m.triggers.map((t) => t.box) }));
  if (vk === "m") await shot("06e-after-reset-full", { fullPage: true });
  await ctx.close();
  writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY.join("_") : ""}.json`, JSON.stringify(log, null, 1));
}
writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY.join("_") : ""}.json`, JSON.stringify(log, null, 1));
await b.close();
console.log("done", log.frames.length);
