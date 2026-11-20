import { test, expect, type Locator } from "@playwright/test";
import { mainPane } from "./fixtures/dock";

/**
 * The scalar sliders fill in his colour (critique C-09; his [67] "more
 * colourful"), at the desk and on a phone.
 *
 * The range was painted `--foreground`: near-black on a pale track in light,
 * pale grey in dark, while everything else on the page carried the current
 * colour. It now reads the live colour certified on the track (the unit test
 * `slider-fill-ink.test.ts` holds the 3:1 floor; o18 measures it painted).
 * The oracle is the page's own live accent: the fill must carry its hue, with
 * chroma, not a neutral ink.
 */

const COLOR = "oklch(0.62 0.19 25)";

/** The range's fill ink and the live accent, each as OKLCH chroma and hue. */
function fillAndAccent(range: Locator) {
    return range.evaluate((el) => {
        const lch = (value: string) => {
            const probe = document.createElement("div");
            probe.style.color = `oklch(from ${value} l c h)`;
            document.body.append(probe);
            const out = getComputedStyle(probe).color;
            probe.remove();
            const m = out.match(/^oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+|none)/);
            return m ? { c: Number(m[2]), h: m[3] === "none" ? 0 : Number(m[3]) } : { c: -1, h: -1, raw: out };
        };
        return {
            fill: lch(getComputedStyle(el).getPropertyValue("--liquid-fill-tint").trim()),
            accent: lch(getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim()),
        };
    });
}

for (const width of [1440, 390]) {
    test(`Gradient's Direction and Extract's Vividness fill in the live colour (${width})`, async ({ page }) => {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        for (const [route, name] of [
            ["/#/gradient", "Gradient direction"],
            ["/#/extract", "Vividness"],
        ] as const) {
            await page.goto(`${route}?color=${encodeURIComponent(COLOR)}`);
            await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
            const range = page
                .locator(".glass-slider", { has: page.getByRole("slider", { name, exact: true }) })
                .locator(".slider-range");
            await expect(range).toBeAttached();
            await expect
                .poll(
                    async () => {
                        const { fill, accent } = await fillAndAccent(range);
                        const dh = Math.abs(((fill.h - accent.h + 540) % 360) - 180);
                        return fill.c > 0.08 && accent.c > 0.03 && dh < 15
                            ? "his colour"
                            : `fill ${JSON.stringify(fill)} accent ${JSON.stringify(accent)}`;
                    },
                    { timeout: 15_000, message: `${route} ${name}: the fill carries the live colour` },
                )
                .toBe("his colour");
        }
    });
}
