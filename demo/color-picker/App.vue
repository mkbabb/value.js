<template>
    <div class="app-layout">
        <!-- W5-a11y: decorative aurora canvas — hidden from AT. W6-1 entrance
             (owner ruling §1.1): the canvas derive-fades in over the
             SAME-material `--saved-bg` ground once the field is drawable
             (`auroraArrived`), so the load carries no dark→light snap. W7-3: the
             `data-glass-field-canvas` stamp threads the live field to samplers —
             the full luma-truth rationale lives with useAtmosphereBoot. -->
        <canvas
            ref="atmosphereCanvas"
            class="atmosphere-canvas absolute inset-0 w-full h-full pointer-events-none"
            :class="overture.b2.value && 'atmosphere-canvas--arrived'"
            :style="auroraCssGradient ? { backgroundImage: auroraCssGradient } : undefined"
            aria-hidden="true"
            data-testid="atmosphere-canvas"
            data-glass-field-canvas
        />
        <!-- W5-a11y: nav landmark for the dock.
             W2-3 (T.W2 · B1 dock voice): the dock arrives AS the pill — the
             demo VEILS the dock inside its own B1 slot while the producer's
             mount nub→pill morph runs, and reveals through the plate-land
             family on the morph's transitionend (a RECORDED BOOKED-INTERIM;
             the sanctioned mechanism is the P7 arrive-expanded ask, M-14 —
             this veil dies the day it ships). The reveal's animationend is
             B2's second predicate (noteDockLanded). State-gated, never
             timed: a no-morph mount (the P7 future) reveals via the
             getAnimations emptiness check. -->
        <nav
            ref="dockNav"
            aria-label="Application navigation"
            :class="[
                !dockRevealed && 'overture-dock-veiled',
                dockRevealed && !prmInstant && 'overture-dock-land',
            ]"
            @transitionend.capture="onDockMorphSettled"
            @animationend="onDockLandEnd"
        >
            <Dock
                :link-copied="linkCopied"
                :edit-target="activeEditTarget"
                :action-bar="colorPickerRef?.actionBarContext ?? null"
                :generic-action-bar="actionBar"
                @share-link="shareLink"
                @commit-edit="colorPickerRef?.commitEdit(); viewManager.mobilePaneIndex.value = 1"
                @cancel-edit="colorPickerRef?.cancelEdit(); viewManager.mobilePaneIndex.value = 1"
            />
        </nav>

        <!-- W5-a11y: main landmark for pane content -->
        <main class="pane-main" aria-label="Color tool panes">
        <!-- Two-pane grid. `paneContainer` feeds the S.W5-10 device-pixel
             snap (card-lighting-forensics artifact 4): the flex-centering
             remainder is nudged off fractional device pixels so the card
             corner arcs rasterize ON the pixel grid. -->
        <div
            ref="paneContainer"
            :class="[
                'pane-container',
                currentConfig.right !== null && 'pane-container--dual',
            ]"
        >
            <!-- X6: single-mount by breakpoint. Only ONE breakpoint's slots are
                 MOUNTED at a time (v-if, not display-toggle), so exactly one live
                 picker — and thus one live goo-blob WebGL2 context — exists at any
                 viewport. The prior always-in-DOM display-toggle kept a hidden-
                 but-LIVE second picker (the mobile slot at desktop, the desktop
                 slots at mobile), doubling the WebGL contexts + the reactive
                 subtree. The lg:* display classes are RETAINED untouched (the
                 D8-1 cascade is producer-owned; never demo-cured here). -->

            <!-- Mobile: single pane slot (below lg / portrait). `pane-wrapper`
                 makes it a size container so in-card `cqi` sizing resolves on
                 every slot (R.W3 Lane A / A4). W2-3: the slot speaks the
                 `appear` plate-land grammar (the single plate = the left
                 voice, +40ms). -->
            <div v-if="!isDesktop" class="pane-wrapper pane-wrapper--left pane-slot-mobile lg:hidden w-full max-w-md sm:max-w-lg mx-auto min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch" style="--overture-appear-delay: var(--overture-left-delay)">
                <!-- W3-4 (S.W3): KeepAlive :max right-sized to the 9 non-admin
                     views. The mobile slot cycles both left+right panes, so it
                     caches the common (non-admin) surface without evicting a
                     hot pane; the 5 admin views' panes fall off the LRU rather
                     than permanently bloating the cache. -->
                <PaneSlot
                    :component="mobile.component"
                    :component-key="mobile.key"
                    :component-props="mobile.props"
                    :transition-name="viewManager.ready.value ? 'vj-enter' : ''"
                    :max="9"
                    appear
                    :on-appeared="(el: Element) => overture.noteLeftPlateSettled(el)"
                />
            </div>

            <template v-else>
                <!-- Desktop: left pane (lg+) — the B3 plate (+40ms). -->
                <div class="pane-wrapper pane-wrapper--left hidden lg:flex w-full min-w-0 min-h-0 h-full flex-col justify-center" style="--overture-appear-delay: var(--overture-left-delay)">
                    <!-- W3-4 (S.W3): :max = the 6 distinct non-admin LEFT panes
                         (color-picker · browse · extract · atmosphere · generate
                         · gradient) — already right-sized; admin left panes fall
                         off the LRU rather than bloating the cache. -->
                    <PaneSlot
                        :component="desktopLeft.component"
                        :component-key="desktopLeft.key"
                        :component-props="desktopLeft.props"
                        :on-mount="onDesktopLeftMount"
                        :transition-name="viewManager.ready.value ? 'vj-enter' : ''"
                        :max="6"
                        appear
                        :on-appeared="(el: Element) => overture.noteLeftPlateSettled(el)"
                    />
                </div>

                <!-- Desktop: right pane (lg+) — always in DOM to preserve
                     KeepAlive scroll position. W2-3: the right plate (+120ms)
                     arrives through the SAME appear grammar — the About pop
                     dies (LS-4); a late chunk materializes through the same
                     land on resolution (work defers, appearance composes). -->
                <div
                    class="pane-wrapper pane-wrapper--right hidden lg:block w-full min-w-0 min-h-0 h-full transition-opacity duration-200"
                    :class="currentConfig.right === null ? 'pane-wrapper--ghost' : ''"
                    style="--overture-appear-delay: var(--overture-right-delay)"
                >
                    <!-- W3-4 (S.W3): :max = the 4 distinct non-admin RIGHT panes
                         (about · palettes · mix · blob) — every admin view uses
                         right="palettes" (already cached), so no non-admin right
                         pane is ever evicted. Was 3 (under-sized → evicted one). -->
                    <PaneSlot
                        :component="desktopRight.component"
                        :component-key="desktopRight.key"
                        :component-props="desktopRight.props"
                        :on-mount="onDesktopRightMount"
                        :transition-name="viewManager.ready.value ? 'vj-enter' : ''"
                        :max="4"
                        appear
                        :on-appeared="() => overture.noteRightPlateSettled()"
                    />
                </div>
            </template>
        </div>
        </main>
    </div>

    <!-- S.W0 W0-1 (seed rider 1): always-mounted dev-misconfig banner. Inert
         in production + whenever VITE_API_URL is set (e2e / boot-smoke); only
         paints when bare `dev:web-only` silently targets the cross-origin prod
         api. -->
    <DevMisconfigBanner />

    <!-- Global modals -->
    <MigratePalettesDialog
        v-model:open="paletteManager.showMigrateDialog.value"
        :count="paletteManager.savedPalettes.value.length"
        :mode="paletteManager.migrateMode.value"
        @respond="paletteManager.onMigrateRespond"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, shallowRef, useTemplateRef } from "vue";

import type { ColorModel, EditTarget } from "@components/custom/color-picker";
import { ColorPicker } from "@components/custom/color-picker";
import { CSS_COLOR_KEY, EDIT_TARGET_KEY, COLOR_MODEL_KEY } from "@composables/color/keys";

import { Dock } from "@components/custom/dock";
// PI-6: DIRECT imports (not via the dialog/status barrels) keep the eager index.js chunk from pulling the lazy sibling dialogs' side-effecting <style>.
import MigratePalettesDialog from "@components/custom/palette-browser/dialog/MigratePalettesDialog.vue";
import DevMisconfigBanner from "@components/custom/palette-browser/status/DevMisconfigBanner.vue";
import PaneSlot from "@components/custom/panes/PaneSlot.vue";

import { useCustomColorNames } from "@composables/color/useCustomColorNames";
import { useColorUrl } from "@composables/color/useColorUrl";

import { useViewManager, VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { useColorPipeline } from "@composables/color/useColorPipeline";
import { usePaneRouter } from "@composables/usePaneRouter";
import { usePaletteManagerWiring } from "./composables/usePaletteManagerWiring";
import { provideApiClient } from "@lib/palette/api/useApiClient";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { useAtmosphereBoot } from "./composables/boot/useAtmosphereBoot";
import { resolveHydratedBootModel } from "./composables/boot/hydrate";
import { useOverture, OVERTURE_KEY } from "./composables/boot/useOverture";
import { useDevicePixelSnap } from "./composables/useDevicePixelSnap";

import "@styles/utils.css";
import "@styles/style.css";

// --- Dark mode: initialize global dark state eagerly so the user's saved
//     preference takes effect before the Dock profile menu mounts. ---
useGlobalDark();

// --- API client DI seam (S.W2 W2-4) ---
// ONE provider for {request, adminRequest, sessionToken, availability, baseUrl};
// the degraded-state affordances inject it instead of importing the singletons.
provideApiClient();

// --- Template refs ---
const atmosphereCanvas = useTemplateRef<HTMLCanvasElement>("atmosphereCanvas");
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);

// --- W2-1 (T.W2) — HYDRATION BEFORE DERIVATION, the ordering LAW ---
// The seed resolves FIRST (URL hash → storage → default, pure + synchronous),
// so the model ref — and every derivation graph constructed below (the
// pipeline's rAF-coalesced frame ref, the atmosphere/accent token sinks) —
// is BORN carrying the hydrated color. Nothing on screen ever paints the
// default's color unless the default IS the seed (t-load-sync LS-2; kills
// t-aurora-boot F-1's demo half + F-3's latent pink flash structurally).
// useColorUrl/restoreFromStorage below keep the LIVE sync + savedColors
// restore; they no longer carry the FIRST value.
const hydration = resolveHydratedBootModel();
const model = shallowRef<ColorModel>(hydration.model);

// --- S.W5-10 (card-lighting-forensics artifact 4): integer-snap the pane
//     centering — the flex remainder parks card corner arcs on fractional
//     device pixels (picker y=230.445… measured), which reads as stepped
//     corner AA under Chromium's backdrop-clip. Paint-only relative nudge. ---
const paneContainer = useTemplateRef<HTMLDivElement>("paneContainer");
useDevicePixelSnap(paneContainer);

// --- Color model — the ONE pipeline (S.W2 · W2-1) ---
// One composable owns the model + one derivation set + storage + the token sink.
// Provided via COLOR_MODEL_KEY so the picker subtree (and the dock's re-provide)
// consume it directly — no defineModel round-trip, no second shallowRef copy.
const pipeline = useColorPipeline(model);
const {
    cssColor,
    cssColorOpaque,
    // W3-1 (S.W3): the rAF-coalesced opaque colour — one derive per frame for
    // the atmosphere fan-out (aurora seed + blob palette + --accent-live).
    cssColorOpaqueFrame,
    savedColorStrings,
    resetToDefaults,
    applyColorString,
    restoreFromStorage,
} = pipeline;
provide(COLOR_MODEL_KEY, pipeline);

// External-origin model writes (URL load): assigning model.value directly — NOT
// via pipeline.updateModel — leaves the pipeline's stableHue watch to refresh the
// hue from the incoming color (updateModel marks self-originated edits, which the
// watch skips). Mirrors the former useAppColorModel.updateModel semantics.
const patchModelExternal = (patch: Partial<ColorModel>) => {
    model.value = { ...model.value, ...patch };
};

// --- Edit target ---
const activeEditTarget = shallowRef<EditTarget | null>(null);
const onEditTargetChange = (et: EditTarget | null) => { activeEditTarget.value = et; };
provide(EDIT_TARGET_KEY, activeEditTarget);
provide(CSS_COLOR_KEY, cssColorOpaque);

// --- View manager ---
const viewManager = useViewManager();
provide(VIEW_MANAGER_KEY, viewManager);
const currentConfig = computed(() => viewManager.currentConfig.value);

// --- Atmosphere boot (S.W5 · row-8 cap cure) ---
// All three document-root atmosphere/entrance side-effects (`--accent-live`
// accent axis, per-view accent tokens, aurora + hero-blob) and their provides
// (SAFE_ACCENT_KEY + AURORA_ATOMS_KEY + BLOB_CONFIG_KEY) live in one composable
// — see useAtmosphereBoot's header. App keeps only the canvas mount + the
// CSS_COLOR_KEY provide above; seeded by the rAF-coalesced colour (W3-1),
// `auroraArrived` keys the W6-1 canvas derive-in.
const { auroraCssGradient, auroraArrived } = useAtmosphereBoot(
    atmosphereCanvas,
    cssColorOpaqueFrame,
    currentConfig,
);

// --- W2-3 (T.W2) — THE OVERTURE: the named beat-gating DAG (B0–B4) ---
// One choreography, ordered by GATING (see useOverture's header). B2's field
// derive-in binds the canvas class above; the slots' `appear` grammar + the
// dock veil below report the plate-land events; ColorPicker consumes B4 via
// OVERTURE_KEY for the blob's emerge beat (W2-4).
const overture = useOverture(auroraArrived);
provide(OVERTURE_KEY, overture);

// The dock veil (the M-14 booked-interim; template note above). PRM: instant
// states — no veil, no land, the dock is simply present.
const prmInstant =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const dockNav = useTemplateRef<HTMLElement>("dockNav");
const dockRevealed = ref(prmInstant);
if (prmInstant) overture.noteDockLanded();

function onDockMorphSettled(e: TransitionEvent) {
    if (dockRevealed.value) return;
    // Only the producer dock's own morph counts (any property of the
    // .glass-dock subtree — the nub→pill geometry transition).
    if ((e.target as Element | null)?.closest?.(".glass-dock")) {
        dockRevealed.value = true;
    }
}
function onDockLandEnd(e: AnimationEvent) {
    if (e.animationName.includes("overture-plate-land")) {
        overture.noteDockLanded();
    }
}
onMounted(() => {
    if (dockRevealed.value) return;
    // State-gated no-morph fallback (the P7 arrive-expanded future): after
    // the mount's styles settle (two frames — a state boundary, not a
    // timeout), if the producer dock is NOT morphing, reveal immediately.
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            if (dockRevealed.value) return;
            const dock = dockNav.value?.querySelector(".glass-dock");
            // FINITE animations only — the dock subtree carries standing
            // infinite loops (the gl-fade shimmer pair, probed live); waiting
            // on those would veil the dock forever. The mount morph is a
            // finite transition/animation.
            const running = (dock?.getAnimations({ subtree: true }) ?? []).filter(
                (a) => {
                    const t = a.effect?.getTiming();
                    return t ? t.iterations !== Infinity : true;
                },
            );
            if (!running.length) {
                dockRevealed.value = true;
                return;
            }
            // A morph IS running — gate the reveal on its own completion
            // (covers animation-driven morphs the transitionend capture
            // cannot see; first signal wins via the guard).
            void Promise.allSettled(running.map((a) => a.finished)).then(
                () => {
                    dockRevealed.value = true;
                },
            );
        }),
    );
});

// X6: the desktop dual-pane breakpoint (Tailwind `lg` = 1024px), now guarded
// by the aspect law (R.W3 Lane A / A4): a portrait tablet ≥ 1024px wide runs
// the single-slot mobile grammar — the JS mount condition and the CSS dual
// grid share one compound query, so they can never disagree. Drives the
// single-mount v-if so only one breakpoint's pane slots are live at a time.
const { matches: isDesktop } = useBreakpoint(
    "(min-width: 1024px) and (min-aspect-ratio: 1.1)",
);

// --- Pane action refs ---
// Populated by the onMount callbacks on the desktop PaneSlots; the action bar
// dispatches its per-view handlers onto them.
const generatePaneRef = ref<any>(null);
const gradientPaneRef = ref<any>(null);
const mixPaneRef = ref<any>(null);

// Ref-capture callbacks for desktop pane slots (replaces direct template refs).
// Called by PaneSlot's :on-mount prop when the inner component mounts/unmounts.
function onDesktopLeftMount(el: any) {
    const left = currentConfig.value.left;
    colorPickerRef.value = left === "color-picker" ? el : null;
    generatePaneRef.value = left === "generate" ? el : null;
    gradientPaneRef.value = left === "gradient" ? el : null;
}

function onDesktopRightMount(el: any) {
    mixPaneRef.value = currentConfig.value.right === "mix" ? el : null;
}

// --- Pane routing — one source of truth: mobile single-slot, the two desktop
//     slots, and the per-view action bar all derive from one route table. ---
const { mobile, desktopLeft, desktopRight, actionBar } = usePaneRouter(
    viewManager,
    model,
    {
        cssColor: () => cssColor.value,
        savedColorStrings: () => savedColorStrings.value,
        colorPickerRef: () => colorPickerRef.value,
        onEditTargetChange,
        resetToDefaults,
        updateModel: (v: ColorModel) => { model.value = v; },
    },
    { generate: generatePaneRef, gradient: gradientPaneRef, mix: mixPaneRef },
);

// --- Palette manager ---
const paletteManager = usePaletteManagerWiring(
    colorPickerRef,
    viewManager,
    model,
    applyColorString,
    savedColorStrings,
);

// --- Share link ---
const linkCopied = ref(false);
let linkCopiedTimer: ReturnType<typeof setTimeout> | undefined;

const shareLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
        linkCopied.value = true;
        clearTimeout(linkCopiedTimer);
        linkCopiedTimer = setTimeout(() => { linkCopied.value = false; }, 2000);
    }
};

// --- URL sync + persistence precedence (S.W2 · W2-1; re-scoped T.W2 · W2-1) ---
// The FIRST value is hydration's (above — the model was born with it).
// useColorUrl's initial apply is an idempotent re-commit of the same URL
// color and keeps owning the LIVE URL↔model sync; restoreFromStorage keeps
// owning the savedColors restore (skipped whenever a URL color won, exactly
// as before). `hydration.source` guards the corner where the router's query
// and the pure hash read could disagree — the hydrated URL seed must never
// be overwritten by the stored one.
const { appliedFromUrl } = useColorUrl({ model, updateModel: patchModelExternal });
if (!appliedFromUrl && hydration.source !== "url") restoreFromStorage();

// --- Custom color names ---
const { loadFromAPI: loadCustomColorNames } = useCustomColorNames();

onMounted(() => { loadCustomColorNames(); });
</script>

<style scoped>
@reference "../../demo/@/styles/style.css";

/* W3-4 (S.W3 · pane-swap payload): the former height/margin/padding transition
   on .pane-wrapper is DELETED. Layout properties never animate on a pane swap
   (the grid owns the box geometry; the swap reads through the vj-enter TRANSFORM
   family). Co-transitioning height/margin/padding forced a layout + paint on
   every frame of every swap — the P1 layout-thrash (perf-transitions P1-2). The
   pane geometry rides transform/opacity only now. */

/* ── W6-1 · the atmosphere ARRIVAL (owner ruling 2026-07-05 §1.1), re-cut
   W2-2 (T.W2 · t-aurora-boot §2.1 step 4): the canvas textures in over its
   OWN gradient ground once the field is drawable (`isArmed`; immediate on
   the `"css"` placeholder substrate). Ground and field are ONE material by
   construction now (W2-2's ground IS the derived-palette gradient), so the
   fade cannot pass through gray — the arrival reads as the painting waking
   up, not a crossfade to a different picture. Duration 0.45s → 0.9s (the
   §2.1 re-cut: the old fade completed before the eye registered what the
   ground was — HALF the story too fast); decelerate kept, no new curve.
   W3-2's idle-deferral mechanics are untouched (this designs the arrival,
   it does not revert the deferral). */
.atmosphere-canvas {
    opacity: 0;
    transition: opacity var(--overture-derive-in, 0.9s) var(--ease-decelerate);
}
.atmosphere-canvas--arrived {
    opacity: 1;
}
/* PRM-honest: reduce → no fade, the field is a static state change. */
@media (prefers-reduced-motion: reduce) {
    .atmosphere-canvas {
        transition: none;
    }
}

/* Ghost pane: always in DOM to preserve scroll-timeline state, but invisible
   and non-interactive. content-visibility:auto (W3-4) additionally drops the
   parked subtree from layout + paint while it sits ghosted — the KeepAlive
   scroll state is preserved, the render cost is not paid. */
.pane-wrapper--ghost {
    visibility: hidden;
    position: absolute;
    pointer-events: none;
    opacity: 0;
    content-visibility: auto;
}

</style>

<style>
/* ── W2-3 (T.W2) · THE OVERTURE — the shell token block + the arrival
 * grammar. ONE clock family: every offset below is a token on this shell
 * timeline, so DevTools shows ONE clock (t-load-sync §3). The beats OPEN by
 * gating (useOverture); these tokens only voice the staggers/durations. ── */
:root {
    /* B1 · the plate-land family (440ms --spring-snappy; staggers per the
     * beat sheet: dock +0 · left +40ms · right +120ms). */
    --overture-plate-land: 440ms;
    --overture-dock-delay: 0ms;
    --overture-left-delay: 40ms;
    --overture-right-delay: 120ms;
    /* B2 · the field derive-in (0.9s decelerate — t-aurora-boot §2.1). */
    --overture-derive-in: 0.9s;
}

/* The pane-slot APPEAR grammar (LS-4 — one arrival grammar, three voices):
 * first-mount and late-chunk arrival speak the plate-land family. TRANSFORM
 * ONLY — opacity pinned 1 (the LCP REVEAL-ONLY LAW, PI-2/M-13: the left
 * slot hosts the LCP-owning picker plate; its paint chain never carries an
 * opacity gate). The travel is the plate-land settle (translateY + the
 * cartoon half-degree), NOT the vj-enter off-canvas slide — arrival is a
 * landing, not a swap. */
.overture-appear-from {
    transform: translateY(-12px) rotate(-0.6deg);
}
.overture-appear-active {
    transition: transform var(--overture-plate-land) var(--spring-snappy);
    transition-delay: var(--overture-appear-delay, 0ms);
}
.overture-appear-to {
    transform: none;
}

/* The dock's B1 voice (the M-14 booked-interim): veiled while the producer
 * nub→pill mount-morph runs (the morph is no longer a visible actor), then
 * lands AS the pill through the same family at +0ms. The dock is not the
 * LCP owner, so its land may carry opacity (it was veiled — the reveal IS
 * the arrival). */
.overture-dock-veiled {
    visibility: hidden;
}
@keyframes overture-plate-land {
    from {
        opacity: 0;
        transform: translateY(-12px) rotate(-0.6deg);
    }
    to {
        opacity: 1;
        transform: none;
    }
}
.overture-dock-land {
    animation: overture-plate-land var(--overture-plate-land)
        var(--spring-snappy) var(--overture-dock-delay) both;
}

/* PRM — instant states (D3 law 5, kept): the overture collapses; every
 * surface is simply present in its settled pose. */
@media (prefers-reduced-motion: reduce) {
    .overture-appear-from,
    .overture-appear-to {
        transform: none;
    }
    .overture-appear-active {
        transition: none;
    }
    .overture-dock-land {
        animation: none;
    }
}

/* ── Pane swap — the enter/exit family (R.W4 Lane B / B1) ──
 * The former pane-slide/pane-left/pane-right trio collapsed onto `vj-enter`
 * (animations.css); these DIRECT-CHILD geometry overrides carry only the
 * pane slots' off-canvas slide + cartoon-swagger rotate, opacity pinned
 * (the swap reads as travel, not a fade). Direct-child (`>`) on purpose:
 * an inherited `--vj-enter-*` var would leak the pane geometry into
 * nested in-pane transitions. Unscoped on purpose: the pane root carries
 * PaneSlot's scope id, not App's. The PaneSlot <Transition> stays DEFAULT
 * mode (the R.W3 dev-safe simultaneous cross-slide — DESIGN.md §Motion). */
.pane-wrapper--left > .vj-enter-enter-from,
.pane-wrapper--left > .vj-enter-leave-to {
    opacity: 1;
    transform: translateX(-110%) rotate(-2deg);
}
.pane-wrapper--right > .vj-enter-enter-from,
.pane-wrapper--right > .vj-enter-leave-to {
    opacity: 1;
    transform: translateX(110%) rotate(2deg);
}

/* W3-4 (S.W3): promote the pane to its own compositor layer for the DURATION
 * of the enter/leave transition ONLY (`*-active`) — never a standing
 * `will-change` layer (a persistent one costs memory + defeats the point). The
 * browser drops the hint the moment the transition class is removed. */
.pane-wrapper--left > .vj-enter-enter-active,
.pane-wrapper--left > .vj-enter-leave-active,
.pane-wrapper--right > .vj-enter-enter-active,
.pane-wrapper--right > .vj-enter-leave-active {
    will-change: transform;
}

/* W3-5 (S.W3 · view-swap spring retune): the pane ENTER travel rode the
 * `--spring-smooth-duration` 0.45s settle (§6.2 baseline); re-time it to
 * `--duration-normal` (0.3s) here — SCOPED to the pane wrappers so the shared
 * vj-enter family (overlays, toolbars, list items) is untouched. The spring
 * CURVE (`--spring-smooth`) is kept; only its clock tightens. The leave side
 * already ran at `--duration-normal` (animations.css), so the swap is
 * symmetric ~0.3s now. */
.pane-wrapper--left > .vj-enter-enter-active,
.pane-wrapper--right > .vj-enter-enter-active {
    transition:
        opacity var(--duration-normal) var(--ease-decelerate),
        transform var(--duration-normal) var(--spring-smooth);
}
</style>
