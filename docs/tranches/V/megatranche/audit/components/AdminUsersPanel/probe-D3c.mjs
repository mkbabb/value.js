// CHALLENGE-D pass 2 — closing measurements.
// (1) focus-indicator contrast ratio, computed from the saved before/after crops
// (2) element-level closed-vs-open paint of the SAME header row (position-independent)
// (3) undeclared accordion: opening row B closes row A
// (4) pane scroll displacement on expand
import { webkit } from "@playwright/test";
import fs from "node:fs";

const ORIGIN = "http://localhost:9000";
const DIR = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const OUT = `${DIR}/frames-D3`;

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

async function boot(browser, { scheme = "light" } = {}) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
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
        const json = (b) => route.fulfill({ status: 200, contentType: "application/json", body: b });
        const m = url.pathname.match(/^\/admin\/users\/([^/]+)\/palettes$/);
        if (m) return json(JSON.stringify([pal("p-one-11aa", "OWNED-A", m[1]), pal("p-two-22bb", "OWNED-B", m[1])]));
        if (url.pathname === "/admin/users") return json(JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }));
        return json("{}");
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }));
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    return { ctx, page };
}

const R = {};
const browser = await webkit.launch();
const { ctx, page } = await boot(browser);

// (1) focus contrast, from the saved crops
R.focus_contrast = await page.evaluate(async ([a, b]) => {
    const load = (d) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + d; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const c = document.createElement("canvas"); c.width = ia.width; c.height = ia.height;
    const g = c.getContext("2d", { willReadFrequently: true });
    // sample a background-only band inside the row: y = row mid, x from 350..450 (right of the pill, left of the buttons)
    const band = { x0: 300, x1: 430, y0: 20, y1: 60 };
    const mean = (img) => {
        g.clearRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0);
        const d = g.getImageData(band.x0, band.y0, band.x1 - band.x0, band.y1 - band.y0).data;
        let r = 0, gg = 0, bb = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
        return [r / n, gg / n, bb / n];
    };
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const L = ([r, g2, b2]) => 0.2126 * lin(r) + 0.7152 * lin(g2) + 0.0722 * lin(b2);
    const A = mean(ia), B = mean(ib);
    const la = L(A), lb = L(B);
    const ratio = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    return { band, unfocusedMeanRGB: A.map((v) => +v.toFixed(1)), focusedMeanRGB: B.map((v) => +v.toFixed(1)), contrastRatio: +ratio.toFixed(3) };
}, [
    fs.readFileSync(`${OUT}/focus-webkit-light-before.png`).toString("base64"),
    fs.readFileSync(`${OUT}/focus-webkit-light-after.png`).toString("base64"),
]);
R.focus_contrast_dark = await page.evaluate(async ([a, b]) => {
    const load = (d) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + d; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const c = document.createElement("canvas"); c.width = ia.width; c.height = ia.height;
    const g = c.getContext("2d", { willReadFrequently: true });
    const band = { x0: 300, x1: 430, y0: 20, y1: 60 };
    const mean = (img) => {
        g.clearRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0);
        const d = g.getImageData(band.x0, band.y0, band.x1 - band.x0, band.y1 - band.y0).data;
        let r = 0, gg = 0, bb = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
        return [r / n, gg / n, bb / n];
    };
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const L = ([r, g2, b2]) => 0.2126 * lin(r) + 0.7152 * lin(g2) + 0.0722 * lin(b2);
    const A = mean(ia), B = mean(ib);
    const la = L(A), lb = L(B);
    return { unfocusedMeanRGB: A.map((v) => +v.toFixed(1)), focusedMeanRGB: B.map((v) => +v.toFixed(1)), contrastRatio: +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(3) };
}, [
    fs.readFileSync(`${OUT}/focus-webkit-dark-before.png`).toString("base64"),
    fs.readFileSync(`${OUT}/focus-webkit-dark-after.png`).toString("base64"),
]);

// (2) element-level closed vs open paint of the SAME header row
const row0 = page.locator('div[role="button"][aria-expanded]').first();
const closed = await row0.screenshot();
fs.writeFileSync(`${OUT}/rowpaint-closed.png`, closed);
await row0.click();
await page.waitForTimeout(1500);
const opened = await row0.screenshot();
fs.writeFileSync(`${OUT}/rowpaint-open.png`, opened);
R.header_row_open_vs_closed = await page.evaluate(async ([a, b]) => {
    const load = (d) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + d; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const c = document.createElement("canvas"); c.width = Math.min(ia.width, ib.width); c.height = Math.min(ia.height, ib.height);
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(ia, 0, 0); const A = g.getImageData(0, 0, c.width, c.height).data;
    g.clearRect(0, 0, c.width, c.height); g.drawImage(ib, 0, 0); const B = g.getImageData(0, 0, c.width, c.height).data;
    let n = 0, maxD = 0;
    for (let i = 0; i < A.length; i += 4) {
        const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        if (d > maxD) maxD = d;
        if (d > 12) n++;
    }
    return { sameSize: ia.width === ib.width && ia.height === ib.height, dims: [ia.width, ia.height, ib.width, ib.height], changedPx: n, total: c.width * c.height, maxChannelDelta: maxD };
}, [closed.toString("base64"), opened.toString("base64")]);
R.header_row_open_semantics = await page.evaluate(() => {
    const row = document.querySelector('div[role="button"][aria-expanded]');
    return {
        ariaExpanded: row.getAttribute("aria-expanded"),
        childElementCount: row.childElementCount,
        svgsInsideHeaderRow: row.querySelectorAll("svg").length,
        svgNamesInsideHeaderRow: [...row.querySelectorAll("svg")].map((s) => s.getAttribute("class") || "").slice(0, 6),
        computedBg: getComputedStyle(row).backgroundColor,
        computedBorderBottom: getComputedStyle(row).borderBottomWidth,
    };
});

// (3) undeclared accordion + (4) pane scroll displacement
R.accordion = await (async () => {
    const beforeScroll = await page.evaluate(() => document.querySelector(".pane-scroll-fade")?.scrollTop ?? null);
    const openedSlugs1 = await page.evaluate(() => [...document.querySelectorAll('div[role="button"][aria-expanded="true"]')].map((r) => r.innerText.split("\n")[0]));
    const second = page.locator('div[role="button"][aria-expanded]').nth(1);
    await second.click();
    await page.waitForTimeout(1200);
    const openedSlugs2 = await page.evaluate(() => [...document.querySelectorAll('div[role="button"][aria-expanded="true"]')].map((r) => r.innerText.split("\n")[0]));
    const afterScroll = await page.evaluate(() => document.querySelector(".pane-scroll-fade")?.scrollTop ?? null);
    return {
        openBeforeSecondClick: openedSlugs1, openAfterSecondClick: openedSlugs2,
        simultaneousOpenRowsMax: Math.max(openedSlugs1.length, openedSlugs2.length),
        firstRowSilentlyClosed: openedSlugs1.length === 1 && openedSlugs2.length === 1 && openedSlugs1[0] !== openedSlugs2[0],
        paneScrollTopBefore: beforeScroll, paneScrollTopAfter: afterScroll,
        ariaControlsPresent: await page.evaluate(() => !!document.querySelector('div[role="button"][aria-expanded]')?.hasAttribute("aria-controls")),
    };
})();

await page.screenshot({ path: `${OUT}/I-accordion-after.png` });
await ctx.close();
await browser.close();
fs.writeFileSync(`${DIR}/probe-D3c.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
