// X audit seat · browse-search-filter — READ-ONLY capture (API fully stubbed; no writes to any backend).
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

function oklab(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const [r, g, b] = c;
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return { L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s };
}
const remote = [
  { name: "Harbour Dusk", slug: "harbour-dusk", userSlug: ME, tags: ["ocean", "dusk", "cool"], versionCount: 3, voteCount: 12, visibility: "public", tier: "standard", colors: ["#0f172a", "#1e3a5f", "#3b6e8f", "#9cc3d5", "#f2d0a9"] },
  { name: "Gallery Marigold Sunburst", slug: "gallery-marigold", userSlug: "gallery", tags: ["warm", "autumn", "retro"], versionCount: 1, voteCount: 320, visibility: "public", tier: "featured", colors: ["#7c2d12", "#c2410c", "#f59e0b", "#fde68a", "#fef3c7", "#365314"] },
  { name: "Quiet Moss", slug: "quiet-moss", userSlug: "someone", tags: ["green", "earth"], versionCount: 2, voteCount: 3, visibility: "public", tier: "standard", colors: ["#1a2e05", "#3f6212", "#84cc16", "#ecfccb"] },
  { name: "Neon Arcade", slug: "neon-arcade", userSlug: "someone", tags: ["retro", "bold"], versionCount: 1, voteCount: 44, visibility: "public", tier: "featured", colors: ["#ff00aa", "#7c3aed", "#22d3ee", "#facc15"] },
].map((p) => ({ ...p, oklabColors: p.colors.map(oklab), colors: p.colors.map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: false, published: true, voted: false }));
const TAGS = ["autumn", "bold", "cool", "dusk", "earth", "green", "ocean", "retro", "warm", "pastel", "neutral", "vintage"].map((name, i) => ({ id: `t${i}`, name, category: "mood" }));

const isApi = (url) => {
  const p = url.pathname;
  if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false;
  if (/\.\w+$/.test(p)) return false;
  return /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(p);
};
const requests = [];
async function stub(page) {
  await page.route(isApi, (route) => {
    const u = new URL(route.request().url());
    const m = route.request().method();
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (u.pathname === "/palettes") requests.push(u.search);
    if (m !== "GET" && !u.pathname.startsWith("/sessions")) return j({ error: "audit stub: read-only" }, 503);
    if (u.pathname === "/sessions" || u.pathname === "/sessions/login") return j({ token: "audit-token", userSlug: ME });
    if (u.pathname === "/sessions/me") return j({ userSlug: ME, slug: ME });
    if (u.pathname === "/colors/tags") return j(TAGS);
    if (u.pathname === "/palettes") {
      const q = (u.searchParams.get("q") ?? "").toLowerCase();
      const tier = u.searchParams.get("tier");
      const tags = (u.searchParams.get("tags") ?? "").split(",").filter(Boolean);
      const data = remote.filter((p) => (!q || p.name.toLowerCase().includes(q) || p.slug.includes(q)) && (!tier || p.tier === tier) && tags.every((t) => p.tags.includes(t)));
      return j({ data, nextCursor: null, hasMore: false });
    }
    if (u.pathname === "/palettes/mine") return j({ data: remote.filter((p) => p.userSlug === ME), nextCursor: null, hasMore: false });
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
  await page.addInitScript(() => {
    try {
      localStorage.setItem("palette-user-slug", "test-user");
      localStorage.setItem("palette-user-token", "audit-token");
      sessionStorage.setItem("palette-session-token", "audit-token");
      localStorage.removeItem("palette-admin-token");
    } catch {}
  });
}

const manifest = { seat: "browse-search-filter", base: BASE, head: sha, dirty, captured: new Date().toISOString(), frames: [] };

async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`, bg: s.backgroundColor, color: s.color, border: s.border, shadow: s.boxShadow.slice(0, 80), pad: s.padding, cls: el.className?.toString().slice(0, 200) }; };
    const q = (sel) => document.querySelector(sel);
    const pops = [...document.querySelectorAll('[data-slot="popover-content"],[role="dialog"]')].filter((e) => e.offsetParent || e.getClientRects().length);
    const searchInput = q('input[placeholder="Search palettes..."]');
    return {
      searchInput: cs(searchInput),
      searchShell: cs(searchInput?.closest(".search-seated") ?? searchInput?.parentElement),
      filtersTrigger: cs(q('button[aria-label="Filters"]')),
      badge: cs(q('button[aria-label="Filters"] span')),
      popovers: pops.map((p) => ({ box: cs(p), text: p.innerText.slice(0, 200).replace(/\s+/g, " ") })),
      filterOption: cs(q(".filter-option")),
      radio: cs(q('[role="radio"]')),
      checkbox: cs(q('[role="checkbox"]')),
      checkedBoxes: [...document.querySelectorAll('[role="checkbox"]')].filter((e) => e.getAttribute("aria-checked") === "true" || e.dataset.state === "checked").length,
      swatch: cs(q('button[aria-label^="Open color picker"]')),
      colorInput: cs(q('input[aria-label="Search by CSS color"]')),
      inlineSearchBtn: cs(q('input[aria-label="Search by CSS color"]')?.parentElement?.querySelector("button")),
      clearAll: cs([...document.querySelectorAll("button")].find((b) => /Clear all filters/.test(b.textContent))),
      svCanvas: cs(q(".sv-canvas")),
      hueStrip: cs(q(".sv-canvas")?.nextElementSibling),
      cards: [...document.querySelectorAll('[role="article"][aria-label^="Palette:"]')].map((c) => c.getAttribute("aria-label")),
      empty: document.body.innerText.match(/No palettes[^\n]*/)?.[0] ?? null,
      section: [...document.querySelectorAll(".section-label")].slice(0, 1).map(cs),
      paneHeader: cs(q("h1,h2")),
    };
  });
}

async function shot(page, name, extra = {}) {
  const file = `${name}.png`;
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + file });
  const m = await metrics(page);
  manifest.frames.push({ file, head: sha, dirty, ...extra, metrics: m });
  console.log("captured", file, "pops", m.popovers.length, "cards", m.cards.length, m.empty ?? "");
}
async function openFilters(page) {
  await page.locator('button[aria-label="Filters"]').click();
  await page.locator("text=Find by Color").first().waitFor({ state: "visible", timeout: 8000 });
}
async function esc(page, n = 1) { for (let i = 0; i < n; i++) { await page.keyboard.press("Escape"); await page.waitForTimeout(350); } }

const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
for (const vp of VPS) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await stub(page);
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
  page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") errs.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
  const sfx = `${vp.tag}-${theme}`;
  requests.length = 0;
  try {
    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.locator('[role="article"][aria-label="Palette: Harbour Dusk"]').first().waitFor({ timeout: 60000 });
    await page.waitForTimeout(2500);
    await shot(page, `idle-${sfx}`, { state: "filters idle", vp: vp.tag, theme });
    // focus ring on the filters trigger via keyboard
    await page.locator('input[placeholder="Search palettes..."]').focus();
    await page.keyboard.press("Tab");
    await shot(page, `focus-trigger-${sfx}`, { state: "keyboard focus on Filters trigger", vp: vp.tag, theme, focused: await page.evaluate(() => document.activeElement?.getAttribute("aria-label")) });
    await openFilters(page);
    await shot(page, `filters-open-${sfx}`, { state: "filters popover open (no active filters)", vp: vp.tag, theme });
    // hover an option
    await page.locator(".filter-option").nth(1).hover();
    await shot(page, `filters-hover-${sfx}`, { state: "filters popover · option hover", vp: vp.tag, theme });
    // open mini color picker
    await page.locator('button[aria-label^="Open color picker"]').click();
    await page.locator(".sv-canvas").waitFor({ state: "visible", timeout: 8000 });
    await shot(page, `mini-picker-open-${sfx}`, { state: "Find by Color popover open", vp: vp.tag, theme });
    // drag inside SV canvas
    const bb = await page.locator(".sv-canvas").boundingBox();
    await page.mouse.move(bb.x + bb.width * 0.2, bb.y + bb.height * 0.3); await page.mouse.down();
    await page.mouse.move(bb.x + bb.width * 0.85, bb.y + bb.height * 0.15, { steps: 6 }); await page.mouse.up();
    await shot(page, `mini-picker-dragged-${sfx}`, { state: "Find by Color popover · after SV drag", vp: vp.tag, theme });
    // Press Search in mini picker
    await page.locator(".sv-canvas").locator("xpath=..").getByRole("button", { name: "Search" }).click();
    await page.waitForTimeout(900);
    await shot(page, `color-search-applied-${sfx}`, { state: "after mini-picker Search (color filter active)", vp: vp.tag, theme, openPopoversAfter: await page.locator('[data-slot="popover-content"]').count() });
    await esc(page, 2);
    // active filters: tier featured + a tag
    await openFilters(page);
    await page.locator(".filter-option", { hasText: "Featured" }).click();
    await page.waitForTimeout(600);
    await page.locator(".filter-option", { hasText: "retro" }).click();
    await page.waitForTimeout(900);
    await shot(page, `active-filters-popover-${sfx}`, { state: "active filters (Featured + retro + color) · popover open", vp: vp.tag, theme });
    await esc(page, 1);
    await page.waitForTimeout(500);
    await shot(page, `active-filters-closed-${sfx}`, { state: "active filters · popover closed (badge only, no chips)", vp: vp.tag, theme });
    // clear all
    await openFilters(page);
    const clear = page.getByRole("button", { name: /Clear all filters/ });
    if (await clear.count()) { await clear.click(); await page.waitForTimeout(900); }
    await shot(page, `after-clear-all-${sfx}`, { state: "after Clear all filters (popover state)", vp: vp.tag, theme });
    await esc(page, 1);
    // no-results via search query
    await page.locator('input[placeholder="Search palettes..."]').fill("zzqx");
    await page.waitForTimeout(1500);
    await shot(page, `no-results-query-${sfx}`, { state: "no-results (query 'zzqx')", vp: vp.tag, theme });
    await page.locator('input[placeholder="Search palettes..."]').fill("");
    await page.waitForTimeout(1200);
    // no-results via color search with a far color typed
    await openFilters(page);
    await page.locator('input[aria-label="Search by CSS color"]').fill("#00ff00");
    await page.locator('input[aria-label="Search by CSS color"]').press("Enter");
    await page.waitForTimeout(900);
    await shot(page, `no-results-color-popover-${sfx}`, { state: "no-results via color text #00ff00 · popover open", vp: vp.tag, theme });
    await esc(page, 1);
    await shot(page, `no-results-color-${sfx}`, { state: "no-results via color search · popover closed", vp: vp.tag, theme });
    // invalid color text
    await openFilters(page);
    await page.locator('input[aria-label="Search by CSS color"]').fill("hsl(120 50% 50%)");
    await page.locator('input[aria-label="Search by CSS color"]').press("Enter");
    await page.waitForTimeout(900);
    await shot(page, `color-text-hsl-${sfx}`, { state: "color text 'hsl(120 50% 50%)' + Enter (placeholder promises hsl)", vp: vp.tag, theme });
  } catch (e) {
    console.error("FAIL", sfx, String(e).slice(0, 300));
    await page.screenshot({ path: OUT + `FAIL-${sfx}.png` }).catch(() => {});
    manifest.frames.push({ file: `FAIL-${sfx}.png`, error: String(e).slice(0, 400), vp: vp.tag, theme });
  }
  manifest.frames.push({ ctx: sfx, errors: errs.slice(0, 20), requests: [...requests] });
  await ctx.close();
}
await browser.close();
writeFileSync(OUT + "manifest.json", JSON.stringify(manifest, null, 1));
console.log("done", sha, dirty);
