<template>
    <Card class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm">
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
                <PaletteCardGrid
                    v-else
                    :empty="pm.filteredBrowse.value.length === 0"
                    empty-text="No published palettes found."
                    :grid-class="pm.sortLoading.value ? 'opacity-50' : ''"
                >
                    <PaletteCard
                        v-for="palette in pm.filteredBrowse.value"
                        :key="palette.slug"
                        :palette="palette"
                        :expanded="pm.expandedId.value === palette.id"
                        :css-color="cssColorOpaque"
                        :is-owned="palette.userSlug === pm.userSlug.value"
                        :is-admin="pm.isAdminAuthenticated.value"
                        show-slug
                        @click="pm.toggleExpand(palette.id)"
                        @apply="(p) => pm.onApply(p)"
                        @save="(p) => pm.onSaveRemote(p)"
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
import { inject } from "vue";
import { Card } from "@components/ui/card";
import { Loader2, Search } from "lucide-vue-next";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import SortFilterMenu from "@components/custom/palette-browser/SortFilterMenu.vue";
import PaneSearchBar from "./PaneSearchBar.vue";
import PaneHeader from "./PaneHeader.vue";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;
</script>
