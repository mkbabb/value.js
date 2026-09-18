// worker-O · r3 follow-up: the D-29 fusion half on a SPLIT slug, D-32 disabled paint,
// D-24 at 390. Same signature as probe-O-r3.mjs (API fixtured; component real).
import { chromium, webkit } from "@playwright/test";
import fs from "node:fs";
const OUT = process.argv[2];
const ORIGIN = "http://localhost:9000";
const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
    { slug: "ghost-empty-1733", createdAt: NOW, status: "active", paletteCount: 3 },
    { slug: "an-extremely-long-anonymous-visitor-slug-from-the-wild-2f9a-33", createdAt: NOW, status: "active", paletteCount: 7 },
];
async function make(browser, viewport = { width: 1440, height: 900 }) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    const page = await ctx.newPage();
    await page.route(/transport\/client\.ts/, async (route) => {
        const res = await route.fetch(); let body = await res.text();
        body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
    });
    await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } },
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, async (route) => {
        const url = new URL(route.request().url());
        if (url.pathname === "/admin/users")
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 400, limit: 50, offset: 0 }) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "[]" });
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector('div[role="button"][aria-expanded]', { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(1500);
    return { ctx, page };
}
const R = {};
for (const [name, browser] of [["chromium", await chromium.launch()], ["webkit", await webkit.launch()]]) {
    const E = (R[name] = {});
    {
        const { ctx, page } = await make(browser);
        const rows = page.locator('div[role="button"][aria-expanded]');
        E.rowCount = await rows.count();
        E.aria = [];
        for (let i = 0; i < E.rowCount; i++) E.aria.push(await rows.nth(i).ariaSnapshot());
        E.rowNames = await page.evaluate(() => [...document.querySelectorAll('div[role="button"][aria-expanded]')].map((r) => {
            const pill = r.querySelector('.slug-pill');
            return { spans: [...pill.children].map((s) => s.textContent), pillText: pill.textContent,
                pillDisplay: getComputedStyle(pill).display, spanDisplay: [...pill.children].map((s) => getComputedStyle(s).display),
                badgeText: r.querySelector('[data-slot="badge"],.badge-atom')?.textContent.trim() };
        }));
        E.disabledPrune = await page.evaluate(() => {
            const b = [...document.querySelectorAll('button')].find((x) => /Prune empty/.test(x.textContent || ""));
            if (!b) return null; const cs = getComputedStyle(b);
            return { disabled: b.disabled, opacity: cs.opacity, color: cs.color, bg: cs.backgroundColor, filter: cs.filter, tabIndex: b.tabIndex };
        });
        await ctx.close();
    }
    {
        const { ctx, page } = await make(browser, { width: 390, height: 844 });
        E.mobileButtons = await page.evaluate(() => [...document.querySelectorAll('button')]
            .filter((b) => /Prune empty|Refresh|Palettes/.test(b.textContent || ""))
            .map((b) => { const r = b.getBoundingClientRect(); return { text: b.textContent.trim(), w: +r.width.toFixed(1), h: +r.height.toFixed(1), minH: getComputedStyle(b).minHeight }; }));
        E.mobileIconButtons = await page.evaluate(() => [...document.querySelectorAll('button[aria-label^="Delete user"]')]
            .map((b) => { const r = b.getBoundingClientRect(); return { label: b.getAttribute("aria-label"), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }));
        await ctx.close();
    }
    await browser.close();
}
fs.writeFileSync(OUT, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
