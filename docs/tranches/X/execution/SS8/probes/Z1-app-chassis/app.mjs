// SERVED MODEL: claude-opus-5-5 — SS-8 Z1 App + layout cells (Chromium headless; one browser per
// run, one context per cell, all closed in finally). CELLS env picks a subset.
import { chromium } from "playwright";
import { boot, runCells, ROUTES, parkOnDock, save, EVID } from "./lib.mjs";

const LABEL = { "/": "Home", "/palettes": "Palettes", "/browse": "Browse", "/extract": "Extract", "/mix": "Mix", "/generate": "Generate", "/gradient": "Gradient", "/atmosphere": "Atmosphere", "/blob": "Blob", "/admin/users": "Users", "/admin/names": "Names", "/admin/audit": "Audit log", "/admin/flagged": "Flagged", "/admin/tags": "Tags", "/does-not-exist": "Not found" };

const shell = (page) => page.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none" && !(cs.clip === "rect(0px, 0px, 0px, 0px)") && cs.clipPath !== "inset(50%)"; };
    const vs = document.querySelector('[aria-label="Select view"]');
    const panes = [...document.querySelectorAll(".pane-wrapper")].map((w) => { const r = w.getBoundingClientRect(); return { pane: w.dataset.pane ?? w.className.toString().slice(0, 60), x: Math.round(r.x), y: Math.round(r.y), w: +r.width.toFixed(1), h: Math.round(r.height) }; });
    const pc = document.querySelector(".pane-container");
    return {
        href: location.href, title: document.title,
        h1: [...document.querySelectorAll("h1")].map((h) => ({ t: h.textContent.trim(), srOnly: h.classList.contains("sr-only"), vis: vis(h), inMain: !!h.closest("main") })),
        main: document.querySelectorAll("main").length,
        status: [...document.querySelectorAll("main > [role=status]")].map((e) => e.textContent.trim()),
        marks: performance.getEntriesByType("mark").map((m) => m.name).filter((n) => /overture/.test(n)),
        viewSelect: vs ? { text: vs.textContent.trim(), gold: !!vs.querySelector(".gold-ink") || vs.classList.contains("gold-ink") || !!vs.closest(".gold-ink") } : null,
        doc: { sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth },
        panes, grid: pc ? getComputedStyle(pc).gridTemplateColumns : null, pc: pc ? +pc.getBoundingClientRect().width.toFixed(1) : null,
        gutter: getComputedStyle(document.querySelector(".app-layout")).paddingLeft,
        paneMax: getComputedStyle(document.documentElement).getPropertyValue("--pane-max").trim(),
        textLen: (document.querySelector("main")?.innerText ?? "").length,
        sliders: document.querySelectorAll('main [role=slider], main input[type=range]').length,
    };
});

const ctxOf = (browser, o = {}) => browser.newContext({ viewport: { width: 1440, height: 900 }, ...o });

await runCells(chromium, {
    // Z-App-1/2/5 · Z-Dock-14 · Z-chassis-2/3 · Z-LG-9: every route cold, 1440x900.
    async routes(browser) {
        const ctx = await ctxOf(browser); const out = {};
        try { const p = await ctx.newPage(); for (const r of [...ROUTES, "/does-not-exist"]) { try { await boot(p, r, 2600); out[r] = { label: LABEL[r], ...(await shell(p)) }; } catch (e) { out[r] = { error: String(e).slice(0, 160) }; } } } finally { await ctx.close(); }
        return out;
    },
    // Z-App-3/4: cold deep links, overture marks + boot URL after 7s.
    async deeplink(browser) {
        const out = {};
        for (const r of ["/", "/generate", "/browse", "/gradient", "/extract", "/atmosphere"]) {
            const ctx = await ctxOf(browser);
            try { const p = await ctx.newPage(); try { await boot(p, r, 7000); } catch (e) { out[r] = { error: String(e).slice(0, 160) }; continue; } const s = await shell(p);
                out[r] = { href: s.href, marks: s.marks, blob: await p.locator("canvas.goo-blob-canvas, [data-testid=goo-blob]").count(),
                    overture: await p.evaluate(() => [...document.querySelectorAll("[data-overture],[data-overture-beat],[data-b4]")].map((e) => [...e.attributes].filter((a) => /overture|b4|beat/.test(a.name)).map((a) => a.name + "=" + a.value).join(" ")).slice(0, 5)) };
            } finally { await ctx.close(); }
        }
        return out;
    },
    // Z-App-6: mount host.
    async mount(browser) {
        const ctx = await ctxOf(browser);
        try { const p = await ctx.newPage(); await boot(p, "/", 2500);
            return await p.evaluate(() => ({ bodyId: document.body.id, bodyClass: document.body.className, paper: document.body.hasAttribute("data-paper-field"),
                app: (() => { const a = document.getElementById("app"); return a ? { tag: a.tagName, parent: a.parentElement.tagName, isBody: a === document.body } : null; })(),
                vueRoot: document.querySelector("#app")?.__vue_app__ ? "#app" : (document.body.__vue_app__ ? "body" : "?"),
                bodyKids: [...document.body.children].map((e) => e.tagName + (e.id ? "#" + e.id : "")) }));
        } finally { await ctx.close(); }
    },
    // Z-App-8 · Z-LG-1/4/5/10 · Z-chassis-4: 390 mobile, 720x450@2 zoom-equivalent, 3440 ultrawide, 1080x1750 portrait.
    async viewports(browser) {
        const vps = { m390: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }, z720: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }, d1440: {}, u3440: { viewport: { width: 3440, height: 1440 } }, p1080: { viewport: { width: 1080, height: 1750 } } };
        const out = {};
        for (const [k, o] of Object.entries(vps)) {
            const ctx = await ctxOf(browser, o); out[k] = {};
            try { const p = await ctx.newPage(); for (const r of ["/", "/generate", "/browse", "/palettes", "/gradient", "/blob", "/atmosphere", "/admin/users"]) { try { await boot(p, r, 2200); const s = await shell(p); out[k][r] = { doc: s.doc, panes: s.panes, grid: s.grid, pc: s.pc, gutter: s.gutter, paneMax: s.paneMax, textLen: s.textLen, sliders: s.sliders }; } catch (e) { out[k][r] = { error: String(e).slice(0, 160) }; } } } finally { await ctx.close(); }
        }
        return out;
    },
    // Z-App-9: crossing 1440 -> 720 -> 1440 keeps canvases / pane wrappers (identity tags).
    async resize(browser) {
        const ctx = await ctxOf(browser);
        try { const p = await ctx.newPage(); await boot(p, "/blob", 3000);
            const tag = () => p.evaluate(() => { let i = 0; for (const e of document.querySelectorAll("canvas, .pane-wrapper")) e.__z1 = "t" + i++; return i; });
            const count = () => p.evaluate(() => { const all = [...document.querySelectorAll("canvas, .pane-wrapper")]; return { n: all.length, kept: all.filter((e) => e.__z1).length, gl: [...document.querySelectorAll("canvas")].filter((c) => c.__z1).length + "/" + document.querySelectorAll("canvas").length }; });
            const n0 = await tag();
            await p.setViewportSize({ width: 720, height: 450 }); await p.waitForTimeout(1500); const mid = await count();
            await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1500); const end = await count();
            return { n0, mid, end };
        } finally { await ctx.close(); }
    },
    // Z-App-10: idle motion between t=20s and t=24s (renderer-scoped via rAF callers' canvas draws) + still control census.
    async motion(browser) {
        const ctx = await ctxOf(browser);
        try {
            await ctx.addInitScript(() => {
                window.__raf = 0; const o = window.requestAnimationFrame.bind(window);
                window.requestAnimationFrame = (cb) => o((t) => { window.__raf++; cb(t); });
                window.__draws = 0;
                for (const P of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype].filter(Boolean)) { const d = P.drawArrays, e = P.drawElements; P.drawArrays = function (...a) { window.__draws++; return d.apply(this, a); }; P.drawElements = function (...a) { window.__draws++; return e.apply(this, a); }; }
            });
            const p = await ctx.newPage(); await boot(p, "/", 500);
            await p.mouse.move(1430, 890);
            await p.waitForTimeout(19500 - 500);
            const a = await p.evaluate(() => ({ raf: window.__raf, draws: window.__draws }));
            await p.waitForTimeout(4000);
            const b = await p.evaluate(() => ({ raf: window.__raf, draws: window.__draws }));
            const still = await p.evaluate(() => [...document.querySelectorAll("button,[role=switch],[role=button]")].map((x) => x.getAttribute("aria-label") || x.textContent.trim()).filter((t) => /pause|still|motion|animat/i.test(t)));
            return { raf20to24: b.raf - a.raf, draws20to24: b.draws - a.draws, stillControls: still };
        } finally { await ctx.close(); }
    },
    // Z-App-10 (renderer-scoped): canvas pixels at t=20s vs t=24s on idle /, plus GPU submit/WebGL draw counts.
    async motion2(browser) {
        const ctx = await ctxOf(browser);
        try {
            await ctx.addInitScript(() => {
                window.__gl = 0; window.__gpu = 0;
                for (const P of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype].filter(Boolean)) { const d = P.drawArrays, e = P.drawElements; P.drawArrays = function (...a) { window.__gl++; return d.apply(this, a); }; P.drawElements = function (...a) { window.__gl++; return e.apply(this, a); }; }
                if (window.GPUQueue) { const s = GPUQueue.prototype.submit; GPUQueue.prototype.submit = function (...a) { window.__gpu++; return s.apply(this, a); }; }
            });
            const p = await ctx.newPage(); await boot(p, "/", 500); await p.mouse.move(1430, 890);
            const rects = await p.evaluate(() => [...document.querySelectorAll("canvas")].map((c) => { const r = c.getBoundingClientRect(); return { cls: c.className.toString().slice(0, 40), x: Math.max(0, r.x), y: Math.max(0, r.y), w: Math.min(r.width, innerWidth), h: Math.min(r.height, innerHeight) }; }).filter((r) => r.w > 4 && r.h > 4));
            await p.waitForTimeout(19500);
            const a = await p.evaluate(() => ({ gl: window.__gl, gpu: window.__gpu }));
            const shots0 = []; for (const r of rects) shots0.push(await p.screenshot({ clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, 900 - r.y) } }));
            await p.waitForTimeout(4000);
            const b = await p.evaluate(() => ({ gl: window.__gl, gpu: window.__gpu }));
            const changed = []; for (let i = 0; i < rects.length; i++) { const s1 = await p.screenshot({ clip: { x: rects[i].x, y: rects[i].y, width: rects[i].w, height: Math.min(rects[i].h, 900 - rects[i].y) } }); changed.push({ canvas: rects[i].cls, pixelsChanged: !s1.equals(shots0[i]) }); }
            const still = await p.evaluate(() => [...document.querySelectorAll("button,[role=switch],[role=button],[role=menuitem]")].map((x) => x.getAttribute("aria-label") || x.textContent.trim()).filter((t) => /pause|still|motion|animat|freeze/i.test(t)));
            return { gl20to24: b.gl - a.gl, gpu20to24: b.gpu - a.gpu, changed, stillControls: still, prm: await p.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches) };
        } finally { await ctx.close(); }
    },
    // Z-chassis-5: persistent stage at 390 on /blob and /atmosphere — scroll to the last slider, is a stage canvas in view?
    async sticky(browser) {
        const ctx = await ctxOf(browser, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
        const out = {};
        try { const p = await ctx.newPage();
            for (const r of ["/blob", "/atmosphere"]) { await boot(p, r, 2500);
                out[r] = await p.evaluate(async () => { const sl = [...document.querySelectorAll("main [role=slider], main input[type=range]")]; const last = sl.at(-1); if (!last) return { sliders: 0 };
                    last.scrollIntoView({ block: "center" }); await new Promise((r) => setTimeout(r, 600));
                    const cv = [...document.querySelectorAll("canvas")].filter((c) => !c.classList.contains("atmosphere-canvas")).map((c) => { const b = c.getBoundingClientRect(); const vis = Math.max(0, Math.min(b.bottom, innerHeight) - Math.max(b.top, 0)) * Math.max(0, Math.min(b.right, innerWidth) - Math.max(b.left, 0)); return { cls: c.className.toString().slice(0, 30), area: Math.round(b.width * b.height), visibleArea: Math.round(vis), pos: getComputedStyle(c.closest(".pane-wrapper") ?? c).position }; });
                    return { sliders: sl.length, scrollY: Math.round(scrollY), stageCanvases: cv }; });
                await p.screenshot({ path: new URL(`../../evidence/Z1-app-chassis/r2-sticky390${r.replace("/", "-")}.png`, import.meta.url).pathname });
            }
        } finally { await ctx.close(); }
        return out;
    },
}, "app");
