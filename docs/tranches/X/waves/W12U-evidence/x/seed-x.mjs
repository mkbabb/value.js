// SERVED MODEL: claude-opus-5-5
// X.W12U.x — the shared seed: route-stubbed /admin/* (users, flagged palettes,
// names, tags, audit rows; 47 rows per list so every pager has 3 pages) and
// locally saved palettes. Shapes track e2e/fixtures/palette-envelopes.ts and
// e2e/smoke/admin/fixtures/admin-populated.ts. Nothing is written to any server.
export const NOW = "2026-07-05T00:00:00.000Z";
const TOTAL = Number(process.env.SEED_TOTAL ?? 47); // probe-admin-roster-cap.mjs raises it past the 50-row page
const LONG = "A-Very-Long-Unbreakable-Slug-That-Stresses-Every-Row-On-A-Phone";

const pal = (slug, name, userSlug) => ({
    name, slug, userSlug,
    colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"].map((css, position) => ({ css, position })),
    tags: ["moody", "pastel"], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 3,
    visibility: "public", tier: "standard", published: true,
});
const gen = {
    users: (i) => ({ slug: i === 0 ? LONG.toLowerCase() : `user-${i}-fox`, createdAt: NOW, lastSeenAt: NOW, status: i % 5 === 2 ? "suspended" : "active", paletteCount: i % 7 }),
    flagged: (i) => ({ paletteSlug: `flag-${i}`, palette: pal(`flag-${i}`, i === 0 ? LONG.replace(/-/g, " ") : `Flagged ${i}`, `user-${i}-fox`), flagCount: 1 + (i % 3),
        flags: [{ reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW }, { reporterSlug: "crimson-owl-77", reason: "offensive", detail: "harsh clash across the whole row", createdAt: NOW }] }),
    audit: (i) => ({ id: `a${i}`, timestamp: NOW, action: ["palette.feature", "user.delete", "flag.dismiss", "tag.create"][i % 4], target: i === 0 ? LONG : `target-${i}`, ipHash: `ip-${(4096 + i).toString(16)}` }),
    queue: (i) => ({ id: `c${i}`, name: i === 0 ? "A Very Long Proposed Color Name That Stresses The Row Min-Width Chain" : `Name ${i}`, css: i === 0 ? "color(display-p3 0.23456 0.71234 0.41234 / 0.98765)" : `oklch(0.6 0.15 ${i * 7})`, status: "proposed", contributor: `user-${i}-fox`, createdAt: NOW }),
};
const TAGS = ["moody", "pastel", "duotone", "earthy", "neon", "muted", "vintage", "tropical", "monochrome", LONG.toLowerCase()]
    .map((name, i) => ({ id: `t${i}`, name, category: ["mood", "tone", "structure"][i % 3], createdAt: NOW }));

export const LOCAL_PALETTES = Array.from({ length: 6 }, (_, i) => ({
    ...pal(`local-${i}`, i === 0 ? "A Long Saved Palette Name For The Card Menu" : `Saved ${i}`, "test-user"),
    id: `local-id-${i}`, isLocal: true, published: false, visibility: "private",
}));

function page(kind, url) {
    const u = new URL(url);
    const limit = Number(u.searchParams.get("limit") ?? 20), offset = Number(u.searchParams.get("offset") ?? 0);
    const data = [];
    for (let i = offset; i < Math.min(TOTAL, offset + limit); i++) data.push(gen[kind](i));
    return JSON.stringify({ data, total: TOTAL, limit, offset });
}

/** Install theme + token + saved palettes + stubs on a context. Returns a hit counter. */
export const REMOTE = Array.from({ length: 8 }, (_, i) => ({
    ...pal(`remote-${i}`, i === 1 ? "A Long Published Palette Name That Must Truncate" : `Remote ${i}`, i % 2 === 0 ? "test-user" : `user-${i}-fox`),
    versionCount: 3, currentHash: `h${i}-2`,
}));
const version = (slug, d) => ({ hash: `${slug}-v${d}`, payloadHash: `h-${d}`, name: `Remote v${d}`, colors: pal(slug, "", "").colors,
    parentHash: d ? `${slug}-v${d - 1}` : null, forkedFromHash: null, authorSlug: "test-user", paletteSlug: slug, createdAt: NOW, rootHash: `${slug}-v0`, depth: d });

/** Install theme + token + saved palettes + stubs on a context. Returns a hit counter.
 *  browse: "ok" (8 remote palettes) | "error" (500) | "slow" (held 20 s: the loading plate) | null (untouched). */
export async function prepare(ctx, { theme = "light", admin = false, palettes = false, refused = false, user = false, browse = null } = {}) {
    const hits = { admin: 0, browse: 0 };
    if (browse) {
        await ctx.route(/\/palettes(\?|\/[^/]+\/versions)/, async (r) => {
            const req = r.request(), path = new URL(req.url()).pathname;
            if (req.method() !== "GET" || req.resourceType() !== "fetch" && req.resourceType() !== "xhr") return r.continue();
            hits.browse++;
            const json = (b, s = 200) => r.fulfill({ status: s, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: b });
            if (path.endsWith("/versions")) {
                const slug = path.split("/")[2];
                return json(JSON.stringify({ data: [2, 1, 0].map((d) => version(slug, d)), total: 3, limit: 20, offset: 0 }));
            }
            if (browse === "error") return json('{"error":"boom"}', 500);
            if (browse === "slow") await new Promise((res) => setTimeout(res, 20000));
            return json(JSON.stringify({ data: REMOTE, nextCursor: "c2", hasMore: true }));
        });
    }
    await ctx.addInitScript(([t, a, p, u]) => {
        try {
            localStorage.setItem("vueuse-color-scheme", t);
            if (u) localStorage.setItem("palette-user-slug", "test-user");
            if (a) localStorage.setItem("palette-admin-token", "test-admin-token");
            if (p) localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: p }));
        } catch { /* private window: the read below still runs */ }
    }, [theme, admin, palettes ? LOCAL_PALETTES : null, user]);
    await ctx.route("**/sessions", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "s", userSlug: "test-user" }) }));
    await ctx.route("**/admin/**", (r) => {
        const req = r.request(), url = req.url(), path = new URL(url).pathname;
        if (!path.startsWith("/admin/")) return r.continue();
        hits.admin++;
        const json = (b, s = 200) => r.fulfill({ status: s, contentType: "application/json", body: b });
        if (refused) return json('{"error":"Unauthorized"}', 401);
        if (req.method() === "DELETE") return json(path.includes("/flags/") ? '{"dismissed":1}' : '{"deleted":true,"palettesDeleted":0}');
        if (req.method() !== "GET") return json("{}");
        if (path.startsWith("/admin/tags")) return json(JSON.stringify(TAGS));
        if (path.includes("/palettes") && path.startsWith("/admin/users/")) return json(JSON.stringify([pal("u-1", "User One", "user-1-fox"), pal("u-2", "User Two", "user-1-fox")]));
        if (path.startsWith("/admin/users")) return json(page("users", url));
        if (path.startsWith("/admin/flagged")) return json(page("flagged", url));
        if (path.startsWith("/admin/audit")) return json(page("audit", url));
        if (path.startsWith("/admin/queue") || path.includes("/approved")) return json(page("queue", url));
        return json(JSON.stringify({ data: [], total: 0, limit: 20, offset: 0 }));
    });
    return hits;
}

export const VIEWPORTS = {
    v360: [360, 780], v390: [390, 844], v430: [430, 932], l844: [844, 390],
    t768: [768, 1024], t1024: [1024, 768], d1440: [1440, 900],
};
export const isPhone = (tag) => tag.startsWith("v") || tag.startsWith("l");
