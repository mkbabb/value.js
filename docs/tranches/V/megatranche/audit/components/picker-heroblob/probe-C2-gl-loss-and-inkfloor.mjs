// CHALLENGE-C probe C2 — two reproductions, read-only against localhost:9000.
//
// A · THE ORNAMENT-KILL RACE: HeroBlob's mount is gated (ColorPicker.vue:94)
//     on `overture.b4`, whose transitive predicate is the ATMOSPHERE's WebGL
//     arrival (`auroraArrived`, useAtmosphere.ts:321-324 — `&& !contextLost`).
//     A `webglcontextlost` on the ATMOSPHERE canvas BEFORE b2 latches
//     therefore deletes the hero blob for the whole session. Fire the event
//     early (pre-b2) and late (post-b2) and compare.
//
// B · THE INK-FLOOR THEME GAP: `floorStops()` (HeroBlob.vue:97-111) reads
//     `isDark.value` + `inkAmbient.value` from inside a WATCH CALLBACK whose
//     only source is `cssColorOpaqueFrame` (HeroBlob.vue:132) — so a scheme
//     flip cannot re-derive the ramp. Measure the resting plate's composited
//     OKLab L in BOTH schemes and run the exact floorStops decision on the
//     live pick to show the two schemes demand DIFFERENT ramps.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/";
const browser = await chromium.launch();
const out = {};

async function run(lossAtMs) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    if (lossAtMs !== null) {
        await page.addInitScript((t) => {
            setTimeout(() => {
                const c = document.querySelector(".atmosphere-canvas");
                if (!c) {
                    window.__lossFired = "NO-CANVAS";
                    return;
                }
                c.dispatchEvent(new Event("webglcontextlost"));
                window.__lossFired = Math.round(performance.now());
            }, t);
        }, lossAtMs);
    }
    await page.goto(URL, { waitUntil: "load" });
    await page.waitForTimeout(15000);
    const r = await page.evaluate(() => ({
        lossFiredAtMs: window.__lossFired ?? null,
        marks: performance
            .getEntriesByType("mark")
            .filter((m) => m.name.startsWith("overture:"))
            .map((m) => `${m.name}@${Math.round(m.startTime)}`),
        blobCanvasPresent: !!document.querySelector('[data-testid="goo-blob-canvas"]'),
        heroAnchorPresent: !!document.querySelector(".hero-blob-anchor"),
        canvasCount: document.querySelectorAll("canvas").length,
    }));
    await ctx.close();
    return r;
}

out.A_control_noLoss = await run(null);
out.A_lossAt400ms_preB2 = await run(400);
out.A_lossAt2000ms_postB2 = await run(2000);

// ---- B ------------------------------------------------------------------
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(9000);

out.B_inkFloor = await page.evaluate(() => {
    // dual-ground alpha resolve — the same instrument useContrastSafeColor uses
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const g = cv.getContext("2d", { willReadFrequently: true });
    const resolve = (css) => {
        const draw = (ground) => {
            g.fillStyle = ground;
            g.fillRect(0, 0, 1, 1);
            g.fillStyle = "#000";
            g.fillStyle = css;
            g.fillRect(0, 0, 1, 1);
            return g.getImageData(0, 0, 1, 1).data;
        };
        const onBlack = draw("#000");
        const onWhite = draw("#fff");
        const alpha = 1 - (onWhite[0] - onBlack[0]) / 255;
        if (alpha <= 0.001) return null;
        return { r: onBlack[0] / alpha, gg: onBlack[1] / alpha, b: onBlack[2] / alpha, alpha };
    };
    // sRGB -> OKLab L
    const lin = (c) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const oklabL = (r, gg, b) => {
        const R = lin(r), G = lin(gg), B = lin(b);
        const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
        const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
        const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
        return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    };
    const root = document.documentElement;
    const probe = document.createElement("div");
    probe.style.cssText = "position:absolute;width:0;height:0;visibility:hidden";
    document.body.appendChild(probe);

    const measure = () => {
        probe.style.backgroundColor = "var(--glass-bg-resting)";
        const bg = getComputedStyle(probe).backgroundColor;
        const rs = resolve(bg);
        // ambient: the atmosphere's derived lightness mirrored on the root
        const amb = getComputedStyle(root).getPropertyValue("--ambient-l").trim();
        const plateOverAmbient = rs
            ? oklabL(rs.r, rs.gg, rs.b) * rs.alpha + 0.5 * (1 - rs.alpha)
            : null;
        return { bgToken: bg, alpha: rs ? +rs.alpha.toFixed(3) : null, plateL: plateOverAmbient ? +plateOverAmbient.toFixed(4) : null, ambientVar: amb };
    };

    const wasDark = root.classList.contains("dark");
    root.classList.toggle("dark", false);
    const light = measure();
    root.classList.toggle("dark", true);
    const dark = measure();
    root.classList.toggle("dark", wasDark);
    probe.remove();

    // the live pick's OKLab L, read from the wrapper's --blob-color
    const wrapper = document.querySelector(".goo-blob-wrapper");
    const pick = wrapper ? getComputedStyle(wrapper).getPropertyValue("--blob-color").trim() : null;
    let pickL = null;
    if (pick) {
        const p = resolve(pick);
        if (p) pickL = +oklabL(p.r, p.gg, p.b).toFixed(4);
    }

    // the exact HeroBlob floorStops decision (INK_FLOOR = 0.15) using the
    // picked L as the ramp mean proxy
    const INK_FLOOR = 0.15;
    const decide = (meanL, plateL) => {
        const delta = meanL - plateL;
        return { delta: +delta.toFixed(4), pushes: Math.abs(delta) < INK_FLOOR };
    };
    return {
        wasDark,
        light,
        dark,
        pick,
        pickL,
        decisionLight: pickL !== null && light.plateL !== null ? decide(pickL, light.plateL) : null,
        decisionDark: pickL !== null && dark.plateL !== null ? decide(pickL, dark.plateL) : null,
    };
});

await browser.close();
console.log(JSON.stringify(out, null, 2));
