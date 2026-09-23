// UIA-F gallery-public — headed Chromium, real GPU. READ-ONLY: GET navigation + page.route stubs of
// /api/visualizations and /api/images (the web/e2e/fixtures/gallery.ts ENTRY shape, inlined). No writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
// ENTRY verbatim from web/e2e/fixtures/gallery.ts:26-51
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
// a real-looking thumbnail (so the frame is judged with content, not a 1x1 pixel): an SVG rendered to PNG in-page is overkill;
// serve the fixture's 1x1 PIXEL_PNG exactly as stubGallery does.
const PIXEL_PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");

const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 140), font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 24), color: cs.color, tr: cs.transform }; };
    return {
      theme: document.documentElement.className, url: location.pathname + location.search,
      tabs: box(q("[role=tablist]")), tabsText: q("[role=tablist]")?.textContent.trim(),
      searchInput: box(q("#gallery-search-input")), filterToggle: box(q(".filter-toggle")),
      filterPanel: box(q(".filter-panel")), selectTriggers: [...document.querySelectorAll(".filter-panel [role=combobox]")].map(box),
      basisPills: [...document.querySelectorAll(".basis-pill-btn")].slice(0, 2).map(box),
      selectContent: box(q("[role=listbox]")),
      featuredHeading: box(q("#featured-heading")), carousel: box(q("[aria-roledescription=carousel]")),
      pager: box(q(".featured-header > :last-child")), pagerHTML: q(".featured-header > :last-child")?.outerHTML.slice(0, 200),
      cards: document.querySelectorAll(".gallery-card").length, card0: box(q(".gallery-card")), card0tier: q(".gallery-card")?.dataset.tier,
      gridCard: box(q(".grid .gallery-card")), badge0: box(q(".gallery-card .basis-tint")), likeBtn: box(q(".like-btn")),
      loadedText: [...document.querySelectorAll("p")].find((p) => /loaded$/.test(p.textContent.trim()))?.textContent.trim(),
      endText: [...document.querySelectorAll("p")].find((p) => /No more/.test(p.textContent))?.textContent.trim(),
      spinner: !!q(".animate-spin"), skeletons: document.querySelectorAll("[data-slot=skeleton], .skeleton").length,
      emptyText: [...document.querySelectorAll("p")].find((p) => /^No /.test(p.textContent.trim()))?.textContent.trim(),
      emptyCTA: box([...document.querySelectorAll("button")].find((b) => /Visualizer/.test(b.textContent))),
      headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 30)),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      scrollW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight,
      activeEl: document.activeElement?.outerHTML.slice(0, 120),
    };
  });
}
async function shot(page, name, extra, full = false) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + name + ".png", fullPage: full });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
async function newPage(vp, theme, mode) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme}-${mode} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${vp}-${theme}-${mode} console.${m.type()} ${m.text().slice(0, 200)}`); });
  if (mode !== "live") {
    await page.route("**/api/visualizations**", async (route) => {
      const u = new URL(route.request().url());
      if (u.pathname !== "/api/visualizations") return route.continue();
      if (mode === "slow") await new Promise((r) => setTimeout(r, 8000));
      const items = mode === "empty" ? [] : mode === "mixed" ? ITEMS : ITEMS.filter((i) => i.tier !== "featured");
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items, next_cursor: null, has_more: false }) });
    });
    await page.route("**/api/images/**", (r) => r.fulfill({ status: 200, contentType: "image/png", body: PIXEL_PNG }));
  }
  return { ctx, page };
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${vp}-${theme}-`;
  // 1 empty (live)
  { const { ctx, page } = await newPage(vp, theme, "live");
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
    await shot(page, p + "1-empty-live");
    // focus the search input via keyboard reach (Tab from tablist)
    await page.focus("#gallery-search-input"); await page.keyboard.type("zzz-no-such", { delay: 20 });
    await page.waitForTimeout(700);
    await shot(page, p + "1b-empty-live-search-nomatch");
    await ctx.close(); }
  // 3 featured carousel: the fixture set WITH featured rows (mixed) — CarouselPager outside <Carousel> throws
  { const { ctx, page } = await newPage(vp, theme, "mixed");
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    await shot(page, p + "3-featured-mixed-BROKEN");
    await ctx.close(); }
  // 2 loaded (stubbed, featured rows excluded so the grid can render)
  { const { ctx, page } = await newPage(vp, theme, "stub");
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
    await shot(page, p + "2-loaded");
    await shot(page, p + "2b-loaded-full", null, true);
    if (vp === "d") {
      const gc = page.locator(".grid .gallery-card").first();
      await gc.hover({ timeout: 5000 }); await shot(page, p + "4-card-hover");
      await page.locator(".grid .gallery-card .like-btn").first().hover({ timeout: 5000 }); await shot(page, p + "4b-like-hover");
      await page.mouse.move(5, 5);
      await page.keyboard.press("Tab"); // tab into page
      await gc.focus(); await shot(page, p + "4c-card-focus");
    }
    // 5 search with no match against a populated gallery
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator("#gallery-search-input").fill("zzz-no-such");
    await page.waitForTimeout(900);
    await shot(page, p + "5-search-nomatch-populated", { cardsAfterSearch: await page.locator(".gallery-card").count() });
    await page.locator("#gallery-search-input").fill("");
    // 6 filters drawer
    await page.locator(".filter-toggle").click({ timeout: 5000 });
    await shot(page, p + "6-filters-open");
    // tier filter to "Saved"
    await page.locator(".filter-panel [role=combobox]").first().click({ timeout: 5000 });
    await shot(page, p + "6b-tier-select-open");
    const saved = page.getByRole("option", { name: "Saved" });
    if (await saved.count()) { await saved.click({ timeout: 5000 }); await page.waitForTimeout(900); }
    await shot(page, p + "6c-tier-saved-applied", { cardsAfterTierSaved: await page.locator(".gallery-card").count(), savedInFixture: ITEMS.filter((i) => i.tier === "saved").length });
    await page.locator(".filter-panel [role=combobox]").nth(1).click().catch(() => {});
    await shot(page, p + "6d-sort-select-open");
    await page.keyboard.press("Escape");
    const lg = page.locator(".basis-pill-btn").nth(2);
    if (await lg.count()) { await lg.click({ timeout: 5000 }); await page.waitForTimeout(700); }
    await shot(page, p + "6e-basis-legendre-applied", { cardsAfterBasis: await page.locator(".gallery-card").count(), legendreInFixture: ITEMS.filter((i) => i.active_bases.includes("legendre")).length });
    // outside click: does the drawer dismiss?
    await page.mouse.click(VPS[vp].width - 20, VPS[vp].height - 20);
    await page.waitForTimeout(500);
    await shot(page, p + "6f-after-outside-click", { drawerStillOpen: await page.locator(".filter-panel").count() });
    await ctx.close(); }
  // 7 loading
  { const { ctx, page } = await newPage(vp, theme, "slow");
    await page.goto(BASE + "/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    await shot(page, p + "7-loading");
    await ctx.close(); }
  // 8 stubbed empty + search query (what the no-result copy reads)
  if (theme === "light") { const { ctx, page } = await newPage(vp, theme, "empty");
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
    await page.locator("#gallery-search-input").fill("amber");
    await page.waitForTimeout(900);
    await shot(page, p + "8-empty-with-query");
    await ctx.close(); }
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length);
