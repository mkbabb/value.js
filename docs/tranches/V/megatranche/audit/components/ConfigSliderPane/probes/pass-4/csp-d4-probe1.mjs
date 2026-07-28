// CHALLENGE-D pass 4 — probe 1: structure, grouping, rhythm, scroll-context, contrast
import { chromium } from "playwright";

const lum = (r, g, b) => {
    const f = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
    const [l1, l2] = [lum(...a), lum(...b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
};

async function run(route, w, h, scheme) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 1,
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:9000/${route}`, { waitUntil: "load" });
    await page.waitForTimeout(6000);

    const out = await page.evaluate(() => {
        const res = {};
        const toRGB = (s) => {
            const c = document.createElement("canvas").getContext("2d");
            c.fillStyle = "#000";
            c.fillStyle = s;
            const v = c.fillStyle;
            if (v.startsWith("#")) {
                return [
                    parseInt(v.slice(1, 3), 16),
                    parseInt(v.slice(3, 5), 16),
                    parseInt(v.slice(5, 7), 16),
                ];
            }
            const m = v.match(/[\d.]+/g);
            return m ? m.slice(0, 3).map(Number) : null;
        };
        res.toRGB = null;

        const scroller = document.querySelector(".pane-scroll-fade");
        const console_ = document.querySelector(".config-console");
        res.present = { scroller: !!scroller, console: !!console_ };
        if (!console_) return res;

        // --- headings / grouping census inside the pane ---
        const paneRoot = console_.closest(".pane-scroll-fade")?.parentElement;
        res.headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
            (e) => ({ tag: e.tagName, text: e.textContent.trim().slice(0, 40) })
        );
        res.paneHeadings = paneRoot
            ? [...paneRoot.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((e) => ({
                  tag: e.tagName,
                  text: e.textContent.trim().slice(0, 40),
              }))
            : [];
        const secHeaders = [...console_.querySelectorAll(".config-section-header")];
        res.sectionCount = secHeaders.length;
        res.sectionMarkup = secHeaders.slice(0, 2).map((e) => e.outerHTML.slice(0, 220));
        res.groupRoles = {
            roleGroup: console_.querySelectorAll('[role="group"]').length,
            fieldset: console_.querySelectorAll("fieldset").length,
            ariaLabelledby: console_.querySelectorAll("[aria-labelledby]").length,
            headingRole: console_.querySelectorAll('[role="heading"]').length,
            ariaLevel: console_.querySelectorAll("[aria-level]").length,
        };

        // --- scroll geometry + scroll-context loss ---
        const sc = scroller;
        const scCS = getComputedStyle(sc);
        res.scroll = {
            scrollHeight: sc.scrollHeight,
            clientHeight: sc.clientHeight,
            hiddenPct: +((1 - sc.clientHeight / sc.scrollHeight) * 100).toFixed(1),
            overscrollBehavior: scCS.overscrollBehavior,
            overscrollBehaviorBlock: scCS.overscrollBehaviorBlock,
            scrollbarGutter: scCS.scrollbarGutter,
            scrollbarWidth: scCS.scrollbarWidth,
            scrollPaddingTop: scCS.scrollPaddingTop,
            scrollBehavior: scCS.scrollBehavior,
            maskImage: scCS.maskImage,
            contain: scCS.contain,
        };
        const header = document.querySelector(".pane-header");
        const hCS = header ? getComputedStyle(header) : null;
        res.header = header
            ? {
                  position: hCS.position,
                  top: hCS.top,
                  zIndex: hCS.zIndex,
                  height: +header.getBoundingClientRect().height.toFixed(1),
                  scrollMarginOnRows: getComputedStyle(
                      console_.querySelector(".configurator-row")
                  ).scrollMarginTop,
              }
            : null;

        // section header offsets within the scroll content
        const scTop = sc.getBoundingClientRect().top - sc.scrollTop;
        const secOffsets = secHeaders.map((e) => {
            const r = e.getBoundingClientRect();
            return {
                title: e.textContent.trim(),
                top: +(r.top - scTop).toFixed(1),
                bottom: +(r.bottom - scTop).toFixed(1),
            };
        });
        res.sections = secOffsets;
        // the visible port excludes the sticky header band
        const headerH = header ? header.getBoundingClientRect().height : 0;
        const maxScroll = sc.scrollHeight - sc.clientHeight;
        let noCtx = 0;
        const N = 1000;
        for (let i = 0; i <= N; i++) {
            const st = (maxScroll * i) / N;
            const viewTop = st + headerH; // occluded band
            const viewBot = st + sc.clientHeight;
            const any = secOffsets.some(
                (s) => s.bottom > viewTop && s.top < viewBot
            );
            if (!any) noCtx++;
        }
        res.scrollContextLossPct = +((noCtx / (N + 1)) * 100).toFixed(1);
        res.maxScroll = +maxScroll.toFixed(1);

        // --- rhythm: intra-row vs inter-row gaps ---
        const rows = [...console_.querySelectorAll(".configurator-row")];
        res.rowCount = rows.length;
        const g = [];
        for (const row of rows.slice(0, 6)) {
            const label = row.querySelector("label");
            const slider = row.querySelector(".glass-slider");
            if (!label || !slider) continue;
            g.push({
                label: label.textContent.trim(),
                labelBottom: +label.getBoundingClientRect().bottom.toFixed(1),
                sliderTop: +slider.getBoundingClientRect().top.toFixed(1),
                sliderBottom: +slider.getBoundingClientRect().bottom.toFixed(1),
                rowTop: +row.getBoundingClientRect().top.toFixed(1),
                rowBottom: +row.getBoundingClientRect().bottom.toFixed(1),
                rowH: +row.getBoundingClientRect().height.toFixed(1),
            });
        }
        res.rowGeom = g;
        const gaps = [];
        for (let i = 0; i < g.length; i++) {
            gaps.push({
                label: g[i].label,
                labelToSlider: +(g[i].sliderTop - g[i].labelBottom).toFixed(1),
                sliderToNextLabel:
                    i + 1 < g.length
                        ? +(g[i + 1].rowTop - g[i].sliderBottom).toFixed(1)
                        : null,
            });
        }
        res.gaps = gaps;
        const csRow = getComputedStyle(rows[0]);
        res.rowCS = {
            rowGap: csRow.rowGap,
            padding: csRow.padding,
            minBlockSize: csRow.minBlockSize,
            display: csRow.display,
        };
        res.consoleCS = (() => {
            const c = getComputedStyle(console_);
            return { gap: c.gap, padding: c.padding, background: c.backgroundColor };
        })();
        const secGroup = console_.firstElementChild;
        res.secGroupCS = secGroup
            ? { gap: getComputedStyle(secGroup).gap }
            : null;

        // --- contrast: section title / row label / readout vs the well ---
        const wellBG = getComputedStyle(console_).backgroundColor;
        const sTitle = console_.querySelector(".config-section-title");
        const rLabel = console_.querySelector(".configurator-row label");
        const rVal = console_.querySelector(".configurator-row .font-mono");
        const border = getComputedStyle(
            console_.querySelector(".config-section-header")
        ).borderBottomColor;
        res.ink = {
            wellBG,
            sectionTitle: sTitle ? getComputedStyle(sTitle).color : null,
            sectionTitleSize: sTitle ? getComputedStyle(sTitle).fontSize : null,
            sectionTitleFamily: sTitle
                ? getComputedStyle(sTitle).fontFamily.slice(0, 30)
                : null,
            rowLabel: rLabel ? getComputedStyle(rLabel).color : null,
            rowLabelSize: rLabel ? getComputedStyle(rLabel).fontSize : null,
            readout: rVal ? getComputedStyle(rVal).color : null,
            readoutSize: rVal ? getComputedStyle(rVal).fontSize : null,
            sectionBorder: border,
            track: (() => {
                const t = console_.querySelector(".slider-track");
                return t ? getComputedStyle(t).backgroundColor : null;
            })(),
        };

        // --- hover rules census ---
        const hoverRules = [];
        for (const sheet of document.styleSheets) {
            let rules;
            try {
                rules = sheet.cssRules;
            } catch {
                continue;
            }
            const walk = (rs) => {
                for (const r of rs) {
                    if (r.cssRules) walk(r.cssRules);
                    const sel = r.selectorText;
                    if (!sel) continue;
                    if (
                        /:hover/.test(sel) &&
                        /configurator-row|glass-slider|slider-track|slider-thumb/.test(
                            sel
                        )
                    )
                        hoverRules.push(sel);
                }
            };
            walk(rules);
        }
        res.hoverRules = [...new Set(hoverRules)];

        // --- action bar ---
        const bar = document.querySelector(".config-action-bar");
        if (bar) {
            const dock = bar.querySelector(".glass-dock, [data-slot='dock'], [class*='dock']");
            const btns = [...bar.querySelectorAll("button")];
            res.actionBar = {
                barRect: bar.getBoundingClientRect().toJSON(),
                barCS: {
                    padding: getComputedStyle(bar).padding,
                    borderTop: getComputedStyle(bar).borderTopColor,
                },
                dockClass: dock ? dock.className : null,
                dockRect: dock ? dock.getBoundingClientRect().toJSON() : null,
                buttons: btns.map((b) => {
                    const cs = getComputedStyle(b);
                    const before = getComputedStyle(b, "::before");
                    const after = getComputedStyle(b, "::after");
                    return {
                        text: b.textContent.trim(),
                        rect: b.getBoundingClientRect().toJSON(),
                        fontSize: cs.fontSize,
                        bg: cs.backgroundColor,
                        backgroundImage: cs.backgroundImage.slice(0, 80),
                        radius: cs.borderRadius,
                        beforeContent: before.content,
                        beforeBg: before.backgroundColor,
                        beforeInset: `${before.top}/${before.right}/${before.bottom}/${before.left}`,
                        afterContent: after.content,
                        afterBg: after.backgroundColor,
                        parentClass: b.parentElement.className,
                        parentRect: b.parentElement.getBoundingClientRect().toJSON(),
                        parentBg: getComputedStyle(b.parentElement).backgroundColor,
                    };
                }),
            };
        }
        return res;
    });

    // contrast computations in node
    const parse = (s) => {
        if (!s) return null;
        const m = s.match(/[\d.]+/g);
        return m ? m.slice(0, 3).map(Number) : null;
    };
    if (out.ink) {
        const bg = parse(out.ink.wellBG);
        out.contrast = {};
        for (const k of ["sectionTitle", "rowLabel", "readout", "sectionBorder", "track"]) {
            const c = parse(out.ink[k]);
            out.contrast[k] = c && bg ? +ratio(c, bg).toFixed(2) : null;
        }
    }

    console.log("=====", route, `${w}x${h}`, scheme, "=====");
    console.log(JSON.stringify(out, null, 1));
    await browser.close();
}

const [route, w, h, scheme] = process.argv.slice(2);
await run(route, +w, +h, scheme);
