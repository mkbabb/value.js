# CHALLENGE-D — `ParseEchoReadout.vue` design audit

## Receipt

Source `demo/shell/dock/ParseEchoReadout.vue`, lines 1–49, SHA-256 `416468fdccb96ab6195e53834968129f020b3244cef981cebcf64d41ef1c82be`. Source-only tranche audit.

**Verdict: SOURCE-RED.** The terse normalized-color/gamut readout is a useful instrument trace, but it is presented as though it preserved parse structure, is not associated with the parent-owned invalid-input feedback, and makes gamut status too quiet for consequential feedback.

## Findings

1. Under the current provider, `astEcho` and `gamutVerdict` are always-present synchronous computeds over the same `model.value.color`, so the root and both branches are effectively unconditional. The conditional template advertises absent/partial states the producer cannot emit and supplies no explicit provider-failure state.
2. The label `astEcho` overstates what survives: the producer regenerates a space name and fixed channel strings from normalized model color. It does not preserve the original CSS spelling, parse tree, token boundaries, or parse provenance.
3. “outside srgb gamut” is an important warning but appears in the same quiet caption register as successful parse metadata; it has no mapping/clipping consequence or recovery action.
4. Updates are not a live region, so committed input or other model changes may change normalized/gamut truth without assistive announcement. The parent delays ordinary input parsing by two seconds and handles Enter immediately, so this is not a per-keystroke readout.
5. The emitted strings are bounded and mechanically formatted, but their channel identity, numeric value, and unit are flattened into presentation strings. The fixed terse notation remains unexplained to users unfamiliar with the channel model.
6. The amber color is supplementary but its contrast and forced-colors behavior remain unproven.
7. Invalid-input feedback exists in the parent `ColorInput.vue`, not this leaf. The readout has no explicit relationship to that feedback, so its last valid normalized value can remain visible while the parent alone reports the rejected input.

## Target gestalt

Treat this as a normalized-color instrument strip: name the model space honestly, present typed channel/value/unit fields, bind the current model revision, associate the parent-owned invalid-input state, and explain gamut mapping consequences. Announce only committed changes. Audit every normalized space, malformed parent input, delayed and immediate commits, slider/model updates, phone/desktop Safari, screen reader, forced colors, and large text.
