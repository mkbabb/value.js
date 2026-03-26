<template>
    <Card variant="pane" class="pane-scroll-fade w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader description="Discover palettes from the community.">Browse</PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <PaneSearchBar
                v-model:search="pm.searchQuery.value"
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
                    v-else-if="pm.browseError.value && displayedBrowse.length === 0"
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
                    />
                </PaletteCardGrid>
            </div>
        </div>
    </Card>

    <!-- Version history drawer -->
    <VersionHistoryDrawer
        v-if="versionPalette"
        :open="versionDrawerOpen"
        :palette-slug="versionPalette.slug"
        :palette-name="versionPalette.name"
        :current-hash="versionPalette.currentHash ?? null"
        @update:open="versionDrawerOpen = $event"
        @revert="onRevert"
    />

    <!-- Flag report dialog -->
    <FlagReportDialog
        v-if="flagPalette"
        :open="flagDialogOpen"
        :palette-name="flagPalette.name"
        :palette-slug="flagPalette.slug"
        @update:open="flagDialogOpen = $event"
        @submit="onFlagSubmit"
    />
</template>

<script setup lang="ts">
import { inject, reactive, ref, computed, onMounted } from "vue";
import { Card } from "@components/ui/card";
import { Loader2 } from "lucide-vue-next";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardGrid from "@components/custom/palette-browser/PaletteCardGrid.vue";
import SearchFilterBar from "@components/custom/palette-browser/SearchFilterBar.vue";
import VersionHistoryDrawer from "@components/custom/palette-browser/VersionHistoryDrawer.vue";
import FlagReportDialog from "@components/custom/palette-browser/FlagReportDialog.vue";
import PaneSearchBar from "./PaneSearchBar.vue";
import PaneHeader from "./PaneHeader.vue";
import type { Palette, Tag } from "@lib/palette/types";
import {
    forkPalette,
    flagPalette as flagPaletteAPI,
    revertPalette,
    getTags,
} from "@lib/palette/api";
import {
    exportAsJSON,
    exportAsCSSCustomProperties,
    exportAsTailwindConfig,
    exportAsSVG,
    exportAsPNG,
    downloadExport,
} from "@lib/palette/export";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
const availableTags = ref<Tag[]>([]);

onMounted(() => {
    getTags().then((tags) => { availableTags.value = tags; }).catch(() => {});
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
        const forked = await forkPalette(palette.slug);
        pm.remotePalettes.value = [forked, ...pm.remotePalettes.value];
        // Update fork count on source
        const idx = pm.remotePalettes.value.findIndex((p) => p.slug === palette.slug);
        if (idx >= 0) {
            pm.remotePalettes.value[idx] = {
                ...pm.remotePalettes.value[idx],
                forkCount: (pm.remotePalettes.value[idx].forkCount ?? 0) + 1,
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
    try {
        const updated = await revertPalette(versionPalette.value.slug, hash);
        const idx = pm.remotePalettes.value.findIndex((p) => p.slug === updated.slug);
        if (idx >= 0) pm.remotePalettes.value[idx] = updated;
        versionPalette.value = updated;
    } catch (e) {
        console.warn("Failed to revert:", e);
    }
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
    try {
        await flagPaletteAPI(flagPalette.value.slug, reason, detail);
    } catch (e) {
        console.warn("Failed to flag palette:", e);
    }
    flagDialogOpen.value = false;
}

// --- Export ---

async function onExport(palette: Palette, format: string) {
    try {
        switch (format) {
            case "json": downloadExport(exportAsJSON(palette)); break;
            case "css": downloadExport(exportAsCSSCustomProperties(palette)); break;
            case "tailwind": downloadExport(exportAsTailwindConfig(palette)); break;
            case "svg": downloadExport(exportAsSVG(palette)); break;
            case "png": downloadExport(await exportAsPNG(palette)); break;
        }
    } catch (e) {
        console.warn("Export failed:", e);
    }
}

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
        return oklabColors.some((c: { L: number; a: number; b: number }) => {
            const dL = c.L - L, da = c.a - a, db = c.b - b;
            return Math.sqrt(dL * dL + da * da + db * db) <= radius;
        });
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
