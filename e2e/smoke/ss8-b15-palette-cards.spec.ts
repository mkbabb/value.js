import { test, expect, type Page } from "@playwright/test";
import { decodePng, type DecodedImage } from "./fixtures/frame-diff";

/**
 * SS-8 B15-palettes — the saved-card grid's live falsifiers.
 *
 *   · SS8-0442 (PP U-3): a focused card's ring must PAINT on every edge. The
 *     grid's `contain: content` (paint containment, a box the card's exact
 *     width) clipped the 2px/offset-2px outline to the bottom edge alone.
 *   · SS8-0446 (PP U-7) regression arm: the scroller keeps its bottom fade.
 *   · SS8-0450 (PP U-12) regression arm: a zero-match query leaves a way out
 *     ("Clear search"), never delete-all alone.
 *
 * Local seed only (localStorage `color-palettes`); no server writes.
 */

const NOW = "2026-10-19T00:00:00.000Z";
const hue = (n: number) =>
    Array.from({ length: n }, (_, i) => `oklch(0.72 0.16 ${Math.round((i * 360) / n)})`);
const SAVED = Array.from({ length: 12 }, (_, i) => ({
    id: `p${i}`,
    name: `Saved ${i}`,
    slug: `p${i}`,
    colors: hue(5).map((css, position) => ({ css, position })),
    createdAt: NOW,
    updatedAt: NOW,
    isLocal: true,
    published: false,
    visibility: "private",
    tags: [],
}));

test.use({ viewport: { width: 1440, height: 900 } });
// A cold dev-server transform of the Palettes pane can exceed the 30s default.
test.describe.configure({ timeout: 90_000 });

async function openPalettes(page: Page) {
    await page.addInitScript((saved) => {
        try {
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: saved }));
        } catch {
            /* private window */
        }
    }, SAVED);
    await page.goto("/#/palettes", { waitUntil: "domcontentloaded" });
    const card = page.locator("[role=article]").filter({ visible: true }).first();
    await expect(card).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(800);
    return card;
}

test("SS8-0442 · a focused saved card's ring paints on all four edges", async ({ page }) => {
    const card = await openPalettes(page);
    // The pane settles its layout after mount; read the card's box only once
    // two reads 250ms apart agree.
    let bb = (await card.boundingBox())!;
    await expect
        .poll(async () => {
            const prev = JSON.stringify(bb);
            await page.waitForTimeout(250);
            bb = (await card.boundingBox())!;
            return JSON.stringify(bb) === prev;
        }, { timeout: 20_000 })
        .toBe(true);
    // One frame of the card plus a 6px margin. The outline (2px wide, offset
    // 2px) lands 2-4px outside each edge; the margin's outermost line is clean
    // ground. Per edge, the witness is the largest step between any margin line
    // and that outermost line, within ONE frame: the pane's ambient ground
    // animates, so a temporal diff would read noise.
    const P = 6;
    const x0 = Math.floor(bb.x) - P;
    const y0 = Math.floor(bb.y) - P;
    const left = Math.floor(bb.x) - x0; // first card column in the clip
    const top = Math.floor(bb.y) - y0;
    const right = Math.ceil(bb.x + bb.width) - x0; // first column past the card
    const bottom = Math.ceil(bb.y + bb.height) - y0;
    const clip = { x: x0, y: y0, width: right + P, height: bottom + P };
    const step = (img: DecodedImage, a: number[], b: number[]) => {
        let sum = 0;
        a.forEach((ai, k) => {
            const bi = b[k] ?? ai;
            for (let ch = 0; ch < 3; ch++) sum += Math.abs((img.data[ai + ch] ?? 0) - (img.data[bi + ch] ?? 0));
        });
        return sum / (a.length * 3);
    };
    const row = (img: DecodedImage, y: number) =>
        Array.from({ length: right - left }, (_, i) => (y * img.width + left + i) * img.channels);
    const col = (img: DecodedImage, x: number) =>
        Array.from({ length: bottom - top }, (_, i) => ((top + i) * img.width + x) * img.channels);
    const maxStep = (lines: number[][], ref: number[], img: DecodedImage) =>
        Math.max(...lines.map((l) => step(img, l, ref)));
    const range = (from: number, to: number) => Array.from({ length: to - from }, (_, i) => from + i);
    type Edges = Record<"top" | "bottom" | "left" | "right", number>;
    const edgeStep = async (): Promise<Edges> => {
        const img = decodePng(await page.screenshot({ clip }));
        const H = clip.height;
        const W = clip.width;
        return {
            top: maxStep(range(1, top).map((y) => row(img, y)), row(img, 0), img),
            bottom: maxStep(range(bottom, H - 1).map((y) => row(img, y)), row(img, H - 1), img),
            left: maxStep(range(1, left).map((x) => col(img, x)), col(img, 0), img),
            right: maxStep(range(right, W - 1).map((x) => col(img, x)), col(img, W - 1), img),
        };
    };
    const before = await edgeStep();
    await page.keyboard.press("Tab"); // keyboard modality, so focus is :focus-visible
    await card.focus();
    await expect(card).toBeFocused();
    await page.waitForTimeout(300);
    const after = await edgeStep();
    const steps = (Object.keys(after) as (keyof Edges)[]).map((edge) => ({
        edge,
        unfocused: +before[edge].toFixed(2),
        focused: +after[edge].toFixed(2),
    }));
    test.info().annotations.push({ type: "edge-steps", description: JSON.stringify(steps) });
    const unpainted = steps.filter((s) => !(s.focused > Math.max(s.unfocused * 2, s.unfocused + 8)));
    expect(unpainted, `outer-vs-gap step per edge: ${JSON.stringify(steps)}`).toEqual([]);
});

test("SS8-0446 · the saved-card scroller keeps its bottom fade (regression arm)", async ({ page }) => {
    const card = await openPalettes(page);
    const mask = await card.evaluate((el) => {
        let sc: HTMLElement | null = el.parentElement;
        while (sc && !/(auto|scroll)/.test(getComputedStyle(sc).overflowY)) sc = sc.parentElement;
        return sc ? getComputedStyle(sc).maskImage : null;
    });
    expect(mask).toMatch(/linear-gradient/);
});

test("SS8-0450 · a zero-match query offers Clear search (regression arm)", async ({ page }) => {
    await openPalettes(page);
    await page.locator("input[aria-label='Search your palettes']").filter({ visible: true }).fill("zzqx-no-such-palette");
    await expect(page.getByRole("button", { name: "Clear search" }).filter({ visible: true })).toBeVisible();
});
