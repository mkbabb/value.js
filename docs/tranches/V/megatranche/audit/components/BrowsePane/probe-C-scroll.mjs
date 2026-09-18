// CHALLENGE-C follow-up — (1) is `pm.searchQuery` shared across the Browse and
// My Palettes panes? (2) does focusing the Browse search box scroll the pane
// layout horizontally?
import { chromium } from "@playwright/test";

const mk = (n) => ({
    name: `Wall Palette ${n}`, slug: `wall-palette-${n}`, userSlug: "gallery",
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    createdAt: "2026-07-05T00:00:00.000Z", updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: n, visibility: "public", tier: "standard", published: true,
});
const PAGE1 = Array.from({ length: 50 }, (_, i) => mk(i + 1));
const isRest = (u) => !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname);
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane";

const browser = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.route((u) => isRest(u) && /(^|\/)palettes(\/|$)/.test(u.pathname), (r) => {
    const u = new URL(r.request().url());
    if (u.searchParams.get("q")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], nextCursor: null, hasMore: false }) });
    return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: PAGE1, nextCursor: null, hasMore: false }) });
});
await page.route((u) => isRest(u) && /(^|\/)tags(\/|$)/.test(u.pathname), (r) => r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));

await page.goto("http://localhost:9123/#/browse", { waitUntil: "domcontentloaded" });
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("article").filter({ visible: true }).first().waitFor({ timeout: 20000 });

const snapshot = () => page.evaluate(() => {
    const inputs = [...document.querySelectorAll("input")]
        .filter((i) => i.getBoundingClientRect().width > 0)
        .map((i) => ({ placeholder: i.placeholder, value: i.value }));
    const scrollers = [...document.querySelectorAll("*")]
        .filter((e) => e.scrollWidth - e.clientWidth > 2 && e.clientWidth > 200)
        .map((e) => ({
            sel: e.tagName.toLowerCase() + (e.className ? "." + String(e.className).split(/\s+/).slice(0, 2).join(".") : ""),
            scrollLeft: Math.round(e.scrollLeft),
            over: e.scrollWidth - e.clientWidth,
        }));
    return { inputs, scrollers, docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
});

const out = { before: await snapshot() };
const search = main.getByPlaceholder("Search the commons...").filter({ visible: true }).first();
await search.fill("zzzzqqq");
await page.waitForTimeout(1800);
out.afterTyping = await snapshot();
await page.screenshot({ path: `${D}/frame-shared-search-query.png` });
console.log(JSON.stringify(out, null, 2));
await browser.close();
