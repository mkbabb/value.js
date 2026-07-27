// CHALLENGE-C · live probe r3 — the cross-pane couplings + the two narrow races.
//
// The `browse` view is a TWO-PANE view (demo/shell/viewSchema.ts:124 —
// left: "browse", right: "palettes"), so BrowsePane and PalettesPane are on
// screen together at 1440. They share two single refs out of
// `providePalettePorts`: `searchQuery` (usePalettePorts.ts:54, handed to BOTH
// the browse port :183 and the library port :141) and `expandedId`
// (usePaletteActions.ts:24, handed to BOTH ports :144 / :177).
//
// Decides:
//   E · typing in "Search the commons…" also filters MY PALETTES (right pane)
//   F · expanding a card in the wall COLLAPSES the open card in My Palettes
//   G · the 400ms search-debounce window lets load-more issue a cursor minted
//       under the PREVIOUS filter set together with the NEW `q`
//   H · a colour search that matches none of the loaded page renders the
//       TRUE-EMPTY invitation and still offers "More from the commons"
//
// Run: node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C-live-r3.mjs
import { chromium } from "@playwright/test";

const ORIGIN = "http://192.168.1.166:9000";   // non-loopback: clears the dev-misconfig latch
const API = "https://api.color.babb.dev";
const CORS = {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "*",
};
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane";

const mk = (n) => ({
    name: `Wall Palette ${n}`,
    slug: `wall-palette-${n}`,
    userSlug: "gallery",
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],   // a red-ish palette
    createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: n, visibility: "public", tier: "standard", published: true,
});
const PAGE1 = Array.from({ length: 50 }, (_, i) => mk(i + 1));
const PAGE2 = Array.from({ length: 12 }, (_, i) => mk(51 + i));

const LOCAL_STORE = {
    version: 1,
    palettes: [
        { id: "local-1", name: "Kitchen Reds", slug: "kitchen-reds", isLocal: true,
          colors: [{ css: "#ff0000", position: 0 }], createdAt: "2026-07-01T00:00:00.000Z",
          updatedAt: "2026-07-01T00:00:00.000Z" },
        { id: "local-2", name: "Zephyr Blues", slug: "zephyr-blues", isLocal: true,
          colors: [{ css: "#0000ff", position: 0 }], createdAt: "2026-07-01T00:00:00.000Z",
          updatedAt: "2026-07-01T00:00:00.000Z" },
    ],
};

const out = { requests: [] };
const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((store) => {
    localStorage.setItem("color-palettes", JSON.stringify(store));
}, LOCAL_STORE);
const page = await ctx.newPage();

const json = (r, body) => r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body });
let holdPage2 = false, release;
await page.route(`${API}/**`, async (r) => {
    const u = new URL(r.request().url());
    if (r.request().method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS, body: "" });
    if (/(^|\/)tags(\/|$)/.test(u.pathname)) return json(r, "[]");
    if (!/(^|\/)palettes(\/|$)/.test(u.pathname)) return json(r, "{}");
    out.requests.push(u.search);
    if (u.searchParams.get("cursor")) {
        if (holdPage2) await new Promise((res) => (release = res));
        return json(r, JSON.stringify({ data: PAGE2, nextCursor: null, hasMore: false })).catch(() => {});
    }
    if (u.searchParams.get("q")) {
        return json(r, JSON.stringify({ data: [], nextCursor: null, hasMore: false }));
    }
    return json(r, JSON.stringify({ data: PAGE1, nextCursor: "page-2", hasMore: true }));
});

await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "domcontentloaded" });
const main = page.getByRole("main", { name: "Color tool panes" });
const cards = main.getByRole("article").filter({ visible: true });
await cards.first().waitFor({ timeout: 25000 });

const countText = async (t) => main.getByText(t, { exact: true }).filter({ visible: true }).count();
out.E_before = {
    wallCards: await cards.count(),
    myPalettes_KitchenReds: await countText("Kitchen Reds"),
    myPalettes_ZephyrBlues: await countText("Zephyr Blues"),
};

// ── E · one searchQuery for two panes ───────────────────────────────────────
const search = main.getByPlaceholder("Search the commons...").filter({ visible: true }).first();
await search.click();
await search.fill("zephyr");
await page.waitForTimeout(1400);
out.E_afterTypingInCommonsSearch = {
    wallCards: await cards.count(),
    myPalettes_KitchenReds: await countText("Kitchen Reds"),   // ← filtered OUT by the commons box
    myPalettes_ZephyrBlues: await countText("Zephyr Blues"),
    myPalettesSearchBoxValue: await main
        .getByPlaceholder("Search your palettes...").filter({ visible: true }).first().inputValue(),
};
await page.screenshot({ path: `${D}/r3-shared-search-query.png` });
await search.fill("");
await page.waitForTimeout(1500);
await cards.first().waitFor({ timeout: 25000 });

// ── F · one expandedId for two panes ────────────────────────────────────────
// A card has no `aria-expanded` / no data attribute (PaletteCard.vue:5-26), so
// expansion is measured geometrically: an expanded card is materially taller.
const tallest = () => page.evaluate(() => {
    const vis = (el) => el.getBoundingClientRect().height > 0;
    return [...document.querySelectorAll('[role="article"]')].filter(vis)
        .map((a) => ({ label: a.getAttribute("aria-label"), h: Math.round(a.getBoundingClientRect().height) }))
        .sort((x, y) => y.h - x.h).slice(0, 3);
});
out.F_collapsedBaseline = await tallest();
const myCard = main.getByText("Kitchen Reds", { exact: true }).filter({ visible: true }).first();
await myCard.click();
await page.waitForTimeout(700);
out.F_afterExpandingMyPalette = await tallest();
await cards.first().click();      // now expand a WALL card in the LEFT pane
await page.waitForTimeout(700);
out.F_afterExpandingWallCard = await tallest();

// ── H · a colour search matching none of the loaded page ────────────────────
await page.keyboard.press("Escape");
const filterBtn = main.getByRole("button", { name: "Filters" }).filter({ visible: true }).first();
await filterBtn.click();
await page.waitForTimeout(400);
const colorInput = page.getByLabel("Search by CSS color").filter({ visible: true }).first();
await colorInput.fill("#00ff00");                      // green: far from every seeded oklab
await page.getByRole("button", { name: "Search", exact: true }).filter({ visible: true }).first().click();
await page.waitForTimeout(600);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
out.H_colorSearchNoMatch = {
    wallCards: await cards.count(),
    trueEmptyInvitation: await main.getByText("No published palettes here yet.").first().isVisible().catch(() => false),
    hint: await main.getByText("Publish one from My Palettes and start the wall.").first().isVisible().catch(() => false),
    loadMoreStillOffered: await main.getByRole("button", { name: "More from the commons" })
        .filter({ visible: true }).count(),
    requestsIssuedByColorSearch: out.requests.length,
};
await page.screenshot({ path: `${D}/r3-color-search-empty.png` });

// ── G · the 400ms debounce window: cursor(old filters) + q(new filters) ─────
await filterBtn.click();
await page.waitForTimeout(300);
await page.getByRole("button", { name: "Clear all filters" }).filter({ visible: true }).first().click();
await page.waitForTimeout(1500);
await page.keyboard.press("Escape");
await cards.first().waitFor({ timeout: 25000 });
const beforeG = out.requests.length;
await search.click();
await search.pressSequentially("ab", { delay: 20 });     // debounce now pending (400ms)
await main.getByRole("button", { name: "More from the commons" })
    .filter({ visible: true }).first().click({ timeout: 2000 });   // clicked INSIDE the window
await page.waitForTimeout(2000);
out.G_debounceWindow = { requests: out.requests.slice(beforeG) };

console.log(JSON.stringify(out, null, 2));
await browser.close();
