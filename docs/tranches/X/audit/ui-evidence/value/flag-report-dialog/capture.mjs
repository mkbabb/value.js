// X audit seat · flag-report-dialog — READ-ONLY capture (API fully stubbed; the flag POST is fulfilled by the stub, never reaches a backend).
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
const remote = [
  { name: "Harbour Dusk", slug: "harbour-dusk", userSlug: ME, tags: ["ocean","dusk"], versionCount: 3, voteCount: 12, visibility: "public", tier: "standard", colors: ["#0f172a","#1e3a5f","#3b6e8f","#9cc3d5","#f2d0a9"] },
  { name: "Gallery Marigold Sunburst", slug: "gallery-marigold", userSlug: "gallery", tags: ["warm","autumn","retro"], versionCount: 1, voteCount: 12345, visibility: "public", tier: "featured", colors: ["#7c2d12","#c2410c","#f59e0b","#fde68a","#fef3c7","#365314"] },
  { name: "Quiet Moss", slug: "quiet-moss", userSlug: "someone", tags: ["green"], versionCount: 2, voteCount: 3, visibility: "public", tier: "standard", colors: ["#1a2e05","#3f6212","#84cc16","#ecfccb"] },
].map((p) => ({ ...p, colors: p.colors.map((css, position) => ({ css, position })), createdAt: NOW, updatedAt: NOW, isLocal: false, published: true, voted: false }));

const isApi = (url) => { const p = url.pathname; if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false; if (/\.\w+$/.test(p)) return false; return /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(p); };
const flagCalls = [];
let flagMode = { status: 200, delay: 0 };
async function stub(page) {
  await page.route(isApi, async (route) => {
    const u = new URL(route.request().url()); const m = route.request().method();
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (m === "POST" && /\/flag$/.test(u.pathname)) {
      flagCalls.push({ path: u.pathname, body: route.request().postData() });
      if (flagMode.delay) await new Promise((r) => setTimeout(r, flagMode.delay));
      return flagMode.status === 200 ? j({ flagged: true }) : j({ error: "Rate limited (audit stub)" }, flagMode.status);
    }
    if (m !== "GET" && !u.pathname.startsWith("/sessions")) return j({ error: "audit stub: read-only" }, 503);
    if (u.pathname === "/sessions" || u.pathname === "/sessions/login") return j({ token: "audit-token", userSlug: ME });
    if (u.pathname === "/sessions/me") return j({ userSlug: ME, slug: ME });
    if (u.pathname === "/palettes") return j({ data: remote, nextCursor: null, hasMore: false });
    if (u.pathname === "/palettes/mine") return j({ data: remote.filter((p) => p.userSlug === ME), nextCursor: null, hasMore: false });
    const one = remote.find((p) => u.pathname === `/palettes/${p.slug}`); if (one) return j(one);
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
  await page.addInitScript(() => { try { localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "audit-token"); sessionStorage.setItem("palette-session-token", "audit-token"); localStorage.removeItem("palette-admin-token"); } catch {} });
}

const manifest = { seat: "flag-report-dialog", base: BASE, head: sha, dirty, captured: new Date().toISOString(), frames: [] };
async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight} ${s.fontStyle}`, bg: s.backgroundColor, color: s.color, border: `${s.borderTopWidth} ${s.borderTopColor}`, backdrop: s.backdropFilter, shadow: s.boxShadow.slice(0, 80), outline: `${s.outlineStyle} ${s.outlineWidth}`, cls: el.className?.toString().slice(0, 200), slot: el.dataset?.slot, surface: el.dataset?.surface }; };
    const d = document.querySelector('[role="dialog"]');
    if (!d) return { dialog: null };
    return {
      dialog: cs(d),
      overlay: cs(document.querySelector('[data-slot="dialog-overlay"],[data-slot="modal-overlay"],.modal-overlay')),
      title: cs(d.querySelector('h2,[data-slot="dialog-title"]')), desc: cs(d.querySelector('p,[data-slot="dialog-description"]')),
      radios: [...d.querySelectorAll('[role="radio"]')].map((e) => ({ checked: e.getAttribute("aria-checked"), ...cs(e) })),
      labels: [...d.querySelectorAll('label')].map((e) => ({ t: e.textContent.trim(), ...cs(e) })),
      textarea: cs(d.querySelector('textarea')), textareaValue: d.querySelector('textarea')?.value,
      buttons: [...d.querySelectorAll('button')].map((b) => ({ t: b.textContent.trim() || b.getAttribute("aria-label"), disabled: b.disabled, ...cs(b) })),
      focused: document.activeElement ? { tag: document.activeElement.tagName, t: document.activeElement.textContent?.trim().slice(0, 40), ...cs(document.activeElement) } : null,
      feedback: [...document.querySelectorAll('[role="status"],[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 5),
    };
  });
}
async function shot(page, name, extra = {}) {
  const file = `${name}.png`; await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + file });
  const m = await metrics(page);
  manifest.frames.push({ file, head: sha, dirty, ...extra, metrics: m });
  console.log("captured", file, m.dialog ? `dialog ${m.dialog.w}x${m.dialog.h} r=${m.dialog.radius}` : "no dialog");
}
const card = (page, n) => page.locator(`[role="article"][aria-label="Palette: ${n}"]`).first();
async function openReport(page) {
  const c = card(page, "Gallery Marigold Sunburst"); await c.scrollIntoViewIfNeeded();
  await c.locator('button[aria-label="Palette menu"]').click();
  await page.locator('[role="menu"]').first().waitFor({ state: "visible", timeout: 8000 });
  await page.waitForTimeout(300);
  return page.locator('[role="menuitem"]', { hasText: "Report" }).first();
}

const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
for (const vp of VPS) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await stub(page);
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text().slice(0, 200)}`); });
  const sfx = `${vp.tag}-${theme}`;
  try {
    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await card(page, "Gallery Marigold Sunburst").waitFor({ timeout: 60000 }); await page.waitForTimeout(2500);
    const item = await openReport(page);
    await item.hover(); await page.waitForTimeout(250);
    await shot(page, `0-menu-report-item-${sfx}`, { state: "card menu, Report item hovered", vp: vp.tag, theme });
    await item.click(); await page.locator('[role="dialog"]').waitFor({ timeout: 8000 });
    await shot(page, `1-open-${sfx}`, { state: "open (no reason — Report disabled)", vp: vp.tag, theme });
    await page.keyboard.press("Tab"); await page.waitForTimeout(200);
    await shot(page, `1b-open-tab-focus-${sfx}`, { state: "open, one Tab", vp: vp.tag, theme });
    await page.locator('[role="dialog"] label', { hasText: "Copyright violation" }).click();
    await page.locator('[role="dialog"] textarea').click();
    await page.locator('[role="dialog"] textarea').fill("Lifted wholesale from a commercial print palette catalogue; see the 1974 swatch book.");
    await shot(page, `2-reason-selected-${sfx}`, { state: "reason selected + detail typed, textarea focused", vp: vp.tag, theme });
    await page.locator('[role="dialog"] button', { hasText: "Report" }).hover();
    await shot(page, `2b-report-hover-${sfx}`, { state: "reason selected, Report hovered", vp: vp.tag, theme });
    // pending: slow API so the in-flight state is visible
    flagMode = { status: 200, delay: 2500 };
    await page.locator('[role="dialog"] button', { hasText: "Report" }).click();
    await page.waitForTimeout(150);
    await page.screenshot({ path: OUT + `3a-submitting-${sfx}.png` });
    manifest.frames.push({ file: `3a-submitting-${sfx}.png`, head: sha, dirty, state: "submitted — request in flight (2.5s stub delay), 150ms after click", vp: vp.tag, theme, metrics: await metrics(page) });
    await page.locator('[role="dialog"]').waitFor({ state: "detached", timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(300);
    await shot(page, `3b-submitted-ok-${sfx}`, { state: "submitted — success verdict on card", vp: vp.tag, theme });
    await page.waitForTimeout(2000);
    await shot(page, `3c-submitted-ok-later-${sfx}`, { state: "submitted — +2.9s", vp: vp.tag, theme });
    // failure
    flagMode = { status: 429, delay: 0 };
    const item2 = await openReport(page); await item2.click(); await page.locator('[role="dialog"]').waitFor({ timeout: 8000 });
    await page.locator('[role="dialog"] label', { hasText: "Spam" }).click();
    await page.locator('[role="dialog"] button', { hasText: "Report" }).click();
    await page.waitForTimeout(900);
    await shot(page, `3d-submitted-fail-${sfx}`, { state: "submitted — API 429, failure verdict", vp: vp.tag, theme });
  } catch (e) { console.log("ERR", sfx, String(e).slice(0, 400)); await page.screenshot({ path: OUT + `ERR-${sfx}.png` }).catch(() => {}); }
  manifest.frames.push({ ctx: sfx, errors: errs.slice(0, 20) });
  await ctx.close();
}
manifest.flagCalls = flagCalls;
writeFileSync(OUT + "manifest.json", JSON.stringify(manifest, null, 1));
await browser.close();
