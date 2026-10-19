// SS-8 · B20 probe-b — GradientVisualizer items (R-1..R-15) + the boundary paint (SS8-0574), Chromium headless.
// One browser for the run; one context per cell (lib.cell closes it in finally).
import { launch, cell, goGradient, save, EDITOR, EVID } from "./lib.mjs";
import { pixels, rgba, over, cr } from "./px.mjs";

const ONLY = process.argv[2] ? process.argv[2].split(",") : null;
const want = (k) => !ONLY || ONLY.some((o) => k.startsWith(o));
const BAR = '[data-testid="gradient-stop-bar"]';

async function railState(page) {
    return page.evaluate((BAR) => {
        const bar = document.querySelector(BAR); const br = bar.getBoundingClientRect();
        const hs = [...document.querySelectorAll('[role="slider"][data-stop-id]')].map((h) => { const r = h.getBoundingClientRect(); return { id: h.dataset.stopId, now: +h.getAttribute("aria-valuenow"), cx: +(r.x + r.width / 2).toFixed(1), frac: +((r.x + r.width / 2 - br.x) / br.width).toFixed(3) }; });
        return { bar: [br.x, br.y, br.width, br.height].map((n) => +n.toFixed(1)), handles: hs, dir: getComputedStyle(bar).direction };
    }, BAR);
}

async function mintAt(page, frac) {
    const st = await railState(page);
    const [x, y, w, h] = st.bar;
    await page.mouse.click(x + w * frac, y + h / 2);
    await page.waitForTimeout(250);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);
}

async function layoutNumbers(page) {
    return page.evaluate((EDITOR) => {
        const h3 = (t) => [...document.querySelectorAll("h3")].find((h) => h.textContent.trim() === t);
        const root = h3("Stops").closest("section").parentElement; // the visualizer column
        const rr = root.getBoundingClientRect();
        const easeTop = h3("Easing")?.getBoundingClientRect().top, cssTop = h3("CSS").getBoundingClientRect().top;
        const ed = document.querySelector(EDITOR).getBoundingClientRect();
        return { body: +rr.height.toFixed(1), easingPx: easeTop != null ? +(cssTop - easeTop).toFixed(1) : null, easingShare: easeTop != null ? +((cssTop - easeTop) / rr.height * 100).toFixed(1) : null, codeWell: [+ed.width.toFixed(1), +ed.height.toFixed(1)], stops: document.querySelectorAll('[role="slider"][data-stop-id]').length };
    }, EDITOR);
}

const b = await launch();
const out = { at: new Date().toISOString() };
try {
    // ── R-1: h3 / section-label ink over the live ground (pixel ground 16 px past the text run) ──
    for (const w of [1440, 390]) for (const dark of [false, true]) {
        const key = `r1-${w}-${dark ? "dark" : "light"}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { w, h: w === 1440 ? 900 : 844, dark }, async (page) => {
            await goGradient(page);
            await page.waitForTimeout(1500);
            const heads = await page.evaluate(() => [...document.querySelectorAll("h3, .section-label")].map((e, i) => { e.dataset.ss8 = String(i); return { i, tag: e.tagName, cls: String(e.className).slice(0, 50), text: e.textContent.trim().slice(0, 20), color: getComputedStyle(e).color, font: getComputedStyle(e).fontSize, paperField: !!e.closest("[data-paper-field]") }; }));
            const res = [];
            for (const hd of heads) {
                if (!["Stops", "Interpolation", "Easing", "CSS"].includes(hd.text) && hd.tag === "H3") continue;
                await page.evaluate((i) => document.querySelector(`[data-ss8="${i}"]`).scrollIntoView({ block: "center" }), hd.i);
                await page.waitForTimeout(300);
                const geo = await page.evaluate((i) => { const e = document.querySelector(`[data-ss8="${i}"]`); const r = document.createRange(); r.selectNodeContents(e); const b = r.getBoundingClientRect(); const pts = [[Math.round(b.right + 16), Math.round(b.top + b.height / 2)], [Math.round(b.right + 40), Math.round(b.top + b.height / 2)]]; return { run: [b.x, b.y, b.width, b.height].map(Math.round), pts, hit: pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return h ? h.tagName + "." + String(h.className).slice(0, 30) : null; }) }; }, hd.i);
                const png = await page.screenshot();
                const px = await pixels(page, png, geo.pts);
                const [ink] = await rgba(page, [hd.color]);
                const crs = px.map((g) => cr(over(ink, g), g));
                res.push({ ...hd, ...geo, ground: px, ink, cr: crs, minCR: Math.min(...crs) });
            }
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.screenshot({ path: `${EVID}/b-${key}.png` });
            return { res };
        });
    }

    // ── R-2: route proportions at 1440×900 ──
    if (want("r2")) out.r2 = await cell(b, {}, async (page) => {
        await goGradient(page);
        return await page.evaluate(() => {
            const R = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
            const main = document.querySelector("main.pane-main") || document.querySelector("main");
            const tree = (e, d) => d > 4 ? [] : [...e.children].filter((c) => c.getBoundingClientRect().width > 100).map((c) => ({ tag: c.tagName, cls: String(c.className).slice(0, 70), aria: c.getAttribute("aria-label") || c.getAttribute("role"), rect: R(c), kids: tree(c, d + 1) }));
            return { vw: innerWidth, docW: document.documentElement.clientWidth, main: R(main), tree: tree(main, 0) };
        });
    });

    // ── R-3: RTL mirroring of the rail ──
    for (const rtl of [false, true]) {
        const key = `r3-${rtl ? "rtl" : "ltr"}`;
        if (!want(key)) continue;
        out[key] = await cell(b, {}, async (page) => {
            await goGradient(page);
            if (rtl) { await page.evaluate(() => { document.documentElement.dir = "rtl"; }); await page.waitForTimeout(800); }
            const before = await railState(page);
            const [x, y, w, h] = before.bar;
            const clickX = x + w * 0.25;
            await page.mouse.click(clickX, y + h / 2);
            await page.waitForTimeout(400);
            const after = await railState(page);
            const minted = after.handles.find((m) => !before.handles.some((o) => o.id === m.id));
            // keyboard: ArrowRight on the selected (minted) handle
            let key = null;
            if (minted) {
                await page.focus(`[role="slider"][data-stop-id="${minted.id}"]`);
                await page.keyboard.press("ArrowRight"); await page.waitForTimeout(300);
                const k = await railState(page);
                const m2 = k.handles.find((q) => q.id === minted.id);
                key = { nowAfterArrowRight: m2?.now, cxAfter: m2?.cx };
            }
            // ramp paint: pixel at bar's left vs right end
            const png = await page.screenshot();
            const px = await pixels(page, png, [[Math.round(x + 6), Math.round(y + h / 2)], [Math.round(x + w - 6), Math.round(y + h / 2)]]);
            await page.screenshot({ path: `${EVID}/b-${key ? "" : ""}r3-${rtl ? "rtl" : "ltr"}.png`, clip: { x: x - 20, y: y - 30, width: w + 40, height: h + 70 } });
            return { htmlDir: await page.evaluate(() => document.documentElement.dir), before, clickX: +clickX.toFixed(1), minted, mintedOffsetPx: minted ? +(minted.cx - clickX).toFixed(1) : null, key, rampEnds: px };
        });
    }

    // ── R-4 + R-14: 12-stop degradation numbers + hidden-twin cost ──
    if (want("r4")) out.r4 = await cell(b, {}, async (page) => {
        await goGradient(page);
        const census = () => page.evaluate(() => {
            const sec = [...document.querySelectorAll("h3")].find((h) => h.textContent.trim() === "Easing")?.parentElement;
            return {
                totalNodes: document.getElementsByTagName("*").length,
                strips: document.querySelectorAll(".specimen-strip").length,
                stripsVisible: [...document.querySelectorAll(".specimen-strip")].filter((s) => s.getClientRects().length > 0).length,
                toggles: document.querySelectorAll('.specimen-strip [aria-pressed]').length,
                svgPaths: document.querySelectorAll(".specimen-strip path").length,
                intervalRows: document.querySelectorAll(".interval-head").length,
            };
        });
        const at2 = { layout: await layoutNumbers(page), census: await census() };
        for (const f of [0.05, 0.14, 0.23, 0.32, 0.41, 0.59, 0.68, 0.77, 0.86, 0.95]) await mintAt(page, f);
        await page.waitForTimeout(500);
        await page.evaluate(() => document.activeElement?.blur());
        const at12 = { layout: await layoutNumbers(page), census: await census() };
        // open the first interval row, then cost one forced layout + the open
        const t = await page.evaluate(async () => {
            const head = document.querySelector(".interval-head");
            const t0 = performance.now(); head.click(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); const open = performance.now() - t0;
            const t1 = performance.now(); document.body.style.width = "99.9%"; void document.body.offsetHeight; document.body.style.width = ""; void document.body.offsetHeight; const relayout = performance.now() - t1;
            return { openRowMs: +open.toFixed(1), forcedRelayoutMs: +relayout.toFixed(2) };
        });
        await page.waitForTimeout(600);
        const opened = { layout: await layoutNumbers(page), census: await census() };
        await page.screenshot({ path: `${EVID}/b-r4-12stops.png`, fullPage: true });
        return { at2, at12, opened, timing: t };
    });

    // ── R-6: phone clipping of the interpolation triggers (390×844) ──
    for (const w of [390, 320]) {
        const key = `r6-${w}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { w, h: 844 }, async (page) => {
            await goGradient(page);
            return await page.evaluate(() => {
                const R = (b) => [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1));
                const tile = document.querySelector('[data-testid="gradient-render-tile"]').getBoundingClientRect();
                const trig = [...document.querySelectorAll('button[role="combobox"]')].filter((t) => t.closest("main") && !/Gradient/.test(t.textContent));
                return trig.map((t) => {
                    const r = t.getBoundingClientRect();
                    const val = t.querySelector("span") || t;
                    const clipPct = val.scrollWidth > val.clientWidth ? +((1 - val.clientWidth / val.scrollWidth) * 100).toFixed(1) : 0;
                    const overlapTile = !(r.right <= tile.left || r.left >= tile.right || r.bottom <= tile.top || r.top >= tile.bottom);
                    return { text: t.textContent.trim(), rect: R(r), valScroll: val.scrollWidth, valClient: val.clientWidth, clipPct, overlapTile, offRight: r.right > innerWidth };
                });
            });
        });
    }

    // ── R-13: tab stops through the open easing row ──
    if (want("r13")) out.r13 = await cell(b, {}, async (page) => {
        await goGradient(page);
        await page.click(".interval-head"); await page.waitForTimeout(700);
        await page.focus(".interval-head");
        const stops = [];
        for (let i = 0; i < 60; i++) {
            await page.keyboard.press("Tab");
            const a = await page.evaluate(() => { const e = document.activeElement; return { tag: e.tagName, role: e.getAttribute("role"), label: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 24), pressed: e.getAttribute("aria-pressed"), tabindex: e.getAttribute("tabindex"), inStrip: !!e.closest(".specimen-strip"), cls: String(e.className).slice(0, 40) }; });
            stops.push(a);
            if (a.label === "Gradient CSS") break;
        }
        const strip = await page.evaluate(() => { const s = [...document.querySelectorAll(".specimen-strip")].find((x) => x.getClientRects().length); const t = s ? [...s.querySelectorAll("[aria-pressed]")] : []; return { toggles: t.length, tabindexes: [...new Set(t.map((x) => x.getAttribute("tabindex")))], groupRole: s?.querySelector(".strip-row")?.getAttribute("role") }; });
        // arrow-key roving check: from the first strip stop, ArrowRight
        const first = stops.findIndex((s) => s.inStrip && s.pressed !== null);
        let arrow = null;
        if (first >= 0) {
            await page.focus(".interval-head");
            for (let i = 0; i <= first; i++) await page.keyboard.press("Tab");
            const a0 = await page.evaluate(() => document.activeElement.textContent.trim().slice(0, 20));
            await page.keyboard.press("ArrowRight");
            const a1 = await page.evaluate(() => document.activeElement.textContent.trim().slice(0, 20));
            arrow = { before: a0, afterArrowRight: a1, moved: a0 !== a1 };
        }
        return { count: stops.length, stripStops: stops.filter((s) => s.inStrip).length, stops, strip, arrow };
    });

    // ── R-15: render-tile aspect ──
    for (const w of [1440, 390, 320]) {
        const key = `r15-${w}`;
        if (!want(key)) continue;
        out[key] = await cell(b, { w, h: w === 1440 ? 900 : 844 }, async (page) => {
            await goGradient(page);
            return await page.evaluate(() => { const t = document.querySelector('[data-testid="gradient-render-tile"]').getBoundingClientRect(); return { w: +t.width.toFixed(1), h: +t.height.toFixed(1), aspect: +(t.width / t.height).toFixed(3) }; });
        });
    }

    // ── R-12: in-page bench of the shipped serializers (served dev modules), N=500 warmed ──
    if (want("r12")) out.r12 = await cell(b, {}, async (page) => {
        await goGradient(page);
        return await page.evaluate(async () => {
            const url = performance.getEntriesByType("resource").map((e) => e.name).find((n) => /useGradientCSS\.ts/.test(n)) ?? "/@fs/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientCSS.ts";
            const m = await import(url);
            const mk = (n) => ({ type: "linear", direction: 90, interpolationSpace: "oklch", hueMethod: "shorter", stops: Array.from({ length: n }, (_, i) => ({ id: "s" + i, cssColor: `oklch(${60 + i}% 0.15 ${i * 40}deg)`, position: (i / (n - 1)) * 100, easing: m.linearInterval() })) });
            const bench = (fn, model) => { for (let i = 0; i < 100; i++) fn(model); const t0 = performance.now(); for (let i = 0; i < 500; i++) fn(model); return +((performance.now() - t0) / 500).toFixed(4); };
            const r = { url: url.replace(location.origin, "") };
            for (const n of [2, 8, 12]) { const md = mk(n); r[n] = { railRamp: bench(m.serializeRailRamp, md), coalesced: bench(m.serializeCoalescedGradient, md), simple: bench((x) => m.serializeGradient(x, "block"), md) }; }
            return r;
        });
    });

    // ── R-11: the async-chunk eval throw (easingCatalogue.ts throws at module evaluation) ──
    // ── 0574: the ErrorBoundary's paint (GradientCodeEditor.vue setup throws at render) ──
    for (const [key, match, body] of [
        // The original module is fetched and served with a throw PREFIXED: imports hoist, linking succeeds
        // (every named export still exists), and evaluation throws at its first statement — a true eval throw.
        ["r11-evalthrow", /\/easingCatalogue\.ts$/, "PREFIX:throw new Error(\"SS8 probe: deliberate module-eval throw (easingCatalogue)\");\n"],
        ["a14c-setupthrow", /\/GradientCodeEditor\.vue$/, 'export default { name: "SS8Throw", setup() { throw new Error("SS8 probe: deliberate setup throw (GradientCodeEditor)"); } };'],
    ]) {
        for (const dark of [false, true]) {
            const k = `${key}-${dark ? "dark" : "light"}`;
            if (!want(k)) continue;
            out[k] = await cell(b, {
                dark,
                setup: async (ctx) => ctx.route((u) => match.test(u.pathname) && !u.search.includes("type=style"), async (r) => {
                    if (body.startsWith("PREFIX:")) { const orig = await r.fetch(); return r.fulfill({ status: 200, contentType: "application/javascript", body: body.slice(7) + (await orig.text()) }); }
                    return r.fulfill({ status: 200, contentType: "application/javascript", body });
                }),
            }, async (page) => {
                await page.goto("http://localhost:9000/#/gradient", { waitUntil: "domcontentloaded" });
                await page.waitForTimeout(6000);
                const r = await page.evaluate(() => {
                    const R = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
                    const eb = document.querySelector(".vj-error-boundary");
                    const alerts = [...document.querySelectorAll('[role="alert"], [aria-live="assertive"]')].map((a) => ({ cls: String(a.className).slice(0, 50), text: a.innerText.trim().slice(0, 160) }));
                    const paint = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); if (!b.width) return { rect: R(e), hit: null }; const pts = [[b.x + b.width / 2, b.y + b.height / 2], [b.x + 3, b.y + b.height / 2]]; return { rect: R(e), hits: pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return h ? { owner: e === h || e.contains(h), hit: h.tagName + "." + String(h.className).slice(0, 40) } : null; }) }; };
                    let parts = null;
                    if (eb) {
                        const leafs = [...eb.querySelectorAll("*")].filter((x) => x.children.length === 0 && x.textContent.trim());
                        parts = { icon: paint(eb.querySelector("svg")), texts: leafs.map((l) => ({ text: l.textContent.trim().slice(0, 80), ...paint(l) })), button: paint(eb.querySelector("button")), focusedInside: eb.contains(document.activeElement) || document.activeElement === eb };
                    }
                    const editor = !!document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
                    return { hash: location.hash, boundary: !!eb, boundaryRect: eb ? R(eb) : null, alerts, parts, editor, paneErrorPlate: !!document.querySelector('[class*="pane-error"], [data-pane-error]'), bodyText: document.body.innerText.slice(0, 300) };
                });
                await page.screenshot({ path: `${EVID}/b-${k}.png` });
                return r;
            });
        }
    }
} finally {
    await b.close();
}
const p = save(`probe-b${ONLY ? "-" + ONLY.join("_") : ""}.json`, out);
console.log("saved", p);
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v).slice(0, 600));
