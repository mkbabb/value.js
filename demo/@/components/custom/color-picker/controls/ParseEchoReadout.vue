<template>
    <!-- Parsed structure plus the producer-owned sRGB mapping verdict. -->
    <div
        v-if="astEcho || gamutVerdict"
        class="fira-code text-mono-small flex flex-col items-center gap-1"
    >
        <div v-if="astEcho" class="flex flex-wrap justify-center gap-x-2 gap-y-0.5">
            <!-- D6 (T.W3-5 / A11Y-F4): the `/70` alpha-post-multiply on an
                 already-below-floor muted ink is DEAD — both spans wear the
                 certified `--ink-muted` rung; the eyebrow keeps its quieter
                 read through case + tracking, never through opacity. -->
            <span class="uppercase tracking-[0.14em] echo-ink">{{ astEcho.space }}</span>
            <span
                v-for="part in astEcho.parts"
                :key="part"
                class="echo-ink whitespace-nowrap"
                >{{ part }}</span
            >
        </div>
        <div v-if="gamutVerdict" class="gamut-verdict" :data-clips="gamutVerdict.clips">
            <template v-if="gamutVerdict.clips">outside srgb gamut</template>
            <template v-else>in srgb gamut</template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { COLOR_MODEL_KEY } from "@composables/color/keys";

const { astEcho, gamutVerdict } = inject(COLOR_MODEL_KEY)!;
</script>

<style scoped>
/* The echo ink — the certified de-emphasis rung (D6, T.W3-5): floor-clamped
 * against the live resting plate by the boot writer. */
.echo-ink {
    color: var(--ink-muted);
}

/* E4 — the gamut-verdict voice: quiet when in gamut, amber-leaning when the
 * typed color clips visibly in sRGB (the plate-caption register). */
.gamut-verdict {
    color: var(--ink-muted);
}
.gamut-verdict[data-clips="true"] {
    color: color-mix(in oklab, var(--foreground) 35%, var(--color-gold, orange));
}
</style>
