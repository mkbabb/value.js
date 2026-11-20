import { test, expect, type Page } from "@playwright/test";

/**
 * The picker on a phone is sized, never a box that scrolls inside the page.
 *
 * Sideways: the colour field's dot travels in a box as wide as the field,
 * moved by its own percentages, and that travel used to widen the card's
 * scroll host (542 against 364 px at 390 for the default colour; 677 at full
 * saturation), so a sideways swipe on the readout slid the whole card 117 px.
 */

const HOST = ".picker-scroll-host";

async function openPicker(page: Page, hash = "/"): Promise<void> {
    await page.goto(hash, { waitUntil: "load" });
    await page.locator(".spectrum-picker").first().waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1200);
}

/**
 * The dot at saturation `s` and value `v`: a mouse drag from the field's
 * middle to the target, past the edge for 0 and 1 (the drag clamps there, and
 * a mouse is never held by the touch lock).
 */
async function dotTo(page: Page, s: number, v: number): Promise<void> {
    const field = page.locator(".spectrum-picker").first();
    const b = (await field.boundingBox())!;
    const past = (f: number, lo: number, size: number) => (f === 0 ? lo - 10 : f === 1 ? lo + size + 10 : lo + size * f);
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.mouse.down();
    await page.mouse.move(past(s, b.x, b.width), past(1 - v, b.y, b.height), { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(400);
    // At lightness 0 the colour is black and holds no saturation, so the
    // label reads 0 % whatever the drag; there only the lightness is read.
    await expect(field).toHaveAttribute(
        "aria-label",
        v === 0
            ? /^Color spectrum, saturation \d+%, lightness 0%$/
            : `Color spectrum, saturation ${Math.round(s * 100)}%, lightness ${Math.round(v * 100)}%`,
    );
}

async function hostBox(page: Page) {
    return page.locator(HOST).first().evaluate((h) => ({
        sw: h.scrollWidth,
        cw: h.clientWidth,
        sh: h.scrollHeight,
        ch: h.clientHeight,
        left: h.scrollLeft,
    }));
}

for (const [w, h] of [
    [390, 844],
    [375, 667],
] as const) {
    test.describe(`${w}x${h}`, () => {
        test.use({ viewport: { width: w, height: h } });
        test.beforeEach(({}, testInfo) => {
            testInfo.setTimeout(180_000);
        });

        test("no colour widens the card: its host never scrolls sideways", async ({ page }) => {
            const rows: string[] = [];
            await openPicker(page);
            for (const s of [0, 0.5, 1])
                for (const v of [0, 1]) {
                    await dotTo(page, s, v);
                    const b = await hostBox(page);
                    rows.push(`s ${s} v ${v}: scrollWidth ${b.sw}, clientWidth ${b.cw}`);
                    expect(b.sw, rows.join("; ")).toBe(b.cw);
                }
        });

        test("a sideways swipe on the readout leaves the card where it is", async ({ page }) => {
            await openPicker(page);
            await dotTo(page, 1, 1);
            const cdp = await page.context().newCDPSession(page);
            const readout = (await page.locator(".picker-header").first().boundingBox())!;
            const y = readout.y + readout.height * 0.6;
            const x0 = readout.x + readout.width * 0.85;
            const send = (type: "touchStart" | "touchMove" | "touchEnd", x = 0) =>
                cdp.send("Input.dispatchTouchEvent", {
                    type,
                    touchPoints: type === "touchEnd" ? [] : [{ x, y }],
                });
            await send("touchStart", x0);
            for (let i = 1; i <= 16; i++) {
                await send("touchMove", x0 - i * 14);
                await page.waitForTimeout(16);
            }
            await send("touchEnd");
            await page.waitForTimeout(600);
            expect((await hostBox(page)).left, "the card host's scrollLeft after the swipe").toBe(0);
        });
    });
}

/*
 * Vertically, upright: the plate was capped at the scene band, a cap made for
 * a short landscape, and the band is built on `svh` (the viewport with the
 * browser's bars shown), so on a real iPhone the card scrolled itself by 5 px
 * (390x664) to 114 px (375x548) and its header condensed under the page's own
 * scroll. Each cell sets the viewport to one of Safari's visible heights, so
 * `svh` takes it as it does on the phone.
 */
for (const [w, h] of [
    [375, 548],
    [375, 628],
    [390, 664],
    [390, 750],
    [390, 844],
] as const) {
    test.describe(`upright ${w}x${h}`, () => {
        test.use({ viewport: { width: w, height: h } });
        test.beforeEach(({}, testInfo) => {
            testInfo.setTimeout(120_000);
        });

        test("the card never scrolls itself, and its header never condenses on a page scroll", async ({ page }) => {
            await openPicker(page);
            const b = await hostBox(page);
            expect(b.sh, `the host's scrollHeight ${b.sh} against its clientHeight ${b.ch}`).toBe(b.ch);

            const condensed = await page.evaluate(async () => {
                const header = document.querySelector(".picker-header")!;
                const end = document.documentElement.scrollHeight - innerHeight;
                const seen = new Set<string>();
                for (let i = 0; i <= 24; i++) {
                    scrollTo(0, (end * i) / 24);
                    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    seen.add(header.getAttribute("data-condensed") ?? "absent");
                }
                scrollTo(0, 0);
                return [...seen];
            });
            expect(condensed, "the header's data-condensed through a page scroll").not.toContain("true");
        });
    });
}
