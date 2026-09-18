# CHALLENGE-C — `ParseEchoReadout.vue` implementation audit

Source `demo/shell/dock/ParseEchoReadout.vue`, lines 1–49, SHA-256 `416468fdccb96ab6195e53834968129f020b3244cef981cebcf64d41ef1c82be`. Static source inspection only.

**Verdict: SOURCE-RED.** The component trusts an ambient provider, erases typed channel identity, and presents normalized model data without its relation to the parent-owned input-error state.

## Findings

1. Provider absence causes immediate destructuring failure.
2. `v-for` keys each part by its full string value. The current producer emits one channel-key-prefixed string per unique `PICKER_CHANNELS` entry plus optional alpha, so duplicate keys are not presently reachable; nevertheless, the rendering boundary has no stable typed channel ID independent of formatting.
3. `astEcho` and `gamutVerdict` are synchronous computeds from the same `model.value.color`, so stale or partial pairs are not presently reachable. The leaf has no explicit revision contract to preserve that invariant if producer mechanics change.
4. Both values are always present under the current provider, making the root and branch conditionals redundant rather than meaningful absent/partial-state handling.
5. Invalid-input feedback exists in parent `ColorInput.vue`; this leaf neither consumes nor associates it. A rejected edit can therefore leave the last valid normalized readout visible while the parent alone shows “not a valid color.”
6. Updates have no live-region/atomic policy. Ordinary text input is trailing-debounced for two seconds and Enter commits immediately, while slider and other model changes can also update the readout; the risk is unannounced committed/model churn, not every keystroke.
7. The producer emits bounded, fixed-format strings, but flattening channel key, numeric value, and unit prevents typed rendering and discards the original input spelling and parse provenance. Unknown spaces would fail upstream at the `PICKER_CHANNELS[color.space]` lookup rather than reach a leaf fallback.

Closure requires a revision-bound normalized-color result, stable channel IDs/types, explicit association with the parent input-error state, a provider guard, typed rendering, and announcement tests across delayed input commits, immediate Enter commits, and other model updates.
