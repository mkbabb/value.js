// SERVED MODEL: claude-opus-5-5
// X.W7L.m — I-56 trap probe: reads, on the served page, (a) the colour-space
// title trigger's plate paint (SelectTrigger lost `variant="ghost"` after 7.0.0)
// (b) the PRM overlay carve-out's winning transition-duration (trap 1) and
// (c) how many value.js copies the page loads (trap 5).
// Usage: node m-trap-probe.mjs <origin> [headed]
import { chromium } from "@playwright/test";
const origin = process.argv[2] ?? "http://localhost:9000";
const headed = process.argv[3] === "headed";
const browser = await chromium.launch({ headless: !headed });
const out = {};
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(origin + "/", { waitUntil: "networkidle" });
    const t = page.locator(".space-trigger").first();
    await t.waitFor({ state: "visible", timeout: 30000 });
    const read = () => t.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { bg: cs.backgroundColor, bgImage: cs.backgroundImage, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, shadow: cs.boxShadow, radius: cs.borderTopLeftRadius, height: cs.height, padding: cs.padding, attrs: [...el.attributes].map((a) => a.name).filter((n) => /size|variant/.test(n)) };
    });
    const rest = await read();
    await t.hover();
    await page.waitForTimeout(250);
    const hover = await read();
    // (b) the carve-out: stamp a probe node with data-state="open" and read its computed transition.
    const prm = await page.evaluate(() => {
        const d = document.createElement("div");
        d.setAttribute("data-state", "open");
        document.body.appendChild(d);
        const cs = getComputedStyle(d);
        const r = { transitionDuration: cs.transitionDuration, transitionProperty: cs.transitionProperty };
        d.remove();
        return r;
    });
    // (c) trap 5: which value.js copies did the page load?
    const copies = await page.evaluate(() => {
        const urls = performance.getEntriesByType("resource").map((e) => e.name);
        return {
            nodeModulesValueJs: urls.filter((u) => u.includes("node_modules/@mkbabb/value.js")).length,
            repoDistModules: urls.filter((u) => u.includes("/Programming/value.js/dist/")).length,
            viteDepsChunks: urls.filter((u) => u.includes("/.vite/deps/")).length,
        };
    });
    out[scheme] = { rest, hover, prm, copies };
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
