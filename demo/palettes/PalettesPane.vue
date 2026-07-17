<template>
    <Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <!-- T.W6 · W6-4 (Q5 RULED, T-43 owner-CONFIRMS: "'Palettes' should be
             rainbow"): the "Palettes" letterforms wear the guarded ramp — the
             SECOND of the exactly-two sanctioned sites (with the dock
             dropdown entry; one resolver, `@composables/color/palettes-ramp`,
             consumed via the ONE `.palettes-ramp-text` recipe). This is the
             Q4-record moment surviving, relocated per the ruled form; every
             OTHER pane title stays ink (S.W5-7 stands for the rest). -->
        <PaneHeader description="Save, organize, and share your colors.">
            <!-- P4-R1 (WR-8): the title is LARGE text — it consumes the
                 per-site title ramp (3:1 large-text floor, certified against
                 the resting plate) aliased into the shared recipe slots;
                 utils.css untouched, the menu entry keeps the 4.5 default. -->
            <span class="capitalize">My <span class="palettes-ramp-text" :style="rampTitleVars">Palettes</span></span>
            <!-- P4-R3 (a11y): the count badge leaves the heading's accessible
                 name (`aria-hidden`) so AT never announces "My Palettes2"; an
                 sr-only companion carries the count with a separator. -->
            <Badge
                v-if="pm.savedPalettes.value.length > 0"
                variant="secondary"
                class="text-mono-small ml-2"
                aria-hidden="true"
            >{{ pm.savedPalettes.value.length }}</Badge>
            <span v-if="pm.savedPalettes.value.length > 0" class="sr-only"> ({{ pm.savedPalettes.value.length }} saved)</span>
        </PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <!-- S.W5-7: the twin placeholder ("Search palettes..." in BOTH
                 side-by-side panes) is scoped — this one owns YOUR list.
                 T.W3-3 (T-12): a field on paper wears paper — the seated
                 register (utils.css `.search-seated`; interim, booked onto
                 the P3 seated rung / ASK-D). -->
            <SearchBar
                v-model="pm.searchQuery.value"
                class="search-seated"
                placeholder="Search your palettes..."
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

                <!-- Saved palettes toolbar. S.W5-7: the "{n} palettes" line
                     is excised (the header Badge is the canonical count —
                     it existed only to left-balance this button), and the
                     delete-all trigger is DEMOTED from an always-red beacon
                     (the highest-chroma element on the pane guarding its
                     rarest action) to a quiet ghost — red on hover/focus. -->
                <div v-if="pm.savedPalettes.value.length > 0" class="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        icon-only
                        size="xs"
                        class="cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10"
                        aria-label="Delete all saved palettes"
                        @click="pm.showDeleteAllConfirm.value = true"
                    >
                        <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                </div>

                <PaletteCardGrid
                    ref="sortableGridRef"
                    :empty="pm.filteredSaved.value.length === 0"
                    empty-eyebrow="· empty plate ·"
                    empty-text="No saved palettes yet."
                    empty-hint="Add colors above, then save the set."
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
import { Card } from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";
import { Badge } from "../@/components/ui/badge";
import { Trash2 } from "@lucide/vue";
import { useSortable } from "@vueuse/integrations/useSortable";
import { PALETTE_MANAGER_KEY } from "../@/composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "../color-session/keys";
import {
    CurrentPaletteEditor,
    PaletteCard,
    PaletteCardGrid,
} from "../@/components/custom/palette-browser/card";
import { ConfirmDialog } from "@mkbabb/glass-ui/confirm-dialog";
import { SearchBar } from "@mkbabb/glass-ui/search";
import PaneHeader from "../shared/ui/PaneHeader.vue";
import type { Palette } from "./types";
import { usePaletteExport } from "./usePaletteExport";

const { savedColorStrings } = defineProps<{
    savedColorStrings: string[];
}>();

const emit = defineEmits<{
    commitEdit: [];
    cancelEdit: [];
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

// WR-8 (P4-R1): alias the per-site TITLE ramp tokens into the shared
// `.palettes-ramp-text` recipe's `--palettes-ramp-*` slots. The fallbacks
// mirror utils.css so there is no pre-first-resolve flash (utils.css stays
// LANE-5-owned + untouched; the token NAMES are kept).
const rampTitleVars = {
    "--palettes-ramp-0": "var(--palettes-ramp-title-0, oklch(0.632 0.214 333.5))",
    "--palettes-ramp-1": "var(--palettes-ramp-title-1, oklch(0.632 0.214 13.5))",
    "--palettes-ramp-2": "var(--palettes-ramp-title-2, oklch(0.632 0.214 53.5))",
} as const;

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
    // K-PALID: the feedback card is registered under the local store key; a
    // palette with no local `id` has no card to address.
    const id = palette.id;
    if (id == null) return;
    const card = cardRefs[id];
    if (card) {
        card.showFeedback(result.message, result.success ? "success" : "error");
    }
}

const { onExport } = usePaletteExport();
</script>
