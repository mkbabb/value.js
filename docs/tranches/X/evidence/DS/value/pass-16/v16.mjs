#!/usr/bin/env node
// X-DS · value · pass 16 (critic V16, 2026-10-16) — the dialog and admin cells, framed after the cure.
//   1. DIALOGS (V16-01/06): the admin "Delete all palettes?" confirm and Browse's "Report palette",
//      opened in both schemes at 1440 and 390. Ink contrast is READ OFF THE FRAME (the critic's
//      instrument): each element's ground is the median-luminance pixel of its own box, its ink the
//      pixel that contrasts most with that ground; WCAG ratio. Title family + case are recorded.
//   2. ADMIN (V16-02..05/08): Flagged, Audit log, Names and Tags framed; computed text-transform /
//      letter-spacing / font-variant on the data strings; the flagged count's idiom; the Names
//      strip's track / tab / indicator boxes; the Audit toolbar's count + Refresh positions.
// Real Chrome, new headless (§0ei); one browser per cell, closed in finally.
// usage: node v16.mjs [--base http://localhost:9011] [--only dialogs|admin]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture, NOW } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9011");
const ONLY = opt("only", "");
const OUT = import.meta.dirname;
const out = { base: BASE, dialogs: [], admin: [] };

const pal = (slug, name, userSlug) => ({
    name, slug, userSlug, colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#16a34a", position: 2 }],
    tags: ["moody"], createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 3, visibility: "public", tier: "standard", published: true,
});
const DATA = {
    users: [
        { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
        { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    ],
    flagged: [
        { paletteSlug: "sunset-riot-9a3f", palette: pal("sunset-riot-9a3f", "Sunset Riot", "crimson-owl-77"), flagCount: 2,
          flags: [{ reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW }, { reporterSlug: "x", reason: "offensive", detail: "harsh clash", createdAt: NOW }] },
        { paletteSlug: "neon-haze-1b2c", palette: null, flagCount: 1, flags: [{ reporterSlug: "crimson-owl-77", reason: "duplicate", createdAt: NOW }] },
    ],
    audit: [
        { id: "a1", timestamp: NOW, action: "palette.feature", target: "sunset-riot-9a3f", actorSlug: "azure-fox-01" },
        { id: "a2", timestamp: NOW, action: "user.delete", target: "spammer-42" },
        { id: "a3", timestamp: NOW, action: "flag.dismiss", target: "neon-haze-1b2c", actorSlug: "crimson-owl-77" },
    ],
    queue: [
        { id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "azure-fox-01", createdAt: NOW },
        { id: "c2", name: "Field Floor", css: "oklch(0.74 0.06 120)", status: "proposed", contributor: "crimson-owl-77", createdAt: NOW },
    ],
    tags: [
        { id: "t1", name: "moody", category: "mood", createdAt: NOW },
        { id: "t2", name: "pastel", category: "tone", createdAt: NOW },
        { id: "t3", name: "duotone", category: "structure", createdAt: NOW },
    ],
    userPalettes: [pal("azure-one-11aa", "Azure One", "azure-fox-01")],
};

async function seedAdmin(page) {
    await page.addInitScript((d) => {
        try { localStorage.setItem("palette-admin-token", "test-admin-token"); } catch {}
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
                const p = u.pathname;
                if (p.startsWith("/admin/tags")) return json(d.tags);
                if (p.startsWith("/admin/users/") && p.includes("/palettes")) return json(d.userPalettes);
                if (p.startsWith("/admin/users")) return json(pg(d.users));
                if (p.startsWith("/admin/flagged")) return json(pg(d.flagged));
                if (p.startsWith("/admin/audit")) return json(pg(d.audit));
                if (p.startsWith("/admin/queue")) return json(pg(d.queue));
                return json(pg([]));
            }
            return real(input, init);
        };
    }, DATA);
}

/** Per-element pixel contrast inside a clip of the frame. */
async function pixelRows(page, rootSel, items) {
    const root = await page.locator(rootSel).first().boundingBox();
    if (!root) return null;
    const clip = { x: Math.max(0, root.x), y: Math.max(0, root.y), width: root.width, height: root.height };
    const png = (await page.screenshot({ clip })).toString("base64");
    const rects = await page.evaluate(({ rootSel, items }) => {
        const root = document.querySelector(rootSel);
        return items.map(([name, sel]) => {
            const e = sel.startsWith("text=")
                ? [...(root?.querySelectorAll("button") ?? [])].find((b) => b.textContent.trim() === sel.slice(5))
                : root?.querySelector(sel);
            if (!e) return { name, rect: null };
            const b = e.getBoundingClientRect();
            const cs = getComputedStyle(e);
            return { name, rect: b.width ? { x: b.x, y: b.y, w: b.width, h: b.height } : null, color: cs.color, family: cs.fontFamily.split(",")[0], transform: cs.textTransform, text: (e.textContent || e.getAttribute("placeholder") || "").trim().slice(0, 40) };
        });
    }, { rootSel, items });
    const rows = await page.evaluate(async ({ png, clip, rects }) => {
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
        return rects.map((r) => {
            if (!r.rect) return { ...r, ratio: null };
            const x0 = Math.max(0, Math.floor((r.rect.x - clip.x) * sx)), y0 = Math.max(0, Math.floor((r.rect.y - clip.y) * sx));
            const x1 = Math.min(img.width, Math.ceil((r.rect.x + r.rect.w - clip.x) * sx)), y1 = Math.min(img.height, Math.ceil((r.rect.y + r.rect.h - clip.y) * sx));
            const all = [];
            for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) all.push(px(x, y));
            if (!all.length) return { ...r, ratio: null };
            const sorted = [...all].sort((a, b) => lum(a) - lum(b));
            const ground = sorted[Math.floor(sorted.length / 2)];
            let top = ground, topR = 1;
            for (const c of all) { const q = ratio(c, ground); if (q > topR) { topR = q; top = c; } }
            return { name: r.name, text: r.text, family: r.family, transform: r.transform, color: r.color, ground: `rgb(${ground.join(",")})`, ink: `rgb(${top.join(",")})`, ratio: Math.round(topR * 100) / 100 };
        });
    }, { png, clip, rects });
    const tokens = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        const dlg = document.querySelector('[role="dialog"]');
        return {
            modalPrimary: cs.getPropertyValue("--ink-modal-primary").trim(),
            modalAccent: cs.getPropertyValue("--ink-modal-accent").trim(),
            modalDestructive: cs.getPropertyValue("--ink-modal-destructive").trim(),
            modalMuted: cs.getPropertyValue("--ink-modal-muted").trim(),
            floatingPrimary: cs.getPropertyValue("--ink-floating-primary").trim(),
            dialogClass: dlg ? String(dlg.className).split(" ").filter((c) => /glass|floating/.test(c)).join(" ") : null,
            dialogForeground: dlg ? getComputedStyle(dlg).getPropertyValue("--foreground").trim() : null,
            dialogBg: dlg ? getComputedStyle(dlg).backgroundColor : null,
        };
    });
    return { rows, tokens };
}

const DLG = '[role="dialog"]';
const CONFIRM_ITEMS = [["title", "h2"], ["body", "p"], ["slug", ".slug-pill"], ["cancel", "text=Cancel"], ["confirm", "text=Delete all palettes"]];
const REPORT_ITEMS = [["title", "h2"], ["body", "p"], ["option-1", "label[for^='reason-']"], ["option-last", "div:last-child > label[for^='reason-']"], ["textarea", "textarea"], ["cancel", "text=Cancel"], ["report", "text=Report"]];

async function cell(theme, width, fn) {
    let browser;
    try {
        browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
        const page = await newPage(browser, width, theme);
        return await fn(page);
    } catch (e) {
        return { error: String(e).slice(0, 400) };
    } finally {
        try { await browser?.close(); } catch {}
    }
}

const typeOf = (sel) => [...document.querySelectorAll(sel)].map((e) => {
    const cs = getComputedStyle(e);
    return { text: e.textContent.trim().slice(0, 40), transform: cs.textTransform, tracking: cs.letterSpacing, variant: cs.fontVariantCaps, family: cs.fontFamily.split(",")[0], bg: cs.backgroundColor };
});

for (const theme of ["light", "dark"]) {
    for (const width of [1440, 390]) {
        if (ONLY !== "admin") {
            out.dialogs.push({ theme, width, kind: "admin-confirm", ...(await cell(theme, width, async (page) => {
                await seedAdmin(page);
                await bootRoute(page, BASE + "/#/admin/users");
                await page.getByRole("heading", { name: "Users" }).first().waitFor({ timeout: 60_000 });
                await page.getByRole("button", { name: "Delete all palettes of azure-fox-01", exact: true }).filter({ visible: true }).first().click();
                await page.locator(DLG).first().waitFor({ timeout: 30_000 });
                await page.waitForTimeout(1200);
                const file = `admin-confirm-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, file) });
                return { file, ...(await pixelRows(page, DLG, CONFIRM_ITEMS)) };
            })) });
            out.dialogs.push({ theme, width, kind: "report", ...(await cell(theme, width, async (page) => {
                await routeBrowseFixture(page);
                await bootRoute(page, BASE + "/#/browse", { waitArticle: true });
                await page.locator("main").getByRole("button", { name: "Palette menu" }).filter({ visible: true }).first().click();
                await page.getByRole("menuitem", { name: /Report/ }).click();
                await page.locator(DLG).first().waitFor({ timeout: 30_000 });
                await page.waitForTimeout(1200);
                const file = `report-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, file) });
                return { file, ...(await pixelRows(page, DLG, REPORT_ITEMS)) };
            })) });
        }
        if (ONLY !== "dialogs") {
            out.admin.push({ theme, width, ...(await cell(theme, width, async (page) => {
                await seedAdmin(page);
                const rec = {};
                // V16-07 (banked V2C-15): the Users card's resting header veil, framed for the owner's ask.
                await bootRoute(page, BASE + "/#/admin/users");
                await page.getByText("crimson-owl-77").first().waitFor({ timeout: 60_000 });
                rec.usersFile = `admin-users-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, rec.usersFile) });
                await page.goto(BASE + "/#/admin/flagged", { waitUntil: "load" });
                await page.getByText("Sunset Riot").first().waitFor({ timeout: 60_000 });
                await page.waitForTimeout(800);
                rec.flaggedFile = `admin-flagged-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, rec.flaggedFile) });
                rec.flagged = await page.evaluate((src) => {
                    const typeOf = new Function("sel", `return (${src})(sel)`);
                    return {
                        mono: typeOf("main .text-mono-small, main .text-mono-caption, main .badge-atom"),
                        counts: [...document.querySelectorAll("main [title$=' report'], main [title$=' reports']")].map((e) => ({ text: e.textContent.trim(), title: e.title, color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor })),
                        captionUtil: document.querySelectorAll("main .text-mono-caption").length,
                    };
                }, typeOf.toString());

                await page.goto(BASE + "/#/admin/audit", { waitUntil: "load" });
                await page.getByText("palette.feature").first().waitFor({ timeout: 60_000 });
                await page.waitForTimeout(800);
                rec.auditFile = `admin-audit-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, rec.auditFile) });
                rec.audit = await page.evaluate((src) => {
                    const typeOf = new Function("sel", `return (${src})(sel)`);
                    const box = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x * 10) / 10, y: Math.round(b.y * 10) / 10, w: Math.round(b.width * 10) / 10, h: Math.round(b.height * 10) / 10 }; };
                    const refresh = document.querySelector('[aria-label="Refresh audit log"]');
                    const count = [...document.querySelectorAll("main span.text-mono-small")].find((e) => /entr(y|ies)$/.test(e.textContent.trim()));
                    const filters = [...document.querySelectorAll('main input[aria-label^="Filter by"]')].map(box);
                    const actors = [...document.querySelectorAll("[data-audit-actor]")].map((e) => ({ text: e.textContent.trim(), clipped: e.scrollWidth > e.clientWidth + 1 }));
                    return { chips: typeOf("main .badge-atom"), refresh: box(refresh), count: box(count), filters, actors };
                }, typeOf.toString());

                await page.goto(BASE + "/#/admin/names", { waitUntil: "load" });
                await page.getByRole("tablist").first().waitFor({ timeout: 60_000 });
                await page.waitForTimeout(1200);
                rec.namesFile = `admin-names-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, rec.namesFile) });
                rec.names = await page.evaluate(() => {
                    const tl = document.querySelector("main [role=tablist]");
                    const b = (e) => { const r = e.getBoundingClientRect(); return { top: Math.round(r.top * 10) / 10, bottom: Math.round(r.bottom * 10) / 10 }; };
                    const tabs = [...tl.querySelectorAll("[role=tab]")];
                    const ind = [...tl.querySelectorAll("*")].filter((e) => getComputedStyle(e).position === "absolute" && !e.closest("[role=tab]") && e.getBoundingClientRect().width > 10);
                    return { family: getComputedStyle(tabs[0]).fontFamily.split(",")[0], track: b(tl), tabs: tabs.map(b), indicator: ind.map(b), labels: tabs.map((t) => t.textContent.trim()) };
                });

                await page.goto(BASE + "/#/admin/tags", { waitUntil: "load" });
                await page.getByText("duotone").first().waitFor({ timeout: 60_000 });
                await page.waitForTimeout(800);
                rec.tagsFile = `admin-tags-${width}-${theme}.png`;
                await page.screenshot({ path: path.join(OUT, rec.tagsFile) });
                rec.tags = await page.evaluate(() => [...document.querySelectorAll('main [aria-label^="Delete tag"]')].map((x) => {
                    const chip = x.parentElement; const cs = getComputedStyle(chip);
                    return { text: chip.textContent.trim(), border: cs.borderTopWidth, bg: cs.backgroundColor, family: cs.fontFamily.split(",")[0], size: cs.fontSize };
                }));
                rec.cardChip = null;
                return rec;
            })) });
        }
    }
}
fs.writeFileSync(path.join(OUT, ONLY ? `v16-${ONLY}.json` : "v16.json"), JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
