### Where it came from

DCI-P3 was written for digital cinema projectors. In 2015 Apple took its red, green and blue, set them on sRGB's D65 white and sRGB's transfer curve, and called the result Display P3. Phones, laptops and most new monitors show it, and CSS writes it `color(display-p3 …)`.

### How to read it

The channels run from 0 to 1 like sRGB's, but each primary stands further out: its red is redder and its green much greener. Every sRGB colour has a P3 address with all three channels between 0 and 1; plenty of P3 colours have no sRGB address at all.

### What to watch for

- Outside sRGB, a P3 colour must be mapped before an sRGB screen can show it. value.js holds lightness and hue and lowers chroma; a browser does its own mapping, which may differ.
- For such a colour the code above prints sRGB numbers below 0 or above 255. That isn't a bug; it's where the colour is. P3's pure red, for instance, is `rgb(279 -58 -38)` in sRGB's terms.
