// CHALLENGE-C · AdminUsersPanel — IMPLEMENTATION defect probe.
//
// Premise: the implementation is defective. This probe reproduces candidate
// defects against the LIVE dev server (:9000) with the admin API stubbed via
// page.route, in TWO engines (chromium + webkit) for every structural claim.
//
// READ-ONLY against the app. Writes ONLY under
// docs/tranches/V/megatranche/audit/components/AdminUsersPanel/.
//
//   node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl.mjs

import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames-impl");
mkdirSync(FRAMES, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9077";

// 5 users; THREE of them have 0 palettes (the global prune set).
const USERS = [
    { slug: "alpha-keeper-0001", createdAt: "2026-07-01T10:00:00Z", status: "active", paletteCount: 4 },
    { slug: "beta-drifter-0002", createdAt: "2026-07-02T10:00:00Z", status: "active", paletteCount: 2 },
    { slug: "gamma-empty-0003", createdAt: "2026-06-02T10:00:00Z", status: "active", paletteCount: 0 },
    { slug: "delta-empty-0004", createdAt: "2026-06-03T10:00:00Z", status: "active", paletteCount: 0 },
    { slug: "epsilon-empty-0005", createdAt: "2026-06-04T10:00:00Z", status: "active", paletteCount: 0 },
];
const GLOBAL_EMPTY = USERS.filter((u) => !u.paletteCount).length; // 3

const mkPalette = (name, slug, owner) => ({
    name, slug, userSlug: owner,
    colors: [{ css: "oklch(62% 0.19 26)", position: 0 }, { css: "oklch(72% 0.15 84)", position: 1 }],
    createdAt: "2026-07-01T10:00:00Z", updatedAt: "2026-07-01T10:00:00Z",
    isLocal: false, tier: "standard", visibility: "public",
});
const ALPHA_PALETTES = [mkPalette("ALPHA-PALETTE-AAA", "alpha-p-1", "alpha-keeper-0001")];
const BETA_PALETTES = [mkPalette("BETA-PALETTE-BBB", "beta-p-1", "beta-drifter-0002")];

const init = `
  try {
    localStorage.setItem('vueuse-color-scheme','light');
    localStorage.setItem('palette-admin-token','PROBE-FAKE-ADMIN-TOKEN');
    document.documentElement.classList.remove('dark');
  } catch(e) {}
`;

async function newCtx(browser, opts = {}) {
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        ...opts,
    });
    await context.addInitScript(init);
    return context;
}

async function routeUsers(context, { usersBody, usersStatus = 200 } = {}) {
    await context.route("**/admin/users?**", (r) =>
        r.fulfill({
            status: usersStatus,
            contentType: usersStatus === 200 ? "application/json" : "application/problem+json",
            body: JSON.stringify(
                usersStatus === 200
                    ? (usersBody ?? { data: USERS, total: USERS.length, limit: 50, offset: 0 })
                    : { title: "Internal Server Error", status: usersStatus },
            ),
        }),
    );
}

async function boot(context) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
    page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + String(e).slice(0, 200)));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    page.__consoleErrors = consoleErrors;
    return page;
}

// DOM readers reused across engines.
const READ_TOOLBAR = () => {
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const panel = document.querySelector('[role="button"][aria-expanded]')?.closest(".grid.gap-3")
        ?.parentElement ?? document.querySelector("main");
    const btns = qa("main button").filter((b) => /Prune empty|Refresh/.test(b.textContent || ""));
    const main = document.querySelector("main");
    const text = (main?.innerText || "").replace(/\s+/g, " ").trim();
    return {
        mainText: text.slice(0, 400),
        countLine: (text.match(/(\d+) users?/) || [])[0] ?? null,
        emptyLine: (text.match(/·\s*(\d+) empty/) || [])[0] ?? null,
        rowsRendered: qa("main .rounded-md.border.border-card-edge.overflow-hidden").length,
        interactiveRows: qa('[role="button"][aria-expanded]').length,
        toolbar: btns.map((b) => ({
            text: (b.textContent || "").trim(),
            disabled: b.disabled || b.getAttribute("aria-disabled") === "true",
        })),
        hasUnreachable: text.includes("roster is unreachable"),
        hasNoUsersFound: text.includes("No users found"),
        skeletons: qa('[data-slot="admin-list-skeleton"]').length,
    };
};

const READ_A11Y = () => {
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const rows = qa('[role="button"][aria-expanded]');
    const box = (el) => { const r = el.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
    // WAI-ARIA: role=button must not contain focusable descendants (axe: nested-interactive).
    const nested = rows.map((r) => ({
        ariaExpanded: r.getAttribute("aria-expanded"),
        ariaControls: r.getAttribute("aria-controls"),
        focusableDescendants: qa("button,a[href],input,select,textarea,[tabindex]", r).length,
        descendantLabels: qa("button", r).map((b) => b.getAttribute("aria-label") || (b.textContent || "").trim()),
        accName: (r.innerText || "").replace(/\s+/g, " ").trim().slice(0, 90),
    }));
    // The action-result beat: any live region?
    const main = document.querySelector("main");
    const liveRegions = qa("[aria-live],[role='status'],[role='alert']", main || document).map((e) => ({
        tag: e.tagName, role: e.getAttribute("role"), live: e.getAttribute("aria-live"),
        text: (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 50),
    }));
    return { rows: nested, liveRegions, rowBoxes: rows.map(box) };
};

const results = { engine: {}, meta: { origin: ORIGIN, globalEmpty: GLOBAL_EMPTY, users: USERS.length } };

for (const [engineName, launcher] of [["chromium", chromium], ["webkit", webkit]]) {
    const browser = await launcher.launch();
    const E = (results.engine[engineName] = {});

    // ---- C1 · toolbar in the ERROR state ------------------------------------
    {
        const ctx = await newCtx(browser);
        await routeUsers(ctx, { usersStatus: 500 });
        const page = await boot(ctx);
        E.C1_errorState = await page.evaluate(READ_TOOLBAR);
        await page.screenshot({ path: resolve(FRAMES, `C1-${engineName}-error-toolbar.png`) });
        await ctx.close();
    }

    // ---- C2 · search-filtered counts vs the global prune set ----------------
    {
        const ctx = await newCtx(browser);
        await routeUsers(ctx);
        await ctx.route("**/admin/users/*/palettes", (r) =>
            r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
        const page = await boot(ctx);
        E.C2_unfiltered = await page.evaluate(READ_TOOLBAR);

        // type a query that keeps exactly ONE empty user
        const input = page.locator("input[placeholder='Search users...']").first();
        await input.click();
        await input.fill("gamma");
        await page.waitForTimeout(600);
        E.C2_filtered = await page.evaluate(READ_TOOLBAR);

        // open the prune confirm and read what it PROMISES
        await page.getByRole("button", { name: /Prune empty/ }).first().click();
        await page.waitForTimeout(700);
        E.C2_pruneDialog = await page.evaluate(() => {
            const d = document.querySelector('[role="dialog"],[role="alertdialog"]');
            return d ? { text: (d.innerText || "").replace(/\s+/g, " ").trim() } : { text: null };
        });
        await page.screenshot({ path: resolve(FRAMES, `C2-${engineName}-prune-dialog-filtered.png`) });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);

        // and the inverse: a query hiding every empty user disables Prune
        await input.fill("alpha");
        await page.waitForTimeout(600);
        E.C2_filteredNoEmpty = await page.evaluate(READ_TOOLBAR);
        await ctx.close();
    }

    // ---- C3 · concurrent-expand race ----------------------------------------
    {
        const ctx = await newCtx(browser);
        await routeUsers(ctx);
        await ctx.route("**/admin/users/*/palettes", async (r) => {
            const url = r.request().url();
            const slow = url.includes("alpha-keeper-0001");
            await new Promise((res) => setTimeout(res, slow ? 1500 : 40));
            r.fulfill({
                status: 200, contentType: "application/json",
                body: JSON.stringify(slow ? ALPHA_PALETTES : BETA_PALETTES),
            });
        });
        const page = await boot(ctx);
        const rows = page.locator('[role="button"][aria-expanded]');
        await rows.nth(0).click();            // alpha (1500ms)
        await page.waitForTimeout(350);       // skeleton renders, layout settles
        E.C3_midflight = await page.evaluate(() => {
            const qa = (s) => [...document.querySelectorAll(s)];
            return {
                expandedSlugRow: qa('[role="button"][aria-expanded="true"]').map((r) => (r.innerText || "").split("\n")[0]),
                skeletons: qa('[data-slot="admin-list-skeleton"]').length,
            };
        });
        await rows.nth(1).click();            // beta (40ms) — starts while alpha in flight
        await page.waitForTimeout(500);       // beta resolved; alpha still in flight
        E.C3_afterBetaResolve = await page.evaluate(() => {
            const row = document.querySelector('[role="button"][aria-expanded="true"]');
            const shell = row?.parentElement;
            return {
                expandedRowText: (row?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60),
                disclosureText: (shell?.querySelector(".border-t")?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 200),
                skeletons: [...document.querySelectorAll('[data-slot="admin-list-skeleton"]')].length,
            };
        });
        await page.waitForTimeout(1600);      // alpha's stale response lands
        E.C3_afterAlphaResolve = await page.evaluate(() => {
            const row = document.querySelector('[role="button"][aria-expanded="true"]');
            const shell = row?.parentElement;
            return {
                expandedRowText: (row?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60),
                disclosureText: (shell?.querySelector(".border-t")?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 200),
            };
        });
        await page.screenshot({ path: resolve(FRAMES, `C3-${engineName}-expand-race.png`) });
        E.C3_consoleErrors = page.__consoleErrors.slice(0, 6);
        await ctx.close();
    }

    // ---- C4 · a failed disclosure fetch costumes as "no palettes" -----------
    {
        const ctx = await newCtx(browser);
        await routeUsers(ctx);
        await ctx.route("**/admin/users/*/palettes", (r) =>
            r.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ title: "boom", status: 500 }) }));
        const page = await boot(ctx);
        await page.locator('[role="button"][aria-expanded]').nth(0).click();
        await page.waitForTimeout(1200);
        E.C4_failedDisclosure = await page.evaluate(() => {
            const row = document.querySelector('[role="button"][aria-expanded="true"]');
            const shell = row?.parentElement;
            const t = (shell?.querySelector(".border-t")?.innerText || "").replace(/\s+/g, " ").trim();
            return {
                disclosureText: t,
                saysNoPalettes: /No palettes/.test(t),
                saysUnreachableOrError: /unreachable|error|failed|retry/i.test(t),
                hasRetryButton: !!shell?.querySelector(".border-t")?.querySelector("button"),
            };
        });
        await page.screenshot({ path: resolve(FRAMES, `C4-${engineName}-failed-disclosure.png`) });
        E.C4_consoleErrors = page.__consoleErrors.slice(0, 6);
        await ctx.close();
    }

    // ---- C5 · a11y structure + the action-result beat -----------------------
    {
        const ctx = await newCtx(browser);
        await routeUsers(ctx);
        await ctx.route("**/admin/users/*/palettes", (r) =>
            r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
        await ctx.route("**/admin/users/prune-empty", (r) =>
            r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ pruned: 0 }) }));
        const page = await boot(ctx);
        E.C5_a11y = await page.evaluate(READ_A11Y);

        // the double-beat: two prunes inside one 3s dismissal window
        const t0 = Date.now();
        await page.getByRole("button", { name: /Prune empty/ }).first().click();
        await page.waitForTimeout(400);
        await page.getByRole("button", { name: /^Prune$/ }).last().click();
        await page.waitForTimeout(500);
        const beat1 = await page.evaluate(() =>
            ((document.querySelector("main")?.innerText || "").match(/(Pruned \d+ users?|No empty users to prune)/) || [])[0] ?? null);
        // second prune ~1.0s after the first
        await page.getByRole("button", { name: /Prune empty/ }).first().click();
        await page.waitForTimeout(300);
        await page.getByRole("button", { name: /^Prune$/ }).last().click();
        await page.waitForTimeout(300);
        const beat2At = Date.now() - t0;
        const beat2 = await page.evaluate(() =>
            ((document.querySelector("main")?.innerText || "").match(/(Pruned \d+ users?|No empty users to prune)/) || [])[0] ?? null);
        // sample just after timer#1 fires (t0+3000 from the FIRST beat)
        while (Date.now() - t0 < 3350) await page.waitForTimeout(100);
        const at3350 = await page.evaluate(() =>
            ((document.querySelector("main")?.innerText || "").match(/(Pruned \d+ users?|No empty users to prune)/) || [])[0] ?? null);
        while (Date.now() - t0 < 4300) await page.waitForTimeout(100);
        const at4300 = await page.evaluate(() =>
            ((document.querySelector("main")?.innerText || "").match(/(Pruned \d+ users?|No empty users to prune)/) || [])[0] ?? null);
        E.C5_doubleBeat = { beat1, beat2, beat2AtMs: beat2At, at3350, at4300 };
        // live-region check specifically around the beat text
        E.C5_beatLiveRegion = await page.evaluate(() => {
            const spans = [...document.querySelectorAll("main span")].filter((s) =>
                /Pruned \d+|No empty users to prune/.test(s.textContent || ""));
            return spans.map((s) => ({
                text: (s.textContent || "").trim(),
                ariaLive: s.getAttribute("aria-live"), role: s.getAttribute("role"),
                ancestorLive: s.closest("[aria-live],[role='status'],[role='alert']")?.tagName ?? null,
            }));
        });
        await ctx.close();
    }

    // ---- C6 · focus after a destructive confirm removes its trigger ---------
    {
        const ctx = await newCtx(browser);
        await routeUsers(ctx);
        await ctx.route("**/admin/users/*/palettes", (r) =>
            r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
        await ctx.route("**/admin/users/gamma-empty-0003", (r) =>
            r.request().method() === "DELETE"
                ? r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ deleted: true, palettesDeleted: 0 }) })
                : r.continue());
        const page = await boot(ctx);
        const trigger = page.getByRole("button", { name: "Delete user gamma-empty-0003" }).first();
        await trigger.focus();
        E.C6_focusBefore = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            label: document.activeElement?.getAttribute("aria-label") ?? (document.activeElement?.textContent || "").trim().slice(0, 40),
        }));
        await trigger.click();
        await page.waitForTimeout(600);
        await page.getByRole("button", { name: /^Delete user$/ }).last().click();
        await page.waitForTimeout(1200);
        E.C6_focusAfter = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            isBody: document.activeElement === document.body,
            label: document.activeElement?.getAttribute("aria-label") ?? (document.activeElement?.textContent || "").trim().slice(0, 40),
            rowStillPresent: (document.querySelector("main")?.innerText || "").includes("gamma-empty-0003"),
        }));
        await ctx.close();
    }

    // ---- C7 · mobile geometry + tap targets ---------------------------------
    {
        const ctx = await newCtx(browser, { viewport: { width: 390, height: 844 }, isMobile: engineName === "webkit", hasTouch: true });
        await routeUsers(ctx);
        const page = await boot(ctx);
        E.C7_mobile = await page.evaluate(() => {
            const qa = (s) => [...document.querySelectorAll(s)];
            const box = (el) => { const r = el.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
            const btns = qa("main button").filter((b) => b.offsetParent !== null);
            return {
                docScrollW: document.documentElement.scrollWidth,
                innerW: window.innerWidth,
                under24: btns.filter((b) => { const r = b.getBoundingClientRect(); return r.width < 24 || r.height < 24; })
                    .map((b) => ({ label: b.getAttribute("aria-label") || (b.textContent || "").trim().slice(0, 30), ...box(b) })),
                buttons: btns.map((b) => ({ label: b.getAttribute("aria-label") || (b.textContent || "").trim().slice(0, 24), ...box(b) })),
            };
        });
        await page.screenshot({ path: resolve(FRAMES, `C7-${engineName}-mobile.png`), fullPage: false });
        await ctx.close();
    }

    await browser.close();
    console.log(`[${engineName}] done`);
}

writeFileSync(resolve(HERE, "probe-impl.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
