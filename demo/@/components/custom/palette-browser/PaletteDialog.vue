<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            :class="[
                'palette-dialog max-w-[800px] p-0 gap-0 bg-card text-card-foreground overflow-hidden rounded-2xl sm:h-[min(90dvh,820px)] sm:max-h-[90dvh] min-w-0 flex flex-col',
                editingExit && 'palette-dialog--editing-exit',
                editingEnter && 'palette-dialog--editing-enter',
            ]"
            @pointer-down-outside="onPointerDownOutside"
            @interact-outside="onInteractOutside"
        >
            <!-- Header -->
            <PaletteDialogHeader
                :css-color="cssColor"
                :css-color-opaque="cssColorOpaque"
                :is-admin-authenticated="isAdminAuthenticated"
                @dot-click="onDotClick"
            />

            <!-- Tabs + Search -->
            <div
                data-testid="palette-browser-scroll-pane"
                class="px-4 sm:px-6 w-full flex flex-col flex-1 min-h-0 min-w-0 sm:overflow-y-auto overflow-x-hidden"
            >
                <Tabs
                    v-model="activeTab"
                    class="w-full min-h-full flex flex-col min-w-0"
                    :style="{ '--active-tab-color': cssColorOpaque }"
                >
                    <!-- Controls: sticky tabs row, then search+sort row -->
                    <PaletteControlsBar
                        ref="controlsBarRef"
                        v-model:search="searchQuery"
                        :active-tab="activeTab"
                        :search-placeholder="searchPlaceholder"
                        :user-slug="userSlug"
                        :css-color-opaque="cssColorOpaque"
                        :has-saved-palettes="savedPalettes.length > 0"
                        :is-admin="isAdminAuthenticated"
                        :sort-mode="sortMode"
                        :user-sort-mode="userSortMode"
                        :dialog-open="openModel"
                        @switch-slug="onSlugSwitch"
                        @regenerate="onRegenerateSlug"
                        @logout="userLogout"
                        @sort-change="onSortChange"
                        @user-sort-change="onUserSortChange"
                    />

                    <!-- My Palettes tab -->
                    <PaletteSavedTab
                        :saved-color-strings="savedColorStrings"
                        :css-color-opaque="cssColorOpaque"
                        :saved-palettes="savedPalettes"
                        :filtered-saved="filteredSaved"
                        :expanded-id="expandedId"
                        @apply="(colors) => emit('apply', colors)"
                        @add-color="(css) => emit('addColor', css)"
                        @start-edit="(target) => emit('startEdit', target)"
                        @saved="onCurrentPaletteSaved"
                        @updated="onCurrentPaletteUpdated"
                        @commit-edit="emit('commitEdit')"
                        @cancel-edit="emit('cancelEdit')"
                        @clear-current="emit('apply', [])"
                        @delete-all="showDeleteAllConfirm = true"
                        @toggle-expand="toggleExpand"
                        @delete="onDelete"
                        @publish="onPublish"
                        @rename="onRenameSaved"
                        @edit-color="onEditColor"
                    />

                    <!-- Extract from image tab -->
                    <ImagePaletteExtractor
                        :css-color-opaque="cssColorOpaque"
                        @apply="(colors) => emit('apply', colors)"
                        @add-color="(css) => emit('addColor', css)"
                    />

                    <!-- Browse (remote) palettes tab -->
                    <PaletteBrowseTab
                        :browsing="browsing"
                        :sort-loading="sortLoading"
                        :filtered-browse="filteredBrowse"
                        :expanded-id="expandedId"
                        :css-color-opaque="cssColorOpaque"
                        :user-slug="userSlug"
                        :is-admin="isAdminAuthenticated"
                        @toggle-expand="toggleExpand"
                        @save="onSaveRemote"
                        @vote="onVote"
                        @rename="onRename"
                        @edit-color="onEditColor"
                        @add-color="onSwatchAddColor"
                        @feature="onFeaturePalette"
                        @admin-delete="onAdminDeletePalette"
                    />

                    <!-- Admin Users tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-users" class="mt-0 w-full palette-tab-content" force-mount>
                            <AdminUsersPanel
                                ref="adminUsersPanelRef"
                                :users="filteredAdminUsers"
                                :loading="loadingUsers"
                                :expanded-id="expandedId"
                                :css-color="cssColorOpaque"
                                :total-users="adminUsers.length"
                                @delete-user-palettes="onDeleteUserPalettes"
                                @delete-user="onDeleteUser"
                                @toggle-expand="toggleExpand"
                                @feature="onFeaturePalette"
                                @admin-delete-user-palette="onAdminDeleteUserPalette"
                                @prune="onPrune"
                                @refresh="loadAdminUsers"
                            />
                    </TabsContent>

                    <!-- Admin Names tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-names" class="mt-0 w-full palette-tab-content" force-mount>
                            <AdminNamesPanel
                                :pending-items="filteredColorQueue"
                                :approved-items="filteredApproved"
                                :loading-pending="loadingColorQueue"
                                :loading-approved="loadingApproved"
                                :css-color-opaque="cssColorOpaque"
                                @approve="onApproveColor"
                                @reject="onRejectColor"
                                @delete="onDeleteColor"
                            />
                    </TabsContent>

                </Tabs>
            </div>

            <!-- Delete all saved palettes confirmation -->
            <ConfirmDialog
                v-model:open="showDeleteAllConfirm"
                title="Delete all saved palettes?"
                :description="`This will permanently delete ${savedPalettes.length} palette${savedPalettes.length !== 1 ? 's' : ''} from local storage. This cannot be undone.`"
                confirm-label="Delete all"
                destructive
                @confirm="onDeleteAllSaved"
            >
                <template #action>
                    <Trash2 class="w-3.5 h-3.5" />
                    Delete all
                </template>
            </ConfirmDialog>

            <MigratePalettesDialog
                v-model:open="showMigrateDialog"
                :count="savedPalettes.length"
                :mode="migrateMode"
                @respond="onMigrateRespond"
            />
        </DialogScrollContent>
    </Dialog>
</template>

<script setup lang="ts">
import {
    ref,
    watch,
} from "vue";
import {
    Dialog,
    DialogScrollContent,
} from "@components/ui/dialog";
import { Tabs, TabsContent } from "@components/ui/tabs";
import { Trash2 } from "lucide-vue-next";

import { ConfirmDialog } from "@mkbabb/glass-ui";

import { copyToClipboard } from "@composables/useClipboard";
import { usePaletteStore } from "@composables/palette/usePaletteStore";
import { useAdminAuth } from "@composables/auth/useAdminAuth";
import { useUserAuth } from "@composables/auth/useUserAuth";
import { useSession } from "@composables/auth/useSession";
import { useBrowsePalettes } from "@composables/palette/useBrowsePalettes";
import { useAdminUsers, useColorNameQueue } from "@composables/auth/useAdminOperations";
import { useSlugMigration } from "@composables/palette/useSlugMigration";
import { publishPalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";

import PaletteDialogHeader from "./PaletteDialogHeader.vue";
import PaletteControlsBar from "./PaletteControlsBar.vue";
import PaletteSavedTab from "./PaletteSavedTab.vue";
import PaletteBrowseTab from "./PaletteBrowseTab.vue";
import MigratePalettesDialog from "./MigratePalettesDialog.vue";
import AdminUsersPanel from "./AdminUsersPanel.vue";
import AdminNamesPanel from "./AdminNamesPanel.vue";
import { ImagePaletteExtractor } from "@components/custom/image-palette-extractor";
import { usePaletteDialogState } from "./composables/usePaletteDialogState";

const props = defineProps<{
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

const openModel = defineModel<boolean>("open", { default: false });
const controlsBarRef = ref<InstanceType<typeof PaletteControlsBar> | null>(null);

const { isAuthenticated: isAdminAuthenticated, login: adminLogin } = useAdminAuth();
const { userSlug, ensureUser, login: userLogin, logout: userLogout, regenerate: userRegenerate, clearSlug } = useUserAuth();
const session = useSession();

const {
    savedPalettes,
    createPalette,
    updatePalette,
    deletePalette,
} = usePaletteStore();

// --- Tab + search + filter state (must be defined before composables that read searchQuery) ---
const {
    activeTab,
    searchQuery,
    expandedId,
    searchPlaceholder,
    filteredSaved,
    toggleExpand,
    setActiveTab,
} = usePaletteDialogState({
    savedPalettes,
    isAdminAuthenticated,
});

// --- Browse palettes composable ---
const {
    remotePalettes,
    browsing,
    sortLoading,
    sortMode,
    filteredBrowse,
    loadRemotePalettes,
    onSortChange,
    onSaveRemote,
    onVote,
    onRename,
} = useBrowsePalettes({ searchQuery });

// --- Admin operations composables ---
const {
    adminUsers,
    loadingUsers,
    userSortMode,
    adminUsersPanelRef,
    filteredAdminUsers,
    onUserSortChange,
    loadAdminUsers,
    onFeaturePalette,
    onAdminDeletePalette,
    onAdminDeleteUserPalette,
    onDeleteUserPalettes,
    onDeleteUser,
    onPruneEmpty,
} = useAdminUsers({ searchQuery, remotePalettes });

const {
    adminColorQueue,
    loadingColorQueue,
    approvedColors,
    loadingApproved,
    approvedLoaded,
    filteredColorQueue,
    filteredApproved,
    loadColorQueue,
    loadApprovedColors,
    onApproveColor,
    onRejectColor,
    onDeleteColor,
} = useColorNameQueue({ searchQuery });

// --- Slug migration composable ---
const {
    showMigrateDialog,
    migrateMode,
    slugBarRef,
    onSlugSwitch,
    onRegenerateSlug,
    onMigrateRespond,
} = useSlugMigration({
    savedPalettes,
    userLogin,
    userLogout,
    userRegenerate,
    adminLogin,
    clearUserSlug: clearSlug,
    ensureUser,
    activeTab,
});

// Keep the migration composable's slugBarRef synced with the nested ref in PaletteControlsBar
watch(controlsBarRef, (bar) => {
    slugBarRef.value = bar?.slugBarRef ?? null;
}, { immediate: true, flush: "post" });

// Reload browse palettes when slug changes (vote status is slug-bound)
watch(userSlug, () => {
    if (remotePalettes.value.length > 0) {
        loadRemotePalettes();
    }
});

// Lazy-load data on first tab visit
watch(activeTab, (tab) => {
    if (tab === "browse" && remotePalettes.value.length === 0) {
        loadRemotePalettes();
    }
    if (tab === "admin-users" && adminUsers.value.length === 0) {
        loadAdminUsers();
    }
    if (tab === "admin-names") {
        if (adminColorQueue.value.length === 0) loadColorQueue();
        if (!approvedLoaded.value) loadApprovedColors();
    }
});

// --- Current palette events from sub-component ---

async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
    await ensureUser();
    const palette = createPalette(name, colors);
    expandedId.value = palette.id;
}

function onCurrentPaletteUpdated(id: string, colors: PaletteColor[]) {
    updatePalette(id, { colors });
    expandedId.value = id;
}

function onSwatchAddColor(css: string) {
    emit("addColor", css);
}

function onEditColor(palette: Palette, colorIndex: number, css: string) {
    emit("startEdit", { paletteId: palette.id, colorIndex, originalCss: css });
}

// Exposed method for parent to call when committing edits
function commitColorEdit(paletteId: string, colorIndex: number, newCss: string) {
    if (paletteId === "__current__") {
        const oldCss = props.savedColorStrings[colorIndex];
        if (oldCss === newCss) return;
        const updated = [...props.savedColorStrings];
        updated[colorIndex] = newCss;
        emit("apply", updated);
        return;
    }

    const palette =
        savedPalettes.value.find((p) => p.id === paletteId) ??
        remotePalettes.value.find((p) => p.id === paletteId);
    if (!palette) return;

    const oldCss = palette.colors[colorIndex]?.css;
    if (oldCss === newCss) return;

    const updatedColors = [...palette.colors];
    updatedColors[colorIndex] = { ...updatedColors[colorIndex], css: newCss };
    updatePalette(paletteId, { colors: updatedColors });
}

defineExpose({ commitColorEdit, setActiveTab });

function isTeleportedTarget(event: any): boolean {
    const target = event.detail?.originalEvent?.target ?? event.target;
    return target instanceof HTMLElement && !!(
        target.closest('[data-reka-popper-content-wrapper]') ||
        target.closest('.card-menu-panel') ||
        target.closest('.floating-panel')
    );
}

function onPointerDownOutside(event: any) {
    if (isTeleportedTarget(event)) {
        event.preventDefault();
    }
}

function onInteractOutside(event: any) {
    if (isTeleportedTarget(event)) {
        event.preventDefault();
        return;
    }
    const originalEvent = event.detail?.originalEvent;
    if (!originalEvent || originalEvent.type === 'focusin' || originalEvent.type === 'focus') {
        event.preventDefault();
    }
}

function onDotClick() {
    copyToClipboard(props.cssColorOpaque);
}

async function onPrune() {
    const pruned = await onPruneEmpty();
    adminUsersPanelRef.value?.onPruneDone(pruned);
}

function onDelete(palette: Palette) {
    deletePalette(palette.id);
}

async function onPublish(palette: Palette) {
    try {
        await ensureUser();
        await session.ensureSession();
    } catch {
        console.warn("Failed to create session — check your network connection");
        return;
    }
    try {
        await publishPalette({
            name: palette.name,
            slug: palette.slug,
            colors: palette.colors,
        });
    } catch (e: any) {
        const msg = e?.message ?? "";
        console.warn(`Failed to publish: ${msg || "unknown error"}`);
    }
}

function onRenameSaved(palette: Palette, newName: string) {
    updatePalette(palette.id, { name: newName });
}

// --- Delete all saved palettes ---
const showDeleteAllConfirm = ref(false);

function onDeleteAllSaved() {
    for (const p of [...savedPalettes.value]) {
        deletePalette(p.id);
    }
    expandedId.value = null;
    showDeleteAllConfirm.value = false;
}
</script>

<style>
/* Tab underline variant — color handled by root TabsTrigger via --active-tab-color */
.palette-dialog button[role="tab"][data-state="active"] {
    border-bottom: 2px solid var(--active-tab-color);
    border-radius: 0;
}

/* Palette dialog overlay — saturate + transition (backdrop defaults from DialogScrollContent root) */
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
    box-shadow: 0 25px 50px -12px hsl(var(--foreground) / 0.25),
                0 0 0 1px hsl(var(--border));
    outline: none;
}
.palette-dialog:focus,
.palette-dialog:focus-visible {
    outline: none;
    box-shadow: 0 25px 50px -12px hsl(var(--foreground) / 0.25),
                0 0 0 1px hsl(var(--border));
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

/* Palette dialog close button — positioned below gradient bar */
.palette-dialog button:has(> .lucide-x) {
    color: var(--color-muted-foreground);
    top: 2rem;
    right: 0.75rem;
    z-index: var(--z-content);
    padding: 0.25rem;
    opacity: 0.6;
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.palette-dialog button:has(> .lucide-x):hover {
    background-color: var(--color-secondary);
    opacity: 1;
}
.palette-dialog button:has(> .lucide-x) .lucide-x {
    width: 1rem;
    height: 1rem;
    stroke-width: 2;
}
</style>
