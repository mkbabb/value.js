// X-DS · value · pass 16 (critic V16C-01, 2026-10-18): copied from pass-15/c15-2026-10-18 and given a
// PAINT gate. bootRoute's DOM gate (dock + first card visible, no aria-busy, Jakarta rendered) let two
// pass-15 frames through unpainted: the boot ground still over the page (atmosphere-1440-light) and the
// hero bead's WebGL canvas not yet drawn (picker-390-dark). paintGate(page, { hero }) now reads the
// PIXELS before the shot: the first pane card's box must hold edges (text and controls, not a smooth
// ground), and, where the route seats the bead, hiding the bead's canvas must change its box (it has
// drawn). It re-reads for up to ~12 s, then throws, so the capture retries the cell.
//
// X-DS · value · pass 9 (critic V9C-03, 2026-10-17): copied from pass-04/redispatch-2026-10-16 and
// given `allowAlert`, so a route whose pane IS a role=alert plate (/#/nope, Not Found) still takes
// the Jakarta load-and-render gate (and its reloads) instead of a cold goto.
//
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

export async function bootRoute(page, url, { waitArticle = false, settleMs = 5000, allowAlert = false } = {}) {
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
    if (plate && !allowAlert) throw new Error("pane error plate: " + plate);
}

export async function newPage(browser, width, theme) {
    const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    return ctx.newPage();
}

// Decode a PNG buffer in the page (no node image library here) and measure it: the fraction of
// horizontally adjacent pixel pairs whose luma differs by more than 24 (edges), and, against a second
// buffer, the mean absolute RGB difference.
async function measure(page, a, b) {
    return page.evaluate(async ([a64, b64]) => {
        const px = async (s) => {
            const bin = atob(s), u = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
            const img = await createImageBitmap(new Blob([u], { type: "image/png" }));
            const c = new OffscreenCanvas(img.width, img.height), g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            return { w: img.width, h: img.height, d: g.getImageData(0, 0, img.width, img.height).data };
        };
        const A = await px(a64);
        let edges = 0, pairs = 0;
        for (let y = 0; y < A.h; y++) for (let x = 1; x < A.w; x++) {
            const i = (y * A.w + x) * 4, j = i - 4;
            const l = (k) => 0.2126 * A.d[k] + 0.7152 * A.d[k + 1] + 0.0722 * A.d[k + 2];
            pairs++; if (Math.abs(l(i) - l(j)) > 24) edges++;
        }
        const out = { edgeFrac: Math.round((edges / Math.max(1, pairs)) * 1e5) / 1e5 };
        if (b64) {
            const B = await px(b64);
            let s = 0; const n = Math.min(A.d.length, B.d.length);
            for (let i = 0; i < n; i += 4) s += Math.abs(A.d[i] - B.d[i]) + Math.abs(A.d[i + 1] - B.d[i + 1]) + Math.abs(A.d[i + 2] - B.d[i + 2]);
            out.meanDiff = Math.round((s / (n / 4) / 3) * 100) / 100;
        }
        return out;
    }, [a.toString("base64"), b ? b.toString("base64") : null]);
}

// The first match whose box is in the viewport (a single-pane seat at 390 keeps the picker's card
// mounted but out of view), clipped to the viewport.
async function box(page, sel) {
    return page.evaluate((sel) => {
        const vw = innerWidth, vh = innerHeight;
        for (const el of document.querySelectorAll(sel)) {
            const r = el.getBoundingClientRect();
            const x = Math.max(0, r.left), y = Math.max(0, r.top);
            const w = Math.min(vw, r.right) - x, h = Math.min(vh, r.bottom) - y;
            if (w >= 8 && h >= 8 && getComputedStyle(el).visibility !== "hidden") return { x, y, width: w, height: h };
        }
        return null;
    }, sel);
}

export const EDGE_MIN = 0.004; // a card with a title and controls measures well above this; a bare ground ~0
export const HERO_MIN = 3; // mean |dRGB| when the bead's canvas is hidden: an undrawn canvas changes nothing

export async function paintGate(page, { hero = false, tries = 12 } = {}) {
    let last = {};
    for (let t = 0; t < tries; t++) {
        const card = await box(page, ".pane-wrapper .card");
        const c = card ? await measure(page, await page.screenshot({ clip: card })) : { edgeFrac: 0 };
        last = { ...(card ? {} : { card: "no card in view" }), tries: t + 1, cardEdgeFrac: c.edgeFrac };
        let heroOk = true;
        if (hero) {
            const hb = await box(page, ".hero-blob-anchor canvas");
            if (!hb) { heroOk = false; last.hero = "no canvas box"; }
            else {
                const on = await page.screenshot({ clip: hb });
                await page.evaluate(() => { for (const el of document.querySelectorAll(".hero-blob-anchor canvas")) el.style.visibility = "hidden"; });
                await page.waitForTimeout(120);
                const off = await page.screenshot({ clip: hb });
                await page.evaluate(() => { for (const el of document.querySelectorAll(".hero-blob-anchor canvas")) el.style.visibility = ""; });
                await page.waitForTimeout(120);
                const m = await measure(page, on, off);
                last.heroMeanDiff = m.meanDiff;
                heroOk = m.meanDiff >= HERO_MIN;
            }
        }
        if (c.edgeFrac >= EDGE_MIN && heroOk) return { ok: true, ...last };
        await page.waitForTimeout(1000);
    }
    throw new Error("paint gate: " + JSON.stringify(last));
}
