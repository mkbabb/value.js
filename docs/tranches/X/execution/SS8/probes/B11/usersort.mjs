// SS8 B11 — UserSortMenu items SS8-0335..0338 (admin users pane). Engine per argv[2] (chromium default; webkit only
// for US-6's separate WebKit cell, launched under `guarded --exclusive webkit`). One browser; one context per cell.
// The admin token is a seeded fake and every `/admin/*` API call is answered in-context (no admin write).
import { writeFileSync } from "node:fs";
import { chromium, webkit } from "playwright";
import { pixels, contrast, EV } from "./lib.mjs";
const engineName = process.argv[2] === "webkit" ? "webkit" : "chromium";
const engine = engineName === "webkit" ? webkit : chromium;
const out = {};
const USERS = Array.from({ length: 6 }, (_, i) => ({ slug: `probe-user-${i + 1}`, createdAt: "2026-10-0" + (i + 1) + "T00:00:00.000Z", paletteCount: i * 2, status: "active" }));
async function cell(browser, opt, fn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...opt });
  await ctx.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "probe-admin-token"); } catch {} });
  try {
    const page = await ctx.newPage();
    await page.route((u) => u.pathname.startsWith("/admin/") && !/\.\w+$/.test(u.pathname), (route) => {
      const p = new URL(route.request().url()).pathname;
      if (p === "/admin/users") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }) });
      if (/\/admin\/(tags|names)/.test(p)) return route.fulfill({ status: 200, contentType: "application/json", body: "[]" });
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) });
    });
    await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load", timeout: 120000 });
    await page.getByRole("button", { name: "Sort users" }).waitFor({ timeout: 60000 });
    await page.waitForTimeout(700);
    return await fn(page);
  } finally { await ctx.close(); }
}
const browser = await engine.launch();
try {
  const cells = engineName === "webkit"
    ? [["light-fine", { colorScheme: "light" }], ["dark-fine", { colorScheme: "dark" }]]
    : [["light-fine", { colorScheme: "light" }], ["dark-fine", { colorScheme: "dark" }], ["light-coarse", { colorScheme: "light", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }], ["dark-coarse", { colorScheme: "dark", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]];
  for (const [name, opt] of cells) {
    try { out[name] = await cell(browser, { deviceScaleFactor: 2, ...opt }, async (page) => {
      const btn = page.getByRole("button", { name: "Sort users" });
      const cs = await btn.evaluate((e) => { const c = getComputedStyle(e); const b = e.getBoundingClientRect(); return { cls: e.className.slice(0, 200), attrs: [...e.attributes].map((a) => a.name).filter((n) => /variant|emphasis|data-/.test(n)), bg: c.backgroundColor, bgImage: c.backgroundImage.slice(0, 60), border: `${c.borderTopStyle} ${c.borderTopWidth} ${c.borderTopColor}`, shadow: c.boxShadow.slice(0, 120), backdrop: c.backdropFilter, rect: [b.left, b.top, b.width, b.height] }; });
      const shot = await page.screenshot();
      const [x, y, w, h] = cs.rect;
      // capsule interior (a corner-ish point clear of the glyph) vs the input-bar field just left of the capsule
      const inside = await pixels(page, shot, { x: Math.round((x + 3) * 2), y: Math.round((y + h / 2) * 2), w: 1, h: 1 });
      const outside = await pixels(page, shot, { x: Math.round((x - 6) * 2), y: Math.round((y + h / 2) * 2), w: 1, h: 1 });
      const i3 = inside.data.slice(0, 3), o3 = outside.data.slice(0, 3);
      const crop = { x: Math.max(0, x - 40), y: Math.max(0, y - 12), width: w + 56, height: h + 24 };
      if (name === "light-fine" || name === "dark-fine") await page.screenshot({ path: EV + `usersort-${engineName}-${name}.png`, clip: crop });
      const r = { cs, capsulePixel: i3, fieldPixel: o3, capsuleVsField: +contrast(i3, o3).toFixed(3), maxChannelDelta: Math.max(...i3.map((v, k) => Math.abs(v - o3[k]))) };
      if (engineName === "chromium" && name.endsWith("fine")) {
        // US-12 (Chromium AX tree only — no screen reader): what the menu exposes for the three option glyphs
        await btn.click(); await page.getByRole("menu").waitFor(); await page.waitForTimeout(300);
        r.ariaSnapshot = await page.getByRole("menu").ariaSnapshot();
        const cdp = await page.context().newCDPSession(page);
        const { nodes } = await cdp.send("Accessibility.getFullAXTree");
        const radios = nodes.filter((n) => n.role?.value === "menuitemradio");
        const byId = new Map(nodes.map((n) => [n.nodeId, n]));
        r.axRadios = radios.map((n) => ({ name: n.name?.value, children: (n.childIds || []).map((c) => { const k = byId.get(c); return `${k?.role?.value}${k?.ignored ? "(ignored)" : ""}:${k?.name?.value ?? ""}`; }) }));
        await page.keyboard.press("Escape");
      }
      if (engineName === "chromium" && name.endsWith("coarse") || name === "light-fine") {
        // US-5 cure geometry: the input's width now, and with a "Sort: Newest" text capsule seated as the flex sibling
        r.us5 = await page.evaluate(() => {
          const input = document.querySelector('input[aria-label="Search users"]'); const btn = document.querySelector('[aria-label="Sort users"]');
          const before = input.getBoundingClientRect().width; const bar = input.parentElement.getBoundingClientRect().width;
          const s = document.createElement("span"); s.textContent = "Sort: Newest"; const bc = getComputedStyle(btn);
          s.style.cssText = `flex-shrink:0;font:${bc.font};padding:0 12px;height:${bc.height};display:inline-flex;align-items:center;white-space:nowrap`;
          btn.after(s); btn.style.display = "none";
          const after = input.getBoundingClientRect().width; const capsule = s.getBoundingClientRect().width;
          s.remove(); btn.style.display = "";
          return { barW: +bar.toFixed(1), inputW_iconTrigger: +before.toFixed(1), inputW_textTrigger: +after.toFixed(1), shrinkPx: +(before - after).toFixed(1), textCapsuleW: +capsule.toFixed(1), placeholderW: (() => { const c = document.createElement("canvas").getContext("2d"); c.font = getComputedStyle(input).font; return +c.measureText(input.placeholder).width.toFixed(1); })() };
        });
      }
      return r;
    }); } catch (e) { out[name] = { error: String(e.message).split("\n")[0] }; }
    writeFileSync(EV + `usersort-${engineName}.json`, JSON.stringify(out, null, 1));
  }
  // narrow admin pane width sweep for US-5 (chromium only)
  if (engineName === "chromium") for (const wpx of [320, 360, 768]) {
    try { out["us5-" + wpx] = await cell(browser, { viewport: { width: wpx, height: 800 } }, (page) => page.evaluate(() => {
      const input = document.querySelector('input[aria-label="Search users"]'); const btn = document.querySelector('[aria-label="Sort users"]');
      const before = input.getBoundingClientRect().width; const s = document.createElement("span"); s.textContent = "Sort: Newest"; const bc = getComputedStyle(btn);
      s.style.cssText = `flex-shrink:0;font:${bc.font};padding:0 12px;display:inline-flex;white-space:nowrap`; btn.after(s); btn.style.display = "none";
      const after = input.getBoundingClientRect().width; s.remove(); btn.style.display = "";
      const c = document.createElement("canvas").getContext("2d"); c.font = getComputedStyle(input).font;
      return { inputW_iconTrigger: +before.toFixed(1), inputW_textTrigger: +after.toFixed(1), placeholderW: +c.measureText(input.placeholder).width.toFixed(1) };
    })); } catch (e) { out["us5-" + wpx] = { error: String(e.message).split("\n")[0] }; }
  }
} finally { await browser.close(); }
writeFileSync(EV + `usersort-${engineName}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
