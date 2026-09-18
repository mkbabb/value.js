// CHALLENGE-D (2026-07-27) read-only DESIGN probe of CurrentPaletteEditor.vue.
// Seeds the persisted color-session projection (localStorage "color-picker") so the
// current-palette buffer is populated without depending on the add-slot CTA.
// No repo source is touched. Output: probe-D.json + frames-D/*.png
import { webkit } from "@playwright/test";
import fs from "node:fs";

const ORIGIN = "http://localhost:9000";
const ROOT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${ROOT}/frames-D`;
fs.mkdirSync(OUT, { recursive: true });

const FIVE = ["#e2571f", "#12b8bd", "#ffc60b", "#25232b", "#6aab2f"];
const MANY = Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`);

const MEASURE = () => {
    const q = (s, r = document) => r.querySelector(s);
    const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
    const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    };
    // The VISIBLE well: the pane mounts in two layout slots; pick the one with area.
    const wells = qa(".dashed-well").filter((w) => w.getBoundingClientRect().width > 0);
    const well = wells.find((w) => w.textContent.match(/Current Palette|Start a new palette/)) ?? wells[0];
    if (!well) return { error: "no visible .dashed-well", wellCount: qa(".dashed-well").length };

    const cs = (el, ...props) => {
        const c = getComputedStyle(el);
        const o = {};
        for (const p of props) o[p] = c.getPropertyValue(p);
        return o;
    };
    const srgb = (str) => {
        const m = str.match(/[\d.]+/g);
        if (!m) return null;
        return [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]];
    };
    const lum = (c) => {
        const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
    };
    const contrast = (fg, bg) => {
        const a = srgb(fg), b = srgb(bg);
        if (!a || !b) return null;
        const L1 = lum(a), L2 = lum(b);
        return +(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05))).toFixed(2);
    };
    // walk up for first opaque background
    const bgOf = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
            const b = getComputedStyle(n).backgroundColor;
            const p = srgb(b);
            if (p && p[3] === 1) return b;
            n = n.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
    };

    const header = well.querySelector("span");
    const countSpan = qa("span", well).find((s) => /color(s)?$/.test(s.textContent.trim()));
    const row = well.querySelector(".swatch-row");
    const addSlot = well.querySelector(".add-slot-ghost");
    const dots = qa("[data-testid=watercolor-swatch]", well);
    const chip = well.querySelector(".api-offline-chip");
    const input = well.querySelector("input");
    const saveBtn = qa("button", well).find((b) => b.querySelector("svg") && !b.closest(".swatch-row"));

    const describe = (el) => el ? {
        tag: el.tagName.toLowerCase(),
        cls: el.getAttribute("class"),
        ariaHidden: el.getAttribute("aria-hidden"),
        ariaLabel: el.getAttribute("aria-label"),
        tagAttr: el.getAttribute("tag"),
        role: el.getAttribute("role"),
        tabIndex: el.tabIndex,
        pointerEvents: getComputedStyle(el).pointerEvents,
        childSvgs: el.querySelectorAll("svg").length,
        childSvgNonFilter: Array.from(el.querySelectorAll("svg")).filter((s) => !s.classList.contains("watercolor-filter-host")).length,
        rect: rect(el),
        bg: getComputedStyle(el).backgroundColor,
        borderStyle: getComputedStyle(el).borderStyle,
        borderColor: getComputedStyle(el).borderColor,
        borderWidth: getComputedStyle(el).borderWidth,
    } : null;

    const wellR = rect(well);
    const rowR = rect(row);
    // ink area of the swatch row = union of dot rects
    let inkW = 0;
    for (const d of dots) inkW += d.getBoundingClientRect().width;

    return {
        wellCount: wells.length,
        well: {
            rect: wellR,
            ...cs(well, "padding", "gap", "border", "border-radius", "background-color", "box-shadow"),
            childZones: Array.from(well.children).map((c) => ({
                tag: c.tagName.toLowerCase(), cls: c.getAttribute("class"), rect: rect(c),
            })),
        },
        header: header ? {
            text: header.textContent.trim(),
            ...cs(header, "font-family", "font-size", "font-weight", "color", "line-height"),
            contrastVsWell: contrast(getComputedStyle(header).color, bgOf(header)),
            wellBg: bgOf(header),
        } : null,
        count: countSpan ? {
            text: countSpan.textContent.trim(),
            ...cs(countSpan, "font-family", "font-size", "font-weight", "color"),
            contrastVsWell: contrast(getComputedStyle(countSpan).color, bgOf(countSpan)),
        } : null,
        swatchRow: rowR ? { rect: rowR, gap: getComputedStyle(row).gap, wrap: getComputedStyle(row).flexWrap, dotCount: dots.length, inkWidth: +inkW.toFixed(1), fillRatio: +(inkW / rowR.w).toFixed(3) } : null,
        addSlot: describe(addSlot),
        addSlotIsButton: addSlot ? addSlot.tagName.toLowerCase() === "button" : null,
        dots: dots.map(describe).slice(0, 8),
        dotsAllAriaHidden: dots.length > 0 && dots.every((d) => d.getAttribute("aria-hidden") === "true"),
        dotsAllPointerNone: dots.length > 0 && dots.every((d) => getComputedStyle(d).pointerEvents === "none"),
        chip: chip ? { text: chip.textContent.trim(), role: chip.getAttribute("role"), rect: rect(chip), color: getComputedStyle(chip).color, contrast: contrast(getComputedStyle(chip).color, bgOf(chip)) } : null,
        globalChipCount: qa(".api-offline-chip").length + qa(".dock-status-lamp").length,
        globalAlertRoles: qa("[role=alert]").map((e) => e.textContent.trim().slice(0, 60)),
        input: input ? { rect: rect(input), placeholder: input.placeholder, fontSize: getComputedStyle(input).fontSize } : null,
        saveBtn: saveBtn ? { ...describe(saveBtn), accName: saveBtn.getAttribute("aria-label") ?? saveBtn.textContent.trim(), title: saveBtn.getAttribute("title") } : null,
        // every focusable inside the well, in DOM order
        focusables: qa("a[href],button,input,select,textarea,[tabindex]:not([tabindex='-1'])", well).map((e) => ({
            tag: e.tagName.toLowerCase(),
            name: e.getAttribute("aria-label") ?? e.getAttribute("placeholder") ?? e.textContent.trim().slice(0, 40),
            rect: rect(e),
        })),
        buttonsInWell: qa("button", well).length,
        // does the well overflow its parent?
        parentRect: rect(well.parentElement),
        overflowsParent: well.parentElement ? (rect(well).w > rect(well.parentElement).w + 0.5) : null,
        editOverlay: (() => {
            const eo = well.querySelector(".edit-overlay");
            return eo ? { rect: rect(eo), display: getComputedStyle(eo).display } : null;
        })(),
        floatingPanels: qa("body > .floating-panel").map((p) => ({ rect: rect(p), ariaHidden: p.getAttribute("aria-hidden"), buttons: p.querySelectorAll("button").length })),
    };
};

async function scenario(browser, name, opts) {
    const { colors = FIVE, w = 1440, h = 900, scheme = "light", rtl = false, forcedColors = "none", reducedMotion = "no-preference", zoom = 1, hoverFirstSwatch = false, tabWalk = false } = opts;
    const ctx = await browser.newContext({
        viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2,
        forcedColors, reducedMotion,
    });
    await ctx.addInitScript(([cols, isRtl]) => {
        localStorage.setItem("color-picker", JSON.stringify({ inputColor: "#e2571f", savedColors: cols }));
        if (isRtl) {
            const set = () => document.documentElement.setAttribute("dir", "rtl");
            set(); document.addEventListener("DOMContentLoaded", set);
        }
    }, [colors, rtl]);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(4200);
    if (zoom !== 1) { await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, zoom); await page.waitForTimeout(600); }
    if (rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(400); }

    if (hoverFirstSwatch) {
        const target = await page.evaluate(() => {
            const wells = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0);
            const well = wells[0]; if (!well) return null;
            const wrap = well.querySelector(".swatch-row > div.relative");
            if (!wrap) return null;
            const r = wrap.getBoundingClientRect();
            return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
        });
        if (target) { await page.mouse.move(target.x, target.y); await page.waitForTimeout(700); }
    }

    let tabOrder = null;
    if (tabWalk) {
        tabOrder = await page.evaluate(async () => {
            const wells = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0);
            const well = wells[0];
            const all = Array.from(document.querySelectorAll("a[href],button,input,select,textarea,[tabindex]:not([tabindex='-1'])"))
                .filter((e) => e.offsetParent !== null || getComputedStyle(e).position === "fixed");
            return all.map((e, i) => ({
                i, tag: e.tagName.toLowerCase(),
                inWell: !!(well && well.contains(e)),
                name: (e.getAttribute("aria-label") ?? e.getAttribute("placeholder") ?? e.textContent.trim()).slice(0, 44),
            })).filter((r) => r.inWell);
        });
    }

    const data = await page.evaluate(MEASURE);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
    // tight crop of the well
    if (data && data.well && data.well.rect) {
        const r = data.well.rect;
        const pad = 18;
        try {
            await page.screenshot({
                path: `${OUT}/${name}-well.png`,
                clip: { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: Math.min(w - Math.max(0, r.x - pad), r.w + pad * 2), height: Math.min(h - Math.max(0, r.y - pad), r.h + pad * 2) },
            });
        } catch (e) { /* clip out of range */ }
    }
    await ctx.close();
    return { name, opts: { w, h, scheme, rtl, forcedColors, reducedMotion, zoom, colors: colors.length }, pageErrors: errs, tabOrder, ...data };
}

const browser = await webkit.launch();
const results = [];
results.push(await scenario(browser, "empty-desktop-light", { colors: [], tabWalk: true }));
results.push(await scenario(browser, "five-desktop-light", { tabWalk: true }));
results.push(await scenario(browser, "five-desktop-dark", { scheme: "dark" }));
results.push(await scenario(browser, "five-desktop-hover", { hoverFirstSwatch: true }));
results.push(await scenario(browser, "many24-desktop-light", { colors: MANY }));
results.push(await scenario(browser, "five-mobile-390", { w: 390, h: 844 }));
results.push(await scenario(browser, "many24-mobile-390", { colors: MANY, w: 390, h: 844 }));
results.push(await scenario(browser, "five-forced-colors", { forcedColors: "active" }));
results.push(await scenario(browser, "five-rtl", { rtl: true }));
results.push(await scenario(browser, "five-reduced-motion", { reducedMotion: "reduce" }));
results.push(await scenario(browser, "five-zoom200", { zoom: 2, w: 1440, h: 900 }));
await browser.close();

fs.writeFileSync(`${ROOT}/probe-D.json`, JSON.stringify(results, null, 2));
for (const r of results) {
    console.log("===", r.name, r.error ?? "", "pageErrors:", r.pageErrors.length);
    if (r.well) console.log("  well", JSON.stringify(r.well.rect), "swatchRow", JSON.stringify(r.swatchRow));
    if (r.addSlot) console.log("  addSlot tag=", r.addSlot.tag, "ariaHidden=", r.addSlot.ariaHidden, "tagAttr=", r.addSlot.tagAttr, "pe=", r.addSlot.pointerEvents, "svgNonFilter=", r.addSlot.childSvgNonFilter, "rect=", JSON.stringify(r.addSlot.rect));
    if (r.header) console.log("  header", r.header.text, r.header["font-family"], r.header["font-size"], r.header["font-weight"], "contrast", r.header.contrastVsWell);
    if (r.count) console.log("  count", r.count.text, r.count["font-family"], r.count["font-size"], "contrast", r.count.contrastVsWell);
    if (r.saveBtn) console.log("  saveBtn accName=", JSON.stringify(r.saveBtn.accName), "rect", JSON.stringify(r.saveBtn.rect));
    console.log("  focusables:", JSON.stringify(r.focusables));
    console.log("  dotsAllAriaHidden:", r.dotsAllAriaHidden, "dotsAllPointerNone:", r.dotsAllPointerNone, "buttonsInWell:", r.buttonsInWell);
    if (r.chip) console.log("  chip", JSON.stringify(r.chip));
    console.log("  globalAlertRoles:", JSON.stringify(r.globalAlertRoles));
    if (r.floatingPanels?.length) console.log("  floatingPanels:", JSON.stringify(r.floatingPanels));
}
