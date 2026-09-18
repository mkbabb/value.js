import type { InjectionKey } from "vue";
import type { AuroraAtoms } from "@mkbabb/glass-ui/aurora";

/**
 * The reactive Aurora **atoms** door (≤7 consumer-facing knobs — glass-ui's
 * `AuroraAtoms`). App.vue owns the reactive object, seeds `.seed` from the live
 * picker colour, and derives the full `AuroraConfig` via `resolveAtoms`.
 * AuroraPane injects this to tune the atmosphere's shape (harmony / colour
 * energy / zones / noise / medium / motion). Mirrors `BLOB_CONFIG_KEY`
 * (glass-ui-provided) for the blob; aurora has no shipped key, so the demo
 * mints its own — the demo's standing injection-key-over-prop-drill idiom.
 */
export const AURORA_ATOMS_KEY: InjectionKey<AuroraAtoms> = Symbol("aurora-atoms");

/**
 * The demo's initial atmosphere SHAPE — the one source App.vue seeds the
 * reactive atoms with AND AuroraPane's "Reset" restores to. Carries NO `seed`:
 * the seed is the live picker colour (App.vue's watch), so Reset restores the
 * shape (harmony / energy / zones / noise / medium / motion) without disturbing
 * the colour. A wispier, breathing default over glass-ui's static wispy-sky.
 *
 * THE T-26 BRACKET LANDING (T.W2 · W2-5; Q2 RULED "full comp." 2026-07-09 —
 * the Q2-NOW half): the owner's THIRD calibration closed the bracket from
 * both sides — (analogous ±28°, 0.7) "a bit too muted, and the aurora not
 * quite noticeable enough" (§0.3) ← TARGET → (triad, 0.82) "too strong"
 * (ruling 6). The landing sits in the lower-middle:
 *   - `colorEnergy: 0.76` — the energy step (saturation ≈1.12, valueVariance
 *     ≈0.116, breathDepth ≈0.068 — below the 0.82 pole's register); judged
 *     by eye across green/warm/neutral seeds AFTER W2-1 (C4: only an honest
 *     seed field is judgeable).
 *   - `harmony: "analogous"` KEPT — the hue walk sits IN the seed family;
 *     the WIDER chroma-adaptive fan [24°,64°] + the +165° counterpoint stop
 *     are the Q2-FULL half (P1-gated atoms, re-judged at W7).
 *   - `zones` — **the T-32 rider landing** (OWNER 2026-07-10, MANDATE §0.5:
 *     "The aurora should have a few more zones"): `count: 6` IS the producer
 *     ceiling (`MAX_NUCLEI = 6`, presets.ts:346 — a shader `#define`, so a
 *     count raise is atom-UNREACHABLE at the consumed dist; the ceiling lift
 *     is a producer book, re-judged at W7 with the P1 aurora surface). The
 *     demo-reachable half is the zones' LEGIBILITY: `arrangement:
 *     "scattered"` (was "composed") — the rule-of-thirds prior parked all
 *     six nuclei in the middle band (x,y ∈ [0.33,0.67], a regular lattice
 *     whose neighbours blur into 2–3 broad washes); the scattered prior
 *     spreads the SAME six across the full frame (x 0.13–0.84, y 0.22–0.81,
 *     irregular spacing), so six DISTINCT glows read — more zones, judged
 *     in-bracket across green/warm/neutral seeds, both A/B'd 2026-07-10.
 *     Energy/chroma registers untouched — the bracket holds.
 *   - softmaxBeta 4 + breath 26 + vividness=f(seedC) ride the base override
 *     (boot/atmosphere-calibration.ts — the sibling half of this knob site).
 * The S-era pull-back rationale (ruling 6: triad lost the seed's identity;
 * analogous re-anchored it; base stop anchors at anchor−28°) stands beneath
 * this landing — presence WITH identity, now one step up in energy.
 */
export const DEFAULT_AURORA_ATOMS: AuroraAtoms = {
    harmony: "analogous",
    colorEnergy: 0.76,
    zones: { count: 6, arrangement: "scattered" },
    noise: 0.5,
    medium: { kind: "smooth" },
    // U33: the TRUE root of "background aurora does not move" — `breathing`
    // zeroes spatial drift (the field pulses in place at most). `drifting` is
    // the spatial-drift register that actually moves the atmosphere over time.
    motion: "drifting",
    // W6-7 (owner ruling §1.3): the mouse influences the field. The producer
    // aurora SHIPS the pointer door — on a SMOOTH medium the cursor axis is
    // `swirl` (Glass 7 gates `light` to painterly/textured media only;
    // `AuroraSmoothInteractivityAtom` types `light?: never`). `swirl` reads as
    // the local luminance-lean the smooth field responds with. The demo feeds
    // the cursor from useAtmosphere's window pointermove wiring; this atom arms
    // the smooth field's cursor-pull.
    interactivity: { swirl: true },
};
