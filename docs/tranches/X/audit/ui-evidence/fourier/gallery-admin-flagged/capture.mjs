// UIA-F gallery-admin-flagged — headed Chromium, real GPU. READ-ONLY: every non-GET /api/admin/** request is
// either ABORTED (live mode) or FULFILLED LOCALLY (stub modes) — nothing mutating reaches the server.
// Stubbed states via page.route using web/e2e/fixtures/gallery.ts ADMIN_FLAGGED shape (widened).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const IMG = "cosmic-edging-nutmeg-horse"; // real live asset
const flag = (r, reason, detail, t) => ({ reporter_slug: r, reason, detail, created_at: t });
const now = Date.now(); const ago = (m) => new Date(now - m * 60000).toISOString();
const PAGE1 = { items: [
  { slug: "spiral-lattice-04", flag_count: 3, image_slug: IMG, owner_slug: "quiet-heron-77", tier: "normal", created_at: ago(60 * 24 * 20),
    flags: [flag("amber-fox-12", "inappropriate", "reported from the gallery grid", ago(90)),
            flag("lucid-otter-3", "spam", null, ago(60 * 5)),
            flag("a-very-long-generated-reporter-slug-lobster", "other", "This looks like it was traced from a copyrighted illustration; also the title is offensive and the uploader keeps reposting it under different slugs. Please remove it and consider suspending the account. Repeating: please remove.", ago(60 * 24 * 3))] },
  { slug: "a-very-long-generated-visualization-slug-with-many-words-that-overflows", flag_count: 1, image_slug: IMG, owner_slug: null, tier: "featured", created_at: ago(2),
    flags: [flag("amber-fox-12", "copyright", null, ago(0.05))] },
  { slug: "frozen-brewing-cerulean-hedgehog", flag_count: 2, image_slug: null, owner_slug: "vast-seeking-henna-falcon", tier: "saved", created_at: ago(60 * 24 * 90),
    flags: [flag("mossy-whale-1", "spam", "spam link in title", ago(60 * 30)), flag("mossy-whale-2", "spam", null, ago(60 * 31))] },
  { slug: "broken-thumb-entry", flag_count: 1, image_slug: "no-such-image-slug-404", owner_slug: "pale-lynx-5", tier: null, created_at: null,
    flags: [flag("pale-lynx-9", "inappropriate", null, ago(10))] },
], next_cursor: "c2", has_more: true };
const PAGE2 = { items: [
  { slug: "page-two-entry-01", flag_count: 1, image_slug: IMG, owner_slug: "late-owl-2", tier: "normal", created_at: ago(600),
    flags: [flag("early-bird-1", "other", "blurry", ago(300))] },
], next_cursor: null, has_more: false };
const EMPTY = { items: [], next_cursor: null, has_more: false };
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = []; const blocked = []; const faked = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 100), font: cs.fontSize + "/" + cs.fontWeight, color: cs.color, opacity: cs.opacity }; };
    const list = q("[aria-label='Flagged gallery entries']");
    const cards = [...document.querySelectorAll("[aria-label='Flagged gallery entries'] > .flagged-card")];
    const c0 = cards[0];
    return {
      theme: document.documentElement.className, url: location.pathname + location.search,
      tabs: q("[role=tablist]")?.textContent.trim().replace(/\s+/g, " "), activeTab: q("[role=tab][aria-selected=true]")?.textContent.trim(),
      banner: box(q("[aria-label='Admin mode banner']")),
      panel: box(list?.parentElement), list: box(list), cards: cards.length, card0Role: c0?.getAttribute("role"), card0AriaBusy: c0?.getAttribute("aria-busy"), card0: box(c0), card1: box(cards[1]),
      cardGap: cards[1] ? Math.round(cards[1].getBoundingClientRect().y - c0.getBoundingClientRect().bottom) : null,
      card0Img: box(c0?.querySelector("img")), card0Slug: box(c0?.querySelector(".font-mono.text-xs")),
      card0Badge: box(c0?.querySelector(".truncate")?.nextElementSibling), card0BadgeText: c0?.querySelector(".truncate")?.nextElementSibling?.textContent.trim(),
      card0Meta: box(c0?.querySelector(".text-mono-micro")), card0Tier: box(c0?.querySelector("[data-tier]")),
      card0FlagRows: c0 ? [...c0.querySelectorAll(".border-l")].map(box) : [], card0FlagReason: box(c0?.querySelector(".border-l .text-destructive")),
      card0Btns: c0 ? [...c0.querySelectorAll("button")].map((b) => ({ t: b.textContent.trim(), aria: b.getAttribute("aria-label"), dis: b.disabled, ...box(b) })) : [],
      loadMore: box(q("[aria-label='Load more flagged entries']")), loadMoreNav: box(q("nav[aria-label='Flagged entries pagination']")),
      emptyText: [...document.querySelectorAll("p")].find((p) => /No flagged content/.test(p.textContent))?.textContent.trim(),
      emptyBox: box([...document.querySelectorAll("p")].find((p) => /No flagged content/.test(p.textContent))?.parentElement),
      loadingText: [...document.querySelectorAll("div")].find((d) => d.textContent.trim() === "Loading flagged entries…")?.textContent,
      errorBox: box(q("[role=alert]")), errorText: q("[role=alert]")?.textContent.trim().replace(/\s+/g, " "),
      dialog: box(q("[role=dialog]")), dialogText: q("[role=dialog]")?.textContent.trim().replace(/\s+/g, " ").slice(0, 260),
      dialogBtns: [...document.querySelectorAll("[role=dialog] button")].map((b) => ({ t: b.textContent.trim(), ...box(b) })),
      toasts: [...document.querySelectorAll("[data-sonner-toast], [role=status], [role=alert]")].map((t) => t.textContent.trim().slice(0, 90)).filter(Boolean),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, vw: innerWidth, vh: innerHeight,
      activeEl: document.activeElement?.outerHTML.slice(0, 160),
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
  await page.route("**/api/**", async (route) => {
    const r = route.request();
    if (r.method() !== "GET" && /\/api\/admin\//.test(r.url())) {
      if (mode === "live") { blocked.push(`${r.method()} ${r.url()}`); return route.abort(); }
      faked.push(`${mode} ${r.method()} ${r.url()}`);
      if (mode === "slowmut") await new Promise((res) => setTimeout(res, 20000));
      if (/\/flags$/.test(r.url())) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ dismissed: 3 }) });
      if (/\/tier$/.test(r.url())) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ...PAGE1.items[0], tier: "saved" }) });
      return route.fulfill({ status: 204, body: "" });
    }
    return route.fallback();
  });
  if (mode !== "live") {
    await page.route("**/api/admin/flagged**", async (route) => {
      if (route.request().method() !== "GET") return route.fallback();
      if (mode === "slow") await new Promise((r) => setTimeout(r, 15000));
      if (mode === "error") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ title: "Internal Server Error", status: 500, detail: "database unavailable" }) });
      const cursor = new URL(route.request().url()).searchParams.get("cursor");
      if (mode === "loadmoreslow" && cursor) await new Promise((r) => setTimeout(r, 15000));
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(mode === "empty" ? EMPTY : cursor ? PAGE2 : PAGE1) });
    });
  }
  return { ctx, page };
}
async function enterFlagged(page) {
  await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "domcontentloaded" });
  await page.getByRole("tab", { name: "Flagged" }).waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.getByRole("tab", { name: "Flagged" }).click();
}
const cardsLoc = (page) => page.locator("[aria-label='Flagged gallery entries'] > .flagged-card");

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${vp}-${theme}-`;
  { const { ctx, page } = await newPage(vp, theme, "live");
    await enterFlagged(page); await page.waitForTimeout(3000);
    await shot(page, p + "1-live");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "empty");
    await enterFlagged(page); await page.waitForTimeout(2000);
    await shot(page, p + "2-empty");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "stub");
    await enterFlagged(page); await cardsLoc(page).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(2000);
    await shot(page, p + "3-loaded");
    await shot(page, p + "3b-loaded-full", null, true);
    await page.getByLabel("Load more flagged entries").scrollIntoViewIfNeeded();
    await shot(page, p + "3c-loadmore-visible");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByLabel(/^Delete entry /).first().click();
    await page.locator("[role=dialog]").waitFor();
    await shot(page, p + "4-confirm-dialog");
    if (vp === "d") { await page.keyboard.press("Tab"); await shot(page, p + "4b-dialog-tab"); }
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    await shot(page, p + "4c-after-escape");
    if (vp === "d") {
      await cardsLoc(page).nth(0).hover(); await shot(page, p + "5-card-hover");
      await page.getByLabel(/^Delete entry /).first().hover(); await shot(page, p + "5b-delete-hover");
      await page.mouse.move(5, 5);
      await page.getByLabel(/^Mark .* acceptable/).first().focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
      await shot(page, p + "5c-keep-focus");
    }
    // Keep (fulfilled locally) -> tier patch + toast
    await page.getByLabel(/^Mark .* acceptable/).first().click(); await page.waitForTimeout(600);
    await shot(page, p + "6-after-keep");
    // Dismiss (fulfilled locally) -> row removed + toast
    await page.getByLabel(/^Dismiss flags on /).first().click(); await page.waitForTimeout(600);
    await shot(page, p + "6b-after-dismiss");
    // Delete via dialog (fulfilled locally)
    await page.getByLabel(/^Delete entry /).first().click(); await page.locator("[role=dialog]").waitFor();
    await page.locator("[role=dialog]").getByRole("button", { name: "Delete" }).click(); await page.waitForTimeout(800);
    await shot(page, p + "6c-after-delete");
    // load more -> page 2 appended, nav gone
    await page.getByLabel("Load more flagged entries").click(); await page.waitForTimeout(1500);
    await shot(page, p + "7-after-loadmore", null, true);
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "slowmut");
    await enterFlagged(page); await cardsLoc(page).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(1500);
    await page.getByLabel(/^Delete entry /).first().click(); await page.locator("[role=dialog]").waitFor();
    await page.locator("[role=dialog]").getByRole("button", { name: "Delete" }).click();
    await shot(page, p + "8-delete-inflight");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "loadmoreslow");
    await enterFlagged(page); await cardsLoc(page).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(1500);
    await page.getByLabel("Load more flagged entries").click(); await page.getByLabel("Load more flagged entries").scrollIntoViewIfNeeded();
    await shot(page, p + "8b-loadmore-inflight");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "error");
    await enterFlagged(page); await page.waitForTimeout(2000);
    await shot(page, p + "9-error");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "slow");
    await enterFlagged(page); await page.waitForTimeout(1500);
    await shot(page, p + "10-loading");
    await ctx.close(); }
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors, blocked, faked }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length, "blocked", blocked.length, "faked", faked.length);
