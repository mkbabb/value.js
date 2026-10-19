// SS-8 B04 mobile-twin witness (headless Chromium). One browser; one context per cell.
// Items: D-06 (contrast failing fraction), L-6 (drift), dead-zone, C-3 (orphan, chromium arm),
// D-08 (admin arm end-to-end, live API, real token), U-14 (200% zoom reflow).
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { boot, seed, realSession, inkContrast, out, EV } from "./lib.mjs";

const which = process.argv[2] || "all";
const s = await realSession();
const PICKS = ["oklch(0.62 0.19 25)", "oklch(0.9 0.17 100)", "oklch(0.45 0.2 265)", "oklch(0.7 0.15 150)", "oklch(0.55 0.22 320)", "oklch(0.8 0.12 200)", "oklch(0.35 0.08 60)"];
const MOB = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 };
const menuSel = "[role=menu] [role=menuitem], [role=menu] [role=menuitemcheckbox], [role=menu] a, [role=menu] .slug-pill";
const openKebab = async (page) => { const sum = page.locator(".dock-layer--summary.is-active"); if (await sum.count()) { await sum.click(); await page.waitForTimeout(700); } await page.locator(".glass-dock [aria-label=Menu]").filter({ visible: true }).first().click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(900); };
const browser = await chromium.launch();
try {
  // ── D-06 + L-6 matrix: 7 picks × 2 routes × 2 schemes, logged in (slug pill present) ──
  if (which === "all" || which === "matrix") {
    const rows = [];
    for (const dark of [false, true]) for (const route of ["#/", "#/palettes"]) for (const pick of PICKS) {
      const ctx = await browser.newContext({ ...MOB, colorScheme: dark ? "dark" : "light" });
      try {
        await seed(ctx, { dark, slug: s.userSlug, token: s.token });
        const page = await ctx.newPage();
        await boot(page, `${route}?space=oklch&color=${encodeURIComponent(pick)}`, 3000);
        try { await openKebab(page); } catch (e) { rows.push({ dark, route, pick, error: String(e).slice(0, 300), dom: await page.evaluate(() => ({ menuBtns: [...document.querySelectorAll(".glass-dock [aria-label=Menu]")].map((b) => b.getClientRects().length), layers: [...document.querySelectorAll(".glass-dock .is-active")].map((e) => e.className.toString().slice(0, 50)).slice(0, 4), dialogs: document.querySelectorAll("[role=dialog]").length })) }); continue; }
        const ink = await inkContrast(page, menuSel);
        const inst = await page.evaluate((pick) => { const m = window.__b04.insts("MobileMenuDropdown")[0]; if (!m) return null; return { prop: m.props.cssColorOpaque, menuInk: m.setupState.menuInk, singleCert: m.setupState.safeCss(pick) }; }, pick);
        rows.push({ dark, route, pick, inst, ink: ink.map((e) => ({ t: e.text.slice(0, 16), fs: e.fontSize, fw: e.fontWeight, r: e.ratio })) });
        if (pick === PICKS[0] && route === "#/") { const r = await page.evaluate(() => { const q = document.querySelector("[role=menu]").getBoundingClientRect(); return { x: q.x, y: q.y, width: q.width, height: q.height }; }); await page.screenshot({ path: `${EV}mob-menu-${dark ? "dark" : "light"}-red.png`, clip: { x: Math.max(0, r.x - 8), y: Math.max(0, r.y - 8), width: Math.min(390 - Math.max(0, r.x - 8), r.width + 16), height: r.height + 16 } }); }
      } finally { await ctx.close(); }
    }
    out("mobile-matrix.json", rows);
  }
  // ── dead-zone at the mobile twin + C-3 orphan (chromium) + focus restore ──
  if (which === "all" || which === "orphan") {
    const R = {};
    {
      const ctx = await browser.newContext(MOB);
      try {
        await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 3000); await openKebab(page);
        R.deadZone = await page.evaluate(() => { const row = [...document.querySelectorAll("[role=menu] [role=menuitem]")].find((e) => /GitHub/.test(e.innerText)); const r = row.getBoundingClientRect(); let hit = 0, n = 0; for (let i = 0; i < 20; i++) for (let j = 0; j < 5; j++) { n++; const el = document.elementFromPoint(r.x + (i + 0.5) * r.width / 20, r.y + (j + 0.5) * r.height / 5); if (el && row.contains(el)) hit++; } return { rowW: r.width, rowH: r.height, hitFraction: hit / n, anchors: row.querySelectorAll("a").length }; });
        await page.keyboard.press("Escape"); await page.waitForTimeout(500);
        R.focusAfterEscape390 = await page.evaluate(() => { const a = document.activeElement; return `${a?.tagName}|${a?.getAttribute("aria-label")}`; });
      } finally { await ctx.close(); }
    }
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      try {
        await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 3000); await openKebab(page);
        await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(1200);
        R.orphan = await page.evaluate(() => { const m = document.querySelector("[role=menu]"); const t = document.querySelector(".glass-dock [aria-label=Menu]"); const r = m?.getBoundingClientRect(); return { menuPresent: !!m, menuRect: r && [r.x, r.y, r.width, r.height].map(Math.round), menuOpacity: m && getComputedStyle(m).opacity, triggerRects: t ? t.getClientRects().length : null, triggerExpanded: t?.getAttribute("aria-expanded") }; });
        await page.screenshot({ path: `${EV}mob-orphan-after-resize-1440-chromium.png` });
        await page.keyboard.press("Escape"); await page.waitForTimeout(600);
        R.orphanAfterEscape = await page.evaluate(() => { const a = document.activeElement; return { menuPresent: !!document.querySelector("[role=menu]"), active: `${a?.tagName}|${a?.getAttribute("aria-label")}|visible=${a ? a.getClientRects().length > 0 : null}` }; });
      } finally { await ctx.close(); }
    }
    // U-14: 200 % zoom of a 1440 window = a 720 CSS-px layout viewport at DPR 2 (fine pointer)
    {
      const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
      try {
        await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 3000);
        R.zoom200 = await page.evaluate(() => { const ps = [...document.querySelectorAll(".glass-dock div.hidden")].filter((d) => d.className.includes("lg:flex")); return { profileSectionShown: ps.map((d) => d.getClientRects().length > 0), kebab: !!document.querySelector(".glass-dock [aria-label=Menu]")?.getClientRects().length, dockScrollW: document.querySelector(".glass-dock")?.scrollWidth, dockClientW: document.querySelector(".glass-dock")?.clientWidth, docOverflowX: document.documentElement.scrollWidth > innerWidth }; });
        await openKebab(page);
        R.zoom200.menuRows = await page.evaluate(() => [...document.querySelectorAll("[role=menu] [role=menuitem],[role=menu] [role=menuitemcheckbox]")].map((e) => e.innerText.trim()));
        await page.screenshot({ path: `${EV}zoom200-720-kebab.png` });
      } finally { await ctx.close(); }
    }
    out("mobile-orphan-deadzone-zoom.json", R);
  }
  // ── D-08: the admin arm end-to-end under the real admin token against the live API ──
  if (which === "all" || which === "admin") try {
    // The served dev API (scripts/dev/dev.sh) runs with its documented dev sentinel token, not api/.env's;
    // B04_ADMIN_TOKEN names the token the LIVE api accepts. Falls back to api/.env.
    const tok = process.env.B04_ADMIN_TOKEN || (readFileSync(new URL("../../../../../../../api/.env", import.meta.url), "utf8").match(/^ADMIN_TOKEN=(.*)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, "");
    const R = { tokenPresent: !!tok, steps: [] };
    const ctx = await browser.newContext(MOB);
    try {
      await seed(ctx, {}); const page = await ctx.newPage();
      const errs = await boot(page, "#/", 3000);
      const net = []; page.on("response", (r) => { if (r.url().includes(":3000")) net.push(`${r.request().method()} ${new URL(r.url()).pathname} ${r.status()}`); });
      await openKebab(page);
      R.steps.push({ before: await page.evaluate(() => [...document.querySelectorAll("[role=menu] [role=menuitem]")].map((e) => e.innerText.trim())) });
      await page.locator("[role=menu] [role=menuitem]", { hasText: "Login" }).click(); await page.waitForTimeout(800);
      const input = page.locator(".glass-dock input[aria-label='Slug or admin token']").filter({ visible: true });
      await input.fill(tok || ""); await input.press("Enter"); await page.waitForTimeout(2500);
      R.steps.push({ afterSubmit: await page.evaluate(() => ({ adminStored: !!localStorage.getItem("palette-admin-token"), slugLayerActive: !!document.querySelector(".glass-dock input[aria-label='Slug or admin token']:not([inert] *)")?.getClientRects().length, alerts: [...document.querySelectorAll("[role=alert]")].map((a) => a.textContent.trim().slice(0, 80)), fieldError: document.getElementById("slug-edit-error")?.textContent.trim().slice(0, 120) ?? null, invalid: document.querySelector(".glass-dock input[aria-label='Slug or admin token']")?.getAttribute("aria-invalid") })) });
      if (!(await page.evaluate(() => !!localStorage.getItem("palette-admin-token")))) { R.net = net; R.errs = errs.map((e) => (tok ? e.split(tok).join("<redacted>") : e)); R.halted = "admin login did not authenticate; journey stops at the submit"; out("mobile-admin-e2e.json", R); throw new Error("B04-admin-halt"); }
      await openKebab(page);
      R.steps.push({ adminMenu: await page.evaluate(() => [...document.querySelectorAll("[role=menu] [role=menuitem], [role=menu] .slug-pill")].map((e) => e.innerText.trim())) });
      await page.screenshot({ path: `${EV}mob-admin-menu-live.png` });
      await page.locator("[role=menu] [role=menuitem]", { hasText: "Sign out of admin" }).click(); await page.waitForTimeout(1200);
      R.steps.push({ afterSignOut: await page.evaluate(() => ({ adminStored: !!localStorage.getItem("palette-admin-token") })) });
      await openKebab(page);
      R.steps.push({ menuAfterSignOut: await page.evaluate(() => [...document.querySelectorAll("[role=menu] [role=menuitem]")].map((e) => e.innerText.trim())) });
      R.net = net; R.errs = errs.map((e) => (tok ? e.split(tok).join("<redacted>") : e));
    } finally { await ctx.close(); }
    out("mobile-admin-e2e.json", R);
  } catch (e) { if (String(e).includes("B04-admin-halt")) console.log("admin arm halted (recorded)"); else throw e; }
} finally { await browser.close(); }
