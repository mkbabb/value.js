<template>
    <Card tier="resting" class="pane-row-follow flex flex-col w-full mx-auto overflow-hidden min-w-0 h-full">
        <!-- X.W12U.h · A2-VA-L3-5: the companion follows the row (shell.css row
             contract) and is a column.
             X-DS pass 2 (V2C-01): the row can be shorter than the companion's
             content (360 px on Browse against 448 of content), so the body
             scrolls inside the card on glass's scroll primitive, exactly as
             About does: the end edge feathers instead of guillotining a line.
             X-DS pass 3 (V3C-01): the PaneHeader sits ABOVE the port, as its
             sibling (About's seat), so the list never runs under the title and
             both port edges feather (PaneHeader.vue, the seated-header rule). -->
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
            <!-- P4-R3 (a11y): the count leaves the heading's accessible
                 name (`aria-hidden`) so AT never announces "My Palettes2"; an
                 sr-only companion carries the count with a separator.
                 X-DS pass 6 (V6C-04): the app's ONE count idiom — a muted mono
                 tabular numeral on the heading's baseline, no chip. -->
            <span
                v-if="pm.savedPalettes.value.length > 0"
                class="text-mono-small tabular-nums text-muted-foreground ml-2"
                aria-hidden="true"
            >{{ searchNarrows ? `${pm.filteredSaved.value.length}/${pm.savedPalettes.value.length}` : pm.savedPalettes.value.length }}</span>
            <span v-if="pm.savedPalettes.value.length > 0" class="sr-only"> ({{ searchNarrows ? `${pm.filteredSaved.value.length} of ${pm.savedPalettes.value.length} shown` : `${pm.savedPalettes.value.length} saved` }})</span>
        </PaneHeader>
        <FadingScroll
            axis="y"
            class="pane-scroll-fade flex flex-col flex-1 min-h-0 overflow-x-hidden"
        >
            <div class="px-4 sm:px-6 pb-4 flex flex-col gap-3 grow shrink-0">
                <!-- S.W5-7: the twin placeholder ("Search palettes..." in BOTH
                     side-by-side panes) is scoped — this one owns YOUR list.
                     T.W3-3 (T-12): a field on paper wears paper — the seated
                     register (utils.css `.search-seated`; interim, booked onto
                     the P3 seated rung / ASK-D). -->
                <!-- X-W4 · A4 (CC-041): the field's NAME, measured desktop-only
                     (`/#/gradient`, smoke 1280×720: `input.input-bar-field` 414.1×26.2,
                     computed name ""). `placeholder` is not a name, so the
                     input carries `aria-label` itself. X-W7L (glass 10.1.0): glass 9.0.0
                     deleted `SearchBar`; the field composes the producer's `.input-bar`
                     recipe with its own input (glass MIGRATION.md 9.0.0). -->
                <!-- X-DS pass 3 (V3C-02): the delete-all action is a LABELLED text
                     action at the end of the search row, the row that acts on the
                     whole saved list. It used to be a lone trash glyph on a row of
                     its own (S.W5-7 excised the "{n} palettes" line it balanced). -->
                <div class="flex items-center gap-2">
                    <div class="input-bar search-seated flex-1 min-w-0">
                        <Search class="size-(--search-icon-size) text-muted-foreground shrink-0" aria-hidden="true" />
                        <input
                            v-model="pm.searchQuery.value"
                            type="search"
                            aria-label="Search your palettes"
                            placeholder="Search your palettes..."
                            class="input-bar-field"
                        />
                    </div>
                    <Button
                        v-if="pm.savedPalettes.value.length > 0"
                        emphasis="text"
                        size="sm"
                        class="shrink-0 cursor-pointer text-(color:--ink-muted) hover:text-destructive focus-visible:text-destructive"
                        aria-label="Delete all saved palettes"
                        @click="pm.showDeleteAllConfirm.value = true"
                    >
                        Delete all
                    </Button>
                </div>

                <!-- W7-failure-dispositions row 45: an unreadable stored library is
                     announced, never silently replaced. -->
                <div aria-live="polite" data-library-recovery>
                    <ActionFeedback
                        v-if="pm.storeRecovery.value"
                        :message="pm.storeRecovery.value"
                        variant="error"
                        :visible="true"
                        :auto-dismiss-ms="0"
                        @update:visible="pm.storeRecovery.value = null"
                    />
                </div>

                <!-- Current palette + saved list -->
                <div class="flex flex-col gap-3 grow">
                    <CurrentPaletteEditor
                        :saved-color-strings="savedColorStrings"
                        :css-color-opaque="cssColorOpaque"
                        :saved-palette-count="pm.savedPalettes.value.length"
                        :saved-palettes="pm.savedPalettes.value"
                        @apply="(colors) => colorTarget.emitApply(colors)"
                        @add-color="(css) => colorTarget.emitAddColor(css)"
                        @start-edit="(target) => colorTarget.emitStartEdit(target)"
                        @saved="(name, colors) => pm.onCurrentPaletteSaved(name, colors)"
                        @updated="(id, colors) => pm.onCurrentPaletteUpdated(id, colors)"
                        @commit-edit="emit('commitEdit')"
                        @cancel-edit="emit('cancelEdit')"
                        @clear-current="colorTarget.emitApply([])"
                    />

                    <!-- X-DS pass 2 (V2C-01): the empty state sits at the top of the
                         list. It no longer takes `grow` to centre itself in space the
                         row follower does not have (style block below). -->
                    <PaletteCardGrid
                        ref="sortableGridRef"
                        class="palettes-companion-grid"
                        :empty="pm.filteredSaved.value.length === 0"
                        :empty-text="searchNarrows ? `No saved palette matches “${pm.searchQuery.value.trim()}”.` : 'No saved palettes yet.'"
                        :empty-hint="searchNarrows ? `${pm.savedPalettes.value.length} saved palette${pm.savedPalettes.value.length === 1 ? '' : 's'} hidden by the search.` : 'Add colors, then save.'"
                    >
                        <!-- X.W12.u1 (UIA-V-26): a search that matches nothing says so and
                             offers the way back; it never claims the library is empty. -->
                        <template v-if="searchNarrows" #emptyAction>
                            <Button emphasis="text" @click="pm.searchQuery.value = ''">Clear search</Button>
                        </template>
                        <PaletteInspector
                            v-for="palette in pm.filteredSaved.value"
                            :ref="(el: any) => el && (cardRefs[palette.id] = el)"
                            :key="palette.id"
                            :palette="palette"
                            :expanded="pm.expandedId.value === palette.id"
                            :css-color="cssColorOpaque"
                            draggable
                            @click="pm.toggleExpand(palette.id)"
                            @delete="(p) => onRequestDelete(p)"
                            @publish="(p) => onPublish(p)"
                            @rename="(p, name) => pm.onRenameSaved(p, name)"
                            @edit-color="(p, idx, css) => pm.onEditColor(p, idx, css)"
                        />
                    </PaletteCardGrid>
                </div>

                <!-- UIA-V-104: deleting ONE saved palette is confirmed like deleting all
                     of them (the card menu and the dock's Delete seat both land here);
                     it used to destroy the palette on the click, with no message. -->
                <Dialog v-model:open="deleteConfirmOpen">
                    <DialogContent surface="glass" dismiss="deliberate">
                        <DialogHeader>
                            <DialogTitle>Delete palette?</DialogTitle>
                            <DialogDescription>
                                This will permanently delete
                                <span class="font-display font-medium text-foreground">{{ deleteConfirmName }}</span>
                                from this browser. This cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button emphasis="text" @click="deleteConfirmOpen = false">Cancel</Button>
                            <Button tone="destructive" :disabled="!deleteConfirmTarget" @click="onDeleteConfirm">
                                <Trash2 aria-hidden="true" />
                                Delete palette
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <!-- Delete all confirmation (Glass 7: ConfirmDialog folded onto the Dialog family) -->
                <Dialog v-model:open="pm.showDeleteAllConfirm.value">
                    <DialogContent surface="glass" dismiss="deliberate">
                        <DialogHeader>
                            <DialogTitle>Delete all saved palettes?</DialogTitle>
                            <!-- X.W12U.s2 · UIA-V-547: the copy names the user's place, not
                                 the mechanism; UIA-V-278: while a search hides some of
                                 them, the dialog says the hidden ones go too. -->
                            <DialogDescription>
                                This will permanently delete {{ pm.savedPalettes.value.length }}
                                saved palette{{ pm.savedPalettes.value.length !== 1 ? "s" : "" }}
                                from this browser<template v-if="hiddenBySearch > 0">, including
                                {{ hiddenBySearch }} your search is hiding</template>. This cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button emphasis="text" @click="pm.showDeleteAllConfirm.value = false">
                                Cancel
                            </Button>
                            <Button tone="destructive" @click="pm.onDeleteAllSaved()">
                                <Trash2 aria-hidden="true" />
                                Delete all
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </FadingScroll>
    </Card>
</template>

<script setup lang="ts">
import { inject, reactive, ref, shallowRef, computed, watch, onMounted, nextTick } from "vue";
import { Card } from "@mkbabb/glass-ui/card";
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import { Button } from "@mkbabb/glass-ui/button";
import { Search, Trash2 } from "@lucide/vue";
import { useSortable, insertNodeAt, removeNode } from "@vueuse/integrations/useSortable";
import { LIBRARY_PORT_KEY, COLOR_TARGET_PORT_KEY } from "./usePalettePorts";
import { CSS_COLOR_KEY } from "../color-session/keys";
import {
    CurrentPaletteEditor,
    PaletteCardGrid,
} from "./browser/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@mkbabb/glass-ui/dialog";
import PaneHeader from "../shared/ui/PaneHeader.vue";
import type { Palette } from "./types";
import PaletteInspector from "./PaletteInspector.vue";
import ActionFeedback from "./browser/card/PaletteCard/ActionFeedback.vue";

const { savedColorStrings } = defineProps<{
    savedColorStrings: string[];
}>();

const emit = defineEmits<{
    commitEdit: [];
    cancelEdit: [];
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(LIBRARY_PORT_KEY)!;
/** A non-empty query over a non-empty library: the list is filtered, not empty. */
const searchNarrows = computed(
    () => pm.searchQuery.value.trim() !== "" && pm.savedPalettes.value.length > 0,
);
/** Saved palettes a search is hiding — Delete all takes them too (UIA-V-278). */
const hiddenBySearch = computed(() =>
    searchNarrows.value ? pm.savedPalettes.value.length - pm.filteredSaved.value.length : 0,
);
const colorTarget = inject(COLOR_TARGET_PORT_KEY)!;

// WR-8 (P4-R1): alias the per-site TITLE ramp tokens into the shared
// `.palettes-ramp-text` recipe's `--palettes-ramp-*` slots. The fallbacks
// mirror utils.css so there is no pre-first-resolve flash (utils.css stays
// LANE-5-owned + untouched; the token NAMES are kept).
const rampTitleVars = {
    "--palettes-ramp-0": "var(--palettes-ramp-title-0, oklch(0.632 0.214 333.5))",
    "--palettes-ramp-1": "var(--palettes-ramp-title-1, oklch(0.632 0.214 13.5))",
    "--palettes-ramp-2": "var(--palettes-ramp-title-2, oklch(0.632 0.214 53.5))",
} as const;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteInspector>>>({});

// UIA-V-104: one saved palette's delete is confirmed first. The name is kept for
// the leave transition; the target is TAKEN before the delete runs and dropped
// on any dismissal — one acceptance, exactly one delete (Browse's idiom).
const deleteConfirmOpen = ref(false);
const deleteConfirmName = ref("");
const deleteConfirmTarget = shallowRef<Palette | null>(null);
watch(
    deleteConfirmOpen,
    (open) => {
        if (!open) deleteConfirmTarget.value = null;
    },
    { flush: "sync" },
);
function onRequestDelete(palette: Palette) {
    deleteConfirmName.value = palette.name;
    deleteConfirmTarget.value = palette;
    deleteConfirmOpen.value = true;
}
function onDeleteConfirm() {
    const target = deleteConfirmTarget.value;
    if (!target) return;
    deleteConfirmTarget.value = null;
    deleteConfirmOpen.value = false;
    pm.onDelete(target);
}

// Drag-to-reorder
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);

// X.W7.d · N-7 (fold W7.25 · PG-1 + PG-2 — the named-addition rider; W7.371-372).
// ONE handler, `onUpdate`, which REPLACES the library's default — that default
// (`moveArrayElement`) spliced the unwrapped `filteredSaved` array handed in at
// setup and re-inserted it a tick later, so the first drag of every page load
// double-applied the move and persisted a scrambled order. Here the DOM node the
// drag moved is put back (Vue owns the list's DOM and re-renders it from the
// store), and the store permutes only the slots the VISIBLE palettes occupy — a
// palette hidden by the search keeps its place.
useSortable(sortableEl, [], {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
    onUpdate(evt) {
        const { oldIndex, newIndex } = evt;
        if (oldIndex == null || newIndex == null) return;
        removeNode(evt.item);
        insertNodeAt(evt.from, evt.item, oldIndex);
        pm.movePalette(
            pm.filteredSaved.value.map((p) => p.id),
            oldIndex,
            newIndex,
        );
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

// X.W7.d2 (G7 host): export is the inspector's own act — it performs it and
// renders `usePaletteExport`'s `failure` on its rail; the pane holds no copy.
</script>

<style scoped>
/* X-DS pass 2 (V2C-01): the companion follows the row (about 360px at 1440,
 * set by the Browse or Generate subject beside it), so its empty state is
 * seated at the top of the list: the list's gap above already separates it
 * from the "Start a new palette" well, and its plate padding starts at zero.
 * That lifts the message clear of the scroll feather; the hint below it
 * fades under the feather, which says "more below". */
.palettes-companion-grid > :deep([role="status"]) {
    padding-block-start: 0;
}
</style>
