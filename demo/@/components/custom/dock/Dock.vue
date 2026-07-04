<script setup lang="ts">
import { computed, inject, ref, watch, useTemplateRef } from "vue";
import { ChevronDown, Check, Undo2, ArrowLeft, Paintbrush } from "@lucide/vue";
import { GlassDock, DockLayerGroup, DockLayer } from ".";
import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import ActionBarLayer from "./layers/ActionBarLayer.vue";
import GenericActionBar from "./layers/GenericActionBar.vue";
import SlugEditLayer from "./layers/SlugEditLayer.vue";
import MobileMenuDropdown from "./menus/MobileMenuDropdown.vue";
import ProfileSection from "./menus/ProfileSection.vue";
import DockViewSelect from "./DockViewSelect.vue";
import PaneSegmentedControl from "@components/custom/panes/PaneSegmentedControl.vue";
import { useMediaQuery } from "@vueuse/core";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import { usePopupMutex } from "./composables/usePopupMutex";
import { useDockAdminMode } from "./composables/useDockAdminMode";
import type { ActionBarContext } from "@components/custom/color-picker/keys";
import type { EditTarget } from "@components/custom/color-picker";
import type { DockActionBar } from "@composables/usePaneRouter";

const {
    linkCopied,
    editTarget,
    actionBar: actionBarProp,
    genericActionBar,
} = defineProps<{ linkCopied: boolean; editTarget: EditTarget | null; actionBar?: ActionBarContext | null; genericActionBar?: DockActionBar | null }>();
const emit = defineEmits<{ shareLink: []; commitEdit: []; cancelEdit: [] }>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const safeAccent = inject(SAFE_ACCENT_KEY)!;
const viewManager = inject(VIEW_MANAGER_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const actionBar = computed(() => actionBarProp ?? null);
const genericBar = computed(() => genericActionBar ?? null);
const hasAnyActionBar = computed(() => !!actionBar.value || !!genericBar.value);

// ── Admin mode (composable owns isAdminMode, viewEntries, watchers) ──
const { isAdminMode, viewEntries, onViewChange } = useDockAdminMode({ viewManager, isAdminAuthenticated: pm.isAdminAuthenticated });

// ── Action bar layer ──
const actionBarLayerActive = ref(false);
function toggleActionBar() { actionBarLayerActive.value = !actionBarLayerActive.value; }
watch(hasAnyActionBar, (has) => { if (!has) actionBarLayerActive.value = false; });
// gate (b): watchers that reach dockRef stay in the SFC
watch(actionBarLayerActive, (active) => { if (active) dockRef.value?.keepOpen(); else dockRef.value?.release(); });
function onActionBarOpenPalette() { viewManager.switchView(viewManager.currentView.value === "palettes" ? "picker" : "palettes"); }
function onActionBarOpenExtract() { viewManager.switchView(viewManager.currentView.value === "extract" ? "picker" : "extract"); }

// ── Slug edit ──
const slugEditMode = ref(false);
const slugEditRef = ref<InstanceType<typeof SlugEditLayer> | null>(null);
function onStartSlugEdit() { slugEditRef.value?.onStartSlugEdit(); }
function onCopySlug() { slugEditRef.value?.onCopySlug(); }

// ── Dock popup mutex — called EXACTLY ONCE (gate (a)) ──
const { isAnyOpen, popupModel } = usePopupMutex<"view-select" | "mobile-menu" | "profile-menu" | "mbabb-menu">();
const viewSelectOpen = popupModel("view-select");
const mobileMenuOpen = popupModel("mobile-menu");
const profileMenuOpen = popupModel("profile-menu");
const mbabbMenuOpen = popupModel("mbabb-menu");

const isDesktop = useMediaQuery("(min-width: 1024px)");
const mobileEditActive = computed(() => !isDesktop.value && !!editTarget);
const anyEditActive = computed(() => !!editTarget);
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>('dockRef');

watch(() => dockRef.value?.expanded, (expanded) => { if (!expanded && slugEditMode.value) slugEditMode.value = false; });
watch(anyEditActive, (active) => { if (active) { dockRef.value?.keepOpen(); dockRef.value?.expand?.(); } else dockRef.value?.release(); });
watch(isAnyOpen, (open) => { if (open) dockRef.value?.keepOpen(); else dockRef.value?.release(); });

// ── Layer dispatch (inlined from the retired useDockLayers — gate (c): the
//    immediate watch reads live reactive deps, so call order does not matter) ──
const activeLayer = ref("main");

// ── The view-select moment (R.W4 Lane B / B3) — within the CURRENT dock
//    surface only (the dock-morph gate rides the U6 BOOK, not this wave):
//    a one-shot morph-family settle (vj-settle keyframe, snappy spring) on
//    the dock body confirms every view switch. The rAF re-arm lets rapid
//    switches restart the beat; @animationend clears it. ──
const dockSettle = ref(false);
watch(
    () => viewManager.currentView.value,
    () => {
        dockSettle.value = false;
        requestAnimationFrame(() => { dockSettle.value = true; });
    },
);
watch(
    [mobileEditActive, slugEditMode, actionBarLayerActive],
    () => {
        if (mobileEditActive.value) activeLayer.value = "mobile-edit";
        else if (slugEditMode.value) activeLayer.value = "slug-edit";
        else if (actionBarLayerActive.value) activeLayer.value = "action-bar";
        else activeLayer.value = "main";
    },
    { immediate: true },
);
</script>

<template>
    <div class="fixed top-dock-inset inset-x-0 z-dock flex items-center justify-center pointer-events-none">
        <div
            class="pointer-events-auto"
            :class="dockSettle && 'dock-settle'"
            @animationend.self="dockSettle = false"
        >
            <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="false" :fit-content="true" :always-expanded="!isDesktop">
                <DockLayerGroup v-model:active="activeLayer" :show-rail="false">
                    <!-- Mobile edit layer -->
                    <DockLayer id="mobile-edit" class="justify-center">
                        <WatercolorDot v-if="editTarget" :color="editTarget.originalCss" tag="div" class="w-7 h-7 shrink-0 opacity-50" seed="edit-original" />
                        <span class="text-muted-foreground text-caption">&rarr;</span>
                        <WatercolorDot :color="cssColorOpaque" tag="div" class="w-7 h-7 shrink-0" seed="edit-new" />
                        <DockSeparator />
                        <DockIconButton title="Save edit" @click="emit('commitEdit')"><Check class="w-5 h-5" :style="{ color: safeAccent }" /></DockIconButton>
                        <DockIconButton title="Cancel edit" @click="emit('cancelEdit')"><Undo2 class="w-5 h-5" /></DockIconButton>
                    </DockLayer>

                    <!-- Slug edit layer -->
                    <DockLayer id="slug-edit" class="justify-center">
                        <SlugEditLayer ref="slugEditRef" v-model:active="slugEditMode" />
                    </DockLayer>

                    <!-- Action bar layer -->
                    <DockLayer v-if="hasAnyActionBar" id="action-bar">
                        <DockIconButton class="shrink-0" title="Back" @click="actionBarLayerActive = false"><ArrowLeft class="w-6 h-6" /></DockIconButton>
                        <DockSeparator />
                        <ActionBarLayer v-if="actionBar" :action-bar="actionBar" :edit-target="editTarget" @open-palette="onActionBarOpenPalette" @open-extract="onActionBarOpenExtract" />
                        <GenericActionBar v-else-if="genericBar" :actions="genericBar.actions.value" :accent-color="genericBar.accentColor ?? safeAccent" />
                    </DockLayer>

                    <!-- Main navigation layer (inlined — was the passthrough DockMainLayer.vue) -->
                    <DockLayer id="main">
                        <!-- View selector — gate (a): viewSelectOpen comes from the single mutex above -->
                        <DockViewSelect
                            v-model:open="viewSelectOpen"
                            :current-view="viewManager.currentView.value"
                            :current-icon="viewManager.currentConfig.value.icon"
                            :safe-accent="safeAccent"
                            :css-color-opaque="cssColorOpaque"
                            :is-admin-mode="isAdminMode"
                            :is-desktop="isDesktop"
                            :view-entries="viewEntries"
                            @update:model-value="onViewChange"
                        />

                        <!-- Action bar toggle -->
                        <DockSeparator v-if="hasAnyActionBar" />
                        <div class="action-bar-toggle-slot" :class="{ 'is-visible': hasAnyActionBar }">
                            <div class="action-bar-toggle-inner">
                                <DockIconButton
                                    compact
                                    :class="{ 'is-active': actionBarLayerActive }"
                                    title="Action bar"
                                    aria-label="Toggle action bar"
                                    :aria-pressed="actionBarLayerActive"
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
                                </DockIconButton>
                            </div>
                        </div>

                        <!-- Mobile pane toggle — Ae-5: PaneSegmentedControl owns this control (one owner) -->
                        <template v-if="viewManager.currentConfig.value.right !== null">
                            <DockSeparator class="lg:hidden" />
                            <div class="lg:hidden">
                                <PaneSegmentedControl
                                    :model-value="viewManager.mobilePaneIndex.value"
                                    :left-label="viewManager.currentConfig.value.leftLabel ?? ''"
                                    :right-label="viewManager.currentConfig.value.rightLabel ?? ''"
                                    @update:model-value="(v) => viewManager.mobilePaneIndex.value = v"
                                />
                            </div>
                        </template>

                        <!-- Mobile overflow menu -->
                        <DockSeparator class="lg:hidden" />
                        <MobileMenuDropdown
                            v-model:open="mobileMenuOpen"
                            :css-color-opaque="safeAccent"
                            :link-copied="linkCopied"
                            @share-link="emit('shareLink')"
                            @start-slug-edit="onStartSlugEdit"
                            @copy-slug="onCopySlug"
                        />

                        <!-- Desktop profile + @mbabb -->
                        <ProfileSection
                            v-model:profile-menu-open="profileMenuOpen"
                            v-model:mbabb-menu-open="mbabbMenuOpen"
                            :css-color-opaque="safeAccent"
                            :link-copied="linkCopied"
                            @share-link="emit('shareLink')"
                            @start-slug-edit="onStartSlugEdit"
                            @copy-slug="onCopySlug"
                        />
                    </DockLayer>
                </DockLayerGroup>

                <!-- Collapsed state — the icon+label pair swaps on the morph
                     family, keyed by view (B3); the icon reads the per-view
                     accent (B2). -->
                <template #collapsed>
                    <WatercolorDot :color="cssColorOpaque" tag="div" class="w-6 h-6 shrink-0" seed="top-dock" />
                    <Transition name="vj-morph" mode="out-in">
                        <span
                            :key="viewManager.currentView.value"
                            class="inline-flex items-center gap-1.5 min-w-0"
                            style="--vj-morph-scale: 0.8; --vj-morph-y: 0px"
                        >
                            <component :is="viewManager.currentConfig.value.icon" class="w-5 h-5 shrink-0 sm:hidden" :style="{ color: 'var(--accent-view)' }" />
                            <span class="text-base font-display text-foreground whitespace-nowrap hidden sm:inline">{{ viewManager.currentConfig.value.label }}</span>
                        </span>
                    </Transition>
                    <ChevronDown class="w-3 h-3 text-muted-foreground shrink-0" />
                </template>
            </GlassDock>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";
.gold-shimmer-icon { color: var(--color-gold); filter: drop-shadow(0 0 2px color-mix(in srgb, var(--color-gold) 30%, transparent)); }

/* The B3 settle beat — the vj-settle keyframe lives in animations.css
   (keyframes are global); the class is dock-local. */
.dock-settle {
    animation: vj-settle var(--spring-snappy-duration) var(--spring-snappy);
}

/* Action-bar toggle slot: animates between 0 and content width via the
   grid-template-columns 0fr → 1fr pattern (no max-width clipping).
   Merged in from the retired DockMainLayer.vue. */
.action-bar-toggle-slot {
    display: grid;
    grid-template-columns: 0fr;
    opacity: 0;
    transition:
        grid-template-columns var(--duration-normal) var(--ease-standard),
        opacity var(--duration-normal) var(--ease-standard);
}

.action-bar-toggle-slot.is-visible {
    grid-template-columns: 1fr;
    opacity: 1;
}

.action-bar-toggle-inner {
    overflow: hidden;
    min-width: 0;
    display: flex;
    align-items: center;
}
</style>
