// OD19 repair 2 (C2-V-01) — the settled inks after a drag. The same 41-step picker drag as latency-load, then 1.5 s
// of settle, then every root ink token the boot stamps. Run on both arms; the token sets must be equal.
// Headless shell; one browser, one context per cell, closed in finally.   usage: node r2-inks.mjs <base-url> <out.json>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const [BASE, OUT] = process.argv.slice(2);
const TOKENS = ["--accent-live", "--ink-primary", "--ink-muted", "--ink-floating-primary", "--ink-floating-muted",
    "--ink-modal-primary", "--ink-modal-muted", "--ink-modal-destructive", "--ink-destructive", "--ink-gold",
    "--ink-gold-floating", "--ink-gold-glyph", "--ink-gold-floating-glyph", "--ink-ambient-l", "--accent-view",
    "--palettes-ramp-0", "--palettes-ramp-title-0"];
const res = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of ["light-1440", "light-390", "dark-1440"]) {
        const [scheme, w] = cell.split("-");
        const ctx = await browser.newContext({ viewport: { width: +w, height: +w === 390 ? 844 : 900 }, colorScheme: scheme });
        await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
        await ctx.route(/localhost:3000/, (r) => r.abort("connectionrefused"));
        try {
            const page = await ctx.newPage();
            await page.goto(`${BASE}/#/`, { waitUntil: "load", timeout: 180_000 });
            const sl = page.locator(".channel-slider").first();
            await sl.waitFor({ timeout: 120_000 });
            await page.waitForTimeout(3000);
            await sl.scrollIntoViewIfNeeded();
            const box = await sl.boundingBox();
            const y = box.y + box.height / 2;
            await page.mouse.move(box.x + box.width * 0.2, y);
            await page.mouse.down();
            for (let i = 0; i <= 40; i++) await page.mouse.move(box.x + box.width * (0.2 + 0.6 * (i / 40)), y);
            await page.mouse.up();
            await page.waitForTimeout(1500);
            res[cell] = await page.evaluate((t) => {
                const cs = getComputedStyle(document.documentElement);
                return Object.fromEntries(t.map((n) => [n, document.documentElement.style.getPropertyValue(n) || cs.getPropertyValue(n).trim()]));
            }, TOKENS);
        } catch (e) { res[cell] = { error: String(e).slice(0, 200) }; } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
writeFileSync(OUT, JSON.stringify(res, null, 1));
console.log("ok");
