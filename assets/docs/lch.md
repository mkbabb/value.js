<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

LCh is Lab read in polar coordinates, defined by the CIE alongside it: the same lightness, with chroma for the distance from the grey axis and hue for the angle round it. Designers had asked for exactly these handles, and CSS Color 4 gave them `lch()`.

### How to read it

<Katex expression="C = \sqrt{a^2 + b^2},\qquad h = \operatorname{atan2}(b,\ a) \cdot \frac{180}{\pi}" />

Hue 0 points along positive a (a magenta-red), 90 along positive b (yellow), 180 to green and 270 to blue. Chroma has no fixed top: it goes as far as the colour does, and sRGB runs out long before LCh does.

### What to watch for

- Its hue lines bend. A blue of constant LCh hue turns purple as it lightens; OKLCh straightened them, so prefer it for new palettes.
- Near grey the hue is powerless. value.js treats a chroma of 0.0015 or less as none and marks the hue `none`.
- Vivid LCh colours are often outside sRGB, and how they're brought back matters. value.js holds OKLCh lightness and hue and lowers chroma until the colour fits, so the hue you chose survives.
