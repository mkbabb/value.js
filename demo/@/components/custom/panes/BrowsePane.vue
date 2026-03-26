<template>
    <Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader description="Discover palettes from the community.">Browse</PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <PaneSearchBar
                v-model:search="pm.searchQuery.value"
                placeholder="Search palettes..."
            >
                <SortFilterMenu
                    :sort="pm.sortMode.value"
                    @update:sort="pm.onSortChange"
                />
            </PaneSearchBar>

            <div class="grid gap-3 pb-3">
                <div
                    v-if="pm.browsing.value"
                    class="flex items-center justify-center min-h-[120px]"
                >
                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                </div>

                <!-- Error with retry -->
                <div
                    v-else-if="pm.browseError.value && pm.filteredBrowse.value.length === 0"
                    class="flex flex-col items-center justify-center gap-2 min-h-[120px]"
                >
                    <span class="fira-code text-xs text-muted-foreground">{{ pm.browseError.value }}</span>
                    <button
                        class="dock-icon-btn-compact fira-code text-xs text-primary"
                        @click="pm.loadRemotePalettes()"
                    >
                        Tap to retry
                    </button>
                </div>

                <PaletteCardGrid
                    v-else
                    :empty="pm.filteredBrowse.value.length === 0"
                    empty-text="No published palettes found."
                    :grid-class="pm.sortLoading.value ? 'opacity-50' : ''"
                >
                    <PaletteCard
                        v-for="palette in pm.filteredBrowse.value"
                        :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
                        :key="palette.slug"
                        :palette="palette"
                        :expanded="pm.expandedId.value === palette.id"
                        :css-color="cssColorOpaque"
                        :is-owned="palette.userSlug === pm.userSlug.value"
                        :is-admin="pm.isAdminAuthenticated.value"
                        show-slug
                        @click="pm.toggleExpand(palette.id)"
                        @save="(p) => onSave(p)"
                        @delete="(p) => onDeleteOwned(p)"
                        @vote="(p) => pm.onVote(p)"
                        @rename="(p, name) => pm.onRename(p, name)"
                        @edit-color="(p, idx, css) => pm.onEditColor(p, idx, css)"
                        @add-color="(css) => pm.onSwatchAddColor(css)"
                        @feature="(p) => pm.onFeaturePalette(p)"
                        @admin-delete="(p) => pm.onAdminDeletePalette(p)"
                    />
                </PaletteCardGrid>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { inject, reactive } from "vue";
import { Card } from "@components/ui/card";
import { Loader2 } from "lucide-vue-next";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import SortFilterMenu from "@components/custom/palette-browser/SortFilterMenu.vue";
import PaneSearchBar from "./PaneSearchBar.vue";
import PaneHeader from "./PaneHeader.vue";
import type { Palette } from "@lib/palette/types";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});

function onSave(palette: Palette) {
    pm.onSaveRemote(palette);
    const card = cardRefs[palette.slug];
    if (card) {
        card.showFeedback("Saved!", "success");
    }
}

async function onDeleteOwned(palette: Palette) {
    const result = await pm.onDeleteOwned(palette);
    if (!result.success) {
        const card = cardRefs[palette.slug];
        if (card) {
            card.showFeedback(result.message, "error");
        }
    }
}
</script>
