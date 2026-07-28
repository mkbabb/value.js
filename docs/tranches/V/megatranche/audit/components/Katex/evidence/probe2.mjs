import { webkit } from "@playwright/test";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/katex-seat";

const MEASURE = () => {
    const out = {};
    const disp = [...document.querySelectorAll(".katex-display")];
    out.n = disp.length;

    // rhythm: ink gap above/below the first display block
    const first = disp[0];
    if (first) {
        const wrap = first.parentElement;
        const prev = wrap.previousElementSibling;
        const next = wrap.nextElementSibling;
        const rangeInk = (el) => {
            const r = document.createRange();
            r.selectNodeContents(el);
            const rects = [...r.getClientRects()];
            if (!rects.length) return null;
            return {
                top: Math.min(...rects.map((x) => x.top)),
                bottom: Math.max(...rects.map((x) => x.bottom)),
                left: Math.min(...rects.map((x) => x.left)),
                right: Math.max(...rects.map((x) => x.right)),
            };
        };
        const kh = first.querySelector(".katex-html");
        const inkF = kh ? rangeInk(kh) : null;
        const inkP = prev ? rangeInk(prev) : null;
        const inkN = next ? rangeInk(next) : null;
        out.rhythm = {
            prevTag: prev ? prev.tagName : null,
            nextTag: next ? next.tagName : null,
            gapAbove: inkP && inkF ? +(inkF.top - inkP.bottom).toFixed(2) : null,
            gapBelow: inkN && inkF ? +(inkN.top - inkF.bottom).toFixed(2) : null,
        };
        // centering axis displacement
        const wr = wrap.getBoundingClientRect();
        const cs = getComputedStyle(wrap);
        const padL = parseFloat(cs.paddingLeft);
        const padR = parseFloat(cs.paddingRight);
        const contentCenter = wr.left + padL + (wr.width - padL - padR) / 2;
        const columnCenter = wr.left + wr.width / 2;
        out.axis = {
            padL: +padL.toFixed(3),
            padR: +padR.toFixed(3),
            contentCenter: +contentCenter.toFixed(2),
            columnCenter: +columnCenter.toFixed(2),
            displacement: +(contentCenter - columnCenter).toFixed(2),
        };
    }

    // horizontal overflow inventory + scrollbar affordance
    out.overflow = disp.map((d) => {
        const w = d.parentElement;
        return {
            scrollW: w.scrollWidth,
            clientW: w.clientWidth,
            hiddenPx: w.scrollWidth - w.clientWidth,
            hiddenPct: +(((w.scrollWidth - w.clientWidth) / w.scrollWidth) * 100).toFixed(1),
            scrollbarPx: w.offsetHeight - w.clientHeight,
        };
    });

    // inline math line-box behaviour
    const inlineWraps = [...document.querySelectorAll("div.inline-block")].filter(
        (w) => w.querySelector(":scope > .katex") && !w.querySelector(":scope > .katex-display"),
    );
    out.inline = inlineWraps.map((w) => {
        const p = w.closest("p,li");
        const pcs = p ? getComputedStyle(p) : null;
        const lh = pcs ? parseFloat(pcs.lineHeight) : null;
        const k = w.querySelector(".katex");
        const kr = k.getBoundingClientRect();
        return {
            text: w.textContent.slice(0, 34),
            katexH: +kr.height.toFixed(2),
            parentLineHeight: lh,
            exceedsLineBoxBy: lh ? +(kr.height - lh).toFixed(2) : null,
            wrapperH: +w.getBoundingClientRect().height.toFixed(2),
        };
    });

    // computed direction on math (RTL probe)
    const k0 = document.querySelector(".katex");
    if (k0) {
        const kcs = getComputedStyle(k0);
        out.mathDirection = kcs.direction;
        out.mathUnicodeBidi = kcs.unicodeBidi;
        out.mathTextAlign = kcs.textAlign;
        out.htmlDir = document.documentElement.getAttribute("dir");
    }

    // content-visibility placeholder vs real height
    out.cv = disp.map((d) => {
        const w = d.parentElement;
        const cs = getComputedStyle(w);
        return {
            contentVisibility: cs.contentVisibility,
            containIntrinsicSize: cs.containIntrinsicSize,
            realH: +w.getBoundingClientRect().height.toFixed(2),
        };
    });

    // forced-colors / reduced-motion resolution
    out.mq = {
        forcedColors: matchMedia("(forced-colors: active)").matches,
        reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
        contrast: matchMedia("(prefers-contrast: more)").matches,
    };

    // fraction-line & sqrt rendering primitives (forced-colors risk)
    const fl = document.querySelector(".katex .frac-line");
    if (fl) {
        const c = getComputedStyle(fl);
        out.fracLine = {
            borderBottomWidth: c.borderBottomWidth,
            borderBottomColor: c.borderBottomColor,
            borderBottomStyle: c.borderBottomStyle,
            height: +fl.getBoundingClientRect().height.toFixed(3),
        };
    }
    const svg = document.querySelector(".katex svg");
    out.svgCount = document.querySelectorAll(".katex svg").length;
    if (svg) {
        const p = svg.querySelector("path");
        out.svgPathFill = p ? getComputedStyle(p).fill : null;
        out.svgForcedColorAdjust = getComputedStyle(svg).forcedColorAdjust;
    }
    return out;
};

const run = async (opts, tag) => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: opts.w, height: opts.h },
        colorScheme: opts.scheme ?? "light",
        deviceScaleFactor: 2,
        reducedMotion: opts.reducedMotion,
        forcedColors: opts.forcedColors,
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(4500);
    if (opts.rtl) {
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(800);
    }
    if (opts.zoom) {
        await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, opts.zoom);
        await page.waitForTimeout(800);
    }
    if (opts.mobilePane) {
        // mobile shows left pane by default; try to reach the About pane
        await page.evaluate(() => {
            const el = [...document.querySelectorAll("button,a")].find((b) =>
                /about/i.test(b.textContent || b.getAttribute("aria-label") || ""),
            );
            if (el) el.click();
        });
        await page.waitForTimeout(1500);
    }
    const has = await page.evaluate(() => {
        const el = document.querySelector(".katex-display");
        if (!el) return false;
        el.scrollIntoView({ block: "center" });
        return true;
    });
    await page.waitForTimeout(1200);
    const data = has ? await page.evaluate(MEASURE) : { none: true };
    fs.writeFileSync(`${OUT}/${tag}.json`, JSON.stringify(data, null, 2));
    await page.screenshot({ path: `${OUT}/${tag}.png`, scale: "css" });
    await browser.close();
    console.log(tag, has ? "HAS-MATH" : "NO-MATH");
};

await run({ w: 1440, h: 900 }, "p2-base");
await run({ w: 1440, h: 900, rtl: true }, "p2-rtl");
await run({ w: 1440, h: 900, zoom: 2 }, "p2-zoom200");
await run({ w: 1440, h: 900, forcedColors: "active" }, "p2-forced");
await run({ w: 390, h: 844, mobilePane: true }, "p2-mobile390");
