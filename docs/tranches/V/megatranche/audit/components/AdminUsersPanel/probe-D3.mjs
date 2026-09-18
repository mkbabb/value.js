// CHALLENGE-D (2026-07-27, second pass) — read-only design probe of AdminUsersPanel.
// All API traffic intercepted in-browser. No repo source is touched.
// Measures: control typography vs the §4 jurisdiction, boundary census, focus-ring
// visibility under keyboard Tab, identity paint in both schemes, target sizes at 390,
// skeleton→row anatomy delta, silent destructive failure, reduced-motion pending state.
import { webkit } from "@playwright/test";
import fs from "node:fs";

// Pixel diff without a native PNG dep: decode both frames inside the page on a
// 2D canvas and compare there.
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
        let n = 0, minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
        for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
            const i = (c.width * y + x) << 2;
            const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
            if (d > 12) { n++; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
        }
        return { changedPx: n, total: c.width * c.height, clipW: c.width, clipH: c.height, bbox: n ? { minX, minY, maxX, maxY } : null };
    }, [aBuf.toString("base64"), bBuf.toString("base64")]);
}

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

async function boot(browser, opts = {}) {
    const {
        w = 1440, h = 900, scheme = "light", rtl = false, dpr = 2,
        reducedMotion = "no-preference", deleteStatus = 200, slowList = 0, token = true,
    } = opts;
    const ctx = await browser.newContext({
        viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: dpr, reducedMotion,
    });
    if (token) await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe-admin-token"));
    if (rtl) await ctx.addInitScript(() => {
        const set = () => document.documentElement.setAttribute("dir", "rtl");
        set(); document.addEventListener("DOMContentLoaded", set);
    });
    const page = await ctx.newPage();
    const net = [];
    page.on("request", (r) => { if (/\/admin\//.test(r.url())) net.push(r.method() + " " + new URL(r.url()).pathname); });
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
        if (req.method() === "DELETE") {
            if (deleteStatus !== 200) return route.fulfill({ status: deleteStatus, contentType: "application/problem+json", body: JSON.stringify({ title: "Internal Server Error" }) });
            return json(JSON.stringify({ deleted: true }));
        }
        const m = url.pathname.match(/^\/admin\/users\/([^/]+)\/palettes$/);
        if (m) return json(JSON.stringify([pal("p-one-11aa", "OWNED-A", m[1]), pal("p-two-22bb", "OWNED-B", m[1])]));
        if (url.pathname === "/admin/users") {
            if (slowList) await new Promise((r) => setTimeout(r, slowList));
            return json(JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }));
        }
        return json("{}");
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u),
        (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(slowList ? 900 : 4000);
    if (rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(400); }
    return { ctx, page, net };
}

const R = {};
const browser = await webkit.launch();

// ── P1 typography + P2 boundary census + P4 identity paint (light) ────────────
{
    const { ctx, page } = await boot(browser);
    R.P1_typography_light = await page.evaluate(() => {
        const rd = (el) => {
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {
                text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24),
                family: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
                size: cs.fontSize, weight: cs.fontWeight, style: cs.fontStyle,
                color: cs.color,
            };
        };
        const btns = [...document.querySelectorAll("button")];
        const find = (t) => btns.find((b) => (b.textContent || "").trim().startsWith(t));
        const toolbarSpans = [...document.querySelectorAll("span")].filter((s) => /^\d+ users?$/.test((s.textContent || "").trim()));
        return {
            pruneBtn: rd(find("Prune empty")),
            refreshBtn: rd(find("Refresh")),
            rowPalettesBtn: rd(find("Palettes")),
            countSpan: rd(toolbarSpans[0]),
            headerBadge: rd(document.querySelector('[data-slot="badge"]')),
            slugPill: rd(document.querySelector(".slug-pill")),
            paneH1: rd(document.querySelector("h1, h2, [data-slot='pane-header'] *")),
        };
    });
    R.P2_boundary_census = await page.evaluate(() => {
        const rows = [...document.querySelectorAll("div.rounded-md.border.border-card-edge")]
            .filter((d) => d.querySelector(".slug-pill"));
        const edge = (el) => {
            const cs = getComputedStyle(el);
            return { t: cs.borderTopWidth, r: cs.borderRightWidth, b: cs.borderBottomWidth, l: cs.borderLeftWidth, color: cs.borderTopColor, radius: cs.borderRadius };
        };
        const boxes = rows.map(edge);
        const painted = boxes.filter((b) => parseFloat(b.t) > 0).length;
        return {
            rowBoxes: rows.length,
            perRow: boxes[0] ?? null,
            horizontalRulesRendered: painted * 2,       // top + bottom of each box
            verticalRulesRendered: painted * 2,
            adjacentSeparatorsPermitted: Math.max(rows.length - 1, 0),
            terminalRuleRendered: rows.length > 0 && parseFloat(boxes[boxes.length - 1].b) > 0,
            leadingRuleRendered: rows.length > 0 && parseFloat(boxes[0].t) > 0,
        };
    });
    R.P3_geometry_1440 = await page.evaluate(() => {
        const rows = [...document.querySelectorAll("div.rounded-md.border.border-card-edge")].filter((d) => d.querySelector(".slug-pill"));
        const badgeX = [], badgeR = [], actX = [], pillR = [];
        for (const row of rows) {
            const b = [...row.querySelectorAll('[data-slot="badge"]')].pop();
            if (b) { const r = b.getBoundingClientRect(); badgeX.push(+r.left.toFixed(1)); badgeR.push(+r.right.toFixed(1)); }
            const acts = row.querySelector(".flex.items-center.gap-1\\.5.shrink-0");
            if (acts) { const r = acts.getBoundingClientRect(); actX.push(+r.left.toFixed(1)); }
            const p = row.querySelector(".slug-pill");
            if (p) pillR.push(+p.getBoundingClientRect().width.toFixed(1));
        }
        return {
            badgeLefts: badgeX, distinctBadgeLefts: [...new Set(badgeX)].length,
            badgeLeftSpread: +(Math.max(...badgeX) - Math.min(...badgeX)).toFixed(1),
            actionClusterLefts: [...new Set(actX)], pillWidths: pillR,
        };
    });
    // slug pill contrast vs its row background
    R.P4_identity_light = await page.evaluate(() => {
        const p = document.querySelector(".slug-pill");
        const cs = getComputedStyle(p);
        return { color: cs.color, borderColor: cs.borderTopColor, weight: cs.fontWeight, borderWidth: cs.borderTopWidth };
    });
    await page.screenshot({ path: `${OUT}/A-desktop-light.png` });
    await ctx.close();
}

// ── P4b identity paint (dark) ─────────────────────────────────────────────────
{
    const { ctx, page } = await boot(browser, { scheme: "dark" });
    R.P4_identity_dark = await page.evaluate(() => {
        const p = document.querySelector(".slug-pill");
        const cs = getComputedStyle(p);
        const rowBtn = document.querySelector('button[aria-label^="Delete user"]');
        return {
            pillColor: cs.color, pillBorder: cs.borderTopColor,
            neighbourButtonColor: rowBtn ? getComputedStyle(rowBtn).color : null,
            accentLive: getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
        };
    });
    await page.screenshot({ path: `${OUT}/B-desktop-dark.png` });
    await ctx.close();
}

// ── P5 focus-ring visibility under real keyboard Tab (light) ──────────────────
{
    const { ctx, page } = await boot(browser, { dpr: 1 });
    const rowBox = await page.evaluate(() => {
        const row = document.querySelector('div[role="button"][aria-expanded]');
        const w = row.parentElement.getBoundingClientRect();
        return { x: Math.floor(w.x) - 8, y: Math.floor(w.y) - 8, width: Math.ceil(w.width) + 16, height: Math.ceil(w.height) + 16 };
    });
    const before = await page.screenshot({ clip: rowBox });
    // tab until the disclosure row owns focus
    let tabs = 0, ok = false;
    for (; tabs < 40; tabs++) {
        await page.keyboard.press("Tab");
        ok = await page.evaluate(() => {
            const a = document.activeElement;
            return !!(a && a.getAttribute("role") === "button" && a.hasAttribute("aria-expanded"));
        });
        if (ok) break;
    }
    const after = await page.screenshot({ clip: rowBox });
    const diff = await pixelDiff(page, before, after);
    R.P5_focus_ring = {
        engine: "webkit", tabsToReachRow: ok ? tabs + 1 : null, rowFocused: ok,
        ...diff,
        computed: await page.evaluate(() => {
            const row = document.querySelector('div[role="button"][aria-expanded]');
            const cs = getComputedStyle(row);
            const wrapCs = getComputedStyle(row.parentElement);
            return {
                rowBoxShadow: cs.boxShadow, rowOutline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
                rowBg: cs.backgroundColor, wrapperOverflow: wrapCs.overflow, wrapperRadius: wrapCs.borderRadius,
                matchesFocusVisible: row.matches(":focus-visible"),
            };
        }),
    };
    fs.writeFileSync(`${OUT}/C-focus-before.png`, before);
    fs.writeFileSync(`${OUT}/C-focus-after.png`, after);
    await page.screenshot({ path: `${OUT}/C-focus-full.png` });
    await ctx.close();
}

// ── P6 target sizes at 390 ────────────────────────────────────────────────────
{
    const { ctx, page } = await boot(browser, { w: 390, h: 844, dpr: 3 });
    R.P6_targets_390 = await page.evaluate(() => {
        const panel = document.querySelector('div[role="button"][aria-expanded]')?.closest(".grid");
        const scope = panel?.parentElement ?? document.body;
        const els = [...scope.querySelectorAll('button,[role="button"],a[href],input')];
        const out = els.map((e) => {
            const r = e.getBoundingClientRect();
            return {
                name: (e.getAttribute("aria-label") || e.textContent || e.tagName).trim().replace(/\s+/g, " ").slice(0, 28),
                w: +r.width.toFixed(1), h: +r.height.toFixed(1),
            };
        }).filter((o) => o.w > 0);
        return {
            controls: out,
            under24: out.filter((o) => o.w < 24 || o.h < 24).length,
            under44: out.filter((o) => o.w < 44 || o.h < 44).length,
            total: out.length,
        };
    });
    R.P6_toolbar_wrap_390 = await page.evaluate(() => {
        const btns = [...document.querySelectorAll("button")].filter((b) => /Prune empty|Refresh/.test(b.textContent || ""));
        return btns.map((b) => { const r = b.getBoundingClientRect(); return { t: b.textContent.trim(), x: +r.x.toFixed(1), y: +r.y.toFixed(1) }; });
    });
    await page.screenshot({ path: `${OUT}/D-mobile-light.png` });
    await ctx.close();
}

// ── P7 skeleton → row anatomy delta (slow list) ───────────────────────────────
{
    const { ctx, page } = await boot(browser, { slowList: 6000 });
    R.P7_skeleton = await page.evaluate(() => {
        const sk = [...document.querySelectorAll('[data-slot="admin-list-skeleton"]')];
        const r0 = sk[0]?.getBoundingClientRect();
        return {
            skeletonCount: sk.length,
            skeletonHeight: r0 ? +r0.height.toFixed(1) : null,
            skeletonHasLeadingSwatch: !!sk[0]?.querySelector(".rounded-full.w-8, .w-8.h-8"),
            skeletonLines: sk[0] ? sk[0].querySelectorAll('[data-slot="skeleton"]').length : null,
            toolbarTextWhileLoading: [...document.querySelectorAll("span")].map((s) => s.textContent.trim()).filter((t) => /users?$|empty$/.test(t)),
            loadingRegionRole: document.querySelector('[aria-label="Loading users"]')?.getAttribute("role") ?? null,
            liveRegions: document.querySelectorAll("[aria-live],[role=alert],[role=status]").length,
            refreshAriaBusy: [...document.querySelectorAll("button")].find((b) => /Refresh/.test(b.textContent))?.getAttribute("aria-busy") ?? null,
        };
    });
    await page.screenshot({ path: `${OUT}/E-loading.png` });
    await page.waitForTimeout(6500);
    R.P7_resolved = await page.evaluate(() => {
        const row = document.querySelector('div[role="button"][aria-expanded]');
        return {
            rowHeight: +row.getBoundingClientRect().height.toFixed(1),
            rowHasLeadingSwatch: !!row.querySelector(".w-8.h-8"),
            rowLines: 1,
        };
    });
    await ctx.close();
}

// ── P8 silent destructive failure: DELETE user → 500 ──────────────────────────
{
    const { ctx, page, net } = await boot(browser, { deleteStatus: 500 });
    const consoleMsgs = [];
    page.on("console", (m) => consoleMsgs.push(`[${m.type()}] ${m.text()}`.slice(0, 120)));
    const beforeRows = await page.evaluate(() => document.querySelectorAll(".slug-pill").length);
    await page.click('button[aria-label="Delete user zed"]');
    await page.waitForTimeout(600);
    const dialogText = await page.evaluate(() => document.querySelector('[role="dialog"]')?.innerText.replace(/\n+/g, " | ") ?? null);
    await page.click('[role="dialog"] button:has-text("Delete user")');
    await page.waitForTimeout(1200);
    R.P8_silent_delete_failure = {
        dialogText,
        rowsBefore: beforeRows,
        rowsAfter: await page.evaluate(() => document.querySelectorAll(".slug-pill").length),
        dialogStillOpen: await page.evaluate(() => !!document.querySelector('[role="dialog"]')),
        alertRoles: await page.evaluate(() => document.querySelectorAll('[role="alert"]').length),
        anyErrorText: await page.evaluate(() => /fail|error|unable|could not/i.test(document.body.innerText)),
        toolbar: await page.evaluate(() => [...document.querySelectorAll("span")].map((s) => s.textContent.trim()).filter((t) => /users?$|empty$/.test(t))),
        adminRequests: net.filter((n) => n.startsWith("DELETE")),
        console: consoleMsgs.filter((m) => /fail|warn|error/i.test(m)),
    };
    await page.screenshot({ path: `${OUT}/F-delete-500-desktop-light.png` });
    await ctx.close();
}

// ── P9 reduced motion: pending state ──────────────────────────────────────────
{
    const { ctx, page } = await boot(browser, { reducedMotion: "reduce", slowList: 4000 });
    R.P9_reduced_motion = await page.evaluate(() => {
        const spin = document.querySelector(".animate-spin");
        const cs = spin ? getComputedStyle(spin) : null;
        const refresh = [...document.querySelectorAll("button")].find((b) => /Refresh/.test(b.textContent));
        return {
            spinnerPresent: !!spin,
            spinnerAnimationDuration: cs?.animationDuration ?? null,
            spinnerIterationCount: cs?.animationIterationCount ?? null,
            refreshDisabled: refresh?.disabled ?? null,
            refreshAriaBusy: refresh?.getAttribute("aria-busy") ?? null,
            refreshAriaDisabled: refresh?.getAttribute("aria-disabled") ?? null,
            disabledOpacity: refresh ? getComputedStyle(refresh).opacity : null,
            liveRegionCount: document.querySelectorAll('[aria-live="polite"],[aria-live="assertive"]').length,
        };
    });
    await ctx.close();
}

// ── P10 RTL identity re-verification ──────────────────────────────────────────
{
    const { ctx, page } = await boot(browser, { rtl: true });
    R.P10_rtl = await page.evaluate(() => {
        const pill = [...document.querySelectorAll(".slug-pill")].find((p) => p.children.length === 2);
        const [head, tail] = pill.children;
        const hr = head.getBoundingClientRect(), tr = tail.getBoundingClientRect();
        const counts = [...document.querySelectorAll("span")].filter((s) => /^\d+ users?$/.test(s.textContent.trim()));
        return {
            dir: document.documentElement.dir,
            domOrder: [head.textContent, tail.textContent],
            renderedLeftToRight: hr.left < tr.left ? [head.textContent, tail.textContent] : [tail.textContent, head.textContent],
            tailRendersLeftOfHead: tr.left < hr.left,
            pillInnerText: pill.innerText.replace(/\s+/g, " "),
            bdiCount: document.querySelectorAll("bdi").length,
            unicodeBidiOnPill: getComputedStyle(pill).unicodeBidi,
            countSpanText: counts[0]?.textContent.trim() ?? null,
            trashIconMarginRight: (() => {
                const b = [...document.querySelectorAll("button")].find((x) => /Palettes/.test(x.textContent));
                const svg = b?.querySelector("svg");
                return svg ? getComputedStyle(svg).marginRight + " / " + getComputedStyle(svg).marginLeft : null;
            })(),
        };
    });
    await page.screenshot({ path: `${OUT}/G-rtl-desktop-light.png` });
    await ctx.close();
}

// ── P11 200%-zoom equivalent (720 CSS px stage) ───────────────────────────────
{
    const { ctx, page } = await boot(browser, { w: 720, h: 450, dpr: 2 });
    R.P11_zoom200 = await page.evaluate(() => {
        const rows = [...document.querySelectorAll("div.rounded-md.border.border-card-edge")].filter((d) => d.querySelector(".slug-pill"));
        const btns = [...document.querySelectorAll("button")].filter((b) => /Prune empty|Refresh/.test(b.textContent || ""));
        const doc = document.documentElement;
        return {
            innerWidth: window.innerWidth,
            horizontalOverflow: doc.scrollWidth > doc.clientWidth,
            scrollW: doc.scrollWidth, clientW: doc.clientWidth,
            toolbarButtonYs: btns.map((b) => ({ t: b.textContent.trim(), y: +b.getBoundingClientRect().y.toFixed(1) })),
            firstRowPillWidth: rows[0] ? +rows[0].querySelector(".slug-pill").getBoundingClientRect().width.toFixed(1) : null,
            firstRowText: rows[0]?.innerText.replace(/\s+/g, " ").slice(0, 60) ?? null,
            panelWidth: rows[0] ? +rows[0].getBoundingClientRect().width.toFixed(1) : null,
        };
    });
    await page.screenshot({ path: `${OUT}/H-zoom200-equivalent.png` });
    await ctx.close();
}

await browser.close();
fs.writeFileSync(`${DIR}/probe-D3.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
