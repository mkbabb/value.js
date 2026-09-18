// CHALLENGE-C · live probe r2 (2026-07-27, dev server :9000).
//
// Drives the running dev server with a ROUTED commons so the WALL state is on
// screen (the real backend is down; the visual audit only ever captured the
// error plate). Decides four things:
//   A · the computed a11y shape of the two aria-labelled loading blocks
//   B · the zero-result SEARCH copy ("start the wall" on a non-empty commons)
//   C · the stranded `loadingMore` flag, end to end in the real app
//   D · cursor/filter DRIFT — the exact query strings the wall issues
//
// Run: node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C-live-r2.mjs
import { chromium } from "@playwright/test";

// NB: the dev server is reached over the LAN IP, not `localhost`, on purpose.
// `detectDevMisconfig` (demo/platform/transport/availability.ts:114) latches the
// client into the `misconfigured` state for ANY loopback page with no
// VITE_API_URL, and `assertApiAttemptAllowed` then throws BEFORE fetch — so on
// `localhost:9000` no palette request is ever issued and nothing is routable.
// A non-loopback host clears the latch; the prod BASE_URL is then intercepted.
const ORIGIN = "http://192.168.1.166:9000";
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
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    createdAt: "2026-07-05T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: n, visibility: "public", tier: "standard", published: true,
});
const PAGE1 = Array.from({ length: 50 }, (_, i) => mk(i + 1));
const PAGE2 = Array.from({ length: 12 }, (_, i) => mk(51 + i));

const isRest = (u) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname);

const out = { requests: [] };
const browser = await chromium.launch({
    channel: "chromium",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const warns = [];
page.on("console", (m) => {
    if (m.type() === "warning" || m.type() === "error") warns.push(`${m.type()}: ${m.text()}`);
});

const json = (r, body) =>
    r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body });

let hold = false, release;
await page.route(`${API}/**`, async (r) => {
    const u = new URL(r.request().url());
    if (r.request().method() === "OPTIONS") {
        return r.fulfill({ status: 204, headers: CORS, body: "" });
    }
    if (!isRest(u) || !/(^|\/)palettes(\/|$)/.test(u.pathname)) {
        if (/(^|\/)tags(\/|$)/.test(u.pathname)) return json(r, "[]");
        return json(r, "{}");
    }
    out.requests.push(u.search);
    if (u.searchParams.get("cursor")) {
        if (hold) await new Promise((res) => (release = res));
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
out.page1Cards = await cards.count();

// ── A · wall-state a11y ─────────────────────────────────────────────────────
out.wallA11y = await page.evaluate(() => {
    const grid = document.querySelector(".palette-card-grid");
    const pane = grid?.closest(".pane-scroll-fade") ?? document.body;
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const name = (b) => (b.getAttribute("aria-label") || b.textContent || b.title || "").trim();
    const controls = [...pane.querySelectorAll("button,[role=button],a[href],input,select")].filter(vis);
    return {
        operableControls: controls.length,
        namelessButtons: controls.filter((b) => b.tagName === "BUTTON" && !name(b)).length,
        smallTapTargets: controls
            .map((b) => { const r = b.getBoundingClientRect();
                return { tag: b.tagName.toLowerCase(), label: name(b).slice(0, 28), w: Math.round(r.width), h: Math.round(r.height) }; })
            .filter((b) => b.w < 24 || b.h < 24),
        liveRegionsInPane: [...pane.querySelectorAll("[aria-live],[role=status],[role=alert],[aria-busy]")].length,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
});

// ── B · zero-result search ──────────────────────────────────────────────────
const search = main.getByPlaceholder("Search the commons...").filter({ visible: true }).first();
await search.click();
await search.fill("zzzzqqq");
await page.waitForTimeout(1500);
out.zeroResultSearch = {
    cards: await cards.count(),
    eyebrow: await main.getByText("· the commons ·").first().isVisible().catch(() => false),
    copy: await main.getByText("No published palettes here yet.").first().isVisible().catch(() => false),
    hint: await main.getByText("Publish one from My Palettes and start the wall.").first().isVisible().catch(() => false),
};
await page.screenshot({ path: `${D}/r2-zero-result-search.png` });

// ── D · cursor/filter drift — a TIER change mints the cursor, then load-more
//        is issued while the search box carries a query the cursor never saw.
await search.fill("");
await page.waitForTimeout(1500);
await cards.first().waitFor({ timeout: 25000 });
const beforeDrift = out.requests.length;
// type a 2+ char query that the client filter alone can satisfy is not
// possible (the debounce always reloads) — so instead assert the SHAPE of the
// two requests the load-more path issues.
const more = main.getByRole("button", { name: "More from the commons" }).filter({ visible: true });
out.loadMoreVisibleBefore = await more.count();

// ── C · the stranded loadingMore flag ───────────────────────────────────────
hold = true;
await more.first().click();
await page.waitForTimeout(250);
await search.fill("zz");                 // bumps loadGeneration mid-flight
await page.waitForTimeout(1500);
if (release) release();                  // page 2 lands — and is discarded
await page.waitForTimeout(1200);
await search.fill("");
await page.waitForTimeout(1800);
const stranded = main.locator('[aria-label="Loading more palettes"]').filter({ visible: true }).first();
out.afterRace = {
    cards: await cards.count(),
    strandedSkeletonVisible: await stranded.isVisible().catch(() => false),
    loadMoreButtonCount: await more.count(),
};
if (out.afterRace.strandedSkeletonVisible) {
    await stranded.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
}
await page.screenshot({ path: `${D}/r2-stranded-loadmore.png` });

// the roles of the two aria-labelled loading blocks (measured on the stranded one)
out.loadingBlockRoles = await page.evaluate(() => {
    const describe = (e) => ({
        tag: e.tagName.toLowerCase(), role: e.getAttribute("role"),
        ariaLabel: e.getAttribute("aria-label"), ariaLive: e.getAttribute("aria-live"),
        ariaBusy: e.getAttribute("aria-busy"),
    });
    return {
        loadingMore: [...document.querySelectorAll('[aria-label="Loading more palettes"]')].map(describe),
        loadingWall: [...document.querySelectorAll('[aria-label="Loading palettes"]')].map(describe),
    };
});

out.driftRequests = out.requests.slice(beforeDrift);
out.consoleNoise = warns.slice(0, 8);
console.log(JSON.stringify(out, null, 2));
await browser.close();
