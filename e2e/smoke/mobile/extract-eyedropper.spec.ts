import { test, expect, type CDPSession, type Locator, type Page } from "@playwright/test";
import { loadExtractImage, PORTRAIT } from "../fixtures/extract-image";

/**
 * Pick a colour, multitouch first (color-40 N; his FORTIETH order: "the pick a
 * colour ui and ux is awful--the eyeglass lens view is slow and not
 * intuitive--multitouch first--the header section should not have such a large
 * chin, and the dot should be a palette"). On a phone at 390 under touch:
 * - N-1: the lens has painted within 200 ms of touch-down;
 * - N-2: the lens stands 80 px or more from the finger, and inside the stage at
 *   its top edge;
 * - N-3: one finger scrubs (an 80 x 60 px drag changes the readout five times
 *   or more), lifting holds the pick, one new touch moves it, and a pinch keeps
 *   the held pick's colour;
 * - N-6: the dialog is the photo's size: its height less the bar, the photo and
 *   the foot is 2 px or less;
 * - N-7: Add and Use exist before any pick (disabled), and with a pick held the
 *   readout is not cut;
 * - N-8: the bar's mark is the Palettes mark, and after an Add its second well
 *   is the added colour.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

/** Four flat quadrants: navy, rose, sand, green. */
const PHOTO = { ...PORTRAIT, name: "eyedropper.png" } as const;

async function openEyedropper(page: Page) {
    await loadExtractImage(page, PHOTO);
    await page.locator("[data-zone-affordance]").first().tap();
    const dialog = page.getByRole("dialog", { name: "Eyedropper" });
    await expect(dialog).toBeVisible({ timeout: 20_000 });
    // The stage holds the photo once its canvas carries the bitmap and its box
    // holds still across frames.
    const stage = await dialog.evaluate(async (d, size) => {
        const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
        let last = "";
        for (let held = 0, n = 0; n < 1200; n++) {
            await frame();
            const c = [...d.querySelectorAll("canvas")].find((x) => x.width === size.w && x.height === size.h);
            const b = c?.closest(".eyedropper-stage")?.getBoundingClientRect();
            const k = b ? `${b.x},${b.y},${b.width},${b.height}` : "";
            held = k && k === last ? held + 1 : 0;
            last = k;
            if (held >= 10) return { x: b!.x, y: b!.y, w: b!.width, h: b!.height };
        }
        return null;
    }, { w: PHOTO.width, h: PHOTO.height });
    expect(stage, "the eyedropper holds the photo, fitted and settled").not.toBeNull();
    return { dialog, stage: stage! };
}

type Pt = { x: number; y: number };
async function touch(cdp: CDPSession, type: "touchStart" | "touchMove" | "touchEnd", points: Pt[]) {
    await cdp.send("Input.dispatchTouchEvent", {
        type,
        touchPoints: points.map((p, id) => ({ x: p.x, y: p.y, id })),
    });
}

async function readout(dialog: Locator): Promise<string> {
    return ((await dialog.locator("[data-eyedropper-readout]").textContent()) ?? "").trim();
}

async function lensBox(dialog: Locator) {
    return dialog.locator("[data-eyedropper-lens]").evaluate((el) => {
        const r = el.getBoundingClientRect();
        return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, top: r.top, on: (el as HTMLElement).dataset.state === "on" };
    });
}

test("N-1, N-2: the lens paints within 200 ms of touch-down, above the finger, and stays inside at the top edge", async ({
    page,
}) => {
    const { dialog, stage } = await openEyedropper(page);
    const cdp = await page.context().newCDPSession(page);
    const at = { x: stage.x + stage.w * 0.5, y: stage.y + stage.h * 0.6 };
    await touch(cdp, "touchStart", [at]);
    await page.waitForTimeout(200);
    const painted = await dialog.locator("[data-eyedropper-lens] canvas").evaluate((c: HTMLCanvasElement) => {
        const d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4) if (d[i]! > 0) n++;
        return n / (d.length / 4);
    });
    expect(painted, "share of the lens painted 200 ms after touch-down").toBeGreaterThan(0.5);
    const lens = await lensBox(dialog);
    expect(lens.on).toBe(true);
    expect(Math.hypot(lens.cx - at.x, lens.cy - at.y), "the lens's centre from the finger").toBeGreaterThanOrEqual(80);
    await touch(cdp, "touchEnd", []);

    // The top edge: the lens stays inside the stage and clear of the finger.
    const top = { x: stage.x + stage.w * 0.3, y: stage.y + 4 };
    await touch(cdp, "touchStart", [top]);
    await page.waitForTimeout(400);
    const edge = await lensBox(dialog);
    expect(edge.top, "the lens's top inside the stage").toBeGreaterThanOrEqual(stage.y - 1);
    expect(Math.hypot(edge.cx - top.x, edge.cy - top.y)).toBeGreaterThanOrEqual(80);
    await touch(cdp, "touchEnd", []);
    await cdp.detach();
});

test("N-3: one finger scrubs, the lift holds, one new touch moves the pick, a pinch keeps it", async ({ page }) => {
    const { dialog, stage } = await openEyedropper(page);
    await dialog.locator("[data-eyedropper-readout]").evaluate((el) => {
        const w = window as unknown as { __readouts: number };
        w.__readouts = 0;
        new MutationObserver(() => w.__readouts++).observe(el, { childList: true, characterData: true, subtree: true });
    });
    const cdp = await page.context().newCDPSession(page);
    // An 80 x 60 px drag across the quadrants' meeting point.
    const c = { x: stage.x + stage.w / 2, y: stage.y + stage.h / 2 };
    const from = { x: c.x - 40, y: c.y - 30 };
    await touch(cdp, "touchStart", [from]);
    for (let i = 1; i <= 16; i++) {
        await touch(cdp, "touchMove", [{ x: from.x + (80 * i) / 16, y: from.y + (60 * i) / 16 }]);
        await page.waitForTimeout(20);
    }
    await touch(cdp, "touchEnd", []);
    const changes = await page.evaluate(() => (window as unknown as { __readouts: number }).__readouts);
    expect(changes, "readout changes along an 80 x 60 px drag").toBeGreaterThanOrEqual(5);
    const heldAfterDrag = await readout(dialog);
    await expect(dialog.locator(".pick-ring")).toHaveAttribute("data-state", "on");

    // One new tap elsewhere moves the pick in one tap.
    const q = { x: stage.x + stage.w * 0.25, y: stage.y + stage.h * 0.25 };
    await touch(cdp, "touchStart", [q]);
    await touch(cdp, "touchEnd", []);
    await page.waitForTimeout(250);
    const moved = await readout(dialog);
    expect(moved, "one tap moved the pick").not.toBe(heldAfterDrag);
    await expect(dialog.locator(".pick-ring")).toHaveAttribute("data-state", "on");

    // A pinch: the two fingers zoom, the held pick keeps its colour.
    const ringBefore = await dialog.locator(".pick-ring").evaluate((el) => el.getBoundingClientRect().x);
    const a = { x: c.x - 30, y: c.y };
    const b = { x: c.x + 30, y: c.y };
    await touch(cdp, "touchStart", [a]);
    await touch(cdp, "touchStart", [a, b]);
    for (let i = 1; i <= 10; i++) {
        await touch(cdp, "touchMove", [
            { x: a.x - 6 * i, y: a.y },
            { x: b.x + 6 * i, y: b.y },
        ]);
        await page.waitForTimeout(20);
    }
    await touch(cdp, "touchEnd", []);
    await page.waitForTimeout(400);
    expect(await readout(dialog), "the held pick's colour through the pinch").toBe(moved);
    const ringAfter = await dialog.locator(".pick-ring").evaluate((el) => el.getBoundingClientRect().x);
    expect(Math.abs(ringAfter - ringBefore), "the ring rode the zoom with its pixel").toBeGreaterThan(2);
    await cdp.detach();
});

test("N-6, N-7, N-8: the dialog is the photo's size; Add and Use wait, labelled; the mark's well takes an Add", async ({
    page,
}) => {
    const { dialog, stage } = await openEyedropper(page);
    const fit = await dialog.evaluate((d) => {
        const h = (sel: string) => d.querySelector(sel)?.getBoundingClientRect().height ?? 0;
        return {
            dialog: d.getBoundingClientRect().height,
            parts: h(".eyedropper-bar") + h(".eyedropper-stage") + h(".eyedropper-foot"),
        };
    });
    expect(Math.abs(fit.dialog - fit.parts), `dialog ${fit.dialog} against its parts ${fit.parts}`).toBeLessThanOrEqual(2);

    const add = dialog.getByRole("button", { name: "Add to palette" });
    const use = dialog.getByRole("button", { name: "Use color" });
    await expect(add).toBeVisible();
    await expect(use).toBeVisible();
    await expect(add).toBeDisabled();
    await expect(use).toBeDisabled();
    await expect(dialog.locator("[data-eyedropper-mark] .palettes-glyph")).toBeVisible();

    await page.touchscreen.tap(stage.x + stage.w * 0.75, stage.y + stage.h * 0.75);
    await expect(add).toBeEnabled();
    const cut = await dialog
        .locator("[data-eyedropper-readout]")
        .evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(cut, "the held pick's readout is not cut").toBeLessThanOrEqual(0);

    const sampled = await dialog.locator("[data-eyedropper-mark] .palettes-glyph circle").nth(0).evaluate((c) => getComputedStyle(c).fill);
    await add.tap();
    await page.waitForTimeout(400);
    const second = await dialog.locator("[data-eyedropper-mark] .palettes-glyph circle").nth(1).evaluate((c) => getComputedStyle(c).fill);
    expect(second, "the second well is the added colour").toBe(sampled);
    await expect(dialog, "Add keeps the dialog open").toBeVisible();

    await use.tap();
    await expect(dialog, "Use closes it").toBeHidden({ timeout: 5_000 });
});
