// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-110 falsifier (:9000, 1440x900). Browse with one OWNED remote palette and
// one foreign one: the owned card's menu offers no "Save" (the foreign card's still does), and
// selecting the owned card puts no "Save" seat in the dock's palette scene.
// Usage: node probe-owned-save.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const pal = (slug, name, userSlug) => ({ slug, name, colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }], userSlug, voteCount: 1, voted: false, isLocal: false, visibility: "public", tags: [], versionCount: 1, currentHash: "h1", createdAt: "2026-07-10T00:00:00.000Z", updatedAt: "2026-07-10T00:00:00.000Z" });
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
await prepare(ctx, { theme, user: true });
const p = await ctx.newPage();
await p.route("**/palettes?**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [pal("owned-one", "Owned One", "test-user"), pal("theirs-one", "Theirs One", "user-9-fox")], total: 2, limit: 50, offset: 0 }) }));
await p.goto("http://localhost:9000/#/browse", { timeout: 90000 });
const owned = p.getByRole("article", { name: "Palette: Owned One" });
const theirs = p.getByRole("article", { name: "Palette: Theirs One" });
await owned.waitFor({ timeout: 60000 });
await p.waitForTimeout(1000);
const menuSave = async (card) => { await card.getByRole("button", { name: "Palette menu" }).click(); await p.waitForTimeout(400); const n = await p.getByRole("menuitem", { name: /^Save/ }).count(); await p.keyboard.press("Escape"); await p.waitForTimeout(300); return n; };
const ownedMenu = await menuSave(owned);
const theirsMenu = await menuSave(theirs);
await owned.click({ position: { x: 20, y: 20 } });
await p.waitForTimeout(1200);
const c = p.locator(".glass-dock.collapsed"); if (await c.count()) { await c.click(); await p.waitForTimeout(1200); }
const tools = p.getByRole("button", { name: "Toggle action bar" }); if (await tools.count()) { await tools.first().click(); await p.waitForTimeout(900); }
const scene = await p.locator('[data-scene-action^="palette."]').count();
const seat = await p.locator('[data-scene-action$=".save"]').count();
const ok = ownedMenu === 0 && theirsMenu === 1 && scene > 0 && seat === 0;
console.log(`[${theme}]\n${ok ? "PASS" : "RED "} V-110 owned: menu Save=${ownedMenu} dock palette seats=${scene} save seat=${seat}; foreign: menu Save=${theirsMenu}`);
await b.close();
process.exit(ok ? 0 : 1);
