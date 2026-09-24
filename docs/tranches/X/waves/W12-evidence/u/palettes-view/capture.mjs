// UI-AUDIT seat `palettes-view` (COHESION §0bl OA-36) — read-only capture.
// Headed Chromium on the real GPU; served dev page :9000; never starts/stops a server.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const only = process.argv[2]; // optional state filter (prefix, comma-separated)
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();

const now = "2026-09-20T12:00:00.000Z";
const P = (id, name, colors, extra = {}) => ({
    id, name, slug: name.toLowerCase().replace(/\s+/g, "-"),
    colors: colors.map((css, position) => ({ css, position })),
    createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tags: [], ...extra,
});
const PALETTES = [
    P("p-1", "Sunset Coast", ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"]),
    P("p-2", "Forest Floor", ["#2d4a22", "#5b7c3a", "#a3b18a", "#dad7cd"]),
    P("p-3", "Neon Arcade", ["oklch(0.7 0.3 330)", "oklch(0.8 0.2 190)", "oklch(0.9 0.2 110)", "#111", "#fff", "#7f5af0"]),
    P("p-4", "Quiet Greys", ["#f5f5f4", "#a8a29e", "#57534e"]),
];
const CURRENT = ["#e63946", "#f1faee", "#a8dadc", "#457b9d"];

function seed({ palettes = PALETTES, current = CURRENT, corrupt = false, theme }) {
    return `(() => {
        try {
            if (sessionStorage.getItem('__audit_seeded')) return;
            sessionStorage.setItem('__audit_seeded', '1');
            localStorage.clear();
            localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)});
            localStorage.setItem('color-palettes', ${corrupt ? JSON.stringify("{not json") : JSON.stringify(JSON.stringify({ version: 1, palettes }))});
            localStorage.setItem('color-picker', ${JSON.stringify(JSON.stringify({ inputColor: "oklch(0.65 0.2 30)", savedColors: current }))});
        } catch (e) {}
    })();`;
}

const log = [];
async function metrics(page) {
    return page.evaluate(() => {
        const r = (sel) => [...document.querySelectorAll(sel)].slice(0, 3).map((el) => {
            const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
            return { sel, w: Math.round(b.width), h: Math.round(b.height), radius: cs.borderRadius, font: cs.fontSize, bg: cs.backgroundColor, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 120) };
        });
        return [
            ...r(".palette-card"), ...r(".dashed-well"), ...r("input.input-bar-field"), ...r(".search-seated"),
            ...r(".dashed-well input"), ...r(".dashed-well button.rounded-full"), ...r(".feedback-chip"),
            ...r(".api-offline-chip"), ...r("[data-slot=badge], .badge"), ...r("[role=list].palette-card-grid"),
            ...r(".palette-card__grip"), ...r(".floating-panel"), ...r("h1, h2"),
        ];
    });
}

async function run(state, vp, theme, fn, opts = {}) {
    const tag = `${state}__${vp.name}__${theme}`;
    if (only && !only.split(",").some((o) => tag.startsWith(o))) return;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.name === "390", isMobile: false });
    await ctx.addInitScript(seed({ ...opts, theme }));
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
    page.setDefaultTimeout(30000); page.setDefaultNavigationTimeout(90000);
    page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    if (opts.offline) await page.route((u) => u.port === "3000" || u.pathname.startsWith("/api"), (r) => r.abort());
    try {
        await page.goto(`${BASE}/#/palettes`, { waitUntil: "domcontentloaded" });
        const t0 = Date.now();
        await page.getByPlaceholder("Search your palettes...").waitFor({ timeout: 90000 });
        const loadMs = Date.now() - t0;
        await page.waitForTimeout(1500);
        const note = (await fn?.(page, vp)) ?? "";
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${OUT}${tag}.png` });
        const m = await metrics(page);
        log.push({ tag, sha, dirty, url: page.url(), loadMs, note, errs, m });
        console.log("OK", tag, "load", loadMs, note, errs.length ? `errs=${errs.length}` : "");
    } catch (e) {
        await page.screenshot({ path: `${OUT}${tag}__FAIL.png` }).catch(() => {});
        log.push({ tag, sha, dirty, fail: String(e).slice(0, 300), errs });
        console.log("FAIL", tag, String(e).slice(0, 200));
    }
    await ctx.close().catch(() => {});
    writeFileSync(`${OUT}capture-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 1));
}

const card = (page, name) => page.getByRole("article", { name: `Palette: ${name}` });
const STATES = {
    empty: [async () => "", { palettes: [], current: [] }],
    loaded: [async () => "", {}],
    selected: [async (page) => { await card(page, "Forest Floor").click({ position: { x: 60, y: 20 } }); await page.waitForTimeout(800); return "clicked Forest Floor"; }, {}],
    rename: [async (page) => {
        await card(page, "Sunset Coast").getByRole("button", { name: "Palette menu" }).click();
        await page.waitForTimeout(400);
        await page.getByRole("menuitem", { name: /Rename/ }).click();
        await page.waitForTimeout(600);
        return "menu > Rename";
    }, {}],
    menu: [async (page) => {
        await card(page, "Sunset Coast").getByRole("button", { name: "Palette menu" }).click();
        await page.waitForTimeout(600);
        return "menu open";
    }, {}],
    search: [async (page) => { await page.getByPlaceholder("Search your palettes...").fill("neon"); await page.waitForTimeout(600); return "q=neon"; }, {}],
    searchnone: [async (page) => { await page.getByPlaceholder("Search your palettes...").fill("zzzz"); await page.waitForTimeout(600); return "q=zzzz"; }, {}],
    recovery: [async () => "", { corrupt: true }],
    swatchhover: [async (page, vp) => {
        const sw = page.locator(".dashed-well .swatch-row button").nth(2);
        if (vp.name === "390") await sw.click({ force: true }); else await sw.hover({ force: true });
        await page.waitForTimeout(700);
        return "hover/tap current swatch #a8dadc";
    }, {}],
    offline: [async (page) => { await page.waitForTimeout(2500); return "abort :3000 + /api"; }, { offline: true }],
    dragmid: [async (page) => {
        const grip = card(page, "Quiet Greys").locator(".drag-handle");
        const target = card(page, "Sunset Coast");
        const a = await grip.boundingBox(); const b = await target.boundingBox();
        await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
        await page.mouse.down();
        for (let i = 1; i <= 12; i++) { await page.mouse.move(a.x + a.width / 2, a.y + (b.y + 10 - a.y) * i / 12); await page.waitForTimeout(40); }
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT}dragmid__${page.viewportSize().width === 390 ? "390" : "1440"}__INFLIGHT.png` });
        await page.mouse.up();
        await page.waitForTimeout(700);
        const order = await page.getByRole("article").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")));
        return "after drop order=" + JSON.stringify(order);
    }, {}],
    dock: [async (page) => {
        await card(page, "Forest Floor").click({ position: { x: 60, y: 20 } });
        await page.waitForTimeout(900);
        const collapsed = await page.locator(".glass-dock.collapsed").count();
        if (collapsed) { await page.locator(".glass-dock.collapsed").click(); await page.waitForTimeout(1200); }
        const btns = await page.locator(".glass-dock button, .glass-dock [role=button], .glass-dock [role=combobox]").evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().width > 0).map((e) => (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 30)));
        return `dock collapsed-after-select=${collapsed} controls=${JSON.stringify(btns)}`;
    }, {}],
    menucolor: [async (page) => {
        await card(page, "Sunset Coast").getByRole("button", { name: "Palette menu" }).click();
        await page.waitForTimeout(600);
        const del = page.getByRole("menuitem", { name: /^Delete/ });
        const c = await del.evaluate((e) => getComputedStyle(e).color);
        const ink = await page.getByRole("menuitem", { name: /Rename/ }).evaluate((e) => getComputedStyle(e).color);
        const dest = await page.evaluate(() => { const d = document.createElement("span"); d.className = "text-destructive"; document.body.append(d); const c = getComputedStyle(d).color; d.remove(); return c; });
        return `delete=${c} rename=${ink} text-destructive=${dest}`;
    }, {}],
    focus: [async (page) => {
        await page.getByPlaceholder("Search your palettes...").focus();
        for (let i = 0; i < 6; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(120); }
        const f = await page.evaluate(() => { const a = document.activeElement; return `${a.tagName} ${a.getAttribute("aria-label") ?? ""} ${(a.textContent || "").trim().slice(0, 20)}`; });
        return "after 6 Tabs from search: " + f;
    }, {}],
    cardhover: [async (page) => { await card(page, "Neon Arcade").hover({ position: { x: 200, y: 60 } }); await page.waitForTimeout(500); return "hover Neon Arcade"; }, {}],
    scrolled: [async (page) => { await page.getByPlaceholder("Search your palettes...").scrollIntoViewIfNeeded(); await page.waitForTimeout(600); const y = await page.getByText("My", { exact: false }).first().evaluate(() => window.scrollY); return "scrollY=" + y; }, {}],
    dupe: [async (page) => { const i = page.locator(".dashed-well input").first(); await i.fill("Forest Floor"); await i.press("Enter"); await page.waitForTimeout(700); return "save name=Forest Floor (duplicate)"; }, {}],
};

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const VPS = [{ name: "1440", w: 1440, h: 900 }, { name: "390", w: 390, h: 844 }];
for (const [state, [fn, opts]] of Object.entries(STATES))
    for (const vp of VPS)
        for (const theme of ["light", "dark"])
            await run(state, vp, theme, fn, opts);
await browser.close();
writeFileSync(`${OUT}capture-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 1));
