// SS-8 B02 probe 2 — ConsoleRail live witnesses (D2-11 ring, D2-13 caption contrast, D2-02 WHCM dot,
// D2-06 clearance + filter-bleed A/B, D2-12 rendered font, D2-03 stagger census, MISS-6 gate bleed, D2-01 boot selection).
// Headless Chromium, ONE browser, a NEW context per cell, closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/b02-p2-rail.mjs
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EV = resolve(HERE, "../evidence/B02-picker-sliders-debug");
mkdirSync(EV, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:9000/";
const out = { base: BASE, at: new Date().toISOString(), cells: {} };

async function boot(page, hash = "#/") {
    await page.goto(BASE + hash, { waitUntil: "load" });
    await page.waitForSelector(".sliders-console .channel-rail-item", { timeout: 30000 });
    await page.waitForTimeout(1500);
}
const D = { viewport: { width: 1440, height: 900 } };

const cells = {
    async d2_11_ring_light(b) { return ring(b, { ...D, colorScheme: "light" }, "light"); },
    async d2_11_ring_dark(b) { return ring(b, { ...D, colorScheme: "dark" }, "dark"); },
    async d2_13_caption_light(b) { return caption(b, { ...D, colorScheme: "light" }, "light"); },
    async d2_13_caption_dark(b) { return caption(b, { ...D, colorScheme: "dark" }, "dark"); },
    // D2-02 dot under WHCM: select a channel, crop the dot in forced + unforced.
    async d2_02_dot_forced(b) { return dot(b, { ...D, forcedColors: "active" }, "fc"); },
    async d2_02_dot_unforced(b) { return dot(b, { ...D }, "nofc"); },
    // D2-06: rest clearance + three frames (no dot / dot / dot with filter:none) for the bleed A/B; plus hover/active rects.
    async d2_06_clearance(b) {
        const ctx = await b.newContext({ ...D, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?space=rgb&color=rgb(200%2080%2040)");
            const item = page.locator(".channel-rail-item").first();
            await item.click();
            await page.mouse.move(5, 5);
            await page.waitForTimeout(900);
            const geom = () => page.evaluate(() => {
                const r = (el) => { const x = el.getBoundingClientRect(); return [+x.left.toFixed(2), +x.top.toFixed(2), +x.right.toFixed(2), +x.bottom.toFixed(2)]; };
                const rail = document.querySelector(".channel-rail");
                const btn = document.querySelector('.channel-rail-item[aria-selected="true"]');
                const seat = btn?.querySelector(".rail-dot-seat");
                const dot = seat?.querySelector(".rail-dot");
                const filt = dot ? [dot, ...dot.querySelectorAll("*")].map((e) => getComputedStyle(e).filter).filter((f) => f && f !== "none") : [];
                return { rail: r(rail), btn: btn && r(btn), seat: seat && r(seat), dot: dot && r(dot), filters: filt.slice(0, 4) };
            });
            const rest = await geom();
            const clip = { x: rest.rail[0] - 8, y: rest.rail[1] - 8, width: rest.rail[2] - rest.rail[0] + 16, height: rest.rail[3] - rest.rail[1] + 16 };
            await page.screenshot({ path: `${EV}/d2-06-dot.png`, clip });
            await page.addStyleTag({ content: ".rail-dot, .rail-dot * { filter: none !important; }" });
            await page.waitForTimeout(300);
            await page.screenshot({ path: `${EV}/d2-06-dot-nofilter.png`, clip });
            await page.addStyleTag({ content: ".rail-dot-seat { visibility: hidden !important; }" });
            await page.waitForTimeout(300);
            await page.screenshot({ path: `${EV}/d2-06-nodot.png`, clip });
            return { rest, clip, dpr: 2 };
        } finally { await ctx.close(); }
    },
    // D2-12: the platform font that actually renders each rail glyph (CDP).
    async d2_12_rendered_font(b) {
        const res = {};
        for (const sp of ["ictcp", "jzazbz"]) {
            const ctx = await b.newContext(D);
            try {
                const page = await ctx.newPage();
                await boot(page, `#/?space=${sp}`);
                const cdp = await ctx.newCDPSession(page);
                await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
                const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
                const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: ".rail-glyph" });
                res[sp] = [];
                for (const id of nodeIds) {
                    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId: id });
                    const { outerHTML } = await cdp.send("DOM.getOuterHTML", { nodeId: id });
                    res[sp].push({ glyph: outerHTML.replace(/<[^>]+>/g, ""), fonts });
                }
                res[sp + "_rects"] = await page.evaluate(() => [...document.querySelectorAll(".rail-glyph")].map((g) => { const r = g.getBoundingClientRect(); return [g.textContent, +r.width.toFixed(2), +r.height.toFixed(2)]; }));
                await cdp.detach();
            } finally { await ctx.close(); }
        }
        return res;
    },
    // D2-03: live census of .stagger-children direct children carrying an :active transform rule, every route.
    async d2_03_stagger_census(b) {
        const ctx = await b.newContext(D);
        try {
            const page = await ctx.newPage();
            const routes = ["#/", "#/palettes", "#/browse", "#/extract", "#/mix", "#/generate", "#/gradient", "#/atmosphere", "#/blob"];
            const res = [];
            for (const r of routes) {
                await page.goto(BASE + r, { waitUntil: "load" });
                await page.waitForTimeout(3500);
                res.push(await page.evaluate((route) => {
                    const containers = [...document.querySelectorAll(".stagger-children")];
                    const kids = new Set(containers.flatMap((c) => [...c.children]));
                    const hits = [];
                    const walk = (rules) => {
                        for (const rule of rules) {
                            if (rule.cssRules && !(rule instanceof CSSStyleRule)) { walk(rule.cssRules); continue; }
                            if (!(rule instanceof CSSStyleRule)) continue;
                            if (rule.cssRules?.length) walk(rule.cssRules);
                            if (!rule.selectorText.includes(":active") || !(rule.style.transform || rule.style.scale || rule.style.translate)) continue;
                            for (const sel of rule.selectorText.split(",")) {
                                if (!sel.includes(":active")) continue;
                                const base = sel.replace(/:active/g, "").trim() || "*";
                                let m = [];
                                try { m = [...document.querySelectorAll(base)]; } catch { continue; }
                                for (const el of m) if (kids.has(el)) hits.push({ sel: sel.trim().slice(0, 80), el: el.tagName.toLowerCase() + "." + [...el.classList].slice(0, 3).join("."), tf: rule.style.transform || rule.style.scale || rule.style.translate });
                            }
                        }
                    };
                    for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
                    const uniq = [...new Map(hits.map((h) => [h.sel + h.el, h])).values()];
                    return { route, containers: containers.length, children: kids.size, hits: uniq.length, sample: uniq.slice(0, 6) };
                }, r));
            }
            return res;
        } finally { await ctx.close(); }
    },
    // MISS-6: touch gate bleed across spaces sharing a bare key (`b`: rgb blue -> lab b*), and its live window.
    async miss6_gate_bleed(b) {
        const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?space=rgb&color=rgb(120%2090%2060)");
            const gateB = () => page.evaluate(() => {
                const t = [...document.querySelectorAll(".sliders-console [role=slider]")].find((x) => x.getAttribute("aria-label") === "B channel");
                return t ? t.closest(".touch-gate-target").classList.contains("touch-gate-active") : null;
            });
            const box = await page.locator(".sliders-console .channel-slider").nth(2).boundingBox();
            await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
            await page.waitForTimeout(200);
            const afterTap = await gateB();
            const t0 = Date.now();
            await page.evaluate(() => { location.hash = location.hash.replace("space=rgb", "space=lab"); });
            await page.waitForTimeout(600);
            const labLabels = await page.evaluate(() => [...document.querySelectorAll(".sliders-console [role=slider]")].map((t) => t.getAttribute("aria-label")).join(","));
            const samples = [];
            for (let i = 0; i < 24; i++) { samples.push([Date.now() - t0, await gateB()]); if (samples.at(-1)[1] === false) break; await page.waitForTimeout(250); }
            return { afterTapRgbB: afterTap, labLabels, samplesMsActive: samples };
        } finally { await ctx.close(); }
    },
    // D2-01 / MISS-2: boot selection state (owner-ruling item; live posture recorded only).
    async d2_01_boot_selection(b) {
        const ctx = await b.newContext(D);
        try {
            const page = await ctx.newPage();
            await boot(page);
            return await page.evaluate(() => [...document.querySelectorAll(".channel-rail-item")].map((t) => [t.getAttribute("aria-label"), t.getAttribute("aria-selected"), t.getAttribute("tabindex"), !!t.querySelector(".rail-dot-seat")]));
        } finally { await ctx.close(); }
    },
    // MISS-4: the announcement posture (audit input; recorded, not decided).
    async miss4_announce_posture(b) {
        const ctx = await b.newContext(D);
        try {
            const page = await ctx.newPage();
            await boot(page, "#/?space=rgb&color=rgb(128%20128%20128)");
            const thumb = page.locator(".sliders-console [role=slider]").first();
            await thumb.focus();
            await page.keyboard.press("ArrowRight");
            await page.waitForTimeout(300);
            return await page.evaluate(() => ({
                meterLive: [...document.querySelectorAll(".channel-meter")].map((m) => m.getAttribute("aria-live")),
                thumbs: [...document.querySelectorAll(".sliders-console [role=slider]")].map((t) => ({ label: t.getAttribute("aria-label"), valuetext: t.getAttribute("aria-valuetext"), valuenow: t.getAttribute("aria-valuenow") })),
                liveRegions: [...document.querySelectorAll(".sliders-console [aria-live]")].map((e) => e.className.slice(0, 40) + ":" + e.getAttribute("aria-live")),
            }));
        } finally { await ctx.close(); }
    },
};

async function ring(b, opts, tag) {
    const ctx = await b.newContext({ ...opts, deviceScaleFactor: 2 });
    try {
        const page = await ctx.newPage();
        await boot(page, "#/?space=rgb&color=rgb(200%2080%2040)");
        const r = await page.evaluate(() => {
            const rail = document.querySelector(".channel-rail");
            const cs = getComputedStyle(rail);
            const item = document.querySelector(".channel-rail-item");
            const x = rail.getBoundingClientRect();
            return { border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth}`, bg: cs.backgroundColor, letterInk: getComputedStyle(item).color, restInkVar: rail.style.getPropertyValue("--console-rest-ink"), rect: [x.x, x.y, x.width, x.height] };
        });
        await page.screenshot({ path: `${EV}/d2-11-rail-${tag}.png`, clip: { x: r.rect[0] - 6, y: r.rect[1] - 6, width: r.rect[2] + 12, height: r.rect[3] + 12 } });
        return r;
    } finally { await ctx.close(); }
}

async function caption(b, opts, tag) {
    const ctx = await b.newContext({ ...opts, deviceScaleFactor: 2 });
    try {
        const page = await ctx.newPage();
        await boot(page, "#/?space=rgb&color=rgb(200%2080%2040)");
        await page.locator(".channel-rail-item").first().hover();
        await page.waitForSelector("[role=tooltip], [data-reka-popper-content-wrapper]", { timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(900);
        const r = await page.evaluate(() => {
            const caps = [...document.querySelectorAll("p.text-mono-small")].filter((p) => p.offsetParent !== null || p.getClientRects().length);
            const p = caps.at(-1);
            if (!p) return { error: "no caption" };
            const cs = getComputedStyle(p);
            const x = p.getBoundingClientRect();
            let op = 1; for (let e = p; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
            return { text: p.textContent, color: cs.color, opacity: cs.opacity, chainOpacity: op, cls: p.className, fontSize: cs.fontSize, rect: [x.x, x.y, x.width, x.height] };
        });
        if (r.rect) await page.screenshot({ path: `${EV}/d2-13-caption-${tag}.png`, clip: { x: r.rect[0] - 4, y: r.rect[1] - 4, width: r.rect[2] + 8, height: r.rect[3] + 8 } });
        return r;
    } finally { await ctx.close(); }
}

async function dot(b, opts, tag) {
    const ctx = await b.newContext({ ...opts, deviceScaleFactor: 2 });
    try {
        const page = await ctx.newPage();
        await boot(page, "#/?space=rgb&color=rgb(30%20160%2060)");
        await page.locator(".channel-rail-item").nth(1).click();
        await page.mouse.move(5, 5);
        await page.waitForTimeout(900);
        const r = await page.evaluate(() => {
            const seat = document.querySelector(".rail-dot-seat");
            if (!seat) return { error: "no dot" };
            const sw = seat.querySelector(".watercolor-swatch") ?? seat.firstElementChild;
            const x = seat.getBoundingClientRect();
            return { forced: matchMedia("(forced-colors: active)").matches, swatchClass: sw?.className?.toString().slice(0, 80), fca: getComputedStyle(sw).forcedColorAdjust, rect: [x.x, x.y, x.width, x.height] };
        });
        if (r.rect) await page.screenshot({ path: `${EV}/d2-02-dot-${tag}.png`, clip: { x: r.rect[0] - 2, y: r.rect[1] - 2, width: r.rect[2] + 4, height: r.rect[3] + 4 } });
        return r;
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
writeFileSync(`${EV}/p2-rail${only ? "-" + only.join("+") : ""}.json`, JSON.stringify(out, null, 1));
console.log("wrote p2");
