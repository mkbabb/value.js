// SERVED MODEL: claude-opus-5-5 · SS-8 Z2 — ColorPicker obligations (Z-ColorPicker-n).
// Usage: node z2-picker.mjs [cell ...]   (no args = all cells). One browser, one context per cell.
import { launch, cell, boot, save, r1, pickerState, EVID } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (n) => want.size === 0 || want.has(n);
const browser = await launch();
const out = [];
try {
    // ── desk: static/computed census at 1440×900 light ──
    if (on("desk")) out.push(await cell(browser, "desk", {}, async (page, ctx, { requests }) => {
        await boot(page, "/", { settle: 4000 });
        await page.screenshot({ path: `${EVID}/cp-desk-1440-light.png` });
        const census = await page.evaluate(() => {
            const q = (s, r = document) => [...r.querySelectorAll(s)];
            const ps = document.querySelector(".pane-shell");
            const ro = ps?.querySelector(".readout");
            const title = ps?.querySelector(".title-row");
            const trig = title?.querySelector('[role="combobox"]');
            const figs = ro ? q(".readout-fig", ro) : [];
            const cs = (el) => el && getComputedStyle(el);
            // grid parent hosting the two plates
            let grid = ps, gridCols = null;
            while (grid && grid !== document.body) {
                const g = getComputedStyle(grid);
                if (g.display === "grid" && g.gridTemplateColumns.split(" ").length >= 2) { gridCols = g.gridTemplateColumns; break; }
                grid = grid.parentElement;
            }
            const firstFigRect = figs[0]?.getBoundingClientRect();
            const titleRect = title?.getBoundingClientRect();
            const trigRect = trig?.getBoundingClientRect();
            // the painted glyph box of the first figure (Range over its text)
            let glyphTop = null;
            if (figs[0]) { const rg = document.createRange(); rg.selectNodeContents(figs[0]); const rs = rg.getClientRects(); glyphTop = rs[0]?.top ?? null; }
            const spectrum = q(".pane-shell .picker-body > *")[0];
            const focusables = spectrum ? q('[tabindex]:not([tabindex="-1"]), button, input, [role=slider]', spectrum).length : null;
            const live = ps ? q('[role="status"], [aria-live]:not([aria-live="off"]), [role="alert"]', ps).map((e) => e.tagName + "|" + e.getAttribute("role") + "|" + e.getAttribute("aria-live")) : [];
            const firstHeading = q("h1,h2,h3,h4,h5,h6").find((h) => h.closest(".pane-shell"));
            const shellAnim = ps ? { name: cs(ps).animationName, dur: cs(ps).animationDuration, token: cs(ps).getPropertyValue("--overture-plate-land").trim() } : null;
            return {
                readout: {
                    tag: ro?.tagName, slot: ro?.getAttribute("data-slot"),
                    contenteditable: ro ? q("[contenteditable]", ro).length : null,
                    textboxes: ro ? q('[role="textbox"]', ro).length : null,
                    fontFamily: cs(figs[0])?.fontFamily, fontSize: cs(figs[0])?.fontSize,
                    cells: figs.map((f) => f.textContent),
                    lineRects: (() => { if (!ro) return null; const rg = document.createRange(); rg.selectNodeContents(ro); const tops = new Set([...rg.getClientRects()].map((r) => Math.round(r.top))); return tops.size; })(),
                },
                title: { triggerFontSize: cs(trig)?.fontSize, triggerFamily: cs(trig)?.fontFamily, rect: titleRect && { b: titleRect.bottom, h: titleRect.height }, trigBottom: trigRect?.bottom },
                seam: { titleRowBottomToFigBox: firstFigRect && titleRect ? +(firstFigRect.top - titleRect.bottom).toFixed(2) : null, triggerBottomToGlyph: glyphTop != null && trigRect ? +(glyphTop - trigRect.bottom).toFixed(2) : null, readoutMinHeight: cs(ro)?.minHeight, readoutH: ro?.getBoundingClientRect().height },
                ratio: figs[0] && trig ? +(parseFloat(cs(figs[0]).fontSize) / parseFloat(cs(trig).fontSize)).toFixed(4) : null,
                grid: { cols: gridCols, cls: grid?.className?.slice?.(0, 80) },
                nestedCards: ps ? q('[data-slot="card"] [data-slot="card"]', ps).length : null,
                cardsInShell: ps ? q('[data-slot="card"]', ps).length : null,
                spectrum: spectrum && { tag: spectrum.tagName, cls: String(spectrum.className).slice(0, 80), roles: q("[role]", spectrum).map((e) => e.getAttribute("role")).slice(0, 8), rootRole: spectrum.getAttribute("role"), tab: spectrum.getAttribute("tabindex"), focusables },
                liveRegionsInPicker: live,
                firstPickerHeading: firstHeading && { tag: firstHeading.tagName, slot: firstHeading.getAttribute("data-slot"), text: firstHeading.textContent.trim().slice(0, 40), textboxDesc: q('[role="textbox"]', firstHeading).length },
                h1: q("h1").length,
                combosSelectColorSpace: q('[role="combobox"][aria-label="Select color space"]').map((c) => ({ text: c.textContent.trim().slice(0, 20), fs: getComputedStyle(c).fontSize, inPicker: !!c.closest(".pane-shell") })),
                shellAnim,
                exposedTimers: null,
            };
        });
        census.pointerDebugRequested = requests.filter((u) => /PointerDebugOverlay/.test(u)).length;
        census.pointerDebugModuleRequests = requests.filter((u) => /\/debug\//.test(u)).map((u) => u.replace(/^https?:\/\/[^/]+/, "").slice(0, 90));
        return census;
    }));

    // ── C-1/D-01: one keystroke into the readout, then a model write from the rail ──
    if (on("c1")) out.push(await cell(browser, "c1", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const before = await pickerState(page);
        const fig = page.locator(".pane-shell .readout .readout-fig").first();
        await fig.click();
        await page.keyboard.press("End");
        await page.keyboard.type("5");
        await page.waitForTimeout(1200);
        const afterType = await pickerState(page);
        const childrenAfterType = await page.evaluate(() => [...document.querySelectorAll(".pane-shell .readout .readout-fig")].map((f) => f.innerHTML.slice(0, 80)));
        // model write through the channel rail (keyboard on the first channel slider)
        const slider = page.locator(".pane-shell [role=slider]").first();
        await slider.focus();
        for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(1500);
        const afterWrite = await pickerState(page);
        const sliderNow = await slider.getAttribute("aria-valuenow");
        await page.screenshot({ path: `${EVID}/cp-c1-after-write.png`, clip: { x: 0, y: 0, width: 760, height: 360 } });
        return { before, afterType, childrenAfterType, afterWrite, sliderNow };
    }));

    // ── C-2: two channel edits 120 ms apart through the readout path ──
    if (on("c2")) out.push(await cell(browser, "c2", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const before = await pickerState(page);
        const figs = page.locator(".pane-shell .readout .readout-fig");
        const n = await figs.count();
        const setFig = async (i, txt) => {
            await figs.nth(i).click();
            await page.keyboard.press("ControlOrMeta+A");
            await page.keyboard.type(txt);
        };
        await setFig(0, "30");
        await page.waitForTimeout(120);
        await setFig(n - 1, "10");
        await page.waitForTimeout(1800);
        const after = await pickerState(page);
        return { n, before, after };
    }));

    // ── C-5 / D-12 / L-5 / C-3: the Cmd+K chord ──
    if (on("keys")) out.push(await cell(browser, "keys", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        await page.evaluate(() => {
            window.__kd = [];
            window.addEventListener("keydown", (e) => window.__kd.push({ key: e.key, meta: e.metaKey, prevented: e.defaultPrevented }));
        });
        const expanded = () => page.evaluate(() => document.querySelector('.pane-shell [role="combobox"][aria-label="Select color space"]')?.getAttribute("aria-expanded") ?? "absent");
        const seq = [];
        seq.push({ step: "rest", expanded: await expanded() });
        await page.keyboard.press("Meta+k"); await page.waitForTimeout(500);
        seq.push({ step: "chord1", expanded: await expanded() });
        await page.keyboard.press("Escape"); await page.waitForTimeout(300);
        await page.keyboard.press("Meta+k"); await page.waitForTimeout(500);
        seq.push({ step: "chord2", expanded: await expanded() });
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
        // held chord + another key: Meta down, k down, a down
        await page.keyboard.down("Meta"); await page.keyboard.down("k"); await page.waitForTimeout(150);
        await page.keyboard.press("a"); await page.waitForTimeout(150);
        await page.keyboard.up("k"); await page.keyboard.up("Meta"); await page.waitForTimeout(400);
        seq.push({ step: "held+a", expanded: await expanded() });
        await page.keyboard.press("Escape"); await page.waitForTimeout(300);
        // focus inside the dock/an editable cell, then the chord: is it scoped?
        const kdHome = await page.evaluate(() => window.__kd.splice(0));
        // SPA-nav to #/gradient; picker deactivated under KeepAlive
        await page.evaluate(() => { location.hash = "#/gradient"; });
        await page.waitForTimeout(3500);
        const pickerInDom = await page.evaluate(() => !!document.querySelector(".pane-shell .readout"));
        await page.keyboard.press("Meta+k"); await page.waitForTimeout(300);
        const kdGradient = await page.evaluate(() => window.__kd.splice(0));
        const hasHint = await page.evaluate(() => /⌘K|Cmd\+K|Ctrl\+K|⌘ K/i.test(document.body.innerText) || !!document.querySelector('[aria-keyshortcuts*="K" i]'));
        return { seq, kdHome, pickerInDom, kdGradient, affordanceNamesChord: hasHint };
    }));

    // ── L-2 / D-13 / D-05 at 390×844 coarse ──
    if (on("mobile")) out.push(await cell(browser, "mobile", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, async (page) => {
        await boot(page, "/", { settle: 4500 });
        await page.screenshot({ path: `${EVID}/cp-mobile-390.png` });
        return page.evaluate(() => {
            const q = (s) => [...document.querySelectorAll(s)];
            const ps = document.querySelector(".pane-shell");
            const ro = ps?.querySelector(".readout");
            const figs = ro ? [...ro.querySelectorAll(".readout-fig")] : [];
            const trig = ps?.querySelector('.title-row [role="combobox"]');
            const lines = (() => { if (!ro) return null; const rg = document.createRange(); rg.selectNodeContents(ro); const rs = [...rg.getClientRects()]; const tops = [...new Set(rs.map((r) => Math.round(r.top)))]; return { count: tops.length, cellsPerLine: tops.map((t) => figs.filter((f) => Math.abs(Math.round(f.getBoundingClientRect().top) - t) < 30).length) }; })();
            return {
                dockButtons: q(".glass-dock button[aria-label], .glass-dock [role=button][aria-label]").map((b) => b.getAttribute("aria-label")),
                openColorInput: !!q('[aria-label="Open color input"]').length,
                colorInputField: q('[aria-label="Enter a CSS color"]').length,
                ratio: figs[0] && trig ? +(parseFloat(getComputedStyle(figs[0]).fontSize) / parseFloat(getComputedStyle(trig).fontSize)).toFixed(4) : null,
                figFont: figs[0] && getComputedStyle(figs[0]).fontSize, trigFont: trig && getComputedStyle(trig).fontSize,
                lines,
                combos: q('[role="combobox"][aria-label="Select color space"]').length,
            };
        });
    }));

    // ── C-7 replacement: header condenses at 390×480 under a real wheel ──
    if (on("condense")) out.push(await cell(browser, "condense", { viewport: { width: 390, height: 480 } }, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const read = () => page.evaluate(() => { const h = document.querySelector(".pane-shell .picker-header"); const host = document.querySelector(".pane-shell .card-scroll-host"); return { h: h && +h.getBoundingClientRect().height.toFixed(2), condensed: h?.getAttribute("data-condensed") ?? h?.closest("[data-condensed]")?.getAttribute("data-condensed") ?? null, overflow: host ? host.scrollHeight - host.clientHeight : null, scrollTop: host?.scrollTop }; });
        const before = await read();
        const b = await page.locator(".pane-shell .picker-body").boundingBox();
        if (b) await page.mouse.move(b.x + b.width / 2, Math.min(b.y + 40, 470));
        for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 80); await page.waitForTimeout(120); }
        await page.waitForTimeout(900);
        const after = await read();
        return { before, after };
    }));

    // ── L-13: an unknown pane route ──
    if (on("unknown")) out.push(await cell(browser, "unknown", {}, async (page) => {
        await boot(page, "/does-not-exist", { settle: 4000 });
        return page.evaluate(() => ({ href: location.href, picker: !!document.querySelector(".pane-shell .readout"), elements: document.querySelectorAll("*").length, errorPlate: !!document.querySelector(".pane-error-plate, [data-pane-error]"), bodyText: document.body.innerText.slice(0, 200) }));
    }));

    // ── D-18: ambient ground, light vs dark (screenshot read outside the plates) ──
    if (on("dark")) for (const scheme of ["light", "dark"]) out.push(await cell(browser, `ambient-${scheme}`, { colorScheme: scheme }, async (page) => {
        await boot(page, "/", { scheme, settle: 4500 });
        const file = `cp-ambient-1440-${scheme}.png`;
        await page.screenshot({ path: `${EVID}/${file}` });
        const lum = await page.evaluate(async (src) => {
            const img = new Image(); img.src = src; await img.decode();
            const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
            const g = c.getContext("2d"); g.drawImage(img, 0, 0);
            // plates' union rect: exclude it; sample a 1-px grid in the margins
            const rects = [...document.querySelectorAll('[data-slot="card"]')].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 200);
            const dock = document.querySelector(".glass-dock")?.getBoundingClientRect();
            const inside = (x, y) => rects.some((r) => x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 12 && y <= r.bottom + 12) || (dock && x >= dock.left - 12 && x <= dock.right + 12 && y >= dock.top - 12 && y <= dock.bottom + 12);
            const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
            let sum = 0, n = 0, max = 0;
            const d = g.getImageData(0, 0, c.width, c.height).data;
            for (let y = 4; y < c.height; y += 16) for (let x = 4; x < c.width; x += 16) {
                if (inside(x, y)) continue;
                const i = (y * c.width + x) * 4; const L = 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
                sum += L; n++; if (L > max) max = L;
            }
            const plate = rects[0]; let pl = null;
            if (plate) { const x = Math.round(plate.left + 30), y = Math.round(plate.bottom - 30); const i = (y * c.width + x) * 4; pl = [d[i], d[i + 1], d[i + 2]]; }
            return { ambientMeanY: +(sum / n).toFixed(4), ambientMaxY: +max.toFixed(4), samples: n, plateSampleRGB: pl, plates: rects.length };
        }, `data:image/png;base64,${(await page.screenshot()).toString("base64")}`);
        return { file, ...lum };
    }));
    save(`run-picker-${[...want].join("+") || "all"}.json`, out);
    console.log(JSON.stringify(out, null, 1).slice(0, 9000));
} finally {
    await browser.close();
}
