// admin-users UI audit capture (READ-ONLY: every admin mutation is aborted at the
// network layer; confirm dialogs are dismissed with Escape, never accepted).
// Usage: node capture.mjs [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = process.argv[2] ?? "http://localhost:9000";
const repo = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const meta = { base: BASE, sha, dirty, at: new Date().toISOString(), runs: {} };
const ONLY = process.env.ONLY; // e.g. "1440-light"

const VIEWPORTS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
const THEMES = ["light", "dark"];

// Mocked populated roster (the local DB holds only 0-palette users).
const now = Date.now();
const iso = (d) => new Date(now - d * 864e5).toISOString();
const MOCK_USERS = [
  { slug: "luminous-folding-cobalt-heron-a1b2c3", createdAt: iso(1), lastSeenAt: iso(0), paletteCount: 7 },
  { slug: "quiet-ember-fox", createdAt: iso(2), lastSeenAt: iso(1), paletteCount: 2 },
  { slug: "smoky-dipping-citrine-stork", createdAt: iso(3), lastSeenAt: iso(2), paletteCount: 0 },
  { slug: "eager-mapping-ember-sparrow", createdAt: iso(4), lastSeenAt: iso(3), paletteCount: 0 },
  { slug: "verdant-tidal-moss-owl", createdAt: iso(5), lastSeenAt: iso(4), paletteCount: 12 },
];
const pal = (name, slug, cols, tier = "standard") => ({
  name, slug, userSlug: MOCK_USERS[0].slug, colors: cols.map((css, i) => ({ css, position: i })),
  tags: ["warm"], createdAt: iso(1), updatedAt: iso(1), isLocal: false, visibility: "public", tier, voteCount: 3,
});
const MOCK_PALETTES = [
  pal("Harbor Dusk", "harbor-dusk-x1", ["oklch(0.35 0.08 250)", "oklch(0.55 0.12 230)", "oklch(0.75 0.1 60)", "oklch(0.9 0.04 80)"], "featured"),
  pal("Citrus Grove", "citrus-grove-x2", ["oklch(0.8 0.17 100)", "oklch(0.7 0.19 60)", "oklch(0.6 0.2 30)"]),
  pal("Moss & Stone", "moss-stone-x3", ["oklch(0.45 0.07 140)", "oklch(0.6 0.05 120)", "oklch(0.7 0.02 90)", "oklch(0.3 0.02 60)", "oklch(0.85 0.03 100)"]),
];

let browser = null;
async function ensureBrowser() {
  if (!browser || !browser.isConnected()) browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
  return browser;
}

async function measure(page) {
  return page.evaluate(() => {
    const box = (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
    const cs = (e, keys) => { const s = getComputedStyle(e); return Object.fromEntries(keys.map((k) => [k, s[k]])); };
    const pane = document.querySelector("[data-admin-notice='users']")?.closest(".pane-scroll-fade") ?? null;
    const q = (sel, root = document) => [...root.querySelectorAll(sel)];
    const attrsOf = (e) => Object.fromEntries([...e.attributes].filter((a) => !a.name.startsWith("data-v-")).map((a) => [a.name, a.value.slice(0, 90)]));
    const out = { doc: { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth } };
    if (pane) {
      out.pane = { ...box(pane), ...cs(pane, ["borderRadius", "backgroundColor", "overflowY"]) };
      out.title = q(".pane-header-title", pane).map((e) => ({ text: e.textContent.trim().replace(/\s+/g, " "), ...cs(e, ["fontSize", "fontWeight", "fontFamily"]) }));
      out.search = q(".search-seated", pane).map((e) => ({ ...box(e), ...cs(e, ["borderRadius"]) }));
      out.buttons = q("button", pane).slice(0, 14).map((e) => ({ text: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 40), attrs: attrsOf(e), ...box(e), ...cs(e, ["borderRadius", "backgroundColor", "color", "fontSize", "fontFamily"]) }));
      out.rows = q(".rounded-md.border", pane).slice(0, 3).map((e) => ({ ...box(e), ...cs(e, ["borderRadius", "borderColor", "backgroundColor"]) }));
      out.slugPills = q(".slug-pill", pane).slice(0, 2).map((e) => ({ text: e.textContent.trim(), ...box(e), ...cs(e, ["borderRadius", "color", "fontSize"]) }));
      out.badges = q("[data-slot=badge], .badge", pane).slice(0, 3).map((e) => ({ text: e.textContent.trim(), ...box(e), ...cs(e, ["borderRadius"]) }));
      out.skeletons = q("[data-slot=admin-list-skeleton]", pane).slice(0, 1).map((e) => ({ ...box(e), ...cs(e, ["borderRadius"]), kids: q("*", e).slice(0, 5).map((k) => ({ attrs: attrsOf(k), r: getComputedStyle(k).borderRadius })) }));
      out.empty = q("[role=status],[role=alert]", pane).map((e) => ({ role: e.getAttribute("role"), text: e.textContent.trim().replace(/\s+/g, " ").slice(0, 120), ...box(e) }));
      out.adminPal = q(".admin-palette", pane).slice(0, 2).map((e) => ({ ...box(e), ...cs(e, ["borderRadius"]) }));
      out.focus = document.activeElement ? { tag: document.activeElement.tagName, role: document.activeElement.getAttribute("role"), text: (document.activeElement.textContent || "").trim().slice(0, 40), ...cs(document.activeElement, ["boxShadow", "outlineStyle"]) } : null;
    }
    const dlg = document.querySelector("[role=dialog],[role=alertdialog]");
    if (dlg) out.dialog = { ...box(dlg), ...cs(dlg, ["borderRadius"]), text: dlg.textContent.trim().replace(/\s+/g, " ").slice(0, 300), buttons: q("button", dlg).map((b) => ({ text: b.textContent.trim(), attrs: attrsOf(b), ...cs(b, ["borderRadius", "backgroundColor", "color"]) })), pill: q(".slug-pill", dlg).map((e) => ({ ...box(e), r: getComputedStyle(e).borderRadius })) };
    const menu = document.querySelector("[role=menu]");
    if (menu) out.menu = { ...box(menu), ...cs(menu, ["borderRadius", "backgroundColor"]), items: q("[role=menuitemradio],[role=menuitem]", menu).map((e) => ({ text: e.textContent.trim(), checked: e.getAttribute("aria-checked"), ...box(e), r: getComputedStyle(e).borderRadius })) };
    return out;
  });
}

async function mockRoster(ctx /* page */, { users = MOCK_USERS, delay = 0, abort = false } = {}) {
  await ctx.route(/localhost:3000\/admin\/users\?/, async (route) => {
    if (abort) return route.abort("connectionrefused");
    if (delay) await new Promise((r) => setTimeout(r, delay));
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: users, total: users.length }) });
  });
  await ctx.route(/localhost:3000\/admin\/users\/[^/?]+\/palettes$/, async (route) => {
    if (route.request().method() !== "GET") return route.abort();
    await new Promise((r) => setTimeout(r, 300));
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(MOCK_PALETTES) });
  });
}

async function newCtx(vp, theme, token = "dev") {
  const ctx = await (await ensureBrowser()).newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: vp.w < 500 ? 2 : 1 });
  await ctx.addInitScript(([t, tok]) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, [theme, token]);
  // READ-ONLY guard: no admin mutation ever leaves the browser.
  await ctx.route(/localhost:3000\/admin\//, (route) => {
    const m = route.request().method();
    if (m === "GET" || m === "OPTIONS") return route.fallback();
    return route.abort("blockedbyclient");
  });
  return ctx;
}

async function open(ctx, run, { token = "dev", mock = null } = {}) {
  const page = await ctx.newPage();
  await page.addInitScript((tok) => { try { localStorage.setItem("palette-admin-token", tok); } catch {} }, token);
  if (mock) await mockRoster(page, mock);
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) run.console.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
  page.on("pageerror", (e) => run.console.push(`pageerror: ${String(e).slice(0, 240)}`));
  await page.goto(`${BASE}/#/admin/users`, { waitUntil: "commit", timeout: 180000 });
  await page.waitForSelector("[data-admin-notice='users']", { timeout: 180000 }).catch(() => run.errors.push("panel never mounted"));
  await page.waitForTimeout(2200);
  return page;
}

async function shot(page, run, name, full = false) {
  const f = `${run.key}-${name}.png`;
  await page.screenshot({ path: path.join(OUT, f), fullPage: full });
  run.frames[name] = { file: f, m: await measure(page).catch((e) => ({ err: String(e) })) };
}

for (const vp of VIEWPORTS) for (const theme of THEMES) {
  const key = `${vp.tag}-${theme}`;
  if (ONLY && ONLY !== key) continue;
  const run = (meta.runs[key] = { key, errors: [], console: [], frames: {} });
  // Each block runs in its own context with up to 2 retries (the shared dev
  // server is contended by sibling seats; a flake must not sink the rest).
  const SKIP = (process.env.SKIP ?? "").split(",").filter(Boolean);
  const save = () => fs.writeFileSync(path.join(OUT, `meta-${key}.json`), JSON.stringify({ base: BASE, sha, dirty, at: meta.at, run }, null, 1));
  const prev = (() => { try { return JSON.parse(fs.readFileSync(path.join(OUT, `meta-${key}.json`), "utf8")).run; } catch { return null; } })();
  if (prev) { Object.assign(run.frames, prev.frames); run.errors.push(...prev.errors.map((e) => "prev: " + e)); run.console.push(...prev.console); }
  const block = async (label, fn) => {
    if (SKIP.includes(label.split("-")[0])) return;
    for (let attempt = 1; attempt <= 2; attempt++) {
      let ctx;
      try { ctx = await newCtx(vp, theme); await fn(ctx); await ctx.close().catch(() => {}); save(); return; }
      catch (e) { run.errors.push(`${label}#${attempt}: ${String(e).slice(0, 200)}`); await ctx?.close().catch(() => {}); }
    }
  };
  await block("A-roster", async (ctx) => {
    const page = await open(ctx, run);
    await shot(page, run, "00-roster-local");
    const search = page.locator("input[aria-label='Search users']").first();
    await search.fill("zzzz-no-such-user"); await page.waitForTimeout(700);
    await shot(page, run, "01-empty-filtered");
    await search.fill(""); await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Sort users" }).click(); await page.waitForTimeout(700);
    await shot(page, run, "02-sort-menu-open");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    const prune = page.getByRole("button", { name: /Prune empty/ });
    if (await prune.isEnabled()) { await prune.click(); await page.waitForTimeout(900); await shot(page, run, "03-prune-confirm"); await page.keyboard.press("Escape"); await page.waitForTimeout(600); }
    const del = page.getByRole("button", { name: /^Delete user / }).first();
    if (await del.count()) { await del.click(); await page.waitForTimeout(900); await shot(page, run, "04-row-confirm-delete-user"); await page.keyboard.press("Escape"); await page.waitForTimeout(600); }
    await page.route(/localhost:3000\/admin\/users\?/, async (route) => { await new Promise((r) => setTimeout(r, 2500)); return route.fallback(); });
    await page.getByRole("button", { name: /Refresh/ }).click(); await page.waitForTimeout(500);
    await shot(page, run, "05-refresh-loading-skeleton");
    await page.waitForTimeout(2600);
    await shot(page, run, "06-refresh-settled");
  });
  await block("B-empty", async (ctx) => { const page = await open(ctx, run, { mock: { users: [] } }); await shot(page, run, "07-empty-roster"); });
  await block("C-refused", async (ctx) => { const page = await open(ctx, run, { token: "wrong-token" }); await shot(page, run, "08-token-refused"); });
  await block("D-error", async (ctx) => { const page = await open(ctx, run, { mock: { abort: true } }); await shot(page, run, "09-load-error"); });
  await block("E-populated", async (ctx) => {
    const page = await open(ctx, run, { mock: {} });
    await shot(page, run, "10-populated");
    const firstRow = page.locator("[role=button][aria-expanded]").first();
    await firstRow.hover(); await page.waitForTimeout(400);
    await shot(page, run, "11-row-hover");
    await page.mouse.move(2, 2);
    await firstRow.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(300);
    await shot(page, run, "12-row-focus");
    await page.keyboard.press("Enter"); await page.waitForTimeout(120);
    await shot(page, run, "13-expand-loading");
    await page.waitForTimeout(1200);
    await shot(page, run, "14-expanded-palettes");
    await page.getByRole("button", { name: /^Delete all palettes of / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "15-row-confirm-delete-palettes");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await page.getByRole("button", { name: /^Delete palette / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "16-row-confirm-delete-palette");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await shot(page, run, "17-populated-full", true);
  });
  // G: one navigation, every remaining register by swapping the mocked roster
  // response and pressing the panel's own Refresh / Retry (same code paths).
  await block("G-chain", async (ctx) => {
    let mode = { kind: "users" };
    const page = await ctx.newPage();
    page.on("console", (m) => { if (["error", "warning"].includes(m.type())) run.console.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
    await page.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "dev"); } catch {} });
    await page.route(/localhost:3000\/admin\/users\?/, async (route) => {
      const k = mode.kind;
      if (k === "abort") return route.abort("connectionrefused");
      if (k === "slow") await new Promise((r) => setTimeout(r, 6000));
      if (k === "denied") return route.fulfill({ status: 403, contentType: "application/problem+json", body: JSON.stringify({ type: "urn:contract:admin-forbidden", title: "Forbidden", status: 403 }) });
      const users = k === "empty" ? [] : MOCK_USERS;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: users, total: users.length }) });
    });
    await page.route(/localhost:3000\/admin\/users\/[^/?]+\/palettes$/, async (route) => {
      if (route.request().method() !== "GET") return route.abort();
      await new Promise((r) => setTimeout(r, 300));
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(MOCK_PALETTES) });
    });
    await page.goto(`${BASE}/#/admin/users`, { waitUntil: "commit", timeout: 300000 });
    await page.waitForSelector("[data-admin-notice='users']", { timeout: 300000 });
    await page.waitForTimeout(2500);
    await shot(page, run, "10-populated");
    const firstRow = page.locator("[role=button][aria-expanded]").first();
    await firstRow.hover(); await page.waitForTimeout(400);
    await shot(page, run, "11-row-hover");
    await page.mouse.move(2, 2);
    await firstRow.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(300);
    await shot(page, run, "12-row-focus");
    await page.keyboard.press("Enter"); await page.waitForTimeout(120);
    await shot(page, run, "13-expand-loading");
    await page.waitForTimeout(1200);
    await shot(page, run, "14-expanded-palettes");
    await page.getByRole("button", { name: /^Delete all palettes of / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "15-row-confirm-delete-palettes");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await page.getByRole("button", { name: /^Delete palette / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "16-row-confirm-delete-palette");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await shot(page, run, "17-populated-full", true);
    await page.getByRole("button", { name: "Sort users" }).click(); await page.waitForTimeout(700);
    await shot(page, run, "02b-sort-menu-open-populated");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    const refresh = () => page.getByRole("button", { name: /^Refresh$|Refresh/ }).first().click();
    mode.kind = "slow"; await refresh(); await page.waitForTimeout(700);
    await shot(page, run, "18-loading-skeleton");
    await page.waitForTimeout(6500);
    mode.kind = "empty"; await refresh(); await page.waitForTimeout(1500);
    await shot(page, run, "07-empty-roster");
    mode.kind = "abort"; await refresh(); await page.waitForTimeout(1500);
    await shot(page, run, "09-load-error");
    // Retry inside the transport's 30 s unavailable-latch cooldown: does it act?
    let reqs = 0; page.on("request", (rq) => { if (/localhost:3000\/admin\/users\?/.test(rq.url())) reqs++; });
    mode.kind = "users"; await page.getByRole("button", { name: "Retry" }).click(); await page.waitForTimeout(1500);
    await shot(page, run, "09b-retry-within-cooldown");
    run.retryRequests = reqs;
  });
  // H: the whole state set in ONE navigation (the shared dev server is
  // saturated — load avg >150 — so navigations are the scarce resource).
  await block("H-single", async (ctx) => {
    let mode = { kind: "users" };
    const page = await ctx.newPage(); page.setDefaultTimeout(180000);
    page.on("console", (m) => { if (["error", "warning"].includes(m.type())) run.console.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
    await page.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "dev"); } catch {} });
    let reqs = 0;
    await page.route(/localhost:3000\/admin\/users\?/, async (route) => {
      reqs++;
      const k = mode.kind;
      if (k === "abort") return route.abort("connectionrefused");
      if (k === "slow") await new Promise((r) => setTimeout(r, 6000));
      if (k === "denied") return route.fulfill({ status: 403, contentType: "application/problem+json", body: JSON.stringify({ type: "urn:contract:admin-forbidden", title: "Forbidden", status: 403 }) });
      const users = k === "empty" ? [] : MOCK_USERS;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: users, total: users.length }) });
    });
    await page.route(/localhost:3000\/admin\/users\/[^/?]+\/palettes$/, async (route) => {
      if (route.request().method() !== "GET") return route.abort();
      await new Promise((r) => setTimeout(r, 300));
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(MOCK_PALETTES) });
    });
    await page.goto(`${BASE}/#/admin/users`, { waitUntil: "commit", timeout: 900000 });
    await page.waitForSelector("[data-admin-notice='users']", { timeout: 900000 });
    await page.waitForTimeout(2500);
    await shot(page, run, "10-populated");
    await shot(page, run, "10b-populated-full", true);
    const firstRow = page.locator("[role=button][aria-expanded]").first();
    await firstRow.hover(); await page.waitForTimeout(400);
    await shot(page, run, "11-row-hover");
    await page.mouse.move(2, 2);
    await firstRow.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(300);
    await shot(page, run, "12-row-focus");
    await page.keyboard.press("Enter"); await page.waitForTimeout(120);
    await shot(page, run, "13-expand-loading");
    await page.waitForTimeout(1200);
    await shot(page, run, "14-expanded-palettes");
    await page.getByRole("button", { name: /^Delete all palettes of / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "15-row-confirm-delete-palettes");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await page.getByRole("button", { name: /^Delete palette / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "16-row-confirm-delete-palette");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await shot(page, run, "17-populated-full", true);
    await firstRow.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(500); // collapse (keyboard: a center click lands on the row action seat at 390)
    await page.getByRole("button", { name: "Sort users" }).click(); await page.waitForTimeout(700);
    await shot(page, run, "02-sort-menu-open");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    await page.getByRole("button", { name: /Prune empty/ }).click(); await page.waitForTimeout(900);
    await shot(page, run, "03-prune-confirm"); await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await page.getByRole("button", { name: /^Delete user / }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "04-row-confirm-delete-user"); await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    const search = page.locator("input[aria-label='Search users']").first();
    await search.fill("zzzz-no-such-user"); await page.waitForTimeout(700);
    await shot(page, run, "01-empty-filtered");
    await search.fill(""); await page.waitForTimeout(500);
    const refresh = () => page.getByRole("button", { name: /Refresh/ }).first().click();
    mode.kind = "slow"; await refresh(); await page.waitForTimeout(700);
    await shot(page, run, "18-loading-skeleton");
    await page.waitForTimeout(6500);
    mode.kind = "empty"; await refresh(); await page.waitForTimeout(1500);
    await shot(page, run, "07-empty-roster");
    mode.kind = "abort"; await refresh(); await page.waitForTimeout(1500);
    await shot(page, run, "09-load-error");
    const before = reqs; mode.kind = "users";
    await page.getByRole("button", { name: "Retry" }).click(); await page.waitForTimeout(1500);
    await shot(page, run, "09b-retry-within-cooldown");
    run.retryWithinCooldownRequests = reqs - before;
    await page.waitForTimeout(31000);
    mode.kind = "denied";
    await page.getByRole("button", { name: "Retry" }).click(); await page.waitForTimeout(2000);
    await shot(page, run, "08-token-refused-403");
    run.retryAfterCooldownRequests = reqs - before;
  });
  await block("F-loading", async (ctx) => {
    const page = await ctx.newPage(); await mockRoster(page, { delay: 60000 });
    await page.goto(`${BASE}/#/admin/users`, { waitUntil: "commit", timeout: 180000 });
    await page.waitForSelector("[data-slot=admin-list-skeleton]", { timeout: 180000 });
    await page.waitForTimeout(900);
    await shot(page, run, "18-initial-loading");
  });
  fs.writeFileSync(path.join(OUT, `meta-${key}.json`), JSON.stringify({ base: BASE, sha, dirty, at: meta.at, run }, null, 1));
}
await browser?.close();
console.log(JSON.stringify({ sha, dirty, runs: Object.fromEntries(Object.entries(meta.runs).map(([k, r]) => [k, { frames: Object.keys(r.frames).length, errors: r.errors, console: r.console.length }])) }, null, 1));
