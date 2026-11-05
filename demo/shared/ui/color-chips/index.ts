/**
 * color-chips — the T-17 preview-chip module (T.W6 · W6-4; born colocated,
 * E-1: ONE focused common module for the multi-feature chip grammar, never
 * a per-pane copy).
 *
 * Two chip forms, one sampling law (t-nav-dropdowns F5–F7):
 *   - STRIP  (discrete)   — generate preset/harmony + AuroraPane harmony;
 *   - RAMP   (continuous) — gradient/mix space + hue-method rows.
 *
 * CONSUME MAP (read from the tree, X realization V-D3 · BC-R-22): the RAMP's
 * consumer is `InterpolationFields.vue` (the gradient and mix Space / Hue
 * rows; MixConfigBar seats it); the STRIP's are `GenerateControls.vue`
 * (preset + harmony rows) and `AuroraPane.vue` (admin harmony). The
 * GradientVisualizer consume was NEVER wired, and X-W6 recorded why: the
 * visualizer shows the real gradient, so a ramp there is redundant.
 *
 * `data-stops` (BC-R-24) is the O-14 public test contract on a data surface:
 * every chip stamps its stop list there, and the e2e reads it. It is a
 * named contract (demo/DESIGN.md §4.2), not scaffolding.
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
    stopsToGradient,
} from "./sample";
