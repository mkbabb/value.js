// CHALLENGE-C probe 3 — the sort↔load-more cursor race.
//
// Mechanism under test (useBrowsePalettes.ts:63-114): `loadRemotePalettes`
// bumps `loadGeneration` at CALL time but only writes `nextCursor` when its
// RESPONSE lands. `loadMoreRemotePalettes` captures the ALREADY-BUMPED
// generation and reads the STILL-STALE `nextCursor`, so its append is NOT
// discarded — a page minted from the previous sort's cursor lands on the new
// sort's wall.
//
// Fixture models the server faithfully: `encodeCursor` always writes
// voteCount/forkCount (crud-list.ts:60-68) and `keysetPredicate` applies them
// under whatever sort the request carries (crud-list.ts:129-151), so a cursor
// minted under `newest` used with `sort=popular` yields an arbitrary
// overlapping slice. Here that slice overlaps rows 1-3.
import { chromium } from "playwright";

const ORIGIN = process.env.PROBE_ORIGIN ?? "http://127.0.0.1:8095";

const makePalette = (i) => ({
    name: `Probe Palette ${i}`,
    slug: `probe-palette-${i}`,
    userSlug: "gallery",
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
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
const NEWEST = [1, 2, 3, 4, 5, 6].map(makePalette);
const POPULAR = [6, 5, 4, 3, 2, 1].map(makePalette);
const STALE_CURSOR_SLICE = [1, 2, 3].map(makePalette); // overlaps POPULAR

const isPaletteRest = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const msgs = [];
page.on("console", (m) => {
    const t = m.text();
    if (/duplicate|key/i.test(t) || m.type() === "error" || m.type() === "warning") msgs.push(`${m.type()}: ${t}`);
});
const timeline = [];

await page.route(isPaletteRest, async (route) => {
    const u = new URL(route.request().url());
    const cursor = u.searchParams.get("cursor");
    const sort = u.searchParams.get("sort");
    timeline.push(`REQ sort=${sort} cursor=${cursor ?? "-"}`);
    let delay = 0;
    let data;
    if (cursor) {
        delay = 5000; // the load-more page is the SLOW one — lands last
        data = { data: STALE_CURSOR_SLICE, nextCursor: null, hasMore: false };
    } else if (sort === "popular") {
        delay = 3000; // the sort refetch is IN FLIGHT when load-more is clicked
        data = { data: POPULAR, nextCursor: "pop-2", hasMore: true };
    } else {
        data = { data: NEWEST, nextCursor: "page-2", hasMore: true };
    }
    if (delay) await new Promise((r) => setTimeout(r, delay));
    timeline.push(`RES sort=${sort} cursor=${cursor ?? "-"}`);
    return route
        .fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(data) })
        .catch(() => {});
});

await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "domcontentloaded", timeout: 60000 });
const main = page.getByRole("main");
const cards = main.getByRole("article").filter({ visible: true });
await cards.first().waitFor({ timeout: 45000 });
const before = await cards.count();

// 1 · open the filter popover and pick "Most Popular" (fires loadRemotePalettes(true))
await main.getByRole("button", { name: "Filters" }).first().click();
await page.waitForTimeout(300);
await page.getByText("Most Popular", { exact: true }).first().click();

// 2 · IMMEDIATELY click load-more (the sort response has not landed yet)
const more = main.getByRole("button", { name: "More from the commons" }).filter({ visible: true });
const moreVisibleDuringSort = await more.count();
if (moreVisibleDuringSort) await more.first().click({ force: true });

await page.waitForTimeout(9000);

const after = await cards.count();
const names = await page.evaluate(() =>
    [...document.querySelectorAll('[role="article"]')]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => e.getAttribute("aria-label")),
);
const dupes = names.filter((n, i) => names.indexOf(n) !== i);

console.log(
    JSON.stringify(
        { before, moreVisibleDuringSort, after, names, duplicateCards: dupes, timeline, consoleMsgs: msgs.slice(0, 10) },
        null,
        1,
    ),
);
await ctx.close();
await browser.close();
