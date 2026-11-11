import { test, expect, type Page } from "@playwright/test";

/**
 * o1109c — THE DOCK BAND STAYS CLEAR THROUGH THE WHOLE SWAP (T-31's law, read
 * across the gesture instead of at one wall-clock instant).
 *
 * T-31 samples the band 400 ms after a view change. That instant lands
 * wherever a loaded runner puts it, so it read GREEN on one tree and RED on
 * the next (o1109 integrate, 390 light: a Palettes header under the band).
 * The cause is the region FLIP: at 390 a hop that reorders the stacked
 * regions moves the inspector ~600 px up, and a spring that overshoots by a
 * few percent carries the region ~24 px past its rest, into the dock band.
 *
 * This probe removes the clock. After each hop it pauses every
 * document-timeline animation of the shell at the swap's first frame, seeks
 * them together from 0 to 700 ms in 20 ms steps, and at every step
 * grid-samples the band with `elementFromPoint` (T-31's own reading). Any pane
 * surface there is a fault, and so is a swap it failed to catch.
 * Two causes were found and cured: the region FLIP's overshoot (stacked
 * widths) and the flung card's 3deg turn lifting a top corner (1440).
 * Reduced motion: the hop is a cut, so the band is read once at rest.
 */

const WIDTHS = [
    [360, 800],
    [390, 844],
    [430, 932],
    [820, 1180],
    [1440, 900],
] as const;
const HOPS = ["/palettes", "/mix", "/browse", "/"] as const;

async function sweepHop(page: Page, hash: string, moving: boolean): Promise<string[]> {
    // The shell's document-timeline animations (the dock's own are not the
    // scene's), paused the moment the riser carries its enter-to class: the
    // pause happens inside the poll itself, so a loaded runner that delays the
    // next frame by seconds cannot let the gesture finish unread. By then the
    // FLIP's translate is written too (flipRegions runs at Vue's nextTick).
    await page.evaluate(() => {
        (window as unknown as { __o1109cPaused?: Animation[] | undefined }).__o1109cPaused = undefined;
    });
    await page.evaluate((h) => (location.hash = `#${h}`), hash);
    await page
        .waitForFunction(
            () => {
                if (document.querySelector(".pane-wrapper > .vj-enter-enter-to") === null) return false;
                const shell = document.querySelector(".app-layout") ?? document.body;
                const anims = document.getAnimations().filter((a) => {
                    const t = (a.effect as KeyframeEffect | null)?.target;
                    return a.timeline === document.timeline && t instanceof Element && shell.contains(t) && !t.closest("nav");
                });
                anims.forEach((a) => a.pause());
                (window as unknown as { __o1109cPaused?: Animation[] | undefined }).__o1109cPaused = anims;
                return true;
            },
            null,
            { polling: "raf", timeout: 20_000 },
        )
        .catch(() => undefined);
    return page.evaluate((moving) => {
        const anims = (window as unknown as { __o1109cPaused?: Animation[] | undefined }).__o1109cPaused;
        if (moving && (anims === undefined || !anims.some((a) => ((a.effect as KeyframeEffect).target as Element).matches(".pane-wrapper > *"))))
            return ["the swap was not captured (no card animation paused)"];
        const nav = document.querySelector('nav[aria-label="Application navigation"]');
        if (!nav) return ["NO NAV BAND FOUND"];
        const r = nav.getBoundingClientRect();
        const faults: string[] = [];
        for (let t = 0; t <= 700; t += 20) {
            (anims ?? []).forEach((a) => (a.currentTime = t));
            for (let i = 0; i < 20; i++)
                for (let j = 0; j < 5; j++) {
                    const x = r.left + ((i + 0.5) / 20) * r.width;
                    const y = r.top + ((j + 0.5) / 5) * r.height;
                    const el = document.elementFromPoint(x, y);
                    if (el?.closest(".pane-container, .pane-wrapper, .pane-main"))
                        faults.push(`t=${t} ${x.toFixed(0)},${y.toFixed(0)} → ${String(el.getAttribute("class")).slice(0, 48)}`);
                }
            if (!moving) break;
        }
        (anims ?? []).forEach((a) => a.play());
        return faults;
    }, moving);
}

for (const [w, h] of WIDTHS) {
    for (const scheme of ["light", "dark"] as const) {
        test(`o1109c region band · ${w} ${scheme}: no pane crosses the dock band at any instant of a swap`, async ({
            page,
        }) => {
            test.setTimeout(180_000);
            await page.setViewportSize({ width: w, height: h });
            await page.emulateMedia({ colorScheme: scheme });
            await page.goto("/#/", { timeout: 60_000 });
            await page.waitForSelector(".glass-dock");
            await page.evaluate((s) => document.documentElement.classList.toggle("dark", s === "dark"), scheme);
            await page.waitForTimeout(1500);
            const all: string[] = [];
            for (const hop of HOPS) {
                const f = await sweepHop(page, hop, true);
                if (f.length) all.push(`${hop}: ${f.length} hits, first ${f[0]}`);
                await page.waitForTimeout(900);
            }
            expect(all, `${w} ${scheme}`).toEqual([]);
        });
    }
}

test("o1109c region band · reduced motion 390: the cut leaves the band clear", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#/", { timeout: 60_000 });
    await page.waitForSelector(".glass-dock");
    await page.waitForTimeout(1500);
    const all: string[] = [];
    for (const hop of HOPS) {
        const f = await sweepHop(page, hop, false);
        if (f.length) all.push(`${hop}: ${f.length} hits, first ${f[0]}`);
        await page.waitForTimeout(400);
    }
    expect(all).toEqual([]);
});
