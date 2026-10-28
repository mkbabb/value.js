// SS-8 B04 recon: dock band + menu DOM landmarks at 1440 (logged-out, logged-in) and 390.
import { chromium } from "playwright";
import { boot, seed, realSession } from "./lib.mjs";
const s = await realSession();
const browser = await chromium.launch();
try {
  for (const cell of [{ n: "out-1440", w: 1440 }, { n: "in-1440", w: 1440, slug: s.userSlug, token: s.token }, { n: "out-390", w: 390, mobile: true }]) {
    const ctx = await browser.newContext({ viewport: { width: cell.w, height: 900 }, hasTouch: !!cell.mobile, isMobile: !!cell.mobile });
    try {
      await seed(ctx, cell);
      const page = await ctx.newPage();
      const errs = await boot(page);
      const r = await page.evaluate(() => {
        const vis = (e) => e.getClientRects().length > 0;
        const ctl = [...document.querySelectorAll(".glass-dock button, .glass-dock a, .glass-dock [role=separator], .glass-dock [data-o18]")].filter(vis).map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName}.${(e.className.baseVal ?? e.className).toString().split(" ").slice(0, 3).join(".")}|${(e.innerText || e.getAttribute("aria-label") || "").trim().slice(0, 16)}|${r.x | 0},${r.y | 0},${r.width | 0}x${r.height | 0}`; });
        return { dock: !!document.querySelector(".glass-dock"), plate: [...document.querySelectorAll(".dock-plate")].map((p) => getComputedStyle(p).backgroundColor), ctl };
      });
      console.log(cell.n, JSON.stringify(r, null, 0).slice(0, 2500), "errs", errs.length, errs.slice(0, 3));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
