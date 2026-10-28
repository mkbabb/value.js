// SS-8 · B18-admin-panels — shared probe harness.
// One browser per run (caller), one context per cell, all closed in finally.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B18-admin-panels");
mkdirSync(EVID, { recursive: true });
export const BASE = "http://localhost:9000";
const NOW = "2026-10-19T12:00:00.000Z";

const LONG = "palette:an-extraordinarily-long-target-slug-that-never-breaks-" + "x".repeat(60);
export const AUDIT = [
    { id: "e0", timestamp: NOW, action: "palette.delete", target: "palette:ember-tide", actorSlug: "admin-one" },
    { id: "e1", timestamp: NOW, action: "tag.create", target: "tag:warm", actorSlug: null },
    { id: "e2", timestamp: NOW, action: "user.role", target: LONG, actorSlug: "admin-two" },
    { id: "e3", timestamp: NOW, action: "flags.dismiss", target: "palette:harbor-slate", actorSlug: "admin-one" },
    { id: "e4", timestamp: NOW, action: "color.approve", target: "color:moss-lantern", actorSlug: "admin-one" },
];
const pal = (slug, name, n, user = "some-user") => ({ slug, name, userSlug: user, colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0ea5e9"].slice(0, n).map((css) => ({ css, name: css })) });
export const FLAGGED = [
    { paletteSlug: "ember-tide", palette: pal("ember-tide", "Ember Tide", 5), flagCount: 3, flags: [
        { reporterSlug: "r1", reason: "spam", detail: "Posted the same palette twelve times", createdAt: NOW },
        { reporterSlug: "r2", reason: "offensive", createdAt: NOW },
        { reporterSlug: "r3", reason: "other", detail: "A longer report detail that should truncate within its row at narrow widths", createdAt: NOW } ] },
    { paletteSlug: "harbor-slate", palette: pal("harbor-slate", "Harbor Slate", 3), flagCount: 1, flags: [{ reporterSlug: "r4", reason: "spam", createdAt: NOW }] },
    { paletteSlug: "gone-one", palette: null, flagCount: 2, flags: [{ reporterSlug: "r5", reason: "offensive", createdAt: NOW }, { reporterSlug: "r6", reason: "spam", createdAt: NOW }] },
    { paletteSlug: "moss-lantern", palette: pal("moss-lantern", "Moss Lantern With A Rather Long Palette Title", 4), flagCount: 1, flags: [{ reporterSlug: "r7", reason: "other", detail: "x", createdAt: NOW }] },
];
export const TAGS = [
    { id: "t0", name: "warm", category: "mood" }, { id: "t1", name: "cool", category: "mood" },
    { id: "t2", name: "pastel", category: "style" }, { id: "t3", name: "neon", category: "style" },
    { id: "t4", name: "an-extraordinarily-long-tag-name-x30", category: "style" },
    { id: "t5", name: "autumn", category: "season" },
];

/** Route admin REST endpoints with mutable state. opts: { audit, flagged, tags, delayMs, hang, status } */
export async function routeAdmin(ctx, opts = {}) {
    const st = { audit: [...(opts.audit ?? AUDIT)], flagged: [...(opts.flagged ?? FLAGGED)], tags: [...(opts.tags ?? TAGS)] };
    const log = [];
    await ctx.route(
        (url) => !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) && !/\.\w+$/.test(url.pathname) && /^(\/api)?\/admin\//.test(url.pathname),
        async (route) => {
            const req = route.request();
            const u = new URL(req.url());
            const m = req.method();
            log.push({ t: Date.now(), m, p: u.pathname + u.search });
            if (opts.hang) return;
            if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
            if (opts.status) { try { await route.fulfill({ status: opts.status, contentType: "application/json", body: JSON.stringify({ error: "denied" }) }); } catch {} return; }
            const page = (arr) => {
                const limit = +(u.searchParams.get("limit") ?? 50), offset = +(u.searchParams.get("offset") ?? 0);
                return JSON.stringify({ data: arr.slice(offset, offset + limit), total: arr.length, limit, offset });
            };
            let out = JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });
            const p = u.pathname;
            if (p.endsWith("/admin/audit")) out = page(st.audit);
            else if (p.endsWith("/admin/flagged")) out = page(st.flagged);
            else if (p.includes("/admin/flags/") && m === "DELETE") { const s = decodeURIComponent(p.split("/").pop()); st.flagged = st.flagged.filter((f) => f.paletteSlug !== s); out = JSON.stringify({ dismissed: 1 }); }
            else if (p.includes("/admin/palettes/") && m === "DELETE") { const s = decodeURIComponent(p.split("/").pop()); st.flagged = st.flagged.filter((f) => f.paletteSlug !== s); out = "{}"; }
            else if (p.endsWith("/admin/tags") && m === "GET") out = JSON.stringify(st.tags);
            else if (p.endsWith("/admin/tags") && m === "POST") { const b = JSON.parse(req.postData() || "{}"); const t = { id: "n" + st.tags.length, ...b }; st.tags.push(t); out = JSON.stringify(t); }
            else if (p.includes("/admin/tags/") && m === "DELETE") { const s = decodeURIComponent(p.split("/").pop()); st.tags = st.tags.filter((t) => t.name !== s); out = JSON.stringify({ deleted: true }); }
            try { await route.fulfill({ status: 200, contentType: "application/json", body: out }); } catch {}
        },
    );
    return { log, st };
}

export async function launch() { return chromium.launch({ headless: true }); }

/** One cell in a fresh context; closes in finally. opts: { dark, admin, route, viewport, ...ctxOpts } */
export async function cell(browser, opts, fn) {
    const { dark = false, admin = true, route = {}, viewport = { width: 1440, height: 900 }, ...ctxOpts } = opts;
    const ctx = await browser.newContext({ viewport, colorScheme: dark ? "dark" : "light", ...ctxOpts });
    try {
        await ctx.addInitScript(({ admin, dark }) => {
            try {
                localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
                if (admin) localStorage.setItem("palette-admin-token", "test-admin-token");
            } catch {}
        }, { admin, dark });
        const r = await routeAdmin(ctx, route);
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
        const out = await fn(page, r.log, r.st);
        return { ...out, pageErrors: errors.slice(0, 5) };
    } catch (e) {
        return { error: String(e).slice(0, 400) };
    } finally {
        await ctx.close().catch(() => {});
    }
}

export const rectOf = `(e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); }`;
export function save(name, data) { writeFileSync(resolve(EVID, name), JSON.stringify(data, null, 2)); }
