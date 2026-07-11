/**
 * color-chips — the T-17 preview-chip module (T.W6 · W6-4; born colocated,
 * E-1: ONE focused common module for the multi-feature chip grammar, never
 * a per-pane copy).
 *
 * Two chip forms, one sampling law (t-nav-dropdowns F5–F7):
 *   - STRIP  (discrete)   — generate preset/harmony + AuroraPane harmony;
 *   - RAMP   (continuous) — gradient/mix space + hue-method rows.
 *
 * CONSUME MAP (the W6 single-writer law): Lane D wires MixConfigBar +
 * AuroraPane; the GenerateControls consume routes through Lane N's queue
 * and the GradientVisualizer consume through Lane G's queue (Lane D
 * authors the module + spec — `docs/tranches/T/audit/w6-lane-d-record.md`
 * §T-17 carries the handoff spec).
 *
 * THE RESTRAINT TABLE (F7 — which dropdowns get NO previews): the dock
 * view-select (T-10 governs it); gradient TYPE (geometry); mix
 * size-mismatch strategy (count semantics); sort/filter/user-sort menus
 * (metadata); the easing preset select (curve domain — the T-22 lane owns
 * any curve-thumbnail grammar); the picker's space catalog keeps its
 * existing dot+specimen form (one color through 17 notations — a ramp
 * would be FALSE there). Triggers stay text-only everywhere: menus
 * preview, triggers name (the "in proportion" half).
 */
export { default as PreviewRamp } from "./PreviewRamp.vue";
export { default as PreviewStrip } from "./PreviewStrip.vue";
export {
    RAMP_SAMPLE_COUNT,
    sampleInterpolationRamp,
    serializeStop,
    stampStops,
} from "./sample";
