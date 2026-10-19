// SS-8 B04 extra pass (headless Chromium 1440): U-1 (does the Login/Profile trigger still sit on a
// wash capsule — the D-1 second layer?), U-12 (C-3 live regeneration trace: slug storage gap + live region).
// One browser; one context per cell; closes in finally.
import { chromium } from "playwright";
import { boot, seed, realSession, out } from "./lib.mjs";
const R = {};
const browser = await chromium.launch();
try {
  for (const who of ["out", "in"]) for (const dark of [false, true]) {
    const s = who === "in" ? await realSession() : null;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: dark ? "dark" : "light" });
    try {
      await seed(ctx, { dark, ...(s ? { slug: s.userSlug, token: s.token } : {}) });
      const page = await ctx.newPage(); await boot(page, "#/?space=oklch&color=" + encodeURIComponent("oklch(0.62 0.19 25)"), 3500);
      const key = `${who}-${dark ? "dark" : "light"}`;
      R[key] = { layers: await page.evaluate(() => {
        const t = [...document.querySelectorAll(".glass-dock .dock-tab-button, .glass-dock [data-o18=profile-trigger]")].find((e) => /Login|Profile/.test(e.innerText));
        if (!t) return null; const chain = [];
        for (let e = t; e && !e.classList.contains("glass-dock"); e = e.parentElement) { const cs = getComputedStyle(e); chain.push({ cls: e.className.toString().slice(0, 70), bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 60), shadow: cs.boxShadow === "none" ? "none" : "set" }); }
        const pc = []; for (const p of ["::before", "::after"]) { const cs = getComputedStyle(t, p); pc.push({ p, content: cs.content, bg: cs.backgroundColor }); }
        return { text: t.innerText.trim(), chain: chain.slice(0, 3), pseudo: pc };
      }) };
      if (who === "in") {
        await page.locator("[data-o18=profile-trigger]").click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(700);
        await page.evaluate(() => { window.__rg = { nulls: 0, samples: 0, slugs: new Set(), regions: [] }; const t0 = performance.now();
          const tick = () => { const w = window.__rg; let v = null; try { v = localStorage.getItem("palette-user-slug"); } catch {} w.samples++; if (v === null) w.nulls++; else w.slugs.add(v);
            const reg = [...document.querySelectorAll("[role=menu] [role=status],[role=menu] [role=alert],[role=menu] [aria-live]")].map((e) => `${(performance.now() - t0).toFixed(0)}ms ${e.getAttribute("role")}:${e.textContent.trim().slice(0, 60)}`); if (reg.length && w.regions.length < 4 && !w.regions.includes(reg[0])) w.regions.push(reg[0]);
            if (performance.now() - t0 < 4000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
        await page.locator("[role=menu] [role=menuitem]", { hasText: "Regenerate slug" }).click();
        await page.waitForTimeout(4300);
        R[key].regen = await page.evaluate(() => ({ samples: window.__rg.samples, nullSamples: window.__rg.nulls, slugsSeen: [...window.__rg.slugs].length, regions: window.__rg.regions, menuOpen: !!document.querySelector("[role=menu]"), dialog: !!document.querySelector("[role=dialog],[role=alertdialog]") }));
        R[key].oldSlugReplaced = (await page.evaluate(() => localStorage.getItem("palette-user-slug"))) !== s.userSlug;
      }
      out("extra.json", R);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
