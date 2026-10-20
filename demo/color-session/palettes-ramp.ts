/**
 * palettes-ramp — THE guarded letterform ramp resolver (T.W6 · W6-4; Q5
 * RULED 2026-07-09, owner-verbatim: "Only palettes should be rainbow--the
 * letterforms dropdown and the title"; T-43 owner-CONFIRMS 2026-07-11).
 *
 * ONE resolver, exactly TWO consume sites (never two mints):
 *   1. the "Palettes" entry in the dock view dropdown (`DockViewSelect.vue`);
 *   2. the Palettes title (`PalettesPane.vue` — the "Palettes" letterforms).
 *
 * Both sites consume the THREE root tokens `boot/useViewAccents` writes on the
 * same accent watch that resolves `--accent-view`, through the ONE
 * `.palettes-ramp-text` recipe (`background-clip: text` — @styles/utils.css).
 *
 * T.W8 · WR-8 / T-56 — THE SURFACE-REFERENT + FEASIBILITY CURE (the P4-R1 ≡
 * P9-R1 A-class mechanism defect: the landed walk was SCHEME-BLIND and
 * AMBIENT-DEPENDENT — it solved ≥4.5:1 against the PAGE-AMBIENT lightness,
 * which sits mid-L over the owner field where 4.5 is satisfiable only near
 * BLACK, so the 12-step fixed-direction walk ran to its `clamp(…,0.02)` floor
 * and shipped three near-identical near-blacks: monochrome in light,
 * 1.24–1.83:1 in dark). Three stacked roots, all cured here:
 *
 *   (1) THE CARD-SURFACE REFERENT (D6 verbatim: "the referent is a property
 *       of the surface the text sits on, never a global constant [or the page
 *       ambient]"). The caller (`useViewAccents`) resolves `surfaceL` per
 *       CONSUME SITE via the `ink.ts` surface machinery — the resting plate
 *       for the pane title, the floating chrome for the dock menu entry — so
 *       the walk certifies against the tier the letterforms actually sit on,
 *       scheme-true (the W6.5 Lane-I `resolveSurfaceLightness` precedent, the
 *       T-35 cream-collapse lesson applied to the ramp at last).
 *   (2) THE FEASIBILITY-AWARE WALK — direction by reach (the WCAG metric
 *       is asymmetric: from a mid ground black tops out ~3.5:1 while white
 *       clears 6:1): pastel in dark (light ink on the dark card), chalk in
 *       light (deep ink on the light card); the near-black wreck cannot recur.
 *       X-DS value pass 4 (P4R-01) re-cut it as the max-chroma solve below:
 *       the stop starts at the surface and holds its hue's gamut maximum.
 *   (3) THE PER-SITE FLOOR SPLIT (the WCAG 1.4.3/1.4.11 large-text carve-out):
 *       the display-scale pane title is LARGE TEXT — its floor is the 3:1
 *       graphics floor (`RAMP_LARGE_TEXT_CONTRAST_FLOOR`); the ~16px dock menu
 *       entry is NORMAL TEXT — 4.5:1 (`RAMP_TEXT_CONTRAST_FLOOR`). The two
 *       sites diverge honestly (t49-research §8): in light scheme (where the
 *       pastel band is arithmetically infeasible on the light card) the title
 *       may sit at a lighter chalk than the menu; in dark both land on the
 *       pastel band. ONE resolver, called once PER SITE with that site's
 *       (surfaceL, floor) — a per-site CERTIFIED OUTPUT, never a second mint.
 *
 * FORM (the Q4-record relocation clause, ruled in at Q5): a 3-stop fan of
 * the LIVE accent's hue, derived, alive to the pick (never pastel literals —
 * the Q4 lesson: the dead recipe's fixed pastels measured ≈1.1–1.5:1). Each
 * stop is solved by the library's own `safeAccentColor` against the SURFACE
 * at its site's floor (× a small margin), never a fork of library math. The
 * PASTEL REGISTER inside this honest guard is the owner's T-56 bracket
 * (P4-B1): the stop sits as near the plate as its floor allows.
 *
 * C3-ledger note: this ramp is THE sanctioned exception to the menu ink law
 * (Q18) — everything else in the nav speaks ink; admin keeps gold (mode
 * identity). The data-strip chip arm is DEAD for T-10 (Q5): no chip, no
 * fallback resolver — the chip grammar survives only where T-17's previews
 * independently earn it.
 *
 * Pure module — no Vue, no DOM. The writer half lives in the boot composable
 * (`useViewAccents`, the one root-token writer) which owns the per-site
 * surface reads.
 */

import { convertColor, oklch, parseCssColor, serializeCssColor } from "@mkbabb/value.js/color";

import { certifyAccentInk } from "./ink";

/**
 * The 3-stop fan (the Q4 record's own form, ruled in at Q5). X-DS value pass
 * 4 (critic P4R-01): ±40° stayed inside one warm family, so at a guarded
 * lightness the three stops read as one muddy ink, not the owner's
 * "rainbow" (T-43) / "pleasing pastel rainbow" (T-56). ±60° spans 120°: three
 * distinct hue families around the live pick, still one fan of it.
 */
export const PALETTES_RAMP_SHIFTS = [-60, 0, 60] as const;

/**
 * The LIGHT fan (COHESION §0ge.7, P5-B1 RULED Pole B; DS/value pass 5,
 * P5C-02). On a light plate the stops walk to deep ink, where the ±60° fan's
 * warm end (pick + 60, h ≈ 70) has almost no sRGB chroma: it read brown
 * (C 0.08). The light fan re-centres cool, −70 / −20 / +20 around the pick
 * (violet 300, rose 350, coral 30 at the measured pick h ≈ 10), so the warm
 * end keeps its chroma voice (C ≈ 0.155) through the SAME max-chroma solve at
 * the same site floor, hence at Pole A's own measured contrast. The dark fan
 * is unchanged.
 */
export const PALETTES_RAMP_LIGHT_SHIFTS = [-70, -20, 20] as const;

/** A plate at or above this OKLab L takes deep ink (the light register) — the
 *  house split `contrastInkFor` draws for a light fill. */
const RAMP_LIGHT_PLATE_L = 0.5;

/** A chroma past every sRGB cusp: the gamut map returns each hue's maximum. */
const RAMP_GAMUT_CHROMA = 0.4;

/** WCAG 1.4.3 AA normal-text contrast floor — the ~16px dock menu entry. */
export const RAMP_TEXT_CONTRAST_FLOOR = 4.5;

/** WCAG large-text / 1.4.11 graphics floor — the display-scale pane title
 *  (the large-text carve-out: the title is display-1, ≥24px). t49-research §8:
 *  the two Q5 sites diverge honestly at exactly this floor split. */
export const RAMP_LARGE_TEXT_CONTRAST_FLOOR = 3;

/**
 * Resolve the guarded letterform ramp for ONE consume site: three hues fanned
 * from the live accent, each solved against the SURFACE the letterforms sit
 * on. Null on parse failure — the caller keeps the last written tokens (the
 * accent-watch contract).
 *
 * X-DS value pass 4 (critic P4R-01) — THE MAX-CHROMA SOLVE. The pick
 * contributes its HUE only. Each stop starts AT the surface's lightness with
 * a chroma past the sRGB cusp, and the house certify (`certifyAccentInk`:
 * the site floor plus its headroom where reachable, else the best ratio at or
 * above the floor) walks L away from the plate, gamut-mapping at every step —
 * so the stop lands as near the plate as the guard allows (the pastel side)
 * and holds the hue's MAXIMUM chroma there. The old walk kept the pick's own
 * L and C (in dark the guarded pick is cream, L 0.96 / C 0.02; in light a
 * near-ink L 0.30), so the ramp read as cream or plum-brown, never as a
 * rainbow. Direction by reach falls out of the walk: light ink over a dark
 * plate, deep ink over a light one. The headroom matters: the composited
 * plate measures lighter than its model, and a thin margin fell under 3:1 on
 * real pixels (pass-04/p4r-2026-10-15, the first cut at ×1.1).
 *
 * @param liveCss  the contrast-guarded LIVE accent (the hue base)
 * @param surfaceL the site's resolved surface lightness (OKLab L, [0,1] —
 *                 `resolveSurfaceLightnessLive` for the tier the site sits on)
 * @param floor    the site's WCAG floor (`RAMP_TEXT_CONTRAST_FLOOR` for the
 *                 menu entry, `RAMP_LARGE_TEXT_CONTRAST_FLOOR` for the title)
 */
export function resolvePalettesRamp(
    liveCss: string,
    surfaceL: number,
    floor: number,
): [string, string, string] | null {
    if (!Number.isFinite(surfaceL) || !Number.isFinite(floor)) return null;
    const parsed = parseCssColor(liveCss);
    if (!parsed.ok) return null;
    const source = convertColor(parsed.value, "oklch");
    if (!source.ok) return null;
    const baseHue = source.value.channels[2];
    const hue = baseHue === "none" ? 0 : baseHue;

    const stops: string[] = [];
    const shifts = surfaceL >= RAMP_LIGHT_PLATE_L ? PALETTES_RAMP_LIGHT_SHIFTS : PALETTES_RAMP_SHIFTS;
    for (const shift of shifts) {
        const start = oklch(surfaceL, RAMP_GAMUT_CHROMA, (((hue + shift) % 360) + 360) % 360, 1);
        if (!start.ok) return null;
        const css = serializeCssColor(start.value);
        if (!css.ok) return null;
        stops.push(certifyAccentInk(css.value, surfaceL, floor));
    }
    return stops as [string, string, string];
}
