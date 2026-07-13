/**
 * T.W8 · CRITIQUE PASS 10 (ADMIN — the five views BY NAME: admin-users ·
 * admin-names · admin-audit · admin-flagged · admin-tags + the auth/profile
 * flows) — the probe instrument (O-3 class; probe-only, no writes to the app
 * tree). Drives the LANE server :8690 (bare vite dev, VITE_API_URL UNSET) with
 * the smoke-admin addInitScript mock fixture reproduced in-script (populated /
 * empty / error / loading envelopes) — the owner's :9000 is never touched.
 *
 * WHY: h-gaps G-11 — the admin views + auth/profile were the least-covered-by-
 * design surface class; no design wave re-authored them. This pass judges them
 * CRITIQUE-FRESH against the cross-cutting orders: T-24 (consistent
 * gray/black/white across all glass card areas), T-3/T-11/T-18 material-ladder
 * consistency (D1 four-rung), T-41 skeleton discipline (AdminListSkeleton must
 * shimmer as a PROPER skeleton or show the true empty state), O-18 contrast
 * population, and D1-D10.
 *
 * Grid: 5 views × {populated, empty, error} × {1440, 768, 390} × {light, dark}
 * + a loading freeze + the auth/profile dropdown states. Frames land under
 * pi/w8/admin/ (gitignored-by-class, the standing convention); this script + the
 * log txt are the committed record.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const DEV = "http://localhost:8690";
const OUT = "docs/tranches/T/audit/pi/w8/admin";
mkdirSync(OUT, { recursive: true });

const report = [];
const log = (s) => { console.log(s); report.push(s); };

const VIEWS = [
    { id: "users", path: "/#/admin/users", heading: "Users" },
    { id: "names", path: "/#/admin/names", heading: "Names" },
    { id: "audit", path: "/#/admin/audit", heading: "Audit Log" },
    { id: "flagged", path: "/#/admin/flagged", heading: "Flagged" },
    { id: "tags", path: "/#/admin/tags", heading: "Tags" },
];

const VIEWPORTS = [
    { tag: "1440", w: 1440, h: 900 },
    { tag: "768", w: 768, h: 1024 },
    { tag: "390", w: 390, h: 844 },
];

// ---- fixture data (mirrors e2e/smoke/admin/fixtures/admin-populated.ts) ----
const NOW = "2026-07-05T00:00:00.000Z";
const pal = (slug, name, userSlug) => ({
    name, slug, userSlug,
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#16a34a", position: 2 }],
    tags: ["moody"], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 3,
    visibility: "public", tier: "standard", published: true,
});
const USERS = [
    { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
    { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    { slug: "verdant-mole-33", createdAt: NOW, lastSeenAt: NOW, status: "suspended", paletteCount: 0 },
];
const FLAGGED = [
    { paletteSlug: "sunset-riot-9a3f", palette: pal("sunset-riot-9a3f", "Sunset Riot", "crimson-owl-77"), flagCount: 2,
      flags: [{ reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW }, { reporterSlug: "verdant-mole-33", reason: "offensive", detail: "harsh clash", createdAt: NOW }] },
    { paletteSlug: "neon-haze-1b2c", palette: pal("neon-haze-1b2c", "Neon Haze", "azure-fox-01"), flagCount: 1,
      flags: [{ reporterSlug: "crimson-owl-77", reason: "duplicate", createdAt: NOW }] },
];
const AUDIT = [
    { id: "a1", timestamp: NOW, action: "palette.feature", target: "sunset-riot-9a3f", ipHash: "ip-3f9a" },
    { id: "a2", timestamp: NOW, action: "user.delete", target: "spammer-42", ipHash: "ip-7c1d" },
    { id: "a3", timestamp: NOW, action: "flag.dismiss", target: "neon-haze-1b2c", ipHash: "ip-b2c0" },
];
const QUEUE = [
    { id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "azure-fox-01", createdAt: NOW },
    { id: "c2", name: "Field Floor", css: "oklch(0.74 0.06 120)", status: "proposed", contributor: "crimson-owl-77", createdAt: NOW },
    { id: "c3", name: "A Very Long Proposed Color Name That Stresses The Row Min-Width Chain Well Past Any Phone Viewport", css: "color(display-p3 0.23456 0.71234 0.41234 / 0.98765)", status: "proposed", contributor: "verdant-mole-33", createdAt: NOW },
];
const TAGS = [
    { id: "t1", name: "moody", category: "mood", createdAt: NOW },
    { id: "t2", name: "pastel", category: "tone", createdAt: NOW },
    { id: "t3", name: "duotone", category: "structure", createdAt: NOW },
];
const USER_PALETTES = [pal("azure-one-11aa", "Azure One", "azure-fox-01"), pal("azure-two-22bb", "Azure Two", "azure-fox-01")];
const paginated = (data) => JSON.stringify({ data, total: data.length, limit: 50, offset: 0 });

const STORAGE_KEY = "palette-admin-token";
const FAKE_TOKEN = "test-admin-token";

const ENV_NOISE = /Failed to load resource|\b(404|429|503|504)\b|Too Many Requests|blocked by CORS policy|favicon/;

async function routeAdmin(page, mode) {
    // anonymous session
    await page.route("**/sessions", (route) => {
        if (route.request().method() === "POST")
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "test-session-token", userSlug: "test-user" }) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.route("**/admin/**", async (route) => {
        const req = route.request();
        const url = req.url();
        if (!new URL(url).pathname.startsWith("/admin/")) return route.continue();
        const method = req.method();
        const json = (body, status = 200) => route.fulfill({ status, contentType: "application/json", body });

        if (method === "DELETE" || method === "POST") return json("{}");

        if (mode === "error") return route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "boom-500-internal" }) });
        if (mode === "loading") { await new Promise((r) => setTimeout(r, 12000)); }

        const data = mode === "empty";
        if (url.includes("/admin/tags")) return json(data ? "[]" : JSON.stringify(TAGS));
        if (url.includes("/admin/users/") && url.includes("/palettes")) return json(data ? "[]" : JSON.stringify(USER_PALETTES));
        if (url.includes("/admin/users")) return json(data ? paginated([]) : paginated(USERS));
        if (url.includes("/admin/flagged")) return json(data ? paginated([]) : paginated(FLAGGED));
        if (url.includes("/admin/audit")) return json(data ? paginated([]) : paginated(AUDIT));
        if (url.includes("/admin/queue") || url.includes("/admin/approved")) return json(data ? paginated([]) : paginated(QUEUE));
        return json(paginated([]));
    });
}

async function newPage(browser, scheme, viewport, mode) {
    const ctx = await browser.newContext({ viewport: { width: viewport.w, height: viewport.h }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error" && !ENV_NOISE.test(m.text())) errors.push(m.text()); });
    page.on("pageerror", (e) => { if (!ENV_NOISE.test(String(e))) errors.push(String(e)); });
    // seed admin token + dark scheme BEFORE any page script
    await page.addInitScript(([key, val, cs]) => {
        localStorage.setItem(key, val);
        localStorage.setItem("vueuse-color-scheme", cs);
    }, [STORAGE_KEY, FAKE_TOKEN, scheme]);
    await routeAdmin(page, mode);
    return { ctx, page, errors };
}

const browser = await chromium.launch({ headless: false, channel: "chromium" });

log("# T.W8 · PASS 10 ADMIN probe — " + new Date().toISOString());
log("DEV=" + DEV + "  (bare vite, mock fixture reproduced in-script)\n");

// ---------- MEASUREMENT LEG (1440 light+dark, populated) ----------
async function measure(scheme) {
    const { ctx, page, errors } = await newPage(browser, scheme, VIEWPORTS[0], "populated");
    log(`\n## MEASURE — ${scheme} @1440 (populated)`);
    for (const v of VIEWS) {
        await page.goto(DEV + v.path, { waitUntil: "networkidle" });
        await page.waitForTimeout(900);
        const m = await page.evaluate(() => {
            const rootDark = document.documentElement.classList.contains("dark");
            const cs = (el) => el ? getComputedStyle(el) : null;
            // scope everything inside the admin pane region
            const main = document.querySelector('main') || document.body;
            const paneCard = main.querySelector('.pane-scroll-fade') || document.querySelector('.pane-scroll-fade');
            const paneCS = cs(paneCard);
            // an actual admin list row inside the pane (bordered card-edge row)
            const rows = [...main.querySelectorAll('[class*="border-card-edge"]')];
            const row = rows.find((r) => r.offsetHeight > 0) || rows[0];
            const rowCS = cs(row);
            // a muted-foreground text span INSIDE the pane content
            const mutedEls = [...main.querySelectorAll('.text-muted-foreground')].filter((e) => e.offsetHeight > 0 && e.textContent.trim());
            const muted = mutedEls[0];
            const mutedCS = cs(muted);
            // number of rendered admin rows (populated proof)
            const bg = getComputedStyle(document.body).backgroundColor;
            return {
                rootDark, bodyBg: bg,
                paneBg: paneCS ? paneCS.backgroundColor : null,
                paneBackdrop: paneCS ? (paneCS.backdropFilter || paneCS.webkitBackdropFilter) : null,
                paneBorder: paneCS ? paneCS.borderColor : null,
                rowCount: rows.length,
                rowBg: rowCS ? rowCS.backgroundColor : null,
                rowBorder: rowCS ? rowCS.borderColor : null,
                mutedColor: mutedCS ? mutedCS.color : null,
                mutedText: muted ? muted.textContent.trim().slice(0, 30) : null,
            };
        });
        log(`  [${v.id}] rows=${m.rowCount} paneBg=${m.paneBg} backdrop=${(m.paneBackdrop||'').slice(0,20)} rowBg=${m.rowBg} rowBorder=${m.rowBorder}`);
        log(`         muted=${m.mutedColor} ("${m.mutedText}") bodyBg=${m.bodyBg} dark=${m.rootDark}`);
    }
    // skeleton register check — reload users in loading mode via a fresh page
    await ctx.close();
}

// skeleton register: freeze the loading state and read the animation-name
async function skeletonProbe(scheme) {
    const { ctx, page } = await newPage(browser, scheme, VIEWPORTS[0], "loading");
    await page.goto(DEV + "/#/admin/users", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    const sk = await page.evaluate(() => {
        const el = document.querySelector('[data-slot="admin-list-skeleton"] [data-slot="skeleton"], [data-slot="skeleton"]');
        if (!el) return { found: false };
        const cs = getComputedStyle(el);
        return {
            found: true,
            classes: el.className,
            animName: cs.animationName,
            animDur: cs.animationDuration,
            opacity: cs.opacity,
            bg: cs.backgroundColor,
            surface: el.getAttribute("data-surface"),
        };
    });
    log(`\n## SKELETON REGISTER — ${scheme} (loading freeze)`);
    log(`  ${JSON.stringify(sk)}`);
    await page.screenshot({ path: `${OUT}/users-1440-${scheme}-loading.png` });
    await ctx.close();
}

// ---------- FRAME GRID ----------
async function frames(mode) {
    for (const scheme of ["light", "dark"]) {
        for (const vp of VIEWPORTS) {
            // populated captures all viewports; empty/error only 1440 (per pass economy)
            if (mode !== "populated" && vp.tag !== "1440") continue;
            const { ctx, page, errors } = await newPage(browser, scheme, vp, mode);
            for (const v of VIEWS) {
                await page.goto(DEV + v.path, { waitUntil: "networkidle" });
                await page.waitForTimeout(700);
                const fn = `${OUT}/${v.id}-${vp.tag}-${scheme}-${mode}.png`;
                await page.screenshot({ path: fn });
            }
            if (errors.length) log(`  [errors ${mode} ${scheme} ${vp.tag}] ${errors.slice(0, 4).join(" | ")}`);
            await ctx.close();
        }
    }
    log(`## FRAMES ${mode} — done`);
}

// ---------- AUTH / PROFILE FLOW ----------
async function authProbe() {
    log(`\n## AUTH / PROFILE FLOW (1440)`);
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await newPage(browser, scheme, VIEWPORTS[0], "populated");
        await page.goto(DEV + "/#/admin/users", { waitUntil: "networkidle" });
        await page.waitForTimeout(900);
        // The admin token is seeded → ProfileSection shows the gold-shimmer "admin" pill.
        await page.screenshot({ path: `${OUT}/dock-admin-${scheme}.png` });
        const pill = await page.evaluate(() => {
            const p = document.querySelector('.gold-shimmer');
            if (!p) return { found: false };
            const cs = getComputedStyle(p);
            return { found: true, text: p.textContent.trim(), color: cs.color, border: cs.borderColor };
        });
        log(`  [${scheme}] admin pill: ${JSON.stringify(pill)}`);
        // open the @mbabb menu
        const mbabb = page.getByRole("button", { name: "@mbabb" }).first();
        if (await mbabb.count()) {
            await mbabb.click().catch(() => {});
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${OUT}/mbabb-menu-${scheme}.png` });
        }
        await ctx.close();
    }
    // logged-OUT + logged-IN-user states via a page without the admin token
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.addInitScript((cs) => localStorage.setItem("vueuse-color-scheme", cs), scheme);
        await page.route("**/sessions", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "" }) }));
        await page.goto(DEV + "/#/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1200);
        await page.screenshot({ path: `${OUT}/dock-loggedout-${scheme}.png` });
        await ctx.close();
    }
}

await measure("light");
await measure("dark");
await skeletonProbe("light");
await skeletonProbe("dark");
await frames("populated");
await frames("empty");
await frames("error");
await authProbe();

await browser.close();
writeFileSync(`${OUT}/../w8-pass10-admin-probe-log.txt`, report.join("\n"));
log("\nDONE. frames → " + OUT);
