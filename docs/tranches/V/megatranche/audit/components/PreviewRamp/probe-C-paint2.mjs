// challenge-C · PreviewRamp — paint probe #2.
//   (a) chip paint vs LIBRARY TRUTH (dense hard stops) per space, at CHIP SCALE
//   (b) chip paint vs "just let the engine do it" (the forbidden arm)
//   (c) the computed `background-image` dialect vs the `data-stops` dialect —
//       fed to the repo's own oracle regex (parseOklchTriples)
//   (d) the font context at the exact DOM position the chip would occupy
import { chromium } from "playwright";

const D = "docs/tranches/V/megatranche/audit/components/PreviewRamp";
const SRC = "/@fs/Users/mkbabb/Programming/value.js/demo/color-session/color-chips/sample.ts";
const CHIP_W = 42; // 2.618rem @16px root, measured by the L seat as 41.94px

const browser = await chromium.launch({ args: ["--force-device-scale-factor=1"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1500);

const CASES = [
    { space: "oklch", hue: "longer" },
    { space: "hsv", hue: "shorter" },
    { space: "xyz", hue: "shorter" },
    { space: "hsl", hue: "longer" },
];

out.cases = {};
for (const { space, hue } of CASES) {
    const built = await page.evaluate(
        async ({ src, space, hue, W }) => {
            const m = await import(/* @vite-ignore */ src);
            const OPERANDS = ["oklch(0.62 0.27 9.8)", "rebeccapurple"];
            const ship = m.sampleInterpolationRamp(OPERANDS, space, hue); // k=16 -> 17
            // LIBRARY TRUTH at pixel resolution: one library sample per painted
            // column, laid down as HARD stops so the engine interpolates nothing.
            const dense = m.sampleInterpolationRamp(OPERANDS, space, hue, W * 4);
            const hard = dense
                .map(
                    (s, i) =>
                        `${s} ${((i / dense.length) * 100).toFixed(5)}% ${(((i + 1) / dense.length) * 100).toFixed(5)}%`,
                )
                .join(", ");
            const host = document.createElement("div");
            host.id = "__probe2";
            host.style.cssText =
                "position:fixed;left:0;top:0;z-index:2147483647;background:#808080";
            const mk = (css) => {
                const d = document.createElement("div");
                d.style.cssText = `display:block;width:${W}px;height:10px;background-image:${css}`;
                host.appendChild(d);
                return d;
            };
            const shipEl = mk(`linear-gradient(90deg, ${ship.join(", ")})`); // row 0 — THE CHIP
            mk(`linear-gradient(90deg, ${hard})`); // row 1 — library truth
            mk(`linear-gradient(90deg, ${ship[0]}, ${ship[ship.length - 1]})`); // row 2 — engine 2-stop, default space
            document.body.appendChild(host);
            return {
                shipN: ship.length,
                denseN: dense.length,
                stampFirst: ship[0],
                computedBg: getComputedStyle(shipEl).backgroundImage,
            };
        },
        { src: SRC, space, hue, W: CHIP_W },
    );

    const shot = await page.locator("#__probe2").screenshot();
    const px = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const cv = document.createElement("canvas");
        cv.width = img.naturalWidth;
        cv.height = img.naturalHeight;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const rowH = img.naturalHeight / 3;
        const at = (row, x) => {
            const d = ctx.getImageData(x, Math.round(row * rowH + rowH / 2), 1, 1).data;
            return [d[0], d[1], d[2]];
        };
        const cmp = (rA, rB) => {
            let max = 0,
                sum = 0,
                over4 = 0;
            for (let x = 0; x < img.naturalWidth; x++) {
                const a = at(rA, x),
                    b = at(rB, x);
                const d = Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2]));
                max = Math.max(max, d);
                sum += d;
                if (d > 4) over4++;
            }
            return {
                max8bit: max,
                mean8bit: Number((sum / img.naturalWidth).toFixed(2)),
                colsOver4: over4,
                cols: img.naturalWidth,
            };
        };
        return {
            chipVsLibraryTruth: cmp(0, 1),
            engine2StopVsLibraryTruth: cmp(2, 1),
            chipVsEngine2Stop: cmp(0, 2),
        };
    }, shot.toString("base64"));

    await page.evaluate(() => document.getElementById("__probe2")?.remove());
    out.cases[`${space}/${hue}`] = { ...built, ...px };
}

// ── (c) oracle-regex truth: the repo's own parseOklchTriples on both dialects
out.oracleRegex = await page.evaluate(
    async ({ src }) => {
        const m = await import(/* @vite-ignore */ src);
        const ship = m.sampleInterpolationRamp(
            ["oklch(0.62 0.27 9.8)", "rebeccapurple"],
            "oklch",
            "longer",
        );
        const host = document.createElement("div");
        host.style.cssText = `position:fixed;left:-9999px;width:42px;height:10px;background-image:linear-gradient(90deg, ${ship.join(", ")})`;
        document.body.appendChild(host);
        const paint = getComputedStyle(host).backgroundImage;
        host.remove();
        // verbatim from e2e/smoke/oracles/o14-preview-truth.spec.ts:162-168
        const parseOklchTriples = (s) => [
            ...s.matchAll(
                /oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g,
            ),
        ];
        const stamp = m.stampStops(ship);
        return {
            stampSample: ship[0],
            paintSample: paint.slice(0, 130),
            paintedTriples: parseOklchTriples(paint).length,
            stampedTriples: stamp.split("|").reduce((n, s) => n + parseOklchTriples(s).length, 0),
            o14Assertion: `expect(painted.length).toBe(stamped.length)`,
        };
    },
    { src: SRC },
);

// ── (d) the font context at the chip's exact DOM slot (menu open, 0 operands)
await page.getByRole("combobox", { name: "Color space", exact: true }).click();
await page.waitForTimeout(600);
out.fontContext = await page.evaluate(() => {
    const lb = document.querySelector('[role="listbox"]');
    const opt = lb?.querySelector('[role="option"]');
    if (!opt) return null;
    const wrapper = opt.querySelector("span.flex.items-center.gap-2");
    const micro = opt.querySelector(".text-micro");
    const name = opt.querySelector("span[id^='reka-select-item-text']");
    const cs = (n) => (n ? getComputedStyle(n) : null);
    return {
        // the chip is a CHILD of `wrapper` and a SIBLING of `.text-micro`,
        // so its `1em` resolves against wrapper's font-size
        wrapperFontSize: cs(wrapper)?.fontSize,
        microFontSize: cs(micro)?.fontSize,
        microLineHeight: cs(micro)?.lineHeight,
        microH: micro?.getBoundingClientRect().height,
        nameFontSize: cs(name)?.fontSize,
        rootFontSize: getComputedStyle(document.documentElement).fontSize,
        chipWouldBe: {
            wPx: 2.618 * parseFloat(getComputedStyle(document.documentElement).fontSize),
            hPx: parseFloat(cs(wrapper)?.fontSize ?? "16"),
        },
        vIfPlaceholderPresent: !!wrapper && wrapper.innerHTML.includes("v-if"),
        wrapperHtml: wrapper?.outerHTML.slice(0, 200),
        optionRect: (({ width, height }) => ({ width, height }))(opt.getBoundingClientRect()),
    };
});
await browser.close();
console.log(JSON.stringify(out, null, 1));
