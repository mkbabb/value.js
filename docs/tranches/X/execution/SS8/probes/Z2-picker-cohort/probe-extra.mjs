// SERVED MODEL: claude-opus-5-5 · SS-8 Z2 (2026-10-20 seat) — the obligations the three banked probes do not decide:
// L-2/D-13 mobile action parity (VISIBLE, not merely in-DOM), CSP C-1 reset domain via the pane's own Copy JSON,
// CSP G-PAINT settled range vs track, CSP C-4/D-10 status, picker C-13 live-region identity.
// Usage: node probe-extra.mjs [cell ...]. One browser per run, one context per cell, closed in finally.
import { launch, cell, boot, save, EVID } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (n) => want.size === 0 || want.has(n);
const browser = await launch();
const out = [];
const ACTIONS = ["Reset color", "Copy color", "Random color", "Palettes", "Extract palette", "Open color input"];
const visibleActions = (page) => page.evaluate((names) => names.map((n) => {
    const els = [...document.querySelectorAll(`[aria-label="${n}"]`)];
    const vis = els.filter((e) => {
        const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        if (r.width < 1 || r.height < 1 || cs.visibility === "hidden" || +cs.opacity === 0) return false;
        if (e.closest("[inert],[aria-hidden=true],[hidden]")) return false;
        return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
    });
    return { n, inDom: els.length, visible: vis.length };
}), ACTIONS);

try {
    for (const [name, opts] of [["parity-1440", {}], ["parity-390", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
        if (!on("parity")) break;
        out.push(await cell(browser, name, opts, async (page) => {
            await boot(page, "/", { settle: 4500 });
            const r = { rest: await visibleActions(page) };
            // disclose: the dock's own controls, each tried once, recount after each
            r.steps = [];
            for (const label of ["Toggle action bar", "Menu"]) {
                const b = page.locator(`[aria-label="${label}"]`).first();
                if (!(await b.count()) || !(await b.isVisible().catch(() => false))) { r.steps.push({ label, clickable: false }); continue; }
                await (opts.hasTouch ? b.tap() : b.click()).catch(() => {});
                await page.waitForTimeout(1200);
                r.steps.push({ label, clickable: true, after: await visibleActions(page), menuItems: await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"],[role="menuitemradio"]')].filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.textContent.trim().slice(0, 30)).slice(0, 20)) });
                await page.keyboard.press("Escape"); await page.waitForTimeout(500);
            }
            // free-text colour entry reachable? (D-13)
            const open = page.locator('[aria-label="Open color input"]').first();
            r.colorEntry = { openVisible: await open.isVisible().catch(() => false) };
            if (r.colorEntry.openVisible) {
                await (opts.hasTouch ? open.tap() : open.click()).catch(() => {}); await page.waitForTimeout(1200);
                const f = page.locator('[aria-label="Enter a CSS color"]').first();
                r.colorEntry.fieldVisible = await f.isVisible().catch(() => false);
                if (r.colorEntry.fieldVisible) {
                    await f.click(); await page.keyboard.press("ControlOrMeta+A"); await page.keyboard.type("rgb(10 200 30)"); await page.keyboard.press("Enter");
                    await page.waitForTimeout(2600);
                    r.colorEntry.titleAfter = await page.title();
                }
            }
            await page.screenshot({ path: `${EVID}/parity-${name}.png` });
            return r;
        }));
    }

    // picker live region identity (C-13) — what is the polite region inside the picker shell?
    if (on("live")) out.push(await cell(browser, "picker-live", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        return page.evaluate(() => [...document.querySelectorAll('.pane-shell [aria-live], .pane-shell [role="status"], .pane-shell [role="alert"]')].map((e) => ({
            tag: e.tagName, role: e.getAttribute("role"), live: e.getAttribute("aria-live"), cls: String(e.className).slice(0, 80), text: e.textContent.trim().slice(0, 80),
            inReadout: !!e.closest(".readout"), pane: e.closest(".pane-shell")?.querySelector("h1,h2,h3")?.textContent.trim().slice(0, 30),
        })));
    }));

    // ConfigSliderPane on both hosts: reset domain (C-1), status (C-4/D-10), settled paint (G-PAINT), recipes (D-7), lines (D-6)
    for (const route of ["/atmosphere", "/blob"]) {
        if (!on("csp")) break;
        out.push(await cell(browser, `csp${route.replace("/", "-")}`, { permissions: ["clipboard-read", "clipboard-write"] }, async (page) => {
            await boot(page, route, { settle: 4500 });
            const clip = () => page.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e));
            const copyBtn = page.getByRole("button", { name: /Copy JSON|Copied/ }).first();
            const resetBtn = page.getByRole("button", { name: /Reset/ }).first();
            const r = { hasConsole: await page.locator(".config-console").count() };
            if (!r.hasConsole) return r;
            r.paint = await page.evaluate(async () => {
                await new Promise((res) => setTimeout(res, 800));
                const sl = [...document.querySelectorAll(".config-console [role=slider]")];
                const lum = (c) => { const m = c.match(/[\d.]+/g); if (!m) return null; const [R, G, B] = m.slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * R + 0.7152 * G + 0.0722 * B; };
                return sl.slice(0, 40).map((s) => {
                    const g = s.closest(".glass-slider") ?? s.closest("[data-variant]");
                    const range = g?.querySelector(".slider-range"), track = g?.querySelector(".slider-track");
                    const rc = range && getComputedStyle(range), tc = track && getComputedStyle(track);
                    const rl = rc && lum(rc.backgroundColor), tl = tc && lum(tc.backgroundColor);
                    const alpha = (c) => { const m = c?.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean); return p.length > 3 ? +p[3] : 1; };
                    return { label: s.getAttribute("aria-label"), variant: g?.getAttribute("data-variant"), size: g?.getAttribute("data-size") ?? s.closest("[data-size]")?.getAttribute("data-size") ?? null,
                        rangeBg: rc?.backgroundColor, rangeAlpha: alpha(rc?.backgroundColor), rangeImg: rc?.backgroundImage?.slice(0, 40), trackBg: tc?.backgroundColor,
                        contrast: rl != null && tl != null ? +((Math.max(rl, tl) + 0.05) / (Math.min(rl, tl) + 0.05)).toFixed(2) : null,
                        valuetext: s.getAttribute("aria-valuetext"), now: s.getAttribute("aria-valuenow"), labelledby: s.getAttribute("aria-labelledby"), disabled: s.getAttribute("aria-disabled"),
                        shown: [...(s.closest(".configurator-row") ?? g?.parentElement ?? s).querySelectorAll("*")].find((e) => e.children.length === 0 && /^-?\d+(\.\d+)?/.test(e.textContent.trim()))?.textContent.trim() ?? null };
                });
            });
            r.census = await page.evaluate(() => {
                const pane = document.querySelector(".config-console").closest('[data-slot="card"]');
                const rec = (e) => { if (!e) return null; const c = getComputedStyle(e); return [c.fontFamily.split(",")[0], c.fontSize, c.fontWeight, c.letterSpacing, c.textTransform].join(" | "); };
                const head = pane.querySelector(".config-section-title");
                const row = pane.querySelector(".configurator-row");
                const rowLabel = row && [...row.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim() && !/^-?\d/.test(e.textContent.trim()));
                const lines = [...pane.querySelectorAll("*")].filter((e) => { const c = getComputedStyle(e), b = e.getBoundingClientRect(); if (b.width < 100) return false; const side = (w, s, col) => parseFloat(w) > 0 && s !== "none" && !/rgba\(0, 0, 0, 0\)|transparent/.test(col); return side(c.borderTopWidth, c.borderTopStyle, c.borderTopColor) || side(c.borderBottomWidth, c.borderBottomStyle, c.borderBottomColor) || (b.height <= 2 && c.backgroundColor !== "rgba(0, 0, 0, 0)"); }).length;
                return { sliders: pane.querySelectorAll("[role=slider]").length, groups: pane.querySelectorAll('[role="group"]').length, labelsFor: pane.querySelectorAll("label[for]").length,
                    headRecipe: rec(head), rowLabelRecipe: rec(rowLabel), rowLabel: rowLabel?.textContent.trim(), dividingLines: lines,
                    liveRegions: [...pane.querySelectorAll('[role="status"], [aria-live]:not([aria-live="off"])')].map((e) => `${e.tagName}|${e.getAttribute("role")}|${e.getAttribute("aria-live")}|${e.textContent.trim().slice(0, 30)}`),
                    nestedCards: pane.querySelectorAll('[data-slot="card"]').length, docks: document.querySelectorAll(".glass-dock").length,
                    rowH: row && +row.getBoundingClientRect().height.toFixed(2), thumb: (() => { const t = pane.querySelector(".slider-thumb"); const b = t?.getBoundingClientRect(); return b && `${b.width.toFixed(1)}x${b.height.toFixed(1)}`; })() };
            });
            // copy → read clipboard (reset-domain baseline), move a knob, reset, copy again
            await copyBtn.click().catch(() => {}); await page.waitForTimeout(150);
            r.copyLabelAfterClick = (await copyBtn.innerText().catch(() => null))?.trim() ?? null;
            r.copyLabelAria = await copyBtn.getAttribute("aria-label").catch(() => null);
            r.liveAfterCopy = await page.evaluate(() => [...document.querySelectorAll('[role="status"], [aria-live]:not([aria-live="off"])')].map((e) => e.textContent.trim()).filter((t) => /cop/i.test(t)).slice(0, 4));
            const j0 = await clip();
            const s0 = page.locator(".config-console [role=slider]").first();
            const v0 = await s0.getAttribute("aria-valuenow");
            await s0.focus(); for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowRight"); await page.waitForTimeout(300);
            const v1 = await s0.getAttribute("aria-valuenow");
            await resetBtn.click().catch(() => {}); await page.waitForTimeout(700);
            const v2 = await s0.getAttribute("aria-valuenow");
            r.liveAfterReset = await page.evaluate(() => [...document.querySelectorAll('[role="status"], [aria-live]:not([aria-live="off"])')].map((e) => e.textContent.trim()).filter((t) => /reset|default|restor/i.test(t)).slice(0, 4));
            await page.waitForTimeout(1600);
            await copyBtn.click().catch(() => {}); await page.waitForTimeout(200);
            const j1 = await clip();
            const pick = (j) => { try { const o = JSON.parse(j); return { paletteStops: o?.color?.paletteStops ?? o?.paletteStops ?? null, topKeys: Object.keys(o).slice(0, 12) }; } catch { return { raw: String(j).slice(0, 80) }; } };
            r.reset = { firstKnob: { v0, v1, v2 }, before: pick(j0), after: pick(j1) };
            await page.screenshot({ path: `${EVID}/csp${route.replace("/", "-")}-1440.png` });
            return r;
        }));
    }
    save(`run-extra-${[...want].join("+") || "all"}.json`, out);
    console.log(JSON.stringify(out, null, 1).slice(0, 4000));
} finally {
    await browser.close();
}
