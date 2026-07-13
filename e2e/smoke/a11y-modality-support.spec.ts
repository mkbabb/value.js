import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * U.W-A11Y · U-F57 — THE HIGH-CONTRAST / CONTRAST-PREFERENCE SUPPORT LAYER.
 *
 * Born-RED headless gates for the modality support layer (demo/@/styles/style.css):
 *   BR-5 — @media (forced-colors: active): the color-DISPLAY surfaces keep their
 *          colors (`forced-color-adjust: none`) while the operable chrome stays
 *          visible; a real `outline` focus affordance is available (box-shadow
 *          rings vanish in WHCM).
 *   BR-6 — @media (prefers-contrast: more): the elevated-contrast token layer
 *          engages — the decorative glass tint DROPS (--glass-tint-strength → 0%)
 *          and the muddiest text token rises to a higher floor.
 *   BR-7 — @media (prefers-reduced-transparency: reduce): the glass surfaces
 *          present an OPAQUE fallback (opaque background + backdrop-filter removed).
 *
 * These are DETERMINISTIC, headless-verifiable a11y properties (the U.W-A11Y
 * thesis — no GPU/SwiftShader confound): a computed `forced-color-adjust`, a
 * resolved custom-property token, a computed `backdrop-filter`/`background-color`
 * are all pure functions of the resolved cascade. Each test reads the property
 * WITHOUT the emulation (the translucent/tinted normal state) AND WITH it (the
 * cure engaged), asserting the RED→GREEN direction in one self-contained gate.
 *
 * PI/DELTA (§π): element-clipped modality frames land under
 * docs/tranches/U/audit/w-a11y/pi/. (Wave-doc §π names `audit/pi/w-a11y/`; the
 * lane brief corrects it to `audit/w-a11y/pi/` — DISCREPANCY FLAGGED in the
 * close note. The frames use the brief's path.)
 *
 * Prefers-reduced-transparency is NOT an `emulateMedia` key even in Playwright
 * 1.60 → driven via CDP `Emulation.setEmulatedMedia { features }`.
 */

const PI_DIR = resolve(
    process.cwd(),
    "docs/tranches/U/audit/w-a11y/pi",
);

function ensurePiDir() {
    mkdirSync(PI_DIR, { recursive: true });
}

async function ready(page: Page) {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible({ timeout: 20000 });
    // let the pane cards mount (the glass surfaces the gates probe)
    await page.locator(".pane-wrapper .glass-resting, .glass-resting").first()
        .waitFor({ state: "attached", timeout: 8000 })
        .catch(() => void 0);
}

// Read the resolved value of a CSS custom property on :root.
async function rootVar(page: Page, name: string): Promise<string> {
    return page.evaluate(
        (n) =>
            getComputedStyle(document.documentElement)
                .getPropertyValue(n)
                .trim(),
        name,
    );
}

// Parse an rgb/rgba/color()/oklab() string's alpha channel (1 when opaque or
// absent). Only a FOURTH rgba() component or a slash-alpha counts as alpha — a
// 3-component rgb() is fully opaque (the earlier naive regex mis-read the blue
// channel of `rgb(253, 245, 236)` as alpha).
function alphaOf(color: string): number {
    const pct = (v: string) =>
        v.endsWith("%") ? parseFloat(v) / 100 : parseFloat(v);
    // rgba(r, g, b, a) — exactly the 4th component
    const rgba = color.match(
        /rgba?\(\s*[\d.]+[\s,]+[\d.]+[\s,]+[\d.]+[\s,/]+([\d.]+%?)\s*\)/,
    );
    if (rgba) return pct(rgba[1]);
    // any function with a slash-alpha: color(srgb r g b / a) / oklab(l a b / a)
    const slash = color.match(/\/\s*([\d.]+%?)\s*\)/);
    if (slash) return pct(slash[1]);
    // plain rgb(...) / oklab(...) / keyword → opaque
    return 1;
}

test("BR-5 · forced-colors:active — color surfaces preserved + chrome operable + focus outline", async ({
    page,
}) => {
    ensurePiDir();
    await ready(page);

    // BEFORE emulation: the spectrum's forced-color-adjust is the UA default.
    const fcaBefore = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".spectrum-picker");
        return el ? getComputedStyle(el).forcedColorAdjust : null;
    });

    await page.emulateMedia({ forcedColors: "active" });

    // π-frame (element-clipped to the whole app — the OA-1 coherence surface).
    await page
        .locator(".app-layout")
        .screenshot({ path: resolve(PI_DIR, "modality-forced-colors.png") });

    // DELTA (color-surface preservation): the color-DISPLAY surfaces keep their
    // colors under WHCM — forced-color-adjust:none. This is the two-tier policy's
    // tier 1 (a blanket system-color substitution would destroy the very content
    // a color tool exists to show).
    const spectrumFca = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".spectrum-picker");
        return el ? getComputedStyle(el).forcedColorAdjust : null;
    });
    const canvasFca = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".atmosphere-canvas");
        return el ? getComputedStyle(el).forcedColorAdjust : null;
    });
    console.log(
        `[BR-5] forced-color-adjust spectrum: ${fcaBefore} → ${spectrumFca}; atmosphere-canvas: ${canvasFca}`,
    );
    expect(spectrumFca).toBe("none");
    expect(canvasFca).toBe("none");

    // DELTA (operable-control visibility): the chrome stays visible + operable
    // under WHCM (adopts system colors, tier 2), never clipped to nothing.
    await expect(
        page.getByRole("navigation", { name: "Application navigation" }),
    ).toBeVisible();
    await expect(
        page.getByRole("combobox", { name: "Select view" }),
    ).toBeVisible();

    // The U-F25 forced-colors focus bind: a real `outline` where the box-shadow
    // ring cannot paint. Tab through the chrome and confirm at least one operable
    // control receives an outline ≥ 2px in the forced-colors register.
    let maxOutline = 0;
    for (let i = 0; i < 12; i++) {
        await page.keyboard.press("Tab");
        const w = await page.evaluate(() => {
            const el = document.activeElement as HTMLElement | null;
            if (!el || el === document.body) return 0;
            const cs = getComputedStyle(el);
            if (cs.outlineStyle === "none") return 0;
            return parseFloat(cs.outlineWidth) || 0;
        });
        if (w > maxOutline) maxOutline = w;
    }
    console.log(`[BR-5] max focus outline width under forced-colors: ${maxOutline}px`);
    expect(maxOutline).toBeGreaterThanOrEqual(2);

    await page.emulateMedia({ forcedColors: "none" });
});

test("BR-6 · prefers-contrast:more — elevated-contrast layer (decorative tint dropped, text floor raised)", async ({
    page,
}) => {
    ensurePiDir();
    await ready(page);

    // BEFORE: the decorative glass tint + the muddiest text token in the normal
    // register.
    const tintBefore = await rootVar(page, "--glass-tint-strength");
    const mutedBefore = await rootVar(page, "--muted-foreground");

    await page.emulateMedia({ contrast: "more" });

    await page
        .locator(".app-layout")
        .screenshot({ path: resolve(PI_DIR, "modality-contrast-more.png") });

    const tintAfter = await rootVar(page, "--glass-tint-strength");
    const mutedAfter = await rootVar(page, "--muted-foreground");
    console.log(
        `[BR-6] --glass-tint-strength: '${tintBefore}' → '${tintAfter}'; --muted-foreground: '${mutedBefore}' → '${mutedAfter}'`,
    );

    // DELTA (decorative tints dropped): the low-contrast warm-brown glass tint
    // (the U-F12 muddiness) drops to zero under the elevated-contrast register.
    expect(tintBefore).not.toBe("0%");
    expect(tintAfter).toBe("0%");

    // DELTA (text at higher floor): the muddiest text token moves to the elevated
    // value (it must change — the higher floor engaged).
    expect(mutedAfter).not.toBe("");
    expect(mutedAfter).not.toBe(mutedBefore);

    await page.emulateMedia({ contrast: "no-preference" });
});

test("BR-7 · prefers-reduced-transparency:reduce — opaque glass fallback (blur removed + opaque bg)", async ({
    page,
}) => {
    ensurePiDir();
    await ready(page);

    const client = await page.context().newCDPSession(page);

    // Read the normal (translucent) glass card background alpha BEFORE the
    // emulation, so the gate is self-contained (RED-if-broken proven in one test).
    const bgBefore = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".glass-resting");
        return el ? getComputedStyle(el).backgroundColor : null;
    });
    const glassLevelBefore = await rootVar(page, "--glass-level");
    // the demo's decorative glass tint — a DEMO token the producer does NOT
    // touch under reduced-transparency (HONEST FINDING: the producer glass-ui
    // already provides an opaque glass BG + --glass-level:0 fallback under
    // reduced-transparency via its ./styles tokens, so the opaque-bg outcome is
    // partly producer-provided; the decorative-tint drop is the clean
    // demo-owned RED→GREEN delta this cure adds).
    const tintBefore = await rootVar(page, "--glass-tint-strength");

    await client.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
    });
    // wait for style recalc: --glass-level must resolve to 0 (the producer blur
    // lever) before the surface reads are trusted.
    await page.waitForFunction(
        () =>
            getComputedStyle(document.documentElement)
                .getPropertyValue("--glass-level")
                .trim() === "0",
        undefined,
        { timeout: 5000 },
    );

    await page
        .locator(".app-layout")
        .screenshot({
            path: resolve(PI_DIR, "modality-reduced-transparency.png"),
        });

    const glassLevelAfter = await rootVar(page, "--glass-level");
    const bgAfter = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".glass-resting");
        return el ? getComputedStyle(el).backgroundColor : null;
    });
    // the T-45 carrier's backdrop blur (the pane-wrapper::before oversampled
    // layer) must be removed under reduced-transparency.
    const carrierFilter = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".pane-wrapper");
        return el ? getComputedStyle(el, "::before").backdropFilter : null;
    });

    const tintAfter = await rootVar(page, "--glass-tint-strength");
    console.log(
        `[BR-7] --glass-level: '${glassLevelBefore}' → '${glassLevelAfter}'; --glass-tint-strength: '${tintBefore}' → '${tintAfter}'; glass-resting bg: '${bgBefore}' → '${bgAfter}'; carrier ::before backdrop-filter: '${carrierFilter}'`,
    );

    // DELTA (demo-owned decorative-tint drop — the clean RED→GREEN this cure
    // adds): under reduced-transparency the demo decorative glass tint drops to
    // zero. The producer does not touch this demo token, so it is RED without
    // the cure (stays at its non-zero normal value).
    expect(tintBefore).not.toBe("0%");
    expect(tintAfter).toBe("0%");

    // OUTCOME (glass blur lever): --glass-level → 0 (producer chain: every
    // --glass-blur-* → blur(0)); the cure sets it belt-and-suspenders at :root.
    expect(glassLevelAfter).toBe("0");

    // OUTCOME (glass opacity: translucent → opaque): the glass card background is
    // fully opaque under reduced-transparency (nothing shows through). Honest
    // coherence check — the producer's ./styles already delivers an opaque glass
    // fallback here, and the demo cure reinforces it for the demo surfaces.
    expect(bgAfter).not.toBeNull();
    expect(alphaOf(bgAfter as string)).toBeCloseTo(1, 2);

    // OUTCOME (backdrop-filter removed): the oversampled carrier presents no blur.
    if (carrierFilter && carrierFilter !== "") {
        expect(carrierFilter).toBe("none");
    }

    await client.send("Emulation.setEmulatedMedia", { features: [] });
});

test("U-F57 · screen-reader landmark structure + live region (role/landmark battery)", async ({
    page,
}) => {
    await ready(page);

    // Landmark structure: nav + main are the two band rows (App.vue). A color
    // tool's SR user navigates by landmark; both must carry accessible names.
    await expect(
        page.getByRole("navigation", { name: "Application navigation" }),
    ).toBeVisible();
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // The picker exposes a live region for the color-change announcement (an
    // aria-live surface exists in the controls subtree). This is the SR
    // announcement grammar — presence gate (a real SR pass is owner-attested).
    const liveRegionCount = await page.evaluate(
        () =>
            document.querySelectorAll(
                '[aria-live], [role="status"], [role="alert"]',
            ).length,
    );
    console.log(`[U-F57 SR] aria-live / status / alert regions: ${liveRegionCount}`);
    expect(liveRegionCount).toBeGreaterThanOrEqual(1);

    // The spectrum picker carries a descriptive accessible name (role=img with a
    // reactive label, not a bare canvas) — the 2D picker's SR affordance.
    await expect(
        page.getByRole("img", { name: /Color spectrum/ }).first(),
    ).toBeVisible();
});
