// CHALLENGE-D (2026-07-27) read-only design probe of AdminUsersPanel.
// All API traffic is intercepted in-browser. No repo source is touched.
import { webkit } from "@playwright/test";

const ORIGIN = "http://localhost:9000";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel/frames-D2";
import fs from "node:fs";
fs.mkdirSync(OUT, { recursive: true });

const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
    { slug: "mbabb", createdAt: NOW, status: "active", paletteCount: 12 },
    { slug: "an-extremely-long-anonymous-visitor-slug-from-the-wild-2f9a-33", createdAt: NOW, status: "active", paletteCount: 3 },
    { slug: "empty-ghost-account-aaaa-33", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "empty-ghost-account-aaaa-77", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "zed", createdAt: NOW, status: "active", paletteCount: 1 },
    { slug: "empty-three-bbbb-11", createdAt: NOW, status: "active", paletteCount: 0 },
];
const pal = (slug, name, userSlug) => ({
    name, slug, userSlug,
    colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#16a34a", position: 2 }],
    tags: [], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 0,
    visibility: "public", tier: "standard", published: true,
});

async function boot(browser, { w = 1440, h = 900, scheme = "light", rtl = false, dpr = 2 } = {}) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: dpr });
    await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    const page = await ctx.newPage();
    const adminReqs = [];
    page.on("request", (r) => { if (/\/admin\//.test(r.url())) adminReqs.push(r.method() + " " + new URL(r.url()).pathname); });
    page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
    await page.route(/transport\/client\.ts/, async (route) => {
        const res = await route.fetch();
        let body = await res.text();
        body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
    });
    await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } }, (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, async (route) => {
        const req = route.request(); const url = new URL(req.url());
        const json = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: b });
        if (req.method() === "POST" && url.pathname.includes("prune")) return json(JSON.stringify({ pruned: 3 }));
        if (req.method() === "DELETE") return json(JSON.stringify({ deleted: true }));
        const m = url.pathname.match(/^\/admin\/users\/([^/]+)\/palettes$/);
        if (m) return json(JSON.stringify([pal("p-one-11aa", "OWNED-A", m[1]), pal("p-two-22bb", "OWNED-B", m[1])]));
        if (url.pathname === "/admin/users") return json(JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }));
        return json("{}");
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    if (rtl) await ctx.addInitScript(() => {
        const set = () => { document.documentElement.setAttribute("dir", "rtl"); };
        set(); document.addEventListener("DOMContentLoaded", set);
    });
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    if (rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(500); }
    return { ctx, page, adminReqs };
}

const M = {};
const browser = await webkit.launch();

// ---------- A: populated desktop light ----------
{
    const { ctx, page } = await boot(browser);
    await page.screenshot({ path: `${OUT}/A-populated-desktop-light.png` });
    M.A = await page.evaluate(() => {
        const rows = [...document.querySelectorAll('[aria-expanded]')].filter(e => e.getAttribute("role") === "button");
        const all = [...document.querySelectorAll("div")].filter(d => /px-3 py-2\.5/.test(d.className || ""));
        const o = { interactiveRows: rows.length, allHeaderRows: all.length };
        // toolbar duplication
        const badge = [...document.querySelectorAll("span")].find(s => /data-slot|badge/i.test(s.getAttribute("data-slot") || "") );
        o.headerBadge = document.querySelector('[data-slot="badge"]')?.textContent.trim() ?? null;
        o.toolbarCount = [...document.querySelectorAll("span")].map(s => s.textContent.trim()).filter(t => /^\d+ users?$/.test(t));
        // resting destructive ink
        const trash = [...document.querySelectorAll('button[aria-label^="Delete user"]')];
        o.trashCount = trash.length;
        o.trashRestingColor = trash[0] ? getComputedStyle(trash[0]).color : null;
        const cs0 = trash[0] ? trash[0].getBoundingClientRect() : null;
        o.trashRect = cs0 ? { w: +cs0.width.toFixed(1), h: +cs0.height.toFixed(1) } : null;
        // the "Palettes" per-row button
        const palBtns = [...document.querySelectorAll("button")].filter(b => b.textContent.trim() === "Palettes");
        o.palettesBtnCount = palBtns.length;
        o.palettesBtnRect = palBtns[0] ? { w: +palBtns[0].getBoundingClientRect().width.toFixed(1), h: +palBtns[0].getBoundingClientRect().height.toFixed(1) } : null;
        // type rungs on the row
        const pill = document.querySelector(".slug-pill");
        if (pill) {
            const c = getComputedStyle(pill);
            o.pill = { font: c.fontFamily.split(",")[0], size: c.fontSize, weight: c.fontWeight, color: c.color, border: c.borderColor, bw: c.borderWidth };
        }
        const badgeEl = pill?.parentElement?.querySelector('[data-slot="badge"]');
        o.rowBadge = badgeEl ? { text: badgeEl.textContent.trim(), size: getComputedStyle(badgeEl).fontSize, bg: getComputedStyle(badgeEl).backgroundColor } : null;
        // nested boundary chain: how many nested borders around a row
        const r = rows[0];
        let chain = [], n = r;
        while (n && n !== document.body) { const c = getComputedStyle(n); if (parseFloat(c.borderTopWidth) > 0 || parseFloat(c.borderLeftWidth) > 0) chain.push((n.tagName + "." + String(n.className).split(" ").slice(0,3).join(".")).slice(0,70)); n = n.parentElement; }
        o.borderChain = chain;
        // row min-width (the AdminListItem F-1 cure)
        o.rowComputedMinWidth = r ? getComputedStyle(r).minWidth : null;
        o.wrapperComputedMinWidth = r ? getComputedStyle(r.parentElement).minWidth : null;
        o.wrapperOverflow = r ? getComputedStyle(r.parentElement).overflow : null;
        // inert (0-palette) rows: any affordance?
        const inert = all.filter(d => !d.getAttribute("role"));
        o.inertRows = inert.length;
        o.inertRowCursor = inert[0] ? getComputedStyle(inert[0]).cursor : null;
        o.inertRowHasTrash = inert[0] ? !!inert[0].querySelector("button") : null;
        o.inertRowButtons = inert[0] ? [...inert[0].querySelectorAll("button")].map(b => b.getAttribute("aria-label") || b.textContent.trim()) : null;
        return o;
    });
    console.log("A:", JSON.stringify(M.A, null, 1));
    await ctx.close();
}

// ---------- B: mobile 390 populated ----------
{
    const { ctx, page } = await boot(browser, { w: 390, h: 844, dpr: 3 });
    await page.screenshot({ path: `${OUT}/B-populated-mobile-light.png`, fullPage: true });
    M.B = await page.evaluate(() => {
        const rows = [...document.querySelectorAll('[aria-expanded][role="button"]')];
        const o = { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, rows: rows.length };
        const r = rows[1]; // the long slug
        if (r) {
            const wrap = r.parentElement, wr = wrap.getBoundingClientRect();
            const pill = r.querySelector(".slug-pill"), pr = pill.getBoundingClientRect();
            const badge = pill.parentElement.querySelector('[data-slot="badge"]');
            const br = badge.getBoundingClientRect();
            const acts = r.lastElementChild.getBoundingClientRect();
            o.wrap = { l: +wr.left.toFixed(1), r: +wr.right.toFixed(1), w: +wr.width.toFixed(1) };
            o.pill = { l: +pr.left.toFixed(1), r: +pr.right.toFixed(1), w: +pr.width.toFixed(1), text: pill.innerText };
            o.badge = { l: +br.left.toFixed(1), r: +br.right.toFixed(1), w: +br.width.toFixed(1), clipped: br.right > wr.right + 0.5 || br.width < 1 };
            o.actions = { l: +acts.left.toFixed(1), r: +acts.right.toFixed(1), w: +acts.width.toFixed(1), clipped: acts.right > wr.right + 0.5 };
            o.rowScrollW = r.scrollWidth; o.rowClientW = r.clientWidth;
            o.rowOverflowsBy = r.scrollWidth - r.clientWidth;
            o.headSpanW = +pill.children[0].getBoundingClientRect().width.toFixed(1);
            o.tailSpanW = +pill.children[1].getBoundingClientRect().width.toFixed(1);
        }
        o.buttons = [...document.querySelectorAll("button")].map(b => { const q = b.getBoundingClientRect(); return { t: (b.textContent.trim() || b.getAttribute("aria-label") || "?").slice(0, 24), w: +q.width.toFixed(1), h: +q.height.toFixed(1) }; }).filter(b => b.h > 0);
        o.under24 = o.buttons.filter(b => b.w < 24 || b.h < 24);
        o.under44 = o.buttons.filter(b => b.w < 44 || b.h < 44);
        return o;
    });
    console.log("B:", JSON.stringify(M.B, null, 1));
    await ctx.close();
}

// ---------- C: RTL populated ----------
{
    const { ctx, page } = await boot(browser, { rtl: true });
    await page.screenshot({ path: `${OUT}/C-populated-rtl-desktop.png` });
    M.C = await page.evaluate(() => {
        const rows = [...document.querySelectorAll('[aria-expanded][role="button"]')];
        const r = rows[1], pill = r.querySelector(".slug-pill");
        const head = pill.children[0].getBoundingClientRect(), tail = pill.children[1].getBoundingClientRect();
        const cnt = [...document.querySelectorAll("span")].map(s => s.textContent.trim()).filter(t => /users$|^\d+ user/.test(t));
        // visual order of the count line
        const countSpan = [...document.querySelectorAll("span")].find(s => /^\d+ users?$/.test(s.textContent.trim()));
        return {
            dir: document.documentElement.dir,
            headText: pill.children[0].textContent, headL: +head.left.toFixed(1), headR: +head.right.toFixed(1),
            tailText: pill.children[1].textContent, tailL: +tail.left.toFixed(1), tailR: +tail.right.toFixed(1),
            tailRenderedLeftOfHead: tail.right <= head.left + 0.5,
            countText: countSpan ? countSpan.textContent.trim() : null,
            countUnicodeBidi: countSpan ? getComputedStyle(countSpan).unicodeBidi : null,
            countDirection: countSpan ? getComputedStyle(countSpan).direction : null,
        };
    });
    console.log("C:", JSON.stringify(M.C, null, 1));
    await ctx.close();
}

// ---------- D: filtered prune-count mismatch + confirm dialog ----------
{
    const { ctx, page, adminReqs } = await boot(browser, { scheme: "dark" });
    // expand row 0
    await page.locator('[aria-expanded][role="button"]').first().click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/D-expanded-desktop-dark.png` });
    M.D_expanded = await page.evaluate(() => {
        const open = document.querySelector('[aria-expanded="true"]');
        const panel = open?.parentElement?.lastElementChild;
        let chain = [], n = panel?.querySelector("article, [data-slot='card'], .rounded-md");
        while (n && n !== document.body) { const c = getComputedStyle(n); if (parseFloat(c.borderTopWidth) > 0) chain.push(String(n.tagName + "." + String(n.className).split(" ").slice(0,2).join(".")).slice(0,60)); n = n.parentElement; }
        return { nestedBorderChainInsideExpanded: chain, panelBg: panel ? getComputedStyle(panel).backgroundColor : null };
    });
    console.log("D-expanded:", JSON.stringify(M.D_expanded, null, 1));

    // now: filter to ONE empty user, then read the prune confirmation
    await page.locator('input[placeholder="Search users..."]').fill("aaaa-33");
    await page.waitForTimeout(600);
    M.D_filtered = await page.evaluate(() => ({
        headerBadge: document.querySelector('[data-slot="badge"]')?.textContent.trim(),
        toolbar: [...document.querySelectorAll("span")].map(s => s.textContent.trim()).filter(t => /^\d+ users?$/.test(t) || /^· \d+ empty$/.test(t)),
        renderedRows: document.querySelectorAll('[aria-expanded][role="button"]').length + [...document.querySelectorAll("div")].filter(d => /cursor-default/.test(d.className || "") && /py-2\.5/.test(d.className || "")).length,
    }));
    console.log("D-filtered:", JSON.stringify(M.D_filtered, null, 1));
    await page.locator("button", { hasText: "Prune empty" }).click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/D-confirm-prune-filtered-dark.png` });
    M.D_dialog = await page.evaluate(() => {
        const d = document.querySelector('[role="alertdialog"], [role="dialog"]');
        return { role: d?.getAttribute("role"), text: d?.innerText, ariaModal: d?.getAttribute("aria-modal") };
    });
    console.log("D-dialog:", JSON.stringify(M.D_dialog, null, 1));
    // confirm it, then read what actually happened
    const before = adminReqs.slice();
    await page.locator('[role="dialog"] button', { hasText: "Prune" }).last().click();
    await page.waitForTimeout(1500);
    M.D_after = { adminReqsDelta: adminReqs.filter(r => !before.includes(r)).concat(adminReqs.slice(before.length)), toolbarAfter: await page.evaluate(() => [...document.querySelectorAll("span")].map(s => s.textContent.trim()).filter(t => /Pruned|prune/i.test(t))) };
    await page.screenshot({ path: `${OUT}/D-after-prune-dark.png` });
    console.log("D-after:", JSON.stringify(M.D_after, null, 1));
    await ctx.close();
}

// ---------- E: unauthenticated — the undesigned state ----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const adminReqs = [];
    page.on("request", (r) => { if (/\/admin\//.test(r.url())) adminReqs.push(r.url()); });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const t0 = await page.evaluate(() => document.body.innerText);
    const n0 = adminReqs.length;
    await page.locator("button", { hasText: "Refresh" }).click();
    await page.waitForTimeout(1500);
    const t1 = await page.evaluate(() => document.body.innerText);
    M.E = {
        token: await page.evaluate(() => localStorage.getItem("palette-admin-token")),
        adminReqsBefore: n0, adminReqsAfterRefreshClick: adminReqs.length,
        domTextIdentical: t0 === t1,
        emptyStateSays: await page.evaluate(() => document.querySelector('[role="status"]')?.innerText.replace(/\n/g, " | ")),
        refreshDisabled: await page.locator("button", { hasText: "Refresh" }).isDisabled(),
        pruneDisabled: await page.locator("button", { hasText: "Prune empty" }).isDisabled(),
    };
    console.log("E:", JSON.stringify(M.E, null, 1));
    await page.screenshot({ path: `${OUT}/E-unauth-desktop-light.png` });
    await ctx.close();
}

// ---------- F: prune-result celebration displaces the toolbar ----------
{
    const { ctx, page } = await boot(browser, { w: 390, h: 844, dpr: 3 });
    const geo = async () => page.evaluate(() => {
        const btns = [...document.querySelectorAll("button")].filter(b => /Prune empty|Refresh/.test(b.textContent));
        return btns.map(b => { const q = b.getBoundingClientRect(); return { t: b.textContent.trim(), x: +q.left.toFixed(1), y: +q.top.toFixed(1) }; });
    });
    const g0 = await geo();
    await page.locator("button", { hasText: "Prune empty" }).click();
    await page.waitForTimeout(700);
    await page.locator('[role="dialog"] button', { hasText: "Prune" }).last().click();
    await page.waitForTimeout(1200);
    const g1 = await geo();
    await page.screenshot({ path: `${OUT}/F-prune-result-mobile.png`, fullPage: true });
    M.F = { before: g0, after: g1, celebrationText: await page.evaluate(() => [...document.querySelectorAll("span")].map(s => s.textContent.trim()).find(t => /^Pruned|No empty users/.test(t))) };
    console.log("F:", JSON.stringify(M.F, null, 1));
    await ctx.close();
}

fs.writeFileSync(`${OUT}/../probe-D2.json`, JSON.stringify(M, null, 2));
await browser.close();
console.log("DONE");
