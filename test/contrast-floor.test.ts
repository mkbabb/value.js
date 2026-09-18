// SERVED MODEL: claude-opus-5[1m]
//
// X-W1 · X.W1.a — R33 (ColorNutritionLabel CNL-5 + CNL-17) / NG-2 clause 2:
// **no gate floor disagrees with its subject's declared law.**
//
// THE DEFECT. `o18-contrast-census.spec.ts` certified guard-produced ink at
// `TEXT_FLOOR = 4.5`. The guard does not walk to 4.5. `certifyAccentInk`
// (`demo/color-session/ink.ts:137`) walks to `floor + CERTIFY_HEADROOM`, and
// `useContrastSafeColor.ts:168` names the resulting number in prose — *"the
// 5.75 walked target"*. A census row one notch below its subject passes ink
// the module itself would have rejected: green, and measuring the wrong thing.
//
// THE CURE'S SHAPE. The floor is DERIVED, never re-typed. This oracle imports
// the three constants from the module and fails if the literal the census
// declares and `TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM` ever part — so the
// two cannot drift apart again in silence. A Playwright spec body cannot do
// this itself: `ink.ts` pulls `@mkbabb/value.js/color`, and importing it from
// `e2e/` would re-couple the browser suite to a built `dist/`.
//
// The census keeps `TEXT_FLOOR` for rows measuring plain product text and for
// `contrastInkFor` output (WCAG-MAXIMAL by construction — a different law).
// Raising those to 5.75 would be the G-4 idiom pointed the other way.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
    CERTIFY_HEADROOM,
    GRAPHICS_CONTRAST_FLOOR,
    TEXT_CONTRAST_FLOOR,
} from "../demo/color-session/ink";

const CENSUS = resolve(process.cwd(), "e2e/smoke/oracles/o18-contrast-census.spec.ts");

/** The one literal the census declares for guard-produced ink. */
function censusCertifiedFloor(): number {
    const src = readFileSync(CENSUS, "utf8");
    const m = /^const CERTIFIED_INK_FLOOR = ([\d.]+);$/m.exec(src);
    if (!m) {
        throw new Error(
            "the O-18 census no longer declares `CERTIFIED_INK_FLOOR` — the " +
                "R33 derivation has been removed, not merely changed",
        );
    }
    return Number(m[1]);
}

/** The bare WCAG literal the census keeps for non-guard rows. */
function censusTextFloor(): number {
    const src = readFileSync(CENSUS, "utf8");
    const m = /^const TEXT_FLOOR = ([\d.]+);$/m.exec(src);
    if (!m) throw new Error("the O-18 census no longer declares `TEXT_FLOOR`");
    return Number(m[1]);
}

describe("R33 · the certified-ink floor is its subject's declared law", () => {
    it("the guard's walked target is floor + headroom, and that is 5.75", () => {
        // Pinned as an ABSOLUTE so a silent edit of either constant is a
        // failure here and not an invisible re-baselining of every census row.
        expect(TEXT_CONTRAST_FLOOR).toBe(4.5);
        expect(CERTIFY_HEADROOM).toBe(1.25);
        expect(TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM).toBe(5.75);
    });

    it("the O-18 census's certified-ink floor EQUALS the walked target", () => {
        expect(
            censusCertifiedFloor(),
            "o18's CERTIFIED_INK_FLOOR must be `TEXT_CONTRAST_FLOOR + " +
                "CERTIFY_HEADROOM`; a census below its own subject passes ink " +
                "the guard rejects (CNL-17)",
        ).toBe(TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM);
    });

    it("the census still keeps the BARE WCAG floor for non-guard rows", () => {
        // The cure is a split, not a blanket raise: rows measuring plain
        // product text keep 1.4.3's own number. If this literal ever equals
        // the walked target, someone raised every row to meet a measurement.
        expect(censusTextFloor()).toBe(TEXT_CONTRAST_FLOOR);
        expect(censusTextFloor()).toBeLessThan(TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM);
    });

    it("the graphics floor is WCAG 1.4.11's, unheadroomed", () => {
        // `safeCss(css, GRAPHICS_CONTRAST_FLOOR)` also adds the headroom, but
        // the census's `GRAPHICS_FLOOR` rows measure track SURFACES, not guard
        // output — the declared law there is 1.4.11 itself.
        expect(GRAPHICS_CONTRAST_FLOOR).toBe(3);
        const src = readFileSync(CENSUS, "utf8");
        const m = /^const GRAPHICS_FLOOR = ([\d.]+);$/m.exec(src);
        expect(m, "the census declares GRAPHICS_FLOOR").not.toBeNull();
        expect(Number(m![1])).toBe(GRAPHICS_CONTRAST_FLOOR);
    });
});
