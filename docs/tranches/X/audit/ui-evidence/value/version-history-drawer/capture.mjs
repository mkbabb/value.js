// X audit seat · version-history-drawer — READ-ONLY capture (API fully stubbed; no writes reach any backend).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const REPO = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${REPO} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${REPO} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const ME = "test-user";
const NOW = "2026-09-20T00:00:00.000Z";
const ago = (h) => new Date(Date.parse(NOW) - h * 3600e3).toISOString();

const col = (a) => a.map((css, position) => ({ css, position }));
// Server contract (api/src/modules/palette/routes/versions.ts:52): list `hash` = RELEASE id (_id);
// the row also carries `payloadHash`; Palette.currentHash = PAYLOAD hash (service/versions.ts:231).
const hdVersions = [
  { hash: "rel-hd-4", payloadHash: "pay-hd-4", name: "Harbour Dusk", colors: col(["#0f172a","#1e3a5f","#3b6e8f","#9cc3d5","#f2d0a9"]), createdAt: ago(2) },
  { hash: "rel-hd-3", payloadHash: "pay-hd-3", name: "Harbour Dusk", colors: col(["#0f172a","#1e3a5f","#3b6e8f","#9cc3d5"]), createdAt: ago(30) },
  { hash: "rel-hd-2", payloadHash: "pay-hd-2", name: "Harbour at Dusk (draft)", colors: col(["#111827","#1e3a5f","#60a5fa","#bfdbfe","#fde68a","#fca5a5","#a78bfa","#34d399","#f472b6","#fb923c"]), createdAt: ago(200) },
  { hash: "rel-hd-1", payloadHash: "pay-hd-1", name: "Harbour", colors: col(["#0f172a","#334155"]), createdAt: ago(900), forkedFromHash: "a1b2c3d4e5f60718" },
].map((v) => ({ parentHash: null, forkedFromHash: null, authorSlug: ME, paletteSlug: "harbour-dusk", rootHash: "rel-hd-1", depth: 0, ...v }));
const galVersions = Array.from({ length: 20 }, (_, i) => ({ hash: `rel-g-${24 - i}`, payloadHash: `pay-g-${24 - i}`, name: "Gallery Marigold Sunburst",
  colors: col(["#7c2d12","#c2410c","#f59e0b","#fde68a","#fef3c7","#365314"].slice(0, 3 + (i % 4))), createdAt: ago(5 + i * 20),
  parentHash: null, forkedFromHash: null, authorSlug: "gallery", paletteSlug: "gallery-marigold", rootHash: "rel-g-1", depth: 0 }));

const remote = [
  { name: "Harbour Dusk", slug: "harbour-dusk", userSlug: ME, tags: ["ocean","dusk"], versionCount: 4, voteCount: 12, visibility: "public", tier: "standard", currentHash: "pay-hd-4",
    colors: ["#0f172a","#1e3a5f","#3b6e8f","#9cc3d5","#f2d0a9"] },
  { name: "Gallery Marigold Sunburst", slug: "gallery-marigold", userSlug: "gallery", tags: ["warm","retro"], versionCount: 24, voteCount: 120, visibility: "public", tier: "featured", currentHash: "pay-g-24",
    colors: ["#7c2d12","#c2410c","#f59e0b","#fde68a","#fef3c7","#365314"] },
  { name: "Quiet Moss", slug: "quiet-moss", userSlug: ME, tags: ["green"], versionCount: 2, voteCount: 3, visibility: "public", tier: "standard", currentHash: "pay-qm-2",
    colors: ["#1a2e05","#3f6212","#84cc16","#ecfccb"] },
].map((p) => ({ ...p, colors: col(p.colors), createdAt: NOW, updatedAt: NOW, isLocal: false, published: true, voted: false }));

const isApi = (url) => {
  const p = url.pathname;
  if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false;
  if (/\.\w+$/.test(p)) return false;
  return /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(p);
};

async function stub(page, opts) {
  await page.route(isApi, async (route) => {
    const u = new URL(route.request().url());
    const m = route.request().method();
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (u.pathname === "/sessions" || u.pathname === "/sessions/login") return j({ token: "audit-token", userSlug: ME });
    if (u.pathname === "/sessions/me") return j({ userSlug: ME, slug: ME });
    const vm = u.pathname.match(/^\/palettes\/([^/]+)\/versions$/);
    if (vm && m === "GET") {
      if (opts.slowVersions) await new Promise((r) => setTimeout(r, 6000));
      if (vm[1] === "harbour-dusk") return j({ data: hdVersions, total: 4, limit: 20, offset: 0 });
      if (vm[1] === "gallery-marigold") return j({ data: galVersions, total: 24, limit: 20, offset: 0 });
      return j({ data: [], total: 0, limit: 20, offset: 0 });
    }
    const rm = u.pathname.match(/^\/palettes\/([^/]+)\/revert$/);
    if (rm && m === "POST") {
      if (opts.revertFail) return j({ error: "Forbidden: not the owner" }, 403);
      const body = JSON.parse(route.request().postData() || "{}");
      const src = hdVersions.find((v) => v.hash === body.hash) ?? hdVersions[1];
      // stub mirror of service/versions.ts:191-234 — currentHash = content hash; versionCount+1
      return j({ ...remote[0], name: src.name, colors: src.colors, currentHash: src.payloadHash + "-r", versionCount: 5, updatedAt: new Date().toISOString() });
    }
    if (m !== "GET") return j({ error: "audit stub: read-only" }, 503);
    if (u.pathname === "/palettes") return j({ data: remote, nextCursor: null, hasMore: false });
    if (u.pathname === "/palettes/mine") return j({ data: remote.filter((p) => p.userSlug === ME), nextCursor: null, hasMore: false });
    const one = remote.find((p) => u.pathname === `/palettes/${p.slug}`);
    if (one) return j(one);
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
  await page.addInitScript(() => {
    try {
      localStorage.setItem("palette-user-slug", "test-user");
      localStorage.setItem("palette-user-token", "audit-token");
      sessionStorage.setItem("palette-session-token", "audit-token");
      localStorage.removeItem("palette-admin-token");
    } catch {}
  });
}

const manifest = { seat: "version-history-drawer", base: BASE, head: sha, dirty, captured: new Date().toISOString(), frames: [] };

async function metrics(page) {
  return page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: s.borderRadius, font: `${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`, bg: s.backgroundColor, border: s.border, color: s.color, pad: s.padding, opacity: s.opacity, backdrop: s.backdropFilter, cls: el.className?.toString().slice(0, 200) }; };
    const dlg = document.querySelector('[role="dialog"]');
    if (!dlg) return { dialog: null };
    const rows = [...dlg.querySelectorAll(".group.relative")];
    return {
      dialog: cs(dlg), placement: dlg.getAttribute("data-placement"),
      title: cs(dlg.querySelector("h2")), titleText: dlg.querySelector("h2")?.textContent?.trim(),
      desc: cs(dlg.querySelector("p")), descText: dlg.querySelector("p")?.textContent?.trim().replace(/\s+/g, " "),
      rows: rows.slice(0, 3).map((r) => ({ ...cs(r), text: r.textContent.trim().replace(/\s+/g, " ").slice(0, 120),
        swatch: cs(r.querySelector(".rounded-full")), btn: cs(r.querySelector("button")) })),
      rowCount: rows.length, currentMarked: rows.filter((r) => /\(current\)/.test(r.textContent)).length,
      revertButtons: rows.filter((r) => r.querySelector("button")).length,
      loadMore: cs([...dlg.querySelectorAll("button")].find((b) => /Load older/.test(b.textContent))),
      close: cs(dlg.querySelector('button[aria-label*="lose"], button:has(.sr-only)')),
      spinner: !!dlg.querySelector(".animate-spin"), bodyText: dlg.innerText.slice(0, 300),
      scrollH: dlg.querySelector(".overflow-y-auto")?.scrollHeight, clientH: dlg.querySelector(".overflow-y-auto")?.clientHeight,
      overlay: cs(document.querySelector('[data-slot="dialog-overlay"], .modal-overlay, [data-state="open"][aria-hidden]')),
      activeEl: document.activeElement?.outerHTML?.slice(0, 160),
      verdicts: [...document.querySelectorAll('[role="status"],[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 5),
    };
  });
}

async function shot(page, name, extra = {}) {
  const file = `${name}.png`;
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + file });
  const m = await metrics(page);
  manifest.frames.push({ file, head: sha, dirty, ...extra, metrics: m });
  console.log("captured", file, "rows", m.rowCount, "current", m.currentMarked, "revertBtns", m.revertButtons);
}
async function card(page, name) { return page.locator(`[role="article"][aria-label="Palette: ${name}"]`).first(); }
async function openVersions(page, name) {
  const c = await card(page, name);
  await c.scrollIntoViewIfNeeded();
  await c.locator('button[aria-label="Palette menu"]').click();
  await page.locator('[role="menu"]').first().waitFor({ state: "visible", timeout: 8000 });
  await page.locator('[role="menuitem"]', { hasText: "Versions" }).first().click();
  await page.locator('[role="dialog"]').first().waitFor({ state: "visible", timeout: 8000 });
}
async function closeAll(page) { await page.keyboard.press("Escape"); await page.waitForTimeout(500); }

const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
for (const vp of VPS) for (const theme of ["light", "dark"]) for (const mode of ["main", "slow", "revertFail"]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await stub(page, { slowVersions: mode === "slow", revertFail: mode === "revertFail" });
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
  const sfx = `${vp.tag}__${theme}`;
  try {
    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await (await card(page, "Harbour Dusk")).waitFor({ timeout: 60000 });
    await page.waitForTimeout(2500);
    if (mode === "main") {
      await openVersions(page, "Harbour Dusk");
      await shot(page, `open-versions__${sfx}`, { state: "open with versions (owned, 4 versions)", vp: vp.tag, theme });
      const row2 = page.locator('[role="dialog"] .group.relative').nth(1);
      if (vp.w >= 600) { await row2.hover(); } else { await row2.tap().catch(() => {}); }
      await shot(page, `row-hover__${sfx}`, { state: "row hover/tap → Revert affordance", vp: vp.tag, theme });
      // keyboard focus walk
      await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
      await shot(page, `focus__${sfx}`, { state: "keyboard focus (Tab x2 inside drawer)", vp: vp.tag, theme });
      await row2.hover().catch(() => {});
      await row2.locator("button", { hasText: "Revert" }).click({ force: true });
      await page.waitForTimeout(900);
      await shot(page, `restore-after__${sfx}`, { state: "restore (revert) succeeded — drawer after", vp: vp.tag, theme });
      await closeAll(page);
      await page.waitForTimeout(600);
      await shot(page, `restore-closed__${sfx}`, { state: "after restore, drawer closed → card verdict", vp: vp.tag, theme });
      await openVersions(page, "Quiet Moss");
      await page.waitForTimeout(600);
      await shot(page, `empty-history__${sfx}`, { state: "empty history (versions list returns 0)", vp: vp.tag, theme });
      await closeAll(page);
      await openVersions(page, "Gallery Marigold Sunburst");
      await shot(page, `other-user-24__${sfx}`, { state: "other user's palette, 24 versions (paging)", vp: vp.tag, theme });
      await page.locator('[role="dialog"] .overflow-y-auto').first().evaluate((e) => e.scrollTo(0, e.scrollHeight));
      await shot(page, `load-more__${sfx}`, { state: "scrolled to end → Load older versions", vp: vp.tag, theme });
      await closeAll(page);
    } else if (mode === "slow") {
      await openVersions(page, "Harbour Dusk");
      await page.waitForTimeout(300);
      await page.screenshot({ path: OUT + `loading__${sfx}.png` });
      manifest.frames.push({ file: `loading__${sfx}.png`, head: sha, dirty, state: "loading (versions request pending)", vp: vp.tag, theme, metrics: await metrics(page) });
      console.log("captured loading", sfx);
    } else {
      await openVersions(page, "Harbour Dusk");
      await page.waitForTimeout(600);
      const row2 = page.locator('[role="dialog"] .group.relative').nth(1);
      await row2.hover().catch(() => {});
      await row2.locator("button", { hasText: "Revert" }).click({ force: true });
      await page.waitForTimeout(900);
      await shot(page, `restore-error__${sfx}`, { state: "restore failed (403) — drawer", vp: vp.tag, theme });
      await closeAll(page);
      await shot(page, `restore-error-closed__${sfx}`, { state: "restore failed — drawer closed → card verdict", vp: vp.tag, theme });
    }
  } catch (e) {
    console.log("FAIL", sfx, mode, String(e).slice(0, 400));
    await page.screenshot({ path: OUT + `fail-${sfx}-${mode}.png` }).catch(() => {});
    manifest.frames.push({ file: `fail-${sfx}-${mode}.png`, error: String(e).slice(0, 400) });
  }
  if (errs.length) manifest.frames.push({ pageErrors: errs, ctx: `${sfx}-${mode}` });
  await ctx.close();
}
await browser.close();
writeFileSync(OUT + "manifest.json", JSON.stringify(manifest, null, 1));
console.log("done", sha, dirty);
