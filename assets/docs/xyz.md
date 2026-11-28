<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

In 1931 the CIE turned the colour-matching experiments of William David Wright and John Guild into a standard observer: three curves saying how much of three imaginary primaries matches each wavelength. The primaries were chosen so that no colour needs a negative amount, and so that Y alone would be luminance.

### How to read it

Y is luminance, relative to the white's 1. X and Z carry the chromaticity and mean little on their own; divide each by the sum and you have the x and y of the familiar horseshoe diagram:

<Katex expression="x = \frac{X}{X + Y + Z},\qquad y = \frac{Y}{X + Y + Z}" />

### What to watch for

- XYZ only means something with its white. value.js's `xyz` is D65, as CSS's is; `xyz-d50` is a space of its own, a Bradford adaptation away.
- It's linear in light, so it's right for adding lights and wrong for judging differences: equal steps here aren't equal to the eye.
- Every conversion in value.js passes through it, except among sRGB, HSL, HSV and HWB, which go through encoded sRGB directly and never touch it.
