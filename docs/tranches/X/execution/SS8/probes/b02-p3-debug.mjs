// SS-8 B02 probe 3 — PointerDebugOverlay + DebugEventLog live witnesses
// (DEL R-1 WHCM tints, DEL R-2 wrap/visible rows @390x844, DISCHARGED reachability, U-1 keyboard scroll, U-2 re-measure, U-3 flag-drop).
// Headless Chromium, ONE browser, a NEW context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/b02-p3-debug.mjs
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EV = resolve(HERE, "../evidence/B02-picker-sliders-debug");
mkdirSync(EV, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:9000/";
const out = { base: BASE, at: new Date().toISOString(), cells: {} };

async function bootDebug(page, hash = "#/?debug=1") {
    await page.goto(BASE + hash, { waitUntil: "load" });
    await page.waitForSelector(".debug-overlay .debug-header", { timeout: 30000 });
    await page.waitForTimeout(1200);
}
async function openOverlay(page) {
    const open = await page.evaluate(() => !document.querySelector(".debug-overlay").classList.contains("debug-collapsed"));
    if (!open) await page.locator(".debug-overlay .debug-header").click();
    await page.waitForTimeout(400);
}
// Push N events through the overlay's own injected instrument (dev setupState), mixed types for the six tints.
async function seed(page, n, types) {
    return page.evaluate(({ n, types }) => {
        let inst = document.querySelector(".debug-overlay").__vueParentComponent;
        while (inst && inst.type?.__name !== "PointerDebugOverlay") inst = inst.parent;
        const dbg = inst.setupState.debug;
        for (let i = 0; i < n; i++) dbg.log(types[i % types.length], 1, "span.slider-thumb", false, "no-cap");
        return dbg.state.events.length;
    }, { n, types });
}
const TINTS = ["sl:r:down", "sl:r:up", "sl:kelvin:cancel-release", "sl:r:lostcap", "FORCE-release", "FREEZE?"];

const cells = {
    // DISCHARGED item: overlay reachable, z-index resolved (dev-served).
    async discharged_reach(b) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await bootDebug(page);
            return await page.evaluate(() => {
                const o = document.querySelector(".debug-overlay");
                const cs = getComputedStyle(o);
                const r = o.getBoundingClientRect();
                const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
                return { zIndex: cs.zIndex, zDebugVar: getComputedStyle(document.documentElement).getPropertyValue("--z-debug"), zMaxVar: getComputedStyle(document.documentElement).getPropertyValue("--z-max"), rect: [r.x, r.y, r.width, r.height], topAtCenterInOverlay: !!top?.closest(".debug-overlay") };
            });
        } finally { await ctx.close(); }
    },
    // DEL R-1: WHCM — do the six tints survive forced colors (computed + pixel crop)?
    async del_r1_whcm_forced(b) { return tints(b, { viewport: { width: 1440, height: 900 }, forcedColors: "active" }, "fc"); },
    async del_r1_whcm_unforced(b) { return tints(b, { viewport: { width: 1440, height: 900 } }, "nofc"); },
    // DEL R-2: wrap threshold + visible rows at 390x844 with the 24-ch worst specimen.
    async del_r2_wrap_390(b) {
        const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await bootDebug(page);
            await openOverlay(page);
            await seed(page, 80, ["sl:kelvin:cancel-release"]);
            await page.waitForTimeout(400);
            const r = await page.evaluate(() => {
                const sc = document.querySelector(".debug-scroll");
                const sr = sc.getBoundingClientRect();
                const rows = [...document.querySelectorAll(".debug-event")];
                const hs = rows.map((e) => +e.getBoundingClientRect().height.toFixed(2));
                const vis = rows.filter((e) => { const x = e.getBoundingClientRect(); return x.bottom > sr.top && x.top < sr.bottom; });
                const full = rows.filter((e) => { const x = e.getBoundingClientRect(); return x.top >= sr.top && x.bottom <= sr.bottom; });
                const ov = document.querySelector(".debug-overlay").getBoundingClientRect();
                return { overlay: [ov.width, +ov.height.toFixed(1)], scroll: [+sr.height.toFixed(1), sc.scrollHeight], rowHeights: [...new Set(hs)], rows: rows.length, visibleAny: vis.length, visibleFull: full.length, logTop: +(document.querySelector(".debug-log").getBoundingClientRect().top - sr.top).toFixed(1), etypeW: +document.querySelector(".debug-etype").getBoundingClientRect().width.toFixed(1), rowW: +rows[0].getBoundingClientRect().width.toFixed(1) };
            });
            await page.locator(".debug-overlay").screenshot({ path: `${EV}/del-r2-wrap-390.png` });
            return r;
        } finally { await ctx.close(); }
    },
    // U-1 keyboard limb + U-2 re-measure (desktop chromium).
    async u1_u2_keyboard_measure(b) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await bootDebug(page);
            await openOverlay(page);
            await seed(page, 80, TINTS);
            await page.waitForTimeout(300);
            const m = await page.evaluate(() => {
                const r = (s) => { const e = document.querySelector(s); if (!e) return null; const x = e.getBoundingClientRect(); return [+x.width.toFixed(1), +x.height.toFixed(1)]; };
                let inst = document.querySelector(".debug-overlay").__vueParentComponent;
                while (inst && inst.type?.__name !== "PointerDebugOverlay") inst = inst.parent;
                const payload = inst.setupState.buildExportJSON?.();
                const sc = document.querySelector(".debug-scroll");
                const focusables = [...document.querySelectorAll("a[href],button,input,select,textarea,[tabindex]")].filter((e) => !e.disabled && e.tabIndex >= 0 && e.getClientRects().length);
                return {
                    header: r(".debug-header"), btn: r(".debug-btn"), scrollH: sc.scrollHeight, clientH: sc.clientHeight,
                    scrollPE: getComputedStyle(sc).pointerEvents, scrollTabindex: sc.getAttribute("tabindex"),
                    liveRegions: document.querySelectorAll(".debug-overlay [aria-live], .debug-overlay [role=log], .debug-overlay [role=status]").length,
                    overlayBg: getComputedStyle(document.querySelector(".debug-overlay")).backgroundColor,
                    payloadBytes: payload ? new TextEncoder().encode(payload).length : null,
                    tabOrdinalsOfOverlay: focusables.map((e, i) => (e.closest(".debug-overlay") ? i + 1 : null)).filter(Boolean), tabTotal: focusables.length,
                };
            });
            // Keyboard: focus the header, Tab forward until focus is the scrollport (or leaves the overlay).
            await page.locator(".debug-header").focus();
            const path = [];
            for (let i = 0; i < 6; i++) {
                await page.keyboard.press("Tab");
                const f = await page.evaluate(() => { const a = document.activeElement; return { cls: (a.className?.toString() || a.tagName).slice(0, 40), inOverlay: !!a.closest?.(".debug-overlay"), isScroll: a.classList?.contains("debug-scroll") }; });
                path.push(f);
                if (f.isScroll || !f.inOverlay) break;
            }
            const st0 = await page.evaluate(() => document.querySelector(".debug-scroll").scrollTop);
            const reached = path.at(-1)?.isScroll === true;
            if (reached) { await page.keyboard.press("PageDown"); await page.waitForTimeout(400); }
            const st1 = await page.evaluate(() => document.querySelector(".debug-scroll").scrollTop);
            // Wheel limb (corroborative): wheel over the scrollport.
            const box = await page.locator(".debug-scroll").boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.wheel(0, 200); await page.waitForTimeout(400);
            const st2 = await page.evaluate(() => document.querySelector(".debug-scroll").scrollTop);
            await page.locator(".debug-overlay").screenshot({ path: `${EV}/u2-overlay-1440.png` });
            return { m, tabPath: path, reachedScrollByTab: reached, scrollTop: { beforeKey: st0, afterPageDown: st1, afterWheel: st2 } };
        } finally { await ctx.close(); }
    },
    // U-3: flag-drop on navigation — does the overlay survive a pane round trip / reload?
    async u3_flag_drop(b) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await bootDebug(page);
            const snap = (tag) => page.evaluate((tag) => ({ tag, hash: decodeURIComponent(location.hash), overlay: !!document.querySelector(".debug-overlay") }), tag);
            const s = [await snap("boot")];
            await page.evaluate(() => { location.hash = "#/gradient"; }); await page.waitForTimeout(2500); s.push(await snap("hash->gradient"));
            await page.evaluate(() => { location.hash = "#/"; }); await page.waitForTimeout(2500); s.push(await snap("hash->picker"));
            await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000); s.push(await snap("reload"));
            // Dock navigation (in-product): click the first nav link that targets gradient if present.
            await page.goto(BASE + "#/?debug=1", { waitUntil: "load" }); await page.waitForTimeout(3000);
            await page.evaluate(() => { location.hash = "#/?debug=1&space=lab"; }); await page.waitForTimeout(1500); s.push(await snap("query-rewrite"));
            const sliderBox = await page.locator(".sliders-console .channel-slider").first().boundingBox().catch(() => null);
            if (sliderBox) { await page.mouse.click(sliderBox.x + sliderBox.width * 0.4, sliderBox.y + sliderBox.height / 2); await page.waitForTimeout(1500); s.push(await snap("after-slider-commit")); }
            await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000); s.push(await snap("reload-after-commit"));
            return s;
        } finally { await ctx.close(); }
    },
};

async function tints(b, opts, tag) {
    const ctx = await b.newContext({ ...opts, deviceScaleFactor: 2 });
    try {
        const page = await ctx.newPage();
        await bootDebug(page);
        await openOverlay(page);
        await page.evaluate(() => document.querySelector(".debug-overlay").__vueParentComponent && 0);
        await seed(page, 6, TINTS);
        await page.waitForTimeout(300);
        const rows = await page.evaluate(() => [...document.querySelectorAll(".debug-event")].slice(0, 6).map((e) => ({ cls: [...e.classList].filter((c) => c !== "debug-event").join(","), bg: getComputedStyle(e).backgroundColor, etypeColor: getComputedStyle(e.querySelector(".debug-etype")).color, fca: getComputedStyle(e).forcedColorAdjust })));
        await page.locator(".debug-log").screenshot({ path: `${EV}/del-r1-tints-${tag}.png` });
        return { forced: await page.evaluate(() => matchMedia("(forced-colors: active)").matches), rows };
    } finally { await ctx.close(); }
}

const only = process.argv[2]?.split(",");
const browser = await chromium.launch({ headless: true });
try {
    for (const [name, fn] of Object.entries(cells)) {
        if (only && !only.includes(name)) continue;
        try { out.cells[name] = await fn(browser); } catch (e) { out.cells[name] = { error: String(e).slice(0, 400) }; }
        console.log("cell", name, "done");
    }
} finally {
    await browser.close();
}
writeFileSync(`${EV}/p3-debug${only ? "-" + only.join("+") : ""}.json`, JSON.stringify(out, null, 1));
console.log("wrote p3");
