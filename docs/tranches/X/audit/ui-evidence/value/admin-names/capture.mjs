// X audit seat · admin-names — READ-ONLY capture.
// Phase R hits the REAL dev API (GET only, admin token "dev") for the true empty queue.
// Phase S routes every API call to an in-memory stub (the propose POST, approve/reject/delete
// are fulfilled by the stub — no write ever reaches the dev DB).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const REPO = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${REPO} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${REPO} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const NOW = "2026-09-23T00:00:00.000Z";

const isApi = (url) => { const p = url.pathname; if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false; if (/\.\w+$/.test(p)) return false; return /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(p); };

function mkStore() {
  let n = 0; const mk = (name, css, status = "pending") => ({ id: `stub-${++n}`, name, css, status, contributor: "audit", createdAt: NOW, updatedAt: NOW });
  return { real: true, queue: [mk("harbour dusk", "oklch(0.42 0.08 240)"), mk("an exceedingly long proposed colour name that must truncate at phone width", "rgb(214 120 64)")],
           approved: [mk("marigold", "#f59e0b", "approved")], mk, mode: { fail: false, delay: 0 }, calls: [] };
}
async function stub(page, S) {
  await page.route(isApi, async (route) => {
    const u = new URL(route.request().url()); const m = route.request().method(); const p = u.pathname;
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (S.real) { if (m !== "GET") return j({ error: "audit: real-API phase is GET-only" }, 503); return route.continue(); }
    if (p.startsWith("/admin") || p === "/colors/propose") S.calls.push(`${m} ${p}`);
    if (S.mode.delay && p.startsWith("/admin")) await new Promise((r) => setTimeout(r, S.mode.delay));
    if (S.mode.fail && p.startsWith("/admin")) return j({ type: "urn:contract:internal", title: "Internal Server Error", status: 500, detail: "audit stub: forced failure" }, 500);
    if (p === "/colors/propose" && m === "POST") { const b = JSON.parse(route.request().postData() || "{}"); const it = S.mk(b.name, b.css); S.queue.push(it); return j(it, 201); }
    if (p === "/admin/queue") return j({ data: S.queue, total: S.queue.length, limit: 50, offset: 0 });
    if (p === "/admin/colors/approved") return j({ data: S.approved, total: S.approved.length, limit: 50, offset: 0 });
    let mm;
    if ((mm = p.match(/^\/admin\/colors\/([^/]+)\/approve$/))) { const it = S.queue.find((q) => q.id === mm[1]); S.queue = S.queue.filter((q) => q.id !== mm[1]); if (it) S.approved.push({ ...it, status: "approved" }); return j({ approved: true }); }
    if ((mm = p.match(/^\/admin\/colors\/([^/]+)\/reject$/))) { S.queue = S.queue.filter((q) => q.id !== mm[1]); return j({ rejected: true }); }
    if ((mm = p.match(/^\/admin\/colors\/([^/]+)$/)) && m === "DELETE") { S.approved = S.approved.filter((q) => q.id !== mm[1]); return j({ deleted: true }); }
    if (p === "/sessions" || p === "/sessions/login") return j({ token: "audit-token", userSlug: "audit-user" });
    if (p === "/sessions/me") return j({ userSlug: "audit-user", slug: "audit-user" });
    if (p === "/colors/approved" || p === "/colors") return j({ data: [], total: 0, limit: 50, offset: 0 });
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
}

const manifest = { seat: "admin-names", base: BASE, head: sha, dirty, glassUiInstalled: "7.0.0", captured: new Date().toISOString(), frames: [] };
async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`, bg: s.backgroundColor, color: s.color, border: `${s.borderTopWidth} ${s.borderTopColor}`, backdrop: s.backdropFilter?.slice(0, 60), cls: el.className?.toString().slice(0, 160), attrs: Object.fromEntries([...el.attributes].filter((a) => /^(data-(emphasis|tone|size|icon-only|slot|surface)|variant|role|aria-pressed|aria-selected|aria-label|disabled)$/.test(a.name)).map((a) => [a.name, a.value])) }; };
    const root = document.querySelector('[data-names-direction]');
    const d = document.querySelector('[role="dialog"]');
    const rows = root ? [...root.querySelectorAll('.border-card-edge.rounded-md')] : [];
    return {
      route: location.hash, docScrollW: document.documentElement.scrollWidth, vw: innerWidth,
      pane: cs(root?.closest('[data-slot="card"],.pane-scroll-fade')),
      header: cs(document.querySelector('.pane-scroll-fade h2, .pane-scroll-fade h1, .pane-scroll-fade [data-slot="pane-header"]')),
      headerBadge: cs(document.querySelector('.pane-scroll-fade [data-slot="badge"], .pane-scroll-fade .text-mono-small.ml-2')),
      strip: cs(root?.firstElementChild), stripBtns: root ? [...root.firstElementChild.querySelectorAll('button,[role="tab"]')].map((b) => ({ t: b.textContent.trim(), ...cs(b) })) : [],
      search: cs(root?.querySelector('input')),
      rows: rows.map((r) => ({ t: r.textContent.trim().slice(0, 90), ...cs(r), overflowX: r.scrollWidth > r.clientWidth, swatch: cs(r.querySelector('.rounded-full')), buttons: [...r.querySelectorAll('button')].map((b) => ({ t: b.getAttribute('aria-label'), ...cs(b) })) })),
      empty: [...document.querySelectorAll('[data-names-direction] [role="status"], [data-names-direction] [role="alert"], [data-admin-access]')].map((e) => ({ t: e.textContent.trim().slice(0, 140), ...cs(e) })),
      notice: [...document.querySelectorAll('[data-admin-notice] > *')].map((e) => ({ t: e.textContent.trim().slice(0, 120), ...cs(e) })),
      skeletons: document.querySelectorAll('[aria-label^="Loading"] > *').length,
      dialog: d ? { ...cs(d), title: d.querySelector('h2')?.textContent.trim(), desc: d.querySelector('p')?.textContent.trim(), buttons: [...d.querySelectorAll('button')].map((b) => ({ t: b.textContent.trim(), ...cs(b) })) } : null,
      overlay: cs(document.querySelector('[data-slot="dialog-overlay"]')),
      focused: document.activeElement ? { tag: document.activeElement.tagName, t: (document.activeElement.getAttribute('aria-label') || document.activeElement.textContent || '').trim().slice(0, 50), outline: `${getComputedStyle(document.activeElement).outlineStyle} ${getComputedStyle(document.activeElement).outlineWidth} ${getComputedStyle(document.activeElement).outlineColor}`, ring: getComputedStyle(document.activeElement).boxShadow.slice(0, 120) } : null,
    };
  });
}
let ctxTag = "";
async function shot(page, name, state, wait = 700) {
  const file = `${ctxTag}-${name}.png`; await page.waitForTimeout(wait);
  try { await page.screenshot({ path: OUT + file, timeout: 15000 }); }
  catch { const cdp = await page.context().newCDPSession(page); const { data } = await cdp.send("Page.captureScreenshot", { format: "png" }); writeFileSync(OUT + file, Buffer.from(data, "base64")); await cdp.detach(); state += " [via CDP: fonts-gate hung]"; }
  let m = null; try { m = await metrics(page); } catch (e) { m = { err: String(e).slice(0, 200) }; }
  manifest.frames.push({ file, head: sha, dirty, state, metrics: m });
  console.log("captured", file);
}
const names = (page) => page.locator('[data-names-direction]');
async function openNames(page) {
  await page.goto(`${BASE}/#/admin/names`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.locator('[data-names-direction], [data-admin-access]').first().waitFor({ timeout: 60000 });
  await page.waitForTimeout(2200);
}

const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
const only = process.env.ONLY;
for (const vp of VPS) for (const theme of ["light", "dark"]) {
  ctxTag = `${vp.tag}-${theme}`; if (only && only !== ctxTag) continue;
  const errs = []; const S = mkStore();
  const UDD = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/admin-names-profile";
  const ctx = await chromium.launchPersistentContext(UDD, { headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"], viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const browser = { close: async () => {} };
  ctx.on("close", () => console.log("CONTEXT-CLOSED", ctxTag, new Date().toISOString()));
  ctx.setDefaultNavigationTimeout(600000); ctx.setDefaultTimeout(60000);
  const page = ctx.pages()[0] ?? await ctx.newPage();
  await page.evaluate(() => {}).catch(() => {});
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("palette-admin-token", "dev"); } catch {} }, theme);
  await stub(page, S);
  page.on("pageerror", (e) => errs.push(`pageerror: ${String(e).slice(0, 300)}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
  const step = async (label, fn) => { try { await fn(); } catch (e) { console.log("ERR", ctxTag, label, String(e).slice(0, 300)); errs.push(`STEP-FAIL ${label}: ${String(e).slice(0, 200)}`); await page.screenshot({ path: OUT + `ERR-${ctxTag}-${label}.png`, timeout: 10000 }).catch(() => {}); } };
  await step("real-empty", async () => {
    await page.goto(`${BASE}/#/admin/names`, { waitUntil: "domcontentloaded" });
    await page.locator('[data-names-direction], [data-admin-access]').first().waitFor({ timeout: 600000 });
    await shot(page, "01-empty-pending", "REAL API (GET passthrough, token dev) · Pending · empty queue", 3000);
    await names(page).getByText(/^Approved/).first().click();
    await shot(page, "02-empty-approved", "REAL API · Approved · empty", 900);
    await names(page).getByText(/^Pending/).first().click(); await page.waitForTimeout(600);
  });
  S.real = false;
  await step("propose", async () => {
    await page.evaluate(() => { location.hash = "#/"; });
    const expand = async () => { const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await page.waitForTimeout(1200); } };
    await page.waitForTimeout(3000); await expand();
    const oci = page.getByRole("button", { name: "Open color input" }).first();
    if (!(await oci.isVisible().catch(() => false))) { await page.getByRole("button", { name: /Tools/ }).first().click({ timeout: 15000 }); await page.waitForTimeout(1500); await expand(); }
    await shot(page, "03a-dock-before-propose", "stub · home, dock expanded, before propose toggle", 300);
    await oci.click({ timeout: 15000 }); await page.waitForTimeout(800); await expand();
    await page.getByRole("button", { name: "Propose color name" }).first().click({ timeout: 10000 }); await page.waitForTimeout(800); await expand();
    const inp = page.locator('[aria-label="Propose a color name"]').first();
    await inp.click(); await page.keyboard.type("audit teal");
    await shot(page, "03-propose-mode", "stub · dock color-input propose mode, name typed", 500);
    await page.keyboard.press("Enter");
    await shot(page, "04-proposed", "stub · 1.2s after Enter (POST /colors/propose fulfilled by stub)", 1200);
  });
  await step("error-loading", async () => {
    S.mode.fail = true;
    await page.evaluate(() => { location.hash = "#/admin/names"; });
    await page.locator('[data-names-direction] [role="alert"]').first().waitFor({ timeout: 120000 });
    await shot(page, "14-error", "stub · GET /admin/queue 500 on view entry — pending error register", 800);
    S.mode.fail = false; S.mode.delay = 7000;
    await page.locator('[data-names-direction] [role="alert"] button', { hasText: "Retry" }).first().click();
    await shot(page, "15-loading", "stub · Retry clicked, /admin/queue delayed 7s — loading skeletons", 600);
    S.mode.delay = 0;
    await page.locator('[data-names-direction] .border-card-edge.rounded-md:not([data-slot])').first().waitFor({ timeout: 30000 });
  });
  await step("pending", async () => {
    await shot(page, "05-pending-populated", "stub · Pending populated (3 proposals incl. long name)", 2000);
    const row0 = names(page).locator('.border-card-edge.rounded-md').first();
    await row0.locator('button').first().hover();
    await shot(page, "06-approve-hover", "stub · Approve hovered (row 1)", 400);
    await row0.locator('button').nth(1).hover();
    await shot(page, "06b-reject-hover", "stub · Reject hovered (row 1)", 400);
    await page.mouse.move(5, 5);
    await row0.locator('button').first().focus(); await page.keyboard.press("Tab");
    await shot(page, "07-reject-keyboard-focus", "stub · Reject focused via keyboard (Tab from Approve)", 400);
  });
  await step("reject", async () => {
    const row0 = names(page).locator('.border-card-edge.rounded-md').first();
    await row0.locator('button').nth(1).click();
    await page.locator('[role="dialog"]').waitFor({ timeout: 8000 });
    await shot(page, "08-reject-confirm", "stub · Reject confirm Dialog open", 800);
    await page.locator('[role="dialog"] button', { hasText: "Reject name" }).click();
    await shot(page, "09-reject-notice", "stub · after Reject confirmed — names notice", 900);
  });
  await step("approve", async () => {
    await names(page).locator('.border-card-edge.rounded-md').first().locator('button').first().click();
    await shot(page, "10-approve-notice", "stub · Approve clicked (NO confirm) — names notice", 900);
    await shot(page, "10b-notice-after-4s", "stub · +4.3s after approve", 3400);
  });
  await step("approved", async () => {
    await names(page).getByText(/^Approved/).first().click();
    await shot(page, "11-approved-populated", "stub · Approved tab (the just-approved row)", 900);
    await names(page).locator('.border-card-edge.rounded-md').first().locator('button').first().click();
    await page.locator('[role="dialog"]').waitFor({ timeout: 8000 });
    await shot(page, "12-delete-confirm", "stub · Delete confirm Dialog open", 800);
    await page.locator('[role="dialog"] button', { hasText: "Cancel" }).click();
    await page.waitForTimeout(600);
    await names(page).locator('input').fill("zzzz");
    await shot(page, "13-filtered-empty", "stub · Approved, search 'zzzz' — filtered zero", 800);
    await names(page).locator('input').fill("");
  });
  await step("signed-out", async () => {
    const p2 = await ctx.newPage();
    await p2.addInitScript(() => { try { localStorage.removeItem("palette-admin-token"); } catch {} });
    await stub(p2, S);
    await p2.goto(`${BASE}/#/admin/names`, { waitUntil: "domcontentloaded" });
    await p2.locator('[data-admin-access], [data-names-direction]').first().waitFor({ timeout: 300000 }).catch(() => {});
    await shot(p2, "00-signed-out", "stub · new tab without admin token · route=/#/admin/names", 2500);
    await p2.close();
  });
  manifest.frames.push({ ctx: ctxTag, errors: [...new Set(errs)].slice(0, 30), stubCalls: S.calls });
  await ctx.close().catch(() => {}); await browser.close().catch(() => {});
  writeFileSync(OUT + `manifest-${ctxTag}.json`, JSON.stringify(manifest, null, 1));
}
writeFileSync(OUT + `manifest${only ? "-" + only : ""}.json`, JSON.stringify(manifest, null, 1));
