# CHALLENGE-L — `PointerDebugOverlay.vue` library-boundary audit

Source `demo/picker/visual/PointerDebugOverlay.vue`, lines 1–286, SHA-256 `5529d0384c46234b0e1c09cb1f81a99f12deb6f6d3ee9ba08ae4d6cfa9c56a27`. Static review only.

**Verdict: SOURCE-RED.** The overlay bypasses the design system and takes an implicit global debug provider plus direct browser globals as its library contract.

## Findings

- Imports are Vue, `POINTER_DEBUG_KEY`, and local `DebugEventLog`; all sheet/disclosure/button/status/scroll styling is hand-authored.
- `inject(POINTER_DEBUG_KEY)!` makes the provider mandatory but undocumented and has no disabled/unavailable branch.
- The view directly owns export schema, environment capture, clipboard transport, fallback DOM mutation, and feedback timers. Those are separable services.
- `Teleport to=body` is fixed and unconfigurable; host applications cannot choose a debug portal or avoid collisions with other overlays.
- Gauges and normalized pointer events are copied from mutable provider state without a versioned export snapshot schema or snapshot identity.

## Target boundary

Split into `PointerDebugSnapshot` producer, versioned exporter, clipboard service, and a producer-owned diagnostic sheet. Pass portal target and visibility explicitly. The surface should consume normalized rows, not interrogate global browser state during export.
