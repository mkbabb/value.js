<template>
    <div class="app-layout">
        <!-- W5-a11y: decorative aurora canvas — hidden from AT -->
        <canvas
            ref="atmosphereCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none"
            :style="auroraCssGradient ? { backgroundImage: auroraCssGradient } : undefined"
            aria-hidden="true"
            data-testid="atmosphere-canvas"
        />
        <!-- W5-a11y: nav landmark for the dock -->
        <nav aria-label="Application navigation">
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
        <!-- Two-pane grid -->
        <div
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
                 every slot (R.W3 Lane A / A4). -->
            <div v-if="!isDesktop" class="pane-wrapper pane-wrapper--left pane-slot-mobile lg:hidden w-full max-w-md sm:max-w-lg mx-auto min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch">
                <PaneSlot
                    :component="mobile.component"
                    :component-key="mobile.key"
                    :component-props="mobile.props"
                    :transition-name="viewManager.ready.value ? 'vj-enter' : ''"
                    :max="5"
                />
            </div>

            <template v-else>
                <!-- Desktop: left pane (lg+) -->
                <div class="pane-wrapper pane-wrapper--left hidden lg:flex w-full min-w-0 min-h-0 h-full flex-col justify-center">
                    <PaneSlot
                        :component="desktopLeft.component"
                        :component-key="desktopLeft.key"
                        :component-props="desktopLeft.props"
                        :on-mount="onDesktopLeftMount"
                        :transition-name="viewManager.ready.value ? 'vj-enter' : ''"
                        :max="6"
                    />
                </div>

                <!-- Desktop: right pane (lg+) — always in DOM to preserve KeepAlive scroll position -->
                <div
                    class="pane-wrapper pane-wrapper--right hidden lg:block w-full min-w-0 min-h-0 h-full transition-opacity duration-200"
                    :class="currentConfig.right === null ? 'pane-wrapper--ghost' : ''"
                >
                    <PaneSlot
                        :component="desktopRight.component"
                        :component-key="desktopRight.key"
                        :component-props="desktopRight.props"
                        :on-mount="onDesktopRightMount"
                        :transition-name="viewManager.ready.value ? 'vj-enter' : ''"
                        :max="3"
                    />
                </div>
            </template>
        </div>
        </main>
    </div>

    <!-- Global modals -->
    <MigratePalettesDialog
        v-model:open="paletteManager.showMigrateDialog.value"
        :count="paletteManager.savedPalettes.value.length"
        :mode="paletteManager.migrateMode.value"
        @respond="paletteManager.onMigrateRespond"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, shallowRef, useTemplateRef, watch } from "vue";

import type { ColorModel, EditTarget } from "@components/custom/color-picker";
import { ColorPicker } from "@components/custom/color-picker";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY, EDIT_TARGET_KEY } from "@components/custom/color-picker/keys";
import { useContrastSafeColor } from "@composables/color/useContrastSafeColor";

import { Dock } from "@components/custom/dock";
import MigratePalettesDialog from "@components/custom/palette-browser/MigratePalettesDialog.vue";
import PaneSlot from "@components/custom/panes/PaneSlot.vue";

import { defaultColorModel } from "@components/custom/color-picker";
import { useCustomColorNames } from "@components/custom/color-picker/composables/useCustomColorNames";
import { useColorUrl } from "@components/custom/color-picker/composables/useColorUrl";

import { useViewManager, VIEW_MANAGER_KEY } from "@composables/useViewManager";
import { useAppColorModel } from "@composables/color/useAppColorModel";
import { usePaneRouter } from "@composables/usePaneRouter";
import { usePaletteManagerWiring } from "@composables/palette/usePaletteManagerWiring";
import { useGlobalDark } from "@components/custom/dark-mode-toggle";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import {
    useAurora,
    resolveAtoms,
    deriveAurora,
    resolveRenderMode,
    paletteToCssGradient,
    type AuroraAtoms,
} from "@mkbabb/glass-ui/aurora";
import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "@components/custom/panes/keys";

import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";

import "@styles/utils.css";
import "@styles/style.css";

// --- Dark mode: initialize global dark state eagerly so the user's saved
//     preference takes effect before the Dock profile menu mounts. ---
useGlobalDark();

// --- Template refs ---
const atmosphereCanvas = useTemplateRef<HTMLCanvasElement>("atmosphereCanvas");
const colorPickerRef = ref<InstanceType<typeof ColorPicker> | null>(null);
const model = shallowRef<ColorModel>(defaultColorModel);

// --- Color model ---
const {
    cssColor,
    cssColorOpaque,
    savedColorStrings,
    updateModel,
    resetToDefaults,
    applyColorString,
} = useAppColorModel(model);

// --- Edit target ---
const activeEditTarget = shallowRef<EditTarget | null>(null);
const onEditTargetChange = (et: EditTarget | null) => { activeEditTarget.value = et; };
provide(EDIT_TARGET_KEY, activeEditTarget);
provide(CSS_COLOR_KEY, cssColorOpaque);

const { safeAccentCss } = useContrastSafeColor(model, cssColorOpaque);
provide(SAFE_ACCENT_KEY, safeAccentCss);

// --- The accent axis (R.W3 Lane A / A2) ---
// Mirror the contrast-guarded live color onto the `--accent-live` root token —
// the SAME library `safeAccentColor` computation SAFE_ACCENT_KEY provides (ONE
// color-resolution path, inv-N-3; no bespoke resolver). style.css re-points
// `--primary` and the glass frost's `--glass-tint-source` onto it, so the
// interactive layer and the plate temperature speak the picked color.
watch(
    safeAccentCss,
    (css) => {
        document.documentElement.style.setProperty("--accent-live", css);
    },
    { immediate: true },
);

// --- View manager ---
const viewManager = useViewManager();
provide(VIEW_MANAGER_KEY, viewManager);
const currentConfig = computed(() => viewManager.currentConfig.value);

// --- The per-view accent (R.W4 Lane B / B2) ---
// THE one resolver path: each view's schema-declared hue shift lands on the
// `--view-hue-shift` root token; style.css derives `--accent-view` from the
// R.W3 `--accent-live` axis via CSS relative color (zero JS color math), and
// `--primary` rides it — so navigation reads chromatically everywhere the
// interactive layer paints.
watch(
    () => currentConfig.value.accentHueShift,
    (deg) => {
        document.documentElement.style.setProperty("--view-hue-shift", String(deg ?? 0));
    },
    { immediate: true },
);

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

// --- URL sync + custom color names ---
useColorUrl({ model, updateModel });
const { loadFromAPI: loadCustomColorNames } = useCustomColorNames();

// --- Aurora atmosphere — THE palette made atmosphere (N.W5.B) ---
// The full-viewport background now ANSWERS the picker. We drive glass-ui's
// `AuroraAtoms` door — the ≤7-knob consumer-facing surface — whose `seed` atom
// derives the atmosphere's OKLCh palette via `deriveAurora` (glass-ui composes
// it inside `resolveAtoms`). The live picker colour flows into `auroraAtoms.seed`
// below, so the background tracks the chosen colour instead of the static cyan
// "Sky" default it was frozen on (the ~10-tranche oldest mandate, CH-2 / VAL-1).
//
// AuroraPane (provided `AURORA_ATOMS_KEY`) tunes the SHAPE of the atmosphere —
// harmony, colour energy, zones, noise, medium, motion — while the seed stays
// the picker's. `resolveAtoms(atoms)` clamps every atom into a valid in-range
// `AuroraConfig`; `useAurora` deep-watches the getter, so any atom edit (slider
// drag OR a seed change) re-derives + re-uploads the uniforms for free.
const auroraAtoms = reactive<AuroraAtoms>(structuredClone(DEFAULT_AURORA_ATOMS));
provide(AURORA_ATOMS_KEY, auroraAtoms);
// The config source MUST NOT throw inside useAurora's deep-watch: a thrown getter
// dead-faults the reactive effect (the white-screen class inv-N-1 forbids).
// `resolveAtoms` is TOTAL for the numeric atoms, but it derives the palette via
// `deriveAurora(seed)`, which THROWS on an un-parseable seed — so the seed write
// below is the one validated boundary, and this getter stays throw-free.
// Adaptive substrate (glass-ui's `resolveRenderMode("auto")`): on a low-power or
// SOFTWARE-WebGL device (SwiftShader / llvmpipe / MS Basic Render — the GPU-
// blocklisted path) this resolves to `"css"`, so `useAurora` NEVER arms the
// full-viewport WebGL2 surface. A full-viewport software-rastered GL layer makes
// every pointer-driven composite stall the renderer's input ack — the page goes
// unresponsive under interaction (the N.W5 Defect-A hang, reproduced live; the
// same severe jank a blocklisted-GPU user feels). On those devices the atmosphere
// paints via the cheap CSS-gradient placeholder below (a complete render of the
// same derived palette) instead. Resolved ONCE at setup (a mount-time device tier).
const auroraRenderMode = resolveRenderMode("auto");

useAurora(
    atmosphereCanvas,
    () => resolveAtoms(auroraAtoms),
    { onInitError: (err) => console.warn("[aurora] init failed:", err) },
    { renderMode: auroraRenderMode },
);

// The CSS-gradient fallback for the `"css"` substrate — the same derived palette
// `resolveAtoms` feeds the WebGL field, rendered as a static linear gradient (the
// `<Aurora>` placeholder idiom, glass-ui's `paletteToCssGradient`). Empty on the
// `"webgl"` path so the canvas owns the paint; on `"css"` it is the atmosphere.
const auroraCssGradient = computed(() =>
    auroraRenderMode === "css"
        ? paletteToCssGradient(resolveAtoms(auroraAtoms).palette)
        : undefined,
);

// The picker→atmosphere seed: every colour change re-seeds the derived palette.
// `cssColorOpaque` is always a value.js-serialised colour, so the guard never
// fires in practice — but a transient un-parseable string must leave the LAST
// GOOD seed in place (never reach the getter), so the atmosphere never flashes
// empty and the deep-watch never dead-faults (mirrors the blob watch's guard).
watch(
    cssColorOpaque,
    (css) => {
        try {
            deriveAurora(css); // probe: throws iff the seed is un-parseable
            auroraAtoms.seed = css;
        } catch {
            // keep the last good seed
        }
    },
    { immediate: true },
);

// --- Blob config ---
// The 8-atom nested config — structuredClone so the reactive copy owns deep
// atoms (the aurora precedent above does the same for its nested config).
const blobConfig = reactive(structuredClone(BLOB_CONFIG_DEFAULTS));
provide(BLOB_CONFIG_KEY, blobConfig);

// --- Live-palette coupling — the hero blob IS the palette made flesh ---
// The active picker color seeds a harmonious OKLCh ramp (≤4 stops) that flows
// straight into the blob's spatial multi-stop color field. glass-ui's GooBlob
// deep-watches `config.color.paletteStops`, so a colour change repaints free.
watch(
    cssColorOpaque,
    (css) => {
        try {
            blobConfig.color.paletteStops = deriveBlobPalette(css, {
                stopCount: 4,
                harmony: "analogous",
                chromaCeiling: 0.16,
            }).map(oklchStopToHex);
        } catch {
            // A transient un-parseable colour string leaves the last good ramp.
        }
    },
    { immediate: true },
);

onMounted(() => { loadCustomColorNames(); });
</script>

<style scoped>
@reference "../../demo/@/styles/style.css";

/* Smooth layout transitions for pane wrappers */
.pane-wrapper {
    transition: height var(--duration-slow) var(--ease-standard),
                margin var(--duration-slow) var(--ease-standard),
                padding var(--duration-slow) var(--ease-standard);
}

/* Ghost pane: always in DOM to preserve scroll-timeline state, but invisible
   and non-interactive. Replaces the former inline 5-property style hack. */
.pane-wrapper--ghost {
    visibility: hidden;
    position: absolute;
    pointer-events: none;
    opacity: 0;
}

</style>

<style>
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
</style>
