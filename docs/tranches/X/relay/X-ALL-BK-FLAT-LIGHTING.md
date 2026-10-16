# value.js (for value.js, keyframes.js and fourier) → glass-ui (BL) · O-87 · 2026-10-06 · FLAT-LIGHTING: the owner orders the glass surfaces de-slopped at the root

**The owner, verbatim (2026-10-06):** *"the cube and other items in ALL of our UIs (value, keyframes, fourier) are OVERLY shaded, lighted and reek of affectation and slop. Do at least 12 critical passes to abrogate this, clean it up, and refine and revive our original styles hereof--this note should be made and done for glass-ui, too. The original keyframes.js ui was flatly lit and proper design and so forth"*. Frame: value.js `docs/tranches/X/waves/owner-2026-10-06/kf-floating-eye-overlit.png`.

## The canon (value.js `docs/tranches/X/waves/X-DS.md`)
- Flat lighting: no specular, gleam, inner top-light bevel, rim light, glow halo, coloured drop-glow or multi-layer shadow stack on chrome.
- One quiet neutral shadow at most, and only on truly floating surfaces.
- Flat fills with no decorative gradients on controls.
- No idle shimmer, pulse or breathe.
- Every glyph anchored to its control.
- Identity colours and type kept.

## Ask (the owner's own order to glass)
Run the **same canon and at least 12 critical passes** on glass's surfaces and tokens:
- elevation and shadow tokens, gleam and specular, glow, inset highlights;
- button and DockControl press-light, the dock plate, Card, Configurator, popover and menu plates;
- the glass material's lighting and the dark-mode ladder.
Default to flat at the token level, so consumers inherit it. Where an effect is a deliberate opt-in, it is an explicit prop, never the default. This is a design pass with its own frames per pass. Landing: glass rules the version. The owner wants it soon, so if 10.2.0 is still uncut, the token-level flattening is a candidate for it.
Consumers are running the same canon now on their own CSS (X-DS) and will not override glass lighting locally; glass-owned excess stays honest-RED on our side until it lands.

## Addendum 2026-10-16 (value.js X-DS pass 7, critic V7R): the floaters, opened for the first time
Until pass 7 no X-DS frame or census cell opened an overlay, so glass's floaters went unjudged. Two rows for glass, plus one cross-reference:
- **V7R-01 · the menu chunk has no overlay layer (a layering defect, with O-80's dock family).** In glass 10.1.0, `DropdownMenuContent` (`data-slot=menu-content`, the glass-overlay-plate) computes `z-index: auto`, so reka's popper wrapper is `position: fixed` with `z-index: auto`. `SelectContent` and `PopoverContent` carry `z-popover` (130). Any consumer ancestor with a z-index outranks the portaled menu. In value.js, `.pane-wrapper--stage { z-index: 1 }` buried the Browse card's "..." menu and the 390 overflow menu under the stage pane, while reka's modal layer still routed clicks to the hidden items. **Ask:** `DropdownMenuContent` (and its sub-content) take `z-popover`, as Select and Popover do. **Interim, consumer side:** value.js adds glass's own `z-popover` utility to its 6 `DropdownMenuContent` call sites (a layer token, not a lighting override) and drops it at the repin. Measured: wrapper z `auto` → `130`; paint-top 5/5 at 1440 and 390, in both schemes.
- **V7R-02 · the select plate's 9-layer stack.** `[data-slot="select-content"]` stacks `--glass-material-rim` (3 inset rims), `--glass-under-shadow-vivid`, `--glass-shadow-floating` (2 layers and a 0.5px ring) and `--shadow-cartoon-lg` (the stepped -4/-7/-11px extrusion), on a `linear-gradient` capsule-wash fill. The highlighted row is a blurred band. **Ask (under this O-87 canon):** a true floater gets one quiet neutral shadow or the single hard offset, not both stacked, on a flat fill, with a flat tone step for the highlighted row. This stays honest-RED on our side until the 10.2.0 repin.
- **V7R-04** (opening a card menu folds the expanded dock into its seal) is cited under **O-88 DOCK-COLLAPSE-MOTION**.

## Addendum 2026-10-16 (value.js X-DS pass 8, critic V8C): the select floater over content, and the wide trigger's shape
Two glass rows; value.js does not override either locally.
- **V8C-03 · the select floater over high-contrast content (adds to V7R-02).** In the colour-space menu at 1440 (value.js `pass-08/p8-2026-10-16/mix-select-1440-*.png`), `SelectContent`'s material is translucent enough that the spectrum's black-to-red field under it shows as a muddy brown cloud across the HSV, HWB and Lab rows. The muted mono captions over it fall to near-illegible (the HWB row in light). The selected and highlighted `SelectItem` also carries three signals at once: the accent dot, a ~1.5 px rim ring and a darker tone fill, which together read as a bordered button inside the menu. **Ask:** a floater over high-contrast content gets a denser plate (or the "slightly less blur" token), so that muted ink keeps its floor; the highlighted row keeps ONE signal (the dot or a tone step, not a ring plus a fill). Honest-RED until the 10.2.0 repin.
- **V8C-04 · wide SelectTriggers are full stadium pills (single-edge refinement; O-58's radius table is the precedent).** `SelectTrigger` takes the control role radius (`--radius-control`, pill) at every width. In value.js the 328 × 36 px Atmosphere selects (Harmony, Arrangement, Medium, Motion), Mix's Color space and Hue method, Generate's Preset and Harmony, and Gradient's full-width selects at 390 are all capsules. The owner ruled that the large dropdowns "should not be so rounded" (OA-54). **Ask:** a wide, field-holding `SelectTrigger` takes `--radius-field`, as glass's own radius table gives large holders. No consumer restyle; re-judged at the repin.
