// SERVED MODEL: claude-opus-5-5 · SS-8 B12-card-shell — routed-WALL cells (no writes reach the API).
// One browser per run; one context per cell (lib.cell closes it in finally); browser closed in finally.
import { launch, cell, openBrowse, card, save, palette, installColor, EVID, BASE, WALL } from "./lib.mjs";
import { resolve } from "node:path";

const only = (process.argv[2] || "").split(",").filter(Boolean);
const want = (k) => only.includes(k);
const LOCAL = (n) => Array.from({ length: n }, (_, i) => ({ id: `l${i}`, name: `Local ${i}`, slug: `local-${i}`,
    colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"].map((css, position) => ({ css, position })),
    createdAt: "2026-10-19T00:00:00.000Z", updatedAt: "2026-10-19T00:00:00.000Z", isLocal: true, published: false, visibility: "private", tags: [] }));
async function openPalettes(p, n = 4) {
    await p.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s })); } catch {} }, LOCAL(n));
    await p.goto(`${BASE}/#/palettes`, { timeout: 90000 });
    await p.locator('[role="article"].palette-card').first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
}
/** Ground under an element = dominant pixel of its box with its own ink made transparent. */
async function inkVsGround(p, loc, inkSel) {
    await installColor(p);
    const ink = await loc.evaluate((el, s) => { const t = s ? el.querySelector(s) : el; const cs = getComputedStyle(t); return { color: cs.color, fs: cs.fontSize, fw: cs.fontWeight, bg: getComputedStyle(el).backgroundColor, text: t.textContent.trim().slice(0, 20) }; }, inkSel);
    await loc.evaluate((el) => { el.setAttribute("data-ss8-hide", ""); });
    const st = await p.addStyleTag({ content: "[data-ss8-hide], [data-ss8-hide] * { color: transparent !important; stroke: transparent !important; fill: transparent !important; -webkit-text-fill-color: transparent !important; }" });
    await p.waitForTimeout(150);
    const buf = await loc.screenshot();
    await st.evaluate((n) => n.remove()); await loc.evaluate((el) => el.removeAttribute("data-ss8-hide"));
    const g = await p.evaluate((u) => window.__modePx(u), "data:image/png;base64," + buf.toString("base64"));
    const ground = g[0][0];
    const cr = await p.evaluate(([c, gr]) => window.__cr(window.__over(window.__rgba(c), [...gr, 1]), gr), [ink.color, ground]);
    return { ...ink, ground, cr };
}
const sampler = (loc, ms) => loc.evaluate((el, ms) => new Promise((res) => {
    const v = []; const t0 = performance.now();
    const f = () => { const s = getComputedStyle(el).scale; (s === "none" ? [1] : s.split(" ").map(Number)).forEach((x) => v.push(x)); if (performance.now() - t0 < ms) requestAnimationFrame(f); else res({ frames: v.length, min: Math.min(...v), max: Math.max(...v) }); };
    requestAnimationFrame(f);
}), ms);
const out = [];
const b = await launch();
try {
    // PaletteCardMeta U-1 — chip ink on its painted ground, 390/1440 × light/dark, + prefers-contrast: more
    if (want("meta")) for (const [w, h, scheme, contrast] of [[1440, 900, "light", "no-preference"], [1440, 900, "dark", "no-preference"], [390, 844, "light", "no-preference"], [390, 844, "dark", "no-preference"], [1440, 900, "light", "more"], [1440, 900, "dark", "more"]])
        out.push(await cell(b, `META-U1 chip contrast ${w} ${scheme} contrast=${contrast}`, { viewport: { width: w, height: h }, colorScheme: scheme, contrast }, async (p) => {
            await openBrowse(p, { scheme });
            const c = card(p, "Probe Five").first();
            const chip = c.locator(".palette-meta__chip").filter({ visible: true }).first();
            const more = c.locator(".palette-meta__more");
            const r = { chip: (await chip.count()) ? await inkVsGround(p, chip) : null, more: (await more.isVisible()) ? await inkVsGround(p, more) : null };
            if (w === 1440 && contrast === "no-preference") await c.locator(".palette-meta").screenshot({ path: resolve(EVID, `meta-u1-${scheme}-1440.png`) });
            return r;
        }));
    // PaletteCard U-6 — Featured badge word/icon on painted ground, light/dark, PRM and not
    if (want("badge")) for (const [scheme, rm] of [["light", "reduce"], ["dark", "reduce"], ["light", "no-preference"]])
        out.push(await cell(b, `PC-U6 featured badge ${scheme} rm=${rm}`, { colorScheme: scheme, reducedMotion: rm, deviceScaleFactor: 2 }, async (p) => {
            await openBrowse(p, { scheme });
            const badge = card(p, "Probe Featured").first().locator(".featured-badge");
            const anim = await badge.evaluate((el) => ({ anims: el.getAnimations({ subtree: true }).map((a) => a.animationName || a.constructor.name), shimmer: !!el.querySelector(".gold-shimmer") || el.matches(".gold-shimmer"), bgImage: [...el.querySelectorAll("*")].map((n) => getComputedStyle(n).backgroundImage).filter((x) => x !== "none").slice(0, 2) }));
            const word = await inkVsGround(p, badge, ".palette-specimen__yield-3");
            const icon = await inkVsGround(p, badge, "svg");
            const border = await badge.evaluate((el) => getComputedStyle(el).borderColor);
            await badge.screenshot({ path: resolve(EVID, `pc-u6-badge-${scheme}-${rm}.png`) });
            return { anim, word, icon: { color: icon.color, cr: icon.cr }, border };
        }));
    // PaletteCardMeta U-5 — served CSSOM rules for .fira-code
    if (want("fira")) out.push(await cell(b, "META-U5 .fira-code served CSSOM", {}, async (p) => {
        await openBrowse(p);
        return p.evaluate(() => {
            const hits = [];
            const walk = (rules, sheet, layer) => { for (const r of rules) { if (r.cssRules && !(r instanceof CSSStyleRule)) walk(r.cssRules, sheet, r.name ?? layer ?? (r.conditionText ? `@${r.conditionText}` : layer)); if (r instanceof CSSStyleRule && /\.fira-code\b/.test(r.selectorText)) hits.push({ sheet: (sheet.href || sheet.ownerNode?.getAttribute("data-vite-dev-id") || "inline").slice(-60), layer: layer ?? "(unlayered)", sel: r.selectorText.slice(0, 60), css: r.style.cssText.slice(0, 160) }); } };
            for (const s of document.styleSheets) { try { walk(s.cssRules, s, null); } catch {} }
            const els = [...document.querySelectorAll(".fira-code")];
            const probe = document.createElement("span"); probe.className = "fira-code"; probe.textContent = "x"; document.body.append(probe);
            const cs = getComputedStyle(probe); const comp = { ff: cs.fontFamily, ffs: cs.fontFeatureSettings }; probe.remove();
            return { hits, liveElements: els.length, computedOnProbe: comp };
        });
    }));
    // PaletteCardMenu U-7 — N=200 census: nodes, heap, keystroke latency
    if (want("census")) out.push(await cell(b, "MENU-U7 census at N=200", {}, async (p) => {
        const wall = Array.from({ length: 200 }, (_, i) => palette(`Census ${i}`, 5, { tags: ["a", "b"] }));
        await openBrowse(p, { wall });
        const cdp = await p.context().newCDPSession(p);
        await cdp.send("HeapProfiler.collectGarbage").catch(() => {});
        const { metrics } = await cdp.send("Performance.getMetrics").catch(async () => { await cdp.send("Performance.enable"); return cdp.send("Performance.getMetrics"); });
        const m = Object.fromEntries((metrics || []).map((x) => [x.name, x.value]));
        const dom = await p.evaluate(() => {
            const w = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT); let tp = 0, c = 0; while (w.nextNode()) { c++; if (/teleport/i.test(w.currentNode.data)) tp++; }
            return { docNodes: document.getElementsByTagName("*").length, articles: document.querySelectorAll('[role="article"].palette-card').length, menuTriggers: document.querySelectorAll('button[aria-label="Palette menu"]').length, popoverTriggersPerFirstRow: document.querySelector('[role="article"]')?.querySelectorAll("[aria-haspopup]").length, teleportComments: tp, comments: c };
        });
        const input = p.locator('input[placeholder="Search palettes..."]');
        await input.click();
        const lat = [];
        for (const ch of "census1") {
            const t = await p.evaluate(() => new Promise((res) => { const t0 = performance.now(); window.__t0 = t0; addEventListener("keydown", () => { window.__kd = performance.now(); }, { once: true }); requestAnimationFrame(() => res(t0)); }));
            await p.keyboard.press(ch);
            lat.push(await p.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => res(Math.round(performance.now() - (window.__kd || window.__t0))))))));
        }
        await p.waitForTimeout(800);
        return { dom, heapUsedMB: Math.round((m.JSHeapUsedSize || 0) / 1e5) / 10, nodesMetric: m.Nodes, keyToFrameMs: lat };
    }));
    // PaletteCardMenu U-2 / U-11 (and the U-1 substitution, recorded only) — short viewports + text resize
    if (want("zoom")) for (const [w, h, dpr, rootPct] of [[360, 225, 4, 100], [1440, 225, 1, 100], [1440, 900, 1, 100], [1440, 900, 1, 200]])
        out.push(await cell(b, `MENU-U2/U11 ${w}x${h} dpr${dpr} root${rootPct}%`, { viewport: { width: w, height: h }, deviceScaleFactor: dpr }, async (p) => {
            await openBrowse(p);
            if (rootPct !== 100) { await p.addStyleTag({ content: `html{font-size:${rootPct}% !important}` }); await p.waitForTimeout(600); }
            const c = card(p, "Probe Eight").first();
            const trig = c.locator('button[aria-label="Palette menu"]');
            await trig.scrollIntoViewIfNeeded(); await trig.click(); await p.waitForTimeout(700);
            const menu = await p.evaluate(() => { const m = document.querySelector('[role="menu"]'); if (!m) return null; const r = m.getBoundingClientRect(); const cs = getComputedStyle(m); return { x: r.x, y: r.y, w: r.width, h: r.height, scrollH: m.scrollHeight, clientH: m.clientHeight, hiddenPct: Math.round((1 - m.clientHeight / m.scrollHeight) * 1000) / 10, overflowY: cs.overflowY, maxH: cs.maxHeight, bottomOver: Math.round(r.bottom - innerHeight), items: [...m.querySelectorAll('[role="menuitem"]')].map((i) => i.textContent.trim()), exportSub: !!m.querySelector('[aria-haspopup="menu"]') }; });
            let sub = null;
            const st = p.getByRole("menuitem", { name: "Export" });
            if (menu?.exportSub && (await st.count())) {
                await st.hover(); await p.waitForTimeout(800);
                sub = await p.evaluate(() => { const ms = [...document.querySelectorAll('[role="menu"]')]; const s = ms[ms.length - 1]; if (ms.length < 2) return { opened: false }; const r = s.getBoundingClientRect(); const cs = getComputedStyle(s); const items = [...s.querySelectorAll('[role="menuitem"]')]; return { opened: true, y: r.y, h: r.height, bottomOver: Math.round(r.bottom - innerHeight), topOver: Math.round(-r.y), overflow: `${cs.overflowX}/${cs.overflowY}`, maxH: cs.maxHeight, scrollH: s.scrollHeight, clientH: s.clientHeight, itemsVisible: items.filter((i) => { const q = i.getBoundingClientRect(); return q.top >= 0 && q.bottom <= innerHeight; }).length, items: items.length }; });
            }
            await p.screenshot({ path: resolve(EVID, `menu-zoom-${w}x${h}-root${rootPct}.png`) });
            return { inner: await p.evaluate(() => [innerWidth, innerHeight, devicePixelRatio]), menu, sub };
        }));
    // PaletteCardMenu U-4 — geometry: which other rows' controls sit under the open (modal) menu
    if (want("cover")) out.push(await cell(b, "MENU-U4 covered controls under the open menu", {}, async (p) => {
        await openBrowse(p);
        await card(p, "Probe Featured").first().locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(700);
        return p.evaluate(() => {
            const m = document.querySelector('[role="menu"]').getBoundingClientRect();
            const ctrls = [...document.querySelectorAll('[role="article"] button')].filter((x) => !x.closest('[aria-label="Palette: Probe Featured"]'));
            const covered = ctrls.filter((x) => { const r = x.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2; return r.width && cx >= m.left && cx <= m.right && cy >= m.top && cy <= m.bottom; }).map((x) => x.getAttribute("aria-label") || x.textContent.trim().slice(0, 20));
            return { menu: { x: m.x, y: m.y, w: m.width, h: m.height }, bodyPointerEvents: getComputedStyle(document.body).pointerEvents, covered };
        });
    }));
    // PaletteCard U-8 — hover fan-out: how many sibling swatch roots mutate when one swatch is hovered
    if (want("fanout")) out.push(await cell(b, "PC-U8 swatch hover fan-out", {}, async (p) => {
        await openBrowse(p);
        const c = card(p, "Probe Eight").first();
        await c.locator('button[aria-label="Colors of Probe Eight"]').click(); await p.waitForTimeout(1200);
        const sw = c.locator('[aria-label^="Color swatch"]');
        const n = await sw.count();
        await c.evaluate((a) => { window.__mut = new Map(); const sws = [...a.querySelectorAll('[aria-label^="Color swatch"]')]; window.__mo = new MutationObserver((ms) => { for (const m of ms) { const i = sws.findIndex((s) => s === m.target || s.contains(m.target)); if (i >= 0) window.__mut.set(i, (window.__mut.get(i) || 0) + 1); } }); window.__mo.observe(a, { subtree: true, attributes: true, childList: true, characterData: true }); });
        await sw.nth(3).hover(); await p.waitForTimeout(1200);
        const r = await p.evaluate(() => ({ mutatedSwatches: [...window.__mut.entries()], popover: !!document.querySelector('[aria-label^="Actions for"]') }));
        return { swatches: n, ...r };
    }));
    // PaletteCard U-10 — one coarse tap on a swatch (iPhone-14 class context)
    if (want("coarse")) out.push(await cell(b, "PC-U10 coarse tap on the swatch popover trigger", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 }, async (p) => {
        await openBrowse(p);
        const c = card(p, "Probe Five").first();
        await c.locator('button[aria-label="Colors of Probe Five"]').tap(); await p.waitForTimeout(1200);
        const sw = c.locator('[aria-label^="Color swatch"]').nth(1);
        const attrs = await sw.evaluate((s) => ({ tag: s.tagName, type: s.getAttribute("type"), hasPopup: s.getAttribute("aria-haspopup"), expanded: s.getAttribute("aria-expanded"), ariaHidden: s.getAttribute("aria-hidden"), pe: getComputedStyle(s).pointerEvents }));
        await sw.tap(); await p.waitForTimeout(900);
        const panel = await p.evaluate(() => { const el = document.querySelector('[aria-label^="Actions for"]'); if (!el) return null; const r = el.getBoundingClientRect(); return { label: el.getAttribute("aria-label"), x: r.x, y: r.y, w: r.width, h: r.height, inViewport: r.x >= 0 && r.right <= innerWidth && r.y >= 0 && r.bottom <= innerHeight, buttons: [...el.querySelectorAll("button")].map((x) => x.getAttribute("aria-label")) }; });
        const after = await sw.getAttribute("aria-expanded");
        await p.screenshot({ path: resolve(EVID, "pc-u10-coarse-tap-390.png") });
        return { attrs, panel, expandedAfter: after };
    }));
    // PaletteCard U-7 / U-11 — the press register under descendant input and a real sortable drag
    if (want("press")) out.push(await cell(b, "PC-U7/U11 press register: control, Space in rename, drag traverse", {}, async (p) => {
        await openPalettes(p, 4);
        const cards = p.locator('[data-pane="palettes"] [role="article"].palette-card');
        const c0 = cards.nth(0), c1 = cards.nth(1), c2 = cards.nth(2);
        const bb = await c0.boundingBox();
        await p.mouse.move(bb.x + bb.width / 2, bb.y + 12); await p.mouse.down();
        const control = await sampler(c0, 350); await p.mouse.up(); await p.waitForTimeout(700);
        // rename
        await c0.locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(400);
        await p.getByRole("menuitem", { name: "Rename" }).click(); await p.waitForTimeout(700);
        const autoFocused = await p.evaluate(() => document.activeElement?.tagName);
        const inp = c0.locator("input").first(); const hasInput = await inp.count();
        if (hasInput) { await inp.click(); await p.keyboard.press("End"); }
        const focused = await p.evaluate(() => ({ autoFocused: null, tag: document.activeElement?.tagName, inCard: !!document.activeElement?.closest('[role="article"]') }));
        focused.autoFocused = autoFocused; focused.inputs = hasInput;
        const ctl2 = sampler(c0, 300); await p.mouse.move(1, 1); const restAfterClick = await ctl2;
        const spP = sampler(c0, 400); await p.keyboard.down("Space"); const space = await spP; await p.keyboard.up("Space");
        const val = await p.evaluate(() => document.activeElement?.value);
        await p.keyboard.press("Escape"); await p.waitForTimeout(500);
        // drag: grip of card 0 across cards 1 and 2 with the button held
        const grip = c0.locator(".drag-handle");
        const g = await grip.boundingBox(); const b1 = await c1.boundingBox(); const b2 = await c2.boundingBox();
        await p.mouse.move(g.x + g.width / 2, g.y + g.height / 2); await p.mouse.down();
        const s1 = sampler(c1, 1600), s2 = sampler(c2, 1600);
        for (let i = 1; i <= 16; i++) { await p.mouse.move(g.x + g.width / 2 + i * 2, g.y + (b2.y + b2.height / 2 - g.y) * (i / 16), { steps: 2 }); await p.waitForTimeout(60); }
        const [d1, d2] = await Promise.all([s1, s2]);
        await p.mouse.up(); await p.waitForTimeout(800);
        const order = await p.evaluate(() => [...document.querySelectorAll('[data-pane="palettes"] [role="article"].palette-card')].map((a) => a.getAttribute("aria-label")));
        return { control, focused, restAfterClick, spaceInInput: space, inputValueAfterSpace: val, dragOverCard1: d1, dragOverCard2: d2, orderAfterDrag: order };
    }));
    // PaletteCard U-12 — the shell as rendered: loading skeleton vs loaded card, same probe
    if (want("shell")) out.push(await cell(b, "PC-U12 shell: skeleton vs card", { deviceScaleFactor: 2 }, async (p) => {
        await p.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
        let release; const gate = new Promise((r) => { release = r; });
        await p.route((u) => !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname) && /(^|\/)palettes(\/|$)/.test(u.pathname), async (route) => { await gate; return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: WALL, nextCursor: null, hasMore: false }) }); });
        await p.goto(`${BASE}/#/browse`, { timeout: 90000 });
        const read = (sel) => p.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return { cls: el.className.slice(0, 90), w: r.width, h: r.height, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, radius: cs.borderTopLeftRadius, shadow: cs.boxShadow, bg: cs.backgroundColor, overflow: cs.overflow }; }, sel);
        await p.waitForSelector('[data-slot="palette-card-skeleton"], .palette-card-skeleton, [aria-busy="true"] [class*="skeleton"]', { timeout: 30000 }).catch(() => {});
        await p.waitForTimeout(600);
        const skel = await read('[data-slot="palette-card-skeleton"]') || await read('[class*="palette-card-skeleton"]');
        const skLoc = p.locator('[data-slot="palette-card-skeleton"]').first();
        if (await skLoc.count()) { const r = await skLoc.boundingBox(); await p.screenshot({ path: resolve(EVID, "pc-u12-skeleton-corner.png"), clip: { x: r.x - 8, y: r.y + r.height - 32, width: 48, height: 40 } }); }
        release(); await p.locator('[role="article"].palette-card').first().waitFor({ timeout: 30000 }); await p.waitForTimeout(1000);
        const cardR = await read('[role="article"].palette-card');
        const r2 = await p.locator('[role="article"].palette-card').first().boundingBox();
        await p.screenshot({ path: resolve(EVID, "pc-u12-card-corner.png"), clip: { x: r2.x - 8, y: r2.y + r2.height - 32, width: 48, height: 40 } });
        return { skel, card: cardR };
    }));
    // PaletteCardMeta (not-residue row) — the vote target's box at phone and desktop widths
    if (want("target")) for (const [w, h] of [[390, 844], [1440, 900]]) out.push(await cell(b, `META vote target box ${w}`, { viewport: { width: w, height: h } }, async (p) => {
        await openBrowse(p);
        return card(p, "Probe Five").first().locator('button[aria-label*="votes"]').evaluate((x) => { const r = x.getBoundingClientRect(); return { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10 }; });
    }));
    console.error("cells done:", only.join(","));
    save(`run-b12b-${only.join("+")}.json`, out);
} finally { await b.close(); }
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
