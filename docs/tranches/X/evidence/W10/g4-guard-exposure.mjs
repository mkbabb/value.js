// SERVED MODEL: claude-opus-5-5
// X.W10.d · CC-099 companion read (not the G-4 gate — G-4 is the unmodified
// prm-scroll-timeline.mjs). Reads what the demo's two reduce blocks in
// demo/styles/animations.css actually decide, before and after their carve:
// under `reduce`, a plain element's transition/animation durations (the `*`
// guard — DESIGN.md §5.6 says glass's layered guard already wins), and an
// overlay `[data-state="open"]` element's (the `@layer base` carve-out).
// One chromium headless-shell browser, one context per cell, closed in finally.
// Usage: node g4-guard-exposure.mjs   (dev server on :9000)
import { chromium } from "playwright";

const browser = await chromium.launch();
try {
    for (const rm of ["reduce", "no-preference"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
        try {
            const p = await ctx.newPage();
            await p.goto("http://localhost:9000/#/", { waitUntil: "networkidle", timeout: 45000 });
            await p.waitForTimeout(1000);
            const r = await p.evaluate(() => {
                const mk = (attrs) => {
                    const d = document.createElement("div");
                    for (const [k, v] of Object.entries(attrs)) d.setAttribute(k, v);
                    d.style.cssText =
                        "transition: transform 1s, opacity 1s; animation: lamp-dot-pulse 2s infinite";
                    document.body.append(d);
                    const cs = getComputedStyle(d);
                    const out = {
                        transitionDuration: cs.transitionDuration,
                        transitionProperty: cs.transitionProperty,
                        animationDuration: cs.animationDuration,
                        iterations: cs.animationIterationCount,
                        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
                    };
                    d.remove();
                    return out;
                };
                return { plain: mk({}), overlay: mk({ "data-state": "open" }) };
            });
            console.log(`chromium rm=${rm.padEnd(13)} plain ${JSON.stringify(r.plain)} | overlay ${JSON.stringify(r.overlay)}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
