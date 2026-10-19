#!/usr/bin/env node
// X-DS · value · pass 17 cure (critic V17C, 2026-10-18) — the admin gold cells, framed after the cure.
//   V17C-01: the admin identity gold is read OFF THE FRAME (the critic's instrument): for each
//   glyph or label, the ground is the median-luminance pixel of its own box and the ink the pixel
//   that contrasts most with it; WCAG ratio. Sites: the dock's view trigger icon, the profile
//   admin trigger (desktop), the collapsed seal glyph (where the dock is collapsed), and the view
//   menu's "Admin" row icon and label (on the floating plate). The painted ink's hue is recorded
//   (the identity leg, §0dm: the hue stays gold, only the lightness walks).
//   FALSIFIER: in the same page, the OLD rule (`.gold-ink { color: var(--color-gold) }`) is
//   injected and every site re-read; it must be RED (the critic read 1.09:1 on the light dock).
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node v17.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, NOW, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9471";
const OUT = import.meta.dirname;
const OLD_RULE = ".gold-ink { color: var(--color-gold) !important; }";
const out = { base: BASE, oldRule: OLD_RULE, cells: [] };

const DATA = {
    users: [
        { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
        { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    ],
};

async function seedAdmin(page) {
    await page.addInitScript((d) => {
        try {
            for (const k of ["palette-user-slug", "palette-user-token", "palette-session-token"]) localStorage.removeItem(k);
            localStorage.setItem("palette-admin-token", "test-admin-token");
        } catch {}
        const real = window.fetch.bind(window);
        const json = (b) => Promise.resolve(new Response(JSON.stringify(b), { status: 200, headers: { "content-type": "application/json" } }));
        const pg = (data) => ({ data, total: data.length, limit: 50, offset: 0 });
        window.fetch = (input, init) => {
            const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
            const u = new URL(href, location.href);
            const method = (init?.method || (typeof input === "object" && input.method) || "GET").toUpperCase();
            if (u.pathname === "/sessions" && method === "POST") return json({ token: "test-session-token", userSlug: "test-user" });
            if (u.pathname.startsWith("/admin/")) {
                if (method !== "GET") return json({});
                if (u.pathname.startsWith("/admin/users")) return json(pg(d.users));
                return json(pg([]));
            }
            return real(input, init);
        };
    }, DATA);
}

const SITES = {
    viewTrigger: ".view-select-trigger svg",
    adminTrigger: '[data-o18="admin-trigger"]',
    seal: ".dock-seal-ink",
    menuAdminIcon: '[role="option"] svg.gold-ink',
    menuAdminLabel: '[role="option"] span.gold-ink',
    // the neighbouring neutral rows on the same floater (the floating ink pair), for comparison
    menuGenerateLabel: '[role="option"] span|Generate',
    menuGradientLabel: '[role="option"] span|Gradient',
};

/** Read each site's glyph off the frame: ground = median pixel of its box, ink = the most contrasting pixel. */
async function readSites(page, names) {
    const rects = await page.evaluate(({ sites, names }) => names.map((name) => {
        const [sel, text] = sites[name].split("|");
        const vis = [...document.querySelectorAll(sel)].find((e) => {
            if (text && e.textContent.trim() !== text) return false;
            const r = e.getBoundingClientRect();
            return r.width > 2 && r.height > 2 && r.right > 0 && r.left < innerWidth && getComputedStyle(e).visibility !== "hidden";
        });
        if (!vis) return { name, rect: null };
        const r = vis.getBoundingClientRect();
        const cs = getComputedStyle(vis);
        return { name, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, color: cs.color, inkGold: cs.getPropertyValue("--ink-gold").trim() };
    }), { sites: SITES, names });
    const png = (await page.screenshot()).toString("base64");
    return page.evaluate(async ({ png, rects }) => {
        const bin = atob(png), u = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        const img = await createImageBitmap(new Blob([u], { type: "image/png" }));
        const c = new OffscreenCanvas(img.width, img.height), g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, img.width, img.height).data;
        const sx = img.width / innerWidth;
        const px = (x, y) => { const i = (y * img.width + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
        const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
        const lum = ([r, gg, b]) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
        const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        const hue = ([r, gg, b]) => {
            const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), dd = mx - mn;
            if (!dd) return null;
            let h = mx === r ? ((gg - b) / dd) % 6 : mx === gg ? (b - r) / dd + 2 : (r - gg) / dd + 4;
            return Math.round(((h * 60) + 360) % 360);
        };
        return rects.map((r) => {
            if (!r.rect) return { name: r.name, found: false };
            const x0 = Math.max(0, Math.floor(r.rect.x * sx)), y0 = Math.max(0, Math.floor(r.rect.y * sx));
            const x1 = Math.min(img.width, Math.ceil((r.rect.x + r.rect.w) * sx)), y1 = Math.min(img.height, Math.ceil((r.rect.y + r.rect.h) * sx));
            const all = [];
            for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) all.push(px(x, y));
            const sorted = [...all].sort((a, b) => lum(a) - lum(b));
            const ground = sorted[Math.floor(sorted.length / 2)];
            let ink = ground, top = 1;
            for (const p of all) { const q = ratio(p, ground); if (q > top) { top = q; ink = p; } }
            return { name: r.name, found: true, color: r.color, inkGold: r.inkGold, ground: `rgb(${ground.join(",")})`, ink: `rgb(${ink.join(",")})`, inkHue: hue(ink), ratio: Math.round(top * 100) / 100 };
        });
    }, { png, rects });
}

// The floater's own neutral ink at the gold row's spot: does the ROW's ground clear for any certified ink?
const NEUTRAL_RULE = ".gold-ink { color: var(--foreground) !important; }";
async function withOldRule(page, fn, rule = OLD_RULE) {
    const handle = await page.addStyleTag({ content: rule });
    await page.waitForTimeout(400);
    try { return await fn(); } finally { await handle.evaluate((n) => n.remove()); await page.waitForTimeout(300); }
}

const tokens = (page) => page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const dockHost = document.querySelector(".glass-dock")?.parentElement;
    return {
        rootInkGold: root.getPropertyValue("--ink-gold").trim(),
        inkGoldFloating: root.getPropertyValue("--ink-gold-floating").trim(),
        sealInkGold: root.getPropertyValue("--seal-ink-gold").trim(),
        dockInkGold: dockHost ? getComputedStyle(dockHost).getPropertyValue("--ink-gold").trim() : null,
        dockCollapsed: !!document.querySelector(".glass-dock.collapsed"),
    };
});

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    for (const theme of ["light", "dark"]) {
        for (const width of [1440, 390]) {
            // 1. the admin view: trigger glyph, admin trigger, seal (where collapsed)
            const page = await newPage(browser, width, theme);
            try {
                await seedAdmin(page);
                await bootRoute(page, BASE + "/#/admin/users");
                await page.getByText("crimson-owl-77").first().waitFor({ timeout: 60_000 });
                await page.waitForTimeout(800);
                const file = `admin-users-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, file) });
                const names = ["viewTrigger", "adminTrigger", "seal"];
                const after = await readSites(page, names);
                const before = await withOldRule(page, () => readSites(page, names));
                out.cells.push({ cell: "admin-users", theme, width, file, tokens: await tokens(page), after, oldRule: before });
                // the collapsed seal: rest the pointer on the dock, leave, and let it idle shut
                const db = await page.locator(".glass-dock").first().boundingBox();
                if (db) { await page.mouse.move(db.x + 3, db.y + db.height / 2); await page.waitForTimeout(400); }
                await page.mouse.move(width - 4, (width <= 500 ? 844 : 900) - 4);
                await page.locator(".glass-dock.collapsed").first().waitFor({ timeout: 12_000 }).catch(() => {});
                await page.waitForTimeout(1500);
                if (await page.locator(".glass-dock.collapsed").count()) {
                    const sealFile = `admin-seal-${width}-${theme}.png`;
                    await page.screenshot({ path: path.join(OUT, sealFile) });
                    const sAfter = await readSites(page, ["seal"]);
                    const sBefore = await withOldRule(page, () => readSites(page, ["seal"]));
                    out.cells.push({ cell: "admin-seal", theme, width, file: sealFile, tokens: await tokens(page), after: sAfter, oldRule: sBefore });
                } else {
                    out.cells.push({ cell: "admin-seal", theme, width, error: "the dock did not idle shut within 12 s" });
                }
            } catch (e) {
                out.cells.push({ cell: "admin-users", theme, width, error: String(e).slice(0, 400) });
            } finally {
                await page.context().close();
            }
            if (width !== 1440) continue;
            // 2. the view menu, on the app (admin authenticated): the "Admin" row on the floating plate,
            //    over two routes (what shows through the floater differs: the picker's spectrum, Browse's cards)
            for (const [route, hash] of [["picker", "/#/"], ["browse", "/#/browse"]]) {
            const p2 = await newPage(browser, width, theme);
            try {
                await seedAdmin(p2);
                if (route === "browse") await routeBrowseFixture(p2);
                await bootRoute(p2, BASE + hash);
                const dock = p2.locator(".glass-dock").first();
                if (await p2.locator(".glass-dock.collapsed").count()) await dock.click();
                await p2.getByRole("combobox", { name: "Select view" }).click();
                await p2.locator('[role="option"]', { hasText: "Admin" }).first().waitFor({ timeout: 30_000 });
                await p2.waitForTimeout(900);
                const file = route === "picker" ? `admin-view-menu-${width}-${theme}.png` : `admin-view-menu-${route}-${width}-${theme}.png`;
                await p2.screenshot({ path: path.join(OUT, file) });
                const names = ["menuAdminIcon", "menuAdminLabel", "menuGenerateLabel", "menuGradientLabel"];
                const after = await readSites(p2, names);
                const before = await withOldRule(p2, () => readSites(p2, names));
                const neutral = await withOldRule(p2, () => readSites(p2, ["menuAdminIcon", "menuAdminLabel"]), NEUTRAL_RULE);
                out.cells.push({ cell: "admin-view-menu", route, theme, width, file, tokens: await tokens(p2), after, oldRule: before, floatingNeutralAtRow: neutral });
            } catch (e) {
                out.cells.push({ cell: "admin-view-menu", route, theme, width, error: String(e).slice(0, 400) });
            } finally {
                await p2.context().close();
            }
            }
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "v17.json"), JSON.stringify(out, null, 2) + "\n");
for (const c of out.cells) {
    console.log(c.cell, c.route ?? "", c.width, c.theme, c.error ?? "",
        (c.after ?? []).map((r) => `${r.name}=${r.found ? r.ratio + ` (h${r.inkHue})` : "-"}`).join(" "),
        "| old:", (c.oldRule ?? []).map((r) => `${r.name}=${r.found ? r.ratio : "-"}`).join(" "),
        c.floatingNeutralAtRow ? "| neutral@row: " + c.floatingNeutralAtRow.map((r) => `${r.name}=${r.ratio}`).join(" ") : "");
}
