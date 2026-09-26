// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-93 falsifier (:9000, 1440x900). A held admin token the server refuses
// (401, and 403 = the bearer compare failed) is dropped: after /admin/users loads, the stored
// token is gone and the dock offers Login again.
// Usage: node probe-admin-refused.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
for (const status of [401, 403]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme, admin: true });
    await ctx.route("**/admin/**", (r) => new URL(r.request().url()).pathname.startsWith("/admin/") ? r.fulfill({ status, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: status === 401 ? "Unauthorized" : "Forbidden", status }) }) : r.continue());
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/admin/users", { timeout: 90000 });
    await p.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(3000);
    const tok = await p.evaluate(() => localStorage.getItem("palette-admin-token"));
    const c = p.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await p.waitForTimeout(1200); }
    const login = await p.getByRole("button", { name: "Login" }).count();
    out.push(`${tok === null && login > 0 ? "PASS" : "RED "} ${status} token=${tok} loginControls=${login}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
