<template>
    <div class="app-layout" :data-layout="isDesktop ? 'desktop' : 'mobile'">
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
            :style="
                auroraCssGradient ? { backgroundImage: auroraCssGradient } : undefined
            "
            aria-hidden="true"
            data-testid="atmosphere-canvas"
            data-glass-field-canvas
        />
        <!-- W5-a11y: nav landmark. T-31 (T.W6): the nav IS the dock band —
             row 1 of the two-band grid, in-flow, zero z-index arms; the scene
             band sits below (style.css §App layout). W2-3 (T.W2 · B1 dock
             voice): the dock arrives AS the pill — veiled during the producer
             mount-morph, revealed through the plate-land family (the M-14
             booked-interim; mechanism in boot/useDockArrival.ts). -->
        <nav
            ref="dockNav"
            class="dock-band"
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
                :scene-actions="sceneActions"
                @share-link="shareLink"
                @commit-edit="
                    colorPickerRef?.commitEdit();
                    viewManager.mobilePaneIndex.value = 1;
                "
                @cancel-edit="
                    colorPickerRef?.cancelEdit();
                    viewManager.mobilePaneIndex.value = 1;
                "
            />
        </nav>

        <!-- W5-a11y: main landmark for pane content -->
        <main class="pane-main" aria-label="Color tool panes">
            <!-- U.W-A11Y · U-F58: a pane render throw surfaces the focus-managed,
             SR-announced boundary IN PLACE of the grid — never a white-screen. -->
            <ErrorBoundary message="This panel hit an unexpected error.">
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
                 subtree. MOB-1 (T round-4) SUPERSEDES the width-only lg:* display
                 witnesses with the .app-layout [data-layout] stamp (the single
                 isDesktop truth); the D6-03 exception + D8-1 note die — see style.css. -->

                    <!-- Mobile: single pane slot (below lg / portrait). `pane-wrapper`
                 makes it a size container so in-card `cqi` sizing resolves on
                 every slot (R.W3 Lane A / A4). W2-3: the slot speaks the
                 `appear` plate-land grammar (the single plate = the left
                 voice, +40ms). -->
                    <div
                        v-if="!isDesktop"
                        class="pane-wrapper pane-wrapper--left pane-slot-mobile w-full max-w-md sm:max-w-lg mx-auto min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch"
                        style="--overture-appear-delay: var(--overture-left-delay)"
                    >
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
                            :on-appeared="
                                (el: Element) => overture.noteLeftPlateSettled(el)
                            "
                        />
                    </div>

                    <template v-else>
                        <!-- Desktop: left pane (lg+) — the B3 plate (+40ms). -->
                        <div
                            class="pane-wrapper pane-wrapper--left w-full min-w-0 min-h-0 h-full flex-col justify-center"
                            style="--overture-appear-delay: var(--overture-left-delay)"
                        >
                            <!-- W3-4 (S.W3): :max = the 6 distinct non-admin LEFT panes
                         (color-picker · browse · extract · atmosphere · generate
                         · gradient) — already right-sized; admin left panes fall
                         off the LRU rather than bloating the cache. -->
                            <PaneSlot
                                :component="desktopLeft.component"
                                :component-key="desktopLeft.key"
                                :component-props="desktopLeft.props"
                                :on-mount="onDesktopLeftMount"
                                :transition-name="
                                    viewManager.ready.value ? 'vj-enter' : ''
                                "
                                :max="6"
                                appear
                                :on-appeared="
                                    (el: Element) => overture.noteLeftPlateSettled(el)
                                "
                            />
                        </div>

                        <!-- Desktop: right pane (lg+) — always in DOM to preserve
                     KeepAlive scroll position. W2-3: the right plate (+120ms)
                     arrives through the SAME appear grammar — the About pop
                     dies (LS-4); a late chunk materializes through the same
                     land on resolution (work defers, appearance composes). -->
                        <div
                            class="pane-wrapper pane-wrapper--right w-full min-w-0 min-h-0 h-full transition-opacity duration-200"
                            :class="
                                currentConfig.right === null
                                    ? 'pane-wrapper--ghost'
                                    : ''
                            "
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
                                :transition-name="
                                    viewManager.ready.value ? 'vj-enter' : ''
                                "
                                :max="4"
                                appear
                                :on-appeared="() => overture.noteRightPlateSettled()"
                            />
                        </div>
                    </template>
                </div>
            </ErrorBoundary>
        </main>
    </div>

    <!-- T.W6-6 (T-9, landed through the W5 App.vue queue — the ONE round-4
         App.vue writer): the dev-misconfig BANNER mount is REMOVED (the owner:
         "This banner should be removed", re-confirmed live at R10/W4.5). The
         misconfigured-state affordance re-homes as Lane D's dock status lamp
         (first-paint, dev-gated); the W0-1 honesty contract
         (availability.ts + the loud console.error) is byte-preserved. -->

    <!-- Global modals -->
    <MigratePalettesDialog
        v-model:open="paletteManager.migration.showMigrateDialog.value"
        :count="paletteManager.library.savedPalettes.value.length"
        :mode="paletteManager.migration.migrateMode.value"
        @respond="paletteManager.migration.onMigrateRespond"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, shallowRef, useTemplateRef } from "vue";

import type { ColorModel, EditTarget } from "../color-session/color-model";
import { ColorPicker } from "../picker";
import { CSS_COLOR_KEY, EDIT_TARGET_KEY, COLOR_MODEL_KEY } from "../color-session/keys";

import { Dock } from "../shell/dock";
// U.W-DEMO · U-F47 (G-DEMO-3b): reached through the `dialog/` sub-barrel (a
// barrel the top-level palette-browser seam re-exports), never the raw `.vue`
// file. BOOK (PI-6 residual): the root `package.json` marks `./demo/**`
// side-effecting, so this eager-chunk barrel reach does NOT tree-shake the lazy
// sibling dialogs by static analysis — the bundle-hygiene reconciliation
// (narrow the `demo/**` sideEffects glob, or a manualChunk for this dialog) is a
// build-config change to be verified once the demo builds (currently blocked by
// the glass-ui 5.0.0 adopt-gap); tracked to U.W-CLOSE's re-probe.
import { MigratePalettesDialog } from "../palettes/browser/dialog";
import PaneSlot from "../shell/PaneSlot.vue";
// U.W-A11Y · U-F58: the focus-managed / SR-announced boundary that catches a
// pane render throw instead of white-screening (never a silent dead plate).
import ErrorBoundary from "./ErrorBoundary.vue";

import { useCustomColorNames } from "../color-session/useCustomColorNames";
import { useColorUrl } from "../color-session/useColorUrl";

import { useViewManager, VIEW_MANAGER_KEY } from "../shell/useViewManager";
import { useColorPipeline } from "../color-session/useColorPipeline";
import { usePaneRouter, readScenePaneTarget } from "../shell/usePaneRouter";
import type {
    ScenePane,
    ScenePaneTargetMap,
    ScenePaneTargets,
} from "../color-session/keys";
import { usePaletteWiring } from "./composables/usePaletteWiring";
import { provideApiClient } from "../platform/transport/useApiClient";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { useClipboard } from "@mkbabb/glass-ui";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { useAtmosphereBoot } from "./composables/boot/useAtmosphereBoot";
import { resolveHydratedBootModel } from "./composables/boot/hydrate";
import { useOverture, OVERTURE_KEY } from "./composables/boot/useOverture";
import { useDockArrival } from "./composables/boot/useDockArrival";
import { useDevicePixelSnap } from "./composables/useDevicePixelSnap";

import "../styles/utils.css";
import "../styles/foundation.css";
// U.W-A11Y / U-F25: the `--focus-ring-inner/-outer` token recipe (:root) that
// every keyboard-operable control's focus affordance composes. Global wire (a
// `:root` token must be defined regardless of which control is mounted); the
// modality lane REFERENCES these names from style.css. Imported AFTER style.css
// so a later owner override there wins the cascade.
import "../styles/focus-ring.css";
// The overture's one-clock grammar sheet (tokens + arrival/appear/dock/emerge
// rules) — colocated with the boot chain; imported AFTER style.css so the
// cascade order matches the former in-SFC blocks (T.W2-3).
import "./composables/boot/overture.css";

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
// The seed resolves FIRST (URL hash → storage → default, pure + synchronous)
// so the model — and every derivation graph below — is BORN hydrated; nothing
// ever paints a color the seed did not produce (LS-2; kills F-1-demo + F-3
// structurally — full rationale in boot/hydrate.ts). useColorUrl/
// restoreFromStorage keep the LIVE sync; they no longer carry the FIRST value.
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
const onEditTargetChange = (et: EditTarget | null) => {
    activeEditTarget.value = et;
};
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

// The dock's B1 voice (the M-14 booked-interim) — veil + reveal + the B2
// noteDockLanded predicate live in boot/useDockArrival (full rationale there).
const dockNav = useTemplateRef<HTMLElement>("dockNav");
const { prmInstant, dockRevealed, onDockMorphSettled, onDockLandEnd } = useDockArrival(
    dockNav,
    overture,
);

// X6: the desktop dual-pane breakpoint (Tailwind `lg` = 1024px), now guarded
// by the aspect law (R.W3 Lane A / A4): a portrait tablet ≥ 1024px wide runs
// the single-slot mobile grammar — the JS mount condition and the CSS dual
// grid share one compound query, so they can never disagree. Drives the
// single-mount v-if so only one breakpoint's pane slots are live at a time.
const { matches: isDesktop } = useBreakpoint(
    "(min-width: 1024px) and (min-aspect-ratio: 1.1)",
);

// --- Scene-target registry (X-W4 · CC-043) ---
// ONE typed registry replaces the three `ref<any>` pane-instance refs the dock
// used to dispatch onto. `readScenePaneTarget` verifies the instance actually
// exposes the scene's commands, so "registered" is a measured fact: a pane that
// renamed a member now surfaces as the contract's `unavailable` state instead
// of degrading to a dead dock button.
const scenePanes = shallowRef<ScenePaneTargets>({
    generate: null,
    gradient: null,
    mix: null,
});

/** The picker instance, read back from the slot's mount report. */
function readColorPicker(instance: unknown): InstanceType<typeof ColorPicker> | null {
    if (typeof instance !== "object" || instance === null) return null;
    const exposed = instance as Record<string, unknown>;
    if (typeof exposed.commitEdit !== "function") return null;
    if (
        typeof exposed.sceneActionTarget !== "object" ||
        exposed.sceneActionTarget === null
    ) {
        return null;
    }
    return instance as InstanceType<typeof ColorPicker>;
}

/**
 * Publish a registry revision ONLY when a target actually changed.
 *
 * `PaneSlot` binds its mount report as an INLINE function ref
 * (`:ref="(el) => onMount(el)"`), so its identity differs on every render and
 * Vue re-invokes it on every patch of the slot. A `shallowRef` whose value is
 * replaced by a fresh object literal would therefore trigger on every patch —
 * and this registry is read by `sceneActions`, which App's own render reads, so
 * every such trigger re-enters App's render effect. The three `ref<any>` this
 * replaces were immune by accident (assigning the same instance to a `ref` is a
 * no-op write, and nothing rendered them); the registry earns it deliberately.
 */
function publishScenePanes(next: ScenePaneTargets) {
    const current = scenePanes.value;
    if (
        current.generate === next.generate &&
        current.gradient === next.gradient &&
        current.mix === next.mix
    ) {
        return;
    }
    scenePanes.value = next;
}

/**
 * What ONE slot's mount report says about ONE scene.
 *
 * A slot reports through `PaneSlot`'s inline function ref
 * (`:ref="(el) => onMount(el)"`), so Vue re-invokes it on every patch of that
 * slot — and for a `defineAsyncComponent` pane inside `<KeepAlive>` the object
 * it hands back ALTERNATES between the resolved pane's exposed instance and the
 * wrapper's own bare public instance. Measured at this seat on `/#/mix`, in one
 * render pass: 102 reports carrying `clearSelection/startMix/copyResult` against
 * 53 carrying nothing at all.
 *
 * A report that is not this scene's pane is therefore NOT evidence that the pane
 * is gone. Reading it as a de-registration made the registry flip null↔target on
 * every patch — and the registry is read by `sceneActions`, which App's own
 * render reads, so App's render effect was mutating its own dependency:
 * *"Maximum recursive updates exceeded in component <App>"*, measured live.
 *
 * So a report means exactly what it says, and nothing more:
 *   · the slot no longer shows this scene → cleared;
 *   · an explicit unmount (`null`)        → cleared;
 *   · an instance exposing the scene's commands → registered;
 *   · anything else → not a fact about this scene; what is registered stands.
 *
 * The last arm is not a fallback over a defect: a pane that renamed a command
 * never satisfies `readScenePaneTarget`, so it never registers, and the contract
 * surfaces it as `unavailable` — which is the whole point of D4.
 */
function foldSceneReport<S extends ScenePane>(
    scene: S,
    slotOwnsScene: boolean,
    instance: unknown,
): ScenePaneTargetMap[S] | null {
    if (!slotOwnsScene || instance === null) return null;
    return readScenePaneTarget(scene, instance) ?? scenePanes.value[scene];
}

/** The same reading for the colour scene, whose target is the picker itself. */
function foldColorPickerReport(
    slotOwnsScene: boolean,
    instance: unknown,
): InstanceType<typeof ColorPicker> | null {
    if (!slotOwnsScene || instance === null) return null;
    return readColorPicker(instance) ?? colorPickerRef.value;
}

// Ref-capture callbacks for desktop pane slots (replaces direct template refs).
// Called by PaneSlot's :on-mount prop when the inner component mounts/unmounts.
// Each callback derives EVERY scene its slot can own from the one instance it
// was handed, so a scene the slot no longer shows is cleared by the same act
// that registers the scene it does.
function onDesktopLeftMount(instance: unknown) {
    const left = currentConfig.value.left;
    colorPickerRef.value = foldColorPickerReport(left === "color-picker", instance);
    publishScenePanes({
        ...scenePanes.value,
        generate: foldSceneReport("generate", left === "generate", instance),
        gradient: foldSceneReport("gradient", left === "gradient", instance),
    });
}

function onDesktopRightMount(instance: unknown) {
    publishScenePanes({
        ...scenePanes.value,
        mix: foldSceneReport("mix", currentConfig.value.right === "mix", instance),
    });
}

// --- Pane routing — one source of truth: mobile single-slot, the two desktop
//     slots, and the ONE scene action set all derive from one route table. ---
const { mobile, desktopLeft, desktopRight, sceneActions } = usePaneRouter(
    viewManager,
    model,
    {
        cssColor: () => cssColor.value,
        savedColorStrings: () => savedColorStrings.value,
        colorPickerRef: () => colorPickerRef.value,
        colorSceneTarget: () => colorPickerRef.value?.sceneActionTarget ?? null,
        scenePanes: () => scenePanes.value,
        onEditTargetChange,
        resetToDefaults,
        updateModel: (v: ColorModel) => {
            model.value = v;
        },
    },
);

// --- Palette manager ---
const paletteManager = usePaletteWiring(
    colorPickerRef,
    viewManager,
    model,
    applyColorString,
    savedColorStrings,
);

// --- Share link ---
// Glass 7: scope-owned confirmation state replaces the hand-rolled copy+timer;
// `linkCopied` (a prop feed to the dock) derives off the reactive status.
const { status: linkCopyStatus, copy: copyLink } = useClipboard({ resetMs: 2000 });
const linkCopied = computed(() => linkCopyStatus.value === "success");

const shareLink = async () => {
    await copyLink(window.location.href);
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

onMounted(() => {
    loadCustomColorNames();
});
</script>

<style scoped>
@reference "../../demo/styles/foundation.css";

/* W3-4 (S.W3 · pane-swap payload): the former height/margin/padding transition
   on .pane-wrapper is DELETED. Layout properties never animate on a pane swap
   (the grid owns the box geometry; the swap reads through the vj-enter TRANSFORM
   family). Co-transitioning height/margin/padding forced a layout + paint on
   every frame of every swap — the P1 layout-thrash (perf-transitions P1-2). The
   pane geometry rides transform/opacity only now. */

/* The atmosphere-canvas arrival + PRM opacity pin moved to the overture
   grammar sheet (composables/boot/overture.css — the B2 voice + gate 5b). */

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

<!-- Global grammar homes (the W2-close PP-8 cap cure — moves, not removals):
     THE OVERTURE (tokens · appear · dock voice · plate cast-in · emerge ·
     PRM collapse) → composables/boot/overture.css (imported in script setup);
     the pane-swap vj-enter geometry overrides → @styles/animations.css
     (appended beside the vj-enter base family they override). -->
