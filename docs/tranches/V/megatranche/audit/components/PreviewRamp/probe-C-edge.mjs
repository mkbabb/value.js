// challenge-C · PreviewRamp — edge/robustness probe.
//   (a) forced-colors: does a `background-image` gradient survive WHCM?
//   (b) serializeStop's `/ \/ 1\)$/` replace — does it EVER match?
//   (c) one unpaintable stop poisons the WHOLE gradient (the chip's paint is a
//       single declaration; the strip's is per-segment)
//   (d) domain boundaries through the sampler
import { chromium } from "playwright";
const D = "docs/tranches/V/megatranche/audit/components/PreviewRamp";
const SRC = "/@fs/Users/mkbabb/Programming/value.js/demo/color-session/color-chips/sample.ts";
const CU = "/@fs/Users/mkbabb/Programming/value.js/demo/color-session/color-utils.ts";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));
await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1200);

// (b) + (d)
out.sampler = await page.evaluate(
    async ({ src, cu }) => {
        const m = await import(/* @vite-ignore */ src);
        const c = await import(/* @vite-ignore */ cu);
        const tryIt = (fn) => {
            try {
                return fn();
            } catch (e) {
                return "THREW: " + String(e).slice(0, 140);
            }
        };
        const OP = ["oklch(0.62 0.27 9.8)", "rebeccapurple"];
        const anyEndsWithSlash1 = (stops) =>
            Array.isArray(stops) ? stops.filter((s) => / \/ 1\)$/.test(s)).length : stops;
        return {
            // does the dead-replace ever fire? scan every space x every arc
            slash1Hits: (() => {
                let hits = 0,
                    total = 0;
                for (const sp of ["oklch", "oklab", "lab", "lch", "hsl", "hsv", "hwb", "rgb", "xyz"])
                    for (const h of ["shorter", "longer", "increasing", "decreasing"]) {
                        const s = m.sampleInterpolationRamp(OP, sp, h);
                        if (s) {
                            total += s.length;
                            hits += anyEndsWithSlash1(s);
                        }
                    }
                return { hits, total };
            })(),
            alphaHalf: tryIt(() =>
                m
                    .sampleInterpolationRamp(["oklch(0.6 0.2 20 / 0.5)", "rebeccapurple"], "oklch", "shorter")
                    .slice(0, 2),
            ),
            serializeStopAlpha1: tryIt(() =>
                m.serializeStop(c.parseColorIn("rgb(1 2 3 / 1)", "oklch")),
            ),
            serializeStopAlphaHalf: tryIt(() =>
                m.serializeStop(c.parseColorIn("rgb(1 2 3 / 0.5)", "oklch")),
            ),
            k1: tryIt(() => m.sampleInterpolationRamp(OP, "oklch", "shorter", 1)),
            k0: tryIt(() => m.sampleInterpolationRamp(OP, "oklch", "shorter", 0)),
            kNaN: tryIt(() => {
                const s = m.sampleInterpolationRamp(OP, "oklch", "shorter", NaN);
                return Array.isArray(s) ? { n: s.length, first: s[0] } : s;
            }),
            // kInfinity: SKIPPED — `perSegment = Math.ceil(Infinity/1)+1 =
            // Infinity` makes the inner `for (j < perSegment)` non-terminating.
            // Verified once by observation: the probe hung the page for >170 s
            // and had to be killed. Re-running it would hang this probe too.
            kInfinity: "NON-TERMINATING (observed; see report finding C-9)",
            kNegative: tryIt(() => {
                const s = m.sampleInterpolationRamp(OP, "oklch", "shorter", -5);
                return Array.isArray(s) ? { n: s.length } : s;
            }),
            emptyStringOperand: tryIt(() => m.sampleInterpolationRamp(["", "red"], "oklch", "shorter")),
            twelveOperands: tryIt(() => {
                const s = m.sampleInterpolationRamp(Array(12).fill("red"), "oklch", "shorter");
                return { n: s.length };
            }),
        };
    },
    { src: SRC, cu: CU },
);

// (a) + (c)
out.render = await page.evaluate(async ({ src }) => {
    const m = await import(/* @vite-ignore */ src);
    const ship = m.sampleInterpolationRamp(
        ["oklch(0.62 0.27 9.8)", "rebeccapurple"],
        "oklch",
        "longer",
    );
    const mk = (id, css) => {
        const d = document.createElement("span");
        d.id = id;
        d.style.cssText =
            "position:fixed;left:0;top:0;display:inline-block;inline-size:2.618rem;block-size:1em;border-radius:4px;box-shadow:inset 0 0 0 1px color-mix(in oklab, black 12%, transparent);";
        d.style.backgroundImage = css;
        document.body.appendChild(d);
        return d;
    };
    const good = mk("__good", `linear-gradient(90deg, ${ship.join(", ")})`);
    const poisoned = mk(
        "__poison",
        `linear-gradient(90deg, ${[...ship.slice(0, 8), "oklch(NaN NaN NaN)", ...ship.slice(9)].join(", ")})`,
    );
    return {
        goodBg: getComputedStyle(good).backgroundImage.slice(0, 70),
        poisonedBg: getComputedStyle(poisoned).backgroundImage,
        poisonedBgColor: getComputedStyle(poisoned).backgroundColor,
    };
}, { src: SRC });

await page.emulateMedia({ forcedColors: "active" });
await page.waitForTimeout(400);
out.forcedColors = await page.evaluate(() => {
    const g = document.getElementById("__good");
    const cs = getComputedStyle(g);
    return {
        backgroundImage: cs.backgroundImage.slice(0, 70),
        backgroundColor: cs.backgroundColor,
        forcedColorAdjust: cs.forcedColorAdjust,
        boxShadow: cs.boxShadow,
    };
});
const bb = await page.locator("#__good").boundingBox();
if (bb) await page.screenshot({ path: `${D}/chip-forced-colors.png`, clip: bb });
await page.emulateMedia({ forcedColors: "none" });
await page.waitForTimeout(200);
const bb2 = await page.locator("#__good").boundingBox();
if (bb2) await page.screenshot({ path: `${D}/chip-normal.png`, clip: bb2 });
out.chipBox = bb2;
await page.evaluate(() => {
    document.getElementById("__good")?.remove();
    document.getElementById("__poison")?.remove();
});
await browser.close();
console.log(JSON.stringify(out, null, 1));
