// CHALLENGE-C re-deploy — probes for the rows the first C seat did not test.
// Runs against the LIVE :9000 dev server using the D-seat's client.ts rewrite
// (page.route on the module source) so no second dev server is needed.
//
//   node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-C2-implementation.mjs
//
// N1 aria-label on a role=generic loading container (dead accessible name)
// N2 confirm-dialog double-fire → duplicate destructive request
// N3 disclosure goes stale across Refresh (never refetched, never invalidated)
// N4 search is client-side over a 50-row window → false "No users found."
// N5 no admin token → roster reads "· roster clear · No users found."
// N6 collapse-mid-flight desync: loadingUserPalettes stranded true

import { chromium, webkit } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const FRAMES = `${OUT}/frames-C2`;
const NOW = "2026-07-05T00:00:00.000Z";

const mkUser = (slug, paletteCount) => ({ slug, createdAt: NOW, status: "active", paletteCount });

// 60 users so the roster exceeds the hard-coded limit=50 window.
const BIG = [
    ...Array.from({ length: 50 }, (_, i) => mkUser(`page-one-user-${String(i).padStart(4, "0")}`, i % 7)),
    ...Array.from({ length: 10 }, (_, i) => mkUser(`zed-offpage-user-${String(i).padStart(4, "0")}`, 3)),
];

const PAL = (slug, name) => ({
    slug, name, colors: ["#ff0000", "#00ff00"], userSlug: "x",
    createdAt: NOW, updatedAt: NOW, tier: "standard", visibility: "public", tags: [],
});

async function withPage(engine, fn, { token = "probe", state = {} } = {}) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(
        ([t]) => {
            if (t) localStorage.setItem("palette-admin-token", t);
            else localStorage.removeItem("palette-admin-token");
        },
        [token],
    );
    const page = await ctx.newPage();
    const net = [];
    const warns = [];
    page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") warns.push(m.text().slice(0, 160)); });
    page.on("request", (r) => { if (/\/admin\//.test(r.url())) net.push(`${r.method()} ${new URL(r.url()).pathname}${new URL(r.url()).search}`); });

    // Point the transport at the dev origin so the misconfig latch never trips.
    await page.route(/transport\/client\.ts/, async (r) => {
        const res = await r.fetch();
        let t = await res.text();
        t = t.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await r.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body: t });
    });
    await page.route(
        (u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } },
        (route) => state.handler(route),
    );
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) =>
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));

    const out = await fn(page, { net, warns });
    await browser.close();
    return out;
}

const J = (o) => JSON.stringify(o);
const json = (body, status = 200) => ({ status, contentType: "application/json", body: J(body) });

const results = {};

for (const [name, engine] of [["chromium", chromium], ["webkit", webkit]]) {
    const R = {};

    // ── N1 + N5 ────────────────────────────────────────────────────────────
    // N5: no admin token at all. The composable early-returns before any
    // request; the panel has no auth arm, so it renders the CLEAR-roster plate.
    R.N5_noToken = await withPage(engine, async (page, { net, warns }) => {
        await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
        await page.waitForTimeout(3500);
        const read = await page.evaluate(() => {
            const main = document.querySelector("main") ?? document.body;
            return {
                mainText: main.innerText.replace(/\s+/g, " ").slice(0, 260),
                rows: document.querySelectorAll('[role="button"][aria-expanded]').length,
                hasUnreachable: /unreachable/i.test(main.innerText),
                hasSignIn: /sign in|log in|unauthor|admin token/i.test(main.innerText),
                refreshDisabled: [...document.querySelectorAll("button")]
                    .find((b) => /Refresh/.test(b.textContent))?.disabled ?? null,
            };
        });
        // click Refresh; nothing must move
        const before = net.length;
        if (read.refreshDisabled === false) {
            await page.locator("button", { hasText: "Refresh" }).click({ timeout: 4000 }).catch(() => {});
        }
        await page.waitForTimeout(1200);
        return { ...read, adminRequestsBefore: before, adminRequestsAfterRefresh: net.length, warns: warns.slice(0, 3) };
    }, { token: null, state: { handler: (r) => r.fulfill(json({ data: [], total: 0, limit: 50, offset: 0 })) } });

    // ── N1: aria-label on the loading containers (role=generic) ────────────
    R.N1_loadingAria = await withPage(engine, async (page) => {
        await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
        // hold the roster in `loading` long enough to inspect it
        await page.waitForTimeout(2200);
        const dom = await page.evaluate(() => {
            const cands = [...document.querySelectorAll("[aria-label]")]
                .filter((e) => /^Loading/.test(e.getAttribute("aria-label")));
            return cands.map((e) => ({
                tag: e.tagName.toLowerCase(),
                role: e.getAttribute("role"),
                ariaLabel: e.getAttribute("aria-label"),
                childRoles: [...e.querySelectorAll("[role]")].map((c) => c.getAttribute("role")),
            }));
        });
        // Playwright's ARIA snapshot — its own accessible-name computation.
        const snap = await page.locator("body").ariaSnapshot().catch((e) => `ERR ${e.message}`);
        const lines = String(snap).split("\n").filter((l) => /Loading/.test(l));
        return { dom, ariaSnapshotLoadingLines: lines, snapshotMentionsLoadingUsers: /Loading users/.test(String(snap)) };
    }, { state: { handler: async (r) => { await new Promise((z) => setTimeout(z, 6000)); r.fulfill(json({ data: [], total: 0, limit: 50, offset: 0 })); } } });

    // ── N4: search over the 50-row window ──────────────────────────────────
    R.N4_search = await withPage(engine, async (page, { net }) => {
        await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
        await page.waitForTimeout(3500);
        const listReqs = net.filter((u) => u.startsWith("GET /admin/users?"));
        await page.locator('input[placeholder="Search users..."]').fill("zed-offpage");
        await page.waitForTimeout(900);
        const after = await page.evaluate(() => {
            const main = document.querySelector("main") ?? document.body;
            return {
                rows: document.querySelectorAll('[role="button"][aria-expanded]').length,
                emptyPlate: /No users found/.test(main.innerText),
                countLine: [...document.querySelectorAll("span")].map((s) => s.textContent.trim())
                    .find((t) => /^\d+ users?$/.test(t)) ?? null,
            };
        });
        return {
            serverTotal: 60, serverReturned: 50, offpageUsers: 10,
            listRequests: listReqs,
            qParamSent: listReqs.some((u) => /[?&]q=/.test(u)),
            requestsAfterTyping: net.filter((u) => u.startsWith("GET /admin/users?")).length - listReqs.length,
            afterSearch: after,
        };
    }, { state: { handler: (r) => {
        const u = new URL(r.request().url());
        if (u.pathname === "/admin/users") {
            const q = u.searchParams.get("q");
            const pool = q ? BIG.filter((x) => x.slug.includes(q)) : BIG;
            const off = Number(u.searchParams.get("offset") ?? 0);
            const lim = Number(u.searchParams.get("limit") ?? 50);
            return r.fulfill(json({ data: pool.slice(off, off + lim), total: pool.length, limit: lim, offset: off }));
        }
        return r.fulfill(json({}));
    } } });

    // ── N2 + N3 + N6 share a two-user roster ───────────────────────────────
    let paletteGen = 0;
    const twoUserHandler = (r) => {
        const u = new URL(r.request().url());
        const req = r.request();
        if (u.pathname === "/admin/users") {
            return r.fulfill(json({
                data: [mkUser("alpha-keeper-0001", 2), mkUser("beta-drifter-0002", 2)],
                total: 2, limit: 50, offset: 0,
            }));
        }
        if (/\/admin\/users\/.+\/palettes$/.test(u.pathname)) {
            const who = decodeURIComponent(u.pathname.split("/")[3]);
            const n = who.startsWith("alpha") ? paletteGen : 0;
            return r.fulfill(json([PAL(`${who}-p-1`, `${who.toUpperCase()}-GEN-${n}`)]));
        }
        if (req.method() === "DELETE") return r.fulfill(json({ deleted: true }));
        if (req.method() === "POST" && u.pathname.includes("prune")) return r.fulfill(json({ pruned: 2 }));
        return r.fulfill(json({}));
    };

    // N2 — double-click the destructive confirm button
    R.N2_doubleConfirm = await withPage(engine, async (page, { net }) => {
        await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
        await page.waitForTimeout(3500);
        await page.locator('button[aria-label="Delete user alpha-keeper-0001"]').click();
        await page.waitForTimeout(600);
        const confirmBtn = page.locator('[role="dialog"] button', { hasText: "Delete user" }).last();
        const box = await confirmBtn.boundingBox();
        const before = net.filter((x) => x.startsWith("DELETE")).length;
        // two real mouse clicks, 30 ms apart, at the same point
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(30);
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2).catch(() => {});
        await page.waitForTimeout(1500);
        return {
            deleteRequestsBefore: before,
            deleteRequests: net.filter((x) => x.startsWith("DELETE")),
            dialogStillOpen: await page.locator('[role="dialog"]').count(),
        };
    }, { state: { handler: twoUserHandler } });

    // N3 — the disclosure survives a Refresh without being refetched
    R.N3_staleAcrossRefresh = await withPage(engine, async (page, { net }) => {
        paletteGen = 1;
        await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
        await page.waitForTimeout(3500);
        await page.locator('[role="button"][aria-expanded]').filter({ hasText: "alpha" }).first().click();
        await page.waitForTimeout(1200);
        const shown = await page.evaluate(() => (document.querySelector("main") ?? document.body).innerText.replace(/\s+/g, " "));
        const gen0 = /ALPHA-KEEPER-0001-GEN-1/.test(shown);
        paletteGen = 2; // the server's truth changes
        await page.locator("button", { hasText: "Refresh" }).click();
        await page.waitForTimeout(1800);
        const after = await page.evaluate(() => {
            const main = document.querySelector("main") ?? document.body;
            const t = main.innerText.replace(/\s+/g, " ");
            return {
                stillExpanded: !!document.querySelector('[aria-expanded="true"]'),
                showsGen1: /GEN-1/.test(t),
                showsGen2: /GEN-2/.test(t),
            };
        });
        return {
            gen1Rendered: gen0,
            paletteFetches: net.filter((x) => /\/palettes/.test(x)),
            afterRefresh: after,
        };
    }, { state: { handler: twoUserHandler } });

    // N6 — collapse mid-flight, then expand the other row
    R.N6_collapseMidflight = await withPage(engine, async (page) => {
        await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
        await page.waitForTimeout(3500);
        const alpha = page.locator('[role="button"][aria-expanded]').filter({ hasText: "alpha" }).first();
        const beta = page.locator('[role="button"][aria-expanded]').filter({ hasText: "beta" }).first();
        await alpha.click();                 // expand alpha — 1500 ms fetch
        await page.waitForTimeout(250);
        await alpha.click();                 // collapse mid-flight (early return; loading NOT reset)
        await page.waitForTimeout(100);
        await beta.click();                  // expand beta — its own fetch
        await page.waitForTimeout(400);
        const midway = await page.evaluate(() => {
            const open = document.querySelector('[aria-expanded="true"]');
            const region = open?.parentElement?.querySelector(".border-t");
            return { openRow: open?.innerText.replace(/\s+/g, " ").slice(0, 30), region: region?.innerText.replace(/\s+/g, " ").slice(0, 60) };
        });
        await page.waitForTimeout(2500);
        const settled = await page.evaluate(() => {
            const open = document.querySelector('[aria-expanded="true"]');
            const region = open?.parentElement?.querySelector(".border-t");
            return { openRow: open?.innerText.replace(/\s+/g, " ").slice(0, 30), region: region?.innerText.replace(/\s+/g, " ").slice(0, 60) };
        });
        return { midway, settled };
    }, { state: { handler: (r) => {
        const u = new URL(r.request().url());
        if (u.pathname === "/admin/users") {
            return r.fulfill(json({ data: [mkUser("alpha-keeper-0001", 2), mkUser("beta-drifter-0002", 2)], total: 2, limit: 50, offset: 0 }));
        }
        if (/\/palettes$/.test(u.pathname)) {
            const who = decodeURIComponent(u.pathname.split("/")[3]);
            const delay = who.startsWith("alpha") ? 1500 : 40;
            return new Promise((z) => setTimeout(() => z(r.fulfill(json([PAL(`${who}-p-1`, `${who.toUpperCase()}-PALETTE`)]))), delay));
        }
        return r.fulfill(json({}));
    } } });

    results[name] = R;
    console.log(`\n===== ${name} =====`);
    console.log(JSON.stringify(R, null, 1));
}

writeFileSync(`${OUT}/probe-C2-implementation.json`, JSON.stringify(results, null, 1));
console.log(`\nwrote ${OUT}/probe-C2-implementation.json`);
