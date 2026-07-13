import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * S.W2 · W2-1 — the URL-color persistence-precedence gate.
 *
 * The pipeline declares ONE precedence: URL-hash-wins-on-load; localStorage is
 * the fallback only when the hash carries no color. Two axes prove it:
 *
 *   1. URL WINS — cold load with a POPULATED `color-picker` localStorage AND a
 *      hash color → the hash color wins across every surface (the component
 *      readout, the space trigger, and the `--accent-live` token all agree on
 *      the hash hue), and the stored color does NOT leak into any of them.
 *   2. RESTORE  — cold load with a populated localStorage and NO hash color →
 *      the pipeline restores the last session (the NEW path, gated behind
 *      URL-wins; seed rider 3).
 *
 * Router is hash-mode (`createWebHashHistory`), so a color URL is
 * `/#/?space=<space>&color=<css>`. Colors are chosen off the CSS named-color
 * lattice (distinct hues 260 vs 145) so the readout is the formatted number,
 * never a resolved name; the hue survives the contrast guard (which shifts
 * lightness only), so `--accent-live` carries it too.
 */

const STORED_GREEN = "oklch(75% 0.16 145deg / 100%)"; // the localStorage color (hue 145)
const URL_BLUE = "oklch(0.55 0.18 260)"; // the hash color (hue 260)

/** Seed the `color-picker` localStorage before any app script runs. */
async function seedStoredColor(page: Page, css: string) {
    await page.addInitScript((value) => {
        localStorage.setItem(
            "color-picker",
            JSON.stringify({ inputColor: value, savedColors: [] }),
        );
    }, css);
}

function accentLive(page: Page): Promise<string> {
    return page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--accent-live")
            .trim(),
    );
}

/**
 * The HUE FIELD of the accent token, parsed (T.W6.5 lane I hardening): the
 * former whole-string `toContain("<hue>")` was a substring PROXY — the
 * certified voice `oklch(L C H)` false-positives it on chroma digits (the
 * cusp walk lands e.g. C 0.1452 for the URL blue on the light plate, whose
 * "145" is not a leaked hue). Both accent voices parse: the original pick
 * string (`oklch(0.55 0.18 260)`, `oklch(75% 0.16 145deg / 100%)`) and the
 * certified `oklch(0.3559 0.1452 260.0)`.
 */
function hueOf(css: string): number {
    const m = /^oklch\(\s*[\d.%]+\s+[\d.]+\s+([\d.]+)/.exec(css);
    return m ? Number(m[1]) : Number.NaN;
}

test("URL hash color WINS over populated localStorage (readout + trigger + accent agree)", async ({
    page,
}) => {
    await seedStoredColor(page, STORED_GREEN);

    await page.goto("/#/?space=oklch&color=" + encodeURIComponent(URL_BLUE));

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // Readout — the H-channel component value reflects the URL hue (260), not
    // the stored hue (145). The stored color did NOT leak.
    const hueReadout = page
        .getByRole("textbox", { name: "h component value" })
        .last();
    await expect(hueReadout).toContainText("260");
    await expect(hueReadout).not.toContainText("145");

    // Space trigger rode the URL's `space=oklch`.
    const spaceTrigger = main
        .getByRole("combobox", { name: "Select color space" })
        .first();
    await expect(spaceTrigger).toHaveText("OKLCh");

    // The `--accent-live` root token agrees — the hue (260) survives the
    // contrast guard (which certifies L/C against the rung, preserving H).
    // Asserted on the PARSED hue field (see `hueOf`), never a substring.
    await expect
        .poll(async () => Math.round(hueOf(await accentLive(page))), {
            timeout: 8000,
        })
        .toBe(260);
    expect(Math.round(hueOf(await accentLive(page)))).not.toBe(145);
});

test("localStorage RESTORES the last session when the hash carries no color", async ({
    page,
}) => {
    await seedStoredColor(page, STORED_GREEN);

    // No color in the hash → the URL does not win → the pipeline restores.
    await page.goto("/");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // Readout reflects the restored stored hue (145), not the default pick.
    const hueReadout = page
        .getByRole("textbox", { name: "h component value" })
        .last();
    await expect(hueReadout).toContainText("145");

    // The `--accent-live` token agrees with the restored color — the same
    // parsed-hue instrument (a "145" substring could one day ride chroma
    // digits just as falsely in THIS direction).
    await expect
        .poll(async () => Math.round(hueOf(await accentLive(page))), {
            timeout: 8000,
        })
        .toBe(145);
});
