/**
 * palettes-ramp — THE guarded letterform ramp resolver (T.W6 · W6-4; Q5
 * RULED 2026-07-09, owner-verbatim: "Only palettes should be rainbow--the
 * letterforms dropdown and the title"; T-43 owner-CONFIRMS 2026-07-11).
 *
 * ONE resolver, exactly TWO consume sites (never two mints):
 *   1. the "Palettes" entry in the dock view dropdown (`DockViewSelect.vue`);
 *   2. the Palettes title (`PalettesPane.vue` — the "Palettes" letterforms).
 *
 * Both sites consume the SAME three root tokens (`--palettes-ramp-0/1/2`,
 * written by `boot/useViewAccents` on the same accent watch that resolves
 * `--accent-view`) through the ONE `.palettes-ramp-text` recipe
 * (`background-clip: text` — @styles/utils.css). The guard's output IS
 * O-14's T-10 referent (RATIFICATION cascade 3): the oracle compares the
 * rendered stops at both sites against these tokens, and this module's
 * unit rows (test/view-accents.test.ts) hold the stops to the floor.
 *
 * FORM (the Q4-record relocation clause, ruled in at Q5): a 3-stop ANALOGOUS
 * fan of the LIVE accent — derived, alive to the pick, never pastel literals
 * (the Q4 lesson: the dead recipe's fixed pastels measured ≈1.1–1.5:1).
 * Each stop resolves through the S.W7-4 library pipeline (`resolveViewAccent`
 * — rotate → C-floor → gamut-map → L re-guard → WCAG walk), then walks on to
 * the WCAG 1.4.3 TEXT floor (≥4.5:1): these are LETTERFORMS (menu-entry text
 * ~1rem and the pane title), not graphics, so the 3:1 graphics floor the
 * accent pipeline guarantees is not enough here. The extra walk re-composes
 * the SAME library leaves (`wcagContrastRatio` + `gamutMapOKLab`) — a sibling
 * composition beside the byte-preserved `resolveViewAccent`, never a fork of
 * library math.
 *
 * C3-ledger note: this ramp is THE sanctioned exception to the menu ink law
 * (Q18) — everything else in the nav speaks ink; admin keeps gold (mode
 * identity). The data-strip chip arm is DEAD for T-10 (Q5): no chip, no
 * fallback resolver — the chip grammar survives only where T-17's previews
 * independently earn it.
 *
 * Pure module — no Vue, no DOM. The writer half lives in the boot composable
 * (`useViewAccents`, the one root-token writer).
 */

import {
    OKLCHColor,
    wcagContrastRatio,
    gamutMapOKLab,
    rawOklabToOklch,
    rawOklchToOklab,
} from "@mkbabb/value.js/color";
import { clamp } from "@mkbabb/value.js/math";

import { resolveViewAccent } from "../../../color-picker/composables/boot/view-accents";

/**
 * The 3-stop analogous fan (the Q4 record's own form, ruled in at Q5). ±40°
 * is the house analogous step (the S.W7-4 view fan's own interval) — wide
 * enough that the three letterform stops read chromatically distinct
 * ("rainbow"), narrow enough to stay one analogous family.
 */
export const PALETTES_RAMP_SHIFTS = [-40, 0, 40] as const;

/** WCAG 1.4.3 AA normal-text contrast floor — letterforms, not graphics. */
export const RAMP_TEXT_CONTRAST_FLOOR = 4.5;

/** L solver step for the text-floor walk (mirrors the accent pipeline's). */
const GUARD_STEP_L = 0.04;
/** Walk bound — past any reachable failure (the accent pipeline's bound). */
const MAX_GUARD_STEPS = 12;

/** Parse the accent resolver's canonical `oklch(L C H)` output. */
function parseResolvedOklch(
    css: string,
): { L: number; C: number; H: number } | null {
    const m = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(css);
    if (!m) return null;
    return { L: Number(m[1]), C: Number(m[2]), H: Number(m[3]) };
}

/** Gamut-map a raw OKLCH triple (hue held — the stableHue lesson). */
function mapToGamut(
    L: number,
    C: number,
    H: number,
): { L: number; C: number; H: number } {
    const [l, a, b] = rawOklchToOklab(L, C, H);
    const [lm, am, bm] = gamutMapOKLab(l, a, b);
    const [Lm, Cm, Hm] = rawOklabToOklch(lm, am, bm);
    return { L: Lm, C: Cm, H: Cm < 1e-6 ? H : Hm };
}

/**
 * Walk ONE guarded accent stop from the 3:1 graphics floor up to the 4.5:1
 * text floor (L away from the background, re-mapped each step — the same
 * deterministic library-driven solve the accent pipeline uses).
 */
function walkToTextFloor(css: string, bgL: number): string | null {
    const parsed = parseResolvedOklch(css);
    if (!parsed) return null;
    let { L, C } = parsed;
    const { H } = parsed;
    const bg = new OKLCHColor(bgL, 0, 0, 1);
    const away = bgL < 0.5 ? 1 : -1;
    for (
        let i = 0;
        i < MAX_GUARD_STEPS &&
        wcagContrastRatio(new OKLCHColor(L, C, H, 1), bg) <
            RAMP_TEXT_CONTRAST_FLOOR;
        i++
    ) {
        ({ L, C } = mapToGamut(clamp(L + away * GUARD_STEP_L, 0.02, 0.98), C, H));
    }
    return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(1)})`;
}

/**
 * Resolve the guarded letterform ramp: three analogous stops of the live
 * accent, each gamut-guarded (the accent pipeline) and text-floor-guarded
 * (≥4.5:1 vs the live ambient). Null on parse failure — the caller keeps
 * the last written tokens (the accent-watch contract).
 *
 * @param liveCss the contrast-guarded LIVE accent (the rotation base)
 * @param bgL     the live derived ambient lightness (OKLab L, [0,1])
 */
export function resolvePalettesRamp(
    liveCss: string,
    bgL: number,
): [string, string, string] | null {
    const stops: string[] = [];
    for (const shift of PALETTES_RAMP_SHIFTS) {
        const guarded = resolveViewAccent(liveCss, shift, bgL);
        if (!guarded) return null;
        const text = walkToTextFloor(guarded, bgL);
        if (!text) return null;
        stops.push(text);
    }
    return stops as [string, string, string];
}
