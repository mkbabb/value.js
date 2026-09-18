// CHALLENGE-C live probe — drives the running dev server (http://localhost:9000)
// with a routed commons so the WALL state (never captured by the visual audit,
// which only ever saw the error plate) is on screen.
//
// Run: node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C-live.mjs
import { chromium } from "@playwright/test";

const PAGE1 = Array.from({ length: 50 }, (_, i) => ({
    name: `Wall Palette ${i + 1}`,
    slug: `wall-palette-${i + 1}`,
    userSlug: "gallery",
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: i, visibility: "public", tier: "standard", published: true,
}));
const PAGE2 = PAGE1.slice(0, 12).map((p, i) => ({ ...p, name: `Wall Palette ${51 + i}`, slug: `wall-palette-${51 + i}` }));

const isPalettesRest = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

const out = {};
const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const warns = [];
page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") warns.push(`${m.type()}: ${m.text()}`); });

let holdPage2 = false;
let page2Release;
await page.route(isPalettesRest, async (route) => {
    const u = new URL(route.request().url());
    const q = u.searchParams.get("q");
    const cursor = u.searchParams.get("cursor");
    if (cursor) {
        if (holdPage2) await new Promise((r) => (page2Release = r));
        return route.fulfill({ status: 200, contentType: "application/json",
            body: JSON.stringify({ data: PAGE2, nextCursor: null, hasMore: false }) }).catch(() => {});
    }
    if (q) {
        return route.fulfill({ status: 200, contentType: "application/json",
            body: JSON.stringify({ data: [], nextCursor: null, hasMore: false }) });
    }
    return route.fulfill({ status: 200, contentType: "application/json",
        body: JSON.stringify({ data: PAGE1, nextCursor: "page-2", hasMore: true }) });
});
await page.route((u) => /(^|\/)tags(\/|$)/.test(u.pathname) && !/\.\w+$/.test(u.pathname),
    (r) => r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));

await page.goto("http://localhost:9123/#/browse", { waitUntil: "domcontentloaded" });
const main = page.getByRole("main", { name: "Color tool panes" });
const cards = main.getByRole("article").filter({ visible: true });
await cards.first().waitFor({ timeout: 20000 });
out.page1Cards = await cards.count();

// ── A · the WALL state a11y + geometry (the visual audit never reached it) ──
out.wall = await page.evaluate(() => {
    const pane = [...document.querySelectorAll("*")].find(
        (e) => e.className && String(e.className).includes("palette-card-grid"),
    )?.closest("[data-slot], .pane-scroll-fade") ?? document.body;
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const name = (b) =>
        (b.getAttribute("aria-label") || b.textContent || b.title || "").trim();
    const buttons = [...pane.querySelectorAll("button,[role=button],a[href],input,select")].filter(vis);
    const small = buttons
        .map((b) => ({ tag: b.tagName.toLowerCase(), label: name(b), ...(({ width: w, height: h }) => ({ w: Math.round(w), h: Math.round(h) }))(b.getBoundingClientRect()) }))
        .filter((b) => b.w < 24 || b.h < 24);
    const nameless = buttons.filter((b) => b.tagName === "BUTTON" && !name(b)).length;
    return {
        operableControls: buttons.length,
        smallTapTargets: small,
        namelessButtons: nameless,
        liveRegions: [...document.querySelectorAll("[aria-live],[role=status],[role=alert],[aria-busy]")]
            .filter(vis).map((e) => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), busy: e.getAttribute("aria-busy"), text: (e.textContent || "").trim().slice(0, 40) })),
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        bodyText: document.body.innerText.length,
    };
});

// ── B · a zero-result SEARCH shows the "start the wall" invitation ──────────
const search = main.getByPlaceholder("Search the commons...").filter({ visible: true }).first();
await search.click();
await search.fill("zzzzqqq");
await page.waitForTimeout(1400);
out.zeroResultSearch = {
    cards: await cards.count(),
    eyebrow: await main.getByText("· the commons ·").first().isVisible().catch(() => false),
    copy: await main.getByText("No published palettes here yet.").first().isVisible().catch(() => false),
    hint: await main.getByText("Publish one from My Palettes and start the wall.").first().isVisible().catch(() => false),
    searchBoxStillShows: await search.inputValue(),
};

// ── C · the stranded `loadingMore` flag, end to end ─────────────────────────
await search.fill("");
await page.waitForTimeout(1400);
await cards.first().waitFor({ timeout: 20000 });
const more = main.getByRole("button", { name: "More from the commons" }).filter({ visible: true });
out.loadMoreVisibleBefore = await more.count();
holdPage2 = true;
await more.first().click();
await page.waitForTimeout(200);
// while page 2 is in flight, the user types → loadRemotePalettes(true) bumps the generation
await search.fill("zz");
await page.waitForTimeout(1400);
if (page2Release) page2Release();      // page 2 finally lands — and is discarded
await page.waitForTimeout(1200);
await search.fill("");
await page.waitForTimeout(1600);
out.afterRace = {
    cards: await cards.count(),
    loadingMoreSkeletonStillOnScreen:
        (await main.locator('[aria-label="Loading more palettes"]').filter({ visible: true }).count()) > 0,
    loadMoreButtonCount: await more.count(),
};
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C-after-race.png", fullPage: false });

out.consoleNoise = warns.slice(0, 10);
console.log(JSON.stringify(out, null, 2));
await browser.close();
