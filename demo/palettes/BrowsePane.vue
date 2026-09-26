<template>
    <Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
        <PaneHeader description="Discover palettes from the community.">Browse</PaneHeader>
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0">
            <!-- S.W5-7: the twin placeholder is scoped — this one searches
                 the public wall.
                 T.W3-3 (T-12): a field on paper wears paper — the seated
                 register (utils.css `.search-seated`; interim, booked onto
                 the P3 seated rung / ASK-D). -->
            <div class="input-bar search-seated">
                <Search class="size-(--search-icon-size) text-muted-foreground shrink-0" aria-hidden="true" />
                <input
                    v-model="pm.searchQuery.value"
                    type="search"
                    placeholder="Search palettes..."
                    class="input-bar-field"
                />
                <SearchFilterBar
                    :sort="pm.sortMode.value"
                    :tier="pm.tierFilter.value"
                    :selected-tags="pm.selectedTags.value"
                    :available-tags="availableTags"
                    @update:sort="pm.onSortChange"
                    @update:tier="onTierChange"
                    @update:selected-tags="onTagsChange"
                    :color-active="colorSearchParams !== null"
                    @clear-filters="onClearFilters"
                    @color-search="onColorSearch"
                    @clear-color-search="onClearColorSearch"
                />
            </div>

            <div class="grid gap-3 pb-3">
                <!-- T.W5-R8 (T-14 / D7 · F5): skeleton→content is "ONE
                     surface, NEW content" — the wall's three states key the
                     vj-morph family (out-in on the state container), so the
                     developing plates SETTLE into the wall on the snappy
                     spring instead of a hard v-if POP; the skeleton's last
                     shimmer sweep hands off into the enter (one clock, no
                     double-flash). The per-card stagger stays DORMANT on the
                     PKT-4 seams (--skeleton-shimmer-delay writes in
                     PaletteCardSkeleton — live the day the producer shimmer
                     reads them; never re-defined here). -->
                <Transition name="vj-morph" mode="out-in">
                <!-- W5-1 (S-10): the wall loads as DEVELOPING PLATES — the
                     palette-card shadow grammar, never a generic spinner. -->
                <div
                    v-if="pm.browsing.value"
                    key="developing"
                    class="grid grid-cols-1 gap-3"
                    aria-label="Loading palettes"
                >
                    <PaletteCardSkeleton
                        v-for="i in SKELETON_COUNT"
                        :key="i"
                        variant="developing"
                    />
                </div>

                <!-- W5-5: error ≠ empty — the PLAIN register (Q6: the
                     "· signal lost ·" annotation is dead; error plates drop
                     the specimen conceit). The raw machine string moves to
                     the Fira detail line; Retry is a real Button, device-
                     neutral, no dock atom mis-planted in a pane body. -->
                <EmptyState
                    v-else-if="pm.browseError.value && displayedBrowse.length === 0"
                    key="error"
                    variant="error"
                    message="Couldn't load palettes."
                    :detail="pm.browseError.value"
                >
                    <template #action>
                        <Button
                            size="sm"
                            class="font-display"
                            @click="pm.retryRemotePalettes()"
                        >
                            Retry
                        </Button>
                    </template>
                </EmptyState>

                <PaletteCardGrid
                    v-else
                    key="wall"
                    :empty="displayedBrowse.length === 0"
                    :empty-text="narrowed ? 'No palettes match.' : 'No palettes published yet.'"
                    :empty-hint="narrowed ? 'Nothing on the wall matches your search and filters.' : 'Publish one of yours from My Palettes.'"
                    :grid-class="
                        'transition-opacity duration-fast ' +
                        (pm.sortLoading.value ? 'opacity-50' : '')
                    "
                >
                    <PaletteInspector
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
                        @delete="(p) => onRequestDeleteOwned(p)"
                        @vote="(p) => onVote(p)"
                        @rename="(p, name) => onRename(p, name)"
                        @edit-color="(p, idx, css) => pm.onEditColor(p, idx, css)"
                        @add-color="(css) => pm.onSwatchAddColor(css)"
                        @feature="(p) => onFeature(p)"
                        @admin-delete="(p) => onAdminDelete(p)"
                        @set-visibility="onSetVisibility"
                        @fork="(p) => onFork(p)"
                        @versions="(p) => onVersions(p)"
                        @flag="(p) => onFlag(p)"
                        @edit-tags="(p) => onEditTags(p)"
                    />
                    <!-- X.W12U.s2 · UIA-V-122: a search that matches nothing says
                         so, and offers the way out. -->
                    <template v-if="narrowed" #emptyAction>
                        <Button size="sm" class="font-display" @click="onClearNarrowing">
                            Clear search and filters
                        </Button>
                    </template>
                </PaletteCardGrid>
                </Transition>

                <!-- S.W5 · the LOAD-MORE trigger (W5-13's data seam, this
                     lane's affordance): the wall pages past the 50-cap. The
                     next page arrives as developing plates (the W5-1
                     grammar); the button retires when the cursor exhausts. -->
                <div
                    v-if="pm.loadingMore.value"
                    class="grid grid-cols-1 gap-3"
                    aria-label="Loading more palettes"
                >
                    <PaletteCardSkeleton v-for="i in 2" :key="i" variant="developing" />
                </div>
                <div
                    v-else-if="pm.hasMore.value && !pm.browsing.value && !pm.browseError.value"
                    class="flex flex-col items-center gap-1 pt-1 pb-2"
                >
                    <Button
                        size="sm"
                        class="font-display"
                        @click="onLoadMore()"
                    >
                        Load more
                    </Button>
                    <p
                        v-if="loadMoreFailure"
                        role="status"
                        class="text-caption text-destructive"
                    >
                        {{ loadMoreFailure }}
                    </p>
                </div>
            </div>
        </div>
        <!-- These components portal themselves via reka-ui (Sheet/Dialog) -->
        <TagEditPopover
            v-if="tagEditPalette"
            :open="tagEditOpen"
            :palette-slug="tagEditPalette.slug"
            :current-tags="tagEditPalette.tags ?? []"
            :anchor="tagEditAnchor"
            @update:open="tagEditOpen = $event"
            @update:tags="onTagsUpdated"
        />

        <VersionHistoryDrawer
            v-if="versionPalette"
            :open="versionDrawerOpen"
            :palette-slug="versionPalette.slug"
            :palette-name="versionPalette.name"
            :current-hash="versionPalette.currentHash ?? null"
            @update:open="onVersionsOpenChange"
            @revert="onRevert"
            @load-failed="onVersionsLoadFailed"
        />

        <FlagReportDialog
            v-if="flagPalette"
            :open="flagDialogOpen"
            :palette-name="flagPalette.name"
            :pending="flagPending"
            :error="flagError"
            @update:open="onFlagOpenChange"
            @submit="onFlagSubmit"
        />

        <!-- X-W7 Repair 1 (§2a · ESC-W7e-AP6): the browse-wall admin delete is the
             fifth destructive seat — confirmed first, composed exactly as the four
             Admin seats compose it (the `dismiss="deliberate"` rung, glass 10.1.0). -->
        <Dialog v-model:open="deleteConfirmOpen">
            <DialogContent surface="glass" dismiss="deliberate">
                <DialogHeader>
                    <DialogTitle>Delete palette?</DialogTitle>
                    <DialogDescription>
                        This will delete the palette
                        <span class="font-display font-medium text-foreground">{{ deleteConfirmName }}</span>
                        for its owner and every viewer.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button emphasis="text" @click="deleteConfirmOpen = false">Cancel</Button>
                    <Button tone="destructive" :disabled="!deleteConfirmAct" @click="onDeleteConfirm">
                        <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                        Delete palette
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Card>
</template>

<script setup lang="ts">
import { inject, nextTick, reactive, ref, shallowRef, computed, onMounted, watch } from "vue";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@mkbabb/glass-ui/dialog";
import { Search, Trash2 } from "@lucide/vue";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { BROWSE_PORT_KEY } from "./usePalettePorts";
import { CSS_COLOR_KEY } from "../color-session/keys";
import { PaletteCardGrid, PaletteCardSkeleton } from "./browser/card";
import PaletteInspector from "./PaletteInspector.vue";
import EmptyState from "../shared/ui/EmptyState.vue";
import { SearchFilterBar, TagEditPopover } from "./browser/search";
import {
    VersionHistoryDrawer,
    FlagReportDialog,
} from "./browser/dialog";
import PaneHeader from "../shared/ui/PaneHeader.vue";
import type { Palette, Tag } from "./types";
import { useDialogBrowseActions } from "./browser/dialog";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(BROWSE_PORT_KEY)!;

// W5-1: the developing-wall shadow count — a handful of plates reads as "the
// wall is developing" without paying 50 shimmer surfaces of compositor work
// (the K.WP P1-4 lesson).
const SKELETON_COUNT = 4;

const cardRefs = reactive<Record<string, InstanceType<typeof PaletteInspector>>>({});
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

// Q1 (S.W5): the card-menu visibility flip — pm.onSetVisibility updates the
// browse row in place; the verdict rides the same card feedback rail as
// save/delete.
async function onSetVisibility(palette: Palette, visibility: "public" | "private") {
    const result = await pm.onSetVisibility(palette, visibility);
    cardRefs[palette.slug]?.showFeedback(result.message, result.success ? "success" : "error");
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

// X-W7 Repair 1 (G13 row 4): the drawer loads on its `open` TRANSITION (it has no
// immediate load), and it is mounted by its subject (`v-if`, W7.78). Mount it
// first, then open it, so the transition it listens for is one it can see —
// opening in the mounting tick left every drawer at "0 versions".
async function onVersions(palette: Palette) {
    versionPalette.value = palette;
    await nextTick();
    versionDrawerOpen.value = true;
}

async function onRevert(hash: string) {
    if (!versionPalette.value) return;
    const slug = versionPalette.value.slug;
    const result = await pm.versions.revert(versionPalette.value, hash);
    if (!result.ok) {
        showVerdict(slug, `Revert failed: ${result.message}`, false);
        return;
    }
    const updated = result.palette;
    const idx = pm.remotePalettes.value.findIndex((p) => p.slug === updated.slug);
    if (idx >= 0) pm.remotePalettes.value[idx] = updated;
    versionPalette.value = updated;
    showVerdict(slug, "Reverted", true);
}

// X.W7.z1 (COHESION §0bt.1): a failed version-page load is said on the
// inspector of the palette whose history was asked for.
function onVersionsLoadFailed(message: string) {
    if (versionPalette.value) {
        showVerdict(versionPalette.value.slug, `Versions failed to load: ${message}`, false);
    }
}

// W7.78 (VHD-35): the drawer's subject is released on close.
function onVersionsOpenChange(open: boolean) {
    versionDrawerOpen.value = open;
    if (!open) versionPalette.value = null;
}

// --- Flag / Report ---

const flagDialogOpen = ref(false);
const flagPalette = ref<Palette | null>(null);
const flagPending = ref(false);
const flagError = ref<string | null>(null);

function onFlag(palette: Palette) {
    flagPalette.value = palette;
    flagDialogOpen.value = true;
}

/**
 * X.W7.d (fold W7.22 · FlagReportDialog A-3): the report's verdict is RENDERED —
 * an API failure used to close the dialog exactly as a success did. The dialog
 * closes on the verdict, and the verdict rides the card's feedback rail.
 */
async function onFlagSubmit(reason: string, detail: string | undefined) {
    const palette = flagPalette.value;
    if (!palette) return;
    flagPending.value = true;
    flagError.value = null;
    const result = await pm.flagged.report(palette.slug, reason, detail).finally(() => {
        flagPending.value = false;
    });
    // X.W12.u1 (UIA-V-39): success closes and thanks on the card; a failure keeps
    // the dialog and its form open with the reason beside the Report button.
    if (!result.ok) {
        flagError.value = `Report failed: ${result.message}`;
        return;
    }
    showVerdict(palette.slug, "Reported — thank you.", true);
    onFlagOpenChange(false);
}

// W7.78 (FlagReportDialog A-2 ≡ VHD-35): the subject is released on close, so a
// KeepAlive'd pane does not retain the dialog and its palette for the session.
function onFlagOpenChange(open: boolean) {
    flagDialogOpen.value = open;
    if (!open) {
        flagPalette.value = null;
        flagError.value = null;
    }
}

function showVerdict(slug: string, message: string, ok: boolean) {
    cardRefs[slug]?.showFeedback(message, ok ? "success" : "error");
}

// X.W7.d (DAG §2.3 row 1): the admin mutations' verdicts are visible on the card.
async function onFeature(palette: Palette) {
    const result = await pm.onFeaturePalette(palette);
    const featuring = palette.tier !== "featured";
    const done = featuring ? "Featured" : "Unfeatured";
    const act = featuring ? "Feature" : "Unfeature";
    showVerdict(palette.slug, result.ok ? done : `${act} failed: ${result.message}`, result.ok);
}

// X-W7 Repair 1 (§2a · G14 · N-6): the menu opens a confirm, never the delete
// itself. The name is kept for display through the leave transition; the act is
// held separately, TAKEN (cleared) before it runs, and released on any dismissal
// — one acceptance, exactly one request.
const deleteConfirmOpen = ref(false);
const deleteConfirmName = ref("");
const deleteConfirmAct = shallowRef<(() => void) | null>(null);
watch(
    deleteConfirmOpen,
    (open) => {
        if (!open) deleteConfirmAct.value = null;
    },
    { flush: "sync" },
);

// UIA-V-111: the owner's delete of a published palette goes through the same
// confirm — it removes the palette for every viewer too, and it used to run on
// the menu click.
function onRequestDeleteOwned(palette: Palette) {
    deleteConfirmName.value = palette.name;
    deleteConfirmAct.value = () => void onDeleteOwned(palette);
    deleteConfirmOpen.value = true;
}

function onAdminDelete(palette: Palette) {
    deleteConfirmName.value = palette.name;
    deleteConfirmAct.value = () => void adminDelete(palette);
    deleteConfirmOpen.value = true;
}

function onDeleteConfirm() {
    const act = deleteConfirmAct.value;
    if (!act) return;
    deleteConfirmAct.value = null;
    deleteConfirmOpen.value = false;
    act();
}

async function adminDelete(palette: Palette) {
    const result = await pm.onAdminDeletePalette(palette);
    if (!result.ok) showVerdict(palette.slug, `Delete failed: ${result.message}`, false);
}

// --- Tag editing ---

const tagEditOpen = ref(false);
const tagEditPalette = ref<Palette | null>(null);

// UIA-V-28 · A2-VA-X-4: the editor places against the card it edits, whichever
// control asked for it (card menu, inspector command, dock seat).
const tagEditAnchor = shallowRef<HTMLElement | null>(null);

function onEditTags(palette: Palette) {
    tagEditAnchor.value = cardRefs[palette.slug]?.rootEl ?? null;
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

// X.W7.d2 (G7 host): export is the inspector's own act — it performs it and
// renders `usePaletteExport`'s `failure` on its rail; the pane holds no copy.

// --- The mutation rows (X.W7.d2 · W7-mutation-ownership rows 2/3/6/7/8/11) ---
// Each remote mutation settles a `BrowseVerdict`; a failure is rendered on the
// inspector that asked for it, never dropped (W7-failure-dispositions 14-17).
async function onVote(palette: Palette) {
    const result = await pm.onVote(palette);
    if (!result.success) showVerdict(palette.slug, result.message, false);
}

async function onRename(palette: Palette, name: string) {
    const result = await pm.onRename(palette, name);
    if (!result.success) showVerdict(palette.slug, result.message, false);
}

// Row 3 · the tag save's verdict is produced by `useTagEdit.error` (the
// pre-flight refusal or the transport failure); it is rendered on the
// inspector of the palette being tagged.
watch(
    () => pm.tagEdit.error.value,
    (message) => {
        const palette = tagEditPalette.value;
        if (message !== null && palette !== null) showVerdict(palette.slug, message, false);
    },
);

// Row 13 · a failed page load is said beside the control that asked for it.
const loadMoreFailure = ref<string | null>(null);
async function onLoadMore() {
    const result = await pm.loadMoreRemotePalettes();
    loadMoreFailure.value = result !== null && !result.success ? result.message : null;
}

// --- Filters ---
// onTierChange / onTagsChange come straight from the shared composable;
// onClearFilters wraps it to ALSO drop the pane-local color-search params.
function onClearFilters() {
    clearBrowseFilters();
    colorSearchParams.value = null;
}

// --- Color search ---

const colorSearchParams = ref<{ L: number; a: number; b: number } | null>(null);

/** X.W12U.s2 · UIA-V-122: the wall is narrowed by a query, a tier, tags or a
 *  colour — an empty result then means "nothing matches", not "nothing exists". */
const narrowed = computed(
    () =>
        pm.searchQuery.value.trim() !== "" ||
        pm.tierFilter.value !== "" ||
        pm.selectedTags.value.length > 0 ||
        colorSearchParams.value !== null,
);

function onClearNarrowing() {
    pm.searchQuery.value = "";
    onClearFilters();
}

/** Browse palettes with optional client-side color distance filter applied */
const displayedBrowse = computed(() => {
    const palettes = pm.filteredBrowse.value;
    if (!colorSearchParams.value) return palettes;
    const { L, a, b } = colorSearchParams.value;
    const radius = 0.15;
    return palettes.filter((p: any) => {
        const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
        if (!oklabColors || oklabColors.length === 0) return false;
        return oklabColors.some((c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius);
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
