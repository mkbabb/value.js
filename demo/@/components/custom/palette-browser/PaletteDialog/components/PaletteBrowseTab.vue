<template>
    <TabsContent value="browse" class="mt-0 w-full palette-tab-content" force-mount>
            <div class="grid gap-3 pb-3">
                <!-- W5-1 (S-10): the dialog wall loads in the same
                     developing-plate grammar as BrowsePane — no spinner. -->
                <div
                    v-if="browsing"
                    class="grid grid-cols-1 gap-3"
                    aria-label="Loading palettes"
                >
                    <PaletteCardSkeleton v-for="i in 4" :key="i" variant="developing" />
                </div>
                <PaletteCardGrid
                    v-else
                    :empty="filteredBrowse.length === 0"
                    empty-eyebrow="· the commons ·"
                    empty-text="No published palettes here yet."
                    empty-hint="Publish one from My Palettes and start the wall."
                    :grid-class="
                        'transition-opacity duration-fast ' +
                        (sortLoading ? 'opacity-50' : '')
                    "
                >
                    <PaletteCard
                        v-for="palette in filteredBrowse"
                        :key="palette.slug"
                        :palette="palette"
                        :expanded="expandedId === palette.slug"
                        :css-color="cssColorOpaque"
                        :is-owned="palette.userSlug === userSlug"
                        :is-admin="isAdmin"
                        show-slug
                        @click="$emit('toggleExpand', palette.slug)"
                        @save="(p) => $emit('save', p)"
                        @delete="(p) => $emit('delete', p)"
                        @vote="(p) => $emit('vote', p)"
                        @rename="(p, name) => $emit('rename', p, name)"
                        @edit-color="(p, idx, css) => $emit('editColor', p, idx, css)"
                        @add-color="(css) => $emit('addColor', css)"
                        @feature="(p) => $emit('feature', p)"
                        @admin-delete="(p) => $emit('adminDelete', p)"
                        @fork="(p) => $emit('fork', p)"
                        @versions="(p) => $emit('versions', p)"
                        @flag="(p) => $emit('flag', p)"
                        @export="(p, fmt) => $emit('export', p, fmt)"
                    />
                </PaletteCardGrid>

                <!-- Infinite scroll sentinel -->
                <div
                    v-if="!browsing && filteredBrowse.length > 0"
                    ref="sentinelRef"
                    class="h-4"
                />

                <!-- W5-1: loading-more appends developing plates in place of
                     the former spinner + caption row — the next page arrives
                     in the same shape it will render. -->
                <div v-if="loadingMore" class="grid grid-cols-1 gap-3" aria-label="Loading more palettes">
                    <PaletteCardSkeleton v-for="i in 2" :key="i" variant="developing" />
                </div>
            </div>
    </TabsContent>
</template>

<script setup lang="ts">
import { TabsContent } from "reka-ui";

import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import PaletteCardSkeleton from "@components/custom/palette-browser/PaletteCardSkeleton.vue";
import type { Palette } from "@lib/palette/types";

defineProps<{
    browsing: boolean;
    sortLoading: boolean;
    filteredBrowse: Palette[];
    expandedId: string | null;
    cssColorOpaque: string;
    userSlug: string | null;
    isAdmin: boolean;
    loadingMore?: boolean;
}>();

defineEmits<{
    toggleExpand: [id: string];
    save: [palette: Palette];
    delete: [palette: Palette];
    vote: [palette: Palette];
    rename: [palette: Palette, newName: string];
    editColor: [palette: Palette, colorIndex: number, css: string];
    addColor: [css: string];
    feature: [palette: Palette];
    adminDelete: [palette: Palette];
    fork: [palette: Palette];
    versions: [palette: Palette];
    flag: [palette: Palette];
    export: [palette: Palette, format: string];
}>();

const sentinelRef = defineModel<HTMLElement | null>("sentinelRef");
</script>
