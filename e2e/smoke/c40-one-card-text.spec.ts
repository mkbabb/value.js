/**
 * The FORTIETH order, A-2: one inspector card's text at a time.
 *
 * Measured on production: from Home to My Palettes at 1440, at 221-255 ms
 * "My Palettes" was drawn over "About the color spaces, OKLCh": the arriving
 * card faded in over 300 ms after an 80 ms hold while the leaver faded over
 * 200 ms. The contract, read every animation frame from the change until the
 * region has been still for 600 ms, at 1440 and at 390:
 *   - no frame shows two inspector cards whose TEXT is above 0.15 (a card's
 *     own opacity times its plate's children's: the plate's material is its
 *     pseudo-elements, so a plate on its seat with its text to come reads 0);
 *   - no frame has the region empty (some card's plate is at 0.15 or more).
 */
import { test, expect, type Page } from "@playwright/test";

interface Card {
    plate: number;
    text: number;
}

async function hop(page: Page, hash: string): Promise<Card[][]> {
    return page.evaluate(async (hash) => {
        const frame = () => new Promise((r) => requestAnimationFrame(r));
        const read = (): { plate: number; text: number }[] => {
            const region = document.querySelector(".pane-container > .pane-wrapper--inspector");
            if (!region) return [];
            return [...region.children].map((k) => {
                const plate = Number(getComputedStyle(k).opacity);
                const card = k.matches(".glass-resting") ? k : k.querySelector(":scope > .glass-resting");
                const kids = card ? [...card.children].map((c) => Number(getComputedStyle(c).opacity)) : [];
                return { plate, text: plate * (kids.length ? Math.max(...kids) : 1) };
            });
        };
        const out = [read()];
        location.hash = hash;
        let still = performance.now();
        let prev = JSON.stringify(out[0]);
        const start = performance.now();
        while (performance.now() - still < 600 && performance.now() - start < 10_000) {
            await frame();
            const s = read();
            const sig = JSON.stringify(s.map((c) => [c.plate.toFixed(2), c.text.toFixed(2)]));
            if (sig !== prev) still = performance.now();
            prev = sig;
            out.push(s);
        }
        return out;
    }, hash);
}

function faults(frames: Card[][]): string[] {
    const out: string[] = [];
    frames.forEach((cards, i) => {
        const legible = cards.filter((c) => c.text > 0.15);
        if (legible.length > 1)
            out.push(`frame ${i}: ${legible.length} cards' text above 0.15 (${legible.map((c) => c.text.toFixed(2)).join(", ")})`);
        if (!cards.some((c) => c.plate >= 0.15)) out.push(`frame ${i}: the region is empty`);
    });
    return out;
}

for (const [width, height] of [
    [1440, 900],
    [390, 844],
] as const) {
    test(`c40 · ${width}: one inspector card's text at a time, Home to My Palettes and back`, async ({ page }) => {
        test.setTimeout(150_000);
        await page.setViewportSize({ width, height });
        await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
        await expect(page.locator(".pane-wrapper--inspector .about-card")).toBeVisible({ timeout: 60_000 });
        await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
        await page.waitForTimeout(1000);
        for (const hash of ["#/palettes", "#/", "#/palettes", "#/"]) {
            const frames = await hop(page, hash);
            const found = faults(frames);
            expect(found.slice(0, 6), `${width} → ${hash} (${frames.length} frames)`).toEqual([]);
        }
    });
}
