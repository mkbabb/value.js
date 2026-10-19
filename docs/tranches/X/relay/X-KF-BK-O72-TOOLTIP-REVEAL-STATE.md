SERVED MODEL: claude-opus-5-5

# O-72 — glass Tooltip content never plays its reveal (TOOLTIP-REVEAL-STATE)

**From**: value.js X.KF.W13V Repair 1 (Track B), 2026-09-24. **To**: glass-ui (BK coordination; BL). **Beside**: O-60 / O-69 (the KFA letter). E-3: a new dated letter, nothing earlier amended.

## What the served page shows

keyframes.js demo, glass 10.0.1 installed, dev server, headed Chromium 1440x900. Hovering the transport's Play/Pause button opens a glass `<Tooltip>`. The capture script is `docs/tranches/X/keyframes/evidence/W13V/k/critic/gaps.mjs` (leg B), run twice. It samples `[data-slot="tooltip-content"]` on every animation frame.

- Run 1: the content first paints at 198 ms, already at `opacity: 1`, `scale: none` and `translate: none`, with no animation on the element. `data-state` is `delayed-open` on every frame.
- Run 2: first paint at 186 ms, with the same readings.

The tooltip pops in. It does not play the reveal that `data-reveal="tooltip"` configures (`--enter-tooltip-spring` / `-clock` / `-scale` / `-blur`).

## Cause (read at glass bytes)

- `styles/glass/reveal.css` puts the whole entrance on `.glass-reveal[data-state="open"]`: the `@starting-style` scale, opacity, blur and the per-side `translate`. The same is true at glass HEAD `f4946674` (`src/styles/glass/reveal.css:136` and `:225-243`).
- reka's `TooltipContent` never writes `data-state="open"`. It writes `delayed-open` or `instant-open`, and `closed`. ⟨`grep -rn "delayed-open\|instant-open" glass-ui/src`⟩ → 0.
- So the tooltip row of the reveal register never matches. Only the `closed` leg applies.

## The ask

Key the open leg on every open state the primitives write, for example `[data-state="open"], [data-state="delayed-open"], [data-state="instant-open"]`, or have the tooltip content project one `open` attribute. Keep `instant-open` either instant or short, as the register decides.

keyframes will not copy anything locally. The consumer reads this id as honest-RED **TOOLTIP-REVEAL-STATE** until a pinned glass cures it.
