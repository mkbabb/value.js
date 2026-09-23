// UIA-F gallery-admin-audit — headed Chromium, real GPU. READ-ONLY: every non-GET /api/admin/** request is ABORTED.
// Live GETs via ?admin=dev; stubbed states (mixed/empty/error/slow) via page.route on /api/admin/audit.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const ts = (h) => `2026-09-2${h % 3}T1${h % 10}:0${h % 6}:3${h % 10}Z`;
const MIXED = { items: [
  { timestamp: ts(1), action: "batch_users:delete", target: "amber-fox-12,quiet-heron-77", ip_hash: "9f1c2ab77e0d4411aa" },
  { timestamp: ts(2), action: "janitor:hard_delete_visualizations", target: "", ip_hash: "system" },
  { timestamp: ts(3), action: "set_tier:featured", target: "viz/a-very-long-generated-slug-with-many-words-lobster-and-then-some-more-text-to-truncate", ip_hash: "0bd41e9e1c77aa0021" },
  { timestamp: ts(4), action: "suspend_user", target: "quiet-heron-77", ip_hash: "0bd41e9e1c77aa0021" },
  { timestamp: ts(5), action: "janitor:prune_audit", target: "older_than=90d", ip_hash: "system" },
  { timestamp: ts(6), action: "login", target: "admin", ip_hash: "77ab01ff22cc9981" },
], total: 6, page: 1, pages: 1 };
const EMPTY = { items: [], total: 0, page: 1, pages: 0 };
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = []; const blocked = []; const requests = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 100), font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 30), color: cs.color, pos: cs.position, top: cs.top, tt: cs.textTransform, ls: cs.letterSpacing }; };
    const list = q("[aria-label='Admin audit entries']");
    const rows = [...document.querySelectorAll("[aria-label='Admin audit entries'] [role=listitem]")];
    const bar = q("#audit-action-filter")?.closest(".cartoon-card");
    const cells = (r) => r ? [...r.children].map((c) => ({ ...box(c), text: c.textContent.trim().slice(0, 60) })) : [];
    // column-edge alignment across rows: x of 3rd cell per row
    const col3 = rows.slice(0, 8).map((r) => Math.round(r.children[2]?.getBoundingClientRect().x ?? -1));
    const col2 = rows.slice(0, 8).map((r) => Math.round(r.children[1]?.getBoundingClientRect().x ?? -1));
    return {
      theme: document.documentElement.className, url: location.pathname + location.search,
      tabs: q("[role=tablist]")?.textContent.trim().replace(/\s+/g, " "), tablist: box(q("[role=tablist]")),
      activeTab: q("[role=tab][aria-selected=true]")?.textContent.trim(),
      banner: box(q("[aria-label='Admin mode banner']")),
      bar: box(bar), barIcon: box(bar?.querySelector("svg")),
      action: box(q("#audit-action-filter")), target: box(q("#audit-target-filter")),
      apply: box([...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Apply")),
      clear: box(q("button[aria-label='Clear filters']")), clearDisabled: q("button[aria-label='Clear filters']")?.disabled,
      list: box(list), listBusy: list?.getAttribute("aria-busy"), listOpacity: list ? getComputedStyle(list).opacity : null,
      rows: rows.length, row0: box(rows[0]), row0Cells: cells(rows[0]), row1: box(rows[1]),
      rowGap: rows[1] ? Math.round(rows[1].getBoundingClientRect().y - rows[0].getBoundingClientRect().bottom) : null,
      col2, col3, rowWidths: rows.slice(0, 8).map((r) => Math.round(r.getBoundingClientRect().width)),
      rowOverflow: rows.slice(0, 8).map((r) => r.scrollWidth - r.clientWidth),
      badges: rows.slice(0, 8).map((r) => { const b = r.children[1]; return b ? { text: b.textContent.trim(), bg: getComputedStyle(b).backgroundColor, color: getComputedStyle(b).color, radius: getComputedStyle(b).borderRadius, w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height) } : null; }),
      pager: box(q("nav[aria-label='Audit log pagination']")), pagerText: q("nav[aria-label='Audit log pagination']")?.textContent.trim().replace(/\s+/g, " "),
      pagerBtns: [...document.querySelectorAll("nav[aria-label='Audit log pagination'] button")].map(box),
      emptyText: list ? [...list.querySelectorAll("p")].map((p) => p.textContent.trim()) : null,
      alert: box(q("[role=alert]")), alertText: q("[role=alert]")?.textContent.trim().replace(/\s+/g, " ").slice(0, 200),
      status: q("p.sr-only[role=status]")?.textContent.trim(),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, vw: innerWidth, vh: innerHeight, scrollY: Math.round(scrollY),
      activeEl: document.activeElement?.outerHTML.slice(0, 160),
      activeRing: document.activeElement ? getComputedStyle(document.activeElement).outlineStyle + " " + getComputedStyle(document.activeElement).outlineWidth + " " + getComputedStyle(document.activeElement).boxShadow.slice(0, 80) : null,
      toasts: [...document.querySelectorAll("[data-sonner-toast],[role=status]:not(.sr-only)")].map((t) => t.textContent.trim().slice(0, 80)),
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
  page.on("response", async (r) => { if (/\/api\/admin\/audit/.test(r.url())) { let b = ""; try { b = (await r.text()).slice(0, 160); } catch {} requests.push(`${vp}-${theme}-${mode} ${r.request().method()} ${r.url().replace(BASE, "")} -> ${r.status()} ${b}`); } });
  await page.route("**/api/**", (route) => {
    const r = route.request();
    if (r.method() !== "GET" && /\/api\/admin\//.test(r.url())) { blocked.push(`${r.method()} ${r.url()}`); return route.abort(); }
    return route.fallback();
  });
  if (mode !== "live") {
    await page.route("**/api/admin/audit**", async (route) => {
      if (mode === "slow") await new Promise((r) => setTimeout(r, 15000));
      if (mode === "error") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ title: "Internal Server Error", status: 500, detail: "database unavailable" }) });
      if (mode === "empty") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(EMPTY) });
      // mixed: 25-row pages over a 63-row ledger, honouring action (exact) + target (substring, i) like admin.py:631-634
      const u = new URL(route.request().url()); const act = u.searchParams.get("action"); const tgt = u.searchParams.get("target"); const pg = +(u.searchParams.get("page") || 1);
      let all = Array.from({ length: 63 }, (_, i) => ({ ...MIXED.items[i % 6], timestamp: new Date(Date.UTC(2026, 8, 22, 18, 0, 0) - i * 3600e3 * 7).toISOString() }));
      if (act) all = all.filter((e) => e.action === act);
      if (tgt) all = all.filter((e) => e.target.toLowerCase().includes(tgt.toLowerCase()));
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items: all.slice((pg - 1) * 25, pg * 25), total: all.length, page: pg, pages: Math.max(1, Math.ceil(all.length / 25)) }) });
    });
  }
  return { ctx, page };
}
async function enterAudit(page) {
  await page.goto(BASE + "/gallery?admin=dev", { waitUntil: "domcontentloaded" });
  await page.getByRole("tab", { name: "Audit Log" }).waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.getByRole("tab", { name: "Audit Log" }).click();
}
const rowsLoc = (page) => page.locator("[aria-label='Admin audit entries'] [role=listitem]");

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${vp}-${theme}-`;
  { const { ctx, page } = await newPage(vp, theme, "live");
    await enterAudit(page);
    await rowsLoc(page).first().waitFor({ timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await shot(page, p + "1-live");
    await shot(page, p + "1b-live-full", null, true);
    const firstTarget = await rowsLoc(page).first().locator("span").nth(1).textContent().catch(() => null);
    const firstAction = await rowsLoc(page).first().locator(":scope > :nth-child(2)").textContent().catch(() => null);
    // scrolled: sticky filter bar
    await page.evaluate(() => window.scrollTo(0, 700)); await shot(page, p + "1c-live-scrolled");
    await page.evaluate(() => window.scrollTo(0, 0));
    // pager
    const next = page.getByRole("button", { name: "Next page" });
    if (await next.count()) {
      await next.scrollIntoViewIfNeeded(); await shot(page, p + "2-pager-page1");
      if (await next.isEnabled()) { await next.click(); await page.waitForTimeout(1500); await shot(page, p + "2b-page2"); }
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    // draft (typed, not applied) — clear enabled
    await page.locator("#audit-action-filter").fill((firstAction || "").trim());
    await shot(page, p + "3-draft-typed", { firstAction, firstTarget });
    await page.getByRole("button", { name: "Apply" }).click(); await page.waitForTimeout(1500);
    await shot(page, p + "3b-filtered-action");
    // target substring filter
    await page.locator("#audit-action-filter").fill("");
    const t = (firstTarget || "").trim().slice(0, 5);
    await page.locator("#audit-target-filter").fill(t); await page.locator("#audit-target-filter").press("Enter"); await page.waitForTimeout(1500);
    await shot(page, p + "3c-filtered-target", { targetQuery: t });
    // filtered-empty
    await page.locator("#audit-action-filter").fill("zzz_no_such_action"); await page.locator("#audit-action-filter").press("Enter"); await page.waitForTimeout(1500);
    await shot(page, p + "4-filtered-empty");
    // clear
    await page.getByRole("button", { name: "Clear filters" }).click(); await page.waitForTimeout(1500);
    await shot(page, p + "4b-after-clear");
    if (vp === "d") {
      if (await rowsLoc(page).count() > 1) { await rowsLoc(page).nth(1).hover(); await shot(page, p + "5-row-hover"); }
      await page.mouse.move(5, 5);
      await page.locator("#audit-action-filter").focus(); await shot(page, p + "5b-input-focus");
      await page.keyboard.press("Tab"); await shot(page, p + "5c-tab-target");
      await page.keyboard.press("Tab"); await shot(page, p + "5d-tab-apply");
      await page.keyboard.press("Tab"); await shot(page, p + "5e-tab-next");
    }
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "mixed");
    await enterAudit(page); await rowsLoc(page).first().waitFor({ timeout: 20000 });
    await shot(page, p + "6-mixed-tones");
    await shot(page, p + "6b-mixed-full", null, true);
    await page.evaluate(() => window.scrollTo(0, 900)); await shot(page, p + "6c-mixed-scrolled");
    const next = page.getByRole("button", { name: "Next page" });
    await next.scrollIntoViewIfNeeded(); await shot(page, p + "6d-pager-page1");
    await next.click(); await page.waitForTimeout(1200); await shot(page, p + "6e-page2");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator("#audit-action-filter").fill("set_tier:featured"); await shot(page, p + "6f-draft-typed");
    await page.getByRole("button", { name: "Apply" }).click(); await page.waitForTimeout(1200); await shot(page, p + "6g-filtered-action");
    await page.locator("#audit-action-filter").fill(""); await page.locator("#audit-target-filter").fill("heron"); await page.locator("#audit-target-filter").press("Enter"); await page.waitForTimeout(1200);
    await shot(page, p + "6h-filtered-target");
    await page.locator("#audit-target-filter").fill(""); await page.locator("#audit-action-filter").fill("Delete"); await page.locator("#audit-action-filter").press("Enter"); await page.waitForTimeout(1200);
    await shot(page, p + "6i-filtered-empty");
    await page.getByRole("button", { name: "Clear filters" }).click(); await page.waitForTimeout(1200);
    if (vp === "d") {
      await rowsLoc(page).nth(1).hover(); await shot(page, p + "6j-row-hover");
      await rowsLoc(page).nth(2).locator(":scope > :nth-child(3)").hover(); await page.waitForTimeout(1200); await shot(page, p + "6k-target-hover-title");
      await page.mouse.move(5, 5);
    }
    await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "empty");
    await enterAudit(page); await page.waitForTimeout(1500);
    await shot(page, p + "7-empty"); await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "error");
    await enterAudit(page); await page.waitForTimeout(1500);
    await shot(page, p + "8-error"); await ctx.close(); }
  { const { ctx, page } = await newPage(vp, theme, "slow");
    await enterAudit(page); await page.waitForTimeout(1500);
    await shot(page, p + "9-loading"); await ctx.close(); }
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors, blocked, requests }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length, "blocked", blocked.length);
