// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-23 falsifier (:9000, 390x844 touch). A colour committed in one visit is
// restored from storage on the next (bare "#/" address); "Share color" must copy a link that
// carries that colour (?space=…&color=…), not the bare address.
// Usage: node probe-share.mjs [light|dark] → PASS/RED; exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, isMobile: true, hasTouch: true });
await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: "http://localhost:9000" });
await prepare(ctx, { theme });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/?space=hex&color=%23abcdef", { timeout: 90000 });
await p.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(2500); // the persistence write-through settles
const p2 = await ctx.newPage();
await p.close();
await p2.goto("http://localhost:9000/#/", { timeout: 90000 });
await p2.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 });
await p2.waitForTimeout(1500);
const addr = await p2.evaluate(() => location.href);
await p2.getByRole("button", { name: "Menu" }).first().click();
await p2.waitForTimeout(400);
await p2.getByRole("menuitem", { name: /Share color/ }).first().click();
await p2.waitForTimeout(600);
const clip = await p2.evaluate(() => navigator.clipboard.readText());
const dec = decodeURIComponent(clip).replace(/\+/g, " ");
const ok = /color=/.test(clip) && (/abcdef/i.test(dec) || /rgb\(171 205 239\)/.test(dec));
console.log(`[${theme}]\n${ok ? "PASS" : "RED "} V-23 share link carries the restored colour address="${addr}" clipboard="${clip}"`);
await b.close();
process.exit(ok ? 0 : 1);
