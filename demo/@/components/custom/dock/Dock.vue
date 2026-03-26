<script setup lang="ts">
import { computed, inject, ref, watch, useTemplateRef } from "vue";
import { ChevronDown, Check, Undo2, Paintbrush, ArrowLeft, Shield } from "lucide-vue-next";
import { GlassDock, DockLayerGroup } from ".";
import { BouncyTabs } from "@mkbabb/glass-ui";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import ActionBarLayer from "./layers/ActionBarLayer.vue";
import GenericActionBar from "./layers/GenericActionBar.vue";
import SlugEditLayer from "./layers/SlugEditLayer.vue";
import MobileMenuDropdown from "./menus/MobileMenuDropdown.vue";
import ProfileSection from "./menus/ProfileSection.vue";
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@components/ui/select";
import { useMediaQuery } from "@vueuse/core";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import type { ViewId } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import { usePopupMutex } from "./composables/usePopupMutex";
import type { ActionBarContext } from "@components/custom/color-picker/keys";
import type { EditTarget } from "@components/custom/color-picker";
import type { DockActionBar } from "./composables/useDockActionBar";

const props = defineProps<{
    linkCopied: boolean;
    editTarget: EditTarget | null;
    actionBar?: ActionBarContext | null;
    genericActionBar?: DockActionBar | null;
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const safeAccent = inject(SAFE_ACCENT_KEY)!;

const emit = defineEmits<{
    shareLink: [];
    commitEdit: [];
    cancelEdit: [];
}>();

const viewManager = inject(VIEW_MANAGER_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;
const actionBar = computed(() => props.actionBar ?? null);
const genericBar = computed(() => props.genericActionBar ?? null);
const hasAnyActionBar = computed(() => !!actionBar.value || !!genericBar.value);

// Admin dock mode — toggled via "Admin" entry in user mode, "Exit Admin" in admin mode
const isAdminMode = ref(viewManager.currentView.value.startsWith("admin-"));

const userViews: ViewId[] = ["picker", "palettes", "browse", "extract", "mix", "generate", "gradient"];
const adminViews: ViewId[] = ["admin-users", "admin-names", "admin-audit", "admin-flagged", "admin-tags", "atmosphere"];

const viewEntries = computed(() => {
    if (isAdminMode.value && pm.isAdminAuthenticated.value) {
        return adminViews.map((id) => ({ id, ...viewManager.viewMap[id] }));
    }
    return userViews.map((id) => ({ id, ...viewManager.viewMap[id] }));
});

function toggleAdminMode() {
    isAdminMode.value = !isAdminMode.value;
    if (isAdminMode.value) {
        viewManager.switchView("admin-users");
    } else {
        viewManager.switchView("picker");
    }
}

// Sync admin mode with current view
watch(() => viewManager.currentView.value, (view) => {
    if (view.startsWith("admin-") || view === "atmosphere") {
        isAdminMode.value = true;
    }
});

// Exit admin mode on logout
watch(() => pm.isAdminAuthenticated.value, (auth) => {
    if (!auth) isAdminMode.value = false;
});

function onViewChange(id: string | number | boolean | Record<string, string> | null) {
    if (typeof id === "string") {
        if (id === "__admin_toggle__") {
            toggleAdminMode();
            return;
        }
        viewManager.switchView(id as ViewId);
    }
}

// ── Action bar layer ──
const actionBarLayerActive = ref(false);
const actionBarLayerRef = ref<InstanceType<typeof ActionBarLayer> | null>(null);

function toggleActionBar() {
    actionBarLayerActive.value = !actionBarLayerActive.value;
}

watch(hasAnyActionBar, (has) => {
    if (!has && actionBarLayerActive.value) {
        actionBarLayerActive.value = false;
    }
});

watch(actionBarLayerActive, (active) => {
    if (active) dockRef.value?.keepOpen();
    else dockRef.value?.release();
});

function onActionBarOpenPalette() {
    viewManager.switchView(viewManager.currentView.value === "palettes" ? "picker" : "palettes");
}

function onActionBarOpenExtract() {
    viewManager.switchView(viewManager.currentView.value === "extract" ? "picker" : "extract");
}

// ── Slug edit ──
const slugEditMode = ref(false);
const slugEditRef = ref<InstanceType<typeof SlugEditLayer> | null>(null);

function onStartSlugEdit() {
    slugEditRef.value?.onStartSlugEdit();
}

function onCopySlug() {
    slugEditRef.value?.onCopySlug();
}

// ── Dock popup mutex ──
const { isAnyOpen, popupModel } = usePopupMutex<"view-select" | "mobile-menu" | "profile-menu" | "mbabb-menu">();
const viewSelectOpen = popupModel("view-select");
const mobileMenuOpen = popupModel("mobile-menu");
const profileMenuOpen = popupModel("profile-menu");
const mbabbMenuOpen = popupModel("mbabb-menu");

const isDesktop = useMediaQuery("(min-width: 1024px)");
const mobileEditActive = computed(() => !isDesktop.value && !!props.editTarget);
const anyEditActive = computed(() => !!props.editTarget);

// ── Dock state management ──
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>('dockRef');

watch(() => dockRef.value?.expanded, (expanded) => {
    if (!expanded && slugEditMode.value) {
        slugEditMode.value = false;
    }
});

watch(anyEditActive, (active) => {
    if (active) { dockRef.value?.keepOpen(); dockRef.value?.expand?.(); }
    else dockRef.value?.release();
});

watch(isAnyOpen, (open) => {
    if (open) dockRef.value?.keepOpen();
    else dockRef.value?.release();
});

// ── Layer transition ──
const activeLayer = computed<string>(() => {
    if (mobileEditActive.value) return "mobile-edit";
    if (slugEditMode.value) return "slug-edit";
    if (actionBarLayerActive.value) return "action-bar";
    return "main";
});
</script>

<template>
    <div class="fixed top-[var(--dock-pos)] inset-x-0 z-[var(--z-dock)] flex items-center justify-center pointer-events-none">
        <div class="pointer-events-auto">
            <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="isDesktop" :fit-content="true" :always-expanded="!isDesktop">
                <DockLayerGroup :active-layer="activeLayer" v-slot="{ layerProps }">
                    <!-- Mobile edit layer -->
                    <div v-bind="layerProps('mobile-edit')" class="justify-center">
                        <WatercolorDot
                            v-if="editTarget"
                            :color="editTarget.originalCss"
                            tag="div"
                            class="w-7 h-7 shrink-0 opacity-50"
                            seed="edit-original"
                        />
                        <span class="text-muted-foreground text-xs">&rarr;</span>
                        <WatercolorDot
                            :color="cssColorOpaque"
                            tag="div"
                            class="w-7 h-7 shrink-0"
                            seed="edit-new"
                        />
                        <div class="dock-separator"></div>
                        <button class="dock-icon-btn" title="Save edit" @click="emit('commitEdit')">
                            <Check class="w-5 h-5" :style="{ color: safeAccent }" />
                        </button>
                        <button class="dock-icon-btn" title="Cancel edit" @click="emit('cancelEdit')">
                            <Undo2 class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- Slug edit layer -->
                    <div v-bind="layerProps('slug-edit')" class="justify-center">
                        <SlugEditLayer ref="slugEditRef" v-model:active="slugEditMode" />
                    </div>

                    <!-- Action bar layer (color picker or generic) -->
                    <div v-if="hasAnyActionBar" v-bind="layerProps('action-bar')">
                        <button class="dock-icon-btn shrink-0" title="Back" @click="actionBarLayerActive = false">
                            <ArrowLeft class="w-6 h-6" />
                        </button>
                        <div class="dock-separator"></div>
                        <!-- Color picker's rich action bar -->
                        <ActionBarLayer
                            v-if="actionBar"
                            ref="actionBarLayerRef"
                            :action-bar="actionBar"
                            :edit-target="editTarget"
                            @open-palette="onActionBarOpenPalette"
                            @open-extract="onActionBarOpenExtract"
                        />
                        <!-- Generic action bar for other views -->
                        <GenericActionBar
                            v-else-if="genericBar"
                            :actions="genericBar.actions.value"
                            :accent-color="genericBar.accentColor ?? safeAccent"
                        />
                    </div>

                    <!-- Main navigation layer -->
                    <div v-bind="layerProps('main')">
                        <!-- View selector -->
                        <Select
                            :model-value="viewManager.currentView.value"
                            :open="viewSelectOpen"
                            @update:open="viewSelectOpen = $event"
                            @update:model-value="onViewChange"
                        >
                            <SelectTrigger
                                class="dock-select-trigger border-none h-auto bg-transparent text-small font-display font-normal gap-1 w-auto [&>span]:line-clamp-none [&>svg:last-child]:w-3 [&>svg:last-child]:h-3 focus-ring"
                                :style="{ '--dock-ring': safeAccent }"
                            >
                                <component
                                    :is="viewManager.currentConfig.value.icon"
                                    class="w-6 h-6 shrink-0"
                                    :class="isAdminMode && 'gold-shimmer-icon'"
                                    :style="isAdminMode ? {} : { color: safeAccent }"
                                />
                                <SelectValue v-if="isDesktop" />
                            </SelectTrigger>
                            <SelectContent class="min-w-[12rem]">
                                <SelectGroup class="text-small font-display">
                                    <SelectItem
                                        v-for="entry in viewEntries"
                                        :key="entry.id"
                                        :value="entry.id"
                                        class="py-1.5 px-2.5"
                                        hide-indicator
                                    >
                                        <span class="flex items-center gap-2">
                                            <span
                                                class="inline-block w-2 h-2 rounded-full shrink-0 transition-colors"
                                                :style="{ backgroundColor: viewManager.currentView.value === entry.id ? (isAdminMode ? 'var(--color-gold)' : cssColorOpaque) : 'hsl(var(--muted-foreground) / 0.25)' }"
                                            ></span>
                                            <component :is="entry.icon" class="w-4 h-4 shrink-0" :style="viewManager.currentView.value === entry.id ? { color: isAdminMode ? 'var(--color-gold)' : safeAccent } : {}" :class="viewManager.currentView.value !== entry.id ? 'text-muted-foreground' : ''" />
                                            <span :class="[
                                                viewManager.currentView.value === entry.id ? 'font-semibold' : '',
                                                entry.id === 'palettes' ? 'pastel-rainbow-text' : '',
                                            ]">{{ entry.label }}</span>
                                        </span>
                                    </SelectItem>

                                    <!-- Mode toggle separator + entry -->
                                    <div v-if="pm.isAdminAuthenticated.value" class="border-t border-border my-1"></div>
                                    <SelectItem
                                        v-if="pm.isAdminAuthenticated.value && !isAdminMode"
                                        value="__admin_toggle__"
                                        class="py-1.5 px-2.5"
                                        hide-indicator
                                    >
                                        <span class="flex items-center gap-2">
                                            <span class="inline-block w-2 h-2 rounded-full shrink-0" style="background: var(--color-gold)"></span>
                                            <Shield class="w-4 h-4 shrink-0 gold-shimmer-icon" />
                                            <span class="gold-shimmer">Admin</span>
                                        </span>
                                    </SelectItem>
                                    <SelectItem
                                        v-if="pm.isAdminAuthenticated.value && isAdminMode"
                                        value="__admin_toggle__"
                                        class="py-1.5 px-2.5"
                                        hide-indicator
                                    >
                                        <span class="flex items-center gap-2">
                                            <span class="inline-block w-2 h-2 rounded-full shrink-0" style="background: hsl(var(--muted-foreground) / 0.25)"></span>
                                            <ArrowLeft class="w-4 h-4 shrink-0 text-muted-foreground" />
                                            <span>Back to app</span>
                                        </span>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <!-- Action bar toggle -->
                        <div v-if="hasAnyActionBar" class="dock-separator"></div>
                        <div
                            class="flex items-center gap-1 overflow-hidden transition-all duration-300 ease-[var(--ease-standard)]"
                            :style="{ maxWidth: hasAnyActionBar ? '8rem' : '0px', opacity: hasAnyActionBar ? 1 : 0 }"
                        >
                            <button
                                class="dock-dropdown-trigger"
                                :class="{ 'is-active': actionBarLayerActive }"
                                title="Action bar"
                                :tabindex="hasAnyActionBar ? 0 : -1"
                                @click="toggleActionBar"
                            >
                                <component
                                    :is="genericBar?.icon ?? Paintbrush"
                                    class="w-6 h-6"
                                    :style="{ color: genericBar?.accentColor ?? safeAccent }"
                                />
                                <span v-if="isDesktop" class="text-small font-display" :style="{ color: genericBar?.accentColor ?? safeAccent }">
                                    {{ genericBar?.label ?? 'Tools' }}
                                </span>
                                <ChevronDown class="w-3 h-3 text-muted-foreground" />
                            </button>
                        </div>

                        <!-- Mobile pane toggle -->
                        <template v-if="viewManager.currentConfig.value.right !== null">
                            <div class="dock-separator lg:hidden"></div>
                            <div class="lg:hidden">
                                <BouncyTabs
                                    variant="pill"
                                    class="fraunces"
                                    :options="[
                                        { label: viewManager.currentConfig.value.leftLabel ?? '', value: '0' },
                                        { label: viewManager.currentConfig.value.rightLabel ?? '', value: '1' },
                                    ]"
                                    :model-value="String(viewManager.mobilePaneIndex.value)"
                                    @update:model-value="(v: string) => viewManager.mobilePaneIndex.value = Number(v) as 0 | 1"
                                />
                            </div>
                        </template>

                        <!-- Mobile overflow menu -->
                        <div class="dock-separator lg:hidden"></div>
                        <MobileMenuDropdown
                            v-model:open="mobileMenuOpen"
                            :css-color-opaque="safeAccent"
                            :link-copied="linkCopied"
                            @share-link="emit('shareLink')"
                            @start-slug-edit="onStartSlugEdit()"
                            @copy-slug="onCopySlug()"
                        />

                        <!-- Desktop profile + @mbabb -->
                        <ProfileSection
                            v-model:profile-menu-open="profileMenuOpen"
                            v-model:mbabb-menu-open="mbabbMenuOpen"
                            :css-color-opaque="safeAccent"
                            :link-copied="linkCopied"
                            @share-link="emit('shareLink')"
                            @start-slug-edit="onStartSlugEdit()"
                            @copy-slug="onCopySlug()"
                        />
                    </div>
                </DockLayerGroup>

                <!-- Collapsed state -->
                <template #collapsed>
                    <WatercolorDot
                        :color="cssColorOpaque"
                        tag="div"
                        class="w-6 h-6 shrink-0"
                        seed="top-dock"
                    />
                    <component
                        :is="viewManager.currentConfig.value.icon"
                        class="w-5 h-5 shrink-0 sm:hidden"
                        :style="{ color: safeAccent }"
                    />
                    <span class="text-base fraunces text-foreground whitespace-nowrap hidden sm:inline">
                        {{ viewManager.currentConfig.value.label }}
                    </span>
                    <ChevronDown class="w-3 h-3 text-muted-foreground shrink-0" />
                </template>
            </GlassDock>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";
</style>
