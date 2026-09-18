# CHALLENGE-C — `DebugEventLog.vue` implementation audit

Source `demo/picker/visual/DebugEventLog.vue`, lines 1–136, SHA-256 `61b8aaee894e344df847a113e7960abd5fb0f9a5ee8c9f1182c60386edfb6b3f`. Source-only.

**Verdict: SOURCE-RED.** High-frequency event updates trigger full copies and unstable identity, while classification is substring-dependent.

## Findings

1. `computed(() => [...events].reverse())` copies and reverses the retained log on every reactive update. The producer caps it at 80 events, so this is bounded O(80), not an unbounded-growth defect.
2. `:key=i` keys by reversed position. Prepending a new event changes every row identity, causing DOM reuse against different events.
3. `eventClass` uses ordered substring checks. An event containing more than one token is classified by incidental order; renamed or mixed-case events silently lose styling.
4. `(evt.ts / 1000).toFixed(2)` assumes finite millisecond values and a meaningful shared origin.
5. The producer normalizes and truncates `target` to 40 characters, but optional `extra` remains an unbounded string at this boundary.
6. Events are visual only; no log/table semantics or update announcement strategy exists.

Closure requires stable event IDs, typed event kinds, clock validation, derived rows without full identity churn, an `extra` bound, and performance profiling at the maximum retained 80-event rate.
