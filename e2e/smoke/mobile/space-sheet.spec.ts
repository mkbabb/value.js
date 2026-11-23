import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * The colour-space list on a phone is glass's sheet: it spans the screen.
 * Before, the anchored list's width cap also bound the sheet form, and the
 * sheet stood 358 of 390 px.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

const SHEET = '[data-slot="select-content"][data-form="sheet"]';

async function boot(page: Page, url = "/"): Promise<Locator> {
    await page.goto(url, { waitUntil: "load" });
    const trigger = page.getByLabel("Select color space").first();
    await trigger.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1500);
    return trigger;
}

async function settled(sheet: Locator): Promise<void> {
    await sheet.waitFor({ state: "visible" });
    // The open's own animations: not a loop, and not the list's scroll-driven
    // edge fades (a ScrollTimeline's animation finishes only at the scroll's end).
    await sheet.evaluate((el) =>
        Promise.allSettled(
            el
                .getAnimations({ subtree: true })
                .filter((a) => a.timeline === document.timeline && a.effect?.getComputedTiming().endTime !== Infinity)
                .map((a) => a.finished),
        ),
    );
}

test("the colour-space sheet is the screen's width", async ({ page }) => {
    const trigger = await boot(page);
    await trigger.tap();
    const sheet = page.locator(SHEET).first();
    await settled(sheet);
    const r = (await sheet.boundingBox())!;
    const vw = await page.evaluate(() => document.documentElement.clientWidth);
    expect(Math.abs(r.width - vw), `the sheet is ${r.width} px of ${vw}`).toBeLessThanOrEqual(1);
    expect(Math.abs(r.x), "the sheet starts at the screen's edge").toBeLessThanOrEqual(1);
});

/** Every visible line of text in `el` set under `floor` px. */
async function textUnder(el: Locator, floor: number): Promise<string[]> {
    return el.evaluate((root, floor) => {
        const out: string[] = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const text = n.textContent?.trim() ?? "";
            const parent = n.parentElement;
            if (!text || !parent) continue;
            const r = parent.getBoundingClientRect();
            const cs = getComputedStyle(parent);
            if (r.width <= 1 || r.height <= 1 || cs.visibility === "hidden") continue;
            const size = parseFloat(cs.fontSize);
            if (size < floor) out.push(`"${text.slice(0, 32)}" at ${size.toFixed(1)} px`);
        }
        return out;
    }, floor);
}

test("no text in the colour-space sheet is under 14 px", async ({ page }) => {
    const trigger = await boot(page);
    await trigger.tap();
    const sheet = page.locator(SHEET).first();
    await settled(sheet);
    await expect(sheet.locator(".specimen-caption").first()).toBeVisible();
    expect(await textUnder(sheet, 13.95)).toEqual([]);
});

test("no text in Mix's interpolation sheets is under 14 px", async ({ page }) => {
    await page.goto("/#/mix", { waitUntil: "load" });
    for (const name of ["Color space", "Hue method"]) {
        const trigger = page.getByRole("combobox", { name, exact: true }).first();
        await trigger.waitFor({ state: "visible", timeout: 60_000 });
        await trigger.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        await trigger.tap();
        const sheet = page.locator(SHEET).first();
        await settled(sheet);
        expect(await textUnder(sheet, 13.95), `${name}'s sheet`).toEqual([]);
        await page.keyboard.press("Escape");
        await sheet.waitFor({ state: "detached" }).catch(() => {});
        await page.waitForTimeout(600);
    }
});

interface InkRow {
    line: string;
    ink: string;
    ground: string;
    ratio: number;
}

/**
 * Each space name and specimen line in `sheet` against the ground it is drawn
 * on: the ancestors' backgrounds composited over the page's published ambient
 * (`--ink-ambient-l`, the referent the boot certified its inks on), the ink
 * taken through its colour alpha and the opacity chain. WCAG 2.x ratio.
 */
async function inkCensus(sheet: Locator): Promise<InkRow[]> {
    return sheet.evaluate((root) => {
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const ctx = cv.getContext("2d")!;
        const resolve = (css: string): [number, number, number, number] => {
            const draw = (ground: string) => {
                ctx.fillStyle = ground;
                ctx.fillRect(0, 0, 1, 1);
                ctx.fillStyle = "#000";
                ctx.fillStyle = css;
                ctx.fillRect(0, 0, 1, 1);
                return ctx.getImageData(0, 0, 1, 1).data;
            };
            const [r0 = 0, g0 = 0, b0 = 0] = draw("#000");
            const [r1 = 0] = draw("#fff");
            const a = 1 - (r1 - r0) / 255;
            return a <= 0 ? [0, 0, 0, 0] : [r0 / a, g0 / a, b0 / a, a];
        };
        const over = (top: [number, number, number, number], under: [number, number, number]) =>
            [0, 1, 2].map((i) => top[3] * top[i]! + (1 - top[3]) * under[i]!) as [number, number, number];
        const lum = (c: [number, number, number]) =>
            c
                .map((v) => v / 255)
                .map((s) => (s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4))
                .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i]!, 0);
        const ambientL = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ink-ambient-l"));
        const page = resolve(`oklch(${Number.isFinite(ambientL) ? ambientL : 0.5} 0 0)`);
        const rgb = (c: number[]) => `rgb(${c.map(Math.round).join(" ")})`;
        return Array.from(root.querySelectorAll<HTMLElement>(".specimen-name, .specimen-caption")).map((el) => {
            const layers: [number, number, number, number][] = [];
            for (let n: HTMLElement | null = el; n && n !== document.body; n = n.parentElement) {
                const c = resolve(getComputedStyle(n).backgroundColor);
                if (c[3] > 0) layers.unshift(c);
            }
            const ground = layers.reduce((g, layer) => over(layer, g), [page[0], page[1], page[2]] as [number, number, number]);
            const raw = resolve(getComputedStyle(el).color);
            let opacity = 1;
            for (let n: HTMLElement | null = el; n; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
            const ink = over([raw[0], raw[1], raw[2], raw[3] * opacity], ground);
            const [hi, lo] = [lum(ink), lum(ground)].sort((a, b) => b - a) as [number, number];
            return {
                line: `${el.className.split(" ")[0]} "${(el.textContent ?? "").trim().slice(0, 24)}"`,
                ink: rgb(ink),
                ground: rgb(ground),
                ratio: Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100,
            };
        });
    });
}

/** WCAG 1.4.3, small text: the specimen lines are 14 px. */
const TEXT_FLOOR = 4.5;

// The list reads on a phone whatever the colour: a dark colour in light and a
// light colour in dark put the plate's own inks at the far pole from the
// sheet's ground, and the sheet keeps the inks for its own ground.
for (const [scheme, color] of [
    ["light", "oklch(35% 0.12 250)"],
    ["dark", "oklch(90% 0.1 95)"],
] as const) {
    test.describe(`${scheme}, the colour ${color}`, () => {
        test.use({ colorScheme: scheme });
        test("every space name and specimen line in the sheet reads on the sheet", async ({ page }) => {
            const trigger = await boot(page, `/#/?space=oklch&color=${encodeURIComponent(color)}`);
            await expect
                .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ink-ambient-l").trim()), {
                    timeout: 20_000,
                })
                .not.toBe("");
            await trigger.tap();
            const sheet = page.locator(SHEET).first();
            await settled(sheet);
            await expect(sheet.locator(".specimen-caption")).toHaveCount(18);
            const rows = await inkCensus(sheet);
            expect(rows.length, "18 names and 18 lines").toBe(36);
            const under = rows.filter((r) => r.ratio < TEXT_FLOOR).map((r) => `${r.line}: ${r.ink} on ${r.ground}, ${r.ratio}:1`);
            expect(under, `lines under ${TEXT_FLOOR}:1`).toEqual([]);
        });
    });
}
