// CHALLENGE-C probe 01 — PaneHeader structural + geometric truth, cross-engine.
// Run: node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-01-structure.mjs
import { webkit, chromium } from "playwright";

const ROUTES = ["#/", "#/gradient", "#/mix", "#/admin/users"];

const readAll = () => ({
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
        tag: h.tagName,
        text: (h.textContent || "").trim().slice(0, 40),
        paneHeader: h.classList.contains("pane-header-title"),
        visible: h.offsetParent !== null,
    })),
    h1Count: document.querySelectorAll("h1").length,
    tokens: (() => {
        const cs = getComputedStyle(document.documentElement);
        return {
            typeHeading: cs.getPropertyValue("--type-heading").trim(),
            typeDisplay1: cs.getPropertyValue("--type-display-1").trim(),
        };
    })(),
    headers: [...document.querySelectorAll("main .pane-header")]
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
            const cs = getComputedStyle(el);
            const t = el.querySelector(".pane-header-title");
            const ts = t ? getComputedStyle(t) : null;
            return {
                ratio: cs.getPropertyValue("--pane-title-shrink-ratio").trim(),
                titleFontSize: ts?.fontSize,
                titleTransform: ts?.transform,
                titleRectH: t ? +t.getBoundingClientRect().height.toFixed(2) : null,
                headerH: +el.getBoundingClientRect().height.toFixed(2),
                veilOpacity: getComputedStyle(el, "::before").opacity,
                pointerEvents: cs.pointerEvents,
                position: cs.position,
                zIndex: cs.zIndex,
                descOpacity: (() => {
                    const p = el.querySelector(".pane-header-desc");
                    return p ? getComputedStyle(p).opacity : null;
                })(),
                descRectH: (() => {
                    const p = el.querySelector(".pane-header-desc-wrap");
                    return p ? +p.getBoundingClientRect().height.toFixed(2) : null;
                })(),
            };
        }),
});

const scrub = (y) =>
    new Promise((res) => {
        const host = [...document.querySelectorAll("main .pane-scroll-fade")].find(
            (el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight,
        );
        if (!host) return res("NO-SCROLLABLE-HOST");
        host.scrollTop = y;
        requestAnimationFrame(() => requestAnimationFrame(() => res(host.scrollTop)));
    });

// After scrolling, is the sticky header's DEAD ZONE (below the shrunken title)
// intercepting pointer events that belong to the content scrolled under it?
const hitTest = () => {
    const host = [...document.querySelectorAll("main .pane-scroll-fade")].find(
        (el) => el.offsetParent !== null && el.scrollHeight > el.clientHeight,
    );
    if (!host) return "NO-HOST";
    const hdr = host.querySelector(".pane-header");
    const title = hdr.querySelector(".pane-header-title");
    const hr = hdr.getBoundingClientRect();
    const tr = title.getBoundingClientRect();
    // a point inside the header box but BELOW the visually shrunken title
    const y = Math.min(hr.bottom - 2, tr.bottom + (hr.bottom - tr.bottom) / 2);
    const x = hr.left + hr.width / 2;
    const el = document.elementFromPoint(x, y);
    return {
        probePoint: [+x.toFixed(1), +y.toFixed(1)],
        headerRect: { top: +hr.top.toFixed(1), bottom: +hr.bottom.toFixed(1) },
        titleRect: { top: +tr.top.toFixed(1), bottom: +tr.bottom.toFixed(1) },
        deadZonePx: +(hr.bottom - tr.bottom).toFixed(1),
        hit: el ? `${el.tagName}.${String(el.className).slice(0, 60)}` : "null",
        hitIsHeaderChain: el ? !!el.closest(".pane-header") : null,
    };
};

for (const [name, eng] of [["webkit", webkit], ["chromium", chromium]]) {
    const b = await eng.launch();
    for (const rm of ["no-preference", "reduce"]) {
        const ctx = await b.newContext({
            viewport: { width: 1440, height: 900 },
            reducedMotion: rm,
        });
        const p = await ctx.newPage();
        for (const route of ROUTES) {
            await p.goto(`http://localhost:9000/${route}`, {
                waitUntil: "networkidle",
                timeout: 45000,
            });
            await p.waitForTimeout(2500);
            const rest = await p.evaluate(readAll);
            await p.evaluate(scrub, 0);
            const s = await p.evaluate(scrub, 300);
            await p.waitForTimeout(400);
            const stuck = await p.evaluate(readAll);
            const hit = await p.evaluate(hitTest);
            console.log(
                JSON.stringify(
                    { engine: name, rm, route, scrolledTo: s, rest, stuck, hit },
                    null,
                    1,
                ),
            );
            console.log("-----");
        }
        await ctx.close();
    }
    await b.close();
}
