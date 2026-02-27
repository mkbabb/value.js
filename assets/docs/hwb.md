<script setup>
import { hsl2hwb, hwb2hsl, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { h, w, b } = getFormattedColorSpaceRange("hwb");

</script>

### Attributes

-   `H`: Hue ({{h.min}} to {{h.max}})
-   `W`: Whiteness ({{w.min}} to {{w.max}})
-   `B`: Blackness ({{b.min}} to {{b.max}})

### Background

HWB (Hue, Whiteness, Blackness) was proposed by Alvy Ray Smith in 1996 to match how painters actually think: pick a hue, then mix in white or black. It's derived from HSV but replaces saturation and value with two more direct controls—how much white and how much black to add. HWB is part of **CSS Color Level 4**, so it's natively available in modern browsers via `hwb()`.

The gamut is the same as sRGB. It's a reorganization of the same color cube, not a new one.

---

## Color Model

### Components

1. **`H` (Hue)**:
   `H = 0° \text{ to } 360°` (often normalized to 0–1)

   Base color on the wheel:
   - 0°/360° = Red
   - 60° = Yellow
   - 120° = Green
   - 180° = Cyan
   - 240° = Blue
   - 300° = Magenta

2. **`W` (Whiteness)**:
   `W = 0 \text{ (no white) to } 1 \text{ (pure white)}`

   How much white is mixed into the hue. Higher values produce tints.

3. **`B` (Blackness)**:
   `B = 0 \text{ (no black) to } 1 \text{ (pure black)}`

   How much black is mixed into the hue. Higher values produce shades.

**`W + B` should not exceed `1`.** When it does, the color collapses to a grayscale value determined by the ratio `W / (W + B)`, and hue is effectively ignored.

---

## Advantages

-   Mirrors the artist's mental model—tint and shade are first-class operations
-   Easy to create systematic tint/shade ramps from a single hue
-   Native CSS support via `hwb()` in Color Level 4
-   Simpler to reason about than HSL's lightness/saturation interaction

## Disadvantages

-   Not perceptually uniform—equal numeric steps don't produce equal visual steps
-   `W` and `B` aren't independent (their sum is constrained)
-   Less widely supported in design tools than HSL or HSV

---

## Color Conversions

### HSL to HWB

<div class="language-typescript">
    {{ hsl2hwb }}
</div>

### HWB to HSL

<div class="language-typescript">
    {{ hwb2hsl }}
</div>

---

## Common Applications

1. **Web design**: First-class CSS function (`hwb()`), useful for declaring tints and shades directly in stylesheets.
2. **Color pickers**: Some modern pickers expose HWB as a triangle or square selector—whiteness on one axis, blackness on the other.
3. **Palette generation**: Sweep `W` and `B` for a given hue to produce coherent tint/shade ramps.
4. **Accessibility**: Straightforward to create high-contrast variants—push `B` up for darker, `W` up for lighter.
5. **Education**: The tint-shade-tone model maps directly to traditional color theory vocabulary.