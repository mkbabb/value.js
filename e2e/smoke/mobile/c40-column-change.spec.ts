/**
 * The FORTIETH order, A-3 ("there's a strange re-sizing issue"): on a phone,
 * the column change is carried, never thrown.
 *
 * The column keeps its subject-first order: on My Palettes the palettes card
 * stands above the picker, on Home the picker leads. What is held here is how
 * the change from one to the other is carried, measured on a revisit (both
 * panes warm) at 390x844, pressing the dock's Home seat:
 *   (1) at 4x CPU, the first frame that answers the press (the trigger names
 *       Home) comes within 100 ms of the press (B-2's bound; on production
 *       the switch ran inside a 362 ms pointerup task);
 *   (2) sampled every frame from the press until the column has been still
 *       for 600 ms, the picker card's travel has no JUMP: no single frame
 *       moves it more than three times as far as each of its neighbouring
 *       frames does (a 2 px floor, so a still card's sub-pixel settle is not
 *       read as one). This pass runs unthrottled, so a long frame of the
 *       throttle is not mistaken for the card's own motion.
 */
import { test, expect, type Page } from "@playwright/test";

async function settled(page: Page) {
    await page.waitForFunction(
        async () => {
            const row = document.querySelector(".pane-container");
            if (!row || row.querySelector(".vj-enter-enter-active, .vj-enter-leave-active")) return false;
            const running = row
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running" && Number.isFinite(a.effect?.getComputedTiming().endTime ?? Infinity));
            await Promise.allSettled(running.map((a) => a.finished));
            return true;
        },
        undefined,
        { timeout: 30_000 },
    );
    await page.waitForTimeout(500);
}

async function hop(page: Page, hash: string, view: string) {
    await page.evaluate((h) => (location.hash = h), hash);
    await expect(page.locator(".app-layout")).toHaveAttribute("data-view", view, { timeout: 30_000 });
    await settled(page);
}

const homeSeat = (page: Page) => page.locator(".glass-dock").getByRole("button", { name: "Home", exact: true });

/** Arms the in-page recorder; the caller presses the Home seat. */
async function armChange(page: Page) {
    await expect(homeSeat(page)).toBeVisible({ timeout: 10_000 });
    await page.evaluate(() => {
        const w = window as unknown as { __change: { press: number; answered: number; tops: number[]; done: boolean } };
        const rec = { press: -1, answered: -1, tops: [] as number[], done: false };
        w.__change = rec;
        const plateTop = () => {
            const plate = document.querySelector<HTMLElement>(".pane-wrapper--stage .picker-plate");
            return plate ? plate.getBoundingClientRect().top + window.scrollY : NaN;
        };
        document.addEventListener(
            "pointerup",
            (e) => {
                if (rec.press < 0) rec.press = e.timeStamp;
            },
            { capture: true, once: true },
        );
        let still = performance.now();
        const start = performance.now();
        const tick = (t: number) => {
            if (rec.press >= 0 && rec.answered < 0 && document.querySelector('.view-select-trigger [data-view-glyph="picker"]'))
                rec.answered = t;
            const top = plateTop();
            const prev = rec.tops[rec.tops.length - 1];
            if (prev === undefined || Math.abs(top - prev) > 0.25 || Number.isNaN(top) !== Number.isNaN(prev)) still = performance.now();
            rec.tops.push(top);
            const quiet = rec.press >= 0 && performance.now() - still > 600;
            if (quiet || performance.now() - start > 15_000) rec.done = true;
            else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

async function readChange(page: Page) {
    await page.waitForFunction(() => (window as unknown as { __change: { done: boolean } }).__change.done, undefined, {
        timeout: 30_000,
    });
    return page.evaluate(() => (window as unknown as { __change: { press: number; answered: number; tops: number[] } }).__change);
}

/** Frames whose travel is more than three times each neighbour's (LAST-TEN's JUMP), with a 2 px floor. */
function jumps(tops: number[]): string[] {
    const seen = tops.filter((t) => !Number.isNaN(t));
    const d = seen.slice(1).map((t, i) => Math.abs(t - seen[i]!));
    const out: string[] = [];
    for (let i = 0; i < d.length; i++) {
        const here = d[i]!;
        const before = d[i - 1] ?? 0;
        const after = d[i + 1] ?? 0;
        if (here > 2 && here > 3 * before && here > 3 * after) out.push(`frame ${i + 1}: ${here.toFixed(1)} px (neighbours ${before.toFixed(1)}, ${after.toFixed(1)})`);
    }
    return out;
}

test("c40 · 390: My Palettes to Home is answered within 100 ms at 4x, and the picker travels without a jump", async ({
    page,
}) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await page.locator(".pane-wrapper--stage .picker-plate").waitFor({ timeout: 60_000 });
    await settled(page);
    // warm both panes: the change measured is the revisit a reader makes
    await hop(page, "#/palettes", "palettes");
    await hop(page, "#/", "picker");
    await hop(page, "#/palettes", "palettes");

    // (1) the press is answered on its own frame, at 4x
    const cdp = await page.context().newCDPSession(page);
    await armChange(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await homeSeat(page).tap();
    const throttled = await readChange(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    await expect(page.locator(".app-layout")).toHaveAttribute("data-view", "picker", { timeout: 30_000 });
    await settled(page);
    expect(throttled.press, "the press was not seen").toBeGreaterThanOrEqual(0);
    expect(throttled.answered, "the trigger never named Home").toBeGreaterThanOrEqual(0);
    const answer = throttled.answered - throttled.press;
    test.info().annotations.push({ type: "press to first changed frame, 4x (ms)", description: answer.toFixed(1) });
    expect(answer, "press to the first frame that names Home, at 4x").toBeLessThanOrEqual(100);

    // (2) the picker's travel, unthrottled
    await hop(page, "#/palettes", "palettes");
    await armChange(page);
    await homeSeat(page).tap();
    const free = await readChange(page);
    test.info().annotations.push({ type: "picker top per frame", description: free.tops.map((t) => t.toFixed(1)).join(" ") });
    expect(jumps(free.tops), "frames where the picker card jumps").toEqual([]);
});
