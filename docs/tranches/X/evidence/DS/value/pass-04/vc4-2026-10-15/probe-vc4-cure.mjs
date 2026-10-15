// X-DS value pass 4 (critic VC4) cure probe. Headless real Chrome (§0ei), read-only.
// VC4-01: the spectrum stamp's painted pixel vs the card ground beside it (both schemes).
// VC4-02: the true-empty statement's size/weight on Mix, Browse, My Palettes, and the heads above.
// VC4-04: the About fact keys' font-style.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:9000";
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
    for (const theme of ["light", "dark"]) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
        await ctx.addInitScript((th) => {
            try { localStorage.setItem("vueuse-color-scheme", th); } catch {}
        }, theme);
        const p = await ctx.newPage();
        const go = async (h) => {
            await p.goto(BASE + "/" + h, { waitUntil: "load", timeout: 180000 });
            await p.locator(".glass-dock").first().waitFor({ timeout: 180000 });
            await p.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 180000 });
            await p.waitForTimeout(4000);
        };
        const r = (out[theme] = {});
        await go("#/");
        const box = await p.locator(".spectrum-picker").first().boundingBox();
        r.stampInk = await p.evaluate(() => getComputedStyle(document.querySelector(".spectrum-picker")).boxShadow);
        if (box) {
            const png = (await p.screenshot()).toString("base64");
            // stamp pixel: inside the 8px offset band under the plate; ground: 6px past the band
            const sx = Math.round(box.x + box.width * 0.5), sy = Math.round(box.y + box.height + 4);
            const gx = sx, gy = Math.round(box.y + box.height + 14);
            r.samples = await p.evaluate(async ({ png, pts }) => {
                const img = new Image();
                img.src = "data:image/png;base64," + png;
                await img.decode();
                const c = document.createElement("canvas");
                c.width = img.width; c.height = img.height;
                const g = c.getContext("2d");
                g.drawImage(img, 0, 0);
                const lum = ([R, G, B]) => {
                    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
                    return +(0.2126 * f(R) + 0.7152 * f(G) + 0.0722 * f(B)).toFixed(4);
                };
                const o = {};
                for (const [k, [x, y]] of Object.entries(pts)) {
                    const d = [...g.getImageData(x, y, 1, 1).data].slice(0, 3);
                    o[k] = { rgb: d, Y: lum(d) };
                }
                o.stampDarkerThanGround = o.stamp.Y < o.ground.Y;
                return o;
            }, { png, pts: { stamp: [sx, sy], ground: [gx, gy] } });
            await p.screenshot({ path: `${OUT}stamp-crop-1440-${theme}.png`, clip: { x: box.x - 20, y: box.y + box.height - 60, width: box.width + 60, height: 100 } });
        }
        r.factKeys = await p.evaluate(() =>
            [...document.querySelectorAll("main .plate-ink")].slice(0, 6).map((e) => `${e.textContent.trim()} · ${getComputedStyle(e).fontStyle} · ${getComputedStyle(e).fontFamily.slice(0, 24)}`),
        );
        const empties = async () =>
            p.evaluate(() =>
                [...document.querySelectorAll("main [role=status]:not([data-empty-register]) > p.font-display")].map((e) => {
                    const c = getComputedStyle(e);
                    const sec = e.closest("section");
                    const head = sec?.querySelector("h3, h2");
                    const hc = head && getComputedStyle(head);
                    return { t: e.textContent.trim(), fs: c.fontSize, fw: c.fontWeight, ff: c.fontFamily.slice(0, 12), head: head ? `${head.textContent.trim()} ${hc.fontSize}/${hc.fontWeight}` : null };
                }),
            );
        for (const route of ["#/mix", "#/browse", "#/palettes"]) {
            await go(route);
            r[route] = await empties();
        }
        await ctx.close();
    }
} finally {
    await b.close();
}
fs.writeFileSync(`${OUT}probe-vc4-cure.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
