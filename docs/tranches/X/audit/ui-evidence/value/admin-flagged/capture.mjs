// X audit seat · admin-flagged — READ-ONLY capture. The API is fully stubbed at the
// browser (no request reaches a backend; dismiss/delete are fulfilled by the stub).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const REPO = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${REPO} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${REPO} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const NOW = "2026-09-20T12:00:00.000Z";
const pal = (name, slug, userSlug, colors) => ({ name, slug, userSlug, tags: [], versionCount: 1, voteCount: 2, visibility: "public", tier: "standard",
  colors: colors.map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: false, published: true, voted: false });
const flag = (reason, detail, d) => ({ reporterSlug: "someone-else", reason, ...(detail ? { detail } : {}), createdAt: `2026-09-${d}T10:00:00.000Z` });
const FLAGGED = [
  { paletteSlug: "neon-knockoff", palette: pal("Neon Knockoff", "neon-knockoff", "copy-cat-fox", ["#ff00aa","#00ffcc","#ffee00","#111111","#ffffff","#7700ff"]), flagCount: 3,
    flags: [flag("copyright", "Lifted wholesale from a commercial print palette catalogue; see the 1974 swatch book page 12.", "18"), flag("spam", null, "19"), flag("copyright", "Same as above", "20")] },
  { paletteSlug: "buy-cheap-pixels-now", palette: pal("BUY CHEAP PIXELS NOW visit my totally legit site for more palettes", "buy-cheap-pixels-now", "spam-bot-9000", ["#e11d48","#fb923c"]), flagCount: 7,
    flags: [flag("spam", "link farm", "15"), flag("spam", null, "16"), flag("inappropriate", "offensive name", "17")] },
  { paletteSlug: "ghost-palette", palette: null, flagCount: 1, flags: [flag("other", "Could not load it", "12")] },
  { paletteSlug: "harbour-dusk", palette: pal("Harbour Dusk", "harbour-dusk", "test-user", ["#0f172a","#1e3a5f","#3b6e8f","#9cc3d5","#f2d0a9"]), flagCount: 1, flags: [flag("inappropriate", null, "10")] },
];
let mode = { kind: "items", delay: 0 }; // items | empty | error | slow
const calls = [];
const isApi = (url) => { const p = url.pathname; if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false; if (/\.\w+$/.test(p)) return false; return /^\/(palettes|sessions|colors|admin|users|tags|health)(\/|$)/.test(p); };
async function stub(page) {
  await page.route(isApi, async (route) => {
    const u = new URL(route.request().url()); const m = route.request().method();
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (u.pathname.startsWith("/admin")) calls.push(`${m} ${u.pathname}${u.search}`);
    if (u.pathname === "/admin/flagged") {
      if (mode.delay) await new Promise((r) => setTimeout(r, mode.delay));
      if (mode.kind === "error") return j({ error: "Internal Server Error (audit stub)" }, 500);
      if (mode.kind === "empty") return j({ data: [], total: 0, limit: 20, offset: 0 });
      const off = Number(u.searchParams.get("offset") || 0);
      return j({ data: off === 0 ? FLAGGED : FLAGGED.slice(0, 2), total: 23, limit: 20, offset: off });
    }
    if (m === "DELETE" && u.pathname.startsWith("/admin/")) return j({ dismissed: 1 });
    if (m !== "GET" && !u.pathname.startsWith("/sessions")) return j({ error: "audit stub: read-only" }, 503);
    if (u.pathname === "/sessions/me") return j({ userSlug: "test-user", slug: "test-user" });
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
}
const manifest = { seat: "admin-flagged", base: BASE, head: sha, dirty, captured: new Date().toISOString(), frames: [] };
async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`, bg: s.backgroundColor, color: s.color, border: `${s.borderTopWidth} ${s.borderTopColor}`, cls: el.className?.toString().slice(0, 160), emphasis: el.dataset?.emphasis, variantAttr: el.getAttribute("variant") }; };
    const d = document.querySelector('[role="dialog"]');
    const rows = [...document.querySelectorAll('.rounded-md.border.border-card-edge.overflow-hidden')];
    return {
      pane: cs(document.querySelector('[data-slot="card"]')),
      header: cs(document.querySelector('h1,h2')),
      rows: rows.slice(0, 2).map(cs),
      buttons: [...document.querySelectorAll('button[aria-label^="Dismiss"],button[aria-label^="Delete palette"],button[aria-label="Refresh flagged palettes"],button[aria-label$="page"]')].slice(0, 5).map((b) => ({ a: b.getAttribute("aria-label"), ...cs(b) })),
      badges: [...document.querySelectorAll('[data-slot="badge"]')].slice(0, 4).map((b) => ({ t: b.textContent.trim(), ...cs(b) })),
      swatch: cs(document.querySelector('.h-5.w-5.rounded-full')),
      empty: cs(document.querySelector('[data-slot="empty-state"],.empty-state')),
      dialog: d ? cs(d) : null, dialogButtons: d ? [...d.querySelectorAll("button")].map((b) => ({ t: b.textContent.trim(), ...cs(b) })) : null,
      focused: document.activeElement ? { tag: document.activeElement.tagName, a: document.activeElement.getAttribute("aria-label") || document.activeElement.textContent?.trim().slice(0, 30), outline: getComputedStyle(document.activeElement).outline, shadow: getComputedStyle(document.activeElement).boxShadow.slice(0, 90) } : null,
      notice: [...document.querySelectorAll('[data-admin-notice]')].map((e) => e.textContent.trim()).filter(Boolean),
      scrollW: document.documentElement.scrollWidth,
    };
  });
}
async function shot(page, name, extra = {}, full = false) {
  extra = { ...extra };
  const file = `${name}.png`; await page.waitForTimeout(500);
  try { await page.screenshot({ path: OUT + file, fullPage: full, timeout: 20000 }); }
  catch { // fonts-wait hang under shared-server load → raw CDP capture (no fonts gate)
    const cdp = await page.context().newCDPSession(page);
    let clip; if (full) { const d = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight })); clip = { x: 0, y: 0, width: d.w, height: d.h, scale: 1 }; }
    const { data } = await cdp.send("Page.captureScreenshot", { format: "png", ...(clip ? { clip, captureBeyondViewport: true } : {}) });
    writeFileSync(OUT + file, Buffer.from(data, "base64")); await cdp.detach(); extra = { ...extra, via: "cdp" }; }
  manifest.frames.push({ file, head: sha, dirty, ...extra, metrics: await metrics(page) });
  console.log("captured", file);
}
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }].filter((v) => !process.env.VP || process.env.VP === v.tag);
for (const vp of VPS) for (const theme of ["light", "dark"].filter((t) => !process.env.THEME || process.env.THEME === t)) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const page = await ctx.newPage();
  const sfx = `${vp.tag}-${theme}`;
  await page.addInitScript(([t, signedOut]) => { try { localStorage.setItem("vueuse-color-scheme", t); if (!sessionStorage.getItem("__audit_signed_out")) localStorage.setItem("palette-admin-token", "dev"); } catch {} }, [theme]);
  await stub(page);
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
  page.on("requestfailed", (r) => errs.push(`reqfail ${r.url().slice(0,120)} ${r.failure()?.errorText}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
  const go = async () => { await page.goto(`${BASE}/#/admin/flagged`, { waitUntil: "domcontentloaded", timeout: 240000 }); };
  const settle = async (sel) => { await page.locator(sel).first().waitFor({ timeout: 120000 }); await page.waitForTimeout(1800); };
  try {
    // A · empty
    mode = { kind: "empty", delay: 0 }; await go(); await settle('text=No flagged palettes.');
    await shot(page, `a-empty-${sfx}`, { state: "empty ('No flagged palettes.')", vp: vp.tag, theme });
    // B · loading (slow)
    mode = { kind: "items", delay: 4000 };
    await page.locator('button[aria-label="Refresh flagged palettes"]').click(); await page.waitForTimeout(400);
    await shot(page, `b-loading-${sfx}`, { state: "loading (refresh, 4s stub delay)", vp: vp.tag, theme });
    await settle('button[aria-label^="Dismiss"]'); mode.delay = 0;
    // C · with reports
    await shot(page, `c-reports-${sfx}`, { state: "with reports (4 rows, total 23 → 2 pages)", vp: vp.tag, theme });
    await shot(page, `c-reports-full-${sfx}`, { state: "with reports — full page", vp: vp.tag, theme }, true);
    // pagination bar in view
    await page.locator('button[aria-label="Next page"]').scrollIntoViewIfNeeded().catch(() => {});
    await shot(page, `d-pagination-${sfx}`, { state: "with reports — PaginationBar scrolled into view", vp: vp.tag, theme });
    // hover states
    await page.locator('button[aria-label^="Dismiss"]').first().scrollIntoViewIfNeeded(); await page.locator('button[aria-label^="Dismiss"]').first().hover();
    await shot(page, `e-dismiss-hover-${sfx}`, { state: "Dismiss hovered (row 1)", vp: vp.tag, theme });
    await page.locator('button[aria-label^="Delete palette"]').first().hover();
    await shot(page, `f-delete-hover-${sfx}`, { state: "delete icon hovered (row 1)", vp: vp.tag, theme });
    // keyboard focus on delete
    await page.locator('button[aria-label^="Dismiss"]').first().focus(); await page.keyboard.press("Tab");
    await shot(page, `g-delete-kbdfocus-${sfx}`, { state: "delete icon keyboard-focused (Tab from Dismiss)", vp: vp.tag, theme });
    // H · resolve confirm dialog
    await page.locator('button[aria-label^="Delete palette"]').first().click();
    await page.locator('[role="dialog"]').waitFor({ timeout: 8000 });
    await shot(page, `h-confirm-dialog-${sfx}`, { state: "resolve confirm Dialog (Delete flagged palette?)", vp: vp.tag, theme });
    await page.keyboard.press("Tab");
    await shot(page, `h2-confirm-tab-${sfx}`, { state: "confirm Dialog, one Tab", vp: vp.tag, theme });
    await page.locator('[role="dialog"] button', { hasText: "Delete palette" }).click();
    await page.locator('[role="dialog"]').waitFor({ state: "detached", timeout: 8000 }).catch(() => {});
    await shot(page, `i-after-delete-${sfx}`, { state: "after confirm — row removed, notice", vp: vp.tag, theme });
    // dismiss act
    await page.locator('button[aria-label^="Dismiss"]').first().click();
    await shot(page, `j-after-dismiss-${sfx}`, { state: "after Dismiss — notice", vp: vp.tag, theme });
    // page 2
    await page.locator('button[aria-label="Next page"]').click().catch((e) => console.log("next fail", String(e).slice(0, 100)));
    await page.waitForTimeout(800);
    await page.locator('button[aria-label="Next page"]').scrollIntoViewIfNeeded().catch(() => {});
    await shot(page, `k-page2-${sfx}`, { state: "page 2 (Next disabled)", vp: vp.tag, theme });
    // L · error
    mode = { kind: "error", delay: 0 }; await page.locator('button[aria-label="Refresh flagged palettes"]').scrollIntoViewIfNeeded(); await page.locator('button[aria-label="Refresh flagged palettes"]').click();
    await page.waitForTimeout(1200);
    await shot(page, `l-load-error-${sfx}`, { state: "load error (500) → error plate + Retry", vp: vp.tag, theme });
    // M · signed out
    mode = { kind: "items", delay: 0 };
    await page.evaluate(() => { sessionStorage.setItem("__audit_signed_out", "1"); localStorage.removeItem("palette-admin-token"); });
    await page.goto(`${BASE}/?signedout=1#/admin/flagged`, { waitUntil: "domcontentloaded", timeout: 240000 }); await page.waitForTimeout(6000);
    await shot(page, `m-signed-out-${sfx}`, { state: "signed out (no admin token) at /#/admin/flagged", vp: vp.tag, theme, url: page.url() });
  } catch (e) { console.log("ERR", sfx, String(e).slice(0, 400)); await page.screenshot({ path: OUT + `ERR-${sfx}.png` }).catch(() => {}); }
  manifest.frames.push({ ctx: sfx, errors: errs.slice(0, 25) });
  await ctx.close();
}
manifest.adminCalls = calls;
writeFileSync(OUT + `manifest-${process.env.VP ?? "all"}-${process.env.THEME ?? "all"}.json`, JSON.stringify(manifest, null, 1));
await browser.close();
