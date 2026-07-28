// worker-O · r3 delta adjudication probe for AdminUsersPanel.
// SIGNATURE, stated up front (L-9/L-12):
//   - The dev server at :9000 is REAL and serves the REAL component.
//   - The API is FIXTURED by page.route. Every server-side number below is a
//     fixture I authored, NOT a measurement of the api/ service. Only CLIENT
//     behaviour (what the component renders / requests / announces) is evidence.
//   - Requests are recorded verbatim so "what the client sent" is real evidence.
import { chromium, webkit } from "@playwright/test";
import fs from "node:fs";

const OUT = process.argv[2] || "/tmp/probe-O-r3.json";
const ORIGIN = "http://localhost:9000";
const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
    { slug: "mbabb", createdAt: NOW, status: "active", paletteCount: 12 },
    { slug: "ghost-empty-1733", createdAt: NOW, status: "active", paletteCount: 3 },
    { slug: "empty-ghost-account-aaaa-33", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "empty-ghost-account-aaaa-77", createdAt: NOW, status: "active", paletteCount: 0 },
    { slug: "empty-three-bbbb-11", createdAt: NOW, status: "active", paletteCount: 0 },
];
const PALETTES = [
    { slug: "alpha-p-1", name: "Alpha", colors: ["#ff0000", "#00ff00"], tier: "standard", userSlug: "ghost-empty-1733", createdAt: NOW },
];

async function make(browser, opts = {}) {
    const { token = true, rtl = false, palettes500 = false, viewport = { width: 1440, height: 900 } } = opts;
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    if (token) await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    if (rtl) await ctx.addInitScript(() => document.addEventListener("DOMContentLoaded", () => { document.documentElement.setAttribute("dir", "rtl"); }));
    const page = await ctx.newPage();
    const net = [];
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    page.on("request", (r) => { if (/\/admin\//.test(r.url())) net.push({ m: r.method(), p: new URL(r.url()).pathname, body: r.postData() }); });
    // rewrite the transport base so all api traffic is same-origin and routable
    await page.route(/transport\/client\.ts/, async (route) => {
        const res = await route.fetch(); let body = await res.text();
        body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
    });
    await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } },
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, async (route) => {
        const req = route.request(); const url = new URL(req.url());
        if (req.method() === "POST" && url.pathname.includes("prune"))
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ pruned: 3 }) });
        if (/\/admin\/users\/[^/]+\/palettes$/.test(url.pathname)) {
            if (palettes500) return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ title: "boom" }) });
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(PALETTES) });
        }
        if (url.pathname === "/admin/users")
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 400, limit: 50, offset: 0 }) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(4500);
    return { ctx, page, net, errs };
}

const R = { signature: "API fixtured via page.route; component + dev server real; server numbers are fixtures" };

for (const [name, browser] of [["chromium", await chromium.launch()], ["webkit", await webkit.launch()]]) {
    const E = (R[name] = {});
    // ---- arm 1: populated roster, aria name (D-29), duplicate count (D-26), geometry (D-24/D-30/D-32)
    {
        const { ctx, page, net } = await make(browser);
        E.rowCount = await page.locator('div[role="button"][aria-expanded]').count();
        E.rosterRequest = net.filter((n) => n.p === "/admin/users");
        E.ariaRow = await page.locator('div[role="button"][aria-expanded]').first().ariaSnapshot().catch((e) => "ERR " + e.message);
        E.slugPillText = await page.evaluate(() => {
            const p = document.querySelector('.slug-pill');
            return p ? { innerText: p.innerText, textContent: p.textContent, childHTML: p.innerHTML } : null;
        });
        E.gapBetweenPillAndBadge = await page.evaluate(() => {
            const row = document.querySelector('div[role="button"][aria-expanded]');
            if (!row) return null;
            const kids = [...row.querySelectorAll('.slug-pill, [data-slot="badge"]')].map((n) => n.tagName + ":" + n.className.slice(0, 24));
            const pill = row.querySelector('.slug-pill');
            const sib = pill && pill.nextSibling;
            return { kids, nextSiblingType: sib ? sib.nodeType : null, nextSiblingText: sib && sib.nodeType === 3 ? JSON.stringify(sib.nodeValue) : null };
        });
        E.counts = await page.evaluate(() => [...document.querySelectorAll('main *')]
            .filter((n) => n.children.length === 0 && /^\s*\d+(\s+users?)?\s*$/.test(n.textContent || ""))
            .map((n) => { const r = n.getBoundingClientRect(); const cs = getComputedStyle(n);
                return { tag: n.tagName, cls: n.className.toString().slice(0, 30), text: n.textContent.trim(), x: Math.round(r.x), y: Math.round(r.y), font: cs.fontFamily.split(",")[0], size: cs.fontSize }; }));
        E.toolbarButtons = await page.evaluate(() => [...document.querySelectorAll('button')]
            .filter((b) => /Prune empty|Refresh/.test(b.textContent || ""))
            .map((b) => { const r = b.getBoundingClientRect(); const cs = getComputedStyle(b);
                return { text: b.textContent.trim(), w: +r.width.toFixed(1), h: +r.height.toFixed(1), cls: b.className,
                    variantAttr: b.getAttribute("variant"), emphasisAttr: b.getAttribute("data-emphasis"),
                    height: cs.height, minHeight: cs.minHeight, opacity: cs.opacity, color: cs.color, bg: cs.backgroundColor,
                    font: cs.fontFamily.split(",")[0], fontStyle: cs.fontStyle, fontSize: cs.fontSize, disabled: b.disabled }; }));
        // focus ring (D-3): computed box-shadow + outline on the focused row
        E.focus = await page.evaluate(async () => {
            const row = document.querySelector('div[role="button"][aria-expanded]');
            if (!row) return null;
            row.focus();
            await new Promise((r) => setTimeout(r, 450));
            const cs = getComputedStyle(row);
            const wrap = row.parentElement;
            return { matchesFocusVisible: row.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: cs.outlineStyle + " " + cs.outlineWidth,
                bg: cs.backgroundColor, wrapperOverflow: getComputedStyle(wrap).overflow, wrapperClass: wrap.className };
        });
        await ctx.close();
    }
    // ---- arm 2: filtered prune dialog (D-1 / L-19)
    {
        const { ctx, page, net } = await make(browser);
        await page.fill('input[placeholder="Search users..."]', "aaaa-33").catch(() => {});
        await page.waitForTimeout(600);
        E.filteredToolbar = await page.evaluate(() => [...document.querySelectorAll("span")].map((s) => s.textContent.trim()).filter((t) => /users?$|empty$/.test(t)));
        await page.click('button:has-text("Prune empty")').catch(() => {});
        await page.waitForTimeout(600);
        E.filteredDialog = await page.evaluate(() => document.querySelector('[role="dialog"],[role="alertdialog"]')?.innerText.replace(/\n+/g, " | "));
        await page.click('[role="dialog"] button:has-text("Prune"),[role="alertdialog"] button:has-text("Prune")').catch(() => {});
        await page.waitForTimeout(1200);
        E.pruneRequests = net.filter((n) => /prune/.test(n.p));
        E.afterBeat = await page.evaluate(() => [...document.querySelectorAll("span")].map((s) => s.textContent.trim()).filter((t) => /Pruned|prune/i.test(t)));
        await ctx.close();
    }
    // ---- arm 3: nested palettes 500 (D-27) — does a rejection escape?
    {
        const { ctx, page, errs } = await make(browser, { palettes500: true });
        const unhandled = [];
        await page.evaluate(() => { window.__unh = []; window.addEventListener("unhandledrejection", (e) => window.__unh.push(String(e.reason))); });
        await page.locator('div[role="button"][aria-expanded]').first().click().catch(() => {});
        await page.waitForTimeout(1500);
        E.nested500 = await page.evaluate(() => ({
            unhandled: window.__unh,
            expandedText: document.querySelector('div[role="button"][aria-expanded="true"]')?.parentElement?.innerText.replace(/\n+/g, " | "),
        }));
        E.nested500.pageerrors = errs;
        await ctx.close();
    }
    // ---- arm 4: RTL slug order (D-4)
    {
        const { ctx, page } = await make(browser, { rtl: true });
        E.rtl = await page.evaluate(() => {
            const out = [];
            for (const p of document.querySelectorAll('.slug-pill')) {
                const spans = [...p.children];
                if (spans.length < 2) continue;
                out.push({ dom: spans.map((s) => s.textContent), lefts: spans.map((s) => +s.getBoundingClientRect().left.toFixed(1)),
                    dir: getComputedStyle(p).direction, display: getComputedStyle(p).display });
            }
            return { pills: out, bdiCount: document.querySelectorAll("bdi").length, htmlDir: document.documentElement.dir };
        });
        await ctx.close();
    }
    await browser.close();
}
fs.writeFileSync(OUT, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
