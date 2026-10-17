// SERVED MODEL: claude-opus-5-5
// X.W12U.o5c — THE DOCK-REVEAL IDENTITY + CLS PROBE (COHESION §0fv.2: "no visible pop and no layout shift;
// CLS = 0 on the cell, and the overture reveal is unchanged frame for frame").
// Per rAF frame from the init script on, it records the dock band's state: the band rect (nav.dock-band),
// the veil/land class (V = overture-dock-veiled, L = overture-dock-land, P = plain), whether the producer dock
// is in the DOM (D) and the band's computed visibility, plus the main pane's top. layout-shift entries are
// summed (hadRecentInput excluded) with their sources. Per cell it prints:
//   seq      the run-length class timeline (state:frames), the visual timeline the overture shows
//   rects    the distinct band layout rects (offsetLeft/Top/Width/Height) across every frame (identity = one)
//   mainTop  the distinct main-pane layout tops (offsetTop)
//   pop      frames where the dock is in the DOM and the band is NOT hidden before the land class (must be 0)
//   land     the land animation (name, duration, delay) as computed
//   dockAnims the producer dock's finite running animations/transitions at first sighting (id, t, duration)
//   runningAtReveal those still running at the first un-veiled frame (diagnostic: a running morph there would show)
//   cls      the layout-shift sum (must be 0) and sources
// Usage: node reveal-probe.mjs <origin> <label>
// Cells: 1280x720 light (the O-5 cell) + dark, 390x844 light, 844x390 light. Real Chrome headless, ANGLE-Metal.
import { chromium } from "@playwright/test";

const [origin, label] = process.argv.slice(2);
const CELLS = [
    { w: 1280, h: 720, scheme: "light" },
    { w: 1280, h: 720, scheme: "dark" },
    { w: 390, h: 844, scheme: "light" },
    { w: 844, h: 390, scheme: "light" },
];
const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"],
});
let red = 0;
try {
    for (const c of CELLS) {
        const ctx = await browser.newContext({ viewport: { width: c.w, height: c.h }, colorScheme: c.scheme });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => {
                const w = window;
                w.__rv = [];
                w.__atReveal = null;
                w.__dockAnims = [];
                w.__ls = [];
                try {
                    new PerformanceObserver((l) => {
                        for (const e of l.getEntries()) {
                            if (e.hadRecentInput) continue;
                            w.__ls.push([Math.round(e.startTime), +e.value.toFixed(5), (e.sources || []).map((s) => { const n = s.node; if (!n) return "?"; const cn = (n.className && (n.className.baseVal ?? n.className)) || ""; const up = n.parentElement?.closest?.("[class]"); return `${n.nodeName}.${String(cn).split(" ")[0]}<${up ? String(up.className.baseVal ?? up.className).split(" ")[0] : ""} ${JSON.stringify([s.previousRect.y, s.currentRect.y, s.previousRect.height, s.currentRect.height].map(Math.round))}`; }).slice(0, 3)]);
                        }
                    }).observe({ type: "layout-shift", buffered: true });
                } catch {}
                const tick = (now) => {
                    const nav = document.querySelector("nav.dock-band");
                    if (nav) {
                        // LAYOUT geometry (offset*), not the painted box: the land keyframes translate/rotate the band.
                        const r = { x: nav.offsetLeft, y: nav.offsetTop, width: nav.offsetWidth, height: nav.offsetHeight };
                        const cl = nav.classList;
                        const st = cl.contains("overture-dock-veiled") ? "V" : cl.contains("overture-dock-land") ? "L" : "P";
                        const dock = !!nav.querySelector(".glass-dock");
                        const hidden = getComputedStyle(nav).visibility === "hidden";
                        const main = document.querySelector("main.pane-main");
                        w.__rv.push([Math.round(now), st, dock, hidden, `${r.x},${r.y},${r.width},${r.height}`, main ? main.offsetTop : null]);
                        // The producer dock's finite document-timeline animations/transitions: logged at their first
                        // sighting (the mount morph), and those still RUNNING at the first un-veiled frame (a morph
                        // still running when the band lands would be visible = a pop).
                        const g = nav.querySelector(".glass-dock");
                        if (g) {
                            const fin = g.getAnimations({ subtree: true }).filter((a) => a.timeline instanceof DocumentTimeline && a.effect?.getTiming().iterations !== Infinity && a.playState === "running");
                            for (const a of fin) {
                                const id = (a.transitionProperty || a.animationName || "?") + "@" + (a.effect?.target?.className?.baseVal ?? a.effect?.target?.className ?? "").toString().split(" ")[0];
                                if (!w.__dockAnims.some((x) => x[0] === id)) w.__dockAnims.push([id, Math.round(now), Math.round(a.effect.getComputedTiming().duration)]);
                            }
                            if (st !== "V" && w.__atReveal === null) w.__atReveal = fin.map((a) => (a.transitionProperty || a.animationName) + ":" + Math.round(a.currentTime ?? -1) + "/" + Math.round(a.effect.getComputedTiming().duration));
                        }
                    }
                    if (w.__rv.length < 600) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            await page.goto(origin + "/");
            await page.locator("main.pane-main").waitFor({ state: "visible", timeout: 20000 });
            const renderer = await page.evaluate(() => {
                const cv = document.createElement("canvas");
                const gl = cv.getContext("webgl2");
                const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
                return ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "no-webgl";
            });
            if (!/ANGLE.*Metal/i.test(renderer)) {
                console.log(`[reveal ${label} ${c.w}x${c.h} ${c.scheme}] INSTRUMENT FAULT renderer=${renderer}`);
                red++;
                continue;
            }
            // Settle: the land class has been and gone (P), or 4 s.
            await page.waitForFunction(() => document.querySelector("nav.dock-band.overture-dock-veiled, nav.dock-band.overture-dock-land") === null, null, { timeout: 4000 }).catch(() => {});
            await page.waitForTimeout(300);
            const land = await page.evaluate(() => {
                const el = document.createElement("nav");
                el.className = "dock-band overture-dock-land";
                el.style.position = "absolute";
                document.body.appendChild(el);
                const cs = getComputedStyle(el);
                const out = `${cs.animationName} ${cs.animationDuration} ${cs.animationDelay} ${cs.animationTimingFunction.slice(0, 40)}`;
                el.remove();
                return out;
            });
            const r = await page.evaluate(() => ({ rv: window.__rv.slice(), ls: window.__ls.slice(), atReveal: window.__atReveal, dockAnims: window.__dockAnims }));
            const seq = [];
            for (const [, st, dock, hidden] of r.rv) {
                const k = `${st}${hidden ? "h" : "v"}`;
                if (seq.length && seq[seq.length - 1][0] === k) seq[seq.length - 1][1]++;
                else seq.push([k, 1]);
            }
            const rects = [...new Set(r.rv.map((x) => x[4]))];
            const tops = [...new Set(r.rv.map((x) => x[5]))];
            const firstL = r.rv.findIndex((x) => x[1] !== "V");
            const pop = r.rv.filter((x, i) => (firstL < 0 || i < firstL) && x[2] && !x[3]).length;
            const dockAt = r.rv.find((x) => x[2])?.[0];
            const cls = r.ls.reduce((a, x) => a + x[1], 0);
            const ok = rects.length === 1 && tops.length === 1 && pop === 0 && cls === 0 && seq.length >= 2;
            if (!ok) red++;
            console.log(`[reveal ${label} ${c.w}x${c.h} ${c.scheme}] seq=${seq.map(([k, n]) => `${k}:${n}`).join(",")} rects=${JSON.stringify(rects)} mainTop=${JSON.stringify(tops)} pop=${pop} dockInDomAt=${dockAt} firstNonVeiledAt=${r.rv[firstL]?.[0]} land="${land}" dockAnims=${JSON.stringify(r.dockAnims)} runningAtReveal=${JSON.stringify(r.atReveal)} cls=${cls} shifts=${JSON.stringify(r.ls.map((x) => [x[0], x[1], x[2].map((n) => n.slice(0, 90))]))} ${ok ? "GREEN" : "RED"}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
console.log(`VERDICT ${red ? "RED" : "GREEN"} ${CELLS.length - red}/${CELLS.length}`);
process.exit(red ? 1 : 0);
