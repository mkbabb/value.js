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
 */
export const DEFAULT_AURORA_ATOMS: AuroraAtoms = {
    harmony: "analogous",
    colorEnergy: 0.55,
    zones: { count: 4, arrangement: "composed" },
    noise: 0.5,
    medium: { kind: "smooth" },
    motion: "breathing",
};
