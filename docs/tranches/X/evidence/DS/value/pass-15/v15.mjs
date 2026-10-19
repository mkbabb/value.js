#!/usr/bin/env node
// X-DS · value · pass 15 (V15-01/02/04/05, 2026-10-16) — the featured and admin cells, re-framed
// after the cure, with the badge's PIXEL contrast read off the frame itself (the critic's
// instrument: the census composites a model ground, the frame is the truth):
//   1. FEATURED: /#/browse on the harness wall (Neon Arcade is tier "featured"): the badge's
//      computed inks, then a clip of the badge (padded 6px) is decoded in-page; the plate is the
//      median of the padding ring, the glyph's and label's inks are their most-contrasting
//      pixels, WCAG ratio against the plate (featured-{1440,390}-{light,dark}.png).
//   2. ADMIN: /#/admin/users (two users) — the title carries no count chip, each row's count is
//      the muted numeral with its noun (V15-02); the view menu reads "Audit log" (V15-05).
// Real Chrome, new headless (§0ei); one browser per cell, closed in finally.
// usage: node v15.mjs [--base http://localhost:9011]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture, NOW } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9011");
const OUT = import.meta.dirname;
const out = { base: BASE, featured: [], admin: [] };

const USERS = ["azure-fox-01", "crimson-owl-77"].map((slug, i) => ({
    slug, createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: i + 1,
}));

async function seedAdmin(page) {
    await page.addInitScript((users) => {
        try { localStorage.setItem("palette-admin-token", "test-admin-token"); } catch {}
        const real = window.fetch.bind(window);
        const json = (b) => Promise.resolve(new Response(JSON.stringify(b), { status: 200, headers: { "content-type": "application/json" } }));
        window.fetch = (input, init) => {
            const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
            const u = new URL(href, location.href);
            const method = (init?.method || (typeof input === "object" && input.method) || "GET").toUpperCase();
            if (u.pathname === "/sessions" && method === "POST") return json({ token: "test-session-token", userSlug: "test-user" });
            if (u.pathname.startsWith("/admin/")) {
                if (u.pathname.startsWith("/admin/tags")) return json([]);
                if (u.pathname.startsWith("/admin/users") && !u.pathname.includes("/palettes"))
                    return json({ data: users, total: users.length, limit: 50, offset: 0 });
                if (u.pathname.includes("/palettes")) return json([]);
                return json({ data: [], total: 0, limit: 50, offset: 0 });
            }
            return real(input, init);
        };
    }, USERS);
}

// The badge's pixel contrast, read off a clip of the frame.
async function pixelContrast(page) {
    const box = await page.locator(".featured-badge").first().boundingBox();
    if (!box) return null;
    const pad = 6;
    const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + 2 * pad, height: box.height + 2 * pad };
    const png = (await page.screenshot({ clip })).toString("base64");
    const rects = await page.evaluate(() => {
        const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return b.width ? { x: b.x, y: b.y, w: b.width, h: b.height } : null; };
        return { glyph: r(".featured-badge__icon svg"), label: r(".featured-badge .palette-specimen__yield-3") };
    });
    return page.evaluate(async ({ png, clip, rects, pad }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + png;
        await img.decode();
        const cv = document.createElement("canvas");
        cv.width = img.width; cv.height = img.height;
        const ctx = cv.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const sx = img.width / clip.width;
        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        const px = (x, y) => { const i = (y * img.width + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };
        const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
        const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        const ring = [];
        const p = Math.max(1, Math.floor((pad - 2) * sx));
        for (let x = 0; x < img.width; x++) for (const y of [1, img.height - 2]) ring.push(px(x, y));
        for (let y = 0; y < img.height; y++) for (const x of [1, img.width - 2]) ring.push(px(x, y));
        ring.sort((a, b) => lum(a) - lum(b));
        const plate = ring[Math.floor(ring.length / 2)];
        const best = (r) => {
            if (!r) return null;
            let top = null, topR = 0;
            const x0 = Math.floor((r.x - clip.x) * sx), y0 = Math.floor((r.y - clip.y) * sx);
            for (let y = y0; y < y0 + Math.ceil(r.h * sx); y++) for (let x = x0; x < x0 + Math.ceil(r.w * sx); x++) {
                const c = px(x, y); const q = ratio(c, plate);
                if (q > topR) { topR = q; top = c; }
            }
            return { ink: `rgb(${top.join(",")})`, ratio: Math.round(topR * 100) / 100 };
        };
        return { plate: `rgb(${plate.join(",")})`, glyph: best(rects.glyph), label: best(rects.label), ringPx: p };
    }, { png, clip, rects, pad });
}

const anims = (sel) => {
    const els = [...document.querySelectorAll(sel)];
    return els.map((el) => {
        const all = [el, ...el.querySelectorAll("*")];
        const running = all.flatMap((e) => e.getAnimations().filter((a) => a.playState === "running")
            .map((a) => ({ name: a.animationName || a.constructor.name, iterations: a.effect?.getTiming().iterations })));
        const cs = getComputedStyle(el);
        return { color: cs.color, borderColor: cs.borderTopColor, backgroundImage: cs.backgroundImage, backgroundClip: cs.backgroundClip, running };
    });
};

for (const theme of ["light", "dark"]) {
    for (const width of [1440, 390]) {
        let browser;
        try {
            browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
            const page = await newPage(browser, width, theme);
            await routeBrowseFixture(page);
            await bootRoute(page, BASE + "/#/browse", { waitArticle: true });
            const badge = await page.evaluate(anims, ".featured-badge");
            const pixels = await pixelContrast(page);
            const file = `featured-${width}-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, file) });
            out.featured.push({ theme, width, file, badges: badge, pixels });
        } catch (e) {
            out.featured.push({ theme, width, error: String(e).slice(0, 300) });
        } finally {
            try { await browser?.close(); } catch {}
        }
        try {
            browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
            const page = await newPage(browser, width, theme);
            await seedAdmin(page);
            await bootRoute(page, BASE + "/#/admin/users");
            await page.getByRole("heading", { name: "Users" }).first().waitFor({ timeout: 60_000 });
            const ink = await page.evaluate(anims, ".glass-dock .gold-shimmer-icon");
            const file = `admin-users-${width}-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, file) });
            const counts = await page.evaluate(() => ({
                titleChips: [...document.querySelectorAll("main h1 .badge-atom, main h2 .badge-atom")].length,
                rowCounts: [...document.querySelectorAll("main [title$=' palette'], main [title$=' palettes']")].map((e) => ({ text: e.textContent.trim(), title: e.title, color: getComputedStyle(e).color })),
                toolbar: [...document.querySelectorAll("main span.text-mono-small")].map((e) => e.textContent.trim()).filter((t) => /users?$/.test(t)),
            }));
            const rec = { theme, width, file, adminInk: ink, counts };
            if (width === 1440) {
                await page.locator('[aria-label="Select view"]').first().click();
                await page.locator('[role="menu"],[role="listbox"]').first().waitFor({ timeout: 30_000 });
                await page.waitForTimeout(800);
                rec.menuLabels = await page.evaluate(() => [...document.querySelectorAll('[role="menu"] [role="menuitem"],[role="listbox"] [role="option"]')].map((e) => e.textContent.trim()));
                rec.menuAdminInk = await page.evaluate(anims, '[role="menu"] .gold-shimmer-icon,[role="listbox"] .gold-shimmer-icon');
                rec.menuFile = `admin-view-menu-1440-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, rec.menuFile) });
            }
            out.admin.push(rec);
        } catch (e) {
            out.admin.push({ theme, width, error: String(e).slice(0, 300) });
        } finally {
            try { await browser?.close(); } catch {}
        }
    }
}
fs.writeFileSync(path.join(OUT, "v15.json"), JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
