<script setup lang="ts">
import { computed, inject, ref, watch, useTemplateRef } from "vue";
import { ChevronDown, Check, Undo2, Paintbrush, ArrowLeft } from "lucide-vue-next";
import GlassDock from "./GlassDock.vue";
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
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import { useLayerTransition } from "./composables/useLayerTransition";
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

const viewEntries = computed(() => {
    const entries: { id: ViewId; label: string; icon: any }[] = [
        { id: "picker", ...viewManager.viewMap.picker },
        { id: "palettes", ...viewManager.viewMap.palettes },
        { id: "browse", ...viewManager.viewMap.browse },
        { id: "extract", ...viewManager.viewMap.extract },
        { id: "mix", ...viewManager.viewMap.mix },
        { id: "generate", ...viewManager.viewMap.generate },
        { id: "gradient", ...viewManager.viewMap.gradient },
        { id: "atmosphere", ...viewManager.viewMap.atmosphere },
    ];
    if (pm.isAdminAuthenticated.value) {
        entries.push(
            { id: "admin-users", ...viewManager.viewMap["admin-users"] },
            { id: "admin-names", ...viewManager.viewMap["admin-names"] },
        );
    }
    return entries;
});

function onViewChange(id: string | number | boolean | Record<string, string> | null) {
    if (typeof id === "string") {
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
type DockPopupKey = "view-select" | "mobile-menu" | "profile-menu" | "mbabb-menu";
const dockPopup = ref<DockPopupKey | null>(null);
const pendingDockPopup = ref<DockPopupKey | null>(null);
let popupSwapTimer: ReturnType<typeof setTimeout> | null = null;

const isDesktop = useMediaQuery("(min-width: 1024px)");
const mobileEditActive = computed(() => !isDesktop.value && !!props.editTarget);
const anyEditActive = computed(() => !!props.editTarget);

const viewSelectOpen = computed({
    get: () => dockPopup.value === "view-select",
    set: (open: boolean) => updateDockPopup("view-select", open),
});
const mobileMenuOpen = computed({
    get: () => dockPopup.value === "mobile-menu",
    set: (open: boolean) => updateDockPopup("mobile-menu", open),
});
const profileMenuOpen = computed({
    get: () => dockPopup.value === "profile-menu",
    set: (open: boolean) => updateDockPopup("profile-menu", open),
});
const mbabbMenuOpen = computed({
    get: () => dockPopup.value === "mbabb-menu",
    set: (open: boolean) => updateDockPopup("mbabb-menu", open),
});

function clearPopupSwapTimer() {
    if (popupSwapTimer) {
        clearTimeout(popupSwapTimer);
        popupSwapTimer = null;
    }
}

function updateDockPopup(key: DockPopupKey, open: boolean) {
    if (open) {
        if (dockPopup.value === key) return;
        clearPopupSwapTimer();
        if (dockPopup.value && dockPopup.value !== key) {
            pendingDockPopup.value = key;
            dockPopup.value = null;
            popupSwapTimer = setTimeout(() => {
                dockPopup.value = pendingDockPopup.value;
                pendingDockPopup.value = null;
                popupSwapTimer = null;
            }, 180);
            return;
        }
        pendingDockPopup.value = null;
        dockPopup.value = key;
        return;
    }

    if (pendingDockPopup.value === key) {
        pendingDockPopup.value = null;
    }
    if (dockPopup.value === key) {
        dockPopup.value = null;
    }
}

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

const anyDropdownOpen = computed(() => dockPopup.value !== null || pendingDockPopup.value !== null);
watch(anyDropdownOpen, (open) => {
    if (open) dockRef.value?.keepOpen();
    else dockRef.value?.release();
});

const mainLayerActive = computed(() => !slugEditMode.value && !mobileEditActive.value && !actionBarLayerActive.value);

// ── Layer transition ──
const layerGridEl = useTemplateRef<HTMLElement>("layerGridEl");

const activeLayer = computed<string>(() => {
    if (mobileEditActive.value) return "mobile-edit";
    if (slugEditMode.value) return "slug-edit";
    if (actionBarLayerActive.value) return "action-bar";
    return "main";
});

const { layerProps, onTransitionEnd: onLayerTransitionEnd } = useLayerTransition({
    containerEl: layerGridEl,
    activeLayer,
});
</script>

<template>
    <div class="fixed top-[var(--dock-pos)] inset-x-0 z-40 flex items-center justify-center pointer-events-none">
        <div class="pointer-events-auto">
            <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="isDesktop" :fit-content="true" :always-expanded="!isDesktop">
                <div ref="layerGridEl" class="dock-layer-grid" @transitionend="onLayerTransitionEnd">
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
                            <Check class="w-5 h-5" :style="{ color: cssColorOpaque }" />
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
                            :accent-color="genericBar.accentColor ?? cssColorOpaque"
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
                                class="dock-select-trigger border-none h-auto bg-transparent fraunces text-sm font-normal gap-1 w-auto [&>span]:line-clamp-none [&>svg:last-child]:w-3 [&>svg:last-child]:h-3 focus-ring"
                                :style="{ '--dock-ring': cssColorOpaque }"
                            >
                                <component
                                    :is="viewManager.currentConfig.value.icon"
                                    class="w-6 h-6 shrink-0"
                                    :style="{ color: cssColorOpaque }"
                                />
                                <SelectValue v-if="isDesktop" />
                            </SelectTrigger>
                            <SelectContent class="min-w-[12rem]">
                                <SelectGroup class="fraunces text-sm">
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
                                                :style="{ backgroundColor: viewManager.currentView.value === entry.id ? cssColorOpaque : 'hsl(var(--muted-foreground) / 0.25)' }"
                                            ></span>
                                            <component :is="entry.icon" class="w-4 h-4 shrink-0" :style="viewManager.currentView.value === entry.id ? { color: cssColorOpaque } : {}" :class="viewManager.currentView.value !== entry.id ? 'text-muted-foreground' : ''" />
                                            <span :class="[
                                                viewManager.currentView.value === entry.id ? 'font-semibold' : '',
                                                entry.id === 'palettes' ? 'pastel-rainbow-text' : '',
                                            ]">{{ entry.label }}</span>
                                        </span>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <!-- Action bar toggle -->
                        <div
                            class="flex items-center gap-1 overflow-hidden transition-all duration-300 ease-[var(--ease-standard)]"
                            :style="{ maxWidth: hasAnyActionBar ? '8rem' : '0px', opacity: hasAnyActionBar ? 1 : 0 }"
                        >
                            <div class="dock-separator"></div>
                            <button
                                class="shrink-0 flex items-center gap-1 px-1.5 py-1 bg-transparent border-none cursor-pointer focus-ring"
                                title="Action bar"
                                :tabindex="hasAnyActionBar ? 0 : -1"
                                @click="toggleActionBar"
                            >
                                <component
                                    :is="genericBar?.icon ?? Paintbrush"
                                    class="w-6 h-6"
                                    :style="{ color: genericBar?.accentColor ?? cssColorOpaque }"
                                />
                                <span v-if="isDesktop" class="fraunces text-sm" :style="{ color: genericBar?.accentColor ?? cssColorOpaque }">
                                    {{ genericBar?.label ?? 'Tools' }}
                                </span>
                                <ChevronDown class="w-3 h-3 text-muted-foreground" />
                            </button>
                        </div>

                        <!-- Mobile pane toggle -->
                        <template v-if="viewManager.currentConfig.value.right !== null">
                            <div class="dock-separator lg:hidden"></div>
                            <div class="lg:hidden flex items-center gap-0.5 rounded-full bg-foreground/5 p-0.5">
                                <button
                                    :class="[
                                        'px-2.5 py-0.5 text-xs fraunces rounded-full transition-all cursor-pointer focus-ring',
                                        viewManager.mobilePaneIndex.value === 0
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                    @click="viewManager.mobilePaneIndex.value = 0"
                                >
                                    {{ viewManager.currentConfig.value.leftLabel }}
                                </button>
                                <button
                                    :class="[
                                        'px-2.5 py-0.5 text-xs fraunces rounded-full transition-all cursor-pointer focus-ring',
                                        viewManager.mobilePaneIndex.value === 1
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                    @click="viewManager.mobilePaneIndex.value = 1"
                                >
                                    {{ viewManager.currentConfig.value.rightLabel }}
                                </button>
                            </div>
                        </template>

                        <!-- Mobile overflow menu -->
                        <div class="dock-separator lg:hidden"></div>
                        <MobileMenuDropdown
                            v-model:open="mobileMenuOpen"
                            :css-color-opaque="cssColorOpaque"
                            :link-copied="linkCopied"
                            @share-link="emit('shareLink')"
                            @start-slug-edit="onStartSlugEdit()"
                            @copy-slug="onCopySlug()"
                        />

                        <!-- Desktop profile + @mbabb -->
                        <ProfileSection
                            v-model:profile-menu-open="profileMenuOpen"
                            v-model:mbabb-menu-open="mbabbMenuOpen"
                            :css-color-opaque="cssColorOpaque"
                            :link-copied="linkCopied"
                            @share-link="emit('shareLink')"
                            @start-slug-edit="onStartSlugEdit()"
                            @copy-slug="onCopySlug()"
                        />
                    </div>
                </div><!-- /dock-layer-grid -->

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
                        :style="{ color: cssColorOpaque }"
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
