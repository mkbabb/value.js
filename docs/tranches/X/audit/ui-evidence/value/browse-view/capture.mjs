// UI-AUDIT seat `browse-view` (COHESION §0bl) — read-only capture.
// Headed Chromium on the real GPU; served dev page :9000 (never started/stopped here).
// The local DB holds 0 published palettes; the `loaded`/`selected` states fulfil
// GET :3000/palettes from a fixture via page.route (no DB write — READ-ONLY law).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const only = process.argv[2];
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();

const now = "2026-09-20T12:00:00.000Z";
const R = (slug, name, colors, extra = {}) => ({
    slug, name, userSlug: extra.userSlug ?? "ada", colors: colors.map((css, position) => ({ css, position })),
    createdAt: now, updatedAt: now, isLocal: false, visibility: "public", published: true, tier: "standard",
    voteCount: 3, voted: false, tags: [], ...extra,
});
const FIXTURE = [
    R("sunset-coast-a1", "Sunset Coast", ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"], { tags: ["warm", "ocean"], voteCount: 12, tier: "featured" }),
    R("forest-floor-b2", "Forest Floor", ["#2d4a22", "#5b7c3a", "#a3b18a", "#dad7cd"], { tags: ["nature"], voteCount: 4 }),
    R("neon-arcade-c3", "Neon Arcade", ["oklch(0.7 0.3 330)", "oklch(0.8 0.2 190)", "oklch(0.9 0.2 110)", "#111111", "#ffffff", "#7f5af0"], { tags: ["retro", "vivid", "synth", "night"], voteCount: 27, voted: true }),
    R("quiet-greys-d4", "Quiet Greys", ["#f5f5f4", "#a8a29e", "#57534e"], { voteCount: 0 }),
    R("a-very-long-palette-name-e5", "A Very Long Palette Name That Should Truncate Gracefully", ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#8ab17d", "#babb74", "#e97c61"], { voteCount: 1 }),
    R("mono-f6", "Mono", ["#000000"], { voteCount: 0 }),
];

const seed = (theme) => `(() => { try {
    if (sessionStorage.getItem('__audit_seeded')) return;
    sessionStorage.setItem('__audit_seeded','1');
    localStorage.clear();
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)});
} catch (e) {} })();`;

const log = [];
async function metrics(page) {
    return page.evaluate(() => {
        const r = (sel) => [...document.querySelectorAll(sel)].slice(0, 2).map((el) => {
            const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
            return { sel, x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: cs.borderRadius, font: cs.fontSize, ff: cs.fontFamily.slice(0, 30), bg: cs.backgroundColor, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 140) };
        });
        return {
            dark: document.documentElement.classList.contains("dark"),
            scrollW: document.documentElement.scrollWidth,
            m: [...r(".palette-card"), ...r("[data-slot=palette-card-skeleton]"), ...r(".search-seated"), ...r(".search-seated input"),
                ...r(".search-seated button"), ...r("[data-slot=empty-state], .empty-state"), ...r(".palette-card button"),
                ...r(".palette-card [data-slot=badge], .palette-card .badge"), ...r("h1,h2"), ...r("[role=menu]"), ...r("[role=dialog]"),
                ...r(".palette-card__detail > *"), ...r("button.font-display")],
        };
    });
}

async function run(state, vp, theme, fn, opts = {}) {
    const tag = `${state}__${vp.name}__${theme}`;
    if (only && !tag.startsWith(only)) return;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.name === "390" });
    await ctx.addInitScript(seed(theme));
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    const isList = (u) => u.port === "3000" && u.pathname === "/palettes";
    if (opts.mode === "error") await page.route((u) => u.port === "3000", (r) => r.abort());
    if (opts.mode === "loading") await page.route(isList, () => {}); // never settles
    if (opts.mode === "fixture") await page.route(isList, (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: FIXTURE, nextCursor: "c2", hasMore: true }) }));
    try {
        await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
        await page.getByText("Discover palettes from the community.").first().waitFor({ timeout: 45000 });
        await page.waitForTimeout(2200);
        const note = (await fn?.(page, vp)) ?? "";
        await page.waitForTimeout(600);
        await page.screenshot({ path: `${OUT}${tag}.png` });
        if (opts.full) await page.screenshot({ path: `${OUT}${tag}__full.png`, fullPage: true });
        const m = await metrics(page);
        log.push({ tag, sha, dirty, url: page.url(), note, errs, ...m });
        console.log("OK", tag, note, errs.length ? `errs=${errs.length}` : "");
    } catch (e) {
        await page.screenshot({ path: `${OUT}${tag}__FAIL.png` }).catch(() => {});
        log.push({ tag, sha, dirty, fail: String(e).slice(0, 300), errs });
        console.log("FAIL", tag, String(e).slice(0, 200));
    }
    await ctx.close();
}

// On 390 the browse wall may sit beside/below other panes: scroll the Browse card into view.
const toBrowse = async (page) => { await page.getByText("Discover palettes from the community.").first().scrollIntoViewIfNeeded(); };
const card = (page, name) => page.getByRole("article", { name: `Palette: ${name}` });
const STATES = {
    empty: [toBrowse, {}],
    loading: [toBrowse, { mode: "loading" }],
    error: [toBrowse, { mode: "error" }],
    loaded: [toBrowse, { mode: "fixture", full: true }],
    selected: [async (page) => { await card(page, "Neon Arcade").click({ position: { x: 40, y: 12 } }); await page.waitForTimeout(1200); await card(page, "Neon Arcade").scrollIntoViewIfNeeded(); return "clicked Neon Arcade"; }, { mode: "fixture", full: true }],
    hover: [async (page, vp) => { const c = card(page, "Forest Floor"); if (vp.name === "390") return "n/a touch"; await c.hover(); await page.waitForTimeout(500); return "hover Forest Floor"; }, { mode: "fixture" }],
    focus: [async (page) => { await page.getByPlaceholder("Search palettes...").click(); for (let i = 0; i < 3; i++) await page.keyboard.press("Tab"); await page.waitForTimeout(400); return "tab x3 from search: " + await page.evaluate(() => { const a = document.activeElement; return a.tagName + " " + (a.getAttribute("aria-label") || a.textContent.trim().slice(0, 40)); }); }, { mode: "fixture" }],
    filters: [async (page) => { const s = page.locator(".search-seated button").last(); await s.click(); await page.waitForTimeout(800); return "filter trigger clicked"; }, { mode: "fixture" }],
    cardmenu: [async (page) => { await card(page, "Forest Floor").getByRole("button", { name: "Palette menu" }).click(); await page.waitForTimeout(700); return "card menu"; }, { mode: "fixture" }],
    retry: [async (page) => { await page.getByRole("button", { name: "Retry" }).click(); await page.waitForTimeout(1500); return "retry clicked while still aborted"; }, { mode: "error" }],
};

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const VPS = [{ name: "1440", w: 1440, h: 900 }, { name: "390", w: 390, h: 844 }];
for (const [state, [fn, opts]] of Object.entries(STATES))
    for (const vp of VPS)
        for (const theme of ["light", "dark"])
            await run(state, vp, theme, fn, opts);
await browser.close();
writeFileSync(`${OUT}capture-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 1));
