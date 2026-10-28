// SERVED MODEL: claude-opus-5-5 · SS-8 B12 — PaletteCard record, cells U-5..U-12 (successor surface).
import { launch, cell, openBrowse, routeWall, card, save, palette, installColor, modePixels, EVID, BASE, WALL } from "./lib.mjs";
import { resolve } from "node:path";
const only = process.argv[2] ? process.argv[2].split(",") : null;
const want = (k) => !only || only.includes(k);
const LOCAL = (n) => Array.from({ length: n }, (_, i) => ({ id: `l${i}`, name: `Local ${i}`, slug: `local-${i}`,
    colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"].map((css, position) => ({ css, position })),
    createdAt: "2026-10-19T00:00:00.000Z", updatedAt: "2026-10-19T00:00:00.000Z", isLocal: true, published: false, visibility: "private", tags: [] }));
async function openPalettes(p, n = 4) {
    await p.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s })); } catch {} }, LOCAL(n));
    await p.goto(`${BASE}/#/palettes`, { timeout: 90000 });
    await p.locator('[role="article"].palette-card').first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
}
const LONG = palette("Probe A Considerably Longer Palette Name For Phones", 5);
const WALL2 = [...WALL, LONG];
const out = [];
const b = await launch();
try {
    if (want("u5")) {
        out.push(await cell(b, "PC-U5 D3-5 name width @390 + D3-6 skeleton vs card", { viewport: { width: 390, height: 844 } }, async (p) => {
            await p.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
            await p.route((u) => !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname) && /(^|\/)palettes(\/|$)/.test(u.pathname), async (r) => {
                await new Promise((z) => setTimeout(z, 5000));
                r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: WALL2, nextCursor: null, hasMore: false }) }).catch(() => {});
            });
            await p.goto(`${BASE}/#/browse`, { timeout: 90000 });
            await p.locator(".skeleton-ink-register").first().waitFor({ timeout: 30000 });
            const skel = await p.locator(".skeleton-ink-register").evaluateAll((l) => l.map((e) => { const cs = getComputedStyle(e); return { h: e.getBoundingClientRect().height, border: cs.borderWidth, shadow: cs.boxShadow.slice(0, 80), overflow: cs.overflow, radius: cs.borderRadius, swatchRowH: e.querySelector(".flex.h-10")?.getBoundingClientRect().height }; }));
            await p.locator('[role="article"].palette-card').first().waitFor({ timeout: 30000 }); await p.waitForTimeout(1200);
            const cards = await p.locator('[role="article"].palette-card').evaluateAll((l) => l.map((e) => { const n = e.querySelector("[data-palette-name]").getBoundingClientRect(); return { name: e.getAttribute("aria-label").slice(9), h: Math.round(e.getBoundingClientRect().height * 10) / 10, nameW: Math.round(n.width * 10) / 10, nameH: Math.round(n.height * 10) / 10, nameText: getComputedStyle(e.querySelector("[data-palette-name]")).textOverflow }; }));
            await p.screenshot({ path: resolve(EVID, "pc-u5-browse-390.png") });
            return { skel, cards };
        }));
        out.push(await cell(b, "PC-U5 D3-11 columns across viewports + D3-13 expand cost + D3-14 strip corner", {}, async (p) => {
            await openBrowse(p, { wall: WALL2 });
            const cols = {};
            for (const w of [390, 768, 1024, 1440, 1920]) { await p.setViewportSize({ width: w, height: 900 }); await p.waitForTimeout(500); cols[w] = await p.locator(".palette-card-grid").first().evaluate((g) => ({ tracks: getComputedStyle(g).gridTemplateColumns.split(" ").length, cardW: Math.round(g.firstElementChild.getBoundingClientRect().width), stripH: g.querySelector(".palette-specimen__strip")?.getBoundingClientRect().height, ratio: Math.round((g.firstElementChild.getBoundingClientRect().width / g.firstElementChild.getBoundingClientRect().height) * 100) / 100 })); }
            await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(400);
            const c = card(p, "Probe Five");
            const h0 = (await c.boundingBox()).height;
            await c.locator(".palette-specimen__name").click(); await p.waitForTimeout(1500);
            const h1 = (await c.boundingBox()).height;
            const stripAfter = await c.locator(".palette-specimen__strip").evaluate((s) => s.getBoundingClientRect().height);
            const corner = await c.evaluate((el) => { const s = el.querySelector(".palette-specimen__strip"); const cs = getComputedStyle(el), ss = getComputedStyle(s); return { cardRadius: cs.borderTopLeftRadius, cardBorder: cs.borderTopWidth, cardOverflow: cs.overflow, stripRadius: ss.borderTopLeftRadius, stripOverflow: ss.overflow, innerArc: parseFloat(cs.borderTopLeftRadius) - parseFloat(cs.borderTopWidth) }; });
            return { cols, expandCost: Math.round((h1 - h0) * 10) / 10, h0, h1, stripAfterExpand: stripAfter, corner };
        }));
        out.push(await cell(b, "PC-U5 D3-12 dark material: ground vs shadow ink", { colorScheme: "dark" }, async (p) => {
            await openBrowse(p, { scheme: "dark" });
            await installColor(p);
            return card(p, "Probe Five").evaluate((el) => { const cs = getComputedStyle(el); return { bg: cs.backgroundColor, rgba: window.__rgba(cs.backgroundColor), boxShadow: cs.boxShadow, border: cs.borderColor }; });
        }));
        out.push(await cell(b, "PC-U5 D3-7 iPhone-14 tap on the name (successor)", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 }, async (p) => {
            await openBrowse(p);
            const c = card(p, "Probe Five");
            await c.locator("[data-palette-name]").tap(); await p.waitForTimeout(1200);
            return { renameInputs: await p.locator('[role="article"] input').count(), expanded: await c.getAttribute("data-selected"), ariaCurrent: await c.getAttribute("aria-current") };
        }));
    }
    if (want("u6")) for (const scheme of ["light", "dark"]) out.push(await cell(b, `PC-U6 featured badge contrast ${scheme} PRM`, { colorScheme: scheme, reducedMotion: "reduce", deviceScaleFactor: 2 }, async (p) => {
        await openBrowse(p, { scheme });
        await installColor(p);
        const badge = card(p, "Probe Featured").locator(".featured-badge");
        const bb = await badge.boundingBox();
        const px = [[await p.evaluate(async (u) => (await window.__modePx(u))[0][0], "data:image/png;base64," + (await p.screenshot({ clip: { x: bb.x + 4, y: bb.y + bb.height / 2 - 1, width: 3, height: 2 } })).toString("base64"))]];
        const r = await badge.evaluate((el) => { const w = el.querySelector(".palette-specimen__yield-3"), ic = el.querySelector("svg"); const cs = getComputedStyle(el); return { cls: el.className, shimmer: !!el.closest(".gold-shimmer") || !!el.querySelector(".gold-shimmer"), animation: cs.animationName, word: getComputedStyle(w).color, wordClip: getComputedStyle(w).backgroundClip, icon: getComputedStyle(ic).color, iconStroke: getComputedStyle(ic).stroke, border: cs.borderColor, bg: cs.backgroundColor, fontSize: getComputedStyle(w).fontSize }; });
        const ground = px[0][0];
        const cr = await p.evaluate(([r, g]) => ({ word: window.__cr(window.__over(window.__rgba(r.word), [...g, 1]), g), icon: window.__cr(window.__over(window.__rgba(r.iconStroke === "none" ? r.icon : r.icon), [...g, 1]), g), border: window.__cr(window.__over(window.__rgba(r.border), [...g, 1]), g) }), [r, ground]);
        await badge.screenshot({ path: resolve(EVID, `pc-u6-featured-${scheme}-prm.png`) });
        return { ...r, groundPx: ground, cr };
    }));
    if (want("u7")) out.push(await cell(b, "PC-U7 Space in rename input vs card transform", {}, async (p) => {
        await openPalettes(p, 3);
        const c = p.locator('[role="article"].palette-card').first();
        const sample = (ms) => c.evaluate((el, ms) => new Promise((res) => { const s = []; const t0 = performance.now(); const seen = new Set(); const f = () => { const cs = getComputedStyle(el); const m = new DOMMatrix(cs.transform === "none" ? undefined : cs.transform); const sc = cs.scale === "none" ? 1 : parseFloat(cs.scale); s.push(Math.round(m.a * sc * 10000) / 10000); seen.add(`scale=${cs.scale}|style=${el.getAttribute("style")}`.slice(0, 160)); if (performance.now() - t0 < ms) requestAnimationFrame(f); else res({ min: Math.min(...s), max: Math.max(...s), n: s.length, styles: [...seen].slice(0, 4) }); }; f(); }), ms);
        // positive control: pointer press on the card body
        const bb = await c.boundingBox();
        await p.mouse.move(bb.x + bb.width - 140, bb.y + 20); await p.mouse.down();
        const ctl = await sample(400); await p.mouse.up(); await p.waitForTimeout(600);
        await c.locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(400);
        await p.getByRole("menuitem", { name: "Rename" }).click(); await p.waitForTimeout(700);
        const input = c.locator("input").first();
        await input.focus();
        const focused = await p.evaluate(() => document.activeElement?.tagName);
        await p.keyboard.down("Space");
        const space = await sample(400);
        await p.keyboard.up("Space");
        await p.keyboard.down("Enter").catch(() => {}); const enter = await sample(250); await p.keyboard.up("Enter").catch(() => {});
        return { control: ctl, focused, spaceInInput: space, enterInInput: enter, inputValue: await input.inputValue().catch(() => "(gone)") };
    }));
    console.error("B part1 done");
    save(`run-card-B-${only ? only.join("+") : "all"}.json`, out);
} finally { await b.close(); }
console.log(JSON.stringify(out).slice(0, 12000));
