<template>
    <Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader description="Discover palettes from the community.">Browse</PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <SearchBar
                v-model="pm.searchQuery.value"
                placeholder="Search palettes..."
            >
                <SearchFilterBar
                    :sort="pm.sortMode.value"
                    :tier="pm.tierFilter.value"
                    :selected-tags="pm.selectedTags.value"
                    :available-tags="availableTags"
                    @update:sort="pm.onSortChange"
                    @update:tier="onTierChange"
                    @update:selected-tags="onTagsChange"
                    @clear-filters="onClearFilters"
                    @color-search="onColorSearch"
                    @clear-color-search="onClearColorSearch"
                />
            </SearchBar>

            <div class="grid gap-3 pb-3">
                <div
                    v-if="pm.browsing.value"
                    class="flex items-center justify-center min-h-[120px]"
                >
                    <Loader2 class="w-5 h-5 animate-spin text-muted-foreground" />
                </div>

                <!-- Error with retry — the same specimen-plate register as the
                     empty state (R.W4 Lane A / A4): a designed state, not an
                     apology; the retry CTA rides the action slot. -->
                <EmptyState
                    v-else-if="pm.browseError.value && displayedBrowse.length === 0"
                    eyebrow="· signal lost ·"
                    :message="pm.browseError.value"
                    hint="The community wall lives on the palette API."
                >
                    <template #action>
                        <DockIconButton
                            compact
                            class="text-mono-small text-primary"
                            @click="pm.loadRemotePalettes()"
                        >
                            Tap to retry
                        </DockIconButton>
                    </template>
                </EmptyState>

                <PaletteCardGrid
                    v-else
                    :empty="displayedBrowse.length === 0"
                    empty-eyebrow="· the commons ·"
                    empty-text="No published palettes here yet."
                    empty-hint="Publish one from My Palettes and start the wall."
                    :grid-class="pm.sortLoading.value ? 'opacity-50' : ''"
                >
                    <PaletteCard
                        v-for="palette in displayedBrowse"
                        :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
                        :key="palette.slug"
                        :palette="palette"
                        :expanded="pm.expandedId.value === palette.slug"
                        :css-color="cssColorOpaque"
                        :is-owned="palette.userSlug === pm.userSlug.value"
                        :is-admin="pm.isAdminAuthenticated.value"
                        show-slug
                        @click="pm.toggleExpand(palette.slug)"
                        @save="(p) => onSave(p)"
                        @delete="(p) => onDeleteOwned(p)"
                        @vote="(p) => pm.onVote(p)"
                        @rename="(p, name) => pm.onRename(p, name)"
                        @edit-color="(p, idx, css) => pm.onEditColor(p, idx, css)"
                        @add-color="(css) => pm.onSwatchAddColor(css)"
                        @feature="(p) => pm.onFeaturePalette(p)"
                        @admin-delete="(p) => pm.onAdminDeletePalette(p)"
                        @fork="(p) => onFork(p)"
                        @versions="(p) => onVersions(p)"
                        @flag="(p) => onFlag(p)"
                        @export="(p, fmt) => onExport(p, fmt)"
                        @edit-tags="(p) => onEditTags(p)"
                    />
                </PaletteCardGrid>
            </div>
        </div>
        <!-- These components portal themselves via reka-ui (Sheet/Dialog) -->
        <TagEditPopover
            v-if="tagEditPalette"
            :open="tagEditOpen"
            :palette-slug="tagEditPalette.slug"
            :current-tags="tagEditPalette.tags ?? []"
            @update:open="tagEditOpen = $event"
            @update:tags="onTagsUpdated"
        />

        <VersionHistoryDrawer
            v-if="versionPalette"
            :open="versionDrawerOpen"
            :palette-slug="versionPalette.slug"
            :palette-name="versionPalette.name"
            :current-hash="versionPalette.currentHash ?? null"
            @update:open="versionDrawerOpen = $event"
            @revert="onRevert"
        />

        <FlagReportDialog
            v-if="flagPalette"
            :open="flagDialogOpen"
            :palette-name="flagPalette.name"
            :palette-slug="flagPalette.slug"
            @update:open="flagDialogOpen = $event"
            @submit="onFlagSubmit"
        />
    </Card>
</template>

<script setup lang="ts">
import { inject, reactive, ref, computed, onMounted } from "vue";
import { Card } from "@components/ui/card";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import { Loader2 } from "@lucide/vue";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import EmptyState from "@components/custom/palette-browser/EmptyState.vue";
import SearchFilterBar from "@components/custom/palette-browser/SearchFilterBar.vue";
import VersionHistoryDrawer from "@components/custom/palette-browser/VersionHistoryDrawer.vue";
import FlagReportDialog from "@components/custom/palette-browser/FlagReportDialog.vue";
import TagEditPopover from "@components/custom/palette-browser/TagEditPopover.vue";
import { SearchBar } from "@mkbabb/glass-ui/search";
import PaneHeader from "./PaneHeader.vue";
import type { Palette, Tag } from "@lib/palette/types";
import { deltaEOK } from "@src/units/color/gamut";
import { usePaletteExport } from "@composables/palette/usePaletteExport";
import { useDialogBrowseActions } from "@components/custom/palette-browser/PaletteDialog/composables/useDialogBrowseActions";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
// D.W3 Lane B: shared tag catalog via pm.tagEdit (was: local getTags fetch)
// X9: coerce to an Array. `allTags` is typed `Tag[]` but the `/colors/tags`
// read can resolve an object-shaped payload; a non-array reaching the
// `availableTags: Tag[]` prop fires Vue's "Expected Array, got Object" prop
// warning (the repeated tags-warn). This computed guarantees an array.
const availableTags = computed<Tag[]>(() => {
    // The declared type is `Tag[]`, but the `/colors/tags` read can resolve an
    // object-shaped payload at runtime; widen so the non-array branch is real.
    const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
    return Array.isArray(tags) ? tags : Object.values(tags);
});

onMounted(() => {
    pm.tagEdit.loadAllTags();
});

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

// --- Fork / Remix + browse filters ---
// S.W2 W2-5 (F1/F2): the ONE host-agnostic composable — no hand-rolled second
// copy. A failed remix routes through the same card feedback onSave/onDeleteOwned
// use; the fork-count increment lives in the shared fn.
const {
    onFork,
    onTierChange,
    onTagsChange,
    onClearFilters: clearBrowseFilters,
} = useDialogBrowseActions({
    pm,
    onForkError: (palette, message) =>
        cardRefs[palette.slug]?.showFeedback(message, "error"),
});

// --- Version history ---

const versionDrawerOpen = ref(false);
const versionPalette = ref<Palette | null>(null);

function onVersions(palette: Palette) {
    versionPalette.value = palette;
    versionDrawerOpen.value = true;
}

async function onRevert(hash: string) {
    if (!versionPalette.value) return;
    const updated = await pm.versions.revert(versionPalette.value.slug, hash);
    if (!updated) return;
    const idx = pm.remotePalettes.value.findIndex((p) => p.slug === updated.slug);
    if (idx >= 0) pm.remotePalettes.value[idx] = updated;
    versionPalette.value = updated;
}

// --- Flag / Report ---

const flagDialogOpen = ref(false);
const flagPalette = ref<Palette | null>(null);

function onFlag(palette: Palette) {
    flagPalette.value = palette;
    flagDialogOpen.value = true;
}

async function onFlagSubmit(reason: string, detail: string | undefined) {
    if (!flagPalette.value) return;
    await pm.flagged.report(flagPalette.value.slug, reason, detail);
    flagDialogOpen.value = false;
}

// --- Tag editing ---

const tagEditOpen = ref(false);
const tagEditPalette = ref<Palette | null>(null);

function onEditTags(palette: Palette) {
    tagEditPalette.value = palette;
    tagEditOpen.value = true;
}

function onTagsUpdated(tags: string[]) {
    if (!tagEditPalette.value) return;
    const idx = pm.remotePalettes.value.findIndex((p) => p.slug === tagEditPalette.value!.slug);
    const target = pm.remotePalettes.value[idx];
    if (idx >= 0 && target) {
        pm.remotePalettes.value[idx] = { ...target, tags };
    }
    tagEditPalette.value = { ...tagEditPalette.value, tags };
}

// --- Export ---

const { onExport } = usePaletteExport();

// --- Filters ---
// onTierChange / onTagsChange come straight from the shared composable;
// onClearFilters wraps it to ALSO drop the pane-local color-search params.
function onClearFilters() {
    clearBrowseFilters();
    colorSearchParams.value = null;
}

// --- Color search ---

const colorSearchParams = ref<{ L: number; a: number; b: number } | null>(null);

/** Browse palettes with optional client-side color distance filter applied */
const displayedBrowse = computed(() => {
    const palettes = pm.filteredBrowse.value;
    if (!colorSearchParams.value) return palettes;
    const { L, a, b } = colorSearchParams.value;
    const radius = 0.15;
    return palettes.filter((p: any) => {
        const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
        if (!oklabColors || oklabColors.length === 0) return false;
        return oklabColors.some((c) => deltaEOK(c.L, c.a, c.b, L, a, b) <= radius);
    });
});

function onColorSearch(L: number, a: number, b: number) {
    colorSearchParams.value = { L, a, b };
    // Filter loaded palettes client-side by OKLab distance
    // (API also supports server-side via colorL/colorA/colorB params, but client-side is instant)
}

function onClearColorSearch() {
    colorSearchParams.value = null;
}
</script>
