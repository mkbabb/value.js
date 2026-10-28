// SS-8 B02 probe 4 — follow-ups the first three probes left open:
// D2-06 grown state (hover/press) clearance, DEL R-2 short-specimen baseline (wrap test),
// DEL R-4 / U-6 orphan repro (release over the overlay -> false FROZEN, tints), U-3 in-product dock navigation flag-drop.
// Headless Chromium, ONE browser, a NEW context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/b02-p4-followups.mjs
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EV = resolve(HERE, "../evidence/B02-picker-sliders-debug");
mkdirSync(EV, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:9000/";
const out = { base: BASE, at: new Date().toISOString(), cells: {} };
const D = { viewport: { width: 1440, height: 900 } };

async function boot(page, hash, sel) {
    await page.goto(BASE + hash, { waitUntil: "load", timeout: 120000 });
    await page.waitForSelector(sel, { timeout: 90000 });
    await page.waitForTimeout(1500);
}
async function overlayInst(page) {
    return page.evaluate(() => !!document.querySelector(".debug-overlay"));
}
async function seed(page, n, types) {
    return page.evaluate(({ n, types }) => {
        let inst = document.querySelector(".debug-overlay").__vueParentComponent;
        while (inst && inst.type?.__name !== "PointerDebugOverlay") inst = inst.parent;
        const dbg = inst.setupState.debug;
        dbg.clear?.();
        for (let i = 0; i < n; i++) dbg.log(types[i % types.length], 1, "span.slider-thumb", false, "no-cap");
        return dbg.state.events.length;
    }, { n, types });
}
async function openOverlay(page) {
    const open = await page.evaluate(() => !document.querySelector(".debug-overlay").classList.contains("debug-collapsed"));
    if (!open) await page.locator(".debug-overlay .debug-header").click();
    await page.waitForTimeout(400);
}

const cells = {
    // D2-06 arms 2-3: the grown (hover / pressed) state of the selected rail item, rect + painted extent.
    async d2_06_grown(b) {
        const ctx = await b.newContext({ ...D, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?space=rgb&color=rgb(200%2080%2040)", ".sliders-console .channel-rail-item");
            const item = page.locator(".channel-rail-item").first();
            await item.click();
            await page.mouse.move(5, 5);
            await page.waitForTimeout(900);
            const geom = () => page.evaluate(() => {
                const r = (el) => { const x = el.getBoundingClientRect(); return [+x.left.toFixed(2), +x.top.toFixed(2), +x.right.toFixed(2), +x.bottom.toFixed(2)]; };
                const rail = document.querySelector(".channel-rail");
                const btn = document.querySelector('.channel-rail-item[aria-selected="true"]');
                const dot = btn?.querySelector(".rail-dot");
                const R = r(rail), Dt = dot ? r(dot) : null;
                return { rail: R, btn: btn && r(btn), dot: Dt, btnTransform: btn && getComputedStyle(btn).transform, clearL: Dt && +(Dt[0] - R[0]).toFixed(2), clearR: Dt && +(R[2] - Dt[2]).toFixed(2) };
            });
            const rest = await geom();
            const bb = await item.boundingBox();
            await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
            await page.waitForTimeout(700);
            const hover = await geom();
            await page.mouse.down();
            await page.waitForTimeout(450);
            const pressed = await geom();
            const clip = { x: rest.rail[0] - 8, y: rest.rail[1] - 8, width: rest.rail[2] - rest.rail[0] + 16, height: 60 };
            await page.screenshot({ path: `${EV}/d2-06-pressed.png`, clip });
            await page.mouse.up();
            return { rest, hover, pressed };
        } finally { await ctx.close(); }
    },
    // DEL R-2 baseline: same 390x844 cell, short specimen vs worst 24-ch specimen; line count per row.
    async del_r2_baseline(b) {
        const res = {};
        for (const [tag, spec] of [["short", "sl:r:up"], ["worst24", "sl:kelvin:cancel-release"]]) {
            const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
            try {
                const page = await ctx.newPage();
                await boot(page, "#/?debug=1", ".debug-overlay .debug-header");
                await openOverlay(page);
                await seed(page, 40, [spec]);
                await page.waitForTimeout(400);
                res[tag] = await page.evaluate(() => {
                    const sc = document.querySelector(".debug-scroll");
                    const sr = sc.getBoundingClientRect();
                    const ev = document.querySelector(".debug-event");
                    const et = ev.querySelector(".debug-etype");
                    const lh = parseFloat(getComputedStyle(et).lineHeight) || null;
                    const rows = [...document.querySelectorAll(".debug-event")];
                    const full = rows.filter((e) => { const x = e.getBoundingClientRect(); return x.top >= sr.top && x.bottom <= sr.bottom; });
                    return { rowH: +ev.getBoundingClientRect().height.toFixed(2), etypeH: +et.getBoundingClientRect().height.toFixed(2), etypeLines: lh ? Math.round(et.getBoundingClientRect().height / lh) : null, etypeLH: lh, etypeFont: getComputedStyle(et).font, etypeText: et.textContent, eventW: +ev.getBoundingClientRect().width.toFixed(1), etypeW: +et.getBoundingClientRect().width.toFixed(1), scrollH: +sr.height.toFixed(1), visibleFull: full.length };
                });
                await page.locator(".debug-overlay").screenshot({ path: `${EV}/del-r2-${tag}-390.png` });
            } finally { await ctx.close(); }
        }
        return res;
    },
    // DEL R-4 + U-6: real orphan repro — pointerdown on a slider, release over the overlay header (LEAK-1),
    // wait past the 2500 ms freeze threshold, read the logged events + the rendered tints.
    async del_r4_orphan_repro(b) {
        const ctx = await b.newContext({ ...D, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?debug=1&space=rgb&color=rgb(128%20128%20128)", ".debug-overlay .debug-header");
            await openOverlay(page);
            await seed(page, 0, ["x"]);
            const s = await page.locator(".sliders-console .channel-slider").first().boundingBox();
            const h = await page.locator(".debug-overlay .debug-header").boundingBox();
            await page.mouse.move(s.x + s.width * 0.3, s.y + s.height / 2);
            await page.mouse.down();
            await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2, { steps: 8 });
            await page.mouse.up();
            await page.waitForTimeout(4500);
            const r = await page.evaluate(() => {
                let inst = document.querySelector(".debug-overlay").__vueParentComponent;
                while (inst && inst.type?.__name !== "PointerDebugOverlay") inst = inst.parent;
                const st = inst.setupState.debug.state;
                return {
                    activePointers: st.activePointers ? (st.activePointers.size ?? Object.keys(st.activePointers).length) : null,
                    frozen: st.frozen ?? st.isFrozen ?? null,
                    stateKeys: Object.keys(st),
                    events: st.events.slice(-12).map((e) => e.type ?? e.t ?? JSON.stringify(e).slice(0, 60)),
                    rows: [...document.querySelectorAll(".debug-event")].slice(0, 8).map((e) => [[...e.classList].filter((c) => c !== "debug-event").join(","), getComputedStyle(e).backgroundColor, e.querySelector(".debug-etype")?.textContent]),
                    headerText: document.querySelector(".debug-header")?.textContent.replace(/\s+/g, " ").trim().slice(0, 120),
                };
            });
            await page.locator(".debug-overlay").screenshot({ path: `${EV}/del-r4-orphan-1440.png` });
            return r;
        } finally { await ctx.close(); }
    },
    async del_r4_orphan_canvas(b) {
        const ctx = await b.newContext({ ...D, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?debug=1&space=rgb&color=rgb(128%20128%20128)", ".debug-overlay .debug-header");
            await openOverlay(page);
            await seed(page, 0, ["x"]);
            const c = await page.locator("canvas").first().boundingBox();
            const h = await page.locator(".debug-overlay .debug-header").boundingBox();
            await page.mouse.move(c.x + c.width * 0.5, c.y + c.height * 0.5);
            await page.mouse.down();
            await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2, { steps: 8 });
            await page.mouse.up();
            await page.waitForTimeout(4500);
            const r = await page.evaluate(() => {
                let inst = document.querySelector(".debug-overlay").__vueParentComponent;
                while (inst && inst.type?.__name !== "PointerDebugOverlay") inst = inst.parent;
                const st = inst.setupState.debug.state;
                return { frozen: st.frozen, frozenSince: st.frozenSince, events: st.events.slice(-12).map((e) => e.type), rows: [...document.querySelectorAll(".debug-event")].slice(0, 8).map((e) => [[...e.classList].filter((c) => c !== "debug-event").join(","), getComputedStyle(e).backgroundColor, e.querySelector(".debug-etype")?.textContent]) };
            });
            await page.locator(".debug-overlay").screenshot({ path: `${EV}/del-r4-orphan-canvas-1440.png` });
            return r;
        } finally { await ctx.close(); }
    },
    // U-3: in-product navigation (dock), not a hand-written hash: does `debug=1` survive a pane round trip + reload?
    async u3_dock_nav(b) {
        const ctx = await b.newContext(D);
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?debug=1", ".debug-overlay .debug-header");
            const snap = (tag) => page.evaluate((tag) => ({ tag, hash: decodeURIComponent(location.hash), overlay: !!document.querySelector(".debug-overlay") }), tag);
            const s = [await snap("boot")];
            const MI = "[role=menuitem],[role=option],[role=menuitemradio]";
            const pick = async (trigger, target, tag) => {
                const t = page.locator("button.view-select-trigger").first();
                if (!(await t.count())) { s.push({ tag: tag + ":no-trigger", trigger: String(trigger) }); return; }
                await t.click(); await page.waitForTimeout(900);
                const items = await page.evaluate((MI) => [...document.querySelectorAll(MI)].map((e) => e.textContent.trim().slice(0, 24)), MI);
                const it = page.locator(MI).filter({ hasText: target }).first();
                if (!(await it.count())) { s.push({ tag: tag + ":no-item", items }); await page.keyboard.press("Escape"); return; }
                await it.click(); await page.waitForTimeout(2500);
                s.push({ ...(await snap(tag)), items });
            };
            await pick("Home", /gradient/i, "dock->gradient");
            await pick(/gradient/i, /home/i, "dock->home");
            await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000); s.push(await snap("reload"));
            return s;
        } finally { await ctx.close(); }
    },
};

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
writeFileSync(`${EV}/p4-followups${only ? "-" + only.join("+") : ""}.json`, JSON.stringify(out, null, 1));
console.log("wrote p4");
