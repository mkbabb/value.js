// SERVED MODEL: claude-opus-5-5
// X.W12U.x — which element widens the phone layout viewport past the device width?
// Headed Chromium, :9000, isMobile+hasTouch (a real phone widens its layout
// viewport to the widest box; desktop emulation hides it behind overflow-x).
// Usage: node probe-hscroll.mjs <width> <height> <route,route,...>
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";

const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const ROUTES = (process.argv[4] ?? "/,/admin/users").split(",");
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true });
await prepare(ctx, { admin: true, palettes: true });
const p = await ctx.newPage();
for (const r of ROUTES) {
    await p.goto("http://localhost:9000/#" + r);
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 20000 }).catch(() => {});
    await p.waitForTimeout(1500);
    const out = await p.evaluate((vw) => {
        // an element widens the layout viewport only if no ancestor clips it (overflow-x != visible or contain: paint)
        const clip = (e) => { for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflowX !== "visible" || cs.contain.includes("paint")) return a; } return null; };
        const o = [];
        for (const e of document.querySelectorAll("body *")) {
            if (e instanceof SVGElement && e.tagName !== "svg") continue;
            const r = e.getBoundingClientRect();
            if (!(r.width > 0 && r.right > vw + 0.5) || getComputedStyle(e).position === "fixed" || clip(e)) continue;
            o.push(`${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ").slice(0, 3).join(".")}:${Math.round(r.left)}-${Math.round(r.right)}`);
        }
        return { sw: document.documentElement.scrollWidth, iw: innerWidth, vv: visualViewport.width, o: o.slice(0, 6) };
    }, W);
    console.log(r, JSON.stringify(out));
}
await b.close();
