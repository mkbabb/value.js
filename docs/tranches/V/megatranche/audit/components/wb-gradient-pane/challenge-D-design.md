# CHALLENGE-D — `GradientPane.vue` design audit

## Receipt and boundary

- Source: `demo/workbenches/gradient/GradientPane.vue`, lines 1–29, SHA-256 `193b938edb082f1c62fc623788d61d0f717ca56ff4851ab025e8ee84f6169880`.
- Coordinate: HEAD `e01d0065fa6c7c80282280566af2b9a4add809bf`, tree `a28eb1a79ee695ce77699ab70e14b2feb7ec5ba5`.
- Method: source-only tranche development. Browser, product, API, package, and runtime commands: **0**.

**Verdict: SOURCE-RED.** The pane is a clean visual shell, but its own contract does not distinguish unavailable, initializing, ready, empty, or failed gradient work. The surface therefore cannot yet be called a complete design.

## Findings

1. **The hierarchy is legible but incomplete.** `PaneHeader` correctly says “Gradient” and explicitly describes “Build gradients with per-interval easing and CSS output.” The missing layer is current provenance/state: whether the gradient is seeded, modified, exportable, or failed remains delegated and invisible at the pane boundary.
2. **All three exposed commands are invisible at this boundary.** `reset`, `copyCSS`, and `seedFromPalette` are exposed programmatically, while the pane itself expresses no command availability, confirmation, or failure language. A parent can invoke work the user cannot see or understand.
3. **The intended seed provenance is disconnected.** The file injects `CSS_COLOR_KEY` as `cssColorOpaque` but never reads it, while the exposed `seedFromPalette` command supplies no explicit input. The design cannot tell the user which color will seed the gradient or whether the ambient color matters at all.
4. **Mobile composition is unproven.** `h-full`, `overflow-y-auto`, and a bottom fade create a scroll affordance without a safe-area or keyboard-obscuration contract. The fade can also suggest hidden content when the visualizer is simply empty.
5. **The pane has no signature of its own.** The strongest direction is an “instrument sheet”: a compact provenance line (seed/current color), the visual gradient as hero, and a persistent export/reset command rail with visible result feedback—not another anonymous card wrapper.

## Required state product

| state | required design truth | current source truth |
|---|---|---|
| initializing | stable skeleton preserving visualizer geometry | absent |
| ready/idle | gradient, provenance, available actions | delegated/implicit |
| editing | active stop/easing and keyboard focus visible | delegated/unbound |
| empty/unseeded | explicit invitation to seed or add stops | absent |
| copy success | persistent, named confirmation | absent at pane boundary |
| failure | non-destructive diagnosis and retry | absent |
| mobile keyboard/safe area | controls remain reachable | unproven |

## Closure condition

This D axis closes only when the parent/visualizer contract supplies the seven states above, with focus, reduced-motion, and narrow-width proofs. This report grants no execution or product credit.
