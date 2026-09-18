// CHALLENGE-D pass 4 — probe 2: structure + true-pixel contrast (canvas readback)
import { chromium } from "playwright";

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
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const cx = cv.getContext("2d", { willReadFrequently: true });
        const px = (css, over) => {
            cx.clearRect(0, 0, 1, 1);
            if (over) {
                cx.fillStyle = over;
                cx.fillRect(0, 0, 1, 1);
            }
            cx.fillStyle = css;
            cx.fillRect(0, 0, 1, 1);
            const d = cx.getImageData(0, 0, 1, 1).data;
            return [d[0], d[1], d[2], +(d[3] / 255).toFixed(3)];
        };
        const lum = (r, g, b) => {
            const f = (c) => {
                c /= 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            };
            return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const cr = (a, b) => {
            const l = [lum(a[0], a[1], a[2]), lum(b[0], b[1], b[2])].sort((x, y) => y - x);
            return +((l[0] + 0.05) / (l[1] + 0.05)).toFixed(2);
        };

        const res = {};
        const console_ = document.querySelector(".config-console");
        const scroller = document.querySelector(".pane-scroll-fade");
        res.present = { console: !!console_, scroller: !!scroller };
        if (!console_) {
            res.bodyTextLen = document.body.innerText.length;
            return res;
        }

        // --- headings / grouping ---
        res.docHeadings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
            (e) => `${e.tagName}:${e.textContent.trim().slice(0, 30)}`
        );
        const secHeaders = [...console_.querySelectorAll(".config-section-header")];
        res.sectionTitles = secHeaders.map((e) => e.textContent.trim());
        res.sectionHeaderTag = secHeaders[0] ? secHeaders[0].tagName : null;
        res.sectionTitleTag = secHeaders[0]
            ? secHeaders[0].firstElementChild.tagName
            : null;
        res.sectionMarkup0 = secHeaders[0] ? secHeaders[0].outerHTML : null;
        res.groupSemantics = {
            roleGroup: console_.querySelectorAll('[role="group"]').length,
            fieldset: console_.querySelectorAll("fieldset").length,
            ariaLabelledby: console_.querySelectorAll("[aria-labelledby]").length,
            ariaDescribedby: console_.querySelectorAll("[aria-describedby]").length,
            headingsInConsole: console_.querySelectorAll("h1,h2,h3,h4,h5,h6,[role=heading]")
                .length,
            listSemantics: console_.querySelectorAll("ul,ol,li,[role=list]").length,
        };

        // --- scroll ---
        const cs = getComputedStyle(scroller);
        res.scroll = {
            scrollHeight: scroller.scrollHeight,
            clientHeight: scroller.clientHeight,
            hiddenPct: +((1 - scroller.clientHeight / scroller.scrollHeight) * 100).toFixed(1),
            overscrollBehavior: cs.overscrollBehavior,
            scrollbarGutter: cs.scrollbarGutter,
            scrollbarWidth: cs.scrollbarWidth,
            scrollPaddingTop: cs.scrollPaddingTop,
            maskImage: cs.maskImage,
            tabIndex: scroller.tabIndex,
            role: scroller.getAttribute("role"),
            ariaLabel: scroller.getAttribute("aria-label"),
        };
        const header = document.querySelector(".pane-header");
        const hRect = header.getBoundingClientRect();
        res.stickyHeader = {
            position: getComputedStyle(header).position,
            height: +hRect.height.toFixed(1),
            zIndex: getComputedStyle(header).zIndex,
            veilOpacity: getComputedStyle(header, "::before").opacity,
            veilBackdrop: getComputedStyle(header, "::before").backdropFilter,
            rowScrollMarginTop: getComputedStyle(
                console_.querySelector(".configurator-row")
            ).scrollMarginTop,
        };

        // section context loss over the scroll range
        const scTop = scroller.getBoundingClientRect().top - scroller.scrollTop;
        const secs = secHeaders.map((e) => {
            const r = e.getBoundingClientRect();
            return { t: r.top - scTop, b: r.bottom - scTop, title: e.textContent.trim() };
        });
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        let none = 0;
        const N = 1000;
        for (let i = 0; i <= N; i++) {
            const st = (maxScroll * i) / N;
            const vt = st + hRect.height;
            const vb = st + scroller.clientHeight;
            if (!secs.some((s) => s.b > vt && s.t < vb)) none++;
        }
        res.sectionCtxLossPct = +((none / (N + 1)) * 100).toFixed(1);
        res.maxScroll = +maxScroll.toFixed(1);
        res.sectionOffsets = secs.map((s) => ({
            title: s.title,
            top: +s.t.toFixed(0),
        }));

        // --- true-pixel contrast ---
        const wellCS = getComputedStyle(console_);
        const cardEl = console_.closest("[data-slot='card'], .glass-card") || console_.parentElement;
        const wellPx = px(wellCS.backgroundColor);
        const sTitle = console_.querySelector(".config-section-title");
        const rLabel = console_.querySelector(".configurator-row label");
        const rVal = console_.querySelector(".configurator-row .font-mono");
        const track = console_.querySelector(".slider-track");
        const secBorder = getComputedStyle(secHeaders[0]).borderBottomColor;

        const sTitlePx = px(getComputedStyle(sTitle).color, wellCS.backgroundColor);
        const rLabelPx = px(getComputedStyle(rLabel).color, wellCS.backgroundColor);
        const rValPx = px(getComputedStyle(rVal).color, wellCS.backgroundColor);
        const trackPx = px(getComputedStyle(track).backgroundColor, wellCS.backgroundColor);
        const borderPx = px(secBorder, wellCS.backgroundColor);

        res.ink = {
            wellBG_raw: wellCS.backgroundColor,
            wellBG_px: wellPx,
            sectionTitle: {
                raw: getComputedStyle(sTitle).color,
                px: sTitlePx,
                size: getComputedStyle(sTitle).fontSize,
                weight: getComputedStyle(sTitle).fontWeight,
                family: getComputedStyle(sTitle).fontFamily.slice(0, 24),
                contrastOnWell: cr(sTitlePx, wellPx),
            },
            rowLabel: {
                raw: getComputedStyle(rLabel).color,
                px: rLabelPx,
                size: getComputedStyle(rLabel).fontSize,
                weight: getComputedStyle(rLabel).fontWeight,
                contrastOnWell: cr(rLabelPx, wellPx),
            },
            readout: {
                raw: getComputedStyle(rVal).color,
                px: rValPx,
                size: getComputedStyle(rVal).fontSize,
                contrastOnWell: cr(rValPx, wellPx),
            },
            track: {
                raw: getComputedStyle(track).backgroundColor,
                px: trackPx,
                contrastOnWell: cr(trackPx, wellPx),
            },
            sectionBorder: {
                raw: secBorder,
                px: borderPx,
                contrastOnWell: cr(borderPx, wellPx),
            },
            inkMutedVar: getComputedStyle(document.documentElement)
                .getPropertyValue("--ink-muted")
                .trim(),
            mutedForegroundVar: getComputedStyle(document.documentElement)
                .getPropertyValue("--muted-foreground")
                .trim(),
        };
        // what --muted-foreground would have measured on the PANE HEADER ground vs the well
        return res;
    });

    console.log("=====", route, `${w}x${h}`, scheme, "=====");
    console.log(JSON.stringify(out, null, 1));
    await browser.close();
}

const [route, w, h, scheme] = process.argv.slice(2);
await run(route, +w, +h, scheme);
