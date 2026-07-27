// CHALLENGE-D pass 2 — final numbers.
// (1) Chromium focus-indicator contrast (two-engine closure)
// (2) composited contrast of the toolbar count "6 users" and the celebration beat
// (3) EmptyState ghost-dot species on the Admin route (colour + count)
import { webkit } from "@playwright/test";
import fs from "node:fs";

const DIR = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const OUT = `${DIR}/frames-D3`;
const ORIGIN = "http://localhost:9000";
const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
    { slug: "mbabb", createdAt: NOW, status: "active", paletteCount: 12 },
    { slug: "empty-ghost-account-aaaa-33", createdAt: NOW, status: "active", paletteCount: 0 },
];

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
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

const R = {};

// (1) Chromium focus contrast, from the crops probe-D3b saved
const contrastFromCrops = (a, b) => page.evaluate(async ([x, y]) => {
    const load = (d) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + d; });
    const [ia, ib] = await Promise.all([load(x), load(y)]);
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
    const A = mean(ia), B = mean(ib), la = L(A), lb = L(B);
    return { unfocused: A.map((v) => +v.toFixed(1)), focused: B.map((v) => +v.toFixed(1)), ratio: +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(3) };
}, [fs.readFileSync(a).toString("base64"), fs.readFileSync(b).toString("base64")]);

R.focus_contrast_chromium_light = await contrastFromCrops(`${OUT}/focus-chromium-light-before.png`, `${OUT}/focus-chromium-light-after.png`);
R.focus_contrast_chromium_dark = await contrastFromCrops(`${OUT}/focus-chromium-dark-before.png`, `${OUT}/focus-chromium-dark-after.png`);

// (2) composited contrast of the toolbar count line
const countBox = await page.evaluate(() => {
    const s = [...document.querySelectorAll("span")].find((x) => /^\d+ users?$/.test(x.textContent.trim()));
    const r = s.getBoundingClientRect();
    return { x: Math.floor(r.x) - 4, y: Math.floor(r.y) - 4, width: Math.ceil(r.width) + 8, height: Math.ceil(r.height) + 8, color: getComputedStyle(s).color, size: getComputedStyle(s).fontSize, weight: getComputedStyle(s).fontWeight };
});
const countShot = await page.screenshot({ clip: countBox });
fs.writeFileSync(`${OUT}/count-line.png`, countShot);
R.count_line_contrast = await page.evaluate(async ([d, meta]) => {
    const load = (x) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + x; });
    const img = await load(d);
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const px = g.getImageData(0, 0, c.width, c.height).data;
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const L = (r, gg, b) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
    let darkest = [255, 255, 255], dl = 2, lightest = [0, 0, 0], ll = -1;
    const lums = [];
    for (let i = 0; i < px.length; i += 4) {
        const l = L(px[i], px[i + 1], px[i + 2]); lums.push(l);
        if (l < dl) { dl = l; darkest = [px[i], px[i + 1], px[i + 2]]; }
        if (l > ll) { ll = l; lightest = [px[i], px[i + 1], px[i + 2]]; }
    }
    lums.sort((a, b) => a - b);
    const bgL = lums[Math.floor(lums.length * 0.9)]; // background dominates the crop
    return {
        declaredColor: meta.color, fontSize: meta.size, weight: meta.weight,
        darkestPixel: darkest, lightestPixel: lightest,
        inkVsPlateRatio: +(((bgL + 0.05) / (dl + 0.05))).toFixed(2),
        note: "darkest ink pixel vs the 90th-percentile (plate) luminance in the crop",
    };
}, [countShot.toString("base64"), countBox]);

// (3) EmptyState species on the Admin route (zero-row)
await page.route((u) => { try { return new URL(u).pathname === "/admin/users"; } catch { return false; } },
    (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) }));
await page.evaluate(() => location.reload());
await page.waitForTimeout(4500);
R.empty_state_species = await page.evaluate(() => {
    const trio = document.querySelector('[data-slot="empty-state-trio"]');
    const dots = trio ? [...trio.children] : [];
    return {
        trioPresentOnAdminRoute: !!trio,
        dotCount: dots.length,
        ariaHidden: trio?.getAttribute("aria-hidden") ?? null,
        dotColorSource: dots[0] ? (dots[0].getAttribute("style") || dots[0].outerHTML.slice(0, 160)) : null,
        accentLive: getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
        eyebrow: [...document.querySelectorAll("p")].map((p) => p.textContent.trim()).find((t) => /roster/i.test(t)) ?? null,
        statusRole: document.querySelector('[role="status"]') ? true : false,
        refreshEnabled: !([...document.querySelectorAll("button")].find((b) => /Refresh/.test(b.textContent))?.disabled),
        pruneDisabled: [...document.querySelectorAll("button")].find((b) => /Prune/.test(b.textContent))?.disabled,
    };
});
await page.screenshot({ path: `${OUT}/J-empty-admin-plate.png` });

await ctx.close();
await browser.close();
fs.writeFileSync(`${DIR}/probe-D3d.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
