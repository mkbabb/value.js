// SS-8 B04 U-2 (C-1 staleness duration): flip the scheme with the ambient frozen (no drag,
// reduced motion) and sample the Profile trigger ink at +0/+1f/+600ms/+5s/+60s; reference = a
// cold boot in the target scheme at the same pick. Headless Chromium 1440, one context per cell.
import { chromium } from "playwright";
import { boot, seed, realSession, out } from "./lib.mjs";
const s = await realSession();
const PICK = "oklch(0.62 0.19 25)";
const H = `#/?space=oklch&color=${encodeURIComponent(PICK)}`;
const ink = (page) => page.evaluate(() => { const t = document.querySelector("[data-o18=profile-trigger]"); return { color: getComputedStyle(t).color, dark: document.documentElement.classList.contains("dark") }; });
const browser = await chromium.launch();
const R = { ref: {}, flips: [] };
try {
  for (const dark of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", colorScheme: dark ? "dark" : "light" });
    try { await seed(ctx, { dark, slug: s.userSlug, token: s.token }); const page = await ctx.newPage(); await boot(page, H, 3500); R.ref[dark ? "dark" : "light"] = await ink(page); } finally { await ctx.close(); }
  }
  for (const from of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", colorScheme: from ? "dark" : "light" });
    try {
      await seed(ctx, { dark: from, slug: s.userSlug, token: s.token }); const page = await ctx.newPage(); await boot(page, H, 3500);
      const F = { from: from ? "dark" : "light", before: await ink(page), samples: [] };
      await page.locator(".glass-dock .dock-dropdown-trigger", { hasText: "@mbabb" }).click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(600);
      const item = page.locator("[role=menu] [role=menuitemcheckbox]", { hasText: "Dark mode" });
      await item.click();
      F.samples.push({ t: "+0", ...(await ink(page)) });
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      F.samples.push({ t: "+1f", ...(await ink(page)) });
      await page.keyboard.press("Escape"); await page.mouse.move(700, 700);
      for (const [lab, ms] of [["+600ms", 600], ["+5s", 4400], ["+60s", 55000]]) { await page.waitForTimeout(ms); F.samples.push({ t: lab, ...(await ink(page)) }); }
      R.flips.push(F);
    } finally { await ctx.close(); }
  }
  out("flip-u2.json", R);
} finally { await browser.close(); }
