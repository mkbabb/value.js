// CHALLENGE-D pass 2 — PR-35 binding inset/gap matrix + Card census on /#/admin/users.
import { webkit } from "@playwright/test";
import fs from "node:fs";

const DIR = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const ORIGIN = "http://localhost:9000";
const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
    { slug: "mbabb", createdAt: NOW, status: "active", paletteCount: 12 },
    { slug: "empty-ghost-account-aaaa-33", createdAt: NOW, status: "active", paletteCount: 0 },
];
const pal = (slug, name, userSlug) => ({
    name, slug, userSlug,
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    tags: [], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 0,
    visibility: "public", tier: "standard", published: true,
});

const browser = await webkit.launch();
const R = {};
for (const w of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 1440 ? 900 : 844 }, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    const page = await ctx.newPage();
    await page.route(/transport\/client\.ts/, async (route) => {
        const res = await route.fetch(); let body = await res.text();
        body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
    });
    await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } },
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, (route) => {
        const url = new URL(route.request().url());
        const m = url.pathname.match(/^\/admin\/users\/([^/]+)\/palettes$/);
        if (m) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify([pal("p-one-11aa", "OWNED-A", m[1])]) });
        if (url.pathname === "/admin/users") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    R[`arm_${w}`] = await page.evaluate(() => {
        const row = document.querySelector('div[role="button"][aria-expanded]');
        const cs = getComputedStyle(row);
        const acts = row.querySelector(".flex.items-center.shrink-0") || row.children[1];
        const ag = acts ? getComputedStyle(acts).gap : null;
        const root = getComputedStyle(document.documentElement);
        const px = (v) => v;
        return {
            rowPaddingBlock: `${cs.paddingTop} / ${cs.paddingBottom}`,
            rowPaddingInline: `${cs.paddingLeft} / ${cs.paddingRight}`,
            actionClusterGap: ag,
            listGap: getComputedStyle(row.parentElement.parentElement).gap,
            spacingToken: root.getPropertyValue("--spacing").trim() || "(unset — tailwind default 0.25rem)",
            cardShellsOnRoute: document.querySelectorAll('[data-slot="card"]').length,
            cardShellsInsideAdminPanel: (() => {
                const panel = row.closest(".grid.gap-3");
                return panel ? panel.querySelectorAll('[data-slot="card"]').length : null;
            })(),
        };
    });
    // expand a row and re-census the Cards
    await page.locator('div[role="button"][aria-expanded]').first().click();
    await page.waitForTimeout(1500);
    R[`arm_${w}_expanded`] = await page.evaluate(() => {
        const row = document.querySelector('div[role="button"][aria-expanded]');
        const panel = row.closest(".grid.gap-3");
        const cards = panel ? [...panel.querySelectorAll('[data-slot="card"]')] : [];
        return {
            cardShellsInsideAdminPanel: cards.length,
            cardTuples: cards.map((c) => ({
                size: c.getAttribute("data-size"), material: c.getAttribute("data-material"),
                tier: c.getAttribute("data-tier"), surface: c.getAttribute("data-surface"),
                classes: (c.className || "").slice(0, 90),
            })),
            nestedBoundaryDepth: (() => {
                let n = 0, e = cards[0];
                while (e && e !== document.body) { const b = getComputedStyle(e).borderTopWidth; if (parseFloat(b) > 0) n++; e = e.parentElement; }
                return n;
            })(),
            cardMenuButtons: panel ? panel.querySelectorAll('[data-slot="dropdown-menu-trigger"], button[aria-haspopup]').length : null,
        };
    });
    await ctx.close();
}
await browser.close();
fs.writeFileSync(`${DIR}/probe-D3e.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
