# U.W-A11Y · U-F58 (BR-10) — the RTL logical-property audit + BOOKED follow-ups

**Lane**: U.W-A11Y MODALITY. **Disposition**: i18n / RTL → **BUILD (mechanical readiness)** —
`dir` plumbing + the GLOBAL logical-property conversion land in-wave; the per-component physical→
logical conversions are **BOOKED follow-ups** here (this lane owns `demo/@/styles/style.css` +
`demo/color-picker/index.html`; it does NOT cross-edit the component files other lanes own).

## §What landed in-wave (the buildable half)

1. **`dir` plumbing** (`demo/color-picker/index.html`): `<html lang="en">` → `<html lang="en"
   dir="ltr">`. The explicit default-direction seam was ABSENT (`lang` present, `dir` not — the
   registry §16 VERIFIED grep). `dir="rtl"` now flips the whole document.

2. **The GLOBAL layout is RTL-integral by construction** — `demo/@/styles/style.css` uses
   `display: grid` / `flex` + **shorthand** padding (`padding: var(--dock-inset)
   var(--app-padding-x) 0.5rem`) + `margin: 0 auto` + `grid-template-columns`. There is **no
   global physical `left:`/`right:` positioning** to convert (the only `left`/`right` tokens in
   style.css are the SLOT NAMES `.pane-wrapper--left`/`--right`, which carry only `z-index`/
   `display`, and the symmetric `--alpha-checker` `left top` background-position — neither is
   RTL-hostile). So BR-10 **passes on the global layout as-is**: `dir="rtl"` → `scrollWidth ===
   clientWidth` (no horizontal overflow), the dock nav / view-select / main pane all visible +
   within-viewport (measured live at 1280×720, `a11y-web-modality.spec.ts` BR-10).

3. **NOT full string extraction** — single-locale English tool; i18n string extraction is the
   **OUT-OF-SCOPE** half (recorded in the U-F58 decision table). The RTL mechanical readiness
   above is the buildable half.

## §BOOKED follow-ups — per-component physical→logical conversions (do NOT cross-edit here)

These files carry physical properties (CSS `left:`/`right:`/`margin-left` &c. OR Tailwind
`ml-`/`mr-`/`pl-`/`pr-`/`left-`/`right-` utilities) that a FULL RTL pass would convert to logical
(`inline-start`/`inline-end`, `ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`). BR-10 is a **layout-
integrity** gate that passes on the global conversions; these per-component conversions are the
polish tier, booked to the owning lanes (E-3: a real conversion at each root, never a blanket
`[dir=rtl]` override).

**CSS physical-prop files** (grep `left:`/`right:`/`margin-(left|right)`/`padding-(left|right)`/
`border-(left|right)`):

| File (under `demo/@/components/custom/`) | Owning lane | Note |
|---|---|---|
| `gradient/GradientVisualizer/GradientStopEditor.vue` | controls/gradient | stop `left: N%` positioning is DIRECTIONAL data (the gradient's own L→R stop axis) — a deliberate physical axis, evaluate whether it should mirror under RTL |
| `gradient/GradientVisualizer/GradientEasingEditor.vue` | gradient | `.readout-rail` / rail-btn geometry |
| `gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` | gradient | specimen strip offsets |
| `gradient/composables/gradientParse.ts` | gradient | `left`/`right` are gradient KEYWORD tokens (CSS syntax), not layout — likely NO conversion |
| `color-picker/seat.css` | controls | seat offsets |
| `color-picker/ColorPicker.vue` | controls | |
| `color-picker/controls/ColorInput.vue` | controls | |
| `color-picker/controls/ComponentSliders/ComponentSliders.vue` | controls | |
| `color-picker/visual/PointerDebugOverlay.vue` | (dev-only overlay) | dev tooling — lowest priority |
| `color-picker/display/ColorComponentDisplay/ColorComponentDisplay.vue` | display | readout cell geometry |
| `palette-browser/card/CurrentPaletteEditor.vue` | palette-browser | |
| `markdown/Markdown.vue` | markdown | docs body — `pl-0`/`mr-2` list/inline |

**Tailwind physical-utility files**: 13 files under `demo/@/components/custom/` carry
`ml-`/`mr-`/`pl-`/`pr-`/`left-`/`right-` utilities (e.g. `panes/AdminPane.vue:5 ml-2`,
`mix/MixSourceSelector.vue:153 right-1`, `image-palette-extractor/ImageDropZone.vue:58 right-1`,
`gradient/.../PerceivedSpacePlate.vue:237 right-2`). A full RTL pass swaps these to the logical
`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-` variants.

**Disposition**: booked to the component-owning lanes / a future i18n wave. BR-10's
layout-integrity gate does not require them (the grid/flex shell mirrors correctly; these are
per-control offsets whose mirroring is polish, and some — the gradient stop axis, the CSS
`left`/`right` gradient keywords — are DIRECTIONAL-by-intent and may correctly NOT mirror).
