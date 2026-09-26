<template>
    <!-- X.W5.c — the `[data-layout]` stamp is GONE with the fork it mirrored.
         It carried ONE bit ("is this viewport desktop") from the breakpoint
         composable into the stylesheet so the CSS display witnesses could
         agree with the JS mount condition. With one mount path there is no mount condition to
         agree with, and the grid answers the arrangement question from the
         space it actually has. `[data-view]` stays: the view's IDENTITY is a
         fact about the scene, not about the viewport. -->
    <div class="app-layout" :data-view="viewManager.currentView.value">
        <!-- W5-a11y: decorative aurora canvas — hidden from AT. W6-1 entrance
             (owner ruling §1.1): the canvas derive-fades in over the
             SAME-material `--saved-bg` ground once the field is drawable
             (`auroraArrived`), so the load carries no dark→light snap. W7-3: the
             `data-glass-field-canvas` stamp threads the live field to samplers —
             the full luma-truth rationale lives with useAtmosphereBoot.
             X.W12.a · UIA-V-1 / OA-18 — the field is VIEWPORT-FIXED
             (`fixed inset-x-0 top-0 h-lvh`), never document-sized. As an
             `absolute inset-0` child of the growing `.app-layout` it measured
             1440×7578 CSS px on `/` (the About pane), a 2160×11368 backing
             store at the producer's 1.5 DPR cap, past WebGPU's 8192
             `maxTextureDimension2D`: every frame raised a GPUValidationError
             and the field froze or died. The atmosphere is a backdrop, so it
             belongs to the viewport; `lvh` (not `inset-0`'s dynamic height)
             keeps the backing store stable while mobile toolbars retract. -->
        <canvas
            ref="atmosphereCanvas"
            class="atmosphere-canvas fixed inset-x-0 top-0 w-full h-lvh pointer-events-none"
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
                @commit-edit="commitEdit"
                @cancel-edit="cancelEdit"
            />
        </nav>

        <!-- W5-a11y: main landmark for pane content. X.W5.a · EB-30 — the
             landmark takes its name FROM the route title, so it can never
             announce a scene that is no longer mounted (the former static
             `aria-label="Color tool panes"` named one through every catch and
             every route change). -->
        <main class="pane-main" :aria-labelledby="ROUTE_TITLE_ID">
            <!-- X.W5.a · gate A5 (MT-F003 / App D-4) — ONE VISIBLE route H1
                 inside <main>, speaking the schema's own label. The sr-only
                 cure is STRUCK and uncitable: §5.1 requires a visible H1, and
                 the constitution's seven focus origins target this node, which
                 is why it is focusable-by-script (`tabindex="-1"`) and not
                 focusable by tab. -->
            <h1 :id="ROUTE_TITLE_ID" class="route-title font-display" tabindex="-1">
                {{ currentConfig.label }}
            </h1>

            <!-- X.W5.a · gate A7 — the shell's ONE polite region, written by
                 the ROUTE-SETTLEMENT commit and by nothing else.
                 LOCK (⟨AdminListSkeleton⟩, verbatim, binding): this is a
                 route-settlement node and "may never be cited as this cure"
                 for load-completion / `aria-busy` announcements — that
                 contract is the boundary's and stays NO-WAVE-OWNER. -->
            <p class="sr-only" role="status" aria-live="polite">
                {{ routeAnnouncement }}
            </p>

            <!-- ═══ X.W5.c · V·L2 — ONE MOUNT PATH (gates C1/C3/C5/C8) ═══════
                 The scene's regions, IN ORDER, every one of them, at every
                 viewport. What stood here was a `v-if` / `v-else` fork on a
                 desktop predicate, over THREE hand-written slots, and the fork
                 is the defect:
                 a region below the compound breakpoint was not hidden, it was
                 NOT MOUNTED — so `#/` rendered 69 characters at 390 against
                 1751 at 1440 (3.9%, gate C1's born-RED), and crossing the query
                 destroyed every `<KeepAlive>` cache and both WebGL contexts on
                 the way past (gate C5: canvas identity kept 1 of 2).

                 Nothing here reads a viewport. The GRID decides how many
                 columns the regions get (shell.css `.pane-container`, an
                 intrinsic `auto-fit` track list), and when only one fits they
                 stack into the one scrolling column the block law
                 (X.W5.b) gave the document. `paneContainer` feeds the S.W5-10
                 device-pixel snap (card-lighting-forensics artifact 4).

                 The wrapper keeps the `.pane-wrapper` class DELIBERATELY: it is
                 the T-45 oversampled-blur carrier's seat (shell.css) and the
                 device-pixel snap's query, and the carrier is re-seated on this
                 element in this same commit (gate C6). X.W5.d (gate D3): the
                 wrapper carries its ROLE class and nothing physical — the
                 `vj-enter` pane family is keyed on the role in
                 `animations.css`, and the physical side modifiers that rode
                 here until that re-key are retired (quoted once in the wave
                 record, `execution/A/X-W5.md` § X.W5.d). -->
            <div ref="paneContainer" class="pane-container">
                <div
                    v-for="region in regions"
                    :key="region.role"
                    class="pane-wrapper w-full min-w-0 min-h-0"
                    :class="`pane-wrapper--${region.role}`"
                    role="region"
                    :aria-label="region.label"
                >
                    <!-- U.W-A11Y · U-F58 + X.W5.a (gate N5, fold W5F-53): the
                         boundary sits PER REGION and OUTSIDE `<KeepAlive>` (the
                         cached-boundary cure is KILLED by R-7). One region's
                         throw no longer withholds the others, and the caught
                         plate paints inside `.pane-container`'s positioned box
                         instead of under the atmosphere canvas — the EB-1 ink
                         loss cured by the transposition, never by the banned
                         `position:relative` patch. X.W5.d2 · EB-2's route-reset
                         arm: the boundary is keyed on the region's pane by a
                         WATCH (`reset-key`), never by `:key` — a caught plate
                         clears when the user moves to another pane, and the
                         slot's cache beneath it is never remounted. -->
                    <ErrorBoundary :reset-key="region.key">
                        <PaneSlot
                            :component="region.component"
                            :component-key="region.key"
                            :component-props="region.props"
                            :on-mount="bindPane(region.role)"
                            transition-name="vj-enter"
                            :max="PANE_CACHE_MAX[region.role]"
                            appear
                            :on-appeared="
                                (el: Element | null) =>
                                    region.role === 'stage'
                                        ? overture.noteLeftPlateSettled(el)
                                        : overture.noteRightPlateSettled()
                            "
                        />
                    </ErrorBoundary>
                </div>
            </div>
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
        :open="paletteManager.migration.showMigrateDialog.value"
        :count="paletteManager.library.savedPalettes.value.length"
        :mode="paletteManager.migration.migrateMode.value"
        :target="paletteManager.migration.migrateTarget.value"
        :migrating="paletteManager.migration.migrating.value"
        :error="paletteManager.migration.migrateError.value"
        @respond="paletteManager.migration.onMigrateRespond"
        @dismiss="paletteManager.migration.onMigrateDismiss"
    />
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
    provide,
    ref,
    shallowRef,
    useTemplateRef,
    watch,
} from "vue";
import { useRoute } from "vue-router";

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
import {
    usePaneRouter,
    readScenePaneTarget,
    PANE_CACHE_MAX,
    ROLE_PANES,
} from "../shell/usePaneRouter";
import type { RegionRole } from "../shell/viewSchema";
import type {
    ScenePane,
    ScenePaneTargetMap,
    ScenePaneTargets,
} from "../color-session/keys";
import { usePaletteWiring } from "./composables/usePaletteWiring";
import { useClipboard } from "@mkbabb/glass-ui";
import { useAtmosphereBoot } from "./composables/boot/useAtmosphereBoot";
import { resolveHydratedBootModel } from "./composables/boot/hydrate";
import { useOverture, OVERTURE_KEY } from "./composables/boot/useOverture";
import { useDockArrival } from "./composables/boot/useDockArrival";
import { useDevicePixelSnap } from "./composables/useDevicePixelSnap";

// X.W5.a · gate A1 — the four stylesheet imports, the global dark-mode store
// and the API-client install all moved to the composition root (`main.ts`).
// App is a component, not an entry: a component that installs the app's
// stylesheets and its app-level provides is five undeclared boot contracts
// wearing a template (App L-1). The cascade ORDER travels with them, unchanged
// and stated there: utils → foundation → focus-ring → overture.

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

// X.W5.c · gate C3 — the compound breakpoint predicate that drove the
// single-mount v-if (min-width 1024px AND min-aspect-ratio 1.1, read through
// the producer's breakpoint composable) is DELETED. Its own comment argued
// that sharing one compound query between the JS mount condition and the CSS
// dual grid meant "they can never disagree" — true, and beside the point: the
// two agreed perfectly on amputating a region. ⟨Dock DELTA-5 / G-L⟩'s second
// predicate (a bare min-width 1024px media query in Dock.vue) is the OTHER
// half of that disagreement and is X-W8's by name; C3 may not close while G-L
// is RED. The retired spellings are quoted once in the wave record, so C3's
// census reads zero in this file and means it.

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

/** The scenes whose pane exposes commands. Keys of the registry above. */
const SCENE_PANES = [
    "generate",
    "gradient",
    "mix",
] as const satisfies readonly ScenePane[];

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

/**
 * ONE mount report, for every seat, keyed by what actually reported.
 *
 * X.W5.a (fold W5F-02): the two callbacks this replaces re-derived the pane's
 * identity from the route-synchronous `currentConfig` while the slot renders
 * one rAF behind plus chunk latency — so the OUTGOING instance was filed under
 * the INCOMING pane's name for a measured 1275 ms window. The slot now reports
 * the LIVE key beside the instance and the derivation is gone.
 *
 * The scene-COMMAND registry (X-W4 · CC-043) is published from the two desktop
 * seats exactly as X-W4 authored it. The mobile seat's command channel is NOT
 * opened here: COHESION §0k.3 **S-1** rules that `bindPane` is "narrowed to
 * non-command instance uses" and that "the `DockCommand` provide/inject
 * registry lands at X-W8"; X-W5 holds A3's WITNESS and may not claim its cure.
 * What the mobile seat DOES gain is the narrowed channel itself — the edit
 * commit/cancel and the external-colour apply, which `bindPane` owns for all
 * three seats (`usePaneRouter`), and which were structurally dead below the
 * breakpoint because the mobile slot passed no mount report at all.
 */
function onPaneMount(role: RegionRole, instance: unknown, key: string) {
    // What this ROLE can ever seat, derived from the scene table. A report is
    // only evidence about a scene the reporting seat could be showing — which
    // is what the retired `slot === "left"` / `slot === "right"` string tests
    // were approximating by hand, one physical side at a time.
    const seats = ROLE_PANES[role];
    if (seats.has("color-picker")) {
        colorPickerRef.value = foldColorPickerReport(key === "color-picker", instance);
    }
    const read = <S extends ScenePane>(scene: S): ScenePaneTargetMap[S] | null =>
        seats.has(scene)
            ? foldSceneReport(scene, key === scene, instance)
            : scenePanes.value[scene];
    publishScenePanes({
        generate: read("generate"),
        gradient: read("gradient"),
        mix: read("mix"),
    });
}

// --- Pane routing — one source of truth: mobile single-slot, the two desktop
//     slots, and the ONE scene action set all derive from one route table. ---
const { regions, sceneActions, bindPane, commitEdit, cancelEdit } = usePaneRouter(
    viewManager,
    model,
    {
        cssColor: () => cssColor.value,
        savedColorStrings: () => savedColorStrings.value,
        colorSceneTarget: () => colorPickerRef.value?.sceneActionTarget ?? null,
        scenePanes: () => scenePanes.value,
        onPaneMount,
        onEditTargetChange,
        resetToDefaults,
        updateModel: (v: ColorModel) => {
            model.value = v;
        },
    },
);

// --- The route's voice (gates A5 / A7) ---
// The H1 above speaks `VIEW_MAP[currentView].label`; `<main>` is named BY it;
// and the polite region below is written on route SETTLEMENT — the three are
// one act, so a silent substitution is unrepresentable. `/#/does-not-exist`
// resolved to the picker byte-for-byte before this: same render, same title,
// no announcement.
const ROUTE_TITLE_ID = "route-title";
const route = useRoute();
const routeAnnouncement = ref("");
watch(
    () => [viewManager.currentView.value, route.fullPath] as const,
    ([view, path]) => {
        const label = viewManager.viewMap[view].label;
        routeAnnouncement.value =
            view === "not-found"
                ? `Not Found. ${path} could not be opened — showing the ${label} scene.`
                : `${label} view`;
    },
    { immediate: true },
);

// X.W5.c — the mobile region's computed NAME is gone. It existed because one
// slot wore two identities depending on a pane index; a region now carries its
// own `label` off the schema (⟨PSC-12⟩: pane-without-label is unrepresentable),
// so the name is read where the region is rendered and nowhere else.

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
    await copyLink(colorUrl.shareHref());
};

// --- URL sync + persistence precedence (S.W2 · W2-1; re-scoped T.W2 · W2-1;
//     re-scoped again at X.W5.a · A6) ---
// The FIRST value is hydration's (above — the model was born with it), and it
// is the ONLY reader of the address at boot: `useColorUrl`'s own setup-time
// apply is gone, so `hydration.source` is the single answer to "did the URL
// win". `useColorUrl` keeps the LIVE sync in both directions;
// `restoreFromStorage` keeps owning the savedColors restore, skipped whenever
// the URL seeded the model — the hydrated URL seed must never be overwritten
// by the stored one.
const colorUrl = useColorUrl({ model, updateModel: patchModelExternal });
if (hydration.source !== "url") restoreFromStorage();

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

/* X.W5.a · gate A5 — the visible route title.
   ONE per route, inside <main>, speaking the schema's own label. A quiet
   register on purpose: the dock already carries the view's identity as an
   affordance, so the heading is the DOCUMENT's answer to "what is this scene",
   not a second banner competing with it. It rides the certified de-emphasis
   rung (`--ink-muted`, boot-stamped and floor-clamped), so it adds no new
   contrast debt; `flex: none` keeps the scene band's centring intact. */
.route-title {
    flex: none;
    margin: 0 0 0.5rem;
    text-align: center;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-muted, var(--muted-foreground));
}

/* X.W5.a — ROLE-KEYED stagger. The plate-land delay follows the region's ROLE
   (stage first, inspector behind it), so when X.W5.d re-keys the motion family
   off `--left`/`--right` the stagger does not have to move with it. This
   replaces the two inline `--overture-appear-delay` declarations that bound the
   delay to a physical side. */
.pane-wrapper--stage {
    --overture-appear-delay: var(--overture-left-delay);
}

.pane-wrapper--inspector {
    --overture-appear-delay: var(--overture-right-delay);
}

/* X.W5.c — the GHOST pane is gone. It was the desktop-right wrapper rendered
   for a view that has no companion: always in the DOM, `visibility:hidden;
   position:absolute; opacity:0`, flipped off the INCOMING config at the START
   of a dual→single swap so the departing pane was hidden and absolutized
   mid-leave and the slide distance doubled (fold W5F-06). `regions[]` has no
   empty member — a scene with one region renders one region — so the state the
   ghost existed to paint is no longer representable. */
</style>

<!-- Global grammar homes (the W2-close PP-8 cap cure — moves, not removals):
     THE OVERTURE (tokens · appear · dock voice · plate cast-in · emerge ·
     PRM collapse) → composables/boot/overture.css (imported in script setup);
     the pane-swap vj-enter geometry overrides → @styles/animations.css
     (appended beside the vj-enter base family they override). -->
