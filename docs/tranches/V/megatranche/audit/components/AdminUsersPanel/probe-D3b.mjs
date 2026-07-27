// CHALLENGE-D pass 2 — targeted follow-ups.
// (a) two-engine focus-ring visibility (WebKit + Chromium), pixel diff
// (b) roster identity paint in both schemes + the .slug-pill class shared with the dock authority badge
// (c) toolbar count ink: --muted-foreground vs the certified --ink-muted rung, composited contrast
// (d) RTL with a long slug
// (e) expanded-state paint delta on the header row (is there ANY open affordance?)
import { webkit, chromium } from "@playwright/test";
import fs from "node:fs";

const ORIGIN = "http://localhost:9000";
const DIR = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const OUT = `${DIR}/frames-D3`;
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

async function pixelDiff(page, aBuf, bBuf) {
    return page.evaluate(async ([a, b]) => {
        const load = (d) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + d; });
        const [ia, ib] = await Promise.all([load(a), load(b)]);
        const c = document.createElement("canvas");
        c.width = ia.width; c.height = ia.height;
        const g = c.getContext("2d", { willReadFrequently: true });
        g.drawImage(ia, 0, 0); const A = g.getImageData(0, 0, c.width, c.height).data;
        g.clearRect(0, 0, c.width, c.height);
        g.drawImage(ib, 0, 0); const B = g.getImageData(0, 0, c.width, c.height).data;
        let n = 0, maxD = 0, minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
        for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
            const i = (c.width * y + x) << 2;
            const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
            if (d > maxD) maxD = d;
            if (d > 12) { n++; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
        }
        return { changedPx: n, maxChannelDelta: maxD, total: c.width * c.height, clipW: c.width, clipH: c.height, bbox: n ? { minX, minY, maxX, maxY } : null };
    }, [aBuf.toString("base64"), bBuf.toString("base64")]);
}

async function boot(browser, opts = {}) {
    const { w = 1440, h = 900, scheme = "light", rtl = false, dpr = 1 } = opts;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: dpr });
    await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    if (rtl) await ctx.addInitScript(() => {
        const set = () => document.documentElement.setAttribute("dir", "rtl");
        set(); document.addEventListener("DOMContentLoaded", set);
    });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
    await page.route(/transport\/client\.ts/, async (route) => {
        const res = await route.fetch();
        let body = await res.text();
        body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
    });
    await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } },
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
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
    await page.route((u) => /api\.color\.babb\.dev/.test(u),
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    if (rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(400); }
    return { ctx, page };
}

const R = {};

async function focusProbe(browser, engine, scheme) {
    const { ctx, page } = await boot(browser, { scheme });
    const clip = await page.evaluate(() => {
        const row = document.querySelector('div[role="button"][aria-expanded]');
        const w = row.parentElement.getBoundingClientRect();
        return { x: Math.max(0, Math.floor(w.x) - 10), y: Math.max(0, Math.floor(w.y) - 10), width: Math.ceil(w.width) + 20, height: Math.ceil(w.height) + 20 };
    });
    const bgBefore = await page.evaluate(() => getComputedStyle(document.querySelector('div[role="button"][aria-expanded]')).backgroundColor);
    const before = await page.screenshot({ clip });
    let tabs = 0, ok = false;
    for (; tabs < 40; tabs++) {
        await page.keyboard.press("Tab");
        ok = await page.evaluate(() => {
            const a = document.activeElement;
            return !!(a && a.getAttribute("role") === "button" && a.hasAttribute("aria-expanded"));
        });
        if (ok) break;
    }
    await page.waitForTimeout(400);
    const after = await page.screenshot({ clip });
    const state = await page.evaluate(() => {
        const row = document.querySelector('div[role="button"][aria-expanded]');
        const cs = getComputedStyle(row), wc = getComputedStyle(row.parentElement);
        const rr = row.getBoundingClientRect(), wr = row.parentElement.getBoundingClientRect();
        return {
            focusVisible: row.matches(":focus-visible"),
            bgAfter: cs.backgroundColor, boxShadow: cs.boxShadow, outline: cs.outlineStyle,
            wrapperOverflow: wc.overflow,
            rowRect: { x: +rr.x.toFixed(1), y: +rr.y.toFixed(1), w: +rr.width.toFixed(1), h: +rr.height.toFixed(1) },
            wrapperRect: { x: +wr.x.toFixed(1), y: +wr.y.toFixed(1), w: +wr.width.toFixed(1), h: +wr.height.toFixed(1) },
        };
    });
    const diff = await pixelDiff(page, before, after);
    fs.writeFileSync(`${OUT}/focus-${engine}-${scheme}-before.png`, before);
    fs.writeFileSync(`${OUT}/focus-${engine}-${scheme}-after.png`, after);
    // control: does the sibling native <button> show a visible focus delta?
    const btnClip = await page.evaluate(() => {
        const b = document.querySelector('button[aria-label^="Delete user"]');
        const r = b.getBoundingClientRect();
        return { x: Math.max(0, Math.floor(r.x) - 10), y: Math.max(0, Math.floor(r.y) - 10), width: Math.ceil(r.width) + 20, height: Math.ceil(r.height) + 20 };
    });
    const bBefore = await page.screenshot({ clip: btnClip });
    await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
    const focusedName = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim().slice(0, 20));
    await page.waitForTimeout(300);
    const bAfter = await page.screenshot({ clip: btnClip });
    const btnDiff = await pixelDiff(page, bBefore, bAfter);
    await ctx.close();
    return { engine, scheme, tabsToRow: ok ? tabs + 1 : null, rowFocused: ok, bgBefore, ...state, rowDiff: diff, controlButtonFocusedName: focusedName, controlButtonDiff: btnDiff };
}

{
    const wk = await webkit.launch();
    R.focus_webkit_light = await focusProbe(wk, "webkit", "light");
    R.focus_webkit_dark = await focusProbe(wk, "webkit", "dark");

    // (b) roster identity paint + slug-pill class sharing
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await boot(wk, { scheme });
        R[`identity_${scheme}`] = await page.evaluate(() => {
            const all = [...document.querySelectorAll(".slug-pill")];
            const rows = all.filter((p) => p.closest('div[role="button"][aria-expanded]') || p.closest(".rounded-md.border.border-card-edge"));
            const dockPills = all.filter((p) => !rows.includes(p));
            const rd = (el) => { const cs = getComputedStyle(el); return { text: el.innerText.replace(/\s+/g, " "), color: cs.color, border: cs.borderTopColor, borderWidth: cs.borderTopWidth, weight: cs.fontWeight, family: cs.fontFamily.split(",")[0].replace(/["']/g, ""), size: cs.fontSize, radius: cs.borderRadius }; };
            const root = getComputedStyle(document.documentElement);
            return {
                slugPillTotal: all.length,
                rosterPills: rows.length, dockPills: dockPills.length,
                rosterSample: rows[0] ? rd(rows[0]) : null,
                dockSample: dockPills[0] ? rd(dockPills[0]) : null,
                mutedForeground: root.getPropertyValue("--muted-foreground").trim(),
                inkMuted: root.getPropertyValue("--ink-muted").trim(),
                accentLive: root.getPropertyValue("--accent-live").trim(),
                countSpanColor: (() => { const s = [...document.querySelectorAll("span")].find((x) => /^\d+ users?$/.test(x.textContent.trim())); return s ? getComputedStyle(s).color : null; })(),
                emptyStatePlateInkUsed: false,
            };
        });
        // (e) expanded-state paint delta on the header row
        if (scheme === "light") {
            const clip = await page.evaluate(() => {
                const row = document.querySelector('div[role="button"][aria-expanded]');
                const r = row.getBoundingClientRect();
                return { x: Math.floor(r.x), y: Math.floor(r.y), width: Math.ceil(r.width), height: Math.ceil(r.height) };
            });
            const closed = await page.screenshot({ clip });
            await page.evaluate(() => document.querySelector('div[role="button"][aria-expanded]').click());
            await page.waitForTimeout(1200);
            const opened = await page.screenshot({ clip });
            R.expanded_header_delta = {
                ...(await pixelDiff(page, closed, opened)),
                ariaExpandedAfter: await page.evaluate(() => document.querySelector('div[role="button"][aria-expanded]').getAttribute("aria-expanded")),
                chevronCount: await page.evaluate(() => document.querySelectorAll('div[role="button"][aria-expanded] svg').length),
            };
            fs.writeFileSync(`${OUT}/expanded-header-closed.png`, closed);
            fs.writeFileSync(`${OUT}/expanded-header-open.png`, opened);
        }
        await ctx.close();
    }

    // (d) RTL long slug
    {
        const { ctx, page } = await boot(wk, { rtl: true });
        R.rtl_long_slug = await page.evaluate(() => {
            const pills = [...document.querySelectorAll(".slug-pill")].filter((p) => p.children.length === 2 && p.children[1].textContent.length > 0);
            const out = pills.slice(0, 4).map((p) => {
                const [h, t] = p.children;
                const hr = h.getBoundingClientRect(), tr = t.getBoundingClientRect();
                return {
                    domHead: h.textContent, domTail: t.textContent,
                    headLeft: +hr.left.toFixed(1), tailLeft: +tr.left.toFixed(1),
                    tailLeftOfHead: tr.left < hr.left,
                    renderedReadingOrderLTR: (tr.left < hr.left ? t.textContent + h.textContent : h.textContent + t.textContent),
                    innerText: p.innerText.replace(/\s+/g, " "),
                };
            });
            return { dir: document.documentElement.dir, bdi: document.querySelectorAll("bdi").length, pills: out };
        });
        await page.screenshot({ path: `${OUT}/rtl-long-slug.png` });
        await ctx.close();
    }
    await wk.close();
}

{
    const cr = await chromium.launch();
    R.focus_chromium_light = await focusProbe(cr, "chromium", "light");
    R.focus_chromium_dark = await focusProbe(cr, "chromium", "dark");
    // forced-colors (Chromium only)
    {
        const ctx = await cr.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" });
        await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
        const page = await ctx.newPage();
        await page.route(/transport\/client\.ts/, async (route) => {
            const res = await route.fetch(); let body = await res.text();
            body = body.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
            await route.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body });
        });
        await page.route((u) => { try { return new URL(u).pathname === "/sessions"; } catch { return false; } },
            (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "probe" }) }));
        await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, (route) => {
            const url = new URL(route.request().url());
            if (url.pathname === "/admin/users") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }) });
            return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
        });
        await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
        await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
        await page.waitForTimeout(4000);
        R.forced_colors = await page.evaluate(() => {
            const pill = [...document.querySelectorAll(".slug-pill")].find((p) => p.closest(".rounded-md.border.border-card-edge"));
            const del = document.querySelector('button[aria-label^="Delete user"]');
            const palBtn = [...document.querySelectorAll("button")].find((b) => /Palettes/.test(b.textContent));
            const rd = (e) => { const c = getComputedStyle(e); return { color: c.color, bg: c.backgroundColor, border: c.borderTopColor, forcedColorAdjust: c.forcedColorAdjust }; };
            return {
                forcedActive: matchMedia("(forced-colors: active)").matches,
                rosterPill: pill ? rd(pill) : null,
                deleteBtn: del ? rd(del) : null,
                palettesBtn: palBtn ? rd(palBtn) : null,
                destructiveHoverClassPresent: del ? del.className.includes("hover:text-destructive") : null,
            };
        });
        await page.screenshot({ path: `${OUT}/forced-colors-chromium.png` });
        await ctx.close();
    }
    await cr.close();
}

fs.writeFileSync(`${DIR}/probe-D3b.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
