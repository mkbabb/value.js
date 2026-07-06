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
 * Variance pull-back (S · owner ruling 2026-07-05 §1.1, supersedes the W6-3
 * amplification's LANDING): "the c and h variation is a bit too strong." The
 * W6-3 triad/0.82 overshoot lost the seed's identity — a triad walk spans
 * 240° with the `increasing` arc, so a green 145° pick derived stops at
 * h≈135/228/308/15 and the field read PURPLE-dominant (browser-judged at 1440,
 * light+dark, seeds 145°/25°/neutral; shots under
 * docs/tranches/S/audit/pi/w6-after/ruling-shots/). The calibration of record
 * — presence with restraint, between the two same-day poles:
 *   - `harmony: "analogous"` — the hue walk sits IN the seed family
 *     (anchor±28°: h≈108–164 for a 145° pick, ~56° total vs triad's 240°).
 *     The field answers the picker again (S-18) across all three judged
 *     seeds; the neutral gray stays alive (the producer C-bell floor holds
 *     a soft sage drift). Cost, accepted: the deep BASE stop anchors at
 *     anchor−28° (olive h≈108 for a green pick, `--saved-bg #7a7800`) — the
 *     cold-load e2e green-family assert was re-grounded on an honest
 *     seed-family HUE BAND instead of the g>r channel compare.
 *   - `colorEnergy: 0.7` (was 0.82) — back to the pre-amplification C
 *     register: saturation 1.095 keeps the field STRONG (the ruling keeps
 *     presence), while valueVariance/breath ride down with the one cluster
 *     knob.
 *   - `zones: 6` KEPT (the amplification's spatial half survives — more
 *     colour zones = the in-family variance stays visibly alive).
 */
export const DEFAULT_AURORA_ATOMS: AuroraAtoms = {
    harmony: "analogous",
    colorEnergy: 0.7,
    zones: { count: 6, arrangement: "composed" },
    noise: 0.5,
    medium: { kind: "smooth" },
    // U33: the TRUE root of "background aurora does not move" — `breathing`
    // zeroes spatial drift (the field pulses in place at most). `drifting` is
    // the spatial-drift register that actually moves the atmosphere over time.
    motion: "drifting",
    // W6-7 (owner ruling §1.3): the mouse influences the field. The producer
    // aurora SHIPS the pointer door — `interactivity.light` drives the movable
    // impasto light (cursor-as-light + idle orbit, PRM-gated at the runtime by
    // the master tempo). The demo feeds the cursor from useAtmosphere's window
    // pointermove wiring; this atom arms the light's cursor-pull.
    interactivity: { light: true },
};
