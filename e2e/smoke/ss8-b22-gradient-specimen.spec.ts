import { test, expect, type Page } from "@playwright/test";
import { decodePng } from "./fixtures/frame-diff";

/**
 * SS-8 B22-gradient-specimen — the live falsifiers for the REFUTED rows of the
 * easing specimen strip (packet docs/tranches/X/execution/SS8/packets/B22-gradient-specimen.md).
 *
 *   · U-1 (SS8-0620), the NEW reading: every resting tile label and family
 *     eyebrow clears 4.5:1 over the plate it actually sits on. The ground is
 *     the strip's own composite under the text box (the same frame with the
 *     text inked transparent), never a model of the plate.
 *   · U-12 (SS8-0631) → C-04: the in-plate specimen tiles are flat. No tile
 *     carries the capsule's floating shadow (computed box-shadow none), so the
 *     band under the tiles is the plate.
 *   · U-7 (SS8-0626) (c): four Shift+ArrowUp presses on Bezier control point 2
 *     author a curve whose y-range overshoots 1, and the pane survives it
 *     (the codomain guard, b0991fd31, is exercised by an overshooting curve).
 */

test.describe.configure({ timeout: 90_000 });

async function openStrip(page: Page, dark = false) {
    await page.emulateMedia({ colorScheme: dark ? "dark" : "light" });
    await page.addInitScript((dark) => {
        try {
            localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
        } catch {
            /* storage may be unavailable; the media emulation still holds */
        }
    }, dark);
    await page.goto("/#/gradient", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".easing-panel")).toBeVisible({ timeout: 30_000 });
    await page.waitForTimeout(1500);
    const head = page.locator(".interval-head").first();
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    await expect(page.locator(".specimen-strip:visible").first()).toBeVisible();
    await page.waitForTimeout(1200);
}

const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]: number[]) => 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!);
const ratio = (a: number[], b: number[]) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x! + 0.05) / (y! + 0.05);
};

for (const dark of [false, true]) {
    test(`U-1 · resting specimen labels and eyebrows clear 4.5:1 on their own plate (1440, ${dark ? "dark" : "light"})`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await openStrip(page, dark);
        const strip = page.locator(".specimen-strip:visible").first();
        // The text runs (resting labels + eyebrows), their boxes relative to the
        // strip, and their computed inks as sRGB bytes.
        const runs = await strip.evaluate((s) => {
            const cv = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
            const rgb = (css: string) => {
                cv.clearRect(0, 0, 1, 1);
                cv.fillStyle = css;
                cv.fillRect(0, 0, 1, 1);
                const d = cv.getImageData(0, 0, 1, 1).data;
                return [d[0]!, d[1]!, d[2]!, d[3]! / 255];
            };
            const pr = s.getBoundingClientRect();
            const els = [
                ...s.querySelectorAll<HTMLElement>(".family-eyebrow"),
                ...[...s.querySelectorAll<HTMLElement>(".specimen-cell")]
                    .filter((c) => c.querySelector(".specimen-tile")?.getAttribute("data-state") !== "on")
                    .map((c) => c.querySelector<HTMLElement>(".tile-label")!),
            ];
            return els.map((el) => {
                const range = document.createRange();
                range.selectNodeContents(el);
                const b = range.getBoundingClientRect();
                return {
                    text: el.textContent ?? "",
                    box: [b.left - pr.left, b.top - pr.top, b.right - pr.left, b.bottom - pr.top],
                    ink: rgb(getComputedStyle(el).color),
                };
            });
        });
        expect(runs.length).toBeGreaterThan(20);
        // The ground: the same strip with the text inked transparent.
        await page.addStyleTag({ content: ".family-eyebrow,.tile-label{color:transparent!important}" });
        await page.waitForTimeout(300);
        const img = decodePng(await strip.screenshot());
        const dsf = img.width / (await strip.evaluate((s) => s.getBoundingClientRect().width));
        const readings = runs.map(({ text, box, ink }) => {
            const [x0, y0, x1, y1] = box.map((v) => Math.round(v * dsf)) as [number, number, number, number];
            let [r, g, b, n] = [0, 0, 0, 0];
            for (let y = Math.max(0, y0); y < Math.min(img.height, y1); y++)
                for (let x = Math.max(0, x0); x < Math.min(img.width, x1); x++) {
                    const i = (y * img.width + x) * img.channels;
                    r += img.data[i]!;
                    g += img.data[i + 1]!;
                    b += img.data[i + 2]!;
                    n++;
                }
            const ground = [r, g, b].map((v) => v / Math.max(1, n));
            const a = ink[3]!;
            const seen = [0, 1, 2].map((k) => ink[k]! * a + ground[k]! * (1 - a));
            return { text, ratio: +ratio(seen, ground).toFixed(3) };
        });
        const worst = readings.reduce((m, r) => (r.ratio < m.ratio ? r : m));
        console.log(`U-1 ${dark ? "dark" : "light"} worst ${JSON.stringify(worst)} of ${readings.length}`);
        expect(worst.ratio, JSON.stringify(worst)).toBeGreaterThanOrEqual(4.5);
    });

    test(`U-12 → C-04 · the in-plate specimen tiles are flat (no floating shadow, ${dark ? "dark" : "light"})`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await openStrip(page, dark);
        const shadows = await page.locator(".specimen-strip:visible").first().evaluate((s) =>
            [...s.querySelectorAll<HTMLElement>(".specimen-tile")].map((t) => ({
                id: t.dataset.specimen,
                on: t.getAttribute("data-state") === "on",
                shadow: getComputedStyle(t).boxShadow,
            })),
        );
        expect(shadows.length).toBe(27);
        expect(shadows.some((t) => t.on)).toBe(true);
        await page
            .locator(".specimen-strip:visible")
            .first()
            .screenshot({ path: test.info().outputPath(`strip-${dark ? "dark" : "light"}.png`) });
        const shadowed = shadows.filter((t) => t.shadow !== "none");
        expect(shadowed, JSON.stringify(shadowed.slice(0, 2))).toEqual([]);
    });
}

test("U-7 (c) · an overshooting authored curve (Shift+ArrowUp ×4 on control point 2) keeps the pane", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));
    await page.setViewportSize({ width: 1440, height: 900 });
    await openStrip(page);
    const row = page.locator(".easing-row").first();
    await row.getByRole("button", { name: "Author a custom curve" }).click();
    const h2 = row.getByRole("slider", { name: "Bezier control point 2" });
    await expect(h2).toBeVisible();
    await h2.focus();
    for (let k = 0; k < 4; k++) {
        await page.keyboard.press("Shift+ArrowUp");
        await page.waitForTimeout(400);
    }
    // The authored curve's y-range, from the handles' own coordinates.
    const pt = async (n: number) => {
        const t = (await row.getByRole("slider", { name: `Bezier control point ${n}` }).getAttribute("aria-valuetext")) ?? "";
        const m = /x (-?[\d.]+), y (-?[\d.]+)/.exec(t);
        expect(m, t).not.toBeNull();
        return [Number(m![1]), Number(m![2])] as const;
    };
    const [, y1] = await pt(1);
    const [, y2] = await pt(2);
    let maxY = -Infinity;
    for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        maxY = Math.max(maxY, 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3);
    }
    expect(maxY, `y1 ${y1} y2 ${y2}`).toBeGreaterThan(1);
    await expect(page.locator(".easing-panel")).toHaveCount(1);
    await expect(page.getByText(/unexpected error/i)).toHaveCount(0);
    expect(pageErrors).toEqual([]);
});
