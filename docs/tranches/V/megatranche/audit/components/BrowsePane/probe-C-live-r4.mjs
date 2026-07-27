// CHALLENGE-C · live probe r4 — the shared `expandedId`, measured.
// (r3's attempt was inconclusive: clicking a My-Palettes card's NAME starts a
// rename — PaletteCard.vue:57 `@click.stop="editableName && startRenaming()"` —
// so the toggle never fired. This probe clicks the colour STRIP instead.)
//
// Run: node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C-live-r4.mjs
import { chromium } from "@playwright/test";

const ORIGIN = "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane";

const mk = (n) => ({
    name: `Wall Palette ${n}`, slug: `wall-palette-${n}`, userSlug: "gallery",
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    createdAt: "2026-07-05T00:00:00.000Z", updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: n, visibility: "public", tier: "standard", published: true,
});
const PAGE1 = Array.from({ length: 6 }, (_, i) => mk(i + 1));
const LOCAL_STORE = { version: 1, palettes: [
    { id: "local-1", name: "Kitchen Reds", slug: "kitchen-reds", isLocal: true,
      colors: [{ css: "#ff0000", position: 0 }], createdAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-01T00:00:00.000Z" },
]};

const browser = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), LOCAL_STORE);
const page = await ctx.newPage();
await page.route(`${API}/**`, async (r) => {
    const u = new URL(r.request().url());
    if (r.request().method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS, body: "" });
    if (/(^|\/)tags(\/|$)/.test(u.pathname)) return r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body: "[]" });
    return r.fulfill({ status: 200, contentType: "application/json", headers: CORS,
        body: JSON.stringify({ data: /(^|\/)palettes(\/|$)/.test(u.pathname) ? PAGE1 : [], nextCursor: null, hasMore: false }) });
});

await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "domcontentloaded" });
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("article").filter({ visible: true }).first().waitFor({ timeout: 25000 });

const heights = () => page.evaluate(() =>
    Object.fromEntries([...document.querySelectorAll('[role="article"]')]
        .filter((a) => a.getBoundingClientRect().height > 0)
        .map((a) => [a.getAttribute("aria-label"), Math.round(a.getBoundingClientRect().height)])));

// click a card's COLOUR STRIP (never the name — that starts a rename)
const strip = (label) => main.getByRole("article", { name: label }).filter({ visible: true })
    .first().locator("div").first();

const out = {};
out["1_baseline"] = await heights();
await strip("Palette: Wall Palette 1").click({ position: { x: 20, y: 6 } });
await page.waitForTimeout(700);
out["2_afterExpandingWallCard"] = await heights();
await strip("Palette: Kitchen Reds").click({ position: { x: 20, y: 6 } });
await page.waitForTimeout(700);
out["3_afterExpandingMyPalettesCard"] = await heights();
await page.screenshot({ path: `${D}/r4-shared-expandedid.png` });
console.log(JSON.stringify(out, null, 2));
await browser.close();
