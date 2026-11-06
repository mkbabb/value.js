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
        // The Picker region's first child is its card. Since X-W12U .k2
        // (A2-VA-L1-1, `ca65ae049`) About composes PaneShell: the region's
        // first child is the `.pane-shell` wrapper (overflow visible) and the
        // CARD is its `.pane-shell__card` (overflow-hidden, PaneShell.vue:33)
        // — re-baselined X-W12U .q2.
        const paneOf = (label: string, selector: string): HTMLElement => {
            const region = document.querySelector(
                `main [role="region"][aria-label="${label}"]`,
            );
            const pane = region?.querySelector<HTMLElement>(selector) ?? null;
            if (!pane) throw new Error(`the ${label} region renders no pane`);
            return pane;
        };
        const picker = paneOf("Picker", ":scope > *");
        const about = paneOf("About", ":scope > .pane-shell > .pane-shell__card");
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
    // The About region mounts its loading plate first; wait for the pane
    // itself, or a settled plate is read as the pane (seen at a cold start).
    await expect(page.locator(".about-card")).toBeVisible({ timeout: 60_000 });
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

// V-D1.r2 + V-D1.r3 (delegate ruling R-1, 2026-11-06) — the page fits AND the
// spectrum keeps its shape with the colour's NAME present. Prod renders the
// approved name of the default colour ("Efflorescence"); dev and CI have no
// API, so the approved list is served here, seeded with the default colour.
// At 1366×768 the standing name line cost the plane its aspect (2.797 > 2.5:
// 593 px of inline over 212 px of block); the ruling holds the bar and moves
// the name, below 820 px of block, into the colour badge's glass popover.
// Per cell: docScroll ≤ viewport, 1.6 ≤ w/h ≤ 2.5, and the name is reachable —
// standing, or by hover, by keyboard focus and by tap.
const NAME_CELLS = [
    { name: "1440x900", width: 1440, height: 900 },
    { name: "2846x1650-eq", width: 1423, height: 825 },
    { name: "1280x800", width: 1280, height: 800 },
    { name: "1366x768", width: 1366, height: 768 },
] as const;
const NAME = "Efflorescence";

async function seedName(page: Page) {
    await page.route("**/colors/approved**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [
                    {
                        id: "vd1r2-seed",
                        name: NAME,
                        css: "oklch(73% 0.185 2)",
                        status: "approved",
                        createdAt: "2026-11-05T00:00:00.000Z",
                        approvedAt: "2026-11-05T00:00:00.000Z",
                    },
                ],
            }),
        }),
    );
}

/** The name's surface once the approved list landed: its line, or its badge. */
async function nameSurface(page: Page): Promise<"line" | "badge"> {
    const line = page.getByTestId("picker-color-name");
    const badge = page.getByTestId("picker-color-badge");
    await expect(line.or(badge)).toBeVisible({ timeout: 60_000 });
    return (await badge.isVisible()) ? "badge" : "line";
}

test.describe("V-D1.r3 · the name and the spectrum share a short block", () => {
    for (const vp of NAME_CELLS) {
        test.describe(vp.name, () => {
            test.use({ viewport: { width: vp.width, height: vp.height }, colorScheme: "dark" });

            test("fits, keeps the aspect, and the name is reachable by hover and focus", async ({ page }) => {
                await seedName(page);
                await page.goto("/#/");
                const surface = await nameSurface(page);
                const r = await readSettled(page);
                const plane = await page.evaluate(() => {
                    const el = document.querySelector<HTMLElement>(".spectrum-picker")!;
                    return { w: el.offsetWidth, h: el.offsetHeight };
                });
                console.log(
                    `[vd1r3] ${vp.name} surface=${surface} docScroll=${r.docScroll} inner=${r.innerHeight} plane=${plane.w}x${plane.h} aspect=${(plane.w / plane.h).toFixed(3)}`,
                );
                expect(r.docScroll, `docScroll ${r.docScroll} vs viewport ${r.innerHeight}`).toBeLessThanOrEqual(
                    r.innerHeight + EPS,
                );
                expect(plane.w / plane.h, `spectrum w/h ${plane.w}×${plane.h}`).toBeGreaterThanOrEqual(1.6);
                expect(plane.w / plane.h, `spectrum w/h ${plane.w}×${plane.h}`).toBeLessThanOrEqual(2.5);
                // Below 820 px of block the line yields; at and above it stands.
                expect(surface, "the name's surface").toBe(vp.height < 820 ? "badge" : "line");
                if (surface === "line") {
                    await expect(page.getByTestId("picker-color-name")).toHaveText(NAME, { ignoreCase: true });
                    return;
                }
                const badge = page.getByTestId("picker-color-badge");
                const gloss = page.getByTestId("picker-color-gloss");
                await expect(badge).toHaveAccessibleName(`Colour name: ${NAME}`);
                // hover
                await badge.hover();
                await expect(gloss).toHaveText(NAME);
                const out = process.env.W12_ABOUT_OUT;
                if (out) {
                    mkdirSync(out, { recursive: true });
                    await gloss.evaluate((el) =>
                        Promise.all(
                            (el.closest("[data-slot]") ?? el)
                                .getAnimations({ subtree: true })
                                .map((a) => a.finished),
                        ),
                    );
                    await page.screenshot({ path: `${out}/name-gloss-${vp.name}.png` });
                }
                await page.mouse.move(2, vp.height - 2);
                await expect(gloss).toBeHidden();
                // keyboard focus: Tab onto the badge from the cell before it
                await page.getByRole("textbox", { name: /component value/ }).last().focus();
                await page.keyboard.press("Tab");
                await expect(badge).toBeFocused();
                await expect(gloss).toHaveText(NAME);
                await page.keyboard.press("Shift+Tab");
                await expect(gloss).toBeHidden();
            });

            test("the name is reachable by tap", async ({ browser }) => {
                const ctx = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    hasTouch: true,
                    colorScheme: "dark",
                });
                try {
                    const page = await ctx.newPage();
                    await seedName(page);
                    await page.goto("/#/");
                    const surface = await nameSurface(page);
                    expect(surface, "the name's surface").toBe(vp.height < 820 ? "badge" : "line");
                    if (surface === "line") return;
                    await regionSettled(page.getByRole("region", { name: "Picker", exact: true }));
                    const coarse = await page.evaluate(() => matchMedia("(pointer: coarse)").matches);
                    expect(coarse, "the touch context is a coarse pointer").toBe(true);
                    await page.getByTestId("picker-color-badge").tap();
                    await expect(page.getByTestId("picker-color-gloss")).toHaveText(NAME);
                } finally {
                    await ctx.close();
                }
            });
        });
    }
});
