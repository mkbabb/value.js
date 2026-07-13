<template>
    <!-- T.W5 (PP-8 cap cure, the H.W3 PaletteCardSwatches lift precedent):
         the metadata chip cluster — fork indicator/count, version count, tag
         chips, vote button — colocated out of PaletteCard.vue's title row. -->

    <!-- Fork indicator -->
    <span
        v-if="palette.forkOf"
        class="flex items-center gap-0.5 text-micro text-muted-foreground shrink-0"
        :title="`Remixed from ${palette.forkOf}`"
    >
        <GitFork class="w-3 h-3" />
    </span>

    <!-- Fork count -->
    <span
        v-if="(palette.forkCount ?? 0) > 0"
        class="flex items-center gap-0.5 text-micro text-muted-foreground shrink-0"
        :title="`${palette.forkCount} remix${palette.forkCount === 1 ? '' : 'es'}`"
    >
        <GitFork class="w-3 h-3" />
        <span class="fira-code">{{ palette.forkCount }}</span>
    </span>

    <!-- Version count -->
    <span
        v-if="(palette.versionCount ?? 0) > 1"
        class="flex items-center gap-0.5 text-micro text-muted-foreground shrink-0"
        :title="`${palette.versionCount} versions`"
    >
        <History class="w-3 h-3" />
        <span class="fira-code">{{ palette.versionCount }}</span>
    </span>

    <!-- Tag chips -->
    <span
        v-for="tag in (palette.tags ?? []).slice(0, 3)"
        :key="tag"
        class="rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground shrink-0"
    >{{ tag }}</span>

    <!-- Vote count -->
    <button
        v-if="!palette.isLocal"
        class="flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        :aria-label="`${palette.voteCount ?? 0} votes, click to vote`"
        @click.stop="emit('vote', palette)"
    >
        <Heart
            class="w-3.5 h-3.5 transition-colors"
            :class="palette.voted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'"
        />
        <span class="text-mono-small text-muted-foreground">{{ palette.voteCount ?? 0 }}</span>
    </button>
</template>

<script setup lang="ts">
import { GitFork, History, Heart } from "@lucide/vue";
import type { Palette } from "@lib/palette/types";

const { palette } = defineProps<{ palette: Palette }>();

const emit = defineEmits<{ vote: [palette: Palette] }>();
</script>
