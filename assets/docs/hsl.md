<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

George Joblove and Donald Greenberg described HSL at SIGGRAPH in 1978, the same year Alvy Ray Smith described HSV; both were after a friendlier handle on RGB than three channel numbers. CSS took up `hsl()` in Color Level 3.

### How to read it

Hue is an angle in degrees: 0 red, 60 yellow, 120 green, 180 cyan, 240 blue, 300 magenta. Lightness runs from black at 0% through the pure hue at 50% to white at 100%, and saturation is how far the colour stands from the grey of the same lightness. Going the other way, from sRGB:

<Katex expression="L = \frac{\max + \min}{2},\qquad S = \frac{\max - L}{\min(L,\ 1 - L)}" />

It's a reshaping of the sRGB cube, so it holds exactly the colours sRGB holds, no more.

### What to watch for

- HSL's lightness is the average of the largest and smallest channel, not the lightness you see. `hsl(60 100% 50%)` and `hsl(240 100% 50%)` share an L of 50%, yet yellow is nearly white to the eye and blue nearly black; their Oklab lightness is 0.968 and 0.452.
- Turning the hue at a fixed S and L gives a rainbow of uneven brightness, which is why palettes built that way look lumpy.
- When saturation or lightness leaves no colour (a grey, black or white), the hue is powerless, and value.js marks it `none`, as CSS Color 4 does.
