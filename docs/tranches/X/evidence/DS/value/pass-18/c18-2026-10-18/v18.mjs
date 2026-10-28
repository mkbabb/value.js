#!/usr/bin/env node
// X-DS · value · pass 18 cure (critic V18C, 2026-10-18) — the witnesses, read off the frame.
//   V18C-01: every admin gold site (the dock's view trigger glyph, the admin trigger's shield and
//     its word, the collapsed seal, the view menu's Admin row) on the default ground AND on the
//     owner-brown band (lab(38% 32 24), the e2e census referent). Per site: the frame ratio (ground =
//     the median pixel of the site's box, ink = the most contrasting pixel), and the PAINTED ink's
//     oklch (the computed colour). Pass: hue within ±10° of 84.2 and C ≥ 0.0588 (the code's hold;
//     the critic's 0.06 is recorded per site as critic06), or, for a WORD
//     only, the named plate-ink fallback (C < 0.03). FALSIFIER: the pass-17 band gold on the brown
//     band (the receipt's carry, oklch(0.9995 0.0005 84.2)) injected in the same page reads RED.
//   V18C-02: the error plate's alert glyph (/#/nope, and the admin tags panel's error plate) read
//     off the frame against the 3:1 graphics floor. FALSIFIER: the old rule (glass's raw
//     --destructive at 80 %) injected in the same page.
//   V18C-03: each admin console has exactly ONE visible <h1> inside <main>, and it is the pane
//     title (id route-title, text = the view label).
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node v18.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, browsePalettes, newPage, NOW, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9481";
const OUT = import.meta.dirname;
const OWNER = "space=lab&color=" + encodeURIComponent("lab(38% 32 24)");
const P17_BAND_GOLD = "oklch(0.9995 0.0005 84.2)";
const GOLD_RULE = `.gold-ink, svg.gold-ink, .gold-ink svg { color: ${P17_BAND_GOLD} !important; }`;
const out = { base: BASE, cells: [], admin: [] };

const DATA = {
    users: [
        { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
        { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    ],
};

async function seedAdmin(page, { failTags = false } = {}) {
    await page.addInitScript(({ d, failTags }) => {
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
                // /admin/tags answers a bare Tag[]; the paged shape there is the critic's framed
                // error-boundary plate ("tags.value is not iterable"), the V18C-02 admin cell.
                if (u.pathname.startsWith("/admin/tags")) return json(failTags ? pg([]) : []);
                if (u.pathname.startsWith("/admin/users")) return json(pg(d.users));
                return json(pg([]));
            }
            return real(input, init);
        };
    }, { d: DATA, failTags });
}

// A site is a selector, optionally "|text" (an element whose own text is that) or "@text" (the box
// of the element's TEXT NODE alone, so a word is read without the glyph beside it).
const SITES = {
    viewTrigger: ".view-select-trigger svg",
    adminShield: '[data-o18="admin-trigger"] svg',
    adminWord: '[data-o18="admin-trigger"]@admin',
    seal: ".dock-seal-ink",
    menuAdminIcon: '[role="option"] svg.gold-ink',
    menuAdminLabel: '[role="option"] span.gold-ink',
    alertGlyph: '[role="alert"] svg',
    featuredGlyph: ".featured-badge__icon",
};

async function readSites(page, names) {
    const rects = await page.evaluate(({ sites, names }) => names.map((name) => {
        const spec = sites[name];
        const [sel, text] = spec.includes("@") ? spec.split("@") : spec.split("|");
        const byNode = spec.includes("@");
        const vis = [...document.querySelectorAll(sel)].find((e) => {
            if (text && !byNode && e.textContent.trim() !== text) return false;
            const r = e.getBoundingClientRect();
            return r.width > 2 && r.height > 2 && r.right > 0 && r.left < innerWidth && getComputedStyle(e).visibility !== "hidden";
        });
        if (!vis) return { name, rect: null };
        let r = vis.getBoundingClientRect();
        if (byNode) {
            const walker = document.createTreeWalker(vis, NodeFilter.SHOW_TEXT);
            let n;
            while ((n = walker.nextNode())) if (n.textContent.trim() === text) break;
            if (!n) return { name, rect: null };
            const range = document.createRange();
            range.selectNodeContents(n);
            r = range.getBoundingClientRect();
        }
        const cs = getComputedStyle(vis);
        return { name, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, color: cs.color };
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
        // sRGB -> OKLCh (Ottosson), for the painted pixel's hue and chroma
        const oklchOf = ([r8, g8, b8]) => {
            const [r, gg, b] = [lin(r8), lin(g8), lin(b8)];
            const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * gg + 0.0514459929 * b);
            const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * gg + 0.1073969566 * b);
            const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * gg + 0.6299787005 * b);
            const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
            const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
            const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
            const C = Math.hypot(A, B);
            return { L: +L.toFixed(3), C: +C.toFixed(3), H: C < 1e-4 ? null : +(((Math.atan2(B, A) * 180) / Math.PI + 360) % 360).toFixed(1) };
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
            return { name: r.name, found: true, color: r.color, ground: `rgb(${ground.join(",")})`, ink: `rgb(${ink.join(",")})`, inkOklch: oklchOf(ink), ratio: Math.round(top * 100) / 100 };
        });
    }, { png, rects });
}

/** The painted ink's own oklch (the computed colour; Chrome serialises an oklch() token as oklch). */
function paintedOklch(css) {
    const m = /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/.exec(css || "");
    if (!m) return null;
    return { L: +m[1] / (m[2] ? 100 : 1), C: +m[3], H: +m[4] };
}
const isWord = (name) => /Word|Label/.test(name);
function judgeGold(site) {
    if (!site.found) return { ...site, verdict: "absent" };
    const ok = paintedOklch(site.color);
    if (!ok) return { ...site, painted: null, verdict: "UNPARSED" };
    // the chroma bar is the code's own hold (ink.ts IDENTITY_CHROMA_HOLD 0.4 x gold's 0.147 = 0.0588);
    // the critic asked C >= 0.06, and every site but the featured badge's unchanged pass-17 bronze
    // (0.0597) clears that too: `critic06` records it per site.
    const gold = ok.C >= 0.0588 && Math.abs(ok.H - 84.2) <= 10;
    site.critic06 = ok.C >= 0.06;
    const fallback = isWord(site.name) && ok.C < 0.03;
    return { ...site, painted: ok, verdict: gold ? "GOLD" : fallback ? "PLATE-INK-FALLBACK" : "RED" };
}

async function inject(page, rule, fn) {
    const handle = await page.addStyleTag({ content: rule });
    await page.waitForTimeout(400);
    try { return await fn(); } finally { await handle.evaluate((n) => n.remove()); await page.waitForTimeout(300); }
}

const tokens = (page) => page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const host = document.querySelector(".glass-dock")?.parentElement;
    const hs = host ? getComputedStyle(host) : null;
    return {
        rootInkGold: root.getPropertyValue("--ink-gold").trim(),
        inkGoldFloating: root.getPropertyValue("--ink-gold-floating").trim(),
        rootInkGoldGlyph: root.getPropertyValue("--ink-gold-glyph").trim(),
        inkGoldFloatingGlyph: root.getPropertyValue("--ink-gold-floating-glyph").trim(),
        sealInkGold: root.getPropertyValue("--seal-ink-gold").trim(),
        dockInkGold: hs ? hs.getPropertyValue("--ink-gold").trim() : null,
        dockInkGoldGlyph: hs ? hs.getPropertyValue("--ink-gold-glyph").trim() : null,
        inkDestructive: root.getPropertyValue("--ink-destructive").trim(),
        dockCollapsed: !!document.querySelector(".glass-dock.collapsed"),
    };
});

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    // ── V18C-01: the gold, default ground and owner brown ──
    for (const theme of ["light", "dark"]) {
        for (const [ground, query, widths] of [["default", "", [1440, 390]], ["owner-brown", "?" + OWNER, [1440]]]) {
            for (const width of widths) {
                const page = await newPage(browser, width, theme);
                const cell = { cell: ground === "default" ? "admin-users" : "admin-users-brown", theme, width };
                try {
                    await seedAdmin(page);
                    await bootRoute(page, BASE + "/#/admin/users" + query);
                    await page.getByText("crimson-owl-77").first().waitFor({ timeout: 60_000 });
                    await page.waitForTimeout(800);
                    cell.file = `${cell.cell}-${width}-${theme}.png`;
                    await page.screenshot({ path: path.join(OUT, cell.file) });
                    const names = ["viewTrigger", "adminShield", "adminWord"];
                    cell.after = (await readSites(page, names)).map(judgeGold);
                    cell.tokens = await tokens(page);
                    if (ground === "owner-brown") cell.pass17Rule = (await inject(page, GOLD_RULE, () => readSites(page, names))).map(judgeGold);
                    // the collapsed seal (desktop only: the mobile dock does not idle shut)
                    if (width === 1440) {
                        const db = await page.locator(".glass-dock").first().boundingBox();
                        if (db) { await page.mouse.move(db.x + 3, db.y + db.height / 2); await page.waitForTimeout(400); }
                        await page.mouse.move(width - 4, 896);
                        await page.locator(".glass-dock.collapsed").first().waitFor({ timeout: 12_000 }).catch(() => {});
                        await page.waitForTimeout(1500);
                        if (await page.locator(".glass-dock.collapsed").count()) {
                            cell.sealFile = `${cell.cell.replace("users", "seal")}-${width}-${theme}.png`;
                            await page.screenshot({ path: path.join(OUT, cell.sealFile) });
                            cell.seal = (await readSites(page, ["seal"])).map(judgeGold);
                        } else cell.seal = "the dock did not idle shut within 12 s";
                    }
                } catch (e) {
                    cell.error = String(e).slice(0, 400);
                } finally {
                    await page.context().close();
                }
                out.cells.push(cell);
            }
        }
        // the floating twin: the view menu's Admin row, over the picker
        const p2 = await newPage(browser, 1440, theme);
        const cell = { cell: "admin-view-menu", theme, width: 1440 };
        try {
            await seedAdmin(p2);
            await bootRoute(p2, BASE + "/#/");
            if (await p2.locator(".glass-dock.collapsed").count()) await p2.locator(".glass-dock").first().click();
            await p2.getByRole("combobox", { name: "Select view" }).click();
            await p2.locator('[role="option"]', { hasText: "Admin" }).first().waitFor({ timeout: 30_000 });
            await p2.waitForTimeout(900);
            cell.file = `admin-view-menu-1440-${theme}.png`;
            await p2.screenshot({ path: path.join(OUT, cell.file) });
            cell.after = (await readSites(p2, ["menuAdminIcon", "menuAdminLabel"])).map(judgeGold);
            cell.tokens = await tokens(p2);
        } catch (e) {
            cell.error = String(e).slice(0, 400);
        } finally {
            await p2.context().close();
        }
        out.cells.push(cell);
    }

    // ── V18C-01, the resting twin's glyph rung: the featured badge's mark on Browse ──
    browsePalettes[0].tier = "featured";
    browsePalettes[3].tier = "featured";
    for (const theme of ["light", "dark"]) {
        const page = await newPage(browser, 1440, theme);
        const cell = { cell: "browse-featured", theme, width: 1440 };
        try {
            await routeBrowseFixture(page);
            await bootRoute(page, BASE + "/#/browse");
            await page.locator(".featured-badge__icon").first().waitFor({ timeout: 60_000 });
            await page.waitForTimeout(800);
            cell.file = `browse-featured-1440-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, cell.file) });
            cell.after = (await readSites(page, ["featuredGlyph"])).map((r) => judgeGold(r));
            cell.tokens = await tokens(page);
        } catch (e) {
            cell.error = String(e).slice(0, 400);
        } finally {
            await page.context().close();
        }
        out.cells.push(cell);
    }

    // ── V18C-02: the error plate's alert glyph ──
    const rawRule = (raw) => `[role="alert"] svg { color: color-mix(in srgb, ${raw} 80%, transparent) !important; }`;
    const rawDestructive = (page) => page.evaluate(() => {
        const s = document.createElement("span");
        s.style.color = "var(--destructive)";
        document.body.appendChild(s);
        const c = getComputedStyle(s).color;
        s.remove();
        return c;
    });
    for (const theme of ["light", "dark"]) {
        for (const [name, url, widths, seed] of [["notfound", "/#/nope", [1440, 390], false], ["admin-tags-error", "/#/admin/tags", [1440], true]]) {
            for (const width of widths) {
                const page = await newPage(browser, width, theme);
                const cell = { cell: name, theme, width };
                try {
                    if (seed) await seedAdmin(page, { failTags: true });
                    await bootRoute(page, BASE + url, { allowAlert: true });
                    await page.locator('[role="alert"] svg').first().waitFor({ timeout: 60_000 });
                    await page.waitForTimeout(800);
                    cell.file = `${name}-${width}-${theme}.png`;
                    await page.screenshot({ path: path.join(OUT, cell.file) });
                    cell.after = await readSites(page, ["alertGlyph"]);
                    cell.raw = await rawDestructive(page);
                    cell.oldRule = await inject(page, rawRule(cell.raw), () => readSites(page, ["alertGlyph"]));
                    cell.tokens = await tokens(page);
                    cell.verdict = cell.after[0]?.found && cell.after[0].ratio >= 3 ? "GREEN" : "RED";
                    cell.oldVerdict = cell.oldRule[0]?.found && cell.oldRule[0].ratio >= 3 ? "GREEN" : "RED";
                } catch (e) {
                    cell.error = String(e).slice(0, 400);
                } finally {
                    await page.context().close();
                }
                out.cells.push(cell);
            }
        }
    }

    // ── V18C-03: one visible H1 per admin console ──
    for (const [sub, label] of [["users", "Users"], ["names", "Names"], ["flagged", "Flagged"], ["tags", "Tags"], ["audit", "Audit log"]]) {
        for (const width of [1440, 390]) {
            for (const theme of ["light", "dark"]) {
                if (theme === "dark" && sub !== "users") continue;
                const page = await newPage(browser, width, theme);
                const row = { route: `/#/admin/${sub}`, width, theme, label };
                try {
                    await seedAdmin(page);
                    await bootRoute(page, BASE + row.route);
                    await page.waitForTimeout(800);
                    row.file = `admin-${sub}-${width}-${theme}.png`;
                    if (sub !== "users") await page.screenshot({ path: path.join(OUT, row.file) });
                    else row.file = `admin-users-${width}-${theme}.png (shot above)`;
                    Object.assign(row, await page.evaluate(() => {
                        const main = document.querySelector("main");
                        const h1s = [...(main?.querySelectorAll("h1") ?? [])].filter((h) => {
                            const r = h.getBoundingClientRect();
                            return r.width > 0 && r.height > 0 && getComputedStyle(h).visibility !== "hidden";
                        });
                        return {
                            visibleH1: h1s.length,
                            h1: h1s.map((h) => ({ id: h.id, text: h.textContent.trim(), px: parseFloat(getComputedStyle(h).fontSize), cls: h.className.slice(0, 60) })),
                            caption: !!document.querySelector("h1.route-title"),
                            labelledBy: main?.getAttribute("aria-labelledby") ?? null,
                        };
                    }));
                    row.verdict = row.visibleH1 === 1 && row.h1[0].id === "route-title" && row.h1[0].text === label && !row.caption ? "GREEN" : "RED";
                } catch (e) {
                    row.error = String(e).slice(0, 400);
                } finally {
                    await page.context().close();
                }
                out.admin.push(row);
            }
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "v18.json"), JSON.stringify(out, null, 2) + "\n");
const fmt = (rows) => (rows ?? []).map((r) => `${r.name}=${r.found ? `${r.ratio} ${r.verdict ?? ""} ${r.painted ? `C${r.painted.C.toFixed(3)} h${r.painted.H.toFixed(1)}` : ""}` : "-"}`).join(" ");
for (const c of out.cells) {
    console.log(c.cell, c.width, c.theme, c.error ?? "", fmt(c.after), c.verdict ?? "",
        c.pass17Rule ? "| p17: " + fmt(c.pass17Rule) : "", Array.isArray(c.seal) ? "| seal: " + fmt(c.seal) : (c.seal ?? ""),
        c.oldRule ? `| old: ${fmt(c.oldRule)} ${c.oldVerdict}` : "");
}
for (const a of out.admin) console.log(a.route, a.width, a.theme, a.error ?? "", a.visibleH1, JSON.stringify(a.h1), "caption", a.caption, a.verdict);
