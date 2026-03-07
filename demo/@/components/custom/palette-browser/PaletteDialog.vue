<template>
    <Dialog v-model:open="openModel">
        <DialogScrollContent
            :class="[
                'palette-dialog w-[calc(100%-1rem)] sm:w-[min(95vw,1050px)] p-0 gap-0 bg-card text-card-foreground overflow-hidden rounded-lg h-[min(90vh,820px)] max-h-[90vh] min-w-0 flex flex-col',
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
                    <div class="flex flex-col gap-2 mb-4 min-w-0 sticky top-0 z-10 bg-card pb-2">
                        <!-- User slug display -->
                        <PaletteSlugBar
                            ref="slugBarRef"
                            :user-slug="userSlug"
                            :css-color-opaque="cssColorOpaque"
                            :has-saved-palettes="savedPalettes.length > 0"
                            :is-admin="isAdminAuthenticated"
                            @switch-slug="onSlugSwitch"
                            @regenerate="onRegenerateSlug"
                        />

                        <div
                            ref="tabsScrollRef"
                            :class="['overflow-x-auto mx-0', tabsOverflowing && 'tabs-scroll-mask']"
                        >
                            <TabsList class="shrink-0 w-fit flex-nowrap">
                                <TabsTrigger value="saved" class="fraunces text-base font-bold"
                                    >My Palettes</TabsTrigger
                                >
                                <TabsTrigger value="browse" class="fraunces text-base font-bold"
                                    >Browse</TabsTrigger
                                >
                                <template v-if="isAdminAuthenticated">
                                    <TabsTrigger value="admin-users" class="fraunces text-base font-bold">
                                        <Shield class="w-3.5 h-3.5 mr-1" />
                                        Users
                                    </TabsTrigger>
                                    <TabsTrigger value="admin-names" class="fraunces text-base font-bold">
                                        Names
                                    </TabsTrigger>
                                </template>
                            </TabsList>
                        </div>
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                            <Input
                                v-model="searchQuery"
                                :placeholder="searchPlaceholder"
                                class="fira-code text-sm sm:text-base h-9 sm:h-10 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0 flex-1"
                            />
                            <!-- Sort controls (browse tab) -->
                            <template v-if="activeTab === 'browse'">
                                <SortFilterMenu
                                    :sort="sortMode"
                                    @update:sort="onSortChange"
                                />
                            </template>
                            <!-- Sort controls (admin users tab) -->
                            <template v-if="activeTab === 'admin-users'">
                                <UserSortMenu
                                    :sort="userSortMode"
                                    @update:sort="onUserSortChange"
                                />
                            </template>
                        </div>
                    </div>

                    <!-- My Palettes tab -->
                    <TabsContent value="saved" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'saved'" class="grid gap-3 pb-3">
                                <!-- Current working palette -->
                                <CurrentPaletteEditor
                                    :saved-color-strings="savedColorStrings"
                                    :css-color-opaque="cssColorOpaque"
                                    :saved-palette-count="savedPalettes.length"
                                    :saved-palettes="savedPalettes"
                                    @apply="(colors) => emit('apply', colors)"
                                    @add-color="(css) => emit('addColor', css)"
                                    @start-edit="(target) => emit('startEdit', target)"
                                    @saved="onCurrentPaletteSaved"
                                    @updated="onCurrentPaletteUpdated"
                                />

                                <!-- Saved palettes toolbar -->
                                <div v-if="savedPalettes.length > 0" class="flex items-center gap-2">
                                    <span class="fira-code text-xs text-muted-foreground">
                                        {{ savedPalettes.length }} palette{{ savedPalettes.length !== 1 ? 's' : '' }}
                                    </span>
                                    <div class="flex-1" />
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        class="h-7 px-2.5 cursor-pointer fraunces text-xs gap-1.5"
                                        @click="showDeleteAllConfirm = true"
                                    >
                                        <Trash2 class="w-3 h-3" />
                                        Delete all
                                    </Button>
                                </div>

                                <PaletteCard
                                    v-for="palette in filteredSaved"
                                    :key="palette.id"
                                    :palette="palette"
                                    :expanded="expandedId === palette.id"
                                    :css-color="cssColorOpaque"
                                    :editable-name="true"
                                    @click="toggleExpand(palette.id)"
                                    @apply="onApply"
                                    @delete="onDelete"
                                    @publish="onPublish"
                                    @rename="onRenameSaved"
                                    @edit-color="onEditColor"
                                />
                                <p
                                    v-if="filteredSaved.length === 0"
                                    class="text-center text-muted-foreground py-4 fira-code text-sm italic"
                                >
                                    No saved palettes yet. Add colors above, then save.
                                </p>
                            </div>
                        </Transition>
                    </TabsContent>

                    <!-- Browse (remote) palettes tab -->
                    <TabsContent value="browse" class="mt-0 w-full">
                        <Transition name="tab-fade" mode="out-in">
                            <div :key="'browse'" class="grid gap-3 pb-3 min-h-[120px]">
                                <div
                                    v-if="browsing"
                                    class="flex items-center justify-center min-h-[120px]"
                                >
                                    <Loader2
                                        class="w-5 h-5 animate-spin text-muted-foreground"
                                    />
                                </div>
                                <template v-else>
                                    <div
                                        class="grid gap-3 transition-opacity duration-200"
                                        :class="{ 'opacity-50': sortLoading }"
                                    >
                                        <PaletteCard
                                            v-for="palette in filteredBrowse"
                                            :key="palette.slug"
                                            :palette="palette"
                                            :expanded="expandedId === palette.id"
                                            :css-color="cssColorOpaque"
                                            :is-owned="palette.userSlug === userSlug"
                                            :is-admin="isAdminAuthenticated"
                                            show-slug
                                            @click="toggleExpand(palette.id)"
                                            @apply="onApply"
                                            @save="onSaveRemote"
                                            @vote="onVote"
                                            @rename="onRename"
                                            @edit-color="onEditColor"
                                            @add-color="onSwatchAddColor"
                                            @feature="onFeaturePalette"
                                            @admin-delete="onAdminDeletePalette"
                                        />
                                        <p
                                            v-if="filteredBrowse.length === 0"
                                            class="text-center text-muted-foreground py-8 fira-code text-base italic"
                                        >
                                            No published palettes found.
                                        </p>
                                    </div>
                                </template>
                            </div>
                        </Transition>
                    </TabsContent>

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
    nextTick,
    onMounted,
    onBeforeUnmount,
    Transition,
} from "vue";
import {
    Dialog,
    DialogScrollContent,
} from "@components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Input } from "@components/ui/input";
import {
    Loader2,
    Shield,
    Trash2,
} from "lucide-vue-next";
import { Button } from "@components/ui/button";

import ConfirmDialog from "./ConfirmDialog.vue";

import { copyToClipboard } from "@composables/useClipboard";
import { usePaletteStore } from "@composables/usePaletteStore";
import { useAdminAuth } from "@composables/useAdminAuth";
import { useUserAuth } from "@composables/useUserAuth";
import { useSession } from "@composables/useSession";
import { useBrowsePalettes } from "@composables/useBrowsePalettes";
import { useAdminOperations } from "@composables/useAdminOperations";
import { useSlugMigration } from "@composables/useSlugMigration";
import { publishPalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";

import PaletteDialogHeader from "./PaletteDialogHeader.vue";
import PaletteSlugBar from "./PaletteSlugBar.vue";
import CurrentPaletteEditor from "./CurrentPaletteEditor.vue";
import PaletteCard from "./PaletteCard.vue";
import MigratePalettesDialog from "./MigratePalettesDialog.vue";
import SortFilterMenu from "./SortFilterMenu.vue";
import UserSortMenu from "./UserSortMenu.vue";
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
const tabsScrollRef = ref<HTMLElement | null>(null);
const tabsOverflowing = ref(false);

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

// --- Admin operations composable ---
const {
    adminUsers,
    loadingUsers,
    adminColorQueue,
    loadingColorQueue,
    userSortMode,
    adminUsersPanelRef,
    filteredAdminUsers,
    filteredColorQueue,
    onUserSortChange,
    loadAdminUsers,
    onFeaturePalette,
    onAdminDeletePalette,
    onAdminDeleteUserPalette,
    onDeleteUserPalettes,
    onDeleteUser,
    loadColorQueue,
    approvedColors,
    loadingApproved,
    approvedLoaded,
    filteredApproved,
    loadApprovedColors,
    onApproveColor,
    onRejectColor,
    onDeleteColor,
    onPruneEmpty,
} = useAdminOperations({ searchQuery, remotePalettes });

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
    activeTab,
});

// Auto-register user when dialog opens if no slug exists (skip for admin)
watch(openModel, (open) => {
    if (open && !isAdminAuthenticated.value) {
        ensureUser().catch((e: any) => {
            console.warn("Auto-register failed:", e?.message);
        });
    }
});

// Reload browse palettes when slug changes (vote status is slug-bound)
watch(userSlug, () => {
    if (remotePalettes.value.length > 0) {
        loadRemotePalettes();
    }
});

// Tabs overflow detection
function checkTabsOverflow() {
    const el = tabsScrollRef.value;
    if (el) {
        tabsOverflowing.value = el.scrollWidth > el.clientWidth;
    }
}

let tabsResizeObserver: ResizeObserver | null = null;

watch(openModel, (open) => {
    if (open) {
        nextTick(checkTabsOverflow);
    }
});

watch(isAdminAuthenticated, () => {
    nextTick(checkTabsOverflow);
});

onMounted(() => {
    tabsResizeObserver = new ResizeObserver(checkTabsOverflow);
    if (tabsScrollRef.value) {
        tabsResizeObserver.observe(tabsScrollRef.value);
    }
    watch(tabsScrollRef, (el) => {
        if (el) tabsResizeObserver?.observe(el);
    });
});

onBeforeUnmount(() => {
    tabsResizeObserver?.disconnect();
});

const searchPlaceholder = computed(() => {
    switch (activeTab.value) {
        case "admin-users": return "Search users...";
        case "admin-names": return "Search color names...";
        default: return "Search palettes...";
    }
});

// --- Current palette events from sub-component ---

function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
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
.tabs-scroll-mask {
    mask-image: linear-gradient(to right, transparent, black 0.75rem, black calc(100% - 0.75rem), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 0.75rem, black calc(100% - 0.75rem), transparent);
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
}

:deep(button[role="tab"][data-state="active"]) {
    color: var(--active-tab-color) !important;
    box-shadow: none !important;
    border-bottom: 2px solid var(--active-tab-color);
    border-radius: 0;
}
</style>

<style>
/* Smaller, tighter close button inside the dialog portal */
.palette-dialog button.absolute {
    top: 0.875rem;
    right: 0.5rem;
    padding: 0.125rem;
    opacity: 0.35;
    transition: opacity 0.15s ease;
}
.palette-dialog button.absolute:hover {
    opacity: 0.7;
}
.palette-dialog button.absolute svg {
    width: 0.5rem;
    height: 0.5rem;
}
</style>
