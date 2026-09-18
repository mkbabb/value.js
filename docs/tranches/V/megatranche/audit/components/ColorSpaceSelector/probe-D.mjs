// CHALLENGE-D design probe — read-only live telemetry for ColorSpaceSelector.
// Usage: node docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/probe-D.mjs
import { webkit, chromium } from "playwright";

const ORIGIN = "http://localhost:9000";

const MEASURE = () => {
    const out = {};
    const trig = [...document.querySelectorAll(".space-trigger")];
    out.triggerCount = trig.length;
    out.triggers = trig.map((t) => {
        const cs = getComputedStyle(t);
        const r = t.getBoundingClientRect();
        const svg = t.querySelector("svg");
        const sr = svg ? svg.getBoundingClientRect() : null;
        return {
            inline: t.classList.contains("space-trigger--inline"),
            text: t.textContent.trim(),
            ariaLabel: t.getAttribute("aria-label"),
            role: t.getAttribute("role"),
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            fontFamily: cs.fontFamily.split(",")[0],
            color: cs.color,
            rect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2), x: +r.x.toFixed(2), y: +r.y.toFixed(2) },
            caret: sr ? { w: +sr.width.toFixed(2), h: +sr.height.toFixed(2) } : null,
            transition: cs.transitionProperty + " / " + cs.transitionDuration,
        };
    });
    // the numeric headline in the picker header
    const head =
        document.querySelector(".color-component-display, [class*='readout'], .picker-header .font-mono") ||
        null;
    const cands = [...document.querySelectorAll(".picker-header *")]
        .filter((e) => /^[\d.,%\s]+$/.test(e.textContent) && e.textContent.trim().length > 3)
        .map((e) => ({
            cls: e.className && e.className.baseVal !== undefined ? e.className.baseVal : String(e.className),
            tag: e.tagName,
            fs: getComputedStyle(e).fontSize,
            ff: getComputedStyle(e).fontFamily.split(",")[0],
            rect: (() => { const r = e.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), y: +r.y.toFixed(1) }; })(),
            txt: e.textContent.trim().slice(0, 30),
        }));
    out.headlineCandidates = cands.slice(0, 8);
    // plate background behind the picker trigger
    const plate = document.querySelector(".picker-header");
    if (plate) {
        out.plateBg = getComputedStyle(plate).backgroundColor;
        let p = plate;
        while (p && getComputedStyle(p).backgroundColor === "rgba(0, 0, 0, 0)") p = p.parentElement;
        out.plateBgResolved = p ? getComputedStyle(p).backgroundColor : null;
        out.plateBgOwner = p ? p.className.toString().slice(0, 60) : null;
    }
    out.tokens = {
        display1: getComputedStyle(document.documentElement).getPropertyValue("--type-display-1").trim(),
        display2: getComputedStyle(document.documentElement).getPropertyValue("--type-display-2").trim(),
        display3: getComputedStyle(document.documentElement).getPropertyValue("--type-display-3").trim(),
        weightDisplay: getComputedStyle(document.documentElement).getPropertyValue("--type-weight-display").trim(),
        durationFast: getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(),
    };
    return out;
};

const OPEN_MEASURE = () => {
    const out = {};
    const items = [...document.querySelectorAll("[role='option']")];
    out.optionCount = items.length;
    out.items = items.map((it) => {
        const r = it.getBoundingClientRect();
        const dot = it.querySelector(".specimen-dot");
        const cap = it.querySelector(".specimen-caption");
        const gutter = it.querySelector("span[aria-hidden='true'].absolute");
        const name = it.querySelector(".specimen-name");
        return {
            text: (name ? name.textContent : it.textContent).trim().slice(0, 24),
            ariaSelected: it.getAttribute("aria-selected"),
            dataState: it.getAttribute("data-state"),
            dataHighlighted: it.hasAttribute("data-highlighted"),
            rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            gutterPresent: !!gutter,
            dotOpacity: dot ? getComputedStyle(dot).opacity : null,
            dotClass: dot ? dot.className.toString() : null,
            capFontSize: cap ? getComputedStyle(cap).fontSize : null,
            capColor: cap ? getComputedStyle(cap).color : null,
            capText: cap ? cap.textContent.trim() : null,
            capTruncated: cap ? cap.scrollWidth > cap.clientWidth + 0.5 : null,
            capScroll: cap ? [cap.scrollWidth, cap.clientWidth] : null,
            nameFontSize: name ? getComputedStyle(name).fontSize : null,
            nameWeight: name ? getComputedStyle(name).fontWeight : null,
            nameFamily: name ? getComputedStyle(name).fontFamily.split(",")[0] : null,
        };
    });
    const content = document.querySelector("[role='listbox']");
    if (content) {
        const r = content.getBoundingClientRect();
        const cs = getComputedStyle(content);
        out.content = {
            rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +r.x.toFixed(1), y: +r.y.toFixed(1) },
            overflowY: cs.overflowY,
            maxHeight: cs.maxHeight,
            scrollH: content.scrollHeight,
            clientH: content.clientHeight,
            clipped: content.scrollHeight > content.clientHeight + 0.5,
        };
        out.viewportH = window.innerHeight;
        out.contentBottomOverflow = +(r.bottom - window.innerHeight).toFixed(1);
    }
    return out;
};

async function run(browserType, name, opts, tasks) {
    const b = await browserType.launch();
    const results = {};
    for (const t of tasks) {
        const ctx = await b.newContext({
            viewport: t.viewport,
            colorScheme: t.scheme,
            reducedMotion: t.reducedMotion,
            deviceScaleFactor: 2,
            ...(t.ctx || {}),
        });
        const page = await ctx.newPage();
        if (t.forcedColors) await page.emulateMedia({ forcedColors: "active" });
        await page.goto(ORIGIN + (t.hash || "/#/"), { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(t.settle ?? 3500);
        const m = await page.evaluate(MEASURE);
        let om = null;
        if (t.open) {
            const trigs = await page.locator(".space-trigger").all();
            const idx = t.openIndex ?? 0;
            if (trigs[idx]) {
                await trigs[idx].click();
                await page.waitForTimeout(700);
                om = await page.evaluate(OPEN_MEASURE);
                if (t.shot) await page.screenshot({ path: t.shot, fullPage: false });
            }
        } else if (t.shot) {
            await page.screenshot({ path: t.shot });
        }
        results[t.name] = { measure: m, open: om };
        await ctx.close();
    }
    await b.close();
    return results;
}

const DIR = "docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/";
const tasks = [
    { name: "wk-1440-light", viewport: { width: 1440, height: 900 }, scheme: "light" },
    { name: "wk-1440-dark", viewport: { width: 1440, height: 900 }, scheme: "dark" },
    { name: "wk-390-light", viewport: { width: 390, height: 844 }, scheme: "light" },
    { name: "wk-320-light", viewport: { width: 320, height: 700 }, scheme: "light" },
    {
        name: "wk-1440-light-open",
        viewport: { width: 1440, height: 900 },
        scheme: "light",
        open: true,
        openIndex: 0,
        shot: DIR + "D-open-1440-light.png",
    },
    {
        name: "wk-390-light-open",
        viewport: { width: 390, height: 844 },
        scheme: "light",
        open: true,
        openIndex: 0,
        shot: DIR + "D-open-390-light.png",
    },
    {
        name: "wk-1440-dark-open",
        viewport: { width: 1440, height: 900 },
        scheme: "dark",
        open: true,
        openIndex: 0,
        shot: DIR + "D-open-1440-dark.png",
    },
    {
        name: "wk-1440-light-open-about",
        viewport: { width: 1440, height: 900 },
        scheme: "light",
        open: true,
        openIndex: 1,
        shot: DIR + "D-open-1440-about.png",
    },
    {
        name: "wk-1440-rtl",
        viewport: { width: 1440, height: 900 },
        scheme: "light",
        open: true,
        openIndex: 0,
        ctx: { locale: "ar-EG" },
        shot: DIR + "D-open-1440-rtl.png",
    },
    {
        name: "wk-1440-forcedcolors",
        viewport: { width: 1440, height: 900 },
        scheme: "dark",
        forcedColors: true,
        open: true,
        openIndex: 0,
        shot: DIR + "D-open-1440-forcedcolors.png",
    },
    {
        name: "wk-1440-prm",
        viewport: { width: 1440, height: 900 },
        scheme: "light",
        reducedMotion: "reduce",
        open: true,
        openIndex: 0,
    },
    {
        name: "wk-2880-zoom200",
        viewport: { width: 720, height: 450 },
        scheme: "light",
        open: true,
        openIndex: 0,
        shot: DIR + "D-open-zoom200.png",
    },
];

const res = await run(webkit, "webkit", {}, tasks);
console.log(JSON.stringify(res, null, 1));
