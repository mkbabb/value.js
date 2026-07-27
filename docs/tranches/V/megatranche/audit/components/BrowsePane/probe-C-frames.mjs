// CHALLENGE-C frame probe — captures the two mis-stated states as images and
// resolves the computed a11y role of the loading blocks.
import { chromium } from "@playwright/test";

const mk = (n) => ({
    name: `Wall Palette ${n}`, slug: `wall-palette-${n}`, userSlug: "gallery",
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    createdAt: "2026-07-05T00:00:00.000Z", updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: n, visibility: "public", tier: "standard", published: true,
});
const PAGE1 = Array.from({ length: 50 }, (_, i) => mk(i + 1));
const PAGE2 = Array.from({ length: 12 }, (_, i) => mk(51 + i));
const isRest = (u) => !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname);
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane";

const browser = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
let hold = false, release;
await page.route((u) => isRest(u) && /(^|\/)palettes(\/|$)/.test(u.pathname), async (r) => {
    const u = new URL(r.request().url());
    if (u.searchParams.get("cursor")) {
        if (hold) await new Promise((res) => (release = res));
        return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: PAGE2, nextCursor: null, hasMore: false }) }).catch(() => {});
    }
    if (u.searchParams.get("q")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], nextCursor: null, hasMore: false }) });
    return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: PAGE1, nextCursor: "page-2", hasMore: true }) });
});
await page.route((u) => isRest(u) && /(^|\/)tags(\/|$)/.test(u.pathname), (r) => r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));

await page.goto("http://localhost:9123/#/browse", { waitUntil: "domcontentloaded" });
const main = page.getByRole("main", { name: "Color tool panes" });
const cards = main.getByRole("article").filter({ visible: true });
await cards.first().waitFor({ timeout: 20000 });
const out = {};

// FRAME 1 — a zero-result SEARCH renders the "start the wall" invitation.
const search = main.getByPlaceholder("Search the commons...").filter({ visible: true }).first();
await search.fill("zzzzqqq");
await page.waitForTimeout(1500);
await page.screenshot({ path: `${D}/frame-zero-result-search.png` });

// FRAME 2 — the stranded load-more skeletons (scrolled into view).
await search.fill("");
await page.waitForTimeout(1500);
await cards.first().waitFor({ timeout: 20000 });
hold = true;
await main.getByRole("button", { name: "More from the commons" }).filter({ visible: true }).first().click();
await page.waitForTimeout(200);
await search.fill("zz");
await page.waitForTimeout(1500);
if (release) release();
await page.waitForTimeout(1200);
await search.fill("");
await page.waitForTimeout(1800);
const stranded = main.locator('[aria-label="Loading more palettes"]').filter({ visible: true }).first();
await stranded.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
out.strandedVisible = await stranded.isVisible();
await page.screenshot({ path: `${D}/frame-stranded-loadmore.png` });

// The computed roles of the two aria-labelled loading blocks.
out.roles = await page.evaluate(() => {
    const q = (sel) => [...document.querySelectorAll(sel)].filter((e) => e.getBoundingClientRect().height > 0);
    const describe = (e) => ({
        tag: e.tagName.toLowerCase(),
        role: e.getAttribute("role"),
        ariaLabel: e.getAttribute("aria-label"),
        ariaLive: e.getAttribute("aria-live"),
        ariaBusy: e.getAttribute("aria-busy"),
    });
    return {
        loadingMore: q('[aria-label="Loading more palettes"]').map(describe),
        loadingWall: q('[aria-label="Loading palettes"]').map(describe),
        anyLiveInBrowse: [...document.querySelectorAll('[aria-live]')].length,
    };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
