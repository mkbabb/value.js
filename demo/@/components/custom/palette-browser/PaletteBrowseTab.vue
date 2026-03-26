<template>
    <TabsContent value="browse" class="mt-0 w-full palette-tab-content" force-mount>
            <div class="grid gap-3 pb-3">
                <div
                    v-if="browsing"
                    class="flex items-center justify-center min-h-[120px]"
                >
                    <Loader2
                        class="w-5 h-5 animate-spin text-muted-foreground"
                    />
                </div>
                <PaletteCardGrid
                    v-else
                    :empty="filteredBrowse.length === 0"
                    empty-text="No published palettes found."
                    :grid-class="sortLoading ? 'opacity-50' : ''"
                >
                    <PaletteCard
                        v-for="palette in filteredBrowse"
                        :key="palette.slug"
                        :palette="palette"
                        :expanded="expandedId === palette.id"
                        :css-color="cssColorOpaque"
                        :is-owned="palette.userSlug === userSlug"
                        :is-admin="isAdmin"
                        show-slug
                        @click="$emit('toggleExpand', palette.id)"
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

                <!-- Loading more indicator -->
                <div
                    v-if="loadingMore"
                    class="flex items-center justify-center py-3"
                >
                    <Loader2 class="w-4 h-4 animate-spin text-muted-foreground" />
                    <span class="ml-2 text-xs text-muted-foreground">Loading more...</span>
                </div>
            </div>
    </TabsContent>
</template>

<script setup lang="ts">
import { TabsContent } from "@components/ui/tabs";
import { Loader2 } from "lucide-vue-next";

import PaletteCard from "./PaletteCard.vue";
import PaletteCardGrid from "./PaletteCardGrid.vue";
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
