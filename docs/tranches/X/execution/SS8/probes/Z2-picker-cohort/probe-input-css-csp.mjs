// SERVED MODEL: claude-opus-5-5 · SS-8 Z2 — ColorInput / ColorSpaceSelector / ConfigSliderPane obligations.
// Usage: node z2-input-css-csp.mjs [cell ...]. One browser, one context per cell, closed in finally.
import { launch, cell, boot, save, r1, EVID } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (n) => want.size === 0 || want.has(n);
const browser = await launch();
const out = [];

async function openInput(page) {
    const dock = page.locator(".glass-dock").first();
    const b = await dock.boundingBox();
    if (b) await page.mouse.move(b.x + 3, b.y + b.height / 2);
    if (/collapsed/.test((await dock.getAttribute("class")) ?? "")) { await dock.click(); await page.waitForTimeout(900); }
    const toggle = page.getByRole("button", { name: "Toggle action bar" });
    if (await toggle.count()) { await toggle.first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(900); }
    const open = page.getByRole("button", { name: "Open color input" });
    if (await open.count()) { await open.first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1200); }
    return page.locator('[aria-label="Enter a CSS color"]').first();
}
const fieldState = (page) => page.evaluate(() => {
    const f = document.querySelector('[aria-label="Enter a CSS color"]');
    if (!f) return { present: false };
    const cs = getComputedStyle(f);
    const send = document.querySelector('button[aria-label="Apply color"]');
    const badge = document.querySelector(".error-badge");
    const rr = (r) => r && { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), r: +r.right.toFixed(1), b: +r.bottom.toFixed(1) };
    const sr = send?.getBoundingClientRect(), br = badge?.getBoundingClientRect();
    let overlap = null;
    if (sr && br) { const w = Math.max(0, Math.min(sr.right, br.right) - Math.max(sr.left, br.left)); const h = Math.max(0, Math.min(sr.bottom, br.bottom) - Math.max(sr.top, br.top)); overlap = { px2: +(w * h).toFixed(1), fracOfButton: +((w * h) / (sr.width * sr.height)).toFixed(3), wOverlap: +w.toFixed(1) }; }
    return {
        present: true, tag: f.tagName, contenteditable: f.getAttribute("contenteditable"), role: f.getAttribute("role"), text: f.innerText,
        focused: document.activeElement === f,
        border: cs.borderTopColor, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, boxShadow: cs.boxShadow.slice(0, 90), fontSize: cs.fontSize, dir: f.getAttribute("dir") ?? cs.direction,
        ariaInvalid: f.getAttribute("aria-invalid"), describedby: f.getAttribute("aria-describedby"), errormessage: f.getAttribute("aria-errormessage"),
        send: send && { label: send.getAttribute("aria-label"), type: send.getAttribute("type"), rect: rr(sr) },
        badge: badge && { text: badge.textContent.trim(), rect: rr(br), role: badge.getAttribute("role"), live: badge.closest("[aria-live]")?.getAttribute("aria-live") ?? null },
        overlap,
        liveRegionsInDock: [...document.querySelectorAll('.glass-dock [role="status"], .glass-dock [aria-live]:not([aria-live="off"]), .glass-dock [role="alert"]')].map((e) => `${e.getAttribute("role")}|${e.getAttribute("aria-live")}|${e.textContent.trim().slice(0, 60)}`),
        title: document.title,
    };
});

try {
    // ── ColorInput: desktop field census, invalid entry, focus, debounce, popover ──
    if (on("ci")) out.push(await cell(browser, "ci", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const field = await openInput(page);
        const res = { atOpen: await fieldState(page) };
        if (!res.atOpen.present) return res;
        // keyframes census: does a GLOBAL crown-appear exist? (L-12)
        res.crownKeyframes = await page.evaluate(() => {
            const names = [];
            for (const s of document.styleSheets) { let rules; try { rules = s.cssRules; } catch { continue; } const walk = (rs) => { for (const r of rs) { if (r.type === 7 && /crown/i.test(r.name)) names.push(r.name); if (r.cssRules) walk(r.cssRules); } }; walk(rules); }
            return names;
        });
        // focus by keyboard-ish click, read the focus indicator (D-1)
        await field.click(); await page.waitForTimeout(400);
        res.focused = await fieldState(page);
        // invalid degenerate body + Enter (L-1/D-6/D-4)
        await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("oklch()"); await page.keyboard.press("Enter");
        await page.waitForTimeout(2600);
        res.invalidDegenerate = await fieldState(page);
        await field.click(); await page.waitForTimeout(300);
        res.invalidFocused = await fieldState(page);
        await page.screenshot({ path: `${EVID}/ci-invalid-oklch-empty.png`, clip: { x: 300, y: 0, width: 840, height: 140 } });
        // plain invalid word
        await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("notacolor"); await page.keyboard.press("Enter");
        await page.waitForTimeout(2600);
        res.invalidWord = await fieldState(page);
        // debounce (D-5): type a valid colour and sample the title over time, no Enter
        await field.click();
        await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("rgb(10 200 30)");
        const t0 = Date.now(); const samples = [];
        for (const t of [250, 600, 1200, 2300]) { await page.waitForTimeout(t - (Date.now() - t0)); samples.push({ t, title: await page.title(), readout: await page.evaluate(() => [...document.querySelectorAll(".pane-shell .readout .readout-fig")].map((f) => f.textContent).join(",")) }); }
        res.debounce = samples;
        // popover by keyboard focus (D-15): blur, Tab into the field, wait
        await page.mouse.move(5, 890); await page.keyboard.press("Escape"); await page.waitForTimeout(600);
        const popOpen = () => page.evaluate(() => [...document.querySelectorAll('[role="dialog"], [data-slot="popover-content"], [data-reka-popper-content-wrapper]')].filter((e) => e.getBoundingClientRect().width > 0 && /Enter a color/.test(e.textContent)).length);
        res.popoverAtRest = await popOpen();
        await field.focus(); await page.waitForTimeout(900);
        res.popoverOnFocus = await popOpen();
        await field.hover(); await page.waitForTimeout(900);
        res.popoverOnHover = await popOpen();
        // L-16: type an invalid, hover, read the echo
        await field.click(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("oklch(0.5 0.1"); await page.keyboard.press("Enter"); await page.waitForTimeout(2400);
        await page.mouse.move(5, 890); await page.waitForTimeout(400); await field.hover(); await page.waitForTimeout(1000);
        res.echoAfterInvalid = await page.evaluate(() => { const p = [...document.querySelectorAll("[data-reka-popper-content-wrapper], [role=dialog]")].find((e) => /Enter a color/.test(e.textContent)); return p ? p.innerText.replace(/\s+/g, " ").slice(0, 320) : null; });
        // crown presence on a named keyword
        await field.click(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("rebeccapurple"); await page.keyboard.press("Enter"); await page.waitForTimeout(2200);
        res.crown = await page.evaluate(() => { const c = document.querySelector(".glass-dock svg.lucide-crown"); if (!c) return null; const cs = getComputedStyle(c); return { animationName: cs.animationName, anims: c.getAnimations().map((a) => a.animationName ?? a.constructor.name), transitionProperty: cs.transitionProperty, tab: c.getAttribute("tabindex") }; });
        return res;
    }));

    // ── ColorInput + config sliders under forced colors (D-1 / CSP D-1) ──
    if (on("forced")) out.push(await cell(browser, "forced", { forcedColors: "active" }, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const field = await openInput(page);
        const r = {};
        if (await field.count()) { await field.focus(); await page.waitForTimeout(400); r.field = await fieldState(page); }
        await page.evaluate(() => { location.hash = "#/blob"; }); await page.waitForTimeout(3500);
        const s = page.locator(".config-console [role=slider]").first();
        if (await s.count()) { await s.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(400);
            r.slider = await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); const track = a.closest(".glass-slider")?.querySelector(".slider-track"); const tc = track && getComputedStyle(track); return { fv: a.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, trackShadow: tc?.boxShadow.slice(0, 80), trackOutline: tc && `${tc.outlineStyle} ${tc.outlineWidth}` }; }); }
        return r;
    }));

    // ── ColorSpaceSelector: the catalog census (L-2/L-3/L-8/L-9) + About fallbacks (L-1) ──
    if (on("css")) out.push(await cell(browser, "css", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        const trig = page.locator('.pane-shell [role="combobox"][aria-label="Select color space"]').first();
        await trig.click(); await page.waitForTimeout(900);
        await page.screenshot({ path: `${EVID}/css-catalog-open-1440.png` });
        const census = await page.evaluate(() => {
            const rows = [...document.querySelectorAll('[role="option"][data-space]')];
            return rows.map((r) => {
                const dot = r.querySelector(".specimen-dot");
                const cap = r.querySelector(".specimen-caption");
                const filt = dot && [...dot.querySelectorAll("*"), dot].map((e) => getComputedStyle(e).filter).find((f) => f && f !== "none");
                const tub = dot?.querySelector("feTurbulence") ?? document.querySelector(`${(filt || "").match(/url\("?#([^")]+)/)?.[1] ? "#" + CSS.escape(filt.match(/url\("?#([^")]+)/)[1]) : "nothing-here"} feTurbulence`);
                const maxDec = Math.max(0, ...(cap?.textContent.match(/\d+\.(\d+)/g) ?? []).map((m) => m.split(".")[1].length));
                return {
                    space: r.getAttribute("data-space"), caption: cap?.textContent.trim().slice(0, 70), captionTitle: cap?.getAttribute("title"),
                    maxDecimals: maxDec, gamutMark: !!r.querySelector('[data-gamut], .gamut-mark, [aria-label*="gamut" i], [title*="gamut" i]') || /gamut/i.test(r.getAttribute("aria-label") ?? ""),
                    dotTag: dot?.getAttribute("tag"), dotRadius: dot && getComputedStyle(dot.firstElementChild ?? dot).borderRadius.slice(0, 50), turbSeed: tub?.getAttribute("seed") ?? null, filter: filt?.slice(0, 40) ?? null,
                };
            });
        });
        await page.keyboard.press("Escape"); await page.waitForTimeout(500);
        // L-1: choose spaces with no catalog/doc entry and read the About pane
        const about = [];
        for (const sp of ["display-p3", "rec2020", "ictcp", "jzazbz", "lab"]) {
            await trig.click(); await page.waitForTimeout(700);
            const opt = page.locator(`[role="option"][data-space="${sp}"]`);
            if (!(await opt.count())) { about.push({ sp, missingOption: true }); await page.keyboard.press("Escape"); continue; }
            await opt.scrollIntoViewIfNeeded().catch(() => {}); await opt.click(); await page.waitForTimeout(1600);
            about.push(await page.evaluate((sp) => {
                const panes = [...document.querySelectorAll('[data-slot="card"]')].filter((c) => !c.closest(".pane-shell .readout") && !c.querySelector(".readout"));
                const aboutPane = panes.find((p) => /About|Detailed Guide|Nutrition|color space/i.test(p.innerText));
                const t = aboutPane?.innerText ?? "";
                const heads = aboutPane ? [...aboutPane.querySelectorAll("h1,h2,h3,h4")].map((h) => ({ tag: h.tagName, text: h.textContent.trim().slice(0, 40), nextText: (h.nextElementSibling?.textContent ?? "").trim().slice(0, 60) })) : [];
                return { sp, readoutTitle: document.querySelector('.pane-shell [role="combobox"]')?.textContent.trim(), mentionsCIERGB: /CIE\s*RGB|CIE 1931 RGB|CIE-RGB/i.test(t), heads: heads.slice(0, 8), aboutHead: t.slice(0, 160).replace(/\s+/g, " ") };
            }, sp));
        }
        return { rows: census.length, census, about };
    }));

    // ── ConfigSliderPane on #/blob at 1440 ──
    if (on("csp")) out.push(await cell(browser, "csp", {}, async (page) => {
        await boot(page, "/blob", { settle: 4000 });
        await page.waitForTimeout(800);
        await page.screenshot({ path: `${EVID}/csp-blob-1440.png` });
        const census = await page.evaluate(() => {
            const q = (s, r = document) => [...r.querySelectorAll(s)];
            const pane = document.querySelector(".config-console")?.closest('[data-slot="card"]') ?? document.querySelector(".config-console");
            const sl = q(".config-console [role=slider]");
            const rows = q(".config-console .configurator-row");
            const fmt = sl.slice(0, 40).map((s) => {
                const row = s.closest(".configurator-row");
                const nameEl = row && [...row.querySelectorAll("*")].find((e) => e.children.length === 0 && /^-?\d+(\.\d+)?$/.test(e.textContent.trim()));
                const g = s.closest(".glass-slider");
                return { label: s.getAttribute("aria-label"), now: s.getAttribute("aria-valuenow"), valuetext: s.getAttribute("aria-valuetext"), labelledby: s.getAttribute("aria-labelledby"), disabled: s.getAttribute("aria-disabled"), shown: nameEl?.textContent.trim(), shownMinInline: nameEl && getComputedStyle(nameEl).minInlineSize, variant: g?.getAttribute("data-variant"), size: g?.getAttribute("data-size") ?? s.closest("[data-size]")?.getAttribute("data-size") ?? null, step: s.getAttribute("aria-valuestep") };
            });
            const range = q(".config-console .slider-range")[0]; const track = q(".config-console .slider-track")[0];
            const head = q(".config-section-title")[0];
            const rowLabel = rows[0] && [...rows[0].querySelectorAll("label, span, div")].find((e) => e.children.length === 0 && e.textContent.trim() && !/^-?\d/.test(e.textContent.trim()));
            const rec = (e) => { if (!e) return null; const c = getComputedStyle(e); return [c.fontFamily.split(",")[0], c.fontSize, c.fontWeight, c.letterSpacing, c.textTransform, c.color].join(" | "); };
            const lines = pane ? q("*", pane).filter((e) => { const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return r.width > 100 && ((parseFloat(c.borderTopWidth) > 0 && c.borderTopStyle !== "none" && !/rgba\(0, 0, 0, 0\)/.test(c.borderTopColor)) || (parseFloat(c.borderBottomWidth) > 0 && c.borderBottomStyle !== "none" && !/rgba\(0, 0, 0, 0\)/.test(c.borderBottomColor))) && !e.matches('[data-slot="card"]'); }).map((e) => (e.className?.baseVal ?? e.className ?? e.tagName).toString().slice(0, 40)) : [];
            return {
                sliders: sl.length, rows: rows.length, groups: pane ? q('[role="group"]', pane).length : 0,
                labelsFor: pane ? q("label[for]", pane).length : 0,
                valuetextNull: sl.filter((s) => s.getAttribute("aria-valuetext") == null).length,
                labelledbyNull: sl.filter((s) => !s.getAttribute("aria-labelledby")).length,
                ariaDisabled: sl.filter((s) => s.getAttribute("aria-disabled") === "true").length,
                variants: [...new Set(fmt.map((f) => f.variant))], sizes: [...new Set(fmt.map((f) => f.size))],
                fmt: fmt.slice(0, 40),
                rangeBg: range && getComputedStyle(range).backgroundColor, rangeBgImg: range && getComputedStyle(range).backgroundImage.slice(0, 60), trackBg: track && getComputedStyle(track).backgroundColor,
                headRecipe: rec(head), rowLabelRecipe: rec(rowLabel), rowLabelText: rowLabel?.textContent.trim(),
                dividerLines: lines,
                nestedCards: pane ? q('[data-slot="card"]', pane).length : null,
                docks: q(".glass-dock").length,
                liveRegions: pane ? q('[role="status"], [aria-live]:not([aria-live="off"])', pane).map((e) => e.getAttribute("role") + "|" + e.getAttribute("aria-live")) : [],
            };
        });
        // C-1/D-10: change a slider, Copy JSON, Reset — what speaks, what restores
        const s0 = page.locator(".config-console [role=slider]").first();
        const before = await s0.getAttribute("aria-valuenow");
        await s0.focus(); for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400);
        const moved = await s0.getAttribute("aria-valuenow");
        await page.getByRole("button", { name: /Copy JSON/ }).click().catch(() => {}); await page.waitForTimeout(250);
        const copyLabel = await page.locator(".config-action-bar").innerText().catch(() => null);
        const copyLive = await page.evaluate(() => [...document.querySelectorAll('[role="status"], [aria-live]:not([aria-live="off"])')].map((e) => e.textContent.trim()).filter((t) => /cop/i.test(t)));
        await page.getByRole("button", { name: /Reset/ }).click().catch(() => {}); await page.waitForTimeout(600);
        const afterReset = await s0.getAttribute("aria-valuenow");
        const resetLive = await page.evaluate(() => [...document.querySelectorAll('[role="status"], [aria-live]:not([aria-live="off"])')].map((e) => e.textContent.trim()).filter((t) => /reset|default|restor/i.test(t)));
        return { ...census, interaction: { before, moved, copyLabel, copyLive, afterReset, resetLive } };
    }));

    // ── ConfigSliderPane below 1024 (D-2): reachable in one tap? ──
    if (on("csp-mobile")) out.push(await cell(browser, "csp-mobile", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, async (page) => {
        await boot(page, "/blob", { settle: 4500 });
        const count = () => page.evaluate(() => document.querySelectorAll(".config-console [role=slider]").length);
        const atRest = await count();
        const candidates = await page.evaluate(() => [...document.querySelectorAll("button[aria-label], [role=tab]")].map((b) => b.getAttribute("aria-label") ?? b.textContent.trim()).filter(Boolean).slice(0, 30));
        let tapped = null;
        for (const name of ["Blob", "Show Blob", "Inspector", "Next pane"]) {
            const b = page.getByRole("button", { name, exact: true }).or(page.getByRole("tab", { name, exact: true }));
            if (await b.count()) { await b.first().tap().catch(() => {}); tapped = name; break; }
        }
        await page.waitForTimeout(2000);
        const afterTap = await count();
        await page.screenshot({ path: `${EVID}/csp-blob-390.png` });
        return { atRest, tapped, afterTap, candidates };
    }));
    save(`run-icc-${[...want].join("+") || "all"}.json`, out);
    console.log(JSON.stringify(out, null, 1).slice(0, 12000));
} finally {
    await browser.close();
}
