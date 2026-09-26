// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · a frame of a seeded route: node shot-route.mjs <route> <w> <h> <theme> <out.png> [palettes|browse|both]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [route, W, H, theme, outp, seed = "both"] = [process.argv[2], Number(process.argv[3]), Number(process.argv[4]), process.argv[5], process.argv[6], process.argv[7]];
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, palettes: seed !== "browse", browse: seed !== "palettes" ? "ok" : null });
const p = await ctx.newPage();
await p.goto(`http://localhost:9000/#/${route}`, { timeout: 90000 });
await p.waitForTimeout(2500);
await p.locator("[role=article]").first().scrollIntoViewIfNeeded().catch(() => {});
await p.waitForTimeout(500);
await p.screenshot({ path: outp });
await b.close();
