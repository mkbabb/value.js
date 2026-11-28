<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

Alvy Ray Smith published HSV in 1978, in "Color Gamut Transform Pairs", for the paint programs he was building. It's also called HSB, with B for brightness. The large square in this picker is an HSV square: saturation across, value up.

### How to read it

Value is the largest of the three channels, and saturation is how much of it the smallest channel leaves:

<Katex expression="V = \max(R, G, B),\qquad S = \frac{V - \min(R, G, B)}{V}" />

So V of 100% with S of 0 is white, and any colour with V of 0 is black. To pale a colour toward white you lower S; to darken it you lower V.

### What to watch for

- CSS has no `hsv()`. `hwb()` is the same cylinder cut another way: whiteness is (1 − S)V and blackness is 1 − V.
- Value isn't brightness as you see it: pure blue and pure yellow both sit at V of 100%.
- Near black, hue and saturation are unstable, and a round trip through OKLCh can lose the hue; this picker keeps the hue you chose for that reason.
