# KF.W13X `.dh` design brief: Easing, Spring, Sequence (§0dz, addendum (e))

This brief comes from served frames of the before bytes. That is keyframes `1961be80` on dev and on a gh-pages build, at 1440×900, 1024×768 and 390×844, in light and dark. The frames are in `docs/tranches/X/keyframes/evidence/W13X/sq-dh/before-*`. The owner frame is `owner-2026-09-25/sequence-square-frame.png`.

The view has three parts in every scene:
- **Stage**: the glass `Card` in the stage cell.
- **Pane**: the controls rail on desktop, or the sheet on a phone.
- **Ribbon**: the shared `PlaybackRibbon`, which this brief leaves unchanged.

Identity colours, type and motion stay as they are (§0dm): the violet `--color-progress`, the Instrument-Serif display title, the per-row tones, the cascade and the boot.

## What the before frames show

| View | What a glance finds at the before bytes |
|---|---|
| **Sequence** | The stage card itself is clean: the 0 px-radius bordered plate in the owner frame (`.sq`) is already gone at `e4142dd9`. The Timeline pane is not under a glass section. Its header is an uppercase mono caption, `5 ITEMS · 1940 MS`, set as a title, with the reset floating at its right. Each lane label prints the index in foreground ink and `@ms` in muted ink: two registers on one row, the owner's "two competing stacks". At 1024 the stage lanes (0.55 rem pitch) are barely larger than the pane. |
| **Easing** | The subject is the specimen gallery (OD-7 P-GALLERY), and it already dominates. The pane is a quiet card that holds the `EasingPicker` on its default **card** surface, which nests a second tinted plate inside the pane card. There is no section header. The pane runs past the rail's scroll port, so the duration slider sits below the fold at 1440×900. |
| **Spring** | No primary subject. The stage stacks four blocks of equal weight under the header: the target rail with its hint and Re-seat, a stray "Timing-function sweep 0.000" readout row, the "Sampled curve" heading, and a 128 px plot. The plot carries the spring's balls (OA-56), yet it is the smallest block, and the pane card out-sizes it. The title `h2` declares `truncate`. In the pane, the heatmap legend is clipped to "…set by damping alon" at 1440. |

## The hierarchy, per view

### Sequence
- **Primary: the storyboard lanes (`.seq-stage`).** The stage `Card` is the only frame: no inner plate, no second border (the `.sq` bar). The lane pitch rises to 1 rem on desktop so the stage stays the dominant region next to the pane. The phone compression is unchanged.
- **Secondary: the Timeline pane, as one glass `ConfiguratorLayer` named "Sequence".** The reset moves into the layer header (`#actions`, addendum (c)). The lanes form the body.
- **Tertiary:** the summary `5 items · 1940 ms` becomes one muted caption at `text-caption`, a readout and no longer a title. Each lane label is one muted mono caption in one register (`1 @0ms`); the lane tone carries row identity. The ruler and the `ms` unit stay quiet. The header clock `Metric` stays at md beside the title.

### Easing
- **Primary: the specimen gallery (`EasingCatalogue`).** It is already dominant; nothing about it changes.
- **Secondary: the pane, as one glass `ConfiguratorLayer` named "Easing".** It holds the curve editor and its duration. `EasingPicker` moves to `surface="bare"`, so the pane `Card` is the one plate (the same one-frame rule as `.sq`).
- **Tertiary:** the duration `param-row` value and the picker's literal readout stay as they are.

### Spring
- **Primary: the spring response as one `<figure data-subject>`.** The figure is the target rail it chases on, with its hint and Re-seat, plus the plotted trace its balls ride. It takes the card's free height: the plot box grows from a fixed 8 rem to `flex: 1` with an 8 rem floor. The viewBox and `preserveAspectRatio="none"` are unchanged.
- **Secondary: the physics pane**, already a glass `ConfiguratorLayer` with the refresh in `#actions`. The heatmap legend wraps beside its swatch rather than being clipped.
- **Tertiary:** the stray sweep-readout row is deleted. Its value becomes the first clause of the trace's single muted legend: `sweep 0.000 · ζ 0.86 · peak 1.005`. The header (title, the violet position readout, velocity and the status badge) is unchanged. It belongs to `.sections` (`SceneStageHeader`, A2-KE-L1-8), which is in flight.

## Glass primitives used
`Card`, `CardContent`, `ConfiguratorLayer` (with `#actions`), `EasingPicker surface="bare"`, `Metric` and `Button`. No new demo wrappers.

## Falsifiers (served, per view and cell)
- **P1:** within any visible view card (stage, pane, ribbon), no box at least 24×24 has a 0 px radius on all four corners together with two or more visible border sides or a background alpha of 0.03 or more.
- **P2:** the primary subject's visible area is at least that of each other region. The regions are the stage card's other children and every visible pane card.
- **P3:** no consumer element in a view card has `text-overflow: ellipsis` in effect. Glass-owned declarations are counted separately and relayed.
- **P4:** one label register per sequence row (font family, size, weight, colour and transform), on both the stage rows and the pane's lane labels.
- **Diagnostic (not one of the spec's predicates):** a view card cut square by the rail's scroll port.
