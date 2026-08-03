# CHALLENGE-D — `PointerDebugOverlay.vue` design audit

## Receipt

Source `demo/picker/visual/PointerDebugOverlay.vue`, lines 1–286, SHA-256 `5529d0384c46234b0e1c09cb1f81a99f12deb6f6d3ee9ba08ae4d6cfa9c56a27`. Source-only tranche audit.

**Verdict: SOURCE-RED.** This is an important debug surface, but its fixed mobile placement, tiny controls, color-coded state, and broken disclosure relationship make it unsafe as an always-available overlay.

## Findings

1. The header declares `aria-controls="debug-body"`, but no element has that ID. The disclosure’s structural relationship is false.
2. A 280 px fixed overlay at bottom-left can cover essential phone UI and ignores safe-area insets, keyboard, RTL, and drag/reposition needs.
3. The 10 px type and 6 px button padding are too small for extended reading and touch operation.
4. `FROZEN?` blinks every 0.5 s forever; there is no reduced-motion rule and the question mark weakens a diagnostic assertion.
5. Copy success is transient text inside the header without status semantics; failure is never shown.
6. Reset, Copy JSON, and Clear have equal geometry although reset is destructive and can alter the very fault under inspection.
7. Hard-coded black/white/red/blue styling forms a separate visual system and has no forced-colors/high-contrast contract.

## Target gestalt

Treat this as a detachable “flight recorder”: movable/resizable on desktop, full-width bottom sheet on phone, explicit frozen severity, stable tabs for gauges/trace, named controls, and persistent export result. Audit collapsed/expanded/frozen/copied/copy-failed/cleared, empty/high-volume logs, keyboard/touch, phone orientations, desktop Safari, reduced motion, forced colors, and safe areas.
