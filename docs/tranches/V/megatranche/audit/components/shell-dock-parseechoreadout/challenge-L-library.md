# CHALLENGE-L — `ParseEchoReadout.vue` library-boundary audit

Source `demo/shell/dock/ParseEchoReadout.vue`, lines 1–49, SHA-256 `416468fdccb96ab6195e53834968129f020b3244cef981cebcf64d41ef1c82be`. Static review only.

**Verdict: SOURCE-RED.** The leaf is entirely coupled to the global color-model provider, exposes a normalized model readout under an AST-flavored name, and has no typed presentational input or shared status primitive.

## Findings

- `inject(COLOR_MODEL_KEY)!` is the only data boundary; provider presence is asserted, not modeled.
- The component cannot be rendered/tested with a self-contained normalized-color result because it reaches directly into the full color-model port.
- `astEcho` and `gamutVerdict` are synchronous computeds over the same current model color, so they are coherent today; however, the boundary carries no explicit model revision if either computation later becomes asynchronous or independently cached.
- Styling and status semantics are hand-authored rather than using a shared instrument/status primitive.
- The part array is rendered as untyped strings; channel identity, numeric value, unit, normalized-color provenance, and diagnostic role are lost before presentation. Original CSS syntax and parse provenance have already been discarded upstream.
- Invalid-input status is owned separately by parent `ColorInput.vue`; the leaf boundary cannot represent or associate that state with the still-visible normalized readout.

## Target boundary

Pass a validated `NormalizedColorReadoutModel` that binds model revision, typed channel IDs/values/units, gamut status, mapping note, and the relevant parent input-error relationship. Separate provider adaptation from presentation and consume a shared live/status primitive for announcement and severity; do not label regenerated normalized channels as an AST or recovered source syntax.
