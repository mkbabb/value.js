// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-104 (saved palette) + UIA-V-111 (owned remote palette) falsifier (:9000,
// 1440x900). The card menu's Delete opens a confirm dialog and deletes NOTHING until it is
// accepted; Cancel keeps the palette; accepting deletes it (local: the card leaves; remote: the
// DELETE request fires).
// Usage: node probe-delete-confirm.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const out = [];
{   // V-104 — local saved palettes
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme, user: true, palettes: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/palettes", { timeout: 90000 });
    const cards = p.locator("[role=article]"); // CSS count: a modal dialog hides the page from the a11y tree
    await cards.first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1000);
    const n0 = await cards.count();
    await p.getByRole("button", { name: "Palette menu" }).first().click();
    await p.getByRole("menuitem", { name: /^Delete$/ }).click();
    await p.waitForTimeout(600);
    const dlg = await p.getByRole("dialog").filter({ hasText: "Delete palette?" }).count();
    const n1 = await cards.count();
    if (dlg) { await p.getByRole("dialog").getByRole("button", { name: "Cancel" }).click(); await p.waitForTimeout(500); }
    const n2 = await cards.count();
    if (dlg) {
        await p.getByRole("button", { name: "Palette menu" }).first().click();
        await p.getByRole("menuitem", { name: /^Delete$/ }).click();
        await p.getByRole("dialog").getByRole("button", { name: "Delete palette" }).click();
        await p.waitForTimeout(800);
    }
    const n3 = await cards.count();
    const ok = dlg === 1 && n1 === n0 && n2 === n0 && n3 === n0 - 1;
    out.push(`${ok ? "PASS" : "RED "} V-104 saved: dialog=${dlg} cards ${n0}→open ${n1}→cancel ${n2}→accept ${n3}`);
    await ctx.close();
}
{   // V-111 — owned remote palette on Browse
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await prepare(ctx, { theme, user: true });
    const p = await ctx.newPage();
    const OWNED = { slug: "owned-one", name: "Owned One", colors: [{ css: "#e11d48", position: 0 }], userSlug: "test-user", voteCount: 0, voted: false, isLocal: false, visibility: "public", tags: [], versionCount: 1, currentHash: "h1", createdAt: "2026-07-10T00:00:00.000Z", updatedAt: "2026-07-10T00:00:00.000Z" };
    let deletes = 0;
    await p.route("**/palettes?**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }) }));
    await p.route("**/palettes/owned-one", (r) => { if (r.request().method() === "DELETE") { deletes++; return r.fulfill({ status: 200, contentType: "application/json", body: '{"deleted":true}' }); } return r.fallback(); });
    await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
    const card = p.getByRole("article", { name: "Palette: Owned One" });
    await card.waitFor({ timeout: 60000 });
    await p.waitForTimeout(800);
    await card.getByRole("button", { name: "Palette menu" }).click();
    await p.getByRole("menuitem", { name: /^Delete$/ }).click();
    await p.waitForTimeout(700);
    const dlg = await p.getByRole("dialog").filter({ hasText: "Delete palette?" }).count();
    const d1 = deletes;
    if (dlg) { await p.getByRole("dialog").getByRole("button", { name: "Delete palette" }).click(); await p.waitForTimeout(800); }
    const ok = dlg === 1 && d1 === 0 && deletes === 1;
    out.push(`${ok ? "PASS" : "RED "} V-111 owned remote: dialog=${dlg} deletes before accept=${d1} after=${deletes}`);
    await ctx.close();
}
console.log(`[${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
