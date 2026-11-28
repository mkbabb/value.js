<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

Alvy Ray Smith proposed HWB in 1996, eighteen years after HSV, as the more intuitive of the two ("HWB: A More Intuitive Hue-Based Color Model"). It came to CSS with Color Level 4.

### How to read it

Start from a pure hue, then add white and black as a painter would. Whiteness is the smallest channel and blackness is one less the largest:

<Katex expression="W = \min(R, G, B),\qquad B = 1 - \max(R, G, B)" />

So `hwb(0 0% 0%)` is pure red, `hwb(0 50% 0%)` a pink and `hwb(0 0% 50%)` a maroon.

### What to watch for

- When whiteness and blackness add to 100% or more, the colour is the grey W / (W + B), whatever the hue says, and value.js marks the hue `none`.
- It shares HSL's flaw: equal steps aren't equal to the eye.
