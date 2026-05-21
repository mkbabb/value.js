<template>
    <Card tier="wash" :shadow="false" :grain="false" class="pane-scroll-fade w-full max-w-3xl lg:max-w-desktop-pane mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader description="Discover palettes from the community.">Browse</PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <SearchBar
                v-model="pm.searchQuery.value"
                placeholder="Search palettes..."
            >
                <SearchFilterBar
                    :sort="pm.sortMode.value"
                    :status="pm.statusFilter.value"
                    :selected-tags="pm.selectedTags.value"
                    :available-tags="availableTags"
                    @update:sort="pm.onSortChange"
                    @update:status="onStatusChange"
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

                <!-- Error with retry -->
                <div
                    v-else-if="pm.browseError.value && displayedBrowse.length === 0"
                    class="flex flex-col items-center justify-center gap-2 min-h-[120px]"
                >
                    <span class="text-mono-small text-muted-foreground">{{ pm.browseError.value }}</span>
                    <DockIconButton
                        compact
                        class="text-mono-small text-primary"
                        @click="pm.loadRemotePalettes()"
                    >
                        Tap to retry
                    </DockIconButton>
                </div>

                <PaletteCardGrid
                    v-else
                    :empty="displayedBrowse.length === 0"
                    empty-text="No published palettes found."
                    :grid-class="pm.sortLoading.value ? 'opacity-50' : ''"
                >
                    <PaletteCard
                        v-for="palette in displayedBrowse"
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
import SearchFilterBar from "@components/custom/palette-browser/SearchFilterBar.vue";
import VersionHistoryDrawer from "@components/custom/palette-browser/VersionHistoryDrawer.vue";
import FlagReportDialog from "@components/custom/palette-browser/FlagReportDialog.vue";
import TagEditPopover from "@components/custom/palette-browser/TagEditPopover.vue";
import { SearchBar } from "@mkbabb/glass-ui/search";
import PaneHeader from "./PaneHeader.vue";
import type { Palette } from "@lib/palette/types";
import { deltaEOK } from "@src/units/color/gamut";
import { usePaletteExport } from "@composables/palette/usePaletteExport";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
// D.W3 Lane B: shared tag catalog via pm.tagEdit (was: local getTags fetch)
const availableTags = computed(() => pm.tagEdit.allTags.value);

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

// --- Fork / Remix ---

async function onFork(palette: Palette) {
    try {
        await pm.ensureUser();
        await pm.ensureSession();
        const forked = await pm.versions.fork(palette.slug);
        if (!forked) return;
        pm.remotePalettes.value = [forked, ...pm.remotePalettes.value];
        // Update fork count on source
        const idx = pm.remotePalettes.value.findIndex((p) => p.slug === palette.slug);
        const source = pm.remotePalettes.value[idx];
        if (idx >= 0 && source) {
            pm.remotePalettes.value[idx] = {
                ...source,
                forkCount: (source.forkCount ?? 0) + 1,
            };
        }
    } catch (e) {
        console.warn("Failed to remix palette:", e);
    }
}

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

function onStatusChange(status: string) {
    pm.statusFilter.value = status;
    pm.loadRemotePalettes(true);
}

function onTagsChange(tags: string[]) {
    pm.selectedTags.value = tags;
    pm.loadRemotePalettes(true);
}

function onClearFilters() {
    pm.statusFilter.value = "";
    pm.selectedTags.value = [];
    colorSearchParams.value = null;
    pm.loadRemotePalettes(true);
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
