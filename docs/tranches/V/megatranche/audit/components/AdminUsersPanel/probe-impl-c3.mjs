// CHALLENGE-C · C3 focused — the concurrent-expand race, SLOW-FIRST ordering.
//
// AdminUsersPanel.vue:352-365 `toggleUserExpand` writes `userPalettes.value`
// from an awaited fetch with NO request-generation guard. Interleave a slow
// expand (user A) with a fast one (user B) and the LATE response for A lands
// in the open disclosure of B.
//
//   node docs/…/AdminUsersPanel/probe-impl-c3.mjs

import { chromium, webkit } from "playwright";
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
const mkPalette = (name, slug, owner) => ({
    name, slug, userSlug: owner,
    colors: [{ css: "oklch(62% 0.19 26)", position: 0 }, { css: "oklch(72% 0.15 84)", position: 1 }],
    createdAt: "2026-07-01T10:00:00Z", updatedAt: "2026-07-01T10:00:00Z",
    isLocal: false, tier: "standard", visibility: "public",
});
const ALPHA = [mkPalette("ALPHA-PALETTE-AAA", "alpha-p-1", "alpha-keeper-0001")];
const BETA = [mkPalette("BETA-PALETTE-BBB", "beta-p-1", "beta-drifter-0002")];

const init = `localStorage.setItem('vueuse-color-scheme','light');localStorage.setItem('palette-admin-token','T');`;
const out = {};

for (const [name, launcher] of [["chromium", chromium], ["webkit", webkit]]) {
    const browser = await launcher.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await ctx.addInitScript(init);
    const deleted = [];
    await ctx.route("**/admin/users?**", (r) =>
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 2, limit: 50, offset: 0 }) }));
    await ctx.route("**/admin/palettes/*", (r) => {
        if (r.request().method() === "DELETE") { deleted.push(r.request().url()); return r.fulfill({ status: 204, body: "" }); }
        return r.continue();
    });
    await ctx.route("**/admin/users/*/palettes", async (r) => {
        const slow = r.request().url().includes("alpha-keeper-0001");
        await new Promise((res) => setTimeout(res, slow ? 1500 : 40));
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(slow ? ALPHA : BETA) });
    });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);

    const readRows = () => page.evaluate(() => {
        const rows = [...document.querySelectorAll('[role="button"][aria-expanded]')];
        return rows.map((r) => ({
            slug: (r.innerText || "").replace(/\s+/g, "").slice(0, 22),
            expanded: r.getAttribute("aria-expanded"),
            badge: [...r.querySelectorAll("span,div")].map((e) => (e.textContent || "").trim()).filter((t) => /^\d+$/.test(t)).pop() ?? null,
        }));
    });
    const readDisclosure = () => page.evaluate(() => {
        const row = document.querySelector('[role="button"][aria-expanded="true"]');
        const shell = row?.parentElement;
        return {
            openRow: (row?.innerText || "").replace(/\s+/g, "").slice(0, 22),
            disclosure: (shell?.querySelector(".border-t")?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 120),
        };
    });

    const rows = page.locator('[role="button"][aria-expanded]');
    const order = await readRows();
    // find the DOM index of alpha (slow) and beta (fast)
    const iAlpha = order.findIndex((r) => r.slug.includes("alpha"));
    const iBeta = order.findIndex((r) => r.slug.includes("beta"));

    await rows.nth(iAlpha).click();          // SLOW first
    await page.waitForTimeout(300);
    const t_afterAlphaClick = await readDisclosure();
    await rows.nth(iBeta).click();           // FAST second, alpha still in flight
    await page.waitForTimeout(500);          // beta resolved; alpha pending
    const t_betaSettled = await readDisclosure();
    await page.screenshot({ path: resolve(FRAMES, `C3b-${name}-beta-correct.png`) });
    await page.waitForTimeout(1600);         // alpha's LATE response lands
    const t_alphaLanded = await readDisclosure();
    await page.screenshot({ path: resolve(FRAMES, `C3b-${name}-beta-shows-alpha.png`) });

    // consequence: delete the mis-attributed card from BETA's open disclosure
    const badgesBefore = await readRows();
    const delBtn = page.locator('[role="button"][aria-expanded="true"]').locator("xpath=..")
        .locator(".border-t button").filter({ hasText: /^$/ });
    const allDiscButtons = await page.evaluate(() => {
        const row = document.querySelector('[role="button"][aria-expanded="true"]');
        const shell = row?.parentElement;
        return [...(shell?.querySelector(".border-t")?.querySelectorAll("button") ?? [])]
            .map((b, i) => ({ i, label: b.getAttribute("aria-label") || (b.textContent || "").trim().slice(0, 30) }));
    });

    out[name] = {
        domOrder: order.map((r) => r.slug),
        t_afterAlphaClick, t_betaSettled, t_alphaLanded,
        badgesBefore, discButtons: allDiscButtons, deletedRequests: deleted,
        RACE_REPRODUCED: t_betaSettled.openRow.includes("beta")
            && t_alphaLanded.openRow.includes("beta")
            && /ALPHA-PALETTE-AAA/.test(t_alphaLanded.disclosure),
    };
    await browser.close();
    console.log(name, "RACE_REPRODUCED =", out[name].RACE_REPRODUCED);
}

writeFileSync(resolve(HERE, "probe-impl-c3.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
