<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Attributes

-   `H`: Hue (0° to 360°)
-   `W`: Whiteness (0 to 1)
-   `B`: Blackness (0 to 1)

### Background

HWB (Hue, Whiteness, Blackness) was proposed by Alvy Ray Smith in 1996 to match how painters actually think: pick a hue, then mix in white or black. It's derived from HSV but replaces saturation and value with two more direct controls—how much white and how much black to add. HWB is part of **CSS Color Level 4**, so it's natively available in modern browsers via `hwb()`.

The gamut is the same as sRGB. It's a reorganization of the same color cube, not a new one.

---

## Color Model

### Components

1. **`H` (Hue)**:
   <Katex expression="H = 0^\circ \text{ to } 360^\circ" :display-mode="false" /> (often normalized to 0–1)

   Base color on the wheel:
   - 0°/360° = Red
   - 60° = Yellow
   - 120° = Green
   - 180° = Cyan
   - 240° = Blue
   - 300° = Magenta

2. **`W` (Whiteness)**:
   <Katex expression="W = 0 \text{ (no white) to } 1 \text{ (pure white)}" :display-mode="false" />

   How much white is mixed into the hue. Higher values produce tints.

3. **`B` (Blackness)**:
   <Katex expression="B = 0 \text{ (no black) to } 1 \text{ (pure black)}" :display-mode="false" />

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

Convert through HSV as an intermediate—whiteness and blackness derive directly from HSV's saturation and value:

<Katex expression="W = V(1 - S_V), \quad B = 1 - V" />

### HWB to HSL

Recover HSV saturation and value from whiteness and blackness (normalizing when `W + B ≥ 1`), then convert HSV → HSL:

<Katex expression="V = 1 - B, \quad S_V = \begin{cases} 0 & V = 0 \\ 1 - W/V & \text{otherwise} \end{cases}" />

When <Katex expression="W + B \geq 1" :display-mode="false" />, the color collapses to gray: <Katex expression="V = W/(W+B),\; S_V = 0" :display-mode="false" />.

---

## Common Applications

1. **Web design**: First-class CSS function (`hwb()`), useful for declaring tints and shades directly in stylesheets.
2. **Color pickers**: Some modern pickers expose HWB as a triangle or square selector—whiteness on one axis, blackness on the other.
3. **Palette generation**: Sweep `W` and `B` for a given hue to produce coherent tint/shade ramps.
4. **Accessibility**: Straightforward to create high-contrast variants—push `B` up for darker, `W` up for lighter.
5. **Education**: The tint-shade-tone model maps directly to traditional color theory vocabulary.