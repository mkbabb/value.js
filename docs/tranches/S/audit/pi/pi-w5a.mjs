#!/usr/bin/env node
// π visual-runtime capture — S.W5 Lane A static-shot lane (w5a-before at lane
// open; w5a-after at lane close). Sibling to `pi-capture.mjs` (S.W4) under the
// SAME `docs/tranches/S/audit/pi/` standing root — the `w{N}-{before,after}`
// layout, extended with the Lane A page set: browse / my-palettes / the five
// admin views, in the §6.1 matrix (3 viewports × light/dark) PLUS the states
// this lane's items own:
//   - browse-loading  — the DELAYED-ROUTE state (skeleton mid-fetch, W5-1);
//   - browse-error    — /palettes aborted (error ≠ empty, W5-5);
//   - browse-scrolled — the PaneHeader band under scroll (the W5-2 rider:
//                       hard edge DEAD at rest; band earns its surface only
//                       when content scrolls under it);
//   - admin-down      — every /admin/* aborted (the F-2 silently-costumed
//                       backend-down state — the W5-5 P0 case);
//   - card-menu       — the PaletteCard menu open (the Q1 visibility control
//                       surface, W5-13 consume).
//
// All API traffic is route-mocked in-harness (populated envelopes mirroring
// e2e/smoke/admin/fixtures/admin-populated.ts + fixtures/browse-palettes.ts),
// so the capture is deterministic and never touches a live backend. The
// owner's :9000 dev server is never used — run a disposable vite on a free
// port (see usage).
//
// Usage:
//   VITE_API_URL=http://localhost:59999 npx vite --port 4881 --strictPort &
//   node docs/tranches/S/audit/pi/pi-w5a.mjs http://localhost:4881 \
//     docs/tranches/S/audit/pi/w5a-before   # (or w5a-after at close)
//
// Binary hygiene (the R/S convention): PNGs self-ignore under `.gitignore:19
// *.png`; only this harness + manifest.json commit.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:4881";
const OUT = process.argv[3];
if (!OUT) { console.error("usage: pi-w5a.mjs <baseURL> <outDir>"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "mobile-390x844", width: 390, height: 844, mobile: true },
    { name: "laptop-1024x768", width: 1024, height: 768, mobile: false },
    { name: "wide-1440x900", width: 1440, height: 900, mobile: false },
];
const SCHEMES = ["light", "dark"];

// ---------------------------------------------------------------------------
// Fixtures (inline mirrors of the committed e2e fixtures — shape-correct).
const NOW = "2026-07-05T00:00:00.000Z";
const WALL_HUES = [12, 40, 80, 130, 170, 210, 250, 290, 330, 20, 60, 100];
const WALL = WALL_HUES.map((h, i) => ({
    name: `Wall Palette ${i + 1}`,
    slug: `wall-palette-${i + 1}`,
    userSlug: i % 3 === 0 ? "me-owner" : "gallery",
    colors: [0, 1, 2, 3].map((j) => ({
        css: `oklch(${0.72 - j * 0.09} 0.14 ${h + j * 14})`,
        position: j,
    })),
    tags: i % 2 ? ["moody"] : [],
    createdAt: NOW, updatedAt: NOW, isLocal: false,
    voteCount: i * 3, visibility: i % 3 === 0 && i % 2 === 0 ? "private" : "public",
    tier: i === 2 ? "featured" : "standard", published: true,
}));
const USERS = [
    { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
    { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    { slug: "verdant-mole-of-the-long-slug-33", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
];
const FLAGGED = [
    {
        paletteSlug: "sunset-riot-9a3f",
        palette: { ...WALL[0], name: "Sunset Riot", slug: "sunset-riot-9a3f", userSlug: "crimson-owl-77" },
        flagCount: 2,
        flags: [
            { reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW },
            { reporterSlug: "verdant-mole-33", reason: "offensive", detail: "harsh clash", createdAt: NOW },
        ],
    },
    { paletteSlug: "deleted-palette-slug", palette: null, flagCount: 1,
      flags: [{ reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW }] },
];
const AUDIT = [
    { id: "a1", timestamp: NOW, action: "palette.feature", target: "sunset-riot-9a3f", ipHash: "ip-3f9a" },
    { id: "a2", timestamp: NOW, action: "user.delete", target: "spammer-42", ipHash: "ip-7c1d" },
    { id: "a3", timestamp: NOW, action: "flag.dismiss", target: "neon-haze-1b2c", ipHash: "ip-b2c0" },
];
const QUEUE = [
    { id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "azure-fox-01", createdAt: NOW },
    { id: "c2", name: "A Very Long Proposed Color Name For Overflow", css: "color(display-p3 0.2 0.7 0.4)", status: "proposed", contributor: "crimson-owl-77", createdAt: NOW },
];
const TAGS = [
    { id: "t1", name: "moody", category: "mood", createdAt: NOW },
    { id: "t2", name: "pastel", category: "tone", createdAt: NOW },
];
const SAVED_STORE = {
    version: 1,
    palettes: [
        { id: "pi-a", name: "Field Notes", slug: "field-notes", isLocal: true, createdAt: NOW, updatedAt: NOW,
          colors: [0, 1, 2, 3, 4].map((j) => ({ css: `oklch(${0.8 - j * 0.1} 0.12 ${140 + j * 8})`, position: j })) },
        { id: "pi-b", name: "Wax + Ink", slug: "wax-ink", isLocal: true, createdAt: NOW, updatedAt: NOW,
          colors: [0, 1, 2].map((j) => ({ css: `oklch(${0.55 + j * 0.12} 0.16 ${20 + j * 30})`, position: j })) },
    ],
};
const paginated = (data) => JSON.stringify({ data, total: data.length, limit: 50, offset: 0 });

const isApiPath = (url, re) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    re.test(url.pathname);

// mode: "populated" | "delay" | "abort" (browse); admin has its own flag.
async function routeApi(page, { browse = "populated", admin = "populated", browseDelayMs = 60000 } = {}) {
    await page.route((url) => isApiPath(url, /(^|\/)sessions(\/|$)/), (route) =>
        route.fulfill({ status: 200, contentType: "application/json",
            body: JSON.stringify({ token: "pi-session", userSlug: "me-owner" }) }));
    await page.route((url) => isApiPath(url, /(^|\/)colors(\/|$)/), (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify([]) }));
    await page.route((url) => isApiPath(url, /(^|\/)admin(\/|$)/), (route) => {
        if (admin === "abort") return route.abort("connectionrefused");
        const url = route.request().url();
        const json = (body, status = 200) => route.fulfill({ status, contentType: "application/json", body });
        if (route.request().method() !== "GET") return json("{}");
        if (url.includes("/admin/tags")) return json(JSON.stringify(TAGS));
        if (url.includes("/admin/users/") && url.includes("/palettes")) return json(JSON.stringify([WALL[0], WALL[1]]));
        if (url.includes("/admin/users")) return json(paginated(USERS));
        if (url.includes("/admin/flagged")) return json(paginated(FLAGGED));
        if (url.includes("/admin/audit")) return json(paginated(AUDIT));
        if (url.includes("/admin/queue") || url.includes("/admin/approved")) return json(paginated(QUEUE));
        return json(paginated([]));
    });
    await page.route((url) => isApiPath(url, /(^|\/)palettes(\/|$)/), async (route) => {
        if (browse === "abort") return route.abort("connectionrefused");
        if (browse === "delay") {
            await new Promise((r) => setTimeout(r, browseDelayMs));
            return route.abort("timedout").catch(() => {});
        }
        return route.fulfill({ status: 200, contentType: "application/json",
            body: JSON.stringify({ data: WALL, nextCursor: "page-2", hasMore: true }) });
    });
}

const SHOTS = [
    { id: "browse", url: "/#/browse", api: {}, viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"],
      async run() {} },
    { id: "browse-scrolled", url: "/#/browse", api: {}, viewports: ["mobile-390x844", "wide-1440x900"],
      async run(page) {
          await page.evaluate(() => {
              const panes = [...document.querySelectorAll(".pane-scroll-fade")];
              for (const p of panes) p.scrollTop = 240;
          });
          await page.waitForTimeout(600);
      } },
    { id: "browse-loading", url: "/#/browse", api: { browse: "delay" }, settle: 1400,
      viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"], async run() {} },
    { id: "browse-error", url: "/#/browse", api: { browse: "abort" },
      viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"], async run() {} },
    { id: "card-menu", url: "/#/browse", api: {}, viewports: ["wide-1440x900"],
      async run(page) {
          const trigger = page.locator('[aria-label="Palette menu"]').first();
          await trigger.waitFor({ state: "visible", timeout: 8000 });
          await trigger.click();
          await page.waitForTimeout(500);
      } },
    { id: "palettes", url: "/#/palettes", api: {}, seedSaved: true,
      viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"], async run() {} },
    { id: "palettes-one-color", url: "/#/palettes", api: {}, seedSaved: true, viewports: ["wide-1440x900"],
      async run(page) {
          // Drive the real add-current-color ghost once → the count row reads
          // its singular form (the "1 colors" superfluity row's evidence).
          const add = page.locator('[aria-label^="Add current color"]').first();
          try {
              await add.waitFor({ state: "visible", timeout: 6000 });
              await add.click();
              await page.waitForTimeout(600);
          } catch { /* state unreachable — shot still records the pane */ }
      } },
    { id: "admin-users", url: "/#/admin/users", api: {}, adminToken: true,
      viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"], async run() {} },
    { id: "admin-names", url: "/#/admin/names", api: {}, adminToken: true,
      viewports: ["mobile-390x844", "laptop-1024x768", "wide-1440x900"], async run() {} },
    { id: "admin-audit", url: "/#/admin/audit", api: {}, adminToken: true,
      viewports: ["mobile-390x844", "wide-1440x900"], async run() {} },
    { id: "admin-flagged", url: "/#/admin/flagged", api: {}, adminToken: true,
      viewports: ["mobile-390x844", "wide-1440x900"], async run() {} },
    { id: "admin-tags", url: "/#/admin/tags", api: {}, adminToken: true,
      viewports: ["mobile-390x844", "wide-1440x900"], async run() {} },
    { id: "admin-down", url: "/#/admin/users", api: { admin: "abort" }, adminToken: true,
      viewports: ["mobile-390x844", "wide-1440x900"], async run() {} },
];

const manifest = { capturedAt: new Date().toISOString(), base: BASE, shots: [] };
const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        for (const shot of SHOTS) {
            if (!shot.viewports.includes(vp.name)) continue;
            const ctx = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                colorScheme: scheme,
                deviceScaleFactor: 1,
            });
            await ctx.addInitScript(({ s, seedSaved, adminToken, savedStore }) => {
                try {
                    localStorage.setItem("vueuse-color-scheme", s);
                    if (seedSaved) localStorage.setItem("color-palettes", JSON.stringify(savedStore));
                    if (adminToken) localStorage.setItem("palette-admin-token", "pi-admin-token");
                } catch {}
            }, { s: scheme, seedSaved: !!shot.seedSaved, adminToken: !!shot.adminToken, savedStore: SAVED_STORE });
            const page = await ctx.newPage();
            await routeApi(page, shot.api);
            await page.goto(`${BASE}${shot.url}`, { waitUntil: "load" });
            await page.waitForTimeout(shot.settle ?? 1800); // fonts + aurora + entrance settle
            try { await shot.run(page, vp); } catch (e) { console.warn(`[run] ${shot.id}: ${e.message}`); }
            const file = `${shot.id}--${vp.name}--${scheme}.png`;
            await page.screenshot({ path: path.join(OUT, file) });
            manifest.shots.push(file);
            console.log(file);
            await ctx.close();
        }
    }
}
await browser.close();
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`π archive → ${OUT} (${manifest.shots.length} shots)`);
