// SS-8 · B09 ColorNutritionLabel cells — headless Chromium, ONE browser, one context per cell.
// ~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B09-cnl.mjs [cell ...]
import { chromium } from "playwright";
import { resolve } from "node:path";
import { open, STATE, save, pixels, inkAndBg, ratio, EV } from "./B09-lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (c) => want.size === 0 || want.has(c);
const browser = await chromium.launch();
const out = {};
const pickSpace = async (page, label) => {
    await page.locator(".about-card .pane-header-title button, .about-card .pane-header-title [role=combobox]").first().click();
    await page.waitForTimeout(400);
    await page.getByRole("option", { name: label, exact: true }).first().click();
    await page.waitForTimeout(1500);
};
try {
    // 0256 · CNL-2 two-click (grey + LCh/OKLCh), CNL-3 ?color=black boot, persistence loop after reload
    if (on("cnl2")) {
        out.cnl2 = [];
        for (const [seed, target] of [["?space=rgb&color=rgb(128%20128%20128)", "LCh"], ["?space=rgb&color=rgb(128%20128%20128)", "OKLCh"]]) {
            const { ctx, page, errors } = await open(browser, "#/" + seed);
            try {
                const before = await page.evaluate(STATE);
                let clickErr = null;
                try { await pickSpace(page, target); } catch (e) { clickErr = String(e).slice(0, 200); }
                const after = await page.evaluate(STATE);
                await page.screenshot({ path: resolve(EV, `0256-cnl2-grey-${target}.png`) });
                await page.reload({ waitUntil: "load", timeout: 45000 }).catch((e) => errors.push("RELOAD: " + String(e).slice(0, 120)));
                await page.waitForTimeout(3500);
                const reloaded = await page.evaluate(STATE);
                out.cnl2.push({ seed, target, before, clickErr, after, reloaded, errors });
            } finally { await ctx.close(); }
        }
        for (const seed of ["?color=black", "?space=rgb&color=rgb(0%200%200)", "?color=white&space=hsl"]) {
            const { ctx, page, errors } = await open(browser, "#/" + seed, { settle: 3500 });
            try {
                const s = await page.evaluate(STATE);
                await page.screenshot({ path: resolve(EV, `0256-cnl3-${seed.replace(/[^a-z0-9]+/gi, "_")}.png`) });
                await page.goto(ORIGIN_ROOT(), { waitUntil: "load", timeout: 45000 }).catch((e) => errors.push("GOTO2: " + String(e).slice(0, 120)));
                await page.waitForTimeout(3500);
                const plainReload = await page.evaluate(STATE);
                out.cnl2.push({ seed, boot: s, plainReloadAfter: plainReload, errors });
            } finally { await ctx.close(); }
        }
    }

    // 0257 · C-2 null-region census through the real module + live inline style at a null colour
    if (on("c2")) {
        const { ctx, page, errors } = await open(browser, "#/");
        try {
            const census = await page.evaluate(async () => {
                const m = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/ink.ts");
                const nulls = [];
                let n = 0;
                for (let L = 0; L <= 1.0001; L += 0.01)
                    for (let C = 0; C <= 0.5001; C += 0.05)
                        for (let h = 0; h < 360; h += 30) {
                            n++;
                            const s = `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${h})`;
                            if (m.contrastInkFor(s) == null) nulls.push(s);
                        }
                return { scanned: n, nullCount: nulls.length, nulls: nulls.slice(0, 80),
                    Lrange: nulls.length ? [Math.min(...nulls.map((s) => +s.split(/[( ]/)[1])), Math.max(...nulls.map((s) => +s.split(/[( ]/)[1]))] : null,
                    Cmin: nulls.length ? Math.min(...nulls.map((s) => +s.split(" ")[1])) : null };
            });
            out.c2 = { census, errors };
        } finally { await ctx.close(); }
        const target = out.c2.census.nulls[0];
        if (target) {
            const { ctx, page, errors } = await open(browser, "#/?space=oklch&color=" + encodeURIComponent(target));
            try {
                const chip = page.locator(".about-card [data-o18=graph-node]").first();
                await chip.hover();
                await page.waitForTimeout(400);
                const live = await page.evaluate(() => {
                    const n = [...document.querySelectorAll(".about-card [data-o18=graph-node]")].find((e) => e.getAttribute("style"));
                    return n ? { style: n.getAttribute("style"), computedColor: getComputedStyle(n).color, bg: getComputedStyle(n).backgroundColor } : null;
                });
                const st = await page.evaluate(STATE);
                out.c2.live = { target, live, href: st.href, facts: st.facts, errors };
            } finally { await ctx.close(); }
        }
    }

    // 0258 · C-5 render census: beforeUpdate hooks on CNL + its descendants, 30-step drag of the picker's first slider
    if (on("c5")) {
        const { ctx, page, errors } = await open(browser, "#/");
        try {
            const armed = await page.evaluate(() => {
                const el = document.querySelector(".about-card [data-space-facts]");
                let inst = el.__vueParentComponent;
                while (inst && inst.type?.__name !== "ColorNutritionLabel") inst = inst.parent;
                if (!inst) return { ok: false };
                window.__c5 = { self: 0, desc: 0, byName: {} };
                const hook = (i, isSelf) => { (i.bu ||= []).push(() => { if (isSelf) window.__c5.self++; else { window.__c5.desc++; const n = i.type?.__name || i.type?.name || "anon"; window.__c5.byName[n] = (window.__c5.byName[n] || 0) + 1; } }); };
                hook(inst, true);
                const walk = (vn) => { if (!vn) return; if (vn.component) { hook(vn.component, false); walk(vn.component.subTree); } if (Array.isArray(vn.children)) vn.children.forEach((c) => typeof c === "object" && walk(c)); if (vn.dynamicChildren) {} };
                walk(inst.subTree);
                return { ok: true, name: inst.type.__name };
            });
            const thumb = page.locator("[role=slider]").first();
            const box = await thumb.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            for (let i = 1; i <= 30; i++) { await page.mouse.move(box.x + box.width / 2 + i * 4, box.y + box.height / 2); await page.waitForTimeout(16); }
            await page.mouse.up();
            await page.waitForTimeout(500);
            out.c5 = { armed, counts: await page.evaluate(() => window.__c5), slider: await thumb.getAttribute("aria-label"), errors };
        } finally { await ctx.close(); }
    }

    // 0259 · D-11 componentInk pixels (light+dark) + inline style chroma
    // 0261 · D-5/D-20 geometry · 0262 · D-6/CNL-19 Alert/surface · 0264 · D-4 rendered families (CDP platform fonts)
    if (on("d11") || on("geom") || on("d4")) {
        out.d11 = []; out.geom = []; out.d4 = [];
        for (const scheme of ["light", "dark"]) {
            const { ctx, page, errors } = await open(browser, "#/", { scheme });
            try {
                const name = page.locator(".about-card [data-o18=component-name]").first();
                await name.scrollIntoViewIfNeeded();
                await page.waitForTimeout(400);
                const style = await name.getAttribute("style");
                const b = await name.boundingBox();
                const buf = await page.screenshot({ clip: { x: b.x, y: b.y, width: b.width, height: b.height } });
                const px = inkAndBg(await pixels(page, buf));
                const neutral = await page.evaluate(() => getComputedStyle(document.querySelector(".about-card .plate-ink") || document.body).color);
                out.d11.push({ scheme, inlineStyle: style, computed: await name.evaluate((e) => getComputedStyle(e).color), pixel: px, neutralPlateInk: neutral, errors });
                if (scheme === "light") await name.screenshot({ path: resolve(EV, "0259-d11-name-light.png") });
                const g = await page.evaluate(() => {
                    const card = document.querySelector(".about-card");
                    const port = card.querySelector(".fading-scroll");
                    const cnl = card.querySelector("[data-space-facts]");
                    const alert = card.querySelectorAll("[role=alert], [data-slot=alert], .alert");
                    const def = card.querySelector("[data-fact=definition]");
                    return { cardW: card.getBoundingClientRect().width, cardMaxW: getComputedStyle(card).maxWidth, portSH: port.scrollHeight, portCH: port.clientHeight,
                        cnlH: +cnl.getBoundingClientRect().height.toFixed(1), alertCount: alert.length,
                        definition: { tag: def.tagName, fontSize: getComputedStyle(def).fontSize, bg: getComputedStyle(def.parentElement).backgroundColor } };
                });
                out.geom.push({ scheme, ...g });
                if (scheme === "light") {
                    const cdp = await ctx.newCDPSession(page);
                    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
                    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
                    const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: ".about-card [data-space-facts] h2.font-display, .about-card .pane-header-title" });
                    for (const id of nodeIds) {
                        const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId: id });
                        const { computedStyle } = await cdp.send("CSS.getComputedStyleForNode", { nodeId: id });
                        const ff = computedStyle.find((p) => p.name === "font-family")?.value;
                        const { outerHTML } = await cdp.send("DOM.getOuterHTML", { nodeId: id });
                        out.d4.push({ node: outerHTML.replace(/<!--[\s\S]*?-->/g, "").slice(0, 70), declared: ff, painted: fonts });
                    }
                    out.d4.push({ fontsApi: await page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].filter((f) => /fraunces/i.test(f.family)).map((f) => `${f.family}|${f.weight}|${f.style}|${f.status}`); }) });
                }
            } finally { await ctx.close(); }
        }
    }

    // 0263 · C-7 touch latch: tap a chip on a touch context; count lit nodes; tap elsewhere; recount
    if (on("c7")) {
        const { ctx, page, errors } = await open(browser, "#/", { viewport: { width: 390, height: 844 }, touch: true, mobile: true, dsf: 2 });
        try {
            const lit = () => page.evaluate(() => document.querySelectorAll(".about-card [data-o18=graph-node][style*=background]").length);
            const chip = page.locator(".about-card [data-o18=graph-node]").first();
            await chip.scrollIntoViewIfNeeded();
            const r0 = await lit();
            await chip.tap();
            await page.waitForTimeout(400);
            const r1 = await lit();
            await page.locator(".about-card [data-fact=definition]").tap().catch(() => {});
            await page.waitForTimeout(400);
            const r2 = await lit();
            await page.locator(".about-card h2").first().tap().catch(() => {});
            await page.waitForTimeout(400);
            const r3 = await lit();
            const chipNodes = await page.evaluate(() => document.querySelector(".about-card [data-o18=graph-node]").parentElement.querySelectorAll("[data-o18=graph-node]").length);
            out.c7 = { before: r0, afterTapChip: r1, afterTapDefinition: r2, afterTapHeading: r3, nodesInFirstPath: chipNodes, errors };
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
}
function ORIGIN_ROOT() { return (process.env.B09_ORIGIN || "http://localhost:9000/") + "#/"; }
save(`cnl-${[...want].join("-") || "all"}`, out);
console.log(JSON.stringify(out, null, 0).slice(0, 9000));
