<template>
    <Card class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm">
        <div class="px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-10 backdrop-blur-md">
            <h3 class="fraunces text-3xl sm:text-4xl tracking-tight">
                <span class="capitalize pastel-rainbow-text">My Palettes</span>
                <span v-if="pm.savedPalettes.value.length > 0" class="fira-code text-sm font-normal text-muted-foreground ml-2">{{ pm.savedPalettes.value.length }}</span>
            </h3>
            <p class="text-sm text-muted-foreground/60 fira-code">Save, organize, and share your colors.</p>
        </div>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <PaneSearchBar
                v-model:search="pm.searchQuery.value"
                placeholder="Search palettes..."
            />

            <!-- Current palette + saved list -->
            <div class="grid gap-3">
                <CurrentPaletteEditor
                    :saved-color-strings="savedColorStrings"
                    :css-color-opaque="cssColorOpaque"
                    :saved-palette-count="pm.savedPalettes.value.length"
                    :saved-palettes="pm.savedPalettes.value"
                    @apply="(colors) => pm.emitApply(colors)"
                    @add-color="(css) => pm.emitAddColor(css)"
                    @start-edit="(target) => pm.emitStartEdit(target)"
                    @saved="(name, colors) => pm.onCurrentPaletteSaved(name, colors)"
                    @updated="(id, colors) => pm.onCurrentPaletteUpdated(id, colors)"
                    @commit-edit="emit('commitEdit')"
                    @cancel-edit="emit('cancelEdit')"
                />

                <!-- Saved palettes toolbar -->
                <div v-if="pm.savedPalettes.value.length > 0" class="flex items-center gap-2">
                    <span class="fira-code text-xs text-muted-foreground">
                        {{ pm.savedPalettes.value.length }} palette{{ pm.savedPalettes.value.length !== 1 ? 's' : '' }}
                    </span>
                    <div class="flex-1" />
                    <Button
                        variant="destructive"
                        size="icon"
                        class="h-7 w-7 rounded-full cursor-pointer"
                        @click="pm.showDeleteAllConfirm.value = true"
                    >
                        <Trash2 class="w-3.5 h-3.5" />
                    </Button>
                </div>

                <PaletteCardGrid
                    :empty="pm.filteredSaved.value.length === 0"
                    empty-text="No saved palettes yet. Add colors above, then save."
                >
                    <PaletteCard
                        v-for="palette in pm.filteredSaved.value"
                        :key="palette.id"
                        :palette="palette"
                        :expanded="pm.expandedId.value === palette.id"
                        :css-color="cssColorOpaque"
                        :editable-name="true"
                        @click="pm.toggleExpand(palette.id)"
                        @apply="(p) => pm.onApply(p)"
                        @delete="(p) => pm.onDelete(p)"
                        @publish="(p) => pm.onPublish(p)"
                        @rename="(p, name) => pm.onRenameSaved(p, name)"
                        @edit-color="(p, idx, css) => pm.onEditColor(p, idx, css)"
                    />
                </PaletteCardGrid>
            </div>

            <!-- Delete all confirmation -->
            <ConfirmDialog
                v-model:open="pm.showDeleteAllConfirm.value"
                title="Delete all saved palettes?"
                :description="`This will permanently delete ${pm.savedPalettes.value.length} palette${pm.savedPalettes.value.length !== 1 ? 's' : ''} from local storage. This cannot be undone.`"
                confirm-label="Delete all"
                destructive
                @confirm="pm.onDeleteAllSaved"
            >
                <template #action>
                    <Trash2 class="w-3.5 h-3.5" />
                    Delete all
                </template>
            </ConfirmDialog>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Card } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Trash2, Palette } from "lucide-vue-next";
import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";
import CurrentPaletteEditor from "@components/custom/palette-browser/CurrentPaletteEditor.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import ConfirmDialog from "@components/custom/palette-browser/ConfirmDialog.vue";
import PaneSearchBar from "./PaneSearchBar.vue";

const props = defineProps<{
    savedColorStrings: string[];
    cssColorOpaque: string;
}>();

const emit = defineEmits<{
    commitEdit: [];
    cancelEdit: [];
}>();

const pm = inject(PALETTE_MANAGER_KEY)!;
</script>
