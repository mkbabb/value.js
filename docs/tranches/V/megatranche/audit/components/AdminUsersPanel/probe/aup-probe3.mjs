/**
 * AdminUsersPanel — CHALLENGE-C probe 3.
 * G1 wrong-owner accounting after the expand race · G2 discarded server total ·
 * G3 skeleton aria-label on a role-less div (Chromium AX tree).
 * Read-only against a private vite (VITE_API_URL=http://localhost:9124).
 */
import { chromium, webkit } from "playwright";
const ENGINE = process.argv[2] ?? "chromium";
const ONLY = process.argv[3] ?? "all";
const BASE = "http://localhost:9124";
const NOW = "2026-07-05T00:00:00.000Z";
const CORS = {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "authorization,content-type",
    "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = console.log;
const pal = (slug, name, userSlug) => ({
    name, slug, userSlug,
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    tags: [], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 0,
    visibility: "public", tier: "standard", published: true,
});
const AZURE = [pal("azure-one-11aa", "AZURE ONE", "azure-fox-01")];
const CRIMSON = [pal("crimson-one-99zz", "CRIMSON ONE", "crimson-owl-77")];

async function boot(browser, opts = {}) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "tok"));
    const page = await ctx.newPage();
    await page.route("**/sessions", (r) =>
        r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body: '{"token":"t","userSlug":"u"}' }));
    await page.route("**/admin/**", async (route) => {
        const u = new URL(route.request().url()); const m = route.request().method();
        if (!u.pathname.startsWith("/admin/")) return route.continue();
        if (m === "OPTIONS") return route.fulfill({ status: 204, headers: CORS, body: "" });
        const json = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", headers: CORS, body: b });
        opts.onCall?.(m, u.pathname);
        if (m === "DELETE") return json('{"deleted":true}', 204);
        const pm = u.pathname.match(/^\/admin\/users\/([^/]+)\/palettes$/);
        if (pm) {
            const d = opts.delay?.[pm[1]] ?? 0; if (d) await sleep(d);
            return json(JSON.stringify(pm[1] === "azure-fox-01" ? AZURE : CRIMSON));
        }
        if (u.pathname === "/admin/users") {
            const users = opts.users ?? [
                { slug: "azure-fox-01", createdAt: NOW, paletteCount: 4 },
                { slug: "crimson-owl-77", createdAt: NOW, paletteCount: 1 },
            ];
            if (opts.usersDelay) await sleep(opts.usersDelay);
            return json(JSON.stringify({ data: users, total: opts.total ?? users.length, limit: 50, offset: 0 }));
        }
        return json('{"data":[],"total":0,"limit":50,"offset":0}');
    });
    await page.goto(`${BASE}/#/admin/users`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("main");
    if (!opts.noSettle) await sleep(2500);
    return { ctx, page };
}

const badges = (page) => page.evaluate(() =>
    [...document.querySelectorAll('main [role="button"][aria-expanded]')].map((r) => {
        const t = r.innerText.replace(/\n/g, "");
        return t.replace(/Palettes$/, "");
    }));

// G1 — the race leaks azure's palette into crimson's region; deleting it there
//      debits CRIMSON's count and calls DELETE on AZURE's palette.
async function G1(browser) {
    const calls = [];
    const { ctx, page } = await boot(browser, { delay: { "azure-fox-01": 1500, "crimson-owl-77": 30 }, onCall: (m, p) => calls.push(`${m} ${p}`) });
    log("  G1 badges before:", JSON.stringify(await badges(page)));
    await page.getByText("azure-fox-01", { exact: false }).first().click();
    await sleep(100);
    await page.getByText("crimson-owl-77", { exact: false }).first().click();
    await sleep(2200);
    const shown = await page.locator("main").innerText();
    log("  G1 crimson row expanded; palette shown =", /AZURE ONE/.test(shown) ? "AZURE ONE (azure-fox-01's)" : "crimson's own");
    // delete the leaked palette from inside crimson's region
    const del = page.locator('main button[aria-label*="Delete"], main button[title*="Delete"]');
    const n = await del.count();
    let clicked = false;
    for (let i = 0; i < n; i++) {
        const lbl = await del.nth(i).getAttribute("aria-label");
        if (lbl && /azure-one|palette/i.test(lbl)) { await del.nth(i).click({ force: true }); clicked = true; break; }
    }
    log("  G1 admin-delete affordance found in the expanded region:", clicked, "| candidates:", n);
    if (clicked) {
        await sleep(400);
        const dlgBtn = page.getByRole("button", { name: /Delete/ }).last();
        await dlgBtn.click({ force: true }).catch(() => {});
        await sleep(900);
        log("  G1 DELETE calls:", JSON.stringify(calls.filter((c) => c.startsWith("DELETE"))));
        log("  G1 badges after:", JSON.stringify(await badges(page)));
    }
    await ctx.close();
}

// G2 — the server's `total` is discarded; the header counts only what loaded.
async function G2(browser) {
    const users = Array.from({ length: 50 }, (_, i) => ({ slug: `user-${String(i).padStart(3, "0")}`, createdAt: NOW, paletteCount: i % 3 }));
    const { ctx, page } = await boot(browser, { users, total: 1372 });
    const head = (await page.locator("main").innerText()).split("\n").slice(0, 6).join(" | ");
    log("  G2 server said total=1372, limit=50 → panel header:", JSON.stringify(head));
    const empties = users.filter((u) => !u.paletteCount).length;
    log("  G2 rows rendered:", await page.locator('main [role="button"][aria-expanded], main .slug-pill').count());
    log("  G2 emptyCount computed over the loaded page only:", empties, "of an unknown corpus-wide total");
    log("  G2 pagination controls in the panel:", await page.locator("main").getByRole("button", { name: /Next|Prev|Page/ }).count());
    await ctx.close();
}

// G3 — <div aria-label="Loading users"> has no role: name-prohibited generic.
async function G3(browser) {
    const { ctx, page } = await boot(browser, { usersDelay: 6000, noSettle: true });
    await sleep(1200);
    const dom = await page.evaluate(() => {
        const d = document.querySelector('main div[aria-label="Loading users"]');
        return d ? { present: true, role: d.getAttribute("role"), ariaLive: d.getAttribute("aria-live"), ariaBusy: d.getAttribute("aria-busy") } : { present: false };
    });
    log("  G3 DOM:", JSON.stringify(dom));
    if (ENGINE === "chromium") {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Accessibility.enable");
        const { nodes } = await cdp.send("Accessibility.getFullAXTree");
        const hits = nodes.filter((n) => JSON.stringify(n.name ?? {}).includes("Loading users"));
        log("  G3 Chromium AX nodes whose computed NAME is 'Loading users':", hits.length, JSON.stringify(hits.map(h=>({role:h.role?.value, ignored:h.ignored, name:h.name?.value, live:h.properties?.find(p=>p.name==="live")?.value?.value}))));
        const gen = nodes.filter((n) => n.role?.value === "generic" && n.ignored === false).length;
        log("  G3 (AX tree has", nodes.length, "nodes;", gen, "unignored generics)");
    }
    await ctx.close();
}

const P = { G1, G2, G3 };
const browser = await (ENGINE === "webkit" ? webkit : chromium).launch();
for (const [k, fn] of Object.entries(P)) {
    if (ONLY !== "all" && ONLY !== k) continue;
    log(`\n== ${ENGINE} ${k} ==`);
    try { await fn(browser); } catch (e) { log("  !!", e.message.split("\n")[0]); }
}
await browser.close();
