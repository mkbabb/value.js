<template>
    <TabsContent value="browse" class="mt-0 w-full">
        <Transition name="tab-fade" mode="out-in">
            <div :key="'browse'" class="grid gap-3 pb-3">
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
                        @apply="(p) => $emit('apply', p)"
                        @save="(p) => $emit('save', p)"
                        @vote="(p) => $emit('vote', p)"
                        @rename="(p, name) => $emit('rename', p, name)"
                        @edit-color="(p, idx, css) => $emit('editColor', p, idx, css)"
                        @add-color="(css) => $emit('addColor', css)"
                        @feature="(p) => $emit('feature', p)"
                        @admin-delete="(p) => $emit('adminDelete', p)"
                    />
                </PaletteCardGrid>
            </div>
        </Transition>
    </TabsContent>
</template>

<script setup lang="ts">
import { Transition } from "vue";
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
}>();

defineEmits<{
    toggleExpand: [id: string];
    apply: [palette: Palette];
    save: [palette: Palette];
    vote: [palette: Palette];
    rename: [palette: Palette, newName: string];
    editColor: [palette: Palette, colorIndex: number, css: string];
    addColor: [css: string];
    feature: [palette: Palette];
    adminDelete: [palette: Palette];
}>();
</script>
