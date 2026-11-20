import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * The scalar sliders under a finger: a touch 20 px above or below a rail's
 * centre sets its value (before, a rail answered only inside its 24 px band,
 * 12 to 16 px either side), and the larger target grows no row: each
 * slider's margin box is still the 1.5rem band, so the page keeps its height.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

const CELLS = [
    { where: "Extract", hash: "#/extract", names: ["Number of colors", "Vividness"] },
    { where: "Atmosphere", hash: "#/atmosphere", names: ["Color energy", "Noise", "Zones"] },
] as const;

async function tap(page: Page, x: number, y: number): Promise<void> {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await cdp.detach();
    await page.waitForTimeout(300);
}

function rootOf(thumb: Locator): Locator {
    return thumb.locator("xpath=ancestor::*[@data-slot='slider'][1]");
}

for (const cell of CELLS) {
    test(`on ${cell.where} a touch 20 px off a rail's centre sets it, and no row grows`, async ({ page }) => {
        await page.goto(`/${cell.hash}`, { waitUntil: "load" });
        const first = page.getByRole("slider", { name: cell.names[0], exact: true }).first();
        await first.waitFor({ state: "visible", timeout: 60_000 });
        await page.waitForTimeout(1500);
        for (const name of cell.names) {
            const thumb = page.getByRole("slider", { name, exact: true }).first();
            const root = rootOf(thumb);
            await root.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
            await page.waitForTimeout(300);

            const band = await root.evaluate((el) => {
                const cs = getComputedStyle(el);
                const h = el.getBoundingClientRect().height;
                return { target: h, pitch: h + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom) };
            });
            expect(band.target, `${name}: the touch target's height`).toBeGreaterThanOrEqual(44);
            expect(Math.abs(band.pitch - 24), `${name}: the row's pitch is the 24 px band (${band.pitch})`).toBeLessThanOrEqual(0.5);

            const track = (await root.locator(".slider-track").first().boundingBox())!;
            const centre = track.y + track.height / 2;
            const min = Number(await thumb.getAttribute("aria-valuemin"));
            const max = Number(await thumb.getAttribute("aria-valuemax"));
            const span = max - min;
            for (const [dy, f] of [
                [-20, 0.85],
                [20, 0.2],
            ] as const) {
                await tap(page, track.x + track.width * f, centre + dy);
                const v = Number(await thumb.getAttribute("aria-valuenow"));
                expect(
                    Math.abs(v - (min + span * f)),
                    `${name}: a tap ${dy} px off the rail's centre at ${f * 100}% set ${v}`,
                ).toBeLessThanOrEqual(span * 0.15);
            }
        }
    });
}
