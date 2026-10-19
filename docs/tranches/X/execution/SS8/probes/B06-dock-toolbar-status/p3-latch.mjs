// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P3: the forced 'unavailable' latch arm (successor ApiStatusChip seat=dock).
// The API (:3000) is refused at the network layer per context, which trips the transport latch.
// One Chromium, one context per cell, closed in finally. Items: 0161 0162 0163 0164 0165.
import { chromium } from "playwright";
import { boot, renderedContrast, writeJson, EV } from "./lib.mjs";

const out = { probe: "p3-latch", at: new Date().toISOString(), cells: {} };
const SEEDS = { default: "", paleYellow: "?space=srgb&color=" + encodeURIComponent("#fff6c2"), deepNavy: "?space=srgb&color=" + encodeURIComponent("#0b0f3a") };
const refuse = (ctx) => ctx.route((u) => u.port === "3000", (r) => r.abort("connectionrefused"));
const chipInfo = (page) => page.evaluate(() => {
  const c = document.querySelector(".api-status-chip"); if (!c) return null;
  const dot = c.querySelector(".api-status-dot");
  const anims = [];
  for (const el of [c, ...c.querySelectorAll("*")]) for (const ps of [null, "::before", "::after"]) {
    const s = getComputedStyle(el, ps); if (s.animationName && s.animationName !== "none") anims.push({ el: el.className?.baseVal ?? el.className, ps, name: s.animationName, dur: s.animationDuration, iter: s.animationIterationCount });
  }
  const b = c.getBoundingClientRect(), p = document.querySelector(".glass-dock .dock-plate").getBoundingClientRect();
  const ix = Math.max(0, Math.min(b.right, p.right) - Math.max(b.left, p.left)), iy = Math.max(0, Math.min(b.bottom, p.bottom) - Math.max(b.top, p.top));
  return { role: c.getAttribute("role"), ariaLive: c.getAttribute("aria-live"), variant: c.dataset.variant, seat: c.dataset.seat, label: c.textContent.trim(), rect: [b.x, b.y, b.width, b.height].map((v) => +v.toFixed(1)), plate: [p.x, p.y, p.width, p.height].map((v) => +v.toFixed(1)), overlapArea: +(ix * iy).toFixed(1), animations: anims, dotBg: dot ? getComputedStyle(dot).backgroundColor : null, dotBorder: dot ? getComputedStyle(dot).border : null, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches };
});

const browser = await chromium.launch();
try {
  // 0162/0161/0165 — scheme x viewport x seed.
  for (const cs of ["light", "dark"]) for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844, m: true }]) for (const [sn, q] of Object.entries(SEEDS)) {
    if (vp.w === 390 && sn === "paleYellow" && cs === "dark") continue; // bounded: 11 cells
    const key = `${cs}-${vp.w}-${sn}`;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: !!vp.m, hasTouch: !!vp.m, colorScheme: cs });
    const cell = (out.cells[key] = {});
    try {
      await refuse(ctx);
      const page = await ctx.newPage();
      await boot(page, "#/" + q, 2000);
      await page.locator(".api-status-chip").waitFor({ state: "visible", timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(800);
      cell.chip = await chipInfo(page);
      if (cell.chip) cell.contrast = await renderedContrast(page, page.locator(".api-status-label").first(), { shot: sn === "default" ? `${EV}/p3-0162-chip-${cs}-${vp.w}.png` : undefined, pad: 0 });
    } finally { await ctx.close(); }
  }

  // 0161 — mid-session insertion: boot healthy, then refuse, then provoke a transport call.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const cell = (out.cells["mid-session"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/", 2500);
      cell.atBoot = await chipInfo(page);
      await page.evaluate(() => { window.__ss8m = []; new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && (n.matches?.(".api-status-chip") || n.querySelector?.(".api-status-chip"))) window.__ss8m.push({ t: performance.now(), hasText: n.textContent.trim().length > 0, role: (n.matches(".api-status-chip") ? n : n.querySelector(".api-status-chip")).getAttribute("role") }); }).observe(document.body, { childList: true, subtree: true }); });
      await refuse(ctx);
      await page.goto("http://localhost:9000/#/browse", { waitUntil: "commit" }).catch(() => {});
      await page.evaluate(() => (location.hash = "#/browse"));
      await page.locator(".api-status-chip").waitFor({ state: "visible", timeout: 20000 }).catch(() => {});
      cell.after = await chipInfo(page);
      cell.insertions = await page.evaluate(() => window.__ss8m ?? null);
    } finally { await ctx.close(); }
  }

  // 0164 — collision band 1024..1100 (fine, light), latch forced.
  for (const w of [1024, 1060, 1100]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, colorScheme: "light" });
    try {
      await refuse(ctx);
      const page = await ctx.newPage();
      await boot(page, "#/", 2000);
      await page.locator(".api-status-chip").waitFor({ state: "visible", timeout: 20000 }).catch(() => {});
      out.cells[`collide-${w}`] = { chip: await chipInfo(page), dockLayer: await page.evaluate(() => +document.querySelector(".glass-dock").getBoundingClientRect().width.toFixed(1)) };
      if (w === 1024) await page.screenshot({ path: `${EV}/p3-0164-band-1024.png`, clip: { x: 0, y: 0, width: 1024, height: 100 } });
    } finally { await ctx.close(); }
  }

  // 0163 — forced-colors (WHCM emulation) frame of the dot.
  for (const cs of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: cs, forcedColors: "active" });
    try {
      await refuse(ctx);
      const page = await ctx.newPage();
      await boot(page, "#/", 2000);
      await page.locator(".api-status-chip").waitFor({ state: "visible", timeout: 20000 }).catch(() => {});
      const info = await chipInfo(page);
      out.cells[`forced-${cs}`] = { chip: info, forced: await page.evaluate(() => matchMedia("(forced-colors: active)").matches) };
      if (info) {
        const r = info.rect;
        await page.screenshot({ path: `${EV}/p3-0163-forced-${cs}.png`, clip: { x: Math.max(0, r[0] - 6), y: Math.max(0, r[1] - 6), width: r[2] + 12, height: r[3] + 12 } });
        out.cells[`forced-${cs}`].dotPixels = await page.evaluate(() => { const d = document.querySelector(".api-status-dot"); const s = getComputedStyle(d); const b = d.getBoundingClientRect(); return { w: b.width, h: b.height, bg: s.backgroundColor, borderColor: s.borderColor, borderWidth: s.borderWidth, outline: s.outline, boxShadow: s.boxShadow, forcedColorAdjust: s.forcedColorAdjust }; });
      }
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  writeJson("p3-latch.json", out);
  console.log(JSON.stringify(out, null, 1).slice(0, 9000));
}
