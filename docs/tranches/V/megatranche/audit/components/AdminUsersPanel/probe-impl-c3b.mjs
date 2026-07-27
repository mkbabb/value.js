// CHALLENGE-C · C3b — the race's DATA-INTEGRITY consequence.
//
// After the C3 race leaves ALPHA's palette rendered inside BETA's open
// disclosure, the card's admin delete emits
//   adminDeleteUserPalette(palette /* owner = alpha */, user.slug /* = beta */)
// (AdminUsersPanel.vue:150). useAdminUsers.ts:118-121 then decrements the
// paletteCount of the WRONG user. This probe measures the badge deltas.
//
//   node docs/…/AdminUsersPanel/probe-impl-c3b.mjs

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames-impl");
mkdirSync(FRAMES, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9077";

const USERS = [
    { slug: "alpha-keeper-0001", createdAt: "2026-07-01T10:00:00Z", status: "active", paletteCount: 4 },
    { slug: "beta-drifter-0002", createdAt: "2026-07-02T10:00:00Z", status: "active", paletteCount: 2 },
];
const p = (name, slug, owner) => ({
    name, slug, userSlug: owner,
    colors: [{ css: "oklch(62% 0.19 26)", position: 0 }, { css: "oklch(72% 0.15 84)", position: 1 }],
    createdAt: "2026-07-01T10:00:00Z", updatedAt: "2026-07-01T10:00:00Z",
    isLocal: false, tier: "standard", visibility: "public", published: true,
});
const ALPHA = [p("ALPHA-PALETTE-AAA", "alpha-p-1", "alpha-keeper-0001")];
const BETA = [p("BETA-PALETTE-BBB", "beta-p-1", "beta-drifter-0002")];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
await ctx.addInitScript(`localStorage.setItem('vueuse-color-scheme','light');localStorage.setItem('palette-admin-token','T');`);
const deleteReqs = [];
await ctx.route("**/admin/users?**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 2, limit: 50, offset: 0 }) }));
await ctx.route("**/admin/palettes/**", (r) => {
    // SERVER-TRUE shape: api/src/modules/admin/routes/palettes.ts:41 → 200 {deleted:true}
    // (NOT the 204 the repo's own e2e fixture invents at admin-populated.ts:154).
    if (r.request().method() === "DELETE") { deleteReqs.push(r.request().url()); return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ deleted: true }) }); }
    return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
});
await ctx.route("**/admin/users/*/palettes", async (r) => {
    const slow = r.request().url().includes("alpha-keeper-0001");
    await new Promise((res) => setTimeout(res, slow ? 1500 : 40));
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(slow ? ALPHA : BETA) });
});
const page = await ctx.newPage();
await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

const badges = () => page.evaluate(() =>
    [...document.querySelectorAll('[role="button"][aria-expanded]')].map((r) => {
        const slug = (r.querySelector(".slug-pill")?.textContent || "").replace(/\s+/g, "");
        // the count Badge is the sibling right after the slug-pill
        const b = r.querySelector(".slug-pill")?.nextElementSibling;
        return { slug, badge: (b?.textContent || "").trim() };
    }));

const rows = page.locator('[role="button"][aria-expanded]');
const order = await page.evaluate(() =>
    [...document.querySelectorAll('[role="button"][aria-expanded]')].map((r) => (r.innerText || "").replace(/\s+/g, "")));
const iAlpha = order.findIndex((s) => s.includes("alpha"));
const iBeta = order.findIndex((s) => s.includes("beta"));

const out = { badgesAtBoot: await badges() };

await rows.nth(iAlpha).click();
await page.waitForTimeout(300);
await rows.nth(iBeta).click();
await page.waitForTimeout(2200);            // beta settled, then alpha's late write lands

out.afterRace = await page.evaluate(() => {
    const row = document.querySelector('[role="button"][aria-expanded="true"]');
    return {
        openRow: (row?.innerText || "").replace(/\s+/g, "").slice(0, 20),
        disclosure: (row?.parentElement?.querySelector(".border-t")?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 90),
    };
});

// drive the card's admin delete inside BETA's disclosure
await page.getByRole("button", { name: "Palette menu" }).first().click();
await page.waitForTimeout(600);
out.menuItems = await page.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"]')].map((m) => (m.textContent || "").trim()));
await page.getByRole("menuitem", { name: /Delete \(admin\)/ }).first().click();
await page.waitForTimeout(1400);
out.badgesAfterDelete = await badges();
out.deleteRequests = deleteReqs;
await page.screenshot({ path: resolve(FRAMES, "C3b-consequence-badges.png") });

out.VERDICT = {
    deletedSlugInUrl: deleteReqs.map((u) => u.split("/").pop()),
    betaBadgeBefore: out.badgesAtBoot.find((b) => b.slug.includes("beta"))?.badge,
    betaBadgeAfter: out.badgesAfterDelete.find((b) => b.slug.includes("beta"))?.badge,
    alphaBadgeBefore: out.badgesAtBoot.find((b) => b.slug.includes("alpha"))?.badge,
    alphaBadgeAfter: out.badgesAfterDelete.find((b) => b.slug.includes("alpha"))?.badge,
};
writeFileSync(resolve(HERE, "probe-impl-c3b.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
