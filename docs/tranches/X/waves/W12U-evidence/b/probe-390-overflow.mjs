// SERVED MODEL: claude-opus-5-5
// X.W12U.b — the 390 containment leg read scrollWidth 406 ≠ 390 (Pixel 7,
// headless SwiftShader). Which boxes cross the right edge, at which moment?
// Usage: node probe-390-overflow.mjs [origin] (default :9000).
import { chromium, devices } from "@playwright/test";

const ORIGIN = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ ...devices["Pixel 7"], viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto(`${ORIGIN}/`);
await page.getByTestId("goo-blob-canvas").last().waitFor({ state: "attached", timeout: 60000 });
for (const t of [0, 3000, 8000]) {
    if (t) await page.waitForTimeout(t);
    const r = await page.evaluate(() => {
        const sw = document.documentElement.scrollWidth;
        const out = [];
        for (const el of document.querySelectorAll("body *")) {
            const b = el.getBoundingClientRect();
            if (b.width && b.right > innerWidth + 0.5) {
                if (el.parentElement && el.parentElement.getBoundingClientRect().right > innerWidth + 0.5) continue;
                out.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")} right=${b.right.toFixed(1)} w=${b.width.toFixed(1)}`);
            }
        }
        return { sw, out: out.slice(0, 8) };
    });
    console.log(`+${t}ms scrollWidth ${r.sw} :: ${r.out.join(" | ") || "none past the edge"}`);
}
await browser.close();
