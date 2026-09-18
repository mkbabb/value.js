# CHALLENGE-C — `ActionFeedback.vue` implementation audit

Source `demo/palettes/browser/card/PaletteCard/ActionFeedback.vue`, lines 1–58, SHA-256 `9b5cbe86976967d366a7386980f4eb94fd5d1795a160fd2a87c098b9393dbdd2`. Static inspection only.

**Verdict: SOURCE-RED.** Timer lifecycle and update semantics are incomplete; the component can miss initial visibility, leak callbacks, or hide a newer result with an older timer.

## Findings

1. The `watch` that starts dismissal is not immediate. If the component mounts with `visible=true`, no timer starts.
2. The timeout handle is retained and cleared when visibility changes, but it is not cleared on unmount.
3. Repeated `visible=true` updates do not necessarily retrigger the watcher; a new message can inherit an old timer.
4. A later result can be hidden by the timeout scheduled for an earlier result because no operation/result identity is captured.
5. Both success and error emit the same `update:visible=false` after a fixed duration; the parent cannot distinguish automatic expiry from user acknowledgement.
6. Empty messages are renderable and no accessible announcement is implemented.

## Required verification

Initial true mount, rapid success→error replacement, repeated same-boolean results, unmount before timeout, two concurrent cards, empty/long message, reduced motion, and assistive announcement. A monotonic result ID and cancellable timer are mandatory before implementation closure.
