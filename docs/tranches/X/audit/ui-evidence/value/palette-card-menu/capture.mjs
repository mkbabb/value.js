// X audit seat · palette-card-menu — READ-ONLY capture (API fully stubbed; no writes to any backend).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const REPO = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${REPO} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${REPO} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const NOW = "2026-09-20T00:00:00.000Z";
const ME = "test-user";

const remote = [
  { name: "Harbour Dusk", slug: "harbour-dusk", userSlug: ME, tags: ["ocean","dusk","muted","coastal","cool","editorial"], versionCount: 3, voteCount: 12, visibility: "public", tier: "standard",
    colors: ["#0f172a","#1e3a5f","#3b6e8f","#9cc3d5","#f2d0a9"] },
  { name: "Gallery Marigold Sunburst", slug: "gallery-marigold", userSlug: "gallery", tags: ["warm","autumn","retro","print","bold"], versionCount: 1, voteCount: 12345, visibility: "public", tier: "featured",
    colors: ["#7c2d12","#c2410c","#f59e0b","#fde68a","#fef3c7","#365314"] },
  { name: "Quiet Moss", slug: "quiet-moss", userSlug: "someone", tags: ["green"], versionCount: 2, voteCount: 3, visibility: "public", tier: "standard",
    colors: ["#1a2e05","#3f6212","#84cc16","#ecfccb"] },
].map((p) => ({ ...p, colors: p.colors.map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: false, published: true, voted: false }));

const localStore = { version: 1, palettes: [
  { id: "7b1c2d3e-0000-4000-8000-000000000001", name: "My Saved Terracotta", slug: "my-saved-terracotta", tags: ["earth","clay","warm","desert"],
    colors: ["#7f1d1d","#b45309","#e7a977","#f5e1c8"].map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: true },
]};

const isApi = (url) => {
  const p = url.pathname;
  if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false;
  if (/\.\w+$/.test(p)) return false;
  return /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(p);
};

async function stub(page, { admin }) {
  await page.route(isApi, (route) => {
    const u = new URL(route.request().url());
    const m = route.request().method();
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (m !== "GET" && !u.pathname.startsWith("/sessions")) return j({ error: "audit stub: read-only" }, 503);
    if (u.pathname === "/sessions" || u.pathname === "/sessions/login") return j({ token: "audit-token", userSlug: ME });
    if (u.pathname === "/sessions/me") return j({ userSlug: ME, slug: ME });
    if (u.pathname === "/palettes") return j({ data: remote, nextCursor: null, hasMore: false });
    if (u.pathname === "/palettes/mine") return j({ data: remote.filter((p) => p.userSlug === ME), nextCursor: null, hasMore: false });
    const one = remote.find((p) => u.pathname === `/palettes/${p.slug}`);
    if (one) return j(one);
    if (u.pathname.startsWith("/admin/tags")) return j([]);
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
  await page.addInitScript(({ admin, store, theme }) => {
    try {
      localStorage.setItem("palette-user-slug", "test-user");
      localStorage.setItem("palette-user-token", "audit-token");
      sessionStorage.setItem("palette-session-token", "audit-token");
      localStorage.setItem("color-palettes", store);
      if (admin) localStorage.setItem("palette-admin-token", "audit-admin-token");
      else localStorage.removeItem("palette-admin-token");
    } catch {}
  }, { admin, store: JSON.stringify(localStore) });
}

const manifest = { seat: "palette-card-menu", base: BASE, head: sha, dirty, captured: new Date().toISOString(), frames: [] };

async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`, bg: s.backgroundColor, color: s.color, pad: s.padding, cls: el.className?.toString().slice(0, 160) }; };
    const menus = [...document.querySelectorAll('[data-slot="menu-content"],[role="menu"]')];
    const pops = [...document.querySelectorAll('[data-slot="popover-content"],[role="dialog"]')].filter((e) => e.querySelector("[data-tag-all]"));
    return {
      menus: menus.map((m) => ({ box: cs(m), items: [...m.querySelectorAll('[role^="menuitem"],[data-slot="menu-label"],.menu__label')].map((i) => ({ text: i.textContent.trim().replace(/\s+/g, " "), ...cs(i), disabled: i.hasAttribute("data-disabled") })) })),
      tagPopover: pops.map((p) => ({ box: cs(p), chips: [...p.querySelectorAll("[data-tag-all]")].slice(0, 2).map(cs) })),
      triggers: [...document.querySelectorAll('button[aria-label="Palette menu"]')].slice(0, 2).map(cs),
      chips: [...document.querySelectorAll("[data-tag-chip]")].filter((e) => e.offsetParent).slice(0, 2).map(cs),
      more: [...document.querySelectorAll("[data-tag-more]")].filter((e) => e.offsetParent).slice(0, 3).map((e) => ({ text: e.textContent.trim(), ...cs(e) })),
      cards: [...document.querySelectorAll('[role="article"][aria-label^="Palette:"]')].map((c) => ({ label: c.getAttribute("aria-label"), ...cs(c) })),
    };
  });
}

async function shot(page, name, extra = {}) {
  const file = `${name}.png`;
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + file });
  const m = await metrics(page);
  manifest.frames.push({ file, head: sha, dirty, ...extra, metrics: m });
  console.log("captured", file, "menus", m.menus.length, "cards", m.cards.length);
}

async function card(page, name) { return page.locator(`[role="article"][aria-label="Palette: ${name}"]`).first(); }

async function openMenu(page, name) {
  const c = await card(page, name);
  await c.scrollIntoViewIfNeeded();
  await c.locator('button[aria-label="Palette menu"]').click();
  await page.locator('[role="menu"]').first().waitFor({ state: "visible", timeout: 8000 });
}
async function closeAll(page) { await page.keyboard.press("Escape"); await page.waitForTimeout(350); await page.keyboard.press("Escape"); await page.waitForTimeout(350); }

const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
const THEMES = ["light", "dark"];
for (const vp of VPS) for (const theme of THEMES) for (const admin of [false, true]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600, isMobile: false });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await stub(page, { admin });
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
  const sfx = `${vp.tag}-${theme}`;
  try {
    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.locator('[role="article"][aria-label="Palette: Harbour Dusk"]').first().waitFor({ timeout: 60000 });
    await page.waitForTimeout(2500);
    if (!admin) {
      await shot(page, `browse-rest-${sfx}`, { state: "browse loaded, rest", vp: vp.tag, theme });
      await openMenu(page, "Harbour Dusk");
      await shot(page, `menu-owned-${sfx}`, { state: "open · owner (remote, owned, public, 3 versions)", vp: vp.tag, theme });
      await closeAll(page);
      await openMenu(page, "Gallery Marigold Sunburst");
      await shot(page, `menu-other-${sfx}`, { state: "open · other-user (remote, featured)", vp: vp.tag, theme });
      // Export sub
      const exp = page.locator('[role="menu"] >> text=Export').first();
      await exp.hover(); await page.waitForTimeout(400);
      if (vp.w < 600) { await exp.click().catch(() => {}); }
      await shot(page, `menu-other-export-sub-${sfx}`, { state: "open · Export submenu", vp: vp.tag, theme });
      await closeAll(page);
      // Tag +N hover and open
      const more = (await card(page, "Harbour Dusk")).locator("[data-tag-more]");
      await more.hover(); await page.waitForTimeout(400);
      await shot(page, `tags-more-hover-${sfx}`, { state: "tag +N hover", vp: vp.tag, theme });
      await more.click(); await page.waitForTimeout(500);
      await shot(page, `tags-popover-open-${sfx}`, { state: "tags popover open (click)", vp: vp.tag, theme });
      await closeAll(page);
      // keyboard focus on trigger
      const trig = (await card(page, "Quiet Moss")).locator('button[aria-label="Palette menu"]');
      await trig.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(300); await page.keyboard.press("ArrowDown");
      await shot(page, `menu-keyboard-${sfx}`, { state: "open via keyboard, item highlighted", vp: vp.tag, theme });
      await closeAll(page);
      // local saved palette (palettes pane)
      await page.goto(`${BASE}/#/palettes`, { waitUntil: "domcontentloaded", timeout: 90000 });
      const lc = page.locator('[role="article"][aria-label="Palette: My Saved Terracotta"]').first();
      await lc.waitFor({ timeout: 60000 }); await page.waitForTimeout(2000);
      await shot(page, `palettes-rest-${sfx}`, { state: "palettes pane loaded", vp: vp.tag, theme });
      await openMenu(page, "My Saved Terracotta");
      await shot(page, `menu-saved-local-${sfx}`, { state: "open · local saved palette", vp: vp.tag, theme });
      await closeAll(page);
    } else {
      await openMenu(page, "Gallery Marigold Sunburst");
      await shot(page, `menu-admin-other-${sfx}`, { state: "open · admin token set · other-user featured (Unfeature)", vp: vp.tag, theme });
      await closeAll(page);
      await openMenu(page, "Quiet Moss");
      await shot(page, `menu-admin-feature-${sfx}`, { state: "open · admin token set · standard (Feature)", vp: vp.tag, theme });
      await closeAll(page);
    }
  } catch (e) {
    console.log("FAIL", sfx, admin, String(e).slice(0, 400));
    await page.screenshot({ path: OUT + `fail-${sfx}-${admin ? "admin" : "user"}.png` }).catch(() => {});
    manifest.frames.push({ file: `fail-${sfx}-${admin ? "admin" : "user"}.png`, error: String(e).slice(0, 400) });
  }
  if (errs.length) manifest.frames.push({ pageErrors: errs, ctx: `${sfx}-${admin}` });
  await ctx.close();
}
await browser.close();
writeFileSync(OUT + "manifest.json", JSON.stringify(manifest, null, 1));
console.log("done", sha, dirty);
