### Where it came from

Björn Ottosson published Oklab in December 2020. He fitted it to modern colour-appearance data so that equal steps look equal, and kept the arithmetic small: a matrix, a cube root, another matrix. CSS Color 4 took it up, and by 2023 every major browser could draw it.

### How to read it

L runs from 0 to 1 (CSS writes it as a percentage). a and b are the same opponent axes as Lab's, on a smaller scale: the most vivid colours a screen shows sit about 0.3 from grey. Distance means something here. value.js's `deltaEOK` is the straight-line distance in Oklab, and 0.02 is the just-noticeable difference CSS Color 4 uses when it maps a colour into a gamut.

### What to watch for

- CSS Color 4 makes Oklab the default space for interpolation, but colours written in the legacy sRGB forms (hex, `rgb()`, `hsl()`) still mix in sRGB unless you say otherwise. Write `in oklab` to be sure.
- It's fitted to ordinary, SDR brightness. For HDR, ICtCp and Jzazbz are made for the job.
- To fit a colour onto a screen, value.js holds its OKLCh lightness and hue and halves its way down the chroma until every channel fits (`mapColorToGamut`); it doesn't use Ottosson's analytic cusp method.
