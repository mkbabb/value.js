// SS-8 B04 WebKit arm (playwright-webkit, headless; launched only via guarded --exclusive webkit).
// Items: U-13 (N-2 coarse cell, iPhone-14 descriptor), U-5 (row geometry, iPhone 14), C-3 (orphan, webkit arm),
// D-5/C-7 (focus timeline, webkit mobile arm), iOS pair (input font-size read only — hardware stays residue).
import { webkit, devices } from "playwright";
import { boot, seed, realSession, out, EV } from "./lib.mjs";
const s = await realSession();
const IP = devices["iPhone 14"];
const R = { device: { viewport: IP.viewport, dpr: IP.deviceScaleFactor, ua: IP.userAgent.slice(0, 60) } };
const kebab = async (page) => { const sum = page.locator(".dock-layer--summary.is-active"); if (await sum.count()) { await sum.click(); await page.waitForTimeout(700); } await page.locator(".glass-dock [aria-label=Menu]").filter({ visible: true }).first().click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(1000); };
const browser = await webkit.launch();
try {
  {
    const ctx = await browser.newContext({ ...IP });
    try {
      await seed(ctx, { slug: s.userSlug, token: s.token }); const page = await ctx.newPage(); await boot(page, "#/", 4000);
      R.coarse = await page.evaluate(() => ({ coarse: matchMedia("(pointer: coarse)").matches, uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale").trim(), uiGlyph: getComputedStyle(document.documentElement).getPropertyValue("--ui-glyph").trim() }));
      await kebab(page);
      R.rows = await page.evaluate(() => [...document.querySelectorAll("[role=menu] [role=menuitem],[role=menu] [role=menuitemcheckbox]")].map((e) => { const r = e.getBoundingClientRect(); return { t: e.innerText.trim().slice(0, 18), h: +r.height.toFixed(1), fs: getComputedStyle(e).fontSize, svgs: [...e.querySelectorAll("svg")].map((g) => { const q = g.getBoundingClientRect(); return `${q.width.toFixed(1)}x${q.height.toFixed(1)}`; }) }; }));
      R.chromeGlyphs = await page.evaluate(() => [...document.querySelectorAll(".glass-dock button svg")].filter((g) => g.getClientRects().length && !g.closest("[inert]")).slice(0, 6).map((g) => { const q = g.getBoundingClientRect(); return `${g.closest("button").getAttribute("aria-label") || ""}:${q.width.toFixed(1)}x${q.height.toFixed(1)}`; }));
      const r = await page.evaluate(() => { const q = document.querySelector("[role=menu]").getBoundingClientRect(); return { x: q.x, y: q.y, width: q.width, height: q.height }; });
      await page.screenshot({ path: `${EV}webkit-iphone14-kebab.png`, clip: { x: Math.max(0, r.x - 6), y: Math.max(0, r.y - 6), width: Math.min(IP.viewport.width - Math.max(0, r.x - 6), r.width + 12), height: r.height + 12 } });
    } finally { await ctx.close(); }
  }
  // D-5/C-7 webkit mobile arm ×3 cold + iOS input font read
  R.focus = [];
  for (let k = 0; k < 3; k++) {
    const ctx = await browser.newContext({ ...IP });
    try {
      await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 4000);
      await kebab(page);
      await page.evaluate(() => { window.__ft = []; addEventListener("click", () => { for (const d of [0, 16, 50, 100, 200, 400, 800, 1500]) setTimeout(() => { const a = document.activeElement; window.__ft.push(`${d}:${a?.tagName}${a?.getAttribute("aria-label") ? "[" + a.getAttribute("aria-label") + "]" : ""}${a?.getAttribute("role") ? "(" + a.getAttribute("role") + ")" : ""}`); }, d); }, { capture: true }); });
      await page.locator("[role=menu] [role=menuitem]", { hasText: "Login" }).tap();
      await page.waitForTimeout(1800);
      R.focus.push(await page.evaluate(() => window.__ft.slice(-8)));
      if (k === 0) R.inputFont = await page.evaluate(() => { const i = document.querySelector(".glass-dock input[aria-label='Slug or admin token']"); const cs = getComputedStyle(i); return { fontSize: cs.fontSize, autocapitalize: i.getAttribute("autocapitalize"), autocorrect: i.getAttribute("autocorrect") }; });
    } finally { await ctx.close(); }
  }
  // C-3 orphan, webkit arm (desktop-class window resized 390 → 1440)
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 4000); await kebab(page);
      await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(1200);
      R.orphan = await page.evaluate(() => { const m = document.querySelector("[role=menu]"); const r = m?.getBoundingClientRect(); return { menuPresent: !!m, menuRect: r && [r.x, r.y, r.width, r.height].map(Math.round), opacity: m && getComputedStyle(m).opacity }; });
      await page.screenshot({ path: `${EV}webkit-orphan-after-resize-1440.png` });
      await page.keyboard.press("Escape"); await page.waitForTimeout(600);
      R.orphanAfterEscape = await page.evaluate(() => { const a = document.activeElement; return { menuPresent: !!document.querySelector("[role=menu]"), active: `${a?.tagName}|${a?.getAttribute("aria-label")}|visible=${a ? a.getClientRects().length > 0 : null}` }; });
    } finally { await ctx.close(); }
  }
  out("webkit.json", R);
} finally { await browser.close(); }
