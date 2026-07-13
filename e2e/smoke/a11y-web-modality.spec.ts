import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * U.W-A11Y · U-F58 — THE BUILD-OR-OUT-OF-SCOPE WEB-MODALITY DECISIONS (the two
 * BUILD modalities; the out-of-scope + fold rows are recorded in the close note).
 *
 *   BR-10 — i18n / RTL (mechanical readiness): `dir` plumbing lands on <html>
 *           (was absent — `lang` present, `dir` not) and `dir="rtl"` flips the
 *           whole document with LAYOUT INTEGRITY (no clipped / overlapping
 *           controls, no horizontal overflow). NOT full string extraction
 *           (single-locale tool — that half out-of-scope, recorded). The global
 *           style.css layout is grid/flex + shorthand padding → RTL-integral by
 *           construction; per-component physical→logical conversions are BOOKED
 *           follow-ups (docs/tranches/U/audit/w-a11y/rtl-logical-property-audit.md).
 *
 *   BR-11 — print: a color tool's palette IS a printable artifact. The @media
 *           print layout hides the glass/aurora/blob chrome, prints the swatches
 *           + hex/space labels with faithful ink, ink-economical (white ground).
 *
 * PI (§π): rtl-layout.png + print-artifact.png under docs/tranches/U/audit/w-a11y/pi/.
 */

const PI_DIR = resolve(process.cwd(), "docs/tranches/U/audit/w-a11y/pi");

async function ready(page: Page) {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible({ timeout: 20000 });
}

test("BR-10 · dir plumbing + dir=rtl layout integrity (no clipping / overflow)", async ({
    page,
}) => {
    mkdirSync(PI_DIR, { recursive: true });
    await ready(page);

    // The `dir` plumbing landed: <html dir="ltr"> is present (was absent).
    const dirAttr = await page.evaluate(
        () => document.documentElement.getAttribute("dir"),
    );
    console.log(`[BR-10] <html dir> = ${dirAttr}`);
    expect(dirAttr).toBe("ltr");

    // Flip the whole document to RTL and assert layout integrity.
    await page.evaluate(() => {
        document.documentElement.setAttribute("dir", "rtl");
    });
    await page.waitForTimeout(150); // let reflow settle

    await page
        .locator(".app-layout")
        .screenshot({ path: resolve(PI_DIR, "rtl-layout.png") });

    // Integrity 1 — no horizontal overflow (a clipped/overflowing layout scrolls
    // sideways). The app-layout is `overflow: hidden` at 100dvh; the honest probe
    // is the document scrollWidth vs the client width.
    const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return {
            scrollW: de.scrollWidth,
            clientW: de.clientWidth,
        };
    });
    console.log(
        `[BR-10] RTL overflow: scrollWidth=${overflow.scrollW} clientWidth=${overflow.clientW}`,
    );
    expect(overflow.scrollW).toBeLessThanOrEqual(overflow.clientW + 2);

    // Integrity 2 — the operable controls stay laid out (visible + non-zero box)
    // under RTL: the dock nav, the view select, the main pane.
    for (const loc of [
        page.getByRole("navigation", { name: "Application navigation" }),
        page.getByRole("combobox", { name: "Select view" }),
        page.getByRole("main", { name: "Color tool panes" }),
    ]) {
        await expect(loc).toBeVisible();
        const box = await loc.boundingBox();
        expect(box).not.toBeNull();
        expect((box?.width ?? 0) > 0 && (box?.height ?? 0) > 0).toBe(true);
        // within the viewport horizontally (no control shoved off-canvas)
        const vp = page.viewportSize();
        if (vp && box) {
            expect(box.x).toBeGreaterThanOrEqual(-2);
            expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 2);
        }
    }

    await page.evaluate(() =>
        document.documentElement.setAttribute("dir", "ltr"),
    );
});

test("BR-11 · @media print — legible palette artifact (chrome hidden, ink-economical)", async ({
    page,
}) => {
    mkdirSync(PI_DIR, { recursive: true });
    await ready(page);

    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(120);

    await page
        .locator(".app-layout")
        .screenshot({ path: resolve(PI_DIR, "print-artifact.png") });

    // DELTA (chrome hidden): the interactive/decorative chrome is display:none in
    // print — the dock nav does not print.
    const navDisplay = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(
            'nav[aria-label="Application navigation"]',
        );
        return el ? getComputedStyle(el).display : "absent";
    });
    console.log(`[BR-11] print dock nav display: ${navDisplay}`);
    expect(navDisplay).toBe("none");

    // DELTA (ink economy): the body ground is white in print (the derived aurora
    // gradient is dropped — ink-economical).
    const bodyBg = await page.evaluate(() => {
        const cs = getComputedStyle(document.body);
        return { color: cs.backgroundColor, image: cs.backgroundImage };
    });
    console.log(
        `[BR-11] print body bg color=${bodyBg.color} image=${bodyBg.image}`,
    );
    expect(bodyBg.color).toBe("rgb(255, 255, 255)");
    expect(bodyBg.image).toBe("none");

    // DELTA (the palette IS the artifact): the color content still prints — the
    // spectrum plate + the readout are present, and the color surfaces carry
    // print-color-adjust:exact so the swatch colors survive ink economy.
    await expect(
        page.getByRole("img", { name: /Color spectrum/ }).first(),
    ).toBeVisible();
    const spectrumPrintAdjust = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".spectrum-picker");
        if (!el) return null;
        const cs = getComputedStyle(el);
        // printColorAdjust is the standard; webkitPrintColorAdjust the alias
        return (
            (cs as unknown as { printColorAdjust?: string }).printColorAdjust ??
            (cs as unknown as { webkitPrintColorAdjust?: string })
                .webkitPrintColorAdjust ??
            null
        );
    });
    console.log(`[BR-11] spectrum print-color-adjust: ${spectrumPrintAdjust}`);
    expect(spectrumPrintAdjust).toBe("exact");

    await page.emulateMedia({ media: "screen" });
});
