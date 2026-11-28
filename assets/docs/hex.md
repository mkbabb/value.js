<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

Hex is no space of its own: it's sRGB written in base 16. The `#` spelling comes from the X Window System, reached the web through HTML attributes such as `bgcolor`, and was written into CSS1 in 1996. CSS Color 4 added the four- and eight-digit forms that carry alpha.

### How to read it

Each pair of digits is one byte. The first digit counts sixteens and the second counts ones, so `c0` is 12 × 16 + 0 = 192:

<Katex expression="V = 16\,d_1 + d_0,\qquad d_1 = \left\lfloor V / 16 \right\rfloor,\quad d_0 = V \bmod 16" />

The short forms double each digit: `#f80` is `#ff8800`, and `#f808` is `#ff880088`. The last pair, when there is one, is alpha, so `80` (128) is about half-transparent.

### What to watch for

- Hex is always 8 bits a channel, so it can't hold a colour between two bytes or outside sRGB. value.js's `toHex` clips to sRGB and rounds half to even: 127.5 becomes 128, and so does 128.5.
- Equal steps in hex are no more even to the eye than equal steps in sRGB, for the same reason.
