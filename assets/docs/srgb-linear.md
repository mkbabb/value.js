### Where it came from

It's sRGB's own linear light: the values its transfer curve encodes. CSS Color 4 named it as a space, `srgb-linear`, so it can be written and mixed in directly.

### How to read it

Each channel is proportional to the light a display gives out, from 0 to 1. Linear 0.5 is half the light, and it encodes to about 0.735, or 188 in sRGB bytes.

### What to watch for

- Blend here and choose elsewhere. Light adds in this space, so blur, scale and composite in it; but equal steps here crowd toward the lights, so pick colours in OKLCh.
- At 8 bits a channel, linear values band badly in the darks; that's why sRGB encodes them. Keep linear values in floats.
- Values below 0 or above 1 are colours outside sRGB, not errors. value.js keeps them, and the steps above show where the screen clips them.
