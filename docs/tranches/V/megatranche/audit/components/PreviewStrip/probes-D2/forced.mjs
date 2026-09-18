/**
 * CHALLENGE-D (second seat) probe 5 — forced colors, independently re-measured.
 * Chromium (which honours the emulation; the emulation is asserted in-page
 * before anything is read).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "frames");
mkdirSync(OUT, { recursive: true });

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: "light",
        forcedColors: "active",
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const emulated = await page.evaluate(
        () => matchMedia("(forced-colors: active)").matches,
    );
    await page.locator('button[role="combobox"][aria-label="Generation preset"]').click();
    await page.waitForSelector(".preview-strip", { timeout: 8000 });
    await page.waitForTimeout(400);
    const out = await page.evaluate(() => {
        const el = document.querySelector(".preview-strip");
        const cs = getComputedStyle(el);
        const segs = [...el.children].map((c) => {
            const s = getComputedStyle(c);
            return { bg: s.backgroundColor, mask: s.maskImage, w: +c.getBoundingClientRect().width.toFixed(2) };
        });
        const r = el.getBoundingClientRect();
        return {
            forcedColorsActive: matchMedia("(forced-colors: active)").matches,
            reservedRect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
            boxShadow: cs.boxShadow,
            forcedColorAdjust: cs.forcedColorAdjust,
            distinctSegmentColors: [...new Set(segs.map((s) => s.bg))],
            segs,
            stopsHeld: (el.getAttribute("data-stops") || "").split("|").filter(Boolean).length,
        };
    });
    console.log(JSON.stringify({ emulatedAtLoad: emulated, ...out }, null, 2));
    await page.screenshot({ path: join(OUT, "forced-colors-gen-preset.png") });
    await browser.close();
}
main().catch((e) => {
    console.error("FAIL", e);
    process.exit(1);
});
