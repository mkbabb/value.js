import { test, expect } from "@playwright/test";

/**
 * Under reduced motion a view change is one clean fade: the leaving card
 * fades out, then the dealt card fades in. Never a cut (both fades take
 * time) and never an overprint (the dealt card's fade starts when the
 * leaver's has ended; before, the two ran together and both titles read at
 * once). The fades run on the Web Animations API (PaneSlot), so the spec
 * reads their timing from the animations themselves, which a slow headless
 * frame clock cannot blur.
 */

type Fade = { duration: number; delay: number; from: string; to: string } | null;

for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
]) {
    test(`reduced motion: the swap is one fade with no overprint at ${viewport.width}`, async ({ page }) => {
        test.setTimeout(120_000);
        await page.setViewportSize(viewport);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/", { waitUntil: "load" });
        await page.locator(".spectrum-picker").first().waitFor({ state: "visible", timeout: 60_000 });
        // Warm the destination's chunk so the swap is the swap, not a load.
        await page.evaluate(() => (location.hash = "#/gradient"));
        await page.waitForTimeout(2500);
        await page.evaluate(() => (location.hash = "#/"));
        await page.waitForTimeout(2500);
        await page.evaluate(() => {
            const w = window as unknown as { __fades: Record<string, unknown> };
            w.__fades = {};
            const fade = (el: Element | null) => {
                const a = el?.getAnimations().find((x) => {
                    const kf = (x.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
                    return kf.length === 2 && "opacity" in kf[0]! && !(x as CSSTransition).transitionProperty;
                });
                if (!a) return null;
                const kf = (a.effect as KeyframeEffect).getKeyframes();
                const t = a.effect!.getTiming();
                return { duration: Number(t.duration), delay: Number(t.delay ?? 0), from: String(kf[0]!.opacity), to: String(kf[1]!.opacity) };
            };
            const stage = document.querySelector(".pane-wrapper--stage")!;
            const loop = () => {
                const leave = fade(stage.querySelector(":scope > .vj-enter-leave-active"));
                const enter = fade(stage.querySelector(":scope > .vj-enter-enter-active"));
                if (leave) w.__fades.leave ??= leave;
                if (enter) w.__fades.enter ??= enter;
                if (!(w.__fades.leave && w.__fades.enter)) requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
            location.hash = "#/gradient";
        });
        await page.waitForTimeout(2500);
        const { leave, enter } = await page.evaluate(
            () => (window as unknown as { __fades: { leave: Fade; enter: Fade } }).__fades,
        );
        expect(leave, "the leaving card fades").not.toBeNull();
        expect(enter, "the dealt card fades").not.toBeNull();
        expect([leave!.from, leave!.to]).toEqual(["1", "0"]);
        expect([enter!.from, enter!.to]).toEqual(["0", "1"]);
        expect(leave!.duration, "the leave is a fade, not a cut").toBeGreaterThanOrEqual(100);
        expect(enter!.duration, "the dealt card's fade is a fade, not a cut").toBeGreaterThanOrEqual(150);
        expect(enter!.delay, "the dealt card waits for the leaver to be gone").toBeGreaterThanOrEqual(
            leave!.delay + leave!.duration,
        );
    });
}
