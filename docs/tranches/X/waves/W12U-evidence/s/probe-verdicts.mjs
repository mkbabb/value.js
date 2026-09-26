// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-107 falsifier (:9000, 1440x900). On Browse (one owned palette, vote and
// unpublish refused 500): vote, then ~1 s later Make private. The second verdict must still be
// on the inspector rail 2.2 s after it appeared (the first verdict's timer used to kill it).
// Usage: node probe-verdicts.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const OWNED = { slug: "owned-one", name: "Owned One", colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }], userSlug: "test-user", voteCount: 3, voted: false, isLocal: false, visibility: "public", tags: [], versionCount: 2, currentHash: "h2", createdAt: "2026-07-10T00:00:00.000Z", updatedAt: "2026-07-10T00:00:00.000Z" };
const PROBLEM = { status: 500, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Server exploded", status: 500 }) };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
await prepare(ctx, { theme, user: true });
const p = await ctx.newPage();
await p.route("**/palettes?**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }) }));
await p.route("**/palettes/owned-one/vote", (r) => r.request().method() === "POST" ? r.fulfill(PROBLEM) : r.fallback());
await p.route("**/palettes/owned-one/unpublish", (r) => r.request().method() === "POST" ? r.fulfill(PROBLEM) : r.fallback());
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
const card = p.getByRole("article", { name: "Palette: Owned One" });
await card.waitFor({ timeout: 60000 });
await p.waitForTimeout(1000);
await card.getByRole("button", { name: /votes/ }).click();
await p.getByRole("status").filter({ hasText: "Vote failed" }).first().waitFor({ timeout: 8000 });
await p.waitForTimeout(900);
await card.getByRole("button", { name: "Palette menu" }).click();
await p.getByRole("menuitem", { name: /Make private/ }).click();
const second = p.getByRole("status").filter({ hasText: "Unpublish failed" }).first();
await second.waitFor({ timeout: 8000 });
await p.waitForTimeout(2200);
const still = await second.isVisible().catch(() => false);
console.log(`[${theme}]\n${still ? "PASS" : "RED "} V-107 the second verdict outlives the first's timer visible@+2.2s=${still}`);
await b.close();
process.exit(still ? 0 : 1);
