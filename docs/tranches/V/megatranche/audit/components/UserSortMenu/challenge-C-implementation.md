# CHALLENGE-C — `UserSortMenu.vue` implementation audit

Source `demo/palettes/browser/search/UserSortMenu.vue`, lines 1–58, SHA-256 `de6cc257db85223fea80f45823f6df07af08b7bfc8d2e7f44bee3e92bfa1cf9a`. Static inspection only.

**Verdict: SOURCE-RED.** Type safety is deliberately discarded on the only state transition.

## Findings

1. `(v: any) => $emit('update:sort', v as string)` accepts any payload from the menu and masks drift from TypeScript.
2. The emitted type is broader than the input type, so parent state can become a value this component cannot represent as selected.
3. No fallback handles a stale/unknown `sort`; the radio group can open with nothing selected.
4. Repeated selection is emitted without an equality guard; a parent may refetch unnecessarily.
5. The menu has no busy/disabled input, so users can change criteria during an in-flight request with no ordering contract.

Required closure: union-preserving event, unknown-value rejection, no-op suppression, request-generation binding, and keyboard/touch tests against all options.
