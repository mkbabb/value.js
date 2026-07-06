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
                        <!-- W7-4 (ONE dock voice): the view-select speaks the
                             gamut-guarded `--accent-view` tokens exclusively —
                             the live-accent props are gone (that voice stays
                             on Tools/Login, the app chrome). -->
                        <DockViewSelect
                            v-model:open="viewSelectOpen"
                            :current-view="viewManager.currentView.value"
                            :current-icon="viewManager.currentConfig.value.icon"
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

                <!-- Collapsed state — the WAX SEAL (S.W7 W7-1 / S-8): the
                     WatercolorDot in the LIVE color fills the producer's
                     collapsed circle (the wax speaks live — the dot IS the
                     accent); the current view's icon is INKED over it in
                     `--seal-ink` (the W7-4 resolver's 10th token, WCAG-derived
                     from the wax — never `--accent-view`), swapping on the
                     morph family keyed by view: the old impression lifts off,
                     the next stamp presses in. The hairline die-rim adopts
                     `--accent-view` — the continuity carrier designed to grow
                     into the expanded trigger's ring (W7-4's `--dock-ring`
                     seam). NO text, NO chevron; gold rim + gold ink under
                     admin. MORPH LAW: the wax exits WITH the seal under the
                     producer's collapse↔expand cross-fade — no element ever
                     animates live→view-hue. -->
                <template #collapsed>
                    <div class="dock-seal" :class="{ 'dock-seal--admin': isAdminMode }">
                        <WatercolorDot :color="cssColorOpaque" tag="div" class="dock-seal-wax" seed="top-dock">
                            <Transition name="vj-morph" mode="out-in">
                                <component
                                    :is="viewManager.currentConfig.value.icon"
                                    :key="viewManager.currentView.value"
                                    class="dock-seal-ink"
                                    :class="isAdminMode && 'gold-shimmer-icon'"
                                    style="--vj-morph-scale: 1.25; --vj-morph-y: 0px"
                                />
                            </Transition>
                        </WatercolorDot>
                    </div>
                </template>
            </GlassDock>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

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

/* ── The wax seal (S.W7 W7-1) ────────────────────────────────────────────
   The collapsed dock IS the seal: wax (WatercolorDot, live color) filling
   the producer's collapsed circle (glass-ui pins the summary pane square,
   aspect-ratio 1 — density.css/morph.css), the view icon inked over it,
   and a hairline circular die-rim in --accent-view (the continuity
   carrier the expanded trigger's --dock-ring seam adopts under W7-4). The
   seal is a FIXED-INTRINSIC-SIZE composition (block 100% / aspect 1): the
   collapsed morph endpoint becomes VIEW-INVARIANT — no per-view text
   width, nothing to re-measure, nothing to clip (the P0-1 "Ho" cure). All
   motion is transform/opacity-only: the producer's compositor
   expand↔collapse morph outside, the vj-morph stamp swap inside; PRM
   degrades the swap to a cross-fade via the existing two-tier guard. */
.dock-seal {
    block-size: 100%;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    padding: 2px;
    border-radius: 9999px;
    border: 1px solid color-mix(in oklab, var(--accent-view) 60%, transparent);
}
.dock-seal--admin {
    border-color: color-mix(in oklab, var(--color-gold) 75%, transparent);
}
.dock-seal-wax {
    inline-size: 100%;
    block-size: 100%;
    display: grid;
    place-items: center;
    /* The ink regime: the wax sets the icon's INHERITED ink — the ONE
       `--seal-ink` token useViewAccents resolves from the wax color via the
       library's WCAG contrast-color leaf (the SEEDS.md w7 rider, absorbed at
       W7-4; no CSS lightness literal). Icon-in-slot means the host's
       watercolor filter displaces wax+ink as one object; setting the color
       on the WAX (inherited by the icon) lets the admin gold-shimmer-icon
       class (direct color) win without a specificity fight. */
    color: var(--seal-ink, var(--foreground));
}
.dock-seal-ink {
    inline-size: 55%;
    block-size: 55%;
}
</style>
