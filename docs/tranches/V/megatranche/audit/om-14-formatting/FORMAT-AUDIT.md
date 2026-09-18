# OM-14 — THE NUMERIC-DISPLAY FORMATTING CENSUS

**Mark:** `docs/tranches/V/megatranche/audit/visual/owner-marked/OM-14-value-formatting-decimals.png`
**Owner edict (verbatim):** *"we should never display values with so many decimal places. We should have a generalized facility for displaying color values 'pretty' like this with a variable, depending on context, number of decimals, sometimes with no decimals, etc. Audit for all instances of this across all contexts."*

**Method:** SOURCE-ONLY (owner constraint for this pass). No browser, no Playwright, no dev server. Every claim carries `file:line`.
**Seat:** Opus 5 census seat, mega-tranche audit, branch `tranche-u`.
**Scope note:** internal math, CSS-custom-property writes, canvas fills, watch keys and the debug overlay are RECORDED (§2 class OUT) and excluded from the actionable count.

**Spec-citation caveat:** the CSS Color 4 / CSSOM citations in §4 are recalled from memory — no network was used this pass. They are flagged `[VERIFY]` and must be re-checked against the published spec text before any implementation wave consumes them as authority.

---

## §0 — THE CARD'S IDENTITY (the mark, resolved)

The OM-14 screenshot shows an italic display-face `RGB` heading, a soft swatch dot, and a monospace lowercase `rgb(154.029889788152 …` ellipsis-truncated, with the next row (`HSL`) beginning below.

That is **`demo/color-session/ColorSpaceSelector.vue`** — the color-space `<Select>` dropdown's `SelectItem` **specimen rows**. Every element of the mark is accounted for by that template:

| Mark element | Source |
|---|---|
| italic display-face space name (`RGB`) | `ColorSpaceSelector.vue:76-78` — `class="specimen-name font-display italic text-title"` |
| the swatch dot | `ColorSpaceSelector.vue:81-86` — `<WatercolorDot>` in the `#description` row |
| the monospace lowercase CSS string | `ColorSpaceSelector.vue:87-92` — `class="specimen-caption fira-code text-mono-caption lowercase truncate"` |
| the ellipsis (`…`) | the `truncate` + `max-w-[16rem]` clamp at `ColorSpaceSelector.vue:80,89` |
| the 12-decimal number | `ColorSpaceSelector.vue:161` → `serializePickerColor(converted)` → `picker-color.ts:210` → `serializeCssColor` → `src/css/grammar.ts:285` |
| the next-row `HSL` below | the `v-for` over `spaceEntries` at `ColorSpaceSelector.vue:60-66,150` |

The card is therefore not a bespoke surface — it is one row of a `v-for`, and **every** space in `DISPLAY_COLOR_SPACE_NAMES` (`picker-color.ts:72-90` + `color-model.ts:76-79`) renders the same defect simultaneously. The mark shows one row of a seventeen-row defect.

---

## §1 — THE EMITTER

### 1.1 The exact code

`src/css/grammar.ts:283-287`:

```ts
const format = (value: Channel): string => value === "none"
    ? value
    : Number(value.toFixed(12)).toString();
const angle = (value: Channel): string => value === "none" ? value : `${format(value)}deg`;
const alphaSuffix = (alpha: Alpha): string => alpha === 1 ? "" : ` / ${alpha === "none" ? "none" : `${format(alpha * 100)}%`}`;
```

`format` is the sole number→string funnel of `serializeCssColor` (`src/css/grammar.ts:289-313`); it is applied to every channel of every space at `:303-311`, to hue via `angle` at `:286`, to alpha via `alphaSuffix` at `:287`, and to keyframe selectors at `:429-433`.

### 1.2 Where "12" comes from, and what it does

`toFixed(12)` clamps to twelve fractional digits; `Number(...)` then strips trailing zeros and `.toString()` renders. Two consequences:

1. **It is a ceiling, not a floor.** A value like `154.02988978815207` becomes `"154.029889788152"` — *exactly* the string in the mark. The mark's string is the emitter's output, byte for byte; the identification is closed.
2. **It is value-dependent.** `255` prints `"255"`; `154.02988978815207` prints fifteen characters more. Column width, truncation point and line count all move with the *value*, which is precisely what the readout's own design law forbids (`readoutReservation.ts:32-39`: *"a meter's least count is per-quantity… never a value-dependent precision"*). The library obeys no such law — correctly, because it is not a display.

There is no spec derivation for 12. It is a round-trip-fidelity choice: enough digits that `parse(serialize(c))` returns to `c` within double precision for the [0,255] and [0,1] domains, while avoiding both the 17-significant-digit default of bare `.toString()` and exponent notation.

### 1.3 The tension, stated plainly

`serializeCssColor` has exactly one job and does it correctly: emit a *lossless-enough, machine-round-trippable* CSS spelling. It is a **library** contract, exercised by `test/v4-css-public.test.ts:86` and `test/v4-c1.test.ts:177,189`, and it sits under the live parser proof gate. **It must not be changed to fix OM-14.**

The defect is entirely on the consumption side: **the demo has no display formatter for a whole color string.** It has one for a *channel tuple* (`readoutDecimals`, §3.1) and one for *byte-exact export* (`canonicalColor`, §3.11) — and nothing in between. Every surface that wants to show "the current color as CSS text" therefore reaches for the library's machine spelling and renders it raw. Seventeen distinct file:line sites do this (§2 class A).

---

## §2 — THE SITE TABLE

**Severity legend**

| Code | Meaning |
|---|---|
| **RAW-12** | the OM-14 class — unbounded 12-decimal float in a user-visible surface |
| **RAW-ARIA** | the OM-14 class, spoken by a screen reader instead of painted |
| **INCONSIST** | bounded, but an ad-hoc per-site precision that disagrees with a sibling surface showing the same quantity |
| **FIDELITY** | copy/export/URL — high precision defensible, but currently accidental rather than declared |
| **OK** | correct as shipped |
| **OUT** | internal math / CSS-var / canvas / watch-key / debug — recorded, not actionable |

### 2.A — Raw serialized color rendered as user-visible TEXT (the OM-14 class)

| # | file:line | Context | Precision | What the user sees | Severity |
|---|---|---|---|---|---|
| A1 | `demo/color-session/ColorSpaceSelector.vue:91` (via `:161`) | dropdown specimen caption — **THE MARK** | 12 | `rgb(154.029889788152 …` (truncated) | **RAW-12** |
| A2 | `demo/color-session/ColorSpaceSelector.vue:162-165` | same dropdown, non-CSS spaces (hsv/kelvin/ictcp/jzazbz) | 4 | `ictcp · 0.4213 · -0.0031 · 0.0177` | INCONSIST |
| A3 | `demo/shell/dock/ColorInput.vue:104` | hover-popover echo of the current color | 12 | full 12-decimal `oklch(…)` | **RAW-12** |
| A4 | `demo/shell/dock/ColorInput.vue:191` | contenteditable repaint on blur | 12 | the dock's primary color field | **RAW-12** |
| A5 | `demo/shell/dock/ColorInput.vue:240` | repaint after name proposal | 12 | ditto | **RAW-12** |
| A6 | `demo/shell/dock/ColorInput.vue:265` | repaint on leaving propose mode | 12 | ditto | **RAW-12** |
| A7 | `demo/shell/dock/ColorInput.vue:272` | live repaint watch (unfocused) | 12 | ditto — updates on every slider drag | **RAW-12** |
| A8 | `demo/shell/dock/ColorInput.vue:278` | repaint on mount | 12 | the FIRST color string the user ever sees | **RAW-12** |
| A9 | `demo/shell/dock/ColorInput.vue:54` | crown tooltip, `currentColorMeta.css` | 12 (stored) | the named color's stored CSS | **RAW-12** |
| A10 | `demo/workbenches/extract/ExtractWorkbench.vue:140` | dominant-color readout `<code>` | 12 | `oklch(0.6231… ` truncated | **RAW-12** |
| A11 | `demo/workbenches/extract/ExtractWorkbench.vue:139` | `:title` of A10 | 12 | full string on hover | **RAW-12** |
| A12 | `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:36` | sampled-color readout | 12 | eyedropper result text | **RAW-12** |
| A13 | `demo/palettes/browser/card/CurrentPaletteEditor.vue:108` | "Add current color (…)" tooltip | 12 | tooltip body | **RAW-12** |
| A14 | `demo/workbenches/mix/MixResultDisplay.vue:86` | mix result readout (`select-all break-all`) | 12 | wraps to multiple lines | **RAW-12** |
| A15 | `demo/workbenches/mix/MixResultDisplay.vue:103` | per-swatch `:title` | 12 | tooltip | **RAW-12** |
| A16 | `demo/workbenches/mix/MixSourceSelector.vue:150` | source-swatch `:title` | 12 | `oklch(…) (picker)` | **RAW-12** |
| A17 | `demo/palettes/browser/admin/AdminNamesPanel.vue:52` | admin queue, `item.css` | 12 (stored) | proposal review column | **RAW-12** |
| A18 | `demo/palettes/browser/admin/AdminNamesPanel.vue:102` | admin queue, second table | 12 (stored) | ditto | **RAW-12** |

**Provenance of the "(stored)" rows (A9, A17, A18):** the record was written raw at `demo/shell/dock/ColorInput.vue:235-236` — `serializePickerColor(currentPhysicalColor.value)` handed straight to `proposeColorName`. The database therefore holds 12-decimal strings; the panels merely render what was stored. Display rounding fixes the render; the stored bytes stay full-precision (correct — that is a fidelity surface).

**Chain of custody for A3–A8, A13:**
`useColorPipeline.ts:104` `cssColorOpaque` and `useColorNameResolution.ts:34-48` `formattedCurrentColor` (`:47`) both return `serializePickerColor(...)` unmodified → `picker-color.ts:206-211` → `serializeCssColor` → `grammar.ts:285`.
`savedColorStrings` (`useColorPipeline.ts:166-168`) is the same raw map over the saved-color array, and feeds class B below.

### 2.B — Raw serialized color in ARIA (spoken verbatim by a screen reader)

| # | file:line | Context | Precision | Severity |
|---|---|---|---|---|
| B1 | `demo/palettes/browser/card/CurrentPaletteEditor.vue:101` | `Add current color ${cssColorOpaque} to palette` | 12 | **RAW-ARIA** |
| B2 | `demo/palettes/browser/card/CurrentPaletteEditor.vue:46` | `Edit color ${color}` | 12 | **RAW-ARIA** |
| B3 | `demo/palettes/browser/card/CurrentPaletteEditor.vue:49` | `Copy color ${color}` | 12 | **RAW-ARIA** |
| B4 | `demo/palettes/browser/card/CurrentPaletteEditor.vue:52` | `Remove color ${color} from palette` | 12 | **RAW-ARIA** |
| B5 | `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:43` | `Add ${color.css} to current palette` | 12 | **RAW-ARIA** |
| B6 | `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:50` | `Edit color ${color.css}` | 12 | **RAW-ARIA** |
| B7 | `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:57` | `Copy color ${color.css}` | 12 | **RAW-ARIA** |
| B8 | `demo/palettes/browser/card/SwatchHoverMenu.vue:18` | `Color swatch ${color}` (touch path) | 12 | **RAW-ARIA** |
| B9 | `demo/palettes/browser/card/SwatchHoverMenu.vue:33` | `Color swatch ${color}` (hover path) | 12 | **RAW-ARIA** |
| B10 | `demo/workbenches/generate/GenerateControls.vue:206` | `Copy ${css}` — generated oklch | 12 | **RAW-ARIA** |
| B11 | `demo/workbenches/mix/MixSourceSelector.vue:218` | `Add color ${color.css} from ${palette.name}` | 12 | **RAW-ARIA** |

**The irony worth booking:** this is the *exact* defect U.W-A11Y / U-F27 already cured once for the sliders. `ComponentSliders.vue:224-229` documents it verbatim — reka's raw `aria-valuenow` (`0.5833333333333334`) was replaced with a formatted `aria-valuetext`. The cure was applied to the slider thumbs and nowhere else; eleven palette/generate/mix aria-labels still carry the machine spelling.

**Numeric ARIA that is already correct (recorded, no action):**

| file:line | Value | Verdict |
|---|---|---|
| `demo/picker/controls/ComponentSliders/composables/useSliderAnnouncements.ts:41` | `aria-valuetext` off the formatted meter cell | **OK** — the reference implementation |
| `demo/picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts:24-28` | `Math.round(s*100)%`, `Math.round(v*100)%` | **OK** |
| `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:234` | `Gradient stop at ${Math.round(stop.position)}%` | **OK** |
| `demo/palettes/browser/search/SearchFilterBar.vue:78` | `current color ${pickerHex}` — hex | **OK** |
| `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:181` | `Copy ${row.css}` — 3dp easing literal | **OK** |

### 2.C — Clipboard / URL / API payload (fidelity surfaces, currently undeclared)

| # | file:line | Context | Precision | Severity |
|---|---|---|---|---|
| C1 | `demo/picker/ColorPicker.vue:325` | dock "copy color" → clipboard | 12 | FIDELITY |
| C2 | `demo/picker/ColorPicker.vue:324` | same handler also writes `inputColor` into the model | 12 | FIDELITY |
| C3 | `demo/shell/dock/ColorInput.vue:222` | `copyAndSetInputColor` | 12 | FIDELITY |
| C4 | `demo/palettes/usePaletteActions.ts:134` | swatch dot click → clipboard | 12 | FIDELITY |
| C5 | `demo/palettes/browser/card/composables/useSwatchActions.ts:87` | current-palette swatch copy | 12 | FIDELITY |
| C6 | `demo/palettes/browser/card/PaletteCard/PaletteCard.vue:333` | palette swatch copy | 12 | FIDELITY |
| C7 | `demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294` | "copy all" — every color joined | 12 × N | FIDELITY |
| C8 | `demo/workbenches/generate/GenerateControls.vue:107` | copy generated palette | 12 × N | FIDELITY |
| C9 | `demo/workbenches/generate/GenerateControls.vue:112` | copy one generated color | 12 | FIDELITY |
| C10 | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:128` | "Copy CSS" — coalesced gradient | 12 × ~64 stops | FIDELITY |
| C11 | `demo/workbenches/mix/MixPane.vue:54` / `MixResultDisplay.vue:46` | copy mix result | 12 | FIDELITY |
| C12 | `demo/color-session/useColorUrl.ts:57` | the shareable URL's `?color=` query | 12 | FIDELITY |
| C13 | `demo/shell/dock/ColorInput.vue:236` | `proposeColorName(name, cssStr)` → API | 12 | FIDELITY (correct to keep) |

C10 deserves a note: `serializeCoalescedGradient` (`useGradientCSS.ts:296-306`) emits one `colorToCss(sample.color)` per coalesced sample. At `COALESCE_RESOLUTION` sampling that is dozens of 12-decimal color literals in a single copied string — the copied CSS is likely several kilobytes where a few hundred bytes would render identically.

### 2.D — Non-color numeric display

| # | file:line | Context | Precision | Verdict |
|---|---|---|---|---|
| D-a | `demo/workbenches/extract/ExtractControls.vue:78` | chroma-weight readout | `toFixed(1)` | **OK** — matches the slider's `:step="0.1"` (`:73`) |
| D-b | `demo/workbenches/extract/ExtractWorkbench.vue:123` | `% of the image` | `Math.round(×100)` | **OK** |
| D-c | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:230` | `{{ direction }}°` | none | **OK-fragile** — integer only because `:step="1"` (`:233`); a model-loaded float would print raw |
| D-d | `demo/workbenches/generate/GenerateControls.vue:151,290` | `{{ count }}` | none | **OK** — integer by construction |
| D-e | `demo/scenes/about/ColorNutritionLabel.vue:60,62` | channel range `min` / `max` | none (`:217-230`) | INCONSIST — emits `0deg`/`360deg`, not `0°`/`360°` |
| D-f | `demo/picker/controls/ComponentSliders/ConsoleRail.vue:75` | range caption `(0deg - 360deg)` | none (`useSliderGradients.ts:82-88`) | INCONSIST — duplicate derivation of D-e |
| D-g | `demo/scenes/ConfigSliderPane.vue:142` via `:85-87` | blob/aurora config readouts | value-dependent: integer or `toFixed(3)` | INCONSIST |
| D-h | palette/admin counts (`PalettesPane.vue:24`, `PaletteCardMeta.vue:22,32,53`, `AdminUsersPanel.vue:103`, `PaginationBar.vue:18`, `AdminFlaggedPanel.vue:82`, `VersionHistoryDrawer.vue:62`, `SearchFilterBar.vue:11`, `AdminPane.vue:5`, `MixSourceSelector.vue:206`, `PaletteCard.vue:73`, `CurrentPaletteEditor.vue:21`) | integer counts | none | **OK** |

### 2.OUT — Recorded, not actionable (internal math / CSS values / canvas / debug)

| file:line | What | Why OUT |
|---|---|---|
| `demo/color-picker/composables/boot/useAtmosphereBoot.ts:116` | `l.toFixed(4)` → `--ink-ambient-l` | published CSS referent, not text |
| `demo/color-session/ink.ts:64` | `serializeCssColor` → certified ink token | CSS value |
| `demo/color-session/view-accent.ts:45` | `serializeCssColor` → `--accent-view-*` | CSS value |
| `demo/color-session/generate-color.ts:240` | `serializeCssColor` → generated palette member | becomes text downstream (A/B/C rows) — the *emit* itself is a value |
| `demo/color-session/useSliderGradients.ts:53` | `toFixed(3)` | watch key (change detection) |
| `demo/color-session/useContrastSafeColor.ts:123` | `Math.round` | cache key |
| `demo/scenes/atmosphere/aurora-harmony-stops.ts:25-27` | `toFixed(4)` + zero-strip | CSS paint stops |
| `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:57` | `a.toFixed(3)` in `rgba()` | canvas fill |
| `demo/palettes/browser/card/ShadowPalette.vue:56,63,67,77` | `toFixed(2)` | `animation-delay` seconds |
| `demo/workbenches/generate/GenerateControls.vue:70` | `pct.toFixed(0)` | gradient-stop % in a CSS string |
| `demo/workbenches/extract/composables/useExtractSession.ts:109` | `pct.toFixed(0)` | ditto |
| `demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts:71` | `t.toFixed(3)`, `y.toFixed(3)` | SVG path data |
| `demo/workbenches/gradient/composables/useGradientCSS.ts:182` | `Math.round` | sample count |
| `demo/picker/composables/usePointerDebug.ts:248` | `toFixed(1)` | debug log line |
| `demo/picker/visual/DebugEventLog.vue:14` | `toFixed(2)` | debug overlay |
| `demo/picker/visual/PointerDebugOverlay.vue:78,96` | `toFixed(1)` | debug overlay + debug JSON |
| `demo/palettes/browser/search/MiniColorPicker.vue:89,103` | `Math.floor` / `Math.round` | hex conversion math |
| `demo/palettes/export/canonical.ts:19` | `Math.floor` | fixed-point integer split |
| `demo/palettes/mix.ts:92` | `Math.floor` | ramp index |
| `demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:106,107` | `Math.floor` | pixel coordinates |
| `demo/scenes/ConfigSliderPane.vue:89` | config JSON → clipboard | a developer config dump |
| `demo/picker/visual/PointerDebugOverlay.vue:112` | debug JSON → clipboard | debug |

---

## §3 — EXISTING-FACILITIES INVENTORY

Eleven distinct formatting policies exist for what is, in five of those cases, literally the same quantity.

### 3.1 `readoutDecimals` — the ruled per-space least count
`demo/picker/display/ColorComponentDisplay/readoutReservation.ts:50-64`

```ts
const INTEGER_LEAST_COUNT = new Set(["rgb","hsl","hsv","hwb","lch","xyz"]);   // :50-57
export function readoutDecimals(space: string, _component: string): number {   // :62
    return INTEGER_LEAST_COUNT.has(space) ? 0 : 1;
}
```

* **Policy:** 0 decimals for the six integer-native spaces; **1** for everything else. `lab` is deliberately excluded (`:47-48`) and takes an honest two-line lock instead.
* **Provenance:** Q11b lever 1, RULED — documented at `:32-39`. The docblock states the governing law: *"a meter's least count is per-quantity… still value-independent (never a stripped `.0`)."*
* **Critical structural fact:** the signature already accepts `_component` **and ignores it**. The per-channel seam is pre-cut. This is where a generalized facility plugs in without inventing an API.
* **Binding invariant (must survive any refactor):** `:59-61` — the same function feeds *both* the rendered format *and* the `ch`-reservation arithmetic (`READOUT_CH`, `:89-107`), *"so the lock arithmetic and the rendered format can never disagree."* Any replacement must keep that single-source property or the readout's line-lock silently decouples from what it paints.

### 3.2 `figParts` — the hero readout renderer
`demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue:104-115`
Consumes 3.1 (`:109`), suppresses negative zero (`:111`), splits int/frac for the typographic demotion (`:113-114`). Strings (hex) pass through whole (`:107`).

### 3.3 `meterText` — the console meter
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:158-173`
Consumes 3.1 identically (`:169-171`) and appends the unit (`:172`). Alpha, absent from the formatted map, is synthesized inline at `:163` as `alpha * 100` with unit `%`. **The negative-zero suppression at `:171` is a verbatim duplicate of `ColorComponentDisplay.vue:111`.**

### 3.4 `sliderValueText` — the a11y arm
`demo/picker/controls/ComponentSliders/composables/sliderAnnouncement.ts:69-79`, labels at `:22-66`
Composes `channelLabel(space, component)` with 3.3's string → `"Hue 210°"`, `"Red 128"`. Delivered at `useSliderAnnouncements.ts:41`. **This is the correct shape and the model to generalize: a context (aria) consuming the ONE formatted cell, adding only its own semantics.**

### 3.5 `currentColorComponentsFormatted` — the value source
`demo/color-session/useSliderGradients.ts:63-80`
Denormalizes `%`-unit channels whose max ≤ 1 by ×100 (`:73`); performs **no rounding** — rounding is correctly left to the consumer (3.1). Hex mode returns a single string cell (`:65-67`). The layering here is right and should be preserved.

### 3.6 `currentColorRanges` — the rail tooltip ranges
`demo/color-session/useSliderGradients.ts:82-88` → rendered `ConsoleRail.vue:75`
`` `(${min*scale}${unit} - ${max*scale}${unit})` `` → `(0deg - 360deg)`, `(0% - 100%)`.

### 3.7 `formattedRange` — the About card ranges (a duplicate of 3.6)
`demo/scenes/about/ColorNutritionLabel.vue:217-230` → rendered `:60,:62`
Byte-identical derivation to 3.6 with a different shape (`{min,max}` vs one string). Two implementations of one fact.

### 3.8 `astEcho` — the parse-echo, a third precision for the same channels
`demo/color-session/useColorParsing.ts:94-105` → rendered `ParseEchoReadout.vue:16-18`
`Number(display.toFixed(3))` (`:99`) plus alpha at `toFixed(3)` (`:102`). Same denorm rule as 3.5 (`:98`), **different precision (3)** than 3.1 (0 or 1). The picker hero and the popover echo therefore disagree about the same channel by up to three digits.

### 3.9 `fmt` — the config-slider readout
`demo/scenes/ConfigSliderPane.vue:85-87`
`Number.isInteger(v) ? String(v) : v.toFixed(3)` — **value-dependent**, the exact pattern 3.1's docblock forbids for instrument readouts.

### 3.10 `formatLibraryColor` — the eyedropper's non-CSS spelling
`demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:38-44`
`Number(channel.toFixed(4)).toString()` (`:41`) — **a fourth precision (4)**. Latent bug at `:42`: `` ` · α ${color.alpha}` `` interpolates alpha **completely unrounded** (a 17-digit leak). Currently unreachable because the sampler always originates from an opaque hex (`:117-118`), so `alpha === 1` short-circuits — but the code is one alpha-aware feature away from shipping a 17-digit string.

### 3.11 `ColorSpaceSelector`'s non-CSS branch — a fifth site of the fourth precision
`demo/color-session/ColorSpaceSelector.vue:162-165` — `Number(channel.toFixed(4))`, joined ` · `. Same intent as 3.10, separate implementation.

### 3.12 `fmtPos` / the gradient position split — an **existing, undocumented** display-vs-fidelity split
`demo/workbenches/gradient/composables/useGradientCSS.ts:137-140`
* `fmtPos` = `` `${Number(position.toFixed(1))}%` `` — used by `serializeGradient` (`:161`), the **user-editable** CSS. Docblock at `:137`: *"`33.3%`, never `33.300000%` / `0.0%` — the readout trims dead zeros."*
* `position.toFixed(2)` at `:221` and `:301` — used by `rampGradient` and `serializeCoalescedGradient`, the **machine-rendered** CSS.

This is the right instinct, already shipped, for *one* quantity (position) in *one* module — and never generalized to colors. It is the strongest in-tree argument that the split §4 proposes is native to this codebase rather than imported.

### 3.13 `canonicalColor` — the byte-exact export authority (**the precedent**)
`demo/palettes/export/canonical.ts:14-29`

```ts
function fixedPoint(numerator: number, digits: number): string {   // :17-22
    const denom = 10 ** digits;
    return `${Math.floor(numerator / denom)}.${String(numerator % denom).padStart(digits, "0")}`;
}
export function canonicalColor(color: CanonicalNamedColor): string {   // :28-30
    return `oklch(${fixedPoint(color.l, 3)}% ${fixedPoint(color.c, 6)} ${fixedPoint(color.h, 3)} / ${fixedPoint(color.a, 6)})`;
}
```

* **Per-quantity digit counts, declared:** L 3dp %, C 6dp, H 3dp, A 6dp — carried in the type's own doc (`types.ts:14-20`) and validated on reload (`reload.ts:114-117`).
* Deliberately avoids `Number.toFixed` entirely (`:12-15`: *"pure integer string-slicing — never `Number.toFixed`, so there is no float rounding, no exponent, no trimmed digit and no negative zero"*).
* Consumed by all five serializers: `css.ts:13`, `tailwind.ts:15`, `svg.ts:20`, plus json/png.
* **This module is contract-frozen (byte authority: PALETTE-CONTRACT Appendix W51) and must not be subsumed.** It is cited here as the shape the new facility should imitate: a declared per-quantity digit table, not a global constant.

### 3.14 Vestigial precision APIs (dead code, retire with the facility)
* `demo/color-session/color-model.ts:67-72` — `toCSSColorString(color, _digits: number = 2)`: the signature advertises precision control and **ignores the parameter entirely**, delegating to `serializePickerColor`. A false affordance; callers at `useColorPipeline.ts:214,216` and `ColorPicker.vue:293` pass nothing.
* `demo/color-session/useColorPipeline.ts:28` `const DIGITS = 2` — exported from the composable at `:331`; **zero consumers**.
* `demo/color-session/useSliderGradients.ts:14` `const DIGITS = 2` — **zero consumers**.

These three are the fossil of an earlier, abandoned attempt at exactly the facility OM-14 asks for. Their existence is evidence the need was seen before and never landed.

### 3.15 Facilities that must NOT be subsumed
| Facility | file:line | Why it stays |
|---|---|---|
| `canonicalColor` | `demo/palettes/export/canonical.ts:28-30` | byte-exact export contract (W51), reload-validated |
| `bezierLiteral` | `demo/workbenches/gradient/.../easingCatalogue.ts:48-51` | **byte-identity with glass-ui's `useEasingPicker.readout` is a stated cross-repo constraint** (`:39-46`); changing its `toFixed(3)` breaks payload equality with the producer |
| `stepsLiteral` | same, `:54-56` | same constraint |
| `cubicBezierToString` | `src/foundation/math.ts:113-119` | library surface, not demo display |
| `serializeCssColor` | `src/css/grammar.ts:289` | library round-trip contract, under the parser proof gate |
| the aurora `fmt` | `demo/scenes/atmosphere/aurora-harmony-stops.ts:25-27` | CSS paint stops, not text |

---

## §4 — THE GENERALIZED FACILITY: DISPOSITION

### 4.1 Where it lives — `demo/color-session/`, NOT `src/`

**Ruling: a new module, `demo/color-session/format-color.ts`.**

Evidence for demo-side:
1. `src/css/grammar.ts:285` is a **library** contract asserted by `test/v4-css-public.test.ts:86` and `test/v4-c1.test.ts:177,189`, and it sits under the live parser proof gate. Changing `format()`'s 12 changes every downstream consumer's bytes. It is the wrong lever, and the epoch rule makes it the wrong file.
2. Every display policy already lives demo-side: `readoutReservation.ts`, `useSliderGradients.ts`, `sliderAnnouncement.ts`, `canonical.ts`. A display formatter in `src/` would be the only one.
3. `demo/color-session/picker-color.ts:206-211` (`serializePickerColor`) is already the **single demo-side chokepoint** every display string flows through. The new module is its display sibling, in the same directory, importing the same `PICKER_CHANNELS` metadata (`picker-color.ts:52-70`) that `readoutReservation.ts:42` and `ColorNutritionLabel.vue:172` already import.

**Library-side note (a separate, later question):** the library could reasonably grow an *options* parameter on `serializeCssColor` (e.g. `{ precision }`) as a purely additive change. That is a `src/` proposal for a different wave and must not be conflated with the OM-14 cure — the demo can be fully correct without it (§4.4 shows how).

### 4.2 The shape — four registers, one per-channel table

**Registers (the "depending on context" the owner asked for):**

| Register | Consumers | Rule |
|---|---|---|
| `compact` | hero readout, console meter, `aria-valuetext` | today's `readoutDecimals`, extended per-channel |
| `caption` | specimen captions, tooltips, dropdown rows, the dock input's resting text, admin CSS columns — **§2 classes A and B** | per-channel display decimals, whole-CSS-string output |
| `interchange` | clipboard, URL query, "copy CSS" — **§2 class C** | bounded but generous; declared, not accidental |
| `exact` | the W51 export path | **untouched** — `canonicalColor` remains authority |

**The per-channel decimal table.** The current rule is per-*space* (`readoutReservation.ts:62-64`); it cannot express `oklch`, whose tuple mixes a 0–1 lightness with a 0–0.5 chroma and a 0–360 hue. Deriving from each channel's declared range in `PICKER_CHANNELS` (`picker-color.ts:52-70`):

| Channel class | Range (source) | `compact` | `caption` | Rationale |
|---|---|---|---|---|
| rgb r/g/b | 0–255 (`:53`) | **0** | **0** | 8-bit is the native quantum; CSS Color 4 requires the legacy `rgb()` form to serialize as integers `[VERIFY]` |
| hue h | 0–360 deg (`:50`) | **0** | **0** | 1° is below the hue JND at almost all chroma |
| hsl/hsv/hwb s,l,v,w,b | 0–100 % (`:54-56`) | **0** | **1** | matches the ruled `INTEGER_LEAST_COUNT` |
| lab L | 0–100 % (`:57`) | **1** | **1** | lab's ruled exclusion (`readoutReservation.ts:47-48`) preserved |
| lab a,b | ±125 (`:57`) | **1** | **2** | span 250 — 1dp is already 2500 steps |
| lch C | 0–150 (`:58`) | **0** → **REVIEW** | **1** | currently 0 by the space rule; 0dp on a 0–150 perceptual axis is defensible but disagrees with oklch C's 3 — **owner-ruling row** |
| oklab/oklch L | 0–1 → shown ×100 % (`:59-60`) | **1** | **1** | denormed by `useSliderGradients.ts:73` |
| oklab a,b | ±0.4 (`:59`) | **3** | **4** | 1dp would collapse the axis to 9 buckets — **the per-space rule's failure case** |
| oklch C | 0–0.5 (`:60`) | **3** | **4** | ditto |
| xyz x,y,z | 0–1 → ×100 % (`:61`) | **0** | **1** | matches the ruled set |
| ictcp, jzazbz | ±0.5 / 0–0.222 (`:68-69`) | **3** | **4** | replaces the ad-hoc `toFixed(4)` at two sites (§3.10, §3.11) |
| kelvin | 1000–40000 K (`:62`) | **0** | **0** | |
| alpha | 0–1, shown as % | **0** as %, **2** as number | **1** as %, **3** as number | the serializer already emits `/ <pct>%` (`grammar.ts:287`) |

**Sanity check (not the mechanism):** `decimals ≈ max(0, ceil(log10(256 / span)))` reproduces rgb→0, hue→0, lab L→1, lab a/b→1, oklch C→3. It **disagrees** for hsl/hsv/hwb percentages (formula→1, ruled→0). The ruled value wins: this table is **declarative, seeded from the ruled `INTEGER_LEAST_COUNT`**, and the formula is documentation of why the numbers are sane — never a replacement for a ruling. (E-3: addenda, not patch.)

**Spec grounding `[VERIFY]`:**
* CSS Color Module Level 4, *Serializing `<color>` Values* — the legacy `rgb()`/`rgba()` form serializes sRGB components **rounded to integers** (`rgb(154, 30, 30)`), which is the direct normative basis for the 0-decimal rgb row and for calling the mark's `rgb(154.029889788152 …)` non-conforming as a *display* of sRGB.
* CSSOM, *Serializing CSS Values* — numbers serialize in the shortest form that round-trips; browsers in practice emit 4–6 significant digits from `getComputedStyle` for modern color functions. No engine emits 12. The demo is currently *less* readable than the platform it is demonstrating.

### 4.3 The API (KISS — E-2; four functions, one module)

```
demo/color-session/format-color.ts

channelDecimals(space, channel, register)      // the table; re-exported to readoutReservation
formatChannel(space, channel, value, register) // number → string  (negative-zero kill + unit)
formatColorString(color, register)             // AnyColor → whole CSS string at display precision
formatChannelRange(space, channel)             // the min/max caption (kills the 3.6 ≡ 3.7 twin)
```

`formatColorString` is **the missing piece** — nothing in the tree today formats a whole color for display.

### 4.4 The implementation that avoids touching `src/`

**Round the channels, then serialize.** `formatColorString` builds a rounded twin of the color via the existing `withChannel` (`picker-color.ts:165-176`) and hands it to `serializePickerColor` (`:206`). Because every channel then carries ≤ N fractional digits, `grammar.ts:285`'s `toFixed(12)` becomes a **no-op** and the library's spelling is preserved byte for byte.

Consequences, all favourable:
* the library stays the single authority on *spelling* (which space keyword, where the `/` goes, how `none` renders);
* no string post-processing, no regex over serialized output, no second serializer to drift;
* `clampPickerColor` / `buildColor` (`picker-color.ts:123-144,195-204`) already exist to reconstruct a color from modified channels — zero new machinery.

### 4.5 What it subsumes

| Subsumed | file:line | Becomes |
|---|---|---|
| `readoutDecimals` | `readoutReservation.ts:62-64` | re-exported from the new table for the `compact` register — **the `_component` parameter finally used**; the `READOUT_CH` single-source invariant (`:59-61`) preserved by construction |
| `figParts` negative-zero + split | `ColorComponentDisplay.vue:104-115` | consumes `formatChannel` |
| `meterText` | `ComponentSliders.vue:158-173` | consumes `formatChannel` (kills the `:171` ≡ `ColorComponentDisplay.vue:111` duplicate) |
| `currentColorRanges` | `useSliderGradients.ts:82-88` | `formatChannelRange` |
| `formattedRange` | `ColorNutritionLabel.vue:217-230` | `formatChannelRange` — one derivation, two consumers |
| `astEcho`'s `toFixed(3)` | `useColorParsing.ts:99,102` | `formatChannel(..., "caption")` |
| `formatLibraryColor` | `useImageSampler.ts:38-44` | `formatColorString` (and the `:42` raw-alpha leak dies) |
| `ColorSpaceSelector` non-CSS branch | `ColorSpaceSelector.vue:162-165` | `formatColorString` |
| `ConfigSliderPane.fmt` | `ConfigSliderPane.vue:85-87` | `formatChannel`-shaped step-derived least count (its sliders declare `def.step`) |
| `toCSSColorString(_digits)` | `color-model.ts:67-72` | **deleted** — the false affordance |
| `DIGITS` × 2 | `useColorPipeline.ts:28,331`; `useSliderGradients.ts:14` | **deleted** — dead |
| all 18 class-A sites | §2.A | `formatColorString(color, "caption")` |
| all 11 class-B sites | §2.B | `formatColorString(color, "caption")` in the template literal |

### 4.6 THE DISPLAY / FIDELITY SPLIT — stated explicitly

This is the axis the owner's "depending on context" names, and it must be encoded, not inferred.

**DISPLAY-ONLY — round hard, information loss is the *point*.**
Everything in §2.A and §2.B. The user is reading a color, not archiving it. Register `caption`. Loss is intended and invisible: the rounded string still parses to a color indistinguishable on any display.

**FIDELITY-PRESERVING — round softly, and *declare* the precision.**
Everything in §2.C. A copied string may be pasted into a stylesheet; a URL may be shared; an API payload becomes a stored record. But *twelve* decimals is not fidelity, it is noise: `oklch` chroma resolves visually at ~1e-4 and the sRGB 8-bit quantum is ~4e-3. **Proposed `interchange` policy, mirroring the ratified export contract (`canonical.ts:29`): L 3dp, C 6dp, H 3dp, A 6dp — i.e. the W51 numbers, reused rather than re-invented.** That is ~40% of the current byte count, exactly round-trips through `parseCssColor`, and matches a precision the project has already ratified elsewhere.

**BYTE-EXACT — do not touch.**
`demo/palettes/export/*` via `canonical.ts`. Contract-frozen, reload-validated (`reload.ts:110-117`), digest-bearing.

**THE ONE SURFACE THAT IS BOTH — and why it is safe.**
`ColorInput.vue`'s contenteditable is simultaneously the *display* of the current color (A4–A8) and the *input* the user edits. Rounding a displayed value that is also an input is normally destructive. **Here it is not**, and the source proves it:

* the repaint paths write `innerText` directly (`:191`, `:240`, `:265`, `:272`, `:278`) — a programmatic `innerText` assignment **does not dispatch an `input` event**, so `onInputInput` (`:194-201`) never fires and no re-parse occurs;
* the only re-parse paths are genuine user gestures — `@input` (`:24`), Enter (`:202-211`), the send button (`:213-217`);
* the model's authority is `model.value.color` (`useColorPipeline.ts:100-104`), never the field's text.

Therefore the displayed text may be rounded freely; the model's precision is untouched, and the clipboard path (`:222`) can independently take the `interchange` register. **This must be stated in the implementation spec** — it is the one place where a careless reading would conclude the rounding is unsafe and back out the fix.

### 4.7 Owner-ruling rows (do not decide unilaterally)

1. **lch C** — `compact` 0 decimals (today's per-space rule) vs 1, given oklch C gets 3. §4.2 table.
2. **The `caption` register for percentages** — 0 (matching `compact`) or 1. The dropdown caption has more room than the hero readout; 1 may read better.
3. **Whether `interchange` reuses the W51 digit counts verbatim** or takes its own (looser) numbers.
4. **`GradientVisualizer.vue:230`'s `{{ direction }}°`** — leave slider-guarded, or route through `formatChannel` defensively.

---

## §5 — COUNTS

| Metric | Count |
|---|---|
| **Total censused file:line sites** | **95** |
| — user-facing, actionable (classes A + B + C + D) | **50** |
| — internal / out of scope (class OUT) | **22** |
| — existing formatting facilities (§3) | **14** (11 live policies + 3 vestigial) |
| — numeric ARIA already correct | **5** |
| — integer-count displays already correct | **12** (folded in D-h) |
| | |
| **USER-FACING RAW-FLOAT (the OM-14 class)** | **29** |
| — rendered as visible text (§2.A) | **17** (18 rows, of which A2 is 4dp not 12dp) |
| — spoken by a screen reader (§2.B) | **11** |
| — plus the model write-back at `ColorPicker.vue:324` | 1 |
| | |
| **INCONSISTENT-PRECISION sites** | **9** |
| — five *different* precisions for the same channel quantities | 0 / 1 / 3 / 4 / 12 |
| — the sites | A2, D-e, D-f, D-g, §3.8, §3.9, §3.10, §3.11, §3.12 |
| | |
| **FIDELITY sites (undeclared, currently 12dp)** | **13** (§2.C) |
| **Dead precision APIs to retire** | **3** (§3.14) |
| | |
| `toFixed` grep lines under `src/` + `demo/` | **32** |
| — prose comments (`canonical.ts:14`, `easingCatalogue.ts:41`) | 2 |
| — **runtime `toFixed` CALLS** | **31** ✅ *M-16's figure confirmed* |
| — runtime `toFixed` LINES | 30 (`easingCatalogue.ts:71` carries two calls) |
| `toPrecision` calls | **0** |
| `Intl.NumberFormat` calls | **0** |
| distinct precisions in use across those 31 calls | **6** — 0, 1, 2, 3, 4, 12 |

**The worst class, named:** the 29 RAW-12 user-facing sites — a single library round-trip constant (`src/css/grammar.ts:285`) reaching 29 display surfaces with no formatter in between, of which 11 are ARIA labels that a screen reader speaks digit by digit. The mark's card (`ColorSpaceSelector.vue:91`) is one of seventeen text instances, and it renders seventeen times at once — once per row of the space dropdown.

---

## §6 — EVIDENCE INDEX (primary files)

| File | Role |
|---|---|
| `src/css/grammar.ts:283-313` | the emitter — `format()`, `angle()`, `alphaSuffix()`, `serializeCssColor` |
| `demo/color-session/picker-color.ts:52-90,206-211` | `PICKER_CHANNELS` metadata + `serializePickerColor`, the demo chokepoint |
| `demo/color-session/ColorSpaceSelector.vue:60-97,154-166` | **the OM-14 card** |
| `demo/color-session/useColorPipeline.ts:100-104,166-168` | `cssColor` / `cssColorOpaque` / `savedColorStrings` — raw |
| `demo/color-session/useColorNameResolution.ts:34-48` | `formattedCurrentColor` — raw |
| `demo/shell/dock/ColorInput.vue:54,104,191,222,236,240,265,272,278` | the dock field: 6 display sites + 1 clipboard + 1 API |
| `demo/picker/display/ColorComponentDisplay/readoutReservation.ts:32-64` | the ruled per-space least count — the extension seam |
| `demo/picker/controls/ComponentSliders/composables/sliderAnnouncement.ts:69-79` | the correct a11y pattern |
| `demo/palettes/export/canonical.ts:12-30` | the byte-exact precedent — per-quantity declared digits |
| `demo/workbenches/gradient/composables/useGradientCSS.ts:137-140,221,301` | an existing, undocumented display/fidelity split |
| `demo/color-session/color-model.ts:67-72` | the vestigial `_digits` affordance |
