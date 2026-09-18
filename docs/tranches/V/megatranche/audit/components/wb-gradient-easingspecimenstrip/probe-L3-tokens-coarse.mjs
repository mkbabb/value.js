// CHALLENGE-L r3 — radius token census + coarse-pointer tile box.
// Proves: (a) two live :root declarations of --radius (0.625rem theme vs 0.25rem
// tailwind-stock in glass's components.css, the latter winning), so --radius-input
// measures 4px; (b) the orphaned glass-chip coarse-pointer floor never lands —
// the tile stays 45.2 x 43.8 (< --touch-target 44px) on a touch matrix.
// Run: node probe-L3-tokens-coarse.mjs   (dev server on :9000)
import { webkit } from "playwright";
const browser = await webkit.launch();
async function probe(ctxOpts, tag) {
    const context = await browser.newContext(ctxOpts);
    const page = await context.newPage();
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.waitForSelector("#easing-interval-0", { timeout: 25000 });
    await page.waitForTimeout(2500);
    const out = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        const tok = (n) => cs.getPropertyValue(n).trim();
        const row = document.querySelector("#easing-interval-0");
        const tiles = [...(row?.querySelectorAll(".specimen-tile") ?? [])];
        const b = tiles[0]?.getBoundingClientRect();
        const decls = [];
        const walk = (rules, href) => {
            for (const rule of rules) {
                if (rule.cssRules) walk(rule.cssRules, href);
                if (rule.style && rule.selectorText && /:root|^html$/.test(rule.selectorText)) {
                    const v = rule.style.getPropertyValue("--radius");
                    if (v) decls.push({ sel: rule.selectorText.slice(0, 40), v: v.trim(), href: String(href || "inline").slice(-60) });
                }
            }
        };
        for (const s of document.styleSheets) { try { walk(s.cssRules, s.href); } catch {} }
        return {
            tokens: Object.fromEntries(["--radius","--radius-sm","--radius-md","--radius-lg","--radius-xl","--radius-2xl","--radius-card","--radius-input","--radius-button","--radius-strip","--radius-field","--radius-panel","--touch-target"].map((n) => [n, tok(n)])),
            radiusDecls: decls,
            tileBox: b ? { w: +b.width.toFixed(1), h: +b.height.toFixed(1) } : null,
            tileRadius: tiles[0] ? getComputedStyle(tiles[0]).borderRadius : null,
            coarse: matchMedia("(pointer: coarse)").matches,
        };
    });
    console.log(tag, JSON.stringify(out, null, 1));
    await context.close();
}
await probe({ viewport: { width: 1440, height: 1000 } }, "DESKTOP");
await probe({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }, "MOBILE");
await browser.close();
