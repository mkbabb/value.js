<template>
    <TabsContent value="saved" class="mt-0 w-full palette-tab-content" force-mount>
            <div class="grid gap-3 pb-3">
                <!-- Current working palette -->
                <CurrentPaletteEditor
                    :saved-color-strings="savedColorStrings"
                    :css-color-opaque="cssColorOpaque"
                    :saved-palette-count="savedPalettes.length"
                    :saved-palettes="savedPalettes"
                    @apply="(colors) => $emit('apply', colors)"
                    @add-color="(css) => $emit('addColor', css)"
                    @start-edit="(target) => $emit('startEdit', target)"
                    @saved="(name, colors) => $emit('saved', name, colors)"
                    @updated="(id, colors) => $emit('updated', id, colors)"
                    @commit-edit="$emit('commitEdit')"
                    @cancel-edit="$emit('cancelEdit')"
                />

                <!-- Saved palettes toolbar -->
                <div v-if="savedPalettes.length > 0" class="flex items-center gap-2">
                    <span class="fira-code text-xs text-muted-foreground">
                        {{ savedPalettes.length }} palette{{ savedPalettes.length !== 1 ? 's' : '' }}
                    </span>
                    <div class="flex-1" />
                    <Button
                        variant="destructive"
                        size="icon"
                        class="h-7 w-7 rounded-full cursor-pointer"
                        @click="$emit('deleteAll')"
                    >
                        <Trash2 class="w-3.5 h-3.5" />
                    </Button>
                </div>

                <PaletteCardGrid
                    :empty="filteredSaved.length === 0"
                    empty-text="No saved palettes yet. Add colors above, then save."
                >
                    <PaletteCard
                        v-for="palette in filteredSaved"
                        :key="palette.id"
                        :palette="palette"
                        :expanded="expandedId === palette.id"
                        :css-color="cssColorOpaque"
                        :editable-name="true"
                        @click="$emit('toggleExpand', palette.id)"
                        @apply="(p) => $emit('applyPalette', p)"
                        @delete="(p) => $emit('delete', p)"
                        @publish="(p) => $emit('publish', p)"
                        @rename="(p, name) => $emit('rename', p, name)"
                        @edit-color="(p, idx, css) => $emit('editColor', p, idx, css)"
                    />
                </PaletteCardGrid>
            </div>
    </TabsContent>
</template>

<script setup lang="ts">
import { TabsContent } from "@components/ui/tabs";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-vue-next";

import CurrentPaletteEditor from "./CurrentPaletteEditor.vue";
import PaletteCard from "./PaletteCard.vue";
import PaletteCardGrid from "./PaletteCardGrid.vue";
import type { Palette, PaletteColor } from "@lib/palette/types";

defineProps<{
    savedColorStrings: string[];
    cssColorOpaque: string;
    savedPalettes: Palette[];
    filteredSaved: Palette[];
    expandedId: string | null;
}>();

defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
    startEdit: [target: { paletteId: string; colorIndex: number; originalCss: string }];
    saved: [name: string, colors: PaletteColor[]];
    updated: [id: string, colors: PaletteColor[]];
    commitEdit: [];
    cancelEdit: [];
    deleteAll: [];
    toggleExpand: [id: string];
    applyPalette: [palette: Palette];
    delete: [palette: Palette];
    publish: [palette: Palette];
    rename: [palette: Palette, newName: string];
    editColor: [palette: Palette, colorIndex: number, css: string];
}>();
</script>
