// SS8 · B10-browse shared probe helpers. Headless only; one browser per run,
// one context per cell, everything closed in finally by the caller.
import fs from "node:fs";
import path from "node:path";

export const APP = "http://localhost:9000";
export const API_LOCAL = "http://localhost:3000";
export const API_PROD = "https://api.color.babb.dev";
export const EVID = path.resolve(
    import.meta.dirname,
    "../../evidence/B10-browse",
);
fs.mkdirSync(EVID, { recursive: true });

export function save(name, obj) {
    fs.writeFileSync(path.join(EVID, name), JSON.stringify(obj, null, 1));
}

/** PROD-PROXY: every GET the app sends to the local API is answered by the
 *  live production spine (read-only); any non-GET is refused locally so the
 *  probe can never mutate production. */
export async function routeProd(ctx, log = []) {
    await ctx.route(`${API_LOCAL}/**`, async (route) => {
        const req = route.request();
        const url = req.url().replace(API_LOCAL, API_PROD);
        if (req.method() !== "GET") {
            log.push(`REFUSED ${req.method()} ${url}`);
            return route.fulfill({ status: 403, contentType: "application/problem+json", body: '{"title":"probe: read-only"}' });
        }
        log.push(`GET ${url}`);
        try {
            const res = await route.fetch({ url });
            // the spine's CORS answer names its own origin; re-issue it for the served app
            const headers = { ...res.headers(), "access-control-allow-origin": req.headers()["origin"] ?? "*", "access-control-allow-credentials": "true" };
            return route.fulfill({ response: res, headers });
        } catch (e) {
            return route.abort();
        }
    });
}

const RAMPS = [
    ["oklch(30% 0 0)", "oklch(45% 0 0)", "oklch(60% 0 0)", "oklch(75% 0 0)", "oklch(90% 0 0)"],
    ["#0b3d91", "#1e6fd9", "#5aa9e6", "#a9d6f5", "#e8f4fd"],
    ["#7a1f1f", "#c0392b", "#e67e22", "#f1c40f", "#fdf2c4"],
    ["#14532d", "#16a34a", "#4ade80", "#bbf7d0"],
    ["#3b0764", "#7e22ce", "#c084fc", "#f3e8ff", "#faf5ff", "#ede9fe"],
];

/** A synthetic public palette (stub wall). */
export function synth(i, prefix = "stub") {
    const colors = RAMPS[i % RAMPS.length].map((css, position) => ({ css, position }));
    return {
        name: `${prefix} palette ${i}`,
        slug: `${prefix}-palette-${i}`,
        colors,
        tags: [],
        versionCount: 1,
        forkCount: i % 3,
        forkOf: null,
        forkOfHash: null,
        currentHash: `h${i}`,
        oklabColors: [],
        voteCount: i % 7,
        userSlug: `author-${i % 4}`,
        visibility: "public",
        tier: i % 5 === 0 ? "featured" : "standard",
        deletedAt: null,
        createdAt: new Date(Date.UTC(2026, 9, 1) - i * 3600e3).toISOString(),
        updatedAt: new Date(Date.UTC(2026, 9, 1) - i * 3600e3).toISOString(),
        published: true,
        isLocal: false,
        voted: false,
    };
}

/** STUB wall: /palettes answers `first` rows (+ a cursor when `more` > 0),
 *  the cursor page answers `more` rows; `/colors/tags` answers `tags`.
 *  `hook(url)` may return "abort" | {delay} to shape a response. */
export async function routeStub(ctx, { first = 12, more = 0, tags = [], hook = null, log = [] } = {}) {
    await ctx.route(`${API_LOCAL}/**`, async (route) => {
        const req = route.request();
        const u = new URL(req.url());
        log.push(`${req.method()} ${u.pathname}${u.search}`);
        const h = hook ? hook(u, req) : null;
        if (h === "abort") return route.abort("connectionrefused");
        if (h && h.delay) await new Promise((r) => setTimeout(r, h.delay));
        if (h && h.json) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(h.json) });
        if (u.pathname === "/palettes") {
            const cursor = u.searchParams.get("cursor");
            if (cursor) {
                const data = Array.from({ length: more }, (_, k) => synth(first + k));
                return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data, nextCursor: null, hasMore: false }) });
            }
            const data = Array.from({ length: first }, (_, k) => synth(k));
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data, nextCursor: more ? "c2" : null, hasMore: more > 0 }) });
        }
        if (u.pathname === "/colors/tags") {
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(tags) });
        }
        // everything else on the API: an empty, healthy answer
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(u.pathname === "/" ? { ok: true } : { data: [], total: 0 }) });
    });
}

export function wcag(a, b) {
    const lum = ([r, g, bb]) => {
        const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bb);
    };
    const [L1, L2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return +((L1 + 0.05) / (L2 + 0.05)).toFixed(3);
}

export function oklab([r, g, b]) {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const [R, G, B] = [f(r), f(g), f(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ];
}
export const dE = (a, b) => { const p = oklab(a), q = oklab(b); return +Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]).toFixed(4); };

/** Sample pixels from a page screenshot inside the page (canvas decode). */
export async function samplePixels(page, points) {
    const buf = await page.screenshot({ type: "png" });
    const b64 = buf.toString("base64");
    return page.evaluate(async ({ b64, points }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const dpr = img.width / innerWidth;
        return points.map(([x, y]) => Array.from(g.getImageData(Math.round(x * dpr), Math.round(y * dpr), 1, 1).data.slice(0, 3)));
    }, { b64, points });
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
