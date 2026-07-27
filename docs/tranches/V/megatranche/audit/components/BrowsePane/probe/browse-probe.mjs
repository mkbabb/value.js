// CHALLENGE-C probe — BrowsePane populated-wall interrogation.
// Read-only against the ALREADY-RUNNING e2e vite server (:8090, VITE_API_URL
// same-origin per playwright.config.ts) so the availability latch admits the
// fetch; GET /palettes is routed to a local fixture so the wall renders.
// Two engines: chromium (swiftshader, per playwright.config) + webkit.
import { chromium, webkit } from "playwright";

const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:8090";
const N = 6;

const makePalette = (i) => ({
    name: `Probe Palette ${i}`,
    slug: `probe-palette-${i}`,
    userSlug: "gallery",
    colors: [
        { css: "#e11d48", position: 0 },
        { css: "#2563eb", position: 1 },
        { css: "#16a34a", position: 2 },
    ],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    tags: [],
    createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false,
    voteCount: i,
    forkCount: 0,
    versionCount: 1,
    visibility: "public",
    tier: "standard",
    published: true,
    currentHash: `hash-${i}`,
});
const PAGE1 = Array.from({ length: N }, (_, i) => makePalette(i + 1));
const PAGE2 = Array.from({ length: 3 }, (_, i) => makePalette(N + i + 1));

const isPaletteRest = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

const SWIFTSHADER = [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
];

async function run(name, browserType, launchOpts) {
    const browser = await browserType.launch(launchOpts);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const msgs = [];
    const reqs = [];
    page.on("console", (m) => msgs.push(`${m.type()}: ${m.text()}`));
    page.on("pageerror", (e) => msgs.push(`pageerror: ${e.message}`));
    page.on("request", (r) => {
        const u = new URL(r.url());
        if (/(^|\/)(palettes|tags)(\/|$)/.test(u.pathname) && !/\/@/.test(u.pathname))
            reqs.push(u.pathname + u.search);
    });

    await page.route(isPaletteRest, (route) => {
        const cursor = new URL(route.request().url()).searchParams.get("cursor");
        const body =
            cursor === "page-2"
                ? { data: PAGE2, nextCursor: null, hasMore: false }
                : { data: PAGE1, nextCursor: "page-2", hasMore: true };
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(body),
        });
    });

    const out = { engine: name };
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "domcontentloaded", timeout: 60000 });
    const main = page.getByRole("main");
    const cards = main.getByRole("article").filter({ visible: true });
    await cards.first().waitFor({ timeout: 45000 });
    out.cardCount = await cards.count();

    // /tags requests fired on mount (loadAllTags has no in-flight guard and the
    // pane mounts in both responsive slots)
    out.tagRequests = reqs.filter((r) => r.includes("tags")).length;
    out.paletteRequests = reqs.filter((r) => r.includes("palettes")).length;

    // ── 1 · is the card keyboard-operable at all? ────────────────────────────
    out.cardAttrs = await page.evaluate(() =>
        [...document.querySelectorAll('[role="article"]')]
            .filter((e) => e.getBoundingClientRect().width > 0)
            .slice(0, 2)
            .map((e) => ({
                tag: e.tagName,
                tabindex: e.getAttribute("tabindex"),
                role: e.getAttribute("role"),
                ariaExpanded: e.getAttribute("aria-expanded"),
                cursor: getComputedStyle(e).cursor,
            })),
    );

    const search = main.getByPlaceholder("Search the commons...").first();
    await search.click();
    const walk = [];
    out.cardFocusedByTab = false;
    for (let i = 0; i < 30; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a) return null;
            return {
                tag: a.tagName,
                role: a.getAttribute("role"),
                label: (a.getAttribute("aria-label") || (a.textContent || "").trim()).slice(0, 30),
                isCard: a.getAttribute("role") === "article",
            };
        });
        if (!info) break;
        walk.push(info);
        if (info.isCard) { out.cardFocusedByTab = true; break; }
    }
    out.tabStops = walk.length;
    out.focusWalk = walk.slice(0, 12);

    // ── 2 · expand a card by MOUSE, then measure its interior ────────────────
    await cards.first().click();
    await page.waitForTimeout(700);
    out.expandedSwatchButtons = await page.evaluate(
        () => document.querySelectorAll('[role="article"] [aria-label^="Copy slug"]').length,
    );
    out.smallTargetsExpanded = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll(
            '[role="article"] button, [role="article"] a, [role="article"] input',
        )) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            if (r.width < 24 || r.height < 24)
                out.push({
                    w: +r.width.toFixed(1),
                    h: +r.height.toFixed(1),
                    label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 28),
                });
        }
        return out;
    });

    // ── 3 · live regions / loading-container roles ───────────────────────────
    out.liveRegions = await page.evaluate(() =>
        [...document.querySelectorAll("main [aria-live], main [role='status'], main [role='alert']")].map(
            (e) => ({ tag: e.tagName, live: e.getAttribute("aria-live"), role: e.getAttribute("role") }),
        ),
    );

    // ── 4 · load-more append ─────────────────────────────────────────────────
    const more = main.getByRole("button", { name: "More from the commons" }).filter({ visible: true });
    out.moreVisible = await more.count();
    if (out.moreVisible) {
        await more.first().click();
        await page.waitForTimeout(1500);
    }
    out.cardCountAfterMore = await cards.count();

    // ── 5 · the OTHER pane's search box drives the commons ───────────────────
    const mineSearch = main.getByPlaceholder("Search your palettes...").first();
    out.minePaneVisible = await mineSearch.count();
    const before = reqs.length;
    if (out.minePaneVisible) {
        await mineSearch.click();
        await mineSearch.fill("zqx");
        await page.waitForTimeout(1600);
    }
    out.paletteReqsAfterMineSearch = reqs.slice(before);
    out.cardsAfterMineSearch = await cards.count();
    out.emptyCopyShown = await main
        .getByText("Publish one from My Palettes and start the wall.")
        .filter({ visible: true })
        .count();

    out.consoleMsgs = msgs
        .filter((m) => !/vite|hmr|Download the Vue|\[vite\]/i.test(m))
        .slice(0, 15);

    await ctx.close();
    await browser.close();
    return out;
}

const results = {};
for (const [name, t, opts] of [
    ["chromium", chromium, { channel: "chromium", args: SWIFTSHADER }],
    ["webkit", webkit, {}],
]) {
    try {
        results[name] = await run(name, t, opts);
    } catch (e) {
        results[name] = { engine: name, error: String(e).split("\n").slice(0, 4).join(" | ") };
    }
}
console.log(JSON.stringify(results, null, 1));
