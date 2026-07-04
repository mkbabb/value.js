<template>
    <!-- E4 (Q10): the Parse-Lab echo — the parsed structure + the typed gamut
         verdict, in the plate-caption voice. The verdict is the SAME
         deltaEOK/gamutMapOKLab/DELTA_E_OK_JND computation the spectrum
         overlay draws — they cannot disagree. -->
    <div
        v-if="astEcho || gamutVerdict"
        class="fira-code text-mono-small flex flex-col items-center gap-1"
    >
        <div v-if="astEcho" class="flex flex-wrap justify-center gap-x-2 gap-y-0.5">
            <span class="uppercase tracking-[0.14em] text-muted-foreground/70">{{ astEcho.space }}</span>
            <span
                v-for="part in astEcho.parts"
                :key="part"
                class="text-muted-foreground whitespace-nowrap"
                >{{ part }}</span
            >
        </div>
        <div v-if="gamutVerdict" class="gamut-verdict" :data-clips="gamutVerdict.clips">
            <template v-if="gamutVerdict.clips">
                clips in srgb — Δ {{ gamutVerdict.delta.toFixed(3) }} ≈
                {{ gamutVerdict.jndRatio.toFixed(1) }}× jnd
            </template>
            <template v-else>in srgb — Δ &lt; jnd</template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { COLOR_MODEL_KEY } from "../keys";

const { astEcho, gamutVerdict } = inject(COLOR_MODEL_KEY)!;
</script>

<style scoped>
/* E4 — the gamut-verdict voice: quiet when in gamut, amber-leaning when the
 * typed color clips visibly in sRGB (the plate-caption register). */
.gamut-verdict {
    color: var(--muted-foreground);
}
.gamut-verdict[data-clips="true"] {
    color: color-mix(in oklab, var(--foreground) 35%, var(--color-gold, orange));
}
</style>
