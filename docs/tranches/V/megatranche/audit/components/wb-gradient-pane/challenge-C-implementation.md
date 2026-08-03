# CHALLENGE-C — `GradientPane.vue` implementation audit

## Receipt

Source `demo/workbenches/gradient/GradientPane.vue`, lines 1–29, SHA-256 `193b938edb082f1c62fc623788d61d0f717ca56ff4851ab025e8ee84f6169880`. Static inspection only; no implementation or runtime execution.

**Verdict: SOURCE-RED.** The component can silently turn three public commands into no-ops, while its declared ambient-color dependency is dead code.

## Findings

1. `inject(CSS_COLOR_KEY)!` assigns `cssColorOpaque`, but the variable is never read. The component advertises ambient color coupling without consuming the value.
2. `visualizerRef.value?.resetGradient?.()`, `?.copyCSS?.()`, and `?.seedFromPalette?.()` silently succeed from the caller’s perspective when the child or method is unavailable. A command invoked before mount, during conditional removal, or after teardown has no receipt.
3. `seedFromPalette` supplies no explicit palette or color argument and records neither the source chosen by the child nor whether the child accepted it. Repeated calls cannot be causally audited.
4. The exposed functions return `void`, so copy denial, clipboard failure, invalid gradient state, and reset completion cannot be represented.
5. The wrapper owns scrolling and fades while the child owns content height. There is no explicit scroll-to-selection or focus-restoration contract after an imperative command.

## Required verification contract

- dead ambient-color injection must be removed or become an explicit, consumed input with a defined unavailable state;
- pre-mount/post-unmount command calls must return `UNAVAILABLE`, never disappear;
- copy/reset/seed must return typed receipts binding command, input, result, and affected state;
- command completion must preserve focus and bind the exact seed source without mutating unrelated color state;
- narrow-height and keyboard-obscured layouts must keep the selected control reachable.

No product fix is authorized by this report.
