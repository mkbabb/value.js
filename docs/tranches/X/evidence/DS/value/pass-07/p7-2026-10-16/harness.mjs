// X-DS · value · pass 6 (critic VC6, 2026-10-15) — the ONE shared boot + render gate for
// this pass's capture and probes (VC6-02: a cure probe no longer ships without the body
// voice). Real Chrome, new headless only (§0ei).
//
// bootRoute(page, url): load, wait for the dock and the first pane card, no aria-busy, then
//   the VR3-01 / VC4-05 gate: a LOADED "Plus Jakarta Sans" face AND a page that RENDERS it
//   (glass's `font-display: optional` can leave a page on the fallback for its lifetime);
//   reload up to 4 times, then throw. Also refuses a role=alert pane plate (VR3-10).
// routeBrowseFixture(page): VC6-03 — /#/browse needs GET /palettes, which this host cannot
//   serve (no Docker, no mongod). Answer it with a small varied set in the
//   e2e/smoke/fixtures/browse-palettes.ts shape ({ data, nextCursor, hasMore }).
export const NOW = "2026-07-05T00:00:00.000Z";

const FIXTURE = [
    ["Harbor at Dusk", ["#0f172a", "#1e3a8a", "#f59e0b", "#fde68a", "#fef3c7"], ["ocean", "evening", "warm"], 128],
    ["Terracotta Garden", ["#9a3412", "#ea580c", "#84cc16", "#365314"], ["earthy", "garden"], 54],
    ["Neon Arcade", ["#f0abfc", "#a21caf", "#22d3ee", "#0e7490", "#facc15", "#111827"], ["retro", "neon", "vivid", "80s"], 1203],
    ["Quiet Linen", ["#f5f5f4", "#e7e5e4", "#a8a29e"], ["neutral"], 7],
    ["Moss and Slate", ["#3f6212", "#4d7c0f", "#64748b", "#334155", "#e2e8f0"], ["forest", "calm"], 312],
    ["Citrus Pop", ["#facc15", "#fb923c", "#f43f5e", "#84cc16"], [], 0],
];
export const browsePalettes = FIXTURE.map(([name, cols, tags, votes], i) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    userSlug: ["gallery", "mkbabb", "studio"][i % 3],
    colors: cols.map((css, position) => ({ css, position })),
    tags,
    createdAt: NOW,
    updatedAt: NOW,
    isLocal: false,
    voteCount: votes,
    visibility: "public",
    tier: "standard",
    published: true,
}));

// NOT page.route: Playwright disables the HTTP cache for a routed page, so every reload
// fetches the fonts cold and glass's `font-display: optional` keeps the fallback face (the
// very defect VC6-02 names). The fixture is answered in-page instead, by a fetch shim
// installed before the app boots (demo/platform/transport/client.ts is the one fetch seat).
export async function routeBrowseFixture(page) {
    await page.addInitScript((body) => {
        const real = window.fetch.bind(window);
        window.fetch = (input, init) => {
            const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
            const u = new URL(href, location.href);
            const method = (init?.method || (typeof input === "object" && input.method) || "GET").toUpperCase();
            if (method === "GET" && !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname) && /(^|\/)palettes\/?$/.test(u.pathname))
                return Promise.resolve(new Response(body, { status: 200, headers: { "content-type": "application/json" } }));
            return real(input, init);
        };
    }, JSON.stringify({ data: browsePalettes, nextCursor: null, hasMore: false }));
}

export async function rendersJakarta(page) {
    return page.evaluate(() => {
        const mk = (ff) => {
            const s = document.createElement("span");
            s.textContent = "Hamburgefonstiv 0123456789";
            s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:40px;font-family:${ff}`;
            document.body.appendChild(s);
            const w = s.getBoundingClientRect().width;
            s.remove();
            return w;
        };
        return Math.abs(mk('"Plus Jakarta Sans", monospace') - mk("monospace")) > 1;
    });
}

async function settle(page, ms) {
    await page.locator(".glass-dock").first().waitFor({ timeout: 300_000 });
    await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 });
    await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300_000 });
    await page.waitForTimeout(ms);
}

export async function bootRoute(page, url, { waitArticle = false, settleMs = 5000 } = {}) {
    await page.goto(url, { waitUntil: "load", timeout: 300_000 });
    await settle(page, settleMs);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(
        () => [...document.fonts].some((f) => f.family.replace(/["']/g, "") === "Plus Jakarta Sans" && f.status === "loaded"),
        null, { timeout: 120_000 });
    for (let r = 0; r < 4 && !(await rendersJakarta(page)); r++) {
        await page.reload({ waitUntil: "load", timeout: 300_000 });
        await settle(page, 3000);
    }
    if (!(await rendersJakarta(page))) throw new Error("body voice renders the fallback (font-display: optional missed)");
    if (waitArticle) await page.getByRole("article").first().waitFor({ timeout: 120_000 });
    const plate = await page.evaluate(() => {
        const el = document.querySelector('main [role="alert"]');
        return el ? (el.textContent || "role=alert").trim().slice(0, 80) : "";
    });
    if (plate) throw new Error("pane error plate: " + plate);
}

export async function newPage(browser, width, theme) {
    const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    return ctx.newPage();
}
