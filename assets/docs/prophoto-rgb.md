### Where it came from

Kodak designed ROMM RGB around 2000 as a working space for raw photographs that would clip almost nothing a camera records. It's now ISO 22028-2, and photo editors such as Lightroom work in a linear form of it.

### How to read it

Its primaries are so far out that the green and blue lie beyond the spectral locus: they're imaginary, with no light that could make them. The white is D50, the white of print, so value.js carries its XYZ to D65 with Bradford. The curve is a 1.8 power with a short straight foot below 1/32, as CSS Color 4 gives it.

### What to watch for

- At 8 bits a channel its steps are wide enough to band in a smooth sky. Use 16 bits, or floats.
- A good part of its volume is no colour at all, so a ProPhoto triple picked at random may be nothing a person can see.
