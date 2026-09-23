// UIA-F gallery-admin-users — headed Chromium, real GPU. READ-ONLY: every non-GET /api/admin/** request
// is ABORTED (no delete/suspend/prune can reach the server); live GETs with the dev admin token; stubbed
// states via page.route using the web/e2e/fixtures/gallery.ts ADMIN_USERS shape (inlined).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const MIXED = { items: [
  { user_slug: "amber-fox-12", created_at: "2026-04-02T10:15:00Z", last_seen_at: "2026-09-17T22:41:00Z", entry_count: 9, status: "active" },
  { user_slug: "quiet-heron-77", created_at: "2026-06-19T08:02:00Z", last_seen_at: "2026-09-01T11:20:00Z", entry_count: 2, status: "suspended" },
  { user_slug: "a-very-long-generated-slug-with-many-words-lobster", created_at: "2026-06-19T08:02:00Z", last_seen_at: "2026-09-01T11:20:00Z", entry_count: 1234, status: "suspended" },
], total: 3, page: 1, pages: 1 };
const EMPTY = { items: [], total: 0, page: 1, pages: 0 };
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = []; const blocked = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 120), font: cs.fontSize + "/" + cs.fontWeight, color: cs.color, pos: cs.position, bottom: cs.bottom }; };
    const rows = [...document.querySelectorAll("[role=listitem]")];
    const list = q("[aria-label='Admin user list']");
    const toolbar = list?.parentElement?.firstElementChild;
    return {
      theme: document.documentElement.className, url: location.pathname + location.search,
      tabs: q("[role=tablist]")?.textContent.trim().replace(/\s+/g, " "), tablist: box(q("[role=tablist]")),
      activeTab: q("[role=tab][aria-selected=true]")?.textContent.trim(),
      banner: box(q("[aria-label='Admin mode banner']")), bannerText: q("[aria-label='Admin mode banner']")?.textContent.trim().replace(/\s+/g, " ").slice(0, 200),
      toolbar: box(toolbar),
      search: box(q("input[aria-label='Search users']")), sortTrigger: box(q("[aria-label='Sort users']")),
      prune: box([...document.querySelectorAll("button")].find((b) => /Prune empty/.test(b.textContent))),
      selectAllRow: box(q("#admin-select-all")?.parentElement), selectAll: box(q("#admin-select-all")),
      listbox: box(q("[role=listbox]")),
      rows: rows.length, row0: box(rows[0]), row1: box(rows[1]), rowGap: rows[1] ? Math.round(rows[1].getBoundingClientRect().y - rows[0].getBoundingClientRect().bottom) : null,
      row0Check: box(rows[0]?.querySelector("button[role=checkbox]")), row0Btns: rows[0] ? [...rows[0].querySelectorAll("button:not([role=checkbox])")].map(box) : [],
      row0Meta: box(rows[0]?.querySelector(".text-mono-micro")), row0Slug: box(rows[0]?.querySelector(".font-mono")),
      badge: box(q("[role=listitem] .uppercase:not(.text-mono-micro)")),
      batchBar: box(q("[aria-label='Batch user actions']")), batchBtns: [...document.querySelectorAll("[aria-label='Batch user actions'] button")].map(box),
      pager: box(q("nav[aria-label='User list pagination']")), pagerText: q("nav[aria-label='User list pagination']")?.textContent.trim().replace(/\s+/g, " "),
      pagerBtns: [...document.querySelectorAll("nav[aria-label='User list pagination'] button")].map(box),
      emptyText: [...document.querySelectorAll("p")].find((p) => /No users/.test(p.textContent) && !p.classList.contains("sr-only"))?.textContent.trim(),
      loadingText: [...document.querySelectorAll("div")].find((d) => d.textContent.trim() === "Loading users…")?.textContent,
      errorBox: box(q("[role=alert]")),
      dialog: box(q("[role=dialog]")), dialogText: q("[role=dialog]")?.textContent.trim().replace(/\s+/g, " ").slice(0, 240),
      statusText: q("p.sr-only[role=status]")?.textContent.trim(),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, vw: innerWidth, vh: innerHeight,
      activeEl: document.activeElement?.outerHTML.slice(0, 140),
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
  // READ-ONLY guard: no mutating admin call ever leaves the browser.
  await page.route("**/api/**", (route) => {
    const r = route.request();
    if (r.method() !== "GET" && /\/api\/admin\//.test(r.url())) { blocked.push(`${r.method()} ${r.url()}`); return route.abort(); }
    return route.fallback();
  });
  if (mode !== "live") {
    await page.route("**/api/admin/users**", async (route) => {
      if (route.request().method() !== "GET") return route.fallback();
      if (mode === "slow") await new Promise((r) => setTimeout(r, 15000));
      if (mode === "error") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ title: "Internal Server Error", status: 500, detail: "database unavailable" }) });
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(mode === "empty" ? EMPTY : MIXED) });
    });
  }
  return { ctx, page };
}
async function enterUsers(page) {
  await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "domcontentloaded" });
  await page.getByRole("tab", { name: "Users" }).waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500); // let the "Admin mode activated" toast settle
  await page.getByRole("tab", { name: "Users" }).click();
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${vp}-${theme}-`;
  // LIVE: loaded, full page, sort open, selection/batch bar, paginated, search no-match, hover/focus, dialog
  { const { ctx, page } = await newPage(vp, theme, "live");
    await enterUsers(page);
    await page.locator("[role=listitem]").first().waitFor({ timeout: 30000 });
    await page.waitForTimeout(2500);
    await shot(page, p + "1-list-live");
    await shot(page, p + "1b-list-live-full", null, true);
    await page.getByLabel("Sort users").click();
    await shot(page, p + "2-sort-open");
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
    const cbs = page.locator("[role=listitem] button[role=checkbox]");
    await cbs.nth(0).click(); await cbs.nth(1).click();
    await shot(page, p + "3-rows-selected");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await shot(page, p + "3b-rows-selected-scrolled");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator("#admin-select-all").click();
    await shot(page, p + "3c-select-all");
    if (vp === "d" && theme === "light") {
      await page.locator("[role=listitem] button[aria-label^='Delete user']").first().click();
      await shot(page, p + "3d-delete-dialog");
      await page.getByRole("button", { name: "Cancel" }).click(); await page.waitForTimeout(400);
      await page.locator("[aria-label='Batch user actions'] button", { hasText: "Delete" }).click();
      await shot(page, p + "3e-batch-delete-dialog");
      await page.getByRole("button", { name: "Cancel" }).click(); await page.waitForTimeout(400);
      await page.getByRole("button", { name: /Prune empty/ }).click();
      await shot(page, p + "3f-prune-dialog");
      await page.getByRole("button", { name: "Cancel" }).click(); await page.waitForTimeout(400);
    }
    await page.getByRole("button", { name: "Clear selection" }).click().catch(() => {});
    await page.waitForTimeout(300);
    // paginated
    const next = page.getByRole("button", { name: "Next page" });
    await next.scrollIntoViewIfNeeded(); await shot(page, p + "4-pager-page1");
    await next.click(); await page.waitForTimeout(1200);
    await shot(page, p + "4b-page2");
    await shot(page, p + "4c-page2-full", null, true);
    await page.evaluate(() => window.scrollTo(0, 0));
    // search no match
    await page.getByLabel("Search users").fill("zzz-no-such-user"); await page.waitForTimeout(1500);
    await shot(page, p + "5-search-nomatch");
    await page.getByLabel("Search users").fill("falcon"); await page.waitForTimeout(1500);
    await shot(page, p + "5b-search-match");
    if (vp === "d") {
      await page.getByLabel("Search users").fill(""); await page.waitForTimeout(1500);
      await page.locator("[role=listitem]").nth(1).hover(); await shot(page, p + "6-row-hover");
      await page.locator("[role=listitem] button[aria-label^='Delete user']").nth(1).hover(); await shot(page, p + "6b-delete-hover");
      await page.mouse.move(5, 5);
      await page.getByLabel("Search users").focus(); await shot(page, p + "6c-search-focus");
      await page.keyboard.press("Tab"); await shot(page, p + "6d-tab1");
      await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await shot(page, p + "6e-tab4");
    }
    await ctx.close(); }
  // STUB mixed (suspended badge, long slug)
  { const { ctx, page } = await newPage(vp, theme, "mixed");
    await enterUsers(page); await page.locator("[role=listitem]").first().waitFor({ timeout: 30000 });
    await shot(page, p + "7-mixed-suspended");
    await page.locator("[role=listitem] button[role=checkbox]").nth(1).click();
    await shot(page, p + "7b-mixed-suspended-selected");
    await ctx.close(); }
  // STUB empty
  { const { ctx, page } = await newPage(vp, theme, "empty");
    await enterUsers(page); await page.waitForTimeout(1500);
    await shot(page, p + "8-empty");
    await ctx.close(); }
  // STUB error + loading (light only for mobile dark economy: capture all anyway, cheap)
  { const { ctx, page } = await newPage(vp, theme, "error");
    await enterUsers(page); await page.waitForTimeout(1500);
    await shot(page, p + "9-error");
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "slow");
    await enterUsers(page); await page.waitForTimeout(1500);
    await shot(page, p + "10-loading");
    await ctx.close(); }
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors, blocked }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length, "blocked", blocked.length);
