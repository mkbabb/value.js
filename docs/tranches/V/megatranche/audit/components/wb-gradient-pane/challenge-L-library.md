# CHALLENGE-L — `GradientPane.vue` library-boundary audit

## Receipt

Source `demo/workbenches/gradient/GradientPane.vue`, lines 1–29, SHA-256 `193b938edb082f1c62fc623788d61d0f717ca56ff4851ab025e8ee84f6169880`. Source-only review; commands against the application or packages: **0**.

**Verdict: SOURCE-RED.** The dependency graph is small, but the pane reaches through deep demo paths, declares a dead ambient injection, and exports an untyped imperative facade whose availability is not represented.

## Import and ownership trace

| edge | role | ruling |
|---|---|---|
| `vue` (`inject`, `ref`) | framework | appropriate |
| `../../ui/card` | design-system forwarding barrel | acceptable but hides the producer package/subpath |
| `../../shared/ui/PaneHeader.vue` | demo shell primitive | appropriate |
| `./GradientVisualizer/GradientVisualizer.vue` | owned workbench implementation | appropriate composition |
| `../../color-session/keys` | declared ambient application state | **dead, non-consumed boundary declaration** |

## Findings

1. `inject(CSS_COLOR_KEY)!` declares an undocumented ancestor dependency, but the resulting `cssColorOpaque` is never read. This is dead boundary intent rather than a live input contract; the non-null assertion hides that mismatch from review.
2. The wrapper imports the concrete `GradientVisualizer` rather than a typed gradient-workbench port. That is fine inside the demo, but it prevents isolated reuse and forces all command semantics to be discovered through `defineExpose`.
3. `defineExpose({ reset, copyCSS, seedFromPalette })` forwards `resetGradient`, `copyCSS`, and `seedFromPalette` by optional chaining. The public surface has no declared interface, readiness bit, result type, or error type.
4. The card and header are structural primitives, but the pane does not consume a shared command/result primitive; command feedback can therefore drift from other workbenches.

## Target boundary

Introduce a typed `GradientPaneHandle` whose commands return explicit outcomes, plus a `GradientSession` input containing `status` and `seedColor`. Keep `GradientVisualizer` private. A shared workbench command/result rail should own success, failure, disabled, and pending semantics. Until those boundaries exist and are consumed, this axis remains source-red.
