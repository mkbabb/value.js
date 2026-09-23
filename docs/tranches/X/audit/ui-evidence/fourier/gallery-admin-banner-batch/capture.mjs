// UIA-F gallery-admin-banner-batch — headed Chromium, real GPU. READ-ONLY: GET navigation; /api/visualizations + /api/images
// stubbed (fixture ENTRY shape from web/e2e/fixtures/gallery.ts); every NON-GET /api/admin/** and /api/** mutation ABORTED
// (the confirm dialog is opened and cancelled, never confirmed). Stats: live (Bearer dev) or stubbed slow/error.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const ENTRY = { slug: "amber-fox-spiral-one", owner_slug: "amber-fox-12", visibility: "public", content_hash: "c0ffee00",
  image_slug: "img-amber-fox-spiral-one", contour_hash: "deadbeef", active_bases: ["fourier-epicycles"], n_harmonics: 64,
  set_hash: "5e7ha5h0", fork_of: null, fork_of_hash: null, fork_count: 0, version_count: 1, title: "Amber fox spiral",
  description: null, tags: [], palette_slug: null, views: 12, likes: 3, tier: "normal", pinned: false,
  created_at: "2026-09-01T10:00:00Z", updated_at: "2026-09-01T10:00:00Z", deleted_at: null };
const V = [["featured", ["fourier-epicycles", "chebyshev"]], ["featured", ["legendre"]], ["featured", ["fourier-epicycles"]],
  ["saved", ["chebyshev"]], ["normal", ["fourier-epicycles"]], ["normal", ["legendre", "chebyshev", "fourier-epicycles"]],
  ["normal", ["fourier-epicycles"]], ["saved", ["legendre"]], ["normal", ["chebyshev"]], ["normal", ["fourier-epicycles"]]];
const ITEMS = V.map(([tier, bases], i) => ({ ...ENTRY, slug: `${ENTRY.slug}-${i}`, image_slug: `${ENTRY.image_slug}-${i}`, title: `${ENTRY.title} ${i}`,
  tier, active_bases: bases, views: 12 + i * 37, likes: 3 + i * 4, created_at: `2026-09-${String(1 + i).padStart(2, "0")}T10:00:00Z` }));
const PIXEL_PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
// SET=nf: the featured tier is re-labelled normal so the grid mounts — with ANY featured entry the gallery crashes
// (GalleryFeaturedCarousel.vue:72 CarouselPager outside <Carousel>: "useCarousel must be used within a <Carousel />").
const SET = process.env.SET || "full"; const PFX = SET === "nf" ? "nf-" : "";
if (SET === "nf") for (const it of ITEMS) if (it.tier === "featured") it.tier = "normal";
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = []; const blocked = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 120), font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 20), color: cs.color, pos: cs.position, bf: cs.backdropFilter }; };
    const bar = q("[aria-label='Batch gallery actions']");
    return {
      theme: document.documentElement.className, url: location.pathname + location.search,
      tabsText: q("[role=tablist]")?.textContent.trim(),
      banner: box(q(".admin-banner")), bannerTitle: box(q(".admin-banner .cm-serif")), logout: box(q("[aria-label='Log out of admin mode']")),
      cells: [...document.querySelectorAll(".admin-banner .metric")].map((m) => ({ ...box(m), text: m.textContent.trim().replace(/\s+/g, " "), busy: m.getAttribute("aria-busy") })),
      bannerAlert: q(".admin-banner [role=alert]") ? { ...box(q(".admin-banner [role=alert]")), text: q(".admin-banner [role=alert]").textContent.trim().replace(/\s+/g, " ") } : null,
      status: q(".admin-banner [role=status]")?.textContent.trim(),
      badge: box(q(".admin-badge")), dock: box(q("header .glass-dock, header [class*=dock]")),
      checkWraps: [...document.querySelectorAll(".gallery-card .absolute.top-1\\.5.left-1\\.5")].slice(0, 2).map(box),
      checkboxes: [...document.querySelectorAll("[aria-label^='Select entry']")].slice(0, 2).map(box),
      overlayBtns: [...document.querySelectorAll(".admin-overlay-btn")].slice(0, 3).map(box),
      selectedCards: [...document.querySelectorAll(".gallery-card[data-selected]")].map((c) => ({ tier: c.dataset.tier, ...box(c) })),
      bar: bar ? { ...box(bar), text: bar.textContent.trim().replace(/\s+/g, " "), btns: [...bar.querySelectorAll("button")].map((b) => ({ t: b.textContent.trim() || b.getAttribute("aria-label"), ...box(b) })) } : null,
      dialog: box(q("[role=dialog]")), dialogText: q("[role=dialog]")?.textContent.trim().replace(/\s+/g, " "),
      dialogBtns: [...document.querySelectorAll("[role=dialog] button")].map((b) => ({ t: b.textContent.trim() || b.getAttribute("aria-label"), ...box(b) })),
      overlay: box(q("[data-state=open].fixed.inset-0, .modal-overlay, [class*=overlay][data-state=open]")),
      bodyBg: getComputedStyle(document.body).backgroundColor, scrollW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight,
      activeEl: document.activeElement?.outerHTML.slice(0, 140),
    };
  });
}
async function shot(page, name, extra, opt = {}) {
  await page.waitForTimeout(opt.wait ?? 900);
  if (opt.clip) await page.screenshot({ path: OUT + name + ".png", clip: opt.clip });
  else await page.screenshot({ path: OUT + name + ".png", fullPage: !!opt.full });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
async function newPage(vp, theme, stats) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme}-${stats} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${vp}-${theme}-${stats} console.${m.type()} ${m.text().slice(0, 200)}`); });
  // READ-ONLY guard: abort every mutating request to the API.
  await page.route("**/api/**", (route) => {
    const r = route.request();
    if (r.method() !== "GET" && r.method() !== "HEAD" && r.method() !== "OPTIONS") { blocked.push(r.method() + " " + r.url()); return route.abort(); }
    return route.fallback();
  });
  await page.route("**/api/visualizations**", (route) => {
    const u = new URL(route.request().url());
    if (u.pathname !== "/api/visualizations" || route.request().method() !== "GET") return route.fallback();
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items: ITEMS, next_cursor: null, has_more: false }) });
  });
  await page.route("**/api/images/**", (r) => r.request().method() === "GET" ? r.fulfill({ status: 200, contentType: "image/png", body: PIXEL_PNG }) : r.fallback());
  if (stats === "slow") await page.route("**/api/admin/stats", async (r) => { await new Promise((res) => setTimeout(res, 15000)); r.fallback().catch(() => {}); });
  if (stats === "error") await page.route("**/api/admin/stats", (r) => r.fulfill({ status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503, detail: "stats aggregation timed out" }) }));
  return { ctx, page };
}
const headerClip = (vp) => ({ x: 0, y: 0, width: VPS[vp].width, height: 90 });

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${PFX}${vp}-${theme}-`;
  { const { ctx, page } = await newPage(vp, theme, "live");
    await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "networkidle" });
    await shot(page, p + "1-banner-stats", { urlAfter: page.url() }, { wait: 1500 });
    await shot(page, p + "1b-dock-admin-badge", null, { clip: headerClip(vp) });
    if (vp === "d") {
      await page.locator("[aria-label='Log out of admin mode']").hover(); await shot(page, p + "1c-logout-hover", null, { wait: 400 });
      await page.locator("[aria-label='Log out of admin mode']").focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
      await shot(page, p + "1d-logout-focus", null, { wait: 400 });
      await page.mouse.move(5, 5);
    }
    // select three: one featured (carousel), one saved, one normal (grid)
    const boxes = page.locator("[aria-label^='Select entry']");
    const n = await boxes.count();
    const pick = ["img-amber-fox-spiral-one-3", "img-amber-fox-spiral-one-4", "img-amber-fox-spiral-one-7"];
    for (const s of pick) { const b = page.locator(`[aria-label='Select entry ${s}']`).first(); if (await b.count()) { await b.scrollIntoViewIfNeeded(); await b.click(); await page.waitForTimeout(250); } }
    await shot(page, p + "2-batch-bar-3-selected", { checkboxCount: n });
    await page.evaluate(() => { const s = document.querySelector(".admin-banner")?.closest(".overflow-y-auto"); if (s) s.scrollTop = 0; });
    await shot(page, p + "2b-batch-selected-top", null, { wait: 500 });
    await shot(page, p + "2c-batch-full", null, { full: true, wait: 300 });
    // confirm-delete dialog (open, capture, CANCEL)
    const del = page.locator("[aria-label='Batch gallery actions'] button", { hasText: "Delete" });
    if (await del.count()) { await del.click(); await shot(page, p + "3-confirm-delete-dialog", null, { wait: 700 });
      if (vp === "d") { await page.keyboard.press("Tab"); await shot(page, p + "3b-dialog-tab-focus", null, { wait: 300 }); }
      await page.keyboard.press("Escape"); await page.waitForTimeout(500);
      await shot(page, p + "3c-after-dialog-escape", null, { wait: 300 }); }
    // clear selection
    const clr = page.locator("[aria-label='Clear selection']"); if (await clr.count()) { await clr.click(); }
    await shot(page, p + "3d-after-clear", null, { wait: 400 });
    // log out
    await page.evaluate(() => { const s = document.querySelector(".admin-banner")?.closest(".overflow-y-auto"); if (s) s.scrollTop = 0; });
    const lo = page.locator("[aria-label='Log out of admin mode']"); if (await lo.count()) await lo.click();
    await shot(page, p + "4-after-logout", null, { wait: 700 });
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "slow");
    await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    await shot(page, p + "5-stats-loading");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "error");
    await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "networkidle" });
    await shot(page, p + "6-stats-error", null, { wait: 1200 });
    await ctx.close(); }
}
writeFileSync(OUT + PFX + "metrics.json", JSON.stringify({ metrics, errors, blocked }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length, "blocked", blocked.length);
