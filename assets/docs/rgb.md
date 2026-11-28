### Where it came from

In 1996 Hewlett-Packard and Microsoft proposed one default colour space for the young web, so that a number sent from one machine would mean roughly the same colour on another. They took the primaries of HDTV (ITU-R BT.709), the D65 daylight white, and a transfer curve close to the 2.2 gamma of the monitors of the day. The IEC published it in 1999 as IEC 61966-2-1, and CSS has spoken it ever since.

### How to read it

The three numbers aren't amounts of light. They're encoded: each went through a curve that spends more of its 256 steps on the darks, where the eye is most discerning. To get light back, decode first (the first step above), and only then do arithmetic. That's why 128 is not half as bright as 255; decoded, it's about 22% of the light.

### What to watch for

- Averaging encoded numbers darkens a blend. Halfway from red to green in sRGB is a muddy olive, `rgb(128 128 0)`; the same mix in linear light is a brighter yellow, `rgb(188 188 0)`. The mixing figure shows the difference for your colour.
- `rgb()` clamps to 0 through 255 when it's parsed. A colour outside sRGB is written `color(srgb …)` instead, with numbers below 0 or above 1, and that's how value.js serializes one.
- Equal steps in R, G or B aren't equal steps to the eye. For ramps and palettes, step in OKLCh.
