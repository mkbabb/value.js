<script setup lang="ts">
import { computed, inject, ref, watch, useTemplateRef } from "vue";
import { Check, Undo2, ArrowLeft, Paintbrush } from "@lucide/vue";
import { GlassDock, DockLayerGroup, DockLayer } from ".";
import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import ActionBarToggle from "./ActionBarToggle.vue";
import ActionBarLayer from "./layers/ActionBarLayer.vue";
import GenericActionBar from "./layers/GenericActionBar.vue";
import SlugEditLayer from "./layers/SlugEditLayer.vue";
import MobileMenuDropdown from "./menus/MobileMenuDropdown.vue";
import ProfileSection from "./menus/ProfileSection.vue";
import DockViewSelect from "./DockViewSelect.vue";
import DockStatusLamp from "./DockStatusLamp.vue";
import PaneSegmentedControl from "@components/custom/panes/PaneSegmentedControl.vue";
import { useMediaQuery } from "@vueuse/core";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "@composables/color/keys";
import { usePopupMutex } from "./composables/usePopupMutex";
import { useDockAdminMode } from "./composables/useDockAdminMode";
import type { ActionBarContext } from "@composables/color/keys";
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

// The Tools trigger + its S.W7-6 boot-flicker / W6-8 T-29 settle-stamp slot
// machine live in the colocated <ActionBarToggle> (the W6-8 PP-8 cap lift —
// full rationale in that SFC's header).
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
    <!-- T.W6 · T-31 (THE DOCK-ATOP BAND LAW): the dock renders IN-FLOW inside
         the shell's dock band (App.vue's <nav class="dock-band">, row 1 of the
         two-band grid). The former fixed overlay
         (`fixed top-dock-inset inset-x-0 z-dock` + the pointer-events
         none/auto pair) RETIRED WITH the --dock-total reservation: the band
         is structure the layout owns, so the dock needs no pin, no z, and no
         hit-test punch-through. -->
    <div
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
                        <!-- W6-8 register pass: native `title` retired dock-wide —
                             icon-only controls carry aria-label (the UA tooltip slab
                             is a foreign register on the liquid-glass dock). -->
                        <DockIconButton aria-label="Save edit" @click="emit('commitEdit')"><Check class="w-5 h-5" :style="{ color: safeAccent }" /></DockIconButton>
                        <DockIconButton aria-label="Cancel edit" @click="emit('cancelEdit')"><Undo2 class="w-5 h-5" /></DockIconButton>
                    </DockLayer>

                    <!-- Slug edit layer -->
                    <DockLayer id="slug-edit" class="justify-center">
                        <SlugEditLayer ref="slugEditRef" v-model:active="slugEditMode" />
                    </DockLayer>

                    <!-- Action bar layer -->
                    <DockLayer v-if="hasAnyActionBar" id="action-bar">
                        <DockIconButton class="shrink-0" aria-label="Back" @click="actionBarLayerActive = false"><ArrowLeft class="w-6 h-6" /></DockIconButton>
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

                        <!-- Action bar toggle — S.W7-2: the separator and the
                             trailing chevron are desktop furniture; below sm the
                             aperture (312px at 390w) holds controls only. The
                             slot machine + T-29/T-36 register live in the
                             colocated SFC (the W6-8 PP-8 cap lift). -->
                        <ActionBarToggle
                            :visible="hasAnyActionBar"
                            :active="actionBarLayerActive"
                            :is-desktop="isDesktop"
                            :icon="genericBar?.icon ?? Paintbrush"
                            :label="genericBar?.label ?? 'Tools'"
                            :accent="genericBar?.accentColor ?? safeAccent"
                            @toggle="toggleActionBar"
                        />

                        <!-- Mobile pane toggle — Ae-5: PaneSegmentedControl owns this control (one owner).
                             S.W7-2: the mobile separator PAIR is dropped (four vertical bars
                             in a 312px aperture was furniture crowding the ⋮ trigger out of
                             the pill — design-dock-shell P0-2); the control compacts at its
                             own root below sm. -->
                        <div v-if="viewManager.currentConfig.value.right !== null" class="dock-mobile-panes">
                            <PaneSegmentedControl
                                :model-value="viewManager.mobilePaneIndex.value"
                                :left-label="viewManager.currentConfig.value.leftLabel ?? ''"
                                :right-label="viewManager.currentConfig.value.rightLabel ?? ''"
                                @update:model-value="(v) => viewManager.mobilePaneIndex.value = v"
                            />
                        </div>

                        <!-- Mobile overflow menu -->
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

                <!-- Collapsed state — the WAX SEAL (S.W7 W7-1 / S-8; die-rim
                     ABROGATED T.W6 · W6-7, Q12 + T-28): the WatercolorDot in
                     the LIVE color fills the producer's collapsed circle (the
                     wax speaks live — the dot IS the accent; T-37: the wax
                     now fills the WHOLE seal, no rim standoff — the palette
                     swatch reads at full size on the collapsed dock);

                     T.W8 · P9-R3/T-37 — THE DERIVE-SEAM GUARANTEE (the swatch
                     READS against its own derived field): the wax is the live
                     seed and the atmosphere FIELD behind it is DERIVED from the
                     SAME seed, so at collision seeds (the owner's brick: wax↔
                     field ΔL 0.004 / 1.03:1) the swatch vanished into the field,
                     carried only by the producer glass halo (which dissolves
                     over light fields — §6.4 self-camouflage). The guarantee is
                     MATERIAL, in the atmosphere derive path
                     (useAtmosphere `DERIVE_SEAM_FLOOR` — the field's mean L
                     never lands within the floor of the wax L), NEVER a ring or
                     rim here (Q12/O-15a stand). The seal owns no legibility
                     code — the field steps off the wax by construction; the
                     current view's icon is INKED over it in `--seal-ink`
                     (WCAG-derived from the wax — never `--accent-view`),
                     swapping on the morph family keyed by view: the old
                     impression lifts off, the next stamp presses in.

                     THE REGISTER LAW (T-28, encoded): a selection/state ring
                     on a WatercolorDot rides the dot's OWN silhouette +
                     filter (the P5 producer solid-ring register) or does not
                     exist — a geometric hairline over the seeded organic
                     edge both crosses and gaps it by construction (the
                     t-outline forensic: ~+1.5px cross / ~−2.5px gap per
                     seed). The W7-1 continuity clause re-carries on the
                     GLYPH: the same view icon exists at both morph endpoints
                     (seal ink ↔ trigger icon, both on the vj-morph family) —
                     a stronger continuity read than a 1px rim; the expanded
                     trigger's `--dock-ring` (a geometric ring on a geometric
                     control — sound) arrives WITH the expansion morph. Admin
                     identity stays on the INK (gold-shimmer-icon). NO text,
                     NO chevron. MORPH LAW: the wax exits WITH the seal under
                     the producer's collapse↔expand cross-fade — no element
                     ever animates live→view-hue. -->
                <template #collapsed>
                    <div class="dock-seal">
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

    <!-- T.W6 · W6-6 (T-9 re-home): the dock STATUS LAMP — band chrome,
         absolutely seated at the band's inline-end (the .dock-band is the
         positioning context) so it is visible at FIRST PAINT in every dock
         state (expanded, collapsed, mid-morph) and never rides a
         collapsible layer. Dev-gated; variant matrix in status-lamp.ts
         (O-22). -->
    <DockStatusLamp />
</template>

<style scoped>
@reference "../../../styles/style.css";

/* The B3 settle beat — the vj-settle keyframe lives in animations.css
   (keyframes are global); the class is dock-local. */
.dock-settle {
    animation: vj-settle var(--spring-snappy-duration) var(--spring-snappy);
}

/* The action-bar toggle slot machine (S.W7-6 boot seat · W6-8 T-29 settle
   release · T-36 true-button box-model) lives in the colocated
   ActionBarToggle.vue (the W6-8 PP-8 cap lift). */

/* ── The wax seal (S.W7 W7-1; die-rim ABROGATED T.W6 · W6-7, Q12/T-28) ──
   The collapsed dock IS the seal: wax (WatercolorDot, live color) filling
   the producer's collapsed circle (glass-ui pins the summary pane square,
   aspect-ratio 1 — density.css/morph.css) and the view icon inked over
   it. The seal speaks with TWO voices — the wax IS the live color
   (identity by material) and the inked glyph IS the view (identity by
   impression); the third concentric boundary (the 1px --accent-view
   die-rim + its gold admin override) was over-drawing at 40px and the
   only voice that could never fit the seeded organic edge — it DIED with
   its 2px standoff padding (T-37: the wax gains the whole circle; the
   underlying palette swatch finally reads at size). NO border may return
   here: the O-15a negative watch asserts computed border-style none (the
   resurrection guard); a future fitted ring is the P5 producer solid-ring
   register on the wax itself, never a geometric parent circle. The seal
   is a FIXED-INTRINSIC-SIZE composition (block 100% / aspect 1): the
   collapsed morph endpoint stays VIEW-INVARIANT — no per-view text
   width, nothing to re-measure, nothing to clip (the P0-1 "Ho" cure). All
   motion is transform/opacity-only: the producer's compositor
   expand↔collapse morph outside, the vj-morph stamp swap inside; PRM
   degrades the swap to a cross-fade via the existing two-tier guard. */
.dock-seal {
    block-size: 100%;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 9999px;
    /* The abrogation made literal (O-15a's negative watch reads this
       computed value): Tailwind's preflight stamps `border: 0 solid`
       app-wide, so an explicit none is the honest "the rim is DEAD and
       stays dead" declaration, not redundancy. */
    border: none;
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
