#!/usr/bin/env node
// X-DS · value · pass 14 (critic V14, 2026-10-16) — the two cells no pass had framed (V14-02):
//   1. FEATURED: /#/browse on the harness wall (Neon Arcade is tier "featured"). Reads the
//      featured badge's running animations (V14-01 item 1 / V9C-03: the glass .gold-shimmer
//      sweep was an idle infinite loop), its ink, border and background-image, and frames the
//      wall (featured-{1440,390}-{light,dark}.png).
//   2. ADMIN: an authed admin cell. A held admin token is seeded in localStorage
//      ("palette-admin-token", the e2e admin-auth fixture's seam) and every /admin/* GET is
//      answered in-page with a shape-correct envelope (two users). Frames /#/admin/users
//      (admin-users-{1440,390}-{light,dark}.png) with the dock's gold admin ink, then opens the
//      dock's view menu at 1440 to frame its Admin entry (admin-view-menu-1440-{theme}.png),
//      and reads the admin ink's running animations.
// Real Chrome, new headless (§0ei); one browser per cell, closed in finally.
// usage: node v14.mjs [--base http://localhost:9011]
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
            const file = `featured-${width}-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, file) });
            out.featured.push({ theme, width, file, badges: badge });
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
            const rec = { theme, width, file, adminInk: ink };
            if (width === 1440) {
                await page.locator('[aria-label="Select view"]').first().click();
                await page.locator('[role="menu"],[role="listbox"]').first().waitFor({ timeout: 30_000 });
                await page.waitForTimeout(800);
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
fs.writeFileSync(path.join(OUT, "v14.json"), JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
