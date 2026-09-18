// CHALLENGE-D pass 2 — independent reproduction of the two scope claims.
// (1) filtered prune: what the dialog promises vs what the system executes
// (2) signed-out roster: the TRUE-EMPTY plate and the inert Refresh
import { webkit } from "@playwright/test";
import fs from "node:fs";

const DIR = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const OUT = `${DIR}/frames-D3`;
const ORIGIN = "http://localhost:9000";
const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
    { slug: "mbabb", createdAt: NOW, status: "active", paletteCount: 12 },
    { slug: "empty-ghost-account-aaaa-33", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "empty-ghost-account-aaaa-77", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "empty-three-bbbb-11", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "zed", createdAt: NOW, status: "active", paletteCount: 1 },
];

async function make(browser, { token = true } = {}) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    if (token) await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    const page = await ctx.newPage();
    const net = [];
    page.on("request", (r) => { if (/\/admin\//.test(r.url())) net.push(r.method() + " " + new URL(r.url()).pathname); });
    await page.route(/transport\/client\.ts/, async (route) => {
        const res = await route.fetch(); let body = await res.text();
        body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
    });
    await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } },
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
    let pruneBody = null;
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, async (route) => {
        const req = route.request(); const url = new URL(req.url());
        if (req.method() === "POST" && url.pathname.includes("prune")) {
            pruneBody = { url: url.pathname + url.search, postData: req.postData() };
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ pruned: 3 }) });
        }
        if (url.pathname === "/admin/users") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    return { ctx, page, net, getPrune: () => pruneBody };
}

const browser = await webkit.launch();
const R = {};

// (1) filtered prune
{
    const { ctx, page, getPrune } = await make(browser);
    await page.fill('input[placeholder="Search users..."]', "aaaa-33");
    await page.waitForTimeout(700);
    R.filtered = await page.evaluate(() => ({
        headerBadge: document.querySelector('[data-slot="badge"]')?.textContent.trim(),
        toolbar: [...document.querySelectorAll("span")].map((s) => s.textContent.trim()).filter((t) => /users?$|empty$/.test(t)),
        renderedRows: document.querySelectorAll('div[role="button"][aria-expanded], .rounded-md.border.border-card-edge').length,
        renderedSlugs: [...document.querySelectorAll(".rounded-md.border.border-card-edge .slug-pill")].map((p) => p.innerText.replace(/\s+/g, "")),
    }));
    await page.click('button:has-text("Prune empty")');
    await page.waitForTimeout(600);
    R.filtered_dialog = await page.evaluate(() => document.querySelector('[role="dialog"]')?.innerText.replace(/\n+/g, " | "));
    await page.screenshot({ path: `${OUT}/K-prune-filtered-dialog.png` });
    await page.click('[role="dialog"] button:has-text("Prune")');
    await page.waitForTimeout(1500);
    R.filtered_after = await page.evaluate(() => ({
        toolbar: [...document.querySelectorAll("span")].map((s) => s.textContent.trim()).filter((t) => /Pruned|prune|users?$|empty$/.test(t)),
        renderedSlugs: [...document.querySelectorAll(".rounded-md.border.border-card-edge .slug-pill")].map((p) => p.innerText.replace(/\s+/g, "")),
    }));
    R.prune_request = getPrune();
    await page.screenshot({ path: `${OUT}/L-prune-filtered-after.png` });
    await ctx.close();
}

// (2) signed-out roster
{
    const { ctx, page, net } = await make(browser, { token: false });
    const before = net.length;
    const refresh = page.locator('button:has-text("Refresh")');
    R.signed_out = {
        adminRequestsBeforeRefresh: before,
        refreshDisabled: await refresh.isDisabled(),
        plate: await page.evaluate(() => {
            const st = document.querySelector('[role="status"]');
            return st ? st.innerText.replace(/\n+/g, " | ") : null;
        }),
        pruneDisabled: await page.locator('button:has-text("Prune empty")').isDisabled(),
    };
    await refresh.click();
    await page.waitForTimeout(1500);
    R.signed_out.adminRequestsAfterRefresh = net.length;
    R.signed_out.newRequests = net.slice(before);
    R.signed_out.plateUnchanged = await page.evaluate(() => document.querySelector('[role="status"]')?.innerText.replace(/\n+/g, " | "));
    await page.screenshot({ path: `${OUT}/M-signed-out.png` });
    await ctx.close();
}

await browser.close();
fs.writeFileSync(`${DIR}/probe-D3f.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
