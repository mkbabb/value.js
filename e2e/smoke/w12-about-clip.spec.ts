// SERVED MODEL: claude-opus-5-5
import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { regionSettled } from "./fixtures/settle";

/**
 * X.W12.c · OA-5 / OA-21 — THE ABOUT PANE IS THE PICKER PANE'S HEIGHT, AND IT
 * SCROLLS INSIDE ITS OWN CARD.
 *
 * The owner's docket (2026-09-22): "the right side about the spaces is far
 * too long and not clipped"; (2026-09-23, frame 2): "the about the color
 * spaces is too long and does not clip properly to be the same size as the
 * left pane". Measured at the wave's open (1440×900, dark): the About card
 * was 7458.8 px tall and the document 7585 px against a 900 px viewport. The
 * row grew to the About pane's content, so the Picker card was stretched to
 * match it and the page scrolled.
 *
 *   npx playwright test e2e/smoke/w12-about-clip.spec.ts --project=smoke
 *
 * WHAT IS ASSERTED, per viewport (1440×900 · 1280×800 · the owner's
 * 2846×1650 retina frame = 1423×825 CSS px at DPR 2):
 *   (1) the About pane's outermost box is the Picker pane's height, ±1 px;
 *   (2) the document does not overflow the viewport on the block axis (its
 *       own test, below);
 *   (3) the body scrolls INSIDE the card on glass's scroll primitive
 *       (`FadingScroll`, `.fading-scroll--y`), and the card clips it:
 *       the card's overflow is clipped, its corner radius is > 0, and the
 *       scroller really overflows (scrollHeight > clientHeight) and scrolls;
 *   (4) a screenshot of the card, scrolled into the body, is written to
 *       W12_ABOUT_OUT (when set) — the radius-clipped frame.
 *
 * Settled readings only: each region is read after `regionSettled`, and the
 * heights are re-read until two readings 250 ms apart agree.
 */

const EPS = 1;

const VIEWPORTS = [
    { name: "1440x900", width: 1440, height: 900, dpr: 1 },
    { name: "1280x800", width: 1280, height: 800, dpr: 1 },
    { name: "2846x1650-eq", width: 1423, height: 825, dpr: 2 },
] as const;

interface Reading {
    picker: number;
    about: number;
    docScroll: number;
    innerHeight: number;
    /** the scroll primitive inside the About card, or null */
    scroller: {
        glass: boolean;
        clientHeight: number;
        scrollHeight: number;
        insideCard: boolean;
    } | null;
    card: { overflow: string; radius: number };
}

async function readOnce(page: Page): Promise<Reading> {
    return page.evaluate(() => {
        const paneOf = (label: string): HTMLElement => {
            const region = document.querySelector(
                `main [role="region"][aria-label="${label}"]`,
            );
            const pane = region?.firstElementChild as HTMLElement | null;
            if (!pane) throw new Error(`the ${label} region renders no pane`);
            return pane;
        };
        const picker = paneOf("Picker");
        const about = paneOf("About");
        const cs = getComputedStyle(about);
        const scrollerEl = about.querySelector<HTMLElement>(".fading-scroll--y");
        return {
            picker: picker.getBoundingClientRect().height,
            about: about.getBoundingClientRect().height,
            docScroll: document.documentElement.scrollHeight,
            innerHeight: window.innerHeight,
            scroller: scrollerEl
                ? {
                      glass: getComputedStyle(scrollerEl).overflowY === "auto",
                      clientHeight: scrollerEl.clientHeight,
                      scrollHeight: scrollerEl.scrollHeight,
                      insideCard: about.contains(scrollerEl) && scrollerEl !== about,
                  }
                : null,
            card: {
                overflow: `${cs.overflowX} ${cs.overflowY}`,
                radius: Number.parseFloat(cs.borderTopLeftRadius),
            },
        };
    });
}

async function readSettled(page: Page): Promise<Reading> {
    await regionSettled(page.getByRole("region", { name: "Picker", exact: true }));
    await regionSettled(page.getByRole("region", { name: "About", exact: true }));
    let previous: Reading | null = null;
    for (let attempt = 0; attempt < 40; attempt++) {
        const now = await readOnce(page);
        if (
            previous &&
            Math.abs(previous.picker - now.picker) < 0.5 &&
            Math.abs(previous.about - now.about) < 0.5
        )
            return now;
        previous = now;
        await page.waitForTimeout(250);
    }
    throw new Error("the Picker/About row never settled");
}

test.describe("X.W12.c · the About pane is the Picker pane's height", () => {
    for (const vp of VIEWPORTS) {
        test.describe(vp.name, () => {
            test.use({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: vp.dpr,
                colorScheme: "dark",
            });

            test(`About == Picker ±${EPS}px, radius-clipped scroller`, async ({
                page,
            }, testInfo) => {
                await page.goto("/#/");
                const r = await readSettled(page);
                testInfo.annotations.push({
                    type: "reading",
                    description: JSON.stringify(r),
                });
                console.log(`[w12-about-clip] ${vp.name} ${JSON.stringify(r)}`);

                // (1) one row height: the About pane is the Picker pane's height.
                expect(
                    Math.abs(r.about - r.picker),
                    `About pane ${r.about}px vs Picker pane ${r.picker}px`,
                ).toBeLessThanOrEqual(EPS);

                // (3) the body scrolls inside the card, on glass's primitive,
                //     and the card's radius clips it.
                expect(
                    r.scroller,
                    "a glass FadingScroll (y) inside the About card",
                ).not.toBeNull();
                const s = r.scroller!;
                expect(s.insideCard, "the scroller is a descendant of the card").toBe(
                    true,
                );
                expect(
                    s.glass,
                    "the scroller is glass's `.fading-scroll--y` (overflow-y auto)",
                ).toBe(true);
                expect(
                    s.scrollHeight,
                    `the body overflows its scroller (${s.scrollHeight} > ${s.clientHeight})`,
                ).toBeGreaterThan(s.clientHeight);
                expect(r.card.overflow, "the card clips its scroller").toMatch(
                    /^(hidden|clip) (hidden|clip)$/,
                );
                expect(r.card.radius, "the card has a corner radius").toBeGreaterThan(
                    0,
                );

                const scroller = page.locator(".about-card .fading-scroll--y");
                await scroller.evaluate((el) => {
                    el.scrollTop = Math.round((el.scrollHeight - el.clientHeight) / 2);
                });
                await expect
                    .poll(() => scroller.evaluate((el) => el.scrollTop))
                    .toBeGreaterThan(0);
                // the page itself did not move: the scroll stayed inside the card.
                expect(await page.evaluate(() => window.scrollY)).toBe(0);

                // (4) the radius-clipped frame.
                const out = process.env.W12_ABOUT_OUT;
                if (out) {
                    mkdirSync(out, { recursive: true });
                    await page.locator(".about-card").screenshot({
                        path: `${out}/about-clip-${vp.name}.png`,
                        animations: "disabled",
                    });
                    await page.screenshot({ path: `${out}/page-${vp.name}.png` });
                }
            });

            // (2) no page overflow on the block axis. Its own test, so that a
            // reading the About pane does not drive is not read as the About
            // pane's: at 1280×800 the Picker pane ALONE (683 px) plus the
            // shell's chrome (126 px) is 809 px, measured on the cured bytes
            // (X.W12.c receipt) — the Picker card's own dead band (UIA-V-61) is
            // X.W12.d's, and this test is its born-RED reading at that size.
            test("no page overflow on the block axis", async ({ page }) => {
                await page.goto("/#/");
                const r = await readSettled(page);
                console.log(
                    `[w12-about-clip] ${vp.name} overflow docScroll=${r.docScroll} inner=${r.innerHeight} picker=${r.picker} about=${r.about}`,
                );
                expect(
                    r.docScroll,
                    `document scrollHeight ${r.docScroll} vs viewport ${r.innerHeight} ` +
                        `(Picker pane ${r.picker}px, About pane ${r.about}px)`,
                ).toBeLessThanOrEqual(r.innerHeight + EPS);
            });
        });
    }
});
