<!-- PalettesGlyph — the Palettes view's glyph, its paint wells in colour
     (owner [64], 2026-11-13: "palettes should be a rainbow, or a palette that's
     the palette of the aurora, dynamically generated?").

     The glyph is lucide's Palette, unchanged in outline; only its four wells
     take colour. At rest they are a rainbow (the one place the precepts allow
     one: "Only palettes should be rainbow"). Where the glyph stands for the
     view you are on (the dock's view trigger, its collapsed seal, the
     selected menu row) or a pointer or the keyboard is on its row, the wells
     are the aurora's live colours: the four ground stops the atmosphere
     writes on the root (`--saved-bg-0..3`, useAtmosphere), lifted to a
     lightness and chroma a 16 px glyph can show, hue kept. Every change of
     well colour is a tween, so a new pick or a new state flows into the
     glyph and never cuts. -->
<template>
    <Palette class="palettes-glyph" />
</template>

<script setup lang="ts">
import { Palette } from "@lucide/vue";
</script>

<style>
.palettes-glyph {
    /* the rainbow at rest: four hues a quarter turn apart */
    --palettes-well-0: oklch(0.72 0.17 25);
    --palettes-well-1: oklch(0.8 0.16 95);
    --palettes-well-2: oklch(0.74 0.15 160);
    --palettes-well-3: oklch(0.68 0.15 260);
}
/* the aurora's live colours: the view you are on, or the row you are on */
.view-select-trigger .palettes-glyph,
.dock-seal .palettes-glyph,
[role="option"][data-highlighted] .palettes-glyph,
[role="option"][data-state="checked"] .palettes-glyph {
    --palettes-well-0: oklch(from var(--saved-bg-0) 0.74 max(c, 0.13) h);
    --palettes-well-1: oklch(from var(--saved-bg-1) 0.74 max(c, 0.13) h);
    --palettes-well-2: oklch(from var(--saved-bg-2) 0.74 max(c, 0.13) h);
    --palettes-well-3: oklch(from var(--saved-bg-3) 0.74 max(c, 0.13) h);
}
.palettes-glyph circle {
    /* a well large enough for its colour to read at 16 px; no stroke ring */
    r: 2px;
    stroke: none;
    transition: fill var(--duration-fast) var(--ease-standard);
}
.palettes-glyph circle:nth-of-type(1) { fill: var(--palettes-well-0); }
.palettes-glyph circle:nth-of-type(2) { fill: var(--palettes-well-1); }
.palettes-glyph circle:nth-of-type(3) { fill: var(--palettes-well-2); }
.palettes-glyph circle:nth-of-type(4) { fill: var(--palettes-well-3); }
</style>
