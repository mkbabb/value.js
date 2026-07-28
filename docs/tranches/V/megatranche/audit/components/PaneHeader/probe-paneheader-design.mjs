// CHALLENGE-D · PaneHeader design probe. READ-ONLY against the live dev server.
// Measures: token resolution, cross-engine shrink ratio, rest vs stuck geometry,
// dead-acreage after the stuck title, RTL transform-origin anchoring, heading
// hierarchy, and the caption role.
import { webkit, chromium } from "playwright";

const ROUTES = ["/#/gradient", "/#/browse", "/#/palettes", "/#/mix", "/#/atmosphere"];
const SCROLL = 240;

const read = (page) =>
    page.evaluate(() => {
        const h = document.querySelector(".pane-header");
        if (!h) return { missing: true };
        const t = h.querySelector(".pane-header-title");
        const wrap = h.querySelector(".pane-header-desc-wrap");
        const p = wrap?.querySelector("p");
        const cs = getComputedStyle(h);
        const ts = getComputedStyle(t);
        const before = getComputedStyle(h, "::before");
        const hr = h.getBoundingClientRect();
        const tr = t.getBoundingClientRect();
        const pr = p?.getBoundingClientRect();
        return {
            supportsSDA: CSS.supports("animation-timeline", "scroll()"),
            typeHeading: cs.getPropertyValue("--type-heading").trim(),
            typeDisplay1: cs.getPropertyValue("--type-display-1").trim(),
            shrinkRatio: cs.getPropertyValue("--pane-title-shrink-ratio").trim(),
            veilRest: cs.getPropertyValue("--pane-veil-rest").trim(),
            headerH: +hr.height.toFixed(2),
            headerTop: +hr.top.toFixed(2),
            headerBottom: +hr.bottom.toFixed(2),
            headerPadTop: cs.paddingTop,
            headerPadBottom: cs.paddingBottom,
            titleRect: {
                x: +tr.left.toFixed(2),
                y: +tr.top.toFixed(2),
                w: +tr.width.toFixed(2),
                h: +tr.height.toFixed(2),
            },
            titleFontSize: ts.fontSize,
            titleWeight: ts.fontWeight,
            titleFamily: ts.fontFamily.split(",")[0],
            titleTransform: ts.transform,
            titleOrigin: ts.transformOrigin,
            descRect: pr
                ? { y: +pr.top.toFixed(2), h: +pr.height.toFixed(2) }
                : null,
            descWrapH: wrap ? +wrap.getBoundingClientRect().height.toFixed(2) : null,
            descOpacity: p ? getComputedStyle(p).opacity : null,
            descStyle: p ? getComputedStyle(p).fontStyle : null,
            descFamily: p ? getComputedStyle(p).fontFamily.split(",")[0] : null,
            descSize: p ? getComputedStyle(p).fontSize : null,
            descColor: p ? getComputedStyle(p).color : null,
            veilOpacity: before.opacity,
            veilBg: before.backgroundColor,
            veilFilter: before.backdropFilter || before.webkitBackdropFilter,
            // heading hierarchy over the whole document
            h1: document.querySelectorAll("h1").length,
            h2: document.querySelectorAll("h2").length,
            h3: document.querySelectorAll("h3").length,
            headerTag: h.querySelector(".pane-header-title")?.tagName,
            titleTabindex: t.getAttribute("tabindex"),
            titleId: t.id || null,
        };
    });

const scrollPane = (page, n) =>
    page.evaluate((n) => {
        const el = document.querySelector(".pane-scroll-fade");
        if (el) el.scrollTop = n;
        return el ? el.scrollTop : -1;
    }, n);

const results = [];
for (const [engName, eng] of [
    ["webkit", webkit],
    ["chromium", chromium],
]) {
    const b = await eng.launch();
    for (const [mName, vp, extra] of [
        ["desktop", { width: 1440, height: 900 }, {}],
        ["mobile", { width: 390, height: 844 }, {}],
        ["desktop-rtl", { width: 1440, height: 900 }, {}],
    ]) {
        const ctx = await b.newContext({ viewport: vp, ...extra });
        const page = await ctx.newPage();
        for (const route of ROUTES) {
            await page.goto(`http://localhost:9000${route}`, {
                waitUntil: "domcontentloaded",
                timeout: 45000,
            });
            await page.waitForTimeout(2600);
            if (mName === "desktop-rtl") {
                await page.evaluate(() => {
                    document.documentElement.setAttribute("dir", "rtl");
                });
                await page.waitForTimeout(400);
            }
            const rest = await read(page);
            if (rest.missing) {
                results.push({ eng: engName, matrix: mName, route, missing: true });
                continue;
            }
            const st = await scrollPane(page, SCROLL);
            await page.waitForTimeout(800);
            const stuck = await read(page);
            results.push({
                eng: engName,
                matrix: mName,
                route,
                scrolled: st,
                rest,
                stuck,
            });
        }
        await ctx.close();
    }
    await b.close();
}
console.log(JSON.stringify(results, null, 1));
