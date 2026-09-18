/**
 * AdminUsersPanel — CHALLENGE-C implementation probe.
 * Read-only: drives the LIVE dev server at http://localhost:9000 with route
 * interception. No source is modified.
 *
 * Usage: node aup-probe.mjs <chromium|webkit> <probeId>
 */
import { chromium, webkit } from "playwright";

const ENGINE = process.argv[2] ?? "chromium";
const PROBE = process.argv[3] ?? "all";
const BASE = process.env.AUP_BASE ?? "http://localhost:9124";
const NOW = "2026-07-05T00:00:00.000Z";

const USERS = [
    { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
    { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    { slug: "verdant-mole-33", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
    { slug: "empty-ghost-aa", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
];

function pal(slug, name, userSlug) {
    return {
        name, slug, userSlug,
        colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
        tags: [], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 0,
        visibility: "public", tier: "standard", published: true,
    };
}
const AZURE = [pal("azure-one-11aa", "AZURE ONE", "azure-fox-01"), pal("azure-two-22bb", "AZURE TWO", "azure-fox-01")];
const CRIMSON = [pal("crimson-one-99zz", "CRIMSON ONE", "crimson-owl-77")];

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "authorization,content-type", "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS", "access-control-max-age": "0" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);

async function boot(browser, opts = {}) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    if (opts.admin !== false) {
        await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
    }
    const page = await ctx.newPage();
    page.on("pageerror", (e) => log("  [pageerror]", e.message));
    page.on("console", (m) => { if (m.type() === "error") log("  [console.error]", m.text()); });
    page.on("weberror", (e) => log("  [weberror]", e.error().message));

    await page.route("**/sessions", (r) =>
        r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body: JSON.stringify({ token: "t", userSlug: "test-user" }) }));

    await page.route("**/admin/**", async (route) => {
        const req = route.request();
        const url = new URL(req.url());
        if (!url.pathname.startsWith("/admin/")) return route.continue();
        if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: CORS, body: "" });
        const json = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", headers: CORS, body: b });
        const method = req.method();
        opts.onCall?.(method, url.pathname);

        if (method === "POST" && url.pathname.includes("prune-empty")) {
            if (opts.pruneStatus && opts.pruneStatus !== 200) return json(JSON.stringify({ error: "boom" }), opts.pruneStatus);
            return json(JSON.stringify({ pruned: opts.pruned ?? 1 }));
        }
        if (method === "DELETE") return json(JSON.stringify({ deleted: true, palettesDeleted: 0 }));
        if (url.pathname.match(/^\/admin\/users\/[^/]+\/palettes$/)) {
            const slug = url.pathname.split("/")[3];
            if (opts.palettesStatus && opts.palettesStatus !== 200) {
                return json(JSON.stringify({ error: "roster subsystem down" }), opts.palettesStatus);
            }
            const delay = opts.palettesDelay?.[slug] ?? 0;
            if (delay) await sleep(delay);
            return json(JSON.stringify(slug === "azure-fox-01" ? AZURE : CRIMSON));
        }
        if (url.pathname === "/admin/users") {
            return json(JSON.stringify({ data: opts.users ?? USERS, total: opts.total ?? (opts.users ?? USERS).length, limit: 50, offset: 0 }));
        }
        return json(JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }));
    });

    await page.goto(`${BASE}/#/admin/users`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("main", { timeout: 20000 });
    await sleep(2500);
    return { ctx, page };
}

const panelText = (page) => page.locator("main").innerText();

// ── R1 · unauthenticated roster costumes as EMPTY ─────────────────────────────
async function R1(browser) {
    const calls = [];
    const { ctx, page } = await boot(browser, { admin: false, onCall: (m, p) => calls.push(`${m} ${p}`) });
    const t = await panelText(page);
    log("  R1 text/head:", JSON.stringify(t.split("\n").slice(0, 8).join(" | ")));
    log("  R1 admin API calls on load:", JSON.stringify(calls));
    log("  R1 shows 'No users found.':", t.includes("No users found."));
    log("  R1 shows any error/retry:", /unreachable|Retry/i.test(t));
    // press Refresh
    const before = calls.length;
    await page.getByRole("button", { name: /Refresh/ }).first().click();
    await sleep(1200);
    log("  R1 Refresh -> new admin API calls:", calls.length - before, JSON.stringify(calls.slice(before)));
    const t2 = await panelText(page);
    log("  R1 text unchanged after Refresh:", t === t2);
    await ctx.close();
}

// ── R2 · nested palette load FAILS -> 'No palettes.' (error costumes as empty) ─
async function R2(browser) {
    const { ctx, page } = await boot(browser, { palettesStatus: 500 });
    await page.getByText("azure-fox-01", { exact: false }).first().click();
    await sleep(1500);
    const t = await panelText(page);
    const seg = t.split("\n").filter((l) => /palette|None pinned|·/i.test(l)).slice(0, 10);
    log("  R2 after 500 on /palettes:", JSON.stringify(seg.join(" | ")));
    log("  R2 shows 'No palettes.':", t.includes("No palettes."));
    log("  R2 shows any error affordance:", /unreachable|Retry|failed|error/i.test(t));
    await ctx.close();
}

// ── R3 · expand RACE: slow first request overwrites the second user's list ────
async function R3(browser) {
    const { ctx, page } = await boot(browser, {
        palettesDelay: { "azure-fox-01": 1500, "crimson-owl-77": 50 },
    });
    await page.getByText("azure-fox-01", { exact: false }).first().click();
    await sleep(120);
    await page.getByText("crimson-owl-77", { exact: false }).first().click();
    await sleep(400);
    const mid = await panelText(page);
    log("  R3 t+0.4s (crimson expanded, its own data):", /CRIMSON ONE/.test(mid), "| azure leaked:", /AZURE ONE/.test(mid));
    await sleep(2000);
    const end = await panelText(page);
    const expanded = await page.locator('[aria-expanded="true"]').innerText().catch(() => "?");
    log("  R3 t+2.4s expanded row =", JSON.stringify(expanded.replace(/\s+/g, " ").slice(0, 40)));
    log("  R3 t+2.4s AZURE rows visible under it:", /AZURE ONE/.test(end), "| CRIMSON visible:", /CRIMSON ONE/.test(end));
    await ctx.close();
}

// ── R4 · prune FAILURE reports success-shaped 'No empty users to prune' ───────
async function R4(browser) {
    const { ctx, page } = await boot(browser, { pruneStatus: 500 });
    const t0 = await panelText(page);
    log("  R4 toolbar before:", JSON.stringify(t0.split("\n").slice(0, 4).join(" | ")));
    await page.getByRole("button", { name: /Prune empty/ }).first().click();
    await sleep(400);
    const dlg = await page.locator('[role="dialog"]').innerText();
    log("  R4 dialog:", JSON.stringify(dlg.replace(/\s+/g, " ")));
    await page.getByRole("button", { name: /^Prune$/ }).last().click();
    await sleep(1200);
    const t1 = await panelText(page);
    const banner = t1.split("\n").filter((l) => /Prune|prune/.test(l));
    log("  R4 after a 500 the panel says:", JSON.stringify(banner.join(" | ")));
    log("  R4 still lists empty users:", /empty/.test(t1));
    log("  R4 Prune button re-enabled:", await page.getByRole("button", { name: /Prune empty/ }).first().isEnabled());
    await ctx.close();
}

// ── R5 · blast radius: search-filtered emptyCount understates a global prune ──
async function R5(browser) {
    const calls = [];
    const { ctx, page } = await boot(browser, { pruned: 2, onCall: (m, p) => calls.push(`${m} ${p}`) });
    const t0 = await panelText(page);
    log("  R5 unfiltered toolbar:", JSON.stringify(t0.split("\n").slice(0, 4).join(" | ")));
    const search = page.getByPlaceholder("Search users...").first();
    await search.fill("verdant");
    await sleep(500);
    const t1 = await panelText(page);
    log("  R5 filtered toolbar:", JSON.stringify(t1.split("\n").slice(0, 4).join(" | ")));
    await page.getByRole("button", { name: /Prune empty/ }).first().click();
    await sleep(400);
    const dlg = await page.locator('[role="dialog"]').innerText();
    log("  R5 dialog with 1-of-2 empty users visible:", JSON.stringify(dlg.replace(/\s+/g, " ")));
    await page.getByRole("button", { name: /^Prune$/ }).last().click();
    await sleep(1000);
    log("  R5 request actually sent:", JSON.stringify(calls.filter((c) => c.includes("prune"))));
    log("  R5 server-reported pruned = 2 (see api/src/modules/admin/service/users.ts:228 findEmptyUserSlugs — corpus-wide)");
    log("  R5 result banner:", JSON.stringify((await panelText(page)).split("\n").filter((l) => /Pruned|prune/i.test(l)).join(" | ")));
    await ctx.close();
}

// ── R6 · focus after a destructive confirm ────────────────────────────────────
async function R6(browser) {
    const { ctx, page } = await boot(browser, {});
    await page.getByRole("button", { name: "Delete user crimson-owl-77" }).first().click();
    await sleep(400);
    await page.getByRole("button", { name: /^Delete user$/ }).last().click();
    await sleep(900);
    const focus = await page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a?.tagName, label: a?.getAttribute("aria-label") ?? a?.textContent?.trim().slice(0, 30), isBody: a === document.body };
    });
    log("  R6 focus after delete-user confirm:", JSON.stringify(focus));

    // prune: the trigger is disabled the moment the action fires
    await page.getByRole("button", { name: /Prune empty/ }).first().click();
    await sleep(400);
    await page.getByRole("button", { name: /^Prune$/ }).last().click();
    await sleep(900);
    const focus2 = await page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a?.tagName, label: a?.textContent?.trim().slice(0, 30), isBody: a === document.body };
    });
    log("  R6 focus after prune confirm:", JSON.stringify(focus2));
    await ctx.close();
}

// ── R7 · live regions + row-button structure inside the panel ─────────────────
async function R7(browser) {
    const { ctx, page } = await boot(browser, {});
    const facts = await page.evaluate(() => {
        const main = document.querySelector("main");
        const rows = [...main.querySelectorAll('[role="button"]')].filter((r) => r.querySelector("button"));
        const row = rows[0];
        return {
            liveRegions: main.querySelectorAll("[aria-live],[role=status],[role=alert],[role=log]").length,
            ariaLabelOnGenericDiv: [...main.querySelectorAll("div[aria-label]")].map((d) => ({
                label: d.getAttribute("aria-label"), role: d.getAttribute("role"),
            })),
            rowRoleButtons: rows.length,
            nestedInteractiveInsideRowButton: row ? row.querySelectorAll("button,[role=button],a[href],input").length : -1,
            rowAccName: row ? row.innerText.replace(/\s+/g, " ").trim() : null,
            rowAriaControls: row ? row.getAttribute("aria-controls") : null,
            deleteBtnBox: (() => {
                const b = main.querySelector('button[aria-label^="Delete user"]');
                if (!b) return null; const r = b.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) };
            })(),
        };
    });
    log("  R7", JSON.stringify(facts, null, 1));
    await ctx.close();
}

// ── R8 · prune-result timer stacking (two results, one 3s timer each) ─────────
async function R8(browser) {
    const { ctx, page } = await boot(browser, { pruneStatus: 500 });
    const doPrune = async () => {
        await page.getByRole("button", { name: /Prune empty/ }).first().click();
        await sleep(300);
        await page.getByRole("button", { name: /^Prune$/ }).last().click();
    };
    await doPrune();
    await sleep(2600);
    await doPrune();                 // second banner at t≈2.9s
    await sleep(500);                // t≈3.4s — first timer (t=3.0s) already fired
    const t = await panelText(page);
    log("  R8 banner 0.5s after the SECOND prune result:", JSON.stringify(t.split("\n").filter((l) => /prune/i.test(l)).join(" | ")));
    log("  R8 banner still present:", /No empty users to prune|Pruned/.test(t), "(expected true — it should live 3s)");
    await ctx.close();
}

const PROBES = { R1, R2, R3, R4, R5, R6, R7, R8 };

const browserType = ENGINE === "webkit" ? webkit : chromium;
const browser = await browserType.launch();
for (const [id, fn] of Object.entries(PROBES)) {
    if (PROBE !== "all" && PROBE !== id) continue;
    log(`\n== ${ENGINE} ${id} ==`);
    try { await fn(browser); } catch (e) { log("  !! probe error:", e.message.split("\n")[0]); }
}
await browser.close();
