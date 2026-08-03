# CHALLENGE-L — `ActionFeedback.vue` library-boundary audit

Source `demo/palettes/browser/card/PaletteCard/ActionFeedback.vue`, lines 1–58, SHA-256 `9b5cbe86976967d366a7386980f4eb94fd5d1795a160fd2a87c098b9393dbdd2`. Source-only.

**Verdict: SOURCE-RED.** The component hand-builds a toast/status primitive from Vue transition plus lucide icons, outside the producer’s alert/toast/result contracts.

## Findings

- Imports are `vue` and `@lucide/vue`; there is no glass-ui alert, toast, live-region, motion, or button primitive.
- `type: "success" | "error"` is too small for retryable, conflict, warning, pending, or informational outcomes.
- Visibility and lifetime are controlled internally while message and severity come from a parent; ownership is split, making replacement/queue policy impossible to reason about.
- The transition class family is globally named and not scoped to a producer motion token or reduced-motion policy.

## Target boundary

A shared `ActionResult` primitive should own severity, accessible role, persistence, optional recovery command, message constraints, and motion. The input should bind an operation/result identity rather than three independent props. Until adopted, this is a local duplicate and the L axis remains red.
