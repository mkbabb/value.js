// dock-profile-menu capture — READ-ONLY audit seat (X §0bl). Headed Chromium, real GPU.
// Reach: 1440 → dock Login → slug-edit layer → "Generate new slug" (writes a throwaway user to the
// local dev DB) → Profile trigger → menu. Identity pending/failed are forced with page.route on
// POST /sessions (delay / 503) — the app code is untouched. Admin = slug-edit with a non-slug string.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const URL_ = process.env.URL || "http://localhost:9000/";
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const gsha = execSync("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD").toString().trim();
const gdirty = execSync("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l").toString().trim();
const log = [];
const note = (m) => { log.push(m); console.log(m); };
note(`value.js ${sha} dirty=${dirty} · glass-ui ${gsha} dirty=${gdirty} · url=${URL_} · ${new Date().toISOString()}`);
const browser = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const VPS = [{ n: "1440", w: 1440, h: 900, mobile: false }, { n: "390", w: 390, h: 844, mobile: true }];

const box = (el) => { const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
async function measure(page) {
  return page.evaluate(() => {
    const B = (el) => { const b = el.getBoundingClientRect(); return `${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.width)}x${Math.round(b.height)}`; };
    const out = {};
    const trig = document.querySelector('[data-o18="profile-trigger"]') || [...document.querySelectorAll("button")].find((b) => /^\s*Login\s*$/.test(b.textContent) && b.offsetParent);
    if (trig) { const s = getComputedStyle(trig); out.trigger = { text: trig.textContent.trim(), box: B(trig), radius: s.borderRadius, font: `${s.fontFamily.split(",")[0]} ${s.fontSize}/${s.fontWeight}`, color: s.color, border: `${s.borderStyle} ${s.borderWidth} ${s.borderColor}`, shadow: s.boxShadow.slice(0, 120), cls: trig.className.slice(0, 160) }; }
    const admin = [...document.querySelectorAll(".slug-pill")].find((e) => e.textContent.trim() === "admin" && e.offsetParent);
    if (admin) { const s = getComputedStyle(admin); out.adminPill = { box: B(admin), radius: s.borderRadius, font: `${s.fontFamily.split(",")[0]} ${s.fontSize}/${s.fontWeight}`, color: s.color, border: `${s.borderWidth} ${s.borderColor}`, role: admin.getAttribute("role"), tabindex: admin.tabIndex, cls: admin.className }; }
    const dockBtns = [...document.querySelectorAll(".glass-dock button, .glass-dock [role=combobox]")].filter((b) => b.offsetParent).map((b) => { const s = getComputedStyle(b); return `${(b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 22)}|${B(b)}|r=${s.borderRadius}`; });
    out.dockControls = dockBtns;
    const menu = document.querySelector('[role="menu"]');
    if (menu) {
      const cs = getComputedStyle(menu);
      out.menu = { box: B(menu), radius: cs.borderRadius, pad: cs.padding, bg: cs.backgroundColor, backdrop: cs.backdropFilter, cls: menu.className.slice(0, 200) };
      out.items = [...menu.querySelectorAll('[role="menuitem"], [data-identity-verdict], .slug-pill, [role="separator"], [role="group"] > div')].map((el) => { const s = getComputedStyle(el); return { role: el.getAttribute("role") || (el.hasAttribute("data-identity-verdict") ? "verdict:" + el.getAttribute("role") : el.className.slice(0, 30)), text: el.textContent.trim().slice(0, 60), box: B(el), radius: s.borderRadius, font: `${s.fontFamily.split(",")[0]} ${s.fontSize}/${s.fontWeight}`, color: s.color, bg: s.backgroundColor, border: `${s.borderWidth} ${s.borderColor}`, disabled: el.getAttribute("aria-disabled") || el.getAttribute("data-disabled") }; });
    }
    out.focused = document.activeElement ? `${document.activeElement.tagName} ${(document.activeElement.getAttribute("aria-label") || document.activeElement.textContent).trim().slice(0, 40)}` : null;
    out.slugLS = localStorage.getItem("palette-user-slug");
    out.adminLS = localStorage.getItem("palette-admin-token");
    return out;
  });
}
async function shot(page, name) { await page.screenshot({ path: `${OUT}${name}.png` }); }
async function crop(page, name) {
  // a 2x crop around the dock + open menu so the frame judges the control itself
  const r = await page.evaluate(() => {
    const els = [document.querySelector(".glass-dock"), document.querySelector('[role="menu"]')].filter(Boolean);
    if (!els.length) return null;
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const e of els) { const b = e.getBoundingClientRect(); x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom); }
    return { x: Math.max(0, x0 - 16), y: Math.max(0, y0 - 16), width: Math.min(innerWidth, x1 + 16) - Math.max(0, x0 - 16), height: Math.min(innerHeight, y1 + 16) - Math.max(0, y0 - 16) };
  });
  if (r) await page.screenshot({ path: `${OUT}${name}-crop.png`, clip: r });
}
async function expandDock(page) {
  const c = page.locator(".glass-dock.collapsed");
  if (await c.count()) { await c.first().click().catch(() => {}); await page.waitForTimeout(900); }
}
async function openProfile(page) {
  await expandDock(page);
  const t = page.locator('[data-o18="profile-trigger"]');
  if (await t.isVisible().catch(() => false)) { await t.click(); await page.waitForTimeout(700); return "desktop"; }
  const m = page.locator('[aria-label="Menu"]').first();
  if (await m.isVisible().catch(() => false)) { await m.click(); await page.waitForTimeout(700); return "mobile"; }
  return null;
}
async function newCtx(theme, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, isMobile: vp.mobile, hasTouch: vp.mobile, colorScheme: theme });
  await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__seeded")) { localStorage.setItem("vueuse-color-scheme", t); sessionStorage.setItem("__seeded", "1"); } } catch {} }, theme);
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
  const page = await ctx.newPage();
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 200))); page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
  try { await page.goto(URL_, { waitUntil: "load", timeout: 45000 }); } catch (e) { note(`goto: ${e.message.split("\n")[0]}`); }
  await page.locator(".glass-dock").first().waitFor({ timeout: 30000 }).catch(() => note("dock never mounted"));
  await page.waitForTimeout(3000);
  return { ctx, page, errs };
}
async function startSlugEdit(page, tag) {
  await expandDock(page);
  const login = page.locator("button", { hasText: /^\s*Login\s*$/ }).filter({ visible: true }).first();
  if (await login.isVisible().catch(() => false)) { await login.click(); await page.waitForTimeout(700); return true; }
  // mobile twin: overflow menu → Login row
  const m = page.locator('[aria-label="Menu"]').first();
  if (await m.isVisible().catch(() => false)) {
    await m.click(); await page.waitForTimeout(600);
    const row = page.locator('[role="menuitem"]', { hasText: "Login" }).first();
    if (await row.isVisible().catch(() => false)) { await row.click(); await page.waitForTimeout(800); return true; }
  }
  note(`${tag} no Login reach`); return false;
}

const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const FLOWS = (process.env.FLOWS || "user,admin").split(",");
for (const theme of ["light", "dark"]) for (const vp of VPS) {
  const tag = `${theme}-${vp.n}`;
  if (ONLY && !ONLY.includes(tag)) continue;
  // ── USER flow ────────────────────────────────────────────────────────────
  if (FLOWS.includes("user")) {
    const { ctx, page, errs } = await newCtx(theme, vp);
    await expandDock(page);
    await shot(page, `${tag}-0-signed-out-dock`); await crop(page, `${tag}-0-signed-out-dock`);
    note(`${tag} signed-out ${JSON.stringify(await measure(page))}`);
    if (await startSlugEdit(page, tag)) {
      await shot(page, `${tag}-1-slug-edit`); await crop(page, `${tag}-1-slug-edit`);
      const gen = page.locator('[aria-label="Generate new slug"]').first();
      await gen.click(); await page.waitForTimeout(2500);
    }
    await expandDock(page);
    await shot(page, `${tag}-2-signed-in-dock`); await crop(page, `${tag}-2-signed-in-dock`);
    note(`${tag} signed-in ${JSON.stringify(await measure(page))}`);
    const how = await openProfile(page);
    note(`${tag} profile reach=${how}`);
    await shot(page, `${tag}-3-menu-open-done`); await crop(page, `${tag}-3-menu-open-done`);
    note(`${tag} menu-open(done verdict from slug-layer generate) ${JSON.stringify(await measure(page))}`);
    // hover + keyboard focus
    const items = page.locator('[role="menu"] [role="menuitem"]');
    if (await items.count()) {
      await items.nth(1).hover().catch(() => {}); await page.waitForTimeout(300);
      await crop(page, `${tag}-4-hover-item`);
      await page.mouse.move(5, 5); await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300);
      await crop(page, `${tag}-5-keyfocus`);
      note(`${tag} keyfocus focused=${(await measure(page)).focused}`);
    }
    // PENDING — delay POST /sessions 4s
    await page.route("**/sessions", async (route) => { if (route.request().method() === "POST") { await new Promise((r) => setTimeout(r, 4000)); await route.continue(); } else await route.continue(); });
    const regen = page.locator('[role="menu"] [role="menuitem"]', { hasText: /Regenerate/ }).first();
    if (await regen.isVisible().catch(() => false)) {
      await regen.click(); await page.waitForTimeout(400);
      await shot(page, `${tag}-6-pending`); await crop(page, `${tag}-6-pending`);
      note(`${tag} pending ${JSON.stringify(await measure(page))}`);
      await page.waitForTimeout(4500);
      await crop(page, `${tag}-7-done`);
      note(`${tag} done ${JSON.stringify((await measure(page)).items?.filter((i) => /verdict|slug/.test(i.role) || /New slug/.test(i.text)))}`);
    } else note(`${tag} no Regenerate row visible`);
    await page.unroute("**/sessions");
    // FAILED — 503 on POST /sessions
    await page.route("**/sessions", async (route) => {
      if (route.request().method() === "POST") await route.fulfill({ status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503, detail: "audit-forced failure" }) });
      else await route.continue();
    });
    const slugBefore = await page.evaluate(() => localStorage.getItem("palette-user-slug"));
    const regen2 = page.locator('[role="menu"] [role="menuitem"]', { hasText: /Regenerate/ }).first();
    if (await regen2.isVisible().catch(() => false)) {
      await regen2.click(); await page.waitForTimeout(1500);
      await shot(page, `${tag}-8-failed`); await crop(page, `${tag}-8-failed`);
      const m = await measure(page);
      note(`${tag} failed ${JSON.stringify(m)} slugBefore=${slugBefore}`);
    }
    await page.unroute("**/sessions");
    // after failure: close, look at the dock, reload — what identity survives?
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    await crop(page, `${tag}-9-after-failed-closed`);
    note(`${tag} after-failed-closed slugLS=${await page.evaluate(() => localStorage.getItem("palette-user-slug"))} trigger=${JSON.stringify((await measure(page)).trigger?.text)}`);
    await page.reload({ waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(2500); await expandDock(page);
    await crop(page, `${tag}-10-after-failed-reload`);
    note(`${tag} after-failed-reload ${JSON.stringify(await measure(page))}`);
    note(`${tag} user-flow errors=${JSON.stringify(errs.slice(0, 6))}`);
    await ctx.close();
  }
  // ── ADMIN flow (a non-slug string in the slug field) ─────────────────────
  if (FLOWS.includes("admin")) {
    const { ctx, page, errs } = await newCtx(theme, vp);
    if (await startSlugEdit(page, tag)) {
      const input = page.locator('[aria-label="Slug or admin token"]').first();
      await input.fill("audit_admin_token_x")  // NOT slug-shaped (a 4-word a-z hyphen string routes to user login); await page.waitForTimeout(150);
      await input.press("Enter"); await page.waitForTimeout(2500);
    }
    await expandDock(page);
    await shot(page, `${tag}-11-admin`); await crop(page, `${tag}-11-admin`);
    note(`${tag} admin ${JSON.stringify(await measure(page))}`);
    const pill = page.locator(".slug-pill", { hasText: "admin" }).filter({ visible: true }).first();
    if (await pill.isVisible().catch(() => false)) {
      await pill.hover(); await page.waitForTimeout(300); await crop(page, `${tag}-12-admin-hover`);
      await pill.click().catch(() => {}); await page.waitForTimeout(600);
      note(`${tag} admin-pill click → menu=${await page.locator('[role="menu"]').isVisible().catch(() => false)} focused=${(await measure(page)).focused}`);
      // is there ANY way to sign out of admin / switch to a slug from the desktop dock?
      const loginVisible = await page.locator("button", { hasText: /^\s*Login\s*$/ }).filter({ visible: true }).count();
      note(`${tag} admin: visible Login buttons=${loginVisible}`);
    } else {
      const how = await openProfile(page); // mobile twin
      if (how) { await shot(page, `${tag}-12-admin-menu`); await crop(page, `${tag}-12-admin-menu`); note(`${tag} admin-menu(${how}) ${JSON.stringify(await measure(page))}`); }
    }
    note(`${tag} admin-flow errors=${JSON.stringify(errs.slice(0, 6))}`);
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}capture-log${process.env.LOGSUFFIX || ""}.txt`, log.join("\n") + "\n");
