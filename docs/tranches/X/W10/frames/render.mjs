// SERVED MODEL: claude-opus-5-5
// X-W10 design-gate frames renderer (COHESION §0k.2). One headless-shell browser for the
// whole pass, one context per frame, every context and the browser closed in `finally`.
// Run only through the guard:
//   ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/X/W10/frames/render.mjs
// Writes canon-frames-<width>.png (+ a light and a dark arm) beside this file.
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const src = pathToFileURL(join(here, "canon-frames.html")).href;
const cells = [
    { width: 390, height: 844, scheme: "light" },
    { width: 1280, height: 900, scheme: "light" },
    { width: 390, height: 844, scheme: "dark" },
    { width: 1280, height: 900, scheme: "dark" },
];

const browser = await chromium.launch({ headless: true });
try {
    for (const cell of cells) {
        const context = await browser.newContext({
            viewport: { width: cell.width, height: cell.height },
            deviceScaleFactor: 1,
            colorScheme: cell.scheme,
            reducedMotion: "reduce",
        });
        try {
            const page = await context.newPage();
            await page.goto(src, { waitUntil: "load" });
            if (cell.scheme === "dark") {
                await page.evaluate(() => document.documentElement.classList.add("dark"));
            }
            await page.evaluate(() => document.fonts.ready);
            const failed = await page.evaluate(() =>
                [...document.styleSheets].filter((s) => {
                    try { return s.href && s.cssRules.length === 0; } catch { return true; }
                }).map((s) => s.href),
            );
            const out = join(here, `canon-frames-${cell.width}-${cell.scheme}.png`);
            await page.screenshot({ path: out, fullPage: true });
            console.log(`${cell.width}x${cell.height} ${cell.scheme} -> ${out} emptySheets=${failed.length}`);
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
