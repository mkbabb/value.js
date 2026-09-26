// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-519 falsifier (:9000, 390x844 touch). A successful slug sign-in from /mix
// leaves the user on /mix (it used to yank the view to Palettes).
// Usage: node probe-login-stays.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, isMobile: true, hasTouch: true });
await prepare(ctx, { theme });
await ctx.route("**/sessions/login", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t2", userSlug: "brave-quiet-amber-fox" }) }));
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/mix", { timeout: 90000 });
await p.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(1500);
await p.getByRole("button", { name: "Menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: /^Login$/ }).first().click();
await p.waitForTimeout(700);
await p.getByRole("textbox", { name: "Slug or admin token" }).first().fill("brave-quiet-amber-fox");
await p.keyboard.press("Enter");
await p.waitForTimeout(1500);
const r = await p.evaluate(() => [location.hash, localStorage.getItem("palette-user-slug")]);
const ok = r[0].startsWith("#/mix") && r[1] === "brave-quiet-amber-fox";
console.log(`[${theme}]\n${ok ? "PASS" : "RED "} V-519 sign-in keeps the view hash=${r[0]} slug=${r[1]}`);
await b.close();
process.exit(ok ? 0 : 1);
