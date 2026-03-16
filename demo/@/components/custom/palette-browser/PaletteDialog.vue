<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            :class="[
                'palette-dialog max-w-[1200px] p-0 gap-0 bg-card text-card-foreground overflow-hidden rounded-lg h-[min(90vh,820px)] max-h-[90vh] min-w-0 flex flex-col',
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
                class="px-4 sm:px-6 w-full flex flex-col flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden"
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
                        @delete-all="showDeleteAllConfirm = true"
                        @toggle-expand="toggleExpand"
                        @apply-palette="onApply"
                        @delete="onDelete"
                        @publish="onPublish"
                        @rename="onRenameSaved"
                        @edit-color="onEditColor"
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
                        @apply="onApply"
                        @save="onSaveRemote"
                        @vote="onVote"
                        @rename="onRename"
                        @edit-color="onEditColor"
                        @add-color="onSwatchAddColor"
                        @feature="onFeaturePalette"
                        @admin-delete="onAdminDeletePalette"
                    />

                    <!-- Admin Users tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-users" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <AdminUsersPanel
                                ref="adminUsersPanelRef"
                                :key="'admin-users'"
                                :users="filteredAdminUsers"
                                :loading="loadingUsers"
                                :expanded-id="expandedId"
                                :css-color="cssColorOpaque"
                                :total-users="adminUsers.length"
                                @delete-user-palettes="onDeleteUserPalettes"
                                @delete-user="onDeleteUser"
                                @toggle-expand="toggleExpand"
                                @apply="onApply"
                                @feature="onFeaturePalette"
                                @admin-delete-user-palette="onAdminDeleteUserPalette"
                                @prune="onPrune"
                                @refresh="loadAdminUsers"
                            />
                        </Transition>
                    </TabsContent>

                    <!-- Admin Names tab -->
                    <TabsContent v-if="isAdminAuthenticated" value="admin-names" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <AdminNamesPanel
                                :key="'admin-names'"
                                :pending-items="filteredColorQueue"
                                :approved-items="filteredApproved"
                                :loading-pending="loadingColorQueue"
                                :loading-approved="loadingApproved"
                                :css-color-opaque="cssColorOpaque"
                                @approve="onApproveColor"
                                @reject="onRejectColor"
                                @delete="onDeleteColor"
                            />
                        </Transition>
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
    computed,
    watch,
    Transition,
} from "vue";
import {
    Dialog,
    DialogScrollContent,
} from "@components/ui/dialog";
import { Tabs, TabsContent } from "@components/ui/tabs";
import { Trash2 } from "lucide-vue-next";

import ConfirmDialog from "./ConfirmDialog.vue";

import { copyToClipboard } from "@composables/useClipboard";
import { usePaletteStore } from "@composables/usePaletteStore";
import { useAdminAuth } from "@composables/useAdminAuth";
import { useUserAuth } from "@composables/useUserAuth";
import { useSession } from "@composables/useSession";
import { useBrowsePalettes } from "@composables/useBrowsePalettes";
import { useAdminUsers, useColorNameQueue } from "@composables/useAdminOperations";
import { useSlugMigration } from "@composables/useSlugMigration";
import { publishPalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";

import PaletteDialogHeader from "./PaletteDialogHeader.vue";
import PaletteControlsBar from "./PaletteControlsBar.vue";
import PaletteSavedTab from "./PaletteSavedTab.vue";
import PaletteBrowseTab from "./PaletteBrowseTab.vue";
import MigratePalettesDialog from "./MigratePalettesDialog.vue";
import AdminUsersPanel from "./AdminUsersPanel.vue";
import AdminNamesPanel from "./AdminNamesPanel.vue";

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
}>();

type TabValue = "saved" | "browse" | "admin-users" | "admin-names";

const openModel = defineModel<boolean>("open", { default: false });
const activeTab = ref<TabValue>("saved");
const searchQuery = ref("");
const expandedId = ref<string | null>(null);
const controlsBarRef = ref<InstanceType<typeof PaletteControlsBar> | null>(null);

const { isAuthenticated: isAdminAuthenticated, login: adminLogin } = useAdminAuth();
const { userSlug, ensureUser, login: userLogin, logout: userLogout, clearSlug } = useUserAuth();
const session = useSession();

const {
    savedPalettes,
    createPalette,
    updatePalette,
    deletePalette,
} = usePaletteStore();

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

const searchPlaceholder = computed(() => {
    switch (activeTab.value) {
        case "admin-users": return "Search users...";
        case "admin-names": return "Search color names...";
        default: return "Search palettes...";
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

defineExpose({ commitColorEdit });

function toggleExpand(id: string) {
    expandedId.value = expandedId.value === id ? null : id;
}

function isTeleportedTarget(event: any): boolean {
    const target = event.detail?.originalEvent?.target ?? event.target;
    return target instanceof HTMLElement && !!(
        target.closest('[data-reka-popper-content-wrapper]') ||
        target.closest('.card-menu-panel') ||
        target.closest('.swatch-floating-panel')
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

const filteredSaved = computed(() => {
    const q = searchQuery.value.toLowerCase();
    if (!q) return savedPalettes.value;
    return savedPalettes.value.filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );
});

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

watch(isAdminAuthenticated, (auth) => {
    if (!auth && activeTab.value.startsWith("admin-")) {
        activeTab.value = "saved";
    }
});

async function onPrune() {
    const pruned = await onPruneEmpty();
    adminUsersPanelRef.value?.onPruneDone(pruned);
}

function onApply(palette: Palette) {
    emit(
        "apply",
        palette.colors.map((c) => c.css),
    );
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

<style scoped>
:deep(button[role="tab"][data-state="active"]) {
    color: var(--active-tab-color) !important;
    box-shadow: none !important;
    border-bottom: 2px solid var(--active-tab-color);
    border-radius: 0;
}
</style>

<style>
/* Palette dialog overlay — blur & desaturate main view.
   !important needed to override Tailwind's bg-black/80 on DialogOverlay (shadcn-vue, not editable). */
[data-state]:has(> .palette-dialog) {
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(4px) saturate(0.7);
    transition: backdrop-filter var(--duration-slow) ease, background var(--duration-slow) ease, opacity var(--duration-slow) ease;
    --tw-duration: var(--duration-slow);
}
[data-state="closed"]:has(> .palette-dialog) {
    backdrop-filter: blur(0px) saturate(1);
    background: transparent !important;
}

/* Palette dialog enter/exit animation */
.palette-dialog {
    animation: dialog-in var(--duration-slow) var(--ease-decelerate);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px hsl(var(--border));
    outline: none;
}
.palette-dialog:focus,
.palette-dialog:focus-visible {
    outline: none;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px hsl(var(--border));
}
.palette-dialog[data-state="closed"] {
    animation: dialog-out var(--duration-normal) var(--ease-standard);
}
@keyframes dialog-in {
    from { opacity: 0; transform: scale(0.95) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes dialog-out {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to   { opacity: 0; transform: scale(0.95) translateY(8px); }
}

/* Dialog exits by sliding left + shrinking toward drawer position */
.palette-dialog--editing-exit[data-state="closed"] {
    animation: dialog-out-to-drawer var(--duration-slow) var(--ease-standard);
}
@keyframes dialog-out-to-drawer {
    from { opacity: 1; transform: scale(1) translateX(0); }
    to   { opacity: 0; transform: scale(0.35) translateX(-120%); }
}

/* Dialog enters by sliding in from left (returning from edit mode) */
.palette-dialog--editing-enter[data-state="open"] {
    animation: dialog-in-from-drawer var(--duration-slow) var(--ease-standard);
}
@keyframes dialog-in-from-drawer {
    from { opacity: 0; transform: scale(0.35) translateX(-120%); }
    to   { opacity: 1; transform: scale(1) translateX(0); }
}

/* Mobile variants: slide down/up instead of left */
@media (max-width: 639px) {
    @keyframes dialog-out-to-drawer {
        from { opacity: 1; transform: scale(1) translateY(0); }
        to   { opacity: 0; transform: scale(0.5) translateY(60%); }
    }
    @keyframes dialog-in-from-drawer {
        from { opacity: 0; transform: scale(0.5) translateY(60%); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
    }
}

/* Slow overlay fade to match longer dialog animation */
[data-state="closed"]:has(> .palette-dialog--editing-exit) {
    animation-duration: var(--duration-slow) !important;
}

/* Palette dialog close button — repositioned below gradient bar */
.palette-dialog button:has(> .lucide-x) {
    color: var(--color-muted-foreground);
    top: 1rem;
    right: 0.75rem;
    z-index: var(--z-content);
}
.palette-dialog button:has(> .lucide-x):hover {
    background-color: var(--color-secondary);
}
.palette-dialog button:has(> .lucide-x) .lucide-x {
    width: 1rem;
    height: 1rem;
    stroke-width: 2;
}

/* Smaller, tighter close button inside the dialog portal */
.palette-dialog button.absolute {
    top: 0.875rem;
    right: 0.5rem;
    padding: 0.125rem;
    opacity: 0.35;
    transition: opacity var(--duration-fast) ease;
}
.palette-dialog button.absolute:hover {
    opacity: 0.7;
}
.palette-dialog button.absolute svg {
    width: 0.5rem;
    height: 0.5rem;
}
</style>
