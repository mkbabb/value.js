<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            :class="[
                'palette-dialog max-w-[800px] p-0 gap-0 overflow-hidden sm:h-[min(90dvh,820px)] sm:max-h-[90dvh] min-w-0 flex flex-col',
                editingExit && 'palette-dialog--editing-exit',
                editingEnter && 'palette-dialog--editing-enter',
            ]"
            @pointer-down-outside="overlayGuards.onPointerDownOutside"
            @interact-outside="overlayGuards.onInteractOutside"
        >
            <!-- Header -->
            <PaletteDialogHeader
                :css-color="cssColor"
                :css-color-opaque="cssColorOpaque"
                :is-admin-authenticated="pm.isAdminAuthenticated.value"
                @dot-click="onDotClick"
            />

            <!-- Tabs + Search -->
            <div
                data-testid="palette-browser-scroll-pane"
                class="px-4 sm:px-6 w-full flex flex-col flex-1 min-h-0 min-w-0 sm:overflow-y-auto overflow-x-hidden"
            >
                <Tabs
                    v-model="activeTab"
                    class="underline-tabs w-full min-h-full flex flex-col min-w-0"
                    :style="{ '--active-tab-color': safeAccent }"
                >
                    <!-- Controls: sticky tabs row, then search+sort row -->
                    <PaletteControlsBar
                        ref="controlsBarRef"
                        v-model:search="pm.searchQuery.value"
                        :active-tab="activeTab"
                        :search-placeholder="pm.searchPlaceholder.value"
                        :user-slug="pm.userSlug.value"
                        :css-color-opaque="safeAccent"
                        :has-saved-palettes="pm.savedPalettes.value.length > 0"
                        :is-admin="pm.isAdminAuthenticated.value"
                        :sort-mode="pm.sortMode.value"
                        :status-filter="pm.statusFilter.value"
                        :selected-tags="pm.selectedTags.value"
                        :available-tags="pm.tagEdit.allTags.value"
                        :user-sort-mode="pm.userSortMode.value"
                        :dialog-open="openModel"
                        @switch-slug="pm.onSlugSwitch"
                        @regenerate="pm.onRegenerateSlug"
                        @logout="pm.userLogout"
                        @sort-change="pm.onSortChange"
                        @status-change="onStatusChange"
                        @tags-change="onTagsChange"
                        @clear-filters="onClearFilters"
                        @user-sort-change="pm.onUserSortChange"
                    />

                    <!-- My Palettes tab -->
                    <PaletteSavedTab
                        :saved-color-strings="savedColorStrings"
                        :css-color-opaque="cssColorOpaque"
                        :saved-palettes="pm.savedPalettes.value"
                        :filtered-saved="pm.filteredSaved.value"
                        :expanded-id="pm.expandedId.value"
                        @apply="(colors) => emit('apply', colors)"
                        @add-color="(css) => emit('addColor', css)"
                        @start-edit="(target) => emit('startEdit', target)"
                        @saved="pm.onCurrentPaletteSaved"
                        @updated="pm.onCurrentPaletteUpdated"
                        @commit-edit="emit('commitEdit')"
                        @cancel-edit="emit('cancelEdit')"
                        @clear-current="emit('apply', [])"
                        @delete-all="modalStack.showDeleteAllConfirm.value = true"
                        @toggle-expand="pm.toggleExpand"
                        @delete="pm.onDelete"
                        @publish="pm.onPublish"
                        @rename="pm.onRenameSaved"
                        @edit-color="pm.onEditColor"
                    />

                    <!-- Extract from image tab -->
                    <ImagePaletteExtractor
                        :css-color-opaque="cssColorOpaque"
                        @apply="(colors) => emit('apply', colors)"
                        @add-color="(css) => emit('addColor', css)"
                    />

                    <!-- Browse (remote) palettes tab -->
                    <PaletteBrowseTab
                        :browsing="pm.browsing.value"
                        :sort-loading="pm.sortLoading.value"
                        :filtered-browse="pm.filteredBrowse.value"
                        :expanded-id="pm.expandedId.value"
                        :css-color-opaque="cssColorOpaque"
                        :user-slug="pm.userSlug.value"
                        :is-admin="pm.isAdminAuthenticated.value"
                        @toggle-expand="pm.toggleExpand"
                        @save="pm.onSaveRemote"
                        @delete="pm.onDeleteOwned"
                        @vote="pm.onVote"
                        @rename="pm.onRename"
                        @edit-color="pm.onEditColor"
                        @add-color="pm.onSwatchAddColor"
                        @feature="pm.onFeaturePalette"
                        @admin-delete="pm.onAdminDeletePalette"
                        @fork="onFork"
                        @versions="modalStack.openVersions"
                        @flag="modalStack.openFlag"
                        @export="onExport"
                    />

                    <!-- Admin Users + Admin Names tabs -->
                    <PaletteAdminTabs
                        :is-admin-authenticated="pm.isAdminAuthenticated.value"
                        :filtered-admin-users="pm.filteredAdminUsers.value"
                        :loading-users="pm.loadingUsers.value"
                        :total-users="pm.adminUsers.value.length"
                        :filtered-color-queue="pm.filteredColorQueue.value"
                        :filtered-approved="pm.filteredApproved.value"
                        :loading-color-queue="pm.loadingColorQueue.value"
                        :loading-approved="pm.loadingApproved.value"
                        :expanded-id="pm.expandedId.value"
                        :css-color-opaque="cssColorOpaque"
                        :safe-accent="safeAccent"
                        @delete-user-palettes="pm.onDeleteUserPalettes"
                        @delete-user="pm.onDeleteUser"
                        @toggle-expand="pm.toggleExpand"
                        @feature="pm.onFeaturePalette"
                        @admin-delete-user-palette="pm.onAdminDeleteUserPalette"
                        @prune="pm.onPrune"
                        @refresh="pm.loadAdminUsers"
                        @approve-color="pm.onApproveColor"
                        @reject-color="pm.onRejectColor"
                        @delete-color="pm.onDeleteColor"
                    />
                </Tabs>
            </div>

            <!-- Delete all saved palettes confirmation -->
            <DeleteAllConfirm
                v-model:open="modalStack.showDeleteAllConfirm.value"
                :count="pm.savedPalettes.value.length"
                @confirm="pm.onDeleteAllSaved"
            />

            <MigratePalettesDialog
                v-model:open="pm.showMigrateDialog.value"
                :count="pm.savedPalettes.value.length"
                :mode="pm.migrateMode.value"
                @respond="pm.onMigrateRespond"
            />
        </DialogScrollContent>
    </Dialog>

    <!-- Version history drawer -->
    <VersionHistoryDrawer
        v-if="modalStack.versionDrawerPalette.value"
        :open="modalStack.versionDrawerOpen.value"
        :palette-slug="modalStack.versionDrawerPalette.value.slug"
        :palette-name="modalStack.versionDrawerPalette.value.name"
        :current-hash="modalStack.versionDrawerPalette.value.currentHash ?? null"
        @update:open="modalStack.versionDrawerOpen.value = $event"
        @revert="onRevert"
    />

    <!-- Flag report dialog -->
    <FlagReportDialog
        v-if="modalStack.flagDialogPalette.value"
        :open="modalStack.flagDialogOpen.value"
        :palette-name="modalStack.flagDialogPalette.value.name"
        :palette-slug="modalStack.flagDialogPalette.value.slug"
        @update:open="modalStack.flagDialogOpen.value = $event"
        @submit="modalStack.onFlagSubmit"
    />
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import { Dialog, DialogScrollContent } from "@components/ui/dialog";
import { Tabs } from "@components/ui/tabs";
import { copyToClipboard } from "@mkbabb/glass-ui";

import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

import PaletteDialogHeader from "./components/PaletteDialogHeader.vue";
import PaletteControlsBar from "./components/PaletteControlsBar.vue";
import PaletteSavedTab from "./components/PaletteSavedTab.vue";
import PaletteBrowseTab from "./components/PaletteBrowseTab.vue";
import PaletteAdminTabs from "./components/PaletteAdminTabs.vue";
import DeleteAllConfirm from "./components/DeleteAllConfirm.vue";
import MigratePalettesDialog from "@components/custom/palette-browser/MigratePalettesDialog.vue";
import VersionHistoryDrawer from "@components/custom/palette-browser/VersionHistoryDrawer.vue";
import FlagReportDialog from "@components/custom/palette-browser/FlagReportDialog.vue";
import { ImagePaletteExtractor } from "@components/custom/image-palette-extractor";

import { usePaletteDialogState } from "./composables/usePaletteDialogState";
import { useDialogModalStack } from "./composables/useDialogModalStack";
import { useDialogOverlayGuards } from "./composables/useDialogOverlayGuards";
import { usePaletteExport } from "./composables/usePaletteExport";
import { useDialogBrowseActions } from "./composables/useDialogBrowseActions";

const {
    savedColorStrings,
    cssColor,
    cssColorOpaque,
    editingExit,
    editingEnter,
} = defineProps<{
    savedColorStrings: string[];
    cssColor: string;
    cssColorOpaque: string;
    editingExit?: boolean;
    editingEnter?: boolean;
}>();

const emit = defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
    startEdit: [target: { paletteId: string; colorIndex: number; originalCss: string }];
    commitEdit: [];
    cancelEdit: [];
}>();

// --- Cross-cutting facade (single consumption — D.W3 Lane A) ---
const pm = inject(PALETTE_MANAGER_KEY)!;
const safeAccent = inject(SAFE_ACCENT_KEY)!;

const openModel = defineModel<boolean>("open", { default: false });
const controlsBarRef = ref<InstanceType<typeof PaletteControlsBar> | null>(null);

// --- Dialog-local tab + filter state (the activeTab here is dialog-internal) ---
const { activeTab, setActiveTab } = usePaletteDialogState({
    savedPalettes: pm.savedPalettes,
    isAdminAuthenticated: pm.isAdminAuthenticated,
});

// --- Modal stack (delete-all / versions / flag) ---
const modalStack = useDialogModalStack(pm);

// --- Overlay dismissal guards ---
const overlayGuards = useDialogOverlayGuards();

// Keep migration's slugBarRef synced with the nested ref in PaletteControlsBar
watch(controlsBarRef, (bar) => {
    pm.slugBarRef.value = bar?.slugBarRef ?? null;
}, { immediate: true, flush: "post" });

// Lazy-load remote palettes when navigating to browse from inside the dialog.
// Distinct from usePaletteManager's `watch(currentView, …)` (which is dock-driven).
watch(activeTab, (tab) => {
    if (tab === "browse" && pm.remotePalettes.value.length === 0) {
        pm.loadRemotePalettes();
    }
    if (tab === "admin-users" && pm.adminUsers.value.length === 0) {
        pm.loadAdminUsers();
    }
    if (tab === "admin-names") {
        if (pm.adminColorQueue.value.length === 0) pm.loadColorQueue();
        if (!pm.approvedLoaded.value) pm.loadApprovedColors();
    }
});

// --- Browse filter state — shared catalog via pm.tagEdit (D.W3 Lane B) ---
pm.tagEdit.loadAllTags();

// --- Browse-side actions (fork / revert / filter handlers) ---
const { onFork, onRevert, onStatusChange, onTagsChange, onClearFilters } =
    useDialogBrowseActions({ pm, modalStack });

// --- Export dispatch (format → downloadExport) ---
const { onExport } = usePaletteExport();

// --- Dot-click copies the current color ---
function onDotClick() {
    copyToClipboard(cssColorOpaque);
}

defineExpose({
    commitColorEdit: pm.commitColorEdit,
    setActiveTab,
});
</script>

<style>
/* Palette tab content — animated via reka-ui data-state (forceMount)
 * (D.W4 Lane A §4: colocated from styles/style.css). The block must remain
 * unscoped because reka-ui's Tabs primitive renders the data-state attribute
 * on a generated descendant that scoped-attr selectors would not match. */
.palette-tab-content {
    transition: opacity var(--duration-normal) var(--ease-standard);
}
.palette-tab-content[data-state="inactive"] {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    height: 0;
    content-visibility: hidden;
}
.palette-tab-content[data-state="active"] {
    opacity: 1;
    position: relative;
    height: auto;
}

/* INTENTIONAL: de-saturate(0.7) dims backdrop more aggressively than glass-ui's
   default saturate(1.05). Deliberate design choice for modal focus. */
[data-state]:has(> .palette-dialog) {
    backdrop-filter: blur(4px) saturate(0.7);
    transition: backdrop-filter var(--duration-slow) var(--ease-standard),
                background var(--duration-slow) var(--ease-standard),
                opacity var(--duration-slow) var(--ease-standard);
    --tw-duration: var(--duration-slow);
}
[data-state="closed"]:has(> .palette-dialog) {
    backdrop-filter: blur(0px) saturate(1);
}

/* Palette dialog enter/exit animation */
.palette-dialog {
    animation: dialog-in var(--duration-slow) var(--ease-decelerate);
}
.palette-dialog[data-state="closed"] {
    animation: dialog-out var(--duration-normal) var(--ease-standard);
}

/* Dialog exits by sliding left + shrinking toward drawer position */
.palette-dialog--editing-exit[data-state="closed"] {
    animation: dialog-out-to-drawer var(--duration-slow) var(--ease-standard);
}

/* Dialog enters by sliding in from left (returning from edit mode) */
.palette-dialog--editing-enter[data-state="open"] {
    animation: dialog-in-from-drawer var(--duration-slow) var(--ease-standard);
}

/* Slow overlay fade to match longer dialog animation */
[data-state="closed"]:has(> .palette-dialog--editing-exit) {
    animation-duration: var(--duration-slow);
}

/* Palette dialog close button — positioned below gradient bar.
 *
 * D.W4 Lane A §3: previously reached the close button via `:has(> .lucide-x)`
 * which couples to lucide-vue's class scheme. Replaced with `:has(> .sr-only)`
 * which targets via the universal Tailwind a11y-text class the glass-ui
 * DialogClose template emits as the accessible-name span. The new selector
 * still scopes to the close button (the only `.palette-dialog` button with
 * an `.sr-only` child) and survives icon-library swaps. */
.palette-dialog > button:has(> .sr-only) {
    color: var(--color-muted-foreground);
    top: 2rem;
    right: 0.75rem;
    z-index: var(--z-content);
    padding: 0.25rem;
    opacity: 0.6;
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.palette-dialog > button:has(> .sr-only):hover {
    background-color: var(--color-secondary);
    opacity: 1;
}
.palette-dialog > button:has(> .sr-only) > svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2;
}
</style>
