// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · a frame of the Report dialog: node shot-flag.mjs <w> <h> <theme> <out.png>
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H, theme, outp] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4], process.argv[5]];
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, browse: "ok" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForTimeout(2500);
await p.getByRole("button", { name: "Palette menu" }).nth(1).click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: "Report" }).click();
await p.waitForTimeout(900);
await p.screenshot({ path: outp });
await b.close();
