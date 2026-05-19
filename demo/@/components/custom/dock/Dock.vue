<script setup lang="ts">
import { computed, inject, ref, watch, useTemplateRef } from "vue";
import { ChevronDown, Check, Undo2, ArrowLeft } from "lucide-vue-next";
import { GlassDock, DockLayerGroup, DockLayer } from ".";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import ActionBarLayer from "./layers/ActionBarLayer.vue";
import GenericActionBar from "./layers/GenericActionBar.vue";
import SlugEditLayer from "./layers/SlugEditLayer.vue";
import DockMainLayer from "./DockMainLayer.vue";
import { useMediaQuery } from "@vueuse/core";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import { usePopupMutex } from "./composables/usePopupMutex";
import { useDockAdminMode } from "./composables/useDockAdminMode";
import { useDockLayers } from "./composables/useDockLayers";
import type { ActionBarContext } from "@components/custom/color-picker/keys";
import type { EditTarget } from "@components/custom/color-picker";
import type { DockActionBar } from "./composables/useDockActionBar";

const props = defineProps<{ linkCopied: boolean; editTarget: EditTarget | null; actionBar?: ActionBarContext | null; genericActionBar?: DockActionBar | null }>();
const emit = defineEmits<{ shareLink: []; commitEdit: []; cancelEdit: [] }>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const safeAccent = inject(SAFE_ACCENT_KEY)!;
const viewManager = inject(VIEW_MANAGER_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const actionBar = computed(() => props.actionBar ?? null);
const genericBar = computed(() => props.genericActionBar ?? null);
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
const mobileEditActive = computed(() => !isDesktop.value && !!props.editTarget);
const anyEditActive = computed(() => !!props.editTarget);
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>('dockRef');

watch(() => dockRef.value?.expanded, (expanded) => { if (!expanded && slugEditMode.value) slugEditMode.value = false; });
watch(anyEditActive, (active) => { if (active) { dockRef.value?.keepOpen(); dockRef.value?.expand?.(); } else dockRef.value?.release(); });
watch(isAnyOpen, (open) => { if (open) dockRef.value?.keepOpen(); else dockRef.value?.release(); });

// ── Layer dispatch — gate (c): deps are reactive refs/computeds, call order pins the immediate run ──
const { activeLayer } = useDockLayers({ mobileEditActive, slugEditMode, actionBarLayerActive });
</script>

<template>
    <div class="fixed top-[var(--dock-inset)] inset-x-0 z-[var(--z-dock)] flex items-center justify-center pointer-events-none">
        <div class="pointer-events-auto">
            <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="isDesktop" :fit-content="true" :always-expanded="!isDesktop">
                <DockLayerGroup v-model:active="activeLayer" :show-rail="false">
                    <!-- Mobile edit layer -->
                    <DockLayer id="mobile-edit" class="justify-center">
                        <WatercolorDot v-if="editTarget" :color="editTarget.originalCss" tag="div" class="w-7 h-7 shrink-0 opacity-50" seed="edit-original" />
                        <span class="text-muted-foreground text-caption">&rarr;</span>
                        <WatercolorDot :color="cssColorOpaque" tag="div" class="w-7 h-7 shrink-0" seed="edit-new" />
                        <div class="dock-separator"></div>
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
                        <div class="dock-separator"></div>
                        <ActionBarLayer v-if="actionBar" :action-bar="actionBar" :edit-target="editTarget" @open-palette="onActionBarOpenPalette" @open-extract="onActionBarOpenExtract" />
                        <GenericActionBar v-else-if="genericBar" :actions="genericBar.actions.value" :accent-color="genericBar.accentColor ?? safeAccent" />
                    </DockLayer>

                    <!-- Main navigation layer (delegated to DockMainLayer) -->
                    <DockMainLayer
                        v-model:view-select-open="viewSelectOpen" v-model:mobile-menu-open="mobileMenuOpen"
                        v-model:profile-menu-open="profileMenuOpen" v-model:mbabb-menu-open="mbabbMenuOpen"
                        :current-view="viewManager.currentView.value" :current-icon="viewManager.currentConfig.value.icon"
                        :is-admin-mode="isAdminMode" :is-desktop="isDesktop" :view-entries="viewEntries"
                        :has-any-action-bar="hasAnyActionBar" :action-bar-layer-active="actionBarLayerActive"
                        :generic-bar="genericBar" :link-copied="linkCopied"
                        @view-change="onViewChange" @toggle-action-bar="toggleActionBar"
                        @start-slug-edit="onStartSlugEdit" @copy-slug="onCopySlug" @share-link="emit('shareLink')"
                    />
                </DockLayerGroup>

                <!-- Collapsed state -->
                <template #collapsed>
                    <WatercolorDot :color="cssColorOpaque" tag="div" class="w-6 h-6 shrink-0" seed="top-dock" />
                    <component :is="viewManager.currentConfig.value.icon" class="w-5 h-5 shrink-0 sm:hidden" :style="{ color: safeAccent }" />
                    <span class="text-base font-display text-foreground whitespace-nowrap hidden sm:inline">{{ viewManager.currentConfig.value.label }}</span>
                    <ChevronDown class="w-3 h-3 text-muted-foreground shrink-0" />
                </template>
            </GlassDock>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";
.gold-shimmer-icon { color: var(--color-gold); filter: drop-shadow(0 0 2px color-mix(in srgb, var(--color-gold) 30%, transparent)); }
</style>
