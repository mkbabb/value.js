# CHALLENGE-D — `DebugEventLog.vue` design audit

## Receipt

Source `demo/picker/visual/DebugEventLog.vue`, lines 1–136, SHA-256 `61b8aaee894e344df847a113e7960abd5fb0f9a5ee8c9f1182c60386edfb6b3f`. Source-only audit.

**Verdict: SOURCE-RED.** The log is useful developer instrumentation, but it is visually encoded as an unlabelled stream and is not yet an operable diagnostic surface.

## Findings

1. Six facts are compressed into wrapped spans without column headers, row semantics, or a selectable/copyable inspection path.
2. Timestamp units and origin are not labelled; `0.42` could mean elapsed seconds, wall time, or event time.
3. Event significance relies on hard-coded red/orange/blue/green backgrounds and abbreviations such as `CAP`; forced-colors and color-vision behavior are unowned.
4. Newest-first ordering is not stated, and the count gives no retained/total/dropped distinction.
5. The whole section has `pointer-events:none`, preventing text selection and focused inspection even though the data exists to debug failures.
6. Long targets are truncated at 120 px with no expansion or title; the most diagnostic identifier can disappear.

## Direction

Use a compact trace table with explicit relative time, type, pointer, capture, target, and detail columns; severity icon/text; pause/filter/copy controls; and a bounded retention notice. Audit empty/one/many/dropped events, every event family, long targets, phone/desktop, forced colors, screen reader, and high-frequency updates.
