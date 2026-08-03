# CHALLENGE-D — `ActionFeedback.vue` design audit

## Receipt

Source `demo/palettes/browser/card/PaletteCard/ActionFeedback.vue`, lines 1–58, SHA-256 `9b5cbe86976967d366a7386980f4eb94fd5d1795a160fd2a87c098b9393dbdd2`. Static tranche audit only.

**Verdict: SOURCE-RED.** The success/error chip is visually neat but treats all outcomes as disposable celebration, including failures that need attention and recovery.

## Findings

1. Success and error share the same auto-dismiss lifetime and animation grammar. An error can disappear before the user reads or acts on it.
2. The message has no source-level live-region semantics, severity role, recovery action, or relationship to the command that produced it.
3. Color and icon carry most of the success/error distinction; message quality is entirely caller-dependent.
4. The compact absolute/inline placement contract is unstated. Long or localized messages can overlap card content or exceed the viewport.
5. Celebration motion has no explicit reduced-motion design in this file.

## Target gestalt and state matrix

Use a restrained “result ledger” anchored to the action: success may decay after acknowledgement; error persists with keyboard-focusable Retry/Dismiss; conflict identifies the changed entity. Audit `hidden`, `success-short`, `success-long`, `error-retryable`, `error-terminal`, rapid replacement, reduced motion, keyboard, screen reader, phone, and desktop. No product or runtime credit is claimed.
