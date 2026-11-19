import { test, expect, type CDPSession, type Locator, type Page } from "@playwright/test";

/**
 * The touch grammar on every slider (DESIGN.md law S-8), under real touches
 * dispatched through CDP (`Input.dispatchTouchEvent`, the browser's own touch
 * path, so `touch-action` and the pan decide as they would under a finger):
 * a vertical flick that starts on a control scrolls the page and leaves the
 * value alone, with up to 30 degrees of sideways drift; a sideways drag tracks
 * from the first touch; a tap sets.
 *
 * Before: glass's Slider took every touch (`touch-action: none`), so a flick
 * on Extract's Colors moved the page 0 px and took the value from 5 to 9.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

type Touch = (type: "touchStart" | "touchMove" | "touchEnd", x?: number, y?: number) => Promise<unknown>;

function touch(cdp: CDPSession): Touch {
    return (type, x = 0, y = 0) =>
        cdp.send("Input.dispatchTouchEvent", {
            type,
            touchPoints: type === "touchEnd" ? [] : [{ x, y }],
        });
}

async function open(page: Page, hash: string, ready: Locator): Promise<Touch> {
    await page.goto(`/${hash}`, { waitUntil: "load" });
    await ready.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1500);
    return touch(await page.context().newCDPSession(page));
}

/**
 * How far a flick moved what scrolls: the document, or the nearest port that
 * scrolls on the block axis above `el` (a console's own sections), whichever
 * moved more.
 */
async function scrollOffsets(el: Locator): Promise<number[]> {
    return el.evaluate((node) => {
        const out = [document.scrollingElement?.scrollTop ?? 0];
        for (let n = node.parentElement; n; n = n.parentElement) {
            const oy = getComputedStyle(n).overflowY;
            if ((oy === "auto" || oy === "scroll") && n.scrollHeight > n.clientHeight + 1) {
                out.push(n.scrollTop);
                break;
            }
        }
        return out;
    });
}

/** Seat `el` at the viewport's middle, with every scroller above it at rest. */
async function centre(page: Page, el: Locator): Promise<void> {
    await el.evaluate((node) => node.scrollIntoView({ block: "center", behavior: "instant" }));
    await page.waitForTimeout(400);
}

/** A flick up by `dist` px from (x, y), drifting sideways at `deg` degrees. */
async function flick(page: Page, t: Touch, x: number, y: number, deg: number, dist = 200): Promise<void> {
    const drift = Math.tan((deg * Math.PI) / 180);
    const steps = 16;
    await t("touchStart", x, y);
    for (let i = 1; i <= steps; i++) {
        const dy = (dist * i) / steps;
        await t("touchMove", x + dy * drift, y - dy);
        await page.waitForTimeout(16);
    }
    await t("touchEnd");
    await page.waitForTimeout(700);
}

const ANGLES = [0, 15, 30] as const;

const SLIDERS = [
    { where: "Extract's Colors", hash: "#/extract", name: "Number of colors" },
    { where: "Extract's Vividness", hash: "#/extract", name: "Vividness" },
    { where: "Generate's count", hash: "#/generate", name: "Number of colors" },
    { where: "Gradient's Direction", hash: "#/gradient", name: "Gradient direction" },
    { where: "Atmosphere's Color energy", hash: "#/atmosphere", name: "Color energy" },
] as const;

for (const s of SLIDERS) {
    test(`a vertical flick on ${s.where} scrolls the page and keeps the value`, async ({ page }) => {
        const thumb = page.getByRole("slider", { name: s.name }).first();
        const t = await open(page, s.hash, thumb);
        const root = thumb.locator("xpath=ancestor::*[@data-slot='slider'][1]");
        const rows: string[] = [];
        for (const deg of ANGLES) {
            await centre(page, root);
            const box = (await root.boundingBox())!;
            const before = await thumb.getAttribute("aria-valuenow");
            const s0 = await scrollOffsets(root);
            await flick(page, t, box.x + box.width * 0.5, box.y + box.height / 2, deg);
            const s1 = await scrollOffsets(root);
            const moved = Math.max(...s1.map((v, i) => Math.abs(v - (s0[i] ?? 0))));
            const after = await thumb.getAttribute("aria-valuenow");
            rows.push(`${deg} deg: scrolled ${moved.toFixed(0)} px, value ${before} -> ${after}`);
            expect(moved, rows.join("; ")).toBeGreaterThanOrEqual(100);
            expect(after, rows.join("; ")).toBe(before);
        }
    });
}

test("a sideways drag on a slider tracks from the first touch, and a tap sets", async ({ page }) => {
    const thumb = page.getByRole("slider", { name: "Vividness" }).first();
    const t = await open(page, "#/extract", thumb);
    const root = thumb.locator("xpath=ancestor::*[@data-slot='slider'][1]");
    await centre(page, root);
    const box = (await root.boundingBox())!;
    const y = box.y + box.height / 2;
    const max = Number(await thumb.getAttribute("aria-valuemax"));
    const min = Number(await thumb.getAttribute("aria-valuemin"));
    const at = (f: number) => box.x + box.width * f;
    const value = async () => Number(await thumb.getAttribute("aria-valuenow"));
    const scroll0 = await page.evaluate(() => scrollY);

    await t("touchStart", at(0.2), y);
    const seen: number[] = [];
    for (let i = 1; i <= 20; i++) {
        await t("touchMove", at(0.2 + i * 0.025), y + (i % 2));
        await page.waitForTimeout(25);
        if (i % 5 === 0) seen.push(await value());
    }
    await t("touchEnd");
    await page.waitForTimeout(300);
    const span = max - min;
    const note = `values during the drag: ${seen.join(", ")}`;
    // From the first sample (5 steps, about 50 px) the value moves with the finger.
    expect(seen[0]!, note).toBeGreaterThan(min + span * 0.25);
    for (let i = 1; i < seen.length; i++) expect(seen[i]!, note).toBeGreaterThanOrEqual(seen[i - 1]!);
    expect(Math.abs(seen.at(-1)! - (min + span * 0.7)), note).toBeLessThanOrEqual(span * 0.12);
    expect(await page.evaluate(() => scrollY), "the page held still under the drag").toBe(scroll0);

    await t("touchStart", at(0.15), y);
    await t("touchEnd");
    await page.waitForTimeout(300);
    expect(Math.abs((await value()) - (min + span * 0.15)), "a tap sets the value where it lands").toBeLessThanOrEqual(
        span * 0.12,
    );
});
