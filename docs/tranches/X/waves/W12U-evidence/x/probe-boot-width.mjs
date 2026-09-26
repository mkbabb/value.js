// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-2 falsifier: a phone's layout viewport must stay at the
// device width through boot. Fresh isMobile context per route; samples
// documentElement.scrollWidth every 250 ms for 6 s and names any unclipped,
// non-fixed element past the right edge at each sample where the width grew.
// GREEN iff every sample reads scrollWidth == device width.
// An empty culprit list with a RED width is a PSEUDO-element carrier (not
// enumerable by querySelectorAll): at steady state it is the pane wrapper's
// oversampled backdrop `::before` (demo/styles/shell.css:372-383, `inset:
// calc(-2 * var(--glass-blur-resting-radius, 8px))` = -16 px), found by the
// display:none bisect recorded under A2-VA-X-2.
// Usage: node probe-boot-width.mjs <width> <height> <route,route,...>
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";

const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const ROUTES = (process.argv[4] ?? "/,/palettes,/admin/users").split(",");
const b = await chromium.launch({ headless: false });
let red = 0;
for (const r of ROUTES) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true });
    await prepare(ctx, { admin: r.startsWith("/admin"), palettes: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#" + r);
    const seen = new Set(); let max = 0;
    for (let i = 0; i < 24; i++) {
        const s = await p.evaluate((vw) => {
            const clip = (e) => { for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflowX !== "visible" || cs.contain.includes("paint")) return true; } return false; };
            const o = [];
            for (const e of document.querySelectorAll("body *")) {
                if (e instanceof SVGElement && e.tagName !== "svg") continue;
                const rc = e.getBoundingClientRect();
                if (rc.width > 0 && rc.right > vw + 0.5 && getComputedStyle(e).position !== "fixed" && !clip(e))
                    o.push(`${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ").slice(0, 2).join(".")}:${Math.round(rc.right)}`);
            }
            return { sw: document.documentElement.scrollWidth, o: o.slice(0, 3) };
        }, W);
        max = Math.max(max, s.sw);
        s.o.forEach((x) => seen.add(x.replace(/:\d+$/, "")));
        await p.waitForTimeout(250);
    }
    if (max > W) red++;
    console.log(`${W}x${H} ${r} maxSW=${max} ${max > W ? "RED" : "GREEN"} culprits=${[...seen].join(" | ")}`);
    await ctx.close();
}
await b.close();
console.log(red ? `RED ${red}/${ROUTES.length}` : `GREEN ${ROUTES.length}/${ROUTES.length}`);
