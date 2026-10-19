# F.W14V `.pd` — receipt (addendum (f), COHESION §0dx) · seat `claude-opus-5-5`

**Owner (2026-09-25):** *"this dock is still wrong and has floating elements"*. Frame: `../owner-2026-09-25/playback-dock-floating.png`.

## Verdict: GLASS ROOT. The consumer half is measured clean. The collapsed bit is honest-RED DOCK-SUMMARY-SQUARE (O-84).

## Measurement (fourier `/visualize` and `/v/<seed>`, `AnimationControls.vue`, glass 10.1.0, :3100 → API :8000)
- **Reproduced exactly** (`/w/placid-stirring-opal-viper`, 1440 dark, collapsed). The plate `.dock-plate` spans 451–553 (102 px = 8 pad + 40 `#persistent` + 6 gap + 40 summary + 8). The summary layer `.dock-layer--summary` is 505–545. The 48 px `.mini-progress` runs 498–546. The `Metric` box is 0 px wide; `metric__value` sits at 552–582 and `metric__unit` at 587–596: **off the plate**. The same shape holds at 1024 (plate 279–381, value 380–408) and at 390 (plate 140–250, value 247–284), in light and dark.
- **Root:** glass `src/components/dock/styles/morph.css:180-198` (identical in the 10.1.0 dist and at HEAD `67ec885d`) sets `.glass-dock .dock-layer--summary { min-width: 40px; block-size: 40px; height: 40px; aspect-ratio: 1 }`.
  - `aspect-ratio: 1` resolves the `auto` inline size to the block size, and the explicit `min-width` turns off the content minimum. The summary is therefore a 40 px square whatever it holds.
  - The root is sized from that square, and so is the plate. Its own comment names the intent: "1:1 even if a consumer's collapsed-slot content is wider than the floor".
  - It is the collapsed summary's width, the glass geometry branch of the spec. It is not the `#persistent` placement (the Play/Pause face sits on the plate at every cell), and it is not `--animation-dock-max-width` (that sizes only `.expanded`).
- **Diagnostic (in page, not shipped):** content-sizing only that rule (`aspect-ratio: auto; inline-size: max-content`) puts every element on the plate at all 6 cells (1440 plate 418–586; 390 plate 112–278). `--dock-collapsed-px` follows, because `dockMorphMeasure.ts` reads the root's border box. **No consumer byte changed**, so no consumer cure exists to make. Overriding the square in fourier would be the shim the law forbids.
- **Expanded:** every element is on the plate at all 6 cells. The timeline caret (`t = …`) is its own `glass-floating` surface, shown only while the timeline is hovered, focused or scrubbed, and the falsifier skips it.

## Falsifier: fourier `web/e2e/f-w14v-pd.spec.ts` (commit `330fa09`)
Every painted element of the dock lies inside `.dock-plate`, in 12 cells: {1440, 1024, 390} × {light, dark} × {collapsed, expanded}.

| run | shipped bytes (glass 10.1.0) | `FW14V_PD_GLASS_CURE=1` (proposed glass rule injected) |
|---|---|---|
| 1 | 6 RED (all collapsed: `metric__value`/`metric__unit` outside) · 6 GREEN (expanded) | 12 GREEN |
| 2 | 6 RED · 6 GREEN (identical) | 12 GREEN |

The spec therefore goes GREEN when only glass's rule changes, and stays RED until then. The collapsed cells stay **honest-RED**; they are not marked `fail`.

## Gates
- `vue-tsc --noEmit`: 0.
- vitest: 20 files, 116/116.
- No product source changed in fourier.

## Frames (this directory)
- `before-{collapsed,expanded}-{1440,1024,390}-{light,dark}.png`: the shipped bytes. `before-collapsed-1440-dark` matches the owner frame.
- `glass-cure-sim-*.png`: the same cells with the proposed producer rule injected by the spec.

## Relay
- **O-84 DOCK-SUMMARY-SQUARE** is at glass `docs/tranches/BK/coordination/valuejs-outbound-2026-09-25-dock-summary-square.md`, mirrored at `docs/tranches/X/relay/X-F-BK-DOCK-SUMMARY-SQUARE.md`. Its INBOX row is O-84, and glass-ui-f3 was messaged. It measures the root of O-65 DOCK-COLLAPSED-FORM: BL's INBOUND-MAP had guessed the absolute inactive layer.

## Open
- DOCK-SUMMARY-SQUARE stays honest-RED until glass ships the cure (D2 / 10.2.0 band), then the repin re-reads `f-w14v-pd.spec.ts`.
- Observed but outside `.pd`: glass's `Metric` paints the `1` value in a ~29 px box, so the `×` sits visibly apart from it. That is glass's Metric anatomy (OA-57 kept it as glass paints it), and it is not relayed here.
