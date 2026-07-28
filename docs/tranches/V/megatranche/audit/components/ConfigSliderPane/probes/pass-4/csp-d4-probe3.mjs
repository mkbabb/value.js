// CHALLENGE-D pass 4 — probe 3: the SCROLLED state, focus occlusion, scroll chaining,
// scrollbar reserve, and the WebKit scroll-timeline arm. Engine selectable.
import { chromium, webkit } from "playwright";

const ENGINE = { chromium, webkit };

async function run(engineName, route, w, h, scheme, tag) {
    const browser = await ENGINE[engineName].launch();
    const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 2,
        colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:9000/${route}`, { waitUntil: "load" });
    await page.waitForTimeout(7000);

    const base = await page.evaluate(() => {
        const r = {};
        r.supports = {
            scrollTimeline: CSS.supports("animation-timeline", "scroll()"),
            namedScrollTimeline: CSS.supports("scroll-timeline", "--x block"),
            animationRange: CSS.supports("animation-range", "0px 64px"),
            atan2: CSS.supports("width", "calc(tan(atan2(1px,2px)) * 1px)"),
        };
        const sc = document.querySelector(".pane-scroll-fade");
        const con = document.querySelector(".config-console");
        if (!sc || !con) return { ...r, missing: true };
        r.scrollbarReserve = sc.offsetWidth - sc.clientWidth;
        r.scrollerRect = sc.getBoundingClientRect().toJSON();
        r.geom = {
            scrollHeight: sc.scrollHeight,
            clientHeight: sc.clientHeight,
            overscrollBehavior: getComputedStyle(sc).overscrollBehavior,
            scrollPaddingTop: getComputedStyle(sc).scrollPaddingTop,
        };
        const h = document.querySelector(".pane-header");
        r.headerRect = h.getBoundingClientRect().toJSON();
        r.headerVeilOpacityAtRest = getComputedStyle(h, "::before").opacity;
        return r;
    });

    // --- scrolled state: scroll the console half way and read the header veil ---
    const scrolled = await page.evaluate(async () => {
        const sc = document.querySelector(".pane-scroll-fade");
        if (!sc) return null;
        sc.scrollTop = 600;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const h = document.querySelector(".pane-header");
        const title = document.querySelector(".pane-header-title");
        return {
            scrollTop: sc.scrollTop,
            veilOpacity: getComputedStyle(h, "::before").opacity,
            titleTransform: getComputedStyle(title).transform,
            descOpacity: (() => {
                const p = document.querySelector(".pane-header-desc");
                return p ? getComputedStyle(p).opacity : null;
            })(),
            headerRect: h.getBoundingClientRect().toJSON(),
            // what is under the header right now?
            elementsUnderHeaderMid: (() => {
                const r = h.getBoundingClientRect();
                const els = document.elementsFromPoint(r.left + r.width / 2, r.bottom - 8);
                return els.slice(0, 5).map((e) => e.className?.toString?.().slice(0, 50) || e.tagName);
            })(),
        };
    });
    await page.screenshot({
        path: `csp-d4-${tag}-scrolled600.png`,
        clip: base.scrollerRect
            ? {
                  x: Math.max(0, base.scrollerRect.x - 8),
                  y: Math.max(0, base.scrollerRect.y - 8),
                  width: Math.min(w, base.scrollerRect.width + 16),
                  height: Math.min(h, base.scrollerRect.height + 16),
              }
            : { x: 0, y: 0, width: w, height: h },
    });

    // --- focus occlusion: tab-focus a mid-list slider, see where it lands ---
    const focusProbe = await page.evaluate(async () => {
        const sc = document.querySelector(".pane-scroll-fade");
        const con = document.querySelector(".config-console");
        if (!sc || !con) return null;
        sc.scrollTop = 0;
        const thumbs = [...con.querySelectorAll('[role="slider"]')];
        const out = [];
        const h = document.querySelector(".pane-header");
        for (const idx of [0, 4, 8, 12, 20, thumbs.length - 1]) {
            const t = thumbs[idx];
            if (!t) continue;
            t.focus();
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const tr = t.getBoundingClientRect();
            const hr = h.getBoundingClientRect();
            const scr = sc.getBoundingClientRect();
            const row = t.closest(".configurator-row");
            const lab = row?.querySelector("label");
            const lr = lab?.getBoundingClientRect();
            out.push({
                idx,
                label: lab?.textContent.trim(),
                thumbTop: +tr.top.toFixed(1),
                thumbBottom: +tr.bottom.toFixed(1),
                headerBottom: +hr.bottom.toFixed(1),
                scrollerTop: +scr.top.toFixed(1),
                scrollerBottom: +scr.bottom.toFixed(1),
                thumbFullyUnderHeader: tr.bottom <= hr.bottom,
                thumbPartlyUnderHeader: tr.top < hr.bottom,
                labelFullyUnderHeader: lr ? lr.bottom <= hr.bottom : null,
                labelTop: lr ? +lr.top.toFixed(1) : null,
                scrollTop: sc.scrollTop,
            });
        }
        return out;
    });

    // --- scroll chaining: at the end of the console, does the document move? ---
    const chain = await page.evaluate(async () => {
        const sc = document.querySelector(".pane-scroll-fade");
        if (!sc) return null;
        sc.scrollTop = sc.scrollHeight;
        const before = {
            doc: document.scrollingElement.scrollTop,
            behavior: getComputedStyle(sc).overscrollBehavior,
        };
        return before;
    });

    console.log(`===== ${engineName} ${route} ${w}x${h} ${scheme} =====`);
    console.log(JSON.stringify({ base, scrolled, focusProbe, chain }, null, 1));
    await browser.close();
}

const [engineName, route, w, h, scheme, tag] = process.argv.slice(2);
await run(engineName, route, +w, +h, scheme, tag);
