// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · frame of the Browse Filters panel (UIA-V-32/306/309/559/560) at <w>×<h> <theme>.
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H, theme, outp] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4], process.argv[5]];
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, user: true, browse: "ok" });
await ctx.route("**/tags*", (r) => r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" },
    body: JSON.stringify(["moody", "pastel", "duotone", "earthy", "neon", "muted", "vintage", "tropical", "monochrome", "warm", "cool", "retro"].map((name, i) => ({ id: `t${i}`, name, category: "mood", createdAt: "2026-07-05T00:00:00.000Z" }))) }));
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
await p.waitForTimeout(2500);
await p.getByRole("button", { name: "Filters" }).first().click();
await p.waitForTimeout(400);
await p.locator("[role=dialog]").getByText("Featured", { exact: true }).click({ timeout: 4000 }).catch(() => {});
await p.waitForTimeout(600);
await p.screenshot({ path: outp });
await b.close();
