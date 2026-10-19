// SS-8 · B17-admin-shell-names — shared probe harness.
// One browser per run (caller), one context per cell, all closed in finally.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B17-admin-shell-names");
mkdirSync(EVID, { recursive: true });
export const BASE = "http://localhost:9000";
const NOW = "2026-10-19T00:00:00.000Z";

const SEED = [
    ["Probe Ember", "#e11d48"], ["Harbor Slate", "#2563eb"], ["Moss Lantern", "#16a34a"],
    ["Saffron Tide", "#f59e0b"], ["Violet Hour", "#7c3aed"],
    ["An Extraordinarily Long Proposed Colour Name That Must Truncate Somewhere", "oklch(62% 0.19 25 / 0.85)"],
];
export const QUEUE = SEED.map(([name, css], i) => ({ id: `q${i}`, name, css, status: "proposed", createdAt: NOW }));
export const APPROVED = SEED.slice(0, 4).map(([name, css], i) => ({ id: `a${i}`, name: name + " II", css, status: "approved", createdAt: NOW, approvedAt: NOW }));

export const USERS = (n) => Array.from({ length: n }, (_, i) => ({ slug: `user-${String(i).padStart(3, "0")}`, createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: i % 7 }));
export const AUDIT = (n) => Array.from({ length: n }, (_, i) => ({ id: `e${i}`, timestamp: NOW, action: ["approve", "reject", "delete"][i % 3], target: `target-${i}`, actorSlug: "admin" }));

/**
 * Route the admin REST endpoints. opts: { queue, approved, users, audit, delayMs, hang, fail }
 * Lists honour limit/offset and report the full `total`.
 */
export async function routeAdmin(ctx, opts = {}) {
    const { queue = QUEUE, approved = APPROVED, users = USERS(3), audit = AUDIT(3), delayMs = 0, hang = false, fail = false } = opts;
    const log = [];
    await ctx.route(
        (url) => !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) && !/\.\w+$/.test(url.pathname) && /^(\/api)?\/admin\//.test(url.pathname),
        async (route) => {
            const u = new URL(route.request().url());
            log.push({ t: Date.now(), m: route.request().method(), p: u.pathname + u.search });
            if (hang) return; // never fulfilled: a hung socket
            if (typeof fail === "function" ? fail(u) : fail) { try { await route.abort("connectionrefused"); } catch {} return; }
            const d = typeof delayMs === "function" ? delayMs(u) : delayMs;
            if (d) await new Promise((r) => setTimeout(r, d));
            const limit = +(u.searchParams.get("limit") ?? 50), offset = +(u.searchParams.get("offset") ?? 0);
            const body = (all) => JSON.stringify({ data: all.slice(offset, offset + limit), total: all.length, limit, offset });
            let out;
            if (u.pathname.endsWith("/admin/queue")) out = body(queue);
            else if (u.pathname.endsWith("/admin/colors/approved")) out = body(approved);
            else if (u.pathname.includes("/admin/tags")) out = "[]";
            else if (u.pathname.endsWith("/admin/users")) out = body(users);
            else if (u.pathname.includes("/admin/audit")) out = body(audit);
            else out = body([]);
            try { await route.fulfill({ status: 200, contentType: "application/json", body: out }); } catch {}
        },
    );
    return log;
}

export async function launch() {
    return chromium.launch({ headless: true });
}

/** One cell in a fresh context; the context closes in finally. */
export async function cell(browser, opts, fn) {
    const { dark = false, admin = true, route = {}, ...ctxOpts } = opts;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: dark ? "dark" : "light", ...ctxOpts });
    try {
        await ctx.addInitScript(({ admin, dark }) => {
            try {
                localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
                if (admin) localStorage.setItem("palette-admin-token", "test-admin-token");
            } catch {}
        }, { admin, dark });
        const log = await routeAdmin(ctx, route);
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
        const out = await fn(page, log);
        return { ...out, pageErrors: errors.slice(0, 5) };
    } catch (e) {
        return { error: String(e).slice(0, 400) };
    } finally {
        await ctx.close().catch(() => {});
    }
}

export function save(name, data) {
    writeFileSync(resolve(EVID, name), JSON.stringify(data, null, 2));
}
