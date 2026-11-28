### Where it came from

Heat an ideal black body and it glows: dull red, then orange, white, and at last a pale blue. Max Planck's law of 1900 gives its spectrum at every temperature, and the CIE's chromaticity diagram turns those spectra into a curve, the Planckian locus. Lighting has named its whites by that curve ever since.

### How to read it

One number, in kelvin, from 1000 to 40,000 here. Candlelight is near 1900 K, a household bulb 2700 K, noon sun about 5500 K and the D65 daylight of screens about 6500 K. The eye's steps are closer to even in mireds, a million divided by the temperature, which is how the strip above is spaced.

value.js draws it with Tanner Helland's 2012 fit: power and logarithm curves fitted to a table of black-body colours in sRGB (the first step above), each channel clipped to 0 through 255. Going the other way, it searches every whole kelvin from 1000 to 40,000 for the nearest colour in XYZ.

### What to watch for

- The fit lives in sRGB with its brightest channel at 255, so it gives a light's hue, not its brightness, and it drifts from the true locus at the extremes.
- Most colours aren't on the curve at all. Converting a green to kelvin returns the nearest temperature, which may look nothing like it.
- Real lamps sit off the locus. Their correlated colour temperature is the nearest point on it, and their tint, green or magenta, is a second number this space doesn't have.
