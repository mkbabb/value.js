// X audit seat · admin-tags — READ-ONLY capture.
// Phase R: REAL API, GET only (every non-GET aborted) — the true ledger as served.
// Phase S: every API call routed to an in-memory stub (create/delete never reach any DB).
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

function mkStore(empty) {
  const t = (name, category) => ({ name, category, createdAt: NOW });
  return { tags: empty ? [] : [t("warm", "mood"), t("calm", "mood"), t("moody", "mood"), t("autumn", "season"), t("winter", "season"),
    t("brand", "use"), t("ui", "use"), t("print", "use"), t("data-viz", "use"), t("an-exceedingly-long-tag-name-for-truncation", "use"), t("pastel", "")],
    mode: { fail: false, delay: 0 }, calls: [] };
}
async function stub(page, S) {
  await page.route(isApi, async (route) => {
    const u = new URL(route.request().url()); const m = route.request().method(); const p = u.pathname;
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (p.startsWith("/admin")) S.calls.push(`${m} ${p}`);
    if (S.mode.delay && p.startsWith("/admin")) await new Promise((r) => setTimeout(r, S.mode.delay));
    if (S.mode.fail && p.startsWith("/admin")) return j({ type: "urn:contract:internal", title: "Internal Server Error", status: 500, detail: "audit stub: forced failure" }, 500);
    if (p === "/admin/tags" && m === "GET") return j(S.tags);
    if (p === "/admin/tags" && m === "POST") { const b = JSON.parse(route.request().postData() || "{}"); const it = { name: b.name, category: b.category, createdAt: NOW }; S.tags.push(it); return j(it, 201); }
    let mm; if ((mm = p.match(/^\/admin\/tags\/([^/]+)$/)) && m === "DELETE") { const n = decodeURIComponent(mm[1]); S.tags = S.tags.filter((x) => x.name !== n); return j({ deleted: true }); }
    if (p === "/sessions" || p === "/sessions/login") return j({ token: "audit-token", userSlug: "audit-user" });
    if (p === "/sessions/me") return j({ userSlug: "audit-user", slug: "audit-user" });
    if (p === "/tags") return j(S.tags);
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
}
const manifest = { seat: "admin-tags", base: BASE, head: sha, dirty, captured: new Date().toISOString(), frames: [] };
async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`, bg: s.backgroundColor, color: s.color, border: `${s.borderTopWidth} ${s.borderTopColor}`, backdrop: s.backdropFilter?.slice(0, 60), cls: el.className?.toString().slice(0, 180), slot: el.getAttribute("data-slot") }; };
    const btn = document.querySelector('[aria-label="Refresh tags"]');
    const root = btn?.closest('.grid.gap-3') ?? document.querySelector('[data-admin-notice="tags"]')?.parentElement;
    const d = document.querySelector('[role="dialog"]');
    return {
      route: location.hash, docScrollW: document.documentElement.scrollWidth, vw: innerWidth,
      root: cs(root), paneHeader: [...document.querySelectorAll('h1,h2,h3')].filter((h) => h.getBoundingClientRect().width > 0).map((h) => ({ t: h.textContent.trim().slice(0, 60), ...cs(h) })).slice(0, 6),
      count: cs(root?.querySelector('.text-mono-small')), countT: root?.querySelector('.text-mono-small')?.textContent.trim(),
      refresh: cs(btn), create: cs(document.querySelector('[aria-label="Create tag"]')),
      nameInput: cs(document.querySelector('[aria-label="New tag name"]')), catInput: cs(document.querySelector('[aria-label="New tag category"]')),
      problem: document.getElementById("admin-tag-name-problem")?.hidden === false ? document.getElementById("admin-tag-name-problem").textContent : null,
      labels: root ? [...root.querySelectorAll('.section-label')].map((e) => ({ t: e.textContent.trim(), ...cs(e) })) : [],
      chips: root ? [...root.querySelectorAll('.group.rounded-full')].map((c) => ({ t: c.textContent.trim(), ...cs(c), overflowX: c.scrollWidth > c.clientWidth, x: cs(c.querySelector('button')) })) : [],
      empty: root ? [...root.querySelectorAll('[role="status"],[role="alert"],[data-admin-access]')].map((e) => ({ t: e.textContent.trim().slice(0, 160), ...cs(e) })) : [],
      notice: [...document.querySelectorAll('[data-admin-notice="tags"] > *')].map((e) => ({ t: e.textContent.trim().slice(0, 120), ...cs(e) })),
      skeletons: [...document.querySelectorAll('[aria-label="Loading tags"] > *')].map(cs).slice(0, 2),
      dialog: d ? { ...cs(d), title: d.querySelector('h2')?.textContent.trim(), desc: d.querySelector('p')?.textContent.trim(), buttons: [...d.querySelectorAll('button')].map((b) => ({ t: b.textContent.trim(), ...cs(b) })) } : null,
      overlay: cs(document.querySelector('[data-slot="dialog-overlay"]')),
      focused: document.activeElement ? { tag: document.activeElement.tagName, t: (document.activeElement.getAttribute('aria-label') || document.activeElement.textContent || '').trim().slice(0, 50), outline: `${getComputedStyle(document.activeElement).outlineStyle} ${getComputedStyle(document.activeElement).outlineWidth}`, ring: getComputedStyle(document.activeElement).boxShadow.slice(0, 140) } : null,
    };
  });
}
let ctxTag = "";
async function shot(page, name, state, wait = 700) {
  const file = `${ctxTag}-${name}.png`; await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + file });
  let m = null; try { m = await metrics(page); } catch (e) { m = { err: String(e).slice(0, 200) }; }
  manifest.frames.push({ file, head: sha, dirty, state, metrics: m });
  console.log("captured", file);
}
async function openTags(page) {
  await page.goto(`${BASE}/#/admin/tags`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.locator('[data-admin-notice="tags"]').first().waitFor({ timeout: 60000 });
  await page.waitForTimeout(2200);
}
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
const ONLY = process.env.ONLY;
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
for (const vp of VPS) for (const theme of ["light", "dark"]) {
  ctxTag = `${vp.tag}-${theme}`; if (ONLY && ONLY !== ctxTag) continue;
  const errs = []; const S = mkStore(true);
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const page = await ctx.newPage();
  await page.addInitScript(([t]) => { try { localStorage.setItem("vueuse-color-scheme", t); if (!sessionStorage.getItem("audit-init")) { localStorage.setItem("palette-admin-token", "dev"); sessionStorage.setItem("audit-init", "1"); } } catch {} }, [theme]);
  await stub(page, S);
  page.on("pageerror", (e) => errs.push(`pageerror: ${String(e).slice(0, 300)}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
  const refresh = async () => { await page.locator('[aria-label="Refresh tags"]').click(); };
  const step = async (label, fn) => { try { await fn(); } catch (e) { console.log("ERR", ctxTag, label, String(e).slice(0, 300)); manifest.frames.push({ ctx: ctxTag, err: label + ": " + String(e).slice(0, 300) }); } };
  try {
    await page.goto(`${BASE}/#/admin/tags`, { waitUntil: "commit", timeout: 300000 });
    await page.locator('[data-admin-notice="tags"]').first().waitFor({ timeout: 300000 });
    await page.waitForTimeout(3000);
  } catch (e) { console.log("ERR nav", ctxTag, String(e).slice(0, 300)); await ctx.close(); continue; }
  await step("empty", async () => { await shot(page, "01-empty", "stub · GET /admin/tags → [] · 'No tags yet.'"); });
  await step("problem", async () => { await page.locator('[aria-label="New tag name"]').fill("Bad Name!"); await shot(page, "01b-name-problem", "stub · empty · invalid name typed → preflight problem", 500); await page.locator('[aria-label="New tag name"]').fill(""); });
  await step("with", async () => { Object.assign(S, { tags: mkStore(false).tags }); await refresh(); await shot(page, "03-with-tags", "stub · 11 tags across mood/season/use/uncategorized (incl. long name)", 1200); });
  await step("hover", async () => { const chip = page.locator('.group.rounded-full').first(); await chip.hover(); await shot(page, "04-chip-hover", "stub · first chip hovered", 400);
    await chip.locator('button').hover(); await shot(page, "04b-x-hover", "stub · chip ✕ hovered", 400); await page.mouse.move(5, 5); });
  await step("focus", async () => { await page.locator('[aria-label="New tag category"]').focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await shot(page, "05-keyboard-focus", "stub · keyboard Tab ×2 from category input", 400); });
  await step("create", async () => { await page.locator('[aria-label="New tag name"]').fill("neon"); await page.locator('[aria-label="New tag category"]').fill("mood");
    await shot(page, "06-create-filled", "stub · create form filled (neon / mood)", 400);
    await page.locator('[aria-label="Create tag"]').click(); await shot(page, "07-created-notice", "stub · after create → notice", 900); });
  await step("confirm", async () => { await page.locator('[aria-label="Delete tag calm"]').click(); await page.locator('[role="dialog"]').waitFor({ timeout: 8000 });
    await shot(page, "08-delete-confirm", "stub · Delete tag? confirm Dialog open", 900);
    await page.locator('[role="dialog"] button', { hasText: "Delete tag" }).click(); await shot(page, "09-deleted-notice", "stub · after delete confirmed → notice", 900); });
  await step("error", async () => { S.mode.fail = true; await refresh(); await shot(page, "10-error", "stub · /admin/* 500 → error register (via Refresh)", 1500); S.mode.fail = false; });
  await step("loading", async () => { S.mode.delay = 5000; await refresh(); await shot(page, "11-loading", "stub · /admin/* delayed 5s → chip skeletons (via Refresh)", 300); await page.waitForTimeout(5500); S.mode.delay = 0; });
  await step("signedout", async () => { await page.evaluate(() => localStorage.removeItem("palette-admin-token")); await refresh(); await shot(page, "02-signed-out", "stub · admin token removed, Refresh → access register", 1200); });
  if (ctxTag === "1440-light") await step("real", async () => {
    await page.unrouteAll({ behavior: "ignoreErrors" }); await page.route(isApi, (r) => r.request().method() === "GET" ? r.continue() : r.abort());
    await page.evaluate(() => localStorage.setItem("palette-admin-token", "dev")); await page.reload({ waitUntil: "commit", timeout: 300000 });
    await page.locator('[data-admin-notice="tags"]').first().waitFor({ timeout: 300000 }); await shot(page, "00-real-api", "REAL API (GET only) · as served", 5000); });
  manifest.frames.push({ ctx: ctxTag, errors: [...new Set(errs)].slice(0, 25), stubCalls: [...S.calls] });
  await ctx.close();
  writeFileSync(OUT + `manifest-${ctxTag}.json`, JSON.stringify(manifest, null, 1));
}
await browser.close();
