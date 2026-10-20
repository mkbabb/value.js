// SS-8 · B19 — R-15: sampleInterpolationRamp(k = Infinity) wall-clock.
// Runs the call in a dedicated renderer; records crash / still-running at a 200 s cap.
// Run ONLY under guarded with a tight --rss-gb (the loop allocates without bound).
import { launch, cell, save, go } from "./lib.mjs";
const FS = "/@fs/Users/mkbabb/Programming/value.js/demo";
const CAP_MS = 200_000;
const browser = await launch();
let out;
try {
    out = await cell(browser, {}, async (page) => {
        await go(page, "atmosphere");
        await page.evaluate(async (FS) => { window.__S = await import(`${FS}/shared/ui/color-chips/sample.ts`); }, FS);
        let crashed = null;
        const t0 = Date.now();
        page.on("crash", () => { crashed = Date.now() - t0; });
        const call = page.evaluate(() => { const r = window.__S.sampleInterpolationRamp(["oklch(62% 0.2 30deg)", "oklch(70% 0.15 250deg)"], "oklch", "shorter", Infinity); return r.length; }).then((n) => ({ returned: n, at: Date.now() - t0 }), (e) => ({ rejected: String(e).slice(0, 200), at: Date.now() - t0 }));
        const timer = new Promise((r) => setTimeout(() => r({ capReached: CAP_MS }), CAP_MS));
        const res = await Promise.race([call, timer]);
        return { ...res, crashedAtMs: crashed };
    });
} finally {
    await browser.close();
}
save("probe-inf.json", out);
console.log(JSON.stringify(out));
