### Where it came from

In 1976 the CIE published two spaces meant to make distance mean difference: CIELUV for lights and CIELAB for surfaces. Lab won the paint, textile and print trades, and for forty years it's been how industry decides whether two colours match.

### How to read it

L runs from 0, black, to 100, the reference white. a and b are opponent axes, as the eye's own signals are: negative a is green and positive a red, negative b blue and positive b yellow. The lightness curve is a cube root with a short straight foot at the bottom, where a cube root would be too steep to trust; those are the ε and κ in the steps above.

### What to watch for

- CSS measures `lab()` against D50, the white of print and of ICC profiles, while screens are D65. value.js crosses between them with the Bradford adaptation, as CSS Color 4 does.
- Lab is less even than it looks. Its blues are the famous failure: halfway from `#0000ff` to white in Lab is a lilac, `#af89ff`, where Oklab gives a blue, `#74a3ff`. Mix your colour toward blue or white in the figure to see it.
- Straight-line distance in Lab (ΔE 1976) overstates differences between saturated colours. value.js offers `deltaEOK` instead, the Oklab distance CSS Color 4's gamut mapping uses.
