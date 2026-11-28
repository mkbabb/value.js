<script setup>
import { Katex } from "../../demo/scenes/about/katex";
</script>

### Where it came from

Dolby designed ICtCp for HDR and wide-gamut video, and the ITU took it into BT.2100 in 2016. It's built, as Oklab is, from cone responses, but they're compressed with the PQ curve that HDR signals use, which spans black to 10,000 cd/m².

### How to read it

I is intensity, the lightness-like axis; Ct is the blue-yellow (tritan) axis and Cp the red-green (protan) axis. value.js places sRGB's white at 203 cd/m², the HDR reference white of ITU-R BT.2408, so a white reads an I of about 0.58. Differences are measured as ΔE ITP (BT.2124), where one unit is about one just-noticeable step:

<Katex expression="\Delta E_{ITP} = 720\sqrt{\Delta I^2 + \Delta T^2 + \Delta P^2},\qquad T = 0.5\,C_T,\quad P = C_P" />

### What to watch for

- It's absolute: the numbers depend on how bright white is taken to be. A tool that puts white at 100 cd/m² gives other numbers for the same colour.
- CSS has no ICtCp; the code above writes the same colour as `oklch()`.
