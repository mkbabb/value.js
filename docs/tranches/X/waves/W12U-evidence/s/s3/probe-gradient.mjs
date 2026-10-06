// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · /gradient falsifier (:9000):
//   605  every easing interval rests closed on arrival (no open row's ramp/specimens/rail pushing the CSS output down)
// Usage: node probe-gradient.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { timeout: 90000 });
await p.locator("main .interval-head").first().waitFor({ timeout: 30000 });
await p.waitForTimeout(800);
const r = await p.evaluate(() => ({
    heads: document.querySelectorAll("main .interval-head").length,
    open: [...document.querySelectorAll("main .interval-head")].filter((h) => h.getAttribute("aria-expanded") === "true").length,
    ramps: [...document.querySelectorAll('main [role="img"]')].filter((e) => /Eased ramp for interval/.test(e.getAttribute("aria-label") ?? "") && e.getBoundingClientRect().height > 0).length,
}));
const ok = r.heads > 0 && r.open === 0 && r.ramps === 0;
console.log(`[${W}x${H} ${theme}]\n${ok ? "PASS" : "RED "} 605 ${JSON.stringify(r)}`);
await b.close();
process.exit(ok ? 0 : 1);
