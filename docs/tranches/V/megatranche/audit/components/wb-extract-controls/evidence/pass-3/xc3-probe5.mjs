// CHALLENGE-C pass-3 probe 5 — the TRUE maximum contrast of the inset hairline
// ring anywhere along its run: paint the live gradient into a canvas and sample
// every column, rather than only the four declared stops.
import { webkit } from "playwright";
const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
for (const scheme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForSelector('[data-o18="extract-k-rail"]', { timeout: 20000 });
    await page.waitForTimeout(3000);
    await page.evaluate(async () => {
        const c = document.createElement("canvas"); c.width = c.height = 64;
        const x = c.getContext("2d");
        ["rgb(220,40,40)", "rgb(40,190,60)", "rgb(40,70,210)", "rgb(186,178,168)"]
            .forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * 16, 64, 16); });
        const blob = await new Promise((r) => c.toBlob(r, "image/png"));
        const dt = new DataTransfer();
        dt.items.add(new File([blob], "bands.png", { type: "image/png" }));
        const input = document.querySelector('input[type="file"]');
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await page.waitForTimeout(3500);

    out(`RING vs its own gradient — every column (${scheme})`, await page.evaluate(() => {
        const el = document.querySelector('[data-o18="extract-k-rail"]');
        const cs = getComputedStyle(el);
        const W = Math.round(el.getBoundingClientRect().width);
        const ring = (cs.boxShadow.match(/rgba?\([^)]*\)|oklch\([^)]*\)|#[0-9a-f]{3,8}/i) || [])[0];

        // paint the LIVE background-image into a canvas of the rail's width
        const cv = document.createElement("canvas");
        cv.width = W; cv.height = 8;
        const g = cv.getContext("2d");
        const host = document.createElement("div");
        host.style.cssText = `position:fixed;left:-9999px;top:0;width:${W}px;height:8px;background-image:${cs.backgroundImage}`;
        document.body.appendChild(host);
        // sample the real element instead: read the gradient by re-declaring it on a
        // 1px-tall probe and using a second canvas is unreliable, so parse+interp in oklch
        // via the browser's own colour engine, one column at a time.
        const px1 = document.createElement("canvas"); px1.width = px1.height = 1;
        const p = px1.getContext("2d");
        const sample = (css) => { p.fillStyle = "#000"; p.fillRect(0, 0, 1, 1); p.fillStyle = css; p.fillRect(0, 0, 1, 1); return [...p.getImageData(0, 0, 1, 1).data].slice(0, 3); };
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
        const cr = (a, b) => { const l1 = Math.max(L(a), L(b)), l2 = Math.min(L(a), L(b)); return (l1 + 0.05) / (l2 + 0.05); };

        // use the engine: paint the gradient onto the offscreen host and read it back
        // via html-to-canvas is unavailable, so reconstruct with CanvasGradient in oklch
        // is unavailable too -> interpolate in sRGB between adjacent stops, which is the
        // CONSERVATIVE (higher-contrast-spread) reading of an oklch ramp.
        const stops = [...cs.backgroundImage.matchAll(/(rgba?\([^)]*\)|oklch\([^)]*\)|lab\([^)]*\))\s*([\d.]+)%/g)]
            .map((m) => ({ rgb: sample(m[1]), pos: parseFloat(m[2]) / 100, css: m[1] }));
        host.remove();
        if (!stops.length || !ring) return { error: "no stops/ring", ring, img: cs.backgroundImage.slice(0, 120) };
        const ringPx = sample(ring);
        let worst = Infinity, best = -Infinity, bestAt = 0, worstAt = 0;
        const N = 400;
        for (let i = 0; i <= N; i++) {
            const t = i / N;
            let a = stops[0], b2 = stops[stops.length - 1];
            for (let s = 0; s < stops.length - 1; s++) {
                if (t >= stops[s].pos && t <= stops[s + 1].pos) { a = stops[s]; b2 = stops[s + 1]; break; }
            }
            const span = (b2.pos - a.pos) || 1;
            const f = Math.min(1, Math.max(0, (t - a.pos) / span));
            const c = [0, 1, 2].map((j) => a.rgb[j] + (b2.rgb[j] - a.rgb[j]) * f);
            const r = cr(ringPx, c);
            if (r < worst) { worst = r; worstAt = t; }
            if (r > best) { best = r; bestAt = t; }
        }
        return {
            ringColor: ring,
            railBackgroundColorUnderneath: cs.backgroundColor,
            RING_EQUALS_FILL_PREIMAGE: ring === cs.backgroundColor,
            stopCount: stops.length,
            MAX_contrast_anywhere_along_the_ring: +best.toFixed(3),
            at_fraction: +bestAt.toFixed(3),
            MIN_contrast: +worst.toFixed(3),
            at_fraction_min: +worstAt.toFixed(3),
            GRAPHICS_FLOOR: 3,
            PASSES_ANYWHERE: best >= 3,
            samples: N + 1,
        };
    }));
    await ctx.close();
}
await b.close();
