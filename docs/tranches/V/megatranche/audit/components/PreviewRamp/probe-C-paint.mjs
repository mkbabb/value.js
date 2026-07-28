// challenge-C · PreviewRamp — THE PAINT-TRUTH PROBE.
//
// The module's SAMPLING LAW (sample.ts:5-16) forbids CSS gradient
// interpolation: "ramps are k-sample discrete stops built from THE LIBRARY's
// mixColors interpolation — NEVER CSS `in <space>` gradient interpolation,
// because the preview must show what THE APP computes, not what the browser's
// engine would". PreviewRamp.vue:24-26 paints
// `linear-gradient(90deg, s0, s1, …, s16)` — POSITIONLESS stops, so the engine
// interpolates every pixel between them. This probe measures (a) which space
// the engine uses, and (b) how far the painted chip is from the library truth.
//
// Pixels are read for real: Playwright screenshot -> data: URL -> <img> ->
// canvas.drawImage -> getImageData (a same-origin data URL does not taint).
import { chromium } from "playwright";

const D = "docs/tranches/V/megatranche/audit/components/PreviewRamp";
const SRC = "/@fs/Users/mkbabb/Programming/value.js/demo/color-session/color-chips/sample.ts";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1500);

// ── 1. the real sampler, from the app's own module graph
out.sampler = await page.evaluate(async (src) => {
    const m = await import(/* @vite-ignore */ src);
    const OPERANDS = ["oklch(0.62 0.27 9.8)", "rebeccapurple"];
    const stops = m.sampleInterpolationRamp(OPERANDS, "oklch", "longer");
    return {
        k: m.RAMP_SAMPLE_COUNT,
        n: stops.length,
        first: stops[0],
        last: stops[stops.length - 1],
        all: stops,
        stamp: m.stampStops(stops).slice(0, 120),
        // domain-boundary arms
        identicalOperands: m.sampleInterpolationRamp(
            ["oklch(0.5 0.1 90)", "oklch(0.5 0.1 90)"],
            "oklch",
            "longer",
        ),
        withNone: (() => {
            try {
                return m.sampleInterpolationRamp(
                    ["oklch(0.5 0.1 none)", "rebeccapurple"],
                    "oklch",
                    "shorter",
                );
            } catch (e) {
                return "THREW: " + String(e).slice(0, 120);
            }
        })(),
        transparent: (() => {
            try {
                return m.sampleInterpolationRamp(
                    ["transparent", "rebeccapurple"],
                    "oklch",
                    "shorter",
                );
            } catch (e) {
                return "THREW: " + String(e).slice(0, 120);
            }
        })(),
        kelvinSpace: (() => {
            try {
                const s = m.sampleInterpolationRamp(OPERANDS, "kelvin", "shorter");
                return s ? { n: s.length, first: s[0] } : null;
            } catch (e) {
                return "THREW: " + String(e).slice(0, 160);
            }
        })(),
        currentColorOperand: (() => {
            try {
                return m.sampleInterpolationRamp(
                    ["currentColor", "rebeccapurple"],
                    "oklch",
                    "shorter",
                );
            } catch (e) {
                return "THREW: " + String(e).slice(0, 160);
            }
        })(),
    };
}, SRC);

// ── 2. build the EXACT chip paint + three references, at chip scale and 10x
const stops = out.sampler.all;
await page.evaluate(
    ({ stops }) => {
        const host = document.createElement("div");
        host.id = "__probe";
        host.style.cssText =
            "position:fixed;left:0;top:0;z-index:2147483647;background:#808080;padding:0;margin:0";
        const mk = (id, css, w) => {
            const d = document.createElement("div");
            d.id = id;
            d.style.cssText = `display:block;width:${w}px;height:12px;background-image:${css};margin:0`;
            host.appendChild(d);
        };
        const joined = stops.join(", ");
        // A — EXACTLY what PreviewRamp paints (positionless stops)
        mk("A", `linear-gradient(90deg, ${joined})`, 420);
        // B — the same stops as HARD stops (no engine interpolation at all):
        //     the library-true reference the docblock claims ("discrete-stop")
        const n = stops.length;
        const hard = stops
            .map((s, i) => `${s} ${((i / n) * 100).toFixed(4)}% ${(((i + 1) / n) * 100).toFixed(4)}%`)
            .join(", ");
        mk("B", `linear-gradient(90deg, ${hard})`, 420);
        // C — the engine doing the WHOLE job in oklch from the two endpoints
        mk(
            "C",
            `linear-gradient(in oklch longer hue 90deg, ${stops[0]}, ${stops[stops.length - 1]})`,
            420,
        );
        // D — the engine doing the whole job in srgb from the two endpoints
        mk("D", `linear-gradient(in srgb 90deg, ${stops[0]}, ${stops[stops.length - 1]})`, 420);
        // E/F/G — the interpolation-space control: two stops 180deg apart
        mk("E", "linear-gradient(90deg, oklch(0.62 0.27 20), oklch(0.62 0.27 200))", 420);
        mk("F", "linear-gradient(in oklch shorter hue 90deg, oklch(0.62 0.27 20), oklch(0.62 0.27 200))", 420);
        mk("G", "linear-gradient(in srgb 90deg, oklch(0.62 0.27 20), oklch(0.62 0.27 200))", 420);
        document.body.appendChild(host);
    },
    { stops },
);
await page.waitForTimeout(300);

const shot = await page.locator("#__probe").screenshot({ path: `${D}/paint-probe.png` });
const b64 = shot.toString("base64");

out.pixels = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const cv = document.createElement("canvas");
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const dpr = img.naturalWidth / 420;
    const rowH = 12 * dpr;
    const read = (rowIndex, xFrac) => {
        const x = Math.min(img.naturalWidth - 1, Math.round(xFrac * (img.naturalWidth - 1)));
        const y = Math.round(rowIndex * rowH + rowH / 2);
        const d = ctx.getImageData(x, y, 1, 1).data;
        return [d[0], d[1], d[2]];
    };
    const rows = ["A", "B", "C", "D", "E", "F", "G"];
    const res = {};
    for (let i = 0; i < rows.length; i++) {
        res[rows[i]] = {
            mid: read(i, 0.5),
            q1: read(i, 0.25),
            q3: read(i, 0.75),
            start: read(i, 0.01),
            end: read(i, 0.99),
        };
    }
    // A-vs-B full scan: max per-channel deviation between the chip's real
    // paint and the hard-stop (library-true) reference.
    let maxDev = 0;
    let maxAt = 0;
    const devs = [];
    for (let px = 0; px < img.naturalWidth; px++) {
        const f = px / (img.naturalWidth - 1);
        const a = read(0, f);
        const b = read(1, f);
        const dev = Math.max(...[0, 1, 2].map((c) => Math.abs(a[c] - b[c])));
        devs.push(dev);
        if (dev > maxDev) {
            maxDev = dev;
            maxAt = f;
        }
    }
    res.AvsB = {
        maxDev8bit: maxDev,
        maxAtFraction: Number(maxAt.toFixed(4)),
        meanDev: Number((devs.reduce((s, v) => s + v, 0) / devs.length).toFixed(2)),
        pxOver2: devs.filter((v) => v > 2).length,
        widthPx: img.naturalWidth,
        dpr,
    };
    return res;
}, b64);

await page.evaluate(() => document.getElementById("__probe")?.remove());
await browser.close();
console.log(JSON.stringify(out, null, 1));
