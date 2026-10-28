<script setup lang="ts">
import { computed, inject, ref, watch, useTemplateRef } from "vue";
import { Check, Undo2, ArrowLeft, Paintbrush } from "@lucide/vue";
import {
    GlassDock,
    DockLayerGroup,
    DockLayer,
    DockControl,
    DockSeparator,
} from "@mkbabb/glass-ui/dock";
import { WatercolorDot } from "../../shared/ui/watercolor-dot";
import ActionBarToggle from "./ActionBarToggle.vue";
import ActionBarLayer from "./layers/ActionBarLayer.vue";
import SlugEditLayer from "./layers/SlugEditLayer.vue";
import MobileMenuDropdown from "./menus/MobileMenuDropdown.vue";
import ProfileSection from "./menus/ProfileSection.vue";
import DockViewSelect from "./DockViewSelect.vue";
import ApiStatusChip from "../../shared/ui/api-status/ApiStatusChip.vue";
import { useMediaQuery, useMutationObserver } from "@vueuse/core";
import { VIEW_MANAGER_KEY } from "../useViewManager";
import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { usePopupMutex } from "../../shared/usePopupMutex";
import { useDockAdminMode } from "./composables/useDockAdminMode";
import { injectDockCommands } from "../useSceneActions";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { goldIdentityCss, useChromeAccentFn } from "../../color-session/useContrastSafeColor";
import { GRAPHICS_CONTRAST_FLOOR, TEXT_CONTRAST_FLOOR } from "../../color-session/ink";
import type { EditTarget } from "../../color-session/color-model";

const { linkCopied, editTarget } = defineProps<{
    linkCopied: boolean;
    editTarget: EditTarget | null;
}>();
const emit = defineEmits<{ shareLink: []; commitEdit: []; cancelEdit: [] }>();

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const safeAccent = inject(SAFE_ACCENT_KEY)!;
const viewManager = inject(VIEW_MANAGER_KEY)!;
const pm = inject(SESSION_PORT_KEY)!;

// X-W4 · CC-043 — ONE action contract, ONE render path. The predecessor held
// two props and chose between them in the template with `v-if="actionBar"` /
// `v-else-if="genericBar"`, so the picker's bar suppressed the per-view bar on
// every view where both existed (`VIEW_MAP.mix`). The Dock no longer chooses:
// the contract already named the scene, and the Dock renders it.
//
// X.W8.dc (COHESION §0k.3 S-1): the set is INJECTED from the shell's one
// `DockCommand` registry, not carried down from App as an optional prop. This
// Dock is the seat at every width — desktop and mobile are one seat — so the
// Regenerate a phone presses runs the very `state.run` a desktop runs.
const actionSet = injectDockCommands();
const hasAnyActionBar = computed(() => actionSet.value !== null);

// ── Admin mode (composable owns isAdminMode, viewEntries, watchers) ──
const { isAdminMode, viewEntries, onViewChange } = useDockAdminMode({
    viewManager,
    isAdminAuthenticated: pm.isAdminAuthenticated,
});

// ── Action bar layer ──
const actionBarLayerActive = ref(false);
function toggleActionBar() {
    actionBarLayerActive.value = !actionBarLayerActive.value;
}
watch(hasAnyActionBar, (has) => {
    if (!has) actionBarLayerActive.value = false;
});

// The Tools trigger + its S.W7-6 boot-flicker / W6-8 T-29 settle-stamp slot
// machine live in the colocated <ActionBarToggle> (the W6-8 PP-8 cap lift —
// full rationale in that SFC's header). The dock open/close hold this layer
// used to drive imperatively is now one declarative predicate below (U-F48).
//
// X-W4 · CC-043: the two view-switch handlers the action bar used to emit back
// up to (`openPalette` / `openExtract`) went INTO the contract, where the rest
// of the color scene's actions already live — the bar no longer speaks a
// private dialect to its own parent.

// ── Slug edit ──
const slugEditMode = ref(false);
const slugEditRef = ref<InstanceType<typeof SlugEditLayer> | null>(null);
function onStartSlugEdit() {
    slugEditRef.value?.onStartSlugEdit();
}
function onCopySlug() {
    slugEditRef.value?.onCopySlug();
}

// ── Dock popup mutex — called EXACTLY ONCE (gate (a)) ──
const { isAnyOpen, popupModel } = usePopupMutex<
    "view-select" | "mobile-menu" | "profile-menu" | "mbabb-menu"
>();
const viewSelectOpen = popupModel("view-select");
const mobileMenuOpen = popupModel("mobile-menu");
const profileMenuOpen = popupModel("profile-menu");
const mbabbMenuOpen = popupModel("mbabb-menu");

const isDesktop = useMediaQuery("(min-width: 1024px)");
const mobileEditActive = computed(() => !isDesktop.value && !!editTarget);
const anyEditActive = computed(() => !!editTarget);
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
// SS-8 Z-Dock-13 (Dock G-P): the dock floats over the atmosphere field, so its
// live backdrop sampler reads that canvas (App.vue stamps it with glass's
// `data-glass-field-canvas` convention). Unbound, GlassDock hands its sampler a
// getter that answers null, and the sample sat at `source-unavailable`.
const fieldCanvas = () =>
    document.querySelector<HTMLCanvasElement>("canvas[data-glass-field-canvas]");

// X-DS pass 17 (V17C-01): the admin gold, certified on the dock BAND it sits
// on (the band's measured tint over the ambient, the same instrument the
// profile trigger's live ink uses). It rebinds `--ink-gold` for the dock's
// subtree, so every `.gold-ink` here (the view trigger, the admin trigger,
// the crown) reads the band's gold: raw gold read 1.09:1 on the light band.
const dockHost = useTemplateRef<HTMLElement>("dockHost");
const dockPlate = computed(() => dockHost.value?.querySelector(".dock-plate") ?? null);
// X-DS pass 18 (V18C-01): the gold holds its chroma (`certifyIdentityInk`):
// the word at the text floor, falling back to the band's plate ink where no
// gold clears it; the glyphs (the view icon, the admin shield, the crown) at
// the 3:1 graphics floor, as the seal already does. At the text floor plus
// the headroom, a mid-dark band drained the gold to white.
const {
    safeCss: bandSafeCss,
    identityCss: bandIdentityCss,
    plateCss: bandPlateCss,
} = useChromeAccentFn(dockPlate);
const { isDark } = useGlobalDark();
const bandGoldStyle = computed(() => {
    const gold = goldIdentityCss(isDark.value);
    const word = bandIdentityCss(gold, TEXT_CONTRAST_FLOOR);
    const glyph = bandIdentityCss(gold, GRAPHICS_CONTRAST_FLOOR);
    return word && glyph ? { "--ink-gold": word, "--ink-gold-glyph": glyph } : undefined;
});
// SS-8 B05 · 0132 (ABT-8): the Tools wordmark and glyph sit on the dock band, a
// floating rung, not the resting plate SAFE_ACCENT_KEY is certified against
// (light band: 4.23-4.81:1 measured, 3 of 6 seeds under 4.5). The band's own
// instrument certifies the accent at the text floor; before the band mounts the
// resting ink stands in.
const toolsInk = computed(
    () => bandSafeCss(safeAccent.value, TEXT_CONTRAST_FLOOR) ?? safeAccent.value,
);
// X-DS pass 19 (V19C-02): the dock's PLAIN words read the band's plate ink,
// the same instrument and scope as the gold above. glass seats its dock ink on
// `.glass-dock` itself (`--dock-fg-on-aurora` and `--muted-foreground` from
// `--foreground`, or `contrast-color(var(--card))`, a ground the band is not),
// so the rebinding rides GlassDock's root, through glass's own token seam: the
// words follow the band they sit on (the owner brown flips them to the light
// pole) and no glass rule is overridden.
const bandInkStyle = computed(() => {
    const ink = bandPlateCss();
    // SS-8 B05 · 0133 (ABT-11): the dock's focus ring is non-text ink on the
    // band, so it is certified there at the 3:1 graphics floor. The scoped rule
    // below paints it opaque: glass's 48 % mix of a resting-rung accent read
    // 2.08:1 on the light band, and no hue-holding ink clears 3:1 through it.
    const ring = bandSafeCss(safeAccent.value, GRAPHICS_CONTRAST_FLOOR);
    return ink && ring
        ? {
              "--foreground": ink,
              "--dock-fg-on-aurora": ink,
              "--muted-foreground": ink,
              "--focus-ring-color": ring,
          }
        : undefined;
});

watch(
    () => dockRef.value?.expanded,
    (expanded) => {
        if (!expanded && slugEditMode.value) slugEditMode.value = false;
    },
);

// ── The dock open/close HOLD — ONE declarative predicate (U-F48) ──
// The three scattered imperative keepOpen/release watchers (the action-bar
// layer, the edit-active hold, and the popup-mutex hold) collapse to a single
// disjunction: the dock is held open while ANY driver is live and releases when
// all fall. keepOpen/release are the producer's ref-counted holds (glass-ui
// useDockState) — the former per-flag holds each contributed +1 while their
// flag was true; this ONE balanced +1/−1 pair per predicate edge is
// behaviour-equivalent for the open/close decision (held ⇔ any flag true).
const shouldKeepOpen = computed(
    () => actionBarLayerActive.value || anyEditActive.value || isAnyOpen.value,
);
watch(shouldKeepOpen, (open) => {
    if (open) dockRef.value?.keepOpen();
    else dockRef.value?.release();
});
// The expand-on-edit is a DISTINCT concern (not the open/close hold) — its own watch.
watch(anyEditActive, (active) => {
    if (active) dockRef.value?.expand?.();
});

// ── Layer dispatch (inlined from the retired useDockLayers — gate (c): the
//    immediate watch reads live reactive deps, so call order does not matter) ──
const activeLayer = ref("main");

// ── The view-select moment (R.W4 Lane B / B3) — within the CURRENT dock
//    surface only (the dock-morph gate rides the U6 BOOK, not this wave):
//    a one-shot morph-family settle (vj-settle keyframe, snappy spring)
//    confirms every view switch. OD19-V2: the beat is seated on the view
//    glyph's carrier (the expanded trigger, the collapsed seal), never the
//    dock host, and it is ARMED only once `.glass-dock` has left glass's
//    `[data-morphing]` width morph, so the two never compound on one plate.
//    Glass's morph is only read (its attribute), never copied. The rAF
//    re-arm lets rapid switches restart the beat; @animationend clears it. ──
const dockSettle = ref(false);
let settlePending = false;
function armSettle() {
    if (!settlePending) return;
    if ((dockRef.value?.$el as HTMLElement | undefined)?.hasAttribute("data-morphing")) return;
    settlePending = false;
    dockSettle.value = true;
}
watch(
    () => viewManager.currentView.value,
    () => {
        dockSettle.value = false;
        settlePending = true;
        requestAnimationFrame(armSettle);
    },
);
useMutationObserver(() => dockRef.value?.$el as HTMLElement | undefined, armSettle, {
    attributeFilter: ["data-morphing"],
});
function onSettleEnd(e: AnimationEvent) {
    if (e.animationName === "vj-settle") dockSettle.value = false;
}
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
        ref="dockHost"
        :class="dockSettle && 'dock-settle'"
        :style="bandGoldStyle"
        @animationend="onSettleEnd"
    >
        <GlassDock
            ref="dockRef"
            :style="bandInkStyle"
            :background-canvas="fieldCanvas"
            :collapse="isDesktop ? 'open' : false"
            :fit-content="true"
        >
            <DockLayerGroup v-model:active="activeLayer" :show-switcher="false">
                <!-- Mobile edit layer -->
                <DockLayer id="mobile-edit" class="justify-center">
                    <WatercolorDot
                        v-if="editTarget"
                        :color="editTarget.originalCss"
                        class="w-7 h-7 shrink-0 opacity-50"
                        seed="edit-original"
                    />
                    <span class="text-muted-foreground text-caption">&rarr;</span>
                    <WatercolorDot
                        :color="cssColorOpaque"
                        class="w-7 h-7 shrink-0"
                        seed="edit-new"
                    />
                    <DockSeparator />
                    <!-- W6-8 register pass: native `title` retired dock-wide —
                             icon-only controls carry aria-label (the UA tooltip slab
                             is a foreign register on the liquid-glass dock). -->
                    <DockControl aria-label="Save edit" @click="emit('commitEdit')"
                        ><Check class="w-5 h-5" :style="{ color: safeAccent }"
                    /></DockControl>
                    <DockControl aria-label="Cancel edit" @click="emit('cancelEdit')"
                        ><Undo2 class="w-5 h-5"
                    /></DockControl>
                </DockLayer>

                <!-- Slug edit layer -->
                <DockLayer id="slug-edit" class="justify-center">
                    <SlugEditLayer ref="slugEditRef" v-model:active="slugEditMode" />
                </DockLayer>

                <!-- Action bar layer — ONE path, selected by the contract
                         (X-W4 · CC-043). Every scene renders through the same
                         layer and the same row; the scene the view owns is the
                         contract's answer, not a template priority. -->
                <DockLayer v-if="actionSet" id="action-bar">
                    <DockControl
                        class="shrink-0"
                        aria-label="Back"
                        @click="actionBarLayerActive = false"
                        ><ArrowLeft class="w-6 h-6"
                    /></DockControl>
                    <DockSeparator />
                    <ActionBarLayer :action-set="actionSet" />
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
                        :current-label="viewManager.currentConfig.value.label"
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
                        :icon="actionSet?.icon ?? Paintbrush"
                        :label="actionSet?.label ?? 'Tools'"
                        :accent="toolsInk"
                        @toggle="toggleActionBar"
                    />

                    <!-- X.W5.c · gate C4 — THE MOBILE PANE TOGGLE IS GONE, with
                             `PaneSegmentedControl.vue` (its sole render site) and with
                             the mobile pane index, the state it wrote. It existed to answer
                             "which of this view's two panes may the phone see"; both are
                             on screen now, so the control has nothing to switch.

                             Three of its shipped behaviours die with it, each a finding of
                             record: ⟨PSC-4⟩ `activation: automatic` on a two-option pill —
                             ARROWING through an announced button group silently destroyed
                             and rebuilt the page's main content per keypress; ⟨PSC-13⟩ the
                             governed panel carried no `id`, no `role="tabpanel"`, no
                             `aria-live`; ⟨PSC-9⟩ the always-expanded binding, keyed off
                             the dock's own desktop predicate, armed the
                             5s dock collapse exactly where this control was the only route
                             to the second pane. ⟨PSC-1⟩'s `semantics="tabs"` interim patch
                             is REFUSED and was not applied: it disarms the producer's own
                             drag hit-test (keyed on `[aria-pressed="true"]`) and turns nine
                             walk.spec assertions red — an interim that breaks two things to
                             half-fix one. The deletion is the cure. -->

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
                     identity stays on the INK (gold-ink). NO text,
                     NO chevron. MORPH LAW: the wax exits WITH the seal under
                     the producer's collapse↔expand cross-fade — no element
                     ever animates live→view-hue. -->
            <template #collapsed>
                <div class="dock-seal">
                    <!-- UIA-V-6: the ink is the wax's SIBLING, stacked over it in the
                         seal's one grid cell. The dot renders no slot (span > svg
                         filter host only), so the slotted icon never rendered and
                         the seal carried no view glyph and no admin gold. -->
                    <WatercolorDot
                        :color="cssColorOpaque"
                        class="dock-seal-wax"
                        seed="top-dock"
                    />
                    <Transition name="vj-morph" mode="out-in">
                        <component
                            :is="viewManager.currentConfig.value.icon"
                            :key="viewManager.currentView.value"
                            class="dock-seal-ink"
                            :class="isAdminMode && 'gold-ink'"
                            aria-hidden="true"
                            style="--vj-morph-scale: 1.25; --vj-morph-y: 0px"
                        />
                    </Transition>
                </div>
            </template>
        </GlassDock>
    </div>

    <!-- T.W6 · W6-6 (T-9 re-home): the dock STATUS LAMP — band chrome,
         absolutely seated at the band's inline-end (the .dock-band is the
         positioning context) so it is visible at FIRST PAINT in every dock
         state (expanded, collapsed, mid-morph) and never rides a
         collapsible layer. Dev-gated; variant matrix in
         shared/ui/api-status/api-status.ts (O-22; the one status chip,
         A2-VA-L1-9). -->
    <!-- SS-8 B06 · SS8-0162: the lamp sits on the same band as the dock's
         words, so it reads the same plate-certified band ink. -->
    <ApiStatusChip seat="dock" :style="bandInkStyle" />
</template>

<style scoped>
@reference "../../styles/foundation.css";

/* The B3 settle beat — the vj-settle keyframe lives in animations.css
   (keyframes are global); the class is dock-local. OD19-V2: the host only
   carries the state; the beat plays on the view glyph's carrier (the trigger
   expanded, the seal collapsed), so it never scales the plate glass morphs.
   `transform` here composes with the trigger's own press `scale`. */
.dock-settle :deep(.view-select-trigger),
.dock-settle .dock-seal {
    animation: vj-settle var(--spring-dock-duration) var(--spring-dock);
}

/* SS-8 B05 · 0133 (ABT-11): the dock's focus ring paints the band-certified
   `--focus-ring-color` (3:1, bandInkStyle) whole. glass seats each control's
   ring at a 48 % mix of that knob, which halves a certified ink back under the
   graphics floor on a light band; the re-seat rides glass's own
   `--dock-ring-color` hook, the control set its rule names. */
.glass-dock
    :deep(
        :is(
                .dock-layer-tab,
                .dock-icon-button,
                .dark-mode-toggle-button,
                .dock-tab-button,
                .dock-select-trigger,
                .dock-dropdown-trigger
            )
    ) {
    --dock-ring-color: var(--focus-ring-color);
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
    /* UIA-V-6: the ink regime sits on the seal, inherited by its ink (the
       wax's sibling), so the admin gold-ink's direct colour still
       wins without a specificity fight. */
    color: var(--seal-ink, var(--foreground));
    /* X-DS pass 17 (V17C-01): the admin glyph's gold sits on the WAX, not
       the band, so the seal rebinds `--ink-gold` to the wax-certified gold
       (useViewAccents); where none clears the wax, the seal's own ink. */
    --ink-gold: var(--seal-ink-gold, var(--seal-ink, var(--foreground)));
    --ink-gold-glyph: var(--ink-gold);
}
.dock-seal-wax,
.dock-seal-ink {
    grid-area: 1 / 1;
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
       on the WAX (inherited by the icon) lets the admin gold-ink
       class (direct color) win without a specificity fight. */
    color: var(--seal-ink, var(--foreground));
}
.dock-seal-ink {
    inline-size: 55%;
    block-size: 55%;
    pointer-events: none;
    /* V9C-01: the wax is a positioned stacking context (glass's
       WatercolorDot: relative + isolate + filter), so a static sibling
       paints UNDER it whatever the DOM order. The ink is positioned and
       lifted one step so the view glyph paints over the wax. No rim. */
    position: relative;
    z-index: 1;
}
</style>
