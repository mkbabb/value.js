// SERVED MODEL: claude-opus-5-5 — SS-8 B05 follow-up Chromium cells (headless default shell; one
// browser; one context per cell; all closed in finally). CELLS env picks a subset.
// faces  — ABL C-10 face census traced across in-session route changes + C-3/L-3 overhang rects.
// seeds  — ABT D-02/ABT-8 + ABN U-4 ink ratios over a 6-hue seed sweep x {light,dark}.
// fdark  — ABL D-17 / ABN U-11 forced-colors with a DARK forced palette (Chromium emulation).
// flap   — ABT L-7 non-PRM stuck re-take on NAMED routes: gradient -> atmosphere -> gradient
//          inside one task / 0 ms / 30 ms (an uncommitted visible false->true flap).
import { chromium } from "playwright";
import { boot, parkOnDock, dockState, toolsState, barState, samplePixels, contrast, save, EVID, r1 } from "./lib.mjs";

const ONLY = process.env.CELLS ? new Set(process.env.CELLS.split(",")) : null;

const faceRects = (page) => page.evaluate(() => {
    const rr = (r) => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), r: +(r.x + r.width).toFixed(1), b: +(r.y + r.height).toFixed(1) });
    const d = document.querySelector(".glass-dock");
    const cfs = [...d.querySelectorAll(".dock-crossfade")];
    return {
        dock: rr(d.getBoundingClientRect()),
        crossfades: cfs.map((cf) => ({
            depth: (() => { let n = 0, e = cf.parentElement; while (e && e !== d) { if (e.classList.contains("dock-crossfade")) n++; e = e.parentElement; } return n; })(),
            box: rr(cf.getBoundingClientRect()), pos: getComputedStyle(cf).position, display: getComputedStyle(cf).display,
            parentCls: (cf.parentElement.className || "").toString().slice(0, 60),
            faces: [...cf.querySelectorAll(":scope > .dock-face")].map((f) => ({ id: f.getAttribute("data-face") ?? f.getAttribute("data-layer") ?? f.id ?? null, active: f.classList.contains("is-active"), inert: f.hasAttribute("inert"), pos: getComputedStyle(f).position, ...rr(f.getBoundingClientRect()), firstLabel: f.querySelector("button[aria-label]")?.getAttribute("aria-label") ?? null })),
        })),
    };
});

async function ink(page, rect, platePt) {
    const shot = await page.screenshot();
    const pts = [];
    for (let x = rect.x + 1; x < rect.x + rect.w - 1; x++) for (let y = rect.y + 1; y < rect.y + rect.h - 1; y++) pts.push([x, y]);
    const px = await samplePixels(page, shot, [platePt, ...pts]);
    let best = { c: 1, p: null };
    for (const p of px.slice(1)) { const c = contrast(p, px[0]); if (c > best.c) best = { c, p }; }
    return { plate: px[0], ink: best.p, ratio: best.c };
}

async function openBar(page) {
    await parkOnDock(page);
    await page.getByRole("button", { name: "Toggle action bar" }).click({ timeout: 4000 });
    await page.waitForTimeout(900);
    await parkOnDock(page);
    await page.waitForTimeout(300);
}

const CELLS = {
    async faces(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        try {
            const page = await ctx.newPage();
            const trace = [];
            const snap = async (step) => { const s = await dockState(page); trace.push({ step, hash: await page.evaluate(() => location.hash), faceCount: s.faceCount, activeIdx: s.faces.findIndex((f) => f.active), labels0: s.faces.map((f) => f.labels[0] ?? null) }); };
            await boot(page, "/", 2600); await parkOnDock(page); await page.waitForTimeout(300);
            await snap("boot /");
            const restRects = await faceRects(page);
            await openBar(page); await snap("bar open /");
            const barRects = await faceRects(page);
            for (const h of ["#/atmosphere", "#/", "#/gradient", "#/browse", "#/mix"]) { await page.evaluate((x) => { location.hash = x; }, h); await page.waitForTimeout(1500); await parkOnDock(page); await snap("-> " + h); }
            return { trace, restRects, barRects };
        } finally { await ctx.close(); }
    },

    async seeds(browser) {
        const rows = [];
        for (const scheme of ["light", "dark"]) for (const h of [0, 60, 120, 180, 240, 300]) {
            const seed = `oklch(0.62 0.16 ${h})`;
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
            try {
                await ctx.addInitScript(([s, sc]) => { try { localStorage.setItem("vueuse-color-scheme", sc); localStorage.setItem("color-picker", JSON.stringify({ inputColor: s, savedColors: [] })); } catch {} }, [seed, scheme]);
                const page = await ctx.newPage();
                await boot(page, "/", 2600); await parkOnDock(page); await page.waitForTimeout(300);
                const d = (await dockState(page)).rect;
                const plate = [d.x + 6, d.y + d.h / 2];
                const lb = await page.locator('[aria-label="Toggle action bar"] span').boundingBox();
                const vs = await page.getByRole("combobox", { name: "Select view" }).boundingBox().catch(() => null);
                const row = { scheme, seed, title: (await page.title()).slice(0, 60), label: lb ? await ink(page, r1(lb), plate) : null, viewSelect: vs ? await ink(page, r1(vs), plate) : null,
                    labelColor: await page.evaluate(() => getComputedStyle(document.querySelector('[aria-label="Toggle action bar"] span')).color) };
                await openBar(page);
                const b = await barState(page);
                const d2 = (await dockState(page)).rect;
                const g = b.seats?.[0]?.glyph;
                row.seatGlyph = g ? await ink(page, g, [d2.x + 6, d2.y + d2.h / 2]) : null;
                row.seatStroke = g?.stroke ?? null;
                rows.push(row);
            } catch (e) { rows.push({ scheme, seed, ERROR: String(e.message).split("\n")[0] }); }
            finally { await ctx.close(); }
        }
        return rows;
    },

    async fdark(browser) {
        const out = {};
        for (const scheme of ["light", "dark"]) {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, forcedColors: "active" });
            try {
                const page = await ctx.newPage();
                await boot(page, "/", 2600); await parkOnDock(page); await page.waitForTimeout(300);
                const read = () => page.evaluate(() => {
                    const pick = (el) => el && (({ stroke, color, backgroundColor, forcedColorAdjust }) => ({ stroke, color, bg: backgroundColor, fca: forcedColorAdjust }))(getComputedStyle(el));
                    return { mq: matchMedia("(forced-colors: active)").matches, dark: matchMedia("(prefers-color-scheme: dark)").matches,
                        canvas: getComputedStyle(document.body).backgroundColor,
                        toolsSvg: pick(document.querySelector('[aria-label="Toggle action bar"] svg')), toolsLabel: pick(document.querySelector('[aria-label="Toggle action bar"] span')),
                        seatSvg: pick(document.querySelector("[data-scene-action] svg")) };
                });
                const rest = await read();
                const d = (await dockState(page)).rect;
                const t = (await toolsState(page)).svgs?.[0];
                rest.toolsGlyphInk = t ? await ink(page, { x: t.x, y: t.y, w: t.w, h: t.h }, [d.x + 6, d.y + d.h / 2]) : null;
                await page.screenshot({ path: `${EVID}forced-${scheme}-rest-dock.png`, clip: { x: d.x - 10, y: d.y - 10, width: d.w + 20, height: d.h + 20 } });
                await openBar(page);
                const bar = await read();
                const b = await barState(page);
                const d2 = (await dockState(page)).rect;
                bar.seatGlyphInk = b.seats?.[0]?.glyph ? await ink(page, b.seats[0].glyph, [d2.x + 6, d2.y + d2.h / 2]) : null;
                await page.screenshot({ path: `${EVID}forced-${scheme}-bar.png`, clip: { x: d2.x - 10, y: d2.y - 10, width: d2.w + 20, height: d2.h + 20 } });
                out[scheme] = { rest, bar };
            } finally { await ctx.close(); }
        }
        return out;
    },

    // edit — ABN U-5 disabled composite + U-6 :hover on a natively-disabled seat (desktop edit mode).
    async edit(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        try {
            const cur = [0, 72, 144, 216, 288].map((h) => `oklch(0.72 0.16 ${h})`);
            await ctx.addInitScript((c) => { try { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-picker", JSON.stringify({ inputColor: c[4], savedColors: c })); } catch {} }, cur);
            const page = await ctx.newPage();
            await boot(page, "/palettes", 3000);
            const sw = page.locator(".swatch-row button[aria-label^='Color swatch']").nth(1);
            const sb = await sw.boundingBox();
            await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2, { steps: 6 });
            await page.locator('[aria-label^="Actions for"] button[aria-label^="Edit color"]').first().click({ timeout: 5000 });
            await page.waitForTimeout(900);
            await parkOnDock(page);
            const t = page.getByRole("button", { name: "Toggle action bar" });
            await t.click({ timeout: 4000 });
            await page.waitForTimeout(900);
            const b = await barState(page);
            const dis = b.seats.filter((s) => s.disabledAttr || s.ariaDisabled === "true");
            const out = { seats: b.seats.map((s) => ({ token: s.token, disabled: s.disabledAttr, aria: s.ariaDisabled, cursor: s.cursor })), hover: [] };
            const d = (await dockState(page)).rect;
            for (const s of dis) {
                await page.mouse.move(5, 500); await page.waitForTimeout(400);
                const rest = await page.evaluate((tok) => { const g = document.querySelector(`[data-scene-action="${tok}"] svg`); const cs = getComputedStyle(g); return { rotate: cs.rotate, transform: cs.transform, stroke: cs.stroke, opacity: getComputedStyle(g.closest("button")).opacity, hover: g.matches(":hover") }; }, s.token);
                const inkRest = await ink(page, s.glyph, [d.x + 6, d.y + d.h / 2]);
                await page.mouse.move(s.btn.x + s.btn.w / 2, s.btn.y + s.btn.h / 2); await page.waitForTimeout(700);
                const hov = await page.evaluate((tok) => { const g = document.querySelector(`[data-scene-action="${tok}"] svg`); const cs = getComputedStyle(g); return { rotate: cs.rotate, transform: cs.transform, stroke: cs.stroke, hover: g.matches(":hover"), btnHover: g.closest("button").matches(":hover") }; }, s.token);
                out.hover.push({ token: s.token, rest, inkRest, hov });
            }
            await page.screenshot({ path: `${EVID}edit-bar-disabled.png`, clip: { x: d.x - 10, y: d.y - 10, width: d.w + 20, height: d.h + 20 } });
            return out;
        } finally { await ctx.close(); }
    },

    async flap(browser) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
        try {
            const page = await ctx.newPage();
            const arms = [];
            for (const gap of ["sync", 0, 30, 120]) {
                await boot(page, "/gradient", 2600); await parkOnDock(page);
                const before = await toolsState(page);
                await page.evaluate((g) => new Promise((res) => {
                    location.hash = "#/atmosphere";
                    if (g === "sync") { location.hash = "#/gradient"; res(); }
                    else setTimeout(() => { location.hash = "#/gradient"; res(); }, g);
                }), gap);
                await page.waitForTimeout(2000);
                const after = await toolsState(page);
                arms.push({ gap, before: { cls: before.slotClass, ov: before.innerOverflow, w: before.slotRect?.w }, after: { cls: after.slotClass, ov: after.innerOverflow, w: after.slotRect?.w }, hash: await page.evaluate(() => location.hash) });
            }
            return arms;
        } finally { await ctx.close(); }
    },
};

const browser = await chromium.launch();
try {
    for (const [name, fn] of Object.entries(CELLS)) {
        if (ONLY && !ONLY.has(name)) continue;
        try { save(`extra-${name}.json`, await fn(browser)); console.log(name, "ok"); }
        catch (e) { save(`extra-${name}.json`, { ERROR: String(e.message).split("\n").slice(0, 3).join(" | ") }); console.log(name, "ERR", String(e.message).split("\n")[0]); }
    }
} finally { await browser.close(); }
