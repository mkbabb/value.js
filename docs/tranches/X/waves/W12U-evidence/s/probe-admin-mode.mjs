// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-59 falsifier (:9000, 1440x900). Admin gold is worn only by an
// authenticated admin on an admin-class view: logged out, /blob → / shows no gold-shimmer-icon
// in the dock; with an admin token, /admin/users shows it and a later /palettes does not.
// Usage: node probe-admin-mode.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
const gold = (p) => p.evaluate(() => document.querySelectorAll(".glass-dock .gold-shimmer-icon").length);
const visit = async (p, route) => { await p.evaluate((r) => { location.hash = r; }, route); await p.waitForTimeout(1800); };
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/", { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1500);
    await visit(p, "#/blob"); const onBlob = await gold(p);
    await visit(p, "#/"); const onHome = await gold(p);
    out.push(`${onBlob === 0 && onHome === 0 ? "PASS" : "RED "} logged-out /blob→/ gold=${onBlob}→${onHome}`);
    await ctx.close();
}
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme, admin: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/admin/users", { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(2000);
    const onAdmin = await gold(p);
    await visit(p, "#/palettes"); const onUser = await gold(p);
    out.push(`${onAdmin > 0 && onUser === 0 ? "PASS" : "RED "} admin /admin/users→/palettes gold=${onAdmin}→${onUser}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
