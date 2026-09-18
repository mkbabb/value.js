# CHALLENGE-L — `DebugEventLog.vue` library-boundary audit

Source `demo/picker/visual/DebugEventLog.vue`, lines 1–136, SHA-256 `61b8aaee894e344df847a113e7960abd5fb0f9a5ee8c9f1182c60386edfb6b3f`. Static review only.

**Verdict: SOURCE-RED.** The leaf is correctly typed to `PointerDebugEvent` but implements a second, local log/table/color system with no shared diagnostics boundary.

## Findings

- The only dependencies are Vue and a type from `usePointerDebug`; presentation is entirely hand-authored.
- `PointerDebugEvent` is a producer/composable type, not a normalized view model. The component interprets event type strings by substring, coupling color semantics to naming folklore.
- No shared code/log/table primitives own monospace typography, columns, severity, truncation, or copy/export.
- Event retention, ordering, clock origin, and dropped-count semantics are absent from the input contract.

## Target boundary

Have the debug producer emit typed event kind/severity and a trace snapshot `{events,total,dropped,clock}`. Feed a shared diagnostic trace/table primitive. This keeps the visual leaf free of string classification and makes non-pointer diagnostics reusable.
