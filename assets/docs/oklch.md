<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

OKLCh is Oklab in polar form, as LCh is Lab's. It arrived with Oklab in 2020 and came to CSS as `oklch()`, where design systems have taken to it for their colours.

### How to read it

<Katex expression="C = \sqrt{a^2 + b^2},\qquad h = \operatorname{atan2}(b,\ a) \cdot \frac{180}{\pi}" />

Lightness runs from 0 to 1, chroma from 0 to about 0.32 for sRGB's most vivid colours (more on a wide-gamut screen), and hue is in degrees, though Oklab's angles aren't Lab's: sRGB's red sits near 29°, yellow near 110°, green near 142° and blue near 264°.

### What to watch for

- The same chroma is vivid for one hue and out of reach for another, so a palette at fixed chroma needs mapping to fit a screen.
- Mixing in a polar space goes round the hue circle. `shorter` takes the short way round; the mixing figure lets you try the other three.
- Near grey the hue is powerless. value.js treats a chroma of 0.000004 or less as none and marks the hue `none`.
