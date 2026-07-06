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
 * W6-3 (S.W6 · owner-ruling amplification, 2026-07-05): the field must read as
 * STRONG presence with visibly GREATER derived C and H variance off the pick,
 * subtle in register (variance ≠ noise). The chroma-adaptive `hueSpread` /
 * C-bell-floor / scheme-banded-L formulas live PRODUCER-side behind the letter
 * L2 atoms (not yet on the `AuroraAtoms` door — recorded gap row, re-verify at
 * W8); the demo half is this retune of the door's SHIPPED knobs — the design
 * call of record (derive-tune iteration 2 of the §Triumvirate 3-halt; the
 * measured ramps for an oklch(0.72 0.19 145) seed ground the choice):
 *   - `harmony: "triad"` — the deep BASE stop stays SEED-anchored (h≈135 for
 *     a 145° pick — the field still ANSWERS the picker, S-18), while the two
 *     120° partners carry the H variance into the later stops and C spreads
 *     0.07–0.16 zone-to-zone. REJECTED `split-complementary` (iteration 1):
 *     its walk re-anchors the base stop to a complement FLANK (a purple base
 *     for a green pick) — greater variance at the cost of the field's
 *     identity hue, which is noise, not variance.
 *   - `colorEnergy: 0.82` (was 0.7) — the door's one C-variance cluster knob:
 *     lifts saturation + valueVariance + breath + the warm-light/cool-shadow
 *     temperature together (moving any one alone reads as a defect).
 *   - `zones: 6` (was 5) — one more colour zone = more spatial H/C variation
 *     across the field; stays within MAX_NUCLEI and AuroraPane's slider band.
 */
export const DEFAULT_AURORA_ATOMS: AuroraAtoms = {
    harmony: "triad",
    colorEnergy: 0.82,
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
