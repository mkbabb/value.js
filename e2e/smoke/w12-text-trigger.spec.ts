// SERVED MODEL: claude-opus-5-5
import { test, expect, type Locator, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { regionSettled } from "./fixtures/settle";

/**
 * X.W12.t · OA-54 — THE LARGE COLOUR-SPACE DROPDOWN IS TEXT.
 *
 * The owner (2026-09-23, frame `audit/owner-2026-09-23-colorspace-dropdown.png`):
 * "too gray, and the large dropdowns should not be so rounded. Perhaps for
 * these, the large color space dropdowns, it should just be text, too."
 *
 * The census (X-W12 record, `### X.W12.t`) found ONE large display-type
 * dropdown trigger — `ColorSpaceSelector` — in two hosts: the Picker card's
 * title and the About pane's heading sentence. Both are read here.
 *
 *   npx playwright test e2e/smoke/w12-text-trigger.spec.ts --project=smoke --headed
 *
 * WHAT IS ASSERTED, at 1440×900 and 390×844, light and dark:
 *   (1) PAINT-FREE at rest, on hover and while open: no background colour or
 *       image, no border, no painted box-shadow, no backdrop filter — so no
 *       plate and no stadium can show, whatever the corner computes to;
 *   (2) the only surface is the keyboard FOCUS RING: `:focus-visible` paints a
 *       box-shadow, and its corner is `--radius-field` (never the pill);
 *   (3) the caret draws at full ink (`--select-chevron-opacity: 1`);
 *   (4) the menu OPENS and SELECTS by keyboard (Enter, ArrowDown, Enter) and
 *       by pointer (click, click an option).
 * Frames of rest / hover / focus / open are written to W12_TEXT_TRIGGER_OUT
 * when it is set.
 */

const OUT = process.env.W12_TEXT_TRIGGER_OUT;

/**
 * X-W12 Repair 2 (H-2′): the §0ci gate is read in HEADED Chromium, the eye's
 * frame — the §0ax D1 real-GPU cell (`W12_REAL_GPU=1 … --headed`, the same
 * seam as `w12-drag.spec.ts`). MEASURED 2026-09-24 (load 53–154): under the
 * smoke project's SwiftShader launch the page composites at 4–8 fps and the
 * listbox's exit animation (`glass-reveal-out`) sits PENDING at currentTime 0
 * for 3–5 s after `data-state="closed"` (it waits on the compositor for its
 * start time), so reka's Presence unmounts past the 8 s expect; on the real
 * GPU the same close unmounts in < 0.8 s, 3 legs of 3. The SwiftShader
 * reading stays the default run and is banked beside.
 */
if (process.env.W12_REAL_GPU === "1") test.use({ launchOptions: { args: [] }, headless: false });

const VIEWPORTS = [
    { name: "1440", width: 1440, height: 900 },
    { name: "390", width: 390, height: 844 },
] as const;
const THEMES = ["light", "dark"] as const;
const HOSTS = [
    { name: "picker", selector: ".title-row [data-slot=select-trigger]" },
    { name: "about", selector: ".space-trigger--inline" },
] as const;

interface Paint {
    bg: string;
    bgImage: string;
    borderWidth: number;
    shadow: string;
    backdrop: string;
    radius: string;
}

function readPaint(trigger: Locator): Promise<Paint> {
    return trigger.evaluate((el) => {
        const s = getComputedStyle(el);
        return {
            bg: s.backgroundColor,
            bgImage: s.backgroundImage,
            borderWidth:
                parseFloat(s.borderTopWidth) +
                parseFloat(s.borderRightWidth) +
                parseFloat(s.borderBottomWidth) +
                parseFloat(s.borderLeftWidth),
            shadow: s.boxShadow,
            backdrop: s.backdropFilter,
            radius: s.borderTopLeftRadius,
        };
    });
}

/** true when every colour in a computed box-shadow list is fully transparent */
function shadowPaintsNothing(shadow: string): boolean {
    if (shadow === "none") return true;
    const colours = shadow.match(/rgba?\([^)]*\)|color\([^)]*\)|oklch\([^)]*\)/g) ?? [];
    return colours.every((c) => /(,\s*0\)|\/\s*0\)|rgba\(0, 0, 0, 0\))$/.test(c));
}

function expectPaintFree(p: Paint, state: string): void {
    expect(p.bg, `${state}: background colour`).toBe("rgba(0, 0, 0, 0)");
    expect(p.bgImage, `${state}: background image`).toBe("none");
    expect(p.borderWidth, `${state}: border`).toBe(0);
    expect(shadowPaintsNothing(p.shadow), `${state}: box-shadow ${p.shadow}`).toBe(true);
    expect(p.backdrop, `${state}: backdrop filter`).toBe("none");
}

async function frame(page: Page, trigger: Locator, tag: string): Promise<void> {
    if (!OUT) return;
    mkdirSync(OUT, { recursive: true });
    const b = await trigger.boundingBox();
    if (!b) return;
    await page.screenshot({
        path: `${OUT}/${tag}.png`,
        clip: {
            x: Math.max(0, b.x - 24),
            y: Math.max(0, b.y - 24),
            width: b.width + 48,
            height: b.height + 48,
        },
    });
}

async function label(trigger: Locator): Promise<string> {
    return (await trigger.innerText()).trim();
}

test.describe("X.W12.t · the large colour-space dropdown is a text trigger", () => {
    for (const vp of VIEWPORTS) {
        for (const theme of THEMES) {
            test.describe(`${vp.name} ${theme}`, () => {
                test.use({
                    viewport: { width: vp.width, height: vp.height },
                    colorScheme: theme,
                });

                for (const host of HOSTS) {
                    test(`${host.name}: paint-free, glass focus ring on --radius-field, opens + selects by keyboard and pointer`, async ({
                        page,
                    }) => {
                        test.setTimeout(60_000);
                        await page.addInitScript(
                            (t) => localStorage.setItem("vueuse-color-scheme", t),
                            theme,
                        );
                        await page.goto("/#/");
                        const trigger = page.locator(host.selector).first();
                        await trigger.waitFor({ state: "visible", timeout: 20_000 });
                        await regionSettled(trigger);
                        await trigger.scrollIntoViewIfNeeded();
                        const tag = `${vp.name}-${theme}-${host.name}`;

                        // (1) rest
                        expectPaintFree(await readPaint(trigger), "rest");
                        await frame(page, trigger, `${tag}-rest`);

                        // (3) the caret at full ink
                        const caretOpacity = await trigger
                            .locator("svg")
                            .first()
                            .evaluate((svg) => getComputedStyle(svg).opacity);
                        expect(caretOpacity, "caret opacity").toBe("1");

                        // (1) hover
                        await trigger.hover();
                        await page.waitForTimeout(350);
                        expectPaintFree(await readPaint(trigger), "hover");
                        await frame(page, trigger, `${tag}-hover`);
                        await page.mouse.move(1, 1);

                        // (2) keyboard focus: the ring is glass's, on the field corner
                        await page.keyboard.press("Tab");
                        await trigger.focus();
                        await page.waitForTimeout(250);
                        const focus = await trigger.evaluate((el) => {
                            const s = getComputedStyle(el);
                            const probe = document.createElement("div");
                            probe.style.borderRadius = "var(--radius-field)";
                            el.parentElement!.appendChild(probe);
                            const field = getComputedStyle(probe).borderTopLeftRadius;
                            probe.remove();
                            return {
                                visible: el.matches(":focus-visible"),
                                shadow: s.boxShadow,
                                radius: s.borderTopLeftRadius,
                                field,
                            };
                        });
                        expect(focus.visible, "focus-visible").toBe(true);
                        expect(shadowPaintsNothing(focus.shadow), `focus ring ${focus.shadow}`).toBe(false);
                        expect(focus.radius, "focus ring corner = --radius-field").toBe(focus.field);
                        expect(parseFloat(focus.field)).toBeLessThan(9999);
                        await frame(page, trigger, `${tag}-focus`);

                        // (4) keyboard: Enter opens, ArrowDown moves, Enter selects
                        const kbBefore = await label(trigger);
                        await page.keyboard.press("Enter");
                        const listbox = page.getByRole("listbox");
                        await expect(listbox).toBeVisible();
                        await expect(trigger).toHaveAttribute("data-state", "open");
                        await page.waitForTimeout(400);
                        expectPaintFree(await readPaint(trigger), "open");
                        await frame(page, trigger, `${tag}-open`);
                        // X-W12 Repair 1 (H-4 · TT-KBD-ABOUT): each key waits for
                        // the state its predecessor produced, as a user reads the
                        // highlight before pressing the next key. reka moves option
                        // focus in a deferred task (`SelectContentImpl` handleKeyDown
                        // → `setTimeout(focusFirst)`); under SwiftShader that task
                        // was measured landing AFTER a fixed-200 ms Enter (probe:
                        // ArrowDown 8827 ms · Enter on option lab 9236 · focus
                        // option lch 10329), so Enter re-selected the open value.
                        const focusedOption = page.locator("[role=option]:focus");
                        await expect(focusedOption).toHaveCount(1);
                        const openedOn = await focusedOption.getAttribute("data-space");
                        await page.keyboard.press("ArrowDown");
                        await expect(focusedOption).not.toHaveAttribute("data-space", openedOn ?? "");
                        await page.keyboard.press("Enter");
                        await expect(listbox).toBeHidden();
                        await expect.poll(() => label(trigger)).not.toBe(kbBefore);

                        // (4) pointer: click opens, click an option selects
                        const ptrBefore = await label(trigger);
                        await trigger.click();
                        await expect(listbox).toBeVisible();
                        const target = ptrBefore === "OKLCh" ? "oklab" : "oklch";
                        await page.locator(`[role=option][data-space="${target}"]`).click();
                        await expect(listbox).toBeHidden();
                        await expect.poll(() => label(trigger)).not.toBe(ptrBefore);
                    });
                }
            });
        }
    }
});
