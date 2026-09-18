// pass 5 · probe 5 — RENDERED (composited) pixel truth: sample the real
// screen colours of the pane plate, the dashed well, the card and the ambient,
// then convert to OKLCH. PROPORTION-AUDIT §5.8: rendered relation wins.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const ROUTE = "http://localhost:9000/#/palettes";
const mkColors = (n, t) => Array.from({ length: n }, (_, i) => ({ css: `oklch(0.72 0.16 ${(i * 360) / n})`, name: `${t}-${i}`, position: i }));
const now = new Date().toISOString();
const p = (id, name, colors) => ({ id, name, slug: id, colors, createdAt: now, updatedAt: now, isLocal: true });
const STORE = { version: 1, palettes: [p("a", "Sunset Ridge", mkColors(5, "a")), p("b", "Moss & Bone", mkColors(4, "b")), p("c", "Fifty", mkColors(50, "c"))] };
const paneJs = `(() => { const h=[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>/My\\s*Palettes/.test(e.textContent||'')); return h ? h.closest("[class*='pane-scroll-fade']") : null; })()`;

const b = await chromium.launch();
const out = {};

for (const scheme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), STORE);
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // pick sample points from live geometry
    const pts = await page.evaluate((src) => {
        const pane = eval(src);
        const r = (el) => el.getBoundingClientRect();
        const pr = r(pane);
        const well = pane.querySelector(".dashed-well");
        const wr = r(well);
        const card = pane.querySelector('[role="article"]');
        const cr = r(card);
        const search = pane.querySelector("[class*='search-seated']");
        const sr = r(search);
        const strip = card.querySelector('[role="presentation"]');
        const st = r(strip);
        return {
            ambient: { x: Math.round(pr.x / 2), y: Math.round(pr.y + 300) },
            paneBare: { x: Math.round(pr.right - 14), y: Math.round(pr.y + 300) },
            well: { x: Math.round(wr.right - 30), y: Math.round(wr.bottom - 14) },
            search: { x: Math.round(sr.right - 20), y: Math.round(sr.y + sr.height / 2) },
            cardBody: { x: Math.round(cr.right - 90), y: Math.round(cr.bottom - 12) },
            stripSeg0: { x: Math.round(st.x + 20), y: Math.round(st.y + st.height / 2) },
        };
    }, paneJs);

    const shotPath = path.join(OUT, `chromium-${scheme}-composite.png`);
    await page.screenshot({ path: shotPath });
    await ctx.close();

    // decode the PNG in a throwaway page and read the exact pixels
    const ctx2 = await b.newContext();
    const page2 = await ctx2.newPage();
    const dataUrl = "data:image/png;base64," + fs.readFileSync(shotPath).toString("base64");
    const samples = await page2.evaluate(
        async ([url, points]) => {
            const img = new Image();
            img.src = url;
            await img.decode();
            const cv = document.createElement("canvas");
            cv.width = img.width; cv.height = img.height;
            const g = cv.getContext("2d", { willReadFrequently: true });
            g.drawImage(img, 0, 0);
            // sRGB -> OKLCH
            const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
            function oklch([R, G, B]) {
                const r = lin(R), gg = lin(G), bb = lin(B);
                const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * gg + 0.0514459929 * bb);
                const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * gg + 0.1073969566 * bb);
                const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * gg + 0.6299787005 * bb);
                const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
                const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
                const Bo = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
                const C = Math.hypot(A, Bo);
                let H = (Math.atan2(Bo, A) * 180) / Math.PI;
                if (H < 0) H += 360;
                return { L: Math.round(L * 1e4) / 1e4, C: Math.round(C * 1e4) / 1e4, H: Math.round(H * 10) / 10 };
            }
            const res = {};
            for (const [k, pt] of Object.entries(points)) {
                const d = g.getImageData(pt.x, pt.y, 1, 1).data;
                const rgb = [d[0], d[1], d[2]];
                res[k] = { at: pt, rgb, oklch: oklch(rgb) };
            }
            return res;
        },
        [dataUrl, pts],
    );
    await ctx2.close();
    out[scheme] = samples;
}
await b.close();
fs.writeFileSync(path.join(OUT, "TELEMETRY-composite.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
