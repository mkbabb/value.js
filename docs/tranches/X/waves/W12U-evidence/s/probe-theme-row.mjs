// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-254 (mobile menu) + UIA-V-268 (@mbabb menu) falsifier (:9000). The theme row
// is a menuitemcheckbox whose aria-checked states the scheme, and selecting it flips both the
// scheme and the state. Mobile twin at 390 (Menu), desktop twin at 1440 (@mbabb).
// Usage: node probe-theme-row.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
for (const [W, H, trig] of [[390, 844, "Menu"], [1440, 900, "@mbabb"]]) {
    const phone = W < 1024;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1500);
    const c = p.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await p.waitForTimeout(1200); }
    const open = async () => { await p.getByRole("button", { name: trig }).first().click(); await p.waitForTimeout(500); };
    await open();
    const row = p.getByRole("menuitemcheckbox", { name: /Dark mode/ });
    const n = await row.count();
    const before = n ? await row.first().getAttribute("aria-checked") : null;
    const darkBefore = await p.evaluate(() => document.documentElement.classList.contains("dark"));
    if (n) await row.first().click();
    await p.waitForTimeout(500);
    const darkAfter = await p.evaluate(() => document.documentElement.classList.contains("dark"));
    const after = n ? await p.getByRole("menuitemcheckbox", { name: /Dark mode/ }).first().getAttribute("aria-checked").catch(() => null) : null;
    const ok = n === 1 && before === String(darkBefore) && darkAfter !== darkBefore && after === String(darkAfter);
    out.push(`${ok ? "PASS" : "RED "} ${W} ${trig} checkbox=${n} aria-checked ${before}→${after} dark ${darkBefore}→${darkAfter}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
