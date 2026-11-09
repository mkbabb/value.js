// SERVED MODEL: claude-opus-5-5
import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { regionSettled } from "./fixtures/settle";
import { decodePng } from "./fixtures/frame-diff";

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
// V-D1.r4 (§0hz.mt2.value.r): the bar holds at a browser's REAL block too —
// a 1366×768 laptop shows 1366×657 inside its window (prod, before: 4.425),
// and 1280×720 is the smoke suite's own default (2.965). Where the plate's
// rows outgrow the block, the plate scrolls its own body and every control
// is reached inside it, never below the viewport.
const NAME_CELLS = [
    { name: "1440x900", width: 1440, height: 900 },
    { name: "2846x1650-eq", width: 1423, height: 825 },
    { name: "1280x800", width: 1280, height: 800 },
    { name: "1366x768", width: 1366, height: 768 },
    { name: "1536x730", width: 1536, height: 730 },
    { name: "1280x720", width: 1280, height: 720 },
    { name: "1366x657", width: 1366, height: 657 },
    { name: "1280x648", width: 1280, height: 648 },
] as const;

/** WCAG relative luminance of an 8-bit sRGB sample. */
function luminance([r, g, b]: [number, number, number]): number {
    const lin = (c: number) => {
        const v = c / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: [number, number, number], b: [number, number, number]): number {
    const [la, lb] = [luminance(a), luminance(b)];
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
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
                // Every control is reached inside the viewport: the last
                // channel's slider, brought into view, sits above the fold
                // and the document still does not scroll.
                const last = page
                    .getByRole("region", { name: "Picker", exact: true })
                    .getByRole("slider")
                    .last();
                await last.scrollIntoViewIfNeeded();
                const lastBox = (await last.boundingBox())!;
                expect(lastBox.y + lastBox.height, "the last slider's bottom").toBeLessThanOrEqual(
                    r.innerHeight + EPS,
                );
                expect(
                    await page.evaluate(() => document.documentElement.scrollHeight),
                    "docScroll after reaching the last control",
                ).toBeLessThanOrEqual(r.innerHeight + EPS);
                // and nothing the plate scrolled paints under an unveiled
                // header: the readout clears the field unless glass has
                // condensed (and veiled) the header.
                const under = await page.evaluate(() => {
                    const header = document.querySelector<HTMLElement>(".picker-header")!;
                    const readout = document.querySelector(".readout")!.getBoundingClientRect();
                    const field = document.querySelector(".spectrum-picker")!.getBoundingClientRect();
                    return {
                        condensed: header.dataset.condensed === "true",
                        overlap: Math.max(0, readout.bottom - field.top),
                    };
                });
                if (!under.condensed) {
                    expect(under.overlap, "the readout over the field, unveiled").toBeLessThanOrEqual(EPS);
                }
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

            // V-D1.r4 (§0hz.mt2.value.r) — the gloss is dismissible (WCAG
            // 1.4.13): Escape closes it however it opened and it stays closed
            // while focus rests (the hover arm's focus timer re-opened it,
            // prod ×2); the badge's focus ring is whole ink at the 3:1
            // graphics floor against the plate it sits on; and the badge is
            // the tuple's mark, not a word of the readout heading.
            test("the gloss dismisses on Escape; the ring is whole; the heading is the tuple", async ({
                page,
            }) => {
                if (vp.height >= 820) return;
                await seedName(page);
                await page.goto("/#/");
                expect(await nameSurface(page)).toBe("badge");
                await regionSettled(page.getByRole("region", { name: "Picker", exact: true }));
                const badge = page.getByTestId("picker-color-badge");
                const gloss = page.getByTestId("picker-color-gloss");
                // hover, then Escape
                await badge.hover();
                await expect(gloss).toHaveText(NAME);
                await page.keyboard.press("Escape");
                await expect.soft(gloss, "Escape closes the hovered gloss").toBeHidden();
                await page.mouse.move(2, vp.height - 2);
                await expect(gloss).toBeHidden();
                // keyboard focus, then Escape at once — and it stays closed
                await page.getByRole("textbox", { name: /component value/ }).last().focus();
                await page.keyboard.press("Tab");
                await expect(badge).toBeFocused();
                await expect(gloss).toHaveText(NAME);
                await page.keyboard.press("Escape");
                await page.waitForTimeout(1_000);
                await expect.soft(gloss, "the gloss stays dismissed while focus rests").toBeHidden();
                await expect(badge).toBeFocused();
                // the ring: sample its middle row against the plate beyond it
                const ring = await badge.evaluate((el) => {
                    const cs = getComputedStyle(el);
                    return {
                        width: Number.parseFloat(cs.outlineWidth),
                        offset: Number.parseFloat(cs.outlineOffset),
                        style: cs.outlineStyle,
                    };
                });
                expect.soft(ring.style, "the focus ring is a solid outline").toBe("solid");
                const box = (await badge.boundingBox())!;
                const pad = Math.ceil(ring.offset + ring.width + 6);
                const clip = {
                    x: Math.floor(box.x - pad),
                    y: Math.floor(box.y - pad),
                    width: Math.ceil(box.width + 2 * pad),
                    height: Math.ceil(box.height + 2 * pad),
                };
                const img = decodePng(await page.screenshot({ clip }));
                const at = (x: number, y: number) => {
                    const i = (Math.round(y) * img.width + Math.round(x)) * img.channels;
                    return [img.data[i] ?? 0, img.data[i + 1] ?? 0, img.data[i + 2] ?? 0] as [number, number, number];
                };
                const cx = box.x + box.width / 2 - clip.x;
                const cy = box.y + box.height / 2 - clip.y;
                const mid = box.width / 2 + ring.offset + ring.width / 2;
                const beyond = box.width / 2 + ring.offset + ring.width + 3;
                const ratios = [
                    contrast(at(cx, cy - mid), at(cx, cy - beyond)),
                    contrast(at(cx + mid, cy), at(cx + beyond, cy)),
                ];
                console.log(`[vd1r4-ring] ${vp.name} ring=${JSON.stringify(ring)} contrast=${ratios.map((c) => c.toFixed(2))}`);
                expect.soft(Math.min(...ratios), "the ring against the plate").toBeGreaterThanOrEqual(3);
                // the heading's name is the tuple alone
                await expect(page.locator(".readout")).toHaveAccessibleName("73.0 % 0.2 2.0 deg");
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
