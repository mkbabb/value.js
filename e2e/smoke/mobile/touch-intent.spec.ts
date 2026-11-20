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

/**
 * Which way a flick has more page to move: up (the finger rises, the page
 * scrolls on) when the scroller above `el` has more left below than above,
 * else down. A control near the page's foot, seated at the middle, has little
 * page left below it; the grammar is the same either way.
 */
async function roomUp(el: Locator): Promise<boolean> {
    return el.evaluate((node) => {
        let s: Element = document.scrollingElement ?? document.documentElement;
        for (let n = node.parentElement; n; n = n.parentElement) {
            const oy = getComputedStyle(n).overflowY;
            if ((oy === "auto" || oy === "scroll") && n.scrollHeight > n.clientHeight + 1) {
                s = n;
                break;
            }
        }
        return s.scrollHeight - s.clientHeight - s.scrollTop >= s.scrollTop;
    });
}

/** A flick by `dist` px from (x, y), up or down, drifting sideways at `deg` degrees. */
async function flick(page: Page, t: Touch, x: number, y: number, deg: number, up = true, dist = 200): Promise<void> {
    const drift = Math.tan((deg * Math.PI) / 180);
    const steps = 16;
    const sign = up ? -1 : 1;
    await t("touchStart", x, y);
    for (let i = 1; i <= steps; i++) {
        const dy = (dist * i) / steps;
        await t("touchMove", x + dy * drift, y + sign * dy);
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

// The sliders' pages are read at 390x664, a phone's visible block with
// Safari's bars shown: at 390x844 Generate's page is 50 px longer than the
// screen and Atmosphere's not at all, so there is no 100 px of page to scroll.
test.describe("390x664", () => {
    test.use({ viewport: { width: 390, height: 664 } });

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
                const up = await roomUp(root);
                await flick(page, t, box.x + box.width * 0.5, box.y + box.height / 2, deg, up);
                const s1 = await scrollOffsets(root);
                const moved = Math.max(...s1.map((v, i) => Math.abs(v - (s0[i] ?? 0))));
                const after = await thumb.getAttribute("aria-valuenow");
                rows.push(`${deg} deg ${up ? "up" : "down"}: scrolled ${moved.toFixed(0)} px, value ${before} -> ${after}`);
                expect(moved, rows.join("; ")).toBeGreaterThanOrEqual(100);
                expect(after, rows.join("; ")).toBe(before);
            }
        });
    }
});

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

// The colour field ("grab the dot"): a vertical swipe off the dot is the
// page's; the dot's handle is the field's in both axes; a tap sets. Before,
// the field was `touch-action: none` and took every flick that landed on it,
// at every angle, and changed the colour (the page moved 0 px).
for (const [w, h] of [
    [390, 844],
    [375, 667],
] as const) {
    test.describe(`the colour field at ${w}x${h}`, () => {
        test.use({ viewport: { width: w, height: h } });

        const field = (page: Page) => page.locator(".spectrum-picker").first();
        const dot = (page: Page) => page.locator(".spectrum-dot").first();
        const colour = async (page: Page) =>
            `${await field(page).getAttribute("aria-label")} | L ${await page
                .getByRole("slider", { name: "L channel" })
                .first()
                .getAttribute("aria-valuenow")}`;
        const centreOf = (b: { x: number; y: number; width: number; height: number }) => ({
            x: b.x + b.width / 2,
            y: b.y + b.height / 2,
        });
        /** A point on the field well away from the dot. */
        async function offDot(page: Page) {
            const f = (await field(page).boundingBox())!;
            const d = centreOf((await dot(page).boundingBox())!);
            const x = d.x < f.x + f.width / 2 ? f.x + f.width * 0.8 : f.x + f.width * 0.2;
            return { x, y: f.y + f.height * 0.5 };
        }

        test("a vertical flick off the dot scrolls the page and keeps the colour", async ({ page }) => {
            const t = await open(page, "", field(page));
            const rows: string[] = [];
            for (const deg of ANGLES) {
                await page.evaluate(() => scrollTo(0, 0));
                await page.waitForTimeout(400);
                const p = await offDot(page);
                const before = await colour(page);
                const s0 = await page.evaluate(() => scrollY);
                await flick(page, t, p.x, p.y, deg);
                const moved = (await page.evaluate(() => scrollY)) - s0;
                const after = await colour(page);
                rows.push(`${deg} deg: scrolled ${moved} px, ${before} -> ${after}`);
                expect(moved, rows.join("; ")).toBeGreaterThanOrEqual(100);
                expect(after, rows.join("; ")).toBe(before);
            }
        });

        test("a touch that starts on the dot moves the colour straight up, the page still", async ({ page }) => {
            const t = await open(page, "", field(page));
            // The dot to the field's middle first (a tap), so it has room above.
            const m = centreOf((await field(page).boundingBox())!);
            await t("touchStart", m.x, m.y);
            await t("touchEnd");
            await page.waitForTimeout(700);
            const before = await colour(page);
            const s0 = await page.evaluate(() => scrollY);
            const d = centreOf((await dot(page).boundingBox())!);
            await t("touchStart", d.x, d.y);
            for (let i = 1; i <= 12; i++) {
                await t("touchMove", d.x, d.y - i * 5);
                await page.waitForTimeout(25);
            }
            const held = await field(page).getAttribute("data-touch-intent");
            await t("touchEnd");
            await page.waitForTimeout(400);
            expect(held, "the field has the touch while the dot is held").toBe("drag");
            expect(await colour(page), "the colour moved").not.toBe(before);
            expect(await page.evaluate(() => scrollY), "the page held still").toBe(s0);
        });

        test("a tap moves the dot under the finger", async ({ page }) => {
            const t = await open(page, "", field(page));
            const p = await offDot(page);
            const before = await colour(page);
            await t("touchStart", p.x, p.y);
            await t("touchEnd");
            await page.waitForTimeout(700);
            const d = centreOf((await dot(page).boundingBox())!);
            expect(await colour(page), "the tap set the colour").not.toBe(before);
            expect(Math.hypot(d.x - p.x, d.y - p.y), "the dot's distance from the tap (px)").toBeLessThan(8);
        });
    });
}
