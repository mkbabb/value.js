// SERVED MODEL: claude-opus-5-5 · SS-8 B15 · CPE U-4 recon: which sliders are on #/palettes, and does one add-slot click add?
import { chromium } from "playwright";
import { open } from "../b15-seed.mjs";
const b = await chromium.launch();
try {
    const { ctx, p } = await open(b, { current: null });
    try {
        const sl = await p.evaluate(() => [...document.querySelectorAll("[role=slider]")].map((e) => ({ label: e.getAttribute("aria-label"), now: e.getAttribute("aria-valuenow"), min: e.getAttribute("aria-valuemin"), max: e.getAttribute("aria-valuemax"), vis: e.getBoundingClientRect().width > 0 })));
        const n0 = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
        const ghost = await p.evaluate(() => { const g = document.querySelector(".add-slot-ghost"); return g ? { label: g.getAttribute("aria-label"), tag: g.tagName } : null; });
        await p.locator(".add-slot-ghost").first().click(); await p.waitForTimeout(300);
        const n1 = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
        const s = p.locator("[role=slider]").nth(2); await s.focus(); await s.press("Home"); for (let k = 0; k < 9; k++) await s.press("ArrowRight");
        await p.waitForTimeout(200);
        const ghost2 = await p.evaluate(() => document.querySelector(".add-slot-ghost")?.getAttribute("aria-label"));
        await p.locator(".add-slot-ghost").first().click(); await p.waitForTimeout(300);
        const n2 = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
        console.log(JSON.stringify({ sliders: sl, n0, ghost, n1, ghost2, n2 }, null, 1));
    } finally { await ctx.close(); }
} finally { await b.close(); }
