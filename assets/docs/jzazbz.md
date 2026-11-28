### Where it came from

Muhammad Safdar, Guihua Cui, Youn Jin Kim and Ming Ronnier Luo published Jzazbz in Optics Express in 2017, fitted to colour-difference and hue data across HDR brightness and wide gamuts.

### How to read it

Jz is lightness, about 0.222 for a 203 cd/m² white here; az runs red to green and bz yellow to blue, as Lab's a and b do. Its curve is PQ's with a steeper exponent, 1.7 × 2523/32, and a last step that sharpens the darks.

### What to watch for

- Like ICtCp it's absolute, so the white's luminance changes every number.
- Greys don't land exactly on az = bz = 0: white sits about 0.0002 off, a small offset in the model.
- Its polar form, JzCzhz, isn't offered by value.js; CSS has neither.
