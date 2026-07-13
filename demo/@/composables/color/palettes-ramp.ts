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
 *   (2) THE FEASIBILITY-AWARE WALK — the ramp now composes `certifyAccentInk`
 *       (`ink.ts`), whose `walkToFloor` core RIDES THE HUE'S GAMUT CUSP and
 *       CHOOSES ITS DIRECTION BY REACH (the WCAG metric is asymmetric: from a
 *       mid ground black tops out ~3.5:1 while white clears 6:1). Against a
 *       card surface the feasible direction is always reachable WITH chroma —
 *       pastel in dark (light ink on the dark card), chalk in light (deep ink
 *       on the light card) — the near-black wreck cannot recur (it holds the
 *       pick's C at the cusp instead of the old constant-C-then-project
 *       collapse).
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
 * FORM (the Q4-record relocation clause, ruled in at Q5 — STANDS UNTOUCHED):
 * a 3-stop ANALOGOUS fan of the LIVE accent, derived, alive to the pick
 * (never pastel literals — the Q4 lesson: the dead recipe's fixed pastels
 * measured ≈1.1–1.5:1). Each stop resolves through the S.W7-4 library
 * pipeline (`resolveViewAccent` — rotate → C-floor → gamut-map → L re-guard →
 * WCAG ≥3 vs the SURFACE) and then certifies to its site's text/large-text
 * floor via the shared `ink.ts` cusp walk — a sibling composition beside the
 * byte-preserved `resolveViewAccent`, never a fork of library math. The
 * PASTEL REGISTER inside this honest guard is the owner's T-56 bracket
 * (P4-B1): this module lands the HONEST WALK; the owner rules the register.
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

import { certifyAccentInk } from "./ink";
import { resolveViewAccent } from "../../../color-picker/composables/boot/view-accents";

/**
 * The 3-stop analogous fan (the Q4 record's own form, ruled in at Q5). ±40°
 * is the house analogous step (the S.W7-4 view fan's own interval) — wide
 * enough that the three letterform stops read chromatically distinct
 * ("rainbow"), narrow enough to stay one analogous family.
 */
export const PALETTES_RAMP_SHIFTS = [-40, 0, 40] as const;

/** WCAG 1.4.3 AA normal-text contrast floor — the ~16px dock menu entry. */
export const RAMP_TEXT_CONTRAST_FLOOR = 4.5;

/** WCAG large-text / 1.4.11 graphics floor — the display-scale pane title
 *  (the large-text carve-out: the title is display-1, ≥24px). t49-research §8:
 *  the two Q5 sites diverge honestly at exactly this floor split. */
export const RAMP_LARGE_TEXT_CONTRAST_FLOOR = 3;

/**
 * Resolve the guarded letterform ramp for ONE consume site: three analogous
 * stops of the live accent, each gamut-guarded (the accent pipeline) then
 * feasibility-certified against the SURFACE the letterforms sit on (the
 * `ink.ts` cusp walk — direction by reach, C held at the cusp). Null on parse
 * failure — the caller keeps the last written tokens (the accent-watch
 * contract).
 *
 * @param liveCss  the contrast-guarded LIVE accent (the rotation base)
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
    const stops: string[] = [];
    for (const shift of PALETTES_RAMP_SHIFTS) {
        const guarded = resolveViewAccent(liveCss, shift, surfaceL);
        if (!guarded) return null;
        // The feasibility-aware cusp walk (ink.ts → ink-walk `walkToFloor`):
        // certifies `guarded` to the site's floor against the site surface,
        // riding the hue's gamut cusp and choosing its L direction by reach —
        // pastel in dark, chalk in light, never the near-black clamp.
        stops.push(certifyAccentInk(guarded, surfaceL, floor));
    }
    return stops as [string, string, string];
}
