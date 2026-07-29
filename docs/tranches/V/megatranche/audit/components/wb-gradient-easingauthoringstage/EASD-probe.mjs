import { webkit } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const MEASURE = () => {
    const root = document.querySelector(".easing-authoring");
    if (!root) return { error: "no .easing-authoring in DOM" };
    const svgImg = root.querySelector("svg[role='img']");
    const svgAny = root.querySelector("svg");
    const cs = svgAny ? getComputedStyle(svgAny) : null;
    const rootCs = getComputedStyle(root);
    const picker = root.querySelector("[data-testid='easing-picker']");
    const pickerCs = picker ? getComputedStyle(picker) : null;
    const card = root.querySelector(".glass-card");
    const cardCs = card ? getComputedStyle(card) : null;
    const r = svgAny ? svgAny.getBoundingClientRect() : null;
    const vb = svgAny && svgAny.viewBox ? svgAny.viewBox.baseVal : null;
    let pathBox = null;
    const p = svgAny ? svgAny.querySelector("path") : null;
    if (p) {
        const b = p.getBBox();
        pathBox = { x: +b.x.toFixed(3), y: +b.y.toFixed(3), w: +b.width.toFixed(3), h: +b.height.toFixed(3) };
    }
    return {
        stageCount: document.querySelectorAll(".easing-authoring").length,
        svgRoleImgFound: !!svgImg,
        svgRoleAttr: svgAny ? svgAny.getAttribute("role") : null,
        svgAriaLabel: svgAny ? svgAny.getAttribute("aria-label") : null,
        vbRatioVar: rootCs.getPropertyValue("--vb-ratio").trim(),
        svgInlineStyle: svgAny ? svgAny.getAttribute("style") : null,
        computed: cs && {
            aspectRatio: cs.aspectRatio,
            blockSize: cs.blockSize,
            inlineSize: cs.inlineSize,
            marginInlineStart: cs.marginInlineStart,
            marginInlineEnd: cs.marginInlineEnd,
            transitionProperty: cs.transitionProperty,
            transitionDuration: cs.transitionDuration,
        },
        rect: r && { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
        viewBox: vb && { x: vb.x, y: vb.y, w: vb.width, h: vb.height },
        pathBox,
        pickerGridCols: pickerCs ? pickerCs.gridTemplateColumns : null,
        pickerWidth: picker ? +picker.getBoundingClientRect().width.toFixed(2) : null,
        cardBg: cardCs ? cardCs.backgroundColor : null,
        cardShadow: cardCs ? cardCs.boxShadow : null,
        cardBackdrop: cardCs ? (cardCs.backdropFilter || cardCs.webkitBackdropFilter) : null,
        cardRect: card ? (() => { const b = card.getBoundingClientRect(); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2) }; })() : null,
        handles: (() => {
            const hs = [...root.querySelectorAll("circle[role='slider']")];
            return hs.map((h) => { const b = h.getBoundingClientRect(); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2) }; });
        })(),
        selectTrigger: (() => {
            const t = root.querySelector("[aria-label='Easing preset']");
            if (!t) return null;
            const b = t.getBoundingClientRect();
            return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), tag: t.tagName };
        })(),
    };
};

async function run(label, opts) {
    const browser = await webkit.launch();
    const { dark, ...ctxOpts } = opts;
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    if (dark) {
        await page.evaluate(() => {
            document.documentElement.classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
        });
        await page.waitForTimeout(600);
    }
    const clicked = await page.evaluate(() => {
        const b = document.querySelector('button[aria-label="Author a custom curve"]');
        if (!b) return "no tune button";
        b.click();
        return "clicked";
    });
    await page.waitForTimeout(900);
    const m = await page.evaluate(MEASURE);
    await page.evaluate(() => {
        const r = document.querySelector(".easing-authoring");
        if (r) r.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/EASD-${label}-page.png` });
    const el = await page.$(".easing-authoring");
    if (el) await el.screenshot({ path: `${OUT}/EASD-${label}-stage.png` });
    const body = await page.$("#easing-interval-0");
    if (body) await body.screenshot({ path: `${OUT}/EASD-${label}-row.png` });
    console.log("=== " + label + " clicked=" + clicked);
    console.log(JSON.stringify(m, null, 1));
    console.log("errors:", JSON.stringify(errs.slice(0, 5)));
    await browser.close();
}

const which = process.argv[2];
const matrices = {
    "desktop-light": { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" },
    "desktop-dark": { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark", dark: true },
    "mobile-light": { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light", isMobile: true, hasTouch: true },
    "mobile-dark": { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark", dark: true, isMobile: true, hasTouch: true },
    "prm": { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "reduce" },
    "forced": { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", forcedColors: "active" },
    "zoom200": { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" },
    "narrow320": { viewport: { width: 320, height: 700 }, deviceScaleFactor: 2, colorScheme: "light", isMobile: true, hasTouch: true },
    "rtl": { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" },
};
await run(which, matrices[which]);
