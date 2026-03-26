<template>
    <Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader description="Save, organize, and share your colors.">
            <span class="capitalize pastel-rainbow-text">My Palettes</span>
            <span v-if="pm.savedPalettes.value.length > 0" class="fira-code text-sm font-normal text-muted-foreground ml-2">{{ pm.savedPalettes.value.length }}</span>
        </PaneHeader>
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
                    @clear-current="pm.emitApply([])"
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
                    ref="sortableGridRef"
                    :empty="pm.filteredSaved.value.length === 0"
                    empty-text="No saved palettes yet. Add colors above, then save."
                >
                    <PaletteCard
                        v-for="palette in pm.filteredSaved.value"
                        :ref="(el: any) => el && (cardRefs[palette.id] = el)"
                        :key="palette.id"
                        :palette="palette"
                        :expanded="pm.expandedId.value === palette.id"
                        :css-color="cssColorOpaque"
                        :editable-name="true"
                        draggable
                        @click="pm.toggleExpand(palette.id)"
                        @delete="(p) => pm.onDelete(p)"
                        @publish="(p) => onPublish(p)"
                        @rename="(p, name) => pm.onRenameSaved(p, name)"
                        @edit-color="(p, idx, css) => pm.onEditColor(p, idx, css)"
                        @export="(p, fmt) => onExport(p, fmt)"
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
import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";
import { Card } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-vue-next";
import { useSortable } from "@vueuse/integrations/useSortable";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import CurrentPaletteEditor from "@components/custom/palette-browser/CurrentPaletteEditor.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import { ConfirmDialog } from "@mkbabb/glass-ui";
import PaneSearchBar from "./PaneSearchBar.vue";
import PaneHeader from "./PaneHeader.vue";
import type { Palette } from "@lib/palette/types";
import { usePaletteExport } from "@composables/palette/usePaletteExport";

const props = defineProps<{
    savedColorStrings: string[];
}>();

const emit = defineEmits<{
    commitEdit: [];
    cancelEdit: [];
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});

// Drag-to-reorder
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);

useSortable(sortableEl, pm.filteredSaved.value, {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
    onEnd(evt) {
        if (evt.oldIndex == null || evt.newIndex == null) return;
        if (evt.oldIndex === evt.newIndex) return;
        const ids = pm.filteredSaved.value.map((p) => p.id);
        const [moved] = ids.splice(evt.oldIndex, 1);
        if (moved) {
            ids.splice(evt.newIndex, 0, moved);
            pm.reorderPalettes(ids);
        }
    },
});

async function onPublish(palette: Palette) {
    const result = await pm.onPublish(palette);
    const card = cardRefs[palette.id];
    if (card) {
        card.showFeedback(result.message, result.success ? "success" : "error");
    }
}

const { onExport } = usePaletteExport();
</script>
