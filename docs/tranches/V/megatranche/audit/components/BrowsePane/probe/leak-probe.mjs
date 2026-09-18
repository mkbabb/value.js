// CHALLENGE-C probe 2 — (a) the `cardRefs` retention measurement, read directly
// off the live BrowsePane setup state via Vue's dev-mode `__vueParentComponent`
// back-pointer; (b) the WebKit half of the keyboard two-engine proof.
// Read-only; GET /palettes routed to a local fixture.
import { chromium, webkit } from "playwright";

const ORIGIN = process.env.PROBE_ORIGIN ?? "http://127.0.0.1:8090";
const N = 6;

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
const PAGE1 = Array.from({ length: N }, (_, i) => makePalette(i + 1));
const PAGE2 = Array.from({ length: 3 }, (_, i) => makePalette(N + i + 1));

const isPaletteRest = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

const SWIFTSHADER = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"];

const READ_CARDREFS = `(() => {
  const el = [...document.querySelectorAll('[role="article"]')].find(e => e.getBoundingClientRect().width > 0)
          || document.querySelector('.palette-card-grid');
  if (!el) return { error: 'no anchor element' };
  let c = el.__vueParentComponent;
  let hops = 0;
  while (c && hops < 40) {
    const st = c.setupState;
    if (st && st.cardRefs) {
      const keys = Object.keys(st.cardRefs);
      return { name: c.type && (c.type.__name || c.type.name), keys: keys.length, sample: keys.slice(0, 3) };
    }
    c = c.parent; hops++;
  }
  return { error: 'cardRefs not found', hops };
})()`;

async function run(name, browserType, launchOpts, opts = {}) {
    const origin = opts.origin ?? ORIGIN;
    const browser = await browserType.launch(launchOpts);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.route(isPaletteRest, (route) => {
        const cursor = new URL(route.request().url()).searchParams.get("cursor");
        const body =
            cursor === "page-2"
                ? { data: PAGE2, nextCursor: null, hasMore: false }
                : { data: PAGE1, nextCursor: "page-2", hasMore: true };
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
    });
    await page.goto(`${origin}/#/browse`, { waitUntil: "domcontentloaded", timeout: 60000 });
    const main = page.getByRole("main");
    const cards = main.getByRole("article").filter({ visible: true });
    await cards.first().waitFor({ timeout: 45000 });

    const out = { engine: name };

    // ── keyboard reachability (the two-engine half) ──────────────────────────
    out.cardAttrs = await page.evaluate(() =>
        [...document.querySelectorAll('[role="article"]')]
            .filter((e) => e.getBoundingClientRect().width > 0)
            .slice(0, 1)
            .map((e) => ({ tag: e.tagName, tabindex: e.getAttribute("tabindex"), ariaExpanded: e.getAttribute("aria-expanded"), cursor: getComputedStyle(e).cursor })),
    );
    await main.getByPlaceholder("Search the commons...").first().click();
    out.cardFocusedByTab = false;
    let stops = 0;
    for (let i = 0; i < 30; i++) {
        await page.keyboard.press("Tab");
        const isCard = await page.evaluate(() => document.activeElement?.getAttribute("role") === "article");
        stops++;
        if (isCard) { out.cardFocusedByTab = true; break; }
    }
    out.tabStops = stops;
    // Enter on the card while it is programmatically focused → does it expand?
    out.enterExpands = await page.evaluate(() => {
        const el = [...document.querySelectorAll('[role="article"]')].find((e) => e.getBoundingClientRect().width > 0);
        if (!el) return null;
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        return document.querySelectorAll('[aria-label^="Copy slug"]').length;
    });

    if (opts.leak) {
        out.refsAfterFirstPage = await page.evaluate(READ_CARDREFS);
        const more = main.getByRole("button", { name: "More from the commons" }).filter({ visible: true });
        if (await more.count()) { await more.first().click(); await page.waitForTimeout(1500); }
        out.cardsAfterMore = await cards.count();
        out.refsAfterLoadMore = await page.evaluate(READ_CARDREFS);

        // Wipe the wall via the search field (client filter + server refetch).
        const search = main.getByPlaceholder("Search the commons...").first();
        await search.click();
        await search.fill("zzz-no-match");
        await page.waitForTimeout(1800);
        out.cardsAfterWipe = await cards.count();
        out.refsAfterWipe = await page.evaluate(READ_CARDREFS);

        // Restore, then wipe again, to see whether the map ever shrinks.
        await search.fill("");
        await page.waitForTimeout(1800);
        out.cardsRestored = await cards.count();
        out.refsRestored = await page.evaluate(READ_CARDREFS);
    }

    await ctx.close();
    await browser.close();
    return out;
}

const results = {};
try {
    results.chromium = await run("chromium", chromium, { channel: "chromium", args: SWIFTSHADER }, { leak: true });
} catch (e) { results.chromium = { error: String(e).split("\n")[0] }; }
for (const origin of [ORIGIN, "http://localhost:8090", "http://[::1]:8090"]) {
    try {
        results.webkit = await run("webkit", webkit, {}, { leak: false, origin });
        results.webkit.origin = origin;
        break;
    } catch (e) { results.webkit = { error: String(e).split("\n")[0], origin }; }
}
console.log(JSON.stringify(results, null, 1));
