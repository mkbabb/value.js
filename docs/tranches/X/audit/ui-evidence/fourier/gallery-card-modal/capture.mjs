// UIA-F gallery-card-modal — headed Chromium, real GPU. READ-ONLY on app trees: GET navigation + page.route stubs
// (/api/visualizations list + /{slug} view read, /api/images/**, /api/admin/verify|stats|…/tier). No DB writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, appendFileSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
const tree = () => `fourier ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")} · glass ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}`;
const IMG = readFileSync("/Users/mkbabb/Programming/fourier-analysis/assets/animals/giraffe.webp");
const ENTRY = { slug: "amber-fox-spiral-one", owner_slug: "amber-fox-12", visibility: "public", content_hash: "c0ffee00",
  image_slug: "img-amber-fox-spiral-one", contour_hash: "deadbeef", active_bases: ["fourier-epicycles"], n_harmonics: 64,
  set_hash: "5e7ha5h0", fork_of: null, fork_of_hash: null, fork_count: 0, version_count: 1, title: "Amber fox spiral",
  description: null, tags: [], palette_slug: null, views: 12, likes: 3, tier: "normal", pinned: false,
  created_at: "2026-09-01T10:00:00Z", updated_at: "2026-09-01T10:00:00Z", deleted_at: null };
// NOTE: any tier:"featured" entry crashes GalleryView (CarouselPager outside <Carousel>) — frame 0-featured-crash; the modal fixture avoids it.
const V = [["saved", ["fourier-epicycles", "chebyshev"]], ["saved", ["legendre", "chebyshev", "fourier-epicycles"]], ["normal", ["fourier-epicycles"]], ["normal", []]];
let ITEMS = V.map(([tier, bases], i) => ({ ...ENTRY, slug: `${ENTRY.slug}-${i}`, image_slug: `${ENTRY.image_slug}-${i}`, title: `${ENTRY.title} ${i}`,
  tier, active_bases: bases, views: 12 + i * 37, likes: 3 + i * 4, created_at: `2026-09-0${1 + i}T10:00:00Z` }));
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 20), color: cs.color, shadow: cs.boxShadow.slice(0, 100), cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 160) }; };
    const d = document.querySelector("[role=dialog]"); const q = (s) => d?.querySelector(s); const qa = (s) => d ? [...d.querySelectorAll(s)] : [];
    return { theme: document.documentElement.className, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      dialog: box(d), dialogScrollH: d?.scrollHeight, overlay: box(document.querySelector("[data-slot=dialog-overlay], .fixed.inset-0[data-state]")),
      imgFrame: box(q(".aspect-\\[16\\/10\\]")), img: box(q("img")), tierBadge: box(q(".modal-tier-badge")),
      close: box([...(d?.querySelectorAll("button") ?? [])].find((b) => /close/i.test(b.getAttribute("aria-label") || b.textContent))),
      like: q(".like-btn") ? { ...box(q(".like-btn")), pressed: q(".like-btn").getAttribute("aria-pressed"), text: q(".like-btn").textContent.trim().replace(/\s+/g, " ") } : null,
      plates: qa(".bg-muted\\/30").map(box), badges: qa(".basis-tint").map(box).slice(0, 3),
      tierBtns: qa(".tier-btn").map((b) => ({ ...box(b), pressed: b.getAttribute("aria-pressed") })), callout: box(q(".callout-btn")),
      slug: box(q(".font-mono.truncate")), time: q("time")?.textContent,
      toasts: [...document.querySelectorAll("li, [role=status]")].filter((e) => /Tier|Admin|Liked|Error/i.test(e.textContent) && e.getBoundingClientRect().width > 0).map((e) => e.textContent.trim().slice(0, 80)),
      active: document.activeElement?.outerHTML.slice(0, 140) };
  });
}
async function shot(page, name, extra, wait = 700) {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
async function newPage(vp, theme, admin, withFeatured = false) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  const tag = `${vp}-${theme}-${admin ? "admin" : "viewer"}`;
  page.on("pageerror", (e) => errors.push(`${tag} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${tag} console.${m.type()} ${m.text().slice(0, 200)}`); });
  const items = ITEMS.map((x) => ({ ...x })); if (withFeatured) items[0].tier = "featured";
  await page.route("**/api/visualizations**", async (route) => {
    const u = new URL(route.request().url());
    if (u.pathname === "/api/visualizations") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items, next_cursor: null, has_more: false }) });
    const slug = u.pathname.split("/")[3]; const it = items.find((x) => x.slug === slug);
    if (it && route.request().method() === "GET") return route.fulfill({ status: 200, contentType: "application/json", headers: { etag: '"e1"' }, body: JSON.stringify({ ...it, views: it.views + 1 }) });
    return route.continue();
  });
  await page.route("**/api/images/**", (r) => r.fulfill({ status: 200, contentType: "image/webp", body: IMG }));
  await page.route("**/api/admin/**", async (route) => {
    const u = new URL(route.request().url());
    if (u.pathname.endsWith("/verify")) return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    if (u.pathname.endsWith("/stats")) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ total_entries: 4, featured: 1, saved: 1, normal: 2, total_views: 100, total_likes: 20, storage_bytes: 123456 }) });
    if (u.pathname.endsWith("/tier")) { const slug = u.pathname.split("/")[4]; const body = JSON.parse(route.request().postData() || "{}"); const it = items.find((x) => x.slug === slug); if (it) it.tier = body.tier;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(it) }); }
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items: [], next_cursor: null, has_more: false }) });
  });
  return { ctx, page };
}
async function openCard(page, i) {
  const c = page.getByRole("button", { name: `Open img-amber-fox-spiral-one-${i}`, exact: true }).first();
  await c.scrollIntoViewIfNeeded(); await c.click();
  await page.locator("[role=dialog]").waitFor({ timeout: 8000 });
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${vp}-${theme}-`;
  appendFileSync(OUT + "tree-state.txt", `${p} ${tree()} ${new Date().toISOString()}\n`);
  if (vp === "d" && theme === "light") { const { ctx, page } = await newPage(vp, theme, false, true);
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await shot(page, p + "0-featured-fixture-crash", { cards: await page.locator(".gallery-card").count() }, 2500); await ctx.close(); }
  // viewer
  { const { ctx, page } = await newPage(vp, theme, false);
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await openCard(page, 2);
    await shot(page, p + "1-viewer-open", null, 1000);
    if (vp === "d") { await page.locator("[role=dialog] .like-btn").hover(); await shot(page, p + "1b-like-hover", null, 400);
      await page.locator("[role=dialog] .callout-btn").hover(); await shot(page, p + "1c-cta-hover", null, 400); await page.mouse.move(2, 2); }
    await page.keyboard.press("Tab"); await shot(page, p + "1d-first-tab-focus", null, 400);
    await page.locator("[role=dialog] .like-btn").click(); await shot(page, p + "2-liked", null, 600);
    await page.locator("[role=dialog] .like-btn").click(); await shot(page, p + "2b-liked-twice", null, 600);
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    await openCard(page, 1); await shot(page, p + "3-viewer-saved-3bases", null, 900);
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    await openCard(page, 3); await shot(page, p + "4-viewer-empty-bases", null, 900);
    await ctx.close(); }
  // admin
  { const { ctx, page } = await newPage(vp, theme, true);
    await page.goto(BASE + "/gallery?admin=audit-tok", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await openCard(page, 2);
    await shot(page, p + "5-admin-open", null, 1000);
    if (vp === "d") { await page.locator("[role=dialog] .tier-btn").first().hover(); await shot(page, p + "5b-admin-tier-hover", null, 400); }
    await page.locator("[role=dialog] .tier-btn").first().click(); await shot(page, p + "6-admin-set-featured", null, 1200);
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    await shot(page, p + "6b-after-close-grid", null, 400);
    await ctx.close(); }
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length);
